## .1226 — Retopo Relax works along outer edges

Cris passed .1224 stroke cuts and straighter patches, and .1225 surface validation. Retopo Relax now redistributes vertices along smooth boundary runs. The tighter rim falloff distinguishes a stroke on the edge from a nearby interior stroke. The boundary step runs along the rim tangent and snaps to the reference. Corners, creases and sharp folds remain fixed. The brush commits one Undo step.

Device check: brush a crowded outer edge on a curved reference, orbit to confirm the vertices still sit on the surface, then Undo/Redo. Also brush the middle of a patch and check the cut and invalid-patch gestures from .1224 and .1225.

## .1225 — Retopo rejects flipped and unsupported faces

Cris passed Relax in .1223 and reported occasional inside-out quad patches. The reference picker handles reversed source winding. Before committing newly drawn faces, validate front-facing convex screen winding, reference contact at every corner, and nearby surface at edge midpoints and center. A bad cell rejects the entire stroke before topology or history changes. Existing cut validation remains in its own owner.

Device check: redraw a patch that used to flip, try a stroke across a hole, and verify a valid curved patch still snaps and takes one Undo.

## .1224 — Retopo stroke cuts and straighter patches

Draw across a complete connected row in Retopo Quad mode to split each crossed quad through opposite edges. Reuses the native Loop Cut topology, projects crossings onto the reference, and rolls back incomplete or invalid cuts. Each committed stroke is one Undo step with shared cut vertices. Success tests cover crosswise and lengthwise cuts in sequence. Existing X and outline gestures remain available.

New U and L outline patches straighten the sketched borders in the current view before snapping the grid to the surface. New spacing balances existing segment lengths with uniform intervals. Deep sideways outlines can add multiple rows sized from the median existing edge spacing. Existing boundary coordinates and shared vertices stay fixed. Device checks: cut a neck patch vertically and horizontally with two strokes, then sketch a deep U along three existing segments and inspect the grid and Undo.

## .1223 — surface-constrained Retopo Relax brush

Select Relax in Retopo, then sweep the Pencil across uneven quad spacing. The brush uses the existing Quad Clean flow solver with localized falloff and reference projection. It relaxes visible interior quad vertices, holds the patch rim and protected sharp features, and rejects off-surface, folded or poorer solutions. The preview shows the brush footprint. A successful stroke changes vertex positions only and is one Undo step. Finger navigation and Quad gestures retain their .1222 behavior.

Device check: build an uneven quad grid over a curved reference, brush the inner row, and orbit to check the moved points stay on the surface. Check the rim, then Undo/Redo. The curved-reference fixture tests projection, rim preservation, cancellation and one-step history.

## .1222 — Retopo X delete and boundary-sized patches

Cris passed .1221. Drawing X over a visible quad deletes it. A cross in an enclosed gap still fills it. The sideways U now uses the full identified run of existing boundary segments, including runs longer than 16. For lengthways ribbons, draw a deep U from one boundary edge back to its other corner. Adjacent quad depth estimates cell length up to 128 cells. For a grid, draw the two missing sides across from two connected boundary runs that meet at a corner. Each run sets the grid count along its axis. The stroke determines the far edges and the grid points snap to the reference. Each patch is validated and committed as one Undo step.

Device checks: X delete and Undo; trace a wide U and a deep U, then draw two sides opposite a 3-by-5 boundary and check all 15 faces and one-step Undo.

## .1221 — Retopo line, cross and ribbon gestures

A line can finish a quad bounded by three connected edges. An X drawn in one continuous stroke fills an enclosed four-edge hole. An open U drawn between the ends of a row of boundary segments adds a single welded ribbon. Existing segment lengths determine the spacing along the outer stroke. Each outer point projects to the reference, and the entire row commits as one undoable edit. Ambiguous paths are skipped. The ribbon follows up to 16 boundary segments and preserves the existing segment count.

Device check: close a three-edge gap with a line, draw a continuous X inside a four-edge hole, then draw a U beside five boundary segments and Undo/Redo the five-quad result.

## .1220 — complete open Retopo quad strokes

Cris passed .1219 and requested forgiving two- and three-sided strokes. Start and end near visible boundary corners. On release BoxLab fits the drawn sides and uses one or two connected existing boundary edges to close the face. The quad builder validates the result before a single Undo step. Competing valid paths of the same length are skipped. Closed outlines and the opaque reference overlay retain their .1219 behavior.

Device check: extend a quad with a loose U stroke, then leave a one-cell L-shaped gap and close it with two drawn sides. End slightly off the existing corner and check that it welds. Undo/Redo the last quad.

## .1219 — forgiving Retopo strokes and opaque-reference overlay

Cris passed .1218 and reported that only about one in fifteen outlines committed, and curved references hid the quad fills. Closed outlines now accept smaller quads, a larger closing gap, and more hand-drawn variation. Corner snap radius scales down on small strokes to avoid collapsing nearby corners onto an existing vertex. The quad builder continues to validate topology.

Retopo uses a uniform lilac fill and dark polygon edges drawn over the opaque reference. Triangle shading and internal diagonals are absent from the quad display. Back-facing polygons and edges are culled. Display changes do not move modelling vertices. Device check: draw several small rounded quads, orbit around a curved patch and confirm solid uninterrupted fills, then Undo/Redo. Shared-edge partial outlines remain next.

## .1218 — draw a quad in one stroke

Cris confirmed .1217 PASS after reducing the reference below 250,000 triangles. Retopo selects the source directly in the viewport and defaults to Quad. Draw one closed four-sided Pencil or mouse stroke. The existing reference picker projects the interpreted corners and snaps to nearby visible topology. The existing native quad builder and history transaction commit one face. Four corner taps still work, and Vertex remains available for point editing. A cancelled, open or ambiguous stroke leaves geometry and history unchanged.

Retopo displays a pale, smoothly shaded reference and lilac output with 2.7-pixel dark edges. The styling belongs to Retopo display and leaves native mesh data and saved materials alone. Device check: draw the outline, Undo/Redo, orbit with fingers, then Done. Next: complete three-, two- and one-sided strokes using unique existing boundary paths.

## .1217 — pick the Retopo source on the model

Cris reported .1216 FAIL and requested Retopo → tap the object → start modelling. The Retopo button now prompts for a viewport tap. The existing scene hit picker resolves the nearest visible object, including locked imports in a reference-only scene. A finger, Pencil or mouse can choose the source. The choice leaves geometry and history intact, the next Pencil or mouse tap places a point, and finger drags still navigate. The Objects list returns to its ordinary selection behavior and Retopo has no source dropdown. Vertex, Quad, Done and the separate output mesh remain.

Device check: open Retopo, tap the source directly, place a vertex or draw a quad, then Undo. Repeat with the cube deleted and only the imported reference visible.

## .1216 — keep Retopo open after Objects selection

The .1215 hosted browser check caught the deferred Object mode restoration closing Retopo after the reference row opened it from Object mode. The existing restoration handler now yields to active Retopo, as it already does for Paint. The reference-only browser check requires the Quad control to remain visible and usable after selecting the source in Objects. Cube deletion was accepted by Cris. Device check: delete the cube, tap the reference name in Objects, then use Vertex or Quad and Undo.

## .1215 — choose a Retopo reference from Objects

Cris confirms cube deletion works and reports that the remaining reference cannot be selected. A single tap on a reference name in Objects now opens Retopo with that source selected, including in a reference-only scene. The source stays read-only. The existing Reference picker and Multi selection retain their roles. Tapping the current source again keeps the current tool and draft. Hidden sources require Show before use.

Device check: import as Reference, delete the cube, tap the reference name in Objects, and place a vertex or draw a quad. Undo should return to the reference-only scene. Next roadmap build remains Retopo boundary extension.

## .1214 — empty first-object Undo token

