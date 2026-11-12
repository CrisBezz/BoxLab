# .1133 â€” tighter modelling radial orbits; .1132 protected PASS â€” 11 November 2026

User .1132 PASS is protected. User requests tighter orbit distances without shrinking icon artwork, and explicitly authorizes this build plus the following /nextbuild. Split requested presentation work into modelling rings .1133, then Paint wheel .1134. Audit baseline main6a42d5068dd210bcb46f4e9ad4f10fee2085d4b5 and live .1132, original total-gizmo markup, final radial CSS, compact placement and existing geometry/action tests. Previous .1130 layout dimensions are intentionally superseded only where this request requires closer spacing; accepted selection/DRAG/puck, painted highlight, FRONT, gestures and all modelling/Paint kernels remain protected.

Keep original72 target buttons, full labels, tooltips, glyph artwork,40px frames,28px normal artwork and52x56 normal hit rectangles. Extrude stays12 o'clock, Bevel3 o'clock and all primary inner slots/radius80 remain. Face outer tools plus original FACEGROUP now share16 equally spaced22.5-degree slots at radius176; FACEGROUP remains the same dock-owned button, not a new tool. Edge Join Coplanar returns to22.5degrees between Circle and Loop; Vertex Merge Dist/Clean Vertices follow the shared Face directions292.5/270. Face/Edge outer radius194->176; sparse Vertex/Object outer radius194->160. Overall target-envelope diameter440->404/372px,8.2%/15.5% smaller (about16%/29% less area), without smaller icons. Corresponding faint guides follow new circles. No large UI cleanup or duplicate input owner.

Existing compact placement accepts optional mode, caps radius176 or160 instead of230, retains original viewport bounds/opt-in policy,44px compact targets and extra-narrow same-button grid. Gizmo passes current mode only when fitting tool picker; transforms remain anchored to selection. Original labels/actions and model/history owners untouched. .1132 Through/index, .1131 corner repair, .1118 outward corner and .1116 Loop sources/pins preserved; protected Multi0.36.1.0 unchanged.

Updated existing all72-target nonintersection test and old Face/Facegroup angular/count checks for the explicitly requested arrangement, retaining full target-count, glyph, primary-slot and original action delegation assertions. Focused radial/compact/Facegroup/Vertex/release checks PASS; final full local3,372/3,372 PASS (0 failures/skips), focused39/39 PASS, syntax and diff clean. Initial full3,371/3,372 exposed shared outer-direction drift; fixed original Vertex slots rather than weakening that consistency test. Publication pending below. Presentation-only gallery docs/radial-preview-1133.html regenerated from original ring markup and artwork. A local SVG geometry render with original vector glyphs was inspected; it demonstrates layout, not native Safari/Pencil or browser CSS raster proof. Prior browser URL-policy limitation is not bypassed. Native .1133 acceptance pending.

Cache closure: final radial CSS, total-gizmo and compact-layout -> shell .1133, plus canonical release-version -> Face workflow -> drawer; reviewed asset hashes updated only for changed owners. Unchanged main/DRAG/puck/Paint/glyph and topology pins retained. Paint retains its292px wheel until the separately authorized .1134 follow-up.

Device .1133: open Vertex/Edge/Face/Object rings, inspect dense outer captions and unchanged icon size; launch Extrude/Bevel/Loop/FACEGROUP and cancel; verify DRAG puck and navigation; narrow-pane grid/transform smoke. Do not record .1133 user PASS merely because .1134 follows. Continue directly to Paint wheel tightening after publication, as explicitly authorized.

---

# .1132 â€” indexed assembly vertex search; .1131 protected PASS â€” 10 November 2026

User confirms .1131 PASS and requests /nextbuild. Protect inward rectangular-band diagonal shoulder joins and .1130 painted selection, subtractive DRAG/puck and compact radials; .1129 FRONT, rail order, .1121 Through frames, .1118 outward corners, Loop .1116 and Multi 0.36.1.0 remain protected. Audit main037c9bfa35c95d66f694943b2363761691f02ffc, runtime393d446c, release/pins and live .1131. Previous runtime hosted Topology42803412136 and Pages42803411971 both SUCCESS; earlier pending native .1131 entries superseded by user PASS.

Next measured bottleneck: assemble still scans all vertices on each distinct uncached coordinate query after .1125 reuse. Initial3456-face probe spent215.78ms of650.75ms in vertex assembly. Repair that same owner with an invocation-local sorted XYZ broad phase on assemblies starting with >=2048 vertices; smaller assemblies retain the original inline findIndex. Query shortest conservatively expanded coordinate interval, check all three bounds, then apply the original distanceTo<=eps predicate and return the lowest matching original ID. Every canonical/direct append is inserted before the next uncached query. Existing coordinate-query cache and canonical beyond-eps endpoint guard remain. No rounding grid, new welding tolerance, changed edge split, moved vertex or persistent mesh cache.

Unsafe/nonpositive/nonfinite tolerance, coordinates or bounds retain the original linear predicate. Index/query cache discarded after each assembly; original-ID semantics, clipping/classification, seam conformance, metadata/creases, validation, refusal, selected caps and clean topology/history owners stay intact. This is a cut-specific JS optimization, not a new modelling kernel, WASM integration, native lag/capacity solution or listener removal. Additional transient storage is linear in vertices; sorted insertion can still be linear, so no worst-case complexity claim.

Frozen exact .1131 assemble under tests/fixtures/performance. Profiling helper instruments both original and indexed exact distance predicates; timings have no per-predicate counters. Historical .1125 benchmark now fixes its after-owner to that frozen assemble (same .1125 lookup) instead of silently measuring future runtime. New benchmark scripts/benchmark-through-vertex-index-1132.mjs writes docs/performance-through-vertex-index-1132.json, comparing complete current negative-cut kernels with only assemble swapped. Three warmups, nine alternating paired samples; separate untimed counts. Includes clipping/assembly/validation/compaction; excludes controller, contact inference, history, rendering, browser/GPU/iPad.

Six new cases cover seeded parity across scales, earliest-ID ties/duplicates/epsilon boundaries, late direct and actual canonical appends, unsafe/extreme values, exact complete inward/Through geometry/metadata/cap IDs/source, >=10x indexed predicate reduction, and unchanged small-model predicate count. Existing .1131 corner and .1125 canonical endpoint/history tests remain active. Initial focused topology123/123 PASS; final suite/benchmark and publication proof follow below. Early all-size indexing slowed the384-face fixture; retained original small-model path. Mid-size indexing did not consistently reach the10% whole-cut timing gate even after removing candidate-loop callbacks. Final eligibility is >=2048 initial vertices, retaining the original inline search below that threshold. Do not present failed iterations as shipped speedups.

Release cache closure: kernel -> multi-face-direct/sequential-through-fallback -> drawer, plus canonical release-version/Face workflow and shell/comparison .1132. Unchanged .1130 selection/UI, .1129 component tap, uniform-inset/loose-bootstrap .1127, .1118 corners, .1116 Loop and protected Multi pins retained. Asset contract reviewed only for changed owners. No visual/input redesign.

Device .1132: compare repeated inward and Through previews on the same many-face model; inspect .1131 corner diagonals and accepted exit frames; vary distance, Cancel, then Done/Undo/Redo; confirm ordinary small cube cuts. Keep same model/device/settings for performance comparison. Native benefit pending. Next optimize only measured remaining owner costs, preserving accepted clean geometry; WASM remains evidence-gated.


Final paired benchmark PASS:384/1536/3456-face cube complete-cut medians58.28/221.53/597.29ms ->47.81/221.18/488.58ms. Only3456-face fixture uses the index (3458 initial vertices):1.22x speedup,18.2% less time, exact distance predicates5,994,449 ->3,458. Smaller fixtures retain the original inline search and identical predicate counts76,241/1,189,649; their wall-time variation is not claimed as an optimization gain. Correctness, >=10x indexed distance-predicate reduction, >=1.1x indexed complete-cut timing and <=15% small-model regression gates all PASS. Initial full local3,372/3,372 PASS before final2048 cutoff; final full local3,372/3,372 PASS (0 failures/skips); JS syntax and git diff --check clean. Publication proof follows.



.1132 publication verified: runtime 374c1dc0bd545fba38296214cdadfc37faf82fb2, tested tree 8a7eb8a0e47b67f52f54d01a582ecdbd7ff9adf9. Pages42810965560 SUCCESS. All17 cache-busted live shell/kernel/loaders/report/protected files byte-match tested local source. Final full local3,372/3,372 PASS (0 failures/skips), syntax and diff clean; paired benchmark PASS with18.2% less complete-cut time on the indexed3456-face fixture and exact geometry. Hosted Topology42810966491 still running at proof; no hosted result claimed. User .1131 PASS and earlier .1130/.1129/icon/cut protections recorded. No native performance or WASM/capacity claim. Ready .1132: same many-face inward/Through preview; corner/frame joins; Cancel and Done/UndoRedo; ordinary small cube cuts. Await native PASS/FAIL.


---

# .1131 â€” inward rectangular-band shoulder corners â€” 10 November 2026

User .1130 PASS is protected: painted-face selection overlay, subtractive DRAG, completed-stroke puck with tap-only tools transition, and compact Vertex/Edge/Face/Object/Paint radials. FRONT .1129 and Select / Lasso / Drag / Front / Paint order remain protected. Current audit baseline main cba11f6e079ca880bc85452b73ef4713483a69e4; runtime .1130 174dd12b281d56f708c2c96da22b698f08c6c7fb. User screenshot requests diagonal corner joins on the shoulders of an inward-extruded rectangular band, matching the green marks. Exact project was not supplied; generated rectangular-band and hollow-collar fixtures reproduce this class.

Audit: closed negative multi-face extrusion is owned by buildNegativeExtrude in through-kernel, not the accepted outward connected-corner planner. The inward cut already produces correct physical surfaces, but leaves square clipping joins on planar annular shoulders. Reuse the existing Through exit quad-frame planner for an optional final retopology of newly generated rectangular shoulder patches. Use existing boundary positions; four side quads meet at actual corner-to-corner diagonal edges, with unchanged cut volume and surface. Corresponding authored subdivisions are preserved. Existing assemble and validateThrough remain authoritative; no parallel modelling kernel, Boolean rewrite or new input owner.

Conservative eligibility: one-row parallel rectangular bands with four convex corners and equal corresponding boundary runs. Preserve original vertices, boundary creases, facegroups and neighboring seams. Mixed patch groups, authored internal creases, pre-existing coplanar faces, concave loops, unequal collapsed runs and unsafe candidates retain the original valid cut. Candidate assembly/validation failure also retains the original. Accepted .1120 concave inward source-plane behavior, .1121 Through exit frames, .1118 outward corners, .1116 Loop and protected Multi 0.36.1.0 remain intact.

Eight new regressions compare repaired and legacy output: actual diagonal edges and four wall quads, subdivisions, equal volume/unchanged nonwall surface, metadata/crease preservation, exact fallback snapshots, transformed band, actual progressive preview/Cancel/Done/Undo/Redo, and hollow collar with existing front rim preserved. Targeted topology 122/122 PASS; focused release checks PASS. Final full local 3,366/3,366 PASS (0 failures/skips); syntax and git diff --check clean. Initial run caught only a stale release-version asset-contract pin; corrected reviewed pin, focused contract9/9 and full rerun PASS. Publication pending below. Geometry plot inspected for square-before versus diagonal-after joins; no native Safari/Pencil acceptance inferred.

Cache closure only: through-kernel -> multi-face-direct and sequential-through-fallback -> drawer; shell pins and canonical release-version -> Face workflow -> drawer refreshed to .1131. Unchanged uniform-inset/loose-bootstrap .1127, .1130 UI owners, .1129 component tap, outward .1118, Loop .1116 and Multi pins retained. Legacy bootstrap test now uses reviewed parent-loader pin while still asserting original singleton bootstrap and uniform-inset child pins. Reviewed asset contract updated for changed owners only.

Device test .1131: repeat screenshot inward band and inspect all four shoulder diagonals; vary inward depth and Cancel; Done then Undo/Redo; smoke accepted outward corners and Through exit frames. .1130 PASS remains protected. Native corner acceptance pending user feedback. Publication proof follows.


.1131 publication verified: runtime 393d446c1d3ec14653a53c6b608c833285ef6a8c, tested tree e9ed438ec8026b18b7af5cf0769367963cb965b6. Pages42803411971 SUCCESS. All16 cache-busted live shell/kernel/loaders/protected files byte-match tested local source. Full final local3,366/3,366 PASS (0 failures/skips), focused release13/13 and corrected cache contract9/9 PASS, syntax and diff clean. Hosted Topology42803412136 still running at proof; no hosted PASS claimed. Exact screenshot project unavailable; generated band and hollow-collar fixtures plus inspected geometry comparison establish diagonal topology in this class, not native Safari/Pencil acceptance. User .1130 PASS protected. Build .1131 live and ready: same inward shoulder corners, vary depth/Cancel, Done/Undo/Redo, outward/Through smoke. Await user PASS/FAIL.


---

# .1112 â€” eliminate Edge Classification repeated edge builds â€” 9 November 2026

User confirms continuous contact navigation is smooth; lifting/restarting and object-list actions lag, with Performance off and in Safari too. User requires preserving listeners and concave/quad correctness. Audit of release inspectors on a generated1000-quad grid measured ~1341ms total in Node, dominated by select-sharp-edges (~796ms), then vertex-valence/classification/cleanable (~140â€“150ms each). Harness omitted one unresolved dependency and one DOM-stub path; this is a source benchmark, not an iPad reproduction or complete release-handler profile.

The sharp-edge inspect loop already holds m.edges(), but calls m.edgeCrease(index), which rebuilds the entire list on each edge. .1112 reads the SAME creases Map via the SAME edgeKey using the current enumerated edge; legacy fallback remains for external meshes without the native map API. One edge enumeration per inspection replaces E+1. All listeners, timers, sync/apply owners, crease threshold and face-angle/topology classification rules are retained. Concave selection and quad-cleanup source/pins unchanged. Protected Multi transform untouched. Remaining vertex inspection costs are separate future targets; iPad end-to-end gain unproven.

Focused classification/release checks11/11 and full local suite3,243/3,243 pass; diff check clean. Repeated desktop harness: sharp-edge callback5.8ms versus796ms, measured aggregate551ms versus1341ms; remaining vertex inspectors dominate. These are synthetic source measurements, not native speedup claims. Hosted Topology42542754611 passed3,243/3,243 on runtime commitfe58b5054e144488303a6d26fe03b669e23bfc5c. Initial Pages42542754045 built successfully but deploy remained in progress when this documentation followup was prepared; deploy logs were unavailable (BlobNotFound), cause unproven. Verify the latest Pages deployment before release completion. Native1112 acceptance pending. Device: compare lift/restart orbitâ†’panâ†’pinch and Object Browser open/select/delete; check sharp/smooth/creased/uncreased selection after crease changes and Undo/Redo; confirm concave selection and quad cleanup still behave. Then reset Performance and capture report. Native1112 pending; prior PASSes retained.

---

# .1111 â€” callback and scheduler diagnosis â€” 9 November 2026

User FAILs .1110 performance: possibly worse. Report records10 gaps/max3212ms and first-move event delivery1084ms; camera response remains0â€“2ms, texture decode15ms/display38ms and one29ms rebuild. No improvement or regression causality inferred from unmatched manual windows. .1110 copy-removal correctness remains covered, but performance gate is FAIL and latency cause OPEN.

.1111 extends existing opt-in Performance owner: complete main animation callback including controls.update, named recurring gizmo/origin/sweep/Clean View callbacks and monitor-refresh timings;100ms heartbeat records timer lateness separately from animation gaps. Last120 timings per owner,80 trace entries, callback spans>=50ms and timer lateness>=250ms. Hidden-document heartbeat pauses, Reset clears timing baselines, Close clears timers. Async browser work, uninstrumented handlers and GPU/compositor can still cause unexplained gaps; timing correlation alone is not attribution. Existing owners/scheduling retained; protected Multi transform untouched.

Corrected focused checks15/15 pass; initial full local run3235 PASS/2 FAIL exposed timer-count and Sweep cache-key/source-version assumptions. Both contracts corrected without runtime changes; final hosted Topology42535732491 passed3,237/3,237. Runtime commit d1320a07edde7986c1dc0d0273bed79edec83c21; Pages42535731949 succeeded. Native1111 acceptance pending. Device: same textured model â†’ Performance Reset â†’ orbit/pan/pinch and a short hands-off interval â†’ download report; confirm navigation and controls remain usable. This is a diagnostic build, not a claimed performance fix. Prior PASSes retained; native1111 pending.

---

# .1110 â€” origin marker avoids mesh/history saves â€” 9 November 2026

.1109 iPad trace: seven long gaps, maximum2244ms, no rebuild/texture stages; one navigation submission2235ms overlaps2241ms frame gap. Two-finger movement-to-camera0â€“1ms. This does not prove the blocking owner. Code audit found origin marker updateMarker â†’ activeObject â†’ manager.objects â†’ saveActive copying live mesh/settings/history every animation frame, including hidden component modes. .1110 exposes the existing manager activeObject identity through its API and uses it ONLY for the marker display read, after mode/camera guards. The origin module selection-ID wrapper also uses existing groupMetadata instead of the saving objects getter; it needs only IDs/group membership. Existing action-side activeObject reads and saveActive semantics remain. Original ensureOrigin retains lazy origin initialization and live-mesh fallback. No protected Multi transform change or new modelling owner. Device performance gain remains unmeasured.

Focused origin/cage checks pass14/14; corrected release/origin checks pass7/7. Initial local suite3235 PASS/1 FAIL was only a fixture key incorrectly expecting unchanged performance-core at1110 instead of1109; corrected fixture, runtime unchanged. Final hosted Topology42522798783 succeeded on release commit9758777a55d4875f01c62d10f3e527b247955a5a; Pages42522798112 succeeded. Protected Multi transform unchanged; diff check clean. Device: compare orbitâ†’panâ†’pinch on the same textured model, confirm origin marker follows selection and Move/Undo/Redo, then reset Performance and download report. Native acceptance pending; .1104 spacing/.1102 scene and modes and prior Paint PASSes protected.

---

# .1109 â€” measure two-finger gesture onset â€” 8 November 2026

User confirms .1108 orbit is prompt, pan hesitates and pinch zoom hesitates longer. Its report has no stage/rebuild work, four long frame gaps (max 2302ms), and navigation-submit max11ms. This does not identify the delay cause or prove gaps occurred during gestures. Audit confirms main uses FreeOrbitControls, which preserves Three pointer ownership and customizes two-finger dolly/pan. Existing passive monitor now traces touch-contact, first-touch-move and navigation-onset intervals, contact count, controls enabled state and comparable event timestamp delivery age. Contact-to-move includes deliberate user waiting; timestamp age is not hardware-to-screen latency. No navigation behavior fix is claimed. Protected Multi transform and .1104/.1102 PASSes remain unchanged.

.1109 full local regression passes 3,234/3,234; diff check clean. Published runtime commit `5e2d9f0b8c046d36e4a31c0d99b809113a5dce28`; Pages run `42476135397` and hosted Topology `42476135706` succeeded. Device: reset Performance with textured model visible; orbit, pan then pinch; download report and describe delay. Native acceptance pending.

---

## .1108 â€” timestamp long pauses and related work â€” 8 November 2026

The user supplied the .1107 iPad report after a controlled navigation capture: 1,002 vertices / 1,000 faces, 3 textures, 120 frames at 59.97 FPS (17 ms p95), 7 long frame gaps (max 3,243 ms), navigation-submit max 3,243 ms, decode 3,253 ms and time-until-visible 3,274 ms. Camera-change mean is 0.058 ms / max 1 ms; typical submit p95 is 10â€“11 ms. The close maxima suggest a possible shared window but the report has no event timestamps, so overlap/cause is unproven. 88 zoom update samples were grouped into two pan+zoom sessions and zero pure-zoom gestures; the test did not isolate pure pinch.

Audit reuses the authoritative `src/performance-core.js` monitor and `src/performance-monitor.js` UI. .1108 adds a bounded 80-event monotonic-clock trace containing named stage spans, frame gaps >=1,000 ms and navigation-submit spans >=250 ms; Reset clears the trace. No renderer, camera, texture or model behavior changes. Existing summary statistics and navigation ownership remain intact. Protected Multi transform is untouched. Focused performance/release checks pass 23/23; full local `npm test` passes 3,233/3,233; `git diff --check` is clean. Runtime commit `5601dda6e52bc0e7c898e5ed19ff7a1b16eb5e12` (tree `357ac8ab9f2d39c55306626d527d27057b969260`) is published. Hosted Topology `42473921978` passed 3,233/3,233; Pages `42473921522` succeeded; live app displays .1108. Native acceptance pending.

## .1098 â€” scene hook profiling breakdown â€” 7 November 2026

User requests the next build after confirming .1097 PASS and providing a second viewport report. The .1097 cage optimization remains protected; latest matching-count report still showed 297 ms mean total rebuild with 286.25 ms mean / 1,125 ms max in Scene hooks. Different operation distributions mean this does not establish a controlled regression or cause.

Audit followed the production `main.js renderMesh â†’ root.add(body)` chain. Multi's existing observer synchronizes the active object and rebuilds inactive bodies; Render Modes applies the active body mode, may read `manager.objects` (which synchronizes active mesh/history), and may construct imported UV or committed Paint previews. These were candidates, so this build profiles each actual owner rather than applying an unmeasured optimization.

The existing opt-in Performance monitor now reports nested `scene-sync` (Multi `saveActive`), `object-sync` (render-mode object-list reads), `render-mode` total, `uv-preview`, and `paint-preview`. All report mean/max/sample count over the bounded last-120 window; nested values overlap and are explicitly labeled non-additive. The existing viewport report records selection/render mode, with no model geometry exported. All timers remain disabled unless the existing monitor is enabled. Main render, geometry, scene, cage and inactive owners are retained.

Release .1098 markers and directly affected script pins updated. The nested release-version pin, Face workflow parent, drawer parent and shell pins were refreshed together. Protected Multi transform remains byte-identical. Added focused checks for monitor opt-in/bounds/reset, render-mode preview timing, unchanged material assignment and exception propagation. Local and hosted full suites pass 3,214 / 3,214; focused release/performance checks pass 15 / 15. Runtime commit `6fc42cc312888c8985d03e0d21317a7ce9be0462` is published on remote main; remote `version.json` reports .1098. Pages deployment `42420882796` completed successfully. Hosted Topology run `42420883102`, job `128548858812`, passed 3,214 / 3,214. The user has granted standing approval to push and publish future BoxLab builds. Native .1098 acceptance is pending.

Device gate: same imported 1,000-face model/settings/render and selection modes; activate, reset, selection changes, one safe edit and Undo/Redo; download viewport report and state operation sequence. Compare rebuild, Scene hooks, Multi saveActive, object reads, Render mode, UV preview and Paint preview. Keep the dense latency cause open until matched evidence identifies an owner.

---

# .1097 dense-model report received â€” cage win; overall stall remains â€” 7 November 2026

Latest user report is .1097 with1,002 vertices/1,000 faces,6,006 rendered triangles,7 draw calls,2,007 renderer geometries and3 textures, matching .1096 latest counts and browser/viewport/DPR. User .1097 functional PASS remains protected. No new runtime/build in this investigation record. Raw reports/model remain private; retain aggregate evidence only.

Reported means (.1096 six rebuilds â†’ .1097 twelve): cage298.333â†’8.667 ms (~97.1% reduction), body geometry1.333â†’0.5 ms, scene/body hooks9.833â†’286.25 ms, total rebuild312â†’297 ms (~4.8% reduction). Worst scene hook1,125 ms; worst rebuild1,134 ms versus prior347 ms. Latest .1097 Undo0/Redo1 versus earlier Undo1/Redo0. Last120 frame samples16.742 ms mean (~59.73FPS), p9517 ms. The healthy recent frame window does not negate the measured rebuild stalls. Source .1097 cage repair shows a strong stage-specific improvement; overall latency goal is NOT met, and tail latency is concerning. Do not claim a complete performance PASS, larger safe editable capacity or a WASM win.

Counts/environment match, but report does not identify mesh content hash, selection/render modes, operation sequence or each retained rebuild's state; power/thermal unknown. Means from these manual windows are useful diagnostic evidence, not proof of a controlled repeatable end-to-end regression/cause. Do not assert that .1097 moved the same work into another phase. Correct group metadata repair has no new scene/body hook code and remains functionally accepted; investigate the new scene cost before expanding work or deciding on rollback.

Next `/nextbuild`: audit/profile authoritative scene stage (main renderMesh root.add(body)). It includes chained Group.add hooks: Multi saveActive/rebuildInactive and Render Modes applyMode/imported UV/committed Paint surface setup, plus existing bridge hooks. Inactive measured0 ms in this capture, while aggregate scene286.25 ms; this does not isolate which remaining owner is costly. Read-only audit confirms applyMode still reads manager.objects (synchronizing active mesh/history) and may build native UV image or committed Paint previews. These are candidates, not diagnosed causes. Add narrow substage timings or an equivalent reproducible production-path profile, then repair the demonstrated owner. Retain .1097 groupMetadata fix, original cage/picking, history semantics and all protected Paint/Multi interactions. No duplicate kernel or speculative triangle-normal WASM migration. Earlier body benchmark was already inexpensive.

Matched-count report is now received; do not keep asking the user to resend the same baseline. Further hands-on checks wait for a concrete profiling/repair build. Current live .1097 remains functional PASS, with overall dense performance investigation OPEN.

---

# .1097 protected native PASS â€” dense-model comparison still pending â€” 7 November 2026

User confirms `.1097 PASS` and supplies a viewport report. Protect native behaviour, all selection modes/group visibility/Undo and imported Paint checks alongside prior PASSes. This accepts the repair's behaviour; do not infer a measured dense-model speedup from this report.

Received .1097 report: latest active mesh8 vertices/6 faces, Undo3;98 rebuild samples, mean2.112 ms/max11 ms; cage mean0.255 ms/max3 ms. Last120 frame samples:16.825 ms mean (~59.44FPS), p9522 ms. Earlier .1096 report's latest active mesh was1,002 vertices/1,000 faces, with6 rebuild samples averaging312 ms and cage298.333 ms. Same browser/viewport/DPR, but different latest mesh counts and unknown mesh/mode distribution across each retained timing window. Therefore these are NOT a controlled before/after pair; no percentage gain, capacity promotion or WASM performance PASS is established. Raw report/browser identification remains private; only aggregate evidence is recorded.

Next measurement uses existing .1097; no new build is needed: activate the same1,000-face imported model, match prior mode/settings, Reset Performance AFTER activation, select/edit/Undo/Redo several times on that model, then Download viewport report before switching back to the cube. Confirm report still identifies1,002 vertices/1,000 faces. Compare cage and total rebuild cost only after workload equivalence. Existing Node A/B correctness/copy-count evidence remains valid; target-iPad dense speedup is unquantified. Do not choose another optimisation/WASM kernel until this comparison or equivalent matched workload evidence is available.

No runtime changes or new release for this acceptance record. Current live build remains .1097.

---

# .1097 â€” remove cage-triggered mesh/history copies â€” 7 November 2026

`.1096 PASS` is protected, including its Performance Lab and native report exports. Actual iPad evidence: 1,000-face scene averaged312 ms/rebuild, of which cage/highlights298.333 ms (~95.6%); geometry1.333 ms. This build follows the first measured JavaScript bottleneck fix (B1) in the WASM roadmap. No WASM kernel is promoted without target-device evidence.

Audit main `d3396cdda49dcf5b9699defe83198295da338d3e` found the repeated write: every original addCage edge/vertex/picker/batch root.add passes through Multi's existing render observer, which reads Object Selection.wholeGroupId. Its original selectedWholeGroupId â†’ selectedObjects/groupMembers â†’ manager.objects chain calls saveActive, cloning active geometry AND every Undo/Redo mesh on each proxy addition. Existing cage batching does not remove this group-context read. Do not reimplement cage batching or replace picking as a remedy.

Narrow repair in the two original owners: Multi exposes groupMetadata(), freshly deriving only id/groupId from its authoritative objects array without saveActive or mesh/history/settings access. Original selectedWholeGroupId uses that metadata for selected/full group membership, with the old objects API fallback for legacy managers. Explicit chosen arrays retain their original meaning. No cached membership or parallel scene model. Original manager.objects getter and saveActive, scene/activation/export/history transactions remain intact; body insertion still synchronizes once. Main addCage, every picking proxy, batches, geometry/material/raycast contracts and input handlers are unchanged. Protected multi-object-transform.js remains byte-identical at 0.36.1.0; Paint sources and ownership remain unchanged.

Evidence: 12 new production-owner cases exercise actual addCage/face pickers, Multi observer, saveActive/captureHistory, group reader and real Three geometry. Exact proxy geometry/style/visibility and ray hits match for all four modes, whole-group/ordinary selection; hidden/solo exclusion retained. Metadata cannot touch linked/reference geometry/history/settings, returns non-aliasing fresh data and follows membership/scene replacement/empty selection without cache invalidation. Legacy fallback covered. 133 focused checks pass across this suite, group UX/persistence/context, linked instances, Paint ownership, existing monitor/cage and ALL release/checklist/cache tests.

Reproducible interleaved A/B: node scripts/benchmark-cage-group-1097.mjs; frozen exact .1096 group reader in test fixture. Real body observer + complete cage construction with one Undo mesh; two warm-ups/five repeats each. Node CPU medians:400 faces147.37â†’19.25 ms (-86.9%);1,024 faces606.24â†’46.38 ms (-92.3%). At1,024 faces saves4,227â†’1 and mesh/history clones8,454â†’2. Exact paired proxy snapshots match. Report docs/performance-cage-group-1097.json contains raw timings/counts/scope. Excludes other Group hooks, GPU, full app, source model and iPad timing; decision INCONCLUSIVE pending same-device report. No claim of improved safe editable capacity or total RAM. Raw user reports/model remain private; only prior aggregate iPad evidence is recorded.

Release .1097 markers, shell test-list/provenance and both canonical release-version loader paths/parents refreshed. Only changed functional owners Multi/Object Management get new pins; unchanged main/cage/Performance Lab/Paint assets retain their accepted URLs. Hosted completion: runtime commit `022d790e7ca79e24cd6ad0e1f3fb856e6cec66f2`, Topology `42368562276`, job `128391734922`: 3,211 PASS / 0 FAIL. Identical runtime published from docs-only commit `50ccbf4ddbb741db752ba36e768326b7b256879a`; Pages `42369028258`, deploy job `128393207893`, succeeded. Eight cache-busted live files (version/index, Multi, Object Management, checklist, drawer, face workflow and release owner) byte-match source. Initial Pages `42368561913` built but deploy remained in progress while live stayed .1096, then was cancelled/superseded by the fresh publication. Its in-progress logs were unavailable (BlobNotFound); cause is unproven. No functional changes were made during publication retry. Main/cage, Paint, Performance Lab and protected Multi transform retain their accepted sources/pins. Same-model iPad report remains the performance gate. Native .1097 acceptance pending.

Device gate: same model/settings as .1096 â†’ VIEW â†’ Performance â†’ Reset; select/change selection/edit/Undo/Redo several times, then Lab â†’ Download viewport report. Compare cage/rebuild against298/312 ms baseline. Check Vertex/Edge/Face/Object picking and gizmo, ordinary/group selection with suppressed group cage, hide/solo restore, and imported Paint remains usable. Preserve all prior PASSes. Next optimisation/WASM decision follows actual iPad report; further Paint features deferred.

---

# .1096 protected native PASS â€” iPad performance evidence â€” 7 November 2026

User confirms `.1096 PASS` and supplies both baseline and live viewport JSON reports. Protect the baseline lab, export controls and accepted ordinary navigation/Undo behaviour. This accepts the measurement build, not a speedup or increased editable mesh capacity. No runtime changes or new build in this acceptance record.

Measured iPad Chrome, 1366Ã—886 at DPR2: 10k-triangle fixture CPU samples [2,2,2,3,2] ms; median 2 ms, p95 3 ms; input fingerprint b5ae5c54, output ead56015, CPU position/normal bytes 720,000. The supplied report has no comparable stored baseline: no before/after performance gain can be calculated. Original uploaded reports remain private; retain aggregate evidence here, not model geometry or raw browser identification.

Actual scene snapshot: 1,002 vertices / 1,000 faces; 6 rebuilds averaging 312 ms (max347). Cage/highlights mean298.333 ms (max322), body geometry1.333 ms (max3), scene hooks9.833 ms (max17), inactive0.25 ms. Cage accounts for approximately95.6% of mean rebuild time. Last120 frame intervals average16.675 ms (~59.97FPS), p9517 ms; latest CPU render-submit2 ms,7 draw calls,6,006 rendered triangles and2,007 renderer geometry resources. These frame samples do not erase the measured ~0.3-second rebuild stalls, and resource counts are not RAM bytes. Counts describe this captured scene only, not an upper mesh-capacity test.

Next `/nextbuild` priority: profile and repair the authoritative addCage/selection-highlight path, including hidden picking geometry and repeated topology work, while retaining existing cage batching and picking semantics. Main addCage still constructs per-edge inputs before batching and includes face pick/highlight work; the aggregate cage phase alone does not identify the exact subroutine. Measure the same user's scene/settings before/after, preserve selections, all modes, Paint, Undo/Redo and protected Multi transform. Do not accelerate triangle-normal packing in WASM merely because it has a baseline: present evidence ranks cage rebuilding first. Further WASM kernel promotion requires measured end-to-end gain and correctness; Paint expansion remains deferred.

---

# .1096 â€” performance baseline lab (B0) â€” 7 November 2026

User confirms `.1095 PASS`; two-sided imported colour Paint is protected. User reprioritizes dense imported-object performance ahead of further Paint work. The user's WASM handoff starts at B0: baseline before a compiled kernel. No WASM or modelling algorithm change in this build.

Audit current main `814b1550`: original opt-in Performance monitor is under VIEW â†’ Diagnostics (not File, despite older handoff wording). Existing stages already distinguish display, body geometry, scene hooks, inactive bodies and cage; existing cage batching/SubD caching remain intact. `EditableMesh.triangulatedGeometry` is the authoritative body packing/allocation/normal owner. No measured hotspot has yet justified a WASM candidate.

Extend only the existing panel with lazy-loaded Performance Lab. Separate versioned irregular shared-vertex triangle fixtures: 10k/50k/100k. Two warm-ups and five measured repeats call the actual body builder; hash/check output every repeat, dispose temporary geometries, yield between runs and cancel on Close/background or Cancel. No fixture is inserted into the user's scene; no model/history/selection mutation. Report contains deterministic fixture/output fingerprints, raw timings, median/p95, scoped CPU position/normal bytes, browser/viewport metadata, release and pre-benchmark monitor snapshot. Optional same-device baseline storage compares only matching protocol/input/output/environment and reports descriptive percentage change. Always INCONCLUSIVE: no candidate or end-to-end performance/capacity PASS claimed. Memory is not total RAM. Renderer counters are not GPU timings.

Download JSON exports fixture report. Download viewport report exports current monitor counts/timings without model geometry, so the actual slow imported scene can be diagnosed. Reports stay on device until the user shares them. Storage refusal and cancelled runs are handled. Monitoring stays opt-in; fixture code loads only when the panel opens. No new renderer, pointer handler, mesh limit, Paint budget or modelling kernel. Protected Multi transform remains byte-identical at 0.36.1.0. Changed monitor/child pins and release contract reviewed.

Validation: 48 focused checks pass (five new lab cases plus existing monitor, phases/cage and release contracts). Covers real-owner repeated output/disposal, read-only fixtures, cancellation/output mismatch, timing statistics, exact comparison guards, UI JSON export, storage refusal and detached-panel refusal. Reproducible Node baseline: `node scripts/benchmark-dense-body.mjs`; example report in `docs/performance-1096-node-baseline.json`. It is CPU-only Node evidence, not iPad performance. Hosted completion: final runtime commit `487c2508d07c6544e501374e09399ab1d82f1ccf`, Topology `42365645271` job `128383010256`: 3,199 PASS / 0 FAIL. Pages `42365644696` succeeded. Nine cache-busted live files (version, shell, monitor, lab UI/core, checklist, release owner, drawer and face workflow loader) byte-match source. Cloud Chrome confirms live .1096 lab open/run, kept baseline/repeat comparison and JSON download. Its WebGL context is disabled (also on .1095), so cloud checks do not establish viewport rendering/navigation acceptance. Native iPad measurement received; user confirms `.1096 PASS` (see acceptance record above).

Release audit lesson: first hosted `42364790801` had five release/checklist failures (3,194/3,199 passed), then `42365247854` had one current release-pin failure (3,198/3,199 passed). Lab cases passed in both. Correct the actual shell-comparison identity and preserve old .1095 checklist provenance; update BOTH direct and nested canonical release-version URLs, face-workflow-layout parent and drawer parent to .1096. No assertions were weakened. Run all `tests/release*.test.mjs`, shell comparison, performance and displacement marker tests together for future bumps: final local 48/48 PASS. First Pages run was cancelled and superseded. The accepted .1095 Paint/interaction sources remain untouched; protected Multi transform is unchanged.

Next device gate: VIEW â†’ Diagnostics â†’ Performance â†’ Performance Lab. Run 10k, Keep as baseline, repeat, Download JSON; advance to 50k if comfortable. Cancel a run/Close and confirm original scene/navigation/Undo still work. With the slow imported model, Reset, orbit/edit briefly, then Download viewport report. Share reports before selecting the first optimisation/WASM candidate. Further Paint expansion deferred. `.1096` native acceptance is user-confirmed PASS and protected; see measured next target above.

---

## .1000 â€” UV Paint handoff and Facegroups â†’ UV Seams â€” 27 October 2026

User says â€œPASS 999 so farâ€. Record PROVISIONAL .999 PASS and protect the exact
main/styles/retired-atmosphere startup baseline. This is not an unlimited native
visibility acceptance. User explicitly requests the next UV/Facegroups workflow.

UV PAINT now uses the existing paintTargetKey validator before entering Paint.
Missing/stale/incompatible UVs open the ORIGINAL UV session through __boxlabUVTools,
with â€œValid UVs required for UV Paintâ€ at the TOP. No UV/paint/history is authored
by the redirect. Valid targets in Facegroups view switch through the existing Studio
button, stopping the original Facegroup stroke/dock owners, before Paint opens.
Finished UV-tools sessions hand off directly to bottom UV PAINT; busy unwraps require
Finish/Cancel first. Existing other-tool protections remain intact.

UV menu adds â€œFacegroups â†’ UV Seamsâ€, orbitable orange boundary preview, explicit
â€œConfirm UV Unwrapâ€, elapsed timer and Cancel. Preview has no history or UV edits,
no raw pointer consumer and no control disabling. Connected equal-name regions form
charts, including an unassigned region; disconnected regions form separate islands.
Native mesh boundary and differing-group edges delimit patches. Original geometry,
groups, names, palette and selection are retained. Planar patches keep exact shapes;
curved disk patches use bounded positive-weight harmonic flattening with periodic
frame yields. Original UV preview triangulation validates every flattened face;
original density, packing, native UV commit, project transport and ONE history
checkpoint remain authoritative. Completion selects existing UV Checker and keeps
orange patch boundaries visible in 3D while the UV session stays open. Closing,
changing target, entering UV Editor or cancelling releases the owned seam overlay.

Honest limits: 4096 faces / 20,000 corners; plain independent unlocked Base mesh,
SubD/Mirror off, no stored paint. Closed groups, holes/handles, pinches, inconsistent
winding, non-manifold edges, solver failure/work overflow refuse without mutation
and ask for additional Facegroup boundaries. Never silently insert cuts within a
group. Curved patches can stretch; existing flat atlas remains available.

Testing: new UV projection/packing/curved chart/resource/SaveOpen checks; real Paint
entry and UV session handoff; timed confirm/cancel/target-change and overlay cleanup.
Repaired old test harnesses for original Sweep UV-release hook and dynamically loaded
Facegroup dock cache owner; no Sweep or dock runtime edits. Final full-suite and live
publication results: docs/publication-1000.md. No native iPad feature PASS inferred.
Standing push/publish authorization continues. .996 File and .994 palette protected.

DEVICE1000: (1) no-UV object â†’ UV PAINT â†’ original UV menu + top reminder;
(2) valid UV object in Facegroups â†’ UV PAINT â†’ Studio + paint;
(3) UV â†’ Facegroups â†’ UV Seams â†’ orbit/check â†’ Confirm UV Unwrap â†’ timer â†’ checker
and orange boundaries; (4) Undo/Redo and Save/Open retain UVs/groups; Cancel creates
no UV/history edits. Also check .999 initial/right viewport remains healthy.
Current build .1000; feature acceptance pending device test.

## .999 â€” rebuild initial viewport baseline; .998 FAIL â€” 27 October 2026

User explicitly FAILs .998: right-side viewport patch exists immediately after
refresh, VIEW initially works, then selecting Facegroups leaves it blank. Screenshot
715C468D-4F44-4AF8-8E86-5F1B083F9DFC.png shows the bottom/right tonal boundary before
VIEW opens. Do not repeat menu-only frame/scroller changes or infer success from
healthy DOM bounds. .997/.998 are not complete visibility repairs.

Rebuild the existing initial presentation path: remove .967 CSS paint containment,
canvas/wrapper/header isolation and opacity-layer requests; retain original z-order.
Retire the full-viewport HTML multiply vignette and its mode opacity animation;
existing Studio WebGL lights, ground and shadows remain authoritative. The original
main renderer now uses one atomic setDrawingBufferSize for actual dimensions/DPR
changes, without initial setPixelRatio followed by size reset, and does not rewrite
canvas backing dimensions on same-size startup/visibility/session callbacks.
No second renderer, canvas recreation, forced hide/show or refresh loop. No menu,
Facegroups modelling/colour, geometry, history, gesture or frozen Multi changes.
The vignette is intentionally removed: a slightly less dark edge is expected.

Validation: 20 focused startup/sizing/composition/VIEW/release checks PASS; syntax
and whitespace clean. Broader and publication results: docs/publication-999.md.
No native pixel proof is claimed. .999 is a baseline retest, not an accepted fix.
Keep feature work paused until initial refresh and Facegroups visibility are stable.
Standing user authorization to commit/push/publish remains in force.

DEVICE999, in order: refresh and inspect bottom/right BEFORE opening VIEW; open
Studio VIEW; select Facegroups, scroll and reopen VIEW; return Studio; select/move
near the right edge and inspect gizmo; verify orbit/pan/pinch and Undo/Redo. Report
which earliest stage fails. Current build .999; readiness = device retest pending.

## .998 â€” Facegroups transition repair, native acceptance pending â€” 27 October 2026

User clarified: VIEW works in Studio, then becomes empty when Facegroups is selected.
.997 is partial Studio success, not overall VIEW acceptance. Facegroups adds enough
content to overflow the menu (reported scrollHeight 980 versus clientHeight 810).
.998 separates the fixed external frame from a bounded normal-flow inner scroller,
retaining original controls, IDs, delegation, native open owner and Clean View section.
The fixed frame no longer owns touch overflow. Inner scroll position survives closing.
The right-side gizmo patch remains OPEN; no visible-gizmo capture proves its cause.
Protected: accepted .996 File menu and .994 palette, original Multi and gestures.
Validation: focused VIEW/layout/release/facegroup/File tests; native device test still
required: open Studio VIEW, switch Facegroups, scroll to bottom, close/reopen, return
Studio, and inspect right-side gizmo. Standing commit/push/publication authorization
continues; no repeat approval needed. Current build .998, ready for device retest only.

# BoxLab Development History

## 2026-10-05 â€” v0.36.18.732: popup comfort, background exits, Array, Inset Repeat and right Object Browser

User explicitly **PASS .731**. Current release **v0.36.18.732**, parent main
`34ad8dbfd65a5dd7f1a40cfbd7b63b6c354e7a3f`. This is one bundled refinement build;
.732 awaits iPad testing and does not freeze Beta 6.

- Shared content-sized popups now have 7px vertical / 8px horizontal packing,
  an 8px body/action gap and 6px action-divider clearance. Small panels retain
  variable width. SELECT retains original controls; no Visible/Through restoration.
- Split exits with Done or a stationary background tap, retaining completed edits.
  Background exit audit reuses main's existing window-capture tap/movement owner
  and semantic event. The new policy module adds no raw pointer listener.
  Native/Pencil duplicate releases are marked before closing a tool, so the second
  callback cannot clear the preserved selection. Long-hold invert remains blocked
  while a tool owns the background. Orbit/pan/drag/cancel/secondary contact stay protected.
- Array X/Y/Z immediately project END onto the positive chosen world axis, keeping
  its current vector length. Actual END drags follow that axis. Free retains mixed
  coordinates and exposes XYZ arrow handles; arrow drag changes one coordinate
  without switching Free mode. Preview and source remain separate; Apply continues
  through existing linked-instance/object-history owners. Ghost/arrow hits are
  excluded from background exit.
- Inset's actual direct owner emits the kernel-produced committed model distance
  on release. Precision stores last values per operation as well as the original
  global last operation. Contextual Inset/Extrude Repeat asks the existing owner
  for its matching operation, never borrowing another tool's label/value. Legacy
  Repeat Previous stays available. No new geometry/history kernel.
- Object Browser uses the same icon and original Objects/Modifiers nodes, moved
  from the Object gizmo shortcut to the top bar: Frame All / Undo / Redo / Focus /
  Object Browser / VIEW. Opens on the right below the icons, including Focus view;
  Objects open, Modifiers initially closed. Closing/mode exit restores original
  nodes and disclosure states; tool start closes it. The original busy/mode-switch
  guards remain. This user-requested browser is an exception to centred tool popups.

Background exit policy:

| Tool/session | Stationary background tap |
| --- | --- |
| Loop, Split, Face Inset/Extrude values, Edge Slide/Bevel | Existing session Done/exit owner; completed edits retained |
| Face Bevel / Vertex contextual tools except Add | Existing Cancel/close; uncommitted blue preview discarded |
| Face Align/Repair, Knife, Edge/Face Bridge, Offset, Crease | Existing close/cancel owner; pending preview discarded where applicable |
| Edge Extrude | Existing hub/constraint exit; completed edits retained |
| Object Array, Solidify, Shell, Boolean, Mesh Health | Existing idle Cancel/close owner; active drag protected |
| Vertex Add, Surface Transform/Insert, Sweep, Revolve, Symmetry/Bisect | Background remains available for placement, drawing or mode cycling |
| One-shot modelling/repair commands | No armed session to exit |

Validation: **133 focused tests PASS**. Actual Array owner axis/Free arrow drag,
preview/source separation and Cancel; native/Pencil duplicate exit and virtual
preview hit protection; Inset finish's synchronous value/history event and scoped
Repeat; original Object/Modifier node movement/restoration and disclosure; retained
.731 Sweep/Slide/Bevel/navigation/session checks. Full suite **1285 / 1008 PASS /
277 FAIL**, versus fresh .731 **1274 / 994 / 280**: no new failure names; three
historical Array pin failures resolved. Existing historical source/pin/VM failures
are not presented as green. All **280 source modules syntax PASS**, diff whitespace
check PASS. Cloud WebGL cannot substantiate iPad/Pencil rendering; device checks below.

Protect Multi transform 0.36.1.0, Loop Cut .715, frozen Beta 3/4/5, existing history
and navigation. Main .732 only extends existing background routing; Face Direct's
geometry remains unchanged except committed Inset value metadata. Changed shared
layout clients/imports are .732; Sweep kernel/owner remains .731.

Next: test .732 grouped changes; then resume Beta 6 device release checklist.
No unrelated feature work or inferred release acceptance.



## 2026-10-04 â€” v0.36.18.705 arbitrary-plane Align to Face

- Implemented the queued user request in the existing Face Align pop-out, beside X/Y/Z; no ring changes. .702/.703/.704 hands-on still pending, no implied PASS.
- Audited component Align, Make Planar and surface-transform face-to-face maths. Extended existing Align core/anchor owner; reused surfaceAlignmentQuaternion .442 and Mesh Health .443. Make Planar remains a distinct projection tool. No parallel modelling/viewport gesture owner.
- Candidate placement rotates planar moving Faces rigidly, then translates along fixed Face normal only. Disjoint group uses centre pivot; shared points/edges may hinge if fixed vertices remain stationary. Opposing winding does not force a 180-degree rotation.
- Nonplanar moving groups, invalid/warped anchors, shared conflicts, coincident/zero-area affected neighbours, topology-gate failures and increased zero-area health count reject before history/live mutation. Rejection reason stays visible; Cancel/another anchor remain possible. Changed success adds one Undo, preserves selection/puck; already coplanar completes without history.
- 48 targeted group/shape/arbitrary-plane/hinge/tangential-position/owner/Undo/Redo/rejection/XYZ/proxy/repair/dock/background/Bridge/value/release checks PASS; syntax PASS. Full suite: 1132 tests, 847 PASS, same 285 failure names as .704; no new failures. Release markers and changed owner/core/dynamic parent/viewport/refresh pins .705; protected transform, Loop Cut, Through and ring layout untouched.
- Next: hands-on confirmation, remaining Face repair/parameter audit, then Vertex â†’ Object â†’ final Edge. No unrelated development.


## 2026-10-04 â€” Align to Face queued for next /nextbuild

- User approved adding arbitrary-plane Align to Face to the next build's content, beside X/Y/Z in the existing Align pop-out.
- Workflow: select moving planar Face(s) plus anchor, choose Align to Face, tap selected fixed Face. Rotate moving group rigidly and translate along anchor normal onto its plane; preserve group shape and anchor vertices; reject bent/unsupported groups with no mutation.
- Existing anchor owner/face-to-face maths must be audited before implementation; shared-vertex/validity guards, one-step Undo, selection/puck completion and unchanged X/Y/Z required. Top-centre settings; no extra radial sector or pointer owner.
- Documentation-only queue update; runtime/release markers remain v0.36.18.704. No new PASS recorded and no new hands-on test needed for this planning update. Next runtime build implements this option before resuming other Face gaps.


## 2026-10-04 â€” v0.36.18.704 Face radial Clean Vertices / Align

- /nextbuild continues radial completion only; no explicit .703 PASS received. .702/.703 hands-on remain pending.
- Audited existing safe Clean Vertices owner and Face Repair proxy. Added outer Clean Vertices plus existing whole-object scope panel access. Owner plan/cleanup/history unchanged; apply now returns explicit result and exposes syncUI for contextual availability. Success clears stale Face IDs; Cancel preserves them.
- Audited existing component Align .330 anchor owner/core. Added one Align sector and top-centre X/Y/Z/Cancel proxy. Axis selection arms existing owner; selected Face anchor remains fixed, other selected vertices align on that axis, same one-step history/selection. Owner emits semantic arm/disarm/apply change and exposes axis; proxy completion clears hub suppression without another viewport pointer owner.
- Eight inner unchanged, fourteen outer at 205px; all previous targets retained and outer/outer + outer/inner rectangle spacing PASS. Centre Ã— unchanged. Selection helpers remain outside rings.
- 36 targeted owner/core/proxy/repair/dock/background/Bridge/value/release checks PASS; syntax PASS. Full suite: 1120 tests, 835 PASS, same 285 failure names as .703. Two Align tests now verify a single versioned loader rather than the old .330 pin.
- .704 release markers, changed modules and drawer dynamic parent/child pins updated; protected transform/.162 Loop Cut/Through and modelling kernels unchanged. Workflow priority unchanged: finish Face (remaining repair/parameter audit), then Vertex â†’ Object â†’ final Edge. Hands-on pending.


## 2026-10-04 â€” v0.36.18.703 radial Face repair batch

- User directs all development moving forward at finalizing radial menus/settings: Face â†’ Vertex â†’ Object â†’ final Edge; unrelated gesture/topology/feature work deferred. .702 hands-on remains pending.
- Audited existing Close Holes .201, Quad Cleanup .205 and Quadify N-gons .203 owners, already loaded by face-workflow-layout. Added three active outer sectors; kernels, transaction gates/history and legacy pins unchanged.
- Shared top-centre whole-active-object scope panel delegates existing APIs on Apply only. Cancel preserves original geometry/selection; failure shows owner reason without clearing selection. Success clears stale Face indices and emits shared session completion; next Face tap gets fresh puck. Mode/mesh changes close; locked/reference active objects blocked.
- Eight inner/twelve outer tools, outer175px/30-degree spacing; all prior targets retained, outer/outer and outer/inner rectangle spacing PASS. Protected inner positions unchanged. No selection helpers or new viewport pointer owner.
- 21 targeted lifecycle/dock/background/Bridge/value/release checks PASS; syntax PASS. Full suite: 1112 tests, 827 PASS, same 285 failures as .702; failure names compared, no new failures. .703 markers/gizmo/new-panel/main-loader/refresh pins updated. Protected transform and .162 Loop Cut untouched. Hands-on pending.

## 2026-10-04 â€” v0.36.18.702 active-tool-only radial correction

- User confirmed .701 PASS, then corrected product scope: radial menus are for active tools; selections belong to long press/gestures.
- Removed Coplanar/Connected radial sectors and selection-only completion labels; restored eight inner/nine outer active tools at 82/145 px. Authoritative selection commands and gesture owners untouched.
- Detached/Quads additions were only a local draft and were discarded before publishing. Failed direction recorded: do not equate every drawer command with an active radial tool.
- All seventeen active targets retained. Top-centre popup/background Done behavior protected. 15 targeted dock/background/proxy/Bridge/release checks PASS; syntax PASS.
- Updated .702 markers, gizmo/main-loader/refresh pins and workflow/roadmap/handoff. Next audit remaining Face active modelling/repair settings, then Vertex/Object/final Edge. Hands-on confirmation pending.


## 2026-10-03 â€” v0.36.18.701 radial Coplanar / Connected Face selection

- User confirmed .700 PASS; top-centre panels, background Done and protected navigation recorded.
- Audited existing select-coplanar-region / select-connected-shell owners already loaded by drawer-ui. Added Coplanar/Connected outer sectors; proxy their one-seed validation and selection/Multi behavior, use shared one-shot cleanup.
- Coplanar selects the connected flat region; Connected selects the entire bent/flat edge-connected shell. Neither changes geometry/history. No selection kernel or raw-pointer owner added.
- Outer ring expands to eleven evenly spaced sectors at 170 px; all previous targets/eight inner positions retained. Outer/outer and outer/inner rectangle spacing audited.
- 15 protected dock/background/proxy/Bridge/release checks PASS; syntax PASS. .701 markers/gizmo/main-loader/refresh pins updated; shared dock/session pins retain .700. Hands-on confirmation pending.
- Continue remaining Face helper/repair/settings access before Vertex, Object and final Edge; whole-mesh repair scope must be explicit.


## 2026-10-03 â€” v0.36.18.700 top-centre session popups / background Done

- User confirmed .699 perfect and directed every tool-session popup to top centre; background tap should replace needing Done for Extrude/Inset.
- Audited ten selection-hub session panels and floating numeric entry. Shared dock helper replaces selection-relative placement; viewport bounded/scrollable. Radial/gizmo positions untouched.
- Existing main/direct tap owners emit a semantic background completion; existing Pencil orbit tap semantic reused. Settings proxy calls its existing Done path, preserves selection, disarms Repeat/tool. No parallel pointer owner.
- Armed Face main guard admits only contextual background input; second pointer cancels a pending single tap. Drags/multi-touch bypass dismissal; ordinary background behavior retained outside settings.
- 15 targeted dock/background/proxy/Bridge/release tests PASS. Changed module/loader/refresh pins .700; protected transform, Loop Cut and modelling kernels unchanged. Hands-on confirmation pending.
- Workflow/roadmap record top-centre placement as the rule for every future session popup.
- CI exposed two .520 static guard assertions made obsolete by the scoped background exception; replaced only those with executable owner-guard checks. Historic release-pin assertion remains in the existing failure baseline.


## 2026-10-03 â€” v0.36.18.699 contextual Extrude / Inset settings

- User confirmed .698 full list PASS; Face Bridge session, fresh puck, ring spacing and centred Ã— protected.
- Audited precision-face and repeat-face-previous owners. New viewport settings proxy exposes Exact/Repeat/Done from radial Extrude/Inset; delegates existing APIs and mirrors readout/availability.
- Done ends existing Repeat/direct arming and uses shared Face completion; another radial command hides settings without resetting its lifecycle. No geometry/history/precision kernel or viewport pointer owner changed.
- Ring layout unchanged; drawer controls retained until hands-on PASS. 10 targeted proxy/Bridge lifecycle/release checks PASS.
- Release .699 markers, gizmo/new proxy and refresh pins updated; Bridge pins retained .698. Continue remaining Face helper/repair/settings audit before Vertex, Object and final Edge.


## 2026-10-03 â€” v0.36.18.698 radial Face Bridge preview and centred close

- User confirmed .697 full list PASS; orientation workflows protected. Requested centre Ã— alignment included.
- Audited existing Face Bridge preview owner. Added state API and semantic lifecycle events; viewport proxy forwards existing Next/Use/Cancel without another modelling kernel.
- Radial Bridge extends outer ring to nine evenly spaced sectors; inner eight and all previous tool targets retained. Hub stays hidden during preview; Cancel returns selected original puck; Use clears selection, completion clears stale suppression.
- Centre Ã— overrides inherited generic button padding/min-height and flex-centres content.
- 7 targeted lifecycle/release tests PASS. Release markers and changed owner/proxy/refresh pins updated to .698. Protected Edge Bridge, transform and Loop Cut owners untouched. Hands-on checks pending.


## 2026-10-03 â€” v0.36.18.697 outer Face orientation tools

- User confirmed .696 full manual list PASS; Triangulate/Flip Faces selection, disabled state, puck return and Undo protected.
- Audited existing orient-faces.js / orient-shell-outward.js owners and their face-workflow-layout loader. Added Orient Faces (270Â°) and Orient Outward (315Â°) proxies plus shared one-shot cleanup.
- Connected patch orientation preserves the lowest-index seed; closed-shell orientation uses signed volume. Existing validation, selection and history remain authoritative; eligible no-change actions return puck without history.
- All fourteen previous sectors preserved; eight inner/eight outer positions are populated but Face coverage is not yet complete. Bridge preview and remaining settings/selection/repair access require audit.
- Release markers and gizmo/refresh pins updated to .697; syntax/release checks PASS. Hands-on confirmation pending. No modelling kernel or pointer owner changed.


## 2026-10-03 â€” v0.36.18.696 outer Face Triangulate / Flip Faces

- User confirmed the full .695 list PASS; Poke/Make Planar validation, selection, puck return and Undo are protected.
- Audited existing triangulate-faces.js and flip-faces.js owners loaded by face-workflow-layout.js. Added outer sectors at 180/225 degrees, proxying their buttons and shared one-shot cleanup.
- Triangulate selects result triangles and preserves winding; triangle-only selections remain disabled. Flip Faces reverses selected winding and preserves selection. Each uses existing one-step history.
- No modelling kernels or pointer owners changed; all twelve prior Face sectors retained. Release markers and gizmo/refresh pins updated to .696.
- Syntax and release-contract checks PASS; hands-on confirmation pending. Continue Face Bridge/orientation gaps before Vertex, Object and final Edge.

## 2026-10-03 â€” v0.36.18.695 outer Face Poke / Make Planar

- User confirmed .694 full hands-on list PASS; two-ring Join/Circle layout and one-shot lifecycles protected. User requested continuing two additions per build.
- Audited Poke and Make Planar: existing owners already load through face-workflow-layout.js; preserve their validators, geometry/history and selection semantics.
- Added direct outer-ring Poke (90Â°) and Make Planar (135Â°), reusing shared disabled-state feedback and one-shot puck cleanup.
- Poke adds centre-vertex triangle fans to selected suitable Faces. Make Planar enables for exactly one warped Face; already planar/multiple Faces are disabled by the authoritative owner.
- No modelling owner, settings panel or raw-pointer gesture owner changed. Previous ten sectors remain intact.
- .695 shell/manifest/gizmo/refresh pins updated; syntax/release tests PASS. Hands-on checks pending. Continue Face gaps before Vertex, Object and final Edge.

## 2026-10-03 â€” v0.36.18.694 Face outer ring / Circle

- User requested concentric tool rings; populate Face tools before jointly assigning inner/main versus outer/secondary. More remains an accepted fallback if the complete layout is crowded.
- Removed .693 More toggle/panel and placed Join Coplanar directly on a 145 px outer ring alongside newly exposed Circle. Existing eight inner sectors remain at 82 px.
- Circle delegates to #componentCircleBtn and authoritative circularize/history owner. Join owner retained. Both share existing disabled-state feedback and one-shot puck cleanup.
- Combined two related contextual additions into one testable release; no geometry kernel or gesture ownership changes. .693 superseded without an explicit PASS; .692 remains pending.
- Shell/manifest/gizmo/refresh pins updated; syntax and release-owner checks PASS. Handoff records provisional ring assignments and fallback.

## 2026-10-03 â€” v0.36.18.693 Face More / Join Coplanar

- Returned to user-directed Face radial gap completion. Existing ring had eight primary sectors; Join Coplanar Faces remained drawer-only.
- Added Moreâ€¦ toggle and nearby pop-out with Join Coplanar, preserving all primary sector positions.
- Delegates to #joinSelectedCoplanarFacesBtn; disabled state mirrors existing validator. The existing topology/history owner is unchanged.
- Successful one-shot completion clears stale suppression and returns the selected-result puck, sharing the existing radial one-shot cleanup.
- Pop-out toggles closed, resets on hub transitions and flips to the left near the right viewport edge. No new raw-pointer gesture owner or modelling kernel.
- Syntax and release-owner tests PASS. Updated shell/manifest and total-gizmo/refresh pins to .693. Protected transform/Loop Cut/Face session owners unchanged.
- Hands-on checks pending. .692 Edge neutral-return PASS is still pending. Next: continue remaining Face contextual gaps, then Vertex, Object and final Edge.

## 2026-10-03 â€” radial completion priority clarified

- User clarified that the primary push is contextual radial menus plus nearby pop-out settings, reducing routine left-drawer dependency.
- Required order: finish Face gaps, then Vertex, Object, and finally Edge completeness.
- .690 completed the existing Face ring lifecycle, not all Face contextual tool/settings coverage. Previous broader-modeless wording overstated overall completion and redirected development prematurely.
- Existing protected Face/Edge flows remain intact. .691 PASS remains protected; published .692 Edge parity checks remain pending. No new runtime build in this priority correction.
- Next step: audit full Face drawer against the current 8-sector ring and repair/expose existing action/settings owners one gap at a time. No parallel kernels or bulk drawer removal.

## 2026-10-03 â€” v0.36.18.692 Edge vertical scrub neutral return

- User confirmed .691 Face Grow/Shrink neutral return manual list PASS; now protected.
- Re-audited main a43e06ab. Edge vertical Grow/Shrink uses the same existing main.js scrub owner; no separate implementation is needed.
- Extended the neutral-band type gate from Face to Face/Edge. Returning within 18 px of the hold origin restores the fixed starting Edge selection without applying Grow/Shrink.
- Existing 30 px step scaling, sideways Loop/Ring/Boundary enumeration, additive base merge, release/cancel owners, radial tools and Loop Cut remain unchanged. Vertex unchanged.
- 12/12 targeted behavioral/release tests PASS, covering Edge Grow/reversal/neutral, multi-edge Shrink/neutral, band boundary and protected Face .691 behavior.
- Updated all release markers plus main.js / release-bootstrap.js / release-version.js pins to .692; protected multi-object-transform.js?v=0.36.1.0 unchanged.
- .692 awaits hands-on confirmation. The full CI baseline has 285 existing failures; historical test cleanup remains separate.

## 2026-10-03 â€” v0.36.18.691 Face vertical scrub neutral return

- User confirmed the full .690 refreshed-shell manual checks PASS. Face radial lifecycle is complete and protected, including Shell/Sweep exit cleanup and Knife Done.
- Re-audited current main and modeless gesture history. Grow/Shrink hold gestures already existed in main.js; .617â€“.619 multi-tap experiments had been abandoned.
- Repaired one existing gesture: Face vertical hold scrub now returns to its fixed starting selection within an 18 px neutral band instead of applying an unwanted one-step Shrink/Grow.
- Existing authoritative Grow/Shrink buttons and 30 px scaling retained; no new raw-pointer owner or selection kernel.
- Edge/Vertex behavior, radial sessions, Pencil/Object routing, Loop Cut core and protected multi-object-transform remain untouched.
- Behavioral integration tests exercise actual main scrub + advanced-selection owners: Grow/reverse/neutral, Shrink/neutral, band boundary, unchanged Edge/Vertex. Release-version contract checked.
- .691 awaits hands-on confirmation; release markers and main.js pin updated together.
- Publication follow-up: CI detected release-version pin must equal manifest version; both release refresh owners repinned to .691 without logic changes. Targeted behavioral/release tests 9/9 PASS.
- Compared full CI against .690 runtime 8efc9589: 285 existing failures; only additional .691 failure was the stale release-version pin, now corrected. Historical tests need a separate audit.

## 2026-10-03 â€” v0.36.18.690 stale-shell refresh hardening / handoff prep

- User reported .690 was not refreshing on iPad.
- Repository verification confirmed:
  - HTML title = v0.36.18.690
  - data-release-version = 0.36.18.690
  - version.json = 0.36.18.690
  - Total Gizmo / Shell session / Sweep session pinned to .690
- Root cause found in release-bootstrap.js:
  - after three stale-shell responses in one Safari session it stopped attempting refresh permanently
  - GitHub Pages can briefly serve an older HTML shell after version.json has advanced, so that guard could strand the user on .689
- Hardened release-bootstrap stale-shell recovery:
  - no permanent three-attempt stop
  - escalating cache-buster / attempt marker
  - retry counter resets after repeated attempts instead of abandoning recovery
- Repinned release-bootstrap.js and release-version.js to .690.
- Updated AI development workflow to make release-shell/cache verification mandatory before modelling changes.
- Runtime release baseline before documentation-only handoff commits: 8efc9589423039927bfdb9da9da6710cdb311407.
- .690 Shell/Sweep lifecycle still needs hands-on confirmation after the refreshed shell actually loads.

## 2026-10-03 â€” v0.36.18.690 unified radial Face session completion

- .689 radial Face Delete hands-on PASS.
- Final Face-ring lifecycle audit found Shell/Sweep lacked explicit Selection Hub completion semantics.
- Radial Shell now reports completion when its session becomes inactive.
- Radial Sweep now reports completion when its tool session ends.
- Total Gizmo handles Knife/Shell/Sweep through one completion path:
  - clears stale suppression
  - returns puck when Face selection survives
  - otherwise waits for next Face selection
- No Shell/Sweep modelling logic changed.
- Face radial lifecycle is effectively complete after hands-on confirmation.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 â€” v0.36.18.689 radial Face Delete hub cleanup

- .688 restored known-good Loop Cut / Loop Slide feel hands-on PASS.
- Audited radial Face Delete.
- Delete topology/history owner already correct; no panel needed.
- Added post-action Selection Hub cleanup:
  - clears stale suppressed Face key
  - restores puck if a valid Face selection survives
  - otherwise waits hidden for the next Face selection
- Prevents future Face selections from inheriting stale suppression.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 â€” v0.36.18.688 hands-on PASS

- Restored known-good Loop Cut behaviour confirmed.
- Loop Slide old feel confirmed PASS.
- Treat the v0.36.18.162 logical-quad path as protected.
- Complex multi-collinear logical-quad traversal remains a separate strengthening item.

## 2026-10-03 â€” v0.36.18.688 restore known-good Loop Cut core

- .685-.687 generalized logical-quad work did not preserve the previous Loop Cut quality.
- User confirmed .687 still felt wrong.
- Compared current code against the actual known-good v0.36.18.161/.162 history.
- Restored src/loop-cut-added-vertex.js from v0.36.18.162.
- This restores the original logical Add-vertex traversal/reconstruction/slide contract.
- Removed generalized arbitrary-collinear-face behaviour from the live core.
- Complex screenshot topology is moved to strengthening rather than risking the protected Loop Cut path.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 â€” v0.36.18.687 restore clicked-edge Loop Slide direction

- .686 kept strengthened Loop Cut traversal and fixed malformed strip reconstruction.
- User reported live Loop Slide moved opposite to the expected direction.
- Root cause: promoted logical side direction came from face ordering instead of the physical edge segment actually touched.
- Added logicalSeedDirection() to map clicked physical edge direction onto the logical side.
- Ring propagation now inherits that original physical direction.
- .686 reconstruction remains unchanged.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 â€” v0.36.18.686 Loop Cut strip reconstruction fix

- .685 restored traversal through generalized logical quads, but created malformed long/sliver faces in the user screenshot case.
- Root cause was ambiguous outer boundary connector selection in splitLogicalFace().
- Rebuilt split reconstruction deterministically:
  - cut sides must be opposite logical sides
  - untouched sides are the exact outer connectors
  - outer strips inherit those physical boundary chains
  - interior strips are clean bands
  - collinear detail on cut sides remains preserved
- Generalized traversal retained.
- Genuine ngons/poles still stop propagation.
- No duplicate Loop Cut kernel added.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 â€” v0.36.18.685 generalized logical-quad Loop Cut

- .684 radial Knife viewport session hands-on PASS.
- User found a Loop Cut refusal on visually quad topology containing multiple collinear boundary vertices.
- Existing logical-quad compatibility only supported a 5-gon with exactly one added collinear vertex.
- Generalized the same owner to faces with four genuine corners plus arbitrary collinear boundary detail.
- Ring traversal operates on logical four-corner topology.
- Split reconstruction preserves all physical boundary-chain vertices.
- Genuine ngons/poles remain stops.
- Single and multi Loop Cut use the same generalized path.
- Facegroups preserved on generated strips.
- Base Loop Cut remains fallback for ordinary quads.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 â€” v0.36.18.684 radial Knife viewport session

- Continued Face-ring/modeless polish with Knife.
- Existing Knife topology/snap/history implementation retained.
- Added minimal Knife lifecycle API/events.
- Radial Knife now opens a compact â€œKnife active / Doneâ€ viewport session.
- Knife remains armed after each cut for repeated cuts.
- Done disarms Knife, clears stale Selection Hub suppression, and leaves the next Face selection ready for a fresh puck.
- Left-panel Knife remains unchanged.
- No Knife geometry kernel changed.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 â€” v0.36.18.683 radial Extract Faces Object handoff

- Continued Face-ring polish after .682 PERFECT PASS.
- Existing Extract Faces topology/object implementation retained.
- Added semantic completion event after successful Extract.
- Total Gizmo now hands the new Extracted Faces object directly into Object transform mode.
- Background dismiss / Pencil orbit / object reselect all reuse the protected .682 lifecycle.
- No Extract geometry or history implementation changed.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 â€” v0.36.18.682 hands-on PERFECT PASS

- Pencil background tap dismissal reliable.
- Pencil object tap reliably restores Object gizmo.
- Pencil drag on background still orbits.
- Finger background dismiss remains correct.
- Object-mode gizmo lifecycle is now protected.

## 2026-10-03 â€” v0.36.18.682 Pencil/Object routing reliability

- .681 Pencil background dismiss was intermittent and Pencil object taps could select without restoring gizmo.
- Exposed the authoritative Object body picker from main.js via __boxlabSelectionBridge.pickObject().
- Total Gizmo now uses that picker for Object gizmo re-open detection.
- Pencil background tap candidate now starts at window capture rather than inside OrbitControls wrapper.
- Orbit drag still marks candidate as claimed and suppresses tap completion.
- No transform geometry implementation changed.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 â€” v0.36.18.681 Pencil background tap dismiss

- Finger background tap correctly dismissed Object transform after .680.
- Pencil background tap did not because Pencil navigation is owned by pencil-orbit-gate.
- Added background Pencil tap recognition in pencil-orbit-gate.
- Stationary Pencil contact under 8 px emits boxlab-pencil-background-tap.
- Orbit-claimed Pencil drags do not emit tap event.
- Total Gizmo consumes that semantic event to dismiss Object transform.
- Pencil orbit remains unchanged for actual drag gestures.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 â€” v0.36.18.680 Total Gizmo parse regression fix

- .679 caused the gizmo to disappear completely.
- Root cause was a duplicate top-level const canvas declaration introduced by the Object background-dismiss patch.
- JavaScript module failed to parse, so Total Gizmo never initialised.
- Removed the duplicate declaration and reused the existing canvas owner.
- .679 background-dismiss lifecycle logic is otherwise preserved.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 â€” v0.36.18.679 Object transform background dismiss

- .678 Duplicate Faces works and hands off correctly to Object gizmo.
- User reported Object transform could not be cancelled by tapping background.
- Root cause: Total Gizmo hard-forced Object mode to transform every sync cycle.
- Added explicit dismissed Object-transform state.
- Empty-background tap now hides/disarms Object transform without deselecting object.
- Tapping object again reopens gizmo.
- Object selection key now includes object IDs so changing selection reactivates normally.
- Duplicate completion always clears dismissed state for immediate transform handoff.
- No transform geometry code changed.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 â€” v0.36.18.678 radial Duplicate Faces restored

- .677 Edge radial one-shot cleanup hands-on PASS.
- Started Face-ring audit.
- Extrude/Inset already return to puck; Shell/Sweep already have viewport sessions; Delete is a one-shot.
- Found radial Duplicate sector pointing at #duplicateFacesBtn while the existing duplicate-faces.js owner was not loaded by index.html.
- Restored the existing Duplicate owner instead of adding a new implementation.
- Duplicate Faces retains existing semantics:
  - copies selected Faces into a new object
  - source unchanged
  - enters Object mode
- Added semantic completion event and Selection Hub handoff so the Object transform gizmo appears immediately on the new duplicate.
- No duplicate topology kernel added.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 â€” v0.36.18.677 radial Edge one-shot hub cleanup

- .676 guided radial Edge Bridge hands-on PASS.
- Audited remaining Edge radial one-shots Dissolve / Delete.
- Both are already appropriately direct and do not need viewport panels.
- Fixed stale Selection Hub suppression after radial one-shot topology removal:
  - clears hubSuppressedKey after authoritative action
  - returns puck if a valid Edge selection remains
  - otherwise stays hidden until next selection
  - prevents reused topology indices from accidentally inheriting old suppression
- No Dissolve/Delete topology/history implementation changed.
- Edge radial contextualisation is now effectively complete.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 â€” v0.36.18.676 guided radial Edge Bridge

- .675 navigation recovery is provisionally good hands-on.
- Audited remaining radial Edge tools; Dissolve/Delete are one-shot, while Bridge had a real workflow gap.
- Legacy Edge Bridge only enabled after both compatible boundary loops were already selected.
- Added guided radial Bridge session:
  - can launch from one valid complete boundary loop
  - keeps first loop selected
  - guides user to add matching second boundary loop
  - enables Apply only when authoritative bridgeEdgeSelectionInfo() accepts the combined selection
  - delegates Apply to bridge-ui.js / bridgeSelectedEdges()
  - created bridge faces are selected after Selection Hub Bridge
  - Cancel restores first boundary and returns puck
- Total Gizmo availability now special-cases guided Bridge start without changing legacy drawer availability.
- Existing Bridge topology/history implementation remains authoritative.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 â€” v0.36.18.676 modeless radial Bridge completion

- .675 touch navigation reported good for now; monitoring continues.
- Audited remaining radial Edge one-shot actions.
- Edge Bridge had the strongest modeless mismatch: successful Bridge switched to Face mode and then cleared the newly created faces.
- Added radial-only Bridge completion path in bridge-ui.js:
  - existing Bridge topology and history remain authoritative
  - radial Edge Bridge selects created bridge faces after switching to Face mode
  - emits semantic completion event
  - Total Gizmo restores closed Face puck on created faces
- Left-panel Edge Bridge retains legacy selection-clearing behaviour.
- Face Bridge unchanged.
- No Bridge topology duplication.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-02 â€” v0.36.18.675 recover stale camera disable

- User reported finger navigation eventually becomes completely inert, not merely misclassified as multi-touch.
- Pointer events still reached viewport, suggesting camera controls themselves remained disabled.
- main.js and several tool owners legitimately set controls.enabled=false during drags; if their normal release path is swallowed, controls can remain false.
- Added navigation safety recovery:
  - fresh first touch restores stale controls.enabled=false before downstream routing
  - fresh Pencil contact does the same
  - last physical contact end checks again after release handlers
- Kept .674 OrbitControls stale-pointer reconciliation.
- Added NAV CONTROLS RECOVER debug markers.
- No modelling drag geometry or selection semantics changed.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-02 â€” v0.36.18.673 touch navigation stale-pointer fix

- User reported Pencil orbit still worked, but two-finger pan/pinch failed and one finger started pan+zoom simultaneously.
- Gesture Debug showed touch pointerdowns reaching the viewport.
- Diagnosed likely OrbitControls stale-pointer state caused by modelling capture handlers swallowing pointerup/pointercancel with stopImmediatePropagation.
- pencil-orbit-gate now:
  - captures OrbitControls pointerup/pointercancel listener references
  - feeds touch/pen releases to OrbitControls in an earlier capture listener
  - suppresses duplicate release when the ordinary Orbit listener later receives the same event
  - preserves Pencil cleanup
- No tool drag ownership or Orbit touch mapping changed.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-02 â€” v0.36.18.672 Edge Slide viewport session

- Advanced from .671 via /nextbuild.
- Audited Edge Slide and confirmed direct drag was already viewport-native.
- Remaining UI gap was signed exact Slide %, which lived only in the left drawer.
- Added radial-only Edge Slide viewport session with:
  - signed exact percentage input
  - Apply Exact
  - Done
- Existing component-slide.js remains authoritative for live Pencil drag.
- Added component-slide semantic completion event and minimal disarmEdge bridge.
- Existing precision-edge-slide.js remains authoritative for exact Apply; now returns success and emits the same completion event.
- Successful radial Slide closes session, preserves Edge selection and returns puck.
- Left-panel Slide remains unchanged.
- No duplicate Slide geometry solver added.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-02 â€” v0.36.18.671 Offset Loop viewport session

- .670 radial Crease selection-first workflow hands-on PERFECT / PASS.
- Audited Slide vs Offset for the next gizmo-related tool.
- Edge Slide is already mostly viewport-native; Offset Loop still required left-panel Support Spacing / exact controls.
- Added radial-only Offset Loop viewport session with:
  - mirrored Support Spacing slider
  - exact percentage input
  - Apply Exact
  - Done
- Existing loop-offset.js remains authoritative for live Pencil drag, topology, validation, rollback and history.
- Existing precision-offset-loop.js remains authoritative for exact Apply.
- Added boxlab-offset-loop-complete semantic event for both drag and exact success paths.
- Radial session uses completion event to preserve created support-loop selection and return the closed puck.
- Updated drawer-ui cache pins for modified Offset owners.
- Left-panel Offset remains unchanged.
- No duplicate Offset topology kernel added.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-02 â€” v0.36.18.670 selection-first radial Crease

- Hands-on exposed the true .668/.669 issue: radial Crease inherited legacy paint-tool arming, which intentionally clears Edge selection.
- Reworked radial Crease UX around the preselected Edge(s) rather than the legacy paint workflow.
- Total Gizmo now captures radial Crease selection and bypasses #applyCreaseBtn for radial launches only.
- Added main.js authoritative applyCreaseSelection(ids,value,{pushHistory}) bridge.
- Radial Crease now:
  - keeps launch selection
  - opens panel immediately
  - applies current Strength immediately
  - previews Strength changes live on the same selection
  - previews Uncrease on the same selection
  - pushes one history snapshot on Done
  - preserves selection and returns puck
- Left-panel Crease remains unchanged.
- No duplicate crease topology/data implementation added.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-02 â€” v0.36.18.669 hardened radial Crease viewport launch

- .668 Crease viewport panel did not appear hands-on.
- Audited Total Gizmo radial order: target click occurs before semantic event dispatch.
- Replaced listener-only launch dependence with explicit Total Gizmo -> Crease session openFromHub() handshake after the real Crease button is activated.
- Kept semantic event listener as fallback.
- Reasserts panel visibility next animation frame to survive immediate UI/render sync.
- No Crease topology/history implementation changed.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-02 â€” v0.36.18.668 Crease viewport session

- Logged connected-chain Edge Bevel through ordinary 4-valence quad vertices in ROADMAP.md strengthening list.
- Continued Selection Hub/gizmo UX rather than expanding Bevel topology now.
- Added radial-only Crease viewport session:
  - contextual Strength slider mirrors existing #creaseStrength
  - existing main.js Crease remains authoritative
  - tapping Edge(s) still applies Crease through the established direct-tool path
  - Uncrease delegates to existing #clearCreaseBtn
  - Done disarms Crease, preserves Edge selection and returns to closed puck
- Left-toolbar Crease behaviour remains unchanged.
- No crease topology/history implementation duplicated.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-02 â€” v0.36.18.667 transactional Edge Extrude exit

- Edge Extrude geometry remained hands-on good.
- Exit still dropped selected Edge(s) and left Move visibly armed.
- Added transactional Selection Hub teardown:
  - snapshot selected Edge IDs before owners disarm
  - disarm Edge Extrude
  - disarm transform arming / Move constraint state
  - restore exact Edge selection
  - clear hub suppression
  - return hub to CLOSED puck state
  - repeat transform disarm next animation frame to win against delayed render/button sync
- No extrusion topology, projection, history or repeat-pull logic changed.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-02 â€” v0.36.18.666 Edge Extrude exit returns to puck

- User confirmed Edge Extrude works really well; geometry/drag workflow is now protected.
- User reported two remaining state/UI issues:
  - visible version flashed .664 then reverted to .662
  - closing the Extrude constraint UI hid the gizmo/selection affordance but left Edge Extrude armed
- Version root cause: version.json was still 0.36.18.662; release-version.js correctly treated it as source of truth and overwrote the shell label.
- Updated version.json to current release and republished shell/version pins.
- Edge Extrude session exit now:
  - disarms existing Edge Extrude owner
  - preserves current Edge selection
  - clears Selection Hub suppression
  - forces CLOSED hub state
  - returns the puck on the selected outer rail
- No Edge Extrude geometry/topology code changed.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-02 â€” v0.36.18.664 Edge Extrude side constraint palette

- .663 Edge Extrude itself works hands-on.
- UX feedback: centred mini gizmo implied that arrows should be dragged to extrude, even though the preferred interaction remains drag-the-edge.
- Preserved the existing drag-on-edge extrusion owner and moved only the contextual constraint UI.
- Extrude constraint gizmo now sits offset beside the selected boundary Edge/chain and flips sides near the viewport edge.
- Added compact contextual badge showing:
  - Extrude
  - active Plane/X/Y/Z constraint
  - â€œChoose constraint â€¢ drag edgeâ€
- Active constraint handle is highlighted.
- X/Y/Z and centre remain selector-only; they do not transform geometry.
- Palette follows the newly selected outer rail after a successful repeat pull.
- No Edge Extrude topology or history logic changed.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-02 â€” v0.36.18.663 Edge Extrude gizmo constraint session

- .662 radial Bevel viewport session hands-on PASS.
- Audited current Edge Extrude before implementation and confirmed the required Plane / X / Y / Z constraint maths, ribbon preview, repeat-pull selection, validation and rollback already existed.
- Did not create a second Edge Extrude implementation.
- Radial Edge Extrude now opens a temporary Total Gizmo constraint-selection session.
- During that session:
  - X / Y / Z Move axes select the existing Edge Extrude axis constraint.
  - the centre Move handle selects the existing local Plane constraint.
  - Rotate / Scale / world-plane handles and the contextual-ring centre are hidden.
  - gizmo interaction changes constraint only; it never directly transforms the selected Edge.
- Actual extrusion remains owned by src/edge-extrude.js and still begins by dragging the selected boundary Edge(s).
- Successful repeated pulls keep the temporary gizmo active and follow the newly selected outer rail.
- Disarming Edge Extrude restores normal Total Gizmo visuals and behaviour.
- Left-toolbar Edge Extrude remains unchanged and does not open the special gizmo session.
- Repinned total-gizmo.js and edge-extrude.js to .663.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-02 â€” v0.36.18.662 Bevel viewport session

- .661 Loop Cut ownership + Bevel reset hands-on PASS.
- Added Selection Hub-only Bevel viewport palette.
- Launch path: Edge radial ring -> Bevel.
- Palette mirrors existing authoritative controls:
  - #bevelWidth
  - #bevelSegments
  - #bevelWidthOut
  - #bevelSegmentsOut
- Normal Pencil-drag Bevel remains authoritative and unchanged.
- Added viewport actions:
  - Apply Exact -> existing __boxlabDirectBevel.applyExact(width, launchSelection)
  - Cancel -> existing __boxlabDirectBevel.disarm(), restoring launch selection
- Palette captures the Edge selection present when radial Bevel launches so Apply Exact is stable even if UI ownership changes.
- Bevel completion/cancel semantic events hide the palette.
- Left-toolbar Bevel does not open the viewport palette.
- No Bevel topology kernel changed.

## 2026-10-02 â€” v0.36.18.661 publish pin correction for .660 ownership fixes

- .660 source changes landed correctly.
- Static audit found index.html still loaded direct-bevel.js?v=0.36.18.253.
- Therefore the Bevel post-commit disarm fix would not reliably reach the browser.
- .661 repins direct-bevel.js, main.js, and pencil-orbit-gate.js to the current release so the complete ownership fix is actually loaded.
- No behaviour/code logic changed from .660.

## 2026-10-02 â€” v0.36.18.660 Loop Cut drag ownership + Bevel post-commit reset

- User reported two ownership regressions:
  - Loop Cut inserts topology but Pencil drag rotates the model instead of sliding the inserted loop.
  - Edge Bevel remains armed after completion, preventing normal Edge selection.
- Loop Cut root cause:
  - Pencil orbit gate only knew about Face-direct ownership.
  - main.js directTool='loopCut' was invisible to the gate.
  - mesh Pencil-down could therefore enter deferred orbit and steal the drag after the cut was created.
- main.js now exposes read-only __boxlabMainDirectTool:
  - active()
  - ownsModellingGesture()
- pencil-orbit-gate now treats main direct tools as modelling owners.
  - when Loop Cut / Crease / Add Vertex / Vertex Bevel / legacy direct Face tool owns the gesture, mesh Pencil-down is BLOCK_MODELLING_TOOL, never deferred orbit.
  - background navigation behaviour is unchanged.
- Bevel root cause:
  - direct-bevel.js had disarm() but pointerup commit never called it.
- Bevel pointerup now:
  - commits/restores,
  - releases capture,
  - clears selection,
  - disarms,
  - emits semantic tool:none completion,
  - returns to Edge selection-ready state.
- Bevel pointercancel also restores and disarms.
- Exact Bevel completion now disarms too.

## 2026-10-02 â€” v0.36.18.659 additive Edge hold selection with replacement browsing

- User found that after the .655 transactional browser cleanup, long-press could no longer ADD a second loop/ring to an existing Edge selection.
- Correct interaction model:
  - selection present before hold = fixed base
  - currently browsed candidate = temporary contribution
  - preview = fixed base + current candidate
  - candidate A -> B replaces only the contribution; A never remains underneath B
- applyEdgeHoldCandidate now recomputes the preview from hold.baseIndices + current candidate every time.
- pointerup commits exactly fixed base + current candidate.
- pointercancel still restores the original pre-hold selection.
- Candidate probing remains transactional from .655.
- Face Boundary candidates from .657 remain available.

## 2026-10-02 â€” v0.36.18.658 contextual radial availability mirroring

- .657 closed Face Boundary candidate selection hands-on AWESOME / PASS.
- Added truthful availability state to Face + Edge Selection Hub radial sectors.
- Each radial sector now mirrors its authoritative target button:
  - target enabled -> normal sector
  - target disabled/missing -> sector disabled + visibly dimmed + Ã— marker
  - target active/aria-pressed -> active highlight
- Disabled sectors remain visible so the user can learn which tools exist, but cannot be activated.
- Availability sync runs:
  - when tools ring opens,
  - after bridge-state changes,
  - after click/pointerup UI state changes,
  - after transform tool button changes.
- Click path re-syncs before dispatching and exits immediately if sector is disabled.
- No modelling tool owner or geometry logic changed.

## 2026-10-02 â€” v0.36.18.657 actual closed Face Boundary candidate implementation

- Corrects the incomplete .656 publish where version/docs landed but the helper insertion into main.js did not.
- Added edgeIndexByVertices(a,b).
- Added faceBoundaryCandidatesForEdge(seedIndex).
- collectEdgeHoldCandidates now adds every valid incident Face perimeter as kind "Face Boundary" before generic Boundary/Ring.
- .655 candidate replacement semantics remain unchanged.

## 2026-10-02 â€” v0.36.18.656 Edge hold adds closed Face Boundary candidates

- .655 improved transactional Edge hold browsing, but a cube test exposed an obvious omission:
  - browser could offer a three-edge open path around a Face,
  - but not the complete four-edge closed perimeter of that Face.
- Cause: existing Loop continuation heuristics reason through edge topology and can stop at corner ambiguity; they do not explicitly recognize a Face perimeter as a closed candidate.
- Added faceBoundaryCandidatesForEdge(seedIndex):
  - inspect every Face incident to the held Edge,
  - map each Face perimeter segment back to current mesh edge indices,
  - add the complete perimeter as a Face Boundary candidate when valid.
- On a normal manifold cube edge, this yields up to two Face Boundary candidates: one for each adjacent Face.
- Candidate dedup remains signature-based, so identical results are not repeated.
- Existing Loop / Boundary / Ring logic remains unchanged.

## 2026-10-02 â€” v0.36.18.655 Edge hold-browser transactional selection cleanup

- User found Edge hold+drag candidate browsing incomplete and additive: the first offered loop remained selected when browsing later candidates.
- Root cause 1: invokeEdgeSelector mutated the live selection while probing candidates and never restored it.
- Root cause 2: applyEdgeHoldCandidate merged baseIndices + candidate.indices, so previews accumulated instead of replacing one another.
- Root cause 3: loop probing constrained only one seed endpoint at a time, missing valid two-ended directed continuations on branching/irregular topology.
- Edge candidate probing is now transactional:
  - save original selection
  - temporarily seed authoritative selector
  - capture selector result
  - restore original selection immediately
- Horizontal preview is candidate-only: each preview replaces the previous preview.
- Candidate enumeration now includes:
  - seed-only Loop
  - every one-ended neighbour-directed Loop from endpoint A
  - every one-ended neighbour-directed Loop from endpoint B
  - every valid two-ended neighbour-pair Loop through the seed
  - Boundary via existing #selectBoundaryBtn
  - Ring via existing #selectRingBtn
- Duplicate result signatures are removed.
- pointercancel restores the selection that existed before the hold.
- pointerup commits only the currently previewed candidate.
- No topology/editing kernels changed.

## 2026-10-02 â€” v0.36.18.654 Edge Selection Hub v1

- .653 Shell viewport session hands-on PASS.
- Selection Hub Tools state is no longer Face-only; Edge mode now has its own contextual radial ring.
- Three-state interaction remains unchanged:
  - closed puck -> transform gizmo -> contextual tools ring -> closed puck.
- Edge ring v1 proxies existing authoritative tools:
  - Edge Extrude
  - Bevel
  - Crease
  - Edge Slide
  - Offset Loop
  - Bridge
  - Dissolve Edge
  - Delete Edge
- Tool availability still comes from each existing authoritative button; disabled/invalid tools remain unavailable.
- Face ring remains unchanged.
- Face and Edge rings are mutually exclusive by current selection mode; only the matching ring is interactive/visible.
- No Edge modelling kernels changed.

## 2026-10-01 â€” v0.36.18.653 Selection Hub Shell viewport session

- .652 hands-on PERFECT / PASS and is now the protected Face-direct background-yield checkpoint.
- Added Shell as the second Selection Hub viewport-session tool after Sweep.
- Shell continues to use src/shell.js as the sole authoritative session and geometry owner.
- New selection-hub-shell-session.js appears only when Shell was launched from the Face radial Selection Hub.
- Viewport palette mirrors:
  - Shell Thickness slider
  - current Shell Thickness output
  - Cancel
  - Apply Shell
- Thickness proxy forwards input/change to the existing #shellThickness control, so the established live preview remains authoritative.
- Apply / Cancel proxy the existing #shellApplyBtn / #shellCancelBtn.
- Palette tracks the existing boxlab-tool-session-change lifecycle and disappears on Apply/Cancel/session end.
- Ordinary left-toolbar Shell remains unchanged.

## 2026-10-01 â€” v0.36.18.652 armed Face tool yields background Pencil-down to navigation

- User isolated the real remaining orbit blocker:
  - Pencil orbit works immediately after manually disarming Extrude/Inset.
  - therefore armed Face-direct ownership, not OrbitControls internals, is the blocker.
- Audit confirmed multi-face-direct handled empty-background non-touch pointerdown by:
  - creating pendingBackgroundPress
  - preventDefault
  - stopImmediatePropagation
  - setPointerCapture
- That prevented the same Pencil-down from ever reaching OrbitControls.
- New ownership rule for Apple Pencil only:
  - if Extrude/Inset is armed and Pencil-down hits no Face,
  - disarm the Face-direct tool immediately,
  - clear pending/sequential direct-tool state,
  - emit boxlab-direct-tool-exclusive tool:none reason:background-navigation,
  - DO NOT preventDefault,
  - DO NOT stop propagation,
  - DO NOT capture the pointer.
- The same original Pencil-down therefore continues naturally into viewport navigation.
- Pencil-down on a Face still belongs to armed Extrude/Inset for repeat operations.
- Touch behaviour and mouse/background legacy behaviour are unchanged.

## 2026-10-01 â€” v0.36.18.651 deferred Pencil mesh-intent -> orbit handoff

- .650 debug screenshot finally isolated the remaining Pencil orbit failure:
  - PEN ORBIT MOVE FORWARD appears,
  - but tracked=false,
  - proving OrbitControls receives move events without ever receiving the initial down.
- Cause: existing Pencil policy permanently blocked OrbitControls pointerdown whenever Pencil started over editable mesh.
- Replaced that permanent mesh-hit block in idle component selection with deferred intent resolution:
  - Pencil down on mesh is held as DEFER_MESH_INTENT.
  - Tap/release remains normal selection.
  - Existing fired long-hold browser wins and cancels deferred orbit.
  - Deliberate Pencil movement >= 8 px claims navigation.
- On navigation claim:
  - cancel pending Vertex/Edge/Face hold ownership,
  - cancel component transform/tap intent,
  - cancel paint-select pending/active ownership,
  - restore the pre-down component selection,
  - replay the original Pencil down into the real OrbitControls pointerdown listener,
  - subsequent real Pencil moves continue through OrbitControls.
- Active Face direct tools still block OrbitControls over mesh; modelling tool ownership remains stronger than navigation.
- This is the intended modeless grammar: tap = select, hold = contextual selection gesture, drag = orbit.

## 2026-10-01 â€” v0.36.18.650 lifecycle-tracked Pencil contact

- .648 still failed Pencil orbit while one-finger touch orbit continued to work.
- Conclusion: iPad Pencil can emit contact pointermove events with pressure=0 and buttons=0, so per-event pressure/buttons hover inference remains unreliable.
- Pencil contact is now tracked by pointer lifecycle:
  - qualifying Pencil pointerdown adds pointerId to activePenContacts
  - all subsequent moves for that pointerId are treated as contact
  - window-capture pointerup/pointercancel always clears the contact
- Window release cleanup is used so contact state clears even if another canvas owner consumes the release event.
- Per-event pressure/buttons remains only as fallback for untracked events.
- Added contactTracked to Pencil move diagnostics and contactPointers to the debug snapshot.
- No selection, Through, gizmo, Sweep, or geometry behaviour changed.

## 2026-10-01 â€” v0.36.18.649 restore Selection Hub puck after direct Face commit

- Hands-on: after Extrude the Selection Hub puck reappeared, but after Inset it stayed suppressed.
- Root cause: Selection Hub suppression was released only when the Face selection key changed. Inset can commit while preserving the exact same Face selection key.
- total-gizmo.js now listens for the existing semantic boxlab-face-direct-committed event.
- On committed Extrude or Inset with a valid Face selection:
  - clear hubSuppressedKey
  - return hub to CLOSED state
  - make the puck visible immediately
- Direct tool arming/persistence is unchanged.
- No Extrude/Inset geometry code changed.
- .643 Sweep viewport session and .648 Pencil-orbit work remain untouched.

## 2026-10-01 â€” v0.36.18.648 Pencil contact classification fix

- .647 still failed Pencil orbit, while one-finger touch orbit worked.
- Exact Three.js r179 OrbitControls source audit confirms non-touch pointers, including pointerType='pen', use the mouse rotation path.
- BoxLab's Pencil gate classified hover using pressure alone: pen + pressure<=0.
- On iPad Pencil move streams can transiently report zero pressure while contact remains active; swallowing those moves prevents OrbitControls from receiving rotation deltas even though pointerdown succeeded.
- Hover/contact classification now treats Pencil as contact when either:
  - primary contact button bit is set (buttons & 1), OR
  - pressure > 0.
- pointerup/pointercancel are never considered contact.
- Added PEN ORBIT MOVE FORWARD / PEN ORBIT MOVE HOVER BLOCK diagnostics.
- .647 explicit OrbitControls registration handoff is retained.
- Selection-vs-orbit mesh-hit policy is unchanged.
- Through, Face-direct, Selection Hub and Sweep code unchanged.

## 2026-10-01 â€” v0.36.18.647 explicit OrbitControls registration handoff

- .646 diagnostics showed RAW Pencil pointerdown reaches #viewport but PEN ORBIT ROUTE never fires.
- Therefore pencil-orbit-gate was not wrapping the actual OrbitControls pointer handler.
- Root cause: gate identified OrbitControls listeners by listener function name matching /onPointer/i; current Three.js registration does not reliably satisfy that assumption.
- Added an explicit registration handshake:
  - pencil-orbit-gate exposes beginOrbitRegistration()/endOrbitRegistration().
  - main.js brackets only new OrbitControls(camera, canvas) with that registration window.
  - every pointerdown/move/up/cancel listener added to canvas during that window is wrapped as OrbitControls-owned regardless of listener.name.
- Existing name-based detection remains only as fallback.
- Existing Pencil routing policy is unchanged: editable-mesh hit is withheld from OrbitControls; background Pencil contact is forwarded to OrbitControls.
- Existing PEN ORBIT ROUTE / PEN ORBIT FORWARDED diagnostics retained.
- No Through topology, Face-direct, Selection Hub, Sweep, or multi-object transform logic changed.

## 2026-10-01 â€” v0.36.18.646 Pencil orbit arbitration diagnostics

- .645 hands-on FAIL for post-Through Pencil orbit despite explicit Face-direct pointer capture release.
- Screenshot evidence showed the next Pencil pointerdown reaches #viewport, so stale capture is no longer the primary blocker.
- Added diagnostic-only route tracing to pencil-orbit-gate.js; no orbit/selection behaviour changed.
- Each Pencil OrbitControls pointerdown now logs PEN ORBIT ROUTE with:
  - meshHit
  - selection mode/count
  - Face-direct active
  - component multi enabled
  - paint pending/active state
  - OrbitControls enabled state
  - routing decision: BLOCK_MESH_HIT or FORWARD_ORBIT
- Forwarded Pencil pointerdown also logs PEN ORBIT FORWARDED.
- edge-paint-select.js exposes a read-only diagnostic snapshot of pending/active paint state.
- Added read-only __boxlabPencilOrbitDebug snapshot for current navigation/orbit pointer sets.
- .643 Sweep viewport session remains hands-on PASS and is unchanged.

## 2026-10-01 â€” v0.36.18.645 explicit Face-direct Pencil capture release

- .644 FAIL for the reported post-Through Pencil-orbit regression; disarming Extrude alone was insufficient.
- Deeper ownership audit found multi-face-direct captures the Pencil on canvas pointerdown but its window-capture finish consumes pointerup before canvas-level Pencil/orbit cleanup can observe it.
- multi-face-direct now explicitly releases its own canvas pointer capture before stopImmediatePropagation on every owned completion path: background press, Face press and direct Extrude/Inset drag.
- This follows the ownership rule that the subsystem acquiring pointer capture is responsible for releasing it when global capture completion prevents downstream listeners from seeing pointerup.
- Successful Through still disarms Extrude as introduced in .644.
- Added post-release pointerCapture state to FACE DIRECT THROUGH RELEASE diagnostics.
- No Through topology, selection gesture, Sweep session or gizmo code changed.

## 2026-10-01 â€” v0.36.18.644 release Pencil orbit after successful Extrude Through

- .643 Sweep viewport session is hands-on AWESOME / PASS.
- Hands-on exposed a navigation regression specifically after successful Extrude Through: Apple Pencil could no longer orbit the viewport.
- Root cause: successful Through intentionally cleared Face selection but left Extrude armed. With no selected Face, the still-armed direct Face owner captured the next background Pencil pointerdown before Pencil-orbit could begin.
- Successful Through now completes the direct-tool session: clears selection as before, clears sequential state, disarms Extrude, clears pending Face/background ownership, syncs the UI, and emits tool-exclusive none.
- Added FACE DIRECT THROUGH RELEASE debug marker.
- Normal Extrude and Inset persistence are unchanged; only successful Through completion disarms the direct tool.
- Through topology/build/gate logic is untouched.

## 2026-10-01 â€” v0.36.18.643 Selection Hub Sweep viewport session

- .642 Face Selection Hub v1 hands-on BIG PASS for Extrude, Inset, Knife, Delete, Duplicate and Extract.
- Shell and Sweep launched correctly but still required travel back to the left tool session UI.
- Added the first viewport-session proxy for Sweep while preserving sweep-path.js as the sole authoritative Sweep owner.
- Launching Sweep from the Face radial ring opens a compact floating palette beside the selection with Profile / Path / Finish tabs.
- Profile proxies: Circle, Rectangle, Draw, Use Selection, Profile Size, Circle Sides, Edit, Closed, Undo, Clear.
- Path proxies: Follow Edges, Draw Path, Edit, Undo, Delete Point, Clear.
- Finish proxies: Caps and Apply Sweep; Cancel Sweep remains always available.
- Proxy buttons click the existing Sweep controls; proxy ranges forward values/events to the existing authoritative sliders.
- Palette mirrors active/disabled/stage/value state from the original session rather than maintaining a second Sweep state machine.
- Palette appears only when Sweep was launched from Selection Hub; ordinary left-toolbar Sweep remains unchanged.

## 2026-10-01 â€” v0.36.18.642 Selection Hub v1 â€” Face contextual tool ring

- Added first viewport-first Selection Hub prototype on top of the protected .640 interaction checkpoint.
- Face selection hub has three mutually exclusive states: closed puck -> transform gizmo -> contextual tools ring -> closed puck.
- Transform and Tools states never coexist; the gizmo SVG is physically absent from hit testing while the tool ring is open.
- Face tool ring v1 proxies existing authoritative actions: Extrude, Inset, Knife, Duplicate, Extract, Shell, Sweep and Delete.
- No modelling kernel is duplicated; tool sectors trigger the existing buttons at click time.
- Choosing a tool immediately hides/suppresses the whole hub for the current selection so the launched tool owns the viewport without clutter or competing hit targets.
- The hub restarts at the closed puck only when the component selection changes.
- Existing suspended Face-tool ownership is preserved across Transform -> Tools -> Closed cycling; choosing a new tool clears any suspended old Face tool before launching the new owner.
- Edge/Vertex contextual rings are intentionally deferred until Face v1 is hands-on proven.

## 2026-10-01 â€” v0.36.18.641 Make Unique authoritative materialization

- .640 hands-on PASS; freeze .640 as the protected modeless-selection / dormant-gizmo / Face-direct interaction checkpoint.
- Audited the remaining Phase C Make Unique robustness item.
- Previous Make Unique detached linked metadata from inactive objects while trusting object.mesh to already be the current evaluated world mesh.
- Added authoritative linked-instance materialization from source mesh + instanceMatrix immediately before detaching.
- Active and inactive instances now become standalone meshes at their exact current world placement; active live mesh is refreshed from that same materialized result.
- Multi Make Unique keeps one existing Object-scene history checkpoint and refreshes Object selection/render after detaching.
- Linked source geometry, instance placement, grouping and naming remain unchanged for peers that stay linked.
- Protected multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-01 â€” v0.36.18.640 global Face-direct release ownership

- Hands-on .639 exposed Extrude preview snapping back when Apple Pencil lifted.
- Preview topology was visibly correct during drag; release returned to the pre-drag mesh without a topology-gate rollback message.
- multi-face-direct still completed Extrude/Inset at document capture, despite the repo's established interaction rule that critical completion must run at window capture to survive lower-level owners and overlays.
- Moved Face-direct pointerup/pointercancel completion to window capture.
- Added FACE DIRECT FINISH Gesture Debug marker including event type, drag/preview/blocked state and pointer id so any Safari pointercancel is immediately visible.
- No Extrude/Inset topology maths, Through logic, selection gestures, gizmo maths or protected multi-object-transform code changed.

## 2026-10-01 â€” v0.36.18.639 collapsed gizmo is physically non-interactive

- Hands-on .638 exposed that dormant Total Gizmo handles were visually hidden but still hittable in Safari.
- Root cause: generated SVG hit proxies carry inline pointer-events:stroke, so the old transparent/pointer-events-none SVG container was not a sufficiently hard interaction boundary.
- Collapsed component gizmo now removes the entire SVG handle subtree from hit testing with display:none; only the dormant puck remains interactive.
- Added a runtime onHandleDown guard that rejects any component handle event while expanded=false, protecting against stale/race events even if browser hit-testing changes.
- Expanded gizmo behavior, transform maths, Vertex puck offset, selection gestures and protected multi-object transform are unchanged.

## 2026-10-01 â€” v0.36.18.638 vertical Grow/Shrink gestures + Vertex hold access

- .637 hands-on PASS.
- Added the completion gesture for dense component selections: after long-hold, drag UP to Grow and DOWN to Shrink.
- Face and Edge keep their existing horizontal candidate browsers; once scrub intent is clear, the gesture axis locks horizontal or vertical so the two behaviours cannot fight.
- Vertical preview is deterministic: each pointer position restores the selection snapshot from hold-fire time, then applies exactly N authoritative Grow/Shrink button operations. Moving back toward the hold point therefore reduces steps instead of accumulating runaway changes.
- Vertex now participates in modeless hold gestures with vertical Grow/Shrink only; no artificial Vertex Loop/Ring concept was introduced.
- The dormant gizmo puck is offset up/right for a single selected Vertex so the seed vertex itself remains available for press-and-hold. Multi-vertex puck placement remains at the selection centroid.
- Paint Select yields once any Vertex/Edge/Face hold gesture has fired.
- Existing advanced-selection.js Grow/Shrink logic remains authoritative; no duplicate adjacency solver was added.
- No transform maths, Face topology maths, Group/Multi routing or protected multi-object-transform code changed.

## 2026-10-01 â€” v0.36.18.637 single-owner restore after gizmo collapse

- .636 hands-on PASS: explicit Face gizmo transforms now work over previously armed Extrude without click-through.
- Hardened the collapse path so a suspended Extrude/Inset resumes only after Move/Scale/Rotate transform arming has been fully disarmed and transient gizmo state cleared.
- Prevents a latent two-owner state where a Face direct tool and transform tool could both remain logically armed after closing the gizmo.
- No gesture semantics, transform maths, Face topology maths, Group/Multi routing, or protected multi-object-transform code changed.

## 2026-10-01 â€” v0.36.18.636 gizmo owns explicit transform over armed Face tools

- Video review of .635 showed component Face selection gestures and multi-Extrude working, plus outer-ring scale, but axis/handle presses could select geometry through the gizmo.
- Gesture Debug showed the exact path: GIZMO DOWN -> OWNER REJECT EARLY -> GIZMO HANDOFF FALLBACK. transform-upgrade rejected because Extrude remained armed, then total-gizmo replayed the handle press as a synthetic canvas pointerdown, allowing Extrude/selection to own geometry beneath the gizmo.
- Explicit expansion of the Face component gizmo now suspends an armed Extrude/Inset tool while the gizmo is expanded, and resumes that tool when the gizmo collapses back to the puck.
- Vertex/Edge/Face gizmo handles are now semantic-only: if modern transform ownership rejects a handle, the press is blocked rather than synthetically replayed to the canvas.
- Object/Multi fallback remains unchanged for the protected object transform route.
- No transform maths, Extrude/Inset topology maths, Group/Multi routing, or protected multi-object-transform code changed.

## 2026-10-01 â€” v0.36.18.635 selection remains modeless while tools are armed

- Hands-on .634 exposed two selection ownership regressions: background deselect was unavailable while Extrude/Inset was armed, and legacy component transform listeners consumed face/background taps while Move/Scale/Rotate was armed.
- multi-face-direct now owns a quick background Pencil/mouse tap while Extrude/Inset is armed and clears Face selection without disarming the tool. Movement cancels that tap path so drag-edit behavior remains unchanged; touch remains reserved for navigation.
- Legacy face-transform.js and rotate-transform.js now stand down whenever the modern Total Gizmo/puck is present, preventing pre-.615 direct transform owners from stealing component selection taps.
- Modern selection-first behavior is now authoritative: tap selects/deselects, background tap clears, deliberate transform uses the modern gizmo path, and armed tools remain armed.
- No transform maths, topology maths, Group/Multi routing, or protected multi-object-transform code changed.

## 2026-10-01 â€” v0.36.18.633 shell refresh marker repair

- .633 repo contents were correct, but the HTML <title> still reported v0.36.18.538.
- release-bootstrap.js uses the title as its initial running-version marker, so the stale shell marker could confuse refresh/deploy behavior.
- Synced the title to v0.36.18.633 without changing app behavior or module code.
- This commit also triggers a fresh GitHub Pages deployment for the existing .633 release.

## 2026-10-01 â€” v0.36.18.633 dormant component gizmo + browser ownership

- Hands-on .632 confirmed Loop Cut fixed, then exposed Face hold browsing conflict and selection clutter from the full Total Gizmo.
- Face/Edge hold browser reached its first candidate, but sideways scrub was being claimed by Paint Select at 6 px before the modeless browser could cycle candidates.
- Added explicit modeless selection ownership state from main.js; edge-paint-select now yields pending Paint Select when an Edge/Face hold browser has actually fired.
- Vertex/Edge/Face selections now show a small dormant transform puck instead of the full Total Gizmo by default.
- Tapping the puck, or using Move/Scale/Rotate transform controls, expands the existing proven Total Gizmo.
- Any component selection change collapses the gizmo back to the puck.
- Object/Group/Multi keep the full gizmo behavior to preserve .615/.616 transform baselines.
- No transform maths, loop/ring candidate maths, or protected multi-object-transform code changed.
- Added tests/dormant-gizmo-browser-633.test.mjs and verified published .633 pins/version.

## 2026-10-01 â€” v0.36.18.632 Loop Cut commit cleanup

- Hands-on testing exposed repeated/random extra loop cuts when creating a simple Loop Cut.
- Root cause was legacy src/loop-cut-commit.js from the v0.16 workflow: after a real Loop Cut it replayed synthetic pointer taps over the yellow loop to convert it to edge selection.
- With the modern persistent direct Loop Cut owner, those synthetic taps re-entered Loop Cut and created additional topology.
- Removed synthetic pointer replay and now select the finished loop directly through __boxlabSelectionBridge.set('edge', indices).
- Preserved the existing Undo/Redo commit step that clears the temporary Loop Slide session while retaining the finished topology.
- Added tests/loop-cut-commit-632.test.mjs.
- .631 global release ownership fix remains unchanged.

## 2026-10-01 â€” v0.36.18.631 global component release ownership

- Hands-on .630 exposed a second ownership failure: selecting a Face/Edge can make the Total Gizmo appear between pointerdown and pointerup, so release is not guaranteed to return to the canvas.
- This left Face/Edge hold timers alive after an ordinary tap, causing delayed Loop / Face Loop selection; pending Paint Select could likewise survive into a later Pencil gesture.
- Moved Face Hold and Edge Hold completion/cancellation to window capture pointerup/pointercancel, matching the established global gesture-completion rule.
- Moved pending Paint Select release cleanup to window capture so gizmo overlays cannot strand pending state.
- No loop/ring candidate maths, gizmo transform maths, Group/Multi routing, or protected multi-object transform code changed.
- Added tests/global-component-release-631.test.mjs and verified the published .631 wiring/static regression checks.

## 2026-10-01 â€” v0.36.18.630 defer Paint Select ownership until drag

- Identified component Paint Select as a capture-phase owner that immediately stopped unselected component pointerdown while hidden Multi was enabled.
- Changed Paint Select to pending-on-down, claim-on-drag after 6 px.
- Tap and hold gestures now retain pointerdown ownership until an actual paint drag occurs.
- Added PAINT PENDING / PAINT CLAIM Gesture Debug markers.

## 2026-10-01 â€” v0.36.18.629 deep capture diagnostics

- Permanent Gesture Debug is now proven working.
- Added deep canvas capture-owner tracing only while Gesture Debug is enabled.
- Diagnostic-only build to identify the listener suppressing Face pointerdown before normal canvas handling.

## 2026-10-01 â€” v0.36.18.628 Gesture Debug binding order fix

- Fixed Viewport Gesture Debug button binding order.
- ensureUI() now creates the button before querySelector/listener binding.
- Diagnostic infrastructure only; no transform/selection behavior changed.

## 2026-10-01 â€” v0.36.18.627 Gesture Debug startup + Vertex Circle lifecycle

- Fixed Gesture Debug toggle binding accidentally nested inside Focus View toggle.
- Permanent Gesture Debug now initializes normally and remains off by default.
- Removed temporary deep capture monkeypatch from permanent debug infrastructure.
- Fixed Vertex Circle lifecycle by re-syncing Vertex layout/Circle after late Inspect/Repair drawer reconciliation.
- Bumped affected module pins to avoid stale-cache ambiguity.

## 2026-10-01 â€” v0.36.18.625 deterministic Circle startup + permanent Gesture Debug

- Fixed Vertex Circle startup race by sequencing component-circle after face-reconstruct / Vertex layout ownership.
- Removed concurrent standalone Circle import.
- Added permanent Viewport -> Gesture Debug toggle.
- Gesture Debug is off by default, persisted, lightweight when disabled, and reusable for future interaction debugging.
- Temporary deep EventTarget capture monkeypatch removed from normal infrastructure.

## 2026-10-01 â€” v0.36.18.624 canvas capture-owner tracer

- .623 localized Face Hold failure to a canvas pointerdown capture listener after the debug sentinel.
- Gesture Debug now wraps later canvas capture listeners and logs registration, entry, exit, and propagation state.
- Diagnostic-only build.
- Dormant gizmo architecture retained as a separate next-step UX experiment.

## 2026-10-01 â€” v0.36.18.623 canvas-boundary diagnostics

- .622 proved the real Pencil pointerdown reaches canvas capture and is not swallowed as hover.
- Added RAW CANVAS CAPTURE and RAW CANVAS BUBBLE sentinels to isolate where the event disappears before Face Hold.
- Diagnostic-only build.

## 2026-09-30 â€” v0.36.18.622 Pencil-gate diagnostics

- .621 Face hold attempt produced only DEBUG READY.
- Instrumented the earlier Pencil orbit capture gate and raw document pointerdown.
- Diagnostic-only build; no behavior change.
- Primary suspect is pressure-0 Pencil pointerdown being classified as hover and swallowed.

## 2026-09-30 â€” v0.36.18.621 reusable Gesture Debug layer

- .620 Face long-press failed hands-on.
- Added reusable gesture-debug.js instead of another speculative gesture change.
- Instrumented Face Hold, Total Gizmo and semantic transform ownership.
- Diagnostic-only build; no intended interaction behavior change.
- New workflow rule: after one failed straightforward interaction fix, use Gesture Debug before further behavioral changes.

## 2026-09-30 â€” v0.36.18.620 Face long-press selection browser

- Abandoned and fully removed the failed .617-.619 double/triple-tap experiment.
- Restored clean single-tap component selection behavior.
- Added Face long-press + horizontal scrub selection browser using the proven Edge hold architecture.
- Candidate selectors are existing Face Loop, Face Ring, Coplanar Region and Connected Shell tools.
- Invalid and duplicate candidates are skipped.
- Existing selection is preserved additively while browsing.
- Gizmo and Group/Multi baselines unchanged.

## 2026-09-30 â€” v0.36.18.619 modeless tap continuation through gizmo overlay

- .618 failed because tap #2 often landed on the newly visible Total Gizmo instead of the canvas.
- Added a modeless tap claim API so an active rapid tap chain can claim gizmo pointerdown before transform ownership.
- Claimed overlay taps complete through the same modeless tap owner on global pointerup.
- Normal gizmo behavior remains immediate outside active tap chains.

## 2026-09-30 â€” v0.36.18.618 single owner for component taps

- .617 double/triple tap failed because modeless tap handling and legacy endDrag tap handling both owned the same release.
- Removed component selection toggling from endDrag.
- Modeless tap handler is now the sole owner of component single/double/triple tap semantics.
- Component drag transform completion remains in endDrag.
- Edge hold and gizmo ownership unchanged.

## 2026-09-30 â€” v0.36.18.617 modeless double/triple-tap selection

- Added modeless multi-tap selection to Vertex / Edge / Face using the existing component tap owner.
- Double-tap invokes existing Grow selection.
- Triple-tap invokes existing Connected selection.
- Single-tap select/deselect remains immediate.
- Tap chain is cancelled by drag, hold, timeout, background tap, or mode change.
- Edge long-press/scrub Loop/Ring remains untouched.
- Object/Group/Multi transform ownership unchanged.
- Protected multi-object-transform unchanged.

## 2026-09-30 â€” v0.36.18.616 HANDS-ON PASS

- User confirmed grouped Object gizmo transforms work perfectly.
- Effective-object-count routing is validated.
- Single Object remains on semantic gizmo owner; Group/Multi remain on established owners.
- .616 is the protected Group/Multi routing baseline.

## 2026-09-30 â€” v0.36.18.616 grouped/multi gizmo ownership correction

- Fixed .615 ownership regression where grouped selections could be mistaken for a single Object because object-origin intentionally masks the multi flag in some contexts.
- Object gizmo routing now uses effective selected object count: 2+ ids always remains on established group/multi owners.
- Single Object keeps the .615 semantic gizmo path.
- Group/pivot transform math and protected multi-object-transform remain unchanged.
- Planned modeless work deferred until this regression passes.

## 2026-09-30 â€” v0.36.18.615 HANDS-ON PASS

- User confirmed the unified semantic gizmo works perfectly.
- Vertex / Edge / Face / single Object now share one gizmo contract.
- Plane Move semantics are consistent across these modes.
- True Multi-object remains deliberately on protected v0.36.1.0 owner.
- .615 is the new unified gizmo baseline.

## 2026-09-30 â€” v0.36.18.615 single Object semantic gizmo handoff

- Unified single Object mode with the direct semantic Total Gizmo contract already proven for Vertex / Edge / Face.
- Single Object now receives the real gizmo pointer event and exact tool/constraint directly through transform-upgrade.
- Object XY/XZ/YZ Plane Move now uses the same true world-plane logic as components.
- True Multi-object selection deliberately remains on protected multi-object-transform.js?v=0.36.1.0.
- Protected multi-object transform file unchanged.

## 2026-09-30 â€” v0.36.18.614 selected-component tap owner + true plane Move

- Added a dedicated selected-component tap owner so tap-to-remove no longer depends on transform endDrag.
- Tiny component transforms inside the tap envelope are rolled back before selection toggle.
- Added true world XY/XZ/YZ Move planes for direct component Total Gizmo gestures.
- Preserved .612 direct component-gizmo architecture and protected multi-object transform.

## 2026-09-30 â€” v0.36.18.613 remove diagnostics + robust component tap deselect

- Removed temporary .612 gizmo runtime diagnostics after hands-on PASS.
- Preserved direct component Total Gizmo ownership.
- Fixed selected component tap-to-remove reliability by adding a tap envelope tolerant of Pencil jitter.
- Tiny accidental component transforms within the tap envelope are rolled back before toggling selection.
- Applies to Face / Edge / Vertex.
- Background deselect and additive selection unchanged.
- Protected multi-object-transform unchanged.

## 2026-09-30 â€” v0.36.18.612 HANDS-ON PASS

- User confirmed component Total Gizmo now works perfectly.
- Direct semantic gizmo handoff is validated for component transforms.
- SweepPath.editing getter/function bug was the actual blocker.
- .612 becomes the protected component-gizmo baseline.
- Temporary runtime diagnostics can be removed in the next build.
- Protected multi-object-transform unchanged.

## 2026-09-30 â€” v0.36.18.612 component gizmo owner exception fix

- .611 diagnostics revealed transform-upgrade called SweepPath.editing as a function even though it is a boolean getter.
- Fixed both transform entry guards to read SweepPath.editing as a property.
- This removes the exception that prevented direct component gizmo ownership from reaching OWNER BEGIN.
- Diagnostic panel retained for verification.
- Protected multi-object-transform unchanged.

## 2026-09-30 â€” v0.36.18.611 component gizmo exception capture

- .610 proved the gizmo handle reaches transform-upgrade OWNER REQUEST, but the owner throws before OWNER BEGIN/return.
- Added visible HANDOFF EXCEPTION reporting around the direct component handoff.
- No transform behavior changes.
- Protected multi-object-transform unchanged.

## 2026-09-30 â€” v0.36.18.610 component gizmo runtime diagnostics

- .609 hands-on FAIL: no component gizmo transforms effectively worked.
- Added a temporary visible runtime diagnostic panel instead of another transform rewrite.
- Diagnostic traces handle down, direct owner request/begin/reject, handoff result, pointer move, owner finish and gizmo pointerup.
- No intended transform behavior changes.
- Protected multi-object-transform unchanged.

## 2026-09-30 â€” v0.36.18.609 direct component Total Gizmo handoff

- .608 deployed successfully but hands-on behavior remained effectively unchanged.
- Removed the synthetic canvas pointerdown bridge for Vertex / Edge / Face Total Gizmo gestures.
- Total Gizmo now calls transform-upgrade.beginGizmoGesture(spec,event) directly with the real SVG pointer event and exact handle spec.
- Component gizmo handle captures the real pointer for the drag.
- Object mode keeps the proven legacy synthetic handoff.
- This is an ownership/transport correction; transform math and exact-entry math are otherwise unchanged.
- Protected multi-object-transform unchanged.

## 2026-09-30 â€” v0.36.18.608 component gizmo ownership correction

- Fixed component gizmo drag routing after .607 hands-on testing.
- transform-upgrade now owns Vertex/Edge/Face transforms only when launched by Total Gizmo.
- Ordinary component viewport drags remain with main.js, removing duplicate gesture ownership.
- Gizmo handle tool/constraint is authoritative for component gestures.
- Axis Scale now uses motion projected along the selected gizmo axis.
- No-drag gizmo clicks no longer toggle component selection before exact entry.
- Increased invisible gizmo handle hit widths to reduce orbit fall-through.
- Object gizmo, modeless Edge selection, and protected multi-object-transform remain unchanged.

## 2026-09-30 â€” v0.36.18.607 Total Gizmo component integration phase 1

- Parked the accepted .606 modeless Edge candidate browser.
- Extended Total Gizmo visibility/pivoting into Vertex, Edge and Face selections.
- Gizmo pivot now uses the centroid of the selected component vertex set.
- Reused transform-upgrade.js as the existing component Move / Scale / Rotate owner.
- Gizmo-owned component Move / Scale bypass direct-hit gating.
- Component Rotate is allowed only for gizmo-owned gestures; direct viewport component Rotate remains blocked.
- No parallel transform math added.
- Protected multi-object-transform unchanged.

## 2026-09-30 â€” v0.36.18.606 hold + scrub Loop/Ring candidate browser

- Added an in-gesture modeless candidate browser for Edge long-press.
- Long-press enters candidate mode; horizontal Pencil scrub advances through valid Loop candidates, then Ring candidates; release commits.
- Ambiguous Loop topology is no longer refused outright: directed candidates are enumerated by feeding seed + neighbouring hint edges through the existing two-edge Loop resolver.
- Strict single-seed Loop remains first when valid.
- Ring is used automatically when no Loop candidate exists.
- Candidate results are deduplicated.
- Additive base selection survives while the held seed contribution is previewed/replaced.
- No new topology solver was added; existing strict Loop, directed Loop, and Ring commands remain authoritative.
- Protected multi-object-transform unchanged.

## 2026-09-30 â€” v0.36.18.605 additive modeless Loop/Ring selection

- Extended .604 modeless Loop/Ring hold cycling into additive selection sessions.
- Each new seed snapshots the current Edge selection as its base, runs the existing Loop/Ring selector on the seed, then merges the result back into the base.
- Same-seed Loop â†” Ring cycling replaces only that seed's contribution; earlier accumulated selections remain intact.
- Failed/ambiguous selectors restore the base instead of clearing it.
- Background deselect still clears the full session.
- Existing Loop/Ring topology logic remains authoritative.
- Protected multi-object-transform unchanged.

## 2026-09-30 â€” v0.36.18.604 modeless Loop â†” Ring hold cycling

- Extended the proven .603 Edge long-press owner instead of adding a second gesture listener.
- First hold on a seed edge invokes strict Loop selection.
- Repeating the hold on the same seed during the same selection session alternates Ring then Loop.
- Ordinary tap semantics remain untouched.
- Cycle resets after seed change, background deselect, transform, or selection-mode change.
- Existing Loop and Ring commands remain the topology authorities.
- .603 refusal-to-guess Loop behavior remains protected.
- Protected multi-object-transform unchanged.

## 2026-09-30 â€” v0.36.18.603 modeless Edge long-press Loop HANDS-ON PASS

- User confirmed Edge long-press Loop selection feels great.
- Confirmed strict-loop behavior is desirable:
  - clean, single-continuation loops select
  - ambiguous junctions / multiple possible continuations do not select
  - example: around the top of a cube, selection intentionally refuses rather than guessing
- This refusal-to-guess rule is now protected for future Loop/Ring modeless gestures.

## 2026-09-30 â€” v0.36.18.603 first modeless gesture: Edge long-press Loop

- .602 gizmo soft catches passed hands-on.
- Audited existing main.js gesture ownership before adding modeless behavior.
- Existing background-tap deselect retained; no duplicate tap owner added.
- Added Pencil/mouse Edge long-press gesture that invokes the existing Loop selection command.
- Finger/touch is excluded to preserve iPad navigation.
- Pointer movement cancels the hold.
- If a transform drag was prepared but not yet armed, long-press cancels that pending drag before Loop selection.
- Ring cycling deliberately deferred until this primitive passes.
- Protected multi-object-transform unchanged.

## 2026-09-30 â€” v0.36.18.602 stronger Total Gizmo soft catches

- Resumed pending Rotate/Scale gizmo precision work after .601 Nomad handoff PASS.
- Re-audited real gesture ownership before changing behavior.
- Widened gizmo Rotate soft-catch window from 3.5Â° to 5Â° in transform-upgrade.js.
- Widened Scale soft-catch threshold from 0.035 to 0.065 in main.js, the actual Object Scale owner.
- Kept transform-upgrade Scale helper in parity for its owned paths.
- Legacy non-gizmo 15Â° Rotate snap remains unchanged.
- Catches remain releasable by continuing the drag beyond the window.
- No change to Move detents, exact type-in or protected multi-object-transform.

## 2026-09-30 â€” v0.36.18.601 explicit Files-based Nomad handoff

- Closed direct Safari/Web Share -> Nomad Sculpt as unsupported after .596-.600 testing.
- Working path is filesystem-backed: save GLB to Files, then Share -> Nomad Sculpt from Files.
- GLB secondary action renamed to Save GLB to Files.
- Guidance text now explicitly describes the two-step Files workflow.
- GLB MIME remains model/gltf-binary; export payload is unchanged.
- OBJ Share / Open In remains unchanged.
- HTML shell, module pin and version.json advanced together to .601.
- Protected multi-object-transform module unchanged.

## 2026-09-30 â€” v0.36.18.600 Save for Nomad Files workflow

- .599 hands-on FAIL for direct Safari/Web Share -> Nomad target eligibility.
- Same GLB remains valid and opens in Nomad after saving to Files, so browser target discovery is treated as a platform limitation rather than an export defect.
- Replaced misleading GLB Share / Open In wording with Save for Nomad.
- Added explicit iPad guidance: Save to Files, then in Files use Share â†’ Nomad Sculpt.
- Restored GLB Web Share File MIME to `model/gltf-binary`.
- OBJ Share / Open In remains unchanged.
- HTML shell and version.json advanced together to .600.
- Protected multi-object-transform module unchanged.

## 2026-09-29 â€” v0.36.18.599 extension-driven GLB share type test

- .598 single typed GLB share still did not surface Nomad Sculpt.
- Same exported GLB does surface Nomad when shared from iPad Files, isolating the difference to Safari/Web Share item representation rather than model validity.
- GLB Web Share now omits File.type so iPadOS/WebKit must infer the document type from the .glb filename.
- OBJ share remains explicitly typed.
- HTML shell and version.json advanced together to .599.
- If this fails, stop MIME guessing and treat direct web-share target eligibility as the likely platform limitation.

## 2026-09-29 â€” v0.36.18.598 typed GLB File sharing

- Single-item Web Share was working, but Nomad Sculpt still did not accept the shared GLB.
- Found Share / Open In was explicitly changing GLB File.type to `application/octet-stream`.
- GLB share now creates a real `.glb` File with MIME `model/gltf-binary`.
- Web Share remains files-only with no title/text payload.
- HTML shell and `version.json` advanced together to .598.
- No GLB geometry, facegroup, PBR, UV, tangent, vertex-colour or layer-preservation logic changed.

## 2026-09-29 â€” v0.36.18.597 release manifest sync

- Live shell visibly loaded .597, then reverted to .595.
- Root cause: `version.json` was still `0.36.18.595`; `release-version.js` intentionally treats the manifest as network source of truth and restamped the UI back to .595.
- Synced `version.json` to `0.36.18.597`.
- No modelling/export/interaction code changed in this correction.

## 2026-09-29 â€” v0.36.18.597 transform-menu gizmo transient reset

- Fixed Total Gizmo becoming stuck after Transform menu interaction.
- Added explicit transient-state reset covering active handle, pointer ownership, drag styling, explicit gizmo constraint, HUD state and global active-gizmo drag marker.
- Transform tool and constraint menu clicks now reset gizmo transient state before applying the new menu state.
- Transform remains armed as requested; this is not a modelling/tool-state reset.
- .596 iPad single-file share fix remains unchanged.
- Protected multi-object-transform module unchanged.

## 2026-09-29 â€” v0.36.18.596 single-file iPad Share / Open In payload

- User traced missing Nomad Sculpt share destination to a second text payload accompanying GLB/OBJ exports.
- Root cause was Web Share calls using both `files:[file]` and `title:fileName`; iOS exposed the title as an additional text item/sidecar.
- Changed both Share / Open In and iPad Export / Save fallback to share only `{files:[file]}`.
- No model export geometry, Nomad preservation, facegroup, PBR, UV, tangent, vertex-colour or layer logic changed.
- Protected multi-object-transform module unchanged.

## 2026-09-28 â€” v0.36.18.550 HANDS-ON PASS

- User confirmed topology-safe Nomad UV round-trip PASS.
- .550 becomes the verified Nomad preservation checkpoint.
- UV seams and texture alignment survive the tested unchanged-topology round trip.
- Future work: tangents and vertex colours, then topology-aware morph/layer correspondence.

## 2026-09-28 â€” v0.36.18.550 Nomad UV Preservation Phase 2A

- Added per-face-corner UV capture on GLB import.
- UV seams survive welding because UVs are not collapsed onto shared geometry vertices.
- Conservative quad reconstruction carries UVs only when the two source triangles agree along the shared edge.
- Imported reconstructed topology receives a stable topology signature.
- Base GLB export restores UVs only when topology still matches that signature.
- Vertex movement is allowed; topology edits safely disable UV restoration.
- .549 PBR/material/texture passthrough remains in place.
- Frozen Beta 5 remains untouched.


## 2026-09-28 â€” v0.36.18.549 HANDS-ON PASS

- User confirmed Nomad GLB Preservation Layer Phase 1 PASS.
- .549 is now the verified Nomad handoff checkpoint.
- Safe material/texture/Nomad metadata passthrough survives the tested round trip.
- Future work remains for topology-bound UV/tangent/vertex-colour/morph correspondence.

## 2026-09-28 â€” v0.36.18.549 Nomad GLB preservation layer Phase 1

- Added opaque Nomad GLB passthrough capture at import.
- Stored original PBR materials, embedded image bytes, texture/sampler definitions, Nomad mesh/node extras, and topology-bound channel descriptors.
- Export now reattaches safe PBR/texture/Nomad metadata to rebuilt BoxLab GLB geometry.
- UV/tangent/vertex-colour/morph arrays are captured but deliberately not remapped yet because they are topology-bound.
- .548 quad reconstruction and .547 Nomad facegroup structure remain in place.
- Frozen Beta 5 remains untouched.


## 2026-09-28 â€” v0.36.18.548 conservative GLB quad reconstruction

- Added conservative quad recovery for editable GLB/GLTF imports.
- Reuses existing BoxLab triangle-pair topology validation.
- Requires same non-empty facegroup and near-perfect coplanarity before removing a GLB diagonal.
- OBJ path remains untouched.
- Goal: recover obvious original Nomad quads without remeshing genuine triangulated geometry.
- Frozen Beta 5 remains untouched.

## 2026-09-28 â€” v0.36.18.547 Nomad-native facegroup export

- Improved BoxLab facegroup display using deliberately spaced hues instead of hash-neighbour colours.
- Reworked GLB facegroup export to follow the structure observed in the user's Nomad GLB:
  - shared material
  - mesh-level Nomad groups metadata
  - primitive-level Nomad group indices
- Goal is to keep one logical object intact in Nomad while retaining its facegroups.
- Frozen Beta 5 remains untouched.


## 2026-09-28 â€” v0.36.18.546 Import module parse fix

- Fixed syntax error in .544 GLB importer that prevented import-mesh.js from loading at all.
- Restores Editable / Reference controls and Import file-picker handler.
- No intended GLB semantics changed beyond making the .544 importer actually run.
- Frozen Beta 5 remains untouched.

## 2026-09-28 â€” v0.36.18.545 File menu interaction fix

- Changed File menu auto-close ownership from all buttons to terminal actions only.
- Configuration buttons and editable controls now keep the menu open.
- No GLB or modelling behavior changes.
- Frozen Beta 5 remains untouched.

## 2026-09-28 â€” v0.36.18.544 GLB logical object import

- Fixed Nomad GLB imports creating one BoxLab object per facegroup when Split objects by groups was unticked.
- GLB/GLTF import now honors the same Split toggle as OBJ.
- Split off merges sibling GLB primitives back into one logical editable object and preserves each primitive as a facegroup.
- Split on keeps primitives as separate BoxLab objects.
- Existing export verification and frozen Beta 5 remain unchanged.

## 2026-09-28 â€” v0.36.18.543 Nomad round-trip validation

- Added in-memory GLB self-verification before Save/Share.
- Verifies logical object count and primitive/material group-slot count after GLTF re-read.
- Successful GLB export reports `GLB verified`.
- GLB import now records per-object facegroup counts for round-trip diagnostics.
- No modelling behavior changes. Frozen Beta 5 remains untouched.


## 2026-09-28 â€” v0.36.18.542 File Name edit root-cause fix

- Found File menu auto-close handler explicitly included inputs/labels, so tapping File Name immediately closed the menu and killed editing.
- Editable controls now keep the File menu open; button actions still close it.
- Bumped topbar-layout runtime pin to .542.
- No GLB facegroup, modelling, or frozen Beta 5 changes.

## 2026-09-28 â€” v0.36.18.541 File menu refresh + File Name edit fix

- Bumped stale styles.css cache key from .270 to .541 so File menu sizing reliably refreshes on Safari/iPad.
- File Name now takes explicit touch/Pencil focus and temporarily allows normal text-edit touch behavior while focused.
- Restores BoxLab touch-action when editing ends.
- No GLB facegroup, modelling, or frozen Beta 5 changes.

## 2026-09-28 â€” v0.36.18.540 Nomad GLB facegroup round trip

- GLB import now maps primitive/material boundaries into BoxLab faceGroups.
- GLB export now writes BoxLab facegroups as grouped GLB primitives/material slots while keeping each BoxLab object intact as one object.
- BoxLab facegroup names are embedded in GLB metadata/name where possible for exact BoxLab round trips.
- Updated File menu/export panel sizing to the standard BoxLab UI scale.
- Frozen Beta 5 remains untouched.

## 2026-09-27 â€” v0.36.18.539 Export As + GLB handoff

- Added a structured File > Export / Save panel with filename, OBJ/GLB and Base/SubD choices.
- Added GLB export via Three.js GLTFExporter.
- GLB preserves visible editable BoxLab objects as separate named nodes for Nomad Sculpt / 3D handoff.
- iPad uses the native share sheet so users can choose Save to Files; desktop uses showSaveFilePicker when supported; download remains fallback.
- Existing quick OBJ export remains available.
- Frozen Beta 5 remains untouched.

## 2026-09-27 â€” Beta 5 frozen at v0.36.18.538

- Final Boolean one-step Undo retest passed hands-on.
- Approved source commit: `343dc4dec00046762c7a9a11edaa92e0160a5a55`.
- Immutable /beta-5/ snapshot added by freeze commit `7667df2f889aca84b67bad56bf559d9c8d67478e`.
- Beta 5 closes the post-Beta-4 release hardening cycle including Face/Repeat ownership, progressive Vertex/Edge UI, construction-tool smoke testing, Shell first-press repair, and Boolean scene Undo repair.
- Multi-selection Object drawer collapse to Active Tools is accepted as a non-blocking UI quirk; Multi transforms passed.
- Normal development resumes on live main; /beta-5/ stays immutable.

## 2026-09-27 â€” v0.36.18.538 repair Boolean one-step Undo

- Beta 5 final smoke found Boolean geometry working but Undo did nothing.
- The pre-operation checkpoint was created before addMesh(), then lost when the new Boolean result became active and restored its empty history.
- Changed Boolean history ordering to capture pre-scene first and checkpointSnapshot() after result activation.
- Matches the proven Linked Duplicate scene-history pattern.
- No Boolean solver changes.

## 2026-09-27 â€” v0.36.18.537 fix Shell first-press iPad launch race

- Beta 5 Gate Batch 3 found Shell occasionally required a second press.
- Face layout settlement could move the Shell button during the pointer gesture, cancelling the click.
- Touch/Pencil now launches Shell on pointerdown before the pointerup layout pass.
- Mouse/keyboard click path remains.
- No Shell modelling/geometry changes.

## 2026-09-27 â€” v0.36.18.536 enter Beta 5 release-candidate hardening

- Removed temporary FACE DEBUG instrumentation only.
- Created BETA5_RELEASE_CHECKLIST.md covering navigation, Face/Repeat, Vertex/Edge, construction tools, Object/Multi/Boolean, Mesh Health/import/export and iPad UI.
- Feature development is paused for the release-candidate cycle; only reproducible release blockers should be changed before Beta 5 freeze.

## 2026-09-27 â€” v0.36.18.535 Face/Repeat checkpoint PERFECT PASS

- User confirmed perfect hands-on pass after selected-hit priority repair.
- Final stable combination:
  - deliberate single selected Face is authoritative
  - deliberate multi-face selection is authoritative
  - immediate sequential A -> B remains supported
  - Inset single/multi remains stable
  - Repeat Extrude/Inset works transactionally
  - Repeat operation follows newest real Face operation across repeated cycles
- This closes the Face/Repeat regression chain.
- FACE DEBUG overlay remains cleanup-only.

## 2026-09-27 â€” v0.36.18.535 prioritize selected Face over generic through hit

- .534 still allowed generic viewport primary picking to resolve a through Face despite deliberate selected Face(s).
- Added selectedHit from the dedicated selected-face raycast.
- Deliberate single and multi-face operations now prioritize selectedHit.
- Immediate sequential A -> B retains its isolated overlap substitution path.

## 2026-09-27 â€” v0.36.18.534 bind sequential Extrude overlap to unchanged selection

- User screenshot showed selected-Face Extrude could again jump to a rear Face after Repeat cycles.
- Replaced loose sequential-overlap boolean semantics with a selection-bound key.
- Successful Extrude records the selected Face IDs that own the sequential continuation opportunity.
- Any subsequent Face selection change clears that opportunity automatically.
- Preserves immediate A->B continuation while protecting deliberate Face selection.

## 2026-09-27 â€” v0.36.18.533 remove delayed Repeat operation overwrite

- User found a multi-cycle state regression after .532.
- Delayed replay cleanup still restored the replayed op via armedOperation=op.
- That stale timeout could overwrite a newer real Extrude/Inset state.
- Removed the assignment; cleanup now only clears applying and refreshes UI.
- This makes real Face commits authoritative for Repeat operation changes.

## 2026-09-27 â€” v0.36.18.532 Face + Repeat checkpoint HANDS-ON PASS

- User confirmed .532 passes the remaining Repeat state-sync case.
- Confirmed stable: normal/sequential/multi-face Extrude, single/multi-face Inset, Repeat Extrude, Repeat Inset, persistent Repeat arming, and switching Repeat to the newest real Face operation.
- This closes the Face/Repeat regression chain.
- Temporary FACE DEBUG overlay remains for cleanup only.

## 2026-09-27 â€” v0.36.18.532 sync armed Repeat to newest real Face operation

- .531 direct Repeat passed hands-on.
- User found Repeat Inset could remain armed after subsequently performing a real Extrude.
- Removed the !applying timing dependency from armed Repeat state updates.
- Replay-generated direct commits are ignored by precision last-operation capture; new real Extrude/Inset commits always become the latest operation.
- Armed Repeat now follows the latest real operation immediately.

## 2026-09-27 â€” v0.36.18.531 replace synthetic Repeat with direct Face transaction

- Repeat remained non-functional on .530 despite correct target selection.
- Retired the synthetic pointer replay path for Repeat.
- Added direct transactional replay API to multi-face-direct.
- Extrude replay uses stable native single-Face extrusion, topology gate and one history step; negative values that would become Through/blocked are refused.
- Inset replay converts the stored geometric inset distance to target-face uniform inset amount and applies it directly with one history step.
- Normal interactive Face ownership/selection code is unchanged.

## 2026-09-27 â€” v0.36.18.530 make Repeat/Exact trust explicit Face selection

- Repeat remained non-functional after .529 normal targeting passed.
- Root cause candidate found in the synthetic replay path: Repeat explicitly selected the tapped Face, then the synthetic pointer gesture caused multi-face-direct to ray-pick the viewport again.
- Removed that redundant synthetic re-pick.
- pointerId 9876 now trusts the current Face selection and preserves the full selected set.
- Real pointer Face targeting, sequential Extrude, Inset and Through behavior are unchanged.

## 2026-09-27 â€” v0.36.18.529 preserve deliberate selected Face before sequential overlap

- While testing Repeat on .528, user explicitly selected a front Face and then dragged Extrude, but the deeper rear Face was extruded.
- Root cause: the sequential overlap preference was still active for any one-selected-face real Extrude gesture.
- Added preferSequentialUnselected state.
- Tool arming and explicit Face taps reset it.
- Successful ordinary Extrude sets it for the next direct sequential gesture only.
- This preserves deliberate preselection while retaining the A -> B armed workflow.

## 2026-09-27 â€” v0.36.18.528 isolate Repeat/Exact synthetic Face gesture

- .527 normal Face tools passed hands-on.
- Repeat/Exact uses synthetic pointerId 9876 and already supplies the explicit selected target Face.
- Prevented the sequential Extrude overlap preference from substituting another Face for pointerId 9876.
- Prevented sequential-through-fallback from arming on pointerId 9876.
- No change to real Pencil/touch Extrude, Inset, multi-face behavior or Through ownership.

## 2026-09-27 â€” v0.36.18.527 Face Extrude/Inset checkpoint HANDS-ON PASS

- User confirmed .527 passes after the full Face regression repair sequence.
- Confirmed working:
  - sequential single-Face Extrude while tool remains armed
  - deliberate multi-face Extrude
  - single-Face Inset
  - multi-face Inset
- Final architecture:
  - multi-face-direct is authoritative for Face hit resolution;
  - sequential Through fallback waits for resolved boxlab-face-direct-press instead of stale window pointerdown selection;
  - overlap substitution is limited to armed Extrude with exactly one selected Face;
  - multi-face and Inset workflows preserve intentional selected faces.
- This is now the stable Face baseline. Avoid speculative changes to these ownership rules.

## 2026-09-27 â€” v0.36.18.527 make overlap hit substitution Extrude-only

- .526 passed sequential and deliberate multi-face Extrude, while Inset still failed.
- Found shared Face hit logic was applying the sequential Extrude overlap preference to Inset too.
- On a selected front Face, Inset could therefore choose an unselected rear Face from the same ray stack.
- Limited the unselected-overlap substitution to armed Extrude only.
- Inset now keeps the pressed selected Face while retaining direct press on an unselected Face.
- No Inset geometry solver changes in this build.

## 2026-09-27 â€” v0.36.18.526 constrain overlap hit preference for multi-Face Extrude

- .525 fixed sequential A -> B armed Extrude.
- Hands-on then revealed deliberate multi-face Extrude could choose an unselected face through the back of the model.
- Cause: .523's unselected-hit preference was being applied even when multiple faces were deliberately selected.
- Limited that preference to exactly one selected face.
- With 2+ selected faces, pressing a selected face now preserves primary hit and therefore the full selected working set.
- Sequential Through ownership fix from .525 remains unchanged.

## 2026-09-27 â€” v0.36.18.525 bind sequential Through fallback to resolved Face gesture

- .524 screenshots proved B picking/workingFaces were correct but direct drag never began while geometry still mutated.
- Found sequential-through-fallback .385 still owned window-capture pointerdown and therefore saw stale Face A before multi-face-direct switched to B.
- It could then steal pointermove, mutate A and cancel the intended B drag.
- Removed stale window pointerdown arming.
- Fallback now subscribes to boxlab-face-direct-press and uses the resolved hit/workingFaces plus pointer coordinates from multi-face-direct.
- This preserves the special inward/Through fallback while making multi-face-direct authoritative for Face targeting.

## 2026-09-27 â€” v0.36.18.523 restore proven Face hit-stack targeting

- .522 still failed sequential Face A -> B extrusion.
- Current multi-face-direct was found to have lost the .495 overlap-selection rule even though main.js still exposes bridge.pickHits().
- Restored the exact proven behavior: if the nearest Face hit is already selected, prefer the first unselected Face in the ordered hit stack.
- Kept .519 provisional drag ownership and .522 native single-Face Extrude routing.
- No Through/Inset/other modelling changes.

## 2026-09-27 â€” v0.36.18.522 restore mature native single-Face Extrude

- .521 still failed hands-on, ruling out stale deployment and the restored .460-style legacy viewport yield as the primary Face failure.
- Compared the current direct Face geometry path with the .449 known-good behavior.
- Found current code routed ordinary one-Face Extrude through the connected multi-face miter solver instead of EditableMesh.extrudeFace().
- Restored native EditableMesh.extrudeFace() for exactly one selected Face; deliberate 2+ Face bands retain the connected solver.
- Through contact classification, topology gate, Inset, navigation and protected multi-object-transform are unchanged.

## 2026-09-27 â€” v0.36.18.521 cross-browser stale-shell refresh repair

- .520 deployed successfully on GitHub Pages but did not refresh on every browser.
- Found the HTML shell itself was still stamped .444 and release bootstrap/version scripts carried old cache keys.
- More importantly, the old release bootstrap stopped retrying once the URL already contained build=<latest>, even if the browser had served the stale shell again.
- Stamped the HTML shell and release scripts .521 and changed the bootstrap to retry stale-shell reloads with a fresh nonce, capped at three attempts per latest release.
- This release changes deployment/cache behavior only; BoxLab modelling runtime remains the .520 Face-owner build.

## 2026-09-27 â€” v0.36.18.520 restore proven Face direct-owner guard

- .519 failed hands-on, so stopped iterating on selection handoff.
- Audited repo history and found v0.36.18.460 had already solved a mature-direct-vs-legacy viewport ownership conflict with an explicit early return in main.js.
- Restored only that proven Face ownership guard: legacy main.js canvas pointerdown now yields whenever direct Extrude/Inset is visibly armed.
- This is a narrow, intentional exception to the frozen main.js .501 baseline; no selection bridge logic, topology solver, Through kernel, navigation, Rotate, Edge, Sweep or multi-object-transform behavior changed.
- Added a regression contract that the guard executes before legacy viewport drag state.

## 2026-09-27 â€” v0.36.18.519 provisional Face drag ownership

- Hands-on .518 showed the second unselected-face Extrude still inherited stale prior-Face behavior strongly enough to deform Face A and contaminate the edited mesh.
- Changed armed Face press ownership so an unselected hit Face becomes the provisional live selection immediately on pointerdown rather than waiting for the drag threshold.
- Tap semantics are preserved transactionally: restore the prior selection, then apply the existing native Face toggle.
- Drag semantics keep the provisional one-Face selection, so downstream handlers cannot observe the previous Face as the active working set.
- No topology solver, Through, Inset, navigation, Rotate, Edge, Sweep or protected multi-object-transform changes.

## 2026-09-27 â€” v0.36.18.518 Face Extrude / Repeat repair

- Fixed second armed Extrude on a different unselected Face by aligning the live Face selection with the actual drag working set before modelling begins.
- Added direct ordinary-Extrude commit value event so Repeat Previous captures the committed Extrude distance reliably.
- Left Inset, deliberate multi-face, armed tap-selection and Through behavior unchanged.

## 2026-09-27 â€” v0.36.18.517 Object / Tool Session defaults

- Prevented Objects drawer retain logic from reopening Objects while any Tool Session is active; this targets Array drawer flicker at the ownership source.
- New Revolve Profile starts with Edit Profile active and opens its Tool Session immediately.
- Boolean opens with Object Multi enabled through the authoritative Object Selection API.
- No Array geometry, Boolean solver or Revolve topology changes.

## 2026-09-27 â€” v0.36.18.516 Face armed-drag / Repeat repair

- Corrected armed Face drag semantics so a drag beginning on an unselected Face operates that Face only instead of inheriting the prior completed Face selection.
- Preserved deliberate multi-face operations: if the drag begins on a Face already in the selected set, the selected set is operated together.
- Added a direct-controller press event so precision-face can capture Extrude/Inset values even when the Face was not preselected.
- This reconnects Repeat Previous to valid armed Face workflows without changing Repeat's replay controller.
- Protected main selection bridge and Through topology path remain unchanged.

## 2026-09-27 â€” v0.36.18.515 Sweep activation/layout repair

- Diagnosed Sweep's first-press failure as a late Edge-toolbar ownership race.
- Shared Edge layout now owns both Sweep and Circle placement.
- Circle no longer independently relocates itself in Edge mode when pointerup fires.
- Sweep requests immediate shared layout settlement after its launch button is created.
- Sweep controls normalized to compact 31px / 10px sizing.
- Sweep topology/path behavior unchanged.
- PR #247 squash-merged as `450dd4e3b287005fdc8ace77eb792a95add2410a`; .515 and older .509 Sweep regressions passed in run #995.

## 2026-09-27 â€” v0.36.18.514 Edge Slide / Offset / Extrude polish

- Repositioned Edge Slide exact Slide % controls directly beneath the Edge Slide action row.
- Made Edge Slide and Offset Loop mutually exclusive through their existing direct-tool exclusivity event path.
- Reasserted Move + Plane on initial Edge Extrude arm after the click stack so Free cannot remain the visible/default state.
- Kept Sweep out of this build for separate investigation.
- PR #246 squash-merged as `8442af88cbddddc8829419e8da7d051d639c234e`; .514 plus existing .427/.475/.476 Edge regressions passed in run #992.

## 2026-09-27 â€” v0.36.18.513 Vertex Bevel + Merge to First

- Moved Vertex Bevel Exact % row/readout directly beneath the existing Width control.
- Fixed Merge to First semantics by tracking the actual local order vertices are selected, rather than relying on core's numerically sorted selection IDs.
- Kept the fix inside Vertex-owned modules; no main selection model or protected interaction runtime changed.
- Vertex Extrude noted for post-Beta-5 roadmap only.
- PR #245 squash-merged as `4f54930b2e4bfd982400a52219a9ba093bd65549`; .513, .474 and .341 Vertex regressions passed in run #990.

## 2026-09-27 â€” v0.36.18.512 load recovery from failed .511

- User reported .511 would not refresh/load in three browsers.
- Reverted tool-session-ui.js exactly to the confirmed-loading .510 runtime content.
- Cache-hopped the restored UI as .512.
- Removed the failed .511 Vertex polish regression.
- No modelling or interaction code changed from .510.

## 2026-09-27 â€” v0.36.18.511 Vertex cross-mode polish

- Normalised Vertex tool rows to the same compact 3-column spacing and button sizing used by Edge and Face.
- Preserved the established .341 deterministic Vertex tool order to avoid reintroducing historical button-jump regressions.
- Existing Vertex Slide and Vertex Bevel progressive disclosure remains unchanged.
- Presentation-only change; no modelling or selection logic changed.
- PR #243 squash-merged as `fe6df6b674064fd30473bd2c49c1254cadff63d4`; .511 and older .474 Vertex disclosure regressions passed in run #986.

## 2026-09-27 â€” v0.36.18.510 Edge Extrude Move/Plane cue

- Edge Extrude now automatically arms the real Move transform when the tool is activated.
- Initial Edge Extrude constraint defaults to Plane, giving the most useful free movement perpendicular to the grabbed edge.
- Defaulting occurs only on a fresh arm transition so later user-selected constraints persist across repeated ribbon pulls.
- No topology or extrusion solver changes.
- PR #242 squash-merged as `47a699bbd042e49cfaed58919dc9b26ead081216`; .510 and existing .427 Edge Extrude regressions passed in run #984.

## 2026-09-27 â€” v0.36.18.509 Sweep active-button polish

- Removed the Sweep-specific blue inset outline from active/pressed buttons.
- Sweep now matches the standard BoxLab white active-button appearance.
- Presentation-only change; no Sweep interaction or modelling logic changed.
- PR #241 squash-merged as `26df6e06cfc15bc2aad15b1edd3e4a7fa3bc1b68`; .509 visual regressions passed in run #982.

## 2026-09-27 â€” v0.36.18.508 Edge progressive disclosure

- Compacted Edge home into five dense 3-column rows without replacing button nodes or changing modelling handlers.
- Kept existing armed-only Loop, Bevel, Crease, Edge Slide and Offset Loop controls.
- Moved late-mounted Edge Extrude and Sweep launchers into the compact grid when available.
- Hid legacy section labels / duplicate crease presentation row after authoritative buttons move.
- Preserved Face .501, Rotate .483, Through, navigation and protected multi-object transform.
- PR #240 squash-merged as `013162607862c5e6028918d26f200a4f5ae2d241`; new .508 regressions and the relevant .476 Loop Slide contract passed in run #980 despite unrelated stale-suite failures.

## 2026-09-26 â€” v0.36.18.507 handoff reconciliation

- Reconciled AI_HANDOFF.md and TEST_CHECKLIST.md with actual current main after the final .507 layout refinement.
- Removed the superseded .507 note/checklist that still placed Orient Faces in the compact grid.
- No app/runtime code changed; current .507 remains Row 6 = Quad Cleanup / Quadify N-gons / blank, with Orient Faces in Repair.

## 2026-09-26 â€” v0.36.18.507 compact Face 3-column grid

- Repacked Face tools to match the user-marked six-row, three-column layout.
- Left Orient Faces in Repair rather than the modelling grid.
- Kept armed Value/readout/Repeat below Row 1 and diagnostics at the true bottom.
- Layout only; frozen .501 Face interaction unchanged.

## 2026-09-26 â€” v0.36.18.507 dense Face tool grid

- Reworked Face modelling controls into six compact 3-column rows following the user's markup.
- Kept armed Value/readout/Repeat beneath Row 1.
- Kept Inspect / Repair / Topology Gate as the final sections.
- Preserved all existing buttons, including Orient Faces in the spare lower-right slot.
- Layout only; .501 Face interaction unchanged.

## 2026-09-26 â€” v0.36.18.506 force Face diagnostics to true bottom

- Fixed .505 ordering bug where late Face tools could remain below Inspect / Repair / Topology Gate.
- Face layout sync now appends Inspect, Repair, and Topology Gate as the final three drawer children in that order.
- Compact modelling rows and frozen .501 interaction unchanged.

## 2026-09-26 â€” v0.36.18.505 compact Face modelling block

- Rearranged Face tools into three compact rows to reduce vertical drawer usage.
- Kept armed Value/readout/Repeat directly beneath Extrude/Inset/Knife.
- Moved Inspect, Repair and Topology Gate below the entire modelling block.
- Updated Join Coplanar placement to respect the compact row.
- Layout only; frozen .501 Face interaction unchanged.

## 2026-09-26 â€” v0.36.18.504 Face drawer hierarchy repair

- Replaced positional Face-row anchoring with explicit ID-based ordering.
- Extrude/Inset/Knife row is restored directly below Face title.
- Value/readout/Repeat remain directly below that row when armed.
- Inspect and Repair are moved back down directly above Topology Gate.
- Presentation/layout only; frozen .501 Face interaction untouched.

## 2026-09-26 â€” v0.36.18.503 Face disclosure control order

- Moved Face Value/readout/Repeat Previous directly below the primary Extrude/Inset/Knife row.
- Kept .502 armed-only visibility for Extrude and Inset.
- Presentation/layout only; no Face interaction changes.

## 2026-09-26 â€” v0.36.18.502 Face progressive disclosure: exact controls

- Started Face progressive disclosure from frozen .501 interaction baseline.
- Hidden Face exact-value row/readout and Repeat Previous at rest.
- These controls now appear only while Extrude or Inset is active.
- CSS/presentation only; no Face handlers or modelling logic changed.

## 2026-09-26 â€” v0.36.18.501 freeze single-owner armed Face selection

- User confirmed .500 armed Extrude/Inset Face selection works perfectly.
- Removed temporary FaceOwner trace and read-only legacy directTool diagnostic bridge.
- Retained .499 single-owner fix: persistent-face-tool-select yields while multi-face-direct is armed.
- Clean baseline for Face progressive disclosure.

## 2026-09-26 â€” v0.36.18.499 single-owner armed Face selection

- Identified the true flash cause: legacy persistent-face-tool-select added the face on window capture before multi-face-direct handled the same gesture and toggled it back off on pointerup.
- Legacy helper now yields whenever the recovered direct Face owner is armed.
- Restored native visible Face picker + native toggle inside multi-face-direct; removed projected/deeper-hit experiments.

## 2026-09-26 â€” v0.36.18.498 projected visible Face picker

- .497 removed accidental through-selection but armed Face selection remained unusable.
- Added projected polygon picking for armed Extrude/Inset: camera-facing polygons only, Pencil point containment, nearest eligible depth.
- No rear-face fallback. Native tap toggle and existing modelling drag path retained.

## 2026-09-26 â€” v0.36.18.497 restore visible-only armed Face picking

- Removed .495 selected-aware deeper-hit fallback after hands-on showed it caused through-selection and two-face Extrude while Visible selection was active.
- Armed Extrude/Inset now use only the nearest native Face hit.
- Native tap toggle remains; temporary diagnostics and .496 Deselect workaround removed.

## 2026-09-26 â€” v0.36.18.496 preserve armed Face tool across Deselect

- .495 fixed additive armed Face selection.
- Added a narrow recovery for Selection > Deselect while Extrude/Inset is armed.
- After main.js clears selection, multi-face-direct resynchronizes its armed button/status state so a new Face selection can be started without re-arming.
- .495 hit-stack selection logic unchanged.

## 2026-09-26 â€” v0.36.18.495 selected-aware Face hit-stack resolution

- .494 proved the additive tap ray was hitting selected face 1 first and unselected face 4 second.
- Armed Extrude/Inset now prefer the first unselected Face in the ordered hit stack when the primary hit is already selected.
- If no unselected overlapping Face exists, the selected primary remains available for tap-to-deselect.
- Ordinary Face selection behavior is unchanged.

## 2026-09-26 â€” v0.36.18.494 Face hit-stack diagnostic

- .493 proved the tap was hitting selected face 3 and then correctly toggling it off.
- Added ordered native Face raycast hit-stack diagnostics with per-hit distance.
- No modelling or selection behavior change.

## 2026-09-26 â€” v0.36.18.493 persistent Face tap trace

- .492 screenshot showed final RAF selection empty after a valid face hit.
- Changed diagnostic output to retain every stage on one line so immediate commit vs later overwrite can be distinguished.
- No modelling or selection behavior change.

## 2026-09-26 â€” v0.36.18.492 Face tap staged diagnostic

- .491 still failed additive armed Face selection while deselection worked.
- Added visible status-bar diagnostic for before/immediate/microtask/RAF selection state around native toggle.
- No selection or topology behavior intentionally changed.

## 2026-09-26 â€” v0.36.18.491 native Face toggle bridge

- .490 still allowed deselection but not additive selection while Extrude/Inset stayed armed.
- Exposed main.js native `toggleSelection` through the selection bridge.
- Armed Face taps now use native picker + native toggle end-to-end instead of rebuilding selection arrays in multi-face-direct.
- Drag/modelling path remains unchanged.

## 2026-09-26 â€” v0.36.18.490 Face tap-before-model split

- .489 still allowed deselection but not additive selection with a no-action tap.
- Deferred Extrude/Inset region construction until after the 8 px drag threshold.
- Pointerdown now stores only the native Face hit + selection snapshot.
- Pointerup before threshold toggles selection directly, independent of modelling-region validity.
- Drag after threshold promotes into the existing direct modelling path.

## 2026-09-26 â€” v0.36.18.489 native Face picker bridge

- Exposed main.js native `pickKind` read-only via `__boxlabSelectionBridge.pick(type,event)`.
- Armed Extrude/Inset now use that exact picker directly for both selected and unselected faces.
- Removed previous duplicate scene-raycast / native-handoff experiments and stale pending handoff state.
- main.js native behavior remains unchanged apart from the new bridge method.

## 2026-09-26 â€” v0.36.18.488 native Face picker handoff

- .487 still failed despite raycasting live scene face meshes.
- Reframed ownership around the actual native picker: main.js pickKind('face') now handles unselected-face taps while Extrude/Inset remains armed.
- Selected-face presses remain owned by multi-face-direct for deselection and modelling drag.
- Unselected native taps can promote into direct modelling only after the drag threshold is crossed.
- Removed duplicate armed Face picker logic.

## 2026-09-26 â€” v0.36.18.487 live scene Face picker

- .486 still failed because it looked for a non-existent bridge `faceObjects` collection.
- Audited main renderer and confirmed normal Face pickers are live scene objects tagged `userData.kind='face'`.
- Armed Extrude/Inset now raycast those exact scene Face picker meshes.
- Existing tap-toggle logic and direct-tool ownership are unchanged.

## 2026-09-26 â€” v0.36.18.486 armed Face picker ownership repair

- .485 still flashed/dropped newly tapped faces during armed Extrude/Inset.
- Replaced the direct tool's temporary mesh raycast with the same live viewport faceObjects picker used by normal Face selection.
- Added explicit armed Face direct ownership state and made edge-paint-select yield while that owner is active.
- No topology or disclosure changes.

## 2026-09-26 â€” v0.36.18.485 armed Face full selection ownership

- .484 fixed tap-to-deselect but additive selection of unselected faces still flashed/dropped while Extrude/Inset stayed armed.
- Consolidated armed Face tap/drag ownership into multi-face-direct instead of splitting unselected-face selection through edge-paint-select.
- Armed taps now toggle faces both directions; drags operate on the resulting working selection.
- No disclosure or topology changes.

## 2026-09-26 â€” v0.36.18.484 armed Extrude / Inset tap-toggle selection

- Added tap-to-deselect for already-selected faces while Extrude or Inset remains armed.
- The existing drag threshold still separates selection taps from modelling drags.
- Dragging a selected face continues to run Extrude/Inset unchanged.
- Additive selection of other faces remains intact; no progressive-disclosure changes yet.

## 2026-09-26 â€” v0.36.18.483 unified component Rotate owner

- Hands-on .482 showed Face Rotate working only through dedicated rotate-transform; Vertex/Edge remained broken and precision controls were ignored.
- Extended the working dedicated Rotate owner to Vertex, Edge and Face using authoritative selection bridge IDs.
- Wired world-axis X/Y/Z constraints and existing 15Â° snap button into that owner.
- Shared transform now yields component Rotate to prevent dual ownership.
- Move/Scale and protected main runtime remain unchanged.

## 2026-09-26 â€” v0.36.18.482 component Rotate start-gate repair

- .481 still failed for all component Rotate modes.
- Removed Rotate's dependency on `hitSelectedIndex`; an existing Vertex / Edge / Face selection plus armed Rotate is now sufficient to begin the transform from a viewport Pencil drag.
- Move/Scale retain their existing hit-test behavior.
- No Rotate maths or protected core runtime changed.

## 2026-09-26 â€” v0.36.18.481 shared transform pointermove capture repair

- .480 still failed for all component Rotate modes.
- Found ownership split inside transform-upgrade: pointerdown used document capture, pointermove used canvas capture behind the Pencil orbit gate.
- Moved shared transform pointermove to document capture so an active Rotate drag cannot be intercepted mid-gesture.
- No transform maths or protected core runtime changed.

## 2026-09-26 â€” v0.36.18.480 shared component Rotate repair

- Hands-on established Vertex, Edge and Face Rotate all fail, so .479 Face-only ownership diagnosis was incomplete.
- Shared transform owner now reads authoritative `__boxlabTransformArming.tool()` before DOM active-class fallback.
- Removed the .479 Face-only yield so Vertex / Edge / Face Rotate share one transform path again.
- Rotate maths, protected main runtime and Pencil navigation remain unchanged.

## 2026-09-26 â€” v0.36.18.479 Face Rotate ownership repair

- Isolated Face Rotate after .477 cache hop did not restore hands-on behavior.
- Found two rotate owners plus stale face-selection lookup in dedicated rotate-transform.
- Generic transform-upgrade now yields Face Rotate only.
- Dedicated rotate-transform now uses authoritative selection bridge IDs for Face selection and transform-arming state for Rotate.
- Move/Scale and non-Face Rotate paths remain unchanged; protected main runtime untouched.

## 2026-09-26 â€” v0.36.18.478 single-click Loop / Bevel handoff

- Hands-on .477: Loop disarmed when Bevel was tapped, but Bevel required a second tap to arm.
- Moved Loopâ†”Bevel exclusivity from pointerdown to click-capture so the same click can disarm the old tool and continue into the new tool handler.
- No Bevel, Loop topology, selection, or transform code changed.

## 2026-09-26 â€” v0.36.18.477 Edge exclusivity + Face Rotate cache repair

- Made Loop Cut and Edge Bevel mutually exclusive using their existing toggle paths.
- Audited Face Rotate against .449: transform source and ownership files are byte-identical to the known-good baseline.
- Found current loader using stale `.444` transform-upgrade cache key instead of the later proven runtime key.
- Cache-hopped unchanged `transform-upgrade.js` to .477 so iPad/Safari receives the current source.
- No rotate algorithm or protected transform core changed.

## 2026-09-26 â€” v0.36.18.476 Edge progressive-disclosure polish

- User requested layout refinements after .475 hands-on.
- Moved Loop Slide directly below Loops.
- Moved Edge Bevel Exact % + readout directly below Segments.
- Moved Offset Loop Support Spacing above Exact Offset % + readout.
- Added narrow Crease handoff coordination so selecting another Edge/transform tool or leaving Edge mode disarms Crease through its existing control path.
- Crease Strength remains visible only while Crease is actually active.
- Protected main modelling runtime remains unchanged.

## 2026-09-26 â€” v0.36.18.475 Edge progressive disclosure

- User hands-on passed .474 Vertex progressive disclosure.
- Continued the Tool-first rebuild with Edge mode only.
- Loop count/slide, Bevel width/segments/exact, Crease strength, Edge Slide exact and Offset Loop exact/support controls are now hidden at rest and shown only while their owning tool is active.
- No Edge tool handlers, selection ownership, topology solvers or transform ownership changed.
- Cache-hopped only `tool-session-ui.js`.

## 2026-09-26 â€” v0.36.18.474 Vertex progressive disclosure

- Resumed the post-.449 Tool-first UI rebuild with Vertex mode only.
- Reintroduced only the proven .450 CSS visibility rules for Vertex Slide and Vertex Bevel settings.
- Slide % / readout are hidden until Slide is active.
- Bevel Width / Exact % / readout are hidden until Bevel is active.
- No tool handlers, selection ownership, transform ownership or topology code changed.
- Cache-hopped only `tool-session-ui.js`.

## 2026-09-26 â€” v0.36.18.473 true Bisect Only

- Added an explicit **Bisect Only** action to the existing Symmetry/Bisect Tool Session.
- Unlike the old non-mirrored keep-half path, the new operation keeps both sides and only inserts the plane cut into crossed faces.
- Added `splitMeshByPlane()` to the symmetry core, reusing the current arbitrary movable/rotatable plane definition.
- Split faces inherit their source facegroup; crease edges are remapped through cut intersections where possible.
- Existing Symmetry Apply path remains unchanged; old â€œBisect onlyâ€ wording for keep-half mode is corrected to â€œKeep halfâ€.

## 2026-09-26 â€” v0.36.18.472 Sweep transaction declaration + Edge Bevel UI placement

- .471 removed Edge Revolve correctly, but Add > Sweep remained inert.
- Found the real .469 regression: `sweepBeforeScene`, `sweepUndoDepth` and `sweepRedoDepth` were assigned without declarations in an ES module, causing Add > Sweep to throw before object creation.
- Declared those three transaction variables in the Sweep runtime state block; .471 mode-change cancellation guard remains intact.
- Moved Edge Bevel Exact % from the bottom of Edge Active Tools to immediately before the Slide % / Offset % precision controls.
- Cache-hopped `precision-bevel.js`, `drawer-ui.js` and `sweep-path.js` only as required.

## 2026-09-26 â€” v0.36.18.471 Sweep Add recovery + Edge Revolve removal

- Hands-on .470 confirmed Edge Revolve works; removed its controls from the normal Edge Active Tools surface because it requires difficult-to-discover loose-edge profiles.
- Fixed Add > Sweep immediately disappearing after creation.
- Root cause was .469's queued mode-change cancellation observing the just-created Sweep after Sweep's own Add flow entered Object mode.
- Mode-change cancellation now only acts when a Sweep already existed when the mode click began, preserving later user escape/cancel behavior.
- Sweep construction/profile/path geometry code is unchanged.
- Cache-hopped only `revolve.js` and `sweep-path.js` to .471.

## 2026-09-26 â€” v0.36.18.470 Edge Revolve progressive disclosure

- Continued the post-.449 UI cleanup as one isolated Edge-mode presentation slice.
- Restored only the previously proven historical .457 Revolve visibility pattern: at rest Edge Active Tools shows one Revolve launcher; Lathe/Revolve label, axis buttons and Segments appear only after a valid Revolve is armed.
- Apply, Cancel/mode escape and active-object escape return Revolve to the compact resting state.
- Revolve core geometry, preview, history, selection and Pencil range behavior are unchanged.
- Audit also found PR #199 (.469) regression run failed with 57 stale contract tests, mostly old current-version/pin assumptions and recovery-era assertions. No broad runtime repinning was introduced to satisfy them.

## 2026-09-26 â€” v0.36.18.469 Revolve Profile + Sweep session recovery

- Restored the known-good historical Revolve Profile controller from .453 because the recovered .443 file lacked the later Add/Cancel transaction path.
- Added true transactional Sweep cancellation with scene/history rollback.
- Sweep now exposes Cancel Sweep at every stage and cancels cleanly when leaving the workflow or opening another Tool Session.
- Kept the protected Face/Bevel/Inset/Through interaction runtime untouched.

## 2026-09-26 â€” v0.36.18.468 Object-mode Tool-first UI cleanup

- Resumed the UI/UX cleanup from the proven .467 runtime instead of replaying the old broad rewrite.
- Restored authoritative hidden-state CSS for Tool Session shells.
- Wrapped the existing Boolean controls behind one launcher using the Tool Session host.
- No direct modelling, pointer/selection ownership, topology or index cache rewiring changes.
- This is the first presentation-only rebuild slice toward the previously approved clean UI.

## 2026-09-26 â€” v0.36.18.467 Viewport scroll recovery

- .466 passed hands-on; Facegroup recovery considered complete.
- Restored only the functional part of historical .449: Viewport panel max-height + vertical scrolling for iPad.
- Deliberately skipped historical index/module cache-version churn.
- Next: resume UI cleanup in small isolated slices.

## 2026-09-26 â€” v0.36.18.466 Shell-only facegroup propagation

- .465 passed hands-on with Solidify Facegroups restored and Shell still healthy.
- Reintroduced metadata only in `shell-core.js`.
- Shell compact/clone paths keep surviving facegroups aligned with faces; opening-face groups are removed with those faces.
- Solidify remains untouched and supplies the already-proven inner-face inheritance / Ungrouped side-wall behavior.

## 2026-09-26 â€” v0.36.18.465 Solidify-only facegroup propagation

- .464 recovery passed hands-on: Shell restored, Solidify healthy.
- Reintroduced facegroup metadata only in `solidify-core.js`; Shell left untouched.
- Source and inner Solidify faces share the parent group; generated side walls are Ungrouped.
- Rollback restores faceGroups with other mesh state.

## 2026-09-26 â€” v0.36.18.464 Shell/Solidify recovery

- User found Shell broken after .462.
- Restored `solidify-core.js` and `shell-core.js` exactly to the confirmed-working .461 state rather than layering another speculative fix.
- Retained the successful Extract Faces and Object Join facegroup preservation work.
- Solidify/Shell facegroup propagation is deferred for separate reintroduction after functional recovery is hands-on confirmed.

# BoxLab Development History

## 2026-09-26 â€” v0.36.18.463 Object Join facegroup preservation

- v0.36.18.462 Extract/Solidify/Shell propagation passed hands-on testing.
- `combineEditableMeshes()` now carries `faceGroups[]` in lockstep with appended faces.
- Joined source objects preserve their existing group IDs and colours in the combined editable mesh.
- No Boolean or interaction behavior changed.

## 2026-09-26 â€” v0.36.18.462 Extract / Solidify / Shell facegroup propagation

- v0.36.18.461 Mesh Health facegroup preservation passed hands-on testing.
- Extract Faces now carries selected facegroup IDs into the new object and preserves remaining source groups.
- Solidify copies source groups to inner duplicate faces and marks new side-wall faces Ungrouped.
- Shell's compact/restore path now preserves groups and inherits Solidify semantics.
- No modelling interaction changes.

## 2026-09-26 â€” v0.36.18.461 Mesh Health facegroup preservation recovery

- v0.36.18.460 SubD facegroup propagation passed hands-on testing.
- Restored facegroup metadata preservation through Safe Repair, Auto Close, Unify Winding, Flip Normals and Triangulate.
- Safe Repair filters `faceGroups[]` in lockstep with removed faces.
- Auto Close caps are deliberately ungrouped while existing faces retain their groups.
- Triangulated child faces inherit the source polygon's facegroup.
- No modelling interaction changes.

## 2026-09-26 â€” v0.36.18.460 SubD facegroup propagation recovery

- v0.36.18.459 Mirror propagation passed hands-on testing.
- Restored facegroup inheritance through Catmull-Clark subdivision only.
- Each generated child quad inherits its parent facegroup ID.
- Facegroups viewport evaluation now applies SubD before Mirror, matching BoxLab's display/evaluation order.
- No modelling interaction/tool-ownership changes.

## 2026-09-26 â€” v0.36.18.459 Mirror facegroup propagation recovery

- v0.36.18.458 first-activation pending-state repair passed hands-on testing.
- Restored facegroup inheritance through non-destructive Mirror only.
- Mirrored descendant faces inherit the source face's facegroup ID.
- Facegroups Render Look evaluates current Mirror settings before applying viewport colours.
- SubD propagation remains deferred for separate isolation.

## 2026-09-26 â€” v0.36.18.458 Facegroups pending-state first-activation repair

- .457 historical two-frame retry did not resolve the recovered-runtime first-activation dark view.
- Replaced fixed-delay logic with a bounded pending-state retry tied to newly created viewport bodies and scene bodies.
- Failed colour generation keeps normal material rather than applying invalid vertex colours; retries stop as soon as colour generation succeeds.
- No modelling/topology or OBJ semantics changed.

## 2026-09-26 â€” v0.36.18.457 Facegroups first-activation recovery

- Restored the historical fix for the dark first Facegroups activation.
- Facegroup material is now assigned only when colour generation succeeds.
- Failed first pass falls back to the normal front material instead of a dark invalid vertex-colour state.
- Entering Facegroups normalises settings, rebuilds the viewport, waits for two animation frames, then reapplies colours.
- No topology, OBJ data or modelling interaction changes.

## 2026-09-26 â€” v0.36.18.456 Facegroup data connection + split import recovery

- .455 passed hands-on, but a known facegrouped OBJ still displayed no Facegroups colours.
- Root cause: render-mode source lookup expected mesh metadata on the Three.js body, while authoritative editable mesh data lives in the active bridge mesh / object manager.
- Restored active/inactive mesh lookup without rewriting render runtime.
- Restored File > Import > **Split objects by groups** checkbox, OFF by default, and wired it to the already recovered OBJ parser.
- No Mirror/SubD facegroup propagation or modelling topology changes in this build.

## 2026-09-26 â€” v0.36.18.455 Facegroup colour controls recovery

- v0.36.18.454 additive Facegroups viewport integration passed hands-on testing.
- Reintroduced the original visual-only Facegroup palette controls in isolation: Default/Soft/Vivid/Contrast, saturation, lightness, ungrouped colour, reseed and reset.
- Settings persist in localStorage and do not change facegroup IDs, topology or OBJ data.
- Kept the .453/.454 render and modelling paths intact; no SubD/Mirror evaluation machinery added.
- Regression boundary remains: .452 rejected because its render integration replaced proven runtime code and failed to load.

## 2026-09-25 â€” replay v0.36.18.442 from Beta 4 audit lane

- Reapplied the original Mesh Health boundary diagnostics build exactly.
- Historical source commit: `cd3bc0ad6b5da3298b1b3e9d408e49c03c2f4a71`.
- No .443+ changes included.
- Inset was hands-on confirmed working on .441 before this replay.
- Awaiting hands-on Inset and boundary diagnostics selection handoff result on .442.

## 2026-09-25 â€” replay v0.36.18.441 from Beta 4 audit lane

- Reapplied the original Mesh Health Auto Close / Make Watertight build exactly.
- Historical source commit: `d4e964e3741d7e53ac0176c1a811b05ea3edb727`.
- No .442+ changes included.
- Inset was hands-on confirmed working on .440 before this replay.
- Awaiting hands-on Inset and Auto Close result on .441.

## 2026-09-25 â€” replay v0.36.18.440 from Beta 4 audit lane

- Reapplied the original Mesh Health Safe Repair build exactly.
- Historical source commit: `73e6958874de73d8e553f0bb2ad73cd31c503004`.
- No .441+ changes included.
- Inset was hands-on confirmed working on .439 before this replay.
- Awaiting hands-on Inset and Safe Repair result on .440.

## 2026-09-25 â€” replay v0.36.18.439 from Beta 4 audit lane

- Reapplied the original Mesh Health / Inspect foundation exactly.
- Historical source commit: `60187e2f17c444c319c6862a80e3a107588dc9cb`.
- No .440+ changes included.
- Inset was hands-on confirmed working on .438 before this replay.
- Awaiting hands-on Inset and Mesh Health inspection result on .439.

## 2026-09-25 â€” replay v0.36.18.438 from Beta 4 audit lane

- Reapplied the original linked-instance Insert Tool exactly.
- Historical source commit: `3483edd3b8809b38fca738ed8e6f3085bb2e26f6`.
- No .439+ changes included.
- Inset was hands-on confirmed working on .437 before this replay.
- Awaiting hands-on Inset and Insert Tool result on .438.

## 2026-09-25 â€” replay v0.36.18.437 from Beta 4 audit lane

- Reapplied the original face-to-face Surface Transform anchoring build exactly.
- Historical source commit: `5a6ef4338c2997b5e65dbf59f77bc129d7e152cd`.
- No .438+ changes included.
- Inset was hands-on confirmed working on .436 before this replay.
- Awaiting hands-on Inset and face-to-face Transform result on .437.

## 2026-09-25 â€” replay v0.36.18.436 from Beta 4 audit lane

- Reapplied the original Surface Transform Tool foundation exactly.
- Historical source commit: `db817eb623ebc52ff2d7b6e344f2911873ead8d6`.
- No .437+ changes included.
- Inset was hands-on confirmed working on .435 before this replay.
- Awaiting hands-on Inset and Surface Transform result on .436.

## 2026-09-25 â€” replay v0.36.18.435 from Beta 4 audit lane

- Reapplied the original Symmetry Align to Face + Flip Plane build exactly.
- Historical source commit: `6bf2b5a5308d639c0e03f7cd2862695d10624591`.
- No .436+ changes included.
- Inset was hands-on confirmed working on .434 before this replay.
- Awaiting hands-on Inset and Align to Face / Flip Plane result on .435.

## 2026-09-25 â€” replay v0.36.18.434 from Beta 4 audit lane

- Reapplied the original Symmetry plane transform ownership + arbitrary rotation build exactly.
- Historical source commit: `6cb0a5aca9d2d69dbed23511ef617d381a1871c6`.
- No .435+ changes included.
- Inset was hands-on confirmed working on .433 before this replay.
- Awaiting hands-on Inset and Symmetry Rotate ownership result on .434.

## 2026-09-25 â€” replay v0.36.18.433 from Beta 4 audit lane

- Reapplied the original movable/snappable Symmetry/Bisect plane exactly.
- Historical source commit: `ff9be6110c7e34b79fac08e82589b3bd40b66237`.
- No .434+ changes included.
- Inset was hands-on confirmed working on .432 before this replay.
- Awaiting hands-on Inset and movable/snappable plane result on .433.

## 2026-09-25 â€” replay v0.36.18.432 from Beta 4 audit lane

- Reapplied the original Face Delete orphan-compaction fix exactly.
- Historical source commit: `31e2c4d0c727f1910543d10d723a4fcedda72e77`.
- No .433+ changes included.
- Inset was hands-on confirmed working on .431 before this replay.
- Awaiting hands-on Inset result on .432.

## 2026-09-25 â€” replay v0.36.18.431 from Beta 4 audit lane

- Reapplied the original Mirror-seam-aware Solidify fix exactly.
- Historical source commit: `b3b63b00c505827f74a00175e2d18770a1aeeb55`.
- No .432+ changes included.
- Inset was hands-on confirmed working on .430 before this replay.
- Awaiting hands-on Inset result on .431.

## 2026-09-25 â€” replay v0.36.18.430 from Beta 4 audit lane

- Reapplied the original Mirror-preserving Solidify fix exactly.
- Historical source commit: `4a393fa0021d196c9921cf978fd029f109035ce9`.
- No .431+ changes included.
- Inset was hands-on confirmed working on .429 before this replay.
- Awaiting hands-on Inset result on .430.

## 2026-09-25 â€” replay v0.36.18.429 from Beta 4 audit lane

- Reapplied the original mirrored-object Solidify fix exactly.
- Historical source commit: `70831c5a24d975417c81adb16d6e56a76d4191cc`.
- No .430+ changes included.
- Inset was hands-on confirmed working on .428 before this replay.
- Awaiting hands-on Inset result on .429.

## 2026-09-25 â€” replay v0.36.18.428 from Beta 4 audit lane

- Reapplied the original .428 Symmetry / Bisect foundation exactly.
- Historical source commit: `72a30c2f5799d048235684e326da8fdf3a71fa2c`.
- No .429+ changes included.
- Inset was hands-on confirmed working immediately before this replay on .427.
- Awaiting hands-on Inset result on .428 before continuing.

## 2026-09-25 â€” Beta 4 forward replay audit begins

- Reset active runtime/tests exactly to frozen v0.36.18.427 for hands-on Inset verification.
- This is a forensic replay lane: .428 through .449 will be reapplied in original order, one numbered build at a time.
- Inset is the sentinel regression check after every replay step.
- No post-Beta-4 feature is being discarded; original commits remain the source for replay, including Mesh Health and later export/facegroup work.
- Frozen /beta-4/ remains unchanged.

## 2026-09-25 â€” deliberate recovery to v0.36.18.449 baseline

- User chose to stop patching the interaction regressions introduced after the large v0.36.18.450 UI/UX consolidation.
- Restored every runtime and regression-test file to the exact v0.36.18.449 main snapshot at `4d700dc26e8a23a65a4fba27bcca259062c5be07`.
- Preserved current handoff/history/roadmap/checklist documents so the .450â€“.465 investigation remains available.
- Removed post-.449 runtime wrappers and post-.449 recovery-only tests from the active baseline.
- Git history remains forward-moving; no force-reset of main.
- Released via PR **#154**; squash merge `83fd257442d21d7db64385c0084d1cb314fae017`.
- Recovery Topology regression **36112631181 PASS**.
- Future UI cleanup must be reintroduced as small, independently hands-on-tested slices from this baseline.

## 2026-09-25 â€” v0.36.18.465 live Inset Face Region API repair

- Hands-on .464: Extrude and Extrude Through pass; Inset fails.
- Found the remaining ES-module split: live Uniform Inset methods existed, but their Face Region dependencies did not exist on the live `mesh.js?v=0.12` class.
- Copied `faceRegionInfo`, `faceRegionNormal`, and `faceRegionsInfo` onto the live EditableMesh prototype before installing Uniform Inset methods.
- Avoided rerunning the full Face Region installer to prevent duplicate legacy UI/event handlers.
- No changes to Extrude, Through, Through kernel, Bevel, or protected multi-object transform code.
- Released via PR **#153**; squash merge `d7b32672f1757dfbef80f5eb5f364ed1dcfc41ea`.
- Final Topology regression run **36105980083 PASS**.


## 2026-09-25 â€” v0.36.18.464 public version + explicit Through runtime

- Production shell and `version.json` now genuinely advance from .461 to .464.
- Live runtime cache keys were aligned so Safari/GitHub Pages does not mix .461/.463/.464 modules.
- Inward Extrude/Through takeover is now an explicit main runtime module as well as remaining available from the Drawer dynamic import.
- Protected `through-kernel.js?v=0.36.18.242`, `multi-face-direct.js?v=0.36.18.242`, and `multi-object-transform.js?v=0.36.1.0` remain unchanged.
- Released via PR **#152**; squash merge `f7a092b82addc517a53ec1990324fdb0b66a00e3`.
- Final Topology regression run **36094996497 PASS**.


## 2026-09-25 â€” v0.36.18.464 public version sync + explicit Through runtime

- User reported only v0.36.18.461 was visibly loading, despite later hotfix merges.
- User also confirmed ordinary Extrude worked but Extrude Through did not.
- Advanced the actual public shell and version manifest to v0.36.18.464.
- Standardised current live runtime cache keys to .464 while retaining protected historical pins.
- Loaded `sequential-through-fallback.js` explicitly in the main runtime, with its dynamic drawer import aligned to the same URL.
- Protected `through-kernel.js?v=0.36.18.242` and `multi-face-direct.js?v=0.36.18.242` remain unchanged.
- Final Topology regression **36094996497 PASS**.
- PR **#152**, squash merge `f7a092b82addc517a53ec1990324fdb0b66a00e3`.


## 2026-09-25 â€” v0.36.18.463 live Uniform Inset prototype repair

- Extrude confirmed working again; Inset remained inert.
- Found ES-module identity mismatch: `uniform-inset.js` patched `./mesh.js`, but live BoxLab uses `./mesh.js?v=0.12`.
- Installed all Uniform Inset methods on the live versioned EditableMesh prototype too.
- Loaded the repaired Uniform Inset module before the proven Face direct controller.
- No changes to Extrude, Through, pointer ownership, Bevel, or protected transform code.
- Released via PR **#151**; squash merge `d8af8ac6c140c15ea83122baa16164d1905b0c88`.
- Final PR Topology regression run **36086343100 PASS**.


## 2026-09-25 â€” v0.36.18.462 restore proven Face direct path

- User confirmed .461 broke Extrude as well as Inset.
- Restored the proven `multi-face-direct.js?v=0.36.18.242` controller.
- Removed the .461 Face self-pick experiment.
- Allowed normal Face paint selection while Extrude/Inset are armed so selection can occur first, then the proven controller owns the drag.
- Legacy Move remains blocked under Face direct tools.
- No Through topology rewrite and no Bevel changes in this build.
- Released as a targeted v0.36.18.461 hotfix via PR **#150**; squash merge `5408b084e4f0fd5e953ab8483e7cce29fd1068b4`.
- Final PR Topology regression run **36073060381 PASS**.


## 2026-09-25 â€” v0.36.18.461 direct tools own pick + drag

- .460 proved legacy Move was no longer stealing the gesture, but Inset and Bevel still received no modelling drag.
- Corrected the architecture: the armed tool itself now owns component hit-test plus modelling drag.
- Face direct tools can acquire an unselected face and begin Inset/Extrude on the same Pencil press.
- Component paint yields to armed Face direct tools and Edge Bevel.
- Removed the .460 coordination shim from the live runtime.
- No Through solver or Bevel topology rewrite.
- Released via PR **#149**; squash merge `a3c1fa4200da58dd01a1f54b337ae32053a3e341`.
- Final PR Topology regression run **36068948326 PASS**.


## 2026-09-25 â€” v0.36.18.460 direct-tool ownership repair

- Inset: arming the tool could leave hidden component selection unavailable, while legacy `main.js` Move remained a fallback owner.
- Edge Bevel: additive hidden Multi could hand the mature controller an invalid stale edge set.
- Preserved the mature Face and Bevel controllers unchanged.
- Added a small ownership coordinator and made legacy component drag yield to mature direct tools.
- No topology, Through, navigation or UI layout changes.
- Released via PR **#148**; squash merge `d66425309248f220968cf11d86a0d6d8bc7ee9e0`.
- Final PR Topology regression run **36067498993 PASS**.


## 2026-09-25 â€” v0.36.18.459 armed-tool component selection

- Navigation and ordinary selection remained good, but arming Inset prevented a face from being highlighted.
- Found the regression in .457: `edge-paint-select.js` returned early whenever a direct tool was active.
- Restored .449-style component selection while tools are armed, while keeping touch reserved for viewport navigation.
- Removed the experimental .458 persistent Face handoff loader.
- No topology or UI layout changes.
- Released via PR **#147**; squash merge `6ca71fc6142060498a46e73acac0b9b7d7a9a044`.
- Final PR Topology regression run **36065555151 PASS**.


## 2026-09-25 â€” v0.36.18.458 armed Face selection handoff

- User confirmed orbit/pan/zoom and ordinary selection work; Inset fails because a face cannot be highlighted after arming the tool.
- Found `persistent-face-tool-select.js` present but omitted from the live loader.
- Restored it immediately before `multi-face-direct.js`, re-enabling tool-first face selection for Extrude/Inset.
- No UI, topology or navigation changes.


## 2026-09-24 â€” v0.36.18.457 viewport pointer ownership repair

- User confirmed the UI itself is good but all viewport interaction is dead.
- Identified shared component Multi paint selection as capable of capturing the first touch pointer before OrbitControls/direct tools.
- Reserved finger touch for viewport navigation and made component paint yield to armed direct tools.
- Kept current UI/UX intact.
- Hid Edge Lathe/Revolve settings until Revolve is actually armed; compact Revolve launcher remains visible.
- No topology changes.
- Released via PR **#145**; squash merge `b4ce2101bc749193a4f03934889efbf8500ceb5f`.
- Final PR Topology regression run **35998556661 PASS**.


## 2026-09-24 â€” v0.36.18.456 UI-preserved tool runtime repair

- User clarified the redesigned UI is correct; only the modelling tools underneath it regressed.
- Abandoned the proposed UI rollback before merge.
- Preserved the complete .455 presentation layer.
- Restored pre-reorder transform and component-selection ownership runtimes.
- Restored transactional Boolean pre-scene snapshot for one-step Undo.
- No modelling topology or UI layout changes.
- Released via PR **#144**; squash merge `6e93491e841991631fc09b79cf0c9f7d53faa9e7`.
- Final PR Topology regression run **35996984651 PASS**.


## 2026-09-24 â€” v0.36.18.455 Object Multi + Boolean presentation recovery

- User clarified Boolean itself works; the broken part is the operand-selection and Active Tools presentation.
- Preserved the .454 interaction-ownership recovery.
- Restored the established compact five-button Object Selection toolbar.
- Restored only the narrow Boolean launcher/close presentation wrapper.
- Broad .451 component presentation wrapper remains disabled.
- No modelling algorithm changes.
- Released via PR **#143**; squash merge `3ec6d638b08a437480d9be9efb232f4f3783b596`.
- Final PR Topology regression run **35995205443 PASS**.


## 2026-09-24 â€” v0.36.18.454 iPad interaction ownership recovery

- User hands-on report on .453: Inset, Edge Bevel, Vertex Bevel, Boolean, Edge Revolve and navigation all failed.
- Reframed the failure as interaction ownership rather than separate topology failures.
- Component paint selection now ignores touch so finger gestures remain available to OrbitControls.
- Paint selection yields to armed direct modelling tools; shared transform gestures also yield to authoritative direct-tool state.
- Symmetry/Bisect, Surface Transform and Insert attach capture-phase pointer listeners only while active.
- Restored authoritative hidden state for inactive Tool Session shells.
- Restored frozen Beta 4 Boolean checkpoint-before-mutation transaction path.
- Protected multi-object transform remained untouched.
- Released via PR **#141**; squash merge `9cecc658ab40c9a4f8f6e286453cdb8045835e98`.
- Final PR Topology regression run **35994630718 PASS**.


## 2026-09-24 â€” v0.36.18.453 Proven-runtime recovery

- User hands-on test reported that .452 still left the affected modelling tools unusable.
- Abandoned the .450â€“.452 presentation-wrapper/ownership repair direction as the active runtime.
- Restored transform and Edge Revolve interaction runtimes from the last hands-on-good .449 state; retained the hands-on-passed .452 Revolve Profile controller.
- Removed the Boolean Tool Session and .451 presentation wrappers from the live loader.
- Retained the .452 Boolean transactional one-step scene snapshot fix in the core Boolean module.
- Kept mature Through topology and protected multi-object transform untouched.
- Added regression checks that the failed wrappers are not loaded and protected runtime pins remain intact.
- Beta 5 remains deferred until hands-on recovery passes.
- Released via PR **#140**; squash merge `69a4a8b8ab13bb03f8d93d93ee798106f0b6ed18`.
- Final PR Topology regression run **35991654724 PASS**.


## 2026-09-24 â€” v0.36.18.452 Tool ownership / Boolean Undo recovery

- User retest of .451: Inset failed; Through passed; Edge Bevel failed; Vertex Bevel failed; Boolean one-step Undo failed; Revolve Profile passed; Edge Revolve failed.
- Traced the common modelling failure to transform gesture ownership surviving while direct component tools were armed.
- Fixed this in the transform layer rather than modifying proven Face/Bevel topology controllers.
- Edge Revolve now has a real arm API instead of launcher -> hidden-button click indirection.
- Boolean now captures the complete pre-operation scene and checkpoints that snapshot once after successful result creation.
- No Through topology changes; the strong cavity-aware baseline remains protected.
- Beta 5 remains deferred pending hands-on confirmation.
- Released via PR **#139**; squash merge `4e2733d1ac38974265a4da9524239429481b90ea`.
- Final PR Topology regression run **35988721656 PASS**.

## 2026-09-24 â€” v0.36.18.451 Cross-mode UI regression recovery

- User hands-on test of .450 reported a common regression pattern across Object / Face / Edge / Vertex.
- Reported: Boolean not returning in one Undo; Revolve Profile launcher requiring Object > Add and lacking Cancel; Face exact controls orphaned; Inset moving the face; Through weakened; Edge Bevel inactive; Lathe controls visible while unarmed; Edge UI still cluttered; Vertex Bevel inactive.
- Audit showed Face direct/Through, Edge Bevel and Vertex Bevel controller source was byte-identical to the proven .449 baseline, so topology code was not rewritten.
- Restored the .449 Tool Session runtime and moved cleanup into a late presentation-only wrapper that does not intercept tool events.
- Boolean solver/history remains pinned at .369; its cleanup wrapper now only shows/hides the existing controls.
- Revolve Profile can now launch/create directly from Active Tools and Cancel restores the pre-tool scene.
- Added cross-mode regression checks for controller arming plus presentation-only UI ownership.
- Beta 5 remains deferred until user hands-on pass.
- Released via PR **#138**; squash merge `b4ad4077d6813df50699fb53dccd11252809d5b5`.
- Final PR Topology regression run **35984043420 PASS**.

## 2026-09-24 â€” v0.36.18.450 Tool-first UI/UX consolidation

- User requested a deliberate UI/UX rebuild before freezing Beta 5.
- Formalised the interaction rule: mode home shows tool launch buttons only; settings appear only while the owning tool is active.
- Root-caused widespread Object/Shell clutter to a shared Tool Session CSS bug: `.boxlab-tool-session-shell` forced `display:flex` and could defeat the HTML `hidden` state.
- Added an explicit `.boxlab-tool-session-shell[hidden]{display:none!important}` contract.
- Made Vertex Slide exact controls contextual to Slide active state.
- Made Vertex Bevel width/exact controls contextual to Bevel active state.
- Migrated Boolean behind a single Boolean launcher with Union/Cut/Intersect inside a Tool Session.
- Kept protected modelling/navigation runtimes and topology algorithms untouched.
- Intended next milestone after user hands-on pass: Beta 5 freeze.
- Released via PR **#137**; squash merge `d77ec35968d0f59a75747c7be573a3fc3d33bc8c`.
- Final PR Topology regression run **35976396864 PASS**.
- Boolean core remained pinned at `boolean-prototype.js?v=0.36.18.369`; UI cleanup is provided by a separate Tool Session wrapper.

## 2026-09-24 â€” v0.36.18.449 Scrollable Viewport menu

- User confirmed .448 works and reported the expanded Viewport menu now extends beyond the iPad screen and cannot scroll.
- Added viewport-relative max height, vertical overflow scrolling, contained overscroll and iPad inertial scrolling.
- Kept the Viewport menu position/width and existing controls unchanged.
- No modelling or facegroup data behavior changed.
- Released via PR **#136**; squash merge `df6f10db0df4fb6b8bdcc9af4367db9bf9c9827c`.
- Final PR Topology regression run **35974096070 PASS**.

## 2026-09-24 â€” v0.36.18.448 Facegroups first-activation fix

- User reported that first selecting Viewport > Facegroups showed an almost-black mesh until Default/Soft/Vivid/Contrast was pressed.
- Fixed render lifecycle so Facegroups rebuilds then reapplies after viewport/evaluated mesh synchronisation.
- Vertex-colour facegroup material is no longer assigned when colour application fails.
- Failure falls back to normal material rather than a dark invalid state.
- No topology, facegroup IDs, OBJ handoff data, or protected modelling/navigation runtimes changed.
- Released via PR **#135**; squash merge `7c8eb0c1c36fe0bc8a69397390771043c0aefe20`.
- Final PR Topology regression run **35970042762 PASS**.

## 2026-09-24 â€” v0.36.18.447 Facegroup colour controls

- User hands-on passed .446 Facegroups Render Look and requested direct colour controls before the broader UI/UX cleanup.
- Added contextual Facegroup Colours controls inside Viewport settings.
- Added Default / Soft / Vivid / High Contrast palettes, Saturation, Lightness, Ungrouped colour, Reseed and Reset.
- View settings persist in local storage and remain purely visual.
- Controls remain hidden unless Facegroups is the active Render Look.
- No facegroup IDs, mesh topology, or OBJ handoff data are changed.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#134**; squash merge `cfd8e9e64f84e8a3f5b19dfb0dd5de3f421a0bf3`.
- Final PR Topology regression run **35955642406 PASS**.

## 2026-09-24 â€” v0.36.18.446 Viewport Facegroup Colours

- User hands-on passed .445 facegroup import/export and requested facegroup colours in Viewport settings.
- Added Facegroups to the existing Viewport Render Look menu.
- Stable deterministic colours are derived from facegroup names; ungrouped faces remain neutral grey.
- Display uses the evaluated active/inactive meshes so Mirror/SubD inherited groups remain visible.
- Facegroup view is non-destructive and does not alter export metadata.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#133**; squash merge `fcd19de9f38bfca2d65a1de643387a64e03ab318`.
- Final PR Topology regression run **35950814715 PASS**.

## 2026-09-24 â€” v0.36.18.445 OBJ facegroup preservation foundation

- User clarified Nomad/Blender/ZBrush facegroup semantics: facegroups are per-face IDs inside one object, not separate objects.
- Corrected editable OBJ parsing so `o` creates object boundaries and `g` only changes per-face facegroup metadata.
- Added `EditableMesh.faceGroups[]` and preservation through clone, Extrude, Inset, face split, Triangulate, Mirror and SubD.
- Added File > Import > **Split objects by groups** checkbox, OFF by default, to deliberately reproduce split-by-group behavior when wanted.
- OBJ export now emits preserved `g` records within each object and clears groups when required.
- Safe Repair preserves surviving group metadata; Auto Close caps are intentionally ungrouped.
- Added regression coverage for one object with eight facegroups, explicit split mode, OBJ round-trip, and parent-to-descendant inheritance.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#132**; squash merge `66e9e6e00d7734a0c5f0df28b1f8413bd6a220b9`.
- Final PR Topology regression run **35949682949 PASS**.

## 2026-09-24 â€” v0.36.18.444 OBJ export polish / topology preflight

- User hands-on passed .443 normals/triangulation and advanced with /nextbuild.
- Audited export and retained the existing scene OBJ exporter rather than introducing a parallel path.
- Added a reusable scene OBJ export core that evaluates each object after Mirror and optional SubD before preflight.
- Each exported mesh is audited with Mesh Health and receives compact health metadata comments in the OBJ.
- Scene header reports closed-clean / open-clean / issues counts.
- Added OBJ `g` records alongside `o` records for clearer downstream grouping.
- Export remains permissive; problems are surfaced rather than blocking file creation.
- Reference objects remain excluded.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#131**; squash merge `b9e16eaedad2044c8ce031bc8ae56f7ee736de4f`.
- Final PR Topology regression run **35934485708 PASS**.

## 2026-09-24 â€” v0.36.18.443 Mesh Health normals / triangulation controls

- User hands-on passed .442 boundary diagnostics and advanced with /nextbuild.
- Added Unify Winding, Flip Normals, and Triangulate to Mesh Health.
- Unify Winding fixes adjacency direction across manifold connected faces without making an outward/inward assumption.
- Flip Normals reverses every face explicitly.
- Triangulate uses projected ear clipping so concave n-gons do not rely on unsafe fan triangulation.
- All three operations run transactionally with validation and one Object Undo step.
- Mesh Health refreshes immediately after each operation.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#130**; squash merge `1313089ed7c445ac03124ad2a71f7185eb89afee`.
- Final PR Topology regression run **35933890155 PASS**.

## 2026-09-24 â€” v0.36.18.442 Mesh Health boundary diagnostics

- Advanced from .441 Auto Close into the next Phase E roadmap item: stronger boundary diagnostics.
- Added connected-component analysis for boundary edges with loop / chain / branched classification.
- Mesh Health now reports boundary group counts alongside existing edge totals.
- Added Select Boundary and Select Non-Manifold diagnostic handoffs.
- Diagnostic handoff exits Mesh Health into standard Edge mode with the relevant edges selected so existing Fill / Bridge / Move / Delete / repair tools remain authoritative.
- No geometry or Object history mutation occurs during diagnostic selection.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#129**; squash merge `cd3bc0ad6b5da3298b1b3e9d408e49c03c2f4a71`.
- Final PR Topology regression run **35929633430 PASS**.

## 2026-09-24 â€” v0.36.18.441 Mesh Health Auto Close / Make Watertight foundation

- Advanced from .440 Safe Repair into the next Phase E roadmap item: Auto Close / Make Watertight.
- Audited existing Boundary + Fill first and reused their simple-loop detection/orientation principles rather than adding a parallel cap convention.
- Auto Close is available only for otherwise-clean open meshes.
- Entire boundary graph must resolve to simple closed loops with degree 2 at every boundary vertex.
- One or multiple disjoint holes are capped together, each oriented opposite its neighbouring surface along the shared boundary.
- Branched/open boundary graphs and meshes with pre-existing topology issues are refused.
- Candidate must re-audit as Closed Â· Clean with zero boundary/non-manifold/winding issues before commit.
- Successful close is one Object Undo step and Mesh Health refreshes immediately.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#128**; squash merge `d4e964e3741d7e53ac0176c1a811b05ea3edb727`.
- Final PR Topology regression run **35928602689 PASS**.

## 2026-09-23 â€” v0.36.18.440 Mesh Health Safe Repair

- Advanced from the .439 inspection baseline into the first Phase E repair action.
- Added Safe Repair inside the Mesh Health Tool Session.
- Repair is intentionally narrow: exact same-direction duplicate faces, zero-area faces, and accidental orphan vertices only.
- Opposite-winding coincident faces are preserved as ambiguous rather than guessed away.
- Candidate repair runs on a clone first and is refused if topology health worsens or the issue load fails to improve.
- Successful repair saves back through the existing Object manager and records one Object Undo step.
- Mesh Health automatically refreshes after repair to show remaining issues.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#127**; squash merge `73e6958874de73d8e553f0bb2ad73cd31c503004`.
- Final PR Topology regression run **35858042579 PASS**.

## 2026-09-23 â€” v0.36.18.439 Mesh Health / Inspect foundation

- User hands-on passed .438 Insert Tool and advanced with /nextbuild.
- Phase D Transform/Insert slice is now considered functionally established, so development moves into Phase E Import / Repair / Handoff.
- Added non-destructive Object-mode Mesh Health Tool Session.
- Audit reports mesh counts and polygon mix, boundary/non-manifold edges, invalid or degenerate faces, zero-area faces, duplicate faces, inconsistent winding, orphan vertices, and intentional loose topology.
- Open-but-valid meshes are reported as **Open Â· Clean**, not incorrectly treated as failures.
- Closed valid meshes report **Closed Â· Clean**; structural problems report **Issues Found**.
- Reuses the existing topology seam-conformance summary as the base topology definition.
- No geometry/history mutation is performed by Inspect.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#126**; squash merge `60187e2f17c444c319c6862a80e3a107588dc9cb`.
- Final PR Topology regression run **35854298290 PASS**.

## 2026-09-23 â€” v0.36.18.438 linked-instance Insert Tool foundation

- Continued the approved Nomad-style Transform interaction into an Insert workflow rather than creating another unrelated placement system.
- Added **Insert** beside Transform in Object Active Tools.
- Insert first captures a source face, then a target face on another visible object.
- The target pick creates a linked duplicate through the existing linked-instance manager, preserving shared geometry and independent Object placement.
- The inserted source face is positioned face-to-face using the existing Surface Transform core.
- Move / Rotate / Scale use the same surface-frame interaction and tap-cycle as Transform; touch navigation remains protected.
- Cancel restores the exact pre-session scene; Apply commits one Object-history step.
- `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#125**; squash merge `3483edd3b8809b38fca738ed8e6f3085bb2e26f6`.
- Final PR Topology regression run **35843005403 PASS**.


## 2026-09-23 â€” v0.36.18.437 Surface Transform face-to-face anchoring

- First hands-on test of .436 was a strong interaction PASS, but user identified that centre-of-mass anchoring caused the placed object to intersect the target surface.
- Transform workflow now picks two faces: first a source face on the selected object, then a target face on another visible object.
- Source face centre becomes the placement anchor.
- Source face normal is rotated to oppose the target face normal, so the two faces meet rather than the object centre being embedded in the target.
- Existing Nomad-style Move â†’ Rotate â†’ Scale â†’ Move tap-cycle remains unchanged after placement.
- Surface transform core generalized with sourceAnchor/sourceNormal and oppose mode for reuse by the future Insert Tool.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#124**; squash merge `5a6ef4338c2997b5e65dbf59f77bc129d7e152cd`.
- Final PR Topology regression run **35841565536 PASS**.


## 2026-09-23 â€” v0.36.18.436 Surface Transform Tool foundation

- After .435 Align to Face hands-on PASS, product direction expanded from separate Align commands toward a Nomad-inspired surface-relative Transform / Insert interaction model.
- Added Object-mode Transform Tool Session for one editable object.
- First target-face tap on another visible object places the selected object centre at the hit point and aligns source +Y to the target face normal.
- Persistent surface frame drives three states: Move slides across the target plane, Rotate spins around the target normal, Scale grows/shrinks around the placement point.
- Pencil/mouse tap cycles Move â†’ Rotate â†’ Scale â†’ Move; touch remains ordinary iPad navigation.
- Existing 15Â° rotation snap is reused.
- Tool is transactional: full Object scene captured before launch, Cancel restores it, Apply records that captured scene as one Object Undo step.
- Placement math extracted to `surface-transform-core.js` so the future Insert Tool can reuse exactly the same controller instead of duplicating interaction logic.
- Existing linked-instance Object-mode save path can derive independent `instanceMatrix` placement from the transformed live mesh while retaining shared geometry.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#123**; squash merge `db817eb623ebc52ff2d7b6e344f2911873ead8d6`.
- Final PR Topology regression run **35839401940 PASS**.


## 2026-09-23 â€” v0.36.18.435 Symmetry Align to Face + Flip Plane

- Continued the now-working arbitrary Symmetry plane after .434 hands-on PASS.
- Added one-shot Align to Face inside the Symmetry Tool Session.
- With Align to Face armed, Pencil/mouse tap on a source face moves the plane to the hit point and adopts that source face normal.
- Touch remains reserved for ordinary iPad navigation.
- Added Flip Plane to reverse the plane normal in place without moving the plane.
- X/Y/Z remain quick orientation presets; aligned faces are treated as Custom orientation.
- Existing Move/Rotate plane ownership and arbitrary-plane topology kernel remain unchanged.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#122**; squash merge `6bf2b5a5308d639c0e03f7cd2862695d10624591`.
- Final PR Topology regression run **35819789567 PASS**.


## 2026-09-23 â€” v0.36.18.434 Symmetry plane transform ownership + arbitrary rotation

- User found that pressing Rotate during an active Symmetry / Bisect session rotated the source cube instead of the yellow construction plane.
- Root cause: .433 owned direct plane dragging but the shared transform engine still owned Object-mode Move/Rotate/Scale.
- Symmetry now has explicit transform ownership while its Tool Session is active; the shared Object transform engine yields completely.
- Move/direct drag targets the symmetry plane; Rotate targets the plane normal; Scale is disabled because an infinite cut plane has no meaningful scale.
- X/Y/Z remain quick orientation presets. After free rotation the plane is marked Custom.
- Rotate respects the existing world-axis transform constraints and the existing 15Â° rotation snap toggle.
- Bisect core generalized from axis+offset to arbitrary plane point+normal while keeping legacy X/Y/Z+offset calls working.
- Mirrored symmetry across an arbitrary plane reflects geometry directly across that plane and reuses seam vertices to weld the cut boundary.
- Touch remains ordinary iPad navigation; Pencil/mouse owns plane transform gestures.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#121**; squash merge `6cb0a5aca9d2d69dbed23511ef617d381a1871c6`.
- Final PR Topology regression run **35818444568 PASS**.


## 2026-09-23 â€” v0.36.18.433 movable / snappable Symmetry plane

- Continued the .428 Symmetry / Bisect foundation after the .432 Face Delete regression fix and handoff cleanup.
- Bisect core now accepts a non-zero X/Y/Z plane offset rather than being locked to object-local origin.
- Mirrored results translate the clipped mesh to a temporary origin, reuse the proven Mirror engine for welding, then translate back so the seam weld occurs on the moved plane.
- Symmetry Tool Session adds Move Plane, Reset Origin and live offset readback.
- Pencil/mouse drag on the yellow plane moves it along its normal; touch is deliberately ignored so ordinary iPad navigation stays intact.
- Geometry Snap can move the plane to active/visible Vertex, Edge, Midpoint and Face hit positions.
- X/Y/Z, Keep + / Keep âˆ’ and optional Mirror remain live during plane movement.
- Face-normal orientation is intentionally deferred to the next refinement rather than broadening this first interaction build.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#120**; squash merge `ff9be6110c7e34b79fac08e82589b3bd40b66237`.
- Final PR Topology regression run **35812426602 PASS**.


## 2026-09-23 â€” handoff cleanup after v0.36.18.432

- Reworked `AI_HANDOFF.md` back into a true current-state document before the next major handoff.
- Removed stale audit lines that still described .394-era main as current while preserving chronology in this file.
- New handoff snapshot now records live v0.36.18.432, Beta 4 frozen at .427, current PR/CI, protected files/pins, mature Phase D systems, recent architecture lessons, and next intended build .433 movable/snappable Symmetry / Bisect plane.
- Added a compact copy/paste handoff prompt for the next chat.
- Documentation-only cleanup; no runtime version bump.


## 2026-09-23 â€” v0.36.18.432 Face Delete orphan compaction

- User isolated the apparent mirrored-Solidify failure to a simpler reproduction: cube with three adjacent faces deleted would not Solidify, while an extracted/duplicated equivalent mesh would.
- Root cause: Face Delete removed face records but left vertices no longer referenced by any face. Solidify then encountered those zero-incidence vertices and failed offset solving with `zero-vertex-normal`.
- Added `EditableMesh.compactUnusedVertices()` to remove accidental orphan vertices, remap faces/creases, and preserve explicitly loose vertices/edges.
- Face Delete now runs this compaction once after a multi-face delete transaction.
- Added regression for cube â†’ delete three adjacent faces â†’ compact one orphan vertex â†’ Solidify succeeds.
- Existing intentional loose geometry is regression-protected through the compaction pass.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#118**; squash merge `31e2c4d0c727f1910543d10d723a4fcedda72e77`.
- Final PR Topology regression run **35810612232 PASS**.


## 2026-09-23 â€” v0.36.18.431 Mirror-seam-aware Solidify

- User confirmed .430 still failed on a mirrored object despite Shell working.
- Root cause is geometric: an ordinary Solidify on a half-mesh creates side walls along mirror-plane boundary edges and can offset inner seam vertices away from the mirror plane. Mirroring that result produces overlapping/internal seam topology.
- Solidify now accepts active symmetry axes from the Mirror modifier.
- Boundary edges lying wholly on an active mirror plane are treated as symmetry seams and do not receive Solidify side walls.
- Inner vertices whose source lies on a mirror plane are pinned back onto that plane after offset.
- For mirror-aware Solidify, topology validation runs on the evaluated mirrored result; the editable half is allowed to remain open along symmetry seams by design.
- Mirror remains non-destructive and enabled after Apply.
- Added a dedicated half-sheet-on-X-mirror-plane regression proving the evaluated mirrored solid is closed manifold topology.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#117**; squash merge `b3b63b00c505827f74a00175e2d18770a1aeeb55`.
- Final PR Topology regression run **35809943265 PASS**.


## 2026-09-22 â€” v0.36.18.430 Solidify preserves Mirror modifier

- Hands-on testing showed the .429 bake-on-apply approach still failed on the user's mirrored object, while Shell worked correctly.
- Comparing Shell and Solidify confirmed the better BoxLab modifier model: destructive tools should edit the authoritative base mesh and leave non-destructive Mirror active.
- Solidify preflight/apply now operate on the base editable mesh again.
- Solidify preview mirrors only the newly-created preview shell so the translucent preview matches the currently displayed mirrored object.
- Apply no longer bakes or clears Mirror; the Mirror modifier remains ON after Solidify.
- This matches Shell's proven modifier-preserving behavior and avoids double/overlapping evaluated topology during Solidify preflight.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#116**; squash merge `4a393fa0021d196c9921cf978fd029f109035ce9`.
- Final PR Topology regression run **35724663296 PASS**.


## 2026-09-22 â€” v0.36.18.429 Solidify mirrored-object fix

- Hands-on testing after .428 exposed that Solidify could not operate on an object with the existing non-destructive Mirror modifier enabled.
- Root cause: Solidify preflight/preview/apply read the editable base mesh while the viewport displayed applyMirror(base, mirrorAxes).
- Solidify now evaluates the active Mirror modifier before preflight, preview and Apply.
- Apply bakes the evaluated mirrored geometry into the editable mesh, then clears the old Mirror modifier so the result is not mirrored twice.
- The baked mirrored Solidify result remains one Object-history step.
- Added a regression fixture using a half-sheet mirrored across X and confirmed the evaluated mesh solidifies to closed topology.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#115**; squash merge `70831c5a24d975417c81adb16d6e56a76d4191cc`.
- Final PR Topology regression run **35723194132 PASS**.


## 2026-09-22 â€” v0.36.18.428 Symmetry / Bisect foundation

- Development resumed after the Beta 4 freeze with the next Phase D construction tool.
- Audited existing Mirror first: it remains the authoritative non-destructive origin-based mirror modifier and is not replaced.
- Added destructive Object-mode Symmetry / Bisect as a separate Tool Session.
- Foundation uses the object local origin plane on X, Y or Z.
- Keep + / Keep âˆ’ clips polygon faces against the selected plane using shared edge-intersection vertices.
- Mirror kept half optionally reflects the clipped result through the existing applyMirror path, welding coincident centre-plane vertices.
- Bisect-only leaves the cut boundary open by design; Mirror produces the symmetric welded shell/surface result.
- Session provides live translucent result preview plus visible symmetry plane, Cancel and Apply.
- Apply is one Object-history step and commits back into the active editable mesh.
- Existing non-destructive Mirror must be turned off before launching to avoid double-mirror ambiguity.
- Frozen Beta 4 remains exactly v0.36.18.427 and is regression-protected.
- Released via PR **#114**; squash merge `72a30c2f5799d048235684e326da8fdf3a71fa2c`.
- Final PR Topology regression run **35721391817 PASS**.


## 2026-09-22 â€” Beta 4 freeze at v0.36.18.427

- User requested a Beta 4 release after hands-on approval of the Edge Extrude workflow through .427.
- Frozen source main commit: `ec45b3ba208ef3ffa40015d7a3b62666c63f379e`.
- Snapshot includes the current app shell, src, tests, docs and release assets under `/beta-4/`.
- Fixed Pages URL: https://crisbezz.github.io/BoxLab/beta-4/
- Beta 4 captures post-Beta-3 Phase D work including Sweep, Array/Solidify/Shell/Revolve Tool Sessions and Edge Extrude ribbon/axis/plane/selection-handoff workflows.
- `/beta-4/` is now intended to be immutable during normal development.
- Beta 4 freeze PR **#113** merged as `2743d9d0e10f8fb9605e1e37ab92f0c53c636837`.
- The snapshot reuses the exact v0.36.18.427 blobs/tree; frozen source regression run **35713131703 PASS**.


## 2026-09-22 â€” v0.36.18.427 Edge Extrude selection handoff

- Hands-on .426 exposed a workflow break: after an extrusion, the new outer edge stayed selected but could not be deselected by tapping while Edge Extrude owned the viewport.
- Edge Extrude now owns tap-selection semantics while armed instead of treating every no-drag pointer gesture as a cancelled extrusion.
- Tap a selected edge to deselect it; tap a different valid boundary edge to switch selection to it; drag a different valid boundary edge to switch and extrude in the same gesture.
- Extrude and the current Plane/X/Y/Z/Auto constraint remain armed even when the selection becomes temporarily empty.
- This removes the previous Deselect â†’ select edge â†’ Move â†’ Extrude â†’ Plane re-entry loop.
- Ribbon topology, Plane math and one-pull-per-Undo are unchanged.
- Released via PR **#112**; squash merge `387e7d00470e4aa300f0212ceddf9446cdd66fb9`.
- Final PR Topology regression run **35713131703 PASS**.


## 2026-09-22 â€” v0.36.18.426 Edge Extrude Plane constraint

- User requested free Edge Extrude movement constrained to a plane perpendicular to the grabbed edge.
- Added an Edge-Extrude-only Plane control into the shared transform constraint strip; it is visible only while Edge Extrude is armed.
- Plane origin is the current selected-edge/chain centre and plane normal is the specific edge grabbed to begin the pull.
- Pointer motion is raycast directly onto that plane for free 2D movement while preserving zero along-edge displacement.
- A final projection removes any numerical along-edge component before topology generation.
- Plane mode leaves Free/X/Y/Z/Auto behavior from .425 unchanged.
- Repeated outer-rail selection and one-pull-per-Undo remain unchanged.
- Initial PR regression failure was only a stale .425 transform-upgrade cache-pin assertion; the new .426 Plane tests passed.
- Released via PR **#111**; squash merge `3ecb2d9ba6004a6f6379985e4ae6064ca62356f6`.
- Final PR Topology regression run **35709099628 PASS**.


## 2026-09-22 â€” v0.36.18.425 Edge Extrude directional constraints

- User approved constrained Edge Extrude so ribbon pulls can produce more regular controlled geometry.
- Edge Extrude now reads the existing shared transform constraint state: Free / X / Y / Z / Auto.
- X/Y/Z are projected perpendicular to the source edge before extrusion, removing any component that would slide along the edge.
- If the chosen world axis is effectively parallel to the source edge, the pull refuses with a clear status instead of generating a sliver.
- Auto evaluates valid perpendicular X/Y/Z candidates and locks to the one that best matches the initial drag direction.
- Free remains the existing unconstrained screen-plane ribbon workflow.
- Axis Snap ON with Free behaves as Auto for Edge Extrude, matching existing Move behavior.
- While Edge Extrude is armed, it owns the viewport pointer drag so normal Move does not steal Pencil input; the shared constraint strip remains interactive.
- Ribbon topology and repeated outer-rail selection from .423/.424 are unchanged.
- Released via PR **#110**; squash merge `44fa20f0f769750b6c956f16ac5d8cb071144fb2`.
- Final PR Topology regression run **35707683401 PASS**.


## 2026-09-22 â€” v0.36.18.424 Edge Extrude arming hotfix

- First hands-on .423 test showed a valid selected boundary edge with Edge Extrude incorrectly disabled.
- Root cause was UI validation calling boundarySelectionInfo(mesh()) without passing the live selected edge IDs.
- Both button enable/disable sync and the click-to-arm gate now call boundarySelectionInfo(mesh(), selectedEdges()).
- Edge Extrude topology and ribbon generation are unchanged from .423.
- Released via PR **#109**; squash merge `9be062ec965ca8c21e5ea00d1ba784865598e1d6`.
- Final PR Topology regression run **35705932023 PASS**.


## 2026-09-22 â€” v0.36.18.423 direct Edge Extrude ribbons

- User promoted Edge Extrude ahead of Symmetry and requested fast repeated ribbon-style geometry creation.
- Added direct Edge-mode Extrude for selected boundary edges, connected boundary chains and loose edges.
- Dragging a selected valid edge creates a live quad-strip preview.
- Shared chain vertices are duplicated once so connected selections stay welded.
- The newly created outer rail remains selected after commit and Edge Extrude remains armed for repeated pulls without reselecting or mode switching.
- Boundary validation rejects interior edges and branched selections.
- Each pull is one history step and validates topology before commit; invalid results roll back.
- Edge Extrude is placed in the existing Edge Move row with Edge Slide and Offset Loop.
- Protected multi-object transform remains pinned at v0.36.1.0.
- Initial PR regression failure was only a stale .422 cache-pin assertion; the Edge Extrude topology tests passed.
- Released via PR **#108**; squash merge `e92c11463449f481e6ef84d74f4a00dad8f3775c`.
- Final PR Topology regression run **35704689025 PASS**.


## 2026-09-22 â€” v0.36.18.422 Revolve Profile Tool Session

- User hands-on passed v0.36.18.421 Solidify/Shell Tool Sessions and advanced with /nextbuild.
- Revolve Profile now uses the shared exclusive Tool Session instead of its private Active Tools drawer-lock implementation.
- New Revolve Profile construction still starts as a normal Object-mode positioning plane; it does not immediately steal the drawer.
- A compact Revolve Profile launcher is available while the construction plane is active.
- Moving/snapping the plane or entering profile editing automatically claims the Revolve Profile Tool Session.
- Session contains Edit Profile, Undo Point, Delete Point, Clear, Segments 3â€“64 and Apply Revolve.
- Existing Pencil/mouse profile authoring, touch navigation, segment slider ownership, winding/normals, snapping and Apply geometry are unchanged.
- Apply ends the Tool Session and retains the established single-object selection / Boolean tint cleanup.
- Initial PR regressions were stale tests for the retired private drawer-lock contract and old current-build cache pins; tests were updated to protect the shared Tool Session contract instead.
- Released via PR **#107**; squash merge `478f2a8613873c0c3533a3ce82bb7227925e8230`.
- Final PR Topology regression run **35696735145 PASS**.


## 2026-09-22 â€” v0.36.18.421 Solidify / Shell Tool Sessions

- User hands-on passed v0.36.18.420 Vertex transform ownership and advanced to the next roadmap task.
- Audited Solidify and Shell before migration; they remain separate modelling operations:
  - Solidify: Object-mode open sheet â†’ closed solid.
  - Shell: Face-mode closed solid + selected opening faces â†’ hollow solid.
- Both tools now use the shared exclusive Tool Session UI after launch.
- Idle Object/Face Active Tools remain compact; session controls contain live Thickness plus Cancel / Apply.
- Solidify direct viewport thickness dragging is preserved.
- Shell Apple Pencil thickness-slider ownership / late Safari range guard is preserved.
- Geometry algorithms, object history, selection semantics and protected multi-object transform are unchanged.
- Initial PR regression run `35695668683` failed only because older tests still asserted the retired pre-Tool-Session drawer/button implementation; tests were updated to the new shared-session contract.
- Released via PR **#106**; squash merge `f7ac0b986b01c5441be888d69bfeda88c92299d2`.
- Final PR Topology regression run **35695761384 PASS**.


## 2026-09-22 â€” v0.36.18.420 Vertex transform ownership

- Hands-on after .419 showed Vertex selection and Bevel worked, while Vertex Move/Scale/Rotate did not; Edge and Face transforms remained good.
- Root cause was Vertex Pick Assist owning viewport pointerdown at document-capture phase and stopping propagation even when a transform was armed.
- Vertex Pick Assist now yields completely whenever Move / Scale / Rotate owns the interaction.
- Ordinary Vertex tap selection, Bevel, Add, Build Edge and other direct Vertex tools remain unchanged.
- Protected multi-object transform remains pinned at v0.36.1.0.
- Released via PR **#105**; squash merge `80677f75d32329a452ccc517ce4d52379d0fb628`.
- Final PR Topology regression run **35695257815 PASS**.


## 2026-09-22 â€” v0.36.18.419 Array pointer cleanup

- User hands-on passed the .418 Array drawer-ownership fix but reported that free Vertex movement no longer worked afterward.
- The narrow shared-state risk was Array END-copy pointer cleanup: Array captured the viewport pointer during endpoint drag but relied on browser implicit release.
- Array now explicitly releases viewport pointer capture when END-copy drag ends, is cancelled, or is torn down by Apply/mode/session changes.
- Existing OrbitControls restoration remains in the same teardown path.
- Free component Move code is unchanged; protected multi-object transform remains pinned at v0.36.1.0.
- Released via PR **#104**; squash merge `c2b054d418a5c3b7e9f4fdfc747b6109c6c95fcb`.
- Final PR Topology regression run **35691232067 PASS**.


## 2026-09-22 â€” v0.36.18.418 Tool Session drawer ownership

- User hands-on showed .417 still allowed Active Tools itself to collapse as soon as the Array END copy was touched, even though Array session/source ownership remained armed.
- Root cause was at the shared Tool Session layer: begin() opened the <details> drawer, but there was no contract preventing another interaction path from closing it later in the same live session.
- Tool Session now watches the Active Tools drawer toggle event and reopens it on the next microtask whenever a session is active.
- The guard is generic for Array, Sweep and future Solidify/Shell/Revolve migrations; normal drawer collapse remains unchanged when no Tool Session is active.
- Array endpoint drag math, linked-instance Apply, Object selection and protected multi-object transform remain unchanged.
- Released via PR **#103**; squash merge `5bbe750f4fc21fd85f0d47b7a0117be11072273f`.
- Final PR Topology regression run **35690638630 PASS**.


## 2026-09-22 â€” v0.36.18.417 Array session ownership during repositioning

- User reported Array Tool Session dropped back to normal Object Active Tools when selecting/repositioning the array object.
- Removed the old preview cancellation rule for temporary active-object changes while Array remains in Object mode.
- Array now restores its original preview source if selection changes during an armed preview and reasserts the `array` Tool Session if displaced.
- Endpoint preview pointer-down moved to document capture level (canvas target only) so Array can win before ordinary object selection.
- Array still exits on Apply, Cancel, or explicitly leaving Object mode.
- Released via PR **#102**; squash merge `58e65c14d04ce3f8ebc21f98b4860373007a3126`.
- Final PR Topology regression run **35689604956 PASS**.

## 2026-09-22 â€” v0.36.18.416 Array Tool Session migration

- Migrated existing Linear Array onto the reusable exclusive Tool Session UI introduced for Sweep.
- Replaced the permanently expanded Object-mode Array block with one compact Array launcher.
- Active Array preview now owns Active Tools and shows only Direction, Count, viewport endpoint guidance, Cancel and Apply Array.
- Cancel and Apply both end the Tool Session and restore normal Active Tools.
- Preserved endpoint-vector preview/dragging, Free/X/Y/Z constraints, linked-instance commit, one scene-history snapshot and Pencil Count handling.
- No Array geometry or linked-instance engine rewrite.
- Released via PR **#101**; squash merge `00f555ed3475c11194c131aca9599db8280a7536`.
- Final corrected PR Topology regression run **35689094456 PASS**.

## 2026-09-22 â€” v0.36.18.415 fresh Sweep placement and immediate Move

- Fixed fresh Add â†’ Sweep profile plane spawning at world origin inside the default cube.
- Fresh Sweep now creates a camera-facing profile plane just in front of the current active mesh bounding sphere, toward the camera.
- Fresh Sweep automatically arms real Move on the next frame so repositioning is immediately available without reselecting the construction object.
- Selected Face/Edge Sweep placement remains unchanged and still comes directly from the selected source geometry.
- Released via PR **#100**; squash merge `69299520f61b36186d121026f8e27b807889db46`.
- Final corrected PR Topology regression run **35688505420 PASS**.

## 2026-09-22 â€” v0.36.18.414 Follow Edges root-cause fix

- Found the actual reason Follow Edges would not activate: `hotRailHit` and `railSnapRefs` had been lost from the module-level state declaration while the code still referenced them.
- This caused a runtime `ReferenceError` at the start of Follow Edges activation, before button state or rail overlay could update.
- Restored both variables at module scope.
- Added regression coverage to protect the rail-state declarations from disappearing again.
- No geometry, picker or Tool Session behaviour changed.
- Released via PR **#99**; squash merge `ac6c3a630757f849962cae832f0b53999d68fbc9`.
- Final PR Topology regression run **35686712355 PASS**.

## 2026-09-22 â€” v0.36.18.413 atomic selected-profile Follow Edges handoff

- .412 hands-on screenshot proved PATH stage activation succeeded while Follow Edges mode activation did not.
- Reworked selected-profile auto launch so profile loading and Follow Edges activation happen atomically on the same `sweepPath` metadata object.
- `applySelectionProfile({activateFollowEdges:true})` now sets `pathMode='edges'`, `editPath=true`, `sessionStage='path'`, refreshes rail refs and syncs path buttons before save/render events.
- Removed the fragile follow-up `setPathMode()` / `setSweepStage()` re-lookup from the auto launch queue.
- Manual Use Selection behaviour remains profile-only.
- Released via PR **#98**; squash merge `e30e895e82453e85d3b8ac4e97dbfb0ebdc0a82f`.
- Final corrected PR Topology regression run **35686329704 PASS**.

## 2026-09-22 â€” v0.36.18.412 hard Follow Edges active-state indicator

- User reported .411 still did not visibly light Follow Edges.
- Added a dedicated `aria-pressed="true"` selected-state selector with `!important` styling.
- Active Follow Edges / Draw Path buttons now change their visible label to include `Â· Active`.
- Candidate rail guide is fully opaque white for maximum contrast over shaded surfaces.
- No Sweep picker, geometry or Tool Session behavior changed.
- Released via PR **#97**; squash merge `01784ed914e1351da3c3d84af6bafefb576ca654`.
- Final corrected PR Topology regression run **35685824200 PASS**.

## 2026-09-22 â€” v0.36.18.411 Follow Edges explicit state and rail visibility

- User reported .410 Follow Edges still did not visibly light as active and internal Knife-cut rails remained invisible on shaded faces.
- Added immediate path-mode button synchronization via `syncPathModeButtons()` plus `aria-pressed` state.
- Added explicit Sweep active-button styling so Follow Edges visibly highlights when selected.
- Changed candidate rail guide to render without depth testing, preventing coplanar topology lines from disappearing into shaded faces.
- Kept .410 dedicated edge-only picker and all Sweep geometry behaviour unchanged.
- Released via PR **#96**; squash merge `57186abed6bf6daff3015b7d3d01e7601fe74062`.
- Final corrected PR Topology regression run **35684868346 PASS**.

## 2026-09-22 â€” v0.36.18.410 Follow Edges edge-only picker

- Fixed .409 regression where Follow Edges could fail because the generic snapper returned a Vertex near edge endpoints.
- Added dedicated edge-only rail picking for Follow Edges.
- Hot-edge preview and click selection now use the exact same edge-only picker.
- Cached rail reference meshes during active Follow Edges to avoid cloning them on every Pencil hover event.
- Draw Path retains the generic Vertex/Edge/Face snapper.
- .409 rail contrast remains unchanged.
- Released via PR **#95**; squash merge `19652f2ecff87f9de5a75fe0aaa678e132b88ee0`.
- Final corrected PR Topology regression run **35684334992 PASS**.

## 2026-09-22 â€” v0.36.18.409 Sweep rail contrast and hot-edge feedback

- User confirmed .408 exposed internal rail edges but requested stronger selectable-path contrast.
- Added three rail states in PATH â†’ Follow Edges: bright candidate edge network, distinct hot edge under Pencil/cursor, and strong cyan accepted rail.
- Hot-edge detection uses the same forced external edge snap used by Follow Edges, so hover feedback matches the edge that would be selected.
- Hot state clears on mode/stage exit and Sweep Apply/exit.
- No Sweep geometry, snap logic or Tool Session structure changed.
- Released via PR **#94**; squash merge `1ee7a5ff1fe2b6105d6cb26eebcef6a8484b96b8`.
- Final corrected PR Topology regression run **35683804432 PASS**.

## 2026-09-22 â€” v0.36.18.408 Sweep Follow Edges rail guide

- User passed .407 and reported that internal topology edges were pickable by Follow Edges but not visible, making Knife-cut rails difficult to use.
- Added a temporary rail-edge overlay built from the same evaluated snap-reference meshes used by Follow Edges.
- The overlay includes internal mesh edges as well as boundaries, so Knife/Loop Cut topology can be followed visually.
- Rail guides appear only in PATH â†’ Follow Edges and disappear automatically in PROFILE, Draw Path, FINISH, Apply, or Sweep exit.
- No Sweep geometry, path-selection or Tool Session behaviour changed.
- Released via PR **#93**; squash merge `e2bdaaa18b803fce0adb7d3ef4b63c8dad64b455`.
- Final PR Topology regression run **35682072137 PASS**.

## 2026-09-22 â€” v0.36.18.407 Sweep local face-winding unification

- User passed the .406 Tool Session UX but reported one remaining isolated Sweep backface.
- Added adjacency-based face-winding unification across all generated Sweep faces.
- Shared-edge neighbours are forced to traverse their common edge in opposite directions, repairing local reversed quads/triangles.
- Closed capped Sweeps then retain the .405 signed-volume check to orient the now-consistent shell outward globally.
- Open/uncapped Sweep surfaces receive local consistency only.
- No UI or Sweep shape/path behaviour changed.
- Released via PR **#92**; squash merge `9eaf20a927aa0c87f27e19df1ade2026b1453fad`.
- Final corrected PR Topology regression run **35680632722 PASS**.

## 2026-09-22 â€” v0.36.18.406 Tool Session UI foundation + Sweep UX

- Audited Sweep, Revolve, Array, Boolean, Solidify, Shell and the shared Active Tools architecture after the user reported that Sweep had become difficult to navigate.
- Confirmed the root UX issue: complex tools independently append persistent controls into the same mode-tools containers, so unrelated Object controls accumulate and bury the active workflow.
- Added reusable `tool-session-ui.js` with an exclusive Active Tools host; an active session hides normal drawer content and restores prior drawer state on exit.
- Migrated Sweep as the first Tool Session client.
- Reorganized Sweep into **PROFILE / PATH / FINISH** stages with only one stage visible at a time.
- Promoted Face/Edge contextual launch to a compact **Sweep** button near the top of the active component tools.
- Face/Edge â†’ Sweep now auto-loads the selected profile and opens directly on PATH with Follow Edges active; Object Add â†’ Sweep starts on PROFILE.
- Apply Sweep ends the session and restores normal Active Tools.
- Kept .405 Sweep geometry/topology behaviour unchanged; this build is UI ownership/workflow only.
- Released via PR **#91**; squash merge `84bb7c68af215560061fda034f723d42be5dce2a`.
- Final corrected PR Topology regression run **35680137829 PASS**.

## 2026-09-22 â€” v0.36.18.405 Sweep shell normal unification

- User confirmed .404 selected-profile anchoring was correct but the final closed Sweep shell still displayed flipped normals.
- Added signed-volume validation for closed capped Sweep shells.
- If the generated shell has negative signed volume, all generated faces are reversed once before EditableMesh creation.
- This provides a Sweep-specific final Unify Normals pass without depending on source face winding or anchor orientation.
- Open or uncapped Sweep surfaces remain untouched.
- .404 profile-anchor/path behaviour remains unchanged.
- Released via PR **#90**; squash merge `5076c8ee5fa268bc6fa0722a3796f2e766b86bc5`.
- Final PR Topology regression run **35678568877 PASS**.

## 2026-09-22 â€” v0.36.18.404 selected-profile Sweep anchor

- Fixed Face/Edge-loop Sweep starting from the profile centroid before reaching the selected Follow Edge path.
- Added a profile anchor index for selected-profile Sweep.
- First Follow Edge selection chooses the nearest profile vertex and rail endpoint, translates the Profile Plane so they coincide, and rebases the swept section around that vertex.
- Removes the unwanted centre-to-edge lead-in while preserving the selected profile's exact shape and offset.
- Default Circle/Rectangle Sweep remains centre-anchored.
- Released via PR **#89**; squash merge `4b3b1c09e52341e0bc02e2c4f9614be919130e59`.
- Final PR Topology regression run **35678133922 PASS**.

## 2026-09-22 â€” v0.36.18.403 closed Sweep profile node insertion

- Fixed inability to insert a new node into a closed Sweep profile.
- Root cause was a missing `segmentDistance()` helper used only by closed-profile edge hit-testing.
- Added a clamped 2D point-to-segment distance implementation in `sweep-path.js`.
- Open-profile authoring, profile closure, Sweep topology and path behaviour remain unchanged.
- Released via PR **#88**; squash merge `e5b62249db5d80ed6148f02b52bb20563c088c4b`.
- Final PR Topology regression run **35675477945 PASS**.

## 2026-09-22 â€” v0.36.18.402 Sweep direct selection launch

- Fixed the .401 workflow flaw where Face/Edge selection was lost when entering Object mode before Add â†’ Sweep.
- Added **Sweep from Selection** directly to Face and Edge Active Tools.
- The component profile is captured before object-mode handoff, then Sweep is created and the saved profile is applied automatically.
- Existing Use Selection profile validation/alignment remains authoritative; this build changes the launch path rather than duplicating profile conversion logic.
- Released via PR **#87**; squash merge `1c512bd2b3c487e9839b0021e8607473340910f4`.
- Final corrected PR Topology regression run **35674435817 PASS**.

## 2026-09-22 â€” v0.36.18.401 Sweep Use Selection profile

- User hands-on passed the .400 Sweep edit-ownership fixes and requested the next Sweep build.
- Added **Use Selection** as the fourth Sweep profile source beside Circle / Rectangle / Draw.
- A single selected Face or connected closed selected Edge loop is captured before Add â†’ Sweep changes the active object.
- Use Selection aligns the Profile Plane to the source geometry and converts the exact planar outline into an editable closed Draw profile.
- Closed Edge-loop validation requires a single cycle; invalid/non-planar selections are rejected conservatively.
- Source geometry is snapshotted only for profile construction and remains unchanged.
- Released via PR **#86**; squash merge `0b6ae224f717c9c95a408f1db9bc77ad52c09169`.
- Final corrected PR Topology regression run **35673404201 PASS**.

## 2026-09-22 â€” v0.36.18.400 Sweep edit ownership

- Fixed Draw Profile remaining/returning Closed during free profile authoring; selecting Draw now explicitly opens the custom profile until the user chooses Closed.
- Fixed point 4+ authoring so custom profiles continue to append normally.
- Added explicit transform disarm when Sweep Profile or Path editing takes viewport ownership.
- Added a Sweep `editing` state and made `transform-upgrade.js` yield while Sweep is editing, preventing Move/Scale/Rotate from stealing Pencil/mouse gestures.
- Preserved touch orbit/pan/pinch and all .399 Sweep topology/normal work.
- Released via PR **#85**; squash merge `45419ad01b683d46c26179497bafb186ca90f632`.
- Final PR Topology regression run **35672719322 PASS**.

## 2026-09-22 â€” v0.36.18.399 Sweep side-normal correction

- User confirmed .398 geometry was much improved but side-face normals were flipped.
- Replaced Sweep side winding based only on whole-profile clockwise state with an edge-local outward-normal test.
- Each side quad now compares its actual 3D normal against the outward direction of the corresponding profile edge mapped through adjacent Sweep frames.
- Concave corners and changing path directions can therefore orient each side face independently while preserving authored profile order.
- .398 exact start ring and concave-cap triangulation remain unchanged.
- Released via PR **#84**; squash merge `0884f4d1acad778c9cbca1f93526a072eda495da`.
- Final PR Topology regression run **35663109891 PASS**.

## 2026-09-21 â€” v0.36.18.398 Sweep concave profile + exact start ring

- Added **Edge Extrude** to the persistent modelling backlog.
- Fixed Sweep start geometry so ring 0 is generated directly from the Profile Plane U/V basis and exactly matches the authored profile.
- Added Profile Plane normal into Sweep frame construction while preserving the established transported-frame logic for later rings.
- Replaced concave closed Sweep cap n-gons with proper polygon triangulation, avoiding fan-triangulation overlap on C-shaped profiles.
- Oriented start/end cap triangles to the actual path direction to prevent inside-out end faces.
- Left global mesh triangulation untouched; the fix is scoped to Sweep.
- Regression refinement: convex profiles keep their existing single-cap topology; only concave profiles use triangulated caps.
- Released via PR **#83**; squash merge `eb56d9df1c08fbbd3ba95112378f0a6e8397eb47`.
- Final corrected PR Topology regression run **35659397337 PASS**.

## 2026-09-21 â€” v0.36.18.397 Sweep profile orientation fix

- Fixed custom Draw profile closure jumping by preserving authored profile point order exactly.
- Removed automatic clockwise profile reversal from `cleanProfile()`; winding is now handled only when generating side/cap face order.
- Fixed mirrored profile editing when the Sweep path leaves opposite the Profile Plane normal.
- Added an orientation-preserving initial Sweep frame that keeps Profile Plane U/V axes visually stable for both path directions.
- Added regression coverage for clockwise point order, lastâ†’first closure integrity and left/right orientation preservation.
- Released via PR **#82**; squash merge `2cc8e9d89a87ef080411d61afd8f8d2535e97a42`.
- Final PR Topology regression run **35594079715 PASS**.

## 2026-09-21 â€” v0.36.18.396 Sweep Draw Profile refinement

- Reduced the initial Sweep Profile Plane from 4Ã—4 units to 0.7Ã—0.7 units, close to the default Circle profile footprint.
- Fixed the custom Draw profile two-point trap: open-profile drawing now appends point 3 and beyond naturally instead of interpreting the 2-point line as a closed loop segment.
- Added explicit Open / Closed profile state.
- Open profiles preview from two points as swept surfaces with no seam or caps.
- Closed profiles require 3+ points and retain the normal closed-section Sweep with optional end caps.
- Circle/Rectangle stay closed; Edit Profile preserves closure when converting built-ins to editable points.
- Added focused .396 regression coverage for open two-point Sweep surfaces, closure validation and runtime UI contract.
- Released via PR **#81**; squash merge `37ad0fc5c1dea9e6ba5281b93f9e72ba366d4b69`.
- Final PR Topology regression run **35593175171 PASS**.

## 2026-09-21 â€” v0.36.18.395 Sweep Profile + dual path

- User hands-on passed the .394 Sweep redraw/3D Geometry Snap build and chose to continue Sweep rather than move to another construction tool.
- Reframed the existing Sweep construction plane as the **Profile Plane**; no visible path construction plane is required.
- Generalized sweep-core.js from circular tubes to arbitrary closed 2D profiles through buildSweepProfile(), while retaining buildSweepTube() as a compatibility wrapper.
- Added Circle, Rectangle and custom Draw profile modes with live preview and pre-Apply profile editing.
- Added two interchangeable path sources: **Follow Edges** for SketchUp-style connected existing-edge routes and **Draw Path** for free 3D path authoring.
- Follow Edges deliberately works independently of the Geometry Snap toggle; Draw Path retains optional external Vertex/Edge/Face snapping.
- Free Draw Path uses an invisible view-facing working plane through the current path end instead of showing a path plane.
- Profile and Path construction remain live/editable until Apply; Apply still produces ordinary editable mesh.
- Added focused regression coverage for arbitrary-profile straight/bent Sweep generation and the profile-first dual-path runtime contract.
- Protected transform, Through, Shell/Solidify and frozen Beta 3 behavior remain untouched.
- Released via PR **#80**; squash merge `1855f447784d13067088dd179f472d4d2cc8e000`.
- Final PR Topology regression run **35583108817 PASS**.

## 2026-09-21 â€” v0.36.18.394 Sweep Apply redraw + Geometry Snap

- Fixed post-Apply Sweep viewport state: generated geometry now redraws immediately instead of leaving the construction plane visible until object selection changes.
- Added Geometry Snap to Sweep path authoring.
- Vertex targets take priority, then Edge, then true Face ray-hit points.
- Free drawing still falls back to the Sweep construction plane when no geometry target is acquired.
- Sweep path point storage extended from plane `u/v` to plane-local `u/v/w`, enabling snapped points to follow existing mesh geometry in 3D while remaining relative to the construction plane transform.
- Geometry Snap works on both point creation and point drag.
- Preserved touch navigation, live preview, Radius/Sides/Caps, parallel-transport frames and post-Apply single-selection/Boolean tint cleanup.
- PR **#79**, squash merge `375cced7bc5c2fd2e863cd16f631c3d2e2b379d9`.
- PR Topology regression **35574552705 PASS**.


## 2026-09-21 â€” v0.36.18.394 Sweep Apply redraw + 3D geometry snapping

- Fixed Sweep Apply stale-view bug: construction plane no longer remains visible until another object is selected.
- Apply Sweep now disposes its overlay, hides construction controls and forces an immediate viewport rebuild like Revolve.
- Geometry Snap during Sweep Path editing now targets visible external vertices, edges and face hit-points.
- Sweep path coordinates expanded from planar u/v to construction-local u/v/w, allowing snapped path points to sit off-plane and create a true 3D path.
- Free drawing remains construction-plane based when Geometry Snap is off or no target is found.
- PR #78; squash merge `300bf36b75306e413afc70760e4dc020f599a0ad`.
- Final PR regression run **35569411629** passed.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.


## 2026-09-21 â€” v0.36.18.393 Sweep Path foundation

- Released Phase D **Sweep Path** foundation from PR #77; squash merge commit: `403cfc677fa934f2c9c3b9a7a25fe50bf9c559f8`.
- Added Add â†’ Sweep Path construction object with movable/snappable construction plane and Pencil/mouse path authoring.
- Touch remains dedicated to normal BoxLab navigation while path editing is active.
- Added live circular-section preview with Radius, Sides 3â€“24 and Caps On/Off controls; Pencil sliders use the established Safari late-event guard.
- New `sweep-core.js` builds quad-ring tubes using parallel-transport section frames to reduce section flipping along bent paths.
- Apply converts to ordinary editable mesh, owns one mesh-history step, returns to authoritative single-object selection and resyncs Boolean viewport tint.
- V1 deliberately stays shallow: planar path + circular section; custom profiles, arbitrary 3D paths, twist/banking and corner fillets are deferred.
- Final PR regression run **35568629908** passed; post-merge main regression run **35568666909** passed.
- `src/multi-object-transform.js?v=0.36.1.0` remained untouched.


This is the concise append-only development log used for cross-chat continuity.

Do not record every tiny cache-busting or temporary deployment workflow commit. Record meaningful modelling, architecture, UI, stability, and release milestones.

Newest entries should be added at the top.

---

## 2026-09-21 â€” v0.36.18.392 Revolve Apply selection cleanup

- User observed an inactive cube showing amber while the freshly applied Revolve mesh was grey.
- Confirmed amber originated in Boolean/Object multi-selection viewport tinting, not Revolve geometry/material generation.
- Added authoritative Object-selection `single(id)` API to leave Multi mode and select one active object cleanly.
- Revolve Apply now resets to the active Revolve object and immediately resyncs Boolean UX, clearing stale operand tint.
- Valid Boolean A/B selection behavior is preserved.

## 2026-09-21 â€” v0.36.18.391 Revolve Active Tools auto-open

- User reported that after positioning/interacting with a Revolve Profile plane, Active Tools stayed closed and hid the Revolve-specific controls.
- Added construction-plane interaction detection from its initial vertex signature.
- Move / Rotate / Scale / Geometry Snap changes now automatically open and retain Active Tools for the active Revolve construction.
- Entering Edit Profile also opens/retains Active Tools.
- Uses the existing Shell/Solidify `data-keep-open` drawer contract; Apply or leaving construction releases the lock.
- No modelling-core changes.
- Released from PR **#75**; squash merge commit: `fd6b27f79fd1a78d51b3a96ba618e36ef1f43b34`.
- Final Topology regression passed in workflow run **35563645227**.

## 2026-09-21 â€” v0.36.18.390 Revolve profile point editing

- Continued from the successful .389 Revolve refinement baseline.
- Added explicit profile point selection and selected-point highlight.
- Tapping/pressing close to an existing profile segment inserts a new point into that segment rather than forcing append-only editing.
- Tapping elsewhere still appends to the profile end.
- Added Delete Point for selected profile points.
- Undo/Clear now clear stale selected-point state safely.
- Preserved touch navigation, plane positioning/snap, live preview, 3â€“64 segments, normal unification and Apply behavior.
- Released from PR **#74**; squash merge commit: `eb46b48f221ceea87432fdd7725afbd39977ece7`.
- Final Topology regression passed in workflow run **35563284475**.

## 2026-09-21 â€” v0.36.18.389 Revolve refinement

- .388 Revolve Profile UI received a strong hands-on pass; four refinements requested.
- Revolve Profile now starts in positioning mode (Edit Profile off), allowing Object Move/Rotate/Scale and existing Geometry Snap before drawing.
- Touch navigation remains live while profile editing: one-finger orbit and two-finger pan/pinch pass through; Pencil/mouse handles profile authoring.
- Segments minimum lowered from 6 to 3.
- Replaced per-face radial normal flipping with shared-edge winding unification plus one global shell orientation decision, fixing inward normal bands on concave profiles.
- Preserved live profile preview, plane-relative UV points, Apply behavior and legacy loose-edge Revolve.
- Released from PR **#73**; squash merge commit: `f733c23f7f15e861a10b2e607e54c684de9b92b5`.
- Final Topology regression passed in workflow run **35559953090**.

## 2026-09-21 â€” v0.36.18.388 live Revolve Profile construction

- User identified the missing authoring layer for Revolve: free Add Vertex points could not guarantee a coplanar profile or obvious revolve axis.
- Added Add â†’ Revolve Profile construction object.
- Construction object is a plane whose left edge is visibly blue and authoritative as the revolve axis.
- Profile points are normalized plane UV coordinates; Pencil/finger taps add points and direct drags reshape them while remaining on the plane.
- Profile chain connects automatically and points near the axis snap exactly to it.
- Live translucent revolve preview updates continuously when profile points or Segments change.
- Edit Profile can be toggled off for navigation and back on for further shaping.
- Added local Undo Point/Clear controls before Apply.
- Revolve core now exposes arbitrary-axis `buildRevolveFromPoints`; .386 loose-edge Revolve path remains intact.
- Apply converts construction to ordinary mesh in one history step.
- No changes to protected Array, Through/Extrude or multi-object transform.
- Released from PR **#72**; squash merge commit: `f6b0870e8651c212b8b3af83fb8ebbd0d068b086`.
- Final Topology regression passed in workflow run **35558948343**.

## 2026-09-21 â€” v0.36.18.387 component Delete key routing

- Extended Delete/Backspace UX from Object mode to Face, Edge and Vertex modes.
- New router delegates to the existing delete buttons instead of reimplementing deletion.
- Preserves each mode's established history/topology behavior and Object Multi/Group semantics.
- Ignores editable text controls and modified-key shortcuts.
- No protected modelling core changes.
- Released from PR **#71**; squash merge commit: `b955b9077a3ac0ec1290b04bee7d45d787ca8449`.
- Final Topology regression passed in workflow run **35557933604**.

## 2026-09-21 â€” v0.36.18.386 Revolve foundation

- .385 inward Extrude cut passed hands-on testing.
- Added Edge-mode Revolve for a standalone selected loose-edge open chain.
- Revolve axis is X/Y/Z through Object Origin; full 360Â° with Segments 6â€“64.
- Preview is non-destructive with translucent fill, wire overlay and axis guide.
- Axis/Segments rebuild preview live; Segments uses hardened Pencil range handling.
- Core orders the loose-edge chain, rejects branches/closed/partial/mixed profiles, and collapses points on the axis to single pole vertices.
- Apply replaces the loose profile with ordinary editable revolve faces in one history step and uses existing Object Manager save propagation.
- No changes to Array, inward Extrude/Through, or protected multi-object transform.
- Released from PR **#70**; squash merge commit: `2984d6dd4f3173652cdbbb2061cc736e3a77bba5`.
- Final Topology regression passed in workflow run **35557272061**.

## 2026-09-21 â€” v0.36.18.385 inward Extrude side-wall cut

- .384 endpoint-vector Array passed hands-on testing.
- Investigated inward Face Extrude screenshot artifact: duplicate extrusion walls overlapped existing exterior side faces.
- Reused the existing sequential region/Through topology classifier instead of inventing a parallel cutter.
- Sequential fallback now takes over immediately once the drag is meaningfully directed inward toward the opposing shell, rather than waiting for 55% travel.
- Added partial inward cut rebuild: clips swept exterior side-face regions, skips duplicate walls on exterior slots, adds recess walls on interior slots, and caps at the current depth.
- Mature Through kernel remains preferred when the drag reaches the far side.
- Partial and Through commits run through closed-topology gate and rollback on failure.
- Removed early history push at takeover; successful pointer-up is the history commit point.
- Outward Extrude and connected multi-face Extrude are unchanged.
- Released from PR **#69**; squash merge commit: `a1cbd03d782cb03529447af292c379ab731051bc`.
- Final Topology regression passed in workflow run **35548866964**.

## 2026-09-21 â€” v0.36.18.384 endpoint-vector Array UX

- Reworked Array from axis+spacing to sourceâ†’endpoint vector workflow.
- Array opens with exactly one END duplicate preview (Count=2).
- END copy supports direct Free/X/Y/Z movement; Free uses the camera plane and constrained modes adjust world-axis components.
- Count fills linked preview/committed copies evenly using endpoint * i/(Count-1).
- Removed Spacing slider as primary UX.
- Apply remains one history step and linked-instance creation still uses the established Object Manager API.
- Next task remains inward/negative Face Extrude cutting.
- Released from PR **#68**; squash merge commit: `daa7ef47b34a79f1b00c167217d4eeb116a349ea`.
- Final Topology regression passed in workflow run **35547016085**.

## 2026-09-21 â€” v0.36.18.383 Array direct spacing drag

- .382 Linear Array passed initial iPad hands-on testing.
- Added direct Pencil/finger spacing drag on any preview instance.
- Drag projects the selected world X/Y/Z axis into screen space and converts pointer movement back to world spacing.
- Later preview copies divide movement by their array index so the grabbed copy follows the gesture while all copies remain equally spaced.
- Orbit controls pause only during the direct spacing gesture and restore on release/cancel.
- Slider remains synchronized and available when the axis is too camera-aligned for a stable screen drag.
- No history is created during preview drag; Apply Array remains one scene-history operation.
- Next task is inward/negative Face Extrude cutting behavior.
- Released from PR **#67**; squash merge commit: `5babe7eb2905fe12907d0a6edc61b02d495cba73`.
- Final Topology regression passed in workflow run **35545622459**.

## 2026-09-21 â€” v0.36.18.382 Phase D Linear Array foundation

- Added Object-mode Linear Array using the existing linked-instance Object Manager path.
- Count is total objects including the source; spacing is world-space; axes X/Y/Z are supported.
- First tap arms a non-destructive translucent preview; Apply creates linked instances.
- Apply uses one Object-scene history snapshot and reactivates the source.
- Generated instance placement is committed through the existing live-mesh + saveActive instance derivation path rather than protected transform code.
- Count/Spacing Pencil sliders use explicit Pencil mapping and late native Safari event protection.
- Active Tools stays open while the preview is armed.
- No edits to protected multi-object-transform, Through, Boolean, Solidify core or Shell core.
- Released from PR **#66**; squash merge commit: `6871a0dbdfaa338b2528d53254c97d98bdd65158`.
- Final Topology regression passed in workflow run **35545288948**.

## 2026-09-21 â€” v0.36.18.381 Solidify preview backface visibility

- User screenshots confirmed the remaining preview visibility issue was Solidify, not Shell.
- Replaced Solidify's single translucent preview Mesh with a Group containing translucent DoubleSide fill plus brighter DoubleSide wireframe overlay.
- Disabled depth test/write on both preview layers so generated inner/back faces remain visible through the source sheet.
- Preserved direct preview thickness dragging by switching raycast to recursive Group traversal and using the hit child mesh matrix for normal projection.
- Preview disposal now traverses child meshes and disposes shared resources safely.
- No Solidify topology, offset solver, history or linked-instance behavior changed.
- Released from PR **#65**; squash merge commit: `a4ee4ae3779586be82365ee98f169527d49fb08d`.
- Final Topology regression passed in workflow run **35544854000**.

## 2026-09-21 â€” v0.36.18.380 Shell preview backface visibility

- User requested better Shell preview visibility from the reverse/interior side.
- Replaced wireframe-only preview with a two-layer Group: translucent DoubleSide fill plus brighter DoubleSide wireframe overlay.
- Both preview layers render depth-test/write disabled so inner/back faces remain legible through the source mesh.
- Preview disposal now traverses child meshes and disposes shared resources safely.
- No Shell topology, thickness, selection, history or Apply behaviour changed.
- Released from PR **#64**; squash merge commit: `39252588b9e7530fd276a0715739a040efc87d59`.
- Final Topology regression passed in workflow run **35544543433**.

## 2026-09-20 â€” v0.36.18.379 Shell Pencil late-native guard

- .378 still snapped to 0.01 under Apple Pencil hands-on testing.
- Pencil coordinate mapping was correct; Safari could emit a late native range input/change after pointerup and overwrite the value.
- Shell now retains Pencil ownership of the thickness value through two animation frames after release.
- Input/change handlers enforce the Pencil-owned value before updating output/preview.
- Finger/touch remains native after Pencil ownership clears.
- No topology/history/selection changes.
- Released from PR **#63**; squash merge commit: `13d9ea9aa3c58333abfc660dcd990ed26363d94f`.
- Final Topology regression passed in workflow run **35507874713**.

## 2026-09-20 â€” v0.36.18.378 Shell Pencil thickness parity

- User reported Shell Thickness worked correctly with finger input but Apple Pencil snapped the value back to 0.01.
- Root cause scope was the native iPad range-control Pencil path, not Shell topology.
- Added an explicit Pencil-only pointer handler on the Shell Thickness range.
- Pencil X position maps to slider bounds, clamps to min/max, snaps to the same step, and dispatches the normal input event so preview/output use the existing pathway.
- Pointer capture stabilizes Pencil dragging beyond the narrow slider track.
- Finger/touch native range behaviour remains unchanged.
- No Shell core, Solidify core, selection, drawer or history logic changed.
- Released from PR **#62**; squash merge commit: `4b50d300a72c41c774f74eb55daf18a220f8acdd`.
- Final Topology regression passed in workflow run **35507531277**.

## 2026-09-20 â€” v0.36.18.377 closed-solid Shell

- Phase D advanced from open-sheet Solidify to closed-solid Shell.
- Shell consumes the existing Face selection bridge rather than creating a parallel selection system.
- Selected Face(s) become openings; remaining solid Faces are compacted to an open manifold sheet and sent through the shared .374 Solidify offset/miter core.
- Added non-destructive preview with Shell Thickness and Apply Shell.
- Adjacent selected Faces can form one larger opening.
- Closed-input, loose-topology, all-faces-selected and invalid-opening guards run before live mutation.
- Final output is validated as watertight; Apply is one Object-scene history step and uses Object Manager save propagation.
- Added cube one-face and adjacent-two-face automated fixtures plus refusal cases.
- Released from PR **#61**; squash merge commit: `91de88416823050100ed3df3a40ec8886087095f`.
- Final Topology regression passed in workflow run **35507041994**.

## 2026-09-20 â€” v0.36.18.376 Solidify Active Tools drawer lock

- User reported that Active Tools collapsed during interactive Solidify thickness dragging, hiding Apply Solidify.
- Root cause path is the shared drawer exclusivity system; it already supports `data-keep-open="true"`.
- Solidify now temporarily claims that existing keep-open contract for the entire armed preview session.
- Active Tools is explicitly reopened if any competing UI path closes it before the preview is applied/cancelled.
- Keep-open ownership is released after Apply/Cancel/invalidation; `drawer-ui.js` remains unchanged.
- No topology, hard-fold, direct-drag or history logic changed.\n- Released from PR **#60**; squash merge commit: `77eab5bb8e441f5ce93801963c432dcf2f12bd86`.\n- Final Topology regression passed in workflow run **35506658206**.

## 2026-09-20 â€” v0.36.18.375 direct-drag Solidify thickness

- User requested direct interactive thickness control by dragging the translucent Solidify preview itself.
- Added preview ray-picking on the viewport.
- A picked preview face supplies a screen-projected normal axis; Pencil/finger drag along that axis maps to world-space thickness.
- Thickness slider/output remains synchronized for exact numeric fallback.
- OrbitControls is disabled only during the active thickness drag and restored on pointer-up/cancel.
- Preview shows generated inner shell + boundary walls rather than repainting the unchanged source sheet.
- Direct drag remains preview-only: no mesh mutation and no history entry until Apply Solidify.
- The .374 90Â° hard-fold/miter solver remains authoritative and unchanged.\n- Released from PR **#59**; squash merge commit: `3bc25065adfcc4de8c840c9fd00a6771cb6a2d59`.\n- Final Topology regression passed in workflow run **35506408342**.

## 2026-09-20 â€” v0.36.18.374 Solidify hard-fold offset + live preview

- User confirmed Solidify worked on flat sheets but reported incorrect thickness around a 90Â° multi-sheet fold.
- Root cause: the .372 core used a normalized averaged vertex normal, which under-offsets each source plane at hard folds.
- Replaced hard-fold displacement with offset-plane intersection / miter solving.
- Added an explicit 90Â° two-quad regression fixture requiring full requested thickness to both source planes.
- Added conservative guards for opposed folds, singular plane systems and excessive miters.
- Solidify now uses a two-stage preview workflow: Solidify â†’ live preview; Thickness slider updates non-destructively; Apply Solidify commits.
- Preview cancellation occurs when leaving Object mode or changing active object.
- Preview does not push history or mutate live geometry; final commit remains one Object-scene history step.
- Frozen `/beta-3/` remains unchanged.\n- Released from PR **#58**; squash merge commit: `85046592160df22d8bc12666ddd821cc1c44c13e`.\n- Final Topology regression passed in workflow run **35503005511**.

## 2026-09-20 â€” v0.36.18.373 visible-version ownership fix

- User observed live main apparently reverting to **v0.36.1.0**.
- Root cause was found in protected `src/multi-object-transform.js`, which contains legacy UI-only lines that stamp `#appVersion` and `document.title` to its own historical module version.
- Transform logic and the protected file/blob were deliberately left untouched.
- The top-bar version label now carries an explicit release-shell version stamp.
- `release-version.js` uses that shell value immediately and its existing observer reasserts the real app version if any older module mutates the label later.
- `version.json` remains the network/source-of-truth confirmation path.
- Phase D Solidify from .372 is unchanged.\n- Released from PR **#57**; squash merge commit: `3a7139dabc09731ffb29bb952c15ef1bb276559f`.\n- PR Topology regression passed in workflow run **35502647303**.

## 2026-09-20 â€” v0.36.18.372 Phase D Solidify foundation

- Phase D higher-level modelling started from the frozen v0.36.18.371 Beta 3 baseline.
- Audit confirmed no existing Shell/Solidify implementation was present.
- Added Object-mode Solidify for valid open manifold sheets.
- The new topology core duplicates the sheet, offsets the inner shell along averaged area-weighted vertex normals, reverses inner winding, and bridges every open boundary edge with a side quad.
- Input guards reject closed, non-manifold, branched-boundary, inconsistent-winding, duplicate/degenerate and zero-area inputs before mutation.
- Output must validate as a closed consistently wound manifold or the edit rolls back.
- Existing crease weights are mirrored to the inner shell.
- One authoritative Object scene-history checkpoint owns the operation; existing Object Manager save/linked propagation pathway is reused.
- Frozen `/beta-3/` remains untouched.
- Next Phase D slice: closed-solid Shell with selected-face removal, built on this same thickness core.\n- Released from PR **#56**; squash merge commit: `537c83069b749ff8ad8ed7a8887f7dc3e7f5b37a`.\n- PR Topology regression passed in workflow run **35501284867**.

## 2026-09-20 â€” Beta 3 frozen and published

- User completed the v0.36.18.371 hands-on iPad release gate with a **BIG PASS**.
- Frozen Beta 3 is an exact checkpoint of the approved v0.36.18.371 code-bearing release commit:
  - release commit: `c17fb0f996f406449975a1add5b774eadc30e529`
  - freeze PR: **#55**
  - freeze merge commit: `a227042e2bd2972c96361aedf7840bdcc62c78bb`
- `/beta-3/` was created by reusing the approved release commit's blob/tree SHAs, not by rewriting runtime files.
- Frozen checkpoint contains the approved app assets and source tree, including `index.html`, styles/assets, `src/`, `docs/`, `tests/`, package/version files and the Beta 3 release checklist.
- Live main runtime was not changed by the freeze operation.
- Public checkpoint URL: `https://crisbezz.github.io/BoxLab/beta-3/`
- Frozen Beta 3 should now be treated as immutable except for an explicitly approved emergency release fix.
- Phase D / post-Beta-3 development may resume on live `main`.

## 2026-09-20 â€” v0.36.18.371 Beta 3 release candidate

- Entered Beta 3 release-candidate hardening after user confirmation that v0.36.18.369 Group Boolean works.
- No new modelling feature was added.
- App/version metadata advanced to **v0.36.18.371**; .370 remains an abandoned, unmerged experimental branch.
- Added `BETA3_RELEASE_CHECKLIST.md` as the persistent hands-on release gate for iPad Safari.
- Added `tests/beta3-release-candidate-371.test.mjs` to guard the release-sensitive architecture and frozen pins:
  - linked-instance/navigation baseline `multi-object.js?v=0.36.18.367`
  - persistent inactive-object scene layer
  - authoritative selection-mode bridge
  - authoritative live-mesh publication before render rebuild
  - protected Group transform `object-origin.js?v=0.36.18.355`
  - protected `multi-object-transform.js?v=0.36.1.0`
  - fresh-load component Multi `component-multi-init.js?v=0.36.18.314`
  - mature Through loader pins
  - Clean for SubD `quad-clean.js?v=0.36.18.339`
  - Group Boolean compound path from .369
  - no-service-worker release policy
- Beta 3 scope freeze: fix only reproducible release-blocking regressions until the checkpoint is frozen.
- Planned frozen URL after user approval: `https://crisbezz.github.io/BoxLab/beta-3/`.
- PR **#54** Topology regression passed (`npm test`, workflow run **35495835508**) before merge.
- Released from PR **#54**; squash merge commit: `c17fb0f996f406449975a1add5b774eadc30e529`.

## 2026-09-20 â€” v0.36.18.369 shell-by-shell Group Boolean + persistent Swap drawer

- User test of .368 showed Group selection/A-B assignment worked, but Cut failed topology validation with boundary/non-manifold edges.
- Root cause: .368 concatenated every Group member into one disconnected EditableMesh and then fed that multi-shell mesh into the existing pairwise Boolean solver, which assumes a single closed solid operand.
- .369 keeps Group members as separate closed shells throughout the Boolean calculation.
- Added `splitConnectedShells()` to split pairwise results back into closed components after operations that can divide a solid.
- Added `solidsInteract()` using real face intersections plus point-in-solid containment so disjoint shells do not enter the pairwise solver unnecessarily.
- Group Cut:
  - starts with each A shell independently
  - applies every B cutter shell to every surviving A shell
  - drops shells that become empty
  - splits resulting geometry into connected shells before the next cutter
- Group Intersect:
  - evaluates every interacting A/B shell pair
  - collects the resulting closed pieces
  - normalizes overlapping result pieces through compound union
- Group Union:
  - incrementally unions only interacting/contained shells
  - genuinely disjoint shells stay separate
  - final closed shells are concatenated only after all pairwise Boolean solving is complete
- Group operand eligibility now validates every member as a closed manifold individually; it no longer uses a disconnected concatenated Group mesh as solver input.
- Result remains one normal editable object and may contain multiple disconnected closed shells where that is geometrically correct.
- User also reported Swap closed Active Tools.
- Boolean A/B UX now marks Active Tools as `keepOpen` while valid Boolean operands exist, explicitly opens it before Swap, and reopens it after active-operand activation.
- Protected linked-instance/navigation baseline `multi-object.js?v=0.36.18.367` remains untouched.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Released from PR **#53**; squash merge commit: `4520d63bb39e0b3b6f61287dd92b423377f3aad9`.

## 2026-09-20 â€” v0.36.18.368 Group Boolean convenience

- Built the queued Phase C Group Boolean workflow without introducing a Group geometry type.
- Group header selection is additive while Multi is active:
  - select Group A
  - tap Group B
  - both complete Groups become one Multi selection
- Boolean eligibility now accepts either:
  - the existing exactly-two-object workflow, unchanged
  - exactly two complete Groups with no partial/extra selected objects
- Each Group operand is built in memory with the existing `combineEditableMeshes()` Join helper.
- Existing Boolean solver remains authoritative for Union / Cut / Intersect.
- Reference members and locked members are refused.
- Source Group members are hidden only after one authoritative Object scene-history checkpoint.
- Boolean result is a normal unique editable object; no Group metadata is attached to the result.
- Undo can therefore restore original source objects, Group names/hierarchy, visibility and selection through the existing scene-history bridge.
- Existing Boolean A/B panel now understands Group operands:
  - active Group = A / amber
  - other Group = B / blue
  - all member rows and Group headers receive the corresponding A/B cue
  - Swap activates a member of the opposite Group to reverse A/B
- Protected linked-instance baseline `multi-object.js?v=0.36.18.367` remains pinned.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for additive Group selection, Group eligibility, history semantics, A/B UX and protected pins.
- Released from PR **#52**; squash merge commit: `960db8c5d89c987c82c2a95c8ab3dd3a7eccdf04`.

## 2026-09-20 â€” v0.36.18.367 touch orbit + selection-mode stability

- User confirmed .366 fixed linked Extrude commit/propagation.
- Remaining regressions:
  - after selecting another object with a finger, one-finger navigation became pan and pinch zoom broke
  - selecting/changing mode could still make non-active objects disappear
- Navigation root cause: .364 consumed the touch pointer-up after object activation even though OrbitControls had already received the matching pointer-down.
- OrbitControls therefore retained a stale touch pointer and interpreted the next one-finger gesture as a multi-touch gesture.
- Touch activation now uses the non-consuming path again so OrbitControls always receives pointer-up cleanup.
- .365 persistent inactive scene layer means the old pointer-up suppression is no longer needed to protect inactive bodies.
- Object activation now schedules an additional inactive-layer refresh at microtask + requestAnimationFrame boundaries after the full activation handoff.
- `currentMode()` now reads `__boxlabSelectionBridge.mode()` first, using the DOM active-button class only as fallback.
- This removes a one-render lag where Object â†’ Edge/Face/Vertex could be processed as the previous mode during `saveActive()`.
- .366 authoritative live-mesh publication remains unchanged.
- Protected `object-origin.js?v=0.36.18.355` and `multi-object-transform.js?v=0.36.1.0` remain untouched.
- Added regression coverage for OrbitControls pointer-up visibility, authoritative mode source, post-activation inactive rebuild and protected pins.
- Released from PR **#51**; squash merge commit: `db74acc2c2069c16b583874c67f4051ba1310fc4`.

## 2026-09-20 â€” v0.36.18.366 authoritative live-mesh bridge timing

- User confirmed .365 fixed ordinary object activation persistence, but two linked-instance regressions remained:
  - Extrude showed all linked peers updating during preview, then the edit snapped back on commit
  - changing from Object mode to Edge mode caused inactive objects to disappear
- Root cause: `__boxlabBridgeState.mesh` was being published indirectly by `EditableMesh.edges()`.
- The multi-object `THREE.Group.add(body)` hook calls `saveActive()` as soon as the new body is added.
- On renders where the core lexical `mesh` had just been reassigned (notably direct Extrude / Inset preview), the bridge could still point at the previous mesh object when `saveActive()` ran.
- Result: screen showed the new mesh, but linked save/propagation could commit the previous mesh and snap the shared source back.
- Mode changes could likewise rebuild inactive linked geometry from stale bridge state.
- `main.js::renderMesh()` now explicitly assigns:
  - `globalThis.__boxlabBridgeState.mesh = mesh`
  - before `clearGroup(root)`
  - before the active body is created/added
- Downstream modules therefore see the exact lexical mesh being rendered in that frame.
- No linked-source algorithm was otherwise changed.
- Persistent inactive scene layer from .365 remains in place.
- Linked creation/propagation from .363 and touch isolation from .364 remain in place.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for publish-before-clear/body-add ordering and protected pins.
- Released from PR **#50**; squash merge commit: `40e25b3425971a970ac97641734517be91e6df42`.

## 2026-09-20 â€” v0.36.18.365 persistent inactive-object scene layer

- User confirmed .364 still failed immediately: the first finger activation left only the newly active object visible; all other objects remained in the Outliner but disappeared from the viewport.
- Root cause is architectural: inactive object meshes were being injected directly into the same core modelling `root` group that `renderMesh()` destroys with `clearGroup(root)` on every rebuild.
- That made inactive visibility depend on the monkey-patched `root.add(body)` hook re-inserting all inactive meshes at exactly the right moment after every active switch.
- Inactive objects now live in a dedicated persistent scene sibling:
  - `BoxLab Inactive Objects`
  - attached directly to the scene
  - not a child of the core modelling root
- Every active body rebuild now refreshes this dedicated layer rather than injecting peers into `root`.
- `clearInactiveLayer()` explicitly removes/disposes the old inactive meshes before rebuilding.
- Core `renderMesh()` is free to clear/rebuild its modelling root without deleting inactive object bodies.
- Ray-picking remains valid because `inactiveBodies` still tracks the scene-layer meshes directly.
- Studio/render modes still apply to each inactive body and Studio bounds continue to include `boxlab-inactive-body`.
- Linked propagation and atomic linked creation from .363 remain unchanged.
- Touch event isolation from .364 remains unchanged.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for persistent scene-layer ownership, rebuild behavior, linked propagation retention and protected pins.
- Released from PR **#49**; squash merge commit: `8acba4d282d1c51293f9b9cf08ea7c462ac7ac6e`.

## 2026-09-20 â€” v0.36.18.364 touch object activation render-race fix

- User confirmed .363 restored linked edit propagation, but finger-tapping a different object still made every non-tapped linked peer disappear from the viewport while their Outliner rows remained.
- Root cause was a touch-only event collision between the multi-object activation layer and the core modeller's background-tap handler.
- On touch pointer-down over an inactive object:
  - core modeller cannot ray-pick inactive bodies because it only considers the active `body`
  - core therefore arms a background tap
- On pointer-up:
  - multi-object layer correctly activates the inactive object
  - but .363 passed `stopEvent=false`, allowing the same pointer-up to continue into core
  - core then completed its stale background tap and called another `renderMesh()`, racing the inactive-body rebuild
- Touch object activation now calls `handleViewportActivation(event, true)`.
- When an inactive object is actually hit, the event is prevented and stopped immediately after activation, so the core background-tap handler cannot run a second render.
- Ordinary background taps remain unaffected because `handleViewportActivation()` only consumes the event when it actually handles an inactive/locked object hit.
- Linked propagation logic from .363 remains unchanged.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for consuming touch activation, non-hit fallthrough, linked propagation retention and protected pins.
- Released from PR **#48**; squash merge commit: `001b4078e9fe38c365797794341b9bbfe467af39`.

## 2026-09-20 â€” v0.36.18.363 atomic linked-duplicate creation

- User reported two regressions after .362:
  - a linked duplicate made from another linked duplicate did not propagate edits
  - finger-selecting a different object could make linked copies disappear from the viewport while their Outliner rows remained
- Root cause: `linkedDuplicateObject()` created and activated the new object first, then attached `sourceId` and `instanceMatrix` afterward.
- That allowed a new linked copy to enter the scene/activation lifecycle temporarily as a normal independent object.
- `addObject()` now accepts optional linked metadata:
  - `sourceId`
  - `instanceMatrix`
  - `origin`
- `linkedDuplicateObject()` now:
  - resolves the shared source
  - captures source instance placement
  - evaluates source Ã— placement
  - creates the new object with linked metadata already attached
  - only then allows normal activation/rendering
- No post-activation reassignment of `copy.sourceId` or `copy.instanceMatrix` remains.
- This makes first-generation and second-generation linked duplicates follow the same creation path.
- Existing .362 source Ã— matrix regeneration remains in place for active/inactive rendering.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for atomic linked metadata, second-generation propagation, inactive linked rendering and protected pins.
- Released from PR **#47**; squash merge commit: `4f0441660512c4eacf557320d8a5f935b931243e`.

## 2026-09-20 â€” v0.36.18.362 linked-instance placement stability

- User reported linked instances could be moved and modelled independently, but selecting a different peer caused them to jump together and lose independent placement.
- Root cause was a split source-of-truth problem between cached evaluated world meshes and shared source + instanceMatrix state.
- In Object mode, `saveActive()` still first attempts to recover a placement matrix from shared source â†’ live mesh.
- If placement recovery succeeds, only that instance's `instanceMatrix` is updated.
- If placement recovery fails, BoxLab now treats the live mesh as a shared-geometry edit at the existing instance placement:
  - transforms live world mesh back through the current instance matrix
  - updates the shared local source
  - increments source revision
  - regenerates linked peers from shared source Ã— each peer's own instanceMatrix
- Activating a linked object now regenerates its world mesh from shared source Ã— instanceMatrix before loading it into the live mesh.
- Inactive linked rendering also regenerates from shared source Ã— instanceMatrix rather than trusting stale cached world geometry.
- Intended contract is now explicit: **shared geometry, independent placement**.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for placement fallback, activation regeneration, inactive rendering and protected pins.
- Released from PR **#46**; squash merge commit: `8dcef36d789bf6d42bc092aa2897115789c636bd`.

## 2026-09-20 â€” v0.36.18.361 per-object Outliner SubD toggle

- Added a compact per-object **S** button to each editable Object row.
- Outliner row layout is now **Name / S / Visibility / More**.
- **S** directly reflects the existing per-object `object.settings.subd` state.
- Lit/active S = SubD Preview on; dim S = off.
- Toggling an inactive object updates its existing stored modifier settings and refreshes the viewport without making it active.
- Toggling the active object drives the existing `#subdToggle` control and then re-captures the same authoritative object settings, so the Outliner and Modifiers drawer stay synchronized.
- Each SubD toggle creates one Object scene-history checkpoint.
- Reference objects keep SubD disabled.
- No new subdivision implementation or modifier state was introduced; existing `displayMeshFor()`, `subdivide()`, SubD level and Cage controls remain authoritative.
- Contextual Origin/Pivot UI from .360 and compact Outliner behavior remain unchanged.
- Protected `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for row presence/state, active/inactive synchronization, Reference exclusion and protected pins.
- Released from PR **#45**; squash merge commit: `81121843def91f766c8f0b25f6b5cc479671598b`.

## 2026-09-20 â€” v0.36.18.360 contextual Object controls

- Continued UI/UX polish on the protected v0.36.18.355 Group transform baseline.
- Audited Object-mode Origin/Pivot controls and confirmed:
  - Origin presets are single-object controls.
  - Pivot mode only affects multi-object / grouped Scale and Rotate behavior.
- Object UI now exposes a lightweight selection-context class from authoritative Object Management:
  - single-object context
  - multi / whole-Group context
- Presentation is now contextual:
  - single object â†’ compact Origin row shown, Pivot row hidden
  - Multi / whole Group â†’ compact Pivot row shown, Origin row hidden
- Origin/Pivot button dimensions, gaps and labels are tightened for iPad without changing their handlers.
- Object Selection toolbar is forced into a compact five-button strip with smaller gaps and a tighter status readout.
- No changes to Origin/Pivot maths, Group selection, Group transforms, linked instances, Boolean behavior or Reference protection.
- Protected `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `object-management.js â†’ drawer-ui.js â†’ index.html` cache chain.
- Added regression coverage for contextual visibility, compact Selection layout and protected pins.
- Released from PR **#44**; squash merge commit: `41fa0636d5b601cd059afe4bc911f4f36b4a9dab`.

## 2026-09-20 â€” v0.36.18.359 Outliner Delete restoration + keyboard Delete

- User reported that compact Outliner polish had made object Delete too hard to find and requested a keyboard shortcut.
- Every object-row **More** menu now includes **Delete Object**.
- Row-level Delete removes that specific object and creates exactly one Object scene-history checkpoint.
- Global/footer Delete keeps its existing authoritative history capture; `deleteActive()` therefore suppresses a second internal checkpoint.
- In Object mode, hardware-keyboard **Delete** and **Backspace** trigger the existing authoritative Delete button.
- Keyboard Delete therefore inherits current selection semantics:
  - single object â†’ delete active object
  - Multi selection â†’ delete selected objects
  - whole Group selection â†’ delete selected Group members through the existing Multi pathway
- Keyboard handling ignores Meta/Ctrl/Alt-modified shortcuts and does not fire inside inputs, textareas, selects, contenteditable elements or the BoxLab Rename dialog.
- Added future roadmap item for **Group Boolean convenience** using temporary Join-derived compound operands rather than a new Group geometry type.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for row Delete, keyboard Delete/Backspace, editable-field protection and one-step history semantics.
- Released from PR **#43**; squash merge commit: `d9da984e331e561dc2a490554df95eaf8f1e7f94`.

## 2026-09-20 â€” v0.36.18.358 anchored upward Outliner popovers

- User confirmed v0.36.18.357 still rendered Group More downward on iPad despite `bottom:` CSS.
- Replaced bottom-offset positioning with an explicit Safari-resistant anchor:
  - popup `top:0`
  - `bottom:auto`
  - translated upward by its own full height
  - critical positioning uses `!important`
- Applied consistently to Object row More, Group More and footer Object-action More.
- No changes to selection, Group hierarchy, transforms, linked instances, Boolean behavior or Reference protection.
- Protected `object-origin.js?v=0.36.18.355` and `multi-object-transform.js?v=0.36.1.0` remain untouched.
- Released from PR **#42**; squash merge commit: `59ec46a6e8198befabfc5723928cc0df525da5f2`.

## 2026-09-20 â€” v0.36.18.357 upward Outliner popovers

- User screenshot showed the compact Object **More** menu opening downward near the bottom of the Objects drawer, causing Lock/Solo to be clipped by the drawer edge.
- Object row More menus now open upward from the dots.
- Group row More menus now open upward from the dots.
- Bottom Object action More menu also opens upward.
- This is CSS/layout only; no changes to selection, Group hierarchy, transforms, linked instances, Boolean behavior or Reference protection.
- Protected Group transform baseline remains `object-origin.js?v=0.36.18.355`.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `object-management.js â†’ drawer-ui.js â†’ index.html` cache chain.
- Added regression coverage for upward popover positioning and protected pins.
- Released from PR **#41**; squash merge commit: `d7c4655f125c0811bbee12c8733da02090ec3926`.

## 2026-09-20 â€” v0.36.18.356 compact Outliner polish

- User confirmed v0.36.18.355 as the stable Group baseline and approved continuing UI/UX polish.
- This build is presentation-only around the Object Outliner; Group selection/transform routing from .355 is intentionally untouched.
- Object rows are reduced from permanent **Name / Visibility / Lock / Solo** controls to **Name / Visibility / More**.
- Object **More** contains the existing Lock/Unlock and Solo/Exit Solo actions; the underlying behavior and handlers are preserved.
- Group rows are reduced from **Disclosure / Name / Visibility / Lock / More** to **Disclosure / Name / Visibility / More**.
- Group **More** now contains Lock/Unlock, Rename Group and Ungroup.
- The bottom Object action stack is reduced from three rows to **Add / Duplicate / More**.
- The existing Rename, Linked Duplicate, Make Unique and Delete buttons are physically moved into the Object More menu so their existing IDs, handlers and Multi enable/disable logic remain authoritative.
- Object and Group rows now share a denser visual rhythm with 28â€“32 px touch targets and fewer permanent boxed controls, following the compact scene-tree direction established by the user's Nomad reference.
- No changes to Group membership, selection semantics, transform routing, Boolean geometry, linked-instance geometry or Reference protection.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- `object-origin.js?v=0.36.18.355` remains pinned to the confirmed working Group transform baseline.
- Refreshed `multi-object.js`, `object-management.js`, `drawer-ui.js` and outer release cache pins.
- Added regression coverage for compact Object/Group row structure, relocated action buttons and protected Group transform pins.
- Released from PR **#40**; squash merge commit: `562dd8697aca5c4a2d9b6c39729e8d725857320b`.

## 2026-09-20 â€” v0.36.18.355 whole-Group transform routing fix

- User reported that a hierarchy-declared Group could still move as separate ordinary selected objects on iPad/Pencil, and that the two grouped objects still showed amber/blue instead of unified Group amber.
- Root cause 1: `object-origin.js` only treated Move as a grouped transform when group expansion added extra IDs. If every Group member was already selected, `groupedExpansionActive()` returned false and Move fell back to ordinary object behavior.
- Root cause 2: the legacy selection wrapper replaced `__boxlabObjectSelection` without forwarding `wholeGroupId`, so downstream viewport selection code could not see whole-Group context.
- Added `wholeGroupSelectionActive()` and made Move use the grouped pivot/transform pathway when either:
  - selecting a member expands to more Group members, or
  - exactly one whole Group is already selected.
- The legacy wrapper now forwards `wholeGroupId`, authoritative owner metadata and refresh.
- The wrapper continues to suppress generic Multi-transform interception for grouped Move so the existing group-aware origin/pivot transform pathway owns the gesture.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed the stale `object-origin.js` cache pin from .351 to .355 through `drawer-ui.js`, and refreshed the outer release cache chain for iPad/Safari.
- Added regression coverage for whole-Group Move routing, wrapper context preservation, cache refresh and the protected transform pin.
- Released from PR **#39**; squash merge commit: `1cace3102b45dcf6d830849efbda0a82e66f3307`.

## 2026-09-20 â€” v0.36.18.354 whole-Group viewport selection context

- User screenshot showed a selected/moving Group with no viewport-level Group selection feedback while an unrelated previously active object (Cube 2) still showed its Object-mode cage/verts and active Outliner emphasis.
- Root cause: Group selection was a higher-level Multi selection but `activeId` could remain outside the selected Group, while the base renderer continued presenting that active object as the visible Object selection.
- Group selection now ensures the hidden active/primary object belongs to the selected Group. If the previous active object is outside the Group, BoxLab promotes an editable Group member as primary.
- The authoritative Object selection API now exposes `wholeGroupId` when exactly one complete Group is selected.
- Whole-Group selection is a first-class visual state:
  - all selected Group member bodies are tinted amber in the viewport
  - ordinary two-object Multi selection still uses amber primary + blue secondary
  - selected Group header gets explicit amber emphasis
  - child object rows lose stale individual active/selected emphasis while Group context is active
- The multi-object render observer now suppresses the active member's normal Object cage/vertex/mirror-edge overlays as they are created while a whole Group is selected, so they do not reappear during Move/Rotate/Scale refreshes.
- Leaving Group context restores normal single-object cage behavior automatically.
- Group transforms themselves remain on the existing protected expansion/transform pathways.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `multi-object.js`, `object-management.js`, `boolean-ux-history.js`, `drawer-ui.js` and `index.html` cache pins.
- Added regression coverage for in-Group primary promotion, explicit whole-Group context, amber Group tint, cage suppression and protected cache/transform pins.
- Released from PR **#38**; squash merge commit: `7ab87d240569f71a6cdf82f79405411241db989e`.

## 2026-09-20 â€” v0.36.18.353 focused Rename + live Group header refresh

- User reported Group Rename either did not work or did not update the visible Group name, and requested that Rename open with the edit cursor already inside the text field.
- Root cause of the stale Group label: once a compact Group block had been composed, later `updateUI()` calls did not reconcile the already-existing header text/state.
- Added `reconcileExistingHierarchy()` so existing Group rows refresh their:
  - Group name
  - disclosure/collapse state
  - visibility state
  - lock state
- Invalid/stale Group blocks are unwrapped back to object rows so hierarchy changes can be rebuilt cleanly.
- Added a BoxLab-native Rename dialog shared by Object and Group rename.
- Rename input is focused and its current text selected immediately, with repeated focus/select on the next animation frame and a short iPad/Safari retry.
- Object Rename no longer uses `window.prompt`.
- Group Rename uses the shared focused dialog, preserves the existing Object scene-history checkpoint, and updates the visible Group header immediately via normal UI reconciliation.
- Enter confirms, Escape/Cancel dismisses.
- Group ownership, compact hierarchy, two-object amber/blue scene cue, numbered duplicate naming, Boolean B-numbering, linked instances and Reference protection remain unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `multi-object.js`, `object-management.js`, `drawer-ui.js` and `index.html` cache pins.
- Added regression coverage for focused rename behavior, shared Group Rename routing, live Group header reconciliation and protected cache/transform pins.
- Released from PR **#37**; squash merge commit: `3816c57f1ecfa2fd1d1ff150f9dac098b888cbe4`.

## 2026-09-20 â€” v0.36.18.352 two-object colour cue + compact naming

- User clarified that the amber/blue viewport colouring was useful as a general two-object Multi-selection indicator, even though Boolean-specific Outliner takeover was not.
- Restored viewport tint for exactly two selected objects in Object mode:
  - active / primary object = amber
  - second selected object = blue
- Outliner remains neutral; Boolean A/B row borders/badges are not restored as a generic Multi-selection treatment.
- Ordinary Duplicate naming now uses padded sibling numbers instead of `copy`: `Cube` â†’ `Cube 01` â†’ `Cube 02`.
- Duplicating an already numbered object continues the same base-name family rather than nesting suffixes.
- Linked Duplicate and Multi Duplicate use the same numbered object-name allocator.
- Boolean result naming is now compact: active/base object stem + `B1`, `B2`, etc., instead of concatenating active name + operation + cutter name.
- Boolean operation status text and geometry behavior remain unchanged.
- Group ownership / compact hierarchy from .351 remains unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `multi-object.js`, `object-management.js`, `boolean-ux-history.js`, `boolean-prototype.js`, `drawer-ui.js` and `index.html` cache pins.
- Added regression coverage for two-object viewport tint, numbered Duplicate/Linked/Multi naming, Boolean B-numbering and protected cache/transform pins.
- Released from PR **#36**; squash merge commit: `c848cf3f867edcfd732b21d400f11d734b614caf`.

## 2026-09-20 â€” v0.36.18.351 Group ownership + Boolean UI cleanup

- User reported that the visible Group Selection button did not actually produce the compact Group hierarchy and that the amber/blue Boolean A/B treatment still dominated the Object rows.
- Root cause: legacy `object-origin.js` still owned Group/Ungroup mutation. It assigned `groupId` and added per-object `G#` tags, but did not notify the newer hierarchy renderer; therefore the compact Group row was never built.
- `object-management.js` is now the authoritative owner of Group/Ungroup mutations as well as Group hierarchy presentation.
- Added `__boxlabObjectGroups` API for Group Selection / Ungroup / Select / Rename / refresh.
- Legacy `object-origin.js` now delegates Group/Ungroup and only consumes group membership for transform expansion; legacy `G#` row tags are removed.
- Group Selection now updates the hierarchy immediately in the same action, so a newly formed Group becomes a visible compact Group row without waiting for an unrelated Outliner redraw.
- Removed duplicate automatic history checkpointing on legacy Group buttons; authoritative Group API owns the single history step.
- Generic two-object Multi selection no longer triggers Boolean A/B Outliner borders, operand badges, viewport tinting, or automatic drawer forcing.
- Boolean A/B information remains in the Boolean operand controls and Boolean operations themselves are unchanged.
- This allows two-object selection for Grouping, Join, transforms or other workflows to remain visually neutral.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `object-management.js`, `object-origin.js`, `boolean-ux-history.js`, `drawer-ui.js` and `index.html` cache pins.
- Added regression coverage for authoritative Group ownership, legacy delegation, immediate hierarchy refresh, neutral generic Multi selection and protected transform/cache pins.
- Released from PR **#35**; squash merge commit: `8faa0cb38cd25f1a1acf561929d6685fc0aabe6e`.

## 2026-09-20 â€” v0.36.18.350 compact Group tree

- User supplied a dense scene/group hierarchy reference and reported the current Group UX still consumed too much vertical space.
- Kept the existing Group ownership and transform model; no second hierarchy system was introduced.
- Existing Groups now present as a compact Outliner tree row with disclosure, Group name, visibility, lock and a small More menu.
- Group children are more tightly indented beneath the header with a simple tree guide rather than a large rounded container.
- Group More menu contains **Rename Group** and **Ungroup**; the normal Object **Rename Group** action from v0.36.18.349 remains valid.
- The old Group/Ungroup control strip is no longer permanently visible. **Group Selection** appears only when 2+ selected objects can actually form a new Group; the plumbing Ungroup control remains hidden for existing history-safe behavior.
- Group visibility and lock now checkpoint authoritative Object scene history before state changes, so each action has predictable Undo/Redo.
- Collapse remains a lightweight Outliner presentation state rather than a destructive modelling action.
- Existing automatic Group transform expansion, linked-instance behavior, Reference read-only protection and Group metadata persistence remain unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `object-management.js â†’ drawer-ui.js â†’ index.html` cache chain for iPad/Safari.
- Added regression coverage for contextual Group creation, compact tree structure, More actions, history-safe visibility/lock and protected cache/transform pins.
- Released from PR **#34**; squash merge commit: `11843516865bfcb50aa4d5686d7405611ba567e0`.

## 2026-09-20 â€” v0.36.18.349 first-class Group selection UX

- User reported that normal **Rename** stayed disabled after selecting a whole Group and that Group interaction still felt fragmented.
- Audit confirmed a selected Group is represented as a Multi selection of all member objects, but the normal Object action row still treated every multi-selection as anonymous objects.
- Added one-whole-group detection to the authoritative Object management layer.
- When exactly one complete Group is selected, the existing **Rename** button now enables and changes label to **Rename Group**.
- Rename Group uses the existing group name store and authoritative Object scene-history checkpoint, so it remains one Undo/Redo step.
- Partial/mixed multi-selections still cannot rename as a Group.
- Selected Group readout now shows the Group name and member count instead of the generic multi-selection message.
- Strengthened the selected Group header visual state.
- Simplified the Group header: group name is the primary selection target; collapse, visibility and lock stay directly available; the old tiny rename pencil was replaced by a direct **Ungroup** action because rename now belongs to the standard Object action row.
- Existing Group Selection / Ungroup controls, automatic whole-group transforms, linked instances and Reference protection remain unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Updated `object-management.js â†’ drawer-ui.js â†’ index.html` cache chain for iPad/Safari.
- Added regression coverage for whole-group detection, Rename Group routing, simplified header and protected transform/cache pins.
- Released from PR **#33**; squash merge commit: `12fdaa389d507799253482bd7c8f4747a1e1a8f4`.

## 2026-09-19 â€” v0.36.18.348 persistent Group organization

- Mandatory Phase C audit confirmed BoxLab already had one authoritative Group implementation: membership and transforms are owned by `object-origin.js`, while the grouped Outliner hierarchy / names / collapse UI are owned by `object-management.js`.
- No second hierarchy or group-transform layer was added.
- Audit found Object scene snapshots preserved each object's `groupId` but did not preserve custom group names or collapsed/expanded state.
- Added group metadata to the authoritative Object scene snapshot and restore path.
- Restore filters metadata against group IDs that genuinely exist in the restored scene, preventing stale names/collapse flags from attaching to unrelated later groups.
- Group Rename now checkpoints Object scene history before changing the label, making rename one Undo/Redo step.
- Stale name/collapse metadata is pruned when a group truly disappears.
- Existing Group membership, automatic whole-group transform expansion, linked-instance behavior and Reference protection remain unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Updated the `object-management.js â†’ drawer-ui.js â†’ index.html` cache chain for iPad/Safari.
- Added regression coverage for metadata snapshot/restore, rename history, stale metadata pruning and protected transform/cache pins.
- Released from PR **#32**; squash merge commit: `cf80a9bd11a4916eb586e954a2152b04dd46b49f`.

## 2026-09-19 â€” v0.36.18.347 Join / Boolean scene-history consolidation

- Phase C audit confirmed existing **Join** is already authoritative in Object > Active Tools and already checkpoints through the Object scene-history bridge.
- Audit confirmed Boolean already uses the same Object scene checkpoint before creating its result, but `boolean-ux-history.js` still installed an older second Undo/Redo wrapper with private Boolean stacks.
- Removed that parallel Boolean history layer instead of adding another result-management system.
- Boolean A/B operand colours, Swap control, active/base semantics, solver dispatch, cleanup chain and button ownership are unchanged.
- Boolean still hides only the two selected operands and creates a new unique editable result; selected linked operands are not propagated into the result and unselected linked peers remain untouched.
- Object scene snapshots remain responsible for restoring `sourceId` and `instanceMatrix` on Undo/Redo.
- Reference operands remain excluded from Join and Boolean.
- Protected `src/multi-object-transform.js?v=0.36.1.0` and `styles.css?v=0.36.18.270` remain untouched.
- Added regression coverage enforcing one authoritative scene-history owner for Join/Boolean and protecting unique-result / linked-peer / Reference behavior.
- Released from PR **#31**; squash merge commit: `ebc9ec498d16b82301fc86e4bc3203afdd9d5cd2`.

## 2026-09-19 â€” v0.36.18.346 Multi linked-instance parity

- Released **v0.36.18.346** from PR #30; squash merge commit: `c9e52c091da47a5e88539a14a9abba7807fe45f6`.
- Mandatory stronger-Multi audit confirmed BoxLab already had Object Multi Move / Scale / Rotate, numeric transforms, pivot modes, grouping, ordinary Multi Duplicate, Join and Boolean.
- No second multi-transform system was added; protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.
- The genuine gap was linked-instance parity while Object Multi was active.
- The existing **Linked Duplicate** control now operates on every selected editable object when Multi is active.
- Selected Reference guides are skipped and remain protected.
- Multi Linked Duplicate preserves each object's current placement, visibility and linked-source semantics.
- Duplicated group relationships are recreated as a new linked group set rather than mixing copies back into the source group.
- The newly created linked copies become the current Multi selection and Move is re-armed for immediate placement.
- The existing **Make Unique** control now detaches every selected linked object when Multi is active.
- Multi Make Unique commits as one scene-history step; selected unlinked objects are ignored.
- Ordinary Duplicate and ordinary Multi Duplicate remain independent copies and never silently become linked.
- Shared-source registry lifetime remains unchanged so Object Undo/Redo can restore prior linked metadata safely.
- First PR regression run failed only because the new single-control test regex was too broad; every implementation contract passed. The test was tightened to the actual ownership invariant.
- Corrected PR topology regression run **35437992611** passed before merge.

## 2026-09-19 â€” v0.36.18.345 Safari native-selection interaction guard

- Released **v0.36.18.345** from PR #29; squash merge commit: `296c2742faff6734f9af422a5050918a700dceb4`.
- Added a standalone `src/app-interaction-guard.js` to prevent Safari/iPad native text/element selection, touch callouts and drag-selection from washing the modelling UI blue during touch/Pencil work.
- The guard applies `user-select:none`, `-webkit-user-select:none`, and `-webkit-touch-callout:none` across BoxLab chrome and the modelling surface.
- `selectstart` and native `dragstart` are prevented outside editable controls.
- Real editable controls remain exempt: `input`, `textarea`, `select`, `contenteditable`, and explicit `data-allow-selection=true` targets retain normal selection/value interaction.
- Existing `touch-action:none` gesture routing was left unchanged.
- Protected `styles.css?v=0.36.18.270`, Pencil/orbit handlers, and `src/multi-object-transform.js?v=0.36.1.0` were untouched.
- Added regression coverage for native-selection suppression, editable-field exceptions, single authoritative loader, and protected gesture/transform pins.
- PR topology regression run **35437021036** passed on the first run.

## 2026-09-19 â€” v0.36.18.344 Reference guides permanently read-only

- Released **v0.36.18.344** from PR #28; squash merge commit: `6118b0f60073573fb035c31d17d2082512c31d41`.
- Mandatory audit confirmed imported **Reference** meshes already participated in existing cross-object snapping; no second reference/snap system was added.
- The real gap was protection consistency: Reference objects could be unlocked through Outliner, Multi, or Group lock controls.
- Reference objects are now permanently read-only modelling guides.
- `multi-object.js` forces `kind='reference'` objects to `locked=true` at creation, including duplicated References.
- The per-object lock control renders Reference as `R`, is disabled, and describes it as an always-read-only guide.
- Multi lock/unlock operates only on editable selected objects and leaves selected References locked.
- Group lock/unlock operates only on editable group members; reference-only groups expose a disabled `R` control.
- Scene-history restore reasserts `locked=true` for every Reference, so Undo/Redo cannot revive an unlocked guide.
- Reference visibility, solo/isolate behavior, Outliner identity, and existing cross-object snap eligibility remain unchanged.
- Editable-object lock behavior remains unchanged.
- Added regression coverage for import kind/lock, single/Multi/Group protection, scene restore, duplicated References, and continued cross-object snap eligibility.
- PR topology regression run **35436090086** passed on the first run.

## 2026-09-19 â€” v0.36.18.343 linked-instance foundation + Make Unique

- Released **v0.36.18.343** from PR #27; squash merge commit: `b35e542b93469b8c957b55c3c3de1e96e9ebc65a`.
- Mandatory audit confirmed current main had **no live linked-instance system**; the old v0.36.19.x instance foundation had been deliberately removed when BoxLab was restored to the pre-instance modelling baseline.
- Ordinary **Duplicate remains independent** and continues to clone geometry normally.
- Added explicit **Linked Duplicate** and **Make Unique** controls in the Objects drawer.
- Linked instances are implemented inside the authoritative `multi-object.js` manager rather than through an external pointerup/event synchronizer.
- Each link group owns one shared local source mesh; each object stores its own `instanceMatrix` and evaluated world-space mesh.
- Object-mode Move / Rotate / Scale update only that instance's placement matrix.
- Component edits are transformed back to shared local source space, then regenerated into every linked peer using each peer's own placement.
- Added tested placement solving for both solid 3D meshes and planar meshes; solved transforms are validated against all vertices before acceptance.
- **Make Unique** removes only the active object's link metadata while leaving its evaluated geometry unchanged.
- **Join** explicitly detaches the combined primary result from any link group.
- Reset clears the linked-source registry.
- Object scene snapshots now preserve `sourceId` and `instanceMatrix`.
- Linked Duplicate captures the scene-before state and transfers that checkpoint to the newly active duplicate's history so Undo can restore the pre-duplicate scene.
- Outliner labels linked peers with `Link Ã—N`.
- The protected `src/multi-object-transform.js?v=0.36.1.0` was not modified.
- First PR run failed only because the previous .342 UI test hard-coded the parent drawer cache version. All new instance tests passed on that run. The parent-loader assertion was made version-resilient.
- Corrected PR topology regression run **35435127026** passed before merge.

## 2026-09-19 â€” v0.36.18.342 File menu fit + stable 3-column Face layout

- Released **v0.36.18.342** from PR #26; squash merge commit: `cf9ee2dc3c1b9db9963e5fdc23435d3b1acabbe8`.
- User reported two UI issues on iPad: File menu did not fit cleanly on screen, and selecting/arming Inset caused Face Active Tools to jump to four buttons across.
- File menu now opens below the second command bar, sits above it in z-order, is constrained to the available viewport height, and scrolls internally when required.
- Face primary tools are now protected as a 3-column grid: **Extrude / Inset / Knife**. Join Coplanar wraps below rather than forcing a fourth column.
- Face secondary tools are also 3-column: **Extract / Duplicate / Bridge**, with Delete wrapping below rather than squeezing four across.
- `join-selected-coplanar-faces.js` now avoids re-appending already-correct primary buttons during sync, preventing click-time DOM movement.
- Updated dynamic loader/cache chain for Face workflow and topbar layout.
- Added regression coverage for File menu fit, Face 3-column layout, and stable no-op Face sync.
- First PR run failed only from stale parent-loader version assertions in Flip Edge and Vertex layout tests; those were made version-resilient.
- Corrected PR topology regression run **35432345834** passed before merge.

## 2026-09-19 â€” v0.36.18.341 Vertex toolbar stability / Build Edge handoff hotfix

- Released **v0.36.18.341** from PR #25; squash merge commit: `f04cbb2a92c7bc0a54155cc65d07e4f3a0cc1300`.
- Concrete iPad regression from user screenshots: tapping **Build Edge** caused the Vertex Active Tools buttons to jump; Circle moved to the first slot and Add appeared active instead of Build Edge.
- Root cause 1: `face-reconstruct.js` re-appended the pre-Circle Vertex buttons on every selection/render sync, physically moving the tapped DOM node during the click lifecycle and stranding Circle at the front.
- Root cause 2: the Add Vertex wrapper session could stop while the older core `directTool='addVertex'` remained armed underneath, so a render could light Add back up.
- `face-reconstruct.js` is now the single Vertex toolbar layout owner with deterministic order: **Bevel / Add / Build Edge / Slide / Create Face / Circle**.
- The layout owner first checks whether the order is already correct and does not move any DOM nodes when stable.
- Circle delegates Vertex placement to the shared layout owner rather than independently appending itself.
- Arming Build Edge now fully stops the Add session and clears any remaining core Add direct-tool state before Build Edge becomes armed.
- Added regression coverage for stable six-button ordering, no-op stable layout sync, Circle delegation, Build Edge/Add handoff, and the current cache chain.
- First PR run failed only because the prior Offset Loop test hard-coded the parent drawer cache version; the new .341 tests already passed. That parent-loader assertion was made version-resilient.
- Corrected PR topology regression run **35432049975** passed before merge.

## 2026-09-19 â€” v0.36.18.340 transactional Offset Loop support workflow

- Released **v0.36.18.340** from PR #24; squash merge commit: `54d7e1822235db0cb88c05c0541fae7d8c1560b7`.
- Mandatory existing-feature audit confirmed **Offset Loop is already BoxLab's support-loop construction tool**; no duplicate Support Loop tool was added.
- Offset Loop drag commits now run both the topology validator and topology gate before history commit; invalid results restore the pre-drag snapshot.
- Exact Offset Loop now uses the same validate-before-commit / rollback discipline.
- Created left/right support rails are selected directly through the canonical Selection Bridge instead of toggling the legacy hidden Multi control.
- Canonical additive Multi therefore remains enabled after Offset Loop.
- While Offset Loop is armed, `edge-paint-select.js` yields its capture-phase Pencil handler so the modelling drag receives the gesture.
- Offset Loop now exposes one armed-state controller through `globalThis.__boxlabOffsetLoop`.
- Refreshed `loop-offset.js`, `precision-offset-loop.js`, `edge-paint-select.js`, and the drawer/cache chain to .340.
- New Offset Loop regression contracts all passed from the first PR run. Two subsequent CI failures were only stale historical parent-loader / exact-handler assertions in Face Split and Grid Fill tests; those tests were made invariant-based.
- Corrected PR topology regression run **35431669328** passed before merge.

## 2026-09-19 â€” v0.36.18.339 Clean sharp-fold shape-preservation hotfix

- Released **v0.36.18.339** from PR #23; squash merge commit: `e651e7d1360d9f09e8723ddf1d6c0556b8b9b395`.
- Concrete user video regression: Object > Clean for SubD visibly caved in a box-with-opening after the all-quad relaxation phase.
- Root cause: `quadRelaxFlow()` treated any interior all-quad, uncreased vertex as smooth. Around an opening/corner, horizontal and vertical incident faces could be averaged into a blended tangent even though the geometry represented a sharp fold.
- Added a geometric normal-fan guard: a relax candidate is now protected if any incident quad-face normal pair differs by more than 30Â°.
- This protection applies even when the user has not explicitly assigned a Crease.
- Existing planar smooth-grid relaxation remains enabled and still improves a perturbed interior quad vertex.
- Added regression coverage for both cases: smooth planar relaxation still works; an uncreased sharp folded quad fan remains fixed.
- Clean remains transactional; protected topology systems and `src/multi-object-transform.js?v=0.36.1.0` were untouched.
- First PR run failed only because the old Clean UI contract hard-coded the .323 module pin. The new geometry tests already passed. The loader contract was made version-resilient.
- Corrected PR topology regression run **35430414020** passed before merge.

## 2026-09-19 â€” v0.36.18.338 conservative four-sided Grid Fill

- Released **v0.36.18.338** from PR #22; squash merge commit: `72ec70b123e27c2ee8d3ca116f0b23481a0f1afa`.
- Mandatory existing-feature audit confirmed existing **Fill** is already the simple single-face Cap and Bridge/Quadify do not provide a structured hole grid.
- Added **Grid Fill** as a distinct Edge Topology operation for one simple planar convex four-sided boundary with matching opposite segment counts.
- Corner detection treats collinear intermediate boundary vertices as side subdivisions, so a segmented rectangular boundary can form a UÃ—V quad grid.
- Existing boundary vertices remain fixed; only required interior vertices are created.
- Grid positions use a Coons-style interpolation across the four boundary sides.
- Grid Fill creates only quads, selects the resulting faces, and commits as one Undo step.
- Candidate topology is built on a clone and validated before the live mesh is changed.
- Irregular/curved boundaries, mismatched opposite counts, non-boundary/internal edges, ambiguous loops, and simple four-edge caps are rejected.
- Grid Fill is loaded once through `drawer-ui.js` and is placed beside existing Fill in the Edge Topology row.
- First PR run failed only because an older Flip Edge test hard-coded the prior drawer loader version; the Grid Fill tests themselves all passed. The parent-loader test was made version-resilient.
- Corrected PR topology regression run **35429713006** passed before merge.

## 2026-09-19 â€” v0.36.18.337 existing Rotate Edge consolidated as Flip Edge

- Released **v0.36.18.337** from PR #21; squash merge commit: `72f1847dad79b15955a4f406b273b60b44b4ee9f`.
- Mandatory existing-feature audit confirmed the queued Edge Flip already existed as `src/rotate-edge.js`.
- The existing tool already performs the intended conservative diagonal swap between exactly two consistently wound triangles.
- No second Edge Flip implementation was added.
- Renamed the user-facing control/status language from **Rotate Edge** to **Flip Edge** while preserving the existing topology, selection and Undo behavior.
- Refreshed the `rotate-edge.js` â†’ `face-workflow-layout.js` â†’ `drawer-ui.js` cache chain for iPad/Safari.
- Added regression coverage protecting one authoritative Flip Edge implementation.
- First PR run failed only because a Circle test hard-coded the previous drawer cache version; that test was made version-resilient.
- Corrected PR topology regression run **35419239003** passed before merge.
- Audit also confirmed existing **Fill** already acts as a single-face Cap for one selected closed edge loop; the remaining structured-fill gap is **Grid Fill**.

## 2026-09-19 â€” v0.36.18.336 Circle exact Active Tools layout

- Released **v0.36.18.336** from PR #20; squash merge commit: `586efff69f7d1565ff5687c296e183143b0566c7`.
- Pure UI rearrangement of the existing Circle tool; geometry/selection/history behavior unchanged.
- Vertex: Circle is the third item in the row with Slide and Create Face.
- Edge: Circle sits immediately after Delete in the bottom Topology row.
- Face: Circle sits beside Poke Faces in the same two-column row.
- Removed the old standalone `componentCircleRow` wrapper entirely, preventing an old bottom Circle location from remaining.
- PR topology regression run **35418641336** passed before merge.

## 2026-09-19 â€” v0.36.18.335 restore Edge Split with canonical Multi

- Released **v0.36.18.335** from PR #19; squash merge commit: `04b23e2d445888dea952efc650161be1d5a53286`.
- Root cause: canonical always-additive component Multi left `edge-paint-select.js` active, and its capture-phase pointer handler consumed an unselected Edge tap before `face-split.js` could receive it.
- Face Split now exposes an armed state and participates in the existing `boxlab-direct-tool-exclusive` convention.
- While Face Split is armed, additive Edge paint selection yields instead of consuming the gesture.
- When Face Split is disarmed, normal canonical additive Edge selection resumes immediately.
- Global Multi remains enabled; there is no rollback to the old Multi toggle model.
- Cache-hopped `edge-paint-select.js` and `face-split.js` to .335.
- PR topology regression run **35417550936** passed before merge.

## 2026-09-19 â€” v0.36.18.334 Circle moved to Active Tools

- Released **v0.36.18.334** from PR #18; squash merge commit: `6dc2d183e0332d6953f60e9bf21f5b39c1686ec8`.
- Relocated the existing Circle control out of the Selection drawer.
- Circle now appears contextually inside Vertex / Edge / Face **Active Tools**.
- Kept one authoritative Circle implementation and one handler; geometry, selection, Undo, and Face/Edge/Vertex behavior are unchanged.
- Updated dynamic loader/cache pins to .334.
- PR topology regression run **35417217225** passed before merge.

## 2026-09-19 â€” v0.36.18.333 Face Circle support

- Released **v0.36.18.333** from PR #17; squash merge commit: `fbfbf9f46f45b4551cb0e5fdc1086cac248e7919`.
- Extended Circle so exactly one selected Face can drive the operation from its perimeter vertices.
- Face mode now enables Circle for one valid face; multiple selected Faces are refused.
- Existing Vertex/Edge Circle behavior remains unchanged.
- No topology is created or deleted; the selected Face remains selected and the operation is one Undo step.
- Cache-hopped `component-circle-core.js`, `component-circle.js`, and the authoritative `drawer-ui.js` loader to .333.
- First PR run failed only because older Circle contract tests still hard-coded .331/.332 pins/text; those assertions were rewritten to protect invariants instead of stale version strings.
- Corrected PR topology regression run **35417107014** passed before merge.

## 2026-09-19 â€” v0.36.18.332 Circle visibility hotfix

- Released **v0.36.18.332** from PR #16; squash merge commit: `86f5efe098b26fa7543d1018122fc7deeeacdb04`.
- Fixed Circle not appearing on iPad/Safari because `index.html` still loaded `drawer-ui.js?v=0.36.18.210`, allowing the browser to reuse an older cached drawer module that did not import Circle.
- Cache-hopped the authoritative drawer loader to `drawer-ui.js?v=0.36.18.332`.
- Circle now remains visible-but-disabled outside Vertex/Edge mode instead of disappearing, improving discoverability.
- Added regression coverage for the current drawer cache key and Circle visibility.

## 2026-09-19 â€” v0.36.18.331 Circle regularize for closed loops

- Released **v0.36.18.331** from PR #15; squash merge commit: `64bb42b17ef463e489c66989bf6f51dc99917126`.
- Existing-feature audit confirmed there was no current Circle / Regularize equivalent.
- Added conservative Circle regularization for one simple closed selected Vertex or Edge loop.
- The operation preserves the loop centre and current working plane, uses the average loop radius, and evenly spaces the existing vertices around the circle.
- No topology is created or deleted.
- Open chains, branches, multiple/ambiguous loops, and degenerate selections are refused.
- Selection is preserved and the operation commits as one Undo step.
- New modules: `src/component-circle-core.js` and `src/component-circle.js`.
- `drawer-ui.js` remains the single authoritative loader.
- PR topology regression run **35416581512** passed before merge.

## 2026-09-19 â€” v0.36.18.330 explicit Align anchor workflow

- Released **v0.36.18.330** from PR #14; squash merge commit: `e5ee279298b14cca76cbca5274c10f6a2484e802`.
- Upgraded component Align X/Y/Z from average-based flattening to an explicit iPad anchor workflow.
- Workflow: multi-select components â†’ choose Align X/Y/Z â†’ tap one selected component as the fixed anchor.
- The picked anchor component stays fixed; other selected component vertices align to the anchor component's centre coordinate on the chosen axis.
- Reused the existing Boolean amber/orange reference colour (`#f3b34a`) for the temporary anchor cue.
- Existing Make Planar remains unchanged and distinct.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- PR topology regression run **35415067002** passed before merge.

## 2026-09-19 â€” v0.36.18.329 component Align X/Y/Z

- Released **v0.36.18.329** from PR #13; squash merge commit: `6edb552a3219435f1a3a2de7cc9a47be46815c07`.
- Existing-feature audit confirmed **Make Planar** already existed for Face-specific arbitrary-plane flattening; it was retained unchanged.
- Added only the missing generic component axis-align tool for Vertex / Edge / Face selections.
- Align X / Y / Z sets all vertices belonging to the selected components to their average coordinate on the chosen axis.
- Selection is preserved, Object mode is excluded, and the operation commits as one history step.
- New modules: `src/component-align-core.js` and `src/component-align.js`.
- `drawer-ui.js` is the single loader for the new UI module.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- PR regression run **35411656859** passed before merge.

## 2026-09-19 â€” v0.36.18.328 duplicate Repeat UI removed

- Released **v0.36.18.328** from PR #12; squash merge commit: `f731849f96b5808c986b6d46dc92e53c9f64f9c3`.
- Fixed duplicate Precision Face / Repeat Previous controls introduced by v0.36.18.327.
- Root cause: `drawer-ui.js` already dynamically imported both modules, while .327 also added direct `index.html` module loads.
- Removed the direct `index.html` loads.
- Kept `drawer-ui.js` as the single authoritative loader and updated its Precision Face / Repeat Previous pins to `0.36.18.327`.
- Added regression coverage ensuring there is only one loader path for each module.
- This fix preserves the existing Repeat Previous behavior and exact-value replay logic; it only removes duplicate UI instantiation.

## 2026-09-19 â€” v0.36.18.327 redundant Repeat Previous reconnect

- Released **v0.36.18.327** from PR #11; squash merge commit: `462eabc59076afdfa7efaf10338bfa49f83355c1`.
- This release was later identified as redundant: Repeat Extrude / Repeat Inset were already live through `drawer-ui.js` before .327.
- Normal Face Extrude and Inset operations record committed model-unit values.
- Repeat Previous can replay the exact previous Extrude/Inset value on another Face.
- Through-ready, Through, blocked and rollback Extrude gestures remain explicitly non-repeatable.
- No `main.js`, Through kernel, or protected `src/multi-object-transform.js?v=0.36.1.0` changes were required.
- Final PR regression run **35410554813** passed after aligning the exported Precision Face API version with the .327 release.

## 2026-09-19 â€” v0.36.18.326 live component Move precision readback

- Released **v0.36.18.326** from PR #10; squash merge commit: `80605a225d9855f098a1cff7596d77fc8d6a2d7e`.
- Added live component Move readback in the existing stats line: **Î”X / Î”Y / Î”Z** to three decimal places.
- Numeric readback remains visible during ordinary drags and cross-object snapping.
- Existing snap target labels remain visible alongside the numeric delta.
- No transform math changed; this is presentation/readback only.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.
- Final PR regression run **35408617550** passed. The earlier failed run only flagged a stale .325 cache-pin assertion; the new .326 readback tests were already passing.

## 2026-09-19 â€” v0.36.18.325 component Move cross-object snapping

- Released **v0.36.18.325** from PR #9; squash merge commit: `11f3d80d871d2fa2375d908aa904527bd549e394`.
- Extended Phase B precision modelling so Geometry-enabled component Move can snap to visible geometry on other objects.
- Single-vertex Move snaps that vertex; Edge/Face/multi-component Move snaps the component centre.
- Free Move can snap to other-object vertices, midpoints and edge positions.
- Axis-constrained Move only adopts the target coordinate on the constrained axis.
- Object mode is excluded and target objects remain unchanged.
- Added `componentSnapDelta()` to the shared cross-object snap core and dedicated runtime/delta regression coverage.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.
- Final PR regression run **35407390765** passed. The earlier failed run only flagged the intentionally changed `main.js` cache pin in an old release contract.

## 2026-09-19 â€” v0.36.18.324 Phase B begins / cross-object Add Vertex snapping

- Released **v0.36.18.324** from PR #8; squash merge commit: `70df4c4f137a55e553227aa391bdd68324a0d732`.
- Started Phase B precision modelling with cross-object snapping for Add Vertex.
- Existing local-edge snapping keeps priority.
- When no local edge is hit, Add Vertex can snap to visible other-object vertices, then midpoints, then arbitrary edge positions.
- Snap targets do not modify the target object; hidden and solo-excluded objects are ignored.
- Added pure helper module `src/cross-object-snap-core.js` plus dedicated regression coverage.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.
- Final corrected PR regression run **35406677103** passed successfully. Earlier PR runs failed only because the new test fixture incorrectly used loose edges that `EditableMesh.edges()` does not enumerate.

## 2026-09-19 â€” v0.36.18.323 Phase A complete / transactional topology audit

- Released **v0.36.18.323** from PR #7; squash merge commit: `040e210bf2868a45791c35c9c1392bc1e6f244fe`.
- This is the final planned Phase A Clean for SubD backend release.
- Added `quadTopologyAudit(mesh)` covering invalid references, repeated/collapsed edges, duplicate faces, non-manifold edges, orphan crease data, and valid open-boundary handling.
- `quadCleanMesh(mesh)` now snapshots the original mesh and audits after retopo, sliver cleanup, bounded triangle-patch solving, residual pair merge, and relaxation; any stage failure restores the original mesh transactionally.
- Added deterministic generated irregular-strip fixtures and invalid-topology regression coverage.
- Kept the 40-triangle solver cap and all existing quality/acceptance gates unchanged.
- Added persistent `ROADMAP.md`; Phase A is frozen unless a concrete modelling failure justifies reopening it.
- PR topology regression run **35406242201** completed successfully before merge.

## 2026-09-19 â€” v0.36.18.322 worst-local internal-flow ranking

- Released **v0.36.18.322** from PR #6; squash merge commit: `0f03befbb7d69ca53194536579c240a993efd9ff`.
- Clean for SubD internal proposed-quad flow ranking now combines average mismatch with a small worst-local mismatch term.
- New helper `quadInternalFlowPenalty(flows)` separates the acceptance penalty from the ranking-only worst-local term.
- Equal-average alternatives now prefer the patch that avoids concentrating flow mismatch into one badly aligned internal quad junction.
- The new worst-local term is ranking-only: the .321 acceptance score, quality thresholds, and 40-triangle solver envelope are unchanged.
- Regression workflow run **35404138276** completed successfully before merge.

## 2026-09-19 â€” v0.36.18.321 worst-local valence-aware patch ranking

- Released **v0.36.18.321** from PR #5; squash merge commit: `0b838da0cd2a31cd4d88c2390a9e15e9b0c58905`.
- Clean for SubD valence ranking now combines average smooth-interior valence error with a small worst-local error term.
- New helper `quadValencePenalty(errors)` makes the ranking behavior explicit and regression-testable.
- Equal-average alternatives now prefer the patch that avoids concentrating error into a more extreme extraordinary vertex.
- The new worst-local term is ranking-only; the .320 acceptance/quality gates and 40-triangle solver envelope are unchanged.
- Regression workflow for PR #5 passed successfully before merge.

## 2026-09-19 â€” v0.36.18.320 interior valence-aware patch ranking

- Released **v0.36.18.320** from PR #4; squash merge commit: `40e119774f39373ffadab22d0782428e8be7ea2c`.
- Clean for SubD complete-patch ranking now includes smooth-interior vertex valence regularity after the existing shape, surrounding-flow, and internal-flow terms.
- The new helper is `quadPatchValenceContext(mesh,pairs)` with `PATCH_VALENCE_WEIGHT=.25`.
- Ranking prefers safe complete matchings that leave eligible smooth interior vertices closer to quad valence 4 after paired triangle diagonals are removed.
- Boundary vertices and vertices touching creases are excluded from valence scoring.
- Valence is ranking-only: the existing .319 quality score still controls acceptance, so the 40-triangle envelope and prior quality/eligibility guards remain unchanged.
- Added regression coverage for valence-4 preference and crease-ring exclusion; Topology regression run **35401945842** completed successfully on the corrected PR head.

## 2026-09-19 â€” .319 handoff audit / repo reconciliation

- Re-audited current `main` against `AI_WORKFLOW.md` before closing the development chat.
- Confirmed **v0.36.18.319** is the released/live baseline: internal proposed-quad flow coherence is present, the bounded triangle-island envelope remains 40 triangles, and the .319 release/verifier had already completed successfully.
- Canonical .319 release commit remains `68e45845f6696b3e66929ee4b181748b85d99b09`; final clean Pages marker commit remains `4ed534dfe8697e54921a8a80d7b50945b6792342`.
- After the handoff files were first introduced, three later .319 commits (`51117f59...`, `a91ac689...`, `a0a2d072...`) re-exposed/cache-hopped/tested the same .319 internal-flow state. They do **not** represent a newer numbered release.
- Current code-bearing HEAD at this audit is `a0a2d072acbf2e397ca68e2276fd75c8a1643846`.
- Only permanent workflow currently present under `.github/workflows` is `through-regression.yml`; temporary .319 release/verifier workflows are removed.

## 2026-09-19 â€” Repository handoff system established

- Added `AI_WORKFLOW.md`, `AI_HANDOFF.md`, `DEV_HISTORY.md`, and `TEST_CHECKLIST.md`.
- Future AI development sessions must treat the repository as source of truth.
- Future sessions must update the living handoff and append meaningful history before finishing code-changing work.
- Initial handoff was audited from current `main`, not reconstructed from an older chat version.

## v0.36.18.319 â€” Internal proposed-quad flow coherence

- Clean for SubD patch scoring now considers flow coherence inside the proposed quad patch in addition to surrounding boundary context.
- Bounded triangle-island solving remains conservative and quality-gated.
- User-facing Clean for SubD wrapper retains topology validation and rollback.
- Release commit: `68e45845f6696b3e66929ee4b181748b85d99b09`.
- Audited post-release HEAD: `4ed534dfe8697e54921a8a80d7b50945b6792342`.

## v0.36.18.318 â€” Forty-triangle bounded local retopo

- Extended bounded local triangle-island retopology envelope to 40 triangles.
- Kept conservative patch quality guards and regression tests.

## v0.36.18.317 â€” Thirty-eight-triangle bounded local retopo

- Extended bounded local triangle-island retopology envelope to 38 triangles.

## v0.36.18.316 â€” Thirty-six-triangle bounded local retopo

- Extended bounded local triangle-island retopology envelope to 36 triangles.

## v0.36.18.315 â€” Thirty-four-triangle bounded local retopo

- Extended bounded local triangle-island retopology envelope to 34 triangles.

## Earlier protected baseline retained

The current repository has evolved through many earlier releases. Important protected behaviours that remain relevant include:

- iPad navigation gesture model
- persistent selections during navigation
- Studio realtime workflow
- object management / Multi
- Knife / Loop Cut / Bevel / Extrude / Inset
- connected multi-face Extrude
- cavity-aware Through
- Extract
- Bridge
- Join
- Boolean workflows
- Base/SubD export
- protected `src/multi-object-transform.js?v=0.36.1.0`
- intentionally pinned selection/UI stylesheet baseline where still referenced by current `index.html`

For exact implementation state, always inspect current `main`; this history is context, not authority.

## 2026-09-28 â€” v0.36.18.551 Nomad attribute preservation Phase 2B
- Extended the .550 face-corner preservation pipeline to GLB `TANGENT` and `COLOR_0`.
- Weld and conservative quad reconstruction now carry UV/tangent/colour corner channels together and reject merges that would cross attribute discontinuities.
- Vertex colours restore on Base GLB export while topology remains compatible.
- Tangents restore only while both topology and vertex-position geometry remain compatible, preventing stale tangent vectors after shape edits.
- Added `tests/nomad-attribute-preservation-551.test.mjs`; syntax parse + 13 targeted assertions passed through the repository audit.
- Published runtime pins/version as v0.36.18.551.
- Beta 5 .538 and protected multi-object-transform .1.0 remained untouched.

## 2026-09-28 â€” v0.36.18.552 Nomad morph/layer preservation Phase 2C
- Extended the face-corner preservation pipeline to morph POSITION deltas exposed by GLTFLoader.
- Morph deltas survive weld + conservative quad reconstruction only where shared-corner values agree.
- Base GLB export rebuilds relative morph POSITION targets when topology remains compatible.
- Original mesh/node morph weights are patched back when target counts match; preserved Nomad extras continue to carry layer metadata.
- Added `tests/nomad-morph-layer-preservation-552.test.mjs`.
- Syntax parse + 8 targeted morph assertions passed before publish.
- Published runtime pins/version as v0.36.18.552.
- Beta 5 .538 and protected multi-object-transform .1.0 remained untouched.

## 2026-09-28 â€” v0.36.18.553 indexed GLB topology export
- .552 hands-on exposed non-welded GLB output: Nomad subdivision behaved like separate triangles.
- Root cause: export geometry duplicated every triangle corner and had no index buffer.
- Reworked `editableToGeometry()` to deduplicate exported vertices by BoxLab vertex identity plus preserved corner-channel signature and emit `geometry.setIndex(indices)`.
- Real UV/tangent/colour/morph seams remain split; identical corners now share indices.
- Added `tests/nomad-indexed-topology-553.test.mjs`.
- Exporter syntax + 7 targeted indexed-topology assertions passed before publish.
- Published v0.36.18.553; Beta 5 .538 and multi-object-transform .1.0 unchanged.

## 2026-09-28 â€” v0.36.18.553 hands-on PASS
- User confirmed indexed/welded Base GLB export behaves as connected topology in Nomad.
- Nomad subdivision no longer treats the BoxLab export as separate triangles.
- .553 is now the verified GLB topology checkpoint.

## 2026-09-28 â€” v0.36.18.554 weighted Nomad morph display + export reconstruction
- User reported sculpt-layer deformation absent when Nomad GLB was imported into BoxLab.
- Found that morph target payloads were preserved but active morph weights were never applied to editable vertices.
- Import now applies GLTFLoader morph influences, transforms morph deltas into BoxLab/world coordinates, and scales morph deltas with the fitted mesh.
- Export subtracts active weighted morph deltas from editable positions to recover the underlying base before writing morph targets/weights back, preventing double-deformation.
- Added `tests/nomad-weighted-morph-554.test.mjs`.
- Syntax parse + 8 targeted weighted-morph assertions passed before publish.
- .553 indexed topology path preserved; Beta 5 .538 and multi-object-transform .1.0 untouched.

## 2026-09-28 â€” v0.36.18.555 morph weight single-source + UV pole welding
- .554 hands-on: deformation doubled after round-trip although layer weight survived; pole vertices also appeared unwelded.
- Fixed redundant morph-weight restoration by preserving whether the source GLB used node.weights or mesh.weights and writing active weights to that location only.
- Added high-valence UV singularity handling: vertices with 3+ distinct UV corner values ignore UV/tangent in the export weld key, allowing sphere poles to remain connected while ordinary two-sided UV seams stay intact.
- Added `tests/nomad-morph-weight-pole-weld-555.test.mjs`.
- Syntax parse + 10 targeted assertions passed before publish.
- Published v0.36.18.555; Beta 5 .538 and multi-object-transform .1.0 unchanged.

## 2026-09-28 â€” v0.36.18.556 restore original GLB round-trip scale
- .555 hands-on: welding/poles fixed, but Nomad round-trip object scale remained wrong.
- Root cause: BoxLab import normalises geometry to a size-2 working envelope and export did not reverse that fit transform.
- Import now stores the global fit centre + scale in GLB passthrough.
- Base GLB export reverses the fit transform for POSITION and divides morph POSITION deltas by the same scale before writing.
- Added `tests/nomad-roundtrip-scale-556.test.mjs`.
- Syntax parse + 8 targeted scale-restoration assertions passed before publish.
- .555 morph-weight single-source and pole-weld logic preserved.

## 2026-09-28 â€” v0.36.18.556 hands-on full round-trip PASS
- User confirmed all .556 checks PASS.
- Original Nomad size/placement restored.
- Sculpt deformation magnitude correct.
- Layer weight retained and adjustable without double deformation.
- Welded topology and pole subdivision remain connected.
- .556 is now the verified Nomad round-trip preservation checkpoint.

## 2026-09-28 â€” v0.36.18.557 bottom-left selection mode dock
- Began incremental UI/UX pass from verified .556.
- Moved the existing Vertex / Edge / Face / Object selector visually to the bottom-left using safe-area-aware fixed positioning.
- Preserved existing #selectionModes DOM/IDs and all selection-mode logic.
- Increased touch target height to 42px.
- Updated styles cache pin to .557.
- Added `tests/selection-mode-dock-557.test.mjs`.
- Static regression 6/6 PASS.
- No gizmo/gesture logic changed; protected multi-object-transform .1.0 untouched.

## 2026-09-28 â€” v0.36.18.558 selection mode dock position correction
- .557 hands-on FAIL: selection modes rendered at the very top instead of bottom-left.
- Moved the existing #selectionModes DOM node from header.topbar into #viewportWrap.
- Added viewport-scoped absolute bottom-left positioning with safe-area handling and top/right reset.
- Preserved IDs, buttons and selection-mode logic unchanged.
- Static relocation regression 9/9 PASS.

## 2026-09-28 â€” v0.36.18.559 runtime-owned bottom-left selection mode dock
- .557/.558 failed because topbar-layout.js reparented #selectionModes back into #commandBar at runtime, causing flashing and breaking topbar composition.
- Restored original header markup and removed the conflicting CSS relocation blocks.
- Changed topbar-layout.js to own the relocation and append the existing #selectionModes node into #viewportWrap instead.
- Runtime style now owns bottom-left safe-area positioning.
- Forced topbar brand visibility so BoxLab/version remain visible.
- Static/runtime ownership regression 11/11 PASS.

## 2026-09-28 â€” v0.36.18.561 mode dock clearance + no startup flash
- .559 hands-on showed correct bottom-left placement, but the left tool drawer scrolled behind the dock.
- .560 reserved lower viewport clearance for the scrolling left tool drawer.
- User additionally reported one-frame startup flash at the old top/header location.
- .561 hides #selectionModes in its initial DOM location and reveals it only once topbar-layout.js has moved it into #viewportWrap.
- Published CSS/topbar cache pins as .561.
- Syntax/static regression 9/9 PASS.

## 2026-09-28 â€” v0.36.18.562 bottom Selection dock + top Viewport actions
- Moved the existing Selection panel out of the scrolling left tool drawer and docked it above the bottom-left mode strip.
- Added no-flash relocation for #selectionDrawer.
- Kept Viewport settings in .top-actions beside the top action buttons rather than the second command row.
- Normalized .top-actions button/Viewport summary typography to 13px and 38px control height, covering Frame All / Viewport / Undo / Redo where present.
- Preserved all existing IDs/handlers.
- Syntax/static regression 11/11 PASS.

## 2026-09-28 â€” v0.36.18.563 Selection drawer restored + empty command row removed
- User preferred Selection in its original scrolling left drawer.
- Reversed only the .562 Selection-panel relocation and removed its no-flash visibility override.
- Kept bottom-left mode dock and top-line Viewport placement.
- Removed the now-empty command/packer row and moved viewport directly below the main topbar, reclaiming 48px vertical space.
- Syntax/static regression 10/10 PASS.

## 2026-09-28 â€” v0.36.18.564 compact Selection panel sizing
- Standardised mixed Selection panel typography/control heights to the compact UI scale.
- Regular Selection controls now use 12px text and 32px height with consistent padding.
- Selection heading reduced to 12px; symbol-only buttons use 13px for legibility.
- No selection logic changed.
- Static regression 8/8 PASS.

## 2026-09-28 â€” v0.36.18.565 left tool drawer scroll boundary above mode dock
- Selection had been restored to the original left drawer, but scrolling still passed underneath the bottom mode strip.
- Replaced max-height based clearance with a true bottom boundary on the absolute-positioned left drawer.
- Standard layout bottom boundary: 104px; compact/mobile: 96px.
- Scroll viewport now ends above the mode dock.
- Syntax/static regression 5/5 PASS.

## 2026-09-28 â€” v0.36.18.566 lower bottom mode dock / reclaim vertical space
- Lowered bottom mode strip closer to the device safe-area edge.
- Reduced left drawer lower clearance accordingly, recovering roughly 20â€“30px vertical space.
- Preserved safe-area handling, mode behavior and scroll-above-dock behavior.
- Syntax/static regression 7/7 PASS.

## 2026-09-28 â€” v0.36.18.567 Viewport menu anchored to right edge
- Changed Viewport flyout from trigger-relative absolute positioning to viewport-fixed positioning.
- Menu now opens against the right safe-area edge instead of ~1/4 screen inward.
- Trigger location and viewport functionality unchanged.
- Syntax/static regression 5/5 PASS.

## 2026-09-28 â€” v0.36.18.568 Viewport ownership fix + far-right placement + compact Facegroups
- Fixed .567 ownership flash by removing Viewport reordering from topbar-layout.js.
- view-modes.js now owns placement from creation and appends Viewport at the far-right of .top-actions.
- Retained right-edge flyout anchoring.
- Normalized Facegroup Viewport controls to compact 32px / 12px sizing with 11px range labels/outputs.
- Syntax/static regression 13/13 PASS.

## 2026-09-29 â€” v0.36.18.570 Total Gizmo v1 working prototype
- Added isolated src/total-gizmo.js without editing protected multi-object-transform.js.
- Object-mode combined gizmo includes free move, axis move, axis rotate, screen rotate, uniform scale and axis scale.
- Thin visible geometry uses 16px invisible hit strokes for touch/Pencil usability.
- Added hover/active emphasis and live transform HUD.
- Corrected axis templates so X/Y/Z projected move/scale handles align with camera-projected world axes.
- Existing transform strip retained as fallback.
- Added tests/total-gizmo-570.test.mjs.
- Syntax/static regression 13/13 PASS.

## 2026-09-29 â€” v0.36.18.571 Total Gizmo black-fill bug fix + thinner idle graphics
- Fixed black disc/ring artifacts caused by SVG hit proxies defaulting to black fill after .tg-handle class removal.
- Explicitly set hit proxy fill:none; this also stops proxies obscuring X/Y rotation arcs.
- Reduced idle axis/ring/arc line weights while retaining 16px invisible hit zones.
- Hover/active state still thickens selected handle.
- Syntax/static regression 9/9 PASS.

## 2026-09-29 â€” v0.36.18.572 Total Gizmo axis handles are intrinsically constrained
- Removed dependency on global Axis Snap for explicit gizmo X/Y/Z handles.
- Total Gizmo now exposes its active constraint; transform-upgrade gives that constraint priority over free/auto snap state.
- X/Y/Z move, scale and rotate handles are intrinsically constrained by the handle selected.
- Protected multi-object-transform pin unchanged.
- Syntax/static regression 8/8 PASS.

## 2026-09-29 â€” v0.36.18.573 Total Gizmo axis constraint fixed in actual Object drag owner
- .572 failed because transform-upgrade was not the final owner of Object-mode drag movement.
- main.js initializes and applies drag.axisLock for Object/component transforms.
- main.js now seeds axisLock from active Total Gizmo X/Y/Z handle and prevents Axis Snap auto-selection from replacing an explicit gizmo axis.
- Explicit gizmo axis movement is now independent of Axis Snap state.
- Static regression 6/6 PASS.

## 2026-09-29 â€” v0.36.18.574 legacy X/Y/Z constraints no longer depend on Axis Snap
- Extended .573's explicit gizmo axis-lock rule to the legacy precision X/Y/Z controls.
- main.js now seeds drag.axisLock from active precision X/Y/Z when no gizmo axis handle is active.
- Axis Snap automatic axis choice runs only if no explicit axis is already locked.
- Free/Auto behavior preserved.
- Static regression 7/7 PASS.

## 2026-09-29 â€” v0.36.18.575 Total Gizmo planar move + interaction refinement
- Added projected XY/XZ/YZ planar move handles.
- main.js now uses true world-plane constraints for those handles.
- Refined ring/arc hit widths to reduce overlap conflicts.
- Segmented rotation arcs improve readability through overlapping geometry.
- Prepublish syntax/static regression 9/9 PASS.

## 2026-09-29 â€” v0.36.18.576 3D-projected Total Gizmo rotation rings
- Replaced fixed SVG X/Y/Z ellipses with true camera-projected world-space circles.
- X ring uses YZ plane, Y ring XZ, Z ring XY.
- 72-sample projected paths update every frame and respond correctly to camera perspective.
- Front/back ring halves are drawn with different prominence for 3D depth readability.
- Removed dashed-ring workaround.
- Prepublish syntax/static regression 10/10 PASS.

## 2026-09-29 â€” v0.36.18.577 projected rotation rings visibility repair
- .576 projected rings were not visible in hands-on testing.
- Removed front/back split path generation and DOM-size conversion.
- Rings now render as one full 96-sample camera-projected closed path per world rotation plane.
- Depth fading deferred until basic projected-ring behavior is validated.
- Prepublish syntax/static regression 9/9 PASS.

## 2026-09-29 â€” v0.36.18.578 projected rotation ring visibility root-cause fix
- .577 rings collapsed because screen-pixel deltas were normalized by the full canvas size instead of the gizmo size.
- Conversion now uses Total Gizmo rendered width/height, restoring intended projected ring radius.
- Projected ring hit proxies are now updated from the same d path each frame.
- Prepublish syntax/static regression 7/7 PASS.

## 2026-09-29 â€” v0.36.18.579 projected rotation ring visible-path selector fix
- Found that querySelector was updating the transparent hit-proxy path instead of the visible ring path.
- syncRotationRings now targets .tg-handle.tg-arc explicitly and mirrors its d path to the linked proxy.
- Syntax/static regression 4/4 PASS.

## 2026-09-29 â€” v0.36.18.580 clear stranded Total Gizmo hover/active state
- .579 projected rings passed visually.
- Fixed lingering thick/highlighted state after ring interaction by clearing active/muted/hover-proxy classes on transform finish/cancel.
- Added pointerleave safety cleanup when idle.
- Syntax/static regression 5/5 PASS.

## 2026-09-29 â€” v0.36.18.581 Total Gizmo precision HUD + adaptive axis detents
- Added adaptive soft move detents for explicit gizmo X/Y/Z movement.
- Detent step is selected from nice increments based on projected pixels-per-unit; catch threshold is screen-space based.
- Added post-drag gizmo HUD persistence and tap-to-enter exact value.
- HUD exact input reuses the existing transformValue/Enter path and transfers the last gizmo X/Y/Z constraint first.
- Free and planar movement remain unrestricted.
- Projected rings unchanged.
- Protected multi-object-transform pin unchanged.

## 2026-09-29 â€” v0.36.18.582 bottom status lane + Full Screen + iPad Share/Open In
- Reserved a separate bottom status strip under the mode dock.
- Added Viewport > Full Screen with native API plus Safari focus fallback.
- Added dedicated Share / Open In export using Web Share file handoff.
- Normal Export / Save remains available.
- Prepublish syntax/static regression 12/12 PASS.

## 2026-09-29 â€” v0.36.18.583 transform input focus + Focus View + wider GLB share handoff
- Added explicit iPad touch/Pencil focus behavior to transform numeric input so Rotate/Scale type-in can invoke the keyboard reliably.
- Removed native browser fullscreen path and replaced it with in-page Focus View that preserves the top action row while hiding the left drawer.
- GLB Web Share now uses application/octet-stream with .glb filename to test extension-based iPadOS/Nomad destination discovery.
- Normal save/export path unchanged.
- Prepublish syntax/static regression 9/9 PASS.

## 2026-09-29 â€” v0.36.18.584 direct exact transforms + Focus View activation fix
- Added direct exact transform API for Move/Scale/Rotate.
- Gizmo HUD now calls exact transform API directly instead of simulating Enter in legacy input.
- Exact Rotate bypasses 15-degree drag snap.
- Hardened gizmo HUD touch/Pencil focus.
- Fixed stale fullscreenBtn branches in Focus View handlers.
- Added synthesized-click suppression so iPad pointerup/click does not double-toggle Focus View.
- Share/Open In unchanged.
- Prepublish syntax/static regression 8/8 PASS.

## 2026-09-29 â€” v0.36.18.585 direct post-transform input + top-line Focus
- Replaced gizmo HUD text-to-input conversion with an actual visible numeric input immediately after transform release.
- Context placeholders: Distance / Degrees / Factor.
- Exact commit continues to use direct transform-upgrade exact API.
- Moved Focus View from Viewport menu to top action row before Viewport.
- Share/Open In unchanged.
- Prepublish syntax/static regression 9/9 PASS.

## 2026-09-29 â€” v0.36.18.586 one authoritative transform type-in system
- Removed floating gizmo numeric input after repeated iPad focus failures.
- Added transform-upgrade setContext(tool,constraint) API.
- Gizmo now synchronizes the persistent left transform strip and exact-value field.
- Transform polish refreshes on boxlab-transform-context.
- Focus top-row placement retained.
- Prepublish syntax/static regression 8/8 PASS.

## 2026-09-29 â€” v0.36.18.587 standalone floating exact-transform input
- Rebuilt floating exact input outside the Total Gizmo DOM/SVG overlay.
- New transformFloatInput is a normal viewport sibling with pointer-events:auto and touch-action:auto.
- It uses the proven transform-upgrade applyExact API for Move/Rotate/Scale.
- Left-panel exact field remains fallback.
- Prepublish syntax/static regression 9/9 PASS.

## 2026-09-29 â€” v0.36.18.588 unified semantic transform completion event
- Replaced raw pointerup-dependent floating input display with a semantic boxlab-transform-end event.
- main.js, transform-upgrade.js and rotate-transform.js now emit the same completion event from their actual transform owners.
- Total Gizmo listens to that event and opens the standalone floating exact-input palette only for an active gizmo transform.
- Hides old gizmo HUD when floating palette opens, removing duplicate black boxes.
- This semantic event architecture is intended as the baseline for future modeless gesture interaction.
- Prepublish syntax/static regression 9/9 PASS.

## 2026-09-29 â€” v0.36.18.589 restore proven Move floating exact-input path
- .588 regressed Move floating type-in.
- Restored Move's known-good gizmo pointer-release palette path from .587.
- Rotate/Scale remain on semantic transform-end routing for continued isolation.
- Prepublish syntax/static regression 5/5 PASS.

## 2026-09-29 â€” v0.36.18.590 Rotate floating type-in isolated
- Confirmed rotate-transform.js does not own Object-mode rotation.
- Preserved .589 Move path unchanged.
- Object-mode Rotate now uses the same proven gizmo release trigger to show floating exact entry.
- Scale intentionally untouched.
- Prepublish syntax/static regression 4/4 PASS.

## 2026-09-29 â€” v0.36.18.591 direct Object Rotate completion handoff
- .590 Rotate floating palette still failed.
- Removed event/waiting timing from Object-mode Rotate completion.
- transform-upgrade now directly invokes Total Gizmo completeExactEntry() when Object Rotate commits.
- Move path untouched; Scale intentionally untouched.
- Prepublish syntax/static regression 7/7 PASS.

## 2026-09-29 â€” v0.36.18.592 Rotate floating input captured before document transform owners
- Identified document-capture ordering as the reason Rotate completion never reached Total Gizmo.
- Moved Total Gizmo pointerup listener to window capture so it runs before transform-upgrade's document-capture stopImmediatePropagation.
- Move and Rotate use this early release path; Scale unchanged.
- Prepublish syntax/static regression 4/4 PASS.

## 2026-09-29 â€” v0.36.18.593 Scale added to proven window-capture floating type-in
- .592 Rotate floating type-in hands-on PASS.
- Added protected pointer capture/ownership guidance to AI_WORKFLOW.md.
- Scale now uses the same window-capture release path as working Move/Rotate.
- Move and Rotate logic otherwise unchanged.
- Prepublish syntax/static regression 4/4 PASS.

## 2026-09-29 â€” v0.36.18.594 gizmo soft Rotate/Scale detents
- .593 full floating type-in hands-on PERFECT.
- Added gizmo-only soft angle detents: 0/5/15/30/45/60/90/120/135/180 degrees.
- Added gizmo-only soft scale detents: .25/.5/.75/1/1.25/1.5/2/3/4.
- Existing HUD provides live value feedback; caught values are marked â€œdetentâ€.
- Legacy transform behavior and .593 exact-entry path unchanged.
- Prepublish syntax/static regression 7/7 PASS.

## 2026-09-29 â€” v0.36.18.595 owner-correct gizmo Rotate/Scale detents
- .594 hands-on showed Scale detents absent and Rotate still governed by legacy 15Â° snap.
- Added explicit global Total Gizmo drag ownership state.
- Rotate now uses gizmo soft catches independently of the legacy 15Â° snap.
- Moved Scale detent maths into main.js, the actual Scale gesture owner.
- Move and .593 exact-entry paths unchanged.
- Prepublish syntax/static regression 9/9 PASS.



## 2026-10-04 â€” v0.36.18.706 Face radial Merge by Distance

- User confirms .705 full manual list PASS; arbitrary-plane Align now protected. .702/.703/.704 pending checks retained.
- Audited existing .41 welding owner, .135/.137 whole-object safe-cluster scanner and .145 Face Repair proxy. Added one active outer Merge Dist sector and top-centre distance/whole-object Apply/Cancel settings through existing repair panel; no mode hop or parallel kernel.
- Scanner accepts optional exact tolerance, old selection-only caller unchanged. Existing owner exposes explicit applyFor/result/mesh guard; default Vertex results/Multi retained. Combined individually safe clusters are validated together before mutation. History adds one successful snapshot, none on rejection/rollback. Face success clears stale IDs and returns fresh-puck lifecycle; Cancel preserves geometry/selection.
- Eight inner unchanged; fifteen outer at 220px/24 degrees; no outer/outer or outer/inner rectangle overlap. Fixed disabled-Vertex-target dispatch for scoped Face Merge so launch can edit tolerance with no current candidates. Protected Align/transform/Loop Cut untouched.
- 55 targeted checks PASS; full suite 1139 tests, 854 PASS, identical 285 failure names to .705, no new failures. Syntax/diff checks PASS. All .706 markers and changed dynamic child/parent pins updated.
- Next: .706 hands-on confirmation, finish Face active-tool/settings inventory, then Vertex â†’ Object â†’ final Edge. No selection commands, broad gestures, strengthening or wholesale drawer removal.


## 2026-10-04 â€” v0.36.18.707 Face radial Bevel

- User requests Edge Bevel from Face selection; .706 hands-on remains pending, no implied PASS.
- Audited direct-bevel/selection-hub-bevel-session and existing bevel selection/perimeter routing/face-region boundary owner. Added Face Bevel sector and shared top-centre Width/Segments/Apply Exact/Cancel; no duplicate kernel, new pointer owner or mode hop.
- One Face boundary or simple connected selected region outside boundary maps to existing Edge IDs; excludes internal shared edges and validates through existing engine. Current topology limits retained; disconnected/no-boundary/open/unsupported sets unavailable.
- Existing direct controller's capture handlers now own Face picking/preview/commit/cancel; same horizontal width/segments maths and generalBevelSelection. Face context/lock guards, snapshot rollback, restored capture/navigation controls, one successful History step, cleared stale Face IDs and semantic completion/fresh puck. Cancel preserves original selected Faces; popup capture cannot prematurely disarm Face exact apply. Protected Edge paths covered with actual integration tests.
- Eight inner unchanged, sixteen outer at230px/22.5Â°; no button rectangle overlap. 56 targeted tests PASS; full suite1149 tests/864 PASS, identical285 failure names to .706; no new failures. Syntax/diff PASS. Release/changed owner/session/gizmo pins .707; protected topology/transform/frozen betas unchanged.
- Next: hands-on .707/pending .706; finish Face inventory/settings â†’ Vertex â†’ Object â†’ final Edge. No unrelated work or selection helpers in rings.


## 2026-10-04 â€” v0.36.18.708 Face Bevel blue slider preview / early owner

- User reports .707 horizontal drag moves Face, requests Shell/Solidify-like slider preview. No PASS; screenshot version absent. Verified current main/live manifest/shell/pins .707 first.
- Audited main component Move fallback and document-vs-canvas capture ordering. Moved Face-only dispatch to window capture within same direct-bevel handlers; Edge remains canvas-only. Added narrow main active-Face-Bevel fallback guard. Touch/background navigation passes; Pencil contact on selected Face owns drag. No parallel gesture/modelling kernel.
- Snapshot candidate goes through existing Edge bevel kernel; new rendering-only helper matches Shell/Solidify blue fill/wire color/opacity/depth/render-order. Source untouched on launch/sliders/Pencil. Release keeps preview; explicit Apply Bevel commits one history step and clears stale Face IDs. Cancel/context changes dispose preview, preserve source/selection. External geometry/crease/loose changes invalidate candidate rather than overwrite source; failures remove stale preview/report reason/disable Apply.
- Preview geometry/material disposal tested; slider updates only on input/change, no per-frame regeneration. Existing Shell/Solidify owners, bevel kernels, ring/layout, protected transform/Loop Cut unchanged. .707 Face drag tests updated for revised explicit-Apply UX.
- 60 targeted tests PASS; full suite1153 tests/868 PASS, identical285 failures by name to .707. Syntax/diff PASS. .708 markers and changed direct/helper parent/main/session/refresh pins updated.
- Next hands-on .708; if drag still fails on confirmed version, Gesture Debug before speculation. Pending .706 and radial Face â†’ Vertex â†’ Object â†’ final Edge sequence retained.


## 2026-10-04 â€” v0.36.18.709 first Vertex radial pair

- User confirms .708 full manual list PASS; Face Bevel blue slider/Pencil preview, explicit Apply/Cancel, puck/history/navigation protected. Older pending repair builds not implicitly passed.
- Audited Face action/settings inventory: 24 modelling/repair tools exposed, contextual parameters present; Through is already automatic single-Face inward Extrude, no separate settings or new sector. Inspect/selection/appearance excluded. Drawer fallbacks/pending repairs/final ring placement retained.
- Started Vertex with existing .513 Merge to Center / Merge to First. Same authoritative button validation, chronological selection, geometry/compaction/Multi/history; no duplicate modelling or pointer owner. Vertex puck/transform-centre now opens two-sector ring and centred Ã—. Read-only guard, disabled state and mode guards; one-shot suppression cleanup returns selected result puck. Existing Face/Edge ring markup unchanged.
- 30 targeted PASS; full1158 tests/873 PASS, identical285 failure names to .708, no new failures. Syntax/diff PASS. .709 shell/manifest/main/refresh/gizmo pins current; protected files/kernels/frozen betas untouched.
- Next confirm .709 and audit next Vertex active-tool pair/settings, then Object â†’ final Edge. No selection proxies, unrelated gestures or bulk drawer removal.

## 2026-10-04 â€” v0.36.18.710 complete existing Vertex radial coverage / Bevel consistency

- User explicitly requests all currently existing Vertex Active Tools in one build, then a combined test/refinement session. .709 not implicitly passed; .708 Face Bevel remains protected.
- Inventory audited from index/late Active Tools/Repair owners: Add, Build Edge, Bevel, Slide, Join, Weld, Create Face, Delete, Circle, Merge Center, Merge First, Merge by Distance, Clean Vertices. Selection diagnostics excluded; Align belongs to Selection controls and no new Vertex Extrude introduced.
- Eight inner at82px; five outer at145px/72 degrees. All thirteen existing targets exposed; shared centred Ã—. Outer/outer and outer/inner rectangles audited. Inner geometry unchanged.
- User's Bevel slot unified to inner90Â° in all modes. Face Knife moves135Â°, Duplicate180Â°, Extract to former outer Bevel337.5Â°. Edge Slide45Â°, Bevel90Â°, Crease135Â°. Other Face/Edge targets and session owners unchanged.
- New top-centre vertex-tool-viewport-session proxies existing owners: Add/Build Done, Bevel Width/Exact/Apply/Cancel, Slide signed exact/Done, explicitly selected-only Merge tolerance/Apply/Cancel, explicitly whole-object Clean Apply/Cancel. No duplicate kernel/new raw viewport pointer owner. Original .162 Slide rail math/eligibility preserved.
- Actual owners expose needed busy/disarm/result/semantic completion APIs. Add/Build teardown releases capture; Add Done selects last added vertex, superseding stop preserves selection. Vertex Bevel cancelled drag retains selection;ëŽ5Ó†òµë(š+myÖRÖ–FVçF–6ÂööÆVB6fT÷VâôäôÒâ÷&–v–æÃ#Ró#bFW7G2Væ6†ævVBã#Rfö7W6V@¦6†V6·252ód”Âó6¶—âgVÆÂÆö6ÂæöFS#Bã#"ã£33"52ód”Âó6¶—ó6æ6VÀ¢ƒƒRãc72“²f÷W"æWrFW7G2Ç6ò&W'VâgFW"FF–ærW‡Æ–6—B¦W&òÖf7F÷"76W'F–öç2à¥7–çF‚öF–fb6ÆVã²æòæF—fRuRö•BVÖ—76—fR66WFæ6R–æfW'&VBà¥&Wf–WvVB&WfW'6RÖÆöFW"66†R6Æ÷7W&S²Ö÷7B6†ævW2&R–ç2öæÇ’âÖ–âô×VÇF“ãÀ¦g&÷¦Vâ&WF2Â7GVÃ#BÆ–v‡F–æræB–çB÷&VfÆV7F–öâ6öFRVæ6†ævVBâW†—7F–æp¦–âÖFW7BÆ—7B–æ6ÇVFW3#r6†V6·3²æòæWrô"&F6‚&WV—&VBà ¤vVæW&–26×ÆS¢Fö72÷6×ÆW2ôäôÕôTÔ•54•dUó#rææöÒÂ&VvVæW&FVB'’F†RW†—7F–æp¦æöÖE%$f—‡GW&R‡¶VÖ—76—fS§G'VWÒ’æBæF—fRw&—FW"âÆVgB7V&RFG2&ÇVRVÖ—76—fP¦f7F÷"÷7G&VæwFƒ"Fòæ÷&ÖÂ·&÷Vv†æW72ÂÖ–FFÆR%"æB&–v‡B6öÆ÷W"6öçG&öÇ2Væ6†ævVBà¤DUd”4S#s¢–×÷'B6×ÆR7GVF–òõ6öÆ–BæB÷&&—B&VÆ÷s²ÆVgBVÖ—76—fR&VÖ–ç2'&–v‡BÀ¦÷F†W"7V&W2&WF–âæ÷&ÖÂ÷66Æ"6†F–æs²7v—F6‚Æöö·2ö&6²â6fRô÷Vâæ&÷†Æ"æ@¤äôÔB&V÷Vâ–âæöÖB&WF–â—Bâ6†V6²66WFVC#b6×ÆR7F–ÆÂÆöö·2F†R6ÖRà¤æW‡C¢æF—fRVÖ—76—fRfVVF&6³²÷6—G’F—7Æ’æVVG26W&FR66÷VBVF—BÂv†–ÆP§7V&F—f—6–öâöF—7Æ6VÖVçB&VÖ–ç2FVfW'&VBâV&Æ–6F–öâ&ööbföÆÆ÷w2fÆ–FF–öâà ¥V&Æ–6F–öâfW&–f–VC¢'VçF–ÖRc#CCVf6F&FSS3ƒFc&#v3SCS3VVS†S6&6S†S°¦fWF6†VB÷&–v–âöÖ–âG&VSfFSsVc–#f&#sv6F3“CS6C3ff3sc–c3&VBW†7FÇ’ÖF6†W0§FW7FVB÷WÆöFVBG&VRâÆÃC6†ævVB&Æö'2†6‚×fW&–f–VB&Vf÷&RW‡V7FVBÖÖ–âÀ¦æöâÖf÷&6VBWFFRâ6WfVâg&W6‚Æ—fRf–ÆW2'—FRÖÖF6ƒ¢6†VÆÂöÖæ–fW7BÂÖFW&–À§&W6÷W&6Rö÷fW&Æ’ö–×÷'B÷væW"÷FW7BÆ—7BæBF÷væÆöF&ÆR6×ÆRâvW3C3“cƒSS`¦æB†÷7FVBF÷öÆöw“C3“c“3ƒbvW&R–å÷&öw&W72BÆ7BVW'“²æò†÷7FVB50¦6Æ–ÖVBâgVÆÂÆö6Ã33%52&VÖ–ç2fÆ–FF–öââ'V–ÆC#rÄ•dRò$TE’f÷"æF—fP¦VÖ—76—fRFW7F–ærâæò'VçF–ÖRVF—G2gFW"gVÆÂ7V—FS²æF—fRf—7VÂvFRVæF–ærà ¢22ã#‚(	BæF—fRäôÒ÷6—G’f–Ww÷'B(	B3ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’&W÷'G2(	Ã#r52öæW‡F'V–ÆN(	Òâ&÷FV7B66WFVBVÖ—76—fS#rÀ¦æ÷&ÖÂ÷66Æ'3#bÂ6öÆ÷W"÷F–Æ–ær÷&WFVçF–öã#RæBVæFW'6–FRÆ–v‡F–æs#Bà¤&6VÆ–æRÖ–æf#&f3&FRò'VçF–ÖVc#CCVbâ&Wò÷6÷W&6RVF—B6öæf—&×2÷&–v–æÂæF—fP§&W6÷W&6RõUb÷fW&Æ’öFV6öFW"æB&VæFW"ÖÖöFW2&RWF†÷&—FF—fRà ¥7GVF–òõ6öÆ–BÆ—BæF—fR7W&f6W2æ÷r&Wf–Wr6W&FR÷VRw&—66ÆR÷6—G’Ö0¢†Æ–æV"Ç†ÖÃÓS'7V&RÂ6fVBf7F÷$÷6—G’¢ÖFW&–Â&ÆVæF–ær÷6—G’’æ@§6–×ÆR&ÆVæF–ærÖFW&–ÂVæ–f÷&Ò÷6—G’–æ6ÇVF–ær¦W&òâ÷&–v–æÂ6öÆ÷W"7F–ÆÀ§&WV—&VBâ÷VR&6R÷"&ÆVæF–æröæÇ“²÷F†W"æF—fRG—W2æBW6Uö6öÆ÷%ö÷6—G§&VÖ–â&WF–æVBÖöæÇ’f÷"÷6—G“²66WFVB÷VR6öÆ÷W"õ%"–ç7V7F–öâ—2&W6W'fV@¦f÷"6öÆ÷W"ÖÇ†f–ÆW2âW"ÖÖ&WVB÷6×ÆW"æB6öÖ&–æVC„Ö”"óG7W&f6W2ó#²6÷&æW'0§&VÖ–ââVæÆ—BõUb–ÖvR¶VW&–÷"6öÆ÷W"ÖöæÇ’öÆ–7“²6÷W&6R'—FW2÷6WGF–æw2VçF÷V6†VBà¥Vç7W÷'FVBöf–ÆVB÷6—G’&WF–ç266WFVB6öÆ÷W"õ%"æB÷&–v–æÂ÷6—G’fÆÆ&6³°¦ÆFR6æ6VÆÆF–öâ6Æ÷6W2–ÖvRæB6ææ÷B7F—fFRG&ç7&Væ7’à ¤öæR66÷VB÷&–v–æÂ7FæF&BÖFW&–Â6†FW"†öö²–væ÷&W26öÆ÷W"ÖÖÇ†v†–ÆP§6×Æ–ær$t"Â&V6W6RæF—fR6öÆ÷W"Ç†—2÷BÖ–âöFVfW'&VBâ÷&–v–æÂ&—FÖFV6öFP§&WVW7G2Vç&V×VÇF—Æ–VB$t"f÷"F†W6R7W&f6W2v—F†÷WB6†æv–ær5$t"6öçfW'6–öâà¤æò6çf2Ç†&Ww&—FR÷&RÖVæ6öFS¢F†B&V¦V7FVB&ö6‚Æ÷6W2$t"BÇ†F‡&÷Vv€¦6çf2&V×VÇF—Æ–6F–öââ6†FW"W6W2–ç7FÆÆVBF‡&VSãs’ãÖ6‡Væ²ö66†R¶W’à¤æF—fRG&ç7&Væ7’W6W2W†—7F–ærÇ†&ÆVæF–æröFWF…w&—FVfÇ6S²÷&–v–æÂÖW6€§–6¶–ær&VÖ–ç26öÆ–BâG&ç7&VçB6VÆbö–çFW'6V7F–ær6÷'F–æræB÷F–6Â&Vg&7F–öà¦f–FVÆ—G’&RäõB6Æ–ÖVBâ÷&–v–æÂ÷&ævR&6¶f6R7VR†–FW2f÷"6öæf—&ÖVBG&ç6ÇV6Vç@§7W&f6W2æB&W7F÷&W2öâF—7÷6ÂâÖW6‚6†F÷w2F—6&ÆVB†æ÷BG&ç7&VçB6†F÷w2“°¦&÷F‚÷&–v–æÂ7GVF–ò&Vg&W6‚÷væW'2&W7V7B÷fW&Æ’Æ–fWF–ÖRfÆr6ò—B6ææ÷B&RÖVæ&ÆR6öÆ–@§6†F÷w2âvVæW&ÂfÆö÷"6öçF7B7VR&VÖ–ç2Væ6†ævVBâæòvVöÖWG'’ö†—7F÷'’ö–çWBÀ¦W‡G&&VæFW&W"öÆ–v‡BÂvÆö&ÂÖFW&–Â÷fW'&–FR÷"GWÆ–6FR÷væW"à ¥6—‚æWr÷væW"÷&VÂÕF‡&VRFW7G26÷fW"wV&G2ö'VFvWG2öf7F÷'2÷6×Æ–ærÂÖFW&–Âæ@§6†FW"6VÖçF–72ÂVæ–f÷&Ò¶ÖæB¦W&òÇ†Âf–ÇW&RöÆFRF—7÷6ÂÂFV6öFW"÷F–öç2À¦7GVÂ7GVF–òõ6öÆ–B÷&–ræBÆFRö–çFW"×&VÆV6R66VæR×&Vg&W6‚6ÆVçWæBW†7BööÆVB&ö¦V7BôäôÒ'—FR&÷VæGG&—à£3f–æÂfö7W6VB52ód”Âó6¶—â'&öBÆö6ÂæöFS#Bã#"ã7V—FS33‚52ð£d”Âó6¶—ó6æ6VÂƒ“’ãS'2’ÂföÆÆ÷v–ærV&Æ–W#33…52âf–æÂfö7W6VC3&W'Và¦6÷fW'2&6·v&BÖ6ö×F–&ÆR÷VR6öÆ÷W"ÖÇ†fÆÆ&6²æB6W&–Æ—¦&ÆRUT”@¦÷6—G’÷væW'6†—†æò6—&7VÆ"W6W$FF’â7–çF‚öF–fb6ÆVã²æòæF—fRuR52à¥&Wf–WvVB&WfW'6RÖÆöFW"–ç2–æ6ÇVFR÷&–v–æÂFV6öFW"õUböW‡÷'B÷–çB&VçG3°¦Ö÷7B6†ævW2&R66†R&VfW&Væ6W2öæÇ’âÖ–âô×VÇF“ãög&÷¦Vâ&WF2Â7GVÂÆ–v‡@¦6öFRæB66WFVC#rVÖ—76–öâ&V†f–÷"&WF–æVBâ–âÖ6†V6¶Æ—7B–æ6ÇVFW3#‚à¤vVæW&–26×ÆRFö72÷6×ÆW2ôäôÕôõ4•E•ó#‚ææöÒW6W2÷&–v–æÂæF—fRw&—FW#°¦ÆVgBw&—66ÆR6†V6¶W"÷6—G’ÂÖ–FFÆS3RRVæ–f÷&ÒÂ&–v‡B÷VR6öçG&öÂà ¤DUd”4S#ƒ¢–×÷'B6×ÆR7GVF–òõ6öÆ–BÂ÷&&—BæB–ç7V7B6†V6¶W"†öÆW2öÖ–FFÆP§G&ç7&Væ7’ö6öçG&öÃ²æò÷&ævRf–ÆÂF‡&÷Vv‚G&ç7&VçB&V2â6VÆV7BôÖ÷fRõVæFõ&VFòÀ§7v—F6‚Æöö·2ö&6³²6fRô÷Vâæ&÷†Æ"æBäôÔBôæöÖB&WF–â÷6—G’6WGF–æw2öÖ2à¤Ç6ò&V–×÷'B66WFVC#rVÖ—76—fR6×ÆRf÷"V–6²6æ—G’âæòæWrô"&F6‚à¤æW‡C¢æF—fR÷6—G’fVVF&6²ÂF†VâVF—B6öÆ÷W"ÖÇ†7W÷'B÷&VÖ–æ–ærG&ç6f÷&Ð§6×Æ–ær&Vf÷&RF—7Æ6VÖVçC²F—7Æ6VÖVçB7V&F—f—6–öâ&VÖ–ç26W&FVÇ’FVfW'&VBà ¥6÷W&6W3¢öff–6–ÂæöÖBÖFW&–ÂÖçVÂ‡GG3¢òöæöÖG67VÇBæ6öÒöÖçVÂöÖFW&–À¦æB7FW†öÖ’öæöÖBÖÆ–æ²&ÆVæFW"öæöÖEö&ÆVæFW%öÆ–æ²õõö–æ—Eõòç“¢6W&FRæöâÖ6öÆ÷W ¦÷6—G’æB÷BÖ–â6öÆ÷W"Ç†²–×ÆVÖVçFF–öâW6W2&÷VæFVBw&—66ÆRöæÇ’à ¥V&Æ–6F–öâfW&–f–VC¢'VçF–ÖRCsƒcc–C†SS“CsCvfcƒfsS–F6#V°¦fWF6†VB÷&–v–âöÖ–âG&VVF3scsFSvV6CC“S3ƒ&6CcSƒs6cCcf&FfSbW†7FÇ’ÖF6†W0§fÆ–FFVB÷WÆöFVBf–ÆW2âÆÃCR6†ævVB&Æö'2†6‚×fW&–f–VB&Vf÷&RæöâÖf÷&6VBÀ¦W‡V7FVBÖÖ–âWFFRã’ó’g&W6‚Æ—fR'—FRÖF6†W3¢6†VÆÂöÖæ–fW7BÆæF—fR&W6÷W&6RÀ¥Ub7W&f6RöFV6öFW"Ç&VæFW"ÖÖöFW2ÆÆFR7GVF–ò66VæRf—‚ÇFW7BÆ—7BæBäôÒ6×ÆRà¥vW3C33Cc32æB†÷7FVBF÷öÆöw“C33CcSS’vW&R–å÷&öw&W72BÆ7BVW'“°¦æò†÷7FVBgVÆÂ526Æ–ÖVBâ'&öBÆö6Ã33…52æBf–æÂfö7W6VC352&VÖ–à§fÆ–FF–öââ'V–ÆC#‚Ä•dRò$TE’f÷"æF—fR÷6—G’FW7F–æs²æF—fRuRö•@¦V&æ6RvFR&VÖ–ç2VæF–ærâF†—2V&Æ–6F–öâ&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’à ¢22ã#’(	BæF—fRäôÒ6öÆ÷W"Ö–ÖvRÇ†(	B3ö7Fö&W"##` ¥W6W"6÷'&V7G2–æ—F–Ã#‚d”Ã¢(	Ã#‚52Ò&Vg&W6‚Föö²6öÖRF–ÖR'WB—Bv÷&¶V@¦WfVçGVÆÇ’¢’öæW‡F'V–ÆN(	ÒâF†—27WW'6VFW2F†R–æ—F–Â&W÷'C²&÷FV7B66WFV@£#‚w&—66ÆR÷6—G’ö&ÆVæF–ærö&6¶f6R÷6†F÷r†æFÆ–ærÇW3#rVÖ—76–öâæ@£#bó#R%"÷&WFVçF–öââ&Vg&W6‚Ær—2âö'6W'fF–öâÂæ÷BWf–FVæ6Röb÷6—G¦f–ÇW&S²fW&–g’æWr6†VÆÂöÖæ–fW7B÷–ç2öÆ—fR'—FW2Âæò7V7VÆF—fR&Vg&W6‚6†ævW2à¤&6VÆ–æRÖ–ãs“vc3S3‚ò'VçF–ÖRCsƒcc’à ¤VF—C¢æF—fRÖFW&–ÂÇ&VG’&WF–ç2W6Uö6öÆ÷%ö÷6—G’âW‡FVæBW†—7F–ær&W6÷W&6P§ÆâæBUb÷fW&Æ’öæÇ“¢W‡Æ–6—BG'VRó÷G2–çFò6öÆ÷W"Ö–ÖvRÇ†–âÆ—BæF—fP¥7GVF–òõ6öÆ–BâfÇ6Róö'6VçB7F—26öÆ–BVæÆW72W†—7F–ær÷6—G’Ö÷66Æ"Æ–W2à¥Væ¶æ÷vâfÆw2&WF–â&–÷"÷VR–ç7V7F–öâ÷&VgW6Ã²æòG'WF†–æW726öW&6–öâà¥F‡&VRw2õ$”t”äÂ$t$Ö6†FW"æ÷r'Vç2f÷"÷FVBÖ–â7W&f6W2Â×VÇF—Ç––ær–ÖvP¦Ç†v—F‚W†—7F–ærÆ–æV"Ç†ÖæBf7F÷$÷6—G’¢&ÆVæF–ærÖFW&–Â÷6—G’à¤66WFVC#‚$t"ÖöæÇ’6†FW"7F—2f÷"6öÆ÷W"ÖÇ†ôdbv†Vâ÷6—G’—2÷F†W'v—6P¦7F—fRâæF—fRÆ—B6öÆ÷W"&WVW7G2W†—7F–ærVç&V×VÇF—Æ–VB&—FÖF‚WfVâv†Và¦Ç†ôdb6òæöç¦W&ò$t"VæFW"¦W&òÇ†7W'f—fW3²æò—†VÂ&Ww&—FR÷&RÖVæ6öFRà¤W†—7F–ær6W&–Â6æ6VÆÆF–öâÂ&Wf–Wr'VFvWG2Â6÷W&6R'—FW2Âæ÷&ÖÂ÷66Æ"öVÖ—76–öâÀ§6VÆV7F–öâ÷–6¶–ærö†—7F÷'’Â6†F÷rö&6¶f6RÆ–fWF–ÖRæB&÷F‚7GVF–ò÷væW'2&WF–æVBà¥VæÆ—BõUb–ÖvR&WF–â&–÷"6öÆ÷W"ÖöæÇ’öÆ–7“²&Vg&7F–öâöFF—F—fRöF—F†W&–æröæF—fP§fW'FW‚÷6—G’&VÖ–âVç7W÷'FVBâG&ç7&Væ7’6÷'F–ærÆ–Ö—FF–öç2Væ6†ævVBà¤æòvVöÖWG'’÷7V&F—f—6–öâöW‡G&&VæFW&W"öÆ–v‡B÷"vÆö&ÂÖFW&–Â6†ævRà ¤f÷W"æWr&VÂÖ÷væW"õF‡&VRö7GVÂ$t$är6†V6·26÷fW"W‡Æ–6—BfÆr6VÖçF–72À¥$t$g2$t"ÖöæÇ’6†FW"&÷WF–ærÂ6öÖ&–æVB–æFWVæFVçBÖ÷66Æ"f7F÷'2Â6öÆ–Bôd`¦6öçG&öÂÂ&r¦W&òögVÆÂÇ†¶æöç¦W&ò$t"æBVç&V×VÇF—Æ–VBFV6öFW"ö6æ6VÆÆF–öâÀ§VæÆ—BõUb–ÖvRæBW†7BööÆVB6fT÷VâöæF—fRäôÒ'—FW2ã#‚FW7Bæ÷r66WG0¦W‡Æ–6—BfÆsW"æWrfVGW&RæB7F–ÆÂ&V¦V7G2–çfÆ–C#²ÆÂ&Wf–÷W2Ö÷6†F÷rð¦6ÆVçW76W'F–öç2&WF–æVBã3Rfö7W6VB52ód”Âó6¶—âgVÆÂf–æÂÆö6ÂæöFS#Bã#"ã7V—FS3C"52ð£d”Âó6¶—ó6æ6VÂƒ##"ã32“²æò'VçF–ÖR÷FW7BVF—G2gFW"gVÆÂ×7V—FR7F'Bà¥7–çF‚öF–fb6ÆVââæòæF—fRuRö•Bf—7VÂ66WFæ6R–æfW'&VBà¥&Wf–WvVB&WfW'6RÖÆöFW"66†R6Æ÷7W&S²Ö÷7B6†ævW2–×÷'B–ç2öæÇ’â&÷FV7FV@¦Ö–âô×VÇF“ãög&÷¦Vâ&WF2ÂFV6öFW"æB&÷Fƒ#‚7GVF–ò6†F÷r÷væW'2Væ6†ævVBà¤–âÖÆ—7B–æ6ÇVFW3#’6†V6·3²&–÷##‚&F–æw2&WF–æVC²æòô"&F6‚&WV—&VBà ¤vVæW&–2Fö72÷6×ÆW2ôäôÕô4ôÄõU%ôÅ„ó#’ææöÓ¢ÆVgBÇ†ôâ6†V6¶W"†öÆW3²Ö–FFÆP§6ÖR–ÖvR‚6W&FS'‚÷6—G’Ö‚Væ–f÷&ÓcRR†f7F÷$÷6—G’ã‚“²&–v‡B6ÖR–ÖvP¦Ç†ôdbÂ6öÆ–Bâf—‡GW&R—2FW7BÖöæÇ’$t$är6öç7G'V7F–öâÇW2÷&–v–æÂæF—fP§w&—FW#²÷&–v–æÂ&öGV7F–öâ÷VRärVæ6öFW'2VçF÷V6†VBâæòW6W"'Gv÷&²à¤DUd”4S#’7GVF–òõ6öÆ–B÷&&—C¢ÆVgB6†V6¶W"†öÆW2ÆÖ–FFÆR6öÖ&–æVBG&ç7&Væ7’À§&–v‡B6öÆ–B7–ã²6VÆV7BôÖ÷fRõVæFõ&VFòÆÆöö·2ö&6²Å6fT÷Vâæ&÷†Æ"ÄäôÔBôæöÖBà¤66WFVC#‚æC#r6×ÆW2Væ6†ævVBâæF—fRuRö•C#’66WFæ6RVæF–ærà¤æW‡BæF—fR6öÆ÷W"ÖÇ†fVVF&6²ÂF†VâVF—BæF—fRFW‡GW&RG&ç6ÆF–öâ÷&÷FF–öà§6×Æ–ærF‡&÷Vv‚6ÖR÷væW#²F—7Æ6VÖVçB÷7V&F—f—6–öâ&VÖ–ç26W&FVÇ’FVfW'&VBà ¢22ã3(	BæF—fRäôÒFW‡GW&RG&ç6ÆF–öâæB&÷FF–öâ(	B3ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’&W÷'G2ã#’52æBöæW‡F'V–ÆBâ&÷FV7B6öÆ÷W"Ö–ÖvRÇ†À¦6öÖ&–æVB6W&FR÷6—G’÷66Æ'2Â6öÆ–Bôdb6öçG&öÂÂ6÷W&6R&WFVçF–öâæBÆÀ¦66WFVBã#^(	2ã#‚%"÷&÷VæB×G&—öÆ–v‡F–ær&V†f–÷W'2â&6VÆ–æRÖ–â÷'VçF–ÖP£fFfcfSVCV#–#cV#–cfSƒ#ƒV&3vC–6ScƒFBâ7W'&VçBçVÖ&W&VB&VÆV6Rã3à ¤VF—Bf÷VæBæF—fRFW‡GW&RG&ç6f÷&×2Ç&VG’&WF–æVB'WBf–Ww÷'BFVÆ–&W&FVÇ§&VgW6VBæöç¦W&òöfg6WG2÷&÷FF–öââW†—7F–æræöÖBÖÖFW&–Â×&W6÷W&6RÆâæ@§WbÖ–ÖvR×7W&f6R×&Wf–Wr&VÖ–âWF†÷&—FF—fRâfW&–f–VB6öçfVçF–öâv–ç7@§7FW†öÖ’öæöÖBÖÆ–æ²6öÖÖ—Cƒ3“3†Sc#sC“63cs6S#CS–VCV&SS–3À¦&ÆVæFW"öæöÖEö&ÆVæFW%öÆ–æ²õõö–æ—Eõòç’6WEöÖ–æu÷G&ç6f÷&Ó¢&F–ç2ÂæF—fP¥Ub÷&–v–âBF÷ÆVgBÂ66ÆRD„Tâ&÷FF–öâD„Tâöfg6WB&÷WBUb¦W&òâ6öæ§VvF–æp¦—G2&ÆVæFW"Ö–ær'’bÓâÕbv—fW2æF—fRÖG&—‚&÷w3 ¥¶6÷2‡"’§7‚Â6–â‡"’§7’Âöfg6WE…Ó²²×6–â‡"’§7‚Â6÷2‡"’§7’Âöfg6WE•Ó²³ÃÃÒà¥F‡&VRWFöÖF–2FW‡GW&RG&ç6f÷&×2†fRF–ffW&VçB÷&FW"VæFW"æöçVæ–f÷&Ò66ÆS°§W6R—G2÷&–v–æÂW"×FW‡GW&RÖG&—‚v—F‚ÖG&—„WFõWFFSÖfÇ6RÂæ÷B&¶VBUbVF—G2à¤V6‚6öÆ÷W"öæ÷&ÖÂ÷&÷Vv†æW72öÖWFÆæW72öVÖ—76—fRö÷6—G’Ö†2—G2÷vâG&ç6f÷&Òà¥Ub–ÖvRöÇv—2×VæÆ—B7F’6öÆ÷W"ÖöæÇ’Âæ÷rv—F‚7W÷'FVB6öÆ÷W"G&ç6f÷&×2à¤ÖÆf÷&ÖVBöæöæf–æ—FR÷"fÆöC3"Ö÷fW&fÆ÷r66ÆRööfg6WB&VÖ–ç2&WF–æVBÖöæÇ“²–çfÆ–@¦W†–Æ–'’6¶—2öæÇ’F†BÖâWFòõUb&ö¦V7F–öâÂ'VFvWG2ÂW†7B6÷W&6R'—FW2À¦÷&–v–æÂ–6¶–ærövVöÖWG'’ö†—7F÷'’Â6W&–ÂFV6öFRö6æ6VÂöF—7÷6ÂÂG&ç7&Væ7’æ@¥7GVF–ò6†F÷r÷væW'2Væ6†ævVBâæòæWr&VæFW&W"ÂUböÖöFVÆÆ–ær¶W&æVÂ÷"T’&W6¶–âà¥G&—Ææ"öF—7Æ6VÖVçB÷&Vg&7F–öâöFF—F—fRöF—F†W&–ær&VÖ–â6W&FVÇ’Vç7W÷'FVBà ¤f÷W"æWr7GVÂÖ÷væW"÷&VÂÕF‡&VRFW7G26†V6²–æFWVæFVçB&ÆVæFW"Ö6öæ§VvFRvöÆFVà¥Ub÷6—F–öç2Â&÷F‚&÷FF–öâ6–vç2Â6–væVBöæöçVæ–f÷&Ò66ÆRÂWfW'’ÖÖG&—‚æ@¦6öÆ÷W"76RöÇ†ÂVæ6†ævVBUg2÷6÷W&6RÂÖÆf÷&ÖVB–çWBæBÆFR6æ6VÆÆF–öâÀ¥Ub–ÖvR÷VæÆ—BæB'—FRÖ–FVçF–6ÂööÆVBö–æÆ–æR6fT÷VâæBæF—fRäôÒ'6RöW‡÷'Bà¤öÆFW"ã#^(	2ã#‚æöç¦W&ò×G&ç6f÷&Ò&VgW6Âf—‡GW&W2æ÷rW6Ræöæf–æ—FRG&ç6f÷&×3°§F†R6ÖR&VgW6Â76W'F–öç27F’7F—fRæBæWrFW7G26÷fW"F†RW‡æFVB6&–Æ—G’à£Cfö7W6VB6†V6·252ód”Âó6¶—–æ6ÇVF–ær&VÆV6Rö66†Rö–FVçF—G’&÷FV7F–öâà¤gVÆÂÆö6ÂæöFS#Bã#"ã7V—FS¢3Cb52ód”Âó6¶—ó6æ6VÂƒ#Bã#72’âf–æÂ6æöæ–6Â&VçBÖÆöFW"ö66†R6†V6·2&W'Vã¢52gFW"–âÖöæÇ’6÷'&V7F–öâFòG&vW"Óâf6RÖÆ–÷WBÓâ&VÆV6R×fW'6–öââæògVæ7F–öæÂ'VçF–ÖR÷FW7B6†ævW2gFW"gVÆÂ×7V—FR7F'BâV&Æ–6F–öâfW&–f–VC¢6VRFö72÷V&Æ–6F–öâÓ3æÖC²æòuRö•B526Æ–ÖVBà ¤vVæW&–2Fö72÷6×ÆW2ôäôÕõDU…EU$UõE$å4dõ$Õó3ææöÒƒsbÃƒ‚'—FW2“¢7–â'&÷röà¦f÷W"6öÆ÷W&VBVG&çG2âÆVgB÷&–v–æÂÂÖ–FFÆRöfg6WE²ã#RÂã#UÒÂ&–v‡B66ÆU³"ÃÐ§F†Vâ’ó"&÷FF–öâv—F‚öfg6WE³Ã%Òâ6ÖR6÷W&6R–ÖvS²6ö×&R4ÔRf–ÆR–âæöÖBà¤–âÖFW7BÆ—7BWFFVC²V&Æ–W"ã#’&F–æw2&WF–æVC²æòæWrô"&F6‚à¥&Wf–WvVB&WfW'6RÆöFW"w&‚æB6æöæ–6Â&VÆV6R÷&V6÷fW'’–ç2ã3²÷F†W §'VçF–ÖR¥26†ævW2&R–×÷'B–ç2öæÇ’âÖ–âô×VÇF“ãög&÷¦Vâ&WF2VçF÷V6†VBà ¤DUd”4S3¢–×÷'B6×ÆR–â7GVF–òõ6öÆ–BÂ6ö×&R÷&–v–æÂ÷6†–gFVB÷6–FWv—2&WVFV@¦'&÷rv—F‚æöÖC²÷&&—B÷6VÆV7BôÖ÷fRõVæFõ&VFó²7v—F6‚Æöö·2Â6fT÷Vâæ&÷†Æ"æ@¤äôÔBôæöÖB6ö×&—6öââ66WFVBã#’6öÆ÷W"ÖÇ†6×ÆR6†÷VÆB7F’Væ6†ævVBà¤æW‡C¢æF—fRG&ç6f÷&ÒfVVF&6²ÂF†VâVF—B&VÖ–æ–ær6×ÆW"÷&ö¦V7F–öâv3°¦F—7Æ6VÖVçB÷7V&F—f—6–öâæVVG2—G26W&FR&÷VæFVBW&f÷&Öæ6Rö&Væ6†Ö&²FV6—6–öâà ¢22ã3V&Æ–6F–öâfW&–f–VB(	B3ö7Fö&W"##` ¥'VçF–ÖR6öÖÖ—B6cFVFS“cC#ffffVfV3&#Sccs&fC&F#²fWF6†VB÷&–v–âöÖ–âG&VP£†cccS†“3–3†fC–#S“SCc#ƒC3–#““6FfÖF6†W2fÆ–FFVBÆö6ÂVFcv6cBG&VRà¤ÆÃCBWÆöFVB&Æö"†6†W2fW&–f–VB&Vf÷&RW‡V7FVBÖÖ–âÂæöâÖf÷&6VB&VbWFFRà¤v—D‡V"vW3CS#sC#3"6ö×ÆWFVB5T44U52âV–v‡Bg&W6‚V&Æ–2f–ÆW2'—FRÖÖF6ƒ §fW'6–öâæ§6öâÆ–æFW‚æ‡FÖÂÆæF—fRÖFW&–ÂÆâÅUb–ÖvR÷fW&Æ’ÆG&vW"öf6RÖÆ–÷W@¦6æöæ–6ÂÆöFW"6†–âÆ–âÖFW7BÆ—7BæBF÷væÆöF&ÆRäôÒG&ç6f÷&Ò6×ÆRà¤gVÆÂÆö6Ã3Cb52ód”Âó6¶—ó6æ6VÂƒ#Bã#72“²f–æÃRG&ç6f÷&Ò÷&VÆV6Rö66†Rð¦–FVçF—G’6†V6·252gFW"F†R&VçB–âÖöæÇ’6÷'&V7F–öââ†÷7FVBF÷öÆöw“CS#sC3s0§v2–å÷&öw&W72B&ööbF–ÖS²æò†÷7FVBgVÆÂ52÷"æF—fRuR66WFæ6R6Æ–ÖVBà¤æògVæ7F–öæÂ'VçF–ÖR÷FW7B6†ævW2gFW"F†RgVÆÂ7V—FR7F'FVBâF†—2V&Æ–6F–öà§&ööb—2Fö72ÖöæÇ“²'VçF–ÖRæB76WB6öçG&7B&VÖ–â'—FRÖ–FVçF–6Âà ¤'V–ÆBã3Ä•dRò$TE’dõ"DU5D”ärâW6W"ã#’52&÷FV7FVBâDUd”4S3–×÷'@§6×ÆRÆ6ö×&R÷&–v–æÂööfg6WB÷6–FWv—2&WVFVB'&÷r–â&÷„Æ"æBæöÖC°¥7GVF–òõ6öÆ–Bö÷&&—BÄÖ÷fUVæFõ&VFòÆÆöö·2ö&6²Å6fT÷Vâæ&÷†Æ"ÄäôÔBôæöÖBâ66WFV@¦6öÆ÷W"ÖÇ†#’6×ÆRVæ6†ævVBâæW‡BföÆÆ÷ræF—fRFW‡GW&R×G&ç6f÷&ÒfVVF&6³°§G&—Ææ"öF—7Æ6VÖVçBæBF†V—"W&f÷&Öæ6RvFW2&VÖ–â6W&FVÇ’FVfW'&VBà ¢22ã3(	BæF—fRäôÒ–ÖvW2–âF†RW†—7F–ærUbVF—F÷"(	B3ö7Fö&W"##` ¥W6W"ã352öæW‡F'V–ÆB&÷FV7G2W"ÖÖUbG&ç6ÆF–öâ÷&÷FF–öâÂ66WFV@¦æF—fR%"öÇ†ö÷6—G’÷&WFVçF–öâæB&÷VæBG&—2â&6VÆ–æRÖ–âf6VV3fVð§'VçF–ÖR6cFVFRâ†÷7FVBã3&Vw&W76–öãCS#sC3s2æ÷r6ö×ÆWFVB5T44U52à¤7W'&VçBçVÖ&W&VB&VÆV6Rã3²fÆ–FF–öâ÷V&Æ–6F–öâföÆÆ÷w2&VÆ÷rà ¤VF—C¢Ubv÷&·76Rw2÷&–v–æÂ–ÖvR'WGFöâöG&÷F÷vâö6öçG&öÆÆW"ö6çf2öæÇ§&W6öÇfVBtÄ"&W6÷W&6W2âæF—fRäôÒÖFW&–Ç2Ç&VG’&WF–âVæ6öFVBÖ2æB†fP£4B&Wf–Wr÷væW'3²&V6öææV7BF†R÷&–v–æÂf–WvW"&F†W"F†âFBæ÷F†W"–ç7V7F÷"à¤W†—7F–ær–×÷'FVEUd–ÖvT6†ö–6W2æ÷r&W6öÇfW2æF—fR&W6÷W&6W2f–÷&–v–æÀ¦æöÖDÖFW&–ÄÖ2fÆ–FF–öââv÷&·76R&WVW7G26öÆ÷W"Âæ÷&ÖÂÂVÖ—76—fRÀ¥&÷Vv†æW72ÂÖWFÆæW72Â÷6—G’æBF—7Æ6VÖVçBâV6‚÷F–öâW6W27GVÂ6Æ÷BöæÖP¦æB÷&–v–æÂ'—FW3²æF—fR6W&FR66Æ"–ÖvW2†fRäò–æfW'&VBtÄ"rô"6†ææVÂà¤FVfVÇB6ÆÆW'27F’6öÆ÷W"ÖöæÇ“²tÄ"Ö&W6öÇWF–öâ÷6¶VBÖ6†ææVÂöÆ–7’Væ6†ævVBà ¥F†—2—2$r–ÖvR–ç7V7F–öâ–âF–ÆS(	3âW‡Æ–6—BæF—fR7FGW26—2–ç7V7F–öà¦öæÇ’æBÖFW&–ÂÖ–æræ÷BÆ–VC¢æòF–Æ–ær÷&÷FF–öâöf7F÷'2&¶VB†W&RÂæð£4BF—7Æ6VÖVçB7W÷'B–×Æ–VBâärô¥Tr6–væGW&RôÔ”ÔRæB„Ö”"FVfVÇB6÷W&6P¦&÷VæG2&VÖ–ã²÷&–v–æÂFV6öFW"62f—7VÂ÷WGWBC#G7V&Râ6—‡FVVâÖ&—B6÷W&6P¦—2&WF–æVBVæ6†ævVBFW7—FRF†R&÷VæFVB'&÷w6W"–ÖvR&Wf–Wrâ–çfÆ–B&W6÷W&6W0§&WGW&âæò6†ö–6W3²–çfÆ–B÷Vç7W÷'FVB–ÖvR÷"÷fW'6—¦RöÖ—G2F†B&VfW&Væ6RöæÇ’à¥6fR÷F–öâçFW‡D6öçFVçBÂ÷&–v–æÂ6VÆV7F–öâ÷â÷¦ööÒÂ&VBÖöæÇ’æF—fRUb6öçG&öÇ2À§6W&–ÂvVæW&F–öâ6æ6VÆÆF–öâÂÆFR&—FÖ&VÆV6RÂ&V÷Vâ÷&W6WBæB6÷W&6Rö†—7F÷'§&VÖ–ââæò&r×ö–çFW"÷&VæFW&–æröÖöFVÆÆ–ærõUböW‡÷'B¶W&æVÂ÷"66†VÖ6†ævW2à ¤f—fRæWr&VÂÖ÷væW"FW7G26÷fW"ÆÃrW†7B&VfW&Væ6W2öæÖR6fWG’ö'VFvWG2ôÔ”ÔRÀ¦æòÖ6öÆ÷W"–çWBÂÆFR7v—F6‚ö6Æ÷6Röf–ÆVBFV6öFRÂ7GVÂ&VFöæÇ’Ubv÷&·76P¦'WGFöç2ö6çf2æBW†7BööÆVBö–æÆ–æR6fT÷VâöæF—fRäôÒ&÷VæGG&—÷6×ÆR'—FW2à£s’fö7W6VB52ód”Âó6¶—–æ6Â66WFVBæF—fS3ó#^(	3#’ÂtÄ"–ÖvR÷7W&f6Rð§6¶VB66Æ"÷v÷&·76R÷&VÆV6R6†V6·2âgVÆÂÆö6ÂæöFS#Bã#"ã7V—FS£3S52ód”Âó6¶—ó6æ6VÂƒ#ãCw2’âæò'VçF–ÖR÷FW7BVF—G2gFW"gVÆÂ×7V—FR7F'BâV&Æ–6F–öâfW&–f–VB–âFö72÷V&Æ–6F–öâÓ3æÖC²æòæF—fR'&÷w6W"ôuRV&æ6R66WFæ6R–æfW'&VBâ&WfW'6R66†Rw&‚æB6æöæ–6À§&VÆV6R–ç2&Wf–WvVC²&VçB6†ævW2&R–âÖöæÇ’âÖ–âô×VÇF“ãög&÷¦Vâ&WF2À£3ÖFW&–ÂÆâæB7GVÃ4B÷6†F÷r–×ÆVÖVçFF–öç2Væ6†ævVBà ¤vVæW&–26×ÆRFö72÷6×ÆW2ôäôÕôÔô”å5T5D”ôåó3ææöÒ—2öæR7V&Rv—F‚ÆÃrÖ2À¦–æ6ÇVF–ærbÖ&—BG&—Ææ"F—7Æ6VÖVçB&WF–æVBf÷"–ç7V7F–öâöW‡÷'Bâ–âÖFW7@¦Æ—7BWFFVC²&–÷"ã3&F–æw2&WF–æVBÂæòæWrô"&F6‚à¤DUd”4S3–×÷'B6×ÆRÓâö&¦V7B&F–ÂUbÓâUbVF—F÷"Óâ–ÖvS²6†ö÷6RÆÃp¦–ÖvW2ââ÷¦ööÒæB7v—F6ƒ²&6²Fó4Bô6Æ÷6R÷&V÷Vã²6fT÷Vâæ&÷†Æ"æBäôÔB¶VW ¦Ö2â&WFW7B66WFVC3f–Ww÷'B6×ÆR–b6öçfVæ–VçBâæW‡BæF—fRf–WvW"fVVF&6²À§F†VâVF—B7W÷'FVB%"ÖFW&–Ç2Æ6¶–ær6öÆ÷W"FW‡GW&S²7V&F—f—6–öâöF—7Æ6VÖVç@§7F–ÆÂæVVG2—G26W&FR&÷VæFVBW&f÷&Öæ6Rö&Væ6†Ö&²FV6—6–öâà ¢22ã3V&Æ–6F–öâfW&–f–VB(	B3ö7Fö&W"##` ¥'VçF–ÖSƒS&CcCSS##cs6cvc#vc3ƒC&3CV36c†#6FC²fWF6†VB÷&–v–âöÖ–âG&VP£†3cs3c3SVcfS–Vcs#cƒ6&VcV3VfVS“3cFVBWVÇ2fÆ–FFVBÆö6Ãf&†VS“‚G&VRà¤ÆÃ#R6†ævVB&Æö'2†6‚×fW&–f–VB&Vf÷&RW‡V7FVBÖÖ–âöæöâÖf÷&6VBWFFRà¥vW3CSƒsSƒƒ6ö×ÆWFVB5T44U52ã’ó’g&W6‚Æ—fR'—FRÖF6†W3¢6†VÆÂöÖæ–fW7BÀ¥Ub–ÖvR&W6öÇfW"÷v÷&·76RÄÖW6‚†VÇF‚ÇFW7BÆ—7BÆG&vW"ÇVæ6†ævVBæF—fRÖFW&–À§ÆâæB6×ÆRäôÒƒsBÃ3“f'—FW3²&WG'’gFW"öæRG&ç6–VçCS2’à¤gVÆÂÆö6ÂæöFS#Bã#"ã£3S52ód”Âó6¶—ó6æ6VÂƒ#ãCw2’Âfö7W6VCs•52à¤æò'VçF–ÖR÷FW7BVF—G2gFW"gVÆÂ×7V—FR7F'Bâ†÷7FVBF÷öÆöw“CSƒsSs‚v0¦–å÷&öw&W72B&ööc²æò†÷7FVBgVÆÂ526Æ–ÖVBâæF—fRV&æ6RvFRVæF–ærà¥F†—2&ööb—2Fö7VÖVçFF–öâÖöæÇ“²'VçF–ÖRö6öçG&7B7F’W†7FÇ’fÆ–FFVBà ¤'V–ÆBã3Ä•dRò$TE’dõ"DU5D”ärâW6W"ã352&÷FV7FVBâ–âö&¦V7BÖöFP§6VÆV7B6×ÆR7V&RÓâ&F–ÂUbÓâUbVF—F÷"Óâ–ÖvRÓâ–ç7V7CræÖVBÖ2à¥&r–ÖvR&VfW&Væ6W2ÂæòÖFW&–ÂG&ç6f÷&×2öf7F÷'3²F—7Æ6VÖVçB–ç7V7F–öâöæÇ’à¥â÷¦ööÒ÷7v—F6‚Ä&6²Fó4Bô6Æ÷6R÷&V÷Vã²6fT÷Vâæ&÷†Æ"æBäôÔB&W6W'fRÖ2à¤æW‡BæF—fRf–WvW"fVVF&6²F†VâVF—BæòÖ6öÆ÷W"ÖÖÖFW&–Â&Wf–Ws²&÷VæFV@§7V&F—f—6–öâöF—7Æ6VÖVçBæB&Væ6†Ö&²FV6—6–öâ&VÖ–âFVfW'&VBà ¢22ã3"(	Bd”Ur7F'GW&W—"æB6WfVâÖö&¦V7B&WFW7B(	B3ö7Fö&W"##` ¥W6W"ã3d”Ã¢(	Ãrö&¦V7G2F–Bæ÷BÆöN(	ÒæBd”UrÖöFW2(	Ç6VVÒFò†fR&VVà§&VÖ÷fVBâ$”rd”Î(	Òâ7F÷fVGW&R&öÆÆ÷WC²ã3&VÖ–ç2F†RÆ7B66WFVB'V–ÆBà¤&6VÆ–æRÖ–ã3†Scs‚÷'VçF–ÖSƒS&CcBâF†Rã36×ÆR5ETÄÅ’6öçF–ç2ôäR7V&P§v—F‚6WfVâÖ2Âæ÷B6WfVâö&¦V7G2âæò–×÷'FW"ö&¦V7BÖÆ÷72&W&öGV7F–öâf÷VæC°§&WÆ6RVæ6ÆV"&WFW7Bv—F‚âW‡Æ–6—B6WfVâÖö&¦V7Bf—‡GW&R–ç7FVBöb&WFVæF–æp§F†R÷&–v–æÂf–ÆR6öçF–æVB6WfVââ¶VWã3f–ÆVB÷VæF–ærFWf–6RvFRf—6–&ÆRà ¥d”Ur6÷W&6Rö'WGFöç2vW&Ræ÷B–çFVçF–öæÆÇ’&VÖ÷fVBâ6Æ÷VB'&÷w6W"öâÆ—fS3§6†÷w2ÆÃ"Æöö²6öçG&öÇ2Â'WB6Æ÷VBvV$tÂ—2F—6&ÆVBÂ6òF†—2FöW2äõB&VgWFP¦æF—fRfVVF&6²÷"&÷fRuR÷W&F–öââ6öæ7&WFR÷væW"fÆr&W&öGV6VC¢–ç7FÆÅT§W6W2†÷7Bæ–ææW$…DÔÂÂFVÆWF–ær6f—G’õ6–Æ†÷VWGFR–bF†V—"–æFWVæFVçB÷væW'2'Và¦f—'7C²FF6WBç&VG’Ç6ò&WfVçG2&W7F÷&–ærâV×F–VB†÷7BâGvòæWr&VÂÖ÷væW ¤DôÒFW7G2d”Âv–ç7C36÷W&6RæB52gFW"&W—"âW†7B•Bv†öÆRÖÖVçP¦f–ÇW&R6W6R&VÖ–ç2Vç&÷fVã²æò7V7VÆF—fR552ö6ö×÷6—F÷"÷"66†RF–væ÷6—2à ¤÷&–v–æÂ&VæFW"ÖÖöFW2–ç7FÆÆW"æ÷rFG2öæÇ’Ö—76–ær&6R'WGFöç2g&öÒ—G26ÖP£Ö'WGFöâFV×ÆFRÂ&W6W'f–ærW†—7F–ær6f—G’õ6–Æ†÷VWGFRæöFW2öÆ—7FVæW'2âW"Ö†÷7@¦FVÆVvF–öâ&–æG2ôä4RâæF—fRd”Ur÷Vâ&R×'Vç2F†—2–FV×÷FVçB–ç7FÆÆW"Â&W7F÷&–æp¦Ö—76–ærö6ÆV&VB&6R6öçG&öÇ2v—F†÷WBöÆÆ–ærÂæWr&VæFW"Væv–æR÷"vVöÖWG'’6†ævW2à¤÷&–v–æÂf6Vw&÷W6öçG&öÇ2æB7GVÂ6WDÖöFR7F–öç2&WF–æVBâæò6†FW"öÆ–v‡Bð¦ÖFW&–Â÷6VÆV7F–öâö†—7F÷'’ö–çWBô552ög&÷¦VâöÖ–âô×VÇF’–×ÆVÖVçFF–öâ6†ævW2à ¤æF—fR&rÖ–ÖvR–ç7V7F–öâFFW"Ö÷fVBõUBöb6†&VBWbÖ–ÖvR×&Wf–Wr–çFð§v÷&·76RÖöæÇ’æöÖB×WbÖ–ÖvRÖ6†ö–6W2â6†&VB–ÖvR6öçG&öÆÆW"&V6V—fW2—G2&W6öÇfW ¦2â÷F–öã²tÄ"ó4BF‡2&WF–â÷&–v–æÂ&W6öÇfW"æBFV6öFW"âF†—2&VÖ÷fW2F†P¦–ç7V7F–öâFWVæFVæ7’g&öÒF†R&VæFW"ÖÖöFRw&ƒ²äõB6Æ–ÒF†B—B6W6VBF†P§&W÷'FVBf–ÇW&RâW†—7F–æs36WfVâ×6Æ÷Bö'—FRóbÖ&—Bö6æ6VÂõUb&VBÖöæÇ’FW7G27F¦7F—fRF‡&÷Vv‚F†R÷&–v–æÂv÷&·76RFFW"âæòGWÆ–6FRFV6öFW"÷"–ÖvRööÂà ¤æWrFö72÷6×ÆW2ôäôÕõ4UdTåôô$¤T5E5ó3"ææöÓ¢4UdTâ–æFWVæFVçB7V&W2–âGvò&÷w2À¦æÖVC6öÆ÷W"Ã"æ÷&ÖÂÃ2VÖ—76—fRÃB&÷Vv†æW72ÃRÖWFÆæW72Ãb÷6—G’À£rF—7Æ6VÖVçBâV6‚6öçF–ç2ôäRW†7B&rÖ&VfW&Væ6Rf÷"Ub–ÖvR–ç7V7F–öâà¤æöâÖ6öÆ÷W"7V&W2Ö’†fR÷&F–æ'’6öÆ–B4B6†F–æs²F†—2—2ÆöF–ærö–ç7V7F–öà¦f—‡GW&RÂæ÷B6Æ–ÒöbæòÖ6öÆ÷W"ÖÖ%"÷"F—7Æ6VÖVçB&VæFW&–ær7W÷'Bà¤7GVÂf–ÆRF—7F6†W"Óæf—BÓæÖævW"FG2ÆÃs²6†V6¶VB6×ÆRÖF6†W2vVæW&F÷"à¤W†—7F–æs3öæRÖ7V&Rf—‡GW&R&VÖ–ç2&W&öGV6–&ÆS²Fòæ÷B÷fW'w&—FR—B6–ÆVçFÇ’à £ƒRfö7W6VB52ód”Âó6¶—Â–æ6ÇVF–æsBæWr&Vw&W76–öç2Â7GVÂ–×÷'FVCræ@§v÷&·76Rõd”UröæF—fRôtÄ"÷&VÆV6R&÷FV7F–öââ&Wf–WvVB&WfW'6RÖÆöFW"–ç33"æ@¦6æöæ–6Â&V6÷fW'’6†–ã²÷F†W"'VçF–ÖR¥2VF—G2&R–ç2öæÇ’âgVÆÂÆö6ÂæöFS#Bã#"ã£3SR52ód”Âó6¶—ó6æ6VÂƒrãg2’âæò'VçF–ÖR÷FW7BVF—G2gFW"gVÆÂ×7V—FR7F'BâV&Æ–6F–öâ&ööbföÆÆ÷w3²æF—fRã3"66WFæ6R—2æ÷B–æfW'&VBà¤–âÖFW7BÆ—7BW‡Æ–6—FÇ’F—7F–æwV—6†W26WfVâô$¤T5E2g&öÒ6WfVâÔ2à¤DUd”4S3"f—'7B÷Våd”Ur&Vf÷&R–×÷'C¢ÆÃ"Æöö·2–æ6ÇVF–ær6f—G’õ6–Æ†÷VWGFS°¥7GVF–òÓå6öÆ–BÓå7GVF–òæB6Æ÷6R÷&V÷Vââ–×÷'BæWr6×ÆS¢6WfVâæÖVB7V&W3°§6VÆV7B7V&RÄö&¦V7B&F–ÅUbÓåUbVF—F÷"Óä–ÖvRFò6VR—G2ôäRÖÄ&6µFó4Bô6Æ÷6RÀ§&V6†V6µd”Urâ÷&&—BõVæFõ&VFòæB66WFVC3G&ç6f÷&Ò6×ÆR6æ—G’à¤æW‡BôäÅ’FWf–6R&W—"fVVF&6³²FVfW"æWræF—fRÖFW&–Â÷W&f÷&Öæ6RfVGW&W2à ¢22ã3"f—‡GW&Rf—6–&–Æ—G’æB7&÷72ÔæöFR4’6÷'&V7F–öâ(	B3ö7Fö&W"##` ¤f–æÂFVÖò6†V6²f÷VæBf÷W"6VçG&Â6ÖÆÂ7V&W26÷VÆB6—B–ç6–FRF†R7F'GW6—¦S¦7V&RgFW"÷&–v–æÃ"×Væ—B–×÷'Bf—GF–ærâ–æ7&V6RF†RGvò×&÷r76–æs²7GVÂf–ÆP¦–×÷'BFW7Bæ÷r&WV—&W2WfW'’–×÷'FVB7V&RFòÆ–R6ÆV"öb7F'GW7V&R–â¢à¤æòÆ–6F–öâ–×÷'Böf—B÷6÷W&6R×÷6—F–öâöÆ–7’6†ævVBâ6WfVâÖö&¦V7B6×ÆR7F—0£“ÃSƒ†'—FW2æB¶VW2÷&–v–æÂÖ'—FW2âæWr6×ÆRÆ6VÖVçB—2'Böbã3"&WFW7Bà ¤†÷7FVCCCc3c#3“Bf–ÆVBâÆörFööÂ&WVFVFÇ’6Æ÷6VBG&ç7÷'Bâ&W&öGV6VBÆö6ÆÇ§v—F‚W†7B4’æöFS#"ã#2ãC£3S552ó$d”Ã²&÷F‚f–ÇW&W2vW&Rg&W6†Ç’6ö×&W76VBäp¦'—FR6ö×&—6öç2v–ç7B6†V6¶VBÖ–âFVÖòf–ÆW2âæöFS#"æC#B6ö×&W76–öå7G&VÐ§&öGV6RF–ffW&VçBfÆ–B¦Æ–"'—FW2âæWrFW7B†VÇW"–æFWVæFVçFÇ’'6W2&÷F‚äô×2À¦6†V6·2W†7BæÖW2övVöÖWG'’õUböÖFW&–Â&–æF–æw2Âär5$2öF–ÖVç6–öç2÷G—Rö6‡Væ·2ð¦f–ÇFW'2æBFV6öFVB$t$²Æ—FW&ÃbÖ&—BF—7Æ6VÖVçB&VÖ–ç2'—FRÖW†7BâW†—7F–æp§ööÆVBö–æÆ–æR6fT÷VâôäôÒ4õU$4RÔ%•DR&÷VæB×G&—76W'F–öç2&RVæ6†ævVBâ7GVÀ¦6†V6¶VBÖ–â6WfVâÖö&¦V7Bf–ÆRæ÷rvöW2F‡&÷Vv‚&VÂf–ÆRF—7F6†W"–âF†RFW7Bà¤&÷F‚ffV7FVBf—‡GW&W3£e52ód”ÂöâæöFS#"äBæöFS#BgFW"6÷'&V7F–öââgVÆÂf–æÀ¤æöFS#"æB†÷7FVB&W'VâVæF–ærâÆ–6F–öâ¥2&VÖ–ç2'—FRÖ–FVçF–6ÂFócsCƒ#†CRà ¢22ã3"V&Æ–6F–öâæBf–æÂ&WFW7B&ööb(	B3ö7Fö&W"##` ¤Æ–6F–öâ'VçF–ÖScsCƒ#†CSVSVF#6Cfƒvf6cFcFffc“FFSCs“–÷G&VSC“v#&BÖF6†V@§fÆ–FFVBÆö6ÃFCcƒc62G&VS³#’WÆöFVB&Æö'2fW&–f–VBâf–æÂ6×ÆR÷FW7B6÷'&V7F–öà¦#s3ƒ†VC6FVVV3#ƒƒ3†Sf33–36#6FS†V#÷G&VV#ccvcsCÖF6†VBfÆ–FFVBÆö6Ãƒfcf&SRà¤Æ–6F–öâ¥2&VÖ–ç2'—FRÖ–FVçF–6ÂFócsCƒ#†CRâf–æÂ6×ÆR&Æö# £F–fCC–cCcƒCƒv&C“6“ƒScƒ3†&3fV6&Bƒ“ÃSƒ†'—FW2’â76VB&÷w2¶VWWfW'’7V&P¦6ÆV"öb6—¦S7F'GW7V&ReDU"÷&–v–æÃ"×Væ—B–×÷'Bf—C²7GVÂf–ÆRFW7B76W'G0§F†B6W&F–öâf÷"ÆÃrâ–×÷'BDE26WfVâæÖVB7V&W3²âW†—7F–ær7V&RÖ’&VÖ–âà ¥vW3CCscƒƒ“"5T44U52âÆÃ‚6†V6¶VBV&Æ–2F‡2ÖF6‚f–æÂ÷6×ÆR6öçFVçC §6†VÆÂöÖæ–fW7BÇ&VæFW"÷væW"Ç6†&VB–ÖvR&W6öÇfW"ÅUbv÷&·76RÆæF—fRFFW"ÇFW7@¦Æ—7BæBf–æÂ76VB6×ÆR‡6×ÆR&V6†V6¶VBgFW"f–æÂFWÆ÷–ÖVçB’âÆ—fR6Æ÷V@¤DôÓ¢F—FÆS3"ÆÆÃ"Æöö·2–æ6ÇVF–ær6f—G’õ6–Æ†÷VWGFRÅ7GVF–òÓå6öÆ–BÓå7GVF–ò7FGW2À¦6Æ÷6R÷&V÷Vâ&WF–ç2Æ—7Bâ6Æ÷VBvV$tÂ&VÖ–ç2F—6&ÆVC²67&VVç6†÷B’F–ÖVB÷WBà¥F†—2—2T’ôDôÒ7F—fF–öâWf–FVæ6RÂæ÷BuRö•B—†VÂ÷"ÖFW&–Â66WFæ6Rà ¤gVÆÂæöFS#Bã#"ã£3SU52ód”Âó6¶—ó6æ6VÂƒrãCG2’Âf–æÂf—‡GW&RÖöæÇ“e52à¤gVÆÂf–æÂ4’ÖÖF6†–æræöFS#"ã#2ãC£3SU52ód”Âó6¶—ó6æ6VÂƒã‡2’à¤öÆB†÷7FVCCCc3c#3“Bf–ÆVBöâF†RGvò7&÷72ÔæöFR6ö×&W76VBÖFVÖòÖ'—FR6ö×&—6öç3°§&W&öGV6VC3S552ó$d”ÂöâæöFS#"â&WÆ6VBôäÅ’FVÖòÖWV—fÆVæ6R76W'F–öç2v—F€¦–æFWVæFVçBW†7BvVöÖWG'’õUböÖFW&–Â&–æF–æw2Ä5$2õär—†VÇ2æBÆ—FW&ÃbÖ&—@¦'—FW2â&öGV7F–öâ6÷W&6RÖ'—FR&÷VæB×G&—76W'F–öç27F’Væ6†ævVBâ6÷'&V7FVB†÷7FV@§&W'VãCCscƒ“sRv2–å÷&öw&W72BF†—2&ööc²—G2f–æÂ&W7VÇB—2&V6÷&FVB–à¦Fö72÷V&Æ–6F–öâÓ3"Ö6’æÖFâFòæ÷B6—FRF†R7WW'6VFVBf–ÆVB'Vâ27W'&VçB4’à ¤v—D‡V"WÆöB÷&VbW'&÷'2vW&RG&ç6–VçC¢&WWÆöFVBGvò÷'†â&Æö'2ÇfW&–f–VBW†7@§G&VS²$U5BÖ7&VFVB6÷'&V7F–öâ6öÖÖ—Bv2–æ—F–ÆÇ’Væf–Æ&ÆRFòw&…Â&VbWFFRà¤æ6†÷&VB—Bf–&W—"ó3"Öf—‡GW&R×fÆ–FF–öâÇF†VâW‡V7FVBÖÖ–âæöâÖf÷&6VBWFFP§7V66VVFVBâ¶VWF†—2&V6÷fW'’&VfW&Væ6S²æòf÷&6RW6‚÷"W&Ö—76–öâ'—72W6VBà ¤'V–ÆBã3"Ä•dRò$TE’dõ"äD•dR$UDU5Böæ6Rf–æÂ†÷7FVB&W7VÇB&VÆ÷r—26†V6¶VBà¢ã3W6W"d”Â&VÖ–ç2&V6÷&FVC²ã3—2Æ7BW6W"Ö66WFVB'V–ÆBâæòã3"50¦–æfW'&VBâDUd”4S¢d”UrÆÃ"&Vf÷&R–×÷'BÅ7GVF–òõ6öÆ–B÷&V÷Vã²–×÷'Bd”äÂ6×ÆP£6öÆ÷W"F‡&÷VvƒtF—7Æ6VÖVçC²6VÆV7B7V&RÇ&F–ÅUbÓåUbVF—F÷"Óä–ÖvR6†÷w2—G0¤ôäR&rÖ´&6µFó4Bô6Æ÷6RæB&V6†V6µd”UrâW†7B÷&–v–æÂ•Bv†öÆRÖÖVçRf–ÇW&P¦6W6R&VÖ–ç2Vç&÷fVã²&W—&VBFWFW&Ö–æ—7F–2÷fW'w&—FR÷&VG’Ö†÷7BFVfV7G26÷fW&VBà¤æòæWrfVGW&Rv÷&²VçF–Â&W—"fVVF&6²à ¢22ã3"W6W"52(	BÆöF–ærõd”Ur66WFVC²ÖFW&–Âv2ö'6W'fVB(	B3ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ“¢(	Ã3"52âÆÂr7V&W2f—6–&ÆRÂæò&ö&ÆV×2v—F‚f–WrÖöFP¦F—6V&–ærî(	Ò&÷FV7B6WfVâÖö&¦V7Bf—6–&–Æ—G’÷76–ærÂd”Ur7F'GW&W6W'fF–öâÀ¦ÆÂ÷&–v–æÂÖöFR7F–öç2÷&V÷VâæBã366WFVB&V†f–÷W"âF†—2—2äõBæF—fP§7FæFÆöæRÕ%"öF—7Æ6VÖVçBö÷VRÖ6öÆ÷W"ÖÇ†66WFæ6RâæòæWr'V–ÆBF†—2WFFRà ¥W6W"67&VVç6†÷G3¢&÷„Æ"6†÷w2öæÇ’6öÆ÷W"7V&RFW‡GW&VBÂ÷F†W"6—‚Æ–ââæöÖ@§6†÷w2æ÷&ÖÂôVÖ—76—fR÷66Æ"ô÷6—G’ôF—7Æ6VÖVçBVffV7G3²6öÆ÷W"7V&R6öÆ–B7–âà¥6÷W&6RVF—B6öæf—&×2æF—fRæöÖD6öÆ÷W%7W&f6U6÷W&6R&WGW&ç2çVÆÂv—F†÷WB6öÆ÷#°¦æöÖE%%7W&f6U6÷W&6W2æB÷&–v–æÂUb÷fW&Æ’6öç6WVVçFÇ’6ææ÷B7F—fFR÷F†W ¦Ö2'’F†V×6VÇfW2â6WfVâÖö&¦V7Bf—‡GW&R–çFVçF–öæÆÇ’76–vç2W†7FÇ’öæR6Æ÷@§W"7V&RâF†W&Vf÷&RF†—2W‡÷6W2F†R&VÖ–æ–æræòÖ6öÆ÷W"ÖÖf–Ww÷'BFWVæFVæ7“°§&WF–æVBÖ2vW&Ræ÷BÆ÷7BâW‡FVæBF†R4ÔR&W6÷W&6RöÖFW&–Â÷fW&Æ’÷væW'2f÷ §7W÷'FVBæ÷&ÖÂöVÖ—76—fR÷&÷Vv†æW72öÖWFÆæW72ö÷6—G’v—F†÷WB&WV—&–ær6öÆ÷"Öà¤F—7Æ6VÖVçB&VÖ–ç26W&FVÇ’FVfW'&VB&V†–æB7V&F—f—6–öâ÷W&f÷&Öæ6RvFW2à ¤–×÷'FçBf—‡GW&Rf–æF–æs¢6öÆ÷W"är—3#‡ƒ#‚v—F‚U„5DÅ’ôäR$t"fÇVP¥³SRÃsRÃ##ÒÂæBÇ†ó#SR6†V6¶W"âWfW'’f—‡GW&RÖFW&–Â†2W6Uö6öÆ÷%ö÷6—G“Óà¤æöÖBw2Væ–f÷&Ò7–â—2W‡V7FVC¢F†R6†V6¶W"—2Å„Âæ÷B6öÆ÷W"GFW&ââFð¦æ÷B6ÆÂF†—2Ö—76–ær6öÆ÷W"FW‡GW&R÷"6†ævRæöÖB&–æF–æw2&6VBöâV&æ6Rà¤&÷„Æ"w26†V6¶W"ö&Æ6²7V&W2FW7—FRÇ†ôdb—26W&FRF—67&Wæ7’âæF—fP§Æâ&WVW7G2Vç&V×VÇF—Æ–VB&—FÖ'WB'&÷w6W"FV6öFR÷&W6×Æ–ærÖ’Æ÷6R$t §VæFW"Ç†²W†7B6W6Ræ÷BfW&–f–VBöâ•BâFòæ÷B6Æ–Ò—Bf—†VBg&öÒÖö6¶V@¦&—FÖFW7Bâ–çfW7F–vFR÷&–v–æÂFV6öFW"Â¶VW6÷W&6R'—FW2Væ6†ævVBÂæBW6R§&VÂ÷VR$t"6öÆ÷W"Ö6†V6¶W"–âF†RæW‡B6ö×&—6öâf—‡GW&RFòfö–BÖ&–wV—G’à ¥7FGW3¢7W'&VçBÄ•dS3#²W‡Æ–6—BÆöF–ærõd”Ur52&÷FV7FVBâÖFW&–Âf–Ww÷'@¦væBÇ†ôdb6öÆ÷W"F—67&Wæ7’õTââæò'VçF–ÖRö6öFRöæWr'V–ÆBF†—2WFFRà¤æW‡B66÷VB'V–ÆC¢VF—BæòÖ6öÆ÷W"æF—fR&6RÖFW&–ÂF‚Â&W6W'fR66WFV@£3"T’ÂFBÖVæ–ævgVÂW"Ö6†ææVÂ6×ÆRæB7GVÂ÷væW"6÷fW&vS²–çfW7F–vFP¦Ç†ôdb6öÆ÷W"6W&FVÇ’Â&WF–æ–ærF—7Æ6VÖVçB2–ç7V7F–öâöW‡÷'BÖöæÇ’à¥÷76–&ÆR6†V6·2æ÷s¢UbVF—F÷"–ÖvRöâæ÷&ÖÂô÷6—G’ôF—7Æ6VÖVçB7V&W26öæf—&×0§&WF–æVB&VfW&Væ6W3²æò&WVFVBÆöF–ærõd”Ur&Vw&W76–öâFW7B÷"&V–ç7FÆÂæVVFVBà ¢22ã32(	B7FæFÆöæRæF—fRÖFW&–ÂÖ2(	B3ö7Fö&W"##` ¤7W'&VçB'V–ÆC¢ã3bã‚ã32â&VçBÖ–ã¢6CsCF#c6fc3V6fVvSf#36f&Cƒ#S3cCVbà¥&WW6W2æöÖBÖÖFW&–Â×&W6÷W&6RæBWbÖ–ÖvR×7W&f6R×&Wf–Ws¢7GVF–òõ6öÆ–Bæ÷p¦66WBæ÷&ÖÂÂVÖ—76—fRÂ&÷Vv†æW72ÂÖWFÆæW72æB÷6—G’Ö2v—F†÷WB6öÆ÷W ¦–ÖvRÂW6–æræF—fR6öç7FçB6öÆ÷"‡v†—FRFVfVÇB’Â&÷Vv†æW72ã#RÂÖWFÆæW72à¤æòvVæW&FVB6öÆ÷W"FW‡GW&R÷"&ÆÆVÂ&VæFW&W"â–çfÆ–BW†—7F–ær6öÆ÷W"&–æF–æw2À§VæÆ—BÂVç7W÷'FVB&ö¦V7F–öç2öÖFW&–Ç2æBF—7Æ6VÖVçBÖöæÇ’¶VW&–÷"fÆÆ&6²à¤ÖÖöæÇ’÷fW&Æ’&WÆ6W2&öG’öæÇ’gFW"7V66W76gVÂFV6öFS²f–ÆVBöÆFRv÷&°§&VÆV6W2F†R÷&–v–æÂ÷væW"æB&W6W'fF–öââ6÷W&6R–ÖvW2õUg2öÖFW&–Ç2&VÖ–âW†7Bà ¥&÷FV7BW‡Æ–6—Bã3"W6W"53¢6WfVâÖ7V&Rf—6–&–Æ—G’÷76–æræBd”Ur7F&–Æ—G’à¤f÷W"6öÆ÷W"7W&f6W2&VÖ–â&÷FV7FVC²WFòV–v‡BÖÖöæÇ’7W&f6W26†&R÷&–v–æÀ¦vw&VvFR6V–Æ–æw3¢TÒFV6öFVB—†VÇ2Âƒ²Ub6÷&æW'2Â3$Ö”"Væ6öFVB6÷W&6W2à¥W"ÖÖÆ–Ö—G2Væ6†ævVBâ&VçBÆöFW"6†ævW2&R66†R×–âÖöæÇ’âÖ–âæ§2æ@¦×VÇF’Öö&¦V7B×G&ç6f÷&Ò&VÖ–âVçF÷V6†VC²æò'&öBT’6†ævW2à ¤g&W6‚6ö×&—6öã¢Fö72÷6×ÆW2ôäôÕõ5DäDÄôäUôÔ5ó32ææöÒâ6WfVâ–æFWVæFVç@¦æÖVB7V&W2Â6ÖR66WFVB76–æs²E%TR÷VR$t"6†V6¶W"f÷"6öÆ÷W"æ@¤VÖ—76—fRâã3"f—‡GW&R&VÖ–ç2–Ö×WF&ÆRâF—7Æ6VÖVçB7F—2&WFVçF–öâö–ç7V7F–öà¦öæÇ’ÂVæF–ær7V&F—f—6–öâ÷W&f÷&Öæ6Rv÷&²â÷&–v–æÂã3"Ç†Ôôdb7–âö&Æ6°¦&—FÖF—67&Wæ7’&VÖ–ç2õTâæB—2æ÷Bf—†VB'’F†RæWr6×ÆRà ¤†æG2ÖöâVæF–æs¢–×÷'BæWr6×ÆRÂfW&–g’ÆÂ6WfVâ7V&W2æB6—‚7W÷'FV@¦ÖFW&–Â6†ææVÇ2–â7GVF–òõ6öÆ–C²–ç7V7BvÆ÷72÷&VfÆV7F–öç2v†–ÆR÷&&—F–ærà¤6†V6²÷6—G’†öÆW2æB6†F÷w2Â7v—F6‚÷&V÷VâÆÂd”UrÖöFW2ÂÖ÷fRõVæFòõ&VFòÀ¥6fRô÷VâæBW‡÷'BäôÒâW6W"52&WV—&VBf÷"7GVÂ•BôuRV&æ6Rà¤æW‡C¢FG&W72Ç†Ôôdb&—FÖFV6öF–ær6W&FVÇ’gFW"F†—2ÖFW&–ÂfÆ–FF–öâà¥fÆ–FF–öã¢æöFS#"gVÆÂ7V—FR3S‚52Âd”Âƒ"ã#—2“²f–æÂFF—F–öæÂ'VFvWB6†V6²æBÆÂf÷W"ã32fö7W6VBFW7G252öâæöFS#"âW†—7F–ær3æF—fRÖFW&–ÂFW7G252âv—BF–fbÒÖ6†V6²6ÆVââ†÷7FVB4“CS“cƒS3‚æBvW3CS“csƒ35T44U53²Æ—fR'—FW2fW&–f–VBà ¥V&Æ–6F–öã¢Æ–6F–öâ6öÖÖ—B&&Sƒ“cSƒsf&Ff##“sCCcCS#6#6C–#fÀ§&Wf–WvVBG&VRƒSSFC#Sc†cfc3†#fV#Cƒ#V&6C3C3cC6#ÂfWF6†VBÖ–âfW&–f–VBà¥vW3CS“csƒ35T44U53²Æ—fRfW'6–öâ÷6†VÆÂöÖFW&–Âö÷fW&Æ’÷&VæFW"÷FW7BÖÆ—7Bæ@£“ÃS#‚Ö'—FR6×ÆRÆÂ'—FRÖ–FVçF–6Ââ6VRFö72÷V&Æ–6F–öâÓ32æÖBâ†÷7FV@¥F÷öÆöw’&Vw&W76–öãCS“cƒS3‚6ö×ÆWFVB5T44U52âã32Ä•dRæB$TE’dõ"DU5D”ärà¤ÖçVÂ•BV&æ6R66WFæ6R&VÖ–ç2VæF–æs²ã3"ÆöF–ærõd”Ur52&÷FV7FVBà ¢22ã32W6W"52&÷FV7FVB(	B3ö7Fö&W"##` ¥W6W"&WÆ–VB52gFW"ã327FæFÆöæRÖÖFW&–ÂFW7B'V–ÆBâ&÷FV7B66WFV@§7FæFÆöæRæ÷&ÖÂöVÖ—76—fR÷&÷Vv†æW72öÖWFÆæW72ö÷6—G’&Wf–WrF‡&÷Vv‚W†—7F–æp¦÷væW'2Â6—‚7W÷'FVBÖVB7V&W2Â6WfVâÖö&¦V7BÆöF–ærÂd”Ur7F&–Æ—G’æ@§&Wf–÷W266WFVB&V†f–÷W"âæòæWrÆ–6F–öâ'V–ÆB–âF†—2WFFRà¥F†—252FöW2æ÷B6Æ÷6RF†R6W&FVÇ’FVfW'&VBF—7Æ6VÖVçB&Wf–Wr÷"F†P¦÷&–v–æÂã3"Ç†Ôôdb6öÆ÷W"F—67&Wæ7’†æWrã326×ÆRW6W2÷VR$t"’à¤æW‡Bæ'&÷r'V–ÆC¢&W—"÷&–v–æÂÇ†Ôôdb6öÆ÷W"&—FÖFV6öFR÷&W6×Æ–ærÀ§&W6W'f–ær$t"&VæVF‚G&ç7&VçB—†VÇ2v—F†÷WB6†æv–ær&WF–æVB6÷W&6R'—FW2à¥F†VâVF—BF—7Æ6VÖVçB&Wf–Wr7V&F—f—6–öâ÷W&f÷&Öæ6RvFW2&Vf÷&R–×ÆVÖVçFF–öâà¤7W'&VçB7FGW3¢ã32Ä•dRÂW6W"53²v—F–æræW‡BöæW‡F'V–ÆBf÷"'VçF–ÖRv÷&²à¤÷F–öæÂ&Vw&W76–öã¢÷&–v–æÂã3"6öÆ÷W"7V&R6†÷VÆBWfVçGVÆÇ’&R6öÆ–B7–à§v—F‚6öÆ÷W"÷6—G’ôdc²Væ&Æ–ær÷6—G’6†÷VÆB&WfVÂ—G2Ç†6†V6¶W"à  ¢22ã3B(	BæF—fR6öÆ÷W"Ç†ôdb6†FW"6÷'&V7F–öâ(	B3ö7Fö&W"##` ¤7W'&VçB'VçF–ÖRF&vWC¢ã3bã‚ã3Bâ&VçBã32W6W"52—2&÷FV7FVBÀ¦–æ6ÇVF–ær7FæFÆöæR%"Ö2Â6WfVâÖö&¦V7B–×÷'BæBd”Ur7F&–Æ—G’à ¤VF—Bf÷VæBF†R&V6—6RÇ†ÔôdbFVfV7B–âF†RW†—7F–æræF—fRUb7W&f6R÷væW# §F†R$t"ÖöæÇ’Ö6†FW"†öö²v2–ç7FÆÆVBöæÇ’v†Vâ÷6—G”ÖöFR‚’&ââæF—fP¦6öÆ÷W"FW‡GW&Rv—F‚W6Uö6öÆ÷%ö÷6—G“ÖfÇ6RæBæò6W&FR÷6—G’ÖF†W&Vf÷&P¦fVÆÂF‡&÷Vv‚FòF‡&VRw2FVfVÇBF–fgW6T6öÆ÷"£Ò6×ÆVDF–fgW6T6öÆ÷"Â×VÇF—Ç––æp§F†R6öç7FçB7–â$t"'’F†R–ÖvRw26†V6¶W"Ç†æB&öGV6–ær&Æ6²7V&W2à¥F†R÷&–v–æÂ÷væW"æ÷r–ç7FÆÇ2F†R$t"ÖöæÇ’6†FW"†öö²f÷"WfW'’7W÷'FVBÆ—@¦æF—fR6öÆ÷W"7W&f6Rv—F‚6öÆ÷W"Ç†ôdbâ÷6—G”ÖöFR&WW6W2F†R6ÖR†öö²v†Và¦6W&FR÷6—G’Ööf7F÷"Ç6ò6öçG&öÇ2G&ç7&Væ7’âW‡Æ–6—B6öÆ÷W"Ç†ôà¦¶VW2F‡&VRw2÷&–v–æÂ$t$6×Æ–ærFƒ²÷6—G’ÂFWF‚×w&—FRÂ6†F÷ræB6÷W&6P¦'—FR&V†f–÷W"&R÷F†W'v—6RVæ6†ævVBâæòFV6öFW"&Ww&—FR÷"–ÖvR&RÖVæ6öF–ærà ¤æWr7GVÂÖ÷væW"FW7G26÷fW"Ç†ôdbv—F†÷WB6W&FR÷6—G’ÖæBW‡Æ–6—@¦Ç†ôâ&WF–æ–ær$t$â–âÖDU5BÄ•5BFG2F†R÷&–v–æÂ6ö×&—6öâf–ÆS ¦Fö72÷6×ÆW2ôäôÕô4ôÄõU%ôÅ„ó#’ææöÒ†ÆVgBÇ†ôâÂÖ–FFÆR6öÖ&–æVB÷6—G’À§&–v‡BÇ†ôdb’âW†—7F–ær6WfVâÖö&¦V7BæB7FæFÆöæRÖÖ6×ÆW2&VÖ–âVæ6†ævVBà¤F—7Æ6VÖVçB&VÖ–ç2–ç7V7F–öâ÷&WFVçF–öâöæÇ’à ¥fÆ–FF–öâ÷V&Æ–6F–öâ7FGW3¢6÷W&6R÷FW7B6†ævW26öÖÖ—GFVBFòÖ–ã²Æö6Â7V—FP¦æ÷Bf–Æ&ÆR–âF†—26öææV7FVB6W76–öââ†÷7FVB4’æBvW2öÆ—fR'—FRfW&–f–6F–öà¦&RVæF–æræB×W7B&R6†V6¶VB&Vf÷&R6ÆÆ–ærF†—2'V–ÆBgVÆÇ’&VÆV6VBà¤æF—fR•BôuRV&æ6R66WFæ6R—2VæF–ærà ¤DUd”4S3C¢–×÷'BäôÕô4ôÄõU%ôÅ„ó#’ææöÒ–â7GVF–òæB6öÆ–Bâ&–v‡B7V&R×W7B&P§6öÆ–B7–âv—F‚æò6†V6¶W"ö&Æ6²7V&W3²ÆVgB7V&R&WF–ç26†V6¶W"G&ç7&Væ7“°¦Ö–FFÆR&WF–ç26öÖ&–æVB6öÆ÷W"ÖÇ†ÇW26W&FR÷6—G’â7v—F6‚d”UrÖöFW2À¦÷&&—BÂ6VÆV7BôÖ÷fRõVæFõ&VFòÂæBfW&–g’&–÷"ã327FæFÆöæRÖÖ6×ÆR7F–ÆÂv÷&·2à¤æW‡C¢6öæf—&Òã3BÇ†&V†f–÷W"ÂF†Vâ6W&FVÇ’&Væ6†Ö&²F—7Æ6VÖVçB÷7V&F—f—6–öà¦&Vf÷&R–×ÆVÖVçFF–öââFòæ÷BföÆBF—7Æ6VÖVçB–çFòF†—26†FW"6÷'&V7F–öâà ¢22ã3R(	B&RÖFV6öFRæF—fR6öÆ÷W"Ç†ôdb&W—"(	B3ö7Fö&W"##` ¥U4U"ã3Bd”Ã¢67&VVç6†÷B6†÷w2&–v‡B7V&R7–âö&Æ6²6†V6¶W"öâf—6–&ÆRã3Bà¢ã327FæFÆöæRÖFW&–Â52&VÖ–ç2&÷FV7FVC²ã3B6†FW"ÖöæÇ’6Æ–Òv0¦–ç7Vff–6–VçBâF‡&VRÖög&vÖVçB×VÇF—Æ–W2$t"'’6×ÆVB$t"ÂæBÇ†'§6×ÆVBÇ†6ö×öæVçGv—6S²—BFöW2äõB—G6VÆb×VÇF—Ç’$t"'’6×ÆVBÇ†à¥6†FW"7G&–ærFW7G26ææ÷B&÷fR$t"7W'f—fVB'&÷w6W"ärFV6öFR÷&W6—¦Rà ¤W†—7F–ær7W&f6R÷væW"æ÷r76W2âW‡Æ–6—BÇ†ÔôdbfÆrFò—G2FVfVÇ@§7W&f6RFV6öFW"âW†—7F–æræöÖB×66Æ"×ær÷væW"Ö¶W2G&ç6–VçB÷VRäp¤$Tdõ$R7&VFT–ÖvT&—FÖ¢Væf–ÇFW'2÷&–v–æÂ—†VÇ2Â¶VW2÷&–v–æÂ$t"–æ6ÇVF–æp¦Ç†×¦W&ò—†VÇ2Â6WG2&Wf–WrÇ†#SRÂæB&V6ö×&W76W2â6†&VBtÄ"õUbFV6öFW ¦†2æòæF—fRFWVæFVæ7’âW‡Æ–6—BÇ†ôâæBW†–Æ–'’6†ææVÇ2¶VW÷&–v–æÀ¦FV6öF–æs²6÷W&6R'—FW2ÂÖFW&–ÂÖWFFFÂUg2Â6fRô÷VâôäôÒ&VÖ–âVæ6†ævVBà¤æò6÷W&6RFW‡GW&R&Ww&—FRÂ6çf2$t"&V6÷fW'’ÂæWr&VæFW&W"÷"ÖöFVÆÆ–ær¶W&æVÂà ¥7W÷'FVB&RÖFV6öFRFƒ¢æöæ–çFW&Æ6VB‚Ö&—B$t$öw&—66ÆRÖÇ†äs²E$å0§G&ç7&Væ7’7G&—VBf÷"÷F†W"æF—fRärG—W2â&öf–ÆW2ö6öÆ÷W"6‡Væ·2&WF–æVBà¤&÷VæG3¢Væ6öFVB6÷W&6Rö÷WGWC„Ö”"ÂF–ÖVç6–öç3#C‚æCDÒ6÷W&6R—†VÇ2Â–æfÆFR÷WGW@¦W†7BW‡V7FVB66æÆ–æRÆVæwFƒ²5$2÷G'Væ6F–öâöf–ÇFW"öæ–ÖF–öâóf&—BÖÇ†&VgW6Ç2à¥Vç7W÷'FVBÇ†Ôôdb6öçfW'6–öâ¶VW2÷&–v–æÂ&öG’fÆÆ&6²Âæò&Æ6²ÖÖwVW72à¤W†—7F–æruR&Wf–WrÆ–Ö—G2öÆ–fWF–ÖW2æBã327FæFÆöæR&W6W'fF–öâ&VÖ–â–çF7Bà ¥&Vw&W76–öâ6†V6·2–ç7V7B7GVÂ'&÷w6W"Ö–çWBärg&öÒ÷&–v–æÂã#’f—‡GW&S ¦ÆÂÇ†ÔôdbFW†VÇ2W†7FÇ’³SRÃsRÃ##Ã#SUÓ²Ç†ôâ7F–ÆÂ³SRÃsRÃ##Ãó#SUÒà¤ÆÂf—fRärf–ÇFW'2FW7FVBv—F‚f&–VB†–FFVâ$t"ÂE$å2æBw&—66ÆRÖÇ†À¦ÖÆf÷&ÖVBö÷fW'6—¦VBö–æfÆFR÷fW&fÆ÷r&VgW6VBâ7GVÂ7W&f6RFVfVÇBFV6öFW"æ@§6÷W&6RÖW†7BäôÒ&÷VæGG&—6÷fW&VBâ6÷'&V7FVBã3BÇ†ÔôâFW7C¢FVfVÇBF‡&VP¦öä&Vf÷&T6ö×–ÆR—2æòÖ÷²F‡&VRW‡æG2Öög&vÖVçBgFW"F†B†öö²âã3B4£CS#ƒcƒƒcbd”ÄTC²&W—"7WW'6VFW2—BöæÇ’gFW"76–ærfÆ–FF–öâ÷V&Æ–6F–öâà¥&W7F÷&RDUeô„•5Dõ%’6öçFVçBg&öÓ33“vC#ƒrÂv†–6‚ã3BFö7VÖVçFF–öâ66–FVçFÆÇ§&WÆ6VBÂF†Vâ&WF–âã3BVçG'’æBVæBF†—2&W—"â÷F†W"öÆBFö72¶WB–çF7Bà¥&Wf–WvVB66†R6Æ÷7W&R&W–ææVC²7FÆRã3B–æFW‚ÖöæÇ’¶W—2&V6öæ6–ÆVBv—F‚÷væW'2à¥&W7F÷&R÷&–v–æÂf—fR×7FW7G'V7GW&Âô"6†V6¶Æ—7Bƒ3BW‡G&ÖFW&–Â7FW'&ö¶P¦6ö×ÆWF–öâ“²ÖFW&–Â6†V6²7F—2–â'V–ÆB–ç7G'V7F–öç2â6÷'&V7B7FÆS32F—FÆW0¦æB&W6W'fS32ó3B&W7VÇBÆöw2â÷&–v–æÃ26†V6¶Æ—7B&Vw&W76–öâFW7G252à ¤DUd”4S3S¢W6R÷&–v–æÂFö72÷6×ÆW2ôäôÕô4ôÄõU%ôÅ„ó#’ææöÒÂ7GVF–òæB6öÆ–Bà¥$”t…B6öÆ–B7–âÂæò&Æ6²7V&W3²ÄTeB6†V6¶W"G&ç7&Væ7“²Ô”DDÄR6öÖ&–æV@¦Ç†ÇW2÷6—G’â7v—F6‚÷&V÷Vâd”Us²÷&–v–æÂã3"6WfVâÖ7V&R6öÆ÷W"7–ã°¢ã327FæFÆöæR6×ÆRVæ6†ævVBâÖ÷fRõVæFõ&VFòæB6fRô÷VâôäôÒ&WFVçF–öâà¤æF—fR•BôuRV&æ6R66WFæ6R7F–ÆÂVæF–æs²Fòæ÷B6Æ–ÒFWf–6R7V66W72à¤F—7Æ6VÖVçB&VÖ–ç2FVfW'&VC²æW‡B7FW—27GVÂFWf–6RfÆ–FF–öâ&Vf÷&RÖ÷&Rv÷&²à¥fÆ–FF–öã¢æöFS#"gVÆÂ7V—FS3cB52ód”Âƒ#bãcW2“²fö7W6VC2ÖFW&–ÂFW7G0¦æBf–æÃ26†V6¶Æ—7BFW7G252âv—BF–fbÒÖ6†V6²6ÆVââ4“CSCs#cƒ#’æBvW3CSCs#c#5T44U53²Æ—fR'—FW2fW&–f–VBâã3B•Bd”Â&VÖ–ç2&V6÷&FVC²ã3RuRöFWf–6R66WFæ6RVæF–ærà ¥V&Æ–6F–öâfW&–f–VC¢Æ–6F–öã636VcC3F#††3vCC3SsF3CVCScS†fS#ƒ3BÀ§&Wf–WvVBG&VSFVFsFF#†#&V&CCcFcc†#“SSC&FfCBâ†÷7FVB4“CSCs#cƒ#¥5T44U53²vW3CSCs#c#5T44U52âÆ—fRfW'6–öâ÷6†VÆÂõärö÷fW&Æ’÷&VæFW"ö6†V6¶Æ—7@¦æB÷&–v–æÃƒÃcBÖ'—FS#’6×ÆRÖF6‚6÷W&6R'—FW2â6VRFö72÷V&Æ–6F–öâÓ3RæÖBà¥7FGW3¢ã3RÄ•dRæB$TE’dõ"$UDU5C²ã3BW6W"d”Â&W6W'fVBÂã3250§&÷FV7FVC²7GVÂ•BôuR6öÆ÷W"66WFæ6RVæF–ærâæòF—7Æ6VÖVçBv÷&²–æ6ÇVFVBà ¢22ã3RW6W"52&÷FV7FVB(	B3ö7Fö&W"##` ¥W6W"6öæf—&×2F†R&–v‡B7V&RÇ†Ôôdb6öÆ÷W"&W—"52â&÷FV7B÷VR7–â$t ¦–â7GVF–òõ6öÆ–BÂ6†V6¶W"G&ç7&Væ7’f÷"Ç†ôâÂ6öÖ&–æVBÖ–FFÆRÇ†ö÷6—G’À¦÷&–v–æÂã327FæFÆöæR%"&Wf–Ww2Â6WfVâÖö&¦V7BÆöF–ær÷76–ærÂd”Ur7F&–Æ—G’À¦æBW†—7F–ær6fRô÷VâôäôÒ&WFVçF–öââã3B67&VVç6†÷Bd”Â&VÖ–ç2–â†—7F÷'’0§7WW'6VFVBâã3R—266WFVC²æògW'F†W"Ç†6†FW"öFV6öFR6†ævW2ÆææVBà ¤æW‡BFWfVÆ÷ÖVçB—2â–çfW7F–vF–öâ&Vf÷&R–×ÆVÖVçFF–öã¢VF—BF†RW†—7F–æp¥7V$B÷7V&F—f—6–öâ÷væW'2æBäôÒF—7Æ6VÖVçB&WFVçF–öâö–×÷'BfÆ÷râ&Væ6†Ö&²§6ÖÆÂ&÷VæFVBFW76VÆÆF–öâ&Wf–Wröâ&W&W6VçFF—fRÆ÷r×öÇ’ö&¦V7G2âW7F&Æ—6€¦62f÷"6÷W&6Rf6W2Â7V&F—f—6–öâÆWfVÂÂvVæW&FVBfW'F–6W2Â–ÖvRF–ÖVç6–öç2À¦ÖVÖ÷'’æBg&ÖRF–ÖS²6ö×&Rv–ç7BF†R÷&–v–æÂVæÖöF–f–VBö&¦V7Bâ–b6fRÀ¦W‡÷6RF—7Æ6VÖVçB&Wf–Wr2G&ç6–VçB7GVF–òõ6öÆ–B7W&f6R÷fW&Æ’v—F€¦6æ6VÂöÖöFR×7v—F6‚6ÆVçW²¶VWW‡÷'FVBÖW6‚æB6÷W&6RÖVæ6†ævVBâ–bF†P¦W†—7F–ærF÷öÆöw’÷W&f÷&Öæ6R÷væW'26ææ÷B7W÷'B&W7öç6—fR•B&Wf–Wrv—F†–à¦6ÆV"6Â¶VWF—7Æ6VÖVçB–ç7V7F–öâÖöæÇ’æB&W÷'BF†RÖV7W&VBÆ–Ö—Bà¤Fòæ÷BFBF—7Æ6VÖVçBFVf÷&ÖF–öâFòã3RâæW‡B'V–ÆBföÆÆ÷w2F†—2VF—BövFRà ¤7W'&VçB7FGW3¢ã3RÄ•dRÂ4’æBvW2fW&–f–VBÂW6W"52&÷FV7FVBâæW‡B'V–Æ@¦fö7W3¢&÷VæFVBF—7Æ6VÖVçB÷7V&F—f—6–öâfV6–&–Æ—G’Âæò–×ÆVÖVçFF–öâ77VÖVBà ¢22ã3b(	B&÷VæFVB7V&F—f—6–öâF–Ö–ærvR(	B3ö7Fö&W"##` ¥W6W"ã3R52&÷FV7FVBâW†—7F–ærÖ÷væW"VF—B6öæf—&ÖVBäôÒF—7Æ6VÖVçB&WFVçF–öà¦æBW‡÷'B7W÷'BÂ'WBæ÷Bf–Ww÷'BFVf÷&ÖF–öââF†RWF†÷&—FF—fR6F×VÆÎ(	46Æ&°¦7V&F—f–FR‚–÷væW"÷W&FW2öâVF—F&ÆTÖW6‚F÷öÆöw’æBFöW2æ÷B&W6W'fR–×÷'FV@§W"Ö6÷&æW"Ub–ÆöG2âFòæ÷BW6R—G2&W7VÇBf÷"F—7Æ6VÖVçB7W&f6Rv—F†÷WB¥Ub×&W6W'f–ærF‚âæòF—7Æ6VÖVçB&VæFW"ö&¶Rv2FFVBà ¤FFVBFö72÷7V&F—f—6–öâÖ&Væ6†Ö&²Ó3bæ‡FÖÆÂÆ–æ¶VBF‡&÷Vv‚F†RW†—7F–ærf–ÆR(i ¥67&VVâ6ö×&—6öâòFW7BÆ—7B÷væW"â—BÆöG2F†R6ÖRÖW6‚æB7V&F—f—6–öâÖöGVÆW2À¦ÖV7W&W2bócBó#Sb&VwVÆ"VBf6W2BÆWfVÇ2(	32Â62vVæW&FVBF÷öÆöw’@£bÃ3ƒBf6W2‡ãbÃcCfW'F–6W2’ÂW6W2öæRv&Ò×WÇW2F‡&VR6×ÆW2ÂæB7F÷0¦W66ÆF–ærgFW"ãã'26×ÆRâ—BVÖ—G2ÖVF–âö6÷VçBö'&÷w6W"ôE"¥4ôâf÷"•@§&Wf–WræBFöW2æ÷BF÷V6‚F†R&ö¦V7B66VæRâ5R¶W&æVÂF–Ö–ær—2æ÷BUbG&ç6fW"À£bÖ&—B–ÖvR6×Æ–ærÂ†VÂuR÷"g&ÖRF–ÖRâæòFWf–6RF–Ö–ær÷"F—7Æ6VÖVç@¦66WFæ6R–æfW'&VBâ÷&–v–æÂã3RÇ†Ôôdb6öÆ÷W"52æB6WfVâÖö&¦V7Bõd”Ur50§&VÖ–â&÷FV7FVBà ¥&Vw&W76–öã¢æWr&Væ6†Ö&²FW7G2fW&–g’W6RöbF†R6æöæ–6Â7V&F—f—6–öâgVæ7F–öâÀ§&W6WBö6÷7F÷6öçG&7BæBW†7B÷WGWBf6R÷fW'FW‚6÷VçG2v†–ÆR6÷W&6RÖW6‚7F—0§Væ6†ævVBâfö7W6VB7V$BÖ66†RöF—7Æ6VÖVçBö&Væ6†Ö&²6†V6·3b53²&VÆV6RÖ6öçG&7@¦6†V6·3b52âgVÆÂæöFS#"7V—FS3cb52Âd”ÂÂ6¶—VBâ–æ—F–ÂgVÆÂ'Vâ6Vv‡@§F‡&VR7FÆR&VÆV6RU$Âö†6‚6öçG&7B&÷w2gFW"F†R&WV—&VB–â&Vg&W6ƒ²&Vg&W6†V@§F†R&Wf–WvVB–×÷'B6†–âæB&W&â6ÆVââ'VçF–ÖR6öÖÖ—Cc–csf3“fVC–6FS†C“3†S3“SS#f#6C#s–6B÷G&VVcc3#vC&33ƒ†VCc&&Ff#&V6csSVF6#C†CSc6à¤†÷7FVBF÷öÆöw’&Vw&W76–öãCS““Sƒ2æBvW3CS““Ssc5T44U52â6—‚Æ—fRð¦&Væ6†Ö&²f–ÆW2'—FRÖÖF6‚F†RV&Æ—6†VB6÷W&6RâFWf–6RF–Ö–æræBT’66WFæ6P§&VÖ–âVæF–æs²æòF—7Æ6VÖVçB&Wf–Wr66WFæ6R—26Æ–ÖVBà  ¢22ã3bW6W"F–Ö–ær&W÷'B&V6V—fVB(	B3ö7Fö&W"##` ¥F†RW6W"7WÆ–VBÆÃ’ã3b&Væ6†Ö&²&W7VÇG2g&öÒ•B6‡&öÖRf÷"”õ2„7&”õ3SbÀ¦•Dõ3#bãbã"ÂE#"’â7F'BöVæBGW&F–öãc×3²æòV&Ç’×7F÷wV&BâÖVF–â5RÖW6€§F–ÖW2f÷"6÷W&6Rf6W3bócBó#SbBÆWfVÇ3ó"ó3¢óó6×2Ãó2óf×2ÃóBó6×2âÆ&vW7@§&W7VÇCbÃ3ƒBf6W2óbÃcCfW'F–6W3²6×ÆW3"ó2óv×2â&V6÷&B26ö×ÆWFVB5P¦&Væ6†Ö&²FFÂæ÷B2F—7Æ6VÖVçB×&Wf–Wr÷"uR66WFæ6RÂæBæ÷B2W‡Æ–6—@¦÷fW&ÆÂW6W"52ôd”Ââæò&W÷'Böb÷7B×'Vâ66VæR÷6VÆV7F–öâ6†V6²à ¤VF—Bf÷"æW‡B7FW¢äôÒUg2&Rf6RÖ6÷&æW"'&—2–âvÆ%77F‡&÷Vv‚çWd6÷&æW'6°¦W†—7F–ær6F×VÆÎ(	46Æ&²f6R7Æ—GF–ær†27F&ÆR÷&FW&VB6÷&æW"F÷öÆöw’'WBG&÷0¥Ug2–â—G27W'&VçBVF—F&ÆTÖW6†&WGW&ââW‡FVæBF†R6ÖRWF†÷&—FF—fR÷væW"Fð§&÷vFR6÷&æW"Ug3²&WF–â6VÒ×7V6–f–2Ug2æBfW&–g’f6Rö6÷&æW"Æ–væÖVçBâæð§6V6öæBvVöÖWG'’¶W&æVÂâW6SbÃ3ƒBf6W2÷ãbÃcCfW'F–6W22&÷f—6–öæÂ6öæÇ“°¥UbÖ–ærÂbÖ&—BF—7Æ6VÖVçB6×Æ–ærÂ†VÂuRæBg&ÖR×F–ÖRvFW2&VÖ–â÷Vâà¢à ¢22ã3r(	B&÷VæFVB6F×VÆÎ(	46Æ&²6÷&æW"Ub&÷vF–öâ(	B3ö7Fö&W"##` ¤FFVB7V&F—f–FUv—F„6÷&æW%Ug2‚–&W6–FRF†R6æöæ–6Â6F×VÆÎ(	46Æ&²¶W&æVÂâV6€¦6†–ÆBVB&V6V—fW2f÷W"W"Ö6÷&æW"UbfÇVW2–âF†R6÷'&W7öæF–ærvVöÖWG'’÷&FW#°§6†&VBvVöÖWG&–2VFvW2Fòæ÷BÖW&vRUb6†'BfÇVW2âW†—7F–ær7V&F—f–FR‚–æ@¦6F×VÆÄ6Æ&²‚–6öçF–çVR&WGW&æ–ærvVöÖWG'’ÖöæÇ’ÖW6†W2âÆWfVÇ2&R&÷VæFVBFò(	3C°§&VfÆ–v‡B62&RbÃ3ƒB÷WGWBf6W2æCƒÃUb6÷&æW'2âæòf–Ww÷'B÷ ¦F—7Æ6VÖVçBv—&–ær—2–æ6ÇVFVBà ¤æWr&Vw&W76–öâ66W26÷fW"÷&FW&–ærÂ6VÒ&W6W'fF–öâÂ×VÇF–ÆWfVÂvVöÖWG'¦WV—fÆVæ6RÂ–Ö×WF&ÆR6÷W&6RFFöÖWFFFÂÖÆf÷&ÖVBFFæBF†RÆ&vW7Bã3`¦&Væ6†Ö&²66Rƒ#Sb6÷W&6Rf6W2BÆWfVÃ2’âfö7W6VBUbõ7V$Bö66†RöF—7Æ6VÖVçB6†V6·3’53²&VÆV6RÖ6öçG&7B6†V6·3R53²gVÆÀ¤æöFS#"7V—FS3s52ód”Ã²v—BF–fbÒÖ6†V6¶6ÆVââV&Æ—6†VBFòÖ–â2'VçF–ÖR6öÖÖ—B3s6ƒcVV3–3“6#&#ƒFC#s–V#F&3SCcvCVV&CS& ¢‡G&VRFCc6SFCcƒ#3–FVS6#cf3vcS#c–#C66’â†÷7FVBF÷öÆöw’&Vw&W76–öà£Cs3ƒƒ“RæBvW2FWÆ÷–ÖVçBCs3ƒƒ“b7V66VVFVC²fW'6–öâæ§6öâÂ–æFW‚æ‡FÖÀ¦æBÆÃ6†ævVB'VçF–ÖRÖöGVÆW2'—FRÖÖF6‚Æ—fRvW2âæòÖçVÂT’FW7B—0¦W‡V7FVBf÷"F†—2æöâÕT’†VÇW"à  ¢22ã3rW6W"52&÷FV7FVB(	B3ö7Fö&W"##` ¥W6W"&WÆ–VB52FòF†Rã3r6÷&æW"ÕUb7V&F—f—6–öâ'V–ÆBâ&÷FV7BF†RæWrUbÖv&P¤6F×VÆÎ(	46Æ&²†VÇW"æB—G26VÒÂ&—G’æB÷WGWBÖÆ–Ö—B6öçG&7BâF†RW6W"F–Bæ÷@§&WVW7B÷"fW&–g’f–Ww÷'BV&æ6R6†ævS²F†—2’&VÖ–ç2Væ6öææV7FVBFòF†P§&VæFW&–ærF‚âV&Æ–W"6WfVâÖö&¦V7Bõd”UræBã3R6öÆ÷W"ÖÇ†52&V6÷&G2&VÖ–à§&÷FV7FVBâæW‡BvFR—2â•BF–Ö–ær6ö×&—6öâ&Vf÷&Rç’F—7Æ’–çFVw&F–öâà ¢22ã3‚(	BUbÖv&R7V&F—f—6–öâF–Ö–ærvFR(	B3ö7Fö&W"##` ¤FBâ–âÖÆ–æ¶VB&W÷'B6ö×&–ærvVöÖWG'’ÖöæÇ’7V&F—f—6–öâv—F‚Ub&÷vF–öà¦f÷"6öçF–çV÷W2w&–G2æB–æFWVæFVçBW"Öf6R6†'G27&÷72F†Rã3bbócBó#SbÖf6P§v÷&¶ÆöBâ&WF–âF†SbÃ3ƒBÖf6RóƒÃÖ6÷&æW"Æ–Ö—G2æCã'2W"×'Vâ7F÷âF†RvP¦FöW2æ÷BÇFW"F†R&ö¦V7BæBÖV7W&W2æòFW‡GW&RFV6öFR÷6×Æ–ærÂÖVÖ÷'’ÂuR÷ ¦g&ÖRF–ÖRâF†RW6W.(	—2•B¥4ôâ&W÷'B—2æVVFVB&Vf÷&RFV6–F–ærv†WF†W"Fòv—&RF†P¦W†—7F–ærUb7W&f6RöF—7Æ’÷væW'2FövWF†W"âæòf–Ww÷'BF—7Æ6VÖVçB6†—2†W&Rà  ¢22ã3‚(	BUb7V&F—f—6–öâF–Ö–ærvFR(	B3ö7Fö&W"##` ¥W6W"ã3r52&÷FV7G2F†R6æöæ–6Â&÷VæFVB6÷&æW"ÕUb7V&F—f—6–öâF‚æB—G0§6VÒövVöÖWG'’–çf&–çG2âVF—FVB&VæFW&W"÷væW'3¢7GVF–òõ6öÆ–B6¶—æF—fRUb–ÖvP¦÷fW&Æ—2GW&–ær7V$B÷"Ö—'&÷"Âv†–ÆRÖ–î(	—27V$B66†R7F÷&W2vVöÖWG'’öæÇ’âfö–@¦GWÆ–6F–ær7V&F—f—6–öã²f—'7BFBâ•BF–Ö–ærvFR6ö×&–ærvVöÖWG'’ÖöæÇ’À¦6öçF–çV÷W2Ö6†'BæBW"Öf6R×6VÒUb66W2BbócBó#Sb6÷W&6Rf6W2ÂÆWfVÇ2(	32à¤V6‚F–ÖVB6×ÆR—2wV&FVBBã'2Âv—F‚bÃ3ƒBÖf6RòƒÃÖ6÷&æW"62â&W÷'@¦W†6ÇVFW2FV6öFR÷6×Æ–ærÂÖVÖ÷'’ÂuRæB&VæFW&VBg&ÖRF–ÖRà ¤WFöÖFVBfÆ–FF–öã¢2Ãs252òd”ÂöâæöFR#"âF÷öÆöw’&Vw&W76–öâ'Và£CssCS#ƒr5T44U52âvW2GFV×BCssCS‚f–ÆVB&V6W6RF†Rf—'7Bv—D‡V"&Æö §WÆöBG'Væ6FVBÆ&vRÖ&¶F÷vâf–ÆW3²W†7BÆö6Âv—B&Æö'2vW&R&R×WÆöFVBâvW0¦'V–ÆBöFWÆ÷’'VâCssC#“ƒS5T44U52âfW&–f–VBÆ—fRã3‚Ö&¶W"æB&Væ6†Ö&²U$Âà¥VæF–æs¢W6W"×'Vâ•BF–Ö–ær&W÷'B&Vf÷&RF—7Æ’–çFVw&F–öâ÷"F—7Æ6VÖVçBv÷&²à  ¢22ã3’(	B&÷VæFVBFW‡GW&VB7V$BF—7Æ’(	B3ö7Fö&W"##` ¥F†RW6W"7WÆ–VBF†Rã3‚•BUb7V&F—f—6–öâ&W÷'C¢ÆÂæ–æR&Væ6†Ö&²66W0¦6ö×ÆWFVBv—F†÷WBV&Ç’7F÷²vVöÖWG'’ÖF6†VB&6VÆ–æRÂ–çWG2&VÖ–æVBVæ6†ævVBà¤BbÃ3ƒBf6W2òcRÃS3bUb6÷&æW'2ÂÖVF–â5RvVæW&F–öâÖV7W&VB"×2f÷ ¦vVöÖWG'’Â#2×2f÷"6öçF–çV÷W2Ug2æB#"×2f÷"W"Öf6R6†'G2âF†—2—2æ÷@§FW‡GW&RÖFV6öFRÂÖVÖ÷'’ÂuR÷"g&ÖR×F–ÖRWf–FVæ6Rà ¢ã3’6öææV7G2F†R6æöæ–6Â6÷&æW"ÕUb7V&F—f—6–öâ&W7VÇBFòF†RW†—7F–ær7F—fP¥7V$BF—7Æ’66†RæBäôÒ7GVF–òõ6öÆ–B7W&f6R÷fW&Æ’â&Wf–Wr—2ÆÆ÷vVBöæÇ’f÷ ¦7F—fRVF—F&ÆRäôÒvVöÖWG'’v—F‚7W'&VçBÖF6†–ærUbF÷öÆöw’6–væGW&RÂæð¤Ö—'&÷"ÂæBv—F†–âF†R&RÖW†—7F–ær#ÃÖ6÷&æW"Ub&Wf–WrvVöÖWG'’Æ–Ö—BâF†P¦66†R7F÷&W2Ug2Æöæw6–FRF†R6ÖR7V&F—f–FVBÖW6‚âÖ—'&÷"Â–çfÆ–B÷7FÆRUg2À¦÷F†W"6÷W&6W2æB÷fW"Ö6&W7VÇG2fÆÂ&6²FòVçFW‡GW&VB7V$BâW†—7F–ær÷fW&Æ¦6ÆVçW—26ÆÆVB&Vf÷&R&öG’&V'V–ÆC²æò6V6öæB7V&F—f—6–öâ¶W&æVÂ÷"F—7Æ6VÖVç@§&Wf–Wr—2–çG&öGV6VBâfö7W6VB7V$BÂFW‡GW&R÷fW&Æ’æBF—7Æ’Ö66†RFW7G276VC°¦gVÆÂæöFR#"7V—FR76VB2Ãƒ2ó2Ãƒ2Â&VÆV6R76WBÖ6öçG&7B6†V6·276VBæ@¦v—BF–fbÒÖ6†V6¶—26ÆVââ†÷7FVBF÷öÆöw’&Vw&W76–öâCƒ#c###’æBvW0¦'V–ÆBöFWÆ÷’Cƒ#c“#7V66VVFVBf÷"'VçF–ÖR6öÖÖ—B3cC²fW'6–öâÖ&¶W"Â6†VÆÂÀ¦æ–æR'VçF–ÖRÖöGVÆW2æBGvòWfÇVF–öâ76WG2ƒ2f–ÆW2’ÖF6‚Æö6Âv—B&Æö'0¦'—FRÖf÷"Ö'—FRâF†P¢ã3’•Bf—7VÂfW&–f–6F–öâ&VÖ–ç2VæF–æs²Fòæ÷B6Æ–ÒuRÂÖVÖ÷'’÷"g&ÖR×F–ÖP§6fWG’g&öÒF†Rã3‚&Væ6†Ö&²â&W6W'fRV&Æ–W"ã3R6öÆ÷W"ÖÇ†¥52æB6WfVâÖö&¦V7Bõd”Ur66WFæ6Rà  ¢22ãC(	B–æ7F—fRäôÒ7V$BFW‡GW&W3²ã3’&6RÖÖFW&–Â52(	B3ö7Fö&W"##` ¥F†RW6W"56W2ã3“¢ÆÂ6WfVâö&¦V7G2F—7Æ’F†V—"ÖFW&–Ç2v—F†÷WB7V$BâF†P¦föÆÆ÷r×W•B&W÷'B—6öÆFW2F†Rv¢v†Vâ7V$B—2Væ&ÆVB7&÷72×VÇF—ÆRö&¦V7G2À¦öæÇ’F†R6VÆV7FVBö&¦V7Bw2ÖFW&–ÂF—7Æ—2â&÷FV7BF†RæöâÕ7V$B&V†f–÷"Â6WfVâÐ¦ö&¦V7Bf—6–&–Æ—G’Âd”UrÖöFW2æBV&Æ–W"6öÆ÷W"ÖÇ†52à ¤W†—7F–ær–æ7F—fRÖö&¦V7B&VæFW&–ærÇ&VG’÷væVB–æFWVæFVçB7V$B66†W2æB&WW6V@§F†R6æöæ–6ÂvVöÖWG'’¶W&æVÂÂ'WB76VBæV—F†W"W"Ö6÷&æW"Ug2æ÷"7V$BUb–Æö@§FòF†RW†—7F–ær7GVF–òõ6öÆ–B÷fW&Æ’âãC&WW6W2F†B66†Rv—F‚F†R6æöæ–6À¦7V&F—f–FUv—F„6÷&æW%Ug2‚–F‚æB6†&VB7F—fRö–æ7F—fR6÷W&6R÷F÷öÆöw’ôÖ—'&÷"ö6 ¦VÆ–v–&–Æ—G’â—BGF6†W2F†RW†7BF—7Æ’ÖW6‚æBUb–ÆöBFòV6‚–æ7F—fR&öG’à¤–æ7F—fR÷fW&Æ’6ÆVçWæ÷r'Vç2F‡&÷Vv‚F†RW†—7F–ær&VæFW"6ÆVçW÷væW"&Vf÷&P¦66†VBvVöÖWG'’—2&WW6VBâæò&ÆÆVÂ&VæFW&W"Â7V&F—f—6–öâ¶W&æVÂ÷"F—7Æ6VÖVç@§&Wf–Wrâ×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3÷cÓã3bãã&VÖ–ç2VçF÷V6†VBà ¤æWr&Vw&W76–öâ6÷fW'2F—7F–æ7BW"Öö&¦V7BUbö66†R&W7VÇG2Â66†R&WW6RÂ7FÆRôÖ—'&÷"ð¦6fÆÆ&6²Â7GVF–òõ6öÆ–B–æ7F—fR÷fW&Æ’ÂæB6ÆVçWâW†—7F–ær7F—fR7V$BÂ–æ7F—fP¦vVöÖWG'’–FVçF—G’öF—7÷6ÂÂÖ—'&÷"Â&VæFW"W&f÷&Öæ6RÂ&ööÆVâ66VæRÆ–fV7–6ÆRÂæ@¤äôÒÖFW&–ÂFW7G272âgVÆÂæöFR7V—FS¢2Ãƒ52òd”Ââ&VÆV6RÖ6öçG&7B6†V6·0§73²v—BF–fbÒÖ6†V6¶6ÆVââ†÷7FVB4’æBV&Æ–6F–öâWf–FVæ6RVæF–ærà ¤DUd”4SC¢W6RF†R6WfVâÖö&¦V7BäôÒ6×ÆS²fW&–g’ÆÂ6WfVâ&6RÖFW&–Ç2ÂF†Và¦Væ&ÆR7V$Böâ×VÇF—ÆRFW‡GW&VBö&¦V7G2æB6öæf—&ÒFW‡GW&W2&VÖ–âf—6–&ÆRv†–ÆP§Vç6VÆV7FVB–â7GVF–òæB6öÆ–Bâ7v—F6‚6VÆV7F–öâÂFW6VÆV7BÆÂÂFövvÆR7V$BôÖ—'&÷"À§&V÷Vâd”UræBæf–vFRâF—7Æ6VÖVçBÂuRÂÖVÖ÷'’Â–ÖvRÖFV6öFRæB&VæFW&VBg&ÖP§F–ÖR&VÖ–â÷WG6–FRF†—2fÆ–FF–öâà  ¢22ãCV&Æ–6F–öâfW&–f–VB(	B3ö7Fö&W"##` ¥'VçF–ÖR6öÖÖ—B#SVF“v#s&#3ƒ“c“†3csf3cvc“s6&CC36c†v—F‚G&VP¦ccsCC#c#SFcCsFvcFs66S#3C&3ƒvC†f&—2öâ&VÖ÷FRÖ–ââ†÷7FVBF÷öÆöw§&Vw&W76–öâCƒsSCs’æBvW2'V–ÆBöFWÆ÷’CƒsSCcsS"&÷F‚6ö×ÆWFVB5T44U52à¤Æ—fRfW'6–öâæ§6öâæB6WfVâ6†ævVB'VçF–ÖR76WG2†–æFW‚6†VÆÂÂÖ–âÂ×VÇF’Öö&¦V7BÀ¥7V$BF—7Æ’66†RÂ6†VÆÂ6ö×&—6öâÂG&vW"×V’æBf6R×v÷&¶fÆ÷rÖÆ–÷WB’ÖF6‚F†P¦Æö6Â'VçF–ÖR'—FW2W†7FÇ’âÆö6ÂgVÆÂæöFR7V—FS¢2Ãƒ52òd”Ã²fö7W6VBæWp¥7V$BæB&VÆV6RÖ6öçG&7B6†V6·272âæF—fR•B66WFæ6Rv2VæF–ærBV&Æ–6F–öã²F†RÆFW"W6W"52—2&V6÷&FVB&VÆ÷rà ¢22ãCW6W"52&÷FV7FVB(	B3ö7Fö&W"##` ¥W6W"6öæf—&×2ÆÂö&¦V7G2&WF–âF†V—"ÖFW&–Ç2v—F‚7V$BVæ&ÆVBÂ–æ6ÇVF–æp§Vç6VÆV7FVBö&¦V7G2â&÷FV7B–æ7F—fRÖö&¦V7BFW‡GW&VB7V$B–â7GVF–òõ6öÆ–BæBF†P§FW7FVB6VÆV7F–öâÖ–æFWVæFVçB&V†f–÷"âæW‡B6æF–FFR—26÷W&6RVF—BöbF†P¦W†—7F–ærF—7Æ6VÖVçB÷væW'2æB&÷VæFVBVæB×FòÖVæB&Wf–Wr÷W&f÷&Öæ6RvFS°§F†Rã3‚5RÖW6‚õUb&Væ6†Ö&²FöW2æ÷BW7F&Æ—6‚FV6öFRÂÖVÖ÷'’ÂuR÷"g&ÖR×F–ÖP§6fWG’âæò'VçF–ÖR6†ævR–âF†—2fVVF&6²WFFRà  ¢22ãC(	BF—7Æ6VÖVçB&Wf–WrfV6–&–Æ—G’vFR(	B3ö7Fö&W"##` ¢ãC•B52&VÖ–ç2&÷FV7FVBâVF—FVBF†RW†—7F–æræF—fRF—7Æ6VÖVç@§&W6÷W&6R÷væW#¢äôÒF—7Æ6VÖVçB&–æF–æw2&RÇ&VG’&WF–æVB÷fÆ–FFVBf÷"U`¦–ç7V7F–öâæBW‡÷'BÂv†–ÆRF†R7W'&VçB7GVF–òõ6öÆ–BÖFW&–Â÷fW&Æ’FöW2æ÷@¦6öç7VÖRF—7Æ6VÖVçBâFòæ÷B7&VFR6V6öæB&VæFW&W"÷"7V&F—f—6–öâ¶W&æVÂà ¢ãCFG2FV×÷&'’&Væ6†Ö&²VçG'’FòF†RW†—7F–ærf–ÆR(i"67&VVâ6ö×&—6öâð§FW7BÆ—7Bâ—BW6W2F†R6æöæ–6Â6÷&æW"ÕUb7V&F—f—6–öâ†VÇW"ÂvVæW&FVB‚Ö&—@¦w&—66ÆRäw2B#Sl+"ó#L+"ó#CŒ+"Â&÷VæFVBbócBó#SbÖf6R6÷W&6RÖW6†W2Â6÷&æW"ÕU`¦vVöÖWG'’W‡ç6–öâæBF‡&VRæ§2F—7Æ6VÖVçDÖÖFW&–Ââ—B&V6÷&G2vVæW&F–öâÀ¥ärVæ6öFRöFV6öFRÂ7V&F—f—6–öâÂW‡ç6–öâÂW7F–ÖFVB'—FR6÷VçG2Â&VæFW"7V&Ö—76–öâÀ¦g&ÖR–çFW'fÇ2æB÷F–öæÂuRF–ÖW"VW'’&W7VÇG2â6–ævÆR5R7FvR÷fW"ã'0§7F÷2F†R'VâæBÆVfW26÷–&ÆR'F–Â&W÷'BâæòF—7Æ6VÖVçBFVf÷&ÖF–öâ—0¦FFVBFò&ö¦V7B&VæFW&–ærà ¤f–æÂÆö6ÂæöFR7V—FS¢2Ãƒ252òd”Âò6¶—VBâF†RãCvFRÂ&VÆV6R×–âÀ¦W†—7F–ærã3‚Ub&Væ6†Ö&²æBãC–æ7F—fR7V$B&Vw&W76–öâ6†V6·276VC²ÖöGVÆP§7–çF‚æBv—BF–fbÒÖ6†V6¶&R6ÆVââÆ—fRV&Æ–6F–öâ—2VæF–ærâF†RW6W"•@§&W÷'B—2&WV—&VB&Vf÷&R6†ö÷6–ær&öGV7F–öâF—7Æ6VÖVçB–×ÆVÖVçFF–öâà  ¢22ãC•BfV6–&–Æ—G’&W÷'B&V6V—fVB(	B3ö7Fö&W"##` ¥F†RW6W"7WÆ–VBF†RãC&W÷'Bg&öÒ•Dõ2#rã"òE""âÆÂæ–æRvVæW&FVBÖÖ §&VæFW"66W26ö×ÆWFVBv—F†÷WBV&Ç’7F÷âBF†RÆ&vW7B66Rƒ#Sb6÷W&6Rf6W2ÂÆWfVÀ£2ÂbÃ3ƒB÷WGWBf6W2òcRÃS3b6÷&æW'2’ÂÖVF–âUb7V&F—f—6–öâv2#×2ÂUbÖ6÷&æW ¦vVöÖWG'’W‡ç6–öâ^(	3‚×2æBW‡æFVBG—VB'&—22Ö”"âF†R#CŒ+"vVæW&FVBäp¦FV6öFVB–âC‚×2Âv—F‚bÖ”"W7F–ÖFVB&6R$t$²$b–çFW'fÇ2vW&Rr×2ÖVF–âæ@£~(	3‚×2“RâuRF–ÖW"VW&–W2vW&RVæf–Æ&ÆRà ¥G&VB2ff÷&&ÆRfV6–&–Æ—G’Wf–FVæ6RöæÇ’Âæ÷BW6W"52f÷"f–Ww÷'BF—7Æ6VÖVçBà¥F†RFW7BW6VB6–ævÆRÖW6‚æB7–çF†WF–2‚Ö&—BÖ²7GVÂæöÖBbÖ&—B6÷W&6RFV6öF–ærÀ¤&÷„Æ"f–Ww÷'Bög&ÖR6÷7BÂgVÆÂÖVÖ÷'’Â6†F÷w2æBf7F÷"öÖ–Gö–çB÷v÷&ÆB6VÖçF–72&P¦æ÷BW7F&Æ—6†VBâæW‡BVF—BF†R&VÂ&WF–æVBæöÖBF—7Æ6VÖVçB–ÆöB÷6WGF–æw2æ@§&÷WFRç’gWGW&R&Wf–WrF‡&÷Vv‚F†RW†—7F–ærUb7W&f6Rõ7V$B÷væW'2v—F†–â7W'&VçB62à ¢22ãC"(	BG&vv&ÆRUb–çBÆWGFRæB6öçFW‡GVÂV–6²6öçG&öÇ2(	B3ö7Fö&W"##` ¥F†RW6W"&WVW7FVBÆ–v‡FW"ÂG&vv&ÆR–çB&F–ÂÖVçRæBÖ÷f–ær&WWF—F—fR''W6€§6WGF–æw2÷WBöbF†RæVÂ&VÆ÷rF†RÆ–W"Æ—7BâVF—FVBW†—7F–ærf–Ww÷'B×–çB6öçG&öÇ0¦æB¶WBF†V—"÷&–v–æÂDôÒæöFW2Â–çWB†æFÆW'2æB7FFR÷væW'2âF†R6ÖR6†ææVÂð§&Wf–WrÂ6öÆ÷W"Â6—¦Rö÷6—G’Âf–ÆÂÂ&ÇW"÷66Æ"æBÖ6²×fÇVR6öçG&öÇ2æ÷r6—B–â¦6ö×7BfÆöF–ær6öçFW‡GVÂæVÂâÆ–W"Æ—7B&VÖ–ç2–âF†RW'6—7FVçBÆVgBæVÂà¥F†R6ÖÆÆW"FööÂv†VVÂæB6öçG&öÂæVÂ6†&RG&r†æFÆS²ö–çFW"Ö÷fVÖVçB6Æ×0§F†RæVÂv—F†–âF†Rf–Ww÷'BÂæB—G2÷6—F–öâW'6—7G2v†–ÆRF†R–çBÖöGVÆR&VÖ–ç0¦÷Vââ6VÆV7F–ærFööÂ7v—F6†W2Fò—G2V–6²6öçG&öÇ3²FööÇ2÷"F†R÷&–v–æÂ&6¶w&÷Væ@¦†öÆB&V÷Vç2F†Rv†VVÂâW†—7F–ærVæ6–ÂÂf–ævW"æf–vF–öâÂ6æ6VÆÆF–öâÂ†—7F÷'’æ@¤FöæR&V†f–÷"&VÖ–âv—F‚F†V—"÷&–v–æÂ÷væW'2à ¤6ö×7BÆ–÷WB55266÷W2v†VVÂ6ö÷&F–æFW2÷6—¦–ærFòF†Rv†VVÂæBv—fW2F†RV–6°§æVÂ—G2÷vâv–GF‚ö†V–v‡B'VÆW2â&VÆV6R¶W—2WFFVBFòãC"f÷"F†R6†VÆÂÂ–ç@¦ÖöGVÆRÂ6ö×7B7G–ÆW6†VWBæB&VÆV6R–FVçF—G’âG&vW"ôf6R×v÷&¶fÆ÷r÷&VÆV6R×fW'6–öà¦ÆöFW"6†–â&Vg&W6†VC²&÷FV7FVB7&2ö×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3÷cÓã3bãã—2Væ6†ævVBà¥F†R'VçF–ÖRÖ76WB6öçG&7B&V6÷&G2F†R&Wf–WvVB–ç2æB7W'&VçB'—FW2à ¤æWrWFöÖFVB6÷fW&vRfW&–f–W2FööÂ×FòÖ6öçG&öÇ2G&ç6—F–öç2v—F†÷WB†—7F÷'’6†ævW2À§&WW6Röb÷&–v–æÂ6öçG&öÇ2æBW'6—7FVçBÆ–W"Æ6VÖVçBÂ6öÆ÷W"÷6—¦Rö÷6—G’WFFW2À¦Ö6²6öçFW‡GVÂf—6–&–Æ—G’ÂG&rö6Æ×–ær–â&÷F‚7FFW2Â6ö×7BÆ–÷WBæB&–÷"–ç@¦–çFW&7F–öââF†Rf—'7BgVÆÂ'Vâf÷VæBGvò7FÆRFW7G2F†B7F–ÆÂW‡V7FVBF†Rv†VVÂFð§&VÖ–â÷VâgFW"FööÂ6VÆV7F–öâæBF†R7W'&VçB&VÆV6RFò&VÖ–âãC²F†÷6RFW7@¦W‡V7FF–öç2vW&RWFFVBFòãC"&V†f–÷"v†–ÆR&W6W'f–ærF†R6W&FRãC&Væ6†Ö&²à¤f–æÂÆö6ÂæöFR7V—FS¢2ÃƒR52òd”Âò6¶—VBò6æ6VÆÆVBƒbã#—2’à¤f–gFVVâfö7W6VB–çBö6ö×7BÖÆ–÷WB6†V6·2Âf—fR&VÆV6RÖ6öçG&7B6†V6·2ÂæBF†P§WFFVBv÷&¶fÆ÷röF—7Æ6VÖVçBÖ&¶W"6†V6·272â6†ævVB¦f67&—B7–çF‚6†V6·2æ@¦v—BF–fbÒÖ6†V6¶&R6ÆVââÆ–6F–öâ6öÖÖ—B66C#V3vC†Cc6#f#c&&#Cs&cs†&#VV#`¦†2F†RW†7BFW7FVBG&VRâ†÷7FVBF÷öÆöw’&Vw&W76–öâC#s3#cc2æBvW2FWÆ÷–ÖVç@£C#s3#cb&÷F‚7V66VVFVBâÆ—fRfW'6–öâæ§6öæÂ–æFW‚æ‡FÖÆÂ7&2÷f–Ww÷'B×–çBæ§6À¦6ö×7BÖÆ–÷WBæ776Â7&2÷6†VÆÂÖ6ö×&—6öâæ§6Â7&2öG&vW"×V’æ§6À¦7&2öf6R×v÷&¶fÆ÷rÖÆ–÷WBæ§6æB7&2÷&VÆV6R×fW'6–öâæ§6vW&RfWF6†VBæB'—FRÖÖF6†V@§F†RÆö6ÂFW7FVB6öçFVçBâF†R&÷FV7FVB×VÇF’67&—B–â&VÖ–ç2Væ6†ævVBâæF—fR•@¦V&æ6RæBF÷V6‚66WFæ6R&R7F–ÆÂVæF–ærà¥F†R•B6†V6·2&R–âF†RãC"6V7F–öâBF†RF÷öbDU5Eô4„T4´Ä•5BæÖC²DôÒFW7G2Fð¦æ÷B–×Ç’æF—fRF7F–ÆR÷"f—7VÂ66WFæ6RâæW‡C¢ö'F–âW6W"ãC"FWf–6R&W7VÇBÂF†Và§&W7VÖRF†R&WF–æVBæöÖBF—7Æ6VÖVçB6÷W&6R÷6WGF–æw2VF—Bg&öÒF†RW†—7F–ær&öFÖà  ¢22ãCR(	B6öÖ&–æVBUb–çBÖFW&–Â7G&ö¶W2æB–çFW&7F–öâ(	Bæ÷fVÖ&W"##` ¥W6W"&WVW7FVB6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW72–çF–ær–âöæR7G&ö¶RÂÆ—B&Wf–Wr÷6†F÷r&W7F÷&F–öâÂVæ6–Â÷&&—B–â–çBÂ''W6‚×FòÔÖFW&–ÂÖÖVçR&÷WF–ærv—F‚6öçFW‡GVÂ&F–Â6öçG&öÇ2ÂæB–×&÷fVB6×VFvR&ÆVæF–ærâ&WW6VBf–Ww÷'B×–çBÖ6÷&Ræ§6f÷"×VÇF’×&W6÷W&6R7Fv–æræBöæR66VæRÖ†—7F÷'’6†V6·ö–çC²W†—7F–ær&÷Vv†æW72ôÖWFÆæW72&W6÷W&6R÷væW'2&VÖ–âWF†÷&—FF—fRâöæR''W6‚6öçF7Bæ÷r7F×26VÆV7FVB6öÆ÷W"ÇW2÷F–öæÂ66Æ"Ö2æBV&Æ—6†W2FöÖ–6ÆÇ’â66Æ"6†ææVÂ6†ævW2f÷&6RÆ—B&Wf–WræB–çBW†—B&Vg&W6†W2F‡&÷Vv‚F†RW†—7F–ær&VæFW"ÖÖöFR÷væW"à ¤''W6‚÷Vç2ÖFW&–Âb–çBF—&V7FÇ’âf–ÆÂôW&6W"õ6×VFvRô&ÇW"ÖVçW2W6RF†RW†—7F–ær6öçG&öÇ2æB6†÷röæÇ’FööÂ×&VÆWfçB6WGF–æw2âVæ6–Â&6¶w&÷VæB†—G2&RæòÆöævW"6öç7VÖVB&Vf÷&R7V66W76gVÂ–çBö–ÖvR†—BÂv†–ÆR÷fW&Æ–ærVæ6–Â6öçF7G2GW&–ærf–ævW"æf–vF–öâ&VÖ–â7vÆÆ÷vVBâ6×VFvRWFFW2—G2Æö6Â&W6W'fö—"&WGvVVâF'2v—F‚7G&öævW"SóS6'&–VB÷7W&f6RÖ—‚Â&W6W'f–ær&V×VÇF—Æ–VBÇ†Â6öææV7FVB6VÒfW&v–ærÂUbÖf6R—6öÆF–öâÂ6æ6VÆÆF–öâæB&÷VæFVBv÷&²à ¥fÆ–FF–öã¢gVÆÂæöFR7V—FR2Ã“52òd”Âò6¶—VB&Vf÷&RF†Rf–æÂ–â×Æ6R6×VFvR&W6W'fö—"ÆÆö6F–öâ÷F–Ö—¦F–öââf–æÂ÷7BÖ÷F–Ö—¦F–öâfö7W6VBÖFW&–ÂÂ6öææV7FVB6×VFvRÂ&VÆV6R–FVçF—G’æB6†VÆÂ6WB3B52òd”Ââ'&öFW"–çBÂVæ6–ÂÖæf–vF–öâÂ&VÆV6RæB66†R×–â6WB76VBC2òC2&Vf÷&RF†BÆÆö6F–öâÖöæÇ’÷F–Ö—¦F–öââ¥27–çF‚æBv—BF–fbÒÖ6†V6¶72âæF—fR•Bf—7VÂ÷F÷V6‚66WFæ6R—2VæF–ærâ&÷FV7FVB7&2ö×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3÷cÓã3bãã—2Væ6†ævVBà ¥V&Æ–6F–öã¢6öÖÖ—BSV3ƒ6c“&F3–#ssCvCF6#S6#&3vC&#6öâÖ–æÂW†7BG&VRcFVSVSC3CF#ƒVS&6S“v3†3v6#csscV#vSVâvW2C#Ss“C#6æB†÷7FVBF÷öÆöw’&Vw&W76–öâC#Ss“3Cv7V66VVFVBâ66†RÖ'W7FVBÆ—fRfW'6–öâæ§6öæÂ–æFW‚æ‡FÖÆæBÆÂæ–æR6†ævVBöÆöFW"'VçF–ÖRÖöGVÆW2'—FRÖÖF6‚F†—2&VÆV6RâæF—fR•B66WFæ6R&VÖ–ç2VæF–ærà  ¢22ãCb(	BÖWFÆæW726†F–ær&W7F÷&F–öâæB7G&öævW"6×VFvR(	Bæ÷fVÖ&W"##` ¥W6W"&W÷'G2(	ÃCR5>(	ÒæB&÷FV7G2F†R6öÖ&–æVB6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW727G&ö¶Rv÷&¶fÆ÷rÂÆ—B&Wf–WrÂVæ6–Âæf–vF–öâÂ6öçFW‡GVÂ–çB6öçG&öÇ2æB&Wf–÷W26×VFvR&V†f–÷"âF†R6ÖR&W÷'B6—2ÖWFÆæW72–çF–ærFöW2æ÷B&WGW&âFòæ÷&ÖÂ6†F–æræB6×VFvR&VÖ–ç2vV²à ¤VF—Bf÷VæBF†RW†—7F–ær7&VFU–çE7W&f6R‚–÷væW"7F'G2Æ—B7W&f6W2v—F‚v†—FRÆ&VFòæBFVfVÇB&÷Vv†æW72öVÖ—76—fRfÇVW2âv†Vâæò6öÆ÷W"ÖW†—7G2Â6öÖÖ—GFVB66Æ"&Wf–Ww2F†W&Vf÷&R&WÆ6RF†R6÷W&6R7GVF–ò6†F–ærâ&WW6RF†R÷&–v–æÂ&öG’ÖFW&–Â2F†RfÆÆ&6³¢66Æ"ÖöæÇ’Ö2&WF–â&6R6öÆ÷W"Â6÷W&6R&÷Vv†æW72v†Vâæò&÷Vv†æW72Ö—2&W6VçBÂVÖ—76—fR6öÆ÷W"ö–çFVç6—G’æBVçf—&öæÖVçB–çFVç6—G’â–çFVB6öÆ÷W"Ö27F–ÆÂ&WÆ6RÆ&VFòÂæB66Æ"Ö26öçF–çVRW6–ærF†V—"÷&–v–æÂ6†ææVÂFFâW†—7F–ær7GVF–ò&VæFW"ÖÖöFR&V'V–ÆBÂ6†F÷w2æBÖFW&–ÂÖÖ÷væW'2&VÖ–â–âÆ6Rà ¥6×VFvR&W6W'fö—"6''’–æ7&V6W2g&öÒSRFòƒRÂÖ¶–ærÖ—†VB6öÆ÷W"G&fVÂÖ÷&R7G&öævÇ’&WGvVVâF'2âW†—7F–ær&V×VÇF—Æ–VBÇ†Â6öææV7FVBÖæ–föÆBÖf6RfW&v–ærÂUbÖ—6ÆæB—6öÆF–öâÂv÷&²'VFvWBæB6æ6VÆÆF–öâ&V†f–÷"&VÖ–â6÷fW&VBâæòæWr–çB¶W&æVÂ÷"ö–çFW"÷væW"à ¤FFVB6öÖÖ—GFVBÖWFÆæW72ÖöæÇ’ÖFW&–Â&Vw&W76–öâæBWFFVBW†7B6×VFvR÷WGWB6†V6·2f÷"&VwVÆ"ÂÇ†æB&÷FFVBöÖ—'&÷&VB6öææV7FVB7W&f6W2âfö7W6VBf–æÂ–çBÂ6×VFvRÂ&VÆV6RæB6†VÆÂ6WC¢Cb52òd”ÂâgVÆÂæöFR7V—FS¢2Ã“"52òd”Âò6¶—VBƒã#‡2’â6†ævVB¦f67&—B7–çF‚æBv—BF–fbÒÖ6†V6¶72âV&Æ—6†VBFòÖ–æB6öÖÖ—BV6Ff6CS#SssƒC3sv36S†V3ƒSc“#6V&63“cc3–²föÆÆ÷r×WUDbÓ‚Fö7VÖVçB&W—"—23f663#3–VfSCƒcc#S†sC#“ƒFCƒ†66VV#S†âvW2'VâC#ƒ#33CcVæB†÷7FVBF÷öÆöw’&Vw&W76–öâC#ƒ##s##†7V66VVFVBâF†RÆ—fRvRF—7Æ—2cã3bã‚ãCfâF†R–æ—F–ÂvW2'VâC#ƒ##csSf–ÆVB&V6W6RF†R÷fW'6—¦VB†—7F÷'’ö6†V6¶Æ—7Bf–ÆW2vW&RG'Væ6FVBGW&–ærF†R’WÆöC²F†W’vW&R&W7F÷&VBg&öÒF†RW†7BfÆ–FFVBÆö6ÂUDbÓ‚6÷–W2æBF†R7V'6WVVçBFWÆ÷–ÖVçB76VBâ&÷FV7FVB7&2ö×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3÷cÓã3bãã—2Væ6†ævVBà ¤DUd”4SCc¢–çBÖWFÆæW72öâ7GVF–òö&¦V7Bv—F‚æò–çFVB6öÆ÷W"ÖÂFFöæRæB6öæf—&ÒF†R÷&–v–æÂ7GVF–òV&æ6R÷6†F÷w2&WGW&âv†–ÆRÖWFÆæW72&VÖ–ç2f—6–&ÆS²&WVBv—F‚6öÆ÷W"Öâ6×VFvR&WGvVVâ6öçG&7F–ær6öÆ÷W'2æB7&÷72föÆFVB6öææV7FVBVFvS²fW&–g’7G&öævW"6''’æBöæR×7FWVæFòõ&VFòà  ¢22ãCr(	BÖWFÆæW726†F÷r6öçG&7BæB7F&ÆR6öÆ÷W"7G&ö¶R7F'B(	Bæ÷fVÖ&W"##` ¥W6W"fVVF&6²öâãCc¢d”Â(	Bæòf—6–&ÆR6†F÷rgFW"–çF–ærÖWFÆæW72v—F†÷WB6öÆ÷W"Ö²d”Â(	B6öÆ÷W"–çF–ær–çFW&Ö—GFVçFÇ’÷&&—G2gFW"Ub–çBFöæRÂv†–ÆR&Vg&W6‚6öÖWF–ÖW2&W7F÷&W2&V†f–÷#²52(	B6×VFvR—2×V6‚&WGFW"â&÷FV7B6×VFvRà ¤VF—Bf÷VæBF†R6öÖÖ—GFVBÖWFÆæW72ÖöæÇ’&Wf–WrFG2F†R&ööÔVçf—&öæÖVçBBgVÆÂfÆÆ&6²–çFVç6—G’Âv†–6‚6âf–ÆÂF†RÖWFÂ7W&f6RæBv6‚÷WB7GVF–ò6öçG&7BâF†RW†—7F–ær6öÖÖ—GFVB–çB7W&f6R&VÖ–ç2F†R÷væW#²6Vçf—&öæÖVçB–çFVç6—G’Fòã3RöæÇ’v†VâÖWFÆæW72ÖW†—7G2v—F†÷WB6öÆ÷W"ÖâW†—7F–ær&6R6öÆ÷W"ÂÖFW&–Â6÷W&6RÂ67B÷&V6V—fR6†F÷rfÆw2Â6öÆ÷W"×–çFVBV&æ6RæBÖWFÂFF&VÖ–â÷væVB'’F†R÷&–v–æÂF‚à ¥F†R–çB6GW&R†æFÆW"&Wf–÷W6Ç’&WGW&æVBöâVæ6–Âö–çFW&F÷vâv—F‚¦W&ò–æ—F–Â&W77W&R÷"æò&W÷'FVB'WGFöç2ÂÆÆ÷v–ær÷&&—D6öçG&öÇ2Fò6VRâöâ×7W&f6R6öçF7BâÆWBF†RW†—7F–ær&–67Bö†—B÷væW"FV6–FRv†WF†W"–çB6Æ–×2—BÂFVfVÇBf—'7B¦W&ò×&W77W&R6×ÆRFògVÆÂ–æ—F–Â''W6‚&W77W&RÂæBWFFR&VÖVÖ&W&VB&W77W&RöæÇ’g&öÒ÷6—F—fR6×ÆW2â&6¶w&÷VæB†—B7F–ÆÂ&WGW&ç2Væ6öç7VÖVBf÷"Væ6–Âæf–vF–öââ&Vw&W76–öâ6÷fW'27W&f6R6öçF7B&Vf÷&RæBgFW"FöæR÷&V÷Vâà ¤æò&ÆÆVÂÖFW&–ÂÂ&–67BÂvW7GW&R÷"ÖöFVÆÆ–ær¶W&æVÂâ&÷FV7FVBãCVv÷&¶fÆ÷w2æBãCf6×VFvR52&VÖ–âVæ6†ævVBâfö7W6VB–çBöÖFW&–Âõ6×VFvR÷&VÆV6R÷6†VÆÂ6WC¢Cb52òd”ÂâgVÆÂæöFR7V—FS¢2Ã“252òd”Âò6¶—VBƒ#ãƒ2’â6†ævVB¦f67&—B7–çF‚Â&Wf–WvVB'VçF–ÖR76WB–ç2ö†6†W2æBv—BF–fbÒÖ6†V6¶72âV&Æ—6†VBFòÖ–æB6CScCS&S3“ƒCƒ3Fc†#f&663ScC“ƒ#&&&âvW2C#ƒScsƒcvæB†÷7FVBF÷öÆöw’&Vw&W76–öâC#ƒScƒv7V66VVFVC²Æ—fRô&÷„Æ"öfW'6–öâÖ&¶W"Â6†VÆÂæBÆÂ6†ævVB÷&W–ææVB'VçF–ÖRÖöGVÆW2'—FRÖÖF6‚âæF—fR•B6†V6·3¢ÖWFÂÖöæÇ’7GVF–ò6†F÷rö6öçG&7BæB&WVFVB6öÆ÷W"7G&ö¶W2–ÖÖVF–FVÇ’gFW"FöæR÷&Vg&W6‚Â–æ6ÇVF–ær6öçF–çVVBVæ6–Â&6¶w&÷VæB÷&&—Bà  ¢22ãC‚(	B7GVF–ò6†F÷r6öçG&7Bv—F‚6öÆ÷W"æBÖWFÆæW72Ö2(	Bæ÷fVÖ&W"##` ¥W6W"&W÷'G26W&FR–çBÖFW&–Â6†ææVÇ2æBFööÆ&'252Â'WB6†F÷rÆ÷72v†Vâ6öÆ÷W"Ö—2W6VBv—F‚ÖWFÆæW72âF†RãCvf—‚6VB&ööÔVçf—&öæÖVçBf–ÆÂöæÇ’v†Vâæò6öÆ÷W"ÖW†—7FVC²F†R÷&–v–æÂ÷væW"&WF–æVBgVÆÂfÆÆ&6²Vçf—&öæÖVçB–çFVç6—G’f÷"–çFVB6öÆ÷W"´ÖWFÆæW727W&f6Rà ¤W‡FVæBF†RW†—7F–ær7&VFU–çE7W&f6R‚–÷væW"Fò6Vçf—&öæÖVçB–çFVç6—G’f÷"ç’6öÖÖ—GFVB7W&f6Rv—F‚ÖWFÆæW72ÖÂ&Vv&FÆW72öbv†WF†W"6öÆ÷W"Ö—2Ç6ò&W6VçBâ&WF–â–çFVBÆ&VFòÂ66Æ"ÖÖfÇVW2Â6÷W&6R7GVF–òÖFW&–ÂÂæB67B÷&V6V—fR6†F÷rfÆw2âF†RÖWFÂÖöæÇ’&V†f–÷"&VÖ–ç2Væ6†ævVBâFB6öÖÖ—GFVB6öÆ÷W"´ÖWFÆæW72&Vw&W76–öâF†BfW&–f–W2F†R6öÆ÷W"—†VÇ2ÂÖWFÂ6†ææVÂÂã3VVçf—&öæÖVçB–çFVç6—G’æB6†F÷rfÆw2FövWF†W"âæòæWr&VæFW&–ær÷"ÖFW&–Â÷væW"à ¥F†RW6W.(	—26W&FR6†ææVÂ÷FööÆ&'252—2&÷FV7FVBâ6×VFvR52&VÖ–ç2&÷FV7FVBâfö7W6VBÖFW&–Âõ–çBõVæ6–Âõ6×VFvR÷&VÆV6R6WC¢352òd”ÂâgVÆÂæöFR7V—FS¢2Ã“B52òd”Âò6¶—VBƒƒrãC'2’â6†ævVB¦f67&—B7–çF‚Â&Wf–WvVB'VçF–ÖR–âö†6‚6öçG&7BÂæBv—BF–fbÒÖ6†V6¶72âV&Æ—6†VBBSVCc6366FC†S†Sv6CCƒcƒ–633SSc†“#ƒ²vW2C#ƒs“CSc–æB†÷7FVBF÷öÆöw’&Vw&W76–öâC#ƒs“Cc†7V66VVFVBâÆ—fRô&÷„Æ"ö&VÆV6Rf–ÆW2'—FRÖÖF6‚F†RFW7FVBG&VRâæF—fR6†V6·3¢6öÖ&–æVB6öÆ÷W"´ÖWFÆæW726†F÷w2æBF†RV&Æ–W"Væ6–ÂÖöâ×7W&f6RÖgFW"ÔFöæRf—‚à  ¢22ãC’(	B7G&öævW"ÖWFÆæW726†F÷w2æBVæ6–Â–çBö÷&&—B&V6÷fW'’(	Bæ÷fVÖ&W"##` ¥W6W"&W÷'G2ãC†6öÖ&–æVB6öÆ÷W"´ÖWFÆæW726†F÷r&W6Væ6R52Â'WB6†F÷r7G&VæwF‚Æöö·2&VGV6VBâW6W"Ç6ò&W÷'G2Væ6–Â÷&&—B–â–çB6âÆVfRv—¦Öò&÷FF–öâVçW6&ÆRÂæBgFW"7v—F6†–ær''W6†W2F†RæW‡B7W&f6R7G&ö¶R6â÷&&—B–ç7FVBöb–çBâ&÷FV7BãC‚6†F÷r&W6Væ6RÂ6W&FR–çB6†ææVÇ2÷FööÆ&'2ÂãCrÖWFÂÖöæÇ’6†F÷r52ÂãCb6×VFvR52æBãCR6öÖ&–æVB–çB&V†f–÷"à ¥F†RW†—7F–ær–çB×F&vWBæ§66öÖÖ—GFVBÖFW&–Â÷væW"&—6W2F†RVçf—&öæÖVçBÖf–ÆÂ6g&öÒã3VFòãSV²&÷F‚ÖWFÂÖöæÇ’æB6öÆ÷W"´ÖWFÆæW72&Vw&W76–öç276W'BF†RæWrfÇVRv†–ÆR&W6W'f–ær&÷F‚6†F÷rfÆw2âF†RW†—7F–ærVæ6–ÂvFRæ÷rG&VG27F—fRUb–çBÖW6‚6öçF7G22–çBÖ÷væVBWfVâ–b–çBw27W&f6R†—B6†V6²FV6Æ–æW2F†VÒÂ&WfVçF–ærÖW6‚×FòÖ÷&&—B&öÖ÷F–öâgFW"FööÂ6†ævW2âV×G’Ö&6¶w&÷VæBVæ6–Â÷&&—B&VÖ–ç2&÷WF&ÆRâöâF†R6VÖçF–2÷&&—B6Æ–ÒÂÖ–â6æ6VÇ2ÖF6†–ærG&ç6f÷&Ò×Ww&FRv—¦ÖòvW7GW&RW6–ær—G2W†—7F–ærö–çFW&6æ6VÂ&öÆÆ&6²F‚æB6ÆV'2ÖF6†–ærF÷FÂv—¦ÖòG&ç6–VçB7FFRâæòGWÆ–6FR–çBÂ÷&&—B÷"v—¦Öò÷væW'3²&÷FV7FVB×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3÷cÓã3bããVæ6†ævVBà ¤FFVBVæ6–ÂÖv—¦ÖòÖ÷&&—B×&V6÷fW'’ÓC’çFW7BæÖ§6²W‡æFVBF†R÷&–v–æÂFVfW'&VBÖ÷&&—BFW7Bf÷"7F—fR–çBÖW6‚6öçF7G2Â&6¶w&÷VæB÷&&—BæB''W6‚×7v—F6‚&÷WF–ærâÖFW&–Â&Vw&W76–öâæ÷r76W'G2ãSVâ&Wf–WvVB&VÆV6R66†R6Æ÷7W&RæB†6†W2F‡&÷Vv‚6†VÆÂÂ–çBÂ&VæFW"ÂæBW‡÷'B÷væW'2âF†Rf—'7BgVÆÂ'Vâ†BöæRf–ÇW&R&V6W6R6†VÆÂÖ6ö×&—6öâ7F–ÆÂF—7Æ–VBãC†²WFFVB—G2†VF–æröÆVæ6†W"FòãC–æB&WF–æVBãC†Æör6ö×F–&–Æ—G’âfö7W6VBÖFW&–ÂõVæ6–Âöv—¦Öò÷6†VÆÂ÷&VÆV6R6WBC"52òd”Ââf–æÂgVÆÂæöFR7V—FR2Ã“b52òd”Âò6¶—VBƒ#“bã3w2“²6†ævVB¥27–çF‚Â&VÆV6Rö66†R6öçG&7BÂ&÷FV7FVB×VÇF’–âæBv—BF–fbÒÖ6†V6¶72à ¤6öFRöFö726öÖÖ—Bs“sSƒs3F33&F3&Cs#Vf3“&#V66#–&3C&—2öâ÷&–v–âöÖ–æâ†÷7FVBF÷öÆöw’&Vw&W76–öâC#ƒ“S“C#&76VBâvW2'VâC#ƒ“S“C3S–f–ÆVBöâ&÷F‚GFV×G3¢v—D‡V"&VgW6VBFò7&VFRF†RãC–FWÆ÷–ÖVçB&V6W6R&Wf–÷W2ãC†FWÆ÷–ÖVçB4„SVCc6366FC†S†Sv6CCƒcƒ–633SSc†“#ƒ&VÖ–ç2Ö&¶VB–â&öw&W72æB×W7B&R6æ6VÆÆVB÷"f–æ—6‚âÆ—fRfW'6–öâæ§6öæ7F–ÆÂ&W÷'G2ãC†²Fòæ÷B6ÆÂãC–V&Æ—6†VB÷"&VG’f÷"FWf–6RFW7F–ærâF†R6öææV7FVBv—D‡V"–çFVw&F–öâW‡÷6W2æòvW2FWÆ÷–ÖVçB6æ6VÆÆF–öâw&—FR7F–öââæW‡BÂ6æ6VÂö6ÆV"F†B7FÆRvW2FWÆ÷–ÖVçB–âv—D‡V"Â&W'VâvW2f÷"ãC–ÂæBfW&–g’†÷7FVBfW'6–öâö76WG2âFWf–6R66WFæ6Rf÷"7G&öævW"6†F÷r6öçG&7BÂ÷7BÖ''W6‚×7v—F6‚7G&ö¶W2ÂVæ6–Â÷&&—BæBv—¦Öò&÷FF–öâ&VÖ–ç2VæF–ærà ¤DUd”4RãC“¢7GVF–òÖWFÆæW72ÖöæÇ’æB6öÆ÷W"´ÖWFÆæW726†F÷r7G&VæwFƒ²–çBÂ6†ævR''W6†W2Â–çB6V6öæBÖW6‚7G&ö¶S²Væ6–Â&6¶w&÷VæB÷&&—C²&÷FFRF†Rö&¦V7BgFW'v&Bv—F‚F÷FÂv—¦Öòà  ¢22ãS(	B66Æ"ÖFW&–ÂÖÖ&Wf–Ww2(	Bæ÷fVÖ&W"##` ¥W6W"6·2v†WF†W"v†—FR6öÆ÷W"æBÖWFÆæW72—†VÇ27&VFRF†R'&–v‡B&VæB&WVW7G2&÷Vv†æW72ôÖWFÆæW72Öf—6–&–Æ—G’–âF†RÆ–W"&Wf–WrâVF—B6öæf—&×2Ub–çBÆ–W"&÷w2&R6öÆ÷W"÷fW&Æ—3²&÷Vv†æW72æBÖWFÆæW72&R6W&FRö&¦V7BÖÆWfVÂ#‚&W6÷W&6W2âW†—7F–ær%"F—7Æ’fVVG2F†VÒ–æFWVæFVçFÇ’2&÷Vv†æW74ÖæBÖWFÆæW74Öâv†—FRÖWFÆæW72ffV7G2&VfÆV7F–öç2æB6âÆöö²'&–v‡Bv—F‚Æ–v‡B÷v†—FRÆ&VFó²Ö2&Ræ÷BF—&V7FÇ’×VÇF—Æ–VBFövWF†W"âFòæ÷BGVæRF†R&VæFW&W"g&öÒF†—2‡—÷F†W6—2ÆöæRà ¤FFVB&VBÖöæÇ’cL9scBw&—66ÆR&÷Vv†æW72æBÖWFÆæW72Ö&Wf–Ww2Æöæw6–FRF†RW†—7F–ær6öÆ÷W"Æ–W"Æ—7Bâv†—FRö&Æ6²wV–Fæ6R—26†÷vâÂÖ—76–ærÖ26’(	ÄæòÖ(	ÒÂ6æ6†÷G2fÆ—Ubbf÷"F—7Æ’æB&VÖfW&vRFò&W6W'fRF†RW†—7F–ærÆ–W"×F‡VÖ&æ–Â÷&–VçFF–öâ÷&VBÖöæÇ’ÖöFVÂâæòFFÂ†—7F÷'’Â6†F–ær÷"–çF–ærF‚6†ævVBâ&VÆV6R6öÖÖ—BCƒsvf&&cf6&c#FV33fCCvCfSƒv3SvFCSvF6—2öâÖ–ââvW2'VâC#“#3ƒSc–7V66VVFVC²Æ—fRfW'6–öâ—2ãSÂæB66†RÖ'W7FVB–æFW‚æ‡FÖÆÂ–çBT’ö6÷&RÂÆ–W"ÖÆ—7BÂ6†VÆÂÖ6ö×&—6öâæB'VçF–ÖR76WBÖæ–fW7B'—FRÖÖF6‚F†R6öÖÖ—GFVBG&VRâ†÷7FVBF÷öÆöw’&Vw&W76–öâC#“#3ƒs†—27F–ÆÂ–â&öw&W72âWFöÖFVBFW7G2vW&Ræ÷B'Vâ÷"FFVBÆö6ÆÇ’–âF†—27FvRâ6VRF÷öbDU5Eô4„T4´Ä•5BæÖFf÷"•BÖ–ç7V7F–öâæBVæF–ærãC––çFW&7F–öâ6†V6·2à  ¢22ãS(	B&VÆV6R–FVçF—G’æB76WBÖ6öçG&7B&W—"(	Bæ÷fVÖ&W"##` ¤†÷7FVBãSF÷öÆöw’&Vw&W76–öâC#“#3ƒs†6ö×ÆWFVB2Ã“252ò2d”ÂâF†Rf–ÇW&W2vW&RÖWFFFG&–gC¢F—7Æ6VÖVçB×&Wf–WrÖvFRÓCçFW7BæÖ§67F–ÆÂW‡V7FVBãC–ÂF†R7&2÷f–Ww÷'B×–çBæ§6&Wf–WvVB†6‚v27FÆRÂæB–æFW‚æ‡FÖÆ7F–ÆÂ66†R×–ææVB&VÆV6R×fW'6–öâæ§6BãC–âF†RÆ—fRãSFWÆ÷–ÖVçB—G6VÆb7V66VVFVB†C#“#3ƒSc–²fW'6–öâæ§6öæ&W÷'FVBãS’à ¦ãSWFFW2F†R7W'&VçB&VÆV6RÖ&¶W"Â6†VÆÂÖ6ö×&—6öâ–FVçF—G’÷–âÂF—&V7B&VÆV6R×fW'6–öâ66†R–âÂ&W6W'fVB&VÆV6R76W'F–öâÂæB'VçF–ÖR76WB6öçG&7B†6†W2â—BFöW2æ÷B6†ævR–çB&V†f–÷"÷"F†R&÷Vv†æW72ôÖWFÆæW72&Wf–Wr–×ÆVÖVçFF–öââ6öFR6öÖÖ—Bc“Ssc3–3CC–FSV#S6SSc“&#scf#C#6—2öâÖ–æâvW2'VâC#“#s33sS7V66VVFVBâÆ—fRfW'6–öâæ§6öæ&W÷'G2ãS²66†RÖ'W7FVB–æFW‚æ‡FÖÆÂ6†VÆÂÖ6ö×&—6öâæ§6Â&VÆV6R×fW'6–öâæ§6ÂæB'VçF–ÖR76WBÖæ–fW7BÖF6‚F†R6öÖÖ—GFVBG&VRâ†÷7FVBF÷öÆöw’C#“#s3Ccf—27F–ÆÂ–â&öw&W72âæòÆö6ÂFW7G2vW&R'Vâ÷"FFVC²v—BF–fbÒÖ6†V6¶76VBâWFFRF†—2VçG'’v†Vâ†÷7FVB&Vw&W76–öâ6ö×ÆWFW2à  ¢22ãS"(	B&VÆV6Rö66†R6Æ÷7W&R&W—"(	Bæ÷fVÖ&W"##` ¤†÷7FVBãSF÷öÆöw’'VâC#“#s3Ccf6ö×ÆWFVB2Ã“B52ò"d”ÂâöæRf—‡GW&R†VÆB7FÆR†6‚f÷"7&2÷–çBÖÆ–W"ÖÆ—7Bæ§6²F†R6æöæ–6ÂÖÆöFW"6†V6²6†÷vVB–æFW‚æ‡FÖÆÆöF–ær&VÆV6R×fW'6–öâæ§6BãSv†–ÆR7&2öf6R×v÷&¶fÆ÷rÖÆ–÷WBæ§67F–ÆÂÆöFVB—BBãC–â'V×F†RWFFVBf6Rv÷&¶fÆ÷rÖöGVÆRæB—G2G&vW"×V–&VçB66†R–âFövWF†W"â&W6W'fRÆöw2f÷"ãSæBãS–âF†R6†VÆÂ6ö×&—6öâ6ö×F–&–Æ—G’Æ—7Bà ¦ãS&Æ–vç2F—&V7BöæW7FVB&VÆV6R×fW'6–öâ66†R–ç2ÂWFFW2&VÆV6R÷6†VÆÂ–FVçF—G’æB'VçF–ÖR76WB†6†W2ÂæBf—†W2F†R&W6W'fVB&VÆV6R76W'F–öââæò–çB&V†f–÷"÷"Ö×&Wf–Wr–×ÆVÖVçFF–öâ6†ævW2â6öFR6öÖÖ—BVS#6f“fFCs“V&&c“fCCƒVcC3†3ƒ†3#“33vf—2öâÖ–æ²vW2C#“3#C3Cv7V66VVFVBÂÆ—fRãS&—2fW&–f–VBÂæB66†RÖ'W7FVB–æFW‚÷6†VÆÂôf6Rv÷&¶fÆ÷r76WG2ÖF6‚â†÷7FVBF÷öÆöw’C#“3#C3cƒ†—2'Vææ–ærâæòÆö6ÂFW7G2vW&R'Vâ÷"FFVC²v—BF–fbÒÖ6†V6¶76VBà  ¢22ãS2(	Bf6Rv÷&¶fÆ÷r66†R6Æ÷7W&R(	Bæ÷fVÖ&W"##` ¤†÷7FVBãS&F÷öÆöw’&Vw&W76–öâC#“3#C3cƒ†6ö×ÆWFVB2Ã“252ò2d”Ã¢G&vW"×V’æ§67F–ÆÂ–×÷'FVBf6R×v÷&¶fÆ÷rÖÆ–÷WBæ§6BãCFv†–ÆR—G2&Wf–WvVB6öçG&7BW‡V7FVBãS&âF†—26W6VBF†R÷fW&ÆÂ'VçF–ÖRÖ76WB&VfW&Væ6R6†V6²Â6æöæ–6Â&VÆV6R×fW'6–öâÖÆöFW"6†V6²ÂæBf6RÆ–÷WB66†RÖ†÷6†V6²Fòf–ÂâF†RV&Æ–W"f–ÇW&W2vW&R&öö¶¶VW–ær÷–â6Æ÷7W&RÂæ÷B&W÷'FVB–çB&V†f–÷"&Vw&W76–öç2à ¦ãS6WFFW2F†R7GVÂG&vW"×V’æ§66†–ÆB–×÷'BæB†6‚Â¶VW2—G2–æFW‚66†R¶W’Æ–væVBÂ&WF–ç2ÖF6†–ærF—&V7BöæW7FVB&VÆV6R×fW'6–öâæ§6–ç2ÂWFFW2&VÆV6RÖ&¶W'2ÂæB&W6W'fW2ãS(	6ãS&6†VÆÂÆöw2âÖ×&Wf–Wr–×ÆVÖVçFF–öâ—2Væ6†ævVBâæòÆö6ÂFW7G2vW&R'Vâ÷"FFVC²v—BF–fbÒÖ6†V6¶76VBâ6öÖÖ—BS“fcV&33s3#““&f6#6c#SC“vcS““C–FV—2öâÖ–æ²vW2C#“3cSS†7V66VVFVBæBÆ—fRãS6–æFW‚ÂG&vW"×V’Âf6Rv÷&¶fÆ÷rÂ6†VÆÂÖ6ö×&—6öâæB'VçF–ÖR76WBÖæ–fW7BÖF6‚â†÷7FVBF÷öÆöw’C#“3cSSƒF—27F–ÆÂ'Vææ–ærà  ¢22ãSB(	B&VÆV6RF—7Æ’ö76W'F–öâÆ–væÖVçB(	Bæ÷fVÖ&W"##` ¤†÷7FVBãS6F÷öÆöw’6ö×ÆWFVB2Ã“B52ò"d”ÂâF—7Æ6VÖVçB×&Wf–WrÖvFRÓCçFW7BæÖ§67F–ÆÂW‡V7FVBF†RãS&6†VÆÂ6ö×&—6öâ–âÂæB6†VÆÂÖ6ö×&—6öâw2F—FÆRÂÆVæ6†W"æB†VÇFW‡B7F–ÆÂF—7Æ–VBãS&âF†R'VçF–ÖRãS66†VÆÂ–FVçF—G’æBÆ—fR76WG2vW&R6÷'&V7C²F†W6RvW&R7FÆR&VÆV6RÖf6–ær&VfW&Væ6W2à ¦ãSFÆ–vç2F†÷6R7G&–æw2ö76W'F–öç2v—F‚F†R&VÆV6RÖ&¶W"v†–ÆR&W6W'f–ærãS(	6ãS66ö×&—6öâÖÆör66WFæ6Râ66†R–ç2æB'VçF–ÖRf—‡GW&R†6†W2&RWFFVBf÷"F†R6†ævVB6†VÆÂÂf6Rv÷&¶fÆ÷ræBG&vW"6†–ââÖ×&Wf–Wr&V†f–÷"—2Væ6†ævVBâæòÆö6ÂFW7G2vW&R'Vâ÷"FFVC²v—BF–fbÒÖ6†V6¶76VBâ6öÖÖ—Bƒƒ–#V##c#CV6Cc&3†&cCV#ƒƒ3ccsf—2öâÖ–æ²vW2C#“CƒS#7V66VVFVC²Æ—fRãSFÖ&¶W"Â–æFW‚÷6†VÆÂö76WBÖÖæ–fW7BÖF6‚Ö–æâ†÷7FVBF÷öÆöw’C#“CƒSs#†76VBÆÂ2Ã“bFW7G2ƒf–ÆVB’âFWf–6R66WFæ6R&VÖ–ç2VæF–ærà ¢22ãSR(	B6öÖ&–æVBÖÖ6†F÷ræBVæ6–Âôv—¦Öò&V6÷fW'’(	Bæ÷fVÖ&W"##` ¥W6W"&W÷'G2Ö&Wf–Ww2æBÆ—fR&Wf–WrWFFW252‡&÷FV7FVB’Âv†–ÆR6†F÷r6öçG&7Bv—F‚6öÆ÷W"Ö2Â''W6‚×7v—F6‚×FòÖ÷&&—B&÷WF–æræB6ö×ÆWFRF÷FÂv—¦Öòf—6–&–Æ—G’gFW"Væ6–Â÷&&—Bd”ÂâÖWFÆæW72ÖöæÇ’6†F÷r&VÖ–ç252â6öFR&W7F÷&W2F†R&–÷"ã3VVçf—&öæÖVçB6f÷"6öÖ&–æVB6öÆ÷W"´ÖWFÆæW72v†–ÆR&WF–æ–ærãSVf÷"ÖWFÂÖöæÇ“²Ub–çBW‡÷6W2—G2WF†÷&—FF—fRW†7B†—BFW7B6òVæ6–ÂÖW6‚6öçF7G26ææ÷BW66RFò÷&&—D6öçG&öÇ2gFW"''W6‚6†ævW3²÷&&—BF¶V÷fW"6æ6VÇ2F†R7W'&VçFÇ’7F—fRv—¦Öòö–çFW"F‡&÷Vv‚F†RG&ç6f÷&Ò÷væW"æB&W6WG2ÆÂG&ç6–VçB†æFÆW2à ¤æòÆö6ÂFW7G2vW&R'Vâ÷"FFVBâF†R&VÆV6Rö66†R6Æ÷7W&RæB'VçF–ÖRf—‡GW&R†6†W2vW&R&Vg&W6†VBâF†R'V–ÆB&VÖ–ç27V&¦V7BFòW6‚ÂvW2öÆ—fR76WBfW&–f–6F–öâæB†÷7FVBF÷öÆöw’&Vw&W76–öâ&Vf÷&RFWf–6RFW7F–ærâ7FæF–ærW6W"WF†÷&—¦F–öâÆ–W2FòV6‚&÷„Æ"&VÆV6R×7FvRW6‚æBV&Æ–6F–öã²Fòæ÷B6²v–âà ¦ãSVFWÆ÷–ÖVçBæ÷FS¢vW2C#“cCcƒCƒ†7V66VVFVC²Æ—fRãSVÖ&¶W"ÇW266†RÖ'W7FVB–æFW‚Â–çBF&vWBõT’ÂVæ6–ÂvFRÂÖ–âÂ&VæFW"ÖöFW2æB6†VÆÂ6ö×&—6öâÖF6‚Ö–æâ†÷7FVBF÷öÆöw’C#“cCcƒscv&W÷'FVB2Ã“R52òd”Ã¢'VçF–ÖRÖ76WBÖ6öçG&7B–æ6ÇVFVBâöffÆ–æRWfÇVF–öâÖ÷væW"&VfW&Væ6RFòW‡÷'BÖ2×æVÂæ§6BãSVÂF†÷Vv‚WfÇVF–öç2÷Wb×–çBöÆ"æ§6&VÖ–ç26÷'&V7FÇ’–ææVBFòã3–â&W7F÷&RF†Bf—‡GW&RU$ÂFòã3–æB&W'VâF÷öÆöw“²æòÆ–6F–öâ6÷W&6R6†ævR—2æVVFVBf÷"F†—2&öö¶¶VW–ær6÷'&V7F–öâà ¥F†RföÆÆ÷r×W6öçG&7BÖöæÇ’6öÖÖ—B6C3s&–C#FcV#†F–CSƒV6S“sc&F6S#†C6&W7F÷&W2F†RöffÆ–æRWfÇVF–öâ&VfW&Væ6RFòã3–âvW26÷'&V7F–öâ&VFWÆ÷’C#“c““33F7V66VVFVC²Æ—fRãSVfW'6–öâÖ&¶W"Â–æFW‚æB6†ævVB'VçF–ÖR76WG2&VÖ–â'—FRÖ–FVçF–6ÂFòF†R&VÆV6R6öÖÖ—Bâ†÷7FVBF÷öÆöw’C#“c““C&76VB2Ã“bò2Ã“bâF†RöæRf–Æ–ær6öçG&7B76W'F–öâv2&öö¶¶VW–æröæÇ“²æò–çB'VçF–ÖR6÷W&6R6†ævRv2æVVFVBâFWf–6R66WFæ6R&VÖ–ç2VæF–ærà  ¢22ãSb(	B7–æ6‡&öæ—¦RF÷FÂv—¦Öò&ö¦V7F–öâv—F‚Væ6–Â÷&&—B(	Bæ÷fVÖ&W"##` ¥W6W"6Æ&–f–W2F†Rv—¦ÖòF—7Æ6VÖVçBö67W'2v†–ÆR÷&&—F–ærGW&–ær–çBFW7F–æs²''W6‚6†ævW2†B&V6VFVB6–Ö–Æ"&W÷'G2âVF—B6öæf—&×2F†RW†—7F–ær''W6‚6†ö÷6W"6†ævW2F†R6VÆV7FVB–çB7F–öâæB6æ6VÇ2ç’–âÖfÆ–v‡B7G&ö¶S²—BFöW2æ÷BÖ÷fRF†RÖW6‚÷"ö&¦V7B÷&–v–ââVæ6–Â÷&&—B—2&÷WFVB'’F†RW†—7F–ærvFRÂæBF†RF÷FÂv—¦Öò6öçF–çV÷W6Ç’&ö¦V7G2F†R6VÆV7FVBö&¦V7Bw26VçG&R–â—G2÷vâæ–ÖF–öâÖg&ÖR÷væW"âF†R6ÖW&&ö¦V7F–öâFWVæG2öâÖG&—…v÷&ÆD–çfW'6VÂv†–6‚F‡&VRæ§2&Vg&W6†W2GW&–ær&VæFW&–æs²F†R–æFWVæFVçBv—¦Öòg&ÖR6÷VÆB6×ÆR&Vf÷&RF†B&Vg&W6‚æBW6RF†R&Wf–÷W2÷&&—Bf–Wrà ¤æ'&÷r&W—#¢7&2÷F÷FÂÖv—¦Öòæ§66ÆÇ26ÖW&çWFFTÖG&—…v÷&ÆB‡G'VR–&Vf÷&R&ö¦V7F–ærF†Rv—¦Öòæ6†÷"æB—G2†—2÷&–ærf—7VÇ2âæòæWrvW7GW&RÂÖöFVÆÆ–ærÂ–çBÂ—f÷B÷"G&ç6f÷&Ò÷væW"âF—&V7B66†R–ç2f÷"F÷FÂv—¦ÖòæBF†R&VÆV6R6ö×&—6öâ6†VÆÂ&R&Vg&W6†VC²&Wf–WvVB76WB†6†W2æBF†R&W6W'fVBãC&VÆV6R76W'F–öâföÆÆ÷rãSfâ&÷FV7FVB7&2ö×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3÷cÓã3bãã&VÖ–ç2Væ6†ævVBà ¤æòÆö6ÂFW7G2vW&RFFVB÷"'Vââ†÷7FVBF÷öÆöw’æBvW2öÆ—fRfW&–f–6F–öâ&RVæF–ærâFWf–6R66WFæ6R—2VæF–æs²Fòæ÷B6Æ–Òf—‚VçF–ÂVæ6–Â÷&&—Bv†–ÆR–çB—27F—fRÆVfW2F†Rv—¦Öòæ6†÷&VBGW&–æræBgFW"÷&&—BÂæBF†RgVÆÂv—¦Öò&VÖ–ç2W6&ÆRgFW"FöæRâÖ&Wf–Ww2öÆ—fRWFFW2Â6W&FRÖFW&–Â6†ææVÇ2÷FööÆ&'2Â6×VFvRÂæB&Wf–÷W2–çB&V†f–÷"&VÖ–â&÷FV7FVBà  ¢222ãSb†÷7FVB4’6÷'&V7F–öà ¤f—'7BvW2FWÆ÷–ÖVçB7V66VVFVBÂ'WBF÷öÆöw’C33#“s#Cvf–ÆVB3B6†V6·3¢32W†—7F–ær6VÆV7F–öâÖ‡V"FW7B†&æW76W2ÖöFVÂöæÇ’F†R6ÖW&f–VÆG2F†W’6öç7VÖRÂ6òF†RVæ6öæF—F–öæÂWFFR6ÆÂF‡&Wrv†VâF†B÷F–öæÂF‡&VRæ§2ÖWF†öBv2'6VçC²öæR&W6W'fVB&VÆV6RÖ÷væW"76W'F–öâf÷VæBF†RF—&V7B&VÆV6R×fW'6–öâæ§6U$Â7F–ÆÂ–ææVBFòãSVâÖFRF†RÖG&—‚&Vg&W6‚÷F–öæÂ†6ÖW&çWFFTÖG&—…v÷&ÆCòâ‡G'VR–“¢&VÂF‡&VRæ§26ÖW&27F–ÆÂ&Vg&W6‚ÂæBÖ–æ–ÖÂ†&æW76W2&WF–â&–÷"&V†f–÷"âWFFVBF†RF—&V7B&VÆV6R×fW'6–öâ–âæB&Wf–WvVBf—‡GW&R&VfW&Væ6RFòãSfâF†—26F6†W2Gvò—77VW2F†Bv÷VÆB†fR&VVâÖ—76VB'’6÷W&6RÖöæÇ’&Wf–Wrâ&W'Vâ†÷7FVB&Vw&W76–öâæBvW2&Vf÷&RÖ&¶–ærãSfFW7B×&VG’à ¦ãSf†÷7FVB6÷'&V7F–öâföÆÆ÷r×W¢'VâC33cCsƒV&W÷'FVB2Ã“252ò2d”ÂâF†R&VÖ–æ–ærf–ÇW&W2&R6öçG&7B&öö¶¶VW–æs¢F†R&Wf–WvVBF÷FÂv—¦Öò†6‚v27FÆRÂF†R6æöæ–6ÂÆöFW"FW7Bf÷VæB7&2öf6R×v÷&¶fÆ÷rÖÆ–÷WBæ§67F–ÆÂ–ææVBFò&VÆV6R×fW'6–öâãSVÂæBF†RF÷FÂv—¦Öò7F×76W'F–öâ&VG2F†B7FÆR†6‚âF†R÷F–öæÂ6ÖW&&Vg&W6‚&VÖ–ç2F†RöæÇ’'VçF–ÖR&V†f–÷"6†ævRâWFFVBF†RæW7FVB&VÆV6R×fW'6–öâ–âFòãSfæB&Vg&W6†VB&Wf–WvVB&VfW&Væ6W2f÷"f6R×v÷&¶fÆ÷rÖÆ–÷WBæ§6æBF÷FÂÖv—¦Öòæ§6âF÷öÆöw’&W'VâæBvW2öÆ—fRfW&–f–6F–öâVæF–æs²æòÆö6ÂFW7G2'Vâà  ¦ãSfÆöFW"Ö†÷föÆÆ÷r×W¢†÷7FVBF÷öÆöw’C3CCSc“&W÷'FVB2Ã“252ò2d”Â&V6W6R7&2öG&vW"×V’æ§67F–ÆÂ–×÷'FVBF†Rf6RÆ–÷WBv—F‚ãSV²—G2&Wf–WvVB66†RU$ÂæB—G2÷vâ6†VÆÂ–âvW&R7FÆRâWFFVBF†RG&vW"w2f6RÖÆ–÷WB–×÷'BæB–æFW‚G&vW"66†R–âFòãSfÂæB&Vg&W6†VBF†RffV7FVB&Wf–WvVB†6†W2âF†R&–÷"æW7FVB&VÆV6R×fW'6–öâ–âæ÷rföÆÆ÷w2F†R7W'&VçBÆ–÷WBÖöGVÆRâ&R×'Vâ†÷7FVBF÷öÆöw’æBvW2gFW"F†—26÷'&V7F–öã²FWf–6R66WFæ6R&VÖ–ç2VæF–ærà  ¦ãSfÆöFW"6öçG&7BföÆÆ÷r×W¢F÷öÆöw’C3C“ƒƒc3f6ö×ÆWFVBv—F‚2Ã“R52òd”ÂâF†R&VÖ–æ–ærf–ÇW&R—27FÆR&Wf–WvVBU$Âf÷"F†Rf6RÖÆ–÷WB÷væW"w2æW7FVB&VÆV6R×fW'6–öâæ§6–×÷'BÂæ÷r6÷'&V7FVBFòãSf²æò'VçF–ÖR&V†f–÷"6†ævRv2–æF–6FVBâæWr†÷7FVB'Vâ—2VæF–ærâF†RGF6†VBFWf–6R&V6÷&F–ær6†÷w2F†Rv—¦ÖòF—7Æ6VBg&öÒF†R7V&R–ÖÖVF–FVÇ’gFW"FöæRÂ&Vf÷&RF†RæW‡B–çB72Â6ò66WFæ6R×W7B7V6–f–6ÆÇ’fW&–g’F†RFöæ^(i%Ub–çB&RÖVçG'’6WVVæ6Rv—F‚6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW72âF†R6ÖW&Ö÷&&—B&Vg&W6‚ÆöæR—2æ÷B66WFVB2gVÆÂf—‚VçF–ÂF†B6WVVæ6R76W2öâFWf–6Rà  ¢222ãSf†÷7FVB7FGW2æBFWf–6RWf–FVæ6P ¤f–æÂF÷öÆöw’'VâC3SCc#“3–76VB2Ã“bò2Ã“bâvW2'VâC3SCc#Cf7V66VVFVBâÆ—fR&VÆV6RÖ&¶W"—2ã3bã‚ãSf²FWÆ÷–VB–æFW‚æ‡FÖÆ…4„Ó#SbcCSƒsV6#S&VcvCScc&SV&6&#Cs#“63V&&V3#–#s##6SCS#s#†C6’ÂF÷FÂv—¦Öò†6FFc6C“vS3&fC6fCF#†#“SfSS3&FSccC†Cc6S#Sv&c#–Sf#ƒcS“’ÂG&vW"T’†Sfcc–&#ƒ3C–C3C3s6C66CV3FF6CS3cVcsS“ƒ#&c3v&3–#C“sCsvVS&fV’æBf6RÆ–÷WB†Sv3SƒfC##†&&““F†CV3C6##cC“#“cV&3s63S#S“#63–VcƒVf33“Cs–C†’ÖF6‚F†R&VÆV6RG&VRâF†R7WÆ–VB&V6÷&F–ær6†÷w2F†Rv—¦Öòöfg6WB–ÖÖVF–FVÇ’gFW"FöæRf÷"×VÇF’Ö6†ææVÂ–çBÂ&Vf÷&Ræ÷F†W"÷&&—C²F†R6ÖW&ÖG&—‚&Vg&W6‚—2F†W&Vf÷&Ræ÷BFWf–6RÖ66WFVB2gVÆÂ&W—"âF†RW†7B6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW72Föæ^(i'&RÖVçFW.(i'–çBfÆ÷r&VÖ–ç2÷Vâf÷"F†RæW‡Bæ'&÷r'V–ÆBâ6öÆ÷W"ÖöæÇ’FöæR÷&RÖVçG'’æB–çBÖ2÷FööÇ256W2&VÖ–â&÷FV7FVBâæòÆö6ÂFW7G2vW&R'Vâà  ¢22ãSr(	B¶VWF†RVF—F÷"6ÖW&WF†÷&—FF—fR(	B"æ÷fVÖ&W"##` ¥&WVFVBW6W"d”Ã¢×VÇF’Ö6†ææVÂ6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW72–çB(i"FöæR(i"&RÖVçFW"F—7Æ6W2v—¦ÖòæBGW&ç2–çB6öçF7G2–çFò÷&&—Bâ6öÆ÷W"ÖöæÇ’&RÖVçG'’—2&÷FV7FVB52â&ö÷B6W6Rf÷VæB–â'&–FvR×F÷öÆöw’æ§6¢vÆö&ÂW'7V7F—fT6ÖW&çWFFU&ö¦V7F–öäÖG&—‚ö'6W'fW"÷fW'w&÷FR'&–FvRæ6ÖW&f÷"WfW'’W'7V7F—fR6ÖW&âÖWFÆÆ–2Õ$TÒvVæW&F–öâ6öç7G'V7G2—G2÷vâW'7V7F—fT6ÖW&Â7FVÆ–ærF†RVF—F÷"6ÖW&&VfW&Væ6RW6VB'’v—¦Öò&ö¦V7F–öâæB–çF–ær&–67G2âÖ–âÇ&VG’V&Æ—6†W26ÖW&æB÷&&—D6öçG&öÇ2FövWF†W"âö'6W'fW"æ÷r66WG2&ö¦V7F–öâWFFW2öæÇ’g&öÒ6öçG&öÇ2æö&¦V7Böæ6R6öçG&öÇ2W†—7C²7F'GWfÆÆ&6²&VÖ–ç2âW†—7F–ærÖöFVÆÆ–ærÂ–çBÂÕ$TÒæBG&ç6f÷&Ò÷væW'2&WF–æVBâF†RãSbÖG&—‚&Vg&W6‚ÆöæRF–Bæ÷B&W—"F†—26ÖW&–FVçF—G’fVÇBà ¥&Vw&W76–öâW6W2&VÂF‡&VRæ§2W'7V7F—fR6ÖW&27&÷72F‡&VR&VfÆV7F–öâö6ÆöæR7–6ÆW2æB6öæf—&×2F†R'&–FvR&WF–ç2VF—F÷"–FVçF—G’âfö7W6VB6ÖW&÷&VÆV6Rö&ö÷G7G&6†V6·3¢3r53²ÖFW&–Â–çF–ær÷&VfÆV7F–öç2ö÷&&—B6†V6·3¢R52âgVÆÂÆö6Â7V—FRVæFVBv—F†÷WBf–æÂ7VÖÖ'’gFW"&W÷'F–æröæR&ö÷G7G&66†R×–â76W'F–öã²F†B–âv26÷'&V7FVBæB—G2fö7W6VBFW7G2&W'Vâ7V66W76gVÆÇ’âæògVÆÂ×7V—FR526Æ–ÖVC²†÷7FVB&Vw&W76–öâæBFWÆ÷–ÖVçBVæF–ærâ&÷FV7FVB×VÇF“ãVæ6†ævVBâFWf–6R66WFæ6RVæF–æs¢×VÇF’Ö6†ææVÂ–çB(i"FöæR(i"&V÷Vâ(i"–çC²7v—F6‚''W6†W2æBVæ6–Â÷&&—C²&WVBF‡&VRF–ÖW3²6†V6²6öÆ÷W"ÖöæÇ’Â&Wf–Ww2æB6†F÷w2à  ¦ãSvV&Æ–6F–öã¢'VçF–ÖR6öÖÖ—Bc“FSC#vC3c–6VC3#C6CS3C&f#“&F3sCC6²vW2C3ƒC“37V66VVFVBâ66†RÖ'W7FVBÆ—fRfW'6–öâæ§6öâ&W÷'G2ãSv²–æFW‚æB'&–FvR×F÷öÆöw’æ§2ÖF6‚Æö6Â4„Ó#Sb†'&–FvRV–3S#c3–V#c&&Cv33c#3S&VC#ƒ“c#s“Sv3cc–Cv6ScCSSs3vc6’â÷&–v–æÂö'6W'fW"v2W†V7WFVB6W&FVÇ’æB&W&öGV6VB&WÆ6VÖVçB'’F†R&VfÆV7F–öâ6ÖW&²&W—&VB&Vw&W76–öâ&WF–ç2VF—F÷"6ÖW&â†÷7FVBF÷öÆöw’C3ƒC—2VæF–ærâFWf–6R66WFæ6R&VÖ–ç2VæF–ærf÷"&WVFVB×VÇF’Ö6†ææVÂ–çB(i"FöæR(i"&V÷Vâ(i"–çBæBVæ6–Â÷&&—Bâ6öÆ÷W"ÖöæÇ’&RÖVçG'’52&÷FV7FVBà ¢22ãS‚(	B&F–ÂÖFW&–ÂW6W2F†Rv÷&¶–ær''W6‚VçG'’(	B"æ÷fVÖ&W"##` ¥W6W"52&÷FV7G2ãSrVF—F÷"Ö6ÖW&÷væW'6†—&W—"Â×VÇF’Ö6†ææVÂFöæR÷&RÖVçG'’æBÆ–væVBv—¦ÖòâæWr&W6–GVÂd”Ã¢÷Væ–ærÖFW&–Âg&öÒF†R–çB&F–ÂÂ6†æv–ær6öÆ÷W"F†Vâ–çF–ærÖ¶W2öæR&Æö"æB&V6öÖW2Vç&W7öç6—fRVçF–ÂFöæR÷&V÷Vââ6VÆV7F–ær''W6‚&Vf÷&R6†æv–ær6öÆ÷W"v÷&·2âVF—C¢&F–ÂÖFW&–ÂF—&V7FÇ’6ÆÆVB6†÷tÖFW&–ÄÖVçRÂ'—76–ærF†R''W6‚7F–öâ6†ævRF†B6ÆV'2–ÖvR7FvRÂ6æ6VÇ27G&ö¶Rö6GW&RæB7–æ6‡&öæ—¦W2FööÂöf–ÆÂ7FFRâ&F–ÂÖFW&–Âæ÷r6ÆÇ2F†R6ÖR6VÆV7E–çEFööÂ‚w–çBr’÷væW"2''W6‚â†VFW"ÖFW&–Â7F–ÆÂVF—G2F†R7W'&VçBFööÂw2ÖFW&–Â6WGF–æw2âæòæWr–çB÷"æf–vF–öâ÷væW"à ¥&Vw&W76–öâW†V7WFW2F†R&VÂT“¢f–ÆÎ(i$ÖFW&–Â&W&W2''W6ƒ²ÖFW&–Â6æ6VÇ27FÆR7F—fRVæ6–Â6öçF7C²6öÆ÷W"VF—G2ÇW2GvòÖ÷f–ærÖWFÆÆ–27G&ö¶W26öÖÖ—B6W&FVÇ’v—F‚6öçG&öÇ2&W7F÷&VBæB–çB7F—fRâfö7W6VB–çBö6ÖW&÷&VÆV6R6†V6·3¢3R53²&ö÷G7G&ö66†R÷&VÆV6R6†V6·3¢3b52gFW"&W6W'f–ærF†RVæ6†ævVBÖöFVÆÆ–ær&ö÷G7G&66†R¶W—2âgVÆÂ×7V—FR&W7VÇBVæF–æs²—G2f—'7B726Vv‡BF†B66†RÖ¶W’Ö—6ÖF6‚&Vf÷&RF†R6÷'&V7F–öââFWf–6S¢&F–ÂÖFW&–Î(i&6†ævR6öÆ÷W.(i'–çB6öçF–çV÷W27G&ö¶W2v—F‚ÖWFÆæW72Â&WVC²F†Vâ6†V6²''W6‚ÂFöæR÷&V÷VâæBv—¦ÖòâãSr†÷7FVBF÷öÆöw’†B2Ã“b52òd”Âg&öÒöÆBãSbf—6–&ÆR6ö×&—6öâÆ&VÇ3²ãS‚Æ–vç2F†÷6Rf—6–&ÆRÆ&VÇ2v—F‚F†R7GVÂ&VÆV6RâV&Æ–W"FWf–6R52—2&÷FV7FVBÂæ÷B–æfW'&VBg&öÒ4’à  ¦ãS†V&Æ–6F–öâfW&–f–VC¢'VçF–ÖR6öÖÖ—B3Cƒ3“&C“SsVFS6CcVCV#Sƒ–6&33†6C3F6C–â†÷7FVBF÷öÆöw’C3ƒƒ#“#–76VB2Ã“‚ò2Ã“‚âvW2C3ƒƒ#CF7V66VVFVC²Æ—fRãS†Ö&¶W"Â–æFW‚æBf–Ww÷'B×–çBæ§2ÖF6‚F†R&VÆV6R6÷W&6RâFWf–6R66WFæ6RVæF–ærf÷"&F–ÂÖFW&–Â6öÆ÷W"6†ævW2æB&WVFVBÖWFÆæW727G&ö¶W2â–çBT’4„Ó#SbSv66CS3F#&CFCf6S3#V363fS3FV&#S“f#CVf#“†CsSv†cssC–F#“sc“f²6†VÆÂ4„Ó#Sb†&F&#3C#cs†csc–3–63c&6#sVc“Cs–S“–3cC†&fcF#s“ƒFF3CS33vffâW6W"ãSr52&VÖ–ç2&÷FV7FVBà ¢22ãS’(	B–çB6öçF7B&V6÷fW'’gFW"ÖFW&–Â6öÆ÷W"VF—F–ær(	B"æ÷fVÖ&W"##` ¥W6W"d”ÂöâãSƒ¢7F–ÆÂöæRF"föÆÆ÷vVB'’Æö6²×WâFòæ÷B&÷FV7BãS‚266WFVC²—G2ÖVçRWV—fÆVæ6RFW7Bv2–ç7Vff–6–VçBFò6÷fW"æF—fRö–çFW"FVÆ—fW'’âãSr6ÖW&ôFöæR×&RÖVçG'’52&VÖ–ç2&÷FV7FVBà ¤VF—BöbF†RW†—7F–ærf–Ww÷'B×–çBö–çFW"÷væW"f÷VæC¢&WF–æVB6öçF7B6W6W2ÆÂÆFW"ö–çFW&F÷vâWfVçG2Fò&R7vÆÆ÷vVC²÷6—F—fR×&W77W&RVâÖ÷fVÖVçB—2&V¦V7FVB6öÆVÇ’f÷"'WGFöç3Ó²–çFVçF–öæÂ&VÆV6R6ÆV'26öçF7BöæÇ’gFW"6ÆÆ–ær&VÆV6Uö–çFW$6GW&S²F†RæF—fR6öÆ÷W"6öçG&öÂ6â&WF–âfö7W22F†R7G&ö¶R&Vv–ç2â&W—"v—F†–âF†B÷væW#¢g&W6‚Væ6–ÂF÷vâ6æ6VÇ2âVæf–æ—6†VB&Wf–÷W26öçF7C²6ÆV"7F÷&VB6öçF7B&Vf÷&R&VÆV6–ær6GW&S²66WB&W77W&R×÷6—F—fRÖ÷fW2ö6öÆW66VB6×ÆW2WfVâv†Vâ'WGFöç3Ó²&ÇW"fö7W6VBÆWGFR–çWB&Vf÷&R&Vv–ææ–ærF†R7G&ö¶S²6GW&RF†Rf–Ww÷'B&Vf÷&R†–F–ærF†RÆWGFRâW†—7F–ær7G&ö¶R6æ6VÆÆF–öâÂ&öÆÆ&6²Â†—7F÷'’ÂF÷V6‚÷ÆÒæB÷&&—B÷væW'2&WF–æVBà ¥&Vw&W76–öâW†V7WFW2F†RT’v—F‚Ö—76VBö–çFW'WÂ7–æ6‡&öæ÷W2Æ÷7Gö–çFW&6GW&Röâ–çFVçF–öæÂ&VÆV6RÂæF—fRÖ–çWB&ÇW"6ÆÆ&6²æB&W77W&R×÷6—F—fRö'WGFöç2×¦W&ò6öÆW66VBÖ÷fVÖVçBâ—BfW&–f–W2Ö÷f–ærG&–ÂW†6VVG2F"Â&WVFVBÖWFÆÆ–27G&ö¶W26öÖÖ—BÂ6öçG&öÇ2&W7F÷&RæB–çB&VÖ–ç27F—fRâF†W6R&W&öGV6R6öFRÖÆWfVÂf–ÇW&R66W2Âæ÷B6öæf—&ÖVBG&6Röb•BæF—fR6öÆ÷W"×–6¶W"WfVçG2âf–æÂfö7W6VB'Vã¢cb52òd”Â7&÷72ö–çFW"&V6÷fW'’Â&F–ÂÖFW&–ÂÂ–çBFööÇ2ö6†ææVÇ2ÂVæ6–Â&W77W&RÂ6ÖW&÷væW'6†—Â&VÆV6R6öçG&7G2Â6ö×&—6öâT’æB6†&VB&ö÷G7G&FW7G2â†÷7FVBgVÆÂ&Vw&W76–öâæBFWÆ÷–ÖVçBVæF–ærâFWf–6R6†V6³¢&F–ÂÖFW&–Î(i&6†ævR6öÆ÷W.(i&G&r6öçF–çV÷W27G&ö¶W2v—F‚ÖWFÆæW73²&WVB6öÆ÷W"6†ævW2v—F†÷WBFöæS²F†VâFöæR÷&V÷VâæBv—¦Öòö÷&&—Bà  ¦ãS–V&Æ–6F–öâfW&–f–VC¢'VçF–ÖR6öÖÖ—B63ƒFCVC&CC–CSF3V#FCcS&FSCvC3“†â†÷7FVBF÷öÆöw’C3ƒCs3ƒcs†76VB2Ãò2ÃâvW2C3ƒCs3ƒ3F7V66VVFVC²Æ—fRãS–Ö&¶W"Â–æFW‚æBf–Ww÷'B×–çBæ§2ÖF6‚F†R&VÆV6R6÷W&6RâæF—fR•BÖFW&–Âö6öÆ÷W"×–6¶W"Æö6²×W66WFæ6R&VÖ–ç2VæF–æs²ãS‚v2d”ÂæBãSr6ÖW&ôFöæR×&RÖVçG'’527F—2&÷FV7FVBâ–çBT’4„Ó#Sb3V3ƒsVs#S#ƒ#FFSƒs–C““v6Cc†CSV&C#6SC#3ƒ–c†CƒS†SCvS63v&3&²–æFW‚4„Ó#SbSƒ“SFs6FS†S“#Fc#Ff3#&C–3SSƒvcff33Cs##ƒ†VCƒCs3CCssà ¢22ãS’FWf–6R52(	B"æ÷fVÖ&W"##` ¥W6W"6öæf—&×252gFW"F†RÖFW&–Â6öÆ÷W"ÖVF—B6öçF7B&W—"â&÷FV7BF†RFW7FVBÖFW&–Î(i&6öÆ÷W"6†æv^(i&6öçF–çV÷W2ÖWFÆæW72–çBÂ&WVFVB7G&ö¶W2ö6öÆ÷W"6†ævW2v—F†÷WBFöæRÂæB&WF–æVBãSr6ÖW&öv—¦ÖòôFöæR×&RÖVçG'’&V†f–÷"âãS‚&VÖ–ç2†—7F÷&–6Âf–ÆVBGFV×BÂ7WW'6VFVB'’ãS’â'VçF–ÖR&VÖ–ç2ãS“²æòæWr'V–ÆBg&öÒF†—266WFæ6RVçG'’â†÷7FVB&Vw&W76–öã¢2Ã52òd”Ã²V&Æ—6†VB'VçF–ÖR63ƒFCVC&CC–CSF3V#FCcS&FSCvC3“‚à ¥W6W"6·2v†B—2æW‡BÂv—F†÷WBöæW‡F'V–ÆBâ&V6öÖÖVæFVBæW‡Bæ'&÷r'V–ÆBföÆÆ÷w2F†R&V6÷&FVBãC2VWVS¢VF—BW†—7F–ærUbVF—F÷"æBÖW6‚†VÇF‚Ub†VÇÂF†VâÖ÷fRÆöærvW7GW&R–ç7G'V7F–öç2–çFòF÷V6‚Ö66W76–&ÆR6öçFW‡GVÂ†VÇW6–ærW†—7F–ær÷væW'2â¶VW7F–öâÆ&VÇ2ÂW'&÷'2Â66÷Rö6v&æ–æw2æB–çB56W2–çF7BâÆFW"&W7VÖRF†RæF—fRäôÒF—7Æ6VÖVçB–ÆöB÷6WGF–æw2VF—B&Vf÷&Rç’F—7Æ6VÖVçB&Wf–WrÂv—F‚W&f÷&Öæ6R&Væ6†Ö&·2&Vf÷&R†Vg’7V&F—f—6–öâv÷&²âæòæWr'VçF–ÖR–×ÆVÖVçFF–öâWF†÷&—¦VB'’F†—27FGW2VW7F–öâÆöæRà ¢22ãc(	BF÷V6‚Ö66W76–&ÆRUb†VÇ(	B"æ÷fVÖ&W"##` ¥W6W"öæW‡F'V–ÆB6VÆV7G2F†RVWVVBUb†VÇ6Æ–6RgFW"ãS’FWf–6R52âVF—Bf÷VæBÆöærvW7GW&Rfö÷FW"–âWb×v÷&·76Ræ§2æB&ö¦V7F–öâæ÷FW2–âÖW6‚Ö†VÇF‚æ§3²æò6†&VBvVæW&–2†VÇ÷væW"W†—7G2âW6RæF—fRFWF–Ç2÷7VÖÖ'’F—66Æ÷7W&W2–âF†÷6R÷&–v–æÂ7W&f6W2Âv—F‚F÷V6‚ö¶W–&ö&B7F—fF–öâæBf—6–&ÆRfö7W3²æòW‡G&÷WÆ–W"÷"vW7GW&R÷væW"âUb†VÇ6öçF–ç2W†—7F–æræf–vF–öâö†—7F÷'’–ç7G'V7F–öç2ÂG–æÖ–2Ö÷fRõ66ÆRõ&÷FFRVæ6–Â†–çBÂÖ×&VfW&Væ6RæBÆ–÷WBÖ7F–öâW‡ÆæF–öç2âW66R6Æ÷6W2†VÇ&Vf÷&RW†—F–ærF†RVF—F÷#²†VÇ6Æ÷6W2öâv÷&·76RW†—BæB&W6WG26öÆÆ6VBöâVçG'’â&ö¦V7F–öâ†VÇW‡÷6W2ÖWF†öBwV–Fæ6R&Wf–÷W6Ç’–âÆöæræ÷FW2öæF—fRF—FÆW2â&6RÖöæÇ’÷&WÆ6W2ÕUbö6ÆV"×–çBv&æ–æw2ÂC“bÖf6RæB#ÃÖ6÷&æW"62Â7W'fVBÖf6R7G&WF6†–ærv&æ–ærÂ6ÆV"×–çB6öç6WVVæ6W2ÂG–æÖ–2W'&÷'2÷7FGW2æB7F–öâÆ&VÇ27F’f—6–&ÆRà ¤÷&–v–æÂ6çf2ö6öçG&öÂ÷væW'6†—Â†VFW"ô&6²Fò4BÂ6VÆV7F–öâÂUbG&ç6f÷&×2ÂVæFòõ&VFòæB–çB&VÖ–â–çF7Bâ–çBãS’6÷W&6RæB66†R–â&RVæ6†ævVC²—G2FWf–6R52æB&÷FV7FVB×VÇF“ã&VÖ–â&÷FV7FVBâfö7W6VB'Vã¢“r52òd”ÂÂ6÷fW&–ærv÷&·76R†VÇôW66Rö6Æ÷6R÷&V÷Vâv—F‚Væ6†ævVBf–Wrö†—7F÷'’ÂUbG&ç6f÷&×2öæf–vF–öâÂFÆ2÷&ö¦V7F–öâÂv÷&·76RÆ–W&–ærÂ–çB6öçF7BôÖFW&–Â&V6÷fW'’æB&VÆV6Rö66†Rv—&–ærâ†÷7FVBgVÆÂ&Vw&W76–öâæBvW2öÆ—fRfW&–f–6F–öâVæF–ærâFWf–6S¢÷VâUbVF—F÷.(i&W‡æBUb†VÇ(i'7v—F6‚Ö÷fRõ66ÆRõ&÷FF^(i&6Æ÷6R†VÇ(i'â÷–æ6‚õVæFõ&VFþ(i$&6²Fò4BæB&V÷Vã²Ub÷"ÖW6‚†VÇFŽ(i%&ö¦V7F–öâ†VÇv†–ÆRv&æ–æw2&VÖ–âf—6–&ÆRâF†VâV–6²66WFVB–çBÖFW&–ÂôÖWFÆæW726Öö¶Rà ¢ãc†÷7FVB6÷'&V7F–öã¢F÷öÆöw’C3ƒcƒƒƒCƒb&W÷'FVB2Ã52òd”ÂâW†—7F–ærf6RFÆ2FW7B&WV—&W2—G2÷&–v–æÂW‡ÆæF–öâ(	ÆöæR—6ÆæBW"f6RÂWFòC“bf6W>(	Òâ&W7F÷&VBF†Bv÷&F–ær–ç6–FR&ö¦V7F–öâ†VÇv†–ÆR¶VW–ærFÆ262æB6ÆV"×–çBv&æ–ærf—6–&ÆR÷WG6–FR—C²æòFW7BW‡V7FF–öâv2vV¶VæVBâ'V×VBF†R6÷'&V7FVBÖW6‚†VÇF‚76WB¶W’Fòãcã6òF†R&Wf–÷W6Ç’FWÆ÷–VBãc76WB6ææ÷B7F’66†VBâÆ–6F–öâ&VÆV6R&VÖ–ç2ãcâÆÂ#rfö7W6VB6÷'&V7F–öâ6†V6·253²†÷7FVB&W'VâæB6÷'&V7FVBFWÆ÷–ÖVçBfW&–f–6F–öâVæF–ærà  ¦ãcV&Æ–6F–öâfW&–f–VC¢6÷'&V7FVB'VçF–ÖR6öÖÖ—B3S–FfcsC–#Sc†f63&Fc–F&&SƒS3S&Fcv#3#6â†÷7FVBF÷öÆöw’C3ƒsSSsCC676VB2Ãò2Ãâ6÷'&V7FVBvW2C3ƒsSSs3ƒv7V66VVFVC²Æ—fRãcÖ&¶W"Â–æFW‚ÂUbv÷&·76RæBÖW6‚†VÇF‚ÖF6‚F†R&VÆV6R6÷W&6W2âFWf–6R66WFæ6RVæF–ærf÷"Ub†VÇÂ&ö¦V7F–öâ†VÇÂ&WGW&â÷&V÷VâæB66WFVB–çB6Öö¶Râ–æFW‚4„Ó#Sbv#ƒc#vCvc#&3CcSs&FVF&#–###ƒ3“3vfCC†VSSƒ#ƒcCCCƒsS#–†²Ubv÷&·76RƒV–sVV&fcc“33CCcs–fFcCSs##36c&SS3##&#F3“†F–#CsFCs–vV²ÖW6‚†VÇF‚†ãcã66†R¶W’’FC–C3FC3s3sSSS#&cSv6&f6cƒ“sc#c†Vc&6Scs“s†3†SFf6#V–C#–â–çBãS–6÷W&6R÷–âæBW6W"52&VÖ–â&÷FV7FVBâæW‡BFWf–6RÆ—7C¢FövvÆRUb†VÇæB7v—F6‚Ö÷fRõ66ÆRõ&÷FFS²FövvÆR&ö¦V7F–öâ†VÇæB6†V6²f—6–&ÆRv&æ–æw3²&6²Fò4B÷&V÷VâæBV–6²ÖFW&–ÂôÖWFÆæW72–çBà ¢22ãc(	B&–v‡B–çBÆ–W'2æBö&¦V7BÖföÆÆ÷v–ærÆWGFR(	B"æ÷fVÖ&W"##` ¥W6W"ãc52&÷FV7G2Ub†VÇõ&ö¦V7F–öâ†VÇÂ66WFVB–çBãS’æBãSr6ÖW&ôFöæR×&VVçG'’&V†f–÷"âæWrW6W"&WVW7B†ææ÷FFVB67&VVç6†÷B“¢Æ–W'2öâF†R&–v‡BÆ–¶RF†Rö&¦V7BÖVçS²÷Vâ–çB&F–Â6ÆV"öbF†Rö&¦V7BæBföÆÆ÷r—BÆ–¶RF†Rv—¦Öòà ¤VF—C¢öæRFööÂ×6W76–öâ×V’–çBFö6²÷vç2÷&–v–æÂæVÂöÆ–W'2öfö÷FW#²f–Ww÷'B×–çB÷vç2ÆWGFRÂG&r†æFÆRæBg&ÖRÆö÷âW†—7F–ærv—¦Öò&ö¦V7F–öâGFW&ç2W6RF†RVF—F÷"6ÖW&'WBæò&WW6&ÆRö&¦V7BÖ&÷VæG2Æ–÷WB†VÇW"W†—7G2âÖ÷fRF†RW†—7F–ær–çBÖöæÇ’Fö6²Fò&–v‡C£‡‚öÆVgC¦WFó²÷F†W"6W76–öâÆ6VÖVçB÷&W7F÷&F–öâ7F—2WF†÷&—FF—fRâFB&W6VçFF–öâÖöæÇ’–çB×ÆWGFRÖÆ–÷WB†VÇW#¢66†RVF—F&ÆRÖW6‚&÷VæG2öæ6RB–çB÷VâÂ&ö¦V7BV–v‡B6÷&æW'2F‡&÷Vv‚F†RWF†÷&—FF—fR6ÖW&Â&VfW"Æ6VÖVçBFòF†RÆVgBÂ6†ö÷6Ræ÷F†W"6–FRFòfö–BÖöFVÂ÷&–v‡BæVÂ÷6VÆV7F–öâ6öçG&öÇ2v†Vâ76RÆÆ÷w2Â6Æ×Fòf–Ww÷'Bv†Vâ7&×VBâ&WW6R–çBw2g&ÖRÆö÷f÷"f–WrÖföÆÆ÷v–æs²¶VWG&vvVBÆWGFRöfg6WB&VÆF—fRFòF†Rö&¦V7Bâ&V6ö×WFRÆ6VÖVçBf÷"v†VVÂöÖFW&–Âö6öçG&öÂ6—¦W3²g&VW¦RWFò×Æ6VÖVçBGW&–ærÆ—fR7G&ö¶W2öG&ræBfö7W6VBæF—fRÖFW&–ÂÖ–çWBVF—F–æs²æWr–çB6W76–öâ&W6WG26fRÆ6VÖVçBâæòæWrg&ÖRÆö÷ÂvW7GW&R÷væW"ÂÖöFVÆÆ–ær¶W&æVÂÂ—f÷B÷"†—7F÷'’÷væW"âÖöFVÂ—G6VÆb—2æWfW"Ö÷fVB'’Æ6VÖVçBà ¤f–æÂfö7W6VB'Vã¢“B52òd”Â7&÷72–çBÆ–÷WBö6öçF7BöÖFW&–Âv÷&¶fÆ÷rÂ&–v‡BFö6²Âö&¦V7B&F–ÂÂUb†VÇæB&VÆV6Rö66†Rv—&–ærâ&VÂF‡&VR6ÖW&&ö¦V7F–öâFW7B6÷fW'2âö÷&&—B÷¦ööÒÂFö6²fö–Fæ6RÂ&÷VæG2æBæòfW'FW‚×WFF–öââ&VÂ–çBT’FW7B6÷fW'2g&ÖRföÆÆ÷v–ærÂÖçVÂöfg6WBÂ&W6—¦RÂFöæR÷&V÷VâæBVæ6†ævVB†—7F÷'’öæf–vF–öâ7FFRâWFFVBf÷&ÖW"ÆVgBÖFö6²76W'F–öç2FòW‡Æ–6—B&–v‡BÖFö6²W‡V7FF–öç2&WVW7FVB'’W6W#²&W6W'fVBfö÷FW"öÆ—7FVæW'2ö÷&F–æ'’×6W76–öâ6†V6·2â†÷7FVBgVÆÂ&Vw&W76–öâæBvW2öÆ—fRfW&–f–6F–öâVæF–ærâFWf–6S¢Æ–W'2B&–v‡C²÷VâFööÇ2&W6–FRÖöFVÃ²÷&&—B÷â÷¦ööÒv—F‚ÖVçRf—6–&ÆS²G&rÖVçRF†VâÖ÷fRf–Ws²ÖFW&–ÂôÖWFÆæW726öçF–çV÷W2–çBæBFöæR÷&V÷Vã²V–6²Ub†VÇ6Öö¶Râöâ7&×VB67&VVç2Æ6VÖVçBÖ–æ–Ö—¦W2÷fW&Æv†–ÆR¶VW–ær6öçG&öÇ2&V6†&ÆRà  ¦ãcV&Æ–6F–öâfW&–f–VC¢'VçF–ÖR6öÖÖ—BsV#f3FFSF&SƒCF3666f3&&SCs&FFC63–6&â†÷7FVBF÷öÆöw’CC“3S““#†76VB2Ã2ò2Ã2âvW2CC“3S“ccF7V66VVFVC²Æ—fRãcÖ&¶W"Â6†VÆÂÂf–Ww÷'B×–çBæ§2ÂFööÂ×6W76–öâ×V’æ§2æB–çB×ÆWGFRÖÆ–÷WBæ§2ÖF6‚F†R&VÆV6RG&VRâFWf–6R66WFæ6RVæF–ærf÷"&–v‡BÆ–W'2Fö6²ÂÆWGFR6ÆV&æ6RöföÆÆ÷v–ærÂÖçVÂG&ræB66WFVB–çBv÷&¶fÆ÷râ4„Ó#Sc¢6†VÆÂ&3F6F#C&VC†fc†VC“–VSv3Ff&V&3–&#66#C#S33ƒ“vSƒƒ3V3ƒ#sF3VVf²–çBT’#“F3s#3##–f63Cf#–63v6f#VVcV“ƒ3#fCSS#C“†#ƒ#s&Cc3SƒS363s²Fö6²÷væW"s†fcf36&3ƒS&fF&Cvc3vƒVCS&cCff6CCs3ƒC6&FcsV#sVc#vC²ÆWGFR†VÇW"S“FfccScCƒ“sSSƒvSc–Fc“SƒS#C&fccSVFS3ƒVCvSƒ–6cƒCS–fâãc†VÇæBãS’–çBW6W"56W2&R&÷FV7FVBâ6†÷'BFWf–6R6†V6·3¢÷VâUb–çBæBfW&–g’&–v‡BÆ–W'2²6ÆV"ÆWGFS²âö÷&&—B÷¦ööÒv†–ÆRÖVçRf—6–&ÆRÂG&r—BF†Vâæf–vFS²6†ævRÖFW&–Â6öÆ÷W"æBÖWFÆæW72–çBÂFöæR÷&V÷VâæBUb†VÇ6Öö¶Rà ¢22ãc"(	BæF—fRVFvR–6¶–ær–ç6–FRVFvRFööÇ2(	B"æ÷fVÖ&W"##` ¥W6W"ãc52&÷FV7G2&–v‡BÆ–W'2Fö6²æBö&¦V7BÖföÆÆ÷v–ær–çBÆWGFRÂÇW266WFVB–çBæBUb†VÇâæWr&WVW7C¢4TÄT5BTDtR(i"5Ä•B(i"4TÄT5BTDtR7F–ÆÂÖ—76W26öçfW‚VFvW3²VF—B÷F†W"FööÂ×F†VâÖVFvR7F–öç2f÷"F†RvVæW&Â6VÆV7F–öâf—‚à ¤VF—B6öæf—&ÖVBã“SBÖ–âVFvR×67&VVâ×–6¶–ær&æ·2&VæFW&VB6vRÆ–æW2'’552×—†VÂ&÷†–Ö—G’ÂF†VâFWFƒ²7Æ—BæBF—&V7B&WfVÂ7F–ÆÂW6VBv÷&ÆB×&F—W2&–67BFWF‚÷&FW&–ærâVFvRW‡G'VFR†BF†R6ÖRöÆB–6¶W#²VFvR6Æ–FRæBöfg6WBÆö÷FW7FVB6VÆV7FVB&÷†–W2–â6VÆV7F–öâÖÆ—7B÷&FW"âF†÷6RW†—7F–ær÷væW'2æ÷r&VfW"õö&÷†Æ%6VÆV7F–öä'&–FvRç–6²‚vVFvRrÆWfVçB’Â–æ6ÇVF–æræF—fRÖ—76W3²6VÆV7FVBÖVFvRG&r7F'G2&WV—&RF†RæF—fRv–ææ–ærVFvRFò&VÆöærFòF†R6VÆV7F–öââW†—7F–ærv÷&ÆB×&F—W2fÆÆ&6²&VÖ–ç2öæÇ’v†VâæòæF—fR'&–FvR–6¶W"—2f–Æ&ÆR‡7FæFÆöæRö&ö÷G7G&6ö×F–&–Æ—G’’âæòæWr–6¶W"ö¶W&æVÂÂF‡&W6†öÆBÂvW7GW&R÷"†—7F÷'’÷væW"âÆö÷7WBÇ&VG’W6W2Ö–âw2æF—fR–6¶W#²VFvR–çBæB6ö×öæVçB×FövvÆRÇ&VG’6†&R—C²7vVWföÆÆ÷rVFvW2æBFBfW'FW‚W6R67&VVâÖF—7Fæ6R6æ–ærf÷"F†V—"F—7F–æ7B7&÷72Öö&¦V7B÷ö–çB–ÆöG2Â6òæòWV—fÆVçBv÷&ÆBÖFWF‚–6¶W"v2&WÆ6VBF†W&RâöæR×6†÷B&÷FFRô6öÆÆ6R7Böâ&W6VÆV7F–öââÆVv7’VFvR×FövvÆR×&W—"—2æ÷BÆöFVBà ¤öfg6WBÆö÷†BGvòÖöGVÆRU$Ç2†G&vW"ãcsæBÆö÷6RÖ&ö÷G7G&ãã3"ã’’â&÷F‚æ÷r&W6öÇfRF†R6ÖRãc"U$Â6òT’Æ—7FVæW'2öÖöGVÆRW†V7WFRöæ6Râ&Vg&W6†VBF†R&ö÷G7G&(i'Væ–f÷&ÒÖ–ç6WN(i&×VÇF’Öf6RÖF—&V7B66†R6†–âöæÇ“²ÖöFVÆÆ–ærÆöv–2æB&÷FV7FVB×VÇF“ã&VÖ–âVæ6†ævVBâ7Æ—Bw2&WF–æVBf—†VBöÆB66†R76W'F–öâæ÷r6†V6·2—G2&Wf–WvVB'VçF–ÖR76WB&VfW&Væ6Rà ¥&Vw&W76–öâW†V7WFW2V6‚7GVÂFööÂ–6¶W"öâF†R7WÆ–VBã“SB6öçfW‚ô$¢‡GvVÇfR&Wf–÷W6Ç’FWF‚×7FöÆVâÖ–Gö–çG2’Bãóó66ÆW2ÂfW&–f–W2æF—fRÖ—76W2æB&V¦V7G2æV–v†&÷W&–ærVç6VÆV7FVBVFvR7FVÇ2â7GVÂ7Æ—B'WGFöî(i'GvòæF—fRVFvRF26öÖÖ—G2W†7FÇ’öæR6æöæ–6Â–ç6W'Df6U6VvÖVçB7Æ—BæB&W6W'fW2W†7B†—7F÷'’VæFòõ&VFò6æ6†÷G2âf–æÂfö7W6VB'Vã¢R52òd”Â7&÷72FööÂöæF—fR6öçfW‚–6¶–ærÂ7Æ—BG&ç67F–öâÂFööÂVÆ–v–&–Æ—G’÷6W76–öâ&V†f–÷"Â66†R÷&VÆV6Rv—&–ærÂUb†VÇæB&÷FV7FVB–çBÆ–÷WBö6öçF7Bâ†÷7FVBgVÆÂ&Vw&W76–öâæBvW2öÆ—fRfW&–f–6F–öâVæF–ærâFWf–6S¢7Æ—BGvò÷÷6—FR6öçfW‚Öf6RVFvW2Â&WVBgFW"÷&&—B÷¦ööÓ²&WfVÂôVFvR6Æ–FRôöfg6WBÆö÷æB&÷VæF'’VFvRW‡G'VFR–6²F†RVFvRVæFW"F†RVæ6–Ã²VæFòõ&VFòÂFöæRö&6¶w&÷VæBW†—BæBæf–vF–öã²V–6²66WFVB–çBÆ–÷WB6Öö¶Râ¶VWVÆ–v–&–Æ—G’öf6RF¦6Væ7’ö&÷VæF'’6†V6·2–çF7Bà  ¦ãc&V&Æ–6F–öâfW&–f–VC¢'VçF–ÖR6öÖÖ—BC#Cf666c3#f##“†&fF##6VVcFcc&F#†3Fâ†÷7FVBF÷öÆöw’CC##“s3ƒ76VB2Ãbò2ÃbâvW2CC##“s#ss&7V66VVFVC²Æ—fRãc&Ö&¶W"Â6†VÆÂæBÆÂf—fR&W—&VBFööÂÖöGVÆW2ÖF6‚F†R&VÆV6R6öÖÖ—BâFWf–6R66WFæ6RVæF–ærf÷"6öçfW‚7Æ—BF2Â÷F†W"VFvR×FööÂF&vWF–ærÂVæFòõ&VFòöW†—Böæf–vF–öâæB66WFVB–çBÆ–÷WBâ4„Ó#Sc¢6†VÆÂsC“6c36Svcƒv&f3ƒƒSSSsF#&#ƒF#Cc3V#66cc3#Sƒs&S#fcS“v²7Æ—BVcvc“&VC“†6“fSƒ&c#33v#ƒSS3“SS#vCc†3VC–#S#FV336VffVSSc“3v²&WfVÂC#VSvSƒsSsS“ƒv6c“fc36cv6cF36Vs†&3S#S†ccƒ33sf#V36Cc–S²W‡G'VFRcc†Scƒ#ƒ&C†CS–F3f6fƒsƒƒsscƒCƒV#cSƒsSF33fvF3VFC3#VFSv²6Æ–FR–VcFFV3s“V&3†6C#S&#f6##scƒ6#CffV3ff&cvC#c3ƒV3“#Vc3“ƒcF²öfg6WBS#FS6cv#63–F36c“FfSCS“Cc#SS3S“†C3C&F3&V#vfccSCCƒ#ƒâW6W"ãc–çBÆ–÷WB52æBV&Æ–W"–çBö†VÇ56W2&VÖ–â&÷FV7FVBâ6†÷'BFWf–6RÆ—7C¢7Æ—B÷÷6—FR6öçfW‚Öf6RVFvW2gFW"÷&&—B÷¦ööÓ²&WfVÂõ6Æ–FRôöfg6WBæB&÷VæF'’W‡G'VFRF&vWBF†R–çFVæFVBVFvS²VæFòõ&VFòæBFöæRö&6¶w&÷VæBW†—BÂF†Vâæf–vF–öâà ¢22ãc2(	BæF—fRäôÒF—7Æ6VÖVçB–ç7V7F–öâ(	B"æ÷fVÖ&W"##` ¥W6W"ãc"52—2&÷FV7FVC¢æF—fR6öçfW‚VFvR–6¶–ærv—F†–â7Æ—BæB÷F†W"VFvRFööÇ2Â6æöæ–6Âöfg6WBÆöFW"Â66WFVB–çBÆ–÷WBö6öçF7BæBUb†VÇâ7FæF–ærWF†÷&—¦F–öâFòfÆ–FFRÂ6öÖÖ—BæBW6‚V6‚&÷„Æ"7FvRF—&V7FÇ’Fò÷&–v–âöÖ–âæBvW2&VÖ–ç2–âf÷&6Rà ¤VF—Bf÷VæBæF—fRF—7Æ6VÖVçB–ÖvW2÷6WGF–æw2Ç&VG’&WF–æVB'’æöÖBÖÖFW&–Â×&W6÷W&6RæBF—7Æ–VB&r'’F†RUb–ÖvRFFW"âW†—7F–ærFFW"æ÷rVæG2&WF–æVB6÷W&6R7G&VæwF‚ÂÖ–Gö–çBÂv÷&ÆB×76RfÆrÂ&ö¦V7F–öâæBW†7B6÷W&6R–ÖvR'—FR6÷VçBFòF—7Æ6VÖVçB–ç7V7F–öâ7FGW2âÖ—76–ærf–VÆG2W‡Æ–6—FÇ’6’æ÷B&V6÷&FVC²æò–çfVçFVBFVfVÇG2Âv÷&ÆB×Væ—B6öçfW'6–öâÂÖW‡G&7F–öâÂ–ÖvR&W6×Æ–ær÷"4BF—7Æ6VÖVçB&Wf–Wrâ&rF–ÆRöÖ–ærv&æ–ær&VÖ–ç2â÷&–v–æÂ'—FW2æBÖWFFF&VÖ–âWF†÷&—FF—fS²G&—Ææ"—2&W÷'FVB&F†W"F†âÆ–VBâæòæWrFV6öFW"Â&VæFW&W"Â7V&F—f—6–öâ÷"ÖöFVÆÆ–ær÷væW"à ¥fÆ–FF–öâæBFWÆ÷–ÖVçBVæF–ærâFWf–6S¢–×÷'BæF—fRäôÒv—F‚F—7Æ6VÖVçBÂ÷VâUbVF—F÷"ÂVæ&ÆR–ÖvR&VfW&Væ6RæB6VÆV7BF—7Æ6VÖVçC²–ç7V7B6WGF–æw2æB&rÖÖv&æ–æs²7v—F6‚Ö2æB&V÷Vã²6öæf—&Ò–çBæB6öçfW‚7Æ—B&VÖ–â66WFVBâæW‡C¢&Væ6†Ö&²ÖvFVBF—7Æ6VÖVçB&Wf–WrÆææ–ærW6–ærW†—7F–ær7V&F—f—6–öâõUb÷væW'2Âv—F‚æò†Vg’&Wf–Wr&Vf÷&RW&f÷&Öæ6R66WFæ6Rà ¢22ãc2(	Bf–æÂ&VÆV6RfÆ–FF–öâ(	B"æ÷fVÖ&W"##` ¤fö7W6VBfÆ–FF–öã¢3B52òd”Ââ†÷7FVBF÷öÆöw’CC#Sƒƒƒ#¢2Ãr52òd”ÂâvW2CC#Sƒss“‚7V66VVFVBâ'VçF–ÖR6öÖÖ—BF336#Cv#6F3&6VcVSv&F3ssf&&&fCCV6cc–F²Æ—fRfW'6–öâæ§6öâÂ–æFW‚æ‡FÖÂÂæöÖB×WbÖ–ÖvRÖ6†ö–6W2æ§2ÂWb×v÷&·76Ræ§2æBÖW6‚Ö†VÇF‚æ§2'—FRÖÖF6‚F†R&VÆV6RG&VRâæF—fRFWf–6R66WFæ6R&VÖ–ç2VæF–ærà ¢22ãc2FWf–6R52(	B"æ÷fVÖ&W"##` ¥W6W"6öæf—&×252f÷"æF—fRäôÒF—7Æ6VÖVçB–ç7V7F–öââ&÷FV7B—G2F—7Æ–VB&WF–æVB6÷W&6R6WGF–æw2æBVæ6†ævVB&rÖ2â–çB&Vw&W76–öâ—2äõBFWf–6RÖ66WFVB–âF†—2'V–ÆC¢F†RFW7Bö&¦V7BÆ6·27V—F&ÆRUbVçw&Â6ò–çB6÷VÆBæ÷B&RFW7FVBâ&–÷"66WFVB–çB&V†f–÷W"&VÖ–ç2&÷FV7FVBâf÷"â—6öÆFVB–çB6Öö¶RFW7BW6Rg&W6‚F—7÷6&ÆR7V&RÂö&¦V7B&F–Â(i"Ub(i"f6RFÆ2ÂF†VâUb–çBâFòæ÷B&WÆ6RF†R–×÷'FVBF—7Æ6VÖVçB6×ÆRUg2ÖW&VÇ’FòFW7B–çC²&WF–æVBFW‡GW&W2FWVæBöâF†VÒâ'VçF–ÖR&VÖ–ç2ãc3²æò6öFR6†ævW2à ¢22ãcB(	B—6öÆFVBæF—fR†V–v‡BFV6öFR&Væ6†Ö&²(	B"æ÷fVÖ&W"##` ¥W6W"52gFW"F†RF—7÷6&ÆRÖ7V&RVçw&õ–çB6†V6²6Æ÷6W2ãc2–çBFWf–6R66WFæ6Râ&÷FV7B66WFVB6öÆ÷W"ôÖWFÆæW72õ&÷Vv†æW72–çBÆöæw6–FRãc2æF—fRF—7Æ6VÖVçB–ç7V7F–öâÂãc"6öçfW‚VFvR×FööÂ–6¶–ærÂãc&–v‡BÆ–W'2öö&¦V7BÖföÆÆ÷v–ærÆWGFRÂãS’ÖFW&–Â6öçF7B&V6÷fW'’æBãSrVF—F÷"Ö6ÖW&öv—¦Öò÷væW'6†—âV&Æ–W"ãc2VæF–ærÕ–çBæ÷FW2&R7WW'6VFVB'’F†—252à ¤VF—C¢&WF–æVBæF—fR–ÖvW2÷6WGF–æw2Ç&VG’†fRWF†÷&—FF—fR÷væW'2â&W6W'fVBãCfV6–&–Æ—G’vRFW7G2vVæW&FVB‚Ö&—BÖ2Âæ÷B&rbÖ&—B†V–v‡G2âæò&öGV7F–öâ†V–v‡BFV6öFW"W†—7FVC²W‡FVæBF†RW†—7F–æræöÖB×66Æ"×ær÷væW"W6–ær—G25$2F&ÆRæBWF‚&VF–7F÷"âæWrFV6öFTæöÖD†V–v‡Eär&WGW&ç2W†7B‚óbÖ&—Bw&—66ÆR–çFVvW"6×ÆW2Â÷&–v–æÂ&÷r÷&FW"æB&rÖ–âöÖ‚Âv—F‚&÷VæFVB7G&VÖ–ær–æfÆF–öâÂ5$2ö6‡Væ²ö÷&FW"öf–ÇFW"6†V6·2Â‚Ö”"Væ6öFVBó#C‚×7V&R62âVç7W÷'FVB6öÆ÷W"öÇ†÷ÆWGFRö–çFW&Æ6Röæ–ÖF–öâ—2&VgW6VBâæòvÖÖÂ&W6×Æ–ærÂÖFW&–Â7G&VæwF‚öÖ–Gö–çBÂ&ö¦V7F–öâ÷"v÷&ÆB×76R6öçfW'6–öâ—2Æ–VBâW†—7F–ærärW‡÷'Bö÷VRÖ6öÆ÷W"gVæ7F–öâ'—FW2æB6öç7VÖW"–ç2&VÖ–âVæ6†ævVC²öæÇ’F†R—6öÆFVB&Væ6†Ö&²–×÷'G2F†RæWrãcBW‡÷'BâF†—2fö–G2&Vg&W6†–ærF†R66WFVB–çB÷&VæFW"w&‚f÷"âVçW6VBW‡÷'Bà ¤æWrFö72öæF—fRÖ†V–v‡BÖ&Væ6†Ö&²ÓcBæ‡FÖÂ&VG2Æö6ÂäôÒõäs²äôÒW6W2&VDæöÖD–×÷'BæBW‡Æ–6—BÖFW&–ÂF—7Æ6VÖVçB6Æ÷G2Âv—F†÷WB'6–ærvVöÖWG'’Â&WV—&–ærUg2÷"F÷V6†–ærF†R÷VââäôÒÆ–Ö—G2&VÖ–â#‚Ö”"6öçF–æW"ó#BÖ”"&WF–æVB–ÖvW2ó#SbÖFW&–Ç3²6VÆV7FVBärFV6öFW"FG2—G26ÖÆÆW"6÷W&6R6âF‡&VRFV6öFW2––VÆB&WGvVVâ'Vç2æB7F÷eDU"'VâW†6VVG2ã"6V6öæG3²æ÷B†&B–çFW''WF–öââ&W÷'B–æ6ÇVFW2÷&–v–æÂ6WGF–æw2ÂW†7B&—BFWF‚÷&ævRöÆ÷rÖ'—FR6÷VçBÂFV6öFR6×ÆW2æB¶æ÷vâ'&’'—FW2†æ÷BF÷FÂÖVÖ÷'’’âF–ç’'VæFÆVB,9s"6×ÆR6†V6·2ÆÂf÷W"W†7BbÖ&—BfÇVW2V6‚'VâæB—2W‡Æ–6—FÇ’æ÷BW&f÷&Öæ6RWf–FVæ6RâFWf–6R÷6÷W&6RF–Ö–ær×W7B&R6VçB&6²&Vf÷&RF†RæW‡B&Wf–WrFV6—6–öââæòf–Ww÷'BF—7Æ6VÖVçB6†—3²ãC&Væ6†Ö&²æB÷&–v–æÂ7V&F—f—6–öâ÷&VæFW&W"&VÖ–âVçF÷V6†VBà ¥fÆ–FF–öâæBFWÆ÷–ÖVçBVæF–ærâFWf–6S¢÷VâF†RæF—fR†V–v‡B&Væ6†Ö&²g&öÒf–ÆR(i"67&VVâ6ö×&—6öâòFW7BÆ—7B†÷"F—&V7BÆ–æ²’ÂfW&–g’F–ç’6×ÆRÂ6†ö÷6RæF—fRäôÒ6öçF–æ–ærF—7Æ6VÖVçB†æòVçw&’ÂÖV7W&RæB6÷’&W÷'BâVç7W÷'FVBf÷&ÖG2×W7BW‡Æ–â&VgW6Ââ÷F–öæÂ66WFVB–çBö6ÖW&ö6öçfW‚7Æ—B6Öö¶RâæW‡C¢76W72&VÂ•B†V–v‡BFV6öFRF–Ö–æw2FövWF†W"v—F‚F†RW†—7F–ærvVöÖWG'’÷&VæFW"fV6–&–Æ—G’&W7VÇG2&Vf÷&Rç’&÷VæFVBF—7Æ6VÖVçB&Wf–Ws²&W6W'fR÷&–v–æÂ&VæFW&W"õ7V$B÷væW'2ÂUb6V×2æBæF—fRÖFW&–ÂG&ç6f÷&×2à ¢ãcBfö7W6VBfÆ–FF–öã¢3r52òd”Â7&÷72†V–v‡BõäröW‡÷'Bö–ç7V7F–öâõT’Â&VÆV6Rv—&–æræB&÷FV7FVB–çBö6ÖW&öVFvRF&vWF–ærâ†÷7FVB&Vw&W76–öâæBFWÆ÷–ÖVçBVæF–ærà ¢22ãcBf–æÂ&VÆV6RfÆ–FF–öâ(	B"æ÷fVÖ&W"##` ¥'VçF–ÖR#C–&6#“f3Ssc33““Ff3FC&3V3&Sƒƒf6&#’âfö7W6VB3r52òd”Ã²†÷7FVBF÷öÆöw’CC3“cs#C3¢2ÃR52òd”ÂâvW2CC3“css’7V66VVFVC²Æ—fRÖ&¶W"Â6†VÆÂÂæF—fRÖ†V–v‡B&Væ6†Ö&²…DÔÂõT’ö†VÇW"æBär÷væW"'—FRÖÖF6‚F†R&VÆV6RâæF—fRFWf–6R&Væ6†Ö&²&W7VÇG2&VÖ–âVæF–ærâW6W"7FVW&VBöævö–ærv÷&²FòÆÂÖ6†ææVÂ–çBFööÇ2&Vf÷&RFWf–6RFW7F–ærF†—2&Væ6†Ö&³²æòFWf–6R52–æfW'&VBf÷"ãcBà ¢22ãcR(	BÆÂÖ6†ææVÂ–çBFööÇ2æB6†&VBÖ6²7FVæ6–Â(	B"æ÷fVÖ&W"##` ¥W6W"&WVW7G2''W6‚w26öÖ&–æVB6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW726†ö–6Rf÷"f–ÆÂÂW&6W"Â6×VFvRÂ&ÇW"æBÖ6³²W‡Æ–6—FÇ’6†ö÷6W26†&VBÖ6²÷fW"6W&FRÖ6·2âW6W"v2–æf÷&ÖVB&Vf÷&R–×ÆVÖVçFF–öã¢&WW6RF†R6VÆV7FVB6öÆ÷W"ÖÆ–W"Ö6²27FVæ6–Âf÷"äUr66Æ"VF—G3²6öÆ÷W"&WF–ç2W†—7F–æræöâÖFW7G'V7F—fRÆ–W"ÖÖ6²&V†f–÷W"Âv†–ÆR&Wf–÷W6Ç’6öÖÖ—GFVB66Æ"–çB—2æ÷B&WG&ö7F—fVÇ’†–FFVâ÷&WfVÆVB'’ÆFW"Ö6²VF—G2âæò–æFWVæFVçBW"Ö6†ææVÂÖ6·2÷"66Æ"ÖÆ–W"66†VÖ—2–çG&öGV6VBâF†—266÷R—2f—6–&ÆR–âÖ6²T’ö†VÇâãc2–çBöF—7Æ6VÖVçB–ç7V7F–öâ52æBV&Æ–W"–çFW&7F–öâÂÆ–÷WBÂ6ÖW&öv—¦ÖòæBVFvR×FööÂ56W2&VÖ–â&÷FV7FVBà ¤VF—Bf÷VæB×VÇF•–çD6†ææVÇ2&W7G&–7FVBFò7F–öãÓÓÒw–çBs²f–ÆÂF–Bæ÷B&WF–â66Æ"67&F6‚Æ–W'2Âf–ÇFW'2æB6×VFvR–6·WöæÇ’&âöâF†R&–Ö'’Æ–W"ÂæBV–6²FööÂ6öçG&öÇ2Ö÷fVBF†R6†ææVÂG&÷F÷vâ'WBÆVgB6öÖ&–æVBFövvÆW2&V†–æBâW‡FVæBF†÷6RW†—7F–ær÷væW'3¢6ÖR6–ævÆR7G&ö¶Rö†—7F÷'’G&ç67F–öâÂW"Ö6†ææVÂ&7FW"Æ–W'2Â÷&–v–æÂf6Röf6Vw&÷Wö†öÆBw&÷r÷6‡&–æ²6÷fW&vRÆç2Â&W6öÇWF–öâ×7V6–f–2÷&–v–æÂf–ÇFW"FöÖ–ç2ÂæB–6·W÷v÷&²Ö'VFvWB&W6WG2öâWfW'’6VÆV7FVB6†ææVÂâW&6W"&W7F÷&W2&÷Vv†æW73#SRôÖWFÆæW73v†–ÆR&WF–æ–ær÷&–v–æÂ6öÆ÷W"W&6R6VÖçF–72â#B6öÆ÷W"&F—W266ÆW2FòF†RS"66Æ"Ubfö÷G&–çB†Ö–æ–×VÒöæR66Æ"FW†VÂ’âÆÂ6V6öæF'’&W6÷W&6W2fÆ–FFR÷&VfÆ–v‡B&Vf÷&RöæR6†V6·ö–çC²6æ6VÂÂ6÷W&6RÆ÷72Â6†ææVÂ6†ævW2æB6†V6·ö–çBf–ÇW&W2&WF–â6öÖÖ—GFVBÖ2à ¥&WW6RF†RW†—7F–ær6VÆV7FVBÖÆ–W"Ö6²f÷"æWr66Æ"VF—G3¢&ÆVæB67&F6‚#‚v–ç7B6öÖÖ—GFVBfÇVW2W6–ær6†&VBÖ6²6÷fW&vS²#BÖ6·2&VÖfW&vRF†V—",9s"6×ÆW2–çFòS"66Æ"—†VÇ2Â†öæ÷W"Væ&ÆVBö–çfW'FVBÂæBöÖ—B&Æö6¶VBæòÖ÷&W6÷W&6W2ö†—7F÷'’âÆ—B÷66Æ"&Wf–WrÖF6†W2F†Rf–ÇFW&VB&W7VÇC²æòÖÖ6²&Wf–Wr¶VW2F†R÷&–v–æÂF—&V7B$t$F‚âÖ6²FBöVF—B÷&VÖ÷fR66WG266Æ"ÖöFRv†Vââ÷fW&Æ’—26VÆV7FVBÂ&WF–æ–ærF†RW†—7F–ær&÷fRÔ&6R&WV—&VÖVçBâ†–FRõ&WfVÂôw&W’''W6‚6öÖÖæG2&W&R''W6‚F‡&÷Vv‚F†R÷&–v–æÂ7F–öâÖ6†ævRö6æ6VÆÆF–öâ÷væW"Â6ò&V6VF–ær&ÇW"ôf–ÆÂ6ææ÷B6–ÆVçFÇ’&VÖ–â7F—fRv†–ÆR–çF–ærF†RÖ6²â6öÖ&–æVBFövvÆW2&R&W&VçFVB–çFòV6‚FööÂw2V–6²6öçG&öÇ2æBÖ6²vR†÷&–v–æÂæöFW2öÆ—7FVæW'2“²ÖFW&–Â†VFW"&W6W'fW27F—fRFööÂæB&F–ÂÖFW&–Â7F–ÆÂ&W&W2''W6‚W"&÷FV7FVB6öçF7B&W—"âW†—7F–ær66Æ"W‡÷'B÷&ö¦V7BööÇ2Â&r&W6÷W&6W2Â6ö×÷6—F÷"Â¶W&æVÇ2Â6öçF7Bö6ÖW&æB†—7F÷'’÷væW'2&WF–æVC²æò&W6÷W&6R÷66†VÖfW'6–öâ6†ævW2âWFFVBF‡&VRf÷&ÖW"FW7G2F†BW‡V7FVB66Æ"Ö6·2Fò&R–æ66W76–&ÆR÷"–væ÷&VC²ÆÂVç&VÆFVB76W'F–öç2&VÖ–âà ¥fÆ–FF–öâæBFWÆ÷–ÖVçBVæF–ærâFWf–6S¢6öÆ÷W"&–Ö'’(i"Væ&ÆR&÷Vv†æW72´ÖWFÆæW72–âf–ÆÂôW&6W"õ6×VFvRô&ÇW"6öçG&öÇ3²W6R6öçG&7F–ær×VÇF’Ö6†ææVÂÖ&·2f÷"f–ÇFW'2Â–ç7V7BÖ&Wf–Ww2âFW7Bf6Rôö&¦V7Bf–ÆÂÂF†VâöæRVæFòõ&VFòf÷"ÆÂÖ2âöââ÷fW&Æ’FB6†&VBÖ6²Â†–FR÷&WfVÂöw&W’ÂF†VâÖ¶RæWr66Æ"ö×VÇF’Ö6†ææVÂVF—G2æBFövvÆR–çfW'6–öââFöæR÷&V÷VâÂÖFW&–Â6öÆ÷W"6†ævRÂ6öçF–çV÷W2Væ6–Â–çF–ærÂf–ævW"÷&&—BæBv—¦Öò6Öö¶Râ66Æ"VF—G2Ç&VG’6öÖÖ—GFVB&VÖ–âVæ6†ævVBv†VâVF—F–ærF†R7FVæ6–ÂâæW‡C¢FWf–6RfVVF&6²öâFööÇ2ÂF†Vâ6öÆÆV7BãcBæF—fR†V–v‡BF–Ö–æw2&Vf÷&Rç’F—7Æ6VÖVçB&Wf–Wr–×ÆVÖVçFF–öââ7FæF–ærW6‚÷V&Æ—6‚WF†÷&—¦F–öâ&VÖ–ç27F—fRà ¢ãcRfö7W6VBfÆ–FF–öã¢ƒ52òd”Â7&÷727GVÂ6öÖ&–æVBFööÇ2Â6†&VB7FVæ6–ÂÂ66Æ"WVÆ—G’Âf6Röw&÷Wö†öÆBf–ÆÂÂT’6öçF7BÂÖ6·2Âf–ÇFW'2ÂV÷F2Â†—7F÷'’ö6æ6VÆÆF–öâæB&VÆV6Rö66†R÷&÷FV7FVB6ÖW&öVFvRöÆ–÷WB6†V6·2â†÷7FVB&Vw&W76–öâæBFWÆ÷–ÖVçBVæF–ærà ¢22ãcRf–æÂ&VÆV6RfÆ–FF–öâ(	B"æ÷fVÖ&W"##` ¥'VçF–ÖRCvCƒfc#CV6S#3†Csƒ&CC#s–f&&fc6FCrâfö7W6VBƒ52òd”Ââ†÷7FVBF÷öÆöw’CCC#3cƒc¢2Ã#r52òd”ÂâvW2CCC#3ccsB7V66VVFVC²Æ—fRÖ&¶W"Â6†VÆÂÂ–çBT’Â–çB6÷&RæB67&VVâ6ö×&—6öâÖF6‚F†R'VçF–ÖRG&VRâæF—fRFWf–6R66WFæ6R&VÖ–ç2VæF–ærâW6W"FFVBÖ6¶&ÆR&6R&WV—&VÖVçBGW&–ærV&Æ–6F–öã²ãcb–æ6ÇVFW2F†—266WFVB–×ÆVÖVçFF–öâ66÷RÂæ÷B6Æ–ÖVBFWf–6R52â6†&VB7FVæ6–Â66÷R&VÖ–ç22W‡Æ–æVBFòW6W#¢7W'&VçB6öÆ÷W"ÖÆ–W"Ö6²Æ–Ö—G2äUr66Æ"VF—G2æBFöW2æ÷B&WG&ö7F—fVÇ’†–FR÷&WfVÂ6öÖÖ—GFVB66Æ"Ö2à ¢22ãcb(	BÆ–gB&6R–çBFòÖ6¶&ÆRÆ–W"(	B"æ÷fVÖ&W"##` ¥W6W"FF—F–öæÆÇ’&WVW7G2Ö¶–ær&6R–çFò—G2÷vâÆ–W"6ò—B6â&RÖ6¶VBâVF—C¢&6R—2FVÆ–&W&FVÇ’÷VR÷VæÖ6¶&ÆS²W†—7F–ærVæE–çDÆ–W"ö6GW&TÆ–W&VD6öÆ÷W%&W6÷W&6RæB÷&–v–æÂÆ–W"Ö6²6â&W&W6VçBF†R&WVW7FVB&W7VÇBv—F†÷WB66†VÖ6†ævRâFBöæR&6R(i"Æ–W"6öÖÖæB–â6VÆV7FVBÆ–W"6WGF–æw2Âf—6–&ÆRöæÇ’v—F‚&6R6VÆV7FVB–â6öÆ÷W"â—BÆ–gG2W†7B&6R—†VÇ2–çFòâ÷VRæ÷&ÖÂ&6R–çB÷fW&Æ’Â–ç6W'FVB$TÄõrWfW'’W†—7F–ær÷fW&Æ’ÂF†VâÆVfW2â÷VRv†—FR&6¶–ærâ6ö×÷6—F–öâ&VÖ–ç2'—FRÖ–FVçF–6ÂVçF–ÂÆ–W"öÖ6²VF—G2â÷&–v–æÂÖ6·2Â&ÆVæBÖöFW2Â–ÖvR&V6—W2Â÷&FW&–ærÂ66Æ"Ö2æBæF—fRUg2&VÖ–âVçF÷V6†VBâF†RæWrÆ–W"—26VÆV7FVBæBæ÷&ÖÂ²Ö6²&V6öÖW2f–Æ&ÆRà ¥F†RW†—7F–ær–çFW"÷vç2ÆÂ6VÆV7F–öâÂ&VfÆ–v‡BÂ6†V6·ö–çBæB&W6÷W&6RV&Æ–6F–öã²÷&–v–æÂ7F6²ö6ö×÷6—F÷"÷6÷W&6R–ç2&R&WF–æVBâöæRVæFò&W7F÷&W2öÆB&6RæB&VFò&W7F÷&W2F†RVF—F&ÆRÆ–W"â&W6W'fRF‡&VRÖ÷fW&Æ’6æBööÂ'VFvWG3¢gVÆÂ7F6²F—6&ÆW26öÖÖæBv—F‚ÖW&vR÷&VÖ÷fRwV–Fæ6RâV÷Fö6†V6·ö–çB÷7FÆR÷66Æ"æB7FvVBÖ–ÖvR&VgW6Â&W6W'fR&W6÷W&6W2Â7W'&VçBÆ6VÖVçBæB†—7F÷'’ââW‡Æ–6—BW6W"6öçfW'6–öâ6â7&VFRv†—FRÆ–W"g&öÒâV×G’v†—FR&6S²æòWFöÖF–26÷W&6R–ÖvR&¶–ær÷"Ub6†ævR—2–×Æ–VBâãcRFööÂö6†ææVÂ÷6†&VB×7FVæ6–Â&V†f–÷W"&VÖ–ç2–æ6ÇVFVC²ÆÂV&Æ–W"&÷FV7FVBFWf–6R56W2&VÖ–âà ¤fö7W6VB6†V6·276VBf÷"S"ó#BW†7B&Vf÷&RögFW"—†VÇ2ÂÖ6²†–FRv—F‚&r—†VÇ2&WF–æVBÂVæFòõ&VFòÂ6fRô÷VâÂFV6öFVBäôÒ—†VÇ2ÂÖ—†VBöÖ6¶VBö–ÖvR÷fW&Æ’&V6—W2ö÷&FW"ÂgVÆÂ×6Æ÷B÷V÷Fö6†V6·ö–çB÷7FÆR&VgW6ÂÂ7GVÂT’æB7FvVBÖ–ÖvR&W6W'fF–öââf–æÂfÆ–FF–öâæBFWÆ÷–ÖVçBVæF–ærâFWf–6S¢6VÆV7B–çFVB&6R6öÆ÷W"(i"6VÆV7FVBÆ–W"6WGF–æw2(i"&6R(i"Æ–W#²V&æ6R7F—2Â&6R–çB6VÆV7G3²²Ö6²(i"†–FRõ&WfVÂôw&W’âVæFòõ&VFòæB6fRô÷VââÇ6òFW7BãcRf–ÆÂôW&6W"õ6×VFvRô&ÇW"v—F‚6öÆ÷W"ÇW2&÷Vv†æW72´ÖWFÆæW72ÂÖ&Wf–Ww2ÂFöæR÷&V÷VâæBæf–vF–öââæW‡C¢FWf–6RfVVF&6²öâ&6RöÖ6·2æB6öÖ&–æVBFööÇ3²ãcB†V–v‡B&Væ6†Ö&²7F–ÆÂv—G2&VÂ•B6÷W&6RF–Ö–ær&Vf÷&RF—7Æ6VÖVçB&Wf–Wrv÷&²â7FæF–ærW6‚÷V&Æ—6‚WF†÷&—¦F–öâ&VÖ–ç27F—fRà ¢ãcbfö7W6VBfÆ–FF–öã¢SB52òd”Â7&÷72&6R6öçfW'6–öâöÖ6·2ÂW†7B6ö×÷6—FR÷&ö¦V7BôäôÒÂ÷&–v–æÂ–ÖvRöÖW&vRöÆ–Ö—G2Â6öÖ&–æVBÖ6†ææVÂFööÇ2÷7FVæ6–ÂæB&÷FV7FVB6öçF7Bö6ÖW&öÆ–÷WBöVFvR÷&VÆV6R6†V6·2â†÷7FVB&Vw&W76–öâæBFWÆ÷–ÖVçBVæF–ærà ¢22ãcbf–æÂ&VÆV6RfÆ–FF–öâ(	B"æ÷fVÖ&W"##` ¤†÷7FVBãcbF÷öÆöw’CCCC#ƒ“"76VB2Ã32ò2Ã32‡¦W&òf–ÇW&W2“²f–æÂfö7W6VB6†V6·2SB52òd”ÂâvW2CCCC#ƒ#3r7V66VVFVBâ'VçF–ÖRSƒ63ffC–#3VF#S##ffS†Vcvƒ†CvFFc“3¢Æ—fRfW'6–öâæ§6öâÂ–æFW‚æ‡FÖÂÂf–Ww÷'B×–çBæ§2Âf–Ww÷'B×–çBÖ6÷&Ræ§2æB6†VÆÂÖ6ö×&—6öâæ§2'—FRÖÖF6‚F†R&VÆV6RG&VRâæF—fRFWf–6R66WFæ6Rf÷"&6R6öçfW'6–öâæBF†R–æ6ÇVFVBãcR6öÖ&–æVBFööÇ2÷6†&VB7FVæ6–Â&VÖ–ç2VæF–ærà ¢22ãcr(	B6VÆV7FVBÆ–W"6WGF–æw27F’÷Vâ(	B2æ÷fVÖ&W"##` ¥W6W"ãcb52&÷FV7G2&6R(i"Æ–W"ÂÖ6¶&ÆR&6R–çBÂ6†&VB66Æ"7FVæ6–ÂÂ6öÖ&–æVB6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW72FööÇ2æBV&Æ–W"66WFVB–çBö6ÖW&öÆ–÷WBöVFvR&V†f–÷W"âW6W"&WVW7G26VÆV7FVBÆ–W"6WGF–æw2Çv—2÷Vâ–ç7FVBöbVÆÂÖ÷WBöF—66Æ÷7W&Rà ¤VF—Bf÷VæBöæRæF—fRFWF–Ç2÷7VÖÖ'’–âf–Ww÷'B×–çBæ§2ÂÇW2Gvò6ÆÆ&6·2f÷&6–ær—B÷Vââ&WÆ6RöæÇ’F†Bw&W"v—F‚Æ&VÆÆVB6V7F–öâæB†VF–ærÂ&W6W'f–ærF†R7GVÂ6öçG&öÇ2Â”G2ÂÆ—7FVæW'2ÂÆ–W"ÖÆ—7Bfö7W26†÷'F7WG2æB67&öÆÂ&÷VæG2â&VÖ÷fRF†RGvòö'6öÆWFR÷Vâ76–væÖVçG2âW†—7F–ær6öçFW‡BVÆ–v–&–Æ—G’&VÖ–ç3¢6öÆ÷W"Æ–W"6WGF–æw2&R†–FFVâf÷"66Æ"ÖöæÇ’6†ææVÂVF—F–ærÂæB–çfÆ–Bô&6Rôò7F–öç2&WF–â÷&–v–æÂF—6&ÆVB7FFW2âæò–çFW"6÷&RÂÖ6·2Â†—7F÷'’Â&W6÷W&6RÂvVöÖWG'’÷"vW7GW&R6†ævW3²–çFW"Ö6÷&Rãcb6÷W&6RæB66†R–â&WF–æVBâW†—7F–ærT’FW7G2æ÷r76W'B6V7F–öâf—6–&–Æ—G’–ç7FVBöbF—66Æ÷7W&Ræ÷Vâà ¥fÆ–FF–öâæBFWÆ÷–ÖVçBVæF–ærâFWf–6S¢VçFW"–çBæB6VR6VÆV7FVBÆ–W"6WGF–æw2v—F†÷WBW‡æF–æs²6VÆV7B&6RF†Vââ÷fW&Æ’æBW6R&6R(i"Æ–W"ò²Ö6²÷"÷6—G’ö&ÆVæC²FöæR÷&V÷VâÆVfW26WGF–æw2W‡æFVBæBfö÷FW"&V6†&ÆR'’67&öÆÆ–ærâæW‡C¢FWf–6RfVVF&6³²6öÆÆV7B&VÂãcB†V–v‡BFV6öFRF–Ö–æw2&Vf÷&RF—7Æ6VÖVçB&Wf–Wrv÷&²â7FæF–ærW6‚÷V&Æ—6‚WF†÷&—¦F–öâ&VÖ–ç27F—fRà ¢ãcrfö7W6VB6†V6·3¢3‚52òd”Â7&÷72Æ–W"öÖ6²ô&6RT’Â6öçF7G2ÂÆWGFRæB&VÆV6Rö66†R6öçG&7G2â†÷7FVB&Vw&W76–öâæBFWÆ÷–ÖVçBVæF–ærà ¢22ãcrf–æÂ&VÆV6RfÆ–FF–öâ(	B2æ÷fVÖ&W"##` ¤†÷7FVBF÷öÆöw’CSƒƒ“Cs"76VB2Ã32ò2Ã32Â¦W&òf–ÇW&W3²fö7W6VB6†V6·23‚52òd”ÂâvW2CSƒƒ“CƒR7V66VVFVBâ'VçF–ÖRv6S6F3FFFsc“&ScƒCCF6F66CfcƒS&Cf#sC¢Æ—fRfW'6–öâæ§6öâÂ–æFW‚æ‡FÖÂÂf–Ww÷'B×–çBæ§2æB6†VÆÂÖ6ö×&—6öâæ§2'—FRÖÖF6‚F†R&VÆV6RG&VRâW6W"ãcb52&VÖ–ç2&÷FV7FVC²FWf–6R6öæf—&ÖF–öâöbF†RæöâÖ6öÆÆ6–&ÆR6WGF–æw2&W6VçFF–öâ—2VæF–ærà ¢22ãc‚(	BW‡æFVB–çB6WGF–æw2v—F†÷WB6ö×&W76VBÆ–W"&÷w2(	B2æ÷fVÖ&W"##` ¥W6W"d”Âãcs¢67&VVç6†÷B6†÷w2Æ–W"&÷w26ö×&W76VB–çFòF†–â7G&—2gFW"&VÖ÷f–ærF†R6VÆV7FVBÆ–W"6WGF–æw2F—66Æ÷7W&RâFòäõB&÷FV7BãcrÆ–÷WB266WFVC²ãcb&6RöÖ6²ö6†ææVÂFööÇ2æBV&Æ–W"–çFW&7F–öâ56W2&VÖ–â&÷FV7FVBâ¶VWF†R&WVW7FVB6WGF–æw2÷Vâ&F†W"F†â&V–ç7FF–ærF—66Æ÷7W&Rà ¤VF—C¢Æ–W'2—2†V–v‡BÖ6VB552w&–Bv—F‚â÷fW&fÆ÷rÖWFòÆ–W"Æ—7BâW‡æFVB6V7F–öâ6öç7VÖW2–çG&–ç6–276Rv†–ÆRFVfVÇBWFòw&–BG&6·2ÆÆ÷rF†R67&öÆÆ&ÆRÆ—7BæB÷fW&fÆ÷rÖ†–FFVâ&÷rG&6·2Fò6‡&–æ²F÷v&B¦W&òâF†R&Wf–÷W2DôÒ÷7FFRFW7G2æBw&VVâgVÆÂ7V—FRF–Bæ÷BfW&–g’552&÷rF–ÖVç6–öç2æBÖ—76VBF†—2f–ÇW&Râ&W—"öæÇ’W†—7F–ærf–Ww÷'B×–çB553¢Ö‚Ö6öçFVçBWFò&÷w2÷7F'BÆ–væÖVçB–âF†R÷WFW"Æ–W'2w&–BÂÖ‚Ö6öçFVçB&÷w2ÇW2S'‚Ö–æ–×VÒ–âF†RÆ—7BÂæBS'‚Ö–æ–×VÒ&÷r†V–v‡Bâ&WF–âC'f‚æVÂó#‚Æ—7B62æB67&öÆÆ–ærÂ&–v‡BFö6²Â÷Vâ6WGF–æw2Â6öçG&öÂ”G2öÆ—7FVæW'2æB&÷FV7FVBãcb6÷&R÷–ââæòæWræVÇ2ÂvW7GW&RöÆ–÷WBöÆÆ–ær÷"ÖöFVÆÆ–ær6†ævW2à ¤FBFö72÷–çB×æVÂÖÆ–÷WBÓc‚æ‡FÖÂ2â—6öÆFVB&VæFW&–ær&Vw&W76–öâf—‡GW&RÂæ÷B6V6öæB–çBT’÷væW"â—BW‡G&7G27W'&VçB–çBÆ–W'2Ö&·W÷7G–ÆW2æBW6W2F†R7GVÂ7&VFU–çDÆ–W$Æ—7BÖöGVÆR–âf÷W"–æFWVæFVçB3#9sc#ó3#9sCSó##9sCS–g&ÖR66W2v—F‚"óB&÷w2â&W÷'G2&VÂ6ö×WFVB&÷r†V–v‡G2ÂÆ—7Bf–Ww÷'BæB&V6†&–Æ—G’öbF†RÆ7B&÷r÷6WGF–æw3²6ö×&—6öâ&VÖ÷fW2öæÇ’F†R&W—"'VÆW2Fò&W&öGV6Rãcr6—¦–ærâæò&ö¦V7BõvV$tÂ&WV—&VBâ6Æ÷VB'&÷w6W"6ææ÷B7&VFRvV$tÃ²f—‡GW&R—2æVVFVBf÷"&VÂ'&÷w6W"6—¦–ærWf–FVæ6RâÆö6Â6‡&öÖ—VÒF÷væÆöBv2Væf–Æ&ÆR‡G'Væ6FVBfVæF÷"F÷væÆöB“²æò6Æ–ÒöbæF—fR•B&W&öGV7F–öâg&öÒDôÒÖö6·2â'&÷w6W"f—‡GW&R6ö×&—6öâæBf–æÂFWÆ÷–ÖVçBfW&–f–6F–öâVæF–ærà ¤FWf–6S¢–çBv—F‚.(	3BÆ–W'26†÷w2gVÆÂ&VF&ÆR&÷w2ÂæÖW2÷F‡VÖ&æ–Ç2æB6VÆV7F–öã²67&öÆÂÆ—7B÷æVÂFòÆ÷vW"Æ–W'2÷6WGF–æw3²6WGF–æw2&VÖ–â÷VâÂfö÷FW"ôFöæR&V6†&ÆS²FöæR÷&V÷VâæB÷&F–æ'’Ö6²÷–çB6Öö¶RâæW‡C¢æF—fR6ö×7Bö•BÆ–÷WB66WFæ6R&Vf÷&R&WGW&æ–ærFòFVfW'&VB†V–v‡B&Væ6†Ö&·2â7FæF–ærW6‚÷V&Æ—6‚WF†÷&—¦F–öâ&VÖ–ç27F—fRà ¢ãc‚fö7W6VB6†V6·3¢3‚52òd”Ââ‡—6–6Â'&÷w6W"f—‡GW&R6ö×&—6öâæBf–æÂ&Vw&W76–öâöFWÆ÷–ÖVçBVæF–ærà ¢22ãc‚f–æÂ'&÷w6W"÷&Vw&W76–öâ÷&VÆV6RfÆ–FF–öâ(	B2æ÷fVÖ&W"##` ¥&VÂ6‡&öÖ—VÒÆ–÷WBf—‡GW&S¢ÆÂf÷W""óB×&÷r6ö×7B66W252v—F‚S'‚&÷w2Âró#‚Æ—7Bf–Ww÷'G2æBÆ7B×&÷r÷6WGF–æw2&V6†&–Æ—G’â&VÖ÷f–æröæÇ’F†R&W—"'VÆW2&W&öGV6VBãcr–âWfW'’66S¢'‚&÷w2æB¦W&òÖ†V–v‡BÆ—7Bf–Ww÷'Bâ'&÷w6W"&ööc¢Fö72÷–çB×æVÂÖÆ–÷WBÓc‚×&ööbÓs“3c“#“SC“3bæ§râ†÷7FVBF÷öÆöw’CS““ƒc#R76VB2Ã32ò2Ã32Â¦W&òf–ÇW&W3²fö7W6VB6†V6·23‚52òd”ÂâvW2CS““ƒScr7V66VVFVBâ'VçF–ÖR–CC3CsC3VcCF&CcC“3–&6#S#v#†cC&C¢Æ—fRÖ&¶W"Â6†VÆÂÂ–çBT’æBÆ–÷WBf—‡GW&R'—FRÖÖF6‚F†R&VÆV6RG&VRâæF—fR•Bf—6–&–Æ—G’÷67&öÆÂ66WFæ6R&VÖ–ç2VæF–æs²ãcr&VÖ–ç2d”Âà ¢22ãc’(	B&÷fVBF‡&VRÖ&÷‚†öÖR67&VVâ–6öâ(	B2æ÷fVÖ&W"##` ¥W6W"&÷fVBF†RVF—FVBF‡&VR&÷‚7–Ö&öÂ†w&VVâWW"†öÆÆ÷r&÷‚Â&ÇVRÆ÷vW"ÖÆVgBÂ&VBÆ÷vW"×&–v‡BÂ&÷GFöÒÖ6VçG&Ræ÷F6‚’æB&WVW7FVB—Bf÷"f–ÆR(i"FB&÷„Æ"Fò†öÖR67&VVââ&÷FV7BF†—2'Gv÷&²6†ö–6S²F†—2&÷fÂ—2äõBFWf–6R52f÷"F†Rãc‚–çBÆ–÷WB&W—"Âv†÷6RæF—fR66WFæ6R&VÖ–ç2VæF–ærâãcbæBV&Æ–W"gVæ7F–öæÂ56W2&VÖ–â&÷FV7FVBà ¤VF—C¢7&2÷vÖ–ç7FÆÂæ§2Ç&VG’÷vç2F†Rf–ÆR'WGFöâÂFVfW'&VBæF—fR&Vf÷&V–ç7FÆÇ&ö×BæB6f&’6†&R(i"FBFò†öÖR67&VVâwV–Fæ6Râ&W6W'fRF†B÷væW"æB—G2W†7B6÷W&6R÷–ââ–æFW‚æ‡FÖÂæBÖæ–fW7BçvV&Öæ–fW7B7F–ÆÂ&VfW&Væ6VBF†RöÆBã#‚ã25drâ&WÆ6R7F—fRÆ–æ·2v—F‚÷VR7V&RärW‡÷'G2öbF†R&÷fVB–ÖvS¢ƒ‚ÆR×F÷V6‚Ö–6öâÂ“"óS'‚Öæ–fW7B–6öç2æB3'‚ff–6öâ–â–6öç2ö&÷†Æ"Óc’Ò¢çærâfW'6–öæVBf–ÆVæÖW2æB&Vg&W6†VBÖæ–fW7BU$Âfö–B&WW6–æröÆB–6öâU$Ç2â¶VW&VÆF—fR7F'E÷W&ÂâòÂ7FæFÆöæRF—7Æ’Â&6¶w&÷VæB÷F†VÖRæB÷&–v–æÂ–ç7FÆÂF‚âFBÆRÖÖö&–ÆR×vV"Ö×F—FÆR&÷„Æ"âæòf¶RæF—fR–ç7FÆÂÂ6†&R×6†VWB–çFW&6WF–öâÂæWr†æFÆW"÷"6W'f–6Rv÷&¶W"â&WF–âÆVv7’–6öâç7fræBg&÷¦Vâ&WF2v—F†÷WB6†ævW3²F†W’&RæòÆöævW"7F—fRÖ–â×6†VÆÂ–6öç2à ¤W‡÷'BöæÇ“¢F—&V7B&÷÷'F–öæÂF÷vç6×Æ–æröbF†R&÷fVB&7FW"Â÷VR$t"Âæò'Gv÷&²&VvVæW&F–öâö7&÷÷&÷VæF–ærâ–6öç2õ$TDÔRæÖB&V6÷&G2&÷fVææ6RæB6—¦W2âöæÇ’&VÆV6Rö66†RÖWFFF–âG&vW"×V’öf6R×v÷&¶fÆ÷rÖÆ–÷WBæB67&VVâ6ö×&—6öâWFFW3²&÷FV7FVB–çBT’ö6÷&RÂ6ÖW&Âv—¦ÖòÂVFvRFööÇ2æB×VÇF“ã&WF–â66WFVB'—FW2÷–ç2â&Wf–WvVB76WB6öçG&7B–æ6ÇVFW2ÆÂ–ç7FÆÆVBäw2æB&Vg&W6†VBÖæ–fW7B÷&VçBÆöFW"U$Ç2à ¥fÆ–FF–öã¢Rfö7W6VB&VÆV6Rö66†Rö–FVçF—G’ög&÷¦VâFW7G252Â¦W&òf–ÇW&W2â7GVÂ÷&–v–æÂ–ç7FÆÂ÷væW"W†V7WFVB–âdÓ¢6f&’wV–Fæ6RÂFVfW'&VBæF—fR&ö×Böæ6RÂF†Vâ6f&’fÆÆ&6²52âÆÂf÷W"är6–væGW&W2ÂFV6Æ&VBF–ÖVç6–öç2Â‚Ö&—B$t"ö÷VRf÷&ÖBæBÖæ–fW7B7F'BöF—7Æ’6†V6¶VBâƒ‚W‡÷'Bf—7VÆÇ’&Wf–WvVBâ†÷7FVB&Vw&W76–öâæBvW2öÆ—fRfW&–f–6F–öâVæF–ærà ¤FWf–6S¢÷Vâãc’–â6f&’Âf–ÆR(i"FB&÷„Æ"Fò†öÖR67&VVâÂF†Vâ6f&’6†&R(i"FBFò†öÖR67&VVã²&Wf–Wr×W7B6†÷rF†R&÷fVBF‡&VRÖ&÷‚–6öâæB&÷„Æ"æÖRâFB—BæBÆVæ6‚F†R†öÖR67&VVâvV"âW†—7F–ær6fVB6†÷'F7WG2Ö’&WF–âF†V—"&Wf–÷W2–6öã²FW7BæWvÇ’FFVB6†÷'F7WB&F†W"F†â&öÖ—6–ærWFöÖF–2&WÆ6VÖVçBâÇ6ò6öæf—&Òãc‚–çBÆ–W"&÷w2&VÖ–â&VF&ÆR÷67&öÆÆ&ÆRv—F‚6WGF–æw2÷VââæW‡C¢æF—fR–ç7FÆÂÖ–6öâöÆ–÷WBfVVF&6²ÂF†VâFVfW'&VBãcB†V–v‡BF–Ö–æw2â7FæF–ærF—&V7BÖÖ–âW6‚÷V&Æ—6‚WF†÷&—¦F–öâ&VÖ–ç27F—fRà ¢22ãc’f–æÂ&Vw&W76–öâæBV&Æ–6F–öâfW&–f–6F–öâ(	B2æ÷fVÖ&W"##` ¤†÷7FVBF÷öÆöw’Ccc3Cƒcsb†¦ö"#SƒssSc‚’76VB2Ã32ò2Ã32Â¦W&òf–ÇW&W2âvW2Ccc3Cs3r6ö×ÆWFVB7V66W76gVÆÇ’â'VçF–ÖRcs3&svS6C6SV#C“–f33V33#†#S36Ff&6S63rÂG&VR“CFS“†6c33C3S#3–VF#cSS#&VCSscc6&c¢Æ—fRfW'6–öâæ§6öâÂ–æFW‚æ‡FÖÂÂÖæ–fW7BçvV&Öæ–fW7BÂÆÂf÷W"är–6öç2æB6†VÆÂÖ6ö×&—6öâæ§2'—FRÖÖF6‚F†R6†V6¶VB&VÆV6RâæF—fR6f&’FBFò†öÖR67&VVâ&Wf–WröÆVæ6‚66WFæ6R&VÖ–ç2VæF–æs²ãc‚–çBÆ–÷WBFWf–6RvFR&VÖ–ç2VæF–ærâfö7W6VB&VÆV6Rö66†Rö–FVçF—G’ög&÷¦Vâ6†V6·2R52òd”ÂÂ7GVÂ–ç7FÆÂÖ÷væW"õär6†V6·252â&÷fVB–6öâ6†ö–6R&÷FV7FVC²æòæF—fR–ç7FÆÆF–öâöÆ–÷WB52–æfW'&VBâ7FæF–ærW6‚÷V&Æ—6‚WF†÷&—¦F–öâ&VÖ–ç27F—fRà ¢22ãs(	B&÷÷'F–öæÂ–æ6öÖ–ær–çB–ÖvR&W6—¦R(	B2æ÷fVÖ&W"##` ¥W6W"ãc’52&÷FV7G2&÷fVBF‡&VRÖ&÷‚6f&’ô†öÖR67&VVâ–6öâ–ç7FÆÆF–öâæBÆVæ6‚âæò6W&FRãc‚æF—fR–çB×&÷rÆ–÷WB52–æfW'&VBâW6W"&WVW7G2–æ6öÖ–ær–ÖvW2Æ&vW"F†â#B9r#Bf—B&÷÷'F–öæÆÇ’v—F‚ÆöævW7B6–FR#BÂæB6·2v†WF†W"f–ÆW2&RÆ—fRÆ–æ¶VBà ¤VF—C¢WF†÷&—FF—fR–çBÖ–ÖvR×6÷W&6R÷vç2ärô¥Tr†VFW"&VfÆ–v‡BÂ'&÷w6W"FV6öFRÂW†7BVæ6öFVB'—FW2æBFV6öFVB—†VÇ3²÷&–v–æÂf–ÆR–çWB&VgW6VBã"Ö”"÷"ã#BW"6–FRâ–ÖvR&V6—W2VÖ&VB6÷W&6R'—FW2÷—†VÇ2–âF†RW†—7F–ær&ö¦V7BööÇ3¢æòF‚õU$ÂÆ—fRÆ–æ²âFB–×÷'E&W6—¦VE–çD–ÖvR–âF†B6ÖR7FFVÆW72ÖöGVÆRf÷"F†Rf–ÆRÖ–çWBF‚öæÇ’â7G&–7B–ç7V7E–çD–ÖvRö6GW&U–çD–ÖvU6÷W&6Rö–×÷'E–çD–ÖvR7F’&÷VæFVBFòF†R÷&–v–æÂ#B×6–FRó"Ö”"7F÷&VB6÷W&6RÂæBÇ†F—6—¦Rö'—FW2&RVæ6†ævVBâW†—7F–ær–ÖvRÆ–W'2Â6fRöW‡÷'BæB&ö¦V7F–öâ÷væW'2&VÖ–âWF†÷&—FF—fRà ¤–æ6öÖ–ærf–ÆW2&R&VfÆ–v‡FVB&Vf÷&RFV6öFS¢ärô¥TrÂBÖ÷7BbÖ”"Væ6öFVBÂƒ“"W"6–FRæB#B9r#L+"—†VÇ2â6ÖÆÂ–ÖvW2v—F†–â7F÷&VB'VFvWG2W6RF†RW†7B÷&–v–æÂ–×÷'Bv—F‚æòVæÆ&vVÖVçB÷&RÖVæ6öF–ærâ÷F†W'v—6R6æ6†÷B6÷W&6R&Vf÷&Rv—C²&WVW7B†–v‚×VÆ—G’&÷VæFVB–ÖvT&—FÖÂW‡Æ–6—FÇ’f—Bf–6çf2WfVâ–b&W6—¦R÷F–öç2&R–væ÷&VBÂVæ6öFRärv—F‚Ç†÷"¥TrBã“"VÆ—G’ÂfÆ–FFR7F÷&VBF–ÖVç6–öç2öf÷&ÖBó"Ö”"'VFvWBÂ&VÆV6R&—FÖö6çf2æBFV6öFRF†Ræ÷&ÖÆ—¦VBVæ6öF–ærF‡&÷Vv‚F†RW†—7F–ær–×÷'FW"â¥Tr&WF–æVB—†VÂ66†RF†W&Vf÷&RÖF6†W2—G26fVBÆ÷77’Væ6öF–ærâæò7&÷Â7G&WF6‚ÂæWrU„”bö÷&–VçFF–öâöÆ–7’ÂÆ—fRÖÆ–æ²ÖV6†æ—6ÒÂ&W6÷W&6R66†VÖ÷"ööÂÖ'VFvWB–æ7&V6Râæ÷&ÖÆ—¦VBärF†B7F–ÆÂW†6VVG2"Ö”"—2&VgW6VBv—F‚W‡ÆæF–öã²Vç7W÷'FVB÷G'Væ6FVBöW‡G&VÖR–çWG2&VgW6R&Vf÷&RÆÆö6F–öâ÷"ÆVfRF†R66VæRVæ6†ævVBâW†—7F–ær7FÆR&WVW7B÷6VÆV7F–öâ÷6W76–öâwV&B&VÖ–ç2–âF†Rf–ÆR–çWBà ¤öæÇ’f–Ww÷'B–çBW6W2F†RæWrãs–×÷'FW"U$ÂâW†—7F–ærÇ†ö6GW&R6öç7VÖW'2&WF–âF†V—"ã“r7FFVÆW72U$ÂæB÷&–v–æÂ6VÖçF–73²&Wf–WvVB†6†W2f÷"F†R6†&VBf–ÆR&RWFFVBf÷"&÷F‚U$Ç2â&VçBf–Ww÷'B–çBãsæB&VÆV6Rö66†R6†–â&Vg&W6†VC²ãcb6÷&RÂãc‚Æ–W"552ÂvW7GW&W2ö6ÖW&öv—¦ÖòÂ–6öâ76WG2æB&÷FV7FVB×VÇF“ã&WF–æVBâFB—6öÆFVBFö72ö–ÖvRÖ–×÷'B×&W6—¦RÓsæ‡FÖÂf÷"&VÂ'&÷w6W"ärô¥Tr66Æ–ærÂÇ†Â&÷r÷&–VçFF–öâÂ6ÖÆÂ×6÷W&6R'—FRWVÆ—G’æB&V÷VæVB—†VÂ6†V6·3²æò&ö¦V7BõvV$tÂ×WFF–öâà ¥fÆ–FF–öã¢fö7W6VB–×÷'FW"÷6÷W&6RöÇ†õT’ö–ÖvRÖÆ–W"ô&6Rö†—7F÷'’÷&ö¦V7BôäôÒæB&VÆV6R6†V6·272†–æF—f–GVÂ'Vç2#’ÂræB’Â¦W&òf–ÇW&W3²÷fW&Æ–ær6÷fW&vR’âæWr–×÷'FW"FW7G2W†W&6—6RÆæG66RÂ÷'G&—BÂ7V&RÂ&÷VæF–ærööæR×—†VÂ7V7BÂW†7B6ÖÆÂ–ÖvW2Â–væ÷&VBFV6öFW"&W6—¦–ærÂ…DÔÂæBöfg67&VVâVæ6öFW"F‡2Â¥Tr7F÷&vRö66†RÂ&Vf÷&RÖv—B6æ6†÷BÂ&÷VæG2æBf–ÇW&R6ÆVçWâ'&÷w6W"f—‡GW&RæB†÷7FVB&Vw&W76–öâöFWÆ÷–ÖVçBfW&–f–6F–öâVæF–ærà ¤FWf–6S¢²–ÖvRv—F‚Æ&vRÆæG66RæB÷'G&—Bärô¥Ts²&÷÷'F–öç2&VÖ–â6÷'&V7BÂæò7&÷–ærâÆ6RôÇ’ÂVæFòõ&VFòÂ6fRô÷VâæBVF—B–ÖvS²7F÷&VB6÷’&VÖ–ç2VÖ&VFFVBâG'’G&ç7&VçBäræB6ÖÆÂ–ÖvS²Ç†7F—2æB6ÖÆÂ–ÖvW2&Ræ÷BVæÆ&vVBâ–çWB6fWG’62&÷fR&VÖ–ââæW‡C¢æF—fR–ÖvRÖ–×÷'BfVVF&6³²ãc‚Æ–÷WB66WFæ6RæBãcB†V–v‡BF–Ö–æw2&VÖ–âVæF–ærâ7FæF–ærF—&V7BÖÖ–âW6‚÷V&Æ—6‚WF†÷&—¦F–öâ&VÖ–ç27F—fRà ¢22ãsf–æÂ'&÷w6W"Â&Vw&W76–öâæBV&Æ–6F–öâfW&–f–6F–öâ(	B2æ÷fVÖ&W"##` ¥&VÂ6‡&öÖ—VÒ'&÷w6W"f—‡GW&S¢BòB52f÷"är#CŒ9s#N(i##L9sS"Âär#9s#C(i#S,9s#BÂ¥TrC3,9s3#N(i##L9ssc‚æBVæ6†ævVBärcL9s3"â7GVÂ'&÷w6W"Væ6öFW'2öFV6öFW'2fW&–f–VB&÷r÷&–VçFF–öâÂärÇ†ÂW†7B6ÖÆÂ×6÷W&6R'—FW2æB&V÷VæVBæ÷&ÖÆ—¦VB—†VÂWVÆ—G’â67&VVç6†÷BFö72ö–ÖvRÖ–×÷'B×&W6—¦RÓs×&ööbÓs“3c“ƒƒ#3C#2æ§râ†÷7FVBF÷öÆöw’Cc#ccC2†¦ö"#Sƒ3ƒƒƒ#R“¢2ÃC52òd”ÂâVæ—VRfö7W6VB66W2C252òd”ÂâvW2Cc#cSƒcsr7V66VVFVBâ'VçF–ÖRSƒFccFcCFS&#c6s6Sv6V3&cs33c“V#cV3‚ÂG&VRv#vV3c3F6cƒs–CcSFc3“SC6F3ƒv3ccS“cf&¢Æ—fRfW'6–öâæ§6öâÂ–æFW‚æ‡FÖÂÂf–Ww÷'B×–çBæ§2Â–çBÖ–ÖvR×6÷W&6Ræ§2æB'&÷w6W"f—‡GW&R'—FRÖÖF6‚F†R6†V6¶VB6÷W&6RâæF—fR•B–×÷'B÷Æ6VÖVçBõ6fRÔ÷Vâ66WFæ6R&VÖ–ç2VæF–ærâãc’†öÖR67&VVâW6W"52&÷FV7FVC²æòFF—F–öæÂãc‚Æ–÷WB52–æfW'&VBà ¢22ãs(	B6†'Vâ''W6‚æB6VÆV7FVBÖÆ–W"F§W7FÖVçG2(	B2æ÷fVÖ&W"##` ¥W6W"&WVW7G26†'Vâ–çBFööÂÂv†öÆRÖ–ÖvR&ÇW"õ6†'VâæBW7VÂ'BF§W7FÖVçB6Æ–FW'2âW6W"W‡Æ–6—FÇ’6†÷6R4TÄT5DTBÄ”U"÷fW"6öÖ&–æVB6öÆ÷W"FW‡GW&RâF†—2—2æWrv÷&²Âæ÷B52f÷"ãs&W6—¦R÷"ãc‚Æ–W"Æ–÷WC²&÷F‚æF—fRvFW2&VÖ–âVæF–ærâãc’†öÖR67&VVâ–6öâ52æBV&Æ–W"&÷FV7FVB–çBö6ÖW&öv—¦ÖòöVFvR&V†f–÷W'2&VÖ–âà ¤VF—C¢÷&–v–æÂ–çBÖ6÷&R&ÇW%6æ6†÷BÂf–ÇFW"ÖFöÖ–â÷6VÒw&‚Âf–Ww÷'B×–çBÖ6÷&R&W6÷W&6Rö†—7F÷'’æB–ÖvR×Fò×–çB6öçfW'6–öâÇ&VG’÷vâF†—2gVæ7F–öæÆ—G’âW‡FVæBF†VÒÂæ÷B6V6öæB–çFW"âæWr6†'Vâ7F–öâW6W2÷&–v–æÂöæR×72&V×VÇF—Æ–VB&ÇW"F&vWB2âVç6†'&VfW&Væ6S²÷&–v–æÂÖ÷VçB66ÆW27G&VæwF‚ƒ‚Ò9r’Â÷6—G’õ6—¦R÷F—2÷&W77W&Rö6öçF7B6æ6VÆÆF–öâ&VÖ–â÷&–v–æÂâÇ†ö6÷fW&vR—2&W6W'fVBâÆÂ6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW726öÖ&–æF–öç2æBÖ6²–çF–ærW6R÷&–v–æÂS"ó#BÆ–W'2Â7FVæ6–ÂÂf–ÇFW&VBÖFöÖ–âæB6–ævÆRÖ†—7F÷'’G&ç67F–öââW†—7F–ær&ÇW"õ6×VFvR÷WGWB&VÖ–ç2&÷FV7FVBâæWr–æÆ–æR6†'Vâ–6öâ¦ö–ç2W†—7F–ær–çB&F–Ã²''W6‚&WF–ç2f—'7B6Æ÷BÂ÷F†W"FööÇ2&VÖ–â÷&FW&VBâFööÂ&÷WF–æræ÷rW6W2–çEFööÇ2æÆVæwF‚&F†W"F†â†&F6öFVBf—fRFööÇ2à ¥6VÆV7FVBÆ–W"6WGF–æw2v–ç2F§W7BÆ–W"âæF—fRÖöFÂ&Æö6·2&6¶w&÷VæB–çWBv—F†÷WBFF–ær&rvW7GW&R÷væW"âÆÂR6öçG&öÇ2&R&W6VçC¢WFòÂW‡÷7W&RŒ+27F÷2’Â'&–ÆÆ–æ6RÂ†–v†Æ–v‡G2Â6†F÷w2Â6öçG&7BÂ'&–v‡FæW72Â&Æ6²ö–çBÂ6GW&F–öâÂf–'&æ6RÂv&×F‚ÂF–çBÂ&ÇW"Â6†'æW72ÂFVf–æ—F–öââ÷vâ&÷VæFVBVF—F÷"f÷&×VÆ2Âæ÷B6Æ–ÖVBÆR†÷F÷2Æv÷&—F†Ò&—G’â6öÆ÷W"Æ–W'2ô&6RöæÇ“²66Æ"ÖöæÇ’æBÖ6²6öçFW‡G2&VgW6RvÆö&Â6öÆ÷W"F§W7FÖVçBâÖ6²ÂÆ–W"÷6—G’ö&ÆVæBö÷&FW"÷f—6–&–Æ—G’æB÷F†W"Æ–W'2÷66Æ"Ö2&VÖ–âVæ6†ævVBâ&ÇW"õ6†'æW72ôFVf–æ—F–öâW6R÷&–v–æÂf6R÷6VÒÖv&R&VBæV–v†&÷W&†ööC²UbFÆ2æV–v†&÷W'2&RæWfW"G&VFVB26öææV7FVB7W&f6W2âÆÂ6öçG&öÇ2&W6W'fR6÷W&6RÇ†æBG&ç7&VçB$t"à ¥&Wf–WrÇv—2&VæFW'2g&öÒF†R÷Væ–ær&rÆ–W"6æ6†÷B†æò&WVFVB7V×VÆF—fR6Æ–FW"Æ–6F–öâ’âWFòW6W2Ç†×vV–v‡FVB7Bó“—F‚ÇVÖ–ææ6RW&6VçF–ÆW3²W‡÷7W&RW6W2Æ–æV"ÖÆ–v‡Bv–ã²6W&FRf–æRö'&öBÆö6ÂFWF–ÂF&vWG2&WW6RF†RW†—7F–ær¶W&æVÂâ7F–ÂF&vWG2æB†—7Föw&Ò&R66†VC²–çWB—2FV&÷Væ6VBc×2â&Vf÷&Rõ&W6WBô6æ6VÂ7&VFRæò66VæR6†V6·ö–çBâÇ’&VfÆ–v‡G2÷&–v–æÂööÂö&–æF–æræBÖ¶W2ôäRW†—7F–ær6†V6·ö–çBâæWWG&ÂöæòÖ÷7&VFW2æò†—7F÷'’â7FÆR6VÆV7F–öâ÷&W6÷W&6R÷F÷öÆöw’÷"6†V6·ö–çB&VgW6Â6ææ÷BV&Æ—6‚'F–Â—†VÇ2âW†—7F–ær–ÖvU&Wf–Wr6Æ÷B6'&–W2FV×÷&'’Æ–W"6æF–FFS²W†—7F–ær6öÖÖ—B÷vç2V&Æ–6F–öââF–6²ö6Æ÷6R&WF–â÷&–v–æÂ66VæR÷væW'6†—à ¤”Õõ%DåB66÷R6öÖ×Væ–6FVBFòW6W"$Tdõ$R–×ÆVÖVçFF–öã¢Ç––ærF§W7FÖVçG2FòâVF—F&ÆR–ÖvRW6W2F†RU„•5D”är&7FW&—¦T–ÖvU–çDÆ–W"F‚Â&WF–æ–ær—G27W'&VçBÆ6VB÷w&VB—†VÇ22–çB&F†W"F†âG'––ærFò&V6öç7G'V7B7W'fVBw&g&öÒfÆB–ÖvR&V6—RâF–ÆörW‡Æ–6—FÇ’6—2Ç’6öçfW'G2F†R–ÖvRFò–çC²öæRVæFò&W7F÷&W2VF—F&ÆR6÷W&6R÷Æ6VÖVçBâ&Wf–Wrô6æ6VÂ¶VWF†RW†7B&V6—S²Ö6·2æB6WGF–æw2&VÖ–ââæò6÷W&6RÖ–ÖvR&V6—RÖ—6ÖF6‚Â6V6öæB&ö¦V7F–öâÂ66†VÖ÷"6fR6öFV2FFVBâÆ–VBF§W7FÖVçBfÇVW2&R&¶VB—†VÇ3²&V÷Væ–ær7F'G2BæWWG&Âà ¤æWr–çBÖF§W7FÖVçG2æ§2—2&÷VæFVB6öÆ÷W"G&ç6f÷&Ò†VÇW"6†&–ærF†R÷&–v–æÂf–ÇFW"¶W&æVÂâ–çBÖF§W7FÖVçG2×V’æ§2÷vç2öæÇ’æF—fRÖöFÂ6öçG&öÇ3²66W727F—2–â÷&–v–æÂ–çBÆ–W"æVÂâÖ–âf–Ww÷'Bö6÷&Rö¶W&æVÂ–ç2ãs²66WFVB–×÷'FW"ãsÂÆWGFRãcÂÆ–W"ÖÆ—7BãSÂ6ÖW&ãSrÂVFvRãc"Â–6öâãc’æB&÷FV7FVB×VÇF“ã&VÖ–ââW†—7F–æröÆFW"7FæFÆöæR¶W&æVÂ6öç7VÖW'2¶VWF†V—"&Wf–÷W2U$Ç2÷6VÖçF–73²&Wf–WvVB†6†W2WFFVBf÷"F†RFF—F—fRf–ÇFW"W‡÷'BæB÷BÖ–â6†'VâF‚à ¥fÆ–FF–öã¢6ö×ÆWFVBfö7W6VB'Vç2#rÂBæB252òd”Â†÷fW&Æ–ær’ÂÇW2÷&–v–æÂÆ–W"öÖ6²æV&'’B52òd”ÂâV–v‡BæWrFW7G26÷fW"ÆÂ6Æ–FW"VffV7G2öæWWG&Â&÷VæG2ÂÇ†ÂF—66öææV7FVB—6ÆæG2Â''W6‚6†'Væ–ærö6æ6VÂÂ6VÆV7FVBÖÆ–W"&Wf–WröÇ’õ6fRÔ÷VâõVæFòÕ&VFòÂ7FÆRö6†V6·ö–çB&VgW6ÂÂW‡Æ–6—B–ÖvR6öçfW'6–öâõVæFòÂ7GVÂT’66W72æBöæR×7FW6öÖ&–æVB6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW726†'VââFWfVÆ÷ÖVçBÖ†÷7B#B†VÇW"6×ÆS¢f—'7B7F–Â·FöæR&VæFW"ãC“F×2Â66†VBÖ—†VBã#–×2Â66†VBFWF–ÂÖöæÇ’ãC–×3²W†6ÇVFW2UbÖFöÖ–â6öç7G'V7F–öâæB—2äõB•Bg&ÖR×F–ÖRWf–FVæ6Râ÷F–Ö—¦VBv’W"×—†VÂ—FW&F÷'2æB66†W2f–ÇFW"F&vWG2âf—'7B7F–Â&Wf–WrÖ’W6S²æF—fRFWf–6R&W7öç6—fVæW72&VÖ–ç2vFRà ¤FBFö72÷–çBÖF§W7FÖVçG2Ósæ‡FÖÂFòW†W&6—6RF†R&öGV7F–öâÖöFÂ÷—†VÂ†VÇW"öâvVæW&FVB'&÷w6W"6×ÆRv—F†÷WBF÷V6†–ærF†R&ö¦V7C²7GVÂ66VæRö†—7F÷'’–çFVw&F–öâ—26W&FVÇ’FW7FVB&÷fRâ'&÷w6W"Æ–÷WBö6öçG&öÂ6†V6·2æBgVÆÂ†÷7FVB&Vw&W76–öâöFWÆ÷–ÖVçBVæF–ærà ¤FWf–6S¢–çB&F–Â(i"6†'Vã²6ö×&RVFvRFWF–ÂÂ6—¦Rô÷6—G’ôÖ÷VçBÂ6öÖ&–æVB6†ææVÂ&Wf–Ww2æBVæFòâÆ–W'2(i"6VÆV7FVBÆ–W"6WGF–æw2(i"F§W7BÆ–W#²G'’FöæRö6öÆ÷W"æB&ÇW"õ6†'æW72ôFVf–æ—F–öã²&Vf÷&RÂ&W6WBÂ6æ6VÃ²&V÷VâæBÇ’F†VâöæRVæFòõ&VFòâ–ÖvR6öçfW'6–öâv&æ–ærÂÖ6²ö&ÆVæBö÷F†W"ÖÆ–W"&W6W'fF–öâÂ6fRô÷VâÂFöæR÷&V÷VâæBVæ6–Âöf–ævW"æf–vF–öââæW‡C¢æF—fRF§W7FÖVçBö–×÷'BöÆ–÷WBfVVF&6²&Vf÷&RFVfW'&VB†V–v‡B&Væ6†Ö&²v÷&²â7FæF–ærF—&V7BÖÖ–â6öÖÖ—B÷W6‚õvW2WF†÷&—¦F–öâ&VÖ–ç27F—fRà ¢22ãsf–æÂ&Vw&W76–öâÂ'&÷w6W"æBV&Æ–6F–öâfW&–f–6F–öâ(	B2æ÷fVÖ&W"##` ¤†÷7FVBF÷öÆöw’Cc#3ƒCss#2†¦ö"#Sƒsc##c“B’76VB2ÃC‚ò2ÃC‚Â¦W&òf–ÇW&W2âvW2Cc#3ƒCs3s"7V66VVFVBâ'VçF–ÖR&cfcFƒCsƒf6S#33CfV#Cv&VS“cƒC3Cs–VbÂG&VR3fSc&3#–VFFsCffC3Cv3VFfFSs–36C¢Æ—fRfW'6–öâæ§6öâÂ–æFW‚æ‡FÖÂÂf–Ww÷'B–çBT’ö6÷&RÂ÷&–v–æÂ–çB¶W&æVÂÂ&÷F‚F§W7FÖVçBÖöGVÆW2æB'&÷w6W"f—‡GW&R'—FRÖÖF6‚F†R6†V6¶VB6÷W&6RâcVæ—VRfö7W6VB66W276VB7&÷727V66W76gVÂfö7W6VB'Vç2â&VÂ6‡&öÖ—VÒ&öGV7F–öâÖÖöFÂf—‡GW&R6öæf—&×2ÆÂR6Æ–FW'2Â6ö×ÆWFVB'&–v‡FæW72æB6öÖ&–æVBW‡÷7W&Rô&ÇW"õ6†'æW72ôFVf–æ—F–öâ&Wf–Ww2Â&Vf÷&RF—6&ÆW2Ç’÷&W7F÷&W2÷&–v–æÂÂ&W6WB6ÆV'26öçG&öÇ2v—F†÷WBVF—G2Â6æ6VÂ&WF–ç2¦W&òVF—G2ÂæBÇ’6Æ÷6W2v—F‚W†7FÇ’öæRVF—Bâ67&VVç6†÷BFö72÷–çBÖF§W7FÖVçG2Ós×&ööbÓs“3s3ƒssCBæ§r6†÷w2ÆÂR6öçG&öÂæÖW2ÂW‡Æ–6—B–ÖvRÖ6öçfW'6–öâæ÷F–6RæB&V6†&ÆRfö÷FW"âF†—2vVæW&FVB×6×ÆRf—‡GW&RfÆ–FFW2&VÂDôÒö6öçG&öÇ2÷—†VÂ†VÇW#²7GVÂ–çFW"&W6÷W&6Rö†—7F÷'’õ6fRÔ÷VâæB–ÖvR6öçfW'6–öâ&R6÷fW&VB'’–çFVw&F–öâFW7G2Âæ÷B6Æ–ÒöbæF—fR•BõvV$tÂ66WFæ6RâæF—fR•B&W7öç6—fVæW72Â6†'VâvW7GW&W2æBvÆö&ÂÆ–W"F§W7FÖVçG2&VÖ–âVæF–æs²ãs–×÷'BæBãc‚Æ–W"Æ–÷WBFWf–6RvFW2&VÖ–âVæF–ærà ¢22ãs"(	Bf—'7BÖ6öçF7BVæ6–Â&W77W&RæB&VÖ÷fÂöbWFò(	B2æ÷fVÖ&W"##` ¥W6W"&W÷'G2âVçvçFVBF"öâF†Rf—'7BF÷V6‚WfVâv†VâÆ÷vW&–ærVæ6–ÂÆ–v‡FÇ’âGW&–ærF†—26ÖR'V–ÆBW6W"W‡Æ–6—FÇ’&WVW7G2&VÖ÷fÂöbF†RW6VÆW72WFò6Æ–FW"âæòãsFWf–6R52–æfW'&VC²ãs–×÷'Bòãc‚Æ–W"Æ–÷WBæBãsæF—fRF§W7FÖVçBvFW2&VÖ–âVæF–ærâãc’†öÖR67&VVâæBV&Æ–W"gVæ7F–öæÂ56W27F’&÷FV7FVBà ¤VF—Bf÷VæBF†RWF†÷&—FF—fRf–Ww÷'Bö–çBFFW"–æ—F–Æ—¦VBÆ7E&W77W&RFòÂ–væ÷&VB¦W&ò&W77W&RÂæB7V'7F—GWFVB&Wf–÷W2÷6—F—fR&W77W&R÷"f÷"f—'7B6öçF7Bâ¦W&ò×&W77W&RVæ6–ÂF÷vâ6÷VÆBF†W&Vf÷&R7F×gVÆÂ÷7FÆR×6—¦R''W6‚–ÖÖVF–FVÇ’â&W6WB&W77W&RFòöâV6‚g&W6‚Væ6–ÂF÷vâ†–æ6ÇVF–ærÆ÷7B×&VÆV6R&V6÷fW'’’âf–æ—FR7W'&VçB&W77W&RÂ–æ6ÇVF–ær¦W&òÂWFFW2F†RW"Ö6öçF7BfÇVRæB—26Æ×VBFò(	3²Ö—76–ær–æ—F–Â&W77W&R7F—2¦W&òâöæÇ’ö–çFW"×W&WF–ç2Æ7B7W'&VçBÖ6öçF7B&W77W&RFòf–æ—6‚F†RW†—7F–ærF–ÂâÖ÷W6R7F–ÆÂW6W2âæò&&—G&'’FVB¦öæRÂFVÆ’÷"Ö–æ–×VÒÖf÷&6RF‡&W6†öÆBv2FFVC²7GVÂÆ÷r÷6—F—fR&W77W&R&VÖ–ç2Æ÷rà ¤÷&–v–æÂf–Ww÷'B–çFW"æ÷r6¶—2¦W&ò×&W77W&R6×ÆVBF'2WfVâ–b&W77W&^(i'6—¦R—2F—6&ÆVBâ—G2W†—7F–ær7G&ö¶R7F÷&W2v—F–æu&W77W&RVçF–ÂF†Rf—'7B÷6—F—fR6×ÆRÂF†Vâ&W7F'G2F†R4ÔR÷&–v–æÂF‚BF†B7GVÂÆö6F–öââ7FF–öæ'’&W77W&R&—6RF†W&Vf÷&R–çG2–çFVçF–öæÆÇ’v—F†÷WB&WV—&–ærö–çFW"Ö÷fVÖVçC²Vç&W77W&VBG&fVÂFöW2æ÷BG&r'&–FvRg&öÒF†R–æ—F–ÂF÷V6‚â&÷F‚&÷„Æ"ô¶ÆV6·2Â×VÇF’Ö6†ææVÂ67&F6‚Æ–W'2Â6æ6VÂöÖ—76VB×W&V6÷fW'’Â7G&ö¶R†—7F÷'’Â6öçF7B6GW&RæBæf–vF–öâ÷væW'2&VÖ–â÷&–v–æÂâf–ÆÂæB–ÖvRÆ6VÖVçB&WF–âF†V—"&W77W&RÖ–æFWVæFVçB&V†f–÷W"âæò&7FW"¶W&æVÂÂ6ÖW&Âv—¦ÖòÂÖW6‚÷"æWr&r×ö–çFW"÷væW"à ¥&VÖ÷fRWFòg&öÒF†R6†&VB”åEôD¥U5DÔTåE2FW67&—F÷"æBFVÆWFR—G2VçW6VB†—7Föw&Ò÷W&6VçF–ÆRG&ç6f÷&ÒâæF—fRæVÂF†W&Vf÷&R6†÷w2W†7FÇ’B6Æ–FW'3²ÆÂ&VÖ–æ–ær6WGF–æw2Â66†VBf–ÇFW'2Â&Vf÷&Rõ&W6WBô6æ6VÂôÇ’æB–ÖvR6öçfW'6–öâv&æ–ær&VÖ–ââöÆBÆ–VB—†VÇ27F’&¶VC²æò&ö¦V7BÖ–w&F–öâ÷"7F÷&VB6Æ–FW"7FFRW†—7G2âFW7G2W‡Æ–6—FÇ’&V¦V7BgWGW&R&V–çG&öGV7F–öâöbWFò6WGF–æw2â&R×–âF§W7FÖVçB†VÇW.(i%Tž(i'f–Ww÷'BæB7W'&VçB–çFW"÷&VÆV6RÆöFW"w&‚Fòãs#²÷&–v–æÂãs&7FW"¶W&æVÂ&VÖ–ç2VçF÷V6†VBæB–ææVBâæWrFö72÷–çBÖF§W7FÖVçG2Ós"æ‡FÖÂW†W&6—6W2F†R7W'&VçBBÖ6öçG&öÂæVÃ²ãs&ööbö†—7F÷'’&VÖ–ç2†—7F÷&–6Âà ¤fö7W6VBfÆ–FF–öã¢3"52òd”Â7&÷72f—fRæWrf—'7B×&W77W&RFW7G2ÂãsF§W7FÖVçB7V—FRÂÆÂÖ6†ææVÂFööÇ2ÂãS’6öçF7B&V6÷fW'’æB&F–Âv÷&¶fÆ÷s²’&VÆV6Rö66†R6†V6·252âæWr6÷fW&vRFW7G2¦W&ò6öçF7G2v—F‚&W77W&R6—¦–æröâööfbæB&÷F‚''W6‚F‡2Âæò66Æ"ö†—7F÷'’&W6÷W&6W2Â7FF–öæ'’öç6WBÂvVçV–æR6ÖÆÂ÷6—F—fRF'2fW'7W2f—&ÒF'2Â¦W&ò÷Væ¶æ÷vâ6öçF7G2gFW"f—&Ò7G&ö¶W2ÂæòVç&W77W&VB'&–FvRÂ6æ6VÂö6öçG&öÂ&W7F÷&F–öâÂÖ÷W6RF2æBf–ÆÂâ÷&–v–æÂ÷6—F—fR×&W77W&R¦W&òÖ'WGFöç26öÆW66VBÖ÷fVÖVçBæB6öÆ÷W"Öfö7W2öÆ÷7B×&VÆV6R&V6÷fW'’&VÖ–â6÷fW&VBâWFò'6Væ6RæBÆÂB&VÖ–æ–ær6Æ–FW"VffV7G2öæWWG&Âö6æ6VÂöÇ’&V†f–÷W"&R6÷fW&VBà ¤†÷7FVBgVÆÂ&Vw&W76–öâÂ&VÂ'&÷w6W"BÖ6öçG&öÂ–ç7V7F–öâæBvW2öÆ—fRfW&–f–6F–öâVæF–ærâFWf–6S¢vVçFÇ’Æ÷vW"Væ6–ÂF†Vâ–æ7&V6R&W77W&S²æòÆ&vR7F'F–ær&Æö"âÖ¶Rf—&Ò7G&ö¶RF†VâÆ–v‡B7F'BÂG'’&÷F‚''W6†W2æB6öÆ÷W"v—F‚&÷Vv†æW72ôÖWFÆæW72âFVÆ–&W&FRFÂf–ÆÂÂVæFòõ&VFòÂFöæR÷&V÷VâæBf–ævW"æf–vF–öââF§W7BÆ–W"7F'G2v—F‚W‡÷7W&RæB†2æòWFó²&VÖ–æ–ær6Æ–FW'2ôÇ’ô6æ6VÂ7F–ÆÂv÷&²âæW‡C¢æF—fRf—'7BÖ6öçF7BæBF§W7FÖVçBfVVF&6²&Vf÷&RFVfW'&VB†V–v‡B&Væ6†Ö&·2â7FæF–ærF—&V7BÖÖ–âW6‚÷V&Æ—6‚WF†÷&—¦F–öâ&VÖ–ç27F—fRà ¢22ãs"†—7F÷&–6Â¦W&ò×&W77W&R6öçG&7B6÷'&V7F–öâ(	B2æ÷fVÖ&W"##` ¤–æ—F–Â†÷7FVBF÷öÆöw’Cc#““c#3R&W÷'FVB2ÃS"52òd”Ã¢†—7F÷&–6Â–çBÖ÷&&—B×&W77W&RÓCrW‡Æ–6—FÇ’&WV—&VBâÆÂ×¦W&ò×&W77W&RFFò–çBâF†—2—2F†R&V†f–÷W"F†RW6W"æ÷r6·2Fò&VÖ÷fRâWFFVBF†B÷&–v–æÂFW7BFò&WF–â6Æ–ÖVB÷&WfVçFVBVæ6–Â6öçF7BÂ÷&&—BÖF—6&ÆVB÷væW'6†—æBFöæR÷&V÷Vâ76W'F–öç2ÂFB¦W&ò×&W77W&Ræò×&W6÷W&6RöæòÖ†—7F÷'’76W'F–öç2ÂF†Vâ&WV—&R÷6—F—fR7FF–öæ'’&W77W&RFò–çBW†7FÇ’öæR6†V6·ö–çBâ6÷'&V7FVBfö7W6VB'Vâ‚52òd”Ââ'VçF–ÖR6öFRVæ6†ævVC²Æ–6F–öâ&VÆV6R&VÖ–ç2ãs"âvW2Cc#““C"7V66VVFVBæBÆÂ6WfVâ6†V6¶VBÆ—fRf–ÆW2'—FRÖÖF6‚'VçF–ÖRS#†c“&&f&#“–&#SƒfF&SSV3&SsSv#“V“Bâ'&÷w6W"f—‡GW&R6†÷w2W†7FÇ’B6Æ–FW'27F'F–ærv—F‚W‡÷7W&RÂæòWFòÂv÷&¶–ærW‡÷7W&Rô'&–v‡FæW72&Wf–WræB6æ6VÂÆVf–ær¦W&òVF—G2â&ööbFö72÷–çB×&W77W&RÖWFòÓs"×&ööbÓs“3sc3ssRæ§râ6÷'&V7FVB†÷7FVBgVÆÂ7V—FRVæF–æs²æF—fRVæ6–Â66WFæ6RVæF–ærà ¢22ãs"f–æÂ&Vw&W76–öâæBV&Æ–6F–öâfW&–f–6F–öâ(	B2æ÷fVÖ&W"##` ¤6÷'&V7FVB†÷7FVBF÷öÆöw’Cc3c3Sr†¦ö"#S“CSCS’’76VB2ÃS2ò2ÃS2Â¦W&òf–ÇW&W2â6÷'&V7FVBvW2Cc3c3’7V66VVFVC²'VçF–ÖR6÷W&6R&VÖ–ç2'—FRÖ–FVçF–6ÂFòS#†c“&&f&#“–&#SƒfF&SSV3&SsSv#“V“B‡G&VR3CsFs&vS†ff6333“FS“&SS–SSFVS†c"’Âv—F‚&Wf–WvVB†—7F÷&–6Â×FW7B6÷'&V7F–öâ–â“3&6cSFSCc#F&3&VSC#f36SSS3Vvcsc’â6WfVâÆ—fRÖ&¶W"÷6†VÆÂõ–çBöF§W7FÖVçBöf—‡GW&Rf–ÆW2'—FRÖÖF6‚FW7FVB'VçF–ÖRâC"Væ—VRfö7W6VB66W252òd”Ââ'&÷w6W"–ç7V7F–öâ6öæf—&×2W†7FÇ’B6Æ–FW'2ÂW‡÷7W&Rf—'7BÂæòWFó²W‡÷7W&Rô'&–v‡FæW72&Wf–WrVæ&ÆW2Ç’æB6æ6VÂ&WF–ç2¦W&òVF—G2â&6†—fVB&ööbFö72÷–çB×&W77W&RÖWFòÓs"×&ööbÓs“3sc3ssRæ§râæF—fR•Bf—'7B×F÷V6‚&W77W&R66WFæ6R&VÖ–ç2VæF–æs²æòãsòãsòãc‚FWf–6R52—2–æfW'&VBâæW‡C¢Æ–v‡B7F'BgFW"f—&Ò7G&ö¶Rv—F‚&W77W&R6—¦–ærVæ&ÆVBÂ&÷F‚''W6†W2ö×VÇF’Ö6†ææVÂ–çBÂ–çFVçF–öæÂF2ôf–ÆÂöæf–vF–öâÂæB&VÖ–æ–ærF§W7FÖVçBÇ’ô6æ6VÂ6Öö¶Rà ¢22ãs2(	BFVfW"F†R÷6—F—fRVæ6–ÂÖF÷vâ7F×(	B2æ÷fVÖ&W"##` ¥U4U"ãs"d”Ã¢67&VVç6†÷Bf—6–&Ç’&W÷'G2cã3bã‚ãs"æB6†÷w2&÷VæBF†–6²62föÆÆ÷vVB'’F†–â7G&ö¶W2â¦W&ò×&W77W&R÷7FÆR×&W77W&R†æFÆ–ærv2–ç7Vff–6–VçBâFòäõB6Æ–Òãs"&W—&VBF†RæF—fRöç6WBÂ÷"W‡Æ–âF†—227FÆR66†RâWFò&VÖ÷fÂ&VÖ–ç2&WF–æVBƒB6Æ–FW'2’Â'WBæòVç&VÆFVBFWf–6R52—2–æfW'&VBà ¤VF—Bf÷VæB7&VFU7G&ö¶Rç7F'BÇv—2VÖ—G2â–ÖÖVF–FRF"âF†RÖ–â–çFW"7F–ÆÂ6ÆÆVB—BöâWfW'’÷6—F—fR–æ—F–ÂWfVçC²Æ&vRf—'7B&W÷'FVB&W77W&RföÆÆ÷vVB'’Æ–v‡BÖ÷fVÖVçBF†W&Vf÷&RW&ÖæVçFÇ’7F×VBF†R6âæò7GVÂFWf–6RWfVçB×&W77W&RG&6Rv27WÆ–VC¢†–v‚×÷6—F—fRÖF÷vâöÆ–v‡BÖÖ÷F–öâ7G&VÒ&W&öGV6W2F†—2f–ÇW&RGFW&âÂ'WB—2æ÷B6Æ–Ò&÷WB6f&’w2W†7B&W÷'FVBfÇVW2âW†—7F–ærãs"FW7G2W†W&6—6VB¦W&ò7F'G2æBvVçV–æR6öç7FçBÖÆ÷r7F'G2Âæ÷B÷6—F—fRf—'7B×6×ÆR7–¶R÷"Væ6öÖÖ—GFVB&Wf–Wr—†VÇ2à ¥&W—"öæÇ’÷&–v–æÂf–Ww÷'BT’÷–çFW"÷væW'2âVæ6–Â–çWBÖ&·2FVfW%Vå7F'C²Ö÷W6RöF—&V7B’7G&ö¶W2&VÖ–â–ÖÖVF–FRâVæ6–ÂF÷vâ6Æ–×2ö6GW&W2F†RW†—7F–ær–çB6öçF7BæB7W7VæG2÷&&—BÂ'WBFöW2æ÷B7F'BF†R÷&–v–æÂ&÷„Æ"ô¶ÆV6·2F‚÷"7F×f—6–&ÆR—†VÇ2â7FF–öæ'’6×ÆW2WFFRF†RÆFW7B&W77W&Rv—F†÷WB–æ²âöâF†Rf—'7B÷6—F—fRÖ÷f–ær6×ÆRÂ7F'BF†R4ÔRF‚BF†R6öçF7B÷&–v–âW6–ærF†RÔõd”är6×ÆRw2&W77W&RB&÷F‚VæG2öbF†Bf—'7B6VvÖVçBÂF—66&F–ærF†RVç6WGFÆVBF÷vâ&W77W&Râ–bF†R÷&–v–âv2Vç&W77W&VBÂ7F'BBF†R7W'&VçB&W77W&VBÆö6F–öâ6òæò'&–FvR—2–çFVB7&÷72Vç&W77W&VBG&fVÂâæòF–ÖW"Â'F–f–6–Â&W77W&RfÆö÷"ÂÖ÷F–öâF‡&W6†öÆB÷"æWr–çWB÷væW"à ¤FVÆ–&W&FR7FF–öæ'’F7F×2öâ&VÆV6Rv—F‚F†RÆFW7B&W77W&Rg&öÒF†B6öçF7C²âÆÂ×¦W&ò6öçF7B7F–ÆÂ7&VFW2æò—†VÇ2÷&W6÷W&6W2ö†—7F÷'’âVæF–ær6æ6VÆÆF–öâöÆ÷7B&VÆV6RF—7÷6W2F†R6ÖR÷&–v–æÂG&ç67F–öâæB&W7F÷&W26öçG&öÇ2âf–ÆÂæB–ÖvRÆ6VÖVçB&WF–âF†V—"W†—7F–ær–ÖÖVF–FR&W77W&RÖ–æFWVæFVçBF‡2âÆÂ×VÇF’Ö6†ææVÂ67&F6‚Æ–W'26†&RF†R6ÖRFVfW'&VBF‚âæòÖ÷f–æ—6‚æ÷r&Vg&W6†W2F†R÷&–v–æÂÖFW&–Â&Wf–WrgFW"F—66&F–ær67&F6‚Æ–W'2Â6òVæF–æröæòÖ–æ²6öçF7B6ææ÷BÆVfRFV×÷&'’66Æ"&Wf–WrF—7Æ–VBâW†—7F–ær6–ævÆR6†V6·ö–çBÂ7FVæ6–ÂöÇ†ÂFööÂ÷&F–Âö6ÖW&æBv—¦Öò÷væW'2&VÖ–ââæF—fR66WFæ6R—27F–ÆÂ&WV—&VBà ¥F‡&VRæWr–çFVw&F–öâFW7G2W6RF†R7GVÂT’æB–çFW#¢ã’F÷vâföÆÆ÷vVB'’ã3RÖ÷F–öâ×W7BÖF6‚ã3R&VfW&Væ6R•„TÂdõ"•„TÂ–â6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW72Â–â$õD‚''W6‚F‡3²G&gBf–Ww÷'BFW‡GW&R×W7B&VÖ–âv†—FRöâF÷vâ†æ÷BÖW&VÇ’&W6÷W&6RVæFVf–æVBVçF–Â6öÖÖ—B’â7FF–öæ'’ãž(i"ãB6WGFÆ–ær&VÖ–ç2f—6–&Ç’Vç–çFVBVçF–Â&VÆV6RæBÖF6†W2ãBF²VæF–ær÷6—F—fR6æ6VÆÆF–öâv—F‚&W77W&R6—¦–ærF—6&ÆVBÆVfW2æò&W6÷W&6W2ö†—7F÷'’æB&W7F÷&W26öçG&öÇ2â&–÷"ãs"¦W&òöç6WBöæò'&–FvRÂãCr–çBÖæ÷BÖ÷&&—BôFöæR×&V÷VâÂãS’6öÆ÷W"Öfö7W2öÆ÷7B×&VÆV6RæBÆÂÖ6†ææVÂFW7G2&VÖ–â7F—fRà ¤fö7W6VC¢#252òd”Â7&÷72öç6WBÂW†—7F–ær&W77W&Rö6öçF7BöÆÂÖ6†ææVÂ66W3²B&VÆV6Rö66†R÷&F–Â6†V6·252òd”ÂâöæÇ’Ö–âf–Ww÷'B÷–çFW"æB&VÆV6RÆöFW"–ç2&Vg&W6‚Fòãs3²÷&–v–æÂ&7FW"¶W&æVÂãsÂ7G&ö¶Rô&W¦–W"ãƒ“bÂBÖ6öçG&öÂF§W7FÖVçBT’ö†VÇW"ãs"Â–×÷'FW"ãsÂ6ÖW&ãSrÂVFvRãc"ÂÆWGFRãcæB&÷FV7FVB×VÇF“ã&VÖ–âVæ6†ævVBâæò'&öBT’6ÆVçW÷"&ÆÆVÂ7G&ö¶R–×ÆVÖVçFF–öâà ¤†÷7FVB&Vw&W76–öâæBvW2öÆ—fRfW&–f–6F–öâVæF–ærâFWf–6S¢&WVBF†RÆöærÆ–v‡BÆ–æW2g&öÒF†R7WÆ–VBãs"67&VVç6†÷C²f—'7BÖ÷f–ær7G&ö¶R6†÷VÆBæ÷B7V—&RÆ&vR&÷VæB†VBâf—&Ò×FòÖÆ–v‡B7F'G3²FVÆ–&W&FRFöÆ–gB‡F–æ·2öâ&VÆV6R’Â&÷F‚''W6†W2Â6öÖ&–æVB6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW72ÂVæFòõ&VFòÂFöæR÷&V÷VâæBf–ævW"æf–vF–öââæW‡C¢æF—fRöç6WBfVVF&6³²–bf–ÇW&R&VÖ–ç2Â6öÆÆV7Bf—'7BÖWfVçB&W77W&RöÖ÷F–öâWf–FVæ6R&Vf÷&Ræ÷F†W"7V7VÆF—fRÆv÷&—F†Ò6†ævRâV&Æ–W"æF—fRF§W7FÖVçBö–×÷'BöÆ–÷WBvFW2&VÖ–âVæF–ærâ7FæF–ærF—&V7BÖÖ–âW6‚÷V&Æ—6‚WF†÷&—¦F–öâ&VÖ–ç27F—fRà  ¢22ãs2f–æÂWFöÖFVBæBFWÆ÷–ÖVçB&ööb(	B2æ÷fVÖ&W"##` ¥fÆ–FF–öâ6ö×ÆWFS¢3rfö7W6VB6†V6·253²†÷7FVBgVÆÂ&Vw&W76–öâ3Sb52òd”Â‡'VâCc3S3“C3sBÂ¦ö"#S“SƒS#bÂ'VçF–ÖR6öÖÖ—B&#–VFf#3FC“cVS#c–3ƒCFF&C#C3#†fR’âvW2'VâCc3S3“#CSr7V66VVFVBâÆ—fRfW'6–öâæ§6öâÂ–æFW‚æ‡FÖÂÂf–Ww÷'B×–çBæ§2Âf–Ww÷'B×–çBÖ6÷&Ræ§2æB6†VÆÂÖ6ö×&—6öâæ§2'—FW2ÖF6‚F†Rãs2'VçF–ÖR6÷W&6W2âæF—fRVæ6–Â66WFæ6R&VÖ–ç2TäD”äs²æòFWf–6R52–æfW'&VBà ¥W6W"ãs"d”Â&VÖ–ç2&V6÷&FVBâãs2æF—fRVæ6–Âöç6WB÷F2Â6öÖ&–æVB6†ææVÇ2æB6öçF7B&V6÷fW'’v—BW6W"FW7F–ærâæò'VçF–ÖR6†ævW2–âF†—2&ööbWFFS²7W'&VçB&VÆV6R&VÖ–ç2ã3bã‚ãs2â7FæF–ærÖ–âõvW2W6‚WF†÷&—¦F–öâ&VÖ–ç2–âf÷&6Rà  ¢22ãsB(	B''W6‚6öçG&öÇ2æBVæ6–Âöç6WB(	BBæ÷fVÖ&W"##` ¢ãs2æF—fRd”Ã¢7G&ö¶W27F'FVBBF†RWW"&–v‡Bv—F‚6—¦R#SbæBÆ&vR†VBâF†Rf—'7BÖ÷f–ær&W77W&R6×ÆR6÷VÆB7F–ÆÂ7F×â÷fW'6—¦VB†VBâãsB6öæf—&×2—Bv–ç7BF†RæW‡BF—7F–æ7BÖ÷f–ær6×ÆRæBW6W2F†RÆ÷vW"&VF–ærf÷"F†R–æ—F–Â6VvÖVçBâÆFW"6×ÆW2&WF–âæ÷&ÖÂG–æÖ–72âF2&WF–â&VÆV6R&V†f–÷W"à ¤''W6‚F—6WGF–æw2&Rf—6–&ÆR–â''W6‚6öçG&öÇ2â–æFWVæFVçBVæ6–Â6—¦RæB÷6—G’FövvÆW2W6RF†R6Æ–FW'226V–Æ–æw2â6—¦R#Sbv—fW2F†RgVÆÂ6—¦R&ævRâFVfVÇG2&VÖ–â&W77W&R6—¦–æröâæB÷6—G’G–æÖ–72öfbâf–ÆÂW6W26Æ–FW"÷6—G’æB†–FW2&W77W&R÷F–öç2à ¤æF—fRvFS¢FW7BÆ–v‡B6—¦R#Sb7G&ö¶W2v—F‚&÷F‚''W6†W2ÂÆÂf÷W"FövvÆR6öÖ&–æF–öç2ÂFVÆ–&W&FRF2æB6öÖ&–æVB6†ææVÇ2âæF—fR&W7VÇBVæF–ærâ7FæF–ærÖ–âõvW2W6‚WF†÷&—¦F–öâÆ–W2à  ¢22ãsBæF—fR66WFæ6R(	BBæ÷fVÖ&W"##` ¥W6W"FWf–6R52f÷"ãsBöâBæ÷fVÖ&W"##bâVæ6–Â7G&ö¶Röç6WBæòÆöævW"&öGV6W2F†RÆ&vRF"â&÷FV7BF†RGvò×6×ÆRöç6WB†æFÆ–æræB–æFWVæFVçB6—¦Rô÷6—G’&W77W&R6öçG&öÇ2à  ¢22ãsæBãsFWf–6R66WFæ6R(	BBæ÷fVÖ&W"##` ¥W6W"&W÷'G252f÷"ãs&÷÷'F–öæÂ–ÖvR–×÷'BæBãsv†öÆRÖ–ÖvRF§W7FÖVçG2â&V6÷&B&÷F‚2&÷FV7FVBâF†RÇ&VG’&V6÷&FVBãsBVæ6–Âöç6WB÷&W77W&R6öçG&öÇ252&VÖ–ç2&÷FV7FVBà  ¢22÷6—G’ãsR–×ÆVÖVçFF–öâ6†V6·ö–çB(	BRæ÷fVÖ&W"##` ¥tõ$²”â$ôu$U52ÂTåT$Ä•4„TBâW6W"WF†÷&—¦W2÷6—G’ÖWF†÷&–ærf÷"&÷„Æ"×–çFVBö&¦V7G2öæÇ’â–×÷'FVBäôÒôtÄ"–çF–ær—2÷WG6–FRF†—2'V–ÆB&V6W6R—G2Ug2&R–æ6ö×F–&ÆRâv†—FR—2÷VRÂ&Æ6²G&ç7&VçBâ7W'&VçBÆ—fR&VÆV6R&VÖ–ç2ãsBâ&÷FV7FVBFWf–6R56W3¢ãsBVæ6–Âöç6WB÷&W77W&R6öçG&öÇ2ÂãsF§W7FÖVçG2æBãs–ÖvR–×÷'Bà ¤Æö6Â–×ÆVÖVçFF–öâæ÷rFG27G&–7B÷6—G’#‚&W6÷W&6Rw&W'2æBfW'6–öâÓ‚÷6—G’&ö¦V7BVçfVÆ÷R&÷VæBW†—7F–ærfW'6–öâ(	3r&ö¦V7G2â&÷†Æ"×&ö¦V7BÖ6öFV2–çFVw&FW2Væ6öFRöFV6öFRf–F†R÷&–v–æÂ66Æ"ööÇ2â7–çF‚æB7FæFÆöæR66Æ"6÷’6†V6²72âF†—2—2f÷VæFF–öâv÷&²öæÇ’Âæ÷B6ö×ÆWFR66WFVBW'6—7FVæ6RfVGW&Râæò&VÆV6R–ç2÷"76WG2†fR&VVâV&Æ—6†VBà ¥&VÖ–æ–ær&Vf÷&R&VÆV6S¢–çFVw&FRö&¦V7B6GW&Rö†—7F÷'’öGWÆ–6FR÷&W7F÷&RæB×WFF–öâwV&G3²FBF†R66Æ"–çB6†ææVÂW6–ær÷&–v–æÂFööÇ2æBÖ6·3²6†÷rÖ&Wf–WræBÆ—BG&ç7&Væ7“²WFFR6öÖÖ—GFVBF—7Æ’Â6ÆV"×–çBæBUb–çfÆ–FF–öã²FBtÄ"ôäôÒW‡÷'B†æFÆ–æs²fö7W6VBöÆBöæWr&ö¦V7B&÷VæBG&—2Â†—7F÷'’ÂT’æBW‡÷'B6†V6·3²&VÆV6RÖ&¶W'2÷–ç2æB&Wf–WvVBf—‡GW&S²W6‚Ö–âÂfW&–g’4’õvW2öÆ—fR'—FW2âfö–B&Ww&—F–ærF†RW†—7F–ær–çFW"÷"¶W&æVÂâFòæ÷BG&VBF†—26†V6·ö–çB26ö×ÆWFVBãsR'V–ÆBà  ¤Æö6ÂföÆÆ÷r×W¢W‡FVæFVB÷&–v–æÂö&¦V7BGWÆ–6F–öâö÷F–öç2æB6æ6†÷B&W6÷W&6R6GW&RFò–æ6ÇVFR÷6—G•–çBÂÇW2W†—7F–ærUbô'&’ö¦ö–â&W6÷W&6R×&W6Væ6RwV&G2æB6ÆV"–çB&VÖ÷fÂâ7–çF‚æBF–fb6†V6·273²'VçF–ÖRö†—7F÷'’&÷VæB×G&—FW7G2æB&VÆV6R–çFVw&F–öâ&VÖ–âVæF–ærâF†—2&VÖ–ç2VçV&Æ—6†VBãsRv÷&²à  ¤÷6—G’föÆÆ÷r×W¢÷&–v–æÂf–Ww÷'B–çFW"æ÷r&V6övæ—¦W2â÷6—G’66Æ"÷væW"v—F‚v†—FRFVfVÇBÂwV&FVB&W6÷W&6R–FVçF—G’æBâFF—F–öæÂW‡Æ–6—B÷6—G•fÇVR–çWBâ—G26†ææVÂ6†ö÷6W"7W÷'G2÷6—G’âW†—7F–ær7&VFU–çE7W&f6R66WG2â÷6—G’66Æ"&Wf–WræB76–vç2Æ–æV"w&VVâÖ6†ææVÂÇ†Öv—F‚G&ç7&VçB&ÆVæF–æröFWF‚×w&—FR†æFÆ–æræBFW‡GW&RF—7÷6Ââ7–çF‚öF–fb6†V6·272âT’v—&–ærÂ6öÖÖ—GFVBG&ç7&Væ7’F—7Æ’Â†—7F÷'’÷'VçF–ÖRFW7G2æBW‡÷'G2&VÖ–â–æ6ö×ÆWFS²Fòæ÷BV&Æ—6‚÷"6Æ–ÒFWf–6R&VF–æW72à  ¤Æö6Â÷6—G’&öw&W73¢–çBT’æ÷r†2â÷6—G’6†ææVÂæB(	3#SRfÇVR6Æ–FW"Â76VBW‡Æ–6—FÇ’FòF†R÷&–v–æÂ–çFW"&Vv–â’â6öÖÖ—GFVBF—7Æ’æB&VæFW"ÖÖöFR6VÆV7F–öâæ÷r–æ6ÇVFR÷6—G’&W6÷W&6W2â7–çF‚6†V6·272æBF†R2W†—7F–ærVæ6–Âöç6WB–çFVw&F–öâ66W272âW‡÷'B—2æ÷B–çFVw&FVBÂ&ö¦V7Bö†—7F÷'’'VçF–ÖR6÷fW&vR—2–æ6ö×ÆWFRÂæB&VÆV6R–ç2öÖ&¶W'2&R7F–ÆÂãsBâF†—2—2VçV&Æ—6†VBv÷&²æB—2äõB&VG’f÷"FWf–6RFW7F–ærà  ¤÷6—G’fÆ–FF–öâföÆÆ÷r×W¢f—†VBFDÖW6‚÷F–öâf÷'v&F–ær6ò÷6—G’ÖöæÇ’ö&¦V7G2Fòæ÷B66–FVçFÆÇ’76–vâVæFVf–æVBÖWFÆæW72â7GVÂf–Ww÷'B–çFW"6Öö¶R6†V6²÷Vç2æF—fRUb7V&RÂ6VÆV7G2÷6—G’Â–çG2&Æ6²æBfW&–f–W26öÖÖ—GFVB÷6—G•–çB'—FW26öçF–â¦W&òâF†—2fW&–f–W26÷&R6öÖÖ—BöæÇ“²gVÆÂT’ö†—7F÷'’÷6fRöW‡÷'BöFWf–6R&VF–æW72&VÖ–ç2VæF–ærà  ¢22ãsR(	B÷6—G’ÖÖWF†÷&–ær–×ÆVÖVçFF–öâ6ö×ÆWFR(	BRæ÷fVÖ&W"##` ¤6ö×ÆWFVBF†R&÷„Æ"ÖæF—fRUb÷6—G’WF†÷&–ær'V–ÆBgFW"F†RV&Æ–W"–×ÆVÖVçFF–öâ6†V6·ö–çG2–âF†—2†—7F÷'’â÷6—G’W6W2F†RW†—7F–ær66Æ"&W6÷W&6RÂ–çFW"ÂÖ6²Â†—7F÷'’Â&ö¦V7BööÂÂ&Wf–WræBÆ–W"×F‡VÖ&æ–Â÷væW'2â–çB—2f–Æ&ÆRf÷"''W6‚Âf–ÆÂÂW&6W"Â6×VFvRÂ&ÇW"æBF†RW†—7F–ær×VÇF’Ö6†ææVÂFööÂF‚â&Æ6²—2G&ç7&VçBæBv†—FR÷VRâæ&÷†Æ&fW'6–öâ‚&WF–ç2F†RÆ–æV"#‚÷6—G’FFæB&VG2c(	7cs²GWÆ–6FRÂVæFò÷&VFòÂFöæR÷&V÷VâæBUb×WFF–öâwV&G26''’÷6—G’âäôÒôtÄ"ôô$¢W‡÷'G2W‡Æ–6—FÇ’&VgW6RWF†÷&VB÷6—G’æB&W6W'fRæ&÷†Æ&&F†W"F†âG&÷–ærFFâ–×÷'FVBäôÒôtÄ"Ub–çF–ær&VÖ–ç2÷WBöb66÷Rà ¤gVÆÂÆö6Â&Vw&W76–öã¢3cFW7G252òd”ÂƒC‚ã‚2’âfö7W6VB÷6—G’T’÷&W6÷W&6R÷&ö¦V7BöW‡÷'B6†V6·2æB&VÆWfçB&VÆV6Rö66†R&Vw&W76–öâ76VBâæF—fR•Bõ6f&’66WFæ6R—2VæF–æs²Fòæ÷B6÷VçBWFöÖFVB&W7VÇG22FWf–6R52à ¤F—&V7BÖÖ–âæBvW2V&Æ–6F–öâv2W‡Æ–6—FÇ’WF†÷&—¦VB27FæF–ær–ç7G'V7F–öââV&Æ—6†VB6öÖÖ—BSv66fc&FSS#ScSS–F3V#V3“#sf3S&#ƒcf#â†÷7FVBF÷öÆöw’&Vw&W76–öâ'VâC“ccCs3ƒ–ò¦ö"#sC3CƒScC676VC²vW2FWÆ÷–ÖVçB'VâC“ccCcSS–7V66VVFVBâÆ—fRfW'6–öâæ§6öæÂ–æFW‚æ‡FÖÆÂf–Ww÷'B×–çBæ§6Âf–Ww÷'B×–çBÖ6÷&Ræ§6Â66Æ"ö÷6—G’&W6÷W&6W2Â&ö¦V7B6öFV2Â–çBF&vWBæB6†VÆÂ6ö×&—6öâ'—FRÖÖF6‚Æö6ÂÖ–ââæF—fR•Bõ6f&’66WFæ6R—2æ÷rF†RW6W"6†V6²à  ¢22ãsb(	B&WfVÂ&V"Öf6–ær–çFW&–÷"F‡&÷Vv‚÷6—G’(	BRæ÷fVÖ&W"##` ¥W6W"&W÷'G2ãsR÷6—G’WF†÷&–ær52ÂF†Vâf÷VæB6öÖÖ—GFVB÷6—G’×–çFVBö&¦V7G2V&VBöæR×6–FVBâf—‚F†RWF†÷&—FF—fR6öÖÖ—GFVB×&Wf–WrÖFW&–Â–â7&2÷–çB×F&vWBæ§6¢W6RD…$TRäF÷V&ÆU6–FVöæÇ’v†–ÆRF†R÷6—G’Ç†Ö—27F—fRÂæB&W7F÷&RD…$TRäg&öçE6–FVv†Vâ÷6—G’—26ÆV&VBâW†—7F–ærÇ†ÖÂG&ç7&Væ7’öFWF‚×w&—FRÂfÆÆ&6²7GVF–òÖFW&–ÂÂvVöÖWG'’æBFW‡GW&RÆ–fWF–ÖR&VÖ–âVæ6†ævVBâF†R6ÖR÷væW"6W'fW2F†R6öÖÖ—GFVBÖFW&–Â&Wf–Ws²æò&6¶f6RvVöÖWG'’÷"GWÆ–6FRÖW6‚—27&VFVBà ¤fö7W6VBFW7G26÷fW"&÷F‚×6–FVBÖFW&–Â7FFRv—F‚÷6—G’Âg&öçBÖöæÇ’&W7F÷&F–öâv—F†÷WB÷6—G’ÂW†—7F–ærÆ—fR÷6—G’÷&ö¦V7B6fRF‚Â6öÆ÷"öÖWFÂ6†F÷w2Â7W'&VçB&VÆV6RÖ&¶W'2÷–ç2æB6æöæ–6Â6†VÆÂÆöFW'3¢#52òd”ÂâgVÆÂ&Vw&W76–öã¢3c52òd”ÂƒBã"2’âW6W"6†V6²—2VæF–æs¢–çBG&ç7&VçB&V2Â÷&&—BFò–ç7V7B&V"Öf6–ær–ç6–FR7W&f6W2ÂFöæR÷&V÷VâÂ&W7F÷&R÷6—G’æB6öæf—&Ò&VwVÆ"7W&f6W2&VÖ–âVæ6†ævVBâ&÷FV7BF†RãsR÷6—G’WF†÷&–ær53²Fòæ÷B–æfW"ãsbFWf–6R66WFæ6Rà ¤FWÆ÷–ÖVçB&ööc¢'VçF–ÖR6öÖÖ—Bc“fV3c#vF3Ss##6c6S&sC#ƒ&cS“cv&3F²gVÆÂ†÷7FVBF÷öÆöw’'VâC“s#cSƒsvò¦ö"#scC#33#Cf76VC²vW2'VâC“s#cSsS#v7V66VVFVBâÆ—fR&VÆV6RÖ&¶W"Â6†VÆÂæB÷6—G’&Wf–WröÆöFW'2'—FRÖÖF6‚Æö6ÂÖ–âà  ¢22ãsr(	B6ö×7B–çB6öçG&öÇ2æB6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW72ô÷6—G’7G&ö¶W2(	BRæ÷fVÖ&W"##` ¥W6W"&W÷'G2ãsf÷6—G’F÷V&ÆR×6–FVB&Wf–Wr52â&WVW7C¢6†÷'FVâ–çBT’ÂÖ÷fRW‡ÆæF–öç2–çFòFööÇF—2ÂÖ¶R66Æ"6öçG&öÇ2–çGV—F—fRÂæB–çB÷6—G’v—F‚6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW72–âöæR7G&ö¶Rà ¤VF—Bf÷VæBöæRW†—7F–ær×VÇF’Ö6†ææVÂ÷væW"–â7&2÷f–Ww÷'B×–çBÖ6÷&Ræ§6¢&÷Vv†æW72æBÖWFÆæW72Ç&VG’6†&VB''W6‚ôf–ÆÂôW&6W"õ6×VFvRô&ÇW"õ6†'VâÂF†RÖFW&–Â&Wf–WrÂÖ6·2æBöæR6öÖÖ—D×VÇF–6†V6·ö–çBâW‡FVæFVBF†B6ÖR6†ææVÂÆ—7BFò÷6—G’Â6VÆV7F–ær—G26öæf–wW&VB6Æ–FW"'—FRæB76–ær—G267&F6‚Æ–W"–çFòF†RW†—7F–ærÇ†ÖÖ&Wf–Wrâæò6V6öæB–çFW"Â&W6÷W&6R66†VÖ÷"†—7F÷'’÷væW"âF†RãsV÷6—G’÷væW"&VÖ–ç2WF†÷&—FF—fRà ¥–çBT’&WÆ6W2(	Å–çBfÇV^(	ÒFW‡Bv—F‚ÆW72ôÖ÷&R&÷Vv‚ÂÆW72ôÖ÷&RÖWFÂÂæBG&ç7&VçBô÷VRVæGö–çG2â÷6—G’fÇVR6öçG&öÇ2V"öæÇ’v†Vâ÷6—G’—26VÆV7FVB–â(	ÄÇ6ò–çN(	Ò÷"—2F†R&–Ö'’6†ææVÂâ(	ÄÇ6ò–çN(	Ò–æ6ÇVFW2ÆÂF‡&VR66Æ"Ö2v—F‚W"Ö6†ææVÂFööÇF—3²ÆöærÇ†F—FW‡BÖ÷fVB&V†–æBFööÇF—æB†VÇ'WGFöââW†—7F–ær''W6‚×6—¦R÷&W77W&R&V†f–÷"æB–×÷'FVBÖö&¦V7BUb&÷FV7F–öâ&VÖ–âVæ6†ævVBà ¥&VÆV6Rãsv²&Vg&W6‚6†VÆÂÂf–Ww÷'B–çBÂæW7FVB–çFW"æB&VÆV6RÖÆöFW"–ç2âFFVBFöÖ–2f÷W"ÖÖ''W6‚æBT’6†V6·3²W‡æFVBF†R6†ææVÂ6†V6¶&÷‚6÷fW&vRâfö7W6VB–çBö÷6—G’öÆÂ×FööÇ2&Vw&W76–öã¢#ó#52âgVÆÂ7V—FS¢3có3c52ƒ"ã’2’â†÷7FVBF÷öÆöw’C“sscs#fò¦ö"#sƒs“SV76VB3có3c²vW2C“ssccƒS&7V66VVFVBâÆ—fR&VÆV6RÖ&¶W"Â–æFW‚Â–çBT’ö6÷&RÂ6†VÆÂÂæBÆöFW"f–ÆW2'—FRÖÖF6‚6öÖÖ—BvS†FV†36Cv6CS“ffC†f3–fcvfSfC†#&&cVSC6fâãsfæBV&Æ–W"W6W"56W2&VÖ–â&÷FV7FVBâæF—fR6†V6³¢6öÖ&–æVBf÷W"Ö6†ææVÂ7G&ö¶RÂ&Wf–WrÂöæR×7FWVæFòõ&VFòÂ÷6—G’FövvÆR÷fÇVRÂ÷F†W"–çBFööÇ2æBFöæR÷&V÷Vâà  ¢22ãs‚(	B6öÆW66VBVæ6–Â&W77W&R–æ†W&—G27F—fR6öçF7B(	BRæ÷fVÖ&W"##` ¥W6W"&W÷'G2ãsv–çBÖVçRæB6öÖ&–æVBÖ6†ææVÂ52'WB&Æö"&VÖ–ç2B7G&ö¶R7F'Bâ&W6W'fRF†RãsvÖVçRö6†ææVÇ3²&W—"öæÇ’F†R&W6–GVÂVæ6–Âöç6WBF‚à ¤VF—Bf÷VæBö–çB†R––â7&2÷f–Ww÷'B×–çBæ§6WFFVBVæ6–Â&W77W&RöæÇ’v†VâV6‚WfVçB&W÷'FVBö–çFW%G—RÓÓÒwVâvâF†R6öÆW66VBÖÖ÷fRÆö÷76VBF†R6†–ÆB6×ÆRÆöæRâv†Vâ6†–ÆB6×ÆRöÖ—GFVBö–çFW%G—VÂF†RFFW"ÆVgBÆ7E&W77W&VBF†R†–v‚Væ6–ÂÖF÷vâfÇVS²F†Rãs6Gvò×6×ÆRwV&BF†Vâ6÷'&V7FÇ’W6VBF†RÖ–æ–×VÒöbGvò7FÆR†–v‚&VF–æw2æB7F–ÆÂ&Vvâv—F‚â÷fW'6—¦VB6âF†RvW7GW&R÷vç2âWF†÷&—FF—fR6öçF7EG—Vg&öÒF÷vâF‡&÷Vv‚&VÆV6Râ6öÆW66VB6†–ÆG&Vâæ÷rW6RF†B÷&–v–æÂ6öçF7BG—Rf÷"&W77W&Ræ÷&ÖÆ—¦F–öââÖ÷W6R&W77W&R&VÖ–ç2f—†VBBöæS²æòÇFW&æFR7G&ö¶R¶W&æVÂÂ'F–f–6–Â&W77W&RfÆö÷"Â÷"FVÆ’v2–çG&öGV6VBà ¤FFVBT’&Vw&W76–öâF†B7F'G2Bã–Â6VæG2Æ÷rã3V6öÆW66VB6×ÆW2v—F†÷WBö–çFW%G—VÂæB6ö×&W2W†7B÷WGWBFòã3V&VfW&Væ6Rf÷"&÷F‚&÷„Æ"æB¶ÆV6·2â—B6÷fW'26öÆ÷W"Â&÷Vv†æW72ÂÖWFÆæW72æB÷6—G’Â–æ6ÇVF–æröæRFöÖ–2G&ç67F–öââÇ6ò&âW†—7F–æröç6WB÷Fö6æ6VÂö6öçF7B&V6÷fW'’ö÷&&—BFW7G2âfö7W6VB6†V6·3¢B52òd”ÂâgVÆÂÆö6Â&Vw&W76–öã¢3c"52òd”Âƒ#’ã‚2’â†÷7FVBF÷öÆöw’'VâC““SSc3sr76VB3c"ó3c#²vW2'VâC““SSc#s#‚7V66VVFVBâÆ—fRãs†Ö&¶W"æB'VçF–ÖR'—FW2fW&–f–VC¢–æFW‚æ‡FÖÆÂf–Ww÷'B×–çBæ§6ÂG&vW"×V’æ§6Âf6R×v÷&¶fÆ÷rÖÆ–÷WBæ§6æB6†VÆÂÖ6ö×&—6öâæ§6ÖF6‚âæF—fR•Bõ6f&’6†V6²—27F–ÆÂ&WV—&VBâ7FæF–ærÖ–âõvW2V&Æ–6F–öâWF†÷&—¦F–öâ&VÖ–ç27F—fRà  ¢22ãs’(	B6GW&R&VÂVæ6–Â–çBöç6WBWf–FVæ6R(	BRæ÷fVÖ&W"##` ¥W6W"&W÷'G2ãs†d”Ã¢F†Rf—'7BF÷V6‚7F–ÆÂ–çG2Æ&vRF"âF†RWFöÖFVB†–v‚ÖF÷vâöÆ÷rÖ6öÆW66VB66Væ&–òF–Bæ÷B&W&öGV6RF†RFWf–6R7–×FöÓ²F†R&÷÷6VB7FÆR×&W77W&RW‡ÆæF–öâ—2Væ6öæf—&ÖVBâFòæ÷B7F6²æ÷F†W"&W77W&Rv÷&¶&÷VæBöçFòF†Röç6WBwV&Bv—F†÷WBFWf–6RWf–FVæ6Rà ¤W‡FVæBF†RW†—7F–ær÷BÖ–âvW7GW&RFV'Vr÷væW"æB—G2W†—7F–ær6GW&Rô6÷’&W÷'BâUb–çB&V6÷&G2&rö–çFW&F÷vâf–VÆG2æBæ÷&ÖÆ—¦VB&W77W&RÂ7F—fR''W6‚ö6†ææVÂ÷&W77W&R6WGF–æw2ÂWFòV–v‡B6öÆW66VB6×ÆW2ÂæBö–çFW'WfÇVW2âF†R–çFW"&V6÷&G2v†WF†W"öç6WB—2FVfW'&VBæBv†–6‚&W77W&W2F†Röç6WBwV&B6VÆV7G2â—G2f—'7BV–v‡BvVæW&FVBUbF'2&W÷'B&W77W&RÂ6ö×WFVB6öÆ÷W"÷66Æ"Ö&F–’ÂUb†—BæBÆö6F–öââ–ç7G'VÖVçFF–öâ—2–æW'BVæÆW72vW7GW&RFV'Vr—2Væ&ÆVC²—BFöW2æ÷B6öç7VÖR–çWB÷"6†ævR–çF–ærà ¤ÖçVÂF–væ÷7F–3¢f–Wr(i"vW7GW&RFV'Vrôã²&W&öGV6RöæRf—'7B×F÷V6‚&Æö"–âUb–çC²6GW&R&W÷'B(i"6÷’&W÷'C²6VæBF†R&W7VÇBâGW&âF–væ÷7F–72öfbgFW'v&G2â¶VWãsv6†ææVÂöÖVçR52&÷FV7FVBà  ¢22ãƒ(	B6÷'&V7BF–væ÷7F–2&VÆV6RÖ&¶W'2gFW"†÷7FVBvFR(	BRæ÷fVÖ&W"##` ¥F†Rf—'7BF–væ÷7F–2V&Æ–6F–öâW6VBãs–²†÷7FVBF÷öÆöw’6Vv‡BGvò7FÆR&VÆV6RÖ6öçG&7B&VfW&Væ6W2æBF‡&VRöÆBf—6–&ÆR6†VÆÂÖ6ö×&—6öâÆ&VÇ2âF†RF–væ÷7F–26öFR—G6VÆbF–Bæ÷Bf–Ã²3S’ó3c"6†V6·276VBâ6÷'&V7BF†R&VÆV6RÖ&¶W"FòãƒÂWFFRF†R6†VÆÂ6ö×&—6öâÆ&VÇ2æBW‡V7FF–öâÂæB¶VWF†RF—&V7BöæW7FVB&VÆV6R×fW'6–öâæ§6–ç2—&VBBãs†&V6W6RF†B÷væW"—2Væ6†ævVBâ–çBF–væ÷7F–72æB–çF–ær&V†f–÷"&VÖ–âVæ6†ævVBâ&R×'Vâ†÷7FVBF÷öÆöw’æBvW2&Vf÷&R&WVW7F–ærF†RæF—fR6GW&Rà  ¢22ãƒ(	B&Vg&W6‚F†R6æöæ–6Â&VÆV6R×fW'6–öâ–×÷'B6†–â(	BRæ÷fVÖ&W"##` ¤†÷7FVBF÷öÆöw’f÷"ãƒf÷VæBF†R&VÆV6RÖ&¶W"7V—FR&WV—&W2F†RF—&V7B&VÆV6R×fW'6–öâæ§6U$ÂFòWVÂfW'6–öâæ§6öæâ&Vg&W6‚F†R6ö×ÆWFRW†—7F–ærÆöFW"6†–ã¢–æFW‚(i"G&vW"×V’(i"f6R×v÷&¶fÆ÷rÖÆ–÷WB(i"&VÆV6R×fW'6–öââÇ6ò&W–âF†Rf–Ww÷'B–çB6†–ÆBö6÷&RæB6ö×&—6öâ6†VÆÂâæòæWrF–væ÷7F–2÷"–çB&V†f–÷"—2FFVC²F†—2Gfæ6W2F†R&Wf–÷W6Ç’V&Æ—6†VBF–væ÷7F–2Fò66†RÖF—7F–æ7BU$Ç2æB6F—6f–W2F†RW†—7F–ær&VÆV6R÷væW"6öçG&7Bâ†÷7FVBF÷öÆöw’æBvW2×W7B72&Vf÷&RæF—fR&W÷'B6GW&Rà ¥F†Rf—'7Bãƒ†÷7FVBF÷öÆöw’'Vâ76VB3có3c"6†V6·3²Gvò&VÆV6RÖ6öçG&7BFW7G2–FVçF–f–VBF†R7FÆR–æFW‚&VÆV6R×fW'6–öâæ§666†R&VfW&Væ6R–âFW7G2öf—‡GW&W2÷'VçF–ÖRÖ76WBÖ6öçG&7Bæ§6öæâWFFRF†B&Wf–WvVBU$ÂFòãƒ†ÖöGVÆR'—FW2&RVæ6†ævVB’æB&W'VâF†R†÷7FVB&Vw&W76–öã²vW2æBÆ—fR'VçF–ÖR'—FRfW&–f–6F–öâÇ&VG’7V66VVFVBf÷"ãƒà ¤gFW"WFF–ærF†B&Wf–WvVB66†R&VfW&Væ6RÂ†÷7FVBF÷öÆöw’'VâC#333CSSf76VB3c"ó3c#²vW2'VâC#3333“c7V66VVFVBâF†RÆ—fRãƒfW'6–öâÖ&¶W"æB6†ævVB'VçF–ÖRÖöGVÆW2'—FRÖÖF6‚F†R&W÷6—F÷'’âF†RÆFW"W6W"6GW&R—2&V6÷&FVB–âãƒ&&VÆ÷rà ¢22ãƒ"(	B6WGFÆRVæ6–Â&W77W&R7&÷72F†R7GVÂ7F'GW6×ÆRv–æF÷r(	Bbæ÷fVÖ&W"##` ¥W6W"7WÆ–VBãƒvW7GW&RFV'Vr&W÷'BâVæ6–ÂF÷vâB&W77W&Rã†v2föÆÆ÷vVB'’6WfW&ÂV&Ç’ã†6×ÆW3²F†R–çFW"6öæf—&ÖVBöç6WBv†–ÆR&W77W&R&VÖ–æVBã†æB7F×VB#ãC‡†FW‡GW&R×&F—W2F"â7V'6WVVçB&W77W&W2fVÆÂFòã.(	3ã6Â&öGV6–ær^(	3—†&F–’â7W&f6R†—G27V66VVFVBâF†Rc†F–ffW&Væ6R&WGvVVâFö7VÖVçBö–çFW"6ö÷&F–æFW2æB–çFW"öç6WB6ö÷&F–æFW2—2f–Ww÷'B6Æ–VçB×FòÖ6çf26öçfW'6–öâÂæ÷B&–67BÖ—72à ¤¶VWF†RW†—7F–ærFVfW'&VBVæ6–Â7G&ö¶R–âf–Ww÷'B×–çBÖ6÷&V²6öÆÆV7BV–v‡B÷6—F—fR&W77W&R6×ÆW2†–æ6ÇVF–ærF÷vâv†Vâ÷6—F—fR’&Vf÷&R&Vv–ææ–ærÂ&WF–âF†RÖ–æ–×VÒ&W77W&R÷fW"F†B7F'GWv–æF÷rÂæB&WÆ’'VffW&VB÷6—F–öç2F‡&÷Vv‚F†R÷&–v–æÂ¶W&æVÂW6–ærF†B&W6öÇfVB&W77W&RâFòæ÷BFB6V6öæB–çFW"â7FF–öæ'’F÷V6†W2&VÖ–âVç–çFVBVçF–Â&VÆV6RæBW6RF†RÆFW7B&W77W&Rf÷"FVÆ–&W&FRF2âÆFW"6×ÆW2&W7VÖRÆ—fR&W77W&RG–æÖ–72âF†R÷BÖ–âvW7GW&RFV'Vröç6WBÆ–æRæ÷r–æ6ÇVFW2F†R6öÆÆV7FVB6÷VçBæB6WGFÆ–ærv–æF÷rà ¥&÷FV7FVBãsv6ö×7B–çBöf÷W"Ö6†ææVÂ7G&ö¶W2ÂãsfGvò×6–FVB÷6—G’&Wf–WrÂãsV÷6—G’WF†÷&–æræBãsF''W6‚6öçG&öÇ2âWFöÖFVB7V—FRæBvW2fÆ–FF–öâVæF–æs²æF—fR•Bõ6f&’7G&ö¶R6†V6²VæF–ærâFW7B6—¦R#SböÆ–v‡B7F'G2Â6öÖ&–æVB6†ææVÇ2ÂF2ÂVæFòõ&VFòÂ''W6‚7v—F6†–æræBf–ævW"÷&&—Bâ–böç6WB7F–ÆÂ&Æö'2Â6öÆÆV7Bãƒ&6GW&Rô6÷“²—Bv–ÆÂ6†÷r&W77W&R6×ÆR6÷VçBÂ6†÷6VâÖ–æ–×VÒæBf—'7BF"&F—W2à ¢22ãƒ2(	B6WGFÆRöæÇ’÷fW'6—¦VBVæ6–Â7F'G2(	Bbæ÷fVÖ&W"##` ¤†÷7FVBãƒ&F÷öÆöw’f÷VæBGvòÆ—fR×&Wf–Wr&Vw&W76–öç3¢ÖWFÆæW72×&Wf–WrÓ“#6æB&÷Vv†æW72×&Wf–WrÓ“#W‡V7FVBF†R6V6öæB–çBWFFRÂv†–ÆR&Ææ¶WBV–v‡B×6×ÆR6WGFÆ–ærFVÆ–VB—Bâ¶VWF†RFWf–6R&W÷'BF–væ÷6—3¢V&Ç’&W77W&Rã†&VF–7FVB#ãC‡†–æ—F–Â&F—W3²6WGFÆVB&W77W&Rã.(	3ã6––VÆG2F†RÆFW"^(	3—†Ö&·2à ¥F†R÷&–v–æÂf–Ww÷'B–çFW"æ÷rW7F–ÖFW2F†R–æ—F–Â&F—W2g&öÒF†RÖ–æ–×VÒ&W77W&Rö'6W'fVB6òf"âv†Vâ—B—2BÖ÷7B‡†Â—B&Vv–ç2æB&WÆ—2F†R'VffW&VB7G&ö¶R–ÖÖVF–FVÇ’âÆ&vW"&ö¦V7FVB7F'G26öçF–çVR6×Æ–ærWFòV–v‡B÷6—F—fR6×ÆW2ÂÆÆ÷v–ærÆ÷vW"&W77W&RFò6‡&–æ²F†R&VF–7FVB&F—W2&Vf÷&R–æ²—2VÖ—GFVBâ&W77W&RÖ–æFWVæFVçB''W6‚6—¦R7F'G2–ÖÖVF–FVÇ’âF†RvW7GW&RFV'Vröç6WBWfVçB&V6÷&G2v†WF†W"6WGFÆ–ærVæFVB&V6W6RF†R&F—W2&V6ÖR6fRÂ6—¦Rv2f—†VBÂ÷"F†R6×ÆRv–æF÷r6ö×ÆWFVBâ6ÖR7G&ö¶R¶W&æVÂÂÆFW"&W77W&RG–æÖ–72ÂF2Ööâ×&VÆV6RÂ×VÇF’ÖÖG&ç67F–öâæB–çWBöæf–vF–öâ÷væW'2&VÖ–âVæ6†ævVBà ¥F†Rãƒ&†÷7FVB'Vâv23có3c#²F†RGvò&Wf–Wrf–ÇW&W2vW&Ræ÷B''W6‚Ö÷WGWB÷"Ö&Vw&W76–öç2Â'WBFVÆ–VB&Wf–WrWÆöG2âãƒ6†÷7FVBF÷öÆöw’æBvW2fÆ–FF–öâVæF–æs²æF—fR•Bõ6f&’66WFæ6RVæF–ærâFWf–6RvFS¢6—¦R#Sbv—F‚Væ6–Â6—¦RVæ&ÆVBÂ6Æ÷rÖÆ–v‡B7G&ö¶W2Â6öÖ&–æVB6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW72ô÷6—G’ÂF2ÂVæFòõ&VFòÂ''W6‚7v—F6†–æræBf–ævW"÷&&—Bâ&W6W'fRãsvÖVçRö6†ææVÂæBãsfGvò×6–FVB÷6—G’56W2â7FæF–ærF—&V7BÖÖ–âV&Æ–6F–öâWF†÷&—¦F–öâ&VÖ–ç27F—fRà  ¢22ãƒB(	B&W—"Væ6–Â7G&ö¶R7F'GWæBG&6Rf–æÆ—¦F–öâ(	Bbæ÷fVÖ&W"##` ¥W6W"ãƒ6d”Ã¢''W6‚FöW2æ÷B7&VFR7G&ö¶Râ&W&öGV6VBF‡&÷Vv‚F†R7GVÂf–Ww÷'B–çBT’†&æW73¢ö–çFW&F÷vâ†—BF†R7W&f6RæB&Vv–â‚–66WFVBÂ'WBF†Rf—'7BÖ÷f–ærVæ6–Â6×ÆR&—6VB6WGF–æw2—2æ÷BFVf–æVF²F†RT’6Vv‡B—BæB6æ6VÆÆVBF†R6öçF7BâFF—fRÖ÷fR‚–æB7F'EVåF‚‚–6Æ÷7W&W2&VfW&Væ6VB6WGF–æw6Â&ÖWFW"Æö6ÂFò&Vv–â‚–â7F÷&RF†R÷&–v–æÂ''W6‚6WGF–æw2öâF†RW†—7F–ær7G&ö¶RG&ç67F–öâæB&VB7G&ö¶Rç6WGF–æw6ò7F—fRç6WGF–æw6–âF†÷6R6Æ÷7W&W2âæòF‡&W6†öÆG2Â&W77W&R6VÆV7F–öâÂ7G&ö¶R¶W&æVÂ÷"–çWB÷væW"6†ævVBà ¤W‡FVæBF†RW†—7F–ær÷BÖ–âvW7GW&RFV'Vr&V6÷&G2v—F‚7W&f6RÖ†—BÂ&Vv–âöÖ÷fRW'&÷'2Âö–çFW"Öf–æ—6‚Â7G&ö¶R6öÖÖ—B&W7VÇBÂ6†ævVB6†ææVÇ2ÂF"6÷VçBæBæòÖ–æ²÷F&vWBÖ6†ævRö6öÖÖ—BÖW'&÷"÷WF6öÖW2âæòFFVBF–væ÷7F–726öç7VÖR–çWBâFB7GVÂT’&Vw&W76–öç2f÷"Æ÷r×&W77W&R7G&ö¶RF†B6WGFÆW2æB6öÖÖ—G2ÂæB¦W&ò×&W77W&R6öçF7BF†B7&VFW2æò—†VÇ2ö†—7F÷'’âW†—7F–ærFW7G26÷fW"&÷F‚''W6‚F‡2æBf÷W"Ö6†ææVÂ6öÆW66VB–çF–ærâfö7W6VB'Vã¢52òd”Â7&÷72F†RæWrG&6RæBãs&(	6ãs†öç6WBö6öçF7B6†V6·2âgVÆÂÆö6Â&Vw&W76–öã¢2ÃcB52òd”Ââ†÷7FVBfÆ–FF–öâÂvW2V&Æ–6F–öâæBæF—fRFWf–6R6†V6²VæF–ærâãƒ6d”Â—2æ÷B&÷FV7FVC²&W6W'fRV&Æ–W"W6W"56W22Æ—7FVB–âF†R†æFöfbà ¢22ãƒBV&Æ–6F–öâæBæF—fR&Æö"&W÷'B(	Bbæ÷fVÖ&W"##` ¥V&Æ—6†VB'VçF–ÖRG&VRöâÖ–æBƒVS6Sf#S–6Vc“vc#C3S†6#S“ƒƒSC†c&²föÆÆ÷r×WFö7VÖVçFF–öâ6öÖÖ—BSs#FS“6SffcSFff#cVS6f†S3#ƒV6#3V&W7F÷&VBF†R6ö×ÆWFRVæBÖöæÇ’†—7F÷'’f–ÆRgFW"F†R6öææV7FVBv—BFFWÆöB†—BF†R6†VÆÂ&W7öç6R×6—¦RÆ–Ö—Bâ7W'&VçB6†V6¶VBÖ÷WBÖ–âæB&VÖ÷FRÖ–â6†&RW†7BG&VRcC3“Ff3C##Vc†S“&C#“3scSCƒ#6f†Cs&âvW2fW'6–öâæ§6öææB6†VÆÂ6†÷vVBãƒF²Æ—fRf–Ww÷'B×–çBæ§6æBf–Ww÷'B×–çBÖ6÷&Ræ§6ÖF6†VBÆö6Â4„Ó#Sb#CFCCCSV6S†S“F3SFC663fcvCƒcFFVFFCƒs“–3c66S“&VC3csæB–fCFC#sfv3vƒƒC†#S33CCV6SFF##“ƒSƒs#Vc3#&c†V3#3““&Cfff36âgVÆÂÆö6Â7V—FS¢2ÃcB52òd”Ââv—D‡V"6öÖ&–æVB7FGW2&WGW&æVBæò6†V6·2à ¥W6W"6öæf—&×2''W6‚æ÷r7&VFW27G&ö¶W2'WBF†W’†fR&Æö'2â7WÆ–VBãƒFG&6S¢F÷vâ&W77W&Rã†²f—'7Böç6WB†—B6×ÆR×v–æF÷rBãSccƒvÂ&F—W2BãS—†²æ÷F†W"öç6WBv2ã##SfÂ&F—W2Rãcs#†ÂföÆÆ÷vVB'’F'2ãƒcn(	3ãcg†âF†R7W'&VçB‡†6fR×&F—W2vFRF†W&Vf÷&R66WG27F–ÆÂÖVÆWfFVBV&Ç’Ö–æ–×VÒÂæBF†RV–v‡B×6×ÆRfÆÆ&6²6âÇ6ò7F'BB×V6‚Æ&vW"&F—W2âF†—2—2æF—fRWf–FVæ6S²Fòæ÷BG&VBãƒF7G&ö¶RÖ7&VF–öâ7V66W722&Æö"Ög&VR66WFæ6Rà ¢22ãƒR(	B6Æ×Vç6WGFÆVBVæ6–Â7F'GW(	Bbæ÷fVÖ&W"##` ¥&W6W'fRF†RW†—7F–ær‡‚–ÖÖVF–FR×6fRöç6WBf÷"7F&ÆR&W77W&Râ–bÖ–æ–×VÒ&W77W&RG&÷2&VÆ÷rsRRöb÷6—F—fRVæ6–ÂÖF÷vâfÇVRÂ6öçF–çVR6WGFÆ–ærVçF–ÂF†R&VF–7FVB&F—W2—2'‚÷"6ÖÆÆW#²–bF†R÷&–v–æÂV–v‡B×÷6—F—fR×6×ÆRv–æF÷rW‡—&W2f—'7BÂ6öæÇ’F†R'VffW&VB–æ—F–ÂF‚B'‚âF†—2&WfVçG27–¶–ær&W77W&RÆFVRg&öÒ7F×–ærâ÷fW'6—¦VB†VBâ7F&ÆR–çFVçF–öæÂ&W77W&RæBÆFW"Æ—fRF'2&VÖ–âVæ6†ævVBâ6†÷'B6öçF7G2&VÆ÷rF†R6×ÆR×v–æF÷rÆ–Ö—B&WF–âF†RW†—7F–ærÖ–æ–×VÒ×&W77W&RF‚Â&W6W'f–ærãsF7–¶R÷&VfW&Væ6RWV—fÆVæ6RæBFVÆ–&W&FRF&V†f–÷"âæòF–ÖW"Â''W6‚¶W&æVÂÂæWr–çWB÷væW"Â÷"&ÆÆVÂ–çFW"à ¤W‡FVæBW†—7F–ærvW7GW&RFV'Vröç6WBWf–FVæ6Rv—F‚ö'6W'fVBöÆ–VB&W77W&RÂ&röÆ–VB&F—W2Â&W77W&RÖG&÷&F–òæB6Æ×7FFRâFB7GVÂ–çBT’FW7G2&W&öGV6–ær&÷F‚&W÷'FVB†–v‚×7F'B&W77W&RGFW&ç2æB76W'F–ær6VB–æ—F–ÂF#²6öç7FçBã†G&6R6öæf—&×2–çFVçF–öæÂ7F&ÆR&W77W&R—2æ÷B6VBâF†Rf—'7BgVÆÂ×7V—FRGFV×BW‡÷6VBGvò&Wf–Wr×WÆöBF–Ö–ær&Vw&W76–öç2v†VâF†R'‚F‡&W6†öÆBv2Æ–VBFòWfW'’7G&ö¶S²&W7F÷&–ærF†R÷&–v–æÂ‡‚f7BF‚f÷"7F&ÆR&W77W&R6÷'&V7FVB&÷F‚âÆFW"'Vâf÷VæBF†RF—&V7BöæW7FVB&VÆV6R×fW'6–öâ–ç2æVVFVBFò7F’6æöæ–6Ã²ÆÂÆöFW"–ç2æB&Wf–WvVB†6†W2vW&R&Vg&W6†VBâf–æÂgVÆÂÆö6Â&Vw&W76–öã¢2Ãcb52òd”Ã²v—BF–fbÒÖ6†V6¶6ÆVââ†÷7FVBV&Æ–6F–öâæBæF—fRãƒV&Æö"66WFæ6RVæF–ærâ&W6W'fRãsv6ö×7BÖVçRöf÷W"Ö6†ææVÂ7G&ö¶R56W2ÂãsfGvò×6–FVB÷6—G’52ÂãsV÷6—G’WF†÷&–ær52æBãsF''W6‚&W77W&R6öçG&öÇ252à ¢22ãƒRV&Æ–6F–öâæBÆ—fR76WBfW&–f–6F–öâ(	Bbæ÷fVÖ&W"##` ¥'VçF–ÖRG&VR3vf&3FCV33##F3VfC&3cs3S“3#fV&Æ—6†VBFòÖ–æB6öÖÖ—B“&33vSVSCCsƒf6cv#s3c†6Cc“6C“#6&V#âÆö6Â6†V6¶÷WB—2Æ–væVBv—F‚÷&–v–âöÖ–ææB6ÆVâ&Vf÷&RF†—2V&Æ–6F–öâæ÷FRâvW2fW'6–öâæ§6öæ&W÷'G2ã3bã‚ãƒV²Æ—fRfW'6–öâÂ6†VÆÂÂæB&Vg&W6†VB'VçF–ÖRf–ÆW2W†7FÇ’ÖF6‚Æö6Â4„Ó#Sc¢fW'6–öâsV#3#C#“V3scF#s&S–3vC#sF#ƒ–&63ƒCFCSSSSFVf&SVcfSc–SV²–æFW‚SS–#fS†&CC#63V&6cCCSCFc“c63c6##cS“c#VVCc#f#ƒ6c&V6²f–Ww÷'B×–çBæ§2–VffF3#s“v#3S6363VS#“s“ƒf“S–fSC3#ƒ†VFSF6C&S6S&Vvc&SSƒf²f–Ww÷'B×–çBÖ6÷&Ræ§2cc#“S#63C†3“fSV3†C#Cssƒ#“F##cFfV3##†VCV3FF3S“f&c–##6²G&vW"×V’æ§2S6f3&63CFC3&#“c&#ƒSƒvCvfFS#S3#C#V3S#s#ƒF6V3Ss–ƒ6#““vF²f6R×v÷&¶fÆ÷rÖÆ–÷WBæ§2C336ƒSCCcsv3Fc“sc#&C3f3sCS#3&&6cCf3#FS3cs#ScF&#Scc&²6†VÆÂÖ6ö×&—6öâæ§2f6#F–fFFSS†3v66#ƒ“v3#C–#–FC&V#c3“–CCCF3#FFCƒ&#vâv—D‡V"6öÖ&–æVB×7FGW2VW'’&WGW&æVBæò6†V6·3²Fòæ÷B6Æ–Ò†÷7FVB&Vw&W76–öââgVÆÂÆö6Â7V—FS¢2Ãcb52òd”ÂâæF—fRãƒV&Æö"Ög&VR66WFæ6RVæF–ærà ¢22ãƒRæF—fR66WFæ6R(	B&÷FV7FVB52(	Bbæ÷fVÖ&W"##` ¥W6W"6öæf—&×2ãƒV–çBv÷&·2v—F†÷WB7F'GW&Æö'2âF†RFW7FVBv÷&¶fÆ÷r76VC¢6Æ÷rÖÆ–v‡BVæ6–Â7G&ö¶W27F'B6ÆVæÇ“²7FVG’&W77W&R&WF–ç2gVÆÂ''W6‚6—¦S²FVÆ–&W&FRFæBVæFòõ&VFòv÷&³²6öÆ÷W"Â&÷Vv†æW72ÂÖWFÆæW72æB÷6—G’–çBFövWF†W"â&÷FV7BF†RãƒVöç6WB&W—"æBF†W6R–çB&V†f–÷'2âæW‡B'V–ÆBÖ’&ö6VVBg&öÒ7W'&VçBÖ–ã²&W6W'fRãsv6ö×7BÖVçRöf÷W"Ö6†ææVÂÂãsfGvò×6–FVB÷6—G’ÂãsV÷6—G’WF†÷&–æræBãsF''W6‚6öçG&öÇ256W2à  ¢22ãƒRFöæR÷&V÷Vâ6Öö¶R(	B&÷FV7FVB52(	Bbæ÷fVÖ&W"##` ¤gFW"F†RgVÆÂãƒVæF—fRVæ6–Â–çB52ÂW6W"Ç6ò6öæf—&×2FöæR(i"&V÷VâUb–çB(i"G&rv–æ76W2â&÷FV7BF†—2&RÖVçG'’6Öö¶Rv—F‚F†Röç6WBÂ7FVG’×&W77W&RÂFÂVæFòõ&VFòæB6öÖ&–æVBf÷W"Ö6†ææVÂ6†V6·2à ¢22ãƒb(	BW‡÷'BWF†÷&VB÷6—G’–âtÄ"(	Bbæ÷fVÖ&W"##` ¥F†RæW‡Bæ'&÷r&öFÖ—FVÒv2÷6—G’W‡÷'BâVF—Bf÷VæBF†RÆ—fR–çBW‡÷'FW"Ç&VG’6æ6†÷G26öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW72æBF†RtÄ"w&—FW"Ç&VG’VÖ&VG2Æ÷76ÆW72FW‡GW&W3²æF—fRS"9rS"÷6—G’—2â#‚&W6÷W&6Rv—F‚F†R6ÖRUb&–æF–ærâW‡FVæBF†W6R÷&–v–æÂ÷væW'2öæÇ“¢6÷’÷6—G’–çFòF†RW†—7F–ærW‡÷'B6æ6†÷BÂfÆ–FFR—G2&–æF–ærÆöæw6–FR÷F†W"–çFVBÖ2ÂVæ6öFR$t$&6RÖ6öÆ÷W"ärv—F‚WF†÷&VBÇ†ÂæBW6Rv†—FR$t"v†Vâæò6öÆ÷W"ÖW†—7G2âW6R7FæF&BvÅDbÇ†ÖöFS¢$ÄTäFæBF÷V&ÆU6–FVC¢G'VVf÷"÷6—G’ÖFW&–Ç2ÂÖF6†–ærF†R66WFVBGvò×6–FVB÷6—G’&Wf–Wrâ6öÆ÷W"ö÷6—G’F–ÖVç6–öç2&R7W'&VçFÇ’S#²F†Rärw&—FW"Ç6ò†æFÆW2Æ–æV"6Æ×&W6×Æ–ær–bS"÷6—G’Ö—2—&VBv—F‚#B6öÆ÷W"Öâ6÷W&6R&W6÷W&6W2&VÖ–âVæ6†ævVBà ¥F†Rf–ÆRtÄ"W‡÷'B7FGW2&W÷'G2WF†÷&VB÷6—G’Ö2âô$¢æBäôÔB&W6W'fRF†V—"W†—7F–ærW‡Æ–6—B÷6—G’&VgW6Ç2âæò6†ævW2Fò–çF–ærÂ&Wf–Wr&VæFW&–ærÂF÷öÆöw’ÂÖöFVÂ¶W&æVÂÂæ&÷†Æ&W'6—7FVæ6R÷"æF—fRäôÒf÷&ÖBâ&VÆV6R–ç2vW&R&Vg&W6†VBf÷"F†RtÄ"öW‡÷'FW"6†–âæB6æöæ–6Â&VÆV6R×fW'6–öâ6†VÆÂÆöFW'3²F†R&÷FV7FVB×VÇF’G&ç6f÷&Ò–â—2VçF÷V6†VBà ¤fö7W6VB–çBÖW‡÷'BÓ“7V—FS¢‚52òd”ÂÂ–æ6ÇVF–ærW†7BärÇ†ö6öÆ÷"'—FW2Â÷6—G’ÖöæÇ’v†—FR$t"Â&W6öÇWF–öâ†æFÆ–ærÂ7GVÂtÄ"¥4ôâöÆöFW"G&ç7&Væ7’æBF÷V&ÆR×6–FVBÖFW&–ÂÂ6÷W&6R–Ö×WF&–Æ—G’ÂæBäôÔB&VgW6Ââ7W'&VçB&VÆV6Rö76WB×–â6†V6·3¢’52òd”ÂâgVÆÂÆö6Â&Vw&W76–öã¢2Ãc‚52òd”Â–âC’ã"6V6öæG2âv—BF–fbÒÖ6†V6¶—26ÆVââæF—fR•B(i"æöÖBW‡÷'B66WFæ6R—2VæF–ærà ¤†æG2Ööâ6†V6³¢6öÖ&–æVB6öÆ÷W"´÷6—G’7G&ö¶S²FöæR÷&V÷Vâ÷&VG&s²W‡÷'BtÄ"æB–ç7V7BF†RG&ç7&VçB&Vv–öâæB&V"f6W2–âæöÖBâW‡÷'B÷6—G’ÖöæÇ’tÄ"æB6†V6²G&ç7&Væ7’âFòæ÷B&WFW7Bô$¢ôäôÔB÷6—G’27V66W72Fƒ²F†V—"v&æ–æw2&VÖ–âW‡V7FVBâgFW"52Â&W7VÖR–×÷'FVBäôÒôtÄ"Ub–çB2F†RæW‡B&öFÖ—FVÒà  ¢22ãƒbV&Æ–6F–öâæBÆ—fR76WBfW&–f–6F–öâ(	Bbæ÷fVÖ&W"##` ¥'VçF–ÖR6öÖÖ—Bc–6&fcSCsS&Cc““V3VFC&fCSs3cS3SS—2öâÖ–æÂG&VRcC†##CSvCVcccS6F3“#fvVFSCc&VFcsf6²6†V6¶VBÖ÷WB6÷W&6RÖF6†W2F†BG&VRâvW26W'fW2fW'6–öâæ§6öæãƒfâÆ—fR4„Ó#SbW†7FÇ’ÖF6†W2Æö6Âf÷"fW'6–öâæ§6öâÂ–æFW‚æ‡FÖÂÂW‡÷'BÖ2×æVÂæ§2Â–çBÖW‡÷'Bæ§2ÂæöÖB×66Æ"×æræ§2ÂæöÖB×6¶VBÖÖ2æ§2ÂæöÖBÖW‡÷'BÖ6÷&Ræ§2Â6†VÆÂÖ6ö×&—6öâæ§2ÂG&vW"×V’æ§2æBf6R×v÷&¶fÆ÷rÖÆ–÷WBæ§2âv—D‡V"6öÖ&–æVB7FGW2&WGW&æVBæò6†V6·3²æò†÷7FVBFW7B&W7VÇB—26Æ–ÖVBâgVÆÂÆö6Â&Vw&W76–öâ—22Ãc‚52òd”Ã²æF—fR•BôæöÖB66WFæ6R&VÖ–ç2VæF–ærà  ¢22ãƒbæF—fR÷6—G’W‡÷'B(	B&÷FV7FVB52(	Bbæ÷fVÖ&W"##` ¥W6W"&W÷'G252f÷"F†R6ö×ÆWFRæF—fRvFS¢6öÆ÷W"æB÷6—G’–çBFövWF†W#²FöæR÷&V÷Vâ÷&VG&r7V66VVG3²W‡÷'FVBtÄ"G&ç7&Væ7’æB&WfW'6RÖf6Rf—6–&–Æ—G’v÷&²–âæöÖC²æBâ÷6—G’ÖöæÇ’tÄ"&WF–ç2G&ç7&Væ7’â&÷FV7BF†W6R&W7VÇG2âF†—26Æ÷6W2F†RãƒfÖçVÂ6†V6¶Æ—7Bà ¥W6W"6·2†÷rÖç’Ö÷&R'V–ÆG2&Vf÷&Rt4Ò7F'G2â&WòVF—Bf–æG2æòt4Ò6öFR÷"W‡Æ–6—BÖ–ÆW7FöæRâ6WBãƒv2F†R¶–6¶öfc¢VF—BW†—7F–ærW&f÷&Öæ6R×6Vç6—F—fR÷væW'2Â&V6÷&B&WVF&ÆR¦f67&—B&6VÆ–æW2Â6†ö÷6RöæRÖV7W&VB6æF–FFRæBFVf–æR72F‡&W6†öÆG2âF&vWBãƒ†f÷"æ'&÷rt4Òô"&÷F÷G—RöæÇ’–bF†R&6VÆ–æR–FVçF–f–W2v÷'F‡v†–ÆRF&vWBâ¶VWF†R÷&–v–æÂ¦f67&—B÷væW"æB&WV—&RWV—fÆVçB÷WGWBÇW2ÖV7W&VB7VVBv–ã²ÖV7W&RÖVÖ÷'’6W&FVÇ’&Vf÷&R6Æ–Ö–ærÆ&vW"ÖÖW6‚66—G’âF†Bt4ÒÖf—'7B&÷÷6Âv27WW'6VFVB'’F†RW6W.(	—2æW‡BÖW76vS²–×÷'FVBäôÒôtÄ"Ub–çF–æræ÷r6öÖW2f—'7Bà ¢22ãƒr(	B&V6öææV7B–×÷'FVBFW‡GW&VÆW72äôÒôtÄ"UbÖW6†W2Fò–çB(	Bbæ÷fVÖ&W"##` ¥W6W"&W&–÷&—F—¦W2–×÷'FVBäôÒôtÄ"Ub–çF–ær&Vf÷&Rt4ÒâVF—B6öæf—&×2F†RW†—7F–ærUb–çFW"Â–çEF&vWD¶W–Â&ö¦V7B6öFV2Â–çB×&W6÷W&6RööÇ2ÂæBW‡÷'B6æ6†÷B&RF†RWF†÷&—FF—fR÷væW'2âF†R7GVÂ&Æö6¶W"v2F†R6÷W&6SÓÓÒv&÷†Æ"vwV&B–âF†R–çBF&vWB÷&W6÷W&6RfÆ–FF÷"âæò6V6öæB–çFW"ÂUbVF—F÷"÷"ÖöFVÆÆ–ær¶W&æVÂ—2–çG&öGV6VBà ¤W‡FVæBF†R÷&–v–æÂ–çBF&vWB÷&W6÷W&6RVÆ–v–&–Æ—G’Fò–×÷'FVBäôÒæBtÄ"öæÇ’v†VâWfW'’f6R†2fÆ–BUb6÷&æW'2v—F†–âF†R(	3F–ÆRÂF†RF÷öÆöw’6–væGW&R—27W'&VçBÂæBF†R–ÆöB†26–ævÆR6öÆ–BÖFW&–Âv—F‚æòVÖ&VFFVB–ÖvW2â&V¦V7B–×÷'FVBfW'FW‚6öÆ÷W'2ÂFævVçG2ÂÖ÷'‚F&vWG2Â×VÇF’ÖÖFW&–Â76–væÖVçG2ÂG&ç7&Væ7’÷Gvò×6–FVB÷VæÆ—BæöÖBÖFW&–Ç2æBÖ÷&RF†â#Ã6÷&æW'2â–×÷'FVB6÷W&6R–ÆöB&VÖ–ç2–â—G2W†—7F–æræ&÷†Æ&&W6÷W&6RVçfVÆ÷Râg&W6‚6öÆ÷W"–çB&6R—2–æ—F–Æ—¦VBg&öÒF†Rf–Ww÷'BÖFW&–Âw26öÆ–B6öÆ÷W"6ò–çF–ærFöW2æ÷BW&6RF†R–×÷'FVBf7F÷"6öÆ÷W"âW†—7F–ær–çBÆ–W'2ÂÖ6†ææVÇ2Â''W6‚ö6öçF7BÂUb&–æF–ærÂ†—7F÷'’æB6fRö÷Vâ&VÖ–â–âF†V—"7W'&VçB÷væW'2âUbVF—BwV&G2Ç&VG’&VgW6RUb6†ævW2v†–ÆR–çBW†—7G2âVÖ&VFFVBÖ–ÖvR6÷W&6RÖFW&–Ç2&VÖ–â&÷FV7FVC²F†—2'V–ÆBFöW2æ÷B6ö×÷6—FR÷"&WÆ6R6÷W&6RFW‡GW&RÖ2à ¤FFVB7GVÂ÷væW"&Vw&W76–öç2f÷"–×÷'FVBäôÒæBtÄ"7G&ö¶R6öÖÖ—BÂ÷&–v–æÂÖFW&–ÂÖ6öÆ÷W"7F'GWÂ&–æF–ærÂæBgVÆÂ&ö¦V7BVæ6öFRöFV6öFRâFFVBwV&G2f÷"–×÷'FVBFW‡GW&W2Â×VÇF—ÆRÖFW&–Ç2æB÷WBÖöb×F–ÆRUg2â&Vg&W6‚ffV7FVB–çB÷&W6÷W&6Rö6öFV2ö–×÷'BöW‡÷'BõT’ÆöFW"–ç2æB&Wf–WvVB'VçF–ÖR76WB6öçG&7G3²F†R&÷FV7FVB×VÇF’G&ç6f÷&Ò&VÖ–ç2–ææVBBã3bããâfW'6–öâæ§6öæÂF—FÆRÂf—6–&ÆR&VÆV6RÆ&VÂæB6†VÆÂFW7BÆ—7BGfæ6RFövWF†W"Fòãƒvà ¥fÆ–FF–öã¢fö7W6VB–×÷'FVBÕ–çB2ó3²fö7W6VB7W'&÷VæF–ær–çB÷&ö¦V7BöW‡÷'BôäôÒ×&WFVçF–öâ#Bó#C²gVÆÂÆö6Â7V—FR2Ãs52òd”Â–âCbãB3²v—BF–fbÒÖ6†V6¶6ÆVââV&Æ–6F–öâæBÆ—fRvW2'—FRfW&–f–6F–öâ&R&V6÷&FVB–âF†Rãƒv6ö×ÆWF–öâVçG'’&VÆ÷râæF—fR66WFæ6R—2VæF–ærâF†RFWf–6R6†V6¶Æ—7B6÷fW'2VçFW‡GW&VBäôÒôtÄ"–çF–ærÂæ&÷†Æ&&V÷VâÂæB6fR&VgW6ÂöbFW‡GW&VB–×÷'G2âF†R&VÖ–æ–ær&W&WV—6—FR&Vf÷&Rt4Ò—2FW‡GW&VB–×÷'FVB&6RÖ6öÆ÷W"6ö×÷6—F–öâæBæF—fR–çB66WFæ6Rà ¢22ãƒrV&Æ–6F–öâfW&–f–6F–öâ(	Bbæ÷fVÖ&W"##` ¥'VçF–ÖR6öÖÖ—B3“#ƒs#FvF#3†FC“ƒ66#–C3SƒsvsC†f—2öâÖ–æâ†÷7FVBF÷öÆöw’'VâC###c3ccSf76VBÆÂ2ÃsFW7G2–â3‚ã"3²vW2'VâC###c3ccF7V66VVFVBâÆ—fR‡GG3¢òö7&—6&W§¢æv—F‡V"æ–òô&÷„Æ"ö&VæFW'2F—FÆRæBf—6–&ÆRfW'6–öâcã3bã‚ãƒvâæF—fR•Bõ6f&’–çF–ær66WFæ6R&VÖ–ç2VæF–æs²æòFWf–6R52—2–æfW'&VBâF†—2&–÷&—G’7WW'6VFW2F†R&V6VF–ært4ÒÖf—'7B&÷÷6Âà  ¢22ãƒræF—fR66WFæ6R(	B&÷FV7FVB53²æöÖBf6Vw&÷W2&W÷'B(	Bbæ÷fVÖ&W"##` ¥W6W"6öæf—&×2ãƒv52f÷"–×÷'FVBFW‡GW&VÆW72äôÒôtÄ"Ub–çF–ærâ&V6÷&BF†R6ö×ÆWFRFWf–6R6†V6¶Æ—7B2&÷FV7FVC¢äôÒôtÄ"–çBÂ6÷W&6R6öÆ–B6öÆ÷W"ÂFöæR÷&V÷VâÂæ&÷†Æ&6fRô÷VâÂVæFòõ&VFòÂæB6fR&VgW6ÂöbFW‡GW&VB÷"×VÇF’ÖÖFW&–Â6÷W&6W2à ¥W6W"FF—F–öæÆÇ’&W÷'G2F†Bf6Vw&÷W2F–Bæ÷B–×÷'Bg&öÒF†V—"æöÖBf–ÆRâVF—Bf÷VæBF†RW†—7F–æräôÒ'6W"&VG2W"Öf6Rf6W5öw&÷WÂ&W6öÇfW2æÖW2g&öÒF†RÖW6‚w&÷W6F&ÆRæB6öç7G'V7G2VF—F&ÆTÖW6‚æf6Tw&÷W6âF†R7GVÂf–ÆRÖF—7F6†W"f—‡GW&RF–Bæ÷B&Wf–÷W6Ç’76W'BF†BF†Rö&¦V7BÖÖævW"&W7VÇB&WF–æVBF†÷6RÆ&VÇ2Â6ò7G&VæwF†VâF†B&Vw&W76–öââF†R6†V6¶VBÖ–â7W÷'FVBÖf÷&ÖB–çFVw&F–öâFW7Bæ÷r76W'G2²t&öG’rÂuG&–ÒuÖöâF†RÖævW"ÖFFVBVF—F&ÆRÖW6ƒ²fö7W6VBFW7G2öæöÖBÖ–×÷'BÓ2çFW7BæÖ§676W2"ó"âF†RÖævW"F‚&W6W'fW2æÖVBw&÷W2f÷"F†—2f—‡GW&RâF†RW6W"w27V6–f–2ææöÖ—2æ÷B&W6VçBÂ6òFòæ÷B6Æ–ÒF†R&W÷'Bf—†VB÷"wVW72BâVæFö7VÖVçFVBf÷&ÖBâæW‡C¢&WVW7Bö–ç7V7BF†Rf–ÆR÷"Ö–æ–ÖÂW‡÷'BÂ6†V6¶–ærf6Vw&÷W–æFW‚fÇVW2ÂæÖR×F&ÆRÆ6VÖVçBæB7F—fR×VÇF—&W2ÖÆWfVÂ÷væW'6†—ÂF†VâF6‚F†RW†—7F–ær–×÷'B÷væW"â&W6W'fRãƒrW6W"52æBF†R&÷FV7FVB×VÇF’G&ç6f÷&Òf–ÆRà  ¢22ãƒ‚(	B¶VW&WVFVBÖæÖRæöÖBf6Vw&÷W2F—7F–æ7B(	Bræ÷fVÖ&W"##` ¥W6W"GF6†W2FW7B–×÷'BææöÖÂUb×Vçw&VBæöÖBcrÖW6‚v—F‚“bf6W2âVF—BöbF†R7GVÂf–ÆS¢f6W5öw&÷W6öçF–ç2V–v‡B76–væVBw&÷W”G2ƒÂ.(	3BÂn(	3’“²F†RFVâÖVçG'’w&÷W6F&ÆRæÖW2WfW'’VçG'’F6†âW†—7F–æräôÒ'6W"6÷'&V7FÇ’&VG2W"Öf6R”G2'WBVF—F&ÆTÖW6‚æf6Tw&÷W6æBF†Rf6Vw&÷W2ÆWGFRW6R7G&–æw22–FVçF—G’â6öçfW'F–ærV6‚”BFòF†R6ÖR7G&–ærF†W&Vf÷&R6öÆÆ6VBÆÂ76–væÖVçG2–çFò6–ævÆR&÷râF†—2—2F†R&ö÷B6W6S²w&÷W2vW&R&W6VçB–âF†Rf–ÆRæB'6VBÂ'WBF†V—"&WVFVBFVfVÇBæÖW2W&6VBF†V—"F—7F–æ7B–FVçF—F–W2à ¥&W—"F†RWF†÷&—FF—fRæöÖBÖ–×÷'BÖ6÷&VæÖRÖ–æröæÇ’âVæ—VR6÷W&6RæÖW2&VÖ–â'—FRÖf÷"Ö'—FRÆ&VÇ2âGWÆ–6FRæÖW2&V6V—fRFWFW&Ö–æ—7F–2„â–7Vff—†W2&6VBöâ÷&–v–æÂF&ÆR–æFW‚Â&W6W'f–ærVæ—VRæÖW2æBfö–F–ærÆ&VÂ6öÆÆ—6–öç2â÷&–v–æÂf6RÖw&÷W76–væÖVçG2ÂUb'&—2ÂG&ç6f÷&×2æB6÷W&6R–ÆöB&RVæ6†ævVBâW†—7F–ærÆWGFR÷&VæFW&–ærÂ6fRô÷Vâö†—7F÷'’æBäôÒW‡÷'B÷væW'26öç7VÖRF†R&W7VÇF–ærVæ—VR7G&–æw2â–×÷'B7FGW2æ÷ræGW&ÆÇ’&W÷'G2F†RF—7F–æ7B–×÷'FVB6÷VçBâF†RWÆöFVBÖöFVÂ—2æ÷B6†V6¶VB–çFòF†RV&Æ–2&W÷6—F÷'“²FW7G2vVæW&FRWV—fÆVçB&WVFVBÖæÖRÖWFFFæBfW&–g’F—&V7B'6W"&W7VÇBÂ7GVÂf–ÆRF—7F6†W"öö&¦V7BÖÖævW"–ç6W'F–öâÂV–v‡BÆWGFRVçG&–W2f÷"V–v‡Bw&÷W”G2ÂæBäôÒW‡÷'B÷&V–×÷'BâW†—7F–ær&öG–öG&–Öf—‡GW&R&VÖ–ç2Væ6†ævVBà ¤fö7W6VB–×÷'FW"7V—FS¢252òd”Ââ&VÆV6Rö66†RÖ6öçG&7B6†V6·2–æ—F–ÆÇ’6Vv‡B7FÆR&Wf–WvVB–ç3²F†R6æöæ–6ÂF—&V7BöæW7FVB&VÆV6R×fW'6–öâ6†–âæBffV7FVB–×÷'FW"Â6†VÆÂÂG&vW"ÂÆ–÷WBæBF–væ÷7F–2ÖÆöFW"–ç2vW&RWFFVBæB&V6†V6¶VBâãƒv&VÖ–ç2F†R&÷FV7FVBæF—fR52âãƒ†•Bõ6f&’66WFæ6R—2VæF–æs¢–×÷'BF†R7WÆ–VBäôÒÂ–ç7V7BV–v‡BF—7F–æ7Bf6Vw&÷W2&÷w2ö76–væÖVçG2Â6fRô÷VâæBäôÒW‡÷'B÷&V–×÷'BâFW‡GW&VB–×÷'FVB–çB&VÖ–ç2æW‡C²t4Ò7F—2FVfW'&VBà  ¢22ãƒ‚fÆ–FF–öâæBV&Æ–6F–öâ(	Bræ÷fVÖ&W"##` ¤fö7W6VBäôÒ–×÷'FW"&Vw&W76–öâ76W22ó2âgVÆÂÆö6Â7V—FR76W22Ãs"ó2Ãs"v—F‚¦W&òf–ÇW&W3²v—BF–fbÒÖ6†V6¶—26ÆVââ'VçF–ÖR–ç2öÖ&¶W'2æB÷&–v–æÂ×VÇF’G&ç6f÷&Ò&÷FV7F–öâ72&VÆV6RÖ6öçG&7B6†V6·2âvW2'VâC#3cSCs#“6æB†÷7FVBF÷öÆöw’'VâC#3cSC“s&7V66VVFVBâW6W"&W÷'G2ãƒ‚56f÷"–×÷'F–ærF†R7WÆ–VBäôÒÂ6†V6¶–ærV–v‡BF—7F–æ7Bw&÷W&÷w2÷&Vv–öç2Â6fRô÷VâæBäôÒW‡÷'B÷&V–×÷'Bâ&÷FV7BF†—2æF—fR&W7VÇBâæWr&WVW7C¢76W72–çB'F–f7G2BUb—6ÆæB¦ö–ç2æB÷76–&ÆRÆ&vW"FW‡GW&RÖ2â–æ—F–ÂVF—Bf–æG27W'&VçBS,+"ó#L+"6öÆ÷W"Ö7W÷'BÂv—F‚#L+"fÆ–FF÷'2÷&W6÷W&6R'VFvWG27&÷72–çFW"ÂÆ–W&VB&W6÷W&6W2Â&ö¦V7G2æBW‡÷'G3²6VÒÖv&R''W6‚6×Æ–ærW†—7G2f÷"f–ÇFW'2Â'WBF†—2ÆöæRFöW2æ÷BW7F&Æ—6‚FW‡GW&RFF–ærf÷"÷&F–æ'’–çB7G&ö¶W2âæW‡B—6öÆFRF†R–ÖvRW†×ÆRæBF—7F–æwV—6‚–ç7Vff–6–VçBFW†VÂFVç6—G’g&öÒ—6ÆæBÖVFvR&ÆVVB&Vf÷&Rv–FVæ–ærF†Rf÷&ÖB÷&W6÷W&6RVçfVÆ÷Rà¢22ãƒ’(	Bf—†VBf÷W"×FW†VÂUbVFvRFF–ær(	Bræ÷fVÖ&W"##` ¥W6W"&W÷'G2ãƒ‚56æBö'6W'fW26×Æ–ær'FVf7G2v†W&R–çFVBUb—6ÆæG2ÖVWBâVF—B6öæf—&×27W'&VçB6öÆ÷W"Ö27W÷'BS,+"æB#L+#²F†RWF†÷&—FF—fRUb&Wf–WrvVöÖWG'’Â6öÖÖ—GFVB–çB7W&f6RæB÷&–v–æÂtÄ"ôäôÒ6æ6†÷BW‡÷'FW'2&RF†R&–v‡B÷væW'2â6Æ–FW"ÆöæR6ææ÷Bf—‚—C¢VçW6VBFÆ2FW†VÇ2æVVBVFvRÖ6öÆ÷W"F–ÆF–öââFBf—†VBf÷W"×FW†VÂ$t"&ÆVVB–çFòF†RwWGFW'2f÷"6öÖÖ—GFVBÆ—B–çB&Wf–WræBW‡Æ–6—FÇ’Væ&ÆVBtÄ"ôäôÒW‡÷'G2â&W6W'fRÖVB—†VÇ2ÂVF—F&ÆR&W6÷W&6R'—FW2ÂUg2æBÇ†â–çBFöW2æ÷B&W&7FW"F†RgVÆÂFÆ2WfW'’Væ6–Âg&ÖRâ6÷fW&vR—266†VB2öæR&—BW"FW†VÃ²FW‡GW&RFF'VffW'2&R&WW6VBâVç7W÷'FVBö6ö×ÆW‚UbÆ–÷WG2f–Â÷VâFòF†RW†—7F–ærFW‡GW&Râæ&÷†Æ&&W6÷W&6W2Â&W6öÇWF–öâÂ&W6÷W&6RööÇ2æB&ö¦V7BöW‡÷'B62&RVæ6†ævVBà ¤f÷W"#L+"$t$Æ–W"Ö2W6RbÖ”"F÷FÃ²f÷W"#CŒ+"Ö2v÷VÆBW6RcBÖ”"&Vf÷&RÖ6·2ÂfÆGFVæVB&Wf–WrÂv÷&¶–ærö†—7F÷'’6÷–W2ÂuRFW‡GW&W2æBW‡÷'B6æ6†÷G2âF†W6R&R—†VÂÖ'—FR6Æ7VÆF–öç2Âæ÷BÖV7W&VÖVçG2öbF÷FÂ•Bö'&÷w6W"ÖVÖ÷'’ât4Ò6â66VÆW&FR5Rv÷&²öæÇ’v†Vâ&Væ6†Ö&·26†÷r&÷GFÆVæV6³²—B6ææ÷B&VGV6RFW‡GW&R'—FW2÷"'&÷w6W"ôuRÆ–Ö—G2âæò#CŒ+"6–æ7&V6R÷"t4Ò–çFVw&F–öâ–âF†—2'V–ÆBâ–×÷'FVBFW‡GW&VBäôÒôtÄ"–çB&VÖ–ç2†VBöbt4Òà ¤fö7W6VB6†V6·3¢FF–ærö6öÖÖ—GFVB&Wf–WrB53²–çB–ÖvRöW‡÷'B‚53²tÄ"ôäôÒö÷6—G’W‡÷'B‚53²ò–çFVw&F–öâb53²&W6öÇWF–öâ÷&ö¦V7BÆ–Ö—G2r53²&VÆV6Rö66†R6öçG&7G252âgVÆÂÆö6Â'VææW"7VÖÖ'“¢2Ãc’52ò"FW7BÖf–ÆRv÷&¶W"FW&Ö–æF–öç3²ÖWFÆæW72×&Wf–WrÓ“#2çFW7BæÖ§6æB&÷Vv†æW72×&Wf–WrÓ“#çFW7BæÖ§6&–çBF†V—"66W2276–ær'WBF†V—"v÷&¶W'2&V6V—fR4”t´”ÄÂ&Vf÷&R6ö×ÆWF–öââæò76W'F–öâf–ÇW&R—2&W÷'FVBÂ'WBF†RgVÆÂ7V—FR—2æ÷Bw&VVââæF—fR•Bõ6f&’6VÒ66WFæ6RæBV&Æ–6F–öâfW&–f–6F–öâVæF–ærà ¤†æG2Ööã¢÷VâF†RUb×Vçw&VBæöÖBÖöFVÂÂ–çBæV"â—6ÆæBVFvRÂ&W72FöæRÂ–ç7V7B6V×2æBF†RVæ6†ævVB–çFVBf6S²6fRô÷VâæBW‡÷'B÷&V–×÷'BäôÒæBtÄ"âFòæ÷B&WFW7B–ÖvR×&W6öÇWF–öâÆ–Ö—G226†ævVC²62&VÖ–âS,+"ó#L+"â¶VWF†R&÷FV7FVB×VÇF’G&ç6f÷&ÒVæ6†ævVBà  ¢22ã“(	B&W—"Æ—fR–çBf–Ww÷'BFW‡GW&RWFFW2gFW"ãƒ–d”Â(	Bræ÷fVÖ&W"##` ¥W6W"&W÷'G2–çB—266WFVB'WBVF—G26†÷röæÇ’–âF†RÖFW&–ÂÆ–W"Æ—7BÂæ÷BöâF†RÖöFVÂâF†RGF6†VB67&VVç6†÷B6öæf—&×2Ub–çB—27F—fRâVF—BG&6W2F†R&Vw&W76–öâFòãƒ–w2æWrFW‡GW&RWFFR÷F–Ö—¦F–öâ–â7&VFU–çE7W&f6V¢7F—fR–çBW‡Æ–6—FÇ’6WG2FF–æs£Fòfö–B&R×&7FW&—¦–ærF†RFÆ2W"Væ6–Âg&ÖRÂ'WBF†R†VÇW"w2V&Ç’&WGW&â&WGW&æVB—†VÇ6v—F†÷WB6÷––ærF†VÒ–çFòF†R6W&FRW'6—7FVçBF—7Æ’FW‡GW&RâF†Rf—'7B&Wf–WrV&VBÂF†VâÆFW"–â×Æ6RVF—G2&VÖ–æVB7FÆRöâF†RÖöFVÂv†–ÆRÆ–W"F‡VÖ&æ–Ç2W6VBF†RWFFVBv÷&¶–ær'VffW"à ¥&W—"F†RW†—7F–ærF—7Æ’÷væW"öæÇ“¢v†VâFF–ær—2F—6&ÆVBÂ6÷’7W'&VçB—†VÇ2–çFòF†RW†—7F–ærF—7Æ’FW‡GW&RæBÖ&²—Bf÷"WÆöBâv†VâFF–ær—2Væ&ÆVBÂ&WF–âF†RW†—7F–ærf÷W"×FW†VÂFW&—fVBÖ'VffW"F‚æBfö–B&WVF–ær—Bf÷"Væ6†ævVB6÷W&6R–FVçF—G’âæò6÷W&6R&W6÷W&6RÂÆ–W"ÂUbÂÇ†Â†—7F÷'’ÂW‡÷'BÂ&VæFW&W"Â÷"&W6öÇWF–öâ6†ævW2â&W6W'fRF†Rãƒ†æF—fR52æBãƒ–FF–ær–×ÆVÖVçFF–öã²&V6÷&Bãƒ–æF—fRf–Ww÷'Bf—6–&–Æ—G’2d”ÂÂv—F‚6VÒ×FF–ær&VæVf—BVæF–ærà ¤FB&Vw&W76–öâF†BVF—G2F†R6ÖR6÷W&6R'VffW"æB76W'G2F†RF—7Æ’FW‡GW&R&V6V—fW2F†÷6R'—FW2æB–æ7&VÖVçG2—G2fW'6–öââ7G&VæwF†Vâ&VÂf–Ww÷'B×7G&ö¶R–çFVw&F–öâ6÷fW&vR6òF†RÆ—fRF—7Æ’FW‡GW&RæB6öÖÖ—GFVBF—7Æ’ÖF6‚F†R–çB&W6÷W&6Râfö7W6VBfÆ–FF–öã¢3252òd”Â7&÷72Æ—fR–çBFW‡GW&RWFFW2Â&VÂf–Ww÷'B7G&ö¶W2Âf÷W"×FW†VÂFF–ærÂ–ÖvR6ö×÷6—F–öâÂäôÒôtÄ"W‡÷'BæB&Wf–WvVB&VÆV6Rö66†R6öçG&7G2âæF—fR•Bõ6f&’66WFæ6R&VÖ–ç2VæF–æs²V&Æ—6‚ã“gFW"WFF–ærF†R&VÆV6R&V6÷&Bà  ¢22ã“†÷7FVB&Vw&W76–öâ6÷'&V7F–öâ(	B&VÖ÷fR7FÆRãƒ–&VÆV6R76W'F–öâ(	Bræ÷fVÖ&W"##` ¥F†R7GVÂã“F÷öÆöw’Æör—2f–Æ&ÆS¢†÷7FVBFW7BFW7G2öF—7Æ6VÖVçB×&Wf–WrÖvFRÓCçFW7BæÖ§6f–ÆVB&V6W6R—G27W'&VçB×&VÆV6RFW7B&WV—&VB&÷F‚fW'6–öâæ§6öææBF†R6†VÆÂÖ6ö×&—6öâ–âFòWVÂãƒ–âF†RæWr'V–ÆB6÷'&V7FÇ’&W÷'G2ã“²F†—2v27FÆR†—7F÷&–6ÂFW7B76W'F–öâÂæ÷B–çB'VçF–ÖRf–ÇW&Râ¶VWF†R&÷FV7FVBãC&Væ6†Ö&²6†V6·2â&VBF†R7W'&VçBfW'6–öâæ§6öæ–âF†RFW7BÂW6R76W'E6†VÆÅ&VÆV6R†–æFW‚ÂfW'6–öâ–ÂæB6ö×&RF†R6†VÆÂÖ6ö×&—6öâ66†R–âv—F‚F†B6ÖRfW'6–öââF†Rfö7W6VB&Væ6†Ö&²æB&VÆV6RÖ6öçG&7BFW7G272rórâvW2'VâC#33s3c“s6—27V66W76gVÂæBÆ—fRã“Ö&¶W'2ÇW2ffV7FVB'VçF–ÖR76WB'—FW2ÖF6‚F†R&W÷6—F÷'’â†÷7FVBF÷öÆöw’&W'VâC#33sS“#c6†¦ö"#ƒ#“s“#ƒSc†Â6öÖÖ—B3#–Ss#FS3SSss“c#ƒ†VS66C3cv&#vSsV’76VBÆÂ2ÃsrFW7G2v—F‚¦W&òf–ÇW&W2âvW2'VâC#33sS“cS&7V66VVFVBgFW"F†RFW7B6÷'&V7F–öââæF—fRã“FWf–6R66WFæ6R&VÖ–ç2VæF–ærâF†Rãƒ–f–ÆVB×'VâÆörVæGö–çB7F–ÆÂ6Æ÷6W2&Vf÷&R&WGW&æ–ær÷WGWC²—G26W6R&VÖ–ç2Væ¶æ÷vâà  ¢22ã“(	B–ÖvR6VÒFF–ærW6W2&ö¦V7F–öâFW†VÂ6VçG&W2(	Bræ÷fVÖ&W"##` ¥W6W"6öæf—&×2ã“53²&W6W'fRÆ—fR–çBf—6–&–Æ—G’æBV&Æ–W"ãƒ‚f6Vw&÷W252âW6W"7WÆ–W2&—fFR“‚×fW'FW‚ó“b×VB7†W&Rv—F‚æöÖBf6Vw&÷WUg2Â#L+"6öÆ÷W"æB&WF–æVB–ÖvR&V6—Râ&ö¦V7B–ç7V7F–öâ6öæf—&×2FF–ærö67Wæ7’W6VB—†VÂò‡6—¦RÓ’Âv†–ÆR–ÖvR&7FW&—¦F–öâW6VB‡—†VÂ²ãR’÷6—¦RâF†RÖ6·2F—6w&VRöâ2Ã#BFW†VÇ3¢Ã##’&Ææ²wWGFW'2&÷FV7FVBæBÃƒ“R–ÖvRÖ6÷fW&VBFW†VÇ26öç6–FW&VBwWGFW'2â&W—"F†RW†—7F–ærFF–ærÖ6²öæÇ“²¶VWf–ÇFW"ö''W6‚6ö÷&F–æFR&V†f–÷"–çF7Bâæò–ÖvR6÷W&6RÂUbÂÇ†Â†—7F÷'’ÂF÷öÆöw’÷"&W6öÇWF–öâ6†ævW2âæò&—fFR&ö¦V7Bö–ÖvR6öÖÖ—GFVBà ¤æWrF–vöæÂg&7F–öæÂÕUb&Vw&W76–öâfW&–f–W2W†7BÖVB—†VÇ2Â6öÆ÷W&VBF¦6VçBwWGFW'2æB6÷W&6R&W6W'fF–öââW†—7F–ærf—‡GW&R6ö÷&F–æFW2æ÷rW‡Æ–6—FÇ’FW67&–&RFW†VÂÖVFvR&÷VæG2W6–ærF†R–ÖvR6öçfVçF–öââfö7W6VBFF–ær÷f–Ww÷'B÷&VÆV6R‚ó‚73²7W'&÷VæF–ær–ÖvRöW‡÷'B#ó#76VB&Vf÷&RFF–ærF†Rf–æÂ&Vw&W76–öââ7WÆ–VB×&ö¦V7BFW&—fVBÖ6†ævW2"Ã#R$t"wWGFW"FW†VÇ2v—F‚¦W&òÇ†6†ævW2÷6÷W&6R×WFF–öââV&Æ–6F–öâö†÷7FVBæBæF—fRf—7VÂ66WFæ6RVæF–ærâæW‡BæF—fR–ÖvR6V×2F†Vâ–×÷'FVBFW‡GW&VB–çB&Vf÷&Rt4Òà ¢ã“V&Æ–6F–öã¢'VçF–ÖRCf3ScS#&&V&f#Cs3–&C“#V&c–SCc–#“ƒ#3S"76VB†÷7FVBF÷öÆöw’C#3CS#ƒs#‚Â¦ö"#ƒ3#sSSS¢2Ãs‚52òd”ÂâFF—F–öæÂ–ÖvR&ö¦V7F–öâ÷w&÷&7FW&—¦F–öâfö7W6VBFW7G272‚ó‚â7G&VæwF†VæVBF†R7–çF†WF–2f—‡GW&RFòF†–âg&7F–öæÂF–vöæÂG&–ævÆS¢öÆBFF–ærÆVfW26—‚F¦6VçBwWGFW"6×ÆW2w&öæs²6÷'&V7FVBFF–ær76W2†f–æÂFF–ær7V—FRbób’âFW7BÖöæÇ’6öÖÖ—BcFf3&C“6c“Sc#–3f6f6fcVF#fcc–fFcf3‚ÆVfW2'VçF–ÖR'—FW2Væ6†ævVBâvW2C#3CSCScc‚7V66VVFVC²Æ—fRfW'6–öâæ§6öâö–æFW‚æ‡FÖÂæB–çBÖf–ÇFW"ÖFöÖ–â÷–çB×F&vWB÷–çBÖW‡÷'B÷f–Ww÷'B×–çBÖ6÷&R÷f–Ww÷'B×–çBÆÂ'—FRÖÖF6‚âöÆBfW'7W2&W—&VBFW&—fVB÷WGWBöâF†R&—fFR&ö¦V7BF–ffW'2BBÃƒr$t"FW†VÇ2âÆö6ÂöÖ–âG&VW2ÖF6‚âf–æÂ7G&VæwF†VæVBÖf—‡GW&R†÷7FVB'VâC#3CSCS“‚Â¦ö"#ƒ3##s“ƒBÂ76VB2Ãs‚ó2Ãs‚v—F‚¦W&òf–ÇW&W2âæF—fRã“f—7VÂ66WFæ6RVæF–ærà  ¢22ã“æF—fR66WFæ6R(	B&÷FV7FVB52(	Bræ÷fVÖ&W"##` ¥W6W"6öæf—&×2ã“56öâræ÷fVÖ&W"##bâ&÷FV7BF†R–ÖvR×6VÒ&W—"ÂW†—7F–ær6fVBÖ–ÖvRv÷&¶fÆ÷rÂ–çBö†—7F÷'’ôFöæR×&V÷VâæBäôÒôtÄ"&÷VæB×G&—66WFæ6RâæW‡B&–÷&—G“¢–×÷'FVBFW‡GW&VBäôÒôtÄ"–çBÂföÆÆ÷vVB'’ÖV7W&VBW&f÷&Öæ6Rõt4Òv÷&²âæòæWr'VçF–ÖR'V–ÆBf÷"F†—266WFæ6R&V6÷&Bà  ¢22ã“"(	B–çB÷fW"–×÷'FVB÷VRUb6öÆ÷W"FW‡GW&W2(	Bræ÷fVÖ&W"##` ¤VF—Bf÷VæB–×÷'FVBVæ6öFVB–ÖvW2æBæF—fR6öÆ÷W"–ç7V7F–öâÇ&VG’&WF–æVB'’F†R÷&–v–æÂ–×÷'B÷væW'2Âv†–ÆR–çB÷&ö¦V7BVÆ–v–&–Æ—G’FVÆ–&W&FVÇ’W†6ÇVFVBWfW'’VÖ&VFFVB–ÖvRâã“&FG2&÷VæFVB6VVBFFW"W6–ærF†RW†—7F–ærUbÖFW&–Â6÷W&6R&W6öÇfW"æBVF—F&ÆRÖ–ÖvRFV6öFW"â7W÷'G2–æFWVæFVçB÷VR6–ævÆRÖÖFW&–ÂäôÒôtÄ"Uc6öÆ÷W"Ö2Â7V&RS"÷"#BÂärô¥TrWFò"Ö”"Væ6öFVBÂVæ6†ævVB(	3Ug2â×VÇF—ÆRÖFW&–Ç2ÂW‡G&%"Ö2ÂVç7W÷'FVBFW‡GW&RG&ç6f÷&×2öGG&–'WFW2ÂGvò×6–FVB÷VæÆ—BÖFW&–Ç2æBG'VRæF—fR6öÆ÷W"G&ç7&Væ7’&VÖ–â&VgW6VB&Vf÷&R×WFF–öââtÄ"õTRæBæF—fR6öÆ÷W"ÖÇ†Ööfb–væ÷&RÇ†W6–ærF†R÷&–v–æÂ÷VRär6öçfW'6–öââæF—fR6öÆ÷W"ÖÇ†Ööâ&WV—&W2FV6öFVB—†VÇ2gVÆÇ’÷VRâF†—2—26öÆ÷W"×FW‡GW&R–çF–ærÂæ÷BgVÆÂ–×÷'FVB%"VF—F–ærà ¤÷Væ–ærFV6öFW2G&ç6–VçB&6RÂ&¶W2ÖFW&–Â6öÆ÷W"f7F÷'2–âÆ–æV"Æ–v‡BæB6VVG2F†RW†—7F–ærÆ–W#²æò&W6÷W&6Rö6†V6·ö–çBVçF–ÂF†Rf—'7BVF—Bâ÷&–v–æÂVæ6öFVB–ÖvRõUb–ÆöB7F—2–çF7Bâf—'7B7G&ö¶R7&VFW2F†R÷&–v–æÂ–çB&W6÷W&6Rö†—7F÷'’G&ç67F–öâÂæB6fRô÷Vâ6'&–W2÷&–v–æÂ–×÷'BÇW2VF—FVB—†VÇ2F‡&÷Vv‚W†—7F–ærööÇ2âW†—7F–ærW‡÷'B÷væW'2W6R6ö×÷6VB–çBâ7W'&VçB6÷W&6R&÷Vv†æW72öÖWFÆæW726öç7FçG2&RW6VBf÷"&Wf–Ws²W†—7F–ær–çBÖW‡÷'B66Æ"öÆ–6–W2&VÖ–ââ&WF—&RF†RæF—fR–ÖvR&Wf–WröæÇ’v†VâF†R–çB7W&f6RF¶W2÷fW"Âfö–F–ær6ö×WF–ær÷fW&Æ—2â7FÆRF&vWBö6†ææVÂ6†ævW2÷"6Æ÷6–ærGW&–ærFV6öFR6ææ÷B÷Vâ÷V&Æ—6‚ÆFR6W76–öââ6÷W&6Rf–ÆW2Â¶W&æVÇ2Â&ö¦V7B66†VÖæB'VFvWG2&VÖ–âVæ6†ævVBà ¤æWr–çFVw&F–öâFW7G2W†W&6—6RäôÒôtÄ"BS"ó#BÂW†7B–æ—F–Â—†VÇ2Âæò÷Væ–ær†—7F÷'’÷&W6÷W&6RÂ÷&–v–æÂ–ÖvR&W6W'fF–öâÂ7G&ö¶RæBVçF÷V6†VB—†VÇ2Â6fRô÷VâæB&W&VB6öÆ÷W"W‡÷'BÂf7F÷"6öçfW'6–öâÂ&V¦V7FVBG&ç6f÷&×2öÖ2÷G&ç7&Væ7’æB6æ6VÆÆF–öâGW&–ærFV6öFRâfö7W6VBfÆ–FF–öâæB†÷7FVBV&Æ–6F–öâ÷WF6öÖW2&R&V6÷&FVB&VÆ÷rv†Vâ6ö×ÆWFRâæF—fRã“&66WFæ6RVæF–ærà ¤fö7W6VBã“"fÆ–FF–öã¢3r52òd”Ââ†÷7FVB&Vw&W76–öâÂvW2æBÆ—fRÖ&¶W"fW&–f–6F–öâVæF–ærâæF—fR66WFæ6RVæF–ærà ¢22ã“2(	B–×÷'FVBFW‡GW&RW‡÷'B6Æ÷7W&RæBg&W6‚&VÆV6Rw&‚(	Bræ÷fVÖ&W"##` ¤VæB×FòÖVæBW‡÷'B&Wf–WrgFW"ã“"–×ÆVÖVçFF–öâf÷VæBWF†÷&VB6öÆ÷W"W‡÷'G2&W6WB–×÷'FVB66Æ"6öç7FçG2æBæF—fRÔäôÒ×FòÔtÄ"wV&B&â&Vf÷&R7W÷'FVB6öÆ÷W"6öçfW'6–öââ6''’fÆ–FFVB–×÷'FVB&÷Vv†æW72öÖWFÆæW726öç7FçG2–âW‡÷'BÖÆö6Â–ÖvRÖWFFF²&÷F‚÷&–v–æÂW‡÷'FW'26öç7VÖRF†VÒv†VâæòWF†÷&VB66Æ"Ö&WÆ6W2F†VÒâ–æ6ÇVFR6öç7FçG2–âtÄ"ÖFW&–ÂFVGWÆ–6F–öââÆÆ÷ræF—fRäôÒFòtÄ"öæÇ’gFW"÷&–v–æÂ–çB&W&F–öâ&÷fW27W÷'FVB–×÷'FVB6öÆ÷W"6öçfW'6–öââW‡G&%"Ö2&VÖ–â&VgW6VBâFB&VÂtÄ"æBäôÒw&—FW"76W'F–öç2FòÆÂf÷W"S"ó#BäôÒôtÄ"–çFVw&F–öâ66W2ÂÇW2&Wf–Wr&WF—&VÖVçBâæò&—fFRf–ÆR6öÖÖ—GFVBâ—77VRg&W6‚ã“2Ö&¶W'2æBÆöFW"w&‚6ò6Æ–VçG26ææ÷B&WF–âF†RV&Æ–W"ã“"–çFW&ÖVF–FRÖöGVÆW2âã“&VÖ–ç2&÷FV7FVBæF—fR53²ã“2æF—fR66WFæ6RVæF–ærà ¢ã“26ö×ÆWF–öã¢†÷7FVBF÷öÆöw’C#3S3“cƒ#VÂ¦ö"#ƒ3C#3ccfÂ'VçF–ÖR6öÖÖ—B6S–#cf&SS–6CS“&cF3ƒSFfSf#ssS#ƒfVCF¢2ÃƒR52òd”ÂâvW2C#3S3“cs#F7V66VVFVC²66†RÖ'W7FVBfW'6–öâö–æFW‚æBFVâ–×÷'Bõ–çBöW‡÷'BÖöGVÆW2ƒ"f–ÆW2F÷FÂ’'—FRÖÖF6‚6÷W&6RâÆö6ÂöÖ–âG&VW2ÖF6‚âã“&v2â–çFW&ÖVF–FR'V–ÆBÂ7WW'6VFVB'’F†Rg&W6‚ã“666†Rw&‚æBW‡÷'B6Æ÷7W&S²æòã“&æF—fR52—2–æfW'&VBâfö7W6VB3ró3r76VBÂ–æ6ÇVF–ær&VÂäôÒôtÄ"w&—FW"ÖFW&–ÂÖf7F÷"76W'F–öç2âæF—fRFWf–6R66WFæ6R&VÖ–ç2VæF–æs¢÷&–v–æÂ–ÖvR²æWr–çBÂVæFòõ&VFòÂFöæR÷&V÷VâÂ6fRô÷VâæBäôÒôtÄ"&÷VæB×G&—â&÷FV7FVBã“6VÒÂã“–çBf—6–&–Æ—G’æBãƒ‚f6Vw&÷W256W2&WF–æVBà ¢22ã“2æF—fR66WFæ6R(	B&÷FV7FVB52(	Bræ÷fVÖ&W"##` ¥W6W"6öæf—&×2ã“252f÷"–×÷'FVB6öÆ÷W"FW‡GW&R–çBæB—G27WÆ–VBÖçVÂv÷&¶fÆ÷râ&÷FV7B÷&–v–æÂ–ÖvRõUb&WFVçF–öâÂæWr7G&ö¶W2ÂVæFòõ&VFòÂFöæR÷&V÷VâÂ6fRô÷VâæBäôÒôtÄ"&÷VæB×G&—–âF†RFö7VÖVçFVB÷VR6–ævÆRÖÖFW&–Â66÷RâæWr&WVW7C¢&WF–â–çBv†VâF–ærö&¦V7G3²FöæRæBÆÂf÷W"&÷GFöÒ6VÆV7F–öâÖÖöFR'WGFöç26†÷VÆB&RF†R–çFVçF–öæÂW†—G2à ¢22ã“B(	BwV&B÷&–v–æÂ6VÆV7F–öâ÷væW'2v†–ÆR–çB—27F—fR(	Bræ÷fVÖ&W"##` ¤VF—Bf–æG2×VÇF’Öö&¦V7B7F—fF–öâæB÷&–v–æÂÖ–â6çf26VÆV7F–öâ÷G&ç6f÷&ÒVçG'’6÷VÆB7F–ÆÂ'Vâöâf–ævW"öæöâ×–çBWfVçG2æB–çfÆ–FFRF†R7F—fR–çBF—7Æ’âwV&BF†÷6RW†—7F–ær÷væW'2æBVWVVBF÷V6‚6ö×ÆWF–öâv—F†÷WB&WfVçF–æræf–vF–öâWfVçG2âwV&B÷&F–æ'’F—&V7Bô÷WFÆ–æW"7F—fF–öã²&W6W'fRf÷&6VBÆ–fV7–6ÆR&WÆ6VÖVçBâFVfW"ö&¦V7BÖÖöFR&W7F÷&F–öâ––VÆG2GW&–ær–çB&F†W"F†â6Æ–6¶–ærÖöFR'WGFöââ&WÆ6RF†RW†—7F–ær–çBÖöFRÖ'WGFöâ&Æö6¶W"v—F‚6Æ÷6RÖæBÖ6öçF–çVS¢÷&–v–æÂf÷W"ÖöFR7F–öç2'VâgFW"–çB6Æ÷6W2âæòW‡G&&r–çWB6öç7VÖW"÷"†—7F÷'’ö6ÖW&ö¶W&æVÂ6†ævS²&÷FV7FVB×VÇF’G&ç6f÷&Ò&VÖ–ç2VçF÷V6†VBà ¥6WfVâæWr7GVÂÖ÷væW"66W26÷fW"VâöÖ÷W6R÷F÷V6‚v—F‚×VÇF’öâööfbÂVWVVBF÷V6‚ÂF—&V7B7F—fF–öâÂÆÂf÷W"ÖöFRW†—G2ÂÖ–â6VÆV7F–öâ––VÆF–æræBFVfW'&VB&W7F÷&F–öââfö7W6VBfÆ–FF–öã¢C52òd”Âv—F‚7W'&÷VæF–ærF÷V6‚öæf–vF–öâõ–çBö†—7F÷'’ö6öçF7B÷&W77W&R÷&VÆV6R6†V6·2â†÷7FVBæBvW2öÆ—fRfW&–f–6F–öâVæF–ærâæF—fRã“B66WFæ6RVæF–ærà ¢ã“BV&Æ–6F–öâfW&–f–VC¢†÷7FVBF÷öÆöw’C#3Sc3cSSS&Â¦ö"#ƒ3SS##s#†Â'VçF–ÖR6öÖÖ—B36fF&##ƒ##ccf3C#v&#3&6F66V&–SV3ƒ&cF¢2Ã“"52òd”ÂâvW2C#3Sc3cS3Cf7V66VVFVBâ66†RÖ'W7FVBfW'6–öâö–æFW‚ÂÖ–âÂ×VÇF’Öö&¦V7BÂö&¦V7BÖÖöFR×&WF–âÂf–Ww÷'B×–çBæBG&vW"×V’‡6WfVâf–ÆW2’'—FRÖÖF6‚F†RV&Æ—6†VB6÷W&6Râfö7W6VBfÆ–FF–öâCóC76VBâæF—fRã“B66WFæ6R&VÖ–ç2VæF–ærf÷"ö&¦V7BF2ÂÆÂf÷W"ÖöFRW†—G2ÂFöæRÂæf–vF–öâæB–çBö†—7F÷'’&WFVçF–öââã“2–×÷'FVBFW‡GW&R–çB&VÖ–ç2&÷FV7FVB52à ¢22ã“BæF—fRÖöFR66WFæ6R(	B&÷FV7FVB52(	Bræ÷fVÖ&W"##` ¥W6W"6öæf—&×252f÷"–çBö&¦V7B×F&WFVçF–öâÂæf–vF–öâæB–çFVçF–öæÂW†—G2â6W&FVÇ’&W÷'G2âÇ&VG’×–çFVB–×÷'FVBÖöFVÂ7F–ÆÂ6ææ÷B–çC²67&VVç6†÷B6†÷w2fÆ–BUg2öâÆÂÃf6W2âW6W"7WÆ–W2&—fFR7FW†æRææöÒâFòæ÷B–æfW"WfW'’–×÷'FVBÖFW&–Â—266WFVBg&öÒF†Rã“2òã“B56W2à ¢22ã“R(	B&W6W'fRGvò×6–FVB–×÷'FVB6öÆ÷W"ÖFW&–Ç2–â–çBæBW‡÷'B(	Bræ÷fVÖ&W"##` ¤7GVÂf–ÆR†2Ã"fW'F–6W2óÃf6W2ÂöæR#L+"äröbÃ’ÃƒCR'—FW2ÂÆÂUg2v—F†–âF–ÆRæBæF—fRGvõ÷6–FVCÓâ6†æv–æröæÇ’F†BfÆrÖ¶W2F†R&–÷"VÆ–v–&–Æ—G’6†V6²72â&VÖ÷fRF†RFFW"w2F÷V&ÆU6–FVB&VgW6Ã²&WF–âÆÂ÷F†W"wV&G2â–æ—F–Âö6†ææVÂæBÆ—B–çB–æ†W&—B6–FW3²W‡÷'BÖÆö6ÂÖFW&–Äf7F÷'26'&–W2F÷V&ÆU6–FVBÂtÄ"VÖ—G2öFVGWÆ–6FW2'’—BÂäôÒw&—FW2Gvõ÷6–FVCÓâ&ö¦V7B÷&–v–æÂ–ÆöBö–ÖvRõUg2&VÖ–âW†7BâW†—7F–ær÷6—G’F÷V&ÆU6–FRæBöæR×6–FVBFVfVÇG27F’–çF7C²æò6÷W&6R&W6öÇWF–öâö'VFvWB÷66†VÖö¶W&æVÂ6†ævW2â66WFVBã“B6VÆV7F–öâ÷væW'2æB&÷FV7FVB×VÇF’G&ç6f÷&Ò&RVæ6†ævVBà ¥GvòæWrvVæW&FVBäôÒôtÄ"–çFVw&F–öâ66W26÷fW"&Wf–WröFWF‚Â7G&ö¶W2Â&ö¦V7B6fRô÷VâæB7GVÂäôÒôtÄ"w&—FW'3²öÆBöæR×6–FVB66W26†V6²F†V—"W‡÷'FVBfÆw2&VÖ–âöfbâfö7W6VBS52òd”ÂâÆö6Â–çFVw&F–öâv–ç7BF†R7GVÂ&—fFRf–ÆR÷Vç2–çBB#BÂW6W2F÷V&ÆU6–FRÂ6öÖÖ—G27G&ö¶RæB&W6W'fW2÷&–v–æÂVæ6öFVB–ÖvR'—FW2âæò&—fFRf–ÆR÷"÷'G&—B6öÖÖ—GFVBâ†÷7FVB&Vw&W76–öâÂvW2öÆ—fRæBæF—fRã“R66WFæ6RVæF–ærà ¢ã“RV&Æ–6F–öâfW&–f–VC¢†÷7FVBF÷öÆöw’C#3S“CC“CC&Â¦ö"#ƒ3cCC“ƒ#“&Â'VçF–ÖR6öÖÖ—B“†#VCC6F&VCCƒSS“–6C†f#cs“3“s####SV#†¢2Ã“B52òd”ÂâvW2C#3S“CCƒCsF7V66VVFVBâ66†RÖ'W7FVBfW'6–öâö–æFW‚æBFVâ–×÷'Bõ–çBöW‡÷'BÖöGVÆW2ƒ"f–ÆW2F÷FÂ’'—FRÖÖF6‚6÷W&6Râfö7W6VBSóS76VC²7GVÂ&—fFRÖf–ÆR–çB÷Væ–ær÷7G&ö¶R÷6÷W&6RÖ'—FR&W6W'fF–öâ76VBâæF—fR66WFæ6RVæF–æröâF†R÷&–v–æÂ7FW†æRææöÒÂv—F†÷WB6†æv–ær—G2Ug2÷"6–FVFæW72âã“BÖöFR÷væW'6†—52&VÖ–ç2&÷FV7FVBà  ¢22ã“’(	BÖV7W&R–×÷'FVBUbFW‡GW&RFV6öFRæBF–ÖR×FòÖVæ&ÆR(	Bræ÷fVÖ&W"##` ¥F†Rã“‚f–Ww÷'B&W÷'B—2æ÷B6öçG&öÆÆVBW&f÷&Öæ6R6ö×&—6öââ•B6‡&öÖRC3cl9sƒƒbôE#"&W÷'FVCÃ"fW'F–6W2óÃf6W2Âƒ&V'V–ÆG2ÖVãSbãƒsr×2öÖƒÃSÂ66VæR†öö·2ÖVãCrãC3"öÖƒÃ3’Â6vS‚ãC’ÂUb&Wf–WsBãCƒæB&VæFW"ÖöFSBãƒR×3²#g&ÖR–çFW'fÇ2ÖVã‚ã3C"×2÷“S’âæòFWFW&Ö–æ—7F–2÷W&F–öâ6WVVæ6RöÖF6†VB&6VÆ–æS²FV6—6–öâ&VÖ–ç2”ä4ôä4ÅU4•dRâ&r&W÷'BöÖöFVÂ&VÖ–â&—fFRà ¥W6W"ö'6W'fW2Ub×–çFVB–×÷'BVçFW&–ærw&W’æBW6–ær&Vf÷&R—G2FW‡GW&W2V"âVF—BöbF†RWF†÷&—FF—fR&VæFW"ÖÖöFW2(i"Ub–ÖvR7W&f6RF‚f÷VæBF†R÷fW&Æ’&VÖ–ç2†–FFVâVçF–Â7–æ26÷W&6R–ÖvRFV6öF–ærf–æ—6†W3²&–÷"Ub×&Wf–WrF–Ö–æröæÇ’6÷fW&VB7–æ6‡&öæ÷W26WGWâ–ç7G'VÖVçBF†RW†—7F–ærW&f÷&Öæ6RÖöæ—F÷"v—F‚÷BÖ–âFW‡GW&RÖFV6öFVGW&F–öâ‡6÷W&6R&WÇW27–æ2FV6öFRv—B’æBFW‡GW&RÖF—7Æ–†÷fW&Æ’6öç7G'V7F–öâVçF–ÂÆöv–6ÂVæ&ÆVÖVçB’âæò–×÷'B÷&VæFW"&V†f–÷"Â—†VÇ2÷"ÖFW&–Â÷væW'6†—6†ævVBâVæ&ÆR÷&W6WBW&f÷&Öæ6RÂ–×÷'BF†R6ÖRUb×–çFVBäôÒôtÄ"ÂF÷væÆöBF†R&W÷'BgFW"—BFW‡GW&W2Â&WVB6öç6—7FVçFÇ’æB6öæf—&Ò–çB&VÖ–ç2W6&ÆRâF–ÖR×FòÖVæ&ÆVB—2æ÷BuRg&ÖR×&W6VçBÖV7W&VÖVçBâFòæ÷B6Æ–Òâ÷F–Ö—¦F–öâ÷"t4Òv–âg&öÒF†—2F–væ÷7F–2'V–ÆBà ¥GvòæWrFW7G26÷fW"FVÆ–VBFV6öFRF–Ö–ærÂf—6–&–Æ—G’öæÇ’gFW"6ö×ÆWF–öâÂFV6öFR&V¦V7F–öâæB&W7F÷&F–öã²W†—7F–æräôÒ6öÆ÷"FV6öFR÷7FæFÆöæR&Wf–WrFW7G272âfö7W6VB'Vã¢’52òd”Â7&÷72F†RæWrF–Ö–ærFW7G2ÂW†—7F–æräôÒFV6öFR÷&Wf–WræB&VÆV6R6öçG&7BâgVÆÂÆö6Â7V—FS¢2Ã#b52òd”Ã²v—BF–fbÒÖ6†V6¶6ÆVââ–æ—F–ÂgVÆÂ'Vç2W‡÷6VBöæÇ’F†R&VÆV6R66†RÖ6öçG&7BWFFW3²F†RF—&V7B6†VÆÂæBG&vW"öf6R×v÷&¶fÆ÷r&VÆV6R×fW'6–öâÆöFW'2æ÷r6†&RF†R7W'&VçBã“’¶W’ÂæBF†Rf–æÂgVÆÂ7V—FR76W2â†÷7FVB&Vw&W76–öâÂvW2æBÆ—fRÖ'—FRV&Æ–6F–öâ6†V6·2&VÖ–âVæF–ærâFWf–6R66WFæ6RVæF–ærâ&W6W'fRã“r6vRöw&÷W&V†f–÷"Âã“bW&f÷&Öæ6RÆ"Âã“R–×÷'FVB6öÆ÷W"–çBæBÆÂV&Æ–W"56W3²&÷FV7FVB×VÇF’G&ç6f÷&ÒVæ6†ævVBà  ¢22ã“’fÆ–FF–öâæBV&Æ–6F–öâföÆÆ÷r×W(	Bræ÷fVÖ&W"##` ¤Æö6ÂgVÆÂ7V—FS£2Ã#b52ód”Ã²v—BF–fbÒÖ6†V6¶6ÆVââ†÷7FVBF÷öÆöw’C#C#Ccc†f—'7B&W÷'FVC2Ã#R52ód”Ã¢F†RæWrFW7BW††W7FVC6WD–ÖÖVF–FVGW&ç2&Vf÷&RF†R6Æ÷vW"'VææW"&V6†VB7&VFT–ÖvT&—FÖGW&–ær÷VRär&W&F–öââ'VçF–ÖR76W'F–öç276VBâFW7BÖöæÇ’6÷'&V7F–öâv—G2f÷"FV6öFW"×7F'B&öÖ—6Rv—F‚&÷VæFVBF–ÖV÷WBæBF–ÖW"Ö&6VBf—6–&–Æ—G’öÆÆ–æs²fö7W6VBFV6öFRôäôÒ×&Wf–Wr÷&VÆV6R6†V6·273’ó’à ¤GW&–ærV&Æ–6F–öâöbF†BFW7BÖöæÇ’föÆÆ÷r×WÂâ’G&VRv27&VFVBv—F†÷WB—G2&6RâF†R–çFW&ÖVF–FRÖ–â6öÖÖ—BF#ƒCC–'&–VfÇ’6öçF–æVBöæÇ’FW7G2ö²F†—2v26Vv‡B'’Æö6Âv—BÇ2×G&VVæB&W—&VB&Vf÷&R6ö×ÆWF–öâ'’&W7F÷&–ærF†RgVÆÂã“–G&VRæBf—†VBFW7B–âcvC“–63CFVVVSFC&Sƒƒ#3cS–3C#cSS&6fv&â7W'&VçB&VÖ÷FRÖ–âG&VR—26ö×ÆWFS²F†RÆö6Â6†V6¶÷WBv27–æ6VBFò—B&Vf÷&RF†—2†æFöfbÖöæÇ’föÆÆ÷r×Wâf–æÂ†÷7FVBF÷öÆöw’C#C#SS“ƒC“676VC2Ã#bó2Ã#bâvW2C#C#SS“scSv7V66VVFVC²Æ—fRã“–Ö&¶W"Â6†ævVB'VçF–ÖRÖöGVÆW2æB†æFöfbf–ÆW2'—FRÖÖF6‚F†R&WòâFWf–6R66WFæ6R&VÖ–ç2VæF–ærà ¢22ã(	BW'6—7FVçB–çFW&7F–öâ&VfW&Væ6W2æBVæ6–Âö&¦V7BÖÆ—7B–çWB(	B‚æ÷fVÖ&W"##` ¥W6W"&WVW7FVBf÷W"vVæW&ÂT’õU‚÷F–öç2g&öÒFW7FW'3¢Væ6–Â÷&&—BöâööfbÂVæ6–Â6VÆV7F–öâöâööfbÂF÷ÖÆVgB6æ6öçG&öÇ2öâööfbÂæBÆVgBÖ†æFVBÆ–÷WBâÇ6ò&W÷'FVBF†Bö&¦V7BÖÆ—7B6öçG&öÇ2F–Bæ÷B&W7öæBFòÆRVæ6–ÂâVF—Böb7W'&VçBÖ–âf÷VæBF†RW†—7F–ærVæ6–ÂvFRÂf–WrÖVçRÂ6æFö6²Âö&¦V7BÖÆ—7B'WGFöâ†æFÆW'2ÂæB&ö¦V7FVBUb–çBÆWGFRÆ6VÖVçC²æòvVæW&Â&VfW&Væ6W2÷væW"W†—7FVBâ&WW6RF†÷6R÷væW'3²Fòæ÷BFB&ÆÆVÂ6VÆV7F–öâ÷"ÖöFVÆÆ–ær7—7FV×2à ¤FBW'6—7FVçBvVæW&Â6WGF–æw26V7F–öâVæFW"d”UrâFVfVÇG2¶VW&–÷"&V†f–÷#¢Væ6–Â÷&&—BæBÖW6‚6VÆV7F–öâVæ&ÆVBÂ6æFö6²&÷GFöÒÖÆVgBÂÆVgBÖ†æFVBÆ–÷WBöfbâF†RW†—7F–ærVæ6–ÂvFR†öæ÷'2÷&&—BæBÖW6‚×6VÆV7F–öâ&VfW&Væ6W2v†–ÆR&W6W'f–ær7F—fRÖöFVÆÆ–ærõ–çB÷væW'2æBF†RW†—7F–ærFVfW'&VBÖ÷&&—BF‡&W6†öÆBâÆVgBÖ†æFVBÖöFRÖ÷fW2F†R&–Ö'’ö&¦V7B÷FööÂæVÂ&–v‡BÂö&¦V7B'&÷w6W"ÆVgBÂæBÖ¶W2F†R7W'&VçB–çB×ÆWGFRÆ6VÖVçB÷væW"&VfW"F†R÷÷6—FR6–FRâF†RæWr÷WFÆ–æW"ö–çFW"7F—fF–öâ'&–FvRF—7F6†W2F†RW†—7F–ær'WGFöâ÷7VÖÖ'’6Æ–6²öâVæ6–Â÷F÷V6‚ö–çFW'WÂ6æ6VÇ2G&w2ÂæB7W&W76W2F†RÖF6†–ær'&÷w6W"ÖvVæW&FVB6Æ–6³²æ÷&ÖÂÖ÷W6RæBÆ—7B67&öÆÆ–ær&VÖ–âæF—fRâ6fVBã“’67&VVâÖ6ö×&—6öâ&V6÷&G2&VÖ–âÆöF&ÆRVæFW"ãà ¤fö7W6VB6WGF–æw2ÂVæ6–Â&÷WF–ærÂ÷WFÆ–æW"7F—fF–öâÂ–çBÆWGFRÆ6VÖVçBæB&VÆV6RÖ6öçG&7BFW7G276VC²f–æÂfö7W6VB6öçF–çV—G’&F6ƒ£#R52òd”ÂâgVÆÂÆö6ÂçÒFW7F£2Ã##252òd”ÂâF†Rf—'7BgVÆÂ'Vâf÷VæBöæR7FÆRã“–6†VÆÂÖ6ö×&—6öâf—6–&ÆRÆ&VÂgFW"F†RfW'6–öâ'V×²WFFRF†R7W'&VçBDU5BÄ•5BÆ&VÂö–ç7G'V7F–öç2FòãÂ&WF–âã“–FFÖ–w&F–öâÂæBFB&Vw&W76–öâf÷"&W6W'fF–öââf–æÂv—BF–fbÒÖ6†V6¶6ÆVââ&÷FV7FVB7&2ö×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3÷cÓã3bãã4„Ó#Sb&VÖ–ç2#FV3c#&&#–66fVVSS6#VFV&SS#F3“FF#c#&#Cs–3sc“#3ƒc–à ¥W6W"×&÷f–FVBã“’•B6æ6†÷C¢•B6‡&öÖR#rã"Â3cl9sƒƒbôE#"Âö&¦V7Bõ7GVF–òÂÃ"fW'F–6W2óÃf6W2âFW‡GW&RÖFV6öFV£6×ÆRÂÖVâöÖƒÃs‚×2âFW‡GW&RÖF—7Æ–£6×ÆRÂÖVâöÖƒ"Ã3ƒ‚×2g&öÒ÷fW&Æ’6öç7G'V7F–öâF‡&÷Vv‚Æöv–6ÂVæ&ÆVÖVçBâg&ÖW3£#6×ÆW2ÂÖVãbãcsR×2Â“Sr×3²66VæR÷&V'V–ÆB6×ÆW32Â&V'V–ÆBÖVã#‚ãccröÖƒC×3²Ub&Wf–WrÖVã‚ãccröÖƒR×2âF†—2–æF–6FW2F†Rw&W’×Fò×FW‡GW&VBFVÆ’–âF†R–×÷'B6GW&RÂ'WBF†RöæRFV6öFR6×ÆRæBF‡&VR66VæR6×ÆW2Fòæ÷BFVÆÂv†WF†W"÷&&—B&WVG2FV6öF–ær÷"–æ7W'2ÖVæ–ævgVÂg&ÖR6÷7C²F†W&Rv2æò6öçG&öÆÆVB6ÖW&6WVVæ6RâFòæ÷B–×ÆVÖVçBFV×÷&'’—†VÆF–öâVçF–Â7W7F–æVB÷&&—B÷â÷¦ööÒWf–FVæ6R7W÷'G2—Bâ6²f÷"6W&FRæf–vF–öâ6GW&RgFW"F†RÖöFVÂ—2Ç&VG’FW‡GW&VC²6ö×&Rg&ÖR÷“RæB&VæFW"ÖÖöFRõUb×&Wf–WrF–Ö–æw2æBç’&V7W'&–ærFV6öFR6×ÆW2à ¤†÷7FVBF÷öÆöw’ÂvW2V&Æ–6F–öâæBÆ—fRÖ'—FRfW&–f–6F–öâVæF–ærà ¢222ãV&Æ–6F–öâfW&–f–6F–öâ(	B‚æ÷fVÖ&W"##` ¥&VÖ÷FRÖ–æ'VçF–ÖR6öÖÖ—B3S6F#&c“–#†SF6Fcv#v3SC&3†#3C#vc†VFSFF6²Æö6Â6†V6¶÷WB7–æ6VBæB6ÆVââv—BG&ç7÷'BÆ6¶VBW6W&æÖR7&VFVçF–Â–âF†—2v÷&²6W76–öâÂ6òF†RÇ&VG’ÖWF†÷&—¦VBW6‚v26ö×ÆWFVBF‡&÷Vv‚v—D‡V"w26öææV7FVB6öÖÖ—B÷G&VR÷&Vb’â&Vf÷&RGfæ6–ærÖ–æÂF†R’Ö7&VFVBG&VR4„W†7FÇ’ÖF6†VBF†R6ö×ÆWFRÆö6Â6öÖÖ—BG&VS²ÆÃ’6†ævVBF‡2vW&RfW&–f–VB–âF†R&VÖ÷FR6öÖÖ—BâvW2FWÆ÷–ÖVçBC#C#“Ss#cV7V66VVFVBæBfW'6–öâæ§6öæ&W÷'G2ã3bã‚ãâ†÷7FVBF÷öÆöw’C#C#“Ss#S6Â¦ö"#ƒSsS#S#3sfÂ6ö×ÆWFVB7V66W76gVÆÇ’v—F‚çÒFW7F²F†RÆö6Â7V—FR—32Ã##252òd”ÂâÆÃ’6†ævVBf–ÆW2‡'VçF–ÖRÂFW7G2æB†æFöfbFö72’'—FRÖÖF6‚F†RÆ—fRv—D‡V"vW26—FRâv—BF–fbÒÖ6†V6¶6ÆVã²&÷FV7FVB×VÇF’G&ç6f÷&Ò4„Væ6†ævVBâW6W"FWf–6R66WFæ6R&VÖ–ç2VæF–æs²æò52—2–æfW'&VBâ¶VWF†Rã“’W&f÷&Öæ6Ræ÷FR2F–væ÷7F–2öæÇ’æBFòæ÷B–×ÆVÖVçB÷&&—B×F–ÖR—†VÆF–öâv—F†÷WB6öçG&öÆÆVBæf–vF–öâ6GW&Rà ¢22ã(	BÆVgBFööÂ&–ÂÂ6æÆ6VÖVçBæB7FÆRvVöÖWG'’&Wf–Wr6ÆVçW(	B‚æ÷fVÖ&W"##` ¥W6W"&WVW7FVBF†RÖ&²&Vf÷&R&÷„Æ"æBÆVgB×6–FRÆ–÷WB&6VBöâF†R7WÆ–VB6¶WF6‚âF†RW†—7F–ærFööÆ&"Ç&VG’÷væVBF†R6æ–çWG2ÂÆ§’Æ76ò7F–öâÂ4TÄT5BæVÂÆVæ6†W"æBUb–çBÆVæ6†W"â&Wv÷&¶VBF†V—"6†&VB&W6VçFF–öâ–çFò6ö×7B6æ&÷‚ÇW2fW'F–6ÂÆ76ò(i"6VÆV7B(i"Ub–çB&–ÂâF†RW†—7F–ær(	Å6æ÷F–öç2BF÷ÆVgN(	Ò&VfW&Væ6Ræ÷rÖ÷fW2öæÇ’F†R6æ&÷‚Fò&VæVF‚F†R†VFW#²v†VâöfbÂ—B6—G2F—&V7FÇ’&÷fRF†RÆ÷vW"ÖÆVgB7F–öâ&–ÂâW†—7F–ær6æÂ6VÆV7F–öâæVÂÂ–çBæBÖöFR÷væW'2&VÖ–âWF†÷&—FF—fRâF†RW6W2F†RW†—7F–ær–6öâç7fvÖ&²à ¥v†–ÆRF†—2'V–ÆBv2VæFW'v’ÂF†RW6W"&W÷'FVBâ–æfW&Væ6R×6æ&Wf–WröwV–FRF†BV&VB7GV6²gFW"W†7BW‡G'VFRæBVæFó²Ö÷f–ærFòæ÷F†W"'&÷w6W"v–æF÷rF—6Ö—76VB—BâVF—Bf÷VæB7&÷72Öö&¦V7B6æFV×÷&&–Ç’7W&W76W2F†RÆVv7’–æfW&Væ6R6†V6¶&÷‚GW&–ærÆ—fRvW7GW&RæB&W7F÷&W2F†R&–÷"öâ×7FFRB&VÆV6RâFFVBâW‡Æ–6—BW6W"FövvÆRÖöfbF‚F†B6æ6VÇ2F†RÆ—fR&Wf–WrÂ†–FW2F†RwV–FRÂF—66&G2VWVVB6æv÷&²ÂæB&WfVçG2&VÆV6Rg&öÒ&W7F÷&–ærF†R7FÆR7FFRâæWr&öGV7F–öâÖ÷væW"FW7BW†W&6—6W2Æ—fR&Wf–WrÂW6W"FövvÆRÖöfbÂö–çFW"&VÆV6RæBfW&–f–W2F†RwV–FR7F—2†–FFVâæBF†R7v—F6‚7F—2öfbâF†RÖöGVÆRæBG–æÖ–2–×÷'B&VçG2&R&W–ææVBF‡&÷Vv‚G&vW"×V’æ§6æBF†R6æöæ–6Â&VÆV6R×fW'6–öâÆöFW"à ¤fö7W6VBFööÆ&"Â6æÂ6VÆV7F–öâÂ–çBÂ6WGF–æw2Â&VÆV6R–FVçF—G’ö66†RæB&VçBÖÆöFW"6†V6·273c2óc3²föÆÆ÷r×Wfö7W6VB&F6‚gFW"f–æÂ&–Â÷&FW"æBÖöGVÆR–ç276W3’ó’âgVÆÂÆö6ÂçÒFW7F£2Ã##B52òd”Ââv—BF–fbÒÖ6†V6¶6ÆVââ&÷FV7FVB7&2ö×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3÷cÓã3bãã&VÖ–ç2Væ6†ævVB…4„Ó#Sb#FV3c#&&#–66fVVSS6#VFV&SS#F3“FF#c#&#Cs–3sc“#3ƒc–’âæF—fR•B66WFæ6RæBV&Æ–6F–öâ&VÖ–âVæF–æs²æòFWf–6R52–æfW'&VBà  ¢222ãV&Æ–6F–öâfW&–f–6F–öâ(	B‚æ÷fVÖ&W"##` ¥'VçF–ÖR6öÖÖ—BcSsC#–C&#C#†F#SFS&–VC†3–c““FCSF&&—2öâÖ–ââ†÷7FVBF÷öÆöw’'VâC#C3C###cc6ö×ÆWFVB7V66W76gVÆÇ’†çÒFW7F“²vW2'VâC#C3C###Sƒ67V66VVFVBâÆÂ#B6†ævVBf–ÆW2'—FRÖÖF6‚F†RÆ—fRv—D‡V"vW26—FRâÆö6Â7V—FS¢2Ã##B52òd”Ã²v—BF–fbÒÖ6†V6¶6ÆVââF†R&W÷'FVBvVöÖWG'’6æwV–FRF—6Ö—76VBgFW"7v—F6†–ær'&÷w6W"v–æF÷w3²ãÇ6ò6æ6VÇ27F—fR&Wf–Wr7FFRöâW6W"FövvÆRÖöfbæBFö7VÖVçBf—6–&–Æ—G’Æ÷72âFWf–6R66WFæ6Rf÷"ãFööÆ&"'&ævVÖVçBæB6æ6æ6VÆÆF–öâ&VÖ–ç2VæF–æs²Fòæ÷B–æfW"52g&öÒWFöÖFVB&W7VÇG2à  ¢22ã"(	B6ö×7BÆVgB&–Ç2Âf—6–&ÆRÖöFRFö6²æB6÷'&V7B†VFW"Æövò(	B‚æ÷fVÖ&W"##` ¥W6W"6÷'&V7FVBF†Rã†VFW"76WB‡7WÆ–VBCl9sCbär—2F†R7W'&VçBÆövò’Â&WVW7FVB†—2ôvVöÖWG'’6æ–6öç2fW'F–6ÆÇ’v—F†–âF†RÆVgB7G&—ÂæB&W÷'FVBF†RÖöFRFö6²Ö—76–æræB&Ææ²f–Ww÷'BâVF—Bf÷VæBãw&VBF†R6öçG&öÇ2–âf–Ww÷'B×6—¦VBG&ç7&VçB÷6—F–öæVBÆ–W"B¢Ö–æFW‚#Â6†&–ærF†R6ÖR7F6¶–ærÆWfVÂ2F†RÖöFRFö6²æB6—GF–ærÆFW"–âDôÒ÷&FW"â&Wv÷VæBF†B&W6VçFF–öâæB&V'V–ÇB—Bv—F‚6ææB7F–öâ6öçG&öÇ226W&FR6ö×7B'6öÇWFR6†–ÆG&Vâöb7f–Ww÷'Ew&²æògVÆÂ×f–Ww÷'B÷fW&Æ’â6æ6öçG&öÇ2æ÷r7F6²fW'F–6ÆÇ’æB&WF–âW†—7F–ær6†V6¶&÷‚æöFW2ö†æFÆW'2âF†RW†—7F–ærÖöFRFö6²7F—2–â—G2÷&–v–æÂæöFRæB—2W‡Æ–6—FÇ’&÷fRF†R6ö×7B&–Ç2÷7FGW2ÆæRâF†R÷&–v–æÂ&–v‡B×6–FRæVÂæB6VÆV7F–öâ×æVÂ÷væW'2Â7&2öÖ–âæ§6Â&VæFW&W"ÂvÆö&Â7G–ÆW6†VWBæB&÷FV7FVB×VÇF’G&ç6f÷&Ò&RVæ6†ævVBâ†VFW"W6W2F†R7WÆ–VBäs²ÆVv7’–6öâç7fvæBt–6öç2&Ræ÷BÇFW&VBà ¥F†R67&VVç6†÷B7FGW2&VG2‚fW'G2òf6W2âF†—266÷VçG2f÷"âV×G’ÖW6‚&öG’–âF†B6GW&VB7FFR'WBFöW2æ÷B–FVçF–g’F†R'6VçBw&–Bö†W3²æò&VæFW&W"÷7FFR6†ævRv2ÖFRv—F†÷WB6ÆVâFVfVÇBÖ7V&R&W&öGV7F–öââfö7W6VBT’÷&VÆV6RöÆövò&F6‚3ó3²gVÆÂÆö6ÂçÒFW7F2Ã##B52òd”Ã²v—BF–fbÒÖ6†V6¶6ÆVââV&Æ—6†VB'VçF–ÖR6öÖÖ—Bc&6#“v#3CS&#fS#3fSfCFC##Vcv#V²†÷7FVBF÷öÆöw’C#CCScsV76VC²vW2C#CCSccs“67V66VVFVC²ÆÂr6†ævVBf–ÆW2'—FRÖÖF6‚Æ—fRvW2âæF—fR•B66WFæ6R&VÖ–ç2VæF–ærà  ¢22ã"66VæRöÖöFRF—7Æ’52æBã2ÆVgB×&–Â76–ær(	B‚æ÷fVÖ&W"##` ¥W6W"6öæf—&×2(	Å67&VVâF—7Æ’&ö&ÆVÒ—252î(	Ò&÷FV7BF†Rã"66VæRæBÖöFRÖFö6²F—7Æ’&W7VÇC²Fòæ÷BÇFW"F†R&VæFW&W"÷"&V÷VâF†B—77VR'6VçBâö'f–÷W26ÆVâ×66VæR&W&öGV7F–öââF†R7WÆ–VB7W'&VçBÆövòæB6ö×7B6W&FRÆVgB&–Ç2&VÖ–âF†R&6VÆ–æRâæW‡B'V–ÆB7FæF&F—¦W2&÷F‚&–Âv–GF‡2æBW7F&Æ—6†W2‡‚v2&WGvVVâ6æö7F–öç2æB7F–öç2öÖöFRFö6²Â&WF–æ–ærF†R÷&–v–æÂ6æÖB×F÷&VfW&Væ6R÷væW"â&–v‡B×6–FRT’Â&VæFW&W"ÂÖöFVÂ7FFRæB&÷FV7FVB×VÇF’G&ç6f÷&Ò7F’VçF÷V6†VBâW6W"6öæf—&×2&÷F‚66VæRF—7Æ’æBÖöFR'WGFöç253²&W6W'fRF†VÒ2&÷FV7FVB&V†f–÷W"âfö7W6VB6†V6·2723Bó3BæBgVÆÂÆö6Â7V—FR2Ã##Bó2Ã##BâFWf–6R76–ær66WFæ6R—2VæF–æs²6VRF÷öbDU5Eô4„T4´Ä•5BæÖFà  ¢222ã2V&Æ–6F–öâfW&–f–6F–öâ(	B‚æ÷fVÖ&W"##` ¥'VçF–ÖR6öÖÖ—BV63VFFC3C6&S3#†c3†&cs&#C“sc“C“6cS—2öâÖ–ââ†÷7FVBF÷öÆöw’C#CCscs“s†76VB2Ã##Bó2Ã##C²'VçF–ÖRvW2C#CCscsƒƒsV7V66VVFVBâgVÆÂ†æFöfbö†—7F÷'’ö6†V6¶Æ—7B÷&öFÖfW&–f–6F–öâ—2V&Æ—6†VB–âFö72ÖöæÇ’6öÖÖ—B†&6#3“#&6cf#†3#63–cVc“cvSc“&6Ccƒ²vW2C#CCs“c“ƒc†7V66VVFVBâF†RÆ—fR×vR'—FR6ö×&—6öâ6÷VÆBæ÷B&R6ö×ÆWFVBg&öÒF†—2Vçf—&öæÖVçC²F†Rv—D‡V"7F–öâ'Vç2æBÖ–â6öÖÖ—B&R6öæf—&ÖVBâW6W"FWf–6R66WFæ6R&VÖ–ç2VæF–ærf÷"&–Âv–GF‡2Â‡‚v2æB6æÖB×F÷²66VæRF—7Æ’æBÖöFR'WGFöç2&R&÷FV7FVB52à  ¢22ã276–ærfVVF&6²æBãB6÷'&V7F–öâ(	B‚æ÷fVÖ&W"##` ¥W6W"67&VVç6†÷B6—2F†Rã276–ær—27F–ÆÂöfbâF†RF÷6æ'VÆRW6VB6Æ2‡f"‚ÒÖ&÷†Æ"×F÷&"Ö‚’²‡‚–WfVâF†÷Vv‚7f–Ww÷'Ew&—2Ç&VG’öfg6WB&VÆ÷rF†RF÷&#²F†—27F6¶VBF†R†VFW"†V–v‡B6V6öæBF–ÖRâfö7W2f–Wr6W&FVÇ’Æ6W2F†RÖöFRFö6²B‡‚v†–ÆR&–Ç2&VÖ–âg‚âãB6†ævW2F†RW†—7F–ær6æÖB×F÷'VÆRFòâ‡‚f–Ww÷'BÖÆö6Â–ç6WBæBÆ–vç2&÷F‚&–Ç2v—F‚F†Rfö7W2ÖöFRFö6²â&WF–âWVÂv–GF‡2æBW†—7F–ær‡‚Æ÷vW"v2âæò&–v‡B×6–FRÂ&VæFW&W"Â66VæRöÖöFVÂ÷"ÖöFRÖ'WGFöâ÷væW"6†ævW2â66VæRF—7Æ’æBÖöFR'WGFöç2&VÖ–â&÷FV7FVB53²ã276–ær—2–æ6ö×ÆWFRâfö7W6VBFööÆ&"÷&VÆV6R6†V6·2723Bó3C²gVÆÂÆö6Â7V—FR76W22Ã##Bó2Ã##C²v—BF–fbÒÖ6†V6¶—26ÆVââ†÷7FVBF÷öÆöw’õvW2æBFWf–6R66WFæ6RVæF–ærà ¢222ãBV&Æ–6F–öâfW&–f–6F–öâ(	B‚æ÷fVÖ&W"##` ¥'VçF–ÖR6öÖÖ—BS†c3CCs3sCcssSF3c3†&–#3#V3&6F3SC6&&Gfæ6VBÖ–æv—F‚6ö×ÆWFRG&VRƒ##C#&#FfC#cƒ#†CSsCƒ“fF3f“#6ÂÖF6†–ærF†RÆö6Â6öÖÖ—BG&VRW†7FÇ’â†÷7FVBF÷öÆöw’'VâC#CCƒƒƒc376VBçÒFW7Fv—F‚2Ã##B52òd”Ã²vW2FWÆ÷–ÖVçBC#CCƒƒƒC“†7V66VVFVBâÆö6Âfö7W6VB6†V6·2723Bó3BæBÆö6ÂgVÆÂ7V—FR76W22Ã##Bó2Ã##C²v—BF–fbÒÖ6†V6¶—26ÆVââF†—2föÆÆ÷r×W&V6÷&G2†÷7FVBfW&–f–6F–öâæBFöW2æ÷B6†ævR'VçF–ÖR6öFRâæF—fRFWf–6R66WFæ6R&VÖ–ç2VæF–ærf÷"F†R6æF÷vÂfö7W2&–ÂÆ–væÖVçBÂv–GF‡2æBÆ÷vW"v3²W6W"Ö6öæf—&ÖVB66VæRF—7Æ’æBÖöFRÖ'WGFöâ56W2&VÖ–â&÷FV7FVBà ¢22ãBæF—fR76–ær66WFæ6R(	B&÷FV7FVB52(	B‚æ÷fVÖ&W"##` ¥W6W"6öæf—&×2(	ÃB52î(	Ò&÷FV7BF†R6æF÷vÂfö7W2&–ÂÆ–væÖVçBÂWVÂ&–Âv–GF‡2Â‡‚Æ÷vW"v2æB÷&–v–æÂ6æ6öçG&öÇ2â66VæRF—7Æ’æBÖöFRÖ'WGFöâ56W2&VÖ–â&÷FV7FVBâæò'VçF–ÖR6†ævW2÷"æWr&VÆV6Rf÷"F†—266WFæ6R&V6÷&BâæW‡B&–÷&—G’—26öçG&öÆÆVB÷&&—B÷â÷¦ööÒW&f÷&Öæ6R6GW&RöââÇ&VG’×FW‡GW&VBÖöFVÂÂF†Vâ6†ö÷6Rç’&VæFW&–ær÷F–Ö—¦F–öâg&öÒF†RÖV7W&VBæf–vF–öâ6÷7C²Fòæ÷B–æfW"÷&&—B×F–ÖR&VG&r6W6Rg&öÒF†R–×÷'BÖöæÇ’&W÷'B÷"–çG&öGV6RFV×÷&'’—†VÆF–öâv—F†÷WBWf–FVæ6Rà  ¢2ãR(	B6ÖW&æf–vF–öâ&W7öç6RF–væ÷7F–2(	B‚æ÷fVÖ&W"##` ¥W6W"&÷fVBFF–ærF†R7VvvW7FVBæf–vF–öâF–væ÷7F–2FòF†RW†—7F–ærW&f÷&Öæ6RÖöæ—F÷"2öæW‡F'V–ÆFâF†RãB67&VVç6†÷BæBW6W"Ö6öæf—&ÖVB52&VÖ–â&÷FV7FVC¢F†R6æF÷–ç6WBÂfö7W2&–ÂÆ–væÖVçBÂWVÂ&–Âv–GF‡2æBÆ÷vW"v2âV&Æ–W"66VæRF—7Æ’æBÖöFRÖ'WGFöâ56W2&VÖ–â&÷FV7FVBà ¤VF—Bf÷VæBF†R÷&–v–æÂg&VT÷&&—D6öçG&öÇ6–ç7Fæ6R–â7&2öÖ–âæ§6ÂF†R÷BÖ–âÖöæ—F÷"–â7&2÷W&f÷&Öæ6RÖ6÷&Ræ§6ò7&2÷W&f÷&Öæ6RÖÖöæ—F÷"æ§6ÂæBF†RW†—7F–ærf–Ww÷'B¥4ôâF÷væÆöB–â7&2÷W&f÷&Öæ6RÖÆ"×V’æ§6âæWrö'6W'fW"GF6†W2FòF†BW†7B6öçG&öÇ2–ç7Fæ6RæBW†—7F–ær6çf2â—B76—fVÇ’6Æ76–f–W2öæR×ö–çFW"÷&&—BÂGvò×F÷V6‚â÷–æ6‚ö6öÖ&–æVBÖ÷fVÖVçBÂÖ÷W6RÖ'WGFöâ÷&&—B÷â÷¦ööÒæBv†VVÂ¦ööÒÂv†–ÆR6öç7VÖ–æræòWfVçG2âf÷"V6‚6ÖW&Ö6†ævRWfVçBÂ&÷VæFVB7FG2–æ6ÇVFRf—'7B–çWB×FòÖ6†ævR&W7öç6RæB7V'6WVVçB–çWB×FòÖ6†ævR–çFW'fÇ2'’vW7GW&RâÖöæ—F÷"&VÖ–ç2F—6&ÆVBVçF–ÂW‡Æ–6—FÇ’÷VæVBâW†—7F–æræ–ÖF–öâÂ6ÖW&–çWBÂ&VæFW&W"ÂFW‡GW&RfÆ÷rÂ66VæRÂ&–Ç2æBÖöFR'WGFöç2&RVæ6†ævVBâæò&ÆÆVÂF–væ÷7F–2æVÂ÷"&VæFW&–ærÖöFRv2FFVBâF†R&÷FV7FVB7&2ö×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3÷cÓã3bãã—2VçF÷V6†VBà ¤–çFW'&WFF–öâ&÷VæF'“¢ÖV7W&VÖVçG27F÷B÷&&—D6öçG&öÇ2r6ÖW&6†ævVWfVçBÂ&Vf÷&R&VæFW"7V&Ö—76–öâ÷&W6VçFF–öââF†W’6ææ÷BÖV7W&RuRö6ö×÷6—F÷"&W6VçFF–öâ÷"&÷fRF—7Æ–VBg&ÖRw2ÆFVæ7’ÂæBFòæ÷B6†÷rF†BFW‡GW&W2&VÆöBâF†RF–væ÷7F–26â†VÇ6†V6²v†WF†W"F†Rö'6W'fVBFVÆ’—2&Vf÷&RF†R6ÖW&WFFRæB†÷rF†Bf&–W2'’Ö÷fVÖVçBG—Râæò÷F–Ö—¦F–öâÂ7VVGWÂt4Òv–â÷"FW‡GW&R×&VÆöB6W6R—26Æ–ÖVBâæF—fRW6W"6†V6²&VÖ–ç2VæF–ærà ¤WFöÖFVB6÷fW&vR–æ6ÇVFW2&÷VæFVBW"Ö¶–æB7FG2Âf—'7B×&W7öç6RæB&WVFVB6ÖW&WFFW2Â&VÂ6öçG&öÇ2WfVçG2æB76—fR6Æ76–f–6F–öâÂF—6&ÆVBÖöæ—F÷&–æræB6öçG&öÇ2ÖF—6&ÆVBf–ÇFW&–ærÂW†—7F–ærW&f÷&Öæ6RT’öW‡÷'BÂ&VÆV6RÖ&¶W'2æB'VçF–ÖR66†R†6†W2âfö7W6VB6†V6·276VBCróCs²gVÆÂÆö6Â7V—FR76VB2Ã##‚ó2Ã##‚âV&Æ–6F–öâfW&–f–6F–öâföÆÆ÷w2à  ¢22ãRV&Æ–6F–öâfW&–f–6F–öâ(	B‚æ÷fVÖ&W"##` ¥'VçF–ÖR6öÖÖ—BS3–C&S#“F3#ƒ–F3V&f#“##ss#c663WFFVB&VÖ÷FRÖ–æg&öÒ66#3Sfc3vc33vC3“ƒCfS†##csƒs#V#C–SCCf²V&Æ—6†VBG&VR3“6&cc#†6VS6##&†ssƒsvC#VVf6cVCSC&W†7FÇ’ÖF6†VBF†RÆö6Â'VçF–ÖRG&VRâv—D‡V"fW'6–öâæ§6öææB–æFW‚æ‡FÖÆ&W÷'BãRâF†RÆ—fRvW2ÆöFVB2&÷„Æ"cã3bã‚ãV²—G2–æ—F–Â66VæR6†÷vVBF†R7V&RÂæBF†R6æö7F–öâ&–Ç2æBf÷W"ÖöFR'WGFöç2vW&R&W6VçBâF†—2fW&–f–W2F†R&VÆV6RÖ&¶W"æB6†VÆÂ÷66VæRf—6–&–Æ—G’Âæ÷Bæf–vF–öâ&W7öç6Röââ•BâgVÆÂÆö6Â7V—FR76VB2Ã##‚ò2Ã##ƒ²fö7W6VB7V—FR76VBCròCs²v—BF–fbÒÖ6†V6¶—26ÆVââF†Rv—D‡V"6öÖ&–æVB×7FGW2VæGö–çB&WGW&æVBæò7FGW2&V6÷&G2Â6òæò†÷7FVBF÷öÆöw’'Vâ—26Æ–ÖVBâFWf–6Ræf–vF–öâ66WFæ6R&VÖ–ç2VæF–ærà  ¢22ãRæf–vF–öâ&W÷'B&V6V—fVB(	B‚æ÷fVÖ&W"##` ¥W6W"7WÆ–VBF†R&WVW7FVBãRf–Ww÷'B&W÷'Bg&öÒ•B6‡&öÖRöâF†R6ÖR66VæS¢Ã"fW'F–6W2ÂÃf6W2ÂbÃb&VæFW&VBG&–ævÆW2Â2FW‡GW&R&W6÷W&6W2ÂrG&r6ÆÇ2Â&V'V–ÆG2ÂæB#g&ÖR–çFW'fÇ2fW&v–æsbãcsR×2ƒS’ã“re2’Â“Sr×2âW†—7F–ær–çWB×FòÖ6ÖW&Ö6†ævRF–Ö–ærfW&vVCã3SB×2ÂÖƒ×2Â“S×2âF†—2—2F†R7–æ6‡&öæ÷W25R6öçG&öÂÖ6†ævR&÷VæF'’Â&Vf÷&R&VæFW&–ærÂæBFöW2æ÷BW‡Æ–âF†R&W÷'FVBW&6WGVÂW6Râ—BFöW2æ÷BÖV7W&RF—7Æ–VBg&ÖW2÷"uRö6ö×÷6—F÷"v÷&²âV×G’7FvW6ÖVç2æò†6R6×ÆW2vW&R6GW&VC²—B—2æ÷B&ööbF†BæòFW‡GW&Rv÷&²ö67W'&VBà ¥F†R&W÷'B–æ6ÇVFW3ƒ3bæf–vF–öâ–çWG2æB6ÖW&WFFW2f÷"÷&&—C#Âã#Â¦ööÓsÂæBâ·¦ööÓƒR†V6‚W"Ö¶–æBWFFRv–æF÷r—2&÷VæFVBFó#’â—B6÷VçFVBöæR÷&&—BÂöæRâÂöæR6öÖ&–æVBvW7GW&RÂ'WB¦W&ò6ö×ÆWFVB¦ööÒvW7GW&W3²f—'7B×&W7öç6R6×ÆW2V&VBf÷"÷&&—BæB6öÖ&–æVBÂæ÷B¦ööÒâF†R6GW&VBÖWG&–726†÷rF†Bö–çFW"×WFFRFVÆVÖWG'’v÷&¶VBÂ'WBvW7GW&R6ö×ÆWF–öâö6Æ76–f–6F–öâv2–ç7Vff–6–VçBf÷"F†R&WVW7FVB6W&FR–æ6‚6ö×&—6öââæòãR52ÂFW‡GW&R×&VÆöB6W6RÂ÷"W&f÷&Öæ6R–×&÷fVÖVçB—2–æfW'&VBà ¢22ãb(	B6÷'&VÆFRvW7GW&R–çWBv—F‚&VæFW&W"7V&Ö—76–öâ(	B‚æ÷fVÖ&W"##` ¤VF—BföÆÆ÷vVBF†RW†—7F–ærg&VT÷&&—D6öçG&öÇ6ö6çf2ö'6W'fW"Â÷BÖ–âW&f÷&Öæ6RÖöæ—F÷"Â¥4ôâf–Ww÷'B&W÷'BÂæB&öGV7F–öâæ–ÖF–öâÆö÷âF†RWF†÷&—FF—fRg&ÖR÷væW"—27&2öÖ–âæ§6æ–ÖFR‚–²—BÇ&VG’6ÆÇ2&VæFW&W"ç&VæFW"‡66VæRÆ6ÖW&–æBF–ÖW25R&VæFW"7V&Ö—BâFBöæR&VBÖöæÇ’Ööæ—F÷"6ÆÆ&6²–ÖÖVF–FVÇ’gFW"F†BW†—7F–ær6ÆÂÂ76–ær—G2VæBF–ÖW7F×âF†RÖöæ—F÷"æ÷r&V6÷&G2f—'7B–çWN(i&æW‡B&VæFW"×7V&Ö—BæBÆFW7B–çWN(i'&VæFW"×7V&Ö—B'’vW7GW&RÂÆöæw6–FRF†RV&Æ–W"6ÖW&Ö6†ævRF–Ö–æw2âF†R6ÆÆ&6²'Vç2öæÇ’v†–ÆRÖöæ—F÷&–ær—2Væ&ÆVBâ—BÖV7W&W2F†RW†—7F–ær&VæFW&W"6ÆÂw26ö×ÆWF–öâÂæ÷BuRv÷&²öF—7Æ’à ¥F†RãR&W÷'Bw2'6VçB6ö×ÆWFVB¦ööÒWfVçB—2FG&W76VB'’6ö×ÆWF–ær6W76–öç2g&öÒ76—fRö–çFW&F÷vâ÷Wö6æ6VÂÆ–fV7–6ÆR&F†W"F†â÷&&—D6öçG&öÇ27F'BöVæBÂv†–6‚6â7Æ—Bö–çFW"ÖÖöFRG&ç6—F–öç2âF÷V6‚6Æ76–f–6F–öâ6ö×&W2ö–çFW"×—"Ö–Gö–çB6†–gBv–ç7B7â6†ævR6ò–æ6–FVçFÂÖ–Gö–çBG&–gBGW&–ær–æ6‚—2æ÷B6÷VçFVB2ã²vVçV–æRâÇW2–æ6‚&VÖ–ç26öÖ&–æVBâv†VVÂ&VÖ–ç2öæR¦ööÒ6W76–öââ÷&–v–æÂ–çWBÆ—7FVæW'2&R76—fRö'6W'fW'3²F÷V6‚öÖöFVÂö6ÖW&÷&VæFW"6öFR—2Væ6†ævVBâF†R&÷FV7FVB×VÇF’G&ç6f÷&ÒæB66WFVBãBÆ–÷WB÷66VæRöÖöFR&V†f–÷'2&VÖ–âVçF÷V6†VBà ¤fö7W6VBWFöÖFVB6†V6·26÷fW"vw&VvFRf—'7B6ÖW&æB&VæFW"×7V&Ö—BF–Ö–æw2Â7GVÂ6ÖW&6†ævRö'6W'fF–öâÂ6ö×ÆWFVBö–çFW"ÖÆ–fV7–6ÆR÷&&—B÷â÷–æ6‚ö6öÖ&–æVB÷v†VVÂ6÷VçG2ÂÖ–Gö–çBÖG&–gB6Æ76–f–6F–öâÂF—6&ÆVB÷76—fR&V†f–÷"æB7GVÂ&VæFW&W"†öö²÷&FW"â&WGvVVâÖg&ÖR†æFöfb&Vw&W76–öâ6öæf—&×2F†B6ö×ÆWF–æröæRvW7GW&RæB7F'F–æræ÷F†W"&Vf÷&RF†RæW‡Bæ–ÖF–öâg&ÖR&W6W'fW2&÷F‚&VæFW"F–Ö–æw2âfö7W6VBW&f÷&Öæ6R÷&VÆV6R7V—FR76W33ó3²gVÆÂÆö6ÂçÒFW7F76W32Ã#3ó2Ã#3²v—BF–fbÒÖ6†V6¶—26ÆVââW6W"†æG2Ööâãb66WFæ6R—2VæF–ærâV&Æ–6F–öâfW&–f–6F–öâföÆÆ÷w2à  ¢22ãbV&Æ–6F–öâfW&–f–6F–öâ(	B‚æ÷fVÖ&W"##` ¥'VçF–ÖR6öÖÖ—Bƒ“f–cf63fVcƒ“sCF3“3c&CSc#C–cFCSv—2öâ&VÖ÷FRÖ–æ²—G2v—D‡V"G&VRCC#ƒ#vVC&C3fF#SvSs“F“vFC#“&CVfW†7FÇ’ÖF6†W2F†RÆö6Â'VçF–ÖR6öÖÖ—BG&VRâ&VÖ÷FRfW'6–öâæ§6öææB–æFW‚æ‡FÖÆ&W÷'BãbâvW2'VâC#Ccsssc#C67V66VVFVBâ&VÆöF–ærF†RÆ—fR6—FRF—7Æ–VB&÷„Æ"cã3bã‚ãfÂF†RFVfVÇB7V&RÂÆVgB6æö7F–öâ&–Ç2æBÆÂf÷W"ÖöFR'WGFöç2âF†—26öæf—&×2Æ—fR6†VÆÂ÷66VæRf—6–&–Æ—G’Âæ÷BF&vWBÖ•Bæf–vF–öâÆFVæ7’âÆö6ÂçÒFW7F76W32Ã#3ó2Ã#3²fö7W6VBW&f÷&Öæ6R÷&VÆV6R6WB76W33ó3²v—BF–fbÒÖ6†V6¶6ÆVââ†÷7FVBF÷öÆöw’'VâC#CcssscCƒF76VBçÒFW7F¢2Ã#3ó2Ã#3âF†RFö72föÆÆ÷r×WvW2'VâC#Ccƒ3S–Ç6ò7V66VVFVBâæF—fRãbæf–vF–öâ66WFæ6R—2VæF–ærà ¢22ãbf–Ww÷'B&W÷'B&V6V—fVB(	BÆöær&VæFW"×7V&Ö—B÷WFÆ–W"Âg&ÖRv†–FFVâ(	B‚æ÷fVÖ&W"##` ¥F†RW6W"7WÆ–VBâ•B6‡&öÖRãbf–Ww÷'B&W÷'Bƒ3cl9sƒƒbÂE#"Âf—6–&ÆRÂ7GVF–òôö&¦V7B’f÷"Ã"fW'F–6W2òÃf6W2ÂbÃbG&–ævÆW2Âr6ÆÇ2æB2FW‡GW&W2âF†R#&WF–æVBg&ÖR–çFW'fÇ2fW&vSbãcsV×2ƒS’ã“te2’Â“Sv×2âöæR&V'V–ÆBFöö³36×2â6vRÖVâöÖƒ&×2Â66VæR†öö·36×3²FW‡GW&RFV6öFRæBFW‡GW&RÖF—7Æ’V6‚†fRöæR6×ÆRƒv×2òC6×2’Â6òF†—2&W÷'BFöW2æ÷B6†÷r&WVFVBFV6öFRöF—7Æ’öâæf–vF–öâà ¤æf–vF–öâ–çWB×FòÖ6ÖW&Ö6†ævRfW&vW3ãC3†×2ÂÖƒ×2Â“S×2â–çWB×Fò×&VæFW"×7V&Ö—B†3Cƒ6×ÆW2ÂÖVã‚ã##6×2Â“S×2ÂÖƒÃƒV×3²f—'7BÖ–çWB×Fò×&VæFW"×7V&Ö—B†3r6×ÆW2ÂÖVã&×2ÂÖƒSv×2âF†W&R&S2÷&&—BÃ"âæC"â·¦ööÒ6ö×ÆWFVB6W76–öç2Â'WBæò6W76–öâ6Æ76–f–VB2¦ööÒFW7—FS#¦ööÒ6ÖW&Ö6†ævRæB&VæFW"×7V&Ö—B6×ÆW2âF†—27VvvW7G2F†R6W&FR–æ6‚72Ö’†fR&VVâ6Æ76–f–VB26öÖ&–æVBÂ6òvW7GW&RÆ&VÇ2&Ræ÷B6öæ6ÇW6—fRâæòW&f÷&Öæ6R52÷"&ö÷B6W6R—2–æfW'&VBâ–â'F–7VÆ"ÂÖƒÃƒV×2ö–çG2Fò÷FVçF–ÆÇ’Æöær66†VGVÆ–ærög&ÖRW6RÂ'WBãb–çFVçF–öæÆÇ’W†6ÇVFW2g&ÖR–çFW'fÇ2ãÓÃ×2æB&W÷'G2æò6÷VçBöÖ‚f÷"F†VÒÂ6òF†R&W÷'B6ææ÷B6öæf—&Òv†WF†W"F†R÷WFÆ–W"6ö–æ6–FW2v—F‚7V6‚và ¢22ãr(	B&W÷'BW†6ÇVFVBÆöærg&ÖRv2(	B‚æ÷fVÖ&W"##` ¤FB&÷VæFVB6÷VçBöÖ‚f÷"g&ÖR–çFW'fÇ2ãÓÃ×2–âF†RW†—7F–ær÷BÖ–âW&f÷&Öæ6RÖöæ—F÷"â&W6W'fRF†R7W'&VçBg&ÖRÖVâôe2÷“R&V†f–÷"Âv†–6‚W†6ÇVFW2F†÷6R&&R–çFW'fÇ2âW‡Æ–â&÷F‚ÖWG&–72–âF†Rf—6–&ÆRÖöæ—F÷"âF†—26Æ&–f–W2v†WF†W"â–çWB×Fò×&VæFW"×7V&Ö—B÷WFÆ–W"†26÷'&W7öæF–ærfW'’Æöærg&ÖRvv—F†÷WB6†æv–ærF†Ræ–ÖF–öâÆö÷Âæf–vF–öâÂ&VæFW&W"Â66VæR÷"ÖöFVÂâF†RW†—7F–ær6GW&Rw2öæRÖöfbFW‡GW&RFV6öFRöF—7Æ’6×ÆW2Fòæ÷B§W7F–g’6†æv–ærFW‡GW&R÷"&VæFW"&V†f–÷"à ¤æWrÖöæ—F÷"&Vw&W76–öâ6†V6·2ÃƒV×2–çFW'fÂ—26÷VçFVB6W&FVÇ’v†–ÆRæ÷&ÖÂ6FVæ6R&VÖ–ç3f×2æB&W6WB6ÆV'2—BâWFFRF†R6†VÆÂ&VÆV6RÖ&¶W"æBöæÇ’F†R6†ævVBÖöæ—F÷"ö6÷&R–ç3²F†R&÷FV7FVB×VÇF’G&ç6f÷&Ò&VÖ–ç2Væ6†ævVBâfö7W6VBW&f÷&Öæ6R÷&VÆV6RFW7G2733ó3²gVÆÂÆö6ÂçÒFW7F76W32Ã#3"ó2Ã#3#²v—BF–fbÒÖ6†V6¶—26ÆVââ7&2ö×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§6&VÖ–ç2Væ6†ævVBæB–ææVBCã3bããâV&Æ—6†VBöâ&VÖ÷FRÖ–â26öÖÖ—BC3Cc#Sƒcfc3ssvCcƒf#Sc3Sv36cƒ“²—G2v—BG&VR#s&V3VF#–C#ƒ#“FFcc“†V3&#F###VW†7FÇ’ÖF6†W2F†RgVÆÇ’FW7FVBÆö6Â&VÆV6RG&VRâ&VÖ÷FRfW'6–öâæ§6öæ&W÷'G2ãrâvW2'VâC#Css“Cc&7V66VVFVC²Æ—fR&÷„Æ"F—7Æ—2cã3bã‚ãvâ†÷7FVBF÷öÆöw’'VâC#Css“CƒsV6ö×ÆWFVB7V66W76gVÆÇ’âÆö6Âfö7W6VBW&f÷&Öæ6R÷&VÆV6R6†V6·2733ó3²gVÆÂçÒFW7F76W32Ã#3"ó2Ã#3#²v—BF–fbÒÖ6†V6¶—26ÆVââæF—fRãr6†V6³¢&WVB6†÷'B6W&FR÷&&—B÷â÷–æ6‚76W2öâF†R6ÖRFW‡GW&VBÖöFVÂÂ–ç7V7BÆöætg&ÖTv2æBW"Ö¶–æB7V&Ö—BF–Ö–æw2Â6öæf—&Ò66VæR÷FW‡GW&RæB6öçG&öÇ2&VÖ–âW6&ÆRÂW‡÷'BF†Rf–Ww÷'B&W÷'BÂæB6’v†WF†W"F†RW6R&V7W'2âF†W6RÖV7W&VÖVçG27F–ÆÂFòæ÷BW‡÷6RuRö6ö×÷6—F÷"&W6VçFF–öâà  ¢2ã2(	B&WF–â&ö¦V7Bf–ÆVæÖRöâ÷Vâò6fR(	B’æ÷fVÖ&W"##` ¥W6W"6öæf—&×2ã"53²&÷FV7B—G2æf–vF–öâÂö&¦V7B'&÷w6W"æB6VÆV7F–öâö6ÆVçW&V†f–÷W"âvW3C#SC33S#““7V66VVFVBæBÆ—fRã"6†VÆÂöÖöGVÆR'—FW2ÖF6†VBÖ–ââæòVçF—FF—fR•B7VVGW—2–æfW'&VBà ¤W†—7F–ær6fRW6W26W‡÷'Df–ÆTæÖRæBÇ&VG’&WF–ç2—B7&÷72&WVFVB6fW2â7V66W76gVÂ÷Vâæ÷r6WG2F†B4ÔRf–VÆBg&öÒF†R6VÆV7FVBf–ÆRæÖRÂ7G&—–ærF†Rf–æÂæ&÷†Æ"W‡FVç6–öâ66RÖ–ç6Vç6—F—fVÇ’â76–væÖVçBföÆÆ÷w2fÆ–FFVB66VæR&WÆ6VÖVçBæBT’&W7F÷&F–öââ6æ6VÆÆVBÂÖÆf÷&ÖVBæB&VgW6VB÷Vç2&WF–âF†R&Wf–÷W2æÖRâW6W"VF—G27F–ÆÂ6†ö÷6RF–ffW&VçB6fRæÖRâ÷&–v–æÂf–ÆVæÖR6æ—F—¦F–öâÂF÷væÆöBÖV6†æ—6ÒÂ&ö¦V7B6öFV2ÂÖöFVÂö†—7F÷'’÷væW'2æB&÷FV7FVB×VÇF’G&ç6f÷&Ò&RVæ6†ævVBâ'&÷w6W"F÷væÆöG2Ö’FBGWÆ–6FRÖf–ÆR7Vff—ƒ²F†—2FöW2æ÷Bw&çBF—&V7B÷fW'w&—FR66W72à ¥&VÆV6Rã2Ö&¶W'2Â6†ævVBö&¦V7BÖævVÖVçB–âæBW†—7F–ær&VÆV6R×fW'6–öâÆöFW"6†–â&Vg&W6†VC²Væ6†ævVB6†'ÖVFvR÷væW"&WF–ç2ã"–ââ&–÷"56W2&WF–æVBâæF—fRã2f–ÆVæÖR66WFæ6RVæF–ærâæW‡C¢÷VâæÖVB&ö¦V7BÂ6fRGv–6RÂVF—Bf–ÆRæÖRæB6fS²6æ6VÂæ÷F†W"÷VâæB6öæf—&ÒF†R7W'&VçBæÖR7F—2âfÆ–FF–öã¢Cfö7W6VB6†V6·2æBf–æÂgVÆÂÆö6Â7V—FS2Ã#CBó2Ã#CB53²v—BF–fbÒÖ6†V6²6ÆVââ–æ—F–Â66†RÖ6öçG&7Bf–ÇW&W2W‡÷6VBF†RöÆFW"G&vW"ö&¦V7BÖævVÖVçB–×÷'C²&÷F‚'VçF–ÖRÆöFW"U$Ç2æ÷rÖF6‚ã2æBF†R&Wf–WvVB6öçG&7Bâ&÷FV7FVB×VÇF’æB6†'ÖVFvR6÷W&6W2Væ6†ævVBâV&Æ–6F–öâfW&–f–VC¢'VçF–ÖR6öÖÖ—CvcFS#CCCvV&F&f3“ƒV#c6c“FFC3S“6SfS²vW3C#SSc“sCB7V66VVFVBâ66†RÖ'W7FVBÆ—fRfW'6–öâæ§6öâÂ–æFW‚æ‡FÖÂÂö&¦V7BÖævVÖVçBÂG&vW"æBf6Rv÷&¶fÆ÷rÖF6‚FW7FVBÖ–ââ†÷7FVBF÷öÆöw“C#SSc"v27F–ÆÂ'Vææ–ærBF†—2Fö7VÖVçFF–öâWFFS²f–æÂÆö6ÂgVÆÂ7V—FS2Ã#CBó2Ã#CB76VBâæF—fRf–ÆVæÖR66WFæ6R&VÖ–ç2VæF–ærà ¢ÒÒÐ ¢2ã2&÷FV7FVB52(	B’æ÷fVÖ&W"##` ¥W6W"6öæf—&×2ã253¢&WF–â÷VæVBæ&÷†Æ"f–ÆVæÖRf÷"&WVFVB6fW3²VF—F&ÆRf–ÆRæÖR&VÖ–ç2F†RW†—7F–ær÷væW"â&÷FV7BF†—2Æöæw6–FRã"æf–vF–öâôö&¦V7B'&÷w6W"ö6Æ76–f–6F–öâö6ÆVçW66WFæ6RæBÆÂV&Æ–W"56W2â†÷7FVBF÷öÆöw“C#SSc"6ö×ÆWFVB7V66W76gVÆÇ“²Æö6Â7V—FS2Ã#CBó2Ã#CBæBfW&–f–VBvW3C#SSc“sCBV&Æ–6F–öâ&VÖ–â&V6÷&FVB&VÆ÷râæòæWr'VçF–ÖR'V–ÆBf÷"F†—266WFæ6Rà ¤æW‡B&V6öÖÖVæFVB66÷VB'V–ÆC¢VF—B&VÖ–æ–ærfW'FW‚fÆVæ6Rö6Æ76–f–6F–öâö6ÆVæ&ÆR–ç7V7F÷'2f÷"&WVFVBF÷öÆöw’6öç7G'V7F–öâW6–ærF†Rã"6÷W&6R&öf–ÆR2ÆVBâ&W6W'fRWfW'’Æ—7FVæW"æB6Æ76–f–6F–öâö6öæ6fR÷VBÖ6ÆVâ'VÆS²ÖV7W&R&öGV7F–öâÖ÷væW"&—G’æBÖF6†VB&Vf÷&RögFW"6÷7B&Vf÷&R6†ö÷6–ær&W—"âW†—7F–æræöFRÖV7W&VÖVçG2&Ræ÷B•BÆFVæ7’ÖV7W&VÖVçG2â&W7VÖRt4ÒöæÇ’f÷"FVÖöç7G&FVB&VÖ–æ–ær5R†÷G7÷BÂv—F‚¦f67&—B&6VÆ–æRæB6÷'&V7FæW72öVæB×FòÖVæBvFW3²æò7V7VÆF—fR¶W&æVÂÖ–w&F–öâ÷"66—G’6Æ–Òà ¢ÒÒÐ ¢2ãB(	Bg&W6‚fW'FW‚Öf6R–æ6–FVæ6R&VÖ÷fW2&WVFVB66ç2(	B’æ÷fVÖ&W"##` ¥W6W"WF†÷&—¦W2æW‡B66÷VBW&f÷&Öæ6R'V–ÆBgFW"&÷FV7FVBã"æBã256W2âVF—Bf÷VæBfÆVæ6Rö6Æ76–f–6F–öâF—66öææV7FVDf6TfâæB6ÆVæ&ÆR7G&–v‡D6æF–FFR66ææVBWfW'’f6Rf÷"WfW'’fW'FW‚öâV6‚Væ6†ævVB&VÆV6R÷7FFRÆ—7FVæW"â&WW6RV6‚÷&–v–æÂ–ç7V7F÷#²Fòæ÷B&VÖ÷fRÆ—7FVæW'2÷"6†ævRF÷öÆöw’'VÆW2à ¤6ÖÆÂ6†&VB&VBÖöæÇ’fW'FW„f6T–æ6–FVæ6R†VÇW"'V–ÆG2÷&FW&VBÂVæ—VRf6RÖVÖ&W'6†—öæ6RW"–ç7V7F÷"6ÆÂâGWÆ–6FR6÷&æW'2&WF–â÷&–v–æÂ–æ6ÇVFW26VÖçF–73²æöâÖ'&’f6W2æB–çfÆ–B–æF–6W2&R–væ÷&VB2&Vf÷&Rf÷"fÆ–B–ç7V7FVBfW'F–6W2âV6‚–ç7V7F–öâ&V'V–ÆG2g&öÒ7W'&VçBÖW6ƒ²æò–FVçF—G’66†RÂ–çfÆ–FF–öâ66†VÖR÷"vVöÖWG'’ö†—7F÷'’×WFF–öââW†—7F–ærfâF¦6Væ7’÷G&fW'6ÂÂ÷væW"fÆ–FF–öâÂfÆVæ6Rö&÷VæF'’öæöâÖÖæ–föÆBæB6öÆÆ–æV&—G’ö7&V6RöÆö÷6R&÷FV7F–öç2&VÖ–âVæ6†ævVBâ÷&–v–æÂWfVçBÆ—7FVæW'2ÂF–ÖW'2ÂÇ’÷6VÆV7F–öâ÷&VæFW"F‡2&VÖ–â'—FRÖ–FVçF–6Ââ7GVÂ6ÆVâfW'F–6W2õVB6ÆVâö6öæ6fR6VÆV7F–öâöÖW6‚¶W&æVÂæB&÷FV7FVB×VÇF’G&ç6f÷&Ò&RVæ6†ævVBâF†—2—2¦f67&—B–ç7V7F–öâv÷&²Âæòt4Ò¶W&æVÂ÷"ÖVÖ÷'’ö66—G’6Æ–Òà ¤g&÷¦VâW†7Bã2–ç7V7F÷"6÷W&6W2&RVæFW"FW7G2öf—‡GW&W2÷W&f÷&Öæ6RÂ&6VÆ–æR6öÖÖ—F#6C&6SsC6Cƒ&cVc&f6cSsS#Vcf6#fSSC2âæWr&öGV7F–öâÖÖöGVÆR†&æW726†V6·2ÆÂ6VÆV7F–öç2Â7Æ—Bfç2Â6öæ6f—G’ÂæöâÖÖæ–föÆBVFvW2Â&WVFVB6÷&æW'2ÂÆö÷6Rö7&V6VBF÷öÆöw’Â–â×Æ6RVF—G2÷&W7F÷&F–öâæBVæ6†ævVBÆ—7FVæW"F–Ç2â&W&öGV6–&ÆR67&—B67&—G2ö&Væ6†Ö&²×fW'FW‚Ö–ç7V7F–öâÓBæÖ§2w&—FW2Fö72÷W&f÷&Öæ6R×fW'FW‚Ö–ç7V7F–öâÓBæ§6öã¢Gvòv&×W2öf—fR–çFW&ÆVfVB&WVG2ÂgVÆÂ–ç7V7B6ÆÇ2–æ6ÇVF–ærg&W6‚Æöö·WâÃÖf6RÖVF–âfÆVæ6S3ãCN(i#ãS×2ö6Æ76–f–6F–öã#"ãc~(i#rãSV×2ö6ÆVæ&ÆS3Rã“^(i#ãƒv×3²"ÃÖf6SCƒã“^(i#RãBóS#ã#Ž(i#‚ãSóCS"ã(i#ã×2âW†7B—&VB6Æ76–f–6F–öç2ÖF6‚â7–çF†WF–2æöFR5RÖV7W&VÖVçG2W†6ÇVFRgVÆÂWfVçB6†–ç2Â'&÷w6W"ôuRæBæF—fR•BÆFVæ7“²æòVæB×FòÖVæBW&f÷&Öæ6R52—26Æ–ÖVBà ¥&VÆV6RãBÖ&¶W'2ÂF‡&VR–ç7V7F÷"6†–ÆB¶W—2Â6†&VBÆöö·W¶W—2æB6ö×ÆWFRW†—7F–ær&VÆV6R×fW'6–öâ&VçB6†–â&Vg&W6†VBâö&¦V7BÖævVÖVçBã2æB6†'ÖVFvRã"–ç2÷6÷W&6R&WF–æVBâfö7W6VB6†V6·3S2óS2æBgVÆÂÆö6Â7V—FS2Ã#Sró2Ã#Sr73²f–æÂ&VÆV6Rö6†V6¶Æ—7B&V6†V6³’ó’æBv—BF–fbÒÖ6†V6²6ÆVââV&Æ–6F–öâfW&–f–VC¢'VçF–ÖS“fc“#SƒS&V3F3s†&fSffCcCVV#&c3vS#v3Â–FVçF–6Âg&öÒFö7VÖVçFF–öâ6öÖÖ—FCFF##ƒSV3sf3c3cSccfc“3f†F3CCF6#3#‚âvW3C#SS“ƒ“#S37V66VVFVC²66†RÖ'W7FVBÆ—fRfW'6–öâæ§6öâö–æFW‚æ‡FÖÂ÷6†&VBÆöö·W÷F‡&VR–ç7V7F÷'2öf6Rv÷&¶fÆ÷röG&vW"ÆÂ'—FRÖÖF6‚FW7FVB6÷W&6Râ–æ—F–ÂvW3C#SS“S#Ssr'V–ÇB'WB7FÆÆVB–âFWÆ÷–ÖVçBæBv27WW'6VFVBö6æ6VÆÆVC²Æöw2Væf–Æ&ÆR„&Æö$æ÷Df÷VæB’Â6W6RVç&÷fVââ†÷7FVBF÷öÆöw“C#SS“S#SS#7V'6WVVçFÇ’6ö×ÆWFVB5T44U52ƒ2Ã#Sró2Ã#Sr’âÆö6Ã2Ã#Sró2Ã#SræBfö7W6VCS2óS276VC²æF—fRãB66WFæ6R&VÖ–ç2VæF–ærâæF—fRãB66WFæ6RVæF–ærâFWf–6S¢6ÖRÖöFVÂÆ–gB÷&W7F'B÷&&—N(i'î(i'–æ6ƒ²ö&¦V7B'&÷w6W"÷Vâ÷6VÆV7BöFVÆWFS²fW'FW‚&÷VæF'’ö–çFW&–÷"öæöâÖÖæ–föÆB÷fÆVæ6Rö6ÆVæ&ÆR6VÆV7F–öç2F†Vâ6fRVF—BõVæFòõ&VFòæB6öæ6fR6VÆV7F–öâõVB6ÆVâ6Öö¶RâæW‡BföÆÆ÷rFWf–6R&W7VÇC²&öf–ÆRç’&VÖ–æ–ærW‡Vç6—fR÷væW"&Vf÷&R6†ö÷6–ært4Òâ&W6W'fRf–ÆVæÖRæBÆÂV&Æ–W"56W2à ¢ÒÒÐ ¢2ãR(	B&÷VæFVB6æF–FFR6V&6‚f÷"Æö÷6RfW'F–6W2(	B’æ÷fVÖ&W"##` ¥W6W"6öæf—&×2ãB52æB&WVW7G2öæW‡F'V–ÆBâ&÷FV7B—G2æf–vF–öâôö&¦V7B'&÷w6W"÷fW'FW‚–ç7V7F–öâö6öæ6fR×6VÆV7F–öâõVB6ÆVâ&V†f–÷W"Æöæw6–FRã2f–ÆVæÖRæBÆÂV&Æ–W"56W2âæF—fRãB66WFæ6R—2æòÆöævW"VæF–æs²†—7F÷&–6ÂVæF–æræ÷FW2&VÆ÷r&R7WW'6VFVBà ¤VF—Bf÷VæB÷&–v–æÂÆö÷6RfW'F–6W2–ç7V7F–öâÖF6†W2V6‚f6R×W6VB6æ6†÷BfW'FW‚FòWfW'’VçW6VBÆ—fRÖ&¶W"ÂVG&F–2–âFVç6RfW'FW‚ÖÖöFR66VæW2â&W6W'fRWF†÷&—FF—fR6æ6†÷BÖ–æs¢ÖævW"æö&¦V7G2÷6fT7F—fRÂÖ&¶W"G&fW'6ÂæB÷&–v–æÂçVÖW&–2Æ—fR–æFW‚÷&FW&–ær&RVæ6†ævVBâæòF—&V7BÖÆ—fR–æFW‚6†÷'F7WBÂW'6—7FVæ6RöÆ–æ²ö†—7F÷'’6†ævR÷"&VÖ÷fVBÆ—7FVæW"âW†—7F–ærÖW6‚6æ6†÷B7–æ6‡&öæ—¦F–öâ6â&VÖ–âW‡Vç6—fRæB—2÷WG6–FRF†—2'V–ÆBà ¤÷&–v–æÂ–ç7V7F÷"æ÷r'V–ÆG2g&W6‚v–FW7BÖ†—26÷'FVBÖ&¶W"–æFW‚öæ6RW"6ÆÂâ&–æ'’&÷VæG26ö×&RF†R6ÖR7V&VB†—2F—7Fæ6RFòF†RW†—7F–ærFöÆW&æ6R7V&VC²6æF–FFW2&R&W7F÷&VBFò÷&–v–æÂÖ&¶W"÷&FW"&Vf÷&RF†RVæ6†ævVBæV&W7B×VçW6VBF—7Fæ6RÆö÷âç’ÖF6‚66WFVB'’F†R÷&–v–æÂgVÆÂ4BF—7Fæ6R×W7B7W'f—fRF†R†—2&÷VæBâWVÂÖF—7Fæ6RöGWÆ–6FRÖ6ö÷&F–æFRö–æFW‚F–W2&WF–â÷&–v–æÂ÷&FW"æBW6VBÖ–æFW‚W†6ÇW6–öââæò&WF–æVB66†Râæöæf–æ—FR†—2÷6—F–öç2÷"FöÆW&æ6RfÆÂ&6²FòF†R÷&–v–æÂgVÆÂ6V&6‚âFVç6R6ö–æ6–FVçBööæRÖ†—2ÖFVvVæW&FRF—7G&–'WF–öç2Ö’&WF–âVG&F–2v÷'7B66S²F†—2—2æ÷BwV&çFVRf÷"WfW'’ÖW6‚÷"ö&¦V7BÖÖöFRW6W2v—F†÷WBfW'FW‚Ö&¶W'2à ¤g&÷¦Vâ&6VÆ–æRFW7G2öf—‡GW&W2÷W&f÷&Öæ6RöÆö÷6R×fW'F–6W2ÓBæ§2—2W†7CfcƒfFSf3333vVcSvV3s##Sv6f3c#6SR6÷W&6Râ6WfVâ&öGV7F–öâÖÖöGVÆR66W26ö×&R6ö×ÆWFR&W÷'G2Â6VÆV7F–öâ÷7FGW2÷F—FÆR6ÆÆ&6·2Â6ö×7FVB6æ6†÷B”G2Â—6öÆFVB÷v—&RÖ&¶W'2ÂFöÆW&æ6RVFvW2ÂæV&W7BÖ—76W2ÂÆ&vR6ö÷&F–æFW2Âæöæf–æ—FRö÷fW&fÆ÷rFFÂGWÆ–6FRF–W2Â6VVFVB&æFöÒFFæBVF—G2÷&W7F÷&F–öââÇ’÷7–æ2öÆ—7FVæW"÷F–ÖW"æBÖævW"×&VFW"F–Ç2&VÖ–â'—FRÖ–FVçF–6ÂâæòÖöFVÂ×WFF–öââW†—7F–ærÖW6‚¶W&æVÇ2Â6VÆV7F–öâö6ÆVçW'VÆW2ÂãBÆöö·Wö–ç7V7F÷'2æB&÷FV7FVB×VÇF’G&ç6f÷&Ò&RVæ6†ævVBà ¥&W&öGV6–&ÆR67&—G2ö&Væ6†Ö&²ÖÆö÷6RÖ–ç7V7F–öâÓRæÖ§2w&—FW2Fö72÷W&f÷&Öæ6RÖÆö÷6RÖ–ç7V7F–öâÓRæ§6öã²Gvòv&×W2öf—fR–çFW&ÆVfVB&WVG2Â6ö×ÆWFR–ç7V7B–æ6ÇVF–ærG&fW'6Â÷6÷'F–ærög&W6‚–æFW‚âÃÖ&¶W'3CBã3ž(i#2ãƒF×2ƒSÃC“ž(i#"Ã““’gVÆÂÖF—7Fæ6R6†V6·2“³BÃ“bÖ&¶W'3ƒrãC^(i##BãC†×2ƒ‚Ã3“ÃcS^(i#32Ã’’âW†7B—&VB&W÷'B&—G’â7–çF†WF–2æöFR5RW†6ÇVFW2Væ6†ævVBÖævW"6æ6†÷Bö†—7F÷'’7–æ6‡&öæ—¦F–öâÂv†öÆRWfVçB6†–âÂæF—fR•BÆFVæ7’æBuRâæòt4ÒÂ66—G’÷"VæB×FòÖVæBW&f÷&Öæ6R526Æ–ÖVBà ¥&VÆV6RãR6†VÆÂÖ&¶W'2ÂÆö÷6RfW'F–6W2ÆöFW"æBW†—7F–ær&VÆV6R×fW'6–öâ&VçB6†–â&Vg&W6†VBâ66WFVBãB–ç7V7F÷"÷6†&VBÖÆöö·W–ç2æBã2ö&¦V7BÖævVÖVçB&VÖ–ââfö7W6VCcócæBgVÆÂÆö6Â7V—FS2Ã#cBó2Ã#cB73²v—BF–fbÒÖ6†V6²6ÆVââV&Æ–6F–öâfW&–f–VC¢'VçF–ÖSScfVcSSs3“s†Csƒƒ3ƒ†fC6f#3vSCv&3æBW†7BFW7FVBG&VS6Ccc&SS#“6S&C##V&SsccFFSv#&#3–VFS6c2âvW3C#ScSƒSsƒr7V66VVFVC²66†RÖ'W7FVBÆ—fRfW'6–öâæ§6öâö–æFW‚æ‡FÖÂôÆö÷6RfW'F–6W2öG&vW"öf6Rv÷&¶fÆ÷r÷6†VÆÂ6ö×&—6öâÆÂ'—FRÖÖF6‚FW7FVB6÷W&6RâFö7VÖVçFF–öâ6öÖÖ—F6#VS“ƒcƒ“Cv33cS#VSS“S#s““Sc3FcvCs2&WF–ç2–FVçF–6Âf–ÆW2â†÷7FVBF÷öÆöw“C#ScSƒcsbv27F–ÆÂ–â&öw&W72BF†—2&ööc²Æö6Ã2Ã#cBó2Ã#cBæBfö7W6VCcóc72Âæò†÷7FVB526Æ–ÖVB–WBâæF—fRãR66WFæ6R&VÖ–ç2VæF–ærâæF—fRãRVæF–ærâFWf–6S¢6ÖRFVç6RÖöFVÂ–âfW'FW‚ÖöFRÂÆ–gB÷&W7F'B÷&&—B÷â÷–æ6‚æB6VÆV7F–öã²6VÆV7BÆö÷6RfW'F–6W2v—F‚6öÖR—6öÆFVB÷v—&Rö–çG3²Ö÷fRö–çBõVæFòõ&VFòæB&WVB6VÆV7F–öã²6öæf—&Òö&¦V7B'&÷w6W"æB66WFVB6öæ6fRõVB6ÆVâ&V†f–÷W"âF†VâÖV7W&Rç’&VÖ–æ–ær&÷GFÆVæV6²&Vf÷&Rt4ÒFV6—6–öâà ¢ÒÒÐ ¢2ãb(	BÆö÷VæF–ær&Vg&W6‚æBf6R&Wf–Wr5R&W—'2(	B’æ÷fVÖ&W"##` ¥W6W"ãR52—2&÷FV7FVBÂ–æ6ÇVF–ærÆö÷6RfW'F–6W26÷'&V7FæW72Â'WBFVç6RÆö÷7WBæf–vF–öâæBf6RÖ&æBW‡G'W6–öâ&Wf–Wr&VÖ–â6Æ÷râæWr67&VVç6†÷B6öæf—&×2ãRÃ"ÃC#bfW'F–6W2ó"ÃC#Bf6W3²7WÆ–VBtÄ"7F—2&—fFRæB—2æ÷B6öÖÖ—GFVBâ7W'&VçB–×÷'BÖ÷væW"†&æW72––VÆG3"ÃC#bfW'F–6W2ó"ÃCs"&V6öç7G'V7FVBf6W3²&W&W6VçFF—fS#Öf6RVÆWfF–öâ&æB—26÷W&6Rv÷&¶ÆöBÂæ÷B&W&öGV7F–öâöbF†RW†7B67&VVç6†÷B6VÆV7F–öâ÷"æF—fRF–Ö–ærà ¤6öæf—&ÖVB5R—77VS¢VFvRÆö÷6WGF–æw27–æ2'Vç2WfW'’æ–ÖF–öâg&ÖRæB6ÆÇ2÷&–v–æÂÆö÷7WD6öÖÖ—BçVæF–æ~(i&7W'&VçE–VÆÆ÷tVFvT¶W—2âF†B†VÇW"&V'V–ÇBÖW6‚æVFvW2‚’f÷"UdU%’F—7Æ–VBVFvRÂWfVâæöâ×–VÆÆ÷röæW2âöæRg&W6‚VçVÖW&FVBVFvRÆ—7BW"†VÇW"–çfö6F–öâæ÷r6W'fW2F†R6ÖR–æFW‚ö6öÆ÷"ö¶W’Æö÷âæò&WF–æVB66†R÷"6†ævVB6VÆV7F–öâö6öÖÖ—B6VÖçF–72âW†—7F–ærÆö÷6WGF–æw266†VGVÆ–ærÂU„5BöæF—fR6öÖÖ—B÷6Æ–FRö†—7F÷'’Âö–çFW"Æ—7FVæW'2æBwV&G2&VÖ–ââ7WÆ–VBÖÖöFVÂæöFR—&VB6×ÆS£BÃƒ“bVçVÖW&F–öç2órÃc‚ã“–×>(i#óRãCf×3²W†7BVæF–ær¶W’'&—2ÖF6‚â7–çF†WF–3SsbÖf6Rw&–CR–çFW&ÆVfVB6×ÆW3¢ÖVF–ã#rãcž(i#ãSf×2ƒÃ#(i#VçVÖW&F–öç2’à ¤6öæf—&ÖVB5R—77VS#¢F—&V7Bf6Rö–çFW&Ö÷fR&W7F÷&VB6÷W&6RÂ6ÆÆVB6VÆV7F–öä'&–FvRç6WB‡&VæFW&–ær&W7F÷&VBvVöÖWG'’’ÂF†Vâ6Æ7VÆFVBW‡G'W6–öâæB&VæFW&VBv–ââ6öçG&öÆÆW"æ÷rVWVW2&Wf–Wrf6R”G2Æö6ÆÇ’VçF–Â6Æ7VÆF–öâf–æ—6†W2æB6ÆÇ2F†B4ÔRÖ–â6VÆV7F–öâ'&–FvRFòV&Æ—6‚÷&VæFW"öæ6Râ–ç6WB6öçF–çVW2÷&–v–æÂ&VæFW"Fƒ²'&–FvR&VgW6Âöæöâ×&VæFW&–ærÆVv7’&WGW&âfÆÇ2&6²Fò÷&–v–æÂ6vR&VæFW"â&Vv–âöf–æ—6‚÷–6²÷6æ–ær÷F‡&W6†öÆB÷F÷öÆöw’õF‡&÷Vv‚ö¶W&æVÂö†—7F÷'’÷væW'2&VÖ–âVæ6†ævVBâæVvF—fRÖ7WBö&Æö6¶VB6VÆV7F–öç2&WF–âF†V—"÷&–v–æÂ”G3²æòæWr&VæFW&W"Â6–ÆVçBÖ–âö'&–FvR’6†ævR÷"WfVçB6öç7VÖW"âãBòãR–ç7V7F÷"6÷W&6W2æB&÷FV7FVB×VÇF’G&ç6f÷&ÒVæ6†ævVBà ¤V–v‡BæWr&öGV7F–öâÖ÷væW"6†V6·2W6R7GVÂF—&V7B6öçG&öÆÆW"æB7GVÂÖ–â6VÆV7F–öâ'&–FvS¢6–ævÆRö6öææV7FVB÷6—F—fRæB6Æ÷6VBÖæVvF—fR&Wf–WrÂ&WVBWFFW2Â6æ6VÂÂW†7Bf–æÂÖW6‚÷6VÆV7F–öâÂöæR†—7F÷'’VçG'’æBVæFòõ&VFò&—G“²fÆÆ&6²&VæFW#²Æö÷¶W’&—G’7&÷72ÖW6‚VF—G2æBVæ6†ævVB6öÖÖ—BöÆ—7FVæW"F–Ââg&÷¦VâW†7BãR6÷W&6W2VæFW"FW7G2öf—‡GW&W2÷W&f÷&Öæ6Râ&W&öGV6–&ÆR67&—G2ö&Væ6†Ö&²ÖFVç6RÖVF—BÓbæÖ§266WG2÷F–öæÂÄô4ÂÖöFVÃ²&W÷'BFö72÷W&f÷&Öæ6RÖFVç6RÖVF—BÓbæ§6öâ6öçF–ç2öæÇ’vw&VvFW2â7–çF†WF–3#BÖf6R&æB&Wf–WrÖVF–ãsãS>(i#3bãC6×27&÷73R–çFW&ÆVfVB6×ÆW3²7WÆ–VC#Öf6R&æBöæR—&VB6×ÆS#cBã3>(i#cBãƒF×3²6ö×ÆWFVB&Wf–Wr66VæR&V'V–ÆG3.(i#v—F‚W†7Bf–æÂ&VæFW&VB6æ6†÷G2âGvò&Wf–Wrv&×W3²6÷W&6R6ÆöæR÷6WGWæB–æ—F–ÂG&rÖ&Vv–â&VæFW"W†6ÇVFVBâÖV7W&VB&VæFW"v÷&¶ÆöB–æ6ÇVFW2&öG’G&–æwVÆF–öâÂ6vR÷–6¶W'2æB×VÇF’6fRö†—7F÷'’ö'6W'fW#²÷F†W"66VæR†öö·2Â–æfW&Væ6R–6¶–ær„W†7B7–çF†WF–2ö–çFW"’Â'&÷w6W"ôuRöæF—fR•BW†6ÇVFVBâæöFRÖV7W&VÖVçG26öæf—&Ò5Rv7FRÂæ÷BuRGG&–'WF–öâ÷"â•B7VVGWâ&VÖ–æ–æwãcV×25R6÷W&6R&Wf–Wr6÷7B—2ÖFW&–Ã²Fòæ÷BFV6Æ&RFVç6RVF—F–ærgVÆÇ’6öÇfVB÷"–æfW"t4Òö66—G’v–ç2à ¥&VÆV6Rãb6†VÆÂÖ&¶W'2ÂÆö÷6öÖÖ—Bôf6RF—&V7BÖöGVÆR–ç2æB6æöæ–6Â&VÆV6R×fW'6–öâ&VçB6†–âWFFVC²Ö–âæ§2æB66WFVBÖöFVÆÆ–ærö6ÆVçW÷–6¶–ærövW7GW&R6÷W&6W2Væ6†ævVBâfö7W6VCCóCÂf–æÂFVç6Rö6öÖÖ—CbóbæBgVÆÂÆö6Â7V—FS2Ã#s"ó2Ã#s"73²v—BF–fbÒÖ6†V6²6ÆVââV&Æ–6F–öâfW&–f–VC¢'VçF–ÖR6öÖÖ—FC3VFCfCf3Sf#sF66CcƒƒVSv3ƒ“fSF&cV##vS†ÂW†7BFW7FVBG&VS“S66#f##ƒsC3–SSC3“v#S#“CVC††&2âvW3C#Ss#ƒ##s3b7V66VVFVC²66†RÖ'W7FVBÆ—fRfW'6–öâæ§6öâö–æFW‚æ‡FÖÂôÆö÷6öÖÖ—Bôf6RF—&V7BöG&vW"öf6Rv÷&¶fÆ÷rÆÂ'—FRÖÖF6‚FW7FVB6÷W&6Râ†÷7FVBF÷öÆöw“C#Ss#ƒ#3CBv27F–ÆÂ'Vææ–ærBF†—2&ööc²Æö6Ã2Ã#s"ó2Ã#s"æBfö7W6VCCóC72Âæò†÷7FVB526Æ–ÖVB–WBâæF—fRãbW&f÷&Öæ6R66WFæ6R&VÖ–ç2VæF–æs²&VÖ–æ–ær&Wf–Wr5R6÷7B—2æ÷B6Æ÷6VB'’F†W6R6÷W&6RÖV7W&VÖVçG2âæF—fRãbVæF–ærâFWf–6S¢7WÆ–VBÖöFVÎ(i$Æö÷7WB&WVFVFÇ’Â6Æ–FRôU„5BæBæf–vFRv—F‚6WGF–æw2÷Vã²f6R&æN(i$W‡G'VFR÷WGv&BæB–çv&N(i$FöæS²6æ6VÂ&W7F÷&W2ÂVæFòõ&VFò&W7F÷&W2W†7FÇ“²6öæf—&Ò6öæ6fR6VÆV7F–öç2õVB6ÆVâæB–çB÷6fRf–ÆVæÖR&VÖ–ââ–b&Wf–Wr&VÖ–ç26Æ÷rÂ&öf–ÆR&VÖ–æ–ær66VæRö6vRö–æfW&Væ6Rv÷&²&F†W"F†â&VÖ÷fRÆ—7FVæW'2÷"77VÖRuRõt4Ò6W6Æ—G’à ¢ÒÒÐ ¢2ãb&÷FV7FVB53²6öæ6fRÖ6÷&æW"W‡G'W6–öâFVfV7B÷Vâ(	B’æ÷fVÖ&W"##` ¥W6W"6öæf—&×2ãb53²&÷FV7BÆö÷Ö7WBæf–vF–öâ÷VæF–ær&Vg&W6‚æBöæR×V&Æ—6‚f6R&Wf–Ww2Â6VÆV7F–öâô6æ6VÂõVæFõ&VFòv—F‚&–÷"56W2âF†—2FöW2æ÷B66WB6öæ6fRÖ6÷&æW"W‡G'W6–öâvVöÖWG'’âæWr67&VVç6†÷G26†÷r3‚Öf6R6öææV7FVB7G&—w&–ærâÂ×6†VB7FW¢gW'F†W"W‡G'W6–öâF—7Æ—2&VçB÷fW&Æ–ærö&6²Öf6–ær6–FRvÆÇ2BF†R–ç6–FR6÷&æW"â67&VVç6†÷G2&VÖ–â&—fFS²W†7BæWrÖW6‚÷6VÆV7F–öâæ÷B7WÆ–VBÂ6ò–çFW'6V7F–öâ÷v–æF–ær6W6R—2æ÷B–WB&W&öGV6VBà ¥6÷W&6RVF—C¢×VÇF’Öf6RÖF—&V7BW‡G'VFT6öææV7FVDf6U6VÆV7F–öâfW&vW2–æ6–FVçB6VÆV7FVBÖf6Ræ÷&ÖÇ2v—F‚Ö—FW"66Æ–ærÂF†Vâ&Æ–æFÇ’VÖ—G2öæRVBW"&Vv–öâ&÷VæF'’VFvRâ—B†2æò÷6—F—fRÖW‡G'W6–öâ6–FR×vÆÂ–çFW'6V7F–öâö6öÆÆ6R6†V6²â6Æ÷6VBÖVFvRF÷öÆöw’vFW2ÆöæRFòæ÷B&÷fRvVöÖWG&–2æöâÖ–çFW'6V7F–öââÆ–¶VÇ’f–ÇW&R—2föÆFVBö–çFW'6V7F–ær–ç6–FRÖ6÷&æW"öfg6WB2W‡G'W6–öâW†6VVG2Æö6Â6ÖÆÂÖf6R76–æs²6öæf—&Òv—F‚6VvÖVçFVBÂ×7FWf—‡GW&R&Vf÷&R6öF–ærâFòæ÷BÖW&VÇ’fÆ—æ÷&ÖÇ2ÂVæ&ÆRGvò×6–FVBÖFW&–ÂÂFVÆWFR&&—G&'’f6W2÷"W6RVB6ÆVâ27V'7F—GWFRà ¤æW‡BF÷öÆöw’f—‚6†÷VÆB&VÖ–â–âF†—2WF†÷&—FF—fR÷væW#¢&W&öGV6R&öw&W76—fR6÷&æW"W‡G'W6–öã²FWFV7B6–FR×vÆÂ6öÆÆ6Rö–çFW'6V7F–öç3²–×ÆVÖVçBfÆ–B6÷&æW"Öv&RG&–Ò÷&V6öç7G'V7F–öâv†W&R7W÷'FVBæBG&ç67F–öæÂ&VgW6ÂöÆ7B×fÆ–B&Wf–Wrv†W&Ræ÷Bâ&W6W'fRf6Rv–æF–ærÂ&÷VæF'’÷væW'6†—ÂÆ&VÇ2ö7&V6W2õUbVÆ–v–&–Æ—G’Â6öææV7FVB6VÆV7F–öâÂW†7BF—7Fæ6R÷&VF&6²Â†—7F÷'’æBãb5R&W—'2âvVæW&ÂÆ&vRöfg6WG2Ö’æVVBF÷öÆöw’6†ævW2÷"6fRÆ–Ö—G3²æò&Ææ¶WBWFò×&W—"&öÖ—6Râæò'VçF–ÖR6†ævRöæWr'V–ÆB–âF†—266WFæ6RöVF—B&V6÷&Bâ7W'&VçBãb—2V&Æ—6†VC²æòæWr†æG2ÖöâFW7BVçF–Â6öæ7&WFR6÷&æW"&W—"'V–ÆBà ¢ÒÒÐ ¢2ãr(	BÆæ"6öæ6fRÖ&æBW‡G'W6–öâ&W—"(	B’æ÷fVÖ&W"##` ¥W6W"WF†÷&—¦W2öæW‡F'V–ÆBæBö'6W'fW2fÆ–B&Wf–Ww2fVVÂÖ÷&R&W7öç6—fS²F†—2—2æ÷B&ööb'&ö¶VâvVöÖWG'’6W6VBF†RÆrâãb52&VÖ–ç2&÷FV7FVBâvVæW&FVB6VvÖVçFVBÂ×&—6Òf—‡GW&R&W&öGV6W2F†R67&VVç6†÷B6Æ73¢öÆB6öææV7FVBÖ—FW"÷WGWB&VÖ–ç2F÷öÆöv–6ÆÇ’6Æ÷6VBv†–ÆR6VÆV7FVBf6W2&WfW'6RæB6–FR×vÆÂG&–ævÆW2÷fW&ÆBÆ&vRöfg6WBâW†7B†÷Föw&†VBÖW6‚v2æ÷B7WÆ–VC²æòæF—fRãr66WFæ6R–WBà ¤÷&–v–æÂ×VÇF’Öf6RÖF—&V7B&VÖ–ç2F†RW‡G'W6–öâ÷væW"â—Bæ÷r7FvW2ÆÂ&Vv–öâ÷6—F–öç2ö–æF–6W2&Vf÷&R×WFF–öâæB6ÆÇ2öæRW&R6÷&æW"×vÆÂÆææW"â66÷VB7W÷'C¢÷6—F—fRÂöæR×VB×v–FR6Æ÷6VB&æG2&÷VæFVB'’Gvò&ÆÆVÂ6W&FVBÆæ"Æö÷2Âv—F‚W'VæF–7VÆ"7&÷72Ö&æBÆ–æ·2æB6öæ6fR&öf–ÆRâ7G&–v‡B&÷VæF'’'Vç2&R&W&ÖWFW&—¦VB&WGvVVâF†V—"W†—7F–ærÖ—FW"Ö6÷&æW"æ6†÷'2Â¶VW–ær6VÆV7FVB6f6W2÷&FW&VB2F†Röfg6WBW†6VVG26ÖÆÂÖf6R76–ærâF†RGvòÆæ"6–FRvÆÇ2&R&V'V–ÇB2öÇ–vöâ×v—F‚Ö†öÆRE$”ätÄU2W6–ærW†—7F–ærF‡&VR6†UWF–Ç2G&–æwVÆF–öââ÷&–v–æÂ6f6R”G2æBÆ&VÇ2Â7&V6RÖÂ6÷&æW"÷6—F–öç2Â6VÆV7F–öâö6öÖÖ—Bö†—7F÷'’÷væW'2æBãb6–ævÆR×&Wf–WrV&Æ—6‚7F’–çF7Bâ6öçfW‚ö÷&F–æ'’6VÆV7F–öç2&WF–âW†7BÆVv7’vVöÖWG'“²6–ævÆRÔf6Rô–ç6WBö6Æ÷6VBÖæVvF—fRF‡&÷Vv‚æBVç7W÷'FVBæöçÆæ"÷v–FRÖ&æBÆ–÷WG2&WF–âF†V—"W†—7F–ærF‡2âF†—2—266÷VB&W—"Âæ÷BvÆö&Âöfg6WBô&ööÆVâ6öÇfW"à ¥vÆÂÆææW"&W6W'fW2ÄÂ÷&–v–æÂæBöfg6WB&÷VæF'’6VvÖVçG2âG&–æwVÆFRæöâÖ6öÆÆ–æV"6÷&æW"&–æw2f—'7BÂ&VÖ÷fR¦W&òÖ&VÆææ–ærG&–ævÆW2ÂF†Vâ7Æ—B7ææ–ærVFvW2BF†R6ÖRW†—7F–ær6öçF÷W"fW'F–6W2&Vf÷&R6†V6¶–ærW†7BVFvR÷væW'6†—æB&Vâ&&RV&7WB÷fW"Æöær6öÆÆ–æV"&–æw2Â÷"F—66&F–ærFVvVæW&FR'&–FvRG&–ævÆW2v—F†÷WB6öæf÷&Ö–ærF†V—"7ææ–ærVFvW2Â&öGV6VBÖ—76–ærõBÖ§Væ7F–öâVFvW2BÆ–væVBöfg6WG2GW&–ærFWfVÆ÷ÖVçC²Fòæ÷B&WVBF†B6†÷'F7WBâwV&G2&WV—&R6–×ÆRæW7FVB6öçF÷W'2v—F‚æò7&÷72×&–ær–çFW'6V7F–öç2Â÷6—F—fR6VÆV7FVBÔf6RG&–ævÆR&V2Âæöç¦W&ò6öç6—7FVçFÇ’v÷VæBvÆÂG&–ævÆW2ÂW‡V7FVBæçVÇW2&VæB&÷VæF'’ö–çFW&æÂVFvR6÷VçG3ó"â7W÷'FVBöfg6WG2F†B6öÆÆ6Rö÷fW&Æ÷&VgW6RfÆ–B&÷VæF'’&V6öç7G'V7F–öâ&WGW&âf—6–&ÆR&Æö6¶VB&V6öâ&Vf÷&RÖöFVÂ×WFF–öã²æò†—7F÷'’VçG'’÷"fÇ6R6öÖÖ—BâG&vv–ær&6²FòfÆ–BF—7Fæ6R&V6÷fW'2âvVæW&Â&VÖ÷FR6öÆÆ—6–öç2öæöçÆæ"&æG2&Ræ÷B6öÇfVB'’F†—2'V–ÆBà ¥GvVÇfR–æFWVæFVçBæWr66W26÷fW"öÆBÖf–ÇW&R&W&öGV7F–öã²6–væVB6&V3²—'v—6RvÆÂ×G&–ævÆR÷fW&Æf––æFWVæFVçB6Æ—–æs²F—&V7FVBÖæ–föÆBVFvW3²öfg6WG2ã"òãòã#RòãBòãbóó#²66ÆVB÷&÷FFVB7G&—3²æ'&÷rRÖæ÷F6‚6Æ÷7W&R&VgW6Ã²&WVB&Wf–Wrô6æ6VÂ÷6VÆV7F–öâöÆ&VÇ2ö7&V6W2æB6öÖÖ—BõVæFõ&VFòâãb&öGV7F–öâÖ–â×6VÆV7F–öâÖ'&–FvRFW7G27F–ÆÂ&÷fRöæR66VæR&V'V–ÆBW"&Wf–WræBÆVv7’6öçfW‚vVöÖWG'’&—G’âW†—7F–ær6–FRÖf6RVæFVf–æVBÆ&VÇ2æ÷&ÖÆ—¦RFòçVÆÂF‡&÷Vv‚†—7F÷'’æ6ÆöæR2&Vf÷&S²VffV7F—fRÖÆ&VÂ6†V6·2&W7V7BF†B6öçG&7BâæòÖöFVÆÆ–ærõVB6ÆVâövW7GW&R¶W&æVÂÂuRÖFW&–ÂÂGvò×6–FVBÖ6¶–ær÷"&÷FV7FVB×VÇF’G&ç6f÷&Ò6†ævRà ¥&W&öGV6–&ÆR67&—G2ö&Væ6†Ö&²Ö6÷&æW"ÖW‡G'W6–öâÓræÖ§2w&—FW2Fö72÷W&f÷&Öæ6RÖ6÷&æW"ÖW‡G'W6–öâÓræ§6öã¢&W—&VB÷væW"öæÇ’Ã"v&×W2ó6×ÆW3³#óCó#6VÆV7FVBf6W2ÖVF–ã"ã3“’ó2ãS’ó’ã†×2–âæöFRâ–æ6ÇVFW2g&W6‚ÆææW"æBf–æÂVFvRVçVÖW&F–öâÂW†6ÇVFW26ÆöæR÷6WGW÷&VæFW"ö6vRö†—7F÷'’ö–æfW&Væ6Rö'&÷w6W"ôuRö•Bâ–çfÆ–BöÆBvVöÖWG'’—2æ÷B7VVGW&6VÆ–æS²æò6W6ÂÆrf—‚÷"66—G’6Æ–ÒâvÆÇ2Ö’†fRÖ÷&Rf6W2&V6W6RG&–ævÆW2&WÆ6RF†R÷fW&Æ–ærVG2â&W6W'fR&–÷"Æö÷VæF–ær×&VFW"æBöæR×V&Æ—6‚÷F–Ö—¦F–öç2à ¥&VÆV6Rãr6†VÆÂÖ&¶W'2Âf6RF—&V7BöæWrÆææW"6†–ÆB¶W’æB6æöæ–6Â&VÆV6R×fW'6–öâÆöFW"6†–âWFFVBâVæ6†ævVBÆö÷6öÖÖ—B&WF–ç2ãb–ã²æò&6VÆ–æR–â6ÆVçWâfö7W6VCC’óC’æBf–æÂgVÆÂÆö6Â7V—FS2Ã#ƒBó2Ã#ƒB53²Ö—†VB×&Vv–öâ–çfÆ–BÖöfg6WB&VgW6ÂÇ6ò6†V6¶VBFöÖ–6ÆÇ“²v—BF–fbÒÖ6†V6²6ÆVââV&Æ–6F–öâfW&–f–VC¢'VçF–ÖSƒ#†c6#SS“FfC33†S#3cSƒ###fF3f#S“bÂG&VS#cvFSFF3†&Vf6VS&&#6#cƒS3s–#3ƒ#V663Vƒc²vW3C#S“3Sss3CR5T44U52âg&W6‚Æ—fRfW'6–öâæ§6öâö–æFW‚æ‡FÖÂôf6RF—&V7Bö6÷&æW"ÆææW"öG&vW"öf6Rv÷&¶fÆ÷rÆÂ'—FRÖÖF6‚FW7FVB6÷W&6Râ†÷7FVBF÷öÆöw“C#S“3Ssƒ3s7F–ÆÂ'Vææ–ærB&ööc²Æö6Ã2Ã#ƒ’ó2Ã#ƒ’52âæF—fRã‚66WFæ6RVæF–ærâ–æ—F–ÂfÆ–FF–öâ6Vv‡Bâ66–FVçFÂVæ6†ævVBÆö÷–âGfæ6S²&W7F÷&VBãbæB&R×&â&Wf–WvVB6öçG&7G2v—F†÷WB6†æv–ærÆö÷6÷W&6R÷"&÷FV7F–öç2âæW‡BæF—fS¢&V7&VFR6VÆV7FVBÂ×7FW7G&—ÂVÆÂf'F†W"F†â&Wf–÷W2f–Æ–ærF—7Fæ6RÂ–ç7V7B&÷F‚–ç6–FR6÷&æW'3²6æ6VÂÂFöæRõVæFõ&VFòæB÷&F–æ'’6öçfW‚W‡G'W6–öââ&WVW7B6÷W&6R&ö¦V7BöæÇ’–bF†—266÷VBf—‡GW&RFöW2æ÷BÖF6‚F†RæF—fR&W7VÇBà ¢ÒÒÐ ¢222ãr&VgW6ÂÖÖW76vRV&Æ–6F–öâ6÷'&V7F–öà ¤f–æÂT’&Wf–Wrf÷VæBÖ–â÷FööÂ&Vg&W6‚6÷VÆB÷fW'w&—FR&Æö6¶VBÖ6÷&æW"W‡ÆæF–öââF†RW†—7F–ær7FGW2÷væW"æ÷r&W6W'fW2F†R&VgW6Âv†–ÆRG&vv–æs²fÆ–BÖ÷F–öâ6ÆV'2—BâF—&V7BÖöGVÆR66†R¶W’—2ãrã†&VÆV6R&VÖ–ç2ãr’â–æ—F–ÂvVöÖWG'’'VçF–ÖRfS3s6ƒvS6CcvS“Sƒ#ffFFCv&Cc“sBæBvW3C#Sƒƒs#ss27V66VVFVBv—F‚ÆÂ6—‚Æ—fR6†VÆÂövVöÖWG'’76WG2ÖF6†–ærâ6÷'&V7FVBgVÆÂfÆ–FF–öâæBV&Æ–6F–öâ&ööbföÆÆ÷rà ¤6÷'&V7FVBfö7W6VCSóSæBgVÆÃ2Ã#ƒRó2Ã#ƒR53²v—BF–fbÒÖ6†V6²6ÆVââ6÷'&V7FVBãrãF—&V7BÖÖöGVÆRV&Æ–6F–öâVæF–ærfW&–f–6F–öâà ¤f–æÂ6÷'&V7FVBV&Æ–6F–öâfW&–f–VC¢vVöÖWG'’'VçF–ÖVfS3s6ƒvS6CcvS“Sƒ#ffFFCv&Cc“sB†B†÷7FVBF÷öÆöw“C#Sƒƒs3#’5T44U52ƒ2Ã#ƒBó2Ã#ƒB’âT’6÷'&V7F–öâ'VçF–ÖVfƒ3&F3S&c–33S–&S“#ƒ#&†SVS“#&VbÂFW7FVBG&VScCv&f#6Cs3&#v#–3333ƒFSfƒCƒƒS–C²6÷'&V7FVBÆö6ÂgVÆÃ2Ã#ƒRó2Ã#ƒRæBfö7W6VCSóS52â6÷'&V7FVBvW3C#Sƒ“3C“““‚7V66VVFVC²g&W6‚Æ—fRfW'6–öâæ§6öâö–æFW‚æ‡FÖÂôf6RF—&V7B‚ãrã’ö6÷&æW"ÆææW"öG&vW"öf6Rv÷&¶fÆ÷rÆÂ'—FRÖÖF6‚FW7FVB6÷W&6Râ6÷'&V7FVB†÷7FVBF÷öÆöw“C#Sƒ“3SS3’v27F–ÆÂ'Vææ–ærB&ööbÂ6òæò&W7VÇB6Æ–ÖVBf÷"F†B'VââæF—fRãr6÷&æW"66WFæ6R&VÖ–ç2VæF–æs²æòÖV7W&VB6W6ÂÆr6Æ–Òà ¢2ã‚(	B6ÆVâVB6÷&æW"vÆÇ3²ãrW6W"d”Â(	B’æ÷fVÖ&W"##` ¥W6W"&W÷'G2Ô54•dRd”Âöâãs¢v†öÆR×vÆÂG&–ævÆRfç2&Ræ÷B66WF&ÆR6ÆVâvVöÖWG'’âãr—2äõB&÷FV7FVB52FW7—FRvVöÖWG&–2fÆ–F—G’FW7G2âW6W"w27FæF–ær4ÄTâ&WV—&VÖVçBf÷"ÄÂFööÇ3¢W6RF†RÆV7BæV6W76'’fW'F–6W2öVFvW2÷VG2÷G&—2ôf6W2Fò&W&W6VçBF†R–çFVæFVB&W7VÇBÂ&W6W'f–ærW'÷6VgVÂ–çWB&÷VæF&–W2æB&WV—&VBGG&–'WFW2âfÆ–F—G’ÆöæR—2–ç7Vff–6–VçC²F÷öÆöw’6÷VçB'VFvWG2æB7GVÂv—&Vg&ÖR&Wf–Wr&R66WFæ6RvFW2âFòæ÷B†–FRF–vöæÇ2ÂGW&âfâ–çFò†–v‚×6–FVBf6RÂ÷"G&–æwVÆFRâVçF—&RF6‚ÖW&VÇ’Fò72Öæ–föÆB6†V6·2â&–÷"ãbæBV&Æ–W"56W2&VÖ–â&÷FV7FVBà ¤VF—B6†÷w2ãrw27G&–v‡B×'VâöÖ—FW"×÷6—F–öâ6÷'&V7F–öâ6öÇfW2F†RföÆC²v†öÆR×vÆÂV&7WBö6öæf÷&Öæ6Rv2VææV6W76'’âã‚&VÖ÷fW2F†BG&–æwVÆF–öâF‚æB&W7F÷&W2F†R÷&–v–æÂöæR×FòÖöæR&÷VæF'’ÖVFvRVB6öææV7F—f—G’W6–ærF†R6÷'&V7FVB÷6—F–öç2âæòæWrvÆÂfW'F–6W2â&VÂÖW6‚f6W2&RVG2Âæ÷BF—7Æ’Ö†–FFVâG&–ævÆW2âg&W6‚6†V6·2&WV—&R7G&–7BVB6öçfW†—G’÷÷6—F—fRv–æF–ærÂW†7B&÷VæF'’ö–çFW&æÂVFvR÷væW'6†—æBæçVÇW2&V²W†—7F–ær6–×ÆRöæW7FVB6öçF÷W"ö6Ö÷&FW"6†V6·2&VÖ–ââVç7W÷'FVBöfg6WG2&R&VgW6VBG&ç67F–öæÆÇ’ÂæWfW"6–ÆVçFÇ’&R×G&–æwVÆFVBâW†—7F–ær66÷VB7W÷'B‡÷6—F—fRÆæ"öæR×VB×v–FR6öæ6fR6Æ÷6VB&æG2’&VÖ–ç3²æòvVæW&Â4Böfg6WBö6öÆÆ—6–öâ6öÇfW"÷"vÆö&Â6–×Æ–f–6F–öâöbVç6VÆV7FVBvVöÖWG'’—26Æ–ÖVBà ¤Ö–æ–×VÒÖ6÷VçB6öçG&7C¢V6‚æçVÆ"vÆÂ†3$âf—†VB&÷VæF'’fW'F–6W2ó$â&÷VæF'’VFvW2æBæò–çFW&–÷"fW'F–6W2âf÷"VG2÷G&—2ÂWVÆW"–×Æ–W3%µCÓ$âæBµCãÔââF†RÆÂ×VB7G&—GF–ç4âf6W2W"vÆÂÂF†RÆ÷vW"&÷VæBVæFW"F†÷6R6öç7G&–çG2âW†—7F–ær7WG2&VÖ–âÖVæ–ævgVÂ–ç7FVBöb&V–ærF—76öÇfVBvÆö&ÆÇ’âW†7BöÆBöæWrfW'FW‚6ö÷&F–æFW2æB÷&–v–æÂf6W2ÖF6ƒ²V6‚vÆÂVBW6W2F†R÷&–v–æÂ&÷VæF'’6VvÖVçBæB—G26÷'&W7öæF–æröfg6WB6VvÖVçBâf÷W"æWr66W276W'B&VÂF÷öÆöw’Â¦W&òvVæW&FVBvÆÂG&–ævÆW2ÂÖ–æ–×VÒvÆÂ6÷VçBÂæòW‡G&vÆÂfW'F–6W2ö÷'†ç2æB&VÖ÷fÂöbW†7FÇ“$âfâF–vöæÇ2âvVöÖWG'’ö6æ6VÂö†—7F÷'’÷&VgW6Â6†V6·2g&öÒãræBãbw2öæR×V&Æ—6‚ôÆö÷W&f÷&Öæ6R6†V6·2&VÖ–â7F—fS²76–ærF†÷6RöÆBFW7G2—2æ÷B66WFæ6Röbãrw2f–ÆVB÷WGWBà ¥&W&öGV6–&ÆR67&—G2ö&Væ6†Ö&²Ö6ÆVâÖ6÷&æW"Ó‚æÖ§2w&—FW2Fö72÷W&f÷&Öæ6RÖ6ÆVâÖ6÷&æW"Ó‚æ§6öâÂW6–ærg&÷¦VâW†7BãrÆææW"f÷"6ö×&—6öâã#óCó#6VÆV7FVBf6W3¢vVæW&FVBvÆÂf6W3ƒ(i#Cóc(i#ƒóCƒ(i##C²F÷FÂVFvW3#“N(i##SBóS“N(i#SBós“N(i#SSC²F÷FÂfW'F–6W3#ó#Cós#Væ6†ævVBâvÆÂG&–ævÆW3ÂÆÂvVæW&FVBvÆÂf6W2VG2âF–Ö–æw2&R7–çF†WF–2æöFR÷væW"6÷7G2W†6ÇVF–ær&VæFW"ö†—7F÷'’ö'&÷w6W"ôuRö•BÂæ÷BæF—fR7VVGW6Æ–Òâ6–FRÖ'’×6–FR7–çF†WF–2v—&Vg&ÖR–ç7V7FVBÆö6ÆÇ“¢f–ÆVBÆöærG&–ævÆRfç2fW'7W2&÷VæF'’ÖÖF6†VBVBvÆÂ7G&—3²6÷W&6R6G&–æwVÆF–öâ–âF†RvVæW&–2f—‡GW&R—2&RÖW†—7F–æræBVæ6†ævVBâæòW6W"ÖöFVÂ÷67&VVç6†÷B6öÖÖ—GFVBà ¤WF†÷&—FF—fR6öææV7FVBÖW‡G'W6–öâ÷væW"Â6Æ&VÇ2ö7&V6W2Â6VÆV7F–öâÂ6æ6VÂõVæFõ&VFòÂ7W÷'FVBÖ6öÆÆ6R&VgW6Â÷7FGW2æB6÷W&6RöÖWFFFVÆ–v–&–Æ—G’7F’–çF7BâæòvÆö&ÂVB6ÆVâÂÖW6‚÷–6¶–ær¶W&æVÂÂÖFW&–ÂÖ6¶–ærÂvW7GW&RöÆ—7FVæW"÷"&÷FV7FVB×VÇF’G&ç6f÷&Ò6†ævRâÆÂ'VçF–ÖRö66†RÖ&¶W'2ãƒ²Væ6†ævVBÆö÷6öÖÖ—Bãb&WF–æVBâfö7W6VCSBóSBÂvVöÖWG'’ö6÷VçC#Ró#RæBgVÆÂÆö6Â7V—FS2Ã#ƒ’ó2Ã#ƒ’53²v—BF–fbÒÖ6†V6²6ÆVââV&Æ–6F–öâfW&–f–VC¢'VçF–ÖS3ƒ#ƒ&3†3VCVSC“vcƒ#fS&S“ƒff3“6C2ÂW†7BFW7FVBG&VVS“3cS6CC–SCCC6vS“Sv33v3#S#S33–VF3²vW3C#S“SCCC“r5T44U52âg&W6‚Æ—fRfW'6–öâæ§6öâö–æFW‚æ‡FÖÂôf6RF—&V7Bö6÷&æW"ÆææW"öG&vW"öf6Rv÷&¶fÆ÷r÷6†VÆÂ6ö×&—6öâÆÂ'—FRÖÖF6‚6÷W&6Râ†÷7FVBF÷öÆöw“C#S“SCCCc"7F–ÆÂ'Vææ–ærB&ööc²Æö6Ã2Ã#“2ó2Ã#“252â6öææV7FVBvVöÖWG'’æB6ö×ÆWFRWfVçBö6öÖÖ—Bö†—7F÷'’F–Â&R'—FRÖ–FVçF–6ÂFò&÷FV7FVBã‚âæW‡BæF—fS¢&WVBF†R6ÖR6÷&æW"W‡G'W6–öâæB–ç7V7B7GVÂvÆÂv—&Vg&ÖS²VÆÂ7B&Wf–÷W2f–ÇW&RF—7Fæ6S²6æ6VÂæBFöæRõVæFõ&VFó²6öæf—&Ò÷&F–æ'’6öçfW‚W‡G'W6–öâæBÆö÷æf–vF–öââ6ÆVâvVöÖWG'’—2&WV—&VB÷WF6öÖRÂæ÷Bâ÷F–öæÂföÆÆ÷r×WFööÂà ¢ÒÒÐ ¢2ã’(	Bf6R–æfW&Væ6R&ö¦V7F–öâ&WW6S²ã‚&÷FV7FVB52(	B’æ÷fVÖ&W"##` ¥W6W"6öæf—&×2(	ÅU$dT5B52(	Òf÷"ã‚æB&WVW7G2öæW‡F'V–ÆBâ&÷FV7B—G26ÆVâ6÷&æW"×vÆÂVG2ÂæòW‡G&vÆÂfW'F–6W2öfâF–vöæÇ2Âv–æF–ærö6öÆÆ6R&VgW6ÂÂ6æ6VÂôFöæRõVæFõ&VFòæBãböæR×V&Æ—6‚ôÆö÷f—†W2âãr&VÖ–ç2d”Ââã‚†÷7FVBF÷öÆöw“C#S“3Ssƒ3sæBvW3C#S“3Sss3CR&÷F‚7V66VVFVC²æF—fRã‚66WFæ6R—2æòÆöævW"VæF–ærâvÆö&Â4ÄTâ6öçG&7B&VÖ–ç2Ö–æ–×VÒæV6W76'’F÷öÆöw’v†–ÆR&W6W'f–ærW'÷6VgVÂ–çWB&÷VæF&–W2öGG&–'WFW2à ¤VF—B7W'&VçBÖ–ãS#6Fv#b÷&VÆV6S‚æBÆ—fSƒ¢÷&–v–æÂ×VÇF’Öf6RÖF—&V7B&VfW&Væ6UVæFW%ö–çFW"&ö¦V7G2Vç6VÆV7FVBfW'F–6W2öæ6RÂF†Vâ&W&ö¦V7G2&÷F‚VæGö–çG2f÷"WfW'’VÆ–v–&ÆRVFvRÂ6ÆÆ–ærvWD&÷VæF–æt6Æ–VçE&V7BV6‚F–ÖRâã’&WW6W2öæRg&W6‚f–Ww÷'B&V7FævÆRæBâ–çfö6F–öâÖÆö6ÂçVÖW&–2Ö–æFW‚&ö¦V7F–öâ'&’â6ÖR67&VVåö–çBÖF‡2ÂfW'FW‚öVFvRöf6R&–÷&—G’Â&F–’Â÷&–v–æÂG&fW'6Â÷F–R÷&FW"Â6VÆV7FVBÖ6ö×öæVçBW†6ÇW6–öâÂVFvRVçVÖW&F–öâæBf6R&–67G2âf6RfÆÆ&6²&WF–ç2—G2÷&–v–æÂ6WEö–çFW"ö&÷VæG2&VBâæò&WF–æVB66†RÂæWr–6¶W"ö¶W&æVÂÂF÷öÆöw’6†ævRÂ&VÖ÷fVBÆ—7FVæW"÷"66†VGVÆ–ær6†ævRâ–æfW&Væ6RôdbæBçVÖW&–2W†7B7F–ÆÂ'—72F†R6V&6‚VçF—&VÇ’â66WFVB6÷&æW"ÆææW"6÷W&6RæBã‚6†–ÆB–â&VÖ–â'—FRÖ–FVçF–6Ã²&÷FV7FVB×VÇF’G&ç6f÷&Óã3bãã&VÖ–ç2Væ6†ævVBà ¤f÷W"&öGV7F–öâÖ÷væW"&Vw&W76–öâ66W26ö×&RW†7Bã‚–æfW&Væ6RgVæ7F–öç2v–ç7B7W'&VçB&W7VÇG2f÷"fW'FW‚ôVFvRôf6RöÖ—76W2æB'&öB67&VVâ6×ÆW3²6ÖW&÷&W6—¦RöÖW6‚÷6VÆV7F–öâ6†ævW3²F—6&ÆVBôW†7B'—73²Væ6†ævVBÖöFVÂö†—7F÷'“²æB÷W&F–öâ6÷VçG2âFW7G2öf—‡GW&W2÷W&f÷&Öæ6Röf6RÖ–æfW&Væ6RÓ‚æ§2g&VW¦W2öæÇ’F†RW†7BGvòöÆBgVæ7F–öç2Âæ÷B'VçF–ÖR–×ÆVÖVçFF–öââW†—7F–ær6ÆVâ×vÆÂövVöÖWG'’÷&VgW6Â÷6VÆV7F–öâö†—7F÷'’7V—FW2&VÖ–â7F—fRà ¥&W&öGV6RæöFR67&—G2ö&Væ6†Ö&²Öf6RÖ–æfW&Væ6RÓ’æÖ§3²&W÷'BFö72÷W&f÷&Öæ6RÖf6RÖ–æfW&Væ6RÓ’æ§6öââGvòv&×W2÷FVâÇFW&æF–ær—'2Â6ö×ÆWFR‡—6–6ÂVFvR×&VfW&Væ6R6V&6‚âSsbó#3Bó“#bÖf6Rw&–G3¢&÷VæG33#Róƒ’óCccS~(i#V6ƒ²&ö¦V7F–öç33#Róƒ’óCccS~(i#c#Ró#Có“C’âæöFRÖVF–ãã“#n(i#ãc“‚ó2ãsC^(i#"ã3bóbã3ƒž(i#ãC#×3²W†7B&VfW&Væ6R&W7VÇG2ÖF6‚â7GV"&V7FævÆRvWGFW"†2æò'&÷w6W"Æ–÷WB6÷7C²W†6ÇVFW2&VæFW&–ærö†—7F÷'’öWfVçBFVÆ—fW'’ôuRö•BâæòæF—fRW&f÷&Öæ6Rö66—G’÷"t4Ò7VVGW6Æ–ÒâfW'FW‚ÖöæÇ’†—G26fR&÷VæB&VG2'WBæ÷B&ö¦V7F–öâ6÷VçC²f6RfÆÆ&6²ÆÆö6F–öâ÷&–67BæB&VÖ–æ–ær&V'V–ÆB6÷7G2&RVæ6†ævVBà ¥fÆ–FF–öã¢fö7W6VCsBósBæBgVÆÂÆö6Â7V—FS2Ã#“2ó2Ã#“253²7–çF‚æBv—BF–fbÒÖ6†V6²6ÆVââ&VÆV6Rã’6†VÆÂöF—&V7BöG&vW"öf6R×v÷&¶fÆ÷rö6æöæ–6Â&VÆV6R×fW'6–öâÆöFW"–ç2&Wf–WvVC²Væ6†ævVBÆææW#‚æBÆö÷b&WF–æVBâV&Æ–6F–öâVæF–ærfW&–f–6F–öââæF—fRã’VæF–ærâFWf–6S¢vVöÖWG'’6æôâÂf6RW‡G'VFRô–ç6WBF÷v&BW†—7F–ærfW'F–6W2öVFvW2öf6W2öâÖç’Öf6RÖöFVÃ²÷&&—B÷&W6—¦RæB&WVC²vVöÖWG'’ôdbôW†7C²66WFVBÂÖ6÷&æW"6ÆVâvÆÇ3²6æ6VÂæBFöæRõVæFõ&VFòâæW‡B÷F–Ö—6F–öâõt4ÒFV6—6–öâ&WV—&W2ÖV7W&VB&VÖ–æ–ærv÷&³²&W6W'fR÷&–v–æÂ÷væW'2æB6ÆVâ×F÷öÆöw’6÷VçBvFW2à ¢2ã#(	BW†7B–çv&B7WGFW"7F'BÆæR&W—'2&÷F‚6÷&æW"66W2(	B’æ÷fVÖ&W"##` ¥W6W"&W÷'G2Gvòf–ÇW&W2öã’æBW‡Æ–6—FÇ’&WVW7G2&÷F‚f—†VC¢6öææV7FVB6÷&æW"Ö&æB–çv&BW‡G'W6–öâÂæB6–ævÆR6÷&æW"f6R&VgW6–ærF—&V7B–çv&BõD…$õTt‚v†–ÆR÷WGv&BÖf—'7B6âv÷&²âã‚6ÆVâ÷WGv&B6÷&æW"527F—2&÷FV7FVC²æò&Ææ¶WBã’52–æfW'&VBâ7W'&VçBÖ–ãvfSS#2÷&VÆV6S’æBÆ—fS’VF—FVC²ã’†÷7FVBF÷öÆöw“C#S“SCCCc"5T44U52â–ÖvW2&VÖ–â&—fFRâ7–çF†WF–26VvÖVçFVBÂ×&öf–ÆRf—‡GW&W2&W&öGV6R&÷F‚F—&V7B&VgW6Ç2Âæ÷BF†RW†7B†÷Föw&†VB66VæR÷"—G27V66W76gVÂ÷WGv&BÖf—'7B6WVVæ6Rà ¤6öæf—&ÖVB&ö÷B–âWF†÷&—FF—fR'V–ÆDæVvF—fTW‡G'VFR÷F‡&÷Vv‚Ö¶W&æVÃ¢7WGFW"7F'G2W2£3"õUE4”DRF†R6VÆV7FVB6÷W&6RÆæRâB6öæ6fR6÷&æW"ÆFW"7WGFW"&VÖ÷fW2æ'&÷r6Æ—fW"g&öÒâF¦ö–æ–ærvÆÂ÷WG6–FRF†R&W&W6VçFVB6öÆ–C²6Æ76–f–6F–öâ6ææ÷B7WÇ’F†BÖ—76–ærvÆÂæBfÆ–FF–öâ&V¦V7G2÷VâVFvW2âÖV7W&VBf–ÆVB&æB&÷VæF'’7ç2“(i#ãcS“c“c’Bƒ†W3"ãcSVRÓb’âf—‚7F'G2BF†RU„5B6÷W&6RÆæRâW†—7F–ær7Æ—BFöÆW&æ6W2Âf–æ—FRFWF‚õF‡&÷Vv‚F&vWG2Â6Æ—–ærÂ–ç6–FU6öÆ–BÂ6öç6W'fF—fR&÷VæF'’6öÆW66–ærÂ6æöæ–6Â6VÒ76VÖ&Ç’ÂÖWFFFæB7G&–7B6Æ÷6VB÷v–æF–ærö&÷r×F–RfÆ–FF–öâ&VÖ–ââæòfÆ–FF–öâ'—72Â&ööÆVâ&WÆ6VÖVçBÂæWrÖöFVÂ¶W&æVÂÂFFVBG&–æwVÆF–öâ÷"vÆö&Â6–×Æ–f–6F–öââ&÷F‚6öçG&öÆÆW"æB6WVVçF–ÂfÆÆ&6²–×÷'BF†R6ÖS#¶W&æVÃ²&Vg&W6‚fÆÆ&6²w2G&vW"&VçBFöòâã‚÷6—F—fR6÷&æW"ÆææW"÷6÷W&6R÷–âæBãbÆö÷6öÖÖ—B7F’Væ6†ævVBÂ2Fòã’–æfW&Væ6R&V†f–÷W"æB&÷FV7FVB×VÇF’G&ç6f÷&Óã3bããà ¥FVâæWrFW7G3¢×WFF–öâ&W7F÷&W2W†7FÇ’F†RöÆB7F'B×ÆæRW‡&W76–öâæB&W&öGV6W2$õD‚&VgW6Ç3²–çv&BFWF‡2ã"òãòã2òãC“²W†7BæÇ—F–2&VÖ÷fVBföÇVÖW3²F—&V7B6–ævÆRÔf6R&V6W72æBgVÆÂD…$õTtƒ²F—&V7FVBÖæ–föÆBöæò÷'†âfW'F–6W3²&öw&W76—fR&Wf–Ww2æB6æ6VÂôFöæRõVæFõ&VFòv—F‚öæRV&Æ—6‚ö6†V6·ö–çC²&÷FFVB÷66ÆVB&æC²6ÆVâ6÷VçB'VFvWG2âÆÂ×VBw&–FFVB6÷W&6R&æB÷&V6W72&W7VÇG33Bó3‚f6W2æB¤U$òG&–ævÆW3²æòv†öÆR×vÆÂfâ÷"W‡G&'F—F–öâw&–BâW†—7F–ær6öÆÆ–æV"6VÒfW'F–6W2öâöÇ–vöâ&÷VæF&–W2&VÖ–âæV6W76'’FòæV–v†&÷W&–ær6÷W&6R7WG2âvVæW&–2öÆFW"f—‡GW&R†2&RÖW†—7F–ær6÷W&6RVæBÖ6G&–ævÆW3²æ÷BvVæW&FVB&W—&VBvÆÇ2â7GVÂ7–çF†WF–2v—&Vg&ÖW2&Wf–WvVBÆö6ÆÇ’v—F‚ÆÂ×VB6÷W&6R62âW†7B†÷Föw&†VB6÷W&6R7F–ÆÂ&WV—&W2æF—fR66WFæ6RâFòæ÷B–æfW"Væ—fW'6ÂÖ–æ–×VÒF÷öÆöw’÷"vVæW&Â6öÆÆ—6–öâ×6öÇfW"7W÷'Bà ¤FF—F–öæÂÆö6Â&ö&S¢&WfW'6R6÷W&6R÷&FW&–æræB7V&F—f—6–öç3"ó2óBÆÂ7WB7V66W76gVÆÇ’â7–çF†WF–2W‡G&÷WGv&B&–Ò6â7F–ÆÂ&VgW6R6†ÆÆ÷r7V'6WVVçB7WBv—F‚GWÆ–6FRöæöæÖæ–föÆBf6W3²FVWD…$õTt‚7V66VVG2âF†—2&RÖW†—7F–ær6W&FR6÷Ææ"×vÆÂ66R—2æ÷B&W—&VB'’FVÆWF–ærGWÆ–6FW2÷"vV¶Væ–ærvFW3²&WF–â6öç6W'fF—fR&VgW6ÂæBFòæ÷B6Æ–ÒÆÂ÷76–&ÆR–çv&B&ööÆVâ66W26öÇfVBâ6÷W&6R6÷&æW"Ö&æBæBF—&V7B6–ævÆRÔf6R&W&÷2&R&W—&VBâ&–÷#ƒ"FVç6R6VÒóss’6ÆVâ6VÒósC"æVvF—fR÷v'VBö6f—G’õF‡&÷Vv‚æB÷WGv&C‚&Vw&W76–öç2&VÖ–â7F—fRà ¥fÆ–FF–öã¢–æ—F–Âfö7W6VCƒBóƒBæBgVÆÃ2Ã3"ó2Ã3"53²f–æÂFFVBÆÂ×VB6÷VçB66Só52Âf–æÂgVÆÂ7V—FS2Ã32ó2Ã3253²7–çF‚æBv—BF–fbÒÖ6†V6²6ÆVââ&VÆV6S#Ö&¶W'2æB¶W&æVÎ(i&F—&V7BöfÆÆ&6¾(i&G&vW"ÆöFW"6†–â&Wf–WvVC²&÷FV7FVB–ç2&WF–æVBâ#V&Æ–6F–öâfW&–f–VC¢'VçF–ÖSSV6#v&3sccSC3SC6ƒ33V&S“SVFFFc–CrÂW†7BFW7FVBG&VVCs3ƒFFVff&f†c†fCf–S63sƒ&V33“6c²vW3C#cc#s25T44U52âg&W6‚Æ—fRfW'6–öâæ§6öâö–æFW‚æ‡FÖÂõF‡&÷Vv‚¶W&æVÂôf6RF—&V7B÷6WVVçF–ÂfÆÆ&6²öG&vW"öf6Rv÷&¶fÆ÷r÷6†VÆÂ6ö×&—6öâ÷&÷FV7FVB6÷&æW"ÆææW"ÆÂ'—FRÖÖF6‚FW7FVB6÷W&6Râ†÷7FVBF÷öÆöw“C#css3r7F–ÆÂ'Vææ–ærB&ööc²f–æÂÆö6Ã2Ã32ó2Ã3252âW‡G&öÆBÖW‡&W76–öâ&ö&W26öæf—&ÒF—&V7BD…$õTt‚CãBó"Ç6òf–ÆVB&Vf÷&RF†—2&W—"âæF—fS#VæF–ærâFWf–6S¢÷&–v–æÂ6÷&æW"&æB–çv&C²÷&–v–æÂ6–ævÆRf6R–çv&BF†VâD…$õTt‚F—&V7FÇ’t•D„õUB÷WGv&BÖf—'7C²–ç7V7B6ÆVâvÆÇ2ö÷Væ–æs²6æ6VÂÂFöæRæBVæFõ&VFó²6öæf—&Ò66WFVB÷WGv&B6÷&æW"W‡G'W6–öââæW‡C¢æF—fRfVVF&6²öâ&÷F‚W†7B66VæW3²&WF–â6ÆVâvVöÖWG'’÷7G&–7BF÷öÆöw’6öçG&7G2à ¢2ã#(	BÖF6†–ærVB7W'&÷VæG2öâVÆ–v–&ÆRD…$õTt‚&6²f6W2(	B’æ÷fVÖ&W"##` ¥W6W"6—3#—2(	Ææ÷BV—FR72'WBvööBVæ÷Vv‚f÷"æ÷~(	Ó²&V6÷&B$õd•4”ôäÂÂæ÷B&÷FV7FVB52âã‚÷WGv&B6ÆVâ×VB52æBV&Æ–W"&÷FV7F–öç2&VÖ–ââW6W"6·2&6²Öf6R&V6öç7G'V7F–öâÖF6†–ærg&öçBÂv—F‚f÷W"w&VVâ6†÷'B6÷&æW"¦ö–ç2âVF—BÖ–ã3–ccv÷&VÆV6S#²7W'&VçB¶W&æVÂ&W6W'fW26Æ—VBW†—B7G&—2'WBFöW2æ÷B&V6öææV7BâVæ6Æ÷6VB÷Væ–ærFòF†R÷WFW"f6R6÷&æW'2â†÷7FVC#F÷öÆöw“C#css3r5T44U53²F†—2FöW2æ÷B–×Ç’æF—fR66WFæ6Râ67&VVç6†÷B&VÖ–ç2&—fFRà ¥6ÖÆÂW&RVDW†—Dg&ÖR†VÇW"&VÆöæw2FòF†R÷&–v–æÂF‡&÷Vv‚¶W&æVÂæB—26ÆÆVBg&öÒ$õD‚'V–ÆDæVvF—fTW‡G'VFRæB'V–ÆEF‡&÷Vv‚BffV7FVB6†VÆÂÔf6R&V6öç7G'V7F–öââVÆ–v–&–Æ—G“¢6÷W&6R÷F&vWBf÷W"×6–FVBÂ7G&–7FÇ’6öçfW‚Ææ"F&vWB÷÷6—FR÷&ÆÆVÂFò6÷W&6RÂv†öÆR&ö¦V7FVB÷Væ–ær7G&–7FÇ’–ç6–FRF&vWBÂW†—BFWF‚&V6†VBâf÷W"6÷&æW"Ö6÷'&W7öæFVæ6R6æF–FFW2&R6†V6¶VBf÷"6öçfW‚æöç¦W&ò÷6—F—fVÇ’v÷VæBVG2æBW†7BæçVÆ"&V²6†ö÷6R6†÷'FW7BfÆ–B6÷&æW"¦ö–ç2âVÖ—G2dõU"&VÂ7W'&÷VæBVG2W6–æröæÇ’÷&–v–æÂ÷WFW"6÷&æW'2÷&ö¦V7FVB÷Væ–ær6÷&æW'2âæòFFVBÆææ–ærfW'F–6W2ÂÖ6¶–ærÂG&–æwVÆF–öâöfâÂ†–v‚×6–FVB&WÆ6VÖVçBf6RÂvÆö&ÂVB6ÆVâ÷"æWrÖöFVÆÆ–ær¶W&æVÂâv†W&RVÆ–v–&–Æ—G’f–Ç2Â&WF–â÷&–v–æÂ6Æ—–ærâæòvVæW&Â7–ÖÖWG'’&öÖ—6Rf÷"v'VB÷G&–æwVÆFVBö×VÇF—ÆRÔf6RW†—G2÷"&W6W'fF–öâöbg&öçBÆ–÷WBF†BF–ffW'2g&öÒF†—2f÷W"×VBg&ÖRâÖ–æ–×VÒVB÷G&’æçVÇW26÷VçBv—Fƒ‚f—†VB&÷VæF'’fW'F–6W2—3Bf6W3²F†—266÷VB&V6öç7G'V7F–öâGF–ç2—Bà ¤W†—7F–ær6æöæ–6Â76VÖ&Ç’ö6öæf÷&Ö–æræV–v†&÷W"&÷VæF&–W2ÂæVvF—fRÖ7WBw&÷W2Â7&V6Rf–ÇFW&–ærÂ6÷W&6R—6öÆF–öâÂ7G&–7BfÆ–F—G’Â6f—G’ö÷&FW&VBW†—G2æBã#W†7B7F'BÆæR&VÖ–ââã‚ÆææW"æBãbÆö÷6÷W&6R÷–ç2Âã’–æfW&Væ6RÂvW7GW&Rö†—7F÷'’Æ—7FVæW'2æB&÷FV7FVB×VÇF’G&ç6f÷&Óã3bããVæ6†ævVBâæWr&6²g&ÖRföÆÆ÷w2W†—7F–ær6÷W&6R7W&f6RW†7FÇ“²Ææ"÷&ÆÆVÂwV&G2&VgW6R&V6öç7G'V7F–ærv'VB7W&f6W2âW†—7F–ærfÆÆ&6²6Æ—2Vç7W÷'FVB6†W2â÷&–v–æÂ'V–ÆEF‡&÷Vv‚ÖWFFF6VÖçF–72&R&WF–æVBÂæ÷BæWvÇ’GfW'F—6VB2&–6‚ÖGG&–'WFR&W—"à ¤f—fRæWrFW7G26÷fW"7GVÂæVvF—fRæBF‡&÷Vv‚÷væW'3¢&6²7W'&÷VæBWVÇ2&VfÆV7FVBg&öçBF÷öÆöw“³B&VÂW†—BVG2óbF÷FÂVG2óbfW'F–6W2ó3"VFvW2öW†7BföÇVÖSc²ÖWFFFf÷"æVvF—fR7WC²6†ÆÆ÷r&V6W72¶VW2&6²VC²&÷FFVB÷66ÆVB÷G&ç6ÆFVBW†7BföÇVÖS²7GVÂ&Wf–Wr6æ6VÂæB6–ævÆRÖ6†V6·ö–çBVæFõ&VFòâ7GVÂg&öçBö&6²v—&Vg&ÖRg&öÒvVæW&FVBÖW6‚&Wf–WvVBÆö6ÆÇ’æBÖF6†W2f÷W"w&VVâ6÷&æW"Ö¦ö–âÆ–÷WBâæòW6W"vVöÖWG'’ö–ÖvW26öÖÖ—GFVBâfö7W6VCsRósRæBgVÆÂÆö6Â7V—FS2Ã3‚ó2Ã3‚53²7–çF‚æBv—BF–fbÒÖ6†V6²6ÆVââ#V&Æ–6F–öâfW&–f–VC¢'VçF–ÖSs“sc–3c6c3“3F3#S#ƒƒs3S†fSƒC3ƒ3#ÂW†7BFW7FVBG&VSV3ƒcCS#†3s#scv#†&S“3#†V&3SvCs3†3CSS²vW3C#c3s##5T44U52âg&W6‚Æ—fRfW'6–öâæ§6öâö–æFW‚æ‡FÖÂõF‡&÷Vv‚¶W&æVÂôf6RF—&V7B÷6WVVçF–ÂfÆÆ&6²öG&vW"öf6Rv÷&¶fÆ÷r÷6†VÆÂ6ö×&—6öâ÷&÷FV7FVB6÷&æW"ÆææW"ÆÂ'—FRÖÖF6‚FW7FVB6÷W&6Râ†÷7FVBF÷öÆöw“C#c3s3##R7F–ÆÂ'Vææ–ærB&ööc²f–æÂÆö6Ã2Ã3‚ó2Ã3‚52âæF—fS#VæF–ærà ¤FWf–6S¢–ç6WB&V7FæwVÆ"f6RD…$õTt‚fÆB&6²VC²÷&&—BæB6ö×&Rg&öçBö&6²f÷W"6÷&æW"¦ö–ç2ÂfW&–g’÷Væ–æræBæòW‡G&v—&Rw&–C²VæFõ&VFó²G'’÷&–v–æÂ†÷Föw&†VB÷Væ–æs²6†V6²6†ÆÆ÷r&V6W72æB66WFVB÷WGv&B6÷&æW"W‡G'W6–öââ–b÷&–v–æÂW†—B7ç26WfW&Â6÷W&6Rf6W2Â&WVW7B—G26fVB&ö¦V7B&Vf÷&R'&öFVæ–ærÆö6ÂW†—B&V6öç7G'V7F–öââæF—fS#&VÖ–ç2&÷f—6–öæÃ²¶æ÷vâFF—F–öæÂ6†ÆÆ÷r6÷Ææ"×&–Ò&VgW6Âg&öÓ#&VÖ–ç2÷VââæW‡C¢æF—fRW†—BÖg&ÖRfVVF&6²v—F‚6ÆVâF÷öÆöw’6÷VçG2÷7G&–7BfÆ–FF–öâ&W6W'fVBà ¢2ã#"(	BÆ–æV"VFvR–æFW†–ærf÷"F‡&÷Vv‚fW'FW‚ÖfâfÆ–FF–öã²ã#&÷FV7FVB52(	B’æ÷fVÖ&W"##` ¥W6W"6öæf—&×3#52æB&WVW7G2öæW‡F'V–ÆBâ&÷FV7B66WFVBf÷W"×VB&6²Öf6R7W'&÷VæG2ÂÖF6†–ærg&öçB6÷&æW"¦ö–ç2Â7GVÂF÷öÆöw’'VFvWG2Â–çv&BõF‡&÷Vv‚ô6æ6VÂõVæFõ&VFòæBV&Æ–W#‚÷WGv&B6÷&æW"ób&Wf–WrôÆö÷ó’–æfW&Væ6R&V†f–÷W'2âæF—fS#66WFæ6R—2æòÆöævW"VæF–ærâV&Æ–W##&VÖ–ç2&÷f—6–öæÂ&F†W"F†â&WG&ö7F—fVÇ’&V6÷&F–ær52âVF—B7W'&VçBÖ–æ6“v#C–R÷&VÆV6S#æBÆ—fS#²†÷7FVC#F÷öÆöw“C#c3s3##R5T44U52âW†—7F–ær¶æ÷vâ6†ÆÆ÷r6÷Ææ"×&–Ò&VgW6Â&VÖ–ç2÷VâÂæ÷B'—76VBà ¥W&f÷&Öæ6RVF—Bf÷VæB÷&–v–æÂfÆ–FFUF‡&÷Vv‚'V–ÆG2F†R6ÖR6Æ÷6VBÖÖæ–föÆBfW'FW‚Öfâ6öææV7F—f—G’'’66ææ–ærUdU%’ÖW6‚VFvRf÷"UdU%’fW'FW‚â—B—2W6VB&Vf÷&RögFW"&—fFR7WG2æBF‡&÷Vv‚Æææ–ærâ¶VWWF†÷&—FF—fRfÆ–FF÷"æBÆÂ&6RF÷öÆöw’ÂVFvR×v–æF–ærÂf–æ—FR÷&WVFVBÖ–æFW‚ö&VæB&÷r×F–R'VÆW2âæWr–çfö6F–öâÖÆö6Â–æ6–FVçDVFvW2–æFW‚&VfW&Væ6W2V6‚VFvRW6RB—G2GvòVæGö–çG2öæ6RÂ–âF†R4ÔR÷&–v–æÂVFvR÷&FW"âW"×fW'FW‚F¦6Væ7’ôDe2Â–æ6–FVçBöf6R÷&FW&–æræBW†7Bf—'7B&VgW6ÂöFWF–Ç2&VÖ–ââæò&WF–æVB66†RÂæWrfÆ–FF–öâö¶W&æVÂÂ&VÖ÷fVBvFRöÆ—7FVæW"Â6÷W&6R×WFF–öâ÷"6†ævVB7WGF–ær÷&V6öç7G'V7F–öââFV×÷&'’Æ–æV"–æFW‚W6W3$RVFvR×W6R&VfW&Væ6W2ÇW2W"×fW'FW‚'&—2Âæ÷BÖVÖ÷'’Ö66—G’6Æ–Òâã#g&ÖRæBã#W†7B7F'BÆæRÆv÷&—F†×2&RVæ6†ævVBÂ2&R&÷FV7FVB×VÇF’G&ç6f÷&Óã3bããÃ‚6÷&æW"ÆææW"æCbÆö÷–ç2÷6÷W&6Rà ¤g&÷¦VâW†7C#fÆ–FF–öâ÷væW"VæFW"FW7G2öf—‡GW&W2÷W&f÷&Öæ6R÷F‡&÷Vv‚×fÆ–FF–öâÓ#æ§3²f—fR&öGV7F–öâÖ÷væW"&—G’FW7G26÷fW"fÆ–B6Æ÷6VBöF—66öææV7FVB6†VÆÇ2Â&÷r×F–Rf—'7B&VgW6ÂÂÖÆf÷&ÖVBö&÷VæF'’öGWÆ–6FR÷v–æF–æröæöæf–æ—FR÷¦W&òÖ&V66W2v—F‚gVÆÂFWF–Ç2ÂVF—G2ö7WG2÷&W7F÷&F–öâöÆ&VÇ2ö7&V6W2÷6÷W&6R–Ö×WF&–Æ—G’ÂfW'FW‚öf6RW&×WFF–öç2æB–ç7G'VÖVçFVBVFvRÖÖG&fW'6ÂâFW7BÖöæÇ’†VÇW"W†V7WFW27GVÂ÷væW"FW‡Bv—F‚6÷VçFVBÖ2âW†—7F–ærF‡&÷Vv‚ö6÷&æW"öW†—Bö†—7F÷'’&Vw&W76–öç2&VÖ–â7F—fRâFòæ÷BvV¶VâÆVv7’vVöÖWG'’6†V6·2v†–ÆR–×&÷f–ærW&f÷&Öæ6Rà ¥&W&öGV6RæöFR67&—G2ö&Væ6†Ö&²×F‡&÷Vv‚×fÆ–FF–öâÓ#"æÖ§3²Fö72÷W&f÷&Öæ6R×F‡&÷Vv‚×fÆ–FF–öâÓ#"æ§6öââ6Æ÷6VB6†&VBÖ–æFW‚w&–B7V&W33ƒBóS3bócCBf6W2Ã"v&×W2óRÇFW&æF–ær—&VB&WWF—F–öç2âW†7BfÆ–B&W7VÇG2÷6÷W&6RVæ6†ævVBâv†öÆRÖVFvRÖÖf—6—G3#“cCC‚óCs#Cs3bósSS##CŽ(i#sc‚ó3s"ó##ƒƒ²VFvRÖÖVçVÖW&F–öç33ƒbóS3‚ócCn(i#âæöFRgVÆÂ×fÆ–FF÷"ÖVF–ç32ã3C^(i#ãó3rãS#(i#bãbóCs’ãsƒ.(i##"ãC“v×2â–æ6ÇVFW2f÷VæFF–öâ6†V6·2Âg&W6‚–æFW‚æBDe3²W†6ÇVFW27WGF–ærö6Æ—–ærö76VÖ&Ç’Â&VæFW"ö†—7F÷'’öWfVçG2ö'&÷w6W"ôuRö•Bâ6÷VçG2&VfW"Fò–æFW†VBVFvRÖÖG&fW'6Ã²Æö6ÂW"ÖVæGö–çBF¦6Væ7’f—6—G2&VÖ–ã$RâæòVæB×FòÖVæBW‡G'W6–öâ÷"æF—fR7VVGWÂ6fR66—G’÷"t4Ò&öÖ÷F–öâ6Æ–ÖVBâV&Ç’Ö–çfÆ–B–çWB7F–ÆÂ&VgW6W2&Vf÷&Rfâ–æFW†–ærâ–æ—F–ÂF–Ö–ærÆVB&6VBöâFVç6RV&7WBÖ6f—‡GW&Rv2Vç7V—F&ÆR&V6W6R6öÖR†–v‚ÖFVç6—G’vVæW&FVB6f6W2&RFVvVæW&FS²ÖV7W&VBö÷W&F–öâÖ6÷VçBf—‡GW&W2W6RvVçV–æVÇ’fÆ–BÆÂ×VB6†&VBÖ–æFW‚7V&W2–ç7FVBà ¤fö7W6VCƒóƒæBgVÆÂÆö6Â7V—FS2Ã32ó2Ã3253²7–çF‚æBv—BF–fbÒÖ6†V6²6ÆVââ&VÆV6S#"Ö&¶W'2æB&÷F‚¶W&æVÂ–×÷'B6†–ç2&Vg&W6†VC²&Wf–WvVB76WB†6†W2÷–ç2&WF–â&÷FV7FVBVç&VÆFVB76WG2â#"V&Æ–6F–öâVæF–ærfW&–f–6F–öââæF—fS#"VæF–ærâFWf–6S¢6ÖRÖç’Öf6RÖöFVÂ–çv&BW‡G'W6–öâæBD…$õTt‚&W7öç6—fVæW73²6öæf—&Ò66WFVBg&öçBö&6²6÷&æW"¦ö–ç2æB÷WGv&B6ÆVâvÆÇ3²6æ6VÂæBFöæRõVæFõ&VFó²÷&F–æ'’æf–vF–öââæW‡BW&f÷&Öæ6RFV6—6–öâföÆÆ÷w2&VÖ–æ–ærÖV7W&VBv÷&³²6Æ—–ærö76VÖ&Ç’÷&VæFW"Ö’7F–ÆÂFöÖ–æFRâvVöÖWG'’6÷'&V7FæW72æB7G&–7B&VgW6ÂvFW2&VÖ–âÖæFF÷'’à  ¢2ã#2(	B6†'VâÖöæÇ’Æ–W"F§W7FÖVçG3²ã#"&÷FV7FVB52(	B’æ÷fVÖ&W"##` ¥W6W"6öæf—&×2ã#"52â&÷FV7B—G2Æ–æV"F‡&÷Vv‚fÆ–FF–öâÂ66WFVBg&öçBö&6²VBg&ÖW2Â÷WGv&B6÷&æW"vÆÇ2Â7G&–7B&VgW6Â'VÆW2æB6æ6VÂôFöæRõVæFõ&VFòâVF—FVBÖ–â6V3Fc#3†fSVSS&6#fC“cCCF33#C#6#s–3C#²ã#"†÷7FVBF÷öÆöw’C#cc3c#s’æBvW2C#cc3c3R7V66VVFVBÂÆ—fRÖ&¶W"÷6†VÆÂæB&VÆV6R–ç2fW&–f–VBâæF—fRã#"—266WFVBÂæ÷BVæF–ærà ¥W6W"&W÷'G2F§W7BÆ–W"(i"6†'æW72ÆöæRFöW2æ÷B&ÒÇ’Â'WB'&–v‡FæW72³FöW2âW†—7F–ærF–Æör6÷'&V7FÇ’&WV—&W26†ævVB÷WGWB—†VÇ3²Fòæ÷B6–×Ç’f÷&6RÖVæ&ÆRÇ’÷"7&VFRV×G’†—7F÷'’â&W&öGV6VB6W6R–âF†R÷&–v–æÂF§W7FÖVçB÷væW#¢'—FR&÷VæF–æröb—G2öæR×726ögB6×ÆRW&6W2Æ÷rÖ6öçG&7BöæRÖ'—FRFWF–ÂÂÖ¶–ærWfW'’6†'æW72÷WGWB–FVçF–6Ââ¶VWF†R6†&VB6VÒÖv&Rf–ÇFW"æB&WVW7B÷F–öæÂ&V6—6RfÆöF–ær×ö–çB÷WGWBôäÅ’f÷"F†Bf–æR6×ÆS²f–æÂF§W7FVB—†VÇ27F–ÆÂ6Æ×÷&÷VæBFò'—FW2öæ6RâFVfVÇBf–ÇFW"÷WGWBÂ''W6‚6†'VâÂ&ÇW"ôFVf–æ—F–öâÂ6öÆ÷W"6öçG&öÇ2ÂÇ†ö†–FFVâ$t"ÂFöÖ–â÷6VÒ6öç7G&–çG2æB†—7F÷'’÷væW'2&WF–âF†V—"F‡2âgVÆÇ’fÆBö6Æ—VB–ÖvW2÷"Föò×6ÖÆÂ6†ævW26â7F–ÆÂ6÷'&V7FÇ’&öGV6Ræò—†VÂ6†ævRâW†7BW6W"–ÖvRv2æ÷B7WÆ–VC²æF—fR66WFæ6RöbF†B–ÖvR&VÖ–ç2VæF–ærà ¥F‡&VR&Vw&W76–öç2&W&öGV6RF†R&÷VæFVB–FVçF—G’æB–æFWVæFVçBFWF–Â6†ævRÂW†W&6—6RF†R7GVÂF–ÆörFV&÷Væ6RôÇ’ô&Vf÷&Rõ&W6WBÂæB'Vâ&VÂ6VÆV7FVBÖÆ–W"Ç’v—F‚öæRVæFò6†V6·ö–çBæBW†7BVæFòõ&VFòâW†—7F–ærF§W7FÖVçBFW7G26÷fW"ÆÂ6Æ–FW'2Â6VÒ—6öÆF–öâÂÇ†Â–ÖvR6öçfW'6–öâÂ6æ6VÆÆF–öâæB7FÆR×6÷W&6R&öÆÆ&6²â66†R×&Vg&W6‚6†–ã¢–æFW‚(i"f–Ww÷'B×–çB(i"–çBÖF§W7FÖVçG2×V’(i"–çBÖF§W7FÖVçG2(i"–çBÖ6÷&RÆÂW6Rã#2v†W&R6†ævVC²Vç&VÆFVBW†—7F–ærFVfVÇBÖöæÇ’f–ÇFW"–×÷'G2¶VW66WFVB–ç2â6†VÆÂ6ö×&—6öâö7W'&VçB&VÆV6RÖ&¶W'2WFFVC²&Wf–WvVB'—FR†6†W2WFFVBöæÇ’f÷"6†ævVB76WG2â×VÇF’G&ç6f÷&Òã3bããÂF‡&÷Vv‚ö6÷&æW"¶W&æVÇ2æBÆö÷&VÖ–âVçF÷V6†VBà ¥fÆ–FF–öã¢gVÆÂÆö6Â&W'Vâ2Ã3R52òd”Âƒ2Ã3bF÷FÂ“²F†R6öÆRf–ÇW&R–FVçF–f–VBF†RæW7FVBf6RÆ–÷WB&VÆV6R×fW'6–öâÆöFW"7F–ÆÂBã#"â6÷'&V7FVBF†B–âæB—G2G&vW"&VçBÂ&W6W'f–æröæR6æöæ–6Â&VÆV6RÖ÷væW"U$ÂâÆÂ3rf–æÂfö7W6VB–çBöF§W7FÖVçB÷&VÆV6RöÆöFW"ö6ö×&—6öâ6†V6·253²7–çF‚æBv—BF–fbÒÖ6†V6²6ÆVââV&Æ–W"7Fv–ær'VâÇ6ò6Vv‡B7FÆR6†VÆÂ¶W—2æB†&F6öFVB&Wf–÷W2×&VÆV6R6ö×&—6öâW‡V7FF–öã²F†RÆGFW"æ÷rW6W2F†RW†—7F–ær7W'&VçB×&VÆV6RfÇVRv†–ÆR&WF–æ–æröÆB×&V6÷&B&W6W'fF–öâ76W'F–öç2âV&Æ–6F–öâfW&–f–VBæ÷fVÖ&W"##c¢'VçF–ÖR6öÖÖ—BS““VSSfc“Sf#&f&CC†csc&Vcc#ccSƒ3ÂG&VRf#F&#3“““–&VCƒ–cCFfC–6f#s“sCF3fccF3#bâ†÷7FVBF÷öÆöw’C#csC#S“R76VBÆÂ2Ã3bò2Ã3bFW7G2ƒf–ÇW&W2÷6¶—2“²vW2C#csCSƒ‚7V66VVFVBâg&W6‚Æ—fRfW'6–öâæ§6öâÂ–æFW‚Âf–Ww÷'B×–çBÂF§W7FÖVçBT’öVæv–æRöf–ÇFW"ÂG&vW"Âf6RÆ–÷WBÂ6†VÆÂ6ö×&—6öâæB&÷FV7FVB×VÇF’G&ç6f÷&Ò'—FRÖÖF6‚F†RFW7FVB6†V6¶÷WBâæF—fRã#2&VÖ–ç2VæF–æs²ã#"W6W"527F—2&÷FV7FVBâæòæWrW&f÷&Öæ6R7VVGW6Æ–ÖVB–âã#2âæW‡BW&f÷&Öæ6Rv÷&²&VÖ–ç2ÖV7W&VÖVçBöb6Æ—–ærö76VÖ&Ç’÷&VæFW#²&W6W'fRvVöÖWG'’6†V6·2æBÆ—7FVæW'2âF†—2æ'&÷r&VÆV6R†æFÆW2F†R–çB&W÷'Bf—'7Bà ¤FWf–6Rã#3¢FWF–ÆVB–çFVBö–ÖvRÆ–W"(i"F§W7BÆ–W"(i"6†ævRôäÅ’6†'æW72Âv—Bf÷"&Wf–WræBÇ“²VæFòõ&VFó²&V÷VâæB6†V6²&Vf÷&RÂ&W6WBô6æ6VÂæB6öÖ&–æVB'&–v‡FæW72F§W7FÖVçBâ6öæf—&Ò÷&F–æ'’–çF–æræBFöæR&VÖ–âW6&ÆRâã#"52—2&÷FV7FVBà ¢ÒÒÐ ¢2ã#B(	B–æFW†VB÷WGWB×6VÒ6V&6‚f÷"–çv&BõD…$õTt‚76VÖ&Ç“²ã#2&÷FV7FVB52(	Bæ÷fVÖ&W"##` ¥W6W"6öæf—&×2ã#252æB&WVW7G2öæW‡F'V–ÆBâ&÷FV7B–æFWVæFVçB6†'VâÖöæÇ’Ç’Â&Vf÷&Rõ&W6WBô6æ6VÂÂÆ–W"†—7F÷'’æBÆÂV&Æ–W"–çB66WFæ6S²ã#"fÆ–FF÷"æBã#f÷W"×VB&6²g&ÖW2&VÖ–â66WFVBâVF—FVBÖ–âvcƒs“sss&SC6cVCf3“c&&#cfcS–6CCBæBÆ—fRã#2â'VçF–ÖRS““VSRÂ†÷7FVBF÷öÆöw’C#csC#S“R522Ã3bó2Ã3bæBvW2C#csCSƒ‚5T44U52&RfW&–f–VBâV&Æ–W"æF—fRÒã#2×VæF–æræ÷FW2&VÆ÷r&R†—7F÷&–6ÂæB7WW'6VFVB'’F†—2W6W"52à ¤ÖV7W&VB&÷GFÆVæV6³¢f–æÂ76VÖ&ÆR6VÒ6öæf÷&Öæ6R&ö¦V7FVBWfW'’W6VBfW'FW‚v–ç7BWfW'’÷WGWBVFvRÂWfVâöâVçF÷V6†VBF—7FçBf6W2â–æ—F–Â2ÃCSbÖf6Rw&–B&ö&R7VçBã‚ãW2–âF†—272â¶VWWF†÷&—FF—fR76VÖ&ÆRÂ6æöæ–6ÄVFvU7Æ—BæBF†RW†7Bf–æÂBöVæGö–çBöF—7Fæ6RFW7BâæWr–çfö6F–öâÖÆö6Â6VÕfW'FW„6æF–FFW2'V–ÆG2F‡&VR6÷'FVB6ö÷&F–æFRÆ—7G2÷fW"F†Rf–æ—6†VBW6VB×fW'FW‚6WBâV6‚VFvRVW&–W2F†R6†÷'FW7BW‡æFVB†—2–çFW'fÂÂ&V¦V7G2öæÇ’ö–çG26ÆV&Ç’÷WG6–FR—G26öç6W'fF—fR4B&÷VæG2ƒ"¦W2ÇW26ö÷&F–æFR×&÷VæF–ær†VG&ööÒ’ÂæB&W7F÷&W2õ$”t”äÂW6VB÷&FW"&Vf÷&RF†RVæ6†ævVBW†7B&VF–6FRæB7F&ÆRB6÷'BâF‡W2æV"ÖW6–Æöâ6V×2æBWVÂ×BF–W2¶VW÷&–v–æÂ÷&FW&–ærâæöæf–æ—FR&÷VæG2÷Vç7W÷'FVB–æFW‚fÇVW26öç6W'fF—fVÇ’fÆÂ&6²FòF†R÷&–v–æÂ6ö×ÆWFR6æF–FFRÆ—7Bâæò–æFW‚7W'f—fW2â76VÖ&Ç“²æòvVöÖWG'’—2Ö÷fVB'’F†R–æFW‚âæ'&÷v–ær—2'&öB†6RÂæ÷BæWrÖöFVÆÆ–ær¶W&æVÂ÷"fÆ–FF–öâ6†÷'F7WBâv÷'7BÖ66R6æF–FFRv÷&²—2äõB&öÖ—6VBÆ–æV"âFV×÷&'’5b–æFW‚&V6÷&G2ÇW2VW'’Æ—7G3²æò66—G’6Æ–Òà ¤ÆÂ7WGFW'2Â6Æ—–ærö6Æ76–f–6F–öâÂ&÷VæF'’6öÆW66–ærÂfW'FW‚&WW6Rö6æöæ–6Â7Æ—BÂ7G&–7BF÷öÆöw’÷&VgW6ÂvFW2ÂÖWFFFö7&V6W2Âv'VBfâæ6†÷'2Â6VÆV7F–öç2ÂvW7GW&RÆ—7FVæW'2æB&Wf–Wrö†—7F÷'’÷væW'2&VÖ–âVæ6†ævVBâF‡&÷Vv‚æBæVvF—fR7WG26†&RF†—26ÖR76VÖ&ÆR÷væW"â×VÇF’G&ç6f÷&Òã3bããÂ6÷&æW"ÆææW"ã‚ÂÆö÷ãbæB–çBã#26÷W&6R÷–ç2&VÖ–â&÷FV7FVBâ6†ævVB¶W&æVÂ–×÷'B6†–ç2Â6†&VB&VÆV6RÖ÷væW"6†–âæB6†VÆÂÖ&¶W'2&Vg&W6†VB6ö†W&VçFÇ’Fòã#C²&Wf–WvVB76WB†6†W2WFFVBöæÇ’gFW"6÷W&6R÷–â&Wf–Wrà ¤g&÷¦VâW†7Bã#276VÖ&ÆRVæFW"FW7G2öf—‡GW&W2÷W&f÷&Öæ6R÷F‡&÷Vv‚Ö76VÖ&Ç’Ó#2æ§2â6WfVâ&öGV7F–öâÖ÷væW"FW7G26ö×&RW†7BfW'F–6W2ö–æF–6W2öw&÷W2ö7&V6W2ö6–æF–6W2÷&V6öç2÷6÷W&6RÂg&ÖVBæBw&–FFVB–çv&BõD…$õTt‚7WG2ÂG&ç6f÷&ÖVBö6÷&æW"Ö&æBvVöÖWG'’Â&÷VæG2ö÷&FW"æV"W6–ÆöâÂ6öÆÆ6VB×6VÒ&VgW6ÂÂæV6W76'’BÖ§Væ7F–öâ–ç6W'F–öâöâ$õD‚–æ6–FVçBVFvW2ÂæB7GVÂ&Wf–Wr6æ6VÂôFöæR÷6–ævÆR×7FWVæFõ&VFòâÆÂbfö7W6VBF÷öÆöw’6†V6·2æBC&VÆV6R6†V6·276VBâgVÆÂÆö6Â7V—FS¢2Ã3#2ó2Ã3#253²f–æÂ6WfVâæWr6†V6·2Ç6ò72gFW"†VÇW"–ç7G'VÖVçFF–öâ&Vf–æVÖVçBâ7–çF‚æBF–fb6†V6·26ÆVââ'VçF–ÖRã#BV&Æ—6†VB2f#“†##6C““–cfC3636CvCFvCcv#S“‚ÂFW7FVBG&VRS3f&VScF36VVSVS#SSscScfƒv#S6S#“vBâvW2C#s“cSS3R7V66VVFVBâÆÂ"g&W6‚Æ—fR&VÆV6Rö¶W&æVÂöÆöFW"÷6†VÆÂæB&÷FV7FVB×VÇF’ö6÷&æW"ôÆö÷õ–çBf–ÆW2'—FRÖÖF6‚F†RFW7FVB6†V6¶÷WBâ†÷7FVBF÷öÆöw’C#s“cc#3"7V66VVFVBv—F‚2Ã3#2ó2Ã3#252ƒf–ÇW&W2÷6¶—2“²æF—fRã#B66WFæ6R&VÖ–ç2VæF–ærà ¥&W&öGV6RæöFR67&—G2ö&Væ6†Ö&²×F‡&÷Vv‚Ö76VÖ&Ç’Ó#BæÖ§3²Fö72÷W&f÷&Öæ6R×F‡&÷Vv‚Ö76VÖ&Ç’Ó#Bæ§6öââ7GVÂ6ö×ÆWFRæVvF—fRÖ7WB¶W&æVÂ–âæöFRdÒÂGvòv&×W2÷F‡&VRÇFW&æF–ær—&VB&WWF—F–öç3²6ö×&W2F†RW†7Bã#276VÖ&Ç’v—F‚–FVçF–6Â&VÖ–æ–ær¶W&æVÂ6öFRâF–Ö–ær6ÆÇ2†fRäòW"×&VF–6FR6÷VçFW'3²6÷VçG2W6R6W&FRVçF–ÖVB6ÆÇ2â3ƒBóƒcBóS3bÖf6R6†&VBÖ–æFW‚7V&RÖVF–ç2#Bã#óS3Rã#Rócsrã×2(i"#"ã3BóSrãcó#‚ãƒ†×2ƒRãSg‚ó’ã#—‚ó2ã‚’âW†7B6VÒ&ö¦V7F–öâ&VF–6FW2c#sbó33c“bó“CƒcC(i"öâF†W6R&VwVÆ"Öw&–Bf—‡GW&W3¢'&öB×†6Rv÷&²ö–æFW†–ær7F–ÆÂö67W'2ÂæBF†R6W&FRBÖ§Væ7F–öâFW7B&÷fW2æV6W76'’–çFW&–÷"6æF–FFW2&R&WF–æVBâ6÷'&V7FæW72ÂãÓ‚&VF–6FR×&VGV7F–öâæBãÓã#W‚6ö×ÆWFRÖ7WBF–Ö–ærvFW2ÆÂ52â–æ6ÇVFW26Æ—–ærö6Æ76–f–6F–öâö76VÖ&Ç’÷fÆ–FF–öâö6ö×7F–öã²W†6ÇVFW26öçG&öÆÆW"ö6öçF7BÆææ–ærÂ†—7F÷'’öWfVçG2÷&VæFW"ö'&÷w6W"ôuRö•Bâæ÷Bâ÷&&—BÖÆrÂæF—fR7VVGWÂ66—G’÷"t4Ò6Æ–ÒâV&Æ–W"W‡Æ÷&F÷'’F–Ö–æw2v—F‚W"×&VF–6FR–ç7G'VÖVçFF–öâ÷6†&VBÆöB&Ræ÷BF†Rf–æÂ&W÷'Bà ¤FWf–6Rã#C¢6ÖRÖç’Öf6RÖöFVÂ–çv&BW‡G'W6–öâæBD…$õTt‚&W7öç6S²–ç7V7B66WFVBg&öçBö&6²6÷&æW"¦ö–ç2æB6ÆVâvÆÇ3²6æ6VÂæBFöæRõVæFõ&VFó²÷&F–æ'’æf–vF–öâæBV–6²6†'VâÖöæÇ’Ç’6Öö¶RâæW‡BÖV7W&VBF&vWB—2&VÖ–æ–ærfW'FW‚&WW6Rö76VÖ&Ç’÷"÷F†W"FöÖ–æçBv÷&²Âv—F†÷WBG&÷–ærÆ—7FVæW'2÷"vV¶Væ–ærF÷öÆöw’vFW2â÷&–v–æÂvVæW&ÂvW7GW&RÖöç6WBõT’Ær—2æ÷B6Æ–ÖVB6öÇfVB'’F†—27WB×7V6–f–26†ævRà ¢ÒÒÐ ¢2ã#R(	BW"Ö76VÖ&Ç’fW'FW‚×VW'’&WW6S²ã#B&÷FV7FVB52(	Bæ÷fVÖ&W"##` ¥W6W"6öæf—&×2ã#B52æB&WVW7G2öæW‡F'V–ÆBâ&÷FV7B66WFVB6VÒ×6V&6‚7VVGWÂW†7B7WBvVöÖWG'’ög&öçBÖ&6²VBg&ÖW2Â6æ6VÂôFöæRõVæFõ&VFòæB&Wf–÷W2ã#2–çB66WFæ6RâVF—FVBÖ–â†#S3cssVcƒCC#&SsFcF#“s#ƒ#S†6C3vC–bÂ'VçF–ÖRã#Bf#“†##2Â†÷7FVBF÷öÆöw’C#s“cc#3"522Ã3#2ó2Ã3#2æBvW2C#s“cSS3R5T44U52âV&Æ–W"æF—fRÒã#B×VæF–ærVçG&–W2&VÆ÷r&R†—7F÷&–6ÂæB7WW'6VFVB'’F†—2W6W"52à ¥&VÖ–æ–ærÖV7W&VBv÷&³¢76VÖ&ÆR&WVFVFÇ’'Vç2F†R÷&–v–æÂgVÆÂfW'FW‚f–æD–æFW‚f÷"–FVçF–6Â6ö÷&F–æFW27&÷72æV–v†&÷W&–ær7FvVBöÇ–vöç2âFBôäRÆö6ÂÖFòF†B6ÖR÷væW"Â¶W–VB'’W†7B¦f67&—B6ö÷&F–æFRfÇVW2†æò&÷VæF–ær÷vVÆF–ærw&–B’â66†RöæÇ’fW&–f–VBW2ÖF6‚g&öÒF†R÷&–v–æÂf—'7BÔ”B66âÂæWvÇ’VæFVBW†7Bö–çBÂ÷"6æöæ–6Â&W7VÇB7GVÆÇ’v—F†–âW2âW†—7F–ær&—fFR76VÖ&Ç’öæÇ’VæG2fW'F–6W2æBæWfW"Ö÷fW2W†—7F–ær÷6—F–öç2Â6òæòÆFW"VæFVB”B6â7WW'6VFRâÇ&VG’fW&–f–VBÆ÷vW7BÖF6†–ær”Bâ66†RÆ–fWF–ÖRVæG2&Vf÷&R6ö×7F–öâ÷&WGW&ã²WfW'’æWr&Wf–Wrö76VÖ&Ç’7F'G2g&W6‚âæöæf–æ—FR6ö÷&F–æFW2÷FöÆW&æ6RæBæVvF—fRFöÆW&æ6R¶VWF†R÷&–v–æÂVæ66†VBF‚âVçG&–W2&R&÷VæFVB'’F—7F–æ7B66†V&ÆR7FvVBVW'’6ö÷&F–æFW2Âæ÷BÖVÖ÷'’Ö66—G’6Æ–Òà ¤”Õõ%DåB6æöæ–6ÂwV&C¢6æöæ–6ÄVFvU7Æ—B†2—G2÷vâVæGö–çBBF‡&W6†öÆBâ—B6â&WGW&ââVæGö–çBf'F†W"F†âW3²FòäõB66†RF†BæöâÖÖF6‚âÆFW"VæFVB&VÂÖF6‚6âF†Vâ6÷'&V7FÇ’v–â&WVFVBVW'’â&Vw&W76–öâ&W7F÷&W2æ—fRVæ6öæF—F–öæÂ6æöæ–6Â66†–æræB&÷fW2F†Bw&öærvVöÖWG'’&WGW&ç2â÷&–v–æÂW†7BF—7Fæ6R&VF–6FRÂV&Æ–W7BÔ”B6VÖçF–72ÂÆÂVFvR66ç2÷7Æ—G2Âã#B6VÒ–æFW‚Â6Æ—–ærö6öÆW66–ærö6Æ76–f–6F–öâÂv–æF–ær÷fÆ–FF–öâ÷&VgW6ÂvFW2ÂÖWFFFö7&V6W2Âv'VBæ6†÷'2æB†—7F÷'’öWfVçB÷væW'2&VÖ–ââæòæWrÖöFVÆÆ–ær¶W&æVÂÂW'6—7FVçBÖW6‚66†RÂÆ—7FVæW"&VÖ÷fÂ÷"t4Ò6Æ–Òâ&÷FV7FVB×VÇF’G&ç6f÷&Òã3bããÂ6÷&æW"ÆææW"ã‚ÂÆö÷ãbæB–çBã#26÷W&6R÷–ç2VçF÷V6†VBâ6†ævVB¶W&æVÂ÷&VÆV6RÆöF–ær6†–ç26ö†W&VçFÇ’&Vg&W6†VBFòã#Rà ¤g&÷¦VâW†7Bã#B76VÖ&ÆRVæFW"FW7G2öf—‡GW&W2÷W&f÷&Öæ6R÷F‡&÷Vv‚Ö76VÖ&Ç’Ó#Bæ§2âW†—7F–ær&öGV7F–öâÖ÷væW"&öf–Æ–ær†VÇW"66WG2F†B&6VÆ–æRæB6÷VçG2÷&–v–æÂÆ–æV"×66âF—7Fæ6R6ÆÇ26W&FVÇ’g&öÒF–Ö–æw2â6—‚æWrFW7G26÷fW"W†7Bã#B–çv&BõD…$õTt‚÷WGWBö÷&FW"öÖWFFFö7&V6W2ö6”G2÷6÷W&6RÂg&W6‚G&ç6f÷&ÖVBöVF—FVB76VÖ&Æ–W2æB&VgW6Ç2Âf—'7BFöÆW&æ6RÖF6‚fW'7W2ÆFW"W†7BfW'FW‚ÂF†R6æöæ–6ÂVæGö–çB×WFF–öâG&ÂãÓ7‚66âÖ6÷VçB&VGV7F–öâÂæB7GVÂ&Wf–Wr6æ6VÂôFöæR÷6–ævÆR×7FWVæFõ&VFòâW†—7F–ærã#Bòã#2&—G’æBæV6W76'’BÖ§Væ7F–öâ6†V6·27F’7F—fRâ#2fö7W6VBF÷öÆöw’6†V6·2ÂC&VÆV6R6†V6·2æBF†RgVÆÂÆö6Â7V—FR2Ã3#’ó2Ã3#’52ƒf–ÇW&W2÷6¶—2’â'VçF–ÖR&VÆV6RF36#FCs3V&vV3cV#c–Sƒ#ff#Ssf3f"ÂFW7FVBG&VR&“3Sƒv6363CsS3S“ƒCvF#svc&Sc#ƒ&c’âvW2C#sCSC3Sƒr7V66VVFVC²ÆÂ"g&W6‚Æ—fR&VÆV6Rö¶W&æVÂöÆöFW"÷6†VÆÂæB&÷FV7FVB×VÇF’ö6÷&æW"ôÆö÷õ–çBf–ÆW2'—FRÖÖF6‚F†RFW7FVB6÷W&6Râ†÷7FVBF÷öÆöw’C#sCSC3“B76VB2Ã3#’ó2Ã3#’ƒf–ÇW&W2÷6¶—2’âæF—fRã#R66WFæ6RVæF–ærâ7–çF‚æBv—BF–fbÒÖ6†V6²6ÆVâà ¥&W&öGV6RæöFR67&—G2ö&Væ6†Ö&²×F‡&÷Vv‚×fW'FW‚×&WW6RÓ#RæÖ§3²Fö72÷W&f÷&Öæ6R×F‡&÷Vv‚×fW'FW‚×&WW6RÓ#Ræ§6öââ7GVÂ6ö×ÆWFRæVvF—fRÖ7WB¶W&æVÂÂã#BfW'7W27W'&VçB–âF†R4ÔR—&VBæöFRdÒ'Vã²Gvòv&×W2öf—fRÇFW&æF–ær—&VB&WWF—F–öç2âF–Ö–æw2†fRäòW"ÖF—7Fæ6R÷6VÒ6÷VçFW'3²÷W&F–öâ6÷VçG2W6R6W&FRVçF–ÖVB6ÆÇ2æB6÷VçBöæÇ’F†R÷&–v–æÂf–æD–æFW‚&VF–6FR†æ÷BÖ66W72÷"6æöæ–6Â×&W7VÇBfW&–f–6F–öâ’â3ƒBóS3bó3CSbÖf6R6†&VBÖ–æFW‚7V&Rv†öÆRÖ7WBÖVF–ç23Bã3bó#"ãS2óc#Rãcf×2(i"3ã#Ró3’ã‚ó3“ã3×2ƒãG‚óãCg‚óãc‚“²Æ–æV"×66â6ö×&—6öç23#“3bóCsSs"ó#3“c#b(i"sc#Cóƒ“cC’óS““CCC’‡ãG‚fWvW"’âfW'FW‚×7FvRÖVF–ç2rã#róƒrã3’ó3ƒãSF×2(i"Rã#Ró32ãó3RãC†×2âW†7B6÷'&V7FæW72ÂãÓ7‚66â&VGV7F–öâæBãÓã‚v†öÆRÖ7WBF–Ö–ærvFW2ÆÂ52âFòæ÷B6ö×&RvÆÂF–ÖW27&÷72†—7F÷&–6Â†÷7B'Vç2â–æ6ÇVFW26Æ—–ærö76VÖ&Ç’÷fÆ–FF–öâö6ö×7F–öâÂW†6ÇVFW26öçG&öÆÆW"ö6öçF7BÆææ–ærö†—7F÷'’öWfVçG2÷&VæFW"ö'&÷w6W"ôuRö•C²æF—fRv–âæ÷B–WBÖV7W&VBâ÷&–v–æÂã#B&Væ6†Ö&²67&—Bæ÷rW‡Æ–6—FÇ’W6W2g&÷¦Vâã#B2—G2gFW"Ö÷væW"6ò&W'VâFöW2æ÷B6–ÆVçFÇ’ÖV7W&Rã#R–ç7FVBà ¤FWf–6Rã#S¢6ÖRÖç’Öf6R–çv&BæBD…$õTt‚7WG3²–ç7V7BÖF6†–ærg&öçBö&6²¦ö–ç2æB6ÆVâvÆÇ3²6æ6VÂF†VâFöæRõVæFõ&VFó²&WVBæ÷F†W"FWF‚÷6VÆV7F–öâFò6†V6²g&W6‚&W7VÇG2âã#B&VÖ–ç2&÷FV7FVBâæW‡BÖV7W&R&VÖ–æ–ærFöÖ–æçB7WBö6öçG&öÆÆW"÷&VæFW"v÷&²&Vf÷&Ræ÷F†W"÷F–Ö—6F–öââvVæW&ÂvW7GW&RÖöç6WBôö&¦V7B'&÷w6W"ÆrÂ6fR66—G’æBt4Ò–çFVw&F–öâ&RäõB6Æ–ÖVB6öÇfVB'’F†—27WB×7V6–f–2&VÆV6Rà ¢ÒÒÐ ¢2ã#b(	Be$ôåBf—6–&–Æ—G’æBW‡Æ–6—Bf6RE$r6VÆV7F–öâ(	Bæ÷fVÖ&W"##` ¥W6W"6öæf—&×2ã#R52æB&WVW7G2Gvò6öçG&öÇ2&W6–FRÆ76òõ6VÆV7BõUb–çC¢e$ôåBv—F‚f6RÖæ÷&ÖÂ–6öâÂæBE$rv—F‚F‡&VRf6W27&÷76VB'’F6†VB6VÆV7F–öâ7G&ö¶Râ&÷FV7Bã#RfW'FW‚&WW6RÂã#B6VÒ6V&6‚ÂÖF6†–ær6ÆVâg&öçBö&6²VBg&ÖW2æBÆÂ&–÷"7WBõ–çBö†—7F÷'’övW7GW&R56W2âVF—FVBÖ–âvVCSVFfCc6V36&s#C&#†V#FccCV3ƒSC²'VçF–ÖRã#RF36#FCs2Â†÷7FVBF÷öÆöw’C#sCSC3“B522Ã3#’ó2Ã3#’æBvW2C#sCSC3Sƒr5T44U52âV&Æ–W"VæF–æræF—fRÒã#RVçG&–W2&R7WW'6VFVB'’F†—2W6W"52à ¤VF—Bf÷VæB†–FFVâf—6–&ÆRõF‡&÷Vv‚6öçG&öÇ2ÇW2F†R÷&–v–æÂVFvR×–çB×6VÆV7B÷væW"âÖ–âf6R&–67G2vW&RF÷V&ÆR×6–FVBæBF†R&ÖVBf6R6öçG&öÆÆW"FVÆ–&W&FVÇ’ff÷W&VBÇ&VG’×6VÆV7FVB†—G2Â–æ6ÇVF–ærâö'67W&VBf6RâæWr6VÆV7F–öâÖ–çWBÖ6öçG&öÇ27WÆ–W2ôäR6W76–öâÖÆWfVÂf6RöÆ–7’æBGvò6öçG&öÇ2öâF†RW†—7F–ær7F–öâ&–Ââe$ôåB7F'G2ôâÂE$rôdc²&÷F‚&R66÷VBöVæ&ÆVB–âf6RÖöFRÂæò&ö¦V7B66†VÖöÆö6Â×7F÷&vR6†ævW2â÷&–v–æÂfW'FW‚ôVFvRFWF‚&V†f–÷W"&VÖ–ç2âe$ôåBf–ÇFW'27GVÂæV&W7B&–67B†—G2Â6†V6·2G&–ævÆRæ÷&ÖÇ2–âv÷&ÆB76Rv—F‚æ÷&ÖÂÖG&—‚ÂæBæWfW"6¶—2âö66ÇVF–ær&6²Öf6–ær7W&f6RFò–6²f'F†W"f6RâÖ–âF2÷–6´†—G2Âf6R–çBæBf—6–&ÆRÆ76ò6†&RF†—2öÆ–7’âv—F‚e$ôåBöfb&WF–â÷&–v–æÂFWF‚÷6VÆV7FVBÖ†—B&V†f–÷W"âW‡Æ–6—Bw&÷rôÆö÷ôÆÂ6öÖÖæG2æBW†—7F–ær6VÆV7FVB6WG2&Ræ÷B6–ÆVçFÇ’7VÆÆVBâF†R&ÖVBf6R6öçG&öÆÆW"†öæ÷W'2F†R&–Ö'’f—6–&ÆR†—Bv†Vâe$ôåB—2öã²&÷FV7FVBÆVv7’6VÆV7FVBÖ†—B÷6WVVçF–Â&V†f–÷W"&VÖ–ç2v†VâöfbâF†—2—266÷VBFòF†R7F—fRö&¦V7Bw2W†—7F–ær–6²7W&f6W3²æ÷BæWr66VæRöÖöFVÂ¶W&æVÂà ¤E$r—2÷væVB'’W†—7F–ærVFvR×–çB×6VÆV7BÂW6–ærv–æF÷r6GW&R&Vf÷&RFö7VÖVçB†öÆBöÖöFVÆÆ–ær6öç7VÖW'2âfÆ–BVæ6–ÂöÖ÷W6Rf6RF÷vâFG2—G26VVBv—F†÷WBFövvÆ–ærâW†—7F–ær6VÆV7F–öâöfbÂF†Vâ6×ÆW26öÆW66VB÷F‚÷6—F–öç2æBFG2f6W2âV&Æ–6F–öâ&F6†W2öæ6RW"WfVçBF‡&÷Vv‚F†R÷&–v–æÂ'&–FvR6WB÷væW#²÷F–öæÂ&–Ö'’&wVÖVçB&W6W'fW2F†RÆ7BFFVBf6RæBöÆB6ÆÆW'2¶VWF†V—"FVfVÇBâæòÖW6‚6†V6·ö–çBÂvVöÖWG'’VF—B÷"&VFò6ÆV&–ærâW‡Æ–6—BE$r&WfVçG2ÖöFVÆW72†öÆBöw&÷r÷67'V"ö÷&&—Bf÷"F†B7G&ö¶S²ôdb&W7F÷&W2F†V—"÷&–v–æÂ&÷WF–ærâ÷&–v–æÂÆVv7’VFvRõfW'FW‚–çB÷væW"&VÖ–ç2–çF7Bâf–ævW"æf–vF–öâÂÆ76òÂUb–çBæB7F—fRFööÂ÷væW'6†—&WF–âF†V—"F‡2âE$rVæ&ÆR&VgW6W2'W7’FööÂõUb–çBÂF—6&×2–FÆRf6RöÖ–â÷G&ç6f÷&Ò÷væW'2f–F†V—"&VÂ—2ÂæBW†—G2Æ76òâÆ76ò÷FööÂöÖöFR7F—fF–öâW†—G2E$râFööÂöÖöFR6Æ–6·2&Rö'6W'fVBBv–æF÷r6GW&RÂ&Vf÷&R÷&–v–æÂFö7VÖVçBÖ6GW&RFööÂ÷væW'26â6öç7VÖRF†VÒâv—¦ÖòæBfÆöF–ær–çWB†–FRVæFW"W‡Æ–6—Bf6RE$rf–F†R÷&–v–æÂv—¦Öò÷væW"Â6òF†R6VVBf6R6ææ÷B66–FVçFÆÇ’7F—fFRG&ç6f÷&Òà ¥ö–çFW"6ö×ÆWF–öâ—2v–æF÷rÖ6GW&RÖ÷væVBÂv—F‚W†7B6öçG&öÂ×7FFR&W7F÷&F–öââ6æ6VÂöÆ÷7B6GW&R÷6V6öæF'’F÷V6‚ö&ÇW"÷vV†–FR÷6WGF–æw26†ævW2&öÆÂ&6²F†R7G&ö¶RFò—G26VVBöæÇ’–âF†R6ÖRÖW6‚öö&¦V7BöÖöFS²6öçFW‡B6†ævW2æWfW"&W7F÷&R7FÆR–æF–6W2âg&W6‚F÷vâ&WF—&W2Ö—76VBöÆB&VÆV6RÂ–æ6ÇVF–ær&WW6VBö–çFW"”G2ö&6¶w&÷VæBF÷vç2âV×G’×76R–æ—F–ÂVæ6–Â6öçF7G2æBf–ævW'2&VÖ–âæf–vF–öââ6×Æ–ær—2&÷VæFVBFò#Sb7V&F—f—6–öç2W"6VvÖVçBBæöÖ–æÂB552ƒ²W‡G&VÖVÇ’F–ç’f6W26â7F–ÆÂæVVB6Æ÷6W"÷6Æ÷vW"72â÷&–v–æÂf6Vw&÷WöÖFW&–Â×–çB÷væW'2&Ræ÷B&WÆ6VBâE$rFöW2æ÷BW&6R÷FövvÆRf6W2÷"7B2Ub–çF–ærà ¥&WVW7FVBæF—fR5dr'Gv÷&²W6W2F†RW†—7F–ær#'‚–6öâ÷6ÖÆÂÖÆ&VÂ&–Ââ÷&–v–æÂÆ76òõ6VÆV7BõUb–çB÷&FW"&WF–æVBÂe$ôåBôE$rVæFVBâf—fRÖ'WGFöâ7F–öâ&–Â†V–v‡B—2#Sgƒ²6æöfg6WB–æ7&V6W2'’F†RW†7B‚FF—F–öâÂ&W6W'f–ær66WFVBãB&6R76–æw2÷v–GF‡2â6†÷'BÖ†V–v‡BÆ–÷WB&÷VæG2æB67&öÆÇ2F†R7F–öâ&–Âv—F†÷WB6‡&–æ¶–ærF&vWG2âW†—7F–ær6æ–çWG2æB†–FFVâFWF‚'WGFöç2öÆ—7FVæW'2&VÖ–ââ&Wf–WvVBãs‚76–ærW‡V7FF–öâWFFVBöæÇ’f÷"F†RGvò&WVW7FVB'WGFöç2âæò'&öFW"T’6ÆVçWà ¥GvVÇfRæWr&öGV7F–öâÖ÷væW"FW7G26÷fW"&VÂÖ–âF‡&VR&–67G2ög&öçBö&6²ö66ÇW6–öâÂ&ÖVB6VÆV7FVBÖf6R&–÷&—G’ÂÇ&VG’×6VÆV7FVB6VVG2Âf7Bö6öÆW66VB6×ÆVB7G&ö¶W2Âe$ôåBÖöfbF‡&÷Vv‚6VÆV7F–öâÂôdbFVÆVvF–öâÂ6ÖRÖ6öçFW‡B6æ6VÆÆF–öâöÆ÷7B6GW&R÷6V6öæF'’F÷V6‚÷&VfW&Væ6W2ö&ÇW"÷vV†–FRÂ7FÆRÖW6‚&VgW6ÂÂ7GVÂÆ76òöÆ–7’ö×WGVÂW†6ÇW6–öâÂ5drö6öçG&öÂ7FFRæB'W7’öF—6&ÒvFW2Âv—¦Öò7W&W76–öâÂ&F6†VB&–Ö'’öFVfVÇB6ö×F–&–Æ—G’Ö—76VB×&VÆV6R&V6÷fW'’æB&RÖFö7VÖVçBFööÂ7v—F6†–ærâW†—7F–ærf6RôÆ76òõVæ6–ÂöÖöFVÆW72÷FööÆ&"6†V6·276VBCSB&Vf÷&RF†Rf–æÂFF—F–öæÂ&V6÷fW'’66S²ÆÂæWr66W2F†Vâ76VC²f–æÂv–æF÷rÖ6GW&RFööÂ×7v—F6‚&Vw&W76–öâ'&–æw2F†RæWrF÷FÂFò"âf–æÂ&VÆV6Rög&öçB÷FööÆ&"6†V6·2S"óS"52â–æ—F–ÂgVÆÂ'Vâ2Ã33’ó2Ã3C52W‡÷6VBÆVv7’v—¦Öò×FW7BW‡G&7F–öâ&÷VæF'’–æ6ÇVF–æræWr6WGWFV6Æ&F–öç3²Ö÷fVB6WGW÷WG6–FRF†R&WVFVFÇ’W†V7WFVBgVæ7F–öâ&÷VæF'’v—F†÷WBvV¶Væ–ær—G26†V6·2â6÷'&V7FVBfö7W6VB6VÆV7F–öâöv—¦Öò÷FööÆ&"÷&VÆV6R'Vâ3"ó3"52âf–æÂgVÆÂÆö6Â7V—FR2Ã3Có2Ã3C52ƒf–ÇW&W2÷6¶—2’â–æ—F–Â'VçF–ÖR#CfS3““†3FS“ƒ33S“sƒcvF3VCfcfcC““S“’ÂG&VRcsFF#fvfCCV#f&SCCSS6c6V&#–VFCâ'&÷w6W"T’&Wf–Wrf÷VæBF&²FW‡B–æ†W&—FVBg&öÒvVæW&–27F—fRÖ'WGFöâ553²e$ôåBôE$ræ÷rW6RW‡Æ–6—B†–v‚Ö6öçG&7B7F—fR6öÆ÷W'2âFööÆ&"æBF÷&"66†R¶W—2W6Rã#bãFò&Vg&W6‚F†B6÷'&V7F–öã²&VÆV6R&VÖ–ç2ã#bâ6Æ÷VB6‡&öÖR&W÷'G2tÅõdTäDõ"ôtÅõ$TäDU$U"F—6&ÆVBæB6ææ÷B7&VFRvV$tÂÂ6ò'&÷w6W"6†V6·26÷fW"&VæFW&VBFööÆ&"öæÇ’Âæ÷B4BõVæ6–Â–çFW&7F–öââ6÷'&V7FVB'VçF–ÖRV3s–&c†Scc363#CS“sƒƒS#CSFcCc&c&&"ÂFW7FVBG&VRS&3“““3VSc3#Fc6FC3CS#FCFS“CCS“cf3fS–#bâvW2C#sS#ƒ“ƒ“25T44U53²†÷7FVBF÷öÆöw’C#sS#ƒ“ƒƒ#‚5T44U52Â2Ã3Có2Ã3C52âÆÂ‚6†V6¶VBÆ—fR6†VÆÂ÷6VÆV7F–öâõT’÷&÷FV7FVB76WG2'—FRÖÖF6‚Æö6Â6÷W&6Râ'&÷w6W"6öæf—&×2ã#bÂe$ôåBöâôE$röfbÂv†—FRÖöâÖ&ÇVR7F—fR–6öâÂ#Sg‚&–ÂæB‡‚6ævâ6öçG&7B÷&VÆV6Rfö7W6VB6†V6·23ró3r53²f–æÂ6VÆV7F–öâ÷FööÆ&"6Öö¶Rrór52âæF—fR4BõVæ6–Â66WFæ6R&VÖ–ç2VæF–ær&V6W6R6Æ÷VBvV$tÂ—2F—6&ÆVBâæF—fR•B66WFæ6R&VÖ–ç2VæF–ærâæöFRFW7G2W6R&VÂ–6¶–ærÇW26öçG&öÆÆVBT’÷&VæFW"FWVæFVæ6–W3²Fòæ÷B6Æ–ÒæF—fR6f&’õVæ6–ÂfÆ–FF–öâg&öÒF†VÒà ¤ÆÂ7WB¶W&æVÇ2÷fÆ–FF÷'2ö66†R÷6VÒ6öFRÂ&÷FV7FVB×VÇF’G&ç6f÷&Òã3bããÂ6÷&æW"ÆææW"ã‚ÂÆö÷ãbÂ–çBã#2æBF†V—"–ç2&VÖ–âVæ6†ævVBâ6†ævVB–6¶W"ôf6R6öçG&öÆÆW"÷–çB×6VÆV7F–öâôÆ76òöv—¦Öò÷F÷&"÷FööÆ&"÷&VÆV6RÆöFW"6†–ç2&Vg&W6†VBFòã#bÂ–æ6ÇVF–ærF†RæWröÆ–7’6†–ÆBâ6÷W&6RæB66†R¶W—2&Wf–WvVB&Vf÷&RWFF–ærF†R76WB6öçG&7Bà ¤FWf–6Rã#c¢6ÆV"6VÆV7F–öâÂe$ôåBöâF†VâFôÆ76ò÷fW&Æ–ærf—6–&ÆRf6W3²&6²f6W2×W7Bæ÷B&R6VÆV7FVBâVæ&ÆRE$ræB–çB7&÷72æV–v†&÷W&–ærf6W27F'F–æröâ6VÆV7FVBf6S²æò÷&&—Böw&÷r÷"ÖöFVÂÖ÷fVÖVçBâGW&âE$röfbæB6öæf—&Ò÷&–v–æÂ†öÆBÇW2F—&V7F–öæÂ6VÆV7F–öâvW7GW&W2â6ö×&Re$ôåBöfbF‡&÷Vv‚Æ76òôE$rÂF†Vâ&W7F÷&Re$ôåBöââf–ævW"÷&&—B÷â÷–æ6‚æBUb–çB7F–ÆÂv÷&³²6†V6²&–Â–6öç2÷76–æröâ•BâæW‡B7FWföÆÆ÷w2æF—fR6VÆV7F–öâfVVF&6³²vVæW&Âf–Ww÷'BÆrõt4Òv÷&²&VÖ–ç2÷VâÂæòW&f÷&Öæ6RÖ66—G’6Æ–Ò–âF†—26VÆV7F–öâ&VÆV6Rà ¢ÒÒÐ  ¢2ã#r(	Be$ôåBÆVv7’Ö÷væW"†æFöfbæB–çB&–Â÷&FW"(	Bæ÷fVÖ&W"##` ¥W6W"&W÷'G2ã#b6†V6²e$ôåBd”Â‡7F–ÆÂ6VÆV7F–ær÷&WF–æ–ærF†RF‡&÷Vv‚f6R–ç7FVBöbF†Rg&öçB’â6†V6·2"ó2óB53¢W‡Æ–6—BVæ6–ÂE$rÂE$rÖöfbF—&V7F–öæÂö†öÆB6VÆV7F–öâÂf–ævW"÷&&—B÷â÷–æ6‚&R&÷FV7FVBâ–6öç266WFVBâW6W"&WVW7G2–çBBF†R&÷GFöÒâFòæ÷B&V6÷&B&Ææ¶WBã#b52à ¤VF—B7W'&VçBÖ–âf36VcsS–6SFcCƒ&6##V#ƒSv&CV#s&6Fc’æBã#b'VçF–ÖRV3s–&c†Scc363#CS“sƒƒS#CSFcCc&c&&"âF†R6†&VBÖ–âe$ôåB–6¶W"Ç&VG’F¶W2öæÇ’F†RæV&W7Bæ÷&ÖÂÖ6†V6¶VB†—Bâf÷VæB6W&FRÆ—fR'—73¢Æö÷6RÖ&ö÷G7G&–ç7FÆÇ2ÆVv7’f6RG&ç6f÷&ÒB6çf26GW&S²v†VâF†Rv—¦Öò—2†–FFVâ—B&–67G2öæÇ’6VÆV7FVBf6W2æB6öç7VÖW2Væ6–Â&W72WfVâv†VââVç6VÆV7FVBg&öçB7W&f6Rö66ÇVFW2F†R6VÆV7FVBf6RâF†Rã#b6öçG&öÆÆVB–6¶W"÷–çBf—‡GW&RF–Bæ÷B–ç7FÆÂF†—26öç7VÖW"Â6ò—G276–ær6†V6·2F–Bæ÷B6÷fW"F†BWfVçB†æFöfbâF†R÷&–v–æÂ&Vv–öâ×6VÆV7F–öâfÆÆ&6²†2F†R6ÖR6VÆV7FVBÖöæÇ’GFW&ã²W'6—7FVçB&ÖVBfÆÆ&6²†Bâ–æFWVæFVçBVæf–ÇFW&VB–6¶W"à ¥&W—"F†RW†—7F–ærF‡&VR÷væW'3¢v—F‚e$ôåBöâF†W’6öç7VÇBõö&÷†Æ%6VÆV7F–öä'&–FvRç–6²‚vf6RrÆWfVçB“²G&ç6f÷&Ò÷&Vv–öâ÷væW'2öæÇ’6Æ–Ò6VÆV7FVBf6R–bF†B6†&VBf—6–&ÆR†—B&VÆöæw2FòF†V—"6VÆV7FVB6WBâ&V¦V7FVBöæò†—BFöW2æ÷BfÆÂ&6²F‡&÷Vv‚âe$ôåBöfb&WF–ç2÷&–v–æÂ6VÆV7FVBÖöæÇ’÷F‡&÷Vv‚&V†f–÷W"âæòæWr&rWfVçB÷væW"ÂÖöFVÆÆ–ær¶W&æVÂÂF÷öÆöw’VF—B÷"†—7F÷'’6†ævRâe$ôåBöÆ–7’öFVfVÇG2æB66WFVBE$röæf–vF–öâF‡27F’Væ6†ævVBâ–çBæ÷r÷&FW"BÂe$ôåB"ÂE$r2gFW"Æ76òò6VÆV7BâW†—7F–ær–6öâ'Gv÷&²ÂF–ÖVç6–öç2æB76–ær&WF–æVBà ¥&Vg&W6‚Æö÷6RÖ&ö÷G7G&æB&÷F‚&÷WFW2–çFò—B†–æFW‚æB×VÇF’Öf6RÖF—&V7BÓâVæ–f÷&ÒÖ–ç6WB’ÂÇW26†ævVB6†–ÆG&Vââ6V6öæB7FÆR&ö÷G7G&ÖöGVÆR–FVçF—G’6÷VÆB÷F†W'v—6R–ç7FÆÂF†RöÆBvÆö&ÆÇ’wV&FVBf6RG&ç6f÷&Ò&Vf÷&RF†R&W—&VBfW'6–öââÆ76ò7F—2öâã#c²F‡&÷Vv‚ã#RÂ6÷&æW"ã‚ÂÆö÷ãbÂ–çBã#2æB×VÇF’ã3bãã&VÖ–â&÷FV7FVBâ×VÇF’f6R6÷W&6R6†ævW2öæÇ’—G2&ö÷G7G&FWVæFVæ7’U$Âà ¤f—fRæWrFW7G26÷fW"&VÂF‡&VRÖ–â–6¶–ær²–ç7FÆÆVBÆVv7’G&ç6f÷&ÒWfVçB6öç7V×F–öâöââö66ÇVFVB6VÆV7FVBf6RÂ÷&–v–æÂe$ôåBÖöfbF‚Â7GVÂ&Vv–öâ†VÇW"ÂW'6—7FVçB–6¶W"&VgW6ÂÂ&WVW7FVB&–Â÷&FW"æB6–ævÆR&ö÷G7G&U$Â6†–ââæF—fRe$ôåB66WFæ6R&VÖ–ç2VæF–æs²F†—2&W—'2&W&öGV6VB'—72'WBF†RW6W"w2W†7BÖöFVÂ†2æ÷B&VVâ&W&öGV6VB–â6f&’âFòæ÷B6Æ–ÒF†RgVÆÂæF—fRfVÇB&W6öÇfVB6öÆVÇ’g&öÒæöFRFW7G2â–b7F–ÆÂf–Æ–ær&WVW7BF†R&ö¦V7BÇW2W†7BFôÆ76ò÷FööÂ÷6VÆV7F–öâ6öçFW‡Bâ–æ—F–ÂgVÆÂ'Vâ2Ã3C2ó2Ã3CR53¢6Vv‡Bâ–æ6öç6—7FVçB&ö÷G7G&Fö¶VâGW&–ærF†RÆöFW"Ö6†–â&Vg&W6‚æBâ÷fW&Æöö¶VB6†÷'Bã#bF–væ÷7F–2F—FÆRâ7–æ6‡&öæ—¦VB&÷F‚&ö÷G7G&&÷WFW2æBWFFVBF†R7W'&VçB6ö×&—6öâF—FÆRö–ç7G'V7F–öç3²&W6W'fVB†—7F÷&–6ÂWf–FVæ6RFw2â6÷'&V7FVBfö7W6VB6VÆV7F–öâ÷FööÆ&"ö&ö÷G7G&÷&VÆV6RöF–væ÷7F–2'Vâcóc52âf–æÂgVÆÂÆö6Â7V—FR2Ã3Cbó2Ã3Cb52ƒf–ÇW&W2÷6¶—2’âV&Æ—6†VB'VçF–ÖR6c–fcfFVcSfV&cSfF#sƒ–CSF#V33–BÂFW7FVBG&VRs#3c3#“v#cVff#f#“sV66c“v&#cSSs&fâvW2C#sSƒsS#b5T44U52âg&W6‚Æ—fRfWF6†W2öbÆÂb6†V6¶VB6†VÆÂ÷6VÆV7F–öâö&ö÷G7G&õT’÷&÷FV7FVBf–ÆW2'—FRÖÖF6‚Æö6Â6÷W&6Râ6Æ÷VB6‡&öÖR6öæf—&×2ã#ræBf—6–&ÆR&–Â÷&FW"Æ76òò6VÆV7Bòe$ôåBòE$rò–çBÂS‚'WGFöâ—F6‚Âe$ôåBöâòE$röfbâvV$tÂ—2F—6&ÆVB–âF†B'&÷w6W"„tÅõdTäDõ"ôtÅõ$TäDU$U"F—6&ÆVB’Â6òF†—2fW&–f–W2FööÆ&"&VæFW&–æröæÇ’Âæ÷BæF—fR4BõVæ6–Â–6¶–ærâ†÷7FVBF÷öÆöw’C#sSƒsScsRv27F–ÆÂ'Vææ–ærB&ööc²æò†÷7FVB&W7VÇB6Æ–ÖVBâÆö6ÂgVÆÂ2Ã3Cbó2Ã3Cb52âæF—fRe$ôåB&WFW7B&VÖ–ç2&WV—&VC²ã#b6†V6·2"ó2óB527F’&÷FV7FVBà  ¢2ã#‚(	B&WVW7FVB–6öâ÷&FW#²e$ôåB7F–ÆÂd”Â(	Bæ÷fVÖ&W"##` ¤7W'&VçBfö7W3¢&W&öGV6RæF—fR6–ævÆRÕVæ6–Â×FF‡&÷Vv‚×6VÆV7F–öâ&Vf÷&RgW'F†W"–6¶W"6†ævW2âW6W"W‡Æ–6—FÇ’&W÷'G2ã#re$ôåBd”ÂæB–FVçF–f–W26–ævÆRVæ6–ÂF2†æ÷BÆ76òôE$r’âFòæ÷BG&VB&Wf–÷W2æöFRf—‡GW&R56W22æF—fR66WFæ6Râ6¶VBf÷"F†Rf–Æ–æræ&÷†Æ"&ö¦V7BæBW6VgVÂF÷&V6÷&F–ær6öçFW‡C²6÷W&6RÖöFVÂ—2æ÷B–WB7WÆ–VBâW†—7F–æræV&W7BÖ†—BÖ–âF‚æBã#rG&ç6f÷&Ò÷&Vv–öâ÷W'6—7FVçBwV&G2&VÖ–âVæ6†ævVBâVF—BÇ6ò6†V6¶VB&ÖVBf6R6öçG&öÆÆW"ÂÖ–âF6ö×ÆWF–öâÂG&ç6f÷&Ò×Ww&FRÂ&÷FFRÂ&öG’÷–6¶W"vVæW&F–öâæB66VæRö&¦V7B7F—fF–öã²æòæWr&W&öGV6VB&ö÷B6W6RW7F&Æ—6†VBâFòæ÷B6Æ–Òe$ôåBf—‚–âF†—2&VÆV6Rà ¤öæÇ’W6W"Öf6–ær6†ævS¢6VÆV7BòÆ76òòG&ròg&öçBò–çBÂF÷Fò&÷GFöÒâ÷&–v–æÂ'Gv÷&²ÂF–ÖVç6–öç2Â76–æræB†æFÆW'2&WF–æVBâ552÷&FW"6†ævVB–âW†—7F–ærFööÆ&"÷væW#²F÷&"ÆöFW"&Vg&W6†VBâ6†VÆÂ&VÆV6RÖ&¶W'2æB6æöæ–6Â&VÆV6R×fW'6–öâÆöFW"6†–â&Vg&W6†VBFòã#ƒ²Væ6†ævVB–6¶W"ö&ö÷G7G&öÖöFVÆÆ–ærõ–çBôÆö÷ô×VÇF’–ç2&W6W'fVBâW†—7F–ær&–ÂÖ÷&FW"&Vw&W76–öâæ÷r76W'G2F†RW6W"w2&Wf—6VB6WVVæ6S²æò&V†f–÷"76W'F–öâ&VÖ÷fVBâ÷BÖ–â6ö×&—6öâ–ç7G'V7F–öç2æòÆöævW"6Æ–Òe$ôåB&W—&VBà ¥&÷FV7B66WFVBã#bE$rÂE$rÖöfbF—&V7F–öæÂö†öÆBæBf–ævW"æf–vF–öâ6†V6·3²–6öç266WFVBÂæWr÷&FW"v—G2FWf–6R6†V6²âã#RæBV&Æ–W"7WBõ–çB56W2&VÖ–â&÷FV7FVBâ7&2ö×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3÷cÓã3bããVæ6†ævVBâã#r†÷7FVBF÷öÆöw’C#sSƒsScsR—2æ÷r5T44U52Â7WW'6VF–ær—G2V&Æ–W"VæF–ær7FGW2Â'WBe$ôåB—2W‡Æ–6—FÇ’æF—fRd”Âà ¥fÆ–FF–öã¢fö7W6VBCóC53²gVÆÂÆö6Â2Ã3CRó2Ã3Cb52v—F‚F†R6öÆRf–ÇW&R6V6öæBÆVv7’&–ÂÖ÷&FW"76W'F–öâ–âf–Ww÷'BÖ6öçG&öÇ2Ós‚âWFFVBF†B76W'F–öâFòF†R&WVW7FVBæWr÷&FW"Â&WF–æ–ærÆÂ76–æröÆ—7FVæW"ö'Gv÷&²76W'F–öç2â6÷'&V7FVBfö7W6VBC"óC"52â'VçF–ÖR3“63ff3†SCC##“fFfcSƒS#cV#&F#sf2ÂG&VRCSF6c##cffF3scƒv#c“C&cfSs–6C6VCc#sRV&Æ—6†VBFòÖ–ã²vW2C#ssSscS#BæB†÷7FVBF÷öÆöw’C#ssSss#“–æ—F–ÆÇ’'Vææ–ærâæògVÆÂ6÷'&V7FVB×7V—FRöæF—fRe$ôåB526Æ–ÖVBâæW‡C¢W6R7WÆ–VB&ö¦V7BæBW†7BF÷FööÂ÷6VÆV7F–öâ7FFRFò&W&öGV6Re$ôåC²&W6W'fR–æFWVæFVçB6VÆV7F–öâ÷væW'2æB†—7F÷'’âFòæ÷BFBæ÷F†W"6ö×WF–ærö–çFW"†æFÆW"÷"7V7VÆF—fRf–ÇFW&–ærÆ–W"à  ¢ã#‚V&Æ–6F–öâ&ööc¢'VçF–ÖR3“63ff3†SCC##“fFfcSƒS#cV#&F#sf2ÂfÆ–FF–öâ6÷'&V7F–öâ3v3SVc#3&““SV336fV6Scƒ“vS&C362âvW2C#ssSscS#B5T44U52âæ–æR66†RÖ'W7FVBÆ—fRf–ÆW2‡fW'6–öâÂ6†VÆÂÂF÷&"ÂFööÆ&"ÂG&vW"Âf6RÆ–÷WBÂ6ö×&—6öâÂÖ–â–6¶W"æB&÷FV7FVB×VÇF’’'—FRÖÖF6‚FW7FVBÆö6Â6÷W&6RâÆ—fRÖ&¶W"ã#‚â6÷'&V7FVBfö7W6VBC"óC"53²–æ—F–ÂgVÆÂ2Ã3CRó2Ã3Cbv—F‚6öÆRö'6öÆWFR–6öâÖ÷&FW"76W'F–öâ6÷'&V7FVBâ6÷'&V7FVB†÷7FVBF÷öÆöw’C#ssc“c#Cr7F–ÆÂ'Vææ–æræB6÷'&V7F–öâvW2C#ssc“csS2v—F–ærB&ööc²'VçF–ÖR76WG2&R–FVçF–6Â&WGvVVâF†÷6RGvò6öÖÖ—G2âæòæF—fRe$ôåB7V66W72÷"gVÆÂ6÷'&V7FVB7V—FR6Æ–ÖVBâ&VG’FòFW7BöæÇ’–6öâ÷&FW"æBW†—7F–ærE$röæf–vF–öâ6Öö¶Râe$ôåB&VÖ–ç2d”ÂVæF–ærf–Æ–æræ&÷†Æ"æBW†7BF÷FööÂ÷6VÆV7F–öâ&W&öGV7F–öâà  ¢2ã#’(	Be$ôåB6–ævÆR×F&V"FW6VÆV7F–öâ&W—&VB(	Bæ÷fVÖ&W"##` ¥W6W"ã#‚–6öâ÷&FW"52&÷FV7FVC¢6VÆV7BòÆ76òòG&ròg&öçBò–çBâe$ôåB&VÖ–ç2W6W"d”ÂF‡&÷Vv‚ã#ƒ²6Æ&–f–VBW†7B6WVVæ6S¢FVç6VÆV7FVBg&öçBf6R–âg&öçBöb6VÆV7FVB&V"f6R&VÖ÷fW2&V"–ç7FVBöbFF–ærg&öçBâWÆöFVBe$ôåBd”Âæ&÷†Æ"6öæf—&×2÷&F–æ'’f—'7BÖ÷Vâ‚×fW'FW‚ób×VB7V&RB²òÓãRv—F‚7FæF&BF÷öÆöw’âWÆöFVB&ö¦V7B&VÖ–ç2&—fFRæB—2æ÷B6öÖÖ—GFVBâVF—BÖ–âS–c†VC33&ccSF#6ScVff–#3&#v#6#C&RæB7W'&VçBÆöFW"w&‚&Vf÷&R6†æv–ær6öFRà ¥&W&öGV6VB6W6S¢7&2ö6ö×öæVçB×F×FövvÆRæ§2—2–ç7FÆÆVB'’7&2öF—&V7BÖ&WfVÂæ§2BFö7VÖVçB6GW&Râ—G2f6R†—B†VÇW"&–67G2öæÇ’6VÆV7FVBf6W2Âf–æG2&V"Â&VÖ÷fW2—B–ÖÖVF–FVÇ’æB7F÷–ÖÖVF–FU&÷vF–öâ&WfVçG2Ö–âFF–ærg&öçBâF†—2—2F–ffW&VçBÆ—fR÷væW"g&öÒã#rG&ç6f÷&Ò÷&Vv–öâ÷W'6—7FVçB†æFÆW'3²&Wf–÷W2FW7G2öÖ—GFVB—BâW†—7F–ær6VÆV7FVBÖ6ö×öæVçB÷væW"æ÷rW6W2WF†÷&—FF—fR'&–FvRç–6²‚vf6RrÆWfVçB’VæFW"e$ôåBæBöæÇ’6öç7VÖW26VÆV7FVB&–Ö'’f—6–&ÆRf6RâçVÆÂ÷&V¦V7FVB÷"Vç6VÆV7FVBf—6–&ÆR†—B––VÆG2v—F†÷WB6VÆV7FVBÖöæÇ’fÆÆ&6²âe$ôåBöfb¶VW2÷&–v–æÂ&V†f–÷#²fW'FW‚ôVFvR†VÇW'2ÂG&ç6f÷&×2öF—&V7B×FööÂvFW2ÂvW7GW&RF–Ö–ærÂvVöÖWG'’ö†—7F÷'’æB66WFVBE$röæf–vF–öâVçF÷V6†VBâæòæWrö–çFW"†æFÆW"÷"ÖöFVÆÆ–ær¶W&æVÂà ¥F‡&VRæWrFW7G2ÆöBF†RgVÆÂ7GVÂ6ö×öæVçB×F÷væW"BFö7VÖVçB6GW&Rv—F‚&VÂÖ–âF‡&VR&–67G2æBvVæW&FVB÷&F–æ'’7V&RÖF6†–ærWÆöFVBF÷öÆöw’÷66ÆRâÆÂ6—‚f–Wwö–çG2&W6W'fR6VÆV7FVB&V"v†–ÆRFF–ærg&öçBÂF†VâFövvÆRöæÇ’F†R6VÆV7FVBf—6–&ÆRf6Röfbâ&V¦V7FVBÖ–â†—B6ææ÷BfÆÂF‡&÷Vvƒ²e$ôåBÖöfbÆVv7’F‚&WF–æVBâ×WFF–öâ&W7F÷&W2öÆB†VÇW"æB&W&öGV6W2W†7B&V"FW6VÆV7F–öââÖW6‚æBVæFòõ&VFòVæ6†ævVBâF÷vç7G&VÒ6VÆV7F–öâ7F÷&vR÷&VæFW"—26öçG&öÆÆVC²æ÷BæF—fR6f&’õvV$tÂ66WFæ6R6Æ–ÒâW†—7F–ærVFvR6VÆV7FVBÖ6ö×öæVçBFW7G27F’7F—fRà ¤66†R6Æ÷7W&S¢6ö×öæVçB×F×FövvÆRÓâF—&V7BÖ&WfVÂÓâ6†VÆÂBã#“²6†VÆÂ÷&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"&Vg&W6†VB6æöæ–6ÆÇ’â66WFVBFööÆ&"÷F÷&"ã#‚6÷W&6R÷–ç2&VÖ–ââÖ–âÂ6VÆV7F–öâöÆ–7’Â×VÇF’ã3bããÂF‡&÷Vv‚ã#RÂ6÷&æW'2ã‚ÂÆö÷ãbÂ–çBã#2Væ6†ævVBâ÷BÖ–â6ö×&—6öâ–ç7G'V7F–öç2WFFVBÂ&–÷"†—7F÷&–6ÂWf–FVæ6R&WF–æVBâ&Wf–WvVB76WB†6†W2WFFVBöæÇ’f÷"6†ævVB6÷W&6W2æBÆöFW"¶W—2à ¤fö7W6VBSróSr53²gVÆÂÆö6Â2Ã3C’ó2Ã3C’52ƒf–ÇW&W2÷6¶—2’Â7–çF‚æBv—BF–fbÒÖ6†V6²6ÆVââV&Æ–6F–öâVæF–ærâ&Wf–÷W2ã#‚6÷'&V7FVB†÷7FVBF÷öÆöw’C#ssc“c#CræBvW2C#ssc“csS2&÷F‚5T44U53²ã#‚–6öâÖ÷&FW"W6W"52&VÖ–ç2&÷FV7FVBâæF—fRe$ôåB66WFæ6R&VÖ–ç2VæF–ærâFWf–6S¢6VÆV7B7V&Rf6RÂ÷&&—B—B&V†–æB÷÷6—FRVç6VÆV7FVBf6RÂFg&öçB†&÷F‚6VÆV7FVB’ÂFg&öçBv–â‡&V"&WF–æVB“²E$ræBf–ævW"÷&&—B÷â÷–æ6‚6Öö¶RâæW‡BföÆÆ÷w2æF—fRfVVF&6³²66WFVB–6öâ÷&FW"æBã#bvW7GW&RôE$r56W2&VÖ–â&÷FV7FVBà  ¢ã#’V&Æ–6F–öâfW&–f–VC¢'VçF–ÖRfVSFf&F&#fC#S#S3SScCfS““#f3†FCC‚ÂFW7FVBG&VRSf#ƒ†FCS66&Cc3ƒ#&FCc–6ccsƒ&#†6f3c’âvW2C#ssƒC#ƒc’5T44U53²ÆÂ66†RÖ'W7FVBÆ—fR6†VÆÂ÷&W—&VBöÆöFW"÷&W6VçFF–öâ÷&÷FV7FVBf–ÆW2'—FRÖÖF6‚FW7FVBÆö6Â6÷W&6RâÆ—fRã#’âgVÆÂÆö6Â2Ã3C’ó2Ã3C’53²fö7W6VBSróSr53²æòf–ÇW&W2÷6¶—2â†÷7FVBF÷öÆöw’C#ssƒCCs7F–ÆÂ'Vææ–ærB&ööbÂ6òæò†÷7FVB&W7VÇB6Æ–ÖVBâæF—fRe$ôåB&WFW7B&VÖ–ç2VæF–æs²W6W"–6öâ÷&FW"52æB&Wf–÷W2E$röæf–vF–öâ56W2&÷FV7FVBâ&VG“¢&V"f6R6VÆV7FVBÂ÷&&—B&V†–æBVç6VÆV7FVBg&öçBÂFg&öçBFG2—Bv—F†÷WB&VÖ÷f–ær&V"ÂFg&öçBv–â&VÖ÷fW2öæÇ’g&öçC²E$röæf–vF–öâ6Öö¶RâFòæ÷B–æfW"æF—fR66WFæ6Rg&öÒæöFR6†V6·2à  ¢2ã3(	B6VÆV7F–öâ÷fW&Æ’Â7V'G&7F—fRE$rÂF×Fò×FööÇ2V6²æB6ö×7B&F–Ç2(	Bæ÷fVÖ&W"##` ¥W6W"ã#’e$ôåB52&÷FV7FVBÂÆöærv—F‚ã#‚–6öâ÷&FW"6VÆV7BòÆ76òòG&ròg&öçBò–çBæB&Wf–÷W2æf–vF–öâö†—7F÷'’õ–çBö7WB56W2âW6W"&WVW7G2–çFVBÖf6RF÷V&ÆR×7W&f6R'FVf7B&W—"ÂE$rFW6VÆV7F–öâÂV6²gFW"F†Rf—'7B6ö×ÆWFVBG&rv—F‚FÖöæÇ’W†—BFò6öçFW‡GVÂFööÇ2ÂæB6ö×7B6—&7VÆ"g&ÖW2f÷"fW'FW‚ôVFvRôf6Rôö&¦V7Bõ–çB&F–Ç2âVF—B7W'&VçBÖ–âv3FC“V3“†##“ƒsf#†#FffFf&cC#VC&c²6†&VB6VÆV7F–öâÂvÇ—‚æBWfVçB÷væW'2&WF–æVBà ¤÷&–v–æÂÖ–â6VÆV7FVDÖFW&–Âv2W†7FÇ’6÷Ææ"v—F‚F†R&öG’÷–çFVB7W&f6RæBw&÷FRFWF‚â—Bæ÷rW6W2æVvF—fRöÇ–vöâöfg6WBæBæòFWF‚w&—FW2Â&WF–æ–ærFWF‚FW7F–ærÂ÷6—G’Â6öÆ÷W"æBF÷V&ÆU6–FRâæòvVöÖWG'’Âæ÷&ÖÇ2ÂUbÂÖÂÖFW&–ÂW‡÷'B÷"†—7F÷'’6†ævW2âF†—2&VÖ÷fW2F†R–FVçF–f–VB6÷Ææ"ÖFWF‚6öæfÆ–7C²æF—fR–çFVB6VÆV7F–öâV&æ6R&VÖ–ç2FWf–6RvFRÂæ÷BæöFR&7FW"ôuR&ööbà ¤W†—7F–ærVFvR×–çB×6VÆV7B÷vç2f6RE$rââVç6VÆV7FVBf—'7B†—BFG2f÷"F†Rv†öÆR7G&ö¶S²6VÆV7FVBf—'7B†—B7V'G&7G2f÷"F†Rv†öÆR7G&ö¶Râ&RÖ7&÷76–ærf6W2æWfW"FövvÆW2âW†—7F–ær6×ÆRö6öÆW66–ærö&F6†VB6VÆV7F–öâ÷væW"Âe$ôåBf—6–&–Æ—G’Â6æ6VÆÆF–öâ&öÆÆ&6²Â6ÖRÖ6öçFW‡BwV&BÂ6öçG&öÇ2æB†—7F÷'’&R&WF–æVBâF†RV&Æ–W"6VÆV7FVB×6VVBÖÇv—2ÖFBW‡V7FF–öâ—27WW'6VFVBW‡Æ–6—FÇ’'’F†—2&WVW7FVBFW6VÆV7F–öâ&V†f–÷"â†—7F÷&–6ÂFW7G2æ÷rW6RâVç6VÆV7FVB6VVBf÷"FBö6æ6VÆÆF–öâ6†V6·2æB6öçF–çVR6†V6¶–æröæRV&Æ–6F–öâW"6×ÆS²æWr7V'G&7F–öâ6†V6·2¶VW÷F†W"6VÆV7F–öç2–çF7BÂ&W6W'fR&VFòÂ6æ6VÂW†7FÇ’æB6÷fW"W&6–ærÆÂà ¥6VÆV7F–öâ–çWB÷væW"7F÷&W26W76–öâÖöæÇ’&VG’V6²gFW"6ö×ÆWFVB7G&ö¶RÖ÷f–ærãÓB552‚Â66÷VBFòÖW6‚öö&¦V7BâE$r7F—2öââ÷&–v–æÂv—¦Öò6†÷w2öæÇ’—G2÷&–v–æÂV6³²6VÆV7F–öâÖ6VçG&R&ö¦V7F–öâ&VÖ–ç2WF†÷&—FF—fRÂv—F‚Æ7B7G&ö¶R67&VVâ÷6—F–öâv†VâV×G’â6ÖÆÂV6²Ö÷væVB&–æFW"&V6övæ—6W2ö–çFW'WF2ƒÃ‡‚Âæò&Wf–÷W2F‡&W6†öÆBÖ÷fVÖVçB’Â&VgW6W2G&rö6æ6VÂöÆ÷7B6GW&R÷7FÆRæ6†÷"æB7W÷'G2¶W–&ö&B7F—fF–öââFW†—G2E$rF‡&÷Vv‚6WDG&r†fÇ6R’ÂF†Vâ÷&–v–æÂ6WD‡V%7FFR‚wFööÇ2r’÷Vç2F†R6öçFW‡GVÂ&–ærâV×G’6VÆV7F–öâ6â6†÷rF—6&ÆVBFööÇ2BF†R6ÖRæ6†÷"â6æ6VÂF†R&Wf–÷W2$b&Vf÷&R7–æ6‡&öæ÷W27–æ26òF†—2FöW2æ÷B7&VFR6V6öæBv—¦Öòg&ÖRÆö÷âæòGWÆ–6FR6çf26VÆV7F–öâÂÖöFVÆÆ–ærÂG&ç6f÷&Ò÷"†—7F÷'’÷væW"à ¤æWr&F–ÂÖ6ö×7Bæ772—2F†Rf–æÂ&W6VçFF–öâ÷væW"÷fW"÷&–v–æÂ–6öâ'Gv÷&²â÷&–v–æÂs"ÖöFVÆÆ–ær'WGFöç2÷F&vWG2öævÆW2&VÖ–âÂ–æ6ÇVF–ærW‡G'VFR"ò&WfVÂ2æBd4Tu$õUÖ–BF–W"âæ÷&ÖÂ–ææW"öÖ–Bö÷WFW"&F–’ƒó3Bó“B552ƒ²C‚6—&7VÆ"–6öâg&ÖW2Â#‡‚'Gv÷&²æBS'ƒSbF&vWG2v—F‚Gvò6ÖÆÂ6F–öâÆ–æW2â÷fW&ÆÂv–FW7B÷WFW"fö÷G&–çBSCbÓãCC‚‡ã’R&VGV7F–öâ’âÆÂs"&V7FævÆR—'26†V6¶VBf÷"æò÷fW&Æâ÷&–v–æÂgVÆÂæÖW2&W6W'fVB–â6F–öâö&–ÖÆ&VÂ÷F—FÆRöâF†R6ÖR'WGFöç3²æò7F–öâ&WÆ6VÖVçBâ6ö×7BÖöFR&WF–ç2—G2÷&–v–æÂFF—fRÆ6VÖVçBÂF&vWB6—¦–æræBÆ&VÇ2ÖöfböÆ–7’Â–æ6ÇVF–ær¦W&òÖÖ&v–âW‡G&Öæ'&÷rw&–BF–ÆW2âF†RW†—7F–ær6ö×7B÷væW"&VG2æWr–çBv†VVÂÆ–÷WB×6—¦RÖWFFF6òF†S#“'‚6÷W&6R6ö÷&F–æFW2&Ræ÷B66ÆVB÷6†–gFVB6V6öæBF–ÖS²ÆVv7“3S‚fÆÆ&6²—2&WF–æVBâ6ö×7BÖFW&–Â7vF6‚&VÖ–ç2f—6–&ÆRâ–çBW6W2÷&–v–æÂFVâ'WGFöç2B6VçG&SCb÷&F—W3B–â#“'‚v†VVÂ‡v33S“²÷&–v–æÂ6öçG&öÇ2öG&r†æFÆRöÖFW&–Â7vF6‚&WF–æVBâFö72÷&F–Â×&Wf–WrÓ3æ‡FÖÂ—2vVæW&FVB&W6VçFF–öâvÆÆW'’W6–ær÷&–v–æÂ&–ær÷–çBÖ&·WÂvÇ—‚552æBæWrf–æÂ7G–ÆW6†VWC²æ÷B6V6öæBö–çFW&7F–öâ–×ÆVÖVçFF–öâà ¤6†ævVB÷væW'2æBF†V—"&WfW'6RÆöFW"6Æ÷7W&R&Vg&W6†VBFòã3Â–æ6ÇVF–ær6ö×7BÖÆ–÷WBÂ6VÆV7F–öâöÆ–7’ÓâFööÆ&"ÓâF÷&"Â6†&VB&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"ÂÖ–âöv—¦Öò÷–çB6VÆV7F÷"÷f–Ww÷'B–çFW"âGvòæWrv—¦Öò†VÇW"–×÷'G2æBf–æÂ552†fR&Wf–WvVB76WB6öçG&7G2â&÷FV7FVB×VÇF’G&ç6f÷&Òã3bããÂF‡&÷Vv‚ã#RÂ6÷&æW'2ã‚ÂÆö÷ãbÂ6ö×öæVçBFã#’æBÆÂvVöÖWG'’¶W&æVÇ2Væ6†ævVBâæòöÆB76WB–â6ÆVçWâ÷&–v–æÂW"ÖÖöFR'Gv÷&²6†VWG2&WF–æVB2vÇ—‚÷væW'2à ¥fÆ–FF–öâ6òf#¢fö7W6VB&F–Â÷6VÆV7F–öâ÷6W76–öâ6†V6·253²f–æÂ&VÆV6R÷6VÆV7F–öâ'VâS2óS252Â–æ6ÇVF–ær‚æWr&Vf–æVÖVçBöÆ–÷WB66W2â–æ—F–ÂgVÆÂÆö6Â2Ã3Sró2Ã3Sr53²6ö×7BæF—fRÖ6ö÷&F–æFRöw&–B&W6W'fF–öâföÆÆ÷r×Wfö7W6VC‚ó‚53²f–æÂgVÆÂÆö6Â2Ã3S‚ó2Ã3S‚52ƒf–ÇW&W2÷6¶—2’Â¥27–çF‚æBv—BF–fbÒÖ6†V6²6ÆVââ'VçF–ÖRV&Æ–6F–öâfW&–f–VB&VÆ÷s²'&÷w6W"f—7VÂ&Wf–Wr&Æö6¶VB2&V6÷&FVB&VÆ÷râ'&÷w6W"6ææ÷B&V6‚W†V7WF÷"Æö6Æ†÷7C²f—7VÂvÆÆW'’v–ÆÂ&R&Wf–WvVBöâ†÷7FVB&VÆV6RâæòæF—fR6f&’õVæ6–ÂôuR66WFæ6R6Æ–ÖVBâFWf–6Rã3¢6VÆV7B–çFVBf6Rö÷&&—BæB6†V6²7F&ÆR†–v†Æ–v‡C²E$rFB÷&VÖ÷fR÷&RÖ7&÷73²V6²gFW"7G&ö¶RÂG&rV6²7F—2E$rÂFV6²÷Vç2FööÇ3²–ç7V7BÆÂf—fR6ö×7BÖVçW2æBÆVæ6‚öæRW†—7F–ærFööÂV6‚âæW‡BföÆÆ÷w2W6W"fVVF&6²âã#’52æB–6öâÖ÷&FW"52&R&÷FV7FVBà  ¢ã3V&Æ–6F–öâfW&–f–VC¢'VçF–ÖRsFFC&##ƒCSfcs†3&3“fF#&#c“†c†3f3vf"ÂFW7FVBG&VR3SFFCƒ“s6C“SccV3c3#ƒFCƒsV3FC##RâvW2C#s“S#cCsr5T44U52âÆÃ#66†RÖ'W7FVBÆ—fR6†VÆÂö6†ævVBöÆöFW"övÆÆW'’÷&÷FV7FVBf–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6RÂ–æ6ÇVF–ær&W—&VBE$röÆ–7’÷V6²Âf–æÂ552ÂÖ–â6VÆV7F–öâÖFW&–ÂæB&÷FV7FVBã#’6ö×öæVçBFô×VÇF’÷F÷öÆöw’6÷W&6W2âgVÆÂf–æÂÆö6Ã2Ã3S‚ó2Ã3S‚52ƒf–ÇW&W2÷6¶—2’Â7–çF‚æBF–fb6ÆVââ†÷7FVBF÷öÆöw“C#s“S#scr7F–ÆÂ'Vææ–ærB&ööc²æò†÷7FVB526Æ–ÖVBà ¥f—7VÂÆ–Ö—FF–öã¢W†V7WF÷"Æö6Æ†÷7Bv2Vç&V6†&ÆRg&öÒ6Æ÷VB'&÷w6W#²7V'6WVVçB'&÷w6W"vR7V—6—F–öâv2&Æö6¶VB'’F†R'&÷w6W"U$Â6V7W&—G’öÆ–7’â7F÷VB'&÷w6W"v÷&²v—F†÷WBöÆ–7’v÷&¶&÷VæG2âæò'&÷w6W"f—7VÂ÷"æF—fR6f&’ôuRõVæ6–Â66WFæ6R6Æ–ÖVBâvVæW&FVB&W6VçFF–öâvÆÆW'’—2V&Æ—6†VBf÷"F—&V7B&Wf–WrÂ'WBWFöÖFVB&V7FævÆR6†V6·2Fòæ÷BW7F&Æ—6‚f—7VÂöÆ—6‚÷"&÷fRF†R–çFVBÖf6R—†VÂ&W—"âFWf–6RvFR&VÖ–ç3¢–çFVB6VÆV7F–öâö÷&&—C²E$rFBæB7V'G&7B'’6VVC²V6²V'2gFW"7G&ö¶RæBG&r¶VW2E$s²FVçFW'2FööÇ3²–ç7V7BöÆVæ6‚FööÇ27&÷72fW'FW‚ôVFvRôf6Rôö&¦V7Bõ–çBæBæ'&÷r×æRÆ–÷WBâ'V–ÆBã36ö×ÆWFRæBÆ—fRÂ&VG’f÷"F†W6R6†V6·2âW6W"ã#’e$ôåBæBã#‚–6öâÖ÷&FW"56W2&÷FV7FVBà  ¢2ã3B(	B6Æ÷6W"&–æw2æBÖ÷f&ÆR&F–ÂÖVçW2(	Bæ÷fVÖ&W"##` ¤VF—B&6VÆ–æRÖ–â6c&FSvc3&S6Cc&Vc636cC63CFc3VFFV6#3Sc–2‚ã32’âW6W"&WVW7G2F–v‡FW"÷&&—G2–âÆÂÖöFW2Â6—&7VÆ"6VçG&Â–çB6öçG&öÇ2Ââ'&÷rÖ÷fR†æFÆR&÷fRF†÷6R6öçG&öÇ2ÂF†VâF†R6ÖRG&r6&–Æ—G’–âfW'FW‚ôVFvRôf6Rôö&¦V7Bâã32æF—fR66WFæ6R—2äõB–æfW'&VBâV&Æ–W"W6W"ã3"òã3òã3òã#’56W2&VÖ–â&÷FV7FVBà ¤WF†÷&—FF—fR÷væW'2&WF–æVC¢f–æÂ&F–ÂÖ6ö×7Bæ7726öçG&öÇ2&W6VçFF–öâÂF÷FÂÖv—¦Öò÷vç2ÖöFVÆÆ–ær–6¶W"&ö¦V7F–öâÂf–Ww÷'B×–çB÷vç2–çBÆ6VÖVçBæB—G2W†—7F–ær&VÆF—fRG&röfg6WBâÆÂs"ÖöFVÆÆ–ærFööÇ2æB–çBF&vWG2Â÷&–v–æÂ'Gv÷&²ö7F–öç2Â&–Ö'’æwVÆ"6Æ÷G2„W‡G'VFS"ô&WfVÃ2’ÂÖFW&–Â7vF6‚æB6VçG&R6öçG&öÇ2&VÖ–ââÖöFVÆÆ–æræ÷&ÖÂ–ææW"&F—W3s‚‡v3ƒ’Âf6RôVFvR÷WFW#c‚‡v3sb’ÂfW'FW‚ôö&¦V7CSR‡v3c“²SƒSBF&vWG2v—F‚Væ6†ævVCC‚6—&7VÆ"g&ÖW2ó#‡‚'Gv÷&²æBGvò6F–öâÆ–æW2â–çC#c‡‚v†VVÂ‡v3#“"’Â6VçG&S3B÷&F—W3bÃC‡ƒS"F&vWG2v—F‚Væ6†ævVBg&ÖW2ö'Gv÷&²â6ö×7BæF—fR6ö÷&F–æFW2æB&÷VæG2WFFVBFövWF†W#²W‡G&Öæ'&÷r&WF–ç2÷&–v–æÂ6ÖRÖ'WGFöâw&–Bâ—'v—6RF&vWB6†V6·2&VÖ–â7F—fRâV&Æ–W"76–ær—FW&F–öç2÷fW&ÆVBF&vWG3²öæÇ’F†RfÆ–FFVBf–æÂF–ÖVç6–öç26†—à ¥–çB6VçG&RW‡Æ–6—FÇ“SgƒSb6—&7VÆ"Âv—F‚–æFWVæFVçC3'‚f÷W"Ö'&÷rÖ÷fR'WGFöâ&÷fR—BâW†—7F–ær–çBG&r÷v–æF÷r6GW&RæB&ö¦V7FVBö&¦V7BföÆÆ÷v–ær&VÖ–âVæ6†ævVBâ6öçG&öÇ2×æVÂ†æFÆR&WF–ç2—G2÷&–v–æÂ66W76–&ÆRÆö6F–öââæWr6ÖÆÂ&F–ÂÖÖ÷fR†VÇW"÷vç2ôäÅ’ÖöFVÆÆ–ærÖ÷fRÖ'WGFöâ6öçF7G2Bv–æF÷r6GW&RÂv—F‚–æFWVæFVçB6W76–öâöfg6WG2W"ÖöFRâö–çFW'W6öÖÖ—G2F†R&W6VçFF–öâöfg6WC²6æ6VÂöÆ÷7B6GW&R÷7FÆRÖöFR&W7F÷&W2&Wf–÷W2öfg6WBâ÷F†W"ö–çFW"”G2&R–væ÷&VBâFööÇ2ÖöæÇ’&ö¦V7F–öâFG2öfg6WB&Vf÷&Rf–Ww÷'Bf—GF–æs²G&ç6f÷&×27F’öâ6VÆV7F–öââ6Æ÷6–ær÷&V÷Væ–ær&–ær&WF–ç2—G2ÖöFRöfg6WC²6ÖW&æf–vF–öâ6öçF–çVW2föÆÆ÷v–ær6VÆV7F–öââæòvVöÖWG'’ÂF÷öÆöw’Â†—7F÷'’Â6VÆV7F–öâÂæf–vF–öâ÷"&VæFW&W"÷væW"6†ævW2â&÷FV7FVB×VÇF“ã3bããæB66WFVBF÷öÆöw’ôe$ôåBôE$rõ–çB¶W&æVÇ2VçF÷V6†VBà ¥&VÆV6Rã3BÖ&¶W'2æB6†ævVB6†VÆÂ–ç2&Vg&W6†VBÂ–æ6ÇVF–ær6ö×7B552ô¥2Âf–æÂ&F–Â552ÂF÷FÂÖv—¦ÖòÓâ&F–ÂÖÖ÷fRæBf–Ww÷'B×–çBâ6æöæ–6Â&VÆV6R×fW'6–öâòf6Rv÷&¶fÆ÷ròG&vW"æB÷BÖ–â6ö×&—6öâ66†Rw&‚Æ–væVBâ&Wf–WvVB76WB†6†W2WFFVBöæÇ’f÷"6†ævVB÷væW'2÷–ç2âW†—7F–ær&F–Âö6ö×7B6ö÷&F–æFRFW7G2WFFVBf÷"W‡Æ–6—FÇ’&WVW7FVBF–ÖVç6–öç3²7GVÂ–6¶W"÷G&ç6f÷&Ò&÷WF–ær†&æW72W6W2÷&–v–æÂÖ÷fR†VÇW"âæWrFW7G26÷fW"W"ÖÖöFRöfg6WG2ÂÖöFVÂ×&VÆF—fR&ö¦V7F–öâÂVç&VÆFVBö–çFW'2Â6æ6VÆÆF–öâæB7FÆRÖöFRâgVÆÂfÆ–FF–öâ÷V&Æ–6F–öâ7FGW2föÆÆ÷w2&VÆ÷s²æòæF—fR6f&’õVæ6–Âf—7VÂ66WFæ6R6Æ–ÖVBà ¤FWf–6Rã3C¢–ç7V7B6Æ÷6W"fW'FW‚ôVFvRôf6Rôö&¦V7Bõ–çB&–æw2æB6F–öç3²G&rf÷W"Ö'&÷r†æFÆW2ÂF†Vâ÷&&—B÷â÷¦ööÒFò6†V6²6öçF–çVVBföÆÆ÷v–æs²6Æ÷6R÷&V÷VâæB6†ævRÖöFW3²–çB6—&7VÆ"6VçG&R÷Vç27W'&VçB6öçG&öÇ2æB''W6‚öÖFW&–Â7G&ö¶W27F–ÆÂv÷&³²ÆVæ6‚W‡G'VFRô&WfVÂæB6†V6²G&ç6f÷&Òæ6†÷'2ÇW2VæFòõ&VFòâæW‡BföÆÆ÷rW6W"52ôd”Ã²ã32æBã3Bf—7VÂ66WFæ6R&VÖ–âVæF–ærà ¥fÆ–FF–öâã3C¢gVÆÂÆö6Â2Ã3sBó2Ã3sB52ƒf–ÇW&W2÷6¶—2’Âfö7W6VCs2ós253²f–æÂ÷&–v–æÂ×6Æ÷B&W7F÷&F–öâæB&Wf–WvVB76WG2÷&÷WF–ær6†V6·3CóC52Âf–æÂ552÷&VÆV6S‚ó‚53²¥27–çF‚æBF–fb6ÆVââV&Æ–W"7V—FR'Vç2W‡÷6VBFW7B×6Æ–6R–æ—F–Æ—¦F–öâ77V×F–öç2æB7FÆR&Wf–WvVB–ç3²÷&–v–æÂ&–æBÆ6VÖVçBö66†Rw&‚vW&R6÷'&V7FVBÂv—F‚æòvVöÖWG'’76W'F–öâ&VÖ÷fVBâ&Wf–÷W2ã32†÷7FVBF÷öÆöw“C#“c#c#SRæBvW3C#“c#S3C‚&÷F‚5T44U52âV&Æ–6F–öâfW&–f–6F–öâVæF–æs²æF—fR•Bf—7VÂõVæ6–Â66WFæ6R&VÖ–ç2VæF–ærà ¥V&Æ–6F–öâã3BdU$”d”TC¢'VçF–ÖR#3ƒCƒƒCvSVS&f3SSCVS3fSvf36S33svRÂFW7FVBG&VS6ƒCs#cVSƒCc#3#†Sc6f3“ƒf&&Sf63RâvW3C#“ss#ƒr5T44U52âÆÃ266†RÖ'W7FVBÆ—fR6†VÆÂö6†ævVBöÆöF–ær÷&÷FV7FVBf–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6R†Fö72÷V&Æ–6F–öâÓ3Bæ§6öâ’â&W÷6—F÷'’Ö–â&VÆV6RÖ&¶W'2÷–ç2W‡Æ–6—FÇ’fW&–f–VC²×VÇF“ã3bãã&W6W'fVBâ†÷7FVBF÷öÆöw“C#“ss3#Scr&VÖ–ç2–â&öw&W72BF†—2&ööc²æò†÷7FVB526Æ–ÖVBâgVÆÂÆö6Ã2Ã3sBó2Ã3sB52ÇW2f–æÂfö7W6VB6†V6·2&V6÷&FVB&÷fRâ'V–ÆBã3B—26ö×ÆWFRÂÆ—fRæB&VG’f÷"FWf–6RFW7F–æs²æF—fRf—7VÂõVæ6–Â66WFæ6R&VÖ–ç2VæF–ærà ¢2ã3R(	B6¶WF6‚ÖÆVB6¶VB&F–Ç2æB6†FVB6VçG&RG&r&–æw2(	Bæ÷fVÖ&W"##` ¥W6W"ã3B52—2&÷FV7FVB‡&VÆF—fRÖVçRG&vv–æröföÆÆ÷v–ærÂ–çB6—&7VÆ"6öçG&öÇ2ÂÆÂFööÂ7F–öç2’âVF—B7W'&VçBÖ–â3Fcs6FC“###&3sVc3s3fVS“&F6Vc–f2æBWÆöFVB”ÔuóƒC3’6¶WF6ƒ²W†—7F–ærf–æÂ552Â6ö×7BÖÆ&VÂFV6÷&F÷"ÂF÷FÂÖv—¦Öò&ö¦V7F–öâÂ–çBG&r÷væW"æB÷&–v–æÂFööÂÖ6VçG&R7F–öç2&WF–æVBâW6W"W‡Æ–6—FÇ’&WVW7G27FvvW&VBF–v‡FW"÷&væ—6F–öâæBÆ–v‡Bw&W’6öçF–çV÷W26†FVBG&r&–ærv—F‚6&F–æÂ'&÷w2&÷VæBF†R6VçG&R–âÆÂf—fRÖöFW2âFòæ÷B&W7F÷&RF†R6W&FR&÷fRÖ6VçG&RÖ÷fR'WGFöç2â6VçG&R‚6Æ÷6W2ÖöFVÆÆ–ærÖVçW3²÷&–v–æÂ–çB6VçG&R÷Vç27W'&VçB''W6‚6öçG&öÇ2à ¥6ÖSs"ÖöFVÆÆ–æræC–çBF&vWG2ÃC‚6—&7VÆ"g&ÖW2ó#‡‚vÇ—‡2æBgVÆÂ6F–öç2÷FööÇF—2&WF–æVBâ÷&–v–æÂ&–Ö'’W‡G'VFS"ô&WfVÃ2æBFööÂ÷&FW"&VÖ–ââW†—7F–ærÆ&VÂFV6÷&F÷"æ÷rV&Æ—6†W2&W6VçFF–öâÖöæÇ’6¶VB…’f&–&ÆW3¢–ææW#ƒG‚†ÆÆ÷w26VçG&RæçVÇW26ÆV&æ6R’Â÷WFW#bÖF—&V7F–öâ7FvvW&VBVçfVÆ÷R²òÓ3E‚Â²òÓC’v—Fƒ"F–vöæÂæCSb6†÷VÆFW"6ö÷&F–æFW3²7'6RfW'FW‚ævÆW2–çFW'öÆFRv—F†–âF†R6ÖR÷&FW&VBW&–ÖWFW"âgVÆÂæ÷&ÖÃSƒSB&V7FæwVÆ"†—B&V2&VÖ–âF—6¦ö–çBâVçfVÆ÷S3‡ƒ33BfW'7W33ƒgƒ3“–âFVç6Rã3BÖöFW2‡ã#’ãRRÆW72&÷VæF–ær&V’Âv—F†÷WB6ÖÆÆW"–6öç2â–çBW6W3#S'‚v†VVÂÂ6VçG&S#bæBFVâW‡Æ–6—B7FvvW&VBöfg6WG3²W†—7F–æsC‡ƒS"F&vWG2&WF–æVBâ6ö×7BW6W26ÖR6¶VB6ö÷&F–æFW2CC‚&÷VæC²÷&–v–æÂÃÓC‚6ÖRÖ'WGFöâw&–B&VÖ–ç2Âv—F‚w&÷WVB6VçG&R÷&–ær&÷fRF†RÖöFR×7V6–f–2w&–BæBÖF6†–ærÆ6VÖVçB&÷VæG2â6†÷'BæW2Ö’æVVB67&öÆÆ–æröf–Æ&ÆR76S²æòæF—fRF–ç’×æR66WFæ6R–æfW'&VBà ¤V6‚÷&–v–æÂG&r'WGFöâ—2æ÷râ5dsCG‚Ö÷WFW"ó3‚Ö–ææW"WfVæöFBæçVÇW2Â6†FVBÆ–v‡Bw&W’v—F‚f÷W"6ÖÆÂ'&÷w2â'WGFöâæB5dr&6¶w&÷VæG2&Rö–çFW"×G&ç7&VçC²ôäÅ’f–ÆÆVBæçVÆ"F‚&V6V—fW2–çWBâ6VçG&R6—&6ÆSSg‚6—G2–âF†RG&ç7&VçB†öÆRæB&WF–ç2—G2÷&–v–æÂ6W&FRWfVçB÷væW#²'&÷w2&RFV6÷&F—fRâF†—2fö–G2&V7FæwVÆ"G&r÷fW&Æ—27vÆÆ÷v–ær6VçG&RF2â–çB&–ærFVÆVvFW2FòW†—7F–ær&Vv–âöÖ÷fRöVæB&F–ÂG&s²ÖöFVÆÆ–ær&–ærFVÆVvFW2Fò66WFVBã3BW"ÖÖöFR&VÆF—fRÖöfg6WB†VÇW"Væ6†ævVBâ6ÖW&ÖföÆÆ÷v–ærÂ6Æ÷6R÷&V÷Vâöfg6WG2Âö–çFW"6GW&Rö6æ6VÆÆF–öâæBG&ç6f÷&Òæ6†÷'2&VÖ–âv—F‚÷&–v–æÂ÷væW'2âæòæWrvW7GW&R÷væW"ÂvVöÖWG'’Â6VÆV7F–öâÂ†—7F÷'’Â&VæFW&W"÷"ÖöFVÆÆ–ær¶W&æVÂâ×VÇF“ã3bããÂe$ôåBôE$r÷V6²Â7WBö6÷&æW"æB–çB¶W&æVÇ2÷–ç2&÷FV7FVBà ¥&Vg&W6‚ã3RÖ&¶W'2æBöæÇ’6†ævVB76WB÷&VçB¶W—3¢f–æÂ552Â6ö×7B552ô¥2ÂÆ&VÂFV6÷&F÷"ÓâF÷FÂÖv—¦ÖòÂf–Ww÷'B×–çBÂ6æöæ–6Â&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"æB÷BÖ–â6ö×&—6öââ66WFVB&F–ÂÖÖ÷fR†VÇW"&WF–ç33B6÷W&6R÷–ââ&Wf–WvVB6öçG&7BWFFVBf÷"F†W6RW†7B6†ævVB6÷W&6W2öÆöFW"–ç2öæÇ’âW†—7F–ær—'v—6R&V7FævÆRö6ö×7BFW7G2æ÷rW†V7WFR7GVÂ6¶VB×÷6—F–öâ÷væW"Âv—F‚ÆÃs"6÷VçG2ö7F–öâ–FVçF—G’76W'F–öç2&WF–æVBâæWræçVÇW2FW7G26†V6²ÆÂF&vWB&V7FævÆW26ÆV"F†SCBãW‚6†FVB÷7G&ö¶VB&–ærÂ6&F–æÂ×W66ÆRÖÖVÖ÷'’÷6—F–öç2Â÷&–v–æÂFV6÷&F÷"æöFW2æB6†&VBWfVæöFBF‚ö6VçG&R7F–öç2âgVÆÂfÆ–FF–öâæBV&Æ–6F–öâ&ööbföÆÆ÷r&VÆ÷s²æòæF—fR6f&’õVæ6–Âf—7VÂ66WFæ6R6Æ–ÖVBà ¤FWf–6Rã3S¢–ç7V7BÆÂf—fR6¶VBÖVçW3²G&rF–ffW&VçB'G2öbw&W’&–ærÂF†Vâ÷&&—B÷â÷¦ööÒ‡7F–ÆÂföÆÆ÷w2“²6VçG&R‚6Æ÷6W2V6‚ÖöFVÆÆ–ær&–ærv—F†÷WBÖ÷f–ær—C²–çB6VçG&R÷Vç26öçG&öÇ2Â&–ærG&w2ÂÖFW&–Âö''W6‚7G&ö¶W2v÷&³²ÆVæ6‚W‡G'VFRô&WfVÂæB6†V6²VæFòõ&VFòâæF—fR66WFæ6RVæF–ærâæW‡BföÆÆ÷rW6W"52ôd”Ã²ã3BW6W"52&VÖ–ç2&÷FV7FVBW†6WBF†RW‡Æ–6—FÇ’7WW'6VFVB76–ærö†æFÆRFW6–vâà ¥fÆ–FF–öâã3S¢gVÆÂÆö6Ã2Ã3sró2Ã3sr52ƒf–ÇW&W2÷6¶—2’Âfö7W6VC#ó#æBf–æÂæçVÇW2÷&VÆV6Rö6ö×7C2ó252â7–çF‚æBv—BF–fbÒÖ6†V6²6ÆVââf–æÂ552W‡Æ–6—FÇ’÷fW'&–FW2F†R÷&–v–æÂG&ç6f÷&ÒÖöæÇ’5drf—6–&–Æ—G’'VÆRf÷"F†RFööÇ2G&r&–æs²&Vw&W76–öâ&÷FV7G2F†—2â'&÷w6W"Æ—fR–ç7V7F–öâöâã3BW7F&Æ—6†VB6Æ÷VBvV$tÂ—2F—6&ÆVB…D…$TR6öçFW‡B7&VF–öâf–Ç2’Â6òæògVÆÂÖ6Æ÷VBvW7GW&R÷&VæFW&W"66WFæ6R—26Æ–ÖVBâ6÷W&6RÖ&6VB&W6VçFF–öâ&ööbFö72÷&F–Â×&Wf–WrÓ3Ræ‡FÖÂW6W2÷&–v–æÂÖ&·Wö&6Röf–æÂ552Â'Gv÷&²æB6¶VB×÷6—F–öâ÷væW#²'&÷w6W"f—7VÂ&Wf–WræBV&Æ–6F–öâ&ööbVæF–ær&VÆ÷râæF—fRã3R66WFæ6R&VÖ–ç2VæF–æs²ã3BW6W"52&÷FV7FVBà ¥V&Æ–6F–öâã3RdU$”d”TC¢'VçF–ÖSs&3fS#&3F#vSfc6SCsƒsƒ“3633C&##cs†S’ÂFW7FVBG&VVcv36ccC#“cf#c#CVV##3FSs“Sc3S–&3–CâvW3C#“#c#Sc#"5T44U52âÆÃR66†RÖ'W7FVBÆ—fRÖ&¶W"÷6†VÆÂö6†ævVBöÆöF–ær÷&÷FV7FVBövÆÆW'’f–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6S²Ö–âfW'6–öâÖ&¶W"fW&–f–VBâ6VRFö72÷V&Æ–6F–öâÓ3Ræ§6öââ'&÷w6W"&W6VçFF–öâ&Wf–Wr–ç7V7FVBVFvRôf6RõfW'FW‚ôö&¦V7Bõ–çBW6–ær÷&–v–æÂÖ&·Wô552ö'Gv÷&²÷÷6—F–öâ÷væW"â7GVÂDôÒ†—BFW7G2C‚æçVÆ"F—&V7F–öç2–âVFvRæB–çB†—BF†RæçVÆ"Fƒ²6VçG&R†—G2÷&–v–æÂ6Æ÷6RVFvR'WGFöâò–çB†–FR×FööÇ26öçG&öÂâF†—2fW&–f–W2'&÷w6W"5drG&v–ærö†—B7W&f6W2Âæ÷BgVÆÂvW7GW&Röæf–vF–öâ÷"æF—fR6f&’õVæ6–Â66WFæ6S¢6Æ÷VBvV$tÂF—6&ÆVB2&V6÷&FVB&÷fRâgVÆÂÆö6Ã2Ã3sró2Ã3sræBf–æÂfö7W6VB6†V6·252â†÷7FVBF÷öÆöw“C#“#c#ScS7F–ÆÂ–â&öw&W72B&ööbÂæò†÷7FVB&W7VÇB6Æ–ÖVBâ'V–ÆBã3R6ö×ÆWFRöÆ—fR÷&VG’f÷"FWf–6RFW7F–ærâã3BW6W"52&÷FV7FVC²ã3Rv—F–ærW6W"fVVF&6²à ¢2ã3b(	B–çB&F–ÂG&r–çFW''WF–öâ&V6÷fW'“²ã3R&÷FV7FVB52(	Bæ÷fVÖ&W"##` ¥W6W"ã3R52—2&÷FV7FVC¢ÆÂf—fR6¶VBÖVçW2ÂÆ–v‡BÖw&W’6†FVBæçVÆ"Ö÷fR&–æw2ö'&÷w2Â–æFWVæFVçB–çB6VçG&Rõ‚7F–öç2ÂVæ6†ævVB–6öâö†—BÖ&÷‚F–ÖVç6–öç2æBÖöFVÂ×&VÆF—fRÖ÷fVÖVçBâöæW‡F'V–ÆBVF—B&6VÆ–æR7W'&VçBÖ–â3Vc&CSƒ&cs–fFVf36fV&6Ff&F&Fc#cƒ#V&C‚Â'VçF–ÖSs&3fS#"Â6†VÆÂöÆ—fS3RÂ÷&–v–æÂ–çBÆ6VÖVçBö6öçF7BÆ–fV7–6ÆRÂ66WFVBÖöFVÆÆ–ær&F–ÂÖÖ÷fR†VÇW"æBFW7G2âæW‡Bæ'&÷r&VÆ–&–Æ—G’VF—Bf÷VæB–çB&F–ÄG&r†2æòÆ÷7Gö–çFW&6GW&Rö&ÇW"÷7F÷VB6ÆVçW²VæÆ–¶R66WFVBÖöFVÆÆ–ær÷væW"Âö–çFW&6æ6VÂ&WF–æVB'F–ÂG&ræBg&W6‚&–ær6öçF7B6÷VÆB&WÆ6RâVæf–æ—6†VBöæRâ&W&öGV6VBF‡&VR&öGV7F–öâÕT’Ö÷væW"&Vw&W76–öç2&Vf÷&R&W—"Â–æ6ÇVF–ær7FÆR÷6—F–öâÖföÆÆ÷v–ærgFW"6GW&RÆ÷72æB&WF–æVB6GW&RF‡&÷Vv‚FöæR÷&V÷VââæòæF—fRã3RgVæ7F–öæÂd”Â—2–æfW'&VBg&öÒF†W6R7–çF†WF–2–çFW''WF–öâ66W2à ¥&W—"öæÇ’÷&–v–æÂf–Ww÷'B×–çB&–ær÷væW"â&Vv–â&VgW6W2÷fW&Æ–ær6öçF7G2æB6æ6†÷G2Æ7B6ö×ÆWFVB&VÆF—fRöfg6WB÷÷6—F–öâÇW26GW&R÷væW"âVæB6ÆV'2G&r7FFR$Tdõ$R&VÆV6Uö–çFW$6GW&RFò&WfVçB7–æ6‡&öæ÷W2Æ÷7BÖ6GW&R&VVçG'’âæ÷&ÖÂö–çFW'W&WF–ç26ö×ÆWFVBöfg6WBâö–çFW&6æ6VÂöÆ÷7Gö–çFW&6GW&Rö&ÇW"÷vV†–FR÷7F÷VB&W7F÷&R&Wf–÷W26ö×ÆWFVBöfg6WBÂ&VÆV6R6GW&RæBÆÆ÷rW†—7F–ær&ö¦V7FVBÖöFVÂÖföÆÆ÷v–ærFò&W7VÖRâW†—7F–ærvV†–FRW'6—7FVB†æFÆ–ær&VÖ–ç2WF†÷&—FF—fR†6æ6VÂVæ6öÖÖ—GFVB''W6‚7G&ö¶Rv—F†÷WB6Æ÷6–ær–çB“²÷&F–æ'’W†—B7F–ÆÂ6Æ÷6W2F‡&÷Vv‚÷&–v–æÂ÷væW"âw&öærö–çFW"”G2&R–væ÷&VBâæò&–ærô552÷Æ6VÖVçBÆv÷&—F†Ò6†ævW2ÂæWrvW7GW&R÷væW"÷"FWVæFVæ7’â–çF–ær6çf26öçF7BÂ6†ææVÂ÷FW‡GW&R¶W&æVÇ2Â†—7F÷'’Â6VÆV7F–öâÂvVöÖWG'’ÂG&ç6f÷&×2æBã3R'Gv÷&²÷F&vWG2öæçVÇW2÷–ç2VçF÷V6†VBâÖöFVÆÆ–ær&F–Â†VÇW"&VÖ–ç2ã3C²×VÇF“ã3bããæBÆÂV&Æ–W"56W2&÷FV7FVBà ¤æWrF‡&VR7GVÂ–çBÕT’FW7G2W6RvVæW&FVB7V&R÷&VÂ6ÖW&æB÷&–v–æÂg&ÖR÷Æ6VÖVçB÷–çB÷væW'3¢6GW&RÆ÷72&öÆÆ&6²æB6öçF–çVVBföÆÆ÷v–ærÇW27V66W76gVÂg&W6‚7G&ö¶S²6æ6VÆÆVBö&ÇW'&VBô$d66†R×W'6—7FVBvW7GW&W2&W7F÷&RÆ7B4ôÔÔ•EDTBöfg6WBæB–væ÷&R6V6öæB6öçF7C²FöæRGW&–ærG&r6ÆV'26GW&RÂ&V÷VâföÆÆ÷w2f–WrÂg&W6‚6ö×ÆWFVBG&r7W'f—fW27–æ6‡&öæ÷W2Æ÷7Gö–çFW&6GW&RGW&–ær–çFVçF–öæÂ&VÆV6RâÖVçRÖ÷fVÖVçB÷&V6÷fW'’FG2æò†—7F÷'’VçG'’æB¶VW26öçG&öÇ2õ–çB7F—fS²g&W6‚7G&ö¶R6öÖÖ—G2öæRâæöFRWfVçBôDôÒF÷V&ÆW2Fòæ÷BW7F&Æ—6‚æF—fR'&÷w6W"F–Ö–ær÷"•B–çFW''WF–öâFVÆ—fW'’âfö7W6VB&V6÷fW'’÷Æ6VÖVçB÷7G&ö¶R6†V6·3rór52âf–æÂ7V—FR÷V&Æ–6F–öâ&ööbföÆÆ÷w2&VÆ÷rà ¥&VÆV6Rã3bÖ&¶W'2æBf–Ww÷'B×–çB6†VÆÂ¶W’&Vg&W6†VC²6æöæ–6Â&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"æB÷BÖ–â6ö×&—6öâÆ–væVBâöæÇ’6†ævVB6÷W&6W2ö66†Rw&‚†6†W2&Wf–WvVBâ66WFVBã3R&F–Â552ö6ö×7BöFV6÷&F÷"õF÷FÂv—¦Öò6÷W&6RæB–ç2&WF–æVC²æòf—7VÂ&VFW6–vââW†—7F–ær&W6VçFF–öâvÆÆW'’ã3R&VÖ–ç2F†R66WFVB&VfW&Væ6RâæòæWr'&÷w6W"f—7VÂ6†V6²æVVFVBf÷"Væ6†ævVB&W6VçFF–öã²6Æ÷VBvV$tÂ&VÖ–ç2Væf–Æ&ÆR2&V6÷&FVB&Wf–÷W6Ç’à ¤FWf–6Rã3c¢G&r–çBw&W’&–æræ÷&ÖÆÇ’F†Vâ÷&&—B÷â÷¦ööÓ²FöæR÷&V÷VâæB&WVC²–çB6öçF–çV÷W27G&ö¶W2æBVæFòõ&VFòâ÷F–öæÂ–çFW''WF–öâ6†V6²öæÇ’–b6öçfVæ–VçC¢ÆVfR÷&WGW&âFò'&÷w6W"v†–ÆRG&vv–ærÂF†VâfW&–g’&–ær6â&RG&vvVBv–âæBföÆÆ÷w2ÖöFVÂâWFöÖFVBFW7G26÷fW"7–çF†WF–26æ6VÆÆF–öâö6GW&RÖÆ÷72&F†W"F†â6¶–ærW6W"FòÖçVf7GW&R&rö–çFW"WfVçG2âæW‡B6öçF–çVR66÷VB÷væW"VF—B÷"ÖV7W&VBW&f÷&Öæ6Rv÷&³²&W6W'fR66WFVB&F–Â7G–Æ–ærâæF—fRã3b66WFæ6RVæF–æs²ã3R52&÷FV7FVBà ¥&Wf–÷W2ã3R†÷7FVBF÷öÆöw“C#“#c#ScS5T44U52fW&–f–VC²W6W"ã3R52&÷FV7FVBà ¥fÆ–FF–öâã3c¢gVÆÂÆö6Ã2Ã3ƒó2Ã3ƒ52ƒf–ÇW&W2÷6¶—2’Âfö7W6VB&V6÷fW'’÷Æ6VÖVçB÷7G&ö¶SróræB&VÆV6Rö6ö×&—6öâöæçVÇW2÷&V6÷fW'“#Ró#R52âF‡&VRæWr&V6÷fW'’66W2f–ÆVBv–ç7BF†RVæ6†ævVBã3R÷væW"&Vf÷&R&W—"âf–æÂ7–çF‚æBv—BF–fbÒÖ6†V6²6ÆVââ&÷FV7FVBã3Rf—7VÂ÷væW'2æB66WFVBÖöFVÆÆ–ær&F–Â†VÇW"Væ6†ævVBâV&Æ–6F–öâ&ööbVæF–ær&VÆ÷s²æF—fRã3b–çFW''WF–öâ&V†f–÷W"&VÖ–ç2Fò&R6†V6¶VBöâFWf–6Rà ¥V&Æ–6F–öâã3bdU$”d”TC¢'VçF–ÖSvFCsc“F###†V3“&C†V3&SCCvCƒVF3–S#ÂFW7FVBG&VSvF&Cƒ36S“3scS&S#SS#&f363VFCsCcs“CCbâvW3C#“#“33Sc5T44U52âÆÃ"66†RÖ'W7FVBÆ—fR6†VÆÂö6†ævVBöÆöF–ær÷&÷FV7FVBf–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6S²Ö–âÖ&¶W'2æB–çC3b–âfW&–f–VBÂ66WFVBF÷FÂv—¦Öòô5533RæB×VÇF“ã3bãã&WF–æVBâ6VRFö72÷V&Æ–6F–öâÓ3bæ§6öââgVÆÂÆö6Ã2Ã3ƒó2Ã3ƒÇW2fö7W6VB&V6÷fW'’÷7G&ö¶R÷&VÆV6R6†V6·252â†÷7FVBF÷öÆöw“C#“#“33cs#b–â&öw&W72B&ööc²æò†÷7FVB526Æ–ÖVBâ'V–ÆBã3b6ö×ÆWFRöÆ—fR÷&VG’f÷"6†÷'BFWf–6R6†V6·2âã3RW6W"52&÷FV7FVBâæòæWrf—7VÂ66WFæ6R6Æ–ÒæVVFVBf÷"Væ6†ævVBT“²æF—fR–çFW''WF–öâFVÆ—fW'’&VÖ–ç2FWf–6R×7V6–f–2à ¢2ã3r(	BF&6¶w&÷VæBFò&V÷Vâ–çBFööÇ3²ã3b&÷FV7FVB52(	Bæ÷fVÖ&W"##` ¥W6W"ã3b52&÷FV7FVBÂÆöæw6–FRã3R6¶VBw&W’×&–ærT’æB÷&–v–æÂÆö6¶VB–çBv÷&¶fÆ÷râW6W"W‡Æ–6—FÇ’&WÆ6W2–çB&6¶w&÷VæBÄôär$U52v—F‚6–×ÆR&6¶w&÷VæB6Æ–6²÷F¢6VÆV7BFööÂÓâ–çB†–FW2&F–ÂÓâ&6¶w&÷VæBF&W7F÷&W2&F–ÂÓâ¶VW–çF–ærÂ&VÖ–â–â–çBVçF–ÂFöæR†W†—7F–ærW‡Æ–6—B&÷GFöÒÖÖöFRW†—G2&WF–æVB’âVF—B&6VÆ–æRÖ–ã†ScFc3FCC&VSSƒCC#6v33&SvFs3Â'VçF–ÖSvFCsc“BÂ&VÆV6S3c²÷&–v–æÂÖ–âv–æF÷rÖ6GW&R&6¶w&÷VæB÷væW"ÂVæ6–Â6VÖçF–2vFRÂ–çB7W&f6R÷FööÂ÷6W76–öâ÷væW'2æBã“cRòã“BFW7G2–ç7V7FVBâFòæ÷BFB&ÆÆVÂ&r6Æ–6²÷"ö–çFW"Æ—7FVæW'2à ¥&WW6RÖ–â&Vv–ä&6¶w&÷VæEF÷v–æF÷rÖ6GW&Rö–çFW'Wâv†–ÆR–çB÷vç2F†R6W76–öâÂG&6²&6¶w&÷VæBÖöæÇ’6æF–FFRv—F‚÷&–v–æÃ‡‚Ö÷fVÖVçB÷6V6öæF'’Ö6öçF7B6æ6VÆÆF–öâÇW2–çB’÷6W76–öâvVæW&F–öâÂÖW6‚æBö&¦V7BöÖöFR6öçFW‡Bâöâ7FF–öæ'’&VÆV6RÂ&WfÆ–FFR6ÖR6W76–öâö6öçFW‡BæB÷&–v–æÂ–çBæ—4&6¶w&÷VæEö–çBF†Vâ6ÆÂ÷&–v–æÂ–çBç6†÷uFööÇ2âæWfW"6ÆV"ö–çfW'B6VÆV7F–öâÂW†—B–çBÂ7v—F6‚FööÂÂ6GW&Rö–çFW"÷"W6‚†—7F÷'’â7GVÂ–çB7W&f6R7G&ö¶R÷væW"7F–ÆÂ†–FW2F†R&F–Âöâ66WFVB–çB6öçF7BæB–væ÷&W2V×G’&6¶w&÷VæBâ†–çBæ÷r6—2FV×G’&6¶w&÷VæBf÷"FööÇ2â6ÖÆÂ&VBÖöæÇ’6W76–öä¶W’vWGFW"W6W2÷&–v–æÂ÷Væ–ærvVæW&F–öâFò&V¦V7BF7ææ–ærFöæR÷&V÷Vâ÷"†—7F÷'’&W7F÷&F–öâà ¥–çBæòÆöævW"&×2F†SS×2†öÆBF–ÖW#²7FF–öæ'’ÆöævW"&W726â7F–ÆÂ÷Vâöâ&VÆV6RâæöâÕ–çBFÖ6ÆV"óS×2†öÆBÖ–çfW'BæBFööÂ&6¶w&÷VæBW†—G2&WF–â÷&–v–æÂ÷væW'2÷F–Ö–ærâ–çB6ö×ÆWF–öâÇv—2&WGW&ç2&Vf÷&RÖöFVÆÆ–ær÷FööÂW†—BF‡2Â–æ6ÇVF–ærv†Vâ—G26W76–öâVæFVBÖ–BÖ6öçF7Bâ6æ6VÆÆVBöÖ÷fVBö×VÇF—F÷V6‚ö&ÇW'&VB6öçF7G2Fòæ÷B&V÷VâFööÇ2â÷&–v–æÂ6VÖçF–2Væ6–Â&6¶w&÷VæBæ÷F–f–6F–öâ––VÆG2v†–ÆR–çB—27F—fS¢&rv–æF÷rÖ6GW&R6ö×ÆWF–öâ&VÖ–ç26öÆR÷væW"æBv÷&·2&Vv&FÆW72öb6VÖçF–2æ÷F–f–6F–öâ÷&FW"â–çBÆö6²Â7F—fRö&¦V7BÂ6†ææVÇ2ÂFööÂ6†ö–6RÂUböÖFW&–Â—†VÇ2æBVæFòõ&VFò÷væW'6†—&WF–æVBâã3b&–ær6GW&RÖÆ÷72&V6÷fW'’Âã3RÆ–÷WBö'Gv÷&²ö†—B&V2Âe$ôåBôE$rÂvVöÖWG'’æB×VÇF“ã3bããVçF÷V6†VBà ¤f÷W"æWr÷væW"FW7G26÷fW"Væ6–ÂöÖ÷W6Röf–ævW"V–6²&VÆV6RÂæòF–ÖW"FWVæFVæ7’Â&WVFVBöGWÆ–6FR&VÆV6W2ÃR&VgW6Â66W2†æf–vF–öâ–æ6ÇVF–ærG&r×&WGW&âÂ6æ6VÆÆF–öâÂ6V6öæF'’öæöâ×&–Ö'’Â7W&f6Rö&Æö6¶VB–çWBÂ7FÆR6W76–öâö6öçFW‡BöÖW6‚Â&ÇW"÷&–v‡B6Æ–6²’Â7GVÂ–çBT’GvòÖ÷f–ær7G&ö¶W2ÓâÖ–â&6¶w&÷VæBFÓâ÷&–v–æÂ&F–ÂGv–6RÓâFöæR÷&V÷VâwV&BÂæB7GVÂVæ6–Â6VÖçF–2Æ—7FVæW"&Vf÷&RögFW"&VÆV6Rv—F†÷WBGWÆ–6FRFööÇ2â&6¶w&÷VæBF2FBæò†—7F÷'“²öæÇ’Gvò7G&ö¶W2Fòâ†—7F÷&–6Âã“cR–çB†öÆBW‡V7FF–öâ—2W‡Æ–6—FÇ’7WW'6VFVB'’W6W"&WVW7C²6ÖRÖ÷fR÷6V6öæF'’÷7W&f6Rö6Æ÷6VBvFW2æB6VÆV7F–öâ76W'F–öç2&W6W'fVBâæV&'’Ö–â&6¶w&÷VæBöÆö6¶VBÕ–çBFW7G332ó3252âæöFR&VÂT’÷–çB÷&–67B÷væW'2v—F‚6öçG&öÆÆVBDôÒöWfVçG2Fòæ÷BW7F&Æ—6‚æF—fR6f&’ö–çFW"FVÆ—fW'“²gVÆÂ7V—FR÷V&Æ–6F–öâ&ööbföÆÆ÷w2&VÆ÷rà ¥&VÆV6S3rÖ&¶W'2æB&÷F‚Ö–â÷f–Ww÷'B×–çB6†VÆÂ–ç2&Vg&W6†VC²6æöæ–6Â&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"æB÷BÖ–â6ö×&—6öâWFFVBâ&Wf–WvVB†6†W2öæÇ’f÷"6†ævVB6÷W&6W2ö66†Rw&‚â66WFVB&F–Â7G–ÆW2öv—¦Öòö6ö×7BöFV6÷&F÷"övW7GW&RæBÆÂÖöFVÆÆ–ær¶W&æVÂ–ç2&VÖ–ââæò'&÷w6W"f—7VÂ6†V6²&WV—&VBf÷"Væ6†ævVBÆ–÷WC²æF—fR6–×ÆR×Fv÷&¶fÆ÷r—2F†RW6W"vFRâFWf–6S3s¢6VÆV7B''W6‚õ6×VFvRÂ–çBÂFV×G’&6¶w&÷VæB†æò†öÆB’Â–ç7V7B&F–ÂÂ&WVC²f–ævW"÷&&—B÷â÷–æ6‚×W7Bæ÷B&V÷Vã²VæFòõ&VFòv†–ÆR–çB7F—27F—fRÂFöæRW†—G2âã3b52&÷FV7FVC²ã3rv—F–ærFWf–6RfVVF&6²à ¥&Wf–÷W2ã3b†÷7FVBF÷öÆöw“C#“#“33cs#b—2æ÷r5T44U53²W6W"ã3b52—2&V6÷&FVB2&÷FV7FVBÂ7WW'6VF–ær&–÷"VæF–ær&ööbà ¥fÆ–FF–öâã3s¢gVÆÂÆö6Ã2Ã3ƒBó2Ã3ƒB52ƒf–ÇW&W2÷6¶—2’Âfö7W6VC3‚ó3‚52†&6¶w&÷VæBvW7GW&RÂ–çBÆö6²Â7GVÂ–çB7G&ö¶R÷&F–ÂÆö÷Â6VÖçF–2Væ6–Â÷&FW&–æræB&Wf–WvVB&VÆV6R6öçG&7G2’âf–æÂ¥27–çF‚æBF–fb6ÆVââæòvVöÖWG'’Â&VæFW&W"Â''W6‚¶W&æVÂ÷"66WFVB&F–ÂÆ–÷WB6†ævW2âV&Æ–6F–öâ&ööbVæF–ær&VÆ÷s²æF—fRV–6²×FfVVÂ&VÖ–ç2FWf–6R6†V6²à ¥V&Æ–6F–öâã3rdU$”d”TC¢'VçF–ÖVccFSS–cc3s3“sfSc“3vF&#SF3#ƒ†&S–6"ÂFW7FVBG&VVS“V#CC““–3sƒ†6FSCV63cvCcss†33"âvW3C#“CsƒCC#5T44U52âÆÃ266†RÖ'W7FVBÆ—fRÖ&¶W'2÷6†VÆÂöÖ–âõ–çBöÆöFW'2÷&÷FV7FVBf–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6S²Ö–ã3ræB–çC3r–ç2fW&–f–VBg&öÒ&W÷6—F÷'’gFW"V&Æ–6F–öâÂ66WFVB&F–Âöv—¦Öó3RæB×VÇF“ã3bãã&WF–æVBâ6VRFö72÷V&Æ–6F–öâÓ3ræ§6öââgVÆÂÆö6Ã2Ã3ƒBó2Ã3ƒBæBfö7W6VC3‚ó3‚52â†÷7FVBF÷öÆöw“C#“CsƒCC3c&VÖ–ç2–â&öw&W72B&ööc²æò†÷7FVB&W7VÇB6Æ–ÖVBâ'V–ÆBã3r6ö×ÆWFRöÆ—fR÷&VG’f÷"&6¶w&÷VæB×FFWf–6R6†V6·2âã3bW6W"52&÷FV7FVC²æF—fRã3rV–6²×FU‚VæF–ærW6W"&W7VÇBâæògVÆÂ6Æ÷VBÕvV$tÂ–çFW&7F–öâ6Æ–Òà ¢2ã3rW6W"53²æW‡B&V6öÖÖVæFF–öã¢ÖV7W&VBÆ&vRÖÖW6‚W&f÷&Öæ6R(	Bæ÷fVÖ&W"##` ¥W6W"6öæf—&×2ã3r52â&÷FV7B&6¶w&÷VæB×F–çB&F–Â&V÷Væ–ærÂ&WVFVBF÷–çBö†–FRÆö÷ÂW'6—7FVçBÆö6¶VB–çB6W76–öâæBW†—7F–æræf–vF–öâõVæFòõ&VFòôFöæR&V†f–÷W"âFövWF†W"v—F‚ã3Ròã3b56W2ÂF†R6¶VBw&W’×&–ærÖVçW2Â&VÆF—fRÖ÷fVÖVçBæB–çFW''WF–öâ&V6÷fW'’&R66WFVBâ'VçF–ÖR7F—2ã3s²F†—2—2Fö7VÖVçFF–öâöæÇ’Âæ÷BæWr'V–ÆB÷"W&f÷&Öæ6R6Æ–Òà ¥W6W"6·2v†B—2æW‡BÂv—F†÷WB&WVW7F–æræ÷F†W"öæW‡F'V–ÆB–WBâ&V6öÖÖVæB&WGW&æ–ærFòÆ&vRÖÖW6‚W&f÷&Öæ6RÂ&Vv–ææ–ærv—F‚&VÖ–æ–ærFVç6R&Wf–Wr÷&V'V–ÆBö6öçG&öÆÆW"6÷7BW6–ærW†—7F–ær&Væ6†Ö&²æB&öf–Æ–ær÷væW'2âvVæW&ÂvW7GW&RÖöç6WBôö&¦V7B'&÷w6W"Ærv2æWfW"6Æ–ÖVB6öÇfVB'’7WB×7V6–f–2ã#"Òã3"v–ç2âVF—B7W'&VçBÖ–âÂ&Væ6†Ö&²6ÖRf—‡GW&R&Vf÷&RögFW"Â6†ö÷6RöæR6öæf—&ÖVBW‡Vç6—fR÷væW"æB&W6W'fRW†7BF÷öÆöw’ÂÖWFFFÂ6VÆV7F–öâö†—7F÷'’æBÆ—7FVæW"&V†f–÷W"â6†—W&f÷&Öæ6R6†ævRöæÇ’v—F‚ÖV7W&VB&VæVf—BæB6÷'&V7FæW72vFW3²t4Ò—26æF–FFRf÷"&÷fVâ5R†÷G7÷BÂæ÷Bâ77VÖVBf—‚f÷"'&÷w6W"ÖVÖ÷'’÷"WfW'’–çFW&7F–öâFVÆ’âFòæ÷BFBæ÷F†W"ÖVçR&VFW6–vâ÷"F–væ÷7F–2T’2F†RFVfVÇBæW‡BF6²âv—BW6W"F—&V7F–öâöæW‡F'V–ÆBf÷"–×ÆVÖVçFF–öâà ¢2ã3‚(	BöæRÖVÖ&W'6†—6æ6†÷BW"FVç6R6ö×öæVçB6vR&V'V–ÆB(	Bæ÷fVÖ&W"##` ¥W6W"WF†÷&—¦W2öæW‡F'V–ÆBföÆÆ÷v–ær&V6öÖÖVæFF–öâFò&WGW&âFòÖV7W&VBÆ&vRÖÖW6‚W&f÷&Öæ6RâVF—B7W'&VçBÖ–ã3sf&cCV“36V6#3cV3cSƒ“sf6Fƒ–V#&6c&"Â'VçF–ÖVccFSS–cbÂ&VÆV6S3rÂ7W'&VçB67&—B–ç2ÂW†—7F–ærã“ròãb&Væ6†Ö&·2Â7GVÂÖ–â6vRö&öG’÷6VÆV7F–öâ÷væW'2æB×VÇF’&VæFW"ö'6W'fW"âã3rW6W"52†&6¶w&÷VæB×FÆö6¶VB–çBÆö÷’Âã3b–çFW''WF–öâ&V6÷fW'’Âã3R6¶VBw&W’×&–ær&F–Ç2æBÆÂ&–÷"ÖöFVÆÆ–ær÷6VÆV7F–öâ56W2&÷FV7FVBâæòÖ÷&RÖVçR&VFW6–vâ÷"F–væ÷7F–2T’'’FVfVÇBà ¤–æ—F–Â&öf–ÆS¢&öG’G&–æwVÆF–öâ×V6‚6ÖÆÆW"F†â6vR÷&÷‡’&V6öç7G'V7F–öââG&–Âf6R×–6¶W"ÖFW&–Â6†&–æræBF—&V7BG—VB÷6—F–öç2F–Bæ÷B6öç6—7FVçFÇ’ÖVWBW6VgVÂÆ&vW7BÖf—‡GW&Rv†öÆRÖ'V–ÆBv–ã²æV—F†W"6æF–FFR6†—2âföÆÆ÷r×Wv—F‚$TÂFVç6RVFvRõfW'FW‚6VÆV7F–öç2f÷VæB÷&–v–æÂ6VÆV7F–öä†2Óâ6VÆV7F–öä–æF–6W26ÆöæW2æB66ç26VÆV7F–öâf÷"WfW'’6÷'&W7öæF–ær&÷‡’âW†—7F–ærw&÷W&Væ6†Ö&²W6VBfÇ6R6VÆV7F–öâ7GV"æBöÖ—GFVBF†—266S²W‡FVæB6ÖR†&æW72FòW†V7WFR÷&–v–æÂ6VÆV7F–öâ†VÇW'2æB7WÇ’&VÂ6ö×öæVçB6VÆV7F–öç2âöæR'VçF–ÖR6†ævRÂöæÇ’Ö–âæFD6vS¢6æ6†÷B6VÆV7FVBG—RæBÆö6Â6WBg&öÒ÷&–v–æÂ6VÆV7F–öä–æF–6W2ôä4Rf÷"VFvRõfW'FWƒ²W6RÖVÖ&W'6†—FW7G2–â÷&–v–æÂVFvR÷fW'FW‚Æö÷2âæò&WF–æVB66†Rö–çfÆ–FF–öâÂ&V÷&FW&–ærÂF÷öÆöw’÷"æWrÖöFVÆÆ–ær¶W&æVÂâvVæW&–26VÆV7F–öä–æF–6W2÷6VÆV7F–öä†2Væ6†ævVBâ÷F†W"6VÆV7F–öâG—W2Fòæ÷BÖFW&–Æ—¦Râ'&’â÷&–v–æÂæöFRG—W2ÂvVöÖWG'’Â&÷‡’”G2Â6VÆV7FVBÖFW&–Ç2ö÷&FW'2ÂÆö÷2ö7&V6W2Â&F6†W2Âf—6–&–Æ—G’Â×VÇF’6fRö†—7F÷'’ö'6W'fW'2ÂF—7÷6ÂÂ÷fW&Æ—2æBÆÂvW7GW&RöÆ—7FVæW"÷væW'2&WF–æVBà ¤g&VW¦RW†7Bã3rFD6vR–âFW7G2öf—‡GW&W2÷W&f÷&Öæ6Rö6vR×6VÆV7F–öâÓ3ræ§2âæWrf÷W"&Vw&W76–öç26ö×&RgVÆÂ&÷‡’ö&F6‚÷6—F–öç2ö÷&FW"÷6VÆV7FVBfÆw2÷f—6–&–Æ—G’æB–FVçF–6Â6fRö†—7F÷'’6ÆöæR6÷VçG27&÷72ÆÂÖöFW2ÂVçW7VÂöGWÆ–6FRö–æFW‚ÖfÆÆ&6²6VÆV7F–öç2ÂWF†÷&VB7&V6RÂg&W6‚–â×Æ6RæB&WÆ6VB6VÆV7F–öâöÖöFR6†ævW2–â6ÖR÷væW"Âw&÷Wö†–FFVâ÷6öÆòâ6÷VçB7GVÂ6VÆV7F–öä–æF–6W26ÆÇ2öVçG&–W26W&FVÇ’âW†—7F–ærãƒòãƒSòã“3vVöÖWG'’÷&–67B÷7G–ÆRö–ç7Fæ6RF—7÷6Â76W'F–öç2&WF–æVC²f—‡GW&Ræ÷r7WÆ–W27GVÂ6VÆV7F–öâæ–æF–6W2ÖF6†–ær—G2&RÖW†—7F–ær6VÆV7FVB”G2&F†W"F†âöæÇ’6VÆV7F–öä†27GV"âFW7B†&æW72—6öÆFW2ÖW6‚÷6VÆV7F–öâ–çWG2æB&W7F÷&W26ÆöæR–ç7G'VÖVçFF–öâöâF—7÷6Ã²–æ—F–Â6†&VBÖ–çWBf—‡GW&R6÷WÆVB6÷VçFW'27&÷72ô"–ç7Fæ6W2Â6÷'&V7FVBv—F†÷WBvV¶Væ–ær&—G’76W'F–öç2à ¤ÖF6†VB&Væ6†Ö&²67&—G2ö&Væ6†Ö&²Ö6vR×6VÆV7F–öâÓ3‚æÖ§2ÓâFö72÷W&f÷&Öæ6RÖ6vR×6VÆV7F–öâÓ3‚æ§6öâ52â÷&–v–æÂ&öGV7F–öâgVæ7F–öç2–âæöFRdÒÂ&öG’ÖFB×VÇF’ö'6W'fW"²6vR÷&÷‡’ö&F6‚6öç7G'V7F–öâæBf6R–6¶W'2âF‡&VRv&×W2öæ–æRÇFW&æF–ær—&VB6×ÆW2Â6÷'&V7FæW72æB÷W&F–öâ6÷VçG2VçF–ÖVBâ6WGWöF—7÷6ÂÂ'&÷w6W"ôuRöæF—fRWfVçG2Â÷F†W"66VæR†öö·2Â&VÂ†—27G–Æ–æræB6VÆV7FVBÖVFvRõdU$Ä’tTôÔUE%’W†6ÇVFVB'’W†—7F–æræWWG&ÂöæòÖ÷†&æW73²FòäõB6ÆÂF†—2v†öÆR&VæFW"÷&Wf–WrÂvVæW&Â÷&&—Bôö&¦V7B'&÷w6W"Â6fRÖW6‚66—G’÷"t4Ò7VVGWâæòW6W"ÖöFVÂövVöÖWG'’6öÖÖ—GFVBâFVç6S#BÖf6RfW'FWƒ“’ã“bÓã3‚ã–×2ƒ"ãc'‚’ÂVFvSƒ2ãCÓã3Rã#6×2ƒRã#‚“³C“bÖf6RfW'FWƒcS‚ãC‚ÓãSbã×2ƒBã#'‚’ÂVFvS#ƒãƒ’ÓãS‚ãC×2ƒ2ãG‚’âf÷#C“bf6W2ÃC##RfW'FW‚óƒ3#VFvR6VÆV7F–öâÖ'&’ÖFW&–Æ—¦F–öç2&V6öÖRôäRW"&V6öç7G'V7F–öâƒsRR6VÆV7FVB’âVç6VÆV7FVBfW'FW‚ôf6Rôö&¦V7B6öçG&öÇ272ÃÓRR&Vw&W76–öâvFS²F†V—"F–Ö–ærf&–F–öâ—2æ÷B6Æ–ÖVB2FVç6R×6VÆV7F–öâ–×&÷fVÖVçBâÆÂFVç6R66W2W†6VVCã'‚ÖV7W&VB×7FvRvFS²W†7B6–væGW&W2æBVæ6†ævVB6÷W&6RÖW6‚72âæF—fR&VæVf—BVæF–ærâæòW‡G&F–Ö–ær6÷VçFW'2÷"Ööæ—F÷"FFVBFò'VçF–ÖRà ¤fö7W6VBæWröW†—7F–ær6vR6†V6·3RóR52âf–æÂgVÆÂ7V—FRÂÆöFW"6öçG&7G2æBV&Æ–6F–öâ&ööbföÆÆ÷r&VÆ÷râ&VÆV6S3‚Ö&¶W'2öÖ–â–âæB6æöæ–6Â&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"ö÷BÖ–â6ö×&—6öâ&Vg&W6†VC²&Wf–WvVB†6†W2öæÇ’f÷"6†ævVB÷væW'2â–çC3rÂ&F–Âöv—¦Öòö6ö×7C3RÂ†VÇW#3BÂvVöÖWG'’ö7WB÷–6¶–æræB×VÇF“ã3bãã6÷W&6W2÷–ç2&WF–æVBâæòf—7VÂ&VFW6–vâö'&÷w6W"f—7VÂvFRæVVFVC²6Æ÷VBvV$tÂ&VÖ–ç2Væf–Æ&ÆR2&Wf–÷W6Ç’&V6÷&FVBâFWf–6S3ƒ¢6ÖRFVç6RÖöFVÂÂ6VÆV7BÖç’VFvRõfW'FW‚6ö×öæVçG2ÂG&ç6f÷&Ò÷&V'V–ÆB&W7öç6S²6†ævR6VÆV7F–öâæB7v—F6‚ÖöFW2†g&W6‚†–v†Æ–v‡G2“²6æ6VÂæBVæFòõ&VFòÂæf–vF–öâæB÷&–v–æÂ6öæ6fR–6¶–ærö6ÆVçW6Öö¶R–b6öçfVæ–VçBâã3r–çBFÆö÷&VÖ–ç266WFVBâæW‡B&öf–ÆR&VÖ–æ–ær5ETÂ&VæFW"ö÷fW&Æ’ö6öçG&öÆÆW"÷"vW7GW&RÖöç6WB6÷7B&Vf÷&R6†ö÷6–æræ÷F†W"÷F–Ö—¦F–öâõt4Ò7FvS²F†—27V6–f–2'&’Ö6÷’†÷G7÷BæVVG2æòt4Òà ¥&Wf–÷W2ã3r†÷7FVBF÷öÆöw“C#“CsƒCC3c—2æ÷r5T44U52Â7WW'6VF–ær—G2öÆFW"VæF–ærV&Æ–6F–öâ&ööc²W6W"ã3r52&VÖ–ç2&÷FV7FVBà ¤–æ—F–ÂgVÆÂ'Vã2Ã3ƒró2Ã3ƒƒ¢6öÆRf–ÇW&Rv2F†RÆVv7’ãƒ’6vRf—‡GW&RÆ6¶–ær6VÆV7F–öä–æF–6W2gFW"F†R÷væW"&VvâW6–ærF†R÷&–v–æÂ&VFW"F—&V7FÇ’âf—‡GW&Ræ÷rW†V7WFW2F†B&VÂ†VÇW"æB7WÆ–W2F†R6ÖR&RÖW†—7F–ær6VÆV7FVB”C#²VFvRÖVçVÖW&F–öâ÷7G–ÆRövVöÖWG'’76W'F–öç2&WF–æVBâ6÷'&V7FVBæV&'’6vR÷W&f÷&Öæ6R6†V6·33"ó3"53²gVÆÂ&W'Vâ–â&öw&W72â'VçF–ÖR6÷W&6RVæ6†ævVB'’F†—26÷'&V7F–öâà ¥fÆ–FF–öâã3‚d”äÃ¢gVÆÂ7V—FS2Ã3ƒ‚ó2Ã3ƒ‚52ƒf–ÇW&W2÷6¶—3²æöFRÒ×FW7BÒ×FW7BÖ6öæ7W'&Væ7“ÓBFW7G2ò¢çFW7BæÖ§2’Âfö7W6VB&VÆV6Rö6vRõ–çC3bó3bæB6÷'&V7FVBÆVv7’Ö6vS3"ó3"52â&Væ6†Ö&²ÆÃr&÷w26÷'&V7FæW72ö÷W&F–öç2÷F–Ö–ær53²W†7Bg&÷¦Vâã3rgVæ7F–öâ&÷fVææ6RfW&–f–VBv–ç7BÖ–ã3sf&cCVâ7–çF‚æBF–fb6ÆVââ–æ—F–ÂÆVv7’f—‡GW&RÖöæÇ’f–ÇW&R—2&W6öÇfVBv—F‚÷&–v–æÂ76W'F–öç2&WF–æVBâæò'VçF–ÖR6†ævW2gFW"ÖF6†VB&Væ6†Ö&²&W–öæB&VÆV6RÆöF–ærw&‚âV&Æ–6F–öâ&ööbföÆÆ÷w2&VÆ÷s²æF—fRÆ&vR×6VÆV7F–öâ&VæVf—BVæF–ærFWf–6R&W7VÇBà ¥V&Æ–6F–öâã3‚dU$”d”TC¢'VçF–ÖV#fFvc#ƒS“ƒ3sƒ#cfFS6Sc33f3ƒ#FCcfRÂFW7FVBG&VS&cv#3SfSsƒ3Fc&S&S&CS“S6f&–SScCrâvW3C#“SƒCSCs5T44U52âÆÃb66†RÖ'W7FVBÆ—fRÖ&¶W'2÷6†VÆÂöÖ–âöÆöFW'2ö&Væ6†Ö&²÷&÷FV7FVB–çB÷&F–Âô×VÇF’÷F÷öÆöw’f–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6RâÖ–ã3‚æB&WF–æVB–çC3röv—¦Öó3Rô×VÇF“ã3bãã–ç2W‡Æ–6—FÇ’fW&–f–VBg&öÒ&W÷6—F÷'’â6VRFö72÷V&Æ–6F–öâÓ3‚æ§6öâæBÖF6†VBW&f÷&Öæ6R&W÷'BâgVÆÂf–æÃ2Ã3ƒ‚ó2Ã3ƒ‚52ƒf–ÇW&W2÷6¶—2’Âfö7W6VC3bó3bÇW26÷'&V7FVBÆVv7“3"ó3"Â&Væ6†Ö&²ÆÃr6÷'&V7FæW72ö÷W&F–öâ÷F–Ö–ær&÷w252â†÷7FVBF÷öÆöw“C#“SƒCSs3"–â&öw&W72B&ööc²æò†÷7FVB526Æ–ÖVBâ'V–ÆBã3‚6ö×ÆWFRöÆ—fR÷&VG’f÷"6ÖRÖÖöFVÂFVç6RVFvRõfW'FW‚6VÆV7F–öâ6†V6·2â5R†&æW72W†6ÇVFW26VÆV7FVBÖVFvR÷fW&Æ’vVöÖWG'’ôuRö÷F†W"66VæRv÷&³²æF—fR–×&÷fVÖVçBVæF–ærÂæòvVæW&Â÷&&—Bö66—G’õt4Ò6Æ–Òâã3rW6W"52&÷FV7FVBà ¢2ã3’(	B&V¦V7Bã3‚æF—fRW&f÷&Öæ6R&W7VÇC²&W7F÷&Rã3r6vR(	Bæ÷fVÖ&W"##` ¥W6W"ã3‚d”Ã¢(	Ä×VÇF’VFvR6VÆV7F–öâ6VV×2fW'’6Æ÷ræ÷rî(	ÒG&VBF†—22æF—fR66WFæ6Rf–ÇW&S²FòäõB&÷FV7Bã3‚÷"6öçF–çVRF†R6VÆV7F–öâ×6WB÷F–Ö—6F–öâöâF†R7G&VæwF‚öbæöFRF–Ö–æw2âVF—B7W'&VçBÖ–ã6V&&FfsCv#fCCcFSV333#ƒsccFV“SR÷'VçF–ÖV#fFvc#ÂÖ&¶W'2÷–ç2æB7GVÂ×VÇF’ÖVFvRö6vRö÷fW&Æ’F‡2â&WfW'BôäÅ’FD6vRFòF†RU„5Bg&÷¦Vâã3r–×ÆVÖVçFF–öâ‡fW&–f–VB'—FRÖf÷"Ö'—FR’âÖ–â&6¶w&÷VæB×F–çBã3rÂ–çFW''WF–öâ&V6÷fW'’ã3bÂ66WFVB&F–Âã3RæBÆÂF÷öÆöw’÷–6¶–æröÆ—7FVæW"ô×VÇF“ã÷væW'2&VÖ–ââF†—2&öÆÆ&6²—2f÷"6öçG&öÆÆVB6ÖRÖÖöFVÂ6ö×&—6öâÂäõB&ööbF†RæF—fR6Æ÷væW72&ö÷B6W6R—2f—†VBâã3r—2F†R&Wf–÷W266WFVB'V–ÆBÂæ÷BFVÖöç7G&FVBf7BæF—fR×VÇF’ÖVFvR&6VÆ–æRà ¥F†Rã3‚&Væ6†Ö&²W‡Æ–6—FÇ’W†6ÇVFVB&VÂ6VÆV7FVBÖVFvR7–Æ–æFW$vVöÖWG'’÷fW&Æ—2Â&VÂ†—27G–Æ–ærÂ÷F†W"&VæFW"ö6öçG&öÆÆW"†öö·2æBuRâ—BW7F&Æ—6†VB5RÖVÖ&W'6†—Æöö·W–×&÷fVÖVçB–â'F–Â†&æW72Â'WBF–Bæ÷BfÆ–FFRF†R6ö×ÆWFRW6W"×VÇF’×6VÆV7F–öâ–çFW&7F–öââW†7Bã3‚FD6vR&WF–æVBôäÅ’VæFW"FW7G2öf—‡GW&W2÷W&f÷&Öæ6Rö6vR×6VÆV7F–öâÓ3‚æ§3²æò'VçF–ÖR–×÷'Bâ†—7F÷&–6Â÷F–Ö—6F–öâFW7G2æ÷rW‡Æ–6—FÇ’–ç7FçF–FRF†—2g&÷¦VâTå6†—VB6æF–FFRÂ&W6W'f–ærÆÂöÆB6÷'&V7FæW72ö÷W&F–öâ6†V6·2v—F†÷WB&WFVæF–ærF†R6æF–FFR—27W'&VçB'VçF–ÖRâ†—7F÷&–6Âã3‚&Væ6†Ö&²67&—Bg&VW¦W26æF–FFRFöòÂæB&W÷'G26W&FR7U&W7VÇBfW'7W2æF—fT66WFæ6Rd”Âò6†—–ætFV6—6–öâ$T¤T5DTBò÷fW&ÆÂ$T¤T5DTBâ÷&–v–æÂF–Ö–ær&÷w2&VÖ–âVçF÷V6†VBâV&Æ–6F–öã3‚ÖWFFFWFFVBFòæF—fRd”Ã²æò&WG&ö7F—fR5R÷"æF—fR5276W'F–öâà ¥Gvò6÷'&V7F—fR&Vw&W76–öç276W'B7W'&VçBFD6vRW†7FÇ’WVÇ2ã3ræBæWfW"ÆöG2W‡W&–ÖVçC²W†W&6—6R$TÂ÷&–v–æÂ6VÆV7FVBÖVFvR÷fW&Æ’vVöÖWG'’Â†—2ÖFW&–ÂÂ6VçG&R÷66ÆRÖWFFFö÷&FW"æBF—7÷6ÂâW†—7F–ær–æFW†VB&–67BöÖFW&–Âö7&V6RöÆö÷ö&F6‚FW7G2&WF–æVBâf—'7Bfö7W6VC#"ó#"52âæòæWrW&f÷&Öæ6R÷F–Ö—6F–öâÂF–væ÷7F–2T’ÂF÷öÆöw’6†ævR÷"Æ—7FVæW"&VÖ÷fÂ—2'VæFÆVBv—F‚&öÆÆ&6²âgWGW&R&öf–Æ–ær×W7B–æ6ÇVFR7GVÂ–æ7&VÖVçFÂ×VÇF’ÖVFvR6VÆV7F–öâ÷&V'V–ÆBö†–v†Æ–v‡Bö6öçG&öÆÆW"6÷7G2æBæF—fRWf–FVæ6R&Vf÷&Ræ÷F†W"7VVB6Æ–Òâ&WVW7B6ÖRÖÖöFVÂã3’6ö×&—6öã²–b7F–ÆÂ6Æ÷rÂFWFW&Ö–æRv†WF†W"FF–ærVFvW2÷"G&ç6f÷&Ö–ærâW†—7F–ær6VÆV7F–öâ—26Æ÷ræBö'F–â&VÆWfçBÖöFVÂ÷W&f÷&Öæ6RG&6RâFòæ÷B–æfW"6W6R6öÆVÇ’g&öÒöæRæöFR7FvRà ¥&VÆV6Rã3’Ö&¶W'2öÖ–â¶W’æB6æöæ–6Â&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"ö÷BÖ–â6ö×&—6öâ&Vg&W6†VBâ&Wf–WvVB76WB†6†W2f÷"W†7B6†ævVB÷væW'2öæÇ“²–çC3ræB&F–Âöv—¦Öó3Rô×VÇF“ã3bãã–ç2&WF–æVBâf–æÂgVÆÂ6†V6·2÷V&Æ–6F–öâ&ööbföÆÆ÷r&VÆ÷râFWf–6Rã3“¢&WVB4ÔR×VÇF’ÖVFvR6VÆV7F–öâöâ4ÔRÖöFVÂÂ6ö×&Rã3ƒ²6VÆV7F–öâö†–v†Æ–v‡G2õVæFõ&VFòæBæf–vF–öâ6Öö¶S²¶VW–çBF÷&F–Â&V†f–÷W"âã3‚7F—2d”Ã²ã3’æF—fR÷WF6öÖRVæF–ærâæòæF—fR&W—"÷"7VVGW6Æ–ÖVBVçF–ÂW6W"6öæf—&×2à ¥fÆ–FF–öâã3“¢gVÆÂ7V—FR2Ã3“ó2Ã3“52ƒf–ÇW&W2÷6¶—2’Âfö7W6VB&VÆV6Rö6vRõ–çB3ó353²7–çF‚æBF–fb6†V6·26ÆVââW†7Bã3r6vR&öÆÆ&6²fW&–f–VBÂ&VÂ6VÆV7FVBÖVFvR†–v†Æ–v‡BvVöÖWG'’öF—7÷6ÂW†W&6—6VBâæF—fR×VÇF’ÖVFvR&W7öç6—fVæW72&VÖ–ç2VæF–ær6ÖRÖÖöFVÂFWf–6R6ö×&—6öâà ¥V&Æ–6F–öâã3’dU$”d”TC¢'VçF–ÖRc6csSf3S6cs&cCcF#fcc6fFFVS6#S“V#CCBÂFW7FVBG&VR3†#V6F6V#cVF&Vf“ƒ#S–V3scvF33“sf3²vW3C#“c##C’5T44U53²ÆÃb66†RÖ'W7FVBÆ—fRf–ÆW2'—FRÖÖF6‚6÷W&6RâgVÆÃ2Ã3“ó2Ã3“æBfö7W6VC3ó352â†÷7FVBF÷öÆöw“C#“c##"7F–ÆÂ–â&öw&W72B&ööc²æò†÷7FVB526Æ–ÖVBâ6VRFö72÷V&Æ–6F–öâÓ3’æ§6öââ'V–ÆBÆ—fRæB&VG’f÷"6ÖRÖÖöFVÂ×VÇF’ÖVFvR6ö×&—6öââæF—fR&W7öç6—fVæW72&VÖ–ç2VæF–ærÂ&ö÷B6W6RVæ6öæf—&ÖVC²ã3‚W6W"d”Â&V6÷&FVBÂ&–÷"66WFVB–çB÷&F–Â&V†f–÷W"&÷FV7FVBà ¢2ãC(	B&öG’Ö'VffW"6¶–æs²ã3’×VÇF’ÖVFvR52&÷FV7FVB(	Bæ÷fVÖ&W"##` ¥W6W"6öæf—&×2(	Ç6VÆV7F–ær×VÇF—ÆRVFvW2—2×V6‚V–6¶W"–âF†—2'V–ÆB¢’öæW‡F'V–ÆN(	Òâ&V6÷&Bã3’2&÷FV7FVBæF—fR×VÇF’ÖVFvR52Â7WW'6VF–ær&Wf–÷W2VæF–ær6ö×&—6öâæ÷FW2âã3‚&VÖ–ç2&V¦V7FVBâVF—B7W'&VçBÖ–âc#&Vf#V&&#CƒsFccccCs&3V#Scs"‡G&VRcv3s6C–6ScF3sFV6fCcFf#fSSSCsVSƒ&3s‚’Â&VÆV6S3’ÂÆöFW"w&‚ÂW†—7F–ær&Væ6†Ö&²æB÷&–v–æÂvVöÖWG'’÷6VÆV7F–öâö&F6‚÷væW'2â7W'&VçBFD6vR&VÖ–ç2U„5Bã3ròã3“²æò6WB×6VÆV7F–öâW‡W&–ÖVçBÂ÷fW&Æ’Â–6¶–ærÂÆ—7FVæW"ÂF÷öÆöw’Â†—7F÷'’÷"&F–Âõ–çB6†ævW2à ¤f—'7BG&–Â6¶—VBVæ6†ævVBfW'FW‚Ö&¶W"ÖG&—‚w&—FW2W6–ærW"Ö&F6‚6æ6†÷G2â&VÂWFFU67&VVå76U6VÆV7F–öâ5R&Væ6†Ö&²†6ÖW&ÖF—7Fæ6R66Æ–ær–æ6ÇVFVB’f–ÆVB—G2ãÓã'‚7FF–öæ'’F&vWC¢BÃ##RÖ&¶W'2"ãs#BÓã"ãScv×2ƒãc‚“²Ö÷f–ær"ãssÓã"ãƒC6×2â6æF–FFRVçF—&VÇ’&WfW'FVC²æòÖ&¶W"66†R6†—2âFòæ÷B&V–çG&öGV6RöâWÆöBÖ6÷VçBÖöæÇ’Wf–FVæ6R÷"6ÆÂF†—2æF—fR7VVGWà ¥6†—–æröæÇ’ÆÆö6F–öâ÷6¶–ær–ç6–FRF†RU„•5D”ärVF—F&ÆTÖW6‚çG&–æwVÆFVDvVöÖWG'’÷væW#¢6÷VçBfâG&–ævÆW2ÂÆÆö6FRöæRW†7BfÆöC3"÷6—F–öâ'VffW"Âw&—FR÷&–v–æÂf6U³Òöf6U¶•Òöf6U¶’³Ò÷&FW"F—&V7FÇ’æB&WF–â÷&–v–æÂ6ö×WFUfW'FW„æ÷&ÖÇ2âæòæWrG&–æwVÆF–öâöÖöFVÆÆ–ær¶W&æVÂÂ–æFW†–ær÷vVÆF–ærÂæ÷&ÖÇ2Æv÷&—F†ÒÂvVöÖWG'’66†RÂ6VÆV7F–öâ7FFRÂF÷öÆöw’õUböÖFW&–Â6†ævR÷"6÷W&6R×WFF–öââ–æFWVæFVçBvVöÖWG'’öâWfW'’6ÆÂæB÷&–v–æÂF—7÷6Â6VÖçF–72&WF–æVBâ'—FRÖW†7B÷6—F–öç2öæ÷&ÖÇ2ÂG&–ævÆR÷&FW"÷v–æF–æræB7GVÂ&’Ö†—B&—G’FW7FVBÂÇW2V×G’öÆö÷6RöFVvVæW&FRöÇ–vöç2Â6ö÷&F–æFRöf6RVF—G2æB–æFWVæFVçB&W6÷W&6W2à ¤ÖF6†VB67&—G2ö&Væ6†Ö&²Ö&öG’×6¶–ærÓCæÖ§2ÓâFö72÷W&f÷&Öæ6RÖ&öG’×6¶–ærÓCæ§6öâ52ƒ"v&×W2Ã’ÇFW&æF–ær—&VB6×ÆW2Â7GVÂÆÆö6F–öâ·6¶–ærµF‡&VRæ÷&ÖÇ2’âÃG&–ævÆW2&öG’6öç7G'V7F–öã#2ãc3‚Óã’ã33×2ƒ"ãS37‚’Â–FVçF–6Â'VffW'2â÷F†W#²óS²6öçG&öÇ272æò×&Vw&W76–öâvFRâF†—2—2$ôE’6öç7G'V7F–öâ5RöæÇ“¢W†6ÇVFW26vR÷6VÆV7FVBÖVFvR÷fW&Æ—2ö6öçG&öÆÆW'2÷&VæFW"ôuRöæF—fRWfVçBFVÆ—fW'’æBFöW2æ÷BW7F&Æ—6‚v†öÆR×6VÆV7F–öâöæf–vF–öâÂ6fR66—G’÷"t4Ò&VæVf—BâæF—fRãC&VÖ–ç2VæF–ærâW†—7F–ærã3’6VÆV7F–öâ527F—2&÷FV7FVBà ¤66†RVF—C¢ÖW6‚†B&÷F‚ã"6÷&RæBã#ã"–×÷'FW"–FVçF—F–W2ÇW2VçfW'6–öæVB–×÷'G2F‡&÷Vv‚6†VÆÂÖâ&W6W'fRF†÷6REtò–FVçF—F–W3¢6†VÆÂ–×÷'BÖ&÷WFW2VçfW'6–öæVBæBÆVv7’ã"FòÖW6‚æ§3÷cÓã"ãC²ÆVv7’ã#ã"FòÖW6‚æ§3÷cÓã#ã"ãCâFòæ÷B6öÆÆ6R–×÷'FW"ö6÷&R6öç7G'V7F÷'2â&VçBÖöGVÆW2&VÖ–â'—FRÖ–FVçF–6Ã²&Vg&W6†VB6†VÆÂöÖ–â¶W’æB7FæF&B&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"ö6ö×&—6öâ6Æ÷7W&RâæWrÖFW7B6÷fW'2WfW'’7W'&VçBF—&V7BÖW6‚–×÷'BæBÆ–6W3²&Wf–WvVBF&vWB†6†W2WFFVBöæÇ’f÷"6†ævVB'—FW2â–çC3rÂ&F–Âöv—¦Öó3RÂ×VÇF“ã3bããÂvVöÖWG'’FööÇ2æBg&÷¦Vâ&WF2&WF–æVBà ¤DUd”4SC¢6ÖRÖöFVÂ×VÇF’ÖVFvRFB÷&VÖ÷fR7F—2&W7öç6—fS²fW'FW‚ôf6R6VÆV7F–öâæBÖ÷fRv—F‚VæFòõ&VFó²–×÷'FVBFW‡GW&VBÖöFVÂV&æ6RÂæf–vF–öâæB6fRô÷Vâ6Öö¶RâW†—7F–ær–çBF÷&F–Âv÷&¶fÆ÷r&VÖ–ç2âæòæWrT’÷"W‡G&W&f÷&Öæ6RÖÖöæ—F÷"æVÂâæW‡B&öf–ÆR7GVÂ&VÖ–æ–ærgVÆÂ6öçG&öÆÆW"÷&V'V–ÆBöæF—fR6÷7B&Vf÷&R6†ö÷6–æræ÷F†W"5Rõt4Ò6†ævS²Fòæ÷BW‡G&öÆFR&öG’ÖöæÇ’F–Ö–æw2âfö7W6VC#ró#r53²gVÆÂ7V—FR÷V&Æ–6F–öâföÆÆ÷r&VÆ÷rà ¥fÆ–FF–öâãCd”äÃ¢gVÆÃ2Ã3“Bó2Ã3“B52ƒf–ÇW&W2÷6¶—2’Âfö7W6VC#ró#r53²ÖF6†VB&öG’&Væ6†Ö&²ÆÃ2F–Ö–ærö6÷'&V7FæW72&÷w252â7–çF‚öF–fb6ÆVââæò'VçF–ÖR6†ævW2gFW"&Væ6†Ö&²â&Wf–÷W2ã3’†÷7FVBF÷öÆöw“C#“c##"æ÷r5T44U53²ã3’æF—fR×VÇF’ÖVFvR52&÷FV7FVBâV&Æ–6F–öâ&ööbföÆÆ÷w3²æF—fRãC÷fW&ÆÂ&W7öç6—fVæW72—2æ÷BW7F&Æ—6†VB'’æöFR7FvRF–Ö–æw2à ¥V&Æ–6F–öâãCdU$”d”TC¢'VçF–ÖRS–&V6csS“Cƒs6#“ƒ#–S3FFC#ƒcVVCcSSC##C"ÂFW7FVBG&VS&fS“C†cV&cfSs#33v#3†S3F&C3†C&#ƒV3vS²vW3C#“cCsƒƒ“#25T44U52âÆÃ’66†RÖ'W7FVBÆ—fRU$Ç2†–æ6ÇVF–ær$õD‚ÖW6‚Æ–6W2ÂVæ6†ævVBÖ–âö6vRô×VÇF’õ–çB÷&F–Â÷F÷öÆöw’÷væW'2’'—FRÖÖF6‚FW7FVB6÷W&6RâgVÆÃ2Ã3“Bó2Ã3“BÂfö7W6VC#ró#ræB&öG’&Væ6†Ö&³2ó252â†÷7FVBF÷öÆöw“C#“cCsƒ“s‚7F–ÆÂ–â&öw&W72B&ööc²æò†÷7FVB526Æ–ÖVBâ6VRFö72÷V&Æ–6F–öâÓCæ§6öââ'V–ÆB6ö×ÆWFRöÆ—fR÷&VG’f÷"FW7F–ærâæF—fSC÷fW&ÆÂ&W7öç6—fVæW72VæF–æs²ã3’6VÆV7F–öâW6W"52&÷FV7FVBà ¢2ãC(	B7W&f6R×f—6–&ÆR6öæ6fRVFvR–6¶–æs²ãCW6W"52(	Bæ÷fVÖ&W"##` ¥W6W"&W÷'G2(	ÃC5>(	Òv—F‚6W&FR6öæ6fRVFvRF&vWF–ærFVfV7C¢&V"÷F‡&÷Vv‚VFvW27FVÂF2g&öÒF†R–çFVæFVBf—6–&ÆR&V6W76VBVFvRâ&÷FV7BãC&öG’6¶–ærÂã3’×VÇF’ÖVFvR&W7öç6—fVæW72Â66WFVB–çB÷&F–Âöæf–vF–öâö†—7F÷'’&V†f–÷W#²Fòæ÷BG&VBF†—2&W÷'B26öæ6fR×–6¶–ær66WFæ6Râ&6VÆ–æRÖ–âVVVSVc#3“FFc&F&C“#36“Cv#“CsvfFcbò'VçF–ÖRS–&V6csS“Cƒs6#“ƒ#–S3FFC#ƒcVVCcSSC##C"Â&VÆV6SCâVF—B÷&–v–æÂã“SBVFvR×67&VVâ×–6¶–ærÂÖ–âæF—fR'&–FvRÂVæ6–ÂvFRÂ6ö×öæVçBFövvÆRÂVFvR–çBæBãc"FööÂFVÆVvF–öââF†R6†&VB–6¶W"†2æ÷B6†ævVB6–æ6Rã“SC¢—B&æ·2ÆÂ&ö¦V7FVBÆ–æW2v—F†–ã"552—†VÇ2v—F†÷WBFW7F–ær&öG’ö66ÇW6–öââF†—2&W&öGV6W2F†R&W÷'FVBf–ÇW&R6Æ73²W†7BW6W"ÖöFVÂöæF—fRWfVçB&W&öGV7F–öâ—2Væf–Æ&ÆRâFòæ÷BGG&–'WFR—BFòãC&öG’6¶–ærÂv†–6‚&WF–ç2W†7B÷6—F–öç2öæ÷&ÖÇ2÷&’†—G2à ¥&W—"ôäÅ’W†—7F–ær–6¶W"æB—G2÷&–v–æÂ'&–FvRôVFvR–çBv—&–ærâ6æF–FFW2¶VW÷&–v–æÂ†öÖövVæV÷W26Æ—–ærÂW'7V7F—fRÖ6÷'&V7B6Æ÷6W7Bv÷&ÆBö–çBÃ'‚F&vWBæBV'FW"×—†VÂöFWF‚F–R&æ¶–ærâ&Vf÷&R66WF–ær6æF–FFRÂ&–67BF†R7W'&VçBf—6–&ÆR&öG’BF†RæV&W7Bö–çBôâD„RTDtRÂv—F‚f"F—7Fæ6R§W7B&Vf÷&RF†Bö–çB‡66ÆR×&VÆF—fRFöÆW&æ6R’âFW7F–ærBF†Röfg6WB6öçF7Bv÷VÆB–æ6÷'&V7FÇ’&V¦V7Bf—6–&ÆR&V6W76VBVFvR&W6–FRæV"&–Òâ†–FFVâ&VçB&öF–W2Âf6R–6¶W'2æB6VÆV7F–öâ÷fW&Æ—2Fòæ÷Bö66ÇVFRâÆö÷6R66fföÆG2v—F‚æò&öG’&VÖ–â–6¶&ÆRâæò66†VBvVöÖWG'’÷f—6–&–Æ—G’&W7VÇG3²7W'&VçBG&ç6f÷&ÖVB&÷†–W2ö&öG’&R&VBöâWfW'’6ÆÂâW‡Æ–6—BF‡&÷Vv‚VFvR–çF–ær76W2â÷F–öæÂF‡&÷Vv‚fÆrF‡&÷Vv‚W†—7F–ær–6´†—G2'&–FvRæB'—76W2f—6–&–Æ—G“²÷&F–æ'’F2÷FööÇ2õf—6–&ÆR–çF–ær&V¦V7B†–FFVâVFvW2Â–æ6ÇVF–ærv†Vâæòf—6–&ÆRVFvR&VÖ–ç2âf6Re$ôåBôE$röÆ–7’Væ6†ævVBà ¤f—fRæWr&VÂÕF‡&VRö7GVÂÖ'&–FvR&Vw&W76–öç26÷fW"6Æ÷6W"†–FFVâÖVFvRF†VgBfW'7W2&V6W76VBf—6–&ÆRÆ–æRÂF‡&VRÖöFVÂ66ÆW2æBW'7V7F—fRö÷'F†öw&†–26ÖW&2ÂæV"×&–Òöfg6WB6öçF7BÂ†–FFVâ&öF–W2÷&÷†–W2ö÷fW&Æ—2Â†–FFVâÖöæÇ’Ö—72ÂG&ç6f÷&ÖVB&VçG2ÂÆö÷6R66fföÆG2Â6Æ÷6VBÂ×6V7F–öâ6öæ6fRVFvRæB7W'&VçBÖ6ö÷&F–æFR÷&V'V–ÆB&Vg&W6‚Â6÷W&6R–Ö×WF&–Æ—G’Â÷&–v–æÂ†—7F÷'’VæFòõ&VFòv—F‚g&W6†Ç’&V'V–ÇB&öG’&W6÷W&6W2ÂæB7GVÂVFvR–çBf—6–&ÆRõF‡&÷Vv‚7v—F6†–ærâW†—7F–ærã“SBW†7B7WÆ–VBô$¢ôfÆ—÷6VÆV7F–öâõVæ6–ÂFW7G2æBãc"7Æ—Bô&WfVÂôW‡G'VFRõ6Æ–FRôöfg6WBFW7G2&VÖ–â7F—fRâfö7W6VC3bó3b52–æ6ÇVF–ær66WFVBã3’6vRÂãC6¶–ærÂã3r–çBæB&VÆV6R6öçG&7G2âgVÆÂ7V—FR÷V&Æ–6F–öâföÆÆ÷râæF—fR6f&’ö•BF&vWF–æræB&W7öç6—fVæW72&VÖ–âDUd”4SCVæF–æs²æògVÆÂÖW&f÷&Öæ6R6Æ–Òà ¥&÷FV7FVBÖ–âæFD6vRU„5Bã3ròã3’Â&öG’vVöÖWG'’ãCÂÆ—7FVæW'2övW7GW&RF–ÖW'2ÂF÷öÆöw’ö6ÆVçWõUbö†—7F÷'’Â–çC3rÂ&F–Âöv—¦Öó3RÂ×VÇF“ã3bããæBg&÷¦Vâ&WF2VçF÷V6†VBâÖ–â6†ævW2&R–6¶W"–×÷'BÂ÷F–öæÂ†—B×öÆ–7’f÷'v&F–æræB'&–FvR6–væGW&RöæÇ’â&VÆV6SCÖ&¶W'2öÖ–âôVFvR–çBæB–6¶W"–ç2&Vg&W6†VBÂÇW26æöæ–6Â&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"æB÷BÖ–â6ö×&—6öâ66†R6Æ÷7W&RâÖW6‚6÷&Rö–×÷'FW"Æ–6W27F’6W&FVÇ’BãC²Fòæ÷B6öÆÆ6RF†V—"6öç7G'V7F÷'2â&Wf–WvVB76WB&VfW&Væ6W2ö†6†W2WFFVBöæÇ’f÷"6†ævVB÷væW'2æBF†V—"ÆöF–ær6Æ÷7W&Rà ¤DUd”4SC¢4ÔR6öæ6fRÖöFVÂÓâF–ç6–FR÷&V6W76VBVFvW2g&öÒ6WfW&ÂævÆW2æB¦ööÒÆWfVÇ3²&V"VFvW2×W7Bæ÷B7FVÂf—6–&ÆRF2âFB÷&VÖ÷fR6WfW&ÂVFvW2&VÖ–ç2V–6³²G'’7Æ—B÷"&WfVÂöâ–çFVæFVBVFvRæBVæFòõ&VFòâ–bW6–ærVFvR–çB6VÆV7F–öâÂf—6–&ÆRfW'7W2W‡Æ–6—BF‡&÷Vv‚7F–ÆÂF–ffW'2âf–ævW"÷&&—B÷â÷–æ6‚æBÆö6¶VB–çB&6¶w&÷VæB×F&F–Â6Öö¶RâæW‡BföÆÆ÷rFWf–6R&W7VÇB&Vf÷&Ræ÷F†W"W&f÷&Öæ6Rõt4Ò'V–ÆC²&öf–ÆR&VÖ–æ–ær7GVÂ&V'V–ÆBö6öçG&öÆÆW"6÷7BgFW"F†—2F&vWF–ærvFRâ'V–ÆBfÆ–FF–öâ÷V&Æ–6F–öâ7FGW2&VÆ÷rà ¥fÆ–FF–öâ6†V6·ö–çBãC¢–æ—F–ÂgVÆÂ'Vã2Ã3“‚ó2Ã3“’†öæR7FÆRãC“BW†7BGvòÖ&wVÖVçB6–væGW&R76W'F–öâÂæ÷B&V†f–÷W&Âf–ÇW&R’âWFFVBF†B76W'F–öâFòF†R÷F–öæÂöÆ–7’6–væGW&S²ÆÂ÷&–v–æÂf6R†—B×7F6²öF–væ÷7F–2&V†f–÷W"FW7G2&VÖ–ââ6÷'&V7FVBf6Rö'&–FvRöæWr×–6¶W#rór53²7G&VæwF†VæVB&VÂÂ×6V7F–öâFW7BW†V7WFW2÷&–v–æÂ†—7F÷'’VæFòõ&VFòÂæWsRóR52â'VçF–ÖR'—FW2Væ6†ævVBgFW"F†R–æ—F–ÂgVÆÂ'VââgVÆÂ6÷'&V7FVB6öæf—&ÖF–öâ'Vææ–æs²Fòæ÷B6Æ–Ò6ö×ÆWFVBgVÆÂw&VVâ'Vâ–WBâ&–÷"ãC†÷7FVBF÷öÆöw“C#“cCsƒ“s‚—2æ÷r5T44U52âæòVç&W6öÇfVB&V†f–÷W"f–ÇW&Rg&öÒÆö6Â6†V6·3²æF—fR6öæ6fR×F&vWF–ær66WFæ6R7F–ÆÂVæF–ærà ¤d”äÂãCfÆ–FF–öâ÷V&Æ–6F–öâdU$”d”TC¢gVÆÂ6÷'&V7FVBÆö6Â7V—FS2Ã3“’ó2Ã3“’52Ãf–ÇW&W2ö6æ6VÆÆVB÷6¶—2ƒ3Bã3ƒ72“²fö7W6VC3bó3bÂ6÷'&V7FVBf6Rö'&–FvSróræB7G&VæwF†VæVB–6¶W#RóR52â–æ—F–ÂãC“B7VÆÆ–ærÖöæÇ’f–ÇW&R—2&W6öÇfVC²æò76W'F–öç2G&÷VBâ'VçF–ÖR†C&C3c&Ss–S&#“†&66CVc–3“ƒC–ƒsBÂFW7FVBG&VSvSVF#&FVS†&36Cc6ƒ“ƒvCƒc–F6V3“c3FbâvW3C33sSƒ’'V–ÆBöFWÆ÷’5T44U52âÆÃr6†V6¶VB66†RÖ'W7FVBÆ—fRU$Ç2'—FRÖÖF6‚6÷W&6RÂ–æ6ÇVF–ær&W—&VB–6¶W"ôVFvR–çBöÖ–âöÆöFW"6Æ÷7W&RÂ&÷F‚Væ6†ævVBãCÖW6‚Æ–6W2æB&WF–æVB6vRô×VÇF’õ–çBöv—¦Öò÷&F–ÂõF‡&÷Vv‚÷væW'2â6VRFö72÷V&Æ–6F–öâÓCæ§6öââ†÷7FVBF÷öÆöw“C33s3S‚ò¦ö#3CSCsƒCs‚7V'6WVVçFÇ’6ö×ÆWFVB5T44U52Â–æ6ÇVF–ærçÒFW7C²&–÷"VæF–ær7FGW2—27WW'6VFVBâ'V–ÆB6ö×ÆWFRöÆ—fR÷&VG’f÷"DUd”4SC6ÖRÖÖöFVÂ6öæ6fRF&vWF–ærÂ×VÇF’ÖVFvR&W7öç6—fVæW72ÂFööÇ2õVæFõ&VFòæBæf–vF–öââãCW6W"52&÷FV7FVC²æWvÇ’&W—&VB6öæ6fRF&vWF–ær&VÖ–ç2æF—fR×VæF–ærâF†—2f–æÂ&ööb6†ævW26öçF–çV—G’Fö7VÖVçG2öæÇ’Â&WF–æ–ærfÆ–FFVB'VçF–ÖR'—FW2à ¢2ãC"(	Bf6RE$rV6²÷Vç2G&ç6f÷&Òv—¦Öó²ãC&÷FV7FVB52(	Bæ÷fVÖ&W"##` ¥W6W"6—2(	Å52%UN(	Òf÷"ãC¢&÷FV7B66WFVB6öæ6fRÖVFvRF&vWF–æræBW†—7F–ær×VÇF’ÖVFvR&W7öç6—fVæW72â6W&FR&WVW7FVB6÷'&V7F–öã¢f6RE$r6VÆV7F–öâÓâ6Æ–6²&VG’V6²×W7BÆVfRE$ræB÷VâF†Rt•¤ÔòÂæ÷BF†Rf6R&F–ÂFööÇ2â7WW'6VFW2ã3w2FööÇ2ÖÖVçRFW7F–æF–öâöæÇ’â&6VÆ–æRÖ–ã&cSv#Csvcƒ“v3CCCcs6#36S3&3S#ffVb÷'VçF–ÖV†C&C3bÂ&VÆV6SCÂÆ—fRV&Æ–6F–öâæBÆÃ33“’Æö6Â6†V6·2ö†÷7FVB&Vw&W76–öâ66WFVBâVF—B÷&–v–æÂ6VÆV7F–öâÖ–çWBÖ6öçG&öÇ2ÂVFvR×–çB×6VÆV7B7G&ö¶R6ö×ÆWF–öâÂG&r×6VÆV7F–öâ×V6²æBF÷FÂÖv—¦Öò6ÆÆ&6²÷7FFR÷7–æ3²æòGWÆ–6FR÷væW"æVVFVBà ¤öæRgVæ7F–öæÂ6†ævR–âF†RW†—7F–ærF÷FÂÖv—¦Öò&–æDG&u6VÆV7F–öåV6²öäf–æ—6ƒ¢6WD‡V%7FFRG&ç6f÷&Ò–ç7FVBöbFööÇ2ÂF†Vâ÷&–v–æÂg&ÖR7–æ2â&WF–âF†R÷&–v–æÂFÖöæÇ’f–æ—6‚†VÇW"ÂÖ÷fVÖVçBö6æ6VÆÆF–öâö6GW&R÷7FÆRÖæ6†÷"vFW2ÂE$rF—6&ÆR÷væW"æB6VÆV7F–öâ¶W’âæòæWrWfVçBÆ—7FVæW'2Â6VÆV7F–öâ6†ævW2ÂvVöÖWG'’ö†—7F÷'’÷"G&ç6f÷&ÒVæv–æRâ÷&–v–æÂ†W2÷ÆæW2÷&–æw2ôÖ÷fRõ66ÆRõ&÷FFR&V6öÖRf—6–&ÆRf÷"6VÆV7FVBf6W3²&F–Â&VÖ–ç266W76–&ÆRg&öÒW†—7F–ær6÷&æW"6†÷'F7WBâG&vv–ær÷"6æ6VÆÆ–ærF†R&VG’V6²7F–ÆÂFöW2æ÷BW†—BE$râgFW"7V'G&7F–ærWfW'’6VÆV7FVBf6RÂFW†—G2E$ræBF†Rv—¦Öò7F—2†–FFVâ&V6W6RæòG&ç6f÷&ÒF&vWBW†—7G3²æòV×G’f6R×FööÇ2fÆÆ&6²÷Vç2à ¥WFFVBW†—7F–ærã3–çFVw&F–öâW‡V7FF–öç2f÷"F†RW‡Æ–6—FÇ’&WVW7FVBFW7F–æF–öã²&WÆ6R—G2†æB×w&—GFVâ6ÆÆ&6²–Ö—FF–öâv—F‚W‡G&7F–öâöW†V7WF–öâöbF†R5ETÂF÷FÂÖv—¦Öò&–æF–ærÂ&VÂ6VÆV7F–öâÖ–çWBöÆ–7’æB÷&–v–æÂvW7GW&R†VÇW"ö6öçG&öÆÆW"ög&ÖR7–æ2â6÷fW'2G&rF†Vâ&WGW&âÂ6æ6VÆÆF–öâÂFÂ7–æ6‡&öæ÷W2&VfW&Væ6RÖ6†ævR7–æ2ÂW'6—7FVçBG&ç6f÷&Ò7FFRöâÆFW"g&ÖW2ÂVæ6†ævVB6VÆV7FVB”G2ÂV×G’×6VÆV7F–öâ¶W–&ö&B7F—fF–öâæB7FÆRÖö&¦V7B†–F–ærâW†—7F–ærFF—F—fR÷7V'G&7F—fR7G&ö¶RÂ6÷W&6Rö†—7F÷'’Âe$ôåBõF‡&÷Vv‚ôÆ76òæB6æ6VÆÆF–öâ6†V6·2&WF–æVBâF&vWFVCrór52âgVÆÂ&Vw&W76–öâæBV&Æ–6F–öâ&ööbföÆÆ÷râæòæF—fR6f&’ö–çFW"÷"&VæFW&VBÖv—¦Öò52–æfW'&VBg&öÒæöFRFW7G2à ¥&VÆV6SC"Ö&¶W'2ÂF÷FÂÖv—¦Öò6†VÆÂ–âæB6æöæ–6Â&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"ò÷BÖ–â6ö×&—6öâ66†R6Æ÷7W&R&Vg&W6†VBâVæ6†ævVBG&r×6VÆV7F–öâ×V6²&VÖ–ç33²66WFVBÖ–âôVFvR–çB÷–6¶W"&VÖ–ãCÂ6W&FRÖW6‚Æ–6W3CÂ–çC3rÂ&F–Â552ö†VÇW#3RÂ&÷FV7FVB×VÇF“ã3bããæBÆÂF÷öÆöw’ög&÷¦Vâf–ÆW2&WF–æVBâæòW&f÷&Öæ6R÷"ÖVçRÖÆ–÷WB6†ævW2à ¤DUd”4SC#¢f6RE$rFB6WfW&Âf6W2Óâ&VÆV6R6†÷w2V6²öæÇ’ÓâDV6²÷Vç2gVÆÂG&ç6f÷&Òv—¦ÖòæBGW&ç2E$röfbÂæò&F–ÂâÖ÷fR6VÆV7FVBf6W2æBVæFòõ&VFòâ&RÖVçFW"E$rÂ7V'G&7Bf6W3²Ö÷f–ærö6æ6VÆÆ–ærV6²¶VW2E$r7F—fRâW†—7F–ær6÷&æW"6†÷'F7WB7F–ÆÂ÷Vç2f6R&F–Ââ6öæ6fRÖVFvR6VÆV7F–öâãC52&VÖ–ç2&÷FV7FVBâæW‡BföÆÆ÷rFWf–6R&W7VÇBÂF†Vâ&W7VÖRÖV7W&VBW&f÷&Öæ6Rv÷&²v—F†÷WB&VFö–ær66WFVB6VÆV7F–öâõT’÷væW'2à ¥fÆ–FF–öâãC"6†V6·ö–çC¢fö7W6VC32ó3252–æ6ÇVF–ær7GVÂE$r×V6²6ÆÆ&6²ö6öçG&öÆÆW"Âf6Re$ôåBôE$rôÆ76òÂ66WFVCCVFvRf—6–&–Æ—G’Ã3’6vRÃ3r–çBæB&Wf–WvVBÆöFW"6öçG&7G2â7–çF‚öF–fb6ÆVââgVÆÂÆö6Â6öæf—&ÖF–öâ'Vææ–æs²æògVÆÂãC"&W7VÇB6Æ–ÖVB–WBà ¤d”äÂãC"fÆ–FF–öâ÷V&Æ–6F–öâdU$”d”TC¢gVÆÂÆö6Ã2Ã3“’ó2Ã3“’52Ãf–ÇW&W2ö6æ6VÆÆVB÷6¶—2ƒCrã““—2“²fö7W6VC32ó3253²7–çF‚öF–fb6ÆVââ'VçF–ÖSƒ6Sff3†C#v6F3v“sC3s6#sVFC&CBÂFW7FVBG&VVf&S–SFfcƒ6c3vCfSc&CF##sƒ#ƒv6VfS’âvW3C3#sS3CS"'V–ÆBöFWÆ÷’5T44U52âÆÃ‚6†V6¶VB66†RÖ'W7FVBÆ—fRU$Ç2'—FRÖÖF6‚FW7FVB6÷W&6RÂ–æ6ÇVF–ærv—¦ÖóC"æB&VÆV6RÆöFW"6Æ÷7W&RÂVæ6†ævVBvW7GW&R†VÇW#3Â66WFVBÖ–âôVFvR–çB÷–6¶W#CÂÖW6‚Æ–6W3CÂ6vRô×VÇF’õ–çB÷&F–ÂõF‡&÷Vv‚÷væW'2â6VRFö72÷V&Æ–6F–öâÓC"æ§6öââ†÷7FVBF÷öÆöw“C3#sS3“C"ò¦ö#3Cc#cC“CC"7F–ÆÂ–â&öw&W72B&ööc²æò†÷7FVB526Æ–ÖVBâ'V–ÆB6ö×ÆWFRöÆ—fR÷&VG’f÷"f6RE$rÓâDV6²ÓâgVÆÂv—¦ÖòÂÖ÷fRõVæFõ&VFòæBG&rö6æ6VÂ6Öö¶RâãC6öæ6fR6VÆV7F–öâ52&÷FV7FVC²ãC"æF—fRV6²öv—¦Öò66WFæ6RVæF–ærâf–æÂ&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’Â&WF–æ–ærfÆ–FFVB'VçF–ÖR'—FW2à ¢2ãC2(	B7F÷æF—fRVFvR–6²Bf—'7Bf—6–&ÆR†—C²ãC"&÷FV7FVB52(	Bæ÷fVÖ&W"##` ¥W6W"ãC"52öæW‡F'V–ÆB&÷FV7G2f6RE$rÓâFV6²ÓâG&ç6f÷&Òv—¦ÖòÂ2vVÆÂ2ãC6öæ6fR6VÆV7F–öâæBã3’×VÇF’ÖVFvR&W7öç6—fVæW72â&6VÆ–æRÖ–æ#SvSCCƒSssCvV6#ccfSƒC#cfcVcCƒƒ†CVS"÷'VçF–ÖSƒ6SfÂ&VÆV6SC"âVF—B7W'&VçBæF—fR–6¶W"öÖ–â'&–FvRõVæ6–ÂvFRö6ö×öæVçBFövvÆR÷FööÂFVÆVvF–öâæBW†—7F–ærW&f÷&Öæ6R÷væW'2âæ÷&ÖÂ–6´¶–æB6öç7VÖW2öæÇ’†—G5³ÒÂ'WB6†&VB–6¶W"&–67G2ÆÃ'‚6æF–FFW2&Vf÷&R&æ¶–ærâF†—2—266÷VB&VGVæFçB×v÷&²÷÷'GVæ—G’Âæ÷BF–væ÷6VB6W6RöbvVæW&Â÷&&—Bôö&¦V7B'&÷w6W"Ærà ¤öæÇ’6†&VBVFvR×67&VVâ×–6¶–æræBÖ–â6–ævÆRÖ†—B6ÆÆW"6†ævRgVæ7F–öæÆÇ’â&ö¦V7Bö6Æ—ÄÂ&÷†–W2æB&æ²'’F†RU„5B66WFVBV'FW"×—†VÂ&÷†–Ö—G’öFWF‚ö–æFW‚÷&FW"ÂF†VâÇ’÷&–v–æÂãC6Æ÷6W7BÖVFvR×ö–çB&öG’ö66ÇW6–öâ–âF†B÷&FW"âæWr÷F–öæÂf—'7DöæÇ’fÆr7F÷2eDU"f—'7B66WFVBf—6–&ÆR†—C²Ö–âç–6´¶–æB&WVW7G2—Bâ†–FFVâÆVF–ær6æF–FFW2&R7F–ÆÂ&V¦V7FVBÂ†–FFVâÖöæÇ’&VÖ–ç2Ö—72ÂæBF†RW†—7F–ær&öG’öÖFW&–Â÷FöÆW&æ6RöÆö÷6R×66fföÆB'VÆW2&VÖ–ââFVfVÇB–6´†—G2&WGW&ç2F†R6ö×ÆWFR–FVçF–6Â7F6³²F‡&÷Vv‚'—72æBVFvR–çBw2gVÆÂÖ†—B&÷WFRVæ6†ævVBâf6R–6¶W"–væ÷&W2F†R÷F–öâæB&WF–ç2÷&–v–æÂ†—Bf–ÇFW&–ærö÷&FW"âæò66†RÂ7F–Â66VÆW&F–öâÂæWr–6¶W"WfVçB÷væW"ÂÆ—7FVæW'2Â6VÆV7F–öâö†—7F÷'’w&—FW2Â6vRöÖVÖ&W'6†—W‡W&–ÖVçBÂF÷öÆöw’õUböÖFW&–Â÷"G&ç6f÷&Ò6†ævW2à ¤W†7B66WFVB–6¶W"g&÷¦VâDU5BÔôäÅ’VæFW"FW7G2öf—‡GW&W2÷W&f÷&Öæ6RöVFvR×–6¶W"ÓC"æÖ§2…4„Ó#ScF&6#VFVV&3C3VC3ƒS–V&Ff3FV##SV6cCc–VVSCV&3#“C#"’âæWr6†&VBf—‡GW&RW6W2W†—7F–ær—'&VwVÆ"w&–B²&VÂ&VæFW&VB&öG’÷&÷‡’vVöÖWG&–W2æBF‡&VR&–67G2âf÷W"&Vw&W76–öç26ö×&RgVÆÂæBf—'7B×&Vf—‚&W7VÇG27&÷72W'7V7F—fRö÷'F†öw&†–2õF‡&÷Vv‚öÖ—76W2ÂÆ—fR6ÖW&övVöÖWG'’6†ævW2æBVæ6†ævVB6÷W&6S²7GVÂÖ–âæF—fR6–ævÆR–6²Ö¶W2ôäR&öG’&–67Bv†–ÆR7GVÂ–6´†—G2&W6W'fW2ÆÂ÷&–v–æÂ6ÆÇ2÷&W7VÇG3²6Æ÷6W"†–FFVâ6æF–FFR—26¶—VBæB†–FFVâÖöæÇ’6fVÇ’W††W7G2âg&÷¦Vâ&÷fVææ6R÷'VçF–ÖRW†6ÇW6–öâ76W'FVBâW†—7F–ærã“SBW†7B6öçfW‚f—‡GW&RôfÆ—õVæ6–ÂæBãc"7Æ—Bô&WfVÂõ6Æ–FRôöfg6WBôW‡G'VFRÂãCö66ÇW6–öâFW7G2&VÖ–â7F—fRâf—'7Bfö7W6VC’ó’52à ¤ÖF6†VB67&—G2ö&Væ6†Ö&²ÖVFvRÖf—'7BÖ†—BÓC2æÖ§2ÓâFö72÷W&f÷&Öæ6RÖVFvRÖf—'7BÖ†—BÓC2æ§6öâ52ÆÃbF–Ö–ærö6÷'&V7FæW72&÷w2â6ö×ÆWFR6†&VB–6¶W"5R–æ6ÇVFW2&ö¦V7F–öâö6Æ—–ær÷&æ¶–æræB$TÂ&öG’&–67G3²W†6ÇVFW26WGWö6÷VçFW'2÷&V'V–ÆBö6öçG&öÆÆW"÷6VÆV7F–öâ×WFF–öâôuRöæF—fRFVÆ—fW'’ã#RWVÂv&×W2³’ÇFW&æF–ær—&VB6×ÆW2ã#BÖf6R†—CãS#RÓããƒ“f×2ƒãs‚’ÃC“bÖf6S’ãSƒÓãBãCs&×2ƒ"ãG‚’Ãc3ƒBÖf6Ss2ãcRÓã’ãs6×2ƒ2ãƒ‚“²&öG’6ÆÇ3róróCÓãâ&6¶w&÷VæBõF‡&÷Vv‚öFVfVÇBgVÆÂ×7F6²6öçG&öÇ272ÃÓ#R&Vw&W76–öâvFS²gVÆÂ7F6·2Væ6†ævVBâÆ&vW7Bv–âvFRãÓã'‚ÖWBâF†—2—2v&Ò–6¶W"5RöæÇ’ÂäõBv†öÆRF÷f–Ww÷'Böæf–vF–öâö66—G’÷"t4Ò&VæVf—BâæF—fRf—'7B×F÷F‡&÷Vv‚ö6öæ6fRö×VÇF’ÖVFvR&VæVf—B&VÖ–ç2VæF–ærà ¤–æ—F–ÂEtò×v&×WG&–Âf–ÆVB6ÖÆÂÖ†—BÃÓ#RvFS£"ãC3Óã"ã“CV×2v†–ÆR6æF–FFR6×ÆW2fVÆÂg&ö×ã2ãF÷ãã†×2'’f–æÂ6×ÆW2â¶VWW†7Bf–ÆVB&W÷'B–âFö72÷W&f÷&Öæ6RÖVFvRÖf—'7BÖ†—B×G&–ÂÓC2æ§6öã²æòFVÆWF–öâ÷"&VÆ&VÆÆ–ær252â&Wf—6VBWVÃ#R×v&×W&÷Fö6öÂ7F&–Æ—¦W2F†RÖV7W&VBv&Ò7FvS²vFW2Væ6†ævVBæB67&—B&V6÷&G2v‡’âFòæ÷B–æfW"6öÆB×7F'B–×&÷fVÖVçB÷"†–FRF†Rf–ÆVB6ÖÆÂ66Râ'VçF–ÖR'—FW2Væ6†ævVB&WGvVVâG&–Ç2W†6WB7V'6WVVçB66†R–ç2âæF—fR66WFæ6R—26W&FS²Fòæ÷B&WVBã3‚w25RÖöæÇ’66WFæ6RÖ—7F¶Rà ¥&VÆV6SC2Ö&¶W'2öÖ–â÷–6¶W"–ç2æB6æöæ–6Â&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"ö÷BÖ–â6ö×&—6öâ6Æ÷7W&R&Vg&W6†VBâv—¦ÖóC"ÂVFvR–çCCÂ–çC3rÂ&F–Â552ö†VÇW#3RÂGvòÖW6‚–FVçF—F–W3CÂ6vS“3æBU„5BÖ–âæFD6vS3ró3’Â×VÇF“ã3bããÂÖöFVÆÆ–ærög&÷¦Vâf–ÆW2&WF–æVBâæòæWrT’öF–væ÷7F–2âf–æÂ&Vw&W76–öâ÷V&Æ–6F–öâ&ööbföÆÆ÷w2à ¤DUd”4SC3¢ÆöB6ÖRFVç6RÖöFVÂæB6ö×&Rd•%5BæB&WVFVBVFvRF2öFB÷&VÖ÷fS²6öæ6fRf—6–&ÆRVFvW2×W7B7F–ÆÂv–âæB†–FFVâVFvW2æWfW"7FVÂF2âG'’7Æ—Bô&WfVÂæBVæFòõ&VFó²FVfVÇBf—6–&ÆRöW‡Æ–6—BF‡&÷Vv‚–çF–ær–bW6VC²f6RE$rÓâV6²Óâv—¦Öò7F—266WFVBâæf–vF–öâõ–çBV–6²6Öö¶RâæW‡BföÆÆ÷ræF—fR&W7VÇBÂF†Vâ&öf–ÆR&VÖ–æ–ær7GVÂ&V'V–ÆBö6öçG&öÆÆW"÷"vW7GW&RÖöç6WB6÷7B&Vf÷&Ræ÷F†W"5Rõt4Ò7FvS²Fòæ÷BW‡G&öÆFR–6¶W"ÖöæÇ’çVÖ&W'2à ¥fÆ–FF–öâãC26†V6·ö–çC¢fö7W6VCC2óC252†æWrö66WFVBVFvR–6¶–æræBFööÂFVÆVvF–öâÂf6RæF—fR†—B×7F6²ÂãC"V6²Âã3’6vRæB&VÆV6R6öçG&7G2’âÖF6†VBv&Ò–6¶W"&Væ6†Ö&²ÆÃb&÷w252v—F‚f–ÆVBGvò×v&×WG&–Â&WF–æVBâgVÆÂ7V—FR'Vææ–æs²7–çF‚öF–fb6ÆVâÂæò'VçF–ÖR6†ævW2gFW"ÖV7W&VB6æF–FFRW†6WB66†R–ç2â&–÷"ãC"†÷7FVBF÷öÆöw“C3#sS3“C"æ÷r5T44U52à ¤d”äÂãC2fÆ–FF–öâ÷V&Æ–6F–öâdU$”d”TC¢gVÆÂÆö6Ã2ÃC2ó2ÃC252Ãf–ÇW&W2ö6æ6VÆÆVB÷6¶—2ƒsã“#W2“²fö7W6VCC2óC253²ÆÃbÖF6†VBv&ÖVB×–6¶W"&Væ6†Ö&²&÷w252â–æ—F–ÂGvò×v&×W6ÖÆÂÖ66Rd”Â&WF–æVBv—F‚&÷Fö6öÂW‡ÆæF–öã²æò6öÆBöæF—fR7VVGW–æfW'&VBâ'VçF–ÖSƒsSv6f6ƒcC6#3ƒf3#c#3cFCSƒcFC#f363RÂFW7FVBG&VVcƒ†#3“#3c63S–SCV6Vcs““FcFFcvƒƒ3–2âvW3C3Ssƒ“'V–ÆBöFWÆ÷’5T44U52âÆÃ#6†V6¶VB66†RÖ'W7FVBÆ—fRU$Ç2'—FRÖÖF6‚6÷W&6RÂ–æ6ÇVF–ærÖ–â÷–6¶W"öÆöFW'3C2Â&÷F‚&Væ6†Ö&²&W÷'G2Â&WF–æVBv—¦ÖóC"æBVFvR–çCCÂ6W&FRÖW6‚Æ–6W3CæB6vRô×VÇF’õ–çB÷&F–ÂõF‡&÷Vv‚÷væW'2â6VRFö72÷V&Æ–6F–öâÓC2æ§6öââ†÷7FVBF÷öÆöw“C3Ss“S#ò¦ö#3C“###C3R7F–ÆÂ–â&öw&W72B&ööc²æò†÷7FVB526Æ–ÖVBâ'V–ÆB6ö×ÆWFRöÆ—fR÷&VG’f÷"f—'7B÷&WVFVBFVç6RVFvRF2Â6öæ6fRf—6–&–Æ—G’Â×VÇF’ÖVFvRFB÷&VÖ÷fRæB66WFVBf6RE$rV6²6Öö¶RâãC"W6W"52&÷FV7FVC²ãC2æF—fRf—'7B×F÷&W7öç6—fVæW72VæF–ærâf–æÂ&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’Â&WF–æ–ærfÆ–FFVB'VçF–ÖR'—FW2à ¢2ãCB(	B&VGV6RFV×÷&'’ÆÆö6F–öç2–â÷&–v–æÂVFvR&ö¦V7F–öã²ãC2&÷FV7FVB52(	Bæ÷fVÖ&W"##` ¥W6W"(	ÅW&fV7B52öæW‡F'V–ÆN(	Ò66WG2ãC2VFvR–6¶–ær÷&W7öç6—fVæW72â&÷FV7BW†7B66WFVBf—'7B×f—6–&ÆRöÆ–7’Â6öæ6fRF&vWF–ærÂ×VÇF’ÖVFvR6VÆV7F–öâæBãC"f6RE$rÓâV6²Óâv—¦ÖòâVF—BÖ–æS“66sfcVcvc#3f6Ss“6#†F#C#c–s3ƒFCf÷'VçF–ÖSƒsSv6f6Â&VÆV6SC2Â6†&VB&ö¦V7F–öâ÷f—6–&–Æ—G’÷væW"æBW†—7F–ær&Væ6†Ö&²â&VÖ–æ–ær–6¶W"7F–ÆÂ7&VFW2GvòVæGö–çBfV7F÷#72æBf÷W"fV7F÷#G2W"VFvRÂW"ÖVFvR6Æ—×ÆæR'&—2æBf–æ—FR×FW7B'&—2âæòg&W6‚66†Rô%d‚öWfVçB÷væW"æVVFVBà ¤öæÇ’W†—7F–ærVFvR×67&VVâ×–6¶–ær6†ævW2gVæ7F–öæÆÇ“¢6—‚–çfö6F–öâÖÆö6Â67&F6‚fV7F÷'2‡GvòVæGö–çG2öf÷W"†öÖövVæV÷W26Æ—fV7F÷'2’Â&W6WB6ö×ÆWFVÇ’f÷"V6‚&÷‡“²6æF–FFRv÷&ÆBö–çG2÷67&VVç2&VÖ–â–æFWVæFVçFÇ’ÆÆö6FVBW†7FÇ’2&Vf÷&Râ&WÆ6R'&’Ö&6VBf–æ—FR6†V6·2v—F‚F†R6ÖRV–v‡B66Æ"6†V6·3²—FW&FR4ÔR6—‚ÆæW2–â4ÔR÷&FW"W6–ærÆæR–æFW‚ö†—2÷6–vâ–ç7FVBöbW"ÖVFvR'&—2âÆÂÖG&—‚×VÇF—Æ–6F–öâö–çFW'öÆF–öâö6Æ—–ær&÷VæG2ÂæV"öf"öÆ–7’Ã'‚F&vWBÂV'FW"×—†VÂöFWF‚ö–æFW‚÷&FW"Â&öG’f—6–&–Æ—G’÷FöÆW&æ6W2Âf—'7DöæÇ’öFVfVÇBgVÆÂ7F6·2õF‡&÷Vv‚Væ6†ævVBâæò&WF–æVB&ö¦V7F–öç2÷"6†&VB7&÷72Ö6ÆÂ67&F6‚Â6÷W&6Rw&—FW2Â6VÆV7F–öâö†—7F÷'’ÂÆ—7FVæW'2Â6vRö&F6‚ö&öG’õUb÷F÷öÆöw’÷G&ç6f÷&Ò6†ævRâÖ–â6÷W&6R6†ævW2öæÇ’F†R†VÇW"–×÷'B–âà ¤W†7B66WFVBãC2–6¶W"g&÷¦VâDU5BÔôäÅ’BFW7G2öf—‡GW&W2÷W&f÷&Öæ6RöVFvR×–6¶W"ÓC2æÖ§2Â4„Ó#Sc&CVCƒ#CVCSsvfS3ƒFSFCƒ“ƒCcsCs&SsSCcCƒ–Cf&f6cf&#–FcV&#VSfCvSSBâf÷W"æWr&Vw&W76–öç26ö×&Rf—'7BögVÆÂõF‡&÷Vv‚&W7VÇG27&÷726ÖW&2÷G&ç6f÷&ÖVB&VçG2÷&WVFVBÆ—fRVF—G2ÂVæ6†ævVB6÷W&6RÂ–çfÆ–B6ö÷&F–æFW2÷&ö¦V7F–öâÂ¦W&òÖÆVæwF‚æBæV"ö&V†–æBöf"6Æ—–æs²W†V7WFR7GVÂ–6¶W"v—F‚6÷VçFVBF‡&VRfV7F÷"7V&6Æ76W2Fò&÷fRdõU"6Æ—×fV7F÷"6öç7G'V7F–öç2W"–çfö6F–öâ&F†W"F†âW"&÷‡’ÂæWr67&F6‚V6‚6ÆÂÂæB–FVçF–6Â÷WGWBâ–æFWVæFVçB6æF–FFR†—Bö–çG2&WF–â–FVçF—G’VæFW"gVÆÂ×7F6²f—6–&–Æ—G’âW†—7F–ærãC2f—'7DöæÇ’ÂãC6öæ6fRÂã“SBW†7B6öçfW‚ôfÆ—õVæ6–ÂæBãc"FööÇ2&VÖ–â7F—fRâ–æ—F–Âfö7W6VC#2ó#253²gVÆÂfÆ–FF–öâföÆÆ÷w2à ¤ÖF6†VB67&—G2ö&Væ6†Ö&²ÖVFvRÖÆÆö6F–öâÓCBæÖ§2ÓâFö72÷W&f÷&Öæ6RÖVFvRÖÆÆö6F–öâÓCBæ§6öâ52ÆÃb&÷w2â4ÔR66WFVBf—'7DöæÇ’õF‡&÷Vv‚ögVÆÂ×7F6²÷F–öç2–â$õD‚÷væW'3²&VÂ—'&VwVÆ"w&–G2ö&öG’÷&÷†–W2æBF‡&VR&–67G2ã#RWVÂv&×W2³’ÇFW&æF–ær—&VB6×ÆW3²–æ6ÇVFW26ö×ÆWFR6†&VB&ö¦V7F–öâö6Æ—–ær÷&æ¶–ær÷f—6–&–Æ—G’5RÂW†6ÇVFW26WGWö6÷VçFW'2÷&V'V–ÆBö6öçG&öÆÆW"ôuRöæF—fRFVÆ—fW'’ã#BÖf6SãƒƒbÓããsC–×2ƒ"ãS'‚’ÃC“bÖf6S‚ã##2ÓãRãƒ×2ƒãc'‚’Ãc3ƒBÖf6S3rã‚Óã#ãSc×2ƒãƒ‚’âÆ&vW7BãÓã'‚vFRæBÆÂÃÓ#R6öçG&öÂvFW272â&öG’&–67G2”DTåD”4Â‡6–ævÆR†—G3ÓãÂgVÆÂ×7F6³rÓãr’Â6òF†—2—2FF—F–öæÂ&ö¦V7F–öâv÷&²&VGV7F–öâÂæ÷B&WVB6Æ–ÒöbãC2&–67B6f–æw2â—&VB7W'&VçB×'VâçVÖ&W'26ææ÷B&R7VÖÖVBv—F‚&–÷"×'VâF–Ö–æw2âv&Ò–6¶W"öæÇ“²æòf—'7B×FögVÆÂÖöæf–vF–öâö66—G’÷"t4Ò6Æ–Òà ¥&V¦V7FVBf—'7BG&–Ã¢66Æ"f–æ—FRFW7G2²g&÷¦Vâ6—‚×ÆæRF&ÆRv—F†÷WB67&F6‚&WW6RvfRÆ&vW7C3BãcS"Óã3ã–×2ƒãG‚’Â&VÆ÷sãÓã'‚âW†7B&W÷'B&WF–æVBFö72÷W&f÷&Öæ6RÖVFvRÖÆÆö6F–öâ×G&–ÂÓCBæ§6öâ2d”Â÷&V¦V7FVC²æòvFR÷"6×ÆR6†ævVBâf–æÂ6æF–FFR&WÆ6W2F&ÆR—FW&F–öâæB&WW6W2–çfö6F–öâÖÆö6ÂfV7F÷'3²6ÖR&Væ6†Ö&²&÷Fö6öÂövFW2âFòæ÷B6†—W"Ö÷W&F–öâöÆÆö6F–öâÖ6÷VçBÖöæÇ’6†ævW2v—F†÷WBW6VgVÂ6ö×ÆWFRÖV7W&VB×7FvR–×&÷fVÖVçB÷"–æfW"æF—fR66WFæ6Rg&öÒ5R&—G’à ¥&VÆV6SCB6†VÆÂöÖ–â÷–6¶W"¶W—2æB6æöæ–6Â&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"ö÷BÖ–â6ö×&—6öâ6Æ÷7W&R&Vg&W6†VBâ&÷FV7FVBv—¦ÖóC"ÂVFvR–çCCÂ–çC3rÂ&F–Â552ö†VÇW#3RÂÖW6‚Æ–6W3CÂ6vS“3æBU„5BÖ–âæFD6vS3ró3’Â×VÇF“ã3bããæBÆÂÖöFVÆÆ–ærög&÷¦Vâ6÷W&6W2&WF–æVBâæòæWrF–væ÷7F–2õT’âf–æÂ6†V6·2÷V&Æ–6F–öâ&ööbföÆÆ÷rà ¤DUd”4SCC¢d•%5B÷&WVFVBF2öFB÷&VÖ÷fRöâ6ÖRFVç6RÖöFVÂ&VÖ–â&W7öç6—fS²6öæ6fRf—6–&ÆRVFvW27F–ÆÂv–ââ÷&&—B÷¦ööÒF†Vâ6VÆV7Bæ÷F†W"VFvRÂG'’7Æ—Bô&WfVÂæBVæFòõ&VFòâf6RE$rÓâFV6²Óâv—¦ÖòæB–çB&6¶w&÷VæBF6Öö¶RâãC2W6W"52&÷FV7FVC²ãCBæF—fR&W7öç6—fVæW72VæF–ærâæW‡BföÆÆ÷rFWf–6R&W7VÇBæB&öf–ÆR&VÖ–æ–ær7GVÂ6öçG&öÆÆW"÷&V'V–ÆBöæF—fRFVÆ—fW'’&Vf÷&Ræ÷F†W"5Rõt4Ò7FvS²Fòæ÷B6Æ–ÒvVæW&ÂvW7GW&RÖöç6WBÆr6öÇfVBà ¥fÆ–FF–öâãCB6†V6·ö–çC¢fö7W6VCC2óC252–æ6ÇVF–ærÆÆö6F–öâ÷&—G’Â66WFVBf—'7B×f—6–&ÆRö6öæ6fRöW†7B6öçfW‚÷FööÂ–6¶–ærÂf6RæF—fR'&–FvRÂãC"V6²Âã3’6vRæB&VÆV6R6öçG&7BâÖF6†VB6ö×ÆWFRv&Ò–6¶W"&Væ6†Ö&²ÆÃb&÷w253²&V¦V7FVBf—'7BG&–Â&WF–æVBd”Ââ7–çF‚öF–fb6ÆVã²gVÆÂ7V—FR'Vææ–ærâ&–÷"ãC2†÷7FVBF÷öÆöw“C3Ss“S#æ÷r5T44U52à ¤d”äÂãCBfÆ–FF–öâ÷V&Æ–6F–öâdU$”d”TC¢gVÆÂÆö6Ã2ÃCró2ÃCr52Ãf–ÇW&W2ö6æ6VÆÆVB÷6¶—2ƒ332ãS#72“²fö7W6VCC2óC253²ÆÃbÖF6†VB6ö×ÆWFRv&Ò×–6¶W"&Væ6†Ö&²&÷w252â&V¦V7FVBf–æ—FRög&÷¦Vâ×F&ÆRÖöæÇ’f—'7BG&–Â&WF–æVBd”Ã²f–æÂ–çfö6F–öâÖÆö6Â67&F6‚6æF–FFR—2F†RöæÇ’6†—VB6†ævRâ'VçF–ÖS3s“#S6C“†CSSCCSV6fcv6cV6CCff#3c3“bÂFW7FVBG&VS&3cS#Sƒ63“ƒS#333ƒ“–VCVC3&SV2âvW3C3CC“3csb'V–ÆBöFWÆ÷’5T44U52âÆÃ#6†V6¶VB66†RÖ'W7FVBÆ—fRU$Ç2'—FRÖÖF6‚6÷W&6RÂ–æ6ÇVF–ærÖ–âö†VÇW"öÆöFW"6Æ÷7W&SCBÂ&÷F‚&Væ6†Ö&²&W÷'G2æB&WF–æVBv—¦ÖóC"ôVFvR–çCCÂÖW6‚Æ–6W3CÂ6vRô×VÇF’õ–çB÷&F–ÂõF‡&÷Vv‚÷væW'2â6VRFö72÷V&Æ–6F–öâÓCBæ§6öââ†÷7FVBF÷öÆöw“C3CC“S##’ò¦ö#3S#Sƒ#7F–ÆÂ–â&öw&W72B&ööc²æò†÷7FVB526Æ–ÖVBâ'V–ÆB6ö×ÆWFRöÆ—fR÷&VG’f÷"6ÖRÖÖöFVÂf—'7B÷&WVFVBVFvRF2Â6öæ6fRF&vWF–ærgFW"æf–vF–öâæB66WFVBf6RE$rÓâv—¦Öò6Öö¶RâãC2W6W"52&÷FV7FVC²ãCBæF—fR&W7öç6—fVæW72VæF–ærâf–æÂ&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’Â&WF–æ–ærfÆ–FFVB'VçF–ÖR'—FW2à ¢2ãCR(	Bf—6–&ÆRVFvR7vVWW6W266WFVBf—'7BÖ†—BöÆ–7“²ãCB&÷FV7FVB52(	Bæ÷fVÖ&W"##` ¥W6W"ãCB52öæW‡F'V–ÆB&÷FV7G2—G2–6¶–ær÷&W7öç6—fVæW72ÂãC6öæ6fRf—6–&–Æ—G’ÂãC2f—'7B×f—6–&ÆRF2æBãC"f6RE$rÓâV6²Óâv—¦ÖòâVF—BÖ–ãcs“F3##S“&C&F#Sƒ&Cs#3CFVCv#cC6c6’÷'VçF–ÖS3s“#S6BÂ&VÆV6SCBÂ÷&–v–æÂVæ6–Â&÷WF–ærÂ6ö×öæVçBÖ×VÇF’Ö–æ—BÂVFvR–çB6×ÆW"æBÖ–â÷6†&VB–6¶W"â6ö×öæVçB×VÇF’—2–çFVçF–öæÆÇ’WFòÖVæ&ÆVB'’6ö×öæVçBÖ×VÇF’Ö–æ—C3C²VFvR7vVW—2Æ—fRW†—7F–ær&V†f–÷W"Âæ÷BæWr†–FFVâFööÂâf—6–&ÆR†—D–æF–6W2fWF6†VBgVÆÂ7F6²F†Vâ¶WBöæÇ’f—'7B”Bà ¥6†—–ærôäÅ’÷&–v–æÂVFvR×–çB×6VÆV7Bæ†—D–æF–6W26ÆÂöÆ–7“¢f—6–&ÆRTDtR&WVW7G2W†—7F–ærÖ–â–6´†—G2v—F‚F‡&÷Vvƒ¦fÇ6RÆf—'7DöæÇ“§G'VRâF‡&÷Vv‚æBf6R&WF–âU„5B÷&–v–æÂ6ÆÂö÷F–öç2†æòæWrfÆr’âW†—7F–ær”BVæ—VVæW72öf–ÇFW&–æröf—'7B×6VÆV7F–öâÂFWF‚ôe$ôåBÆöv–2æBVçF—&RvW7GW&R÷–çBö†—7F÷'’÷6VÆV7F–öâ÷&–67B÷væW'2Væ6†ævVBâfW'FW‚fÆÆ&6²Væ6†ævVBâæòæWrWfVçBÆ—7FVæW'2ÂvW7GW&RF‡&W6†öÆG2ÂT’Â&ö¦V7F–öâ÷&æ¶–æröö66ÇW6–öâÆv÷&—F†ÒÂF÷öÆöw’ö66†Rö&öG’ö6vRõUb÷G&ç6f÷&Ò6†ævRâÖ–â÷6†&VB–6¶W"&VÖ–â66WFVCCC²÷&–v–æÂVæ6–ÂvFR—2'—FRÖW†7B66WFVCCB…4„Ó#Sc#Vfc#ƒCCFCV#363†&Ccf†#6c““s&CFsC6&cFFCƒfc†cF&f6#3v&f3“66S‚’ÂäõBF†R&V¦V7FVB&÷VæG2W‡W&–ÖVçBà ¤ÖF6†VB67&—G2ö&Væ6†Ö&²ÖVFvR×7vVWÓCRæÖ§2ÓâFö72÷W&f÷&Öæ6RÖVFvR×7vVWÓCRæ§6öâ52ÆÃR&÷w2â7GVÂ†—D–æF–6W26÷W&6R†öÆBg&÷¦VâFW7G2öf—‡GW&W2÷W&f÷&Öæ6RöVFvR×–çBÖ†—BÓCBæÖ§2’²4ÔRæF—fR'&–FvRö66WFVCCB–6¶W"ö&öG’÷&÷†–W2–â&÷F‚÷væW'2ã#Rv&×W2Ã’ÇFW&æF–ær—&VB6×ÆW3²–æ6ÇVFW26ö×ÆWFR”Bf–ÇFW&–ær÷&ö¦V7F–öâö6Æ—–ær÷&æ¶–ær÷&VÂ&öG’&—2ã#BÖf6SãS"ÓããSF×2ƒ"ã“‡‚’ÃC“bÖf6SãcS‚Óã2ã#Cf×2ƒ2ã#‡‚’Ãc3ƒBÖf6S“BãSc’Óãbã3†×2ƒRãƒ‚“²&öG’&—3róróCÓãâ”G2W†7C²&6¶w&÷VæBõF‡&÷Vv‚6öçG&öÇ273ÃÓ#R&Vw&W76–öâvFRâÆ&vW7CãÓã'‚ÖWBâv&ÒTDtR4TÄT5D”ôâ4ÕÄRöæÇ’ÂW†6ÇVFW2vW7GW&RF—7F6‚Â6VÆV7F–öâ×WFF–öâ÷&V'V–ÆBö6öçG&öÆÆW'2ôuRöæF—fRFVÆ—fW'’âæòUb''W6‚ÂgVÆÂ7G&ö¶RÂf—'7B×FÂf–ævW"Öæf–vF–öâö66—G’÷"t4Ò7VVB6Æ–Òà ¤–æ—F–Â6×ÆW"f&–çB76VBf—'7DöæÇ“¦fÇ6RöâF‡&÷Vv‚ôf6R2vVÆÃ²—G2F‡&÷Vv‚5R6öçG&öÂf–ÆVCÃÓ#Râ¶VW÷&–v–æÂ&W÷'BFö72÷W&f÷&Öæ6RÖVFvR×7vVW×G&–ÂÓCRæ§6öâ2&V¦V7FVBÂæò6×ÆW2övFW26†ævVBâf–æÂ'&æ6†W2&W6W'fRöÆBF‡&÷Vv‚ôf6R÷F–öç2W†7FÇ’æB&WVW7Bf—'7DöæÇ’6öÆVÇ’f÷"f—6–&ÆRVFvRâF‡&VR6†—–ær&Vw&W76–öç2W†V7WFR7GVÂöÆBöæWr6×ÆW"æBÖ–â'&–FvRÂ”G2÷&’6÷VçG2õF‡&÷Vv‚öÖ—76W2öÆ—fR6ÖW&&Vg&W6‚Â5ETÂVæ6–ÂVFvRVæF–ærÓç–çBÓç&VÆV6RæBæò÷&&—Bö†—7F÷'’÷6÷W&6R6†ævW2Âf6Re$ôåBõF‡&÷Vv‚v—F†÷WBVFvRfÆrÂæB&V¦V7FVBæf–vF–öâ6öFR'6Væ6RâæWrFW7G2Fòæ÷B&V–×ÆVÖVçB6×ÆW"7F–öç2âW†—7F–ærfÆöF–ærÖVFvRöFVfW'&VBÖ÷&&—Bö6öæ6fRõ–çBôE$r6†V6·2&VÖ–â7F—fRà ¥$T¤T5DTBVæ6–Âæf–vF–öâ&÷VæG2W‡W&–ÖVçC¢VF—Bf÷VæB÷&–v–æÂvFR'V–ÆG2FV×÷&'’vVöÖWG'’f÷"ÖW6‚ö&6¶w&÷VæB6Æ76–f–6F–öââ6öç6W'fF—fRg&W6‚&÷VæG2wV&B6†–WfVBÆ&vRÖ—72v–ç2'WBf–æÃ²ÖöFVÂÖ†—B6öçG&öÃ3ã“CRÓã3rã#×2‚³#ã#RR’f–ÆVCÃÓ#RÆ–Ö—BâFòäõB6†—÷&V–çG&öGV6R&6VBöâÖ—72ÖöæÇ’v–ç2â'VçF–ÖRvFRgVÆÇ’&W7F÷&VBâÆÂG&–Âö†&æW72÷†6R&rFF&6†—fVBFö72÷W&f÷&Öæ6R×Væ6–ÂÖ&6¶w&÷VæB×&V¦V7FVBÓCRæ§6öââg&÷¦VâgVÆÂ&V¦V7FVBvFRFW7G2öf—‡GW&W2÷W&f÷&Öæ6R÷Væ6–ÂÖ&÷VæG2×&V¦V7FVBÓCRæ§2—2DU5BÔôäÅ“²f—fR6ÆV&Ç’æÖVB&V¦V7FVBÖW‡W&–ÖVçB6†V6·2&W6W'fR6÷'&V7FæW72ôfÆöC3"&÷VæG2ö–çfÆ–BÖFFö†—7F÷'’övW7GW&RWf–FVæ6RÂæ÷BæF—fR÷"6†—–ær66WFæ6RâFW7B†VÇW"Væ6–Â×6VÆV7F–öâ×'VçF–ÖRv–ç2÷F–öæÂvFU6÷W&6R–æ¦V7F–öâf÷"F†—2†—7F÷&–6Âf—‡GW&S²FVfVÇBÄÂW†—7F–ærFW7G27F–ÆÂÆöB&VÂVæ6†ævVB'VçF–ÖRâ÷&–v–æÂ6Æ76–f–W"g&÷¦Vâ6W&FVÇ’f÷"&W&öGV6–&ÆR&Væ6†Ö&·2â67&—G2ö&Væ6†Ö&²×Væ6–ÂÖ&6¶w&÷VæBÓCRæÖ§2W‡Æ–6—FÇ’&Væ6†Ö&·2&V¦V7FVBf—‡GW&RÂw&—FW2&W'Vâ&W÷'BÂæWfW"÷fW'w&—FW2&6†—fVBFV6—6–öç2à ¤†&æW72ÆW76öã¢–æ—F–ÂfÒÖvÆö&Â×&÷‡’F–Ö–ærF—7&÷÷'F–öæFVÇ’6†&vVBæWrçVÖ&W"ô'&’Æö÷2v†–ÆRvVöÖWG'’ÖWF†öG2&âæF—fRâ6öçG&öÆÆVBW†7B×6÷W&6RfÒöæF—fRVF—BæB&rd”Â&W7VÇG2&VÖ–â–â&6†—fRâf–æÂ6ö×&—6öâW6W2æF—fRÖ6ö×–ÆVBW†7B6÷W&6RgVæ7F–öç2v—F‚–æ¦V7FVB7FFRf÷"$õD‚÷væW'3²6Æ76–f–W"6÷'&V7FæW72Ç6ò6ö×&VBv—F‚—6öÆFVBdÒâvFW27F–VBf—†VBâ7V'6WVVçBæF—fRVæ6öæF—F–öæÂfÆ–FF–öâæBÆ§’&÷ƒ26æF–FFW2f–ÆVB7W&f6R6öçG&öÇ3²66Æ"Ö–âöÖ‚f–æÂÇ6òf–ÆVC²†—B'—ãã#RW&6VçFvRö–çG2â†6RVF—B–FVçF–f–VBW‡G&&Vf—‚6÷7BövVöÖWG'’f&–æ6S²æòF‡&W6†öÆB&VÆ†F–öâ÷"&WG'’×FòÖw&VVââFòæ÷B–æfW"&6¶w&÷VæBöf–ævW"vW7GW&RÆr6öÇfVBâæWr6ÆVâ6×ÆW"—26W&FR66WFVBÖ÷væW"&WW6RgFW"&V¦V7F–ærF†—2Æ–æRà ¥&VÆV6SCRÖ&¶W'2ôVFvR–çB–âæB6æöæ–6Â&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"ö÷BÖ–â6ö×&—6öâ6Æ÷7W&R&Vg&W6†VBâÖ–â÷–6¶W#CBÂ÷&–v–æÂVæ6–ÂvFSÂv—¦ÖóC"Â–çC3rÂ&F–Â552ö†VÇW#3RÂÖW6‚Æ–6W3CÂ6vS“3æBU„5BÖ–âæFD6vS3ró3’Â×VÇF“ã3bããæBÆÂÖöFVÆÆ–ærög&÷¦Vâ6÷W&6W2&WF–æVBâæòæWrT’öF–væ÷7F–2âgVÆÂfÆ–FF–öâ÷V&Æ–6F–öâ&ööbföÆÆ÷w3²ãCRæF—fR7vVW&W7öç6—fVæW72VæF–ærà ¤DUd”4SCS¢Væ6–Â7vVW7&÷726WfW&ÂVç6VÆV7FVBVFvW2FG2F†R–çFVæFVBf—6–&ÆRVFvW2v—F†÷WB÷&&—B7FVÆ–ær6öçF7C²&VÆV6Rö6æ6VÂF†Vâæf–vF–öâ&VÖ–âW6&ÆRâ–bW6–ærW‡Æ–6—BF‡&÷Vv‚6VÆV7F–öâÂ—B7F–ÆÂ–æ6ÇVFW2&V"VFvW3²f—6–&ÆR×W7B&WF–â6öæ6fRg&öçBF&vWF–ærâf6RE$rÓâFV6²Óâv—¦ÖòæBÖ÷fRõVæFõ&VFò6Öö¶RâæòæWrVæ6–Â&6¶w&÷VæBÖæf–vF–öâ7VVBFW7B÷"UbÖ''W6‚6†ævR6†—2âæW‡BföÆÆ÷ræF—fR&W7VÇBÂF†Vâ&öf–ÆR7GVÂ&VÖ–æ–ær6öçG&öÆÆW"÷&V'V–ÆB6÷7C²&÷VæG26Æ76–f–W"W‡W&–ÖVçB&VÖ–ç2&V¦V7FVBVçF–ÂÖöFVÂÖ†—Bæò×&Vw&W76–öâvFW26â&RÖWBà ¥fÆ–FF–öâãCR6†V6·ö–çC¢fö7W6VCSbóSb52Â–æ6ÇVF–ærD…$TR6†—–ær6×ÆW"6†V6·2Âf—fRW‡Æ–6—FÇ’$T¤T5DTBÖ6æF–FFR6†V6·2ÂW†—7F–ærfÆöF–ærÖVFvRõVæ6–Âö6öæ6fRõ–çBôf6RE$ræB&VÆV6R6öçG&7G2âÖF6†VB6†—–ær6×ÆW"&Væ6†Ö&²ÆÃR&÷w253²Vç7V66W76gVÂ&÷VæG2v÷&²—2&6†—fVBæBgVÆÇ’&WfW'FVBâ7–çF‚öF–fb6ÆVã²gVÆÂ7V—FR'Vææ–ærâ&–÷"ãCB†÷7FVBF÷öÆöw“C3CC“S##’æ÷r5T44U52à ¤d”äÂãCRV&Æ–6F–öâ÷fÆ–FF–öâdU$”d”TBF‡&÷Vv‚6öææV7FVBv—D‡V#¢†÷7FVBF÷öÆöw“C3#“#3CSò¦ö#3S#3c#s3C"6†V6¶VB÷WB'VçF–ÖScC“#ƒ“f3†3#ƒVVS6SSfV&ccƒc"æB6ö×ÆWFVC2ÃCRó2ÃCR52Ãf–ÇW&W2ö6æ6VÆÆVB÷6¶—2ƒƒ‚ãcSG2“²W†7BÆörF÷FÇ2–ç7V7FVBâÆö6Âfö7W6VCSbóSb52âÆö6ÂgVÆÂ'Vâ7F'FVB'WB—G2f–æÂF÷FÇ2vW&RVæf–Æ&ÆRgFW"v÷&·76RG&ç7÷'BF—66öææV7FVC²Fòæ÷B6Æ–Ò6ö×ÆWFVBÆö6ÂgVÆÂ'VââvW3C3#“#3#CR'V–ÆBöFWÆ÷’5T44U52â7W'&VçBÖ–âfW'6–öâæ§6öâÂ…DÔÂF—FÆRöFF÷f—6–&ÆRÖ&¶W"ÂVFvR–çCCR–âæB6÷W&6R&Æö'2ÖF6‚F†RFW7FVBV&Æ—6†VB&VÆV6S²Ö–â÷–6¶W#CBÂ÷&–v–æÂVæ6–ÂvFSæBv—¦ÖóC"&WF–æVBâæòF—&V7BV&Æ–2Ô4Dâ'—FR6ö×&—6öâ6ö×ÆWFVC¢v÷&·76Rv2Væf–Æ&ÆRæBÇFW&æFRfWF6‚FööÇ26÷VÆBæ÷B&VBvW3²æó#Öf–ÆRÆ—fRÖ'—FR–FVçF—G’6Æ–ÖVBâ6VRFö72÷V&Æ–6F–öâÓCRæ§6öââ'V–ÆB6ö×ÆWFR÷V&Æ—6†VB÷&VG’f÷"Væ6–ÂVFvR7vVWÓâ&VÆV6Röæf–vF–öâÂf—6–&ÆRõF‡&÷Vv‚F&vWF–æræB66WFVBf6RE$rÓâv—¦ÖòFW7G2âöæÇ’F†R6×ÆW"öÆ–7’6†—3²&÷VæG2W‡W&–ÖVçB—2gVÆÇ’&V¦V7FVB÷&W7F÷&VBÂ—G2f—fR6÷'&V7FæW72FW7G2W‡Æ–6—FÇ’†—7F÷&–6Ââ6öçF–çVRg&öÒ&VÖ÷FRÖ–ã²&V6öææV7Bö6ÆöæR&F†W"F†âG'W7BF—66öææV7FVB67&F6‚7FFRâF†—2f–æÂ&ööb6†ævW26öçF–çV—G’Fö7VÖVçG2öæÇ’Â&WF–æ–ærFW7FVB'VçF–ÖR'—FW2à ¢2ãCb(	B&VÂ÷BÖ–â¥2õt4Ò–Æ÷C²ãCR&÷FV7FVB52(	Bæ÷fVÖ&W"##` ¥W6W"52&÷FV7G2ãCRf—6–&ÆRVFvR7vVW&W7öç6—fVæW72æBW†—7F–ærãC6öæ6fRg&öçBF&vWF–ærÂãC"f6RE$rÓâV6²ÓâG&ç6f÷&Òv—¦ÖòÂãC2òãCB–6¶W"v÷&²âW6W"6·2v†WF†W"t4Ò†2&VVâ'VÆVB÷WC¢äòâF†R¥2v÷&²v2&W&WV—6—FRÖV7W&VBv7FR&VÖ÷fÃ²7W'&VçBF—&V7F–öâæ÷rGfæ6W2g&öÒ#ô#Fòsõs&ööböbfÇVRÂæ÷Bâ–æFVf–æ—FRVWVRöbF–ç’¥2GvV·2à ¤VF—FVB7W'&VçBÖ–ã#“cfFR÷'VçF–ÖScC“#ƒÂÖ&¶W'3CRÂ67&—Bö66†Rw&‚ÂW†—7F–ærW&f÷&Öæ6RÆ#“bõT“bæBÖW6ƒC6¶–ær÷væW"âæò'VçF–ÖRt4ÒÖöGVÆRW†—7FVBâ&VB$õ„Ä%õt4ÕõU$dõ$Ôä4Uô„äDôdbæÖC¢&WF–â¥2fÆÆ&6²Â6ö×ÆWFRG&ç6fW"öÆÆö6F–öâö¶W&æVÂö6÷–&6²6÷7G2ÂW†7B&—G’Â&rÖF6†VB6×ÆW2ÂÖVÖ÷'’&÷†–W2æBæF—fR•BvFW2â&WW6Rd”UrâF–væ÷7F–72âW&f÷&Öæ6RÆ#²æWr6ö×&R¥2òt4Ò—2÷BÖ–âöæÇ’âæò&öGV7F–öâÖW6‚Â–6¶W"ÂvW7GW&RÂ6vRÂ†—7F÷'’Â–çBÂW‡÷'B÷"ÖöFVÆÆ–ær¶W&æVÂ6†ævW2âW†—7F–ær&6VÆ–æRæBf–Ww÷'B&W÷'G2&VÖ–âf–Æ&ÆRà ¥s¢6†V6¶VBÖ–â7&2÷v6Òö&öG’×6²çvBæB&W&öGV6–&ÆR&öG’×6²çv6ÒÂ'V–ÇB'’çÒ'Vâ'V–ÆC§v6Òv—F‚W†7BFWbÖöæÇ’v'Cãã3’âæò6ö×–ÆW"ô4Dâ'VçF–ÖRFWVæFVæ7’âfWF6‚'—FW2F†VâvV$76VÖ&Ç’æ–ç7FçF–FRfö–G2Ô”ÔR×7V6–f–27G&VÖ–ærFWVæFVæ6Râ&W÷'G2&–æ'’'—FW2æBfWF6‚ö6ö×–ÆRö–ç7FçF–FRGW&F–öâÂ–æ6ÇVF–ær'&÷w6W"66†R–bÆ–6&ÆRâf–ÇW&R&W÷'G2Täd”Ä$ÄRæB¦f67&—B&VÖ–ç27F—fRâ÷&–v–æÂæWfW"&÷WFW2Fòt4ÒâÖ†–×VÒÆ–æV"ÖVÖ÷'“dÖ”#²f—‡GW&R6—¦W3²óS²ó³²æòv÷&¶W"÷6†&VBÖÖVÖ÷'’ö7&÷72Ö÷&–v–â&WV—&VÖVçG2à ¥s–Æ÷B6·2F†R÷&–v–æÂfâ–æFW‚÷&FW"g&öÒfÆöCcBVF—F&ÆR÷6—F–öç2Fò–æFWVæFVçBfÆöC3"vVöÖWG'’æB6ÆÇ2F†R6ÖRF‡&VR6ö×WFUfW'FW„æ÷&ÖÇ2â¥2&VfW&Væ6R—2÷&–v–æÂÖW6‚çG&–æwVÆFVDvVöÖWG'’ÂVæ6†ævVBâWfW'’—"6†V6·2'—FRÖW†7B÷6—F–öç2äBæ÷&ÖÇ2÷WG6–FRF–Ö–æs²f—‡GW&Rf–ævW'&–çBVæ6†ævVBÂ÷WGWG2F—7÷6VBâGvòv&Ò×W—'2F†Vâ6WfVâÇFW&æF–ær¥2õt4ÒÖV7W&VB—'2ât4ÒF÷FÂ–æ6ÇVFW2–çWB6öçfW'6–öâöÆÆö6F–öâÂfâ–æF–6W2Â'VÆ²ÖVÖ÷'’w&—FW2Â¶W&æVÂ6ÆÂÂ–æFWVæFVçB6÷–&6²æB÷&–v–æÂF‡&VRvVöÖWG'’öæ÷&ÖÇ2â¥4ôâ&WF–ç2&r6×ÆW2ö÷&FW"Â7FvRF–ÖW2Â–æ—F–Æ—¦F–öâæB6öÖÖ—GFVB÷&WV—&VBÆ–æV"ÖVÖ÷'’ÇW2÷WGWBÖ'—FR&÷‡’âF†—2—26ö×ÆWFR5R$ôE’6öç7G'V7F–öâÂæ÷BgVÆÂ66VæRö6vR&V'V–ÆBÂuRÂæf–vF–öâ÷"VF—F&ÆR66—G’âW‡G&&WF–æVBÆ–æV"ÖVÖ÷'’—2FF—F–öæÂ÷fW&†VC²æWfW"6ÆÂF†W6Rf–wW&W2F÷FÂ6f&’$Òà ¤vFW2f—†VB&Vf÷&RæF—fRFW7F–æs¢ãÓ#RR6ö×ÆWFR&öG’&VGV7F–öâÓâ$Ud”UröæÇ’Ã(	3#BR4ôäD•D”ôäÂÃÃRd”Ã²W†7B&—G’ÖæFF÷'’âæV—F†W"$Ud”Uræ÷"6öæF—F–öæÂW&Ö—G2&öGV7F–öâ&öÖ÷F–öã¢F&vWB•B&VÆ–&–Æ—G’Â6ö×ÆWFRÖ6öçG&öÇ2æBÖVÖ÷'’66WFæ6R7F–ÆÂ&WV—&VBâ†—7F÷&–6ÂÃÓR6ö×&&ÆRÖÖVÖ÷'’÷fW&†VB'VFvWBæBÃÓRRVæffV7FVB×F‚&Vw&W76–öâvFW2&VÖ–â&öÖ÷F–öâ&WV—&VÖVçG3²F†—2–Æ÷B†2U…E$Æ–æV"ÖVÖ÷'’æBf–Ç2F†R7W'&VçB7VVBvFRâæòt4Ò7VVBö66—G’6Æ–Òà ¤FW6·F÷f—'7B'Vâ67&—G2ö&Væ6†Ö&²×v6ÒÖ&öG’ÓCbæÖ§2ÓâFö72÷W&f÷&Öæ6R×v6ÒÖ&öG’ÓCbæ§6öâd”ÂÆÃ26—¦W3£²Ó2ã3rRÃS²Óãƒ"RÃ²ÓcRãSrRÖVF–â&VGV7F–öâ†æVvF—fS×6Æ÷vW"’â÷&–v–æÂ&r6×ÆW2&WF–æVBÂæò&WG&–W2Fòw&VVâ÷"F‡&W6†öÆB&VÆ†F–öââW‡G&6öÖÖ—GFVBÆ–æV"ÖVÖ÷'“ãc#Ró"ãƒsRóRãsTÖ”"&W7V7F—fVÇ’âFòæ÷B&öÖ÷FRD„•26¶–ærÖöæÇ’'&–FvS¢æWvÇ’÷F–Ö—¦VB¥3C—26†VæBG&ç6fW"÷fÆ–FF–öâ6÷7G2FöÖ–æFRâF†W6R&Ræö—7’6†÷'BFW6·F÷æöFR6×ÆW2Âæ÷B•BfW&F–7G2÷"Wf–FVæ6Rv–ç7Bt4ÒvÆö&ÆÇ’âæW‡C¢6öÆÆV7BF&vWBÖFWf–6R¥4ôâÂF†Vâ–FVçF–g’†Vf–W"&F6‚÷&W6–FVçBÖFF÷W&F–öâg&öÒ&VÂ&öf–Æ–æs²&VfW"W†—7F–ær÷væW"Âfö–BGWÆ–6FRF÷öÆöw’¶W&æVÇ2âFòæ÷BÖW&VÇ’÷F–Ö—¦RF†—2Æ"VçF–Â—G26†'BGW&ç2w&VVâà ¤f—fRæWr&Vw&W76–öâFW7G26÷fW"7GVÂ6ö×–ÆVBÖöGVÆR&—G’7&÷727V&RöâÖvöâöFVvVæW&FRöV×G’f6W2Â–æFWVæFVçFÇ’÷væVB÷WGWBFW7—FRÆFW"ÖVÖ÷'’&WW6RÂ–çfÆ–B–æFW‚&V¦V7F–öâÂVæf–Æ&ÆRöæWGv÷&²ö–çfÆ–BÖÖöGVÆRfÆÆ&6²ÂÇFW&æF–ær&W÷'B6×ÆW2ö6æ6VÆÆF–öâ÷&—G’&V¦V7F–öâÂFWFW&Ö–æ—7F–26÷W&6R×FòÖ&–æ'’&W&öGV6–&–Æ—G’æB7GVÂT’f–ÇW&RöW‡÷'Bö6öçG&öÂ&V6÷fW'’âW†—7F–ærÆ"&6VÆ–æR÷f–Ww÷'BFW7G2&WF–æVBâ&VÆV6SCb6†VÆÂæBW&f÷&Öæ6RÖöæ—F÷"ÓâÆ"T’Óâ–Æ÷BÓâ&–æ'’6Æ÷7W&R&Wf–WvVB÷&W–ææVC²6÷&S“bVæ6†ævVBâ6æöæ–6Â&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"ö6ö×&—6öãCbâ&÷FV7FVBÖ–â÷–6¶W#CBÂVFvR–çCCRÂ÷&–v–æÂVæ6–ÂvFSÂv—¦ÖóC"ÂÖW6‚Æ–6W3CÂ–çC3r÷&F–Ã3RÂ6vS“3æB×VÇF“ã3bããVæ6†ævVBâfÆ–FF–öâ÷V&Æ–6F–öâ&ööbföÆÆ÷w2à ¤DUd”4SCc¢÷Vâd”UrâF–væ÷7F–72âW&f÷&Öæ6RÆ#²6ö×&R¥2òt4ÒC²ÂF÷væÆöB¥4ôã²&WVCS²öæÇ’–b6öÖf÷'F&ÆRâd”Â&W÷'B—2fÆ–BÖV7W&VB&W7VÇBÂæ÷Bf–ÇW&Râ6öæf—&ÒÖöFVÂVæ6†ævVBÂ6æ6VÂ&V6÷fW'26öçG&öÇ2Âæ÷&ÖÂ6VÆV7F–öâöæf–vF–öâæBf6RE$rV6²Óâv—¦Öò7F–ÆÂv÷&²â6†&R¥4ôâf÷"æW‡BFV6—6–öââæF—fRW&f÷&Öæ6RæBÖVÖ÷'’66WFæ6RVæF–ærà ¤d”äÂãCbÆö6ÂfÆ–FF–öâæBV&Æ–6F–öã¢fö7W6VCsRósR53²gVÆÂÆö6Ã2ÃC#ó2ÃC#52Ãf–ÇW&W2ö6æ6VÆÆVB÷6¶—2ƒsãsw2’â'VçF–ÖS–C3CSSV&f&cCcF#6fcff&333#VS&cCV#†–RÂFW7FVBG&VVC6CF&&3“s3&Vfc–cs#ƒvFC&†6V6S““†F‚âvW3C3#3ƒsƒsr'V–ÆC3S33SSƒc2öFWÆ÷“3S33sƒCss"5T44U52â6—‚Æ—fR66†RÖ'W7FVB76WG2'—FRÖÖF6‚6÷W&6S¢fW'6–öâæ§6öâÂ–æFW‚æ‡FÖÂÂW&f÷&Öæ6RÖöæ—F÷"ÂÆ"T’Ât4Ò–Æ÷B¥2æB7GVÃ32Ö'—FRt4Ò&–æ'’â&÷FV7FVBÖ–âöÖW6‚ôVFvR7vVWöv—¦Öòô×VÇF’&VÖ–â'—FRÖ–FVçF–6ÂFòãCRâFö72÷V&Æ–6F–öâÓCbæ§6öâ&V6÷&G2†÷7FVB&Vw&W76–öãC3#3ƒs“scö¦ö#3S33SSSs"7FGW2æBf–æÂWf–FVæ6RâÆÂFW6·F÷F–Ö–ærvFW2d”Â†öæW7FÇ“²F†RÖöGVÆR7F—2÷BÖ–âÆ"ÖöæÇ’âæF—fR•BÖV7W&VÖVçG2&VÖ–âVæF–ærÂv—F‚æò7VVB÷"VF—F&ÆRÖ66—G’6Æ–ÒâF†—2&ööbWFFR6†ævW2Fö7VÖVçG2öæÇ’Â&WF–æ–ærfÆ–FFVB'VçF–ÖR'—FW2â'V–ÆB6ö×ÆWFRöÆ—fR÷&VG’f÷#²óS²6ö×&R¥2òt4ÒÓâF÷væÆöB¥4ôâæB66WFVB6VÆV7F–öâöv—¦Öò6Öö¶Rà ¢2ãCr(	B&öf–ÆRF†RW†—7F–ær7V&F—f—6–öâ÷væW#²ãCb•B6¶–ær6æF–FFR&V¦V7FVB(	B"æ÷fVÖ&W"##` ¤7W'&VçB6÷W&6RVF—FVBg&öÒÖ–ã†Sƒ†33B÷'VçF–ÖS–C3CSSRÂ&VÆV6SCbæBÆ—fR67&—Bö–×÷'BÖÖ–ç2âW6W"7WÆ–VBÆÃ2F&vWBÖ•B&W÷'G2Âæ÷r&W6W'fVBW†7FÇ’–âFö72÷W&f÷&Öæ6R×v6ÒÖ&öG’Ö—BÓCbæ§6öââ÷6—F–öç2öæ÷&ÖÇ26÷'&V7FæW7253²4ôÕÄUDR&öG’7VVBvFRd”ÂC²óS²ó³¢¥2ÖVF–ç3ó"ó6×2fW'7W2t4Ó"ó"óF×2ÂW‡G&&WF–æVBt4Óãc#Ró"ãƒsRóRãsTÖ”"âÖ–ÆÆ—6V6öæBVçF—¦F–öâ&WfVçG2&V6—6RW&6VçFvR6Æ–×2âF†—2&V¦V7G2F†R6¶–ær'&–FvRf÷"&öGV7F–öâÂæ÷Bt4ÒvVæW&ÆÇ’âæòW6W"&Ææ¶WBgVæ7F–öæÂ52f÷#Cbv27FFVC²Fòæ÷B6öçfW'B&Væ6†Ö&²6÷'&V7FæW72–çFòæF—fRT’÷W&f÷&Öæ6Rö66—G’66WFæ6Râ&÷FV7BW†—7F–æsCR6VÆV7F–öâ52æCC"V6²öv—¦Öòv÷&¶fÆ÷rà ¤VF—Bf÷VæBW†—7F–ærFö72÷7V&F—f—6–öâÖ&Væ6†Ö&²Ó3bæ‡FÖÂ†æB6W&FRUc3‚’Ç&VG’6ÆÇ2F†RWF†÷&—FF—fR6F×VÆÎ(	46Æ&²÷væW"â&WW6R÷Ww&FS3bÂæ÷B&ÆÆVÂ7V&F—f—6–öâõt4Ò¶W&æVÂâFB&öf–ÆR7V&F—f—6–öâÆ–æ²–âW†—7F–ærd”UrâF–væ÷7F–72âW&f÷&Öæ6RÆ#²6ÖR÷&–v–æÂ†—7F÷&–6ÂvRæBf–ÆRFW7BÖÆ—7BÆ–æ²&VÖ–ââvRæ÷sCrÂGvòv&×W2öf—fR÷&FW&VB6×ÆW2W"W†—7F–æs’66W2Â†6R&r7ç2Â6÷W&6R–Ö×WF&–Æ—G’æB&öGV7F–öâÖ÷WGWBö6÷VçB6†V6·2ÂF÷væÆöB¥4ôâÂ6æ6VÂÂW'&÷"ö†–FFVâ×F"6öçG&öÂ&V6÷fW'’â÷&–v–æÂ62&VÖ–ãbócBó#Sb6÷W&6RVG2ÂÆWfVÇ3(	32Ãc3ƒB÷WGWBf6W2Ã#×26–ævÆRÖ÷W&F–öâ7F÷†æ÷rÆ–W2Fòv&×W2Föò’â6ÆÇ2&VÖ–â7–æ6‡&öæ÷W2&WGvVVâ––VÆG3¢6æ6VÂF¶W2VffV7BBæW‡B––VÆBÂ6ææ÷B–çFW''WBöæR'Vææ–ær7FWâæò&ö¦V7BöÆ—fR6VÆV7F–öâö†—7F÷'’÷&W6÷W&6W2F÷V6†VBà §7&2÷7V&F—f—6–öâæ§2FG2÷F–öæÂö'6W'fW"Fò4ÔR&—fFR6F×VÆÄ6Æ&µ7FWæBF–væ÷7F–2ÖöæÇ’&öf–ÆU7V&F—f–FRW‡÷'Bâ7FvR&÷VæF&–W3¢–æ—F–Â–çWB6ÆöæRÂW"×7FW6ÆöæRÂÖW6‚æVFvW2Âf6Rö–çG2ÂVFvRö–çG2ÂF¦6Væ7’ÂfW'FW‚ö–çG2Â76VÖ&Ç’–æ6Â&W7VÇBVF—F&ÆTÖW6‚6öç7G'V7F–öâö7&V6Röw&÷W&÷vF–öââæò&—F†ÖWF–2Â÷&FW&–ærÂF÷öÆöw’ÂUbÆv÷&—F†ÒÂ7&V6Röw&÷W†æFÆ–ær÷"&öGV7F–öâ6–væGW&W26†ævVBâæòÇFW&æFR7V&F—f—6–öâ–×ÆVÖVçFF–öââ÷&F–æ'’7V&F—f–FRö6F×VÆÄ6Æ&²÷7V&F—f–FUv—F„6÷&æW%Ug272æòö'6W'fW#¢æòF–ÖW'2÷†6RÆÆö6F–öç3²öæÇ’÷F–öæÂçVÆÂ6†V6·2B7FvR&÷VæF&–W2âF†RF–væ÷7F–2F÷FÂ–æ6ÇVFW26Æö6·2ö6ÆÆ&6·3²7ç2–æ6ÇVFRÆÆö6F–öç2ôt2æBö'6W'fW"÷fW&†VBÂæ÷BW&R¶W&æVÂ6÷7BâUb–çFW'öÆF–öâW†6ÇVFVBâ¦W&ò7ç2&VfÆV7BF–ÖW"w&çVÆ&—G’Âæ÷B¦W&òv÷&³²Fòæ÷BFB†6RÖVF–ç2âF†—2—2$4TÄ”äUôôäÅ’Âæòt4Ò7VVBv–â÷"gVÆÂvW7GW&RôuRö66—G’6Æ–Òà §67&—G2ö&Væ6†Ö&²×7V&F—f—6–öâ×&öf–ÆRÓCræÖ§2G&—fW25ETÂvR67&—Bv—F‚Ö–æ–ÖÂDôÒæBæF—fR–×÷'FVB÷væW"Â&WF–æ–æs’&r&÷w2BFö72÷W&f÷&Öæ6R×7V&F—f—6–öâ×&öf–ÆRÓCræ§6öââÆ&vW7C#Sb×6÷W&6RÃ2Óãc3ƒBf6W2ÖVF–ãsBãs6×2–âf—'7BFW6·F÷'Vã²76VÖ&Ç’Æ&vW7B67V×VÆFVB7ãsãSv×27&÷73R6×ÆW2ÂfW'FW‚ö–çG3c‚ã×2â&6VÆ–æRöæò6æF–FFRÂæòFW6·F÷66WFæ6RW‡G&öÆFVBâæW‡B6öÆÆV7B6ÖR&÷VæFVB•B¥4ôâÂF†Vâ6†ö÷6RF&vWBW6–ærgVÆÂ÷væW"F–ÖRäB'&–FvRöÖVÖ÷'’6÷7G2â76VÖ&Ç’FöÖ–ææ6R7VvvW7G2Ö÷f–ær&—F†ÖWF–2ÆöæRÖ’æ÷B&W’6öçfW'6–öââFòæ÷B÷F–Ö—¦RF†—2&Væ6†Ö&²VçF–Âw&VVâ÷"FV6Æ&Ræf–vF–öâÆrF–væ÷6VBg&öÒ7–çF†WF–27V&F—f—6–öââW†—7F–ær6ö×ÆWFRf–Ww÷'B&W÷'B÷G&6R&VÖ–ç2÷væW"f÷"&VÂ66VæR7FÆÇ2à ¥GvòæWr&Vw&W76–öâFW7G2W†V7WFR4ÔR&öGV7F–öâ÷&öf–ÆVB÷WGWG2f÷"&÷VæF&–W2Âg&7F–öæÂögVÆÂ7&V6W2Âf6Vw&÷W2ÂâÖvöç2æBÆWfVÇ3(	32v—F†÷WB6÷W&6R×WFF–öâÂfW&–g’†6R6÷VçBö÷&FW"ÂæBW†V7WFR7GVÂvRf÷#’Ö66R¥4ôâW‡÷'BÂf—fR6×ÆW2Â6æ6VÂö†–FFVâ×F"&V6÷fW'’âW†—7F–æs3bvVöÖWG'’76W'F–öç2&WF–æVBÂöæR–×÷'BÖ6öçG&7B76W'F–öâWFFVBf÷"&Wf–WvVBF–væ÷7F–2W‡÷'B÷–ââ÷&–v–æÂUc3ró3‚æBF÷öÆöw’FW7G2&VÖ–â7F—fRà ¥&VÆV6SCrÖ&¶W'2æB6æöæ–6Â&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"ö6ö×&—6öâ6Æ÷7W&R&Vg&W6†VBâW&f÷&Öæ6RÖöæ—F÷"ÓâÆ"T“Cs²–Æ÷Bt4Ô¥2ö&–æ'“CbVæ6†ævVBâ–×÷'BÖ&VF—&V7G2&÷F‚VçfW'6–öæVB7V&F—f—6–öâæBW‡Æ–6—B†—7F÷&–6Ã3r¶W’FóCrÂ6òVæ6†ævVBÖ–âô×VÇF’öW‡÷'B&VçG2&W6öÇfR6ÖR&Wf–WvVB7W'&VçB÷væW"v—F†÷WBF—7GW&&–ær&÷FV7FVBf–ÆW2÷–ç2â7FæFÆöæR&Væ6†Ö&²–ç27V&F—f—6–öãCræBÖ2ÖW6‚Fò66WFVCCâÖ–â÷–6¶W#CBÂVFvR–çCCRÂ÷&–v–æÂVæ6–ÂvFSÂv—¦ÖóC"ÂÖW6‚Æ–6W3CÂ–çC3r÷&F–Ã3RÂ6vS“3æB×VÇF“ã3bãã&WF–æVBâfÆ–FF–öâ÷V&Æ–6F–öâföÆÆ÷w2à ¤DUd”4SCs¢d”UrâF–væ÷7F–72âW&f÷&Öæ6RÆ"â&öf–ÆR7V&F—f—6–öâ†æWrF"’â'Vâ&Væ6†Ö&²ÂF÷væÆöB¥4ôâæB6†&Râ÷F–öæÆÇ’6æ6VÂæB&W'Vââ&WGW&âFòÖöFVÃ¢7V$B&Wf–WrÇW2Ö÷fRõVæFõ&VFòæBf6RE$rÓâV6²Óâv—¦Öò6Öö¶RâæòæWrt4Ò7VVBFW7B÷"7VVGWW‡V7FVC²F†—2–FVçF–f–W2v÷'F‡v†–ÆR†Vf–W"F&vWBâæW‡BföÆÆ÷r•B&öf–ÆS²¶VW6¶–ær6æF–FFR&V¦V7FVBà ¤d”äÂãCrÆö6ÂfÆ–FF–öâ÷V&Æ–6F–öã¢fö7W6VCsBósB53²gVÆÂÆö6Ã2ÃC#"ó2ÃC#"52Ãf–ÇW&W2ö6æ6VÆÆVB÷6¶—2ƒ#crã'2’â'VçF–ÖSfSc“6ƒcvF#S†6cf6V6#ƒCcC“C“3S"ÂFW7FVBG&VSV#cc&#S6##SFFVfCc“c&#3“36f&3SCS‚âvW3C3ƒ“cc'V–ÆC3ƒSC33#söFWÆ÷“3ƒSC#Cs’5T44U52â6—‚6†V6¶VB66†RÖ'W7FVBÆ—fR76WG2'—FRÖÖF6‚6÷W&6S¢fW'6–öâæ§6öâÂ–æFW‚æ‡FÖÂÂW&f÷&Öæ6RÖöæ—F÷"ÂÆ"T’Â7V&F—f—6–öâ÷væW"æB÷&–v–æÃ3b&Væ6†Ö&²vRWw&FVCCrâ7W'&VçBÖ–â÷&÷FV7FVBÖW6‚ôVFvRöv—¦Öòô×VÇF’'—FW2Væ6†ævVBâFö72÷V&Æ–6F–öâÓCræ§6öâ&V6÷&G2†÷7FVB&Vw&W76–öãC3ƒ“SSRö¦ö#3ƒSC#“Scr7FGW2æBW†7BWf–FVæ6RâF–væ÷7F–2ÖöæÇ’†6R&6VÆ–æS²æòt4Ò&öÖ÷F–öâ÷7VVBv–âö66—G’&W7VÇBâF&vWB•B7V&F—f—6–öâ&öf–ÆRVæF–æs³Cb•B6¶–ærd”Â—2æ÷r&W6W'fVBæB&V¦V7FVBâ&VG’f÷"&öf–ÆR7V&F—f—6–öâÓâ'VâÓâF÷væÆöB¥4ôâÂF†Vâ&WGW&âFò÷&F–æ'’7V$BôÖ÷fRõVæFõ&VFò÷6VÆV7F–öâ6Öö¶RâF†—2f–æÂ&ööbWFFR6†ævW2Fö7VÖVçFF–öâöæÇ’Â&WF–æ–ærfÆ–FFVB'VçF–ÖR'—FW2à ¢2ãC‚(	B6ö×ÆWFR&÷VæFVB7V&F—f—6–öâ¥2õt4ÒG&–Ã²ãCr•B&öf–ÆR&V6÷&FVB(	B"æ÷fVÖ&W"##` ¤VF—FVBÖ–ãF3C6#6C2÷'VçF–ÖSfSc“6Â7W'&VçCCr6†VÆÂ÷67&—Bö–×÷'BÖÖw&‚Â’v÷&¶fÆ÷rö†æFöfbö6†V6¶Æ—7B÷&öFÖ÷&V6VçB†—7F÷'’æB÷&–v–æÂ7V&F—f—6–öâöÖW6‚ö&Væ6†Ö&²÷væW'2âW6W"ãCr•B&öf–ÆR&W6W'fVBBFö72÷W&f÷&Öæ6R×7V&F—f—6–öâÖ—BÓCræ§6öã¢ÆÃ’&6VÆ–æR66W26ö×ÆWFVBÂ6÷W&6Rö÷WGWB&—G’53²Æ&vW7C#Sb×6÷W&6RÃ2Óãc3ƒBf6W2ÖVF–ã&×2ÃR×6×ÆR76VÖ&Ç“#V×2÷fW'FW‚×ö–çG3F×2öVFvW3v×2F÷FÇ2âF–ÖW'ã×2âF†—2—2&öf–Æ–ær6÷'&V7FæW72Âæ÷B&Ææ¶WBT’öæF—fR7VVB52âFòæ÷B–æfW"æf–vF–öâÆrö66—G’6öÇfVBâãCR6VÆV7F–öâæBãC"V6²öv—¦Öò&VÖ–â&÷FV7FVC²ãCb6¶–ær–Æ÷B&VÖ–ç2&V¦V7FVBà ¥W6W"öæW‡F'V–ÆBæ÷r–×ÆVÖVçG2&VÂ6ö×ÆWFRÖ÷W&F–öâ7V&F—f—6–öât4Ò6ö×&—6öâÂ÷BÖ–âôäÅ’öâ4ÔRFö72÷7V&F—f—6–öâÖ&Væ6†Ö&²Ó3bæ‡FÖÂâW&f÷&Öæ6RÆ"â&öf–ÆR7V&F—f—6–öââ6ö×&R¥2òt4ÒâW†—7F–ær¥2†6R'Vâ&Væ6†Ö&²æBW‡÷'G2&WF–æVC²vSC‚v—F‚×WGVÆÇ’F—6&ÆVB'Vâ'WGFöç2Â6æ6VÆÆF–öâö†–FFVâ×F"öW'&÷"&V6÷fW'’ÂgVÆÂ¥4ôâF÷væÆöBâ÷&–v–æÃ’66W3bócBó#Sb6÷W&6RVG2ÂÆWfVÇ3(	32Â÷WGWCÃÓc3ƒBf6W2Ã#×26–ævÆRÖ÷W&F–öâwV&BVæ6†ævVBâ6ö×&—6öã"v&Ò×W—'2³RÇFW&æF–ærÖV7W&VB—'2W"66RâVç&W6öÇfVB¦W&òF–Ö–ærÖVF–ç2”ä4ôä4ÅU4•dRÂæWfW"–æf–æ—G’öfÇ6R52â'F–ÂöW'&÷"6ö×&—6öç2æWfW"F÷væÆöB27V66W72à ¤æWr7&2÷7V&F—f—6–öâ×v6ÒÖÆ"æ§2w&2&VÂÖW6‚æVFvW2Âf–æ—FR–çWBö–æFW‚6†V6·2Â55"F÷öÆöw’ö–æ6–FVçBÖf6RöVFvR&W&F–öâÂ'VÆ²6÷’Fò&WF–æVBÆ–æV"ÖVÖ÷'’ÂôäR6ö×–ÆVB&F6‚W"ÆWfVÂÂ–æFWVæFVçBVF—F&ÆTÖW6‚&V6öç7G'V7F–öâæB÷&–v–æÂÖ÷&FW"7&V6Röw&÷W&÷vF–öââ6ö×–ÆVB7&2÷v6Ò÷7V&F—f—6–öâ×7FWçv6Òƒs32'—FW2’Â‡VÖâ×&VF&ÆRtB÷'Böb÷&–v–æÂãCr6F×VÆÎ(	46Æ&²f÷&×VÆ3²ccB÷W&F–öâ÷&FW"&WF–æVBÂf6Rö–çG2öVFvRö–çG2÷fW'FW‚ö–çG2æBVB–æF–6W2vVæW&FVB–ât4Òâ&÷VæF'’Âó"ó2²7&V6R'VÆW2Â7F&ÆRF–R÷&FW"æB÷&–v–æÂf6RöVFvR–æFW†–ærFW7FVBâÆ"÷'B—2&Væ6†Ö&²6æF–FFRÂäõBæ÷F†W"Æ—fRÖöFVÆÆ–ær÷væW"â&öGV7F–öâ7&2÷7V&F—f—6–öâæ§2öÖ–âöÖW6‚õUb¶W&æVÂVæ6†ævVBâæòÆ—fRt4Ò&÷WFS²æòUb–çFW'öÆF–öâF‚âæòVF—F&ÆRÖ66—G’ÂuRÂ66VæRö6vRö†—7F÷'’÷"vW7GW&R6Æ–Òà ¤VæB×FòÖVæB6æF–FFRF–Ö–ær7F'G2$Tdõ$R–çWB÷6—¦R&VfÆ–v‡BæB–æ—F–Â6ÆöæS²–æ6ÇVFW2–çWB6öçfW'6–öâ÷fÆ–FF–öâÂÆÆö6F–öç2ô55"öÖW6‚æVFvW2Â6÷–W2Ât4ÒÂÖFW&–Æ—¦F–öâöb–æFWVæFVçFÇ’÷væVB÷WGWBÂÖWFFFæB–çFW&ÖVF–FRÆWfVÇ2â6ÖRWF†÷&—FF—fRVæ–ç7G'VÖVçFVB¥27V&F—f–FR—2&VfW&Væ6RâWfW'’ÖV7W&VB÷v&Ò×W—"6†V6·2U„5B6ö÷&F–æFW2–æ6ÇVF–ær6–vâö÷&FW"Âf6R–æF–6W2Â7&V6Röw&÷W–ç6W'F–öâö÷&FW"æB6÷W&6R6æ6†÷B÷WG6–FRF–Ö–ærâ&W÷'B&WF–ç2&sR—'2ö÷&FW"ÂW"ÖÆWfVÂ&W&F–öâ¶6÷’ö¶W&æVÂ÷&V6öç7G'V7F–öâÂ&WV—&VBö6öÖÖ—GFVBÆ–æV"ÖVÖ÷'’æB&r÷WGWBÖ6ö÷&F–æFRö–æFW‚'—FR&÷†–W2â¥2FV×÷&'’7Fv–ærÂfV7F÷#2ö'&’ôÖö&¦V7B†V2Ât2ôuRæBF÷FÂ6f&’$Ò&Ræ÷BÖV7W&VC²Fòæ÷B6ÆÂ6ö×7B&÷†–W2F÷FÂÖVÖ÷'’÷"–æfW"6fR66—G’âÖöGVÆR†&BÆ–Ö—CdÖ”"Â÷WGWB6c3ƒBÂ6÷W&6RfW'F–6W3ÃÓ#â6ö×&—6öâfÆ–FFW2&÷VæG2$Tdõ$R–çfö¶–ær÷FVçF–ÆÇ’W‡Vç6—fR¥2&6VÆ–æS²7FæFÆöæR6æF–FFRÇ6ò62&Vf÷&R6ÆöæRöÆÆö6F–öââ6æ6VÂ—26ö÷W&F—fR&WGvVVâ7–æ6‡&öæ÷W26ÆÇ2Â6ææ÷B–çFW''WBöæR7FWâfWF6‚ö66†Rö6ö×–ÆRö–ç7FçF–FRF–ÖRæB&–æ'’'—FW2&W÷'FVB6W&FVÇ“²Vç7W÷'FVBöæWGv÷&²ö–çfÆ–BÖöGVÆRÓâ6ÆV"Væf–Æ&ÆRÂ&öGV7F–öâ¥2VæffV7FVBà ¤'V–ÆBçÒ'Vâ'V–ÆC§v6Ó§7V&F—f—6–öâW6W2Ç&VG’–ææVBFWbÖöæÇ’v'Cãã3“²6÷W&6R×FòÖ&–æ'’W†7B&W&öGV6–&–Æ—G’&Vw&W76–öâÂæò6ö×–ÆW"ô4Dâ'VçF–ÖRFWVæFVæ7’âW†—7F–ær&öG’–Æ÷B'V–ÆBVçF÷V6†VBâæò2õ'W7BFööÆ6†–âF÷FVB&Vf÷&R&ööböbfÇVS²6ÖÆÂtBÖöGVÆR&WW6W2W7F&Æ—6†VB'V–ÆBF‚âtB—2WF†÷&—FF—fR÷'B6÷W&6S²&rFV×÷&'’Æö÷ÖvVæW&F–öâ†VÇW"—2æ÷B&WV—&VBFò&W&öGV6R&–æ'’à ¤FW6·F÷7GVÂ×vRG&—fW"67&—G2ö&Væ6†Ö&²×7V&F—f—6–öâ×v6ÒÓC‚æÖ§2ÓâFö72÷W&f÷&Öæ6R×7V&F—f—6–öâ×v6ÒÓC‚æ§6öâ—2Ô•„TBæBäõB66WFVBf÷"&öÖ÷F–öââf–æÂÆ&vW7C#SbôÃ2¥3#’ãcf×2fW'7W2t4ÓC"ã#“V×2‚ÓCRãSR&VGV7F–öâÂd”Â’âGvò&÷w2$Ud”UsãÓ#RRÂGvò4ôäD•D”ôäÃ(	3#BRÂf—fRd”Â–æ6ÂÆ&vW7Bâ6†÷'BFW6·F÷66W2æBÆ&vR6×ÆRf&–æ6R&Ræ÷BæF—fR66WFæ6S²ÆÆö6F–öâôt2÷"66†VGVÆ–ær6öçG&–'WF–öç2&Ræ÷B–æFWVæFVçFÇ’ÖV7W&VBâ–æ—F–Â&÷F÷G—R&r&W÷'B&WF–æVBFö72÷W&f÷&Öæ6R×7V&F—f—6–öâ×v6Ò×G&–ÂÓC‚æ§6öâ†Æ&vW7Bd”ÂÓ32ãbR“²&RÖÆ–2'Vâ&WF–æVBFö72÷W&f÷&Öæ6R×7V&F—f—6–öâ×v6Ò×&RÖÆ–2ÓC‚æ§6öâ†Æ&vW7Bd”ÂÓ#’ãƒBR’â&W'Vç2föÆÆ÷r6öFR6†ævW3¢FF–ærÆÂÖ÷W&F–öâ&VfÆ–v‡BF–Ö–ærö62ÂF†Vâ&W—&–ær6öç7G'V7F÷"ö–×÷'BÖÖ6öçG&7BâæòvFR÷v&Ò×W÷6×ÆR6†ævRÂæò&WG&–W2Fòw&VVââf–æÂG&—fW"æB6æF–FFR6†&R6æöæ–6ÂÖW6‚ÖöGVÆRÂÖF6†–ær'&÷w6W"–×÷'BÖÖ–FVçF—G’âFòæ÷B6†W''’×–6²Ö–FFÆRö¶W&æVÂÖöæÇ’v–ç2âW‡G&&WF–æVBt4ÒBÆ&vW7GããCDÖ”#²æ÷B6ö×&&ÆRFóCbw2F–ffW&VçB×6—¦R&öG’f—‡GW&R÷"F÷FÂ$ÒâÖVÖ÷'’÷&VÆ–&–Æ—G’öæF—fRvFW2&VÖ–â6W&FRâÆÃ’&÷w2W†7B6÷'&V7FæW7252âæW‡B6öÆÆV7B6ö×ÆWFR•B6ö×&—6öã²&V¦V7B÷'B–bv–ç2Fòæ÷B&W’'&–FvR÷&V6öç7G'V7F–öâæBW‡G&ÖVÖ÷'’âæò&öGV7F–öâ&öÖ÷F–öâ&6VBöâFW6·F÷$Ud”Ur&÷w2à  ¤gVÆÂ×7V—FRVF—B6Vv‡BF†RæWrÖöGVÆRw2W‡Æ–6—BÖW6‚æ§3÷cÓã"ãC–×÷'BÖ—76–ærF†R&÷FV7FVB6†VÆÂÖw26÷W&6RÖ¶W’6÷fW&vRâ&W—&VBæWrÆ"ÖöGVÆRFòW6RU„•5D”ärVçfW'6–öæVBâöÖW6‚æ§2Æ–3²æB7FæFÆöæRvRÇ&VG’ÖF†—2Fò6æöæ–6ÃCÂ&W6W'f–ærGvòW7F&Æ—6†VB6öç7G'V7F÷"–FVçF—F–W2âF–Bæ÷BvV¶Vâ&öG’×6¶–æsCFW7B÷"FBF†—&B–FVçF—G’âFBF†Bf÷W"×FW7Bf–ÆRFòfö7W6VB6÷fW&vS£ƒBóƒB52â&RÖf—‚gVÆÂ'Vâ†BôäRf–ÇW&Rƒ3C#u52ó3C#‚F÷FÂ“²—B—27WW'6VFVBöæÇ’gFW"6ÆVâf–æÂgVÆÂfÆ–FF–öââ¦W&òÖÖVF–â6Æö6²66W2&RW‡Æ–6—FÇ’”ä4ôä4ÅU4•dRâW‡æFVB7&V6RFW7G2–æ6ÇVFRÆÃ"7V&RVFvW2ƒ2²'&æ6‚’æBWVÂ×7G&VæwF‚GvòÖVFvRF–W2à ¥6—‚æWr&Vw&W76–öç2W†V7WFR7GVÂ6ö×–ÆVBÖöGVÆS¢ÆÃ’—'&VwVÆ"w&–G2öÆWfVÇ3²W†7Bg&7F–öæÂvVöÖWG'’ö&÷VæF&–W2öâÖvöç2öæöæÖæ–föÆBö—6öÆFVBfW'F–6W2ö7&V6R7G&VæwF‡2–æ6ÂãæB7F&ÆRF–W2öw&÷W3²÷WGWB–æFWVæFVæ6RVæFW"ÖVÖ÷'’&WW6R÷6÷W&6R–Ö×WF&–Æ—G“²6÷W&6Rö÷WGWBöÆWfVÂö–æFW‚öf–æ—FRwV&G2ÂVæf–Æ&ÆRÆöFW'2Â6æ6VÆÆF–öâ÷&—G’&V¦V7F–öã²6ö×ÆWFR&r—'2÷7FvW2öÖVÖ÷'“²FWFW&Ö–æ—7F–2tB&–æ'“²7GVÂvRgVÆÃ’Ö66R¥4ôâÇW26æ6VÂ÷Væf–Æ&ÆR&V6÷fW'’âW†—7F–æsCrvR×FW7BöFW6·F÷†&æW72Öö6·2öæÇ’FBæWr'WGFöâ”Bâæò÷&–v–æÂ&V†f–÷W&Â6÷fW&vR&VÖ÷fVBâfö7W6VCƒBóƒB53²gVÆÂfÆ–FF–öâföÆÆ÷w2à ¥&VÆV6SC‚Ö&¶W'2æB6æöæ–6Â&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"ö6ö×&—6öâ6Æ÷7W&R&Vg&W6†VC²W&f÷&Öæ6RÖöæ—F÷"ÓâÆ"T’Óâ÷&–v–æÂ&Væ6†Ö&²vSC‚ÓâæWr6æF–FFRö&–æ'“C‚&Wf–WvVBâ&öGV7F–öâ7V&F—f—6–öâ–×÷'BÖöÆ–3CræB6÷W&6RVæ6†ævVC²&öf–ÆR6÷W&6SCrÂÖW6‚Æ–6W3CÂÖ–â÷–6¶W#CBÂVFvR7vVWCRÂVæ6–ÂvFSÂv—¦ÖóC"Â–çC3r÷&F–Ã3RÂ6vS“3æB×VÇF“ã3bãã&WF–æVBW†7FÇ’âg&÷¦Vâ&WF2VçF÷V6†VBâ7FæFÆöæR&Væ6†Ö&²6öçF–çVW26æöæ–6ÂÖW6ƒCÖ–ærâ–æ—F–ÂtB7–çF‚W'&÷'2vW&Rf—†VB&Vf÷&RfÆ–FF–öã²æò6ö×–ÆW"öÆ–'&'’–ç7FÆÂFFVB&W–öæBW†—7F–ærv'Bà ¤DUd”4SCƒ¢d”UrâF–væ÷7F–72âW&f÷&Öæ6RÆ"â&öf–ÆR7V&F—f—6–öââ6ö×&R¥2òt4ÒâÆWB&÷VæFVC’66W2f–æ—6ƒ²F÷væÆöB¥4ôâæB6†&Râd”Âô”ä4ôä4ÅU4•dRõ$Ud”Ur&RF–Ö–ær&W7VÇG2Âæ÷BW'&÷'2÷"&öÖ÷F–öââ&WGW&âFò²æ÷&ÖÂ7V$B&Wf–WrÂÖ÷fRõVæFõ&VFòæB6öæ6fR6VÆV7F–öâ÷V6²v—¦Öò6Öö¶RâæF—fR&Væ6†Ö&²6÷'&V7FæW72÷7VVBöÖVÖ÷'’VæF–æs²æògW'F†W"6¶–ærG&–Â&WV—&VBâæW‡BföÆÆ÷r6ö×ÆWFRFWf–6RWf–FVæ6S²¶VW¥2WF†÷&—FF—fRVæÆW72gVÆÂÖ÷W&F–öâæBÖVÖ÷'’ö6öçG&öÂvFW27W÷'BW‡Æ–6—B&öÖ÷F–öâà ¤d”äÂãC‚Æö6ÂfÆ–FF–öâ÷V&Æ–6F–öã¢fö7W6VCƒBóƒB52–æ6ÇVF–ærVæ6†ævVCCÖW6‚ÖÆöF–ær6öçG&7C²f–æÂ6ÆVâgVÆÂÆö6Ã2ÃC#‚ó2ÃC#‚52Ãf–ÇW&W2ö6æ6VÆÆVB÷6¶—2ƒãC2’âF†—27WW'6VFW2F†R&RÖf—‚öæRÖf–ÇW&R'VâÂv—F†÷WBvV¶Væ–ærF†BFW7Bâ'VçF–ÖVC“S“†c36VSC†S&ccF36FcFFVff6f&"ÂFW7FVBG&VSc3SfS“S33fS“Cs#ƒ““c“cƒV&&FCSsc“‚âvW3C3#33c3ƒ"'V–ÆC3ƒc“3ƒ33öFWÆ÷“3ƒc“3C#Cƒ’5T44U52âV–v‡B6†V6¶VBÆ—fR66†RÖ'W7FVB76WG2'—FRÖÖF6‚6÷W&6S¢fW'6–öâæ§6öâÂ–æFW‚æ‡FÖÂÂW&f÷&Öæ6RÖöæ—F÷"ÂÆ"T’Â÷&–v–æÂ&Væ6†Ö&²vRÂæWrÆ"ÖöGVÆRÂ7GVÃs32Ö'—FRt4Ò¶W&æVÂæBVæ6†ævVB&öGV7F–öâ7V&F—f—6–öâ÷væW"â&÷FV7FVBÖ–âöÖW6‚÷7V&F—f—6–öâôVFvR7vVWöv—¦Öòô×VÇF’&VÖ–â'—FRÖ–FVçF–6ÂFóCrâFö72÷V&Æ–6F–öâÓC‚æ§6öâ&V6÷&G2†÷7FVB&Vw&W76–öãC3#33cSRö¦ö#3ƒc“3s“#b7FGW2æBW†7BWf–FVæ6RâFW6·F÷Ö—†VBöÆ&vW7Bd”ÂÂæF—fR•B6ö×&—6öâVæF–æs²æò&öGV7F–öâ&öÖ÷F–öâ÷"7VVBö66—G’6Æ–Òâ&VG’f÷"&öf–ÆR7V&F—f—6–öâÓâ6ö×&R¥2òt4ÒÓâF÷væÆöB¥4ôâÂF†Vâ÷&F–æ'’ÖöFVÆÆ–ær6Öö¶RâF†—2f–æÂ&ööbWFFR6†ævW2Fö7VÖVçG2öæÇ’Â&WF–æ–ærFW7FVB'VçF–ÖR'—FW2à  ¢2ãC’(	B&VGV6R7V&F—f—6–öâ'&–FvR6ö÷&F–æFRÆÆö6F–öç2(	B"æ÷fVÖ&W"##` ¤VF—FVBÖ–âVFSS““F‡'VçF–ÖRãC‚C“S“†’Â7W'&VçB&VÆV6RÖ&¶W'2ÂÆ—fR6†VÆÂÂ66†Rw&‚æBW†—7F–ær7V&F—f—6–öâöÖW6‚öÆ"÷væW'2âW6W"öæW‡F'V–ÆFWF†÷&—¦W2F†—2æ'&÷rföÆÆ÷r×WâW†—7F–ærV&Æ–2ãCr&öf–Æ–æræBãC‚6ö×ÆWFRÖ÷W&F–öâG&–Â–FVçF–g’'&–FvR&W&F–öâ÷&V6öç7G'V7F–öâ26æF–FFR÷fW&†VC²F†—2'V–ÆB&VÖ÷fW27V6–f–2FV×÷&'’6ö÷&F–æFR'&—2f÷VæB'’6÷W&6RVF—BâFWf–6RWf–FVæ6Rv2&Wf–WvVB&—fFVÇ’æB—2æ÷B'BöbF†—2V&Æ–6F–öââæò÷fW&ÆÂT’52Â6fR66—G’÷"&öÖ÷F–öâ–æfW'&VBâãCb6¶–ær&VÖ–ç2&V¦V7FVBâ&÷FV7BãCRVFvR6VÆV7F–öâæBãC"V6²öv—¦Öò66WFæ6Rà ¤öæÇ’7&2÷7V&F—f—6–öâ×v6ÒÖÆ"æ§66†ævW26ö×WFF–öâÇVÖ&–æs¢fÆ–FFRÆÂ6ö÷&F–æFR†W2F—&V7FÇ’Â&W6W'fRF†R6ÖRfÆöCcB–çWB7âæBw&—FR6ö÷&F–æFW2F†W&Röæ6R†æòw&÷v&ÆR¥26ö÷&F–æFR7Fv–ær'&’“²&V6öç7G'V7B–æFWVæFVçFÇ’÷væVBF‡&VRfV7F÷#2fÇVW2F—&V7FÇ’öââV×G’×fW'FW‚&VÂVF—F&ÆTÖW6‚&F†W"F†âÆÆö6F–ærG&—ÆWB'&—2f÷"—G26öç7G'V7F÷"FòF—66&BâF†RW†—7F–ær6öç7G'V7F÷"7F–ÆÂ÷vç2f6R6÷–W2æB7&V6Röw&÷Wæ÷&ÖÆ—¦F–öââ–æ—F–Â–çWB6ÆöæRÂ55"÷F÷öÆöw’&W&F–öâÂVFvR÷&FW&–ærÂ62ÂW"ÖÆWfVÂ6ÆÇ2Â&—F†ÖWF–2ÂÖWFFFæBgVÆÂÖ÷W&F–öâF–Ö–ær&÷VæF&–W2&R&WF–æVBâF†R÷&–v–æÂÃs32Ö'—FRtBõt4Ò&–æ'’—2'—FRÖ–FVçF–6ÂæB&VÖ–ç2–ææVCCƒ²&öGV7F–öâ7&2÷7V&F—f—6–öâæ§6ÂÖW6‚ÂÖ–âÂ6VÆV7F–öâÂv—¦ÖòÂ–çBÂ×VÇF“ãæBg&÷¦Vâ&WF2&RVæ6†ævVBâæòæWr¶W&æVÂÂÆ—fR&÷WFRÂUbF‚ÂvÆö&Âf7F÷'’÷"÷væW'6†—6†÷'F7WBâf–æÂ÷WGWBæWfW"Æ–6W26÷W&6R÷"t4ÒÖVÖ÷'’âF†—2&VÖ÷fW27V6–f–2FV×÷&'’ÆÆö6F–öç2Âæ÷BÖV7W&VBF÷FÂ†VW6vRà ¤7GVÂ×vRFW6·F÷G&—fW"67&—G2ö&Væ6†Ö&²×7V&F—f—6–öâ×v6ÒÓC’æÖ§6&W6W'fW2&r&W7VÇG2–âFö72÷W&f÷&Öæ6R×7V&F—f—6–öâ×v6ÒÓC’æ§6öæâ6–ævÆR'VâgFW"F†—26öFR6†ævS¢2$Ud”UrÂ24ôäD•D”ôäÂÂ2d”Ã²ÆÂæ–æRW†7B6†V6·252âÆ&vW7B¥2ÖVF–ã#’ãssV×2fW'7W2t4Óbãƒv×2ÂC2ãSRR&VGV7F–öâ…$Ud”Ur“²“Rcãcbó#Bã3×26†÷w2f&–&–Æ—G’âF–ffW&VçB'VçF–ÖR÷6W76–öâg&öÒ†—7F÷&–6ÂãC‚FW6·F÷¢Fòæ÷B6Æ–ÒöÆB×g2ÖæWr6W6ÂW&6VçFvR÷"&WG'’VçF–Âw&VVââ6ÖRGvòv&Ò×W—'2öf—fRÇFW&æF–ærÖV7W&VB—'2ÂbócBó#Sb6÷W&6RVG2ÂÆWfVÇ3(	32Â÷WGWCÃÓbÃ3ƒBÂÃ#×2wV&BæB66WFæ6RF‡&W6†öÆG2&WF–æVBâW‡G&Æ–æV"ÖVÖ÷'’—2Væ6†ævVB‡ããCDÖ”"BÆ&vW7B“²gVÆÂ6f&’†VôuR&RVæÖV7W&VBÂÃÓR6ö×&&ÆRÖÖVÖ÷'’æB&VÆ–&–Æ—G’÷VæffV7FVB×F‚vFW2&VÖ–âVç&W6öÇfVBâF†—2&VÖ–ç2Ä%ôôäÅ“²æò7VVBö66—G’öæf–vF–öâ–×&÷fVÖVçB6†—2–âÆ—fRÖöFVÆÆ–ærâæF—fRãC’6ö×ÆWFR6ö×&—6öâ—2F†RæW‡BFV6—6–öâÂæ÷BÖ÷&R&Æ–æBÆ"GVæ–ærà ¥&VÆV6RÖ&¶W'3C’æB6†ævVBÆöFW"6Æ÷7W&R&Wf–WvVC¢6†VÆÂÓâW&f÷&Öæ6RÖöæ—F÷"ÓâÆ"T’Óâ÷&–v–æÃ3b&Væ6†Ö&²Óâ6æF–FFSC“²&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"æBW†—7F–ær6ö×&—6öâæVÃC’â&öGV7F–öâ7V&F—f—6–öâÆ–6W3CrÂÖW6‚Æ–6W3CÂÖ–ãCBÂVFvSCRÂv—¦ÖóC"Â–çC3r÷&F–Ã3RÂ6vS“3æB×VÇF“ã3bãã&WF–æVBâFW7G2FB&VÂVF—F&ÆRfV7F÷#2ö÷WGWB÷væW'6†—7&÷72W‡Æ–6—Bt4ÒÖVÖ÷'’w&÷wF‚ö÷fW'w&—FRÂg&÷¦Vâ×6÷W&6R&—G’Â6ÆöæRôÖ÷fR—6öÆF–öâÂÖWFFFæ÷&ÖÆ—¦F–öâæBÆÂÖ†—2æöæf–æ—FR&VgW6Â&Vf÷&R¶W&æVÂ–çfö6F–öã²÷&–v–æÃC‚&—G’÷Væf–Æ&ÆRö6æ6VÂ÷vRö&–æ'’FW7G2&VÖ–â7F—fRâfö7W6VC3"ó3"53²f–æÂgVÆÂÆö6Ã2ÃC3ó2ÃC352Â¦W&òf–ÇW&W2ö6æ6VÆÆVB÷6¶—2ƒƒ’ãc“—2’â7–çF‚ÂF–fb6†V6·2æBæ–æR&÷FV7FVB&öGV7F–öâö¶W&æVÂf–ÆR6ö×&—6öç252â'VçF–ÖR#““VSS“Scfc–6CFC#vcs3Cc6fFSvf#“v&Â'VçF–ÖRG&VRcFSs#VCfcCVC3&CCv#C6##ffcF#–cVc63VFâvW3C3ƒc#s#“R'V–ÆC3sC“CcöFWÆ÷“3sC#“cScB5T44U53²æ–æR66†RÖ'W7FVBÆ—fR76WG2'—FRÖÖF6‚â†÷7FVBF÷öÆöw“C3ƒc#s3cSRö¦ö#3sC“3“Sb5T44U53£2ÃC3ó2ÃC352Â¦W&òf–ÇW&W2ö6æ6VÆÆVB÷6¶—2ƒ3‚ãƒs2’Â'VçF–ÖR6†V6¶÷WBfW&–f–VBâWf–FVæ6S¢Fö72÷V&Æ–6F–öâÓC’æ§6öæâæF—fSC’6ö×&—6öâVæF–ærà ¤DUd”4SC“¢d”UrâF–væ÷7F–72âW&f÷&Öæ6RÆ"â&öf–ÆR7V&F—f—6–öââ6ö×&R¥2òt4Ó²ÆWBÆÃ’f–æ—6‚ÂF÷væÆöB¥4ôâæB6†&Râd”Âô”ä4ôä4ÅU4•dR&RfÆ–B&W7VÇG2â&WGW&âFòÖöFVÃ¢7V$B&Wf–WrÂÖ÷fRõVæFõ&VFòæBVFvRE$rÓâV6²Óâv—¦Öò6Öö¶RâæòÆ&vW"7G&W72f—‡GW&R÷"6¶–ær&WVB&WV—&VBâFòæ÷B&öÖ÷FRg&öÒFW6·F÷÷"6†÷'BF–Ö–ærÖöæÇ’v–ç2à ¢2ãS(	Bw&—FRVFvRæBf6RÖVFvR–çWG2F—&V7FÇ’Fòt4ÒÖVÖ÷'“²ãC’æF—fR&W÷'B&Wf–WvVB(	B"æ÷fVÖ&W"##` ¥W6W"7WÆ–VBæF—fRãC’6ö×&—6öã²—G2&W7VÇBv2Ö—†VBâW†7B&—G’76VBÂv†–ÆRF–Ö–ær&÷w2F–Bæ÷BW7F&Æ—6‚6öç6—7FVçB&öÖ÷F–öâ&W7VÇBâ¶VWF†B÷&–v–æÂ&W÷'B&—fFS²—B—2æ÷B–æ6ÇVFVB–âF†R&W÷6—F÷'’â6öçF–çVRWfÇVF–æröæÇ’F†R&÷VæFVBÆ"6æF–FFRâ&öGV7F–öâ7V&F—f—6–öâ7F—2öâF†RWF†÷&—FF—fR¦f67&—B÷væW"VçF–Â6ö×ÆWFRÖ÷W&F–öâFWf–6R7VVBÂÖVÖ÷'’æB&VÆ–&–Æ—G’vFW2§W7F–g’6†ævRâ&÷FV7BãCRVFvR6VÆV7F–öâÂãC"V6²öv—¦ÖòÂ&–÷"66WFVB–çB–çFW&7F–öç2æB7&2ö×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3÷cÓã3bããà ¤VF—BöbãC’7&2÷7V&F—f—6–öâ×v6ÒÖÆ"æ§6f÷VæBGvò&VÖ–æ–ærfö–F&ÆRfÆGFVæVBÖ–çWB'VffW'3¢6—‚66Æ"VFvRf–VÆG2W"ÖW6‚æVFvW2‚–&÷ræBöæRVFvR”BW"f6R6÷&æW"âãS¶VW2F†R6ÖR6æöæ–6ÂÖW6‚æVFvW2‚–÷WGWBæB÷&FW&–ærÂF¦6Væ7’ô55"6ö×WFF–öâÂVFvRÔ”BÖÂ6†V6·2Â62Â÷WGWB÷væW"Ât4ÒgVæ7F–öâæBW†7BÖ÷W&F–öâF–Ö–ærâ—B&W6W'fW2WVÆÇ’6—¦VB7ç2æBw&—FW2F†÷6R–çWG2F—&V7FÇ’–çFòF†RW†—7F–ært4ÒÖVÖ÷'’â—B&VÖ÷fW2öæÇ’F†Rw&÷v&ÆRVFvTFFæBf6TVFvW67Fv–ær'&—3²6÷W&6RF÷öÆöw’Â&—F†ÖWF–2Â&öGV7F–öâ¥2Â&–æ'’ÂÖWFFFæB–æFWVæFVçBVF—F&ÆTÖW6‚÷WGWB&RVæ6†ævVBâæòæWr¶W&æVÂ÷"Æ—fRt4Ò&÷WFRà ¥F†RW†—7F–ær7GVÂ×vR6ö×&—6öâ&VÖ–ç3’&÷VæFVBv÷&¶ÆöG2ÂGvòv&Ò×W—'2öf—fRÇFW&æF–ærÖV7W&VB—'2ÂW†7B÷WGWB6†V6·2ÃÃ#×2wV&BÂ6æ6VÆÆF–öâæBÖVÖ÷'’÷&VÆ–&–Æ—G’6fVG2âãSFW6·F÷'Vâ—2æö—7“¢6—‚$Ud”UrÂöæR4ôäD•D”ôäÂÂGvòd”Ã²ÆÃ’&—G’&÷w272Â'WBF†RÆ&vW7B¥2õt4Ò6×ÆW2f'’Föò×V6‚f÷"W&f÷&Öæ6R6öæ6ÇW6–öââ&W6W'fR—G2öæR&rvVæW&FVB&W÷'BBFö72÷W&f÷&Öæ6R×7V&F—f—6–öâ×v6ÒÓSæ§6öæ²Fòæ÷B&WVBf÷"&WGFW"6†'B÷"–æfW"æF—fR–×&÷fVÖVçBâF†R6ö×&—6öâæ÷rÆ&VÇ2vVæW&FVBF÷væÆöG2æB&W÷'B2ãSâ&–æ'’&VÖ–ç2F†RVæ6†ævVBãC‚ÖöGVÆS²æòUb÷66VæRôuRögVÆÂÖÖVÖ÷'’÷"VF—F&ÆRÖ66—G’&W7VÇBà ¥&VÆV6RÖ&¶W"ö66†R6†–âãS¢6†VÆÂÓâW&f÷&Öæ6RÖöæ—F÷"ÓâÆ"T’ÓâW†—7F–ær&Væ6†Ö&²vRÓâ6æF–FFS²&VÆV6R×fW'6–öâÓâf6Rv÷&¶fÆ÷rÓâG&vW"ÂæBW†—7F–ær6†VÆÂ6ö×&—6öââ÷&–v–æÂÖW6‚–×÷'BÖCÂ&öGV7F–öâ7V&F—f—6–öâÆ–3CrÂ–×÷'FVBæF—fR¶W&æVÂ6öFRÂv—¦ÖóC"ÂVFvR6VÆV7F–öãCRÂ–çC3r÷&F–Ã3RÂ6vS“3Â&÷FV7FVB×VÇF“ã3bããæBF†Rt4Ò&–æ'“C‚&VÖ–âVæ6†ævVBâæWrfö7W6VBFW7G2fW&–g’F†R'—FW2FVÆ—fW&VB–âVFvRæBf6RÖVFvRt4Ò7ç2v–ç7B6æöæ–6Â6÷W&6RF÷öÆöw’f÷"æöâÖÖæ–föÆBöâÖvöâf—‡GW&RÂW†7B÷WGWB&—G’æB7W'&VçB&VÆV6RöF÷væÆöBÆ&VÇ2âfö7W6VC3Bó3B53²gVÆÂÆö6ÂæöFR7V—FS3C3"ó3C3"52ƒ3ã#W2“²7–çF‚ÂF–fbæB&÷FV7FVBÖ'—FR6†V6·252â'VçF–ÖR6öÖÖ—B6Cƒ3cS#ƒ†&VC6VffVfSƒscv#f#sfcSCvFâ†÷7FVBF÷öÆöw’C3#sCF76VC2ÃC3"ó2ÃC3"ƒ##rãCG2“²vW2C3#†7V66VVFVC²æ–æR6†ævVBÆ—fR76WG2'—FRÖÖF6‚F†—26÷W&6RâW6W"52&÷FV7G2F†RãSæF—fR6ö×&—6öâv÷&¶fÆ÷ræB&WGW&â×FòÖÖöFVÂ6Öö¶R…7V$B&Wf–WrÂÖ÷fRÂVæFòõ&VFòÂæBVFvRE$rÓâV6²Óâv—¦Öò’âÆÂæ–æRæF—fRv÷&¶ÆöB—'2&W÷'BW†7B&—G’â÷fW&ÆÂW&f÷&Öæ6RFV6—6–öâ—2Ä%ôôäÅ–¢Ö÷7B6ÖÆÂv÷&¶ÆöG2&VÖ–âd”Âô”ä4ôä4ÅU4•dRæBÆ&vW"v÷&¶ÆöG2&R$Ud”Urô4ôäD•D”ôäÂâG&VBF†R522v÷&¶fÆ÷rö6÷'&V7FæW7266WFæ6RÂæ÷BW&f÷&Öæ6R&öÖ÷F–öââ¶VWF†RWÆöFVB•B&W÷'B&—fFS²Fòæ÷BFBF†R&r&W÷'B÷"—G2ÖV7W&VÖVçG2FòF†R&W÷6—F÷'’à ¤DUd”4SS¢d”UrâF–væ÷7F–72âW&f÷&Öæ6RÆ"â&öf–ÆR7V&F—f—6–öââ6ö×&R¥2òt4Ó²'VâÆÃ’öæ6RÂF÷væÆöBF†RãS¥4ôâæB6†&R—Bâ6ö×&RF†R&÷VæFVBF–Ö–æræB–æ—F–Æ—¦F–öâöÖVÖ÷'’f–VÆG3²æö—7’öÖ—†VB&W÷'B—2fÆ–B&W7VÇBâF†Vâ7V$B&Wf–WrÂÖ÷fRõVæFõ&VFòæBVFvRE$rÓâV6²Óâv—¦Öò6Öö¶RâæòÆ&vW"f—‡GW&R÷"–çB&WFW7B&WV—&VBà ¢ÒÒÐ ¥&VÆV6R6Æ÷7W&S¢ãS6†VÆÂæB6†ævVBÆöFW"ö66†R÷væW'2&Wf–WvVBâgVÆÂÆö6ÂæB†÷7FVB&Vw&W76–öâ76VC²vW2FWÆ÷–VC²æ–æR6†ævVBÆ—fR76WG2'—FRÖÖF6‚â'VçF–ÖR6öÖÖ—B6Cƒ3cS#ƒ†&VC6VffVfSƒscv#f#sfcSCvFâW6W"52&÷FV7G2F†RãSæF—fR6ö×&—6öâv÷&¶fÆ÷ræB&WGW&â×FòÖÖöFVÂ6Öö¶R…7V$B&Wf–WrÂÖ÷fRÂVæFòõ&VFòÂæBVFvRE$rÓâV6²Óâv—¦Öò’âÆÂæ–æRæF—fRv÷&¶ÆöB—'2&W÷'BW†7B&—G’â÷fW&ÆÂW&f÷&Öæ6RFV6—6–öâ—2Ä%ôôäÅ–¢Ö÷7B6ÖÆÂv÷&¶ÆöG2&VÖ–âd”Âô”ä4ôä4ÅU4•dRæBÆ&vW"v÷&¶ÆöG2&R$Ud”Urô4ôäD•D”ôäÂâG&VBF†R522v÷&¶fÆ÷rö6÷'&V7FæW7266WFæ6RÂæ÷BW&f÷&Öæ6R&öÖ÷F–öââ¶VWF†RWÆöFVB•B&W÷'B&—fFS²Fòæ÷BFBF†R&r&W÷'B÷"—G2ÖV7W&VÖVçG2FòF†R&W÷6—F÷'’à ¢2ãS(	B&W—"–çv&B6÷&æW'27&÷72F—66öææV7FVBf6R&æG3²FBÃ#BÖf6Rt4Òv÷&¶ÆöB(	B"æ÷fVÖ&W"##` ¤VF—FVB7W'&VçBÖ–âãSÂÆ—fRÖ&¶W'2÷–ç2æBF†RW†—7F–ærW‡G'W6–öâö&Væ6†Ö&²÷væW'2â67&VVç6†÷B6†÷vVBf÷W"6VÆV7FVBF—66öææV7FVB&V7FæwVÆ"&æG2gFW"æVvF—fR×VÇF’Öf6RW‡G'W6–öâÂv†W&RV6‚–çv&B6†÷VÆFW"&VÖ–æVBÆ–âVBâW†—7F–ærã3&V'V–ÆD–çv&D&æDg&ÖW6v2FVÆ–&W&FVÇ’6öç6W'fF—fR'WBöæÇ’&V6övæ—¦VBöæR6öææV7FVB6VÆV7FVB&æBâW‡FVæBF†B6ÖR7&2÷F‡&÷Vv‚Ö¶W&æVÂæ§6F÷öÆöw’÷væW"Fò'F—F–öâ6VÆV7FVBf6W2'’6†&VBVFvW2ÂF†Vâ'Vâ—G2÷&–v–æÂ7G&–7BæçVÇW2VÆ–v–&–Æ—G’æBF–vöæÂÆææW"W"6ö×öæVçBâ¶VWF†R÷&–v–æÂ6öææV7FVBF‚FVÆVvFVBFòF†R6ÖRÆææW#²&WF–âfÆÆ&6²f÷"6öæ6fR÷VæWVÂ&÷VæF&–W2ÂWF†÷&VB7&V6W2ÂÖ—†VBw&÷W2÷"÷F†W"–æVÆ–v–&ÆRF÷öÆöw’âæò6Æ—–ærÂ6VÆV7F–öâÂ÷W&F–öâ÷væW"÷"ÖöFVÆ–ær¶W&æVÂ6†ævW2à ¤FBFW7G2ö–çv&B×VBÖ6÷&æW'2ÓSçFW7BæÖ§6¢7GVÂf÷W"×&Vv–öâ&W&öGV7F–öâfW&–f–W2F–vöæÂ6†÷VÆFW'2W"&Vv–öâÂfÆ–B÷WGWBÂ6÷W&6R–Ö×WF&–Æ—G’æBW†7BföÇVÖRâÆÂã36÷fW&vR&VÖ–ç27F—fRâFBöæRÃ#B6÷W&6RÖf6RòÆWfVÂÓ"6ö×&—6öâFòF†RW†—7F–ær&÷VæFVBt4Ò6ö×&—6öâvRƒbÃ3ƒB÷WGWBf6W2’Âv†–ÆR&WF–æ–ær÷&–v–æÂæ–æR6ö×&—6öâ66W2æB6W&FR†6R&öf–ÆRâ6æF–FFR6÷W&6R7F—2–ææVBãSÂt4Ò&–æ'’ãC‚ÂæB&öGV7F–öâ¥27V&F—f—6–öâ7F—2WF†÷&—FF—fRâæòvVæW&FVB&Væ6†Ö&²&W÷'B—26öÖÖ—GFVC²F†RFFVB66R—2f÷"FWf–6RWf–FVæ6RÂæ÷BW&f÷&Öæ6R6Æ–Òà ¥&Vg&W6‚ãS6†VÆÂÖ&¶W'2æB66†R–ç2f÷"F†RW†—7F–ær÷væW'2Â'VçF–ÖR6öçG&7BÂ6†V6¶Æ—7BÂ†æFöfbæB&öFÖâf—'7BgVÆÂ7V—FRW‡÷6VBGvò7FÆRãSW‡V7FF–öç3²WFFVB&VÆV6R×fW'6–öâ6†VÆÂ–âæBÆVv7’vRFW7Bf÷"F†R–çFVçF–öæÂFVçF‚6ö×&—6öââfö7W6VB7V—FR76VB’ó“²f–æÂÆö6ÂæöFR7V—FR76VB2ÃC3Bó2ÃC3BÂ¦W&òf–ÇW&W2ö6æ6VÆÆVB÷6¶—2ƒƒbãƒG2’âW6W"†æG2ÖöâFW7B&VÖ–ç2VæF–ærà