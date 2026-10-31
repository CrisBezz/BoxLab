YªçŠx-®éÜj×¢ëiºÚ+Š§j[h‘éÜ¢éíãúïnöë]vo+^²‰¢¶×## .1000 â€” UV Paint handoff and Facegroups â†’ UV Seams â€” 27 October 2026

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
- Released via PR **#81**; squash merge `37ad0×]µçkh‘éì¶»§q«^uµ”‰•™½É”É•ÍÑ½É”°ÍÑ…±±•µ™É…µ”™…±±‰…¬°…¹•°½±…Ñ”µ™É…µ”)±•…¹ÕÀ°‰ÕÍä½µ…¹Õ…°µÁÉ½‰”É•™ÕÍ…°°Í¡•‘Õ±•È™…¥±ÕÉ”É•ÍÑ½É…Ñ¥½¸°…ÑÕ…°¥±”•¹ÑÉä)İ¥Ñ ‘•‰Õ=°Á…•¡¥‘”½‘•‰Õœµ½™˜±•…¹ÕÀ°Õ¹¡…¹•‰…­¥¹œ‘¥µ•¹Í¥½¹Ì…¹µ½‘•°¼)¡¥ÍÑ½Éä¥‘•¹Ñ¥ÑäÑ•ÍÑ•¸=É¥¥¹…°äÜÌÑ•ÍÑÌÉ•Ñ…¥¹•¸M¡…É•Ñ•ÍĞ¡•±Á•È½¹±ä…¥¹Ì)½ÁÑ¥½¹…°¥±”¡½ÍĞ¸9¼¹…Ñ¥Ù”¥A…É•½Ù•ÉäµÍÁ••½Ù¥ÍÕ…°…•ÁÑ…¹”¥¹™•ÉÉ•¸)IÕ¹Ñ¥µ”¡…¹”=91d•ÍÑÕÉ”µ‘•‰Õœì‘¥É•ĞÍ¡•±°½É•½Ù•ÉäÁ¥¹ÌäàÀ…¹É•Ù¥•İ•¡…Í¡•Ì¸(äÜäµ½‘•±±¥¹œ½á…Ğ°äÜà	É¥‘”½Í¡…É•É•¹‘•É•È°µ…¥¸½5Õ±Ñ¤Ä¸À½¥½¹Ì½™É½é•¸Õ¹¡…¹•¸()Y%äàÀè¥±—ŠII•™É•Í ‘¥ÍÁ±…äè…¹Ù…ÌÉ•ÑÕÉ¹Ì…ÕÑ½µ…Ñ¥…±±ä°µ½‘•°½Í•±•Ñ¥½¸ÍÑ…äì)U¹‘½I•‘¼ÍÑ¥±°…ÑÌ½¸…ÑÕ…°ÁÉ¥½Èµ½‘•±±¥¹œ¡…¹•Ì¸9¼‘•‰Õœ•¹…‰±”É•ÅÕ¥É•¸)]¡•¸É¥¡Ğ½¹ÑÉ½±Ì¹•áĞ‘¥Í…ÁÁ•…È°ÕÍ”Ñ¡¥Ì½¹”…Ñ¥½¸ìÉ•Á½ÉĞ¥˜Ñ¡•äÉ•ÑÕÉ¸…¹)ÍÑ…äÙ¥Í¥‰±”¸á¥ÍÑ¥¹œµ…¹Õ…°!¥‘”ÍŠIM¡½ÜÍÉ•µ…¥¹Ì…Ù…¥±…‰±”¥˜‰É¥•˜É•™É•Í ‘½•Ì)¹½ĞÉ•ÁÉ½‘Õ”¥ÑÌÉ•½Ù•Éä¸Q¡¥Ì¥Ì½¹Ù•¹¥•¹Ğ•Ù¥‘•¹”µ‰…Í•I=YId°¹½Ğ„±…¥´)Ñ¡…Ğ¥¹Ñ•Éµ¥ÑÑ•¹ĞÁ…¥¹Ñ¥¹œ™…Õ±Ğ¥Ì™¥á•¸9•áĞ™½±±½Ü¹…Ñ¥Ù”™••‘‰…¬…¹¥¹Ù•ÍÑ¥…Ñ”)…¹Ù…Ì½U$‰½Õ¹‘…Éä™É½´•Ù¥‘•¹”ìÉ•Ñ…¥¸…±°ÁÉ½Ñ•Ñ•äÜä¼äÜà¥¹Ñ•É…Ñ¥½¹Ì¸((ŒŒ€¸äàÀÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ”ÕÜÉ”É‰™„Äá„áäÉÔÄÈÀÀÕ…„Íˆá…‘ˆÕ‘ŒáˆäÈì•á…ĞÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”ÑŒÜäĞØÈÀÜĞÉ‘‘„Õ”Å„ĞàÜØÙŒÍ…‰•ˆÁ™„ÄÜäÀ°…±°ÄÄ‰±½ˆ¡…Í¡•ÌÙ•É¥™¥•¸ÕÉÉ•¹Ğµ…¥¸É•±•…Í”½Í¡•±°½•ÍÑÕÉ”µ‘•‰ÕœäàÀÁ¥¸½Í½ÕÉ”µ…Ñ Ñ•ÍÑ•™¥±•Ì¸±°Ì…¡”µ‰ÕÍÑ•±¥Ù”™¥±•ÌÙ•ÉÍ¥½¸¹©Í½¸±¥¹‘•à¹¡Ñµ°±•ÍÑÕÉ”µ‘•‰Õœ¹©Ì‰åÑ”µµ…Ñ ¸¥¹…°Ìä™½ÕÍ•‘AML¼Á%0¼ÁÍ­¥À€ À¸ÈáÌ¤ì¹¼™Õ±°µÍÕ¥Ñ”½¡½ÍÑ•É•ÍÕ±Ğ±…¥µ•¸Y%äàÀÉ•…‘äè¥±”I•™É•Í ‘¥ÍÁ±…äİ¥Ñ¡½ÕĞ•‰Õœ°…¹Ù…Ì…ÕÑ½µ…Ñ¥ŒÉ•ÑÕÉ¸½İ½É¬½U¹‘½I•‘¼É•Ñ…¥¹•°…ÑÕ…°É¥¡Ğµ½¹ÑÉ½°É•ÕÉÉ•¹”É•½Ù•Éä¸U¹‘•É±å¥¹œ¥¹Ñ•Éµ¥ÑÑ•¹Ğ™…Õ±ĞÉ•µ…¥¹Ì=A8ì¹¼Á•Éµ…¹•¹Ğ™¥à±…¥´¸	É¥‘”äÜà…¹á…ĞäÜäÕÍ•ÈAMLÁÉ½Ñ•Ñ•¸Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸((ŒŒ€¸äàÄƒŠPUXÁ½ÁÕÀÑ½À±…å•È…¹½µÁ±•Ñ”ÍÕÉ™…”Ñ•…É‘½İ¸ì€¸äàÀÉ•½Ù•ÉäAML½¹±äƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈäàÀAML…•ÁÑÌ•áÁ±¥¥ĞÉ•½Ù•Éä°‰ÕĞÉ•©•ÑÌ¹••‘¥¹œµ…¹Õ…°I•™É•Í …Ì„)Í½±ÕÑ¥½¸…¹ÍÕÁÁ±¥•ÌÉ•ÁÉ½‘Õ¥‰±”UXİ¥¹‘½ÜÉ•Á½ÉĞÀÜèÔÄèÀåh¸-••ÀÉ¥¡ĞµÍ¥‘”Ù¥ÍÕ…°)™…¥±ÕÉ”=A8ì‘½¸Ğµ¥ÍÉ•½ÉäàÀ…ÌU$É•Á…¥ÈAML¸äÜäá…Ğ…¹äÜà	É¥‘”ÁÉ½Ñ•Ñ•¸)Õ‘¥ĞÕÉÉ•¹Ñµ…¥¹„ÀÀØàÕ„àè•Ù•¹Ñ¡…¥¸¥Ì=‰©•ĞUYÑ½½±ÌààÄàÃŠIµ•Í¡!•…±Ñ¡±½Í”äÈàÔÃŠH)™¥¹…±Í•ÍÍ¥½¹¹Õ±°°¹¼UX‘¥Ñ½È½Á…¥¹Ğ½‘¥ÍÁ±…åÉ•™É•Í ¹••‘•¸½¹ÑÉ½±Ì½•½µ•ÑÉä½¡¥ÑÌ)¡•…±Ñ¡äì¡¥‘‘•¸Í¡…É•‘¡½ÍĞÉ•µ…¥¹ÌÙ¥•İÁ½ÉĞµ½¹Ñ…¥¹•İ¥Ñ èÄÌĞ½½Ù•É™±½İ…ÕÑ¼¼)½¹Ñ…¥¹±…å½ÕÑÁ…¥¹Ğ½¥Í½±…Ñ¥½¹¥Í½±…Ñ”¸M½ÕÉ”•¹±…­•Ù¥•İÁ½ÉĞµÍÑå±”½Á±…•µ•¹Ğ)±•…¹ÕÀ¸á…Ğ•Ù¥‘•¹”ÍÕµµ…Éä¥¸‘½Ì½Õ¤µÕØµÑÉ¥•È´äàÀ¹µì¹¼ÁÉ½Ù•¸•¹¥¹”…ÕÍ”¸()I•Á…¥È½É¥¥¹…°Ñ½½°µÍ•ÍÍ¥½¸µÕ¤½İ¹•È°9=P…¸…ÕÑ½µ…Ñ¥Œİ½É­…É½Õ¹¸UXÑ½½±ÌÕÍ•Ì)µ…¹Õ…°¹…Ñ¥Ù”A½Á½Ù•ÈÑ½À±…å•È¥˜ÍÕÁÁ½ÉÑ•ì½É¥¥¹…°¡½ÍĞ½½¹ÑÉ½°¹½‘•ÌÉ•µ…¥¸¥¸)=4Í¼•á¥ÍÑ¥¹œÍ½Á•İ¥‘”ML½±¥ÍÑ•¹•ÉÌ½…Ñ¥½¹ÌÍÕÉÙ¥Ù”¸¥á•Á½Í¥Ñ¥½¹¥¹œ™½±±½İÌ)Ù¥•İÁ½ÉĞÑ½À¬ÄÉÁàì‘å¹…µ¥ŒÙ¥•İÁ½ÉĞ¡•¥¡Ğ‰½Õ¹‘Ì°İ¥¹‘½Ü½Ù¥ÍÕ…°É•Í¥é”±¥ÍÑ•¹•ÉÌ)…Ñ¥Ù”½¹±äİ¡¥±”Í¡½İ¸¸=É¥¥¹…°€¸äÔàÑÉ…¹Í™½Éµ™É•”Á½Í¥Ñ¥½¸É•Ñ…¥¹•°‰ÕĞ™…¥±•)Á…¥¹Ğµ½¹Ñ…¥¹µ•¹Ğ±…å•ÈÉ•µ½Ù•¸QÉ…¹ÍÁ…É•¹Ğ¹½¹¥¹Ñ•É…Ñ¥Ù”‰…­‘É½À°¥¹¡•É¥Ñ•Ñ•áĞ)½±½ÕÈì¹¼µ½‘…°½¥¹•ÉĞ½™½ÕÌµÑÉ…À½È¹•ÜÉ…ÜµÁ½¥¹Ñ•È½İ¹•È¸=Ñ¡•ÈÑ½½±ÌÕ¹¡…¹•¸()=¸±½Í”½½¹Ñ•áĞÍİ¥Ñ °¡¥‘”½É•±•…Í”¹…Ñ¥Ù”ÍÕÉ™…”‰•™½É”É•ÑÕÉ¹¥¹œ½É¥¥¹…°)½¹ÑÉ½±Ìì±•…ÈÁ½Á½Ù•È½‘½¬½İ¥‘”™±…Ì…¹10¥¹±¥¹”Ù¥•İÁ½ÉĞÍÑå±•ÌìÁ…É¬•µÁÑä)¡¥‘‘•¸¡½ÍĞ‰…¬¥¸‘É…İ•È¸UX‘¥Ñ½È¡…¹‘½™˜•áÁ±¥¥Ñ±äÍÕÍÁ•¹‘ÌÍ½ÕÉ”ÍÕÉ™…”)‰•™½É”™¥ÉÍĞİ½É­ÍÁ…”Á…¥¹Ğİ¡¥±”ÁÉ•Í•ÉÙ¥¹œ½É¥¥¹…°±½¥…±Í•ÍÍ¥½¸Õ¹Ñ¥°	…¬¼)±½Í”¸Q¡ÕÌ¹¼•µÁÑäÑ½Àµ±…å•ÈÁ½ÁÕÀ…‰½Ù”É•‘¥Ñ½È¸á¥ÍÑ¥¹œİ½É­ÍÁ…”äÔÈ…¹…±°)UX½…Ñ±…Ì½¡¥ÍÑ½Éä½µ…Ñ ½İ¹•ÉÌÕ¹Ñ½Õ¡•¸9…Ñ¥Ù”Õ¹ÍÕÁÁ½ÉÑ•½Ñ¡É½İ¥¹œA$™…±±Ì‰…¬)Í…™•±äÑ¼½É¥¥¹…°Õ¹ÑÉ…¹Í™½Éµ•…‰Í½±ÕÑ”Á…¹•°°İ¥Ñ¡½ÕĞ½¹Ñ…¥¹µ•¹ĞìÍ…µ”±•…¹ÕÀ¸)9¼…¹Ù…ÍÙ¥Í¥‰¥±¥Ñä½É•™É•Í ½É•Í¥é”½É•¹‘•É•ÈÉ•Í•Ğ°Ñ¥µ•È°Á•Èµ™É…µ”Á½±±¥¹œ½Èµ•Í )¡…¹”¥¹ÑÉ½‘Õ•¸á¥ÍÑ¥¹œµ…¹Õ…°É•½Ù•ÉäÉ•µ…¥¹Ì…Ù…¥±…‰±”‰ÕĞ¥Ì¹½Ğ¥¹Ù½­•¸()á¥ÍÑ¥¹œ‘•‰ÕœÍ¹…ÁÍ¡½Ğ¹½Ü¥¹±Õ‘•ÌÍ½ÕÉ”µÁ…É•¹Ğ½Á½Á½Ù•È½Ñ½Á1…å•ÈÍÑ…Ñ”Á±ÕÌ)µ•Í¡!•…±Ñ¡M•ÍÍ¥½¸…¹‰½á±…‰UY]½É­ÍÁ…”°Í¼¹…Ñ¥Ù”É•¹‘•É¥¹œµ½‘”½±•…¸±½Í”…¸‰”)Ù•É¥™¥•¥˜É•ÕÉÉ•¹”Á•ÉÍ¥ÍÑÌ¸Q¡¥Ì¥Ì•Ù¥‘•¹”°¹½ĞÉ•Á±…•µ•¹Ğ½¹ÑÉ½±Ì¸(ÌØĞÑ…É•Ñ•‘AML¼Á%0¼ÁÍ­¥À€ Ğ¸ÕÌ¤èÕ¹•Ü½¹ÑÉ½±±•È½¹…Ñ¥Ù”µA$µ‘½Õ‰±”Ñ•ÍÑÌ½Ù•ÈÄÔ)½Á•¸½±½Í”å±•Ì°•á…Ğ½É¥¥¹…°¹½‘•Ì½½¹Ñ•áĞ°Ñ½Àµ±…å•ÈÉ•±•…Í”½ÍÑå±•Ì½Á…É­¥¹œ°)UX‘¥Ñ½È¡…¹‘½™˜°É•Í¥é”½‘¥ÍÁ½Í…°°½Ñ¡•ÈµÑ½½°Íİ¥Ñ …¹Õ¹ÍÕÁÁ½ÉÑ•½Ñ¡É½Ü™…±±‰…¬¸)=É¥¥¹…±UX½İ½É­ÍÁ…”½Í•ÍÍ¥½¸½¡•…±Ñ ½‘•‰Õœ½	É¥‘”½á…Ğ½É•±•…Í”¡•­ÌÉ•Ñ…¥¹•¸äÔà)Ñ•ÍĞ¹½ÜÉ•©•ÑÌ½±½¹Ñ…¥¹µ•¹ĞÉ…Ñ¡•ÈÑ¡…¸ÁÉ•Í•ÉÙ¥¹œ„µ¥Ñ¥…Ñ¥½¸Ñ¡…Ğ™…¥±•)½¹‘•Ù¥”¸9¼±½…°¹…Ñ¥Ù”]•‰-¥ĞÙ¥ÍÕ…°É•ÁÉ½‘ÕÑ¥½¸½Õ…É…¹Ñ••Á•Éµ…¹•¹ĞÉ•Á…¥È)±…¥µ•¸•Ù¥”µÕÍĞ½¹™¥É´Ñ¡¥ÌÍÑÉÕÑÕÉ…°Í½ÕÉ”™¥àÁÉ•Ù•¹ÑÌÑ¡”ÑÉ¥•È¸()¡…¹•ÉÕ¹Ñ¥µ”½¹±ä½É¥¥¹…°Í¡…É•‘Í•ÍÍ¥½¸½µ•Í¡¡•…±Ñ ¡…¹‘½™˜½‘•‰Õœ•Ù¥‘•¹”ì‘¥É•Ğ)Í¡•±°½É•½Ù•Éä­•åÌäàÄ…¹É•Ù¥•İ•¡…Í¡•Ì¸9…Ñ¥Ù”A$ÍÕÁÁ½ÉÑ•Í¥¹”M…™…É¤ÄÜì)ÁÉ¥µ…ÉäÍ½ÕÉ•Ì¥¸¥¹¥‘•¹Ñ‘½Œ¸9¼Í¡…É•±…å½ÕĞ½Á½Í¥Ñ¥½¹•È•‘¥ÑÌ°‘ÕÁ±¥…Ñ”Á½ÁÕÀ°)UX­•É¹•°±µ…¥¸°äàÀÉ•½Ù•Éä¥µÁ±•µ•¹Ñ…Ñ¥½¸°äÜåá…Ğ°äÜá	É¥‘”±5Õ±Ñ¤Ä¸À½È™É½é•¸¡…¹•Ì¸()Y%äàÄèİ¥Ñ¡½ÕĞI•™É•Í ½…ÁÀµÍİ¥Ñ ½É½Ñ…Ñ¥½¸°É•Á•…Ñ•‘±ä=‰©•ÓŠIU[ŠI±½Í”°¥¹ÍÁ•Ğ)É¥¡ĞÑ½½±‰…È½ÍÑ…ÑÕÌ•… å±”ìÑ¡•¸ÕÑ¼…Ñ±…Ì½=Á•¸UX‘¥Ñ½È½	…¬…¹½É‰¥ĞÑ¼)É¥¡Ğ•‘”¸½¹ÑÉ½±ÌµÕÍĞÍÑ…ä‘É…İ¸…¹ÕÍ…‰±”¸U$•‰Õœ¥˜É•ÕÉÉ•¹”è¡½ÍĞÁ…É•¹Ğ)Í¡½Õ±‰”‘É…İ•È…™Ñ•É±½Í”°Á½Á½Ù•É¹Õ±°½Ñ½Á1…å•É™…±Í”°½¹Ñ…¥¹¹½¹”ìÍ•¹¹•ÜÉ•Á½ÉĞ¸)¼¹½Ğ±½Í”Ù¥ÍÕ…°¥ÍÍÕ”™É½´…ÕÑ½µ…Ñ•AML¸9•áĞ…ÑÕ…°äàÅ‘•Ù¥”É•ÍÕ±Ğ‰•™½É”)Õ¹É•±…Ñ•‘™•…ÑÕÉ”É½±±½ÕĞ½ÈÍÁ•Õ±…Ñ¥Ù”™ÕÉÑ¡•ÈML½•¹¥¹”™¥á•Ì¸((ŒŒ€¸äàÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ•‘‰”ÄÌÌØàÀÁàÙ˜Ñ…„àÈØÔÄØäÜÄÅ”Ñ…ÉˆàÍ”Ìåˆäì•á…ĞÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ••”ĞÕ˜ØĞÁ”ÌÌØÅ‘”İˆĞÑˆá•ˆÉĞÈÌÌÍ‘”á‘ˆäÕÕ˜Ü°…±°ÄÌ‰±½ˆ¡…Í¡•ÌÙ•É¥™¥•¸ÕÉÉ•¹Ğµ…¥¸É•±•…Í”½Í¡•±°…¹Í•ÍÍ¥½¸½¡•…±Ñ ½‘•‰ÕœäàÄ­•åÌ½Í½ÕÉ”µ…Ñ Ñ•ÍÑ•™¥±•Ì¸±°Ô…¡”µ‰ÕÍÑ•ÁÕ‰±¥Œ™¥±•ÌÙ•ÉÍ¥½¸±¥¹‘•à±Ñ½½°µÍ•ÍÍ¥½¸µÕ¤±µ•Í µ¡•…±Ñ ±•ÍÑÕÉ”µ‘•‰Õœ‰åÑ”µµ…Ñ …™Ñ•ÈÉ½±±½ÕĞ¸¥¹…°ÌØĞ™½ÕÍ•‘AML¼Á%0¼ÁÍ­¥À€ Ğ¸ÕÌ¤ì¹¼™Õ±°½¡½ÍÑ•½¹…Ñ¥Ù”]•‰-¥ĞÉ•ÍÕ±Ğ±…¥µ•¸MÑÉÕÑÕÉ…°UXÁ½ÁÕÀÉ•Á…¥È¥ÌId™½ÈY%äàÄÉ•Á•…Ñ•UX½Á•¸½±½Í”…¹‘¥Ñ½È½	…¬]%Q!=UPI•™É•Í °…ÁÀµÍİ¥Ñ ½ÈÉ½Ñ…Ñ¥½¸¸!¥‘‘•¸¡½ÍĞ¹½ÜÁ…É­Ì¥¹Í¥‘”‘É…İ•Èµ½¹Ñ•¹Ğ€¡Á…É•¹Ñ%…¸‰”¹Õ±°‰•…ÕÍ”Ñ¡…Ğ‘¥Ø¡…Ì¹¼%¤ìÁ½ÁÕÀ¥ÌÉ•±•…Í•½Õ¹ÍÑå±•¸U¹‘•É±å¥¹œÙ¥Í¥‰¥±¥Ñä…Ñ”ÍÑ…åÌ=A8Õ¹Ñ¥°¹…Ñ¥Ù”½¹™¥Éµ…Ñ¥½¸°¹½Ğ±½Í•‰ä9½‘”Ñ•ÍÑÌ¸9¼…ÕÑ½µ…Ñ¥ŒÉ•½Ù•Éä¥¹Ù½­•¸€¸äàÀAML…ÁÁ±¥•Ì½¹±äÑ¼É•½Ù•Éä™•…ÑÕÉ”ìäÜåá…Ğ¼äÜá	É¥‘”…•ÁÑ…¹”ÁÉ½Ñ•Ñ•¸Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸((ŒŒ€¸äàÈƒŠP…ÁÁÉ½Ù•A…¥¹ĞÉ…‘¥…°¥½¹Ìì€¸äàÄÕÍ•ÈAMLƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äAMM•Ì€¸äàÄ…¹É•ÅÕ•ÍÑÌ€½¹•áÑ‰Õ¥±¸AÉ½Ñ•ĞÑ¡”…•ÁÑ•UXÁ½ÁÕÀ)¹…Ñ¥Ù”µÑ½Àµ±…å•È±¥™•å±”°½µÁ±•Ñ”±½Í”Ñ•…É‘½İ¸…¹‘¥Ñ½È¡…¹‘½™˜ìÑ¡¥ÌÍÕÁ•ÉÍ•‘•Ì)½±‘•ÈÁ•¹‘¥¹œY%äàÄ¹½Ñ•Ì¸9¼I•™É•Í ‘¥ÍÁ±…ä¥ÌÉ•ÅÕ¥É•™½ÈÑ¡…Ğ…•ÁÑ•™±½Ü¸)…É±¥•È€¸äØÜ…•ÁÑ…¹”ÍÕ‰Í•ÅÕ•¹Ñ±äÉ•É•ÍÍ•°Í¼É•Ñ…¥¸‘¥…¹½ÍÑ¥Ì…¹¥¹Ù•ÍÑ¥…Ñ”)…¹äÉ•ÕÉÉ•¹”™É½´™É•Í •Ù¥‘•¹”É…Ñ¡•ÈÑ¡…¸‘•±…É¥¹œ•Ù•ÉäÉ•¹‘•É¥¹œÁ…Ñ ÁÉ½Ù•¸¸)	É¥‘”äÜà°á…ĞäÜä°ÉÉ…ääÜÄ…¹…•ÁÑ•µ½‘•±±¥¹œ¥½¹ÌÉ•µ…¥¸ÁÉ½Ñ•Ñ•¸()Õ‘¥Ğµ…¥¸ÈÑ˜ÔÍŒÌ½ÉÕ¹Ñ¥µ”‘‰”ÄÌÌØà°µ…Ñ¡¥¹œ±¥Ù”äàÄÍ¡•±°½µ…¹¥™•ÍĞ°É••¹Ğ½µµ¥ÑÌ°)É…‘¥…°İ¥É¥¹œ¥¹Ù•¹Ñ½Éä…¹Í•±•Ñ•ØÔµÑ½½°AÉ½½˜ÀÌ…ÉÑİ½É¬¸±°½¹™¥Éµ•…Õ‘¥Ğ)É•Á…¥ÉÌ…É”…•ÁÑ•ìÁ¡åÍ¥…°Q¡É½Õ É•™ÕÍ…°ÍÑ¥±°±…­Ì¥ÑÌ…™™•Ñ•Í½ÕÉ”½•ÍÑÕÉ”¸)I•ÍÕµ”ÅÕ•Õ•™¥¹…°A…¥¹Ğ¥½¸ÍÑ…”°¹½Ğ„ÍÁ•Õ±…Ñ¥Ù”™ÕÉÑ¡•ÈÉ•¹‘•É¥¹œ¡…¹”¸)±°ÄÀ•á¥ÍÑ¥¹œA…¥¹Ğ…Ñ¥½¹Ì½Á…•Ì…±É•…‘ä¡…Ù”½É¥¥¹…°‰ÕÑÑ½¹Ì°±…‰•±Ì°Á±…•µ•¹Ğ°)ÍÑ…Ñ”…¹‘¥ÍÁ…Ñ ¥¸Ù¥•İÁ½ÉĞµÁ…¥¹Ğ¹©Ì¸9•ÜÍ½Á•Á…¥¹ĞµÉ…‘¥…°µ¥½¹Ì¹ÍÌÍÕÁÁ±¥•Ì)aP…ÁÁÉ½Ù•AÉ½½˜ÀÌ	ÉÕÍ ½¥±°½É…Í•È½MµÕ‘”½	±ÕÈ½1…å•ÉÌ½5…Í¬½%µ…”½<½5…ÀÍ¥é”MYÌ)…Ì¹½¹¥¹Ñ•É…Ñ¥Ù”ÌÉÁàÁÍ•Õ‘¼µ•±•µ•¹ÑÌ…‰½Ù”½É¥¥¹…°Íµ…±°…ÁÑ¥½¹Ì¸!¥‘”Ñ¡•¥È½±(ÈÉÁà¥¹±¥¹”…ÉÑİ½É¬Ù¥ÍÕ…±±äì½É¥¥¹…°=4½Ñ•áĞ½…Ñ¥½¹ÌÉ•µ…¥¸¸M…µ”ÜÙÁà‰ÕÑÑ½¸İ¥‘Ñ °(ÄÌÉÁàÉ…‘¥ÕÌ¼ÌÔÁÁàÍÕÉ™…”½…¹±•Ì°•áÁ±¥¥ĞØÁÁà¡•¥¡Ğì•¹ÑÉ”A…¥¹Ğ½¹ÑÉ½°Õ¹Ñ½Õ¡•¸)Q•¸Ù…±¥MYÌ‰åÑ”µµ…Ñ Í•±•Ñ•…ÉÑİ½É¬ì…±°Ñ…É•Ğ‰½á•Ì™¥Ğ•á¥ÍÑ¥¹œ‰½Õ¹‘Ìİ¥Ñ )iI<Á…¥Éİ¥Í”½Ù•É±…ÁÌ¸á¥ÍÑ¥¹œ…Ñ¥Ù”½‘¥Í…‰±•™••‘‰…¬É•Ñ…¥¹•¸()IÕ¹Ñ¥µ”)…Ù…MÉ¥ÁĞ°A…¥¹Ğ•ÍÑÕÉ•Ì½É•Í½ÕÉ”½¡¥ÍÑ½Éä°±•™ĞÍ•ÑÑ¥¹Ì½1…å•ÉÌ°…±°µ½‘•±±¥¹œ)¥½¹Ì…¹äàÄÍÕÉ™…”É•Á…¥È…É”‰åÑ”µÕ¹¡…¹•¸=¹±ä¹•ÜÍÑå±•Í¡••Ğ°Í¡•±°½É•½Ù•Éä)­•åÌäàÈ°µ…¹¥™•ÍĞ…¹É•Ù¥•İ•…ÍÍ•Ğ½¹ÑÉ…Ğ¡…¹”¸9¼…ÕÑ½µ…Ñ¥ŒÉ•™É•Í °¹•ÜÁ½ÁÕÀ°)¥¹ÁÕĞ½İ¹•È°‰ÉÕÍ ½­•É¹•°½È™É½é•¸½5Õ±Ñ¤Ä¸À¡…¹”¸9…Ñ¥Ù”É•…‘…‰¥±¥Ñä¥ÌY%äàÈ¸)Y…±¥‘…Ñ¥½¸èÌÌ™½ÕÍ•AML¼À%0¼ÀÍ­¥ÁÁ•€ Ğ¸åÌ¤°½Ù•É¥¹œ•á¥ÍÑ¥¹œA…¥¹ĞÑ½½±Ì¼)İ½É­™±½Ü½½¹Ñ¥¹Õ¥¹œMµÕ‘”°UXäàÄ±¥™•å±”°	É¥‘”½á…Ğ…¹É•±•…Í”½¹ÑÉ…ÑÌ¸)Q•¸MYa50½•á…Ğµ…ÉÑİ½É¬…¹½É¥¥¹…°É…‘¥…°‰½Õ¹‘Ì½½Ù•É±…À¡•­ÌÁ…ÍÌ¸9¼±½…°)É•¹‘•É•‰É½İÍ•È½¹…Ñ¥Ù”¥A……ÁÁ•…É…¹”É•ÍÕ±Ğ±…¥µ•¸AÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½İÌ¸()Y%äàÈèUXA%9P€´ø¥¹ÍÁ•ĞÄÀ¥½¹Ì½…ÁÑ¥½¹Ìì¡½½Í”	ÉÕÍ ½	±ÕÈ½MµÕ‘”…¹½¹™¥É´)±•™ĞÍ•ÑÑ¥¹Ì¸	É½İÍ”1…å•ÉÌ½5…Í¬½%µ…”½<½5…ÀÍ¥é”ìÉ…‘¥…°ÍÑ…åÌÕ¹Ñ¥°A•¹¥°Ñ½Õ¡•Ì)µ•Í …¹‰…­É½Õ¹¡½±É•½Á•¹Ì¥Ğ¸A…¥¹Ğ°U¹‘½I•‘¼°½¹”ìUX½Á•¸½±½Í”ÍÑ¥±°±•…Ù•Ì)É¥¡Ğ½¹ÑÉ½±ÌÙ¥Í¥‰±”İ¥Ñ¡½ÕĞÉ•™É•Í ¸9•áĞ…İ…¥ĞA…¥¹Ğ¥½¸…•ÁÑ…¹”°Ñ¡•¸…Õ‘¥Ğ)ÅÕ•Õ•UXµ™É•”™…•É½ÕÀÁ…¥¹Ñ¥¹œÑ¡É½Õ •á¥ÍÑ¥¹œ™…•É½ÕÁÌ½Í•±•Ñ¥½¸½¡¥ÍÑ½Éä½İ¹•ÉÌì)‘¼¹½Ğ¥¹Ù•¹Ğ„Í•½¹Á…¥¹Ñ•È½È…ÍÍÕµ”™…•É½ÕÁÌ…É”…‰Í•¹Ğ¸((ŒŒ€¸äàÈÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ”‰Œäå„Ù˜åá„ÈàÜØÉ‘…„Í”ÌÜåˆÌÍ•ŒàÅ™‘”ÅˆäÜÀØì•á…ĞÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”€ÑˆÙˆÜÜÔÈÁ…•”ÀàĞĞØÄØÔàÕ„ĞÙ˜ØÕ™„ÔİÀÔÕ„äàÔ°…±°à‰±½ˆ¡…Í¡•ÌÙ•É¥™¥•¸5…¥¸É•±•…Í”½Í¡•±°½¹•ÜA…¥¹ĞÍÑå±•Í¡••Ğµ…Ñ Ñ•ÍÑ•Í½ÕÉ”¸±°Ì™É•Í ÁÕ‰±¥Œ™¥±•ÌÙ•ÉÍ¥½¸¹©Í½¸±¥¹‘•à¹¡Ñµ°±Á…¥¹ĞµÉ…‘¥…°µ¥½¹Ì¹ÍÌ‰åÑ”µµ…Ñ …™Ñ•ÈÉ½±±½ÕĞ¸¥¹…°ÌÌ™½ÕÍ•AML¼À%0¼ÀÍ­¥ÁÁ•€ Ğ¸åÌ¤°ÄÀ•á…ĞÙ…±¥…ÁÁÉ½Ù•MYÌ…¹é•É¼Ñ…É•Ğµ‰½à½Ù•É±…ÁÌì¹¼¡½ÍÑ•™Õ±°µÍÕ¥Ñ”½ÈÉ•¹‘•É•µ‰É½İÍ•ÈÉ•ÍÕ±Ğ±…¥µ•€¡İ½É­™±½ÜÅÕ•ÉäÉ•ÑÕÉ¹•¹¼ÉÕ¹Ì¤¸UXäàÄÕÍ•ÈAML¥ÌÁÉ½Ñ•Ñ•°¹½ĞÁ•¹‘¥¹œìA…¥¹ĞäàÈ¥½¸É•…‘…‰¥±¥ÑäÉ•µ…¥¹ÌY%äàÈ¸9¼ÉÕ¹Ñ¥µ”)L°…•ÁÑ•µ½‘•±±¥¹œ¥½¸°5Õ±Ñ¤Ä¸À½È™É½é•¸¡…¹•Ì¸Q¡¥ÌÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸((ŒŒ€¸äàÌƒŠPÍÑ…‰±”ÍÑ…ÉÑÕÀÑ½½±‰…Èì€¸äàÈA…¥¹ĞAML°É•™É•Í Ù¥Í¥‰¥±¥ÑäÉ•ÕÉÉ•¹”ƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈèƒŠqAML€´É•™É•Í µ…‘”Ñ¡”É¥¡Ğ½¹ÑÉ½±Ì‘¥Í…ÁÁ•…È	UPÍ•Ù•É…°É•™É•Í¡•Ì™¥á•)Ñ¡”¥¹Ñ•Éµ¥ÑÑ•¹Ğ‰Õœ¸€½¹•áÑ‰Õ¥±“Št¸AÉ½Ñ•ĞäàÈA…¥¹Ğ¥½¹Ì½İ½É­™±½Ü¸I=A8É¥¡ĞµÍ¥‘”)Ù¥ÍÕ…°…Ñ”…™Ñ•ÈÉ•™É•Í ìäàÄ…•ÁÑ•UX±¥™•å±”¥Ì¹½Ğ‰±…¹­•ĞÉ•¹‘•É¥¹œÉ•Á…¥È¸)9¼¹•Ü‘•‰ÕœÉ•Á½ÉĞ½‰É½İÍ•ÈÑÉ…”…½µÁ…¹¥•ÌÉ•ÕÉÉ•¹”ì•á…Ğ•¹¥¹”…ÕÍ”É•µ…¥¹Ì)Õ¹ÁÉ½Ù•¸¸¼¹½Ğ…Í¬É•Á•…Ñ•É•™É•Í¡•Ì…Ì„Í½±ÕÑ¥½¸½ÈÉ•ÍÕµ”™…•É½ÕÀ™•…ÑÕÉ”İ½É¬¸()Õ‘¥ĞÕÉÉ•¹Ğµ…¥¸äĞÁŒØÙ„½ÉÕ¹Ñ¥µ”‰Œäå„Ù˜ä°±¥Ù”äàÈµ…É­•ÉÌ°ÕÉÉ•¹ĞÍÉ¥ÁĞÁ¥¹Ì°)½É¥¥¹…°Ñ½½±‰…È°Y¥•Ü½É…µ”½İ¹•ÉÌ…¹äØÜ½µÁ½Í¥Ñ¥½¸¼äàÄ±¥™•å±”¸M¡•±°¥¹¥Ñ¥…±±ä)¡…Ì½¹±äU¹‘¼½I•‘¼ì‘¥É•Ğµ‰•Ù•°±…Ñ•ÈÁÉ•Á•¹‘ÌÉ…µ”°Ù¥•Üµµ½‘•Ì…ÁÁ•¹‘Ì½ÕÌ½=‰©•ÑÌ¼)Y%\°Ñ½½±‰…È½‰Í•ÉÙ•ÈÉ•Á±…•ÌÑ¡•¥È…ÉÑİ½É¬…¹É•½É‘•ÉÌÑ¡•´¸AÉ¥½ÈäØØ‘•‰ÕœÉ•½É‘Ì)É¥¡ĞµÑ½½±‰…Èİ¥‘Ñ ÄÌĞ¸ÔÙÁà…ĞĞÔåµÌ€´øÌÄÜ¸ØÅÁà…ĞØĞåµÌ…™Ñ•È…¹Ù…ÌÉ•…Ñ¥½¸¸Q¡¥Ì¥Ì)½¹™¥Éµ•ÍÑ…•ÍÑ…ÉÑÕÀ=4½±…å½ÕĞ°9=PÁÉ½½˜Ñ¡…Ğ¥Ğ…ÕÍ•Ì¹…Ñ¥Ù”Á¥á•°±½ÍÌ¸()M••™¥¹…°™¥Ù”½É¥¥¹…°MY‰ÕÑÑ½¹ÌÁ±ÕÌ½É¥¥¹…°Y%\µ…É­ÕÀ¥¸¥¹¥Ñ¥…°!Q50°)…±É•…‘ä¥¸™¥¹…°½É‘•È¸9•ÜÙ¥•İÁ½ÉĞµÑ½½±‰…ÈµÍ¡•±°¹ÍÌµ…­•Ì•ÍÑ…‰±¥Í¡•¡•…‘•È½¥½¸¼)Y%\µÍÕµµ…Éä‘¥µ•¹Í¥½¹Ì…Ù…¥±…‰±”‰•™½É”µ½‘Õ±”½]•‰0ÍÑ…ÉÑÕÀ¸=±Í•±•Ñ¥½¸µ½‘•Ì)¥¹Í¥‘”¡•…‘•ÈÍÑ…ä½ÕĞ½˜¥¹¥Ñ¥…°¡•…‘•È™±½ÜÕ¹Ñ¥°Í…µ”Ñ½Á‰…È½İ¹•Èµ½Ù•ÌÑ¡•´Ñ¼)•á¥ÍÑ¥¹œ‰½ÑÑ½´‘½¬¸á¥ÍÑ¥¹œµ…¥¸U¹‘½I•‘¼‰¥¹‘¥¹ÌÉ•Ñ…¥¹•¸=É¥¥¹…°‘¥É•Ğµ‰•Ù•°)É…µ”±°É•ÕÍ•Ì½‰¥¹‘ÌÍ¡•±°‰ÕÑÑ½¸½¹”€¡½±ÁÉ•Í•¹”•…É±äµÉ•ÑÕÉ¸İ½Õ±‘¥Í½¹¹•Ğ)¥Ğ¤ì•á…Ğ½É¥¥¹…°…µ•É„™¥ÑÑ¥¹œÉ•µ…¥¹Ì¸=É¥¥¹…°Ù¥•Üµµ½‘•Ì…‘½ÁÑÌÍ¡•±°½ÕÌ¼)=‰©•ÑÌ½Y%\¹½‘•Ì°¥¹ÍÑ…±±ÌÍ…µ”¡…¹‘±•ÉÌ½ML°ÁÉ•Í•ÉÙ•ÌMY½Á…¹•°¥‘•¹Ñ¥Ñä…¹½É‘•Èì)É•…Ñ¥½¸™…±±‰…¬É•Ñ…¥¹•™½È•µ‰•‘‘•Í¡•±±Ì¸á¥ÍÑ¥¹œ±…Ñ”Ñ½½±‰…È½‰Í•ÉÙ•ÈÍ••Ì)…±É•…‘ä‘•½É…Ñ•½½É‘•É•¹½‘•Ì°Í¼¹¼ÍÑ…ÉÑÕÀ‰ÕÑÑ½¸É•Á±…•µ•¹Ğ½É•½É‘•È¥Ì¹••‘•¸)9¼‘ÕÁ±¥…Ñ”…Ñ¥½¸°¹•ÜÁ½¥¹Ñ•È½¡¥ÍÑ½Éä½İ¹•È°]•‰0‘•±…ä½É•Í•Ğ°…¹Ù…Ì¡¥‘”½É•™É•Í °)Á½±±¥¹œ°™¥±Ñ•È½±…å•È¡¥¹Ğ½È¹•ÜÑ½Àµ±…å•È¡É½µ”¸UXäàÄ¥µÁ±•µ•¹Ñ…Ñ¥½¸Õ¹Ñ½Õ¡•¸()Q¡¥ÌÉ•µ½Ù•Ì„Ù•É¥™¥•ÍÑ…ÉÑÕÀ¥¹ÍÑ…‰¥±¥Ñäì¹…Ñ¥Ù”¥A…Ù¥ÍÕ…°…Ñ”ÍÑ…åÌ=A8¸)¼¹½Ğ…±°äàÌ„ÁÉ½Ù•¸Á•Éµ…¹•¹Ğ½µÁ½Í¥Ñ½ÈÉ•Á…¥È¸I¥¡ĞÍÑ…ÑÕÌÁ…Ñ Õ¹¡…¹•¸)¡…¹•ÉÕ¹Ñ¥µ”™Õ¹Ñ¥½¹…±¥Ñä½¹±äÑİ¼½É¥¥¹…°…Ñ¥½¸½İ¹•ÉÌÁ±ÕÌÍ¡•±°½•…É±äMLì)Ù¥•Üµµ½‘•Ì½‘¥É•Ğµ‰•Ù•°½É•½Ù•ÉäÁ¥¹ÌäàÌ…¹É•Ù¥•İ•¡…Í¡•Ì¸A…¥¹Ğ¥½¹ÌäàÈ°)5Õ±Ñ¤Ä¸À½µ…¥¸½É•¹‘•É¥¹œ½µ½‘•±±¥¹œ½™É½é•¸¥µÁ±•µ•¹Ñ…Ñ¥½¹ÌÕ¹¡…¹•¸á¥ÍÑ¥¹œ½ÕÌ)±¥Ñ•É…°ÜÌÌÁ¥¸Ñ•ÍĞ™½±±½İÌÉ•Ù¥•İ•½¹ÑÉ…Ğ°‰•¡…Ù¥½È…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸	•Ù•°)=4™¥áÑÕÉ”¹½ÜÍÕÁÁ±¥•Ì¥ÑÌ½É‘¥¹…ÉäÉ•…°µÍ¡…Á•É…µ”‰ÕÑÑ½¸¥¹ÍÑ•…½˜‰…É•íôì)…±°•á¥ÍÑ¥¹œ•½µ•ÑÉä½¡¥ÍÑ½Éä½½¹Ñ•áĞ…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸9•ÜÑ•ÍÑÌ•á•ÕÑ”…ÑÕ…°)Y%\½É…µ”½İ¹•ÉÌÑ¼ÁÉ½Ù”½É¥¥¹…°µ¹½‘”…‘½ÁÑ¥½¸°½¹”±¥¬‰¥¹‘¥¹œ°™…±±‰…¬…¹)…µ•É„™¥ĞìÍ¡•±°¡…ÌÍ¥¹±”½É‘•É•%Ì½…ÉÑİ½É¬‰•™½É”µ½‘Õ±”•á•ÕÑ¥½¸¸)¥¹…°ÌÄä™½ÕÍ•AML¼À%0¼ÀÍ­¥ÁÁ•€ Ğ¸ÑÌ¤°¥¹±Õ‘¥¹œ	•Ù•°•½µ•ÑÉä½½¹Ñ•áĞ¼)¡¥ÍÑ½Éä°Y¥•Ü½½ÕÌ½‰É½İÍ•È½Ñ½½±‰…È°µ•¹Ô‰½Õ¹‘Ì°UXäàÄ…¹É•±•…Í”½¹ÑÉ…ÑÌ¸)Må¹Ñ…à…¹‘¥™˜¡•­ÌÁ…ÍÌ¸9¼¡½ÍÑ•½™Õ±°µÍÕ¥Ñ”½¹…Ñ¥Ù”Ù¥ÍÕ…°É•ÍÕ±Ğ±…¥µ•¸()Y%äàÌèÉ•±½…Í•Ù•É…°Ñ¥µ•Ì…¹¥¹ÍÁ•ĞÉ¥¡ĞÑ½½±‰…È½ÍÑ…ÑÕÌ%55%Q1d‰•™½É”)UX½…ÁÀµÍİ¥Ñ ½É½Ñ…Ñ¥½¸ìÉ•Á½ÉĞ…¹ä¥¹Ù¥Í¥‰±”½¹ÑÉ½±Ì¸É…µ”±°°U¹‘½I•‘¼°½ÕÌ°)=‰©•ÑÌ…¹Y%\•… Á•É™½É´½É¥¥¹…°…Ñ¥½¸½¹”¸UXÑ½½±Ì€´ø±½Í”…¹‘¥Ñ½È€´ø)	…¬­••ÀäàÄ‰•¡…Ù¥½ÈìA…¥¹Ğ¥½¹ÌÉ•µ…¥¸…•ÁÑ•¸%˜Ù¥ÍÕ…°±½ÍÌÉ•ÕÉÌ°½Áä™É•Í )U$•‰ÕœÉ•Á½ÉĞ‰•™½É”É•½Ù•Éä…¹Í…äİ¡•Ñ¡•È¥Ğ½ÕÉÉ•¥µµ•‘¥…Ñ•±ä½¸É•±½…¸)9•áĞ…ÑÕ…°ÍÑ…ÉÑÕÀ™••‘‰…¬½•Ù¥‘•¹”‰•™½É”™ÕÉÑ¡•ÈÉ•¹‘•É¥¹œ¡…¹•Ì½È¹•Ü™•…ÑÕÉ•Ì¸((ŒŒ€¸äàÌÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ”€ÄÔÕŒÕ”ØÅ˜Í…˜Í„Å…ˆÍ™‘„ÌØÕÌåàÈÑ„àĞÁ˜ÔÔäì•á…ĞÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”ˆÁ”äå…ˆÑ„ÀÜÙ…•˜ÔİˆÑ•™ÀÈİ‘•ŒĞÁ•”àÔÄÜĞÌÈĞ°…±°ÄÌ‰±½ˆ¡…Í¡•ÌÙ•É¥™¥•¸5…¥¸Í¡•±°½É•±•…Í”½¹•Ü•…É±äÑ½½±‰…ÈML…¹Ñİ¼½É¥¥¹…°…Ñ¥½¸µ½İ¹•ÈÁ¥¹Ì½Í½ÕÉ”µ…Ñ Ñ•ÍÑ•™¥±•Ì¸±°Ô™É•Í ±¥Ù”™¥±•ÌÙ•ÉÍ¥½¸¹©Í½¸±¥¹‘•à¹¡Ñµ°±Ù¥•İÁ½ÉĞµÑ½½±‰…ÈµÍ¡•±°¹ÍÌ±ÍÉŒ½‘¥É•Ğµ‰•Ù•°¹©Ì±ÍÉŒ½Ù¥•Üµµ½‘•Ì¹©Ì‰åÑ”µµ…Ñ …™Ñ•ÈÉ½±±½ÕĞ¸¥¹…°ÌÄä™½ÕÍ•AML¼À%0¼ÀÍ­¥ÁÁ•€ Ğ¸ÑÌ¤ì¹¼¡½ÍÑ•™Õ±°µÍÕ¥Ñ”½É•¹‘•É•½¹…Ñ¥Ù”É•ÍÕ±Ğ±…¥µ•€¡İ½É­™±½ÜÅÕ•ÉäÉ•ÑÕÉ¹•¹¼ÉÕ¹Ì¤¸A…¥¹ĞäàÈÕÍ•ÈAMLÁÉ½Ñ•Ñ•¸I•™É•Í µÑÉ¥•É•¥¹Ù¥Í¥‰±”É¥¡Ğ½¹ÑÉ½±ÌÉ•µ…¥¸=A8‘•ÍÁ¥Ñ”•…É±¥•ÈäàÄ…•ÁÑ…¹”ìäàÌÉ•µ½Ù•ÌÙ•É¥™¥•±…Ñ”ÍÑ…ÉÑÕÀÑ½½±‰…È½¹ÍÑÉÕÑ¥½¸‰ÕĞ¥Ì¹½Ğ„ÁÉ½Ù•¸Á•Éµ…¹•¹Ğ¹…Ñ¥Ù”É•¹‘•É¥¹œÉ•Á…¥È¸Y%äàÌ‰É½İÍ•ÈÉ•±½…‰•™½É”UX½…ÁÀµÍİ¥Ñ ½É½Ñ…Ñ¥½¸°½É¥¥¹…°Ñ½½±‰…È…Ñ¥½¹Ì½¹”°Ñ¡•¸…•ÁÑ•UX½A…¥¹ĞÍµ½­”¸Q¡¥ÌÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸((ŒŒ€¸äàÌ‘•Ù¥”™••‘‰…¬ƒŠP™¥ÉÍĞµÉ•™É•Í Ù¥Í¥‰¥±¥Ñä%0ƒŠP€ÈØ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈèƒŠqAML€¼¥ÉÍĞÉ•™É•Í ÍÑ¥±°…ÕÍ•Ì±½ÍÌ½˜É¥¡Ğ¡…¹Í¥‘—Št¸I•½É™Õ¹Ñ¥½¹…°)AMLÍ•Á…É…Ñ•±äì€¸äàÌÍÑ…ÉÑÕÀÉ•¹‘•É¥¹œÉ•Á…¥È%1¥ÑÌ¹…Ñ¥Ù”Ù¥ÍÕ…°…Ñ”¸MÑ…Ñ¥Œ)¥¹¥Ñ¥…°Ñ½½±‰…È‘¥¹½Ğ•±¥µ¥¹…Ñ”Ñ¡”™¥ÉÍĞµÉ•™É•Í ÁÉ½‰±•´¸¼¹½Ğ­••ÀÁÉ•Í•¹Ñ¥¹œ)ÍÑ…ÉÑÕÀ½¹ÍÑÉÕÑ¥½¸…ÌÑ¡”…ÕÍ”½È€¸äàÌ…Ì„Á•Éµ…¹•¹Ğ™¥à¸9¼¹•ÜÍ½ÕÉ”½‘•‰Õœ)É•Á½ÉĞÍÕÁÁ±¥•å•Ğ¸AÉ•Í•ÉÙ”…•ÁÑ•äàÈA…¥¹Ğ¥½¹Ì°½É¥¥¹…°Ñ½½±‰…È…Ñ¥½¹Ì…¹(äàÄUXÑ•…É‘½İ¸ì½Ù•É…±°¥¹Ñ•Éµ¥ÑÑ•¹ĞÙ¥ÍÕ…°™…¥±ÕÉ”É•µ…¥¹Ì=A8¸()9•áĞ•Ù¥‘•¹”è•¹…‰±”¥±”€´øU$•‰Õœ‰•™½É”É•ÁÉ½‘Õ¥¹œ„‰É½İÍ•ÈÉ•±½…ì½¸Ñ¡”)%IMP™…¥±•±½…°…ÁÑÕÉ”É•Á½ÉĞ€´ø½ÁäÉ•Á½ÉĞ	=I…¹½Ñ¡•ÈÉ•™É•Í °…ÁÀµÍİ¥Ñ °)É½Ñ…Ñ¥½¸½È!¥‘”Í½I•™É•Í ‘¥ÍÁ±…ä¸Q¡¥Ì…ÁÑÕÉ•ÌäàÌÍÑ…ÉÑÕÀİ¥‘Ñ ½=4½Ñ½Àµ±…å•ÈÍÑ…Ñ”)™½È½µÁ…É¥Í½¸İ¥Ñ äØØ¼äàÀ¸%Ğ…¹¹½Ğ‘¥É•Ñ±ä‘¥…¹½Í”‰É½İÍ•È½µÁ½Í¥Ñ½ÈÁ¥á•±Ìì)¥˜=4¥Ì……¥¸¡•…±Ñ¡ä°‘½¸Ğ±…¥´Ñ¡”É•Á½ÉĞÁÉ½Ù•Ì…¸•¹¥¹”…ÕÍ”½ÈÉ•Á•…Ğ)ÍÁ•Õ±…Ñ¥Ù”ML½±…å•ÈÑİ•…­Ì¸9••¹…Ñ¥Ù”É•¹‘•É¥¹œ•Ù¥‘•¹”™½È™ÕÉÑ¡•ÈÍ½ÕÉ”İ½É¬¸)9¼¹•ÜÉÕ¹Ñ¥µ”½‰Õ¥±¥¸Ñ¡¥Ì™••‘‰…¬µ½¹±äÕÁ‘…Ñ”ì¹¼¹•Ü¡…¹‘Ìµ½¸™•…ÑÕÉ”Ñ•ÍĞ¸((ŒŒ€¸äàÌ•Ù¥‘•¹”ƒŠPU$Ù¥Í¥‰±”°É¥¡ĞÉ½Õ¹Í¡…‘¥¹œµ¥ÍÍ¥¹œƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()9•ÜÕÍ•ÈäàÌÉ•Á½ÉĞ…ĞÈÀÈØ´ÄÀ´ÈÙPÈÄèÌØèÀà¸àÜÕh•áÁ±¥¥Ñ±äÍ…åÌU$%LY%M%	1‰ÕĞÉ½Õ¹)Á±…¹”Í¡…‘¥¹œ¥Ìµ¥ÍÍ¥¹œ½¸Ñ¡”É¥¡Ğ¸QÉ•…ĞÑ¡¥Ì…ÁÑÕÉ”…Ì„É½Õ¹½É•¹‘•ÈÍåµÁÑ½´°)¹½Ğ…¹½Ñ¡•ÈÙ¥ÍÕ…±±ä…‰Í•¹ĞÑ½½±‰…È¸…É±¥•È™¥ÉÍĞµÉ•™É•Í U$™…¥±ÕÉ•ÌÉ•µ…¥¸Í•Á…É…Ñ”)=A8•Ù¥‘•¹”ìÑ¡¥Ì…ÁÑÕÉ”…±½¹”¹•¥Ñ¡•ÈÉ•ÑÉ…ÑÌÑ¡•´¹½ÈÁÉ½Ù•ÌÁ•Éµ…¹•¹ĞU$É•Á…¥È¸()Q½½±‰…Èİ¥‘Ñ ÌÄÜ¸ØÀäÌÜÔ…Ğ‘•‰ÕœµÍÑ…ÉÑÕÀÄÈäÙµÌ…¹Á…•Í¡½ÜÈàÄÑµÌ¥ÌÍÑ…‰±”¸…¹Ù…Ì)MLÄÌØÙààÈØ½‰…­¥¹œÈÜÌÉàÄØÔÈ½AHÈ°Í•ÍÍ¥½¹¹Õ±°½A…¥¹Ñ™…±Í”°UXİ½É­ÍÁ…”…‰Í•¹Ğ¸!¥‘‘•¸)Í•ÍÍ¥½¸¡½ÍĞ¥ÌÕ¹ÍÑå±•½Á½Á½Ù•É¹Õ±°½Ñ½Á1…å•É™…±Í”ì¹¼É•Ñ…¥¹•UX½Ù•É±…ä¥¸…ÁÑÕÉ”¸)9¼É•Á½ÉÑ••ÉÉ½È½½¹Ñ•áĞµ±½ÍÌ•Ù•¹Ğ¥¸ÍÕÁÁ±¥•‰½Õ¹‘•±½œ¸=4½¡¥ĞÁÉ½‰•Ì…¹¹½Ğ)Í¡½Ü]•‰0™±½½È½Í¡…‘½ÜÁ¥á•±Ì½È¥‘•¹Ñ¥™äÑ¡”‰É½İÍ•È½µÁ½Í¥Ñ½È…ÌÉ½½Ğ…ÕÍ”¸()I•…µ½¹±äÍ½ÕÉ”…Õ‘¥ĞèÉ•¹‘•Èµµ½‘•Ì½İ¹Ì„™¥¹¥Ñ”MÑÕ‘¥¼™±½½È€¡µ¥¹¥µÕ´ÈĞİ½É±Õ¹¥ÑÌ¤)…¹™¥¹¥Ñ”‘¥É•Ñ¥½¹…°Í¡…‘½Ü™ÉÕÍÑÕ´ìÍÑÕ‘¥¼µÍ•¹”µ™¥àÕÁ‘…Ñ•ÌÍ…µ”™±½½È½±¥¡Ğì)ÍÑÕ‘¥¼µÁ½±¥Í …‘‘Ì½¹Ñ…ĞÍ¡…‘½Ü°…Ñµ½ÍÁ¡•É”…‘‘ÌMLµÕ±Ñ¥Á±äÙ¥¹•ÑÑ”¸5Õ±Ñ¥Á±”)É•¹‘•É¥¹œ½¹ÑÉ¥‰ÕÑ½ÉÌ°¹¼•Ù¥‘•¹”å•Ğİ¡¥ ¥Ìµ¥ÍÍ¥¹œ¸¼¹½Ğ•¹±…É”™±½½È°)Í¡…‘½Ü‰½Õ¹‘Ì½È¡…¹”ML½‰±•¹‘¥¹œ™É½´Ñ¡¥ÌÉ•Á½ÉĞ…±½¹”¸I•ÅÕ•ÍĞÍÉ••¹Í¡½Ğ½˜)…ÑÕ…°µ¥ÍÍ¥¹œÉ•¥½¸…¹İ¡•Ñ¡•È¥ÑÌ‰½Õ¹‘…ÉäÍÑ…åÌ…ĞÍ…µ”MI8à‘ÕÉ¥¹œ„Íµ…±°)½É‰¥Ğ½Èµ½Ù•Ìİ¥Ñ É½Õ¹¸Q¡¥ÌÍ•Á…É…Ñ•ÌÍÉ••¸µÉ•¥½¸±½ÍÌ™É½´İ½É±µÍÁ…”™±½½È¼)Í¡…‘½Ü•áÑ•¹Ğì¹¼™ÕÉÑ¡•È‘•‰Õœ‘ÕµÀ½ÈÉ•½Ù•ÉäÉ•™É•Í É•ÅÕ¥É•™½ÈÑ¡¥Ì½µÁ…É¥Í½¸¸)9¼ÉÕ¹Ñ¥µ”½‰Õ¥±¡…¹•ÌìäàÌÉ•µ…¥¹ÌÕÉÉ•¹Ğ¸A…¥¹ĞäàÈ½™Õ¹Ñ¥½¹…°äàÌAMLÁÉ½Ñ•Ñ•¸((ŒŒ€¸äàÌÍÉ••¹Í¡½Ğ¥¹ÍÁ•Ñ¥½¸ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()%¹ÍÁ•Ñ•ÕÍ•ÈÍÉ••¹Í¡½ĞÌİÙÌÀàµØÉ´ĞÀÌä´àĞÙ´ÌäÜÈÔİÉÁ¹Á¹œ€ ÀÜèÌà¤¸)Q½ÀµÉ¥¡Ğ½¹ÑÉ½±ÌÙ¥Í¥‰±”ìÕ‰”…ÍÑÌ±•™Ñİ…ÉÍ¡…‘½Ü¸MÑÉ…¥¡ĞÙ•ÉÑ¥…°Í¡…‘¥¹œ)Í•…´¹•…ÈÉ¥¡ĞÅÕ…ÉÑ•ÈÉ½ÍÍ•Ì„™±½½ÈÑ¡…Ğ½¹Ñ¥¹Õ•Ì½¸‰½Ñ Í¥‘•Ìì‘¥ÍÑ…¹Ğ™±½½È)•‘”¥ÌÍ•Á…É…Ñ•±äÙ¥Í¥‰±”…¹Í±½Á¥¹œ¸±½½ÈÑ•Éµ¥¹…Ñ¥½¸¥ÌÑ¡•É•™½É”¹½ĞÍÕÁÁ½ÉÑ•)…ÌÑ¡”•áÁ±…¹…Ñ¥½¸™½ÈÑ¡¥ÌÍ•…´¸=É¥¥¹…°™±½½È½±¥¡Ğ½½¹Ñ…Ğ½…Ñµ½ÍÁ¡•É”½İ¹•ÉÌ)…Õ‘¥Ñ•ì¹¼É½½Ğ…ÕÍ”½ÈÁ•Éµ…¹•¹ĞÉ•¹‘•É¥¹œÉ•Á…¥È¥¹™•ÉÉ•¸9•áĞèÍµ…±°½É‰¥Ğ)İ¥Ñ¡½ÕĞÉ•™É•Í ½…ÁÀµÍİ¥Ñ °½‰Í•ÉÙ”Í•…´™¥á•½µ½Ù¥¹œ½‘¥Í…ÁÁ•…É¥¹œ¸á¥ÍÑ¥¹œ¥¹¥Ñ¥…°)ÍÉ••¹Í¡½ĞÉ•ÅÕ•ÍĞ™Õ±™¥±±•¸½Õµ•¹Ñ…Ñ¥½¸½¹±äìÉ•±•…Í”äàÌ…¹…±°ÉÕ¹Ñ¥µ”Á¥¹Ì)Õ¹¡…¹•¸9¼…ÕÑ½µ…Ñ•½ÉÕ¹Ñ¥µ”½‘•Ù¥”AML±…¥µ•™É½´ÍÉ••¹Í¡½Ğ¥¹ÍÁ•Ñ¥½¸¸((ŒŒ½µÁ±•Ñ¥½¸É•Á½ÉÑ¥¹œ¥¹ÍÑÉÕÑ¥½¸ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•ÅÕ¥É•Ì•Ù•ÉäÉ•Á±äÑ¼•¹İ¥Ñ ÕÉÉ•¹ĞÍÑ…ÑÕÌ…¹„Í¡½ÉĞ±¥ÍĞ½˜Á½ÍÍ¥‰±”)Ñ¡¥¹ÌÑ¼Ñ•ÍĞìÉ•½É‘•Á•Éµ…¹•¹Ñ±ä¥¸İ½É­™±½Ü…¹¡…¹‘½™˜¸€½¹•áÑ‰Õ¥±É•ÅÕ•ÍÑ•ì)É•¹‘•É¥¹œÍ½ÕÉ”¡…¹”ÍÑ¥±°É•ÅÕ¥É•ÌÑ¡”Á•¹‘¥¹œ½É‰¥Ğ½Í•…´½‰Í•ÉÙ…Ñ¥½¸‘•ÍÉ¥‰•)¥¸ÕÉÉ•¹Ğ¡…¹‘½™˜¸9¼ÉÕ¹Ñ¥µ”¡…¹”½È¹•Ü¹Õµ‰•É•É•±•…Í”¥¸Ñ¡¥ÌÕÁ‘…Ñ”¸((ŒŒ€¸äàĞƒŠPÍ•±•Ñ•µ™…”É½ÕÀ…ÕÑ¡½É¥¹œƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•È…¹¹½ĞÕÉÉ•¹Ñ±äÉ•ÁÉ½‘Õ”Ñ¡”É¥¡ĞµÉ•¥½¸™…Õ±Ğ…¹…ÕÑ¡½É¥é•ÌÉ•ÍÕµ¥¹œ)‘•Ù•±½Áµ•¹Ğ¸-••À¥Ğ=A8èÍ•…´İ…ÌÍÉ••¸µ™¥á•°É•ÑÕÉ¹•…™Ñ•ÈÙ¥•ÜÍİ¥Ñ¡¥¹œ°)…¹ÕÍ•ÈÉ•Á½ÉÑÌ¥éµ¼½U$‘¥Í…ÁÁ•…ÉÌ¥¸Ñ¡…ĞÉ•¥½¸İ¡¥±”Ñ½½±‰…ÈÉ•µ…¥¹ÌÙ¥Í¥‰±”¸)¼¹½Ğ±…¥´„Ù¥¹•ÑÑ”µ½¹±ä…ÕÍ”½ÈÁ•Éµ…¹•¹ĞÉ•Á…¥È¸I•¹‘•É¥¹œ¥ÌÕ¹¡…¹•¸()¥ÉÍĞ¹…ÉÉ½ÜÍÑ•ÀÑ½İ…ÉUXµ™É•”™…•É½ÕÀÁ…¥¹Ñ¥¹œèY%\€ø…•É½ÕÁÌ¹½Ü½™™•ÉÌ)„É½ÕÀ¹…µ”Á±ÕÌÍÍ¥¸Í•±•Ñ•€¼±•…ÈÍ•±•Ñ•¸M•±•Ğ™…•Ì¥¸…”µ½‘”)™¥ÉÍĞ¸á¥ÍÑ¥¹œÍ•±•Ñ¥½¸½¹…Ù¥…Ñ¥½¸½İ¹•ÉÌÉ•µ…¥¸ìÑ¡¥Ì¥Ì•áÁ±¥¥ĞÍ•±•Ñ•µ™…”)…ÕÑ¡½É¥¹œ°9=P„½¹Ñ¥¹Õ½ÕÌA•¹¥°™…•É½ÕÀ‰ÉÕÍ ¸M…µ”¹…µ•Ì©½¥¸…¸•á¥ÍÑ¥¹œ)É½ÕÀì±•…ÈÉ•ÍÑ½É•ÌÕ¹É½ÕÁ•µ•Ñ…‘…Ñ„¸9¼UXÉ•ÅÕ¥É•µ•¹Ğ½ÈÑ•áÑÕÉ”µ½‘¥™¥…Ñ¥½¸¸)=É¥¥¹…°µ…¹…•ÈÉ•Á±…•Ñ¥Ù•5•Í …¹Í•¹”…ÁÑÕÉ”½¡•­Á½¥¹ÑM¹…ÁÍ¡½Ğ½İ¸Ñ¡”)ÑÉ…¹Í…Ñ¥½¸¸I•™ÕÍ”±½­•½É•™•É•¹”½±¥¹­•½É•¥Á”½‰©•ÑÌ°…Ñ¥Ù”Ñ½½±Ì°¥¹Ù…±¥)Í•±•Ñ¥½¸½¹…µ”½Èµ¥ÍÍ¥¹œ¡¥ÍÑ½Éä‰•™½É”µÕÑ…Ñ¥½¸ì¹¼µ½ÀÉ•…Ñ•Ì¹¼¡•­Á½¥¹Ğ¸)=¹±ä™…•É½ÕÁÌ¡…¹”½¸„±½¹”ì•½µ•ÑÉä½UX½É•Í½ÕÉ•ÌÉ•Ñ…¥¸½É¥¥¹…°½İ¹•ÉÍ¡¥À¸)á¥ÍÑ¥¹œ…•É½ÕÁÌÉ•¹‘•È°Í…Ù”…¹•áÁ½ÉĞÁ…Ñ¡Ì‘¥ÍÁ±…ä½Á•ÉÍ¥ÍĞÑ¡”µ•Ñ…‘…Ñ„¸)9•Üµ½‘Õ±”±½…‘•‰ä½É¥¥¹…°É•¹‘•Èµµ½‘•Ìì¡…¹•É•¹‘•È½É•½Ù•ÉäÁ¥¹ÌäàĞ°Í¡•±°)µ…É­•ÉÌ…¹É•Ù¥•İ•…ÍÍ•Ğ¡…Í¡•Ì¸AÉ½Ñ•Ñ•5Õ±Ñ¤…¹É•¹‘•É¥¹œÍ…™•Õ…É‘ÌÕ¹Ñ½Õ¡•¸(ÄÔ™½ÕÍ•¡•­ÌAML¥¹±Õ‘¥¹œ¹•Üµ•Ñ…‘…Ñ„½¹¼µ½À½É•™ÕÍ…°½¡•­Á½¥¹ĞÑ•ÍÑÌ°)•á¥ÍÑ¥¹œ…•É½ÕÁÌ½İ¹•È°Ñ½½±‰…È…¹É•±•…Í”½¹ÑÉ…ÑÌ¸‘‘¥Ñ¥½¹…°½‘•Œ½UXÑ•ÍÑÌ)É•Á½ÉÑ•Í•Á…É…Ñ•±ä¸9¼¹…Ñ¥Ù”¥A…½È½µÁ±•Ñ”ÍÕ¥Ñ”AML±…¥µ•¸()Y%äàĞèÍ•±•ĞÑİ¼™…•Ì°Y%\€ø…•É½ÕÁÌ°¹…µ”…¹ÍÍ¥¸Í•±•Ñ•¸M•±•Ğ)½Ñ¡•È™…•Ì…¹…ÍÍ¥¸Í…µ”½‘¥™™•É•¹Ğ¹…µ”ì±•…ÈÍ•±•Ñ•¸U¹‘½I•‘¼…¹M…Ù”½=Á•¸)É•Ñ…¥¸É½ÕÁÌìUXA…¥¹Ğ…¹¹…Ù¥…Ñ¥½¸ÍÑ…äÕÍ…‰±”¸9•áĞè‘•Ù¥”…•ÁÑ…¹”°Ñ¡•¸)Á±…¸½¹Ñ¥¹Õ½ÕÌÉ½ÕÀÁ…¥¹Ñ¥¹œÑ¡É½Õ •á¥ÍÑ¥¹œÍ•±•Ñ¥½¸½•ÍÑÕÉ”½İ¹•ÉÍ¡¥À¸((ŒŒ€¸äàÔƒŠPÉ•ÕÍ”•á¥ÍÑ¥¹œ™…•É½ÕÀ¹…µ•Ìì€¸äàĞÕÍ•ÈAMLƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈAMLäàĞÁÉ½Ñ•ÑÌÍ•±•Ñ•µ™…”…ÍÍ¥¹µ•¹Ğ½±•…È°U¹‘½I•‘¼…¹M…Ù”½=Á•¸¸)9•áĞ¹…ÉÉ½Ü…ÕÑ¡½É¥¹œÍÑ•ÀÉ•ÕÍ•ÌÕÉÉ•¹Ğ¹…µ•ÌèY%\€ø…•É½ÕÁÌ¡…Ì¹…Ñ¥Ù”¹…µ”)ÍÕ•ÍÑ¥½¹ÌÉ•™É•Í¡•™É½´…ÕÑ¡½É¥Ñ…Ñ¥Ù”±¥Ù”µ•Í İ¡•¹•Ù•È¹…µ”¥¹ÁÕĞ…¥¹Ì™½ÕÌ°)…¹UÍ”Í•±•Ñ•É½ÕÀ¹…µ”½Á¥•ÌÑ¡”Õ¹¥™½É´É½ÕÀ½˜Í•±•Ñ•™…•Ì¥¹Ñ¼¥¹ÁÕĞ¸)5¥á•É½ÕÁÌ°Õ¹É½ÕÁ•½¹¼½¥¹Ù…±¥Í•±•Ñ¥½¸…¹¹½¸µ…”µ½‘”¥Ù”•áÁ±¥¥ĞÉ•…Í½¸)…¹­••ÀÕÉÉ•¹Ğ¥¹ÁÕĞ¸9…µ•Ì…É”¥¹Í•ÉÑ•Ñ¡É½Õ ½ÁÑ¥½¸¹Ù…±Õ”°¹•Ù•È!Q50¸I•…‘Ì)¡…¹”¹•¥Ñ¡•ÈÍ•±•Ñ¥½¸°µ•Í °Ñ•áÑÕÉ”¹½È¡¥ÍÑ½ÉäìÍÍ¥¸Í•±•Ñ•É•µ…¥¹ÌÍ½±”)µ•Ñ…‘…Ñ„ÑÉ…¹Í…Ñ¥½¸½İ¹•È¸ÕÁ±¥…Ñ”¹…µ•Ì‘•‘ÕÁ±¥…Ñ•ì¹¼±½‰…°É•µ•µ‰•É•±¥ÍĞ¸)=É¥¥¹…°¹…µ”±•¹Ñ ½Ù…±¥‘…Ñ¥½¸…¹•‘¥Ñ…‰±”µ½‰©•ĞÉ•™ÕÍ…°É•µ…¥¸¸9¼¹•ÜÁ½¥¹Ñ•È)±¥ÍÑ•¹•È°…ÕÑ½µ…Ñ¥Œ…ÍÍ¥¹µ•¹Ğ°¹•ÜÁ…¥¹Ñ•È½¡¥ÍÑ½Éä½İ¹•È½ÈÉ•¹‘•É¥¹œ¡…¹”¸()Õ‘¥Ğ™½Õ¹A•¹¥°Í•±•Ñ¥½¸½İ¹•ÉÍ¡¥ÀÍ¡…É•‰ä•‘”µÁ…¥¹ĞµÍ•±•Ğ…¹Á•¹¥°µ½É‰¥Ğ)…Ñ”½µ…¥¸¸½¹Ñ¥¹Õ½ÕÌ™…•É½ÕÀ‰ÉÕÍ É•µ…¥¹Ì‘•™•ÉÉ•Õ¹Ñ¥°Ñ¡…Ğ•á¥ÍÑ¥¹œ½İ¹•ÉÍ¡¥À)…¸‰”•áÑ•¹‘•½¡•É•¹Ñ±äìäàÔ¥ÌÉ½ÕÀµ¹…µ”É•ÕÍ”°9=PA•¹¥°™…•É½ÕÀÁ…¥¹Ñ¥¹œ¸)IÕ¹Ñ¥µ”¡…¹•Ì½¹±ä™…•É½ÕÀµ…ÕÑ¡½É¥¹œ½É•¹‘•Èµµ½‘•ÌU$°Ñ¡•¥È±½…‘•ÈÁ¥¹ÌäàÔ…¹)É•±•…Í”½É•½Ù•Éäµ…É­•ÉÌìÉ•Ù¥•İ•¡…Í¡•ÌÕÁ‘…Ñ•¸AÉ½Ñ•Ñ•5Õ±Ñ¤°äàĞ…ÍÍ¥¹µ•¹Ğ)ÑÉ…¹Í…Ñ¥½¸°•ÍÑÕÉ•Ì°UX½A…¥¹Ğ½É•Í½ÕÉ•Ì…¹É•¹‘•É¥¹œÍ…™•Õ…É‘ÌÕ¹¡…¹•¸(ÈĞÑ…É•Ñ•Ñ•ÍÑÌAML¼Á%0¼ÁÍ­¥ÀèÉ½ÕÀÉ•ÕÍ”½É•™ÕÍ…°½É•…µ½¹±ä½Ñ•áĞÍ…™•ÑäÁ±ÕÌ(äàĞ…ÕÑ¡½É¥¹œ°…•É½ÕÁÌ½İ¹•È°½É¥¥¹…°Ñ½½±‰…È°ÁÉ½©•Ğ½‘•Œ°UX…¹É•±•…Í”¸)Må¹Ñ…à½‘¥™˜¡•­ÌÁ…ÍÌì¹…Ñ¥Ù”¥A…ÍÕ•ÍÑ¥½¸U$…¹É½ÕÀµ¹…µ”ÕÍ”¹••É•Ù¥•Ü¸)9¼™Õ±°µÍÕ¥Ñ”½¹…Ñ¥Ù”½µÁ½Í¥Ñ½ÈÁÉ½½˜±…¥µ•¸%¹Ñ•Éµ¥ÑÑ•¹ĞÉ¥¡ĞµÉ•¥½¸™…Õ±Ğ=A8¸()Y%äàÔèÍ•±•ĞÉ½ÕÁ•™…•Ì€øY%\€ø…•É½ÕÁÌ€øUÍ”Í•±•Ñ•É½ÕÀ¹…µ”ì)Í•±•Ğ‘¥™™•É•¹Ğ™…•Ì…¹ÍÍ¥¸Í•±•Ñ•İ¥Ñ É•Ñ…¥¹•¹…µ”¸½ÕÌ¹…µ”™¥•±™½È)ÕÉÉ•¹ĞÍÕ•ÍÑ¥½¹Ì¸5¥á•½Õ¹É½ÕÁ•Í•±•Ñ¥½¸É•™ÕÍ•ÌÁ¥­ÕÀİ¥Ñ¡½ÕĞ¡…¹¥¹œ¹…µ”¸)U¹‘½I•‘¼Í¡½Õ±…™™•Ğ…ÍÍ¥¹µ•¹Ğ½¹±ä°¹½Ğ¹…µ”É•…‘ÌìM…Ù”½=Á•¸ÍÑ…åÌ…•ÁÑ•¸)9•áĞ‘•Ù¥”É•ÍÕ±Ğ°Ñ¡•¸½¹Ñ¥¹Õ½ÕÌ™…•É½ÕÀ•ÍÑÕÉ”µ½İ¹•È…Õ‘¥Ğ¸((ŒŒ€¸äàØƒŠPA•¹¥°™…•É½ÕÀÍÑÉ½­•Ìì€¸äàÔÕÍ•ÈAMLƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈAMLäàÔÁÉ½Ñ•ÑÌ¹…µ”É•ÕÍ”½ÍÕ•ÍÑ¥½¹Ì…¹äàĞ…ÍÍ¥¹µ•¹Ğ½±•…È½U¹‘½I•‘¼½M…Ù•=Á•¸¸)Y%\€ø…•É½ÕÁÌ€ø¡½½Í”¹…µ”€øA•¹¥°™…•É½ÕÀÍÑÉ½­•Ì±½Í•ÌY%\…¹…ÉµÌ)A•¹¥°µ½¹±äÍÕÉ™…”ÍÑÉ½­•Ì¥¸…”µ½‘”¸A•¹‘¥¹œÕ¹¥ÅÕ”Ù¥Í¥‰±”™…”¡¥ÑÌ…É”)½±±•Ñ•ÁÉ¥Ù…Ñ•±ä…¹½Õ¹ĞÍ¡½İ¸¥¸ÍÑ…ÑÕÌìI=U@=1=UILUAQ=8A9%01%P°)¹½Ğ‘ÕÉ¥¹œ½¹Ñ…Ğ¸1¥™Ğ½µµ¥ÑÌÑ¡É½Õ …•ÁÑ•…ÍÍ¥¹M•±•Ñ•‘…•É½ÕÀ…¹)½É¥¥¹…°µ…¹…•È½Í•¹”¡¥ÍÑ½Éä½¹”¸9¼UYÌÉ•ÅÕ¥É•¸á¥ÍÑ¥¹œÍ•±•Ñ¥½¸¥ÌÕ¹Ñ½Õ¡•¸)I•½Á•¸Y%\€øMÑ½À™…•É½ÕÀÍÑÉ½­•Ìì¡…¹¥¹œÉ½ÕÀ¹…µ”½ÈÁ¥­¥¹œ…¹½Ñ¡•È¹…µ”)ÍÑ½ÁÌ½±¹…µ•‰ÉÕÍ ìÉ•…É´Ñ¼Á…¥¹Ğ¹•ÜÉ½ÕÀ¸Mİ¥Ñ¡¥¹œÉ•¹‘•È±½½¬…±Í¼ÍÑ½ÁÌ¸()=É¥¥¹…°•‘”µÁ…¥¹ĞµÍ•±•Ğ½İ¹Ì‘½İ¸½µ½Ù”½•¹½…¹•°…¹Ù¥Í¥‰±”™¥ÉÍĞµ¡¥ĞÉ…å…ÍĞì)¹¼Á…É…±±•°É…ÜµÁ½¥¹Ñ•È‰ÉÕÍ ½İ¹•È¸á¥ÍÑ¥¹œA•¹¥°…Ñ”É•½¹¥é•Ì…Éµ•…”)‰ÉÕÍ …Ìµ½‘•±±¥¹œ¥¹Ñ•¹Ğ½¸µ•Í ì‰…­É½Õ¹A•¹¥°¹…Ù¥…Ñ¥½¸ÍÑ¥±°™½Éİ…É‘Ì¸)¥¹•È¹…Ù¥…Ñ¥½¸É•µ…¥¹Ìì„Í•½¹‘…Éä…¹Ù…Ì½¹Ñ…Ğ…¹•±ÌÁ•¹‘¥¹œÍÑÉ½­”¸)…ÁÑÕÉ”±½ÍÌ°Á½¥¹Ñ•É…¹•°°¡¥‘‘•¸½Á…•¡¥‘”°½É‰¥Ğ±…¥´…¹MÑ½À‘¥Í…ÉÁ•¹‘¥¹œ)™…•Ì…¹É•ÍÑ½É”•á…ĞÁÉ¥½È½¹ÑÉ½±Ì¹•¹…‰±•¸½…±•Í•½¹Ñ…ĞÍ…µÁ±•Ì…¹±¥™Ğ)¡¥Ğ¥¹±Õ‘•ì¹¼¥¹Ñ•ÉÁ½±…Ñ¥½¸½É…‘¥ÕÌ‰ÉÕÍ ¥¸Ñ¡¥Ì™¥ÉÍĞ‰Õ¥±¸Q¡É½Õ Í•±•Ñ¥½¸)‘•ÁÑ ‘½•Ì9=P…ÍÍ¥¸¡¥‘‘•¸½‰…¬™…•ÌèÕÍ•Ì¹•…É•ÍĞ™…”½¹±ä¸á¥ÍÑ¥¹œ1…ÍÍ¼°)…•¥É•Ğ½µ…¥¸‘¥É•ĞÑ½½±Ì…¹ÍÁ±¥Ğ½½™™Í•Ğ½İ¹•ÉÌ­••ÀÁÉ¥½É¥Ñä¸()½¹ÑÉ½±±•ÈÉ•™ÕÍ•ÌÕ¹Í…™”½‰©•ÑÌ½Ñ½½±Ì½½¹Ñ•áĞì½µÁ±•Ñ¥½¸É•¡•­Ì½‰©•Ğ°µ•Í )¥‘•¹Ñ¥Ñä°•½µ•ÑÉä½É½ÕÁÌÍ¥¹…ÑÕÉ”°±½½¬½µ½‘”…¹½É¥¥¹…°…ÕÑ¡½É¥¹œ…Ñ•Ì¸!¥ÍÑ½Éä)½È•½µ•ÑÉä¡…¹•Ì‘ÕÉ¥¹œ½¹Ñ…Ğ‘¥Í…ÉÍÑÉ½­”¸9¼Í½ÕÉ”ÁÉ•Ù¥•ÜµÕÑ…Ñ¥½¸½È)…¹•°É½±±‰…¬¹••‘•ì‘ÕÁ±¥…Ñ”½¹¼µ½À™…•Ì‘¼¹½ĞÉ•…Ñ”¡¥ÍÑ½Éä¸9•ÜÁÕÉ”ÍÑÉ½­”)½¹ÑÉ½±±•È¥µÁ½ÉÑÌ½É¥¥¹…°…ÕÑ¡½É¥¹œ¡•±Á•ÈìÉ•¹‘•È½İ¹•ÈÍÕÁÁ±¥•Ì•á¥ÍÑ¥¹œ±½‰…±Ì¸)9¼•½µ•ÑÉä½UX½Ñ•áÑÕÉ”­•É¹•°½È¹•Ü¡¥ÍÑ½Éä½İ¹•È¸AÉ½Ñ•Ñ•5Õ±Ñ¤Õ¹Ñ½Õ¡•¸((àĞÑ…É•Ñ•¡•­ÌAML¼Á%0¼ÁÍ­¥Àì•áÁ…¹‘•ÍÑÉ½­”Ñ•ÍĞ…±Í¼Á…ÍÍ•Ì…ÑÕ…°½É¥¥¹…°)Í•±•Ñ¥½¸µ‰ÉÕÍ ­A•¹¥°…Ñ”İ¥Ñ É•…°Q¡É•”™…”É…å…ÍÑÌ°±¥™Ğ°…¹•±±…Ñ¥½¸°Í•½¹‘…Éä)Ñ½Õ °±½ÍĞ…ÁÑÕÉ”°Á…•¡¥‘”°É•ÍÑ½É•½¹ÑÉ½±Ì…¹‰…­É½Õ¹¹…Ù¥…Ñ¥½¸¸½¹ÑÉ½±±•È)Ñ•ÍÑÌ½Ù•ÈÍÑ…¥¹œ°Õ¹¥ÅÕ”™…•Ì°½¹”¡•­Á½¥¹Ğ°É•™ÕÍ…°½ÍÑ…±”½¹Ñ•áĞ…¹¹¼µ½À¸)á¥ÍÑ¥¹œÍ•±•Ñ¥½¸½1…ÍÍ¼½A•¹¥°°äÔĞÁ¥­¥¹œ°äàĞ¼äàÔ…ÕÑ¡½É¥¹œ°Ñ½½±‰…È°…•É½ÕÁÌ°)ÁÉ½©•Ğ½‘•Œ°UX…¹É•±•…Í”½¹ÑÉ…ÑÌÉ•Ñ…¥¹•¸Må¹Ñ…à½‘¥™˜¡•­ÌÁ…ÍÌ¸9¼¹…Ñ¥Ù”)¥A…½™Õ±°µÍÕ¥Ñ”½ÈÉ•¹‘•É•ÁÉ½½˜±…¥µ•¸á¥ÍÑ¥¹œÉÕ¹Ñ¥µ”Ñ•ÍÑÌœÙ¥Í¥‰¥±¥Ñäµ½¬)±…­Ì‘½Õµ•¹Ğ•Ù•¹ÑÌèÙ¥Í¥‰¥±¥Ñä±•…¹ÕÀÕÍ•Ìİ¥¹‘½Ü…ÁÑÕÉ”°ÁÉ•Í•ÉÙ¥¹œ™¥áÑÕÉ”)…¹1…ÍÍ¼¡•­ÌÕ¹¡…¹•¸5•Í ±½¹”±…é¥±ä¥¹¥Ñ¥…±¥é•Ì±½½Í”µ•±•µ•¹Ğ‰½½­­••Á¥¹œì)Í½ÕÉ”¥¹Ù…É¥…¹”Ñ•ÍĞ½µÁ…É•Ì…ÑÕ…°Ù•ÉÑ¥•Ì½™…•Ì½É½ÕÁÌ°¹½Ğ…Õá¥±¥…Éä…¡•Ì¸()¡…¹•½İ¹•ÉÌè•‘”µÁ…¥¹ĞµÍ•±•Ğ°A•¹¥°…Ñ”°É•¹‘•Èµµ½‘•Ì…¹¹•ÜÍÑÉ½­”½¹ÑÉ½±±•Èì)É•Ù¥•İ•‘¥É•Ğ½¡¥±½É•½Ù•Éä­•åÌäàØ…¹¡…Í¡•Ì¸á¥ÍÑ¥¹œ…ÕÑ¡½É¥¹œ¡•±Á•ÈÍÑ…åÌäàÔ¸)%¹Ñ•Éµ¥ÑÑ•¹ĞÉ¥¡ĞµÉ•¥½¸É•¹‘•É¥¹œ½¥éµ¼™…Õ±ĞÉ•µ…¥¹Ì=A8ì¹¼É•¹‘•É¥¹œ™¥à±…¥µ•¸)Y%äàØè…”µ½‘”€øY%\…•É½ÕÁÌ€ø¹…µ”€øA•¹¥°™…•É½ÕÀÍÑÉ½­•Ìì‘É…Ü…É½ÍÌ)™…•Ì°±¥™ĞÑ¼Í•”É½ÕÀ¸5Õ±Ñ¥Á±”ÍÑÉ½­•Ì°½¹”U¹‘¼Á•ÈÍÑÉ½­”½I•‘¼¸¥¹•È½É‰¥Ğ°)MÑ½À°¡½½Í”…¹½Ñ¡•È¹…µ”½É•…É´°M…Ù•=Á•¸¸±•…ÈÍ•±•Ñ•É•µ…¥¹ÌäàĞ‰•¡…Ù¥½È¸9•áĞ)™½±±½Ü‘•Ù¥”ÍÑÉ½­”…•ÁÑ…¹”‰•™½É”…‘‘¥¹œ±¥Ù”ÁÉ•Ù¥•İÌ°‰ÉÕÍ É…‘¥ÕÌ½È•É…Í•È¸((ŒŒ€¸äàÜƒŠPA•¹¥°™…•É½ÕÀ•É…Í•Èì€¸äàØÕÍ•ÈAMLƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈAMLäàØÁÉ½Ñ•ÑÌA•¹¥°…ÍÍ¥¹µ•¹Ğµ½¸µ±¥™Ğ°½¹”µÍÑ•À¡¥ÍÑ½Éä°…¹•±±…Ñ¥½¸°)MÑ½À½¹…Ù¥…Ñ¥½¸…¹É½ÕÀÁ•ÉÍ¥ÍÑ•¹”¸‘É…Í”É½ÕÀÍÑÉ½­•Ì‰•Í¥‘”Ñ¡”½É¥¥¹…°)A•¹¥°™…•É½ÕÀÍÑÉ½­•Ì‰ÕÑÑ½¸¥¸Y%\€ø…•É½ÕÁÌ¸M…µ”½¹ÑÉ½±±•È…¹M5)•á¥ÍÑ¥¹œ•ÍÑÕÉ”½İ¹•Èì•áÁ±¥¥Ğ¹Õ±°É½ÕÀÉ•ÅÕ•ÍÑÌ…•ÁÑ•±•…Èµ•Ñ…‘…Ñ„Á…Ñ ¸)9¼Í•½¹‰ÉÕÍ °Á½¥¹Ñ•È¡…¹‘±•È½È¡¥ÍÑ½Éä¥µÁ±•µ•¹Ñ…Ñ¥½¸¸É…Í•ÈÍÑ…•ÌÍ…µÁ±•)Ù¥Í¥‰±”™…•Ì…¹±•…ÉÌ½¸±¥™ĞìÕ¹Ñ½Õ¡•É½ÕÁÌ½•½µ•ÑÉä½UX½É•Í½ÕÉ•ÌÁÉ•Í•ÉÙ•¸)±É•…‘äµÕ¹É½ÕÁ•ÍÑÉ½­•Ì…É”¹¼µ½ÁÌİ¥Ñ¡½ÕĞ¡¥ÍÑ½Éä¸9¼ÑåÁ•¹…µ”¹••‘•Ñ¼•É…Í”¸()ÍÍ¥¸½É…Í”½¹ÑÉ½±ÌÍ¡½Ü¥¹‘•Á•¹‘•¹ĞÁÉ•ÍÍ•½MÑ½À±…‰•±ÌÑ¡É½Õ ½¹”Í¡…É•)Íå¹Œ™Õ¹Ñ¥½¸¸¡½½Í¥¹œÑ¡”½Ñ¡•Èµ½‘”…¹•±ÌÁ•¹‘¥¹œÍÑÉ½­”…¹…ÉµÌ¹•Üµ½‘”ì)±¥­¥¹œ…Ñ¥Ù”µ½‘”ÍÑ½ÁÌ¸9…µ”•‘¥ÑÌ½Á¥­ÕÀ…¹Íİ¥Ñ¡¥¹œÉ•¹‘•È±½½¬ÍÑ½À‰½Ñ ¸)½¹ÑÉ½±±•ÈÉ•Á½ÉÑÌ±•…È½…ÍÍ¥¸Á•¹‘¥¹œ…¹½µÁ±•Ñ¥½¸‘¥ÍÑ¥¹Ñ±äì¹Õ±°É½ÕÀ¥Ì)Í•Á…É…Ñ”™É½´…Éµ•ÍÑ…Ñ”°Í¼MÑ½À…¹¹½Ğ…¥‘•¹Ñ…±±ä•¹…‰±”•É…Í¥¹œ¸á¥ÍÑ¥¹œ(äàØ•ÍÑÕÉ”½…Ñ”µ½‘Õ±•Ì‰åÑ”µÕ¹¡…¹•ì½¹±äÍÑÉ½­”½¹ÑÉ½±±•È½É•¹‘•ÈU$Á±ÕÌ)É•Ù¥•İ•¡¥±½É•¹‘•È½É•½Ù•ÉääàÜÁ¥¹Ì°Í¡•±°µ…É­•ÉÌ½¡…Í¡•Ì¡…¹”¸((àØÑ…É•Ñ•¡•­ÌAML¼Á%0¼ÁÍ­¥À°¥¹±Õ‘¥¹œ¹•Ü•É…Í•ÈÍÑ…¥¹œ°Õ¹Ñ½Õ¡•É½ÕÁÌ¼)•½µ•ÑÉä°½¹”¡•­Á½¥¹Ğ°¹¼µ½À°…¹•°½Íİ¥Ñ ½MÑ½ÀÑ•ÍÑÌìÉ•Ñ…¥¹•…ÑÕ…°äàØ)A•¹¥°½Í•±•Ñ¥½¸½İ¹•È¥¹Ñ•É…Ñ¥½¸°•á¥ÍÑ¥¹œ1…ÍÍ¼½A•¹¥°½Á¥­¥¹œ°äàĞ¼äàÔµ•Ñ…‘…Ñ„°)…•É½ÕÁÌ½Ñ½½±‰…È½ÁÉ½©•Ğ½UX½É•±•…Í”Ñ•ÍÑÌ¸Må¹Ñ…à½‘¥™˜¡•­ÌÁ…ÍÌ¸9¼¹…Ñ¥Ù”½™Õ±°)ÍÕ¥Ñ”ÁÉ½½˜±…¥µ•¸%¹Ñ•Éµ¥ÑÑ•¹ĞÉ•¹‘•É¥¹œ½¥éµ¼±½ÍÌÉ•µ…¥¹Ì=A8°¹½ĞÉ•Á…¥É•¸)Y%äàÜèÉ½ÕÀ™…•Ì°…É´É…Í”É½ÕÀÍÑÉ½­•Ì°‘É…Ü…¹±¥™Ğì½¹±äÍ…µÁ±•™…•Ì)‰•½µ”Õ¹É½ÕÁ•¸U¹‘½I•‘¼½¹”Á•ÈÍÑÉ½­”ì•É…Í”Õ¹É½ÕÁ•™…”…‘‘Ì¹¼U¹‘¼¸Mİ¥Ñ )‰…¬Ñ¼¹…µ•A•¹¥°ÍÑÉ½­•ÌìÍÑ½À…¹¹…Ù¥…Ñ”¸M…Ù”½=Á•¸É•Ñ…¥¹ÌÉ½ÕÁÌ¸9•áĞ)™½±±½Ü‘•Ù¥”•É…Í•È…•ÁÑ…¹”‰•™½É”±¥Ù”™••‘‰…¬½É…‘¥ÕÌİ½É¬¸((ŒŒ€¸äààƒŠP•áÁ±¥¥Ğ•á¥ÍÑ¥¹œµÉ½ÕÀÍ•±•Ñ½Èì€¸äàÜÉ•¹‘•É¥¹œÉ•ÕÉÉ•¹”ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á½ÉÑÌ•¹Ñ¥É”Y%\µ•¹ÔÑ•µÁ½É…É¥±äÙ…¹¥Í¡•€¡¹½ĞÉ•ÁÉ½‘Õ¥‰±”¹½Ü¤°™½±±½İ¥¹œ(äàÜ±½İ•ÈµÉ¥¡Ğ‰±…¹¬…É•„½É•Á½ÉĞ…¹ÍÉ••¹Í¡½Ğ¸9¼äàÜAML¥¹™•ÉÉ•¸AÉ½Ñ•ĞäàØ)ÍÑÉ½­•Ì…¹äàÔ¼äàĞ…•ÁÑ•İ½É­™±½İÌìÉ•¹‘•É¥¹œ¥ÍÍÕ”=A8¸Ù¥‘•¹”ÍÕµµ…É¥é•)¥¸‘½Ì½Õ¤µÉ¥¡ĞµÉ•¥½¸´äàÜ¹µ°¥¹±Õ‘¥¹œ±¥µ¥ÑÌ½˜¡•…±Ñ¡ä=4½¡¥ÑÌ…¹¡¥‘‘•¸)¥éµ¼¥¸Ñ¡¥ÌÍÁ•¥™¥Œ…ÁÑÕÉ”¸¼¹½Ğ±…¥´MÑÕ‘¥¼µ½¹±ä…ÕÍ”½ÈU$É•Á…¥È¸()%¹‘•Á•¹‘•¹Ğ…Ñ¥½¹…‰±”ÕÍ•È™…¥±ÕÉ”èÉ½ÕÀ±¥ÍĞ=L9=P=A8¸Õ‘¥Ğ½É¥¥¹…°(äàÔ¹…µ”¥¹ÁÕĞ­‘…Ñ…±¥ÍĞè¹…µ”ÍÕ•ÍÑ¥½¹Ì…É”¹½Ğ…¸•áÁ±¥¥Ğ‘É½Á‘½İ¸¸I•Á±…”)İ¥Ñ Í•Á…É…Ñ”¹…Ñ¥Ù”á¥ÍÑ¥¹œÉ½ÕÀÍ•±•Ğ€¡Í…µ”¹…µ•Ì™É½´…ÕÑ¡½É¥Ñ…Ñ¥Ù”±¥Ù”)µ•Í ¤…¹­••À½É¥¥¹…°•‘¥Ñ…‰±”É½ÕÀ¥¹ÁÕĞ™½È¹•Ü¹…µ•Ì¸9¼ÕÍÑ½´Á½ÁÕÀ½È¹•Ü)Á½¥¹Ñ•È½İ¹•È¸9…Ñ¥Ù”Í•±•Ğ½ÁÑ¥½¹Ì¡…Ù”Í…™”Ù…±Õ”½Ñ•áÑ½¹Ñ•¹Ğ°Õ¹¥ÅÕ”Í½ÉÑ•)¹…µ•Ì…¹•µÁÑäµÍÑ…Ñ”ÁÉ½µÁĞ¸I•™É•Í ½¸Y%\Ñ½±”°…•É½ÕÁÌU$Íå¹Œ…¹…™Ñ•È)…ÍÍ¥¹µ•¹Ğ½±•…È°É•Ñ…¥¹¥¹œÕÉÉ•¹Ğ¹…µ”İ¡•¸¥Ğ•á¥ÍÑÌ¸¡½¥”½Á¥•Ì¹…µ”¥¹Ñ¼)½É¥¥¹…°¥¹ÁÕĞ…¹‘¥ÍÁ…Ñ¡•Ì¥ÑÌ…•ÁÑ•¥¹ÁÕĞ•Ù•¹Ğ°ÍÑ½ÁÁ¥¹œÁÉ•Ù¥½ÕÌ…Éµ•)ÍÑÉ½­•Ì½•É…Í•Èì¹¼µ•Í ½Í•±•Ñ¥½¸½¡¥ÍÑ½Éä¡…¹”Õ¹Ñ¥°…ÑÕ…°…ÍÍ¥¹µ•¹Ğ½ÍÑÉ½­”¸)Q¡¥Ì¥Ì„É½ÕÀµÍ•±•Ñ½È™¥à°¹½Ğ„Ù¥•İÁ½ÉĞ½½µÁ½Í¥Ñ½ÈÉ•Á…¥È¸()¡…¹•™Õ¹Ñ¥½¹…±¥Ñä=91dÉ•¹‘•Èµµ½‘•ÌU$ìÉ•Ù¥•İ•É•¹‘•È½É•½Ù•ÉääààÁ¥¹Ì…¹)É•±•…Í”µ…É­•ÉÌ½¡…Í¡•Ì¸•ÍÑÕÉ”½…Ñ”½ÍÑÉ½­”½…ÕÑ¡½É¥¹œ½UX½•½µ•ÑÉä½5Õ±Ñ¤½İ¹•ÉÌ)Õ¹¡…¹•¸ààÑ…É•Ñ•¡•­ÌAML¼Á%0¼ÁÍ­¥Àè¹•Ü…ÑÕ…°Á¥­•ÈÁ½ÁÕ±…Ñ¥½¸½¡…¹”)…±±‰…­Ì°™É•Í ½•µÁÑä½Õ¹Í…™”µÑ•áĞ…Í•Ì°Á±ÕÌÉ•Ñ…¥¹•µ•Ñ…‘…Ñ„½ÍÑÉ½­”½•É…Í•È°)A•¹¥°½1…ÍÍ¼½Á¥­¥¹œ±Ñ½½±‰…È±ÁÉ½©•Ğ±UX…¹É•±•…Í”Ñ•ÍÑÌ¸Må¹Ñ…à½‘¥™˜¡•­ÌÁ…ÍÌ¸)9…Ñ¥Ù”¥A…Í•±•Ğ½Á•¹¥¹œ¹••‘Ì¡…¹‘Ìµ½¸É•Ù¥•Üì¹¼™Õ±°µÍÕ¥Ñ”½É•¹‘•É•ÁÉ½½˜±…¥µ•¸)Y%äààè…”µ½‘”€øY%\…•É½ÕÁÌ€øá¥ÍÑ¥¹œÉ½ÕÀ½Á•¹ÌÉ•…°¹…Ñ¥Ù”±¥ÍĞì)¡½½Í”É½ÕÀ°Í•±•Ğµ½É”™…•Ì…¹ÍÍ¥¸Í•±•Ñ•¸QåÁ”…¹½Ñ¡•È¹…µ”Ñ¼É•…Ñ”)É½ÕÀ°É•½Á•¸Y%\…¹½¹™¥É´±¥ÍÑ•ìU¹‘½I•‘¼¡…¹•Ì…ÍÍ¥¹µ•¹ÑÌ½¹±ä¸I•Ñ•ÍĞ)•É…Í”…¹M…Ù”½=Á•¸¥˜½¹Ù•¹¥•¹Ğ¸%˜Y%\‰±…¹­Ì……¥¸°¹½Ñ”ÍÉ½±°‰•¡…Ù¥½È…¹)İ¡•Ñ¡•È•áÁ±¥¥Ğ¥±”I•™É•Í ‘¥ÍÁ±…äÉ•ÍÑ½É•Ìì¹¼É•Á•…Ñ•‘•‰Õœ‘ÕµÀÉ•ÅÕ¥É•¸)9•áĞ¹…Ñ¥Ù”Í•±•Ñ½È½•É…Í•È™••‘‰…¬ì‰É½…‘•ÈÉ•¹‘•É¥¹œ‘¥…¹½Í¥ÌÉ•µ…¥¹ÌÍ•Á…É…Ñ”¸((ŒŒ€¸äàäƒŠPY%\½Á•¸½Á…¹•°½ÍÉ½±°•Ù¥‘•¹”ì€¸äààÕÍ•ÈAMLƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈAMLäààÁÉ½Ñ•ÑÌÉ•…°á¥ÍÑ¥¹œÉ½ÕÀ‘É½Á‘½İ¸°…ÍÍ¥¹µ•¹ĞÉ•ÕÍ”…¹•á¥ÍÑ¥¹œ)¹…µ”½ÍÑÉ½­”½•É…Í•Èİ½É­™±½İÌì™Õ¹Ñ¥½¹…°…•ÁÑ…¹”‘½•Ì¹½Ğ±½Í”É•ÕÉÉ¥¹œY%\)É•¹‘•É¥¹œ¥ÍÍÕ”¸1…Ñ•ÍĞäàà‘ÕµÀÀÀèĞÄèĞÉhÁÉ½Ù•ÌA•¹¥°‘½İ¸½ÕÀ½±¥¬É•…¡•ÌY%\)ÍÕµµ…Éäİ¥Ñ¡½ÕĞÁÉ•Ù•¹Ñ•™…Õ±Ğ°İ¥Ñ Í…µ”¡•…±Ñ¡äÄÌØÙàààØ½AHÈ±…å½ÕĞ…¹¹¼UX)Ñ½À±…å•È¸%Ğ½µ¥ÑÌ¹…Ñ¥Ù”‘•Ñ…¥±Ì¹½Á•¸°Á…¹•°É•Ğ½ÍÉ½±°…¹µ½‘”°Í¼…¹¹½ĞÑ•±°)±½Í•µ•¹Ô™É½´…¸½Á•¸‰ÕĞÕ¹Á…¥¹Ñ•Á…¹•°¸¼¹½ĞÉ•ÅÕ•ÍĞ…¹½Ñ¡•È¥‘•¹Ñ¥…°‘ÕµÀ)½È±…¥´•¹¥¹”…ÕÍ”ìÍ…µ”•á¥ÍÑ¥¹œ½ÁĞµ¥¸‘•‰Õœ½İ¹•È…¥¹Ìµ¥ÍÍ¥¹œ•Ù¥‘•¹”¸()M¹…ÁÍ¡½Ğ¹½Ü¥¹±Õ‘•ÌÙ¥•İ5•¹Ôè¹…Ñ¥Ù”½Á•¸ÍÑ…Ñ”€¡¹Õ±°¥˜µ¥ÍÍ¥¹œ¤°…ÑÕ…°…Ñ¥Ù”)É•¹‘•È‰ÕÑÑ½¸°Í•±•Ñ¥½¸µ½‘”°™…•É½ÕÀÍÑÉ½­”…Éµ•½½¹Ñ…Ğ½…ÍÍ¥¸µ½Èµ•É…Í”°)É½ÕÀµÁ¥­•È½ÁÑ¥½¸½Õ¹Ğ½¥¹‘•à½‘¥Í…‰±•€¡¹½ĞÉ½ÕÀ¹…µ•Ì¤°Y%\Á…¹•°…¹Í•±•Ñ•)™…•É½ÕÀµ½¹ÑÉ½°‰½Õ¹‘Ì½Ù¥Í¥‰¥±¥Ñä½½Ù•É™±½Ü½ÍÉ½±±Q½À½ÍÉ½±±!•¥¡Ğ½±¥•¹Ñ!•¥¡Ğ°)Á±ÕÌMÑÕ‘¥¼½Ù•É±…äÍÑå±”¥¹±Õ‘¥¹œµ¥á	±•¹‘5½‘”¸á¥ÍÑ¥¹œ½¹ÑÉ½°½=4•Ù¥‘•¹”)É•Ñ…¥¹•¸9…Ñ¥Ù”Ñ½±”…ÁÑÕÉ•Ì™¥¹…°½Á•¸ÍÑ…Ñ”ìÁ…¹•°ÍÉ½±°…ÁÑÕÉ•Ì¥ÑÌÕÉÉ•¹Ğ)Á½Í¥Ñ¥½¸¸	½Ñ Á…ÍÍ¥Ù”İ¥¹‘½Üµ…ÁÑÕÉ”½‰Í•ÉÙ•ÉÌµ•…ÍÕÉ”=91dİ¡•¸‘•‰Õœ•¹…‰±•°)…ÁÁ•¹Ñ¼•á¥ÍÑ¥¹œ‰½Õ¹‘•ÄÀÀµ•Ù•¹Ğ‰Õ™™•È°¹•Ù•È½¹ÍÕµ”¥¹ÁÕĞ°™½ÕÌ½½Á•¸½ÍÉ½±°)µ•¹ÕÌ½È¥¹Ù½­”É•™É•Í ¸9¼Á½±±¥¹œ°¹•ÜÁ½ÁÕÀ½È…ÕÑ½µ…Ñ¥ŒÉ•Á…¥¹Ğ¸()¡…¹•ÉÕ¹Ñ¥µ”=91d•ÍÑÕÉ”µ‘•‰Õœì½É¥¥¹…°Í½ÕÉ”‘•‰Õœ½É•½Ù•Éääàä­•åÌ…¹)É•±•…Í”µ…É­•ÉÌ½É•Ù¥•İ•¡…Í ¸±°É•¹‘•É¥¹œ½ML½Y%\½¹…Ñ¥Ù”Í•±•Ñ½È½‰ÉÕÍ ½¡¥ÍÑ½Éä¼)µ½‘•±±¥¹œ½5Õ±Ñ¤¥µÁ±•µ•¹Ñ…Ñ¥½¹ÌÕ¹¡…¹•¸Q¡¥Ì¥Ì%9=MQ%°¹½Ğ„É•¹‘•É¥¹œ™¥à¸(Èä™½ÕÍ•¡•­ÌAML¼Á%0¼ÁÍ­¥Àè¹•Ü…ÑÕ…°İ¡½±”µ‘•‰ÕœÉ•Á½ÉĞ½½‰Í•ÉÙ•ÈÑ•ÍÑÌ(¡½Á•¸½±½Í•½µ¥ÍÍ¥¹œ°•½µ•ÑÉä½ÍÉ½±°°µ½‘•Ì½Á¥­•È°É•…µ½¹±ä½‘•‰Õœµ½™˜É•™ÕÍ…°¤°)½É¥¥¹…°ÁÉ½‰”½É•½Ù•Éä½‘•‰Õœ½É•±•…Í”…¹äàÓŠLäàà…ÕÑ¡½É¥¹œ½ÍÑÉ½­”½Í•±•Ñ½ÈÑ•ÍÑÌ¸)Må¹Ñ…à½‘¥™˜¡•­ÌÁ…ÍÌì¹¼¹…Ñ¥Ù”½™Õ±°µÍÕ¥Ñ”½ÈÁ•Éµ…¹•¹ĞÉ•Á…¥ÈÁÉ½½˜±…¥µ•¸()Y%äàäè¹½Éµ…°Y%\…¹á¥ÍÑ¥¹œÉ½ÕÀÉ•µ…¥¸…•ÁÑ•¸%˜µ•¹Ô‘¥Í…ÁÁ•…ÉÌ½È)‰±…¹­Ì°¥±”€øU$•‰Õœ€øÑÉäY%\½¹”€ø…ÁÑÕÉ”½½Áä‰•™½É”I•™É•Í ‘¥ÍÁ±…ä½È)…ÁÀµÍİ¥Ñ ¸9•ÜÙ¥•İ5•¹Ô¹½Á•¸…¹Á…¹•°¹½‘•Ì¹½ÜÍ•Á…É…Ñ”¹…Ñ¥Ù”ÍÑ…Ñ”™É½´Á…¥¹Ğ¸)QÉäÍÉ½±°¥¹Í¥‘”Á…¹•°¥˜Á½ÍÍ¥‰±”°…ÁÑÕÉ”……¥¸½¹±ä¥˜¡…¹•¸%˜™…Õ±Ğ‘½•Ì)¹½ĞÉ•ÕÈ°¹¼™½É•É•ÁÉ½‘ÕÑ¥½¸É•ÅÕ¥É•¸9•áĞ¹…Ñ¥Ù”•Ù¥‘•¹”ì™•…ÑÕÉ”ÑÉ…©•Ñ½Éä)…¸É•ÍÕµ”…™Ñ•È™••‘‰…¬İ¡¥±”É•Ñ…¥¹¥¹œÑ¡¥Ì½Á•¸É•¹‘•É¥¹œ…Ñ”¸((ŒŒ€¸ääÀƒŠP•áÁ±¥¥Ğ±½Í•Y%\ÍÕÉ™…”É•µ½Ù…°ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•È€½¹•áÑ‰Õ¥±…™Ñ•ÈÑİ¼äàä…ÁÑÕÉ•Ì¸ĞÀÀèÔàèÌÕh…¹Ù…ÍAÉ½‰•¡¥‘‘•¹QIU…¹Ñİ¼)ÍÕ‰©•Ñ¥Ù”É¥¡ÑU$éµ¥ÍÍ¥¹œ½‰Í•ÉÙ…Ñ¥½¹Ìì…ĞÀÀèÔàèÔÁh…¹Ù…ÌÉ•ÍÑ½É•½¡¥‘‘•¹1M¸)	½Ñ MÑÕ‘¥¼½…”°¹¼‰ÉÕÍ ½Í•ÍÍ¥½¸½UXİ½É­ÍÁ…”°¹…Ñ¥Ù”Y%\½Á•¹1M°å•Ğ™¥á•)Á…¹•°É•ĞäàÈ¼ÄÄĞ¸Ô¼ÌØÀ¼ÜÔØ°ÍÉ½±±!•¥¡Ğ½±¥•¹Ñ!•¥¡ĞÜÔĞ¸9¼Y%\‘½İ¸½Ñ½±”¥¸)É•½É‘•¥¹Ñ•ÉÙ…°èÑ¡•Í”‘¼¹½Ğ‘¥…¹½Í”…¸…ÑÑ•µÁÑ•½Á•¸Á…¹•°¸!¥‘¥¹œÍ¹¼±½¹•È)É•ÍÑ½É•U$¥¸Ñ¡¥ÌÉ•ÕÉÉ•¹”ì‘¼¹½ĞÉ•Á•…Ğ½±…¹Ù…Ìµ½¹±äÉ•½Ù•ÉäÕ…É…¹Ñ•”¸)½µÁÕÑ•±…å½ÕĞ½¡•…±Ñ¡ä¡¥ÑÌ…É”¹½ĞÁÉ½½˜½˜‘É…İ¸Á¥á•±Ì½È•¹¥¹”É½½Ğ…ÕÍ”¸()Õ‘¥Ğ½É¥¥¹…°Ù¥•Üµµ½‘•Ìè™¥á•½Ù•É™±½İ¥¹œÁ…¹•°É•±¥•Ì•¹Ñ¥É•±ä½¸¹…Ñ¥Ù”)±½Í•µ‘•Ñ…¥±Ì½¹Ñ•¹ĞÍÕÁÁÉ•ÍÍ¥½¸ì¹¼•áÁ±¥¥Ğ±½Í•‘¥ÍÁ±…äÉÕ±”¸‘Í½Á•(Ù¥•İ5½‘•Ìé¹½Ğ¡m½Á•¹t¤€ø€¹Ù¥•İÁ½ÉĞµµ•¹ÔµÁ…¹•°í‘¥ÍÁ±…äé¹½¹”…¥µÁ½ÉÑ…¹Ñô¥¸½É¥¥¹…°)•…É±äÑ½½±‰…ÈÍÑå±•Í¡••Ğ9½É¥¥¹…°Ù¥•Üµµ½‘•ÌÍÑå±”™…±±‰…¬¸Q¡ÕÌ±½Í•Y%\)¡…Ìé•É¼Á…¹•°±…å½ÕĞ½ÍÉ½±±¥¹œÍÕÉ™…”‰•™½É”¡å‘É…Ñ¥½¸…¹…™Ñ•È…±°¹…Ñ¥Ù”½È)ÁÉ½É…µµ…Ñ¥Œ±½Í•Ì¸=Á•¹¥¹œÉ•µ½Ù•Ì=91dÑ¡¥Ì±½Í•µÍÑ…Ñ”ÉÕ±”…¹ÕÍ•Ì½É¥¥¹…°)™¥á•Á…¹•°½ÍÉ½±°½Í•ÑÑ¥¹Ì¸9…Ñ¥Ù”‘•Ñ…¥±Ì¹½Á•¸É•µ…¥¹ÌÍ½±”ÍÑ…Ñ”½İ¹•Èì½É¥¥¹…°)¹½‘•Ì½±¥ÍÑ•¹•ÉÌ½½¹ÑÉ½°¥‘•¹Ñ¥ÑäÁÉ•Í•ÉÙ•¸9¼)LÑ½±”°É•Á…É•¹Ğ°•áÑÉ„µ•¹Ô°Ñ¥µ•È°)É•™É•Í ½‰±¥¹¬°É•¹‘•É•È½MLµ‰±•¹¡…¹”½ÈÉ…ÜµÁ½¥¹Ñ•È½İ¹•È¸()Q¡¥Ì¥Ì„¹…ÉÉ½Ü±½Í•µÍÕÉ™…”±¥™•å±”¡…É‘•¹¥¹œ°9=PÁÉ½½˜Ñ¡”¹½¹é•É¼±½Í•)‰½à…ÕÍ••Ù•ÉäÉ¥¡ĞµÉ•¥½¸™…Õ±Ğ°½È„Õ…É…¹Ñ••Á•Éµ…¹•¹Ğ½µÁ½Í¥Ñ½ÈÉ•Á…¥È¸)=Á•¸µÁ…¹•°±¥ÁÁ¥¹œ½İ¡½±”Ù¥•İÁ½ÉĞÉ•¹‘•É¥¹œ…Ñ”É•µ…¥¹Ì=A8Õ¹Ñ¥°¹…Ñ¥Ù”™••‘‰…¬¸(äàä‘¥…¹½ÍÑ¥ÌÉ•Ñ…¥¹•¸=¹±ä•…É±äÑ½½±‰…ÈML…¹½É¥¥¹…°Y%\ÍÑå±”™Õ¹Ñ¥½¸)¡…¹”ìÉ•Ù¥•İ•Í¡•±°½Y%\½ML½É•½Ù•ÉäääÀÁ¥¹Ì½¡…Í¡•Ì¸±°•½µ•ÑÉä½‰ÉÕÍ ½UX½5Õ±Ñ¤)¥µÁ±•µ•¹Ñ…Ñ¥½¹ÌÕ¹¡…¹•¸9¼äàäAML¥¹™•ÉÉ•™É½´‘•‰ÕœÉ•Á½ÉÑÌ¸äàà…•ÁÑ…¹”)É•Ñ…¥¹•¸ÌÈ™½ÕÍ•AML¼Á%0¼ÁÍ­¥Àè½É¥¥¹…°ÍÑ…ÉÑÕÀÑ½½±‰…È½¡å‘É…Ñ¥½¸½…Ñ¥½¸)¥‘•¹Ñ¥Ñä°É•±•…Í”°É•Á½ÉĞ½ÁÉ½‰”½É•½Ù•Éä…¹äàÓŠLäàà…ÕÑ¡½ÉÍ¡¥À½ÍÑÉ½­”½Í•±•Ñ½È¸)Må¹Ñ…à½‘¥™˜Á…ÍÌì¹¼¹…Ñ¥Ù”½É•¹‘•É•½™Õ±°µÍÕ¥Ñ”ÁÉ½½˜±…¥µ•¸)Y%ääÀè™É•Í É•±½…°Y%\½Á•¸½±½Í”Í•Ù•É…°Ñ¥µ•ÌìÍÉ½±°…¹É½ÕÀÁ¥­•È¸)±½Í•Y%\‘•‰ÕœÁ…¹•°É•ĞÍ¡½Õ±‰”é•É¼½‘¥ÍÁ±…å¹½¹”ì½Á•¸µÕÍĞÍ¡½Ü½É¥¥¹…°)Í•ÑÑ¥¹Ì¸]…Ñ É¥¡ĞÑ½½±‰…È½™½½Ñ•È½¥éµ¼¥˜Ù¥Í¥‰±”°İ¥Ñ¡½ÕĞ™½É•É•ÁÉ½‘ÕÑ¥½¸¸)%˜É•ÕÉÉ•¹”°•á¥ÍÑ¥¹œäàäÉ•Á½ÉĞÁ±ÕÌÙ¥Í¥‰±”ÍåµÁÑ½´ì¹¼É•Á•…Ñ•¡¥‘”½Í¡½Ü¹••‘•¸)9•áĞ…ÑÕ…°ääÀ¹…Ñ¥Ù”™••‘‰…¬‰•™½É”ÍÁ•Õ±…Ñ¥Ù”±…å•È¡…¹•Ì¸((ŒŒ€¸ääÄƒŠP½µÁ…Ğ±•™Ğ™…•É½ÕÀÁ…¥¹Ğ‘½¬ì€¸ääÀÕÍ•ÈAMLƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈAMLääÀÁÉ½Ñ•ÑÌ•áÁ±¥¥Ğ±½Í•Y%\ÍÕÉ™…”…¹½É¥¥¹…°½Á•¸½ÍÉ½±°½Á¥­•È)‰•¡…Ù¥½Èì½¹Ñ¥¹Õ”İ…Ñ¡¥¹œ¥¹Ñ•Éµ¥ÑÑ•¹ĞÉ•¹‘•É¥¹œÉ…Ñ¡•ÈÑ¡…¸±…¥µ¥¹œ•¹¥¹”É½½Ğ)…ÕÍ”¸UÍ•È…Í­Ì‰•ÑÑ•È™…•É½ÕÀÁ…¥¹Ñ¥¹œU$½U`¸Õ‘¥Ğ…•ÁÑ•…ÕÑ¡½É¥¹œ½ÍÑÉ½­”¼)Y%\½Í•ÍÍ¥½¸½Á½Í¥Ñ¥½¸½İ¹•ÉÌ½¸‰…Í•±¥¹”ääÀ¸á¥ÍÑ¥¹œ½¹ÑÉ½±Ì±¥Ù•¥¹Í¥‘”Y%\)…¹ÍÑ½ÁÁ•‰ÉÕÍ İ¡•¹•Ù•ÈÉ•Ù¥Í¥Ñ•°É•ÅÕ¥É¥¹œÉ•Á•…Ñ•µ•¹Ôå±¥¹œ¸()Y%\€ø…•É½ÕÁÌ¹½Ü½™™•ÉÌ=Á•¸™…•É½ÕÀÁ…¥¹Ğ½¹ÑÉ½±Ì¸=Á•¹Ì½µÁ…ĞÈäÁÁà)±•™Ğ‘½¬áÁà™É½´Ù¥•İÁ½ÉĞÑ½À½±•™ĞÕÍ¥¹œ=I%%90½µÁ…ĞÁ…¹•°Á½Í¥Ñ¥½¸¡•±Á•Èì)Á…¥¹ÑÌ‘•™…Õ±ĞÕÉÉ•¹ĞÉ½ÕÀ…¹¥¹Ù½­•Ì=I%%90…”µ½‘”‰ÕÑÑ½¸¥˜¹••‘•¸)á¥ÍÑ¥¹œ¹…µ”¥¹ÁÕĞ½¹…Ñ¥Ù”á¥ÍÑ¥¹œÉ½ÕÀÁ¥­•È°A…¥¹Ğ½É…Í”…¹Í•±•Ñ•µ™…”)½µµ…¹‘Ì…É”M5=4¹½‘•ÌÉ•Á…É•¹Ñ•™É½´¡¥‘‘•¸¡½µ”¥¸Y%\°¹½Ğ±½¹•½ÁÉ½á¥•¸)A…±•ÑÑ”½½±½ÕÈ…ÁÁ•…É…¹”ÍÑ…åÌ¥¸Y%\¸9…µ”…¹á¥ÍÑ¥¹œÉ½ÕÀÍ¥Ğ…‰½Ù”Ñİ¼)±•…ÈÁÉ•ÍÍ•A…¥¹Ğ½É…Í”µ½‘”‰ÕÑÑ½¹Ìì…‘Ù…¹•ÍÍ¥¸½±•…È½UÍ”Í•±•Ñ•½µµ…¹‘Ì)½±±…ÁÍ”Õ¹‘•ÈM•±•Ñ•™…•Ì¸½¹”¥Ì…±İ…åÌ…Ğ‘½¬¡•…‘•ÈìÍÑ½ÁÌ‰ÉÕÍ …¹Á…É­Ì)½É¥¥¹…°½¹ÑÉ½±Ì‰…¬¥¸¡¥‘‘•¸¡½µ”°‘½¬‘¥ÍÁ±…å¹½¹”¸…•É½ÕÁÌ±½½¬É•µ…¥¹Ì)Í¼ÕÍ•È…¸¥¹ÍÁ•ĞÁ…¥¹Ñ•É½ÕÁÌ¸9¼¹••Ñ¼É•½Á•¸Y%\‰•Ñİ••¸ÍÑÉ½­•Ì½Ñ½½±Ì¸()A…¥¹Ğ½É…Í”¹½ÜÁ•ÉÍ¥ÍÑ•¹ĞÉ…‘¥¼µÍÑå±”¡½¥•Ìì½¹”•á¥ÑÌ¸á¥ÍÑ¥¹œÉ½ÕÀ¡½¥”)½È½µÁ±•Ñ•¹…µ”•‘¥Ğ…ÉµÌ¡½Í•¸¹…µ•Á…¥¹Ğİ¡¥±”‘½¬½Á•¸ìÑåÁ¥¹œÁ…ÕÍ•Ì½±)‰ÉÕÍ Õ¹Ñ¥°¡…¹”½½µµ¥Ğ¸UÍ”Í•±•Ñ•É½ÕÀ¹…µ”…±Í¼É•…ÉµÌ¹…µ•A…¥¹Ğ¥¸‘½¬¸)A¥­•ÈÉ•™É•Í¡•Ì½¸™½ÕÌ…¹•á¥ÍÑ¥¹œY%\½…ÍÍ¥¹µ•¹ĞÉ½ÕÑ•Ì¸=É¥¥¹…°ÍÑÉ½­”µ½¸´)±¥™Ğ°Õ¹¥ÅÕ”µ™…”ÍÑ…¥¹œ°½¹”µÍÑ•À¡¥ÍÑ½Éä½…¹•°½É•Í½ÕÉ”½İ¹•ÉÌÕ¹¡…¹•¸9¼)¹•ÜÉ…ÜµÁ½¥¹Ñ•È½Á…¥¹Ğ½¡¥ÍÑ½Éä½İ¹•È½ÈUXÉ•ÅÕ¥É•µ•¹Ğ¸M¡…É•Á±…•µ•¹Ğ¡•±Á•ÈÕÍ•)½µÁ…Ğİ¥Ñ •áÁ±¥¥ĞA…¥¹Ğµ±•™Ğ•á•ÁÑ¥½¸ì¹¼¹•Ü™¥±Ñ•È½½¹Ñ…¥¸½±…å•È½É•Á…¥¹Ğ¡¥¹Ğ¸)½¬±½Í•Ì½¸É•¹‘•Èµ±½½¬¡…¹”°¹½¸µ…”µ½‘”±¥¬€¡É•…µ½¹±ä…ÁÑÕÉ”¤°½ÈÍÑ…ÉĞ)½˜…¹½Ñ¡•È½É¥¥¹…°Ñ½½°Í•ÍÍ¥½¸¸=Á•¹¥¹œÉ•™ÕÍ•Ì„ÕÉÉ•¹ĞÍ•ÍÍ¥½¸É…Ñ¡•ÈÑ¡…¸)…‰…¹‘½¹¥¹œ¥ÑÌÁÉ•Ù¥•Ü¸M•¹”½Í•±•Ñ¥½¸½¡¥ÍÑ½ÉäÕ¹…™™•Ñ•‰ä‘½¬±½Í”¸()IÕ¹Ñ¥µ”¡…¹•Ì½¹±ä½É¥¥¹…°É•¹‘•ÈU$…¹Íµ…±°É•Á…É•¹Ñ¥¹œ‘½¬¡•±Á•Èì½É¥¥¹…°)ÍÑÉ½­”½…Ñ”½•½µ•ÑÉä½UX½µ…¥¸½5Õ±Ñ¤¼ääÀY%\¥µÁ±•µ•¹Ñ…Ñ¥½¹Ì‰åÑ”µÕ¹¡…¹•¸I•Ù¥•İ•)É•¹‘•È½¹•Üµ¡¥±½É•½Ù•ÉäääÄÁ¥¹Ì…¹¡…Í¡•Ì¸A¥­•ÈÑ•ÍĞ¹½ÜÅÕ•É¥•Ì‘½Õµ•¹Ğ%Ì)™½È½É¥¥¹…°½¹ÑÉ½±Ì…™Ñ•ÈÉ•±½…Ñ¥½¸°ÁÉ•Í•ÉÙ¥¹œ¥ÑÌ¡½¥”½¥¹ÁÕĞ…ÍÍ•ÉÑ¥½¹Ì¸(äÄÑ…É•Ñ•AML¼Á%0¼ÁÍ­¥Àè¹•Ü…ÑÕ…°‘½¬±¥™•å±”½Ù…±Õ”½±¥ÍÑ•¹•È¥‘•¹Ñ¥Ñä½Ù•È(ÄÈÉ•½Á•¸å±•Ì°½¹”½Õ¹…Ù…¥±…‰±”Á…É•¹Ğ°…ÑÕ…°½µµ…¹É½ÕÑ¥¹œ½Á•ÉÍ¥ÍÑ•¹Ğµ½‘•Ì¼)…Ñ¥Ù”µÑ½½°É•™ÕÍ…°ìÉ•Ñ…¥¹•Á¥­•È½ÍÑÉ½­”½•É…Í•È½µ•Ñ…‘…Ñ„°¹…Ñ¥Ù”Í•±•Ñ¥½¸½A•¹¥°¼)1…ÍÍ¼½Á¥­¥¹œ±Ñ½½±‰…È½ÁÉ½©•Ğ½UX½É•±•…Í”¸Må¹Ñ…à½‘¥™˜¡•­ÌÁ…ÍÌ¸9¼¹…Ñ¥Ù”½É•¹‘•É•¼)™Õ±°µÍÕ¥Ñ”ÁÉ½½˜±…¥µ•¸9…Ñ¥Ù”‘½¬ÍÁ…¥¹œ…¹ÑåÁ¥¹œ½‘É½Á‘½İ¸ÕÍ…‰¥±¥ÑäÁ•¹‘¥¹œ¸()Y%ääÄèY%\…•É½ÕÁÌ€ø=Á•¸™…•É½ÕÀÁ…¥¹Ğ½¹ÑÉ½±ÌìÙ•É¥™ä±•™Ğ‘½¬…¹)…ÕÑ½µ…Ñ¥Œ…”µ½‘”°±½Í”Y%\¸M•±•ĞÉ½ÕÀ½ÈÑåÁ”„¹…µ”°A•¹¥°ÍÑÉ½­”½±¥™Ğì)A…¥¹Ğ½É…Í”İ¥Ñ¡½ÕĞÉ•½Á•¹¥¹œY%\¸M•±•Ñ•™…•Ì…‘Ù…¹•½µµ…¹‘ÌìU¹‘½I•‘¼¸)½¹”¡¥‘•Ì‘½¬½ÍÑ½ÁÌ‰ÉÕÍ °™¥¹•ÉÌ¹…Ù¥…Ñ”ìÉ•½Á•¸É•Ñ…¥¹Ì¹…µ”ìM…Ù”½=Á•¸¸)9•áĞ¹…Ñ¥Ù”U`™••‘‰…¬‰•™½É”•áÑÉ„ÕÉÍ½È½É…‘¥ÕÌ½±¥Ù”½±½ÕÈ™••‘‰…¬¸((ŒŒ€¸ääÄÉ¥¡ĞµÉ•¥½¸É•ÕÉÉ•¹”ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ°€ÀĞèÀÄèÄåh()UÍ•È•áÁ±¥¥Ñ±äÉ•Á½ÉÑÌÉ¥¡Ğµ¡…¹¥ÍÍÕ”%8½¸ääÄ¸¼¹½ĞÑÉ•…ĞääÀ™Õ¹Ñ¥½¹…°)AML…ÌÁ•Éµ…¹•¹ĞÉ•¹‘•É¥¹œ…•ÁÑ…¹”ìÉ•Ñ…¥¸±½Í•µÁ…¹•°±¥™•å±”ÁÉ½Ñ•Ñ¥½¸)İ¡¥±”É•½Á•¹¥¹œ‰É½…Ù¥Í¥‰¥±¥Ñä…Ñ”¸ääÄ‘½¬U`¡…Ì9=PÉ••¥Ù•ÕÍ•ÈAML¸)MÕÁÁ±¥•É•Á½ÉĞè…•É½ÕÁÌ½…”°¹¼…Ñ¥Ù”ÍÑÉ½­”½Í•ÍÍ¥½¸½Ñ•áÑÕÉ”A…¥¹Ğì…¹Ù…Ì)Ù¥Í¥‰±”ÈÜÌÉàÄØÔÈ°Ù¥•İÁ½ÉĞÄÌØÙàààØ½AHÈ¸MÑÕ‘¥¼½Ù•É±…ä½Á…¥ÑäÀ¸Y%\¹…Ñ¥Ù”)Ñ½±”•Ù¥‘•¹”…ĞÈàÌäÄ¼ÈäÈÀÔ¼ÌÀÀàØ¼ÌÄÄÀÜÍ¡½İÌ½Á•¸ÑÉÕ”½™…±Í”½ÑÉÕ”½™…±Í”¸=Á•¸)Á…¹•°É•Ğääà¼ØØ¼ÌØÀ¼àÄÄ¸äàĞ°ÍÉ½±±!•¥¡ĞäàÀ½±¥•¹Ñ!•¥¡ĞàÄÀì±½Í•‘¥ÍÁ±…å¹½¹”)…¹é•É¼É•Ğ¸Q¡ÕÌ¹…Ñ¥Ù”¥¹ÁÕĞ…¹ääÀ±½Í•µÍÕÉ™…”É•µ½Ù…°İ½É¬°‰ÕĞ‘¼9=P)•±¥µ¥¹…Ñ”ÕÍ•ÈÌÙ¥ÍÕ…°±½ÍÌ¸¼¹½ĞÉ•Á•…Ğ¹…Ñ¥Ù”µÑ½±”™…¥±ÕÉ”½ÈÉ•Ñ…¥¹•±½Í•)Y%\Á…¹•°…Ì•áÁ±…¹…Ñ¥½¸™½ÈÑ¡¥Ì…ÁÑÕÉ”¸QÉ…¹ÍÁ…É•¹ĞMÑÕ‘¥¼±…å•ÈÉ•µ…¥¹Ì¥¸)=4ì½Á…¥ÑäÀİ•…­•¹ÌÙ¥Í¥‰±”µÙ¥¹•ÑÑ”•áÁ±…¹…Ñ¥½¸İ¥Ñ¡½ÕĞÁÉ½Ù¥¹œ•¹¥¹”…ÕÍ”¸)½¹ÑÉ½±Ì½=4½¡¥ÑÌ¡•…±Ñ¡ä¥Ì¹½ĞÁ¥á•°•Ù¥‘•¹”¸¥éµ¼•áÁ±¥¥Ñ±ä¡¥‘‘•¸¡•É”¸()%¸ääÄ…ÕÑ¡½É¥¹œ¹½‘•Ì…É”Á…É­•¥¸¡¥‘‘•¸¡½µ”Õ¹Ñ¥°=Á•¸™…•É½ÕÀÁ…¥¹Ğ½¹ÑÉ½±Ì¸)Q¡•¥Èé•É¼‰½Õ¹‘Ì•Ù•¸İ¡¥±”Y%\½Á•¸…É”aAQìÁ…±•ÑÑ”…ÁÁ•…É…¹”½¹ÑÉ½±Ì)É•µ…¥¸¥¸Y%\¸•‰ÕœÌÉ½ÕÁA¥­•È½ÁÑ¥½¹½Õ¹ĞÄ…¸Í¥µÁ±äµ•…¸•µÁÑä¹…µ•µÉ½ÕÀ)±¥ÍĞÁ±ÕÌÁ±…•¡½±‘•È¸¼¹½Ğ¥¹™•ÈÍ•±•Ñ½ÈÉ•É•ÍÍ¥½¸½Èµ¥ÍÍ¥¹œ…ÕÑ¡½É¥¹œ¹½‘•Ì¸)ÕÉÉ•¹Ğ‘•‰Õœ‘½•Ì¹½ĞÍ…µÁ±”¹•Ü‘½¬É½½Ğ¸M½ÕÉ”½U`ääÄÉ•µ…¥¹ÌÁ•¹‘¥¹œ‘•Ù¥”)…•ÁÑ…¹”¸IÕ¹Ñ¥µ”É•µ…¥¹ÌääÄì¹¼ÍÁ•Õ±…Ñ¥Ù”É•¹‘•É¥¹œ¡…¹•Ì¥¸Ñ¡¥ÌÕÁ‘…Ñ”¸)1¥Ù”Ù•ÉÍ¥½¸½¥¹‘•à½É•¹‘•Èµµ½‘•Ì½‘½¬‰åÑ”µµ…Ñ Ù•É¥™¥•ìäÄ™½ÕÍ•Ñ•ÍÑÌİ•É”)Ù…±¥‘…Ñ•‰•™½É”ÁÕ‰±¥…Ñ¥½¸¸9•áĞÑ•ÍĞ¹•Ü±•™Ğ‘½¬…¹½µÁ…É”¥ÑÌÙ¥Í¥‰¥±¥Ñä)İ¥Ñ …™™•Ñ•É¥¡ĞÉ•¥½¸¥˜É•ÕÉÉ•¹”Á•ÉÍ¥ÍÑÌì¹¼É•Á•…Ñ•!¥‘”Í½Ñ½±”‘ÕµÁÌ)¹••‘•¸I½½Ğ…ÕÍ”É•µ…¥¹ÌÕ¹½¹™¥Éµ•¸((ŒŒ€¸ääÈƒŠP™…•É½ÕÀ½±½ÕÈ½¹…µ”±¥ÍĞì€¸ääÄÕÍ•ÈAMLƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•È½¹™¥ÉµÌääÄÁ…¥¹Ğ½¹ÑÉ½±Ìİ½É¬É•…Ğ…™Ñ•ÈÉ•™É•Í …¹•áÁ±¥¥Ñ±äAMLääÄ¸)AÉ½Ñ•Ğ½µÁ…Ğ±•™Ğ‘½¬°½É¥¥¹…°½¹ÑÉ½±Ì°Á•ÉÍ¥ÍÑ•¹ĞA…¥¹Ğ½É…Í”°½¹”…¹ÍÑÉ½­”)¡¥ÍÑ½Éä½¹…Ù¥…Ñ¥½¸¸MÉ••¹Í¡½ĞáĞäÉÍ¡½İÌÉ¥¡ĞY%\‰½É‘•È½‰…­É½Õ¹İ¥Ñ )‰±…¹¬¥¹Ñ•É¥½È‰•™½É”É•™É•Í ì­••À¥¹Ñ•Éµ¥ÑÑ•¹ĞÉ•¹‘•É¥¹œ…Ñ”=A8¥¹‘•Á•¹‘•¹Ñ±ä¸((ääÈÉ•Á±…•Ìá¥ÍÑ¥¹œÉ½ÕÀ¹…Ñ¥Ù”‘É½Á‘½İ¸İ¥Ñ „‰½Õ¹‘•ÈÀÁÁà±…å•ÈµÍÑå±”±¥ÍĞè)½¹”Ñ…ÀÑ…É•ĞÁ•È¹…µ•É½ÕÀ°½±½ÕÈÍİ…Ñ €¬Í…™”Ñ•áĞ¹…µ”°Í•±•Ñ•µÉ½Ü¡¥¡±¥¡Ğ¸)9…µ”™¥•±ÍÑ¥±°É•…Ñ•Ì¹•ÜÉ½ÕÁÌì¡½½Í¥¹œ„É½ÜÉ•ÕÍ•Ì½É¥¥¹…°¥¹ÁÕĞ…¹…ÉµÌ)½É¥¥¹…°A…¥¹Ğµ½‘”¸I½İÌ…É”ÁÉ•Í•¹Ñ…Ñ¥½¸½¹±ä°¹¼µ•Í ½¡¥ÍÑ½Éä½µ…Ñ•É¥…°µÕÑ…Ñ¥½¸¸)M¡…É•™…•É½ÕÁA…±•ÑÑ”•áÁ½Í•ÌaP•á¥ÍÑ¥¹œÙ¥•İÁ½ÉĞµ•Í µ½É‘•È½½±‘•¸µÉ…Ñ¥¼)½±½ÕÈµ…Àì‰½Ñ É•¹‘•É•È…¹±¥ÍĞÕÍ”¥Ğ¸A…±•ÑÑ”½É•Í••½±¥¡Ñ¹•ÍÌ½Í…ÑÕÉ…Ñ¥½¸ÕÁ‘…Ñ”)Íİ…Ñ¡•Ì°½É¥¥¹…°É•¹‘•É¥¹œ…±½É¥Ñ¡´Õ¹¡…¹•¸I½İÌ­••À¹½‘”½™½ÕÌ¥‘•¹Ñ¥Ñä½¸)Í•±•Ñ¥½¸½½±½ÕÈÉ•™É•Í ìÉ½ÕÀµ•µ‰•ÉÍ¡¥ÀÉ•‰Õ¥±‘Ì±…å½ÕĞ½¹±äİ¡•¸¡…¹•¸)I•™É•Í ÕÉÉ•¹Ğµ•Í ½¸½Á•¸°¹…µ”½•‘¥Ğ½Í•±•Ñ¥½¸°Á…±•ÑÑ”¡…¹•Ì…¹ÅÕ•Õ•½É¥¥¹…°)‰½‘äÉ•‰Õ¥±‘Ì€¡ÍÑÉ½­”½µµ¥Ğ°…Ñ¥Ù”½‰©•ĞÍİ¥Ñ °U¹‘½I•‘¼¤ì¹¼Á½±±¥¹œ½¹•ÜÁ½¥¹Ñ•È)½İ¹•È¸9…µ•Ì…É”Ñ•áÑ½¹Ñ•¹Ğ°¹•Ù•È!Q50¸µÁÑä±¥ÍĞ•áÁ±…¥¹Ì¹…µ”€¬Á…¥¹Ğİ½É­™±½Ü¸)1•…ääààÁ¥­•ÈÑ•ÍÑÌµ¥É…Ñ”Ñ¼¹•Ü±¥ÍĞ…‘…ÁÑ•ÈÁÉ•Í•ÉÙ¥¹œÕÉÉ•¹Ğµµ•Í ½¹…µ”½¹¼)µÕÑ…Ñ¥½¸½Ù•É…”ì¹•ÜÉ•¹‘•É•ÈÑ•ÍÑÌ½Ù•ÈÍ•±•Ñ¥½¸½¥‘•¹Ñ¥Ñä½•µÁÑä½Ñ•áĞÍ…™•Ñä°)½É¥¥¹…°‰ÉÕÍ …±±‰…¬…¹Íİ…Ñ µÑ¼µÉ•¹‘•Èµ…ÑÑÉ¥‰ÕÑ”Á…É¥Ñä…É½ÍÌ…±°ĞÁ…±•ÑÑ•Ì¸)MÑÉ½­”äàÜ½…ÕÑ¡½É¥¹œäàÔ½‘½¬ääÄ½UX½A…¥¹Ğ½µ…¥¸½5Õ±Ñ¤Ä¸À…¹ääÀY%\ÉÕ±”Õ¹¡…¹•¸)Y…±¥‘…Ñ¥½¸èäÌÑ…É•Ñ•AML¼Á%0¼ÁÍ­¥ÀìÍå¹Ñ…à…¹‘¥™˜¡•­ÌÁ…ÍÌ¸I•Ù¥•İ•)¡…¹•É•¹‘•È½½É”½¹•Üµ±¥ÍĞ…¹Í¡•±°½É•½Ù•Éä…¡”­•åÌì¹¼™Õ±°µÍÕ¥Ñ”½¹…Ñ¥Ù”)É•¹‘•É¥¹œÁÉ½½˜±…¥µ•¸Q¡”ÁÉ¥½ÈäàÔÍ…™”µÑ•áĞ…ÍÍ•ÉÑ¥½¸¹½ÜÑ…É•ÑÌ±¥ÍĞ±…‰•±Ì)¥¹ÍÑ•…½˜¹…Ñ¥Ù”½ÁÑ¥½¸¥µÁ±•µ•¹Ñ…Ñ¥½¸¸ääÈ…İ…¥ÑÌ¥A…±¥ÍĞ…•ÁÑ…¹”¸()ÕÑÕÉ”ÕÍ•È½…°è…•É½ÕÀ‰½Õ¹‘…É¥•Ì‘•™¥¹”UX¥Í±…¹Í•…µÌ°Ñ¡•¸É½ÕÀµÑ…É•Ñ•)¥µ…”½A	H…ÍÍ¥¹µ•¹Ğ¸Õ‘¥Ğ½É¥¥¹…°UX…Ñ±…Ì½Í•…´½ÍÑ¥Ñ …¹Á…¥¹Ğµ…Í¬½µ…Ñ•É¥…°)½İ¹•ÉÌ™¥ÉÍĞ¸¥ÉÍĞ±¥­•±äÉ½ÕÑ”Í¡…É•…Ñ±…Ìİ¥Ñ Á•ÈµÉ½ÕÀµ…Í­Ì½‰…­¥¹œìÍ•Á…É…Ñ”)µ…Ñ•É¥…°Í±½ÑÌÉ•ÅÕ¥É”É•¹‘•É•È½Í…Ù”½=	(½1½9=4…Õ‘¥Ğ¸Q¡¥Ì‰Õ¥±=L9=P¥µÁ±•µ•¹Ğ)Õ¹İÉ…Àµ‰äµÉ½ÕÁÌ½ÈÁ•ÈµÉ½ÕÀµ…Ñ•É¥…±Ì°…¹µÕÍĞ¹½Ğ¥µÁ±äÑ¡•ä•á¥ÍĞ¸M…µ”µ¹…µ”)‘¥Í½¹¹•Ñ•™…”Á…Ñ¡•Ìµ…äå¥•±µÕ±Ñ¥Á±”¥Í±…¹‘Ìì•½µ•ÑÉäÍÑ…åÌİ•±‘•¸()Y%ääÈè½Á•¸…•É½ÕÁÌÁ…¥¹Ğ‘½¬ìÁ…¥¹ĞÈ¬É½ÕÀ¹…µ•Ì°¥¹ÍÁ•ĞÍİ…Ñ ½¹…µ”É½İÌ¸)Q…ÀÉ½İÌ…¹Á…¥¹Ğ½•É…Í”ìÍ•±•Ñ•¹…µ”½¡¥¡±¥¡Ğ…¹U¹‘½I•‘¼É•™É•Í ±¥ÍĞ¸‘©ÕÍĞ)Y%\Á…±•ÑÑ”½É•Í••…¹É•½Á•¸‘½¬èÍİ…Ñ¡•Ì™½±±½ÜÙ¥•İÁ½ÉĞ‰…Í”½±½ÕÉÌ€¡±¥¡Ñ¥¹œ)…¸Í¡…‘”µ½‘•°¤¸1½¹œ¹…µ•Ì½µ…¹äÉ½ÕÁÌÍÑ…ä½µÁ…Ğì½¹”½™¥¹•È¹…Ù¥…Ñ¥½¸¸((ŒŒ€¸ääÌƒŠP…”ÁÁ±äá…Ğ¹…Ñ¥Ù”µÁ½¥¹Ñ•È…ÁÑÕÉ”É•Á…¥ÈƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á½ÉÑÌÁÁ±äáÑÉÕ‘”á…Ğ‘½•Ì¹½Ğİ½É¬…¹ÑÉ…ÁÌÑ¡”ÕÍ•È¥¸áÑÉÕ‘”¸)Õ‘¥Ñ•ÕÉÉ•¹Ğµ…¥¸ÔäØİ‘ˆÈä½‰Õ¥±ääÈ°½É¥¥¹…°…”Á½ÁÕÀ½ÁÉ•¥Í¥½¸½‘¥É•Ğ½¹ÑÉ½±±•È°)A•¹¥°…Ñ”…¹Q¡É½Õ ™…±±‰…¬¸9¼¹•Ü•½µ•ÑÉä°¡¥ÍÑ½Éä½È•ÍÑÕÉ”½İ¹•È¹••‘•¸)½¹™¥Éµ•É•É•ÍÍ¥½¸è¹Õµ•É¥Œá…Ğ‘¥ÍÁ…Ñ¡•ÌÉ•Í•ÉÙ•Íå¹Ñ¡•Ñ¥ŒÁ½¥¹Ñ•ÈäàÜØ°‰ÕĞ)½É¥¥¹…°Á½¥¹Ñ•É‘½İ¸9‰•¥¹¥É•ÑÉ…œ…±°¹…Ñ¥Ù”Í•ÑA½¥¹Ñ•É…ÁÑÕÉ”™½È¥Ğ¸	É½İÍ•ÉÌ)É•©•ĞÑ¡¥Ì¹½¹•á¥ÍÑ•¹Ğ¹…Ñ¥Ù”Á½¥¹Ñ•Èİ¥Ñ 9½Ñ½Õ¹‘ÉÉ½È¸Ù•¹ÑQ…É•ĞÉ•Á½ÉÑÌ¡…¹‘±•È)•á•ÁÑ¥½¹Ì…¹½¹Ñ¥¹Õ•Ì‘¥ÍÁ…Ñ ì‰•¥¸¡……±É•…‘äÍ•Ğ‘É…œ°±•…Ù¥¹œÁ•¹‘¥¹œÁÉ•ÍÌ)…±¥Ù”Ñ½¼¸A½¥¹Ñ•ÉÕÀ±•…ÉÌÁ•¹‘¥¹œÁÉ•ÍÌ™¥ÉÍĞ°±•…Ù¥¹œ‘É…œÍ•ĞìÁ½ÁÕÀÑ¡•¸‘¥Í…‰±•Ì)á…Ğ½¥¹ÁÕĞ½½¹”¥¹‘•™¥¹¥Ñ•±ä¸…É±¥•ÈÑ•ÍÑÌÕÍ•„¹¼µ½À…ÁÑÕÉ”ÍÑÕˆ…¹µ¥ÍÍ•¥Ğ¸()=¹±äÉÕ¹Ñ¥µ”¡…¹”è½É¥¥¹…°µÕ±Ñ¤µ™…”µ‘¥É•Ğ…ÁÑÕÉ”¡•±Á•ÈÍ­¥ÁÌÉ•Í•ÉÙ•¹Õµ•É¥Œ)Á½¥¹Ñ•ÈäàÜØ…Ğ…±°Ñ¡É•”•á¥ÍÑ¥¹œ…ÁÑÕÉ”Í¥Ñ•Ì¸A¡åÍ¥…°½¹Ñ…ÑÌÉ•Ñ…¥¸¹…Ñ¥Ù”…ÁÑÕÉ”°)½É¥¥¹…°İ¥¹‘½Üµ…ÁÑÕÉ”½µÁ±•Ñ¥½¸°‘•±¥‰•É…Ñ”µ‘É…œÑ¡É•Í¡½±°Í•±•Ñ¥½¸°¥¹™•É•¹”°)•½µ•ÑÉä½Ñ½Á½±½ä½É•™ÕÍ…°½Q¡É½Õ Í…™•Ñä…¹¡¥ÍÑ½Éä¸á…ĞÍÑ¥±°ÉÕ¹Ì½É¥¥¹…°)½¹ÑÉ½±±•È…¹Í•µ…¹Ñ¥Œ½µµ¥Ğ…­¹½İ±•‘•µ•¹Ğì¹¼¹•Ü¹Õµ•É¥Œµ½‘•±±¥¹œ­•É¹•°¸)A½ÁÕÀ…¹ÁÉ•¥Í¥½¸½‘”Õ¹¡…¹•¸M¡•±°½‘¥É•Ğ½É•½Ù•Éä­•åÌääÌÉ•Ù¥•İ•ì¹¼‘å¹…µ¥Œ)¡¥±¡…¹•Ì¸AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°µ…¥¸°…•ÁÑ•¥½¹Ì½…•É½ÕÀ½A…¥¹Ğ½UX½™É½é•¸Õ¹¡…¹•¸()Q•ÍĞ¡•±Á•È¹½Ü½ÁÑ¥½¹…±±äµ½‘•±Ì‰É½İÍ•È…ÁÑÕÉ”É•©•Ñ¥½¸…¹Ù•¹ÑQ…É•Ğ•á•ÁÑ¥½¸)½¹Ñ¥¹Õ…Ñ¥½¸ì‘•™…Õ±Ğ™¥áÑÕÉ•ÌÍÑ¥±°Ñ¡É½ÜÕ¹•áÁ•Ñ•±¥ÍÑ•¹•È™…¥±ÕÉ•Ì¸	•™½É”ÉÕ¹Ñ¥µ”)É•Á…¥È°¹•ÜÑ•ÍÑÌÉ•ÁÉ½‘Õ•™…±Í”á…ĞÍÕ•ÍÌÉ•ÍÕ±Ğ…¹ÍÑÉ…¹‘•‘É…¥¹œÍÑ…Ñ”¸)™Ñ•ÈÉ•Á…¥ÈèÉ•Á•…Ñ•áÑÉÕ‘”½%¹Í•Ğá…Ğ°Í…™”É•™ÕÍ…°Ñ¡•¸Ù…±¥É•ÑÉä°¹¼Íå¹Ñ¡•Ñ¥Œ)…ÁÑÕÉ”½¹¼±¥ÍÑ•¹•È•ÉÉ½ÉÌ½¹¼Á•¹‘¥¹œ‘É…œ°…ÑÕ…°Á½ÁÕÀÁÁ±ä½½¹”±¥™•å±”°½¹”¡¥ÍÑ½Éä)ÍÑ•ÀÁ•ÈÍÕ•ÍÌ…¹U¹‘½I•‘¼Á…ÍÌ¸A¡åÍ¥…°…ÁÑÕÉ”½½µµ¥Ğ½…¹•°É•Ñ…¥¹•¸¥¹…°ÄäÄ)™½ÕÍ•AML¼Á%0¼ÁÍ­¥À€¡øÔ¸ÉÌ¤°¥¹±Õ‘¥¹œ½É¥¥¹…°…”½É•Á•…Ğ½Á½ÁÕÀ½…µ•É„½Q¡É½Õ ¼)¹•…Ñ¥Ù”µ•áÑÉÕ‘”½É•±•…Í”Ñ•ÍÑÌìÍå¹Ñ…à½‘¥™˜¡•­ÌÁ…ÍÌ¸9¼™Õ±°µÍÕ¥Ñ”½È¹…Ñ¥Ù”ÁÉ½½˜±…¥µ•¸()M•Á…É…Ñ”ääÈÉ•¹‘•É¥¹œÉ•ÕÉÉ•¹”…ĞÀÔèÌäèÄÕhèÕÍ•È½‰Í•ÉÙ•É¥¡ÑU$µ¥ÍÍ¥¹œİ¥Ñ …¹Ù…Ì)¡¥‘‘•¸…ĞĞÜĞÌà°Ñ¡•¸É•ÍÑ½É•…¹Ù…ÌÔÀÔÈÌ¸9…Ñ¥Ù”Y%\½Á•¸ÌĞÔÌÈ¡…‰½Õ¹‘Ìääà¼ØØ¼ÌØÀ¼(àÄÄ¸äàĞ…¹äàÁÁàÍÉ½±°½¹Ñ•¹Ğì±½Í•Á…¹•°¥Ì‘¥ÍÁ±…å¹½¹”½é•É¼‰½Õ¹‘Ì¸Q½½±‰…È±…å½ÕĞ¼)¡¥ÑÌ¡•…±Ñ¡äì¥éµ¼ÁÉ•Í•¹ĞÄäÙàÄäØ…ĞÜÔÈ¸ÜÔ¼ĞĞÌ¸ÈÌĞ¸MÑÕ‘¥¼½Ù•É±…ä½Á…¥ÑäÀ¸É½ÕÀµ±¥ÍĞ)½ÁÑ¥½¹½Õ¹Ğ½Í•±•Ñ•‘%¹‘•à¹Õ±°¥Ì•áÁ•Ñ•™½ÈääÈ%X±¥ÍĞ°¹½Ğ„¹…Ñ¥Ù”µÍ•±•Ğ™…¥±ÕÉ”¸)9¼…ÑÕ…°ÍÉ••¹Í¡½Ğ½…™™•Ñ•É•¥½¸¥‘•¹Ñ¥™¥•¥¸Ñ¡¥ÌÉ•Á½ÉĞì‘¼¹½Ğ¥¹™•È„¹•Ü)É•¹‘•É¥¹œ…ÕÍ”½ÈÕ…É…¹Ñ••!¥‘”ÍÉ•½Ù•Éä¸%¹Ñ•Éµ¥ÑÑ•¹ĞÉ¥¡ĞµÉ•¥½¸Ù¥Í¥‰¥±¥Ñä)É•µ…¥¹Ì=A8ì¹¼É•¹‘•É¥¹œ¡…¹•Ì¥¸ääÌ¸ääÈ±¥ÍĞ‘•Ù¥”…•ÁÑ…¹”ÍÑ¥±°Á•¹‘¥¹œì(ääÄAMLÉ•Ñ…¥¹•¸…•É½ÕÀµÍ•…´UX½µ…Ñ•É¥…°İ½É¬É•µ…¥¹Ì™ÕÑÕÉ”°¹½ĞÍ¡¥ÁÁ•¸()Y%ääÌè½¹™¥É´ääÌìÍ•±•ĞÕ‰”™…”°áÑÉÕ‘”°•¹Ñ•ÈÀ¸È€¡½È½¹Ù•¹¥•¹Ğµ½‘•°Õ¹¥ÑÌ¤°)ÁÁ±äá…ĞÑİ¥”ì‰½Ñ ½Á•É…Ñ¥½¹Ì½µµ¥Ğ…¹½¹”•á¥ÑÌ¸U¹‘½I•‘¼•… ÍÑ•À¸I•½Á•¸)…¹ÑÉä„Ù…±¥¹•…Ñ¥Ù”É••ÍÌì„É•™ÕÍ•Ù…±Õ”µÕÍĞÍÑ¥±°…±±½Ü½¹”…¹±…Ñ•ÈÉ•ÑÉä¸)=É‘¥¹…ÉäA•¹¥°‘É…œÑ¡•¸½¹”ì%¹Í•Ğá…ĞÍ…¹¥Ñä¡•¬¸]…Ñ •á¥ÍÑ¥¹œÉ¥¡ĞµÉ•¥½¸)™…Õ±ĞÍ•Á…É…Ñ•±ä¸9•áĞ½‰Ñ…¥¸‘•Ù¥”á…Ğ½•á¥Ğ™••‘‰…¬‰•™½É”™•…ÑÕÉ”•áÁ…¹Í¥½¸¸((ŒŒŒ€¸ääÌÁÕ‰±¥…Ñ¥½¸ÍÑ…ÑÕÌ()IÕ¹Ñ¥µ”½Ñ•ÍÑ•±½…°½µµ¥Ğˆå™•ÔÈÉ˜äÕ…”ØÅ™”àÉÔá˜äÄÈÜÀÙ…„ÄäÑ˜á‘ˆ°ÑÉ•”)‰ÄÜá„äåˆá‰…ŒÍˆÁ„ĞäĞİ”ÀÜÁ‘”ÄÙ•‘˜àÑ…•à¸±°ÄäÄ™½ÕÍ•Ñ•ÍÑÌÁ…ÍÌ¸AÕÍ İ…Ì)‰±½­•Ñİ¥”‰ä…ÕÑ½µ…Ñ¥Œ…ÁÁÉ½Ù…°É•Ù¥•Ü¸1¥Ù”ääÈ½µ…¥¸ÔäØİ‘ˆÈäÉ•µ…¥¹ÌÑ¡”±…ÍĞ)Ù•É¥™¥•ÁÕ‰±¥…Ñ¥½¸ì‘¼¹½Ğ‘•ÍÉ¥‰”ääÌ…ÌÍ¡¥ÁÁ•½È…Í¬™½È‘•Ù¥”ääÌÑ•ÍÑÌå•Ğ¸)I•Ù¥•ÜÉ•©•Ñ•ÍÑ…¹‘¥¹œ…ÕÑ¡½É¥é…Ñ¥½¸¥¸É•ÑÉ¥•Ù•%}]=I-1=\¹µ…Ì¥¹ÍÕ™™¥¥•¹Ğ)•¹µÕÍ•È…ÕÑ¡½É¥é…Ñ¥½¸¥¸Ñ¡¥ÌÑÉ…¹ÍÉ¥ÁĞ¸İ…¥Ğ•áÁ±¥¥ĞÕÍ•È½¹™¥Éµ…Ñ¥½¸Ñ¼ÁÕÍ )…¹ÁÕ‰±¥Í ääÌÑ¼µ…¥¸ì‘¼¹½Ğ‰åÁ…ÍÌÉ•©•Ñ¥½¸İ¥Ñ ½¹¹•Ñ½È½È…±Ñ•É¹…Ñ”ÑÉ…¹ÍÁ½ÉĞ¸)™Ñ•È…ÁÁÉ½Ù…°ÁÕÍ Á•¹‘¥¹œ±½…°½µµ¥ÑÌ°™•Ñ µ…¥¸°Ù•É¥™äÉ•±•…Í”½Á¥¹Ì…¹±¥Ù”)‰åÑ•Ì°Ñ¡•¸¥Ù”Y%ääÌ¡•­Ì¸9¼ÉÕ¹Ñ¥µ”•‘¥ÑÌ…™Ñ•ÈÙ…±¥‘…Ñ¥½¸¸((ŒŒ€¸ääĞƒŠP‘¥ÍÑ¥¹Ğ¹…Ñ¥Ù”9=4™…•É½ÕÀ½±½ÕÉÌƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á½ÉÑÌÍ¥à•áÁ½ÉÑ•É½ÕÁÌ…ÉÉ¥Ù”¥¸9½µ……Ì¹•…Èµ¥‘•¹Ñ¥…°½±½ÕÈÁ…¥ÉÌ¸)Õ‘¥Ğ™½Õ¹¹…Ñ¥Ù”9=4µ•Í¡A…ÉĞå±•ÌÑ¡”‘½¹½ÈÑ•µÁ±…Ñ”ÌQ!IÉ½ÕÀ½±½ÕÉÌì)Í¥à•¹•É…Ñ•É½ÕÁÌÑ¡•É•™½É”½¹Ñ…¥¸½¹±äÑ¡É•”Õ¹¥ÅÕ”IÑÉ¥Á±•Ì¸9•ÜÑ•ÍĞ)É•ÁÉ½‘Õ•ÌÌµÙ•ÉÍÕÌØ‰•™½É”É•Á…¥È¸1…±É•…‘ä•¹•É…Ñ•Ì½±‘•¸µÉ…Ñ¥¼µÍÁ…•½±½ÕÉÌ)™½È¹•ÜÉ½ÕÁÌ…¹‘•±¥‰•É…Ñ•±äÁÉ•Í•ÉÙ•Ì¥µÁ½ÉÑ•9½µ…É½ÕÀ½±½ÕÉÌìÕ¹¡…¹•¸()9…Ñ¥Ù”9=4¹½ÜÉ•ÕÍ•Ì•á¥ÍÑ¥¹œ™…•É½ÕÁA…±•ÑÑ”ääÈ™½È…±°•áÁ½ÉÑ•¹…µ•É½ÕÁÌ°)ÕÍ¥¹œ½É¥¥¹…°•áÁ½ÉÑ•™…”½É‘•È½¹…µ•Ì°‘•™…Õ±ĞÍÁ…•Á…±•ÑÑ”…¹±¥¹•…ÈI¸)9¼¹•ÜÁ…±•ÑÑ”…±½É¥Ñ¡´¸Q¡¥Ì¥Ì™…•É½ÕÀ‘¥ÍÁ±…äµ•Ñ…‘…Ñ„°¹½ĞÁ…¥¹Ğ°Ù•ÉÑ•à)½±½ÕÈ°µ…Ñ•É¥…°½ÈÑ•áÑÕÉ”…ÍÍ¥¹µ•¹Ğ¸É½ÕÀ%Ì½¹…µ•Ì½‰½Õ¹‘…É¥•Ì°İ•±‘••½µ•ÑÉä°)UYÌ°A	Hµ…ÁÌ°‘½¹½ÈÑ•µÁ±…Ñ”‰åÑ•Ì°Í½ÕÉ”µ•Í …¹¡¥ÍÑ½ÉäÉ•µ…¥¸Õ¹¡…¹•¸9…Ñ¥Ù”)Õ¹¹…µ•™…•ÌÍÑ¥±°µ…ÀÑ¼½É¥¥¹…°5…¥¸É½ÕÀ¸½•Ì¹½ĞÁÉ½µ¥Í”Y%\ÕÍÑ½´Á…±•ÑÑ”¼)É•Í••™¥‘•±¥Ñä½È¡…¹”ÁÉ•Í•ÉÙ•1½±½ÕÉÌ¸IÕ¹Ñ¥µ”¡…¹”=91d¹…Ñ¥Ù”•áÁ½ÉÑ•Èì)Á…­•µµ…À½Á…¹•°½1…ˆ™¥±•Ì¡…¹”±½…‘•ÈÁ¥¹Ì½¹±äÑ¼É•™É•Í Ñ¡”½É¥¥¹…°É…Á ¸)I•Ù¥•İ•ääĞÍ¡•±°½É•½Ù•Éä½Á…¹•°½Á…­•½½É”½1…ˆ­•åÌ…¹Í¡…É•Á…±•ÑÑ”ääÈÉ•™•É•¹”¸)5Õ±Ñ¤Ä¸À½µ…¥¸½…•ÁÑ•ääÈ±¥ÍĞ¼ääÌá…Ğ½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸()Y…±¥‘…Ñ¥½¸ÄÌä™½ÕÍ•AML¼Á%0¼ÁÍ­¥À€¡øä¸ÙÌ¤è¹…Ñ¥Ù”9=4½UX½½±½ÕÈ½¹½Éµ…°½•µ¥ÍÍ¥Ù”¼)Í…±…È½Á…­•½‘¥ÍÁ±…•µ•¹Ğ½•áÁ½ÉĞÑ•ÍÑÌ°ääÈÍİ…Ñ ±¥ÍĞ°ääÌá…Ğ…¹É•±•…Í”½¹ÑÉ…ÑÌ¸)M¥à¹…µ•Õ‰”É½ÕÁÌ¹½Ü¡…Ù”Í¥à‘•Ñ•Éµ¥¹¥ÍÑ¥ŒIÑÉ¥Á±•Ìİ¥Ñ …±°Á…¥Éİ¥Í”I)‘¥ÍÑ…¹•Ìø¸Èì…±°Í¥à™…”µÑ¼µÉ½ÕÀ%Ì…¹Í½ÕÉ”µ•Í É•Ñ…¥¹•¸á¥ÍÑ¥¹œ‰¥¹…Éä¼)Ñ•áÑÕÉ”½É½ÕÀÉ½Õ¹µÑÉ¥ÀÑ•ÍÑÌÁ…ÍÌ¸Må¹Ñ…à½‘¥™˜±•…¸¸9¼¹…Ñ¥Ù”9½µ…½È™Õ±°µÍÕ¥Ñ”)ÁÉ½½˜±…¥µ•¸%¹Ñ•Éµ¥ÑÑ•¹ĞÉ¥¡ĞµÉ•¥½¸É•¹‘•É¥¹œÉ•µ…¥¹Ì=A8°Õ¹É•±…Ñ•Ñ¼Ñ¡¥Ì™¥à¸()1=0=91dè¥¹±Õ‘•ÌÁ•¹‘¥¹œääÌá…ĞÉ•Á…¥È¸AÕ‰±¥…Ñ¥½¸É•µ…¥¹Ì‰±½­•‰äÑ¡”)ÁÉ¥½È…ÕÑ½µ…Ñ¥Œ…ÁÁÉ½Ù…°É•Ù¥•Üì¹¼…ÑÑ•µÁĞÑ¼‰åÁ…ÍÌ½ÈÉ•ÁÕÍ ¸İ…¥Ğ•áÁ±¥¥ĞÕÍ•È)½¹™¥Éµ…Ñ¥½¸Ñ¼ÁÕÍ ½ÁÕ‰±¥Í ääĞÑ¼Í¡…É•µ…¥¸½±¥Ù”…ÁÀ¸1¥Ù”ääÈ¥Ì±…ÍĞÙ•É¥™¥•¸)™Ñ•È…ÁÁÉ½Ù…°°ÁÕ‰±¥Í Á•¹‘¥¹œ±½…°½µµ¥ÑÌ…¹Ù•É¥™äÉ•µ½Ñ”Í¡•±°½Á¥¹Ì½±¥Ù”‰åÑ•Ì¸)Y%ääĞQHAU	1%Q%=8è¹…Ñ¥Ù”9=4•áÁ½ÉĞ½˜Í¥à‘¥™™•É•¹Ñ±ä¹…µ•™…•É½ÕÁÌì)½Á•¸9½µ……¹•¹…‰±”…•É½ÕÀ‘¥ÍÁ±…ä°Ù•É¥™äÍ¥à‘¥ÍÑ¥¹Ğ½±½ÕÉÌ…¹Í¥à½ÉÉ•Ğ)É•¥½¹Ì½¹…µ•Ìì•½µ•ÑÉä½Ñ•áÑÕÉ”…ÁÁ•…É…¹”¥¹Ñ…Ğ¸I•Ñ•ÍĞääÌá…ĞÑİ¥”½½¹”½U¹‘½I•‘¼¸)%˜ÕÍ•ÈÌ…ÑÕ…°•áÁ½ÉĞİ…Ì1½È=	(°…Í¬™½È™½Éµ…Ğ½™¥±”ì¹…Ñ¥Ù”‘½¹½Èµå±”‘•™•Ğ)¥Ì½¹™¥Éµ•°‰ÕĞ‘¼¹½Ğ±…¥´¥Ğ‘¥…¹½Í•Ì•Ù•Éä™½Éµ…ĞÌÍ¥µ¥±…Èµ½±½ÕÈ‰•¡…Ù¥½È¸((ŒŒMÑ…¹‘¥¹œÁÕ‰±¥…Ñ¥½¸…ÁÁÉ½Ù…°ƒŠPÉ•…™™¥Éµ•€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äÍÑ…Ñ•Ì¥¸Ñ¡¥Ì‘•Ù•±½Áµ•¹Ğ¡…ĞèƒŠqÁÁÉ½Ù…°¥Ì1]eL¥Ù•¸€´İÉ¥Ñ”)Ñ¡…Ğ¥¹Ñ¼Ñ¡”!…¹‘½Ù•È¹½Ñ•Ì»ŠtQ¡¥ÌÉ•…™™¥ÉµÌÍÑ…¹‘¥¹œ…ÕÑ¡½É¥é…Ñ¥½¸™½È	½á1…ˆ)½µµ¥ÑÌ°ÁÕÍ¡•Ì‘¥É•Ñ±äÑ¼µ…¥¸°…¹¥Ñ!ÕˆA…•ÌÁÕ‰±¥…Ñ¥½¸°¥¹±Õ‘¥¹œÁ•¹‘¥¹œ)‰Õ¥±ääĞ…¹¥ÑÌääÌá…ĞÉ•Á…¥È¸½µÁ±•Ñ”Ù…±¥‘…Ñ¥½¸°½µµ¥Ğ½ÁÕÍ …¹Ù•É¥™äÉ•±•…Í”)µ…É­•ÉÌ½±¥Ù”…ÍÍ•ÑÌİ¥Ñ¡½ÕĞ…Í­¥¹œ™½ÈÁÕ‰±¥Í¡¥¹œ…ÁÁÉ½Ù…°……¥¸¸ÕÑ¡½É¥é…Ñ¥½¸¥Ì)™½È	½á1…ˆ‘•Ù•±½Áµ•¹ĞìÕ¹É•±…Ñ••áÑ•É¹…°…Ñ¥½¹Ì…É”½ÕÑÍ¥‘”Ñ¡¥ÌÍ½Á”¸)Q¡”•…É±¥•ÈääÌ¼ääĞ…ÁÁÉ½Ù…°µ‰±½¬¹½Ñ•Ì‰•±½Ü…É”¡¥ÍÑ½É¥…°…¹ÍÕÁ•ÉÍ•‘•‰äÑ¡¥Ì)•áÁ±¥¥ĞÕÍ•È½¹™¥Éµ…Ñ¥½¸¸Q¡•ä…É”¹½Ğ„½¹Ñ¥¹Õ¥¹œÉ•ÅÕ¥É•µ•¹ĞÑ¼…Í¬……¥¸¸)%˜„™ÕÑÕÉ”…ÕÑ½µ…Ñ¥ŒÉ•Ù¥•ÜÍÑ¥±°‰±½­ÌÁÕ‰±¥…Ñ¥½¸°É•Á½ÉĞ¥ÑÌ…ÑÕ…°É•…Í½¸ì)‘¼¹½Ğµ¥ÍÍÑ…Ñ”Ñ¡”ÕÍ•ÈÌÍÑ…¹‘¥¹œ…ÕÑ¡½É¥é…Ñ¥½¸½È‰åÁ…ÍÌ„É•©•Ñ¥½¸¸()ÕÉÉ•¹Ğ‘•±¥Ù•ÉäèääĞÉÕ¹Ñ¥µ”àÀäÙ„ÀÄÌ¥¹±Õ‘•Ì¹…Ñ¥Ù”9=4‘¥ÍÑ¥¹ĞÉ½ÕÀ½±½ÕÉÌ…¹(ääÌ…”á…Ğ…ÁÑÕÉ”É•Á…¥È¸ÄäÄ™½ÕÍ•ääÌ¡•­Ì…¹ÄÌä™½ÕÍ•ääĞ¡•­ÌÁ…ÍÍ•ì)Ñ¡•Í”½Ù•É±…ÁÁ¥¹œÍ•ÑÌ…É”¹½Ğ„½µ‰¥¹•‘¥ÍÑ¥¹ĞÑ•ÍĞ½Õ¹Ğ¸•Ù¥”…•ÁÑ…¹”¥Ì)Á•¹‘¥¹œ¸%¹Ñ•Éµ¥ÑÑ•¹ĞÉ¥¡ĞµÉ•¥½¸É•¹‘•É¥¹œÉ•µ…¥¹Ì=A8¸AÕ‰±¥Í Á•¹‘¥¹œ½µµ¥ÑÌ°)Ù•É¥™äÕÉÉ•¹Ğµ…¥¸…¹±¥Ù”Ù•ÉÍ¥½¸½¥¹‘•à½‘¥É•Ğ½•áÁ½ÉĞ½Á…­•½½É”½Á…±•ÑÑ”…ÍÍ•ÑÌ°)Ñ¡•¸ÁÉ½Ù¥‘”Í¡½ÉĞY%ääĞ…¹Y%ääÌ¡…¹‘Ìµ½¸¡•­Ì¸((ŒŒ€¸ääĞÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()AÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”ŒÕ‘ˆÉ”ÔÙ…É„ÜÅÈÔäÁ˜ĞÄÜÉˆÑ•™Å”ÜÙ„åÄÄÔÄ°ÑÉ•”)…ĞØÑ„Èå”ØÜÔÁ…™ŒÄÄäĞÀÜÌÀÉ…„Ù™™„å˜É„ÀÜÑˆà°•á…Ñ±äµ…Ñ¡•ÌÑ•ÍÑ•½ÕÁ±½…‘•±½…°)„ÈäÜÌäàÑÉ•”¸±°ÄÜ¡…¹•‰±½‰ÌÙ•É¥™¥•‰•™½É”…Ñ½µ¥Œ¹½¸µ™½É•µ…¥¸ÕÁ‘…Ñ”¸)•Ñ¡•½É¥¥¸½µ…¥¸½¹™¥ÉµÌÉÕ¹Ñ¥µ”½µµ¥Ğ½ÑÉ•”¸A…•ÌĞÀĞÔàÜÈÌØÌä½µÁ±•Ñ•MUML¸)±°ÄÀ™É•Í ±¥Ù”¡•­Ì‰åÑ”µµ…Ñ èÙ•ÉÍ¥½¸¹©Í½¸±¥¹‘•à¹¡Ñµ°±µÕ±Ñ¤µ™…”µ‘¥É•Ğ°)¹½µ…µ•áÁ½ÉĞµ½É”±¹½µ…µÁ…­•µµ…ÁÌ±•áÁ½ÉĞµ…ÌµÁ…¹•°±™…•É½ÕÀµ½±½ÕÉÌµ½É”±1…ˆ±½…‘•È°)%}!9=¹µ…¹%}]=I-1=\¹µ¸M•Ù•¸™¥¹…°É•±•…Í”¡•­ÌÁ…ÍÌ¸!½ÍÑ•™Õ±°)Q½Á½±½äĞÀĞÔàÜÈÔÔÔÔİ…Ì¥¸ÁÉ½É•ÍÌİ¡•¸¡•­•ì¹¼¡½ÍÑ•™Õ±°µÍÕ¥Ñ”AML±…¥µ•¸)9¼ÉÕ¹Ñ¥µ”¡…¹•Ì…™Ñ•È™½ÕÍ•Ù…±¥‘…Ñ¥½¸¸Q¡¥ÌÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜¥Ì‘½Ìµ½¹±ä¸)UÍ•ÈÍÑ…¹‘¥¹œ…ÁÁÉ½Ù…°¥ÌÉ•…™™¥Éµ•¥¸Q!%L¡…Ğ…¹%}]=I-1=\½%}!9=ì¹¼)™ÕÉÑ¡•ÈÁÕ‰±¥…Ñ¥½¸Á•Éµ¥ÍÍ¥½¸ÅÕ•ÍÑ¥½¸™½È	½á1…ˆ¸!¥ÍÑ½É¥…°1=0=91d½…ÁÁÉ½Ù…°)‰±½¬•¹ÑÉ¥•Ì…É”ÍÕÁ•ÉÍ•‘•¸	Õ¥±ääĞ¥Ì1%Y…¹Id=HQMQ%9°¥¹±Õ‘•ÌääÌ¸)Y%ääĞè¹…Ñ¥Ù”9=4Í¥à¹…µ•É½ÕÁÌ¡…Ù”Í¥à‘¥ÍÑ¥¹Ğ½±½ÕÉÌ½½ÉÉ•ĞÉ•¥½¹Ìì)Ñ•áÑÕÉ•ÌÕ¹¡…¹•¸Y%ääÌè…”ÁÁ±äá…ĞÑİ¥”°½¹”°U¹‘½I•‘¼ì%¹Í•Ğá…Ğ)…¹½É‘¥¹…ÉäA•¹¥°‘É…œÍ…¹¥Ñä¸ääÈ™…•É½ÕÀ±¥ÍĞ…•ÁÑ…¹”ÍÑ¥±°Á•¹‘¥¹œìääÄAML)ÁÉ½Ñ•Ñ•¸I•ÕÉÉ¥¹œÉ¥¡ĞµÉ•¥½¸É•¹‘•É¥¹œÉ•µ…¥¹Ì=A8¸9•áĞ…Ğ½¸‘•Ù¥”™••‘‰…¬¸((ŒŒ€¸ääÔƒŠPI=U@…”É…‘¥…°…¹¬ì€¸ääĞÕÍ•ÈAMLƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äAMM•ÌääĞìÁÉ½Ñ•Ğ¹…Ñ¥Ù”9=4‘¥ÍÑ¥¹ĞÉ½ÕÀ½±½ÕÉÌ…¹ääÌá…Ğ)áÑÉÕ‘”½%¹Í•Ğ…ÁÑÕÉ”½½¹”½U¹‘½I•‘¼É•Á…¥È¸UÍ•È…Í­Ì…”É…‘¥…°I=U@İ¥Ñ )±¥¹•İ½É¬Õ‰”½É•µÉ••¸µå•±±½Ü™…•Ì°…ÕÑ½µ…Ñ¥Œ…•É½ÕÁÌ±½½¬°½É¥¥¹…°±•™Ğ±¥ÍĞ°)…¹¬¹Õµ‰•É•¹•ÜÉ½ÕÁÌ¸á¥ÍÑ¥¹œ‘½¬½ÍÑÉ½­”½…ÕÑ¡½É¥¹œ½Á…±•ÑÑ”É•µ…¥¸½İ¹•ÉÌ¸()…”É…‘¥…°¹½Ü¡…ÌÈĞÑ½½±Ì¸I=U@É•ÕÍ•Ì½É¥¥¹…°€™…•É½ÕÁ=Á•¹A…¥¹ĞÑ…É•Ğ)™½È¥¹Ù•¹Ñ½Éä‰ÕĞ±…Õ¹¡•Ì½É¥¥¹…°‘½¬M59Q%11d€¡¹¼¡¥‘‘•¸Y%\‰ÕÑÑ½¸±¥¬¤¸)%ĞÍ•±•ÑÌ½É¥¥¹…°…•É½ÕÁÌ±½½¬°±½Í•ÌY%\…¹½Á•¹ÌÍ…µ”±•™Ğ‘½¬½¹…µ”½±¥ÍĞ¼)A…¥¹Ğ½É…Í”½Í•±•Ñ•µ™…”¹½‘•Ì¸=É¥¥¹…°…ÕÑ¡½É¥¹œ•‘¥Ñ…‰±”µÑ…É•Ğ…Ñ”¥ÌÍ¡…É•)İ¥Ñ ÍÍ¥¸°¹½Ğ½Á¥•ì±½­•½É•™•É•¹”½±¥¹­•½±¥Ù”µµ½‘¥™¥•È½Ñ½½°µÍ•ÍÍ¥½¸½…Ñ¥Ù”´)‘É…œÑ…É•ÑÌÉ•™ÕÍ”¸½¹”ÍÑ½ÁÌ‰ÉÕÍ °Á…É­Ì½¹ÑÉ½±Ì…¹•µ¥ÑÌ½É¥¥¹…°…”¡Õˆ)½µÁ±•Ñ¥½¸½¹”ì…¹½Ñ¡•ÈÉ…‘¥…°Ñ½½°½Èµ½‘”½Í•ÍÍ¥½¸¡…¹”±½Í•ÌÑ¡”‘½¬¸()±°ÈÌÁÉ”µ•á¥ÍÑ¥¹œ…”Ñ…É•ÑÌ°±…‰•±Ì°¥½¹Ì°…¹±•Ì½É…‘¥¤…¹É½ÍÌµµ½‘”Í¡…É•)Á±…•µ•¹ÑÌÉ•µ…¥¸aQ1dÕ¹¡…¹•¸I=U@™¥ÑÌ‰•Ñİ••¸½É¥¥¹…°É¥¹Ì…ĞÌÌÃ
À¼)ÈÄØàİ¥Ñ ÜÑàØÀÑ…É•Ğ…¹½É¥¥¹…°ÌÉÁà¥½¸½Íµ…±°Ñ¥Ñ±”™½Éµ…Ğ¸Q¡É•”MYÕ‰”™…•Ì)É•½É••¸½å•±±½Üİ¥Ñ ±¥¡Ğ±¥¹•İ½É¬¸9•Ü‰ÕÑÑ½¸¡…Ì¹¼‰½Õ¹‘Ì½Ù•É±…Àİ¥Ñ …¹ä½±)‰ÕÑÑ½¸¸ÄØµÍ•Ñ½È½ÕÑ•ÈÉ•™±½Üİ…Ì½¹Í¥‘•É•‰ÕĞÉ•©•Ñ•‰•…ÕÍ”¥Ğ‘¥ÍÁ±…•)Í¡…É•É½ÍÌµµ½‘”Í±½ÑÌì¹½ĞÍ¡¥ÁÁ•¸9¼Õ¹É•±…Ñ•¥½¸É•Í­¥¸½ÈÁ½¥¹Ñ•È½İ¹•È¸()¬Á¥­ÌÕ¹¥ÅÕ”É½ÕÀ8°¥¹É•µ•¹Ñ¥¹œÁ…ÍĞÕÉÉ•¹Ğ½•á¥ÍÑ¥¹œ½‘É…™Ğ¹Õµ‰•ÉÌì…‘‘Ì)Í…™”½±½ÕÈ½¹…µ”É½Ü…¹…ÉµÌ½É¥¥¹…°A…¥¹Ğ¸½•Ì9=P¥µµ•‘¥…Ñ•±äÉ•…ÍÍ¥¸ÕÉÉ•¹Ğ)Í•±•Ñ¥½¸½ÈÉ•…Ñ”¡¥ÍÑ½Éä¸µÁÑäÉ½ÕÁÌ…É”U$‘É…™ÑÌÍ½Á•‰ä…ÑÕ…°½‰©•Ğ)¥‘•¹Ñ¥Ñä¥¸]•…­5…À°ÍÕÉÙ¥Ù¥¹œ‘½¬±½Í”½É•½Á•¸½½‰©•ĞÍİ¥Ñ¡•Ì¥¸Ñ¡¥ÌÍ•ÍÍ¥½¸¸)Q¡•ä…É”Í…Ù•½•áÁ½ÉÑ•=91d…™Ñ•ÈÁ…¥¹Ñ¥¹œ½ÈÍÍ¥¸Í•±•Ñ•Ñ¡É½Õ •á¥ÍÑ¥¹œ)™…•É½ÕÁÌµ•Ñ…‘…Ñ„¸U$•áÁ±¥¥Ñ±äÍ…åÌÁ…¥¹Ğ½…ÍÍ¥¸Ñ¼Í…Ù”ì¹¼¹•ÜÁÉ½©•ĞÍ¡•µ„¸)I•±½…½ÁÉ½©•ĞÉ•Á±…•µ•¹Ğ‘É½ÁÌÕ¹ÕÍ•‘É…™ÑÌ¸ÍÍ¥¹•É½ÕÁÌÉ•Ñ…¥¸½É¥¥¹…°)Á…±•ÑÑ”ì‘É…™ÑÌÁÉ•Ù¥•ÜÍÕ‰Í•ÅÕ•¹ĞÍÁ…•½±½ÕÉÌÙ¥„M5Á…±•ÑÑ”¡•±Á•È¸A…¥¹Ñ¥¹œ)½ÕĞ½˜‘É…™Ğ½É‘•ÈÉ•™É•Í¡•ÌÍİ…Ñ¡•ÌÑ¼…ÑÕ…°µ•Í µ½É‘•È½±½ÕÉÌ€¡¹½Ğ™¥á•)ÕÍ•Èµ¡½Í•¸É½ÕÀ½±½ÕÉÌ¤¸A…±•ÑÑ”½É•Í••½¹ÑÉ½±ÌÉ•µ…¥¸¥¸Y%\¸M…™”¹…µ•Ì…¹)¥¹Ñ••Èµ±¥µ¥Ğ¹Õµ‰•É¥¹œÑ•ÍÑ•ì¹¼!Q50¥¹Í•ÉÑ¥½¸½µ½‘•°½UX½µ…Ñ•É¥…°½Á…¥¹Ğ¡…¹•Ì¸()Y…±¥‘…Ñ¥½¸ÄØÔÑ…É•Ñ•AML¼Á%0¼ÁÍ­¥À€¡øÄ¸İÌ¤°¥¹±Õ‘¥¹œà¹•Ü‘É…™Ğ½É•…°µ½¹ÑÉ½°¼)Í•µ…¹Ñ¥ŒÉ…‘¥…°½É•…°‘½¬½¹”Ñ•ÍÑÌ°…±°•á¥ÍÑ¥¹œ…•É½ÕÀ‘…Ñ„½Á…±•ÑÑ”½‰ÉÕÍ ¼)•É…Í•È½…ÕÑ¡½É¥¹œ½Í•±•Ñ½È½‘½¬°É…‘¥…°µ½‘•Ì½Í¡…É•Á½Í¥Ñ¥½¹Ì°…•ÁÑ•ääĞá…Ğ¼)9=4°…¹É•Ù¥•İ•É•±•…Í”½¹ÑÉ…ÑÌ¸±°ÈĞ•µ‰•‘‘•…”MYÌÁ…ÉÍ”ìÍå¹Ñ…à…¹)‘¥™˜±•…¸¸á¥ÍÑ¥¹œÜÀä…”½Õ¹ĞÈÏŠHÈĞ¥ÌÍ½±”É…‘¥…°½¹ÑÉ…Ğ•áÁ…¹Í¥½¸ì½É¥¥¹…°)½ÕÑ•ÈÄ×\ÈÓ
À…¹Í¡…É•‘”½Y•ÉÑ•àÍ±½ÑÌÍÑ…äÁÉ½Ñ•Ñ•¸A¥­•È½‘½¬™¥áÑÕÉ•Ì…‘…ÁÑ•)Ñ¼Ñ¡”½É¥¥¹…°Í¡…É•½Á•¸½İ¹•È…¹‘É…™Ğ…‘…ÁÑ•Èİ¥Ñ¡½ÕĞ‘É½ÁÁ¥¹œÍ½ÕÉ”½Í•±•Ñ¥½¸¼)É•™ÕÍ…°¡•­Ì¸9¼™Õ±°µÍÕ¥Ñ”½É•¹‘•É•µ‰É½İÍ•È½¹…Ñ¥Ù”¥A…ÁÉ½½˜±…¥µ•¸()¡…¹•ÉÕ¹Ñ¥µ”è½É¥¥¹…°É•¹‘•Èµµ½‘•Ì°Íµ…±°‘É…™ÑÌ¡•±Á•È°½É¥¥¹…°±¥ÍĞ…¹Í¡…É•)•‘¥Ñ…‰±”µ…ÕÑ¡½É¥¹œ…Ñ”ìÍÑÉ½­”¡…¹•Ì¥µÁ½ÉĞÁ¥¸=91d¸Q½Ñ…°¥éµ¼¡…¹•Ì½¹”)‰ÕÑÑ½¸½…Ù…¥±…‰¥±¥Ñä½Í•µ…¹Ñ¥Œ±…Õ¹ ½½µÁ±•Ñ¥½¸¸I•Ù¥•İ•Í¡•±°½É•¹‘•È½ÍÑÉ½­”½…ÕÑ¡½È¼)±¥ÍĞ½‘É…™ÑÌ½¥éµ¼½¥½¸½É•½Ù•ÉäääÔ…¡”±½ÍÕÉ”¸…•É½ÕÀÁ…±•ÑÑ”ääÈ…¹¹…Ñ¥Ù”9=4ääĞ°(ääÌá…Ğ°µ…¥¸½5Õ±Ñ¤Ä¸À½UX½A…¥¹Ğ½•½µ•ÑÉä½™É½é•¸‰åÑ•ÌÕ¹¡…¹•¸()I¥¡Ğµ¡…¹É•¹‘•É¥¹œ¥ÍÍÕ”ÍÑ…åÌ=A8¸I•Ù¥•İ•±…Ñ•ÍĞääÈ…ÁÑÕÉ”èY%\¹…Ñ¥Ù”½Á•¸¼)±½Í”…¹•áÁ±¥¥Ğé•É¼µÍ¥é•±½Í•Á…¹•°İ½É¬ì…¹Ù…Ì¡¥‘”‘¥¹½ĞÉ•ÍÑ½É”É¥¡ÑU$ì)ÍÑå±•Ì½¡¥ĞÍÑ…­Ì…¹¹½Ğ•ÍÑ…‰±¥Í Ù¥Í¥‰±”Á¥á•±Ì¸Q¡¥Ì‰Õ¥±…‘‘Ì‘¥É•Ğ1P‘½¬)…•ÍÌ‰ÕĞ=L9=P±…¥´„½µÁ½Í¥Ñ½È½É¥¡Ğµµ•¹ÔÉ•Á…¥È¸I•Ñ…¥¸•á¥ÍÑ¥¹œ‘¥…¹½ÍÑ¥Ì)…¹ÕÍ•È¥±”I•™É•Í ‘¥ÍÁ±…äì‘¼¹½ĞÉ•Á•…ĞÁÉ½Ù•¸µ¥¹ÍÕ™™¥¥•¹Ğ‰±ÕÈ½±½Í•µ‘•Ñ…¥±Ì¼)…¹Ù…Ìµ½¹±ä•áÁ±…¹…Ñ¥½¹Ì½È™½É”…¹½Ñ¡•È¥‘•¹Ñ¥…°‘ÕµÀ¸ÕÉÑ¡•ÈÉ•¹‘•É¥¹œİ½É¬)É•ÅÕ¥É•ÌÙ¥Í¥‰±”…™™•Ñ•É•¥½¸½ÍÑÉÕÑÕÉ…°É•ÁÉ½‘ÕÑ¥½¸°¹½ĞÍÁ•Õ±…Ñ¥Ù”ML¡ÕÉ¸¸()ÕÉÉ•¹ĞÉÕ¹Ñ¥µ”½ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”±¥Ù•Ì¥¸‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ääÔ¹µ€¡½µµ¥Ğ½ÑÉ•”°)A…•Ì½±¥Ù”¡•­Ì…¹¡½ÍÑ•ÍÑ…ÑÕÌ¤ì½¹ÍÕ±Ğ¥Ğ‰•™½É”‘•ÍÉ¥‰¥¹œÁÕ‰±¥…Ñ¥½¸¸)MÑ…¹‘¥¹œÕÍ•ÈÁÕÍ ½ÁÕ‰±¥Í …ÁÁÉ½Ù…°É•µ…¥¹Ì…Ñ¥Ù”ì‘¼¹½Ğ…Í¬……¥¸¸)Y%ääÔè…”Í•±•ÓŠIÉ…‘¥…°I=U@Õ‰”ì…ÕÑ¼…•É½ÕÁÌ±½½¬€¬½É¥¥¹…°1P)±¥ÍĞ¸¬Ñİ¼¹•Ü¹Õµ‰•É•É½İÌ½‘¥™™•É•¹ĞÍİ…Ñ¡•Ì°Á…¥¹Ğ•… ½•É…Í”ìU¹‘½I•‘¼½¹”)ÍÑ•ÀÁ•ÈÍÑÉ½­”¸½¹—ŠIÉ…‘¥…°……¥¸ì½É‘¥¹…Éä…”á…Ğ…¹™¥¹•È¹…Ù¥…Ñ¥½¸¸)M…Ù•=Á•¸Á…¥¹Ñ•É½ÕÁÌìÕ¹ÕÍ•‘É…™ÑÌ…É”¥¹Ñ•¹Ñ¥½¹…±±ä¹½ĞÍ…Ù•¸]…Ñ É¥¡ĞY%\)µ•¹ÔÍ•Á…É…Ñ•±äì¥˜É•ÕÉÉ•¹”°ÍÉ••¹Í¡½Ğ½¥‘•¹Ñ¥™äÙ¥Í¥‰±”…É•„°¹¼™½É•É•É•…Ñ¥½¸¸)9•áĞ™½±±½Ü¹…Ñ¥Ù”ääÔ™••‘‰…¬ì™…•É½ÕÀµÍ•…´UX½µ…Ñ•É¥…°İ½É¬É•µ…¥¹Ì‘•™•ÉÉ•¸((ŒŒ€¸ääØƒŠP¥±”µ•¹Ô…ÉÉ…¹•µ•¹Ğ™É½´ÕÍ•È¥µ…”ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•ÅÕ•ÍÑÌ¥±”µ•¹Ô½É‘•È½™½Éµ…Ğ™É½´…ÑÑ…¡•%5|àÌÌä¹Á¹œ¸Õ‘¥Ñ•ÕÉÉ•¹Ğ)µ…¥¸ĞÑ‘ˆÁˆå˜½ÉÕ¹Ñ¥µ”ääÔ°•á¥ÍÑ¥¹œÍ¡•±°½¥±”½•áÁ½ÉĞ½ÁÉ½©•Ğ½‘•‰Õœ¥¹ÍÑ…±±•ÉÌ…¹)Ù¥•İÁ½ÉĞµ½¹Ñ…¥¹•µ•¹ÔÍÑå±•Ì¸9¼ääÔAML¥¹™•ÉÉ•ìääĞAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•¸()¥±”µ•¹Ô¹½Ü¡…Ì™½ÕÈÍ•µ…¹Ñ¥ŒÍ•Ñ¥½¹Ì¥¸É•ÅÕ•ÍÑ•½É‘•Èè½É¥¥¹…°=Á•¸€¹‰½á±…ˆ)™É½´¥±•Ì…¹M…Ù”€¹‰½á±…ˆì%µÁ½ÉĞ€¡‘¥Ñ…‰±”½I•™•É•¹”°ÍÁ±¥ĞÉ½ÕÁÌ°¥µÁ½ÉĞ¤ì)áÁ½ÉĞ€¡™¥±•¹…µ”°½Éµ…Ğ=	(½1°•½µ•ÑÉä	…Í”½MÕ‰°áÁ½ÉĞ½M…Ù”°9=5¤ìÕÑ¥±¥Ñ¥•Ì(¡!½µ”MÉ••¸°I•Í•Ğ°U$•‰Õœ°I•™É•Í ‘¥ÍÁ±…ä°¡•¬ÁÉ½©•ĞÍ¹…ÁÍ¡½Ğ¤¸M¡•±°)ÍÕÁÁ±¥•Ì¹…µ•Í±½ÑÌì½É¥¥¹…°ÁÉ½©•Ğ½‘•‰Õœ¥¹ÍÑ…±±•ÉÌ…ÁÁ•¹M5½É¥¥¹…°‰ÕÑÑ½¹Ì°)¥¹ÁÕÑÌ½ÍÑ…ÑÕÌ¹½‘•Ì½±¥ÍÑ•¹•ÉÌÑ¡•É”İ¥Ñ •á¥ÍÑ¥¹œµ¡½ÍĞ™…±±‰…­Ì¸9¼±½¹¥¹œ°Í•½¹)µ•¹Ô½¡…¹‘±•È°½‰Í•ÉÙ•ÉÌ°­•å‰½…É½Ñ…ˆµ½É‘•ÈMLÑÉ¥­Ì½È¹•ÜÍ…Ù”½•áÁ½ÉĞ½İ¹•ÉÌ¸)=É¥¥¹…°EÕ¥¬=	(…¹1…ˆ±¥¹¬¹½‘•ÌÉ•µ…¥¸¡¥‘‘•¸™½È±•…ä½İ¹•ÉÌì‘ÕÁ±¥…Ñ”)EÕ¥¬=	(½1…ˆ•¹ÑÉä¥Ì½µ¥ÑÑ•™É½´Ù¥Í¥‰±”É•ÅÕ•ÍÑ•µ•¹Ô¸()M½Á•™¥±”µµ•¹Ô¹ÍÌ¥Ù•Ì½¹Í¥ÍÑ•¹ĞÍ•Ñ¥½¸ÉÕ±•Ì½…ÁÌ½ÕÁÁ•É…Í”¡•…‘¥¹Ì°ÌÈÁÁà)Ù¥•İÁ½ÉĞµ‰½Õ¹‘•İ¥‘Ñ °ÌÙÁà…Ñ¥½¸Ñ…É•ÑÌ°ÌÉÁàÍ•µ•¹Ñ•½¹ÑÉ½±Ì°…±¥¹•™¥±•¹…µ”)™¥•±…¹É•…‘…‰±”ÄÉÁàÑ•áĞ¸5…àµ¡•¥¡ĞÑÉ…­Ì½É¥¥¹…°Ñ½Á‰…È½Í…™”…É•„ìÙ•ÉÑ¥…°)ÍÉ½±°½Ñ½Õ µÁ…¸½½Ù•ÉÍÉ½±°½¹Ñ…¥¹µ•¹ĞÉ•µ…¥¸¸!¥‘‘•¸…ÑÑÉ¥‰ÕÑ•Ì¡½¹½É•ì•µÁÑä)Í±½ÑÌ½ÍÑ…ÑÕÌ‘¼¹½Ğ±•…Ù”…ÁÌ¸9¼¹•Ü‰±ÕÈ½™¥±Ñ•È½ÑÉ…¹Í™½É´½½¹Ñ…¥¸½½µÁ½Í¥Ñ½È¡¥¹Ğ¸)=Ñ¡•ÈU$ÍÑå±•ÌÕ¹¡…¹•¸Q¡¥Ì‘½•Ì¹½ĞÉ•Á…¥ÈÉ•ÕÉÉ¥¹œÉ¥¡ĞµÉ•¥½¸É•¹‘•É¥¹œ¸()IÕ¹Ñ¥µ”¡…¹•Ì½¹±äÍ¡•±°½±…å½ÕĞÍÑå±•Í¡••Ğ…¹½É¥¥¹…°½‰©•Ğµµ…¹…•µ•¹Ğ½‘•‰Õœ)¥¹ÍÑ…±±•È‘•ÍÑ¥¹…Ñ¥½¹Ì¸AÉ½©•Ğ½‘•Œ½¡¥ÍÑ½Éä½Í…Ù”½½Á•¸½•½µ•ÑÉä½Í•±•Ñ¥½¸°•áÁ½ÉĞ¼)9=4½Á…¥¹Ğ½UX¼ääÔ…•É½ÕÀ¼ääÌá…Ğ½5Õ±Ñ¤Ä¸À½™É½é•¸Õ¹¡…¹•¸I•Ù¥•İ•ääØÍ¡•±°½¹•Ü)ML½ÁÉ½©•Ğµ¥¹ÍÑ…±±•È½‘•‰Õœ½É•½Ù•ÉäÁ¥¹Ì…¹…ÍÍ•Ğ¡…Í¡•Ìì¥¹Ñ•É¹…°ÍÑ…µÁÌÉ•Ñ…¥¹•¸)±°½É¥¥¹…°¥±”…Ñ¥½¸½¥¹ÁÕĞ%ÌÉ•Ñ…¥¹•½¹”¸!Q50Í•Ñ¥½¹Ì½½É‘•È½Õ¹¥ÅÕ”%Ì)¡•­•¸á¥ÍÑ¥¹œÔÀµ•¹Ô¥¹ÁÕĞ½½¹™¥œ½¹…µ”½±…å½ÕĞ½Ñ½½±‰…È½ÁÉ½©•Ğ=Á•¸½1½Á…¥¹Ğ¼)‘¥ÍÁ±…äµÉ•™É•Í ½É•±•…Í”¡•­ÌAML¼Á%0¼ÁÍ­¥À€¡øÄ¸ÄÉÌ¤ì)LÍå¹Ñ…à½‘¥™˜±•…¸¸9¼)¹•Ü½Íµ•Ñ¥ŒÑ•ÍÑÌ½È™Õ±°µÍÕ¥Ñ”½¹…Ñ¥Ù”É•¹‘•É•ÁÉ½½˜±…¥µ•¸AÕ‰±¥…Ñ¥½¸½µµ¥Ğ¼)ÑÉ•”½±¥Ù”•Ù¥‘•¹”¥ÌÉ•½É‘•¥¸‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ääØ¹µ‰•™½É”½µÁ±•Ñ¥½¸¸()Y%ääØè¥±”Í¡½İÌ=Á•¸½M…Ù”™¥ÉÍĞ°Ñ¡•¸%µÁ½ÉĞ½áÁ½ÉĞ½ÕÑ¥±¥Ñ¥•Ì…Ì¥µ…”ìÍÁ…¥¹œ°)™¥±•¹…µ”½Í•µ•¹Ñ•½¹ÑÉ½±ÌÉ•…‘…‰±”¸MÉ½±°Ñ¼‰½ÑÑ½´¥¸±…¹‘Í…Á”…¹Á½ÉÑÉ…¥Ğ¸)M…Ù”½=Á•¸„Ñ•ÍĞ€¹‰½á±…ˆì¥µÁ½ÉĞ½•áÁ½ÉĞ…¹9=5½É¥¥¹…°…Ñ¥½¹ÌìI•™É•Í ‘¥ÍÁ±…ä)ÍÑ¥±°…Ù…¥±…‰±”¸¼¹½ĞÉ•Í•Ğ„İ½É­¥¹œµ½‘•°Ñ¼Ñ•ÍĞÍÑå±¥¹œ¸I¥¡Ğµµ•¹ÔÉ•¹‘•É¥¹œ)É•µ…¥¹Ì=A8ìääÔ…•É½ÕÀ‘•Ù¥”…•ÁÑ…¹”ÍÑ¥±°Á•¹‘¥¹œ¸MÑ…¹‘¥¹œÁÕ‰±¥…Ñ¥½¸)…ÁÁÉ½Ù…°É•Ñ…¥¹•¸9•áĞ™½±±½ÜääØµ•¹Ô½¥A…ÍÁ…¥¹œ…¹ääÔÑ½½°™••‘‰…¬¸((ŒŒ€¸ääÜƒŠP•áÑ•É¹…°½É¥¥¹…°Y%\ÍÕÉ™…”ì€¸ääØÕÍ•ÈAMLƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈääØAMLÁÉ½Ñ•ÑÌ…ÉÉ…¹•¥±”µ•¹Ô°½É¥¥¹…°…Ñ¥½¹Ì…¹ÍÁ…¥¹œ¸UÍ•È¹½Ü)¥‘•¹Ñ¥™¥•Ì…™™•Ñ•ÍÕÉ™…”ÁÉ•¥Í•±äèY%\½ÕÑ•È™É…µ”Ñ½±•Ì‰ÕĞ¥ÑÌ½¹Ñ•¹ÑÌ)¹•Ù•È‘É…Ü¸I•Á½ÉĞääØ…ĞÀÜèĞÄèÀÙhÍ¡½İÌ½Á•¸ĞÌÈàä¼ĞÜÈÔÔ°±½Í•ĞÔÌÀÌ¼ÔĞäÜÜ¸=Á•¸)Á…¹•°ääà¼ØØ¼ÌØÀ¼àÄÄ¸äàĞ±ÍÉ½±±!•¥¡ĞäàÀ½±¥•¹Ñ!•¥¡ĞàÄÀì…ÑÕ…°Í…ÑÕÉ…Ñ¥½¸½±¥¡Ñ¹•ÍÌ¼)É•Í•Ğ½¹ÑÉ½±Ì¡…Ù”¹½Éµ…°±…å½ÕĞ‰½Õ¹‘Ì¸±½Í•‘¥ÍÁ±…å¹½¹”½é•É¼‰½Õ¹‘Ìİ½É­Ì¸)Q¡¥Ì¥Ì‘É…İ¸µ½¹Ñ•¹Ğ™…¥±ÕÉ”°¹½ĞÁÉ½½˜½˜µ¥ÍÍ¥¹œ¹½‘•Ì½È„™…¥±•¹…Ñ¥Ù”Ñ½±”¸)É½ÕÀµ±¥ÍĞ¹Õ±°½ÁÑ¥½¹½Õ¹Ğ½¥¹‘•à¥Ì•áÁ•Ñ•%X±¥ÍĞì¡¥‘‘•¸¥éµ¼¥¸Ñ¡¥Ì…ÁÑÕÉ”)¥Ì¹½Ğ•Ù¥‘•¹”½˜¥éµ¼Á…¥¹Ñ¥¹œ™…¥±ÕÉ”¸¼¹½ĞÉ•ÅÕ•ÍĞ…¹½Ñ¡•È¥‘•¹Ñ¥…°É•Á½ÉĞ¸()UÍ•È…‘‘Ì„ÕÍ•™Õ°¡É½¹½±½ä±Õ”èÕÉÉ•¹ĞÉ¥¡ĞY%\ÑÉ½Õ‰±”Í••µ•Ñ¼ÍÑ…ÉĞİ¡•¸)…•É½ÕÀ¥Ñ•µÌİ•É”…‘‘•¸…•É½ÕÀ½¹ÑÉ½±ÌÉ½ÜY%\™É½´•…É±¥•ÈMÑÕ‘¥¼ÜÔÑÁà)½¹Ñ•¹ĞÑ¼äàÁÁà…¹…Ñ¥Ù…Ñ”½Ù•É™±½Ü…ĞàÄÁÁà¸Q¡…ĞÁ½¥¹ÑÌÑ¼Ñ¡”™¥á•ÍÉ½±±¥¹œ)ÍÕÉ™…”¥¹Í¥‘”¹…Ñ¥Ù”‘•Ñ…¥±Ì…Ì„Á±…ÕÍ¥‰±”ÑÉ¥•Èì¥Ğ¥Ì9=P•¹¥¹”½É½½Ğµ…ÕÍ”)ÁÉ½½˜…¹‘½•Ì¹½ĞÉ•İÉ¥Ñ”½±‘•ÈäØØ¬É¥¡ĞµÉ•¥½¸É•Á½ÉÑÌ…Ì…±°ÍÑ…ÉÑ¥¹œ…ĞäàĞ¸()á¥ÍÑ¥¹œY%\Á…¹•°¥Ì„™¥á•½Ù•É™±½İ¥¹œ‘¥É•Ğ¡¥±½˜¹…Ñ¥Ù”€ñ‘•Ñ…¥±Ìø°İ¡½Í”)‰É½İÍ•Èµ‘¥Í±½Í•½¹Ñ•¹ÑÌ¡…Ù”„Í•Á…É…Ñ”Ù¥Í¥‰¥±¥Ñä½Á…¥¹Ñ¥¹œ±¥™•å±”¸9•ÜÍµ…±°)Ù¥•Üµµ•¹ÔµÍÕÉ™…”µ½Ù•ÌÑ¡…ĞM5Á…¹•°=9Õ¹‘•È€…ÁÀ°½ÕÑÍ¥‘”¹…Ñ¥Ù”‘¥Í±½ÍÕÉ”)…¹¡•…‘•È±¥ÁÁ¥¹œ½ÍÑ…­¥¹œ…¹•ÍÑÉä¸=É¥¥¹…°¹…Ñ¥Ù”€Ù¥•İ5½‘•Ì‘•Ñ…¥±Ì¹½Á•¸¥Ì)MQ%10Í½±”½Á•¸ÍÑ…Ñ”¸=¹”…ÑÑÉ¥‰ÕÑ”µ™¥±Ñ•É•5ÕÑ…Ñ¥½¹=‰Í•ÉÙ•Èµ¥ÉÉ½ÉÌÕÉÉ•¹Ğ½Á•¸)¥¹Ñ¼•áÁ±¥¥ĞÁ…¹•°¹¡¥‘‘•¸…¹ÍÕµµ…Éä…É¥„µ•áÁ…¹‘•½½¹ÑÉ½±Ì¸9¼‘ÕÁ±¥…Ñ”Ñ½±”°)½Á•¸‰½½±•…¸°¹•ÜÉ…ÜµÁ½¥¹Ñ•È½İ¹•È°Í•½¹Á½ÁÕÀ½½¹Ñ•¹Ğ½Áä½È…ÕÑ½µ…Ñ¥ŒÉ•Á…¥¹Ğ¸)±½Í••áÑ•É¹…°Á…¹•°¥Ì‘¥ÍÁ±…å¹½¹”½é•É¼µ±…å½ÕĞ™É½´•…É±äÍ¡•±°ÍÑå±•Í¡••Ğ½¹İ…É¸)á¥ÍÑ¥¹œ™¥á•Á½Í¥Ñ¥½¸½İ¥‘Ñ ½µ…àµ¡•¥¡Ğ½ÍÉ½±°½Ñ½Õ ÍÑå±•ÌÉ•µ…¥¸ìÍÉ½±°½™™Í•Ğ)É•ÍÑ½É•Ì½¸É•½Á•¹¥¹œ¸M…µ”=4%Ì½Ù…±Õ•Ì½±¥ÍÑ•¹•ÉÌÉ•µ…¥¸¸I•¡å‘É…Ñ¥½¸‘•Ñ•ÑÌ)•áÑ•É¹…°Á…¹•°É…Ñ¡•ÈÑ¡…¸É•É•…Ñ¥¹œ½¹Ñ•¹ÑÌ¸-•å‰½…ÉQ…ˆ½ÉÉ½İ½İ¸™É½´½Á•¸)ÍÕµµ…Éä•¹Ñ•ÉÌÁ…¹•°ìM¡¥™ÑQ…ˆÉ•ÑÕÉ¹Ì°Í…Á”±½Í•Ì¹…Ñ¥Ù”½İ¹•È½É•ÑÕÉ¹Ì™½ÕÌ¸()=É¥¥¹…°Ù¥•Üµµ½‘•Ì±¥¬½Á½¥¹Ñ•ÉÕÀ‘•±•…Ñ¥½¸¹½Ü‰¥¹‘Ì½É¥¥¹…°•áÑ•É¹…°Á…¹•°ì)•á¥ÍÑ¥¹œÍå¹Ñ¡•Í¥é•µ±¥¬ÍÕÁÁÉ•ÍÍ¥½¸É•Ñ…¥¹•¸=ÕÑÍ¥‘”µ±½Í”…•ÁÑÌ	=Q ÑÉ¥•È)…¹Á…¹•°ì…Ñ¥Ù”µÙ¥•Ü¡¥¡±¥¡Ñ¥¹œÍ•…É¡•ÌÍÑ…‰±”Á…¹•°%¸±•…¸Y¥•ÜÕÍ•Ì¹•Ü)%İ¥Ñ ±•…ä™…±±‰…¬°ÁÉ•Í•ÉÙ¥¹œ½É¥¥¹…°½Ù•É±…ä½İ¹•È¸U$•‰ÕœÍ…µÁ±•Ì¹•Ü(Ù¥•İ5½‘•ÍA…¹•°…¹Á…É•¹Ñ%°É•Ñ…¥¹¥¹œ•á¥ÍÑ¥¹œ½¹ÑÉ½±Ì½µ½‘”½ÍÉ½±°½Ñ½±”•Ù¥‘•¹”¸)9¼…¹Ù…Ì½É•¹‘•É•È½…Ñµ½ÍÁ¡•É”½A…¥¹Ğ½UX½™…•É½ÕÀ½•½µ•ÑÉä½¡¥ÍÑ½Éä½5Õ±Ñ¤Ä¸À¡…¹•Ì¸)¥±”ääØÍÑå±•Í¡••Ğ…¹™Õ¹Ñ¥½¹…°½İ¹•ÉÌÕ¹¡…¹•¸Q¡¥Ì¥Ì„Ñ…É•Ñ•ÍÑÉÕÑÕÉ…°)É•Á…¥ÈÉ•ÅÕ¥É¥¹œ¹…Ñ¥Ù”™••‘‰…¬°9=P„ÁÉ½Ù•¸Á•Éµ…¹•¹Ğ]•‰-¥Ğ½É½½Ğµ…ÕÍ”É•Á…¥È¸()I•Ù¥•İ•…¡”±½ÍÕÉ”èÙ¥•Üµµ½‘•ÏŠI¹•ÜÍÕÉ™…”ääÜì±•…¸Y¥•ßŠI…”İ½É­™±½ßŠI‘É…İ•È(ääÜì‘•‰Õœ½•…É±äÑ½½±‰…È½Í¡•±°½É•½Ù•ÉäääÜ¸É…İ•È…±Í¼…±¥¹Ì¥ÑÌÍÑ…±”ÁÉ½©•Ğ´)¥¹ÍÑ…±±•È¡¥±­•ääÌàÑ¼…•ÁÑ•Í¡•±°ääØ°…Ù½¥‘¥¹œ½µÁ•Ñ¥¹œ…¡•¥¹ÍÑ…±±•È)Ù•ÉÍ¥½¹Ìì¹¼¹•ÜÁÉ½©•Ğ¥¹ÍÑ…±±•È½‘”¸á¥ÍÑ¥¹œ½±¥¹Ñ•É¹…°ÍÑ…µÁÌÉ•Ñ…¥¹•¸()¥¹…°äÌ™½ÕÍ•AML¼Á%0¼ÁÍ­¥À€¡øÀ¸ÜÕÌ¤èÜ¹•ÜÍÕÉ™…”¥‘•¹Ñ¥Ñä½½‰Í•ÉÙ•È½¥‘•µÁ½Ñ•¹”¼)½…±•Í•ÍÑ…Ñ”½ÍÉ½±°½¥¹Í¥‘”µ½ÕÑÍ¥‘”…Ñ¥Ù…Ñ¥½¸½A•¹¥°ÍÕÁÁÉ•ÍÍ¥½¸½­•å‰½…ÉÑ•ÍÑÌ°)½É¥¥¹…°ÍÑ…ÉÑÕÀÑ½½±‰…È½É…µ•±°½µ•¹Ô½±•…¸Y¥•Ü½…•É½ÕÀ½‰ÉÕÍ ½‘½¬½¥±”½‘•‰Õœ¼)‘¥ÍÁ±…ä½É•±•…Í”½¹ÑÉ…ÑÌ¸)LÍå¹Ñ…à…¹‘¥™˜±•…¸¸Y¥•ÜÍÉ½±°Ñ•ÍĞÁ…ÉÍ•È¹½Ü)Í•±•ÑÌ¥ÑÌÑİ¼µ…àµ¡•¥¡Ğµ‰•…É¥¹œ‰…Í”½µ•‘¥„ÉÕ±•Ì¥¹ÍÑ•…½˜…±Í¼½Õ¹Ñ¥¹œääÀÌ)±½Í•‘•Í•¹‘…¹Ğµ‘¥ÍÁ±…äÍ•±•Ñ½Èì…±°¡•¥¡Ğ½½Ù•É™±½Ü…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•°…¹(ääÜ¡…Ì•áÁ±¥¥Ğ±½Í•µÍÕÉ™…”½Ù•É…”¸9¼ML½É•¹‘•É•½¹…Ñ¥Ù”½™Õ±°µÍÕ¥Ñ”ÁÉ½½˜)±…¥µ•™É½´½¹ÑÉ½±±•=4Ñ•ÍÑÌ¸1…Ñ•È¡½ÍÑ•ÍÑ…ÑÕÌ…¹•á…ĞÁÕ‰±¥…Ñ¥½¸½±¥Ù”)ÁÉ½½˜É•½É‘•¥¸‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ääÜ¹µì½¹ÍÕ±Ğ‰•™½É”‘•ÍÉ¥‰¥¹œ‘•±¥Ù•Éä¸()Y%ääÜè™É•Í ääÜ½Á•¸Y%\è‘¥É•Ñ¥½¹Ì½±½½­Ì½½¹ÑÉ½±ÌµÕÍĞÙ¥Í¥‰±ä‘É…Ü°¹½Ğ½¹±ä)™É…µ”¸½µÁ…É”MÑÕ‘¥¼…¹…•É½ÕÁÌ€¡½Ù•É™±½Ü…Í”¤ìÍÉ½±°Ñ¼‰½ÑÑ½´°Ñ½±”±½½­Ì)…¹É•½Á•¸İ¥Ñ ™¥¹•È½A•¹¥°¸±½Í”Y%\Ù¥„ÑÉ¥•È½½ÕÑÍ¥‘”Ñ…Àì½Á•¸¥±”…¹)É•ÑÕÉ¸¸…”É…‘¥…°I=U@ÍÑ¥±°½Á•¹Ì½É¥¥¹…°±•™Ğ‘½¬¸½¹™¥É´İ¥Ñ¡½ÕĞ…ÁÀ´)Íİ¥Ñ ½I•™É•Í ‘¥ÍÁ±…äİ½É­…É½Õ¹¸€¸ääØAML¥ÌÁÉ½Ñ•Ñ•ìääÔ…•ÁÑ…¹”¹½Ğ¥¹™•ÉÉ•¸)ÕÉÉ•¹ĞY%\Á¥á•°…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œì‰É½…‘•È¡¥ÍÑ½É¥…°É¥¡ĞµÉ•¥½¸¥ÍÍÕ”)ÍÑ…åÌ=A8Õ¹Ñ¥°¹…Ñ¥Ù”™••‘‰…¬¸9•áĞ…ÍÍ•ÍÌääÜ¥A…É•ÍÕ±Ğ‰•™½É”µ½É”É•¹‘•É¥¹œ)¡…¹•Ì½È™…•É½ÕÀµÍ•…´UX½µ…Ñ•É¥…°İ½É¬¸MÑ…¹‘¥¹œÁÕÍ ½ÁÕ‰±¥Í …ÁÁÉ½Ù…°…ÁÁ±¥•Ì¸((ŒŒ€¸ääÜ¥¹¥Ñ¥…°MÑÕ‘¥¼ÍÕ•ÍÌì…•É½ÕÁÌÑÉ…¹Í¥Ñ¥½¸É•µ…¥¹Ì=A8ƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈèƒŠqY¥•Üİ½É­ÌÉ•…Ğ€´Ñ¡•É”¥ÌÍÑ¥±°„Á…Ñ ½¸Ñ¡”É¥¡ĞÑ¡…ĞÌ¡¥‘¥¹œÑ¡”)¥éµ¼½¹Ñ•¹ÑÌ»Št•ÁĞ½ÁÉ½Ñ•ĞääÜY%\É•¹‘•É¥¹œÉ•Á…¥ÈÍÁ•¥™¥…±±äì‘¼¹½Ğ¥¹™•È)‰É½…É¥¡ĞµÉ•¥½¸½¥éµ¼…•ÁÑ…¹”¸-••ÀääØ¥±”µ•¹ÔAML…¹ääĞ…•ÁÑ…¹”¸()9•ÜääÜÉ•Á½ÉĞÀàèÀĞèÔÌ¸ÄÄÁhèMÑÕ‘¥¼½…”°Ù¥•İÁ½ÉĞÄÌØÙàààØ±AHÈ±…¹Ù…ÌÈÜÌÉàÄØÔÈ°)½¹ÑÉ½±Ì•¹…‰±•°¹¼Ñ½½°Í•ÍÍ¥½¸½Ñ•áÑÕÉ”A…¥¹Ğ°…¹Ù…ÍAÉ½‰•¡¥‘‘•¹™…±Í”¸¥¹…°Y%\)±½Í•°•áÑ•É¹…°€Ù¥•İ5½‘•ÍA…¹•°Á…É•¹Ñ…ÁÀ½¡¥‘‘•¸½‘¥ÍÁ±…å¹½¹”½é•É¼‰½Õ¹‘Ì°Í¼¹¼)É•Ñ…¥¹•±½Í•Y%\É•Ñ…¹±”¥Ì•ÍÑ…‰±¥Í¡•…Ğ…ÁÑÕÉ”¸Ñ½Ñ…±¥éµ¼•áÁ±¥¥Ñ±ä)¡¥‘‘•¸½‘¥ÍÁ±…å¹½¹”½é•É¼‰½Õ¹‘ÌÑ½¼èÑ¡¥ÌÉ•Á½ÉĞ‘½•Ì9=P…ÁÑÕÉ”„Ù¥Í¥‰±”Á…ÉÑ±ä)±¥ÁÁ•¥éµ¼¸¼¹½ĞÑÉ•…ĞÑ¡…Ğ¥¹Ñ•¹Ñ¥½¹…°¡¥‘‘•¸ÍÑ…Ñ”…ÌÍÁ…Ñ¥…°±¥ÁÁ¥¹œÁÉ½½˜¸)MÑÕ‘¥¼…Ñµ½ÍÁ¡•É”¥Ì…Ñ¥Ù”°½Á…¥ÑäÄ½µÕ±Ñ¥Á±ä°‰ÕĞÑ¡¥Ì…±½¹”‘½•Ì¹½ĞÁÉ½Ù”¥Ğ)…ÕÍ•ÌÑ¡”Á…Ñ €¡½±‘•ÈÉ•Á½ÉÑÌ¥¹±Õ‘•¹½¸µMÑÕ‘¥¼½½Á…¥ÑäÀ™…¥±ÕÉ•Ì¤¸!•…±Ñ¡ä)É¥¡ĞµÑ½½±‰…È±…å½ÕĞ½¡¥ÑÌÉ•µ…¥¸¹½¸µÁ¥á•°•Ù¥‘•¹”¸()Q½±”µÑ¥µ”É•½É‘Ì…ĞÈäØÈä¼ĞÌÈØÈ¼ĞĞÌÄÌÍ¡½Ü½Á•¹QIUİ¥Ñ Á…¹•±¡¥‘‘•¹QIUì±½Í•Ì(ĞÈÄĞÀ¼ĞÌàÀĞ¼ĞĞàÈÜÍ¡½ÜÁÉ•Ù¥½ÕÌÙ¥Í¥‰±”Á…¹•°‰½Õ¹‘Ì¸•‰Õœ½‰Í•ÉÙ•ÌÑ½±”…Ğİ¥¹‘½Ü)…ÁÑÕÉ”°İ¡¥±”ÍÕÉ™…”Ù¥Í¥‰¥±¥Ñä¥Ìµ¥ÉÉ½É•‰ä5ÕÑ…Ñ¥½¹=‰Í•ÉÙ•È¸Q¡•Í”ÑÉ…¹Í¥Ñ¥½¸)Í…µÁ±•Ì…¸ÁÉ••‘”Ñ¡”Ù¥Í¥‰¥±¥ÑäÕÁ‘…Ñ”ìÑ¡•ä…É”¹½Ğ‰äÑ¡•µÍ•±Ù•ÌÁ•ÉÍ¥ÍÑ•¹Ğ)Y%\™…¥±ÕÉ”•Ù¥‘•¹”¸UÍ•È•áÁ±¥¥Ñ±ä½¹™¥ÉµÌY%\¹½Üİ½É­Ì¸AÉ•Í•ÉÙ”…•ÁÑ•)ÍÕÉ™…”ÍÑÉÕÑÕÉ”ì¥˜™ÕÑÕÉ”É•Á½ÉÑ¥¹œİ½É¬¥Ì¹••‘•°Í…µÁ±”Í•ÑÑ±•ÍÑ…Ñ”É…Ñ¡•È)Ñ¡…¸±…¥µ¥¹œÑ¡•Í”ÑÉ…¹Í¥Ñ¥½¸É•½É‘ÌÍ¡½Ü„É•µ…¥¹¥¹œÙ¥Í¥‰±”±½Í•Á…¹•°¸()M½ÕÉ”…Õ‘¥ĞèQ½Ñ…°¥éµ¼É½½ĞÉ•µ…¥¹Ì½É¥¥¹…°ÄäÙÁàÙ¥•İÁ½ÉĞ¡¥±°ÑÉ…¹Í±…Ñ•Ñ¼)Í•±•Ñ¥½¸ì¥ÑÌÁÉ¥µ…ÉäMY¥¹Ñ•¹Ñ¥½¹…±±ä±¥ÁÌÑ¼¥ÑÌ½İ¸‰½Õ¹‘Ìİ¡¥±”Í¡½ÉÑÕĞMYÌ)É•µ…¥¸½Ù•É™±½İÙ¥Í¥‰±”¸9¼ÍÁ•¥™¥ŒİÉ½¹œÍÉ••¸µ™¥á•±¥ÀÉ•Ğ½È½Ù•É¥¹œ=4¹½‘”)İ…Ì•ÍÑ…‰±¥Í¡•¸¼¹½ĞÉ•µ½Ù”ÁÉ½Ñ•Ñ•MY±¥ÁÁ¥¹œ½Èµ½Ù”¥éµ¼Á…É•¹Ğ½½½É‘¥¹…Ñ•Ì)ÍÁ•Õ±…Ñ¥Ù•±ä¸9¼½‘”½‰Õ¥±¡…¹”™É½´Ñ¡¥ÌÕÁ‘…Ñ”¸IÕ¹Ñ¥µ”É•µ…¥¹ÌääÜ¸()9•áĞÕÍ•™Õ°¹…Ñ¥Ù”•Ù¥‘•¹”èÍÉ••¹Í¡½Ğİ¡¥±”¥éµ¼¥ÌY%M%	1…¹É½ÍÍ¥¹œÁ…Ñ °)Í¼…ÉÉ½İÌ½É¥¹ÌÙ•ÉÍÕÌÉ…‘¥…°±…‰•±Ì½‰ÕÑÑ½¹Ì…¹™¥á•Á…Ñ ‰½Õ¹‘…Éä…¸‰”½µÁ…É•¸)EÕ¥¬MÑÕ‘¥¿ŠIM½±¥“ŠIMÑÕ‘¥¼½µÁ…É¥Í½¸µ…äÍ•Á…É…Ñ”MÑÕ‘¥¼ÁÉ•Í•¹Ñ…Ñ¥½¸‘•Á•¹‘•¹”ì)¥Ğ¥Ì„‘¥…¹½ÍÑ¥Œ½µÁ…É¥Í½¸°¹½Ğ„Õ…É…¹Ñ••É•½Ù•Éä½È•¹¥¹”‘¥…¹½Í¥Ì¸)9¼¹••™½È…¹½Ñ¡•È¥‘•¹Ñ¥…°‘ÕµÀİ¥Ñ ¥éµ¼¡¥‘‘•¸¸AÉ•Í•ÉÙ”½É¥¥¹…°¹…Ù¥…Ñ¥½¸°)Í•±•Ñ¥½¸½¡¥ÍÑ½Éä…¹…•ÁÑ•Y%\½İ¹•ÈÕ¹Ñ¥°•Ù¥‘•¹”ÍÕÁÁ½ÉÑÌ„¹…ÉÉ½ÜÉ•Á…¥È¸((ŒŒ€¸ÄÀÀÄƒŠPUX‘¥Ñ½ÈÁ±…¥¸½µÁ½Í¥Ñ¥½¸ì€¸ÄÀÀÀ™•…ÑÕÉ”AMLƒŠP€ÈÜ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äAMM•Ì€¸ÄÀÀÀ™•…ÑÕÉ•Ì°‰ÕĞÉ•Á½ÉÑÌÉ¥¡ĞµÍ¥‘”±½ÍÌ…™Ñ•È•¹Ñ•É¥¹œ)UX‘¥Ñ½È¸AÉ½Ñ•Ğ€¸ÄÀÀÀUXÙ…±¥‘…Ñ¥½¸½MÑÕ‘¥¼¡…¹‘½™˜½…•É½ÕÀÕ¹İÉ…À‰•¡…Ù¥½Èì)‘¼¹½Ğ¥¹Ñ•ÉÁÉ•Ğ™•…ÑÕÉ”AML…Ì¹…Ñ¥Ù”Ù¥Í¥‰¥±¥Ñä…•ÁÑ…¹”¸()%5|àÌĞÈ¹Á¹œÍ¡½İÌ•‘¥Ñ½È¡É½µ”ÕĞ½™˜¹•…ÈÍÉ••¸àÄÀÈĞML€¡¥µ…”àÈÀĞà¤°)¥¹±Õ‘¥¹œÁ…ÉÑ¥…°¡•­•È±…‰•°°É¥¡Ğ•‘¥Ñ½ÈÍÕÉ™…”…¹Ñ½ÀµÉ¥¡ĞÑ½½±‰…È¸)U¹‘•É±å¥¹œ€Í™±½½ÈÉ•µ…¥¹ÌÙ¥Í¥‰±”…ĞÉ¥¡Ğ¸I•Á½ÉĞ€ÀäèĞÄèĞÕhèÕØµÑ½½±ÌÍ•ÍÍ¥½¸°)ÕÙ¡•­•È½=‰©•Ğ°İ½É­ÍÁ…”Ù¥Í¥‰±”…Ğà¼Øà¼ÄÌÔÀ¼ÜäÌÕ¹‘•È…ÁÀìÑ½½±‰…È‰½Õ¹‘Ì½¡¥ÑÌ)¡•…±Ñ¡ä°Y%\±½Í•½¡¥‘‘•¸°…Ñµ½ÍÁ¡•É”…‰Í•¹Ğ°¥éµ¼¥¹Ñ•¹Ñ¥½¹…±±ä¡¥‘‘•¸¸)…¹Ù…ÌÈÜÌÉàÄØÔÈ½AHÈ¸9¼•Ù¥‘•¹”½˜µ¥ÍÍ¥¹œ=4°ÍÑ…±”É•±•…Í”½ÈUXÑ½Á½±½ä±½ÍÌ¸)!¥‘”Í‰ÕÑÑ½¸±¥­Ì¥¸ÍÕÁÁ±¥•±½œ‘¼¹½Ğ•ÍÑ…‰±¥Í …¸½‰Í•ÉÙ•‘¥…¹½ÍÑ¥ŒÉ•ÍÕ±Ğ¸()M½ÕÉ”…Õ‘¥Ğ™½Õ¹UX•¹ÑÉäÍÑ¥±°É•¥¹ÑÉ½‘Õ•½±€¸äÔÈ¥Í½±…Ñ¥½¸½¸Ù¥•İÁ½ÉĞ…¹)İ½É­ÍÁ…”°Á±ÕÌ¥Í½±…Ñ¥½¸½Á…¥¹Ğ½¹Ñ…¥¹µ•¹Ğ½¸UX…¹Ù…ÌİÉ…ÁÁ•È¸Q¡¥ÌÍÕÉÙ¥Ù•€¸äääÌ)Á±…¥¸ÍÑ…ÉÑÕÀ‰…Í•±¥¹”¸I•µ½Ù”Ñ¡½Í”ML‘•±…É…Ñ¥½¹Ì…¹…Ñ¥Ù”€é¡…ÌÙ¥•İÁ½ÉĞÉÕ±”)=91d¥¸½É¥¥¹…°ÕØµİ½É­ÍÁ…”¸I•Ñ…¥¸Í¥‰±¥¹œÉ½½Ğ°èäÕ¹‘•È¡•…‘•ÈÄÀ°™¥á•¥¹Í•ÑÌ°)ÍÉ½±±¥¹œ°½Ù•É™±½Ü±¥ÁÁ¥¹œ°½É¥¥¹…°½¹ÑÉ½±Ì½…¹Ù…Ì¥‘•¹Ñ¥Ñä°Í¥é¥¹œ…¹•ÍÑÕÉ•Ì¸)5•Í !•…±Ñ ¡…¹•Ì¡¥±…¡”­•ä½¹±äìÍ¡•±°Á…É•¹Ğ½É•½Ù•Éä­•åÌÄÀÀÄÉ•Ù¥•İ•¸)9¼É•¹‘•É•È°µ½‘•°½¡¥ÍÑ½Éä½UX½Á…¥¹Ğ…±½É¥Ñ¡µÌ°µ…¥¸äää½ÍÑå±•Ìäää°5Õ±Ñ¤Ä¸À½È™É½é•¸)¡…¹•Ì¸Q¡¥Ì±½Í•Ì„Ù•É¥™¥•‰…Í•±¥¹”µ¥Íµ…Ñ °9=PÁÉ½Ù•¸]•‰-¥ĞÉ½½Ğ…ÕÍ”½È)Á•Éµ…¹•¹ĞÉ¥¡ĞµÉ•¥½¸É•Á…¥È¸9…Ñ¥Ù”Ù¥Í¥‰¥±¥Ñä…Ñ”ÍÑ…åÌ=A8Õ¹Ñ¥°‘•Ù¥”™••‘‰…¬¸()á¥ÍÑ¥¹œ€¸äÔÈML½¹ÑÉ…Ğ¹½ÜÁÉ½Ñ•ÑÌÁ±…¥¸UX½µÁ½Í¥Ñ¥½¸°É•Ñ…¥¹¥¹œ…±°½É¥¥¹…°)¡•…‘•È½•á¥Ğ½•½µ•ÑÉä½ÍÉ½±°‰½Õ¹‘Ì…¹±¥™•å±”½¹…Ù¥…Ñ¥½¸½¡¥ÍÑ½Éä…ÍÍ•ÉÑ¥½¹Ì¸)Y…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸É•ÍÕ±ÑÌè‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÀÄ¹µ¸MÑ…¹‘¥¹œÁÕÍ ½ÁÕ‰±¥Í )…ÁÁÉ½Ù…°…ÁÁ±¥•Ì¸9•áĞÁÉ¥½É¥Ñ¥é”¹…Ñ¥Ù”UXµ•¹ÑÉäÉ•ÍÕ±Ğ‰•™½É”™ÕÉÑ¡•ÈÉ•¹‘•É¥¹œ)¡…¹•Ìì‘¼¹½ĞÉ•Á•…Ğ‰±ÕÈ½Ù¥¹•ÑÑ”½±½Í•µµ•¹Ô¡åÁ½Ñ¡•Í•Ì…±É•…‘ä‘¥ÍÁÉ½Ù•¸()Y%ÄÀÀÄè™É•Í ±½…€´øUX‘¥Ñ½È°¥¹ÍÁ•Ğ™Õ±°É¥¡Ğ‰½É‘•È½¡•­•È½%µ…”½Ñ½À)‰ÕÑÑ½¹Ìì	…¬Ñ¼Í…¹É•½Á•¸Í•Ù•É…°Ñ¥µ•Ìİ¥Ñ¡½ÕĞ…ÁÀµÍİ¥Ñ ½É•½Ù•Éä¸A…¸½Á¥¹ °)Í•±•Ğ½A•¹¥°µµ½Ù”…¸¥Í±…¹°U¹‘½I•‘¼¸	…¬Ñ¼Í€´øY%\MÑÕ‘¥¼½…•É½ÕÁÌ€´øUX)‘¥Ñ½Èì¥¹ÍÁ•ĞÉ¥¡ĞÍ¥‘”……¥¸¸€¸ÄÀÀÀ…•ÁÑ•İ½É­™±½ÜÍÑ…åÌÁÉ½Ñ•Ñ•¸((ŒŒ€¸ÄÀÀÄÉ•ÕÉÉ•¹”ƒŠP‰±…¹¬…•É½ÕÁÌY%\…¹É¥¡ĞµÉ•¥½¸¥éµ¼±½ÍÌƒŠP€Èà=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÁÉ•Ù¥½ÕÍ±äAMM•ÄÀÀÄ°¹½ÜÉ•Á½ÉÑÌ…•É½ÕÁÌY%\‰±…¹¬…¹¥éµ¼‘¥Í…ÁÁ•…ÉÌ)½¸É¥¡Ğ°İ¥Ñ¡½ÕĞ™½Éµ•È‰½ÑÑ½´µÉ¥¡ĞÉ½Õ¹Ñ½¹…°±¥¹”¸I•½Á•¸¹…Ñ¥Ù”Ù¥Í¥‰¥±¥Ñä)…Ñ”ìÉ•Ñ…¥¸ÄÀÀÀ™•…ÑÕÉ”…•ÁÑ…¹”…¹ÄÀÀÄ™Õ¹Ñ¥½¹…°½UXµÍÁ•¥™¥ŒAML½¹±ä¸)MÉ••¹Í¡½ĞÁ	ÜÈÍµÍĞ´ÑÔÌµ	ÔµÀàÄäÈØÄÄå¹Á¹œÙ¥Í¥‰±ä½¹™¥ÉµÌÄÀÀÄ°…•É½ÕÁÌ)½±½ÕÉÌ°‘”µ½‘”°™Õ±°Ñ½ÀµÉ¥¡ĞÑ½½±‰…È…¹•µÁÑä½Á•¸Y%\™É…µ”¸¥éµ¼¥Ì)Ù¥Í¥‰±”¹•…È•¹ÑÉ”¥¸Ñ¡¥ÌÍÉ••¹Í¡½Ğì‘¥Í…ÁÁ•…É…¹”…ĞÉ¥¡Ğ¥ÌÕÍ•Èµ½‰Í•ÉÙ•°)¹½Ğ…ÁÑÕÉ•…Ì„±¥ÁÁ•¥éµ¼¡•É”¸9¼¹•Ü‘•‰ÕœÉ•Á½ÉĞÍÕÁÁ±¥•¸()M½ÕÉ”•áÁ±…¹…Ñ¥½¸èäääÉ•Ñ¥É•ÍÉ••¸µİ¥‘”=4µÕ±Ñ¥Á±äÙ¥¹•ÑÑ”ìÉ•¹‘•Èµµ½‘•Ì)Í¡½İÌMÑÕ‘¥¼™±½½È½±¥¡ÑÌ½Í¡…‘½İÌ=91d¥¸MÑÕ‘¥¼°¹½Ğ…•É½ÕÁÌ¸Q¡ÕÌ…‰Í•¹”½˜)½±É½Õ¹±¥¹”¥¸…•É½ÕÁÌ¥Ì¹½ĞÁÉ½½˜½˜É•½Ù•Éä…¹…¹¹½ĞÉ•±¥…‰±äÍ¥¹…°)U$¡•…±Ñ ¸ÄÀÀÄ½¹±äÉ•µ½Ù•UXİ½É­ÍÁ…”¥Í½±…Ñ¥½¸½½¹Ñ…¥¹µ•¹ĞìY%\…¹¥éµ¼)ÉÕ¹Ñ¥µ”Õ¹¡…¹•¸9•¥Ñ¡•È™¥¹‘¥¹œÁÉ½Ù•ÌÉ½½Ğ…ÕÍ”½˜‰±…¹¬µ•¹Ô½¥éµ¼±½ÍÌ¸()9¼¹•ÜÉÕ¹Ñ¥µ”‰Õ¥±½ÈÍÁ•Õ±…Ñ¥Ù”MLÉ•Á…¥È¥¸Ñ¡¥Ì•Ù¥‘•¹”ÕÁ‘…Ñ”¸ÕÉÉ•¹Ğ)É•±•…Í”ÄÀÀÄ¸AÉ¥½É¥Ñ¥é”Ñ¡¥ÌÉ•ÕÉÉ•¹”‰•™½É”¥µÁ±•µ•¹Ñ¥¹œÉ•ÅÕ•ÍÑ•¥±°…”€¼)¥±°…•É½ÕÀìÑ¡…ĞÉ•ÅÕ•ÍĞÉ•µ…¥¹Ì…Ñ¥Ù”…¹Õ¹Í¡¥ÁÁ•¸9•áĞÕÍ•™Õ°‘•Ù¥”)½µÁ…É¥Í½¸è±½Í”Y%\°µ½Ù”Í…µ”Ù¥Í¥‰±”¥éµ¼…É½ÍÌÉ¥¡ĞÉ•¥½¸°Ñ¡•¸½µÁ…É”)MÑÕ‘¥¼Ù•ÉÍÕÌ…•É½ÕÁÌİ¥Ñ¡½ÕĞÉ•±½…½…ÁÀµÍİ¥Ñ ½É•½Ù•Éä¸¼¹½Ğ‘•µ…¹…¹½Ñ¡•È)¥‘•¹Ñ¥…°¡¥‘‘•¸µ¥éµ¼‘ÕµÀ½ÈÑÉ•…Ğ¡•…±Ñ¡ä=4½¡¥ÑÌ…ÌÁ¥á•°ÁÉ½½˜¸((ŒŒ€¸ÄÀÀÈƒŠPÕ¹¥™½É´…•É½ÕÀ½±½ÕÉÌ°¥¹±Õ‘¥¹œÕ¹‘•ÉÍ¥‘•ÌƒŠP€Èà=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÍÉ••¹Í¡½ĞÑÈÕäÍ¡½İÌ‰½ÑÑ½´™…•Ì¹•…É±ä‰±…¬¥¸…•É½ÕÁÌ…¹É•ÅÕ•ÍÑÌ)•ÅÕ…±¥é•Í¡…‘¥¹œ¸=É¥¥¹…°É•¹‘•Èµµ½‘•Ì™…•É½ÕÁ5…Ñ•É¥…°¹½ÜÕÍ•ÌÕ¹±¥Ğ)5•Í¡	…Í¥5…Ñ•É¥…°İ¥Ñ Ù•ÉÑ•á½±½ÉÌ…¹Ñ½¹•5…ÁÁ•é™…±Í”¥¹ÍÑ•…½˜±¥ĞMÑ…¹‘…É¸)Ù•Éä™É½¹Ğµ™…¥¹œÁ½±å½¸‘¥ÍÁ±…åÌ¥ÑÌ•á¥ÍÑ¥¹œÉ½ÕÀÁ…±•ÑÑ”½±½ÕÈ¥¹‘•Á•¹‘•¹Ğ)½˜±¥¡Ğ½¹½Éµ…°½É¥•¹Ñ…Ñ¥½¸¸=É¥¥¹…°É½¹ÑM¥‘”°Á½±å½¸½™™Í•Ğ°‰…­™…”‘¥…¹½ÍÑ¥Œ°)Á…±•ÑÑ”½±¥ÍĞ½¹…µ”‘…Ñ„°Í•±•Ñ¥½¸½‰ÉÕÍ ½¡¥ÍÑ½Éä°½Ñ¡•ÈY%\µ…Ñ•É¥…±Ì…¹É•¹‘•É•È)±¥¡ÑÌÉ•µ…¥¸Õ¹¡…¹•¸	½ÑÑ½´™…•Ì…¸¹½Ü‰”É•…İ¡¥±”½É‰¥Ñ¥¹œÕ¹‘•É¹•…Ñ ¸)Q¡¥Ì‘•±¥‰•É…Ñ•±ä™±…ÑÑ•¹Ì…•É½ÕÁÌÍ¡…‘¥¹œìMÑÕ‘¥¼É•Ñ…¥¹Ì½É¥¥¹…°‘•ÁÑ ½±¥¡Ñ¥¹œ¸()M½Á”¥Ì½¹±ä½É¥¥¹…°µ…Ñ•É¥…°Á±ÕÌÉ•Ù¥•İ•É•¹‘•È½Í¡•±°½É•½Ù•ÉäÄÀÀÈÁ¥¹Ì…¹)É•±•…Í”µ…É­•ÉÌ¸9¼U$½½µÁ½Í¥Ñ¥½¸½¥éµ¼¡…¹•Ìì‰±…¹¬Y%\½É¥¡ĞµÉ•¥½¸É•ÕÉÉ•¹”)ÍÑ…åÌ=A8¸€¸ÄÀÀÀ™•…ÑÕÉ”…¹€¸ÄÀÀÄ™Õ¹Ñ¥½¹…°…•ÁÑ…¹”É•Ñ…¥¹•¸I•ÅÕ•ÍÑ•UX)¥±°…”½…•É½ÕÀİ¥Ñ •áÁ…¹Í¥½¸É•µ…¥¹Ì…Ñ¥Ù”‰ÕĞÕ¹Í¡¥ÁÁ•ì‘¼¹½Ğ±…¥´¥Ğ)İ…Ì¥¹±Õ‘•¡•É”¸Y…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸è‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÀÈ¹µ¸()Y%ÄÀÀÈè…•É½ÕÁÌ€´ø½É‰¥Ğ‰•±½Üµ•Í ì…ÍÍ¥¹•Õ¹‘•ÉÍ¥‘•ÌÍ¡½ÜÍ…µ”É½ÕÀ)½±½ÕÈ…ÌÕÁÁ•È™…•Ì¸A…¥¹Ğ½•É…Í”É½ÕÁÌ°U¹‘½I•‘¼ì±¥ÍĞ½±½ÕÉÌÉ•µ…¥¸½¹Í¥ÍÑ•¹Ğ¸)Mİ¥Ñ MÑÕ‘¥¼€´ø…•É½ÕÁÌèMÑÕ‘¥¼±¥¡Ñ¥¹œÉ•ÑÕÉ¹Ì°É½ÕÀÙ¥•Ü¥Ì•Ù•¹±ä½±½ÕÉ•¸)ÕÉÉ•¹ĞÄÀÀÈ¹…Ñ¥Ù”…ÁÁ•…É…¹”…•ÁÑ…¹”Á•¹‘¥¹œìÉ¥¡ĞµÉ•¥½¸™…Õ±ĞÍÑ¥±°Í•Á…É…Ñ”¸((ŒŒ€¸ÄÀÀÈÕÍ•ÈAMLìÍ¡…É•¥éµ¼½µ•¹Ô…Õ‘¥ĞƒŠP€Èà=Ñ½‰•È€ÈÀÈØ()UÍ•ÈAMLÄÀÀÈÁÉ½Ñ•ÑÌÕ¹¥™½É´…•É½ÕÀ½±½ÕÈ¥¹±Õ‘¥¹œÕ¹‘•ÉÍ¥‘•ÌìMÑÕ‘¥¼)±¥¡Ñ¥¹œÉ•µ…¥¹ÌÍ•Á…É…Ñ”¸UÍ•ÈÉ•ÅÕ•ÍÑÌ…¹½Ñ¡•È¥¹Ù•ÍÑ¥…Ñ¥½¸½˜¥éµ¼½µ•¹Ô±½ÍÌ¸)	½Ñ MÑÕ‘¥¼…¹…•É½ÕÁÌ…™™•Ñ•ì‘¼¹½ĞÉ•Á•…ĞÑ¡…Ğ½µÁ…É¥Í½¸¸9¼¹•ÜÉÕ¹Ñ¥µ”)™¥à•ÍÑ…‰±¥Í¡•¸¥éµ¼±½…°MY½Ù•É™±½Üé¡¥‘‘•¸µ½Ù•Ìİ¥Ñ ½É¥¥¹…°ÄäÙÁàÉ½½Ğì)Y%\™¥á••áÑ•É¹…°Í¥‰±¥¹œÕ¹‘•È…ÁÀ¡…Ì‘¥™™•É•¹Ğ…¹•ÍÑÉä¸9¼Í¡…É•…ÁÁ±¥…Ñ¥½¸)±¥À½ÈÍ¥ÍÍ½È…±°•ÍÑ…‰±¥Í¡•Ñ¡…Ğ•áÁ±…¥¹Ì‰½Ñ ±½ÍĞÍÕÉ™…•Ì¸¼¹½ĞÉ•µ½Ù”)ÁÉ½Ñ•Ñ•MY±¥ÁÁ¥¹œÍÁ•Õ±…Ñ¥Ù•±ä¸AÉ¥½ÈUXÍÉ••¹Í¡½ĞÕÑ½™˜¹•…ÈÄÀÈĞML€¼(ÈÀĞàÁ¡åÍ¥…°Á¥á•±Ì…ĞAHÈÍÕ•ÍÑÌ„É•Í½±ÕÑ¥½¸µ‘•Á•¹‘•¹ĞÁ…¥¹Ğ½½µÁ½Í¥Ñ¥½¸)¡åÁ½Ñ¡•Í¥Ì°¹½ĞÁÉ½½˜½˜AT½Ñ•áÑÕÉ”µ±¥µ¥Ğ½]•‰-¥Ğ…ÕÍ”¸9•áĞ¹…ÉÉ½Ü‘¥…¹½ÍÑ¥Œ)…¹‘¥‘…Ñ”è•áÁ±¥¥ĞÑ•µÁ½É…ÉäÅàÙ•ÉÍÕÌ…ÕÑ½µ…Ñ¥ŒÉàÉ•¹‘•É¥¹œÕÍ¥¹œ…ÕÑ¡½É¥Ñ…Ñ¥Ù”)Ù¥•İÁ½ÉĞÍ¥é¥¹œ½İ¹•È°ÁÉ•Í•ÉÙ¥¹œMLÍ¥é”½µ½‘•°½¡¥ÍÑ½Éä…¹É•ÍÑ½É¥¹œ½¸•á¥Ğ¸)9½Ğ¥µÁ±•µ•¹Ñ•ì‘¼¹½Ğ±…¥´‘¥…¹½ÍÑ¥Œ½¹ÑÉ½±Ì•á¥ÍĞ½È„™¥à¥ÌÉ•…‘ä¸()ÕÉÉ•¹Ğ±¥Ù”ÄÀÀÈì¹¼¹•ÜÉÕ¹Ñ¥µ”‰Õ¥±¥¸Ñ¡¥Ì…Õ‘¥Ğ¸Øä™½ÕÍ•Ñ•ÍÑÌ‰•±½¹œÑ¼(ÄÀÀÈµ…Ñ•É¥…°¡…¹”°¹½ĞÁ¥á•°µ±½ÍÌÁÉ½½˜¸¥±°…”½…•É½ÕÀÉ•µ…¥¹ÌÉ•ÅÕ•ÍÑ•)…¹Õ¹Í¡¥ÁÁ•¸9¼¹•Ü‘•Ù¥”Ñ•ÍĞÉ•ÅÕ¥É•¥¸Ñ¡¥Ì…Õ‘¥Ğì‘¼¹½Ğ…Í¬™½ÈÉ•Á•…Ñ•)¡¥‘‘•¸µ¥éµ¼É•Á½ÉÑÌ½È¥‘•¹Ñ¥…°MÑÕ‘¥¼½…•É½ÕÁÌ½µÁ…É¥Í½¸¸((ŒŒ€¸ÄÀÀÌƒŠP•áÁ±¥¥ĞÉ•¹‘•ÈµÉ•Í½±ÕÑ¥½¸‘¥…¹½ÍÑ¥Œì€¸ÄÀÀÈAMLÁÉ½Ñ•Ñ•ƒŠP€Èà=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•ÅÕ•ÍÑÌ™ÕÉÑ¡•È…ÑÑ•µÁÑÌ…™Ñ•Èµ½‘•°¡…¹”¸%µÁ±•µ•¹Ğ½¹ÑÉ½±±•ÅàÙ•ÉÍÕÌ)¹½Éµ…°AHÑ¡É½Õ =I%%90Ù¥•İÁ½ÉĞµÍ¥é¥¹œ½İ¹•Èì‘•™…Õ±ĞÉ•µ…¥¹Ì…ÕÑ½µ…Ñ¥Œ…ÁÁ•È¸)¥±”€´øU$•‰Õœ€´øQ•ÍĞÇ\É•¹‘•ÈÉ•Í½±ÕÑ¥½¸Ñ½±•ÌÑ•µÁ½É…Éä…ÀÄìÍ…µ”‰ÕÑÑ½¸)É•ÍÑ½É•Ì¹½Éµ…°¸¥Í…‰±••‰Õœ…¹Á…•¡¥‘”É•ÍÑ½É”…ÕÑ½µ…Ñ¥Œ¸9¼±½…±MÑ½É…”°)É•¹‘•É•ÈÉ•Á±…•µ•¹Ğ°MLÉ•Í¥é”°µ½‘•°½¡¥ÍÑ½Éä•‘¥ÑÌ°™½É•…¹Ù…ÌÙ¥Í¥‰¥±¥Ñä°)Íå¹Ñ¡•Ñ¥ŒÉ•Í¥é”½ÈÁ•Èµ™É…µ”Á½±±¥¹œ¸=¹±ä½É¥¥¹…°½…±•Í•É•Í¥é”…±±‰…¬İÉ¥Ñ•Ì)‰…­¥¹œ‰Õ™™•È¸•¹Õ¥¹”É•Í¥é”½Ñ½½°½µ½‘”±¥™•å±”­••ÁÌÉ•ÅÕ•ÍÑ•…À¸¥ÍÁ½Í¥¹œ)Í¥é¥¹œ…¹•±ÌÁ•¹‘¥¹œ™É…µ•Ì°É•µ½Ù•ÌA$½±¥ÍÑ•¹•ÉÌ…¹É•ÍÑ½É•ÌÁÉ¥½ÈA$¥‘•¹Ñ¥Ñä¸()	ÕÑÑ½¸É•™ÕÍ•ÌA…¥¹Ğ°…Ñ¥Ù”Ñ½½°½Í•ÍÍ¥½¸½‘É…œ°‘¥Í…‰±•½É‰¥Ğ½¹ÑÉ½±Ì°•á¥ÍÑ¥¹œ)…¹Ù…ÌÁÉ½‰”½É•™É•Í ¸á¥Ğ½Á•É…Ñ¥½¸‰•™½É”Í…±”¡…¹”ìÉ•ÍÑ½É…Ñ¥½¸½¸•‰Õœ½™˜)…±İ…åÌİ½É­Ì¸M¹…ÁÍ¡½Ğ¥¹±Õ‘•ÌÉ•ÅÕ•ÍÑ•…À…¹…ÑÕ…°‰…­¥¹œ‘¥µ•¹Í¥½¹Ì¸½µÁ…É”)É¥¡ĞµÉ•¥½¸Á¥á•±Ì¥µµ•‘¥…Ñ•±ä…™Ñ•ÈÅà9…™Ñ•ÈÉ•Á•…Ñ¥¹œ™…¥±¥¹œİ½É­™±½ÜìÑ¡•¸)É•ÍÑ½É”¹½Éµ…°…¹É•Á•…Ğ¸Í¥¹±”É•½Ù•Éä½¸•¥Ñ¡•ÈÍİ¥Ñ µ…äµ•É•±äÉ•™±•Ğ)‰Õ™™•ÈÉ•…±±½…Ñ¥½¸°¹½ĞÁÉ½Ù”AH‘•Á•¹‘•¹”¸9…Ñ¥Ù”Á¥á•°É•ÍÕ±ĞÉ•µ…¥¹ÌÁ•¹‘¥¹œì)Ñ¡¥Ì¥Ì‘¥…¹½ÍÑ¥Œ°¹½Ğ±…¥µ•Á•Éµ…¹•¹Ğ¥éµ¼½µ•¹Ô™¥à¸…É±¥•È‰½Ñ µµ½‘”•Ù¥‘•¹”)É•Ñ…¥¹•ì¹¼É•Á•…Ñ•MÑÕ‘¥¼µÙ•ÉÍÕÌµ…•É½ÕÁÌ‘¥…¹½Í¥Ì¹••‘•¸()5…¥¸¡…¹•ÌÙ¥•İÁ½ÉĞµÍ¥é¥¹œ¥µÁ½ÉĞ­•ä=91dìÍ¥é¥¹œ½‘•‰Õœ½İ¹•ÉÌ¡…¹•°Í¡•±°¼)É•½Ù•Éä­•åÌÄÀÀÌÉ•Ù¥•İ•¸á¥ÍÑ¥¹œ€¸äääÉ•Í¥é”…±±½…Ñ¥½¸½É•¹‘•É•È½…µ•É„½‘”°(¸ÄÀÀÈÕ¹±¥Ğ…•É½ÕÁÌ°Á…±•ÑÑ”°µ½‘•±±¥¹œ½UX½A…¥¹Ğ°5Õ±Ñ¤Ä¸À…¹™É½é•¸‰åÑ•ÌÉ•Ñ…¥¹•¸)Q•ÍÑÌ•á•ÕÑ”…ÑÕ…°Í…±”A$…¹‘•‰Õœ‰ÕÑÑ½¸€¡‰ÕÍäÉ•™ÕÍ…°°Íİ¥Ñ ½É•ÍÑ½É”°)Í¹…ÁÍ¡½Ğ°•‰Õœ½™˜¤°½É¥¥¹…°Ù¥•İÁ½ÉĞÍ¥é•Ì½½…±•Í¥¹œ½Á…•¡¥‘”½±•…¹ÕÀ…¹Õ¹¡…¹•)Í•¹”½¡¥ÍÑ½Éä½¹ÑÉ…ÑÌ¸Y…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸è‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÀÌ¹µ¸()Y%ÄÀÀÌèİ¡¥±”™…Õ±ĞÙ¥Í¥‰±”°™¥¹¥Í Ñ½½°€´ø¥±”½U$•‰Õœ€´øQ•ÍĞÇ\É•¹‘•È)É•Í½±ÕÑ¥½¸¸%¹ÍÁ•ĞÉ¥¡Ğ¥éµ¼½µ•¹ÔìÉ•Á•…Ğ½É¥¥¹…°™…¥±¥¹œİ½É­™±½Ü…ĞÅà¸I•ÍÑ½É”)¹½Éµ…°É•Í½±ÕÑ¥½¸…¹É•Á•…Ğ¸½ÁäÉ•Á½ÉĞİ¡¥±”…™™•Ñ•¸I•Á½ÉĞİ¡•Ñ¡•ÈÅàÁÉ•Ù•¹ÑÌ)É•ÕÉÉ•¹”°‰½Ñ Íİ¥Ñ¡•Ì½¹±äÉ•½Ù•ÈÑ•µÁ½É…É¥±ä°½È¹•¥Ñ¡•È¡•±ÁÌ¸•‰Õœ½™˜)É•ÍÑ½É•Ì¹½Éµ…°ìÅà¥¹Ñ•¹Ñ¥½¹…±±ä±½½­ÌÍ½™Ñ•È¸¥±°…”½…•É½ÕÀÉ•µ…¥¹ÌÕ¹Í¡¥ÁÁ•¸((ŒŒ€¸ÄÀÀĞƒŠPUXA…¥¹Ğ¥±°…”€¼…•É½ÕÀ…¹¡½±•áÁ…¹Í¥½¸ƒŠP€Èà=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á½ÉÑÌÅàÍ••µÌÑ¼ÍÑ…ä¡•…±Ñ¡ä…¹•áÁ±¥¥Ñ±äÁ…É­ÌÉ¥¡ĞµÉ•¥½¸Ñ•ÍÑ¥¹œÕ¹±•ÍÌ)¥ĞÉ•ÕÉÌ¸I•½ÉÁÉ½Ù¥Í¥½¹…°ÅàÍÑ…‰¥±¥Ñä½¹±ä°¹½ĞÁÉ½Ù•¸É½½Ğ…ÕÍ”½Á•Éµ…¹•¹Ğ™¥à¸)-••ÀÄÀÀÌÍ¥é¥¹œ½‘•‰Õœ‰åÑ•Ì…¹‘•™…Õ±Ğ…ÕÑ½µ…Ñ¥ŒAHÕ¹¡…¹•ìÅà¥ÌÍÑ¥±°Ñ•µÁ½É…Éä)…¹É•Í•ÑÌ½¸É•±½…½•‰Õœ½™˜½Á…•¡¥‘”¸I•ÍÕµ”É•ÅÕ•ÍÑ•UXA…¥¹Ğ™¥±°•áÁ…¹Í¥½¸¸()=É¥¥¹…°¥±°É…‘¥…°Í•Ñ½ÈÉ•µ…¥¹Ì¥¸¥ÑÌ…•ÁÑ•Á½Í¥Ñ¥½¸½…ÉÑİ½É¬¸½µÁ…Ğ1P)Í•ÑÑ¥¹Ì…‘…”€¡‘•™…Õ±Ğ¤°…•É½ÕÀ…¹]¡½±”½‰©•ĞÍ½Á”¸A•¹¥°½µ½ÕÍ”Ñ…À™¥±±Ì)±¥­•½É¥¥¹…°Á½±å½¸°¹½Ğ½¹”É•¹‘•É•ÑÉ¥…¹±”¸…”¡½±ĞÈÁµÌ•áÁ…¹‘ÌÁÉ•Ù¥•Ü)Ñ¼½¹¹•Ñ•½Á±…¹…ÈÉ•¥½¸ìÕÀÉ½İÌ½‘½İ¸Í¡É¥¹­Ì™É½´™¥á•Á±…¹…È‰…Í”¥¸ÌÁÁà)ÍÑ•ÁÌİ¥Ñ ÄáÁà¹•ÕÑÉ…°‰…¹€¡µ…àÌÈÍÑ•ÁÌ¤ìÉ¥¡ĞÕÍ•Ì½É¥¥¹…°…”1½½À…¹±•™Ğ)…”I¥¹œ¸¥É•Ñ¥½¸É•Ù•ÉÍ…°É•½µÁÕÑ•Ì‰…Í•±¥¹”Á¥á•±ÌÉ…Ñ¡•ÈÑ¡…¸…ÕµÕ±…Ñ¥¹œ)½Á…¥Ñä¸	•™½É”¡½±°µ½Ù•µ•¹ĞøáÁà…¹•±ÌÑ…À¸I•±•…Í”½µµ¥ÑÌ½¹”½É¥¥¹…°Á…¥¹Ğ)¡•­Á½¥¹Ğì…¹•°½Í½Á”½Ñ½½°½‰½‘ä½¡¥ÍÑ½Éä±½ÍÌÉ•ÍÑ½É•Ì‰…Í•±¥¹”…¹±•…ÉÌÑ¥µ•È¸)¥¹•ÉÌÍÑ¥±°¹…Ù¥…Ñ”¸M½Á”¡…¹•Ì¹•Ù•È…±Ñ•Èµ½‘•±±¥¹œÍ•±•Ñ¥½¸½È…•É½ÕÁÌ¸()…•É½ÕÀÍ½Á”Í¡½İÌM5½É…¹”¹½¸µÁ¥­…‰±”‰½Õ¹‘…ÉäÁÉ•Ù¥•Ü…ÌUXÍ•…´É•Ù¥•Üì)±¥¬™¥±±Ì…±°Í…µ”µ¹…µ”™…•Ì½¸Ñ…É•Ğ°¥¹±Õ‘¥¹œ‘¥Í½¹¹•Ñ•Á…Ñ¡•Ì¸U¹É½ÕÁ•)™…•ÌÉ•™ÕÍ”İ¥Ñ …ÍÍ¥¹µ•¹Ğ¡¥¹Ğ¸M½Á”•á¥Ğ½½¹”½‰½‘ä±½ÍÌ‘¥ÍÁ½Í•Ì½Ù•É±…äì)İ½É±µ…ÑÉ¥à™½±±½İÌ½É¥¥¹…°‰½‘ä¸UXÉ•Ù¥•Ü¹½ÜÍ¡…É•Ì•áÑÉ…Ñ•½É¥¥¹…°‰½Õ¹‘…Éä)É•¹‘•É•È°É•Ñ…¥¹¥¹œ¥ÑÌ•á…ĞÍ•…µÌ½½±½ÕÈ½Ñ¥µ•È½Õ¹İÉ…À½…¹•±±…Ñ¥½¸‰•¡…Ù¥½È¸()½Á¥••á¥ÍÑ¥¹œÉ•…µ½¹±ä½Á±…¹…È¥¹ÍÁ•Ğ°ÅÕ…µÍÑÉ¥ÀÑÉ…”…¹É½Ü½M¡É¥¹¬µ…Ñ Ñ¼)Í¡…É•™…”µÍ•±•Ñ¥½¸µÉ•¥½¹Ìì=I%%90Í•±•Ñ¥½¸U$½İ¹•ÉÌ…±°Ñ¡½Í”Í…µ”™Õ¹Ñ¥½¹Ì¸)9¼‘ÕÁ±¥…Ñ”•½µ•ÑÉä­•É¹•°½ÈÍ•±•Ñ¥½¸Í¥µÕ±…Ñ¥½¸¸I…ÍÑ•È½É¥¥¹…°™¥±°…•ÁÑÌ)½ÁÑ¥½¹…°Ñ•á•°µ…Í¬…¹‰…Í•±¥¹”É•Á±…•µ•¹Ğì½Ù•É…”½…±Á¡„½½Á…¥Ñä½Í…±…È½µ…Í¬°)É•Í½ÕÉ”½Á½½°Ù…±¥‘…Ñ¥½¸°Í•¹”¡¥ÍÑ½Éä°M…Ù•=Á•¸½•áÁ½ÉĞÉ•µ…¥¸½É¥¥¹…°½İ¹•ÉÌ¸)…”µ…Í­ÌÕÍ”½É¥¥¹…°UXÑ•á•°½İ¹•ÉÍ¡¥ÀìÉ•ÅÕ¥É”¹½¸µ½Ù•É±…ÁÁ¥¹œ°¹½¹‘••¹•É…Ñ”)UYÌ¥¸Ñ¥±”ÃŠLÄ°½É¥¥¹…°‰½Õ¹‘••½µ•ÑÉä½İ½É¬±¥µ¥ÑÌ¸M¡…É•½…µ‰¥Õ½ÕÌ‰½Õ¹‘…Éä)Ñ•á•±ÌÍÑ…ä½¹Í•ÉÙ…Ñ¥Ù”ì¹¼Á…¥¹Ñ¥¹œ½¹Ñ¼„‘¥™™•É•¹Ğ™…”Ì½İ¹•¥¹Ñ•É¥½ÈÑ•á•±Ì¸)]¡½±”½‰©•Ğ™¥±°É•Ñ…¥¹Ì•…É±¥•È‰•¡…Ù¥½È¸á¥ÍÑ¥¹œ¥µ…”µ½±½ÕÈÉ•™ÕÍ…°É•Ñ…¥¹•¸()I•Ù¥•İ•ÄÀÀĞÉ•Ù•ÉÍ”…¡”±½ÍÕÉ”èÍ¡…É•µ½‘Õ±•Ì°Í•±•Ñ¥½¸½İ¹•ÉÌ½½Á±…¹…È‘É…İ•È°)Á…¥¹ĞÉ…ÍÑ•È½½É”½U$…¹1…ˆ±½…‘•ÉÌ°UXİ½É­™±½Ü½5•Í¡!•…±Ñ °Í¡•±°½É•½Ù•Éä¸%¹Ñ•É¹…°)ÍÑ…µÁÌÉ•Ñ…¥¹•¸5…¥¸ÄÀÀÌ°Ù¥•İÁ½ÉĞÍ¥é¥¹œ½‘•‰ÕœÄÀÀÌ°…•ÁÑ•Õ¹¥™½É´…•É½ÕÁÌÄÀÀÈ°)MY½¥éµ¼½É¥¡ĞµÉ•¥½¸½µÁ½Í¥Ñ¥½¸°Á…±•ÑÑ”°5Õ±Ñ¤Ä¸À…¹™É½é•¸É•±•…Í•ÌÕ¹¡…¹•¸)Q•ÍÑÌè…ÑÕ…°É•¥½¸½Á…¥¹Ñ•È½U$½U¹‘½I•‘¼½ÍÕ‰Í•ĞM…Ù•=Á•¸°ÁÉ•Ù¥•ÜÉ•Ù•ÉÍ…°½½Á…¥Ñä°)…±°µ¹…µ”É½ÕÀ™¥±°½½Ù•É±…ä±•…¹ÕÀ°½É¥¥¹…°Í•±•Ñ¥½¸•ÍÑÕÉ•Ì…¹Á…¥¹ĞÍÕ¥Ñ”¸)1•…ääÈØ¼äÈÜU$™¥áÑÕÉ•Ì¹½Ü•áÁ±¥¥Ñ±ä¡½½Í”]¡½±”½‰©•Ğ™½ÈÑ¡•¥È™Õ±°µÑ•áÑÕÉ”)…ÍÍ•ÉÑ¥½¹Ìì½É¥¥¹…°Á¥á•°½U¹‘½I•‘¼½M…Ù•=Á•¸½¹…Ñ¥Ù”µ•áÁ½ÉĞÁÉ½Ñ•Ñ¥½¹ÌÉ•Ñ…¥¹•¸)Q•ÍĞ…‘…ÁÑ•ÉÌ¥µÁ½ÉĞ•áÑÉ…Ñ•É•…°Í•±•Ñ¥½¸™Õ¹Ñ¥½¹Ìì¹¼‰•¡…Ù¥½É…°…ÍÍ•ÉÑ¥½¹Ì)É•µ½Ù•¸I•ÍÕ±ÑÌ…¹ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”è‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÀĞ¹µ¸()Y%ÄÀÀĞèUXA…¥¹Ğ€´ø¥±°€´ø…”ìÑ…À½¹”Á½±å½¸°Ñ¡•¸¡½±½¸½Á±…¹…ÈÁ…Ñ °)Í±¥‘”ÕÀ½‘½İ¸…¹É¥¡Ğ½±•™Ğ°É•±•…Í”ìÉ•Ù•ÉÍ¥¹œ½Í¡É¥¹­¥¹œÉ•µ½Ù•Ì…‰…¹‘½¹•ÁÉ•Ù¥•Ü¸)U¹‘½I•‘¼½¹”•ÍÑÕÉ”¸¡½½Í”…•É½ÕÀè½É…¹”‰½Õ¹‘…É¥•ÌÙ¥Í¥‰±”ìÑ…À¹…µ•É½ÕÀ°)½¹±äÑ¡…ĞÉ½ÕÀÌ™…•Ì™¥±°ì	ÉÕÍ ½½¹”É•µ½Ù•Ì‰½Õ¹‘…É¥•Ì¸]¡½±”½‰©•ĞÍÑ¥±°™¥±±Ì)…±°ìM…Ù•=Á•¸É•Ñ…¥¹ÌÁ…¥¹Ğ¸9¼¹•ÜÉ¥¡ĞµÍ¥‘”‘¥…¹½ÍÑ¥ŒÑ•ÍĞÉ•ÅÕ•ÍÑ•¸%˜•…É±¥•È)™…Õ±ĞÉ•ÑÕÉ¹Ì…™Ñ•ÈÉ•±½…°•á¥ÍÑ¥¹œÅà½¹ÑÉ½°É•µ…¥¹Ì…Ù…¥±…‰±”ì‘¼¹½Ğ…±°¥Ğ™¥á•¸)ÕÉÉ•¹ĞÄÀÀĞ™•…ÑÕÉ”…•ÁÑ…¹”Á•¹‘¥¹œ¹…Ñ¥Ù”A•¹¥°Ñ•ÍĞ¸((ŒŒ€¸ÄÀÀÔƒŠP½ÁĞµ¥¸ÍÑ…ÉÑÕÀ€Åà°…™Ñ•È€¸ÄÀÀĞÉ•ÕÉÉ•¹”ƒŠP€Èà=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á½ÉÑÌÉ¥¡ĞµÍ¥‘”™…¥±ÕÉ”™½±±½İ¥¹œÉ•™É•Í Ñ¼ÄÀÀĞ¸I•Á½ÉĞÀÌèÈÄèÌÑh½¹™¥ÉµÌ)É•ÅÕ•ÍÑ•Åà9…ÑÕ…°ÄÌØÙààÈØ‰…­¥¹œ€¡MLÄÌØÙààÈØ½AHÈ¤¸9¼ÍÑ…±”É•±•…Í”½È™…¥±•)±¥Ù”É•Í½±ÕÑ¥½¸Íİ¥Ñ ¸MÑ…ÉÑÕÀ±½•…ĞÄĞàä½Á…•Í¡½ÜÌÄààì…ĞÜÜÄÔ…¹Ù…ÌÈÜÌÉàÄØÔÈ°)Ñ¡•¸ÅàÉ•ÅÕ•ÍÑ•ÜàÌÄ…¹ÄÌØÙààÈØ‰äÄÄÄäÀ¸Q¡ÕÌ™…¥±ÕÉ”Á•ÉÍ¥ÍÑÌ¥¸…ÁÑÕÉ•ÅàÍÑ…Ñ”°)‰ÕĞÑ¡¥Ì±…Õ¹ ‰•…¸…ĞÉà¸…É±¥•ÈÅàÍÑ…‰¥±¥Ñä¥Ì9=P„É•±¥…‰±”É•Á…¥È¸ÕÉÉ•¹Ğ´)É•Í½±ÕÑ¥½¸µ½¹±ä¼ÈÀĞà]•‰0µ‰…­¥¹œµ±¥µ¥Ğ•áÁ±…¹…Ñ¥½¸¥Ì¥¹ÍÕ™™¥¥•¹Ğ¸%¹¥Ñ¥…°Éà)…±±½…Ñ¥½¸É•µ…¥¹Ì„¡åÁ½Ñ¡•Í¥Ì°¹½ĞÁÉ½Ù•¸…ÕÍ”¸¼¹½ĞÍ…äÅà…¹¹½Ğ™…¥°¸()…ÁÑÕÉ”èMÑÕ‘¥¼½…”°¹¼Í•ÍÍ¥½¸½A…¥¹Ğ°Y%\½ÉÉ•Ñ±ä±½Í•½¡¥‘‘•¸İ¥Ñ é•É¼‰½Õ¹‘Ì°)¹¼…Ñµ½ÍÁ¡•É”°UXİ½É­ÍÁ…”…‰Í•¹Ğ¸Y¥Í¥‰±”=4¥éµ¼ÄäÙàÄäØ…ĞÜÔÌ¸Øä¼ĞÀà¸ÜÜì)¥ÑÌÉ¥¡Ğ•‘”äĞä¸Øä¥ÌÍ¡½ÉĞ½˜•…É±¥•ÈÄÀÈÑMLÕÑ½™˜¸Q¡¥ÌÉ•Á½ÉĞ‘½•Ì¹½Ğ…ÁÑÕÉ”)İ¡•É”Ù¥Í¥‰±”¥éµ¼Á¥á•±Ì‘¥Í…ÁÁ•…È¸Q½½±‰…È=4½¡¥ÑÌ¡•…±Ñ¡äì¹¼Ù¥ÍÕ…°ÍÕ•ÍÌ)¥¹™•ÉÉ•¸9½Ñ¡¥¹œÑ¥•Ì™…Õ±ĞÑ¼¹•ÜÄÀÀĞ™¥±°¸ÄÀÀĞ™•…ÑÕÉ”…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ¸()9•Ü¥±”€´øU$•‰Õœ€´ø-••ÀÇ\½¸É•±½…•áÁ±¥¥Ñ±äÍ…Ù•ÌÅà±…Õ¹ ÁÉ•™•É•¹”…¹)…ÁÁ±¥•ÌÕÉÉ•¹ĞÅà¸M…µ”‰ÕÑÑ½¸‰•½µ•ÌUÍ”¹½Éµ…°½¸É•±½…Ñ¼É•µ½Ù”ÁÉ•™•É•¹”¸)=É¥¥¹…°Ñ•µÁ½É…ÉäQ•ÍĞÇ\½I•ÍÑ½É”¹½Éµ…°½¹ÑÉ½±ÌÉ•Ñ…¥¹•¸•‰Õœ½™˜½Á…•¡¥‘”¹½Ü)É•ÍÑ½É”MY±…Õ¹ ÁÉ•™•É•¹”€¡¹½Éµ…°İ¡•¸¹½¹”¤°É…Ñ¡•ÈÑ¡…¸…±İ…åÌ±•…É¥¹œÅà¸)•™…Õ±Ğ¹½Éµ…°…ÁÁ•ÈÕ¹¡…¹•™½ÈÕÍ•ÉÌİ¡¼‘¼¹½Ğ½ÁĞ¥¸¸±½…±MÑ½É…”‘•¹¥…°¼)¥¹Ù…±¥Ù…±Õ•Ì™…±°‰…¬Ñ¼¹½Éµ…°ì™…¥±•Í…Ù”É•Á½ÉÑ•¡½¹•ÍÑ±ä°¹¼™…±Í”ÍÕ•ÍÌ¸)M¹…ÁÍ¡½Ğ¥¹±Õ‘•ÌÍ…Ù•‘MÑ…ÉÑÕÀì‘•‰ÕœµÍÑ…ÉÑÕÀ¹½ÜÉ•½É‘ÌÉ•ÅÕ•ÍÑ•½Í…Ù•½‰…­¥¹œÍ¥é”¸)9¼…ÕÑ½µ…Ñ¥Œ‰±¥¹¬½É•±½…°ML½ATµ¡¥¹Ğ½µ•¹Ô½¥éµ¼½•½µ•ÑÉä½¡¥ÍÑ½Éä½Á…¥¹Ğ¡…¹•Ì¸()=É¥¥¹…°Í¥é¥¹œ½İ¹•ÈÉ•…‘ÌÁÉ•™•É•¹”‰•™½É”‰¥¹‘¥¹œì•á¥ÍÑ¥¹œµ…¥¸¥µµ•‘¥…Ñ”)É•Í¥é”¹½ÜÉ•…‘Ì¥¹¥Ñ¥…±¥é•½İ¹•ÈÉ•ÅÕ•ÍĞ°Í¼%IMP™Õ±°‘É…İ¥¹œµ‰Õ™™•È…±±½…Ñ¥½¸)…¸‰”Åà°¹½Ğ¥¹¥Ñ¥…°Éà™½±±½İ•‰ä‘•±…å•‘½İ¹É…‘”¸½…±•Í•Í¥é¥¹œÉ•µ…¥¹Ì½¹±ä)±¥™•å±”½İ¹•È¸áÁ±¥¥Ğ¡…¹”É•™ÕÍ…°İ¡¥±”Ñ½½±Ì½A…¥¹Ğ½‘É…œ½ÁÉ½‰•Ì‰ÕÍäÉ•Ñ…¥¹•¸)Q•ÍÑÌ•á•ÕÑ”…ÑÕ…°™¥ÉÍĞµ…¥¸…±±½…Ñ¥½¸€ ÄÌØÙààÈÙàÄ°¹¼Éà¥¹Ñ•Éµ•‘¥…Ñ”¤°Í…Ù•)‰¥¹‘¥¹œÉ•ÍÑ…ÉĞ°É•Í•Ğ½Á…•¡¥‘”½‘•™…Õ±ĞÉ•ÍÑ½É…Ñ¥½¸°ÍÑ½É…”™…¥±ÕÉ”½¥¹Ù…±¥Ù…±Õ•Ì°)…ÑÕ…°‰ÕÑÑ½¹Ì½Í¹…ÁÍ¡½Ğ…¹¹•…É‰äÙ¥•İÁ½ÉĞ½UX½A…¥¹Ğ¸AÕ‰±¥…Ñ¥½¸½É•ÍÕ±ÑÌÉ•½É‘•)¥¸‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÀÔ¹µ¸9¼¹…Ñ¥Ù”Á¥á•°É•Á…¥È±…¥µ•ìÉ¥¡ĞµÉ•¥½¸…Ñ”=A8¸()Y%ÄÀÀÔè¥¹¥Í Ñ½½±Ì€´ø¥±”½U$•‰Õœ€´ø-••ÀÇ\½¸É•±½…¸½¹™¥É´‰ÕÑÑ½¸É•…‘Ì)UÍ”¹½Éµ…°½¸É•±½…°Ñ¡•¸É•™É•Í =9¸%¹ÍÁ•ĞÉ¥¡ĞÑ½½±‰…È½µ•¹Ô½¥éµ¼¥µµ•‘¥…Ñ•±ä)…¹…™Ñ•È¹½Éµ…°¹…Ù¥…Ñ¥½¸¸½ÁäÉ•Á½ÉĞ¥˜™…¥±ÕÉ”É•ÑÕÉ¹ÌìÍ…Ù•‘MÑ…ÉÑÕÀÄÁ±ÕÌ)É•ÅÕ•ÍÑ•Ä½‰…­¥¹œÄÌØÙààÈØ•ÍÑ…‰±¥Í¡•Ì™É•Í Åà±…Õ¹ ¸•‰Õœ½™˜­••ÁÌÍ…Ù•Åà¸UÍ”)¹½Éµ…°½¸É•±½…É•ÍÑ½É•Ì½É¥¥¹…°É•Í½±ÕÑ¥½¸¥˜İ…¹Ñ•¸9¼É•Á•…Ñ•…¡”µ±•…É¥¹œ)½È¥‘•¹Ñ¥…°½±‘¥…¹½ÍÑ¥ÌÉ•ÅÕ•ÍÑ•¸ÄÀÀĞ¥±°‰•¡…Ù¥½ÈÉ•Ñ…¥¹•ì¹½Ğµ…É­•AML¸((ŒŒ€¸ÄÀÀÔ½¹Ñ¥¹Õ…Ñ¥½¸…Õ‘¥ĞƒŠP€Èà=Ñ½‰•È€ÈÀÈØ()Õ‘¥Ñ•ÕÉÉ•¹Ğµ…¥¸‘‰ŒÜÄÙĞ€¡ÉÕ¹Ñ¥µ”€Øäá•˜ÔÀà¤ì¹¼ÉÕ¹Ñ¥µ”¡…¹•Ì½È¹•Ü‰Õ¥±¸)É•Í ±½…°9½‘”ÈĞ¸ÈÈ¸Ä™Õ±°É•É•ÍÍ¥½¸è€ÈäÈØAML€¼€À%0€¼€ÀÍ­¥ÁÁ•€ ÄÀä¸àÅÌ¤¸)!½ÍÑ•É•É•ÍÍ¥½¸ĞÀØÈØàÈÌĞĞÈ…¹A…•ÌĞÀØÈØäÜÜĞØà½µÁ±•Ñ•MUML¸)1¥Ù”Ù•ÉÍ¥½¸½¥¹‘•à½µ…¥¸½Ù¥•İÁ½ÉĞµÍ¥é¥¹œ½•ÍÑÕÉ”µ‘•‰Õœ…±°‰åÑ”µµ…Ñ ÕÉÉ•¹Ğµ…¥¸ì)É•±•…Í”µ…É­•ÉÌ…¹É•Ù¥•İ•ÄÀÀÔÍ¥é¥¹œ½‘•‰Õœ½Á…É•¹ĞÁ¥¹Ì…É•”ìÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸ÀÉ•Ñ…¥¹•¸)á¥ÍÑ¥¹œÄÀÀĞ…”½…•É½ÕÀ½]¡½±”½‰©•Ğ¥±°…¹ÄÀÀÔÍ…Ù•µÍÑ…ÉÑÕÀÅàÉ•ÕÍ”Ñ¡•¥È)½É¥¥¹…°½İ¹•ÉÌ¸9•¥Ñ¡•È¡…Ì¹•Ü‘•Ù¥”…•ÁÑ…¹”ìÉ¥¡ĞµÉ•¥½¸Ù¥Í¥‰¥±¥ÑäÉ•µ…¥¹Ì=A8¸)9•áĞèY%ÄÀÀÔÍ…Ù•Åà™É•Í É•±½…°Ñ¡•¸Y%ÄÀÀĞA•¹¥°¥±°½¡½±½U¹‘½I•‘¼¸)=‰Ñ…¥¸Ñ¡…ĞÉ•ÍÕ±Ğ‰•™½É”…¹½Ñ¡•ÈÍÁ•Õ±…Ñ¥Ù”É•¹‘•É¥¹œ¡…¹”ì‘¼¹½Ğ¥¹™•È„É•Á…¥È)™É½´…ÕÑ½µ…Ñ•É•É•ÍÍ¥½¸½È¡•…±Ñ¡ä=4½¡¥ĞÑ•ÍÑÌ¸9¼AML¥¹™•ÉÉ•™É½´Ñ¡¥Ì…Õ‘¥Ğ¸((ŒŒ€¸ÄÀÀÔ‘•Ù¥”™••‘‰…¬ƒŠP¥±°AMLìÍÉ••¸%0ƒŠP€Èà=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äAMM•Ì¥±°‰•¡…Ù¥½ÕÈ¸AÉ½Ñ•ĞÄÀÀĞ…”½…•É½ÕÀ½]¡½±”½‰©•Ğ¥±°°)¡½±•áÁ…¹Í¥½¸°½É¥¥¹…°É…ÍÑ•È½¥¹ÁÕĞ½¡¥ÍÑ½Éä½İ¹•ÉÌ…¹ÕÉÉ•¹Ğ…•ÁÑ•U$ì¹¼)¹•Ü¥±°¡…¹•ÌÉ•ÅÕ•ÍÑ•¸Q¡¥Ì…•ÁÑ…¹”ÍÕÁ•ÉÍ•‘•ÌÁ•¹‘¥¹œ¥±°…Ñ•Ì‰•±½Ü¸)UÍ•È•áÁ±¥¥Ñ±ä%1ÌÍÉ••¸‰•¡…Ù¥½ÕÈè…•É½ÕÀµ•¹ÔÍÑ¥±°•µÁÑä¸ÕÉ¥¹œÉ•™É•Í °)‰½ÑÑ½´µÉ¥¡ĞÍÑ…ÉÑÕÀµ•ÍÍ…•Ì¹½Éµ…±±äÍ•ÑÑ±”Ñ¼…”µ½‘”€¼¹½Ñ¡¥¹œÍ•±•Ñ•€¼5Õ±Ñ¤ì)…‰Í•¹”½˜Ñ¡…Ğµ•ÍÍ…”±•ÑÌÕÍ•È¥‘•¹Ñ¥™äÑ¡”™…¥±•É¥¡ĞÉ•¥½¸¥µµ•‘¥…Ñ•±ä¸)Q¡¥Ì¥Ì„ÕÍ•™Õ°ÍÑ…ÉÑÕÀÍåµÁÑ½´‰•™½É”½Á•¹¥¹œÑ¡”µ•¹Ô°¹½ĞÁÉ½½˜½˜…¸•µÁÑä)Í•±•Ñ¥½¸½É½ÕÀµ½‘•°°™…¥±•ÍÑ…ÑÕÌİÉ¥Ñ•È½È„ÍÁ•¥™¥Œ‰É½İÍ•Èµ•¹¥¹”…ÕÍ”¸)=É¥¥¹…°µ…¥¸¹ÕÁ‘…Ñ•MÑ…ÑÕÌ½İ¹ÌÍÑ…ÑÕÌÑ•áĞì•á¥ÍÑ¥¹œ5Õ±Ñ¤¥¹¥Ñ¥…±¥é…Ñ¥½¸…¸ÕÁ‘…Ñ”)¥ÑÌİ½É‘¥¹œ¸MÑ…ÑÕÌ™½½Ñ•È…¹Y%\ÕÍ”‘¥™™•É•¹ĞU$½İ¹•ÉÌì¹¼µ¥ÍÍ¥¹œÍ¡…É•…Ñ¥½¸)½È½¹™¥Éµ•½µµ½¸…ÁÁ±¥…Ñ¥½¸±¥À•ÍÑ…‰±¥Í¡•¸9¼ÍÁ•Õ±…Ñ¥Ù”ÉÕ¹Ñ¥µ”½MLÉ•Á…¥È¸)É•Í Í…Ù•Åà±…Õ¹ ¥Ì9=PÙ•É¥™¥•‰äÑ¡¥Ì™••‘‰…¬…±½¹”è¹¼Í…Ù•‘MÑ…ÉÑÕÀ½É•ÅÕ•ÍÑ•¼)‰…­¥¹œ‘¥µ•¹Í¥½¹ÌÍÕÁÁ±¥•¸½¹™¥É´İ¡•Ñ¡•È-••ÀÅà½¸É•±½…İ…Ì•¹…‰±•‰•™½É”Ñ¡”)™…¥±•É•™É•Í ‰•™½É”‘•±…É¥¹œ™¥ÉÍĞµ…±±½…Ñ¥½¸Åà‘¥ÍÁÉ½Ù•¸¸AÉ¥½È±¥Ù”ÅàÉ•ÕÉÉ•¹”)…¹ÕÉÉ•¹ĞÍÉ••¸%0É•Ñ…¥¹•ì‘¼¹½Ğ±…¥´ÄÀÀÔÉ•Á…¥É•Ù¥Í¥‰¥±¥Ñä½ÈÉ•ÅÕ•ÍĞÑ¡”)Í…µ”½±‘¥…¹½ÍÑ¥Ì¸ÕÉÉ•¹ĞÉÕ¹Ñ¥µ”ÄÀÀÔì¹¼¹•Ü‰Õ¥±½ÈÑ•ÍÑÌ¥¸Ñ¡¥Ì™••‘‰…¬ÕÁ‘…Ñ”¸)UÍ•È¹½Ü¥‘•¹Ñ¥™¥•ÌÑ¡¥Ì…Ì„‰±½­•È™½ÈÑ¡”¹•áĞ‰•Ñ„…¹…Í­Ìİ¡•Ñ¡•È…¸¥¹Ñ•É™…”)É•‰Õ¥±¥Ì…ÁÁÉ½ÁÉ¥…Ñ”¸I•½µµ•¹‘•¹•áĞ•¹¥¹••É¥¹œ‘¥É•Ñ¥½¸è½¹ÑÉ½±±•Í¡•±°)¥Í½±…Ñ¥½¸½É•½¹ÍÑÉÕÑ¥½¸İ¥Ñ •á¥ÍÑ¥¹œÑ½½°½=4½…Ñ¥½¸½İ¹•ÉÌ°Í…µ”…•ÁÑ•…ÁÁ•…É…¹”°)…¹¹…Ñ¥Ù”ÍÑ…ÉÑÕÀ½É•±½…½µÁ…É¥Í½¸ì¹¼İ¡½±•Í…±”É•Í­¥¸½È‘ÕÁ±¥…Ñ”­•É¹•±Ì¸)Q¡¥Ì¥Ì„ÁÉ½Á½Í…°°¹½Ğ¥µÁ±•µ•¹Ñ•½È±…¥µ•Ñ¼Õ…É…¹Ñ•”„É•¹‘•É¥¹œÉ•Á…¥È¸((ŒŒ€¸ÄÀÀØƒŠP½¹ÑÉ½±±•Í¡•±°½µÁ…É¥Í½¸İ¥Ñ ¥¸µ…ÁÀÑ•ÍĞ±¥ÍĞƒŠP€Èà=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±ä…ÕÑ¡½É¥é•Ì€½¹•áÑ‰Õ¥±…¹É•ÅÕ¥É•Ì¥¹ÍÑÉÕÑ¥½¹Ì%9M%Ñ¡”…ÁÀè)Íİ¥Ñ¡¥¹œ…İ…äÑ¼¡…Ğ…¸¡•…°Ñ¡”¹…Ñ¥Ù”™…Õ±Ğ…¹¥¹Ù…±¥‘…Ñ•Ì½‰Í•ÉÙ…Ñ¥½¸¸)Õ‘¥Ñ•µ…¥¸„ÜÁˆÁ˜åŒ½ÉÕ¹Ñ¥µ”Øäá•˜ÔÀà°İ½É­™±½Ü½™Õ±°¡…¹‘½™˜½¡•­±¥ÍĞ½É½…‘µ…À…¹)É••¹Ğ¡¥ÍÑ½Éä°±¥Ù”ÄÀÀÔµ…É­•ÉÌ½Á¥¹Ì…¹…ÑÕ…°…¹Ù…Ì½U$½Y%\½¥¹ÁÕĞ½Á…¥¹Ğµ½Ù•É±…ä)½İ¹•ÉÌ¸9¼½µÁ…É¥Í½¸ÉÕ¹¹•È•á¥ÍÑ•¸ÄÀÀĞ¥±°ÕÍ•ÈAMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•ì(ÄÀÀÔÍÉ••¸%0¥Ì„‰•Ñ„‰±½­•È¸9¼Á•Éµ…¹•¹ĞÉ•¹‘•É¥¹œÉ•Á…¥È±…¥µ•¸()9•Ü¥±”€øMÉ••¸½µÁ…É¥Í½¸€¼Ñ•ÍĞ±¥ÍĞ¸¥É•ĞÑ•ÍĞUI1ÌÕÍ”Í¡•±±Q•ÍĞõÕÉÉ•¹Ğ(¡¤½ÈÍ¡•±±Q•ÍĞõÍ•Á…É…Ñ•€¡¤¸•™…Õ±Ğ•¹ÑÉä­••ÁÌ•á¥ÍÑ¥¹œÍÑÉÕÑÕÉ”ìÑ•ÍĞ•¹ÑÉä)½Á•¹ÌM5±•™Ğ¡•­±¥ÍĞ‰•™½É”µ½‘•±±¥¹œµ½‘Õ±•Ì•á•ÕÑ”°¥¹±Õ‘¥¹œ½¸É•±½…¸)…±½¹”µ½Ù•ÌM5½É¥¥¹…°€Ù¥•İÁ½ÉĞ…¹Ù…Ì¥¹Ñ¼€‰½á±…‰½µÁ…É¥Í½¹…¹Ù…ÍMÕÉ™…”°)„Í¥‰±¥¹œ¥µµ•‘¥…Ñ•±ä‰•™½É”½É¥¥¹…°€Ù¥•İÁ½ÉÑ]É…Àİ¥Ñ¡¥¸€…ÁÀ¸…¹Ù…Ì…¹U$¹½Ü)¡…Ù”Í•Á…É…Ñ”Ù¥•İÁ½ÉĞÍÕÉ™…•Ì¸M…µ”Ù¥•İÁ½ÉĞ‘¥µ•¹Í¥½¹Ì½Ñ½Á‰…È½™™Í•ÑÌ°Í…µ”)…¹Ù…Ì%½±¥ÍÑ•¹•ÉÌ½‰…­¥¹œµÍ¥é”½İ¹•È½É•¹‘•É•È½µ½‘•°½¡¥ÍÑ½Éä½Í•±•Ñ¥½¸½Ñ½½°¹½‘•Ì¸)=É¥¥¹…°U$İÉ…ÁÁ•ÈÍÑ…åÌ¥¸Á±…”ìÑÉ…¹ÍÁ…É•¹ĞÁ½¥¹Ñ•ÈµÁ…ÍÌµÑ¡É½Õ •µÁÑäÍÁ…”°)…ÑÕ…°½¹ÑÉ½±Ì…¹UX…¹Ù…ÌÉ•µ…¥¸¥¹Ñ•É…Ñ¥Ù”ì½É¥¥¹…°¥éµ¼MY¡¥ĞÁÉ½á¥•Ì)…¹¹½¹¥¹Ñ•É…Ñ¥Ù”É½½Ğ½ÍÑ…ÑÕÌÉ•Ñ…¥¸Ñ¡•¥È½İ¸ÉÕ±•Ì¸9¼‰±…¹­•ĞÉ•Á…É•¹Ñ¥¹œ½˜)U$°•áÑÉ„…¹Ù…Ì½É•¹‘•É•È°AT¡¥¹ÑÌ°™½É•É•Á…¥¹Ğ½È¹•Ü•ÍÑÕÉ”½İ¹•È¸=É¥¥¹…°)A…¥¹Ğ¥µ…”½Ù•É±…ä™½±±½İÌ…¹Ù…ÌÁ…É•¹Ğ…¹µ…Ñ¡¥¹œÙ¥•İÁ½ÉĞ½½É‘¥¹…Ñ•Ì¸()½¡…¹•Ì½¹±ä½¸aA1%%P™Õ±°É•±½…ì¹¼±¥Ù”ÁÉ½™¥±”Íİ…ÀÑ¡…Ğ½Õ±¡•…°)™…¥±ÕÉ”‰•™½É”½µÁ…É¥Í½¸¸%¸µ…ÁÀÍÑ…ÉÑÕÀ½ÍÑ…ÑÕÌ½Ñ½½±‰…È°Y%\…•É½ÕÁÌ°¥éµ¼)É¥¡ĞÍ¥‘”°UX‘¥Ñ½ÈÉ•ÑÕÉ¸…¹A…¥¹ĞÉ•ÑÕÉ¸½¹…Ù¥…Ñ¥½¸¡•­Ì¡…Ù”AML½%0°)¹½Ñ•Ì°½±±…ÁÍ”½Q•ÍĞ±¥ÍĞ°Á•ÈµÁÉ½™¥±”½µÁ±•Ñ•½™…¥±•½Õ¹ÑÌ…¹½ÁäÉ•ÍÕ±ÑÌ¸)%¹¥Ñ¥…°½É…Ñ•µÕ¹Í•Ğ±½…‘Ì¹•Ù•È‰•½µ”Á…ÍÍ•Ì¸¥ÉÍĞ™…¥±ÕÉ”ÍÑ…åÌÉ•½É‘••Ù•¸)¥˜„ÍÑ•À¥ÌÉ•É…Ñ•ì•Ù¥‘•¹”É•…‘Ì½É¥¥¹…°‘•‰ÕœÍ¹…ÁÍ¡½Ğİ¥Ñ¡½ÕĞ•¹…‰±¥¹œ¥Ğ°)İ¥Ñ¡½ÕĞÉ•™É•Í °‰½Õ¹‘•™¥•±‘Ì½¹±ä¸ÑÕ…°ML½‰…­¥¹œ½AH½É•ÅÕ•ÍÑ•½Í…Ù•ÍÑ…ÉÑÕÀ)É•Í½±ÕÑ¥½¸É•½É‘•İ¥Ñ •… É…Ñ¥¹œ¸9¼…ÕÑ½µ…Ñ¥ŒÉ•Í½±ÕÑ¥½¸¡…¹”¸-••ÀÍ…µ”)É•Í½±ÕÑ¥½¸½½É¥•¹Ñ…Ñ¥½¸½‘•™…Õ±ĞÕ‰”¥¸‰½Ñ ÁÉ½™¥±•Ìì…¥´Ô½µÁ±•Ñ•±½…‘Ì•… ¸()1…ÍĞÌÀ±½…‘ÌÁ•ÉÍ¥ÍĞ±½…±±äÕ¹‘•È‰½á±…ˆ¹Í¡•±°µ½µÁ…É¥Í½¸¹ØÄ°‰Õ¥±µÑ…•½‰½Õ¹‘•¸)MÑ½É…”‘•¹¥…°½½ÉÉÕÁÑ¥½¸½¹¼µ½ÀİÉ¥Ñ•Ì¡…¹‘±•¡½¹•ÍÑ±äì™…¥±•Á•ÉÍ¥ÍÑ•¹”É•™ÕÍ•Ì)¥¸µ…ÁÀÉ•±½…°½Áä¡…ÌÍ•±•Ñ…‰±”¥¸µÁ…¹•°™…±±‰…¬¸AÉ½©•ĞµÕÍĞ‰”Í…Ù•™¥ÉÍĞè)•áÁ±¥¥ĞÑÉ…¹Í¥•¹Ğ‘¥Í…É…­¹½İ±•‘•µ•¹Ğ…¹½É¥¥¹…°‰ÕÍäµÍÑ…Ñ”Õ…É‘ÌÁÉ••‘”)I•±½…½Mİ¥Ñ ½á¥Ğ¸M•¹”•‘¥ÑÌ…É”9=PÑÉ…¹ÍÁ½ÉÑ•…É½ÍÌÉ•±½…ì¹¼…ÕÑ½Í…Ù”°)ÁÉ½©•Ğ½Í¡•µ„½¡¥ÍÑ½ÉäµÕÑ…Ñ¥½¸½È…ÕÑ½µ…Ñ¥ŒÉ•Í•Ğ¸á¥ĞÉ•µ½Ù•ÌÑ•ÍĞÅÕ•Éä½¸¹•áĞ)É•±½…ì‘•™…Õ±Ğ¹½Éµ…°…ÁÀÉ•ÑÕÉ¹Ì…¹É•ÍÕ±ÑÌÉ•Ñ…¥¹•¸9¼…ÁÀÍİ¥Ñ¡¥¹œ¹••‘•)Õ¹Ñ¥°½µÁ±•Ñ•É•ÍÕ±ÑÌ…É”½Á¥•¸UI1ÌÍÕÉÙ¥Ù”½É¥¥¹…°É•±•…Í”µ…¡”É•½Ù•Éä¸()¡…¹•ÉÕ¹Ñ¥µ”½¹±ä9\Í¡•±°µ½µÁ…É¥Í½¸¹©Ì½ML…¹½É¥¥¹…°!Q50½É•½Ù•Éä­•åÌÄÀÀØì)…±°•á¥ÍÑ¥¹œµ½‘•±±¥¹œ½A…¥¹Ğ½¥±°½µ…¥¸ÄÀÀÔ½Í¥é¥¹œÄÀÀÔ½‘•‰ÕœÄÀÀÔ½Y%\ääà½5Õ±Ñ¤Ä¸À…¹)™É½é•¸‰•Ñ„‰åÑ•Ì½Á¥¹ÌÉ•Ñ…¥¹•¸I•Ù¥•İ•…ÍÍ•Ğ½¹ÑÉ…Ğ…‘‘ÌÑİ¼¹•Ü•á…Ğ…ÍÍ•ÑÌì)¹¼‰±…¹­•ĞÉ•Á¥¹¹¥¹œ¸9¥¹”¹•Ü…ÑÕ…°µ½İ¹•ÈÑ•ÍÑÌÁ±ÕÌĞÄ¹•…É‰ä¡•­ÌèÔÀ™½ÕÍ•)AML°¹¼™…¥±ÕÉ•Ì½Í­¥ÁÌ¸Õ±°±½…°ÈäÌÔAML¼À%0¼ÁÍ­¥À€ ÄÀÈ¸ÔÅÌ¤¸)AÕ‰±¥…Ñ¥½¸É•ÍÕ±ÑÌè‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÀØ¹µ¸)1½…°‰É½İÍ•È•á•ÕÑ…‰±”¥¹ÍÑ…±±…Ñ¥½¸Õ¹…Ù…¥±…‰±”€¡‘½İ¹±½…İ…Ì¹½ĞÙ…±¥é¥À¤ì)¹¼±½…°É•¹‘•É•½È¹…Ñ¥Ù”¥A…ÍÕ•ÍÌ¥¹™•ÉÉ•™É½´9½‘”½=4Ñ•ÍÑÌ¸()Y%ÄÀÀØèM…Ù”É•…°ÁÉ½©•Ğ¸¥±”€øMÉ••¸½µÁ…É¥Í½¸€¼Ñ•ÍĞ±¥ÍĞ€ø…­¹½İ±•‘”)Ñ•ÍĞÍ•¹”‘¥ÍÁ½Í…‰±”€øMÑ…ÉĞÕÉÉ•¹Ğ€¬É•±½…¸½±±½Ü±¥ÍĞìÉ…Ñ”ÍÑ…ÉÑÕÀ	=I)½Á•¹¥¹œµ•¹ÕÌ½½±±…ÁÍ¥¹œ¸½µÁ±•Ñ”¡•­Ì°É•±½…Í…µ”Í¡•±°ÕÀÑ¼Ô±½…‘Ì°Mİ¥Ñ )…¹É•Á•…Ğİ¥Ñ¡½ÕĞ±•…Ù¥¹œ‰É½İÍ•È½È¡…¹¥¹œÉ•Í½±ÕÑ¥½¸¸I•½É%0¥µµ•‘¥…Ñ•±äì)…¥´Ô•… °µ…äÍİ¥Ñ •…É±ä½¸™…¥±ÕÉ”¸½ÁäÉ•ÍÕ±ÑÌQHÑ•ÍÑ¥¹œ°Ñ¡•¸Í•¹¡…Ğ¸)9…Ñ¥Ù”Ù¥Í¥‰¥±¥Ñä…Ñ”É•µ…¥¹Ì=A8ì‘¼¹½Ğ¥¹™•È™Õ±°‰•Ñ„É•…‘¥¹•ÍÌ™É½´½¹”½½)ÉÕ¸½È±…¥´…¹Ù…Ì½U$Í•Á…É…Ñ¥½¸ÁÉ½Ù•…¸•¹¥¹”…ÕÍ”¸%˜‰½Ñ ™…¥°°É•‘Õ”Í¡•±°)™ÕÉÑ¡•È™É½´•Ù¥‘•¹”É…Ñ¡•ÈÑ¡…¸İ¡½±•Í…±”É•Í­¥¸½ÈÉ•Á•…Ñ•½Íµ•Ñ¥ŒÁ…Ñ¡•Ì¸()AÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”É˜ÈÍ”àÀÈÅ™ˆåÄİŒÀÅÉ•”å™˜àÀÉ˜É„àÄÄÍ”ÄÁ°Ñ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”)ÀäàÕ”ÔàÈåˆÀàĞàÍ‰ˆàÄÑ”Õ˜ÄÔĞÄå„Í˜àÔàäÜÑ€¡…±°ÄÄ‰±½ˆ¡…Í¡•Ìµ…Ñ¡•‰•™½É”…Ñ½µ¥Œ)¹½¸µ™½É•µ…¥¸ÕÁ‘…Ñ”¤¸•Ñ¡•µ…¥¸½ÑÉ•”Ù•É¥™¥•ìA…•ÌĞÀØØÌĞĞØÔØä…¹¡½ÍÑ•)É•É•ÍÍ¥½¸ĞÀØØÌĞĞÜÔØĞMUML¸¥¡Ğ±¥Ù”É•±•…Í”½Í¡•±°½¹•Ü…ÍÍ•ÑÌ½µ…¥¸½Í¥é¥¹œ¼)É•½Ù•Éä™¥±•Ì‰åÑ”µµ…Ñ ±½…°¸¥Ù”™¥¹…°É•±•…Í”µ½¹ÑÉ…Ğ¡•­ÌAML¸)±½Õ¡É½µ”U$µ½¹±äÍµ½­”½¹™¥ÉµÌÉ•¹‘•É•¡•­±¥ÍĞ°É…Ñ¥¹œ½¹½Ñ•ÌÁ•ÉÍ¥ÍÑ•¹”)…É½ÍÌ…ÑÕ…°ŠIÉ•±½…°½Á¥•±½œ°•á…ĞÍ¡…É•Ù¥•İÁ½ÉĞ‰½Õ¹‘Ì…¹•¹ÑÉ”µ…¹Ù…Ì)¡¥ĞÉ½ÕÑ¥¹œ°½É¥¥¹…°M1P…¹Ù¥Í¥‰±”…•É½ÕÁÌÍ•ÑÑ¥¹Ì¸]•‰0‘¥Í…‰±•¥¸Ñ¡¥Ì)‰É½İÍ•È™½È‰½Ñ ½±ÄÀÀÔ…¹ÄÀÀØ°Í¼9<±½Õµ½‘•±±¥¹œ½¹…Ñ¥Ù”¥A…É•Á…¥ÈÁÉ½½˜¸(ÄÀÀØ1%Y…¹É•…‘ä™½È‘•Ù¥”½µÁ…É¥Í½¸ìÍÉ••¸‰•Ñ„‰±½­•ÈÉ•µ…¥¹Ì=A8¸((ŒŒ€¸ÄÀÀÜƒŠPÕ¹‰±½¬UX	…¬Ñ¼€Í‰•¹•…Ñ ½µÁ…É¥Í½¸¡•­±¥ÍĞƒŠP€Èà=Ñ½‰•È€ÈÀÈØ()UÍ•È…¹¹½Ğ½µÁ±•Ñ”ÌUXÉ•ÑÕÉ¸¡•¬èÑ¡”±•™Ğ¡•­±¥ÍĞ½Ù•ÉÌ½É¥¥¹…°	…¬)Ñ¼Í°¥¹±Õ‘¥¹œ¥ÑÌ½±±…ÁÍ•¡•…‘•È¸Q¡¥Ì¥Ì„¡•­±¥ÍĞµÁ±…•µ•¹Ğ™…¥±ÕÉ”°¹½Ğ)¹…Ñ¥Ù”É•¹‘•É¥¹œ…•ÁÑ…¹”½™…¥±ÕÉ”¸Õ‘¥Ñ•ÕÉÉ•¹Ğµ…¥¸ÁÀÀÜÑ˜À½ÉÕ¹Ñ¥µ”É˜ÈÍ”àÀÈ°)™Õ±°É•ÅÕ¥É•‘½Õµ•¹ÑÌ…¹½É¥¥¹…°UXİ½É­ÍÁ…”¹¡¥‘‘•¸½	…¬…±±‰…¬½İ¹•ÉÍ¡¥À¸()=¹±äİ¡¥±”½É¥¥¹…°€‰½á±…‰UY]½É­ÍÁ…”¥Ì9=P¡¥‘‘•¸°Í¡…É•½¡•­±¥ÍĞÁ…É­Ì)¥¸±½İ•Èµ±•™Ğ‰•Ñİ••¸ÔÁ‘Ù …¹‰½ÑÑ½´ÄĞÁÁà½Í…™”¥¹Í•Ğ¸áÁ…¹‘•…¹½±±…ÁÍ•±¥ÍĞ)‰½Ñ ±•…ÈÑ¡”ÕÁÁ•ÈUXÑ½½±‰…È¸=É¥¥¹…°UX¡¥‘‘•¸ÍÑ…Ñ”‘É¥Ù•ÌML€é¡…Ìì±½Í¥¹œ)É•ÑÕÉ¹Ì½É¥¥¹…°ÕÁÁ•ÈÁ±…•µ•¹Ğ¸9¼½‰Í•ÉÙ•È½Á½±±¥¹œ°Ù¥•İÁ½ÉĞÉ•Í¥é”°…¹Ù…Ì½µ½‘•°¼)•‘¥Ñ½È½	…¬½İ¹•Èµ½‘¥™¥…Ñ¥½¸½È…ÕÑ½µ…Ñ¥Œ‘¥ÍÁ±…äÉ•½Ù•Éä¸	½Ñ ÁÉ½™¥±”ÍÑÉÕÑÕÉ•Ì°)É•¹‘•É•ÈÉ•Í½±ÕÑ¥½¸°½É¥¥¹…°Ñ½½°%Ì½±¥ÍÑ•¹•ÉÌ½¡¥ÍÑ½Éä°¥±°AML…¹5Õ±Ñ¤Ä¸ÀÉ•Ñ…¥¹•¸)%¸µ…ÁÀUXÍÑ•À•áÁ±…¥¹ÌÑ¡”‘½­¥¹œì½±±…ÁÍ”É•µ…¥¹Ì…Ù…¥±…‰±”™½È•áÑÉ„É½½´¸((ÄÀÀÜ±½œÉ•…‘•È…•ÁÑÌÄÀÀØÉ•½É‘Ì…¹ÍÑ…µÁÌÑ¡•¥È½É¥¥¹…°É•±•…Í”°ÁÉ•Í•ÉÙ¥¹œ)Á…ÉÑ¥…°É…Ñ¥¹Ì°¹½Ñ•Ì…¹™¥ÉÍĞµ™…¥±ÕÉ”•Ù¥‘•¹”•á…Ñ±ä¸9•ÜÄÀÀÜ±½…¥ÌÍ•Á…É…Ñ”)…¹Õ¹É…Ñ•ì¹•Ù•È½Áä•…É±¥•ÈÁ…ÍÍ•Ì¥¹Ñ¼„™É•Í ÍÑ…ÉÑÕÀ¸M…µ”‰½Õ¹‘•­•äÌÁ±½…‘Ì°)¹¼±½œ±•…É¥¹œ¸ÄÀÀÜÍ¡•±°½¹•ÜÍÉ¥ÁĞ½ML½É•½Ù•ÉäÁ¥¹Ì…¹¡…Í¡•ÌÉ•Ù¥•İ•¸(ÌĞ™½ÕÍ•¡•­ÌAML¼Á%0¼ÁÍ­¥Àè½µÁ…É¥Í½¸½Á•ÉÍ¥ÍÑ•¹”½µ¥É…Ñ¥½¸°½É¥¥¹…°UX)İ½É­ÍÁ…”½	…¬½¹…Ù¥…Ñ¥½¸½Ñ½Àµ±…å•È±¥™•å±”°Y%\…¹É•±•…Í”½¹ÑÉ…ÑÌ¸Må¹Ñ…à½‘¥™˜)±•…¸¸9¼¹•Ü™Õ±°±½…°ÍÕ¥Ñ”±…¥´ìÁÉ¥½ÈÄÀÀØ™Õ±°ÈäÌÔÉ•µ…¥¹Ì¡¥ÍÑ½É¥…°•Ù¥‘•¹”¸)AÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”è‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÀÜ¹µ¸MÉ••¸‰•Ñ„…Ñ”É•µ…¥¹Ì=A8¸()Y%ÄÀÀÜèÉ•½Á•¸UX‘¥Ñ½Èì™Õ±°¡•­±¥ÍĞÍ¡½Õ±Á…É¬±½İ•Èµ±•™Ğ°	…¬Ñ¼Í)Ù¥Í¥‰±”½±¥­…‰±”…ĞÑ½À¸½±±…ÁÍ”½É•½Á•¸±¥ÍĞ°	…¬°Ñ¡•¸¡•¬Í…µ”™±½Ü¸á¥ÍÑ¥¹œ(ÄÀÀØÉ…Ñ¥¹ÌÉ•µ…¥¸¥¸½ÁäÉ•ÍÕ±ÑÌìÍÕ‰Í•ÅÕ•¹Ğ±½…‘ÌÍÑ…ÉĞ¹•ÜÕ¹É…Ñ••¹ÑÉ¥•Ì¸)I•ÍÕµ”½½µÁ…É¥Í½¸¥¸…ÁÀ°­••Á¥¹œÉ•Í½±ÕÑ¥½¸Õ¹¡…¹•¸9¼É•Á•…Ñ•¥±°Ñ•ÍĞ¸((ŒŒ€¸ÄÀÀàƒŠP¡½¹•ÍĞÉÕ¹¹¥¹œÙ•ÉÍ¥½¸€¬•áÁ±¥¥Ğ¡•­±¥ÍĞ!¥‘”½‘½¬ƒŠP€Èà=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÍÉ••¹Í¡½ĞÀäÌÙµÌÔä´ÑÀÌµ	À´ÑĞäààÄØäá¹Á¹œÍ¡½İÌÙ¥Í¥‰±”ÄÀÀÜ°°)UX‘¥Ñ½È°¡•­±¥ÍĞÍÑ¥±°ÕÁÁ•Èµ±•™Ğ½Ù•É¥¹œ	…¬Ñ¼Í¸ÍÑ…ÉÑÕÀ½Y%\½¥éµ¼)AML‰ÕÑÑ½¹Ì…É”Í•±•Ñ•™½ÈÑ¡…Ğ½‰Í•ÉÙ•ÉÕ¸ìUX‰±½­•°¹½Ğ„½µÁ½Í¥Ñ½È%0¸)¼¹½Ğ…Í¬™½È…¹½Ñ¡•È¥‘•¹Ñ¥…°ÍÉ••¹Í¡½Ğ½ÈÉ•Á•…Ğ…¡”±•…É¥¹œ¸()Õ‘¥Ğ™½Õ¹„½¹É•Ñ”Ù•ÉÍ¥½¸µ½İ¹•È‘•™•ĞèÉ•™É•Í  ¤ÍÑ…µÁ•¹•Ñİ½É¬Ù•ÉÍ¥½¸¹©Í½¸)±…Ñ•ÍĞ¥¹Ñ¼±…‰•°½Ñ¥Ñ±”½¸Á…•Í¡½Ü½Ù¥Í¥‰¥±¥Ñå¡…¹”İ¥Ñ¡½ÕĞ±½…‘¥¹œÑ¡…ĞÉ•±•…Í”¸)Q¡ÕÌÙ¥Í¥‰±”ÄÀÀÜ1=9‘¥¹½ĞÁÉ½Ù”ÄÀÀÜÍ¡•±°½ÍÉ¥ÁĞ½ML¸=±UX¥¹ÍÑÉÕÑ¥½¸Ñ•áĞ)¥¸ÍÉ••¹Í¡½Ğ¥Ì½¹Í¥ÍÑ•¹Ğİ¥Ñ ½±‘•È¡•­±¥ÍĞ½‘”ìML€é¡…Ì™…¥±ÕÉ”¥Ì9=P)•ÍÑ…‰±¥Í¡•¸I•½É½ÕÑ½µ”…ÌÕÍ•È‰±½­•°¹½ĞÁÉ½½˜½˜„]•‰-¥ĞÍ•±•Ñ½È™…¥±ÕÉ”¸()=É¥¥¹…°É•±•…Í”µÙ•ÉÍ¥½¸¹½ÜÉ•Ñ…¥¹Ì±½…‘•!Q50‘…Ñ„µÉ•±•…Í”µÙ•ÉÍ¥½¸½¸É•™É•Í ì)¹•Ñİ½É¬±…Ñ•ÍĞ•áÁ½Í•Í•Á…É…Ñ•±ä¥¸½É¥¥¹…°A$¹±…Ñ•ÍĞ¸9¼…ÕÑ½µ…Ñ¥ŒÉ•±½…½¡•…°)½È¹•ÜÕÁ‘…Ñ•È¸=É¥¥¹…°ÍÑ…ÉÑÕÀÉ•±•…Í”µ‰½½ÑÍÑÉ…ÀÉ•½Ù•ÉäÉ•Ñ…¥¹•¸Õ‘¥Ñ•Í•½¹)É•±•…Í”¥µÁ½ÉĞÕ¹‘•È™…”µİ½É­™±½Üµ±…å½ÕĞäÌÔìÉ•Á¥¸M5É•±•…Í”½İ¹•ÈÑ¼ÄÀÀàÍ¼)‰½Ñ ‘¥É•Ğ½¹•ÍÑ•¥µÁ½ÉÑÌÉ•Í½±Ù”Ñ¼½¹”µ½‘Õ±”UI0°Á±ÕÌÁ…É•¹Ğ±…å½ÕĞ½‘É…İ•È…¡”)±½ÍÕÉ”¸=¹±ä¥µÁ½ÉĞµ­•ä¡…¹•Ì¥¸±…å½ÕĞ½‘É…İ•Èì¹¼U$½Ñ½½°É•¥µÁ±•µ•¹Ñ…Ñ¥½¸¸()¡•­±¥ÍĞÑ¥Ñ±”…¹Íµ…±°É•½Á•¸‰ÕÑÑ½¸‰…­”Ñ¡•¥È=]8€¸ÄÀÀà½‘”ÍÑ…µÀ°¥¹‘•Á•¹‘•¹Ğ)½˜…ÁÀ½¹•Ñİ½É¬±…‰•°¸áÁ±¥¥Ğ!¥‘”±¥ÍĞ½µÁ±•Ñ•±ä¡¥‘•Ì½É¥¥¹…°Í•Ñ¥½¸ìÍµ…±°)±•™Ğµ•¹ÑÉ”QMP1%MP€¸ÄÀÀàÉ•½Á•¹Ì™Õ±°±¥ÍĞ°ÁÉ•Í•ÉÙ¥¹œÉ•ÍÕ±ÑÌ½¹½Ñ•Ì¸	½Ñ ÁÉ½™¥±•Ì)¥‘•¹Ñ¥…°½¹ÑÉ½±Ì¸%¸µ…ÁÀUX¥¹ÍÑÉÕÑ¥½¹Ì•áÁ±…¥¸!¥‘”¸ÁÀµÍ½Á•5ÕÑ…Ñ¥½¹=‰Í•ÉÙ•È)É•…‘Ì…ÑÕ…°½É¥¥¹…°UXİ½É­ÍÁ…”É•…Ñ¥½¸½¡¥‘‘•¸ÍÑ…Ñ”…¹Í•ÑÌ¥¹±¥¹”±½İ•Èµ±•™Ğ)‘½¬ì½¸±½Í”±•…ÉÌ¥¹±¥¹”‘½­¥¹œ¸9¼€é¡…Ì‘•Á•¹‘•¹ä½Á½±±¥¹œ½É…ÜµÁ½¥¹Ñ•È½İ¹•È°)Ù¥•İÁ½ÉĞÉ•Í¥é”°É•¹‘•É•È½Èµ½‘•°½¡¥ÍÑ½Éä½UX½	…¬½İ¹•È¡…¹•Ì¸=‰Í•ÉÙ•È…‰Í•¹Ğ)¥¸¹½Éµ…°Õ¹½Á•¹•ÉÕ¹¹•È°ÍÑ½ÁÌ½¸!¥‘”½Á…•¡¥‘”…¹É•ÍÕµ•Ì½¸É•½Á•¸½Á…•Í¡½Ü¸)I•Ñ…¥¸ÄÀÀØ¼ÄÀÀÜ±½Ìİ¥Ñ ½É¥¥¹…°Á•ÈµÉÕ¸É•±•…Í”ì¹•ÜÄÀÀà±½…É•µ…¥¹ÌÕ¹É…Ñ•¸((ÌÜ™½ÕÍ•½µÁ…É¥Í½¸½UX½Ñ½Àµ±…å•È½É•±•…Í”¡•­ÌAML°¥¹±Õ‘¥¹œ¹•Ü…ÑÕ…°µ½İ¹•È)!¥‘”½É•½Á•¸½‘½¬½±¥™•å±”°ÄÀÀÜÁÉ½Ù•¹…¹”°…¹½¹¥…°±½…‘¥¹œ…¹½±µÍ¡•±°½¹•ÜµÍ•ÉÙ•È)É•ÑÕÉ¸‰•¡…Ù¥½È¸Må¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸Õ±°µÍÕ¥Ñ”½ÁÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”™½±±½İÌ¥¸)‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÀà¹µ¸AÉ½Ñ•Ñ•¥±°½5Õ±Ñ¤½™É½é•¸½ÉÕ¹Ñ¥µ”µ½‘•±±¥¹œÕ¹¡…¹•¸()Y%ÄÀÀàè‰É½İÍ•ÈÉ•±½…½¹”ì!-1%MP!H¥ÑÍ•±˜µÕÍĞÍ…ä€¸ÄÀÀà¸I•½Á•¸UX)‘¥Ñ½È¥¸ì¡•­±¥ÍĞÁ…É­Ì‰•±½ÜÑ½½±‰…È¸!¥‘”±¥ÍĞµÕÍĞÉ•Ù•…°10ÕÁÁ•È½¹ÑÉ½±Ìì)	…¬Ñ¼ÍÕÍ•Ì½É¥¥¹…°‰ÕÑÑ½¸¸QMP1%MPÉ•½Á•¹ÌÉ…Ñ¥¹Ì°•…É±¥•ÈÄÀÀØ¼ÄÀÀÜÉ•½É‘Ì)É•µ…¥¸¥¸½Áä¸M…µ”¡•¬ìÉ•ÍÕµ”½µÁ…É¥Í½¸¸ÕÉÉ•¹ĞUX‰±½¬É•µ…¥¹ÌÁ•¹‘¥¹œ)¹…Ñ¥Ù”É•Ñ•ÍĞì½É¥¥¹…°ÍÉ••¸‰•Ñ„‰±½­•È=A8°¹¼Á•Éµ…¹•¹ĞÁ¥á•°É•Á…¥È±…¥µ•¸((ŒŒ€¸ÄÀÀà¹…Ñ¥Ù”½µÁ…É¥Í½¸É•ÍÕ±ÑÌƒŠP€Èà=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÍÕÁÁ±¥•½ÁäÉ•ÍÕ±ÑÌ…ĞÈÀÈØ´ÄÀ´ÈáPÄÄèĞÄèÀÀ¸ÔÄÁh€ ÈÄèĞÄ	É¥Í‰…¹”¤¸)½ÕÉÉ•¹ĞèØ½µÁ±•Ñ”€¸ÄÀÀàÉÕ¹ÌèÈ…±°µ™¥Ù”%0°Ğ…±°µ™¥Ù”AMLìÄ…‘‘¥Ñ¥½¹…°)Õ¹É…Ñ•€¸ÄÀÀà±½…•á±Õ‘•¸½Í•Á…É…Ñ•èÔ½µÁ±•Ñ”…±°µ™¥Ù”AML°À%0ì(Ä™½ÕÈµ½˜µ™¥Ù”AML€¡A…¥¹ĞÕ¹É…Ñ•¤…¹ÄÕ¹É…Ñ•±½…•á±Õ‘•™É½´½µÁ±•Ñ”½Õ¹Ğ¸)=±‘•È€¸ÄÀÀØÁ…ÉÑ¥…°½Õ¹É…Ñ•É•½É‘Ì•á±Õ‘•¸AÉ½Ñ•ĞÑ¡”É•Á½ÉÑ•AML½‰Í•ÉÙ…Ñ¥½¹Ì)™½ÈÑ¡½Í”ÉÕ¹ÌìÑ¡•ä‘¼¹½Ğ•É…Í”™…¥±ÕÉ•Ì½È•ÍÑ…‰±¥Í Á•Éµ…¹•¹ĞÍÉ••¸É•Á…¥È¸)M•”‘½Ì½Í¡•±°µ½µÁ…É¥Í½¸µÉ•ÍÕ±ÑÌ´ÄÀÀà¹µ™½ÈÉÕ¸%Ì°…Õ‘¥Ğ…¹¹•áĞ…Ñ”¸()	½Ñ ÁÉ½™¥±•ÌÉ•Á½ÉĞÄÌØÙàààØMLÙ¥•İÁ½ÉĞ°AHÈ°ÄÌØÙààÈØ…¹Ù…ÌML½‰…­¥¹œ°)É•ÅÕ•ÍÑ•Ä…¹Í…Ù•‘MÑ…ÉÑÕÀÄ¸™…¥±•Ñİ¥”…™Ñ•ÈÍ…Ù•ÅàÍÑ…ÉÑÕÀè™¥ÉÍĞµ…±±½…Ñ¥½¸(Åà¥Ì9=PÍÕ™™¥¥•¹ĞÁÉ•Ù•¹Ñ¥½¸¸…¹Ù…ÌÁ…É•¹ĞÙ¥•İÁ½ÉÑ]É…ÀìÁ…É•¹Ğ)‰½á±…‰½µÁ…É¥Í½¹…¹Ù…ÍMÕÉ™…”½¹™¥ÉµÌ…ÑÕ…°ÍÑÉÕÑÕÉ…°Íİ¥Ñ İ¥Ñ¡½ÕĞ‘¥µ•¹Í¥½¹Ì)¡…¹”¸™¥ÉÍĞµ™…¥±ÕÉ”Í¹…ÁÍ¡½Ğ¥ÌMQIQU@è±½Í•Y%\€¼¡¥‘‘•¸¥éµ¼Ñ¡•É”…É”)•áÁ•Ñ•ÍÑ…Ñ•Ì°9=PÁÉ½½˜Ñ¡½Í”¹½‘•Ìİ•É”¥¹½ÉÉ•Ñ±ä¡¥‘‘•¸…Ğ±…Ñ•È¡•­Ì¸()±°¹•Ü½‰Í•ÉÙ…Ñ¥½¹ÌÍ…ä¡•­±¥ÍÑI•±•…Í”ÄÀÀà‰ÕĞÍ¡•±±I•±•…Í”ĞÔÀ¸Õ‘¥Ñ•±¥Ù”µµ…¥¸)Í½ÕÉ”èÍÉŒ½Í•¹”µ½‰¨µ•áÁ½ÉĞ´ÈÌà¹©Ì±¥¹•ÌÔ´ÄÄ¡…É‘½‘”ĞÔÀ…¹½Ù•ÉİÉ¥Ñ”	=Q ±…‰•°)Ñ•áĞ…¹‘…Ñ…Í•Ğ¹É•±•…Í•Y•ÉÍ¥½¸¸Q¡”‘¥…¹½ÍÑ¥ŒÉ•…‘ÌÑ¡…ĞµÕÑ…‰±”‘…Ñ…Í•ĞìÑ¡•É•™½É”(ĞÔÀ¥Ì½¹Ñ…µ¥¹…Ñ•µ•Ñ…‘…Ñ„°9=P•Ù¥‘•¹”…¸½±ĞÔÀ!Q50Í¡•±°İ…Ì±½…‘•¸€¸ÄÀÀà)ÉÕ¹¹¥¹œµÍ¡•±°¥‘•¹Ñ¥Ñä™¥à¥Ì¥¹½µÁ±•Ñ”èÉ•±•…Í”µÙ•ÉÍ¥½¸…¸…ÁÑÕÉ”½¹Ñ…µ¥¹…Ñ•)‘…Ñ„‘•Á•¹‘¥¹œ½¸µ½‘Õ±”½É‘•ÈìÕÉÉ•¹ĞÑ•ÍĞ½¹±ä½Ù•ÉÌÑ•áĞ½Ù•ÉİÉ¥Ñ”°¹½Ğ‘…Ñ…Í•Ğ)µÕÑ…Ñ¥½¸‰äÑ¡”É•…°•áÁ½ÉÑ•È¸9•áĞ¹…ÉÉ½ÜÉÕ¹Ñ¥µ”İ½É¬µÕÍĞÉ•µ½Ù”Í•½¹‘…ÉäÉ•±•…Í”)İÉ¥Ñ•Ì½ÕÍ”…¸¥µµÕÑ…‰±”¥¹¥Ñ¥…°Í¡•±°¥‘•¹Ñ¥Ñä…¹É•É•ÍÍ¥½¸µÑ•ÍĞÑ¡”…ÑÕ…°İÉ¥Ñ•È¸)¼¹½Ğ¡…¹”=	(•½µ•ÑÉä½•áÁ½ÉĞ‰•¡…Ù¥½È½È…Í¬™½ÈÉ•Á•…Ñ•…¡”±•…É¥¹œ¸()•¥Í¥½¸è¥ÌÁÉ½µ¥Í¥¹œ°¹½ĞÁÉ½Ù•¸¸™…¥±•Ñ¡•¸¡…Ğ¡•…±Ñ¡äÉÕ¹Ì	=Iì)Ñ¥µ”½½É‘•È½¹™½Õ¹‘¥¹œÁÉ•Ù•¹ÑÌ…ÑÑÉ¥‰ÕÑ¥¹œ¡•…±Ñ Í½±•±äÑ¼Í•Á…É…Ñ¥½¸¸-••À‰•Ñ„)ÍÉ••¸…Ñ”=A8¸9•áĞ¹…Ñ¥Ù”…Ñ”è¥¹Ñ•É±•…Ù”½Ñ¡É½Õ ½É¥¥¹…°¥¸µ…ÁÀÉ•±½…)½¹ÑÉ½±Ì€¡Í…µ”Åà½½É¥•¹Ñ…Ñ¥½¸½‘•™…Õ±ĞÕ‰”ìÍÑ…ÉÑÕÀ™¥ÉÍĞ¤°Ñ¡•¸¹…Ù¥…Ñ¥½¸½Í•±•Ñ¥½¸¼)¥éµ¼½UX½A…¥¹Ğ½U¹‘½I•‘¼½Í…Ù”µ½Á•¸Á…É¥Ñä‰•™½É”…‘½ÁÑ¥¹œ…Ì‘•™…Õ±Ğ¸9¼İ¡½±•Í…±”)¥¹Ñ•É™…”É•Í­¥¸½È‘ÕÁ±¥…Ñ”Ñ½½°½É•¹‘•É•È½­•É¹•°¸9¼…‘‘¥Ñ¥½¹…°ÉÕ¹Ñ¥µ”Í¡¥ÁÁ•¥¸)Ñ¡¥Ì™••‘‰…¬Í•ÍÍ¥½¸ì€¸ÄÀÀàÉ•µ…¥¹Ì±¥Ù”¸9¼Ñ•ÍÑÌÉ•ÉÕ¸™½È‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸((ŒŒ€¸ÄÀÀäƒŠP¥µµÕÑ…‰±”±½…‘•µÍ¡•±°¥‘•¹Ñ¥Ñäì=	(É•±•…Í”İÉ¥Ñ•ÈÉ•µ½Ù•ƒŠP€Èà=Ñ½‰•È€ÈÀÈØ()	…Í•±¥¹”µ…¥¸˜Õ˜á‘„Ü€¼ÉÕ¹Ñ¥µ”ÀåˆÜÍŒÀ°±¥Ù”ÄÀÀàµ…É­•ÉÌ…¹•á¥ÍÑ¥¹œÁ¥¹Ì…Õ‘¥Ñ•¸)=É¥¥¹…°±…ÍÍ¥Œ¡•…É•±•…Í”µ‰½½ÑÍÑÉ…À…ÁÑÕÉ•ÌÑ¡”¥¹¥Ñ¥…°!Q50Ñ¥Ñ±”Íå¹¡É½¹½ÕÍ±ä)…Ì¹½¸µİÉ¥Ñ…‰±”½¹½¸µ½¹™¥ÕÉ…‰±”}}‰½á±…‰1½…‘•‘M¡•±±Y•ÉÍ¥½¸	=I½µÁ…É¥Í½¸…¹)µ½‘•±±¥¹œµ½‘Õ±•Ì¸á¥ÍÑ¥¹œÉ•±•…Í”µÙ•ÉÍ¥½¸ÁÉ•™•ÉÌÑ¡…ĞÙ…±Õ”°É•ÍÑ½É•Ì‰½Ñ ±…‰•°)Ñ•áĞ…¹‘…Ñ„µÉ•±•…Í”µÙ•ÉÍ¥½¸…¹½‰Í•ÉÙ•ÌÑ¡…Ğ…ÑÑÉ¥‰ÕÑ”ìÁÕ‰±¥ŒÍÑ…µÀ…¹¹½Ğ…‘½ÁĞ)…¸…É‰¥ÑÉ…ÉäÙ•ÉÍ¥½¸¸Ù•ÉÍ¥½¸¹©Í½¸É•µ…¥¹Ì…Ù…¥±…‰±”µ±…Ñ•ÍĞ½¹±ä¸á¥ÍÑ¥¹œÍÑ…ÉÑÕÀ)…¡”µÉ•½Ù•Éä½É•ÑÉä…¹…ÁÀµÉ•ÑÕÉ¸‰•¡…Ù¥½ÈÉ•Ñ…¥¹•ì¹¼¹•ÜÕÁ‘…Ñ•È½É•Á…¥¹Ğ½İ¹•È¸()I•µ½Ù”=91dÍ•½¹‘…Éä…ÁÀ±…‰•°½‘…Ñ…Í•Ğ½Ñ¥Ñ±”İÉ¥Ñ•Ì™É½´Í•¹”µ½‰¨µ•áÁ½ÉĞ´ÈÌà¸)%ÑÌ¥¹Ñ•É¹…°ĞÔÀÍÑ…µÀ°=	(¡•…‘•ÉÌ½™¥±•¹…µ•Ì½5%5°	…Í”½MÕ‰•½µ•ÑÉä½ÁÉ•™±¥¡Ğ°)Í½ÕÉ”½¡¥ÍÑ½Éä…¹•Ù•¹ĞÉ½ÕÑ¥¹œÉ•µ…¥¸Õ¹¡…¹•¸=É¥¥¹…°½µÁ…É¥Í½¸É•…‘Ì¥µµÕÑ…‰±”)Í¡•±°¥‘•¹Ñ¥Ñä°ÍÑ…µÁÌ•á•ÕÑ•ÄÀÀä¥¹‘•Á•¹‘•¹Ñ±ä°ÁÉ•Í•ÉÙ•ÌÄÀÀØ¼ÄÀÀÜ¼ÄÀÀàÉ•½É‘Ì°)É…Ñ¥¹Ì½¹½Ñ•Ì½™¥ÉÍĞ™…¥±ÕÉ•Ì•á…Ñ±ä°…¹ÍÑ…ÉÑÌ™É•Í Õ¹É…Ñ•ÄÀÀä±½…‘Ì¸%¸µ…ÁÀÕ¥‘…¹”)¹½ÜÍ…åÌ…±Ñ•É¹…Ñ”½İ¥Ñ ½É¥¥¹…°•áÁ±¥¥ĞÉ•±½…½¹ÑÉ½±Ì°Í…µ”Åà½½É¥•¹Ñ…Ñ¥½¸½Õ‰”¸)9•¥Ñ¡•ÈÁÉ½™¥±”ÍÑÉÕÑÕÉ”¹½È‘•™…Õ±Ğ¡…¹•Ìì¹¼Á¥á•°É•Á…¥È½¹…Ñ¥Ù”AML±…¥µ•¸()I•Ù¥•İ•ÄÀÀä…¡”±½ÍÕÉ”è‰½½ÑÍÑÉ…À½É•±•…Í”½½µÁ…É¥Í½¸°…¹½¹¥…°‘¥É•Ğ­¹•ÍÑ•=	()…¹¥ÑÌ½¹™½Éµ…¹”Á…É•¹Ğ°…¹½¹¥…°‘¥É•Ğ­¹•ÍÑ•É•±•…Í”…¹±…å½ÕĞ½‘É…İ•ÈÁ…É•¹ÑÌ¸)MLÄÀÀàÉ•Ñ…¥¹•Õ¹¡…¹•¸AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°™É½é•¸‰•Ñ…Ì°µ…¥¸½Í¥é¥¹œ½‘•‰Õœ°½É¥¥¹…°)¥±°ÄÀÀĞAML…¹…•ÁÑ•µ½‘•±±¥¹œ½A…¥¹Ğ½UX½İ¹•ÉÌÕ¹Ñ½Õ¡•¸AÉ•Ù¥½ÕÌÄÀÀàÑAML¼É%0)…¹ÕAML½‰Í•ÉÙ…Ñ¥½¹ÌÉ•µ…¥¸ÁÉ½Ñ•Ñ•™½ÈQ!=MÉÕ¹Ìì‰•Ñ„ÍÉ••¸…Ñ”ÍÑ…åÌ=A8¸((Ğà™½ÕÍ•¡•­ÌAML¼Á%0¼ÁÍ­¥À¸¥Ù”¹•Ü¡•­Ì½Ù•È…ÑÕ…°•áÁ½ÉÑ•È‰•™½É”½…™Ñ•È)É•±•…Í”¥¹¥Ñ¥…±¥é…Ñ¥½¸°	…Í”½MÕ‰½ÕÑÁÕĞ•ÅÕ…±¥Ñä½Í½ÕÉ”¥Í½±…Ñ¥½¸°•…É±ä¥µµÕÑ…‰±”)…ÁÑÕÉ”°…‘Ù•ÉÍ…É¥…°µ•Ñ…‘…Ñ„€¬µ…¹¥™•ÍĞ½½™™±¥¹”É•ÑÕÉ¹Ì°½µÁ…É¥Í½¸¥‘•¹Ñ¥Ñä…¹•á…Ğ(ÄÀÀà•Ù¥‘•¹”É•Ñ•¹Ñ¥½¸¸I”µÉÕ¹¹¥¹œ¹•Ü•áÁ½ÉÑ•ÈÉ•É•ÍÍ¥½¸……¥¹ÍĞÁÉ”µ™¥àİÉ…ÁÁ•È)™…¥±Ì…Ì•áÁ•Ñ•¸á¥ÍÑ¥¹œ…¹½¹¥…°µ±½…‘•ÈÑ•ÍÑÌ™½±±½ÜÉ•Ù¥•İ•ÄÀÀäÁ¥¹Ìì¹¼Í•µ…¹Ñ¥Œ)ÁÉ½Ñ•Ñ¥½¸É•µ½Ù•¸Õ±°±½…°9½‘”ÈĞ¸ÈÈ¸ÄèÈäĞÔAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÄÜ¸ØİÌ¤¸)AÕ‰±¥…Ñ¥½¸ÁÉ½½˜è‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÀä¹µ¸()Y%ÄÀÀäèÙ¥Í¥‰±”…ÁÀ…¹¡•­±¥ÍĞ‰½Ñ ÄÀÀäì½ÁäÕÉÉ•¹Ğ•¹Ù¥É½¹µ•¹Ğ½¹•ÜÉ…Ñ•)½‰Í•ÉÙ…Ñ¥½¹ÌÍ¡•±±I•±•…Í”ÄÀÀä°½±ÄÀÀà½‰Í•ÉÙ…Ñ¥½¹ÌĞÔÀÉ•µ…¥¸¡¥ÍÑ½É¥…°€¡‘¼¹½ĞÉ•İÉ¥Ñ”¤¸)±Ñ•É¹…Ñ”½¥¹Í¥‘”…ÁÀİ¥Ñ¡½ÕĞ…ÁÀµÍİ¥Ñ ½É•½Ù•Éä°ÍÑ…ÉÑÕÀ%IMPìÉ•Ñ…¥¸É•Í½±ÕÑ¥½¸)…¹½É¥•¹Ñ…Ñ¥½¸¸=É¥¥¹…°¡•­±¥ÍĞ!¥‘”½UX	…¬½A…¥¹Ğ½¹”ÍÑ¥±°ÕÍ…‰±”¸½±±½Üİ¥Ñ )Í•±•Ñ¥½¸½¹…Ù¥…Ñ¥½¸½¥éµ¼½UX½A…¥¹Ğ½U¹‘½I•‘¼½M…Ù•=Á•¸Á…É¥Ñä‰•™½É”‘•™…Õ±Ğ…‘½ÁÑ¥½¸¸)9•áĞ…Ğ½¸¥¹Ñ•É±•…Ù•¹…Ñ¥Ù”•Ù¥‘•¹”ì¹¼ÍÁ•Õ±…Ñ¥Ù”½µÁ½Í¥Ñ½È½ÈU$É•Í­¥¸¡…¹”¸((¸ÄÀÀäÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•è)AÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”Å”ÌÑŒĞÌÈÜäÙ„ĞÜÕˆäÌĞÈĞÑ‰ˆØÌÁŒÅˆÌĞÔÕÌäÌÀì•á…ĞÑ•ÍÑ•½ÕÁ±½…‘•)ÑÉ•”ÈÁˆĞÍŒÄÌáˆØÁåˆÌÜÑŒäÌÄÑ˜ĞÀá„ÜÔĞØå•ÀØä¸±°Äà‰±½ˆ¡…Í¡•ÌÙ•É¥™¥•‰•™½É”)…Ñ½µ¥Œ¹½¸µ™½É••áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”ì™•Ñ¡•½É¥¥¸½µ…¥¸…¹ÑÉ•”µ…Ñ ±½…°¸)A…•ÌĞÀØàÌäÈÜÄÀÜ½µÁ±•Ñ•MUML¸9¥¹”…¡”µ‰ÕÍÑ•±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ è)Ù•ÉÍ¥½¸¹©Í½¸±¥¹‘•à¹¡Ñµ°±É•±•…Í”µ‰½½ÑÍÑÉ…À±É•±•…Í”µÙ•ÉÍ¥½¸±Í•¹”µ½‰¨µ•áÁ½ÉĞ´ÈÌà°)Í¡•±°µ½µÁ…É¥Í½¸±‘¥É•ĞµÑ½Á½±½äµ½¹™½Éµ…¹”µÕ…É±‘É…İ•ÈµÕ¤±™…”µİ½É­™±½Üµ±…å½ÕĞ¸)¥¹…°É•±•…Í”­¥‘•¹Ñ¥Ñää¡•­ÌAML¸Õ±°±½…°ÈäĞÔAML¼Á%0¼ÁÍ­¥À¼Á…¹•°ì)¡½ÍÑ•ĞÀØàÌäÈÜÜĞÔ¥¹}ÁÉ½É•ÍÌ…ĞÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜€¡¹¼¡½ÍÑ•AML±…¥µ•¤¸(ÄÀÀä1%Y½Id™½ÈÙ•ÉÍ¥½¸µÉ•Á½ÉÑ¥¹œ½¹…Ñ¥Ù”½µÁ…É¥Í½¸Ñ•ÍÑÌ¸9¼¹…Ñ¥Ù”]•‰-¥Ğ)É•¹‘•É¥¹œÉ•Á…¥È½È‘•Ù¥”ÄÀÀäAML¥¹™•ÉÉ•ì‰•Ñ„ÍÉ••¸…Ñ”É•µ…¥¹Ì=A8¸((ŒŒ€¸ÄÀÄÀƒŠP™É•”½É‰¥Ğ…¹Ñ¡É•”µ™¥¹•È±¥¡Ğ€¼‰ÉÕÍ ½¹ÑÉ½±ÌƒŠP€Èä=Ñ½‰•ÈÈÀÈØ()	…Í•±¥¹”µ…¥¸á”ÀÁ˜Éˆà½ÉÕ¹Ñ¥µ”Å”ÌÑŒĞÌÈ°±¥Ù”ÄÀÀä¸UÍ•È•áÁ±¥¥Ñ±äÉ•ÅÕ•ÍÑÌ™É•”½É‰¥Ğ°)¥¹•ÉÑ¥„°Ìµ™¥¹•È¡½É¥é½¹Ñ…°±¥¡ĞÉ½Ñ…Ñ¥½¸±A…¥¹ĞÙ•ÉÑ¥…°Í¥é”€¬ÍÑÉ½­”ÁÉ•Ù¥•Ü°)±…É•È‰ÉÕÍ …¹µ½É”ÍÑ…¹‘…ÉÑ¥ÁÌ¸Q¡¥Ì…ÕÑ¡½É¥é•Ì¡…¹¥¹œ™½Éµ•ÈÕÁÉ¥¡Ğ½É‰¥Ğ)‰•¡…Ù¥½Èì¹¼Õ¹É•±…Ñ•µ½‘•±±¥¹œ½ÈU$±•…¹ÕÀ¸Õ‘¥Ğ½É¥¥¹…°µ…¥¸Ñ½Õ ½Ñ…À½İ¹•È°)Q¡É•”À¸ÄÜä¸Ä=É‰¥Ñ½¹ÑÉ½±Ì±MÑÕ‘¥¼±¥¡Ğµ…¹±”½İ¹•ÈÄää…¹ÁÉ½‘ÕÑ¥½¸A…¥¹Ğ½…±Á¡„¸()É••=É‰¥Ñ½¹ÑÉ½±ÌÍÕ‰±…ÍÍ•ÌM5Q¡É•”½¹ÑÉ½±±•Èì½¹±äÉ½Ñ…Ñ¥½¸µ…Ñ ‰•½µ•Ì)…µ•É„µÉ•±…Ñ¥Ù”ÅÕ…Ñ•É¹¥½¸ÑÕµ‰±”…É½ÍÌ‰½Ñ Á½±•Ì°¥¹±Õ‘¥¹œ¥¹Ù•ÉÑ•Ù¥•İÌ¸)9…Ñ¥Ù”Á½¥¹Ñ•ÈÉ•¥ÍÑÉ…Ñ¥½¸½A•¹¥°…Ñ”½Á…¸½Á¥¹ ½İ¡••°½Ñ…É•Ğ½¡…¹”•Ù•¹ÑÌÉ•Ñ…¥¹•¸)=É¥¥¹…°‘…µÁ¥¹œ¸ÀàÁÉ½Ù¥‘•Ì¥¹•ÉÑ¥„ì¹•áĞ½¹Ñ…Ğ±‘¥Í…‰±•Ñ½½°½È•áÑ•É¹…°…µ•É„)Ù¥•Ü¡…¹”ÍÑ½ÁÌÍÁ¥¸¸9¼Í•½¹Á½¥¹Ñ•È½İ¹•È±µ½‘•°É½Ñ…Ñ¥½¸½­•É¹•°½ÈÉ½Õ¹µ½Ù”¸)9•Ù•È±•…È¹…Ñ¥Ù”Á…¸½‘½±±ä½¸½É‘¥¹…Éä¥‘±”É½Ñ…Ñ¥½¸ÕÁ‘…Ñ•ÌèÑ¡¥Ìİ…Ì…Õ¡Ğ…¹)½ÉÉ•Ñ•‘ÕÉ¥¹œÄÀÄÀÙ…±¥‘…Ñ¥½¸°¹½Ü•áÁ±¥¥Ñ±äÑ•ÍÑ•¥¹±Õ‘¥¹œÕÁÍ¥‘”µ‘½İ¸Á…¸¸()5…¥¸Ì•á¥ÍÑ¥¹œÑ½Õ¡ÍÑ…ÉĞ½µ½Ù”½•¹½Ñ…À½İ¹•È‘•±•…Ñ•ÌÌµ™¥¹•È½µµ…¹‘ÌÑ¼„ÁÕÉ”)ÍÑ…Ñ”¡•±Á•È€¡9<±¥ÍÑ•¹•ÉÌ¤¸Q¡¥É™¥¹•ÈÁ…ÕÍ•Ì¹…Ù¥…Ñ¥½¸ìÄÉÁàÑ¡É•Í¡½±±½­Ì™¥ÉÍĞ)‘½µ¥¹…¹Ğ‘¥É•Ñ¥½¸¸!½É¥é½¹Ñ…°É½Ñ…Ñ•Ì½É¥¥¹…°MÑÕ‘¥¼…¹±”€ ¸Õ‘•É••Ì½MMÁà±İÉ…À+
ÄÄàÀ¤Ù¥„•á¥ÍÑ¥¹œÍ•ÑÑ•È½U$½Á•ÉÍ¥ÍÑ•¹”ìÕ¹±¥Ğ±½½­Ì¹••MÑÕ‘¥¼½µ…Ñ•É¥…°ÁÉ•Ù¥•ÜÑ¼)Í•”±¥¡Ñ¥¹œ¸Y•ÉÑ¥…°%8A…¥¹ĞÍ•ÑÌÍ…µ”É…‘¥ÕÌ½¹ÑÉ½°•áÁ½¹•¹Ñ¥…±±äéU@±…É•È½=]8)Íµ…±±•È¸¥±°±¥µ…”Á±…•µ•¹Ğ±<±ÍÑÉ½­”½‘É…œ½‰ÕÍäÍ•ÍÍ¥½¹ÌÉ•™ÕÍ”Í¥é”¡…¹•Ì¸½¹ÑÉ½±Ì)É•ÍÑ½É”½¹±ä…™Ñ•È10½¹Ñ…ÑÌ±¥™Ğì…¹•°½‰±ÕÈ½Á…•¡¥‘”½¡¥‘‘•¸É•ÍÑ½É”Í…™•±ä¸)Qİ¼µ™¥¹•ÈÑ…ÀU¹‘¼…¹Ñ¡É•”µ™¥¹•ÈÑ…ÀI•‘¼É•Ñ…¥¸½É¥¥¹…°¡¥ÍÑ½Éä½İ¹•ÉÌìµ½Ù•)½ÈĞµ™¥¹•È•ÍÑÕÉ•Ì¹•Ù•È‰•½µ”I•‘¼¸¥¹•ÈÄ½É‰¥Ğ½™¥¹•ÈÈÁ…¸­Á¥¹ É•Ñ…¥¹•¸()A…¥¹Ğ½É¥¥¹…°É…ÍÑ•È½Í•ÑÑ¥¹ÌÉ…‘¥ÕÌÇŠLÈÔÙÑ•á•±Ì€¡½±Ğà¤ìµ…á¥µÕ´‘¥…µ•Ñ•ÈÔÄÉÑ•á•±Ì¸)=¹±ä9\€øĞà½É‘¥¹…Éä½	±ÕÈÍÑÉ½­•Ì…¥¸áµ¥±±¥½¸É…ÍÑ•ÈµÁ¥á•°İ½É¬İ¥¹‘½Ü±É•¹•İ•)Á•È¥¹ÁÕĞİ¥Ñ M5Í¹…ÁÍ¡½Ğ½½Ù•É…”½¡¥ÍÑ½Éäì•á¥ÍÑ¥¹œMµÕ‘”‰Õ‘•ĞÉ•Ñ…¥¹•¸)9¼Í¥±•¹ĞÉ•Í¥é”±¹•ÜÑ•áÑÕÉ”Í¡•µ„½È¡¥ÍÑ½Éä•¹ÑÉä™½È¡…¹¥¹œÍ•ÑÑ¥¹Ì¸	Õ¥±Ğµ¥¸)M½™ĞÉ½Õ¹½!…ÉÉ½Õ¹½±…Ğ½¡¥Í•°½Éä‰É¥ÍÑ±”ÕÍ”½É¥¥¹…°¡…É‘¹•ÍÌ½…±Á¡„µÑ¥ÀÉ…ÍÑ•Èì)¥µÁ½ÉÑ•A9Ñ¥ÁÌ½É½Ñ…Ñ¥½¸É•Ñ…¥¹•¸9¼…¥É‰ÉÕÍ ½Ñ¥µ”µ…ÕµÕ±…Ñ¥½¸ÁÉ½µ¥Í”¸()Y•ÉÑ¥…°Í¥é”‘É…œÍ¡½İÌ„Ñ½Àµ•¹ÑÉ”¹½¹¥¹Ñ•É…Ñ¥Ù”ÁÉ•Ù¥•Ü…Éİ¥Ñ …ÑÕ…°½É¥¥¹…°)É…ÍÑ•ÈÍÑÉ½­”±Í•±•Ñ•½±½ÕÈ½½Á…¥Ñä½¡…É‘¹•ÍÌ½Ñ¥À…¹É…‘¥ÕÌÉ•…‘½ÕĞ¸AÉ•Ù¥•ÜÉ•ÁÉ•Í•¹ÑÌ)„ÄÀÈÑÑ•á•°¡…ÉĞ…ĞÅÕ…ÉÑ•ÈÍ…±”±9=PÕ…É…¹Ñ••İ½É±½ÍÉ••¸ÍÕÉ™…”™½½ÑÁÉ¥¹Ğ…É½ÍÌ)UX‘•¹Í¥Ñ¥•Ì¸=¹”ÅÕ•Õ•™É…µ”ÕÍ•Ì±…Ñ•ÍĞÍ¥é”ì±¥™Ğ½…¹•°½½¹”¡¥‘•Ì…¹ÍÕÁÁÉ•ÍÍ•Ì)±…Ñ”‘É…İÌ¸9¼µ•Í ¡¥ĞÁÉ½áä±Í•¹”½Á…¥¹ĞµÉ•Í½ÕÉ”½¡¥ÍÑ½ÉäµÕÑ…Ñ¥½¸¸…¹•°É•ÍÑ½É•Ì)ÁÉ”µ‘É…œÍ¥é”ì½É‘¥¹…ÉäÉ•±•…Í”­••ÁÌÍ¥é”¸á¥ÍÑ¥¹œ1PA…¥¹ĞÍ•ÑÑ¥¹ÌÁÉ•Í•ÉÙ•¸()I•Ù¥•İ•ÄÀÄÀÉ•Ù•ÉÍ”…¡”É…Á éµ…¥¸€¬¹•Ü½¹ÑÉ½±Ì½¡•±Á•ÈíÁÉ½‘ÕÑ¥½¸A…¥¹Ğ½É…ÍÑ•È¼)¹•ÜÁÉ•Í•Ğ½ÁÉ•Ù¥•ÜíÍ¡…É•1…ˆ½Í•ÍÍ¥½¸¥µÁ½ÉÑÌ€¡Á¥¹Ì½¹±ä¤±Í¡•±°½É•½Ù•Éä½É•±•…Í”…¹)±…å½ÕĞ½‘É…İ•È…¹½¹¥…°É•±•…Í”µ±½…‘•ÈÁ…É•¹ÑÌ¸U¹¡…¹•…ÍÍ•ÑÌÉ•Ñ…¥¸½±‘•È­•åÌ¸)AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¹	•Ñ„ËŠLÜ½•½µ•ÑÉä½UX½¥±°ÄÀÀĞ½…•ÁÑ•¥½¹ÌÕ¹¡…¹•¸IÕ¹Ñ¥µ”)½µÁ…É¥Í½¸ÄÀÄÀ½¹±ä½‘”±…‰•±Ì€¬µ¥É…Ñ¥½¸ÄÀÀäí‰½Ñ ÍÑÉÕÑÕÉ•Ì½‘•™…Õ±Ğ½É•Í½±ÕÑ¥½¸¥¹Ñ…Ğ¸()UÍ•ÈÄÀÀä½½•áÁ±¥¥Ñ±ä10AML¹½ÜÁÉ½Ñ•Ñ•èÔ½µÁ±•Ñ”€¬Ô½µÁ±•Ñ”°ÀÉ…Ñ•)%0ìÈÀÕ¹É…Ñ••á±Õ‘•¸	½Ñ Í¡•±°½¡•­±¥ÍĞÄÀÀä±…ÑÕ…°½Í…Ù•Åà¸M•”•á…Ğ%Ì…¹)±¥µ¥ÑÌ¥¸‘½Ì½Í¡•±°µ½µÁ…É¥Í½¸µÉ•ÍÕ±ÑÌ´ÄÀÀä¹µ¸-••À‘•™…Õ±Ğ±½µÁ…É¥Í½¸…Ñ”½µÁ±•Ñ”ì)¹¼ÍÕÁ•É¥½É¥Ñä½Á•Éµ…¹•¹Ğ•¹¥¹”É•Á…¥È¥¹™•ÉÉ•¸!¥ÍÑ½É¥…°Á¥á•°™…Õ±Ğİ…Ñ É•µ…¥¹Ì¸)%¹¥Ñ¥…°ÁÕ‰±¥…Ñ¥½¸İ…Ì¡•±İ¡¥±”ÕÍ•ÈÌ•áÁ•É¥µ•¹ĞÉ…¸ì¥Ğ¥Ì¹½Ü½µÁ±•Ñ”°ÁÕ‰±¥Í (ÄÀÄÀ…™Ñ•ÈÙ…±¥‘…Ñ¥½¸Õ¹‘•È•á¥ÍÑ¥¹œÍÑ…¹‘¥¹œ…ÕÑ¡½É¥é…Ñ¥½¸¸9¼É•Á•…Ğ…ÁÁÉ½Ù…°¹••‘•¸()Q•ÍÑÌ•á•ÕÑ”É•…°Q¡É•”É½Ñ…Ñ¥½¸½¹…Ñ¥Ù”Á…¸½‘½±±ä±…ÑÕ…°µ…¥¸Ñ…À¡…¹‘±•È±½µµ…¹)…á¥Ì½‘É…¥¸½…¹•°±ÁÉ½‘ÕÑ¥½¸A…¥¹ĞU$…¹Á¥á•°É…ÍÑ•È½ÁÉ•Ù¥•Ü±ÁÉ•Í•ÑÌ±±…É”‰ÉÕÍ İ½É¬)É•¹•İ…°±…¹•°…¹=9U¹‘¼¸äÈà¡¥ÍÑ½Éä™¥áÑÕÉ”¹½ÜÍÑ½ÁÌ•áÑÉ…Ñ¥½¸‰•™½É”¹•Ü½µµ…¹)¥¹¥Ñ¥…±¥é…Ñ¥½¸…¹¥¹©•ÑÌ…ÑÕ…°¡•±Á•Èì…±°½É¥¥¹…°¡¥ÍÑ½Éä…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸(àäØ¥¹Ù…±¥µÉ…‘¥ÕÌ™¥áÑÕÉ”ĞçŠHÈÔÜ™½±±½İÌ‘•±¥‰•É…Ñ”¹•Ü±¥µ¥Ğ¸Õ±°½™½ÕÍ•É•ÍÕ±ÑÌ…¹)ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜¥¸‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÄÀ¹µ¸Õ±°±½…°9½‘”ÈĞ¸ÈÈ¸Äè(ÈäÔÔAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÄÜ¸ÀÅÌ¤±¥¹±Õ‘¥¹œÄÀ¹•Ü…ÑÕ…°µ½İ¹•È¡•­Ì¸)Må¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸9…Ñ¥Ù”¥A…ÄÀÄÀ™••°É•µ…¥¹ÌÁ•¹‘¥¹œ¸()Y%ÄÀÄÀè½¹Ñ¥¹Õ½ÕÌÅ™¥¹•ÈÑÕµ‰±”Á…ÍĞÑ½À½‰½ÑÑ½´í™±¥¬½É”µÑ½Õ ÍÑ½ÁÌíÁ…¸½Á¥¹ )…¹Ù¥•Ü‰ÕÑÑ½¹ÌÍÑ¥±°İ½É¬¸Í™¥¹•È¡½É¥é½¹Ñ…°MÑÕ‘¥¼‘É…œÉ½Ñ…Ñ•Ì±¥¡Ğİ¥Ñ¡½ÕĞµ½‘•°)µ½Ñ¥½¸½ÈI•‘¼¸%¸UXA…¥¹ĞÙ•ÉÑ¥…°Í™¥¹•ÈU@•¹±…É•Ì½=]8Í¡É¥¹­Ìİ¥Ñ ÍÑÉ½­”Í…µÁ±”ì)±¥™Ğ¡¥‘•ÌÁÉ•Ù¥•Ü…¹Í•ÑÑ¥¹ÌÉ•µ…¥¸¸QÉä™¥Ù”Ñ¥ÀÁÉ•Í•ÑÌ½±…É”A•¹¥°ÍÑÉ½­”ì)U¹‘½I•‘¼½¹”ÍÑÉ½­”°Í™¥¹•ÈQ@I•‘¼±½¹”½¹…Ù¥…Ñ¥½¸¸9¼É•Á•…Ğ½‰…Ñ É•ÅÕ¥É•¹½Ü¸)9•áĞÉ•ÍÁ½¹Ñ¼¹…Ñ¥Ù”ÄÀÄÀ•ÍÑÕÉ”½‰ÉÕÍ ™••°ì‰É½…‘•È‰ÉÕÍ¡•Ì½É•™¥¹•µ•¹ÑÌÍÑ…äÍÑ…•¸((¸ÄÀÄÀÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•è)AÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”İ…™ŒÙ„ØÄÈÁİˆàØÙ•‘•…ŒÅ™ŒÉ™”Õ‘•„áˆäÙ”ÔäØì•á…ĞÑ•ÍÑ•½ÕÁ±½…‘•)ÑÉ•”ÀØÌÁˆÜÌÈáˆÌÄÜÈÙ”ÄĞÁ”Õ˜á•‰•ŒÔÍ™„ÌĞÕ…”Ğ¸±°Èà‰±½‰ÌÙ•É¥™¥•‰•™½É”…Ñ½µ¥Œ)¹½¸µ™½É••áÁ•Ñ•µµ…¥¸É•˜ÕÁ‘…Ñ”ì™•Ñ¡•µ…¥¸½ÑÉ•”µ…Ñ Ñ•ÍÑ•¡•­½ÕĞ¸)A…•ÌĞÀÜàÀÄÀÀÈĞÜ½µÁ±•Ñ•MUML¸Äà…¡”µ‰ÕÍÑ•±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ éÙ•ÉÍ¥½¸°)¥¹‘•à±µ…¥¸±™É•”µ½É‰¥Ğµ½¹ÑÉ½±Ì±Ñ¡É•”µ™¥¹•Èµ½µµ…¹‘Ì±Ù¥•İÁ½ÉĞµÁ…¥¹Ğ±Ù¥•İÁ½ÉĞµÁ…¥¹Ğµ½É”°)Á…¥¹Ğµ‰ÉÕÍ µÁÉ•Í•ÑÌ±Á…¥¹Ğµ‰ÉÕÍ µÁÉ•Ù¥•Ü±Í¡…É•Á…¥¹Ğµ½É”±Á…¥¹ĞµÍ•ÍÍ¥½¸±1…ˆ©Ì½¡Ñµ°°)Í¡•±°µ½µÁ…É¥Í½¸±‘É…İ•ÈµÕ¤±™…”µİ½É­™±½Üµ±…å½ÕĞ±É•±•…Í”µ‰½½ÑÍÑÉ…À±É•±•…Í”µÙ•ÉÍ¥½¸¸)Õ±°±½…°ÈäÔÔAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÄÜ¸ÀÅÌ¤ì¡½ÍÑ•ĞÀÜàÀÄÀÀÄàÀ¥¹}ÁÉ½É•ÍÌ…Ğ)ÁÉ½½˜±¹½Ğ±…¥µ•AML¸ÄÀÄÀ1%Y½Id™½È¹…Ñ¥Ù”½É‰¥Ğ½±¥¡Ğ½A…¥¹Ğ•ÍÑÕÉ”¡•­Ì¸(ÄÀÀä½µÁ…É¥Í½¸ÕÍ•È10AMLÁÉ½Ñ•Ñ•í¹¼É•Á•…Ğ½É•ÅÕ¥É•¸ÄÀÄÀ¹…Ñ¥Ù”•ÍÑÕÉ”)™••°…¹±…É•Èµ‰ÉÕÍ ±…Ñ•¹ä…É”¹½Ğ•ÍÑ…‰±¥Í¡•‰ä9½‘”¡•­Ìí…İ…¥Ğ‘•Ù¥”™••‘‰…¬¸((ŒŒ€¸ÄÀÄÄƒŠP¥µµ•‘¥…Ñ”¹…Ù¥…Ñ¥½¸…¹Ñİ¼µ™¥¹•È…¹¡½É•Ñİ¥ÍĞƒŠP€Èä=Ñ½‰•ÈÈÀÈØ()UÍ•ÈƒŠpÄÀÄÀAMOŠtÁÉ½Ñ•ÑÌÕ¹É•ÍÑÉ¥Ñ•½¹”µ™¥¹•È½É‰¥Ğ±MÑÕ‘¥¼Í™¥¹•È±¥¡Ğ±A…¥¹Ğ)Ù•ÉÑ¥…°Í¥é”½ÁÉ•Ù¥•Ü±ÁÉ•Í•ÑÌ½±…É•ÈÉ…‘¥ÕÌ…¹½É¥¥¹…°¡¥ÍÑ½Éä½¹…Ù¥…Ñ¥½¸‰•¡…Ù¥½È¸)UÍ•È•áÁ±¥¥Ñ±äÉ•Ù•ÉÍ•Ì¥¹•ÉÑ¥„ÁÉ•™•É•¹”èÉ•µ½Ù”¥ÑÌÑ…¥°¸¼¹½ĞÁÉ•Í•ÉÙ”ÄÀÄÀ)¥¹•ÉÑ¥„…Ì„É•ÅÕ¥É•‘•Ù¥”™•…ÑÕÉ”¸ÕÉÉ•¹ĞÄÀÄÀ…•ÁÑ…¹”¥Ì•áÁ±¥¥Ğ±¹½ĞÁ•¹‘¥¹œ¸()	…Í•±¥¹”µ…¥¸àÉ•˜á˜àÔ½ÉÕ¹Ñ¥µ”İ…™ŒÙ„ØÄí±¥Ù”ÄÀÄÀÍ¡•±°½µ…¹¥™•ÍĞÙ•É¥™¥•‰•™½É”¡…¹•Ì¸)5…¥¸‘¥Í…‰±•Ì¹…Ñ¥Ù”‘…µÁ¥¹œé½É‰¥Ğ±Á…¸…¹‘½±±äÍÑ½À½¸É•±•…Í”¸á¥ÍÑ¥¹œ™É•”µ½É‰¥Ğ)ÍÕ‰±…ÍÌÉ•µ…¥¹ÌÍ½±”É½Ñ…Ñ¥½¸•áÑ•¹Í¥½¸Ñ¼Q¡É•”À¸ÄÜä¸Äí½¹”µ™¥¹•È™Õ±°ÍÑÕµ‰±”)…¹¹…Ñ¥Ù”Á½¥¹Ñ•È½A•¹¥°…Ñ”½Ñ…É•Ğ½¡¥ÍÑ½Éä½İ¹•ÉÌÉ•Ñ…¥¹•¸9¼¹•Ü•ÍÑÕÉ”±¥ÍÑ•¹•È¸()%¹Ñ•ÉÁÉ•ĞÉ•ÅÕ•ÍÑ•Ñİ¼µ™¥¹•ÈÉ½Ñ…Ñ¥½¸…ÌMI8µA19Q]%MP…É½Õ¹¡•±½¹Ñ…Ğ°)¹½Ğ„¹•Üµ•Í µÁ¥­•Í½É‰¥Ğ•¹ÑÉ”¸Q¡¥Ì¥¹Ñ•ÉÁÉ•Ñ…Ñ¥½¸İ…ÌÍÑ…Ñ•Ñ¼ÕÍ•Èİ¡¥±”)İ½É­¥¹œ¸áÑ•¹M5}¡…¹‘±•Q½Õ¡MÑ…ÉÑ½±±åA…¸½}¡…¹‘±•Q½Õ¡5½Ù•½±±åA…¸½İ¹•ÉÌè)ÑÉ…¬½¹Ñ…ĞÁ…¥È±‘•É¥Ù”Í¥¹•Ñİ¥ÍĞ½Á¥¹ ±É½Ñ…Ñ”…µ•É„ÕÀ…¹É•ÕÍ”½É¥¥¹…°)Q¡É•”‘½±±ä…¹Á…¸ÁÉ½©•Ñ¥½¸¸½µÁ•¹Í…Ñ”½™˜µ•¹ÑÉ”É½Ñ…Ñ¥½¸½é½½´İ¥Ñ „Í¥µ¥±…É¥Ñä)µ…ÁÁ¥¹œ¥¸ML½Á…”½½É‘¥¹…Ñ•Ì¸1•ÍÌµµ½Ù¥¹œ½¹Ñ…Ğ¥Ì…¹¡½È±¥¹±Õ‘¥¹œ…Ğé½½´)±¥µ¥ÑÌ¸=¸½¹ÑÉ½±ÌÑ…É•Ğµ‘•ÁÑ Á±…¹”‰½Ñ ½¹Ñ…ÑÌÑÉ…¬Ñ¡•¥ÈÍÉ••¸Á½Í¥Ñ¥½¹Ìì)¹¼ÍÕÉ™…”¡¥Ğ½É…å…ÍĞ½Í•¹”½µ½‘•°½Í•±•Ñ¥½¸µÕÑ…Ñ¥½¸¸µÁÑäÙ¥•İÁ½ÉĞ…±Í¼İ½É­Ì¸()	½Ñ ™¥¹•ÉÌµ½Ù¥¹œÑ½•Ñ¡•ÈA8íÍ•Á…É…Ñ¥½¸A%9 íÉ•±…Ñ¥Ù”…¹±”Q]%MP±Í¥µÕ±Ñ…¹•½ÕÍ±ä¸)¥Ñ¡•È™¥¹•È…¸ÍÑ…äÁ±…¹Ñ•İ¡¥±”½Ñ¡•È…ÉÌ…É½Õ¹¥Ğ¸]½É­Ì…™Ñ•È¥¹Ù•ÉÑ•½È)½‰±¥ÅÕ”½É‰¥Ğ…¹İ¥Ñ …¹Ù…Ì½™™Í•ÑÌ½Á…”ÍÉ½±°í¹¼É½Õ¹µ‰½Õ¹É•Í•Ğ¸½¹Ñ…ÑÌ)±½Í•ÈÑ¡…¸ÄÉÁàÍ…™•±äÉ•‰…Í”É…Ñ¡•ÈÑ¡…¸Õ¹‘•™¥¹•…¹±”½é•É¼‘½±±ä¸9…Ñ¥Ù”…¹•°¼)±¥™ĞÉ•ÑÕÉ¹ÌÑ¼½¹”µ™¥¹•ÈÍÑ…Ñ”í‘¥Í…‰±•½¹ÑÉ½±ÌÉ•™ÕÍ”µ½Ù•Ì¸=É¥¥¹…°Ñ…ÀÑ¡É•Í¡½±)½¹Ñ¥¹Õ•ÌÉ™¥¹•ÉU¹‘¼¼Í™¥¹•ÉI•‘¼ìÄÀÄÀÑ¡É•”µ™¥¹•È½µµ…¹‘ÌÕ¹Ñ½Õ¡•¸()¡…¹•Ì¹…ÉÉ½Üéµ…¥¸‘•™…Õ±Ğ½¥µÁ½ÉĞÁ¥¸…¹™É•”µ½É‰¥Ğ½¹ÑÉ½±±•È¸ÄÀÄÄÍ¡•±°½É•½Ù•Éä¼)…¹½¹¥…°É•±•…Í”µ±½…‘•È±…å½ÕĞ­‘É…İ•ÈÁ¥¹ÌÉ•Ù¥•İ•í½µÁ…É¥Í½¸½¹±ä½‘”±…‰•±Ì…¹)±½œµ¥É…Ñ¥½¸ÄÀÄÀ±½±É…Ñ¥¹Ì½AMM•ÌÕ¹¡…¹•¸A…¥¹Ğ½ÁÉ•Í•ÑÌ½ÁÉ•Ù¥•Ü½É…ÍÑ•È±±¥¡Ñ¥¹œ°)5Õ±Ñ¤Ä¸À±™É½é•¸‰•Ñ…Ì±µ½‘•±±¥¹œ½UX½…•ÁÑ•…ÁÁ•…É…¹”…¹Í¥é¥¹œ‰åÑ•Ì½Á¥¹ÌÕ¹¡…¹•¸(Ôà™½ÕÍ•¡•­ÌAML±¥¹±Õ‘¥¹œÄÀ¹•Ü…ÑÕ…°¹…Ñ¥Ù”Á½¥¹Ñ•È½½¹ÑÉ½±±•È¡•­Ìè)•¥Ñ¡•È…¹¡½È±¥¹Ù•ÉÑ•½½‰±¥ÅÕ”…µ•É„±Á…É…±±•°Á…¸±Á¥¹ ­Ñİ¥ÍĞ±±¥µ¥ÑÌ±¹•…Èµ½¥¹¥‘•¹Ğ)É•™ÕÍ…°½…¹•°±‘¥Í…‰±•µ½Ù”…¹é•É¼‘É¥™Ğ¸=É¥¥¹…°ÄÀÄÀ½A…¥¹Ğ½¡¥ÍÑ½Éä¡•­ÌÉ•Ñ…¥¹•¸)Õ±°±½…°9½‘”ÈĞ¸ÈÈ¸ÄèÈäØÔAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÄÄ¸äİÌ¤¸)Må¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸AÕ‰±¥…Ñ¥½¸ÁÉ½½˜é‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÄÄ¹µ¸9…Ñ¥Ù”ÄÀÄÄ™••°Á•¹‘¥¹œ¸()Y%ÄÀÄÄé½¹”µ™¥¹•È½É‰¥Ğ½™±¥¯ŠI±¥™ĞÍÑ½ÁÌ¥µµ•‘¥…Ñ•±äíÑİ¼™¥¹•ÉÌÑÉ…¹Í±…Ñ”½Á¥¹ ì)¡½±•¥Ñ¡•È™¥¹•È…¹…ÉŒ½Ñ¡•ËŠIÙ¥•ÜÑİ¥ÍÑÌ…É½Õ¹¡•±Á½¥¹Ğ¸½µ‰¥¹”…±°Ìí±¥™Ğ½¹”)…¹½¹Ñ¥¹Õ”½¹”µ™¥¹•È½É‰¥Ğ¸¡•¬ÉÑ…ÁU¹‘¼¼ÍÑ…ÁI•‘¼…¹ÄÀÄÀ±¥¡Ğ½‰ÉÕÍ •ÍÑÕÉ•Ì¸)9•áĞé‘•Ù¥”™••‘‰…¬½¸Ñİ¥ÍĞ¥¹Ñ•ÉÁÉ•Ñ…Ñ¥½¸½™••°¸ÄÀÀä½½µÁ±•Ñ”±AMLÁÉ½Ñ•Ñ•ì)‘•™…Õ±ĞÉ•Ñ…¥¹•±¹¼É•Á•…Ğ‰…Ñ ½ÈÉ•¹‘•É¥¹œµÉ½½Ğµ…ÕÍ”±…¥´¸((¸ÄÀÄÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•è)AÕ‰±¥Í¡•ÉÕ¹Ñ¥µ•˜äàääÌàØÌá™ØÕˆÄĞÈÕ„Ñ…‰•ŒÍ„ØÙ‰‰ŒÜå„ĞÀÁ˜íÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”)ˆÜÉ„Ù”ÈÑ•‘˜ÜÌäÅŒÍ”Õ„äÀäÕäÔÁ„ÙˆÄİˆĞÀØÅˆ¸±°ÄĞ¡…¹•‰±½‰ÌÙ•É¥™¥•‰•™½É”…Ñ½µ¥Œ)¹½¸µ™½É••áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”í™•Ñ¡•µ…¥¸½ÑÉ•”•ÅÕ…°±½…°Ñ•ÍÑ•¡•­½ÕĞ¸)A…•ÌĞÀàÀÜÜÌÀàÌà½µÁ±•Ñ•MUML¸ÄÄ…¡”µ‰ÕÍÑ•±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ éÙ•ÉÍ¥½¸°)¥¹‘•à±µ…¥¸±™É•”µ½É‰¥Ğµ½¹ÑÉ½±Ì±Í¡•±°µ½µÁ…É¥Í½¸±‘É…İ•ÈµÕ¤±™…”µİ½É­™±½Üµ±…å½ÕĞ°)É•±•…Í”µ‰½½ÑÍÑÉ…À±É•±•…Í”µÙ•ÉÍ¥½¸±Õ¹¡…¹•Ù¥•İÁ½ÉĞµÁ…¥¹Ğ…¹Ñ¡É•”µ™¥¹•Èµ½µµ…¹‘Ì¸)Õ±°±½…°ÈäØÔAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÄÄ¸äİÌ¤í™¥¹…°ÔÉ•±•…Í”¡•­ÌAML¸)!½ÍÑ•ĞÀàÀÜÜÌÄĞÈÄ¥¹}ÁÉ½É•ÍÌ…ĞÁÉ½½˜±¹½Ğ±…¥µ•AML¸ÄÀÄÄ1%Y½Id™½È¹…Ñ¥Ù”)¹¼µÑ…¥°½…¹¡½É•µÑİ¥ÍĞÑ•ÍÑ¥¹œ¸UÍ•ÈÄÀÄÀAMLÁÉ½Ñ•Ñ••á•ÁĞÉ•Ù½­•¥¹•ÉÑ¥„ì)¹¼¹…Ñ¥Ù”ÄÀÄÄ™••°…•ÁÑ…¹”¥¹™•ÉÉ•¸ÄÀÀä½µÁ…É¥Í½¸É•µ…¥¹Ì½µÁ±•Ñ”½…•ÁÑ•¸((ŒŒ€¸ÄÀÄÈƒŠPÙ¥•Üµ…á¥ÌÉ½Ñ…Ñ¥½¸‰…±°…¹½ÁÑ¥½¹…°½µÁ…ĞMÁ±¥ĞY¥•ÜƒŠP€Èä=Ñ½‰•È€ÈÀÈØ()MÑ…ÑÕÌèÁÉ•Á…É•½¸µ…¥¸™É½´€ÉŒØàäåÌ€¼±¥Ù”ÉÕ¹Ñ¥µ”˜äàääÌàØ€ ¸ÄÀÄÄ¤¸)AÕ‰±¥…Ñ¥½¸…¹™¥¹…°É•É•ÍÍ¥½¸•Ù¥‘•¹”İ¥±°‰”É•½É‘•¥¸‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÄÈ¹µ¸)UÍ•È€¸ÄÀÄÀAML…¹½µÁ±•Ñ•€¸ÄÀÀä½½AMLÉ•µ…¥¸ÁÉ½Ñ•Ñ•ì¹¼€¸ÄÀÄÄ½È€¸ÄÀÄÈ)¹…Ñ¥Ù”…•ÁÑ…¹”¥¹™•ÉÉ•¸9¼É•Á•…Ğ½µÁ…É¥Í½¸‰…Ñ É•ÅÕ•ÍÑ•ìÍÑ…åÌ‘•™…Õ±Ğ¸()UÍ•ÈÌ™¥¹…°É•äµ¥É±”±…É¥™¥…Ñ¥½¸¥Ì…ÕÑ¡½É¥Ñ…Ñ¥Ù”èÉ½Ñ…Ñ”Ñ¡”=	)P…É½Õ¹Ñ¡”)MI8½Y%\…á¥Ì…™Ñ•È…±¥¹¥¹œÑ¡”…µ•É„¸Q¡¥Ì¥Ì9=P„€Í…É‰…±°½È…µ•É„½É‰¥Ğ¸)Õ‘¥Ğ™½Õ¹Ñ¡¥Ì…±É•…‘ä¥¸ÑÉ…¹Í™½É´µÕÁÉ…‘”€¡Í¥¹±”½½µÁ½¹•¹ÑÌ¤…¹½‰©•Ğµ½É¥¥¸(¡5Õ±Ñ¤½É½ÕÁÌ¤ìÉ•ÕÍ”Ñ¡•¥È•á¥ÍÑ¥¹œY¥•ÜÅÕ…Ñ•É¹¥½¸°Á¥Ù½Ğ½½É¥¥¸°Í•±•Ñ¥½¸…¹)¡¥ÍÑ½Éä½İ¹•ÉÌ¸áÁ±¥¥Ğ­¥¹õÍÉ••¸¹½ÜÁÉ•Ù•¹ÑÌá¥ÌM¹…À¥¹™•ÉÉ¥¹œaeh™½ÈÑ¡¥Ì)¡…¹‘±”½¹±ä¸=Ñ¡•È½¹ÍÑÉ…¥¹ÑÌ°…¹±”‘•Ñ•¹ÑÌ°á…Ğµ•¹ÑÉä‰•¡…Ù¥½È…¹­•É¹•±ÌÍÑ…ä¸)¸•…É±¥•ÈÕ¹Í¡¥ÁÁ•€ÍÑÉ…­‰…±°ÁÉ½Ñ½ÑåÁ”İ…Ì‘¥Í…É‘•™½±±½İ¥¹œ±…É¥™¥…Ñ¥½¸ì)¹¼ÑÉ…­‰…±°¡•±Á•È°Í•½¹ÑÉ…¹Í™½É´­•É¹•°½È¹•ÜÉ…ÜÁ½¥¹Ñ•È±¥ÍÑ•¹•ÈÍ¡¥ÁÌ¸()Q½Ñ…°¥éµ¼É•Á±…•Ì½±Íµ…±°İ¡¥Ñ”Y¥•ÜÉ¥¹œİ¥Ñ „€ÔÈMMÁàÉ•äÉ½Ñ…Ñ¥½¸‰…±°è)Ù•Éä™…¥¹Ğ¹•ÕÑÉ…°™¥±°°‘…É¬¡…É½…°½ÕÑ±¥¹”°Í±¥¡Ğå•±±½Ü…Ñ¥Ù”¡¥¡±¥¡Ğ¸%Ğ¥Ì)‰•¡¥¹•á¥ÍÑ¥¹œaeh…ÉÌ½…ÉÉ½İÌ½Á…‘Ì½Í…±”¹½‘•Ì½5½Ù”•¹ÑÉ”ìÑ¡½Í”É•Ñ…¥¸ÁÉ¥½É¥Ñä¸)aehÁ…Ñ¡Ì9Ñ¡•¥È¡¥ĞÁÉ½á¥•Ì½¹Ñ…¥¸½¹±äÑ¡”…µ•É„µ™…¥¹œÍ•µ¥¥É±”ì¹¼É•…È)¡¥Ğ•½µ•ÑÉä°±½Í¥¹œ¡½É½È½Á…ÅÕ”½±Õ‘¥¹œ‘¥ÍŒ¸…”µ½¸±¥µˆÍÑ…åÌ„™Õ±°É¥¹œ¸)=É…¹”M…±”¥É±”°½É¹•È½¹ÑÉ½±Ì°ÁÉ½©•Ñ•…á•Ì°±¥ÁÁ¥¹œ½Í¥¹Õ±…É¥ÑäÉ•™ÕÍ…°°)áÑÉÕ‘”Á±…¹•Ì…¹½É¥¥¹…°á…Ğ™±½ÜÉ•Ñ…¥¹•¸I•™•É•¹”è%5|àÌÔÈ¹Á¹œ…¹(ĞÑÕÈµ´ĞÌÀÀµÔÌä´İÄÍÄäÕ	¹Á¹œÍÕÁÁ±¥•¥¸ÕÉÉ•¹Ğ¡…Ğ¸…É¬½±¥¡ĞMY)ÁÉ½©•Ñ¥½¸ÁÉ•Ù¥•Ü¥¹ÍÁ•Ñ•ì¹½Ğ„M…™…É¤Á¥á•°½¡¥ĞµÑ•ÍÑ¥¹œ½È¹…Ñ¥Ù”…•ÁÑ…¹”±…¥´¸()MÁ±¥ĞY¥•Üè½É¥¥¹…°Á½ÉÑÉ…¥Ğ…Ñ”½™™•ÉÌ½¹Ñ¥¹Õ”¥¸½µÁ…ĞÙ¥•Ü¸áÁ±¥¥Ğ¡½¥”)Á•ÉÍ¥ÍÑÌ™½ÈÑ¡¥Ì‰É½İÍ•ÈÍ•ÍÍ¥½¸€¡ÍÑ½É…”µ‘•¹¥•™…±±‰…¬ÍÑ…åÌ¥¸µ•µ½Éä¤¸Ñ¥Ù”)½¹±ä¥¸¹…ÉÉ½ÜÁ…¹•Ììİ¥‘•¹¥¹œÉ•ÍÑ½É•Ì¹½Éµ…°±…‰•±Ì½±…å½ÕĞ…ÕÑ½µ…Ñ¥…±±ä¸9•Ü)½µÁ…Ğµ±…å½ÕĞ¹©Ì€¬Í½Á•ML…É”ÁÉ•Í•¹Ñ…Ñ¥½¸½¹±ä¸=É¥¥¹…°µ½‘”½Ñ½½°½A…¥¹Ğ¹½‘•Ì°)Ñ•áÑ½¹Ñ•¹Ğ°Í•±•Ñ•…ÉÑİ½É¬°‘¥ÍÁ…Ñ …¹‘¥Í…‰±•ÍÑ…Ñ•ÌÍÑ…ä…ÕÑ¡½É¥Ñ…Ñ¥Ù”ì±…‰•±Ì)É•µ…¥¸…•ÍÍ¥‰±”…Ì…É¥„µ±…‰•°½Ñ¥Ñ±”¸I…‘¥…±Ì™¥Ğİ¥Ñ¡¥¸Á…¹”°¥½¸µ½¹±äÑ…É•ÑÌ€øôĞÑÁàì)•áÑÉ„µ¹…ÉÉ½Ü€ğôĞÀÁÁàÕÍ•ÌÑ¡”Í…µ”½É¥¥¹…°Ñ½½°‰ÕÑÑ½¹Ì…Ì„™½ÕÈµ½±Õµ¸¥½¸É¥¸)=¹±äÑ½½°µÁ¥­•È•¹ÑÉ”¥Ì™¥ÑÑ•ìÑÉ…¹Í™½É´¥éµ¼É•µ…¥¹Ì½¸Í•±•Ñ••½µ•ÑÉä¸)A…¥¹ĞÉ…‘¥…°€ÈäÉÁà€¼ĞáÁàÑ…É•ÑÌ°Í¡½ÉÑ•È±…å•È±¥ÍĞ…¹Í¥¹±”µ½±Õµ¸‰ÉÕÍ Í•ÑÑ¥¹Ìì)½É¥¥¹…°1P‘½¬°±…‰•±Ì½Ù…±Õ•Ì…¹½¹”½U¹‘¼½I•‘¼É•Ñ…¥¹•¸9¼É•¹‘•É•È°‰…­¥¹œ)Í¥é”°µ½‘•°°¡¥ÍÑ½Éä°É•Á…É•¹Ñ¥¹œ°Íå¹Ñ¡•Ñ¥ŒÉ•Í¥é”°Á½±±¥¹œ½È•ÍÑÕÉ”¡…¹•Ì¸)á¥ÍÑ¥¹œÍ¥é¥¹œ½‰Í•ÉÙ•È¡…¹‘±•ÌÉ•Ù•…±•…ÁÀ½É•…°Á…¹”É•Í¥é”¸	…¡”É•ÑÕÉ¸)É•½¹¹•ÑÌ‘•½É…Ñ¥½¸½‰Í•ÉÙ•ÈìÁ…•¡¥‘”‘¥Í½¹¹•ÑÌ¥Ğ¸I•™•É•¹”ÍÁ±¥ĞÍÉ••¹Í¡½Ğ(ÄäÕÜÀÕ´Áİ´ÑÔĞ´äÌØä´ÕáÜÔáÉ¹Á¹œ¸¥A…™••°½Ù¥ÍÕ…°Á…É¥ÑäÍÑ¥±°Á•¹‘¥¹œ¸()I•Ù¥•İ•…¡”±½ÍÕÉ”èÑ½Ñ…°µ¥éµ¼°ÑÉ…¹Í™½É´µÕÁÉ…‘”°½‰©•Ğµ½É¥¥¸Ù¥„‘É…İ•È°)…¹½¹¥…°É•±•…Í”µÙ•ÉÍ¥½¸Ù¥„™…”µİ½É­™±½Üµ±…å½ÕĞ½‘É…İ•È°‰½½ÑÍÑÉ…À…¹½µÁ…É¥Í½¸)Á¥¹Ì€¸ÄÀÄÈì¹•Ü½µÁ…Ğ…ÍÍ•ÑÌ€¸ÄÀÄÈ¸½µÁ…É¥Í½¸½¹±ä½‘”±…‰•±Ì½±½œµ¥É…Ñ¥½¸ÄÀÄÄì)½±É…Ñ¥¹Ì…¹ÍÑÉÕÑÕÉ”Õ¹¡…¹•¸%¹Ñ•É¹…°½±µ½‘Õ±”ÍÑ…µÁÌ¥¹Ñ•¹Ñ¥½¹…±±äÍÑ…ä¸)5…¥¸½™É•”µ½É‰¥ĞÄÀÄÄ°A…¥¹Ğ½Ñ¡É•”µ™¥¹•ÈÄÀÄÀ°…•ÁÑ•¥½¸ML…¹ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À)…¹™É½é•¸	•Ñ„ËŠLÜÉ•µ…¥¸‰åÑ”½Á¥¸Õ¹¡…¹•¸9¼±…É”U$±•…¹ÕÀ…ÁÁ±¥•¸()Y…±¥‘…Ñ¥½¸è€ä¹•Ü…ÑÕ…°µ½İ¹•È½ÁÉ•Í•¹Ñ…Ñ¥½¸¡•­Ìì€ÌÔ™½ÕÍ•€¬ÈÈ½¹ÑÉ…Ğ½½É¹•È)¡•­ÌÁ…ÍÌ¸¥¹…°½µÁ±•Ñ”µÍÕ¥Ñ”É•ÍÕ±ĞÉ•½É‘•‰•±½Ü‰•™½É”ÁÕ‰±¥…Ñ¥½¸¸=±‘•È(¸ÌÔà½‰©•Ğµ½É¥¥¸™¥á•µÁ¥¸…ÍÍ•ÉÑ¥½¸¹½ÜÕÍ•ÌÉ•Ù¥•İ•…ÍÍ•Ğ½¹ÑÉ…Ğ™½ÈÑ¡”)•áÁ±¥¥Ñ±äÉ•ÅÕ•ÍÑ•½İ¹•È¡…¹”ìÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À…ÍÍ•ÉÑ¥½¸Õ¹¡…¹•¸€¸ÜÄÈ)ÍÉ••¸µ¥É±”…ÍÍ•ÉÑ¥½¸™½±±½İÌ¹•ÜÉ•äµ…É­ÕÀ‰ÕĞÉ•Ñ…¥¹ÌY¥•Ü½İ¹•È…¹5½Ù”)•¹ÑÉ”½½É¹•ÈÁÉ½Ñ•Ñ¥½¹Ì¸€¸äØÄ¡•­Ì½Á•¸™É½¹ĞÁ…Ñ İ¥Ñ¡½ÕĞ±½Í¥¹œÉ•…È¡½Éì(¸ÔÜÀ¡•­Ì½É¥¥¹…°ÁÉ½áäÉ½ÕÑ¥¹œİ¡¥±”É•ä‰…±°ÕÍ•Ì¥ÑÌ½İ¸™¥±±•¡¥ĞÉ•¥½¸¸()Y%ÄÀÄÈè¥¹ÍÁ•Ğ¥éµ¼½Ù•È‘…É¬‰…­É½Õ¹½±¥¡Ğ½‰©•Ğİ¡¥±”½É‰¥Ñ¥¹œì¹¼É•…È)…ÉÌ¸É…œÉ•ä¥¹Ñ•É¥½È…É½Õ¹•¹ÑÉ”è½‰©•ĞÉ½Ñ…Ñ•Ì…‰½ÕĞ…±¥¹•Ù¥•Ü°ÍÕ‰Ñ±”)å•±±½ÜÁÉ•ÍÌì5½Ù”•¹ÑÉ”½aeh½M…±”ÍÑ¥±°İ½É¬¸U¹‘½I•‘¼ìÑÉä5Õ±Ñ¤½É½ÕÀ¸MÁ±¥ĞY¥•Ü)Á½ÉÑÉ…¥Ğ¹½Ñ¥”€´ø½¹Ñ¥¹Õ”½µÁ…Ğìµ½‘”½Ñ½½°½A…¥¹Ğ¥½¹Ì™¥Ğ°¡½½Í”Ñ½½°½A…¥¹Ğ°)½¹”ìÉ•Í¥é”Á…¹”½™Õ±°ÍÉ••¸É•ÍÑ½É•Ì¹½Éµ…°±…‰•±Ì¸9…Ù¥…Ñ¥½¸…¹A…¥¹Ğ•ÍÑÕÉ•Ì)™É½´ÄÀÄÀ¼ÄÀÄÄÉ•µ…¥¸ì¹…Ñ¥Ù”ÄÀÄÄ™••°…¹ÄÀÄÈ¡•­ÌÁ•¹‘¥¹œ•áÁ±¥¥ĞAML¸()9•áĞèÉ•ÍÁ½¹Ñ¼¹…Ñ¥Ù”¥éµ¼½½µÁ…Ğ™••‘‰…¬°­••ÀÙ¥Í¥‰¥±¥Ñä™…Õ±Ğİ…Ñ ¡½¹•ÍĞì)¹¼¹•Ü½‰…Ñ¡•Ì½ÈÕ¹ÍÕÁÁ½ÉÑ•Á•Éµ…¹•¹Ğ½µÁ½Í¥Ñ½ÈÉ•Á…¥È±…¥´¸((¸ÄÀÄÈÙ…±¥‘…Ñ¥½¸½µÁ±•Ñ”‰•™½É”ÁÕ‰±¥…Ñ¥½¸è)Õ±°±½…°9½‘”ÈĞ¸ÈÈ¸Äè€ÈäÜĞAML€¼€À%0€¼€ÀÍ­¥ÁÁ•€¼€À…¹•±±•€ ÄÀĞ¸ÌáÌ¤¸)Må¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°™É½é•¸‰•Ñ…Ì°µ…¥¸½™É•”µ½É‰¥ĞÄÀÄÄ°)A…¥¹Ğ½Ñ¡É•”µ™¥¹•ÈÄÀÄÀÕ¹¡…¹•¸AÕ‰±¥…Ñ¥½¸½±¥Ù”Ù•É¥™¥…Ñ¥½¸™½±±½İÌ¸((¸ÄÀÄÈÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€Èä=Ñ½‰•È€ÈÀÈØè)IÕ¹Ñ¥µ”ˆÙ„ÙåáŒÈÙ˜ÔäÑ„ÜÍˆÈÑ…àÈàÀÍ…™•‘ĞØäÔØÙˆìÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”(ÕˆÀäÅˆÀÉŒÁ•™…„ØİÀÜÙ˜á˜ÄØĞá„ÜáŒÁ‰Èá‰‰¸±°ÈÈ‰±½‰ÌÙ•É¥™¥•‰•™½É”…Ñ½µ¥Œ°)¹½¸µ™½É••áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”ì™•Ñ¡•µ…¥¸•á…Ñ±äµ…Ñ¡•ÌÑ•ÍÑ•±½…°ÑÉ•”¸)A…•ÌĞÀàÄäÄÈäÄÔÜ½µÁ±•Ñ•MUML¸ÄÜ¼ÄÜ…¡”µ‰ÕÍÑ•±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ °)¥¹±Õ‘¥¹œ…±°¡…¹•ÉÕ¹Ñ¥µ”½±½…‘•È…ÍÍ•ÑÌÁ±ÕÌÁÉ½Ñ•Ñ•¹…Ù¥…Ñ¥½¸½A…¥¹Ğ½5Õ±Ñ¤¸)1½…°ÈäÜĞAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÀĞ¸ÌáÌ¤°™¥¹…°ÜÉ•±•…Í”¡•­ÌAML¸)!½ÍÑ•ĞÀàÄäÄÈäØÄÈ¥¹}ÁÉ½É•ÍÌ…ĞÁÉ½½˜ì¹½Ğ±…¥µ•AML¸ÄÀÁÉ½Ñ•Ñ•¹…Ù¥…Ñ¥½¸°)A…¥¹Ğ°5Õ±Ñ¤…¹¥½¸™¥±•Ì…É”‰åÑ”µ¥‘•¹Ñ¥…°Ñ¼‰…Í•±¥¹”¸€¸ÄÀÄÈ1%Y½Id™½È)¹…Ñ¥Ù”¥éµ¼½½µÁ…Ğ¡•­Ìì¹¼¹…Ñ¥Ù”ÄÀÄÄ¼ÄÀÄÈAML¥¹™•ÉÉ•¸M•”ÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜¸((ŒŒ€¸ÄÀÄÌƒŠP¹…Ñ¥Ù”9=4Á½±å½¸¥µÁ½ÉĞƒŠP€Èä=Ñ½‰•È€ÈÀÈØ()MÑ…ÑÕÌè€¸ÄÀÄÌ¥µÁ±•µ•¹Ñ…Ñ¥½¸Ù…±¥‘…Ñ•¥¸™½ÕÍ•¡•­Ìì™Õ±°É•É•ÍÍ¥½¸½ÁÕ‰±¥…Ñ¥½¸)Á•¹‘¥¹œ¸	…Í•±¥¹”µ…¥¸Ñ™ÜÔÄÁ˜€¼±¥Ù”ÄÀÄÈÉÕ¹Ñ¥µ•ˆÙ„Ùåà¸AÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”İ¥±°)‰”‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÄÌ¹µì‘•Ñ…¥±•Í½Á”½É•™•É•¹”é‘½Ì½¹½µ…µ¥µÁ½ÉĞ´ÄÀÄÌ¹µ¸()UÍ•ÈÉ•Á½ÉÑÌƒŠqÉ¥¡ĞÍ¥‘”ÍÉ••¸¥ÍÍÕ”Í••µÌÑ¼‰”™¥á•„‡Št¸I•½É•áÁ±¥¥ĞÁ½Í¥Ñ¥Ù”)¹…Ñ¥Ù”½‰Í•ÉÙ…Ñ¥½¸½¹¼ÕÉÉ•¹ĞÉ•ÕÉÉ•¹”°¹½Ğ„ÁÉ½Ù•¸Á•Éµ…¹•¹Ğ•¹¥¹”‘¥…¹½Í¥Ì)½È‰±…¹­•Ğ€¸ÄÀÄÈ¥éµ¼½½µÁ…ĞAML¸€¸ÄÀÄÀAML…¹€¸ÄÀÀä½µÁ±•Ñ•½½…•ÁÑ…¹”)É•µ…¥¸ÁÉ½Ñ•Ñ•ì€¸ÄÀÄÄ•ÍÑÕÉ”™••°¼¸ÄÀÄÈ¥éµ¼­½µÁ…Ğ¡•­Ì¹½Ğ•áÁ±¥¥Ñ±äÉ…‘•¸()UÍ•ÈÉ•ÅÕ•ÍÑÌ¹…Ñ¥Ù”9=4¥µÁ½ÉĞ…¹ÍÕÁÁ±¥•ÌÉ•…Ñ½ÈMÑ•Á¡…¹”Ì¹½µ}™¥±”¹Áä¸)Õ‘¥Ğ½¹™¥ÉµÌ¹…Ñ¥Ù”aA=IP…±É•…‘ä•á¥ÍÑÌì%µÁ½ÉĞÕÉÉ•¹Ñ±ä=	(½1½1Q½¹±ä¸)UÍ”ÕÉÉ•¹ĞÕÁÍÑÉ•…´ÀàÌäÅŒá”€ Èá=Ñ½‰•È¤°‰±½ˆÙ‘ˆÅ•…ˆ°Á±ÕÌ…‘…ÁÑ•È™½È¡¥•É…É¡ä°)ÑÉ¥…¹±”½…•5•Ñ„½UX½¹Ù•¹Ñ¥½¹Ì¸9•Ü¥¹‘•Á•¹‘•¹Ğ‰É½İÍ•ÈÁ…ÉÍ•È¥¸¹½µ…µ¥µÁ½ÉĞµ½É”°)¹½ĞAåÑ¡½¸ÉÕ¹Ñ¥µ”½È½Á¥•ÕÁÍÑÉ•…´µ½‘Õ±”¸á¥ÍÑ¥¹œ•áÁ½ÉĞµÑ•µÁ±…Ñ”¡•…‘•ÈÉ•…‘•È°)9=4İÉ¥Ñ•È½‘½¹½È…¹…±°A…¥¹Ğ½•½µ•ÑÉä½•áÁ½ÉĞ½İ¹•ÉÌÕ¹¡…¹•¸9¼Í•½¹µ½‘•±±¥¹œ)­•É¹•°¸¥±”¡½½Í•È½‘¥ÍÁ…Ñ¡•È½…‘‘%µÁ½ÉÑ•É•µ…¥¸…ÕÑ¡½É¥Ñ…Ñ¥Ù”ì¹•Ü™½Éµ…Ğ½¹±ä¸()MÕÁÁ½ÉĞÉ…Ü½é•É¼½±•…ä½ÕÉÉ•¹Ğ1hĞÑåÁ••½µ•ÑÉä…ÉÉ…åÌ°Í…™”µ½‘•É¸½±•…ä¡•…‘•ÉÌ°)Ñ¡Õµ‰¹…¥°‰•™½É•)M=8½…™Ñ•É‰¥¸°¹…Ñ¥Ù”ÅÕ…‘Ì…¹¹•…Ñ¥Ù”µ™½ÕÉÑ ÑÉ¥…¹±•Ì€¡Á±ÕÌ½İ¸)•áÁ½ÉĞÉ•Á•…Ñ•µÑ¡¥É½µÁ…Ñ¥‰¥±¥Ñä¤°¹…µ•Ì°Á…É•¹ĞÑÉ…¹Í™½ÉµÌ°Ù¥Í¥‰¥±¥Ñä°µ¥ÉÉ½É•)İ¥¹‘¥¹œ­UX½ÉÉ•ÍÁ½¹‘•¹”°™…•É½ÕÁÌ…¹Á•Èµ½É¹•ÈUXÍ•…µÌ¸5…¥¸Í…Ù•Í¡…Á”°)…Ñ¥Ù”µ±•Ù•°Ñ½Á½±½ä™…±±‰…¬°‰…­•ÑÉ¥Á±…¹…È¥˜ÍÕÁÁ±¥•¸±°•½µ•ÑÉä‘•½‘•¼)Ù…±¥‘…Ñ•‰•™½É”™¥ÉÍĞµ…¹…•È…±°¸9…Ñ¥Ù”¥¹‘•á•Ñ½Á½±½ä‰åÁ…ÍÍ•Ì•á¥ÍÑ¥¹œ=	(¼)1İ•±½É•½¹ÍÑÉÕÑ¥½¸°É•Ñ…¥¹¥¹œ½¥¹¥‘•¹Ğ‘¥Í½¹¹•Ñ•¥¹‘¥•Ì¸á¥ÍÑ¥¹œ½µµ½¸)™¥Ğ½µ…¹…•È½¡¥ÍÑ½Éä½É•™•É•¹”½İ¹•ÉÌ¡…¹‘±”¥µÁ½ÉĞ¸¥±”¥¹™¼½ÍÑ…ÑÕÌÍÑ…Ñ”•½µ•ÑÉä¬)UX½¹±äèÁ…¥¹Ğ½µ…Ñ•É¥…±Ì½Ñ•áÑÕÉ•Ì½µ…Í­Ì¹½Ğ¥µÁ½ÉÑ•ìÍÕ±ÁĞ±…å•ÉÌ™±…ÑÑ•¸Ñ¼Í…Ù•)Í¡…Á”¸1¥¡ÑÌ½…µ•É…Ì½µ¥ÑÑ•İ¥Ñ ¹½Ñ”¸I•Á•…Ğ¡¥¹ÑÌ½Õ¹‰…­•ÁÉ½•‘ÕÉ…°½µ¥ÍÍ¥¹œ)½µÁÉ•ÍÍ•µÕ±Ñ¥É•ÌÑ½Á½±½äÉ•™ÕÍ”İ¡½±”¥µÁ½ÉĞİ¥Ñ …Ñ¥½¹…‰±”Í…Ù”½Ù…±¥‘…Ñ”¡¥¹Ğ¸)1¥µ¥ÑÌÄÈá5¥™¥±”¼ÄÙ5¥)M=8¼ØÑ5¥É•ÅÕ•ÍÑ•‘•½‘•…ÉÉ…åÌ¼ÔÀÁ¬Ù•ÉÑ¥•Ì­™…•ÌÑ½Ñ…°¼(ÔÄÉ½‰©•ÑÌ¼ĞÀäÙ¹½‘•Ì½‘•ÁÑ ÄÈàì¹½Ğ…¸¥A…Á•É™½Éµ…¹”Õ…É…¹Ñ•”¸()9…Ñ¥Ù”UXµ½¹±äÍ½ÕÉ”õ‰½á±…ˆ•¹Ù•±½Á”€¡•á¥ÍÑ¥¹œÙ•ÉÍ¥½¸½Í¡•µ„¤ÍÕÉÙ¥Ù•Ì½É¥¥¹…°)UX‘¥Ñ½È½A…¥¹Ğ½ÁÉ½©•Ğ½1½9=4½İ¹•ÉÌ¸9¼™…­”1ÁÉ½Ù•¹…¹”°¹•Ü½‘•Œ½È¥µ…”)Í¡•µ„¸9…Ñ¥Ù”¹½UXÉ•µ…¥¹ÌÁ±…¥¸•½µ•ÑÉä¸…•5•Ñ„¡¥‘‘•¸™…•Ì¥µÁ½ÉÑ•Ù¥Í¥‰±”)İ¥Ñ ¹½Ñ”ì¡¥‘‘•¸½‰©•ÑÌÉ•Ñ…¥¸Ù¥Í¥‰¥±¥Ñä¸M½ÕÉ”™¥±”Õ¹Ñ½Õ¡•°ÁÉ•Ù¥½ÕÌÍ•¹”)É•Ñ…¥¹•¸¥±”%µÁ½ÉĞ¥¹±Õ‘•Ì€¹¹½´…¹½¹¥Í”Í½Á”¹½Ñ”‰•™½É”™¥±”Í•±•Ñ¥½¸¸((ä¹•Ü¡•­Ìè¥¹‘•Á•¹‘•¹ĞÕÁÍÑÉ•…´µİÉ¥Ñ•È­¹…Ñ¥Ù•1hĞ™¥áÑÕÉ•ÌÙ•É¥™¥•‰äÕÁÍÑÉ•…´)É•…‘•È€¡É…ÜÜ½¡Õ¹­•Ü½±•…äÔ¤°µ…±™½Éµ•±•¹Ñ¡Ì½Í¥¹…ÑÕÉ•Ì½±¥µ¥ÑÌ½ÑåÁ”½½µÁÉ•ÍÍ¥½¸°)…Ñ¥Ù”™…±±‰…¬½•µÁÑå±•Ù•±Ì½ÁÉ½•‘ÕÉ…°½É•™ÕÍ…°°Í…Ù•Í¡…Á”İ…É¹¥¹Ì°…ÑÕ…°¥±”)É½ÕÑ”½™¥Ğ½¹…µ•Ì½Ù¥Í¥‰¥±¥Ñä½¥¹‘•àÁÉ•Í•ÉÙ…Ñ¥½¸½É•™•É•¹”°UXM…Ù•=Á•¸½1½9=4É•¥µÁ½ÉĞ¸)•¹Õ¥¹”‘½¹½ÈÈØĞÉØ¼ÈØĞÁ˜½µÁÉ•ÍÍ•¹…Ñ¥Ù”•½µ•ÑÉä…¹ÁÉ•)M=8Ñ¡Õµ‰¹…¥°‘•½‘”¸(ÌÀ™½ÕÍ•¡•­ÌAMLìÄäÉ•±•…Í”µ™½ÕÍ•AMLí™¥¹…°½µÁ±•Ñ”ÍÕ¥Ñ”™½±±½İÌ¸()I•Ù¥•İ•ÄÀÄÌ…¡”±½ÍÕÉ”é¥µÁ½ÉĞµµ•Í ½¹•Ü½É”°É•±•…Í”½‰½½ÑÍÑÉ…À½½µÁ…É¥Í½¸…¹)…¹½¹¥…°É•±•…Í”´ù™…”µ±…å½ÕĞ´ù‘É…İ•ÈÁ…É•¹ÑÌ¸=É¥¥¹…°¥µÁ½ÉĞÍÑ…µÀààÈÉ•Ñ…¥¹•¸)=±½µÁ…É¥Í½¸É…Ñ¥¹ÌÁÉ•Í•ÉÙ•‰äµ¥É…Ñ¥½¸ÄÀÄÈí‘•™…Õ±Ğ½¹¼¹•Ü½µÁ…É¥Í½¸…Í¬¸)AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°™É½é•¸‰•Ñ…Ì°¹…Ù¥…Ñ¥½¸ÄÀÄÄ°A…¥¹Ğ½Ñ¡É•”µ™¥¹•ÈÄÀÄÀ…¹…•ÁÑ•(ÄÀÄÈ¥éµ¼½½µÁ…Ğ½‘”°9=4•áÁ½ÉĞ…¹‘½¹½È…±°Õ¹¡…¹•¸9¼‰É½…U$±•…¹ÕÀ¸()Y%ÄÀÄÌè¥±”%µÁ½ÉĞ„Íµ…±°±½ÜµÁ½±ä€¹¹½´ì¥¹ÍÁ•Ğ¹…µ•½‰©•ÑÌ½É•±…Ñ¥Ù”Á±…•µ•¹Ğ°)ÅÕ…‘Ì½ÑÉ¥…¹±•Ì½™…•É½ÕÁÌìUX‘¥Ñ½È¥˜Í½ÕÉ”µ…ÁÁ•¸I•™•É•¹”±½­ÌìM…Ù”€¹‰½á±…ˆ°)É•½Á•¸…¹•áÁ½ÉĞ9=4Ñ¼½¹™¥É´Í¡…Á”½UYÌ¸Q•áÑÕÉ”½Á…¥¹Ğ…ÁÁ•…É…¹”¥Ì9=PÍÕÁÁ½ÉÑ•)‰äÑ¡¥ÌÍÑ…”ì¥±”¹½Ñ”½ÍÑ…ÑÕÌµ…­•ÌÑ¡¥Ì•áÁ±¥¥Ğ¸%˜É•©•Ñ•°Í•¹•á…Ğ•ÉÉ½È)…¹Í½ÕÉ”9=4™½ÈÑ…É•Ñ•½µÁ…Ñ¥‰¥±¥Ñäİ½É¬¸9¼™É•Í ½Ñ•ÍÑ¥¹œÉ•ÅÕ¥É•¸)9•áĞè¹…Ñ¥Ù”9=4‘•Ù¥”…Ñ”°Ñ¡•¸ÍÑ…•Á…¥¹Ğ½µ…Ñ•É¥…°½±…å•È½É•Á•…ĞÍÕÁÁ½ÉĞ…Ì)É•ÅÕ•ÍÑ•ì­••ÀÁ½Í¥Ñ¥Ù”É¥¡ĞµÍ¥‘”½‰Í•ÉÙ…Ñ¥½¸…¹¡¥ÍÑ½É¥…°±¥µ¥ÑÌ¡½¹•ÍĞ¸((¸ÄÀÄÌ™¥¹…°Ù…±¥‘…Ñ¥½¸½µÁ±•Ñ”‰•™½É”ÁÕ‰±¥…Ñ¥½¸è)Õ±°±½…°9½‘”ÈĞ¸ÈÈ¸ÄèÈäàÌAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÀÔ¸ØÑÌ¤¸)Må¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸ÌÀ™½ÕÍ•€¬ÄäÉ•±•…Í”µ™½ÕÍ•€¬ÄĞ™¥¹…°É•Ù¥•Ü¡•­ÌAML¸)AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À°¹…Ñ¥Ù”9=4•áÁ½ÉÑ•È½‘½¹½È°ÄÀÄÈ¥éµ¼½½µÁ…Ğ°ÄÀÄÄ¹…Ù¥…Ñ¥½¸…¹(ÄÀÄÀA…¥¹Ğ½Ñ¡É•”µ™¥¹•È½İ¹•ÉÌÉ•µ…¥¸Õ¹¡…¹•¸AÕ‰±¥…Ñ¥½¸½±¥Ù”ÁÉ½½˜™½±±½İÌ¸((¸ÄÀÄÌÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€Èä=Ñ½‰•È€ÈÀÈØè)IÕ¹Ñ¥µ”É”ÌÅ•ÍäÙ˜Å”ĞÁˆÌÜÔÀÕ„İŒÌĞÌÕŒÙ••…ÁˆÄå˜ìÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”(ÀÅÀĞØÀİ‘”äáÔÀáÌÔĞĞÈĞàá‘ˆÅ”äÅ„Áˆá„äÈ¸±°ÄØ‰±½‰Ì¡…Í µÙ•É¥™¥•‰•™½É”…Ñ½µ¥Œ)¹½¸µ™½É••áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”ì™•Ñ¡•µ…¥¸•á…Ñ±äµ…Ñ¡•Ì±½…°Ñ•ÍÑ•ÑÉ•”¸)A…•ÌĞÀàÈÄÔÜÀÌÈÔ½µÁ±•Ñ•MUML¸Ää¼Ää…¡”µ‰ÕÍÑ•±¥Ù”™¥±•Ìµ…Ñ Ñ¡”Ñ•ÍÑ•)¡•­½ÕĞ°¥¹±Õ‘¥¹œ¹•Ü‘•½‘•È½¥µÁ½ÉÑ•È½É•±•…Í”±½…‘•ÉÌ…¹ÁÉ½Ñ•Ñ•9=4•áÁ½ÉÑ•È¼)‘½¹½È°ÄÀÄÈ¥éµ¼½½µÁ…Ğ°ÄÀÄÄ¹…Ù¥…Ñ¥½¸…¹ÄÀÄÀA…¥¹Ğ½Ñ¡É•”µ™¥¹•È½5Õ±Ñ¤Ä¸À¸)1½…°ÈäàÌAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÀÔ¸ØÑÌ¤±™¥¹…°ÜÉ•±•…Í”¡•­ÌAML¸)!½ÍÑ•ĞÀàÈÄÔÜÄÄäÀ¥¹}ÁÉ½É•ÍÌ…ĞÁÉ½½˜±¹½Ğ±…¥µ•AML¸€¸ÄÀÄÌ1%Y½Id™½È¹…Ñ¥Ù”)9=4•½µ•ÑÉä½UX¡•­Ì¸9…Ñ¥Ù”ÄÀÄÌ…•ÁÑ…¹”Á•¹‘¥¹œì•½µ•ÑÉäµ½¹±äÍ½Á”É•Ñ…¥¹•¸)UÍ•ÈÁ½Í¥Ñ¥Ù”É¥¡ĞµÍ¥‘”½‰Í•ÉÙ…Ñ¥½¸É•½É‘•İ¥Ñ¡½ÕĞ¥¹™•ÉÉ¥¹œ…±°ÄÀÄÈ™•…ÑÕÉ•ÌAML¸((ŒŒ€¸ÄÀÄĞƒŠPÕ¹™¥±Ñ•É•¹…Ñ¥Ù”™¥±”¡½½Í•È™½È9=4ƒŠP€Èä=Ñ½‰•È€ÈÀÈØ()MÑ…ÑÕÌè€¸ÄÀÄĞÙ…±¥‘…Ñ•°ÁÕ‰±¥Í¡¥¹œ¸	…Í•±¥¹”µ…¥¹Õ‰˜å˜Ù„½ÉÕ¹Ñ¥µ”É”ÌÅ•Í€ ¸ÄÀÄÌ¤¸)UÍ•ÈÉ•Á½ÉÑÌ9=4™¥±•ÌIe=UP¥¸¥A…¥±•Ì‰•™½É”Í•±•Ñ¥½¸¸Q¡¥Ì‰±½­Ì¹…Ñ¥Ù”(ÄÀÄÌ…•ÁÑ…¹”‰•™½É”‘•½‘•ÈÉÕ¹Ìì‘¼¹½ĞÑÉ•…Ğ…Ì„Á…ÉÍ”™…¥±ÕÉ”½È¹…Ñ¥Ù”AML¸()Õ‘¥Ğè½¹±ä€¥µÁ½ÉÑ5•Í¡%¹ÁÕĞÍ¡•±°…ÑÑÉ¥‰ÕÑ”Í•ÑÌ¥ÑÌÑåÁ”É•ÍÑÉ¥Ñ¥½¸ì¥µÁ½ÉÑ•È)…¹±…Ñ•Èµ½‘Õ±•Ì¹•Ù•ÈÉ•İÉ¥Ñ”…•ÁĞ¸á¥ÍÑ¥¹œÁÉ½©•Ğ=Á•¸…±É•…‘äÕÍ•Ì…¸)Õ¹™¥±Ñ•É•¥¹ÁÕĞ¸I•µ½Ù”=91d…•ÁĞôˆ¹½‰¨°¹±ˆ°¹±Ñ˜°¹¹½´ˆ™É½´½É¥¥¹…°µ•Í ¡½½Í•È¸)9¼İ¥±‘…É5%5É•Á±…•µ•¹Ğ°Õ•ÍÍ•9=45%5½UQQåÁ”°‘ÕÁ±¥…Ñ”Á¥­•È°É•¹…µ¥¹œ°)Á•Éµ¥ÍÍ¥½¹Ì™±½Ü½È¹•Ü)L™¥±”¡…¹‘±•È¸	ÕÑÑ½¸ÍÑ¥±°¹…µ•ÌÍÕÁÁ½ÉÑ•™½Éµ…ÑÌì)½É¥¥¹…°‘¥ÍÁ…Ñ¡•ÈÉ•™ÕÍ•ÌÕ¹É•±…Ñ••áÑ•¹Í¥½¹Ì‰•™½É”É•…‘¥¹œ…¹½É¥¥¹…°9=4)Á…ÉÍ•ÈÙ…±¥‘…Ñ•ÌÍ¥¹…ÑÕÉ”½Í•Ñ¥½¹Ì½•½µ•ÑÉä…™Ñ•ÈÍ•±•Ñ¥½¸¸%µÁ½ÉÑ•È½½É”‰åÑ•Ì)…¹ÄÀÄÌ…¡”Á¥¹ÌÉ•Ñ…¥¹•°¥¹±Õ‘¥¹œ±¥µ¥ÑÌ…¹•½µ•ÑÉä½UXµ½¹±äÍ½Á”¸()Q¡¥ÌÑ…É•ÑÌ¹…Ñ¥Ù”ÑåÁ”™¥±Ñ•É¥¹œì•á…Ğ¥A…¥±•Ì½ÁÉ½Ù¥‘•È…ÕÍ”¹½ĞÁÉ½Ù•¸¸)!Q50MÑ…¹‘…É•áÁ±…¥¹Ì…•ÁĞ¥Ì„¹…Ñ¥Ù”Á¥­•È¡¥¹Ğ°ÕÍ¥¹œÁ±…Ñ™½É´ÑåÁ”Ñ…‰±•Ìè)¡ÑÑÁÌè¼½¡Ñµ°¹ÍÁ•Œ¹İ¡…Ñİœ¹½Éœ½µÕ±Ñ¥Á…”½¥¹ÁÕĞ¹¡Ñµ°…ÑÑÈµ¥¹ÁÕĞµ…•ÁĞ€¸!¥ÍÑ½É¥…°)]•‰-¥ĞÈÈäĞÔØ‘½Õµ•¹ÑÌÉ•å•µ½ÕĞ¥=L™¥±•Ìİ¥Ñ İ¥±‘…É™¥±Ñ•É¥¹œìÉ•Í½±Ù•‰Õœ)¥Ì¹½Ğ„‘¥…¹½Í¥Ì½˜ÕÉÉ•¹Ğ‘•Ù¥”¸9•Ù•ÈÍÕ‰ÍÑ¥ÑÕÑ”…•ÁĞôˆ¨¼¨ˆ¡•É”¸)¡ÑÑÁÌè¼½‰ÕÌ¹İ•‰­¥Ğ¹½Éœ½Í¡½İ}‰Õœ¹¤ı¥ôÈÈäĞÔØ€¸9…Ñ¥Ù”Á¥­•ÈÙ…±¥‘…Ñ¥½¸É•µ…¥¹Ì)Á•¹‘¥¹œì¹¼=4½9½‘”±…¥´Ñ¡…ĞM…™…É¤Ì…ÑÕ…°¡½½Í•È¡…Ì‰••¸É•Á…¥É•¸((ÈØ™½ÕÍ•¡•­ÌAMLè½É¥¥¹…°9=4‘•½‘•È½…ÑÕ…°‘¥ÍÁ…Ñ ½½‘•Œ½1½9=4Ñ•ÍÑÌ°)¥µÁ½ÉĞ½¹ÑÉ½±Ì°ÕÉÉ•¹ĞÉ•±•…Í”½…ÍÍ•ÑÌ½¥‘•¹Ñ¥Ñäì½¹”¹•ÜÕ…É…ÍÍ•ÉÑÌÑ¡”Í…µ”)Í¡•±°¡½½Í•È¥ÌÕ¹™¥±Ñ•É•…¹Õ¹É•±…Ñ•™¥±•Ì…É”É•™ÕÍ•‰•™½É”É•…‘Ì½…‘‘Ì¸)Må¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸M¡•±°µ½¹±ä™•…ÑÕÉ”™¥àì™Õ±°±½…°‰…Í•±¥¹”ÄÀÄÌ¡…ÈäàÌ)AML°¹½ĞÉ•ÉÕ¸™½ÈÕ¹¡…¹•‘•½‘•È½•½µ•ÑÉä¸!½ÍÑ•$É•ÍÕ±ĞÉ•½É‘•…ĞÁÉ½½˜¸)…¹½¹¥…°ÄÀÄĞÉ•±•…Í”½‰½½ÑÍÑÉ…À½½µÁ…É¥Í½¸€¬É•±•…Í”´ù™…”µ±…å½ÕĞ´ù‘É…İ•ÈÁ¥¹Ì)É•Ù¥•İ•ì½µÁ…É¥Í½¸µ¥É…Ñ•ÌÄÀÄÌİ¥Ñ É…Ñ¥¹Ì¥¹Ñ…Ğ°‘•™…Õ±ĞÕ¹¡…¹•¸)AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¹‰•Ñ…Ì°9=4¥µÁ½ÉÑ•È½•áÁ½ÉĞ½‘½¹½È°ÄÀÄÈ¥éµ¼­½µÁ…Ğ°(ÄÀÄÄ¹…Ù¥…Ñ¥½¸…¹ÄÀÄÀA…¥¹Ğ½Ñ¡É•”µ™¥¹•È½‘”É•µ…¥¸Õ¹¡…¹•¸()Y%ÄÀÄĞèÉ•™É•Í Ñ¼ÄÀÄĞì¥±”%µÁ½ÉĞ€´ø9=4Í¡½Õ±‰”Í•±•Ñ…‰±”°Ñ¡•¸½É¥¥¹…°)¹…Ñ¥Ù”•½µ•ÑÉä¥µÁ½ÉĞÍ¡½Õ±ÉÕ¸¸QÉä•á¥ÍÑ¥¹œ=	(½1½¹”¸%˜ÍÑ¥±°É•ä°É•Á½ÉĞ)İ¡•Ñ¡•È™¥±”¥Ì±½…°½¥±½Õ½…¹½Ñ¡•ÈÁÉ½Ù¥‘•Èì‘½¸Ğ¡…¹”‘•½‘¥¹œ‰…Í•½¸…¸)Õ¹½Á•¹•™¥±”¸	É½…‘•È¹…Ñ¥Ù”9=4•½µ•ÑÉä½UX…Ñ”…¹Á…¥¹Ğ½µ…Ñ•É¥…°ÍÑ…”É•µ…¥¸)…ÌÉ•½É‘•¥¸ÄÀÄÌ¸UÍ•ÈÌÁ½Í¥Ñ¥Ù”É¥¡ĞµÍ¥‘”½‰Í•ÉÙ…Ñ¥½¸É•Ñ…¥¹•¸)AÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”è‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÄĞ¹µ€¡Ù•É¥™¥…Ñ¥½¸™½±±½İÌ¤¸((¸ÄÀÄĞÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€Èä=Ñ½‰•È€ÈÀÈØè)IÕ¹Ñ¥µ”á„ÌÌÄĞÅŒäÔİ”ÀÔĞÈäÑ„å„ÀàÄĞÄÈÔİÙŒÄÅÌå„ìÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”)”İÄàÀÔÙŒäåàÅŒÁ˜ÀØÄá„Õ˜ÜÀØÜÑ…àäÄÀÅÌÄ¸±°ÄÈ‰±½‰Ì¡…Í µÙ•É¥™¥•‰•™½É”…Ñ½µ¥Œ)¹½¸µ™½É••áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”ì™•Ñ¡•µ…¥¸ÑÉ•”•á…Ñ±äµ…Ñ¡•Ì±½…°¡•­½ÕĞ¸)A…•ÌĞÀàÈÜäÀØÄØà½µÁ±•Ñ•MUML¸ÄÀ¼ÄÀ…¡”µ‰ÕÍÑ•±¥Ù”™¥±•Ìµ…Ñ °¥¹±Õ‘¥¹œ)Õ¹™¥±Ñ•É•Í¡•±°°É•±•…Í”µ±½…‘•È¡…¥¸…¹Õ¹¡…¹•¥µÁ½ÉÑ•È½‘•½‘•È½5Õ±Ñ¤Ä¸À¸(ÈØ™½ÕÍ•¡•­ÌAML±Íå¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸Õ±°±½…°ÄÀÄÌ‰…Í•±¥¹”ÈäàÌAML)É•Ñ…¥¹•ì¹¼™É•Í ™Õ±°±½…°ÉÕ¸™½ÈÍ¡•±°µ½¹±ä¡…¹”¸!½ÍÑ•ĞÀàÈÜäÀÜÔÔÄÍÑ¥±°)¥¹}ÁÉ½É•ÍÌ…ĞÁÉ½½˜±¹½Ğ±…¥µ•AML¸€¸ÄÀÄĞ1%Y½Id™½È¹…Ñ¥Ù”¡½½Í•ÈÉ•Ñ•ÍĞì)…ÑÕ…°¥A…¥±•ÌÍ•±•Ñ…‰¥±¥Ñä…¹ÍÕ‰Í•ÅÕ•¹Ğ9=4¥µÁ½ÉĞÉ•µ…¥¸Á•¹‘¥¹œ¸((ŒŒ€¸ÄÀÄĞÕÍ•ÈAML€¼¹•áĞÉ•½µµ•¹‘…Ñ¥½¸ƒŠP€Èä=Ñ½‰•È€ÈÀÈØ()ÕÉÉ•¹Ğè€¸ÄÀÄĞ1%Y…¹UMHAQ¸UÍ•È•áÁ±¥¥Ñ±äèƒŠqAIP€ÄÀÄĞAMOŠt¸)AÉ½Ñ•ĞÑ¡”Õ¹™¥±Ñ•É•¹…Ñ¥Ù”µ•Í ¡½½Í•È…¹…•ÁÑ•9=4Í•±•Ñ¥½¸½¥µÁ½ÉĞ™±½Üì)‘¼¹½ĞÉ•¥¹ÍÑ…Ñ”…•ÁĞ™¥±Ñ•É¥¹œ°İ¥±‘…É5%5İ½É­…É½Õ¹‘Ì½È‘ÕÁ±¥…Ñ”Á¥­•ÉÌ¸)Q¡¥ÌÍÕÁ•ÉÍ•‘•Ì•…É±¥•È€¸ÄÀÄĞÁ•¹‘¥¹œµÁ¥­•È¹½Ñ•Ì‰•±½Ü¸%Ğ‘½•Ì¹½Ğ…‘Á…¥¹Ğ°)µ…Ñ•É¥…±Ì½È•‘¥Ñ…‰±”±…å•ÉÌÑ¼Ñ¡”•½µ•ÑÉä½UXµ½¹±ä¥µÁ±•µ•¹Ñ…Ñ¥½¸¸)IÕ¹Ñ¥µ”á„ÌÌÄĞÅŒ°ÁÕ‰±¥…Ñ¥½¸‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÄĞ¹µ¸!½ÍÑ•™Õ±°É•É•ÍÍ¥½¸(ĞÀàÈÜäÀÜÔÔÄ¹½Ü½µÁ±•Ñ•MUMLìA…•ÌĞÀàÈÜäÀØÄØàMUML€¡É•¡•­•¤¸)UÍ•ÈÌÁ½Í¥Ñ¥Ù”É¥¡ĞµÍ¥‘”µÍÉ••¸½‰Í•ÉÙ…Ñ¥½¸É•µ…¥¹ÌÉ•½É‘•ì¹¼¹•Ü½‰…Ñ ¸()UÍ•È…Í­ÌƒŠq]¡…ÑÌ¹•áĞÿŠtìÑ¡¥Ì¥Ì„É½…‘µ…À‘¥ÍÕÍÍ¥½¸°¹½Ğ„¹•Ü™•…ÑÕÉ”‰Õ¥±¸)I•½µµ•¹‘•¹•áĞ¹…ÉÉ½Ü…¹‘¥‘…Ñ”è¹…Ñ¥Ù”9=4Á…¥¹Ñ•µ½±½ÕÈÁÉ•Í•ÉÙ…Ñ¥½¸°Í¼Ñ¡”)¥µÁ½ÉÑ•µ•Í …¸É•Ñ…¥¸9½µ……ÁÁ•…É…¹”¸Õ‘¥Ğ•á¥ÍÑ¥¹œÙ•ÉÑ•àµ½±½ÕÈÁÉ•Ù¥•Ü°)ÁÉ½©•Ğ½‘•Œ…¹1½9=4•áÁ½ÉĞ½İ¹•ÉÌÁ±ÕÌÍ½ÕÉ”µ±…å•È½µÁ½Í¥Ñ¥¹œ™¥ÉÍĞì‘•™¥¹”)‰½Õ¹‘•ÍÕÁÁ½ÉÑ•¡…¹¹•±Ì‰•™½É”¥µÁ±•µ•¹Ñ…Ñ¥½¸¸I•ÕÍ”•á¥ÍÑ¥¹œÉ•Í½ÕÉ”½•½µ•ÑÉä)½İ¹•ÉÌ°¹¼‘ÕÁ±¥…Ñ”É•¹‘•É•È½ÈÁ…¥¹Ğ­•É¹•°¸MÕ‰Í•ÅÕ•¹ĞÍÑ…•ÌèÉ½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌ°)Ñ¡•¸•µ‰•‘‘•¥µ…”Ñ•áÑÕÉ•Ì…¹É¥¡•È±…å•È½É•Á•…ĞÍÕÁÁ½ÉĞ¸Q¡½Í”…É”ÁÉ½Á½Í…±Ì°)¹½Ğ™•…ÑÕÉ•ÌÍ¡¥ÁÁ•½È…ÕÑ½µ…Ñ¥Œ½µµ¥Ñµ•¹ÑÌ¸€¸ÄÀÄÄ•ÍÑÕÉ”¼¸ÄÀÄÈ¥éµ¼½½µÁ…Ğ)¥¹‘¥Ù¥‘Õ…°™••°¡…Ì¹¼Í•Á…É…Ñ”•áÁ±¥¥ĞÉ…‘¥¹œ‰•å½¹ÍÕÁÁ±¥•‰Õ¥±™••‘‰…¬¸)9¼ÉÕ¹Ñ¥µ”½‘”°É•±•…Í”Ù•ÉÍ¥½¸°…¡”Á¥¹Ì½È¹•Ü‰Õ¥±¡…¹•¥¸Ñ¡¥ÌÍ•ÍÍ¥½¸¸)9¼¹•Üµ…¹‘…Ñ½Éä‘•Ù¥”Ñ•ÍĞ¸=ÁÑ¥½¹…°½¹™¥‘•¹”¡•¬è¥µÁ½ÉÑ•9=4€´øM…Ù”½=Á•¸(¹‰½á±…ˆ…¹µ…ÁÁ•UX‘¥Ñ½ÈìÑ¡¥Ì¥Ì•á¥ÍÑ¥¹œ€¸ÄÀÄÌ•½µ•ÑÉä½UXÍ½Á”°¹½Ğ½±½ÕÈ¸((ŒŒQ•áÑÕÉ”½A	HÁÉ¥½É¥Ñä…¹É•Ñ…¥¹•µµ…ÀÁÉ½Á½Í…°ƒŠP€Èä=Ñ½‰•È€ÈÀÈØ()ÕÉÉ•¹ĞÉÕ¹Ñ¥µ”É•µ…¥¹Ì€¸ÄÀÄĞ1%Y€¼UMHAML¸UÍ•È•áÁ±¥¥Ñ±ä½ÉÉ•ÑÌ•…É±¥•È)Ù•ÉÑ•àµÁ…¥¹ĞÉ•½µµ•¹‘…Ñ¥½¸è±½ÜµÁ½±ä	½á1…ˆ¹••‘ÌUYÌ°•µ‰•‘‘•Ñ•áÑÕÉ•Ì…¹A	Hì)Ù•ÉÑ•à½±½ÕÉÌ…É”Í•½¹‘…Éä½‘•™•ÉÉ•Õ¹Ñ¥°µ•Í ‘•¹Í¥Ñä‰•½µ•ÌÁÉ…Ñ¥…°¸Q¡¥Ì)ÍÕÁ•ÉÍ•‘•ÌÑ¡”Á…¥¹Ñ•µÙ•ÉÑ•àµ½±½ÕÈ¹•áĞµ‰Õ¥±ÁÉ½Á½Í…°‰•±½Ü¸9¼¹•Ü‰Õ¥±…Í­•)™½È½È¥µÁ±•µ•¹Ñ•‘ÕÉ¥¹œÑ¡¥ÌÍÑÉ…Ñ•ä‘¥ÍÕÍÍ¥½¸¸()UÍ•È…Í­Ìİ¡•Ñ¡•È½Á…¥Ñä½‘¥ÍÁ±…•µ•¹Ğ½•µ¥ÍÍ¥Ù”…¸‰”É•Ñ…¥¹•İ¥Ñ¡½ÕĞ‘¥ÍÁ±…ä°)½ÈÍ¡½Õ±‰”¥µÁ±•µ•¹Ñ•¸I•½µµ•¹‘…Ñ¥½¸€¡ÁÉ½Á½Í…°°¹½ĞÍ¡¥ÁÁ•¤èÁÉ•Í•ÉÙ”…±°)¹…Ñ¥Ù”9=4µ…ÀÍ±½ÑÌ™¥ÉÍĞ…Ì…¸•¹½‘•µ…Ñ•É¥…°É•Í½ÕÉ”‰Õ¹‘±”°¥¹‘•Á•¹‘•¹Ñ±ä)½˜É•¹‘•É•ÈÍÕÁÁ½ÉĞ¸I•Ñ…¥¸½É¥¥¹…°•¹½‘•‰åÑ•Ì½‰¥Ğ‘•ÁÑ °Í±½Ğ½¥µ…”½µ…Ñ•É¥…°)…ÍÍ½¥…Ñ¥½¹Ì°UXÍ•Ğ½ÑÉ…¹Í™½ÉµÌ½Í…µÁ±¥¹œ½¡…¹¹•°Á…­¥¹œ°½±½ÕÈµÍÁ…”Í•µ…¹Ñ¥Ì°)™…Ñ½ÉÌ…¹‘¥ÍÁ±…•µ•¹ĞÍÑÉ•¹Ñ ½µ¥‘Á½¥¹Ğ½İ½É±½ÁÉ½©•Ñ¥½¸Í•ÑÑ¥¹Ì¸-••À½É¥¥¹…°)¥µÁ½ÉĞÍ…±”½Õ¹¥ĞÍ•µ…¹Ñ¥Ìì‘¼¹½ĞÍ¥±•¹Ñ±ä…ÁÁ±äİ½É±‘¥ÍÁ±…•µ•¹ĞÙ…±Õ•ÌÑ¼„)É•Í…±•µ•Í ¸I•ÕÍ”•á¥ÍÑ¥¹œÉ•Í½ÕÉ”Á½½±Ì½½‘•Ì½•áÁ½ÉĞ½İ¹•ÉÌİ¥Ñ ÑÉÕÑ¡™Õ°)¹…Ñ¥Ù”9=4ÁÉ½Ù•¹…¹”ì¹¼™…­”1ÁÉ½Ù•¹…¹”½ÈÍ•½¹µ…Ñ•É¥…°½Á…¥¹Ğ­•É¹•°¸()A…ÍÌµÑ¡É½Õ …•ÁÑ…¹”…Ñ”è9=4¥µÁ½ÉĞ€´ø€¹‰½á±…ˆM…Ù”½=Á•¸€´ø9=4•áÁ½ÉĞÉ•Ñ…¥¹Ì)µ…À‰åÑ”¡…Í¡•Ì°…ÍÍ¥¹µ•¹ÑÌ…¹Í•ÑÑ¥¹Ìİ¡•¸ÍÕÁÁ½ÉÑ•Í½ÕÉ”µ…ÁÁ¥¹œ¥ÌÕ¹¡…¹•¸)UX½Ñ½Á½±½ä•‘¥ÑÌµÕÍĞÑÉ…¬½µÁ…Ñ¥‰¥±¥Ñä…¹±•…É±ä™±…œ¥¹Ù…±¥‰¥¹‘¥¹Ìì¹¼)Í¥±•¹ĞÉ•Í½ÕÉ”‘•±•Ñ¥½¸°É”µ•¹½‘¥¹œ½É•Í¥é¥¹œ½È™…±Í”ÁÉ•Ù¥•Ü½É½Õ¹µÑÉ¥À±…¥µÌ¸)5•µ½Éä‰Õ‘•ÑÌÍÑ¥±°…ÁÁ±äìÉ•Ñ…¥¸Õ¹ÕÍ•µ…ÁÌ•¹½‘•°…Ù½¥•…•ÈAT‘•½‘”¸)M±½ÑÌ…¸Í¡½Ü…Ù…¥±…‰±”ÁÉ•Ù¥•ÜÙ•ÉÍÕÌÉ•Ñ…¥¹•µ™½Èµ•áÁ½ÉĞÍÑ…ÑÕÌ¸()Õ‘¥ĞèÁÉ½©•Ğµ±ˆµÉ•Í½ÕÉ•Ì…±É•…‘äÁ½½±Ì½ÁÉ•Í•ÉÙ•Ì¥µÁ½ÉÑ•1‰åÑ•Ì€¬µ…Ñ•É¥…°))M=8ì¹½µ…µ•áÁ½ÉĞµ½É”½¹…Ñ¥Ù•5…Ñ•É¥…±5…ÁÌ…¹¹½µ…µ‘¥ÍÁ±…•µ•¹Ğµµ…À…±É•…‘ä•áÁ½ÉĞ)ÍÕÁÁ½ÉÑ•1µ‘•É¥Ù••µ¥ÍÍ¥Ù”½‘¥ÍÁ±…•µ•¹Ğ‘…Ñ„¸9…Ñ¥Ù”9=4¥µÁ½ÉĞÍÑ¥±°•áÁ±¥¥Ñ±ä)¥¹½É•ÌÁ…¥¹Ğ½µ…Ñ•É¥…°½¥µ…”É•Í½ÕÉ•Ì¸á¥ÍÑ¥¹œÍÕÉ™…”ÁÉ•Ù¥•Ü…•ÁÑÌ½Á…ÅÕ”)µ…Ñ•É¥…±Ì…¹ÕÉÉ•¹Ñ±äÕÍ•Ì„½±½ÕÈ5•Í¡	…Í¥5…Ñ•É¥…°½Ù•É±…ä¸Q¡•É•™½É”ÕÉÉ•¹Ğ)	½á1…ˆ¥Ì¹½Ğ„½µÁ±•Ñ”¹…Ñ¥Ù”9=4A	HÙ¥•İ•ÈìÉ•½¹¹•Ğ½•áÑ•¹½É¥¥¹…°½İ¹•ÉÌ¸)á¥ÍÑ¥¹œ¹…Ñ¥Ù”•áÁ½ÉĞ¡…ÌÍÑÉ¥ĞÍ½ÕÉ”½ÁÉ½©•Ñ¥½¸½Í…µÁ±•È½µ…Ñ•É¥…°±¥µ¥ÑÌ°Í¼É…Ü)É•Ñ•¹Ñ¥½¸…¹½ÉÉ•ÍÁ½¹‘¥¹œ¹…Ñ¥Ù”9=4•áÁ½ÉĞÍÕÁÁ½ÉĞ¹•••áÁ±¥¥ĞÑ•ÍÑÌ™¥ÉÍĞ¸()I•¹‘•É¥¹œÉ•½µµ•¹‘…Ñ¥½¸…™Ñ•ÈÉ•Ñ•¹Ñ¥½¸è‰…Í”½±½ÕÈ€¬¹½Éµ…°½É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌì)•µ¥ÍÍ¥Ù”ÁÉ•Ù¥•Ü•…É±ä€¡Í•±˜µ±¥Ğ…ÁÁ•…É…¹”°¹½Ğ…ÕÑ½µ…Ñ¥ŒÍ•¹”±¥¡Ñ¥¹œ½‰±½½´¤°)½Á…¥Ñä¹•áĞ€¡ÕÑ½ÕĞÑ¡•¸‰±•¹‘¥¹œ½Í½ÉÑ¥¹œ½Á¥­¥¹œ½Í¡…‘½İÌ¤°‘¥ÍÁ±…•µ•¹ĞÉ•Ñ…¥¹•)½¹±ä¥¹¥Ñ¥…±±ä¸¥ÍÁ±…•µ•¹Ğµ½Ù•Ì•á¥ÍÑ¥¹œÙ•ÉÑ¥•Ìì‘•Ñ…¥±•É•ÍÕ±ÑÌ¹•••¹½Õ )Ù•ÉÑ¥•Ì°¹½Ğµ…¹‘…Ñ½Éä…ÕÑ½µ…Ñ¥ŒÍÕ‰‘¥Ù¥Í¥½¸¸1…Ñ•È½ÁÑ¥½¹…°‰½Õ¹‘•É•¹‘•Èµ½¹±ä)ÍÕ‰‘¥Ù¥Í¥½¸½‘¥ÍÁ±…•µ•¹ĞµÕÍĞÁÉ•Í•ÉÙ”•‘¥Ñ…‰±”	…Í”…¹Á…ÍÌ‘•Ù¥”µ•µ½Éä½ÍÁ••)‰•¹¡µ…É­Ì¸9¼‘•¹Í”ÁÉ•Ù¥•Ü½ÈÁ•É™½Éµ…¹”‰•¹•™¥Ğ¥µÁ±¥•¥¸ÕÉÉ•¹Ğ‰Õ¥±¸)AÉ¥µ…ÉäÉ•¹‘•É•ÈÉ•™•É•¹”è¡ÑÑÁÌè¼½Ñ¡É••©Ì¹½Éœ½‘½Ì½Á…•Ì½5•Í¡MÑ…¹‘…É‘5…Ñ•É¥…°¹¡Ñµ°€¸()9•áĞ¹…ÉÉ½Ü…¹‘¥‘…Ñ”¥Ì¹…Ñ¥Ù”9=4Ñ•áÑÕÉ”½µ…Ñ•É¥…°É•Ñ•¹Ñ¥½¸…¹É½Õ¹µÑÉ¥À)Ù…±¥‘…Ñ¥½¸ìÍ½Á”ÁÉ•Ù¥•Ü…‘‘¥Ñ¥½¹ÌÍ•Á…É…Ñ•±ä…Ì…Õ‘¥ĞÁ•Éµ¥ÑÌ¸Q¡¥Ì¥Ì„É•½É‘•)É•½µµ•¹‘…Ñ¥½¸°¹½Ğ¥µÁ±•µ•¹Ñ…Ñ¥½¸…ÕÑ¡½É¥é…Ñ¥½¸™½È„¹•Ü™•…ÑÕÉ”‰Õ¥±¸9¼)ÉÕ¹Ñ¥µ”½É•±•…Í”½…¡”¡…¹•Ì…¹¹¼¹•Ü¡…¹‘Ìµ½¸Ñ•ÍÑÌÑ¡¥ÌÍ•ÍÍ¥½¸¸((ŒŒ€¸ÄÀÄÔƒŠP¹…Ñ¥Ù”9=4…™™¥¹”µÉ½ÜÉ½Õ¹‘¥¹œÉ•Á…¥ÈƒŠP€Èä=Ñ½‰•È€ÈÀÈØ()MÑ…ÑÕÌèÄÀÄÔ1%Y€¼Id™½ÈÑ•ÍÑ¥¹œìÉÕ¹Ñ¥µ”ØÔÄÅ„Ìà¸	…Í•±¥¹”µ…¥¸Á„ÍŒÉ˜ä°±¥Ù”ÄÀÄĞ)ÉÕ¹Ñ¥µ”á„ÌÌÄĞÅŒ€¼UMHAMLÉ•Ñ…¥¹•¸UÍ•ÈÉ•Á½ÉÑÌƒŠq9=4Q•àè¥¹Ù…±¥…™™¥¹”)ÑÉ…¹Í™½É·Št…¹ÍÕÁÁ±¥•Ì5@QMP¹¹½´¸I•ÁÉ½‘Õ•½¸…ÑÕ…°™¥±”…ĞQ•áĞ¹½‘”è)™±½…ĞÌÈµ…ÑÉ¥álÄÕtôÀ¸ääääääÜØÄÔàÄĞÈÀä€ È™±½…ĞÌÈU1AÌ‰•±½ÜÄ¤ì•á…Ğ…™™¥¹”µÑ…¥°)Ù…±¥‘…Ñ¥½¸¥¹½ÉÉ•Ñ±äÉ•™ÕÍ•Ñ¡¥ÌÍ…Ù•Á½±å½¸•½µ•ÑÉä¸9¼Ñ•áÑÕÉ”µµ…À…ÕÍ”¸()=É¥¥¹…°¹½µ…µ¥µÁ½ÉĞµ½É”É•µ…¥¹ÌÍ½±”Á…ÉÍ•È½•½µ•ÑÉä½İ¹•È¸•ÁĞ=91d…‰Í½±ÕÑ”(Å”´Ø‘•Ù¥…Ñ¥½¹Ì™É½´lÀ°À°À°Åt…Ğ½±Õµ¸µµ…©½È¥¹‘¥•ÌÌ¼Ü¼ÄÄ¼ÄÔì…¹½¹¥…±¥é”½Á¥•)5…ÑÉ¥àĞÉ½Ü	=IÁ…É•¹Ğ½µÁ½Í¥Ñ¥½¸¸UÁÁ•ÈÍàÌ…¹ÑÉ…¹Í±…Ñ¥½¸Õ¹¡…¹•ìÍ½ÕÉ”))M=8½‰åÑ•Ì¹•Ù•ÈµÕÑ…Ñ•¸	½Õ¹¥Ì¥¹‘•Á•¹‘•¹Ğ½˜±…É”ÑÉ…¹Í±…Ñ¥½¸½Í…±”¸¥¹¥Ñ”(ÄØµ•±•µ•¹Ğ½ÑåÁ”°Í¥¹Õ±…É¥Ñä°±¥µ¥ÑÌ°UX½¥¹‘•à½¡¥•É…É¡ä…¹…Ñ½µ¥ŒÁ…ÉÍ”µ‰•™½É”µ…‘)¡•­ÌÉ•Ñ…¥¹•¸1…É•ÈÁ•ÉÍÁ•Ñ¥Ù”½¹½¸µ…™™¥¹”‘É¥™Ğ°é•É¼Ü°¥¹Ù…±¥Ù…±Õ•Ì…¹)Í¥¹Õ±…ÈÑÉ…¹Í™½ÉµÌÍÑ¥±°É•™ÕÍ”¸9¼•¹•É¥ŒÑÉ…¹Í™½É´½ÉÉ…ä½•½µ•ÑÉäµ½İ¹•È¡…¹”¸()ÑÕ…°Í½ÕÉ”¹½Ü‘•½‘•ÌÕ‰”ĞäÙØ¼ÔÀÑ˜…¹Q•áĞÜäÄÅØ¼ÜäÄÙ˜°	=Q İ¥Ñ UYÌ¸á¥ÍÑ¥¹œ(¹‰½á±…ˆM…Ù”½=Á•¸€´ø9=4•áÁ½ÉĞ€´øÉ•¥µÁ½ÉĞÉ•Ñ…¥¹ÌÑ¡•¥È½Õ¹ÑÌ½UXÁÉ•Í•¹”ìÍ½ÕÉ”)‰åÑ•ÌÕ¹¡…¹•¸M•¹”±¥¡ÑÌ½…µ•É…Ì½µ¥ÑÑ•…¹ÍÕ±ÁĞµ±…å•È™±…ÑÑ•¸İ…É¹¥¹œÉ•µ…¥¸¸)A…¥¹Ğ½µ…Ñ•É¥…±Ì½Ñ•áÑÕÉ•Ì½µ…Í­ÌÉ•µ…¥¸Õ¹ÍÕÁÁ½ÉÑ•‰ä¹…Ñ¥Ù”¥µÁ½ÉĞìÑ¡¥Ì‰Õ¥±‘½•Ì)9=P¥µÁ±•µ•¹ĞÑ¡”É•Ñ…¥¹•µµ…ÀÁÉ½Á½Í…°¸UÍ•È…ÉÑİ½É¬¹½Ğ½Á¥•¥¹Ñ¼É•Á½Í¥Ñ½Éäì)É•É•ÍÍ¥½¸ÕÍ•Ì½¹±ä•á…Ğ™…¥±¥¹œµ…ÑÉ¥àİ¥Ñ ¥¹‘•Á•¹‘•¹ĞÕÁÍÑÉ•…´•½µ•ÑÉä™¥áÑÕÉ”¸()Qİ¼¹•Ü…ÑÕ…°Á…ÉÍ•È½‘¥ÍÁ…Ñ¡•ÈÑ•ÍÑÌ½Ù•ÈÍ…µÁ±”ÑÉ…¹Í™½É´½µ¥ÉÉ½È½Í½ÕÉ”½UX°)Á½Í¥Ñ¥Ù”½¹•…Ñ¥Ù”É½Ü‘É¥™Ğ…ĞÁ…É•¹Ğ­¡¥±°…¹½¹¥…°Á±…•µ•¹Ğ…¹É•™ÕÍ…°½˜)Á•ÉÍÁ•Ñ¥Ù”½¥¹Ù…±¥½Í¥¹Õ±…ÈÉ½İÌ€¡¥¹±Õ‘¥¹œ¡Õ”ÑÉ…¹Í±…Ñ¥½¸¤¸€ÈÌ™½ÕÍ•¡•­Ì)AMLì™Õ±°±½…°9½‘”ÈĞ¸ÈÈ¸ÄÉ•É•ÍÍ¥½¸ÈäàØAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÄÌ¸ĞÉÌ¤¸)Må¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸9…Ñ¥Ù”¥A…‘•Ù¥”…•ÁÑ…¹”Á•¹‘¥¹œ¸)I•Ù¥•İ•ÄÀÄÔÍ¡•±°½‰½½ÑÍÑÉ…À½É•±•…Í”½½µÁ…É¥Í½¸°¥µÁ½ÉĞ´ù‘•½‘•È…¹…¹½¹¥…°)É•±•…Í”´ù™…”µ±…å½ÕĞ´ù‘É…İ•È…¡”±½ÍÕÉ”¸á¥ÍÑ¥¹œ½µÁ…É¥Í½¸É…Ñ¥¹Ìµ¥É…Ñ”ÄÀÄĞì)‘•™…Õ±Ğ½¹¼É•Á•…Ğ½…Ñ”¸AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¸	•Ñ„ËŠLÜ°ÄÀÄĞÕ¹™¥±Ñ•É•Á¥­•È°(ÄÀÄÈ¥éµ¼½½µÁ…Ğ°ÄÀÄÄ¹…Ù¥…Ñ¥½¸°ÄÀÄÀA…¥¹Ğ½•ÍÑÕÉ•Ì°É•Í½ÕÉ”½•áÁ½ÉĞ½İ¹•ÉÌÕ¹¡…¹•¸()Y%ÄÀÄÔèÉ•™É•Í Ñ¼ÄÀÄÔì¥µÁ½ÉĞ½É¥¥¹…°5@QMP¹¹½´°¥¹ÍÁ•ĞÕ‰”½Q•áĞÉ•±…Ñ¥Ù”)Á±…•µ•¹Ğ…¹UX‘¥Ñ½È¸U¹‘¼½I•‘¼¥µÁ½ÉĞìM…Ù”½=Á•¸€¹‰½á±…ˆ…¹9=4•½µ•ÑÉä½UX•áÁ½ÉĞ¸)UÍ•È±…É¥™¥•ÌQ•áĞ¥Ì„±¥Ù”°¹½¸µÙ…±¥‘…Ñ•9½µ…Ñ•áĞ½‰©•ĞìÍ…Ù•Á½±å½¸)Í¡…Á”¥µÁ½ÉÑÌ°¹½Ğ•‘¥Ñ…‰±”9½µ…Ñ•áĞÍ•µ…¹Ñ¥Ì¸Y…±¥‘…Ñ¥½¸µ…äÉ•İÉ¥Ñ”¥ÑÌµ…ÑÉ¥à)‰ÕĞÑ¡…Ğİ½É­…É½Õ¹¥ÌÕ¹Ñ•ÍÑ•…¹¥Ì¹½ĞÉ•ÅÕ¥É•‰äÑ¡¥Ì‰½Õ¹‘•É•Á…¥È¸)9¼Ñ•áÑÕÉ”½A	HÑÉ…¹Í™•ÈÁÉ½µ¥Í”¸9•áĞ™½±±½Ü¹…Ñ¥Ù”¥µÁ½ÉĞ™••‘‰…¬°Ñ¡•¸Í•Á…É…Ñ•±ä)Í½Á”¹…Ñ¥Ù”9=4É•Ñ…¥¹•µµ…ÀÉ•Í½ÕÉ•Ì½É½Õ¹µÑÉ¥À¸M•”‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÄÔ¹µ¸((¸ÄÀÄÔÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€Èä=Ñ½‰•È€ÈÀÈØè)IÕ¹Ñ¥µ”ØÔÄÅ„ÌàÈäİ™ˆİˆÕ”å˜É‰˜ÔÅ˜ÀÈå‘™™”Í”Ù™ˆÉìÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”)ˆØÁŒÑŒÙ…”Á˜ØÜÍ”ÈÅ˜äÈÜÅ„Ñ‘˜Ğİİ‰İ‘˜ĞÉ˜À•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•½É¥¥¸½µ…¥¸¸)±°ÄĞ‰±½‰ÌÙ•É¥™¥•‰•™½É”…Ñ½µ¥Œ¹½¸µ™½É••áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”¸A…•ÌĞÀàØäØÄÜàäà)½µÁ±•Ñ•MUMLì…±°ÄÀ™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•¡•­½ÕĞ€¡Í¡•±°±µ…¹¥™•ÍĞ°)¥µÁ½ÉÑ•È±‘•½‘•È±É•±•…Í”±½…‘•È¡…¥¸±½µÁ…É¥Í½¸…¹ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À¤¸Õ±°±½…°)9½‘”ÈĞ¸ÈÈ¸ÄèÈäàØAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÄÌ¸ĞÉÌ¤°ÈÌ™½ÕÍ•¡•­ÌAML°)Íå¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸!½ÍÑ•ĞÀàØäØÄàÜĞàÍÑ¥±°¥¹}ÁÉ½É•ÍÌ…ĞÁÉ½½˜ì¹½Ğ±…¥µ•AML¸)	Õ¥±ÄÀÄÔ1%Y€¼Id™½È¹…Ñ¥Ù”¥µÁ½ÉĞÉ•Ñ•ÍĞì‘•Ù¥”…•ÁÑ…¹”Á•¹‘¥¹œ¸()M•½¹ÕÍ•ÈÕÁ±½…5@QMP Ä¤¹¹½´€ È°àÀÔ°àÔÉ‰åÑ•Ì¤½¹Ñ…¥¹Ì=91dÕ‰”ĞäÙØ¼ÔÀÑ˜İ¥Ñ )UYÌìQ•áĞ¥Ì…‰Í•¹Ğ¸%Ğ¥µÁ½ÉÑÌ½¸‰½Ñ ÁÉ”µ™¥àÄÀÄĞ…¹Á…Ñ¡•ÄÀÄÔ¸=É¥¥¹…°™¥ÉÍĞ)5@QMP¹¹½´€ Ì°ÈÜÄ°ÀÄÉ‰åÑ•Ì¤¥¹±Õ‘•Ì±¥Ù”Q•áĞÜäÄÅØ¼ÜäÄÙ˜İ¥Ñ É½Õ¹‘•…™™¥¹”Üè)ÁÉ”µ™¥àÉ•™ÕÍ•Ì°Á…Ñ¡•¥µÁ½ÉÑÌ	=Q ½‰©•ÑÌ¸Q¡¥Ì½µÁ…É¥Í½¸½¹™¥ÉµÌÑ¡”™…¥±¥¹œ)Í…Ù•Q•áĞÑÉ…¹Í™½É´°¹½ĞÁÉ½½˜Ñ¡…ĞÙ…±¥‘…Ñ¥¹œÑ•áĞÉ•İÉ¥Ñ•Ì½™¥á•Ì¥ÑÌµ…ÑÉ¥à¸)9¼•‘¥Ñ…‰±”¹…Ñ¥Ù”µÑ•áĞÍ•µ…¹Ñ¥Ì½ÈÑ•áÑÕÉ”½µ…Ñ•É¥…°ÁÉ•Í•ÉÙ…Ñ¥½¸…‘‘•¸UÍ•È™¥±•Ì)É•µ…¥¸Õ¹¡…¹•…¹…É”¹½Ğ½µµ¥ÑÑ•¥¹Ñ¼É•Á½Í¥Ñ½Éä¸9…Ñ¥Ù”Ñ•áÑÕÉ”½A	HÉ•Ñ•¹Ñ¥½¸)¥ÌÍÑ¥±°Ñ¡”Í•Á…É…Ñ”¹•áĞÁÉ½Á½Í…°¸Y%ÄÀÄÔ½É¥¥¹…°™¥ÉÍĞ™¥±”¥Ìµ•…¹¥¹™Õ°)É•É•ÍÍ¥½¸Ñ•ÍĞìÍ•½¹Õ‰”µ½¹±ä½Áä¥ÌÕÍ•™Õ°•½µ•ÑÉä½UXÍ…¹¥Ñä¡•¬¸((ŒŒ€¸ÄÀÄØƒŠP¥éµ¼‘¥É•Ñ¥½¸…¹½µÁ½¹•¹ĞµÑ½Õ É•Á…¥ÈƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()MÑ…ÑÕÌèÄÀÄØ1%Y€¼Id™½ÈÑ•ÍÑ¥¹œìÉÕ¹Ñ¥µ”ÈÕ•˜àÔÜ¸	…Í•±¥¹”µ…¥¸äİ„ÈäÑÀ½ÉÕ¹Ñ¥µ”(ØÔÄÅ„Ìà€ ¸ÄÀÄÔ¤¸UÍ•ÈÉ•Á½ÉÑÌ½ÁÁ½Í¥Ñ”=‰©•ĞÉ½Ñ…Ñ¥½¸½Í…±”…¹½µÁ½¹•¹Ğ¥éµ½Ì)¹½Ğ…Ñ¥¹œ¸9¼ÄÀÄÔ¹…Ñ¥Ù”AML¥¹™•ÉÉ•ìÄÀÄĞ…•ÁÑ…¹”…¹ÄÀÄÔ9=4…™™¥¹”™¥àÉ•Ñ…¥¹•¸()Õ‘¥Ñ•½É¥¥¹…°Q½Ñ…°¥éµ¼½¹!…¹‘±•½İ¸€´øÑÉ…¹Í™½É´µÕÁÉ…‘”Í•µ…¹Ñ¥Œ½İ¹•È…¹)=‰©•Ğ½5Õ±Ñ¤™…±±‰…¬€´ø½É¥¥¹…°½‰©•Ğµ½É¥¥¸¸½¹™¥Éµ•½µÁ½¹•¹ĞÑ½Õ É•™ÕÍ•)…ĞÍ•µ…¹Ñ¥Œ‰•¥¸ì=‰©•Ğ™…±±Ì‰…¬Ñ¼Íå¹Ñ¡•Ñ¥ŒÁ•¸°½µÁ½¹•¹Ğ¥¹Ñ•¹Ñ¥½¹…±±ä‰±½­Ì)…¹Ù…ÌÉ•Á±…ä¸I•µ½Ù”Ñ½Õ É•©•Ñ¥½¸=91d™É½´•áÁ±¥¥ĞÍ•µ…¹Ñ¥Œ‰•¥¸ì…ÑÕ…°…¹Ù…Ì)Ñ½Õ …Ñ”½=É‰¥Ğ½İ¹•ÈÉ•µ…¥¹Ì¸A•¹¥°½µ½ÕÍ”Á…Ñ É•Ñ…¥¹•ì¹¼¹•ÜÁ½¥¹Ñ•È±¥ÍÑ•¹•È¸()áÁ±¥¥Ğ¥éµ¼½¹ÍÑÉ…¥¹ÑÌ¹½Ü½ÕÑÉ…¹¬á¥ÌM¹…À¥¸	=Q •á¥ÍÑ¥¹œÑÉ…¹Í™½É´½İ¹•ÉÌì)½¹±äÕÑ¼½ÁÑÌ¥¹Ñ¼¥¹™•É•¹”¸AÉ•Ù¥½ÕÍ±äá¥ÌM¹…À½Õ±É•Á±…”aeh½ÈÕ¹¥™½É´½™É•”)İ¥Ñ …¸Õ¹É•±…Ñ•‘É…œµ¥¹™•ÉÉ•…á¥Ì¸aeh¥éµ¼É½Ñ…Ñ¥½¸½ÉÉ•ÑÌÍÉ••¸İ¥¹‘¥¹œ‰ä)…á¥Ì‘½Ğ…µ•É„Ù¥•Ü‘¥É•Ñ¥½¸ì½ÁÁ½Í¥Ñ”…µ•É„Í¥‘”½¥¹Ù•ÉÑ•Ù¥•ÜÍÕÁÁ½ÉÑ•¸É•ä)Y¥•Üµ…á¥Ì‰…±°ÍÑ…åÌ½É¥¥¹…°…µ•É„µ…á¥ÌÉ½Ñ…Ñ¥½¸¸U¹¥™½É´Í…±”ÕÍ•ÌÉ…‘¥ÕÌ¡…¹”)™É½´¥¹¥Ñ¥…°•¹ÑÉ”¥¸•Ù•ÉäÅÕ…‘É…¹Ğ€¡½ÕÑİ…ÉÉ½İÌ½¥¹İ…ÉÍ¡É¥¹­Ì¤ì…á¥ÌÍ…±”ÕÍ•Ì)½É¥¥¹…°ÁÉ½©•Ñ•Á½Í¥Ñ¥Ù”É…¥°¸1•…ä…¹Ù…Ì•ÍÑÕÉ•ÌÉ•Ñ…¥¸ÁÉ•Ù¥½ÕÌµ…ÁÁ¥¹œ¸)=‰©•Ğµ½É¥¥¸½5Õ±Ñ¤É•ÕÍ”Í…µ”•á¥ÍÑ¥¹œÁ¥Ù½Ğ½½É¥¥¸½¡¥ÍÑ½Éä½•½µ•ÑÉä½İ¹•ÉÌìÁÉ½Ñ•Ñ•)µÕ±Ñ¤µ½‰©•ĞµÑÉ…¹Í™½É´¹©ÌÄ¸ÀÕ¹¡…¹•¸9¼‘ÕÁ±¥…Ñ”µ½‘•±±¥¹œ­•É¹•°½ÈU$É•Í­¥¸¸()M•µ…¹Ñ¥Œ½µÁ½¹•¹ĞÑ…À½…¹•°¹½Ü•áÁ±¥¥Ñ±äÉ•Í•ÑÌÑÉ…¹Í¥•¹Ğ¥éµ¼ÍÑ…Ñ”‰•…ÕÍ”)½İ¹•Èİ¥¹‘½Üµ…ÁÑÕÉ”½µÁ±•Ñ¥½¸½¹ÍÕµ•ÌÉ…Ü•Ù•¹Ğ‰•™½É”Q½Ñ…°¥éµ¼Í••Ì¥Ğ¸…¹•°)É•ÍÑ½É•Ì½É¥¥¹…°Ù•ÉÑ¥•ÌìÑ…À‘½•Ì¹½ĞÉ•…Ñ”¡¥ÍÑ½Éä½È½Á•¸á…Ğ•¹ÑÉä¸½µµ¥ÑÑ•)‘É…ÌÉ•Ñ…¥¸½É¥¥¹…°½µÁ±•Ñ¥½¸½á…Ğ¸M•±•Ñ¥½¸…¹½É‘¥¹…ÉäÕ¹‘¼½É•‘¼ÍÑ…ä½İ¹•ÉÌ¸()M¥à¹•ÜÑ•ÍÑÌ•á•ÕÑ”…ÑÕ…°½İ¹•ÉÌ…¹Q½Ñ…°¥éµ¼Í•µ…¹Ñ¥Œ¡…¹‘½™˜İ¥Ñ Ñ½Õ °)A•¹¥°½µ½ÕÍ”°Y•ÉÑ•à½‘”½…”Í•±•Ñ•µ½¹±äµ½Ù•Ì°aeh±½­İ¥Í”äÀ…É½ÍÌ‰½Ñ …µ•É„)Í¥‘•Ì½¥¹Ù•ÉÑ•Ù¥•İÌ½á¥ÌM¹…À=8°Õ¹¥™½É´Í…±”…±°ÅÕ…‘É…¹ÑÌ°5Õ±Ñ¤½É½ÕÀÁ¥Ù½ÑÌ¼)½É¥¥¹Ì½Í…±”½…¹•°…¹Ñ…ÀÉ•Í•Ğ¸¥ÉÍĞÌÑ•ÍÑÌ™…¥°……¥¹ÍĞÁÉ”µ™¥à½İ¹•ÉÌ¸!¥ÍÑ½É¥…°)É½Ñ…Ñ”µ½İ¹•È¡•±Á•È•áÁ•Ñ•hÅÕ…Ñ•É¹¥½¸¡…¹•Ì€¬äÀÑ¼€´äÀ™½È±½­İ¥Í”ÍÉ••¸)µ½Ñ¥½¸™…¥¹œ€­hì…±°Í•±•Ñ¥½¸½¡¥ÍÑ½Éä½±•…ä…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•€¡É•ÅÕ•ÍÑ•™¥à¤¸(ĞÀ™½ÕÍ•¡•­ÌAMLì™Õ±°±½…°9½‘”ÈĞ¸ÈÈ¸ÄèÈääÈAML¼Á%0¼ÁÍ­¥À¼Á…¹•°( ÄÄĞ¸ÄÁÌ¤¸Må¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸9¼¹…Ñ¥Ù”M…™…É¤™••°±…¥µ•¸()I•Ù¥•İ•ÄÀÄØÍ¡•±°½‰½½ÑÍÑÉ…À½É•±•…Í”½½µÁ…É¥Í½¸°ÑÉ…¹Í™½É´µÕÁÉ…‘”…¹)É•±•…Í”´ù™…”µ±…å½ÕĞ´ù‘É…İ•È´ù½‰©•Ğµ½É¥¥¸…¡”É…Á ¸Q½Ñ…°¥éµ¼Ù¥ÍÕ…°ÄÀÄÈ‰åÑ•Ì¼)Á¥¸Õ¹¡…¹•°¥µÁ½ÉÑ•È½‘•½‘•ÈÄÀÄÔÕ¹¡…¹•°½µÁ…É¥Í½¸µ¥É…Ñ•ÌÄÀÄÔÉ…Ñ¥¹Ìİ¥Ñ )‘•™…Õ±Ğ½¹¼É•Á•…Ğ½¸É½é•¹	•Ñ„ËŠLÜ°…•ÁÑ•¹…Ù¥…Ñ¥½¸½A…¥¹Ğ½9=4½É•Í½ÕÉ”½UX½­•É¹•°)½İ¹•ÉÌÕ¹¡…¹•¸Y%ÄÀÄØ=‰©•ĞaehÉ¥¹Ì™É½´™É½¹Ğ½‰…¬…¹É•äY¥•Ü‰…±°ì)½É…¹”É¥¹œ½ÕÑİ…É½¥¹İ…É½¸±•™Ğ½É¥¡Ğ½Ñ½À½‰½ÑÑ½´ìÍ•±•ĞÍ•Ù•É…°Ù•ÉÑ¥•Ì°•‘”)½È™…”€´ø•áÁ…¹¥éµ¼€´ø5½Ù”½I½Ñ…Ñ”½M…±”İ¥Ñ ™¥¹•È½A•¹¥°ìÍ•±•Ñ¥½¸½U¹‘½I•‘¼¼)…¹•°…¹5Õ±Ñ¤½É½ÕÀÍ…¹¥Ñä¸9•áĞ™½±±½Ü¹…Ñ¥Ù”™••‘‰…¬°Ñ¡•¸9=4µ…ÀµÉ•Ñ•¹Ñ¥½¸)ÁÉ½Á½Í…°Í•Á…É…Ñ•±ä¸AÕ‰±¥…Ñ¥½¸•Ù¥‘•¹”è‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÄØ¹µ¸((¸ÄÀÄØÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØè)IÕ¹Ñ¥µ”ÈÕ•˜àÔÜàÙ…ˆÈÌÄÄÁ”İäÕĞÜÜÙ”ÀÕ„á˜ÌÀÔÍäìÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”(åÜÈå•”ÌÄÄÀİ‘ˆÈÈÕ„äàÔÄÈÀØÜĞÙ…„Ìİ‘˜äÄàÔÙ„•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•½É¥¥¸½µ…¥¸¸)±°ÄÔ‰±½‰Ì¡…Í µÙ•É¥™¥•‰•™½É”…Ñ½µ¥Œ¹½¸µ™½É••áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”¸A…•ÌĞÀäÔàÜÔÌØäÈ)½µÁ±•Ñ•MUMLìÄÈ¼ÄÈ™É•Í ±¥Ù”‰åÑ”µ…Ñ¡•Ìèµ…¹¥™•ÍĞ±Í¡•±°±ÑÉ…¹Í™½É´µÕÁÉ…‘”°)½‰©•Ğµ½É¥¥¸±‘É…İ•È±™…”µ±…å½ÕĞ±‰½½ÑÍÑÉ…À±É•±•…Í”±½µÁ…É¥Í½¸…¹Õ¹¡…¹•Q½Ñ…°¥éµ¼°)5Õ±Ñ¤Ä¸À…¹9=4‘•½‘•È¸Õ±°±½…°9½‘”ÈĞ¸ÈÈ¸ÄèÈääÈAML¼Á%0¼ÁÍ­¥À¼Á…¹•°( ÄÄĞ¸ÄÁÌ¤ìĞÀ™½ÕÍ•AML±Íå¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸!½ÍÑ•ĞÀäÔàÜÔĞÌÄàÉ•µ…¥¹Ì)¥¹}ÁÉ½É•ÍÌ…ĞÁÉ½½˜±¹½Ğ±…¥µ•AML¸€¸ÄÀÄØ1%Y€¼Id™½È¹…Ñ¥Ù”¥A…Ñ•ÍÑÌì)¹¼ÕÍ•È…•ÁÑ…¹”¥¹™•ÉÉ•¸±°™½ÕÈ¡…¹‘½™˜‘½Õµ•¹ÑÌÕÁ‘…Ñ•ìÉ•Ñ…¥¹•9=4½A	H)ÁÉ½Á½Í…°É•µ…¥¹ÌÍ•Á…É…Ñ”¸Y%ÄÀÄØè=‰©•ĞÉ¥¹Ì½É•å‰…±°‘¥É•Ñ¥½¸…¹Í…±”)½ÕÑİ…É½¥¹İ…É™É½´…±°ÅÕ…‘É…¹ÑÌìµÕ±Ñ¤µÙ•ÉÑ•à½•‘”½™…”5½Ù”½I½Ñ…Ñ”½M…±”İ¥Ñ )™¥¹•È½A•¹¥°ìÍ•±•Ñ¥½¹Ì±U¹‘½I•‘¼±Ñ…À½…¹•°…¹5Õ±Ñ¤½É½ÕÀÍ…¹¥Ñä¸((ŒŒ€¸ÄÀÄØÕÍ•ÈAMLƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äÉ•Á±¥•ÌƒŠqAMOŠtÑ¼Í¡¥ÁÁ•€¸ÄÀÄØ¥éµ¼É•Á…¥È¸ÕÉÉ•¹Ğ‰Õ¥±ÄÀÄØ(¡ÉÕ¹Ñ¥µ”ÈÕ•˜àÔÜ¤¥Ì1%Y€¼UMHAQ¸AÉ½Ñ•Ğ…•ÁÑ•=‰©•ĞÉ½Ñ…Ñ¥½¸½Í…±”)‘¥É•Ñ¥½¹Ì°•áÁ±¥¥Ğ¡…¹‘±”½¹ÍÑÉ…¥¹ÑÌ½Ù•Èá¥ÌM¹…À°½µÁ½¹•¹ĞÑ½Õ ½A•¹¥°½µ½ÕÍ”)¡…¹‘½™˜…¹•á¥ÍÑ¥¹œ¡¥ÍÑ½Éä½Í•±•Ñ¥½¸‰•¡…Ù¥½ÕÈ¸Q¡¥ÌÍÕÁ•ÉÍ•‘•Ì•…É±¥•ÈÄÀÄØ)Á•¹‘¥¹œ¹…Ñ¥Ù”…•ÁÑ…¹”¹½Ñ•Ìì¹¼Í•Á…É…Ñ”ÄÀÄÔ¹…Ñ¥Ù”9=4…•ÁÑ…¹”¥¹™•ÉÉ•¸)9¼ÉÕ¹Ñ¥µ”°É•±•…Í”µ…É­•ÉÌ½È…¡”Á¥¹Ì¡…¹•™½ÈÑ¡¥Ì…•ÁÑ…¹”É•½É¸)9¼™É•Í …ÕÑ½µ…Ñ•ÉÕ¸½Èµ…¹‘…Ñ½Éä¡…¹‘Ìµ½¸Ñ•ÍĞ¹••‘•™½È‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸)9•áĞÉ•½É‘•…¹‘¥‘…Ñ”É•µ…¥¹Ì¹…Ñ¥Ù”9=4Ñ•áÑÕÉ”½A	HÉ•Ñ•¹Ñ¥½¸İ¥Ñ M…Ù”½=Á•¸½9=4)É½Õ¹µÑÉ¥ÀÙ•É¥™¥…Ñ¥½¸°Í•Á…É…Ñ•±äÍ½Á•™É½´É•¹‘•É¥¹œ½‘¥ÍÁ±…•µ•¹ĞÁÉ•Ù¥•Ü¸)9¼¹•Ü™•…ÑÕÉ”‰Õ¥±É•ÅÕ•ÍÑ•‰äAML…±½¹”¸((ŒŒ€¸ÄÀÄÜƒŠPÁ•Èµ½‰©•Ğ±½…°¥éµ¼Á¥Ù½Ğİ½É­™±½ÜƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()MÑ…ÑÕÌèÄÀÄÜ1%Y€¼Id™½ÈÑ•ÍÑ¥¹œìÉÕ¹Ñ¥µ”ØÀÔÌÀäÉ¸	…Í•±¥¹”µ…¥¸äÔÅ˜ĞĞÕŒ°)ÉÕ¹Ñ¥µ”ÈÕ•˜àÔÜ€ ¸ÄÀÄØUMHAMLÁÉ½Ñ•Ñ•¤¸UÍ•ÈÉ•ÅÕ•ÍÑÌÉ•µ½Ù¥¹œ¥éµ¼U¹‘¼½I•‘¼°)™…”µ¹½Éµ…°Á¥Ù½ĞÁ±…•µ•¹Ğ°•¹ÑÉ”µ•¹…‰±•dÑİ¥ÍĞ°]½É±½1½…°…¹Á•Èµ½‰©•ĞÉ•…±°¸)%¹Ñ•ÉÁÉ•Ñ…Ñ¥½¸ÍÑ…Ñ•‰•™½É”İ½É¬èd™½±±½İÌ™…”¹½Éµ…°ìah±¥•ÌÑ…¹•¹ĞÑ¼™…”¸()á¥ÍÑ¥¹œ½‰©•Ğµ½É¥¥¸É•½É¥ÌÑ¡”M=1Á¥Ù½ĞÁ½Í¥Ñ¥½¸½İ¹•È¸9•ÜÍµ…±°)¥éµ¼µ±½…°µÁ¥Ù½Ğµ½‘Õ±”€¡ÍÉŒ½¥éµ¼µ±½…°µÁ¥Ù½Ğ¹©Ì¤•‘¥ÑÌ„ÑÉ…¹Í¥•¹Ğ‘É…™Ğ°Ñ¡•¸)É•Á±…•Ì™±…Ğ½É¥¥¸™¥•±‘Ìà½ä½è½Åà½Åä½Åè½ÅÜ½¥éµ½1½…°Ñ¡É½Õ ½É¥¥¹…°½‰©•Ğµ¡¥ÍÑ½Éä)¡•­Á½¥¹Ğ¸9¼Á…É…±±•°µ½‘•±±¥¹œ½Á¥Ù½Ğ½¡¥ÍÑ½Éä­•É¹•°½ÈÁÉ½©•ĞÉ•Í½ÕÉ”¡…¹¹•°¸)á¥ÍÑ¥¹œ™±…Ğ½É¥¥¸ÍÁÉ•…‘Ì…±É•…‘äÁÉ•Í•ÉÙ”™¥•±‘Ì…É½ÍÌÍ•¹”…ÁÑÕÉ”½É•ÍÑ½É”°)ÕÁ±¥…Ñ”…¹€¹‰½á±…ˆ½‘•Œì¹¼Í•¹”Ù•ÉÍ¥½¸‰ÕµÀ¸Í•Ñ=É¥¥¸¹½ÜÁÉ•Í•ÉÙ•Ì½ÁÑ¥½¹…°)™±…Ğ™¥•±‘Ì°ÁÉ•Ù•¹Ñ¥¹œ½É¥¥¹…°ÁÉ•Í•Ğ½µ½Ù”½İ¹•ÉÌ™É½´•É…Í¥¹œ½É¥•¹Ñ…Ñ¥½¸¸()	½ÑÑ½´µÉ¥¡Ğ½É¹•ÈÁ…¥È¹½ÜA¥Ù½Ğ‘¥Ğ€¡Ñ¥¹ä…á•Ì¥¹Í¥‘”É¥¹œ¤…¹]½É±½1½…°(¡±½‰”½…á•Ì…ÉÑİ½É¬¤ì¹¼¥éµ¼U¹‘¼½I•‘¼‰ÕÑÑ½¹Ì¸!•…‘•È½¡¥ÍÑ½Éä•ÍÑÕÉ•ÌÕ¹¡…¹•¸)A¥Ù½Ğ‘¥ĞèÑ…ÀQ%YÙ¥Í¥‰±”™…”€´ø•á…ĞÍÕÉ™…”Á½¥¹Ğ€¬•½µ•ÑÉ¥Œ™…”¹½Éµ…°ì)•¹ÑÉ”ÁÉ•ÍÌ•¹…‰±•ÌdÑÕÉ¸°‘É…œÉ••¸dÉ¥¹œ€¡½È•¹ÑÉ”¡½É¥é½¹Ñ…±±ä¤ìA¥Ù½Ğ‰ÕÑÑ½¸)™¥¹¥Í¡•Ì¸•½µ•ÑÉä½Í•±•Ñ¥½¸Õ¹Ñ½Õ¡•‘ÕÉ¥¹œ‘É…™Ğìİ¡½±”•‘¥Ğ¥Ì½¹”½É¥¥¹…°Í•¹”)¡•­Á½¥¹Ğ¸Í…Á”½Á…•¡¥‘”‘¥Í…ÉìÁ½¥¹Ñ•È…¹•°É½±±Ì‰…¬ÕÉÉ•¹ĞÍÁ¥¸½¹±ä¸)…¹Ù…Ì¹…Ù¥…Ñ¥½¸½É…ÜÑ½Õ ¡¥ÍÑ½Éä¥ÌÁ…ÕÍ•=91d‘ÕÉ¥¹œ•áÁ±¥¥Ğ•‘¥Ğ…¹É•ÍÑ½É•)½¸•á¥Ğ¸=Ñ¡•È¥éµ¼Í¡½ÉÑÕÑÌ‘¥Í…‰±•‘ÕÉ¥¹œ•‘¥ĞìA¥Ù½Ğ½ÍÁ…”É•µ…¥¸…Ù…¥±…‰±”¸)±¥¬½ÕÑÍ¥‘”¥éµ¼½…¹Ù…Ì½µµ¥ÑÌ‰•™½É”½Ñ¡•ÈU$¸M•±•Ñ¥½¸¡…¹•ÌÍ…™•±ä™¥¹¥Í ¸()I…äÁ¥¬É•ÕÍ•ÌÉ•¹‘•É•ÈÌ…ÑÕ…°Ù¥Í¥‰±”	…Í”‰½‘ä½¹½Éµ…°ÑÉ…¹Í™½É´ì¹•…É•È¥¹…Ñ¥Ù”)‰½‘ä‰±½­ÌÁ±…•µ•¹Ğ¸9¼¹•Üµ•Í ÑÉ¥…¹Õ±…Ñ¥½¸°Á¡…¹Ñ½´Ñ¡É½Õ µ½‰©•ĞÁ¥­¥¹œ°)¹½Éµ…°Á…¥¹Ñ¥¹œ½ÈUX•‘¥ÑÌ¸ÕÉÉ•¹Ğ•‘¥Ñ¥¹œ…Ñ”è½¹”¥¹‘•Á•¹‘•¹ĞÕ¹±½­•	…Í”)½‰©•Ğ°¹¼É•™•É•¹”½±¥¹­•½•Ù…±Õ…Ñ•½ÁÉ½•‘ÕÉ…°½A…¥¹Ğ½…Ñ¥Ù”µ½‘•±±¥¹œÍ•ÍÍ¥½¸¸)5Õ±Ñ¤½É½ÕÀ­••ÁÌ½É¥¥¹…°]½É±Á¥Ù½Ğ‰•¡…Ù¥½ÕÈì±½…°•‘¥Ñ¥¹œÉ•™ÕÍ•™½È5Õ±Ñ¤¸()1½…°É•ÑÕÉ¹ÌÍÑ½É•Á½Í¥Ñ¥½¸…¹½ÉÑ¡½¹½Éµ…°ÅÕ…Ñ•É¹¥½¸ì]½É±ÕÍ•Ì½É¥¥¹…°)Í•±•Ñ¥½¸•¹ÑÉ”½İ½É±…á•Ì¸… ½‰©•ĞÉ•µ•µ‰•ÉÌ¥ÑÌ™É…µ”…¹ÍÁ…”¡½¥”¸)á¥ÍÑ¥¹œQ½Ñ…°¥éµ¼ÕÍ•ÌÍ…µ”™É…µ”™½È…¹¡½È½…ÉÉ½İÌ½Á±…¹”Á…‘Ì½™É½¹ĞÉ¥¹œÁ…Ñ¡Ì)9¡¥ĞÁÉ½á¥•Ì¸=É¥¥¹…°ÑÉ…¹Í™½É´µÕÁÉ…‘”½İ¹Ì±½…°ÁÉ½©•Ñ•5½Ù”°ÅÕ…Ñ•É¹¥½¸)I½Ñ…Ñ”°‰…Í¥ÌµÍÁ…”M…±”…¹á…Ğì™É½é•¸ÍÑ…ÉĞ™É…µ”ÁÉ•Ù•¹ÑÌ…ÕµÕ±…Ñ¥½¸½‘É¥™Ğ¸)=‰©•Ğµ½Ù•Ì½É½Ñ…Ñ•Ì…ÉÉä½É¥¥¸½™É…µ”°¥¹±Õ‘¥¹œİ¡¥±”]½É±‘¥ÍÁ±…å•ì…¹•°)É•ÍÑ½É•Ì•½µ•ÑÉä9½É¥¥¸¸½µÁ½¹•¹ĞÑÉ…¹Í™½ÉµÌ…™™•Ğ½¹±äÍ•±•Ñ•Ù•ÉÑ¥•Ì)…‰½ÕĞÍ…µ”ÕÍÑ½´™É…µ”ì½‰©•Ğ½É¥¥¸¥ÑÍ•±˜É•µ…¥¹Ì™¥á•™½È½µÁ½¹•¹Ğ•‘¥ÑÌ¸)É•äÍÉ••¸‰…±°É•µ…¥¹ÌÙ¥•Üµ…á¥Ìì•áÁ±¥¥Ğ…á•Ì¼ÄÀÄØ‘¥É•Ñ¥½¸½‘•Ñ•¹ÑÌÉ•Ñ…¥¹•¸)9¼‘ÕÁ±¥…Ñ”•ÍÑÕÉ”½ÈÑÉ…¹Í™½É´­•É¹•°ìÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¸‰•Ñ…ÌÕ¹Ñ½Õ¡•¸()M•Ù•¸¹•Üµ½‘Õ±”½…ÑÕ…°µ½İ¹•ÈÑ•ÍÑÌ€¬½¹”ÕÁ‘…Ñ•½É¹•ÈÑ•ÍĞè™…”¡…¹‘•‘¹•ÍÌ°)Ù¥Í¥‰±”Á¥­¥¹œ½½±ÕÍ¥½¸°‘É…™ĞÁ±…•µ•¹Ğ½dÑİ¥ÍĞ°…ÑÕ…°Í•¹”U¹‘½I•‘¼°M…Ù•=Á•¸°)½‰©•ĞÉ•…±°½]½É±‘1½…°°É•™ÕÍ…±Ì°½µÁ½¹•¹ĞÍ•±•Ñ¥½¸°á…Ğ5½Ù”½I½Ñ…Ñ”½M…±”°)É•…°ÁÉ½©•Ñ•‘É…Ì½…¹•°½¹½¹…ÕµÕ±…Ñ¥½¸…¹Í¡½ÉÑÕĞÍÑ…Ñ”¸€ÌØ™½ÕÍ•AMLì)™¥¹…°™½ÕÍ•ÈÔAML¥¹±Õ‘¥¹œ™É…µ”µ…¡”½É•Á±…•µ•¹Ğ¡•­Ì¸¥¹…°±½…°)9½‘”ÈĞ¸ÈÈ¸ÄèÌÀÀÀAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÄÜ¸ĞÍÌ¤ìÍå¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸)É…µ”ÁÉ½©•Ñ¥½¸É•ÕÍ•ÌÑ¡”µ…¹…•ÈÌÍÑ…‰±”µÕÑ…‰±”Í•¹”…ÉÉ…ä€¡¹½Ğ½‰©•Ğ)É•™•É•¹•Ì¤°…Ù½¥‘¥¹œÉ•Á•…Ñ••ÑÑ•ÈµÑÉ¥•É•µ•Í ½Á¥•ÌìÉ•Á±…•µ•¹Ğ½‰©•ÑÌ)…™Ñ•È¡¥ÍÑ½ÉäÉ•ÍÑ½É”É•µ…¥¸Ù¥Í¥‰±”¸9¼Õ¹µ•…ÍÕÉ•ÍÁ••½…Á…¥Ñä±…¥´¸)MÑ…¹‘…±½¹”•á…ĞMY¥½¹ÌÉ•¹‘•É•½¥¹ÍÁ•Ñ•ì…ÑÕ…°‰É½İÍ•ÈEÕ¹…Ù…¥±…‰±”‰•…ÕÍ”)¡É½µ¥Õ´…‰Í•¹Ğ…¹‰É½İÍ•È‘½İ¹±½…É•ÑÕÉ¹•ÑÉÕ¹…Ñ•…É¡¥Ù•Ì¸9¼É•¹‘•É•…ÁÀ½È)¹…Ñ¥Ù”¥A……•ÁÑ…¹”±…¥µ•¸=É¥¥¹…°Ñ•ÍĞÜÄÈÉ•Á±…•Ì=91dÉ•ÅÕ•ÍÑ•U¹‘¼½I•‘¼)Í¡½ÉÑÕĞ…ÍÍ•ÉÑ¥½¹Ìİ¥Ñ A¥Ù½Ğ½ÍÁ…”½Ù•É…”ìÑ½½±‰…È½¡¥ÍÑ½Éä‰•¡…Ù¥½ÕÈÉ•Ñ…¥¹•¸()I•Ù¥•İ•ÄÀÄÜÍ¡•±°½É•½Ù•Éä½½µÁ…É¥Í½¸°Q½Ñ…°¥éµ¼´ù¹•ÜÁ¥Ù½Ğ­½É¹•È¡¥±°)ÑÉ…¹Í™½É´µÕÁÉ…‘”…¹É•±•…Í”´ù™…”µ±…å½ÕĞ´ù‘É…İ•È´ù½‰©•Ğµ½É¥¥¸É…Á ¸%½¸µ½¹±ä)¥µÁ½ÉĞÁ…É•¹ÑÌ½‰©•Ğµµ…¹…•µ•¹Ğ½Ù¥•İÁ½ÉĞµÑ½½±‰…Èµ½¹ÑÉ½±Ì½Ñ½Á‰…ÈÉ•Á¥¹¹•Ñ½•Ñ¡•Èì)Ñ¡½Í”Á…É•¹ÑÌ¡…Ù”¥µÁ½ÉĞµ½¹±ä¡…¹•Ì¸½µÁ…É¥Í½¸É•Ñ…¥¹ÌÄÀÄØÉ…Ñ¥¹Ì½‘•™…Õ±Ğ¸)9=4ÄÀÄÔ¥µÁ½ÉÑ•È½É•Í½ÕÉ•Ì½É•¹‘•É•È½¹…Ù¥…Ñ¥½¸½A…¥¹Ğ½UX½•½µ•ÑÉäÕ¹¡…¹•¸)Y%ÄÀÄÜè¥¹ÍÁ•Ğ‰½ÑÑ½´µÉ¥¡Ğ¥½¹ÌìA¥Ù½Ğ´ù™…”´ù•¹ÑÉ”´ùÉ••¹d´ùA¥Ù½Ğ°µ½‘•°µÕÍĞ)ÍÑ…äÍÑ¥±°Õ¹Ñ¥°•á¥Ğ…¹ÑÉ…¹Í™½É´¸1½…°aeh5½Ù”½I½Ñ…Ñ”½M…±”½á…Ğ…‰½ÕĞ¡½Í•¸)Á½¥¹Ğì]½É±½1½…°Ñ½±”°½Ñ¡•È½‰©•Ğ…¹‰…¬ìU¹‘½I•‘¼…¹M…Ù•=Á•¸ÁÉ•Í•ÉÙ”™É…µ”¸)1½…°™•…ÑÕÉ”…•ÁÑ…¹”Á•¹‘¥¹œ¸9=4Ñ•áÑÕÉ”µµ…À¥µÁ½ÉĞ½‘¥ÍÁ±…äÉ•µ…¥¹ÌÕ¹¥µÁ±•µ•¹Ñ•)…¹Í•Á…É…Ñ•±äÅÕ•Õ•ì€¸ÄÀÄØAMLÉ•Ñ…¥¹•¸M•”‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÄÜ¹µ¸((¸ÄÀÄÜÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØè)IÕ¹Ñ¥µ”ØÀÔÌÀäÉ‘„Í”äÜÜÁ”ääÜÕ”áŒØäá™‰…‰™”É˜ĞÙ‰ˆàØìÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”)”á•”ÍˆÌå•™…„Ìàİ‘‘•‘”ÈĞÈĞÙ˜ÔÄÈÑˆäÍ™„àÁˆÔ•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•½É¥¥¸½µ…¥¸¸)±°ÈÄ‰±½‰Ì¡…Í µÙ•É¥™¥•‰•™½É”…Ñ½µ¥Œ¹½¸µ™½É••áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”¸A…•ÌĞÀäÜÀÀÈÈÜØÄ)½µÁ±•Ñ•MUMLìÄÜ¼ÄÜ™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•¡•­½ÕĞèÍ¡•±°½µ…¹¥™•ÍĞ°)¹•ÜÁ¥Ù½Ğ½½É¹•ÉÌ½Q½Ñ…°¥éµ¼½ÑÉ…¹Í™½É´½İ¹•È°½É¥¥¸°¥½¸¥µÁ½ÉĞÁ…É•¹ÑÌ°…¹½¹¥…°)É•±•…Í”½…¡”É…Á …¹ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½9=4‘•½‘•È¸¥¹…°±½…°9½‘”ÈĞ¸ÈÈ¸Äè(ÌÀÀÀAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÄÜ¸ĞÍÌ¤ì™¥¹…°™½ÕÍ•ÈÔAML¥¹±Õ‘¥¹œ…¡”½Í•¹”)É•Á±…•µ•¹Ğ¡•­ÌìÍå¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸!½ÍÑ•ĞÀäÜÀÀÈÌĞäÄÉ•µ…¥¹Ì¥¹}ÁÉ½É•ÍÌ)…ĞÁÉ½½˜±¹½Ğ±…¥µ•AML¸	Õ¥±ÄÀÄÜ1%Y€¼Id™½È¹…Ñ¥Ù”¥A……•ÁÑ…¹”¸)á…ĞMY¥½¸E½¹±äì…ÁÀ½‰É½İÍ•È½¹…Ñ¥Ù”Á¥á•°½™••°É•µ…¥¹ÌÕ¹É…‘•…ÌÉ•½É‘•¸)±°™½ÕÈ¡…¹‘½™˜‘½Õµ•¹ÑÌÕÉÉ•¹ĞìÄÀÄØAMLÁÉ½Ñ•Ñ•¸M½Á”è¥¹‘•Á•¹‘•¹Ğ	…Í”)½‰©•ÑÌì5Õ±Ñ¤½É½ÕÀÍÑ…åÌ½É¥¥¹…°]½É±İ½É­™±½Ü¸Y%ÄÀÄÜA¥Ù½Ğ´ù…Ñ¥Ù”™…”(¡d¹½Éµ…°½ahÑ…¹•¹Ğ¤´ù•¹ÑÉ”´ùÉ••¹dÑÕÉ¸´ùA¥Ù½Ğ™¥¹¥Í °Ñ¡•¸1½…°ÑÉ…¹Í™½ÉµÌì)]½É±½1½…°…¹½‰©•ĞÉ•…±°ìU¹‘½I•‘¼…¹€¹‰½á±…ˆM…Ù”½=Á•¸¸9=4Ñ•áÑÕÉ”‘¥ÍÁ±…ä)É•µ…¥¹ÌÍ•Á…É…Ñ•±äÅÕ•Õ•°¹½Ğ…‘‘•¥¸Ñ¡¥Ì¥éµ¼‰Õ¥±¸(((ŒŒ€¸ÄÀÄàƒŠP±¥Ù”¥éµ¼ÁÉ•Ù¥•Ü‘ÕÉ¥¹œÁ¥Ù½Ğ•‘¥Ñ¥¹œƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äÉ•Á½ÉÑÌƒŠq%i5<1%8€ôAMOŠtìÁÉ½Ñ•Ğ€¸ÄÀÄÜ™…”…±¥¹µ•¹Ğ¸Q¡¥Ì¥Ì)…±¥¹µ•¹Ğ…•ÁÑ…¹”°¹½Ğ„‰±…¹­•ĞAML™½È•Ù•Éä€¸ÄÀÄÜM…Ù”½=Á•¸½ÑÉ…¹Í™½É´…Ñ”¸)UÍ•ÈÉ•ÅÕ•ÍÑÌÍ••¥¹œÑ¡”…ÑÕ…°¥éµ¼İ¡¥±”ÑÕÉ¹¥¹œ¥ÑÌÁ¥Ù½Ğ¸()Õ‘¥Ğ‰…Í•±¥¹”µ…¥¸ŒÄĞÁ”Ù˜½ÉÕ¹Ñ¥µ”ØÀÔÌÀäÉè½É¥¥¹…°±¥Ù”‘É…™Ğ™É…µ”…±É•…‘ä‘É¥Ù•Ì)Q½Ñ…°¥éµ¼…ÉÉ½İÌ°Á±…¹”Á…‘Ì…¹™É½¹ĞÉ½Ñ…Ñ¥½¸…ÉÌ½¸•Ù•ÉäÉ•¹‘•È™É…µ”¸Qİ¼)Á¥Ù½Ğµ•‘¥ĞMLÉÕ±•Ì¡¥…á•Ì½¡•…‘Ì½Á±…¹•Ì½Í…±”½ÍÉ••¸…¹¹½¸µdÉ¥¹Ì°±•…Ù¥¹œ¹¼)ÕÍ•™Õ°`½h½É¥•¹Ñ…Ñ¥½¸™••‘‰…¬¸I•µ½Ù”=91dÑ¡½Í”¡¥‘¥¹œÉÕ±•ÌèÑ¡”Í…µ”…ÑÕ…°)¥éµ¼¹½ÜÁÉ•Ù¥•İÌ¥ÑÌ¡…¹¥¹œ‘É…™Ğ½É¥•¹Ñ…Ñ¥½¸‘ÕÉ¥¹œÁ±…•µ•¹Ğ…¹dÑÕÉ¹¥¹œ¸)á¥ÍÑ¥¹œ•¹ÑÉ”½dµ½¹±äÁ¥Ù½Ğ¥¹ÁÕĞ¥¹Ñ•É•ÁÑ¥½¸°•½µ•ÑÉä¥Í½±…Ñ¥½¸°™¥¹¥Í ½…¹•°°)½É¥¥¹…°¡¥ÍÑ½Éä°Á•Èµ½‰©•Ğ™É…µ”…¹]½É±½1½…°½İ¹•ÉÌ…É”Õ¹¡…¹•¸9¼‘ÕÁ±¥…Ñ”)ÁÉ•Ù¥•Ü¥éµ¼°Á½¥¹Ñ•È±¥ÍÑ•¹•È°É•¹‘•É•È½ÈÑÉ…¹Í™½É´­•É¹•°¸5Õ±Ñ¤Ä¸À°¹…Ñ¥Ù”9=4°)…•ÁÑ•ÑÉ…¹Í™½ÉµÌ½¹…Ù¥…Ñ¥½¸½A…¥¹Ğ…¹™É½é•¸‰•Ñ…ÌÉ•µ…¥¸Õ¹¡…¹•¸()Y…±¥‘…Ñ¥½¸èÔÔ™½ÕÍ•¡•­ÌAML¼Á%0¼ÁÍ­¥ÀìÍå¹Ñ…à…¹İ¡¥Ñ•ÍÁ…”±•…¸¸½Ù•ÉÌ)…ÑÕ…°Á¥Ù½Ğ•‘¥Ğ½Í•¹”¡¥ÍÑ½Éä°ÑÉ…¹Í™½É´‘¥É•Ñ¥½¹Ì°™É½¹ĞÉ¥¹Ì½¡¥ĞÁÉ½á¥•Ì°)½É¹•È½¹ÑÉ½±Ì°Í¡•±°¥‘•¹Ñ¥Ñä½…¡”É…Á …¹½µÁ…É¥Í½¸µ¥É…Ñ¥½¸¸9¼¹…Ñ¥Ù”)¥A…Ù¥ÍÕ…°…•ÁÑ…¹”¥¹™•ÉÉ•¸	É½İÍ•ÈÉ•¹‘•É¥¹œÕ¹…Ù…¥±…‰±”¥¸Ñ¡¥Ì•¹Ù¥É½¹µ•¹Ğì)¹¼¹•Ü‰É½İÍ•È¥¹ÍÑ…±±…Ñ¥½¸…ÑÑ•µÁÑ•™½ÈÑ¡¥ÌMLµ½¹±ä¡…¹”¸()MÑ…ÑÕÌè€¸ÄÀÄàÙ…±¥‘…Ñ•ìÁÕ‰±¥…Ñ¥½¸Á•¹‘¥¹œ¸€¸ÄÀÄÜ…±¥¹µ•¹ĞAML)ÁÉ½Ñ•Ñ•ì9=4µ…Ñ•É¥…°½Ñ•áÑÕÉ”É•Ñ•¹Ñ¥½¸É•µ…¥¹ÌÍ•Á…É…Ñ•±äÅÕ•Õ•¸M¡•±°É•±•…Í”°)½µÁ…É¥Í½¸…¹…¹½¹¥…°É•±•…Í”µ±½…‘•ÈÁ¥¹ÌÕÁ‘…Ñ•ìÕ¹¡…¹•Á¥Ù½Ğ½ÑÉ…¹Í™½É´)¥µÁ±•µ•¹Ñ…Ñ¥½¸…¹¡¥±…¡”­•åÌÉ•Ñ…¥¹•¸9•áĞèÁÕ‰±¥Í …™Ñ•È™½ÕÍ•¡•­Ì°)Ñ¡•¸¥A…ÁÉ•Ù¥•Ü…•ÁÑ…¹”¸Y%ÄÀÄàèA¥Ù½Ğ€´ø™…”€´ø•¹ÑÉ”€´øÉ••¹dÑÕÉ¸ì)İ…Ñ …ÑÕ…°I¥éµ¼ÑÕÉ¸İ¡¥±”µ½‘•°ÍÑ…åÌÍÑ¥±°¸¥¹¥Í €´ø1½…°ÑÉ…¹Í™½É´ì)…¹•°½U¹‘½I•‘¼…¹]½É±½1½…°Í…¹¥Ñä¸9¼É•Á•…Ğ½ÍÉ••¸‰…Ñ É•ÅÕ¥É•¸((¸ÄÀÄàÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØè)IÕ¹Ñ¥µ”‰ÄÅ”åŒÈĞåˆÀÉ‰ÉÄäÜå‰……É„ÅˆÜÙˆÜÜÔØÈÜÈìÕÁ±½…‘•ÑÉ•”(Õ˜ĞÁ„àÌØÉ„ÄåÌÀÀäØİˆÌÀÈÑ„ÕÉ•Ñ™‘…™˜Í…ˆ•á…Ñ±äµ…Ñ¡•ÌÑ•ÍÑ•±½…°ÑÉ•”)…¹™•Ñ¡•½É¥¥¸½µ…¥¸¸±°ÄÈ‰±½‰Ì¡…Í µÙ•É¥™¥•‰•™½É”¹½¸µ™½É••áÁ•Ñ•µµ…¥¸)ÕÁ‘…Ñ”¸A…•ÌĞÀäÜĞàĞàĞÄÄMUMLìÄÄ¼ÄÄ™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•¡•­½ÕĞè)Í¡•±°½µ…¹¥™•ÍĞ½¥éµ¼½½µÁ…É¥Í½¸½‘É…İ•È½™…”µ±…å½ÕĞ½É•½Ù•ÉäÁ±ÕÌÕ¹¡…¹•Á¥Ù½Ğ°)ÑÉ…¹Í™½É´µÕÁÉ…‘”…¹ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À¸ÔÔ™½ÕÍ•¡•­ÌAML¼Á%0¼ÁÍ­¥ÀìÍå¹Ñ…à)…¹İ¡¥Ñ•ÍÁ…”±•…¸¸!½ÍÑ•ĞÀäÜĞàĞàääĞÍÑ¥±°¥¹}ÁÉ½É•ÍÌ…ĞÁÉ½½˜°¹½Ğ±…¥µ•AML¸)	Õ¥±ÄÀÄà1%Y€¼Id™½È¹…Ñ¥Ù”ÁÉ•Ù¥•Ü…•ÁÑ…¹”¸UÍ•È€¸ÄÀÄÜ…±¥¹µ•¹ĞAML)ÁÉ½Ñ•Ñ•¸•Ù¥”è…ÑÕ…°I¥éµ¼Ù¥Í¥‰±”Ñ¡É½Õ ™…”Á±…•µ•¹Ğ…¹É••¹dÑÕÉ¸ì)µ½‘•°ÍÑ…åÌÍÑ¥±°ì™¥¹¥Í Ñ¡•¸1½…°ÑÉ…¹Í™½ÉµÌ°…¹•°½U¹‘½I•‘¼Í…¹¥Ñä¸9¼¹…Ñ¥Ù”)Ù¥ÍÕ…°½™••°…•ÁÑ…¹”¥¹™•ÉÉ•¸9=4Ñ•áÑÕÉ”É•Ñ•¹Ñ¥½¸É•µ…¥¹ÌÍ•Á…É…Ñ•±äÅÕ•Õ•¸((ŒŒ€¸ÄÀÄäƒŠPÍÕÉ™…”µ‘É…œ±½…°Á¥Ù½Ğ…¹™…”µ•‘”…±¥¹µ•¹ĞƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸ÄÀÄàAMLÁÉ½Ñ•ÑÌÙ¥Í¥‰±”…ÑÕ…°µ¥éµ¼Á¥Ù½ĞÉ½Ñ…Ñ¥½¸ÁÉ•Ù¥•Üì€¸ÄÀÄÜ%i5<)1%8AMLÉ•Ñ…¥¹•¸UÍ•È¹½ÜÉ•ÅÕ•ÍÑÌ±¥Ù”Á¥Ù½Ğµ½Ù•µ•¹Ğ…É½ÍÌ„™…”…¹•‘”)…±¥¹µ•¹Ğ½˜`½Èhİ¡¥±”dÉ•µ…¥¹Ì¥ÑÌ™…”¹½Éµ…°¸	…Í•±¥¹”µ…¥¸İ”ÔĞÈå½ÉÕ¹Ñ¥µ”)‰ÄÅ”åŒ°É•±•…Í”ÄÀÄà¸Q¡¥Ì¥ÌÑ¡”¹•áĞ¹…ÉÉ½ÜÕÍ•Èµ…ÕÑ¡½É¥é•‰Õ¥±¸()=É¥¥¹…°¥éµ¼µ±½…°µÁ¥Ù½Ğ½İ¹•È•áÑ•¹‘Ì¥ÑÌ•á¥ÍÑ¥¹œİ¥¹‘½Üµ…ÁÑÕÉ”Á±…•µ•¹Ğ°)µ½Ù”½½µÁ±•Ñ¥½¸±¥ÍÑ•¹•ÉÌ¸É…œÍÑ…ÉÑÌ½¸„Ù¥Í¥‰±”Q%Y	…Í”™…”°…ÁÑÕÉ•ÌÑ¡”)Á½¥¹Ñ•È…¹ÕÁ‘…Ñ•Ì½¹±äÑ¡”ÑÉ…¹Í¥•¹ĞÁ¥Ù½Ğ‘É…™Ğ½¸•… µ½Ù”¸M…µ”…ÑÕ…°Q½Ñ…°)¥éµ¼ÁÉ½©•Ñ¥½¸ÁÉ•Ù¥•İÌ¥ÑÌÁ½Í¥Ñ¥½¸½…ÉÉ½İÌ½Á±…¹•Ì½™É½¹ĞÉ¥¹Ì…¹µ…Ñ¡¥¹œ¡¥Ğ)Á…Ñ¡Ì	=IÉ•±•…Í”¸=¹”™…”¥Ì±…Ñ¡•Á•È½¹Ñ…ĞÍ¼É½ÍÍ¥¹œ„Í¡…É••‘”)…¹¹½Ğ™±¥ÀÉ••¸d½¹Ñ¼Ñ¡”¹•¥¡‰½ÕÈìÉ•±•…Í”…¹ÍÑ…ÉĞ½¸…¹½Ñ¡•È™…”Ñ¼¡…¹”)™…•Ì¸=™˜µÍÕÉ™…”½½±Õ‘•µ½Ù•µ•¹Ğ¡½±‘ÌÑ¡”±…ÍĞÙ…±¥Á±…•µ•¹Ğ¸•½µ•ÑÉä…¹)Í•±•Ñ¥½¸¹•Ù•Èµ½Ù”‘ÕÉ¥¹œ•‘¥Ğì½É¥¥¹…°A¥Ù½Ğ™¥¹¥Í ½µµ¥ÑÌ=9Í•¹”¡•­Á½¥¹Ğ¸()I•…°Á½±å½¸‰½Õ¹‘…É¥•Ì½µ”™É½´•á¥ÍÑ¥¹œÉ•¹‘•É•ÈÑÉ¥…¹±”½İ¹•ÉÍ¡¥Àµ•Ñ…‘…Ñ„°)½È„…¡•É•…µ½¹±ä±½½­ÕÀ½˜½É¥¥¹…°	…Í”™…¸½É‘•É¥¹œİ¡•¸•½µ•ÑÉä½Õ¹ÑÌ)µ…Ñ ¸9¼¹•ÜÑÉ¥…¹Õ±…Ñ¥½¸°É•¹‘•Èµµ•Í É•‰Õ¥±½ÈÑÉ¥…¹±”µ‘¥…½¹…°Í¹…ÁÁ¥¹œ¸)MÉ••¸µ…¹•Ğ•¹Ñ•ÉÌÄĞMMÁà½É•±•…Í•ÌÈÁÁà°İ¥Ñ ÍÁà½É¹•ÈÁÉ•™•É•¹”ìÁ•ÉÍÁ•Ñ¥Ù”)¥¹Ñ•ÉÁ½±…Ñ¥½¸ÁÕÑÌÁ¥Ù½Ğ½¸Ñ¡”…ÑÕ…°•‘”Õ¹‘•ÈÑ¡”Á½¥¹Ñ•È¸Y¥Í¥‰¥±¥ÑäÁÉ½‰•Ì)¥¹Í¥‘”Ñ¡…Ğ‰½Õ¹‘…ÉäÕÍ”Ñ¡”Í…µ”…ÑÕ…°‰½‘äÁ¥­•Èì¡¥‘‘•¸½¥¹…Ñ¥Ù”½±Õ‘•ÉÌ)…¹¹½Ğ‰•½µ”Í¹…ÀÑ…É•ÑÌ¸`½Èh…¹¥ÑÌÍ¥¸…É”¡½Í•¸±½Í•ÍĞÑ¼Ñ¡”ÍÑ…ÉÑ¥¹œ)™…”µ…±¥¹•™É…µ”ìÑ¡”É¥¡Ğµ¡…¹‘•™É…µ”É•Ñ…¥¹Ì•á…ĞÉ••¸d¹½Éµ…°¸9½¸µÑ…¹•¹Ğ)İ…ÉÁ••‘•ÌÍ…™•±ä‘•±¥¹”…±¥¹µ•¹ĞÉ…Ñ¡•ÈÑ¡…¸É½Ñ…Ñ”d…İ…ä™É½´Ñ¡”™…”¸)MÑ…ÑÕÌ¹…µ•ÌÑ¡”Í¹…ÁÁ•…á¥Ì¸1•…Ù¥¹œÑ¡”µ…¹•ĞÉ•ÍÑ½É•ÌÑ¡”ÍÑÉ½­”ÌÕ¹Í¹…ÁÁ•)Ñ…¹•¹Ğ½É¥•¹Ñ…Ñ¥½¸¸•¹ÑÉ”´ùdÑÕÉ¹¥¹œÉ•µ…¥¹Ì…•ÁÑ•…¹‘½•Ì¹½Ğµ½Ù”•½µ•ÑÉä¸()A½¥¹Ñ•È…¹•±±…Ñ¥½¸½±½ÍĞ…ÁÑÕÉ”É•ÍÑ½É•ÌÑ¡”ÁÉ”µ‘É…œ‘É…™ĞìÍ…Á”½Á…•¡¥‘”)…‰…¹‘½¹Ì•‘¥Ğ…¹É•ÍÑ½É•Ì½¹ÑÉ½±Ì½±¥ÍÑ•¹•ÉÌ¸M•½¹‘…Éä½¹Ñ…ÑÌ…¹¹½ĞÉ•Á±…”)Ñ¡”…Ñ¥Ù”Á±…•µ•¹Ğ¸=É¥¥¹…°Á•Èµ½‰©•ĞÉ•½É½¡¥ÍÑ½Éä½ÁÉ½©•Ğ½‘•Œ½]½É±‘1½…°¼)ÑÉ…¹Í™½É´½İ¹•ÉÌÉ•µ…¥¸…ÕÑ¡½É¥Ñ…Ñ¥Ù”ì5Õ±Ñ¤Ä¸À°É•Í½ÕÉ”½9=4½A…¥¹Ğ½¹…Ù¥…Ñ¥½¸°)…•ÁÑ•¥½¹Ì…¹™É½é•¸‰•Ñ…ÌÕ¹¡…¹•¸9¼Í•½¹ÁÉ•Ù¥•Ü¥éµ¼½ÈÁ½¥¹Ñ•È½İ¹•È¸()M•Ù•¸¹•Ü…ÑÕ…°µ½İ¹•È½µ…Ñ ½ÁÉ½©•Ñ¥½¸Ñ•ÍÑÌ½Ù•ÈÑ½Õ ½A•¹¥°½µ½ÕÍ”±¥Ù”ÍÕÉ™…”)‘É…œ°ÑÉÕ”‰½Õ¹‘…É¥•ÌÙ•ÉÍÕÌ™…¸‘¥…½¹…±Ì°…á¥Ì½Í¥¸½¹½Éµ…°°½‰±¥ÅÕ”Í¥±¡½Õ•ÑÑ”°)Ù¥Í¥‰¥±¥Ñä°Á•ÉÍÁ•Ñ¥Ù”‘•ÁÑ °Í•½¹Á½¥¹Ñ•ÉÌ°…¹•°½±½ÍĞ½Í…Á”½Á…•¡¥‘”±•…¹ÕÀ°)½É¥¥¹…°U¹‘½I•‘¼½M…Ù•=Á•¸…¹…ÑÕ…°Q½Ñ…°¥éµ¼Á…Ñ¡Ì½¡¥ĞÁÉ½á¥•Ì‰•™½É”É•±•…Í”¸)Q¡”•…É±¥•ÈÄÀÄÜÍå¹Ñ¡•Ñ¥ŒÁ±…•µ•¹ĞÑ•ÍĞ¹½Ü•µ¥ÑÌ¥ÑÌÉ•…°Á½¥¹Ñ•ÉÕÀ	=I•¹ÑÉ”)¥¹ÁÕĞì…±°ÁÉ¥½È•½µ•ÑÉä½¡¥ÍÑ½Éä½ÑÉ…¹Í™½É´…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸)M=8M…Ù•=Á•¸)½µÁ…É•Ì…¹½¹¥…°Í…±…ÈÉ•½É‘Ì‰•…ÕÍ”)M=8¹½Éµ…±¥é•Ì€´ÀÑ¼Àì¹¼½‘•Œ¡…¹”¸)Y…±¥‘…Ñ¥½¸èØÈ™½ÕÍ•¡•­ÌAML¼Á%0¼ÁÍ­¥ÀìÍå¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸Õ±°±½…°)ÉÕ¸¥Ì¥¹½µÁ±•Ñ”€¡ÍÑ½ÁÁ•ÁÉ½‘Õ¥¹œ½ÕÑÁÕĞ¥¸Õ¹¡…¹•Á…¥¹ĞµÉ•Í½ÕÉ”¡•­Ì¤ì)¹½Ğ±…¥µ•AML¸!½ÍÑ•™Õ±°É•É•ÍÍ¥½¸İ¥±°‰”ÑÉ…­•Í•Á…É…Ñ•±ä¸9…Ñ¥Ù”¥A…)Ñ…Ñ¥±”½Ù¥ÍÕ…°…•ÁÑ…¹”¹½Ğ¥¹™•ÉÉ•¸AÕ‰±¥…Ñ¥½¸Á•¹‘¥¹œ¸()I•Ù¥•İ•ÄÀÄäÍ¡•±°½É•½Ù•Éä½½µÁ…É¥Í½¸…¹Q½Ñ…±¥éµ¼´ùÁ¥Ù½Ğ¡¥±…¡”±½ÍÕÉ”ì)…¹½¹¥…°É•±•…Í”´ù™…”µ±…å½ÕĞ´ù‘É…İ•ÈÁ¥¹ÌÕÁ‘…Ñ•¸=Ñ¡•ÈÑÉ…¹Í™½É´½İ¹•ÉÌÉ•Ñ…¥¸(ÄÀÄÜ‰åÑ•Ì½Á¥¹Ì¸Y%ÄÀÄäèA¥Ù½Ğ€´øÁÉ•ÍÌ½‘É…œ½¸™…”€´ø…ÁÁÉ½… ‘¥™™•É•¹Ğ•‘•Ì°)İ…Ñ …ÑÕ…°¥éµ¼µ½Ù”½Í¹…À`½Èhİ¡¥±”É••¹dÉ•µ…¥¹Ì¹½Éµ…°…¹µ½‘•°ÍÑ¥±°¸)I•±•…Í”€´ø•¹ÑÉ”½dµ…¹Õ…°ÑÕÉ¸ÍÑ¥±°İ½É­Ì€´øA¥Ù½Ğ™¥¹¥Í €´ø1½…°ÑÉ…¹Í™½É´ì)U¹‘½I•‘¼…¹M…Ù•=Á•¸Í…¹¥Ñä¸MÑ…ÉĞ½¸…¹½Ñ¡•È™…”™½È„¹•Ü¹½Éµ…°¸9•áĞ¹…Ñ¥Ù”)™••‘‰…¬°Ñ¡•¸Í•Á…É…Ñ•±äÅÕ•Õ•9=4Ñ•áÑÕÉ”½A	HÉ•Ñ•¹Ñ¥½¸¸9¼¹•Ü½Ñ•ÍĞ‰…Ñ ¸((¸ÄÀÄäÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØè)IÕ¹Ñ¥µ”ÌàÁˆØÅŒäÈİ”Àá‰”ÄÈÅ„ØÄÍ…”É‘ˆÀÑ”àåˆÄÌäÁ……„ìÕÁ±½…‘•½Ñ•ÍÑ•ÑÉ•”(ÑŒÕ•‰„Á…„ÜÁ…‘™ŒäÍˆÈØØå‘”ÔÑ˜Å˜Å„ÀØÅ…˜Ì•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•½É¥¥¸½µ…¥¸¸)±°ÄĞ‰±½‰Ì¡…Í µÙ•É¥™¥•‰•™½É”¹½¸µ™½É••áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”¸A…•ÌĞÀäàÄÔÀĞÈÜÈ)‰Õ¥±½‘•Á±½äMUMLìÄÌ¼ÄÌ™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•ÉÕ¹Ñ¥µ”èÍ¡•±°°)µ…¹¥™•ÍĞ±Á¥Ù½Ğ±¥éµ¼±½µÁ…É¥Í½¸±…¹½¹¥…°±½…‘•È½É•½Ù•ÉäÉ…Á …¹Õ¹¡…¹•½É¹•È°)½É¥¥¸±ÑÉ…¹Í™½É´µÕÁÉ…‘”±ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À¸ØÈ™½ÕÍ•¡•­ÌAMLì™Õ±°±½…°)9½‘”ÈĞ¸ÈÈ¸ÄèÌÀÀÜAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÈÀà¸äÑÌ¤°ÍÕÁ•ÉÍ•‘¥¹œÑ¡”¥¹¥Ñ¥…°±½…°)¥¸µÁÉ½É•ÍÌ¹½Ñ”¸!½ÍÑ•ĞÀäàÄÔÀĞÌàÄÉ•µ…¥¹Ì¥¹}ÁÉ½É•ÍÌ…ĞÁÉ½½˜±¹½Ğ±…¥µ•AML¸)	Õ¥±ÄÀÄä1%Y€¼Id™½È¹…Ñ¥Ù”¥A…™…”µ‘É…œ½•‘”µÍ¹…ÀÑ•ÍÑ¥¹œ¸±°™½ÕÈ¡…¹‘½™˜)‘½Õµ•¹ÑÌÕÉÉ•¹Ğì¸ÄÀÄàÁÉ•Ù¥•ÜAML…¹€¸ÄÀÄÜ…±¥¹µ•¹ĞAMLÁÉ½Ñ•Ñ•¸á¥ÍÑ¥¹œ)½É¥¥¹…°µ•¹ÑÉ”½dÑÕÉ¸°Á•Èµ½‰©•Ğ]½É±‘1½…°°¡¥ÍÑ½Éä…¹M…Ù•=Á•¸½İ¹•ÉÌÉ•Ñ…¥¹•¸)9¼¹…Ñ¥Ù”…ÁÀ½‰É½İÍ•ÈÙ¥ÍÕ…°½™••°É•ÍÕ±Ğ¥¹™•ÉÉ•™É½´9½‘”ÁÉ½©•Ñ¥½¸Ñ•ÍÑÌ¸)Y%ÄÀÄäèA¥Ù½Ğ´ùÁÉ•ÍÌ½‘É…œ½¸„™…”´ù…ÁÁÉ½… É•…°•‘•Ìè…ÑÕ…°¥éµ¼µ½Ù•Ì°)`½Èh…±¥¹ÌÑ¼•‘”±dÉ•µ…¥¹Ì™…”¹½Éµ…°±µ½‘•°ÍÑ¥±°ìÉ•±•…Í”Ñ¡•¸•¹ÑÉ”½d)µ…¹Õ…°ÑÕÉ¸±A¥Ù½Ğ™¥¹¥Í ±1½…°ÑÉ…¹Í™½ÉµÌ±U¹‘½I•‘¼½M…Ù•=Á•¸¸9•Ü½¹Ñ…Ğ½¸…¹½Ñ¡•È)™…”¡…¹•Ì¹½Éµ…°¸9=4Ñ•áÑÕÉ”½A	HÉ•Ñ•¹Ñ¥½¸É•µ…¥¹ÌÍ•Á…É…Ñ•±äÅÕ•Õ•¸((ŒŒ€¸ÄÀÈÀƒŠPIµ¥¹¥…ÑÕÉ”¥éµ¼A¥Ù½Ğ¥½¸ƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•ÅÕ•ÍÑÌÉ•½É••¸½‰±Õ”A¥Ù½Ğ…ÉÑİ½É¬İ¥Ñ „Íµ…±°å•±±½Ü¥É±”°É•Í•µ‰±¥¹œ)„Ñ¥¹ä¥éµ¼¸	…Í•±¥¹”µ…¥¹á‰”Á˜Ğ½ÉÕ¹Ñ¥µ”ÌàÁˆØÅŒ€ ¸ÄÀÄä¤¸¡…¹”=91dÑ¡”½É¥¥¹…°)¥éµ½%½¹Ì¹Á¥Ù½ĞMYèÉ••¸ÕÁİ…Éd°É•±½İ•Èµ±•™Ğ`°‰±Õ”±½İ•ÈµÉ¥¡Ğh…ÉÉ½İÌ°)Íµ…±°å•±±½Ü•¹ÑÉ”É¥¹œ¸áÁ±¥¥Ğ¡¥±ÍÑÉ½­”½™¥±°­••ÁÌ½±½ÕÉÌÑ¡É½Õ •á¥ÍÑ¥¹œ)¹½Éµ…°½ÁÉ•ÍÍ•‰ÕÑÑ½¸½±½ÕÈ¥¹¡•É¥Ñ…¹”ì½É¥¥¹…°ÈÑÁàMY…¹ĞÁÁà‰ÕÑÑ½¸É•Ñ…¥¹•¸)9¼‘ÕÁ±¥…Ñ”‰ÕÑÑ½¸°…Ñ¥½¸½±…‰•°½±¥ÍÑ•¹•È½±…å½ÕĞ½Á¥Ù½Ğ½•½µ•ÑÉä½¡¥ÍÑ½Éä¡…¹”¸)=Ñ¡•ÈÍ¡…É•¥½¹ÌÉ•µ…¥¸•á…Ğ¸±°¥µÁ½ÉĞÁ…É•¹ÑÌ½˜Í¡…É•¥éµ¼µ½É¹•Èµ½¹ÑÉ½±Ì)É•Á¥¹¹•Ñ½•Ñ¡•È€¡Q½Ñ…±¥éµ¼±½‰©•Ğµµ…¹…•µ•¹Ğ±Ù¥•İÁ½ÉĞµÑ½½±‰…È´ùÑ½Á‰…È±‘É…İ•È¤°)Á±ÕÌ½É¥¥¹…°É•±•…Í”½…¡”±½ÍÕÉ”¸%µÁ½ÉĞµ½¹±ä¡…¹•Ì½ÕÑÍ¥‘”MY½İ¹•È¸((ÌÔ™½ÕÍ•½É¹•È½É•±•…Í”½…¡”½¥‘•¹Ñ¥Ñä½½µÁ…É¥Í½¸¡•­ÌAMLìÍå¹Ñ…à½İ¡¥Ñ•ÍÁ…”)±•…¸¸á…ĞMYÉ•¹‘•É•½Ù¥ÍÕ…±±ä¥¹ÍÁ•Ñ•…ĞÈÑÁà…¹•¹±…É•¥¸¹½Éµ…°±ÁÉ•ÍÍ•)…¹‘¥Í…‰±•ÍÑ…Ñ•Ì¸±°½Ñ¡•È¥½¸…ÉÑİ½É¬…¹…Ñ¥½¸µ™Õ¹Ñ¥½¸‰åÑ•ÌÕ¹¡…¹•ì)¹¼…ÑÕ…°‰É½İÍ•È½¹…Ñ¥Ù”Á¥á•°…•ÁÑ…¹”±…¥µ•¸AÕ‰±¥…Ñ¥½¸Á•¹‘¥¹œ¸(¸ÄÀÄàÁÉ•Ù¥•ÜAML¼¸ÄÀÄÜ…±¥¹µ•¹ĞAMLÁÉ½Ñ•Ñ•ì(¸ÄÀÄä™…”µ‘É…œ½•‘”µÍ¹…À¹…Ñ¥Ù”…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œ°¹¼AML¥¹™•ÉÉ•™É½´)Ñ¡¥Ì¥½¸É•ÅÕ•ÍĞ¸€¸ÄÀÄä™Õ±°±½…°ÌÀÀİAMLÉ•µ…¥¹Ì‰…Í•±¥¹”°¹¼‘ÕÁ±¥…Ñ”™Õ±°)É•ÉÕ¸™½È¥½¸µ½¹±äİ½É¬¸Y%ÄÀÈÀè¥¹ÍÁ•ĞI…ÉÉ½İÌ½å•±±½ÜÉ¥¹œ…Ğ¹½Éµ…°Í¥é”°)Ñ…ÀA¥Ù½Ğ½¸½½™˜…¹Ù•É¥™ä½±½ÕÉÌÉ•µ…¥¸ì•á¥ÍÑ¥¹œ™…”µ‘É…œ½•‘”µÍ¹…ÀÍ…¹¥Ñä¸)9•áĞ¹…Ñ¥Ù”™••‘‰…¬ì9=4Ñ•áÑÕÉ”½A	HÉ•Ñ•¹Ñ¥½¸Í•Á…É…Ñ•±äÅÕ•Õ•¸((¸ÄÀÈÀÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØè)IÕ¹Ñ¥µ”Ù„ÀÕÜÜÄÔå…„Ù•”ÔĞØÜÁŒĞääÔáˆÀÄÍŒÕŒÔÌÈäØÑŒìÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”(äĞİ„Á˜ÈØÕ˜á”ÈÜÍÙ˜Å™”ÕˆäÁ„ØÜÔÈÙˆİ™™‘ˆİ•á…Ñ±äµ…Ñ¡•Ì™•Ñ¡•½É¥¥¸½µ…¥¸¸)±°ÄØ‰±½‰Ì¡…Í µÙ•É¥™¥•‰•™½É”¹½¸µ™½É••áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”¸A…•ÌĞÀäàÔÀääĞÌÀ)‰Õ¥±½‘•Á±½äMUMLìÄĞ¼ÄĞ™É•Í ±¥Ù”™¥±•Ìµ…Ñ Ñ•ÍÑ•ÉÕ¹Ñ¥µ”èÍ¡•±°½µ…¹¥™•ÍĞ°)IA¥Ù½Ğ¥½¸…¹Í¡…É•¥µÁ½ÉĞÁ…É•¹ÑÌ±½µÁ…É¥Í½¸½É•½Ù•Éä½…¹½¹¥…°±½…‘•ÈÉ…Á °)Õ¹¡…¹•±½…°µÁ¥Ù½Ğ…¹ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À¸ÌÔ™½ÕÍ•¡•­ÌAML¼Á%0¼ÁÍ­¥Àì)Íå¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸á…ĞMY¥¹ÍÁ•Ñ•ÈÑÁà½•¹±…É•¹½Éµ…°½ÁÉ•ÍÍ•½‘¥Í…‰±•ì)¹¼…ÑÕ…°‰É½İÍ•È½¹…Ñ¥Ù”¥½¸…•ÁÑ…¹”¥¹™•ÉÉ•¸!½ÍÑ•ĞÀäàÔÀääÄÜÔ¥¹}ÁÉ½É•ÍÌ)…ĞÁÉ½½˜±¹½Ğ±…¥µ•AMLì€¸ÄÀÄä™Õ±°±½…°ÌÀÀİAMLÉ•µ…¥¹Ì‰…Í•±¥¹”±¹¼É•‘Õ¹‘…¹Ğ)™Õ±°±½…°¥½¸µ½¹±äÉ•ÉÕ¸¸	Õ¥±ÄÀÈÀ1%Y€¼Id™½È¥½¸É•Ù¥•Ü¸=Ñ¡•È¥½¸‰åÑ•Ì°)…Ñ¥½¸™Õ¹Ñ¥½¸±Á¥Ù½Ğ…±¥¹µ•¹Ğ½ÍÕÉ™…”‘É…œ½•‘”Í¹…À½ÑÉ…¹Í™½É´½İ¹•ÉÌÕ¹¡…¹•¸)±°™½ÕÈ¡…¹‘½™˜‘½Õµ•¹ÑÌÕÉÉ•¹Ğì¸ÄÀÄàÁÉ•Ù¥•Ü¼¸ÄÀÄÜ…±¥¹µ•¹ĞAMLÁÉ½Ñ•Ñ•ì(¸ÄÀÄä¹…Ñ¥Ù”•‘”µÍ¹…À…•ÁÑ…¹”ÍÑ¥±°Á•¹‘¥¹œ¸Y%ÄÀÈÀI…ÉÉ½İÌ½å•±±½Ü•¹ÑÉ”)É¥¹œ±¹½Éµ…°½…Ñ¥Ù”½±½ÕÉÌ±A¥Ù½ĞÑ½±”…¹•á¥ÍÑ¥¹œ™…”Á±…•µ•¹ĞÍ…¹¥Ñä¸((ŒŒ€¸ÄÀÈÄƒŠPA¥Ù½Ğ¥½¸½±½ÕÈ½É‘•ÈƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•ÅÕ•ÍÑÌ‰±Õ”‰½ÑÑ½´µ±•™Ğ°É••¸ÕÀ°É•‰½ÑÑ½´µÉ¥¡ĞÑ¼µ…Ñ Ñ¡”¥éµ¼¸)	…Í•±¥¹”µ…¥¸‰‘ÅˆÜÄÈ€¼ÉÕ¹Ñ¥µ”Ù„ÀÕÜÜÄ€ ¸ÄÀÈÀ¤¸Mİ…À=91dÑ¡”Ñİ¼±½İ•È)…ÉÉ½ÜÍÑÉ½­”½±½ÕÉÌ¥¸½É¥¥¹…°¥éµ½%½¹Ì¹Á¥Ù½ĞìÉ••¸…ÉÉ½Ü…¹å•±±½Ü•¹ÑÉ”)É¥¹œÉ•Ñ…¥¹•¸=É¥¥¹…°¥½¸Í¥é”°‰ÕÑÑ½¸½…Ñ¥½¹Ì…¹Á¥Ù½Ğ½ÑÉ…¹Í™½É´½İ¹•ÉÌÕ¹¡…¹•¸)I•™É•Í Ñ¡”Í…µ”É•Ù¥•İ•Í¡…É•µ¥½¸Á…É•¹Ğ½…¡”É…Á …ÌÄÀÈÀìÁÉ•Í•ÉÙ”½µÁ…É¥Í½¸)É…Ñ¥¹Ì¥¹±Õ‘¥¹œÄÀÈÀ¸AÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À½™É½é•¸‰•Ñ…ÌÕ¹¡…¹•¸(ÌÜ™½ÕÍ•½É¹•È½É•±•…Í”½¥‘•¹Ñ¥Ñä½½µÁ…É¥Í½¸¡•­ÌAML°Á%0¼ÁÍ­¥ÀìÍå¹Ñ…à…¹)İ¡¥Ñ•ÍÁ…”±•…¸¸MY½±½ÕÈ½É‘•È…¹Õ¹¡…¹•…Ñ¥½¸½½Ñ¡•Èµ¥½¸‰åÑ•ÌÙ•É¥™¥•¸)%¹¥Ñ¥…°¥‘•¹Ñ¥ÑäÉÕ¸¹••‘•Ñ¡”‘•±…É•Q¡É•”‘•Á•¹‘•¹äì™¥¹…°É•ÉÕ¸Á…ÍÍ•Ì¸)AÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”á…”ÕÑŒÑ‰……„Øİ•˜ÄÅ„Å…àäÄÌåŒĞÔÅ…‘•ˆÈÈääìÑ•ÍÑ•ÑÉ•”(ÈÙ…„ÈÙ„Äå”ĞÍ‘ˆÁ™•„å•„Øåå„Ù„Ñ™„Ñ˜ÅŒÉ”àĞĞµ…Ñ¡•Ì™•Ñ¡•½É¥¥¸½µ…¥¸•á…Ñ±ä¸)±°ÄØ‰±½‰Ì¡…Í µÙ•É¥™¥•‰•™½É”•áÁ•Ñ•µµ…¥¸¹½¸µ™½É•ÕÁ‘…Ñ”¸A…•ÌĞÀääÄÌàÈÄÀÌ)MUMLìÄĞ¼ÄĞ™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•¡•­½ÕĞ°¥¹±Õ‘¥¹œ½ÉÉ•Ñ•¥½¸°)Í¡…É•Á…É•¹Ğ½…¡”É…Á …¹Õ¹¡…¹•±½…°µÁ¥Ù½Ğ½5Õ±Ñ¤Ä¸À¸!½ÍÑ•ĞÀääÄÌàÈÈàÌ)¥¹}ÁÉ½É•ÍÌ…ĞÁÉ½½˜ì¹¼™Õ±°µÍÕ¥Ñ”½¹…Ñ¥Ù”‘•Ù¥”AML±…¥µ•¸	Õ¥±ÄÀÈÄ1%Y€¼)Id™½ÈÑ•ÍÑ¥¹œ¸9…Ñ¥Ù”ÄÀÈÄ¥½¸µ½É‘•È¡•¬Á•¹‘¥¹œ¸AÉ¥½ÈÄÀÄÜ)…±¥¹µ•¹Ğ¼ÄÀÄàÁÉ•Ù¥•ÜAMLÁÉ½Ñ•Ñ•ìÄÀÄä‘•Ù¥”•‘”µÍ¹…À…•ÁÑ…¹”ÍÑ¥±°Á•¹‘¥¹œ¸)9•áĞèÙ•É¥™ä¥½¸½±½ÕÉÌ¥¸¹½Éµ…°½…Ñ¥Ù”ÍÑ…Ñ”°Ñ¡•¸•á¥ÍÑ¥¹œA¥Ù½ĞÑ½±”Í…¹¥Ñä¸)9=4Ñ•áÑÕÉ”½A	HÉ•Ñ•¹Ñ¥½¸É•µ…¥¹ÌÍ•Á…É…Ñ•±äÅÕ•Õ•¸((ŒŒ€¸ÄÀÈÈƒŠPÑ½ÀµÉ¥¡Ğ™±½½È½É¥½½™˜Ñ½±”ì€¸ÄÀÈÄAMLƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äAMM•ÌÄÀÈÄìÁÉ½Ñ•ĞA¥Ù½Ğ¥½¸‰±Õ”‰½ÑÑ½´µ±•™Ğ½É••¸ÕÀ½É•)‰½ÑÑ½´µÉ¥¡Ğ…¹å•±±½Ü•¹ÑÉ”É¥¹œ¸9¼‰É½…‘•ÈÄÀÄä‘•Ù¥”…•ÁÑ…¹”¥¹™•ÉÉ•¸)	…Í•±¥¹”µ…¥¸ØÔÕ˜ÔÙ”€¼ÉÕ¹Ñ¥µ”á…”ÕÑŒ¸UÍ•ÈÉ•ÅÕ•ÍÑÌÑ½ÀµÉ¥¡ĞÑ¡É•”µÍÑ…Ñ”)™±½½È¥½¸è±¥¡ĞµÉ•ä™¥±±•Á±…¹”€´øÉ¥‘‘•Á±…¹”€´øÕ¹™¥±±•½ÕÑ±¥¹”€´øÁ±…¹”¸()=É¥¥¹…°Í¡•±°…‘‘Ì=9ĞÁÁà‰ÕÑÑ½¸‰•™½É”Y%\İ¥Ñ ÈÑÁàÁ±…¹”…ÉÑİ½É¬™É½´ÍÑ…ÉÑÕÀì)½É¥¥¹…°Ñ½½±‰…È½É‘•È½¡å‘É…Ñ¥½¸­••ÁÌÑ¡¥ÌÍ…µ”¹½‘”¸á¥ÍÑ¥¹œÉ½Õ¹µÁ½±¥Í ½İ¹•È)¡½±‘Ì„Í•ÍÍ¥½¸µ½¹±äÁ±…¹”½É¥½½™˜¡½¥”€¡™É•Í ±½…ÍÑ…ÉÑÌÁ±…¹”¤°‰¥¹‘Ì½¹”¹…Ñ¥Ù”)±¥¬¡…¹‘±•È…¹Íå¹¡É½¹¥é•Ì…ÉÑİ½É¬½…•ÍÍ¥‰±”ÕÉÉ•¹Ğ­¹•áĞµÍÑ…Ñ”±…‰•±Ì¸9¼¹•Ü)É…ÜÁ½¥¹Ñ•È½İ¹•È°É•¹‘•É•È°É½Õ¹µ•Í °‘ÕÁ±¥…Ñ”½¹ÑÉ½±Ì½È¡¥ÍÑ½Éä•¹ÑÉä¸)=É¥¥¹…°É¥…¹MÑÕ‘¥¼™±½½È…É”µÕÑÕ…±±ä•á±ÕÍ¥Ù”ì½™˜¡¥‘•Ì‰½Ñ …¹MÑÕ‘¥¼Ì)Í•Á…É…Ñ”½¹Ñ…ĞµÍ¡…‘½Ü‘•…°¸=É¥¥¹…°ÍÑÕ‘¥¼µÁ½±¥Í É•™É•Í É•ÍÁ•ÑÌÑ¡¥Ì¡½¥”ì)É•¹‘•Èµµ½‘•ÌÕÍ•ÌÑ¡”Í…µ”ÍÑ…Ñ”İ¡•¸¥¹¥Ñ¥…±¥é¥¹œ½Íå¹¡É½¹¥é¥¹œ¥ÑÌ™±½½È‘¥É•Ñ±ä°)İ¥Ñ¡½ÕĞ…‘‘¥¹œ„Á•Èµ‰½‘äÍ•¹”ÑÉ…Ù•ÉÍ…°¸á¥ÍÑ¥¹œ™±½½ÈÁ±…•µ•¹Ğ½Í¡…‘½İÌ½±¥¡ÑÌ°)É¥½Á…¥Ñä…¹…á•ÌÕ¹¡…¹•¸±½½ÈÉ•µ…¥¹Ì½É¥¥¹…°MÑÕ‘¥¼µ½¹±äÍÕÉ™…”ì½Ñ¡•È)±½½­ÌÉ•Ñ…¥¸Ñ¡•¥ÈÁÉ¥½È¹¼µÁ±…¹”‰•¡…Ù¥½È¸É¥¥Ì…Ù…¥±…‰±”…É½ÍÌ±½½­Ì¸¡½¥”)ÍÕÉÙ¥Ù•Ì±½½¬Íİ¥Ñ¡•Ì½‰É¥‘”ÕÁ‘…Ñ•Ìİ¥Ñ¡¥¸Í•ÍÍ¥½¸¸á¥ÍÑ¥¹œ±•…¸Y¥•ÜÍÑ¥±°¡¥‘•Ì)É¥½…á•ÌÑ•µÁ½É…É¥±ä…¹É•ÍÑ½É•Ì¡½Í•¸É¥½¸•á¥Ğì¥Ğ‘½•Ì¹½Ğ¡…¹”ÁÉ•™•É•¹”¸((ÔĞ™½ÕÍ•¡•­ÌAML¼Á%0¼ÁÍ­¥Àì™½ÕÈ¹•Ü…ÑÕ…°É½Õ¹µ½İ¹•È½‰ÕÑÑ½¸½MÑÕ‘¥¼µÁ½±¥Í ¼)É•¹‘•ÈµÍå¹ŒÑ•ÍÑÌ½Ù•Èå±”½¥½¹Ì°•…É±ä¥¹ÁÕĞ½±…Ñ”‰É¥‘”°½¹”±¥ÍÑ•¹•È°¥¹Ù…±¥)ÍÑ…Ñ”É•™ÕÍ…°°¹¼•áÑÉ„Í•¹”½‰©•ÑÌ½µ½‘•°ÑÉ…¹Í™½ÉµÌ°±•…¸½Y¥•ÜÉ•ÍÑ½É…Ñ¥½¸…¹)½¹Ñ…Ğ‘•…°¹½ĞÉ•…ÁÁ•…É¥¹œ…™Ñ•ÈÁ½¥¹Ñ•Èµ‘É¥Ù•¸Á½±¥Í ¸á¥ÍÑ¥¹œÑ½½±‰…ÈÍ¡•±°)½Õ¹Ğ½½É‘•È™¥áÑÕÉ”•áÁ…¹‘•=91d™½ÈÉ•ÅÕ•ÍÑ•¹•Ü‰ÕÑÑ½¸ì±•…ä™…±±‰…¬…¹…±°)½É¥¥¹…°…Ñ¥½¸½¡å‘É…Ñ¥½¸…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸á¥ÍÑ¥¹œÉ•¹‘•È½MÑÕ‘¥¼½½µÁ…Ğ½=‰©•ÑÌ¼)Í¹…À½É•±•…Í”½…¡”½¥‘•¹Ñ¥Ñä½½µÁ…É¥Í½¸¡•­ÌÁ…ÍÌ¸)LÍå¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸)9¼™Õ±°µÍÕ¥Ñ”°É•¹‘•É•µ‰É½İÍ•È½È¹…Ñ¥Ù”¥A…AML±…¥µ•¸ÄÀÈÄÕÍ•ÈAMLÁÉ½Ñ•Ñ•¸)I•Ù¥•İ•ÄÀÈÈÍ¡•±°½É•½Ù•Éä½½µÁ…É¥Í½¸±Ñ½½±‰…È´ùÑ½Á‰…È±É½Õ¹­ÍÑÕ‘¥¼µÁ½±¥Í ´ù™…”µ±…å½ÕĞ(´ù‘É…İ•È…¹É•¹‘•Èµµ½‘”Á¥¹Ì½¡…Í¡•Ì¸%½¸½½É¹•È½Q½Ñ…±¥éµ¼ÄÀÈÄ±±½…°µÁ¥Ù½ĞÄÀÄä°)ÑÉ…¹Í™½É´½İ¹•ÉÌ±ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À±™É½é•¸‰•Ñ…Ì½¹…Ù¥…Ñ¥½¸½A…¥¹Ğ½UXÕ¹¡…¹•¸()AÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”ÑŒÄÁŒäÕ™•ŒÙŒÜÅ•…˜ÁŒÕŒÑÜİ‰˜äĞÀàÈäØÈÔÔÍ”ìÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”(ÀÁ˜àÑ™ŒĞÁˆäÜÙ…„á”ÄÙ‰”ÅˆäÔåŒåÁ˜ÜÀÙ‰‰„ä•ÅÕ…±Ì™•Ñ¡•½É¥¥¸½µ…¥¸•á…Ñ±ä¸)±°Äà‰±½‰Ì¡…Í µÙ•É¥™¥•‰•™½É”¹½¸µ™½É••áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”¸A…•ÌĞÀääÔÌÈØĞÜÄ)MUMLìÄØ¼ÄØ™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”èÍ¡•±°½µ…¹¥™•ÍĞ±¹•ÜÉ½Õ¹¼)MÑÕ‘¥¼½Ñ½½±‰…È½İ¹•ÉÌ±Á…É•¹Ğ½…¡”É…Á …¹Õ¹¡…¹•…•ÁÑ•A¥Ù½Ğ¥½¸±Q½Ñ…°)¥éµ¼±±½…°µÁ¥Ù½Ğ…¹ÁÉ½Ñ•Ñ•5Õ±Ñ¤Ä¸À¸!½ÍÑ•ĞÀääÔÌÈÜØÔÌ¥¹}ÁÉ½É•ÍÌ…ĞÁÉ½½˜ì)¹¼™Õ±°µÍÕ¥Ñ”½¹…Ñ¥Ù”¥A…AML±…¥µ•¸	Õ¥±ÄÀÈÈ1%Y€¼Id™½ÈÑ•ÍÑ¥¹œ¸)Y%ÄÀÈÈ¥¸MÑÕ‘¥¼è¥¹ÍÁ•Ğ™¥±±•É•äÁ±…¹”¥½¸‰•™½É”)Y%\ìÑ…ÀÑ¼É¥€¡Á±…¹”½½¹Ñ…ĞÍ¡…‘½Ü‘¥Í…ÁÁ•…È¤°Ñ…ÀÑ¼½™˜€¡É¥‘¥Í…ÁÁ•…ÉÌ¤°)Ñ…ÀÑ¼Á±…¹”€¡½É¥¥¹…°™±½½È½Í¡…‘½ÜÉ•ÑÕÉ¸¤¸=É‰¥Ğ…™Ñ•È•… ì¡•¬É•Á•…Ñ•å±”°)MÑÕ‘¥¼´ùM½±¥´ùMÑÕ‘¥¼É•Ñ…¥¹Ì¡½¥”°±•…¸Y¥•Ü¡¥‘•Ì½É•ÍÑ½É•ÌÍ•±•Ñ•É¥¸)9•áĞè¹…Ñ¥Ù”ÄÀÈÈ™••‘‰…¬ì9=4Ñ•áÑÕÉ”½A	HÉ•Ñ•¹Ñ¥½¸É•µ…¥¹ÌÍ•Á…É…Ñ•±äÅÕ•Õ•¸((ŒŒ€¸ÄÀÈÌƒŠPÉ¥Ù¥Í¥‰¥±¥Ñä€¼A¥Ù½ĞÍ¡½ÉÑÕÑÌ€¼Í•±•Ñ•µ…”•‘”Í¹…ÀƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÄÀÈÈAMLÁÉ½Ñ•ÑÌÑ½ÀµÉ¥¡ĞÁ±…¹”½É¥½½™˜å±”…¹½¹Ñ…ĞµÍ¡…‘½Ü¡¥‘¥¹œ¸)UÍ•ÈÉ•Á½ÉÑÌ=‰©•Ğ½‘”Á¥Ù½Ğµ•‘”…±¥¹µ•¹Ğİ½É­Ìİ•±°ìÁÉ½Ñ•ĞÑ¡½Í”İ½É­™±½İÌ¸)UÍ•ÈÉ•ÅÕ•ÍÑÌÄÀ”ÍÑÉ½¹•ÈÉ¥±½¹±äÑİ¼Á¥Ù½Ğ¥½¹Ì‘ÕÉ¥¹œA¥Ù½Ğ•‘¥Ñ¥¹œ±…¹É•Á…¥È)½˜Í•±•Ñ•µ…”•‘”…±¥¹µ•¹Ğ¸	…Í•±¥¹”µ…¥¸ÀÌÔÀÜÉˆÈ€¼ÉÕ¹Ñ¥µ”ÑŒÄÁŒäÕ˜€ ¸ÄÀÈÈ¤¸()=É¥¥¹…°É½Õ¹µÁ½±¥Í ½Á…¥Ñä¥¹É•…Í•ÌÉ•±…Ñ¥Ù•±äÄÀ”èMÑÕ‘¥¼€¸Äà´ø¸Ääà±½Ñ¡•È±½½­Ì(¸ÌĞ´ø¸ÌÜĞ¸=É¥¥¹…°™±½½Èå±”½…á•Ì½±•…¸µ…Í­Ì½½¹Ñ…ĞÍ¡…‘½Ü½İ¹•ÉÌÕ¹¡…¹•¸)=É¥¥¹…°½É¹•Èµ½¹ÑÉ½±Ì¡¥‘•Ì…±°Í¡½ÉÑÕĞ‰ÕÑÑ½¹Ì½É½ÕÁÌ•á•ÁĞA¥Ù½Ğ…¹)]½É±½1½…°İ¡¥±”•‘¥Ñ¥¹œì½É¥¥¹…°µ½‘”µÍÁ•¥™¥ŒÙ¥Í¥‰¥±¥ÑäÉ•ÑÕÉ¹Ì½¸•á¥Ğ¸)ÑÕ…°I¥éµ¼…á•Ì½Á±…¹•Ì½É¥¹ÌÁÉ•Ù¥•Ü…¹•¹ÑÉ”½dÑÕÉ¹¥¹œÉ•µ…¥¸Ù¥Í¥‰±”…¹)Õ¹¡…¹•¸A¥Ù½Ğ…ÉÑİ½É¬½Ñ½½±‰…È½¡¥ÍÑ½Éä…Ñ¥½¹ÌÕ¹¡…¹•ì¹¼‘ÕÁ±¥…Ñ”½¹ÑÉ½±Ì¸()I•ÁÉ½‘Õ•…”•ÉÉ½Èè„É…ä½¸„Í¡…É•Á½±å½¸•‘”…¸Í•±•ĞÑ¡”¹•¥¡‰½ÕÈÌ)É•¹‘•ÈÑÉ¥…¹±”±ÕÍ¥¹œ¥ÑÌ¹½Éµ…°•Ù•¸İ¡•¸…¹½Ñ¡•È™…”¥ÌÍ•±•Ñ•¸…”Á±…•µ•¹Ğ)¹½ÜÉ•ÅÕ•ÍÑÌÍ•±•Ñ•Á½±å½¹ÌìÁ•Èµ‘É…œÍÕÉ™…”½ÁÉ½‰•ÌÉ•Ñ…¥¸Ñ¡”±…Ñ¡•Á½±å½¸¸)9•…É•ÍĞµÍÕÉ™…”‘•ÁÑ Ñ¥•ÌÁÉ•™•ÈÍ•±•Ñ•™…”¸¥±Ñ•É¥¹œÉ…ä¡¥ÑÌ…±½¹”İ…Ì)¥¹ÍÕ™™¥¥•¹Ğ‰•…ÕÍ”•á…Ğ‰½Õ¹‘…ÉäÉ…åÌÍ½µ•Ñ¥µ•Ì¡¥Ğ½¹±ä=9…‘©…•¹ĞÑÉ¥…¹±”¸)I•…µ½¹±ä™…±±‰…¬É•½Ù•ÉÌÍ•±•Ñ•¹•¥¡‰½ÕÈ=91d½¸Ñ¡”Í…µ”…ÑÕ…°Í¡…É••‘”)½˜Ñ¡…Ğ…±É•…‘äµÙ¥Í¥‰±”¹•…É•ÍĞ‰½‘ä±ÕÍ¥¹œ½É¥¥¹…°µ•Í •‘•-•ä½™…•9½Éµ…°…¹„)‰½Õ¹‘•¹Õµ•É¥…°Ñ½±•É…¹”¸É½¹Ğµ™…¥¹œ¡•¬É•Ñ…¥¹•ì¹¼Ñ¡É½Õ µ½‰©•ĞÁ¥­¥¹œ°)¹•ÜÑÉ¥…¹Õ±…Ñ¥½¸±‘¥…½¹…°Í¹…ÁÌ±•½µ•ÑÉä½¡¥ÍÑ½Éä­•É¹•°½Èµ…Ñ•É¥…°•‘¥Ğ¸U¹É•±…Ñ•)Í•±•Ñ•Á½±å½¹Ì…¹½±Õ‘•½‰…¬™…•Ì…¹¹½Ğ‰•½µ”Ñ…É•ÑÌ¸=‰©•Ğ½‘”¥¹¥Ñ¥…°)Á¥­¥¹œÍÑ…åÌÕ¹É•ÍÑÉ¥Ñ•ì…±°µ½‘•ÌÉ•Ñ…¥¸•á¥ÍÑ¥¹œÄĞ¼ÈÁÁàµ…¹•Ğ…¹`½hÍ¥¸)Í•±•Ñ¥½¸İ¥Ñ É••¹d¹½Éµ…°¸É…™Ğ½…¹•°½½¹”µ¡•­Á½¥¹Ğ½U¹‘½I•‘¼½M…Ù•=Á•¸É•Ñ…¥¹•¸((ÜØ™½ÕÍ•¡•­ÌAML¼Á%0¼ÁÍ­¥ÀìÌ¹•Ü¡•­Ì¥¹±Õ‘”É•ÁÉ½‘Õ•ÁÉ”µ™¥à…”¹½Éµ…°)…¹Í¡½ÉÑÕĞµÙ¥Í¥‰¥±¥Ñä™…¥±ÕÉ•ÌÁ±ÕÌÑ¥±Ñ•µ•‘”=‰©•Ğ½‘”½…”µ½ÕÍ”½A•¹¥°½Ñ½Õ )Á…É¥Ñä…¹Õ¹Í•±•Ñ•½¡¥‘‘•¸µ™…”É•™ÕÍ…°¸É¥½Á…¥Ñä…ÍÍ•ÉÑ¥½¹Ì…‘‘•Ñ¼½É¥¥¹…°)™±½½Èµ½İ¹•ÈÑ•ÍÑÌ¸=É¥¥¹…°Á¥Ù½ĞÁÉ½©•Ñ¥½¸½Í•±•Ñ¥½¸½¡¥ÍÑ½Éä½½‘•Œ½…¹•°½½±ÕÍ¥½¸°)½É¹•È½Ñ½½±‰…È½=‰©•ÑÌ½±•…¸½Í¹…À½É•±•…Í”½…¡”½¥‘•¹Ñ¥Ñä½½µÁ…É¥Í½¸¡•­ÌÁ…ÍÌ¸)Må¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸9¼™Õ±°µÍÕ¥Ñ”½É•¹‘•É•µ‰É½İÍ•È½¹…Ñ¥Ù”¥A…AML±…¥µ•¸)I•Ù¥•İ•ÄÀÈÌÉ½Õ¹­Í¡…É•½É¹•È­Á¥Ù½ĞÁ…É•¹ÑÌ±Q½Ñ…±¥éµ¼±½‰©•Ğµµ…¹…•µ•¹Ğ°)Ù¥•İÁ½ÉĞµÑ½½±‰…È´ùÑ½Á‰…È±™…”µ±…å½ÕĞ´ù‘É…İ•È…¹É•½Ù•Éä½½µÁ…É¥Í½¸…¡”±½ÍÕÉ”¸)=Ñ¡•È¥µÁ½ÉĞµÁ…É•¹Ğ¡…¹•Ì…É”Á¥¹Ì½¹±ä¸QÉ…¹Í™½É´½İ¹•ÉÌ½5Õ±Ñ¤Ä¸À½™É½é•¸‰•Ñ…Ì°)…•ÁÑ•™±½½È½É•¹‘•È½ÍÑÕ‘¥¼µÁ½±¥Í …¹¹…Ù¥…Ñ¥½¸½A…¥¹Ğ½UXÕ¹¡…¹•¸()AÕ‰±¥Í¡•ÉÕ¹Ñ¥µ•ˆĞÕ„Í„å…Ù˜ÄÕˆÉÌäÑ”ÙŒá˜ÄÑ‘‘å™•ŒÄÌÄÑ”äìÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”)‰˜ÔäÔäÈÜäÙÄÕˆÄØÈÍ„Ôá‰”á„ĞĞÍ•˜ĞÜÅˆÌàÌÀÅ˜•ÅÕ…±Ì™•Ñ¡•½É¥¥¸½µ…¥¸•á…Ñ±ä¸)±°ÈÄ‰±½‰Ì¡…Í µÙ•É¥™¥•‰•™½É”¹½¸µ™½É••áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”¸A…•ÌĞÀääØØÔÔÀØÌ)MUMLìÄà¼Äà™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”èÍ¡•±°½µ…¹¥™•ÍĞ±É½Õ¹°)Á¥Ù½Ğ½½É¹•È½Q½Ñ…±¥éµ¼…¹Á…É•¹Ğ½…¡”É…Á Á±ÕÌÕ¹¡…¹•ÑÉ…¹Í™½É´½5Õ±Ñ¤Ä¸À¼)…•ÁÑ•É•¹‘•È½MÑÕ‘¥¼µÁ½±¥Í ½İ¹•ÉÌ¸!½ÍÑ•ĞÀääØØÔÔÔÔÄ¥¹}ÁÉ½É•ÍÌ…ĞÁÉ½½˜ì)¹¼™Õ±°µÍÕ¥Ñ”½¹…Ñ¥Ù”¥A…AML±…¥µ•¸	Õ¥±ÄÀÈÌ1%Y€¼Id™½ÈÑ•ÍÑ¥¹œ¸)Y%ÄÀÈÌèÉ¥ÍÕ‰Ñ±ä±•…É•ÈìA¥Ù½Ğ•‘¥ĞÍ¡½İÌ=91dA¥Ù½Ğ)…¹]½É±½1½…°Í¡½ÉÑÕÑÌ±•á¥ĞÉ•ÍÑ½É•Ì½É¥¥¹…°¥½¹Ìì…”Í•±•Ğ´ùA¥Ù½Ğ´ù‘É…œ)…É½ÍÌ™…”…¹Ñ¼É•…°•‘•Ì±`½h…±¥¹Ì…¹dÍÑ…åÌÍ•±•Ñ•µ™…”¹½Éµ…°±µ½‘•°)ÍÑ¥±°¸%¹±Õ‘”Í¡…É•µ•‘”ÍÑ…ÉĞ…¹É½Ñ…Ñ•™…”ì=‰©•Ğ½‘”ÅÕ¥¬Á…É¥Ñäì™¥¹¥Í °)1½…°ÑÉ…¹Í™½É´…¹U¹‘½I•‘¼¸9•áĞ¹…Ñ¥Ù”…”™••‘‰…¬ì9=4Ñ•áÑÕÉ”½A	HÅÕ•Õ•¸((ŒŒ€¸ÄÀÈĞƒŠPÉ•…‘…‰±”Õ¹‘•ÉÍ¥‘”±¥¡Ñ¥¹œ™½ÈMÑÕ‘¥¼…¹M½±¥ƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äAMM•Ì€¸ÄÀÈÌèÁÉ½Ñ•ĞÍÑÉ½¹•ÈÉ¥°A¥Ù½Ğµ½¹±äÍ¡½ÉÑÕÑÌ…¹)Í•±•Ñ•µ…”½Í¡…É•µ•‘”…±¥¹µ•¹Ğ¸	…Í•±¥¹”µ…¥¸ÜÔÄÕ‰”ØÄ½ÉÕ¹Ñ¥µ•ˆĞÕ„Í„å„¸)UÍ•ÈÉ•ÅÕ•ÍÑÌÉ•…‘…‰±”Õ¹‘•ÉÍ¥‘”Õ¹‘•È™Õ±°ÌØÀ½É‰¥Ğİ¥Ñ¡½ÕĞ•á•ÍÍ¥Ù”…µ‰¥•¹Ğ°)…¹ÍÕ•ÍÑÌÍ¡…‘½Üµ™É•”M½±¥™½Èµ½‘•±±¥¹œ¸()Õ‘¥Ğè•á¥ÍÑ¥¹œM½±¥ÕÍ•Ì½É¥¥¹…°MÑ…¹‘…Éµ…Ñ•É¥…°°½Ù•É¡•…­•äÌ¸È…¹)¡•µ¥ÍÁ¡•É”Ä¸Èİ¥Ñ ‘…É¬É½Õ¹½±½ÕÈìMÑÕ‘¥¼…‘‘ÌÑ¡É•”…‰½Ù”µµ½‘•°‘¥É•Ñ¥½¹…°)±¥¡ÑÌ¸=É¥¥¹…°É•¹‘•Èµµ½‘•Ì½İ¹•È¹½Ü…‘‘Ì=9É•ÕÍ…‰±”Í¡…‘½Üµ™É•”‘¥É•Ñ¥½¹…°)Õ¹‘•ÉÍ¥‘”™¥±°½ÕÑÍ¥‘”Ñ¡”MÑÕ‘¥¼É¥œ±½ÁÁ½Í¥¹œ½É¥¥¹…°‰…Í”­•ä€ ´Ğ°´Ü°´Ô¤¸)MÑÕ‘¥¼¥¹Ñ•¹Í¥Ñä€¸äÔìM½±¥Ä¸Ø¸¥É•Ñ¥½¸¥Ì¥¹‘•Á•¹‘•¹Ğ½˜µ½‘•°Á½Í¥Ñ¥½¸½Í…±”¸)9¼¥¹É•…Í”Ñ¼¡•µ¥ÍÁ¡•É”¥¹Ñ•¹Í¥Ñä½É½Õ¹½±½ÕÈ½È•µ¥ÍÍ¥Ù”µ…Ñ•É¥…°°¹¼•áÑÉ„)Í¡…‘½Üµ…À½É•¹‘•É•È½™É…µ”…±±‰…¬½¥¹ÁÕĞ½İ¹•È¸=É¥¥¹…°MÑÕ‘¥¼‘•™…Õ±Ğ°™±½½È°)Í¡…‘½İÌ°-•ä½¥±°½I¥´½¹ÑÉ½±Ì…¹MÑÕ‘¥¼Á½±¥Í ±¥¡Ğµ‘¥Í½Ù•ÉäÉ•µ…¥¸Õ¹¡…¹•¸)M½±¥É•Ñ…¥¹ÌÍ¡…‘½İ5…À‘¥Í…‰±•¸¥±°¡¥‘‘•¸¥¸•Ù•Éä½Ñ¡•È±½½¬ìÉ•Á•…Ñ•µ½‘”¼)‰½‘äÕÁ‘…Ñ•ÌÉ•ÕÍ”¥Ğ¸Ñ¥Ù”½¥¹…Ñ¥Ù”½Á…¥¹ĞÍÕÉ™…•ÌÍ¡…É”•á¥ÍÑ¥¹œÍ•¹”±¥¡ÑÌ¸)9¼•½µ•ÑÉä°Í•±•Ñ¥½¸°¡¥ÍÑ½Éä°UX½A…¥¹Ğ‘…Ñ„°A¥Ù½Ğ½È¹…Ù¥…Ñ¥½¸¡…¹•Ì¸((ĞØ™½ÕÍ•¡•­ÌAML¼Á%0¼ÁÍ­¥À°¥¹±Õ‘¥¹œÈ¹•Ü…ÑÕ…°µ½İ¹•È½É•…°µQ¡É•”Ñ•ÍÑÌè)…±°Í¥àM½±¥ÁÉ¥¹¥Á…°¹½Éµ…±ÌÉ••¥Ù”‘¥É•Ñ¥½¹…°•¹•Éä°‰½ÑÑ½´½Ñ½À‘¥É•Ğ)ÍÑÉ•¹Ñ É…Ñ¥¼€¸Ô°½É¥¥¹…°…µ‰¥•¹ĞÕ¹¡…¹•°¹¼…‘‘•Í¡…‘½Ü°µ½‘”¥Í½±…Ñ¥½¸°)MÑÕ‘¥¼½É¥¥¹…°Ì‘¥É•Ñ¥½¹…°±¥¡ÑÌ°É•ÕÍ”…¹µ½‘•°µÉ•Í½ÕÉ”ÁÉ•Í•ÉÙ…Ñ¥½¸¸)á¥ÍÑ¥¹œÉ•¹‘•È½…•É½ÕÁÌ½½µµ¥ÑÑ•Á…¥¹Ğ½™±½½Èµ½¹Ñ…Ğ½É•±•…Í”½¥‘•¹Ñ¥Ñä½½µÁ…É¥Í½¸)¡•­ÌÁ…ÍÌìÍå¹Ñ…à½İ¡¥Ñ•ÍÁ…”±•…¸¸±½½ÈÑ•ÍĞÌ¥Í½±…Ñ•Íå¹MÑÕ‘¥¼¡…É¹•ÍÌ¹½Ü)ÍÑÕ‰ÌÑ¡”¹•Ü±¥¡Ñ¥¹œ¡•±Á•È½¹±äì…±°É½Õ¹…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸9¼‰É½İÍ•È¼)¹…Ñ¥Ù”¥A……ÁÁ•…É…¹”½È™Õ±°µÍÕ¥Ñ”Á•É™½Éµ…¹”±…¥´™É½´Ñ¡•Í”µ…Ñ ½9½‘”¡•­Ì¸()I•Ù¥•İ•ÄÀÈĞ‘¥É•ĞÉ•¹‘•ÈÁ¥¸…¹Í¡•±°µ…É­•ÉÌ±½µÁ…É¥Í½¸µ¥É…Ñ¥½¸É•Ñ…¥¹ÌÄÀÈÌ)É…Ñ¥¹Ìì…¹½¹¥…°É•±•…Í”´ù™…”µ±…å½ÕĞ´ù‘É…İ•È…¡”±½ÍÕÉ”É•™É•Í¡•€¡¥µÁ½ÉĞµ½¹±ä¤¸)5Õ±Ñ¤Ä¸ÀÉ•µ…¥¹Ì•á…Ğ	•Ñ„Ø½Á¥¸Ä¸Àì™É½é•¸‰•Ñ…Ì…¹…±°½Ñ¡•ÈÉÕ¹Ñ¥µ”½İ¹•ÉÌÉ•Ñ…¥¹•¸)AÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”äÁˆÌÄÔĞÅ…ÍŒØÈÅŒá‘ààäÜİ˜ÀÌÙ”Í•˜äÔÔÕ˜ì™•Ñ¡•½É¥¥¸½µ…¥¸ÑÉ•”)™Ù„ÀÉ”ÑˆÅ”á”ÀÜĞÀÄÙ„ÈàØå•˜ĞÜÔĞĞÄÔÔÌàÈ•á…Ñ±äµ…Ñ¡•ÌÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”¸)±°ÄÌ¡…¹•‰±½‰Ì¡…Í µÙ•É¥™¥•‰•™½É”¹½¸µ™½É••áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”¸)A…•ÌĞÄÀÀäÔÜØàÈĞMUMLìÄÈ¼ÄÈ™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ Ñ•ÍÑ•Í½ÕÉ”èÍ¡•±°°)µ…¹¥™•ÍĞ±É•¹‘•È½İ¹•È±…¹½¹¥…°…¡”É…Á ±½µÁ…É¥Í½¸…¹Õ¹¡…¹•5Õ±Ñ¤½A¥Ù½Ğ¼)É½Õ¹½MÑÕ‘¥¼µÁ½±¥Í ¸!½ÍÑ•ĞÄÀÀäÔÜÜØÀÄ¥¹}ÁÉ½É•ÍÌ…ĞÁÉ½½˜±¹½Ğ±…¥µ•AML¸)	Õ¥±ÄÀÈĞ1%Y€¼Id™½È¥A…±¥¡Ñ¥¹œµ‰…±…¹”Ñ•ÍÑ¥¹œ¸9¼¹…Ñ¥Ù”Ù¥ÍÕ…°AML¸)Y%ÄÀÈĞèMÑÕ‘¥¼½É‰¥Ğ‰•±½Üµ½‘•°°©Õ‘”Õ¹‘•ÉÍ¥‘”É•…‘…‰¥±¥Ñä…¹Í¡…Á”½¹ÑÉ…ÍĞì)Y%\´ùM½±¥É•Á•…Ğ™Õ±°½É‰¥Ğ°Í¡…‘½Üµ™É•”µ½‘•±±¥¹œìÍİ¥Ñ MÑÕ‘¥¼½M½±¥½…•É½ÕÁÌ)…¹‰…¬°™±½½È½É¥½½™˜Í…¹¥Ñäìµ½Ù”µ½‘•°½½É‰¥Ğ…¹½¹™¥É´½¹Í¥ÍÑ•¹Ğ™¥±°¸)9•áĞ¹…Ñ¥Ù”±¥¡Ñ¥¹œµ‰…±…¹”™••‘‰…¬ì9=4Ñ•áÑÕÉ”½A	HÉ•Ñ•¹Ñ¥½¸Í•Á…É…Ñ•±äÅÕ•Õ•¸((ŒŒ€¸ÄÀÈĞÕÍ•ÈAMLƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äÉ•Á½ÉÑÌƒŠpÄÀÈĞAMOŠt¸AÉ½Ñ•Ğ…•ÁÑ•MÑÕ‘¥¼½M½±¥Õ¹‘•ÉÍ¥‘”)É•…‘…‰¥±¥Ñäè½É¥¥¹…°É•¹‘•È½İ¹•ÈÕ¹‘•ÉÍ¥‘”™¥±°€¸äÔMÑÕ‘¥¼¼Ä¸ØM½±¥°Õ¹¡…¹•)…µ‰¥•¹Ğ…¹MÑÕ‘¥¼½¹ÑÉ½±ÌìM½±¥É•µ…¥¹ÌÍ¡…‘½Üµ™É•”¸€¸ÄÀÈÌAMLÉ•Ñ…¥¹•¸)!½ÍÑ•™Õ±°É•É•ÍÍ¥½¸ĞÄÀÀäÔÜÜØÀÄ¹½Ü½µÁ±•Ñ•MUML€¡É•¡•­•…™Ñ•È™••‘‰…¬¤¸)IÕ¹Ñ¥µ”É•µ…¥¹ÌäÁˆÌÄÔĞ€¼‰Õ¥±À¸ÌØ¸Äà¸ÄÀÈĞì…•ÁÑ…¹”‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä°¹¼¹•Ü)ÉÕ¹Ñ¥µ”‰Õ¥±½Èµ…¹‘…Ñ½Éä¡…¹‘Ìµ½¸Ñ•ÍĞ¸9•áĞ…İ…¥ĞÕÍ•È‘¥É•Ñ¥½¸ì9=4Ñ•áÑÕÉ”¼)A	HÉ•Ñ•¹Ñ¥½¸É•µ…¥¹ÌÅÕ•Õ•¸á¥ÍÑ¥¹œ¹…Ù¥…Ñ¥½¸½A¥Ù½Ğ½™±½½ÈÁÉ½Ñ•Ñ¥½¹ÌÉ•Ñ…¥¹•¸((ŒŒ€¸ÄÀÈÔƒŠP¹…Ñ¥Ù”9=4µ…ÀÉ•Ñ•¹Ñ¥½¸…¹Ù¥•İÁ½ÉĞ½±½ÕÈƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸ÄÀÈĞAMLÁÉ½Ñ•Ñ•ìÕÉÉ•¹Ğ‰…Í•±¥¹”µ…¥¸ÑŒĞÔÄÌáŒ½ÉÕ¹Ñ¥µ•äÁˆÌÄÔĞ¸)UÍ•ÈÉ•ÅÕ•ÍÑÌÉ•ÑÕÉ¹¥¹œÑ¼¹…Ñ¥Ù”9=4Ñ•áÑÕÉ”Ù¥•İÁ½ÉĞİ½É¬…¹€½¹•áÑ‰Õ¥±¸)Õ‘¥Ğ½¹™¥ÉµÌÄÀÄÔ¥µÁ½ÉÑ•È¥¹½É•µ…Ñ•É¥…°½¥µ…•Ìì•á¥ÍÑ¥¹œUX¥µ…”½Ù•É±…ä°)É•Í½ÕÉ”Á½½°½½‘•Œ…¹¹…Ñ¥Ù”9=4•áÁ½ÉÑ•È…É”…ÕÑ¡½É¥Ñ…Ñ¥Ù”¸M•”)‘½Ì½¹½µ…µµ…Ñ•É¥…°µÉ•Ñ•¹Ñ¥½¸´ÄÀÈÔ¹µ‘€™½È¥µÁ±•µ•¹Ñ…Ñ¥½¸…¹•á…ĞÍ½Á”¸()9…Ñ¥Ù”Í½ÕÉ”è¹½µ…œÉ•Í½ÕÉ”ÍÑ½É•Ìµ…Ñ•É¥…°)M=8€¬•¹½‘•É•™•É•¹•¥µ…•Ì°)½É¥¥¹…°UYÌ…¹¥µÁ½ÉĞ™¥Ğ¸I•Í½ÕÉ”•¹Ù•±½Á•ØĞÕÍ•Ìa%MQ%9ÈÑ5¥¥µ…”Á½½°¼)ÑÉ…¹ÍÁ½ÉĞìÍÑÉ¥Ğ	½á1…ˆUYØÌ…¹1	ØÄ½ØÈÕ¹¡…¹•¸9¼™…­”1ÁÉ½Ù•¹…¹”¸)=É¥¥¹…°9=4İÉ¥Ñ•È½Á¥•Ì•Ù•Éä¹…Ñ¥Ù”Ñ•áÑÕÉ”Í±½Ğ½‰åÑ”½Í•ÑÑ¥¹Ì€¡¥¹±Õ‘¥¹œ)½Á…¥Ñä½•µ¥ÍÍ¥Ù”¼ÄØµ‰¥Ğ‘¥ÍÁ±…•µ•¹Ğ…¹Í•Á…É…Ñ”Í…±…Èµ…ÁÌ¤±É•µ…ÁÌ¥µ…”¥¹‘¥•Ì°)¹•Ù•È•¹Ñ•ÉÌ1Á…­•½¹Ù•ÉÍ¥½¸¸áÁ½ÉĞµ±½…°™¥ĞÉ•Ù•ÉÍ…°ÁÉ•Í•ÉÙ•ÌÍ½ÕÉ”)İ½É±Á½Í¥Ñ¥½¹Ì½Õ¹¥ÑÌ¸á¥ÍÑ¥¹œÑ½Á½±½äÍ¥¹…ÑÕÉ”É•™ÕÍ•ÌÍÑ…±”Ñ•áÑÕÉ••áÁ½ÉĞì)É•Í½ÕÉ•ÌÉ•µ…¥¸Í…Ù•½U¹‘¼µÉ•ÍÑ½É…‰±”¸9…Ñ¥Ù”UX•‘¥Ñ¥¹œÉ•µ…¥¹ÌÉ•™ÕÍ•¥¹¥Ñ¥…±±ä¸()MÑÕ‘¥¼½M½±¥…ÕÑ¼µ‘¥ÍÁ±…äÍÕÁÁ½ÉÑ•½Á…ÅÕ”A9½)AUX½ÕÑ¼½±½ÕÈµ…ÁÌÙ¥„½É¥¥¹…°)UX½Ù•É±…ä½‰Õ¥±‘•½µ•ÑÉä½‘•½‘”½‘¥ÍÁ½Í…°İ¥Ñ Í•¹”µ±¥ĞMÑ…¹‘…Éµ…Ñ•É¥…°¸=É¥¥¹…°)UX%µ…”¥ÌÕ¹±¥Ğ¥¹ÍÁ•Ñ¥½¸¸á¥ÍÑ¥¹œ¹½Éµ…±Ì±Í…±…Èµ…Ñ•É¥…°½¹ÍÑ…¹ÑÌ…¹Í•¹”)±¥¡Ñ¥¹œÉ•Ñ…¥¹•ì½Ñ¡•ÈÑ•áÑÕÉ”µ…ÁÌ9=P‘¥ÍÁ±…å•å•Ğ¸=É¥¥¹…°‰½‘äÁ¥­¥¹œ°)Í•±•Ñ¥½¸½¡¥ÍÑ½Éä½•½µ•ÑÉä…¹ÄÀÈĞ±¥¡Ñ¥¹œÕ¹¡…¹•¸M½ÕÉ”UYÌÉ•Ñ…¥¹•ìÍ…±”(ÕàÔÉ•ÍÁ•Ñ•¸I½Ñ…Ñ¥½¸½ÑÉ…¹Í±…Ñ¥½¸±ÑÉ¥Á±…¹…È±ÑÉ…¹ÍÁ…É•¹ä…É”É•Ñ…¥¹•µ½¹±ä¸9…Ñ¥Ù”)¹½‘”½ÁÉ½•‘ÕÉ…°ÍÑÉÕÑÕÉ”½±½…°µÑÉ¥Á±…¹…È™¥‘•±¥Ñä…™Ñ•È‰…­•ÑÉ…¹Í™½ÉµÌ¹½Ğ±…¥µ•¸)	Õ‘•ĞĞÍÕÉ™…•Ì¼ÈÀ°ÀÀÁ½É¹•ÉÌ•… ¼á5¥Í½ÕÉ”¥µ…”¼ÄÀÈÑÍÅÕ…É”‘•½‘•ÁÉ•Ù¥•Ü¸)!¥‘‘•¸½É•™•É•¹”½±¥¹­•½µ½‘¥™¥•È½ÁÉ½•‘ÕÉ…°Õ…É‘ÌÉ•Ñ…¥¹•¸Q•áÑÕÉ•¹…Ñ¥Ù”1)•áÁ½ÉĞ•áÁ±¥¥Ñ±äÉ•™ÕÍ•ÌÉ…Ñ¡•ÈÑ¡…¸‘É½ÁÁ¥¹œµ…ÁÌì9=5¼¹‰½á±…ˆÉ•Ñ…¥¸Ñ¡•´¸)U¹Ñ•áÑÕÉ•9=4•½µ•ÑÉä½UX1Á…Ñ É•Ñ…¥¹•¸I%5A=IP½É¥¥¹…°¹¹½´ì½±ÁÉ½©•ÑÌ)…¹¹½ĞÉ•½Ù•Èµ…ÁÌÁÉ•Ù¥½ÕÍ±ä‘¥Í…É‘•‰äÄÀÄÔ¸()M¥à¹•Ü…ÑÕ…°µ½İ¹•È½É•…°µQ¡É•”Ñ•ÍÑÌ½Ù•È…±°Í±½ÑÌ½É…Ü¡…Í¡•Ì¼ÄØµ‰¥Ğ½Á½½±•­¥¹±¥¹”)M…Ù•=Á•¸½‰É½İÍ•È9=4•áÁ½ÉĞ½Í½ÕÉ”Õ¹¥ÑÌ±‘¥ÍÁ…Ñ¡•È½µ…±™½Éµ•½ÍÑ…±”É•™ÕÍ…°±±¥ĞÕà)ÍÕÉ™…”½Á¥­¥¹œ½…Ñ¥Ù”­¥¹…Ñ¥Ù”Õ…É‘Ì½…¹•°½‘¥ÍÁ½Í…°½‘¥ÍÁ±…ä‰Õ‘•ÑÌ¸=É¥¥¹…°)Íå¹Ñ¡•Ñ¥ŒÁ…¥¹Ğµİ…É¹¥¹œ™¥áÑÕÉ”¹½Ü¡…ÌÙ…±¥•µÁÑäµ…Ñ•É¥…°ì½É¥¥¹…°…ÍÍ•ÉÑ¥½¹Ì)É•Ñ…¥¹•±¹•ÜÑ•ÍÑÌ•áÁ±¥¥Ñ±äÉ•©•Ğ¥¹Ù…±¥µ…Ñ•É¥…°½¥µ…”É•™Ì¸ÄÔä™½ÕÍ•¡•­Ì)AMLì™¥¹…°™Õ±°±½…°9½‘”ÈĞ¸ÈÈ¸ÄÍÕ¥Ñ”ÌÀÈÈAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÄÀ¸ÌÉÌ¤¸)Må¹Ñ…à½‘¥™˜±•…¸¸)I•…°5@QMP…¹5@QMP Ä¤‰½Ñ ¥±”µ¥µÁ½ÉĞ´ù™¥Ğ´ùÁ½½±•M…Ù•=Á•¸´ù‰É½İÍ•È9=4´ø)Á…ÉÍ”AMLè•á…Ğ½±½ÕÈ¥µ…”¡…Í ½Í•ÑÑ¥¹Ì…¹ÕàÔÉ•Á•…Ğ±Í½ÕÉ”İ½É±‘Á½Í¥Ñ¥½¹Ì)İ¥Ñ¡¥¸É”´ØìĞäÙØ¼ÔÀÑ˜Õ‰”…¹ÜäÄÅØ¼ÜäÄÙ˜Q•áĞÁÉ•Í•ÉÙ•¸AÉ¥Ù…Ñ”™¥±•Ì¹½Ğ½µµ¥ÑÑ•¸)9¼É•¹‘•É•µ‰É½İÍ•È½¹…Ñ¥Ù”¥A…½È½µÁ±•Ñ”A	H½Ù•ÉÑ•àµÁ…¥¹Ğ™¥‘•±¥Ñä±…¥´¸()I•Ù¥•İ•ÄÀÈÔÉ•Í½ÕÉ”½½‘•Œ½Á…¥¹Ğ½•áÁ½ÉĞ½¥µÁ½ÉĞ½É•¹‘•È½½Ù•É±…äÁ…É•¹ÑÌ…¹…¹½¹¥…°)É•±•…Í”´ù™…”µ±…å½ÕĞ´ù‘É…İ•È½UX1…ˆ±½ÍÕÉ”ìµ½ÍĞÁ…É•¹Ğ‘¥™™Ì…É”¥µÁ½ÉĞÁ¥¹Ì½¹±ä¸)•ÁÑ•ÄÀÈĞ…ÑÕ…°±¥¡Ğ½‘”±µ…¥¸½5Õ±Ñ¤Ä¸À½™É½é•¸‰•Ñ…Ì…¹•½µ•ÑÉä­•É¹•±ÌÉ•µ…¥¸¸)9¼¹•Ü½Ñ•ÍĞ‰…Ñ ¸)AÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”ˆÜÔÀÜäÈÀá˜ÅˆÅ™ŒÍ„äÔĞÙŒààÔÑŒÁ•„á„äÔÑ…˜Ùì™•Ñ¡•½É¥¥¸½µ…¥¸ÑÉ•”(àÁ™‘…ŒÈÀåÅ„äÜÜáŒİ„àØÔÁ™”àÜÁˆäÀÅŒá™ŒÉ‰˜Ì•ÅÕ…±ÌÑ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”•á…Ñ±ä¸)±°Ìä¡…¹•‰±½‰ÌÙ•É¥™¥•‰•™½É”¹½¸µ™½É••áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”¸A…•Ì(ĞÄÀÄÈÌÈäÀÜàMUMLì¡½ÍÑ•™Õ±°É•É•ÍÍ¥½¸ĞÄÀÄÈÌÈäÄĞÄ½µÁ±•Ñ•MUML¸(Äà¼ÈÜ™É•Í ±¥Ù”™¥±”‰åÑ”µ…Ñ¡•ÌìÉ•µ…¥¹¥¹œäÉ•ÅÕ•ÍÑÌÑ¥µ•½ÕĞ…Ğ¹•Ñİ½É¬ÁÉ½áä°)¹½Ğ½Õ¹Ñ•AML¸1¥Ù”‰É½İÍ•ÈÍ•Á…É…Ñ•±ä½¹™¥ÉµÌÑ¥Ñ±”½‘…Ñ„½Ù¥Í¥‰±”ÄÀÈÔ…¹…±°)Í¥àÉ•¹‘•È½¥µÁ½ÉĞ½•áÁ½ÉĞ½½‘•ŒµÁ…É•¹Ğ½É•±•…Í”Í¡•±°Á¥¹ÌÄÀÈÔ¸	É½İÍ•ÈÌ]•‰0¥Ì)•áÁ±¥¥Ñ±ä%M	1±Í¼¹¼É•¹‘•É•ÍÑ…ÉÑÕÀ½Ñ•áÑÕÉ”Ù¥ÍÕ…°½È¹…Ñ¥Ù”¥A…AML±…¥´¸)	Õ¥±ÄÀÈÔA1=e€¼Id™½È¹…Ñ¥Ù”½±½ÕÈ½É½Õ¹µÑÉ¥ÀÑ•ÍÑ¥¹œ¸9¼ÉÕ¹Ñ¥µ”•‘¥ÑÌ)…™Ñ•È™¥¹…°™Õ±°ÌÀÈÉAML¸AÕ‰±¥…Ñ¥½¸ÁÉ½½˜¥Ì‘½Õµ•¹Ñ…Ñ¥½¸µ½¹±ä¸)Y%ÄÀÈÔÉ•¥µÁ½ÉĞ5@QMP¹¹½´¥¸MÑÕ‘¥¼½M½±¥ì½±½ÕÈÁ…ÑÑ•É¹•Õ‰”Ù¥Í¥‰±”İ¥Ñ )½ÉÉ•ĞÕàÑ¥±¥¹œ±½É‰¥Ğ½Í•±•Ğ½5½Ù”¸M…Ù•=Á•¸¹‰½á±…ˆÉ•Ñ…¥¹ÌÑ•áÑÕÉ”¸áÁ½ÉĞ9=5°)½Á•¸¥¸9½µ……¹½µÁ…É”Ñ•áÑÕÉ”½Ñ¥±¥¹œ¸Mİ¥Ñ ±½½­Ì½U¹‘½I•‘¼ìÄÀÈĞÕ¹‘•ÉÍ¥‘”…¹)™±½½Èå±”Í…¹¥Ñä¸9•áĞ¹…Ñ¥Ù”½±½ÕÈ™••‘‰…¬±Ñ¡•¸¹½Éµ…°½Í…±…È½•µ¥ÍÍ¥Ù”ÁÉ•Ù¥•Ü)Ñ¡É½Õ Í…µ”É•Ñ…¥¹•µÉ•Í½ÕÉ”½İ¹•Èì½Á…¥Ñä½‘¥ÍÁ±…•µ•¹Ğ‘¥ÍÁ±…äÉ•µ…¥¸‘•™•ÉÉ•¸((ŒŒ€¸ÄÀÈØƒŠP¹…Ñ¥Ù”9=4¹½Éµ…°€¼É½Õ¡¹•ÍÌ€¼µ•Ñ…±¹•ÍÌÙ¥•İÁ½ÉĞƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äAMM•ÌÄÀÈÔ…¹É•ÅÕ•ÍÑÌ€½¹•áÑ‰Õ¥±¸AÉ½Ñ•Ğ…•ÁÑ•¹…Ñ¥Ù”½±½ÕÈ¼(ÕàÑ¥±¥¹œ±É•Ñ…¥¹•µ…ÁÌ½M…Ù•=Á•¸½9=4½Í½ÕÉ”µÕ¹¥ĞÁ¥Á•±¥¹”…¹ÄÀÈĞ±¥¡Ñ¥¹œ¸	…Í•±¥¹”)µ…¥¹ˆÈÁ˜ØÌÁ½ÉÕ¹Ñ¥µ•ˆÜÔÀÜäÈÀ¸Õ‘¥Ğ½É¥¥¹…°É•Í½ÕÉ”½UXµ¥µ…”½‘•½‘•È…¹•á¥ÍÑ¥¹œ)Á…¥¹ĞÉ•™±•Ñ¥½¸Á½½°äÈÔì¹¼Á…É…±±•°µ…Ñ•É¥…°½•½µ•ÑÉä½Á¥­¥¹œ½¡¥ÍÑ½Éä½İ¹•È¸()á¥ÍÑ¥¹œMÑÕ‘¥¼½M½±¥9=4½±½ÕÈ½Ù•É±…ä…‘‘Ì±¥¹•…ÈÑ…¹•¹Ğ¹½Éµ…±5…À€¡™…Ñ½É9½Éµ…°°)¹½Éµ…±}¹•}ä½±•…ä™±¥Á}ä¤±Í•Á…É…Ñ”½Á…ÅÕ”IeM1É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌµ…ÁÌ…¹)Í…Ù•™…Ñ½ÉI½Õ¡¹•ÍÌ½™…Ñ½É5•Ñ…±¹•ÍÌ¸%¹‘•Á•¹‘•¹ĞÍÕÁÁ½ÉÑ•UX½ÕÑ¼½É•Á•…ĞÍ…µÁ±¥¹œ¸)…Ñ„‘•½‘”ÕÍ•Ì¹¼½±½ÕÈ½¹Ù•ÉÍ¥½¸½ÁÉ•µÕ±Ñ¥Á±¥…Ñ¥½¸ìÍ…±…È…¹Ù…ÌÉ•Á±¥…Ñ•Ì)Ù…±¥‘…Ñ•É•ä¥¹Ñ¼I™½ÈQ¡É•”½É•…‘Ì¸½±½ÕÉ•½ÑÉ…¹Í±Õ•¹ĞÍ…±…ÉÌÍÑ…ä)É•Ñ…¥¹•µ½¹±äÉ…Ñ¡•ÈÑ¡…¸Õ•ÍÍ¥¹œ„¡…¹¹•°¸½±½ÕÈ…ÁÁ•…ÉÌ™¥ÉÍĞì™…¥±•½Õ¹ÍÕÁÁ½ÉÑ•)…Õá¥±¥…Éä­••ÁÌ¥Ğ¸±İ…åÌµÕ¹±¥Ğ…¹UX%µ…”É•µ…¥¸…•ÁÑ•½±½ÕÈµ½¹±ä¥¹ÍÁ•Ñ¥½¸¸)5•Ñ…±±¥Œµ…Àµ…Ñ•É¥…±ÌÉ•ÕÍ”•á…ĞäÈÔÍ¡…É•½É•™½Õ¹Ñ•É½½´A5I4¥˜Í•¹”¡…Ì¹¼)•áÁ±¥¥Ğ•¹Ù¥É½¹µ•¹Ğìµ…Ñ•É¥…°µ½¹±ä±Õ¹…Ù…¥±…‰±”ATÉ…•™Õ±±äÕÍ•Ì‘¥É•Ğ±¥¡ÑÌ¸)=É¥¥¹…°Í½ÕÉ”‰åÑ•Ì±‰¥Ğ‘•ÁÑ ±µ…Ñ•É¥…°)M=8±½‘•Œ½¥µÁ½ÉĞ½•áÁ½ÉĞ‰•¡…Ù¥½ÈÕ¹¡…¹•¸()	½Õ¹‘ÌÑ¹…Ñ¥Ù”ÍÕÉ™…•Ì¼ÈÁ¬½É¹•ÉÌ•… ì½±½ÕÈ­¹½Éµ…°ÄÀÈÑÍÅÕ…É”½Í…±…ÉÌÔÄÉÍÅÕ…É”ì)½µ‰¥¹•Õ¹¥ÅÕ”•¹½‘•¡½¥•Ìğôá5¥Á•ÈÍÕÉ™…”¸=É¥¥¹…°ÈÑ5¥É•Ñ…¥¹•Á½½°¸)=Á…¥Ñä½•µ¥ÍÍ¥Ù”½‘¥ÍÁ±…•µ•¹ĞÍÑ¥±°É•Ñ…¥¹•µ½¹±äì½±½ÕÈÍ½ÕÉ”ÍÑ¥±°É•ÅÕ¥É•ì)ÑÉ…¹Í±…Ñ¥½¸½É½Ñ…Ñ¥½¸½ÑÉ¥Á±…¹…ÈÉ•µ…¥¸Õ¹ÍÕÁÁ½ÉÑ•‘¥ÍÁ±…ä¸9¼¹•Ü‘•¹Í”•½µ•ÑÉä°)¹•ÜÍÑ…ÉÑÕÀ‘•™…Õ±Ğ½È¡…¹”Ñ¼ÄÀÈĞ™±½½È½±¥¡ÑÌ½¹…Ù¥…Ñ¥½¸½A¥Ù½Ğ½Í•±•Ñ¥½¸½A…¥¹Ğ¸)9=4¥µÁ½ÉĞÍÑ…ÑÕÌ¹½Ü‘•ÍÉ¥‰•ÌÍÕÁÁ½ÉÑ•¹½Éµ…°½É…åÍ…±”Í…±…ÈÁÉ•Ù¥•Ü¡½¹•ÍÑ±ä¸()M¥à¹•Ü…ÑÕ…°µ½İ¹•È½É•…°µQ¡É•”Ñ•ÍÑÌ½Ù•ÈÁ±…¹Ì½™…Ñ½ÉÌ½d½Á•Èµµ…ÀÑÉ…¹Í™½ÉµÌ°)±¥¹•…È‘•½‘•È½É…åÍ…±”½…±Á¡„½É•™ÕÍ…±Ì±…¹•°½±…Ñ”½¹¼µ•áÑÉ„µÍÑ…ÉĞ±É•™±•Ñ¥½¸±•…¹ÕÀ¼)•áÁ±¥¥Ğ•¹Ù¥É½¹µ•¹Ğ±Õ¹±¥Ğ½UY%µ…”±M…Ù•=Á•¸½9=4‰åÑ”ÍÑ…‰¥±¥Ñä…¹…ÑÕ…°MÑÕ‘¥¼½M½±¥)¥¹Ñ•É…Ñ¥½¸½Á¥­¥¹œ½Í½ÕÉ”•½µ•ÑÉä¸á¥ÍÑ¥¹œÄÀÈÔ½±½ÕÈµ½¹±ä‰…Í•±¥¹”™¥áÑÕÉ•Ìµ…‘”)•áÁ±¥¥Ñ±ä½±½ÕÈµ½¹±äì10½É¥¥¹…°½±½ÕÈ…ÍÍ•ÉÑ¥½¹Ì½…±°µµ…ÀÉ•Ñ•¹Ñ¥½¸Ñ•ÍÑÌ­•ÁĞ¸(ÄÔÜ™½ÕÍ•AML¼Á%0¼ÁÍ­¥À¸¥¹…°™Õ±°±½…°9½‘”ÈĞ¸ÈÈ¸ÄÍÕ¥Ñ”ÌÀÈàAML¼Á%0¼(ÁÍ­¥À¼Á…¹•°€ ÄàÌ¸ĞáÌ¤ì¡…¹•)LÍå¹Ñ…à½‘¥™˜±•…¸¸±½Õ]•‰0İ…Ì‘¥Í…‰±•‘ÕÉ¥¹œÄÀÈÔì¹¼¹•Ü‰É½İÍ•È½AT½È)¹…Ñ¥Ù”ÄÀÈØÙ¥ÍÕ…°…•ÁÑ…¹”±…¥µ•¸•Ñ…¥±Ì½‘½Ì½¹½µ…µÁ‰ÈµÁÉ•Ù¥•Ü´ÄÀÈØ¹µ¸()•¹•É¥ŒÉ•…‘äµÑ¼µ¥µÁ½ÉĞ9=5}A	I|ÄÀÈØ¹¹½´€ Üä°ÈäÉ‰åÑ•Ì¤ÍÕÁÁ±¥•Í•Á…É…Ñ•±äèÌÕ‰•Ì°)¹½Éµ…°­É½Õ¡¹•ÍÌ€¼µ•Ñ…±±¥Œ­É½Õ¡¹•ÍÌ€¼½±½ÕÈ½¹ÑÉ½°¸=É¥¥¹…°ÁÉ½•‘ÕÉ…°ÄÈáµ…ÁÌ°)¹¼ÁÉ¥Ù…Ñ”…ÉÑİ½É¬ìÉ••¹•É…Ñ”™É½´Ñ•ÍÑÌ½¡•±Á•ÉÌ½¹½µ…µÁ‰Èµ™¥áÑÕÉ”¹µ©Ì¸9¼ÕÍ•È…Í­Ì)Ñ¼½¹ÍÑÉÕĞ‰…­•¹™¥áÑÕÉ•Ì¸I•Ù¥•İ•ÄÀÈØ¡¥±½Á…É•¹Ğ½…¡”±½ÍÕÉ”¥¹°½É¥¥¹…°)UX‘•½‘•È´ùİ½É­ÍÁ…”½1…ˆ½•áÁ½ÉÑÌ…¹…¹½¹¥…°É•±•…Í”´ù™…”µ±…å½ÕĞ´ù‘É…İ•Èìµ½ÍĞ)¡…¹•Ì…É”Á¥¹Ì½¹±ä¸AÉ½Ñ•Ñ•µ…¥¸½5Õ±Ñ¤Ä¸À½™É½é•¸‰•Ñ…Ì…¹…ÑÕ…°ÄÀÈĞ±¥¡Ñ¥¹œ)‰åÑ•ÌÕ¹¡…¹•¸9¼¹•Ü½‰…Ñ ¸)AÕ‰±¥Í¡•ÉÕ¹Ñ¥µ”ØàÌÈÁ”Õ•ŒÜÔÌÜĞİ‘”á•ˆÔØäÜÄÔá…„ÔÌÙÔĞÈàì™•Ñ¡•½É¥¥¸½µ…¥¸ÑÉ•”(İˆÔå…ˆÜÄÉÉØÈÈåŒÙ‘‰˜àå”ØäÅ”Õˆá„ÜàÈÕ”Ùˆ•á…Ñ±äµ…Ñ¡•ÌÑ•ÍÑ•½ÕÁ±½…‘•Í½ÕÉ”¸)±°ĞĞ¡…¹•‰±½‰Ì¡…Í µÙ•É¥™¥•‰•™½É”¹½¸µ™½É••áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”¸A…•Ì(ĞÄÀÈÔÜÌÜÈÔÌMUMLìä¼ä™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ èÍ¡•±°½µ…¹¥™•ÍĞ±¹…Ñ¥Ù”É•Í½ÕÉ”°)‘•½‘•È±UXÍÕÉ™…”±¥µÁ½ÉĞ½É•¹‘•È½İ¹•ÉÌ…¹Õ¹¡…¹•É•™±•Ñ¥½¸äÈÔ½5Õ±Ñ¤Ä¸À¸)!½ÍÑ•ĞÄÀÈÔÜÌÜĞÀÔ¥¹}ÁÉ½É•ÍÌ…ĞÁÉ½½˜ì¹¼¡½ÍÑ•™Õ±°AML±…¥µ•¸Õ±°±½…°ÌÀÈà)AML¼Á%0¼ÁÍ­¥ÀÉ•µ…¥¹Ì™¥¹…°Ù…±¥‘…Ñ¥½¸¸	Õ¥±ÄÀÈØ1%Y€¼Id™½È¹…Ñ¥Ù”A	HÑ•ÍĞ¸)9¼ÉÕ¹Ñ¥µ”•‘¥ÑÌ…™Ñ•È™¥¹…°™Õ±°ÍÕ¥Ñ”ì¹¼É•¹‘•É•µ‰É½İÍ•È½¥A……•ÁÑ…¹”¥¹™•ÉÉ•¸)Y%ÄÀÈØ¥µÁ½ÉĞÍ…µÁ±”MÑÕ‘¥¼½M½±¥±±•™Ğ¹½Éµ…°½É½Õ¡¹•ÍÌÉ•±¥•˜±µ¥‘‘±”µ•Ñ…±±¥Œ)Ù…É¥…Ñ¥½¸İ¡¥±”½É‰¥Ñ¥¹œ±É¥¡Ğ½±½ÕÈ½¹ÑÉ½°ìM…Ù•=Á•¸¹‰½á±…ˆ€¬9=5½9½µ…Í…¹¥Ñä°)½±5@QMP½±½ÕÈ¼Õà…•ÁÑ•¸9•áĞ¹…Ñ¥Ù”™••‘‰…¬Ñ¡•¸•µ¥ÍÍ¥Ù”ÁÉ•Ù¥•ÜÑ¡É½Õ )Í…µ”½İ¹•Èì½Á…¥Ñä½‘¥ÍÁ±…•µ•¹Ğ‘¥ÍÁ±…ä‘•™•ÉÉ•¸(((ŒŒ€¸ÄÀÈÜƒŠP¹…Ñ¥Ù”9=4•µ¥ÍÍ¥Ù”Ù¥•İÁ½ÉĞƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äÉ•Á½ÉÑÌƒŠpÄÀÈØAML€½¹•áÑ‰Õ¥±“Št¸AÉ½Ñ•Ğ…•ÁÑ•¹…Ñ¥Ù”¹½Éµ…°°)É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌ°½±½ÕÈ¼ÕàÑ¥±¥¹œ°É•Ñ…¥¹•Í½ÕÉ”‰åÑ•Ì…¹É½Õ¹ÑÉ¥ÁÌ°…¹(ÄÀÈĞÕ¹‘•ÉÍ¥‘”±¥¡Ñ¥¹œ¸	…Í•±¥¹”µ…¥¸ˆÀİŒÈàÔä€¼ÉÕ¹Ñ¥µ”€ØàÌÈÁ”ÕŒ¸()Õ‘¥Ğè•á¥ÍÑ¥¹œ¹½µ…µµ…Ñ•É¥…°µÉ•Í½ÕÉ”…¹ÕØµ¥µ…”µÍÕÉ™…”µÁÉ•Ù¥•Ü½İ¸¹…Ñ¥Ù”µ…À)Á±…¹¹¥¹œ½‘•½‘¥¹œ½µ…Ñ•É¥…°±¥™•Ñ¥µ”¸áÑ•¹Ñ¡½Í”½İ¹•ÉÌ½¹±äèÍÕÁÁ½ÉÑ•½Á…ÅÕ”)UX½ÕÑ¼•µ¥ÍÍ¥Ù”Ñ•áÑÕÉ”¥¸MÑÕ‘¥¼½M½±¥°ÍI¥µ…”°Í…Ù•±¥¹•…È™…Ñ½Éµ¥ÍÍ¥Ù”)I…¹™…Ñ½Éµ¥ÍÍ¥Ù•MÑÉ•¹Ñ °¥¹‘•Á•¹‘•¹ĞÉ•Á•…Ğ½Í…µÁ±•È¸M…Ù•é•É¼Ù…±Õ•ÌÉ•µ…¥¸)é•É¼¸%¹Ù…±¥™…Ñ½ÉÌ½ÁÉ½©•Ñ¥½¹Ì½È•á¡…ÕÍÑ•½µ‰¥¹•á5¥‰Õ‘•ĞÉ•µ…¥¸É•Ñ…¥¹•´)½¹±äì™…¥±•½±…Ñ”…Õá¥±¥…Éä‘•½‘”­••ÁÌ…•ÁÑ•½±½ÕÈ½A	H…¹±•…¹ÌÕÀ¹½Éµ…±±ä¸)µ¥ÍÍ¥½¸¥ÌÍÕÉ™…”‰É¥¡Ñ¹•ÍÌ°İ¥Ñ ¹¼…‘‘•Í•¹”±¥¡Ğ½‰±½½´½É•¹‘•É•È¸½±½ÕÈ)Í½ÕÉ”ÍÑ¥±°É•ÅÕ¥É•ì…±İ…åÍ}Õ¹±¥Ğ…¹UX%µ…”É•µ…¥¸½±½ÕÈµ½¹±ä¥¹ÍÁ•Ñ¥½¸¸)=Á…¥Ñä½‘¥ÍÁ±…•µ•¹Ğ‘¥ÍÁ±…ä…¹ÑÉ…¹Í±…Ñ•½É½Ñ…Ñ•½ÑÉ¥Á±…¹…ÈÍ…µÁ±¥¹œÍÑ…ä‘•™•ÉÉ•¸)=É¥¥¹…°Í½ÕÉ”‰åÑ•Ì½µ…Ñ•É¥…°)M=8½•áÁ½ÉĞ½½‘•Œ…¹•½µ•ÑÉä½Á¥­¥¹œ½¡¥ÍÑ½ÉäÉ•Ñ…¥¹•¸)½ÕÈ¹…Ñ¥Ù”ÍÕÉ™…•Ì¼ÈÁ¬½É¹•ÉÌì•µ¥ÍÍ¥Ù”ÄÀÈÑÍÅÕ…É”ÕÍ•Ì½É¥¥¹…°Í•É¥…°‘•½‘•È¸()½ÕÈ¹•ÜÉ•…°µ½İ¹•ÈÑ•ÍÑÌ½Ù•ÈÁ±…¸½™…Ñ½ÉÌ½Ñ¥±¥¹œ½‰Õ‘•Ğ½É•™ÕÍ…±Ì°…ÑÕ…°Q¡É•”)ÍI•µ¥ÍÍ¥Ù•5…À½¥¹Ñ•¹Í¥Ñä…¹•á¥ÍÑ¥¹œ‘…Ñ„µ…ÁÌ°±…Ñ”½™…¥±ÕÉ”½Õ¹±¥Ğ±•…¹ÕÀ°…¹)‰åÑ”µ¥‘•¹Ñ¥…°Á½½±•M…Ù•=Á•¸½9=4¸=É¥¥¹…°ÄÀÈÔ¼ÄÀÈØÑ•ÍÑÌÕ¹¡…¹•¸ÈÔ™½ÕÍ•)¡•­ÌAML¼Á%0¼ÁÍ­¥À¸Õ±°±½…°9½‘”ÈĞ¸ÈÈ¸ÄèÌÀÌÈAML¼Á%0¼ÁÍ­¥À¼Á…¹•°( ÄàÔ¸ØÍÌ¤ì™½ÕÈ¹•ÜÑ•ÍÑÌ…±Í¼É•ÉÕ¸…™Ñ•È…‘‘¥¹œ•áÁ±¥¥Ğé•É¼µ™…Ñ½È…ÍÍ•ÉÑ¥½¹Ì¸)Må¹Ñ…à½‘¥™˜±•…¸ì¹¼¹…Ñ¥Ù”AT½¥A…•µ¥ÍÍ¥Ù”…•ÁÑ…¹”¥¹™•ÉÉ•¸)I•Ù¥•İ•É•Ù•ÉÍ”µ±½…‘•È…¡”±½ÍÕÉ”ìµ½ÍĞ¡…¹•Ì…É”Á¥¹Ì½¹±ä¸5…¥¸½5Õ±Ñ¤Ä¸À°)™É½é•¸‰•Ñ…Ì°…ÑÕ…°ÄÀÈĞ±¥¡Ñ¥¹œ…¹Á…¥¹Ğ½É•™±•Ñ¥½¸½‘”Õ¹¡…¹•¸á¥ÍÑ¥¹œ)¥¸µ…ÁÀÑ•ÍĞ±¥ÍĞ¥¹±Õ‘•ÌÄÀÈÜ¡•­Ìì¹¼¹•Ü½‰…Ñ É•ÅÕ¥É•¸()•¹•É¥ŒÍ…µÁ±”è‘½Ì½Í…µÁ±•Ì½9=5}5%MM%Y|ÄÀÈÜ¹¹½´°É••¹•É…Ñ•‰äÑ¡”•á¥ÍÑ¥¹œ)¹½µ…‘A	I¥áÑÕÉ”¡í•µ¥ÍÍ¥Ù”éÑÉÕ•ô¤…¹¹…Ñ¥Ù”İÉ¥Ñ•È¸1•™ĞÕ‰”…‘‘Ì‰±Õ”•µ¥ÍÍ¥Ù”)™…Ñ½È½ÍÑÉ•¹Ñ ÈÑ¼¹½Éµ…°­É½Õ¡¹•ÍÌ°µ¥‘‘±”A	H…¹É¥¡Ğ½±½ÕÈ½¹ÑÉ½±ÌÕ¹¡…¹•¸)Y%ÄÀÈÜè¥µÁ½ÉĞÍ…µÁ±”MÑÕ‘¥¼½M½±¥…¹½É‰¥Ğ‰•±½Üì±•™Ğ•µ¥ÍÍ¥Ù”É•µ…¥¹Ì‰É¥¡Ğ°)½Ñ¡•ÈÕ‰•ÌÉ•Ñ…¥¸¹½Éµ…°½Í…±…ÈÍ¡…‘¥¹œìÍİ¥Ñ ±½½­Ì½‰…¬¸M…Ù”½=Á•¸¹‰½á±…ˆ…¹)9=5É•½Á•¸¥¸9½µ…É•Ñ…¥¸¥Ğ¸¡•¬…•ÁÑ•ÄÀÈØÍ…µÁ±”ÍÑ¥±°±½½­ÌÑ¡”Í…µ”¸)9•áĞè¹…Ñ¥Ù”•µ¥ÍÍ¥Ù”™••‘‰…¬ì½Á…¥Ñä‘¥ÍÁ±…ä¹••‘ÌÍ•Á…É…Ñ”Í½Á•…Õ‘¥Ğ°İ¡¥±”)ÍÕ‰‘¥Ù¥Í¥½¸½‘¥ÍÁ±…•µ•¹ĞÉ•µ…¥¹Ì‘•™•ÉÉ•¸AÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½İÌÙ…±¥‘…Ñ¥½¸¸()AÕ‰±¥…Ñ¥½¸Ù•É¥™¥•èÉÕ¹Ñ¥µ”˜ÅˆĞĞÀÕ™‘‰‘”ÔÀÌàÑ˜ÉˆÀİŒÔÅÔÌÕ•”á”Í‰”á”ì)™•Ñ¡•½É¥¥¸½µ…¥¸ÑÉ•”Ù‘”ÜÕ„Å˜åˆÙ…‰…ˆÜİ‘ŒäĞÔÍÄÅŒÙ™ŒÜØå˜ÌÉ„Õ•á…Ñ±äµ…Ñ¡•Ì)Ñ•ÍÑ•½ÕÁ±½…‘•ÑÉ•”¸±°ĞÀ¡…¹•‰±½‰Ì¡…Í µÙ•É¥™¥•‰•™½É”•áÁ•Ñ•µµ…¥¸°)¹½¸µ™½É•ÕÁ‘…Ñ”¸M•Ù•¸™É•Í ±¥Ù”™¥±•Ì‰åÑ”µµ…Ñ èÍ¡•±°½µ…¹¥™•ÍĞ°µ…Ñ•É¥…°)É•Í½ÕÉ”½½Ù•É±…ä½¥µÁ½ÉĞ½İ¹•È½Ñ•ÍĞ±¥ÍĞ…¹‘½İ¹±½…‘…‰±”Í…µÁ±”¸A…•ÌĞÄÀÌÀäØàÔÔØ)…¹¡½ÍÑ•Ñ½Á½±½äĞÄÀÌÀäØäÌàØİ•É”¥¹}ÁÉ½É•ÍÌ…Ğ±…ÍĞÅÕ•Éäì¹¼¡½ÍÑ•AML)±…¥µ•¸Õ±°±½…°ÌÀÌÉAMLÉ•µ…¥¹ÌÙ…±¥‘…Ñ¥½¸¸	Õ¥±ÄÀÈÜ1%Y€¼Id™½È¹…Ñ¥Ù”)•µ¥ÍÍ¥Ù”Ñ•ÍÑ¥¹œ¸9¼ÉÕ¹Ñ¥µ”•‘¥ÑÌ…™Ñ•È™Õ±°ÍÕ¥Ñ”ì¹…Ñ¥Ù”Ù¥ÍÕ…°…Ñ”Á•¹‘¥¹œ¸((ŒŒ€¸ÄÀÈàƒŠP¹…Ñ¥Ù”9=4½Á…¥ÑäÙ¥•İÁ½ÉĞƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äÉ•Á½ÉÑÌƒŠpÄÀÈÜAML€½¹•áÑ‰Õ¥±“Št¸AÉ½Ñ•Ğ…•ÁÑ••µ¥ÍÍ¥Ù”ÄÀÈÜ°)¹½Éµ…°½Í…±…ÉÌÄÀÈØ°½±½ÕÈ½Ñ¥±¥¹œ½É•Ñ•¹Ñ¥½¸ÄÀÈÔ…¹Õ¹‘•ÉÍ¥‘”±¥¡Ñ¥¹œÄÀÈĞ¸)	…Í•±¥¹”µ…¥¹™ˆÉ™ŒÉ‘”€¼ÉÕ¹Ñ¥µ•˜ÅˆĞĞÀÕ˜¸I•Á¼½Í½ÕÉ”…Õ‘¥Ğ½¹™¥ÉµÌ½É¥¥¹…°¹…Ñ¥Ù”)É•Í½ÕÉ”½UX½Ù•É±…ä½‘•½‘•È…¹É•¹‘•Èµµ½‘•Ì…É”…ÕÑ¡½É¥Ñ…Ñ¥Ù”¸()MÑÕ‘¥¼½M½±¥±¥Ğ¹…Ñ¥Ù”ÍÕÉ™…•Ì¹½ÜÁÉ•Ù¥•ÜÍ•Á…É…Ñ”½Á…ÅÕ”É…åÍ…±”½Á…¥Ñäµ…ÁÌ(¡±¥¹•…È…±Á¡…5…À€ğôÔÄÉÍÅÕ…É”°Í…Ù•™…Ñ½É=Á…¥Ñä€¨µ…Ñ•É¥…°‰±•¹‘¥¹œ½Á…¥Ñä¤…¹)Í¥µÁ±”‰±•¹‘¥¹œµ…Ñ•É¥…°Õ¹¥™½É´½Á…¥Ñä¥¹±Õ‘¥¹œé•É¼¸=É¥¥¹…°½±½ÕÈÍÑ¥±°)É•ÅÕ¥É•¸=Á…ÅÕ”‰…Í”½È‰±•¹‘¥¹œ½¹±äì½Ñ¡•È¹…Ñ¥Ù”ÑåÁ•Ì…¹ÕÍ•}½±½É}½Á…¥Ñä)É•µ…¥¸É•Ñ…¥¹•µ½¹±ä™½È½Á…¥Ñäì…•ÁÑ•½Á…ÅÕ”½±½ÕÈ½A	H¥¹ÍÁ•Ñ¥½¸¥ÌÁÉ•Í•ÉÙ•)™½È½±½ÕÈµ…±Á¡„™¥±•Ì¸A•Èµµ…ÀÉ•Á•…Ğ½Í…µÁ±•È…¹½µ‰¥¹•á5¥¼ÑÍÕÉ™…•Ì¼ÈÁ¬½É¹•ÉÌ)É•µ…¥¸¸U¹±¥Ğ½UX%µ…”­••ÀÁÉ¥½È½±½ÕÈµ½¹±äÁ½±¥äìÍ½ÕÉ”‰åÑ•Ì½Í•ÑÑ¥¹ÌÕ¹Ñ½Õ¡•¸)U¹ÍÕÁÁ½ÉÑ•½™…¥±•½Á…¥ÑäÉ•Ñ…¥¹Ì…•ÁÑ•½±½ÕÈ½A	H…¹½É¥¥¹…°½Á…¥Ñä™…±±‰…¬ì)±…Ñ”…¹•±±…Ñ¥½¸±½Í•Ì¥µ…”…¹…¹¹½Ğ…Ñ¥Ù…Ñ”ÑÉ…¹ÍÁ…É•¹ä¸()=¹”Í½Á•½É¥¥¹…°MÑ…¹‘…Éµ…Ñ•É¥…°Í¡…‘•È¡½½¬¥¹½É•Ì½±½ÕÈµµ…À…±Á¡„İ¡¥±”)Í…µÁ±¥¹œI°‰•…ÕÍ”¹…Ñ¥Ù”½±½ÕÈ…±Á¡„¥Ì½ÁĞµ¥¸½‘•™•ÉÉ•¸=É¥¥¹…°‰¥Ñµ…À‘•½‘”)É•ÅÕ•ÍÑÌÕ¹ÁÉ•µÕ±Ñ¥Á±¥•I™½ÈÑ¡•Í”ÍÕÉ™…•Ìİ¥Ñ¡½ÕĞ¡…¹¥¹œÍI½¹Ù•ÉÍ¥½¸¸)9¼…¹Ù…Ì…±Á¡„É•İÉ¥Ñ”½É”µ•¹½‘”èÑ¡…ĞÉ•©•Ñ•…ÁÁÉ½… ±½Í•ÌI…Ğ…±Á¡„ÀÑ¡É½Õ )…¹Ù…ÌÁÉ•µÕ±Ñ¥Á±¥…Ñ¥½¸¸M¡…‘•ÈÕÍ•Ì¥¹ÍÑ…±±•Q¡É•”À¸ÄÜä¸Äµ…À¡Õ¹¬½…¡”­•ä¸)9…Ñ¥Ù”ÑÉ…¹ÍÁ…É•¹äÕÍ•Ì•á¥ÍÑ¥¹œ…±Á¡„‰±•¹‘¥¹œ½‘•ÁÑ¡]É¥Ñ•™…±Í”ì½É¥¥¹…°µ•Í )Á¥­¥¹œÉ•µ…¥¹ÌÍ½±¥¸QÉ…¹ÍÁ…É•¹ĞÍ•±˜½¥¹Ñ•ÉÍ•Ñ¥¹œÍ½ÉÑ¥¹œ…¹½ÁÑ¥…°É•™É…Ñ¥½¸)™¥‘•±¥Ñä…É”9=P±…¥µ•¸=É¥¥¹…°½É…¹”‰…­™…”Õ”¡¥‘•Ì™½È½¹™¥Éµ•ÑÉ…¹Í±Õ•¹Ğ)ÍÕÉ™…•Ì…¹É•ÍÑ½É•Ì½¸‘¥ÍÁ½Í…°¸5•Í Í¡…‘½İÌ‘¥Í…‰±•€¡¹½ĞÑÉ…¹ÍÁ…É•¹ĞÍ¡…‘½İÌ¤ì)‰½Ñ ½É¥¥¹…°MÑÕ‘¥¼É•™É•Í ½İ¹•ÉÌÉ•ÍÁ•Ğ½Ù•É±…ä±¥™•Ñ¥µ”™±…œÍ¼¥Ğ…¹¹½ĞÉ”µ•¹…‰±”Í½±¥)Í¡…‘½İÌ¸•¹•É…°™±½½È½¹Ñ…ĞÕ”É•µ…¥¹ÌÕ¹¡…¹•¸9¼•½µ•ÑÉä½¡¥ÍÑ½Éä½¥¹ÁÕĞ°)•áÑÉ„É•¹‘•É•È½±¥¡Ğ°±½‰…°µ…Ñ•É¥…°½Ù•ÉÉ¥‘”½È‘ÕÁ±¥…Ñ”½İ¹•È¸()M¥à¹•Ü½İ¹•È½É•…°µQ¡É•”Ñ•ÍÑÌ½Ù•ÈÕ…É‘Ì½‰Õ‘•ÑÌ½™…Ñ½ÉÌ½Í…µÁ±¥¹œ°µ…Ñ•É¥…°…¹)Í¡…‘•ÈÍ•µ…¹Ñ¥Ì°Õ¹¥™½É´­µ…À…¹é•É¼…±Á¡„°™…¥±ÕÉ”½±…Ñ”‘¥ÍÁ½Í…°°‘•½‘•È½ÁÑ¥½¹Ì°)…ÑÕ…°MÑÕ‘¥¼½M½±¥½É¥œ…¹±…Ñ”Á½¥¹Ñ•ÈµÉ•±•…Í”Í•¹”µÉ•™É•Í ±•…¹ÕÀ…¹•á…ĞÁ½½±•ÁÉ½©•Ğ½9=4‰åÑ”É½Õ¹‘ÑÉ¥À¸(ÌÄ™¥¹…°™½ÕÍ•AML¼Á%0¼ÁÍ­¥À¸	É½…±½…°9½‘”ÈĞ¸ÈÈ¸ÄÍÕ¥Ñ”ÌÀÌàAML¼(Á%0¼ÁÍ­¥À¼Á…¹•°€ Äää¸ÔÉÌ¤°™½±±½İ¥¹œ•…É±¥•ÈÌÀÌáAML¸¥¹…°™½ÕÍ•ÌÄÉ•ÉÕ¸)½Ù•ÉÌ‰…­İ…Éµ½µÁ…Ñ¥‰±”½Á…ÅÕ”½±½ÕÈµ…±Á¡„™…±±‰…¬…¹Í•É¥…±¥é…‰±”UU%)½Á…¥Ñä½İ¹•ÉÍ¡¥À€¡¹¼¥ÉÕ±…ÈÕÍ•É…Ñ„¤¸Må¹Ñ…à½‘¥™˜±•…¸ì¹¼¹…Ñ¥Ù”ATAML¸)I•Ù¥•İ•É•Ù•ÉÍ”µ±½…‘•ÈÁ¥¹Ì¥¹±Õ‘”½É¥¥¹…°‘•½‘•È½UX½•áÁ½ÉĞ½Á…¥¹ĞÁ…É•¹ÑÌì)µ½ÍĞ¡…¹•Ì…É”…¡”É•™•É•¹•Ì½¹±ä¸5…¥¸½5Õ±Ñ¤Ä¸À½™É½é•¸‰•Ñ…Ì°…ÑÕ…°±¥¡Ğ)½‘”…¹…•ÁÑ•ÄÀÈÜ•µ¥ÍÍ¥½¸‰•¡…Ù¥½ÈÉ•Ñ…¥¹•¸%¸µ…ÁÀ¡•­±¥ÍĞ¥¹±Õ‘•ÌÄÀÈà¸)•¹•É¥ŒÍ…µÁ±”‘½Ì½Í…µÁ±•Ì½9=5}=A%Qe|ÄÀÈà¹¹½´ÕÍ•Ì½É¥¥¹…°¹…Ñ¥Ù”İÉ¥Ñ•Èì)±•™ĞÉ…åÍ…±”¡•­•È½Á…¥Ñä°µ¥‘‘±”ÌÔ”Õ¹¥™½É´°É¥¡Ğ½Á…ÅÕ”½¹ÑÉ½°¸()Y%ÄÀÈàè¥µÁ½ÉĞÍ…µÁ±”MÑÕ‘¥¼½M½±¥°½É‰¥Ğ…¹¥¹ÍÁ•Ğ¡•­•È¡½±•Ì½µ¥‘‘±”)ÑÉ…¹ÍÁ…É•¹ä½½¹ÑÉ½°ì¹¼½É…¹”™¥±°Ñ¡É½Õ ÑÉ…¹ÍÁ…É•¹Ğ…É•…Ì¸M•±•Ğ½5½Ù”½U¹‘½I•‘¼°)Íİ¥Ñ ±½½­Ì½‰…¬ìM…Ù”½=Á•¸¹‰½á±…ˆ…¹9=5½9½µ…É•Ñ…¥¸½Á…¥ÑäÍ•ÑÑ¥¹Ì½µ…ÁÌ¸)±Í¼É•¥µÁ½ÉĞ…•ÁÑ•ÄÀÈÜ•µ¥ÍÍ¥Ù”Í…µÁ±”™½ÈÅÕ¥¬Í…¹¥Ñä¸9¼¹•Ü½‰…Ñ ¸)9•áĞè¹…Ñ¥Ù”½Á…¥Ñä™••‘‰…¬°Ñ¡•¸…Õ‘¥Ğ½±½ÕÈµ…±Á¡„ÍÕÁÁ½ÉĞ½É•µ…¥¹¥¹œÑÉ…¹Í™½É´)Í…µÁ±¥¹œ‰•™½É”‘¥ÍÁ±…•µ•¹Ğì‘¥ÍÁ±…•µ•¹ĞÍÕ‰‘¥Ù¥Í¥½¸É•µ…¥¹ÌÍ•Á…É…Ñ•±ä‘•™•ÉÉ•¸()M½ÕÉ•Ìè½™™¥¥…°9½µ…µ…Ñ•É¥…°µ…¹Õ…°¡ÑÑÁÌè¼½¹½µ…‘ÍÕ±ÁĞ¹½´½µ…¹Õ…°½µ…Ñ•É¥…°)…¹ÍÑ•Á¡½µ¤½¹½µ…µ±¥¹¬‰±•¹‘•È½¹½µ…‘}‰±•¹‘•É}±¥¹¬½}}¥¹¥Ñ}|¹ÁäèÍ•Á…É…Ñ”¹½¸µ½±½ÕÈ)½Á…¥Ñä…¹½ÁĞµ¥¸½±½ÕÈ…±Á¡„ì¥µÁ±•µ•¹Ñ…Ñ¥½¸ÕÍ•Ì‰½Õ¹‘•É…åÍ…±”½¹±ä¸()AÕ‰±¥…Ñ¥½¸Ù•É¥™¥•èÉÕ¹Ñ¥µ”ÜàÅ˜ÄØåá”ÔäĞÄÀÜÄĞİ™„ØÄÀàÅ™„ÜÔÅ„å‘ˆÄÕ„ì)™•Ñ¡•½É¥¥¸½µ…¥¸ÑÉ••‘ŒÜÅ˜ÜÑ”İ•„ÍĞäÔÌàÉØÔÄàÜÁ˜ĞØÄÙ‰‘™„Á”Ø•á…Ñ±äµ…Ñ¡•Ì)Ù…±¥‘…Ñ•½ÕÁ±½…‘•™¥±•Ì¸±°ĞÔ¡…¹•‰±½‰Ì¡…Í µÙ•É¥™¥•‰•™½É”¹½¸µ™½É•°)•áÁ•Ñ•µµ…¥¸ÕÁ‘…Ñ”¸ä¼ä™É•Í ±¥Ù”‰åÑ”µ…Ñ¡•ÌèÍ¡•±°½µ…¹¥™•ÍĞ±¹…Ñ¥Ù”É•Í½ÕÉ”°)UXÍÕÉ™…”½‘•½‘•È±É•¹‘•Èµµ½‘•Ì±±…Ñ”MÑÕ‘¥¼Í•¹”™¥à±Ñ•ÍĞ±¥ÍĞ…¹9=4Í…µÁ±”¸)A…•ÌĞÄÀÌÌĞØÀÄÌÌ…¹¡½ÍÑ•Ñ½Á½±½äĞÄÀÌÌĞØÄÔÔäİ•É”¥¹}ÁÉ½É•ÍÌ…Ğ±…ÍĞÅÕ•Éäì)¹¼¡½ÍÑ•™Õ±°AML±…¥µ•¸	É½…±½…°ÌÀÌáAML…¹™¥¹…°™½ÕÍ•ÌÅAMLÉ•µ…¥¸)Ù…±¥‘…Ñ¥½¸¸	Õ¥±ÄÀÈà1%Y€¼Id™½È¹…Ñ¥Ù”½Á…¥ÑäÑ•ÍÑ¥¹œì¹…Ñ¥Ù”AT½¥A…)…ÁÁ•…É…¹”…Ñ”É•µ…¥¹ÌÁ•¹‘¥¹œ¸Q¡¥ÌÁÕ‰±¥…Ñ¥½¸ÁÉ½½˜¡…¹•Ì‘½Õµ•¹Ñ…Ñ¥½¸½¹±ä¸((ŒŒ€¸ÄÀÈäƒŠP¹…Ñ¥Ù”9=4½±½ÕÈµ¥µ…”…±Á¡„ƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È½ÉÉ•ÑÌ¥¹¥Ñ¥…°ÄÀÈà%0èƒŠpÄÀÈàAML€´É•™É•Í Ñ½½¬Í½µ”Ñ¥µ”‰ÕĞ¥Ğİ½É­•)•Ù•¹ÑÕ…±±ä€è¤€½¹•áÑ‰Õ¥±“Št¸Q¡¥ÌÍÕÁ•ÉÍ•‘•ÌÑ¡”¥¹¥Ñ¥…°É•Á½ÉĞìÁÉ½Ñ•Ğ…•ÁÑ•(ÄÀÈàÉ…åÍ…±”½Á…¥Ñä½‰±•¹‘¥¹œ½‰…­™…”½Í¡…‘½Ü¡…¹‘±¥¹œÁ±ÕÌÄÀÈÜ•µ¥ÍÍ¥½¸…¹(ÄÀÈØ¼ÄÀÈÔA	H½É•Ñ•¹Ñ¥½¸¸I•™É•Í ±…œ¥Ì…¸½‰Í•ÉÙ…Ñ¥½¸°¹½Ğ•Ù¥‘•¹”½˜½Á…¥Ñä)™…¥±ÕÉ”ìÙ•É¥™ä¹•ÜÍ¡•±°½µ…¹¥™•ÍĞ½Á¥¹Ì½±¥Ù”‰åÑ•Ì°¹¼ÍÁ•Õ±…Ñ¥Ù”É•™É•Í ¡…¹•Ì¸)	…Í•±¥¹”µ…¥¸Üäİ˜ÌÔÌà€¼ÉÕ¹Ñ¥µ”ÜàÅ˜ÄØä¸()Õ‘¥Ğè¹…Ñ¥Ù”µ…Ñ•É¥…°…±É•…‘äÉ•Ñ…¥¹ÌÕÍ•}½±½É}½Á…¥Ñä¸áÑ•¹•á¥ÍÑ¥¹œÉ•Í½ÕÉ”)Á±…¸…¹UX½Ù•É±…ä½¹±äè•áÁ±¥¥ĞÑÉÕ”¼Ä½ÁÑÌ¥¹Ñ¼½±½ÕÈµ¥µ…”…±Á¡„¥¸±¥Ğ¹…Ñ¥Ù”)MÑÕ‘¥¼½M½±¥¸™…±Í”¼À½…‰Í•¹ĞÍÑ…åÌÍ½±¥Õ¹±•ÍÌ•á¥ÍÑ¥¹œ½Á…¥Ñäµ…À½Í…±…È…ÁÁ±¥•Ì¸)U¹­¹½İ¸™±…ÌÉ•Ñ…¥¸ÁÉ¥½È½Á…ÅÕ”¥¹ÍÁ•Ñ¥½¸½É•™ÕÍ…°ì¹¼ÑÉÕÑ¡¥¹•ÍÌ½•É¥½¸¸)Q¡É•”Ì=I%%90I	µ…ÀÍ¡…‘•È¹½ÜÉÕ¹Ì™½È½ÁÑ•µ¥¸ÍÕÉ™…•Ì°µÕ±Ñ¥Á±å¥¹œ¥µ…”)…±Á¡„İ¥Ñ •á¥ÍÑ¥¹œ±¥¹•…È…±Á¡…5…À…¹™…Ñ½É=Á…¥Ñä€¨‰±•¹‘¥¹œµ…Ñ•É¥…°½Á…¥Ñä¸)•ÁÑ•ÄÀÈàIµ½¹±äÍ¡…‘•ÈÍÑ…åÌ™½È½±½ÕÈµ…±Á¡„=İ¡•¸½Á…¥Ñä¥Ì½Ñ¡•Éİ¥Í”)…Ñ¥Ù”¸9…Ñ¥Ù”±¥Ğ½±½ÕÈÉ•ÅÕ•ÍÑÌ•á¥ÍÑ¥¹œÕ¹ÁÉ•µÕ±Ñ¥Á±¥•‰¥Ñµ…ÀÁ…Ñ •Ù•¸İ¡•¸)…±Á¡„=Í¼¹½¹é•É¼IÕ¹‘•Èé•É¼…±Á¡„ÍÕÉÙ¥Ù•Ìì¹¼Á¥á•°É•İÉ¥Ñ”½É”µ•¹½‘”¸)á¥ÍÑ¥¹œÍ•É¥…°…¹•±±…Ñ¥½¸°ÁÉ•Ù¥•Ü‰Õ‘•ÑÌ°Í½ÕÉ”‰åÑ•Ì°¹½Éµ…°½Í…±…È½•µ¥ÍÍ¥½¸°)Í•±•Ñ¥½¸½Á¥­¥¹œ½¡¥ÍÑ½Éä°Í¡…‘½Ü½‰…­™…”±¥™•Ñ¥µ”…¹‰½Ñ MÑÕ‘¥¼½İ¹•ÉÌÉ•Ñ…¥¹•¸)U¹±¥Ğ½UX%µ…”É•Ñ…¥¸ÁÉ¥½È½±½ÕÈµ½¹±äÁ½±¥äìÉ•™É…Ñ¥½¸½…‘‘¥Ñ¥Ù”½‘¥Ñ¡•É¥¹œ½¹…Ñ¥Ù”)Ù•ÉÑ•à½Á…¥ÑäÉ•µ…¥¸Õ¹ÍÕÁÁ½ÉÑ•¸QÉ…¹ÍÁ…É•¹äÍ½ÉÑ¥¹œ±¥µ¥Ñ…Ñ¥½¹ÌÕ¹¡…¹•¸)9¼•½µ•ÑÉä½ÍÕ‰‘¥Ù¥Í¥½¸½•áÑÉ„É•¹‘•É•È½±¥¡Ğ½È±½‰…°µ…Ñ•É¥…°¡…¹”¸()½ÕÈ¹•ÜÉ•…°µ½İ¹•È½Q¡É•”½…ÑÕ…°I	A9¡•­Ì½Ù•È•áÁ±¥¥Ğ™±…œÍ•µ…¹Ñ¥Ì°)I	ÙÌIµ½¹±äÍ¡…‘•ÈÉ½ÕÑ¥¹œ°½µ‰¥¹•¥¹‘•Á•¹‘•¹Ğµ…À½Í…±…È™…Ñ½ÉÌ°Í½±¥=)½¹ÑÉ½°°É…Üé•É¼½™Õ±°…±Á¡„­¹½¹é•É¼I…¹Õ¹ÁÉ•µÕ±Ñ¥Á±¥•‘•½‘•È½…¹•±±…Ñ¥½¸°)Õ¹±¥Ğ½UX%µ…”…¹•á…ĞÁ½½±•M…Ù•=Á•¸½¹…Ñ¥Ù”9=4‰åÑ•Ì¸ÄÀÈàÑ•ÍĞ¹½Ü…•ÁÑÌ)•áÁ±¥¥Ğ™±…œÄÁ•È¹•Ü™•…ÑÕÉ”…¹ÍÑ¥±°É•©•ÑÌ¥¹Ù…±¥Èì…±°ÁÉ•Ù¥½ÕÌµ…À½Í¡…‘½Ü¼)±•…¹ÕÀ…ÍÍ•ÉÑ¥½¹ÌÉ•Ñ…¥¹•¸ÌÔ™½ÕÍ•AML¼Á%0¼ÁÍ­¥À¸Õ±°™¥¹…°±½…°9½‘”ÈĞ¸ÈÈ¸ÄÍÕ¥Ñ”ÌÀĞÈAML¼(Á%0¼ÁÍ­¥À¼Á…¹•°€ ÈÈÈ¸ÌÅÌ¤ì¹¼ÉÕ¹Ñ¥µ”½Ñ•ÍĞ•‘¥ÑÌ…™Ñ•È™Õ±°µÍÕ¥Ñ”ÍÑ…ÉĞ¸)Må¹Ñ…à½‘¥™˜±•…¸¸9¼¹…Ñ¥Ù”AT½¥A…Ù¥ÍÕ…°…•ÁÑ…¹”¥¹™•ÉÉ•¸)I•Ù¥•İ•É•Ù•ÉÍ”µ±½…‘•È…¡”±½ÍÕÉ”ìµ½ÍĞ¡…¹•Ì¥µÁ½ÉĞÁ¥¹Ì½¹±ä¸AÉ½Ñ•Ñ•)µ…¥¸½5Õ±Ñ¤Ä¸À½™É½é•¸‰•Ñ…Ì°‘•½‘•È…¹‰½Ñ ÄÀÈàMÑÕ‘¥¼Í¡…‘½Ü½İ¹•ÉÌÕ¹¡…¹•¸)%¸µ…ÁÀ±¥ÍĞ¥¹±Õ‘•ÌÄÀÈä¡•­ÌìÁÉ¥½ÈÄÀÈàÉ…Ñ¥¹ÌÉ•Ñ…¥¹•ì¹¼½‰…Ñ É•ÅÕ¥É•¸()•¹•É¥Œ‘½Ì½Í…µÁ±•Ì½9=5}=1=UI}1A!|ÄÀÈä¹¹½´è±•™Ğ…±Á¡„=8¡•­•È¡½±•Ììµ¥‘‘±”)Í…µ”¥µ…”àÍ•Á…É…Ñ”Éà½Á…¥Ñäµ…ÀàÕ¹¥™½É´ØÔ”€¡™…Ñ½É=Á…¥Ñä€¸à¤ìÉ¥¡ĞÍ…µ”¥µ…”)…±Á¡„=°Í½±¥¸¥áÑÕÉ”¥ÌÑ•ÍĞµ½¹±äI	A9½¹ÍÑÉÕÑ¥½¸Á±ÕÌ½É¥¥¹…°¹…Ñ¥Ù”)İÉ¥Ñ•Èì½É¥¥¹…°ÁÉ½‘ÕÑ¥½¸½Á…ÅÕ”A9•¹½‘•ÉÌÕ¹Ñ½Õ¡•¸9¼ÕÍ•È…ÉÑİ½É¬¸)Y%ÄÀÈäMÑÕ‘¥¼½M½±¥½É‰¥Ğè±•™Ğ¡•­•È¡½±•Ì±µ¥‘‘±”½µ‰¥¹•ÑÉ…¹ÍÁ…É•¹ä°)É¥¡ĞÍ½±¥å…¸ìÍ•±•Ğ½5½Ù”½U¹‘½I•‘¼±±½½­Ì½‰…¬±M…Ù•=Á•¸¹‰½á±…ˆ±9=5½9½µ…¸)•ÁÑ•ÄÀÈà…¹ÄÀÈÜÍ…µÁ±•ÌÕ¹¡…¹•¸9…Ñ¥Ù”AT½¥A…ÄÀÈä…•ÁÑ…¹”Á•¹‘¥¹œ¸)9•áĞ¹…Ñ¥Ù”½±½ÕÈµ…±Á¡„™••‘‰…¬°Ñ¡•¸…Õ‘¥Ğ¹…Ñ¥Ù”Ñ•áÑÕÉ”ÑÉ…¹Í±…Ñ¥½¸½É½Ñ…Ñ¥½¸)Í…µÁ±¥¹œÑ¡É½Õ Í…µ”½İ¹•Èì‘¥ÍÁ±…•µ•¹Ğ½ÍÕ‰‘¥Ù¥Í¥½¸É•µ…¥¹ÌÍ•Á…É…Ñ•±ä‘•™•ÉÉ•¸((ŒŒ€¸ÄÀÌÀƒŠP¹…Ñ¥Ù”9=4Ñ•áÑÕÉ”ÑÉ…¹Í±…Ñ¥½¸…¹É½Ñ…Ñ¥½¸ƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äÉ•Á½ÉÑÌ€¸ÄÀÈäAML…¹€½¹•áÑ‰Õ¥±¸AÉ½Ñ•Ğ½±½ÕÈµ¥µ…”…±Á¡„°)½µ‰¥¹•Í•Á…É…Ñ”½Á…¥Ñä½Í…±…ÉÌ°Í½±¥=½¹ÑÉ½°°Í½ÕÉ”É•Ñ•¹Ñ¥½¸…¹…±°)…•ÁÑ•€¸ÄÀÈ×ŠL¸ÄÀÈàA	H½É½Õ¹µÑÉ¥À½±¥¡Ñ¥¹œ‰•¡…Ù¥½ÕÉÌ¸	…Í•±¥¹”µ…¥¸½ÉÕ¹Ñ¥µ”(Ù‘™˜Ù”Õ„ĞÄÕˆÀåˆÀØÕˆÄå˜Ù”àÈàÕ‰…Œİå”ØàÑ¸ÕÉÉ•¹Ğ¹Õµ‰•É•É•±•…Í”€¸ÄÀÌÀ¸()Õ‘¥Ğ™½Õ¹¹…Ñ¥Ù”Ñ•áÑÕÉ”ÑÉ…¹Í™½ÉµÌ…±É•…‘äÉ•Ñ…¥¹•‰ÕĞÙ¥•İÁ½ÉĞ‘•±¥‰•É…Ñ•±ä)É•™ÕÍ•¹½¹é•É¼½™™Í•ÑÌ½É½Ñ…Ñ¥½¸¸á¥ÍÑ¥¹œ¹½µ…µµ…Ñ•É¥…°µÉ•Í½ÕÉ”Á±…¸…¹)ÕØµ¥µ…”µÍÕÉ™…”µÁÉ•Ù¥•ÜÉ•µ…¥¸…ÕÑ¡½É¥Ñ…Ñ¥Ù”¸Y•É¥™¥•½¹Ù•¹Ñ¥½¸……¥¹ÍĞ)ÍÑ•Á¡½µ¤½¹½µ…µ±¥¹¬½µµ¥ĞÀàÌäÅŒá”ÀÁ˜ÈÜĞäÄÍŒØÜÍ”ÈĞÔå•Õ„É”ÀÔå„Á…ŒÀ°)‰±•¹‘•È½¹½µ…‘}‰±•¹‘•É}±¥¹¬½}}¥¹¥Ñ}|¹ÁäÍ•Ñ}µ…ÁÁ¥¹}ÑÉ…¹Í™½É´èÉ…‘¥…¹Ì°¹…Ñ¥Ù”)UX½É¥¥¸…ĞÑ½À±•™Ğ°Í…±”Q!8É½Ñ…Ñ¥½¸Q!8½™™Í•Ğ…‰½ÕĞUXé•É¼¸½¹©Õ…Ñ¥¹œ)¥ÑÌ	±•¹‘•Èµ…ÁÁ¥¹œ‰äX€´ø€ÄµX¥Ù•Ì¹…Ñ¥Ù”µ…ÑÉ¥àÉ½İÌè)m½Ì¡È¤©Íà°Í¥¸¡È¤©Íä°½™™Í•ÑatìlµÍ¥¸¡È¤©Íà°½Ì¡È¤©Íä°½™™Í•ÑetìlÀ°À°Åt¸)Q¡É•”…ÕÑ½µ…Ñ¥ŒÑ•áÑÕÉ”ÑÉ…¹Í™½ÉµÌ¡…Ù”„‘¥™™•É•¹Ğ½É‘•ÈÕ¹‘•È¹½¹Õ¹¥™½É´Í…±”ì)ÕÍ”¥ÑÌ½É¥¥¹…°Á•ÈµÑ•áÑÕÉ”µ…ÑÉ¥àİ¥Ñ µ…ÑÉ¥áÕÑ½UÁ‘…Ñ”õ™…±Í”°¹½Ğ‰…­•UX•‘¥ÑÌ¸)… ½±½ÕÈ½¹½Éµ…°½É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌ½•µ¥ÍÍ¥Ù”½½Á…¥Ñäµ…À¡…Ì¥ÑÌ½İ¸ÑÉ…¹Í™½É´¸)UX%µ…”½…±İ…åÌµÕ¹±¥ĞÍÑ…ä½±½ÕÈµ½¹±ä°¹½Üİ¥Ñ ÍÕÁÁ½ÉÑ•½±½ÕÈÑÉ…¹Í™½ÉµÌ¸)5…±™½Éµ•½¹½¹™¥¹¥Ñ”½È±½…ĞÌÈµ½Ù•É™±½ÜÍ…±”½½™™Í•ĞÉ•µ…¥¹ÌÉ•Ñ…¥¹•µ½¹±äì¥¹Ù…±¥)…Õá¥±¥…ÉäÍ­¥ÁÌ½¹±äÑ¡…Ğµ…À¸ÕÑ¼½UXÁÉ½©•Ñ¥½¸°‰Õ‘•ÑÌ°•á…ĞÍ½ÕÉ”‰åÑ•Ì°)½É¥¥¹…°Á¥­¥¹œ½•½µ•ÑÉä½¡¥ÍÑ½Éä°Í•É¥…°‘•½‘”½…¹•°½‘¥ÍÁ½Í…°°ÑÉ…¹ÍÁ…É•¹ä…¹)MÑÕ‘¥¼Í¡…‘½Ü½İ¹•ÉÌÕ¹¡…¹•¸9¼¹•ÜÉ•¹‘•É•È°UX½µ½‘•±±¥¹œ­•É¹•°½ÈU$É•Í­¥¸¸)QÉ¥Á±…¹…È½‘¥ÍÁ±…•µ•¹Ğ½É•™É…Ñ¥½¸½…‘‘¥Ñ¥Ù”½‘¥Ñ¡•É¥¹œÉ•µ…¥¸Í•Á…É…Ñ•±äÕ¹ÍÕÁÁ½ÉÑ•¸()½ÕÈ¹•Ü…ÑÕ…°µ½İ¹•È½É•…°µQ¡É•”Ñ•ÍÑÌ¡•¬¥¹‘•Á•¹‘•¹Ğ	±•¹‘•Èµ½¹©Õ…Ñ”½±‘•¸)UXÁ½Í¥Ñ¥½¹Ì°‰½Ñ É½Ñ…Ñ¥½¸Í¥¹Ì°Í¥¹•½¹½¹Õ¹¥™½É´Í…±”°•Ù•Éäµ…Àµ…ÑÉ¥à…¹)½±½ÕÈÍÁ…”½…±Á¡„°Õ¹¡…¹•UYÌ½Í½ÕÉ”°µ…±™½Éµ•¥¹ÁÕĞ…¹±…Ñ”…¹•±±…Ñ¥½¸°)UX%µ…”½Õ¹±¥Ğ…¹‰åÑ”µ¥‘•¹Ñ¥…°Á½½±•½¥¹±¥¹”M…Ù•=Á•¸…¹¹…Ñ¥Ù”9=4Á…ÉÍ”½•áÁ½ÉĞ¸)=±‘•È€¸ÄÀÈ×ŠL¸ÄÀÈà¹½¹é•É¼µÑÉ…¹Í™½É´É•™ÕÍ…°™¥áÑÕÉ•Ì¹½ÜÕÍ”¹½¹™¥¹¥Ñ”ÑÉ…¹Í™½ÉµÌì)Ñ¡”Í…µ”É•™ÕÍ…°…ÍÍ•ÉÑ¥½¹ÌÍÑ…ä…Ñ¥Ù”…¹¹•ÜÑ•ÍÑÌ½Ù•ÈÑ¡”•áÁ…¹‘•…Á…‰¥±¥Ñä¸(ĞÄ™½ÕÍ•¡•­ÌAML¼Á%0¼ÁÍ­¥À¥¹±Õ‘¥¹œÉ•±•…Í”½…¡”½¥‘•¹Ñ¥ÑäÁÉ½Ñ•Ñ¥½¸¸)Õ±°±½…°9½‘”ÈĞ¸ÈÈ¸ÄÍÕ¥Ñ”è€ÌÀĞØAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÈÄĞ¸ÈÍÌ¤¸¥¹…°…¹½¹¥…°Á…É•¹Ğµ±½…‘•È½…¡”¡•­ÌÉ•ÉÕ¸è€ÄÄAML…™Ñ•È„Á¥¸µ½¹±ä½ÉÉ•Ñ¥½¸Ñ¼‘É…İ•È€´ø™…”µ±…å½ÕĞ€´øÉ•±•…Í”µÙ•ÉÍ¥½¸¸9¼™Õ¹Ñ¥½¹…°ÉÕ¹Ñ¥µ”½Ñ•ÍĞ¡…¹•Ì…™Ñ•È™Õ±°µÍÕ¥Ñ”ÍÑ…ÉĞ¸AÕ‰±¥…Ñ¥½¸Ù•É¥™¥•èÍ•”‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÌÀ¹µì¹¼AT½¥A…AML±…¥µ•¸()•¹•É¥Œ‘½Ì½Í…µÁ±•Ì½9=5}QaQUI}QI9M=I5|ÄÀÌÀ¹¹½´€ ÜØ°Äàà‰åÑ•Ì¤èå…¸…ÉÉ½Ü½¸)™½ÕÈ½±½ÕÉ•ÅÕ…‘É…¹ÑÌ¸1•™Ğ½É¥¥¹…°°µ¥‘‘±”½™™Í•Ñl¸ÈÔ°¸ÄÈÕt°É¥¡ĞÍ…±•lÈ°Åt)Ñ¡•¸Á¤¼ÈÉ½Ñ…Ñ¥½¸İ¥Ñ ½™™Í•ÑlÀ°Ét¸M…µ”Í½ÕÉ”¥µ…”ì½µÁ…É”M5™¥±”¥¸9½µ…¸)%¸µ…ÁÀÑ•ÍĞ±¥ÍĞÕÁ‘…Ñ•ì•…É±¥•È€¸ÄÀÈäÉ…Ñ¥¹ÌÉ•Ñ…¥¹•ì¹¼¹•Ü½‰…Ñ ¸)I•Ù¥•İ•É•Ù•ÉÍ”±½…‘•ÈÉ…Á …¹…¹½¹¥…°É•±•…Í”½É•½Ù•ÉäÁ¥¹Ì€¸ÄÀÌÀì½Ñ¡•È)ÉÕ¹Ñ¥µ”)L¡…¹•Ì…É”¥µÁ½ÉĞÁ¥¹Ì½¹±ä¸5…¥¸½5Õ±Ñ¤Ä¸À½™É½é•¸‰•Ñ…ÌÕ¹Ñ½Õ¡•¸()Y%ÄÀÌÀè¥µÁ½ÉĞÍ…µÁ±”¥¸MÑÕ‘¥¼½M½±¥°½µÁ…É”½É¥¥¹…°½Í¡¥™Ñ•½Í¥‘•İ…åÌÉ•Á•…Ñ•)…ÉÉ½Üİ¥Ñ 9½µ…ì½É‰¥Ğ½Í•±•Ğ½5½Ù”½U¹‘½I•‘¼ìÍİ¥Ñ ±½½­Ì°M…Ù•=Á•¸¹‰½á±…ˆ…¹)9=5½9½µ…½µÁ…É¥Í½¸¸•ÁÑ•€¸ÄÀÈä½±½ÕÈµ…±Á¡„Í…µÁ±”Í¡½Õ±ÍÑ…äÕ¹¡…¹•¸)9•áĞè¹…Ñ¥Ù”ÑÉ…¹Í™½É´™••‘‰…¬°Ñ¡•¸…Õ‘¥ĞÉ•µ…¥¹¥¹œÍ…µÁ±•È½ÁÉ½©•Ñ¥½¸…ÁÌì)‘¥ÍÁ±…•µ•¹Ğ½ÍÕ‰‘¥Ù¥Í¥½¸¹••‘Ì¥ÑÌÍ•Á…É…Ñ”‰½Õ¹‘•Á•É™½Éµ…¹”½‰•¹¡µ…É¬‘•¥Í¥½¸¸((ŒŒ€¸ÄÀÌÀÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ”½µµ¥Ğ…˜Á‘•‘”äØĞÁˆÙ™™™•™•ŒÀÉˆÔÀÅ˜ØÜÁ‰„ÀÙÄÉ‘ˆì™•Ñ¡•½É¥¥¸½µ…¥¸ÑÉ•”(á˜ÀØØÅ”Àá„äÌÄåŒá™„ĞåˆÔäÔĞØÈàÅÌåˆÀääÍ‘™„µ…Ñ¡•ÌÙ…±¥‘…Ñ•±½…°€Å•‘˜İ˜ĞÑÉ•”¸)±°ĞĞÕÁ±½…‘•‰±½ˆ¡…Í¡•ÌÙ•É¥™¥•‰•™½É”•áÁ•Ñ•µµ…¥¸°¹½¸µ™½É•É•˜ÕÁ‘…Ñ”¸)¥Ñ!ÕˆA…•ÌĞÄÀÔÈÜÀĞÈÌÈ½µÁ±•Ñ•MUML¸¥¡Ğ™É•Í ÁÕ‰±¥Œ™¥±•Ì‰åÑ”µµ…Ñ è)Ù•ÉÍ¥½¸¹©Í½¸±¥¹‘•à¹¡Ñµ°±¹…Ñ¥Ù”µ…Ñ•É¥…°Á±…¸±UX¥µ…”½Ù•É±…ä±‘É…İ•È½™…”µ±…å½ÕĞ)…¹½¹¥…°±½…‘•È¡…¥¸±¥¸µ…ÁÀÑ•ÍĞ±¥ÍĞ…¹‘½İ¹±½…‘…‰±”9=4ÑÉ…¹Í™½É´Í…µÁ±”¸)Õ±°±½…°ÌÀĞØAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÈÄĞ¸ÈÍÌ¤ì™¥¹…°ÄÔÑÉ…¹Í™½É´½É•±•…Í”½…¡”¼)¥‘•¹Ñ¥Ñä¡•­ÌAML…™Ñ•ÈÑ¡”Á…É•¹ĞÁ¥¸µ½¹±ä½ÉÉ•Ñ¥½¸¸!½ÍÑ•Ñ½Á½±½äĞÄÀÔÈÜÀĞÌÜÌ)İ…Ì¥¹}ÁÉ½É•ÍÌ…ĞÁÉ½½˜Ñ¥µ”ì¹¼¡½ÍÑ•™Õ±°AML½È¹…Ñ¥Ù”AT…•ÁÑ…¹”±…¥µ•¸)9¼™Õ¹Ñ¥½¹…°ÉÕ¹Ñ¥µ”½Ñ•ÍĞ¡…¹•Ì…™Ñ•ÈÑ¡”™Õ±°ÍÕ¥Ñ”ÍÑ…ÉÑ•¸Q¡¥ÌÁÕ‰±¥…Ñ¥½¸)ÁÉ½½˜¥Ì‘½Ìµ½¹±äìÉÕ¹Ñ¥µ”…¹…ÍÍ•Ğ½¹ÑÉ…ĞÉ•µ…¥¸‰åÑ”µ¥‘•¹Ñ¥…°¸()	Õ¥±€¸ÄÀÌÀ1%Y€¼Id=HQMQ%9¸UÍ•È€¸ÄÀÈäAMLÁÉ½Ñ•Ñ•¸Y%ÄÀÌÀ¥µÁ½ÉĞ)Í…µÁ±”±½µÁ…É”½É¥¥¹…°½½™™Í•Ğ½Í¥‘•İ…åÌÉ•Á•…Ñ•…ÉÉ½Ü¥¸	½á1…ˆ…¹9½µ…ì)MÑÕ‘¥¼½M½±¥½½É‰¥Ğ±5½Ù•U¹‘½I•‘¼±±½½­Ì½‰…¬±M…Ù•=Á•¸¹‰½á±…ˆ±9=5½9½µ…¸•ÁÑ•)½±½ÕÈµ…±Á¡„ÄÀÈäÍ…µÁ±”Õ¹¡…¹•¸9•áĞ™½±±½Ü¹…Ñ¥Ù”Ñ•áÑÕÉ”µÑÉ…¹Í™½É´™••‘‰…¬ì)ÑÉ¥Á±…¹…È½‘¥ÍÁ±…•µ•¹Ğ…¹Ñ¡•¥ÈÁ•É™½Éµ…¹”…Ñ•ÌÉ•µ…¥¸Í•Á…É…Ñ•±ä‘•™•ÉÉ•¸((ŒŒ€¸ÄÀÌÄƒŠP¹…Ñ¥Ù”9=4¥µ…•Ì¥¸Ñ¡”•á¥ÍÑ¥¹œUX‘¥Ñ½ÈƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸ÄÀÌÀAML€½¹•áÑ‰Õ¥±ÁÉ½Ñ•ÑÌÁ•Èµµ…ÀUXÑÉ…¹Í±…Ñ¥½¸½É½Ñ…Ñ¥½¸°…•ÁÑ•)¹…Ñ¥Ù”A	H½…±Á¡„½½Á…¥Ñä½É•Ñ•¹Ñ¥½¸…¹É½Õ¹ÑÉ¥ÁÌ¸	…Í•±¥¹”µ…¥¸™••ŒÙ•„€¼)ÉÕ¹Ñ¥µ”…˜Á‘•‘”¸!½ÍÑ•€¸ÄÀÌÀÉ•É•ÍÍ¥½¸ĞÄÀÔÈÜÀĞÌÜÌ¹½Ü½µÁ±•Ñ•MUML¸)ÕÉÉ•¹Ğ¹Õµ‰•É•É•±•…Í”€¸ÄÀÌÄìÙ…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸™½±±½İÌ‰•±½Ü¸()Õ‘¥ĞèUXİ½É­ÍÁ…”Ì½É¥¥¹…°%µ…”‰ÕÑÑ½¸½‘É½Á‘½İ¸½½¹ÑÉ½±±•È½…¹Ù…Ì½¹±ä)É•Í½±Ù•1É•Í½ÕÉ•Ì¸9…Ñ¥Ù”9=4µ…Ñ•É¥…±Ì…±É•…‘äÉ•Ñ…¥¸•¹½‘•µ…ÁÌ…¹¡…Ù”(ÍÁÉ•Ù¥•Ü½İ¹•ÉÌìÉ•½¹¹•ĞÑ¡”½É¥¥¹…°Ù¥•İ•ÈÉ…Ñ¡•ÈÑ¡…¸…‘…¹½Ñ¡•È¥¹ÍÁ•Ñ½È¸)á¥ÍÑ¥¹œ¥µÁ½ÉÑ•‘UY%µ…•¡½¥•Ì¹½ÜÉ•Í½±Ù•Ì¹…Ñ¥Ù”É•Í½ÕÉ•ÌÙ¥„½É¥¥¹…°)¹½µ…‘5…Ñ•É¥…±5…ÁÌÙ…±¥‘…Ñ¥½¸¸]½É­ÍÁ…”É•ÅÕ•ÍÑÌ½±½ÕÈ°9½Éµ…°°µ¥ÍÍ¥Ù”°)I½Õ¡¹•ÍÌ°5•Ñ…±¹•ÍÌ°=Á…¥Ñä…¹¥ÍÁ±…•µ•¹Ğ¸… ½ÁÑ¥½¸ÕÍ•Ì…ÑÕ…°Í±½Ğ½¹…µ”)…¹½É¥¥¹…°‰åÑ•Ìì¹…Ñ¥Ù”Í•Á…É…Ñ”Í…±…È¥µ…•Ì¡…Ù”9<¥¹™•ÉÉ•1½¡…¹¹•°¸)•™…Õ±Ğ…±±•ÉÌÍÑ…ä½±½ÕÈµ½¹±äì1µ…ÀÉ•Í½±ÕÑ¥½¸½Á…­•µ¡…¹¹•°Á½±¥äÕ¹¡…¹•¸()Q¡¥Ì¥ÌI\¥µ…”¥¹ÍÁ•Ñ¥½¸¥¸Ñ¥±”ÃŠLÄ¸áÁ±¥¥Ğ¹…Ñ¥Ù”ÍÑ…ÑÕÌÍ…åÌ¥¹ÍÁ•Ñ¥½¸)½¹±ä…¹µ…Ñ•É¥…°µ…ÁÁ¥¹œ¹½Ğ…ÁÁ±¥•è¹¼Ñ¥±¥¹œ½É½Ñ…Ñ¥½¸½™…Ñ½ÉÌ‰…­•¡•É”°¹¼(Í‘¥ÍÁ±…•µ•¹ĞÍÕÁÁ½ÉĞ¥µÁ±¥•¸A9½)AÍ¥¹…ÑÕÉ”½5%5…¹€á5¥‘•™…Õ±ĞÍ½ÕÉ”)‰½Õ¹‘ÌÉ•µ…¥¸ì½É¥¥¹…°‘•½‘•È…ÁÌÙ¥ÍÕ…°½ÕÑÁÕĞ…ĞÄÀÈÑÍÅÕ…É”¸M¥áÑ••¸µ‰¥ĞÍ½ÕÉ”)¥ÌÉ•Ñ…¥¹•Õ¹¡…¹•‘•ÍÁ¥Ñ”Ñ¡”‰½Õ¹‘•‰É½İÍ•È¥µ…”ÁÉ•Ù¥•Ü¸%¹Ù…±¥É•Í½ÕÉ•Ì)É•ÑÕÉ¸¹¼¡½¥•Ìì¥¹Ù…±¥½Õ¹ÍÕÁÁ½ÉÑ•¥µ…”½È½Ù•ÉÍ¥é”½µ¥ÑÌÑ¡…ĞÉ•™•É•¹”½¹±ä¸)M…™”½ÁÑ¥½¸¹Ñ•áÑ½¹Ñ•¹Ğ°½É¥¥¹…°Í•±•Ñ¥½¸½Á…¸½é½½´°É•…µ½¹±ä¹…Ñ¥Ù”UX½¹ÑÉ½±Ì°)Í•É¥…°•¹•É…Ñ¥½¸…¹•±±…Ñ¥½¸°±…Ñ”‰¥Ñµ…ÀÉ•±•…Í”°É•½Á•¸½É•Í•Ğ…¹Í½ÕÉ”½¡¥ÍÑ½Éä)É•µ…¥¸¸9¼É…ÜµÁ½¥¹Ñ•È½É•¹‘•É¥¹œ½µ½‘•±±¥¹œ½UX½•áÁ½ÉĞ­•É¹•°½ÈÍ¡•µ„¡…¹•Ì¸()¥Ù”¹•ÜÉ•…°µ½İ¹•ÈÑ•ÍÑÌ½Ù•È…±°Ü•á…ĞÉ•™•É•¹•Ì½¹…µ”Í…™•Ñä½‰Õ‘•ÑÌ½5%5°)¹¼µ½±½ÕÈ¥¹ÁÕĞ°±…Ñ”Íİ¥Ñ ½±½Í”½™…¥±•‘•½‘”°…ÑÕ…°É•…‘½¹±äUXİ½É­ÍÁ…”)‰ÕÑÑ½¹Ì½…¹Ù…Ì…¹•á…ĞÁ½½±•½¥¹±¥¹”M…Ù•=Á•¸½¹…Ñ¥Ù”9=4É½Õ¹‘ÑÉ¥À½Í…µÁ±”‰åÑ•Ì¸(Üä™½ÕÍ•AML¼Á%0¼ÁÍ­¥À¥¹°…•ÁÑ•¹…Ñ¥Ù”ÄÀÌÀ¼ÄÀÈ×ŠLÄÀÈä°1¥µ…”½ÍÕÉ™…”¼)Á…­•Í…±…È½İ½É­ÍÁ…”½É•±•…Í”¡•­Ì¸Õ±°±½…°9½‘”ÈĞ¸ÈÈ¸ÄÍÕ¥Ñ”èÌÀÔÄAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÈÄ¸ĞİÌ¤¸9¼ÉÕ¹Ñ¥µ”½Ñ•ÍĞ•‘¥ÑÌ…™Ñ•È™Õ±°µÍÕ¥Ñ”ÍÑ…ÉĞ¸AÕ‰±¥…Ñ¥½¸Ù•É¥™¥•¥¸‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÌÄ¹µì¹¼¹…Ñ¥Ù”‰É½İÍ•È½AT…ÁÁ•…É…¹”…•ÁÑ…¹”¥¹™•ÉÉ•¸I•Ù•ÉÍ”…¡”É…Á …¹…¹½¹¥…°)É•±•…Í”Á¥¹ÌÉ•Ù¥•İ•ìÁ…É•¹Ğ¡…¹•Ì…É”Á¥¸µ½¹±ä¸5…¥¸½5Õ±Ñ¤Ä¸À½™É½é•¸‰•Ñ…Ì°(ÄÀÌÀµ…Ñ•É¥…°Á±…¸…¹…ÑÕ…°Í½Í¡…‘½Ü¥µÁ±•µ•¹Ñ…Ñ¥½¹ÌÕ¹¡…¹•¸()•¹•É¥ŒÍ…µÁ±”‘½Ì½Í…µÁ±•Ì½9=5}5A}%9MAQ%=9|ÄÀÌÄ¹¹½´¥Ì½¹”Õ‰”İ¥Ñ …±°Üµ…ÁÌ°)¥¹±Õ‘¥¹œ€ÄØµ‰¥ĞÑÉ¥Á±…¹…È‘¥ÍÁ±…•µ•¹ĞÉ•Ñ…¥¹•™½È¥¹ÍÁ•Ñ¥½¸½•áÁ½ÉĞ¸%¸µ…ÁÀÑ•ÍĞ)±¥ÍĞÕÁ‘…Ñ•ìÁÉ¥½È€¸ÄÀÌÀÉ…Ñ¥¹ÌÉ•Ñ…¥¹•°¹¼¹•Ü½‰…Ñ ¸)Y%ÄÀÌÄ¥µÁ½ÉĞÍ…µÁ±”€´ø=‰©•ĞÉ…‘¥…°UX€´øUX‘¥Ñ½È€´ø%µ…”ì¡½½Í”…±°Ü)¥µ…•Ì¸A…¸½é½½´…¹Íİ¥Ñ ì	…¬Ñ¼Í½±½Í”½É•½Á•¸ìM…Ù•=Á•¸¹‰½á±…ˆ…¹9=5­••À)µ…ÁÌ¸I•Ñ•ÍĞ…•ÁÑ•ÄÀÌÀÙ¥•İÁ½ÉĞÍ…µÁ±”¥˜½¹Ù•¹¥•¹Ğ¸9•áĞ¹…Ñ¥Ù”Ù¥•İ•È™••‘‰…¬°)Ñ¡•¸…Õ‘¥ĞÍÕÁÁ½ÉÑ•A	Hµ…Ñ•É¥…±Ì±…­¥¹œ„½±½ÕÈÑ•áÑÕÉ”ìÍÕ‰‘¥Ù¥Í¥½¸½‘¥ÍÁ±…•µ•¹Ğ)ÍÑ¥±°¹••‘Ì¥ÑÌÍ•Á…É…Ñ”‰½Õ¹‘•Á•É™½Éµ…¹”½‰•¹¡µ…É¬‘•¥Í¥½¸¸((ŒŒ€¸ÄÀÌÄÁÕ‰±¥…Ñ¥½¸Ù•É¥™¥•ƒŠP€ÌÀ=Ñ½‰•È€ÈÀÈØ()IÕ¹Ñ¥µ”àÁ”ÉØÅÔÀÔÈÈØÀÜÍ…˜İ˜Èİ˜ÌàĞÉŒĞÁ•ŒÍ˜áˆÍ‘ì™•Ñ¡•½É¥¥¸½µ…¥¸ÑÉ•”(áŒÅ˜ÜÄÌÁ˜ÁŒÔÕ˜Ù”å•˜ÜÈØàÍ‰•˜ÕŒÕ™•”äÌÅ˜Ñ••ÅÕ…±ÌÙ…±¥‘…Ñ•±½…°Ù‰„á•”äàÑÉ•”¸)±°ÈÔ¡…¹•‰±½‰Ì¡…Í µÙ•É¥™¥•‰•™½É”•áÁ•Ñ•µµ…¥¸½¹½¸µ™½É•ÕÁ‘…Ñ”¸)A…•ÌĞÄÀÔàÜÔÀààÀ½µÁ±•Ñ•MUML¸ä¼ä™É•Í ±¥Ù”‰åÑ”µ…Ñ¡•ÌèÍ¡•±°½µ…¹¥™•ÍĞ°)UX¥µ…”É•Í½±Ù•È½İ½É­ÍÁ…”±5•Í !•…±Ñ ±Ñ•ÍĞ±¥ÍĞ±‘É…İ•È±Õ¹¡…¹•¹…Ñ¥Ù”µ…Ñ•É¥…°)Á±…¸…¹Í…µÁ±”9=4€ ÜĞ°ÌäÙ‰åÑ•ÌìÉ•ÑÉä…™Ñ•È½¹”ÑÉ…¹Í¥•¹ĞÔÀÌ¤¸)Õ±°±½…°9½‘”ÈĞ¸ÈÈ¸ÄèÌÀÔÄAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÈÄ¸ĞİÌ¤°™½ÕÍ•ÜåAML¸)9¼ÉÕ¹Ñ¥µ”½Ñ•ÍĞ•‘¥ÑÌ…™Ñ•È™Õ±°µÍÕ¥Ñ”ÍÑ…ÉĞ¸!½ÍÑ•Ñ½Á½±½äĞÄÀÔàÜÔÄÀÜàİ…Ì)¥¹}ÁÉ½É•ÍÌ…ĞÁÉ½½˜ì¹¼¡½ÍÑ•™Õ±°AML±…¥µ•¸9…Ñ¥Ù”…ÁÁ•…É…¹”…Ñ”Á•¹‘¥¹œ¸)Q¡¥ÌÁÉ½½˜¥Ì‘½Õµ•¹Ñ…Ñ¥½¸µ½¹±äìÉÕ¹Ñ¥µ”½½¹ÑÉ…ĞÍÑ…ä•á…Ñ±äÙ…±¥‘…Ñ•¸()	Õ¥±€¸ÄÀÌÄ1%Y€¼Id=HQMQ%9¸UÍ•È€¸ÄÀÌÀAMLÁÉ½Ñ•Ñ•¸%¸=‰©•Ğµ½‘”)Í•±•ĞÍ…µÁ±”Õ‰”€´øÉ…‘¥…°UX€´øUX‘¥Ñ½È€´ø%µ…”€´ø¥¹ÍÁ•ĞÜ¹…µ•µ…ÁÌ¸)I…Ü¥µ…”É•™•É•¹•Ì°¹¼µ…Ñ•É¥…°ÑÉ…¹Í™½ÉµÌ½™…Ñ½ÉÌì‘¥ÍÁ±…•µ•¹Ğ¥¹ÍÁ•Ñ¥½¸½¹±ä¸)A…¸½é½½´½Íİ¥Ñ ±	…¬Ñ¼Í½±½Í”½É•½Á•¸ìM…Ù•=Á•¸¹‰½á±…ˆ…¹9=5ÁÉ•Í•ÉÙ”µ…ÁÌ¸)9•áĞ¹…Ñ¥Ù”Ù¥•İ•È™••‘‰…¬Ñ¡•¸…Õ‘¥Ğ¹¼µ½±½ÕÈµµ…Àµ…Ñ•É¥…°ÁÉ•Ù¥•Üì‰½Õ¹‘•)ÍÕ‰‘¥Ù¥Í¥½¸½‘¥ÍÁ±…•µ•¹Ğ…¹‰•¹¡µ…É¬‘•¥Í¥½¸É•µ…¥¸‘•™•ÉÉ•¸((ŒŒ€¸ÄÀÌÈƒŠPY%\ÍÑ…ÉÑÕÀÉ•Á…¥È…¹Í•Ù•¸µ½‰©•ĞÉ•Ñ•ÍĞƒŠP€ÌÄ=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸ÄÀÌÄ%0èƒŠpÜ=‰©•ÑÌ‘¥¹½Ğ±½…“Št…¹Y%\µ½‘•ÌƒŠqÍ••´Ñ¼¡…Ù”‰••¸)É•µ½Ù•¸	%%3Št¸MÑ½À™•…ÑÕÉ”É½±±½ÕĞì€¸ÄÀÌÀÉ•µ…¥¹ÌÑ¡”±…ÍĞ…•ÁÑ•‰Õ¥±¸)	…Í•±¥¹”µ…¥¸ÁŒÄá”ØÜà½ÉÕ¹Ñ¥µ”àÁ”ÉØÅ¸Q¡”€¸ÄÀÌÄÍ…µÁ±”QU11d½¹Ñ…¥¹Ì=9Õ‰”)İ¥Ñ Í•Ù•¸µ…ÁÌ°¹½ĞÍ•Ù•¸½‰©•ÑÌ¸9¼¥µÁ½ÉÑ•È½‰©•Ğµ±½ÍÌÉ•ÁÉ½‘ÕÑ¥½¸™½Õ¹ì)É•Á±…”Õ¹±•…ÈÉ•Ñ•ÍĞİ¥Ñ …¸•áÁ±¥¥ĞÍ•Ù•¸µ½‰©•Ğ™¥áÑÕÉ”¥¹ÍÑ•…½˜ÁÉ•Ñ•¹‘¥¹œ)Ñ¡”½É¥¥¹…°™¥±”½¹Ñ…¥¹•Í•Ù•¸¸-••À€¸ÄÀÌÄ™…¥±•½Á•¹‘¥¹œ‘•Ù¥”…Ñ”Ù¥Í¥‰±”¸()Y%\Í½ÕÉ”½‰ÕÑÑ½¹Ìİ•É”¹½Ğ¥¹Ñ•¹Ñ¥½¹…±±äÉ•µ½Ù•¸±½Õ‰É½İÍ•È½¸±¥Ù”ÄÀÌÄ)Í¡½İÌ…±°ÄÈ±½½¬½¹ÑÉ½±Ì°‰ÕĞ±½Õ]•‰0¥Ì‘¥Í…‰±•°Í¼Ñ¡¥Ì‘½•Ì9=PÉ•™ÕÑ”)¹…Ñ¥Ù”™••‘‰…¬½ÈÁÉ½Ù”AT½Á•É…Ñ¥½¸¸½¹É•Ñ”½İ¹•È™±…ÜÉ•ÁÉ½‘Õ•è¥¹ÍÑ…±±U$)ÕÍ•Ì¡½ÍĞ¹¥¹¹•É!Q50°‘•±•Ñ¥¹œ…Ù¥Ñä½M¥±¡½Õ•ÑÑ”¥˜Ñ¡•¥È¥¹‘•Á•¹‘•¹Ğ½İ¹•ÉÌÉÕ¸)™¥ÉÍĞì‘…Ñ…Í•Ğ¹É•…‘ä…±Í¼ÁÉ•Ù•¹ÑÌÉ•ÍÑ½É¥¹œ…¸•µÁÑ¥•¡½ÍĞ¸Qİ¼¹•ÜÉ•…°µ½İ¹•È)=4Ñ•ÍÑÌ%0……¥¹ÍĞÄÀÌÄÍ½ÕÉ”…¹AML…™Ñ•ÈÉ•Á…¥È¸á…Ğ¥A…İ¡½±”µµ•¹Ô)™…¥±ÕÉ”…ÕÍ”É•µ…¥¹ÌÕ¹ÁÉ½Ù•¸ì¹¼ÍÁ•Õ±…Ñ¥Ù”ML½½µÁ½Í¥Ñ½È½È…¡”‘¥…¹½Í¥Ì¸()=É¥¥¹…°É•¹‘•Èµµ½‘•Ì¥¹ÍÑ…±±•È¹½Ü…‘‘Ì½¹±äµ¥ÍÍ¥¹œ‰…Í”‰ÕÑÑ½¹Ì™É½´¥ÑÌÍ…µ”(ÄÀµ‰ÕÑÑ½¸Ñ•µÁ±…Ñ”°ÁÉ•Í•ÉÙ¥¹œ•á¥ÍÑ¥¹œ…Ù¥Ñä½M¥±¡½Õ•ÑÑ”¹½‘•Ì½±¥ÍÑ•¹•ÉÌ¸A•Èµ¡½ÍĞ)‘•±•…Ñ¥½¸‰¥¹‘Ì=9¸9…Ñ¥Ù”Y%\½Á•¸É”µÉÕ¹ÌÑ¡¥Ì¥‘•µÁ½Ñ•¹Ğ¥¹ÍÑ…±±•È°É•ÍÑ½É¥¹œ)µ¥ÍÍ¥¹œ½±•…É•‰…Í”½¹ÑÉ½±Ìİ¥Ñ¡½ÕĞÁ½±±¥¹œ°¹•ÜÉ•¹‘•È•¹¥¹”½È•½µ•ÑÉä¡…¹•Ì¸)=É¥¥¹…°…•É½ÕÀ½¹ÑÉ½±Ì…¹…ÑÕ…°Í•Ñ5½‘”…Ñ¥½¹ÌÉ•Ñ…¥¹•¸9¼Í¡…‘•È½±¥¡Ğ¼)µ…Ñ•É¥…°½Í•±•Ñ¥½¸½¡¥ÍÑ½Éä½¥¹ÁÕĞ½ML½™É½é•¸½µ…¥¸½5Õ±Ñ¤¥µÁ±•µ•¹Ñ…Ñ¥½¸¡…¹•Ì¸()9…Ñ¥Ù”É…Üµ¥µ…”¥¹ÍÁ•Ñ¥½¸…‘…ÁÑ•Èµ½Ù•=UP½˜Í¡…É•ÕØµ¥µ…”µÁÉ•Ù¥•Ü¥¹Ñ¼)İ½É­ÍÁ…”µ½¹±ä¹½µ…µÕØµ¥µ…”µ¡½¥•Ì¸M¡…É•¥µ…”½¹ÑÉ½±±•ÈÉ••¥Ù•Ì¥ÑÌÉ•Í½±Ù•È)…Ì…¸½ÁÑ¥½¸ì1¼ÍÁ…Ñ¡ÌÉ•Ñ…¥¸½É¥¥¹…°É•Í½±Ù•È…¹‘•½‘•È¸Q¡¥ÌÉ•µ½Ù•ÌÑ¡”)¥¹ÍÁ•Ñ¥½¸‘•Á•¹‘•¹ä™É½´Ñ¡”É•¹‘•Èµµ½‘”É…Á ì9=P„±…¥´Ñ¡…Ğ¥Ğ…ÕÍ•Ñ¡”)É•Á½ÉÑ•™…¥±ÕÉ”¸á¥ÍÑ¥¹œÄÀÌÄÍ•Ù•¸µÍ±½Ğ½‰åÑ”¼ÄØµ‰¥Ğ½…¹•°½UXÉ•…µ½¹±äÑ•ÍÑÌÍÑ…ä)…Ñ¥Ù”Ñ¡É½Õ Ñ¡”½É¥¥¹…°İ½É­ÍÁ…”…‘…ÁÑ•È¸9¼‘ÕÁ±¥…Ñ”‘•½‘•È½È¥µ…”Á½½°¸()9•Ü‘½Ì½Í…µÁ±•Ì½9=5}MY9}=	)QM|ÄÀÌÈ¹¹½´èMY8¥¹‘•Á•¹‘•¹ĞÕ‰•Ì¥¸Ñİ¼É½İÌ°)¹…µ•ÀÄ½±½ÕÈ°ÀÈ9½Éµ…°°ÀÌµ¥ÍÍ¥Ù”°ÀĞI½Õ¡¹•ÍÌ°ÀÔ5•Ñ…±¹•ÍÌ°ÀØ=Á…¥Ñä°(ÀÜ¥ÍÁ±…•µ•¹Ğ¸… ½¹Ñ…¥¹Ì=9•á…ĞÉ…Üµ…ÀÉ•™•É•¹”™½ÈUX%µ…”¥¹ÍÁ•Ñ¥½¸¸)9½¸µ½±½ÕÈÕ‰•Ìµ…ä¡…Ù”½É‘¥¹…ÉäÍ½±¥€ÍÍ¡…‘¥¹œìÑ¡¥Ì¥Ì„±½…‘¥¹œ½¥¹ÍÁ•Ñ¥½¸)™¥áÑÕÉ”°¹½Ğ„±…¥´½˜¹¼µ½±½ÕÈµµ…ÀA	H½È‘¥ÍÁ±…•µ•¹ĞÉ•¹‘•É¥¹œÍÕÁÁ½ÉĞ¸)ÑÕ…°¥±”‘¥ÍÁ…Ñ¡•È´ù™¥Ğ´ùµ…¹…•È…‘‘Ì…±°Üì¡•­•Í…µÁ±”µ…Ñ¡•Ì•¹•É…Ñ½È¸)á¥ÍÑ¥¹œÄÀÌÄ½¹”µÕ‰”™¥áÑÕÉ”É•µ…¥¹ÌÉ•ÁÉ½‘Õ¥‰±”ì‘¼¹½Ğ½Ù•ÉİÉ¥Ñ”¥ĞÍ¥±•¹Ñ±ä¸((àÔ™½ÕÍ•AML¼Á%0¼ÁÍ­¥À°¥¹±Õ‘¥¹œĞ¹•ÜÉ•É•ÍÍ¥½¹Ì°…ÑÕ…°¥µÁ½ÉÑ•Ü…¹)İ½É­ÍÁ…”½Y%\½¹…Ñ¥Ù”½1½É•±•…Í”ÁÉ½Ñ•Ñ¥½¸¸I•Ù¥•İ•É•Ù•ÉÍ”µ±½…‘•ÈÁ¥¹ÌÄÀÌÈ…¹)…¹½¹¥…°É•½Ù•Éä¡…¥¸ì½Ñ¡•ÈÉÕ¹Ñ¥µ”)L•‘¥ÑÌ…É”Á¥¹Ì½¹±ä¸Õ±°±½…°9½‘”ÈĞ¸ÈÈ¸ÄèÌÀÔÔAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÀÜ¸ÄÙÌ¤¸9¼ÉÕ¹Ñ¥µ”½Ñ•ÍĞ•‘¥ÑÌ…™Ñ•È™Õ±°µÍÕ¥Ñ”ÍÑ…ÉĞ¸AÕ‰±¥…Ñ¥½¸ÁÉ½½˜™½±±½İÌì¹…Ñ¥Ù”€¸ÄÀÌÈ…•ÁÑ…¹”¥Ì¹½Ğ¥¹™•ÉÉ•¸)%¸µ…ÁÀÑ•ÍĞ±¥ÍĞ•áÁ±¥¥Ñ±ä‘¥ÍÑ¥¹Õ¥Í¡•ÌÍ•Ù•¸=	)QL™É½´Í•Ù•¸5AL¸)Y%ÄÀÌÈ™¥ÉÍĞ½Á•¹Y%\‰•™½É”¥µÁ½ÉĞè…±°ÄÈ±½½­Ì¥¹±Õ‘¥¹œ…Ù¥Ñä½M¥±¡½Õ•ÑÑ”ì)MÑÕ‘¥¼´ùM½±¥´ùMÑÕ‘¥¼…¹±½Í”½É•½Á•¸¸%µÁ½ÉĞ¹•ÜÍ…µÁ±”èÍ•Ù•¸¹…µ•Õ‰•Ìì)Í•±•Ğ„Õ‰”±=‰©•ĞÉ…‘¥…±UX´ùUX‘¥Ñ½È´ù%µ…”Ñ¼Í•”¥ÑÌ=9µ…À±	…­Q¼Í½±½Í”°)É•¡•­Y%\¸=É‰¥Ğ½U¹‘½I•‘¼…¹…•ÁÑ•ÄÀÌÀÑÉ…¹Í™½É´Í…µÁ±”Í…¹¥Ñä¸)9•áĞ=91d‘•Ù¥”É•Á…¥È™••‘‰…¬ì‘•™•È¹•Ü¹…Ñ¥Ù”µ…Ñ•É¥…°½Á•É™½Éµ…¹”™•…ÑÕÉ•Ì¸((ŒŒ€¸ÄÀÌÈ™¥áÑÕÉ”Ù¥Í¥‰¥±¥Ñä…¹É½ÍÌµ9½‘”$½ÉÉ•Ñ¥½¸ƒŠP€ÌÄ=Ñ½‰•È€ÈÀÈØ()¥¹…°‘•µ¼¡•¬™½Õ¹™½ÕÈ•¹ÑÉ…°Íµ…±°Õ‰•Ì½Õ±Í¥Ğ¥¹Í¥‘”Ñ¡”ÍÑ…ÉÑÕÀÍ¥é”Ä)Õ‰”…™Ñ•È½É¥¥¹…°ÈµÕ¹¥Ğ¥µÁ½ÉĞ™¥ÑÑ¥¹œ¸%¹É•…Í”Ñ¡”Ñİ¼µÉ½ÜÍÁ…¥¹œì…ÑÕ…°¥±”)¥µÁ½ÉĞÑ•ÍĞ¹½ÜÉ•ÅÕ¥É•Ì•Ù•Éä¥µÁ½ÉÑ•Õ‰”Ñ¼±¥”±•…È½˜ÍÑ…ÉÑÕÀÕ‰”¥¸h¸)9¼…ÁÁ±¥…Ñ¥½¸¥µÁ½ÉĞ½™¥Ğ½Í½ÕÉ”µÁ½Í¥Ñ¥½¸Á½±¥ä¡…¹•¸M•Ù•¸µ½‰©•ĞÍ…µÁ±”ÍÑ…åÌ(äÄ°Ôàá‰åÑ•Ì…¹­••ÁÌ½É¥¥¹…°µ…À‰åÑ•Ì¸9•ÜÍ…µÁ±”Á±…•µ•¹Ğ¥ÌÁ…ÉĞ½˜€¸ÄÀÌÈÉ•Ñ•ÍĞ¸()!½ÍÑ•ĞÄÄĞØÌØÈÌäĞ™…¥±•¸1½œÑ½½°É•Á•…Ñ•‘±ä±½Í•ÑÉ…¹ÍÁ½ÉĞ¸I•ÁÉ½‘Õ•±½…±±ä)İ¥Ñ •á…Ğ$9½‘”ÈÈ¸ÈÌ¸ĞèÌÀÔÍAML¼É%0ì‰½Ñ ™…¥±ÕÉ•Ìİ•É”™É•Í¡±ä½µÁÉ•ÍÍ•A9)‰åÑ”½µÁ…É¥Í½¹Ì……¥¹ÍĞ¡•­•µ¥¸‘•µ¼™¥±•Ì¸9½‘”ÈÈ…¹ÈĞ½µÁÉ•ÍÍ¥½¹MÑÉ•…´)ÁÉ½‘Õ”‘¥™™•É•¹ĞÙ…±¥é±¥ˆ‰åÑ•Ì¸9•ÜÑ•ÍĞ¡•±Á•È¥¹‘•Á•¹‘•¹Ñ±äÁ…ÉÍ•Ì‰½Ñ 9=5Ì°)¡•­Ì•á…Ğ¹…µ•Ì½•½µ•ÑÉä½UX½µ…Ñ•É¥…°‰¥¹‘¥¹Ì°A9I½‘¥µ•¹Í¥½¹Ì½ÑåÁ”½¡Õ¹­Ì¼)™¥±Ñ•ÉÌ…¹‘•½‘•I	ì±¥Ñ•É…°ÄØµ‰¥Ğ‘¥ÍÁ±…•µ•¹ĞÉ•µ…¥¹Ì‰åÑ”µ•á…Ğ¸á¥ÍÑ¥¹œ)Á½½±•½¥¹±¥¹”M…Ù•=Á•¸½9=4M=UIµ	eQÉ½Õ¹µÑÉ¥À…ÍÍ•ÉÑ¥½¹Ì…É”Õ¹¡…¹•¸ÑÕ…°)¡•­•µ¥¸Í•Ù•¸µ½‰©•Ğ™¥±”¹½Ü½•ÌÑ¡É½Õ É•…°¥±”‘¥ÍÁ…Ñ¡•È¥¸Ñ¡”Ñ•ÍĞ¸)	½Ñ …™™•Ñ•™¥áÑÕÉ•ÌèÙAML¼Á%0½¸9½‘”ÈÈ99½‘”ÈĞ…™Ñ•È½ÉÉ•Ñ¥½¸¸Õ±°™¥¹…°)9½‘”ÈÈ…¹¡½ÍÑ•É•ÉÕ¸Á•¹‘¥¹œ¸ÁÁ±¥…Ñ¥½¸)LÉ•µ…¥¹Ì‰åÑ”µ¥‘•¹Ñ¥…°Ñ¼ØÜĞàÈáÔ¸((ŒŒ€¸ÄÀÌÈÁÕ‰±¥…Ñ¥½¸…¹™¥¹…°É•Ñ•ÍĞÁÉ½½˜ƒŠP€ÌÄ=Ñ½‰•È€ÈÀÈØ()ÁÁ±¥…Ñ¥½¸ÉÕ¹Ñ¥µ”ØÜĞàÈáÔÄÕ”Õ‘ˆÍÙ…„àİ™˜Ñ˜Ñ™™˜äÑ‘”ĞÜÄäå„½ÑÉ•”ĞÄäÄİˆÉµ…Ñ¡•)Ù…±¥‘…Ñ•±½…°ÀÑØàØÍŒÑÉ•”ìÈäÕÁ±½…‘•‰±½‰ÌÙ•É¥™¥•¸¥¹…°Í…µÁ±”½Ñ•ÍĞ½ÉÉ•Ñ¥½¸)ˆÜÌàÄá•Í‘•••ŒÄÈàÀàÌá”ÙŒÌåŒÍˆÀÄÅ‘”Àá•ˆÄ½ÑÉ••ˆØØİ˜ÜĞÄµ…Ñ¡•Ù…±¥‘…Ñ•±½…°àÙ˜Ù‰”Á”¸)ÁÁ±¥…Ñ¥½¸)LÉ•µ…¥¹Ì‰åÑ”µ¥‘•¹Ñ¥…°Ñ¼ØÜĞàÈáÔ¸¥¹…°Í…µÁ±”‰±½ˆè(Ñ„å„ÄÙĞÄå˜ĞÀØàĞàİ„ÉÀäÍ„äàÔÁ˜àÌá‰ŒÙ•‰€ äÄ°Ôàá‰åÑ•Ì¤¸MÁ…•É½İÌ­••À•Ù•ÉäÕ‰”)±•…È½˜Í¥é”ÄÍÑ…ÉÑÕÀÕ‰”QH½É¥¥¹…°ÈµÕ¹¥Ğ¥µÁ½ÉĞ™¥Ğì…ÑÕ…°¥±”Ñ•ÍĞ…ÍÍ•ÉÑÌ)Ñ¡…ĞÍ•Á…É…Ñ¥½¸™½È…±°Ü¸%µÁ½ÉĞLÍ•Ù•¸¹…µ•Õ‰•Ìì…¸•á¥ÍÑ¥¹œÕ‰”µ…äÉ•µ…¥¸¸()A…•ÌĞÄÄĞÜØÄààäÈMUML¸±°à¡•­•ÁÕ‰±¥ŒÁ…Ñ¡Ìµ…Ñ ™¥¹…°…ÁÀ½Í…µÁ±”½¹Ñ•¹Ğè)Í¡•±°½µ…¹¥™•ÍĞ±É•¹‘•È½İ¹•È±Í¡…É•¥µ…”É•Í½±Ù•È±UXİ½É­ÍÁ…”±¹…Ñ¥Ù”…‘…ÁÑ•È±Ñ•ÍĞ)±¥ÍĞ…¹™¥¹…°ÍÁ…•Í…µÁ±”€¡Í…µÁ±”É•¡•­•…™Ñ•È™¥¹…°‘•Á±½åµ•¹Ğ¤¸1¥Ù”±½Õ)=4èÑ¥Ñ±”ÄÀÌÈ±…±°ÄÈ±½½­Ì¥¹±Õ‘¥¹œ…Ù¥Ñä½M¥±¡½Õ•ÑÑ”±MÑÕ‘¥¼´ùM½±¥´ùMÑÕ‘¥¼ÍÑ…ÑÕÌ°)±½Í”½É•½Á•¸É•Ñ…¥¹Ì±¥ÍĞ¸±½Õ]•‰0É•µ…¥¹Ì‘¥Í…‰±•ìÍÉ••¹Í¡½ĞA$Ñ¥µ•½ÕĞ¸)Q¡¥Ì¥ÌU$½=4…Ñ¥Ù…Ñ¥½¸•Ù¥‘•¹”°¹½ĞAT½¥A…Á¥á•°½Èµ…Ñ•É¥…°…•ÁÑ…¹”¸()Õ±°9½‘”ÈĞ¸ÈÈ¸ÄèÌÀÔÕAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÀÜ¸ĞÑÌ¤°™¥¹…°™¥áÑÕÉ”µ½¹±äÙAML¸)Õ±°™¥¹…°$µµ…Ñ¡¥¹œ9½‘”ÈÈ¸ÈÌ¸ĞèÌÀÔÕAML¼Á%0¼ÁÍ­¥À¼Á…¹•°€ ÄÀÀ¸ÄáÌ¤¸)=±¡½ÍÑ•ĞÄÄĞØÌØÈÌäĞ™…¥±•½¸Ñ¡”Ñİ¼É½ÍÌµ9½‘”½µÁÉ•ÍÍ•µ‘•µ¼µ‰åÑ”½µÁ…É¥Í½¹Ìì)É•ÁÉ½‘Õ•ÌÀÔÍAML¼É%0½¸9½‘”ÈÈ¸I•Á±…•=91d‘•µ¼µ•ÅÕ¥Ù…±•¹”…ÍÍ•ÉÑ¥½¹Ìİ¥Ñ )¥¹‘•Á•¹‘•¹Ğ•á…Ğ•½µ•ÑÉä½UX½µ…Ñ•É¥…°‰¥¹‘¥¹Ì±I½A9Á¥á•±Ì…¹±¥Ñ•É…°ÄØµ‰¥Ğ)‰åÑ•Ì¸AÉ½‘ÕÑ¥½¸Í½ÕÉ”µ‰åÑ”É½Õ¹µÑÉ¥À…ÍÍ•ÉÑ¥½¹ÌÍÑ…äÕ¹¡…¹•¸½ÉÉ•Ñ•¡½ÍÑ•)É•ÉÕ¸ĞÄÄĞÜØÄàäÜÔİ…Ì¥¹}ÁÉ½É•ÍÌ…ĞÑ¡¥ÌÁÉ½½˜ì¥ÑÌ™¥¹…°É•ÍÕ±Ğ¥ÌÉ•½É‘•¥¸)‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÌÈµ¤¹µ‘€¸¼¹½Ğ¥Ñ”Ñ¡”ÍÕÁ•ÉÍ•‘•™…¥±•ÉÕ¸…ÌÕÉÉ•¹Ğ$¸()¥Ñ!ÕˆÕÁ±½…½É•˜•ÉÉ½ÉÌİ•É”ÑÉ…¹Í¥•¹ĞèÉ•ÕÁ±½…‘•Ñİ¼½ÉÁ¡…¸‰±½‰Ì±Ù•É¥™¥••á…Ğ)ÑÉ•”ìIMPµÉ•…Ñ•½ÉÉ•Ñ¥½¸½µµ¥Ğİ…Ì¥¹¥Ñ¥…±±äÕ¹…Ù…¥±…‰±”Ñ¼É…Á¡E0É•˜ÕÁ‘…Ñ”¸)¹¡½É•¥ĞÙ¥„É•Á…¥È¼ÄÀÌÈµ™¥áÑÕÉ”µÙ…±¥‘…Ñ¥½¸±Ñ¡•¸•áÁ•Ñ•µµ…¥¸¹½¸µ™½É•ÕÁ‘…Ñ”)ÍÕ••‘•¸-••ÀÑ¡¥ÌÉ•½Ù•ÉäÉ•™•É•¹”ì¹¼™½É”ÁÕÍ ½ÈÁ•Éµ¥ÍÍ¥½¸‰åÁ…ÍÌÕÍ•¸()	Õ¥±€¸ÄÀÌÈ1%Y€¼Id=H9Q%YIQMP½¹”™¥¹…°¡½ÍÑ•É•ÍÕ±Ğ‰•±½Ü¥Ì¡•­•¸(¸ÄÀÌÄÕÍ•È%0É•µ…¥¹ÌÉ•½É‘•ì€¸ÄÀÌÀ¥Ì±…ÍĞÕÍ•Èµ…•ÁÑ•‰Õ¥±¸9¼€¸ÄÀÌÈAML)¥¹™•ÉÉ•¸Y%èY%\…±°ÄÈ‰•™½É”¥µÁ½ÉĞ±MÑÕ‘¥¼½M½±¥½É•½Á•¸ì¥µÁ½ÉĞ%90Í…µÁ±”(ÀÅ½±½ÕÈÑ¡É½Õ Àİ¥ÍÁ±…•µ•¹ĞìÍ•±•Ğ„Õ‰”±É…‘¥…±UX´ùUX‘¥Ñ½È´ù%µ…”Í¡½İÌ¥ÑÌ)=9É…Üµ…Àí	…­Q¼Í½±½Í”…¹É•¡•­Y%\¸á…Ğ½É¥¥¹…°¥A…İ¡½±”µµ•¹Ô™…¥±ÕÉ”)…ÕÍ”É•µ…¥¹ÌÕ¹ÁÉ½Ù•¸ìÉ•Á…¥É•‘•Ñ•Éµ¥¹¥ÍÑ¥Œ½Ù•ÉİÉ¥Ñ”½É•…‘äµ¡½ÍĞ‘•™•ÑÌ½Ù•É•¸)9¼¹•Ü™•…ÑÕÉ”İ½É¬Õ¹Ñ¥°É•Á…¥È™••‘‰…¬¸((ŒŒ€¸ÄÀÌÈÕÍ•ÈAMLƒŠP±½…‘¥¹œ½Y%\…•ÁÑ•ìµ…Ñ•É¥…°…ÁÌ½‰Í•ÉÙ•ƒŠP€ÌÄ=Ñ½‰•È€ÈÀÈØ()UÍ•È•áÁ±¥¥Ñ±äèƒŠpÄÀÌÈAML€ø…±°€ÜÕ‰•ÌÙ¥Í¥‰±”°¹¼ÁÉ½‰±•µÌİ¥Ñ Ù¥•Üµ½‘”)‘¥Í…ÁÁ•…É¥¹œ»ŠtAÉ½Ñ•ĞÍ•Ù•¸µ½‰©•ĞÙ¥Í¥‰¥±¥Ñä½ÍÁ…¥¹œ°Y%\ÍÑ…ÉÑÕÀÁÉ•Í•ÉÙ…Ñ¥½¸°)…±°½É¥¥¹…°µ½‘”…Ñ¥½¹Ì½É•½Á•¸…¹€¸ÄÀÌÀ…•ÁÑ•‰•¡…Ù¥½ÕÈ¸Q¡¥Ì¥Ì9=P¹…Ñ¥Ù”)ÍÑ…¹‘…±½¹”µA	H½‘¥ÍÁ±…•µ•¹Ğ½½Á…ÅÕ”µ½±½ÕÈµ…±Á¡„…•ÁÑ…¹”¸9¼¹•Ü‰Õ¥±Ñ¡¥ÌÕÁ‘…Ñ”¸()UÍ•ÈÍÉ••¹Í¡½ÑÌè	½á1…ˆÍ¡½İÌ½¹±ä½±½ÕÈÕ‰”Ñ•áÑÕÉ•°½Ñ¡•ÈÍ¥àÁ±…¥¸¸9½µ…)Í¡½İÌ9½Éµ…°½µ¥ÍÍ¥Ù”½Í…±…È½=Á…¥Ñä½¥ÍÁ±…•µ•¹Ğ•™™•ÑÌì½±½ÕÈÕ‰”Í½±¥å…¸¸)M½ÕÉ”…Õ‘¥Ğ½¹™¥ÉµÌ¹…Ñ¥Ù”¹½µ…‘½±½ÕÉMÕÉ™…•M½ÕÉ”É•ÑÕÉ¹Ì¹Õ±°İ¥Ñ¡½ÕĞ½±½Èì)¹½µ…‘A	IMÕÉ™…•M½ÕÉ•Ì…¹½É¥¥¹…°UX½Ù•É±…ä½¹Í•ÅÕ•¹Ñ±ä…¹¹½Ğ…Ñ¥Ù…Ñ”½Ñ¡•È)µ…ÁÌ‰äÑ¡•µÍ•±Ù•Ì¸M•Ù•¸µ½‰©•Ğ™¥áÑÕÉ”¥¹Ñ•¹Ñ¥½¹…±±ä…ÍÍ¥¹Ì•á…Ñ±ä½¹”Í±½Ğ)Á•ÈÕ‰”¸Q¡•É•™½É”Ñ¡¥Ì•áÁ½Í•ÌÑ¡”É•µ…¥¹¥¹œ¹¼µ½±½ÕÈµµ…ÀÙ¥•İÁ½ÉĞ‘•Á•¹‘•¹äì)É•Ñ…¥¹•µ…ÁÌİ•É”¹½Ğ±½ÍĞ¸áÑ•¹Ñ¡”M5É•Í½ÕÉ”½µ…Ñ•É¥…°½Ù•É±…ä½İ¹•ÉÌ™½È)ÍÕÁÁ½ÉÑ•¹½Éµ…°½•µ¥ÍÍ¥Ù”½É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌ½½Á…¥Ñäİ¥Ñ¡½ÕĞÉ•ÅÕ¥É¥¹œ„½±½Èµ…À¸)¥ÍÁ±…•µ•¹ĞÉ•µ…¥¹ÌÍ•Á…É…Ñ•±ä‘•™•ÉÉ•‰•¡¥¹ÍÕ‰‘¥Ù¥Í¥½¸½Á•É™½Éµ…¹”…Ñ•Ì¸()%µÁ½ÉÑ…¹Ğ™¥áÑÕÉ”™¥¹‘¥¹œè€ÀÅ½±½ÕÈA9¥ÌÄÈáàÄÈàİ¥Ñ aQ1d=9IÙ…±Õ”)lÔÔ°ÄÜÔ°ÈÈÁt°…¹…±Á¡„À¼ÈÔÔ¡•­•È¸Ù•Éä™¥áÑÕÉ”µ…Ñ•É¥…°¡…ÌÕÍ•}½±½É}½Á…¥ÑäôÀ¸)9½µ…ÌÕ¹¥™½É´å…¸¥Ì•áÁ•Ñ•èÑ¡”¡•­•È¥Ì1A!°¹½Ğ„½±½ÕÈÁ…ÑÑ•É¸¸¼)¹½Ğ…±°Ñ¡¥Ìµ¥ÍÍ¥¹œ½±½ÕÈÑ•áÑÕÉ”½È¡…¹”9½µ…‰¥¹‘¥¹Ì‰…Í•½¸…ÁÁ•…É…¹”¸)	½á1…ˆÌ¡•­•È½‰±…¬ÍÅÕ…É•Ì‘•ÍÁ¥Ñ”…±Á¡…=¥Ì„Í•Á…É…Ñ”‘¥ÍÉ•Á…¹ä¸9…Ñ¥Ù”)Á±…¸É•ÅÕ•ÍÑÌÕ¹ÁÉ•µÕ±Ñ¥Á±¥•‰¥Ñµ…À‰ÕĞ‰É½İÍ•È‘•½‘”½É•Í…µÁ±¥¹œµ…ä±½Í”I)Õ¹‘•È…±Á¡„Àì•á…Ğ…ÕÍ”¹½ĞÙ•É¥™¥•½¸¥A…¸¼¹½Ğ±…¥´¥Ğ™¥á•™É½´„µ½­•)‰¥Ñµ…ÀÑ•ÍĞ¸%¹Ù•ÍÑ¥…Ñ”½É¥¥¹…°‘•½‘•È°­••ÀÍ½ÕÉ”‰åÑ•ÌÕ¹¡…¹•°…¹ÕÍ”„)É•…°½Á…ÅÕ”I½±½ÕÈµ¡•­•È¥¸Ñ¡”¹•áĞ½µÁ…É¥Í½¸™¥áÑÕÉ”Ñ¼…Ù½¥…µ‰¥Õ¥Ñä¸()MÑ…ÑÕÌèÕÉÉ•¹Ğ1%YÄÀÌÈì•áÁ±¥¥Ğ±½…‘¥¹œ½Y%\AMLÁÉ½Ñ•Ñ•¸5…Ñ•É¥…°Ù¥•İÁ½ÉĞ)…À…¹…±Á¡…=½±½ÕÈ‘¥ÍÉ•Á…¹ä=A8¸9¼ÉÕ¹Ñ¥µ”½½‘”½¹•Ü‰Õ¥±Ñ¡¥ÌÕÁ‘…Ñ”¸)9•áĞÍ½Á•‰Õ¥±è…Õ‘¥Ğ¹¼µ½±½ÕÈ¹…Ñ¥Ù”‰…Í”µ…Ñ•É¥…°Á…Ñ °ÁÉ•Í•ÉÙ”…•ÁÑ•(ÄÀÌÈU$°…‘µ•…¹¥¹™Õ°Á•Èµ¡…¹¹•°Í…µÁ±”…¹…ÑÕ…°½İ¹•È½Ù•É…”ì¥¹Ù•ÍÑ¥…Ñ”)…±Á¡…=½±½ÕÈÍ•Á…É…Ñ•±ä°É•Ñ…¥¹¥¹œ‘¥ÍÁ±…•µ•¹Ğ…Ì¥¹ÍÁ•Ñ¥½¸½•áÁ½ÉĞµ½¹±ä¸)A½ÍÍ¥‰±”¡•­Ì¹½ÜèUX‘¥Ñ½È%µ…”½¸9½Éµ…°½=Á…¥Ñä½¥ÍÁ±…•µ•¹ĞÕ‰•Ì½¹™¥ÉµÌ)É•Ñ…¥¹•É•™•É•¹•Ìì¹¼É•Á•…Ñ•±½…‘¥¹œ½Y%\É•É•ÍÍ¥½¸Ñ•ÍĞ½ÈÉ•¥¹ÍÑ…±°¹••‘•¸((ŒŒ€¸ÄÀÌÌƒŠPÍÑ…¹‘…±½¹”¹…Ñ¥Ù”µ…Ñ•É¥…°µ…ÁÌƒŠP€ÌÄ=Ñ½‰•È€ÈÀÈØ()ÕÉÉ•¹Ğ‰Õ¥±è€À¸ÌØ¸Äà¸ÄÀÌÌ¸A…É•¹Ğµ…¥¸è€ÅÜĞÑˆØÍ™˜ÌÕ…™•„İ„ÔÙˆÀÅŒÁ™‰àÅˆÔÌØĞÕ˜¸)I•ÕÍ•Ì¹½µ…µµ…Ñ•É¥…°µÉ•Í½ÕÉ”…¹ÕØµ¥µ…”µÍÕÉ™…”µÁÉ•Ù¥•ÜèMÑÕ‘¥¼½M½±¥¹½Ü)…•ÁĞ¹½Éµ…°°•µ¥ÍÍ¥Ù”°É½Õ¡¹•ÍÌ°µ•Ñ…±¹•ÍÌ…¹½Á…¥Ñäµ…ÁÌİ¥Ñ¡½ÕĞ„½±½ÕÈ)¥µ…”°ÕÍ¥¹œ¹…Ñ¥Ù”½¹ÍÑ…¹Ğ½±½È€¡İ¡¥Ñ”‘•™…Õ±Ğ¤°É½Õ¡¹•ÍÌ€¸ÈÔ°µ•Ñ…±¹•ÍÌ€À¸)9¼•¹•É…Ñ•½±½ÕÈÑ•áÑÕÉ”½ÈÁ…É…±±•°É•¹‘•É•È¸%¹Ù…±¥•á¥ÍÑ¥¹œ½±½ÕÈ‰¥¹‘¥¹Ì°)Õ¹±¥Ğ°Õ¹ÍÕÁÁ½ÉÑ•ÁÉ½©•Ñ¥½¹Ì½µ…Ñ•É¥…±Ì…¹‘¥ÍÁ±…•µ•¹Ğµ½¹±ä­••ÀÁÉ¥½È™…±±‰…¬¸)5…Àµ½¹±ä½Ù•É±…äÉ•Á±…•Ì‰½‘ä½¹±ä…™Ñ•È„ÍÕ•ÍÍ™Õ°‘•½‘”ì™…¥±•½±…Ñ”İ½É¬)É•±•…Í•ÌÑ¡”½É¥¥¹…°½İ¹•È…¹É•Í•ÉÙ…Ñ¥½¸¸M½ÕÉ”¥µ…•Ì½UYÌ½µ…Ñ•É¥…±ÌÉ•µ…¥¸•á…Ğ¸()AÉ½Ñ•Ğ•áÁ±¥¥Ğ€¸ÄÀÌÈÕÍ•ÈAMLèÍ•Ù•¸µÕ‰”Ù¥Í¥‰¥±¥Ñä½ÍÁ…¥¹œ…¹Y%\ÍÑ…‰¥±¥Ñä¸)½ÕÈ½±½ÕÈÍÕÉ™…•ÌÉ•µ…¥¸ÁÉ½Ñ•Ñ•ìÕÀÑ¼•¥¡Ğµ…Àµ½¹±äÍÕÉ™…•ÌÍ¡…É”½É¥¥¹…°)…É•…Ñ”•¥±¥¹Ìè€ÄÕ4‘•½‘•Á¥á•±Ì°€àÁ¬UX½É¹•ÉÌ°€ÌÉ5¥•¹½‘•Í½ÕÉ•Ì¸)A•Èµµ…À±¥µ¥ÑÌÕ¹¡…¹•¸A…É•¹Ğ±½…‘•È¡…¹•Ì…É”…¡”µÁ¥¸µ½¹±ä¸µ…¥¸¹©Ì…¹)µÕ±Ñ¤µ½‰©•ĞµÑÉ…¹Í™½É´É•µ…¥¸Õ¹Ñ½Õ¡•ì¹¼‰É½…U$¡…¹•Ì¸()É•Í ½µÁ…É¥Í½¸è‘½Ì½Í…µÁ±•Ì½9=5}MQ91=9}5AM|ÄÀÌÌ¹¹½´¸M•Ù•¸¥¹‘•Á•¹‘•¹Ğ)¹…µ•Õ‰•Ì°Í…µ”…•ÁÑ•ÍÁ…¥¹œìQIU½Á…ÅÕ”I¡•­•È™½È½±½ÕÈ…¹)µ¥ÍÍ¥Ù”¸€¸ÄÀÌÈ™¥áÑÕÉ”É•µ…¥¹Ì¥µµÕÑ…‰±”¸¥ÍÁ±…•µ•¹ĞÍÑ…åÌÉ•Ñ•¹Ñ¥½¸½¥¹ÍÁ•Ñ¥½¸)½¹±ä°Á•¹‘¥¹œÍÕ‰‘¥Ù¥Í¥½¸½Á•É™½Éµ…¹”İ½É¬¸=É¥¥¹…°€¸ÄÀÌÈ…±Á¡„µ=å…¸½‰±…¬)‰¥Ñµ…À‘¥ÍÉ•Á…¹äÉ•µ…¥¹Ì=A8…¹¥Ì¹½Ğ™¥á•‰äÑ¡”¹•ÜÍ…µÁ±”¸()!…¹‘Ìµ½¸Á•¹‘¥¹œè¥µÁ½ÉĞ¹•ÜÍ…µÁ±”°Ù•É¥™ä…±°Í•Ù•¸Õ‰•Ì…¹Í¥àÍÕÁÁ½ÉÑ•)µ…Ñ•É¥…°¡…¹¹•±Ì¥¸MÑÕ‘¥¼½M½±¥ì¥¹ÍÁ•Ğ±½ÍÌ½É•™±•Ñ¥½¹Ìİ¡¥±”½É‰¥Ñ¥¹œ¸)¡•¬½Á…¥Ñä¡½±•Ì…¹Í¡…‘½İÌ°Íİ¥Ñ ½É•½Á•¸…±°Y%\µ½‘•Ì°5½Ù”½U¹‘¼½I•‘¼°)M…Ù”½=Á•¸…¹•áÁ½ÉĞ9=4¸UÍ•ÈAMLÉ•ÅÕ¥É•™½È…ÑÕ…°¥A…½AT…ÁÁ•…É…¹”¸)9•áĞè…‘‘É•ÍÌ…±Á¡„µ=‰¥Ñµ…À‘•½‘¥¹œÍ•Á…É…Ñ•±ä…™Ñ•ÈÑ¡¥Ìµ…Ñ•É¥…°Ù…±¥‘…Ñ¥½¸¸)Y…±¥‘…Ñ¥½¸è9½‘”ÈÈ™Õ±°ÍÕ¥Ñ”€ÌÀÔàAML°€À%0€ ÄÀÈ¸ÈåÌ¤ì™¥¹…°…‘‘¥Ñ¥½¹…°‰Õ‘•Ğ¡•¬…¹…±°™½ÕÈ€¸ÄÀÌÌ™½ÕÍ•Ñ•ÍÑÌAML½¸9½‘”ÈÈ¸á¥ÍÑ¥¹œ€ÌÀ¹…Ñ¥Ù”µ…Ñ•É¥…°Ñ•ÍÑÌAML¸¥Ğ‘¥™˜€´µ¡•¬±•…¸¸!½ÍÑ•$ĞÄÄÔÀäØàÔÌà…¹A…•ÌĞÄÄÔÀäØÜàÌÄMUMLì±¥Ù”‰åÑ•ÌÙ•É¥™¥•¸()AÕ‰±¥…Ñ¥½¸è…ÁÁ±¥…Ñ¥½¸½µµ¥Ğ‰‰”ÄàäØÔàÄÄÜÙ…‰‘™ˆÈäÜĞÀĞÄØÅÔÀÈÍˆÍå„ÈÙ„°)É•Ù¥•İ•ÑÉ•”€àÔÔÑÈÅ„ÔÀØá˜Ù˜ÌáˆÁ™•ˆÅàÈÕ‰ÁŒÀĞÌØĞÍˆÀ°™•Ñ¡•µ…¥¸Ù•É¥™¥•¸)A…•ÌĞÄÄÔÀäØÜàÌÄMUMLì±¥Ù”Ù•ÉÍ¥½¸½Í¡•±°½µ…Ñ•É¥…°½½Ù•É±…ä½É•¹‘•È½Ñ•ÍĞµ±¥ÍĞ…¹(äÄ°ÔÈàµ‰åÑ”Í…µÁ±”…±°‰åÑ”µ¥‘•¹Ñ¥…°¸M•”‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÌÌ¹µ¸!½ÍÑ•)Q½Á½±½äÉ•É•ÍÍ¥½¸ĞÄÄÔÀäØàÔÌà½µÁ±•Ñ•MUML¸€¸ÄÀÌÌ1%Y…¹Id=HQMQ%9¸)5…¹Õ…°¥A……ÁÁ•…É…¹”…•ÁÑ…¹”É•µ…¥¹ÌÁ•¹‘¥¹œì€¸ÄÀÌÈ±½…‘¥¹œ½Y%\AMLÁÉ½Ñ•Ñ•¸((ŒŒ€¸ÄÀÌÌÕÍ•ÈAMLÁÉ½Ñ•Ñ•ƒŠP€ÌÄ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á±¥•AML…™Ñ•È€¸ÄÀÌÌÍÑ…¹‘…±½¹”µµ…Ñ•É¥…°Ñ•ÍĞ‰Õ¥±¸AÉ½Ñ•Ğ…•ÁÑ•)ÍÑ…¹‘…±½¹”¹½Éµ…°½•µ¥ÍÍ¥Ù”½É½Õ¡¹•ÍÌ½µ•Ñ…±¹•ÍÌ½½Á…¥ÑäÁÉ•Ù¥•ÜÑ¡É½Õ •á¥ÍÑ¥¹œ)½İ¹•ÉÌ°Í¥àÍÕÁÁ½ÉÑ•µ…ÁÁ•Õ‰•Ì°Í•Ù•¸µ½‰©•Ğ±½…‘¥¹œ°Y%\ÍÑ…‰¥±¥Ñä…¹)ÁÉ•Ù¥½ÕÌ…•ÁÑ•‰•¡…Ù¥½ÕÈ¸9¼¹•Ü…ÁÁ±¥…Ñ¥½¸‰Õ¥±¥¸Ñ¡¥ÌÕÁ‘…Ñ”¸)Q¡¥ÌAML‘½•Ì¹½Ğ±½Í”Ñ¡”Í•Á…É…Ñ•±ä‘•™•ÉÉ•‘¥ÍÁ±…•µ•¹ĞÁÉ•Ù¥•Ü½ÈÑ¡”)½É¥¥¹…°€¸ÄÀÌÈ…±Á¡„µ=½±½ÕÈ‘¥ÍÉ•Á…¹ä€¡¹•Ü€¸ÄÀÌÌÍ…µÁ±”ÕÍ•Ì½Á…ÅÕ”I¤¸)9•áĞ¹…ÉÉ½Ü‰Õ¥±èÉ•Á…¥È½É¥¥¹…°…±Á¡„µ=½±½ÕÈ‰¥Ñµ…À‘•½‘”½É•Í…µÁ±¥¹œ°)ÁÉ•Í•ÉÙ¥¹œI‰•¹•…Ñ ÑÉ…¹ÍÁ…É•¹ĞÁ¥á•±Ìİ¥Ñ¡½ÕĞ¡…¹¥¹œÉ•Ñ…¥¹•Í½ÕÉ”‰åÑ•Ì¸)Q¡•¸…Õ‘¥Ğ‘¥ÍÁ±…•µ•¹ĞÁÉ•Ù¥•ÜÍÕ‰‘¥Ù¥Í¥½¸½Á•É™½Éµ…¹”…Ñ•Ì‰•™½É”¥µÁ±•µ•¹Ñ…Ñ¥½¸¸)ÕÉÉ•¹ĞÍÑ…ÑÕÌè€¸ÄÀÌÌ1%Y°ÕÍ•ÈAMLì…İ…¥Ñ¥¹œ¹•áĞ€½¹•áÑ‰Õ¥±™½ÈÉÕ¹Ñ¥µ”İ½É¬¸)=ÁÑ¥½¹…°É•É•ÍÍ¥½¸è½É¥¥¹…°€¸ÄÀÌÈ½±½ÕÈÕ‰”Í¡½Õ±•Ù•¹ÑÕ…±±ä‰”Í½±¥å…¸)İ¥Ñ ½±½ÕÈ½Á…¥Ñä=ì•¹…‰±¥¹œ½Á…¥ÑäÍ¡½Õ±É•Ù•…°¥ÑÌ…±Á¡„¡•­•È¸(((ŒŒ€¸ÄÀÌĞƒŠP¹…Ñ¥Ù”½±½ÕÈ…±Á¡„=Í¡…‘•È½ÉÉ•Ñ¥½¸ƒŠP€ÌÄ=Ñ½‰•È€ÈÀÈØ()ÕÉÉ•¹ĞÉÕ¹Ñ¥µ”Ñ…É•Ğè€À¸ÌØ¸Äà¸ÄÀÌĞ¸A…É•¹Ğ€¸ÄÀÌÌÕÍ•ÈAML¥ÌÁÉ½Ñ•Ñ•°)¥¹±Õ‘¥¹œÍÑ…¹‘…±½¹”A	Hµ…ÁÌ°Í•Ù•¸µ½‰©•Ğ¥µÁ½ÉĞ…¹Y%\ÍÑ…‰¥±¥Ñä¸()Õ‘¥Ğ™½Õ¹Ñ¡”ÁÉ•¥Í”…±Á¡„µ=‘•™•Ğ¥¸Ñ¡”•á¥ÍÑ¥¹œ¹…Ñ¥Ù”UXÍÕÉ™…”½İ¹•Èè)Ñ¡”Iµ½¹±äµ…ÀÍ¡…‘•È¡½½¬İ…Ì¥¹ÍÑ…±±•½¹±äİ¡•¸½Á…¥Ñå5½‘” ¤É…¸¸¹…Ñ¥Ù”)½±½ÕÈÑ•áÑÕÉ”İ¥Ñ ÕÍ•}½±½É}½Á…¥Ñäõ™…±Í”…¹¹¼Í•Á…É…Ñ”½Á…¥Ñäµ…ÀÑ¡•É•™½É”)™•±°Ñ¡É½Õ Ñ¼Q¡É•”Ì‘•™…Õ±Ğ‘¥™™ÕÍ•½±½È€¨ôÍ…µÁ±•‘¥™™ÕÍ•½±½È°µÕ±Ñ¥Á±å¥¹œ)Ñ¡”½¹ÍÑ…¹Ğå…¸I‰äÑ¡”¥µ…”Ì¡•­•È…±Á¡„…¹ÁÉ½‘Õ¥¹œ‰±…¬ÍÅÕ…É•Ì¸)Q¡”½É¥¥¹…°½İ¹•È¹½Ü¥¹ÍÑ…±±ÌÑ¡”Iµ½¹±äÍ¡…‘•È¡½½¬™½È•Ù•ÉäÍÕÁÁ½ÉÑ•±¥Ğ)¹…Ñ¥Ù”½±½ÕÈÍÕÉ™…”İ¥Ñ ½±½ÕÈ…±Á¡„=¸½Á…¥Ñå5½‘”É•ÕÍ•ÌÑ¡”Í…µ”¡½½¬İ¡•¸)„Í•Á…É…Ñ”½Á…¥Ñäµ…À½™…Ñ½È…±Í¼½¹ÑÉ½±ÌÑÉ…¹ÍÁ…É•¹ä¸áÁ±¥¥Ğ½±½ÕÈ…±Á¡„=8)­••ÁÌQ¡É•”Ì½É¥¥¹…°I	Í…µÁ±¥¹œÁ…Ñ ì½Á…¥Ñä°‘•ÁÑ µİÉ¥Ñ”°Í¡…‘½Ü…¹Í½ÕÉ”)‰åÑ”‰•¡…Ù¥½ÕÈ…É”½Ñ¡•Éİ¥Í”Õ¹¡…¹•¸9¼‘•½‘•ÈÉ•İÉ¥Ñ”½È¥µ…”É”µ•¹½‘¥¹œ¸()9•Ü…ÑÕ…°µ½İ¹•ÈÑ•ÍÑÌ½Ù•È…±Á¡„=İ¥Ñ¡½ÕĞ„Í•Á…É…Ñ”½Á…¥Ñäµ…À…¹•áÁ±¥¥Ğ)…±Á¡„=8É•Ñ…¥¹¥¹œI	¸%¸µ…ÁÀQMP1%MP…‘‘ÌÑ¡”½É¥¥¹…°½µÁ…É¥Í½¸™¥±”è)‘½Ì½Í…µÁ±•Ì½9=5}=1=UI}1A!|ÄÀÈä¹¹½´€¡±•™Ğ…±Á¡„=8°µ¥‘‘±”½µ‰¥¹•½Á…¥Ñä°)É¥¡Ğ…±Á¡„=¤¸á¥ÍÑ¥¹œÍ•Ù•¸µ½‰©•Ğ…¹ÍÑ…¹‘…±½¹”µµ…ÀÍ…µÁ±•ÌÉ•µ…¥¸Õ¹¡…¹•¸)¥ÍÁ±…•µ•¹ĞÉ•µ…¥¹Ì¥¹ÍÁ•Ñ¥½¸½É•Ñ•¹Ñ¥½¸½¹±ä¸()Y…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸ÍÑ…ÑÕÌèÍ½ÕÉ”½Ñ•ÍĞ¡…¹•Ì½µµ¥ÑÑ•Ñ¼µ…¥¸ì±½…°ÍÕ¥Ñ”)¹½Ğ…Ù…¥±…‰±”¥¸Ñ¡¥Ì½¹¹•Ñ•Í•ÍÍ¥½¸¸!½ÍÑ•$…¹A…•Ì½±¥Ù”‰åÑ”Ù•É¥™¥…Ñ¥½¸)…É”Á•¹‘¥¹œ…¹µÕÍĞ‰”¡•­•‰•™½É”…±±¥¹œÑ¡¥Ì‰Õ¥±™Õ±±äÉ•±•…Í•¸)9…Ñ¥Ù”¥A…½AT…ÁÁ•…É…¹”…•ÁÑ…¹”¥ÌÁ•¹‘¥¹œ¸()Y%ÄÀÌĞè¥µÁ½ÉĞ9=5}=1=UI}1A!|ÄÀÈä¹¹½´¥¸MÑÕ‘¥¼…¹M½±¥¸I¥¡ĞÕ‰”µÕÍĞ‰”)Í½±¥å…¸İ¥Ñ ¹¼¡•­•È½‰±…¬ÍÅÕ…É•Ìì±•™ĞÕ‰”É•Ñ…¥¹Ì¡•­•ÈÑÉ…¹ÍÁ…É•¹äì)µ¥‘‘±”É•Ñ…¥¹Ì½µ‰¥¹•½±½ÕÈµ…±Á¡„Á±ÕÌÍ•Á…É…Ñ”½Á…¥Ñä¸Mİ¥Ñ Y%\µ½‘•Ì°)½É‰¥Ğ°Í•±•Ğ½5½Ù”½U¹‘½I•‘¼°…¹Ù•É¥™äÁÉ¥½È€¸ÄÀÌÌÍÑ…¹‘…±½¹”µµ…ÀÍ…µÁ±”ÍÑ¥±°İ½É­Ì¸)9•áĞè½¹™¥É´€¸ÄÀÌĞ…±Á¡„‰•¡…Ù¥½ÕÈ°Ñ¡•¸Í•Á…É…Ñ•±ä‰•¹¡µ…É¬‘¥ÍÁ±…•µ•¹Ğ½ÍÕ‰‘¥Ù¥Í¥½¸)‰•™½É”¥µÁ±•µ•¹Ñ…Ñ¥½¸¸¼¹½Ğ™½±‘¥ÍÁ±…•µ•¹Ğ¥¹Ñ¼Ñ¡¥ÌÍ¡…‘•È½ÉÉ•Ñ¥½¸¸((ŒŒ€¸ÄÀÌÔƒŠPÁÉ”µ‘•½‘”¹…Ñ¥Ù”½±½ÕÈ…±Á¡„=É•Á…¥ÈƒŠP€ÌÄ=Ñ½‰•È€ÈÀÈØ()UMH€¸ÄÀÌĞ%0èÍÉ••¹Í¡½ĞÍ¡½İÌÉ¥¡ĞÕ‰”å…¸½‰±…¬¡•­•È½¸Ù¥Í¥‰±”€¸ÄÀÌĞ¸(¸ÄÀÌÌÍÑ…¹‘…±½¹”µ…Ñ•É¥…°AMLÉ•µ…¥¹ÌÁÉ½Ñ•Ñ•ì€¸ÄÀÌĞÍ¡…‘•Èµ½¹±ä±…¥´İ…Ì)¥¹ÍÕ™™¥¥•¹Ğ¸Q¡É•”µ…Á}™É…µ•¹ĞµÕ±Ñ¥Á±¥•ÌI‰äÍ…µÁ±•I°…¹…±Á¡„‰ä)Í…µÁ±•…±Á¡„½µÁ½¹•¹Ñİ¥Í”ì¥Ğ‘½•Ì9=P¥ÑÍ•±˜µÕ±Ñ¥Á±äI‰äÍ…µÁ±•…±Á¡„¸)M¡…‘•ÈÍÑÉ¥¹œÑ•ÍÑÌ…¹¹½ĞÁÉ½Ù”IÍÕÉÙ¥Ù•‰É½İÍ•ÈA9‘•½‘”½É•Í¥é”¸()á¥ÍÑ¥¹œÍÕÉ™…”½İ¹•È¹½ÜÁ…ÍÍ•Ì…¸•áÁ±¥¥Ğ…±Á¡„µ=™±…œÑ¼¥ÑÌ‘•™…Õ±Ğ)ÍÕÉ™…”‘•½‘•È¸á¥ÍÑ¥¹œ¹½µ…µÍ…±…ÈµÁ¹œ½İ¹•Èµ…­•Ì„ÑÉ…¹Í¥•¹Ğ½Á…ÅÕ”A9)	=IÉ•…Ñ•%µ…•	¥Ñµ…ÀèÕ¹™¥±Ñ•ÉÌ½É¥¥¹…°Á¥á•±Ì°­••ÁÌ½É¥¥¹…°I¥¹±Õ‘¥¹œ)…±Á¡„µé•É¼Á¥á•±Ì°Í•ÑÌÁÉ•Ù¥•Ü…±Á¡„ÈÔÔ°…¹É•½µÁÉ•ÍÍ•Ì¸M¡…É•1½UX‘•½‘•È)¡…Ì¹¼¹…Ñ¥Ù”‘•Á•¹‘•¹ä¸áÁ±¥¥Ğ…±Á¡„=8…¹…Õá¥±¥…Éä¡…¹¹•±Ì­••À½É¥¥¹…°)‘•½‘¥¹œìÍ½ÕÉ”‰åÑ•Ì°µ…Ñ•É¥…°µ•Ñ…‘…Ñ„°UYÌ°M…Ù”½=Á•¸½9=4É•µ…¥¸Õ¹¡…¹•¸)9¼Í½ÕÉ”Ñ•áÑÕÉ”É•İÉ¥Ñ”°…¹Ù…ÌIÉ•½Ù•Éä°¹•ÜÉ•¹‘•É•È½Èµ½‘•±±¥¹œ­•É¹•°¸()MÕÁÁ½ÉÑ•ÁÉ”µ‘•½‘”Á…Ñ è¹½¹¥¹Ñ•É±…•€àµ‰¥ĞI	½É…åÍ…±”µ…±Á¡„A9ìÑI9L)ÑÉ…¹ÍÁ…É•¹äÍÑÉ¥ÁÁ•™½È½Ñ¡•È¹…Ñ¥Ù”A9ÑåÁ•Ì¸AÉ½™¥±•Ì½½±½ÕÈ¡Õ¹­ÌÉ•Ñ…¥¹•¸)	½Õ¹‘Ìè•¹½‘•Í½ÕÉ”½½ÕÑÁÕĞá5¥°‘¥µ•¹Í¥½¹ÌÈÀĞà…¹Ñ4Í½ÕÉ”Á¥á•±Ì°¥¹™±…Ñ”½ÕÑÁÕĞ)•á…Ğ•áÁ•Ñ•Í…¹±¥¹”±•¹Ñ ìI½ÑÉÕ¹…Ñ¥½¸½™¥±Ñ•È½…¹¥µ…Ñ¥½¸¼ÄÙ‰¥Ğµ…±Á¡„É•™ÕÍ…±Ì¸)U¹ÍÕÁÁ½ÉÑ•…±Á¡„µ=½¹Ù•ÉÍ¥½¸­••ÁÌ½É¥¥¹…°‰½‘ä™…±±‰…¬°¹¼‰±…¬µµ…ÀÕ•ÍÌ¸)á¥ÍÑ¥¹œATÁÉ•Ù¥•Ü±¥µ¥ÑÌ½±¥™•Ñ¥µ•Ì…¹€¸ÄÀÌÌÍÑ…¹‘…±½¹”É•Í•ÉÙ…Ñ¥½¸É•µ…¥¸¥¹Ñ…Ğ¸()I•É•ÍÍ¥½¸¡•­Ì¥¹ÍÁ•Ğ…ÑÕ…°‰É½İÍ•Èµ¥¹ÁÕĞA9™É½´½É¥¥¹…°€¸ÄÀÈä™¥áÑÕÉ”è)…±°…±Á¡„µ=Ñ•á•±Ì•á…Ñ±älÔÔ°ÄÜÔ°ÈÈÀ°ÈÔÕtì…±Á¡„=8ÍÑ¥±°lÔÔ°ÄÜÔ°ÈÈÀ°À¼ÈÔÕt¸)±°™¥Ù”A9™¥±Ñ•ÉÌÑ•ÍÑ•İ¥Ñ Ù…É¥•¡¥‘‘•¸I°ÑI9L…¹É…åÍ…±”µ…±Á¡„°)µ…±™½Éµ•½½Ù•ÉÍ¥é•½¥¹™±…Ñ”½Ù•É™±½ÜÉ•™ÕÍ•¸ÑÕ…°ÍÕÉ™…”‘•™…Õ±Ğ‘•½‘•È…¹)Í½ÕÉ”µ•á…Ğ9=4É½Õ¹‘ÑÉ¥À½Ù•É•¸½ÉÉ•Ñ•€¸ÄÀÌĞ…±Á¡„µ=8Ñ•ÍĞè‘•™…Õ±ĞQ¡É•”)½¹	•™½É•½µÁ¥±”¥Ì„¹¼µ½ÀìQ¡É•”•áÁ…¹‘Ìµ…Á}™É…µ•¹Ğ…™Ñ•ÈÑ¡…Ğ¡½½¬¸€¸ÄÀÌĞ$(ĞÄÄÔÈàØààØØ%1ìÉ•Á…¥ÈÍÕÁ•ÉÍ•‘•Ì¥Ğ½¹±ä…™Ñ•ÈÁ…ÍÍ¥¹œÙ…±¥‘…Ñ¥½¸½ÁÕ‰±¥…Ñ¥½¸¸)I•ÍÑ½É”Y}!%MQ=Id½¹Ñ•¹Ğ™É½´ÌÌäİÈàÜ°İ¡¥ €¸ÄÀÌĞ‘½Õµ•¹Ñ…Ñ¥½¸…¥‘•¹Ñ…±±ä)É•Á±…•°Ñ¡•¸É•Ñ…¥¸€¸ÄÀÌĞ•¹ÑÉä…¹…ÁÁ•¹Ñ¡¥ÌÉ•Á…¥È¸=Ñ¡•È½±‘½Ì­•ÁĞ¥¹Ñ…Ğ¸)I•Ù¥•İ•…¡”±½ÍÕÉ”É•Á¥¹¹•ìÍÑ…±”€¸ÄÀÌĞ¥¹‘•àµ½¹±ä­•åÌÉ•½¹¥±•İ¥Ñ ½İ¹•ÉÌ¸)I•ÍÑ½É”½É¥¥¹…°™¥Ù”µÍÑ•ÀÍÑÉÕÑÕÉ…°½¡•­±¥ÍĞ€ ÄÀÌĞ•áÑÉ„µ…Ñ•É¥…°ÍÑ•À‰É½­”)½µÁ±•Ñ¥½¸¤ìµ…Ñ•É¥…°¡•¬ÍÑ…åÌ¥¸‰Õ¥±¥¹ÍÑÉÕÑ¥½¹Ì¸½ÉÉ•ĞÍÑ…±”ÄÀÌÌÑ¥Ñ±•Ì)…¹ÁÉ•Í•ÉÙ”ÄÀÌÌ¼ÄÀÌĞÉ•ÍÕ±Ğ±½Ì¸=É¥¥¹…°ÄÌ¡•­±¥ÍĞÉ•É•ÍÍ¥½¸Ñ•ÍÑÌAML¸()Y%ÄÀÌÔèÕÍ”½É¥¥¹…°‘½Ì½Í…µÁ±•Ì½9=5}=1=UI}1A!|ÄÀÈä¹¹½´°MÑÕ‘¥¼…¹M½±¥¸)I%!PÍ½±¥å…¸°¹¼‰±…¬ÍÅÕ…É•Ìì1P¡•­•ÈÑÉ…¹ÍÁ…É•¹äì5%1½µ‰¥¹•)…±Á¡„Á±ÕÌ½Á…¥Ñä¸Mİ¥Ñ ½É•½Á•¸Y%\ì½É¥¥¹…°€¸ÄÀÌÈÍ•Ù•¸µÕ‰”½±½ÕÈå…¸ì(¸ÄÀÌÌÍÑ…¹‘…±½¹”Í…µÁ±”Õ¹¡…¹•¸5½Ù”½U¹‘½I•‘¼…¹M…Ù”½=Á•¸½9=4É•Ñ•¹Ñ¥½¸¸)9…Ñ¥Ù”¥A…½AT…ÁÁ•…É…¹”…•ÁÑ…¹”ÍÑ¥±°Á•¹‘¥¹œì‘¼¹½Ğ±…¥´‘•Ù¥”ÍÕ•ÍÌ¸)¥ÍÁ±…•µ•¹ĞÉ•µ…¥¹Ì‘•™•ÉÉ•ì¹•áĞÍÑ•À¥Ì…ÑÕ…°‘•Ù¥”Ù…±¥‘…Ñ¥½¸‰•™½É”µ½É”İ½É¬¸)Y…±¥‘…Ñ¥½¸è9½‘”ÈÈ™Õ±°ÍÕ¥Ñ”ÌÀØĞAML¼Á%0€ ÈÄØ¸ØÕÌ¤ì™½ÕÍ•ÄÌµ…Ñ•É¥…°Ñ•ÍÑÌ)…¹™¥¹…°ÄÌ¡•­±¥ÍĞÑ•ÍÑÌAML¸¥Ğ‘¥™˜€´µ¡•¬±•…¸¸$ĞÄÄÔĞÜÈØàÈä…¹A…•ÌĞÄÄÔĞÜÈØÈÄÄMUMLì±¥Ù”‰åÑ•ÌÙ•É¥™¥•¸€¸ÄÀÌĞ¥A…%0É•µ…¥¹ÌÉ•½É‘•ì€¸ÄÀÌÔAT½‘•Ù¥”…•ÁÑ…¹”Á•¹‘¥¹œ¸()AÕ‰±¥…Ñ¥½¸Ù•É¥™¥•è…ÁÁ±¥…Ñ¥½¸ÁŒÁ•˜ĞÌÑˆá„áŒİĞÌÅ”ÜÑŒÁÁ•ÔÅ˜Ôá™”ÈàÌĞ°)É•Ù¥•İ•ÑÉ•”Ñ•‘……„ÜÄÄÄÑ‘ˆáˆÉ•‰„ĞÄĞØÑ˜Øá„ÀÈäÔÅ”ĞÉ‘™Ğ¸!½ÍÑ•$ĞÄÄÔĞÜÈØàÈä)MUMLìA…•ÌĞÄÄÔĞÜÈØÈÄÄMUML¸1¥Ù”Ù•ÉÍ¥½¸½Í¡•±°½A9½½Ù•É±…ä½É•¹‘•È½¡•­±¥ÍĞ)…¹½É¥¥¹…°àÀ°ÀØĞµ‰åÑ”ÄÀÈäÍ…µÁ±”µ…Ñ Í½ÕÉ”‰åÑ•Ì¸M•”‘½Ì½ÁÕ‰±¥…Ñ¥½¸´ÄÀÌÔ¹µ¸)MÑ…ÑÕÌè€¸ÄÀÌÔ1%Y…¹Id=HIQMPì€¸ÄÀÌĞÕÍ•È%0ÁÉ•Í•ÉÙ•°€¸ÄÀÌÌAML)ÁÉ½Ñ•Ñ•ì…ÑÕ…°¥A…½AT½±½ÕÈ…•ÁÑ…¹”Á•¹‘¥¹œ¸9¼‘¥ÍÁ±…•µ•¹Ğİ½É¬¥¹±Õ‘•¸((ŒŒ€¸ÄÀÌÔÕÍ•ÈAMLÁÉ½Ñ•Ñ•ƒŠP€ÌÄ=Ñ½‰•È€ÈÀÈØ()UÍ•È½¹™¥ÉµÌÑ¡”É¥¡ĞÕ‰”…±Á¡„µ=½±½ÕÈÉ•Á…¥ÈAML¸AÉ½Ñ•Ğ½Á…ÅÕ”å…¸I)¥¸MÑÕ‘¥¼½M½±¥°¡•­•ÈÑÉ…¹ÍÁ…É•¹ä™½È…±Á¡„=8°½µ‰¥¹•µ¥‘‘±”…±Á¡„½½Á…¥Ñä°)½É¥¥¹…°€¸ÄÀÌÌÍÑ…¹‘…±½¹”A	HÁÉ•Ù¥•İÌ°Í•Ù•¸µ½‰©•Ğ±½…‘¥¹œ½ÍÁ…¥¹œ°Y%\ÍÑ…‰¥±¥Ñä°)…¹•á¥ÍÑ¥¹œM…Ù”½=Á•¸½9=4É•Ñ•¹Ñ¥½¸¸€¸ÄÀÌĞÍÉ••¹Í¡½Ğ%0É•µ…¥¹Ì¥¸¡¥ÍÑ½Éä…Ì)ÍÕÁ•ÉÍ•‘•¸€¸ÄÀÌÔ¥Ì…•ÁÑ•ì¹¼™ÕÉÑ¡•È…±Á¡„Í¡…‘•È½‘•½‘”¡…¹•ÌÁ±…¹¹•¸()9•áĞ‘•Ù•±½Áµ•¹Ğ¥Ì…¸¥¹Ù•ÍÑ¥…Ñ¥½¸‰•™½É”¥µÁ±•µ•¹Ñ…Ñ¥½¸è…Õ‘¥ĞÑ¡”•á¥ÍÑ¥¹œ)MÕ‰½ÍÕ‰‘¥Ù¥Í¥½¸½İ¹•ÉÌ…¹9=4‘¥ÍÁ±…•µ•¹ĞÉ•Ñ•¹Ñ¥½¸½¥µÁ½ÉĞ™±½Ü¸	•¹¡µ…É¬„)Íµ…±°‰½Õ¹‘•Ñ•ÍÍ•±±…Ñ¥½¸ÁÉ•Ù¥•Ü½¸É•ÁÉ•Í•¹Ñ…Ñ¥Ù”±½ÜµÁ½±ä½‰©•ÑÌ¸ÍÑ…‰±¥Í )…ÁÌ™½ÈÍ½ÕÉ”™…•Ì°ÍÕ‰‘¥Ù¥Í¥½¸±•Ù•°°•¹•É…Ñ•Ù•ÉÑ¥•Ì°¥µ…”‘¥µ•¹Í¥½¹Ì°)µ•µ½Éä…¹™É…µ”Ñ¥µ”ì½µÁ…É”……¥¹ÍĞÑ¡”½É¥¥¹…°Õ¹µ½‘¥™¥•½‰©•Ğ¸%˜Í…™”°)•áÁ½Í”‘¥ÍÁ±…•µ•¹ĞÁÉ•Ù¥•Ü…Ì„ÑÉ…¹Í¥•¹ĞMÑÕ‘¥¼½M½±¥ÍÕÉ™…”½Ù•É±…äİ¥Ñ )…¹•°½µ½‘”µÍİ¥Ñ ±•…¹ÕÀì­••À•áÁ½ÉÑ•µ•Í …¹Í½ÕÉ”µ…ÀÕ¹¡…¹•¸%˜Ñ¡”)•á¥ÍÑ¥¹œÑ½Á½±½ä½Á•É™½Éµ…¹”½İ¹•ÉÌ…¹¹½ĞÍÕÁÁ½ÉĞÉ•ÍÁ½¹Í¥Ù”¥A…ÁÉ•Ù¥•Üİ¥Ñ¡¥¸)„±•…È…À°­••À‘¥ÍÁ±…•µ•¹Ğ¥¹ÍÁ•Ñ¥½¸µ½¹±ä…¹É•Á½ÉĞÑ¡”µ•…ÍÕÉ•±¥µ¥Ğ¸)¼¹½Ğ…‘‘¥ÍÁ±…•µ•¹Ğ‘•™½Éµ…Ñ¥½¸Ñ¼€¸ÄÀÌÔ¸9•áĞ‰Õ¥±™½±±½İÌÑ¡¥Ì…Õ‘¥Ğ½…Ñ”¸()ÕÉÉ•¹ĞÍÑ…ÑÕÌè€¸ÄÀÌÔ1%Y°$…¹A…•ÌÙ•É¥™¥•°ÕÍ•ÈAMLÁÉ½Ñ•Ñ•¸9•áĞ‰Õ¥±)™½ÕÌè‰½Õ¹‘•‘¥ÍÁ±…•µ•¹Ğ½ÍÕ‰‘¥Ù¥Í¥½¸™•…Í¥‰¥±¥Ñä°¹¼¥µÁ±•µ•¹Ñ…Ñ¥½¸…ÍÍÕµ•¸((ŒŒ€¸ÄÀÌØƒŠP‰½Õ¹‘•ÍÕ‰‘¥Ù¥Í¥½¸Ñ¥µ¥¹œÁ…”ƒŠP€ÌÄ=Ñ½‰•È€ÈÀÈØ()UÍ•È€¸ÄÀÌÔAMLÁÉ½Ñ•Ñ•¸á¥ÍÑ¥¹œµ½İ¹•È…Õ‘¥Ğ½¹™¥Éµ•9=4‘¥ÍÁ±…•µ•¹ĞÉ•Ñ•¹Ñ¥½¸)…¹•áÁ½ÉĞÍÕÁÁ½ÉĞ°‰ÕĞ¹½ĞÙ¥•İÁ½ÉĞ‘•™½Éµ…Ñ¥½¸¸Q¡”…ÕÑ¡½É¥Ñ…Ñ¥Ù”…ÑµÕ±³ŠM±…É¬)ÍÕ‰‘¥Ù¥‘” ¥€½İ¹•È½Á•É…Ñ•Ì½¸‘¥Ñ…‰±•5•Í Ñ½Á½±½ä…¹‘½•Ì¹½ĞÁÉ•Í•ÉÙ”¥µÁ½ÉÑ•)Á•Èµ½É¹•ÈUXÁ…å±½…‘Ì¸¼¹½ĞÕÍ”¥ÑÌÉ•ÍÕ±Ğ™½È„‘¥ÍÁ±…•µ•¹ĞÍÕÉ™…”İ¥Ñ¡½ÕĞ„)UXµÁÉ•Í•ÉÙ¥¹œÁ…Ñ ¸9¼‘¥ÍÁ±…•µ•¹ĞÉ•¹‘•È½‰…­”İ…Ì…‘‘•¸()‘‘•‘½Ì½ÍÕ‰‘¥Ù¥Í¥½¸µ‰•¹¡µ…É¬´ÄÀÌØ¹¡Ñµ±€°±¥¹­•Ñ¡É½Õ Ñ¡”•á¥ÍÑ¥¹œ¥±”ƒŠH)MÉ••¸½µÁ…É¥Í½¸€¼Ñ•ÍĞ±¥ÍĞ½İ¹•È¸%Ğ±½…‘ÌÑ¡”Í…µ”µ•Í …¹ÍÕ‰‘¥Ù¥Í¥½¸µ½‘Õ±•Ì°)µ•…ÍÕÉ•Ì€ÄØ¼ØĞ¼ÈÔØÉ•Õ±…ÈÅÕ…™…•Ì…Ğ±•Ù•±Ì€ÇŠLÌ°…ÁÌ•¹•É…Ñ•Ñ½Á½±½ä…Ğ(ÄØ°ÌàĞ™…•Ì€¡øÄØ°ØĞÄÙ•ÉÑ¥•Ì¤°ÕÍ•Ì½¹”İ…É´µÕÀÁ±ÕÌÑ¡É•”Í…µÁ±•Ì°…¹ÍÑ½ÁÌ)•Í…±…Ñ¥¹œ…™Ñ•È„€øÄ¸ÉÌÍ…µÁ±”¸%Ğ•µ¥ÑÌµ•‘¥…¸½½Õ¹Ğ½‰É½İÍ•È½AH)M=8™½È¥A…)É•Ù¥•Ü…¹‘½•Ì¹½ĞÑ½Õ Ñ¡”ÁÉ½©•ĞÍ•¹”¸AT­•É¹•°Ñ¥µ¥¹œ¥Ì¹½ĞUXÑÉ…¹Í™•È°(ÄØµ‰¥Ğ¥µ…”Í…µÁ±¥¹œ°¡•…À°AT½È™É…µ”Ñ¥µ”¸9¼‘•Ù¥”Ñ¥µ¥¹œ½È‘¥ÍÁ±…•µ•¹Ğ)…•ÁÑ…¹”¥¹™•ÉÉ•¸=É¥¥¹…°€¸ÄÀÌÔ…±Á¡„µ=½±½ÕÈAML…¹Í•Ù•¸µ½‰©•Ğ½Y%\AML)É•µ…¥¸ÁÉ½Ñ•Ñ•¸()I•É•ÍÍ¥½¸è¹•Ü‰•¹¡µ…É¬Ñ•ÍÑÌÙ•É¥™äÕÍ”½˜Ñ¡”…¹½¹¥…°ÍÕ‰‘¥Ù¥Í¥½¸™Õ¹Ñ¥½¸°)ÁÉ•Í•Ğ½…À½ÍÑ½À½¹ÑÉ…Ğ…¹•á…Ğ½ÕÑÁÕĞ™…”½Ù•ÉÑ•à½Õ¹ÑÌİ¡¥±”Í½ÕÉ”µ•Í ÍÑ…åÌ)Õ¹¡…¹•¸½ÕÍ•MÕ‰µ…¡”½‘¥ÍÁ±…•µ•¹Ğ½‰•¹¡µ…É¬¡•­ÌÄØAMLìÉ•±•…Í”µ½¹ÑÉ…Ğ)¡•­ÌÄØAML¸Õ±°9½‘”ÈÈÍÕ¥Ñ”ÌÀØØAML°€À%0°€ÀÍ­¥ÁÁ•¸%¹¥Ñ¥…°™Õ±°ÉÕ¸…Õ¡Ğ)Ñ¡É•”ÍÑ…±”É•±•…Í”UI0½¡…Í ½¹ÑÉ…ĞÉ½İÌ…™Ñ•ÈÑ¡”É•ÅÕ¥É•Á¥¸É•™É•Í ìÉ•™É•Í¡•)Ñ¡”É•Ù¥•İ•¥µÁ½ÉĞ¡…¥¸…¹É•É…¸±•…¸¸IÕ¹Ñ¥µ”½µµ¥ĞØå˜ÜÙŒÀäÙ•å…‘”áäÌá”ÌäÁ„ÔÔÈÙˆÍ…ÁˆÜå½ÑÉ••˜ØÌÀÈİÉŒÌàá•Å˜É‰‘™ˆÉ•˜ÀÜÔÕ‘ˆÁáÔØÍ„¸)!½ÍÑ•Ñ½Á½±½äÉ•É•ÍÍ¥½¸ĞÄÄÔääÔàÀÀÌ…¹A…•ÌĞÄÄÔääÔÜØÄÀMUML¸M¥à±¥Ù”…ÁÀ¼)‰•¹¡µ…É¬™¥±•Ì‰åÑ”µµ…Ñ Ñ¡”ÁÕ‰±¥Í¡•Í½ÕÉ”¸•Ù¥”Ñ¥µ¥¹œ…¹U$…•ÁÑ…¹”)É•µ…¥¸Á•¹‘¥¹œì¹¼‘¥ÍÁ±…•µ•¹ĞÁÉ•Ù¥•Ü…•ÁÑ…¹”¥Ì±…¥µ•¸(((ŒŒ€¸ÄÀÌØÕÍ•ÈÑ¥µ¥¹œÉ•Á½ÉĞÉ••¥Ù•ƒŠP€ÌÄ=Ñ½‰•È€ÈÀÈØ()Q¡”ÕÍ•ÈÍÕÁÁ±¥•…±°ä€¸ÄÀÌØ‰•¹¡µ…É¬É•ÍÕ±ÑÌ™É½´¥A…¡É½µ”™½È¥=L€¡É¥=LÄÔØ°)¥A…‘=LÈØ¸Ø¸È°AHÈ¤¸MÑ…ÉĞ½•¹‘ÕÉ…Ñ¥½¸ØÄÅµÌì¹¼•…É±äµÍÑ½ÀÕ…É¸5•‘¥…¸ATµ•Í )Ñ¥µ•Ì™½ÈÍ½ÕÉ”™…•ÌÄØ¼ØĞ¼ÈÔØ…Ğ±•Ù•±ÌÄ¼È¼Ìè€Ä¼Ä¼ÍµÌ°Ä¼Ì¼ÙµÌ°Ä¼Ğ¼ÄÍµÌ¸1…É•ÍĞ)É•ÍÕ±ĞÄØ°ÌàĞ™…•Ì¼ÄØ°ØĞÄÙ•ÉÑ¥•ÌìÍ…µÁ±•ÌÄÈ¼ÄÌ¼ÄİµÌ¸I•½É…Ì½µÁ±•Ñ•AT)‰•¹¡µ…É¬‘…Ñ„°¹½Ğ…Ì‘¥ÍÁ±…•µ•¹ĞµÁÉ•Ù¥•Ü½ÈAT…•ÁÑ…¹”°…¹¹½Ğ…Ì•áÁ±¥¥Ğ)½Ù•É…±°ÕÍ•ÈAML½%0¸9¼É•Á½ÉĞ½˜Á½ÍĞµÉÕ¸Í•¹”½Í•±•Ñ¥½¸¡•¬¸()Õ‘¥Ğ™½È¹•áĞÍÑ•Àè9=4UYÌ…É”™…”µ½É¹•È…ÉÉ…åÌ¥¸±‰A…ÍÍÑ¡É½Õ ¹ÕÙ½É¹•ÉÍ€ì)•á¥ÍÑ¥¹œ…ÑµÕ±³ŠM±…É¬™…”ÍÁ±¥ÑÑ¥¹œ¡…ÌÍÑ…‰±”½É‘•É•½É¹•ÈÑ½Á½±½ä‰ÕĞ‘É½ÁÌ)UYÌ¥¸¥ÑÌÕÉÉ•¹Ğ‘¥Ñ…‰±•5•Í¡€É•ÑÕÉ¸¸áÑ•¹Ñ¡”Í…µ”…ÕÑ¡½É¥Ñ…Ñ¥Ù”½İ¹•ÈÑ¼)ÁÉ½Á……Ñ”½É¹•ÈUYÌìÉ•Ñ…¥¸Í•…´µÍÁ•¥™¥ŒUYÌ…¹Ù•É¥™ä™…”½½É¹•È…±¥¹µ•¹Ğ¸9¼)Í•½¹•½µ•ÑÉä­•É¹•°¸UÍ”ÄØ°ÌàĞ™…•Ì½øÄØ°ØĞÄÙ•ÉÑ¥•Ì…Ì„ÁÉ½Ù¥Í¥½¹…°…À½¹±äì)UXµ…ÁÁ¥¹œ°€ÄØµ‰¥Ğ‘¥ÍÁ±…•µ•¹ĞÍ…µÁ±¥¹œ°¡•…À°AT…¹™É…µ”µÑ¥µ”…Ñ•ÌÉ•µ…¥¸½Á•¸¸(¸((ŒŒ€¸ÄÀÌÜƒŠP‰½Õ¹‘•…ÑµÕ±³ŠM±…É¬½É¹•ÈUXÁÉ½Á……Ñ¥½¸ƒŠP€ÌÄ=Ñ½‰•È€ÈÀÈØ()‘‘•ÍÕ‰‘¥Ù¥‘•]¥Ñ¡½É¹•ÉUYÌ ¥€‰•Í¥‘”Ñ¡”…¹½¹¥…°…ÑµÕ±³ŠM±…É¬­•É¹•°¸… )¡¥±ÅÕ…É••¥Ù•Ì™½ÕÈÁ•Èµ½É¹•ÈUXÙ…±Õ•Ì¥¸Ñ¡”½ÉÉ•ÍÁ½¹‘¥¹œ•½µ•ÑÉä½É‘•Èì)Í¡…É••½µ•ÑÉ¥Œ•‘•Ì‘¼¹½Ğµ•É”UX¡…ÉĞÙ…±Õ•Ì¸á¥ÍÑ¥¹œÍÕ‰‘¥Ù¥‘” ¥€…¹)…ÑµÕ±±±…É¬ ¥€½¹Ñ¥¹Õ”É•ÑÕÉ¹¥¹œ•½µ•ÑÉäµ½¹±äµ•Í¡•Ì¸1•Ù•±Ì…É”‰½Õ¹‘•Ñ¼€ÃŠLĞì)ÁÉ•™±¥¡Ğ…ÁÌ…É”€ÄØ°ÌàĞ½ÕÑÁÕĞ™…•Ì…¹àÀ°ÀÀÀUX½É¹•ÉÌ¸9¼Ù¥•İÁ½ÉĞ½È)‘¥ÍÁ±…•µ•¹Ğİ¥É¥¹œ¥Ì¥¹±Õ‘•¸()9•ÜÉ•É•ÍÍ¥½¸…Í•Ì½Ù•È½É‘•É¥¹œ°Í•…´ÁÉ•Í•ÉÙ…Ñ¥½¸°µÕ±Ñ¥±•Ù•°•½µ•ÑÉä)•ÅÕ¥Ù…±•¹”°¥µµÕÑ…‰±”Í½ÕÉ”‘…Ñ„½µ•Ñ…‘…Ñ„°µ…±™½Éµ•‘…Ñ„…¹Ñ¡”±…É•ÍĞ€¸ÄÀÌØ)‰•¹¡µ…É¬…Í”€ ÈÔØÍ½ÕÉ”™…•Ì…Ğ±•Ù•°Ì¤¸½ÕÍ•UX½MÕ‰½…¡”½‘¥ÍÁ±…•µ•¹Ğ¡•­ÌÄäAMLìÉ•±•…Í”µ½¹ÑÉ…Ğ¡•­ÌÔAMLì™Õ±°)9½‘”ÈÈÍÕ¥Ñ”ÌÀÜÄAML¼Á%0ì¥Ğ‘¥™˜€´µ¡•­€±•…¸¸AÕ‰±¥Í¡•Ñ¼µ…¥¸…ÌÉÕ¹Ñ¥µ”½µµ¥ĞŒÜÍ„àØÕ•ŒåŒäÍˆÉˆàÑ„ĞÈÜå•ˆÑ‰ŒÔĞÅ˜İÕ•‰ÔÉ€(¡ÑÉ•”…„ÀÑÁ˜Í”Ñ„ĞÅ˜àÈÌå‘•”ÍˆÁ˜ÙŒİ˜Á”ÀÈØåˆĞÍ„Í€¤¸!½ÍÑ•Ñ½Á½±½äÉ•É•ÍÍ¥½¸(ĞÄÄÜÌààÀäÄÔ…¹A…•Ì‘•Á±½åµ•¹Ğ€ĞÄÄÜÌààÀäÄØÍÕ••‘•ìÙ•ÉÍ¥½¸¹©Í½¸°¥¹‘•à¹¡Ñµ°)…¹…±°ÄÄ¡…¹•ÉÕ¹Ñ¥µ”µ½‘Õ±•Ì‰åÑ”µµ…Ñ ±¥Ù”A…•Ì¸9¼µ…¹Õ…°U$Ñ•ÍĞ¥Ì)•áÁ•Ñ•™½ÈÑ¡¥Ì¹½¸µU$¡•±Á•È¸(((ŒŒ€¸ÄÀÌÜÕÍ•ÈAMLÁÉ½Ñ•Ñ•ƒŠP€ÌÄ=Ñ½‰•È€ÈÀÈØ()UÍ•ÈÉ•Á±¥•AMLÑ¼Ñ¡”€¸ÄÀÌÜ½É¹•ÈµUXÍÕ‰‘¥Ù¥Í¥½¸‰Õ¥±¸AÉ½Ñ•ĞÑ¡”¹•ÜUXµ…İ…É”)…ÑµÕ±³ŠM±…É¬¡•±Á•È…¹¥ÑÌÍ•…´°Á…É¥Ñä…¹½ÕÑÁÕĞµ±¥µ¥Ğ½¹ÑÉ…Ğ¸Q¡”ÕÍ•È‘¥¹½Ğ)É•ÅÕ•ÍĞ½ÈÙ•É¥™ä„Ù¥•İÁ½ÉĞ…ÁÁ•…É…¹”¡…¹”ìÑ¡¥ÌA$É•µ…¥¹ÌÕ¹½¹¹•Ñ•Ñ¼Ñ¡”)É•¹‘•É¥¹œÁ…Ñ ¸…É±¥•ÈÍ•Ù•¸µ½‰©•Ğ½Y%\…¹€¸ÄÀÌÔ½±½ÕÈµ…±Á¡„AMLÉ•½É‘ÌÉ•µ…¥¸)ÁÉ½Ñ•Ñ•¸9•áĞ…Ñ”¥Ì…¸¥A…Ñ¥µ¥¹œ½µÁ…É¥Í½¸‰•™½É”…¹ä‘¥ÍÁ±…ä¥¹Ñ•É…Ñ¥½¸¸((ŒŒ€¸ÄÀÌàƒŠPUXµ…İ…É”ÍÕ‰‘¥Ù¥Í¥½¸Ñ¥µ¥¹œ…Ñ”ƒŠP€ÌÄ=Ñ½‰•È€ÈÀÈØ()‘…¸¥¸µ…ÁÀ±¥¹­•É•Á½ÉĞ½µÁ…É¥¹œ•½µ•ÑÉäµ½¹±äÍÕ‰‘¥Ù¥Í¥½¸İ¥Ñ UXÁÉ½Á……Ñ¥½¸)™½È½¹Ñ¥¹Õ½ÕÌÉ¥‘Ì…¹¥¹‘•Á•¹‘•¹ĞÁ•Èµ™…”¡…ÉÑÌ…É½ÍÌÑ¡”€¸ÄÀÌØ€ÄØ¼ØĞ¼ÈÔØµ™…”)İ½É­±½…¸I•Ñ…¥¸Ñ¡”ÄØ°ÌàĞµ™…”¼àÀ°ÀÀÀµ½É¹•È±¥µ¥ÑÌ…¹Ä¸ÉÌÁ•ÈµÉÕ¸ÍÑ½À¸Q¡”Á…”)‘½•Ì¹½Ğ…±Ñ•ÈÑ¡”ÁÉ½©•Ğ…¹µ•…ÍÕÉ•Ì¹¼Ñ•áÑÕÉ”‘•½‘”½Í…µÁ±¥¹œ°µ•µ½Éä°AT½È)™É…µ”Ñ¥µ”¸Q¡”ÕÍ•ËŠeÌ¥A…)M=8É•Á½ÉĞ¥Ì¹••‘•‰•™½É”‘•¥‘¥¹œİ¡•Ñ¡•ÈÑ¼İ¥É”Ñ¡”)•á¥ÍÑ¥¹œUXÍÕÉ™…”½‘¥ÍÁ±…ä½İ¹•ÉÌÑ½•Ñ¡•È¸9¼Ù¥•İÁ½ÉĞ‘¥ÍÁ±…•µ•¹ĞÍ¡¥ÁÌ¡•É”¸