Continue the .1213 empty/reference-only scene change. When a scene checkpoint starts with activeId null and the caller omits a mesh token, use an empty native carrier instead of the newly created live mesh. This lets Add → Cube → Apply → Undo return to truly empty state; ordinary nonempty transactions and explicit tokens retain their previous paths. Extend the native-owner test for this case. The hosted smoke now uses the real Add/Cube/Apply workflow and verifies Undo/Redo, then actual empty/reference-only project Open. Earlier smoke failures were test assumptions about an active cube vertex and Add creating a cube immediately; do not restore those assumptions or the last-object restriction. .1213 runtime passed all 3,571 local tests, and browser checks reached successful reference-only Quad and Delete All/Undo/Redo before the Add-menu test correction. Final application release .1214. .1212 PASS remains protected; .1213 is not a device-accepted baseline.

Device checks remain: delete the default cube leaving a reference and use Retopo; delete all objects and Undo/Redo; Add/Import after empty; save/open empty or reference-only projects.

## .1213 — empty and reference-only scenes

Cris confirms .1212 PASS but cannot delete the default cube when only references remain. Authorizes deleting every scene object. Remove the last-object guard in per-row, global and Multi deletion. All paths now delegate to the Object Manager batch deletion transaction, with one scene checkpoint after the result is staged. Do not force-activate a locked reference as a replacement. With no unlocked editable object, activeId is null and the existing live mesh is an empty, unlisted carrier; it is not an extra object. Suppress the gizmo/modelling controls while no editable object is active. Add/Import can create new objects normally. Native scene history restores empty/reference-only snapshots as well as populated scenes.

Permit empty/reference-only .boxlab Save/Open through the existing codec and scene replacement owner. Empty scenes must have no active ID/selection. Preserve all resource/format/topology validation. The scene UI loads the updated codec; unchanged legacy paint consumers retain their existing codec pin since their nonempty serialization behavior is unchanged. No modelling kernel or protected Multi transform changes. Retopo's first Vertex/Quad scene checkpoint now supports a null previous active object, so a scene containing only a locked reference can produce a separate editable Retopo mesh and Undo back to reference-only.

Tests: actual deletion/restore/history owners cover one-step Delete All, deletion of the last editable object, last-reference deletion and codec round trips. Hosted browser extends actual OBJ Reference import with real cube Delete, reference-only Quad, Multi All Delete/Undo/Redo, Add after empty, actual empty/reference-only .boxlab Open, and reference-only Vertex/Undo/Redo. Existing Retopo/UV/modelling browser gates remain. The prior Delete shortcut test now protects the unified one-checkpoint owner rather than the removed pre-delete checkpoint route. .1212 accepted target selection/immutability remains protected. Next modelling roadmap remains Retopo boundary extension.

Device: import Reference → delete original Cube → Retopo; delete all through Multi → All → Delete; Undo/Redo; Add/Import into an empty scene; save/open empty or reference-only projects.

## .1212 — choose imported read-only Retopo references

Cris confirms .1211 general Retopo PASS, but imported Reference objects cannot be activated and therefore could not be chosen as Retopo sources. Preserve read-only import/Outliner behavior: never unlock or activate a Reference as editable. Add a Reference picker to the existing Retopo panel listing visible polygon objects, including locked imports. Its chosen source is independent of the active editable object. Until the first Retopo commit, validate against the entry editable object; the chosen source only supplies the cached surface picker. First Vertex/Quad commit creates the ordinary separate editable Retopo object through the existing history owner. Source geometry, kind and lock flag remain unchanged. A target change cancels partial corners and starts a fresh session without a geometry/history commit. Closing/reopening with the Retopo object active resumes the same pair during this page session. Hidden/missing references refuse; initial entry can fall back to a visible mesh if the active object has no polygon surface.

Audit main3e40672865a99fc19622d7a2aa54d4bc154e5392. Only Retopo source selection/lifecycle changes; import, Outliner activation/locking, source render/materials and modelling kernels remain untouched. Retain the 250,000-triangle reference limit and existing page-session-only pair lifetime. Tests cover inactive locked reference Vertex/Quad placement, projection onto the actual chosen surface rather than the editable cube, immutable sources, target switching, Undo/Redo and hidden/missing refusal. Extend the hosted smoke through actual OBJ Import as Reference, failed native activation, Retopo picker selection and quad creation/Undo/Redo while the imported object stays locked. Existing R1/R2 gates remain.

Device: import as Reference → Retopo → Reference picker → choose imported name → Vertex or Quad. Create and move vertices/create a quad; verify a separate Retopo object, unchanged locked reference and Undo/Redo. Next roadmap build remains boundary extension/strips, then surface refinement and deterministic guided patches.

## .1211 — R2 Retopo quad construction

Cris confirms .1210 PASS; protect first-point session retention, surface placement/drag, Pencil/finger routing, cancellation, native Undo/Redo and unchanged reference geometry. Main at audit: c9b5a3eada48ea8b002a6e5e2f2a9b3e0a912542. Retopo now has Vertex, Quad, Clear corners and Done. Vertex remains the initial/default tool. Quad stages four surface taps, snapping to existing visible retopo vertices. Numbered teal corners and a line preview follow native camera navigation. Four valid corners create one native quad in one Undo step. Existing corner indices are reused so adjoining quads share an actual boundary edge rather than overlapping disconnected points. The first quad can create the separate Retopo object directly; source stays unchanged. Clear, tool switch, Escape, history and close discard partial corners without editing topology/history. Stale object/mesh context invalidates the draft.

Reuse existing applyGridFill for one-cell assembly and quadTopologyAudit for mesh validity. The new adapter only prepares ordered surface corners and guards crossed/collapsed/duplicate corners, duplicate faces, interior-edge reuse and inconsistent shared-edge winding on a private native mesh. Existing modelling kernels and render materials stay unchanged. Existing reference picker, occlusion, native Vertex rendering, scene/object/mesh history and input owner remain authoritative. No separate quad renderer or modelling kernel. No drag-edge extrusion, strips, Relax, guided multi-cell patches, pair serialization or baking claimed. Adjoining quads currently extend a patch by tapping the shared pair and two new corners. Next: efficient boundary extension/strips, then surface refinement and deterministic guided patches before expanded UV manipulation.

Tests: extend the production-owner fixture and hosted Retopo browser smoke for partial-corner atomicity, direct first quad creation, two joined quads with six vertices, one-step Undo/Redo, duplicate refusal and Clear. Preserve R1 browser coverage. Device: reference → Retopo → Quad → tap four corners in boundary order; create the adjoining quad using two shared corners. Orbit with fingers, clear a partial quad, move a corner in Vertex, Undo/Redo and Done. .1211 physical Pencil acceptance pending.

## .1210 — retain Retopo during native selection refresh

Hosted .1209 browser smoke caught the first-point object activation silently closing Retopo: Object Manager clears component selection by programmatically clicking the already-active Vertex button. Preserve that same-mode programmatic refresh while real mode clicks and programmatic changes to another mode still exit Retopo. Protect it in the actual-owner fixture and assert that Retopo remains active immediately after first-point creation in the browser smoke. .1209 passed all 3,560 local tests but failed this hosted gate; it is not an accepted device baseline. Existing UV and modelling browser gates passed. Final runtime is .1210; the R1 scope and ordered queue below remain authoritative. No quad tools added.

Device: active reference → Retopo → several points → drag a point → Undo/Redo → Done. Retopo should stay open throughout editing and the source should remain unchanged.

## .1209 — R1 Retopo surface-vertex workspace — 23 November 2026

Cris confirms .1208 PASS and requests original CozyBlanket-style manual retopology, deterministic guided patches and expanded UV tools. Current priority is Retopo foundations first, then reuse interaction patterns for UV editing; projection and UV constraints remain separate. Add a Retopo entry beside Paint in the mode bar. It is a focused workspace backed by native Vertex mode, not a new selection type or modelling kernel.

Choose an active visible polygon object, enter Retopo and tap its surface with Pencil or primary mouse. The first point creates a separate ordinary editable Retopo object. Subsequent taps add loose vertices; dragging an existing visible vertex reprojects it onto the nearest reference shell. Fingers retain native navigation. Native point rendering, loose topology, mesh/object history, selections and object management are reused. Source geometry is untouched. The cached reference picker uses existing EditableMesh triangulation and is disposed on exit. Initially bounded to 250,000 reference triangles; no million-face performance claim. Vertex occlusion is tested at the vertex's projected location. Background contacts/free drags do not create points. Cancel, Escape, blur or a new touch rolls back a pending move; no history for cancelled/no-op edits. Done retains geometry and restores the previous component mode. Re-entering with the same Retopo object active resumes the pair during this page session. The pair is not serialized yet; ordinary loose geometry uses existing project persistence. Do not claim saved retopo-session restoration.

R1 is vertex placement/movement only. No quad drawing, strips, Relax, automatic patches or baking claimed. Queue: R2 quad construction/edge extension; R3 strips and surface Move/Relax/pins/symmetry; R4 deterministic four-boundary patches with compatible opposite subdivisions and preview/Apply; then share manipulation/selection patterns with UV refinement, on-model seam strokes and packing. No proprietary predictor or identical AI-result claim.

Automated coverage: production picker and actual session owner execute nearest shell, hidden vertices, source immutability, invalid reference bounds, object creation, native-shaped history, move Undo/Redo, cancellation, empty/free drags, touch pass-through and stale-context guards. New real-browser smoke script is included in existing hosted regression CI. Local Chromium cannot launch because this environment rejects its singleton socket; this is not a browser PASS. Physical iPad/Pencil acceptance remains pending.

Device check: active cube or curved reference → Retopo; Pencil tap several points, drag one across a corner, orbit with fingers, Undo/Redo, then Done. Source remains unchanged; retopo vertices are a separate object. Return to Retopo with that object active to resume. Quad tools follow after R1 acceptance.

## .1208 — UV5D re-unwrap collected islands together

Cris confirms .1207 PASS. In UV Editor, Add Island collects the currently selected island, Remove Island toggles it out, Clear Set empties the collection and Re-unwrap Together runs the existing bounded worker on the collected faces. Collected islands are highlighted. Compatible adjacent faces can join; marked seams and solver-required cuts remain. Results fit inside the combined old bounds and are overlap-checked against the complete layout. Other island coordinates remain exact. Existing unpainted Base eligibility, cancellation, stale context guards and one UV Undo step apply. UV/history refresh clears the collection. The result reports its patch count.

Device check: select one island, Add Island, select another, Add Island, then Re-unwrap Together. Inspect joined compatible faces, unchanged islands and Undo/Redo. Repeat with a marked connecting seam to retain the split.

## .1207 — repair Facegroup refinement entry

Cris reports .1206 FAIL with the complete tile 0–1 UV prerequisite. Reuse source corner UVs after a group-label-only signature change when all ordered polygon vertex lists still match exactly. Inspect and validate the private compatible payload, then preserve other region corners in the original refinement transaction. Actual connectivity changes fail the correspondence check.

If a usable complete starting layout is absent, Re-unwrap Facegroup now starts the existing whole-object Guided Unwrap preview. It requires Apply UVs to create that initial layout; Cancel retains the original data. Complete supported layouts still refine only the selected group. Unpainted Base eligibility remains.

Device check: retry the failing group. If Guided preview is offered, review and Apply UVs, then refine the group. Also assign or rename groups after unwrapping and retry refinement. Verify Undo/Redo and the unaffected groups.

## .1206 — UV5C Facegroup refinement

Cris confirms .1205 PASS. Paint → UV now offers a Facegroup selector and Re-unwrap Facegroup. The selected group uses the existing patch preparation, worker, fit validation and UV transaction. It can join fragmented charts within a group, follows internal seam marks and fits into the old group bounds. Other groups retain exact UV coordinates. Overlap or invalid results are refused before commit. Unpainted Base geometry with complete tile 0–1 UVs is supported. Close cancels a pending job. Group/object/topology/UV/seam changes invalidate the result.

Device check: select a group in Paint → UV, tap Re-unwrap Facegroup, inspect the result in UV Editor and Undo/Redo. Try a group spread over several charts and one with a marked internal seam. Other groups should keep their positions.

## .1205 — Paint radial UV entry and seam icons

Cris confirms .1204 PASS. UV tools now open from the centre of the Paint radial. Remove the Object radial UV entry and hide the old Object drawer launcher. The Paint action closes its active session before opening existing UV tools. Missing-UV Paint entry continues to open UV preparation. The existing Edge Mark Seams and Clear Seams actions now have distinct icons. Cris clarified that “Paint Seam” meant Clear Seams.

Device check: Paint radial → UV opens the right-side menu; Close restores the entry view. Edge → Mark Seams and Clear Seams have distinct icons and still consume selected edges.

## .1204 — UV5B marked cuts within a selected island

Cris confirms .1203 PASS. Protect local refinement and locked-island coordinates. Re-unwrap Island now consumes existing Edge-mode seam marks inside the selected island, maps their vertex indices into the worker patch and verifies the required cuts both before and after fitting. Marks on the patch boundary or other islands are ignored. A change to seam marks while the worker runs invalidates the candidate. Existing unpainted Base eligibility and one-step UV history remain. Build .1203 completed 3,545 local tests with zero failures.

Device check: mark an internal shared edge in Edge mode, open UV Editor, select the island containing it and choose Re-unwrap Island. Confirm the marked edge becomes a split and other islands retain their positions. Undo/Redo.

## .1203 — UV5A re-unwrap a selected island

Cris confirms .1202 PASS. Protect the right-docked UV menu, restoration of the entry view on Close and the B2 guided-chart Paint regression. UV Editor now offers Re-unwrap Island on a selected island of an unpainted Base mesh. The existing worker re-unwraps the selected source faces, fits the result into their original UV bounds and checks the complete layout for overlaps before a single Undo step. All other island coordinates remain exact. A new local cut can yield multiple islands. Whole-layout, imported and painted refinement and selected merge remain separate.

Device check: on an unpainted Base object with several islands, open UV Editor, tap an island and choose Re-unwrap Island. Compare the other islands and use Undo/Redo.

## .1202 — UV menu placement and B2 paint regression

Cris reports .1201 FAIL because the required exit is the UV menu Close button. Capture the display mode at UV menu entry and restore it when closing that session, including after an unwrap switches to UV Checker. Dock the existing scrollable UV menu at the upper right in both top-layer and fallback paths.

Continue the B2 roadmap with a regression using actual xatlas Guided Unwrap, two multi-face charts, a marked shared seam and the existing Pencil Paint UI. Exercise continuous Colour, Roughness, Metalness and Opacity, cancellation, Done/navigation, Undo/Redo and UV preservation. No change to the paint raster.

Device check: enter UV from Studio, apply an unwrap, examine the checker with the menu at the right, then tap Close without opening UV Editor. Repeat from Solid. Paint a continuous stroke across the seam between two charts and check Done/Undo/Redo.

## .1201 — restore 3D view after UV editing

Back to 3D and Escape restore the render look captured when UV Editor opened. If Apply UVs automatically enabled UV Checker during the same UV session, returning restores the look before that temporary checker. An explicitly selected UV Checker is retained when there was no automatic switch. Build .1200 completed 3,542 local regression tests with zero failures.

Device check: enter UV Editor from Studio, then from Solid or MatCap, and check each return. Also apply an unwrap from Studio, open UV Editor from the automatic checker, and check that Back to 3D restores Studio.

## .1200 — UV4B texel density target

Resume the UV roadmap after the selection and toolbar builds. Object → UV now offers Texels/unit for Auto, Guided and Seam Unwrap. Blank uses automatic fit. A positive target sets the area-averaged UV density in model units at the selected map size. Packing retains the requested gutters and chart rotation setting, with bounded retries and validation before preview. A target that cannot fit within the packing limits returns a message and keeps the existing UVs. Apply, Cancel and Undo use the existing UV transaction. Existing-layout repack remains separate work.

Device check: unwrap an unpainted mesh with Auto density and note the achieved value. Enter a lower value and rerun, then inspect the new readout and Apply/Undo. Try a target well above the original result and confirm no Apply is offered.

## .1199 — Geo Snap in Select Options

Remove the Axis Snap button and the separate Snap Options at top left preference. The existing Geo Snap input sits directly below FRONT and follows Select Options at top left. When both top-left preferences are enabled, Select Options sits eight pixels beneath Mode Select.

Device check: toggle GEO SNAP and confirm highlighting and geometry snapping, then toggle Select Options at top left with Mode Select both on and off.

## .1198 — axis inference for Move and Extrude

Cris confirms .1197 PASS. Protect additive Pencil Vertex taps, including setback vertices and tap-to-toggle. The component Move gizmo now checks nearby coordinates along the active axis when GEO is enabled and the pointer has no direct geometry reference. Selected vertices are excluded. Local axes use the active pivot frame. Face Extrude uses the same coordinate-based behavior along the face normal, with Through contact retaining priority and Repeat bypassing inference.

Device check: enable GEO, select a component and drag a Move axis toward the coordinate of an unselected vertex off the drag rail. Look for the yellow guide and alignment. Repeat with GEO off and verify free travel along the rail. Repeat in Local orientation, then extrude a face toward the height of an off-rail vertex and check both GEO settings.

## .1197 — keep the Vertex group on Pencil taps

Cris reports .1196 FAIL: after selecting two or three vertices, a setback vertex can replace the selection. The production event fixture reproduced [0,1,2] becoming [3]. Pencil background classification had used the polygon ray even when Vertex Pick Assist claimed the projected marker. Window release cleared the selection before the document picker added the vertex. Pencil background classification now honors the same Vertex Pick Assist hit as the main viewport owner. The regression also checks that tapping the same marker again removes it and tapping empty space still clears.

Device: repeat the failing sequence on the same model using Pencil. The rear tap should add to the group; tap it again to toggle it off. Check an empty-canvas tap still clears. FRONT still controls depth selection.

## .1196 — Pencil and collapsed-puck Vertex taps

Cris reports FAIL on .1195 because multiple Vertex taps are still intermittent on iPad. The picker now recognizes Pencil contact from the primary button or pressure, matching viewport contact detection. A precise tap on an unselected vertex under the collapsed puck can add it to the selection. Tapping the puck away from another vertex still opens the gizmo. Existing depth policy, additive selection and grouped Bevel remain.

Device: tap several vertices with Pencil, including behind the puck when they overlap; tap a selected marker again to remove it. Tap the puck clear of other markers and confirm gizmo activation. Bevel the resulting group. Physical iPad acceptance pending.

## .1195 — Vertex picking and multi-vertex Bevel

Cris reports that farther vertices were hard to include in a multi-selection and selected vertices did not bevel together. Vertex taps now rank rendered marker centers, with depth as the tie break. FRONT now works in Vertex mode: on rejects occluded markers, off permits selecting through the surface. Bevel drag uses the same picker and the complete additive selection. Drag a selected vertex to bevel the group; dragging an unselected vertex will not replace it. Retains existing Bevel topology, preview, undo and safety checks.

Device: select near and setback corners in Vertex mode. For a hidden corner switch FRONT off. Bevel from a selected corner and check both cuts plus Undo/Redo. The preceding .1194 UV packing build passed 3,536 local tests and its hosted UV browser checks.

## .1194 — UV4A packing controls and quality — 18 November 2026

BoxLab .1193 selected-edge seams is user PASS and protected. Auto, Seam and Guided Unwrap now offer a 1024 or 2048 target map, 2/4/8/16 pixel gutters and chart rotation on/off. The map size is the reference for UV packing and diagnostics, not the Paint texture size. xatlas packs padded charts; the export retains an explicit tile border and compensates dilation for its actual atlas dimensions. Changing inputs discards the pending preview. Applied UV coordinates use the existing project/history path.

The preview reports island count, coverage, area-averaged density in texels per model unit, peak per-triangle anisotropy and the overlap check. A density target and repacking existing layouts are follow-up work within UV4. Seam marks, Facegroup cuts, and existing paint safety remain in effect.

Device: open Object → UV on an unpainted object, set 2048 and 8 px, run an unwrap and review the quality summary. Toggle rotation or change the gutter to discard the preview, rerun and apply. In UV Editor inspect the gaps between islands and Undo to recover the previous UVs.

## .1193 — UV3 selected-edge seams — 18 November 2026

Helios Studio 0.1.6 H2 user PASS protected. In BoxLab Edge mode, Mark Seams and Clear Seams consume the existing selection, including loops and paths, without editing the mesh. Object → UV → Seam Unwrap uses the marks, and Guided Unwrap combines them with Facegroups. Magenta shows marked seams; cyan and orange retain the group and automatic seam conventions. Marks are per-object session guides tied to current face topology. They are not serialized. Applied UVs use existing history and persistence.

Planar net growth omits marked adjacencies. The worker checks both UV endpoints after packing and will retry with incompatible chart material IDs if coincident positions defeat a requested split. This fallback can introduce additional seams. The main thread verifies the marks again before preview. Auto Unwrap ignores marks. UV1/UV2 target restrictions still apply.

Device: choose shared edges or a loop, Mark Seams, switch to Object → UV → Seam Unwrap and review the magenta edges. Cancel or apply, Undo, then clear the same marks in Edge mode. Try Guided Unwrap with marks on a grouped Base model. Automated fixtures cover a cylinder slit, torus loop, and planar ring.

## .1192 device PASS — 18 November 2026

Cris confirms PASS. Protect connected Guided Unwrap patches, including a one-group cube net, Facegroup boundaries, and the preview/apply workflow. Next ordered work is H2 in Helios Studio, followed by UV3 in BoxLab.

## .1192 — connected Guided Unwrap patches — 18 November 2026

Addresses the .1191 qualified PASS. Guided Unwrap unfolds planar polygons across shared same-region edges in the worker. Each accepted hinge preserves shared UV edge endpoints and face scale. Growth cuts when attaching a face would overlap the net. The original WASM atlas packs and validates the result before preview, with corner mapping, region boundaries, nonoverlap and float32 checks retained. If the model has warped polygons, exceeds the net overlap budget, or cannot produce a better validated net, use the existing Guided charting. Auto Unwrap still uses its original solver path. Preview shows how many connected regions were split when applicable.

Device: one Facegroup on a cube should yield one connected UV island. On a grouped mesh, review cyan borders, orange cuts, and patch count. Cancel, Apply, Undo/Redo and paint across a retained edge on a fresh unpainted Base mesh. Existing painted layouts remain protected. No general curved-surface island-count guarantee.

## .1191 device feedback — qualified PASS — 18 November 2026

Cris accepts the Guided preview and Facegroup-border behavior in principle. Patch cohesion remains open: the one-group cube returns six face islands, and a shape with six facegroups still produces too many islands for useful painting. Do not treat six charts on a one-group cube as a quality success. Local WASM reproduced six charts both for the one-group cube and for a cube split into two groups, including trials with higher chart growth cost and zero normal penalties. No runtime change in this feedback entry.

Prioritize connected UV patches within Facegroups. Try unfolding along shared polygon edges, choosing cuts only as needed for overlap, topology or stretch. Acceptance: one connected non-overlapping net on a one-group cube, measured island counts per group on a multi-group model, intact Facegroup borders and corner UV mapping, Paint continuity inside a patch, and the existing preview/Apply/Cancel/Undo/export checks.

## .1191 / UV2 — Facegroup Guided Unwrap — 18 November 2026

- Protected user PASS .1190 / B1.
- On an unpainted Base mesh, open Object → UV → Guided Unwrap. Inspect cyan group borders and orange solver cuts/open edges, then Cancel. Check that the old UVs are intact.
- Apply a fresh preview, inspect UV Editor, then Undo and Redo. Verify Facegroup labels remain. Try an entire closed cube in one group and a flat ring with a hole.

# .1190 / B1 — shared Helios texture safety and opacity Reset — 18 November 2026

User confirms Helios Studio0.1.5 PASS /nextbuild. Selectively ported H1 runtime cb4e68d04f3837f12266468e3cca59450ae9081a allocator lease/free-slot/release/decode cancellation into BoxLab vendor. No wholesale replacement: packed roughness/metalness channel helper, independent metalness slot, source UV transforms and surface/emitter opacity retain original BoxLab owners. Import stages layer mapping and releases every reservation on overflow/image-write failure. Upload publishes new material layer/flags after success, releases failed new reservations, reuses a material slot across channels, and refuses concurrent same-material uploads. Restore releases occupied and pending leases; disposed tracer rejects late output. Dock upload records its original tracer/generation before awaiting and avoids saving a map to a replacement scene. Full H2 request ordering remains queued, not claimed complete.

Dock Reset now includes surfaceOpacity separately from emissiveOpacity. Existing texture size1024/eight-layer memory bound unchanged. Rebuilt existing Helios bundle; parent/tracer cache pins1190. UV1 worker/adapter owner URLs remain1189 intentionally; protected Multi1.0 unchanged; no modelling kernel edits (rolling release pins only).

New actual TypeScript owner tests cover eight→nine, non-next free reuse, untouched occupied bytes, failed decode and lease reuse, importer capacity/write rollback, real BoxLab adapter upload/replacement/Restore and metalness state. Existing mapping guard assertion moved to shared allocator instead of upload-only count guard; behavioral protection retained. Actual dock reset test checks separate saved surface/emitter defaults. Added CI full-app browser fixture: real selection bridge sets two diagonal grid faces, radial Extrude proxy and exact-input browser events, inward commit, Undo/Redo, direct Inset selection retention. Fixture selection uses production bridge, not physical pointer hit-testing; geometry kernel tortures remain protected Node gates. Final full/hosted validation and live proof follows; do not infer device acceptance yet.

DEVICE1190: Helios VIEW upload/replace maps on multiple surfaces, Restore and confirm other surfaces unchanged; lower Surface opacity then Reset restores original opacity; return modelling multi-face Extrude inward/UndoRedo; Auto Unwrap smoke. Accepted .1189 UV1 and standalone .1.5 PASS protected. Next UV2 guided Facegroups after B1 acceptance; H2 async ordering remains later in queue.

## 18 November 2026 — .1189 UV1 user PASS; H1 standalone next

Cris confirms UV1 .1189 PASS /nextbuild. Protect bounded Auto Unwrap checker/seam preview, Apply/Cancel, original polygon/Facegroup retention, Undo/Redo, existing native UV/Paint/export contracts; no imported/painted or guided-seam capability inferred. H1 is being implemented in standalone Helios Studio0.1.5: explicit eight-slot leases/free reuse/overflow and allocation/import rollback. Per the authoritative ordered queue, B1 separately ports the validated repair to BoxLab and adds surface-opacity Reset/browser modelling workflow coverage. BoxLab runtime remains .1189; do not claim its older vendor allocator is repaired by H1. Next UV capability UV2 guided Facegroups remains high priority.

# .1189 / UV1 — bounded worker Auto Unwrap — 18 November 2026

User invokes UV1 /nextbuild. Adds Object→UV→Auto Unwrap using pinned watlas/xatlas WASM in a disposable module worker. No groups required. Existing exporter-owned triangulation metadata maps every result back to original face corners; editable vertices/polygon faces/Facegroups/creases remain unchanged. Polygon-output binding path was found unreliable and is not used. A fixed1000-unit export-local extent avoids native absolute-area epsilon dropping valid thin corner-relief triangles; no world-coordinate/topology edit. Cube, ring with hole, concave n-gon, curved strip, sphere, torus, cylinder and a corner-relieved recessed solid pass real WASM validation. Inconsistent winding/non-manifold edges, collapsed triangles, incomplete/cross-polygon correspondence, UV folds/float32 collapse and unintended triangle overlaps are refused rather than silently losing geometry.

Private preview adds checker surface and orange UV seams without touching source UVs/history. Apply uses existing commitNativeUV and scene checkpoint; Cancel/close/target/payload/settings changes terminate worker/discard result. Old Facegroup preview and new Auto preview cancel each other; no competing persistent UV owner. In-place UV edits are guarded as well as payload replacement. Imported/material-bearing/painted/evaluated/linked targets remain protected and refused in UV1; later Guided/selected-seam/import/reprojection rows remain queued. Existing strict Facegroup/projection/editor owners retain behavior. Import-map aliases route old1075 and unversioned imported-uv-edit callers to1189, preserving one runtime owner.

Limits:4096 faces,20,000 vertices/corners,18,000 source render triangles,250,000 unique overlap comparisons,45s worker timeout. Emscripten glue caps linear-heap growth at128MiB (additional JS/preview memory exists). Worker termination releases native heap. Locally shipped MIT-licensed JS plus base64 WASM transport, pinned source/SHA in src/uv-vendor/UPSTREAM.txt; no external CDN or SharedArrayBuffer requirement. Geometry mappings/bytes validated; base64 transport uses explicit wasmBinary initialization via narrowly documented glue changes, no native algorithm modifications.

New actual-WASM, lifecycle, quality, history, project, GLB/NOM and original1024 Paint→native-map export tests pass. Prior full run found a VM fixture missing the newly installed actual workflow; fixture now includes it without weakening read-only assertions. Real-browser CI on staged source96d699e9 passed module worker loading, private preview, Cancel, Apply, exact geometry retention, Undo/Redo and NOM UV export. Final scale/guard revision is being rechecked before publication; full final suite/publication proof follows. Source code release markers1189; no physical-iPad PASS inferred.

DEVICE: Object mode→UV→Auto Unwrap; orbit checker/orange seams; Apply UVs→UV Editor/Paint; Cancel leaves old UVs; Undo/Redo; NOMAD export. Start with cube then sphere/torus and a modest recessed unpainted Base model. Existing .1188 user PASS protected. Next queue item H1 texture-slot safety; UV2 guided Facegroups and UV3 selected seams remain next UV capabilities, not claimed delivered here.

## 17 November 2026 — UV/painting priority and unified B / H / UV progression

User explicitly prioritizes robust automatic unwrap into usable large patches, Facegroup-guided regions and selected-edge seam control, with painting/UV work above optional renderer features. [Detailed UV audit and authoritative ordered queue](docs/UV_AUDIT_AND_ORDERED_BUILDS_2026-11-17.md) supersedes the previous audit's priority order. Next recommended runtime capability: UV1 bounded worker-based Auto Unwrap with preview/Apply/Undo using an external xatlas adapter; then H1 shared texture safety, B1 integration/workflow protection, UV2 guided groups, H2 async safety, UV3 selected seams and UV4 packing/quality, followed by painting/refinement/import/reprojection/export. Full25-row progression has explicit dependencies and useful completion gates.

Confirmed current Facegroup planner demands an already disk-shaped patch and refuses a closed one-group cube and planar ring; current Auto atlas is projection-based. Existing strict core/workflow tests9/9 PASS; retain their mode contracts while adding explicit Guided semantics. Isolated watlas WASM Node feasibility: cube6 charts, ring1 chart, source correspondence checked on ring; no BoxLab integration or iPad performance claimed. Preserve editable quads and current face-corner UV/history/paint owners. Verify explicit seam enforcement and temporary-triangle correspondence before adoption; xatlas material IDs are hard boundaries, not arbitrary soft preferences. Imported/painted target preservation, worker cancellation, pixel gutters and quality metrics are scheduled capabilities, not implemented claims. Audit only; runtime versions unchanged.

## 17 November 2026 — .1188 user PASS and coordinated next-build audit

Cris confirms current .1188 PASS; protect warning-based NOMAD export of incompatible-UV geometry and preservation of source UV/paint data. No separate .1187-only device result is invented. Detailed current-source audit: [BoxLab and Helios Studio next builds](docs/NEXT_BUILDS_AUDIT_2026-11-17.md). Recommended next BoxLab build: real-browser selection/radial/Extrude/inward/Undo coverage; shared texture-slot repair and small surface-opacity Reset repair; then measured modelling/navigation performance, authored-opacity NOMAD handoff and accepted Helios setup/fidelity work. Shared allocator wraparound reproduced in both repos with non-GPU dependencies; Helios async/material-fidelity gaps audited. BoxLab .1188 hosted Topology44082843031 now confirmed SUCCESS. Production WASM remains unpromoted; do not repeat .1152 workload. Audit only—runtime stays .1188, no queued feature implemented. Full prior suite3507 PASS; no unchanged runtime retest claimed.

# .1188 — warning-based NOMAD geometry fallback for mismatched UVs — 17 November 2026

User asks that stale UVs warn rather than block NOMAD export. File NOMAD now explicitly requests allowGeometryFallback from the existing async map adapter. Preflight identifies stale/evaluated/SubD/partial/invalid UV correspondence, or maps without UVs, before paint preparation/conversion. Only affected export-local objects omit glbPassthrough and colour/roughness/metalness/opacity paint resources; source objects, paint, stored UVs and history remain intact. Valid objects keep UV/maps in mixed scenes. Existing geometry resolver, native writer, facegroups and container validation remain authoritative. Strict default adapter/core callers still reject invalid UV transfer; there is no catch-all suppression of geometry/template/budget errors. Existing native NOM format uses its established neutral UV placeholders for untextured geometry; no usable source UVs/textures are transferred for fallback objects.

Download status starts with WARNING and count; a persistent File note identifies affected objects/reasons and says original UVs/paint remain in the project. It does not silently discard source data or require a confirmation dialog. Removed premature File-level opacity refusal so mismatch fallback can strip opacity locally; valid-UV opacity remains refused by native core as before. Export loader and changed async adapter cache pins refreshed.

Focused10/10 PASS: topology mismatch, partial UV, SubD, mixed valid+stale scene, unchanged source/resource identity, facegroup retention, real File NOMAD download and persistent warning; original strict UV writer contracts retained. Full regression/publication follows. Device: edit an old UV model then File→NOMAD; verify download plus warning and import geometry/facegroups; verify valid UV model retains textures; return to BoxLab and confirm UV/paint data remains. .1187 awaits device selection-retention result; no unreported PASS inferred.

# .1187 — preserve multi-face selection when launching Extrude/Inset — 17 November 2026

User marks .1186 FAIL: selected faces become unselected when choosing Extrude, before geometry can be tested. Audit found main.js native setDirectTool explicitly calls clearSelection on Extrude/Inset arming; normal newer document interception can avoid that legacy path, but its fallback semantics were wrong. Native arming now preserves an existing Face selection (including primary and full index array), while switching from another component mode still clears incompatible selection. Radial launch snapshots faces before hub closure/proxy click and restores them afterward only when mode, mesh and active-object identities still match. No deferred resurrection across object changes and no geometry/history operation on launch. Both Extrude and Inset covered. Existing direct controller and geometry owners remain authoritative; through-kernel unchanged from .1186.

New tests/face-extrude-launch-1187.test.mjs exercises actual native setDirectTool, actual radial click handler with a selection-clearing proxy, changed-object refusal, real direct click → selected pair → inward drag → one Undo/exact source restore. VM fixtures test owner behavior, not whole-browser propagation; local Chromium launch was blocked by environment socket restrictions, so no physical-browser pass claimed. Protected Knife/corner/many-region tests remain mandatory. Focused23/23 PASS; full suite/publication follows. Device: select multiple faces → radial Extrude and check all stay highlighted; drag inward/through; Undo/Redo; launch Inset; Done then select another group and repeat. .1186 is FAIL for selection launch, .1185 PASS retained.

# .1186 — scale corner-contact repair to large inward selections — 17 November 2026

User confirms .1185 PASS; reports five selected regions on a densely cut patterned solid cannot extrude through the rear surface. Reproduced a related size-dependent failure: 18 checkerboard regions on a closed 6x6 grid fail at shallow and through depths because corner relief stops after eight passes. Existing five-recess sloped fixture succeeds already, so screenshot parity is not claimed without the source model. Repair now bounds retries by the finite set of selected source vertices; each retry must still add at least one previously untreated corner. No change to cutter geometry, strict closed/manifold/winding validation, invalid Through refusals or tiny finite corner-web policy. Source remains immutable on trial/failure. Existing single-face and vertex-only contracts remain protected.

New tests/many-region-through-1186.test.mjs covers18 and32 corner-contact regions through the back, expected removed volume and absence of surviving caps, five recessed regions in a sloped dense pattern, real drag/commit plus exact Undo/Redo. Focused new/protected18/18 PASS (20.094s). Full suite/publication evidence follows. This extends correctness to larger selections; repeated trial rebuilding remains a performance limitation. Device: repeat attached five-region cut through; try a large checker selection; Undo/Redo; shallow vertex-touch recess and Knife snapping smoke. If original five-region failure persists, obtain the saved BoxLab mesh to reproduce its exact topology.

# .1185 — reuse fixed-snap Knife preview validation — 17 November 2026

User confirms .1184 PASS and invokes /nextbuild. Protect accepted crossing markers, face count, red invalid paths, snapping, preview cancellation and one-step commit/Undo. Narrow next build avoids repeating the private cutting trial when the snapped endpoint is unchanged. A per-drag single-entry cache retains ONLY validity, segment count and crossing marker data—not the private mesh/history snapshot. Exact key includes snap kind/type/vertex/edge parameter, screen/world position and camera world/projection matrices and projection type. No approximate quantization or topology cache across drags.

Source/object/mode validation still runs before cache lookup. Snap/camera changes revalidate; unsnapped state clears the cache; source edits disarm; release always runs a fresh original commit. Invalid feedback may be reused only for the identical state and refreshes when endpoint becomes valid. Existing one-frame scheduling/cancellation remains. Through-kernel and protected inward regression files are byte-unchanged.

Focused Knife/protected inward/release81/81 PASS. New measured-work test:20 small moves around a fixed midpoint require1 source clone rather than20; changed snap, projection and world camera force new trials. Source edit cancels and invalid→valid refreshes; release still makes exactly1 Undo. Syntax/diff pass. Full suite/publication evidence follows. Device: hover/jitter around vertex/MID snap and check stable markers; move to another edge and verify refresh; release/Undo, invalid red and vertex-only inward extrusion smoke. This saves redundant work while snap holds, not a claim that all large-mesh preview costs are eliminated.

# .1184 — live Knife crossing / validity preview — 17 November 2026

User invokes /nextbuild after accepting suggested preview refinement. Existing Knife guide now shows markers at each interior crossed edge and a live face count for a valid snapped stroke. Invalid snapped paths render red with a refusal message; unsnapped guides stay neutral. Original endpoint END/MID/PERP/EDGE colours and snapping stay. Crossings come directly from the existing successful multi-face commit result, not a second screen/topology planner.

Preview executes the existing cutting owner on a private mesh clone; live source, selection/history/redo are untouched. It reuses the per-drag ray picker and coalesces raw Pencil moves to one evaluation per animation frame. Pending previews cancel on release/cancel/disarm/context change; all crossing markers clear with the guide. Release independently uses original transactional commit and one Undo checkpoint. No through-kernel, topology or cavity behavior changes; release/cache closure repinned. The .1183 inward-extrusion protected contract in AI_WORKFLOW remains mandatory.

Focused Knife/corner-recess/release78/78 PASS, including two crossing markers/three-face count, immutable source and history before release, red gap/refusal with redo retained, queued update coalescing and no late markers after cancel, all previous Knife snap/transaction tests and protected inward regressions. Syntax/diff pass. Full suite and publication evidence follow. Device: drag across several faces and inspect crossings/count before release; invalid gap/path turns red; release makes one cut/Undo; END/MID/PERP, Done/cancel and vertex-only inward extrusion smoke.

## .1183 user PASS — protected inward-extrusion regression contract — 17 November 2026

User confirms .1183 PASS and explicitly asks that the recurring inward-extrusion defect not return. Protect tests/corner-recess-1183.test.mjs and tests/knife-multiface-1182.test.mjs as required behavioral release gates. They cover vertex-only simultaneous selections, four diagonal directions, successive recesses next to an existing cavity, Knife-created diagonal faces, real preview/commit/Undo, closed/manifold output, exact depth and unchanged input. Genuine invalid Through four-owner refusal remains protected separately. Do not remove, skip, narrow or change these success expectations to accommodate a regression. A deliberate user-approved behavior change must explicitly revise the contract; ordinary refactors must preserve it.

For any Knife, Loop, extrusion, clipping, assembly, seam/weld or selection-owner change, run these tests and the full npm test suite before publication. CI through-regression.yml runs npm test on main pushes and PRs for src/tests/runtime asset changes; package.json includes every tests/*.test.mjs, including these files. Verified 17 November: targeted14/14 PASS. This is documentation/protection only; application remains .1183, no new runtime build or device test required.

Suggested next .1184 (not implemented): multi-face Knife preview feedback—mark crossed edges and distinguish a valid continuous face strip from a refused path before release. Preserve current snap/transaction/history owners; no new cutting kernel.

# .1183 — vertex-touching inward recesses and calmer labelled navigator — 16 November 2026

User accepts .1182 multi-face Knife but reports inward extrusion failures; further screenshot/tests identify both Loop/Knife faces and simultaneous selections touching only at one vertex, plus successive diagonal recesses. Reproduced on closedGrid4: after face21 recess -.096, four diagonal neighbours refused invalid-edge-or-face-topology. Normals/status are valid; exact corner-only cavity contact welds into a four-owner vertical edge. Do NOT weaken validateThrough or revive retired handlers.

Existing buildNegativeExtrude now retries ONLY diagnosed output four-owner contacts (no boundaries/degenerate/duplicate faces), matching bad-edge endpoint positions to original selected source corners. Those corners alone get a tiny finite corner relief, at most128*existing eps and1% adjacent edge length; too-small junctions refuse. All other footprint/depth stays unchanged; original source stays immutable. Bounded8 retries, original clipping/assembly/manifold and vertex-fan validation remain authoritative. Corner-only retries skip optional rectangular-shoulder retopology so the tiny valid junction stays intact. Ordinary successful cuts retain exact original path; genuine buildThrough four-owner refusal remains protected. This is a tolerance-sized geometric corner treatment, not merely status relabelling or invalid topology acceptance.

Navigator adds Front/Back/Left/Right/Top/Bottom text centred on each face with projected face-plane orientation, front-side culling and outlined text. Face labels do not consume pointer input. Exact original geometry/lighting/corners retained. orbitFromLogo uses half its prior angular gain; viewport orbit unchanged. Lock/Home/Extents/Floor retain owners.

Focused extrusion/Knife/Through/navigator/release123/123 PASS, including diagonal selections in four directions, sequential cavity neighbours, real UI preview/commit/Undo, Knife-created vertex-only pairs, exact recess depth, closed topology and bounded volume delta; face labels and exact half angular gain. Syntax/diff pass. Full regression/publication evidence follows. User .1182 ordinary multi-cut acceptance protected, its inward case fixed here; .1181 PASS remains. Device: two faces sharing only a vertex inward together; screenshot sequential diagonal recess; Knife split faces inward and UndoRedo; six view labels and half-sensitive drag, lock/Home smoke.

# .1182 — Knife across connected visible face strips — 16 November 2026

User requests Face > Knife across multiple edges with existing edge/vertex snaps; sketch was not received in this thread, so scope is a straight drag across a connected visible face strip. User separately confirms .1181 PASS; protect exact Plane/Grid footprint continuity and prior grid/navigation behavior. Original Knife owner/cleanDiagonal/connectVertices remain authoritative. End snap search now includes the currently visible face beyond start-incident faces; END/MID/PERP/EDGE priority and release hysteresis stay original.

Single-face cuts retain original path. Longer strokes plan perspective-correct shared-edge crossings along the screen segment against unchanged source. Visible hit depth rejects covered crossings; each interval must lie in a source face containing both boundary endpoints, refusing gaps/disconnected/ambiguous paths. All shared endpoints resolve once, then existing validated diagonals commit together. One history checkpoint; any failed split restores the entire source including groups/creases/loose metadata and preserves redo. Existing object/mode/geometry stale-source checks, cancellation and persistent Knife session retained. A per-drag picker is reused for endpoint motion and released on cancel/release; strip planning reuses one picker, not one geometry allocation per crossed edge. No second topology kernel.

Final focused Knife + release checks 68/68 PASS, including perspective/ortho strips, folded surfaces, END/MID endpoints, hidden back faces, disconnected gaps, late failure rollback, groups/creases and exact Undo/Redo; all original Knife tests retained. Syntax/diff pass. Full regression/publication evidence follows. Device: straight drag boundary-to-boundary across several visible faces; END/edge snaps and MID/PERP with inference on; one Undo/Redo for whole stroke; folded strip and normal single-face Knife, Done/cancel/navigation. .1181 PASS protected.

# .1181 — continuous Plane / Grid footprint in 3D — 16 November 2026

User confirms .1180 PASS, but requests exact 3D Plane/Grid continuity. Audit: Studio floor follows visible model bounds, minimum span24, at bounds.min.y-.025; grid was fixed span12 at y=-1.55. The same GridHelper now fits the existing Studio floor world centre, height and actual rectangular footprint in perspective. Render-modes refreshStudio publishes its final floor transform to the existing ground owner; camera/ground synchronization also follows it. No duplicate model bounds/floor-size calculations or second grid.

viewport-grid fits the existing helper by regenerating only its line geometry when floor footprint/centre changes, disposing prior geometry; unchanged camera updates reuse it. Lines are clipped to floor edges and remain world-aligned every0.1, major every1, with accepted white/pale colours, without scaling cell size. Original startup hidden state, Plane/Grid/Off visibility, Clean View, six ortho plane normals, lock/Paint/history/Multi remain. Perspective return now intentionally fits the live floor instead of restoring obsolete fixed grid placement. Orthographic plane orientation remains the .1179 owner.

Focused grid/floor/ortho/release 12/12 PASS: exact translated floor world bounds/height, rectangular resize, world0.1 coordinates, unchanged geometry reuse, initial hidden state and original grid palettes. Syntax/diff pass. Full regression/publication evidence follows. Device: repeatedly cycle Plane→Grid→Off→Plane in 3D; same centre/height/extent; move/resize/import model then compare; verify0.1/1-unit lines, six ortho/Home and refresh no grid flash.

# .1180 — startup grid hidden and decimal subdivisions — 16 November 2026

User confirms .1179 PASS for stronger grid, all six orthographic planes and 3D floor replacement; reports initial grid flash and requests 0.1 subdivisions / white 1-unit major lines. Original GridHelper is now constructed once through viewport-grid.js: span 12, divisions 120 (0.1-unit cells), four vertex colours per line pair, every tenth line white 0xf1f4f8 and minors pale 0x697481. Main uses this single factory in place of its original GridHelper constructor; no second helper or overlaid major grid. Original -1.55 ground height retained. Geometry holds 484 vertices; no dynamic rebuild or per-frame allocation added.

Factory sets visible=false BEFORE scene.add and first render. The existing ground presentation owner alone exposes grid when Grid is selected, removing the default Three visible=true startup flash. Plane/Grid/Off preference, .1179 ortho orientation/restoration, Clean View and floor/contact exclusion retained. Main loader and new module cache graph reviewed. Protected modelling, Multi, orbit lock, navigator and Paint unchanged.

Focused geometry/floor/ortho/release checks 11/11 PASS. Actual geometry verifies all 121 coordinates per axis, 0.1 spacing, every 1-unit major and both exact vertex palettes; initial hidden state and original main scene wiring checked. Full regression/publication evidence follows. Device: refresh in default Plane mode without grid flash; select Grid, count 10 cells across 1-unit cube width and inspect major/minor contrast; six ortho views/Home restore; Plane/Grid/Off and lock smoke.

# .1179 — brighter grid and six orthographic planes — 16 November 2026

User confirms .1178 PASS: protect four navigator action corners, orbit lock preserving two-finger pan/twist/pinch, Home/Extents/Floor owners and cube appearance. GridHelper remains the only grid owner: line colours raised to centre 0x9aa8bb / minor 0x627085, opacity Studio .5 / other modes .65. Original 12-unit span, 24 divisions retained. Grid mode continues to hide solid Studio floor and contact shadow, including in 3D; Plane/Grid/Off and Clean View behavior remain original.

Ground presentation now tracks original controls change events through one lightweight callback (no frame polling or scene traversal per gesture). Dominant camera axis selects XY for Front/Rear and YZ for Left/Right at origin; Top/Bottom retain XZ ground. Exact original grid position/quaternion are kept in a WeakMap and restored when perspective returns. Initial/apply synchronizes immediately; replacement controls detach prior listener. No new grid, geometry/helper allocation per frame, saved state, input owner or modelling changes. Main/ground parent loader pins and release graph refreshed. Protected Multi untouched.

Focused floor lifecycle, all six orthographic normals, perspective restoration, floor exclusion and release checks 10/10 PASS; syntax/diff pass. Full regression/publication evidence follows. Device: select Grid, inspect stronger contrast; tap Front/Rear/Left/Right/Top/Bottom; Home returns ground grid without solid floor; Plane and Off still cycle, lock/navigation and startup smoke. Native visual strength remains device acceptance.

# .1178 — viewcube action corners and orbit lock — 16 November 2026

User requests Nomad-style viewcube controls. Existing navigator now has four 38px corner buttons: upper-left orbit lock, upper-right original frameAllBtn (Extents), lower-left original floorToggleBtn (Plane/Grid/Off), lower-right Home glyph replacing 3D, using the same setView('axon') owner. Frame/Floor DOM nodes and listeners move from the top bar; toolbar decoration now leaves navigator-owned buttons in place. No proxy duplicate or second frame/floor implementation. Cube SVG keeps accepted 112.5px size and mode lighting; host shifts left to fit corners within right safe area. Home means the existing axon/perspective return, not new saved cameras.

FreeOrbitControls owns orbitLocked and setOrbitLocked: stop residual spin on toggle, suppress only _rotateLeft/_rotateUp tumble. Existing two-contact direct view-axis twist, original pan projection and pinch remain enabled. Logo drag also refuses tumbling while locked; explicit face taps/Home/Extents remain available. Lock is session-only, initially unlocked; button exposes pressed state and Unlock label. No new raw viewport pointer listener, saved-project data, history or geometry changes. Main/topbar/view module loader keys refreshed for changed nested owners. Protected Multi1.0 unchanged.

Focused navigator/action-reuse/real camera gesture/release checks 20/20 PASS. Tests exercise locked combined pan/pinch/twist with both anchors preserved, blocked single-contact movement, unlock restoration, original Extents/Floor listeners and Home callback. Syntax/diff pass. Full regression/publication evidence follows. Device checks: four corners, Lock→single-finger orbit blocked→two-finger pan/twist/pinch→Unlock; Extents fits, Home returns axon; Plane/Grid/Off cycles; normal logo taps/drag, Paint and top/bottom panel positions. .1177 startup fix native acceptance not inferred from this feature request.

# .1177 — eliminate pre-module tools and oversized-logo flashes — 16 November 2026

User confirms .1176 PASS; protect accepted mixed top/bottom panel placement and all earlier navigator/Paint/modelling behavior. Reviewed supplied refresh recording: transient old drawer and oversized header logo occur before module styling settles. Root cause in source: Focus drawer display:none only installed by view-modes.js, and header logo 34px dimensions only by topbar-layout.js. Both now exist in the render-blocking viewport-toolbar-shell.css, before body paint; logo also has HTML width=34 height=34 for intrinsic space before image decode. Header alignment/gap matches final layout. Existing html.boxlab-focus-view gate remains; original Focus toggle can reveal tools. No startup timeout, blanket app hiding, second UI/renderer, or gesture/history changes. Original late rules match the early state exactly. Repin changed stylesheet and release/cache closure.

Focused first-paint/release checks 7/7 PASS; new tests check shell Focus state, stylesheet-before-body placement, scoped drawer hiding, original toggle and matching HTML/early/late logo dimensions. Full local regression and publication evidence follow. Native device gate: refresh repeatedly, watch for old tools/oversized logo, toggle Hide Tools off/on, then check accepted panel placement/Paint/navigation. Supplied recording stays out of repo.

# .1176 — close vacant bottom panel slots — 16 November 2026

User confirms .1175 PASS: protect vertical top-left stack, 8px gaps, bottom Snap/Select gap and Paint in Mode Select. When Mode is moved to top, its old bottom reserved height is now released. Bottom Select sits at the original status-lane anchor (desktop 27px / compact 25px plus safe-area policy); bottom Snap follows above it by its actual height + 8px. If Select is also at top, Snap occupies the released Select slot. Existing .1175 measured top ordering and Snap offset already handle moved Snap/Select; the new class-scoped anchor completes all mixed combinations. Returning Mode to bottom restores its accepted reserved slot. Original nodes, listeners, Paint/history/modelling/Multi/Helios untouched.

Focused preferences/placement/toolbar/release checks pass 14/14, including all eight placement combinations, resized heights and both desktop/compact anchor rules. Full local suite and publication evidence follow. Device: Mode only at top => Snap and Select lower with no vacant Mode slot; toggle Snap/Select top choices; restore all bottom; reload/rotate and verify status lane and 8px gaps.

# .1175 — left-edge panel stack and bottom spacing — 16 November 2026

User rejects .1174 horizontal placement. Enabled top panels now stack VERTICALLY along the left edge in Mode / Snap / Select order; all left edges stay 8px from the viewport and each gap is 8px. Placement measures actual panel heights and updates on resize. Mixed checkbox choices skip panels located at the bottom. Bottom Snap placement now uses the actual shorter Select panel height after Paint moved, eliminating the retired Paint-button gap; when Select is at top, bottom Snap uses its empty rail position. Paint remains in Mode Select, and user explicitly confirms it is visible. No Paint behavior changes.

Final focused placement/preferences/toolbar/release checks: 13/13 PASS; all eight placement combinations and bottom offset are checked. Syntax/diff checks pass. Full regression result and publication proof will follow. Preserve .1173 navigator PASS and prior modelling/history/Multi protections. Device: all top enabled gives Mode then Snap then Select down the left; all off gives a tight 8px Snap/Select gap; mixed settings and reload/rotation keep left alignment. Paint opens and Done exits.

# .1174 — Mode Paint and optional top-left panels — 16 November 2026

User confirms .1173 PASS; protect navigator size, lighting and navigation. Move the original Paint entry into Mode Select, retaining the UV painter and Done owner, with an active Paint highlight. VIEW General Settings adds persisted Mode select at top left and Select options at top left choices alongside Snap. Original panels remain in place; measured widths place enabled panels horizontally in Mode / Snap / Select order, with 8px top/left inset and 8px gaps. Disabled choices retain bottom placement. No modelling, history, Multi1.0 or Helios changes.

Validation: full local suite 3,462/3,462 PASS, zero failures/cancelled/skips (104.616s); final Paint/release focused 8/8 PASS, placement/preferences 3/3 PASS and shell/toolbar/release 25/25 PASS. Syntax and diff checks pass. Browser visual run was unavailable because Chromium could not create its process singleton socket; no native iPad acceptance claimed. Initial stale release/CSS assertions were corrected without removing behavioral coverage.

Device checks: Paint from Mode Select then Done; toggle each placement; enable all three and inspect ordering/gaps; reload and rotate to verify persistence and spacing. Publication is via the connected GitHub release branch, followed by a guarded fast-forward of main and live-byte verification.

