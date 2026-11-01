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
- Actual owners expose needed busy/disarm/result/semantic completion APIs. Add/Build teardown releases capture; Add Done selects last added vertex, superseding stop preserves selection. Vertex Bevel cancelled drag retains selection; contextual completion disarms. Slide owner semantic completion survives stopped propagation; context-loss rollback retains pre-existing first-move history timing, so no zero-history claim for interrupted Slide. Busy blocks modal Apply/Done.
- One-shots reuse native/late-loaded buttons; suppression cleared for result puck or fresh tap, including native Join â†’ Edge and Create Face â†’ Face handoffs. Read-only/context/mode guards and drawer fallbacks retained.
- 41 targeted actual-owner/inventory/placement/history/gesture/lifecycle/protected nearby checks PASS. Full1169 tests/884 PASS, identical285 failure names to clean .709 baseline; no new failures. Syntax/diff PASS. Markers/changed direct/dynamic child/parent/main/refresh pins .710; protected multi-object/Loop Cut kernels/frozen betas untouched.
- Next: combined .710 hands-on test/refinement, then Object â†’ final Edge. Earlier .692/.702/.703/.704/.706 pending checks retained; no unrelated gesture/strengthening or bulk drawer removal.


## 2026-10-04 â€” v0.36.18.711 complete Object Active Tools radial coverage

- User confirms .710 Vertex radial AWESOME / PASS; protected complete13 tools/settings/lifecycle and Face/Edge/Vertex shared Bevel90Â° slot. Requests ALL Object Active Tools in one build before combined testing.
- Audited index and dynamic owners: ten launchers Transform/Insert/Solidify/Array/Boolean/Join/Symmetry-Bisect/Mesh Health/Revolve Profile/Clean for SubD. Outliner/Selection/Origins/Pivots/Groups/Modifiers remain outside Active Tools; conditional Sweep editor keeps existing creation via Add.
- Eight inner sectors120px/86px; two outer195px. Gizmo centre opens rings, centre Ã— returns existing gizmo. Original Object immediate transform and .682 background routing retained. Component rings/owners unchanged.
- UI-only object-radial-session proxies real launcher buttons and owner cancel APIs. Shared tool-session-ui docks original Object controls top-centre, bounded/scrollable; all child controls/listeners retained, original parents restored on exit. Face clients keep existing host to avoid duplicating their protected viewport proxies. Conditional Object Sweep also docks without new launcher.
- Boolean retains Multi/operand Swap and operation controls; surface Transform/Insert retains face-to-face cycle/Apply/Cancel; all preview/settings/report panels retained intact. Object gizmo hidden for competing sessions, retained for Symmetry/Revolve plane placement. One-shots/session completion clears stale suppression, mode/lock/Multi guards. No new modelling/history/raw-pointer owner or protected multi-object-transform changes.
- 32 targeted PASS including actual Solidify/Array owner previews and cancel cleanup with unchanged source, full-session dock/restoration/handoffs and nearby protected Face/Vertex. Full1181/897/284, no new failure names versus clean .710; historical376 Solidify session-pin check now passes. Syntax/diff/protected owner checks PASS. Manifest/shell/main/refresh/new adapter/shared session/gizmo pins .711; unchanged owner pins retained.
- Next combined .711 Object hands-on testing/refinement, then final Edge inventory/settings. Keep drawer fallbacks and earlier pending checks; no unrelated gestures/topology or bulk removal.


## 2026-10-04 â€” v0.36.18.712 wide tool popouts / gizmo corner shortcuts

- User provides visible .711 Symmetry/Array screenshots and layout sketches; no full Object PASS. Explicitly requests all top tool panels wide/shallow, Cancel/Apply stacked right, and coordinated gizmo redesign in one session. .710 Vertex remains protected.
- Audited shared top-centre dock, all15 import clients, original terminal controls, frame/focus/history/Multi owners and centre transform routing. Added UI-only wide layout helper through shared dock: original controls/nodes/listeners/IDs/delegated ancestry retained, two-column body/right rail, compact Symmetry plane row and Array direction/count. Responsive bounds/scrollable findings; staged Apply follows original hidden ancestors and lazy operand/report nodes rejoin body. Hidden roots cannot reveal stale drawer settings. Object host lays out after inserting node; protected Face source hosts remain unchanged.
- Centre menu hotspot removed; existing free Move handle enlarged14px, non-interactive centre dot; free Rotate ring unchanged. Top-left radial icon, top-right Focus/Frame All, bottom-right Undo/Redo arrows, bottom-left Object Multi. Separate40px actions/labels/pressed states, actual toolbar owners, busy/disabled/mode guards. Corner clusters bounded to viewport without moving selection pivot. No new viewport pointer owner, transform/Multi/history state or modelling kernel.
- 41 targeted PASS: actual Symmetry/Array markup/control identity/listeners, stage/lazy-content/hidden-root layout, shortcuts/guards, centre wiring/bounds/pins and protected nearby sessions. Full1190/906/284, identical failure names versus clean .7111181/897/284; no new failures. Syntax/diff/protected owners PASS. All release markers and changed dock import graph/new helper/gizmo pins .712; protected multi-object-transform1.0 and modelling owners/frozen betas unchanged.
- Next combined .712 iPad visual/tactile refinement; Object coverage already present, then final Edge inventory/settings. No .711/.712 PASS inferred; keep drawer fallbacks/earlier pending tests.


## 2026-10-04 â€” v0.36.18.713 complete Edge Active Tools radial coverage

- User .712 AWESOME PASS recorded/protected: wide popouts, gizmo centre/corners, Object tools. Final Edge inventory requested; all eleven reported gaps confirmed against index and dynamic owner modules. Existing nineteen Active Tools now connected; no selection commands/new kernels.
- Inner Extrude/Slide/Bevel/Crease/Offset/Bridge/Sweep/Delete; outer Circle/Join Coplanar/Loop/Split/Uncrease/Fill Face/Grid Fill/Dissolve/Dissolve Loop/Flip Edge/Collapse. Actual target disabled state retained; one-shot suppression/result-mode handoffs cleared.
- UI-only Loop/Split session forwards existing Loops/Loop Slide controls with wide top-centre Done. Completed work retained; main busy/finish API changes tool state only, no topology/history rewrite. Context loss/superseding sessions disarm owners, busy prevents mid-drag Done. Protected .688 logical-quad/.162 core and .632 commit path/pins unchanged.
- Edge Sweep reuses existing staged proxy and launch-mode semantic completion, preserving Face behavior. Shared angular/tier placement aligned across modes (Circle0 outer, Join Coplanar22.5 outer, Slide45 inner, Bevel90 inner, Bridge225 inner, Sweep270 inner, Clean270 outer, MergeDist315 outer). Face Shell moves outer225/Quad Cleanup180; Vertex Build135 and larger230 outer radius avoids Clean overlap. Object ring unchanged.
- 46 targeted PASS for complete inventories/placement/lifecycle and protected nearby Vertex/Object/Face. Full1195/911/284, same failure names as .7121190/906/284. Historical inventory/shared graph assertions updated for requested layout; stale Solidify session release-number assertion now checks retained actual .712 session owner. Syntax/diff PASS; protected kernel/transform/frozen beta files unchanged.
- .713 markers and changed module/parent/main/refresh pins updated; unchanged owners retain protected pins. Next visible .713 combined Edge hands-on test; no PASS inferred, keep drawer fallbacks and earlier pending repair checks.


## 2026-10-04 â€” v0.36.18.714 Object List gizmo shortcut in Focus view

- User requests Object List on/off beside Multi, especially with Focus drawer hidden. Audited original Objects details/outliner/retain and Focus owner. Reuses original node, controls/listeners/delegation; no cloned outliner or new selection/history/Multi owner.
- Object-only bottom-left list icon with pressed/busy state next to Multi. view-modes owns temporary Focus Objects-only reveal; Focus stays active, other drawer sections remain hidden. Second tap hides/reinstates prior disclosure state; leaving Object mode or toggling Focus clears reveal. Non-Focus toggles original Objects disclosure.
- 29 targeted PASS for actual Focus/list owner toggle/restoration/mode transitions, shortcut position/state/cache graph and nearby protected radials. Full1198/914/284, same failure names as .7131195/911/284. Syntax/diff PASS. No modelling/protected transform/Loop/frozen-beta changes.
- .714 release markers/direct view-modes/helper/parent gizmo/main/refresh pins updated. .713 Edge hands-on still pending; no PASS inferred. Next confirm visible .714, test list in Focus, existing list actions/Multi and exit cleanup, then pending Edge checks.


## 2026-10-04 â€” v0.36.18.715 persistent Edge Loop / Bevel EXACT

- User .714 PASS recorded/protected. Requests Loop Slide takeover/EXACT/repeated cuts and Bevel drag or sliders/EXACT/repeated selections; background exit for both.
- Radial Loop skips automatic release finalization, retains existing private slide rail. Count/Slide controls alternate with rail availability; EXACT uses existing commitLoop wrapper and keeps panel/main tool armed. Session adopts commit owner's internal Undo/Redo mesh replacement. Another edge retains placed geometry and adds next cut through unchanged main/.688/.162 core; background tap finalizes latest rail and exits. Non-radial auto commit preserved; Split Done unchanged.
- Existing Edge Bevel owner gets radial-only persistent flag. Drag still commits once; EXACT uses live selection/current kernel, clears consumed IDs, keeps armed. Stationary tap selects for exact; cancelled preview restores source/IDs and capture/navigation. Context/lock/mesh loss closes, busy blocks exact/background close. Face blue preview/Apply/Cancel and ordinary Edge one-operation disarm retained. No parallel kernel or raw background gesture owner.
- Main background/Pencil semantic routing reused; Loop miss participates in existing tap-vs-navigation tracker. Bevel/Loop completion resets hub and hides competing gizmo while sessions active. Shared presentation recognizes EXACT in right action rail; import-only cache graph repinned .715.
- 50 targeted PASS including real Loop commit/history fixture and actual Edge Bevel repeat/drag/cancel/stationary/history, Face regression and shared dock/nearby radial checks. Full1204/920/284, identical failure names versus .7141198/914/284. Earlier two radial bevel completion expectations updated for explicitly requested persistence. Syntax/diff PASS; protected multi-object-transform/Loop topology/frozen betas unchanged.
- All release markers/direct/dynamic-parent/shared/main/refresh pins current. Next visible .715 manual repeat and background exit, navigation/history and Face/Object regressions; no broader Edge PASS inferred, drawer fallbacks retained.


## 2026-10-04 â€” v0.36.18.716 scoped Face blue preview / compact Boolean

- User .715 PASS recorded/protected. Requests blue only around affected connected Faces and compact Object popup matching sketch. Screenshot visibly .714 treated as layout reference.
- Existing rendering-only Face bevel helper compares candidate/source polygon coordinate signatures; unchanged polygons/other shells excluded from blue fill/wire. Lightweight render view, same candidate geometry/kernel/Apply/Cancel/history, original resources disposed. No preview geometry mutation or new modeling owner.
- Boolean-specific shared presentation CSS arranges original A/B/Swap above original Union/Cut/Intersect, Close right; compact padding/title, operand truncation and lazy insertion order. No node replacement/handler/operation/selection changes; other panel styles preserved.
- 51 targeted PASS including actual Face preview excluding remote shell/unchanged source/no history, existing Face/Edge repeat sessions and original dock/Boolean controls. Full1205/921/284, identical failure names versus .7151204/920/284. Syntax/diff PASS; protected modeling/Loop/multi-object-transform/frozen betas unchanged.
- .716 shell/manifest/helper/direct parent/shared import graph/main/refresh pins updated. Next visible .716 affected-region preview and Boolean compact hand checks; keep other Edge pending checks/drawer fallbacks.


## 2026-10-04 â€” v0.36.18.717 first-selected Object Multi gizmo

- User requests retaining gizmo on first selected object for radial Boolean access. Audit found Total Gizmo's membership read targeted a nonexistent manager selectedObjects API; active-mesh-only hit test misclassified inactive operands as background.
- Presentation uses authoritative ordered selection Set; active anchor uses live mesh, inactive anchor uses original object mesh; removal falls to next surviving visible selection. Empty Multi hides gizmo, membership changes restore access. No duplicate selection state or transform/pivot changes.
- Extracted existing nearest visible Object scene picker into reusable manager API; activation retains tolerance/stopEvent behavior. Gizmo hit checks and Pencil background semantic use it so inactive operand taps retain tools, genuine background still dismisses/re-tap restores. No new pointer owner.
- 33 targeted PASS; full1210/926/284, identical failure names versus .7161205/921/284. Updated existing touch activation/cache tests for shared picker/current gizmo pin. Protected multi-object-transform1.0 and modelling/Boolean/frozen-beta owners untouched.
- .717 markers/main/refresh/gizmo/Object manager pins updated; .716 preview/layout included and still pending manual PASS. Next visible .717 Multi first-object retention, radial Boolean/Swap/results/history, Focus list/background/navigation and .716 visuals.


## 2026-10-04 â€” v0.36.18.718 viewport Multi repair / viewport controls

- User reports viewport Multi failure after .717, browser selection works. Audit found window/document transform consumers ahead of canvas activation. Existing Object owner registers early, routes Multi down at window capture; touch completion/tracking/cancel at window capture preserves Orbit cleanup and guards navigation/multi-touch. Transform-upgrade rejects raw Multi/true background, protected multi-object-transform1.0 unchanged. .717 ordered gizmo anchor retained.
- Original top action buttons use shared gizmo icons/hover/accessibility labels; Focus updates icon-safe tooltip/pressed state. Viewport renamed VIEW. Original Axis/Geometry checkbox labels and lazy Lasso button move into SNAP strip above unchanged mode buttons; no cloned controls/selection state. Lasso disarms actual transform owner, Multi activation defers to armed Lasso.
- Helper receives existing confirmed background semantic only, no pointer listeners. First tap clears components immediately (Object actual selection retained, gizmo dismisses as .682); second nearby tap within360ms inverts original selection via actual component/Object owners. Mode/active/mesh/current selection/time/distance guards; excludes sessions/Lasso.
- Minimal-drawer audit recorded in handoff: active modelling tools covered; modifiers, advanced selection depth/filters, bulk Object selection controls remain drawer-dependent. Object List retains management/Origin/Pivot/Groups, but empty selection loses gizmo list shortcut. Do not remove drawer/default-hide until remaining access is decided.
- 61 targeted PASS including actual Object early owner with competing listener boundary, original toolbar node/listener retention/shared icon markup, original selection seed inversion/context rejection, Pencil/Multi gizmo and Face/Edge sessions. Full1215/932/283; no new failure names versus .7171210/926/284; historical425 pin check now passes. Syntax/diff/protected files checked.
- .718 markers/changed runtime/dynamic parent/refresh pins current. .717 viewport FAIL recorded; .716 visuals pending, no new PASS inferred. Next combined iPad .718 UI/selection/Multi/Boolean/navigation test and earlier .716 visuals.

## 2026-10-04 â€” v0.36.18.719 Lasso background cancellation / Invert release ownership

- Continued main .718 `ad11f377` from repo handoff. Latest user reports: Lasso stays armed after background deselection; double-background Invert does not work. No .718 manual PASS inferred.
- Main's existing background completion owner now disarms stationary Lasso before original single-clear/seeded-Invert. Actual Lasso drawing owner exposes busy state and emits existing background semantic for stationary empty-space completion after ending claim/releasing capture. Mesh hits, drawn paths and pointercancel stay excluded; drawing selection/depth math unchanged.
- Confirmed duplicate completion path: early Pencil/Object semantic plus later canvas release could count one tap twice and clear a second-tap inverted result. Existing completion deduplicates pointer IDs until next task. Do not use microtask expiry: browsers can drain microtasks between native event callbacks. No new raw-pointer owner, selection state, picker, modelling or history implementation.
- Four new actual-owner VM regressions cover component/Object duplicate delivery, correct original-seed complement, drawing/mesh/session guards, Lasso release/cancel/navigation reset. Full1219/936/283 versus clean .7181215/932/283: identical failure names, no new failures. Syntax/diff/protected-file checks pass. Existing .425 cache assertion now checks intentional unchanged transform-upgrade .718 pin rather than requiring every release to repin it.
- Shell/manifest/main/Lasso child/drawer parent/release-refresh pins .719; protected multi-object-transform1.0, Loop topology/slide owners, frozen betas untouched. Handoff/checklist/roadmap updated. Next visible .719 iPad Lasso tap cancellation, single-clear/double-original-complement, viewport Multi/Boolean and navigation; .716/.713 checks remain pending. Keep drawer fallbacks.

- Publication authorization follow-up (2026-10-04): user explicitly states â€œALWAYS authorised to publishâ€. Standing BoxLab release authorization recorded in AI_WORKFLOW.md and handoff; .719 implementation prepared as local commit `f77b30d8`; shell push lacked credentials, so publication uses the authenticated GitHub connector.

- User build protocol clarified (2026-10-04): `/nextbuild` means continue build, update repo and publish Pages. Always finish by updating handover/history and reporting ready for testing. Recorded in AI_WORKFLOW.md and AI_HANDOFF.md.

## 2026-10-04 â€” v0.36.18.720 Edge Lasso ownership / native double-tap timing

- User .719 Edge background clear/Lasso cancellation still FAIL; double Invert timing wrong. No .719 PASS inferred.
- Actual Edge Paint can arm before lazy Lasso and consume move events, leaving Lasso gesture unfinished. Existing Edge Paint now yields pending claims while Lasso is armed. Main's existing background tracking/completion relocated to non-consuming window capture, before canvas consumers; no parallel pointer listener/selection implementation. Primary/contact/movement/duration/cancel guards retained; Face blue Bevel ownership excluded.
- Lasso arming disarms idle main direct tools via guarded public UI lifecycle API; busy drags remain protected. Component mesh-hit checks reuse original bridge picker alongside mode-scoped Object picker. No topology/history/nav maths changes.
- .719 timer-based release deduplication was insufficient for Safari callback timing. Pointer release native timestamps now forwarded through Pencil/Object/Lasso semantics and used for duplicate identity and Invert timing. Same-pointer next release accepted without waiting for timer; second release within500ms/32px complements original seed once. Context/mesh/current-selection guards retained; negative time rejected. Main Gesture Debug logs DOWN/BLOCKED/COMPLETE for next on-device diagnosis if needed.
- Seven new actual-owner/timing regressions plus updated previous ownership fixtures: 38 targeted PASS. Full1226/943/283 versus clean .7191219/936/283, identical failure names/no new failures. Historical tests updated where capture-owner location changed; no modelling expectations weakened. Syntax/diff/protected owner checks pass.
- .720 shell/manifest/main/helper/Pencil gate/Multi/Lasso child/drawer parent/Edge Paint/refresh pins updated. Protected multi-object-transform1.0, Loop topology/slide/commit and frozen betas unchanged. Next visible .720 Edge background Lasso clear/disarm, double Invert timing, drawing/navigation/Multi/Undo checks; keep drawer fallbacks and earlier pending checks.

## 2026-10-04 â€” v0.36.18.721 Object List Modifiers / Invert diagnostics

- User .720 checks1/3 pass: Edge background clear/Lasso disarm, Lasso drawing and finger navigation. Pencil drawing/finger navigation while Lasso armed is intended. Slight Lasso selection tightening deferred MUCH LATER at final perfection; preserve current working ownership/math. Double-background Invert remains FAIL; no complete .720 PASS inferred.
- Existing Modifiers was already below Objects but Focus reveal hid it. Original Focus/Object List owner now exposes both original drawers, closes Modifiers on every opening, restores previous disclosure states on Focus close/mode exit/Focus exit. Normal-view list opening also collapses Modifiers. CSS/layout/disclosure only; original Mirror/SubD/Cage control nodes, listeners, IDs and modelling/history remain unchanged; other drawer children hidden in Focus.
- Invert behavior deliberately unchanged pending device evidence. Existing matcher adds optional diagnostic-only trace with first/match/time/distance/context/mesh/selection rejection and timing/counts; existing main resets are labeled. Gesture Debug BACKGROUND DOUBLE TAP plus DOWN/BLOCKED/COMPLETE will identify why the real second tap is rejected. No new pointer listeners/selection state/timing changes. Next user action: enable VIEW Gesture Debug, double true-background tap after component selection and capture screenshot before choosing next fix.
- 21 targeted PASS including original Modifiers disclosure/restoration, matcher trace invariance and working .720/.719 owners. Full1228/945/283 versus .7201226/943/283, identical failure names/no new failures. Syntax/diff/protected-file checks pass. Working Lasso/Edge Paint/Pencil/Multi/Loop/frozen beta files unchanged.
- .721 shell/manifest/main/helper/view-modes/release pins current. Handoff/checklist/roadmap updated; next visible .721 Modifiers controls and debug screenshot. Keep pending .716/.713 checks and drawer fallbacks.


## 2026-10-04 â€” v0.36.18.722 persistent background-tap diagnostics

- User .721 screenshot shows Pencil orbit/hover activity flooding Gesture Debug; no visible double-tap decision, so it cannot establish the Invert rejection reason. Invert remains unresolved; .720 working Lasso cancellation/drawing/finger navigation protected.
- Existing debug panel pins last six BACKGROUND entries in a blue section, suppresses repetitive PEN HOVER SWALLOW / PEN ORBIT MOVE FORWARD, retains contact/ownership logs. Clear and disable/re-enable reset both sections. Diagnostic presentation only; matcher/main/Lasso/Edge Paint/Pencil/Multi owners unchanged.
- 8 targeted PASS including 1500 noisy events, bounded/reset panel and retained contact logs. Full1231/948/283 versus .7211228/945/283: same failure names, no new failures. Syntax/diff checks pass. Protected transform1.0/Loop/frozen betas untouched.
- .722 shell/manifest/debug/refresh pins current. Next: select two edges, two quick true-background taps with one finger, screenshot blue BACKGROUND section; repeat Pencil separately. Original Modifiers hands-on checks remain pending.


## 2026-10-04 â€” v0.36.18.723 retain physical double-tap contact evidence

- .722 screenshots show first/clear with original two-face seed and intervening mesh-hit resets, but do not establish why second tap fails. DOUBLE TAP is a detector label; reason=first means unmatched contact. Earlier time rejection was1030ms. Do not blame user technique or assume Pencil side tapping. Audit corrected mistaken6px threshold claim: main is8px, consistent with Pencil. No timing/movement change justified yet.
- Read-only window-capture debug observer pins four physical viewport down/up/cancel records in amber above existing six blue background decisions. Native timestamp/coordinates/primary/buttons/pressure survive noisy logs and reveal whether both contacts arrive. No consuming methods, capture claims, selection or navigation mutation; disabled observer returns. Existing gesture/matcher owners unchanged.
- 10 targeted PASS, including bounded/reset evidence and actual passive early observer behavior/target filtering/disabled no-op. Full1233/950/283 versus clean .7221231/948/283: identical failure names, no new failures. Syntax/diff/protected owner checks pass.
- .723 shell/manifest/debug/refresh pins current. Handoff/checklist/roadmap updated. Next immediate amber+blue screenshot after two screen taps on background; Invert remains unresolved, original Modifiers device checks pending.


## 2026-10-04 â€” v0.36.18.724 background hold Invert replaces double tap

- User explicitly requests testing long background press: short tap clears/disarms Lasso, hold inverts current selection. Retired double-tap from live main; old matcher module remains historical and disconnected. .723 screenshots revealed movement rejection/single completions but did not establish failed pair cause; no speculative delay/radius change.
- Existing main background owner starts500ms timer for real primary contact on true background. Inverts original current component/Object set once using existing owners; Lasso stays armed. Native release/semantic dedup prevents release from clearing result in either delivery order. No new pointer owner, modelling/history or navigation implementation.
- Existing8px movement guard, secondary contact/multitouch, pointercancel, navigation and blur cancel; context/active-object/mesh/selection/session guards protect delayed callbacks. Pencil hover excluded, busy tools/blue Bevel/contextual Done remain protected. Double short taps now just clear; Object short-tap selection contract retained.
- 24 targeted PASS including actual hold owner, both release orders, Lasso retention, cancellation/context changes, original Object complement, real Pencil contact and blur; nearby Lasso/Edge Paint/debug/session checks pass. Full1237/954/283 vs clean .7231233/950/283: identical failure names/no new failures. Updated historical main-owner expectations for retired doubletap and session fixture release prefix. Syntax/diff/protected files checked.
- .724 main/shell/manifest/debug/refresh pins updated. Handoff/checklist/roadmap current. Next iPad finger/Pencil tap vs hold, release retention, armed Lasso, navigation/history; Modifiers manual test and prior pending checks retained.


## 2026-10-04 â€” v0.36.18.725 GEO vertex/edge/face icon

- User .724 PERFECT/PASS recorded: protect background tap clear/Lasso off and500ms hold Invert/release retention; failed double-tap superseded. Next user priority before Beta6 is GEO icon clarity.
- Existing toolbar GEO icon now shows distinct left-to-right solid dot, diagonal line and lightly filled rectangular face. Original snapping checkbox/listener/state/tooltip retained; no behaviour changes. Child toolbar and topbar parent cache keys refreshed, shell/manifest/refresh markers .725. Main stays .724; protected modelling/gesture owners untouched.
- Five existing viewport control checks PASS; syntax/diff checks pass. Small visual edit does not justify full-suite rerun; last .724 full1237/954/283 retained as baseline. Next visual/toggle sanity check, pending Modifiers access/actions and drawer/radial audit towards Beta6. Handoff/history/checklist updated.


## 2026-10-04 â€” v0.36.18.726 VIEW Object List without selection

- User resumes Beta6 build after GEO icon. Drawer audit confirms empty Object/Multi selection hides gizmo and its only Focus list shortcut. Add VIEW Object List action under Objects & Modifiers to close this access gap.
- Reuses authoritative __boxlabObjectListViewport and original Object mode button when invoked from component mode; original Objects and collapsed Modifiers panels, controls and restoration retained. Successful action closes VIEW; active sessions/direct modelling or unavailable drawer/mode guard changes. iPad pointerup and existing synthetic-click suppression prevent duplicate toggle; mouse uses same action. No selection/management/history implementation duplicated.
- 12 targeted PASS including original drawer restoration, selection-independent action, original mode switch, busy/missing-owner guards and actual pointerup+click suppression. Full1240/957/283 vs clean .7251237/954/283: identical failure names/no new failures. Syntax/diff/protected-owner checks pass; original modelling/gesture files untouched.
- .726 view-modes/shell/manifest/refresh pins current, passed main .724 and toolbar/topbar .725 pins retained. Handoff/history/checklist/roadmap updated. Next Focus empty-selection access/Modifiers and component-to-Object hand tests. Remaining advanced selection/depth/filter and bulk Object audit, then combined Beta6 regression; drawer stays available. .725 visual check pending; .724 user PASS preserved.


## 2026-10-04 â€” v0.36.18.727 viewport Visible/Through selection depth

- User .726 PASS /nextbuild: preserve original VIEW Object List access. Next drawer gap is paint/Lasso depth hidden in Focus.
- Move original #paintSelectDepth group into viewport strip alongside snapping/Lasso. Same Visible/Through nodes, IDs, handlers and active state; original paint/Lasso owners still read/update it. Compact scoped flex styling overrides drawer display:contents. No duplicate selection implementation, geometry/depth maths, pointer owners or modelling changes.
- 27 targeted PASS including reparented depth button identity/listeners and nearby actual Lasso/background hold/Edge Paint/Object List owners. Syntax/diff pass. Presentation-only relocation does not justify full rerun; last .726 full1240/957/283 retained. Protected main .724/Loop/Pencil/Multi/selection owners/frozen files unchanged.
- .727 toolbar child/topbar parent and shell/manifest/refresh pins current; view-modes .726/main .724 retained. Handoff/history/checklist/roadmap updated. Next Focus/normal Visible/Through Lasso/paint, state/layout iPad checks; remaining advanced filters and bulk Object audit towards Beta6. No extra GEO or individual modifier-action PASS inferred.


## 2026-10-04 â€” v0.36.18.728 full selection-access batch

- User /nextbuild 1 authorizes larger selection-access batch. Original selection host moves into viewport SELECT top-centre popout in normal/Focus; component commands/filters/alignment and late contextual Object bulk controls retain original nodes, listeners and authoritative owners. Existing Visible/Through/Lasso strip remains.
- Shared .716 placement reused; bounded scroll and compact narrow strip. Close, SELECT, Escape and background dismiss without consuming gestures; active tool session closes/guards opening. No new selection maths/state, pointer modelling owners or protected runtime changes.
- 27 targeted PASS, including actual Grow/Connected owner after reparenting and original Object context switching. Full1244/960/284 vs fresh clean .7271240/956/284: identical failure names, four new passing checks. Historical .726957/283 baseline differs from this fresh run. Syntax/diff pass.
- .728 shell/topbar/manifest/refresh and new child pins; toolbar .727/view .726/main .724 retained. Next grouped manual selection-access checks, then whole radial/session polish and Beta6 release-candidate regression. Handoff/history/checklist/roadmap updated; .724/.726 PASS protected, no extra PASS inferred.


## 2026-10-04 â€” v0.36.18.729 radial/session polish batch

- User /nextbuild 2 requests whole radial/session batch. Audited Face, Vertex, Object and Edge inventories, availability, settings, terminal actions, repeat/reset and puck/gizmo return against original authoritative owners. Existing tool inventory, shared placements and protected Object gizmo exceptions retained.
- Face Exact/Repeat/Done now guards actual drag/context. Edge Slide/Offset/Crease validates object identity as well as mode/mesh/lock, closes on superseding/context loss, guards deferred returns and never restores launch IDs after deselection. Slide/Offset exact fields validate before delegation. Established semantic completion clears radial suppression for all three and returns surviving selection to puck.
- Crease first successful preview asks existing main owner for its single history push; further previews/Done do not push. Avoids committing old snapshot into a new object's history: manager swaps stacks within the same History instance and replaces live mesh in place. A stored History reference or mesh identity alone does NOT protect this. No geometry/history implementation duplicated.
- Locked radial actions guard all modes. Rejected contextual launch restores access without broadcasting a session. Shared wide layout retains original nodes/listeners/stages, enforces hidden right-rail actions, full-width notes and usable exact-field body columns.
- 62 focused PASS; broader112/108/4 existing failures. Full1259/976/283 vs fresh .7281244/960/284: no new failures, one stale dynamic-loader pin fixture fixed. 15 additional tests, existing release graph assertions updated. Syntax/diff/protected sources pass. Main .724/Multi transform1.0/Loop/navigation/Pencil kernels/frozen betas untouched.
- .729 release/shared dock+wide/client/parent pins current; unchanged toolbar .727/view .726/corner .718/Loop commit .715 retained. Handoff/history/checklist/roadmap updated. Next grouped iPad radial/settings/exit/history checks, then /nextbuild 3 release-candidate audit. .728 manual acceptance remains pending; no inferred PASS.


## 2026-10-05 â€” v0.36.18.730 compact popouts / Beta6 release-candidate audit

- User removes Visible/Through UI while retaining Lasso/SELECT. Original depth host hidden/aria-hidden with CSS override, retained internally for original paint/Lasso state/listeners. Original snap/Lasso/SELECT controls remain, no selection maths or gestures changed.
- Supersedes forced wide panels: content-sized width with viewport/720px maximum, zero outer padding, intrinsic action rail, compact spacing, single sparse body column and wrapped notes/readable minimum. SELECT compact too. Original controls/stages/listeners retained; shared loader graph refreshed.
- RC browser inspection exposes existing Extract .683 syntax failure (missing function closing brace). Restore brace only and refresh Extract pin; real-owner tests verify partial/all/empty selections, groups, source retention, scene checkpoint and completion. All279 modules now syntax-pass; protected main/Multi/Loop/Pencil/frozen sources untouched.
- 53 focused PASS with real floating Move/Rotate/Scale exact mathematics+single Undo/Redo and indexed export channels/morph/scale/group behavior. Broader RC113/97/16 existing failures; full1265/982/283 vs fresh .7291259/976/283, identical failure names and six new passes. No all-green or Beta6 device-release claim. Cloud browser has WebGL disabled; 3D/Pencil and actual Files/Nomad handoff remain device checks.
- .730 shell/shared dock+wide/clients/topbar/toolbar/SELECT/Extract and refresh markers; protected main .724/view .726/corner .718/Multi1.0/Loop commit .715 unchanged. Handoff/history/checklist/roadmap and new Beta6 release checklist current. Next iPad compact UI, Extract, combined regression/GLB Nomad; freeze only after passes. Lasso tightening deferred.


## 2026-10-05 â€” v0.36.18.731 Sweep / persistent Slide / Edge and Vertex Bevel preview

- Follows edited user scope during .730 device checks; no acceptance inferred. Single quick build: Sweep Face/Edge popup, Slide until Done/background, blue Edge/Vertex popup preview while retaining original viewport direct bevels.
- Sweep radial calls original capture/launch API with actual result; original staged controls dock in viewport for Sweep in every mode. Existing proxy hidden while original dock visible; no duplicate editor or Sweep kernel/gesture/history changes.
- Edge Slide completion retains session/arming. Done/background ends it; three minimal main active-session checks reuse existing finger/Pencil background owner and prevent hold Invert during Slide. .724 shorttap/Lasso/hold ownership remains otherwise intact.
- Edge Width/Segments and Vertex Width/exact preview copy existing bevel kernels into shared Face-blue renderer. No live mutation/history on sliders; explicit Apply one history step, Cancel disposes. Edge repeat/direct Pencil release behavior retained; Vertex explicit Apply closes as Face does, existing direct Vertex drag preserved. Stale geometry/object/mode/lock guards added; no new Vertex Segments kernel.
- 86 focused PASS; all279 source syntax PASS. Full1274/994/280 vs fresh .7301265/982/283: no new failure names; three old Sweep release-pin fixtures now pass, nine added runtime checks pass. VM fixture supplied shared renderer and normalized cross-realm face arrays; Slide test updated to requested persistent policy, not weakened history/selection expectations.
- Edited owner/shell/refresh pins .731; main .731 has only three Slide checks. Shared placement/layout/unrelated clients .730, Multi1.0/Loop .715/view .726/corner .718/frozen betas protected. Handoff/checklist/roadmap/Beta6 checklist current. Next user device checks and remaining .730 grouped release acceptance before freezing.

## 2026-10-05 â€” .732 PASS; .733 final Focus-default candidate for Beta 6

Current release **v0.36.18.733**; parent main
`24c586cda1cdcc9393be5ac873dd0ea25ca7044a`. User explicitly **PASS .732** and asks
for Beta 6 freeze/release, with Focus enabled on every launch and its icon armed.

- Shell starts with `boxlab-focus-view` before modules run. Existing Focus toggle
  remains the only owner; no persisted preference or new gesture. Launch hides the
  large left list; toolbar/radials and right Object Browser remain available.
- Focus sync sets active class plus aria-pressed, with explicit high-contrast armed
  styling. Action labels say Show left tool list (exit Focus) / Hide left tool list
  (Focus). Original icon SVG is retained and both directions dispatch existing resize.
- Only view-modes runtime changed; shell/recovery markers .733. Unchanged .732
  Array/session/layout and protected Multi/Loop/navigation pins remain intact.
  Historical version-coupled fixtures now check the unchanged owners' actual pins.
- 44 focused Focus/browser/corners/background/Sweep checks PASS. Full1287/1010 PASS/
  277 FAIL, identical failure names to .732; no runtime regression. Modified source
  syntax and diff whitespace PASS. Existing full-suite source/pin/VM test debt remains
  explicit, so overall CI is not advertised as green.

Release state: .731 and .732 user accepted. No new feature work planned. .733 launch
UX is the last candidate change. `BETA6_RELEASE_NOTES.md` prepared as a draft;
`BETA_6_RELEASE_CHECKLIST.md` now records accepted work and exact remaining checks.
Do not claim Beta6 released or create an accepted freeze before device outcomes:
1. .733 launch armed Focus, show/hide left list, browser in both views.
2. Final short Pencil/finger navigation, selection/Lasso/hold, history, Multi and
   Boolean/Extract smoke on the intended release candidate.
3. Export/Save GLB to iPad Files, import into Nomad, reimport to BoxLab; confirm
   expected geometry/scale/colour/groups. This older release gate is not explicitly
   accepted by PASS .732 alone.

After device checks pass: snapshot the accepted candidate into `/beta-6/` using
existing frozen-beta conventions; audit relative/runtime/import/recovery/manifest
paths so frozen app stays isolated from live main; record exact source commit;
finalize release notes and acceptance checklist; publish, verify live and frozen
versions/assets/links, then record immutable Beta6 and resume normal development.
Prior frozen Beta3/4/5 stay unchanged. Publication remains authorized. Further
changes before freeze are reproducible release blockers only; slight Lasso
selection tightening remains deferred.

## 2026-10-05 â€” .734: Vertex/Edge/Face Align on component gizmos

Current release **v0.36.18.734**, parent main
`26c1983d56131098b2ef3786983a04acde3670d9`. User requests Align access on Vertex,
Edge and Face gizmos rather than modelling radials. Beta6 freeze remains pending
acceptance of this correction plus .733 Focus and final release-device checks.

Audit: component-align .705 already supports Vertex/Edge/Face fixed-anchor X/Y/Z
alignment in the original selection controls. Only Face had a radial Align sector;
Vertex/Edge access was absent there. Reuse this owner and its kernels/history.

- Bottom-left component-gizmo Align shortcut displays three distinct mode-specific
  point/line/face icons (one appropriate icon per mode). Object mode retains Multi;
  hidden shortcuts do not occupy the visible cluster. No central Move handle change.
- Remove Face Align radial sector; other radial sectors/positions remain unchanged.
  Shared contextual Align panel now supports all three modes and hides the gizmo
  while open. Choose X/Y/Z, then tap a selected component to keep it fixed. Other
  selected vertices move along that axis onto the anchor coordinate; anchor remains
  unchanged. Edge/Face coordinate uses the original anchor vertex average; this
  build does not invent edge orientation matching or vertex collapse/merge.
- Face retains the existing Align tïŽµïfòµë(š+my×F–ç2&W7VÇBâf6RVFvW2öÖ—76W2&W7F'@§–6·Wâ7GVÂ•BfVVÂöÆFVæ7’&VÖ–ç2VæF–ærâW6W#“C52&÷FV7FVC²–æFWVæFVç@¦Ç†“#’÷&VfÆV7F–öâvFW2Væ6†ævVBâæW‡BFWf–6RfVVF&6²&Vf÷&R7&÷72Öf6R6×VFvRÀ¤ò÷"VFvR×6VÒWF†÷&–æs²æòWFöÖF–2æW‡B'VçF–ÖR'V–ÆB&Vf÷&RF†BvFRà ¢22ã“C"(	B6öææV7FVBÖf6R6×VFvR6öÆ÷W"6''“²ã“CW6W"52(	B#"ö7Fö&W"##` ¥W6W#“C52&÷FV7G26ÖRÖf6R6×VFvRô÷6—G’÷Fö÷fW&Æ’õ–çB†—7F÷'’õ6fT÷Vâà¤VF—Csfc–Csc¢÷&–v–æÂ6VÒ÷G&–ævÆRw&‚Ç&VG’&÷fW2Öæ–föÆBVFvW3²W‡÷6P¦g&÷¦VâF—&V7Bf6R—'2F‡&÷Vv‚6ÖRf–ÇFW"FöÖ–âÂæòGWÆ–6FRF¦6Væ7’¶W&æVÂà¤÷&–v–æÂ&7FW"6'&–W2&V×VÇF—Æ–VBÖVâ7&÷726öç6V7WF—fR6öææV7FVB–6¶VBf6W3 £sRR&–÷"&÷VæBöÇ†&W77W&R×6—¦VB–6·W³#RRÆö6Â7G&ö¶R×7F'Bâ÷&–v–æÂ6ÖRÐ¦f6RF6‚6VÖçF–72Væ6†ævVBâw&—FW27F’–6¶VBÖf6R6Æ—VC²F—66öææV7FVBöÖ—72ð¦æöæÖæ–föÆB÷fW'FW‚ÖöæÇ’&W7F'BâÖVâ6öÆ÷W"6''’—2÷&–VçFF–öâÖ–æFWVæFVçBÂäõ@¦f–æRF6‚ÖFWF–ÂG&ç7÷'BÂv÷&ÆB×&F—W2÷"WFöÖF–2f"Öf6R7F×–ærâ6ÖR6—¦Rð¤÷6—G’÷&W77W&Rö†&FæW72öÇ†÷&r66Æ"ÖÖ6²ö†—7F÷'’ô4õr÷&ö¦V7BöW‡÷'B÷væW'2à¥7G&–7B6GW&VB—"66†VÖö&÷VæG2÷7'6RwV&G3³„Òv÷&²–æ6ÇVFW27&÷72Öf6RÖVâà¤æò&W6÷W&6RövVöÖWG'’õUb÷G&–ævÆRÖw&‚öÆ–v‡F–ær6†ævW3²Ö–âö6vRô×VÇF“ãög&÷¦Và§&WF–æVBâf÷W"gVæ7F–öæÂ÷væW'2Â&Wf–WvVB&WfW'6RÖ66†Rw&ƒ“C"âæWsRFW7G26÷fW £"föÆB÷&÷FF–öâöÖ—'&÷"Æ–÷WG2ÂW†6ÇW6–öç2öW†7B$t$ö÷6—G’öÇ†öFV6÷’—6öÆF–öâÀ¦–çfÆ–Bö6GW&VB—'2ö6æ6VÂ÷v÷&²Â7GVÂT’VFvR7G&ö¶Rö†—7F÷'’õ6fT÷VâöæF—fRärÀ§66Æ"öÖ6²—6öÆF–öâö6†V6·ö–çB&öÆÆ&6²â÷&–v–æÃ“C·6VÓ52ÂæWsU52âgVÆÂð§V&Æ–6F–öâföÆÆ÷w2âFWf–6S“C"6VÒfVVÂVæF–æs²òôVFvRWF†÷&–ær&VÖ–âVWVVBà¥&VBFö72÷–çB×6×VFvR×6V×2Ó“C"æÖBâ–æFWVæFVçBÇ†“#’÷&VfÆV7F–öâvFW2Væ6†ævVBà ¢ã“C"f–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£"Ãs#52òd”Âò6¶—VB¢¢à¤f—fRæWr6öææV7FVBÕ6×VFvR6†V6·2Â÷&–v–æÃ“C·6VÓæB&Wf–WvVB&VÆV6SR72à¤æò÷&–v–æÂ76W'F–öç2&VÆ†VBâ&Wf–WvVB6†ævVBÖ–âôÆ"&WfW'6Rw&ƒ“C#²&÷FV7FV@¦Ö–âö6vRô×VÇF“ã÷G&–ævÆRw&‚ög&÷¦VâVæ6†ævVBâ†÷7FVBõvW2öÆ—fR&ööbföÆÆ÷w2à¥W6W"&WVFVB52öæW‡F'V–ÆBv†–ÆS“C"v27F–ÆÂÆö6Âö–â&Vw&W76–öã£“C66WFæ6P§&VÖ–ç2&÷FV7FVC²æó“C"FWf–6R52–æfW'&VB&Vf÷&RV&Æ–6F–öâöÖçVÂFW7BÆ—7Bà ¢22ã“C"V&Æ–6F–öâfW&–f–VB(	B#"ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR#C–&#ƒCcsƒ3f3&63Sc–C“sSV6FCSF&#v#Vc’ÂFW7FVBG&VP£Vf&#“3FFSsS“FC#&&3FcCC3†#CV&33“vfBÂ—2V&Æ—6†VBöâÖ–ââ6öææV7FVBv—@¤FFWÆöFVCrW†7B&Æö'3²7&VFVBG&VRæBfWF6†VBÖ–âÖF6‚Æö6ÆÇ’FW7FVBG&VRà¤Æö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3“sc#ƒƒcö¦ö#“scƒƒ3S&÷F‚70¢¢£#s#FW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FVBÆörF÷FÇ2fW&–f–VBà¥vW33“sc#ƒsSR'V–ÆC“scƒƒcS3böFWÆ÷““sc“33ƒ3R7V66VVFVBâÆÃ#6†V6¶V@§÷7FFWÆ÷–ÖVçB6†VÆÂ÷fW'6–öâÂ6†ævVBÖ–âôÆ"öf–ÇFW"÷6VÒ'VçF–ÖRw&‚Â&V6÷fW'’À§&WF–æVBÖ–âô×VÇF“ã÷G&–ævÆRw&‚õUb÷&ö¦V7BöW‡÷'B÷&–Ö—F—fRæBg&÷¦Vä&WFp¦Ö&¶W"f–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6Râ÷&–v–æÂ76W'F–öç2&WF–æVC²&÷FV7FVBög&÷¦Và¦'—FW2Væ6†ævVBâF†—2V&Æ–6F–öâ&ööb6†ævW2f÷W"6öçF–çV—G’f–ÆW2öæÇ’à ¤'V–ÆC“C"6ö×ÆWFRæB&VG“¢7V&RGvòf6W2f—6–&ÆRÂ–çBF6‚WFò6†&VBVFvRÀ¥6×VFvR7&÷72—BÂ6ö×&R÷6—G’æB–çFVB÷fW&Æ’ÂVæFõ&VFò&WF–ç2–çBÂ6fT÷Và§&WF–ç2&W7VÇBâ6VÒG&ç6—F–öâ6'&–W2fW&vVB6öÆ÷W"Âæ÷BFWF–ÆVBF6‚÷&–VçFF–öâà¥W6W#“C52&÷FV7FVBâ&WVFVB52öæW‡F'V–ÆB'&—fVB&Vf÷&S“C"V&Æ–6F–öã¢—B—0¦æ÷C“C"FWf–6R66WFæ6Râ7GVÃ“C"•B6VÒfVVÂvFR&VÖ–ç2æW‡BâF†Vâ&Vf–æRg&öÐ¦fVVF&6²&Vf÷&RòôVFvR6VÒWF†÷&–æs²Ç†“#’÷&VfÆV7F–öâvFW27F’–æFWVæFVçBà ¢22ã“C"W6W"52(	B#"ö7Fö&W"##b„'&—6&æR ¤gW'F†W"52öæW‡F'V–ÆB'&—fVBeDU#“C"FWÆ÷–ÖVçBÃ#Æ—fRÖf–ÆRÖF6†W2æB†÷7FV@£#s#52fW&–f–6F–öââ66WBF†—2ÆFW7B52f÷"Ä•dS“C"6öææV7FVBÖf6RÖVâ6''’À¤÷6—G’ö÷fW&Æ’õ–çBVæFõ&VFòõ6fT÷Vã²V&Æ–W"&WV&Æ–6F–öâ&WWF—F–öç2&VÖ–ã“Cà¥&÷FV7C“C"Æöæw6–FS“CâæW‡BWF†÷&—¦VC“C2æ'&÷r'V–ÆB&Vv–ç2&÷VæFVBö&¦V7BÖöæÇ¤ò&¶Rf÷VæFF–öâf–÷&–v–æÂUb÷væW'6†—÷G&–ævÆRvVöÖWG'“²f—6–&ÆR6öçG&öÇ2föÆÆ÷p§fÆ–FFVB&¶R—†VÇ2÷v÷&²wV&G2âæòòT’÷"&VæFW&VBò66WFæ6R—2–æfW'&VBà ¢22ã“C2(	B&VBÖöæÇ’ö&¦V7Bò&¶Rf÷VæFF–öâ(	B#"ö7Fö&W"##b„'&—6&æR ¥W6W"ã“C"52&VÖ–ç2&÷FV7FVBâVF—Bf÷VæBæòW†—7F–ærò&¶W"âæWp¦7&2÷–çBÖòÖ&¶Ræ§6W6W2÷&–v–æÂ&Wf–WrG&–ævÆR÷væW'6†—÷G&–ævÆRw&‚À¦÷&–v–æÂ–çBÖf–ÇFW"ÖFöÖ–âFW†VÂ&7FW"æBF‡&VR&’æ–çFW'6V7EG&–ævÆRâF†P¦f–ÇFW"FöÖ–â÷F–öæÆÇ’&WGW&ç2—G2W†—7F–ærG&ç6–VçBG&–ævÆRÖ²÷&F–æ'¦''W6‚6ÆÆW'2&WF–âW†7B&WGW&â6†RæBÆÆö6F–öç2âæò6V6öæBG&–æwVÆF÷"À¥Ub&7FW&—¦W"ÂF¦6Væ7’Â''W6‚Â†—7F÷'’Â66VæR&W6÷W&6R÷"W‡÷'B÷væW"à ¥W&R7–æ6‡&öæ÷W2ö&¦V7BÖÆö6Â&¶R&WGW&ç2÷væVBÆ–æV"#‚f—6–&–Æ—G’æB6W&FP¦6÷fW&vRÂUb×cÖf—'7Bâv†—FS×Væö66ÇVFVC²Væ6÷fW&VBFW†VÇ2v†—FRö6÷fW&vSâFWFW&Ö–æ—7F–0¦6÷6–æR×vV–v‡FVB†VÖ—7†W&R6×ÆW2ÂF÷V&ÆR×6–FVB6ÖRÖö&¦V7B&Æö6¶W'2Â6÷W&6Rv–æF–æp¦æ÷&ÖÂÂæ÷&ÖÆ—¦VBö&¦V7BÖF–vöæÂ&F—W2ö&–2â6—¦Sn(	3#‚öFVfVÇCcBÂ6×ÆW3N(	3cBð¦FVfVÇCbÂ&F—W2ã(	3"öFVfVÇBã#RöbF–vöæÂâ6öç6W'fF—fS„Ò&’÷G&–ævÆR×FW7@§&VfÆ–v‡BÇW2÷&–v–æÃ$ÒUb66â6²W†6W726ö×ÆW†—G’&VgW6W2v—F‚æò66VæRw&—FW2à¤æ÷&ÖÆ—¦VB&—fFRw&‚ö–çG2öæÇ“²6÷W&6RÖW6‚õUbövVöÖWG'’&VÖ–âVæ6†ævVBà¤æò66VæRÖæV–v†&÷W"Âw&÷VæB×ÆæRÂv÷&ÆB×G&ç6f÷&ÒÂ&VæFW&VB54ò÷"Æ&VFò&¶R–WBà¤æòÖ–âÖò–×÷'Bö'WGFöâ÷&W6÷W&6R÷W'6—7FVæ6RöW‡÷'B6†ævR÷"FWf–6R×W&f÷&Öæ6P¦6Æ–ÒâF†—2–çFVçF–öæÆÇ’Æ÷r×&W6öÇWF–öâf÷VæFF–öâ—2äõBæWr–çB&W6öÇWF–öâà ¤f—fRæWr&Vw&W76–öâFW7G26÷fW"÷BÖ–âW†7B÷væW'6†—Âv†—FR÷VâÆæRö6÷fW&vRð¦FWFW&Ö–æ—6Òö6÷’—6öÆF–öâÂf6–ær&Æö6¶W'2÷&F—W2öF÷V&ÆR×6–FVB&—2Â7W÷'FVB66ÆRð§G&ç6ÆF–öâ÷&÷FFVBUg2Â7FÆRö–çfÆ–Bö÷fW&Æ÷v÷&²&VgW6Ç2æB6÷W&6R&W6W'fF–öâà¥F–ç“RÓ‚6÷W&6Rf—‡GW&Rv2&V¦V7FVB'’F†Rõ$”t”äÂ&Wf–Wr'V–ÆFW"&Vf÷&R&¶–æs°§66ÆRFW7G2W6R66WFVBã(	3S‚vVöÖWG'’–ç7FVBÂæò'V–ÆFW"FöÆW&æ6R6†ævRà¥&VBFö72÷–çBÖòÖf÷VæFF–öâÓ“C2æÖFâÖ–â–çFW"&WfW'6RÆöFW"6†–â²6†VÆÂð§&V6÷fW'’–ç3“C2&Wf–WvVC²Æ"öÖ–âö6vRô×VÇF“ãög&÷¦VâÆv÷&—F†×2Væ6†ævVBà ¤æW‡C¢÷&–v–æÂ–çBÆ–W"ö†—7F÷'’G&ç67F–öâf÷"âW‡Æ–6—BæöâÖFW7G'V7F—fRð¤×VÇF—Ç’Æ–W"Âv—F‚6æ6VÆÆF–öâ÷7FÆR÷ööÂö6†V6·ö–çBwV&G2æBf—6–&ÆR6öçG&öÇ2À§F†Vâ•BV&æ6RöÆFVæ7’FW7F–ærâFòæ÷B–×Ç’òT’66WFæ6Rg&öÒW&RFW7G2à¤Ç†“#’÷&VfÆV7F–öâ×&Wf–WrvFW2&VÖ–â–æFWVæFVçFÇ’Vç&W6öÇfVBâæòæWrò†æG2Ööà§FW7BW†—7G2–ã“C3²W†—7F–ær6×VFvRõ–çBVæFõ&VFòõ6fT÷Vâ&VÖ–ç2F†RæV&'’&6VÆ–æRà¥fÆ–FF–öâ÷V&Æ–6F–öâWf–FVæ6RföÆÆ÷w3²Fòæ÷B–æfW"6ö×ÆWF–öâ&Vf÷&RfW&–f–6F–öâà ¢ã“C2f–æÂÆö6ÂæöFS#Bã’ã6ö×ÆWFR&Vw&W76–öã¢¢£"Ãs#R52òd”Âò6¶—VB¢¢à¤f—fRæWròö÷væW'6†—6†V6·2Â÷&–v–æÂ6×VFvS“Có“C"VÆWfVâæB&VÆV6Rö66†Rf—fP§72öâf–æÂ'VçF–ÖRâæò÷&–v–æÂ76W'F–öç2&VÆ†VC²Ö–âö6vRô×VÇF“ãög&÷¦Và§Væ6†ævVBâ†÷7FVB&Vw&W76–öâõvW2öÆ—fR&ööbföÆÆ÷w2âæòæWròFWf–6R6öçG&öÇ2à ¢22ã“C2V&Æ–6F–öâfW&–f–VB(	B#"ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR6fV#3c“vf#csscV#3c&3ƒS&3S†3SCS&cs3VÂFW7FVBG&VP¦##6S&C†Sƒ#ƒSS3vcƒFfc–S“S3CcFf6VSSVÂ—2V&Æ—6†VBöâÖ–ââ6öææV7FVBv—@¤FFWÆöFVC2W†7BÆö6Â&Æö'2æB7&VFVBF†R–FVçF–6ÂÆö6ÆÇ’FW7FVBG&VS°¦fWF6†VBÖ–âÖF6†VBÂÆö6Â'&æ6‚Æ–væVBv—F‚æòf–ÆR6†ævW2âÆö6ÂæöFS#Bæ@¦†÷7FVBæöFS#"&Vw&W76–öã3“scS“SC#bö¦ö#“sƒ3#&÷F‚72¢£#s#RFW7G2ò ¦f–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FVBÆörF÷FÇ2fW&–f–VB††÷7FVC#’ã‡2’à¥vW33“scS“C“cS’'V–ÆC“sƒ3c3c’öFWÆ÷““sƒSƒƒ3B7V66VVFVBâÆÃ#6†V6¶V@§÷7FFWÆ÷–ÖVçB6†VÆÂ÷fW'6–öâÂWfW'’6†ævVB'VçF–ÖR÷væW"ÂæWròÖöGVÆRÂ&V6÷fW'’À§&WF–æVBÖ–âö6vRô×VÇF“ã÷G&–ævÆRw&‚õUb÷–çB÷&ö¦V7BöW‡÷'BæBg&÷¦Vä&WFrÖ&¶W ¦f–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6Râ&Wf–WvVB–ç3“C3²&÷FV7FVBög&÷¦Vâ'—FW2Væ6†ævVBà¤æò÷&–v–æÂ76W'F–öâ&VÆ†VBâF†—2V&Æ–6F–öâ&ööb6†ævW2f÷W"6öçF–çV—G’f–ÆW0¦öæÇ’Âv—F‚–FVçF–6ÂFW7FVB'VçF–ÖR'—FW2à ¤'V–ÆC“C26ö×ÆWFS¢æòæWr†æG2ÖöâòFW7BæVVFVB&V6W6Ræòò6öçG&öÇ2&RW‡÷6VBà¥W&R&¶Rö÷væW'6†—÷v÷&²÷&VgW6Â6÷fW&vR—2WFöÖFVBâW6W#“C%52&VÖ–ç2&÷FV7FVC°¦æW‡Bæ'&÷r'V–ÆB–çFVw&FW2W‡Æ–6—Bò×VÇF—Ç’ÖÆ–W"7&VF–öâF‡&÷Vv‚÷&–v–æÂ–ç@¦†—7F÷'’÷ööÂö6ö×÷6—F÷"v—F‚7FvVBö6æ6VÂ÷7FÆR÷&VgW6ÂwV&G2æBF†Vâf—6–&ÆR6öçG&öÇ2à¤òf÷VæFF–öâ—2Æö6ÂÖö&¦V7Cn(	3#‚6×ÆW2öæÇ’Âæ÷B&VæFW&VB54òÂæV–v†&÷W"Öö&¦V7@§6†F÷w2ÂW'6—7FVçBò&W6÷W&6W2÷"†–v‚×&W6öÇWF–öâÆ&VFò&¶–ærâÇ†“#’æ@§&VfÆV7F–öâ×&Wf–WrvFW2&VÖ–â–æFWVæFVçBâW†—7F–ær6×VFvRõ–çB†—7F÷'’õ6fT÷Và¦—2÷F–öæÂæV&'’FWf–6R6æ—G’Âæ÷Bâ–çfVçFVBò66WFæ6RvFRà ¢22ã“CB(	BVF—F&ÆRò×VÇF—Ç’Æ–W"&Wf–Wr(	B#"ö7Fö&W"##b„'&—6&æR ¤&6RÖ–ãFS“Bó“C2VF—FVBâæòW†—7F–æròT’öÆ–W"G&ç67F–öâf÷VæBâæWr6ÖÆÀ§–çBÖòÖÆ–W"†VÇW"6ÆÇ2F†R÷&–v–æÃ“C2&¶W"CcL+"ób&—2æB÷&–v–æÂU`¦f–ÇFW"ÖFöÖ–â&7FW"CcBæB7W'&VçCS"ó#Bâ6ÖRÖf6RÂ6÷fW&vRÖv&R&–Æ–æV §G&ç6fW"&Væ÷&ÖÆ—¦W2öæÇ’ÖF6†–ær6÷W&6RÖf6R6×ÆW3²FÆ2æV–v†&÷W'2æWfW ¦6öçG&–'WFRâVæ6÷fW&VB÷Vç6×ÆVBF†–âf6W27F’G&ç7&VçBâ&F—W2&VÖ–ç2¦g&7F–öâöbÄô4Âö&¦V7BF–vöæÃ²æòv÷&ÆB×G&ç6f÷&Ò÷66VæRÖæV–v†&÷W"öw&÷VæBõ54òà¤6öÆ÷W"×VÇF—Ç’W6W2W†—7F–ær'—FR×76R6ö×÷6—F÷"Âæ÷B‡—6–6ÆÇ’Æ–æV"%"ð§6Æ÷B÷"†–v‚×&W6öÇWF–öâ&’&¶Râ7W'&VçB6öÆ÷W"÷66Æ"÷6÷W&6R÷F—'VFvWG2Væ6†ævVBà ¤÷&–v–æÂ–çFW"÷vç2G&ç6–VçBò&Wf–WrÂööÂfÆ–FF–öâÂöæRÇ’6†V6·ö–çBÀ¤4õr&W6÷W&6R76–væÖVçBæB6VÆV7F–öââæWrÆ–W"—2÷&F–æ'’VF—F&ÆR&7FW"æÖV@¤òâÂ×VÇF—Ç’ÂW6W"7G&VæwF‚2Æ–W"÷6—G“²W†—7F–ærf—6–&–Æ—G’öÖ6²öW&6W"÷–çBð¤FVÆWFRôÖW&vRôfÆGFVâö†—7F÷'’õ6fT÷VâæBfÆGFVæVBæF—fRôtÄ"w&—FW'2&VÖ–â÷væW'2à¤æò6fVBòFW67&—F÷"÷&V6—R÷66†VÖ÷"æWrw&—FW"ö†—7F÷'’övW7GW&RöÖöFVÆÆ–ær¶W&æVÂà¥&Wf–WræWfW"76–vç2ö&¦V7B6öÆ÷W%–çB÷"VçFW'26fRö†—7F÷'“²6æ6VÂôFöæRö†—7F÷'’ð¦&öG’Æ÷72F—66&G2—BâÇ’&V6†V6·2Æ—fR÷6—F–öç2õUb&–æF–ærö7W'&VçBF&vWBæ@§ööÂ&Vf÷&R6†V6·ö–çC²f–ÇW&W2¶VW6öÖÖ—GFVB&W6÷W&6W2ö†—7F÷'’Væ6†ævVBà ¤6ö×7BÄTeB–çB(i"6öÆÆ6VBÖ&–VçBö66ÇW6–öã¢&V6ƒ^(	3R†FVfVÇC#RR’À¥7G&VæwFƒ(	3R†FVfVÇCcRR’Â&¶Rò&Wf–WrÂÇ’òÆ–W"ò6æ6VÂòâ&Wf–Wp¦&Æö6·2–çBæBÆ–W"ö6†ææVÂVF—G3²f–ævW'27F–ÆÂæf–vFRâÇ’6VÆV7G2òÆ–W#°¦W†—7F–ærÆ–W"÷6—G’÷f—6–&–Æ—G’6â6†ævR7G&VæwF‚gFW'v&BâW†—7F–ærVæFòõ&VFð§&WF–ç2–çBv—F‚õ$”t”äÂ6VÆV7F–öâ'VÆW2…&VFòÖ’¶VW&6R6VÆV7FVC²6VÆV7Bò’à¤–ÖvRÆ6VÖVçB×W7BÇ’ô6æ6VÂf—'7C²–ÖvR6÷W&6W2÷66Æ'27F’–æFWVæFVçBà¥F‡&VRÖ÷fW&Æ’6&VÖ–ç3²ÖW&vRöFVÆWFRFòg&VR6Æ÷Bâ&¶RFVfVÇG3cBóbf—†VC°£„Ò&’×v÷&²æC$ÒUb×66âÆ–Ö—G2&VgW6R6ö×ÆW‚ö÷fW&Æ–ærö÷WBÖöb×F–ÆRÆ–÷WG2&Vf÷&P§&W6÷W&6Rö†—7F÷'’6†ævW2âf–æÂG&ç6fW.(šCBFW†VÂ6×ÆW2W#S,+"ó#L+"FW7F–æF–öâà¤æò–çFW&7F—fR6æ6VÆÆF–öâGW&–ærF†R&÷VæFVB7–æ6‡&öæ÷W26Æ7VÆF–öâ÷"•@¦ÆFVæ7’õ$ÒöV&æ6R6Æ–Òâ6ÖÆÂÆ÷r×öÇ’UbÖW6†W2f—'7C²6öçfW‚7V&RÖ’6†÷p¦Æ—GFÆRöæòF&¶Væ–ærâ6öæ6fR÷&V6W76VBvVöÖWG'’—2F†RÖVæ–ævgVÂV&æ6RFW7Bà ¤–×÷'FçBf–ÆVB&ö6ƒ¢ÖævW"æö&¦V7G2÷F&vWBvWGFW'26ÆÂ6fT7F—fRæB4ÄôäP§F†R7F—fRÖW6‚â&VfW&Væ6R–FVçF—G’6ææ÷BW7F&Æ—6‚Væ6†ævVBò6÷W&6Râ÷&–v–æÀ¥Ub¶W’ÇW2W†7B6W&–Æ—¦VBÆ—fRfW'FW‚6öçFVçBwV&BF†R6æF–FFS²Fòæ÷BFBà¦–FVçF—G’ÖöæÇ’6†V6²÷"×WFFRF†RÖævW"FòÖ¶R7V6‚6†V6²72âFV×÷&'’FV'Vp§&V6öâFW‡B&VÖ÷fVBâæò66WFVBÖævW"öÖW6‚öW‡÷'BÆv÷&—F†Ò6†ævVBà ¥6—‚æWr–çFVw&F–öç273£S"ó#BFöÖ–â×6fR÷WGWB÷6÷W&6R&W6W'fF–öã²G&ç6–Vç@§&Wf–Wrô6æ6VÂôÇ’ö÷6—G’÷f—6–&–Æ—G’÷66Æ"÷VW"—6öÆF–öã²7GVÃ#BT’¶÷&–v–æÀ¥–çB†—7F÷'’µ6fT÷Vâ¶W†7BäôÒôtÄ"äs²6†V6·ö–çB÷ööÂöFVf÷&ÖVB×6÷W&6Rö6Æ÷6R&VgW6Ã°§66Æ"öÖ6²ögVÆÂ7F6²ö6ö×ÆW†—G’wV&G3²&WF–æVB–ÖvW2÷7FvVB×WGVÂW†6ÇW6–öâæ@¤FöæRF—66&F–ærVæÆ–VBòâ÷&–v–æÂæV&'““C2ó“3‚ó“C"FW7G3e53²&VÆV6SU52à¥&VBFö72÷–çBÖòÖÆ–W"Ó“CBæÖBâgVÆÂÆö6Ã#ƒ%52ód”Âó6¶—ƒ“rã#2“²V&Æ–6F–öâWf–FVæ6RföÆÆ÷w2âW6W#“C%52&VÖ–ç0§&÷FV7FVC²öæW‡F'V–ÆB—2æ÷BòFWf–6R66WFæ6RâÇ†“#’÷&VfÆV7F–öâvFW26W&FRà ¤DUd”4S“CC¢6–×ÆR&V6W76VBUbÖW6‚(i"–çB(i"Ö&–VçBö66ÇW6–öâ(i"&¶S²÷&&—BÀ¤6æ6VÂ&WF–ç2&Wf–÷W2–çBâ&¶^(i$Ç’7&VFW2òÆ–W"ÂF§W7BÆ–W"÷6—G’ð¥f—6–&ÆS²VæFõ&VFò¶VW2–çBÂ6VÆV7Bò–bæVVFVC²6fT÷VâöæF—fRW‡÷'B¶VW26†FRà¤æW‡C¢7GVÂ•BVÆ—G’öÆFVæ7’fVVF&6²ÂF†Vâæ'&÷vÇ’&Vf–æRòVÆ—G’ö6÷fW&vRð§v÷&²'VFvWB2Wf–FVæ6Rv'&çG2âæòWFöÖF–2gW'F†W"òfVGW&R&Vf÷&RFWf–6RvFRà ¢ã“CBf–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£"Ãs352òd”Âò6¶—VB¢¢à¥6—‚æWrò–çFVw&F–öâ6†V6·2²W†—7F–æs#s#R72öâf–æÂ6÷W&6S²÷&–v–æÂæV&'£“C2ó“3‚ó“C"6—‡FVVâæB&Wf–WvVB&VÆV6Rf—fRÇ6ò72âæòW†—7F–ær76W'F–öç0§&VÆ†VBâ6ö×ÆWFRòÖ†VÇW"÷–çFW"÷6†VÆÂ&WfW'6R–ç3“CB&Wf–WvVC²Ö–âö6vRô×VÇF“ãð¦g&÷¦VâVæ6†ævVBâ†÷7FVBõvW2öÆ—fRV&Æ–6F–öâ&ööbföÆÆ÷w3²FWf–6S“CBVæF–ærà ¢22ã“CBV&Æ–6F–öâfW&–f–VB(	B#"ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRSC3““v##&cvS#–6#†Ffc#–F#†3csS&FV663&CƒfÂFW7FVBG&VP¦#33Cƒf6C–Sƒsss6c#cF6–FScvcSƒ6fFÂ—2V&Æ—6†VBöâÖ–ââ6öææV7FVBv—@¤FFWÆöFVC"W†7B&Æö'2æB7&VFVB–FVçF–6ÂFW7FVBG&VS²fWF6†VBÖ–âÖF6†VBÀ¦Æö6Â'&æ6‚Æ–væVB6ÆVæÇ’âÆö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3“ss#csƒ#ð¦¦ö#“ƒs“C“b&÷F‚72¢£#s3FW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FV@¦ÆörF÷FÇ2fW&–f–VBƒ#3ã2’âvW33“ss#ccc’'V–ÆC“ƒs“c“SöFWÆ÷““ƒ““csS §7V66VVFVBâÆÃ#÷7FFWÆ÷–ÖVçB6†V6¶VB6†VÆÂ÷fW'6–öâÂ6†ævVB–çFW"T’ö6÷&RöæWp¤òG&ç6fW"†VÇW"Â&WF–æVC“C2&¶RöFöÖ–âÂ&V6÷fW'’öÖ–âö6vRô×VÇF“ã÷G&–ævÆP¦vVöÖWG'’õUb÷–çB÷&ö¦V7BöW‡÷'BæBg&÷¦Vä&WFrÖ&¶W"'—FRÖÖF6‚FW7FVB6÷W&6Rà¤÷&–v–æÂ76W'F–öç2&WF–æVC²&÷FV7FVBög&÷¦VâÆv÷&—F†×2Væ6†ævVBâF†—2&öö`§WFFW2f÷W"6öçF–çV—G’f–ÆW2öæÇ“²FW7FVB÷V&Æ—6†VB'VçF–ÖR'—FW2Væ6†ævVBà ¤'V–ÆC“CB—26ö×ÆWFRæB&VG’f÷"†æG2ÖöâFW7F–æs¢6–×ÆR&V6W76VBæF—fRUbÖW6€®(i"–çB(i"Ö&–VçBö66ÇW6–öâ(i"&¶Rò&Wf–Ws²÷&&—BÂ6æ6VÂ&WF–ç2&–÷"–çBà¤&¶^(i$Ç’7&VFW26VÆV7FVBVF—F&ÆRò×VÇF—Ç’Æ–W#²Æ–W"÷6—G’÷f—6–&–Æ—G’À¥–çBVæFõ&VFòÂ6fT÷VâæBæF—fR6†FVBW‡÷'B6æ—G’â&VFòföÆÆ÷w2÷&–v–æÀ§6VÆV7F–öâ'VÆW2æB6â¶VW&6R6VÆV7FVC²6†ö÷6RòÆ–W"–bæVVFVBâ6öçfW‚7V&P¦Ö’6†÷rÆ—GFÆRöæò6†F÷s²6ÖRÖö&¦V7BöÆö6ÃcL+"ób×&’&¶RÂæ÷B67&VVâ×76R÷ ¦æV–v†&÷W"Öö&¦V7Bòâv÷&²÷&VgW6ÂÆ–Ö—G2&VÖ–ã²6ÖÆÂUbÖW6†W2f—'7BâFWf–6S“C@¦V&æ6RöÆFVæ7’÷W'6—7FVæ6R66WFæ6R&VÖ–ç2VæF–ærÂæ÷B–æfW'&VBg&öÒæöFRà¥W6W#“C"6öææV7FVB6×VFvR52&÷FV7FVC²Ç†“#’÷&VfÆV7F–öâ×&Wf–Wr–æFWVæFVçBà¤æW‡Bæ'&÷r'VçF–ÖRv÷&²föÆÆ÷w27GVÃ“CBFWf–6RfVVF&6²&F†W"F†âWFöÖF–0¤òVÆ—G’öÆ–v‡F–ær6†ævW2âæòæWròFWf–6R52–æfW'&VBg&öÒöæW‡F'V–ÆBà ¢22ã“CR(	B†–v†W"×&W6öÇWF–öâòæB6æ6VÆÆ&ÆRVÆ—G’¦ö'2(	B#2ö7Fö&W"##b„'&—6&æR ¥W6W#“CE52v—F‚W‡Æ–6—Bö÷"÷F6‡’òVÆ—G’W†6WF–öââ&÷FV7BF†RW†—7F–æp§&Wf–WrôÇ’ô6æ6VÂöÆ–W"ö†—7F÷'’÷W'6—7FVæ6Rv÷&¶fÆ÷s²òV&æ6R—2äõB66WFVBà¥W6W"WF†÷&—¦W2†–v†W"&W6öÇWF–öâöæW‡F'V–ÆBâVF—BÖ–ãfFFC–C#¢7GVÂ&¶ScL+"ó`§&—2öæÇ“³#B6öÆ÷W"FW‡GW&Rv2§W7B–çFW'öÆFVB6†FRâW†—7F–ærF‡G&6RÖöæÇ§&VÖ÷FR%d‚—2Vç&VÆFVBFòF†—25R&¶W#²æòFF—F–öæÂ¶W&æVÂöÆ–'&'’–×÷'FVBà ¤÷&–v–æÂ&¶W"æ÷r†2ôäRvVæW&F÷"G&6–ær¶W&æVÂâÆVv7’&¶U–çDò&VÖ–ç0§7–æ6‡&öæ÷W2ÂW†7CcBób÷WGWG2æC„Òv÷&²6ó#‚Ö†–×VÒ&WF–æVBâ7–æ2†–v‚F€§W&Ö—G>(šC#Sl+"ócB&—2v—F‚6W&FRd•„TC#„Ò6öç6W'fF—fR&’÷G&–ævÆR×v÷&²6°¦÷&–v–æÃ$ÒUb66â6ó#²G&–ævÆR&÷VæB&WF–æVBâæòVæ&÷VæFVB6ÆÆW"v÷&²Æ–Ö—Bà¤6‡Væ²WfVçG2WfW'“cRÃS3bf—6—FVBG&–ævÆR6æF–FFW3²'VææW"6†V6·2&÷'E6–væÂæ@§––VÆG2Fò'&÷w6W"F–ÖW'2gFW"&÷†–ÖFVÇ“†×267V×VÆFVBv÷&²&WGvVVâWfVçG2à¥&’&W&F–öâõUb&7FW"&VÖ–â&÷VæFVB7–æ6‡&öæ÷W26WGW²æò†&Bg&ÖR×F–ÖR÷ ¤Ó"ÆFVæ7’wV&çFVRâG&6RæBf–æÂf6R×6fRG&ç6fW"6†&R6ÖR66†VGVÆW"à¤6æ6VÆÆF–öâG&÷27FvVBFF²6÷W&6RvVöÖWG'’VçF÷V6†VBâ÷væVBFöÖ–âÆ&VÇ2&WW6V@¦f÷"G&ç6fW"–ç7FVBöb&7FW&—¦–ærÆ÷rw&–BGv–6RâæòæWrG&–æwVÆF–öâõUb&7FW"ð¦F¦6Væ7’÷&’¶W&æVÂâ÷&–v–æÂ†VÖ—7†W&R÷&F—W2ö&–2f÷&×VÆ2æB6×Æ–ærGFW&à§Væ6†ævVBÂÖW&VÇ’Ö÷&R÷6—F–öç2öF—&V7F–öç2âæòFVæö—6W"÷"ÆÂ×F6†–æW72×6öÇfVB6Æ–Òà ¥–çBòVÆ—G“¢†–v‚†FVfVÇB“#Sl+"ócB6×ÆW3²ÖVF—VÓ#Œ+"ócC²V–6³cL+"óbâ†–v‚†0£l9r&¶VB—†VÇ2æCL9r6×ÆVBF—&V7F–öç2fW'7W3“CB‡WFócL9r6×Æ–ærv÷&²f÷"F†P§6ÖR6÷fW&vRöÖW6‚’âvVöÖWG'’öö66ÇW6–öâ6â&WV—&RfWvW"7GVÂ–çFW'6V7F–öâf—6—G3°¦6&VgW6W26ö×Æ–6FVBÆ–÷WG2Â7VvvW7BÖVF—VÒõV–6²÷"6–×ÆW"ÖW6‚âW†—7F–æp¦6öÆ÷W#S"ó#BFW‡GW&W2Â6÷W&6R÷F—÷66Æ"&W6öÇWF–öç2ÂÆ–W"÷&W6÷W&6Rôf–ÆRöW‡÷'@¦'VFvWG2æB66†VÖ2Væ6†ævVBâöÆB6fVBò—†VÇ27F’2Ö—3²†–FRöFVÆWFRöÆBð¦Æ–W"æB&V&¶RFò6ö×&R&F†W"F†â7F6¶–ærGvò6†F÷rÆ–W'2à ¤÷&–v–æÂ–çB6W76–öâ7FvW27–æ2¦ö"v—F‚&öw&W72ô6æ6VÃ²VæF–ær¦ö"&Æö6·0§–çBöÆ–W"ö6†ææVÂ÷VÆ—G’VF—G2v†–ÆRf–ævW'2æf–vFRâ6æ6VÂÂFöæRö6Æ÷6Rö&öG¦Æ÷72ö†—7F÷'’&÷'B—C²ÆFR&W7VÇG26ææ÷BV&Æ—6‚–çFòæWr÷7F÷VB÷&WÆ6VB¦ö"à¤g&W6‚ÖW6‚×÷6—F–öâõUbö7W'&VçB×&W6÷W&6RæB÷&–v–æÂööÂwV&G2&V6VFR&Wf–Ws°¤Ç’&VÖ–ç2ôäR÷&–v–æÂ6†V6·ö–çBô4õr6öÖÖ—BFòâVF—F&ÆR×VÇF—Ç’Æ–W"à¥7FFRfÆw2&RG&ç6–VçBöæÇ“²æòW'6—7FVçBò&V6—R÷"æWr†—7F÷'’÷væW"à¥VÆ—G’—26W76–öâT’&VfW&Væ6RÂæ÷B6fVB&ö¦V7BÖWFFFâW†—7F–ærV–6²&VÖ–ç0¦'—FRÖ–FVçF–6Ââ6ÖRÖf6R6÷fW&vRG&ç6fW"7F–ÆÂW†6ÇVFW2FÆ2æV–v†&÷W'3²F†–ææW ¥Ubf6W2æ÷rvWB7GVÃ#SbÖw&–B6×ÆW2&F†W"F†â&÷'&÷v–æræ÷F†W"f6Rw26†FRà ¥6—‚æWrFW7G26÷fW"vVçV–æS#SbócBw&–BæBf–æW"6†FRÆWfVÇ2ÂW†7B7–æ5V–6²&—G’À¦æWrF†–âÖf6R6÷fW&vRæB—6öÆF–öâÂ&öw&W72ö&÷'B÷&RÖ&÷'Bö–çfÆ–BVÆ—G’À¦7GVÂ–çFW"6æ6VÂö6Æ÷6R÷7FÆR÷&WG'’ö6†V6·ö–çB÷ööÂ÷v÷&²&VgW6ÂÂ7GVÂT’FVfVÇBð¤6æ6VÂv†–ÆR'W7’ôFöæRÆFR×&W7VÇB7W&W76–öâõV–6²6ö×&—6öââ÷&–v–æÃ“C2³“CBVÆWfVà¦æB&Wf–WvVB&VÆV6Rf—fR72âæò÷&–v–æÂ76W'F–öâ&VÆ†VC²öÆC“C26—¦S#’æ@£„Ò&VgW6Â6†V6·2&VÖ–â7F—fRâ&VBFö72÷–çBÖò×VÆ—G’Ó“CRæÖBâgVÆÂ÷V&Æ–6F–öà§&ööbföÆÆ÷w2âÆÂ6†ævVBò÷–çFW"÷6†VÆÂ&WfW'6RÆöFW"–ç3“CR&Wf–WvVC²Ö–âð¦6vRô×VÇF“ãög&÷¦VâöÖöFVÆÆ–ærõUb÷&ö¦V7BöW‡÷'BÆv÷&—F†×2Væ6†ævVBà ¤DUd”4S“CS¢öâ4ÔR&V6W76VBÖöFVÂ†–FRöÆBòÂVÆ—G’V–6¾(i$&¶Rö–ç7V7Bô6æ6VÃ°¤†–vŽ(i$&¶Rö–ç7V7BB6ÖR&V6‚õ7G&VæwF‚Â6ö×&RFWF–Âö&æF–æræBv—BF–ÖRâ6æ6VÀ¤EU$”är†–v‚æB6öæf—&ÒæòÆ–W"ö†—7F÷'“²&V&¶RôÇ’F†VâÆ–W"÷6—G’÷f—6–&–Æ—G’À¥–çBVæFõ&VFòæB6fT÷VâöæF—fR6†F–ærâW6RÖVF—VÒ–bv÷&²wV&B&VgW6W2†–v‚à¤7GVÂ•B6Öö÷F†W"×&W7VÇBöÆFVæ7’66WFæ6RVæF–æs²Ç†“#’÷&VfÆV7F–öâvFW0¦–æFWVæFVçBâæW‡Bæ'&÷r–×&÷fVÖVçBföÆÆ÷w2W6W"6ö×&—6öã²Fòæ÷BwVW72Æ–v‡@§6÷W&6R÷"6–ÆVçFÇ’6Öö÷F‚Vç&VÆFVBUb—6ÆæG2Fò†–FR&VÖ–æ–ærFVfV7G2à ¢ã“CRf–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£"Ãs3r52òd”Âò6¶—VB¢¢à¤ÆÂ÷&–v–æÃ#s3æB6—‚æWrVÆ—G’ö6æ6VÆÆF–öâ6†V6·272öâf–æÂ6÷W&6S°¦÷&–v–æÂó“C2ó“CBVÆWfVâæB&Wf–WvVB&VÆV6Rf—fRÇ6ò72âæò76W'F–öç0§&VÆ†VBâ&Wf–WvVBò÷–çFW"÷6†VÆÂ&WfW'6Rw&ƒ“CS²&÷FV7FVBÖ–âö6vRô×VÇF“ãð¦g&÷¦VâVæ6†ævVBâ†÷7FVBõvW2öÆ—fRV&Æ–6F–öâ&ööbföÆÆ÷w3²FWf–6RVÆ—G’VæF–ærà ¢22ã“CRV&Æ–6F–öâfW&–f–VB(	B#2ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR&3FF#ccCSs##63&3cSFV6&CS–VcCƒFF&fÂFW7FVBG&VP¦†#SvF6F&6fS363ƒ“3&6fC†CFSVc“S“S3CÂ—2V&Æ—6†VBöâÖ–ââ6öææV7FVBv—@¤FFWÆöFVC2W†7B&Æö'2æB7&VFVB–FVçF–6ÂFW7FVBG&VS²fWF6†VBÖ–âÖF6†V@¦æBÆö6Â'&æ6‚Æ–væVB6ÆVæÇ’âÆö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3“ƒƒsc3s“3Bð¦¦ö##““C3CS“R&÷F‚72¢£#s3rFW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FV@¦ÆörF÷FÇ2fW&–f–VBƒ#32ã2’âvW33“ƒƒsc3s3“'V–ÆC#““C3s2öFWÆ÷“#““Ss#3“ §7V66VVFVBâÆÃ#6†V6¶VB÷7FFWÆ÷–ÖVçB6†VÆÂ÷fW'6–öâÂ6†ævVBò&¶W"÷G&ç6fW"ð§–çFW"T’ö6÷&RÂ&WF–æVBFöÖ–â÷G&–ævÆRw&‚Â&V6÷fW'’öÖ–âö6vRô×VÇF“ãõUb÷–çBð§&ö¦V7BöW‡÷'BæBg&÷¦Vä&WFrÖ&¶W"'—FRÖÖF6‚FW7FVB6÷W&6Râ&Wf–WvVB–ç3“CS°¦÷&–v–æÂ76W'F–öç2&WF–æVBÂ&÷FV7FVBög&÷¦VâÆv÷&—F†×2Væ6†ævVBâF†—2&öö`¦6†ævW2f÷W"6öçF–çV—G’f–ÆW2öæÇ“²FW7FVB÷V&Æ—6†VB'VçF–ÖR'—FW2Væ6†ævVBà ¤'V–ÆC“CR6ö×ÆWFRæB&VG’f÷"4ÔRÖÖöFVÂ6ö×&—6öã¢†–FRöFVÆWFRöÆBòÂVÆ—G¥V–6³cBón(i$&¶Rö–ç7V7Bô6æ6VÃ²†–vƒ#SbócBB6ÖR&V6‚õ7G&VæwF‚Â6ö×&Rf–æW"6†FP¦æBv—BF–ÖRâÖVF—VÓ#‚ócB&VÖ–ç2f–Æ&ÆR–b†–v‚v÷&²6&VgW6W2â6æ6VÂGW&–æp¦&¶RÆVfW2æòÆ–W"ö†—7F÷'“²&WG'’ôÇ’ÂÆ–W"÷6—G’÷f—6–&–Æ—G’Â–çBVæFõ&VFòÀ¥6fT÷VâöæF—fR6†F–ærâöÆB6fVBò—†VÇ2Fòæ÷BWFöÖF–6ÆÇ’–×&÷fS²&V&¶Rà¥W6W#“CE52&÷FV7G2v÷&¶fÆ÷rv—F‚W‡Æ–6—Bö÷"÷F6‡’V&æ6RW†6WF–öã³“CP¦7GVÂ•BVÆ—G’öÆFVæ7’66WFæ6R&VÖ–ç2TäD”ärÂæ÷B–æfW'&VBg&öÒæöFRà¥VÆ—G’FW7B&÷fW27GVÂ†–v†W"w&–BöÖ÷&RÆWfVÇ2÷F†–âÖf6R6÷fW&vRÂæ÷BW&fV7@§6Öö÷F†æW72öâWfW'’ÖöFVÂâÇ†“#’÷&VfÆV7F–öâvFW2&VÖ–â–æFWVæFVçBâæW‡@§'VçF–ÖR&Vf–æVÖVçBföÆÆ÷w2FWf–6R6ö×&—6öâ&F†W"F†âVç&VÆFVBÆ–v‡F–ær6†ævW2à ¢22ã“Cb(	B–çBòUb&W7F'C²ã“CRW6W"52(	B#2ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’&W÷'G2¢£“CRÒ52¢£¢&÷FV7B†–v†W"×&W6öÇWF–öâòæB—G2W†—7F–æp§&Wf–Wrö6æ6VÂöÇ’ö†—7F÷'’v÷&¶fÆ÷râF†—27WW'6VFW2V&Æ–W"VæF–æs“CRæ÷FW3°¦æò–×Æ–6F–öâöbW&fV7BòöâÆÂÖW6†W2÷"66WFæ6RöbVç&VÆFVB÷VâvFW2à ¤VF—BÖ–âC3C¢÷&–v–æÂUb&ö¦V7F–öç2æB6²ÆÂW†—7BÂæò–çB&W6WBæ@¦æòvVæW&ÂFÆ2Vçw&â†FÆ2V'2öæÇ’–âF‡G&6RFWVæFVæ7’U$Ã²6²ÆÀ¦'&ævW2W†—7F–ær—6ÆæG2æBFöW2æ÷BvVæW&FRâFÆ2â¶VWFÆ2Vçw&2§6W&FRgWGW&Ræ'&÷rF6²F‡&÷Vv‚÷&–v–æÂUbö†—7F÷'’÷væW'2à ¤ö&¦V7B(i"Ubæ÷rW‡÷6W26ÆV"–çB†¶VW2Ug2’æB6ÆV"–çB²Ug2†6†ö÷6R§&ö¦V7F–öâv–â’â&÷F‚v÷&²v—F‚7FÆRvVöÖWG'’õUb&–æF–æw2v—F†÷WB÷Væ–ær–çBà¤ÆÂ6öÆ÷W"Æ–W'2öÖ6·2ö–ÖvW2ôòÇW2&÷Vv†æW72æBÖWFÆæW72&W6÷W&6W2FWF6‚–à¦öæR÷&–v–æÂ66VæR6†V6·ö–çC²6†&VB&W6÷W&6W2ö6÷–W2&VÖ–â–çF7Bâæò&V&–æBö`¦öÆB—†VÇ2ÂæòvVöÖWG'’VF—G2ÂæòWFöÖF–2F—66&BöâUbVF—G2âVæFòõ&VFò&W7F÷&W0¦W†7B&W6÷W&6W2õUg2â&W6WB—2f÷"–æFWVæFVçB&÷„Æ"ÖW6†W3²–×÷'FVBtÄ"ÖFW&–Ç2À¦Æ–æ¶VB÷&ö6VGW&ÂöÆö6¶VB÷&VfW&Væ6Rö&¦V7G2&R&VgW6VBâW†—7F–ær&ö¦V7F–öâ&6P§&W7G&–7F–öç2&VÖ–ââf–Ww÷'B&Vg&W6‚W6W2÷&–v–æÂ&VæFW"ÖÖöFR÷væW"â7FÆR–ç@¦W'&÷'2æ÷rF—&V7BFòö&¦V7B(i"Ub(i"6ÆV"–çBà ¤f÷W"æWs“CbFW7G26÷fW"ÆÂÖ6†ææVÂ7FÆR&V6÷fW'’æB&V÷VâÂ7GVÂVæFõ&VFòô4õrÀ§7FÆRUb&VÖ÷fÂ÷&W&ö¦V7B÷&W–çBÂ&Ææ²æF—fR6fT÷VâÂæòÖ÷÷&VgW6ÂFöÖ–6—G’À¦æB÷&–v–æÂæVÂ6ÆÆ&6²÷&VæFW"FVÆVvF–öââæWrÖçVÂvFS¢&W&öGV6R7FÆP§–çB(i"6ÆV"–çB(i"–çC²6ÆV"&÷F‚(i"&÷‚ö&÷&–FR&ö¦V7F–öâ(i"–çC°¥VæFõ&VFò&W6WBæB6fT÷Vâ&Ææ²÷&W–çFVB&W7VÇBâFÆ2vVæW&F–öâæ÷B6†—VBà¥&VÆV6Rw&ƒ“Cb&Wf–WvVC²×VÇF“ãög&÷¦Vâf–ÆW2Væ6†ævVBâfÆ–FF–öâ÷V&Æ–6F–öà§&W7VÇG2föÆÆ÷s²æó“CbFWf–6R52–æfW'&VBà ¢ã“Cb'VçF–ÖRV&Æ—6†VC¢–c–3vV&V#“6S63ScsfSV#“†cƒ“C6fFfÂFW7FVBG&VP¦3†cC##3“&SSs6cCc6cƒƒ3FcS3Sc63ff6âÆö6ÂæöFS#BgVÆÂ&Vw&W76–öã ¢¢£"ÃsC52òd”Âò6¶—VB¢¢ƒ#"ã—2’Â–æ6ÇVF–ær÷&–v–æÃ#s3ræBf÷W"æWp§&V6÷fW'’FW7G3²æò÷&–v–æÂ76W'F–öç2&VÆ†VBâ&VÆV6R6öçG&7Bf—fR72â&VÖ÷FP¦Ö–âfWF6†VBÂW†7BFW7FVBG&VRÖF6†VBæBÆö6Â'&æ6‚Æ–væVB6ÆVæÇ’à¤†÷7FVB&Vw&W76–öã3“““ccC#æBvW33“““cc#C2fW&–f–VB&VÆ÷rà ¢ã“CbV&Æ–6F–öâfW&–f–VC¢†÷7FVBæöFS#"&Vw&W76–öã3“““ccC#ö¦ö###C#“ƒ3s§76W2¢£#sCFW7G2òf–ÇW&W2ò6¶—VB¢¢†gVÆÂÆörF÷FÇ2fW&–f–VB’ÂÖF6†–æp¦Æö6ÂæöFS#BâvW33“““cc#C2'V–ÆC##C##3ƒ2öFWÆ÷“##C#3CSC’5T44U52à¤ÆÃ#6†V6¶VB÷7FFWÆ÷–ÖVçB6†VÆÂ÷fW'6–öâÂ&W6WBõUb÷–çFW"ö7&VF–öâÆöFW'2À§&VÆV6R×&V6÷fW'’ôòöÖ–âô×VÇF“ãö–ç7V7F–öâ÷–çB÷&ö¦V7BöW‡÷'BæBg&÷¦Vä&WFp¦Ö&¶W"'—FRÖÖF6‚FW7FVB6÷W&6RâæòFW7FVB'VçF–ÖR6†ævVBgFW"fÆ–FF–öâà ¤'V–ÆC“Cb6ö×ÆWFRæB&VG’f÷"FWf–6RFW7F–æs¢ö&¦V7B(i"Ub(i"6ÆV"–çB¶VW0¥Ug2æB7F'G2&Ææ²–çB6W76–öâÂ–æ6ÇVF–ærF†RöÆB&–æF–ærÖW'&÷"66Râ6ÆV §–çB²Ug2W&Ö—G2g&W6‚&÷‚ö&÷&–FR&ö¦V7F–öâæB&W–çBâVæFõ&VFò&W7F÷&W0§&W6÷W&6W2õUg3²6fT÷Vâ&WF–ç26ÆV&VB÷&W–çFVB&W7VÇBâFWf–6S“CbTäD”ärâW6W#“CP¥52&÷FV7FVBâvVæW&ÂFÆ2Vçw&&VÖ–ç26W&FRgWGW&R'V–ÆC²6²ÆÂöæÇ¦'&ævW2W†—7F–ær—6ÆæG2âF†—2&ööb6†ævW26öçF–çV—G’Fö72öæÇ’à ¢22ã“Cr(	Bf—7VÂ–çBÆ–W"7F6³²W6W#“Ce52(	B#2ö7Fö&W"##` ¥W6W"&W÷'G3“Ce53¢&÷FV7BW‡Æ–6—BVæFö&ÆR6ÆV"–çBò6ÆV"–çB²Ug2À§7FÆRÖ&–æF–ær&V6÷fW'’÷&W&ö¦V7BæB÷&–v–æÂ&W6÷W&6W2ö†—7F÷'’âW6W"æ÷r&–÷&—F—¦W0¦&ö7&VFR×7G–ÆRÆ–W"Æ—7C²FÆ2Vçw&&VÖ–ç2FVfW'&VBÂæ÷B–×ÆVÖVçFVB'’6²à¤VF—B7W'&VçC†3“ƒs#¢ÆÂÆ–W"÷W&F–öç2Ç&VG’&VÆöærFò÷&–v–æÂ–çB6÷&Ræ@¥T’6öçG&öÇ3²öæÇ’G&÷F÷vâ&W6VçFF–öâW†—7FVBÂæòF‡VÖ&æ–ÂöÆ—7B÷væW"à ¥&WÆ6Rf—6–&ÆRÆ–W"G&÷F÷vâv—F‚6ö×7BF÷Öf—'7BÆ—7B–âW†—7F–æs#s'‚ÄTe@¦Fö6³£cG‚6öçFVçBF‡VÖ&æ–Ç2F—7Æ–VCC‚÷fW"6†V6¶W&&ö&BÂæÖRÂVæ—VS(	3"ÖÆWGFW ¦&ÆVæB6öFRÂ÷6—G’RÂf—6–&–Æ—G’FövvÆRÂ6VÆV7FVB&ÇVR&÷ræB–ÖvRöÖ6²Æ&VÇ2à¥F&÷rFò6VÆV7C²&ÆVæBö÷6—G’÷Vç2÷&–v–æÂ6VÆV7FVBÆ–W"6WGF–æw2&VÆ÷rÆ—7Bà¤÷&–v–æÂ†–FFVâ6VÆV7B÷f—6–&–Æ—G’æöFW2&VÖ–âWfVçBG&ç7÷'Bf÷"÷&–v–æÂ÷væW'0¦æB&Vw&W76–öâ6öçG&7G2Âæ÷BGWÆ–6FRf—6–&ÆR6öçG&öÇ2â²Æ–W"ò²–ÖvR&VÖ–à¦&W6–FR†VF–æs²–ÖvRVF—Bö6öçfW'6–öâÖ÷fW2–çFò6VÆV7FVB6WGF–æw2â÷&–v–æÂ&VæÖRÀ¦÷6—G’Â&ÆVæBÂ÷&FW"ÂFVÆWFRÂÖW&vRÂfÆGFVâÂÖ6·2æB–ÖvR7F–öç2&WF–æVBà¤&6Rf—6–&–Æ—G’ö&ÆVæBö÷6—G’7F’–Ö×WF&ÆS²66Æ"6†ææVÇ2†–FR6öÆ÷W"7F6³°¤ò7Fv–ærF—6&ÆW2&÷rVF—G2âæòæWr–çB66†VÖÂ'VFvWG2Â†—7F÷'’Â6ö×÷6—F÷"÷ ¦ÖöFVÆÆ–ær÷væW"âÆÂ÷&–v–æÂ&÷FV7FVBvW7GW&W2ô×VÇF“ãög&÷¦Vâf–ÆW2&WF–æVBà §7&2÷–çBÖÆ–W"ÖÆ—7Bæ§2—2&W6VçFF–öâöæÇ“²f–Ww÷'B–çFW"W‡÷6W2÷væVBF–ç¦Æ–W%F‡VÖ&æ–Â6æ6†÷G2öb6öÖÖ—GFVB&r6öÆ÷W"öÇ†Â&Vf÷&RÆ–W"÷6—G’ö&ÆVæBð¦Ö6²â&V&VGV7F–öâ–æ6ÇVFW2F†–âÖ&·2æBÇ†×vV–v‡FVB$t"ÂfÆ—2UgcÖf—'7@§&÷w2f÷"F÷×W&Wf–Ww2Â66†W2'’–Ö×WF&ÆR—†VÂ–FVçF—G’W6–ær6W76–öâvV´Öà¤æògVÆÂFW‡GW&R'—FW2W‡÷6VBFòDôÓ²æòF‡VÖ&æ–Ç26W&–Æ—¦VB÷"†—7F÷'’VçG&–W0¦f÷"'&÷w6–ærâWFFW2gFW"÷&–v–æÂVæ6–Â&VÆV6Rö7F–öç2ö†—7F÷'’&V÷VâÂ6ÆV'0¦öâ6Æ÷6Râ6çf2F‡VÖ&æ–Ç2&R6öçFVçB&Wf–Ww2Âæ÷Bf–æÂ6ö×÷6—FW2÷"Ö6²Ö2à ¤f—fRæWrFW7G26÷fW"ÆÃ#bVæ—VR&ÆVæB6öFW2ÂÇ†÷F†–âö÷&–VçFF–öâö÷væW'6†—À¦7GVÂT’&÷r÷&FW"ö6öçFVçBöÖ6²÷&VæÖRö&ÆVæBö÷6—G’Âf—6–&–Æ—G’öæR6†V6·ö–çBÀ¥VæFõ&VFò÷&V÷Vâõ6fT÷VâÂ7G&ö¶R6æ6VÂæB66Æ"ôòö6Æ÷6RwV&G2â÷&–v–æÃ“Ró“bð£“#‚F&vWFVC•52â†VFÆW726‡&öÖ—VÒ&VæFW&–æröb7GVÂÖ&·W÷7G–ÆW2öÆ—7BÖöGVÆP§v—F‚f—‡GW&RÖWFFFfW&–f–VBæò÷fW&fÆ÷rC#s'‚Fö6²ó#BæC3“f–Ww÷'Bv–GF‡2À§6VÆV7F–öâ6WGF–æw2÷f—6–&–Æ—G’æB67&VVç6†÷B–ç7V7F–öã²&VÂ–çFW"ö†—7F÷'’FW7FV@§F‡&÷Vv‚÷&–v–æÂ–çFVw&F–öâ†&æW72Âæò•B66WFæ6R–æfW'&VBâ67&VVç6†÷B—2¦f—‡GW&RöæÇ“²÷&–v–æÂ÷6W76–öâÆ–÷WB÷væW'2Væ6†ævVBâgVÆÂ÷V&Æ–6F–öâ&öö`¦föÆÆ÷w2âDUd”4S“Cs¢Æ–W"F2÷7G&ö¶W2÷&Wf–Ww3²&ÆVæBö÷6—G’÷f—6–&–Æ—G“²÷&FW&–ærð¦–ÖvR¶Ö6²6VÆV7F–öã²VæFõ&VFòõ6fT÷VâæBÆVgBFö6²67&öÆÆ–ærôFöæRöâ•Bà ¢ã“Crf–æÂÆö6ÂæöFS#B&Vw&W76–öã¢¢£"ÃsCb52òd”Âò6¶—VB¢¢ƒƒã—2“°¦÷&–v–æÃ#sCæBf—fRæWrf—7VÂÖÆ—7B6†V6·2&WF–æVBâ÷&–v–æÃ“Ró“bó“#‚F&vWFVC¦æB&Wf–WvVB&VÆV6Rf—fR72âæò÷&–v–æÂ76W'F–öâ&VÆ†VBâ'VçF–ÖRV&Æ—6†V@¦sƒ““#FS–#6Vc&#ƒC–C3C#“S6cVF66Cƒ&cÂW†7BFW7FVBG&VP¦&#“vCSVf633cv#cS&fV#Cc#“fV#33cSSfVâfWF6†VBÖ–âÖF6†VBF†BG&VRæ@¦Æö6Â'&æ6‚Æ–væVB6ÆVæÇ’â†÷7FVB&Vw&W76–öâòvW2òÆ—fRÖf–ÆR&ööbfW&–f–VB&VÆ÷rà ¢22ã“CrV&Æ–6F–öâfW&–f–VB(	B#2ö7Fö&W"##` ¥'VçF–ÖSsƒ““#FS–#6Vc&#ƒC–C3C#“S6cVF66Cƒ&còFW7FVBG&VP¦&#“vCSVf633cv#cS&fV#Cc#“fV#33cSSfRV&Æ—6†VBæBfWF6†VBÖ–âÖF6†VBW†7FÇ’à¤Æö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3““3cƒCS2ö¦ö###C“cSƒs‚&÷F‚70¢¢£#sCbFW7G2òf–ÇW&W2ò6¶—VB¢£²gVÆÂ†÷7FVBÆörF÷FÇ2fW&–f–VBâ÷&–v–æÀ¦6†V6·2&WF–æVBâvW33““3cs“#2'V–ÆC##C“csƒSBöFWÆ÷“##C“#“s#r5T44U52à¤ÆÃ#6†V6¶VBÆ—fR6†VÆÂ÷fW'6–öâÂÆ–W"ÖÆ—7B÷–çFW"÷&V6÷fW'’Â&WF–æVBÆ–W"ö&ÆVæBð§–çB÷&ö¦V7BöW‡÷'BôòõUb÷&W6WBöÖ–âô×VÇF“ãæBg&÷¦Vä&WFrÖ&¶W"'—FRÖÖF6‚FW7FV@§6÷W&6Râ&WfW'6RÆöFW"¶W—3“Cr&Wf–WvVC²æòFW7FVB'VçF–ÖR6†ævW2gFW"fÆ–FF–öâà¥F†—2&ööbWFFW26öçF–çV—G’Fö7VÖVçFF–öâöæÇ’à ¤'V–ÆC“Cr&VG’f÷"•BFW7F–æs¢÷Vâ–çBv—F‚Gvò÷"Ö÷&RÆ–W'2ÂF&÷w2æ@§–çBF—7F–æ7BÖ&·3²&Wf–Ww2WFFRöâVæ6–ÂÆ–gBâ&ÆVæB6öFRò÷6—G’R÷Vç0§6VÆV7FVB6WGF–æw3²VF—BF†VÒæB6†V6²&÷röÖW6‚âf—6–&–Æ—G’6†V6²FövvÆW26VÆV7FV@§&÷rv—F‚öæR÷&–v–æÂVæFó²&6R–Ö×WF&ÆRâ6†V6²–ÖvRöÖ6²&÷w2Â&V÷&FW"WôF÷vâÀ¥VæFõ&VFòõ6fT÷VâæB&÷VæFVBÆVgBFö6²67&öÆÆ–ærôFöæRâFWf–6S“CrTäD”äs³“CbW6W ¥52&÷FV7FVBâvVæW&ÂFÆ2Vçw&&VÖ–ç2FVfW'&VB&V†–æB7W'&VçBT’&WVW7Bà  ¢22ã“C‚(	B6öÖÖ—GFVB6öÆ÷W"Æ–v‡F–æs²ã“CrW6W"52(	B#2ö7Fö&W"##b„'&—6&æR ¥W6W"&W÷'G2ã“Cr53¢&÷FV7Bf—7VÂÆ–W"6VÆV7F–öâ÷F‡VÖ&æ–Ç2Â&ÆVæBö÷6—G’ð§f—6–&–Æ—G’Â†—7F÷'’÷W'6—7FVæ6RæB&÷VæFVBÄTeBFö6²â6öçF–çVR&WVW7FVB&W—# ¦6öÆ÷W"ÖöæÇ’Ub–çBö–ÖvRôò6ö×÷6—FW2×W7B&V¦ö–â66VæRÆ–v‡F–ærgFW"–çBFöæRà¤VF—BÖ–âCv&SC3ƒ¢÷&–v–æÂ7&VFT6öÖÖ—GFVE–çE7W&f6RöæÇ’6VÆV7FVB7FæF&Bf÷ §fÆ–B&÷Vv†æW72öÖWFÆæW73²6öÆ÷W"ÖöæÇ’–çFVçF–öæÆÇ’7F–VB&6–2â7GVF–ò6†F÷rfÆw0§vW&RVWVVBgFW"ÖFW&–Â7&VF–öâæB6÷VÆB&R6÷–VBFöòV&Ç’âæòÖ—76–ærÆ–v‡BÀ¦æWr&VæFW&–ærVæv–æR÷"6V6öæBÖFW&–Â÷væW"—2&WV—&VBf÷"F†—27V6–f–2FVfV7Bà ¤÷&–v–æÂ6öÖÖ—GFVB7W&f6Ræ÷rÇv—26ÆÇ2—G2W†—7F–ær7FæF&BÖFW&–ÂF‚f÷ §fÆ–B6†ææVÇ2â6öÆ÷W"&VÖ–ç2W†7B5$t"Æ&VFòÂv†—FRf7F÷"ÂFVfVÇB&÷Vv†æW73ð¦ÖWFÆæW73²æò66Æ"Ö2÷&W6÷W&6W2–çfVçFVBâ7FÆR66Æ"—2öÖ—GFVC²7FÆR6öÆ÷W §7F–ÆÂ&VgW6W2â6ÖR÷&–v–æÂvVöÖWG'’õUböÆ–fWF–ÖRæB7–æ2–FVçF—G’wV&G2â7GVF–ð§6WG2÷&–v–æÂ&öG’67B÷&V6V—fRfÆw27–æ6‡&öæ÷W6Ç’&Vf÷&R7–æ27W&f6R7&VF–öâÀ§6ò&÷F‚7F—fRæB–æ7F—fRöÆö6¶VB–çB&WÆ6VÖVçG2–æ†W&—B6†F÷w2&Vv&FÆW72ö`¦F–vW7Bög&ÖR÷&FW"âW†—7F–ær7GVF–òÆ–v‡G2÷&–röfÆö÷"æB&VfÆV7F–öâööÂVæ6†ævVBà¥–çB6†ææVÂ&VÖ–ç2–çFVçF–öæÆÇ’VæÆ—Bv†–ÆRVF—F–æs²–çBÆ—B&Wf–WrVæ6†ævVBà¤W†—7F–ær6fVB6öÆ÷W"&ö¦V7G2v–âÆ—BF—7Æ’öâ&V÷Vâ÷&V'V–ÆBv—F†÷WBÖ–w&F–öâÀ§&W6÷W&6Rö†—7F÷'’÷—†VÂöW‡÷'B6†ævW2âæòæWrò&¶RÂvVæW&ÂFÆ2Vçw&÷"6Æ–Ð§F†BF†RöÆFW"6Öö÷F‚ÖÖWFÂ&VfÆV7F–öâ&W÷'B—2&W6öÇfVB'’F†—26öÆ÷W"ÖöæÇ’f—‚à ¤f÷W"æWr–çFVw&F–öç26÷fW#S"ó#BW†7B÷væVB5$t"—†VÇ2õUg2÷6†F÷rfÆw2öF—7÷6ÂÀ¦÷&–v–æÂ7GVF–ò7F—fR¶–æ7F—fRöÆö6¶VBF‚$Tdõ$RVWVVB&Vg&W6‚Â&V'V–ÆBöF–væ÷7F–0¦6ÆVçWÂ7GVÂ–çB6†ææVÎ(i$Föæ^(i&Æ—BæBW†7B6fRô÷Vâv—F†÷WBW‡G&†—7F÷'’À§7FÆR÷&WÆ6VBö&öG’ÖÆ÷727W&W76–öââ÷&–v–æÃ“#ó“#26öÆ÷W"ÖöæÇ’&6–276W'F–öç2æ÷p§&WV—&R&WVW7FVB7FæF&BfÆÆ&6²v†–ÆR&WF–æ–ærW†7B—†VÇ2æB'6VçB7FÆP§66Æ"Ö²Æ—fR6†ææVÂW‡V7FF–öç2&VÖ–â&6–2â÷&–v–æÃ“Bó“’6öÖÖ—GFVBF—7Æ¦6†V6·2&WF–âW†7B—†VÂWVÆ—G’æBæ÷r&WV—&R&—fFRÆ—BFW‡GW&R÷væW'6†—Â0¦Ç&VG’W6VBf÷"66Æ"ÖÆ—B7W&f6W2âæWr¶æV&'’–çBöÆ–W'2÷66Æ"ð§&VfÆV7F–öâ÷&VÆV6S352âgVÆÂ&Vw&W76–öâ÷V&Æ–6F–öâWf–FVæ6RföÆÆ÷w2à ¥&Wf–WvVBVçF—&R7W&f6^(i'–çFW"÷&VæFW"öW‡÷'N(i$Æ"&WfW'6RÆöFW"w&ƒ“C‚æB6†VÆÂð§&V6÷fW'’¶W—3²&VçBöW‡÷'BVF—G2&R66†R–ç2öæÇ’âÖ–ã“3ö6vRô×VÇF“ãög&÷¦VâÀ¦''W6†W2ö†—7F÷'’÷&ö¦V7BöW‡÷'BÆv÷&—F†×2Væ6†ævVBâ7GVÂuRö•B6†F÷w2æ@¦V&æ6R&VÖ–âDUd”4S“C‚vFRÂæ÷BW7F&Æ—6†VB'’æöFRÖFW&–Â÷FW‡GW&RFW7G2à ¤DUd”4S“Cƒ¢–çBUb7V&R–â6öÆ÷W"öæÇ’ÂFöæ^(i%7GVF–òÂ÷&&—Bf÷"6†FVBf6W3²F@¦æ÷F†W"ÖW6‚æB7v—F6‚6VÆV7F–öâÂ6†F÷w2öÆ–v‡F–ær&VÖ–âöâ&÷F‚â&V÷VâW†—7F–æp§–çFVBæ&÷†Æ#²6ö×&RÆ—BF—7Æ’æB–çBVæ6†ævVBâ–çB6†ææVÂ&VÖ–ç2fÆC°¤Æ—B&Wf–WrôFöæR&W7F÷&R66VæR6†F–ærâVæFõ&VFò&VÖ–ç2–â–çC²ã“CrÆ–W"Æ—7@§&VÖ–ç266WFVBâæW‡Bæ'&÷rv÷&²föÆÆ÷w3“C‚FWf–6RfVVF&6³²¶VW–æFWVæFVç@¦Ç†“#’÷&VfÆV7F–öâvFW2æBvVæW&ÂFÆ2Vçw&&WVW7Bf—6–&ÆRà  ¢ã“C‚f–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£"ÃsS52òd”Âò6¶—VB¢ ¢ƒ“rãw2’âf÷W"æWr6†V6·2ÇW2÷&–v–æÃ#sCb&WF–æVC²F&vWFVB–çBöÖFW&–ÂöÆ–W"ð¦GWÆ–6FR÷&ö¦V7B÷&VÆV6SS52â7WW'6VFVBVæÆ—B÷6†&–ærW‡V7FF–öç2–ã“#ó“#2æ@£“Bó“’vW&RWFFVBFò&WVW7FVBÆ—B÷&—fFR×FW‡GW&R&V†f–÷#²W†7B—†VÂÂ7FÆP¦6†ææVÂÂGWÆ–6FR—6öÆF–öâæBW'6—7FVæ6R76W'F–öç2&WF–æVBâ–æ—F–ÂW‡Æ÷&F÷'¦gVÆÂ'Vâ†—BF†÷6RöÆBW‡V7FF–öç3²F†—2d”äÂ6ö×ÆWFR'Vâ6Æ÷6W2ÆÂ&Vw&W76–öç2à¥&Wf–WvVBÆöFW"6Æ÷7W&S“Cƒ²Ö–ã“3ö6vRô×VÇF“ãög&÷¦VâVæ6†ævVBâ†÷7FVB&Vw&W76–öâÀ¥vW2æB÷7FFWÆ÷–ÖVçBÆ—fRÖf–ÆRfW&–f–6F–öâföÆÆ÷râFWf–6S“C‚Æ–v‡F–ærVæF–ærà  ¢22ã“C‚V&Æ–6F–öâfW&–f–VB(	B#2ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR#CS6f##&CC–3c“–C#ƒ#“c#FcFSCcÂW†7BFW7FVBG&VP¦fc“3v3–363#Sƒ&fSv63Fƒ6#V&6cfcC#“6#3&Â—2V&Æ—6†VBöâÖ–ââ6öææV7FV@¤v—BFFWÆöFVC#"W†7B&Æö'2æB7&VFVBF†R–FVçF–6ÂÆö6ÂG&VRâfWF6†VBÖ–à¦ÖF6†VBÂÆö6Â'&æ6‚Æ–væVB6ÆVæÇ’âÆö6ÂæöFS#BgVÆÂ&Vw&W76–öâæB†÷7FV@¤æöFS#"&Vw&W76–öã3““3C“3C“rö¦ö##3S#3“C#‚&÷F‚72¢£#sSFW7G2òf–ÇW&W2ð£6¶—VB¢£²6ö×ÆWFR†÷7FVBÆörF÷FÇ2fW&–f–VBƒ#C’ã—2’âvW33““3C“3s3r'V–Æ@£#3S#C#S’öFWÆ÷“#3S##3S#cB7V66VVFVBâÆÃ’6†V6¶VB÷7FFWÆ÷–ÖVçBf–ÆW0¢‡6†VÆÂ÷fW'6–öâÂ6ö×ÆWFR6†ævVB'VçF–ÖRôÆ"w&‚Â&V6÷fW'’Â&WF–æVC“CrÆ–W"Æ—7BÀ¦Ö–ã“3ö6vRô×VÇF“ãæBg&÷¦Vä&WFrÖ&¶W"’'—FRÖÖF6‚FW7FVB6÷W&6Râ&Wf–WvVB–ç3°¦æò&÷FV7FVBög&÷¦Vâ6†ævW2âF†—2&ööbWFFW2f÷W"6öçF–çV—G’f–ÆW2öæÇ’æB¶VW0§FW7FVB÷V&Æ—6†VB'VçF–ÖR'—FW2Væ6†ævVBâW6W#“Cu52—2&÷FV7FVBÂæ÷B–æfW'&VC“C‚à ¤'V–ÆC“C‚6ö×ÆWFRæB&VG’f÷"FWf–6RFW7F–æs¢6öÆ÷W"ÖöæÇ’–çFVBUb7V&R(i"FöæR(i ¥d”Ur7GVF–òÂ÷&&—Bf÷"6†FVBf6W2æB66VæR6†F÷w2âFBæ÷F†W"ÖW6‚÷7v—F6‚7F—fP§6VÆV7F–öã²–çFVB–æ7F—fRö&¦V7G2&VÖ–â66VæRÖÆ—Bâ&V÷VâW†—7F–ær–çFVBæ&÷†Æ"À¦6öæf—&ÒV&æ6RæB÷&–v–æÂ6öÆ÷W#²&V÷Vâ–çBf÷"6†ææVÂ‡VæÆ—B’ôÆ—BæB&WF–æV@£“CrÆ–W"Æ—7BÂVæFõ&VFòö6öçF–çVR–çF–ærâ7FæF&BÖFW&–Â÷6†F÷r–æ†W&—Fæ6Ræ@¦W†7B'—FW2fW&–f–VBWFöÖF–6ÆÇ“²&VÂuRö•B6†F÷röV&æ6R66WFæ6RVæF–ærà¤öÆFW"6Öö÷F‚ÖÖWFÂ&VfÆV7F–öâæBÇ†“#’vFW2&VÖ–â–æFWVæFVçC²vVæW&ÂFÆ0§Vçw&&VÖ–ç2gWGW&Rv÷&²…6²ÆÂ'&ævW2W†—7F–ær—6ÆæG2’âæòæWrÆ–v‡Bö''W6‚ð¦†—7F÷'’÷&ö¦V7BöW‡÷'BöÖöFVÆÆ–ær÷væW"÷"6÷W&6R—†VÂ÷66†VÖ6†ævW2à  ¢22ã“C’(	B&÷VæFVBf6RFÆ2Ug3²ã“C‚W6W"52(	B#2ö7Fö&W"##b„'&—6&æR ¥W6W"U$dT5B53“C‚&÷FV7G26öÖÖ—GFVB6öÆ÷W"ÖöæÇ’66VæRÆ–v‡F–ærõ7GVF–ò6†F÷w2À¦7F—fRö–æ7F—fRV&æ6RÂW†—7F–ær–çBöÆ–W'2ö†—7F÷'’÷W'6—7FVæ6RæB6†ææVÂôÆ—Bà¤æW‡BVF—FVBFVfW'&VBFÆ2&WVW7BâÖ–âSV&cCF#2†2&÷‚õÆæ"ô7–Æ–æFW"õ7†W&RõF÷'W2À¦FVç6—G’WVÆ—¦F–öâæB6²ÆÂÂ'WBæò¦ö–æVBÖ6†'BövVæW&ÂFÆ26öÇfW"â†FÆ0¦—2öæÇ’âVçW6VBF‡G&6RFWVæFVæ7’U$ÂâæòæWrW‡FW&æÂÆ–'&'’ö¶W&æVÂ–×÷'FVBà ¤ö&¦V7B(i"Ub(i"f6RFÆ2æ÷r7FvW2õ$”t”äÂ&÷‚F—&V7F–öæÂW"Öf6R&ö¦V7F–öâÀ¤õ$”t”äÂFVç6—G”Æ–÷WBv—F‚W‡Æ–6—BöæRÖ—6ÆæB×W"×öÇ–vöâÖVÖ&W'6†—ÂF†Vâõ$”t”äÀ§6¶VDÆ–÷WBâöæÇ’f–æÂ6÷&æW'26öÖÖ—BF‡&÷Vv‚6öÖÖ—DæF—fUUc¢öæRæF—fR6†V6·ö–çBÀ§&VBÖöæÇ’öÆB÷VW"–ÆöG2Âæò6÷W&6RvVöÖWG'’öf6RÖw&÷W6†ævW2â&WVB—2âW†7@¦æòÖ÷â÷&–v–æÂ&ö¦V7F–öç2õ6²öFVç6—G’ÖF‚æBFBWFöÖF–26†ö–6W2Væ6†ævVBà ¥F†—2—2d•%5B&÷VæFVBf6RFÆ3£(	3#‚Ææ"öÇ–vöç2Î(šC#²6÷&æW'2ÂöæR—6ÆæBW ¦f6RÂ6öÖÖöâfW&vRv÷&ÆBÖ&VFVç6—G’ÂW†—7F–ærã"F–ÆRÖ&v–ç2öv2öw&–B6¶–ærà¤—B7WG2WfW'’f6R&÷VæF'“²—BFöW2äõB¦ö–â6†'G2Â÷F–Ö—¦R6¶–ærÂWF†÷"6V×2À¦÷"–×ÆVÖVçB†FÆ2övVæW&Â7W'fVBVçw&âFöÖ–æçB×ÆæR&ö¦V7F–öâ&WF–ç2—G0¦W†—7F–æræwVÆ"F—7F÷'F–öã²WVÂFVç6—G’f—†W2fW&vR&VÂæ÷BævÆRF—7F÷'F–öâà¤–çfÆ–BöæöçÆæ"öFVvVæW&FRö÷fW"ÖÆ–Ö—BæB–×÷'FVB÷&ö6VGW&ÂöÖöF–f–W"F&vWG2&VgW6Rà¥F†—266÷R—2f—6–&ÆR&W6–FRF†R'WGFöâÂæ÷B†–FFVâ&V†–æBvVæW&–2Vçw&6Æ–Òà ¤ç’6öÆ÷W"÷&÷Vv†æW72öÖWFÆæW72–çB&VgW6W2$Tdõ$R7Fv–ærö†—7F÷'“²T’F—6&ÆW2f6P¦FÆ2v—F‚–çB&W6VçBæBö–çG2FòW‡Æ–6—BW†—7F–ær6ÆV"–çBò6ÆV"–çB°¥Ug2âæò6–ÆVçB–çBF—66&BÂ&W6×Æ–ær÷"7FÆR×&W6÷W&6R&V&–æBâW†—7F–ær7FÆRæF—fP¥Ug26â&R&WÆ6VBgFW"6ÆV&–ær–çBâVæFò&W7F÷&W2öÆBUg3²–çB&W6WB&VÖ–ç2§6W&FRVæFö&ÆRW6W"7F–öââæF—fR6öFV2Â÷&–v–æÂ–çBôÆ—Bõ6fT÷VâôäôÒôtÄ"÷væW'0¦†æFÆRVæ6†ævVBfW'6–öã6÷W&6S¦&÷†Æ"f6RÖ6÷&æW"–ÆöBâæò66†VÖ÷w&—FW"ö†—7F÷'¦÷"ÖöFVÆÆ–ær¶W&æVÂFFVC²æòWFöÖF–2FÆ2öâFBÂæòæWrUbö–çFW"õT’÷væW"à ¥6—‚æWr–çFVw&F–öç26÷fW"6öæ6fR÷F–ÇFVBöF—66öææV7FVB÷7V&F—f–FVBÆæ"f6W2À¦æöâÖ÷fW&Æ–ær6W&FR&÷VæG2öWVÂfW&vRFVç6—G’öW†7BvVöÖWG'’Ã#‚Öf6RÆ–Ö—Bð§66ÆR÷&VgW6Ç2Â&VÂ÷&–v–æÂVæFõ&VFòö–FV×÷FVæ6R÷VW"4õrÂW‡Æ–6—B–çB&VgW6Âð¦6ÆV"÷&W–çBÂ÷væW"ö†—7F÷'’FöÖ–2&VgW6ÂÂW†7BæF—fR&ö¦V7BôäôÒôtÄ"Ug2æ@¦7GVÂUbæVÂF&vWBö6öçFW‡B6ÆÆ&6²âæWr´&÷‚õ6²öFVç6—G’÷&W6WB÷&VÆV6S353°¦æòW†—7F–ær76W'F–öâ6†ævVBâgVÆÂ&Vw&W76–öâ÷V&Æ–6F–öâföÆÆ÷w3²•C“C’VæF–ærà ¥7W&f6RVF—Bf÷VæBÆ"6×ÆW2röÆC“BUb–×÷'B'6VçBg&öÒF†R&Wf–WvVB66†P¦Öæ–fW7BâFFVBF†B$TÂFWVæFVæ7’æB&Vg&W6†VB—G26×ÆW>(i$Æ.(i&–æFW‚æ6W7F÷'2À¦Æöæw6–FR÷&–v–æÂÖW6„†VÇF‚ôFBô×VÇF’Ub–×÷'Bw&ƒ“C’æB6†VÆÂ÷&V6÷fW'’¶W—2à¤öæÇ’UbÖW"²ÖW6„†VÇF‚gVæ7F–öæÆ—G’6†ævW3²÷F†W"6÷W&6R6†ævW2&R–ç2à¤Ö–ã“3ö6vRô×VÇF’×G&ç6f÷&Óãög&÷¦Vâó“C†Æ–v‡F–ær÷–çBöW‡÷'BÆv÷&—F†×2Væ6†ævVBà ¤DUd”4S“C“¢Æ–â7V&R÷"6ÖÆÂÆæ"Öf6VBW‡G'VFVBÖW6‚(i"ö&¦V7B(i"Ub(i"f6RFÆ0®(i"÷VâUbVF—F÷#¢6W&FRf6R—6ÆæG2–ç6–FRF–ÆRâVæFõ&VFò&W7F÷&W2÷&VÆ–W2Ug3°¥–çBôFöæR&WF–ç266WFVC“C‚Æ—B66VæRâW†—7F–ær–çC¢W‡Æ–6—FÇ’6ÆV"–çBf—'7BÀ§F†Vâf6RFÆ2÷&W–çBâ6fT÷VâæB÷F–öæÂäôÔB&WF–âæWrUg2÷–çBã#‚Ææ ¦f6W2Ö†–×VÓ²æöçÆæ"f6W2&WV—&R÷F†W"&ö¦V7F–öâ÷"gWGW&R6†'BVçw&à¤æW‡C£“C’FWf–6RfVVF&6²ÂF†Vâ66÷VBFÆ2ö6†'B–×&÷fVÖVçG2÷"VFvR6VÒWF†÷&–æp¦VF—BâvVæW&Â¦ö–æVBÖ6†'BVçw&&VÖ–ç2VWVVC²æòWFöÖF–2¶W&æVÂ&WÆ6VÖVçBà  ¢ã“C’f–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£"ÃsSb52òd”Âò6¶—VB¢ ¢ƒãw2’Â&WF–æ–ærWfW'’÷&–v–æÃ#sS6†V6²ÇW26—‚æWrf6RFÆ2–çFVw&F–öç2à¤æWr¶æV&'’&÷‚õ6²öFVç6—G’÷&W6WB÷&VÆV6S352âæòW†—7F–ær&V†f–÷"76W'F–öâ6†ævV@¦÷"&VÖ÷fVBâ&Wf–WvVBUbôFBô×VÇF’ôÆ"&WfW'6R–ç3“C’–æ6ÇVF–æræWvÇ’&V6÷&FVBÆ §6×ÆR–×÷'C²Ö–ã“3ö6vRô×VÇF’×G&ç6f÷&Óãög&÷¦Vâó“C†Æ–v‡F–ærVæ6†ævVBâ†÷7FV@§&Vw&W76–öâõvW2öÆ—fRV&Æ–6F–öâ&ööbföÆÆ÷w2âDUd”4S“C’&VÖ–ç2VæF–ærà  ¢22ã“C’V&Æ–6F–öâfW&–f–VB(	B#2ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR3C&cV#F6##ƒ##CcvC#VF3“c3#ƒC3CC“&ÂW†7BFW7FVBG&VP¦SvfCCcCS63S3c63csc“f#F3fS#fFSS3†#Â—2V&Æ—6†VBöâÖ–ââ6öææV7FV@¤v—BFFWÆöFVCRW†7B&Æö'2÷G&VS²fWF6†VBÖ–âÖF6†VBÂÆö6Â'&æ6‚Æ–væV@¦6ÆVæÇ’âÆö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3““3sc#SsRö¦ö##3cƒs#“"&÷F€§72¢£#sSbFW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FVBÆörF÷FÇ2fW&–f–V@¢ƒCRã2’âvW33““3sc3Sb'V–ÆC#3cƒsSS2öFWÆ÷“#3ccƒ#"7V66VVFVBâÆÃ# ¦6†V6¶VB÷7FFWÆ÷–ÖVçB6†VÆÂ÷fW'6–öâÂ6ö×ÆWFRUbôFBô×VÇF’ôÆ"w&‚Â&V6÷fW'’À§&WF–æVBUbv÷&·76Rö–ç7V7F÷"ó“C‚Æ—B÷væW'2öÖ–âö6vRô×VÇF’×G&ç6f÷&Óãó“CrÆ–W ¦Æ—7Bög&÷¦Vä&WFrÖ&¶W"'—FRÖÖF6‚FW7FVB6÷W&6RâæòW†—7F–ær76W'F–öç2&VÖ÷fVB÷ ¦6†ævVBâF†—2&ööbWFFW2f÷W"6öçF–çV—G’f–ÆW2öæÇ’Â&WF–æ–ærFW7FVB'VçF–ÖRà ¤'V–ÆC“C’6ö×ÆWFRæB&VG’f÷"FWf–6RFW7F–æs¢Æ–â7V&R÷"6ÖÆÂÆæ"Öf6V@¦W‡G'VFVBÖW6‚(i"ö&¦V7B(i"Ub(i"f6RFÆ2(i"÷VâUbVF—F÷"â6W&FRf6R—6ÆæG2À¥VæFõ&VFòÂ–çBôFöæR&WF–ç266WFVC“C‚Æ–v‡F–ærÂ6fT÷VâæB÷F–öæÂäôÔBà¤W†—7F–ær–çB×W7B&RW‡Æ–6—FÇ’6ÆV&VBf—'7C²7F–öâæWfW"F—66&G2—Bâf6RFÆ0¦—2öæR—6ÆæBW"Ææ"f6RÂWFó#‚f6W2ó#²6÷&æW'3²—B—2æ÷B¦ö–æVBÖ6†'B÷ ¦vVæW&Â7W'fVBVçw&âW†—7F–ær&÷‚õÆæ"ô7–Æ–æFW"õ7†W&RõF÷'W2õ6²öWFòÔFB&WF–à¦÷&–v–æÂÆv÷&—F†×2âDUd”4S“C’VæF–æs²W6W#“C‚U$dT5B52&÷FV7FVBâæW‡B7GVÀ£“C’fVVF&6²ÂF†Vâ66÷VBFÆ2ö6†'B÷6VÒF—&V7F–öââÇ†“#’÷&VfÆV7F–öâ–æFWVæFVçBà  ¢22ã“S(	Bf6RFÆ2v'VBÖf6R&W—#²ã“C’FWf–6Rd”Â(	B#2ö7Fö&W"##b„'&—6&æR ¥W6W#“C’&W÷'G2F†RWVÆ—¦RÖFVç6—G’Ææ"öæöâÖFVvVæW&FRW'&÷"gFW"÷&F–æ'¦W‡G'W6–öç2÷66ÆW2â67&VVç6†÷B6öæf—&×3“C’æC#GfW'G2ó#f6W2Âf"&VÆ÷s#‚Öf6R6à¤W†7B7WÆ–VBW‡G'VFRæB66ÆRæö&¢&W&öGV6W2&V¦V7F–öã¢f—'7Bf÷W"öÇ–vöç2&P¦Ö–ÆFÇ’v'VB‡ö–çB×Fò×ÆæRFWf–F–öç>(˜‚ã(	2ã2Æö6ÂVæ—G2’âF†—2—3“C’w2FÆ0§Ææ&—G’&W7G&–7F–öâÂæ÷BWf–FVæ6RöbFÖvVBÖöFVÆÆ–ærF÷öÆöw’÷"7FÆR'V–ÆBà¤ô$¢W‡÷'FW"†VFW#ƒ“"—2F†R&WF–æVB–çFW&æÂw&—FW"7F×Âæ÷B6†VÆÂ&VÆV6Rà¤W†7B–çWB&WF–æVB2FW7G2öf—‡GW&W2öW‡G'VFRÖæB×66ÆRÓ“Sæö&£²4„#S`£ss†CS#Sc3“&fSƒc#FCƒƒCcc36#FSvVCƒscvVFSC3†3“#s&#CfBÂ–FVçF–6ÂFòWÆöBà ¤÷&–v–æÂf6RFÆ2f—'7BG&–W2U„5C“C’Ææ"F‚âöæÇ’—G2Ææ"ö&V&VgW6À§&WVW7G2F†Rõ$”t”äÂ'V–ÆEUe&Wf–WtvVöÖWG'’‡¶f6T–æF–6W3§G'VWÒ’÷væW"Âf÷'v&FV@¦W‡Æ–6—FÇ’'’ÖW6„†VÇF‚Ub6ÆÆ&6²â÷&–v–æÂG&–ævÆ^(i&f6R÷fW'FW‚ÖWFFF&V6öÖW0§G&ç6–VçBÆö6ÂÖ6÷&æW"Æ—7G3²æòG&–æwVÆF÷"ÂæWrF¦6Væ7’÷"ÖW6‚×WFF–öââ&WV—&P¦6ö×ÆWFRî(‰#"G&–ævÆW2W"öÇ–vöâÂfÆ–BVæ—VR6÷&æW"÷væW'6†—Âf–æ—FRæöç¦W&òU`§G&–ævÆR&V2æB6öç6—7FVçBW"Öf6RUb÷&–VçFF–öââföÆFVBö6öÆÆ6VB6æF–FFW0§&VgW6Rv—F‚f6RçVÖ&W#²'6VçBöf–ÆVB&Wf–Wr&VgW6W2âFV×÷&'’vVöÖWG'’F—7÷6W0¦–âf–æÆÇ’öâ7V66W72öW'&÷"â6ÖR÷&–v–æÂFVç6—G’ÖF‚÷F–öæÆÇ’7V×2ÖV7W&V@¦æ÷&ÖÆ—¦VB4BG&–ævÆR&V3²7FæFÆöæRWVÆ—¦RFVç6—G’$UD”å27G&–7BÆæ"'VÆRà¤÷&–v–æÂÆæ"÷WGWG2öW‡G&VÖR66ÆW2&VÖ–âW†7C²æò&Ææ¶WBFöÆW&æ6R&VÆ†F–öâà ¤f–æÂFÆ27F–ÆÂW6W2÷&–v–æÂ6²ö6öÖÖ—BÂöæR—6ÆæBW"6÷W&6Rf6RæBöæR66VæP¦6†V6·ö–çC²6÷W&6RVG2öævöç2÷÷6—F–öç2öw&÷W2æBöÆB÷VW"&W6÷W&6W2&VÖ–â–çF7Bà¤æòW&ÖæVçBG&–æwVÆF–öâ÷"66†VÖöW‡÷'Bö†—7F÷'’ö''W6‚öÆ–v‡F–ær6†ævW2â÷&–v–æÀ£#†f6W2ó#¶6÷&æW"÷ööÂö†—7F÷'’ö6ÆV"×–çBwV&G2&WF–æVBâT’æòÆöævW"6ÆÇ2FÆ0§Ææ"ÖöæÇ“²6—27W'fVBf6W2Ö’7G&WF6‚âF†—2—27F–ÆÂ&ö¦V7FVBW"Öf6RFÆ2À¦æ÷B¦ö–æVBÖ6†'BövVæW&ÂUb÷F–Ö—¦F–öâ÷"wV&çFVRWfW'’föÆFVBf6RÖ2à ¤f—fRæWr–çFVw&F–öç2W†W&6—6RW†7BW6W"f–ÆRv—Fƒ#6W&FVBWVÂÖFVç6—G’—6ÆæG2À§Væ6†ævVC#BfW'F–6W2óGVG2ófævöç2ÂFV×÷&'’F—7÷6ÂæBW†7B&WVC²÷&F–æ'¦W‡G'W6–öâ¶†—2×66ÆR&W&öGV6W"Bãóó²÷&–v–æÂVæFõ&VFòõ–çBöW†7B6fT÷Vâð¦7GVÂäôÒæBtÄ"Ub·–çB6Æ÷G3²Væf–Æ&ÆRöÖÆf÷&ÖVBöföÆFVB&Wf–Wr÷&VgW6VB†—7F÷'’ð§–çBFöÖ–6—G“²7GVÂæVÂf÷'v&F–ær÷F&vWBwV&G2â÷&–v–æÃ“C’æVvF—fRVæf–Æ&ÆP§v'VB×&Wf–WrFW7B&WF–æVC²—G2T’v÷&F–ærW‡V7FF–öâföÆÆ÷w2–çFVæFVB66÷R6†ævRà¤÷&–v–æÃƒ“R7FæFÆöæRæöçÆæ"&VgW6Â7F—27F—fRâfö7W6VBæWró“C’öFVç6—G’õ6²ð§&VÆV6S#e53²gVÆÂfÆ–FF–öâ÷V&Æ–6F–öâföÆÆ÷w2âæF—fRFW7B&W&W2F‡&÷Vv‚5ETÀ§w&—FW"w2fW'6–öæVB–çBÖW‡÷'B÷væW"†ÖöGVÆRÖÆö6ÂvV´Ö2“²6æöæ–6Â¥4ôâ†æFÆW0¦7&÷72×&VÆÒUb&÷F÷G—W2v—F†÷WBvV¶Væ–ærW†7BfÇVW2â&—FÖ6†–Ò—2G&ç7÷'@¦öæÇ’Âæ÷BuRôæöÖBf—7VÂ&ööbâÖ–âö6vRô×VÇF’×G&ç6f÷&Òög&÷¦Vâ'—FW2Væ6†ævVBà ¤DUd”4S“S¢4ÔR7WÆ–VBÖöFVÂ(i"ö&¦V7B(i"Ub(i"f6RFÆ2(i"÷VâUbVF—F÷"6†÷VÆ@¦ÖÆÃ#f6W2âVæFõ&VFò&W7F÷&W2÷&VÆ–W2÷&–v–æÂVG2õUg3²–çBôFöæR&VÖ–ç0§66VæRÖÆ—C²6fT÷VâæB÷F–öæÂäôÔB6æ—G’â6ÆV"W†—7F–ær–çBW‡Æ–6—FÇ’f—'7Bà¤W†7BWÆöFVBÖW6‚æ÷rÖ2–âWFöÖFVB&VÂÖ÷væW"Fƒ²7GVÂ•C“SvFRVæF–ærÀ¦æ÷B–æfW'&VB52ã“C‚66VæRÖÆ–v‡F–ær66WFæ6R&VÖ–ç2&÷FV7FVC³“C’v'VBf–ÇW&P§&V6÷&FVBâæW‡B7GVÃ“S&WFW7C²FöâwB6²W6W"FòW&ÖæVçFÇ’G&–æwVÆFRfÆ–B&÷€¦ÖöFVÂ2v÷&¶&÷VæB÷"FB6V6öæBÖöFVÆÆ–ærõUb¶W&æVÂâ÷F†W"6†'B÷6VÒv÷&²VWVVBà  ¢ã“Sf–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£"Ãsc52òd”Âò6¶—VB¢ ¢ƒã—2’Â&WF–æ–ær÷&–v–æÃ#sSbÇW2f—fRæWrW†7BÖf–ÆR÷v'VBÖf6R–çFVw&F–öç2à¤fö7W6VBæWró“C’öFVç6—G’õ6²÷&VÆV6S#e52âöÆC“C’Væf–Æ&ÆR×&Wf–WröFVvVæW&7§&VgW6Ç2&VÖ–ã²—G2T’FW‡BW‡V7FF–öâ&VfÆV7G2æWr66÷Râ7FæFÆöæRFVç6—G“ƒ“P§Ææ&—G’6öçG&7BVæ6†ævVBâ7WÆ–VBô$¢f—‡GW&R'—FRÖ–FVçF–6Ã²æò6÷W&6RWÆö@¦ÖöF–f–VBâ&Wf–WvVBgVÆÂUbôFBô×VÇF’ôÆ"÷&V6÷fW'““Sw&‚ÂÖ–âö6vRô×VÇF’×G&ç6f÷&Òð¦g&÷¦Vâö66WFVC“C†Æ–v‡F–ærVæ6†ævVBâ†÷7FVBõvW2öÆ—fR&ööbföÆÆ÷w3²FWf–6S“S ¥4ÔRÖÖöFVÂFÆ2÷–çBõVæFõ&VFòõ6fT÷Vâ66WFæ6RVæF–ærÂæó“C’52–æfW'&VBà  ¢22ã“SV&Æ–6F–öâfW&–f–VB(	B#2ö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRF3f3cSSs#vcƒc“6scCƒvVFSC#VS&&CÂW†7BFW7FVBG&VP¦Cs3sƒs“CsSV36ccCv#C&C&c“6CFScVVFÂ—2V&Æ—6†VBöâÖ–ââ6öææV7FV@¤v—BFFWÆöFVCrW†7B&Æö'2÷G&VS²fWF6†VBÖ–âÖF6†VBæBÆö6Â'&æ6‚Æ–væV@¦6ÆVæÇ’âÆö6ÂæöFS#BæB†÷7FVBæöFS#"&Vw&W76–öã3““C#sS“cSbö¦ö##3ss“Sc“ƒ’&÷F€§72¢£#scFW7G2òf–ÇW&W2ò6¶—VB¢£²6ö×ÆWFR†÷7FVBÆörF÷FÇ2fW&–f–V@¢ƒ#Crã'2’âvW33““C#sS“CSb'V–ÆC#3ss“c"öFWÆ÷“#3sƒSƒƒƒR7V66VVFVBâÆÃ# ¦6†V6¶VB÷7FFWÆ÷–ÖVçB6†VÆÂ÷fW'6–öâÂ6ö×ÆWFRUbôFBô×VÇF’ôÆ"w&‚Â&V6÷fW'’À§&WF–æVBUbv÷&·76Rö–ç7V7F÷"ó“C‚Æ—B÷væW'2öÖ–âö6vRô×VÇF’×G&ç6f÷&Óãó“CrÆ–W ¦Æ—7Bög&÷¦Vä&WFrÖ&¶W"'—FRÖÖF6‚FW7FVB6÷W&6Râ÷&–v–æÃƒ“RÆæ"ÖFVç6—G’wV&@§&WF–æVC³“C’T’v÷&F–ærWFFVBf÷"–çFVæFVBv'VBÖf6R7W÷'BâF†—2&ööb6†ævW0¦f÷W"6öçF–çV—G’f–ÆW2öæÇ’Â&WF–æ–ærFW7FVB'VçF–ÖRâ÷&–v–æÂ7WÆ–VBô$¢Væ6†ævVBà ¤'V–ÆC“S6ö×ÆWFRæB&VG“¢4ÔRW‡G'W6–öâ÷66ÆRÖW6‚(i"ö&¦V7B(i"Ub(i"f6RFÆ2(i ¤÷VâUbVF—F÷"6†÷VÆBÖÆÃ#f6W2â÷&–v–æÂVG2öævöç2&VÖ–ã²VæFõ&VFò&W7F÷&W0¥Ug2Â–çBôFöæR&WF–ç3“C‚Æ–v‡F–ærÂ6fT÷VâæB÷F–öæÂäôÔB6æ—G’âW†7B7WÆ–V@¦f–ÆRæ÷r76W2&VÂÖ÷væW"FÆ2÷–çBö†—7F÷'’÷G&ç7÷'B–çFVw&F–öç2Â'WB•C“S ¦V&æ6R÷W&f÷&Öæ6R66WFæ6R&VÖ–ç2VæF–ærâ6ÆV"W†—7F–ær–çBW‡Æ–6—FÇ¦f—'7Bâ6÷W&6S“C’f–ÇW&R&V6÷&FVBÂæ÷B66WFVB253²W6W#“C‚U$dT5B52&÷FV7FVBà¤æW‡B7GVÃ“SfVVF&6²&Vf÷&RVç&VÆFVBfVGW&W3²æòW&ÖæVçBG&–æwVÆF–öâv÷&¶&÷VæBà  ¢22ã“S(	B÷F–öæÂ6÷Ææ"FÆ3²ã“SW6W"52&÷FV7FVB(	B#2ö7Fö&W"##` ¥W6W"&WÆ–W252öæW‡F'V–ÆBgFW#“S¢&÷FV7BF†R7WÆ–VBW‡G'W6–öâ÷66ÆRf6RFÆ0§&W—"æBW†—7F–æs“C‚Æ—B×–çB66WFæ6Rã“C’÷&–v–æÂv'VBf–ÇW&R7F—2&V6÷&FVBà¤VF—C¢W†—7F–ær&÷‚&ö¦V7F–öâÇ&VG’v—fW2ÖF6†–ærUg2öâF¦6VçB6ÖRÖF—&V7F–öà¦f6W3²÷&–v–æÂ–×÷'FVB×WbÖ–ç7V7F–öâ÷vç2Öæ–föÆBF¦6Væ7’÷Væ–öã²FVç6—G’õ6²æ@¦æF—fRUb6öÖÖ—Bö†—7F÷'’Ç&VG’W†—7Bâæò÷F†W"Æ—fR6†'BÖ¦ö–æ–ærFÆ2f÷VæC²F†P§F‡G&6W"†FÆ2FWVæFVæ7’—2Vç&VÆFVBâFB÷F–öæÂö&¦V7B(i"Ub(i"6÷Ææ"FÆ2à ¤&÷F‚ÖöFW26†&R÷&–v–æÂ&—fFR&÷‚(i"FVç6—G’(i"w&–B6²(i"ôäR6öÖÖ—B—VÆ–æRà¤f6RFÆ2&WF–ç2öæR—6ÆæBW"f6RæBW†7C“S÷WGWG2â6÷Ææ"ÖöFRW6W2f—†V@§6VVBÆæW2†æ÷&ÖÆ—¦VBf–æ—FR6ö÷&F–æFW2Â÷&–VçFVBæ÷&ÖÂ÷Ææ&—G’FöÆW&æ6SRÓÀ¦æò67V×VÆFVBæV–v†&÷W"G&–gB’ÂÆVf–ærv'VBf6W2—6öÆFVBâ÷&–v–æÂ–ç7V7F÷ ¦vWG2÷BÖ–â6ä¦ö–äf6W2&VF–6FS²FVfVÇB&V†f–÷"Væ6†ævVBâ¦ö–âöæÇ’÷÷6—FP§6†&VBVFvRF—&V7F–öç2ÂÖF6†–ær&÷‚UbVæGö–çG2Â6ÖR6VVBÆæRæBW†7FÇ’Gvð¦Öæ–föÆB÷væW'2âF—66öææV7FVBö6ö–æ6–FVçBfW'FW‚÷6—F–öç2æBÖ&–wV÷W2VFvW2æWfW ¦¦ö–ââæòÖW6‚VF—G2ÂæWrG&–æwVÆF÷"öF¦6Væ7’¶W&æVÂÂW'6—7FVçB6†'BÖWFFF÷ ¥Ub66†VÖâ÷&–v–æÃ“S&Wf–WrfÆÆ&6²†æFÆW2v'VB&V²7FæFÆöæRFVç6—G“ƒ“P§7F–ÆÂÆæ"ã#‚Öf6Ró#²Ö6÷&æW"Æ–Ö—BæBW‡Æ–6—B6ÆV"ÖÆÂ×–çB&W&WV—6—FR7F’à¥F†—2—26öç6W'fF—fR6÷Ææ"w&÷W–ærÂæ÷B&&—G&'’Vçw&÷"÷F–ÖÂ6¶–æs°¦–çfÆ–B6VÆbÖ÷fW&Æ–ærvVöÖWG'’æBvVæW&Â7W'fVB7G&WF6‚&Ræ÷B6öÇfVBà ¥6—‚æWrFW7G3“S6÷fW"6öææV7FVBF6‚÷6VÒVæGö–çG2ö—6ÆæBVF—F–æs²&VæG2÷v'2ð§6ÖR×v–æF–ærGWÆ–6FW2ö÷÷6—FRf6W2öF—66öææV7FVB÷6—F–öç2öæöæÖæ–föÆB&÷VæF&–W3°¦W†7B7WÆ–VC#Öf6Rô$¢ƒB—6ÆæG2fW'7W2f6RFÆ3#’Â66ÆR÷G&ç6ÆF–öâæBWVÂfW&vR—6ÆæBFVç6—G’÷6W&FP§6¶VB&÷VæG3²wV&G2÷&VgW6VB†—7F÷'“²7GVÂVæFõ&VFò÷–çB÷&ö¦V7BôtÄ"÷væW"Fƒ°¦7GVÂæVÂf÷'v&F–ærö7W'&VçB×F&vWBö†—7F÷'’wV&G2âfö7W6VBæWró“C’ó“SöFVç6—G’ð¥6²÷&VÆV6S3%52âgVÆÂÆö6Âö†÷7FVBæBV&Æ–6F–öâWf–FVæ6RföÆÆ÷w2&VÆ÷rà ¥&Wf–WvVB66†R6Æ÷7W&R&Vg&W6†W2Ub–ç7V7F÷"öVF—B÷æVÂÂUbv÷&·76RÂ–çB–×÷'@¦æ6W7F÷'2æBUbôFBô×VÇF’ôÆ"ÆöFW'3²gVæ7F–öæÂ6†ævW2ôäÅ’–ç7V7F÷"÷BÖ–âÀ¦FÆ2÷væW"æBW†—7F–æræVÂâÖ–âö6vRô×VÇF’×G&ç6f÷&Óãög&÷¦Vâ'—FW2Væ6†ævVBà¤FWf–6S“S&VÖ–ç2VæF–æs¢6ÖRVç–çFVB7WÆ–VBÖW6‚(i"6÷Ææ"FÆ2(i"UbVF—F÷#°¦6ö×&Rf6RFÆ2w3#—6ÆæG3²VæFõ&VFòÂ–çB7&÷72fÆBF6‚æB6fT÷Vâà¤æW‡B7Böã“SfVVF&6³²Ç†“#’öÖWFÂ×&VfÆV7F–öâvFW2&VÖ–â–æFWVæFVçBâFòæ÷@¦–æfW"vVæW&Â7W'fVBVçw&Â&&—G&'’÷fW&Æ&W—"÷"÷F–öæÂäôÔBFWf–6R52à  ¢ã“SgVÆÂÆö6ÂæöFS#B&Vw&W76–öã¢¢£#scr52òd”Âò6¶—VB¢¢ƒ“’ã2’À§&WF–æ–ærÆÃ#scÇW26—‚6÷Ææ"–çFVw&F–öç2âfö7W6VC3%52â&Wf–WvVC’Öf–ÆP§'VçF–ÖRÆöFW"6Æ÷7W&RÂF‡&VRgVæ7F–öæÂ÷væW'2öæÇ“²&WF–æVBÖ–âö6vRô×VÇF“ãð¦g&÷¦Vâ'—FW2æB&V6÷fW'’÷væW'2Væ6†ævVBâ6÷W&6S“C’ó“Sf6RFÆ2÷WGWG2æ@§7FæFÆöæSƒ“RFVç6—G’wV&G27F’&÷FV7FVBâ†÷7FVBõvW2öÆ—fR&ööbföÆÆ÷w3°¤DUd”4S“S6ö×&—6öâ÷–çBõVæFõ&VFòõ6fT÷Vâ&VÖ–ç2VæF–ærà  ¢22ã“SV&Æ–6F–öâfW&–f–VB(	B#2ö7Fö&W"##` ¥'VçF–ÖRc6cF3c“ƒcsSfCcVF3ccƒ&#†3sfc3cƒ3FC3VVÂW†7BFW7FVBG&VP¦f3CSfcC3vC–F6##vcCc&6FS–#36FÂ—2V&Æ—6†VBöâÖ–ââÆÃ#bWÆöFV@¦&Æö'2æBv—BFFG&VRÖF6†VBÆö6Â†6†W3²fWF6†VBÖ–âÖF6†VBæB6†V6¶÷WB6ÆVâà¤Æö6ÂæöFS#BgVÆÂ&Vw&W76–öã#scu52ód”Âó6¶—VBƒ“’ã2“²†÷7FVBæöFS#"'Và£3““S#““ƒ#bö¦ö##CƒCƒƒr6ö×ÆWFRÆörfW&–f–W26ÖS#scróóƒ“‚ã2’à¥vW33““S#““Cc"'V–ÆC#CƒS2öFWÆ÷“#C““cSR7V66VVFVBâÆÃ#’÷7FFWÆ÷–ÖVç@§6†VÆÂ÷fW'6–öâÂ6ö×ÆWFR&Wf–WvVBUbôFBô×VÇF’ôÆ"÷–çBÆöFW"w&‚Â&V6÷fW'’À§&WF–æVC“C†Æ—BöÖ–âö6vRô×VÇF’×G&ç6f÷&Óãó“CvÆ–W'2ög&÷¦Vä&WFrÖ&¶W"'—FRÖÖF6‚à¥&ööb6öÖÖ—BWFFW2f÷W"6öçF–çV—G’f–ÆW2öæÇ“²FW7FVB'VçF–ÖR&WF–æVBà ¥W6W#“S52—2&V6÷&FVB÷&÷FV7FVBâ'V–ÆC“S6ö×ÆWFR÷&VG’f÷"FWf–6RFW7F–æs §6ÖRVç–çFVBW‡G'W6–öâ÷66ÆRÖW6‚(i"ö&¦V7B(i"Ub(i"6÷Ææ"FÆ2(i"÷VâUbVF—F÷"à¤W†7Bf—‡GW&RWFöÖF–6ÆÇ’v—fW3B—6ÆæG2fW'7W2f6RFÆ3#Âf÷W"v'VBf6W0§7F’—6öÆFVBæBÆÂ÷&–v–æÃ#BfW'F–6W2ó#VG2öævöç2Væ6†ævVBâ6ö×&R6†'G2À¥VæFõ&VFòÂ–çB7&÷726öææV7FVBfÆBf6W2æB6fT÷Vââ6ÆV"W†—7F–ær–ç@¦W‡Æ–6—FÇ’f—'7BâDUd”4S“SV&æ6R÷W&f÷&Öæ6R&VÖ–ç2VæF–ærâæW‡BföÆÆ÷s“S¦fVVF&6²&Vf÷&R'&öFW"Vçw&÷6VÒFööÆ–æs²¶VW÷&–v–æÂ÷væW'2æB&÷FV7FV@¦ÖöFVÆÆ–æröæf–vF–öâöÆ–v‡F–ærög&÷¦Vâ&V†f–÷"âæòvVæW&Â7W'fVBVçw&6Æ–Òà  ¢22ã“S"(	BUbVF—F÷"Æ–W"öVçG'’†&FVæ–æs²ã“SFÆ252&÷FV7FVB(	B#2ö7Fö&W"##` ¥W6W#“S52öæW‡F'V–ÆBÂv—F‚6W&FR–çFW&Ö—GFVçB•B&òT’ÖÆ÷72&W÷'Bâ7WÆ–V@§67&VVç6†÷B6öæf—&×3“S¢v÷&·76R&–v‡B6V7F–öâ–æ6ÇVF–ær&6²Fó4BæBÖ–âFööÆ& ¦'WGFöç2Ö—76–ærÂv†–ÆRUbF–ÆR&VÖ–ç2G&vââFòäõBG&VBFÆ266WFæ6R2T’ÖÆ÷70¦66WFæ6R÷"F—6Ö—72—B&V6W6RæöFRFW7G272â÷&–v–æÃ“#BFööÆ&"f—‚v266WFV@¦'WBF†—2—2&V7W'&Væ6Rv—F‚67&VVç6†÷BWf–FVæ6S²&÷FV7B—G2†VFW"Ö&÷fR×f–Ww÷'@¦–çFVçBâW†7B–çFW&Ö—GFVçB•BõvV$¶—B6ö×÷6—F÷"f–ÇW&R—2äõB&W&öGV6VB†W&Rà ¤VF—C¢æò7F–öâ–çFVçF–öæÆÇ’†–FW2Ö–âFööÆ&#²v÷&·76Rv2Æ&vR'6öÇWFP¦6çf2÷fW&Æ’–ç6–FRvV$tÂf–Ww÷'BÆöæw6–FR&6¶G&÷öf–ÇFW"fÆöF–æræVÇ2à¤öæÇ’õ$”t”äÂWb×v÷&·76R6†ævW3¢Ö÷VçB—G2öæRW†—7F–ær6V7F–öâ&W6–FRf–Ww÷'@§VæFW"6ÂW6Rf—†VBf–Ww÷'B–ç6WG2æB†VFW"†V–v‡Bf&–&ÆRv—F‚£’&VÆ÷r†VFW#°¦7F—fRÖöæÇ’f–Ww÷'B—6öÆF–öâ&WF–æVBf–WFFVB6–&Æ–ærÖ†÷7B6VÆV7F÷"†öÆBæW7FV@¦fÆÆ&6²&WF–æVBf÷"VÖ&VFFVB÷FW7B†÷7B’â—6öÆFR÷–çBÖ6öçF–â6çf2&V²¶VW—G0¦÷&–v–æÂ6çf2Â6öçG&öÇ2ÂÆ—7FVæW'2æBÖW6„†VÇF‚6öçFW‡B÷6W76–öâö†—7F÷'’6ÆÆ&6·2à¤&6²Fó4BÖ÷fW2&W6–FRF—FÆS²w&–ær6öçG&öÇ2Fòæ÷B6‡&–æ²÷WBöb6†÷'Bf–Ww÷'BÀ§v÷&·76R67&öÆÇ2v†VâæVVFVBâæòf÷&6RÔuRG&ç6f÷&×2Â¢Ö–æFW‚W66ÆF–öâÂGWÆ–6FP¥T’ÂÖöFVÆÆ–ærõUb÷–çBö†—7F÷'’öæf–vF–öâ¶W&æVÇ2÷"6†ævW2Fò÷&–v–æÂ†VFW"÷væW"à ¤÷VâÖV7W&W2–ÖÖVF–FVÇ’æBv–âöæ6RöâæW‡Bæ–ÖF–öâg&ÖRgFW"ÆVæ6‚†–FW0§6÷W&6RæVÂâÆ—7FVâFòf—7VÅf–Ww÷'B&W6—¦R2vVÆÂ2v–æF÷rõ&W6—¦Tö'6W'fW"à¤6Æ÷6R6æ6VÇ2VWVVBg&ÖRæB&VÖ÷fW2&÷F‚&W6—¦RÆ—7FVæW'3²W†—7F–ær6GW&RövW7GW&Rð¦–ÖvR6æ6VÆÆF–öâVæ6†ævVBâF‡&VRæWr&öGV7F–öâÖ÷væW"FW7G3¢&VÂö†VFW"ð§f–Ww÷'B6–&Æ–æw2æBGvVÇfR÷Vâö6Æ÷6R7–6ÆW2W6–ær6ÖRæöFW2ö7F–öç3²FVfW'&VBæ@§f—7VÂ&W6—¦R—†VÂ6—¦–ærö†—7F÷'’æWWG&Æ—G’öÆFRg&ÖRö6ÆVçW²552†VFW"÷&FW&–ærÀ¦6çf26öçF–æÖVçBÂ&÷VæFVB÷fW&fÆ÷ræB6–ævÆRÆVgB×6–FRW†—Bâ÷&–v–æÂFW7G2&WF–æVBà¤6Æ÷VB'&÷w6W#“SÖ–âf–Ç2vV$tÂ6öçFW‡B7&VF–öâÂ6òæògVÆÂ&VæFW&VB÷"6f&’ö•@§&W&öGV7F–öâ6Æ–ÖVBâ&W—"FG&W76W2Æ–W"F÷öÆöw’æBVçG'’6—¦–æs²•B&WFW7B—0§&WV—&VB&Vf÷&R66WF–ær–çFW&Ö—GFVçBF—6V&æ6R2f—†VBà ¥&Wf–WvVB66†R6Æ÷7W&RôäÅ’v÷&·76R(i"ÖW6„†VÇF‚(i"6†VÆÂÇW2&V6÷fW'’ÆöFW"¶W—3°¦–çFW&æÂfW'6–öâ7F×2æBVç&VÆFVC“SUb÷–çBÆöFW"–ç2&VÖ–ââFÆ3“Só“SÀ§–çC“C‚ÂÖ–ã“3Â6vS“3Â×VÇF’×G&ç6f÷&ÓãæBg&÷¦Vâ6æ6†÷G2Væ6†ævVBà¤DUd”4S“S#¢&WVFVFÇ’÷Vâô&6²Fó4Böâ•E&òÂfW&–g’gVÆÂVF—F÷"æBÖ–âF÷×&–v‡@¦'WGFöç2õd”Us²â÷–æ6‚õVæ6–Â—6ÆæBVF—BæBVæFõ&VFó²&WGW&âFó4BF†Vâ&V÷Vâà¤æW‡BföÆÆ÷s“S"T’fVVF&6²&Vf÷&RgW'F†W"Vçw&v÷&³²&V6÷&BW†7B&WVBG&–vvW"–`¦Æ÷72W'6—7G2â÷F†W"Ç†“#’öÖWFÂ&VfÆV7F–öâvFW2&VÖ–â–æFWVæFVçBà  ¢ã“S"Æö6ÂæöFS#BgVÆÂ&Vw&W76–öã¢¢£#ss52òd”Âò6¶—VB¢¢ƒ“rãW2’À¦ÆÃ#scr&WF–æVBÇW2F‡&VRv÷&·76RÆ–W"öVçG'’Æ–fV7–6ÆRFW7G2âfö7W6VBUbö†—7F÷'’ð¥Væ6–Âö—6ÆæBö–ÖvR×&VfW&Væ6Rõ6²öFVç6—G’÷&VÆV6SS552âæò76W'F–öç2&VÆ†VB÷"öÆ@¦6†V6·2FVÆWFVBâgVæ7F–öæÂ6†ævW2öæÇ’Wb×v÷&·76S²ÖW6„†VÇF‚–×÷'B²&Wf–WvV@§6†VÆÂ÷&V6÷fW'’66†R¶W—3“S"âÖ–âö6vRô×VÇF’×G&ç6f÷&ÓãæBg&÷¦Vâ'—FW2Væ6†ævVBà¤†÷7FVBõvW2öÆ—fRV&Æ–6F–öâWf–FVæ6RföÆÆ÷w2âDUd”4S“S"–çFW&Ö—GFVçB•BT’ÖÆ÷70§&WFW7B&VÖ–ç2VæF–æs²æòW†7B'&÷w6W"ôuR&W&öGV7F–öâ÷"FWf–6Rf—‚526Æ–ÖVBà  ¢22ã“S"V&Æ–6F–öâfW&–f–VB(	B#Bö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRV#“V6†#6C&#†ffFS†SvV33ƒsC“#3“C6FÂFW7FVBG&VP¦VSS–S“ƒ““F3F&6&3Fc3ƒ#–CCƒ“3†C33VÂV&Æ—6†VBöâÖ–ââFVâWÆöFV@¦&Æö'2÷G&VRÖF6†VBÆö6Â†6†W3²fWF6†VBÖ–âÖF6†VBæB6†V6¶÷WB6ÆVââÆö6À¤æöFS#B&Vw&W76–öã#ss52ód”Âó6¶—VBƒ“rãW2“²†÷7FVBæöFS#"'Vã3““SSs3rð¦¦ö##C#“#cR6ö×ÆWFRÆöw2fW&–g“#ssóóƒ#C‚ãg2’âvW33““SSs#S3B'V–Æ@£#C#“#S“#öFWÆ÷“#C#csƒ’7V66VVFVBâÆÃ#’÷7FFWÆ÷–ÖVçB6†V6¶VB6†VÆÂ÷fW'6–öâÀ§v÷&·76RôÖW6„†VÇF‚õUbôFBô×VÇF’ôÆ"÷–çBÆöFW'2Â&V6÷fW'’Â&WF–æVBÖ–âö6vRð¤×VÇF’×G&ç6f÷&ÓãöÆ—C“C‚öÆ–W'3“Crög&÷¦Vä&WFrÖ&¶W"'—FRÖÖF6‚FW7FVB6÷W&6Rà¥F†—2&ööb6†ævW2f÷W"6öçF–çV—G’f–ÆW2öæÇ“²FW7FVB'VçF–ÖR&WF–æVBà ¤'V–ÆC“S"6ö×ÆWFRæB&VG’f÷"•E&ò&WFW7BâW6W#“SFÆ252&÷FV7FVC²6W&FP¦–çFW&Ö—GFVçBUböÖ–â×FööÆ&"F—6V&æ6R—27F–ÆÂVæF–ærDUd”4S“S"6öæf—&ÖF–öâà¥&WVFVFÇ’÷VâVF—F÷"æB&6²Fó4C²6†V6²v†öÆRVF—F÷"ÂW†—B&W6–FRF—FÆRÂÖ–âF÷×&–v‡@¦'WGFöç2õd”UrÂâ÷–æ6‚õVæ6–Â—6ÆæBVF—F–ærõVæFõ&VFòæB&WGW&â÷&V÷Vââ÷&–v–æÃ“#@¦†VFW"Ö&÷fR×f–Ww÷'B&V†f–÷"&W6W'fVBv—F‚6–&Æ–ærv÷&·76RÆ–W"â6Æ÷VBvV$tÀ§Væf–Æ&ÆRÂæòW†7B–çFW&Ö—GFVçB6f&’&W&öGV7F–öâ÷"gVÆÂÖ&VæFW&VB66WFæ6P¦6Æ–ÖVBâæW‡BföÆÆ÷s“S"FWf–6RfVVF&6³²FöâwB–æfW"F†BWFöÖFVBFW7G2&÷fRF†P§&W÷'FVB–çFW&Ö—GFVçBF—6V&æ6R&W6öÇfVBâæòÖöFVÆÆ–æröFÆ2÷–çBÆv÷&—F†Ò6†ævW2à  ¢22ã“S2(	B6VÆV7FVBVFvR7WBUg3²ã“S"W6W"52(	B#Bö7Fö&W"##b„'&—6&æR ¥W6W#“S"52&÷FV7G2&WVFVBUbVF—F÷"VçG'’öW†—BÂÖ–âFööÆ&"õd”UræB—6Ææ@¥Væ6–Âö†—7F÷'’v÷&¶fÆ÷rgFW"6–&Æ–ærÖÆ–W"†&FVæ–ærâ&–÷#“SFÆ252&WF–æVBà¤æòæWr66WFæ6Röb–æFWVæFVçBÇ†“#’÷"6Öö÷F‚ÖÖWFÂ&VfÆV7F–öâvFW2–æfW'&VBà ¤VF—BÖ–ãf6#cfc3¢÷&–v–æÂ–ç7V7F÷"Ç&VG’÷vç2Öæ–föÆBF¦6Væ7’÷Væ–öâæB†0¦6ä¦ö–äf6W3²÷&–v–æÂUbVF—F÷"÷vç26²æBæF—fR6öÖÖ—Bö†—7F÷'’âæòWF†÷&V@¤VFvRÖ7WB6öÖÖæBW†—7G2âFBVFvR&F–Â÷WFW#crã\+7WBUg2W6–ær7W'&VçB÷&–v–æÀ¥6VÆV7F–öä'&–FvRVFvR–æF–6W2Âv—F‚ÆÂ&Wf–÷W2FööÂ÷6—F–öç2&W6W'fVBâ6ÖP¤ÖW6„†VÇF‚ÖöGVÆR†÷7G2F†RöæR×6†÷B'WGFöã²æòæWr÷Wö–çWBö†—7F÷'’ö¶W&æVÂà ¤æF—fRVç–çFVB–æFWVæFVçB&6RÖW6†W2v—F‚6ö×ÆWFRÖF6†–ærUg2öæÇ’âW†6ÇVFP§6VÆV7FVB7GVÂVFvW2g&öÒõ$”t”äÂ–ç7V7F÷"6öææV7F—f—G’Â&WV—&RV6‚6VÆV7FV@¦6öçF–çV÷W2UbVFvRw2÷væW'2FòVæB–âF–ffW&VçB6ö×öæVçG2ÂF†Vâ÷&–v–æÂw&–B6°¦æBôäRæF—fRUb6öÖÖ—Bâ6ö×ÆWFR&÷VæF'’×FòÖ&÷VæF'’7WG2÷"6Æ÷6VBÆö÷27Æ—@¦6†'G3²–æ6ö×ÆWFR6Æ—G2&VgW6RF†Rv†öÆR7F–öââW†—7F–ær6V×2ö&÷VæF&–W2æòÖ÷à¤WfW'’Vç6VÆV7FVB6öææV7F–öâ—2fW&–f–VBVæ6†ævVB&Vf÷&R6†V6·ö–çBâ6ö÷&F–æFW0§W'6—7B2÷&F–æ'’æF—fRUg2Âæ÷B6VÒfÆw2÷"æWr66†VÖâ&W6²ffV7G2ÄÀ¦—6ÆæG2v—F‚öæR6öÖÖöâ66ÆS²6÷W&6RöÇ–vöç2÷÷6—F–öç2÷&VÆF—fRFVç6—G’VçF÷V6†VBà¤æò6öæf÷&ÖÂVçw&ÂæWrfÆGFVæ–ærÂW'6—7FVçB6VÒÖ&¶–ær÷"7F—F6‚6öÖÖæBà£#²6÷&æW'2ò÷&–v–æÃ#‚6¶VBÖ—6ÆæBÆ–Ö—G3²Ö&–wV÷W2öæöæÖæ–föÆB÷6ÖR×v–æF–æp§6VÆV7FVBVFvW2Â7FÆRF&vWBö†—7F÷'’f–ÇW&R&VgW6R&Vf÷&RV&Æ–6F–öââç’6öÆ÷W"ð§&÷Vv†æW72öÖWFÆæW72–çB&VgW6W2æBö–çG2FòW‡Æ–6—Bö&¦V7BUb6ÆV"–çBà¤æò6–ÆVçB—†VÂF—66&B÷&V&–æB÷"–×÷'FVBÖFW&–Â&VÖ–ærà ¥6—‚æWr–çFVw&F–öâ6†V6·26÷fW"6ö×ÆWFR7WG2ö6Æ÷6VBÆö÷2ÂÖ—†VB'F–Â&VgW6ÂÀ¦W†—7F–ær6V×2ö&÷VæF&–W2Â÷&–v–æÂ6²÷v÷&²÷F&vWBö†—7F÷'’wV&G2Â&VBÖöæÇ’VW'2À§Væ6†ævVBvVöÖWG'’æBVç6VÆV7FVB¦ö–ç2Â7GVÂ66VæRVæFõ&VFòõ–çBõ6fT÷VâôtÄ §&÷VæGG&—Â7GVÂVFvR6ÆÆ&6²ö7W'&VçB6VÆV7F–öâ÷&VæFW"æB&F–ÂöæR×6†÷Bv—&–ærà¤öÆCs2ós’&F–Â–çfVçF÷'’æ÷r–æ6ÇVFW2F†RæWs#F‚VFvR7F–öâÂ&WF–æ–ærÄÂöÆ@¤”G2æB7&÷72ÖÖöFRÆ6VÖVçG2â÷F†W"'VçF–ÖR6÷W&6R6†ævW2&R&Wf–WvVB&WfW'6P¥UbôFBô×VÇF’ôÆ"66†R–ç2æB6†VÆÂ÷&V6÷fW'’¶W—3“S2öæÇ’âv÷&·76S“S"öÖ–ã“3ð¦6vRô×VÇF’×G&ç6f÷&Óãög&÷¦Vâ'—FW2Væ6†ævVBâgVÆÂ÷V&Æ–6F–öâ&ööbföÆÆ÷w2à ¤DUd”4S“S3¢FBVç–çFVBUbÆæRv—F‚‚FVç6—G“"Â“âVFvRÖöFR6VÆV7B—G26VçG&P§6†&VBVFvR(i"&F–Â7WBUg2âö&¦V7B(i"Ub(i"÷VâUbVF—F÷"6†÷w3"6W&FVB—6ÆæG3°¥VæFõ&VFò&W7F÷&W2÷&VÆ–W27WC²Væ6–Â—6ÆæBÖ÷fRffV7G2öæR6–FRâ–çBgFW"7WBÀ¥6fT÷Vâ&WF–ç2&W7VÇBâ&WVB7WBöâ6ÖRVFvRFG2æò†—7F÷'“²–çFVBF&vWG0§&VgW6RVçF–ÂW‡Æ–6—B6ÆV"–çBâW†—7F–ær7V&Rf6R&÷VæF&–W2Ö’Ç&VG’&R6V×0¦æB6÷'&V7FÇ’æòÖ÷âf÷"×VÇF’ÖVFvRF‡26VÆV7BF†Rv†öÆR7WBÂæ÷Bâ–çFW&–÷"6Æ—Bà¤æW‡BföÆÆ÷s“S2F7F–ÆRfVVF&6³²&&—G&'’6VÒÖ&·2÷7F—F6‚övVæW&Â7W'fVBVçw& §&VÖ–âVWVVBF‡&÷Vv‚÷&–v–æÂ÷væW'2â¶VW“S"T’ÖÆ÷7266WFæ6R&÷FV7FVBà ¢ã“S2f–æÂÆö6ÂæöFS#Bã’ã&Vw&W76–öã¢¢£#ssb52òd”Âò6¶—VB¢ ¢ƒ“ãg2’Â&WF–æ–ær÷&–v–æÃ#ssÇW26—‚VFvRÖ7WB–çFVw&F–öç2âfö7W6VBæWröFÆ2ð§v÷&·76R÷&VÆV6S#53²&F–Ãs’ós2&WF–æVBÆÂöÆB”G2æBæ÷r&WV—&W3#VFvP¦7F–öç2âf—'7BgVÆÂ'Vâw2öæÇ’f–ÇW&Rv2öÆCs2–çfVçF÷'““²WFFVBFò–çFVæFV@£#æBf–æÂ4ôÕÄUDR&W'Vâ&÷fR76W2âæò&V†f–÷"76W'F–öâG&÷VB÷"6¶—VBà¥&Wf–WvVC’Öf–ÆR'VçF–ÖRöÆöFW"6Æ÷7W&R²&V6÷fW'’¶W—3“S3²Ö–ã“3ö6vRô×VÇF“ãð¦g&÷¦VâVæ6†ævVBâ7GVÃ“S2•BF7F–ÆR66WFæ6RVæF–ærâ†÷7FVBõvW2öÆ—fP§V&Æ–6F–öâ&ööbföÆÆ÷w2â&W&ö¦V7F–ærUg2&WÆ6W27WG3²æòW'6—7FVçB6VÒ&V6—Rà  ¢22ã“S2V&Æ–6F–öâfW&–f–VB(	B#Bö7Fö&W"##b„'&—6&æR ¥'VçF–ÖRC3ƒVf#†V3CF&CcF3#3cs†VFF#CvÂFW7FVBG&VP¦S3#Sc“f“SSc“S#f#†#&c36SsFVV&C†F&ÂV&Æ—6†VBöâÖ–ââÆÃ‚&Æö'0¦æB7&VFVBG&VRÖF6†VBÆö6Â†6†W3²fWF6†VBÖ–âÖF6†VBW†7FÇ’æB6†V6¶÷W@¦Æ–væVB6ÆVæÇ’âÆö6ÂæöFS#BgVÆÃ#sse52ód”Âó6¶—ƒ“ãg2“²†÷7FVBæöFS#"'Và£C3“SƒC“32ö¦ö##ss#3c“Cb6ö×ÆWFRÆöw2fW&–g“#ssbóóƒ#Bãw2’âvW3C3“SƒCS3p¦'V–ÆC#ss#C3"öFWÆ÷“#ss3“sƒcR5T44U52âÆÃ#6†V6¶VBÆ—fRf–ÆW2'—FRÖÖF6ƒ §6†VÆÂ÷fW'6–öâÂ4ôÕÄUDR6†ævVBUbôFBô×VÇF’ôÆ"öv—¦Öòw&‚Â&V6÷fW'’Â&WF–æV@§v÷&·76S“S"ö–ç7V7F÷#“SöÖ–ã“3ö6vRô×VÇF“ãöæF—fRw&—FW"÷&ö¦V7Bög&÷¦Vä&WFrà¥F†—2&ööb6†ævW2f÷W"6öçF–çV—G’Fö7VÖVçG2öæÇ“²FW7FVB'VçF–ÖR&WF–æVBà ¤'V–ÆC“S2&VG’f÷"•BFW7F–æs¢FBUbÆæRƒ"õ“(i"6VÆV7B6VçG&R6†&VBVFvR(i §&F–Â7WBUg2(i"ö&¦V7BUbVF—F÷"6†÷w2Gvò—6ÆæG2âVæFõ&VFò&W7F÷&W2÷&VÆ–W3°¥Væ6–Â—6ÆæBÖ÷fRÂ–çBgFW"7WBæB6fT÷Vâ&WF–âÆ–÷WBâW†—7F–ær6VÒö&÷VæF'§&WVBæòÖ÷3²–çB&WV—&W2W‡Æ–6—B6ÆV"–çB&Vf÷&R7WGF–ærâ6ö×ÆWFRF‡2÷ ¦6Æ÷6VBÆö÷2öæÇ“²'F–Â6Æ—G2&VgW6RFöÖ–6ÆÇ’âæòvVæW&ÂVçw&÷7F—F6‚÷W'6—7FVç@§6VÒ&V6—RâW6W#“S"T’ö†—7F÷'’52&÷FV7FVC²DUd”4S“S2fVVÂ÷f—6–&–Æ—G’VæF–ærà¤æW‡B7GVÃ“S2fVVF&6²ÂF†Vâ66÷VB6VÒ÷7F—F6‚÷Vçw&VF—BF‡&÷Vv‚÷&–v–æÂ÷væW'2à  ¢22ã“SB(	B67&VVâ×&÷†–Ö—G’VFvR–6¶–æs²7WÆ–VB6öçfW‚ÖVFvR&W÷'B(	B#Bö7Fö&W"##b„'&—6&æR ¥W6W"&W÷'G26öçfW‚×÷6—F–öâVFvW2ÆÖ÷7B–×÷76–&ÆRFòFæBæWvÇ’fÆ—V@¦VFvW2&V6öÖ–ærVç6VÆV7F&ÆRâ67&VVç6†÷B6ÆV&Ç““S#²7W'&VçC“S2&WF–ç24ÔRÖ–ã“3 §–6¶W"Â6ò&W&öGV6VBöâ7W'&VçB6÷W&6RÂæ÷BF—6Ö—76VB27FÆR×6†VÆÂ&V†f–÷"à¤æó“S27WBUg252–æfW'&VBâW6W#“S"UbÖVF—F÷"66WFæ6R&VÖ–ç2&÷FV7FVBà¤W†7BWÆöFVB6öçfW‚VFvRæö&¢&WF–æVB'—FRÖf÷"Ö'—FR@¢FW7G2öf—‡GW&W2ö6öçfW‚ÖVFvRÓ“SBæö&£²4„#S`£sƒ#&#†C3S3css36#VcƒCs6c6f3C#33ƒVFCvs#3#C–SvC3ƒss†CBà£cfW'F–6W2óƒFf6W2ÖF6†W267&VVç6†÷Bâ6ÖW&÷6R—2æ÷B–âô$£²FW7B6ÖW&2&P¦6öçG&öÆÆVB&W&öGV7F–öç2Âæ÷B6Æ–ÒFò&V6÷fW"W†7B67&VVç6†÷Bf–Wrà ¤VF—C¢÷&–v–æÂÖ–â–6´¶–æD†—G2W6W2F‡&VRÆ–æRF‡&W6†öÆBã’v÷&ÆBVæ—G2F†Và¦6ÖW&ÖF—7Fæ6R÷&FW"âöâW†7B7WÆ–VBvVöÖWG'’Ã"6†÷6VâÆ–æRÖ–Gö–çG2ÄÀ§6VÆV7Bæ÷F†W"6ÖW&ÖæV&W"æV–v†&÷W&–ærVFvRâ÷&–v–æÂ&÷‡’öF—7Æ’&F6†–æp¦æB”G2&R6÷'&V7C²æò6÷W&6RF÷öÆöw’ôfÆ—¶W&æVÂ&W—"&WV—&VBâ6VÆV7FVBÖöæÇ¦6ö×öæVçB×F†VÇW"Ç6òw&VVF–Ç’6†÷6Rç’6VÆV7FVBVFvRv—F†–ã#‚ÂWfVâv†Và¦F–ffW&VçBVFvRÆ’VæFW"F†Rö–çFW"âVæ6–ÂvFRÇ&VG’FVÆVvFW2æF—fR–6²à¤VFvR×–çB÷væW"–æFWVæFVçFÇ’W6VBF†RöÆBv÷&ÆB×&F—W2÷&FW&–ærà ¤Ö–âw2VFvRÖöæÇ’'&æ6‚æ÷r6ÆÇ26ÖÆÂ&VBÖöæÇ’VFvR×67&VVâ×–6¶–ær†VÇW"÷fW ¥4ÔR&VæFW&VB–æFW†VBÆ–æR&÷†–W2Ã"552—†VÇ2Â67&VVâ&÷†–Ö—G’f—'7BÂ6ÖW&¦FWF‚f÷"VçF—¦VBV'FW"×—†VÂF–W2â†öÖövVæV÷W2g'W7GVÒ6Æ—–ær&Vf÷&RF—f–FP¦æBW'7V7F—fRÖ6÷'&V7Bv÷&ÆB–çFW'öÆF–öã²&VçBG&ç6f÷&×2æB÷'F†öw&†–0¦6ÖW&27W÷'FVBâæòÖW6‚æVFvW2‚’ÂF÷öÆöw’÷"6÷W&6Rw&—FW2Â66†Rö†—7F÷'’ö–çW@¦÷væW"âÖFW&–Âçf—6–&ÆSÖfÇ6R&÷‡’6öçfVçF–öâ&WF–æVC²ö&¦V7Böæ6W7F÷"f—6–&–Æ—G§&W7V7FVBâf6RõfW'FW‚ôö&¦V7B&’F‡2Væ6†ævVBâF†—2—2F&vWF–ærÂæ÷BæWp§7W&f6Rö66ÇW6–öâö&6²Öf6RõF‡&÷Vv‚×6VÆV7F–öâöÆ–7“²æòæWr†–FFVâ×7W&f6RwV&çFVRà ¤÷&–v–æÂ6VÆV7FVBÖ6ö×öæVçBVFvRFövvÆRæ÷r6†V6·24ÔRæF—fR†—B&Vf÷&R&VÖ÷fÃ°§Vç6VÆV7FVBæV–v†&÷W'272FòÖ–ââ÷&–v–æÂVFvR–çBf—6–&ÆR÷F‡&÷Vv‚W6W2æF—fP§–6´†—G2÷&FW"æB÷&–v–æÂFVGWöf—'7BöÆÂöÆ–7’Â&WF–æ–ærfÆÆ&6²f÷"7F'GWð¦æöâÔVFvRf—‡GW&W2â6ÖR÷&–v–æÂÆ—7FVæW'2Â&÷vF–öâæBvW7GW&R÷væW'3²æòæWp§&r×ö–çFW"†æFÆW"âfÆ—VFvRvVöÖWG'’ö†—7F÷'’÷&F–Â÷v÷&·76RõUb÷–çBöÖFW&–À¦Æv÷&—F†×2Væ6†ævVBâæWrÔ”â66†R–ã“SB—2–çFVçF–öæÂ7GVÂ–6¶W"&W—#°¦÷&–v–æÂÖ–â–çFW&æÂ7F×æB6vS“3ô×VÇF“ãög&÷¦Vâ'—FW2&VÖ–âVæ6†ævVBà¤F—&V7BÖ&WfVÂ6†ævW2ôäÅ’6ö×öæVçB×F6†–ÆB66†R¶W“²6†VÆÂ÷&V6÷fW'’öÖæ–fW7@¦æB&Wf–WvVBÖ–âö6†–ÆBÆöFW"w&ƒ“SBâæò&Ææ¶WB&W–ææ–ærà ¥6WfVâæWr–çFVw&F–öç3¢W†7B7WÆ–VC"&R×&W—"f–ÇW&W>(i&6÷'&V7BæF—fR–6³°¤5ETÂ÷&–v–æÂfÆ—VFvRÇ’÷&V'V–ÆBõVæFõ&VFòÇW2&W6VÆV7BæWrF–vöæÃ²66ÆRð§&ö¦V7F–öâ÷&VçBôE"ó'‚&÷VæG3²6Æ—ö†–FFVâæ6W7F÷"÷7V'—†VÂÖFWF‚&V†f–÷#°¦7GVÂ6VÆV7FVB×FövvÆR&VgW6Â÷&VÖ÷fÂv—F‚æò†—7F÷'“²÷&–v–æÂVFvR×–çBæF—fP¦WfVçB÷f—6–&ÆR÷F‡&÷Vv‚FVÆVvF–öã²&VÂVæ6–ÂvFR÷–çB÷væW"&VÆV6Rö6æ6VÂöf–ævW ¤÷&&—B&WFVçF–öââfö7W6VBæWr¶æF—fRf6RõfW'FW‚öfÆöF–ærÖæf–vF–öâ÷&VÆV6S3…52à¤÷&–v–æÂ76W'F–öç2&WF–æVC²gVÆÂæBV&Æ–6F–öâWf–FVæ6RföÆÆ÷râæöFRF‡&VRö–çW@¦f—‡GW&W2&Ræ÷BæF—fR•BõvV$tÂ&VæFW&VB66WFæ6Rà ¤DUd”4S“SC¢4ÔR7WÆ–VBÖW6‚ÂFW6VÆV7BæBF6—&6ÆVBVFvRæBæV–v†&÷W&–ærv†—FP¦VFvS²÷&&—B÷¦ööÒæB&WVBâfÆ—VÆ–v–&ÆRVFvRÂFW6VÆV7BF†Vâ&W6VÆV7BæWrF–vöæÃ°¥VæFõ&VFò¶VW2&÷F‚vVöÖWG'’æB–6¶–ærW6&ÆRâG'’æV&'’×VÇF’ÖVFvR6VÆV7F–öâÀ¥Væ6–ÂG&r6VÆV7F–öâæBf–ævW"÷&&—B÷â÷–æ6‚v—F†÷WB6VÆV7F–öâÆ÷72â6†V6³“S0¤7WBUg26W&FVÇ’v†Vâ&7F–6Ã²æó“S266WFæ6R–æfW'&VBg&öÒF†—2'Vr&W÷'Bà¤æW‡B&W7öæBFó“SBFWf–6R&W7VÇG2&Vf÷&RæWr6VÒ÷Vçw&fVGW&W2âæòF÷öÆöw§&W—"÷G&–æwVÆF–öâv÷&¶&÷VæB÷"f÷&6VB66†RÖ6ÆV&–æræVVFVBf÷"&W&öGV6VB'Vrà ¢ã“SBf–æÂÆö6ÂæöFS#Bã’ã&Vw&W76–öã¢¢£#sƒ252òd”Âò6¶—VB¢ ¢ƒ“Rã2’Â÷&–v–æÃ#ssb&WF–æVBÇW26WfVâ7WÆ–VBÖf–ÆR÷–6¶W"ö–çWB–çFVw&F–öç2à¤fö7W6VBæWröæF—fRf6RõfW'FW‚öfÆöF–ærÖVFvRövW7GW&R÷&VÆV6S3…52âæòöÆB76W'F–öç0§&VÆ†VB÷"&VÖ÷fVBâWÆöFVBô$¢f—‡GW&R'—FRÖ–FVçF–6ÂâÖ–â6÷W&6R6†ævW2öæÇ¦†VÇW"–×÷'BæBVFvR–6¶W"'&æ6ƒ²F—&V7BÖ&WfVÂ—2–âÖöæÇ’â6ö×öæVçBVFvRFövvÆP¦æBVFvR×–çBW6RW†—7F–æræF—fR÷væW#²æòæWrö–çFW"övVöÖWG'’ö†—7F÷'’–×ÆVÖVçFF–öâà¥&Wf–WvVB66†R6Æ÷7W&S“SC²6vS“3ô×VÇF“ãög&÷¦VâVæ6†ævVBâ†÷7FVBõvW2öÆ—fRÖf–ÆP§V&Æ–6F–öâ&ööbföÆÆ÷w3²7GVÃ“SB•BFôfÆ—÷&W6VÆV7B66WFæ6RVæF–ærà  ¢22ã“SBV&Æ–6F–öâfW&–f–VB(	B#Bö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR“ƒ–3Vc“–fS#3–#f3ƒVffCsƒ†V63ÂFW7FVBG&VP¦vc#C†#SSƒ†SSƒ&#s#sSvFSc33–3fÂV&Æ—6†VBöâÖ–ââÆÃR&Æö'0¦æBv—BFFG&VRÖF6†VBÆö6Â†6†W3²fWF6†VBÖ–âÖF6†VBW†7BFW7FVBG&VRæ@¦6†V6¶÷WBÆ–væVB6ÆVæÇ’âÆö6ÂæöFS#BgVÆÃ#sƒ552ód”Âó6¶—ƒ“Rã2“²†÷7FV@¤æöFS#"'VãCC“#“’ö¦ö##s#CcB6ö×ÆWFRÆöw2fW&–g“#sƒ2óóƒ#CBãG2’à¥vW3CC“3ƒb'V–ÆC#s#Cs“‚öFWÆ÷“#s#SSƒ#C5T44U52âÆÃ#6†V6¶VBÆ—fP¦f–ÆW2'—FRÖÖF6ƒ¢6†VÆÂ÷fW'6–öâÂæWr–6¶W"²6†ævVBÖ–â÷FövvÆRôVFvR×–çBô&WfVÀ¦ÆöFW"w&‚Â&V6÷fW'’Â&WF–æVBv÷&·76S“S"õUc“S2öv—¦Öó“S2õVæ6–ÂvFRö6vS“3ð¤×VÇF“ãôfÆ—33röæF—fRw&—FW"÷&ö¦V7Bög&÷¦Vä&WFrâ÷&–v–æÂWÆöBf—‡GW&RVæ6†ævVBà¥F†—2&ööb6†ævW2f÷W"6öçF–çV—G’f–ÆW2öæÇ“²FW7FVB÷V&Æ—6†VB'VçF–ÖR&WF–æVBà ¤'V–ÆC“SB6ö×ÆWFR÷&VG’f÷"4ÔRÖf–ÆR•B&WFW7C¢Vç6VÆV7FVB6—&6ÆVBVFvRæB—G0¦æV–v†&÷W'2Â÷&&—B÷¦ööÒ÷&W6VÆV7BÂ÷&–v–æÂfÆ—VFv^(i&FW6VÆV7N(i'&W6VÆV7BæWrF–vöæÂÀ¥VæFõ&VFòÂ×VÇF’ÖVFvR6VÆV7F–öâæBf–ævW"æf–vF–öââWFöÖFVBW†7BÖf–ÆRöæF—fP§–6¶W"æB&VÂfÆ—ö†—7F÷'’ö–çWBf—‡GW&W273²7GVÂ•BfVVÂöV&æ6R&VÖ–ç0§VæF–ærâ67&VVç6†÷C“S"f–ÇW&R&W&öGV6VBöâ6ÖR–6¶W"–ã“S3²æòf÷&6VB7FÆRÖ66†P§v÷&¶&÷VæBâW6W#“S"T’ö†—7F÷'’52&÷FV7FVC³“S27WBUg2FWf–6RvFR&VÖ–ç26W&FRà¤æW‡B7GVÃ“SBfVVF&6²&Vf÷&RgW'F†W"Vçw&÷6VÒfVGW&W3²æòæWs“S2ó“SB52–æfW'&VBà  ¢22ã“SR(	B6÷Ææ"7F—F6‚Ug3²ã“S2æBã“SBW6W"52(	B#Bö7Fö&W"##b„'&—6&æR ¥W6W"W‡Æ–6—FÇ““S552æC“SE52öæW‡F'V–ÆBâ&÷FV7B6ö×ÆWFRVFvR7WBUg2À¥VæFõ&VFòõ–çBõ6fT÷VâæB67&VVâ×&÷†–Ö—G’VFvRF&vWF–ærÂfÆ—÷&W6VÆV7BÂ6VÆV7FV@¦æV–v†&÷W"FövvÆRõVæ6–Â–çB6VÆV7F–öâæBf–ævW"æf–vF–öâã“S"VF—F÷"T’66WFæ6P¦Ç6ò&WF–æVBâ&–÷"VæF–æs“S2ó“SBæ÷FW2&VÆ÷r&R†—7F÷&–6ÂÂ7WW'6VFVB†W&Rà¤–æFWVæFVçBÇ†“#’÷6Öö÷F‚ÖÖWFÂ&VfÆV7F–öâvFW2&Ræ÷B–×Æ–VB66WFVBà ¤VF—BÖ–ãCƒ†S3FVS¢æò7F—F6‚W†—7G2â÷&–v–æÂ–ç7V7F÷"÷vç2Öæ–föÆBF¦6Væ7’æ@¦—6ÆæBÖVÖ&W'6†—²÷&–v–æÂ&÷‚&ö¦V7F–öâ7WÆ–W26æöæ–6ÂÆæRÖ–æs°¦÷&–v–æÂ6÷Ææ"6VVBw&÷W–æs“SÂw&–B6²æBæF—fR6öÖÖ—BÇ&VG’W†—7Bà¤FBVFvR&F–Â÷WFW#"ã\+7F—F6‚Ug2Âv—F‚ÆÂ&–÷"÷6—F–öç2Væ6†ævVBâ6–ævÆP¦7W'&VçB6VÆV7FVB6†&VBVFvS²÷&–v–æÂ'WGFöâö7F–öâ†÷7B–âÖW6„†VÇF‚æB÷&–v–æÀ§&F–ÂöæR×6†÷B6ö×ÆWF–öââæòæWr÷W÷&r–çWBö†—7F÷'’öÖW6‚÷G&–æwVÆF–öâ÷væW"à ¤f—'7B7F—F6‚7W÷'G2Etò—6ÆæG2öâ4ÔR÷&–VçFVBfÆB6÷W&6RÆæRÂæF—fR÷Æ–âð¦–æFWVæFVçBVç–çFVB&6RÖW6†W2öæÇ“³#†f6W2ó#¶6÷&æW'2âW†—7F–ær7W'&VçB6†'G0¦×W7BV6‚ÖF6‚6æöæ–6ÂÆæR6ö÷&F–æFW2VæFW"Væ–f÷&Ò6–Ö–Æ&—G’÷&VfÆV7F–öâà¤Ö÷fVB÷&÷FFVB÷66ÆVBöfÆ—VB6†'G27W÷'FVC²–çFW&æÆÇ’F—7F÷'FVB÷v'VBö&VçBð¦æöâÖ6÷Ææ"6†'G2&VgW6Râ÷&–v–æÂÆ÷vW"Öf6R6†'B7WÆ–W2F†Rf—C²Ö÷fRF†R÷F†W ¦–çFò—G2ÆæRg&ÖRÂ6æ6öÖÖöâfW'FW‚Ô”B6÷&æW'2Fòõ$”t”äÂW†7Bæ6†÷"fÇVW2à¤ÆÂ6†&VB&÷VæF&–W2&WGvVVâF†B—"¦ö–ã²æò7F–ÂvVÆF–ærÂW"Öf6RF÷öÆöw¦6†ævW2÷"6fVB6VÒfÆw2â÷&–v–æÂw&–B6²F†Vâ&W6·2ÄÂ—6ÆæG2v—F‚6öÖÖöà§66ÆRæB6öÖÖ—G2ôä4RâÖ÷f–ær6†'BFVç6—G’ö÷&–VçFF–öâÖF6†W2&WF–æVB6†'B&Vf÷&P¥6³²VçF÷V6†VB6†'B6†W2÷&VÆF—fRFVç6—G’&WF–æVBâf–æÂ–ç7V7F÷"×W7B&W÷'@¤U„5B–çFVæFVBGvò×FòÖöæRÖVÖ&W'6†—ÂæòVç&VÆFVBÖW&vW2÷7Æ—G2â6ÖRÖ—6ÆæB¦ö–æV@¦VFvRæòÖ÷3²â–çFW&æÂ6Æ—B&VgW6W2Â2æòv†öÆRÖ6†'B¦ö–â6â&W—"—Bà ¤ÆÂ6öÆ÷W"÷&÷Vv†æW72öÖWFÆæW72–çB&VgW6W2&Vf÷&R7Fv–ærö†—7F÷'’Âv—F‚W‡Æ–6—@¤ö&¦V7BUb6ÆV"–çBwV–Fæ6Râ÷&–v–æÂVç7W÷'FVBF&vWBö†—7F÷'’öf–æ—FRö6öÆÆ6Rð¥6²wV&G2&WF–æVBâæòvVæW&Â7W'fVBVçw&Â7V&RÖæWBVæföÆF–ærÂ÷F–ÖÂ6¶–ærÀ¦&&—G&'’÷fW&Æ&W—"÷"–çB&W6×Æ–ærâæF—fR6÷W&6S¦&÷†Æ"6÷&æW"66†VÖÀ¦vVöÖWG'’Â&ö¦V7Bö†—7F÷'’öW‡÷'B÷væW'2&VÖ–âVæ6†ævVBâ6æöæ–6Â&÷‚—2G&ç6–Vç@§fÆ–FF–öâöÆ–væÖVçBöæÇ’Âæ÷B&WÆ6VÖVçBÆ—fRUbÖ–ær÷"&ÆÆVÂ¶W&æVÂà ¥6—‚æWr–çFVw&F–öç3¢7WN(i%7F—F6‚W†7BVæGö–çG2övVöÖWG'’÷VW"—6öÆF–öâ÷&WVBæòÖ÷°§&÷FFVB÷66ÆVBöÖ—'&÷&VBV—F†W"6†'BæB6÷W&6R66ÆR÷G&ç6ÆF–öã²Vç&VÆFVB—6Ææ@¦ÖVÖ&W'6†—²æöâ×Ææ"öF—7F÷'FVBö&÷VæF'’öÖ&–wV÷W2÷&VgW6VBF&vWG2æB†—7F÷'’÷v÷&°¦FöÖ–6—G“²7GVÂVæFõ&VFòõ–çBõ6fT÷VâôtÄ#²7GVÂVFvR6ÆÆ&6²æB&F–ÂÆVæ6‚ð§V6²&W7F÷&F–öââ÷&–v–æÃ“S2ó“SB6VÖçF–26†V6·2&WF–æVBâöÆCs2ós’VFvR–çfVçF÷'¦æ÷s#Â&WF–æ–ærÆÂ&Wf–÷W2”G2æB6†&VB7&÷72ÖÖöFR÷6—F–öç2âfö7W6VBæWrô7WBð§–6¶–ær÷&F–Â÷&VÆV6S3U52âgVÆÂæBV&Æ–6F–öâ&ööbföÆÆ÷w2âôäÅ’UbVF—BÀ¤ÖW6„†VÇF‚6ÆÆ&6²æBv—¦ÖògVæ7F–öæÆ—G’6†ævS²÷F†W"'VçF–ÖR6†ævW2&R&Wf–WvV@¥UbôFBô×VÇF’ôÆ"&WfW'6RÆöFW"–ç3“SRæB6†VÆÂ÷&V6÷fW'’âÖ–ã“SB÷–6¶W#“SBö6vS“3ð¤×VÇF“ãög&÷¦Vâ'—FW2Væ6†ævVBâæó“S2ó“SB66WFæ6RÆ÷7BGW&–ær6VÒv÷&²à ¤DUd”4S“SS¢UbÆæRƒ"õ“(i"6†&VBVFvR7WBUg2(i"6VÆV7B4ÔRVFvR(i"7F—F6‚Ug2à¥UbVF—F÷"6†÷w2öæR¦ö–æVB—6ÆæC²Væ6–ÂÖ÷fRÖ÷fW2&÷F‚f6W2âVæFõ&VFò7FW2F‡&÷Vv€§7F—F6‚ö7WB6W&FVÇ’âÖ÷fR÷&÷FFR÷66ÆRâ—6ÆæB&Vf÷&R7F—F6†–æs²6ÖRfÆBF6€¦¦ö–ç2÷&R×6·2â–çBgFW"7F—F6‚Â6fT÷Vâ&WF–ç2&W7VÇBâÇ&VG’Ö¦ö–æVB&WV@¦æòÖ÷3²7W'fVB÷6ÖRÖ7V&RÖ6÷&æW"f6W2÷"–çFVBF&vWG2&VgW6Rv—F†÷WB6†æv–ærv÷&²à¤æW‡B7GVÃ“SRFWf–6RfVVF&6²&Vf÷&RW‡æF–ær7F—F6‚övVæW&ÂVçw&²&W6W'fP¦66WFVC“S27WG2ó“SB–6¶–æró“S"T’æBÆÂ&÷FV7FVBæf–vF–öâöÖöFVÆÆ–ær&V†f–÷"à ¢ã“SRf–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£#sƒ’52òd”Âò6¶—VB¢ ¢ƒ“2ãG2’Â÷&–v–æÃ#sƒ2&WF–æVBÇW26—‚7F—F6‚–çFVw&F–öç2âæWrô7WBö66WFVC“S@§–6¶–ær÷&F–Â÷&VÆV6S3U52â÷&–v–æÃ“S26÷W&6R×FW7B&÷VæF&–W2¶WB–çF7BgFW ¦–æ—F–ÂæWrÖ'WGFöâÆ6VÖVçBW‡÷6VBf—‡GW&R6Æ–6S²'WGFöâFV6Æ&F–öç2&V6VFP¦&÷F‚6ÆÆ&6·2ÂæB÷&–v–æÂ76W'F–öç2&VÖ–âãs2ós’–çfVçF÷'’æ÷s#v—F‚WfW'¦öÆBFööÂ&WF–æVBâæòöÆB&V†f–÷"76W'F–öâ&VÖ÷fVB÷"&VÆ†VBâÖ–â÷–6¶W"÷FövvÆRð¤VFvR×–çC“SBÂ6vS“3ô×VÇF“ãög&÷¦Vâ'—FW2Væ6†ævVBâ&Wf–WvVC’Öf–ÆR&WfW'6RUbð¤FBô×VÇF’ôÆ"öv—¦Öò6Æ÷7W&S“SRæB&V6÷fW'’–ç3²gVÆÂ†÷7FVBõvW2öÆ—fR&ööbföÆÆ÷w2à¤7GVÃ“SR•BfVVÂöfÆB×7F—F6‚v÷&¶fÆ÷r66WFæ6RVæF–æs³“S2ó“SBW6W"52&÷FV7FVBà  ¢22ã“SRV&Æ–6F–öâfW&–f–VB(	B#Bö7Fö&W"##b„'&—6&æR ¥'VçF–ÖR#c&FSCS3#vc–CcƒS#C6c3&6&3&SCF&s“ÂFW7FVBG&VP¦3ƒ&ffS3SƒƒC#3c#“SssCƒfCVVcsƒcSV3fÂV&Æ—6†VBöâÖ–ââÆÃ‚WÆöFV@¦&Æö'2æBv—BFFG&VRÖF6†VBÆö6Â†6†W3²fWF6†VBÖ–âÖF6†VBW†7FÇ’æBÆö6À¦6†V6¶÷WBÆ–væVB6ÆVæÇ’âÆö6ÂæöFS#BgVÆÃ#sƒ•52ód”Âó6¶—ƒ“2ãG2“²†÷7FV@¤æöFS#"'VãCCSƒS#Sö¦ö##s#s#ƒƒ‚6ö×ÆWFRÆöw2fW&–g“#sƒ’óóƒ#CBã—2’à¥vW3CCSƒS##R'V–ÆC#s#s#ƒ3sƒ‚öFWÆ÷“#s#sCc“R5T44U52âÆÃ#6†V6¶VBÆ—fP¦f–ÆW2'—FRÖÖF6ƒ¢6†VÆÂ÷fW'6–öâÂ4ôÕÄUDR6†ævVBUbôFBô×VÇF’ôÆ"öv—¦Öòw&‚À§&V6÷fW'’Â&WF–æVC“SBÖ–â÷–6¶W"ö6ö×öæVçB×FövvÆRôVFvR×–çBÂv÷&·76S“S"ö6vS“3ð¤×VÇF“ãög&÷¦Vä&WFrâ7GVÂ÷&–v–æÂÖ¶UÆæRƒ"Ã"Ã’¶WFöÖF–2…¢æF—fRUb÷væW ¦Ç6ò6Öö¶R×FW7FVB7WN(i%7F—F6Ž(i&öæR—6ÆæBâF†—2&ööb6†ævW2f÷W"6öçF–çV—G’f–ÆW0¦öæÇ“²FW7FVB÷V&Æ—6†VB'VçF–ÖR&WF–æVBâW6W#“S2æC“SB52&V6÷&FVB÷&÷FV7FVBà ¤'V–ÆC“SR6ö×ÆWFRæB&VG“¢Vç–çFVBUbÆæRƒ"õ“(i"6†&VBVFvR7WBUg2(i"4ÔP§6VÆV7FVB6VÒ7F—F6‚Ug2(i"ö&¦V7BUbVF—F÷"6†÷w2ôäR¦ö–æVB—6ÆæBâVæ6–Â—6Ææ@¦Ö÷fRÖ÷fW2&÷F‚f6W3²VæFõ&VFò&W7F÷&W2÷&VÆ–W27F—F6‚6W&FVÇ’g&öÒ7WBâ–ç@§F†Vâ6fT÷Vâ&WF–ç2Æ–÷WB÷&W7VÇBâv†öÆRGvò6†'G2×W7B6†&RöæRfÆB6÷W&6P§ÆæS²7W'fVBö7V&RÖ6÷&æW"ö&VçB6†'G2&VgW6RÂæòvVæW&ÂVçw&÷"6VÒ&V6—Rà¤7GVÃ“SR•BV&æ6RöfVVÂ&VÖ–ç2VæF–ærâæW‡B7GVÃ“SRfVVF&6²&Vf÷&R'&öFW §7F—F6‚÷Vçw&v÷&³²&WF–â66WFVC“S27WG2ó“SB–6¶–æró“S"T’æB÷&–v–æÂ÷væW'2à  ¢22ã“Sb(	B&÷VæFVBævÆRÖ&6VBWFòFÆ3²C“bÖf6RÆ–Ö—B(	B#Bö7Fö&W"##b„'&—6&æR ¥W6W"&WVW7G2WFöÖF–26öææV7FVBÖf6R7F—F6†–ærGW&–ærFÆ2vVæW&F–öâÂ&7F–6À¦f6RÆ–Ö—BÂ&÷VæFVB'VçF–ÖRÂF†Vâ7VvvW7G2VFvRævÆRâÇ6ò6·2v†WF†W"æÖV@¢æ&÷†Æ"6fW26â÷fW'w&—FRW†—7F–ærF÷væÆöG2f–ÆW2âæó“SRFWf–6R52–æfW'&VC°£“S27WBUg2ó“SB–6¶–æró“S"VF—F÷"66WFæ6R&VÖ–â&÷FV7FVBà ¤VF—BÖ–ã3“3“s†#3¢6÷Ææ"FÆ2Ç&VG’¦ö–ç2fÆB6†'G2F‡&÷Vv‚÷&–v–æÀ¦–ç7V7F÷"F¦6Væ7’²&÷‚&ö¦V7F–öâÂ'WBv2Æ&VÆÆVB6V6öæF'’æB6VC#†f6W3°¥6²öFVç6—G’Ç6ó#‚v—F‚f—†VC"Rv2ÂæBvÆö&ÂÆæR6VVB6V&6‚v2VG&F–2à¥&WW6R4ÔRW†—7F–ær'WGFöâö÷væW"2&–Ö'’WFòFÆ2†&Vf÷&RW‡Æ–6—Bf6RFÆ2’À¦FB¦ö–âævÆS(	33+öFVfVÇCRâ’7&VFT6÷Ææ$FÆ5Ub6—‡F‚÷F–öæÂævÆRFVfVÇG3À§&W6W'f–ær66WFVBfÆB÷WGWG2æBÖçVÃ“SRÆæRw&÷W–ærã+ÒW†7B&–÷ ¦6÷Ææ"öÆ–7’â÷6—F—fRævÆR&WV—&W2$õD‚F¦6VçBfW&vRf6RÖæ÷&ÖÂævÆP¦æBf—†VB6VVBÖæ÷&ÖÂ6öæRv—F†–â7WFöfbÂ÷÷6—FRÖæ–föÆBVFvRF—&V7F–öç2æ@¤U„5B÷&–v–æÂ&÷‚UbVæGö–çG2âæòG&–gBÆöær7W'fVB6†–ç2Â6ö÷&F–æFRvVÆF–ærÀ§6V6öæBG&–æwVÆF÷"öF¦6Væ7’ö†—7F÷'’÷væW"÷"6ÆÇ2FòÖçVÂ7F—F6‚–âÆö÷à ¥F†—2—2&÷VæFVB&ö¦V7FVBÖ6†'Bw&÷W–ærÂæ÷B6öæf÷&ÖÂVçw&÷&VÆ†F–öâ÷"&&—G&'¦7V&RÖæWBVæföÆF–ærâF–ffW&VçB&÷‚F—&V7F–öç2&VÖ–â6V×3²†–v†W"ævÆRÖ’7G&WF6‚à¥v'VBf6W27F’6W&FRC+ÂÖ’¦ö–â–âævÆRÖöFR–b÷&–v–æÃ“SG&–ævÆRö&V§fÆ–FF–öâ7V66VVG2âæò6÷W&6RöÇ–vöç2÷÷6—F–öç2öw&÷W2÷"W'6—7FVçB66†VÖ6†ævW2à¤÷&–v–æÂ&—fFR&÷‚(i"w&÷WVBFVç6—G’(i"6²(i"ôäRæF—fR6öÖÖ—B&WF–æVBâÆÂ–ç@¦6†ææVÇ27F–ÆÂ&WV—&RW‡Æ–6—B6ÆV"–çC²Vç7W÷'FVB÷7FÆRö†—7F÷'’÷v÷&²&VgW6À¦FöÖ–2âW‡Æ–6—Bf6RFÆ2&WF–ç2öæR—6ÆæBW"f6RæBW†7B6ÖÆÂ÷WGWG2à ¤FÆ2f6R6C“bƒ3,9s#‚’Â÷&–v–æÃ#²f6RÖ6÷&æW"'VFvWB&WF–æVBâ6†&VB6²ÆÀ¦æBWVÆ—¦RFVç6—G’7W÷'CC“b—6ÆæG26òÆ&vRFÆ2&VÖ–ç2VF—F&ÆRâÖçVÃ“SP¥7F—F6‚7F–ÆÂ†2—G2–æFWVæFVçB6öç6W'fF—fS#‚Öf6R66÷Râ÷&–v–æÂÃÓ#‚Ö—6Ææ@§6¶–ærv"RæBW†7B÷WGWB&WF–æVC²Æ&vW"Æ–÷WG2W6Rvã"ö6V–Â‡7'B†6÷VçB’’À¦÷WFW"Ö&v–ã"RÂ4ÔRFWFW&Ö–æ—7F–26öÖÖöâ×66ÆRw&–B6V&6‚†BÖ÷7CC“b6öÇVÖç2’à¤CC“b6†'G2F†—2—7ã2ã'‚vöã#BÖ3²æòÆ&vW"FW‡GW&R&W6öÇWF–öâ6Æ–ÖVBà ¥6ÖRÆæRö6öæRw&÷W–ær÷væW"æ÷r–æFW†W26VVB'V6¶WG2f÷"ã#†f6W3¢Öƒƒ'V6¶W@¦Æöö·W2ócB6VVB6æF–FFW2W"f6Rƒ#rÆöö·W2f÷"÷6—F—fRævÆR’ÂF†Vâõ$”t”äÀ§7G&–7B6VVBFW7G2â÷fW&ÆöFVB'V6¶WG26öç6W'fF—fVÇ’ÆVfRW‡G&6†'G26W&FRà¥6ÖÆÂf—†VB×ÆæR÷WGWBF‚Væ6†ævVC²æò—FW&F—fR7F—F6†–ær÷&VÆ†F–öâö÷F–ÖÀ§6¶W"â†÷7B6Öö¶SC“bÖf6R÷&–v–æÂFBÆæS£\+WFó3Bãf×2Ã+CBãF×2Äf6Sbãv×3°§F†W6R&R6–ævÆRÆö6Â5Rö'6W'fF–öç2ÂäõB•BÆFVæ7’÷"F–Ö–ær&öÖ—6Rà ¥6WfVâæWr–çFVw&F–öç26÷fW#C“bÖf6RWFòôf6RÂW†7B¦ö–ç2övVöÖWG'’÷VW"÷væW'6†—ð§&WVBööæR6†V6·ö–çC²Æ&vR6²öFVç6—G’æB&VGV6VBv7FVBUb&V²v'VBfÆÆ&6²ð¦F—66öææV7FVBÆæW3²Æ–Ö—G2÷&VgW6Ç3²7GVÃ#BÖf6R†—7F÷'’÷–çBõ6fT÷VâôtÄ#°§&–Ö'’W†—7F–ærT’öævÆRf÷'v&F–æs²W†7B6ÖR&WVW7FVBF÷væÆöBf–ÆVæÖRGv–6S°¦æB6†ÆÆ÷r÷6†'ævÆRF‡&W6†öÆG2Âf—†VBÖ6öæRG&–gBæC#SbÖf6Rf7BF‚âW†—7F–æp£#‚Ö&÷VæF'’&VgW6Âf—‡GW&W3ƒ“2óƒ“Ró“C’ó“Só“S2Ö÷fVBFóC“rv—F†÷WBG&÷–ærç¦FöÖ–6—G’76W'F–öã²&–÷##‚7V66W72FW7G2&WF–æVBã“SæVÂf—‡GW&RW‡Æ–6—FÇ“+à¤÷&–v–æÂ÷F†W"'VçF–ÖRÆv÷&—F†×2&WF–æVC²gVÆÂæBV&Æ–6F–öâ&ööbföÆÆ÷w2à ¥6fRVF—C¢&ö¦V7Df–ÆTæÖRöW‡÷'D&6–5&ö¦V7BÇ&VG’&WVW7BU„5B6†÷6VâæÖRÀ¦æòVæFVB6÷VçFW"â6f&’ö”õ2F÷væÆöG26öÆÆ—6–öâæÖ–ær—2÷WG6–FRF†—2F÷væÆö@¤’â7W'&VçBÔDâ&–Ö'’6ö×F–&–Æ—G’FF&V6÷&G26†÷u6fTf–ÆU–6¶W"Vç7W÷'FV@¦–â6f&’ö”õ3²6‡&öÖRw2’Fö7VÖVçFF–öâW‡Æ–6—FÇ’6—2æ6†÷"ÖF÷væÆöBfÆÆ&6°¦6ææ÷B÷fW'w&—FRâæò&—6·’&WÆ6VÖVçBö†–FFVâ–çFW&æÂ6fRöæWrf–ÆW7—7FVÒfVGW&P¦FFVBâW†—7F–ær6fRô÷Vâö6öFV2Væ6†ævVC²&Vw&W76–öâ&÷fW2Gvò–FVçF–6Â&WVW7FV@¦æÖW2â6÷W&6W26†V6¶VC#Dö7C##c ¦‡GG3¢ò÷&ræv—F‡V'W6W&6öçFVçBæ6öÒöÖFâö'&÷w6W"Ö6ö×BÖFFöÖ–âö’õv–æF÷ræ§6öà¦‡GG3¢òöFWfVÆ÷W"æ6‡&öÖRæ6öÒöFö72ö6&–Æ—F–W2÷vV"Ö—2öf–ÆR×7—7FVÒÖ66W727öÇ–f–ÆÆ–æp ¤DUd”4S“Sc¢&Wf–÷W6Ç’÷fW##‚Öf6RVç–çFVBÖW6‚(i"ö&¦V7BUb(i"WFòFÆ3\+°¦6†V6²F–ÖRæB6†'B6÷VçBâ6ö×&S+ó\+öâ6†ÆÆ÷r&VæG2Â6†'W"6÷&æW'2&WF–à§6V×3²w&VFW"ævÆW2Ö’7G&WF6‚âUbVF—F÷"õ6²õVæFõ&VFó²–çBæB6fT÷Vâ&W7VÇBà¤æWrÆ–Ö—G3C“ff6W2ó#¶6÷&æW'2Âæ÷BVæÆ–Ö—FVBâæW‡BföÆÆ÷r&VÂ•BVÆ—G’öÆFVæ7¦fVVF&6²&Vf÷&R'&öFVæ–ærVçw&³“SRÖçVÂ7F—F6‚FWf–6RvFR&VÖ–ç26W&FRà ¢22W6W"&öGV7BF—&V7F–öâ(	B–çBÂf6Vw&÷W2æBw&†–6ÂT’(	B#Bö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’6—2F†W6R&ReUEU$RuT”DTÄ”äU2Âæ÷B–ÖÖVF–FR&WVW7G2Fò–×ÆVÖVç@¦ÆÂöbF†VÒ–ã“Sbâ&W6W'fR7W'&VçBFÆ2'V–ÆB66÷RâgWGW&RF—&V7F–öã ¢Ò–çBf6Vw&÷W2F—&V7FÇ’öâF†RÖW6ƒ¢76–vâW†—7F–ærÖW6‚æf6Tw&÷W2W"öÇ–vöâÀ¢æ÷B$t"FW‡GW&R—†VÇ2âW†—7F–ær6ÆöæRö†—7F÷'’÷&ö¦V7Bôô$¢ôäôÒw&÷W÷væW'27F¢WF†÷&—FF—fRâ&WW6R7W&f6Rf6R–6¶–ærõVæ6–Âöæf–vF–öã²UbÖg&VRw&÷W×F&vW@¢æVVG2FVÆ–&W&FRF&vWBfÆ–FF–öâ&F†W"F†â&WFVæF–ær7W'&VçBUb–çFW"Ç&VG¢7W÷'G2—BâöæR66VæR6†V6·ö–çBW"7G&ö¶S²æò&ÆÆVÂÖW6‚öw&÷Wö†—7F÷'’¶W&æVÂà¢Ò'&–ær&öGV7F–öâ–çB–çFòÖ–ç7G&VÒ66W73²7W'&VçBf–Ww÷'B×–çBæ§2ÆVæ6†W ¢—2–âf–ÆRâ&V6öææV7B÷&–v–æÂ–çFW"÷6W76–öâÂæ÷B6V6öæB–çF–ær–×ÆVÖVçFF–öâà¢Ò6öçFW‡GVÂ–çB&F–Âf÷"''W6†W2æBÆ–W'2öÖ6·2Â&WF–æ–ær÷&–v–æÂ6öçG&öÇ2ð¢7F–öâ÷væW'2æBF†R66WFVBÆVgBFö6²VçF–ÂFVÆ–&W&FVÇ’Ö–w&FVBæBFW7FVBà¢ÒÖ÷&Rw&†–6ÂT“¢6öç6—7FVçBgVæ7F–öâ–6öç2v—F‚4ÔÄÂd•4”$ÄRFW‡B6F–öç2&VÆ÷rÀ¢–ç7—&VB'’W6W"w2WÆöFVBæöÖB67VÇB67&VVç6†÷CCd3dC32Ó“rÓC”RÔ3cbÓS$#“D#„CƒCà¢¶VW&VF&ÆRÆ&VÇ2ö66W76–&–Æ—G’÷F÷V6‚F&vWG3²6ö†W&VçB–6öâfÖ–Ç’æB7F—fR7FFRà¢7FvR6†ævW2–â6ÖÆÂ&Wf–WvVB7W&f6W3²&WF–â66WFVB&F–ÂÆö6F–öç2ÂvW7GW&W2À¢fö7W2Â†—7F÷'’æBÖöFVÆÆW"&V†f–÷"âæòv†öÆW6ÆR&W6¶–âWFöÖF–6ÆÇ’WF†÷&—¦V@¢2F†RæW‡BVçFW7FVB6†ævRâF†W6RF—&V7F–öç2&VÖ–â–â&öFÖgFW"FÆ2fVVF&6²à ¤VF—C¢ÖW6‚æ§27F÷&W27G&–æröçVÆÂf6Tw&÷W2æB&W6W'fW2F†VÒöâ6ÆöæS²÷&–v–æÀ¦f6Vw&÷WÖ6öÆ÷W'2Ö6÷&RF—7Æ—2F†VÒâ&Wf–WrÇ&VG’†26÷W&6RÖf6RG&–ævÆRÖ–ærà£“SbFöW2æ÷B6†—f6Vw&÷W''W6†W2ÂæWr–çBVçG'’Â–çB&F–Â÷"–6öâ&VFW6–vâà ¢ã“Sbf–æÂÆö6ÂæöFS#Bã’ãgVÆÂ&Vw&W76–öã¢¢£#s“b52òd”Âò6¶—VB¢ ¢ƒãW2’Â÷&–v–æÃ#sƒ’ÇW26WfVâæWrFÆ2öævÆR÷6fRÖæÖR6†V6·2âfö7W6VBFÆ3“C’ð£“Só“SÂ7WC“S2÷7F—F6ƒ“SRÂ6²öFVç6—G’÷&VÆV6SS52âöæÇ’÷&–v–æÂÆ–Ö—BÖ&÷VæF'¦f—‡GW&W2Ö÷fVBFò&WVW7FVCC“s²FöÖ–2&VgW6ÂæB&–÷##‚7V66W72&WF–æVBà¤÷&–v–æÃ“SæVÂf—‡GW&RW‡Æ–6—FÇ’6†ö÷6W3+VæFW"æWrT’ævÆRf÷'v&F–ærâæð§6¶—VB&V†f–÷"6†V6·2â&Wf–WvVC‚Öf–ÆRUbôFBô×VÇF’ôÆ"&WfW'6R66†R6Æ÷7W&S“Sc°¦Ö–â÷–6¶–æs“SBöv—¦Öó“SR÷v÷&·76S“S"ô×VÇF“ãög&÷¦VâVæ6†ævVBâ6fRô÷Vâ÷væW"Ç6ð§Væ6†ævVC²6f&’W‡FW&æÂÖF÷væÆöB÷fW'w&—FRÆ–Ö—FF–öâfW&–f–VBg&öÒ&–Ö'’6÷W&6W2à¤†÷7FVBõvW2öÆ—fR&ööbföÆÆ÷w2âæó“SR÷#“SbFWf–6R52–æfW'&VBà  ¢22ã“SbV&Æ–6F–öâfW&–f–VB(	B#Bö7Fö&W"##` ¥'VçF–ÖR6öÖÖ—Bc#s“fVCS&V&f#“c“–CV#–3VSƒs“&#““V&öâÖ–ã²W†7BFW7FVBG&VP¦#s&&#ƒf3sc–S†6ƒSF&c“†66c3–CƒV3FSCƒ&C†âÆö6ÂæöFS#Bã’ã£#s“b52À£d”Âó6¶—VBƒSãf×2“²fö7W6VBFÆ2÷6²öFVç6—G’÷&VÆV6S£S52à¤†÷7FVBæöFS#"F÷öÆöw’&Vw&W76–öâ'VãCCss33cRö¦ö##s33ƒsscB5T44U53 £#s“b52Ãd”Âó6æ6VÆÆVBó6¶—VBƒCcC#ã&×2’Â6ö×ÆWFVC##bÓÓ#EC£#£Ce¢à¦‡GG3¢òöv—F‡V"æ6öÒô7&—4&W§¢ô&÷„Æ"ö7F–öç2÷'Vç2óCCss33cP¥vW2'VãCCss333s5T44U52â66†RÖ'W7FVBV&Æ–2tUG3£#ó#'—FRÖ–FVçF–6ÂFòFW7FV@¦6†V6¶÷WBÂ–æ6ÇVF–ærfW'6–öâö–æFW‚ÂÆÃ‚&Wf–WvVBUbôFBô×VÇF’ôÆ"6†ævVB76WG2À§&VÆV6RÆöFW'2Â&÷FV7FVC“SBÖ–â÷–6¶W"÷FövvÆRöVFvR×–çBÃ“S"v÷&·76RÃ“SRv—¦ÖòÀ£“36vR&F6†–ærÄ×VÇF“ãæBg&÷¦Vâ&WFrÖ&¶W"âf—'7B&RÖFWÆ÷–ÖVçBtUB&WGW&æV@¦öÆB'VçF–ÖS²g&W6‚&WVW7G2gFW"FWÆ÷–ÖVçBÖF6†VBWfW'’f–ÆRâæòÖ—†VBÆ—fR'V–ÆBà¦‡GG3¢òöv—F‡V"æ6öÒô7&—4&W§¢ô&÷„Æ"ö7F–öç2÷'Vç2óCCss333s  ¥&VG’f÷"DUd”4S“Sc¢&Wf–÷W6Ç’÷fW##‚Öf6RVç–çFVBÖöFVÂ(i"ö&¦V7BUb(i"WFòFÆ0£\+²–ç7V7B—6ÆæG2÷F–ÖRâ6ö×&S+ó\+6†ÆÆ÷r&VæG2æB6†'6VÒ&WFVçF–öâà¥VæFòõ&VFòÂ–çBæWrÖÂF†Vâæ&÷†Æ"6fRô÷Vâ6†÷VÆB&W6W'fRUg2æB–çBà£“S2ó“SBó“S"52&÷FV7FVBâæó“SRó“SbFWf–6R52–æfW'&VBâgWGW&Rf6Vw&÷W''W6†W2À¦Ö–ç7G&VÒ–çB66W72Â–çBöÆ–W"&F–ÂæB6F–öæVB–6öâT’&VÖ–â&V6÷&FV@§&öFÖF—&V7F–öç3²æöæR&R'Böc“Sb'VçF–ÖRâ6f&’÷fW'w&—FRÆ–Ö—FF–öâ&VÖ–ç0¦'&÷w6W"Ö÷væVC²6fRô÷Vâf–ÆVæÖR÷væW"Væ6†ævVBâFö72ÖöæÇ’&ööb6öÖÖ—BföÆÆ÷w2à ¢22ã“Sr(	Bf&–&ÆR×6—¦R6†VÆb6¶–æs²ã“Sb52(	B#Bö7Fö&W"##` ¥W6W"ã“Sb52öæW‡F'V–ÆB&÷FV7G2ævÆRWFòFÆ2æBÆ&vW"Æ–Ö—G2âVF—BÖ–à£ƒ&FFcFS¢6¶VDÆ–÷WBÆÆö6FW2–FVçF–6Â6VÆÇ2W6–ærÆ&vW7B6†'B&÷VæG3²÷&–v–æÀ¥Ubv÷&·76R7F–ÆÂF—6&ÆVB6²öFVç6—G’&÷fS#‚FW7—FSC“bÖ6&ÆR÷væW"à¤W‡FVæB4ÔR6¶VDÆ–÷WBv—F‚†V–v‡B÷v–GF‚ô”B6÷'FVBæW‡BÖf—B6†VÇfW2æC#B&÷VæFV@¦6öÖÖöâ×66ÆRG&–Ç2â6†ö÷6RöæÇ’–b6öÖÖöâ66ÆR7G&–7FÇ’–×&÷fW2÷fW"÷&–v–æÀ¦w&–C²WVÂ×6—¦VB6†'G2&WF–â÷&–v–æÂw&–Bâæò6†'B&÷FF–öâÂ6†RæW7F–ærÀ§&VÆ†F–öâÂ6VÒ6†ævW2÷"÷F–ÖÂ×6¶–ær6Æ–Òâ6÷W&6RvVöÖWG'’æB÷&–v–æÀ¥Ubö†—7F÷'’÷–çB&VgW6ÂöçVÖW&–2Ö6öÆÆ6RfÆ–FF–öâ&WF–æVBâÆÂ6ÆÆW'2„WFòð¤f6RFÆ2Â6²Â7WBõ7F—F6‚&W6²’&WW6R÷&–v–æÂ÷væW"âv÷&·76R6²öFVç6—G¦æ÷rVæ&ÆVBF‡&÷VvƒC“b—6ÆæG2âÖ&v–âæB6÷VçBÖFWVæFVçBv2Væ6†ævVBà¤æWrFW7G2fW&–g’Ö—†VB×6—¦R6÷fW&vRÂ6öÖÖöâ&VÆF—fRFVç6—G’Â6W&F–öâÂ&÷VæG2À¦FWFW&Ö–æ—6ÒÂWVÂ×6—¦RfÆÆ&6²æB7GVÂv÷&·76S#’óC“bóC“r6öçG&öÂvF–ærà¥fÆ–FF–öã¢gVÆÂ7V—FS#s“u52ód”Âó6¶—ƒ“‚ã‡2’ÂÇW2GvòæWr6†VÆbFW7G0¥526W&FVÇ’†FFVBgFW"gVÆÂ'VâVçVÖW&FVBf–ÆW2“³#s“’F—7F–æ7BFW7G26÷fW&VBà¥&VÆV6R¶æWr6¶–ær÷v÷&·76Rfö7W6VC52âæò76W'F–öç2&VÖ÷fVB÷&VÆ†VBà¥V&Æ—6†VB'VçF–ÖR63f#v3#CƒƒsSv3#ƒ–3CfS3C†6SCC3s²W†7BFW7FVBG&VP¦3#&C6#f&fSs†63cC3–##ƒfFC†&##cVfW&–f–VB&Vf÷&RWFF–ærÖ–âà¥vW3CcsSSs"5T44U53³"ó"V&Æ–2f–ÆW2'—FRÖÖF6‚†ÆÂ6†ævVB'VçF–ÖRö66†P¦ÆöFW'2ÇW2&÷FV7FVBÖ–ã“SBô×VÇF“ã’â†÷7FVB&Vw&W76–öãCcsSS“c"ö¦ö##s“3sSc3sR5T44U53²6ö×ÆWFR†÷7FVBÆöw0§fW&–g“#s“•52ód”Âó6¶—âÆö6ÂgVÆÂæBfö7W6VB6†V6·2&÷fR76VBà¤æòFWf–6S“Sr52–æfW'&VBâFö72ÖöæÇ’&ööb6öÖÖ—BföÆÆ÷w3²'VçF–ÖRVæ6†ævVBà¥&Wf–WvVB&WfW'6R66†Rw&ƒ“Ss²Ö–ã“SB÷–6¶W#“SBöv—¦Öó“SRô×VÇF“ãög&÷¦VâVæ6†ævVBà¤DUd”4S“Ss¢Vç–çFVBf&–VB×6—¦RÖW6‚(i"WFòFÆ2(i"–ç7V7B6¶–æs²W†—7F–ærU`¦Æ–÷WB(i"6²ÆÃ²VæFõ&VFó²–çBF†Vâ6fT÷Vââ–çFVBF&vWG2&WV—&R6ÆV"–ç@¦&Vf÷&RUb&W6¶–ærâ&–vvW"6†'B&÷VæF–ær&÷†W2Fòæ÷BwV&çFVRF–v‡B6öæ6fRæW7F–ærà¤æW‡BföÆÆ÷r7GVÂ6¶–ærVÆ—G’öFWf–6RF–Ö–ær&Vf÷&R'&öFW"Vçw&÷"T’6†ævW2à ¢22ã“S‚(	BUb÷W6Æ—–ær6öçF–æÖVçB(	B#Bö7Fö&W"##` ¥W6W"67&VVç6†÷Bd”$#c”Böã“Sr6†÷w2&–v‡BFööÆ&"æB&÷GFöÒ7FGW2F—6V&–æp¦BF†R4ÔRfW'F–6Â&÷VæF'’v†–ÆRUbDôôÅ2÷W—2÷VâÂ&Vf÷&RUbv÷&·76Rà¤æ÷B7FÆR6†VÆÃ²æ÷BWf–FVæ6Rv–ç7C“Sr6¶–ærâæó“SrFWf–6R52–æfW'&VBà¤VF—B6†&VBFööÂ×6W76–öâ×V’&Vv–ã¢UbFööÇ2W6W2G&ç6f÷&ÖVB67&öÆÆ–ær6†&VBFö6²à¤W†—7F–æs“S"v÷&·76R6–&Æ–ærf—‚FöW2æ÷BÇ’FòF†—2&V6VF–ær÷Wà¤æ'&÷rÖ—F–vF–öã¢÷&–v–æÂUb×FööÇ2†÷7BW6W2ÆVgB÷&–v‡C‡‚²WFòÖ&v–ç2–ç7FV@¦öbG&ç6ÆFU‚6VçG&–ærÂÆö6Â—6öÆF–öâæBÆ–÷WB÷–çB6öçF–æÖVçBâ÷&–v–æÂæöFW2À¦Æ—7FVæW'2Âv–FR&öG’ö7F–öç2Â†—7F÷'’æBÆÂUbÆv÷&—F†×2Væ6†ævVBâ6ÆV"F†W6P¥UbÖöæÇ’7G–ÆW2&Vf÷&RF†RæW‡BFö6²†–æ6ÇVF–ærÆVgB–çB“²÷&F–æ'’FööÇ2¶VW §6†&VBÆ6VÖVçBâæòæWrVF—F÷"Âö–çFW"Æ—7FVæW"Â&W6—¦RöÆÆ–ær÷"¢Ö–æFW‚W66ÆF–öâà¤W†7B•BõvV$¶—B6ö×÷6—F÷"f–ÇW&R—2äõB&W&öGV6VB†W&S²F†—2—2F&vWFV@¦6öçF–æÖVçB&W—"&WV—&–ærFWf–6R66WFæ6RÂæ÷B&÷fVâ'&÷w6W"ÖVæv–æRF–væ÷6—2à¤æWrFW7BW†V7WFW2÷&–v–æÂ&Vv–âf÷"Un(i%–çN(i&÷&F–æ'’FööÂæBfW&–f–W266÷VB6Æ—À§G&ç6f÷&ÒÖg&VRUbÆ6VÖVçBæB7G–ÆR6ÆVçWâ&VÆV6R6öçG&7Bö66†R¶W—2&Wf–WvVC“Sƒ°¦Ö–ã“SB÷–6¶W#“SBô×VÇF“ãög&÷¦VâæC“Sr6¶–ær÷v÷&·76RVæ6†ævVBà¤DUd”4S“Sƒ¢&WVBö&¦V7N(i%UbæB6Æ÷6RÂvF6‚gVÆÂF÷×&–v‡BFööÆ&"÷7FGW3²WFòFÆ2À¤÷VâUbVF—F÷.(i$&6²Fó4BÂF†Vâ–çBæBæ÷F†W"FööÂFò6†V6²÷W÷6—F–öç2à¤æW‡B7GVÃ“S‚•B6Æ—–ær&WFW7B&Vf÷&RgW'F†W"Vç&VÆFVBFWfVÆ÷ÖVçBà¤–æ—F–ÂgVÆÂ'Vâf÷VæBöæRöÆCs76W'F–öâ&WV—&–ærÆVgCSRf÷"Ub2vVÆÂ0¦÷&F–æ'’FööÇ3²WFFVBöæÇ’UbW‡V7FF–öâFò–ç6WC‡‚÷&–v‡C‡‚öæò×G&ç6f÷&ÒÀ§&WF–æ–ærWfW'’÷F†W"ÆVæ6‚ö6Æ÷6Rö†—7F÷'’6†V6²âfö7W6VC#52âf–æÂgVÆÂ×'Vã#ƒ52ód”Âó6¶—ƒ“Bã“W2’âV&Æ–6F–öâWf–FVæ6RföÆÆ÷w2âæó“Sr6¶–ær6÷W&6R6†ævVBà ¢ã“S‚V&Æ–6F–öã¢'VçF–ÖS†FV&CCVCcƒ#VC#†S“VfSCƒfSCC“–#–SRöâÖ–âà¥FW7FVBG&VS&ƒf3Cs3VCCVSSv#&6#fc##FS#c666&BÖF6†VBWÆöFVBv—BG&VRW†7FÇ’à¤Æö6Âf–æÃ#ƒ52ód”Âó6¶—²fö7W6VC#52âvW3CcƒSƒscƒ5T44U52à¤ÆÃ26†V6¶VBV&Æ–2f–ÆW2'—FRÖÖF6‚FW7FVB6†V6¶÷WC¢6†VÆÂ÷fW'6–öâöæWr6W76–öâT’À§&WF–æVC“SrUb÷6¶–æröÆöFW'2æB&÷FV7FVBÖ–ã“SBô×VÇF“ãâæò6¶–ærÆv÷&—F†Ð¦6†ævW3“S‚â†÷7FVB&Vw&W76–öãCcƒSƒƒ“Rö¦ö##s“c“C#B5T44U53£#ƒ52ód”Âó6¶—à¤7GVÂ–çFW&Ö—GFVçB•Bf–ÇW&Ræ÷B&W&öGV6VC²DUd”4S“S‚÷Wö†VFW"÷7FGW2&WFW7@§&WV—&VBâæó“Sró“S‚FWf–6R52–æfW'&VBâFö72ÖöæÇ’V&Æ–6F–öâ&ööbföÆÆ÷w2à ¢22ã“S’(	B&V6öææV7B&öGV7F–öâ–çB–âö&¦V7B&F–Ã²ã“S‚52(	B#Bö7Fö&W"##` ¥W6W#“S‚52öæW‡F'V–ÆB&÷FV7G2Ub×÷Wö†VFW"÷7FGW26Æ—–ær&W—"æB7G–ÆP¦6ÆVçW7&÷72Un(i%–çN(i&÷&F–æ'’FööÇ2â&–÷"VæF–æs“S‚FWf–6Ræ÷FW27WW'6VFVBà¤VF—BÖ–ãƒSSCFvS¢÷&–v–æÂö&¦V7B×&F–Â×6W76–öâÇ&VG’Ö2Ub–çBFò÷&–v–æÀ§f–Ww÷'E–çD'Fâ÷Wb×–çBõõö&÷†Æ%f–Ww÷'E–çBÂ'WBF÷FÂÖv—¦Öò&–æröÖ—GFVB'WGFöâà¤FBUb–çBB÷WFW#C\+&F—W3#3²WfW'’W†—7F–ær6V7F÷"7F—2–âÆ6Râ÷&–v–æÀ¦FFW"ÆVæ6†W24ÔR&öGV7F–öâ–çFW"Â÷vç26æ6VÆÆF–öâö6ö×ÆWF–öâöv—¦Öò†–FS°¦W†—7F–ærf–ÆRÆVæ6†W"&WF–æVBâ–çFW"÷Vç2ÆVgBFö6²æBVæf÷&6W2÷&–v–æÂöæP¦7F—fR–æFWVæFVçBUbö&¦V7B÷–çBF&vWBwV&G2âæòæWr''W6‚öÆ–W"ö†—7F÷'’ö–çW@¦÷væW"Âæò–çFW"6†ævW2÷"–6öâ÷fW&†VÂâ÷&–v–æÂÆVgB–çBW†6WF–öâ&WF–æVBà¤W‡FVæB÷&–v–æÃs–çfVçF÷'’öÆVæ6‚ö6Æ÷6R÷76–ærf—‡GW&Rv—F‚Ub–çC²ÆVgC‡€¦W‡V7FF–öâ–æ6ÇVFW2÷&–v–æÂ–çBFö6²ÂÆÂöÆB76W'F–öç2æB÷6—F–öç2&WF–æVBà¤Æö6ÂgVÆÃ#ƒ52ód”Âó6¶—ƒ“Rã“—2“²fö7W6VC•52Âf–æÂ&F–ÃE52à¤æò76W'F–öç2&VÖ÷fVBâV&Æ–6F–öâWf–FVæ6RföÆÆ÷w2âöæÇ’'VçF–ÖRgVæ7F–öæÆ—G“¢öæR&F–À¦'WGFöã²6†VÆÂ÷&V6÷fW'’öv—¦Öò66†R–ã“S’æB&Wf–WvVB76WB6öçG&7Bâ6W76–öã“S‚À¦Ö–ã“SB÷–6¶W#“SBô×VÇF“ãõUc“Sr÷6¶–ærög&÷¦VâVæ6†ævVBà¤DUd”4S“S“¢6VÆV7BöæRUbö&¦V7B(i"ö&¦V7B&F–Â(i"Ub–çB†÷WFW"WW"×&–v‡B“°¥Væ6–Â–çBÂf–ævW'2÷&&—B÷â÷–æ6‚ÂVæFõ&VFò7F—2–â–çC²Föæ^(i'&F–Î(i'&V÷Và§6ÖRÆ–W'2âG'’Ub÷W(i&6Æ÷6^(i%–çBæB–çN(i$Föæ^(i&æ÷F†W"FööÂâ6fT÷Vâ&WF–ç0§–çBâf–ÆR–çBVçG'’7F–ÆÂv÷&·2â–çfÆ–BöæòÕUbF&vWG2&WF–â÷&–v–æÂ&VgW6Âà¤æW‡BfVVF&6²öâÖ–ç7G&VÒ66W72&Vf÷&R6W&FR–çB×FööÂöÆ–W"&F–Â'V–ÆBà ¢ã“S’'VçF–ÖSSv6#6VSƒfFFcCƒsVS3–fFC“Ff6S†33ƒƒ‚V&Æ—6†VBöâÖ–ã²WÆöFV@§G&VSCƒ#vc63#VSƒVS–#C##sfSS“#Cs66VVCcbW†7FÇ’WVÇ2FW7FVBÆö6ÂG&VRà¤Æö6Ã#ƒ52ód”Âó6¶—Âfö7W6VC•52Âf–æÂ–çfVçF÷'’öÆ–fV7–6ÆSE52â†÷7FV@§&Vw&W76–öãCc“Ccö¦ö##s“ƒS“s5T44U53£#ƒ52ód”Âó6¶—°¥vW3Cc“C“#B5T44U52à¤ÆÃb6†V6¶VBV&Æ–2f–ÆW2'—FRÖÖF6‚FW7FVB6†V6¶÷WB‡6†VÆÂ÷fW'6–öâöæWrv—¦ÖòÀ¦÷&–v–æÂ–çFW"öFFW"÷6W76–öã“S‚õUc“Sr÷6¶–æröÖ–ã“SBô×VÇF“ãæBÆöFW"w&‚’à¥W6W#“S‚52W‡Æ–6—FÇ’&÷FV7FVC³“S’†æG2ÖöâvFR&VÖ–ç26W&FRâæó“Sr6¶–æp¥52–æfW'&VBæBæò6¶–ær÷–çBõUb÷6W76–öâÆv÷&—F†Ò6†ævVB–ã“S’à ¢22ã“c(	B6F–öæVB''W6‚×FööÂ&F–Â–â–çBFö6³²ã“S’52(	B#Bö7Fö&W"##` ¥W6W#“S’52öæW‡F'V–ÆB&÷FV7G2÷&–v–æÂö&¦V7B&F–ÂUb–çB66W72æB66WFV@£“S‚6Æ—–ærf—‚âVF—B7W'&VçC“–cvC¢–çFW"w2–çBÖ7F–öâ6VÆV7B÷vç2FööÀ§6WGF–æw2ö6†ævR6æ6VÆÆF–öâÂ''W6‚ôf–ÆÂôW&6W"õ6×VFvRô&ÇW"Ç&VG’–×ÆVÖVçFVBà¥&WÆ6Rf—6–&ÆR6VÆV7Bv—F‚æF—fRFWF–Ç2''W6‚FööÇ2–6¶W"–â4ÔR–çBFö6³°¦÷&–v–æÂ6VÆV7B&VÖ–ç2†–FFVâ26WGF–æw2öWfVçB÷væW"âf—fScl9sS'‚'WGFöç2öâ£##‚&F–ÂÂ5drgVæ7F–öâ–6öç2æBf—6–&ÆR6F–öç3²6VÆV7FVB&–×&W76VB†–v†Æ–v‡@¦æB6öÆÆ6VB7W'&VçB×FööÂ6F–öââV6‚6Æ–6²6†V6·2÷&–v–æÂ7F—fRöF—6&ÆVBvFRÀ§6WG2÷&–v–æÂ6VÆV7BæBF—7F6†W24ÔR6†ævRWfVçB†6ÆV"7FvVB–ÖvRö6æ6VÂÆ—fP§7G&ö¶R÷7–æ26öçG&öÇ2’â–6¶W"6Æ÷6W2öâ6†ö–6RæB6W76–öâVæBâòF—6&ÆVB6VÆV7F–öà¦—2Ö—'&÷&VBâæòæWrf–Ww÷'B–çWBÂ''W6‚&7FW"ö†—7F÷'’÷–çB&W6÷W&6R÷"Æ–W"÷væW"à¤66WFVBÆVgBFö6²öfö÷FW"öÆ–W'2÷6WGF–æw2övW7GW&R÷FööÂ÷6—F–öç2&WF–æVBâæòÆ–W §&F–ÂÂf6Vw&÷W2÷"'&öB&W6¶–â–ã“c²7FvVBw&†–6ÂT’öæÇ’öâF†W6SRFööÇ2à¥Gvò7GVÂ&öGV7F–öâT’–çFVw&F–öç3¢ÆÃRFööÇ2ö6F–öâ÷6VÆV7F–öâö&ÇW"6öçG&öÇ2ð¦æò†—7F÷'’æBF—6&ÆVB&VgW6Ã²Æ—fRVæ6–Â7G&ö¶^(i'&F–Â7v—F6‚6æ6VÇ2÷&–v–æÀ¦6öçF7Bv†–ÆR&WF–æ–ær6öÖÖ—GFVB–çBö†—7F÷'’æBæf–vF–öââ–æ—F–ÂæWrf—‡GW&P§&VB&–×&W76VBg&öÒ&÷W'G’–ç7FVBöbW†—7F–ærGG&–'WFW2Ö²6÷'&V7FVBFW7@¦66W72Âæò&öGV7F–öâv÷&¶&÷VæB÷"÷&–v–æÂ76W'F–öâ&VÖ÷fVBâæWr·&VÆV6Su52À¦÷&–v–æÃ“T’ö6÷&R·&VÆV6S%52âgVÆÂÆö6Ã#ƒ%52ód”Âó6¶—ƒ“rã#2“²V&Æ–6F–öâWf–FVæ6RföÆÆ÷w2à¤DUd”4S“c¢ö&¦V7N(i%Ub–çN(i$''W6‚FööÇ3²–ç7V7B–6öç2ö6F–öç2Â–6²''W6‚ôW&6W"ð¤f–ÆÂô&ÇW"õ6×VFvS²–6¶W"6öÆÆ6W2æB7W'&VçBFööÂ6F–öâföÆÆ÷w2â–çBõVæFõ&VFòÀ¦f–ævW"æf–vF–öã²Föæ^(i'&V÷VâæBfW&–g’6ö×7BFö6²öÆ–W'2âUb÷W6Æ—–æp¦æC“S’ö&¦V7B&F–ÂVçG'’&VÖ–â&÷FV7FVBâæW‡BfVVF&6²&Vf÷&RÆ–W"öÖ6²&F–Âà ¢ã“cV&Æ–6F–öã¢'VçF–ÖScc–C#s“CFf3Cv3ƒc3–Ss&S33“F#C3FSF#F"öâÖ–ã°¦W†7BFW7FVBG&VV#&C†63ƒVSsƒsS–CfS6#f3ff36CƒCVcc“SƒbÖF6†VBv—BWÆöBà¤Æö6Ã#ƒ%52ód”Âó6¶—ƒ“rã#2“²æWr÷&VÆV6Su52æB÷&–v–æÃ“÷&VÆV6S%52à¥vW3CsCC#c’5T44U53³bób6†V6¶VBV&Æ–2f–ÆW2'—FRÖ–FVçF–6ÂFòFW7FVB6†V6¶÷WC §6†VÆÂ÷fW'6–öâöæWr–çFW"Â&WF–æVC“S’v—¦ÖòöFFW"Ã“S‚6W76–öâ†÷7BÃ“SrUb÷6¶–ærð¦ÆöFW'2ÂÖ–ã“SBô×VÇF“ãæBÆ"w&‚â†÷7FVCCsCC#cS‚ö¦ö##ƒSSCC#ƒ5T44U53£#ƒ%52ód”Âó6¶—à¥W6W#“S•52&÷FV7FVBâDUd”4S“c–6öâ76–ær÷6VÆV7F–öâ÷–çBöæf–vF–öâö†—7F÷'¦66WFæ6RVæF–æs²æòFWf–6R52–æfW'&VBâ÷&–v–æÂÆ–W"öÖ6²6öçG&öÇ2&VÖ–âà ¢22ã“c(	B&÷VæB†–FFVâv—¦Öò&ö¦V7F–öâæB5dr6ö×÷6—F÷"7W&f6S²ã“c&F–Â50 £#Bö7Fö&W###bâW6W#“c52f÷"''W6‚&F–Ã²6W&FVÇ’&W÷'G2v–çB&VBöw&VVà¦Æ–æW2gFW"–çBFöæRæB&V7W'&–ær&–v‡B×6–FRT’F—6V&æ6RföÆÆ÷v–ærUbFööÇ2ð¦Öf–Ww2Â6†æv–ær2v—¦Öòöö&¦V7B÷&&—G27&÷7267&VVââ&–÷#“S‚6Æ—–ær52—0¦†—7F÷&–6Ã²&V7W'&Væ6R—2õTâæBæ÷BF—6Ö—76VB'’&–÷"52÷"æöFR&W7VÇG2à¥&Wf–WvVBWÆöFVCT3CC“ƒ67&VVç6†÷BæC’ãw267&VVå&V6÷&F–æsrÓÓ3Rg&ÖW32ów2à¥f–FVò6†÷w2Æ—fRÖöFVÂöv—¦Öòv†–ÆR†VFW"öö&¦V7BT’F—6V'2âW†7B•B6ö×÷6—F÷ ¦fVÇB&VÖ–ç2Vç&W&öGV6VBÆö6ÆÇ“²Fòæ÷B6Æ–Ò&÷fVâvV$¶—BVæv–æRF–væ÷6—2à¤VF—B7W'&VçC6#F“¢F÷FÂÖv—¦Öò7–æ26WG2&ö÷Bæ†–FFVâGW&–ær–çB'WB7F–ÆÂ6ÆÇ0§7–æ4†—5f—7VÇ2â&ö¦V7FVE&–æuF‚W6W24•¤S“böÖ‚ƒÆ†–FFVå&V7Bçv–GFƒ“¢†–FFVà§&ö¦V7F–öâÖvæ–f–W2&–ær6ö÷&F–æFW3“l9s²&ö÷BG&÷×6†F÷rf–ÇFW"æB÷fW&fÆ÷v–æp¦Ö–â5drÆÆ÷rVæ÷&Ö÷W2–çBöf–ÇFW"&÷VæG2â&÷F‚f–ÇW&W2ÆW6–&Ç’6†&RF†—0§Væ&÷VæFVB&W6VçFF–öâ7W&f6RÂVæÆ–¶R&Wf–÷W2÷WÖöæÇ’Ö—F–vF–öâà¥&W—"4ÔRv—¦Öò÷væW#¢æò†—2WFFRv†–ÆR†–FFVã²&ö¦V7FVE&–æuF‚&WGW&ç2V×G¦f÷"†–FFVâ÷¦W&òöæöæf–æ—FRF–ÖVç6–öç2÷"ç’æöæf–æ—FRö÷WBÖöbÖÆö6Ã“l9s“b&–ærö–çBà¤FVvVæW&FR&–æw26ÆV"&÷F‚f—6–&ÆRæB†—BF‡2F‡&÷Vv‚W†—7F–ær7–æ2÷væW#°¦†–FFVâv—¦Ö÷26¶—WFFW2æB&V6ö×WFRæ÷&ÖÆÇ’v†Vâ6†÷vâà¥&VÖ÷fR&ö÷BG&÷×6†F÷rf–ÇFW#²&÷VæBöæÇ’F—&V7BÖ–â5dr÷fW&fÆ÷râW‡FW&æÂ&F–À§6V7F÷'2ö6÷&æW"6†÷'F7WG2&VÖ–â÷WG6–FRÖ–â5dræB¶VW÷&–v–æÂÆ6VÖVçBö–çWBà¤æòG&ç6f÷&ÒvVöÖWG'’ÂvW7GW&RÂUb÷–çBö†—7F÷'’÷&VæFW"¶W&æVÂ÷"×VÇF“ã6†ævW2à£“S’&F–Âó“c''W6‚6öçG&öÇ2æC“S‚÷W6öçF–æÖVçBVæ6†ævVBâF†—2F&vWG2F†P¦7GVÂ†–FFVâ6—¦–ærFVfV7BæB6öç7G&–ç2&VæFW&–æs²•B&WFW7B—27F–ÆÂ&WV—&VBà¥GvòFW7G2W†V7WFR÷&–v–æÂ&–ærgVæ7F–öç2v—F‚&VÅF‡&VRW'7V7F—fR6ÖW&¢æ÷&ÖÀ¥…•¢F‡2Â†–FFVî(i'¦W&þ(i'&W7F÷&RW†7B&V6÷fW'’Âf–æ—FRÆö6Â6ö÷&F–æFW2Â–çfÆ–@§&ö¦V7F–öâ&VgW6Ã²†–FFVâ7–æ2wV&BöÖ–â5dröf–ÇFW"66÷RæB&WF–æVBW‡FW&æÀ¥–çB'WGFöâ÷6†÷'F7WB6öçG&7G2âfö7W6VCu53²Æö6ÂgVÆÃ#ƒE52ód”Âó6¶—ƒBãs72’âV&Æ–6F–öâWf–FVæ6RföÆÆ÷w2à¤DUd”4S“c¢–çN(i$FöæRöâ6ÖRÖöFVÃ²æòv–çB6öÆ÷W&VBÆ–æW2â&WVBUbFööÇ>(i%U`¤VF—F÷.(i$&6²ô6Æ÷6S²÷&&—BÖöFVÂöv—¦Öò–çFò&–v‡B6–FRæBvF6‚VçF—&RFööÆ&"ôö&¦V7@¤'&÷w6W"÷7FGW2&VÖ–âf—6–&ÆRâÖ÷fRõ&÷FFRõ66ÆRæB&F–ÂFööÇ27F–ÆÂW6&ÆS°¥–çBõVæFõ&VFòæBf–ævW"æf–vF–öâ&W6W'fVBâæW‡B7GVÃ“c&VæFW&–ærfVVF&6°¦&Vf÷&RVç&VÆFVBfVGW&W2â–b&V7W'&Væ6RW'6—7G2Â¶VW–æFWVæFVçB6Æ—–ær&W÷'@¦÷VâæB–ç7V7B÷F†W"f–ÇFW&VBö÷fW&fÆ÷v–ærÆ–W'3²Fòæ÷B–æfW"66WFæ6Rà ¢22–çBT’F—&V7F–öâ6Æ&–f–VB'’W6W"(	B#Bö7Fö&W###` ¥W6W"6—3“cFö6²Ö6öçF–æVB&F–ÂÖ—7VæFW'7FööB–çFVçBâFW6—&VB4ÔRfÆöF–æp§f–Ww÷'B&F–ÂF†VÖR2fW'FW‚ôVFvRôf6Rôö&¦V7BÂv—F‚–çB6öçFW‡Bâ6†ö÷6R''W6ƒ §&F–ÂF—6V'3²6ö×7BÂ6÷'&V7FÇ’6—¦VB6öçFW‡GVÂ6WGF–æw2BDõ4TåE$S°§&VÖ–æ–ærf–Ww÷'B6ÆV"f÷"–çF–ærâ†öÆBTÕE’$4´u$õTäBFò&V÷Vâ–çB&F–ÂÀ¦6†ö÷6R&ÇW"öWF2ÂF†Vâ&F–ÂF—6V'2æB6öçFW‡GVÂF÷æVÂ6†ævW2âÆ–W'2À¦Ö6·2æB–ÖvRÆ6VÖVçB6†÷VÆB÷Vâ6öçFW‡GVÂæVÇ2öæÇ’v†Vâ&WVW7FVBà¤W†—7F–ærÆVgBÆÂÖ6öçG&öÇ2Fö6²—2G&ç6—F–öæÂÂæ÷BFW6—&VBf–æÂ–çB–çFW&f6Rà¥W6W"W‡Æ–6—FÇ’FVfW'2÷76–&ÆR&÷GFöÒÖÆVgB–çBÖöFR'WGFöâÆöæw6–FR6VÆV7F–öâà¤Fòæ÷B6–ÆVçFÇ’&WÆ6RF†—2&WVW7Bv—F‚æ÷F†W"&F–ÂVÖ&VFFVB–âFö6²à¥7FvRÖ–w&F–öâW6–ær7W'&VçB–çFW"ö7F–öâö†—7F÷'’öÆ–W"÷væW'2æB6†&VBæVÀ§÷6—F–öâö6ö×7BÆ–÷WC²æòæWr''W6‚Væv–æRâ–çBÖ6öçFW‡B&6¶w&÷VæB†öÆB×W7@¦&VÆöærFò6–ævÆRW†—7F–ærvW7GW&R÷væW"æB÷fW'&–FRÖöFVÆÆ–ær–çfW'BôäÅ’v†–ÆP§–çF–æs²f–ævW'27F–ÆÂ÷&&—B÷â÷–æ6‚ÂVæ6–Â–çG2ÂVæFõ&VFò7F—2–â–çBà¤Fòæ÷B÷Vâ&F–Âg&öÒ7W&f6R–çB7G&ö¶R÷"æf–vF–öã²6æ6VÂVæF–ær†öÆ@¦öâÖ÷fVÖVçBö×VÇF—F÷V6‚â66÷R&VwVÆ"ÖöFVÆÆ–ær&F–ÂövW7GW&R÷væW'2Væ6†ævVBà¥F†—2—2Fö7VÖVçFVBF—&V7F–öã³“cf—†W2&VæFW&–æröæÇ’æBFöW2æ÷B6†—F†—2T’à ¢ã“cV&Æ–6F–öâfW&–f–VC¢'VçF–ÖSVf#FFf&VVS†3ƒSV#–Ff366&“ƒS3f#V&VC#2À¦W†7BFW7FVBG&VS6&Fc&#s–#FF&6C63FSƒ##“3v&S3SBâÆö6Ã#ƒE52À£d”Âó6¶—²fö7W6VCu52âvW3Cs3ƒƒsƒb5T44U53²†÷7FVB&Vw&W76–öãCs3ƒƒSc@¥5T44U52âÆÃb6†V6¶VBV&Æ–2'VçF–ÖRöÆöFW"÷&÷FV7FVBf–ÆW2'—FRÖÖF6‚FW7FVBG&VRà¤FWf–6S“c&VBöw&VVâÆ–æW2æB÷&&—BÖFWVæFVçB6Æ—–ær66WFæ6R&VÖ–ç2VæF–æs°¦æò&ööböb•B6ö×÷6—F÷"&ö÷B6W6R–æfW'&VBg&öÒWFöÖFVB76W2à ¢22ã“c"(	B7F'GWöÆ–fV7–6ÆRf–Ww÷'B6—¦–æs²ã“c&VæFW&–ærd”Â(	B#Bö7Fö&W###` ¥W6W#“cd”Ã¢&–v‡B×6–FRT’'&ö¶Vâ–ÖÖVF–FVÇ’gFW"&Vg&W6ƒ²÷'G&—N(i&ÆæG66P§&W7F÷&W2—BâFòäõBÖ&³“c&VæFW&–ærf—†VBg&öÓ#ƒBWFöÖFVB76W2ã“c''W6€§&F–Â66WFæ6R—26W&FS²W6W"w26Æ&–f–VBfÆöF–ærf–Ww÷'B–çB&F–Âv—F€¦6ö×7BDõ6öçFW‡GVÂ6WGF–æw2&VÖ–ç2&V6÷&FVBæB—2äõB–×ÆVÖVçFVB–ã“c"à¤VF—BÖ–ãVf#FFf¢&VæFW&W"&W6—¦R'Vç2öæ6RB7F'GWæBöâv–æF÷rç&W6—¦RöæÇ’À¤E"—26WBöæ6RâÆFW"Æ–÷WBö6öçF–æW"÷f—7VÂf–Ww÷'B6†ævW2†fRæò6—¦–ær÷væW"à¤÷&–v–æÂÖ–â&W6—¦Ræ÷r66WG2ÖV7W&VBv–GF‚ö†V–v‡Bö6VDE"æBWFFW24ÔP§&VæFW&W"ö6ÖW&÷6VÆV7F–öâF—7Æ’âæWr6ÖÆÂf–Ww÷'B×6—¦–ær66†VGVÆW"6öÆW66W0¥&W6—¦Tö'6W'fW"Âv–æF÷r&W6—¦Rö÷&–VçFF–öâ÷vW6†÷rÂf—7VÅf–Ww÷'B&W6—¦RæB6VÖçF–0§FööÂ×6W76–öâG&ç6—F–öç2–çFòöæRg&ÖRâ7F'GW†2âFF—F–öæÂ6WGFÆ–ærg&ÖRà¥Væ6†ævVBö'6W'fW"F–ÖVç6–öç2æòÖ÷²Æ–fV7–6ÆRG&ç6—F–öç2&WVW7BöæR6ÖR×6—¦P¦6çf2&W–çBâ¦W&ò6—¦W2FVfW"ÂE"—26VC"ÂæòW"Ög&ÖRöÆÆ–ær÷7–çF†WF–0§&W6—¦RWfVçG2÷FV×÷&'“‚¦–vvÆRöf÷&6VF÷&–VçFF–öâ÷6V6öæB&VæFW&W"÷"–çWB÷væW"à¥F†—2föÆÆ÷w2&÷FF–öâw2&W6—¦R÷&W–çBF‚'WBW†7B•B6ö×÷6—F÷"fVÇB&VÖ–ç0§Vç&W&öGV6VC³“c"—2F&vWFVBÆ–fV7–6ÆR&W—"&WV—&–ærFWf–6RfVVF&6²à¤Ö–â6†ævW2ôäÅ’†VÇW"–×÷'BÂ&W6—¦RgVæ7F–öâæB&–æF–æs²–çFW&æÂÖ–â7F× §&WF–æVBâÖ–âÆöFW#“c"–çFVçF–öæÂã“cv—¦Öò&÷VæG2&WF–æVC²Ub÷–çBövVöÖWG'’ð¦†—7F÷'’Â&÷FV7FVD×VÇF“ãæBg&÷¦Vâ&VÆV6W2Væ6†ævVBâ&Wf–WvVB76WB6öçG&7@¦FG2W†7BÖ–î(i'f–Ww÷'B×6—¦–ær–×÷'C²6†VÆÂ÷&V6÷fW'’öÖ–â–ç3“c"à¥F‡&VR–çFVw&F–öç3¢÷&–v–æÂÖ–â&W6—¦R6ÆÆ&6²&W6W'fW2&VæFW&W"ö6ÖW&÷÷6—F–öã°§7F'GW÷6WGFÆVBÆ–÷WBö6öçF–æW"ÖöæÇ’&W6—¦RôE"ö6öÆW66–æröæð§öÆÆ–æs²6ÖR×6—¦RvW6†÷r÷6W76–öâö÷&–VçFF–öâ&W–çB÷¦W&ò×6—¦Rö6ÆVçWâfö7W6VCu52à¤gVÆÂ÷V&Æ–6F–öâWf–FVæ6RföÆÆ÷w2â&–÷#“c&ööbæB6Æ&–f–VB–çBF—&V7F–öâ&P¦–æ6ÇVFVB–âF†—2†æFöfbÂ7WW'6VFVB'’W‡Æ–6—C“cd”Â&÷fRà¤DUd”4S“c#¢&Vg&W6‚–âÄäE44Rv—F†÷WB&÷FF–öã²–ç7V7Bv†öÆR&–v‡BFööÆ&"ôö&¦V7@¤'&÷w6W"÷7FGW2âUbFööÇ>(i$VF—F÷.(i$&6²ô6Æ÷6RÂ÷&&—BFò&÷F‚6–FW2â–çN(i$FöæR6†V6·0¦Æ–æW2–æFWVæFVçFÇ’ÂF†VâÖ÷fRõ&÷FFRõ66ÆRæBVæFõ&VFòâ&W÷'B–b&÷FF–öâ—27F–ÆÀ¦æVVFVC²Fòæ÷B–æfW"FWf–6R52g&öÒFW7G2âFVfW"–çBÆ–÷WBÖ–w&F–öâVçF–Â7F&ÆRà ¢ã“c"F&vWFVBfÆ–FF–öã352ód”Âó6¶—‡ãã2“¢&öGV7F–öâ6—¦–ær66†VGVÆW"°¦Ö–â&W6—¦RÂ&VÆV6R6öçG&7BÂ÷&–v–æÃ“c&–ærwV&G2Ã“SB–6¶–ærÃ“S"Ubv÷&·76RÀ£“7GVÂ–çBö6÷&RæC“c''W6‚&F–Ââ7–çF‚6†V6·2Ö–âö†VÇW"72â&–÷"gVÆÀ§'Vâv2–çFW''WFVBæBFV×÷&'’ÆörVæf–Æ&ÆS²æògVÆÃ“c"6÷VçB6Æ–ÖVBà¥W6W"6·2v‡’'V–ÆG26Æ÷s¢fö–B&Æö6¶–ær†æF÷fW"öâGWÆ–6FRÆö6Â¶†÷7FVBgVÆÀ§7V—FRf÷"æ'&÷r6†ævW3²'Vâ&VÆWfçB6†V6·2æBfW&–g’FWÆ÷–ÖVçBÂ&W÷'B†÷7FV@¦gVÆÂ×7V—FR7FGW267W&FVÇ’âv—D‡V"7F–ÆÂ'Vç2gVÆÂ&Vw&W76–öâWFöÖF–6ÆÇ’à ¢ã“c"V&Æ—6†VB'VçF–ÖS–36C##sSs#SVCSƒ&#–FSc3#sCcvFCƒ3#“s&CC²W†7BWÆöFV@¦æBÆö6ÂFW7FVBG&VVcCff6&#s##sV6#cv363SSƒcf#fSS3“6âvW3C“Ss“#0¦'V–ÆBöFWÆ÷’5T44U53²6†ævVB6†VÆÂ÷fW'6–öâöÖ–â÷6—¦–ær†VÇW#BóBÆ—fR'—FRÖÖF6‚à¥F†—'G’&VÆWfçB6†V6·253²æògVÆÃ“c"726÷VçB6Æ–ÖVBâ†÷7FVBgVÆÂ&Vw&W76–öà£C“SsSCb–â&öw&W72B†æF÷fW#²æ÷B&Æö6¶–ærFWf–6R&WFW7Bã“cW6W"d”À§&V6÷&FVBÂ÷'G&—N(i&ÆæG66Rv÷&¶&÷VæB—2F–væ÷7F–2öæÇ’âDUd”4S“c"g&W6‚ÖÆæG66P¦ÆöBõUbÖVçG'’÷&WGW&âö÷&&—B÷&–v‡BFööÆ&"´ö&¦V7G2·7FGW2&WFW7B&WV—&VBâ–çB&F–À§&VFW6–vâ&VÖ–ç2Fö7VÖVçFVBF—&V7F–öâÂæ÷B6†—VBâæòFWf–6S“c"52–æfW'&VBà  ¢22ã“c2(	BfÆöF–ær–çB&F–ÂæB6öçFW‡GVÂ6öçG&öÇ3²ã“c"52(	B#Bö7Fö&W"##` ¥W6W"6öæf—&×2ã“c"53²&÷FV7Bg&W6‚ÖÆæG66Rf–Ww÷'B6—¦–ærÂUbv÷&·76R&WGW&âÀ¦÷&&—Bf—6–&–Æ—G’æB–çBFöæR&VæFW&–ærâ6†—F†R6Æ&–f–VB–çB–çFW&7F–öâW6–æp§F†RW†—7F–ærf–Ww÷'B–çFW"æB÷&–v–æÂÖ–â&6¶w&÷VæBÖ†öÆB÷væW"âF†RfÆöF–æp§&F–ÂöffW'2''W6‚ôf–ÆÂôW&6W"õ6×VFvRô&ÇW"ÇW2Æ–W'2ôÖ6²ô–ÖvRôòõFW‡GW&RvW2à¤6†ö÷6–ærâ—FVÒ6Æ÷6W2F†R&F–Ã²F†R÷&–v–æÂ–çFW"6öçG&öÇ2V"–â6ö×7@§F÷Ö6VçG&R6öçFW‡GVÂæVÂâ†öÆF–ærV×G’&6¶w&÷VæB&V÷Vç2F†R–çB&F–ÂâVæ6–À§7G&ö¶W2Âf–ævW"æf–vF–öâÂVæFòõ&VFòÂ&W6÷W&6RÂòæB–ÖvRÆ6VÖVçB6öçF–çVRF‡&÷Vv€¦÷&–v–æÂ÷væW'2â–çB†öÆB—2ÆÆ÷vVBöæÇ’v†–ÆR–FÆR†æò7G&ö¶Rö–ÖvRôò&Wf–Wr“²F†P¦÷&–v–æÂ†öÆB6æ6VÇ2öâÖ÷fVÖVçBÂ×VÇF—F÷V6‚Âö–çFW"6æ6VÂ÷"6W76–öâ6†ævRà¥–çB6WGF–æw2W6RF†R6†&VBæVÂ÷6—F–öâ÷væW"v—F‚6ö×7B÷F–öã²÷F†W"÷W ¦Æ–÷WG2&VÖ–âVæ6†ævVBâ•BF7F–ÆR66WFæ6R&VÖ–ç2VæF–ærà  ¢22ã“cB(	BÆVgB6–FR6ö×7B–çB6WGF–æw3²W6W"F—&V7F–öâ(	B#Rö7Fö&W"##` ¥W6W"&WVW7G2–çB6öçFW‡GVÂ÷W2BÄTeB&V6W6RF÷Ö6VçG&R6WGF–æw2ö'7G'V7BF†Rf–Ww÷'Bâ¶VWF†RfÆöF–ær&F–ÂæBW†—7F–ær–çFW"ö6öçG&öÂ÷væW'2g&öÒã“c2â&WW6R6†&VB÷6—F–öâ÷væW"v—F‚6ö×7BÆ–÷WC²6WB–çB†÷7B‡‚g&öÒÆVgB÷F÷Âv–GF‚6VBC3#‚Âf–Ww÷'BÖ†V–v‡B67&öÆÂâ&VGV6Rv2ÖöFW7FÇ’v†–ÆR&W6W'f–ær&VF&ÆRÆ&VÇ2æBÖ–æ–×VÒF†V–v‡G2â÷F†W"FööÂ÷W2&WF–âF÷Ö6VçG&RÆ6VÖVçBâDUd”4S“cC¢''W6‚ô&ÇW"ÆVgBÆ6VÖVçBÂ76–ærÂ&F–Â†öÆB÷&V÷VâÂVæ6–ÂÂf–ævW"æf–vF–öâÂVæFõ&VFòÂ6öçFW‡GVÂvW2æBFöæRâæW‡C¢ö'F–â•B66WFæ6Röb&F–Â²ÆVgB÷W&Vf÷&RÖ÷&R6öçG&öÇ3²F†Vâ&–÷&—F—¦Rf6Vw&÷W–çF–ærà  ¢22ã“cR(	B–çBv÷&¶fÆ÷ræBT’Wf–FVæ6R(	B#Rö7Fö&W"##` ¥W6W"ã“cB5266WG2ÄTeB6ö×7B–çB÷WÂ'WB&V7W'&–ær–æ7F—fR&–v‡B×6–FRT§&VÖ–ç2õTââFòæ÷B–æfW"&VæFW&–ær&W—&VBâ7W'&VçB&WVW7FVBT“¢&÷GFöÒUb”å@¦&W6–FR4TÄT5C²æF—fRUbfÆ–FF–öâ&Vf÷&RVçG'“²÷&–v–æÂö&¦V7B&F–Â–çB6V7F÷ §&VÖ÷fVBâf–ÆR¶VW2æòGWÆ–6FR'WGFöâöæ6R&÷GFöÒ&"—2&VG’âÆ–W'2æ÷rÇv—0§f—6–&ÆRBF÷Â6VÆV7FVB6öçFW‡GVÂ6WGF–æw2&VÆ÷râ&F–Â6†ö–6W27F’f—6–&ÆRVçF–À¥Væ6–Â&Vv–ç2fÆ–B7W&f6R7G&ö¶Rö–ÖvRvW7GW&S²'&÷w6–ær6†ö–6W2FG2æò†—7F÷'’à¥&WVFVB–çBVçG'’&V÷Vç2FööÇ3²V×G’&6¶w&÷VæB†öÆB&WW6W2Ö–âw26–ævÆRF–ÖW §v—F‚W‡Æ–6—B–çB&6¶w&÷VæBöÆ–7’Â'—76–ærÖöFVÆÆ–ær†—B&÷†–W2âFöæRW†—G3°¤W66R6æ6VÇ2Æ—fR6öçF7Bv—F†÷WBÆVf–ær–çC²6ö×WF–ærFööÂÆVæ6‚—2&VgW6VBà¤–çfÆ–BöFVÆWFVBvVöÖWG'’Ö’7F–ÆÂ6Æ÷6Rf÷"&W6÷W&6R6fWG’à ¥6×VFvRVF—Bf÷VæB&÷VæFVB„Ò×v÷&²wV&BF‡&WræB6æ6VÆÆVBfÆ–B7G&ö¶R—†VÇ2à¤wV&Bæ÷rW6W2FF—F–öæÂF'2B6æBW‡÷6W2Æ–gB×FòÖ¶VW7FGW3²Æ–gF–æp¦6öÖÖ—G2F†RfÆ–B&Vf—‚æ÷&ÖÆÇ’â6æ6VÆÆF–öâö6†V6·ö–çB&VgW6Â7F–ÆÂ&W7F÷&Rà¤æòVæ&÷VæFVB&7FW"v÷&²÷"6†ævVB6âÖ6—¦R&WÆ6W2Ö&–wV÷W2FW‡GW&R6F–öã ¦6öÆ÷W"&W6öÇWF–öâöÆVv7“S"×Fó#BVæÆ&vVÖVçBÂæ÷B''W6‚à ¤f–ÆR(i"T’FV'VrW‡FVæG2÷&–v–æÂ÷BÖ–âvW7GW&RFV'Vs¢&÷VæFVCWfVçG2Â&–v‡B×6–FP¦†—B×FW7B7F6·2Â&÷VæG2÷7G–ÆW2÷f—6–&–Æ—G’Â6çf2÷f—7VÅf–Ww÷'BÂ6W76–öâÂW'&÷'2æ@¦6öçFW‡BÆ÷72â6GW&R&W÷'BF†Vâ6÷’&W÷'BgFW"–æ7F—fRT’ö67W'3²fÆrW'6—7G0§F‡&÷Vv‚&Vg&W6‚âF–væ÷7F–2&VG2æBÆ—7FVæW'2æWfW"6öç7VÖR–çWBâW†7B•Bf–ÇW&P¦æ÷B&W&öGV6VC²FV'VrÖöFRvF†W'2Wf–FVæ6RÂFöW2æ÷B6Æ–Ò6ö×÷6—F÷"&W—"à ¤DUd”4S“cS¢æòÕUbö&¦V7B&VgW6W2–çC²Ubö&¦V7B÷Vç2g&öÒ&÷GFöÒâ–ç7V7BF÷Æ–W'0¦æB6WGF–æw2&VÆ÷rÂ'&÷w6R&F–Â6†ö–6W2F†VâVæ6–Â–çB†–FW2—C²&6¶w&÷VæB†öÆ@§&V÷Vç2âÆöær6×VFvRöÆ–gB¶VW2—†VÇ2âf–ævW'2õVæFõ&VFòæBFöæRâVæ&ÆRT’FV'VrÀ§&W&öGV6R&–v‡B×6–FRf–ÇW&RÂ6GW&R&W÷'B(i"6÷’&W÷'BæB6VæB&W÷'Bà  ¢ã“cRfÆ–FF–öã¢gVÆÂÆö6ÂæöFS#B7V—FS#ƒ52ód”Âó6¶—VBƒ“ã2“°¦fö7W6VB&öGV7F–öâõT’ö†öÆBöFV'Vrõ6×VFvRæB&VÆV6R6†V6·276VBâ&Wf—6VBöÆBFW7G0¦öæÇ’v†W&RW6W"ÖF—&V7FVBT’6†ævVB‡&F–ÂW'6—7FVæ6RÂ66Æ"ÖÆ–W"f—6–&–Æ—G’À§&VÖ÷fVBö&¦V7B–çB6V7F÷"“²&WF–æVB&7FW"6æ6VÂ÷&VgW6ÂæB&÷FV7FVBv—¦Öð¦&÷VæG2öæf–vF–öâ76W'F–öç2âöÆBf—†VCs3"6†&VBÖFö6²–â76W'F–öâæ÷rW6W2&Wf–WvV@¦66†R6öçG&7C²æVvF—fR&6¶w&÷VæBFW7B×WFFW2$õD‚æF—fR†öÆB'&æ6†W3²FV'Vp¦f—‡GW&R&W6W'fW2×VÇF—ÆRö'6W'fW'2æBW†—7F–ær'VçF–ÖRÖW'&÷"W‡G&7F–öâ&÷VæF'’à¢ã“cB&VæFW&–ær—77VR&VÖ–ç2õTã²FV'Vr&W÷'B—2F–væ÷7F–2Wf–FVæ6RÂæ÷Bf—‚à¥'VçF–ÖRV&Æ–6F–öâæB†÷7FVB4’&ööb&RfW&–f–VB6W&FVÇ’gFW"F†—26öÖÖ—Bà  ¢22ã“cRV&Æ–6F–öâfW&–f–VB(	B#Rö7Fö&W"##` ¥'VçF–ÖRÖ–â6öÖÖ—BvC#3#“Vc“v3†#Cs–V6f3Cc3#SVfS#²W†7BÆö6Â÷WÆöFVBG&VRƒc–#&f3ƒ†“#Cƒ“&3“sffSSƒ33ScfSF"âgVÆÂÆö6Â7V—FR#ƒ52Âd”Âó6¶—VBƒ“ã2’âv—D‡V"vW2'V–ÆBöFWÆ÷’'VãCƒ#SCC5T44U52â7W'&VçBÖ–âfW'6–öâ÷F—FÆRöFF7F×æB6†ævVBÖ–âõ–çBöFV'Vr66†R–ç2fW&–f–VC²&÷FV7FVB×VÇF“ã&WF–æVBâ†÷7FVBgVÆÂ&Vw&W76–öâ'VãCƒ#cC‚v27F–ÆÂ'Vææ–ærv†VâF†—2&ööbv2w&—GFVã²Fòæ÷B–æfW"†÷7FVB52VçF–Â6†V6¶–ær—BâW6W"ã“cBÆVgBÆ6VÖVçB52&÷FV7FVC²ã“cRFWf–6RT’66WFæ6RæB&V7W'&–ær&–v‡B×6–FR–æ7F—fRfVÇB&VÖ–âVæF–ærâf–ÆR(i"T’FV'Vr(i"&W&öGV6R(i"6GW&R&W÷'B(i"6÷’&W÷'B—2F†RæW‡BF–væ÷7F–2vFRâF†—2—2Fö72ÖöæÇ’&ööbWFFS²'VçF–ÖRG&VR&÷fR&VÖ–ç2F†RFW7FVBV&Æ–6F–öâà  ¢22ã“cb(	B6öçF–çV–ær6×VFvR–çWBv–æF÷w3²7F'GWFööÆ&"Wf–FVæ6R(	B#Rö7Fö&W"##` ¥W6W"ã“cR52&÷FV7G2&÷GFöÒ–çBVçG'’ÂW'6—7FVçB&F–ÂÂÆ–W'2Öf—'7BÄTe@§6WGF–æw2æB¶WB6×VFvR—†VÇ2âW6W"&W÷'G26×VFvR7F–ÆÂ7F÷2gFW#^(	3b76W2à¤÷&–v–æÃ„Ò&7FW"v÷&²6v26öçF7B×v–FS²&VæWrôäÅ’—G2v÷&²6÷VçFW'2W"æF—fP¥6×VFvR–çWB6×ÆRÂ&WF–æ–ær&Vf÷&R6æ6†÷Bö6÷fW&vR÷–6·WöF—'G’—†VÇ2â&÷VæFV@§6×ÆRÖ’W6RF'2ÂæW‡B–çWB&W7VÖW2âB÷&–v–æÃ#F‚ÖF"6Â&W6VVB6ÖP¦÷&–v–æÂF‚÷væW"g&öÒÆ7B67&VVâ–çWBv†–ÆR&WF–æ–ærF†R&7FW"6öçF7Bâæð¦W‡G&6†V6·ö–çG2÷"Æ–W"f–æ—6‚VçF–Â‡—6–6ÂÆ–gC¢VæFò&VÖ–ç2öæR7G&ö¶Rà¤6æ6VÂö6†V6·ö–çB&VgW6Ç2&WF–âFöÖ–2&öÆÆ&6²â''W6‚ôf–ÆÂôW&6W"ô&ÇW"Væ6†ævVBà ¥W6W"7WÆ–VBã“cRFV'Vr&W÷'Bg&öÒ&Vg&W6‚f–ÇW&S£3cl9sƒƒbÂ6çf33cl9sƒ#d552ð£#s3,9scS'—†VÇ2DE#"Â–çFfÇ6R÷6W76–öæçVÆÂö6öçG&öÇ6Væ&ÆVC²6×ÆVB&–v‡B4åd0¦6öçF7G2&V6‚v–æF÷r'V&&ÆRâæò'&öB÷fW&Æ’–âF†÷6R6çf26×ÆW2âF†—2FöW2äõ@§&÷fRFööÆ&"†—BFW7F–ær÷"6ö×÷6—F÷"–çF–ær†VÇF‡“¢÷&–v–æÂw&–B7F'G5“s¦&VÆ÷sc‚†VFW"æBöÖ—GFVBçF÷Ö7F–öç2÷&–v‡B'WGFöâ&V7G2âW6W"6öæf—&×2&Vg&W6€¦6âVçFW"f–ÆVB7FFRF—&V7FÇ’âW‡FVæBW†—7F–ærFV'Vr&W÷'Bv—F‚W†7B&–v‡BÖ'WGFöà§&V7B÷7G–ÆW2öF—6&ÆVBöW‡æFVBö6VçG&R†—B7F6·3²6GW&RF†W6RöâW'6—7FVBÖFV'Vp§7F'GW÷vW6†÷röÆ–fV7–6ÆRæBFööÆ&"6Æ–6²âæò&ö÷B6W6R÷"&VæFW&–ærf—‚6Æ–ÖVBà ¤DUd”4S“cc¢Æöær&WVFVB6×VFvR76W2VæFW"öæRVæ6–Â6öçF7B6öçF–çVS²Æ–gB¶VW0§&W7VÇBÂôäRVæFòõ&VFò&W7F÷&W2v†öÆR6öçF7BÂ6æ6VÂ&W7F÷&W2&RÖ6öçF7BâÆÂã“cP¥T’fÆ÷r&VÖ–ç2âVæ&ÆRT’FV'VrÂ&Vg&W6‚F—&V7FÇ’–çFò&–v‡Bf–ÇW&RÂ6GW&Rô6÷¦æWr&W÷'B6öçF–æ–ær6öçG&öÇ2æB7F'GWWf–FVæ6S²FffV7FVB&–v‡B'WGFöâf—'7@¦–b&7F–6ÂâW†7BFööÆ&"&ö&RF—7F–æwV—6†W2öfg67&VVâöF—6&ÆVBöö66ÇW6–öâg&öÐ¤DôÒÖ†VÇF‡’'WBf—7VÆÇ’'&ö¶VâT“²æF—fR•B&VæFW&–ærvFR&VÖ–ç2õTâà  ¢ã“cbfÆ–FF–öã¢gVÆÂÆö6ÂæöFS#B7V—FS#ƒ252ód”Âó6¶—VBƒ“Rã2“°¦fö7W6VB6×VFvRövW7GW&RõT’öFV'VrôÆ"÷&VÆV6SC52âæWr6†V6·2&÷fR&VæWvVBv÷&°§v–æF÷w2&WF–â—†VÇ2æB6æ6VÆÆF–öâ&6VÆ–æS²Æöær7GVÂ7W&f6R×–6¶VB6×VFvP§76W2÷&–v–æÃ#F‚'VFvWBÂVF—G2ÆFR—†VÇ2æB6öÖÖ—G2ôäRVæFòõ&VFòVçG'“°§&–v‡BFööÆ&"6VçG&R&ö&W2–æ6ÇVFR†VFW%“3æBW'6—7B–âvW6†÷rWf–FVæ6Rà¥&–÷"ã“cR†÷7FVB&Vw&W76–öãCƒ#cC‚†2æ÷r6ö×ÆWFVB5T44U52âW†7B7WÆ–V@§&Vg&W6‚&W÷'Bö'6W'fF–öç2&R&6†—fVB–âFö72÷V’ÖFV'Vr×&Vg&W6‚Ó“cR×&W÷'BæÖBà¥&–v‡B×6–FRæF—fR•Bf–ÇW&R&VÖ–ç2õTã²æò&VæFW&–ærf—‚–æfW'&VBà  ¢22ã“cbV&Æ–6F–öâfW&–f–VB(	B#Rö7Fö&W"##` ¥'VçF–ÖR6öÖÖ—BfFCƒƒs“CCC†ff3“S#“3#CCc3–3cS–###S6##²W†7BFW7FVB÷WÆöFVBG&VRCsSS3c†&S3c&†6#S†SF&3cSC#C#6âgVÆÂÆö6Ã#ƒ252ód”Âó6¶—VBƒ“Rã2“²fö7W6VCC52âvW2'VãCƒ3CsSc25T44U52âÆÃ‚66†RÖ'W7FVBV&Æ–2f–ÆW2'—FRÖÖF6‚Æö6Ã¢fW'6–öâö–æFW‚Â–çFW"ö6÷&RöFV'VrÂ6†&VB&7FW"ÂÆ"ÆöFW"÷6†VÆÂâ7W'&VçBÖ–âF—FÆRöFF÷f—6–&ÆRÖ&¶W'2æB6†ævVB–ç3“cbfW&–f–VC²Væ6†ævVBÖ–ã“cRæB&÷FV7FVB×VÇF“ã&WF–æVBâ†÷7FVB&Vw&W76–öãCƒ3Cs“2v2'Vææ–ærB&ööbF–ÖS²6†V6²—G27GVÂ6öæ6ÇW6–öâ&Vf÷&R6Æ–Ö–ær†÷7FVB52âW6W"ã“cR52&÷FV7G27W'&VçB–çBT“²6öçF–çV–ær6×VFvRã“cbæBW†7BFööÆ&"÷7F'GWF–væ÷7F–2&W÷'G27F–ÆÂ&WV—&RFWf–6RfVVF&6²â&–v‡B×6–FRf–ÇW&R—2õTââF†—2Fö72ÖöæÇ’&ööb&W6W'fW2F†RFW7FVB'VçF–ÖRà  ¢22ã“cr(	B6çf2õT’6ö×÷6—F–öâ&÷VæF'“²ã“cb–çf—6–&ÆR6Æ–6¶&ÆR6öçG&öÇ2(	B#Rö7Fö&W"##` ¥W6W"&W÷'G2&–v‡B6öçG&öÇ2&VÖ–â6Æ–6¶&ÆRv†–ÆRf—7VÆÇ’'6VçC²7v—F6†–ærv§Fò6†DuBæB&6²&W7F÷&W2V&æ6RâW†7Bã“cb&W÷'C£##£…¢6†÷w2&–v‡@¦'WGFöç2öâ×67&VVâöVæ&ÆVB÷f—6–&ÆRö÷6—G“ÂæòG&ç6f÷&×2öf–ÇFW'2ö6Æ—F‡2ÂW†7@¦'WGFöâõ5dr†—B7F6·3²VæFò6Æ–6²&V6†W2v–æF÷r'V&&ÆRâ–çFfÇ6R÷6W76–öæçVÆÂà¥7F'GWFööÆ&"w&÷w2g&öÓ3BãSg‚v–FRCCS–×2Fó3rãc‚CcC–×2Âv—F‚6÷'&V7@¦Æ–÷WB'WB&W÷'FVB–çf—6–&ÆR—†VÇ2âWf–FVæ6Rö–çG2Fò–çF–ærö6ö×÷6—F–ærÂæ÷@§&VÖ÷fVBT’Âöfg67&VVâÆ–÷WBÂF—6&ÆVB6öçG&öÇ2÷"'&öB–çWB–çFW&6WF–öââF†—0¦—2â–æfW&Væ6RÂäõBÆö6ÆÇ’&W&öGV6VBvV$¶—BÖVæv–æRF–væ÷6—2à ¥F&vWFVB&W—"–â÷&–v–æÂ7G–ÆW6†VWC¢f–Ww÷'Ew&—6öÆFVB7F6²G£Â÷&–v–æÀ¦6çf2&÷VæFVB'’6öçF–ã§–çBv—F‚—G2÷vç£²†VFW"&VÖ–ç7£&÷fRf–Ww÷'Bà¤†VFW"÷7FGW2ôö&¦V7B'&÷w6W"vWB—6öÆFVB6ö×÷6—F–ær†–çG2f–v–ÆÂÖ6†ævS¦÷6—G’À§v—F†÷WBG&ç6f÷&×2Â÷6—G’6†ævW2Â6Æ—–ærT’ÖVçW2÷"&W&VçF–ærç’6öçG&öÂà¥d”Urf—†VB÷W&VÖ–ç2f–Ww÷'B×&VÆF—fS²fÆöF–ærFööÇ2&WF–âF†V—"÷vâ÷væW'2à¤÷&–v–æÂf–Ww÷'B×6—¦–ær66†VGVÆW"æ÷r6öÆW66W2fö7W2æBf—6–&ÆRÖFö7VÖVçBWfVçG0§F‡&÷Vv‚4ÔR&W6—¦R÷&W–çB÷væW#²†–FFVâÖFö7VÖVçBWfVçG2Fòæ÷B&VG&râFV&F÷và§&VÖ÷fW2&÷F‚Æ—7FVæW'2âæò7–çF†WF–2&W6—¦RÂW"Ög&ÖRöÆÆ–ærÂDôÒ†–F–ærÂ&VÆöBÀ¦æWr&VæFW&W"ö†—7F÷'’ö–çWB÷væW"÷"ÖöFVÆÆ–ær÷–çB6†ævW2âFV'Vr6æ6†÷B&V6÷&G0¦6öçF–âö—6öÆF–öâ÷v–ÆÂÖ6†ævR6òã“crÆ–W"'VÆW26â&RfW&–f–VBöâFWf–6Rà ¢ã“cR–çBT’52&÷FV7FVC²ã“cb6öçF–çV–ærÕ6×VFvR66WFæ6R&VÖ–ç26W&FRà¤DUd”4S“cs¢&Vg&W6‚–âÆæG66R&WVFVFÇ’ÂfW&–g’ÆÂ&–v‡B'WGFöç2÷7FGW2æ@¤ö&¦V7B'&÷w6W#²–çFW&7B&Vf÷&R6†æv–ær2ÂVçFW"öW†—BUbVF—F÷"æB–çBÀ§&÷FFRö÷&&—Bâ7v—F6‚v’ö&6²fW&–f–W2&V6÷fW'’FöW2æ÷BÆ÷6RT’÷v÷&²â–b–çf—6–&ÆP¦6öçG&öÇ2&V7W"ÂVæ&ÆRT’FV'Vr&Vf÷&R&Vg&W6‚æB6VæB6GW&Rô6÷’&W÷'BÇW0§67&VVç6†÷B–b&7F–6Ââ&W—"&VÖ–ç2â•BvFRVçF–ÂW‡Æ–6—BfVVF&6²à  ¢ã“crfÆ–FF–öã¢gVÆÂÆö6ÂæöFS#B7V—FS#ƒR52ód”Âó6¶—VBƒ“2ã—2“°¦fö7W6VB&VÆV6R÷6—¦–ærõUbõ–çBöFV'Vr6†V6·3C52âæWr6÷fW&vR6†V6·2fö7W2÷f—6–&ÆP§&WGW&â6öÆW66–ærÂ†–FFVâÖFö7VÖVçB&VgW6ÂæBF—7÷6Ã²6çf26öçF–æÖVçBæ@§VçG&ç6f÷&ÖVB÷Væ6Æ—VBd”Ur÷W6öçG&7B&WF–æVBâÆö6Â6‡&öÖ—VÒÆ–÷WB6Öö¶P§v2GFV×FVB'WBF†R–ç7FÆÆVBÆ—w&–v‡B6¶vR†2æò'&÷w6W"W†V7WF&ÆR†W&S°¦æò&VæFW&VBÖ'&÷w6W"÷"æF—fRvV$¶—B&ööb6Æ–ÖVBâW6W"w2ã“cb&W÷'B—2&6†—fV@¦–âFö72÷V’ÖFV'VrÖ–çf—6–&ÆRÖ6öçG&öÇ2Ó“cbæÖBâFWf–6Rf—7VÂvFR&VÖ–ç2õTâà  ¢22ã“crV&Æ–6F–öâfW&–f–VB(	B#Rö7Fö&W"##` ¥'VçF–ÖR6öÖÖ—BF#f3#3fV#3“vS–C3CS–3Ss“6fC“Fcs3²W†7BÆö6Â÷WÆöFVBG&VR3fƒCƒ&Cf3&6ccsVfV33FfSss–CƒFV#sbâgVÆÂÆö6Ã#ƒR52ód”Âó6¶—VBƒ“2ã—2“²fö7W6VCC52âvW3CƒSC33b'V–ÆBöFWÆ÷’5T44U52âgFW"FWÆ÷–ÖVçBÆÃb66†RÖ'W7FVBV&Æ–2f–ÆW2ÖF6†VBÆö6Â'—FW3¢fW'6–öâö–æFW‚÷7G–ÆW2öÖ–â÷f–Ww÷'B×6—¦–ærövW7GW&RÖFV'Vrâ7W'&VçBÖ–âF—FÆRöFF÷f—6–&ÆR&VÆV6RÖ&¶W'2æB6†ævVB6÷W&6R÷7G–ÆW6†VWB–ç3“crfW&–f–VC²&÷FV7FVB×VÇF“ãVæ6†ævVBâ†÷7FVB&Vw&W76–öãCƒSC3C’v2'Vææ–ærB&ööbF–ÖS²6†V6²7GVÂ6öæ6ÇW6–öâ&Vf÷&R6Æ–Ö–ær†÷7FVB52â&–÷"ã“cb†÷7FVCCƒ3Cs“26ö×ÆWFVB5T44U52âæòÆö6Â&VæFW&VBÖ'&÷w6W"W†V7WF–öâ†'&÷w6W"W†V7WF&ÆR'6VçB’÷"•B6ö×÷6—F÷"&W&öGV7F–öâ6Æ–ÖVBâ–çf—6–&ÆRÖ'WBÖ6Æ–6¶&ÆR6öçG&öÇ2&VÖ–âõTâVæF–ærDUd”4S“cr&Vg&W6‚õT’×G&ç6—F–öâFW7BâW6W"×7WÆ–VB&W÷'BWf–FVæ6R—2&6†—fVC²F†—2—2F&vWFVB6ö×÷6—F–öâ&W—"Âæ÷BâVæv–æRÖÆWfVÂ&ö÷BÖ6W6R6Æ–Òà  ¢22ã“crW6W"U$dT5Bò53²&F–Â–6öâ&Wf–WrF—&V7F–öâ(	B#Rö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’66WG2ã“crâ&÷FV7BF†R6çf2õT’6ö×÷6—F–öâ&÷VæF'’Â&–v‡B6öçG&öÇ0§f—6–&ÆRöâÆæG66R&Vg&W6‚æBæ÷&ÖÂT’G&ç6—F–öç2ÂæBf—6–&ÆR×vR&W–çB&V6÷fW'’à¥F†—26Æ÷6W2F†Rã“cr–çf—6–&ÆRÖ'WBÖ6Æ–6¶&ÆR&–v‡BÖ6öçG&öÂFWf–6RvFS²öÆFW"õTâæ÷FW0¦&VÆ÷r&R†—7F÷&–6ÂâFòæ÷B–æfW"6W&FRVç&W6öÇfVBòöÇ†÷&VfÆV7F–öâ66WFæ6Rà¥W6W"vçG2÷&–v–æÂæöÖBÖ–ç7—&VB–6öç2v—F‚6ÖÆÂf—6–&ÆRF—FÆW2&VÆ÷râVF—BÆÂ&F–À§FööÂæÖW2æBöffW"D…$TR6æF–FFW2W"FööÃ²W6W"6VÆV7G2ÂF†Vâ&Vf–æR&Vf÷&R–ç7FÆÆ–ærà¥6VRFö72÷&F–ÂÖ–6öâÖVF—BÓ##bÓÓ#RæÖBf÷"7GVÂ–çfVçF÷'’Â26öæ6WBF—&V7F–öç2W §6VÖçF–2FööÂÂæÖ–ær6WF–öç2æB7FvVBf—7VÂ&Wf–WrÆââæò'VçF–ÖR6†ævRö'V–ÆB'V×à¥&–÷"æW‡BgVæ7F–öæÂv÷&³¢UbÖg&VRf6Vw&÷W–çF–ærF‡&÷Vv‚W†—7F–ærf6Tw&÷W2÷væW'2à¤'&–ær–6öâ&Wf–Wrf÷'v&BW"W6W"F—&V7F–öã²æòv†öÆW6ÆRT’&W6¶–â÷"WFöÖF–2–6öâ6†ö–6Rà ¢22&F–Âf—7VÂ6VÆV7F–öâ6†VWG2c6ö×ÆWFR(	B#Rö7Fö&W"##` ¤FW6–vâ&Wf–WröæÇ“²'VçF–ÖR&VÖ–ç2ã“crv—F‚&÷FV7FVBW6W"U$dT5Bõ52âÆÃcP§6VÖçF–2FööÇ2æ÷r†fRD…$TR÷&–v–æÂfV7F÷"6æF–FFW3£“R5dw2öã6†VWG2à¤FVÆ—fW&VB&÷„Æ"Ô–6öâÕ6VÆV7F–öâçFbÂ&÷„Æ"Ô–6öâÕ&Wf–Wræ‡FÖÂæ@¤&÷„Æ"Ô–6öâÕ&Wf–WrÕ6²ç¦—…Dbô…DÔÂõär6†VWG2õ5dw2öÖæ–fW7B÷&V'V–ÆB6÷W&6R’à¤æòFVfVÇB÷W6W"–6öâ6VÆV7F–öç3²v—BFööÂÖæÖR²ô"ô26†ö–6W2ÂF†Vâ&Vf–æR&Vf÷&P¦–ç7FÆÆF–öââ6†&VB7–Ö&öÇ2&WF–æVB–âöæR&Wf–Wr&÷s²fW'FW‚ôö&¦V7B¦ö–â6W&FRà¥6VRFö72÷&F–ÂÖ–6öâ×&Wf–Wr×cæÖBâæòæWrFW7B÷"'VçF–ÖR&VÆV6RæVVFVBà ¢22ã“c‚(	B6VÆV7FVB&ööb2–6öç2–âf6R&F–Â(	B#bö7Fö&W"##` ¥W6W"&÷fVB–âÖ&Wf–WrgFW"6†ö÷6–ærÆÃcR–6öç2æB&Vf–æ–ær&öög3"ó2à¤–ç7FÆÂf—'7Bf6R&F–ÂöæÇ’W"7FvVBVF—C¢ÆÃ#2÷&–v–æÂ'WGFöç2&WF–âW†7@§FW‡D6öçFVçBÂF&vWB6VÆV7F÷'2ÂWfVçB÷væW'2æBæwVÆ"6Æ÷G2„W‡G'VFS"ô&WfVÃ2’à¥66÷VBf6R×&F–ÂÖ–6öç2æ7727WÆ–W2÷&–v–æÂ5dr'Gv÷&²2æöâÖ–çFW&7F—fR550§6WVFòÖVÆVÖVçG2&÷fRW†—7F–ær6ÖÆÂÆ&VÇ3²æò5drF—FÆR÷FW‡B6öçFÖ–æFW2&÷WF–ærà¤–ææW"&F—W3'‚ósl9scF&vWG266öÖÖöFFS3'‚–6öç3²÷WFW##3‚óƒl9sc&WF–æVBà¤æò6†ævW2FòvVöÖWG'’ÂvW7GW&W2Â†—7F÷'’Â–çBÂ×VÇF“ãÂ÷F†W"&F–ÂÖöFW2÷ ¢ã“cr66WFVB6ö×÷6—F–öâ'VÆW2â6ö×ÆWFScRÖ–6öâ&ööc2'Gv÷&²&6†—fVB–à¢Fö72÷&F–ÂÖ–6öç2×&ööbÓ2æ§6öâf÷"7FvVB6öçF–çVF–öââ&WfVÂ7G&’Æ–æR&VÖ÷fVC°¤'&–FvR&W7F÷&VBFò&ööcÂÖ6—¦R2âæòæF—fR•Bf—7VÂ66WFæ6R–æfW'&VBà¤DUd”4S“cƒ¢f6R6VÆV7F–öâ(i"FööÇ3²–ç7V7BÆÂ–ææW"ö÷WFW"Æ&VÇ2æB'Gv÷&²À¤W‡G'VFRô–ç6WBô&WfVÂ7F–öç2æBF†V—"÷W3²VæFõ&VFó²f–ævW"÷&&—B÷â÷–æ6ƒ°§&–v‡BFööÆ&"&VÖ–ç2f—6–&ÆRâæW‡B&Vf–æR•B6—¦Rö6öçG&7BF†Vâ&VÖ–æ–ærÖöFW2à  ¢ã“c‚&R×V&Æ–6F–öâfÆ–FF–öã¢SBfö7W6VB6†V6·252ód”Âó6¶—VC²ÆÃ#2Væ6öFVB5dw2'6R2fÆ–B„ÔÂâf6RÖ&·WÂ&÷WF–ær¦f67&—BÂ&÷FV7FVB×VÇF“ãæBã“cr6ö×÷6—F–öâ7G–ÆW6†VWB&VÖ–âVæ6†ævVBâæF—fR•Bf—7VÂ&Wf–WrVæF–ærà ¢22ã“c‚V&Æ–6F–öâfW&–f–VB(	B#bö7Fö&W"##` ¥'VçF–ÖR6öÖÖ—Cv#6CSvCSƒ†f&3ƒS“ƒ3&C6FfcF#“v3†F²W†7BWÆöFVBG&VP¦&C33C#“3“ƒ3s–VC“&#FcscS#ƒvSV3†CC"ÖF6†W2FW7FVBÆö6Â6öÖÖ—C““#csFBà¤Ö–âã“c‚Öæ–fW7BfWF6†VBæBfW&–f–VBâV&Æ–266†RÖ'W7FVBfW'6–öâæ§6öâÂ–æFW‚æ‡FÖÀ¦æBf6R×&F–ÂÖ–6öç2æ772ÆÂ'—FRÖÖF6‚FW7FVB6†V6¶÷WBâfö7W6VCSB52ód”Ã°£#2fÆ–BVÖ&VFFVB5dw2â†÷7FVB&Vw&W76–öãC#CC3ssCcB7FGW26†V6¶VB6W&FVÇ“°¦æò†÷7FVB52÷"æF—fR•Bf—7VÂ66WFæ6R–æfW'&VBâf6RÖöæÇ’FWf–6RFW7G0¦&Ræ÷r&VG“²&VÖ–æ–ærÖöFW2v—Bf÷"6—¦R÷&VF&–Æ—G’fVVF&6²à ¢ã“c‚vW2'V–ÆBöFWÆ÷“C#CC3ss3R6ö×ÆWFVB5T44U52â†÷7FVBgVÆÂ&Vw&W76–öãC#CC3ssCcBv27F–ÆÂ–â&öw&W72BV&Æ–6F–öâ&ööbà ¢22ã“c’(	BfW'FW‚&F–Â&÷fVB–6öç3²ã“c‚W6W"52(	B#bö7Fö&W"##` ¥W6W"6—2(	Äw&VB&W7VÇB52öæW‡F'V–ÆN(	Òf÷"ã“c‚â&÷FV7B66WFVBf6R–6öà¦'Gv÷&²Ã3'‚6—¦RÂ6ÖÆÂ6F–öç2Ãc‚F&vWB†V–v‡BæC'‚–ææW"&F—W3²&WF–æV@¤f6R552'—FW2ö66†S“c‚âæW‡Bw&VVBÖöFR—2fW'FW‚ÂföÆÆ÷vVB'’ö&¦V7BF†VâVFvP¦æB–çBâÆÃBW†—7F–ærfW'FW‚FööÇ2æ÷rW6R6VÆV7FVB÷&Vf–æVB&ööc25dw2f–§66÷VBfW'FW‚×&F–ÂÖ–6öç2æ772Â6ÖR66WFVBÆ–÷WBâ¦ö–âW6W2¦ö–â…fW'FW‚’'BÀ¦æ÷Bö&¦V7B¦ö–ââ÷&–v–æÂÆ&VÇ2÷FW‡D6öçFVçBÂæwVÆ"6Æ÷G2ÂF&vWG2ÂWfVçBö†—7F÷'’ð¦vVöÖWG'’÷væW'2æBF—6&ÆVB×7FFR7G–ÆW2&VÖ–âVçF÷V6†VBâW‡G'VFS"ô&WfVÃ2&WF–æVBà¤æò'VçF–ÖR¦f67&—B÷"×VÇF“ãÂã“cr6ö×÷6—F–öâÂ–çBÂf6RôVFvRôö&¦V7B6†ævW2à¢ã“c‚'VçF–ÖSv#6CSvC²V&Æ–6F–öâFö73S#Ffcc‚vW&RVF—FVB27W'&VçBÖ–âà¤DUd”4S“c“¢fW'FW‚6VÆV7F–öâ(i"&F–Ã²–ç7V7CB–6öç2÷F—FÆR6—¦S²F'V–ÆBVFvRÀ¥6Æ–FRæB&WfVÂæBf–æ—6‚F†V—"÷&–v–æÂ6W76–öç3²¦ö–âôÖW&vR6VçFW"öâ7V—F&ÆP§6VÆV7F–öç3²VæFõ&VFòöæf–vF–öã²7v—F6‚Fòf6RFò6öæf—&Ò66WFVB–6öç2Væ6†ævVBà¤æF—fRã“c’f—7VÂ66WFæ6RVæF–ærâæW‡Bö&¦V7B–6öç2gFW"FWf–6RfVVF&6²à ¢ã“c’fÆ–FF–öã£S’fö7W6VB6†V6·252ód”Âó6¶—VBâÆÃBVæ6öFVB5dw2fÆ–C²÷&–v–æÂv—¦Öòö7F–öâ¦f67&—BÂ66WFVBf6R552Â&÷FV7FVB×VÇF“ãæB6ö×÷6—F–öâ7G–ÆW6†VWB'—FRÖ–FVçF–6ÂFòã“c‚âæF—fR•B–6öâ&Wf–WrVæF–ærà ¢22ã“c’V&Æ–6F–öâfW&–f–VB(	B#bö7Fö&W"##` ¥'VçF–ÖRƒ†3VSCffCS#scVF#6fC“fC6Vc&#F3²WÆöFVBG&VRV3S3c†CS3C#V#C–SvSFf3Cƒ3Sv36c†CvS’ÖF6†W2FW7FVBÆö6ÂFVfCc2â7W'&VçBÖ–âÖæ–fW7Bã“c’fW&–f–VC²V&Æ–266†RÖ'W7FVBfW'6–öâæ§6öâÂ–æFW‚æ‡FÖÂÂfW'FW‚×&F–ÂÖ–6öç2æ772æB&÷FV7FVBf6R×&F–ÂÖ–6öç2æ772ÆÂ'—FRÖÖF6‚Æö6ÂãS’fö7W6VB6†V6·252ód”Âó6¶—ÃBfÆ–B5dw2â†÷7FVB7F–öç27FGW26÷VÆBæ÷B&R6öæf—&ÖVB‡V&Æ–2“C2Â6öÖ&–æVB7FGW6W2V×G’“²Fòæ÷B6Æ–Ò†÷7FVBgVÆÂ×7V—FR52âW6W"ã“c‚52&÷FV7FVC²ã“c’&VG’f÷"æF—fRfW'FW‚–6öâ&Wf–WrâæW‡Bö&¦V7BF†VâVFvRõ–çBgFW"fVVF&6²à ¢22ã“s(	Bö&¦V7B&F–Â&÷fVB–6öç3²ã“c’W6W"52(	B#bö7Fö&W"##` ¥W6W"(	Äw&VB52öæW‡F'V–ÆN(	Ò66WG2ã“c’fW'FW‚–6öç2â&÷FV7Bã“c‚f6RæBã“c¥fW'FW‚'Gv÷&²ÂÆ&VÂf÷&ÖBÃ3'‚–6öâ6—¦RæB÷&–v–æÂ7F–öç2âVF—B7W'&VçBÖ–à¦SCvf&b÷'VçF–ÖRƒ†3VSBÂ6†VÆÃ“c’æC2W†—7F–ærö&¦V7B6V7F÷'3²æò&ÆÆVÂ–6öà¦÷væW"f÷VæBâFB66÷VBö&¦V7B×&F–ÂÖ–6öç2æ772v—F‚&÷fVB&ööc25dw2f÷"ÆÃ0¦÷&–v–æÂ'WGFöç2â¦ö–âW‡Æ–6—FÇ’W6W2ö&¦V7B'Gv÷&²ÂF—7F–æ7Bg&öÒfW'FW‚¦ö–âà¥6ÖSc‚†V–v‡Bó'‚–ææW"&F—W2ó#3‚÷WFW"&F—W2æB6ÖÆÂ6F–öç3²ö&¦V7@§FF–æs7‚öv'‚f—G2GvòÖÆ–æR7–ÖÖWG'’ò&—6V7BF—FÆRâW†—7F–æræwVÆ"6Æ÷G2À¦Æ&VÇ2÷FW‡D6öçFVçBÂF&vWB”G2ÂFööÂf–Æ&–Æ—G’ö7F–öç2ö†—7F÷'’æB×VÇF’&VÖ–âà¤66WFVBf6RõfW'FW‚552'—FW2æB–ç2&WF–æVC²v—¦Öò¥2Â6ö×÷6—F–öâ7G–ÆW6†VWBÀ¥–çBÂvVöÖWG'’æBg&÷¦Vâ&WF2Væ6†ævVBâö&¦V7B×VÇF’æBv—¦Öò6†÷'F7WG2&VÖ–à¦÷&–v–æÂ÷væW'2âæòv†öÆRÖ&W6¶–â÷"æWrÖöFVÆÆ–ærgVæ7F–öæÆ—G’à¤DUd”4S“s¢ö&¦V7B&F–Â–ç7V7B–ææW"ö÷WFW"–6öç2æBÆöævW"Æ&VÇ3²GWÆ–6FP¦æBVæFõ&VFó²'&’÷"6öÆ–F–g’÷Vç2÷&–v–æÂ6WGF–æw3²UbôÖW6‚†VÇF‚æVÇ3°§&WGW&âFòf6RõfW'FW‚æBfW&–g’66WFVBV&æ6Röæf–vF–öâ÷&–v‡BFööÆ&"à¤æW‡BVFvR–6öç2ÂF†Vâ–çBÂgFW"FWf–6RfVVF&6³²ã“sæ÷B–WBFWf–6R66WFVBà ¢ã“s&R×V&Æ–6F–öâfÆ–FF–öã£crfö7W6VB6†V6·252ód”Âó6¶—VC³2Væ6öFVB5dw2'6R2fÆ–B„ÔÂâf6RõfW'FW‚552Âv—¦Öò&÷WF–ær¦f67&—BÂ&÷FV7FVB×VÇF“ãæB6ö×÷6—F–öâ7G–ÆW6†VWB'—FRÖ–FVçF–6ÂFòã“c’âæF—fRö&¦V7B–6öâ&Wf–WrVæF–ærà ¢22ã“sV&Æ–6F–öâfW&–f–VB(	B#bö7Fö&W"##` ¥'VçF–ÖR6C6Sf#VcfcV#“cƒs†CS“ƒvSSFSFSfcCc#²WÆöFVBG&VS3VC#SSs#†C3s3#v&&3SC#&36c–3#ƒCcs†fCBÖF6†W2Æö6ÂFW7FVBVF3c3f"â7W'&VçBÖ–âfW'6–öâ÷6†VÆÃ“sfW&–f–VBâ66†RÖ'W7FVBV&Æ–2fW'6–öâæ§6öâÆ–æFW‚æ‡FÖÂÆö&¦V7B×&F–ÂÖ–6öç2æ772Æf6R×&F–ÂÖ–6öç2æ772ÇfW'FW‚×&F–ÂÖ–6öç2æ772ÆÂ'—FRÖÖF6‚FW7FVB6†V6¶÷WBãcrfö7W6VB6†V6·252ód”Âó6¶—³2fÆ–B5dw2âvW3C#Ccƒ“3#"æB†÷7FVBF÷öÆöw“C#Ccƒ“CC‚vW&R–â&öw&W72v†VâVW&–VBÂv†–ÆRÆ—fR'—FW2Ç&VG’ÖF6†VC²Fòæ÷B–æfW"†÷7FVBgVÆÂ×7V—FR52âW6W"ã“c‚òã“c’52&÷FV7FVBâö&¦V7Bã“s&VG’f÷"•B&Wf–Ws²æW‡BVFvRF†Vâ–çBà ¢22ã“s(	BæF—fRÕUb'&’6ö×F–&–Æ—G“²&–v‡BT’&V7W'&Væ6R(	B#bö7Fö&W"##` ¥W6W"ã“s&W÷'G2÷&F–æ'’'&’(	ÆÆ–æ¶VBGWÆ–6FR6÷VÆBæ÷B&R7&VFVN(	ÒæBÆ—fP¤'&’(	Ç&WV—&W2â–æFWVæFVçBvVöÖWG'’ö&¦V7N(	ÒöâFVfVÇBUb7V&RâVF—BÖ–à¢3v3c÷'VçF–ÖR6C6Sf#Vc¢Æ–æ¶VDGWÆ–6FTö&¦V7B–çFVçF–öæÆÇ’&VgW6W2æF—fRU`§&W6÷W&6W2ÂÆ—fR'&’&Ææ¶WB×&V¦V7G2ç’vÆ%77F‡&÷Vvƒ²FVfVÇBUg2–çG&öGV6V@¦ÆFW"æ÷rÖ¶R&÷F‚öÆB'&’F‡2&VgW6Râæòã“s52–æfW'&VC²ã“c‚òã“c’–6öà¥52&WF–æVBâW6RVFvRõ–çB–6öâ&öÆÆ÷WBf÷"F†W6Rf—†W2à ¤÷&–v–æÂ'&’÷væW"æ÷rW6W2÷&F–æ'’ÖævW"æFDÖW6‚f÷"–æFWVæFVçBæF—fRÕU`¦6÷–W2Â¶VW–ærW†7Bf6RÖ6÷&æW"Ug2÷6WGF–æw2Â÷&–v–æÂÆ6VÖVçG2æBôäR†—7F÷'¦6†V6·ö–çBâvVöÖWG'’ÖöæÇ’'&’&WF–ç2Æ–æ¶VBF‚âæWr6ÖÆÂ'&’ÖæF—fR×Wb†VÇW §&WW6W2÷&–v–æÂUb–ç7V7F÷"÷F÷öÆöw’6–væGW&RÂfÆ–FFW26ö×ÆWFR7W'&VçBæF—fP§–ÆöG2Â&VgW6W2–çBö–×÷'FVB&W6÷W&6W2÷7FÆRUg2&Vf÷&R×WFF–öââ–æFWVæFVç@¦6÷’f–ÇW&R&W7F÷&W26GW&VB66VæRâæòvÆö&ÂÆ–æ¶VBõUböÖW6‚Væv–æR6†ævW2à¤Æ—fR'&’&WVG2W†7B÷&–v–æÂ6÷W&6RUg2W"6÷’†FVÆ–&W&FRUb÷fW&Æ’Â7F÷&W0¦æF—fUUb6÷W&6R–ÆöB–âW†—7F–ær¥4ôâ&V6—RæBWFFW2æF—fR&W7VÇB–ÆöBà¤6÷VçBôTäB&V÷Vâô6öçfW'BõVæFõ&VFò÷&ö¦V7B6öFV2&WF–â—C²æò66†VÖ'V×Â&W&ö¦V7F–öà¦÷"FW‡GW&RÆ÷72â–çB&VÖ–ç2&VgW6VC²6÷W&6RVF—F–ærf÷"æF—fRÕUbÆ—fR'&—0§&VÖ–ç2&VgW6VB'’÷&–v–æÂ6÷W&6RVF—F÷.(	D6öçfW'BFòÖW6‚&Vf÷&R6ö×öæVçB6†ævW2à ¥W6W"ã“s&W÷'C£#s£Se¢&V÷Vç2&–v‡B×6–FRf—7VÂfVÇBFW7—FRã“cr6fVwV&G3 £3cl9sƒƒbÄE#"Æ6çf3#s3,9scS#²æò6W76–öâõ–çBÂ†–FFVâv—¦Öó²FööÆ&"Væ&ÆVB÷f—6–&ÆRÀ¦–â&÷VæG2æBW†7B†—B7F6·2â6çf2—6öÆF–öâö6öçF–âæB†VFW"—6öÆF–öâ7F—fRà¤æ÷BF—6&ÆVB6öçG&öÇ2ÂÖ—76–ærDôÒ÷"7FÆS“cr–ç2âGvò&VÖ–æ–ærW"Õ5dr†æFÆP¦†÷fW"ö7F—fRG&÷×6†F÷rf–ÇFW'2–â÷&–v–æÂv—¦Öò&VÖ÷fVC²7G&ö¶Rö÷6—G’fVVF&6²À¦†—B&÷†–W2Â&÷VæG2Â–çWBæB6ö×÷6—F–öã“cr&VÖ–ââF†—2—2F&vWFVB&VGV7F–öà¦öbf–ÇFW&VB5dr7W&f6W2ÂäõB&ööböbvV$¶—B&ö÷B6W6R÷"wV&çFVVBT’&W—"à¤æF—fRã“sf—6–&–Æ—G’&WFW7B&WV—&VBâ6VRFö72÷V’×&V7W'&Væ6RÓ“sæÖBà ¤DUd”4S“s¢FVfVÇB7V&R÷&F–æ'’'&“b6÷–W3²VæFõ&VFòâæWr7V&RÆ—fR'&“bÀ§&V÷Vâö6÷VçBVF—Bô6öçfW'BÂ6fT÷VâõUb&Wf–Wrâ&WVB&Vg&W6‚ô'&’ôFöæRöæf–vF–öâÀ§vF6‚&–v‡BFööÆ&"æB6VæBT’FV'Vr&W÷'B–bfVÇB&WGW&ç2âW†—7F–ærf6RõfW'FW‚ð¤ö&¦V7B'Gv÷&²Væ6†ævVBâæW‡BFWf–6RfVVF&6²&Vf÷&RVFvRõ–çB–6öç2à ¢ã“sfÆ–FF–öã£fö7W6VBFW7G252ód”Âó6¶—VB‡ãã‡2“²7–çF‚6†V6·2f÷"'&’ö†VÇW"öv—¦Öò72âæWr7GVÂÖÖævW"FW7G26÷fW"÷&F–æ'’æF—fRÕUb6÷–W2ÂW†7BWF†÷&VBUb&W6W'fF–öâÂÆ—fR6÷VçB÷&V÷Vâô6öçfW'BÂVæFõ&VFòÂ&ö¦V7B6öFV2Â7FÆR÷–çB&VgW6ÂæB6÷’Öf–ÇW&R66VæR&öÆÆ&6²âW†—7F–ærÆ—FW&Â'&“ƒc–â6†V6·2ƒ3ƒ"ó3ƒBóC‚’æ÷rW6R&Wf–WvVB76WB6öçG&7C²6VÖçF–276W'F–öç2&WF–æVBâGvò5drvÆ÷rÖf–ÇFW"&VÖ÷fÇ2&Ræ÷BæF—fRf—7VÂ&ööbà ¢22ã“sV&Æ–6F–öâfW&–f–VB(	B#bö7Fö&W"##` ¥'VçF–ÖS6C–Sc#FSsSS#VCF3#“SsSSFC6SSƒ†S#S“²WÆöFVBG&VS&VVC##FCv6Cf#3#33C3†V6Fc–C&CcSSFBÖF6†W2FW7FVBÆö6Ã63VVƒâÖ–âã“sÖæ–fW7B÷–ç2fW&–f–VBâÆÃR66†RÖ'W7FVBÆ—fRf–ÆW2'—FRÖÖF6ƒ§fW'6–öâæ§6öâÆ–æFW‚æ‡FÖÂÆÆ–æV"Ö'&’Æ'&’ÖæF—fR×WbÇF÷FÂÖv—¦ÖòâvW3C#C““#ƒ““r6ö×ÆWFVB5T44U52âfö7W6VC52ód”Âó6¶—²†÷7FVBgVÆÂ&Vw&W76–öãC#C““#“C3bv2–â&öw&W72B&ööbÂæ÷B6Æ–ÖVB52âFWf–6RvFR&VÖ–ç2f÷"'&’÷&F–æ'’ôÆ—fRæB&V7W'&–ær&–v‡B×6–FRf—7VÇ2â6÷W&6RVF—F–æræF—fRÕUbÆ—fR'&’&VÖ–ç2Vç7W÷'FVB„6öçfW'Bf—'7B’âã“c‚òã“c’'Gv÷&²52&WF–æVC²ã“s÷fW&ÆÂ66WFæ6Ræ÷B–æfW'&VBâæW‡B&W7öæBFòã“sFWf–6R&W7VÇG2&Vf÷&RVFvRõ–çB–6öâv÷&²à ¢22ã“s"(	BÆ–âT’&VæFW&–æs²'&’52Âf—7VÂfVÇB7F–ÆÂ÷Vâ(	B#bö7Fö&W"##` ¥W6W"6—2(	Ä'&’æ÷rv÷&·2'WB&–v‡B†æB6–FRöb67&VVâ—27F–ÆÂf–Æ–æ~(	Òâ&V6÷&@¤'&““s66WFæ6RöæÇ“²Fòæ÷B–æfW#“sf—7VÂ52÷"6Æ÷6R&V7W'&–ærf—6–&–Æ—G’à¤VF—BÖ–â33““&"÷'VçF–ÖS6C–Sc"â'&’æF—fUUb†VÇW"æB&÷F‚F‡2VçF÷V6†VBà¢ã“crÆ–W"†–çG2æC“s5drvÆ÷r&VÖ÷fÂ&÷fVB–ç7Vff–6–VçBöâ&VÂ•Bà¤7W'&VçB67&VVç6†÷B÷&W÷'B–æF–6FW2f—7VÆÇ’'6VçB'WBDôÒÖ†VÇF‡’6öçG&öÇ3°¦æ÷BÆö6ÆÇ’&W&öGV6VBÂæò6öæf—&ÖVB'&÷w6W"ÖVæv–æRF–væ÷6—2à ¤VF—Bf÷VæB&6¶G&÷&ÇW"7F–ÆÂ7F—fR–âfÆöF–æræVÇ2ôf–ÆRõd”Urö&÷GFöÒÖöFW2À¦ÆVv7’FööÂ÷W2æB&VæÖRF–Æörâ†VFW"÷7FGW2ôö&¦V7D'&÷w6W"&WF–âã“cp§v–ÆÂÖ6†ævS¦÷6—G’†–çG2âæWr6–ævÆRV’×7F&–Æ—G’æ772FVfVÇBF—6&ÆW2&÷F€§&Vf—†VB÷Vç&Vf—†VB&6¶G&÷f–ÇFW'2VæFW"6ÂFV6÷&F—fRf–ÇFW'2öâ'WGFöç2æ@¦v—¦Öò5dw2ÂæBW‡G&÷6—G’ÖÆ–W"†–çG2öâF†÷6RF‡&VRT’&ö÷G2âW†—7F–ær÷6—G’À¦&÷&FW'2öf–ÆÇ2÷7G&ö¶W27F–ÆÂ6†÷rF—6&ÆVBö7F—fR7FFRâ÷VRF&²7W&f6W2&WÆ6P¦g&÷7FVBæVÂ&6¶w&÷VæG2âG–æÖ–2ÆFW"FööÂ7G–ÆW2&R÷fW'&–FFVâf––×÷'FçBà¤æòG&ç6f÷&×2Â&W&VçF–ærÂöÆÆ–ærÂ†–FFVî(i'6†÷vâG&–6·2Â&VæFW&W"ö†—7F÷'’ö–çW@¦6†ævW2ÂÆ–÷WBöfg6WG2ÂF—7Æ’÷f—6–&–Æ—G’ÂvVöÖWG'’÷"66WFVB–6öç26†ævVBà¢ã“cr6çf2—6öÆF–öâö6öçF–âÂ†VFW"£æBf—†VBd”Ur÷WÆ6VÖVçB&WF–æVBà¥F†RÆ–â&öf–ÆR—26öçG&öÆÆVB&VæFW&–ær&VGV7F–öâÂæ÷B&÷fVâVæv–æRf—‚à¥vV$¶—B&–Ö'’6÷W&6RW‡Æ–ç2&6¶G&÷f–ÇFW'26ö×÷6—FR&6¶w&÷VæB6öçFVçBæ@¦æVVBW‡G&&VæFW&–ær76W3¢‡GG3¢ò÷vV&¶—Bæ÷&rö&Æöró3c3"ö–çG&öGV6–ærÖ&6¶G&÷Öf–ÇFW'2òà¥F†—27W÷'G2&VÖ÷f–ærF†B&VæFW&–ærFƒ²—BFöW2æ÷B–FVçF–g’F†—2W†7B'Vrà ¤DUd”4S“s#¢&Vg&W6‚ÆæG66R×VÇF—ÆRF–ÖW2$Tdõ$R7v—F6†–ær3²–ç7V7B&–v‡@¤g&ÖTÆÂõVæFòõ&VFòôfö7W2ôö&¦V7G2õd”UræB&–v‡B7FGW2â÷Vâö&¦V7G2æBd”UrÖVçW3°¤'&’&Wf–WrôÇ’õVæFòÂUbVF—F÷"VçFW"öW†—BæB÷&&—BFò&–v‡BVFvRâ–bf—7VÀ¦Æ÷72&V7W'2ÂW†7C“s"T’FV'Vr&W÷'BÇW267&VVç6†÷B7F–ÆÂæVVFVC²vFRõTâà¤'&““s52&÷FV7FVC²VFvRõ–çB–6öâ&öÆÆ÷WB&VÖ–ç2W6VBf÷"f—6–&–Æ—G’à ¢ã“s"&R×V&Æ–6F–öâfÆ–FF–öã£3’fö7W6VBFW7G252ód”Âó6¶—VBâ&Wf–WvVB&VÆV6R6öçG&7B–æ6ÇVFW2æWrT’ÖöæÇ’7G–ÆW6†VWBâ'&’ö†VÇW"öv—¦ÖòöÖ–â6ö×÷6—F–öâ7G–ÆW6†VWBæB66WFVB–6öâ6†VWG2&R'—FR×Væ6†ævVBâæòÆö6ÂæF—fR•B&VæFW&–ær&W&öGV7F–öâ÷"f—7VÂ&W—"6Æ–ÖVBà ¢22ã“s"V&Æ–6F–öâfW&–f–VB(	B#bö7Fö&W"##` ¥'VçF–ÖRs“–VSfccFFVS–VVSv#cFFC6C6S““3cF63²WÆöFVBG&VR3c6ffSC3ƒVVS#fc&#c&3–3#6&ffC##3#V2ÖF6†W2FW7FVBÆö6ÃsSSf6V3râÖ–ã“s"fW'6–öâæBæWr7G–ÆW6†VWB–âfW&–f–VC²ÆÃ266†RÖ'W7FVBV&Æ–2f–ÆW2fW'6–öâæ§6öâö–æFW‚æ‡FÖÂ÷V’×7F&–Æ—G’æ772'—FRÖÖF6‚FW7FVB6†V6¶÷WBã3’fö7W6VBFW7G252ód”Âó6¶—âvW3C#S3CS‚v2VWVVBæB†÷7FVBF÷öÆöw“C#S3C#–â&öw&W72BÆ7BVW'“²Æ—fR'—FW27V'6WVVçFÇ’ÖF6†VBÂæò†÷7FVBgVÆÂ×7V—FR526Æ–ÖVBâW6W"'&““s52&÷FV7FVBâã“s"÷VR÷Æ–âT’FWf–6RFW7B&VG’Â&V7W'&–ær&–v‡B×6–FR&VæFW&–ær&VÖ–ç2õTâVçF–ÂW‡Æ–6—BfVVF&6²âæòæF—fR6ö×÷6—F÷"&ö÷B6W6R6Æ–ÖVBà ¢22ã“s2(	B÷BÖ–â6çf2f—6–&–Æ—G’&ö&S²ã“s"f—7VÂd”Â(	B#bö7Fö&W"##` ¥W6W"7WÆ–W2ã“s"&W÷'C£ƒ£CU¢gFW"&V7W'&–ær&–v‡B×6–FRfVÇBâã“s"Æ–à§&öf–ÆR—26öæf—&ÖVB7F—fS¢†VFW"÷7FGW2v–ÆÄ6†ævRWFó²ÆÂ6×ÆVBf–ÇFW'2æ@¦&6¶G&÷f–ÇFW'2æöæRâÆ–÷WBö†—G2&R7F–ÆÂ†VÇF‡’Â6ò&ÇW"öÆ–W"Ö†–çB&VÖ÷fÂF–@¦æ÷B&W—"f—7VÂÆ÷72âæò7FÆR×6†VÆÂW‡ÆæF–öâ÷"ã“s"f—7VÂ52â'&““s§W6W"52&WF–æVBâFòæ÷B6öçF–çVR7V7VÆF—fR6÷6ÖWF–2f—†W2÷"–6öâ&öÆÆ÷WBà ¤VF—BÖ–ã#cCfSV6"÷'VçF–ÖVs“–VSfâW‡FVæBôäÅ’W†—7F–ærf–Æ^(i%T’FV'Vr÷væW"v—F€®(	Ä†–FR4BöæÇž(	Òò(	Å6†÷r4Bv–î(	ÒâF†—2W‡Æ–6—BF–væ÷7F–2FV×÷&&–Ç’6WG2÷&–v–æÀ¦6çf2–æÆ–æRf—6–&–Æ—G’†–FFVâ–×÷'FçBÂ&WF–æ–ærÆ–÷WBö&6¶–ærF–ÖVç6–öç2À§&VæFW&W"öÖöFVÂö†—7F÷'’â&W7F÷&RW†7B&–÷"–æÆ–æRfÇVR÷&–÷&—G’†÷"'6Væ6R’À¦öâ6†÷rÂFV'VröfbæBvV†–FRâ&VgW6RVçG'’GW&–ær–çBÂ7F—fRFööÂ÷"v—¦ÖòG&s°§&W7F÷&F–öâÇv—2v÷&·2âæò&VÆöBÂ6V6öæB&VæFW&W"Â&W6—¦RÂöÆÆ–ær÷"æWr&p§ö–çFW"6öç7VÖW"âF—6&ÆVBFV'VröFVfVÇBVæ6†ævVBâW†—7F–ær553“s"&WF–æVBà ¥v†–ÆR†–FFVâÂW6W"6†ö÷6W2(	Å&–v‡BT’f—6–&Æ^(	Ò÷"(	Å7F–ÆÂÖ—76–æ~(	Ó²&÷VæFVBWf–FVæ6P§&V6÷&G27V&¦V7F—fR÷WF6öÖRÇW26çf2†–FFVâfÆræB7W'&VçBFööÆ&"&ö&W2à¤6GW&Rô6÷’–æ6ÇVFW26çf5&ö&R7FFRâ6†÷r6ÆV'266†VB&W÷'B6òæW‡B6÷¦–æ6ÇVFW2&÷F‚ö'6W'fF–öâæB&W7F÷&F–öâWfVçG2âT’Æör6öçG&öÇ2&VÖ–âöâÆVgBà¥F†—2—2F–væ÷7F–2'V–ÆBÂæ÷B6Æ–ÒF†B6öçG&öÇ2&Rf—†VBâF†R÷WF6öÖRv–ÆÀ§6W&FR6çf2'F–6—F–öâg&öÒT’ÖöæÇ’–çF–æs²æV—F†W"÷WF6öÖRÆöæR&÷fW0¦âVæv–æR&ö÷B6W6RâFW7G26÷fW"W†7B&W7F÷&F–öâÂ'W7’&VgW6ÂÂ7GVÂ'WGFöç2À¦ö'6W'fF–öâÂöfb÷vV†–FR6ÆVçWÂæBVæ6†ævVB6çf2F–ÖVç6–öç2öÖöFVÂö†—7F÷'’à ¤DUd”4S“s3¢v†–ÆR&–v‡B6öçG&öÇ2f—7VÆÇ’Ö—76–ærÂ$Tdõ$R7v—F6†–ærÂW6Rf–Æ^(i ¥T’FV'V~(i$†–FR4BöæÇ’â–ç7V7BF÷×&–v‡BFööÆ&#²6†ö÷6Rf—6–&ÆRöÖ—76–ær&W7VÇBà¥6†÷s4Bv–î(i$6÷’&W÷'BæB6VæBâÇ6ò6’–b&W7F÷&VC4BÖ¶W2&–v‡ET’F—6V ¦v–ââF†—2—2F†RæW‡BFV6—6–öâvFS²'&’&VÖ–ç266WFVC²æòÖöFVÆÆ–ær6†ævW2à ¢ã“s2fÆ–FF–öã£#bfö7W6VBFW7G252ód”Âó6¶—VB‡ã2ãG2“²÷&–v–æÂFV'Vr÷–çBö†—7F÷'’ô'&’æB&VÆV6R6öçG&7G2&WF–æVBâGvòæWrFW7G2W†W&6—6RW†7Bf—6–&–Æ—G’÷&–÷&—G’&W7F÷&F–öâÂ'W7’&VgW6ÂæB7GVÂFV'VrÖ'WGFöâö'6W'fF–öâööfb÷vV†–FRfÆ÷s²F–ÖVç6–öç2öÖöFVÂö†—7F÷'’&VÖ–âVæ6†ævVBâÖ–â&VæFW&W"÷6—¦–ærô'&’öv—¦ÖòæBÆÂ552'—FRÖ–FVçF–6ÂFó“s"âæòæF—fRT’&W—"6Æ–ÖVBà ¢22ã“s2V&Æ–6F–öâfW&–f–VB(	B#bö7Fö&W"##` ¥'VçF–ÖR6&336cVSƒ#&FF#CvS6C6#CF3ƒS3S“†fC†c²WÆöFVBG&VRS†&CVS6c6CfCS–#ƒ&C†C3cFCCfV&3Ff3&cBÖF6†W2FW7FVBÆö6ÂSV##6S–âÖ–âã“s2fW'6–öâöFV'Vr–âfW&–f–VC²V&Æ–266†RÖ'W7FVBfW'6–öâæ§6öâÆ–æFW‚æ‡FÖÂÆvW7GW&RÖFV'Vræ§2ÆÂ'—FRÖÖF6‚FW7FVBf–ÆW2âvW3C#SC#s“6ö×ÆWFVB5T44U52âfö7W6VC#b52ód”Âó6¶—²†÷7FVBF÷öÆöw“C#SC#s“‚–â&öw&W72B&ööbÂæò†÷7FVBgVÆÂ×7V—FR526Æ–ÖVBâD”täõ5D”2$TE“¢†–FRöæÇ’4Bv†–ÆRf–ÇW&R&W6VçBÂ&V6÷&Bf—6–&ÆRöÖ—76–ærÂ6†÷s4BÂ6÷’&W÷'Bâæòf—7VÂ&W—"6Æ–ÖVBâ'&““s52&WF–æVC²ã“s"Æ–â×&öf–ÆRd”Â&V6÷&FVBà ¢22ã“sB(	B&÷fVBVFvR–6öç3²W6W"&W7VÖW2–6öâ&öÆÆ÷WB(	B#bö7Fö&W"##` ¥W6W"6ææ÷B7W'&VçFÇ’&W&öGV6R&–v‡B×6–FRfVÇBöã“s2æBW‡Æ–6—FÇ’&WVW7G0®(	ÄÖ÷fRöçFòWFF–ær–6öç22&Vf÷&RöæW‡F'V–ÆN(	ÒâF†—2WF†÷&—¦W2&W7VÖ–ær–6öç3°¤äõB&÷fVâ6ö×÷6—F÷"&W—"÷"'&öC“s252â¶VW–çFW&Ö—GFVçBf—6–&–Æ—G’õTâÀ§&WF–â÷BÖ–ã“s26çf2&ö&RæC“s"Æ–âT’â'&““s52&÷FV7FVBà¤VF—B7W'&VçBÖ–ãCfF63#3÷'VçF–ÖV6&336cRÂ6†VÆÃ“s2æBÆÃ#W†—7F–ærVFvRFööÇ2à¤FBöæÇ’VFvR×&F–ÂÖ–6öç2æ773¢&÷fVB&ööc2'Gv÷&²Ã3'‚–6öç2æB÷&–v–æÀ§6ÖÆÂ6F–öç2â–æ6ÇVFW2&Wf—6VBöfg6WBôÖW&vTF—7Bôf–ÆÄf6RôF—76öÇfRæB&W7F÷&V@¤'&–FvRâW‡G'VFS"ô&WfVÃ2æBÄÂ6÷W&6RF&vWB”G2öÆ&VÇ2öæwVÆ"6Æ÷G2&WF–æVBà¤–ææW"6ÖSsl9sc÷#"2f6RõfW'FWƒ²÷WFW#cŒ9sS‚÷##3f—G2FVç6R÷&–v–æÂ76–ærÀ£—‚F—FÆW2öÆ–æRÖ†V–v‡C÷FF–æs'‚ÆÆ÷rGvòÖÆ–æR6F–öç2v—F†÷WBVæÆ&v–ær&–ærà¤öæRÖöfb&V7FævÆR6†V6²6öæf—&×3—'v—6R'WGFöâ÷fW&Æ27&÷73#F&vWG2à¤W†7B÷&–v–æÂFööÂWfVçBöf–Æ&–Æ—G’õUbö†—7F÷'’÷væW'2æBÆÂ'VçF–ÖT¥2&WF–æVBà¤f6RõfW'FW‚ôö&¦V7B6†VWG2Â'&’Ã“s2FV'VræC“s"7F&–Æ—G’552÷–ç2Væ6†ævVBà ¤DUd”4S“sC¢VFvR6VÆV7F–öî(i'&F–Â–ç7V7B–6öç2÷F—FÆW2öFVç6R÷WFW"76–æs²G'’6Æ–FRÀ¤&WfVÂæBÆö÷²7WBõ7F—F6‚Ub66W72æBVæFõ&VFòöâ7V—F&ÆRÖW6‚â7v—F6‚÷F†W ¦ÖöFW2Fò6öæf—&Ò66WFVB–6öç2Âæf–vF–öâæB&–v‡B6öçG&öÇ2&VÖ–âW6&ÆRà¤æW‡B–çB–6öç2gFW"VFvRfVVF&6²â¶VW6çf2F–væ÷7F–2–bf—6–&–Æ—G’&V7W'2à ¢ã“sBfÆ–FF–öã£S‚fö7W6VB6†V6·252ód”Âó6¶—VB‡ããƒG2’Âf–æÂ&Wf–WvVB&VÆV6R6†V6·3R52gFW"÷WFW"†V–v‡CS‡‚6—¦–ærF§W7FÖVçBã#5dw2fÆ–C²¦W&ò—'v—6R'WGFöâÖ&÷‚÷fW&Æ2B&WF–æVBævÆW2÷&F–’â÷WFW#S‡‚–æ6ÇVFW2Gvó—‚FW‡BÆ–æW2Ã3'‚–6öâÇFF–ærövö&÷&FW"âÆÂ'VçF–ÖT¥2Â&–÷"66WFVB552ó“s"7F&–Æ—G’æC“s2&ö&R'—FR×Væ6†ævVBâæF—fRÆ&VÂ&VF&–Æ—G’VæF–ærà ¢22ã“sBV&Æ–6F–öâfW&–f–VB(	B#bö7Fö&W"##` ¥'VçF–ÖSv3C“cSss#F6FS6#&6&csF3f63vFSc²WÆöFVBG&VV&6Fc&#sCVSCCS–6CCC“FvSƒF†66S#ƒ6BÖF6†W2FW7FVBÆö6Æcc#ƒ“S–âÖ–ã“sBfW'6–öâ÷6†VÆÂöæWrVFvR552–âfW&–f–VBâV&Æ–266†RÖ'W7FVBfW'6–öâæ§6öâÆ–æFW‚æ‡FÖÂÆVFvR×&F–ÂÖ–6öç2æ772ÆÂ'—FRÖÖF6‚FW7FVB6†V6¶÷WBãS‚fö7W6VB6†V6·252ód”Ã²f–æÂ&VÆV6R6†V6·3R53³#fÆ–B5dw2÷¦W&òF&vWB÷fW&Æ2âvW3C#Sc3ƒc#sæB†÷7FVBF÷öÆöw“C#Sc3ƒcsSbvW&R–â&öw&W72BVW'“²Æ—fRf–ÆW27V'6WVVçFÇ’ÖF6†VBÂæò†÷7FVBgVÆÂ×7V—FR526Æ–ÖVBâVFvS“sB&VG’f÷"æF—fR&VF&–Æ—G’ö7F–öâ&Wf–WrâW6W"6ææ÷B7W'&VçFÇ’&W&öGV6R&–v‡BfVÇBÂæ÷BÖ&¶VBf—†VC³“s2&ö&Ró“s"Æ–â552&WF–æVBâæW‡B–çB–6öç2gFW"fVVF&6³²'&““s52&÷FV7FVBà ¢22ã“sR(	B…’õ…¢õ•¢G2f÷"VFvRæBfW'FW‚W‡G'VFS²ã“sB–6öâ52(	B#bö7Fö&W"##` ¥W6W"ã“sB–6öç252&÷FV7FVC²6·2f—†VBv÷&ÆB×ÆæR6†ö–6W2f–6ÖÆÂ7V&RG0¦Æ–¶RÖ–âÖ÷fRv—¦ÖòÂ–â$õD‚VFvRæBfW'FW‚W‡G'VFRâVF—BÖ–ã&cvfSS2÷'VçF–ÖP£v3C“â÷&–v–æÂv—¦ÖòÇ&VG’†2…’õ…¢õ•¢öÇ–vöç2'WBW‡G'VFR†–BF†V—"w&÷W°¥fW'FW‚÷væW"66WG2öæÇ’g&VRõ…•¢æBVFvR66WG2÷&–v–æÂVFvR×W'VæF–7VÆ ¥ÆæRõ…•¢âW‡FVæBF†W6R4ÔR÷væW'2ÂæòæWrvW7GW&R÷F÷öÆöw’ö†—7F÷'’–×ÆVÖVçFF–öâà ¤W‡÷6RW†—7F–ærF‡&VRÆæRöÇ–vöç2GW&–ærW‡G'VFRÂ÷&–v–æÂÖ–âÆæR6öÆ÷W'2À¦&–…’õ…¢õ•¢Æ&VÇ2Â6VÆV7FVB×B7G&ö¶Röf–ÆÂö÷6—G’æB(	Å…’Ææ^(	Ò&FvRâBF §6VÆV7G26öç7G&–çBöæÇ“²G&r÷&–v–æÂVFvR÷fW'FW‚FòW‡G'VFRâ6VçG&Rg&VRæB…• ¦'&÷w2&WF–â&Wf–÷W2ÖVæ–æw2æB6öçG&öÇ2â&÷FF–öâõ66ÆR&VÖ–â†–FFVâGW&–æp¤W‡G'VFS²FöæR&W7F÷&W2æ÷&ÖÂv—¦ÖòâöÆBF—&V7F–öâ&÷r&VÖ–ç2†–FFVâ†æòGWÆ–6FR’à ¥6†&VBW‡G'VFR×ÆæRÖ6öç7G&–çG2†VÇW"7WÆ–W2v÷&ÆBæ÷&ÖÇ2ÂöÖ—GFVBÖ6ö÷&F–æFP§&ö¦V7F–öâæBW†7BF—&V7F–öââ…ž(i%¢f—†VBÂ…®(i%’f—†VBÂ•®(i%‚f—†VBBõ$”t”äÀ¦6ö×öæVçB6ö÷&F–æFW2†æ÷BvÆö&Â¦W&ò’â÷&–v–æÂvW7GW&R÷væW'2&–67BÆæP§F‡&÷Vv‚6VÆV7FVB6ö×öæVçB6VçG&S²g&VR×f–WræBVFvR×W'VæF–7VÆ"F‡2&W6W'fVBà¥v÷&ÆB×ÆæRVFvRG&rW6W2æÖVBÆæRF—&V7FÇ’Âæ÷BVFvR×W'VæF–7VÆ"&ö¦V7F–öâà¤W†7BföÆÆ÷w2Æ7BVÆÂ&ö¦V7FVB–çFò6VÆV7FVBÆæRÂ÷"&ö¦V7FVBf–Wr×WöfÆÆ&6³°¤VFvR6¶—26öÆÆ–æV"F—&V7F–öç2Fòfö–B¦W&òÖ&V&–&&öç2â&WVBÇ6ò&ö¦V7G0¦Æ7BfV7F÷"gFW"ÆæR6†ævRâæV"×&ÆÆVÂ&’&VgW6W26fVÇ’v—F‚÷&&—B†–çC°¦æòv–çB6ö÷&F–æFW2ÂW‡G&†—7F÷'’÷"Æ÷7Bæf–vF–öââW†—7F–ærfÆ–FF–öâöÖWFFFð§6VÆV7F–öâö†—7F÷'’6öÖÖ—BæB6æ6VÆÆF–öâ÷væW'2&WF–æVBâ–çFW&æÂöÆBfW'6–öà§7F×2&WF–æVB–çFVçF–öæÆÇ“²6†ævVBÆöFW"–ç2æB&Wf–WvVB†6†W3“sRWFFVBà ¥FW7G2W†V7WFR$õD‚7GVÂvW7GW&R÷væW'2v—F‚ö&Æ—VR6ÖW&2f÷"ÆÃ2ÆæW3 ¦×VÇF’×F—öVFvR&–&&öç2Â6–væVDW†7BÂ&WVBÂVæFõ&VFòÂ6æ6VÂæB6öç7FçBöÖ—GFV@¦6ö÷&F–æFS²G'VRVFvRÖöâ&VgW6Âöf—'7DW†7BfÆÆ&6³²7GVÂ6†ö÷6W"6ÆÆ&6·2æ@§f—6–&ÆRö†–v†Æ–v‡FVBG2âW†—7F–æssSr6†÷r×6VÆV7F÷"76W'F–öâW‡æFVBFò–æ6ÇVFP¦æWvÇ’W‡÷6VBÆæRw&÷W²æò&V†f–÷&Â&÷FV7F–öâG&÷VBâ66WFVB–6öâ552À¤'&““sæBf—6–&–Æ—G““s"ó“s26fVwV&G2VçF÷V6†VBâ–çFW&Ö—GFVçB&–v‡BfVÇB&VÖ–ç0§Vç&÷fVã²W6W"&V6VçFÇ’Væ&ÆRFò&W&öGV6RâæW‡BFWf–6RÆæR×B66WFæ6RÀ§F†Vâ–çB–6öâ&öÆÆ÷WBVæÆW72W6W"&W&–÷&—F—¦W2à ¤DUd”4S“sS¢VFvR&÷VæF'’öÆö÷6RVFv^(i$W‡G'VF^(i%…’õ…¢õ•¢6ÖÆÂ7V&W2ÂG&rV6ƒ²÷&&—@¦ö&Æ—VVÇ’–bÆæRVFvRÖöââ&WVB–âfW'FW‚ÖöFRâ6†V6²…’†öÆG5¢õ…¢†öÆG5’õ•¢†öÆG5‚À¤W†7Bõ&WVBõVæFõ&VFòô6æ6VÂæB6VçG&Tg&VRõ…•¢7F–ÆÂv÷&²âã“sB–6öâ52&WF–æVBà ¢ã“sRfÆ–FF–öã£ƒ‚fö7W6VBFW7G252ód”Âó6¶—VB‡ããSg2’Â–æ6ÇVF–æs‚æWr&VÂÖ÷væW"ÆæR–çFVw&F–öç2æB÷&–v–æÂVFvRõfW'FW‚ôW†7Bõ&WVBö6æ6VÂöv—¦Öò÷&VÆV6Rô'&’öF–væ÷7F–26öçG&7G2â7–çF‚6†V6·272â÷&–v–æÃsSrf—‡GW&Ræ÷rW‡V7G2ÆæRw&÷WÆöæw6–FR†W2ö6VçG&Râ&VæFW&W"Â×VÇF“ãÂ'&’ÂF–væ÷7F–72æBÆÂ66WFVB–6öâ÷7F&–Æ—G’552'—FR×Væ6†ævVBâæF—fR•BB6—¦R÷–6¶–ær÷&VF&–Æ—G’&VÖ–ç2FWf–6RvFRà ¢22ã“sRV&Æ–6F–öâfW&–f–VB(	B#bö7Fö&W"##` ¥'VçF–ÖR6CC†&ccFSs3Ss#cSc“3sS3ƒƒ“Vc3CC²WÆöFVBG&VSsFfS3c3†C3ScC“#ƒ#3&Vc#VCSscCc–SSFcRÖF6†W2FW7FVBÆö6Æc“6F2âÆÃr66†RÖ'W7FVBV&Æ–2f–ÆW2'—FRÖÖF6ƒ¢fW'6–öâæ§6öâÆ–æFW‚æ‡FÖÂÆVFvRÖW‡G'VFRÇfW'FW‚ÖW‡G'VFRÇF÷FÂÖv—¦ÖòÇfW'FW‚×FööÂ×f–Ww÷'B×6W76–öâÆW‡G'VFR×ÆæRÖ6öç7G&–çG2ãƒ‚fö7W6VBFW7G252ód”Âó6¶—²f–æÃR&VÆV6R6†V6·252âæF—fRÆæRB66WFæ6RVæF–ærâ†÷7FVBgVÆÂ×7V—FR&W7VÇBæ÷B6Æ–ÖVBâW6W"7WÆ–VBVFvRf–Âæö&¢ƒ#BfW'F–6W2óBVG2Â÷Vâ6ÆVâW‡÷'Bg&öÓƒ“"“²6VÆV7FVBVFvRöGFV×Bæ÷B&V6÷&FVBÂæòf–ÇW&R6W6R–æfW'&VBâ'&’52æB–6öã“sB52&÷FV7FVC²–çFW&Ö—GFVçB&–v‡B×6–FRfVÇB&VÖ–ç2vF6‚à  ¢22ã“sb(	B&V6öææV7B&VG’VFvR'&–FvR6VÆV7F–öç2(	B#bö7Fö&W"##` ¤VF—BÖ–ãƒ&FfBö'V–ÆC“sRâW6W"7WÆ–W267&VVç6†÷C“sRæBW†7BVFvRf–Âƒ’æö& ¢ƒ#BfW'F–6W2óBVG2“²&WF–âVæ6†ævVBf—‡GW&RFW7G2öf—‡GW&W2öVFvRÖ'&–FvRÓ“sbæö&¢à¥F†R†–v†Æ–v‡FVB&÷VæF'’—"—2ô$¢fW'F–6W3>(	3æC#>(	3#B‡'VçF–ÖRVFvW3"ó3R’à¤&÷F‚†fRöæRf6R÷væW"âW†—7F–ærgVÆÇ’–ç7FÆÆVB÷Vâ6†–â'&–FvR66WG2F†R—"À¦7&VFW2VE³2Ã#2Ã#BÃÒ„ô$¢öæRÖ&6VB’æB76W2÷&–v–æÂF÷öÆöw’fÆ–FF–öâà¥&F–ÂwV–FVB6W76–öãcsb–æ6÷'&V7FÇ’66WFVBôäÅ’öæR6ö×ÆWFR&÷VæF'’Æö÷–à¦6å7F'Bö÷Väg&öÔ‡V"ÂF—66öææV7F–ærÇ&VG’×7W÷'FVB&VG’—'2â&W—"4ÔP§6W76–öã¢FVÆVvFR&VG’×—"VÆ–v–&–Æ—G’FòW†—7F–ær'&–FvTVFvU6VÆV7F–öä–æfòÂ&WF–à§6–ævÆRÖÆö÷wV–FVBVçG'’Â7–æ2Ç’–ÖÖVF–FVÇ’Â6†÷r&VG’7FGW2â÷&–v–æÂT’À§F÷öÆöw’Âv–æF–ær÷VÆ—G’÷G&ç67F–öâwV&G2æB†—7F÷'’÷vâÇ’Væ6†ævVBà¤6æ6VÂ&WF–ç2–æ—F–Â—#²–çfÆ–Bö–çFW&–÷"öÖ—76–ær÷6–ævÆRÖ÷VâÖVFvR–çWG2&VgW6Rà¤æòæWr¶W&æVÂövW7GW&RÂv—¦Öò6†ævW2Â&VæFW&W"f—†W2÷"–6öâv÷&²ã“sRB66WFæ6P¦æ÷B–æfW'&VBg&öÒWÆöFVB67&VVç6†÷Bã“sB–6öâó“s'&’52æC“s"ó“s2f—7VÀ§6fVwV&G2&VÖ–ã²–çFW&Ö—GFVçB&–v‡B×6–FRfVÇB—27F–ÆÂõTâà ¥fÆ–FF–öã£##Rfö7W6VB'&–FvR÷6VÆV7F–öâÖ‡V"÷&F–Â÷&VÆV6RFW7G252Ãd”Âó6¶—à¤f÷W"æWr&VÂÖ÷væW"–çFVw&F–öç26÷fW"7WÆ–VB—.(i&7GVÂ&F–Âf–Æ&–Æ—Gž(i ¦÷&–v–æÂT’Çž(i&öæR†—7F÷'’7FWõVæFõ&VFòÂ6æ6VÂÂwV–FVB6–ævÆRÖÆö÷(i'6V6öæBÖÆö÷À¦æB–çfÆ–B–çWBFöÖ–2&VgW6ÂâæöFRDôÒFFW'2&Ræ÷BæF—fR•B&ööbà¤6†ævVB'VçF–ÖRôäÅ’6VÆV7F–öâÖ‡V"Ö'&–FvR×6W76–öã²&Wf–WvVB6W76–öâ÷&V6÷fW'’–ç3“sbÀ§&VÆV6RÖ&¶W'3“sbæB76WB†6†W2WFFVC²×VÇF“ãög&÷¦Vâö–6öâövVöÖWG'’Væ6†ævVBà¥V&Æ–6F–öâfW&–f–6F–öâföÆÆ÷w26W&FVÇ’âDUd”4S“sc¢6ÖRÖöFVÂ÷Gvò&VBVFvW2(i ¤VFvR&F–Â'&–FvR(i"Ç’'&–FvS¢öæR6Æ÷6–ærVBâVæFõ&VFó²&V÷VâF†Vâ6æ6VÀ§&WF–ç2—"övVöÖWG'’âÇ6ò6æ—G’Ö6†V6²W†—7F–ærGvòÖÆö÷'&–FvRâæW‡B7GVÂFWf–6P¦fVVF&6²ÂF†Vâ–çB–6öâ&öÆÆ÷WC²&W6W'fR–æFWVæFVçC“sRW‡G'VFRBFWf–6RvFRà ¢22ã“sr(	B&F–Âv—&–ærVF—BæBæV"Ög&öçBW†7BW‡G'VFR(	B#bö7Fö&W"##` ¥W6W"&WVW7G2VF—BöbÆÂ&F–ÂFööÇ3²÷&&—B6öÖWF–ÖW26†ævW2F‡&÷Vv‚&VgW6Âà¤VF—B7W'&VçBÖ–ãSc6fVFS’ö'V–ÆC“sbâgVÆÂ&÷WFR–çfVçF÷'“ƒVçG&–W2„f6S#2ôVFvS#ð¥fW'FWƒBôö&¦V7C2õ–çC’Â÷&–v–æÂF&vWG2öf–Æ&–Æ—G’ö6öçFW‡BFFW'2ö7F–öâ÷væW'3 ¢Fö72÷&F–Â×v—&–ærÖVF—BÓ##bÓÓ#bæÖBâæòÖ—76–ær7F–öâ÷væW"÷"w&öærÖÖöFRF&vW@¦f÷VæB–â6÷W&6R&Wf–Ws²F†—2—2æ÷BW††W7F—fRæF—fRÖvW7GW&RöÖW6‚6W'F–f–6F–öâà£“sb'&–FvRÆVæ6†W"FVfV7B&W—&VB÷V&Æ—6†VC²ÆÃ26†ævVBÆ—fRf–ÆW2'—FRÖÖF6‚à¤&6VÆ–æS“sbeTÄÃ#ƒ3552ód”Âó6¶—ƒãw2’Âfö7W6VC##U52à ¤6öæf—&ÖVB6W&FRW†7B'Vs¢&V6—6–öâÖf6R&ö¦V7FVBÖæ÷&ÖÂfÆÆ&6²F‡&W6†öÆCRÓW€§fW'7W27GVÂ×VÇF’Öf6RÖF—&V7BvW7GW&SRÓG‚6â–çfW'B6–vâ–âæ'&÷ræV"Ög&öç@¦6ÖW&&æBâW†—7F–ær&WfVÂÖ–ç6WCsSf6SrÂ6ÖW&6VçG&R¶æ÷&ÖÂ£R²ƒÃRÓbÃ“¢W†7@¢Ó"ã"–æ6÷'&V7FÇ’W‡G'VFW2³"ã#²÷&&—Bã7WG2–çv&BâÆ–vâõ$”t”äÂ&V6—6–öâ7WFöf`§FòvW7GW&SRÓBôäÅ’âæòÖ–âöG&rö¶W&æVÂövVöÖWG'’ö†—7F÷'’ö–æfW&Væ6R÷‡—6–6Â–çWB6†ævRà¤G–æÖ–2&V6—6–öâÖf6R6†–ÆBæBG&vW"×V’&VçB÷6†VÆÂ¶W—3“sr&Vg&W6†VC²÷&–v–æÀ¦–çFW&æÂ7F×2&WF–æVBâ&Wf–WvVB†6†W2æB&VÆV6R&V6÷fW'’÷6†VÆÂÖ&¶W'3“srà¥F‡&VRæWrFW7G2W6R7GVÂ&V6—6–öâ&ö¦V7F–öâ²æF—fR6öçG&öÆÆW"öfÆÆ&6³£ævÆW2À¦W†7B6Æ÷6VB÷WGWBõVæFõ&VFòÂöÆBÖ6öFR×WFF–öâ6Vç6—F—f—G’Âf—fR‡—6–6ÂG&w2æ@§W&R×Æâ–çf&–æ6Râfö7W6VBf–æÃ#…52ód”Âó6¶—Âæ÷BgVÆÃ“sr&W'Vâà ¥W6W"w2‡—6–6ÂF‡&÷Vv‚&VgW6Â&VÖ–ç2Vç&÷fVâöâffV7FVBÖöFVÂâ6ÖW&6†ævW0§&ö¦V7FVBG&vv–æræB&VfW&Væ6R–æfW&Væ6S²æò&Ææ¶WB&VgW6Âf—‚6Æ–ÖVBâVF—@¦Ç6ò&V6÷&G2GvòföÆÆ÷r×W3¢çVÖW&–27–çF†WF–2–çWB7F–ÆÂG&fW'6W2–æfW&Væ6RÂæ@§&V6—6–öâ7V66W72÷&VF&6²Æ6·2F÷vç7G&VÒ6öÖÖ—B6¶æ÷vÆVFvVÖVçBâ¶VWF†W6RõTà¦f÷"æ'&÷r&W7VÇBö6öç7G&–çBv÷&³²FöâwB&VÆ‚F÷öÆöw’wV&G2÷"&WÆ6R¶W&æVÂà ¤æWrf—6–&–Æ—G’Wf–FVæ6Rv†–ÆS“sr&W&VC¢W†7C“sb&W÷'CC£S3£…¢6†÷w2†–FR6çf0¦C#Cc#bÂ&–v‡ET’f—6–&ÆRö'6W'fF–öã3SBÂ&W7F÷&S3s#CbâW6W"6öæf—&×26öçG&öÇ25D§f—6–&ÆRgFW"6†÷s4BâF÷ÖÆWfVÂ†–FFVã¦fÇ6R—2&W7F÷&VB7FFRâÆ–÷WB÷7G–ÆW2ö†—G0¦†VÇF‡’F‡&÷Vv†÷WC²æõ–çB÷6W76–öâÂÆ–ã“s"7F—fRâF†—2–×Æ–6FW26çf2õT§–çF–ær–çFW&7F–öâ'WBæòVæv–æR&ö÷B6W6R÷"W&ÖæVçBf—‚—2&÷fVââ&WF–à¤õTâ&V7W'&Væ6RæBFWf–6R×&÷fVâÖçVÂ†–FS4N(i%6†÷s4B&V6÷fW'“²æòWFöÖF–2&Æ–æ²À§öÆÂ÷&VÆöB÷&VæFW&W"6†ævRâ6VRFö72÷V’Ö6çf2×&ö&RÓ“sbæÖBf÷"&V6—6RWf–FVæ6Rà ¤DUd”4S“ss¢6öæf—&Ó“srÂ6ÖRæVvF—fRW†7BöâæV"Ög&öçBF†Vâ6Æ–v‡FÇ’÷&&—FVBf–Ws°¥VæFõ&VFó²&WG'’÷&–v–æÂ‡—6–6ÂF‡&÷Vv‚v—F‚–æfW&Væ6RöfbööâÂ6VæBW†7B&VgW6À¦æB&RÖGFV×Bæ&÷†Æ"–b&V7W'&–ærâ'&–FvR—"Ç’ô6æ6VÂ&WF–æVBâ–b&–v‡BT¦f–Ç2W6RW†—7F–ær†–FS4N(i%6†÷s4C³“srFöW2äõB6Æ–ÒFò&W—"f—6–&–Æ—G’âæW‡B&–÷&—F—¦P¦Wf–FVæ6RÖÆVB6çf2õT’F–væ÷6—2ÂF†VâW†7B×&W7VÇBö–æfW&Væ6RföÆÆ÷r×W2&Vf÷&RÖ÷&P¦fVGW&R&öÆÆ÷WBã“sB–6öâó“s'&’66WFæ6RæB&÷FV7FVD×VÇF“ãög&÷¦VâVæ6†ævVBà ¢22ã“srV&Æ–6F–öâfW&–f–VB(	B#bö7Fö&W"##` ¥'VçF–ÖR6#VSs†3#6cC3S“#†C–cƒS“FcSS“#“Sv33c²FW7FVB÷WÆöFVBG&VSƒ3SsC†#–3ccSƒ3sƒ–3SS#V6##CssSc3ÂÆÃ"&Æö'2fW&–f–VBâ7W'&VçBÖ–â6†VÆÂöÖæ–fW7BæBG–æÖ–2G&vW"÷&V6—6–öâ–ç3“srÖF6‚FW7FVB6÷W&6RâÆÃB66†RÖ'W7FVBV&Æ–2f–ÆW2‡fW'6–öâÆ–æFW‚ÆG&vW"×V’Ç&V6—6–öâÖf6R’'—FRÖÖF6‚gFW"&öÆÆ÷WBâfö7W6VBf–æÃ#…52ód”Âó6¶—²gVÆÃ#ƒ3552&VÆöæw2Fó“sb&6VÆ–æRâ†÷7FVBv÷&¶fÆ÷r&W7VÇG2Væf–Æ&ÆR‡VW'’&WGW&æVBæò'Vç2’Âæò†÷7FVBgVÆÃ“sr526Æ–ÖVBâ6çf2†–FS4N(i%6†÷s4B&V6÷fW'’—2W6W"Ö6öæf—&ÖVC²VæFW&Ç––ærf—7VÂfVÇB&VÖ–ç2õTââDUd”4S“sræVvF—fRW†7BæV"Ög&öçBö÷&&—BõVæFõ&VFòæB'&–FvR—#²‡—6–6Â&VgW6ÂæB–æfW&Væ6R÷&VF&6²&VÖ–âVF—BföÆÆ÷r×W2âF†—2&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’à ¢22ã“s‚(	BVFvR'&–FvR&Wf–Wr&Vf÷&RÇ’(	B#bö7Fö&W"##` ¥W6W"6Æ&–f–W3“sb6öÖÖ—G2gFW"Ç’'WBFöW2æ÷B$Ud”UrÂVæÆ–¶R66WFVBf6P¤'&–FvRâF†—2—2Ö—76–ær–çFW&7F–öâ7FvRÂæ÷Bf–ÆVB'&–FvRF÷öÆöw’â&–÷#“s`§&VG’×—"ÆVæ6†W"&W—"&WF–æVC²æò'&öC“sbó“sr52–æfW'&VBâVF—BÖ–æcf6fc3À§6ÖRwV–FVBVFvR6W76–öâ†Bæò&Wf–Wr÷væW#²f6R'&–FvR×WFFW2&Wf–WrÖW6‚À§v†–ÆR66WFVBf6RõfW'FW‚&WfVÂÇ&VG’6†&W2&VæFW&–ærÖöæÇ’&ÇVRv†÷7B†VÇW"à¥&WW6RW†—7F–ær7&VFTf6T&WfVÅ&Wf–WröF—7÷6Tf6T&WfVÅ&Wf–WrVæ6†ævVBf÷"VFvRà ¥4ÔR6VÆV7F–öâÖ‡V"Ö'&–FvR×6W76–öâ'V–ÆG2÷&–v–æÂ'&–FvU6VÆV7FVDVFvW2öâ&—fFP¦6ÆöæRæB&VæFW'26†ævVBöÇ–vöç2v—F‚÷&–v–æÂ&ÇVRG&ç6ÇV6VçBf–ÆÂ÷v—&R†VÇW"à¤÷&–v–æÂ6÷W&6R÷6VÆV7F–öâöÖWFFFö†—7F÷'’÷&ö¦V7B&VÖ–âVçF÷V6†VBVçF–ÂÇ“°¦æòæWrÖöFVÆÆ–ær÷G&–æwVÆF–öâö†—7F÷'’¶W&æVÂÂÖævW"ÖW6‚&WÆ6VÖVçB÷"&VæFW&W"à¤6æF–FFR6ÆöæR6ÆÇ2&W6W'fR7F—fR7FFRæÖW6‚FW7—FR†—7F÷&–6ÂVFvW2ö'6W'fW'2à¥6VÆV7F–öâÖ¶W’66†R&WW6W2&Wf–WrGW&–ær÷&&—C²6VÆV7FVBÖ&÷VæF'’6†ævR&V'V–ÆG2—BÀ¦–æ6ö×F–&ÆR÷VÆ—G’×&VgW6VB6æF–FFW26ÆV"—BâwV–FVBf—'7BÆö÷6†÷w2æòv†÷7@§VçF–Â6ö×F–&ÆR6V6öæB&÷VæF'’6VÆV7FVBâÇ’F—6&ÆVBv—F†÷WB7GVÂ&Wf–Wrà¤Ç’'Vç2÷&–v–æÂ'&–FvR×V’6öÖÖ—Böæ6S²6æ6VÂ&VÖ÷fW2v†÷7BæB&WF–ç2–æ—F–À§6VÆV7F–öââW†—7F–ærVæFõ&VFòv÷&·2â&Wf–Wr&VæFW&W"ö†VÇW'2æBf6R'&–FvRVæ6†ævVBà ¥6W76–öâ÷vç26÷W&6R6æ6†÷B¶W’Âö&¦V7BöÖöFRöÆö6²÷66VæR6öçFW‡BâW‡FW&æÂvVöÖWG'’ð¦ÖWFFF6†ævW2Âö&¦V7BöÖöFR÷FööÂ6†ævRÂvV†–FRF—7÷6Rv†÷7Bt•D„õUB&W7F÷&–æp§7FÆRÖW6‚÷6VÆV7F–öâ÷"6Æ÷6–æræWvW"FööÂT’â÷&–v–æÂ&6¶w&÷VæBÖW†—B&÷WFR7F–ÆÀ¦6ÆÇ26Æ÷6S²æòæWr&r×ö–çFW"÷væW"ÂW"Ög&ÖRöÆÆ–ær÷"6÷W&6R&öÆÆ&6²â6†&V@¦vVöÖWG'’öÖFW&–ÂF—7÷6Âö67W'2öæ6Râ÷fW&Æ’—2G&ç6–VçB÷WG6–FR66VæRö&¦V7@¦ÖævW"æBW6W2W7F&Æ—6†VB&WfVÂ&ÇVR7G–ÆRÂæ÷B6fVBvVöÖWG'’÷"6V6öæB&öG’à ¤fö7W6VC#3%52ód”Âó6¶—‡ããcw2“¢÷&–v–æÂ'&–FvR÷&F–Â÷6VÆV7F–öâ6öçG&7G2æC“sp¦6ÖW&&Vw&W76–öç3²f÷W"FFVB&VÂÖ6öçG&öÆÆW"õF‡&VR66VæRFW7G2&÷fRf—6–&ÆRv†÷7@¤$Tdõ$RÇ’v—F‚æò6÷W&6Rö†—7F÷'’6†ævW2ÂöæR×7FW6öÖÖ—BµVæFõ&VFòÂ6VÆV7F–öà§WFFR÷&VÖ÷fÂô6æ6VÂÂ6÷W&6Röö&¦V7BöÖöFR÷FööÂ÷vV†–FR6ÆVçWÂæò×66VæR&VgW6Âæ@§6–ævÆRvVöÖWG'’÷GvòÖFW&–ÂF—7÷6ÂâW†—7F–æs“sb†&æW727WÆ–W2&VÂ66VæR÷6†&V@§&Wf–WrgVæ7F–öç3²æòöÆBvVöÖWG'’ö†—7F÷'’76W'F–öâ&VÖ÷fVBâæòæF—fR•Bf—7VÀ¦66WFæ6R–æfW'&VBâ'VçF–ÖR6†ævRôäÅ’÷&–v–æÂVFvR'&–FvR6W76–öã²6W76–öâ÷&V6÷fW'§–ç3“s‚ÂVæ6†ævVCsb&VæFW&W"–×÷'BW‡Æ–6—FÇ’&Wf–WvVB–â76WB6öçG&7Bà ¤DUd”4S“sƒ¢6VÆV7B6ÖRGvò&÷VæF'’VFvW2(i"VFvR&F–Â'&–FvS¢$ÅTR7âf—6–&ÆP¤$Tdõ$RÇ’â÷&&—BFò–ç7V7C²Ç’¶VW2'&–FvRæB&VÖ÷fW2&ÇVRÂVæFõ&VFòà¤6æ6VÂ&VÖ÷fW2&ÇVRÂ&W6W'fW2÷&–v–æÂÖW6‚÷6VÆV7F–öââwV–FVBGvòÖÆö÷6VÆV7F–öà§WFFW2&Wf–Wr26V6öæB&÷VæF'’—26VÆV7FVBâf6R'&–FvR&VÖ–ç2Væ6†ævVBà¥&–v‡B×6–FRfVÇB7F—2õTâv—F‚6öæf—&ÖVBÖçVÂ†–FS4N(i%6†÷s4B&V6÷fW'“²æò&VæFW&–æp§&W—"÷"÷F†W"ã“srW†7Bö–æfW&Væ6R÷&VF&6²föÆÆ÷r×W–æ6ÇVFVBâæW‡BæF—fR&Wf–Wp¦fVVF&6²ÂF†VâWf–FVæ6RÖÆVB6çf2õT’v÷&²æB&VÖ–æ–ærVF—BföÆÆ÷r×W2à ¢22ã“s‚V&Æ–6F–öâfW&–f–VB(	B#bö7Fö&W"##` ¥'VçF–ÖS&66Sƒ#sC–6c6Sƒƒ†#f&CƒfSc#Ss&3–cF33#c“S²W†7BFW7FVB÷WÆöFVBG&VS–&3C–&3ƒfSs“†f#“C&FfF3f3Cf“S6S#ÂÆÃ&Æö"†6†W2fW&–f–VBâ7W'&VçBÖ–â&VÆV6R÷6†VÆÂ÷6W76–öã“s‚–âæB6÷W&6RÖF6‚FW7FVB6†V6¶÷WBâ66†RÖ'W7FVBV&Æ–2fW'6–öâæ§6öâÆ–æFW‚æ‡FÖÂÇ6VÆV7F–öâÖ‡V"Ö'&–FvR×6W76–öâæ§2ÆÂ'—FRÖÖF6‚gFW"&öÆÆ÷WBâfö7W6VC#3%52ód”Âó6¶—²†÷7FVBVW'’&WGW&æVBæò'Vç2Âæò†÷7FVBgVÆÂ×7V—FR&W7VÇB6Æ–ÖVBâVFvR'&–FvR&ÇVR&Wf–Wr$Tdõ$RÇ’Â6æ6VÂ÷6÷W&6R—6öÆF–öâæB6öçFW‡BF—7÷6Â&R&VG’f÷"DUd”4S“sƒ²æòæF—fR•B&Wf–Wr66WFæ6R–æfW'&VBâf6R'&–FvRÂ÷&–v–æÂ'&–FvR¶W&æVÇ2Ã“srW†7B6÷'&V7F–öâÃ“s"ó“s2&VæFW&–ær6fVwV&G2æB&÷FV7FVB×VÇF“ã&VÖ–âVæ6†ævVBâ&V7W'&–ær&–v‡B×6–FRfVÇB7F—2õTââF†—2&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’à ¢22ã“s’(	BW†7B–æfW&Væ6R—6öÆF–öâæBG'WF†gVÂ6öÖÖ—B&VF&6³²'&–FvS“s‚52(	B#bö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’56W3“s‚'&–FvR&Wf–Wr&Vf÷&RÇ’ô6æ6VÃ²&÷FV7B—G2&—fFP¦6ÆöæRö&ÇVRv†÷7B÷6÷W&6RÖæWWG&Â&Wf–WrööæR×7FW÷&–v–æÂ6öÖÖ—BæBÆ–fV7–6ÆRà¥W6W"öæW‡F'V–ÆBWF†÷&—¦W2F†RGvò&VÖ–æ–ærW†7BVF—Bf—†W2âVF—B&VÖ÷FRö7W'&Vç@¦Ö–ã#ƒs†’Â&VÆV6S“s‚âW†—7F–ærçVÖW&–2vW7GW&W2Ç&VG’W6R&W6W'fVBö–çFW#“ƒsc°¦W†—7F–ærF—&V7B6öÖÖ—GFVBWfVçB÷vç27V66W76gVÂvVöÖWG'’fÇVW2âæòæWr¶W&æVÂæVVFVBà ¤÷&–v–æÂf6R&VfW&Væ6UVæFW%ö–çFW"æ÷r–væ÷&W2ôäÅ’çVÖW&–2ö–çFW#“ƒsbâ‡—6–6À¥Væ6–ÂöÖ÷W6R–æfW&Væ6RæBFövvÆR7FFR7F’Væ6†ævVBâ6÷fW'2W‡G'VFRæB–ç6WC°¦÷&–v–æÂÖöFVÂ×Væ—BöF—&V7F–öâÖ–ærÃ“srÆ–væVBæV"Ög&öçB&ö¦V7F–öâÂF‡&÷Vv€§6†VÆÂÖW†—B6æ–æræB–ç6WB6fWG’6Æ×&VÖ–ââW†7B7F–ÆÂVçFW'2÷&–v–æÀ¦6öçG&öÆÆW"æBwV&FVBvVöÖWG'’ö†—7F÷'’÷væW'3²æò6W&FRÖöFVÆÆ–ærÆv÷&—F†Òà ¥&V6—6–öâG&6·2öæR7–æ6‡&öæ÷W2çVÖW&–2&WVW7BæBÆ—7FVç2Fòõ$”t”äÀ¦&÷†Æ"Öf6RÖF—&V7BÖ6öÖÖ—GFVBâ—B&V6÷&G27V66W72õ&WVB÷&VF&6²öæÇ’gFW"F†@§6VÖçF–26¶æ÷vÆVFvVÖVçBÂW6–ær5ETÂ6öÖÖ—GFVBfÇVR&F†W"F†â&WVW7FVB–çWBà¤W†—7F–ær÷6—F—fR÷&V6W72ö6Æ÷6VBÖæVvF—fRô–ç6WBWfVçG2&WF–æVC²öÆB÷Vâ×6†VW@¥F‡&÷Vv‚7V66W72'&æ6‚æ÷rVÖ—G26ÖR6VÖçF–2WfVçBgFW"÷&–v–æÂwV&FVB6öÖÖ—Bà¤W†×ÆS¢&WVW7FVBÓ"ã"7F÷–ærB6†VÆÂW†—BÓ"ã&V6÷&G2öF—7Æ—2Ó"ãâ–ç6WB&WVW7@¦&÷fR6fR&ævRF—7Æ—2÷&–v–æÂ6Æ×VBF—7Fæ6RÂæWfW"âVçW&f÷&ÖVCà ¤æò6¶æ÷vÆVFvVÖVçBÖVç2fÇ6R÷&VgW6VB7FGW2Âæòf¶RfÇVRÖ6öÖÖ—GFVBWfVçBÂ&–÷ §7V66W76gVÂW"×FööÂ&WVB÷fÇVR&WF–æVBâ&VgW6Â&VF÷WB7W'f—fW27V'6WVVçB7FGW0¦ö'6W'fW"6ÆÆ&6·2ÂWfVâv—F‚æò&–÷"7V66W73²æW‡B‡—6–6Â&W72ôW†7BGFV×Bð§7V66W726ÆV'2—Bâ&Ææ²÷¦W&òöæöæf–æ—FR–çWBæB'6VçB†—7F÷'’&VgW6R&Vf÷&P§7–çF†WF–2vVöÖWG'’F—7F6‚â÷&–v–æÂ&VgW6Â÷&öÆÆ&6²÷6VÆV7F–öâö†—7F÷'’&VÖ–âà¥‡—6–6ÂG&r6ÆÆ&6·27F–ÆÂ&V6÷&BvVöÖWG'’æ÷&ÖÆÇ’âF†—2—2G&ç67F–öâ&W÷'F–ærÀ¦æ÷B&VÆ†F–öâöbF÷öÆöw’&VgW6Â÷"&ööböbW6W"w2‡—6–6ÂF‡&÷Vv‚f–ÇW&R&W—"à ¤f–æÃSrfö7W6VE52ód”Âó6¶—ƒ‚ãw2“¢æWsr7GVÂ&V6—6–öâ¶F—&V7BÖ6öçG&öÆÆW"FW7G0§ÇW2f6RõF‡&÷Vv‚öæVvF—fR÷&WVB÷&F–Âô'&–FvR÷&VÆV6R&Vw&W76–öââæWrf—‡GW&W2'Và¦÷&–v–æÂVæ–f÷&ÒÖ–ç6WB÷væW"&F†W"F†â6VçG&RÖÆW'fÆÆ&6²âFW7BW†7Bã3rC0¦6ÖW&2ÂF‡&÷Vv‚CFæV"öö&Æ—VRf–Ww2Â7GVÂW†—BFWF‚ÂVæFõ&VFòööæR6†V6·ö–çBÀ§&VgW6VBVçF—&R×6öÆ–B7WBv—F‚Væ6†ævVB6÷W&6Rö†—7F÷'’öÆ7BfÇVRÂ7GVÂ6Æ×V@¤–ç6WBÂçVÖW&–2–çfÆ–BöæòÖ†—7F÷'’&VgW6ÂÂ&VÂ‡—6–6ÂfW'FW‚–æfW&Væ6Rg26ÖP¦çVÖW&–26öçF7BÂW'6—7FVçBf–ÇW&R&VF÷WBâæòæF—fR•B66WFæ6R–æfW'&VBà¤6†ævVBgVæ7F–öæÆ—G’ôäÅ’&V6—6–öâÖf6RæC6Æ–æW2–â÷&–v–æÂ×VÇF’Öf6RÖF—&V7C°¦G&vW"×V’6†ævW26†–ÆB–âöæÇ’â&Wf–WvVB&VçBö6†–ÆBöF—&V7B÷&V6÷fW'’–ç3“s’æ@§6†VÆÂÖ&¶W'2ö76WB†6†W2âÖ–âövVöÖWG'’õF‡&÷Vv‚¶W&æVÇ2ô'&–FvS“s‚ô×VÇF“ãög&÷¦Vâð¦–6öç2ó“s'Æ–âó“s7&ö&R&VÖ–âVæ6†ævVBâæòGWÆ–6FR†—7F÷'’÷"–çWB÷væW"à ¤DUd”4S“s“¢v—F‚–æfW&Væ6RôâÂf6RW†7Bã3r†÷"6öçfVæ–VçBfÇVR’Â÷&&—BõVæFò÷&WG'“°§&W7VÇB6†÷VÆB&WF–âVçFW&VBF—7Fæ6RâfÆ–BF‡&÷Vv‚÷fW'6†ö÷BF—7Æ—27GVÂW†—Bà¥G'’&VgW6VB7WC¢W‡Æ–6—B&VgW6ÂÂ&Wf–÷W27V66W76gVÂfÇVR&WF–æVC²VæFò×W7@§VæFòF†RÆ7B7V66W76gVÂ÷W&F–öâÂæ÷Bâ–çfVçFVBf–ÆVB7F–öââ‡—6–6Â6æ §7F–ÆÂv÷&·2â'&–FvR&Wf–Ws“s‚&VÖ–ç266WFVBâ&–v‡B×6–FRfVÇB7F–ÆÂõTã²ÖçVÀ¤†–FS4N(i%6†÷s4B&V6÷fW'’6öæf—&ÖVBâæW‡BWf–FVæ6RÖÆVB6çf2õT’v÷&²÷"7GVÃ“s¦fVVF&6³²æòæWrfVGW&Rö–6öâW‡ç6–öâ&Vf÷&R÷WG7FæF–ær&VÆ–&–Æ—G’F—&V7F–öâà ¢22ã“s’V&Æ–6F–öâfW&–f–VB(	B#bö7Fö&W"##` ¥'VçF–ÖSfVCƒ“cvVcVcSS†cƒFcCFCS#ƒsƒc6“6#vf²W†7BFW7FVB÷WÆöFVBG&VSvCƒ&3cvC#cCf&ƒ63ƒ“ƒ–#†#ƒ33&3C366CvC#FÂÆÃ"&Æö"†6†W2fW&–f–VBâ7W'&VçBÖ–â&VÆV6R÷6†VÆÂæBF—&V7BöG&vW"÷&V6—6–öâÆöFW"¶W—3“s’ÖF6‚FW7FVB6÷W&6RâÆÃR66†RÖ'W7FVBÆ—fRf–ÆW2‡fW'6–öâÆ–æFW‚ÆG&vW"×V’Ç&V6—6–öâÖf6RÆ×VÇF’Öf6RÖF—&V7B’'—FRÖÖF6‚gFW"&öÆÆ÷WBâf–æÃSrfö7W6VE52ód”Âó6¶—ƒ‚ãw2“²†÷7FVBVW'’&WGW&æVBæò'Vç2Âæò†÷7FVB÷"Æö6ÂgVÆÃ“s’7V—FR6Æ–ÖVBâDUd”4S“s’&VG“¢–æfW&Væ6RôâW†7BF—7Fæ6R7&÷72f–Ww3²&VgW6VB7WB¶VW2Æ7B7V66W76gVÂfÇVRö†—7F÷'“²F‡&÷Vv‚&VF&6²&W÷'G27GVÂW†—Bâ'&–FvS“s‚W6W"52&÷FV7FVBâ&–v‡B×6–FR&V7W'&–ærf—6–&–Æ—G’&VÖ–ç2õTâv—F‚ÖçVÂ†–FS4N(i%6†÷s4B&V6÷fW'’âF†—2&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’à ¢22ã“ƒ(	BW‡Æ–6—Bf–ÆR&Vg&W6‚F—7Æ’&V6÷fW'“²ã“s’W6W"52(	B#bö7Fö&W"##` ¥W6W"53“s’&÷FV7G2W†7B–æfW&Væ6R—6öÆF–öâÂ7GVÂ6öÖÖ—B&VF&6²Â&VgW6Âð¦Æ7B×fÇVRö†—7F÷'’æBW†—7F–ær‡—6–6Â6æ–ærâ'&–FvS“s‚52&VÖ–ç2&÷FV7FVBà¤VF—BÖ–ã&c&VSs†÷&VÆV6S“s’âæW‡B&VÆ–&–Æ—G’fö7W2—2&V7W'&–ær&–v‡B×6–FRT’à£“sbFWf–6R&ö&R&÷fVB†–FS4B&W7F÷&VB6öçG&öÇ2æB6†÷s4BÆVgBF†VÒf—6–&ÆS²F†—0¦æ'&÷w26çf2õT’–çF–ær–çFW&7F–öâ'WBFöW2æ÷BW7F&Æ—6‚&ö÷B6W6RâæògW'F†W §7V7VÆF—fR552öÆ–W"÷&VæFW&W"6†ævR÷"W&ÖæVçB&W—"6Æ–Ò–ã“ƒà ¤FBf–ÆR(i"&Vg&W6‚F—7Æ’Âf–Æ&ÆRt•D„õUBVæ&Æ–ærFV'Vrâ—BW6W24ÔRW†—7F–æp¦7&VFT6çf5f—6–&–Æ—G•&ö&R–æÆ–æRf—6–&–Æ—G’6fR÷&W7F÷&R÷væW"âW‡Æ–6—BW6W"6Æ–6°¦†–FW2ôäÅ’÷&–v–æÂ6çf2f÷"öæR&W6VçFVBg&ÖR‡Gvò$b6ÆÆ&6·2’ÂF†Vâ&W7F÷&W0¦W†7B÷&–v–æÂf—6–&–Æ—G’fÇVR÷&–÷&—G’ö'6Væ6Rã#S×2F–ÖW"fÆÆ&6²æBvV†–FRð¦†–FFVâÖFö7VÖVçBöFV'VrÖöfb6æ6VÆÆF–öâVç7W&R&W7F÷&F–öâ–bæ–ÖF–öâg&ÖW27FÆÂà¤æò&VÆöBÂ6çf2&RÖ7&VF–öâ÷&W6—¦RôE"öÖöFVÂö†—7F÷'’÷6VÆV7F–öâ×WFF–öâÂæWr&VæFW&W"À¦WFöÖF–2&V7W'&–ær&Æ–æ²Â–FÆRöÆÆ–ærÂæf–vF–öâ÷"ö–çFW"÷væW"âFV'Vröfb7F—0¦öfc²f–ÆR6Æ÷6W2gFW"7V66W76gVÂ7F'BÂ'WGFöâ&W6WG2gFW"&W7F÷&Râ6öæf—&ÖF–öà§6—2F—7Æ’&Vg&W6†VBÂæ÷BF†BF†RfVÇB—2W&ÖæVçFÇ’f—†VBà ¥VæF–ær&Vg&W6‚&V¦V7G2&WVG2æBFöW2æ÷BF¶R÷fW"ÖçVÆÇ’†–FFVâFV'Vr&ö&Rà¤W†—7F–ær&ö&R'W7’wV&Bæ÷rÇ6ò6†V6·2Ö–âôf6RôVFvRõfW'FW‚ô&WfVÂÆ—fRG&w3°¥–çB÷FööÂ6W76–öâöv—¦ÖòwV&G2&WF–æVBâ&VgW6VBVçG'’ÆVfW2v÷&²VçF÷V6†VBæ@¦6·2Fòf–æ—6‚7F—fR÷W&F–öâ÷"6†÷s4BâFV'Vr&ö&Röö'6W'fF–öâ'WGFöç2F—6&ÆV@¦'&–VfÇ’GW&–ær&V6÷fW'’â÷F–öæÂFV'VrÆöw2&V6÷&B7F'BöVæBæB–çfÆ–FFR7FÆP¦66†VB&W÷'G2â÷&–v–æÂGvò×7FWF–væ÷7F–2æBW6W"Öö'6W'fF–öâfÆ÷rVæ6†ævVBà ¤f–æÃ3’fö7W6VE52ód”Âó6¶—ƒã#‡2“¢æWsB&V6÷fW'’FW7G2²W†—7F–ærFV'VröF—7Æ’ð¦6çf3“s2ô'&–FvS“s‚ôW†7C“s’÷&VÆV6R6öçG&7G2âW†7B–æÆ–æR&W7F÷&F–öâ7&÷73`¦–æ—F–Â7FFW2Â†–FFVâg&ÖR&Vf÷&R&W7F÷&RÂ7FÆÆVBÖg&ÖRfÆÆ&6²Â6æ6VÂöÆFRÖg&ÖP¦6ÆVçWÂ'W7’öÖçVÂ×&ö&R&VgW6ÂÂ66†VGVÆW"f–ÇW&R&W7F÷&F–öâÂ7GVÂf–ÆRVçG'§v—F‚FV'VtôdbÂvV†–FRöFV'VrÖöfb6ÆVçWÂVæ6†ævVB&6¶–ærF–ÖVç6–öç2æBÖöFVÂð¦†—7F÷'’–FVçF—G’FW7FVBâ÷&–v–æÃ“s2FW7G2&WF–æVBâ6†&VBFW7B†VÇW"öæÇ’v–ç0¦÷F–öæÂf–ÆR†÷7BâæòæF—fR•B&V6÷fW'’×7VVB÷f—7VÂ66WFæ6R–æfW'&VBà¥'VçF–ÖR6†ævRôäÅ’vW7GW&RÖFV'Vs²F—&V7B6†VÆÂ÷&V6÷fW'’–ç3“ƒæB&Wf–WvVB†6†W2à£“s’ÖöFVÆÆ–ærôW†7BÃ“s‚'&–FvR÷6†&VB&VæFW&W"ÂÖ–âô×VÇF“ãö–6öç2ög&÷¦VâVæ6†ævVBà ¤DUd”4S“ƒ¢f–Æ^(i%&Vg&W6‚F—7Æ“¢6çf2&WGW&ç2WFöÖF–6ÆÇ’ÂÖöFVÂ÷6VÆV7F–öâ7F“°¥VæFõ&VFò7F–ÆÂ7G2öâ7GVÂ&–÷"ÖöFVÆÆ–ær6†ævW2âæòFV'VrVæ&ÆR&WV—&VBà¥v†Vâ&–v‡B6öçG&öÇ2æW‡BF—6V"ÂW6RF†—2öæR7F–öã²&W÷'B–bF†W’&WGW&âæ@§7F’f—6–&ÆRâW†—7F–ærÖçVÂ†–FS4N(i%6†÷s4B&VÖ–ç2f–Æ&ÆR–b'&–Vb&Vg&W6‚FöW0¦æ÷B&W&öGV6R—G2&V6÷fW'’âF†—2—26öçfVæ–VçBWf–FVæ6RÖ&6VB$T4õdU%’Âæ÷B6Æ–Ð§F†B–çFW&Ö—GFVçB–çF–ærfVÇB—2f—†VBâæW‡BföÆÆ÷ræF—fRfVVF&6²æB–çfW7F–vFP¦6çf2õT’&÷VæF'’g&öÒWf–FVæ6S²&WF–âÆÂ&÷FV7FVC“s’ó“s‚–çFW&7F–öç2à ¢22ã“ƒV&Æ–6F–öâfW&–f–VB(	B#bö7Fö&W"##` ¥'VçF–ÖSVCs&6S&&f††C“&CS#V66#†F#VF3†#“#²W†7BFW7FVB÷WÆöFVBG&VSF3s“Cc#sC&FF66VSCƒscf36&V6#6fs“ÂÆÃ&Æö"†6†W2fW&–f–VBâ7W'&VçBÖ–â&VÆV6R÷6†VÆÂövW7GW&RÖFV'Vs“ƒ–â÷6÷W&6RÖF6‚FW7FVBf–ÆW2âÆÃ266†RÖ'W7FVBÆ—fRf–ÆW2fW'6–öâæ§6öâÆ–æFW‚æ‡FÖÂÆvW7GW&RÖFV'Vræ§2'—FRÖÖF6‚âf–æÃ3’fö7W6VE52ód”Âó6¶—ƒã#‡2“²æògVÆÂ×7V—FRö†÷7FVB&W7VÇB6Æ–ÖVBâDUd”4S“ƒ&VG“¢f–ÆR&Vg&W6‚F—7Æ’v—F†÷WBFV'VrÂ6çf2WFöÖF–2&WGW&â÷v÷&²õVæFõ&VFò&WF–æVBÂ7GVÂ&–v‡BÖ6öçG&öÂ&V7W'&Væ6R&V6÷fW'’âVæFW&Ç––ær–çFW&Ö—GFVçBfVÇB&VÖ–ç2õTã²æòW&ÖæVçBf—‚6Æ–Òâ'&–FvS“s‚æBW†7C“s’W6W"52&÷FV7FVBâF†—2&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’à ¢22ã“ƒ(	BUb÷WF÷Æ–W"æB6ö×ÆWFR7W&f6RFV&F÷vã²ã“ƒ&V6÷fW'’52öæÇ’(	B#bö7Fö&W"##` ¥W6W#“ƒ5266WG2W‡Æ–6—B&V6÷fW'’Â'WB&V¦V7G2æVVF–ærÖçVÂ&Vg&W6‚2§6öÇWF–öâæB7WÆ–W2&W&öGV6–&ÆRUbv–æF÷r&W÷'Cs£S£•¢â¶VW&–v‡B×6–FRf—7VÀ¦f–ÇW&RõTã²FöâwBÖ—7&V6÷&C“ƒ2T’&W—"52ã“s’W†7BæC“s‚'&–FvR&÷FV7FVBà¤VF—B7W'&VçFÖ–æcƒVƒ¢WfVçF6†–â—2ö&¦V7BUgFööÇ3ƒƒƒ(i&ÖW6„†VÇF„6Æ÷6S“#ƒS(i ¦f–æÇ6W76–öæçVÆÂÂæòUbVF—F÷"÷–çBöF—7Æ—&Vg&W6‚æVVFVBâ6öçG&öÇ2övVöÖWG'’ö†—G0¦†VÇF‡“²†–FFVâ6†&VF†÷7B&VÖ–ç2f–Ww÷'BÖ6öçF–æVBv—F‚£3Bö÷fW&fÆ÷vWFòð¦6öçF–æÆ–÷WG–çBö—6öÆF–öæ—6öÆFRâ6÷W&6RVæBÆ6¶VBf–Ww÷'B×7G–ÆR÷Æ6VÖVç@¦6ÆVçWâW†7BWf–FVæ6R7VÖÖ'’–âFö72÷V’×Wb×G&–vvW"Ó“ƒæÖC²æò&÷fVâVæv–æR6W6Rà ¥&W—"÷&–v–æÂFööÂ×6W76–öâ×V’÷væW"ÂäõBâWFöÖF–2v÷&¶&÷VæBâUbFööÇ2W6W0¦ÖçVÂæF—fR÷÷fW"F÷Æ–W"–b7W÷'FVC²÷&–v–æÂ†÷7Bö6öçG&öÂæöFW2&VÖ–â–à¤DôÒ6òW†—7F–ær66÷VBv–FR552öÆ—7FVæW'2ö7F–öç27W'f—fRâf—†VB÷6—F–öæ–ærföÆÆ÷w0§f–Ww÷'BF÷³'ƒ²G–æÖ–2f–Ww÷'B†V–v‡B&÷VæG2Âv–æF÷r÷f—7VÂ&W6—¦RÆ—7FVæW'0¦7F—fRöæÇ’v†–ÆR6†÷vââ÷&–v–æÂã“S‚G&ç6f÷&Ög&VR÷6—F–öâ&WF–æVBÂ'WBf–ÆV@§–çBÖ6öçF–æÖVçBÆ–W"&VÖ÷fVBâG&ç7&VçBæöæ–çFW&7F—fR&6¶G&÷Â–æ†W&—FVBFW‡@¦6öÆ÷W#²æòÖöFÂö–æW'Böfö7W2×G&÷"æWr&r×ö–çFW"÷væW"â÷F†W"FööÇ2Væ6†ævVBà ¤öâ6Æ÷6Rö6öçFW‡B7v—F6‚Â†–FR÷&VÆV6RæF—fR7W&f6R&Vf÷&R&WGW&æ–ær÷&–v–æÀ¦6öçG&öÇ3²6ÆV"÷÷fW"öFö6²÷v–FRfÆw2æBÄÂ–æÆ–æRf–Ww÷'B7G–ÆW3²&²V×G¦†–FFVâ†÷7B&6²–âG&vW"âUbVF—F÷"†æFöfbW‡Æ–6—FÇ’7W7VæG26÷W&6R7W&f6P¦&Vf÷&Rf—'7Bv÷&·76R–çBv†–ÆR&W6W'f–ær÷&–v–æÂÆöv–6Ç6W76–öâVçF–Â&6²ð¤6Æ÷6RâF‡W2æòV×G’F÷ÖÆ–W"÷W&÷fS$BVF—F÷"âW†—7F–ærv÷&·76S“S"æBÆÀ¥UböFÆ2ö†—7F÷'’öÖF‚÷væW'2VçF÷V6†VBâæF—fRVç7W÷'FVB÷F‡&÷v–ær’fÆÇ2&6°§6fVÇ’Fò÷&–v–æÂVçG&ç6f÷&ÖVB'6öÇWFRæVÂÂv—F†÷WB6öçF–æÖVçC²6ÖR6ÆVçWà¤æò6çf7f—6–&–Æ—G’÷&Vg&W6‚÷&W6—¦R÷&VæFW&W"&W6WBÂF–ÖW"ÂW"Ög&ÖRöÆÆ–ær÷"ÖW6€¦6†ævR–çG&öGV6VBâW†—7F–ærÖçVÂ&V6÷fW'’&VÖ–ç2f–Æ&ÆR'WB—2æ÷B–çfö¶VBà ¤W†—7F–ærFV'Vr6æ6†÷Bæ÷r–æ6ÇVFW26÷W&6R×&VçB÷÷÷fW"÷F÷Æ–W"7FFRÇW0¦ÖW6„†VÇF…6W76–öâæB&÷†Æ%Uev÷&·76RÂ6òæF—fR&VæFW&–ærÖöFRö6ÆVâ6Æ÷6R6â&P§fW&–f–VB–b&V7W'&Væ6RW'6—7G2âF†—2—2Wf–FVæ6RÂæ÷B&WÆ6VÖVçB6öçG&öÇ2à£3cBF&vWFVE52ód”Âó6¶—ƒBãW2“£VæWr6öçG&öÆÆW"öæF—fRÔ’ÖF÷V&ÆRFW7G26÷fW#P¦÷Vâö6Æ÷6R7–6ÆW2ÂW†7B÷&–v–æÂæöFW2ö6öçFW‡BÂF÷ÖÆ–W"&VÆV6R÷7G–ÆW2÷&¶–ærÀ¥UbVF—F÷"†æFöfbÂ&W6—¦RöF—7÷6ÂÂ÷F†W"×FööÂ7v—F6‚æBVç7W÷'FVB÷F‡&÷rfÆÆ&6²à¤÷&–v–æÅUb÷v÷&·76R÷6W76–öâö†VÇF‚öFV'Vrô'&–FvRôW†7B÷&VÆV6R6†V6·2&WF–æVBã“S€§FW7Bæ÷r&V¦V7G2öÆB6öçF–æÖVçB&F†W"F†â&W6W'f–ærÖ—F–vF–öâF†Bf–ÆV@¦öæFWf–6RâæòÆö6ÂæF—fRvV$¶—Bf—7VÂ&W&öGV7F–öâöwV&çFVVBW&ÖæVçB&W— ¦6Æ–ÖVBâFWf–6R×W7B6öæf—&ÒF†—27G'V7GW&Â6÷W&6Rf—‚&WfVçG2F†RG&–vvW"à ¤6†ævVB'VçF–ÖRöæÇ’÷&–v–æÂ6†&VG6W76–öâöÖW6††VÇF‚†æFöfböFV'VrWf–FVæ6S²F—&V7@§6†VÆÂ÷&V6÷fW'’¶W—3“ƒæB&Wf–WvVB†6†W2âæF—fR’7W÷'FVB6–æ6R6f&“s°§&–Ö'’6÷W&6W2–â–æ6–FVçFFö2âæò6†&VBÆ–÷WB÷÷6—F–öæW"VF—G2ÂGWÆ–6FR÷WÀ¥Ub¶W&æVÂÆÖ–âÃ“ƒ&V6÷fW'’–×ÆVÖVçFF–öâÃ“s”W†7BÃ“s„'&–FvRÄ×VÇF“ã÷"g&÷¦Vâ6†ævW2à ¤DUd”4S“ƒ¢v—F†÷WB&Vg&W6‚ö×7v—F6‚÷&÷FF–öâÂ&WVFVFÇ’ö&¦V7N(i%Un(i$6Æ÷6RÂ–ç7V7@§&–v‡BFööÆ&"÷7FGW2V6‚7–6ÆS²F†VâWFòFÆ2ô÷VâUbVF—F÷"ô&6²æB÷&&—BFð§&–v‡BVFvRâ6öçG&öÇ2×W7B7F’G&vâæBW6&ÆRâT’FV'Vr–b&V7W'&Væ6S¢†÷7B&Vç@§6†÷VÆB&RG&vW"gFW&6Æ÷6RÂ÷÷fW&çVÆÂ÷F÷Æ–W&fÇ6RÂ6öçF–ææöæS²6VæBæWr&W÷'Bà¤Fòæ÷B6Æ÷6Rf—7VÂ—77VRg&öÒWFöÖFVB52âæW‡B7GVÃ“ƒFWf–6R&W7VÇB&Vf÷&P§Vç&VÆFVFfVGW&R&öÆÆ÷WB÷"7V7VÆF—fRgW'F†W"552öVæv–æRf—†W2à ¢22ã“ƒV&Æ–6F–öâfW&–f–VB(	B#bö7Fö&W"##` ¥'VçF–ÖVF&S33cƒCƒfcFƒ#cSc“sSFC&#ƒ6S3–#“²W†7BFW7FVB÷WÆöFVBG&VVSCVccCS33cFSv#CF#†V#&CC#336FS†F#“VCVcrÂÆÃ2&Æö"†6†W2fW&–f–VBâ7W'&VçBÖ–â&VÆV6R÷6†VÆÂæB6W76–öâö†VÇF‚öFV'Vs“ƒ¶W—2÷6÷W&6RÖF6‚FW7FVBf–ÆW2âÆÃR66†RÖ'W7FVBV&Æ–2f–ÆW2fW'6–öâÆ–æFW‚ÇFööÂ×6W76–öâ×V’ÆÖW6‚Ö†VÇF‚ÆvW7GW&RÖFV'Vr'—FRÖÖF6‚gFW"&öÆÆ÷WBâf–æÃ3cBfö7W6VE52ód”Âó6¶—ƒBãW2“²æògVÆÂö†÷7FVBöæF—fRvV$¶—B&W7VÇB6Æ–ÖVBâ7G'V7GW&ÂUb÷W&W—"—2$TE’f÷"DUd”4S“ƒ&WVFVBUb÷Vâô6Æ÷6RæBVF—F÷"ô&6²t•D„õUB&Vg&W6‚Â×7v—F6‚÷"&÷FF–öââ†–FFVâ†÷7Bæ÷r&·2–ç6–FRG&vW"Ö6öçFVçB‡&VçD–B6â&RçVÆÂ&V6W6RF†BF—b†2æò”B“²÷W—2&VÆV6VB÷Vç7G–ÆVBâVæFW&Ç––ærf—6–&–Æ—G’vFR7F—2õTâVçF–ÂæF—fR6öæf—&ÖF–öâÂæ÷B6Æ÷6VB'’æöFRFW7G2âæòWFöÖF–2&V6÷fW'’–çfö¶VBâã“ƒ52Æ–W2öæÇ’Fò&V6÷fW'’fVGW&S³“s”W†7Bó“s„'&–FvR66WFæ6R&÷FV7FVBâF†—2&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’à ¢22ã“ƒ"(	B&÷fVB–çB&F–Â–6öç3²ã“ƒW6W"52(	B#bö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’56W2ã“ƒæB&WVW7G2öæW‡F'V–ÆBâ&÷FV7BF†R66WFVBUb÷W ¦æF—fR×F÷ÖÆ–W"Æ–fV7–6ÆRÂ6ö×ÆWFR6Æ÷6RFV&F÷vâæBVF—F÷"†æFöfc²F†—27WW'6VFW0¦öÆFW"VæF–ærDUd”4S“ƒæ÷FW2âæò&Vg&W6‚F—7Æ’—2&WV—&VBf÷"F†B66WFVBfÆ÷rà¤V&Æ–W"ã“cr66WFæ6R7V'6WVVçFÇ’&Vw&W76VBÂ6ò&WF–âF–væ÷7F–72æB–çfW7F–vFP¦ç’&V7W'&Væ6Rg&öÒg&W6‚Wf–FVæ6R&F†W"F†âFV6Æ&–ærWfW'’&VæFW&–ærF‚&÷fVâà¤'&–FvS“s‚ÂW†7C“s’Â'&““sæB66WFVBÖöFVÆÆ–ær–6öç2&VÖ–â&÷FV7FVBà ¤VF—BÖ–ã#FcS6632÷'VçF–ÖRF&S33c‚ÂÖF6†–ærÆ—fS“ƒ6†VÆÂöÖæ–fW7BÂ&V6VçB6öÖÖ—G2À§&F–Âv—&–ær–çfVçF÷'’æB6VÆV7FVCcR×FööÂ&ööc2'Gv÷&²âÆÂ6öæf—&ÖVBVF—@§&W—'2&R66WFVC²‡—6–6ÂF‡&÷Vv‚&VgW6Â7F–ÆÂÆ6·2—G2ffV7FVB6÷W&6RövW7GW&Rà¥&W7VÖRVWVVBf–æÂ–çB–6öâ7FvRÂæ÷B7V7VÆF—fRgW'F†W"&VæFW&–ær6†ævRà¤ÆÃW†—7F–ær–çB7F–öç2÷vW2Ç&VG’†fR÷&–v–æÂ'WGFöç2ÂÆ&VÇ2ÂÆ6VÖVçBÀ§7FFRæBF—7F6‚–âf–Ww÷'B×–çBæ§2âæWr66÷VB–çB×&F–ÂÖ–6öç2æ7727WÆ–W0¤U„5B&÷fVB&ööc2''W6‚ôf–ÆÂôW&6W"õ6×VFvRô&ÇW"ôÆ–W'2ôÖ6²ô–ÖvRôòôÖ6—¦R5dw0¦2æöæ–çFW&7F—fS3'‚6WVFòÖVÆVÖVçG2&÷fR÷&–v–æÂ6ÖÆÂ6F–öç2â†–FRF†V—"öÆ@£#'‚–æÆ–æR'Gv÷&²f—7VÆÇ“²÷&–v–æÂDôÒ÷FW‡Bö7F–öç2&VÖ–ââ6ÖSsg‚'WGFöâv–GF‚À£3'‚&F—W2ó3S‚7W&f6RöævÆW2ÂW‡Æ–6—Cc‚†V–v‡C²6VçG&R–çB6öçG&öÂVçF÷V6†VBà¥FVâfÆ–B5dw2'—FRÖÖF6‚6VÆV7FVB'Gv÷&³²ÆÂF&vWB&÷†W2f—BW†—7F–ær&÷VæG2v—F€¥¤U$ò—'v—6R÷fW&Æ2âW†—7F–ær7F—fRöF—6&ÆVBfVVF&6²&WF–æVBà ¥'VçF–ÖR¦f67&—BÂ–çBvW7GW&W2÷&W6÷W&6Rö†—7F÷'’ÂÆVgB6WGF–æw2ôÆ–W'2ÂÆÂÖöFVÆÆ–æp¦–6öç2æC“ƒ7W&f6R&W—"&R'—FR×Væ6†ævVBâöæÇ’æWr7G–ÆW6†VWBÂ6†VÆÂ÷&V6÷fW'¦¶W—3“ƒ"ÂÖæ–fW7BæB&Wf–WvVB76WB6öçG&7B6†ævRâæòWFöÖF–2&Vg&W6‚ÂæWr÷WÀ¦–çWB÷væW"Â''W6‚ö¶W&æVÂ÷"g&÷¦Vâô×VÇF“ã6†ævRâæF—fR&VF&–Æ—G’—2DUd”4S“ƒ"à¥fÆ–FF–öã£32fö7W6VB52ód”Âó6¶—VBƒBã—2’Â6÷fW&–ærW†—7F–ær–çBFööÇ2ð§v÷&¶fÆ÷rö6öçF–çV–ær6×VFvRÂUc“ƒÆ–fV7–6ÆRÂ'&–FvRôW†7BæB&VÆV6R6öçG&7G2à¥FVâ5dr„ÔÂöW†7BÖ'Gv÷&²æB÷&–v–æÂ&F–Â&÷VæG2ö÷fW&Æ6†V6·272âæòÆö6À§&VæFW&VB'&÷w6W"öæF—fR•BV&æ6R&W7VÇB6Æ–ÖVBâV&Æ–6F–öâ&ööbföÆÆ÷w2à ¤DUd”4S“ƒ#¢Ub”åBÓâ–ç7V7C–6öç2ö6F–öç3²6†ö÷6R''W6‚ô&ÇW"õ6×VFvRæB6öæf—&Ð¦ÆVgB6WGF–æw2â'&÷w6RÆ–W'2ôÖ6²ô–ÖvRôòôÖ6—¦S²&F–Â7F—2VçF–ÂVæ6–ÂF÷V6†W0¦ÖW6‚æB&6¶w&÷VæB†öÆB&V÷Vç2—Bâ–çBÂVæFõ&VFòÂFöæS²Ub÷Vâô6Æ÷6R7F–ÆÂÆVfW0§&–v‡B6öçG&öÇ2f—6–&ÆRv—F†÷WB&Vg&W6‚âæW‡Bv—B–çB–6öâ66WFæ6RÂF†VâVF—@§VWVVBUbÖg&VRf6Vw&÷W–çF–ærF‡&÷Vv‚W†—7F–ærf6Tw&÷W2÷6VÆV7F–öâö†—7F÷'’÷væW'3°¦Fòæ÷B–çfVçB6V6öæB–çFW"÷"77VÖRf6Vw&÷W2&R'6VçBà ¢22ã“ƒ"V&Æ–6F–öâfW&–f–VB(	B#bö7Fö&W"##` ¥'VçF–ÖR&3“–fc–C†#ƒsc&F6S3s–#36V3ƒfFS#“sc²W†7BFW7FVB÷WÆöFVBG&VRF#f#ssS#VSƒCCccSƒVCfccVfSvCSV“ƒRÂÆÃ‚&Æö"†6†W2fW&–f–VBâÖ–â&VÆV6R÷6†VÆÂöæWr–çB7G–ÆW6†VWBÖF6‚FW7FVB6÷W&6RâÆÃ2g&W6‚V&Æ–2f–ÆW2fW'6–öâæ§6öâÆ–æFW‚æ‡FÖÂÇ–çB×&F–ÂÖ–6öç2æ772'—FRÖÖF6‚gFW"&öÆÆ÷WBâf–æÃ32fö7W6VB52ód”Âó6¶—VBƒBã—2’ÃW†7BfÆ–B&÷fVB5dw2æB¦W&òF&vWBÖ&÷‚÷fW&Æ3²æò†÷7FVBgVÆÂ×7V—FR÷"&VæFW&VBÖ'&÷w6W"&W7VÇB6Æ–ÖVB‡v÷&¶fÆ÷rVW'’&WGW&æVBæò'Vç2’âUc“ƒW6W"52—2&÷FV7FVBÂæ÷BVæF–æs²–çC“ƒ"–6öâ&VF&–Æ—G’&VÖ–ç2DUd”4S“ƒ"âæò'VçF–ÖR¥2Â66WFVBÖöFVÆÆ–ær–6öâÂ×VÇF“ã÷"g&÷¦Vâ6†ævW2âF†—2V&Æ–6F–öâ&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’à ¢22ã“ƒ2(	B7F&ÆR7F'GWFööÆ&#²ã“ƒ"–çB52Â&Vg&W6‚f—6–&–Æ—G’&V7W'&Væ6R(	B#bö7Fö&W"##` ¥W6W#¢(	Å52Ò&Vg&W6‚ÖFRF†R&–v‡B6öçG&öÇ2F—6V"%UB6WfW&Â&Vg&W6†W2f—†V@§F†R–çFW&Ö—GFVçB'VrâöæW‡F'V–ÆN(	Òâ&÷FV7C“ƒ"–çB–6öç2÷v÷&¶fÆ÷râ$TõTâ&–v‡B×6–FP§f—7VÂvFRgFW"&Vg&W6ƒ³“ƒ66WFVBUbÆ–fV7–6ÆR—2æ÷B&Ææ¶WB&VæFW&–ær&W—"à¤æòæWrFV'Vr&W÷'Bö'&÷w6W"G&6R66ö×æ–W2&V7W'&Væ6S²W†7BVæv–æR6W6R&VÖ–ç0§Vç&÷fVââFòæ÷B6²&WVFVB&Vg&W6†W226öÇWF–öâ÷"&W7VÖRf6Vw&÷WfVGW&Rv÷&²à ¤VF—B7W'&VçBÖ–ã“C63cf÷'VçF–ÖR&3“–fc’ÂÆ—fS“ƒ"Ö&¶W'2Â7W'&VçB67&—B–ç2À¦÷&–v–æÂFööÆ&"Âf–Wrôg&ÖR÷væW'2æC“cr6ö×÷6—F–öâó“ƒÆ–fV7–6ÆRâ6†VÆÂ–æ—F–ÆÇ¦†2öæÇ’VæFòõ&VFó²F—&V7BÖ&WfVÂÆFW"&WVæG2g&ÖRÂf–WrÖÖöFW2VæG2fö7W2ôö&¦V7G2ð¥d”UrÂFööÆ&"ö'6W'fW"&WÆ6W2F†V—"'Gv÷&²æB&V÷&FW'2F†VÒâ&–÷#“cbFV'Vr&V6÷&G0§&–v‡B×FööÆ&"v–GFƒ3BãSg‚CCS–×2Óã3rãc‚CcC–×2gFW"6çf27&VF–öââF†—2—0¦6öæf—&ÖVB7FvVB7F'GWDôÒöÆ–÷WBÂäõB&ööbF†B—B6W6W2æF—fR—†VÂÆ÷72à ¥6VVBf–æÂf—fR÷&–v–æÂ5dr'WGFöç2ÇW2÷&–v–æÂd”UrÖ&·W–â–æ—F–Â…DÔÂÀ¦Ç&VG’–âf–æÂ÷&FW"âæWrf–Ww÷'B×FööÆ&"×6†VÆÂæ772Ö¶W2W7F&Æ—6†VB†VFW"ö–6öâð¥d”Ur×7VÖÖ'’F–ÖVç6–öç2f–Æ&ÆR&Vf÷&RÖöGVÆRõvV$tÂ7F'GWâöÆB6VÆV7F–öâÖöFW0¦–ç6–FR†VFW"7F’÷WBöb–æ—F–Â†VFW"fÆ÷rVçF–Â6ÖRF÷&"÷væW"Ö÷fW2F†VÒFð¦W†—7F–ær&÷GFöÒFö6²âW†—7F–ærÖ–âVæFõ&VFò&–æF–æw2&WF–æVBâ÷&–v–æÂF—&V7BÖ&WfVÀ¤g&ÖRÆÂ&WW6W2ö&–æG26†VÆÂ'WGFöâöæ6R†öÆB&W6Væ6RV&Ç’×&WGW&âv÷VÆBF—66öææV7@¦—B“²W†7B÷&–v–æÂ6ÖW&f—GF–ær&VÖ–ç2â÷&–v–æÂf–WrÖÖöFW2F÷G26†VÆÂfö7W2ð¤ö&¦V7G2õd”UræöFW2Â–ç7FÆÇ26ÖR†æFÆW'2ô552Â&W6W'fW25dr÷æVÂ–FVçF—G’æB÷&FW#°¦7&VF–öâfÆÆ&6²&WF–æVBf÷"VÖ&VFFVB6†VÆÇ2âW†—7F–ærÆFRFööÆ&"ö'6W'fW"6VW0¦Ç&VG’FV6÷&FVBö÷&FW&VBæöFW2Â6òæò7F'GW'WGFöâ&WÆ6VÖVçB÷&V÷&FW"—2æVVFVBà¤æòGWÆ–6FR7F–öâÂæWrö–çFW"ö†—7F÷'’÷væW"ÂvV$tÂFVÆ’÷&W6WBÂ6çf2†–FR÷&Vg&W6‚À§öÆÆ–ærÂf–ÇFW"öÆ–W"†–çB÷"æWrF÷ÖÆ–W"6‡&öÖRâUc“ƒ–×ÆVÖVçFF–öâVçF÷V6†VBà ¥F†—2&VÖ÷fW2fW&–f–VB7F'GW–ç7F&–Æ—G“²æF—fR•Bf—7VÂvFR7F—2õTâà¤Fòæ÷B6ÆÃ“ƒ2&÷fVâW&ÖæVçB6ö×÷6—F÷"&W—"â&–v‡B7FGW2F‚Væ6†ævVBà¤6†ævVB'VçF–ÖRgVæ7F–öæÆ—G’öæÇ’Gvò÷&–v–æÂ7F–öâ÷væW'2ÇW26†VÆÂöV&Ç’553°§f–WrÖÖöFW2öF—&V7BÖ&WfVÂ÷&V6÷fW'’–ç3“ƒ2æB&Wf–WvVB†6†W2â–çB–6öç3“ƒ"À¤×VÇF“ãöÖ–â÷&VæFW&–æröÖöFVÆÆ–ærög&÷¦Vâ–×ÆVÖVçFF–öç2Væ6†ævVBâW†—7F–ærfö7W0¦Æ—FW&Ãs32–âFW7BföÆÆ÷w2&Wf–WvVB6öçG&7BÂ&V†f–÷"76W'F–öç2&WF–æVBâ&WfVÀ¤DôÒf—‡GW&Ræ÷r7WÆ–W2—G2÷&F–æ'’&VÂ×6†VBg&ÖR'WGFöâ–ç7FVBöb&&W·Ó°¦ÆÂW†—7F–ærvVöÖWG'’ö†—7F÷'’ö6öçFW‡B76W'F–öç2&WF–æVBâæWrFW7G2W†V7WFR7GVÀ¥d”Urôg&ÖR÷væW'2Fò&÷fR÷&–v–æÂÖæöFRF÷F–öâÂöæR6Æ–6²&–æF–ærÂfÆÆ&6²æ@¦6ÖW&f—C²6†VÆÂ†26–ævÆR÷&FW&VB”G2ö'Gv÷&²&Vf÷&RÖöGVÆRW†V7WF–öâà¤f–æÃ3’fö7W6VB52ód”Âó6¶—VBƒBãG2’Â–æ6ÇVF–ær&WfVÂvVöÖWG'’ö6öçFW‡Bð¦†—7F÷'’Âf–Wrôfö7W2ö'&÷w6W"÷FööÆ&"ÂÖVçR&÷VæG2ÂUc“ƒæB&VÆV6R6öçG&7G2à¥7–çF‚æBF–fb6†V6·272âæò†÷7FVBögVÆÂ×7V—FRöæF—fRf—7VÂ&W7VÇB6Æ–ÖVBà ¤DUd”4S“ƒ3¢&VÆöB6WfW&ÂF–ÖW2æB–ç7V7B&–v‡BFööÆ&"÷7FGW2”ÔÔTD”DTÅ’&Vf÷&P¥Ubö×7v—F6‚÷&÷FF–öã²&W÷'Bç’–çf—6–&ÆR6öçG&öÇ2âg&ÖRÆÂÂVæFõ&VFòÂfö7W2À¤ö&¦V7G2æBd”UrV6‚W&f÷&Ò÷&–v–æÂ7F–öâöæ6RâUbFööÇ2Óâ6Æ÷6RæBVF—F÷"Óà¤&6²¶VW“ƒ&V†f–÷#²–çB–6öç2&VÖ–â66WFVBâ–bf—7VÂÆ÷72&V7W'2Â6÷’g&W6€¥T’FV'Vr&W÷'B&Vf÷&R&V6÷fW'’æB6’v†WF†W"—Bö67W'&VB–ÖÖVF–FVÇ’öâ&VÆöBà¤æW‡B7GVÂ7F'GWfVVF&6²öWf–FVæ6R&Vf÷&RgW'F†W"&VæFW&–ær6†ævW2÷"æWrfVGW&W2à ¢22ã“ƒ2V&Æ–6F–öâfW&–f–VB(	B#bö7Fö&W"##` ¥'VçF–ÖRSV3VScc6c6#66fF3cVC3–Cƒ#FƒCcSS“²W†7BFW7FVB÷WÆöFVBG&VR#S“–#FsfVcSv#FVfC#vFV3CVSƒSsC3#BÂÆÃ2&Æö"†6†W2fW&–f–VBâÖ–â6†VÆÂ÷&VÆV6RöæWrV&Ç’FööÆ&"552æBGvò÷&–v–æÂ7F–öâÖ÷væW"–ç2÷6÷W&6RÖF6‚FW7FVBf–ÆW2âÆÃRg&W6‚Æ—fRf–ÆW2fW'6–öâæ§6öâÆ–æFW‚æ‡FÖÂÇf–Ww÷'B×FööÆ&"×6†VÆÂæ772Ç7&2öF—&V7BÖ&WfVÂæ§2Ç7&2÷f–WrÖÖöFW2æ§2'—FRÖÖF6‚gFW"&öÆÆ÷WBâf–æÃ3’fö7W6VB52ód”Âó6¶—VBƒBãG2“²æò†÷7FVBgVÆÂ×7V—FR÷&VæFW&VBöæF—fR&W7VÇB6Æ–ÖVB‡v÷&¶fÆ÷rVW'’&WGW&æVBæò'Vç2’â–çC“ƒ"W6W"52&÷FV7FVBâ&Vg&W6‚×G&–vvW&VB–çf—6–&ÆR&–v‡B6öçG&öÇ2&VÖ–âõTâFW7—FRV&Æ–W#“ƒ66WFæ6S³“ƒ2&VÖ÷fW2fW&–f–VBÆFR7F'GWFööÆ&"6öç7G'V7F–öâ'WB—2æ÷B&÷fVâW&ÖæVçBæF—fR&VæFW&–ær&W—"âDUd”4S“ƒ2'&÷w6W"&VÆöB&Vf÷&RUbö×7v—F6‚÷&÷FF–öâÂ÷&–v–æÂFööÆ&"7F–öç2öæ6RÂF†Vâ66WFVBUbõ–çB6Öö¶RâF†—2&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’à ¢22ã“ƒ2FWf–6RfVVF&6²(	Bf—'7B×&Vg&W6‚f—6–&–Æ—G’d”Â(	B#bö7Fö&W"##` ¥W6W#¢(	Å52òf—'7B&Vg&W6‚7F–ÆÂ6W6W2Æ÷72öb&–v‡B†æB6–F^(	Òâ&V6÷&BgVæ7F–öæÀ¥526W&FVÇ“²ã“ƒ27F'GW&VæFW&–ær&W—"d”ÄTB—G2æF—fRf—7VÂvFRâ7FF–0¦–æ—F–ÂFööÆ&"F–Bæ÷BVÆ–Ö–æFRF†Rf—'7B×&Vg&W6‚&ö&ÆVÒâFòæ÷B¶VW&W6VçF–æp§7F'GW6öç7G'V7F–öâ2F†R6W6R÷"ã“ƒ22W&ÖæVçBf—‚âæòæWr6÷W&6RöFV'Vp§&W÷'B7WÆ–VB–WBâ&W6W'fR66WFVC“ƒ"–çB–6öç2Â÷&–v–æÂFööÆ&"7F–öç2æ@£“ƒUbFV&F÷vã²÷fW&ÆÂ–çFW&Ö—GFVçBf—7VÂf–ÇW&R&VÖ–ç2õTâà ¤æW‡BWf–FVæ6S¢Væ&ÆRf–ÆRÓâT’FV'Vr&Vf÷&R&W&öGV6–ær'&÷w6W"&VÆöC²öâF†P¤d•%5Bf–ÆVBÆöBÂ6GW&R&W÷'BÓâ6÷’&W÷'B$Tdõ$Ræ÷F†W"&Vg&W6‚Â×7v—F6‚À§&÷FF–öâ÷"†–FS4Bõ&Vg&W6‚F—7Æ’âF†—26GW&W3“ƒ27F'GWv–GF‚ôDôÒ÷F÷ÖÆ–W"7FFP¦f÷"6ö×&—6öâv—Fƒ“cbó“ƒâ—B6ææ÷BF—&V7FÇ’F–væ÷6R'&÷w6W"6ö×÷6—F÷"—†VÇ3°¦–bDôÒ—2v–â†VÇF‡’ÂFöâwB6Æ–ÒF†R&W÷'B&÷fW2âVæv–æR6W6R÷"&WV@§7V7VÆF—fR552öÆ–W"GvV·2âæVVBæF—fR&VæFW&–ærWf–FVæ6Rf÷"gW'F†W"6÷W&6Rv÷&²à¤æòæWr'VçF–ÖRö'V–ÆB–âF†—2fVVF&6²ÖöæÇ’WFFS²æòæWr†æG2ÖöâfVGW&RFW7Bà ¢22ã“ƒ2Wf–FVæ6R(	BT’f—6–&ÆRÂ&–v‡Bw&÷VæB6†F–ærÖ—76–ær(	B#rö7Fö&W"##` ¤æWrW6W#“ƒ2&W÷'BC##bÓÓ#eC#£3c£‚ãƒsU¢W‡Æ–6—FÇ’6—2T’•2d•4”$ÄR'WBw&÷Væ@§ÆæR6†F–ær—2Ö—76–æröâF†R&–v‡BâG&VBF†—26GW&R2w&÷VæB÷&VæFW"7–×FöÒÀ¦æ÷Bæ÷F†W"f—7VÆÇ’'6VçBFööÆ&"âV&Æ–W"f—'7B×&Vg&W6‚T’f–ÇW&W2&VÖ–â6W&FP¤õTâWf–FVæ6S²F†—26GW&RÆöæRæV—F†W"&WG&7G2F†VÒæ÷"&÷fW2W&ÖæVçBT’&W—"à ¥FööÆ&"v–GFƒ3rãc“3sRBFV'Vr×7F'GW#“f×2æBvW6†÷s#ƒF×2—27F&ÆRâ6çf0¤5533cgƒƒ#bö&6¶–æs#s3'ƒcS"ôE#"Â6W76–öæçVÆÂõ–çFfÇ6RÂUbv÷&·76R'6VçBâ†–FFVà§6W76–öâ†÷7B—2Vç7G–ÆVB÷÷÷fW&çVÆÂ÷F÷Æ–W&fÇ6S²æò&WF–æVBUb÷fW&Æ’–â6GW&Rà¤æò&W÷'FVBW'&÷"ö6öçFW‡BÖÆ÷72WfVçB–â7WÆ–VB&÷VæFVBÆörâDôÒö†—B&ö&W26ææ÷@§6†÷rvV$tÂfÆö÷"÷6†F÷r—†VÇ2÷"–FVçF–g’F†R'&÷w6W"6ö×÷6—F÷"2&ö÷B6W6Rà ¥&VBÖöæÇ’6÷W&6RVF—C¢&VæFW"ÖÖöFW2÷vç2f–æ—FR7GVF–òfÆö÷"†Ö–æ–×VÓ#Bv÷&ÆBVæ—G2¦æBf–æ—FRF—&V7F–öæÂ6†F÷rg'W7GVÓ²7GVF–ò×66VæRÖf—‚WFFW26ÖRfÆö÷"öÆ–v‡C°§7GVF–ò×öÆ—6‚FG26öçF7B6†F÷rÂFÖ÷7†W&RFG2552×VÇF—Ç’f–væWGFRâ×VÇF—ÆP§&VæFW&–ær6öçG&–'WF÷'2ÂæòWf–FVæ6R–WBv†–6‚—2Ö—76–ærâFòæ÷BVæÆ&vRfÆö÷"À§6†F÷r&÷VæG2÷"6†ævR552ö&ÆVæF–ærg&öÒF†—2&W÷'BÆöæRâ&WVW7B67&VVç6†÷Bö`¦7GVÂÖ—76–ær&Vv–öâæBv†WF†W"—G2&÷VæF'’7F—2B6ÖR45$TTâ‚GW&–ær6ÖÆÀ¦÷&&—B÷"Ö÷fW2v—F‚w&÷VæBâF†—26W&FW267&VVâ×&Vv–öâÆ÷72g&öÒv÷&ÆB×76RfÆö÷"ð§6†F÷rW‡FVçC²æògW'F†W"FV'VrGV×÷"&V6÷fW'’&Vg&W6‚&WV—&VBf÷"F†—26ö×&—6öâà¤æò'VçF–ÖRö'V–ÆB6†ævW3³“ƒ2&VÖ–ç27W'&VçBâ–çC“ƒ"ögVæ7F–öæÃ“ƒ252&÷FV7FVBà ¢22ã“ƒ267&VVç6†÷B–ç7V7F–öâ(	B#rö7Fö&W"##` ¤–ç7V7FVBW6W"67&VVç6†÷C3t3d33‚Ô3c$BÓC3’ÓƒCdbÓ3“s#St$32çærƒs£3‚’à¥F÷×&–v‡B6öçG&öÇ2f—6–&ÆS²7V&R67G2ÆVgGv&B6†F÷râ7G&–v‡BfW'F–6Â6†F–æp§6VÒæV"&–v‡BV'FW"7&÷76W2fÆö÷"F†B6öçF–çVW2öâ&÷F‚6–FW3²F—7FçBfÆö÷ ¦VFvR—26W&FVÇ’f—6–&ÆRæB6Æ÷–ærâfÆö÷"FW&Ö–æF–öâ—2F†W&Vf÷&Ræ÷B7W÷'FV@¦2F†RW‡ÆæF–öâf÷"F†—26VÒâ÷&–v–æÂfÆö÷"öÆ–v‡Bö6öçF7BöFÖ÷7†W&R÷væW'0¦VF—FVC²æò&ö÷B6W6R÷"W&ÖæVçB&VæFW&–ær&W—"–æfW'&VBâæW‡C¢6ÖÆÂ÷&&—@§v—F†÷WB&Vg&W6‚ö×7v—F6‚Âö'6W'fR6VÒf—†VBöÖ÷f–æröF—6V&–ærâW†—7F–ær–æ—F–À§67&VVç6†÷B&WVW7BgVÆf–ÆÆVBâFö7VÖVçFF–öâöæÇ“²&VÆV6S“ƒ2æBÆÂ'VçF–ÖR–ç0§Væ6†ævVBâæòWFöÖFVB÷'VçF–ÖRöFWf–6R526Æ–ÖVBg&öÒ67&VVç6†÷B–ç7V7F–öâà ¢226ö×ÆWF–öâ&W÷'F–ær–ç7G'V7F–öâ(	B#rö7Fö&W"##` ¥W6W"&WV—&W2WfW'’&WÇ’FòVæBv—F‚7W'&VçB7FGW2æB6†÷'BÆ—7Böb÷76–&ÆP§F†–æw2FòFW7C²&V6÷&FVBW&ÖæVçFÇ’–âv÷&¶fÆ÷ræB†æFöfbâöæW‡F'V–ÆB&WVW7FVC°§&VæFW&–ær6÷W&6R6†ævR7F–ÆÂ&WV—&W2F†RVæF–ær÷&&—B÷6VÒö'6W'fF–öâFW67&–&V@¦–â7W'&VçB†æFöfbâæò'VçF–ÖR6†ævR÷"æWrçVÖ&W&VB&VÆV6R–âF†—2WFFRà ¢22ã“ƒB(	B6VÆV7FVBÖf6Rw&÷WWF†÷&–ær(	B#rö7Fö&W"##` ¥W6W"6ææ÷B7W'&VçFÇ’&W&öGV6RF†R&–v‡B×&Vv–öâfVÇBæBWF†÷&—¦W2&W7VÖ–æp¦FWfVÆ÷ÖVçBâ¶VW—BõTã¢6VÒv267&VVâÖf—†VBÂ&WGW&æVBgFW"f–Wr7v—F6†–ærÀ¦æBW6W"&W÷'G2v—¦ÖòõT’F—6V'2–âF†B&Vv–öâv†–ÆRFööÆ&"&VÖ–ç2f—6–&ÆRà¤Fòæ÷B6Æ–Òf–væWGFRÖöæÇ’6W6R÷"W&ÖæVçB&W—"â&VæFW&–ær—2Væ6†ævVBà ¤f—'7Bæ'&÷r7FWF÷v&BUbÖg&VRf6Vw&÷W–çF–æs¢d”Urâf6Vw&÷W2æ÷röffW'0¦w&÷WæÖRÇW276–vâ6VÆV7FVBò6ÆV"6VÆV7FVBâ6VÆV7Bf6W2–âf6RÖöFP¦f—'7BâW†—7F–ær6VÆV7F–öâöæf–vF–öâ÷væW'2&VÖ–ã²F†—2—2W‡Æ–6—B6VÆV7FVBÖf6P¦WF†÷&–ærÂäõB6öçF–çV÷W2Væ6–Âf6Vw&÷W''W6‚â6ÖRæÖW2¦ö–ââW†—7F–æp¦w&÷W²6ÆV"&W7F÷&W2Væw&÷WVBÖWFFFâæòUb&WV—&VÖVçB÷"FW‡GW&RÖöF–f–6F–öâà¤÷&–v–æÂÖævW"&WÆ6T7F—fTÖW6‚æB66VæR6GW&Rö6†V6·ö–çE6æ6†÷B÷vâF†P§G&ç67F–öââ&VgW6RÆö6¶VB÷&VfW&Væ6RöÆ–æ¶VB÷&V6—Rö&¦V7G2Â7F—fRFööÇ2Â–çfÆ–@§6VÆV7F–öâöæÖR÷"Ö—76–ær†—7F÷'’&Vf÷&R×WFF–öã²æòÖ÷7&VFW2æò6†V6·ö–çBà¤öæÇ’f6Tw&÷W26†ævRöâ6ÆöæS²vVöÖWG'’õUb÷&W6÷W&6W2&WF–â÷&–v–æÂ÷væW'6†—à¤W†—7F–ærf6Vw&÷W2&VæFW"Â6fRæBW‡÷'BF‡2F—7Æ’÷W'6—7BF†RÖWFFFà¤æWrÖöGVÆRÆöFVB'’÷&–v–æÂ&VæFW"ÖÖöFW3²6†ævVB&VæFW"÷&V6÷fW'’–ç3“ƒBÂ6†VÆÀ¦Ö&¶W'2æB&Wf–WvVB76WB†6†W2â&÷FV7FVB×VÇF’æB&VæFW&–ær6fVwV&G2VçF÷V6†VBà£Rfö7W6VB6†V6·252–æ6ÇVF–æræWrÖWFFFöæòÖ÷÷&VgW6Âö6†V6·ö–çBFW7G2À¦W†—7F–ærf6Vw&÷W2÷væW"ÂFööÆ&"æB&VÆV6R6öçG&7G2âFF—F–öæÂ6öFV2õUbFW7G0§&W÷'FVB6W&FVÇ’âæòæF—fR•B÷"6ö×ÆWFR7V—FR526Æ–ÖVBà ¤DUd”4S“ƒC¢6VÆV7BGvòf6W2Âd”Urâf6Vw&÷W2ÂæÖRæB76–vâ6VÆV7FVBâ6VÆV7@¦÷F†W"f6W2æB76–vâ6ÖRöF–ffW&VçBæÖS²6ÆV"6VÆV7FVBâVæFõ&VFòæB6fRô÷Và§&WF–âw&÷W3²Ub–çBæBæf–vF–öâ7F’W6&ÆRâæW‡C¢FWf–6R66WFæ6RÂF†Và§Æâ6öçF–çV÷W2w&÷W–çF–ærF‡&÷Vv‚W†—7F–ær6VÆV7F–öâövW7GW&R÷væW'6†—à ¢22ã“ƒR(	B&WW6RW†—7F–ærf6Vw&÷WæÖW3²ã“ƒBW6W"52(	B#rö7Fö&W"##` ¥W6W"53“ƒB&÷FV7G26VÆV7FVBÖf6R76–væÖVçBö6ÆV"ÂVæFõ&VFòæB6fRô÷Vâà¤æW‡Bæ'&÷rWF†÷&–ær7FW&WW6W27W'&VçBæÖW3¢d”Urâf6Vw&÷W2†2æF—fRæÖP§7VvvW7F–öç2&Vg&W6†VBg&öÒWF†÷&—FF—fRÆ—fRÖW6‚v†VæWfW"æÖR–çWBv–ç2fö7W2À¦æBW6R6VÆV7FVBw&÷WæÖR6÷–W2F†RVæ–f÷&Òw&÷Wöb6VÆV7FVBf6W2–çFò–çWBà¤Ö—†VBw&÷W2ÂVæw&÷WVBöæòö–çfÆ–B6VÆV7F–öâæBæöâÔf6RÖöFRv—fRW‡Æ–6—B&V6öà¦æB¶VW7W'&VçB–çWBâæÖW2&R–ç6W'FVBF‡&÷Vv‚÷F–öâçfÇVRÂæWfW"…DÔÂâ&VG0¦6†ævRæV—F†W"6VÆV7F–öâÂÖW6‚ÂFW‡GW&Ræ÷"†—7F÷'“²76–vâ6VÆV7FVB&VÖ–ç26öÆP¦ÖWFFFG&ç67F–öâ÷væW"âGWÆ–6FRæÖW2FVGWÆ–6FVC²æòvÆö&Â&VÖVÖ&W&VBÆ—7Bà¤÷&–v–æÂæÖRÆVæwF‚÷fÆ–FF–öâæBVF—F&ÆRÖö&¦V7B&VgW6Â&VÖ–ââæòæWrö–çFW ¦Æ—7FVæW"ÂWFöÖF–276–væÖVçBÂæWr–çFW"ö†—7F÷'’÷væW"÷"&VæFW&–ær6†ævRà ¤VF—Bf÷VæBVæ6–Â6VÆV7F–öâ÷væW'6†—6†&VB'’VFvR×–çB×6VÆV7BæBVæ6–ÂÖ÷&&—@¦vFRöÖ–ââ6öçF–çV÷W2f6Vw&÷W''W6‚&VÖ–ç2FVfW'&VBVçF–ÂF†BW†—7F–ær÷væW'6†— ¦6â&RW‡FVæFVB6ö†W&VçFÇ“³“ƒR—2w&÷WÖæÖR&WW6RÂäõBVæ6–Âf6Vw&÷W–çF–ærà¥'VçF–ÖR6†ævW2öæÇ’f6Vw&÷WÖWF†÷&–ær÷&VæFW"ÖÖöFW2T’ÂF†V—"ÆöFW"–ç3“ƒRæ@§&VÆV6R÷&V6÷fW'’Ö&¶W'3²&Wf–WvVB†6†W2WFFVBâ&÷FV7FVB×VÇF’Ã“ƒB76–væÖVç@§G&ç67F–öâÂvW7GW&W2ÂUbõ–çB÷&W6÷W&6W2æB&VæFW&–ær6fVwV&G2Væ6†ævVBà£#BF&vWFVBFW7G252ód”Âó6¶—¢w&÷W&WW6R÷&VgW6Â÷&VBÖöæÇ’÷FW‡B6fWG’ÇW0£“ƒBWF†÷&–ærÂf6Vw&÷W2÷væW"Â÷&–v–æÂFööÆ&"Â&ö¦V7B6öFV2ÂUbæB&VÆV6Rà¥7–çF‚öF–fb6†V6·273²æF—fR•B7VvvW7F–öâT’æBw&÷WÖæÖRW6RæVVB&Wf–Wrà¤æògVÆÂ×7V—FRöæF—fR6ö×÷6—F÷"&ööb6Æ–ÖVBâ–çFW&Ö—GFVçB&–v‡B×&Vv–öâfVÇBõTâà ¤DUd”4S“ƒS¢6VÆV7Bw&÷WVBf6W2âd”Urâf6Vw&÷W2âW6R6VÆV7FVBw&÷WæÖS°§6VÆV7BF–ffW&VçBf6W2æB76–vâ6VÆV7FVBv—F‚&WF–æVBæÖRâfö7W2æÖRf–VÆBf÷ ¦7W'&VçB7VvvW7F–öç2âÖ—†VB÷Væw&÷WVB6VÆV7F–öâ&VgW6W2–6·Wv—F†÷WB6†æv–æræÖRà¥VæFõ&VFò6†÷VÆBffV7B76–væÖVçBöæÇ’Âæ÷BæÖR&VG3²6fRô÷Vâ7F—266WFVBà¤æW‡BFWf–6R&W7VÇBÂF†Vâ6öçF–çV÷W2f6Vw&÷WvW7GW&RÖ÷væW"VF—Bà ¢22ã“ƒb(	BVæ6–Âf6Vw&÷W7G&ö¶W3²ã“ƒRW6W"52(	B#rö7Fö&W"##` ¥W6W"53“ƒR&÷FV7G2æÖR&WW6R÷7VvvW7F–öç2æC“ƒB76–væÖVçBö6ÆV"õVæFõ&VFòõ6fT÷Vâà¥d”Urâf6Vw&÷W2â6†ö÷6RæÖRâVæ6–Âf6Vw&÷W7G&ö¶W26Æ÷6W2d”UræB&×0¥Væ6–ÂÖöæÇ’7W&f6R7G&ö¶W2–âf6RÖöFRâVæF–ærVæ—VRf—6–&ÆRf6R†—G2&P¦6öÆÆV7FVB&—fFVÇ’æB6÷VçB6†÷vâ–â7FGW3²u$õU4ôÄõU%2UDDRôâTä4”ÂÄ”eBÀ¦æ÷BGW&–ær6öçF7BâÆ–gB6öÖÖ—G2F‡&÷Vv‚66WFVB76–vå6VÆV7FVDf6Vw&÷Wæ@¦÷&–v–æÂÖævW"÷66VæR†—7F÷'’öæ6RâæòUg2&WV—&VBâW†—7F–ær6VÆV7F–öâ—2VçF÷V6†VBà¥&V÷Vâd”Urâ7F÷f6Vw&÷W7G&ö¶W3²6†æv–ærw&÷WæÖR÷"–6¶–æræ÷F†W"æÖP§7F÷2öÆBæÖVB''W6ƒ²&V&ÒFò–çBæWrw&÷Wâ7v—F6†–ær&VæFW"Æöö²Ç6ò7F÷2à ¤÷&–v–æÂVFvR×–çB×6VÆV7B÷vç2F÷vâöÖ÷fRöVæBö6æ6VÂæBf—6–&ÆRf—'7BÖ†—B&–67C°¦æò&ÆÆVÂ&r×ö–çFW"''W6‚÷væW"âW†—7F–ærVæ6–ÂvFR&V6övæ—¦W2&ÖVBf6P¦''W6‚2ÖöFVÆÆ–ær–çFVçBöâÖW6ƒ²&6¶w&÷VæBVæ6–Âæf–vF–öâ7F–ÆÂf÷'v&G2à¤f–ævW"æf–vF–öâ&VÖ–ç3²6V6öæF'’6çf26öçF7B6æ6VÇ2VæF–ær7G&ö¶Rà¤6GW&RÆ÷72Âö–çFW&6æ6VÂÂ†–FFVâ÷vV†–FRÂ÷&&—B6Æ–ÒæB7F÷F—66&BVæF–æp¦f6W2æB&W7F÷&RW†7B&–÷"6öçG&öÇ2æVæ&ÆVBâ6öÆW66VB6öçF7B6×ÆW2æBÆ–g@¦†—B–æ6ÇVFVC²æò–çFW'öÆF–öâ÷&F—W2''W6‚–âF†—2f—'7B'V–ÆBâF‡&÷Vv‚6VÆV7F–öà¦FWF‚FöW2äõB76–vâ†–FFVâö&6²f6W3¢W6W2æV&W7Bf6RöæÇ’âW†—7F–ærÆ76òÀ¤f6TF—&V7BöÖ–âF—&V7BFööÇ2æB7Æ—Bööfg6WB÷væW'2¶VW&–÷&—G’à ¤6öçG&öÆÆW"&VgW6W2Vç6fRö&¦V7G2÷FööÇ2ö6öçFW‡C²6ö×ÆWF–öâ&V6†V6·2ö&¦V7BÂÖW6€¦–FVçF—G’ÂvVöÖWG'’öw&÷W26–væGW&RÂÆöö²öÖöFRæB÷&–v–æÂWF†÷&–ærvFW2â†—7F÷'¦÷"vVöÖWG'’6†ævW2GW&–ær6öçF7BF—66&B7G&ö¶Râæò6÷W&6R&Wf–Wr×WFF–öâ÷ ¦6æ6VÂ&öÆÆ&6²æVVFVC²GWÆ–6FRöæòÖ÷f6W2Fòæ÷B7&VFR†—7F÷'’âæWrW&R7G&ö¶P¦6öçG&öÆÆW"–×÷'G2÷&–v–æÂWF†÷&–ær†VÇW#²&VæFW"÷væW"7WÆ–W2W†—7F–ærvÆö&Ç2à¤æòvVöÖWG'’õUb÷FW‡GW&R¶W&æVÂ÷"æWr†—7F÷'’÷væW"â&÷FV7FVB×VÇF’VçF÷V6†VBà £ƒBF&vWFVB6†V6·252ód”Âó6¶—²W‡æFVB7G&ö¶RFW7BÇ6ò76W27GVÂ÷&–v–æÀ§6VÆV7F–öâÖ''W6‚µVæ6–ÂvFRv—F‚&VÂF‡&VRf6R&–67G2ÂÆ–gBÂ6æ6VÆÆF–öâÂ6V6öæF'§F÷V6‚ÂÆ÷7B6GW&RÂvV†–FRÂ&W7F÷&VB6öçG&öÇ2æB&6¶w&÷VæBæf–vF–öââ6öçG&öÆÆW §FW7G26÷fW"7Fv–ærÂVæ—VRf6W2ÂöæR6†V6·ö–çBÂ&VgW6Â÷7FÆR6öçFW‡BæBæòÖ÷à¤W†—7F–ær6VÆV7F–öâôÆ76òõVæ6–ÂÃ“SB–6¶–ærÃ“ƒBó“ƒRWF†÷&–ærÂFööÆ&"Âf6Vw&÷W2À§&ö¦V7B6öFV2ÂUbæB&VÆV6R6öçG&7G2&WF–æVBâ7–çF‚öF–fb6†V6·272âæòæF—fP¦•BögVÆÂ×7V—FR÷"&VæFW&VB&ööb6Æ–ÖVBâW†—7F–ær'VçF–ÖRFW7G2rf—6–&–Æ—G’Öö6°¦Æ6·2Fö7VÖVçBWfVçG3¢f—6–&–Æ—G’6ÆVçWW6W2v–æF÷r6GW&RÂ&W6W'f–ærf—‡GW&P¦æBÆ76ò6†V6·2Væ6†ævVBâÖW6‚6ÆöæRÆ¦–Ç’–æ—F–Æ—¦W2Æö÷6RÖVÆVÖVçB&öö¶¶VW–æs°§6÷W&6R–çf&–æ6RFW7B6ö×&W27GVÂfW'F–6W2öf6W2öw&÷W2Âæ÷BW†–Æ–'’66†W2à ¤6†ævVB÷væW'3¢VFvR×–çB×6VÆV7BÂVæ6–ÂvFRÂ&VæFW"ÖÖöFW2æBæWr7G&ö¶R6öçG&öÆÆW#°§&Wf–WvVBF—&V7Bö6†–ÆB÷&V6÷fW'’¶W—3“ƒbæB†6†W2âW†—7F–ærWF†÷&–ær†VÇW"7F—3“ƒRà¤–çFW&Ö—GFVçB&–v‡B×&Vv–öâ&VæFW&–æröv—¦ÖòfVÇB&VÖ–ç2õTã²æò&VæFW&–ærf—‚6Æ–ÖVBà¤DUd”4S“ƒc¢f6RÖöFRâd”Urf6Vw&÷W2âæÖRâVæ6–Âf6Vw&÷W7G&ö¶W3²G&r7&÷70¦f6W2ÂÆ–gBFò6VRw&÷Wâ×VÇF—ÆR7G&ö¶W2ÂöæRVæFòW"7G&ö¶Rõ&VFòâf–ævW"÷&&—BÀ¥7F÷Â6†ö÷6Ræ÷F†W"æÖR÷&V&ÒÂ6fT÷Vââ6ÆV"6VÆV7FVB&VÖ–ç3“ƒB&V†f–÷"âæW‡@¦föÆÆ÷rFWf–6R7G&ö¶R66WFæ6R&Vf÷&RFF–ærÆ—fR&Wf–Ww2Â''W6‚&F—W2÷"W&6W"à ¢22ã“ƒr(	BVæ6–Âf6Vw&÷WW&6W#²ã“ƒbW6W"52(	B#rö7Fö&W"##` ¥W6W"53“ƒb&÷FV7G2Væ6–Â76–væÖVçBÖöâÖÆ–gBÂöæR×7FW†—7F÷'’Â6æ6VÆÆF–öâÀ¥7F÷öæf–vF–öâæBw&÷WW'6—7FVæ6RâFBW&6Rw&÷W7G&ö¶W2&W6–FRF†R÷&–v–æÀ¥Væ6–Âf6Vw&÷W7G&ö¶W2'WGFöâ–âd”Urâf6Vw&÷W2â6ÖR6öçG&öÆÆW"æB4ÔP¦W†—7F–ærvW7GW&R÷væW#²W‡Æ–6—BçVÆÂw&÷W&WVW7G266WFVB6ÆV"ÖWFFFF‚à¤æò6V6öæB''W6‚Âö–çFW"†æFÆW"÷"†—7F÷'’–×ÆVÖVçFF–öââW&6W"7FvW26×ÆV@§f—6–&ÆRf6W2æB6ÆV'2öâÆ–gC²VçF÷V6†VBw&÷W2övVöÖWG'’õUb÷&W6÷W&6W2&W6W'fVBà¤Ç&VG’×Væw&÷WVB7G&ö¶W2&RæòÖ÷2v—F†÷WB†—7F÷'’âæòG—VBæÖRæVVFVBFòW&6Rà ¤76–vâôW&6R6öçG&öÇ26†÷r–æFWVæFVçB&W76VBõ7F÷Æ&VÇ2F‡&÷Vv‚öæR6†&V@§7–æ2gVæ7F–öââ6†ö÷6–ærF†R÷F†W"ÖöFR6æ6VÇ2VæF–ær7G&ö¶RæB&×2æWrÖöFS°¦6Æ–6¶–ær7F—fRÖöFR7F÷2âæÖRVF—G2÷–6·WæB7v—F6†–ær&VæFW"Æöö²7F÷&÷F‚à¤6öçG&öÆÆW"&W÷'G26ÆV"ö76–vâVæF–æræB6ö×ÆWF–öâF—7F–æ7FÇ“²çVÆÂw&÷W—0§6W&FRg&öÒ&ÖVB7FFRÂ6ò7F÷6ææ÷B66–FVçFÆÇ’Væ&ÆRW&6–ærâW†—7F–æp£“ƒbvW7GW&RövFRÖöGVÆW2'—FR×Væ6†ævVC²öæÇ’7G&ö¶R6öçG&öÆÆW"÷&VæFW"T’ÇW0§&Wf–WvVB6†–ÆB÷&VæFW"÷&V6÷fW'““ƒr–ç2Â6†VÆÂÖ&¶W'2ö†6†W26†ævRà £ƒbF&vWFVB6†V6·252ód”Âó6¶—Â–æ6ÇVF–æræWrW&6W"7Fv–ærÂVçF÷V6†VBw&÷W2ð¦vVöÖWG'’ÂöæR6†V6·ö–çBÂæòÖ÷Â6æ6VÂ÷7v—F6‚õ7F÷FW7G3²&WF–æVB7GVÃ“ƒ`¥Væ6–Â÷6VÆV7F–öâ÷væW"–çFVw&F–öâÂW†—7F–ærÆ76òõVæ6–Â÷–6¶–ærÃ“ƒBó“ƒRÖWFFFÀ¤f6Vw&÷W2÷FööÆ&"÷&ö¦V7BõUb÷&VÆV6RFW7G2â7–çF‚öF–fb6†V6·272âæòæF—fRögVÆÀ§7V—FR&ööb6Æ–ÖVBâ–çFW&Ö—GFVçB&VæFW&–æröv—¦ÖòÆ÷72&VÖ–ç2õTâÂæ÷B&W—&VBà¤DUd”4S“ƒs¢w&÷Wf6W2Â&ÒW&6Rw&÷W7G&ö¶W2ÂG&ræBÆ–gC²öæÇ’6×ÆVBf6W0¦&V6öÖRVæw&÷WVBâVæFõ&VFòöæ6RW"7G&ö¶S²W&6RVæw&÷WVBf6RFG2æòVæFòâ7v—F6€¦&6²FòæÖVBVæ6–Â7G&ö¶W3²7F÷æBæf–vFRâ6fRô÷Vâ&WF–ç2w&÷W2âæW‡@¦föÆÆ÷rFWf–6RW&6W"66WFæ6R&Vf÷&RÆ—fRfVVF&6²÷&F—W2v÷&²à ¢22ã“ƒ‚(	BW‡Æ–6—BW†—7F–ærÖw&÷W6VÆV7F÷#²ã“ƒr&VæFW&–ær&V7W'&Væ6R(	B#rö7Fö&W"##` ¥W6W"&W÷'G2VçF—&Rd”UrÖVçRFV×÷&&–Ç’fæ—6†VB†æ÷B&W&öGV6–&ÆRæ÷r’ÂföÆÆ÷v–æp£“ƒrÆ÷vW"×&–v‡B&Ææ²&V÷&W÷'BæB67&VVç6†÷Bâæó“ƒr52–æfW'&VBâ&÷FV7C“ƒ`§7G&ö¶W2æC“ƒRó“ƒB66WFVBv÷&¶fÆ÷w3²&VæFW&–ær—77VRõTââWf–FVæ6R7VÖÖ&—¦V@¦–âFö72÷V’×&–v‡B×&Vv–öâÓ“ƒræÖBÂ–æ6ÇVF–ærÆ–Ö—G2öb†VÇF‡’DôÒö†—G2æB†–FFVà¦v—¦Öò–âF†—27V6–f–26GW&RâFòæ÷B6Æ–Ò7GVF–òÖöæÇ’6W6R÷"T’&W—"à ¤–æFWVæFVçB7F–öæ&ÆRW6W"f–ÇW&S¢w&÷WÆ—7BDôU2äõBõTââVF—B÷&–v–æÀ£“ƒRæÖR–çWB¶FFÆ—7C¢æÖR7VvvW7F–öç2&Ræ÷BâW‡Æ–6—BG&÷F÷vââ&WÆ6P§v—F‚6W&FRæF—fRW†—7F–ærw&÷W6VÆV7B‡6ÖRæÖW2g&öÒWF†÷&—FF—fRÆ—fP¦ÖW6‚’æB¶VW÷&–v–æÂVF—F&ÆRw&÷W–çWBf÷"æWræÖW2âæò7W7FöÒ÷W÷"æWp§ö–çFW"÷væW"âæF—fR6VÆV7B÷F–öç2†fR6fRfÇVR÷FW‡D6öçFVçBÂVæ—VR6÷'FV@¦æÖW2æBV×G’×7FFR&ö×Bâ&Vg&W6‚öâd”UrFövvÆRÂf6Vw&÷W2T’7–æ2æBgFW ¦76–væÖVçBö6ÆV"Â&WF–æ–ær7W'&VçBæÖRv†Vâ—BW†—7G2â6†ö–6R6÷–W2æÖR–çFð¦÷&–v–æÂ–çWBæBF—7F6†W2—G266WFVB–çWBWfVçBÂ7F÷–ær&Wf–÷W2&ÖV@§7G&ö¶W2öW&6W#²æòÖW6‚÷6VÆV7F–öâö†—7F÷'’6†ævRVçF–Â7GVÂ76–væÖVçB÷7G&ö¶Rà¥F†—2—2w&÷W×6VÆV7F÷"f—‚Âæ÷Bf–Ww÷'Bö6ö×÷6—F÷"&W—"à ¤6†ævVBgVæ7F–öæÆ—G’ôäÅ’&VæFW"ÖÖöFW2T“²&Wf–WvVB&VæFW"÷&V6÷fW'““ƒ‚–ç2æ@§&VÆV6RÖ&¶W'2ö†6†W2âvW7GW&RövFR÷7G&ö¶RöWF†÷&–ærõUbövVöÖWG'’ô×VÇF’÷væW'0§Væ6†ævVBãƒ‚F&vWFVB6†V6·252ód”Âó6¶—¢æWr7GVÂ–6¶W"÷VÆF–öâö6†ævP¦6ÆÆ&6·2Âg&W6‚öV×G’÷Vç6fR×FW‡B66W2ÂÇW2&WF–æVBÖWFFF÷7G&ö¶RöW&6W"À¥Væ6–ÂôÆ76ò÷–6¶–ærÇFööÆ&"Ç&ö¦V7BÅUbæB&VÆV6RFW7G2â7–çF‚öF–fb6†V6·272à¤æF—fR•B6VÆV7B÷Væ–æræVVG2†æG2Ööâ&Wf–Ws²æògVÆÂ×7V—FR÷&VæFW&VB&ööb6Æ–ÖVBà¤DUd”4S“ƒƒ¢f6RÖöFRâd”Urf6Vw&÷W2âW†—7F–ærw&÷W÷Vç2&VÂæF—fRÆ—7C°¦6†ö÷6Rw&÷WÂ6VÆV7BÖ÷&Rf6W2æB76–vâ6VÆV7FVBâG—Ræ÷F†W"æÖRFò7&VFP¦w&÷WÂ&V÷Vâd”UræB6öæf—&ÒÆ—7FVC²VæFõ&VFò6†ævW276–væÖVçG2öæÇ’â&WFW7@¦W&6RæB6fRô÷Vâ–b6öçfVæ–VçBâ–bd”Ur&Ææ·2v–âÂæ÷FR67&öÆÂ&V†f–÷"æ@§v†WF†W"W‡Æ–6—Bf–ÆR&Vg&W6‚F—7Æ’&W7F÷&W3²æò&WVFVBFV'VrGV×&WV—&VBà¤æW‡BæF—fR6VÆV7F÷"öW&6W"fVVF&6³²'&öFW"&VæFW&–ærF–væ÷6—2&VÖ–ç26W&FRà ¢22ã“ƒ’(	Bd”Ur÷Vâ÷æVÂ÷67&öÆÂWf–FVæ6S²ã“ƒ‚W6W"52(	B#rö7Fö&W"##` ¥W6W"53“ƒ‚&÷FV7G2&VÂW†—7F–ærw&÷WG&÷F÷vâÂ76–væÖVçB&WW6RæBW†—7F–æp¦æÖR÷7G&ö¶RöW&6W"v÷&¶fÆ÷w3²gVæ7F–öæÂ66WFæ6RFöW2æ÷B6Æ÷6R&V7W'&–ærd”Up§&VæFW&–ær—77VRâÆFW7C“ƒ‚GV×£C£C%¢&÷fW2Væ6–ÂF÷vâ÷Wö6Æ–6²&V6†W2d”Up§7VÖÖ'’v—F†÷WB&WfVçDFVfVÇBÂv—F‚6ÖR†VÇF‡“3cgƒƒƒbôE#"Æ–÷WBæBæòU`§F÷Æ–W"â—BöÖ—G2æF—fRFWF–Ç2æ÷VâÂæVÂ&V7B÷67&öÆÂæBÖöFRÂ6ò6ææ÷BFVÆÀ¦6Æ÷6VBÖVçRg&öÒâ÷Vâ'WBVç–çFVBæVÂâFòæ÷B&WVW7Bæ÷F†W"–FVçF–6ÂGV× ¦÷"6Æ–ÒVæv–æR6W6S²6ÖRW†—7F–ær÷BÖ–âFV'Vr÷væW"v–ç2Ö—76–ærWf–FVæ6Rà ¥6æ6†÷Bæ÷r–æ6ÇVFW2f–WtÖVçS¢æF—fR÷Vâ7FFR†çVÆÂ–bÖ—76–ær’Â7GVÂ7F—fP§&VæFW"'WGFöâÂ6VÆV7F–öâÖöFRÂf6Vw&÷W7G&ö¶R&ÖVBö6öçF7Bö76–vâÖ÷"ÖW&6RÀ¦w&÷W×–6¶W"÷F–öâ6÷VçBö–æFW‚öF—6&ÆVB†æ÷Bw&÷WæÖW2’Âd”UræVÂæB6VÆV7FV@¦f6Vw&÷WÖ6öçG&öÂ&÷VæG2÷f—6–&–Æ—G’ö÷fW&fÆ÷r÷67&öÆÅF÷÷67&öÆÄ†V–v‡Bö6Æ–VçD†V–v‡BÀ§ÇW27GVF–ò÷fW&Æ’7G–ÆR–æ6ÇVF–ærÖ—„&ÆVæDÖöFRâW†—7F–ær6öçG&öÂôDôÒWf–FVæ6P§&WF–æVBâæF—fRFövvÆR6GW&W2f–æÂ÷Vâ7FFS²æVÂ67&öÆÂ6GW&W2—G27W'&Vç@§÷6—F–öââ&÷F‚76—fRv–æF÷rÖ6GW&Rö'6W'fW'2ÖV7W&RôäÅ’v†VâFV'VrVæ&ÆVBÀ¦VæBFòW†—7F–ær&÷VæFVCÖWfVçB'VffW"ÂæWfW"6öç7VÖR–çWBÂfö7W2ö÷Vâ÷67&öÆÀ¦ÖVçW2÷"–çfö¶R&Vg&W6‚âæòöÆÆ–ærÂæWr÷W÷"WFöÖF–2&W–çBà ¤6†ævVB'VçF–ÖRôäÅ’vW7GW&RÖFV'Vs²÷&–v–æÂ6÷W&6RFV'Vr÷&V6÷fW'““ƒ’¶W—2æ@§&VÆV6RÖ&¶W'2÷&Wf–WvVB†6‚âÆÂ&VæFW&–ærô552õd”UröæF—fR6VÆV7F÷"ö''W6‚ö†—7F÷'’ð¦ÖöFVÆÆ–ærô×VÇF’–×ÆVÖVçFF–öç2Væ6†ævVBâF†—2—2D”täõ5D”2Âæ÷B&VæFW&–ærf—‚à£#’fö7W6VB6†V6·252ód”Âó6¶—¢æWr7GVÂv†öÆRÖFV'Vr&W÷'Böö'6W'fW"FW7G0¢†÷Vâö6Æ÷6VBöÖ—76–ærÂvVöÖWG'’÷67&öÆÂÂÖöFW2÷–6¶W"Â&VBÖöæÇ’öFV'VrÖöfb&VgW6Â’À¦÷&–v–æÂ&ö&R÷&V6÷fW'’öFV'Vr÷&VÆV6RæC“ƒN(	3“ƒ‚WF†÷&–ær÷7G&ö¶R÷6VÆV7F÷"FW7G2à¥7–çF‚öF–fb6†V6·273²æòæF—fRögVÆÂ×7V—FR÷"W&ÖæVçB&W—"&ööb6Æ–ÖVBà ¤DUd”4S“ƒ“¢æ÷&ÖÂd”UræBW†—7F–ærw&÷W&VÖ–â66WFVBâ–bÖVçRF—6V'2÷ ¦&Ææ·2Âf–ÆRâT’FV'VrâG'’d”Uröæ6Râ6GW&Rô6÷’&Vf÷&R&Vg&W6‚F—7Æ’÷ ¦×7v—F6‚âæWrf–WtÖVçRæ÷VâæBæVÂæöFW2æ÷r6W&FRæF—fR7FFRg&öÒ–çBà¥G'’67&öÆÂ–ç6–FRæVÂ–b÷76–&ÆRÂ6GW&Rv–âöæÇ’–b6†ævVBâ–bfVÇBFöW0¦æ÷B&V7W"Âæòf÷&6VB&W&öGV7F–öâ&WV—&VBâæW‡BæF—fRWf–FVæ6S²fVGW&RG&¦V7F÷'¦6â&W7VÖRgFW"fVVF&6²v†–ÆR&WF–æ–ærF†—2÷Vâ&VæFW&–ærvFRà ¢22ã““(	BW‡Æ–6—B6Æ÷6VBd”Ur7W&f6R&VÖ÷fÂ(	B#rö7Fö&W"##` ¥W6W"öæW‡F'V–ÆBgFW"Gvó“ƒ’6GW&W2âC£Sƒ£3U¢6çf5&ö&V†–FFVåE%TRæBGvð§7V&¦V7F—fR&–v‡ET“¦Ö—76–ærö'6W'fF–öç3²C£Sƒ£S¢6çf2&W7F÷&VBö†–FFVädÅ4Rà¤&÷F‚7GVF–òôf6RÂæò''W6‚÷6W76–öâõUbv÷&·76RÂæF—fRd”Ur÷VädÅ4RÂ–WBf—†V@§æVÂ&V7C“ƒ"óBãRó3cósSbÂ67&öÆÄ†V–v‡Bö6Æ–VçD†V–v‡CsSBâæòd”UrF÷vâ÷FövvÆR–à§&V6÷&FVB–çFW'fÃ¢F†W6RFòæ÷BF–væ÷6RâGFV×FVB÷VâæVÂâ†–F–æs4BæòÆöævW §&W7F÷&VBT’–âF†—2&V7W'&Væ6S²Fòæ÷B&WVBöÆB6çf2ÖöæÇ’&V6÷fW'’wV&çFVRà¤6ö×WFVBÆ–÷WBö†VÇF‡’†—G2&Ræ÷B&ööböbG&vâ—†VÇ2÷"Væv–æR&ö÷B6W6Rà ¤VF—B÷&–v–æÂf–WrÖÖöFW3¢f—†VB÷fW&fÆ÷v–æræVÂ&VÆ–W2VçF—&VÇ’öâæF—fP¦6Æ÷6VBÖFWF–Ç26öçFVçB7W&W76–öã²æòW‡Æ–6—B6Æ÷6VBF—7Æ’'VÆRâFB66÷V@¢7f–WtÖöFW3¦æ÷B…¶÷VåÒ’âçf–Ww÷'BÖÖVçR×æVÂ¶F—7Æ“¦æöæR–×÷'FçGÒ–â÷&–v–æÀ¦V&Ç’FööÆ&"7G–ÆW6†VWBäB÷&–v–æÂf–WrÖÖöFW27G–ÆRfÆÆ&6²âF‡W26Æ÷6VBd”Up¦†2¦W&òæVÂÆ–÷WB÷67&öÆÆ–ær7W&f6R&Vf÷&R‡–G&F–öâæBgFW"ÆÂæF—fR÷ §&öw&ÖÖF–26Æ÷6W2â÷Væ–ær&VÖ÷fW2ôäÅ’F†—26Æ÷6VB×7FFR'VÆRæBW6W2÷&–v–æÀ¦f—†VBæVÂ÷67&öÆÂ÷6WGF–æw2âæF—fRFWF–Ç2æ÷Vâ&VÖ–ç26öÆR7FFR÷væW#²÷&–v–æÀ¦æöFW2öÆ—7FVæW'2ö6öçG&öÂ–FVçF—G’&W6W'fVBâæò¥2FövvÆRÂ&W&VçBÂW‡G&ÖVçRÂF–ÖW"À§&Vg&W6‚ö&Æ–æ²Â&VæFW&W"ô552Ö&ÆVæB6†ævR÷"&r×ö–çFW"÷væW"à ¥F†—2—2æ'&÷r6Æ÷6VB×7W&f6RÆ–fV7–6ÆR†&FVæ–ærÂäõB&ööbF†Ræöç¦W&ò6Æ÷6V@¦&÷‚6W6VBWfW'’&–v‡B×&Vv–öâfVÇBÂ÷"wV&çFVVBW&ÖæVçB6ö×÷6—F÷"&W—"à¤÷Vâ×æVÂ6Æ—–ær÷v†öÆRf–Ww÷'B&VæFW&–ærvFR&VÖ–ç2õTâVçF–ÂæF—fRfVVF&6²à£“ƒ’F–væ÷7F–72&WF–æVBâöæÇ’V&Ç’FööÆ&"552æB÷&–v–æÂd”Ur7G–ÆRgVæ7F–öà¦6†ævS²&Wf–WvVB6†VÆÂõd”Urô552÷&V6÷fW'“““–ç2ö†6†W2âÆÂvVöÖWG'’ö''W6‚õUbô×VÇF¦–×ÆVÖVçFF–öç2Væ6†ævVBâæó“ƒ’52–æfW'&VBg&öÒFV'Vr&W÷'G2ã“ƒ‚66WFæ6P§&WF–æVBã3"fö7W6VB52ód”Âó6¶—¢÷&–v–æÂ7F'GWFööÆ&"ö‡–G&F–öâö7F–öà¦–FVçF—G’Â&VÆV6RÂ&W÷'B÷&ö&R÷&V6÷fW'’æC“ƒN(	3“ƒ‚WF†÷'6†—÷7G&ö¶R÷6VÆV7F÷"à¥7–çF‚öF–fb73²æòæF—fR÷&VæFW&VBögVÆÂ×7V—FR&ööb6Æ–ÖVBà¤DUd”4S““¢g&W6‚&VÆöBÂd”Ur÷Vâö6Æ÷6R6WfW&ÂF–ÖW3²67&öÆÂæBw&÷W–6¶W"à¤6Æ÷6VBd”UrFV'VræVÂ&V7B6†÷VÆB&R¦W&òöF—7Æ–æöæS²÷Vâ×W7B6†÷r÷&–v–æÀ§6WGF–æw2âvF6‚&–v‡BFööÆ&"öfö÷FW"öv—¦Öò–bf—6–&ÆRÂv—F†÷WBf÷&6VB&W&öGV7F–öâà¤–b&V7W'&Væ6RÂW†—7F–æs“ƒ’&W÷'BÇW2f—6–&ÆR7–×FöÓ²æò&WVFVB†–FR÷6†÷ræVVFVBà¤æW‡B7GVÃ““æF—fRfVVF&6²&Vf÷&R7V7VÆF—fRÆ–W"6†ævW2à ¢22ã““(	B6ö×7BÆVgBf6Vw&÷W–çBFö6³²ã““W6W"52(	B#rö7Fö&W"##` ¥W6W"53““&÷FV7G2W‡Æ–6—B6Æ÷6VBd”Ur7W&f6RæB÷&–v–æÂ÷Vâ÷67&öÆÂ÷–6¶W ¦&V†f–÷#²6öçF–çVRvF6†–ær–çFW&Ö—GFVçB&VæFW&–ær&F†W"F†â6Æ–Ö–ærVæv–æR&ö÷@¦6W6RâW6W"6·2&WGFW"f6Vw&÷W–çF–ærT’õU‚âVF—B66WFVBWF†÷&–ær÷7G&ö¶Rð¥d”Ur÷6W76–öâ÷÷6—F–öâ÷væW'2öâ&6VÆ–æS““âW†—7F–ær6öçG&öÇ2Æ—fVB–ç6–FRd”Up¦æB7F÷VB''W6‚v†VæWfW"&Wf—6—FVBÂ&WV—&–ær&WVFVBÖVçR7–6Æ–ærà ¥d”Urâf6Vw&÷W2æ÷röffW'2÷Vâf6Vw&÷W–çB6öçG&öÇ2â÷Vç26ö×7C#“€¦ÆVgBFö6³‡‚g&öÒf–Ww÷'BF÷öÆVgBW6–ærõ$”t”äÂ6ö×7BæVÂ÷6—F–öâ†VÇW#°§–çG2FVfVÇB7W'&VçBw&÷WæB–çfö¶W2õ$”t”äÂf6RÖöFR'WGFöâ–bæVVFVBà¤W†—7F–æræÖR–çWBöæF—fRW†—7F–ærw&÷W–6¶W"Â–çBôW&6RæB6VÆV7FVBÖf6P¦6öÖÖæG2&R4ÔRDôÒæöFW2&W&VçFVBg&öÒ†–FFVâ†öÖR–âd”UrÂæ÷B6ÆöæVB÷&÷†–VBà¥ÆWGFRö6öÆ÷W"V&æ6R7F—2–âd”UrâæÖRæBW†—7F–ærw&÷W6—B&÷fRGvð¦6ÆV"&W76VB–çBôW&6RÖöFR'WGFöç3²Gfæ6VB76–vâô6ÆV"õW6R6VÆV7FVB6öÖÖæG0¦6öÆÆ6RVæFW"6VÆV7FVBf6W2âFöæR—2Çv—2BFö6²†VFW#²7F÷2''W6‚æB&·0¦÷&–v–æÂ6öçG&öÇ2&6²–â†–FFVâ†öÖRÂFö6²F—7Æ–æöæRâf6Vw&÷W2Æöö²&VÖ–ç0§6òW6W"6â–ç7V7B–çFVBw&÷W2âæòæVVBFò&V÷Vâd”Ur&WGvVVâ7G&ö¶W2÷FööÇ2à ¥–çBôW&6Ræ÷rW'6—7FVçB&F–ò×7G–ÆR6†ö–6W3²FöæRW†—G2âW†—7F–ærw&÷W6†ö–6P¦÷"6ö×ÆWFVBæÖRVF—B&×26†÷6VâæÖVB–çBv†–ÆRFö6²÷Vã²G—–ærW6W2öÆ@¦''W6‚VçF–Â6†ævRö6öÖÖ—BâW6R6VÆV7FVBw&÷WæÖRÇ6ò&V&×2æÖVB–çB–âFö6²à¥–6¶W"&Vg&W6†W2öâfö7W2æBW†—7F–ærd”Urö76–væÖVçB&÷WFW2â÷&–v–æÂ7G&ö¶RÖöâÐ¦Æ–gBÂVæ—VRÖf6R7Fv–ærÂöæR×7FW†—7F÷'’ö6æ6VÂ÷&W6÷W&6R÷væW'2Væ6†ævVBâæð¦æWr&r×ö–çFW"÷–çBö†—7F÷'’÷væW"÷"Ub&WV—&VÖVçBâ6†&VBÆ6VÖVçB†VÇW"W6V@¦6ö×7Bv—F‚W‡Æ–6—B–çBÖÆVgBW†6WF–öã²æòæWrf–ÇFW"ö6öçF–âöÆ–W"÷&W–çB†–çBà¤Fö6²6Æ÷6W2öâ&VæFW"ÖÆöö²6†ævRÂæöâÔf6RÖöFR6Æ–6²‡&VBÖöæÇ’6GW&R’Â÷"7F'@¦öbæ÷F†W"÷&–v–æÂFööÂ6W76–öââ÷Væ–ær&VgW6W27W'&VçB6W76–öâ&F†W"F†à¦&æFöæ–ær—G2&Wf–Wrâ66VæR÷6VÆV7F–öâö†—7F÷'’VæffV7FVB'’Fö6²6Æ÷6Rà ¥'VçF–ÖR6†ævW2öæÇ’÷&–v–æÂ&VæFW"T’æB6ÖÆÂ&W&VçF–ærFö6²†VÇW#²÷&–v–æÀ§7G&ö¶RövFRövVöÖWG'’õUböÖ–âô×VÇF’ó““d”Ur–×ÆVÖVçFF–öç2'—FR×Væ6†ævVBâ&Wf–WvV@§&VæFW"öæWrÖ6†–ÆB÷&V6÷fW'“““–ç2æB†6†W2â–6¶W"FW7Bæ÷rVW&–W2Fö7VÖVçB”G0¦f÷"÷&–v–æÂ6öçG&öÇ2gFW"&VÆö6F–öâÂ&W6W'f–ær—G26†ö–6Rö–çWB76W'F–öç2à£“F&vWFVB52ód”Âó6¶—¢æWr7GVÂFö6²Æ–fV7–6ÆR÷fÇVRöÆ—7FVæW"–FVçF—G’÷fW £"&V÷Vâ7–6ÆW2ÂFöæR÷Væf–Æ&ÆR&VçBÂ7GVÂ6öÖÖæB&÷WF–ær÷W'6—7FVçBÖöFW2ð¦7F—fR×FööÂ&VgW6Ã²&WF–æVB–6¶W"÷7G&ö¶RöW&6W"öÖWFFFÂæF—fR6VÆV7F–öâõVæ6–Âð¤Æ76ò÷–6¶–ærÇFööÆ&"÷&ö¦V7BõUb÷&VÆV6Râ7–çF‚öF–fb6†V6·272âæòæF—fR÷&VæFW&VBð¦gVÆÂ×7V—FR&ööb6Æ–ÖVBâæF—fRFö6²76–æræBG—–æröG&÷F÷vâW6&–Æ—G’VæF–ærà ¤DUd”4S““¢d”Urf6Vw&÷W2â÷Vâf6Vw&÷W–çB6öçG&öÇ3²fW&–g’ÆVgBFö6²æ@¦WFöÖF–2f6RÖöFRÂ6Æ÷6Rd”Urâ6VÆV7Bw&÷W÷"G—RæÖRÂVæ6–Â7G&ö¶RöÆ–gC°¥–çBôW&6Rv—F†÷WB&V÷Væ–ærd”Urâ6VÆV7FVBf6W2Gfæ6VB6öÖÖæG3²VæFõ&VFòà¤FöæR†–FW2Fö6²÷7F÷2''W6‚Âf–ævW'2æf–vFS²&V÷Vâ&WF–ç2æÖS²6fRô÷Vâà¤æW‡BæF—fRU‚fVVF&6²&Vf÷&RW‡G&7W'6÷"÷&F—W2öÆ—fR6öÆ÷W"fVVF&6²à ¢22ã““&–v‡B×&Vv–öâ&V7W'&Væ6R(	B#rö7Fö&W"##bÂC££•  ¥W6W"W‡Æ–6—FÇ’&W÷'G2&–v‡BÖ†æB—77VRt”âöã““âFòæ÷BG&VC““gVæ7F–öæÀ¥522W&ÖæVçB&VæFW&–ær66WFæ6S²&WF–â6Æ÷6VB×æVÂÆ–fV7–6ÆR&÷FV7F–öà§v†–ÆR&V÷Væ–ær'&öBf—6–&–Æ—G’vFRã““Fö6²U‚†2äõB&V6V—fVBW6W"52à¥7WÆ–VB&W÷'C¢f6Vw&÷W2ôf6RÂæò7F—fR7G&ö¶R÷6W76–öâ÷FW‡GW&R–çC²6çf0§f—6–&ÆS#s3'ƒcS"Âf–Ww÷'C3cgƒƒƒbôE#"â7GVF–ò÷fW&Æ’÷6—G“âd”UræF—fP§FövvÆRWf–FVæ6RC#ƒ3“ó#“#Ró3ƒbó3r6†÷w2÷VâG'VRöfÇ6R÷G'VRöfÇ6Râ÷Và§æVÂ&V7C““‚ócbó3cóƒã“ƒBÂ67&öÆÄ†V–v‡C“ƒö6Æ–VçD†V–v‡Cƒ²6Æ÷6VBF—7Æ–æöæP¦æB¦W&ò&V7BâF‡W2æF—fR–çWBæC““6Æ÷6VB×7W&f6R&VÖ÷fÂv÷&²Â'WBFòäõ@¦VÆ–Ö–æFRW6W"w2f—7VÂÆ÷72âFòæ÷B&WVBæF—fR×FövvÆRf–ÇW&R÷"&WF–æVB6Æ÷6V@¥d”UræVÂ2W‡ÆæF–öâf÷"F†—26GW&RâG&ç7&VçB7GVF–òÆ–W"&VÖ–ç2–à¤DôÓ²÷6—G“vV¶Vç2f—6–&ÆR×f–væWGFRW‡ÆæF–öâv—F†÷WB&÷f–ærVæv–æR6W6Rà¤6öçG&öÇ2ôDôÒö†—G2†VÇF‡’—2æ÷B—†VÂWf–FVæ6Râv—¦ÖòW‡Æ–6—FÇ’†–FFVâ†W&Rà ¤–ã““WF†÷&–æræöFW2&R&¶VB–â†–FFVâ†öÖRVçF–Â÷Vâf6Vw&÷W–çB6öçG&öÇ2à¥F†V—"¦W&ò&÷VæG2WfVâv†–ÆRd”Ur÷Vâ&RU…T5DTC²ÆWGFRV&æ6R6öçG&öÇ0§&VÖ–â–âd”UrâFV'Vrw2w&÷W–6¶W"÷F–öä6÷VçC6â6–×Ç’ÖVâV×G’æÖVBÖw&÷W ¦Æ—7BÇW2Æ6V†öÆFW"âFòæ÷B–æfW"6VÆV7F÷"&Vw&W76–öâ÷"Ö—76–ærWF†÷&–æræöFW2à¤7W'&VçBFV'VrFöW2æ÷B6×ÆRæWrFö6²&ö÷Bâ6÷W&6RõUƒ““&VÖ–ç2VæF–ærFWf–6P¦66WFæ6Râ'VçF–ÖR&VÖ–ç3““²æò7V7VÆF—fR&VæFW&–ær6†ævW2–âF†—2WFFRà¤Æ—fRfW'6–öâö–æFW‚÷&VæFW"ÖÖöFW2öFö6²'—FRÖÖF6‚fW&–f–VC³“fö7W6VBFW7G2vW&P§fÆ–FFVB&Vf÷&RV&Æ–6F–öââæW‡BFW7BæWrÆVgBFö6²æB6ö×&R—G2f—6–&–Æ—G§v—F‚ffV7FVB&–v‡B&Vv–öâ–b&V7W'&Væ6RW'6—7G3²æò&WVFVB†–FS4B÷FövvÆRGV×0¦æVVFVBâ&ö÷B6W6R&VÖ–ç2Væ6öæf—&ÖVBà ¢22ã““"(	Bf6Vw&÷W6öÆ÷W"öæÖRÆ—7C²ã““W6W"52(	B#rö7Fö&W"##` ¥W6W"6öæf—&×3““–çB6öçG&öÇ2v÷&²w&VBgFW"&Vg&W6‚æBW‡Æ–6—FÇ’53““à¥&÷FV7B6ö×7BÆVgBFö6²Â÷&–v–æÂ6öçG&öÇ2ÂW'6—7FVçB–çBôW&6RÂFöæRæB7G&ö¶P¦†—7F÷'’öæf–vF–öââ67&VVç6†÷BC„T3C“$6†÷w2&–v‡Bd”Ur&÷&FW"ö&6¶w&÷VæBv—F€¦&Ææ²–çFW&–÷"&Vf÷&R&Vg&W6ƒ²¶VW–çFW&Ö—GFVçB&VæFW&–ærvFRõTâ–æFWVæFVçFÇ’à £““"&WÆ6W2W†—7F–ærw&÷WæF—fRG&÷F÷vâv—F‚&÷VæFVC#‚Æ–W"×7G–ÆRÆ—7C ¦öæRFF&vWBW"æÖVBw&÷WÂ6öÆ÷W"7vF6‚²6fRFW‡BæÖRÂ6VÆV7FVB×&÷r†–v†Æ–v‡Bà¤æÖRf–VÆB7F–ÆÂ7&VFW2æWrw&÷W3²6†ö÷6–ær&÷r&WW6W2÷&–v–æÂ–çWBæB&×0¦÷&–v–æÂ–çBÖöFRâ&÷w2&R&W6VçFF–öâöæÇ’ÂæòÖW6‚ö†—7F÷'’öÖFW&–Â×WFF–öâà¥6†&VBf6Tw&÷WÆWGFRW‡÷6W2U„5BW†—7F–ærf–Ww÷'BÖW6‚Ö÷&FW"övöÆFVâ×&F–ð¦6öÆ÷W"Ö²&÷F‚&VæFW&W"æBÆ—7BW6R—BâÆWGFR÷&W6VVBöÆ–v‡FæW72÷6GW&F–öâWFFP§7vF6†W2Â÷&–v–æÂ&VæFW&–ærÆv÷&—F†ÒVæ6†ævVBâ&÷w2¶VWæöFRöfö7W2–FVçF—G’öà§6VÆV7F–öâö6öÆ÷W"&Vg&W6ƒ²w&÷WÖVÖ&W'6†—&V'V–ÆG2Æ–÷WBöæÇ’v†Vâ6†ævVBà¥&Vg&W6‚7W'&VçBÖW6‚öâ÷VâÂæÖRöVF—B÷6VÆV7F–öâÂÆWGFR6†ævW2æBVWVVB÷&–v–æÀ¦&öG’&V'V–ÆG2‡7G&ö¶R6öÖÖ—BÂ7F—fRö&¦V7B7v—F6‚ÂVæFõ&VFò“²æòöÆÆ–æröæWrö–çFW ¦÷væW"âæÖW2&RFW‡D6öçFVçBÂæWfW"…DÔÂâV×G’Æ—7BW‡Æ–ç2æÖR²–çBv÷&¶fÆ÷rà¤ÆVv7““ƒ‚–6¶W"FW7G2Ö–w&FRFòæWrÆ—7BFFW"&W6W'f–ær7W'&VçBÖÖW6‚öæÖRöæð¦×WFF–öâ6÷fW&vS²æWr&VæFW&W"FW7G26÷fW"6VÆV7F–öâö–FVçF—G’öV×G’÷FW‡B6fWG’À¦÷&–v–æÂ''W6‚6ÆÆ&6²æB7vF6‚×Fò×&VæFW"ÖGG&–'WFR&—G’7&÷72ÆÃBÆWGFW2à¥7G&ö¶S“ƒröWF†÷&–æs“ƒRöFö6³““õUbõ–çBöÖ–âô×VÇF“ãæC““d”Ur'VÆRVæ6†ævVBà¥fÆ–FF–öã£“2F&vWFVB52ód”Âó6¶—²7–çF‚æBF–fb6†V6·272â&Wf–WvV@¦6†ævVB&VæFW"ö6÷&RöæWrÖÆ—7BæB6†VÆÂ÷&V6÷fW'’66†R¶W—3²æògVÆÂ×7V—FRöæF—fP§&VæFW&–ær&ööb6Æ–ÖVBâF†R&–÷#“ƒR6fR×FW‡B76W'F–öâæ÷rF&vWG2Æ—7BÆ&VÇ0¦–ç7FVBöbæF—fR÷F–öâ–×ÆVÖVçFF–öâã““"v—G2•BÆ—7B66WFæ6Rà ¤gWGW&RW6W"vöÃ¢f6Vw&÷W&÷VæF&–W2FVf–æRUb—6ÆæB6V×2ÂF†Vâw&÷W×F&vWFV@¦–ÖvRõ%"76–væÖVçBâVF—B÷&–v–æÂUbFÆ2÷6VÒ÷7F—F6‚æB–çBÖ6²öÖFW&–À¦÷væW'2f—'7Bâf—'7BÆ–¶VÇ’&÷WFR6†&VBFÆ2v—F‚W"Öw&÷WÖ6·2ö&¶–æs²6W&FP¦ÖFW&–Â6Æ÷G2&WV—&R&VæFW&W"÷6fRôô$¢ôtÄ"ôäôÒVF—BâF†—2'V–ÆBDôU2äõB–×ÆVÖVç@§Vçw&Ö'’Öw&÷W2÷"W"Öw&÷WÖFW&–Ç2ÂæB×W7Bæ÷B–×Ç’F†W’W†—7Bâ6ÖRÖæÖP¦F—66öææV7FVBf6RF6†W2Ö’––VÆB×VÇF—ÆR—6ÆæG3²vVöÖWG'’7F—2vVÆFVBà ¤DUd”4S““#¢÷Vâf6Vw&÷W2–çBFö6³²–çC"²w&÷WæÖW2Â–ç7V7B7vF6‚öæÖR&÷w2à¥F&÷w2æB–çBöW&6S²6VÆV7FVBæÖRö†–v†Æ–v‡BæBVæFõ&VFò&Vg&W6‚Æ—7BâF§W7@¥d”UrÆWGFR÷&W6VVBæB&V÷VâFö6³¢7vF6†W2föÆÆ÷rf–Ww÷'B&6R6öÆ÷W'2†Æ–v‡F–æp¦6â6†FRÖöFVÂ’âÆöæræÖW2öÖç’w&÷W27F’6ö×7C²FöæRöf–ævW"æf–vF–öâà ¢22ã““2(	Bf6RÇ’W†7BæF—fR×ö–çFW"6GW&R&W—"(	B#rö7Fö&W"##` ¥W6W"&W÷'G2Ç’W‡G'VFRW†7BFöW2æ÷Bv÷&²æBG&2F†RW6W"–âW‡G'VFRà¤VF—FVB7W'&VçBÖ–ãS“cvF##’ö'V–ÆC““"Â÷&–v–æÂf6R÷W÷&V6—6–öâöF—&V7B6öçG&öÆÆW"À¥Væ6–ÂvFRæBF‡&÷Vv‚fÆÆ&6²âæòæWrvVöÖWG'’Â†—7F÷'’÷"vW7GW&R÷væW"æVVFVBà¤6öæf—&ÖVB&Vw&W76–öã¢çVÖW&–2W†7BF—7F6†W2&W6W'fVB7–çF†WF–2ö–çFW#“ƒsbÂ'W@¦÷&–v–æÂö–çFW&F÷vâäB&Vv–äF—&V7DG&r6ÆÂæF—fR6WEö–çFW$6GW&Rf÷"—Bâ'&÷w6W'0§&V¦V7BF†—2æöæW†—7FVçBæF—fRö–çFW"v—F‚æ÷Df÷VæDW'&÷"âWfVçEF&vWB&W÷'G2†æFÆW ¦W†6WF–öç2æB6öçF–çVW2F—7F6ƒ²&Vv–â†BÇ&VG’6WBG&rÂÆVf–ærVæF–ær&W70¦Æ—fRFöòâö–çFW'W6ÆV'2VæF–ær&W72f—'7BÂÆVf–ærG&r6WC²÷WF†VâF—6&ÆW0¤W†7Bö–çWBôFöæR–æFVf–æ—FVÇ’âV&Æ–W"FW7G2W6VBæòÖ÷6GW&R7GV"æBÖ—76VB—Bà ¤öæÇ’'VçF–ÖR6†ævS¢÷&–v–æÂ×VÇF’Öf6RÖF—&V7B6GW&R†VÇW"6¶—2&W6W'fVBçVÖW&–0§ö–çFW#“ƒsbBÆÂF‡&VRW†—7F–ær6GW&R6—FW2â‡—6–6Â6öçF7G2&WF–âæF—fR6GW&RÀ¦÷&–v–æÂv–æF÷rÖ6GW&R6ö×ÆWF–öâÂFVÆ–&W&FRÖG&rF‡&W6†öÆBÂ6VÆV7F–öâÂ–æfW&Væ6RÀ¦vVöÖWG'’÷F÷öÆöw’÷&VgW6ÂõF‡&÷Vv‚6fWG’æB†—7F÷'’âW†7B7F–ÆÂ'Vç2÷&–v–æÀ¦6öçG&öÆÆW"æB6VÖçF–26öÖÖ—B6¶æ÷vÆVFvVÖVçC²æòæWrçVÖW&–2ÖöFVÆÆ–ær¶W&æVÂà¥÷WæB&V6—6–öâ6öFRVæ6†ævVBâ6†VÆÂöF—&V7B÷&V6÷fW'’¶W—3““2&Wf–WvVC²æòG–æÖ–0¦6†–ÆB6†ævW2â&÷FV7FVB×VÇF“ãÂÖ–âÂ66WFVB–6öç2ôf6Vw&÷Wõ–çBõUbög&÷¦VâVæ6†ævVBà ¥FW7B†VÇW"æ÷r÷F–öæÆÇ’ÖöFVÇ2'&÷w6W"6GW&R&V¦V7F–öâæBWfVçEF&vWBW†6WF–öà¦6öçF–çVF–öã²FVfVÇBf—‡GW&W27F–ÆÂF‡&÷rVæW‡V7FVBÆ—7FVæW"f–ÇW&W2â&Vf÷&R'VçF–ÖP§&W—"ÂæWrFW7G2&W&öGV6VBfÇ6RW†7B7V66W72&W7VÇBæB7G&æFVBG&vv–ær7FFRà¤gFW"&W—#¢&WVFVBW‡G'VFRô–ç6WBW†7BÂ6fR&VgW6ÂF†VâfÆ–B&WG'’Âæò7–çF†WF–0¦6GW&RöæòÆ—7FVæW"W'&÷'2öæòVæF–ærG&rÂ7GVÂ÷WÇ’ôFöæRÆ–fV7–6ÆRÂöæR†—7F÷'§7FWW"7V66W72æBVæFõ&VFò72â‡—6–6Â6GW&Rö6öÖÖ—Bö6æ6VÂ&WF–æVBâf–æÃ“¦fö7W6VB52ód”Âó6¶—‡ãRã'2’Â–æ6ÇVF–ær÷&–v–æÂf6R÷&WVB÷÷Wö6ÖW&õF‡&÷Vv‚ð¦æVvF—fRÖW‡G'VFR÷&VÆV6RFW7G3²7–çF‚öF–fb6†V6·272âæògVÆÂ×7V—FR÷"æF—fR&ööb6Æ–ÖVBà ¥6W&FS““"&VæFW&–ær&V7W'&Væ6RCS£3“£U£¢W6W"ö'6W'fVB&–v‡ET’Ö—76–ærv—F‚6çf0¦†–FFVâCCsC3‚ÂF†Vâ&W7F÷&VB6çf3SS#2âæF—fRd”Ur÷Vã3CS3"†B&÷VæG3““‚ócbó3cð£ƒã“ƒBæC“ƒ‚67&öÆÂ6öçFVçC²6Æ÷6VBæVÂ—2F—7Æ–æöæR÷¦W&ò&÷VæG2âFööÆ&"Æ–÷WBð¦†—G2†VÇF‡“²v—¦Öò&W6VçC“gƒ“bCsS"ãsRóCC2ã#3Bâ7GVF–ò÷fW&Æ’÷6—G“âw&÷WÖÆ—7@¦÷F–öä6÷VçB÷6VÆV7FVD–æFW‚çVÆÂ—2W‡V7FVBf÷#““"D•bÆ—7BÂæ÷BæF—fR×6VÆV7Bf–ÇW&Rà¤æò7GVÂ67&VVç6†÷BöffV7FVB&Vv–öâ–FVçF–f–VB–âF†—2&W÷'C²Fòæ÷B–æfW"æWp§&VæFW&–ær6W6R÷"wV&çFVVB†–FS4B&V6÷fW'’â–çFW&Ö—GFVçB&–v‡B×&Vv–öâf—6–&–Æ—G§&VÖ–ç2õTã²æò&VæFW&–ær6†ævW2–ã““2ã““"Æ—7BFWf–6R66WFæ6R7F–ÆÂVæF–æs°£““52&WF–æVBâf6Vw&÷W×6VÒUböÖFW&–Âv÷&²&VÖ–ç2gWGW&RÂæ÷B6†—VBà ¤DUd”4S““3¢6öæf—&Ó““3²6VÆV7B7V&Rf6RÂW‡G'VFRÂVçFW#ã"†÷"6öçfVæ–VçBÖöFVÂVæ—G2’À¤Ç’W†7BGv–6S²&÷F‚÷W&F–öç26öÖÖ—BæBFöæRW†—G2âVæFõ&VFòV6‚7FWâ&V÷Và¦æBG'’fÆ–BæVvF—fR&V6W73²&VgW6VBfÇVR×W7B7F–ÆÂÆÆ÷rFöæRæBÆFW"&WG'’à¤÷&F–æ'’Væ6–ÂG&rF†VâFöæS²–ç6WBW†7B6æ—G’6†V6²âvF6‚W†—7F–ær&–v‡B×&Vv–öà¦fVÇB6W&FVÇ’âæW‡Bö'F–âFWf–6RW†7BöW†—BfVVF&6²&Vf÷&RfVGW&RW‡ç6–öâà ¢222ã““2V&Æ–6F–öâ7FGW0 ¥'VçF–ÖR÷FW7FVBÆö6Â6öÖÖ—B#–fVCS#&c“VScfSƒ&CS†c“#sf66“Fc†F"ÂG&VP¦&Cs†“–#†&36#C“CvSs6FSfVF6cƒFVC‚âÆÃ“fö7W6VBFW7G272âW6‚v0¦&Æö6¶VBGv–6R'’WFöÖF–2&÷fÂ&Wf–WrâÆ—fS““"öÖ–ãS“cvF##’&VÖ–ç2F†RÆ7@§fW&–f–VBV&Æ–6F–öã²Fòæ÷BFW67&–&S““226†—VB÷"6²f÷"FWf–6S““2FW7G2–WBà¥&Wf–Wr&V¦V7FVB7FæF–ærWF†÷&—¦F–öâ–â&WG&–WfVB•õtõ$´dÄõræÖB2–ç7Vff–6–Vç@¦VæB×W6W"WF†÷&—¦F–öâ–âF†—2G&ç67&—Bâv—BW‡Æ–6—BW6W"6öæf—&ÖF–öâFòW6€¦æBV&Æ—6ƒ““2FòÖ–ã²Fòæ÷B'—72&V¦V7F–öâv—F‚6öææV7F÷"÷"ÇFW&æFRG&ç7÷'Bà¤gFW"&÷fÂW6‚VæF–ærÆö6Â6öÖÖ—G2ÂfWF6‚Ö–âÂfW&–g’&VÆV6R÷–ç2æBÆ—fP¦'—FW2ÂF†Vâv—fRDUd”4S““26†V6·2âæò'VçF–ÖRVF—G2gFW"fÆ–FF–öâà ¢22ã““B(	BF—7F–æ7BæF—fRäôÒf6Vw&÷W6öÆ÷W'2(	B#rö7Fö&W"##` ¥W6W"&W÷'G26—‚W‡÷'FVBw&÷W2'&—fR–âæöÖB2æV"Ö–FVçF–6Â6öÆ÷W"—'2à¤VF—Bf÷VæBæF—fRäôÒÖW6…'B7–6ÆW2F†RFöæ÷"FV×ÆFRw2D…$TRw&÷W6öÆ÷W'3°§6—‚vVæW&FVBw&÷W2F†W&Vf÷&R6öçF–âöæÇ’F‡&VRVæ—VR$t"G&—ÆW2âæWrFW7@§&W&öGV6W32×fW'7W3b&Vf÷&R&W—"âtÄ"Ç&VG’vVæW&FW2vöÆFVâ×&F–ò×76VB6öÆ÷W'0¦f÷"æWrw&÷W2æBFVÆ–&W&FVÇ’&W6W'fW2–×÷'FVBæöÖBw&÷W6öÆ÷W'3²Væ6†ævVBà ¤æF—fRäôÒæ÷r&WW6W2W†—7F–ærf6Tw&÷WÆWGFS““"f÷"ÆÂW‡÷'FVBæÖVBw&÷W2À§W6–ær÷&–v–æÂW‡÷'FVBf6R÷&FW"öæÖW2ÂFVfVÇB76VBÆWGFRæBÆ–æV"$t"à¤æòæWrÆWGFRÆv÷&—F†ÒâF†—2—2f6Vw&÷WF—7Æ’ÖWFFFÂæ÷B–çBÂfW'FW€¦6öÆ÷W"ÂÖFW&–Â÷"FW‡GW&R76–væÖVçBâw&÷W”G2öæÖW2ö&÷VæF&–W2ÂvVÆFVBvVöÖWG'’À¥Ug2Â%"Ö2ÂFöæ÷"FV×ÆFR'—FW2Â6÷W&6RÖW6‚æB†—7F÷'’&VÖ–âVæ6†ævVBâæF—fP§VææÖVBf6W27F–ÆÂÖFò÷&–v–æÂÖ–âw&÷WâFöW2æ÷B&öÖ—6Rd”Ur7W7FöÒÆWGFRð§&W6VVBf–FVÆ—G’÷"6†ævR&W6W'fVBtÄ"6öÆ÷W'2â'VçF–ÖR6†ævRôäÅ’æF—fRW‡÷'FW#°§6¶VBÖÖ÷æVÂôÆ"f–ÆW26†ævRÆöFW"–ç2öæÇ’Fò&Vg&W6‚F†R÷&–v–æÂw&‚à¥&Wf–WvVC““B6†VÆÂ÷&V6÷fW'’÷æVÂ÷6¶VBö6÷&RôÆ"¶W—2æB6†&VBÆWGFS““"&VfW&Væ6Rà¤×VÇF“ãöÖ–âö66WFVC““"Æ—7Bó““2W†7Bög&÷¦Vâ'—FW2Væ6†ævVBà ¥fÆ–FF–öã3’fö7W6VB52ód”Âó6¶—‡ã’ãg2“¢æF—fRäôÒõUbö6öÆ÷W"öæ÷&ÖÂöVÖ—76—fRð§66Æ"÷6¶VBöF—7Æ6VÖVçBöW‡÷'BFW7G2Ã““"7vF6‚Æ—7BÃ““2W†7BæB&VÆV6R6öçG&7G2à¥6—‚æÖVB7V&Rw&÷W2æ÷r†fR6—‚FWFW&Ö–æ—7F–2$t"G&—ÆW2v—F‚ÆÂ—'v—6R$t ¦F—7Fæ6W3âã#²ÆÂ6—‚f6R×FòÖw&÷W”G2æB6÷W&6RÖW6‚&WF–æVBâW†—7F–ær&–æ'’ð§FW‡GW&Röw&÷W&÷VæB×G&—FW7G272â7–çF‚öF–fb6ÆVââæòæF—fRæöÖB÷"gVÆÂ×7V—FP§&ööb6Æ–ÖVBâ–çFW&Ö—GFVçB&–v‡B×&Vv–öâ&VæFW&–ær&VÖ–ç2õTâÂVç&VÆFVBFòF†—2f—‚à ¤Äô4ÂôäÅ“¢–æ6ÇVFW2VæF–æs““2W†7B&W—"âV&Æ–6F–öâ&VÖ–ç2&Æö6¶VB'’F†P§&–÷"WFöÖF–2&÷fÂ&Wf–Ws²æòGFV×BFò'—72÷"&WW6‚âv—BW‡Æ–6—BW6W ¦6öæf—&ÖF–öâFòW6‚÷V&Æ—6ƒ““BFò6†&VBÖ–âöÆ—fRâÆ—fS““"—2Æ7BfW&–f–VBà¤gFW"&÷fÂÂV&Æ—6‚VæF–ærÆö6Â6öÖÖ—G2æBfW&–g’&VÖ÷FR6†VÆÂ÷–ç2öÆ—fR'—FW2à¤DUd”4S““BeDU"T$Ä”4D”ôã¢æF—fRäôÒW‡÷'Böb6—‚F–ffW&VçFÇ’æÖVBf6Vw&÷W3°¦÷VâæöÖBæBVæ&ÆRf6Vw&÷WF—7Æ’ÂfW&–g’6—‚F—7F–æ7B6öÆ÷W'2æB6—‚6÷'&V7@§&Vv–öç2öæÖW3²vVöÖWG'’÷FW‡GW&RV&æ6R–çF7Bâ&WFW7C““2W†7BGv–6RôFöæRõVæFõ&VFòà¤–bW6W"w27GVÂW‡÷'Bv2tÄ"÷"ô$¢Â6²f÷"f÷&ÖBöf–ÆS²æF—fRFöæ÷"Ö7–6ÆRFVfV7@¦—26öæf—&ÖVBÂ'WBFòæ÷B6Æ–Ò—BF–væ÷6W2WfW'’f÷&ÖBw26–Ö–Æ"Ö6öÆ÷W"&V†f–÷"à ¢227FæF–ærV&Æ–6F–öâ&÷fÂ(	B&Vff—&ÖVB#rö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’7FFW2–âF†—2FWfVÆ÷ÖVçB6†C¢(	Ä&÷fÂ—2Åt•2v—fVâÒw&—FP§F†B–çFòF†R†æF÷fW"æ÷FW2î(	ÒF†—2&Vff—&×27FæF–ærWF†÷&—¦F–öâf÷"&÷„Æ ¦6öÖÖ—G2ÂW6†W2F—&V7FÇ’FòÖ–âÂæBv—D‡V"vW2V&Æ–6F–öâÂ–æ6ÇVF–ærVæF–æp¦'V–ÆC““BæB—G3““2W†7B&W—"â6ö×ÆWFRfÆ–FF–öâÂ6öÖÖ—B÷W6‚æBfW&–g’&VÆV6P¦Ö&¶W'2öÆ—fR76WG2v—F†÷WB6¶–ærf÷"V&Æ—6†–ær&÷fÂv–ââWF†÷&—¦F–öâ—0¦f÷"&÷„Æ"FWfVÆ÷ÖVçC²Vç&VÆFVBW‡FW&æÂ7F–öç2&R÷WG6–FRF†—266÷Rà¥F†RV&Æ–W#““2ó““B&÷fÂÖ&Æö6²æ÷FW2&VÆ÷r&R†—7F÷&–6ÂæB7WW'6VFVB'’F†—0¦W‡Æ–6—BW6W"6öæf—&ÖF–öââF†W’&Ræ÷B6öçF–çV–ær&WV—&VÖVçBFò6²v–âà¤–bgWGW&RWFöÖF–2&Wf–Wr7F–ÆÂ&Æö6·2V&Æ–6F–öâÂ&W÷'B—G27GVÂ&V6öã°¦Fòæ÷BÖ—77FFRF†RW6W"w27FæF–ærWF†÷&—¦F–öâ÷"'—72&V¦V7F–öâà ¤7W'&VçBFVÆ—fW'“£““B'VçF–ÖSƒ“f2–æ6ÇVFW2æF—fRäôÒF—7F–æ7Bw&÷W6öÆ÷W'2æ@£““2f6RW†7B6GW&R&W—"ã“fö7W6VC““26†V6·2æC3’fö7W6VC““B6†V6·276VC°§F†W6R÷fW&Æ–ær6WG2&Ræ÷B6öÖ&–æVBF—7F–æ7BFW7B6÷VçBâFWf–6R66WFæ6R—0§VæF–ærâ–çFW&Ö—GFVçB&–v‡B×&Vv–öâ&VæFW&–ær&VÖ–ç2õTââV&Æ—6‚VæF–ær6öÖÖ—G2À§fW&–g’7W'&VçBÖ–âæBÆ—fRfW'6–öâö–æFW‚öF—&V7BöW‡÷'B÷6¶VBö6÷&R÷ÆWGFR76WG2À§F†Vâ&÷f–FR6†÷'BDUd”4S““BæBDUd”4S““2†æG2Ööâ6†V6·2à ¢22ã““BV&Æ–6F–öâfW&–f–VB(	B#rö7Fö&W"##` ¥V&Æ—6†VB'VçF–ÖR3VF#&SSfC&sC#S“cCs&#FVfCSsf–CSÂG&VP¦CCcF#–ScsSf3“Cs3&fff–c&sF#‚ÂW†7FÇ’ÖF6†W2FW7FVB÷WÆöFVBÆö6À¦6#“s3“‚G&VRâÆÃr6†ævVB&Æö'2fW&–f–VB&Vf÷&RFöÖ–2æöâÖf÷&6VBÖ–âWFFRà¤fWF6†VB÷&–v–âöÖ–â6öæf—&×2'VçF–ÖR6öÖÖ—B÷G&VRâvW3CCSƒs#3c3’6ö×ÆWFVB5T44U52à¤ÆÃg&W6‚Æ—fR6†V6·2'—FRÖÖF6ƒ¢fW'6–öâæ§6öâÆ–æFW‚æ‡FÖÂÆ×VÇF’Öf6RÖF—&V7BÀ¦æöÖBÖW‡÷'BÖ6÷&RÆæöÖB×6¶VBÖÖ2ÆW‡÷'BÖ2×æVÂÆf6Vw&÷WÖ6öÆ÷W'2Ö6÷&RÄÆ"ÆöFW"À¤•ô„äDôdbæÖBæB•õtõ$´dÄõræÖBâ6WfVâf–æÂ&VÆV6R6†V6·272â†÷7FVBgVÆÀ¥F÷öÆöw“CCSƒs#SSSRv2–â&öw&W72v†Vâ6†V6¶VC²æò†÷7FVBgVÆÂ×7V—FR526Æ–ÖVBà¤æò'VçF–ÖR6†ævW2gFW"fö7W6VBfÆ–FF–öââF†—2V&Æ–6F–öâ&ööb—2Fö72ÖöæÇ’à¥W6W"7FæF–ær&÷fÂ—2&Vff—&ÖVB–âD„•26†BæB•õtõ$´dÄõrô•ô„äDôdc²æð¦gW'F†W"V&Æ–6F–öâW&Ö—76–öâVW7F–öâf÷"&÷„Æ"â†—7F÷&–6ÂÄô4ÂôäÅ’ö&÷fÀ¦&Æö6²VçG&–W2&R7WW'6VFVBâ'V–ÆC““B—2Ä•dRæB$TE’dõ"DU5D”ärÂ–æ6ÇVFW3““2à¤DUd”4S““C¢æF—fRäôÒ6—‚æÖVBw&÷W2†fR6—‚F—7F–æ7B6öÆ÷W'2ö6÷'&V7B&Vv–öç3°§FW‡GW&W2Væ6†ævVBâDUd”4S““3¢f6RÇ’W†7BGv–6RÂFöæRÂVæFõ&VFó²–ç6WBW†7@¦æB÷&F–æ'’Væ6–ÂG&r6æ—G’ã““"f6Vw&÷WÆ—7B66WFæ6R7F–ÆÂVæF–æs³““50§&÷FV7FVBâ&V7W'&–ær&–v‡B×&Vv–öâ&VæFW&–ær&VÖ–ç2õTââæW‡B7BöâFWf–6RfVVF&6²à ¢22ã““R(	Bd4Tu$õUf6R&F–ÂæBDB³²ã““BW6W"52(	B#rö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’56W3““C²&÷FV7BæF—fRäôÒF—7F–æ7Bw&÷W6öÆ÷W'2æC““2W†7@¤W‡G'VFRô–ç6WB6GW&RôFöæRõVæFõ&VFò&W—"âW6W"6·2f6R&F–Âd4Tu$õUv—F€¦Æ–æWv÷&²7V&R÷&VBÖw&VVâ×–VÆÆ÷rf6W2ÂWFöÖF–2f6Vw&÷W2Æöö²Â÷&–v–æÂÆVgBÆ—7BÀ¦æBDB²çVÖ&W&VBæWrw&÷W2âW†—7F–ærFö6²÷7G&ö¶RöWF†÷&–ær÷ÆWGFR&VÖ–â÷væW'2à ¤f6R&F–Âæ÷r†3#BFööÇ2âd4Tu$õU&WW6W2÷&–v–æÂ6f6Vw&÷W÷Vå–çBF&vW@¦f÷"–çfVçF÷'’'WBÆVæ6†W2÷&–v–æÂFö6²4TÔåD”4ÄÅ’†æò†–FFVâd”Ur'WGFöâ6Æ–6²’à¤—B6VÆV7G2÷&–v–æÂf6Vw&÷W2Æöö²Â6Æ÷6W2d”UræB÷Vç26ÖRÆVgBFö6²öæÖRöÆ—7Bð¥–çBôW&6R÷6VÆV7FVBÖf6RæöFW2â÷&–v–æÂWF†÷&–ærVF—F&ÆR×F&vWBvFR—26†&V@§v—F‚76–vâÂæ÷B6÷–VC²Æö6¶VB÷&VfW&Væ6RöÆ–æ¶VBöÆ—fRÖÖöF–f–W"÷FööÂ×6W76–öâö7F—fRÐ¦G&rF&vWG2&VgW6RâFöæR7F÷2''W6‚Â&·26öçG&öÇ2æBVÖ—G2÷&–v–æÂf6R‡V ¦6ö×ÆWF–öâöæ6S²æ÷F†W"&F–ÂFööÂ÷"ÖöFR÷6W76–öâ6†ævR6Æ÷6W2F†RFö6²à ¤ÆÃ#2&RÖW†—7F–ærf6RF&vWG2ÂÆ&VÇ2Â–6öç2ÂævÆW2÷&F–’æB7&÷72ÖÖöFR6†&V@§Æ6VÖVçG2&VÖ–âU„5DÅ’Væ6†ævVBâd4Tu$õUf—G2&WGvVVâ÷&–v–æÂ&–æw2C33+ð§#c‚v—FƒsGƒcF&vWBæB÷&–v–æÃ3'‚–6öâ÷6ÖÆÂF—FÆRf÷&ÖBâF‡&VR5dr7V&Rf6W0§&VBöw&VVâ÷–VÆÆ÷rv—F‚Æ–v‡BÆ–æWv÷&²âæWr'WGFöâ†2æò&÷VæG2÷fW&Æv—F‚ç’öÆ@¦'WGFöââb×6V7F÷"÷WFW"&VfÆ÷rv26öç6–FW&VB'WB&V¦V7FVB&V6W6R—BF—7Æ6V@§6†&VB7&÷72ÖÖöFR6Æ÷G3²æ÷B6†—VBâæòVç&VÆFVB–6öâ&W6¶–â÷"ö–çFW"÷væW"à ¤DB²–6·2Væ—VRw&÷WâÂ–æ7&VÖVçF–ær7B7W'&VçBöW†—7F–æröG&gBçVÖ&W'3²FG0§6fR6öÆ÷W"öæÖR&÷ræB&×2÷&–v–æÂ–çBâFöW2äõB–ÖÖVF–FVÇ’&V76–vâ7W'&Vç@§6VÆV7F–öâ÷"7&VFR†—7F÷'’âV×G’w&÷W2&RT’G&gG266÷VB'’7GVÂö&¦V7@¦–FVçF—G’–âvV´ÖÂ7W'f—f–ærFö6²6Æ÷6R÷&V÷Vâöö&¦V7B7v—F6†W2–âF†—26W76–öâà¥F†W’&R6fVBöW‡÷'FVBôäÅ’gFW"–çF–ær÷"76–vâ6VÆV7FVBF‡&÷Vv‚W†—7F–æp¦f6Tw&÷W2ÖWFFFâT’W‡Æ–6—FÇ’6—2–çBö76–vâFò6fS²æòæWr&ö¦V7B66†VÖà¥&VÆöB÷&ö¦V7B&WÆ6VÖVçBG&÷2VçW6VBG&gG2â76–væVBw&÷W2&WF–â÷&–v–æÀ§ÆWGFS²G&gG2&Wf–Wr7V'6WVVçB76VB6öÆ÷W'2f–4ÔRÆWGFR†VÇW"â–çF–æp¦÷WBöbG&gB÷&FW"&Vg&W6†W27vF6†W2Fò7GVÂÖW6‚Ö÷&FW"6öÆ÷W'2†æ÷Bf—†V@§W6W"Ö6†÷6Vâw&÷W6öÆ÷W'2’âÆWGFR÷&W6VVB6öçG&öÇ2&VÖ–â–âd”Urâ6fRæÖW2æ@¦–çFVvW"ÖÆ–Ö—BçVÖ&W&–ærFW7FVC²æò…DÔÂ–ç6W'F–öâöÖöFVÂõUböÖFW&–Â÷–çB6†ævW2à ¥fÆ–FF–öãcRF&vWFVB52ód”Âó6¶—‡ããw2’Â–æ6ÇVF–æs‚æWrG&gB÷&VÂÖ6öçG&öÂð§6VÖçF–2&F–Â÷&VÂFö6²FöæRFW7G2ÂÆÂW†—7F–ærf6Vw&÷WFF÷ÆWGFRö''W6‚ð¦W&6W"öWF†÷&–ær÷6VÆV7F÷"öFö6²Â&F–ÂÖöFW2÷6†&VB÷6—F–öç2Â66WFVC““BW†7Bð¤äôÒÂæB&Wf–WvVB&VÆV6R6öçG&7G2âÆÃ#BVÖ&VFFVBf6R5dw2'6S²7–çF‚æ@¦F–fb6ÆVââW†—7F–æss’f6R6÷VçC#>(i##B—26öÆR&F–Â6öçG&7BW‡ç6–öã²÷&–v–æÀ¦÷WFW#\9s#L+æB6†&VBVFvRõfW'FW‚6Æ÷G27F’&÷FV7FVBâ–6¶W"öFö6²f—‡GW&W2FFV@§FòF†R÷&–v–æÂ6†&VB÷Vâ÷væW"æBG&gBFFW"v—F†÷WBG&÷–ær6÷W&6R÷6VÆV7F–öâð§&VgW6Â6†V6·2âæògVÆÂ×7V—FR÷&VæFW&VBÖ'&÷w6W"öæF—fR•B&ööb6Æ–ÖVBà ¤6†ævVB'VçF–ÖS¢÷&–v–æÂ&VæFW"ÖÖöFW2Â6ÖÆÂG&gG2†VÇW"Â÷&–v–æÂÆ—7BæB6†&V@¦VF—F&ÆRÖWF†÷&–ærvFS²7G&ö¶R6†ævW2–×÷'B–âôäÅ’âF÷FÂv—¦Öò6†ævW2öæP¦'WGFöâöf–Æ&–Æ—G’÷6VÖçF–2ÆVæ6‚ö6ö×ÆWF–öââ&Wf–WvVB6†VÆÂ÷&VæFW"÷7G&ö¶RöWF†÷"ð¦Æ—7BöG&gG2öv—¦Öòö–6öâ÷&V6÷fW'“““R66†R6Æ÷7W&Râf6Vw&÷WÆWGFS““"æBæF—fRäôÓ““BÀ£““2W†7BÂÖ–âô×VÇF“ãõUbõ–çBövVöÖWG'’ög&÷¦Vâ'—FW2Væ6†ævVBà ¥&–v‡BÖ†æB&VæFW&–ær—77VR7F—2õTââ&Wf–WvVBÆFW7C““"6GW&S¢d”UræF—fR÷Vâð¦6Æ÷6RæBW‡Æ–6—B¦W&ò×6—¦VB6Æ÷6VBæVÂv÷&³²6çf2†–FRF–Bæ÷B&W7F÷&R&–v‡ET“°§7G–ÆW2ö†—B7F6·26ææ÷BW7F&Æ—6‚f—6–&ÆR—†VÇ2âF†—2'V–ÆBFG2F—&V7BÄTeBFö6°¦66W72'WBDôU2äõB6Æ–Ò6ö×÷6—F÷"÷&–v‡BÖÖVçR&W—"â&WF–âW†—7F–ærF–væ÷7F–70¦æBW6W"f–ÆR&Vg&W6‚F—7Æ“²Fòæ÷B&WVB&÷fVâÖ–ç7Vff–6–VçB&ÇW"ö6Æ÷6VBÖFWF–Ç2ð¦6çf2ÖöæÇ’W‡ÆæF–öç2÷"f÷&6Ræ÷F†W"–FVçF–6ÂGV×âgW'F†W"&VæFW&–ærv÷&°§&WV—&W2f—6–&ÆRffV7FVB&Vv–öâ÷7G'V7GW&Â&W&öGV7F–öâÂæ÷B7V7VÆF—fR5526‡W&âà ¤7W'&VçB'VçF–ÖR÷V&Æ–6F–öâWf–FVæ6RÆ—fW2–âFö72÷V&Æ–6F–öâÓ““RæÖB†6öÖÖ—B÷G&VRÀ¥vW2öÆ—fR6†V6·2æB†÷7FVB7FGW2“²6öç7VÇB—B&Vf÷&RFW67&–&–ærV&Æ–6F–öâà¥7FæF–ærW6W"W6‚÷V&Æ—6‚&÷fÂ&VÖ–ç27F—fS²Fòæ÷B6²v–âà¤DUd”4S““S¢f6R6VÆV7N(i'&F–Âd4Tu$õU7V&S²WFòf6Vw&÷W2Æöö²²÷&–v–æÂÄTe@¦Æ—7BâDB²GvòæWrçVÖ&W&VB&÷w2öF–ffW&VçB7vF6†W2Â–çBV6‚öW&6S²VæFõ&VFòöæP§7FWW"7G&ö¶RâFöæ^(i'&F–Âv–ã²÷&F–æ'’f6RW†7BæBf–ævW"æf–vF–öâà¥6fT÷Vâ–çFVBw&÷W3²VçW6VBG&gG2&R–çFVçF–öæÆÇ’æ÷B6fVBâvF6‚&–v‡Bd”Up¦ÖVçR6W&FVÇ“²–b&V7W'&Væ6RÂ67&VVç6†÷Bö–FVçF–g’f—6–&ÆR&VÂæòf÷&6VB&V7&VF–öâà¤æW‡BföÆÆ÷ræF—fS““RfVVF&6³²f6Vw&÷W×6VÒUböÖFW&–Âv÷&²&VÖ–ç2FVfW'&VBà ¢22ã““b(	Bf–ÆRÖVçR'&ævVÖVçBg&öÒW6W"–ÖvR(	B#rö7Fö&W"##` ¥W6W"&WVW7G2f–ÆRÖVçR÷&FW"öf÷&ÖBg&öÒGF6†VB”Ôuóƒ33’çærâVF—FVB7W'&Vç@¦Ö–ãCFF##–b÷'VçF–ÖS““RÂW†—7F–ær6†VÆÂôf–ÆRöW‡÷'B÷&ö¦V7BöFV'Vr–ç7FÆÆW'2æ@§f–Ww÷'BÖ6öçF–æVBÖVçR7G–ÆW2âæó““R52–æfW'&VC³““B52&VÖ–ç2&÷FV7FVBà ¤f–ÆRÖVçRæ÷r†2f÷W"6VÖçF–26V7F–öç2–â&WVW7FVB÷&FW#¢÷&–v–æÂ÷Vâæ&÷†Æ ¦g&öÒf–ÆW2æB6fRæ&÷†Æ#²–×÷'B„VF—F&ÆRõ&VfW&Væ6RÂ7Æ—Bw&÷W2Â–×÷'B“°¤W‡÷'B†f–ÆVæÖRÂf÷&ÖBô$¢ôtÄ"ÂvVöÖWG'’&6Rõ7V$BÂW‡÷'Bõ6fRÂäôÔB“²WF–Æ—F–W0¢„†öÖR67&VVâÂ&W6WBÂT’FV'VrÂ&Vg&W6‚F—7Æ’Â6†V6²&ö¦V7B6æ6†÷B’â6†VÆÀ§7WÆ–W2æÖVB6Æ÷G3²÷&–v–æÂ&ö¦V7BöFV'Vr–ç7FÆÆW'2VæB4ÔR÷&–v–æÂ'WGFöç2À¦–çWG2÷7FGW2æöFW2öÆ—7FVæW'2F†W&Rv—F‚W†—7F–ærÖ†÷7BfÆÆ&6·2âæò6Æöæ–ærÂ6V6öæ@¦ÖVçRö†æFÆW"Âö'6W'fW'2Â¶W–&ö&B÷F"Ö÷&FW"552G&–6·2÷"æWr6fRöW‡÷'B÷væW'2à¤÷&–v–æÂV–6²ô$¢æBÆ"Æ–æ²æöFW2&VÖ–â†–FFVâf÷"ÆVv7’÷væW'3²GWÆ–6FP¥V–6²ô$¢ôÆ"VçG'’—2öÖ—GFVBg&öÒf—6–&ÆR&WVW7FVBÖVçRà ¥66÷VBf–ÆRÖÖVçRæ772v—fW26öç6—7FVçB6V7F–öâ'VÆW2öv2÷WW&66R†VF–æw2Ã3#€§f–Ww÷'BÖ&÷VæFVBv–GF‚Ã3g‚7F–öâF&vWG2Ã3'‚6VvÖVçFVB6öçG&öÇ2ÂÆ–væVBf–ÆVæÖP¦f–VÆBæB&VF&ÆS'‚FW‡BâÖ‚Ö†V–v‡BG&6·2÷&–v–æÂF÷&"÷6fR&V²fW'F–6À§67&öÆÂ÷F÷V6‚×âö÷fW'67&öÆÂ6öçF–æÖVçB&VÖ–ââ†–FFVâGG&–'WFW2†öæ÷&VC²V×G§6Æ÷G2÷7FGW2Fòæ÷BÆVfRv2âæòæWr&ÇW"öf–ÇFW"÷G&ç6f÷&Òö6öçF–âö6ö×÷6—F÷"†–çBà¤÷F†W"T’7G–ÆW2Væ6†ævVBâF†—2FöW2æ÷B&W—"&V7W'&–ær&–v‡B×&Vv–öâ&VæFW&–ærà ¥'VçF–ÖR6†ævW2öæÇ’6†VÆÂöÆ–÷WB7G–ÆW6†VWBæB÷&–v–æÂö&¦V7BÖÖævVÖVçBöFV'Vp¦–ç7FÆÆW"FW7F–æF–öç2â&ö¦V7B6öFV2ö†—7F÷'’÷6fRö÷VâövVöÖWG'’÷6VÆV7F–öâÂW‡÷'Bð¤äôÒ÷–çBõUbó““Rf6Vw&÷Wó““2W†7Bô×VÇF“ãög&÷¦VâVæ6†ævVBâ&Wf–WvVC““b6†VÆÂöæWp¤552÷&ö¦V7BÖ–ç7FÆÆW"öFV'Vr÷&V6÷fW'’–ç2æB76WB†6†W3²–çFW&æÂ7F×2&WF–æVBà¤ÆÂ÷&–v–æÂf–ÆR7F–öâö–çWB”G2&WF–æVBöæ6Râ…DÔÂ6V7F–öç2ö÷&FW"÷Væ—VR”G0¦6†V6¶VBâW†—7F–æsSÖVçR–çWBö6öæf–röæÖRöÆ–÷WB÷FööÆ&"÷&ö¦V7B÷VâôtÄ"÷–çBð¦F—7Æ’×&Vg&W6‚÷&VÆV6R6†V6·252ód”Âó6¶—‡ãã'2“²¥27–çF‚öF–fb6ÆVââæð¦æWr6÷6ÖWF–2FW7G2÷"gVÆÂ×7V—FRöæF—fR&VæFW&VB&ööb6Æ–ÖVBâV&Æ–6F–öâ6öÖÖ—Bð§G&VRöÆ—fRWf–FVæ6R—2&V6÷&FVB–âFö72÷V&Æ–6F–öâÓ““bæÖB&Vf÷&R6ö×ÆWF–öâà ¤DUd”4S““c¢f–ÆR6†÷w2÷Vâõ6fRf—'7BÂF†Vâ–×÷'BôW‡÷'B÷WF–Æ—F–W22–ÖvS²76–ærÀ¦f–ÆVæÖR÷6VvÖVçFVB6öçG&öÇ2&VF&ÆRâ67&öÆÂFò&÷GFöÒ–âÆæG66RæB÷'G&—Bà¥6fRô÷VâFW7Bæ&÷†Æ#²–×÷'BöW‡÷'BæBäôÔB÷&–v–æÂ7F–öç3²&Vg&W6‚F—7Æ§7F–ÆÂf–Æ&ÆRâFòæ÷B&W6WBv÷&¶–ærÖöFVÂFòFW7B7G–Æ–ærâ&–v‡BÖÖVçR&VæFW&–æp§&VÖ–ç2õTã³““Rf6Vw&÷WFWf–6R66WFæ6R7F–ÆÂVæF–ærâ7FæF–ærV&Æ–6F–öà¦&÷fÂ&WF–æVBâæW‡BföÆÆ÷s““bÖVçRö•B76–æræC““RFööÂfVVF&6²à ¢22ã““r(	BW‡FW&æÂ÷&–v–æÂd”Ur7W&f6S²ã““bW6W"52(	B#rö7Fö&W"##` ¥W6W#““b52&÷FV7G2'&ævVBf–ÆRÖVçRÂ÷&–v–æÂ7F–öç2æB76–ærâW6W"æ÷p¦–FVçF–f–W2ffV7FVB7W&f6R&V6—6VÇ“¢d”Ur÷WFW"g&ÖRFövvÆW2'WB—G26öçFVçG0¦æWfW"G&râ&W÷'C““bCs£C£e¢6†÷w2÷VãC3#ƒ’óCs#SRÂ6Æ÷6VCCS32óSC“srâ÷Và§æVÃ““‚ócbó3cóƒã“ƒBÇ67&öÆÄ†V–v‡C“ƒö6Æ–VçD†V–v‡Cƒ²7GVÂ6GW&F–öâöÆ–v‡FæW72ð§&W6WB6öçG&öÇ2†fRæ÷&ÖÂÆ–÷WB&÷VæG2â6Æ÷6VBF—7Æ–æöæR÷¦W&ò&÷VæG2v÷&·2à¥F†—2—2G&vâÖ6öçFVçBf–ÇW&RÂæ÷B&ööböbÖ—76–æræöFW2÷"f–ÆVBæF—fRFövvÆRà¤w&÷WÖÆ—7BçVÆÂ÷F–öä6÷VçBö–æFW‚—2W‡V7FVBD•bÆ—7C²†–FFVâv—¦Öò–âF†—26GW&P¦—2æ÷BWf–FVæ6Röbv—¦Öò–çF–ærf–ÇW&RâFòæ÷B&WVW7Bæ÷F†W"–FVçF–6Â&W÷'Bà ¥W6W"FG2W6VgVÂ6‡&öæöÆöw’6ÇVS¢7W'&VçB&–v‡Bd”UrG&÷V&ÆR6VVÖVBFò7F'Bv†Và¤f6Vw&÷W—FV×2vW&RFFVBâf6Vw&÷W6öçG&öÇ2w&÷rd”Urg&öÒV&Æ–W"7GVF–ósSG€¦6öçFVçBFó“ƒ‚æB7F—fFR÷fW&fÆ÷rCƒ‚âF†Bö–çG2FòF†Rf—†VB67&öÆÆ–æp§7W&f6R–ç6–FRæF—fRFWF–Ç22ÆW6–&ÆRG&–vvW#²—B—2äõBVæv–æR÷&ö÷BÖ6W6P§&ööbæBFöW2æ÷B&Ww&—FRöÆFW#“cb²&–v‡B×&Vv–öâ&W÷'G22ÆÂ7F'F–ærC“ƒBà ¤W†—7F–ærd”UræVÂ—2f—†VB÷fW&fÆ÷v–ærF—&V7B6†–ÆBöbæF—fRÆFWF–Ç3âÂv†÷6P¦'&÷w6W"ÖF—66Æ÷6VB6öçFVçG2†fR6W&FRf—6–&–Æ—G’÷–çF–ærÆ–fV7–6ÆRâæWr6ÖÆÀ§f–WrÖÖVçR×7W&f6RÖ÷fW2F†B4ÔRæVÂôä4RVæFW"6Â÷WG6–FRæF—fRF—66Æ÷7W&P¦æB†VFW"6Æ—–ær÷7F6¶–æræ6W7G'’â÷&–v–æÂæF—fR7f–WtÖöFW2FWF–Ç2æ÷Vâ—0¥5D”ÄÂ6öÆR÷Vâ7FFRâöæRGG&–'WFRÖf–ÇFW&VB×WFF–öäö'6W'fW"Ö—'&÷'27W'&VçB÷Và¦–çFòW‡Æ–6—BæVÂæ†–FFVâæB7VÖÖ'’&–ÖW‡æFVBö6öçG&öÇ2âæòGWÆ–6FRFövvÆRÀ¦÷Vâ&ööÆVâÂæWr&r×ö–çFW"÷væW"Â6V6öæB÷Wö6öçFVçB6÷’÷"WFöÖF–2&W–çBà¤6Æ÷6VBW‡FW&æÂæVÂ—2F—7Æ–æöæR÷¦W&òÖÆ–÷WBg&öÒV&Ç’6†VÆÂ7G–ÆW6†VWBöçv&Bà¤W†—7F–ærf—†VB÷6—F–öâ÷v–GF‚öÖ‚Ö†V–v‡B÷67&öÆÂ÷F÷V6‚7G–ÆW2&VÖ–ã²67&öÆÂöfg6W@§&W7F÷&W2öâ&V÷Væ–ærâ6ÖRDôÒ”G2÷fÇVW2öÆ—7FVæW'2&VÖ–ââ&V‡–G&F–öâFWFV7G0¦W‡FW&æÂæVÂ&F†W"F†â&V7&VF–ær6öçFVçG2â¶W–&ö&BF"ô'&÷tF÷vâg&öÒ÷Và§7VÖÖ'’VçFW'2æVÃ²6†–gEF"&WGW&ç2ÂW66R6Æ÷6W2æF—fR÷væW"÷&WGW&ç2fö7W2à ¤÷&–v–æÂf–WrÖÖöFW26Æ–6²÷ö–çFW'WFVÆVvF–öâæ÷r&–æG2÷&–v–æÂW‡FW&æÂæVÃ°¦W†—7F–ær7–çF†W6—¦VBÖ6Æ–6²7W&W76–öâ&WF–æVBâ÷WG6–FRÖ6Æ÷6R66WG2$õD‚G&–vvW ¦æBæVÃ²7F—fR×f–Wr†–v†Æ–v‡F–ær6V&6†W27F&ÆRæVÂ”Bâ6ÆVâf–WrW6W2æWp¤”Bv—F‚ÆVv7’fÆÆ&6²Â&W6W'f–ær÷&–v–æÂ÷fW&Æ’÷væW"âT’FV'Vr6×ÆW2æWp¢7f–WtÖöFW5æVÂæB&VçD–BÂ&WF–æ–ærW†—7F–ær6öçG&öÇ2öÖöFR÷67&öÆÂ÷FövvÆRWf–FVæ6Rà¤æò6çf2÷&VæFW&W"öFÖ÷7†W&Rõ–çBõUböf6Vw&÷WövVöÖWG'’ö†—7F÷'’ô×VÇF“ã6†ævW2à¤f–ÆS““b7G–ÆW6†VWBæBgVæ7F–öæÂ÷væW'2Væ6†ævVBâF†—2—2F&vWFVB7G'V7GW&À§&W—"&WV—&–æræF—fRfVVF&6²ÂäõB&÷fVâW&ÖæVçBvV$¶—B÷&ö÷BÖ6W6R&W—"à ¥&Wf–WvVB66†R6Æ÷7W&S¢f–WrÖÖöFW>(i&æWr7W&f6S““s²6ÆVâf–W~(i$f6Rv÷&¶fÆ÷~(i&G&vW £““s²FV'VröV&Ç’FööÆ&"÷6†VÆÂ÷&V6÷fW'“““râG&vW"Ç6òÆ–vç2—G27FÆR&ö¦V7BÐ¦–ç7FÆÆW"6†–ÆB¶W““3‚Fò66WFVB6†VÆÃ““bÂfö–F–ær6ö×WF–ær66†VB–ç7FÆÆW §fW'6–öç3²æòæWr&ö¦V7B–ç7FÆÆW"6öFRâW†—7F–æröÆB–çFW&æÂ7F×2&WF–æVBà ¤f–æÃ“2fö7W6VB52ód”Âó6¶—‡ããsW2“£ræWr7W&f6R–FVçF—G’öö'6W'fW"ö–FV×÷FVæ6Rð¦6öÆW66VB7FFR÷67&öÆÂö–ç6–FRÖ÷WG6–FR7F—fF–öâõVæ6–Â7W&W76–öâö¶W–&ö&BFW7G2À¦÷&–v–æÂ7F'GWFööÆ&"ôg&ÖTÆÂöÖVçRô6ÆVâf–Wrôf6Vw&÷Wö''W6‚öFö6²ôf–ÆRöFV'Vrð¦F—7Æ’÷&VÆV6R6öçG&7G2â¥27–çF‚æBF–fb6ÆVââf–Wr67&öÆÂFW7B'6W"æ÷p§6VÆV7G2—G2GvòÖ‚Ö†V–v‡BÖ&V&–ær&6RöÖVF–'VÆW2–ç7FVBöbÇ6ò6÷VçF–æs““w0¦6Æ÷6VBFW66VæFçBÖF—7Æ’6VÆV7F÷#²ÆÂ†V–v‡Bö÷fW&fÆ÷r76W'F–öç2&WF–æVBÂæ@£““r†2W‡Æ–6—B6Æ÷6VB×7W&f6R6÷fW&vRâæò552÷&VæFW&VBöæF—fRögVÆÂ×7V—FR&öö`¦6Æ–ÖVBg&öÒ6öçG&öÆÆVBDôÒFW7G2âÆFW"†÷7FVB7FGW2æBW†7BV&Æ–6F–öâöÆ—fP§&ööb&V6÷&FVB–âFö72÷V&Æ–6F–öâÓ““ræÖC²6öç7VÇB&Vf÷&RFW67&–&–ærFVÆ—fW'’à ¤DUd”4S““s¢g&W6ƒ““r÷Vâd”Us¢F—&V7F–öç2öÆöö·2ö6öçG&öÇ2×W7Bf—6–&Ç’G&rÂæ÷BöæÇ¦g&ÖRâ6ö×&R7GVF–òæBf6Vw&÷W2†÷fW&fÆ÷r66R“²67&öÆÂFò&÷GFöÒÂFövvÆRÆöö·0¦æB&V÷Vâv—F‚f–ævW"õVæ6–Ââ6Æ÷6Rd”Urf–G&–vvW"ö÷WG6–FRF²÷Vâf–ÆRæ@§&WGW&ââf6R&F–Âd4Tu$õU7F–ÆÂ÷Vç2÷&–v–æÂÆVgBFö6²â6öæf—&Òv—F†÷WBÐ§7v—F6‚õ&Vg&W6‚F—7Æ’v÷&¶&÷VæBâã““b52—2&÷FV7FVC³““R66WFæ6Ræ÷B–æfW'&VBà¤7W'&VçBd”Ur—†VÂ66WFæ6R&VÖ–ç2VæF–æs²'&öFW"†—7F÷&–6Â&–v‡B×&Vv–öâ—77VP§7F—2õTâVçF–ÂæF—fRfVVF&6²âæW‡B76W73““r•B&W7VÇB&Vf÷&RÖ÷&R&VæFW&–æp¦6†ævW2÷"f6Vw&÷W×6VÒUböÖFW&–Âv÷&²â7FæF–ærW6‚÷V&Æ—6‚&÷fÂÆ–W2à ¢22ã““r–æ—F–Â7GVF–ò7V66W73²f6Vw&÷W2G&ç6—F–öâ&VÖ–ç2õTâ(	B#rö7Fö&W"##` ¥W6W#¢(	Åf–Wrv÷&·2w&VBÒF†W&R—27F–ÆÂF6‚öâF†R&–v‡BF†Bw2†–F–ærF†P¦v—¦Öò6öçFVçG2î(	Ò66WB÷&÷FV7C““rd”Ur&VæFW&–ær&W—"7V6–f–6ÆÇ“²Fòæ÷B–æfW ¦'&öB&–v‡B×&Vv–öâöv—¦Öò66WFæ6Râ¶VW““bf–ÆRÖVçR52æC““B66WFæ6Rà ¤æWs““r&W÷'Cƒ£C£S2ã£¢7GVF–òôf6RÂf–Ww÷'C3cgƒƒƒbÄE#"Æ6çf3#s3'ƒcS"À¦6öçG&öÇ2Væ&ÆVBÂæòFööÂ6W76–öâ÷FW‡GW&R–çBÂ6çf5&ö&V†–FFVæfÇ6Râf–æÂd”Up¦6Æ÷6VBÂW‡FW&æÂ7f–WtÖöFW5æVÂ&VçFö†–FFVâöF—7Æ–æöæR÷¦W&ò&÷VæG2Â6òæð§&WF–æVB6Æ÷6VBd”Ur&V7FævÆR—2W7F&Æ—6†VBB6GW&RâF÷FÄv—¦ÖòW‡Æ–6—FÇ¦†–FFVâöF—7Æ–æöæR÷¦W&ò&÷VæG2Föó¢F†—2&W÷'BFöW2äõB6GW&Rf—6–&ÆR'FÇ¦6Æ—VBv—¦ÖòâFòæ÷BG&VBF†B–çFVçF–öæÂ†–FFVâ7FFR27F–Â6Æ—–ær&ööbà¥7GVF–òFÖ÷7†W&R—27F—fRÂ÷6—G“ö×VÇF—Ç’Â'WBF†—2ÆöæRFöW2æ÷B&÷fR—@¦6W6W2F†RF6‚†öÆFW"&W÷'G2–æ6ÇVFVBæöâÕ7GVF–òö÷6—G“f–ÇW&W2’â†VÇF‡§&–v‡B×FööÆ&"Æ–÷WBö†—G2&VÖ–âæöâ×—†VÂWf–FVæ6Rà ¥FövvÆR×F–ÖR&V6÷&G2C#“c#’óC3#c"óCC326†÷r÷VåE%TRv—F‚æVÆ†–FFVåE%TS²6Æ÷6W0£C#CóC3ƒBóCCƒ#r6†÷r&Wf–÷W2f—6–&ÆRæVÂ&÷VæG2âFV'Vrö'6W'fW2FövvÆRBv–æF÷p¦6GW&RÂv†–ÆR7W&f6Rf—6–&–Æ—G’—2Ö—'&÷&VB'’×WFF–öäö'6W'fW"âF†W6RG&ç6—F–öà§6×ÆW26â&V6VFRF†Rf—6–&–Æ—G’WFFS²F†W’&Ræ÷B'’F†V×6VÇfW2W'6—7FVç@¥d”Urf–ÇW&RWf–FVæ6RâW6W"W‡Æ–6—FÇ’6öæf—&×2d”Uræ÷rv÷&·2â&W6W'fR66WFV@§7W&f6R7G'V7GW&S²–bgWGW&R&W÷'F–ærv÷&²—2æVVFVBÂ6×ÆR6WGFÆVB7FFR&F†W §F†â6Æ–Ö–ærF†W6RG&ç6—F–öâ&V6÷&G26†÷r&VÖ–æ–ærf—6–&ÆR6Æ÷6VBæVÂà ¥6÷W&6RVF—C¢F÷FÂv—¦Öò&ö÷B&VÖ–ç2÷&–v–æÃ“g‚f–Ww÷'B6†–ÆBÂG&ç6ÆFVBFð§6VÆV7F–öã²—G2&–Ö'’5dr–çFVçF–öæÆÇ’6Æ—2Fò—G2÷vâ&÷VæG2v†–ÆR6†÷'F7WB5dw0§&VÖ–â÷fW&fÆ÷wf—6–&ÆRâæò7V6–f–2w&öær67&VVâÖf—†VB6Æ—&V7B÷"6÷fW&–ærDôÒæöFP§v2W7F&Æ—6†VBâFòæ÷B&VÖ÷fR&÷FV7FVB5dr6Æ—–ær÷"Ö÷fRv—¦Öò&VçBö6ö÷&F–æFW0§7V7VÆF—fVÇ’âæò6öFRö'V–ÆB6†ævRg&öÒF†—2WFFRâ'VçF–ÖR&VÖ–ç3““rà ¤æW‡BW6VgVÂæF—fRWf–FVæ6S¢67&VVç6†÷Bv†–ÆRv—¦Öò—2d•4”$ÄRæB7&÷76–ærF6‚À§6ò'&÷w2÷&–æw2fW'7W2&F–ÂÆ&VÇ2ö'WGFöç2æBf—†VBF6‚&÷VæF'’6â&R6ö×&VBà¥V–6²7GVF–þ(i%6öÆ–N(i%7GVF–ò6ö×&—6öâÖ’6W&FR7GVF–ò&W6VçFF–öâFWVæFVæ6S°¦—B—2F–væ÷7F–26ö×&—6öâÂæ÷BwV&çFVVB&V6÷fW'’÷"Væv–æRF–væ÷6—2à¤æòæVVBf÷"æ÷F†W"–FVçF–6ÂGV×v—F‚v—¦Öò†–FFVââ&W6W'fR÷&–v–æÂæf–vF–öâÀ§6VÆV7F–öâö†—7F÷'’æB66WFVBd”Ur÷væW"VçF–ÂWf–FVæ6R7W÷'G2æ'&÷r&W—"à ¢22ã(	BUbVF—F÷"Æ–â6ö×÷6—F–öã²ãfVGW&R52(	B#rö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’56W2ãfVGW&W2Â'WB&W÷'G2&–v‡B×6–FRÆ÷72gFW"VçFW&–æp¥UbVF—F÷"â&÷FV7BãUbfÆ–FF–öâõ7GVF–ò†æFöfbôf6Vw&÷WVçw&&V†f–÷#°¦Fòæ÷B–çFW'&WBfVGW&R522æF—fRf—6–&–Æ—G’66WFæ6Rà ¤”Ôuóƒ3C"çær6†÷w2VF—F÷"6‡&öÖR7WBöfbæV"67&VVâƒ#B552†–ÖvRƒ#C‚’À¦–æ6ÇVF–ær'F–Â6†V6¶W"Æ&VÂÂ&–v‡BVF—F÷"7W&f6RæBF÷×&–v‡BFööÆ&"à¥VæFW&Ç––ær4BfÆö÷"&VÖ–ç2f—6–&ÆRB&–v‡Bâ&W÷'B“£C£CU£¢Wb×FööÇ26W76–öâÀ§Wf6†V6¶W"ôö&¦V7BÂv÷&·76Rf—6–&ÆRC‚óc‚ó3Sós“2VæFW"²FööÆ&"&÷VæG2ö†—G0¦†VÇF‡’Âd”Ur6Æ÷6VBö†–FFVâÂFÖ÷7†W&R'6VçBÂv—¦Öò–çFVçF–öæÆÇ’†–FFVâà¤6çf3#s3'ƒcS"ôE#"âæòWf–FVæ6RöbÖ—76–ærDôÒÂ7FÆR&VÆV6R÷"UbF÷öÆöw’Æ÷72à¤†–FS4B'WGFöâ6Æ–6·2–â7WÆ–VBÆörFòæ÷BW7F&Æ—6‚âö'6W'fVBF–væ÷7F–2&W7VÇBà ¥6÷W&6RVF—Bf÷VæBUbVçG'’7F–ÆÂ&V–çG&öGV6VBöÆBã“S"—6öÆF–öâöâf–Ww÷'Bæ@§v÷&·76RÂÇW2—6öÆF–öâ÷–çB6öçF–æÖVçBöâUb6çf2w&W"âF†—27W'f—fVBã““’w0§Æ–â7F'GW&6VÆ–æRâ&VÖ÷fRF†÷6R552FV6Æ&F–öç2æB7F—fR¦†2f–Ww÷'B'VÆP¤ôäÅ’–â÷&–v–æÂWb×v÷&·76Râ&WF–â6–&Æ–ær&ö÷BÂ£’VæFW"†VFW#Âf—†VB–ç6WG2À§67&öÆÆ–ærÂ÷fW&fÆ÷r6Æ—–ærÂ÷&–v–æÂ6öçG&öÇ2ö6çf2–FVçF—G’Â6—¦–æræBvW7GW&W2à¤ÖW6‚†VÇF‚6†ævW26†–ÆB66†R¶W’öæÇ“²6†VÆÂ&VçB÷&V6÷fW'’¶W—3&Wf–WvVBà¤æò&VæFW&W"ÂÖöFVÂö†—7F÷'’õUb÷–çBÆv÷&—F†×2ÂÖ–ã““’÷7G–ÆW3““’Â×VÇF“ã÷"g&÷¦Và¦6†ævW2âF†—26Æ÷6W2fW&–f–VB&6VÆ–æRÖ—6ÖF6‚ÂäõB&÷fVâvV$¶—B&ö÷B6W6R÷ §W&ÖæVçB&–v‡B×&Vv–öâ&W—"âæF—fRf—6–&–Æ—G’vFR7F—2õTâVçF–ÂFWf–6RfVVF&6²à ¤W†—7F–ærã“S"5526öçG&7Bæ÷r&÷FV7G2Æ–âUb6ö×÷6—F–öâÂ&WF–æ–ærÆÂ÷&–v–æÀ¦†VFW"öW†—BövVöÖWG'’÷67&öÆÂ&÷VæG2æBÆ–fV7–6ÆRöæf–vF–öâö†—7F÷'’76W'F–öç2à¥fÆ–FF–öâ÷V&Æ–6F–öâ&W7VÇG3¢Fö72÷V&Æ–6F–öâÓæÖBâ7FæF–ærW6‚÷V&Æ—6€¦&÷fÂÆ–W2âæW‡B&–÷&—F—¦RæF—fRUbÖVçG'’&W7VÇB&Vf÷&RgW'F†W"&VæFW&–æp¦6†ævW3²Fòæ÷B&WVB&ÇW"÷f–væWGFRö6Æ÷6VBÖÖVçR‡—÷F†W6W2Ç&VG’F—7&÷fVBà ¤DUd”4S¢g&W6‚ÆöBÓâUbVF—F÷"Â–ç7V7BgVÆÂ&–v‡B&÷&FW"ô6†V6¶W"ô–ÖvR÷F÷ ¦'WGFöç3²&6²Fó4BæB&V÷Vâ6WfW&ÂF–ÖW2v—F†÷WB×7v—F6‚÷&V6÷fW'’ââ÷–æ6‚À§6VÆV7BõVæ6–ÂÖÖ÷fRâ—6ÆæBÂVæFõ&VFòâ&6²Fó4BÓâd”Ur7GVF–òôf6Vw&÷W2ÓâU`¤VF—F÷#²–ç7V7B&–v‡B6–FRv–ââã66WFVBv÷&¶fÆ÷r7F—2&÷FV7FVBà ¢22ã&V7W'&Væ6R(	B&Ææ²f6Vw&÷W2d”UræB&–v‡B×&Vv–öâv—¦ÖòÆ÷72(	B#‚ö7Fö&W"##` ¥W6W"&Wf–÷W6Ç’56VCÂæ÷r&W÷'G2f6Vw&÷W2d”Ur&Ææ²æBv—¦ÖòF—6V'0¦öâ&–v‡BÂv—F†÷WBf÷&ÖW"&÷GFöÒ×&–v‡Bw&÷VæBFöæÂÆ–æRâ&V÷VâæF—fRf—6–&–Æ—G¦vFS²&WF–ãfVGW&R66WFæ6RæCgVæ7F–öæÂõUb×7V6–f–252öæÇ’à¥67&VVç6†÷C$3s#4T2Ô34cBÓDcS2Ô$dCRÔTƒ“#c”bçærf—6–&Ç’6öæf—&×3Âf6Vw&÷W0¦6öÆ÷W'2ÂVFvRÖöFRÂgVÆÂF÷×&–v‡BFööÆ&"æBV×G’÷Vâd”Urg&ÖRâv—¦Öò—0§f—6–&ÆRæV"6VçG&R–âF†—267&VVç6†÷C²F—6V&æ6RB&–v‡B—2W6W"Öö'6W'fVBÀ¦æ÷B6GW&VB26Æ—VBv—¦Öò†W&RâæòæWrFV'Vr&W÷'B7WÆ–VBà ¥6÷W&6RW‡ÆæF–öã£““’&WF—&VB67&VVâ×v–FRDôÒ×VÇF—Ç’f–væWGFS²&VæFW"ÖÖöFW0§6†÷w27GVF–òfÆö÷"öÆ–v‡G2÷6†F÷w2ôäÅ’–â7GVF–òÂæ÷Bf6Vw&÷W2âF‡W2'6Væ6Rö`¦öÆBw&÷VæBÆ–æR–âf6Vw&÷W2—2æ÷B&ööböb&V6÷fW'’æB6ææ÷B&VÆ–&Ç’6–væÀ¥T’†VÇF‚ãöæÇ’&VÖ÷fVBUbv÷&·76R—6öÆF–öâö6öçF–æÖVçC²d”UræBv—¦Öð§'VçF–ÖRVæ6†ævVBâæV—F†W"f–æF–ær&÷fW2&ö÷B6W6Röb&Ææ²ÖVçRöv—¦ÖòÆ÷72à ¤æòæWr'VçF–ÖR'V–ÆB÷"7V7VÆF—fR552&W—"–âF†—2Wf–FVæ6RWFFRâ7W'&Vç@§&VÆV6Sâ&–÷&—F—¦RF†—2&V7W'&Væ6R&Vf÷&R–×ÆVÖVçF–ær&WVW7FVBf–ÆÂf6Rð¤f–ÆÂf6Vw&÷W²F†B&WVW7B&VÖ–ç27F—fRæBVç6†—VBâæW‡BW6VgVÂFWf–6P¦6ö×&—6öã¢6Æ÷6Rd”UrÂÖ÷fR6ÖRf—6–&ÆRv—¦Öò7&÷72&–v‡B&Vv–öâÂF†Vâ6ö×&P¥7GVF–òfW'7W2f6Vw&÷W2v—F†÷WB&VÆöBö×7v—F6‚÷&V6÷fW'’âFòæ÷BFVÖæBæ÷F†W ¦–FVçF–6Â†–FFVâÖv—¦ÖòGV×÷"G&VB†VÇF‡’DôÒö†—G22—†VÂ&ööbà ¢22ã"(	BVæ–f÷&Òf6Vw&÷W6öÆ÷W'2Â–æ6ÇVF–ærVæFW'6–FW2(	B#‚ö7Fö&W"##` ¥W6W"67&VVç6†÷CDDTC#Tc’6†÷w2&÷GFöÒf6W2æV&Ç’&Æ6²–âf6Vw&÷W2æB&WVW7G0¦WVÆ—¦VB6†F–ærâ÷&–v–æÂ&VæFW"ÖÖöFW2f6Vw&÷WÖFW&–Âæ÷rW6W2VæÆ—@¤ÖW6„&6–4ÖFW&–Âv—F‚fW'FW„6öÆ÷'2æBFöæTÖVC¦fÇ6R–ç7FVBöbÆ—B7FæF&Bà¤WfW'’g&öçBÖf6–æröÇ–vöâF—7Æ—2—G2W†—7F–ærw&÷WÆWGFR6öÆ÷W"–æFWVæFVç@¦öbÆ–v‡Böæ÷&ÖÂ÷&–VçFF–öââ÷&–v–æÂg&öçE6–FRÂöÇ–vöâöfg6WBÂ&6¶f6RF–væ÷7F–2À§ÆWGFRöÆ—7BöæÖRFFÂ6VÆV7F–öâö''W6‚ö†—7F÷'’Â÷F†W"d”UrÖFW&–Ç2æB&VæFW&W ¦Æ–v‡G2&VÖ–âVæ6†ævVBâ&÷GFöÒf6W26âæ÷r&R&VBv†–ÆR÷&&—F–ærVæFW&æVF‚à¥F†—2FVÆ–&W&FVÇ’fÆGFVç2f6Vw&÷W26†F–æs²7GVF–ò&WF–ç2÷&–v–æÂFWF‚öÆ–v‡F–ærà ¥66÷R—2öæÇ’÷&–v–æÂÖFW&–ÂÇW2&Wf–WvVB&VæFW"÷6†VÆÂ÷&V6÷fW'“"–ç2æ@§&VÆV6RÖ&¶W'2âæòT’ö6ö×÷6—F–öâöv—¦Öò6†ævW3²&Ææ²d”Ur÷&–v‡B×&Vv–öâ&V7W'&Væ6P§7F—2õTââãfVGW&RæBãgVæ7F–öæÂ66WFæ6R&WF–æVBâ&WVW7FVBU`¤f–ÆÂf6Rôf6Vw&÷Wv—F‚W‡ç6–öâ&VÖ–ç27F—fR'WBVç6†—VC²Fòæ÷B6Æ–Ò—@§v2–æ6ÇVFVB†W&RâfÆ–FF–öâ÷V&Æ–6F–öã¢Fö72÷V&Æ–6F–öâÓ"æÖBà ¤DUd”4S#¢f6Vw&÷W2Óâ÷&&—B&VÆ÷rÖW6ƒ²76–væVBVæFW'6–FW26†÷r6ÖRw&÷W ¦6öÆ÷W"2WW"f6W2â–çBöW&6Rw&÷W2ÂVæFõ&VFó²Æ—7B6öÆ÷W'2&VÖ–â6öç6—7FVçBà¥7v—F6‚7GVF–òÓâf6Vw&÷W3¢7GVF–òÆ–v‡F–ær&WGW&ç2Âw&÷Wf–Wr—2WfVæÇ’6öÆ÷W&VBà¤7W'&VçC"æF—fRV&æ6R66WFæ6RVæF–æs²&–v‡B×&Vv–öâfVÇB7F–ÆÂ6W&FRà ¢22ã"W6W"53²6†&VBv—¦ÖòöÖVçRVF—B(	B#‚ö7Fö&W"##` ¥W6W"53"&÷FV7G2Væ–f÷&Òf6Vw&÷W6öÆ÷W"–æ6ÇVF–ærVæFW'6–FW3²7GVF–ð¦Æ–v‡F–ær&VÖ–ç26W&FRâW6W"&WVW7G2æ÷F†W"–çfW7F–vF–öâöbv—¦ÖòöÖVçRÆ÷72à¤&÷F‚7GVF–òæBf6Vw&÷W2ffV7FVC²Fòæ÷B&WVBF†B6ö×&—6öââæòæWr'VçF–ÖP¦f—‚W7F&Æ—6†VBâv—¦ÖòÆö6Â5dr÷fW&fÆ÷s¦†–FFVâÖ÷fW2v—F‚÷&–v–æÃ“g‚&ö÷C°¥d”Urf—†VBW‡FW&æÂ6–&Æ–ærVæFW"†2F–ffW&VçBæ6W7G'’âæò6†&VBÆ–6F–öà¦6Æ—÷"66—76÷"6ÆÂW7F&Æ—6†VBF†BW‡Æ–ç2&÷F‚Æ÷7B7W&f6W2âFòæ÷B&VÖ÷fP§&÷FV7FVB5dr6Æ—–ær7V7VÆF—fVÇ’â&–÷"Ub67&VVç6†÷B7WFöfbæV##B552ð£#C‚‡—6–6Â—†VÇ2BE#"7VvvW7G2&W6öÇWF–öâÖFWVæFVçB–çBö6ö×÷6—F–öà¦‡—÷F†W6—2Âæ÷B&ööböbuR÷FW‡GW&RÖÆ–Ö—BõvV$¶—B6W6RâæW‡Bæ'&÷rF–væ÷7F–0¦6æF–FFS¢W‡Æ–6—BFV×÷&'“‚fW'7W2WFöÖF–3'‚&VæFW&–ærW6–ærWF†÷&—FF—fP§f–Ww÷'B6—¦–ær÷væW"Â&W6W'f–ær5526—¦RöÖöFVÂö†—7F÷'’æB&W7F÷&–æröâW†—Bà¤æ÷B–×ÆVÖVçFVC²Fòæ÷B6Æ–ÒF–væ÷7F–26öçG&öÇ2W†—7B÷"f—‚—2&VG’à ¤7W'&VçBÆ—fS#²æòæWr'VçF–ÖR'V–ÆB–âF†—2VF—Bãc’fö7W6VBFW7G2&VÆöærFð£"ÖFW&–Â6†ævRÂæ÷B—†VÂÖÆ÷72&ööbâf–ÆÂf6Rôf6Vw&÷W&VÖ–ç2&WVW7FV@¦æBVç6†—VBâæòæWrFWf–6RFW7B&WV—&VB–âF†—2VF—C²Fòæ÷B6²f÷"&WVFV@¦†–FFVâÖv—¦Öò&W÷'G2÷"–FVçF–6Â7GVF–òôf6Vw&÷W26ö×&—6öâà ¢22ã2(	BW‡Æ–6—B&VæFW"×&W6öÇWF–öâF–væ÷7F–3²ã"52&÷FV7FVB(	B#‚ö7Fö&W"##` ¥W6W"&WVW7G2gW'F†W"GFV×G2gFW"ÖöFVÂ6†ævRâ–×ÆVÖVçB6öçG&öÆÆVC‚fW'7W0¦æ÷&ÖÂE"F‡&÷Vv‚õ$”t”äÂf–Ww÷'B×6—¦–ær÷væW#²FVfVÇB&VÖ–ç2WFöÖF–26VC"à¤f–ÆRÓâT’FV'VrÓâFW7C9r&VæFW"&W6öÇWF–öâFövvÆW2FV×÷&'’6²6ÖR'WGFöà§&W7F÷&W2æ÷&ÖÂâF—6&ÆVBFV'VræBvV†–FR&W7F÷&RWFöÖF–2âæòÆö6Å7F÷&vRÀ§&VæFW&W"&WÆ6VÖVçBÂ552&W6—¦RÂÖöFVÂö†—7F÷'’VF—G2Âf÷&6VB6çf2f—6–&–Æ—G’À§7–çF†WF–2&W6—¦R÷"W"Ög&ÖRöÆÆ–ærâöæÇ’÷&–v–æÂ6öÆW66VB&W6—¦R6ÆÆ&6²w&—FW0¦&6¶–ær'VffW"âvVçV–æR&W6—¦R÷FööÂöÖöFRÆ–fV7–6ÆR¶VW2&WVW7FVB6âF—7÷6–æp§6—¦–ær6æ6VÇ2VæF–ærg&ÖW2Â&VÖ÷fW2’öÆ—7FVæW'2æB&W7F÷&W2&–÷"’–FVçF—G’à ¤'WGFöâ&VgW6W2–çBÂ7F—fRFööÂ÷6W76–öâöG&rÂF—6&ÆVB÷&&—B6öçG&öÇ2ÂW†—7F–æp¦6çf2&ö&R÷&Vg&W6‚âW†—B÷W&F–öâ&Vf÷&R66ÆR6†ævS²&W7F÷&F–öâöâFV'Vröf`¦Çv—2v÷&·2â6æ6†÷B–æ6ÇVFW2&WVW7FVB6æB7GVÂ&6¶–ærF–ÖVç6–öç2â6ö×&P§&–v‡B×&Vv–öâ—†VÇ2–ÖÖVF–FVÇ’gFW#‚äBgFW"&WVF–ærf–Æ–ærv÷&¶fÆ÷s²F†Và§&W7F÷&Ræ÷&ÖÂæB&WVBâ6–ævÆR&V6÷fW'’öâV—F†W"7v—F6‚Ö’ÖW&VÇ’&VfÆV7@¦'VffW"&VÆÆö6F–öâÂæ÷B&÷fRE"FWVæFVæ6RâæF—fR—†VÂ&W7VÇB&VÖ–ç2VæF–æs°§F†—2—2F–væ÷7F–2Âæ÷B6Æ–ÖVBW&ÖæVçBv—¦ÖòöÖVçRf—‚âV&Æ–W"&÷F‚ÖÖöFRWf–FVæ6P§&WF–æVC²æò&WVFVB7GVF–ò×fW'7W2Ôf6Vw&÷W2F–væ÷6—2æVVFVBà ¤Ö–â6†ævW2f–Ww÷'B×6—¦–ær–×÷'B¶W’ôäÅ“²6—¦–æröFV'Vr÷væW'26†ævVBÂ6†VÆÂð§&V6÷fW'’¶W—32&Wf–WvVBâW†—7F–ærã““’&W6—¦RÆÆö6F–öâ÷&VæFW&W"ö6ÖW&6öFRÀ¢ã"VæÆ—Bf6Vw&÷W2ÂÆWGFRÂÖöFVÆÆ–ærõUbõ–çBÂ×VÇF“ãæBg&÷¦Vâ'—FW2&WF–æVBà¥FW7G2W†V7WFR7GVÂ66ÆR’æBFV'Vr'WGFöâ†'W7’&VgW6ÂÂ7v—F6‚÷&W7F÷&RÀ§6æ6†÷BÂFV'Vröfb’Â÷&–v–æÂf–Ww÷'B6—¦W2ö6öÆW66–ær÷vV†–FRö6ÆVçWæBVæ6†ævV@§66VæRö†—7F÷'’6öçG&7G2âfÆ–FF–öâ÷V&Æ–6F–öã¢Fö72÷V&Æ–6F–öâÓ2æÖBà ¤DUd”4S3¢v†–ÆRfVÇBf—6–&ÆRÂf–æ—6‚FööÂÓâf–ÆRõT’FV'VrÓâFW7C9r&VæFW §&W6öÇWF–öââ–ç7V7B&–v‡Bv—¦ÖòöÖVçS²&WVB÷&–v–æÂf–Æ–ærv÷&¶fÆ÷rC‚â&W7F÷&P¦æ÷&ÖÂ&W6öÇWF–öâæB&WVBâ6÷’&W÷'Bv†–ÆRffV7FVBâ&W÷'Bv†WF†W#‚&WfVçG0§&V7W'&Væ6RÂ&÷F‚7v—F6†W2öæÇ’&V6÷fW"FV×÷&&–Ç’Â÷"æV—F†W"†VÇ2âFV'Vröf`§&W7F÷&W2æ÷&ÖÃ³‚–çFVçF–öæÆÇ’Æöö·26ögFW"âf–ÆÂf6Rôf6Vw&÷W&VÖ–ç2Vç6†—VBà ¢22ãB(	BUb–çBf–ÆÂf6Ròf6Vw&÷WæB†öÆBW‡ç6–öâ(	B#‚ö7Fö&W"##` ¥W6W"&W÷'G3‚6VV×2Fò7F’†VÇF‡’æBW‡Æ–6—FÇ’&·2&–v‡B×&Vv–öâFW7F–ærVæÆW70¦—B&V7W'2â&V6÷&B&÷f—6–öæÃ‚7F&–Æ—G’öæÇ’Âæ÷B&÷fVâ&ö÷B6W6R÷W&ÖæVçBf—‚à¤¶VW26—¦–æröFV'Vr'—FW2æBFVfVÇBWFöÖF–2E"Væ6†ævVC³‚—27F–ÆÂFV×÷&'¦æB&W6WG2öâ&VÆöBôFV'Vröfb÷vV†–FRâ&W7VÖR&WVW7FVBUb–çBf–ÆÂW‡ç6–öâà ¤÷&–v–æÂf–ÆÂ&F–Â6V7F÷"&VÖ–ç2–â—G266WFVB÷6—F–öâö'Gv÷&²â6ö×7BÄTe@§6WGF–æw2FBf6R†FVfVÇB’Âf6Vw&÷WæBv†öÆRö&¦V7B66÷RâVæ6–ÂöÖ÷W6RFf–ÆÇ0¦6Æ–6¶VB÷&–v–æÂöÇ–vöâÂæ÷BöæR&VæFW&VBG&–ævÆRâf6R†öÆCC#×2W‡æG2&Wf–Wp§Fò6öææV7FVB6÷Ææ"&Vv–öã²Ww&÷w2öF÷vâ6‡&–æ·2g&öÒf—†VBÆæ"&6R–ã3€§7FW2v—Fƒ‡‚æWWG&Â&æB†Öƒ3"7FW2“²&–v‡BW6W2÷&–v–æÂf6RÆö÷æBÆVg@¤f6R&–ærâF—&V7F–öâ&WfW'6Â&V6ö×WFW2&6VÆ–æR—†VÇ2&F†W"F†â67V×VÆF–æp¦÷6—G’â&Vf÷&R†öÆBÂÖ÷fVÖVçCã‡‚6æ6VÇ2Fâ&VÆV6R6öÖÖ—G2öæR÷&–v–æÂ–ç@¦6†V6·ö–çC²6æ6VÂ÷66÷R÷FööÂö&öG’ö†—7F÷'’Æ÷72&W7F÷&W2&6VÆ–æRæB6ÆV'2F–ÖW"à¤f–ævW'27F–ÆÂæf–vFRâ66÷R6†ævW2æWfW"ÇFW"ÖöFVÆÆ–ær6VÆV7F–öâ÷"f6Vw&÷W2à ¤f6Vw&÷W66÷R6†÷w24ÔR÷&ævRæöâ×–6¶&ÆR&÷VæF'’&Wf–Wr2Ub6VÒ&Wf–Ws°¦6Æ–6²f–ÆÇ2ÆÂ6ÖRÖæÖRf6W2öâF&vWBÂ–æ6ÇVF–ærF—66öææV7FVBF6†W2âVæw&÷WV@¦f6W2&VgW6Rv—F‚76–væÖVçB†–çBâ66÷RW†—BôFöæRö&öG’Æ÷72F—7÷6W2÷fW&Æ“°§v÷&ÆBÖG&—‚föÆÆ÷w2÷&–v–æÂ&öG’âUb&Wf–Wræ÷r6†&W2W‡G&7FVB÷&–v–æÂ&÷VæF'§&VæFW&W"Â&WF–æ–ær—G2W†7B6V×2ö6öÆ÷W"÷F–ÖW"÷Vçw&ö6æ6VÆÆF–öâ&V†f–÷"à ¤6÷–VBW†—7F–ær&VBÖöæÇ’6÷Ææ"–ç7V7BÂVB×7G&—G&6RæBw&÷rõ6‡&–æ²ÖF‚Fð§6†&VBf6R×6VÆV7F–öâ×&Vv–öç3²õ$”t”äÂ6VÆV7F–öâT’÷væW'26ÆÂF†÷6R6ÖRgVæ7F–öç2à¤æòGWÆ–6FRvVöÖWG'’¶W&æVÂ÷"6VÆV7F–öâ6–×VÆF–öââ&7FW"÷&–v–æÂf–ÆÂ66WG0¦÷F–öæÂFW†VÂÖ6²æB&6VÆ–æR&WÆ6VÖVçC²6÷fW&vRöÇ†ö÷6—G’÷66Æ"öÖ6²À§&W6÷W&6R÷ööÂfÆ–FF–öâÂ66VæR†—7F÷'’Â6fT÷VâöW‡÷'B&VÖ–â÷&–v–æÂ÷væW'2à¤f6RÖ6·2W6R÷&–v–æÂUbFW†VÂ÷væW'6†—²&WV—&RæöâÖ÷fW&Æ–ærÂæöæFVvVæW&FP¥Ug2–âF–ÆS(	3Â÷&–v–æÂ&÷VæFVBvVöÖWG'’÷v÷&²Æ–Ö—G2â6†&VBöÖ&–wV÷W2&÷VæF'§FW†VÇ27F’6öç6W'fF—fS²æò–çF–æröçFòF–ffW&VçBf6Rw2÷væVB–çFW&–÷"FW†VÇ2à¥v†öÆRö&¦V7Bf–ÆÂ&WF–ç2V&Æ–W"&V†f–÷"âW†—7F–ær–ÖvRÖ6öÆ÷W"&VgW6Â&WF–æVBà ¥&Wf–WvVCB&WfW'6R66†R6Æ÷7W&S¢6†&VBÖöGVÆW2Â6VÆV7F–öâ÷væW'2ô6÷Ææ"G&vW"À§–çB&7FW"ö6÷&RõT’æBÆ"ÆöFW'2ÂUbv÷&¶fÆ÷rôÖW6„†VÇF‚Â6†VÆÂ÷&V6÷fW'’â–çFW&æÀ§7F×2&WF–æVBâÖ–ã2Âf–Ww÷'B6—¦–æröFV'Vs2Â66WFVBVæ–f÷&Òf6Vw&÷W3"À¥5dröv—¦Öò÷&–v‡B×&Vv–öâ6ö×÷6—F–öâÂÆWGFRÂ×VÇF“ãæBg&÷¦Vâ&VÆV6W2Væ6†ævVBà¥FW7G3¢7GVÂ&Vv–öâ÷–çFW"õT’õVæFõ&VFò÷7V'6WB6fT÷VâÂ&Wf–Wr&WfW'6Âö÷6—G’À¦ÆÂÖæÖRw&÷Wf–ÆÂö÷fW&Æ’6ÆVçWÂ÷&–v–æÂ6VÆV7F–öâvW7GW&W2æB–çB7V—FRà¤ÆVv7““#bó“#rT’f—‡GW&W2æ÷rW‡Æ–6—FÇ’6†ö÷6Rv†öÆRö&¦V7Bf÷"F†V—"gVÆÂ×FW‡GW&P¦76W'F–öç3²÷&–v–æÂ—†VÂõVæFõ&VFòõ6fT÷VâöæF—fRÖW‡÷'B&÷FV7F–öç2&WF–æVBà¥FW7BFFW'2–×÷'BW‡G&7FVB&VÂ6VÆV7F–öâgVæ7F–öç3²æò&V†f–÷&Â76W'F–öç0§&VÖ÷fVBâ&W7VÇG2æBV&Æ–6F–öâWf–FVæ6S¢Fö72÷V&Æ–6F–öâÓBæÖBà ¤DUd”4SC¢Ub–çBÓâf–ÆÂÓâf6S²FöæRöÇ–vöâÂF†Vâ†öÆBöâ6÷Ææ"F6‚À§6Æ–FRWöF÷vâæB&–v‡BöÆVgBÂ&VÆV6S²&WfW'6–ær÷6‡&–æ¶–ær&VÖ÷fW2&æFöæVB&Wf–Wrà¥VæFõ&VFòöæRvW7GW&Râ6†ö÷6Rf6Vw&÷W¢÷&ævR&÷VæF&–W2f—6–&ÆS²FæÖVBw&÷WÀ¦öæÇ’F†Bw&÷Ww2f6W2f–ÆÃ²''W6‚ôFöæR&VÖ÷fW2&÷VæF&–W2âv†öÆRö&¦V7B7F–ÆÂf–ÆÇ0¦ÆÃ²6fT÷Vâ&WF–ç2–çBâæòæWr&–v‡B×6–FRF–væ÷7F–2FW7B&WVW7FVBâ–bV&Æ–W ¦fVÇB&WGW&ç2gFW"&VÆöBÂW†—7F–æs‚6öçG&öÂ&VÖ–ç2f–Æ&ÆS²Fòæ÷B6ÆÂ—Bf—†VBà¤7W'&VçCBfVGW&R66WFæ6RVæF–æræF—fRVæ6–ÂFW7Bà ¢22ãR(	B÷BÖ–â7F'GW‚ÂgFW"ãB&V7W'&Væ6R(	B#‚ö7Fö&W"##` ¥W6W"&W÷'G2&–v‡B×6–FRf–ÇW&RföÆÆ÷v–ær&Vg&W6‚FóBâ&W÷'C3£#£3E¢6öæf—&×0§&WVW7FVC‚äB7GVÃ3cgƒƒ#b&6¶–ær„5533cgƒƒ#bôE#"’âæò7FÆR&VÆV6R÷"f–ÆV@¦Æ—fR&W6öÇWF–öâ7v—F6‚â7F'GWÆövvVBCCƒ’÷vW6†÷s3ƒƒ²CssR6çf3#s3'ƒcS"À§F†Vã‚&WVW7FVCsƒ3æC3cgƒƒ#b'““âF‡W2f–ÇW&RW'6—7G2–â6GW&VC‚7FFRÀ¦'WBF†—2ÆVæ6‚&VvâC'‚âV&Æ–W#‚7F&–Æ—G’—2äõB&VÆ–&ÆR&W—"â7W'&VçBÐ§&W6öÇWF–öâÖöæÇ’ó#C‚vV$tÂÖ&6¶–ærÖÆ–Ö—BW‡ÆæF–öâ—2–ç7Vff–6–VçBâ–æ—F–Ã'€¦ÆÆö6F–öâ&VÖ–ç2‡—÷F†W6—2Âæ÷B&÷fVâ6W6RâFòæ÷B6“‚6ææ÷Bf–Âà ¤6GW&S¢7GVF–òôf6RÂæò6W76–öâõ–çBÂd”Ur6÷'&V7FÇ’6Æ÷6VBö†–FFVâv—F‚¦W&ò&÷VæG2À¦æòFÖ÷7†W&RÂUbv÷&·76R'6VçBâf—6–&ÆRDôÒv—¦Öó“gƒ“bCsS2ãc’óC‚ãss°¦—G2&–v‡BVFvS“C’ãc’—26†÷'BöbV&Æ–W##D5527WFöfbâF†—2&W÷'BFöW2æ÷B6GW&P§v†W&Rf—6–&ÆRv—¦Öò—†VÇ2F—6V"âFööÆ&"DôÒö†—G2†VÇF‡“²æòf—7VÂ7V66W70¦–æfW'&VBâæ÷F†–ærF–W2fVÇBFòæWsBf–ÆÂãBfVGW&R66WFæ6R&VÖ–ç2VæF–ærà ¤æWrf–ÆRÓâT’FV'VrÓâ¶VW9röâ&VÆöBW‡Æ–6—FÇ’6fW3‚ÆVæ6‚&VfW&Væ6Ræ@¦Æ–W27W'&VçC‚â6ÖR'WGFöâ&V6öÖW2W6Ræ÷&ÖÂöâ&VÆöBFò&VÖ÷fR&VfW&Væ6Rà¤÷&–v–æÂFV×÷&'’FW7C9rõ&W7F÷&Ræ÷&ÖÂ6öçG&öÇ2&WF–æVBâFV'Vröfb÷vV†–FRæ÷p§&W7F÷&R4dTBÆVæ6‚&VfW&Væ6R†æ÷&ÖÂv†VâæöæR’Â&F†W"F†âÇv—26ÆV&–æs‚à¤FVfVÇBæ÷&ÖÂ6VC"Væ6†ævVBf÷"W6W'2v†òFòæ÷B÷B–ââÆö6Å7F÷&vRFVæ–Âð¦–çfÆ–BfÇVW2fÆÂ&6²Fòæ÷&ÖÃ²f–ÆVB6fR&W÷'FVB†öæW7FÇ’ÂæòfÇ6R7V66W72à¥6æ6†÷B–æ6ÇVFW26fVE7F'GW²FV'Vr×7F'GWæ÷r&V6÷&G2&WVW7FVB÷6fVBö&6¶–ær6—¦Rà¤æòWFöÖF–2&Æ–æ²÷&VÆöBÂ552ôuRÖ†–çBöÖVçRöv—¦ÖòövVöÖWG'’ö†—7F÷'’÷–çB6†ævW2à ¤÷&–v–æÂ6—¦–ær÷væW"&VG2&VfW&Væ6R&Vf÷&R&–æF–æs²W†—7F–ærÖ–â–ÖÖVF–FP§&W6—¦Ræ÷r&VG2–æ—F–Æ—¦VB÷væW"&WVW7BÂ6òd•%5BgVÆÂG&v–ærÖ'VffW"ÆÆö6F–öà¦6â&S‚Âæ÷B–æ—F–Ã'‚föÆÆ÷vVB'’FVÆ–VBF÷væw&FRâ6öÆW66VB6—¦–ær&VÖ–ç2öæÇ¦Æ–fV7–6ÆR÷væW"âW‡Æ–6—B6†ævR&VgW6Âv†–ÆRFööÇ2õ–çBöG&r÷&ö&W2'W7’&WF–æVBà¥FW7G2W†V7WFR7GVÂf—'7BÖ–âÆÆö6F–öâƒ3cgƒƒ#gƒÂæó'‚–çFW&ÖVF–FR’Â6fV@¦&–æF–ær&W7F'BÂ&W6WB÷vV†–FRöFVfVÇB&W7F÷&F–öâÂ7F÷&vRf–ÇW&Rö–çfÆ–BfÇVW2À¦7GVÂ'WGFöç2÷6æ6†÷BæBæV&'’f–Ww÷'BõUbõ–çBâV&Æ–6F–öâ÷&W7VÇG2&V6÷&FV@¦–âFö72÷V&Æ–6F–öâÓRæÖBâæòæF—fR—†VÂ&W—"6Æ–ÖVC²&–v‡B×&Vv–öâvFRõTâà ¤DUd”4SS¢f–æ—6‚FööÇ2Óâf–ÆRõT’FV'VrÓâ¶VW9röâ&VÆöBâ6öæf—&Ò'WGFöâ&VG0¥W6Ræ÷&ÖÂöâ&VÆöBÂF†Vâ&Vg&W6‚ôä4Râ–ç7V7B&–v‡BFööÆ&"öÖVçRöv—¦Öò–ÖÖVF–FVÇ¦æBgFW"æ÷&ÖÂæf–vF–öââ6÷’&W÷'B–bf–ÇW&R&WGW&ç3²6fVE7F'GWÇW0§&WVW7FVCö&6¶–æs3cgƒƒ#bW7F&Æ—6†W2g&W6ƒ‚ÆVæ6‚âFV'Vröfb¶VW26fVC‚âW6P¦æ÷&ÖÂöâ&VÆöB&W7F÷&W2÷&–v–æÂ&W6öÇWF–öâ–bvçFVBâæò&WVFVB66†RÖ6ÆV&–æp¦÷"–FVçF–6ÂöÆBF–væ÷7F–72&WVW7FVBãBf–ÆÂ&V†f–÷"&WF–æVC²æ÷BÖ&¶VB52à ¢22ãR6öçF–çVF–öâVF—B(	B#‚ö7Fö&W"##` ¤VF—FVB7W'&VçBÖ–âF&3sfCB‡'VçF–ÖRc“†VcS‚“²æò'VçF–ÖR6†ævW2÷"æWr'V–ÆBà¤g&W6‚Æö6ÂæöFS#Bã#"ãgVÆÂ&Vw&W76–öã¢#“#b52òd”Âò6¶—VBƒ’ãƒ2’à¤†÷7FVB&Vw&W76–öãCc#cƒ#3CC"æBvW3Cc#c“ssCc‚6ö×ÆWFVB5T44U52à¤Æ—fRfW'6–öâö–æFW‚öÖ–â÷f–Ww÷'B×6—¦–ærövW7GW&RÖFV'VrÆÂ'—FRÖÖF6‚7W'&VçBÖ–ã°§&VÆV6RÖ&¶W'2æB&Wf–WvVCR6—¦–æröFV'Vr÷&VçB–ç2w&VS²&÷FV7FVB×VÇF“ã&WF–æVBà¤W†—7F–æsBf6Rôf6Vw&÷Wõv†öÆRö&¦V7Bf–ÆÂæCR6fVB×7F'GW‚&WW6RF†V— ¦÷&–v–æÂ÷væW'2âæV—F†W"†2æWrFWf–6R66WFæ6S²&–v‡B×&Vv–öâf—6–&–Æ—G’&VÖ–ç2õTâà¤æW‡C¢DUd”4SR6fVC‚g&W6‚&VÆöBÂF†VâDUd”4SBVæ6–Âf–ÆÂö†öÆBõVæFõ&VFòà¤ö'F–âF†B&W7VÇB&Vf÷&Ræ÷F†W"7V7VÆF—fR&VæFW&–ær6†ævS²Fòæ÷B–æfW"&W— ¦g&öÒWFöÖFVB&Vw&W76–öâ÷"†VÇF‡’DôÒö†—BFW7G2âæò52–æfW'&VBg&öÒF†—2VF—Bà ¢22ãRFWf–6RfVVF&6²(	Bf–ÆÂ53²67&VVâd”Â(	B#‚ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’56W2f–ÆÂ&V†f–÷W"â&÷FV7CBf6Rôf6Vw&÷Wõv†öÆRö&¦V7Bf–ÆÂÀ¦†öÆBW‡ç6–öâÂ÷&–v–æÂ&7FW"ö–çWBö†—7F÷'’÷væW'2æB7W'&VçB66WFVBT“²æð¦æWrf–ÆÂ6†ævW2&WVW7FVBâF†—266WFæ6R7WW'6VFW2VæF–ærf–ÆÂvFW2&VÆ÷rà¥W6W"W‡Æ–6—FÇ’d”Ç267&VVâ&V†f–÷W#¢f6Vw&÷WÖVçR7F–ÆÂV×G’âGW&–ær&Vg&W6‚À¦&÷GFöÒ×&–v‡B7F'GWÖW76vW2æ÷&ÖÆÇ’6WGFÆRFòf6RÖöFRòæ÷F†–ær6VÆV7FVBò×VÇF“°¦'6Væ6RöbF†BÖW76vRÆWG2W6W"–FVçF–g’F†Rf–ÆVB&–v‡B&Vv–öâ–ÖÖVF–FVÇ’à¥F†—2—2W6VgVÂ7F'GW7–×FöÒ&Vf÷&R÷Væ–ærF†RÖVçRÂæ÷B&ööböbâV×G§6VÆV7F–öâöw&÷WÖöFVÂÂf–ÆVB7FGW2w&—FW"÷"7V6–f–2'&÷w6W"ÖVæv–æR6W6Rà¤÷&–v–æÂÖ–âçWFFU7FGW2÷vç27FGW2FW‡C²W†—7F–ær×VÇF’–æ—F–Æ—¦F–öâ6âWFFP¦—G2v÷&F–ærâ7FGW2fö÷FW"æBd”UrW6RF–ffW&VçBT’÷væW'3²æòÖ—76–ær6†&VB7F–öà¦÷"6öæf—&ÖVB6öÖÖöâÆ–6F–öâ6Æ—W7F&Æ—6†VBâæò7V7VÆF—fR'VçF–ÖRô552&W—"à¤g&W6‚6fVC‚ÆVæ6‚—2äõBfW&–f–VB'’F†—2fVVF&6²ÆöæS¢æò6fVE7F'GW÷&WVW7FVBð¦&6¶–ærF–ÖVç6–öç27WÆ–VBâ6öæf—&Òv†WF†W"¶VW‚öâ&VÆöBv2Væ&ÆVB&Vf÷&RF†P¦f–ÆVB&Vg&W6‚&Vf÷&RFV6Æ&–ærf—'7BÖÆÆö6F–öã‚F—7&÷fVââ&–÷"Æ—fS‚&V7W'&Væ6P¦æB7W'&VçB67&VVâd”Â&WF–æVC²Fòæ÷B6Æ–ÓR&W—&VBf—6–&–Æ—G’÷"&WVW7BF†P§6ÖRöÆBF–væ÷7F–72â7W'&VçB'VçF–ÖSS²æòæWr'V–ÆB÷"FW7G2–âF†—2fVVF&6²WFFRà¥W6W"æ÷r–FVçF–f–W2F†—22&Æö6¶W"f÷"F†RæW‡B&WFæB6·2v†WF†W"â–çFW&f6P§&V'V–ÆB—2&÷&–FRâ&V6öÖÖVæFVBæW‡BVæv–æVW&–ærF—&V7F–öã¢6öçG&öÆÆVB6†VÆÀ¦—6öÆF–öâ÷&V6öç7G'V7F–öâv—F‚W†—7F–ærFööÂôDôÒö7F–öâ÷væW'2Â6ÖR66WFVBV&æ6RÀ¦æBæF—fR7F'GW÷&VÆöB6ö×&—6öã²æòv†öÆW6ÆR&W6¶–â÷"GWÆ–6FR¶W&æVÇ2à¥F†—2—2&÷÷6ÂÂæ÷B–×ÆVÖVçFVB÷"6Æ–ÖVBFòwV&çFVR&VæFW&–ær&W—"à ¢22ãb(	B6öçG&öÆÆVB6†VÆÂ6ö×&—6öâv—F‚–âÖFW7BÆ—7B(	B#‚ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’WF†÷&—¦W2öæW‡F'V–ÆBæB&WV—&W2–ç7G'V7F–öç2”å4”DRF†R §7v—F6†–ærv’Fò6†B6â†VÂF†RæF—fRfVÇBæB–çfÆ–FFW2ö'6W'fF–öâà¤VF—FVBÖ–âs#c–2÷'VçF–ÖSc“†VcS‚Âv÷&¶fÆ÷rögVÆÂ†æFöfbö6†V6¶Æ—7B÷&öFÖæ@§&V6VçB†—7F÷'’ÂÆ—fSRÖ&¶W'2÷–ç2æB7GVÂ6çf2õT’õd”Urö–çWB÷–çBÖ÷fW&Æ¦÷væW'2âæò6ö×&—6öâ'VææW"W†—7FVBãBf–ÆÂW6W"52&VÖ–ç2&÷FV7FVC°£R67&VVâd”Â—2&WF&Æö6¶W"âæòW&ÖæVçB&VæFW&–ær&W—"6Æ–ÖVBà ¤æWrf–ÆRâ67&VVâ6ö×&—6öâòFW7BÆ—7BâF—&V7BFW7BU$Ç2W6R6†VÆÅFW7CÖ7W'&Vç@¢„’÷"6†VÆÅFW7C×6W&FVB„"’âFVfVÇBVçG'’¶VW2W†—7F–ær7G'V7GW&S²FW7BVçG'¦÷Vç24ÔRÆVgB6†V6¶Æ—7B&Vf÷&RÖöFVÆÆ–ærÖöGVÆW2W†V7WFRÂ–æ6ÇVF–æröâ&VÆöBà¤"ÆöæRÖ÷fW24ÔR÷&–v–æÂ7f–Ww÷'B6çf2–çFò6&÷†Æ$6ö×&—6öä6çf57W&f6RÀ¦6–&Æ–ær–ÖÖVF–FVÇ’&Vf÷&R÷&–v–æÂ7f–Ww÷'Ew&v—F†–â6â6çf2æBT’æ÷p¦†fR6W&FRf–Ww÷'B7W&f6W2â6ÖRf–Ww÷'BF–ÖVç6–öç2÷F÷&"öfg6WG2Â6ÖP¦6çf2”BöÆ—7FVæW'2ö&6¶–ær×6—¦R÷væW"÷&VæFW&W"öÖöFVÂö†—7F÷'’÷6VÆV7F–öâ÷FööÂæöFW2à¤÷&–v–æÂT’w&W"7F—2–âÆ6S²G&ç7&VçBö–çFW"×72×F‡&÷Vv‚V×G’76RÀ¦7GVÂ6öçG&öÇ2æBUb6çf2&VÖ–â–çFW&7F—fS²÷&–v–æÂv—¦Öò5dr†—B&÷†–W0¦æBæöæ–çFW&7F—fR&ö÷B÷7FGW2&WF–âF†V—"÷vâ'VÆW2âæò&Ææ¶WB&W&VçF–ærö`¥T’ÂW‡G&6çf2÷&VæFW&W"ÂuR†–çG2Âf÷&6VB&W–çB÷"æWrvW7GW&R÷væW"â÷&–v–æÀ¥–çB–ÖvR÷fW&Æ’föÆÆ÷w26çf2&VçBæBÖF6†–ærf–Ww÷'B6ö÷&F–æFW2à ¤ô"6†ævW2öæÇ’öâU…Ä”4•BgVÆÂ&VÆöC²æòÆ—fR&öf–ÆR7vF†B6÷VÆB†VÀ¦f–ÇW&R&Vf÷&R6ö×&—6öââ–âÖ7F'GW÷7FGW2÷FööÆ&"Âd”Urf6Vw&÷W2Âv—¦Öð§&–v‡B6–FRÂUbVF—F÷"&WGW&âæB–çB&WGW&âöæf–vF–öâ6†V6·2†fR52ôd”ÂÀ¦æ÷FW2Â6öÆÆ6RõFW7BÆ—7BÂW"×&öf–ÆR6ö×ÆWFVBöf–ÆVB6÷VçG2æB6÷’&W7VÇG2à¤–æ—F–Â÷&FVB×Vç6WBÆöG2æWfW"&V6öÖR76W2âf—'7Bf–ÇW&R7F—2&V6÷&FVBWfVà¦–b7FW—2&W&FVC²Wf–FVæ6R&VG2÷&–v–æÂFV'Vr6æ6†÷Bv—F†÷WBVæ&Æ–ær—BÀ§v—F†÷WB&Vg&W6‚Â&÷VæFVBf–VÆG2öæÇ’â7GVÂ552ö&6¶–ærôE"÷&WVW7FVB÷6fVB7F'GW §&W6öÇWF–öâ&V6÷&FVBv—F‚V6‚&F–ærâæòWFöÖF–2&W6öÇWF–öâ6†ævRâ¶VW6ÖP§&W6öÇWF–öâö÷&–VçFF–öâöFVfVÇB7V&R–â&÷F‚&öf–ÆW3²–ÓR6ö×ÆWFVBÆöG2V6‚à ¤Æ7C3ÆöG2W'6—7BÆö6ÆÇ’VæFW"&÷†Æ"ç6†VÆÂÖ6ö×&—6öâçcÂ'V–ÆB×FvvVBö&÷VæFVBà¥7F÷&vRFVæ–Âö6÷''WF–öâöæòÖ÷w&—FW2†æFÆVB†öæW7FÇ“²f–ÆVBW'6—7FVæ6R&VgW6W0¦–âÖ&VÆöBÂ6÷’†26VÆV7F&ÆR–â×æVÂfÆÆ&6²â&ö¦V7B×W7B&R6fVBf—'7C ¦W‡Æ–6—BG&ç6–VçBF—66&B6¶æ÷vÆVFvVÖVçBæB÷&–v–æÂ'W7’×7FFRwV&G2&V6VFP¥&VÆöBõ7v—F6‚ôW†—Bâ66VæRVF—G2&RäõBG&ç7÷'FVB7&÷72&VÆöC²æòWF÷6fRÀ§&ö¦V7B÷66†VÖö†—7F÷'’×WFF–öâ÷"WFöÖF–2&W6WBâW†—B&VÖ÷fW2FW7BVW'’öâæW‡@§&VÆöC²FVfVÇBæ÷&ÖÂ&WGW&ç2æB&W7VÇG2&WF–æVBâæò7v—F6†–æræVVFV@§VçF–Â6ö×ÆWFVB&W7VÇG2&R6÷–VBâU$Ç27W'f—fR÷&–v–æÂ&VÆV6RÖ66†R&V6÷fW'’à ¤6†ævVB'VçF–ÖRöæÇ’äUr6†VÆÂÖ6ö×&—6öâæ§2ô552æB÷&–v–æÂ…DÔÂ÷&V6÷fW'’¶W—3c°¦ÆÂW†—7F–ærÖöFVÆÆ–ærõ–çBôf–ÆÂöÖ–ãR÷6—¦–æsRöFV'VsRõd”Us““‚ô×VÇF“ãæ@¦g&÷¦Vâ&WF'—FW2÷–ç2&WF–æVBâ&Wf–WvVB76WB6öçG&7BFG2GvòæWrW†7B76WG3°¦æò&Ææ¶WB&W–ææ–ærâæ–æRæWr7GVÂÖ÷væW"FW7G2ÇW3CæV&'’6†V6·3£Sfö7W6V@¥52Âæòf–ÇW&W2÷6¶—2âgVÆÂÆö6Ã#“3R52ód”Âó6¶—ƒ"ãS2’à¥V&Æ–6F–öâ&W7VÇG3¢Fö72÷V&Æ–6F–öâÓbæÖBà¤Æö6Â'&÷w6W"W†V7WF&ÆR–ç7FÆÆF–öâVæf–Æ&ÆR†F÷væÆöBv2æ÷BfÆ–B¦—“°¦æòÆö6Â&VæFW&VB÷"æF—fR•B7V66W72–æfW'&VBg&öÒæöFRôDôÒFW7G2à ¤DUd”4Sc¢6fR&VÂ&ö¦V7Bâf–ÆRâ67&VVâ6ö×&—6öâòFW7BÆ—7Bâ6¶æ÷vÆVFvP§FW7B66VæRF—7÷6&ÆRâ7F'B7W'&VçB²&VÆöBâföÆÆ÷rÆ—7C²&FR7F'GW$Tdõ$P¦÷Væ–ærÖVçW2ö6öÆÆ6–ærâ6ö×ÆWFR6†V6·2Â&VÆöB6ÖR6†VÆÂWFóRÆöG2Â7v—F6‚ ¦æB&WVBv—F†÷WBÆVf–ær'&÷w6W"÷"6†æv–ær&W6öÇWF–öââ&V6÷&Bd”Â–ÖÖVF–FVÇ“°¦–ÓRV6‚ÂÖ’7v—F6‚V&Ç’öâf–ÇW&Râ6÷’&W7VÇG2eDU"FW7F–ærÂF†Vâ6VæB6†Bà¤æF—fRf—6–&–Æ—G’vFR&VÖ–ç2õTã²Fòæ÷B–æfW"gVÆÂ&WF&VF–æW72g&öÒöæRvöö@§'Vâ÷"6Æ–Ò6çf2õT’6W&F–öâ&÷fVBâVæv–æR6W6Râ–b&÷F‚f–ÂÂ&VGV6R6†VÆÀ¦gW'F†W"g&öÒWf–FVæ6R&F†W"F†âv†öÆW6ÆR&W6¶–â÷"&WVFVB6÷6ÖWF–2F6†W2à ¥V&Æ—6†VB'VçF–ÖS&c#6Sƒ#f#–Cv3C&V6S–fcƒ&c&ƒ6SBÂFW7FVB÷WÆöFVBG&VP¦C“ƒVSSƒ#–#ƒCƒ66&#ƒFSVcSC–6cƒSƒ“sFB†ÆÃ&Æö"†6†W2ÖF6†VB&Vf÷&RFöÖ–0¦æöâÖf÷&6VBÖ–âWFFR’âfWF6†VBÖ–â÷G&VRfW&–f–VC²vW3Ccc3CCcSc’æB†÷7FV@§&Vw&W76–öãCcc3CCsScB5T44U52âV–v‡BÆ—fR&VÆV6R÷6†VÆÂöæWr76WG2öÖ–â÷6—¦–ærð§&V6÷fW'’f–ÆW2'—FRÖÖF6‚Æö6Ââf—fRf–æÂ&VÆV6RÖ6öçG&7B6†V6·252à¤6Æ÷VB6‡&öÖRT’ÖöæÇ’6Öö¶R6öæf—&×2&VæFW&VB6†V6¶Æ—7BÂ&F–æröæ÷FW2W'6—7FVæ6P¦7&÷727GVÂ(i$"&VÆöBÂ6÷–VBÆörÂW†7B6†&VBf–Ww÷'B&÷VæG2æB6VçG&RÖ6çf0¦†—B&÷WF–ærÂ÷&–v–æÂ4TÄT5BæBf—6–&ÆRf6Vw&÷W26WGF–æw2âvV$tÂF—6&ÆVB–âF†—0¦'&÷w6W"f÷"&÷F‚öÆCRæCbÂ6òäò6Æ÷VBÖöFVÆÆ–æröæF—fR•B&W—"&ööbà£bÄ•dRæB&VG’f÷"FWf–6R6ö×&—6öã²67&VVâ&WF&Æö6¶W"&VÖ–ç2õTâà ¢22ãr(	BVæ&Æö6²Ub&6²Fò4B&VæVF‚6ö×&—6öâ6†V6¶Æ—7B(	B#‚ö7Fö&W"##` ¥W6W"6ææ÷B6ö×ÆWFRw2Ub&WGW&â6†V6³¢F†RÆVgB6†V6¶Æ—7B6÷fW'2÷&–v–æÂ&6°§Fó4BÂ–æ6ÇVF–ær—G26öÆÆ6VB†VFW"âF†—2—26†V6¶Æ—7B×Æ6VÖVçBf–ÇW&RÂæ÷@¦æF—fR&VæFW&–ær66WFæ6Röf–ÇW&RâVF—FVB7W'&VçBÖ–ãCsFc÷'VçF–ÖS&c#6Sƒ"À¦gVÆÂ&WV—&VBFö7VÖVçG2æB÷&–v–æÂUbv÷&·76Ræ†–FFVâô&6²6ÆÆ&6²÷væW'6†—à ¤öæÇ’v†–ÆR÷&–v–æÂ6&÷†Æ%Uev÷&·76R—2äõB†–FFVâÂ6†&VBô"6†V6¶Æ—7B&·0¦–âÆ÷vW"ÖÆVgB&WGvVVãSGf‚æB&÷GFöÓC‚÷6fR–ç6WBâW‡æFVBæB6öÆÆ6VBÆ—7@¦&÷F‚6ÆV"F†RWW"UbFööÆ&"â÷&–v–æÂUb†–FFVâ7FFRG&—fW2552¦†3²6Æ÷6–æp§&WGW&ç2÷&–v–æÂWW"Æ6VÖVçBâæòö'6W'fW"÷öÆÆ–ærÂf–Ww÷'B&W6—¦RÂ6çf2öÖöFVÂð¦VF—F÷"ô&6²÷væW"ÖöF–f–6F–öâ÷"WFöÖF–2F—7Æ’&V6÷fW'’â&÷F‚&öf–ÆR7G'V7GW&W2À§&VæFW&W"&W6öÇWF–öâÂ÷&–v–æÂFööÂ”G2öÆ—7FVæW'2ö†—7F÷'’Âf–ÆÂ52æB×VÇF“ã&WF–æVBà¤–âÖUb7FWW‡Æ–ç2F†RFö6¶–æs²6öÆÆ6R&VÖ–ç2f–Æ&ÆRf÷"W‡G&&ööÒà £rÆör&VFW"66WG3b&V6÷&G2æB7F×2F†V—"÷&–v–æÂ&VÆV6RÂ&W6W'f–æp§'F–Â&F–æw2Âæ÷FW2æBf—'7BÖf–ÇW&RWf–FVæ6RW†7FÇ’âæWsrÆöB—26W&FP¦æBVç&FVC²æWfW"6÷’V&Æ–W"76W2–çFòg&W6‚7F'GWâ6ÖR&÷VæFVB¶W“3ÆöG2À¦æòÆör6ÆV&–ærãr6†VÆÂöæWr67&—Bô552÷&V6÷fW'’–ç2æB†6†W2&Wf–WvVBà£3Bfö7W6VB6†V6·252ód”Âó6¶—¢6ö×&—6öâ÷W'6—7FVæ6RöÖ–w&F–öâÂ÷&–v–æÂU`§v÷&·76Rô&6²öæf–vF–öâ÷F÷ÖÆ–W"Æ–fV7–6ÆRÂd”UræB&VÆV6R6öçG&7G2â7–çF‚öF–f`¦6ÆVââæòæWrgVÆÂÆö6Â7V—FR6Æ–Ó²&–÷#bgVÆÃ#“3R&VÖ–ç2†—7F÷&–6ÂWf–FVæ6Rà¥V&Æ–6F–öâWf–FVæ6S¢Fö72÷V&Æ–6F–öâÓræÖBâ67&VVâ&WFvFR&VÖ–ç2õTâà ¤DUd”4Ss¢&V÷VâUbVF—F÷#²gVÆÂ6†V6¶Æ—7B6†÷VÆB&²Æ÷vW"ÖÆVgBÂ&6²Fó4@§f—6–&ÆRö6Æ–6¶&ÆRBF÷â6öÆÆ6R÷&V÷VâÆ—7BÂ&6²ÂF†Vâ6†V6²6ÖR"fÆ÷râW†—7F–æp£b&F–æw2&VÖ–â–â6÷’&W7VÇG3²7V'6WVVçBÆöG27F'BæWrVç&FVBVçG&–W2à¥&W7VÖRô"6ö×&—6öâ–âÂ¶VW–ær&W6öÇWF–öâVæ6†ævVBâæò&WVFVBf–ÆÂFW7Bà ¢22ã‚(	B†öæW7B'Vææ–ærfW'6–öâ²W‡Æ–6—B6†V6¶Æ—7B†–FRöFö6²(	B#‚ö7Fö&W"##` ¥W6W"67&VVç6†÷BT4#“3dbÔc3S’ÓD2Ô$3ÓDC“ƒƒc“„"çær6†÷w2f—6–&ÆSrÂÀ¥UbVF—F÷"Â6†V6¶Æ—7B7F–ÆÂWW"ÖÆVgB6÷fW&–ær&6²Fó4Bâ7F'GWõd”Uröv—¦Öð¥52'WGFöç2&R6VÆV7FVBf÷"F†Bö'6W'fVB'Vã²Ub&Æö6¶VBÂæ÷B6ö×÷6—F÷"d”Âà¤Fòæ÷B6²f÷"æ÷F†W"–FVçF–6Â67&VVç6†÷B÷"&WVB66†R6ÆV&–ærà ¤VF—Bf÷VæB6öæ7&WFRfW'6–öâÖ÷væW"FVfV7C¢&Vg&W6‚‚’7F×VBæWGv÷&²fW'6–öâæ§6öà¦ÆFW7B–çFòÆ&VÂ÷F—FÆRöâvW6†÷r÷f—6–&–Æ—G–6†ævRv—F†÷WBÆöF–ærF†B&VÆV6Rà¥F‡W2f—6–&ÆSrÄôäRF–Bæ÷B&÷fSr6†VÆÂ÷67&—Bô552âöÆBUb–ç7G'V7F–öâFW‡@¦–â67&VVç6†÷B—26öç6—7FVçBv—F‚öÆFW"6†V6¶Æ—7B6öFS²552¦†2f–ÇW&R—2äõ@¦W7F&Æ—6†VBâ&V6÷&B÷WF6öÖR2W6W"&Æö6¶VBÂæ÷B&ööböbvV$¶—B6VÆV7F÷"f–ÇW&Rà ¤÷&–v–æÂ&VÆV6R×fW'6–öâæ÷r&WF–ç2ÆöFVB…DÔÂFF×&VÆV6R×fW'6–öâöâ&Vg&W6ƒ°¦æWGv÷&²ÆFW7BW‡÷6VB6W&FVÇ’–â÷&–v–æÂ’æÆFW7BâæòWFöÖF–2&VÆöBö†VÀ¦÷"æWrWFFW"â÷&–v–æÂ7F'GW&VÆV6RÖ&ö÷G7G&&V6÷fW'’&WF–æVBâVF—FVB6V6öæ@§&VÆV6R–×÷'BVæFW"f6R×v÷&¶fÆ÷rÖÆ–÷WC“3S²&W–â4ÔR&VÆV6R÷væW"Fó‚6ð¦&÷F‚F—&V7BöæW7FVB–×÷'G2&W6öÇfRFòöæRÖöGVÆRU$ÂÂÇW2&VçBÆ–÷WBöG&vW"66†P¦6Æ÷7W&RâöæÇ’–×÷'BÖ¶W’6†ævW2–âÆ–÷WBöG&vW#²æòT’÷FööÂ&V–×ÆVÖVçFF–öâà ¤6†V6¶Æ—7BF—FÆRæB6ÖÆÂ&V÷Vâ'WGFöâ&¶RF†V—"õtâã‚6öFR7F×Â–æFWVæFVç@¦öböæWGv÷&²Æ&VÂâW‡Æ–6—B†–FRÆ—7B6ö×ÆWFVÇ’†–FW2÷&–v–æÂ6V7F–öã²6ÖÆÀ¦ÆVgBÖ6VçG&RDU5BÄ•5Bã‚&V÷Vç2gVÆÂÆ—7BÂ&W6W'f–ær&W7VÇG2öæ÷FW2â&÷F‚&öf–ÆW0¦–FVçF–6Â6öçG&öÇ2â–âÖUb–ç7G'V7F–öç2W‡Æ–â†–FRâ×66÷VB×WFF–öäö'6W'fW §&VG27GVÂ÷&–v–æÂUbv÷&·76R7&VF–öâö†–FFVâ7FFRæB6WG2–æÆ–æRÆ÷vW"ÖÆVg@¦Fö6³²öâ6Æ÷6R6ÆV'2–æÆ–æRFö6¶–ærâæò¦†2FWVæFVæ7’÷öÆÆ–ær÷&r×ö–çFW"÷væW"À§f–Ww÷'B&W6—¦RÂ&VæFW&W"÷"ÖöFVÂö†—7F÷'’õUbô&6²÷væW"6†ævW2âö'6W'fW"'6Vç@¦–âæ÷&ÖÂVæ÷VæVB'VææW"Â7F÷2öâ†–FR÷vV†–FRæB&W7VÖW2öâ&V÷Vâ÷vW6†÷rà¥&WF–ãbórÆöw2v—F‚÷&–v–æÂW"×'Vâ&VÆV6S²æWs‚ÆöB&VÖ–ç2Vç&FVBà £3rfö7W6VB6ö×&—6öâõUb÷F÷ÖÆ–W"÷&VÆV6R6†V6·252Â–æ6ÇVF–æræWr7GVÂÖ÷væW ¤†–FR÷&V÷VâöFö6²öÆ–fV7–6ÆRÃr&÷fVææ6RÂ6æöæ–6ÂÆöF–æræBöÆB×6†VÆÂöæWr×6W'fW §&WGW&â&V†f–÷"â7–çF‚÷v†—FW76R6ÆVââgVÆÂ×7V—FR÷V&Æ–6F–öâWf–FVæ6RföÆÆ÷w2–à¦Fö72÷V&Æ–6F–öâÓ‚æÖBâ&÷FV7FVBf–ÆÂô×VÇF’ög&÷¦Vâ÷'VçF–ÖRÖöFVÆÆ–ærVæ6†ævVBà ¤DUd”4Sƒ¢'&÷w6W"&VÆöBöæ6S²4„T4´Ä•5B„TDU"—G6VÆb×W7B6’ã‚â&V÷VâU`¤VF—F÷"–â²6†V6¶Æ—7B&·2&VÆ÷rFööÆ&"â†–FRÆ—7B×W7B&WfVÂÄÂWW"6öçG&öÇ3°¤&6²Fó4BW6W2÷&–v–æÂ'WGFöââDU5BÄ•5B&V÷Vç2&F–æw2ÂV&Æ–W#bór&V6÷&G0§&VÖ–â–â6÷’â6ÖR"6†V6³²&W7VÖR6ö×&—6öââ7W'&VçBUb&Æö6²&VÖ–ç2VæF–æp¦æF—fR&WFW7C²÷&–v–æÂ67&VVâ&WF&Æö6¶W"õTâÂæòW&ÖæVçB—†VÂ&W—"6Æ–ÖVBà ¢22ã‚æF—fR6ö×&—6öâ&W7VÇG2(	B#‚ö7Fö&W"##` ¥W6W"7WÆ–VB6÷’&W7VÇG2C##bÓÓ#…C£C£ãS¢ƒ#£C'&—6&æR’à¤ö7W'&VçC£b6ö×ÆWFRã‚'Vç3£"ÆÂÖf—fRd”ÂÃBÆÂÖf—fR53³FF—F–öæÀ§Vç&FVBã‚ÆöBW†6ÇVFVBâ"÷6W&FVC£R6ö×ÆWFRÆÂÖf—fR52Ãd”Ã°£f÷W"ÖöbÖf—fR52…–çBVç&FVB’æCVç&FVBÆöBW†6ÇVFVBg&öÒ6ö×ÆWFR6÷VçBà¤öÆFW"ãb'F–Â÷Vç&FVB&V6÷&G2W†6ÇVFVBâ&÷FV7BF†R&W÷'FVB52ö'6W'fF–öç0¦f÷"F†÷6R'Vç3²F†W’Fòæ÷BW&6Rf–ÇW&W2÷"W7F&Æ—6‚W&ÖæVçB67&VVâ&W—"à¥6VRFö72÷6†VÆÂÖ6ö×&—6öâ×&W7VÇG2Ó‚æÖBf÷"'Vâ”G2ÂVF—BæBæW‡BvFRà ¤&÷F‚&öf–ÆW2&W÷'C3cgƒƒƒb552f–Ww÷'BÂE#"Ã3cgƒƒ#b6çf2552ö&6¶–ærÀ§&WVW7FVCæB6fVE7F'GWâf–ÆVBGv–6RgFW"6fVC‚7F'GW¢f—'7BÖÆÆö6F–öà£‚—2äõB7Vff–6–VçB&WfVçF–öââ6çf2&VçBf–Ww÷'Ew&²"&Vç@¦&÷†Æ$6ö×&—6öä6çf57W&f6R6öæf—&×27GVÂ7G'V7GW&Â7v—F6‚v—F†÷WBF–ÖVç6–öç0¦6†ævRâf—'7BÖf–ÇW&R6æ6†÷B—25D%EU¢6Æ÷6VBd”Urò†–FFVâv—¦ÖòF†W&R&P¦W‡V7FVB7FFW2ÂäõB&ööbF†÷6RæöFW2vW&R–æ6÷'&V7FÇ’†–FFVâBÆFW"6†V6·2à ¤ÆÂæWrö'6W'fF–öç26’6†V6¶Æ—7E&VÆV6S‚'WB6†VÆÅ&VÆV6SCSâVF—FVBÆ—fRÖÖ–à§6÷W&6S¢7&2÷66VæRÖö&¢ÖW‡÷'BÓ#3‚æ§2Æ–æW3RÓ†&F6öFSCSæB÷fW'w&—FR$õD‚Æ&VÀ§FW‡BæBFF6WBç&VÆV6UfW'6–öââF†RF–væ÷7F–2&VG2F†B×WF&ÆRFF6WC²F†W&Vf÷&P£CS—26öçFÖ–æFVBÖWFFFÂäõBWf–FVæ6RâöÆCCS…DÔÂ6†VÆÂv2ÆöFVBâã€§'Vææ–ær×6†VÆÂ–FVçF—G’f—‚—2–æ6ö×ÆWFS¢&VÆV6R×fW'6–öâ6â6GW&R6öçFÖ–æFV@¦FFFWVæF–æröâÖöGVÆR÷&FW#²7W'&VçBFW7BöæÇ’6÷fW'2FW‡B÷fW'w&—FRÂæ÷BFF6W@¦×WFF–öâ'’F†R&VÂW‡÷'FW"âæW‡Bæ'&÷r'VçF–ÖRv÷&²×W7B&VÖ÷fR6V6öæF'’&VÆV6P§w&—FW2÷W6Râ–Ö×WF&ÆR–æ—F–Â6†VÆÂ–FVçF—G’æB&Vw&W76–öâ×FW7BF†R7GVÂw&—FW"à¤Fòæ÷B6†ævRô$¢vVöÖWG'’öW‡÷'B&V†f–÷"÷"6²f÷"&WVFVB66†R6ÆV&–ærà ¤FV6—6–öã¢"—2&öÖ—6–ærÂæ÷B&÷fVââf–ÆVBF†Vâ†CB†VÇF‡’'Vç2$Tdõ$R#°§F–ÖRö÷&FW"6öæf÷VæF–ær&WfVçG2GG&–'WF–ær"†VÇF‚6öÆVÇ’Fò6W&F–öââ¶VW&WF§67&VVâvFRõTââæW‡BæF—fRvFS¢–çFW&ÆVfRô"F‡&÷Vv‚÷&–v–æÂ–âÖ&VÆö@¦6öçG&öÇ2‡6ÖS‚ö÷&–VçFF–öâöFVfVÇB7V&S²7F'GWf—'7B’ÂF†Vâ"æf–vF–öâ÷6VÆV7F–öâð¦v—¦ÖòõUbõ–çBõVæFõ&VFò÷6fRÖ÷Vâ&—G’&Vf÷&RF÷F–ær"2FVfVÇBâæòv†öÆW6ÆP¦–çFW&f6R&W6¶–â÷"GWÆ–6FRFööÂ÷&VæFW&W"ö¶W&æVÂâæòFF—F–öæÂ'VçF–ÖR6†—VB–à§F†—2fVVF&6²6W76–öã²ã‚&VÖ–ç2Æ—fRâæòFW7G2&W'Vâf÷"Fö7VÖVçFF–öâöæÇ’à ¢22ã’(	B–Ö×WF&ÆRÆöFVB×6†VÆÂ–FVçF—G“²ô$¢&VÆV6Rw&—FW"&VÖ÷fVB(	B#‚ö7Fö&W"##` ¤&6VÆ–æRÖ–â6cVc†Frò'VçF–ÖS–#s663ÂÆ—fS‚Ö&¶W'2æBW†—7F–ær–ç2VF—FVBà¤÷&–v–æÂ6Æ76–2†VB&VÆV6RÖ&ö÷G7G&6GW&W2F†R–æ—F–Â…DÔÂF—FÆR7–æ6‡&öæ÷W6Ç¦2æöâ×w&—F&ÆRöæöâÖ6öæf–wW&&ÆRõö&÷†Æ$ÆöFVE6†VÆÅfW'6–öâ$Tdõ$R6ö×&—6öâæ@¦ÖöFVÆÆ–ærÖöGVÆW2âW†—7F–ær&VÆV6R×fW'6–öâ&VfW'2F†BfÇVRÂ&W7F÷&W2&÷F‚Æ&VÀ§FW‡BæBFF×&VÆV6R×fW'6–öâæBö'6W'fW2F†BGG&–'WFS²V&Æ–27F×6ææ÷BF÷@¦â&&—G&'’fW'6–öââfW'6–öâæ§6öâ&VÖ–ç2f–Æ&ÆRÖÆFW7BöæÇ’âW†—7F–ær7F'GW ¦66†R×&V6÷fW'’÷&WG'’æB×&WGW&â&V†f–÷"&WF–æVC²æòæWrWFFW"÷&W–çB÷væW"à ¥&VÖ÷fRôäÅ’6V6öæF'’Æ&VÂöFF6WB÷F—FÆRw&—FW2g&öÒ66VæRÖö&¢ÖW‡÷'BÓ#3‚à¤—G2–çFW&æÃCS7F×Âô$¢†VFW'2öf–ÆVæÖW2ôÔ”ÔRÂ&6Rõ7V$BvVöÖWG'’÷&VfÆ–v‡BÀ§6÷W&6Rö†—7F÷'’æBWfVçB&÷WF–ær&VÖ–âVæ6†ævVBâ÷&–v–æÂ6ö×&—6öâ&VG2–Ö×WF&ÆP§6†VÆÂ–FVçF—G’Â7F×2W†V7WFVC’–æFWVæFVçFÇ’Â&W6W'fW3bóró‚&V6÷&G2À§&F–æw2öæ÷FW2öf—'7Bf–ÇW&W2W†7FÇ’ÂæB7F'G2g&W6‚Vç&FVC’ÆöG2â–âÖwV–Fæ6P¦æ÷r6—2ÇFW&æFRô"v—F‚÷&–v–æÂW‡Æ–6—B&VÆöB6öçG&öÇ2Â6ÖS‚ö÷&–VçFF–öâö7V&Rà¤æV—F†W"&öf–ÆR7G'V7GW&Ræ÷"FVfVÇB6†ævW3²æò—†VÂ&W—"öæF—fR526Æ–ÖVBà ¥&Wf–WvVC’66†R6Æ÷7W&S¢&ö÷G7G&÷&VÆV6Rö6ö×&—6öâÂ6æöæ–6ÂF—&V7B¶æW7FVBô$ ¦æB—G26öæf÷&Öæ6R&VçBÂ6æöæ–6ÂF—&V7B¶æW7FVB&VÆV6RæBÆ–÷WBöG&vW"&VçG2à¤553‚&WF–æVBVæ6†ævVBâ&÷FV7FVB×VÇF“ãÂg&÷¦Vâ&WF2ÂÖ–â÷6—¦–æröFV'VrÂ÷&–v–æÀ¤f–ÆÃB52æB66WFVBÖöFVÆÆ–ærõ–çBõUb÷væW'2VçF÷V6†VBâ&Wf–÷W3‚E52ó$d”À¦æB#U52ö'6W'fF–öç2&VÖ–â&÷FV7FVBf÷"D„õ4R'Vç3²&WF67&VVâvFR7F—2õTâà £C‚fö7W6VB6†V6·252ód”Âó6¶—âf—fRæWr6†V6·26÷fW"7GVÂW‡÷'FW"&Vf÷&RögFW §&VÆV6R–æ—F–Æ—¦F–öâÂ&6Rõ7V$B÷WGWBWVÆ—G’÷6÷W&6R—6öÆF–öâÂV&Ç’–Ö×WF&ÆP¦6GW&RÂGfW'6&–ÂÖWFFF²Öæ–fW7BööffÆ–æR&WGW&ç2Â6ö×&—6öâ–FVçF—G’æBW†7@£‚Wf–FVæ6R&WFVçF–öââ&R×'Vææ–æræWrW‡÷'FW"&Vw&W76–öâv–ç7B&RÖf—‚w&W ¦f–Ç22W‡V7FVBâW†—7F–ær6æöæ–6ÂÖÆöFW"FW7G2föÆÆ÷r&Wf–WvVC’–ç3²æò6VÖçF–0§&÷FV7F–öâ&VÖ÷fVBâgVÆÂÆö6ÂæöFS#Bã#"ã£#“CR52ód”Âó6¶—ó6æ6VÂƒrãcw2’à¥V&Æ–6F–öâ&ööc¢Fö72÷V&Æ–6F–öâÓ’æÖBà ¤DUd”4S“¢f—6–&ÆRæB6†V6¶Æ—7B&÷Fƒ“²6÷’7W'&VçBVçf—&öæÖVçBöæWr&FV@¦ö'6W'fF–öç26†VÆÅ&VÆV6S’ÂöÆC‚ö'6W'fF–öç3CS&VÖ–â†—7F÷&–6Â†Fòæ÷B&Ww&—FR’à¤ÇFW&æFRô"–ç6–FRv—F†÷WB×7v—F6‚÷&V6÷fW'’Â7F'GWd•%5C²&WF–â&W6öÇWF–öà¦æB÷&–VçFF–öââ÷&–v–æÂ6†V6¶Æ—7B†–FRõUb&6²õ–çBFöæR7F–ÆÂW6&ÆRâföÆÆ÷rv—F‚ §6VÆV7F–öâöæf–vF–öâöv—¦ÖòõUbõ–çBõVæFõ&VFòõ6fT÷Vâ&—G’&Vf÷&RFVfVÇBF÷F–öâà¤æW‡B7Böâ–çFW&ÆVfVBæF—fRWf–FVæ6S²æò7V7VÆF—fR6ö×÷6—F÷"÷"T’&W6¶–â6†ævRà ¢ã’V&Æ–6F–öâfW&–f–VC ¥V&Æ—6†VB'VçF–ÖSS3F3C3#s“fCsV#“3C#CF&#c336#3CSVC3“3²W†7BFW7FVB÷WÆöFV@§G&VS#6#C633†#cC–#3sF63“3FcC†sSCc–VCc’âÆÃ‚&Æö"†6†W2fW&–f–VB&Vf÷&P¦FöÖ–2æöâÖf÷&6VBW‡V7FVBÖÖ–âWFFS²fWF6†VB÷&–v–âöÖ–âæBG&VRÖF6‚Æö6Âà¥vW3Ccƒ3“#sr6ö×ÆWFVB5T44U52âæ–æR66†RÖ'W7FVBÆ—fRf–ÆW2'—FRÖÖF6ƒ §fW'6–öâæ§6öâÆ–æFW‚æ‡FÖÂÇ&VÆV6RÖ&ö÷G7G&Ç&VÆV6R×fW'6–öâÇ66VæRÖö&¢ÖW‡÷'BÓ#3‚À§6†VÆÂÖ6ö×&—6öâÆF—&V7B×F÷öÆöw’Ö6öæf÷&Öæ6RÖwV&BÆG&vW"×V’Æf6R×v÷&¶fÆ÷rÖÆ–÷WBà¤f–æÂ&VÆV6R¶–FVçF—G“’6†V6·252âgVÆÂÆö6Ã#“CR52ód”Âó6¶—ó6æ6VÃ°¦†÷7FVCCcƒ3“#ssCR–å÷&öw&W72BV&Æ–6F–öâ&ööb†æò†÷7FVB526Æ–ÖVB’à£’Ä•dRõ$TE’f÷"fW'6–öâ×&W÷'F–æröæF—fR6ö×&—6öâFW7G2âæòæF—fRvV$¶—@§&VæFW&–ær&W—"÷"FWf–6S’52–æfW'&VC²&WF67&VVâvFR&VÖ–ç2õTâà ¢22ã(	Bg&VR÷&&—BæBF‡&VRÖf–ævW"Æ–v‡Bò''W6‚6öçG&öÇ2(	B#’ö7Fö&W###` ¤&6VÆ–æRÖ–ã†Sc&#‚÷'VçF–ÖSS3F3C3"ÂÆ—fS’âW6W"W‡Æ–6—FÇ’&WVW7G2g&VR÷&&—BÀ¦–æW'F–Ã2Öf–ævW"†÷&—¦öçFÂÆ–v‡B&÷FF–öâÅ–çBfW'F–6Â6—¦R²7G&ö¶R&Wf–WrÀ¦Æ&vW"''W6‚æBÖ÷&R7FæF&BF—2âF†—2WF†÷&—¦W26†æv–ærf÷&ÖW"W&–v‡B÷&&—@¦&V†f–÷#²æòVç&VÆFVBÖöFVÆÆ–ær÷"T’6ÆVçWâVF—B÷&–v–æÂÖ–âF÷V6‚÷F÷væW"À¥F‡&VSãs’ã÷&&—D6öçG&öÇ2Å7GVF–òÆ–v‡BÖævÆR÷væW#“’æB&öGV7F–öâ–çBöÇ†à ¤g&VT÷&&—D6öçG&öÇ27V&6Æ76W24ÔRF‡&VR6öçG&öÆÆW#²öæÇ’&÷FF–öâÖF‚&V6öÖW0¦6ÖW&×&VÆF—fRVFW&æ–öâGVÖ&ÆR7&÷72&÷F‚öÆW2Â–æ6ÇVF–ær–çfW'FVBf–Ww2à¤æF—fRö–çFW"&Vv—7G&F–öâõVæ6–ÂvFR÷â÷–æ6‚÷v†VVÂ÷F&vWBö6†ævRWfVçG2&WF–æVBà¤÷&–v–æÂF×–ærã‚&÷f–FW2–æW'F–²æW‡B6öçF7BÆF—6&ÆVBFööÂ÷"W‡FW&æÂ6ÖW&§f–Wr6†ævR7F÷27–ââæò6V6öæBö–çFW"÷væW"ÆÖöFVÂ&÷FF–öâö¶W&æVÂ÷"w&÷VæBÖ÷fRà¤æWfW"6ÆV"æF—fRâöFöÆÇ’öâ÷&F–æ'’–FÆR&÷FF–öâWFFW3¢F†—2v26Vv‡Bæ@¦6÷'&V7FVBGW&–æsfÆ–FF–öâÂæ÷rW‡Æ–6—FÇ’FW7FVB–æ6ÇVF–ærW6–FRÖF÷vââà ¤Ö–âw2W†—7F–ærF÷V6‡7F'BöÖ÷fRöVæB÷F÷væW"FVÆVvFW32Öf–ævW"6öÖÖæG2FòW&P§7FFR†VÇW"„äòÆ—7FVæW'2’âF†—&Bf–ævW"W6W2æf–vF–öã³'‚F‡&W6†öÆBÆö6·2f—'7@¦FöÖ–æçBF—&V7F–öââ†÷&—¦öçFÂ&÷FFW2÷&–v–æÂ7GVF–òævÆR‚ãVFVw&VW2ô557‚Çw& ¬+ƒ’f–W†—7F–ær6WGFW"õT’÷W'6—7FVæ6S²VæÆ—BÆöö·2æVVB7GVF–òöÖFW&–Â&Wf–WrFð§6VRÆ–v‡F–ærâfW'F–6Â”â–çB6WG26ÖR&F—W26öçG&öÂW‡öæVçF–ÆÇ“¥UÆ&vW"ôDõtà§6ÖÆÆW"âf–ÆÂÆ–ÖvRÆ6VÖVçBÄòÇ7G&ö¶RöG&rö'W7’6W76–öç2&VgW6R6—¦R6†ævW2â6öçG&öÇ0§&W7F÷&RöæÇ’gFW"ÄÂ6öçF7G2Æ–gC²6æ6VÂö&ÇW"÷vV†–FRö†–FFVâ&W7F÷&R6fVÇ’à¥GvòÖf–ævW"FVæFòæBF‡&VRÖf–ævW"F&VFò&WF–â÷&–v–æÂ†—7F÷'’÷væW'3²Ö÷fV@¦÷#BÖf–ævW"vW7GW&W2æWfW"&V6öÖR&VFòâf–ævW#÷&&—Böf–ævW#"â·–æ6‚&WF–æVBà ¥–çB÷&–v–æÂ&7FW"÷6WGF–æw2&F—W3(	3#SgFW†VÇ2†öÆCC‚“²Ö†–×VÒF–ÖWFW#S'FW†VÇ2à¤öæÇ’äUrãC‚÷&F–æ'’ô&ÇW"7G&ö¶W2v–ã†Ö–ÆÆ–öâ&7FW"×—†VÂv÷&²v–æF÷rÇ&VæWvV@§W"–çWBv—F‚4ÔR6æ6†÷Bö6÷fW&vRö†—7F÷'“²W†—7F–ær6×VFvR'VFvWB&WF–æVBà¤æò6–ÆVçB&W6—¦RÆæWrFW‡GW&R66†VÖ÷"†—7F÷'’VçG'’f÷"6†æv–ær6WGF–æw2â'V–ÇBÖ–à¥6ögB&÷VæBô†&B&÷VæBôfÆBô6†—6VÂôG'’'&—7FÆRW6R÷&–v–æÂ†&FæW72öÇ†×F—&7FW#°¦–×÷'FVBärF—2÷&÷FF–öâ&WF–æVBâæò—&''W6‚÷F–ÖRÖ67V×VÆF–öâ&öÖ—6Rà ¥fW'F–6Â6—¦RG&r6†÷w2F÷Ö6VçG&Ræöæ–çFW&7F—fR&Wf–Wr6&Bv—F‚7GVÂ÷&–v–æÀ§&7FW"7G&ö¶RÇ6VÆV7FVB6öÆ÷W"ö÷6—G’ö†&FæW72÷F—æB&F—W2&VF÷WBâ&Wf–Wr&W&W6VçG0¦#GFW†VÂ6†'BBV'FW"66ÆRÄäõBwV&çFVVBv÷&ÆB÷67&VVâ7W&f6Rfö÷G&–çB7&÷70¥UbFVç6—F–W2âöæRVWVVBg&ÖRW6W2ÆFW7B6—¦S²Æ–gBö6æ6VÂôFöæR†–FW2æB7W&W76W0¦ÆFRG&w2âæòÖW6‚†—B&÷‡’Ç66VæR÷–çB×&W6÷W&6Rö†—7F÷'’×WFF–öââ6æ6VÂ&W7F÷&W0§&RÖG&r6—¦S²÷&F–æ'’&VÆV6R¶VW26—¦RâW†—7F–ærÄTeB–çB6WGF–æw2&W6W'fVBà ¥&Wf–WvVC&WfW'6R66†Rw&ƒ¦Ö–â²æWr6öçG&öÇ2ö†VÇW#·&öGV7F–öâ–çB÷&7FW"ð¦æWr&W6WB÷&Wf–Ws·6†&VBÆ"÷6W76–öâ–×÷'G2‡–ç2öæÇ’’Ç6†VÆÂ÷&V6÷fW'’÷&VÆV6Ræ@¦Æ–÷WBöG&vW"6æöæ–6Â&VÆV6RÖÆöFW"&VçG2âVæ6†ævVB76WG2&WF–âöÆFW"¶W—2à¥&÷FV7FVB×VÇF“ãög&÷¦Vä&WF.(	3rövVöÖWG'’õUbôf–ÆÃBö66WFVB–6öç2Væ6†ævVBâ'VçF–ÖP¦6ö×&—6öãöæÇ’6öFRÆ&VÇ2²Ö–w&F–öã“¶&÷F‚7G'V7GW&W2öFVfVÇB÷&W6öÇWF–öâ–çF7Bà ¥W6W#’ô"ôW‡Æ–6—FÇ’ÄÂ52æ÷r&÷FV7FVC£R6ö×ÆWFR³R6ö×ÆWFR"Ã&FV@¤d”Ã³#Vç&FVBW†6ÇVFVBâ&÷F‚6†VÆÂö6†V6¶Æ—7C’Æ7GVÂ÷6fVC‚â6VRW†7B”G2æ@¦Æ–Ö—G2–âFö72÷6†VÆÂÖ6ö×&—6öâ×&W7VÇG2Ó’æÖBâ¶VWFVfVÇBÆ6ö×&—6öâvFR6ö×ÆWFS°¦æò"7WW&–÷&—G’÷W&ÖæVçBVæv–æR&W—"–æfW'&VBâ†—7F÷&–6Â—†VÂfVÇBvF6‚&VÖ–ç2à¤–æ—F–ÂV&Æ–6F–öâv2†VÆBv†–ÆRW6W"w2W‡W&–ÖVçB&ã²—B—2æ÷r6ö×ÆWFRÂV&Æ—6€£gFW"fÆ–FF–öâVæFW"W†—7F–ær7FæF–ærWF†÷&—¦F–öââæò&WVB&÷fÂæVVFVBà ¥FW7G2W†V7WFR&VÂF‡&VR&÷FF–öâöæF—fRâöFöÆÇ’Æ7GVÂÖ–âF†æFÆW"Æ6öÖÖæ@¦†—2öG&–âö6æ6VÂÇ&öGV7F–öâ–çBT’æB—†VÂ&7FW"÷&Wf–WrÇ&W6WG2ÆÆ&vR''W6‚v÷&°§&VæWvÂÆ6æ6VÂæBôäRVæFòã“#‚†—7F÷'’f—‡GW&Ræ÷r7F÷2W‡G&7F–öâ&Vf÷&RæWr6öÖÖæ@¦–æ—F–Æ—¦F–öâæB–æ¦V7G27GVÂ†VÇW#²ÆÂ÷&–v–æÂ†—7F÷'’76W'F–öç2&WF–æVBà£ƒ“b–çfÆ–B×&F—W2f—‡GW&SCž(i##SrföÆÆ÷w2FVÆ–&W&FRæWrÆ–Ö—BâgVÆÂöfö7W6VB&W7VÇG2æ@§V&Æ–6F–öâ&ööb–âFö72÷V&Æ–6F–öâÓæÖBâgVÆÂÆö6ÂæöFS#Bã#"ã £#“SR52ód”Âó6¶—ó6æ6VÂƒrã2’Æ–æ6ÇVF–æsæWr7GVÂÖ÷væW"6†V6·2à¥7–çF‚÷v†—FW76R6ÆVââæF—fR•CfVVÂ&VÖ–ç2VæF–ærà ¤DUd”4S¢6öçF–çV÷W3f–ævW"GVÖ&ÆR7BF÷ö&÷GFöÓ¶fÆ–6²÷&R×F÷V6‚7F÷3·â÷–æ6€¦æBf–Wr'WGFöç27F–ÆÂv÷&²ã6f–ævW"†÷&—¦öçFÂ7GVF–òG&r&÷FFW2Æ–v‡Bv—F†÷WBÖöFVÀ¦Ö÷F–öâ÷"&VFòâ–âUb–çBfW'F–6Ã6f–ævW"UVæÆ&vW2ôDõtâ6‡&–æ·2v—F‚7G&ö¶R6×ÆS°¦Æ–gB†–FW2&Wf–WræB6WGF–æw2&VÖ–ââG'’f—fRF—&W6WG2öÆ&vRVæ6–Â7G&ö¶S°¥VæFõ&VFòöæR7G&ö¶RÃ6f–ævW"D&VFòÄFöæRöæf–vF–öââæò&WVBô"&F6‚&WV—&VBæ÷rà¤æW‡B&W7öæBFòæF—fSvW7GW&Rö''W6‚fVVÃ²'&öFW"''W6†W2÷&Vf–æVÖVçG27F’7FvVBà ¢ãV&Æ–6F–öâfW&–f–VC ¥V&Æ—6†VB'VçF–ÖSvf3fc#Cv#ƒcfVFV3f3&fSVFV†6#“fSS“c²W†7BFW7FVB÷WÆöFV@§G&VSc3#s3#†#3s#fSCSVc†V6&6V3S6f3CV6SBâÆÃ#‚&Æö'2fW&–f–VB&Vf÷&RFöÖ–0¦æöâÖf÷&6VBW‡V7FVBÖÖ–â&VbWFFS²fWF6†VBÖ–â÷G&VRÖF6‚FW7FVB6†V6¶÷WBà¥vW3Csƒ#Cr6ö×ÆWFVB5T44U52ã‚66†RÖ'W7FVBÆ—fRf–ÆW2'—FRÖÖF6ƒ§fW'6–öâÀ¦–æFW‚ÆÖ–âÆg&VRÖ÷&&—BÖ6öçG&öÇ2ÇF‡&VRÖf–ævW"Ö6öÖÖæG2Çf–Ww÷'B×–çBÇf–Ww÷'B×–çBÖ6÷&RÀ§–çBÖ''W6‚×&W6WG2Ç–çBÖ''W6‚×&Wf–WrÇ6†&VB–çBÖ6÷&RÇ–çB×6W76–öâÄÆ"§2ö‡FÖÂÀ§6†VÆÂÖ6ö×&—6öâÆG&vW"×V’Æf6R×v÷&¶fÆ÷rÖÆ–÷WBÇ&VÆV6RÖ&ö÷G7G&Ç&VÆV6R×fW'6–öâà¤gVÆÂÆö6Ã#“SR52ód”Âó6¶—ó6æ6VÂƒrã2“²†÷7FVCCsƒƒ–å÷&öw&W72@§&ööbÆæ÷B6Æ–ÖVB52ãÄ•dRõ$TE’f÷"æF—fR÷&&—BöÆ–v‡Bõ–çBvW7GW&R6†V6·2à£’6ö×&—6öâW6W"ÄÂ52&÷FV7FVC¶æò&WVBô"&WV—&VBãæF—fRvW7GW&P¦fVVÂæBÆ&vW"Ö''W6‚ÆFVæ7’&Ræ÷BW7F&Æ—6†VB'’æöFR6†V6·3¶v—BFWf–6RfVVF&6²à ¢22ã(	B–ÖÖVF–FRæf–vF–öâæBGvòÖf–ævW"æ6†÷&VBGv—7B(	B#’ö7Fö&W###` ¥W6W"(	Ã5>(	Ò&÷FV7G2Vç&W7G&–7FVBöæRÖf–ævW"÷&&—BÅ7GVF–ó6f–ævW"Æ–v‡BÅ–ç@§fW'F–6Â6—¦R÷&Wf–WrÇ&W6WG2öÆ&vW"&F—W2æB÷&–v–æÂ†—7F÷'’öæf–vF–öâ&V†f–÷"à¥W6W"W‡Æ–6—FÇ’&WfW'6W2–æW'F–&VfW&Væ6S¢&VÖ÷fR—G2F–ÂâFòæ÷B&W6W'fS ¦–æW'F–2&WV—&VBFWf–6RfVGW&Râ7W'&VçC66WFæ6R—2W‡Æ–6—BÆæ÷BVæF–ærà ¤&6VÆ–æRÖ–ãƒ&Vc†cƒR÷'VçF–ÖSvf3fc¶Æ—fS6†VÆÂöÖæ–fW7BfW&–f–VB&Vf÷&R6†ævW2à¤Ö–âF—6&ÆW2æF—fRF×–æs¦÷&&—BÇâæBFöÆÇ’7F÷öâ&VÆV6RâW†—7F–ærg&VRÖ÷&&—@§7V&6Æ72&VÖ–ç26öÆR&÷FF–öâW‡FVç6–öâFòF‡&VSãs’ã¶öæRÖf–ævW"gVÆÃ4BGVÖ&ÆP¦æBæF—fRö–çFW"õVæ6–ÂvFR÷F&vWBö†—7F÷'’÷væW'2&WF–æVBâæòæWrvW7GW&RÆ—7FVæW"à ¤–çFW'&WB&WVW7FVBGvòÖf–ævW"&÷FF–öâ245$TTâÕÄäREt•5B&÷VæB†VÆB6öçF7BÀ¦æ÷BæWrÖW6‚×–6¶VC4B÷&&—B6VçG&RâF†—2–çFW'&WFF–öâv27FFVBFòW6W"v†–ÆP§v÷&¶–ærâW‡FVæB4ÔRö†æFÆUF÷V6…7F'DFöÆÇ•âõö†æFÆUF÷V6„Ö÷fTFöÆÇ•â÷væW'3 §G&6²6öçF7B—"ÆFW&—fR6–væVBGv—7B÷–æ6‚Ç&÷FFR6ÖW&WæB&WW6R÷&–v–æÀ¥F‡&VRFöÆÇ’æBâ&ö¦V7F–öââ6ö×Vç6FRöfbÖ6VçG&R&÷FF–öâ÷¦ööÒv—F‚6–Ö–Æ&—G¦Ö–ær–â552÷vR6ö÷&F–æFW2âÆW72ÖÖ÷f–ær6öçF7B—2æ6†÷"Æ–æ6ÇVF–ærB¦ööÐ¦Æ–Ö—G2âöâ6öçG&öÇ2F&vWBÖFWF‚ÆæR&÷F‚6öçF7G2G&6²F†V—"67&VVâ÷6—F–öç3°¦æò7W&f6R†—B÷&–67B÷66VæRöÖöFVÂ÷6VÆV7F–öâ×WFF–öââV×G’f–Ww÷'BÇ6òv÷&·2à ¤&÷F‚f–ævW'2Ö÷f–ærFövWF†W"ã·6W&F–öâ”ä4ƒ·&VÆF—fRævÆREt•5BÇ6–×VÇFæV÷W6Ç’à¤V—F†W"f–ævW"6â7F’ÆçFVBv†–ÆR÷F†W"&72&÷VæB—Bâv÷&·2gFW"–çfW'FVB÷ ¦ö&Æ—VR÷&&—BæBv—F‚6çf2öfg6WG2÷vR67&öÆÃ¶æòw&÷VæBÖ&÷VæB&W6WBâ6öçF7G0¦6Æ÷6W"F†ã'‚6fVÇ’&V&6R&F†W"F†âVæFVf–æVBævÆR÷¦W&òFöÆÇ’âæF—fR6æ6VÂð¦Æ–gB&WGW&ç2FòöæRÖf–ævW"7FFS¶F—6&ÆVB6öçG&öÇ2&VgW6RÖ÷fW2â÷&–v–æÂFF‡&W6†öÆ@¦6öçF–çVW3&f–ævW%VæFòó6f–ævW%&VFó³F‡&VRÖf–ævW"6öÖÖæG2VçF÷V6†VBà ¤6†ævW2æ'&÷s¦Ö–âFVfVÇBö–×÷'B–âæBg&VRÖ÷&&—B6öçG&öÆÆW"ã6†VÆÂ÷&V6÷fW'’ð¦6æöæ–6Â&VÆV6RÖÆöFW"Æ–÷WB¶G&vW"–ç2&Wf–WvVC¶6ö×&—6öâöæÇ’6öFRÆ&VÇ2æ@¦ÆörÖ–w&F–öãÆöÆB&F–æw2õ56W2Væ6†ævVBâ–çB÷&W6WG2÷&Wf–Wr÷&7FW"ÆÆ–v‡F–ærÀ¤×VÇF“ãÆg&÷¦Vâ&WF2ÆÖöFVÆÆ–ærõUbö66WFVBV&æ6RæB6—¦–ær'—FW2÷–ç2Væ6†ævVBà£S‚fö7W6VB6†V6·252Æ–æ6ÇVF–æsæWr7GVÂæF—fRö–çFW"ö6öçG&öÆÆW"6†V6·3 ¦V—F†W"æ6†÷"Æ–çfW'FVBöö&Æ—VR6ÖW&Ç&ÆÆVÂâÇ–æ6‚·Gv—7BÆÆ–Ö—G2ÆæV"Ö6ö–æ6–FVç@§&VgW6Âö6æ6VÂÆF—6&ÆVBÖ÷fRæB¦W&òG&–gBâ÷&–v–æÃõ–çBö†—7F÷'’6†V6·2&WF–æVBà¤gVÆÂÆö6ÂæöFS#Bã#"ã£#“cR52ód”Âó6¶—ó6æ6VÂƒã“w2’à¥7–çF‚÷v†—FW76R6ÆVââV&Æ–6F–öâ&ööc¦Fö72÷V&Æ–6F–öâÓæÖBâæF—fSfVVÂVæF–ærà ¤DUd”4S¦öæRÖf–ævW"÷&&—BöfÆ–6¾(i&Æ–gB7F÷2–ÖÖVF–FVÇ“·Gvòf–ævW'2G&ç6ÆFR÷–æ6ƒ°¦†öÆBV—F†W"f–ævW"æB&2÷F†W.(i'f–WrGv—7G2&÷VæB†VÆBö–çBâ6öÖ&–æRÆÃ3¶Æ–gBöæP¦æB6öçF–çVRöæRÖf–ævW"÷&&—Bâ6†V6³'FVæFòó7F&VFòæCÆ–v‡Bö''W6‚vW7GW&W2à¤æW‡C¦FWf–6RfVVF&6²öâGv—7B–çFW'&WFF–öâöfVVÂã’ô"6ö×ÆWFRÅ52&÷FV7FVC°¤FVfVÇB&WF–æVBÆæò&WVB&F6‚÷"&VæFW&–ær×&ö÷BÖ6W6R6Æ–Òà ¢ãV&Æ–6F–öâfW&–f–VC ¥V&Æ—6†VB'VçF–ÖVc“ƒ““3ƒc3†fCcV#C#V6F&V36cf&&3s–Cc·FW7FVB÷WÆöFVBG&VP¦#s&fS#F6VFcs3“36SV““VC“Sf#v#Cc"âÆÃB6†ævVB&Æö'2fW&–f–VB&Vf÷&RFöÖ–0¦æöâÖf÷&6VBW‡V7FVBÖÖ–âWFFS¶fWF6†VBÖ–â÷G&VRWVÂÆö6ÂFW7FVB6†V6¶÷WBà¥vW3Cƒss3ƒ3‚6ö×ÆWFVB5T44U52ã66†RÖ'W7FVBÆ—fRf–ÆW2'—FRÖÖF6ƒ§fW'6–öâÀ¦–æFW‚ÆÖ–âÆg&VRÖ÷&&—BÖ6öçG&öÇ2Ç6†VÆÂÖ6ö×&—6öâÆG&vW"×V’Æf6R×v÷&¶fÆ÷rÖÆ–÷WBÀ§&VÆV6RÖ&ö÷G7G&Ç&VÆV6R×fW'6–öâÇVæ6†ævVBf–Ww÷'B×–çBæBF‡&VRÖf–ævW"Ö6öÖÖæG2à¤gVÆÂÆö6Ã#“cR52ód”Âó6¶—ó6æ6VÂƒã“w2“¶f–æÃR&VÆV6R6†V6·252à¤†÷7FVCCƒss3C#–å÷&öw&W72B&ööbÆæ÷B6Æ–ÖVB52ãÄ•dRõ$TE’f÷"æF—fP¦æò×F–Âöæ6†÷&VB×Gv—7BFW7F–ærâW6W#52&÷FV7FVBW†6WB&Wfö¶VB–æW'F–°¦æòæF—fSfVVÂ66WFæ6R–æfW'&VBã’6ö×&—6öâ&VÖ–ç26ö×ÆWFRö66WFVBà ¢22ã"(	Bf–WrÖ†—2&÷FF–öâ&ÆÂæB÷F–öæÂ6ö×7B7Æ—Bf–Wr(	B#’ö7Fö&W"##` ¥7FGW3¢&W&VBöâÖ–âg&öÒ&3cƒ“–C2òÆ—fR'VçF–ÖRc“ƒ““3ƒb‚ã’à¥V&Æ–6F–öâæBf–æÂ&Vw&W76–öâWf–FVæ6Rv–ÆÂ&R&V6÷&FVB–âFö72÷V&Æ–6F–öâÓ"æÖBà¥W6W"ã52æB6ö×ÆWFVBã’ô"ô52&VÖ–â&÷FV7FVC²æòã÷"ã ¦æF—fR66WFæ6R–æfW'&VBâæò&WVB6ö×&—6öâ&F6‚&WVW7FVC²7F—2FVfVÇBà ¥W6W"w2f–æÂw&W’Ö6—&6ÆR6Æ&–f–6F–öâ—2WF†÷&—FF—fS¢&÷FFRF†Rô$¤T5B&÷VæBF†P¥45$TTâõd”Ur†—2gFW"Æ–væ–ærF†R6ÖW&âF†—2—2äõB4B&6&ÆÂ÷"6ÖW&÷&&—Bà¤VF—Bf÷VæBF†—2Ç&VG’–âG&ç6f÷&Ò×Ww&FR‡6–ævÆRö6ö×öæVçG2’æBö&¦V7BÖ÷&–v–à¢„×VÇF’öw&÷W2“²&WW6RF†V—"W†—7F–ærf–WrVFW&æ–öâÂ—f÷Bö÷&–v–âÂ6VÆV7F–öâæ@¦†—7F÷'’÷væW'2âW‡Æ–6—B¶–æC×67&VVâæ÷r&WfVçG2†—26æ–æfW'&–ær…•¢f÷"F†—0¦†æFÆRöæÇ’â÷F†W"6öç7G&–çG2ÂævÆRFWFVçG2ÂW†7BÖVçG'’&V†f–÷"æB¶W&æVÇ27F’à¤âV&Æ–W"Vç6†—VB4BG&6¶&ÆÂ&÷F÷G—Rv2F—66&FVBföÆÆ÷v–ær6Æ&–f–6F–öã°¦æòG&6¶&ÆÂ†VÇW"Â6V6öæBG&ç6f÷&Ò¶W&æVÂ÷"æWr&rö–çFW"Æ—7FVæW"6†—2à ¥F÷FÂv—¦Öò&WÆ6W2öÆB6ÖÆÂv†—FRf–Wr&–ærv—F‚S"557‚w&W’&÷FF–öâ&ÆÃ §fW'’f–çBæWWG&Âf–ÆÂÂF&²6†&6öÂ÷WFÆ–æRÂ6Æ–v‡B–VÆÆ÷r7F—fR†–v†Æ–v‡Bâ—B—0¦&V†–æBW†—7F–ær…•¢&72ö'&÷w2÷G2÷66ÆRæöFW2ôÖ÷fR6VçG&S²F†÷6R&WF–â&–÷&—G’à¥…•¢F‡2äBF†V—"†—B&÷†–W26öçF–âöæÇ’F†R6ÖW&Öf6–ær6VÖ–6—&6ÆS²æò&V ¦†—BvVöÖWG'’Â6Æ÷6–ær6†÷&B÷"÷VRö66ÇVF–ærF—62âf6RÖöâÆ–Ö"7F—2gVÆÂ&–ærà¤÷&ævR66ÆR6—&6ÆRÂ6÷&æW"6öçG&öÇ2Â&ö¦V7FVB†W2Â6Æ—–ær÷6–æwVÆ&—G’&VgW6ÂÀ¤W‡G'VFRÆæW2æB÷&–v–æÂW†7BfÆ÷r&WF–æVBâ&VfW&Væ6S¢”Ôuóƒ3S"çæræ@£CDddSTS"ÔT4dÓC3Ô#S3’Ótc4S“T$Rçær7WÆ–VB–â7W'&VçB6†BâF&²öÆ–v‡B5dp§&ö¦V7F–öâ&Wf–Wr–ç7V7FVC²æ÷B6f&’—†VÂö†—B×FW7F–ær÷"æF—fR66WFæ6R6Æ–Òà ¥7Æ—Bf–Ws¢÷&–v–æÂ÷'G&—BvFRöffW'26öçF–çVR–â6ö×7Bf–WrâW‡Æ–6—B6†ö–6P§W'6—7G2f÷"F†—2'&÷w6W"6W76–öâ‡7F÷&vRÖFVæ–VBfÆÆ&6²7F—2–âÖVÖ÷'’’â7F—fP¦öæÇ’–âæ'&÷ræW3²v–FVæ–ær&W7F÷&W2æ÷&ÖÂÆ&VÇ2öÆ–÷WBWFöÖF–6ÆÇ’âæWp¦6ö×7BÖÆ–÷WBæ§2²66÷VB552&R&W6VçFF–öâöæÇ’â÷&–v–æÂÖöFR÷FööÂõ–çBæöFW2À§FW‡D6öçFVçBÂ6VÆV7FVB'Gv÷&²ÂF—7F6‚æBF—6&ÆVB7FFW27F’WF†÷&—FF—fS²Æ&VÇ0§&VÖ–â66W76–&ÆR2&–ÖÆ&VÂ÷F—FÆRâ&F–Ç2f—Bv—F†–âæRÂ–6öâÖöæÇ’F&vWG2ãÓCGƒ°¦W‡G&Öæ'&÷rÃÓC‚W6W2F†R6ÖR÷&–v–æÂFööÂ'WGFöç22f÷W"Ö6öÇVÖâ–6öâw&–Bà¤öæÇ’FööÂ×–6¶W"6VçG&R—2f—GFVC²G&ç6f÷&Òv—¦Öò&VÖ–ç2öâ6VÆV7FVBvVöÖWG'’à¥–çB&F–Â#“'‚óC‡‚F&vWG2Â6†÷'FW"Æ–W"Æ—7BæB6–ævÆRÖ6öÇVÖâ''W6‚6WGF–æw3°¦÷&–v–æÂÄTeBFö6²ÂÆ&VÇ2÷fÇVW2æBFöæRõVæFòõ&VFò&WF–æVBâæò&VæFW&W"Â&6¶–æp§6—¦RÂÖöFVÂÂ†—7F÷'’Â&W&VçF–ærÂ7–çF†WF–2&W6—¦RÂöÆÆ–ær÷"vW7GW&R6†ævW2à¤W†—7F–ær6—¦–ærö'6W'fW"†æFÆW2&WfVÆVB÷&VÂæR&W6—¦Râ$d66†R&WGW&à§&V6öææV7G2FV6÷&F–öâö'6W'fW#²vV†–FRF—66öææV7G2—Bâ&VfW&Væ6R7Æ—B67&VVç6†÷@£“T3sT2ÓSt"ÓDSSBÓ“3c’ÓT#„D#sS„Dc$Rçærâ•BfVVÂ÷f—7VÂ&—G’7F–ÆÂVæF–ærà ¥&Wf–WvVB66†R6Æ÷7W&S¢F÷FÂÖv—¦ÖòÂG&ç6f÷&Ò×Ww&FRÂö&¦V7BÖ÷&–v–âf–G&vW"À¦6æöæ–6Â&VÆV6R×fW'6–öâf–f6R×v÷&¶fÆ÷rÖÆ–÷WBöG&vW"Â&ö÷G7G&æB6ö×&—6öà§–ç2ã#²æWr6ö×7B76WG2ã"â6ö×&—6öâöæÇ’6öFRÆ&VÇ2öÆörÖ–w&F–öã°¦öÆB&F–æw2æB7G'V7GW&RVæ6†ævVBâ–çFW&æÂöÆBÖöGVÆR7F×2–çFVçF–öæÆÇ’7F’à¤Ö–âög&VRÖ÷&&—CÂ–çB÷F‡&VRÖf–ævW#Â66WFVB–6öâ552æB&÷FV7FVB×VÇF“ã ¦æBg&÷¦Vâ&WF.(	3r&VÖ–â'—FR÷–âVæ6†ævVBâæòÆ&vRT’6ÆVçWÆ–VBà ¥fÆ–FF–öã¢’æWr7GVÂÖ÷væW"÷&W6VçFF–öâ6†V6·3²3Rfö7W6VB³#"6öçG&7Bö6÷&æW ¦6†V6·272âf–æÂ6ö×ÆWFR×7V—FR&W7VÇB&V6÷&FVB&VÆ÷r&Vf÷&RV&Æ–6F–öââöÆFW ¢ã3S‚ö&¦V7BÖ÷&–v–âf—†VB×–â76W'F–öâæ÷rW6W2&Wf–WvVB76WB6öçG&7Bf÷"F†P¦W‡Æ–6—FÇ’&WVW7FVB÷væW"6†ævS²&÷FV7FVB×VÇF“ã76W'F–öâVæ6†ævVBâãs §67&VVâÖ6—&6ÆR76W'F–öâföÆÆ÷w2æWrw&W’Ö&·W'WB&WF–ç2f–Wr÷væW"æBÖ÷fP¦6VçG&Rö6÷&æW"&÷FV7F–öç2âã“c6†V6·2÷Vâg&öçBF‚v—F†÷WB6Æ÷6–ær&V"6†÷&C°¢ãSs6†V6·2÷&–v–æÂ&÷‡’&÷WF–ærv†–ÆRw&W’&ÆÂW6W2—G2÷vâf–ÆÆVB†—B&Vv–öâà ¤DUd”4S#¢–ç7V7Bv—¦Öò÷fW"F&²&6¶w&÷VæBöÆ–v‡Bö&¦V7Bv†–ÆR÷&&—F–æs²æò&V ¦&72âG&rw&W’–çFW&–÷"&÷VæB6VçG&S¢ö&¦V7B&÷FFW2&÷WBÆ–væVBf–WrÂ7V'FÆP§–VÆÆ÷r&W73²Ö÷fR6VçG&Rõ…•¢õ66ÆR7F–ÆÂv÷&²âVæFõ&VFó²G'’×VÇF’öw&÷Wâ7Æ—Bf–Wp§÷'G&—Bæ÷F–6RÓâ6öçF–çVR6ö×7C²ÖöFR÷FööÂõ–çB–6öç2f—BÂ6†ö÷6RFööÂõ–çBÀ¤FöæS²&W6—¦RæRögVÆÂ67&VVâ&W7F÷&W2æ÷&ÖÂÆ&VÇ2âæf–vF–öâæB–çBvW7GW&W0¦g&öÓó&VÖ–ã²æF—fSfVVÂæC"6†V6·2VæF–ærW‡Æ–6—B52à ¤æW‡C¢&W7öæBFòæF—fRv—¦Öòö6ö×7BfVVF&6²Â¶VWf—6–&–Æ—G’fVÇBvF6‚†öæW7C°¦æòæWrô"&F6†W2÷"Vç7W÷'FVBW&ÖæVçB6ö×÷6—F÷"&W—"6Æ–Òà ¢ã"fÆ–FF–öâ6ö×ÆWFR&Vf÷&RV&Æ–6F–öã ¤gVÆÂÆö6ÂæöFS#Bã#"ã¢#“sB52òd”Âò6¶—VBò6æ6VÆÆVBƒBã3‡2’à¥7–çF‚÷v†—FW76R6ÆVââ&÷FV7FVB×VÇF“ãÂg&÷¦Vâ&WF2ÂÖ–âög&VRÖ÷&&—CÀ¥–çB÷F‡&VRÖf–ævW#Væ6†ævVBâV&Æ–6F–öâöÆ—fRfW&–f–6F–öâföÆÆ÷w2à ¢ã"V&Æ–6F–öâfW&–f–VB(	B#’ö7Fö&W"##c ¥'VçF–ÖR#ffC–C†3#fcS“Fs6##FCƒ#ƒ6fVFCCc“Scf#²FW7FVB÷WÆöFVBG&VP£V#“#&3Vf6cvCsfc†ccC†s†3&C#†&&BâÆÃ#"&Æö'2fW&–f–VB&Vf÷&RFöÖ–2À¦æöâÖf÷&6VBW‡V7FVBÖÖ–âWFFS²fWF6†VBÖ–âW†7FÇ’ÖF6†W2FW7FVBÆö6ÂG&VRà¥vW3Cƒ“#“Sr6ö×ÆWFVB5T44U52ãrór66†RÖ'W7FVBÆ—fRf–ÆW2'—FRÖÖF6‚À¦–æ6ÇVF–ærÆÂ6†ævVB'VçF–ÖRöÆöFW"76WG2ÇW2&÷FV7FVBæf–vF–öâõ–çBô×VÇF’à¤Æö6Ã#“sB52ód”Âó6¶—ó6æ6VÂƒBã3‡2’Âf–æÃr&VÆV6R6†V6·252à¤†÷7FVCCƒ“#“c"–å÷&öw&W72B&ööc²æ÷B6Æ–ÖVB52ã&÷FV7FVBæf–vF–öâÀ¥–çBÂ×VÇF’æB–6öâf–ÆW2&R'—FRÖ–FVçF–6ÂFò&6VÆ–æRâã"Ä•dRõ$TE’f÷ ¦æF—fRv—¦Öòö6ö×7B6†V6·3²æòæF—fSó"52–æfW'&VBâ6VRV&Æ–6F–öâ&ööbà ¢22ã2(	BæF—fRäôÒöÇ–vöâ–×÷'B(	B#’ö7Fö&W"##` ¥7FGW3¢ã2–×ÆVÖVçFF–öâfÆ–FFVB–âfö7W6VB6†V6·3²gVÆÂ&Vw&W76–öâ÷V&Æ–6F–öà§VæF–ærâ&6VÆ–æRÖ–ãFfCsSbòÆ—fS"'VçF–ÖV#ffC–C‚âV&Æ–6F–öâWf–FVæ6Rv–ÆÀ¦&RFö72÷V&Æ–6F–öâÓ2æÖC²FWF–ÆVB66÷R÷&VfW&Væ6S¦Fö72öæöÖBÖ–×÷'BÓ2æÖBà ¥W6W"&W÷'G2(	Ç&–v‡B6–FR67&VVâ—77VR6VV×2Fò&Rf—†VB(	Òâ&V6÷&BW‡Æ–6—B÷6—F—fP¦æF—fRö'6W'fF–öâöæò7W'&VçB&V7W'&Væ6RÂæ÷B&÷fVâW&ÖæVçBVæv–æRF–væ÷6—0¦÷"&Ææ¶WBã"v—¦Öòö6ö×7B52âã52æBã’6ö×ÆWFVBô"ô66WFæ6P§&VÖ–â&÷FV7FVC²ãvW7GW&RfVVÂòã"v—¦Öò¶6ö×7B6†V6·2æ÷BW‡Æ–6—FÇ’w&FVBà ¥W6W"&WVW7G2æF—fRäôÒ–×÷'BæB7WÆ–W27&VF÷"7FW†æRw2æöÕöf–ÆRç’à¤VF—B6öæf—&×2æF—fRU…õ%BÇ&VG’W†—7G3²–×÷'B7W'&VçFÇ’ô$¢ôtÄ"ôtÅDböæÇ’à¥W6R7W'&VçBW7G&VÓƒ3“3†Rƒ#„ö7Fö&W"’Â&Æö#fF6#V"ÂÇW2FFW"f÷"†–W&&6‡’À§G&–ævÆRôf6TÖWFõUb6öçfVçF–öç2âæWr–æFWVæFVçB'&÷w6W"'6W"–âæöÖBÖ–×÷'BÖ6÷&RÀ¦æ÷B—F†öâ'VçF–ÖR÷"6÷–VBW7G&VÒÖöGVÆRâW†—7F–ærW‡÷'B×FV×ÆFR†VFW"&VFW"À¤äôÒw&—FW"öFöæ÷"æBÆÂ–çBövVöÖWG'’öW‡÷'B÷væW'2Væ6†ævVBâæò6V6öæBÖöFVÆÆ–æp¦¶W&æVÂâf–ÆR6†ö÷6W"öF—7F6†W"öFD–×÷'FVB&VÖ–âWF†÷&—FF—fS²æWrf÷&ÖBöæÇ’à ¥7W÷'B&r÷¦W&òöÆVv7’ö7W'&VçBÅ£BG—VBvVöÖWG'’'&—2Â6fRÖöFW&âöÆVv7’†VFW'2À§F‡VÖ&æ–Â&Vf÷&T¥4ôâögFW&&–âÂæF—fRVG2æBæVvF—fRÖf÷W'F‚G&–ævÆW2‡ÇW2÷và¦W‡÷'B&WVFVB×F†—&B6ö×F–&–Æ—G’’ÂæÖW2Â&VçBG&ç6f÷&×2Âf—6–&–Æ—G’ÂÖ—'&÷&V@§v–æF–ærµUb6÷'&W7öæFVæ6RÂf6Vw&÷W2æBW"Ö6÷&æW"Ub6V×2âÖ–â6fVB6†RÀ¦7F—fRÖÆWfVÂF÷öÆöw’fÆÆ&6²Â&¶VBG&—Ææ"–b7WÆ–VBâÆÂvVöÖWG'’FV6öFVBð§fÆ–FFVB&Vf÷&Rf—'7BÖævW"6ÆÂâæF—fR–æFW†VBF÷öÆöw’'—76W2W†—7F–ærô$¢ð¤tÄ"vVÆB÷&V6öç7G'V7F–öâÂ&WF–æ–ær6ö–æ6–FVçBF—66öææV7FVB–æF–6W2âW†—7F–ær6öÖÖöà¦f—BöÖævW"ö†—7F÷'’÷&VfW&Væ6R÷væW'2†æFÆR–×÷'Bâf–ÆR–æfò÷7FGW27FFRvVöÖWG'’°¥UböæÇ“¢–çBöÖFW&–Ç2÷FW‡GW&W2öÖ6·2æ÷B–×÷'FVC²67VÇBÆ–W'2fÆGFVâFò6fV@§6†RâÆ–v‡G2ö6ÖW&2öÖ—GFVBv—F‚æ÷FRâ&WVB†–çG2÷Væ&¶VB&ö6VGW&ÂöÖ—76–æp¦6ö×&W76VB×VÇF—&W2F÷öÆöw’&VgW6Rv†öÆR–×÷'Bv—F‚7F–öæ&ÆR6fR÷fÆ–FFR†–çBà¤Æ–Ö—G3#„Ö”"f–ÆRódÖ”"¥4ôâócDÖ”"&WVW7FVBFV6öFVB'&—2óS²fW'F–6W2¶f6W2F÷FÂð£S&ö&¦V7G2óC“fæöFW2öFWFƒ#ƒ²æ÷Bâ•BW&f÷&Öæ6RwV&çFVRà ¤æF—fRUbÖöæÇ’6÷W&6SÖ&÷†Æ"VçfVÆ÷R†W†—7F–ærfW'6–öâ÷66†VÖ’7W'f—fW2÷&–v–æÀ¥UbVF—F÷"õ–çB÷&ö¦V7BôtÄ"ôäôÒ÷væW'2âæòf¶RtÄ"&÷fVææ6RÂæWr6öFV2÷"–ÖvP§66†VÖâæF—fRæõUb&VÖ–ç2Æ–âvVöÖWG'’âf6TÖWF†–FFVâf6W2–×÷'FVBf—6–&ÆP§v—F‚æ÷FS²†–FFVâö&¦V7G2&WF–âf—6–&–Æ—G’â6÷W&6Rf–ÆRVçF÷V6†VBÂ&Wf–÷W266VæP§&WF–æVBâf–ÆR–×÷'B–æ6ÇVFW2ææöÒæB6öæ6—6R66÷Ræ÷FR&Vf÷&Rf–ÆR6VÆV7F–öâà £’æWr6†V6·3¢–æFWVæFVçBW7G&VÒ×w&—FW"¶æF—fTÅ£Bf—‡GW&W2fW&–f–VB'’W7G&VÐ§&VFW"‡&srö6‡Væ¶VCröÆVv7“R’ÂÖÆf÷&ÖVBÆVæwF‡2÷6–væGW&W2öÆ–Ö—G2÷G—Rö6ö×&W76–öâÀ¦7F—fRfÆÆ&6²öV×G–ÆWfVÇ2÷&ö6VGW&Â÷&VgW6ÂÂ6fVB6†Rv&æ–æw2Â7GVÂf–ÆP§&÷WFRöf—BöæÖW2÷f—6–&–Æ—G’ö–æFW‚&W6W'fF–öâ÷&VfW&Væ6RÂUb6fT÷VâôtÄ"ôäôÒ&V–×÷'Bà¤vVçV–æRFöæ÷##cC'bó#cCb6ö×&W76VBæF—fRvVöÖWG'’æB&T¥4ôâF‡VÖ&æ–ÂFV6öFRà£3fö7W6VB6†V6·253³’&VÆV6RÖfö7W6VB53¶f–æÂ6ö×ÆWFR7V—FRföÆÆ÷w2à ¥&Wf–WvVC266†R6Æ÷7W&S¦–×÷'BÖÖW6‚öæWr6÷&RÂ&VÆV6Rö&ö÷G7G&ö6ö×&—6öâæ@¦6æöæ–6Â&VÆV6RÓæf6RÖÆ–÷WBÓæG&vW"&VçG2â÷&–v–æÂ–×÷'B7F×ƒƒ"&WF–æVBà¤öÆB6ö×&—6öâ&F–æw2&W6W'fVB'’Ö–w&F–öã#´FVfVÇBöæòæWr6ö×&—6öâ6²à¥&÷FV7FVB×VÇF“ãÂg&÷¦Vâ&WF2Âæf–vF–öãÂ–çB÷F‡&VRÖf–ævW#æB66WFV@£"v—¦Öòö6ö×7B6öFRÂäôÒW‡÷'BæBFöæ÷"ÆÂVæ6†ævVBâæò'&öBT’6ÆVçWà ¤DUd”4S3¢f–ÆR–×÷'B6ÖÆÂÆ÷r×öÇ’ææöÓ²–ç7V7BæÖVBö&¦V7G2÷&VÆF—fRÆ6VÖVçBÀ§VG2÷G&–ævÆW2öf6Vw&÷W3²UbVF—F÷"–b6÷W&6RÖVBâ&VfW&Væ6RÆö6·3²6fRæ&÷†Æ"À§&V÷VâæBW‡÷'BäôÒFò6öæf—&Ò6†RõUg2âFW‡GW&R÷–çBV&æ6R—2äõB7W÷'FV@¦'’F†—27FvS²f–ÆRæ÷FR÷7FGW2Ö¶W2F†—2W‡Æ–6—Bâ–b&V¦V7FVBÂ6VæBW†7BW'&÷ ¦æB6÷W&6RäôÒf÷"F&vWFVB6ö×F–&–Æ—G’v÷&²âæòg&W6‚ô"FW7F–ær&WV—&VBà¤æW‡C¢æF—fRäôÒFWf–6RvFRÂF†Vâ7FvVB–çBöÖFW&–ÂöÆ–W"÷&WVB7W÷'B0§&WVW7FVC²¶VW÷6—F—fR&–v‡B×6–FRö'6W'fF–öâæB†—7F÷&–6ÂÆ–Ö—G2†öæW7Bà ¢ã2f–æÂfÆ–FF–öâ6ö×ÆWFR&Vf÷&RV&Æ–6F–öã ¤gVÆÂÆö6ÂæöFS#Bã#"ã£#“ƒ252ód”Âó6¶—ó6æ6VÂƒRãcG2’à¥7–çF‚÷v†—FW76R6ÆVâã3fö7W6VB³’&VÆV6RÖfö7W6VB³Bf–æÂ&Wf–Wr6†V6·252à¥&÷FV7FVB×VÇF“ãÂæF—fRäôÒW‡÷'FW"öFöæ÷"Ã"v—¦Öòö6ö×7BÃæf–vF–öâæ@£–çB÷F‡&VRÖf–ævW"÷væW'2&VÖ–âVæ6†ævVBâV&Æ–6F–öâöÆ—fR&ööbföÆÆ÷w2à ¢ã2V&Æ–6F–öâfW&–f–VB(	B#’ö7Fö&W"##c ¥'VçF–ÖS&S3VC6C“f6cSC#3sSVv33C3V3fVVC#–c²FW7FVB÷WÆöFVBG&VP£CCcvF6S“†CS†C3SCC#Cƒ†F#S“6#†“"âÆÃb&Æö'2†6‚×fW&–f–VB&Vf÷&RFöÖ–0¦æöâÖf÷&6VBW‡V7FVBÖÖ–âWFFS²fWF6†VBÖ–âW†7FÇ’ÖF6†W2Æö6ÂFW7FVBG&VRà¥vW3Cƒ#Ss3#R6ö×ÆWFVB5T44U52ã’ó’66†RÖ'W7FVBÆ—fRf–ÆW2ÖF6‚F†RFW7FV@¦6†V6¶÷WBÂ–æ6ÇVF–æræWrFV6öFW"ö–×÷'FW"÷&VÆV6RÆöFW'2æB&÷FV7FVBäôÒW‡÷'FW"ð¦Föæ÷"Ã"v—¦Öòö6ö×7BÃæf–vF–öâæC–çB÷F‡&VRÖf–ævW"ô×VÇF“ãà¤Æö6Ã#“ƒ252ód”Âó6¶—ó6æ6VÂƒRãcG2’Æf–æÃr&VÆV6R6†V6·252à¤†÷7FVCCƒ#Ss“–å÷&öw&W72B&ööbÆæ÷B6Æ–ÖVB52âã2Ä•dRõ$TE’f÷"æF—fP¤äôÒvVöÖWG'’õUb6†V6·2âæF—fS266WFæ6RVæF–æs²vVöÖWG'’ÖöæÇ’66÷R&WF–æVBà¥W6W"÷6—F—fR&–v‡B×6–FRö'6W'fF–öâ&V6÷&FVBv—F†÷WB–æfW'&–ærÆÃ"fVGW&W252à ¢22ãB(	BVæf–ÇFW&VBæF—fRf–ÆR6†ö÷6W"f÷"äôÒ(	B#’ö7Fö&W"##` ¥7FGW3¢ãBfÆ–FFVBÂV&Æ—6†–ærâ&6VÆ–æRÖ–æCV&c–cf÷'VçF–ÖS&S3VC6B‚ã2’à¥W6W"&W÷'G2äôÒf–ÆW2u$U”TBõUB–â•Bf–ÆW2&Vf÷&R6VÆV7F–öââF†—2&Æö6·2æF—fP£266WFæ6R&Vf÷&RFV6öFW"'Vç3²Fòæ÷BG&VB2'6Rf–ÇW&R÷"æF—fR52à ¤VF—C¢öæÇ’6–×÷'DÖW6„–çWB6†VÆÂGG&–'WFR6WG2—G2G—R&W7G&–7F–öã²–×÷'FW ¦æBÆFW"ÖöGVÆW2æWfW"&Ww&—FR66WBâW†—7F–ær&ö¦V7B÷VâÇ&VG’W6W2à§Væf–ÇFW&VB–çWBâ&VÖ÷fRôäÅ’66WCÒ"æö&¢ÂævÆ"ÂævÇFbÂææöÒ"g&öÒ÷&–v–æÂÖW6‚6†ö÷6W"à¤æòv–ÆF6&BÔ”ÔR&WÆ6VÖVçBÂwVW76VBäôÒÔ”ÔRõUEG—RÂGWÆ–6FR–6¶W"Â&VæÖ–ærÀ§W&Ö—76–öç2fÆ÷r÷"æWr¥2f–ÆR†æFÆW"â'WGFöâ7F–ÆÂæÖW27W÷'FVBf÷&ÖG3°¦÷&–v–æÂF—7F6†W"&VgW6W2Vç&VÆFVBW‡FVç6–öç2&Vf÷&R&VF–æræB÷&–v–æÂäôÐ§'6W"fÆ–FFW26–væGW&R÷6V7F–öç2övVöÖWG'’gFW"6VÆV7F–öââ–×÷'FW"ö6÷&R'—FW0¦æC266†R–ç2&WF–æVBÂ–æ6ÇVF–ærÆ–Ö—G2æBvVöÖWG'’õUbÖöæÇ’66÷Rà ¥F†—2F&vWG2æF—fRG—Rf–ÇFW&–æs²W†7B•Bf–ÆW2÷&÷f–FW"6W6Ræ÷B&÷fVâà¤…DÔÂ7FæF&BW‡Æ–ç266WB—2æF—fR–6¶W"†–çBÂW6–ærÆFf÷&ÒG—RF&ÆW3 ¦‡GG3¢òö‡FÖÂç7V2çv†Gvræ÷&rö×VÇF—vRö–çWBæ‡FÖÂ6GG"Ö–çWBÖ66WBâ†—7F÷&–6À¥vV$¶—C##“CSbFö7VÖVçG2w&W–VBÖ÷WB”õ2f–ÆW2v—F‚v–ÆF6&Bf–ÇFW&–æs²&W6öÇfVB'Vp¦—2æ÷BF–væ÷6—2öb7W'&VçBFWf–6RâæWfW"7V'7F—GWFR66WCÒ"¢ò¢"†W&Rà¦‡GG3¢òö'Vw2çvV&¶—Bæ÷&r÷6†÷uö'Vræ6v“ö–CÓ##“CSbâæF—fR–6¶W"fÆ–FF–öâ&VÖ–ç0§VæF–æs²æòDôÒôæöFR6Æ–ÒF†B6f&’w27GVÂ6†ö÷6W"†2&VVâ&W—&VBà £#bfö7W6VB6†V6·253¢÷&–v–æÂäôÒFV6öFW"ö7GVÂF—7F6‚ö6öFV2ôtÄ"ôäôÒFW7G2À¦–×÷'B6öçG&öÇ2Â7W'&VçB&VÆV6Rö76WG2ö–FVçF—G“²öæRæWrwV&B76W'G2F†R6ÖP§6†VÆÂ6†ö÷6W"—2Væf–ÇFW&VBæBVç&VÆFVBf–ÆW2&R&VgW6VB&Vf÷&R&VG2öFG2à¥7–çF‚÷v†—FW76R6ÆVââ6†VÆÂÖöæÇ’fVGW&Rf—ƒ²gVÆÂÆö6Â&6VÆ–æS2†C#“ƒ0¥52Âæ÷B&W'Vâf÷"Væ6†ævVBFV6öFW"övVöÖWG'’â†÷7FVB4’&W7VÇB&V6÷&FVBB&ööbà¤6æöæ–6ÃB&VÆV6Rö&ö÷G7G&ö6ö×&—6öâ²&VÆV6RÓæf6RÖÆ–÷WBÓæG&vW"–ç0§&Wf–WvVC²6ö×&—6öâÖ–w&FW32v—F‚&F–æw2–çF7BÂFVfVÇBVæ6†ævVBà¥&÷FV7FVB×VÇF“ãög&÷¦Væ&WF2ÂäôÒ–×÷'FW"öW‡÷'BöFöæ÷"Ã"v—¦Öò¶6ö×7BÀ£æf–vF–öâæC–çB÷F‡&VRÖf–ævW"6öFR&VÖ–âVæ6†ævVBà ¤DUd”4SC¢&Vg&W6‚FóC²f–ÆR–×÷'BÓâäôÒ6†÷VÆB&R6VÆV7F&ÆRÂF†Vâ÷&–v–æÀ¦æF—fRvVöÖWG'’–×÷'B6†÷VÆB'VââG'’W†—7F–ærô$¢ôtÄ"öæ6Râ–b7F–ÆÂw&W’Â&W÷'@§v†WF†W"f–ÆR—2Æö6Âö”6Æ÷VBöæ÷F†W"&÷f–FW#²FöâwB6†ævRFV6öF–ær&6VBöâà§Væ÷VæVBf–ÆRâ'&öFW"æF—fRäôÒvVöÖWG'’õUbvFRæB–çBöÖFW&–Â7FvR&VÖ–à¦2&V6÷&FVB–ã2âW6W"w2÷6—F—fR&–v‡B×6–FRö'6W'fF–öâ&WF–æVBà¥V&Æ–6F–öâWf–FVæ6S¢Fö72÷V&Æ–6F–öâÓBæÖB‡fW&–f–6F–öâföÆÆ÷w2’à ¢ãBV&Æ–6F–öâfW&–f–VB(	B#’ö7Fö&W"##c ¥'VçF–ÖS†33C63“Sv6SSC#“F–ƒC#SvCf3C3–²FW7FVB÷WÆöFVBG&VP¦SvCƒSf63“–Cƒ3cc†VcscsFCƒ“C3âÆÃ"&Æö'2†6‚×fW&–f–VB&Vf÷&RFöÖ–0¦æöâÖf÷&6VBW‡V7FVBÖÖ–âWFFS²fWF6†VBÖ–âG&VRW†7FÇ’ÖF6†W2Æö6Â6†V6¶÷WBà¥vW3Cƒ#s“cc‚6ö×ÆWFVB5T44U52ãó66†RÖ'W7FVBÆ—fRf–ÆW2ÖF6‚Â–æ6ÇVF–æp§Væf–ÇFW&VB6†VÆÂÂ&VÆV6RÖÆöFW"6†–âæBVæ6†ævVB–×÷'FW"öFV6öFW"ô×VÇF“ãà£#bfö7W6VB6†V6·252Ç7–çF‚÷v†—FW76R6ÆVââgVÆÂÆö6Ã2&6VÆ–æS#“ƒ250§&WF–æVC²æòg&W6‚gVÆÂÆö6Â'Vâf÷"6†VÆÂÖöæÇ’6†ævRâ†÷7FVCCƒ#s“sSS7F–ÆÀ¦–å÷&öw&W72B&ööbÆæ÷B6Æ–ÖVB52âãBÄ•dRõ$TE’f÷"æF—fR6†ö÷6W"&WFW7C°¦7GVÂ•Bf–ÆW26VÆV7F&–Æ—G’æB7V'6WVVçBäôÒ–×÷'B&VÖ–âVæF–ærà ¢22ãBW6W"52òæW‡B&V6öÖÖVæFF–öâ(	B#’ö7Fö&W"##` ¤7W'&VçC¢ãBÄ•dRæBU4U"44UDTBâW6W"W‡Æ–6—FÇ“¢(	ÅU$dT5BB5>(	Òà¥&÷FV7BF†RVæf–ÇFW&VBæF—fRÖW6‚6†ö÷6W"æB66WFVBäôÒ6VÆV7F–öâö–×÷'BfÆ÷s°¦Fòæ÷B&V–ç7FFR66WBf–ÇFW&–ærÂv–ÆF6&BÔ”ÔRv÷&¶&÷VæG2÷"GWÆ–6FR–6¶W'2à¥F†—27WW'6VFW2V&Æ–W"ãBVæF–ær×–6¶W"æ÷FW2&VÆ÷râ—BFöW2æ÷BFB–çBÀ¦ÖFW&–Ç2÷"VF—F&ÆRÆ–W'2FòF†RvVöÖWG'’õUbÖöæÇ’–×ÆVÖVçFF–öâà¥'VçF–ÖS†33C2ÂV&Æ–6F–öâFö72÷V&Æ–6F–öâÓBæÖBâ†÷7FVBgVÆÂ&Vw&W76–öà£Cƒ#s“sSSæ÷r6ö×ÆWFVB5T44U53²vW3Cƒ#s“cc‚5T44U52‡&V6†V6¶VB’à¥W6W"w2÷6—F—fR&–v‡B×6–FR×67&VVâö'6W'fF–öâ&VÖ–ç2&V6÷&FVC²æòæWrô"&F6‚à ¥W6W"6·2(	Åv†G2æW‡Cþ(	Ó²F†—2—2&öFÖF—67W76–öâÂæ÷BæWrfVGW&R'V–ÆBà¥&V6öÖÖVæFVBæW‡Bæ'&÷r6æF–FFS¢æF—fRäôÒ–çFVBÖ6öÆ÷W"&W6W'fF–öâÂ6òF†P¦–×÷'FVBÖW6‚6â&WF–âæöÖBV&æ6RâVF—BW†—7F–ærfW'FW‚Ö6öÆ÷W"&Wf–WrÀ§&ö¦V7B6öFV2æBtÄ"ôäôÒW‡÷'B÷væW'2ÇW26÷W&6RÖÆ–W"6ö×÷6—F–ærf—'7C²FVf–æP¦&÷VæFVB7W÷'FVB6†ææVÇ2&Vf÷&R–×ÆVÖVçFF–öââ&WW6RW†—7F–ær&W6÷W&6RövVöÖWG'¦÷væW'2ÂæòGWÆ–6FR&VæFW&W"÷"–çB¶W&æVÂâ7V'6WVVçB7FvW3¢&÷Vv†æW72öÖWFÆæW72À§F†VâVÖ&VFFVB–ÖvRFW‡GW&W2æB&–6†W"Æ–W"÷&WVB7W÷'BâF†÷6R&R&÷÷6Ç2À¦æ÷BfVGW&W26†—VB÷"WFöÖF–26öÖÖ—FÖVçG2âãvW7GW&Ròã"v—¦Öòö6ö×7@¦–æF—f–GVÂfVVÂ†2æò6W&FRW‡Æ–6—Bw&F–ær&W–öæB7WÆ–VB'V–ÆBfVVF&6²à¤æò'VçF–ÖR6öFRÂ&VÆV6RfW'6–öâÂ66†R–ç2÷"æWr'V–ÆB6†ævVB–âF†—26W76–öâà¤æòæWrÖæFF÷'’FWf–6RFW7Bâ÷F–öæÂ6öæf–FVæ6R6†V6³¢–×÷'FVBäôÒÓâ6fRô÷Và¢æ&÷†Æ"æBÖVBUbVF—F÷#²F†—2—2W†—7F–ærã2vVöÖWG'’õUb66÷RÂæ÷B6öÆ÷W"à ¢22FW‡GW&Rõ%"&–÷&—G’æB&WF–æVBÖÖ&÷÷6Â(	B#’ö7Fö&W"##` ¤7W'&VçB'VçF–ÖR&VÖ–ç2ãBÄ•dRòU4U"52âW6W"W‡Æ–6—FÇ’6÷'&V7G2V&Æ–W §fW'FW‚×–çB&V6öÖÖVæFF–öã¢Æ÷r×öÇ’&÷„Æ"æVVG2Ug2ÂVÖ&VFFVBFW‡GW&W2æB%#°§fW'FW‚6öÆ÷W'2&R6V6öæF'’öFVfW'&VBVçF–ÂÖW6‚FVç6—G’&V6öÖW2&7F–6ÂâF†—0§7WW'6VFW2F†R–çFVB×fW'FW‚Ö6öÆ÷W"æW‡BÖ'V–ÆB&÷÷6Â&VÆ÷râæòæWr'V–ÆB6¶V@¦f÷"÷"–×ÆVÖVçFVBGW&–ærF†—27G&FVw’F—67W76–öâà ¥W6W"6·2v†WF†W"÷6—G’öF—7Æ6VÖVçBöVÖ—76—fR6â&R&WF–æVBv—F†÷WBF—7Æ’À¦÷"6†÷VÆB&R–×ÆVÖVçFVBâ&V6öÖÖVæFF–öâ‡&÷÷6ÂÂæ÷B6†—VB“¢&W6W'fRÆÀ¦æF—fRäôÒÖ6Æ÷G2f—'7B2âVæ6öFVBÖFW&–Â&W6÷W&6R'VæFÆRÂ–æFWVæFVçFÇ¦öb&VæFW&W"7W÷'Bâ&WF–â÷&–v–æÂVæ6öFVB'—FW2ö&—BFWF‚Â6Æ÷Bö–ÖvRöÖFW&–À¦76ö6–F–öç2ÂUb6WB÷G&ç6f÷&×2÷6×Æ–ærö6†ææVÂ6¶–ærÂ6öÆ÷W"×76R6VÖçF–72À¦f7F÷'2æBF—7Æ6VÖVçB7G&VæwF‚öÖ–Gö–çB÷v÷&ÆB÷&ö¦V7F–öâ6WGF–æw2â¶VW÷&–v–æÀ¦–×÷'B66ÆR÷Væ—B6VÖçF–73²Fòæ÷B6–ÆVçFÇ’Ç’v÷&ÆBF—7Æ6VÖVçBfÇVW2Fò§&W66ÆVBÖW6‚â&WW6RW†—7F–ær&W6÷W&6RööÇ2ö6öFV72öW‡÷'B÷væW'2v—F‚G'WF†gVÀ¦æF—fRäôÒ&÷fVææ6S²æòf¶RtÄ"&÷fVææ6R÷"6V6öæBÖFW&–Â÷–çB¶W&æVÂà ¥72×F‡&÷Vv‚66WFæ6RvFS¢äôÒ–×÷'BÓâæ&÷†Æ"6fRô÷VâÓâäôÒW‡÷'B&WF–ç0¦Ö'—FR†6†W2Â76–væÖVçG2æB6WGF–æw2v†Vâ7W÷'FVB6÷W&6RÖ–ær—2Væ6†ævVBà¥Ub÷F÷öÆöw’VF—G2×W7BG&6²6ö×F–&–Æ—G’æB6ÆV&Ç’fÆr–çfÆ–B&–æF–æw3²æð§6–ÆVçB&W6÷W&6RFVÆWF–öâÂ&RÖVæ6öF–ær÷&W6—¦–ær÷"fÇ6R&Wf–Wr÷&÷VæB×G&—6Æ–×2à¤ÖVÖ÷'’'VFvWG27F–ÆÂÇ“²&WF–âVçW6VBÖ2Væ6öFVBÂfö–BVvW"uRFV6öFRà¥6Æ÷G26â6†÷rf–Æ&ÆR&Wf–WrfW'7W2&WF–æVBÖf÷"ÖW‡÷'B7FGW2à ¤VF—C¢&ö¦V7BÖvÆ"×&W6÷W&6W2Ç&VG’ööÇ2÷&W6W'fW2–×÷'FVBtÄ"'—FW2²ÖFW&–À¤¥4ôã²æöÖBÖW‡÷'BÖ6÷&RöæF—fTÖFW&–ÄÖ2æBæöÖBÖF—7Æ6VÖVçBÖÖÇ&VG’W‡÷'@§7W÷'FVBtÄ"ÖFW&—fVBVÖ—76—fRöF—7Æ6VÖVçBFFâæF—fRäôÒ–×÷'B7F–ÆÂW‡Æ–6—FÇ¦–væ÷&W2–çBöÖFW&–Âö–ÖvR&W6÷W&6W2âW†—7F–ær7W&f6R&Wf–Wr66WG2÷VP¦ÖFW&–Ç2æB7W'&VçFÇ’W6W26öÆ÷W"ÖW6„&6–4ÖFW&–Â÷fW&Æ’âF†W&Vf÷&R7W'&Vç@¤&÷„Æ"—2æ÷B6ö×ÆWFRæF—fRäôÒ%"f–WvW#²&V6öææV7BöW‡FVæB÷&–v–æÂ÷væW'2à¤W†—7F–æræF—fRW‡÷'B†27G&–7B6÷W&6R÷&ö¦V7F–öâ÷6×ÆW"öÖFW&–ÂÆ–Ö—G2Â6ò&p§&WFVçF–öâæB6÷'&W7öæF–æræF—fRäôÒW‡÷'B7W÷'BæVVBW‡Æ–6—BFW7G2f—'7Bà ¥&VæFW&–ær&V6öÖÖVæFF–öâgFW"&WFVçF–öã¢&6R6öÆ÷W"²æ÷&ÖÂ÷&÷Vv†æW72öÖWFÆæW73°¦VÖ—76—fR&Wf–WrV&Ç’‡6VÆbÖÆ—BV&æ6RÂæ÷BWFöÖF–266VæRÆ–v‡F–ærö&ÆööÒ’À¦÷6—G’æW‡B†7WF÷WBF†Vâ&ÆVæF–ær÷6÷'F–ær÷–6¶–ær÷6†F÷w2’ÂF—7Æ6VÖVçB&WF–æV@¦öæÇ’–æ—F–ÆÇ’âF—7Æ6VÖVçBÖ÷fW2W†—7F–ærfW'F–6W3²FWF–ÆVB&W7VÇG2æVVBVæ÷Vv€§fW'F–6W2Âæ÷BÖæFF÷'’WFöÖF–27V&F—f—6–öââÆFW"÷F–öæÂ&÷VæFVB&VæFW"ÖöæÇ§7V&F—f—6–öâöF—7Æ6VÖVçB×W7B&W6W'fRVF—F&ÆR&6RæB72FWf–6RÖVÖ÷'’÷7VV@¦&Væ6†Ö&·2âæòFVç6R&Wf–Wr÷"W&f÷&Öæ6R&VæVf—B–×Æ–VB–â7W'&VçB'V–ÆBà¥&–Ö'’&VæFW&W"&VfW&Væ6S¢‡GG3¢ò÷F‡&VV§2æ÷&röFö72÷vW2ôÖW6…7FæF&DÖFW&–Âæ‡FÖÂà ¤æW‡Bæ'&÷r6æF–FFR—2æF—fRäôÒFW‡GW&RöÖFW&–Â&WFVçF–öâæB&÷VæB×G&— §fÆ–FF–öã²66÷R&Wf–WrFF—F–öç26W&FVÇ’2VF—BW&Ö—G2âF†—2—2&V6÷&FV@§&V6öÖÖVæFF–öâÂæ÷B–×ÆVÖVçFF–öâWF†÷&—¦F–öâf÷"æWrfVGW&R'V–ÆBâæð§'VçF–ÖR÷&VÆV6Rö66†R6†ævW2æBæòæWr†æG2ÖöâFW7G2F†—26W76–öâà ¢22ãR(	BæF—fRäôÒff–æR×&÷r&÷VæF–ær&W—"(	B#’ö7Fö&W"##` ¥7FGW3£RÄ•dRò$TE’f÷"FW7F–æs²'VçF–ÖScS63‚â&6VÆ–æRÖ–ã663&c’ÂÆ—fS@§'VçF–ÖS†33C2òU4U"52&WF–æVBâW6W"&W÷'G2(	ÄäôÒFWƒ¢–çfÆ–Bff–æP§G&ç6f÷&Þ(	ÒæB7WÆ–W2ÔDU5BææöÒâ&W&öGV6VBöâ7GVÂf–ÆRBFW‡BæöFS ¦fÆöC3"ÖG&—…³UÓÓã““““““scSƒC#’ƒ"fÆöC3"TÅ2&VÆ÷s“²W†7Bff–æR×F–À§fÆ–FF–öâ–æ6÷'&V7FÇ’&VgW6VBF†—26fVBöÇ–vöâvVöÖWG'’âæòFW‡GW&RÖÖ6W6Rà ¤÷&–v–æÂæöÖBÖ–×÷'BÖ6÷&R&VÖ–ç26öÆR'6W"övVöÖWG'’÷væW"â66WBôäÅ’'6öÇWFP£RÓbFWf–F–öç2g&öÒ³ÃÃÃÒB6öÇVÖâÖÖ¦÷"–æF–6W32óróóS²6æöæ–6Æ—¦R6÷–V@¤ÖG&—ƒB&÷r$Tdõ$R&VçB6ö×÷6—F–öââWW#7ƒ2æBG&ç6ÆF–öâVæ6†ævVC²6÷W&6P¤¥4ôâö'—FW2æWfW"×WFFVBâ&÷VæB—2–æFWVæFVçBöbÆ&vRG&ç6ÆF–öâ÷66ÆRâf–æ—FP£bÖVÆVÖVçB÷G—RÂ6–æwVÆ&—G’ÂÆ–Ö—G2ÂUbö–æFW‚ö†–W&&6‡’æBFöÖ–2'6RÖ&Vf÷&RÖF@¦6†V6·2&WF–æVBâÆ&vW"W'7V7F—fRöæöâÖff–æRG&–gBÂ¦W&òrÂ–çfÆ–BfÇVW2æ@§6–æwVÆ"G&ç6f÷&×27F–ÆÂ&VgW6RâæòvVæW&–2G&ç6f÷&Òô'&’övVöÖWG'’Ö÷væW"6†ævRà ¤7GVÂ6÷W&6Ræ÷rFV6öFW27V&SC“gbóSFbæBFW‡Cs“bós“fbÂ$õD‚v—F‚Ug2âW†—7F–æp¢æ&÷†Æ"6fRô÷VâÓâäôÒW‡÷'BÓâ&V–×÷'B&WF–ç2F†V—"6÷VçG2õUb&W6Væ6S²6÷W&6P¦'—FW2Væ6†ævVBâ66VæRÆ–v‡G2ö6ÖW&2öÖ—GFVBæB67VÇBÖÆ–W"fÆGFVâv&æ–ær&VÖ–âà¥–çBöÖFW&–Ç2÷FW‡GW&W2öÖ6·2&VÖ–âVç7W÷'FVB'’æF—fR–×÷'C²F†—2'V–ÆBFöW0¤äõB–×ÆVÖVçBF†R&WF–æVBÖÖ&÷÷6ÂâW6W"'Gv÷&²æ÷B6÷–VB–çFò&W÷6—F÷'“°§&Vw&W76–öâW6W2öæÇ’W†7Bf–Æ–ærÖG&—‚v—F‚–æFWVæFVçBW7G&VÒvVöÖWG'’f—‡GW&Rà ¥GvòæWr7GVÂ'6W"öF—7F6†W"FW7G26÷fW"6×ÆRG&ç6f÷&ÒöÖ—'&÷"÷6÷W&6RõUbÀ§÷6—F—fRöæVvF—fR&÷rG&–gBB&VçB¶6†–ÆBÂ6æöæ–6ÂÆ6VÖVçBæB&VgW6Âö`§W'7V7F—fRö–çfÆ–B÷6–æwVÆ"&÷w2†–æ6ÇVF–ær‡VvRG&ç6ÆF–öâ’â#2fö7W6VB6†V6·0¥53²gVÆÂÆö6ÂæöFS#Bã#"ã&Vw&W76–öã#“ƒb52ód”Âó6¶—ó6æ6VÂƒ2ãC'2’à¥7–çF‚÷v†—FW76R6ÆVââæF—fR•BFWf–6R66WFæ6RVæF–ærà¥&Wf–WvVCR6†VÆÂö&ö÷G7G&÷&VÆV6Rö6ö×&—6öâÂ–×÷'BÓæFV6öFW"æB6æöæ–6À§&VÆV6RÓæf6RÖÆ–÷WBÓæG&vW"66†R6Æ÷7W&RâW†—7F–ær6ö×&—6öâ&F–æw2Ö–w&FSC°¤FVfVÇBöæò&WVBô"vFRâ&÷FV7FVB×VÇF“ãög&÷¦Vâ&WF.(	3rÃBVæf–ÇFW&VB–6¶W"À£"v—¦Öòö6ö×7BÃæf–vF–öâÃ–çBövW7GW&W2Â&W6÷W&6RöW‡÷'B÷væW'2Væ6†ævVBà ¤DUd”4SS¢&Vg&W6‚FóS²–×÷'B÷&–v–æÂÔDU5BææöÒÂ–ç7V7B7V&RõFW‡B&VÆF—fP§Æ6VÖVçBæBUbVF—F÷"âVæFòõ&VFò–×÷'C²6fRô÷Vâæ&÷†Æ"æBäôÒvVöÖWG'’õUbW‡÷'Bà¥W6W"6Æ&–f–W2FW‡B—2Æ—fRÂæöâ×fÆ–FFVBæöÖBFW‡Bö&¦V7C²6fVBöÇ–vöà§6†R–×÷'G2Âæ÷BVF—F&ÆRæöÖBFW‡B6VÖçF–72âfÆ–FF–öâÖ’&Ww&—FR—G2ÖG&—€¦'WBF†Bv÷&¶&÷VæB—2VçFW7FVBæB—2æ÷B&WV—&VB'’F†—2&÷VæFVB&W—"à¤æòFW‡GW&Rõ%"G&ç6fW"&öÖ—6RâæW‡BföÆÆ÷ræF—fR–×÷'BfVVF&6²ÂF†Vâ6W&FVÇ§66÷RæF—fRäôÒ&WF–æVBÖÖ&W6÷W&6W2÷&÷VæB×G&—â6VRFö72÷V&Æ–6F–öâÓRæÖBà ¢ãRV&Æ–6F–öâfW&–f–VB(	B#’ö7Fö&W"##c ¥'VçF–ÖScS63ƒ#“vf#v#VS–c&&cSc#–FffS6Sf6f#&C²FW7FVB÷WÆöFVBG&VP¦#c3F3fSccs6S#c“#sFFcCvCv&CvF6cC&cW†7FÇ’ÖF6†W2fWF6†VB÷&–v–âöÖ–âà¤ÆÃB&Æö'2fW&–f–VB&Vf÷&RFöÖ–2æöâÖf÷&6VBW‡V7FVBÖÖ–âWFFRâvW3Cƒc“csƒ“€¦6ö×ÆWFVB5T44U53²ÆÃg&W6‚Æ—fRf–ÆW2'—FRÖÖF6‚FW7FVB6†V6¶÷WB‡6†VÆÂÆÖæ–fW7BÀ¦–×÷'FW"ÆFV6öFW"Ç&VÆV6RÆöFW"6†–âÆ6ö×&—6öâæB&÷FV7FVB×VÇF“ã’âgVÆÂÆö6À¤æöFS#Bã#"ã£#“ƒb52ód”Âó6¶—ó6æ6VÂƒ2ãC'2’Ã#2fö7W6VB6†V6·252À§7–çF‚÷v†—FW76R6ÆVââ†÷7FVCCƒc“cƒsC‚7F–ÆÂ–å÷&öw&W72B&ööc²æ÷B6Æ–ÖVB52à¤'V–ÆCRÄ•dRò$TE’f÷"æF—fR–×÷'B&WFW7C²FWf–6R66WFæ6RVæF–ærà ¥6V6öæBW6W"WÆöBÔDU5Bƒ’ææöÒƒ"ÃƒRÃƒS&'—FW2’6öçF–ç2ôäÅ’7V&SC“gbóSFbv—F€¥Ug3²FW‡B—2'6VçBâ—B–×÷'G2öâ&÷F‚&RÖf—ƒBæBF6†VCRâ÷&–v–æÂf—'7@¤ÔDU5BææöÒƒ2Ã#sÃ&'—FW2’–æ6ÇVFW2Æ—fRFW‡Cs“bós“fbv—F‚&÷VæFVBff–æRs §&RÖf—‚&VgW6W2ÂF6†VB–×÷'G2$õD‚ö&¦V7G2âF†—26ö×&—6öâ6öæf—&×2F†Rf–Æ–æp§6fVBFW‡BG&ç6f÷&ÒÂæ÷B&ööbF†BfÆ–FF–ærFW‡B&Ww&—FW2öf—†W2—G2ÖG&—‚à¤æòVF—F&ÆRæF—fR×FW‡B6VÖçF–72÷"FW‡GW&RöÖFW&–Â&W6W'fF–öâFFVBâW6W"f–ÆW0§&VÖ–âVæ6†ævVBæB&Ræ÷B6öÖÖ—GFVB–çFò&W÷6—F÷'’âæF—fRFW‡GW&Rõ%"&WFVçF–öà¦—27F–ÆÂF†R6W&FRæW‡B&÷÷6ÂâDUd”4SR÷&–v–æÂf—'7Bf–ÆR—2ÖVæ–ævgVÀ§&Vw&W76–öâFW7C²6V6öæB7V&RÖöæÇ’6÷’—2W6VgVÂvVöÖWG'’õUb6æ—G’6†V6²à ¢22ãb(	Bv—¦ÖòF—&V7F–öâæB6ö×öæVçB×F÷V6‚&W—"(	B3ö7Fö&W"##` ¥7FGW3£bÄ•dRò$TE’f÷"FW7F–æs²'VçF–ÖS#V6VcƒSrâ&6VÆ–æRÖ–ã“v#“FC÷'VçF–ÖP£cS63‚‚ãR’âW6W"&W÷'G2÷÷6—FRö&¦V7B&÷FF–öâ÷66ÆRæB6ö×öæVçBv—¦Ö÷0¦æ÷B7F–ærâæóRæF—fR52–æfW'&VC³B66WFæ6RæCRäôÒff–æRf—‚&WF–æVBà ¤VF—FVB÷&–v–æÂF÷FÂv—¦Öòöä†æFÆTF÷vâÓâG&ç6f÷&Ò×Ww&FR6VÖçF–2÷væW"æ@¤ö&¦V7Bô×VÇF’fÆÆ&6²Óâ÷&–v–æÂö&¦V7BÖ÷&–v–ââ6öæf—&ÖVB6ö×öæVçBF÷V6‚&VgW6V@¦B6VÖçF–2&Vv–ã²ö&¦V7BfÆÇ2&6²Fò7–çF†WF–2VâÂ6ö×öæVçB–çFVçF–öæÆÇ’&Æö6·0¦6çf2&WÆ’â&VÖ÷fRF÷V6‚&V¦V7F–öâôäÅ’g&öÒW‡Æ–6—B6VÖçF–2&Vv–ã²7GVÂ6çf0§F÷V6‚vFRô÷&&—B÷væW"&VÖ–ç2âVæ6–ÂöÖ÷W6RF‚&WF–æVC²æòæWrö–çFW"Æ—7FVæW"à ¤W‡Æ–6—Bv—¦Öò6öç7G&–çG2æ÷r÷WG&æ²†—26æ–â$õD‚W†—7F–ærG&ç6f÷&Ò÷væW'3°¦öæÇ’WFò÷G2–çFò–æfW&Væ6Râ&Wf–÷W6Ç’†—26æ6÷VÆB&WÆ6R…•¢÷"Væ–f÷&Òög&VP§v—F‚âVç&VÆFVBG&rÖ–æfW'&VB†—2â…•¢v—¦Öò&÷FF–öâ6÷'&V7G267&VVâv–æF–ær'¦†—2F÷B6ÖW&f–WrF—&V7F–öã²÷÷6—FR6ÖW&6–FRö–çfW'FVBf–Wr7W÷'FVBâw&W¥f–WrÖ†—2&ÆÂ7F—2÷&–v–æÂ6ÖW&Ö†—2&÷FF–öââVæ–f÷&Ò66ÆRW6W2&F—W26†ævP¦g&öÒ–æ—F–Â6VçG&R–âWfW'’VG&çB†÷WGv&Bw&÷w2ö–çv&B6‡&–æ·2“²†—266ÆRW6W0¦÷&–v–æÂ&ö¦V7FVB÷6—F—fR&–ÂâÆVv7’6çf2vW7GW&W2&WF–â&Wf–÷W2Ö–ærà¤ö&¦V7BÖ÷&–v–âô×VÇF’&WW6R6ÖRW†—7F–ær—f÷Bö÷&–v–âö†—7F÷'’övVöÖWG'’÷væW'3²&÷FV7FV@¦×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3ãVæ6†ævVBâæòGWÆ–6FRÖöFVÆÆ–ær¶W&æVÂ÷"T’&W6¶–âà ¥6VÖçF–26ö×öæVçBFö6æ6VÂæ÷rW‡Æ–6—FÇ’&W6WG2G&ç6–VçBv—¦Öò7FFR&V6W6P¦÷væW"v–æF÷rÖ6GW&R6ö×ÆWF–öâ6öç7VÖW2&rWfVçB&Vf÷&RF÷FÂv—¦Öò6VW2—Bâ6æ6VÀ§&W7F÷&W2÷&–v–æÂfW'F–6W3²FFöW2æ÷B7&VFR†—7F÷'’÷"÷VâW†7BVçG'’â6öÖÖ—GFV@¦G&w2&WF–â÷&–v–æÂ6ö×ÆWF–öâôW†7Bâ6VÆV7F–öâæB÷&F–æ'’VæFò÷&VFò7F’÷væW'2à ¥6—‚æWrFW7G2W†V7WFR7GVÂ÷væW'2æBF÷FÂv—¦Öò6VÖçF–2†æFöfbv—F‚F÷V6‚À¥Væ6–ÂöÖ÷W6RÂfW'FW‚ôVFvRôf6R6VÆV7FVBÖöæÇ’Ö÷fW2Â…•¢6Æö6·v—6S“7&÷72&÷F‚6ÖW&§6–FW2ö–çfW'FVBf–Ww2ô†—26æôâÂVæ–f÷&Ò66ÆRÆÂVG&çG2Â×VÇF’öw&÷W—f÷G2ð¦÷&–v–ç2÷66ÆRö6æ6VÂæBF&W6WBâf—'7C2FW7G2f–Âv–ç7B&RÖf—‚÷væW'2â†—7F÷&–6À§&÷FFRÖ÷væW"†VÇW"W‡V7FVB¢VFW&æ–öâ6†ævW2³“FòÓ“f÷"6Æö6·v—6R67&VVà¦Ö÷F–öâf6–ærµ£²ÆÂ6VÆV7F–öâö†—7F÷'’öÆVv7’76W'F–öç2&WF–æVB‡&WVW7FVBf—‚’à£Cfö7W6VB6†V6·253²gVÆÂÆö6ÂæöFS#Bã#"ã£#““"52ód”Âó6¶—ó6æ6VÀ¢ƒBã2’â7–çF‚÷v†—FW76R6ÆVââæòæF—fR6f&’fVVÂ6Æ–ÖVBà ¥&Wf–WvVCb6†VÆÂö&ö÷G7G&÷&VÆV6Rö6ö×&—6öâÂG&ç6f÷&Ò×Ww&FRæ@§&VÆV6RÓæf6RÖÆ–÷WBÓæG&vW"Óæö&¦V7BÖ÷&–v–â66†Rw&‚âF÷FÂv—¦Öòf—7VÃ"'—FW2ð§–âVæ6†ævVBÂ–×÷'FW"öFV6öFW#RVæ6†ævVBÂ6ö×&—6öâÖ–w&FW3R&F–æw2v—F€¤FVfVÇBöæò&WVBô"âg&÷¦Vä&WF.(	3rÂ66WFVBæf–vF–öâõ–çBôäôÒ÷&W6÷W&6RõUbö¶W&æVÀ¦÷væW'2Væ6†ævVBâDUd”4Sbö&¦V7B…•¢&–æw2g&öÒg&öçBö&6²æBw&W’f–Wr&ÆÃ°¦÷&ævR&–ær÷WGv&Bö–çv&BöâÆVgB÷&–v‡B÷F÷ö&÷GFöÓ²6VÆV7B6WfW&ÂfW'F–6W2ÂVFvP¦÷"f6RÓâW‡æBv—¦ÖòÓâÖ÷fRõ&÷FFRõ66ÆRv—F‚f–ævW"õVæ6–Ã²6VÆV7F–öâõVæFõ&VFòð¤6æ6VÂæB×VÇF’öw&÷W6æ—G’âæW‡BföÆÆ÷ræF—fRfVVF&6²ÂF†VâäôÒÖ×&WFVçF–öà§&÷÷6Â6W&FVÇ’âV&Æ–6F–öâWf–FVæ6S¢Fö72÷V&Æ–6F–öâÓbæÖBà ¢ãbV&Æ–6F–öâfW&–f–VB(	B3ö7Fö&W"##c ¥'VçF–ÖS#V6VcƒSsƒf6##3SvC“VCCssfSV†c3S6C“²FW7FVB÷WÆöFVBG&VP£–Cs#–VS3vF###V“ƒS#csCf3vFc“ƒSfW†7FÇ’ÖF6†W2fWF6†VB÷&–v–âöÖ–âà¤ÆÃR&Æö'2†6‚×fW&–f–VB&Vf÷&RFöÖ–2æöâÖf÷&6VBW‡V7FVBÖÖ–âWFFRâvW3C“SƒsS3c“ ¦6ö×ÆWFVB5T44U53³"ó"g&W6‚Æ—fR'—FRÖF6†W3¢Öæ–fW7BÇ6†VÆÂÇG&ç6f÷&Ò×Ww&FRÀ¦ö&¦V7BÖ÷&–v–âÆG&vW"Æf6RÖÆ–÷WBÆ&ö÷G7G&Ç&VÆV6RÆ6ö×&—6öâæBVæ6†ævVBF÷FÂv—¦ÖòÀ¤×VÇF“ãæBäôÒFV6öFW"âgVÆÂÆö6ÂæöFS#Bã#"ã£#““"52ód”Âó6¶—ó6æ6VÀ¢ƒBã2“³Cfö7W6VB52Ç7–çF‚÷v†—FW76R6ÆVââ†÷7FVCC“SƒsSC3‚&VÖ–ç0¦–å÷&öw&W72B&ööbÆæ÷B6Æ–ÖVB52âãbÄ•dRò$TE’f÷"æF—fR•BFW7G3°¦æòW6W"66WFæ6R–æfW'&VBâÆÂf÷W"†æFöfbFö7VÖVçG2WFFVC²&WF–æVBäôÒõ% §&÷÷6Â&VÖ–ç26W&FRâDUd”4Sc¢ö&¦V7B&–æw2öw&W–&ÆÂF—&V7F–öâæB66ÆP¦÷WGv&Bö–çv&Bg&öÒÆÂVG&çG3²×VÇF’×fW'FW‚öVFvRöf6RÖ÷fRõ&÷FFRõ66ÆRv—F€¦f–ævW"õVæ6–Ã²6VÆV7F–öç2ÅVæFõ&VFòÇFö6æ6VÂæB×VÇF’öw&÷W6æ—G’à ¢22ãbW6W"52(	B3ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’&WÆ–W2(	Å5>(	ÒFò6†—VBãbv—¦Öò&W—"â7W'&VçB'V–ÆC`¢‡'VçF–ÖS#V6VcƒSr’—2Ä•dRòU4U"44UDTBâ&÷FV7B66WFVBö&¦V7B&÷FF–öâ÷66ÆP¦F—&V7F–öç2ÂW‡Æ–6—B†æFÆR6öç7G&–çG2÷fW"†—26æÂ6ö×öæVçBF÷V6‚õVæ6–ÂöÖ÷W6P¦†æFöfbæBW†—7F–ær†—7F÷'’÷6VÆV7F–öâ&V†f–÷W"âF†—27WW'6VFW2V&Æ–W#`§VæF–æræF—fR66WFæ6Ræ÷FW3²æò6W&FSRæF—fRäôÒ66WFæ6R–æfW'&VBà¤æò'VçF–ÖRÂ&VÆV6RÖ&¶W'2÷"66†R–ç26†ævVBf÷"F†—266WFæ6R&V6÷&Bà¤æòg&W6‚WFöÖFVB'Vâ÷"ÖæFF÷'’†æG2ÖöâFW7BæVVFVBf÷"Fö7VÖVçFF–öâöæÇ’à¤æW‡B&V6÷&FVB6æF–FFR&VÖ–ç2æF—fRäôÒFW‡GW&Rõ%"&WFVçF–öâv—F‚6fRô÷VâôäôÐ§&÷VæB×G&—fW&–f–6F–öâÂ6W&FVÇ’66÷VBg&öÒ&VæFW&–æröF—7Æ6VÖVçB&Wf–Wrà¤æòæWrfVGW&R'V–ÆB&WVW7FVB'’52ÆöæRà ¢22ãr(	BW"Öö&¦V7BÆö6Âv—¦Öò—f÷Bv÷&¶fÆ÷r(	B3ö7Fö&W"##` ¥7FGW3£rÄ•dRò$TE’f÷"FW7F–æs²'VçF–ÖScS3“&Bâ&6VÆ–æRÖ–ã“ScCCV2À§'VçF–ÖS#V6VcƒSr‚ãbU4U"52&÷FV7FVB’âW6W"&WVW7G2&VÖ÷f–ærv—¦ÖòVæFòõ&VFòÀ¦f6RÖæ÷&ÖÂ—f÷BÆ6VÖVçBÂ6VçG&RÖVæ&ÆVB’Gv—7BÂv÷&ÆBôÆö6ÂæBW"Öö&¦V7B&V6ÆÂà¤–çFW'&WFF–öâ7FFVB&Vf÷&Rv÷&³¢’föÆÆ÷w2f6Ræ÷&ÖÃ²…¢Æ–W2FævVçBFòf6Rà ¤W†—7F–ærö&¦V7BÖ÷&–v–â&V6÷&B—2F†R4ôÄR—f÷B÷6—F–öâ÷væW"âæWr6ÖÆÀ¦v—¦ÖòÖÆö6Â×—f÷BÖöGVÆR‡7&2öv—¦ÖòÖÆö6Â×—f÷Bæ§2’VF—G2G&ç6–VçBG&gBÂF†Và§&WÆ6W2fÆB÷&–v–âf–VÆG2‚÷’÷¢÷‚÷’÷¢÷röv—¦ÖôÆö6ÂF‡&÷Vv‚÷&–v–æÂö&¦V7BÖ†—7F÷'¦6†V6·ö–çBâæò&ÆÆVÂÖöFVÆÆ–ær÷—f÷Bö†—7F÷'’¶W&æVÂ÷"&ö¦V7B&W6÷W&6R6†ææVÂà¤W†—7F–ærfÆB÷&–v–â7&VG2Ç&VG’&W6W'fRf–VÆG27&÷7266VæR6GW&R÷&W7F÷&RÀ¤GWÆ–6FRæBæ&÷†Æ"6öFV3²æò66VæRfW'6–öâ'V×â6WD÷&–v–âæ÷r&W6W'fW2÷F–öæÀ¦fÆBf–VÆG2Â&WfVçF–ær÷&–v–æÂ&W6WBöÖ÷fR÷væW'2g&öÒW&6–ær÷&–VçFF–öâà ¤&÷GFöÒ×&–v‡B6÷&æW"—"æ÷r—f÷BVF—B‡F–ç’†W2–ç6–FR&–ær’æBv÷&ÆBôÆö6À¢†vÆö&Rö†W2'Gv÷&²“²æòv—¦ÖòVæFòõ&VFò'WGFöç2â†VFW"ö†—7F÷'’vW7GW&W2Væ6†ævVBà¥—f÷BVF—C¢F5D•dRf—6–&ÆRf6RÓâW†7B7W&f6Rö–çB²vVöÖWG&–2f6Ræ÷&ÖÃ°¦6VçG&R&W72Væ&ÆW2’GW&âÂG&rw&VVâ’&–ær†÷"6VçG&R†÷&—¦öçFÆÇ’“²—f÷B'WGFöà¦f–æ—6†W2âvVöÖWG'’÷6VÆV7F–öâVçF÷V6†VBGW&–ærG&gC²v†öÆRVF—B—2öæR÷&–v–æÂ66VæP¦6†V6·ö–çBâW66R÷vV†–FRF—66&C²ö–çFW"6æ6VÂ&öÆÇ2&6²7W'&VçB7–âöæÇ’à¤6çf2æf–vF–öâ÷&rF÷V6‚†—7F÷'’—2W6VBôäÅ’GW&–ærW‡Æ–6—BVF—BæB&W7F÷&V@¦öâW†—Bâ÷F†W"v—¦Öò6†÷'F7WG2F—6&ÆVBGW&–ærVF—C²—f÷B÷76R&VÖ–âf–Æ&ÆRà¤6Æ–6²÷WG6–FRv—¦Öòö6çf26öÖÖ—G2&Vf÷&R÷F†W"T’â6VÆV7F–öâ6†ævW26fVÇ’f–æ—6‚à ¥&’–6²&WW6W2&VæFW&W"w27GVÂf—6–&ÆR&6R&öG’öæ÷&ÖÂG&ç6f÷&Ó²æV&W"–æ7F—fP¦&öG’&Æö6·2Æ6VÖVçBâæòæWrÖW6‚G&–æwVÆF–öâÂ†çFöÒF‡&÷Vv‚Öö&¦V7B–6¶–ærÀ¦æ÷&ÖÂ–çF–ær÷"UbVF—G2â7W'&VçBVF—F–ærvFS¢öæR–æFWVæFVçBVæÆö6¶VB&6P¦ö&¦V7BÂæò&VfW&Væ6RöÆ–æ¶VBöWfÇVFVB÷&ö6VGW&Âõ–çBö7F—fRÖöFVÆÆ–ær6W76–öâà¤×VÇF’öw&÷W¶VW2÷&–v–æÂv÷&ÆB—f÷B&V†f–÷W#²Æö6ÂVF—F–ær&VgW6VBf÷"×VÇF’à ¤Æö6Â&WGW&ç27F÷&VB÷6—F–öâæB÷'F†öæ÷&ÖÂVFW&æ–öã²v÷&ÆBW6W2÷&–v–æÀ§6VÆV7F–öâ6VçG&R÷v÷&ÆB†W2âV6‚ö&¦V7B&VÖVÖ&W'2—G2g&ÖRæB76R6†ö–6Rà¤W†—7F–ærF÷FÂv—¦ÖòW6W26ÖRg&ÖRf÷"æ6†÷"ö'&÷w2÷ÆæRG2ög&öçB&–ærF‡0¤äB†—B&÷†–W2â÷&–v–æÂG&ç6f÷&Ò×Ww&FR÷vç2Æö6Â&ö¦V7FVBÖ÷fRÂVFW&æ–öà¥&÷FFRÂ&6—2×76R66ÆRæBW†7C²g&÷¦Vâ7F'Bg&ÖR&WfVçG267V×VÆF–öâöG&–gBà¤ö&¦V7BÖ÷fW2÷&÷FFW26''’÷&–v–âög&ÖRÂ–æ6ÇVF–ærv†–ÆRv÷&ÆBF—7Æ–VC²6æ6VÀ§&W7F÷&W2vVöÖWG'’äB÷&–v–ââ6ö×öæVçBG&ç6f÷&×2ffV7BöæÇ’6VÆV7FVBfW'F–6W0¦&÷WB6ÖR7W7FöÒg&ÖS²ö&¦V7B÷&–v–â—G6VÆb&VÖ–ç2f—†VBf÷"6ö×öæVçBVF—G2à¤w&W’67&VVâ&ÆÂ&VÖ–ç2f–WrÖ†—3²W‡Æ–6—B†W2óbF—&V7F–öâöFWFVçG2&WF–æVBà¤æòGWÆ–6FRvW7GW&R÷"G&ç6f÷&Ò¶W&æVÃ²&÷FV7FVB×VÇF“ãög&÷¦Vâ&WF2VçF÷V6†VBà ¥6WfVâæWrÖöGVÆRö7GVÂÖ÷væW"FW7G2²öæRWFFVB6÷&æW"FW7C¢f6R†æFVFæW72À§f—6–&ÆR–6¶–æröö66ÇW6–öâÂG&gBÆ6VÖVçBõ’Gv—7BÂ7GVÂ66VæRVæFõ&VFòÂ6fT÷VâÀ¦ö&¦V7B&V6ÆÂõv÷&ÆDÆö6ÂÂ&VgW6Ç2Â6ö×öæVçB6VÆV7F–öâÂW†7BÖ÷fRõ&÷FFRõ66ÆRÀ§&VÂ&ö¦V7FVBG&w2ö6æ6VÂöæöæ67V×VÆF–öâæB6†÷'F7WB7FFRâ3bfö7W6VB53°¦f–æÂfö7W6VC#R52–æ6ÇVF–ærg&ÖRÖ66†R÷&WÆ6VÖVçB6†V6·2âf–æÂÆö6À¤æöFS#Bã#"ã£352ód”Âó6¶—ó6æ6VÂƒrãC72“²7–çF‚÷v†—FW76R6ÆVâà¤g&ÖR&ö¦V7F–öâ&WW6W2F†RÖævW"w27F&ÆR×WF&ÆR66VæR'&’†æ÷Bö&¦V7@§&VfW&Væ6W2’Âfö–F–ær&WVFVBvWGFW"×G&–vvW&VBÖW6‚6÷–W3²&WÆ6VÖVçBö&¦V7G0¦gFW"†—7F÷'’&W7F÷&R&VÖ–âf—6–&ÆRâæòVæÖV7W&VB7VVBö66—G’6Æ–Òà¥7FæFÆöæRW†7B5dr–6öç2&VæFW&VBö–ç7V7FVC²7GVÂ'&÷w6W"Væf–Æ&ÆR&V6W6P¤6‡&öÖ—VÒ'6VçBæB'&÷w6W"F÷væÆöB&WGW&æVBG'Væ6FVB&6†—fW2âæò&VæFW&VB÷ ¦æF—fR•B66WFæ6R6Æ–ÖVBâ÷&–v–æÂFW7Cs"&WÆ6W2ôäÅ’&WVW7FVBVæFòõ&VFð§6†÷'F7WB76W'F–öç2v—F‚—f÷B÷76R6÷fW&vS²FööÆ&"ö†—7F÷'’&V†f–÷W"&WF–æVBà ¥&Wf–WvVCr6†VÆÂ÷&V6÷fW'’ö6ö×&—6öâÂF÷FÂv—¦ÖòÓææWr—f÷B¶6÷&æW"6†–ÆBÀ§G&ç6f÷&Ò×Ww&FRæB&VÆV6RÓæf6RÖÆ–÷WBÓæG&vW"Óæö&¦V7BÖ÷&–v–âw&‚â–6öâÖöæÇ¦–×÷'B&VçG2ö&¦V7BÖÖævVÖVçB÷f–Ww÷'B×FööÆ&"Ö6öçG&öÇ2÷F÷&"&W–ææVBFövWF†W#°§F†÷6R&VçG2†fR–×÷'BÖöæÇ’6†ævW2â6ö×&—6öâ&WF–ç3b&F–æw2ôFVfVÇBà¤äôÓR–×÷'FW"÷&W6÷W&6W2÷&VæFW&W"öæf–vF–öâõ–çBõUbövVöÖWG'’Væ6†ævVBà¤DUd”4Ss¢–ç7V7B&÷GFöÒ×&–v‡B–6öç3²—f÷BÓæf6RÓæ6VçG&RÓæw&VVå’Óå—f÷BÂÖöFVÂ×W7@§7F’7F–ÆÂVçF–ÂW†—BæBG&ç6f÷&ÒâÆö6Â…•¢Ö÷fRõ&÷FFRõ66ÆRôW†7B&÷WB6†÷6Và§ö–çC²v÷&ÆBôÆö6ÂFövvÆRÂ÷F†W"ö&¦V7BæB&6³²VæFõ&VFòæB6fT÷Vâ&W6W'fRg&ÖRà¤Æö6ÂfVGW&R66WFæ6RVæF–ærâäôÒFW‡GW&RÖÖ–×÷'BöF—7Æ’&VÖ–ç2Væ–×ÆVÖVçFV@¦æB6W&FVÇ’VWVVC²ãb52&WF–æVBâ6VRFö72÷V&Æ–6F–öâÓræÖBà ¢ãrV&Æ–6F–öâfW&–f–VB(	B3ö7Fö&W"##c ¥'VçF–ÖScS3“&F6S“ssS““sVS†3c“†f&&fS&cCf&#ƒc²FW7FVB÷WÆöFVBG&VP¦S†VS66#3–Vf3ƒvFFVFS#C#CfcS#F#“6fƒ#RW†7FÇ’ÖF6†W2fWF6†VB÷&–v–âöÖ–âà¤ÆÃ#&Æö'2†6‚×fW&–f–VB&Vf÷&RFöÖ–2æöâÖf÷&6VBW‡V7FVBÖÖ–âWFFRâvW3C“s##sc¦6ö×ÆWFVB5T44U53³rórg&W6‚Æ—fRf–ÆW2'—FRÖÖF6‚FW7FVB6†V6¶÷WC¢6†VÆÂöÖæ–fW7BÀ¦æWr—f÷Bö6÷&æW'2õF÷FÂv—¦Öò÷G&ç6f÷&Ò÷væW"Â÷&–v–âÂ–6öâ–×÷'B&VçG2Â6æöæ–6À§&VÆV6Rö66†Rw&‚æB&÷FV7FVB×VÇF“ãôäôÒFV6öFW"âf–æÂÆö6ÂæöFS#Bã#"ã £352ód”Âó6¶—ó6æ6VÂƒrãC72“²f–æÂfö7W6VC#R52–æ6ÇVF–ær66†R÷66VæP§&WÆ6VÖVçB6†V6·3²7–çF‚÷v†—FW76R6ÆVââ†÷7FVCC“s#3C“&VÖ–ç2–å÷&öw&W70¦B&ööbÆæ÷B6Æ–ÖVB52â'V–ÆCrÄ•dRò$TE’f÷"æF—fR•B66WFæ6Rà¤W†7B5dr–6öâöæÇ“²ö'&÷w6W"öæF—fR—†VÂöfVVÂ&VÖ–ç2Væw&FVB2&V6÷&FVBà¤ÆÂf÷W"†æFöfbFö7VÖVçG27W'&VçC³b52&÷FV7FVBâ66÷S¢–æFWVæFVçB&6P¦ö&¦V7G3²×VÇF’öw&÷W7F—2÷&–v–æÂv÷&ÆBv÷&¶fÆ÷râDUd”4Sr—f÷BÓæ7F—fRf6P¢…’æ÷&ÖÂõ…¢FævVçB’Óæ6VçG&RÓæw&VVå’GW&âÓå—f÷Bf–æ—6‚ÂF†VâÆö6ÂG&ç6f÷&×3°¥v÷&ÆBôÆö6ÂæBö&¦V7B&V6ÆÃ²VæFõ&VFòæBæ&÷†Æ"6fRô÷VââäôÒFW‡GW&RF—7Æ§&VÖ–ç26W&FVÇ’VWVVBÂæ÷BFFVB–âF†—2v—¦Öò'V–ÆBà  ¢22ã‚(	BÆ—fRv—¦Öò&Wf–WrGW&–ær—f÷BVF—F–ær(	B3ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’&W÷'G2(	Ät•¤ÔòÄ”tâÒ5>(	Ó²&÷FV7Bãrf6RÆ–væÖVçBâF†—2—0¦Æ–væÖVçB66WFæ6RÂæ÷B&Ææ¶WB52f÷"WfW'’ãr6fRô÷Vâ÷G&ç6f÷&ÒvFRà¥W6W"&WVW7G26VV–ærF†R7GVÂv—¦Öòv†–ÆRGW&æ–ær—G2—f÷Bà ¤VF—B&6VÆ–æRÖ–â3CSfb÷'VçF–ÖScS3“&C¢÷&–v–æÂÆ—fRG&gBg&ÖRÇ&VG’G&—fW0¥F÷FÂv—¦Öò'&÷w2ÂÆæRG2æBg&öçB&÷FF–öâ&72öâWfW'’&VæFW"g&ÖRâGvð§—f÷BÖVF—B552'VÆW2†–B†W2ö†VG2÷ÆæW2÷66ÆR÷67&VVâæBæöâÕ’&–æw2ÂÆVf–æræð§W6VgVÂ‚õ¢÷&–VçFF–öâfVVF&6²â&VÖ÷fRôäÅ’F†÷6R†–F–ær'VÆW3¢F†R6ÖR7GVÀ¦v—¦Öòæ÷r&Wf–Ww2—G26†æv–ærG&gB÷&–VçFF–öâGW&–ærÆ6VÖVçBæB’GW&æ–ærà¤W†—7F–ær6VçG&Rõ’ÖöæÇ’—f÷B–çWB–çFW&6WF–öâÂvVöÖWG'’—6öÆF–öâÂf–æ—6‚ö6æ6VÂÀ¦÷&–v–æÂ†—7F÷'’ÂW"Öö&¦V7Bg&ÖRæBv÷&ÆBôÆö6Â÷væW'2&RVæ6†ævVBâæòGWÆ–6FP§&Wf–Wrv—¦ÖòÂö–çFW"Æ—7FVæW"Â&VæFW&W"÷"G&ç6f÷&Ò¶W&æVÂâ×VÇF“ãÂæF—fRäôÒÀ¦66WFVBG&ç6f÷&×2öæf–vF–öâõ–çBæBg&÷¦Vâ&WF2&VÖ–âVæ6†ævVBà ¥fÆ–FF–öã£SRfö7W6VB6†V6·252ód”Âó6¶—²7–çF‚æBv†—FW76R6ÆVââ6÷fW'0¦7GVÂ—f÷BVF—B÷66VæR†—7F÷'’ÂG&ç6f÷&ÒF—&V7F–öç2Âg&öçB&–æw2ö†—B&÷†–W2À¦6÷&æW"6öçG&öÇ2Â6†VÆÂ–FVçF—G’ö66†Rw&‚æB6ö×&—6öâÖ–w&F–öââæòæF—fP¦•Bf—7VÂ66WFæ6R–æfW'&VBâ'&÷w6W"&VæFW&–ærVæf–Æ&ÆR–âF†—2Vçf—&öæÖVçC°¦æòæWr'&÷w6W"–ç7FÆÆF–öâGFV×FVBf÷"F†—2552ÖöæÇ’6†ævRà ¥7FGW3¢ã‚fÆ–FFVC²V&Æ–6F–öâVæF–ærâãrÆ–væÖVçB50§&÷FV7FVC²äôÒÖFW&–Â÷FW‡GW&R&WFVçF–öâ&VÖ–ç26W&FVÇ’VWVVBâ6†VÆÂ&VÆV6RÀ¦6ö×&—6öâæB6æöæ–6Â&VÆV6RÖÆöFW"–ç2WFFVC²Væ6†ævVB—f÷B÷G&ç6f÷&Ð¦–×ÆVÖVçFF–öâæB6†–ÆB66†R¶W—2&WF–æVBâæW‡C¢V&Æ—6‚gFW"fö7W6VB6†V6·2À§F†Vâ•B&Wf–Wr66WFæ6RâDUd”4Sƒ¢—f÷BÓâf6RÓâ6VçG&RÓâw&VVå’GW&ã°§vF6‚7GVÂ$t"v—¦ÖòGW&âv†–ÆRÖöFVÂ7F—27F–ÆÂâf–æ—6‚ÓâÆö6ÂG&ç6f÷&Ó°¤6æ6VÂõVæFõ&VFòæBv÷&ÆBôÆö6Â6æ—G’âæò&WVBô"67&VVâ&F6‚&WV—&VBà ¢ã‚V&Æ–6F–öâfW&–f–VB(	B3ö7Fö&W"##c ¥'VçF–ÖR&CS–3#C–#&&C&C“s–&6C&#sf#ssSc#s#²WÆöFVBG&VP£VcCƒ3c&–C3“cv#3#FVC&VCFfFfc66"W†7FÇ’ÖF6†W2FW7FVBÆö6ÂG&VP¦æBfWF6†VB÷&–v–âöÖ–ââÆÃ"&Æö'2†6‚×fW&–f–VB&Vf÷&RæöâÖf÷&6VBW‡V7FVBÖÖ–à§WFFRâvW3C“sCƒCƒC5T44U53³óg&W6‚Æ—fRf–ÆW2'—FRÖÖF6‚FW7FVB6†V6¶÷WC §6†VÆÂöÖæ–fW7Böv—¦Öòö6ö×&—6öâöG&vW"öf6RÖÆ–÷WB÷&V6÷fW'’ÇW2Væ6†ævVB—f÷BÀ§G&ç6f÷&Ò×Ww&FRæB&÷FV7FVB×VÇF“ããSRfö7W6VB6†V6·252ód”Âó6¶—²7–çF€¦æBv†—FW76R6ÆVââ†÷7FVCC“sCƒCƒ““B7F–ÆÂ–å÷&öw&W72B&ööbÂæ÷B6Æ–ÖVB52à¤'V–ÆC‚Ä•dRò$TE’f÷"æF—fR&Wf–Wr66WFæ6RâW6W"ãrÆ–væÖVçB50§&÷FV7FVBâFWf–6S¢7GVÂ$t"v—¦Öòf—6–&ÆRF‡&÷Vv‚f6RÆ6VÖVçBæBw&VVå’GW&ã°¦ÖöFVÂ7F—27F–ÆÃ²f–æ—6‚F†VâÆö6ÂG&ç6f÷&×2Â6æ6VÂõVæFõ&VFò6æ—G’âæòæF—fP§f—7VÂöfVVÂ66WFæ6R–æfW'&VBâäôÒFW‡GW&R&WFVçF–öâ&VÖ–ç26W&FVÇ’VWVVBà ¢22ã’(	B7W&f6RÖG&rÆö6Â—f÷BæBf6RÖVFvRÆ–væÖVçB(	B3ö7Fö&W"##` ¥W6W"ã‚52&÷FV7G2f—6–&ÆR7GVÂÖv—¦Öò—f÷B&÷FF–öâ&Wf–Ws²ãrt•¤Ôð¤Ä”tâ52&WF–æVBâW6W"æ÷r&WVW7G2Æ—fR—f÷BÖ÷fVÖVçB7&÷72f6RæBVFvP¦Æ–væÖVçBöb‚÷"¢v†–ÆR’&VÖ–ç2—G2f6Ræ÷&ÖÂâ&6VÆ–æRÖ–ãvSSC#–B÷'VçF–ÖP¦&CS–2Â&VÆV6S‚âF†—2—2F†RæW‡Bæ'&÷rW6W"ÖWF†÷&—¦VB'V–ÆBà ¤÷&–v–æÂv—¦ÖòÖÆö6Â×—f÷B÷væW"W‡FVæG2—G2W†—7F–ærv–æF÷rÖ6GW&RÆ6VÖVçBÀ¦Ö÷fRö6ö×ÆWF–öâÆ—7FVæW'2âG&r7F'G2öâf—6–&ÆR5D•dR&6Rf6RÂ6GW&W2F†P§ö–çFW"æBWFFW2öæÇ’F†RG&ç6–VçB—f÷BG&gBöâV6‚Ö÷fRâ6ÖR7GVÂF÷FÀ¤v—¦Öò&ö¦V7F–öâ&Wf–Ww2—G2÷6—F–öâö'&÷w2÷ÆæW2ög&öçB&–æw2æBÖF6†–ær†—@§F‡2$Tdõ$R&VÆV6RâöæRf6R—2ÆF6†VBW"6öçF7B6ò7&÷76–ær6†&VBVFvP¦6ææ÷BfÆ—w&VVâ’öçFòF†RæV–v†&÷W#²&VÆV6RæB7F'Böâæ÷F†W"f6RFò6†ævP¦f6W2âöfb×7W&f6Röö66ÇVFVBÖ÷fVÖVçB†öÆG2F†RÆ7BfÆ–BÆ6VÖVçBâvVöÖWG'’æ@§6VÆV7F–öâæWfW"Ö÷fRGW&–ærVF—C²÷&–v–æÂ—f÷Bf–æ—6‚6öÖÖ—G2ôäR66VæR6†V6·ö–çBà ¥&VÂöÇ–vöâ&÷VæF&–W26öÖRg&öÒW†—7F–ær&VæFW&W"G&–ævÆR÷væW'6†—ÖWFFFÀ¦÷"66†VB&VBÖöæÇ’Æöö·Wöb÷&–v–æÂ&6Rfâ÷&FW&–ærv†VâvVöÖWG'’6÷VçG0¦ÖF6‚âæòæWrG&–æwVÆF–öâÂ&VæFW"ÖÖW6‚&V'V–ÆB÷"G&–ævÆRÖF–vöæÂ6æ–ærà¥67&VVâÖvæWBVçFW'3B557‚÷&VÆV6W3#‚Âv—Fƒ7‚6÷&æW"&VfW&Væ6S²W'7V7F—fP¦–çFW'öÆF–öâWG2—f÷BöâF†R7GVÂVFvRVæFW"F†Rö–çFW"âf—6–&–Æ—G’&ö&W0¦–ç6–FRF†B&÷VæF'’W6RF†R6ÖR7GVÂ&öG’–6¶W#²†–FFVâö–æ7F—fRö66ÇVFW'0¦6ææ÷B&V6öÖR6æF&vWG2â‚÷"¢æB—G26–vâ&R6†÷6Vâ6Æ÷6W7BFòF†R7F'F–æp¦f6RÖÆ–væVBg&ÖS²F†R&–v‡BÖ†æFVBg&ÖR&WF–ç2W†7Bw&VVâ’æ÷&ÖÂâæöâ×FævVç@§v'VBVFvW26fVÇ’FV6Æ–æRÆ–væÖVçB&F†W"F†â&÷FFR’v’g&öÒF†Rf6Rà¥7FGW2æÖW2F†R6æVB†—2âÆVf–ærF†RÖvæWB&W7F÷&W2F†R7G&ö¶Rw2Vç6æV@§FævVçB÷&–VçFF–öââ6VçG&RÓå’GW&æ–ær&VÖ–ç266WFVBæBFöW2æ÷BÖ÷fRvVöÖWG'’à ¥ö–çFW"6æ6VÆÆF–öâöÆ÷7B6GW&R&W7F÷&W2F†R&RÖG&rG&gC²W66R÷vV†–FP¦&æFöç2VF—BæB&W7F÷&W26öçG&öÇ2öÆ—7FVæW'2â6V6öæF'’6öçF7G26ææ÷B&WÆ6P§F†R7F—fRÆ6VÖVçBâ÷&–v–æÂW"Öö&¦V7B&V6÷&Bö†—7F÷'’÷&ö¦V7B6öFV2õv÷&ÆDÆö6Âð§G&ç6f÷&Ò÷væW'2&VÖ–âWF†÷&—FF—fS²×VÇF“ãÂ&W6÷W&6RôäôÒõ–çBöæf–vF–öâÀ¦66WFVB–6öç2æBg&÷¦Vâ&WF2Væ6†ævVBâæò6V6öæB&Wf–Wrv—¦Öò÷"ö–çFW"÷væW"à ¥6WfVâæWr7GVÂÖ÷væW"öÖF‚÷&ö¦V7F–öâFW7G26÷fW"F÷V6‚õVæ6–ÂöÖ÷W6RÆ—fR7W&f6P¦G&rÂG'VR&÷VæF&–W2fW'7W2fâF–vöæÇ2Â†—2÷6–vâöæ÷&ÖÂÂö&Æ—VR6–Æ†÷VWGFRÀ§f—6–&–Æ—G’ÂW'7V7F—fRFWF‚Â6V6öæBö–çFW'2Â6æ6VÂöÆ÷7BôW66R÷vV†–FR6ÆVçWÀ¦÷&–v–æÂVæFõ&VFòõ6fT÷VâæB7GVÂF÷FÂv—¦ÖòF‡2ö†—B&÷†–W2&Vf÷&R&VÆV6Rà¥F†RV&Æ–W#r7–çF†WF–2Æ6VÖVçBFW7Bæ÷rVÖ—G2—G2&VÂö–çFW'W$Tdõ$R6VçG&P¦–çWC²ÆÂ&–÷"vVöÖWG'’ö†—7F÷'’÷G&ç6f÷&Ò76W'F–öç2&WF–æVBâ¥4ôâ6fT÷Và¦6ö×&W26æöæ–6Â66Æ"&V6÷&G2&V6W6R¥4ôâæ÷&ÖÆ—¦W2ÓFó²æò6öFV26†ævRà¥fÆ–FF–öã£c"fö7W6VB6†V6·252ód”Âó6¶—²7–çF‚÷v†—FW76R6ÆVââgVÆÂÆö6À§'Vâ—2–æ6ö×ÆWFR‡7F÷VB&öGV6–ær÷WGWB–âVæ6†ævVB–çB×&W6÷W&6R6†V6·2“°¦æ÷B6Æ–ÖVB52â†÷7FVBgVÆÂ&Vw&W76–öâv–ÆÂ&RG&6¶VB6W&FVÇ’âæF—fR•@§F7F–ÆR÷f—7VÂ66WFæ6Ræ÷B–æfW'&VBâV&Æ–6F–öâVæF–ærà ¥&Wf–WvVC’6†VÆÂ÷&V6÷fW'’ö6ö×&—6öâæBF÷FÄv—¦ÖòÓç—f÷B6†–ÆB66†R6Æ÷7W&S°¦6æöæ–6Â&VÆV6RÓæf6RÖÆ–÷WBÓæG&vW"–ç2WFFVBâ÷F†W"G&ç6f÷&Ò÷væW'2&WF–à£r'—FW2÷–ç2âDUd”4S“¢—f÷BÓâ&W72öG&röâf6RÓâ&ö6‚F–ffW&VçBVFvW2À§vF6‚7GVÂv—¦ÖòÖ÷fR÷6æ‚÷"¢v†–ÆRw&VVå’&VÖ–ç2æ÷&ÖÂæBÖöFVÂ7F–ÆÂà¥&VÆV6RÓâ6VçG&Rõ’ÖçVÂGW&â7F–ÆÂv÷&·2Óâ—f÷Bf–æ—6‚ÓâÆö6ÂG&ç6f÷&Ó°¥VæFõ&VFòæB6fT÷Vâ6æ—G’â7F'Böâæ÷F†W"f6Rf÷"æWræ÷&ÖÂâæW‡BæF—fP¦fVVF&6²ÂF†Vâ6W&FVÇ’VWVVBäôÒFW‡GW&Rõ%"&WFVçF–öââæòæWrô"FW7B&F6‚à ¢ã’V&Æ–6F–öâfW&–f–VB(	B3ö7Fö&W"##c ¥'VçF–ÖS3ƒ#c3“#vS†&S#c6S&F#FSƒ–#3“²WÆöFVB÷FW7FVBG&VP£F3V6V&s66Ff3“6##cc–FSSFcccc2W†7FÇ’ÖF6†W2fWF6†VB÷&–v–âöÖ–âà¤ÆÃB&Æö'2†6‚×fW&–f–VB&Vf÷&RæöâÖf÷&6VBW‡V7FVBÖÖ–âWFFRâvW3C“ƒSC#s ¦'V–ÆBöFWÆ÷’5T44U53³2ó2g&W6‚Æ—fRf–ÆW2'—FRÖÖF6‚FW7FVB'VçF–ÖS¢6†VÆÂÀ¦Öæ–fW7BÇ—f÷BÆv—¦ÖòÆ6ö×&—6öâÆ6æöæ–6ÂÆöFW"÷&V6÷fW'’w&‚æBVæ6†ævVB6÷&æW"À¦÷&–v–âÇG&ç6f÷&Ò×Ww&FRÇ&÷FV7FVB×VÇF“ããc"fö7W6VB6†V6·253²gVÆÂÆö6À¤æöFS#Bã#"ã£3r52ód”Âó6¶—ó6æ6VÂƒ#‚ã“G2’Â7WW'6VF–ærF†R–æ—F–ÂÆö6À¦–â×&öw&W72æ÷FRâ†÷7FVCC“ƒSC3ƒ&VÖ–ç2–å÷&öw&W72B&ööbÆæ÷B6Æ–ÖVB52à¤'V–ÆC’Ä•dRò$TE’f÷"æF—fR•Bf6RÖG&röVFvR×6æFW7F–ærâÆÂf÷W"†æFöf`¦Fö7VÖVçG27W'&VçC²ã‚&Wf–Wr52æBãrÆ–væÖVçB52&÷FV7FVBâW†—7F–æp¦÷&–v–æÂÖ6VçG&Rõ’GW&âÂW"Öö&¦V7Bv÷&ÆDÆö6ÂÂ†—7F÷'’æB6fT÷Vâ÷væW'2&WF–æVBà¤æòæF—fRö'&÷w6W"f—7VÂöfVVÂ&W7VÇB–æfW'&VBg&öÒæöFR&ö¦V7F–öâFW7G2à¤DUd”4S“¢—f÷BÓç&W72öG&röâf6RÓæ&ö6‚&VÂVFvW3¢7GVÂv—¦ÖòÖ÷fW2À¥‚÷"¢Æ–vç2FòVFvRÅ’&VÖ–ç2f6Ræ÷&ÖÂÆÖöFVÂ7F–ÆÃ²&VÆV6RF†Vâ6VçG&Rõ¦ÖçVÂGW&âÅ—f÷Bf–æ—6‚ÄÆö6ÂG&ç6f÷&×2ÅVæFõ&VFòõ6fT÷VââæWr6öçF7Böâæ÷F†W ¦f6R6†ævW2æ÷&ÖÂâäôÒFW‡GW&Rõ%"&WFVçF–öâ&VÖ–ç26W&FVÇ’VWVVBà ¢22ã#(	B$t"Ö–æ–GW&Rv—¦Öò—f÷B–6öâ(	B3ö7Fö&W"##` ¥W6W"&WVW7G2&VBöw&VVâö&ÇVR—f÷B'Gv÷&²v—F‚6ÖÆÂ–VÆÆ÷r6—&6ÆRÂ&W6VÖ&Æ–æp¦F–ç’v—¦Öòâ&6VÆ–æRÖ–æC†&ScB÷'VçF–ÖS3ƒ#c2‚ã’’â6†ævRôäÅ’F†R÷&–v–æÀ¦v—¦Öô–6öç2ç—f÷B5ds¢w&VVâWv&B’Â&VBÆ÷vW"ÖÆVgB‚Â&ÇVRÆ÷vW"×&–v‡B¢'&÷w2À§6ÖÆÂ–VÆÆ÷r6VçG&R&–ærâW‡Æ–6—B6†–ÆB7G&ö¶Röf–ÆÂ¶VW26öÆ÷W'2F‡&÷Vv‚W†—7F–æp¦æ÷&ÖÂ÷&W76VB'WGFöâ6öÆ÷W"–æ†W&—Fæ6S²÷&–v–æÃ#G‚5dræCC‚'WGFöâ&WF–æVBà¤æòGWÆ–6FR'WGFöâÂ7F–öâöÆ&VÂöÆ—7FVæW"öÆ–÷WB÷—f÷BövVöÖWG'’ö†—7F÷'’6†ævRà¤÷F†W"6†&VB–6öç2&VÖ–âW†7BâÆÂ–×÷'B&VçG2öb6†&VBv—¦ÖòÖ6÷&æW"Ö6öçG&öÇ0§&W–ææVBFövWF†W"…F÷FÄv—¦ÖòÆö&¦V7BÖÖævVÖVçBÇf–Ww÷'B×FööÆ&"ÓçF÷&"ÆG&vW"’À§ÇW2÷&–v–æÂ&VÆV6Rö66†R6Æ÷7W&Râ–×÷'BÖöæÇ’6†ævW2÷WG6–FR5dr÷væW"à £3Rfö7W6VB6÷&æW"÷&VÆV6Rö66†Rö–FVçF—G’ö6ö×&—6öâ6†V6·253²7–çF‚÷v†—FW76P¦6ÆVââW†7B5dr&VæFW&VB÷f—7VÆÇ’–ç7V7FVBC#G‚æBVæÆ&vVB–âæ÷&ÖÂÇ&W76V@¦æBF—6&ÆVB7FFW2âÆÂ÷F†W"–6öâ'Gv÷&²æB7F–öâÖgVæ7F–öâ'—FW2Væ6†ævVC°¦æò7GVÂ'&÷w6W"öæF—fR—†VÂ66WFæ6R6Æ–ÖVBâV&Æ–6F–öâVæF–ærà¢ã‚&Wf–Wr52òãrÆ–væÖVçB52&÷FV7FVC°¢ã’f6RÖG&röVFvR×6ææF—fR66WFæ6R&VÖ–ç2VæF–ærÂæò52–æfW'&VBg&öÐ§F†—2–6öâ&WVW7Bâã’gVÆÂÆö6Ã3u52&VÖ–ç2&6VÆ–æRÂæòGWÆ–6FRgVÆÀ§&W'Vâf÷"–6öâÖöæÇ’v÷&²âDUd”4S#¢–ç7V7B$t"'&÷w2÷–VÆÆ÷r&–ærBæ÷&ÖÂ6—¦RÀ§F—f÷BöâööfbæBfW&–g’6öÆ÷W'2&VÖ–ã²W†—7F–ærf6RÖG&röVFvR×6æ6æ—G’à¤æW‡BæF—fRfVVF&6³²äôÒFW‡GW&Rõ%"&WFVçF–öâ6W&FVÇ’VWVVBà ¢ã#V&Æ–6F–öâfW&–f–VB(	B3ö7Fö&W"##c ¥'VçF–ÖSfVCssS–fVSSCcs3C““S†#63V3S3#“cF3²FW7FVB÷WÆöFVBG&VP£“Cvc#cVc†S#s6CfcfSV#“6csS#f#vffF#vBW†7FÇ’ÖF6†W2fWF6†VB÷&–v–âöÖ–âà¤ÆÃb&Æö'2†6‚×fW&–f–VB&Vf÷&RæöâÖf÷&6VBW‡V7FVBÖÖ–âWFFRâvW3C“ƒS““C3 ¦'V–ÆBöFWÆ÷’5T44U53³BóBg&W6‚Æ—fRf–ÆW2ÖF6‚FW7FVB'VçF–ÖS¢6†VÆÂöÖæ–fW7BÀ¥$t"—f÷B–6öâæB6†&VB–×÷'B&VçG2Æ6ö×&—6öâ÷&V6÷fW'’ö6æöæ–6ÂÆöFW"w&‚À§Væ6†ævVBÆö6Â×—f÷BæB&÷FV7FVB×VÇF“ãã3Rfö7W6VB6†V6·252ód”Âó6¶—°§7–çF‚÷v†—FW76R6ÆVââW†7B5dr–ç7V7FVC#G‚öVæÆ&vVBæ÷&ÖÂ÷&W76VBöF—6&ÆVC°¦æò7GVÂ'&÷w6W"öæF—fR–6öâ66WFæ6R–æfW'&VBâ†÷7FVCC“ƒS““sR–å÷&öw&W70¦B&ööbÆæ÷B6Æ–ÖVB53²ã’gVÆÂÆö6Ã3u52&VÖ–ç2&6VÆ–æRÆæò&VGVæFç@¦gVÆÂÆö6Â–6öâÖöæÇ’&W'Vââ'V–ÆC#Ä•dRò$TE’f÷"–6öâ&Wf–Wrâ÷F†W"–6öâ'—FW2À¦7F–öâgVæ7F–öâÇ—f÷BÆ–væÖVçB÷7W&f6RG&röVFvR6æ÷G&ç6f÷&Ò÷væW'2Væ6†ævVBà¤ÆÂf÷W"†æFöfbFö7VÖVçG27W'&VçC²ã‚&Wf–WròãrÆ–væÖVçB52&÷FV7FVC°¢ã’æF—fRVFvR×6æ66WFæ6R7F–ÆÂVæF–ærâDUd”4S#$t"'&÷w2÷–VÆÆ÷r6VçG&P§&–ærÆæ÷&ÖÂö7F—fR6öÆ÷W'2Å—f÷BFövvÆRæBW†—7F–ærf6RÆ6VÖVçB6æ—G’à ¢22ã#(	B—f÷B–6öâ6öÆ÷W"÷&FW"(	B3ö7Fö&W"##` ¥W6W"&WVW7G2&ÇVR&÷GFöÒÖÆVgBÂw&VVâWÂ&VB&÷GFöÒ×&–v‡BFòÖF6‚F†Rv—¦Öòà¤&6VÆ–æRÖ–â&FC#s"ò'VçF–ÖSfVCss‚ã#’â7vôäÅ’F†RGvòÆ÷vW ¦'&÷r7G&ö¶R6öÆ÷W'2–â÷&–v–æÂv—¦Öô–6öç2ç—f÷C²w&VVâ'&÷ræB–VÆÆ÷r6VçG&P§&–ær&WF–æVBâ÷&–v–æÂ–6öâ6—¦RÂ'WGFöâö7F–öç2æB—f÷B÷G&ç6f÷&Ò÷væW'2Væ6†ævVBà¥&Vg&W6‚F†R6ÖR&Wf–WvVB6†&VBÖ–6öâ&VçBö66†Rw&‚3#²&W6W'fR6ö×&—6öà§&F–æw2–æ6ÇVF–æs#â&÷FV7FVB×VÇF“ãög&÷¦Vâ&WF2Væ6†ævVBà£3rfö7W6VB6÷&æW"÷&VÆV6Rö–FVçF—G’ö6ö×&—6öâ6†V6·252Ãd”Âó6¶—²7–çF‚æ@§v†—FW76R6ÆVââ5dr6öÆ÷W"÷&FW"æBVæ6†ævVB7F–öâö÷F†W"Ö–6öâ'—FW2fW&–f–VBà¤–æ—F–Â–FVçF—G’'VâæVVFVBF†RFV6Æ&VBF‡&VRFWVæFVæ7“²f–æÂ&W'Vâ76W2à¥V&Æ—6†VB'VçF–ÖRC†SVCF3F&cvVcCƒ“3–3CSFV###““²FW7FVBG&VP£#f#f–SC6F#fV–Vc–C–fFfFc3&SƒCBÖF6†W2fWF6†VB÷&–v–âöÖ–âW†7FÇ’à¤ÆÃb&Æö'2†6‚×fW&–f–VB&Vf÷&RW‡V7FVBÖÖ–âæöâÖf÷&6VBWFFRâvW3C““3ƒ#0¥5T44U53³BóBg&W6‚Æ—fRf–ÆW2'—FRÖÖF6‚FW7FVB6†V6¶÷WBÂ–æ6ÇVF–ær6÷'&V7FVB–6öâÀ§6†&VB&VçBö66†Rw&‚æBVæ6†ævVBÆö6Â×—f÷Bô×VÇF“ãâ†÷7FVCC““3ƒ##ƒ0¦–å÷&öw&W72B&ööc²æògVÆÂ×7V—FRöæF—fRFWf–6R526Æ–ÖVBâ'V–ÆC#Ä•dRð¥$TE’f÷"FW7F–ærâæF—fS#–6öâÖ÷&FW"6†V6²VæF–ærâ&–÷#p¦Æ–væÖVçBó‚&Wf–Wr52&÷FV7FVC³’FWf–6RVFvR×6æ66WFæ6R7F–ÆÂVæF–ærà¤æW‡C¢fW&–g’–6öâ6öÆ÷W'2–âæ÷&ÖÂö7F—fR7FFRÂF†VâW†—7F–ær—f÷BFövvÆR6æ—G’à¤äôÒFW‡GW&Rõ%"&WFVçF–öâ&VÖ–ç26W&FVÇ’VWVVBà ¢22ã#"(	BF÷×&–v‡BfÆö÷"öw&–BööfbFövvÆS²ã#52(	B3ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’56W3#²&÷FV7B—f÷B–6öâ&ÇVR&÷GFöÒÖÆVgBöw&VVâW÷&V@¦&÷GFöÒ×&–v‡BæB–VÆÆ÷r6VçG&R&–ærâæò'&öFW#’FWf–6R66WFæ6R–æfW'&VBà¤&6VÆ–æRÖ–âCcSVcSfRò'VçF–ÖRC†SVCF2âW6W"&WVW7G2F÷×&–v‡BF‡&VR×7FFP¦fÆö÷"–6öã¢Æ–v‡BÖw&W’f–ÆÆVBÆæRÓâw&–FFVBÆæRÓâVæf–ÆÆVB÷WFÆ–æRÓâÆæRà ¤÷&–v–æÂ6†VÆÂFG2ôäSC‚'WGFöâ&Vf÷&Rd”Urv—Fƒ#G‚ÆæR'Gv÷&²g&öÒ7F'GW°¦÷&–v–æÂFööÆ&"÷&FW"ö‡–G&F–öâ¶VW2F†—26ÖRæöFRâW†—7F–ærw&÷VæB×öÆ—6‚÷væW ¦†öÆG26W76–öâÖöæÇ’ÆæRöw&–Bööfb6†ö–6R†g&W6‚ÆöB7F'G2ÆæR’Â&–æG2öæRæF—fP¦6Æ–6²†æFÆW"æB7–æ6‡&öæ—¦W2'Gv÷&²ö66W76–&ÆR7W'&VçB¶æW‡B×7FFRÆ&VÇ2âæòæWp§&rö–çFW"÷væW"Â&VæFW&W"Âw&÷VæBÖW6‚ÂGWÆ–6FR6öçG&öÇ2÷"†—7F÷'’VçG'’à¤÷&–v–æÂw&–BæB7GVF–òfÆö÷"&R×WGVÆÇ’W†6ÇW6—fS²öfb†–FW2&÷F‚æB7GVF–òw0§6W&FR6öçF7B×6†F÷rFV6Ââ÷&–v–æÂ7GVF–ò×öÆ—6‚&Vg&W6‚&W7V7G2F†—26†ö–6S°§&VæFW"ÖÖöFW2W6W2F†R6ÖR7FFRv†Vâ–æ—F–Æ—¦–ær÷7–æ6‡&öæ—¦–ær—G2fÆö÷"F—&V7FÇ’À§v—F†÷WBFF–ærW"Ö&öG’66VæRG&fW'6ÂâW†—7F–ærfÆö÷"Æ6VÖVçB÷6†F÷w2öÆ–v‡G2À¦w&–B÷6—G’æB†W2Væ6†ævVBâfÆö÷"&VÖ–ç2÷&–v–æÂ7GVF–òÖöæÇ’7W&f6S²÷F†W ¦Æöö·2&WF–âF†V—"&–÷"æò×ÆæR&V†f–÷"âw&–B—2f–Æ&ÆR7&÷72Æöö·2â6†ö–6P§7W'f—fW2Æöö²7v—F6†W2ö'&–FvRWFFW2v—F†–â6W76–öââW†—7F–ær6ÆVâf–Wr7F–ÆÂ†–FW0¦w&–Bö†W2FV×÷&&–Ç’æB&W7F÷&W26†÷6Vâw&–BöâW†—C²—BFöW2æ÷B6†ævR&VfW&Væ6Rà £SBfö7W6VB6†V6·252ód”Âó6¶—²f÷W"æWr7GVÂw&÷VæBÖ÷væW"ö'WGFöâõ7GVF–ò×öÆ—6‚ð§&VæFW"×7–æ2FW7G26÷fW"7–6ÆRö–6öç2ÂV&Ç’–çWBöÆFR'&–FvRÂöæRÆ—7FVæW"Â–çfÆ–@§7FFR&VgW6ÂÂæòW‡G&66VæRö&¦V7G2öÖöFVÂG&ç6f÷&×2Â6ÆVâõf–Wr&W7F÷&F–öâæ@¦6öçF7BFV6Âæ÷B&VV&–ærgFW"ö–çFW"ÖG&—fVâöÆ—6‚âW†—7F–ærFööÆ&"6†VÆÀ¦6÷VçBö÷&FW"f—‡GW&RW‡æFVBôäÅ’f÷"&WVW7FVBæWr'WGFöã²ÆVv7’fÆÆ&6²æBÆÀ¦÷&–v–æÂ7F–öâö‡–G&F–öâ76W'F–öç2&WF–æVBâW†—7F–ær&VæFW"õ7GVF–òö6ö×7Bôö&¦V7G2ð§6æ÷&VÆV6Rö66†Rö–FVçF—G’ö6ö×&—6öâ6†V6·272â¥27–çF‚÷v†—FW76R6ÆVâà¤æògVÆÂ×7V—FRÂ&VæFW&VBÖ'&÷w6W"÷"æF—fR•B526Æ–ÖVBã#W6W"52&÷FV7FVBà¥&Wf–WvVC#"6†VÆÂ÷&V6÷fW'’ö6ö×&—6öâÇFööÆ&"ÓçF÷&"Æw&÷VæB·7GVF–ò×öÆ—6‚Óæf6RÖÆ–÷W@¢ÓæG&vW"æB&VæFW"ÖÖöFR–ç2ö†6†W2â–6öâö6÷&æW"õF÷FÄv—¦Öó#ÆÆö6Â×—f÷C’À§G&ç6f÷&Ò÷væW'2Ç&÷FV7FVB×VÇF“ãÆg&÷¦Vâ&WF2öæf–vF–öâõ–çBõUbVæ6†ævVBà ¥V&Æ—6†VB'VçF–ÖSF33“VfV3f3sVc3V3FCsv6&c“Cƒ#“c#SS6S²FW7FVB÷WÆöFVBG&VP£cƒFf3C#“sf†Sf&S66#“S–3–Ccsf&&’WVÇ2fWF6†VB÷&–v–âöÖ–âW†7FÇ’à¤ÆÃ‚&Æö'2†6‚×fW&–f–VB&Vf÷&RæöâÖf÷&6VBW‡V7FVBÖÖ–âWFFRâvW3C““S3#cCs¥5T44U53³bóbg&W6‚Æ—fRf–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6S¢6†VÆÂöÖæ–fW7BÆæWrw&÷VæBð¥7GVF–ò÷FööÆ&"÷væW'2Ç&VçBö66†Rw&‚æBVæ6†ævVB66WFVB—f÷B–6öâÅF÷FÀ¤v—¦ÖòÆÆö6Â×—f÷BæB&÷FV7FVB×VÇF“ãâ†÷7FVCC““S3#scS2–å÷&öw&W72B&ööc°¦æògVÆÂ×7V—FRöæF—fR•B526Æ–ÖVBâ'V–ÆC#"Ä•dRò$TE’f÷"FW7F–ærà¤DUd”4S#"–â7GVF–ó¢–ç7V7Bf–ÆÆVBw&W’ÆæR–6öâ&Vf÷&P¥d”Us²FFòw&–B‡ÆæRö6öçF7B6†F÷rF—6V"’ÂFFòöfb†w&–BF—6V'2’À§FFòÆæR†÷&–v–æÂfÆö÷"÷6†F÷r&WGW&â’â÷&&—BgFW"V6ƒ²6†V6²&WVFVB7–6ÆRÀ¥7GVF–òÓå6öÆ–BÓå7GVF–ò&WF–ç26†ö–6RÂ6ÆVâf–Wr†–FW2÷&W7F÷&W26VÆV7FVBw&–Bà¤æW‡C¢æF—fS#"fVVF&6³²äôÒFW‡GW&Rõ%"&WFVçF–öâ&VÖ–ç26W&FVÇ’VWVVBà ¢22ã#2(	Bw&–Bf—6–&–Æ—G’ò—f÷B6†÷'F7WG2ò6VÆV7FVBÔf6RVFvR6æ(	B3ö7Fö&W"##` ¥W6W##"52&÷FV7G2F÷×&–v‡BÆæRöw&–Bööfb7–6ÆRæB6öçF7B×6†F÷r†–F–ærà¥W6W"&W÷'G2ö&¦V7BôVFvR—f÷BÖVFvRÆ–væÖVçBv÷&·2vVÆÃ²&÷FV7BF†÷6Rv÷&¶fÆ÷w2à¥W6W"&WVW7G3R7G&öævW"w&–BÆöæÇ’Gvò—f÷B–6öç2GW&–ær—f÷BVF—F–ærÆæB&W— ¦öb6VÆV7FVBÔf6RVFvRÆ–væÖVçBâ&6VÆ–æRÖ–ã3Ss&#"ò'VçF–ÖSF33“Vb‚ã#"’à ¤÷&–v–æÂw&÷VæB×öÆ—6‚÷6—G’–æ7&V6W2&VÆF—fVÇ“S¢7GVF–òã‚Óâã“‚Æ÷F†W"Æöö·0¢ã3BÓâã3sBâ÷&–v–æÂfÆö÷"7–6ÆRö†W2ô6ÆVâÖ6·2ö6öçF7B6†F÷r÷væW'2Væ6†ævVBà¤÷&–v–æÂ6÷&æW"Ö6öçG&öÇ2†–FW2ÆÂ6†÷'F7WB'WGFöç2öw&÷W2W†6WB—f÷Bæ@¥v÷&ÆBôÆö6Âv†–ÆRVF—F–æs²÷&–v–æÂÖöFR×7V6–f–2f—6–&–Æ—G’&WGW&ç2öâW†—Bà¤7GVÂ$t"v—¦Öò†W2÷ÆæW2÷&–æw2&Wf–WræB6VçG&Rõ’GW&æ–ær&VÖ–âf—6–&ÆRæ@§Væ6†ævVBâ—f÷B'Gv÷&²÷FööÆ&"ö†—7F÷'’7F–öç2Væ6†ævVC²æòGWÆ–6FR6öçG&öÇ2à ¥&W&öGV6VBf6RW'&÷#¢&’öâ6†&VBöÇ–vöâVFvR6â6VÆV7BF†RæV–v†&÷W"w0§&VæFW"G&–ævÆRÇW6–ær—G2æ÷&ÖÂWfVâv†Vâæ÷F†W"f6R—26VÆV7FVBâf6RÆ6VÖVç@¦æ÷r&WVW7G26VÆV7FVBöÇ–vöç3²W"ÖG&r7W&f6R÷&ö&W2&WF–âF†RÆF6†VBöÇ–vöâà¤æV&W7B×7W&f6RFWF‚F–W2&VfW"6VÆV7FVBf6Râf–ÇFW&–ær&’†—G2ÆöæRv0¦–ç7Vff–6–VçB&V6W6RW†7B&÷VæF'’&—26öÖWF–ÖW2†—BöæÇ’ôäRF¦6VçBG&–ævÆRà¥&VBÖöæÇ’fÆÆ&6²&V6÷fW'26VÆV7FVBæV–v†&÷W"ôäÅ’öâF†R6ÖR7GVÂ6†&VBVFvP¦öbF†BÇ&VG’×f—6–&ÆRæV&W7B&öG’ÇW6–ær÷&–v–æÂÖW6‚VFvT¶W’öf6Tæ÷&ÖÂæB¦&÷VæFVBçVÖW&–6ÂFöÆW&æ6Râg&öçBÖf6–ær6†V6²&WF–æVC²æòF‡&÷Vv‚Öö&¦V7B–6¶–ærÀ¦æWrG&–æwVÆF–öâÆF–vöæÂ6æ2ÆvVöÖWG'’ö†—7F÷'’¶W&æVÂ÷"ÖFW&–ÂVF—BâVç&VÆFV@§6VÆV7FVBöÇ–vöç2æBö66ÇVFVBö&6²f6W26ææ÷B&V6öÖRF&vWG2âö&¦V7BôVFvR–æ—F–À§–6¶–ær7F—2Vç&W7G&–7FVC²ÆÂÖöFW2&WF–âW†—7F–æsBó#‚ÖvæWBæB‚õ¢6–và§6VÆV7F–öâv—F‚w&VVå’æ÷&ÖÂâG&gBö6æ6VÂööæRÖ6†V6·ö–çBõVæFõ&VFòõ6fT÷Vâ&WF–æVBà £sbfö7W6VB6†V6·252ód”Âó6¶—³2æWr6†V6·2–æ6ÇVFR&W&öGV6VB&RÖf—‚f6Ræ÷&ÖÀ¦æB6†÷'F7WB×f—6–&–Æ—G’f–ÇW&W2ÇW2F–ÇFVBÖVFvRö&¦V7BôVFvRôf6RÖ÷W6RõVæ6–Â÷F÷V6€§&—G’æBVç6VÆV7FVBö†–FFVâÖf6R&VgW6Ââw&–B÷6—G’76W'F–öç2FFVBFò÷&–v–æÀ¦fÆö÷"Ö÷væW"FW7G2â÷&–v–æÂ—f÷B&ö¦V7F–öâ÷6VÆV7F–öâö†—7F÷'’ö6öFV2ö6æ6VÂöö66ÇW6–öâÀ¦6÷&æW"÷FööÆ&"ôö&¦V7G2ô6ÆVâ÷6æ÷&VÆV6Rö66†Rö–FVçF—G’ö6ö×&—6öâ6†V6·272à¥7–çF‚÷v†—FW76R6ÆVââæògVÆÂ×7V—FR÷&VæFW&VBÖ'&÷w6W"öæF—fR•B526Æ–ÖVBà¥&Wf–WvVC#2w&÷VæB·6†&VB6÷&æW"·—f÷B&VçG2ÅF÷FÄv—¦ÖòÆö&¦V7BÖÖævVÖVçBÀ§f–Ww÷'B×FööÆ&"ÓçF÷&"Æf6RÖÆ–÷WBÓæG&vW"æB&V6÷fW'’ö6ö×&—6öâ66†R6Æ÷7W&Rà¤÷F†W"–×÷'B×&VçB6†ævW2&R–ç2öæÇ’âG&ç6f÷&Ò÷væW'2ô×VÇF“ãög&÷¦Vâ&WF2À¦66WFVBfÆö÷"÷&VæFW"÷7GVF–ò×öÆ—6‚æBæf–vF–öâõ–çBõUbVæ6†ævVBà ¥V&Æ—6†VB'VçF–ÖV#CV6–6CfcV#&C3“FSf3†cFFFC–fV33FS“²FW7FVB÷WÆöFVBG&VP¦&cS“S“#s“fCV#c#6S†&S†CC6VcCs#3ƒ3bWVÇ2fWF6†VB÷&–v–âöÖ–âW†7FÇ’à¤ÆÃ#&Æö'2†6‚×fW&–f–VB&Vf÷&RæöâÖf÷&6VBW‡V7FVBÖÖ–âWFFRâvW3C““ccSSc0¥5T44U53³‚ó‚g&W6‚Æ—fRf–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6S¢6†VÆÂöÖæ–fW7BÆw&÷VæBÀ§—f÷Bö6÷&æW"õF÷FÄv—¦ÖòæB&VçBö66†Rw&‚ÇW2Væ6†ævVBG&ç6f÷&Òô×VÇF“ãð¦66WFVB&VæFW"õ7GVF–ò×öÆ—6‚÷væW'2â†÷7FVCC““ccSSSS–å÷&öw&W72B&ööc°¦æògVÆÂ×7V—FRöæF—fR•B526Æ–ÖVBâ'V–ÆC#2Ä•dRò$TE’f÷"FW7F–ærà¤DUd”4S#3¢w&–B7V'FÇ’6ÆV&W#²—f÷BVF—B6†÷w2ôäÅ’—f÷@¦æBv÷&ÆBôÆö6Â6†÷'F7WG2ÆW†—B&W7F÷&W2÷&–v–æÂ–6öç3²f6R6VÆV7BÓå—f÷BÓæG&p¦7&÷72f6RæBFò&VÂVFvW2Å‚õ¢Æ–vç2æB’7F—26VÆV7FVBÖf6Ræ÷&ÖÂÆÖöFVÀ§7F–ÆÂâ–æ6ÇVFR6†&VBÖVFvR7F'BæB&÷FFVBf6S²ö&¦V7BôVFvRV–6²&—G“²f–æ—6‚À¤Æö6ÂG&ç6f÷&ÒæBVæFõ&VFòâæW‡BæF—fRf6RfVVF&6³²äôÒFW‡GW&Rõ%"VWVVBà ¢22ã#B(	B&VF&ÆRVæFW'6–FRÆ–v‡F–ærf÷"7GVF–òæB6öÆ–B(	B3ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’56W2ã#3¢&÷FV7B7G&öævW"w&–BÂ—f÷BÖöæÇ’6†÷'F7WG2æ@§6VÆV7FVBÔf6R÷6†&VBÖVFvRÆ–væÖVçBâ&6VÆ–æRÖ–ãsSV&Sc÷'VçF–ÖV#CV6–à¥W6W"&WVW7G2&VF&ÆRVæFW'6–FRVæFW"gVÆÃ3c÷&&—Bv—F†÷WBW†6W76—fRÖ&–VçBÀ¦æB7VvvW7G26†F÷rÖg&VR6öÆ–Bf÷"ÖöFVÆÆ–ærà ¤VF—C¢W†—7F–ær6öÆ–BW6W2÷&–v–æÂ7FæF&BÖFW&–ÂÂ÷fW&†VB¶W“2ã"æ@¦†VÖ—7†W&Sã"v—F‚F&²w&÷VæB6öÆ÷W#²7GVF–òFG2F‡&VR&÷fRÖÖöFVÂF—&V7F–öæÀ¦Æ–v‡G2â÷&–v–æÂ&VæFW"ÖÖöFW2÷væW"æ÷rFG2ôäR&WW6&ÆR6†F÷rÖg&VRF—&V7F–öæÀ§VæFW'6–FRf–ÆÂ÷WG6–FRF†R7GVF–ò&–rÆ÷÷6–ær÷&–v–æÂ&6R¶W’‚ÓBÂÓrÂÓR’à¥7GVF–ò–çFVç6—G’ã“S²6öÆ–CãbâF—&V7F–öâ—2–æFWVæFVçBöbÖöFVÂ÷6—F–öâ÷66ÆRà¤æò–æ7&V6RFò†VÖ—7†W&R–çFVç6—G’öw&÷VæB6öÆ÷W"÷"VÖ—76—fRÖFW&–ÂÂæòW‡G&§6†F÷rÖ÷&VæFW&W"ög&ÖR6ÆÆ&6²ö–çWB÷væW"â÷&–v–æÂ7GVF–òFVfVÇBÂfÆö÷"À§6†F÷w2Â¶W’ôf–ÆÂõ&–Ò6öçG&öÇ2æB7GVF–òöÆ—6‚Æ–v‡BÖF—66÷fW'’&VÖ–âVæ6†ævVBà¥6öÆ–B&WF–ç26†F÷tÖF—6&ÆVBâf–ÆÂ†–FFVâ–âWfW'’÷F†W"Æöö³²&WVFVBÖöFRð¦&öG’WFFW2&WW6R—Bâ7F—fRö–æ7F—fR÷–çB7W&f6W26†&RW†—7F–ær66VæRÆ–v‡G2à¤æòvVöÖWG'’Â6VÆV7F–öâÂ†—7F÷'’ÂUbõ–çBFFÂ—f÷B÷"æf–vF–öâ6†ævW2à £Cbfö7W6VB6†V6·252ód”Âó6¶—Â–æ6ÇVF–æs"æWr7GVÂÖ÷væW"÷&VÂÕF‡&VRFW7G3 ¦ÆÂ6—‚6öÆ–B&–æ6—Âæ÷&ÖÇ2&V6V—fRF—&V7F–öæÂVæW&w’Â&÷GFöÒ÷F÷F—&V7@§7G&VæwF‚&F–òãRÂ÷&–v–æÂÖ&–VçBVæ6†ævVBÂæòFFVB6†F÷rÂÖöFR—6öÆF–öâÀ¥7GVF–ò÷&–v–æÃ2F—&V7F–öæÂÆ–v‡G2Â&WW6RæBÖöFVÂ×&W6÷W&6R&W6W'fF–öâà¤W†—7F–ær&VæFW"ôf6Vw&÷W2ö6öÖÖ—GFVB–çBöfÆö÷"Ö6öçF7B÷&VÆV6Rö–FVçF—G’ö6ö×&—6öà¦6†V6·273²7–çF‚÷v†—FW76R6ÆVââfÆö÷"FW7Bw2—6öÆFVB7–æ57GVF–ò†&æW72æ÷p§7GV'2F†RæWrÆ–v‡F–ær†VÇW"öæÇ“²ÆÂw&÷VæB76W'F–öç2&WF–æVBâæò'&÷w6W"ð¦æF—fR•BV&æ6R÷"gVÆÂ×7V—FRW&f÷&Öæ6R6Æ–Òg&öÒF†W6RÖF‚ôæöFR6†V6·2à ¥&Wf–WvVC#BF—&V7B&VæFW"–âæB6†VÆÂÖ&¶W'2Æ6ö×&—6öâÖ–w&F–öâ&WF–ç3#0§&F–æw3²6æöæ–6Â&VÆV6RÓæf6RÖÆ–÷WBÓæG&vW"66†R6Æ÷7W&R&Vg&W6†VB†–×÷'BÖöæÇ’’à¤×VÇF“ã&VÖ–ç2W†7B&WFb÷–ãã²g&÷¦Vâ&WF2æBÆÂ÷F†W"'VçF–ÖR÷væW'2&WF–æVBà¥V&Æ—6†VB'VçF–ÖRC“#3SCC63c#3†6FCƒƒ“svc3f6S6Vc“SSVc²fWF6†VB÷&–v–âöÖ–âG&VP¦fCf6&SF#S†6SsCf#ƒc–V6cCsSCCSS3ƒ"W†7FÇ’ÖF6†W2FW7FVB÷WÆöFVBG&VRà¤ÆÃ26†ævVB&Æö'2†6‚×fW&–f–VB&Vf÷&RæöâÖf÷&6VBW‡V7FVBÖÖ–âWFFRà¥vW3C“Sscƒ#B5T44U53³"ó"g&W6‚Æ—fRf–ÆW2'—FRÖÖF6‚FW7FVB6÷W&6S¢6†VÆÂÀ¦Öæ–fW7BÇ&VæFW"÷væW"Æ6æöæ–6Â66†Rw&‚Æ6ö×&—6öâæBVæ6†ævVB×VÇF’õ—f÷Bð¦w&÷VæBõ7GVF–ò×öÆ—6‚â†÷7FVCC“Sssc–å÷&öw&W72B&ööbÆæ÷B6Æ–ÖVB52à¤'V–ÆC#BÄ•dRò$TE’f÷"•BÆ–v‡F–ærÖ&Ææ6RFW7F–ærâæòæF—fRf—7VÂ52à¤DUd”4S#C¢7GVF–ò÷&&—B&VÆ÷rÖöFVÂÂ§VFvRVæFW'6–FR&VF&–Æ—G’æB6†R6öçG&7C°¥d”UrÓå6öÆ–B&WVBgVÆÂ÷&&—BÂ6†F÷rÖg&VRÖöFVÆÆ–æs²7v—F6‚7GVF–òõ6öÆ–Bôf6Vw&÷W0¦æB&6²ÂfÆö÷"öw&–Bööfb6æ—G“²Ö÷fRÖöFVÂö÷&&—BæB6öæf—&Ò6öç6—7FVçBf–ÆÂà¤æW‡BæF—fRÆ–v‡F–ærÖ&Ææ6RfVVF&6³²äôÒFW‡GW&Rõ%"&WFVçF–öâ6W&FVÇ’VWVVBà ¢22ã#BW6W"52(	B3ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’&W÷'G2(	Ã#B5>(	Òâ&÷FV7B66WFVB7GVF–òõ6öÆ–BVæFW'6–FP§&VF&–Æ—G“¢÷&–v–æÂ&VæFW"÷væW"VæFW'6–FRf–ÆÂã“R7GVF–òóãb6öÆ–BÂVæ6†ævV@¦Ö&–VçBæB7GVF–ò6öçG&öÇ3²6öÆ–B&VÖ–ç26†F÷rÖg&VRâã#252&WF–æVBà¤†÷7FVBgVÆÂ&Vw&W76–öãC“Ssscæ÷r6ö×ÆWFVB5T44U52‡&V6†V6¶VBgFW"fVVF&6²’à¥'VçF–ÖR&VÖ–ç2C“#3SBò'V–ÆCã3bã‚ã#C²66WFæ6RFö7VÖVçFF–öâöæÇ’ÂæòæWp§'VçF–ÖR'V–ÆB÷"ÖæFF÷'’†æG2ÖöâFW7BâæW‡Bv—BW6W"F—&V7F–öã²äôÒFW‡GW&Rð¥%"&WFVçF–öâ&VÖ–ç2VWVVBâW†—7F–æræf–vF–öâõ—f÷BöfÆö÷"&÷FV7F–öç2&WF–æVBà ¢22ã#R(	BæF—fRäôÒÖ&WFVçF–öâæBf–Ww÷'B6öÆ÷W"(	B3ö7Fö&W"##` ¥W6W"ã#B52&÷FV7FVC²7W'&VçB&6VÆ–æRÖ–ãF3CS3†2÷'VçF–ÖVC“#3SBà¥W6W"&WVW7G2&WGW&æ–ærFòæF—fRäôÒFW‡GW&Rf–Ww÷'Bv÷&²æBöæW‡F'V–ÆBà¤VF—B6öæf—&×3R–×÷'FW"–væ÷&VBÖFW&–Âö–ÖvW3²W†—7F–ærUb–ÖvR÷fW&Æ’À§&W6÷W&6RööÂö6öFV2æBæF—fRäôÒW‡÷'FW"&RWF†÷&—FF—fRâ6VP¦Fö72öæöÖBÖÖFW&–Â×&WFVçF–öâÓ#RæÖFf÷"–×ÆVÖVçFF–öâæBW†7B66÷Rà ¤æF—fR6÷W&6S¢væöÖBr&W6÷W&6R7F÷&W2ÖFW&–Â¥4ôâ²Væ6öFVB&VfW&Væ6VB–ÖvW2À¦÷&–v–æÂUg2æB–×÷'Bf—Bâ&W6÷W&6RVçfVÆ÷WcBW6W2U„•5D”äs#DÖ”"–ÖvRööÂð§G&ç7÷'C²7G&–7B&÷„Æ"Ugc2æBtÄ'c÷c"Væ6†ævVBâæòf¶RtÄ"&÷fVææ6Rà¤÷&–v–æÂäôÒw&—FW"6÷–W2WfW'’æF—fRFW‡GW&R6Æ÷Bö'—FR÷6WGF–æw2†–æ6ÇVF–æp¦÷6—G’öVÖ—76—fRóbÖ&—BF—7Æ6VÖVçBæB6W&FR66Æ"Ö2’Ç&VÖ2–ÖvR–æF–6W2À¦æWfW"VçFW'2tÄ"6¶VB6öçfW'6–öââW‡÷'BÖÆö6Âf—B&WfW'6Â&W6W'fW26÷W&6P§v÷&ÆB÷6—F–öç2÷Væ—G2âW†—7F–ærF÷öÆöw’6–væGW&R&VgW6W27FÆRFW‡GW&VBW‡÷'C°§&W6÷W&6W2&VÖ–â6fVBõVæFò×&W7F÷&&ÆRâæF—fRUbVF—F–ær&VÖ–ç2&VgW6VB–æ—F–ÆÇ’à ¥7GVF–òõ6öÆ–BWFòÖF—7Æ’7W÷'FVB÷VRärô¥TrUbôWFò6öÆ÷W"Ö2f–÷&–v–æÀ¥Ub÷fW&Æ’ö'V–ÆDvVöÖWG'’öFV6öFRöF—7÷6Âv—F‚66VæRÖÆ—B7FæF&BÖFW&–Ââ÷&–v–æÀ¥Ub–ÖvR—2VæÆ—B–ç7V7F–öââW†—7F–æræ÷&ÖÇ2Ç66Æ"ÖFW&–Â6öç7FçG2æB66VæP¦Æ–v‡F–ær&WF–æVC²÷F†W"FW‡GW&RÖ2äõBF—7Æ–VB–WBâ÷&–v–æÂ&öG’–6¶–ærÀ§6VÆV7F–öâö†—7F÷'’övVöÖWG'’æC#BÆ–v‡F–ærVæ6†ævVBâ6÷W&6RUg2&WF–æVC²66ÆP£WƒR&W7V7FVBâ&÷FF–öâ÷G&ç6ÆF–öâÇG&—Ææ"ÇG&ç7&Væ7’&R&WF–æVBÖöæÇ’âæF—fP¦æöFR÷&ö6VGW&Â7G'V7GW&RöÆö6Â×G&—Ææ"f–FVÆ—G’gFW"&¶VBG&ç6f÷&×2æ÷B6Æ–ÖVBà¤'VFvWCB7W&f6W2ó#Ã6÷&æW'2V6‚ó„Ö”"6÷W&6R–ÖvRó#G7V&RFV6öFVB&Wf–Wrà¤†–FFVâ÷&VfW&Væ6RöÆ–æ¶VBöÖöF–f–W"÷&ö6VGW&ÂwV&G2&WF–æVBâFW‡GW&VBæF—fRtÄ ¦W‡÷'BW‡Æ–6—FÇ’&VgW6W2&F†W"F†âG&÷–ærÖ3²äôÔBòæ&÷†Æ"&WF–âF†VÒà¥VçFW‡GW&VBäôÒvVöÖWG'’õUbtÄ"F‚&WF–æVBâ$T”Õõ%B÷&–v–æÂææöÓ²öÆB&ö¦V7G0¦6ææ÷B&V6÷fW"Ö2&Wf–÷W6Ç’F—66&FVB'“Rà ¥6—‚æWr7GVÂÖ÷væW"÷&VÂÕF‡&VRFW7G26÷fW"ÆÂ6Æ÷G2÷&r†6†W2óbÖ&—B÷ööÆVB¶–æÆ–æP¥6fT÷Vâö'&÷w6W"äôÒW‡÷'B÷6÷W&6RVæ—G2ÆF—7F6†W"öÖÆf÷&ÖVB÷7FÆR&VgW6ÂÆÆ—CW€§7W&f6R÷–6¶–ærö7F—fR¶–æ7F—fRwV&G2ö6æ6VÂöF—7÷6ÂöF—7Æ’'VFvWG2â÷&–v–æÀ§7–çF†WF–2–çB×v&æ–ærf—‡GW&Ræ÷r†2fÆ–BV×G’ÖFW&–Ã²÷&–v–æÂ76W'F–öç0§&WF–æVBÆæWrFW7G2W‡Æ–6—FÇ’&V¦V7B–çfÆ–BÖFW&–Âö–ÖvR&Vg2ãS’fö7W6VB6†V6·0¥53²f–æÂgVÆÂÆö6ÂæöFS#Bã#"ã7V—FS3#"52ód”Âó6¶—ó6æ6VÂƒã3'2’à¥7–çF‚öF–fb6ÆVâà¥&VÂÔDU5BæBÔDU5Bƒ’&÷F‚f–ÆRÖ–×÷'BÓæf—BÓçööÆVB6fT÷VâÓæ'&÷w6W"äôÒÓà§'6R53¢W†7B6öÆ÷W"–ÖvR†6‚÷6WGF–æw2æCWƒR&WVBÇ6÷W&6Rv÷&ÆG÷6—F–öç0§v—F†–ã&RÓc³C“gbóSFb7V&RæCs“bós“fbFW‡B&W6W'fVBâ&—fFRf–ÆW2æ÷B6öÖÖ—GFVBà¤æò&VæFW&VBÖ'&÷w6W"öæF—fR•B÷"6ö×ÆWFR%"÷fW'FW‚×–çBf–FVÆ—G’6Æ–Òà ¥&Wf–WvVC#R&W6÷W&6Rö6öFV2÷–çBöW‡÷'Bö–×÷'B÷&VæFW"ö÷fW&Æ’&VçG2æB6æöæ–6À§&VÆV6RÓæf6RÖÆ–÷WBÓæG&vW"õUbÆ"6Æ÷7W&S²Ö÷7B&VçBF–fg2&R–×÷'B–ç2öæÇ’à¤66WFVC#B7GVÂÆ–v‡B6öFRÆÖ–âô×VÇF“ãög&÷¦Vâ&WF2æBvVöÖWG'’¶W&æVÇ2&VÖ–âà¤æòæWrô"FW7B&F6‚à¥V&Æ—6†VB'VçF–ÖR#sSs“#†c#f366“SCf3ƒƒSF3V†“SFcfC²fWF6†VB÷&–v–âöÖ–âG&VP£ƒfF3#–C“ss†3vƒcSfSƒs#“3†f3&&c2WVÇ2FW7FVB÷WÆöFVBG&VRW†7FÇ’à¤ÆÃ3’6†ævVB&Æö'2fW&–f–VB&Vf÷&RæöâÖf÷&6VBW‡V7FVBÖÖ–âWFFRâvW0£C#3#“s‚5T44U53²†÷7FVBgVÆÂ&Vw&W76–öãC#3#“C6ö×ÆWFVB5T44U52à£‚ó#rg&W6‚Æ—fRf–ÆR'—FRÖF6†W3²&VÖ–æ–æs’&WVW7G2F–ÖVB÷WBBæWGv÷&²&÷‡’À¦æ÷B6÷VçFVB52âÆ—fR'&÷w6W"6W&FVÇ’6öæf—&×2F—FÆRöFF÷f—6–&ÆS#RæBÆÀ§6—‚&VæFW"ö–×÷'BöW‡÷'Bö6öFV2×&VçB÷&VÆV6R6†VÆÂ–ç3#Râ'&÷w6W"w2vV$tÂ—0¦W‡Æ–6—FÇ’D•4$ÄTBÇ6òæò&VæFW&VB7F'GW÷FW‡GW&Rf—7VÂ÷"æF—fR•B526Æ–Òà¤'V–ÆC#RDUÄõ”TBò$TE’f÷"æF—fR6öÆ÷W"÷&÷VæB×G&—FW7F–ærâæò'VçF–ÖRVF—G0¦gFW"f–æÂgVÆÃ3#%52âV&Æ–6F–öâ&ööb—2Fö7VÖVçFF–öâÖöæÇ’à¤DUd”4S#R&V–×÷'BÔDU5BææöÒ–â7GVF–òõ6öÆ–C²6öÆ÷W"GFW&æVB7V&Rf—6–&ÆRv—F€¦6÷'&V7CW‚F–Æ–ærÆ÷&&—B÷6VÆV7BôÖ÷fRâ6fT÷Vâæ&÷†Æ"&WF–ç2FW‡GW&RâW‡÷'BäôÔBÀ¦÷Vâ–âæöÖBæB6ö×&RFW‡GW&R÷F–Æ–ærâ7v—F6‚Æöö·2õVæFõ&VFó³#BVæFW'6–FRæ@¦fÆö÷"7–6ÆR6æ—G’âæW‡BæF—fR6öÆ÷W"fVVF&6²ÇF†Vâæ÷&ÖÂ÷66Æ"öVÖ—76—fR&Wf–Wp§F‡&÷Vv‚6ÖR&WF–æVB×&W6÷W&6R÷væW#²÷6—G’öF—7Æ6VÖVçBF—7Æ’&VÖ–âFVfW'&VBà ¢22ã#b(	BæF—fRäôÒæ÷&ÖÂò&÷Vv†æW72òÖWFÆæW72f–Ww÷'B(	B3ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’56W3#RæB&WVW7G2öæW‡F'V–ÆBâ&÷FV7B66WFVBæF—fR6öÆ÷W"ð£W‚F–Æ–ærÇ&WF–æVBÖ2õ6fT÷VâôäôÒ÷6÷W&6R×Væ—B—VÆ–æRæC#BÆ–v‡F–ærâ&6VÆ–æP¦Ö–æ##cc3B÷'VçF–ÖV#sSs“#âVF—B÷&–v–æÂ&W6÷W&6RõUbÖ–ÖvRöFV6öFW"æBW†—7F–æp§–çB&VfÆV7F–öâööÃ“#S²æò&ÆÆVÂÖFW&–ÂövVöÖWG'’÷–6¶–ærö†—7F÷'’÷væW"à ¤W†—7F–ær7GVF–òõ6öÆ–BäôÒ6öÆ÷W"÷fW&Æ’FG2Æ–æV"FævVçBæ÷&ÖÄÖ†f7F÷$æ÷&ÖÂÀ¦æ÷&ÖÅöæVu÷’öÆVv7’fÆ—÷’’Ç6W&FR÷VRu$•44ÄR&÷Vv†æW72öÖWFÆæW72Ö2æ@§6fVBf7F÷%&÷Vv†æW72öf7F÷$ÖWFÆæW72â–æFWVæFVçB7W÷'FVBUbôWFò÷&WVB6×Æ–ærà¤FFFV6öFRW6W2æò6öÆ÷W"6öçfW'6–öâ÷&V×VÇF—Æ–6F–öã²66Æ"6çf2&WÆ–6FW0§fÆ–FFVBw&W’–çFò$t"f÷"F‡&VRrô"&VG2â6öÆ÷W&VB÷G&ç6ÇV6VçB66Æ'27F§&WF–æVBÖöæÇ’&F†W"F†âwVW76–ær6†ææVÂâ6öÆ÷W"V'2f—'7C²f–ÆVB÷Vç7W÷'FV@¦W†–Æ–'’¶VW2—BâÇv—2×VæÆ—BæBUb–ÖvR&VÖ–â66WFVB6öÆ÷W"ÖöæÇ’–ç7V7F–öâà¤ÖWFÆÆ–2ÖÖFW&–Ç2&WW6RW†7C“#R6†&VB÷&Vf6÷VçFVB&ööÒÕ$TÒ–b66VæR†2æð¦W‡Æ–6—BVçf—&öæÖVçC²ÖFW&–ÂÖöæÇ’ÇVæf–Æ&ÆRuRw&6VgVÆÇ’W6W2F—&V7BÆ–v‡G2à¤÷&–v–æÂ6÷W&6R'—FW2Æ&—BFWF‚ÆÖFW&–Â¥4ôâÆ6öFV2ö–×÷'BöW‡÷'B&V†f–÷"Væ6†ævVBà ¤&÷VæG3FæF—fR7W&f6W2ó#²6÷&æW'2V6ƒ²6öÆ÷W"¶æ÷&ÖÃ#G7V&R÷66Æ'3S'7V&S°¦6öÖ&–æVBVæ—VRVæ6öFVB6†ö–6W3ÃÓ„Ö”"W"7W&f6Râ÷&–v–æÃ#DÖ”"&WF–æVBööÂà¤÷6—G’öVÖ—76—fRöF—7Æ6VÖVçB7F–ÆÂ&WF–æVBÖöæÇ“²6öÆ÷W"6÷W&6R7F–ÆÂ&WV—&VC°§G&ç6ÆF–öâ÷&÷FF–öâ÷G&—Ææ"&VÖ–âVç7W÷'FVBF—7Æ’âæòæWrFVç6RvVöÖWG'’À¦æWr7F'GWFVfVÇB÷"6†ævRFó#BfÆö÷"öÆ–v‡G2öæf–vF–öâõ—f÷B÷6VÆV7F–öâõ–çBà¤äôÒ–×÷'B7FGW2æ÷rFW67&–&W27W÷'FVBæ÷&ÖÂöw&—66ÆR66Æ"&Wf–Wr†öæW7FÇ’à ¥6—‚æWr7GVÂÖ÷væW"÷&VÂÕF‡&VRFW7G26÷fW"Æç2öf7F÷'2õ’÷W"ÖÖG&ç6f÷&×2À¦Æ–æV"FV6öFW"öw&—66ÆRöÇ†÷&VgW6Ç2Æ6æ6VÂöÆFRöæòÖW‡G&×7F'BÇ&VfÆV7F–öâ6ÆVçWð¦W‡Æ–6—BVçf—&öæÖVçBÇVæÆ—BõUd–ÖvRÅ6fT÷VâôäôÒ'—FR7F&–Æ—G’æB7GVÂ7GVF–òõ6öÆ–@¦–çFVw&F–öâ÷–6¶–ær÷6÷W&6RvVöÖWG'’âW†—7F–æs#R6öÆ÷W"ÖöæÇ’&6VÆ–æRf—‡GW&W2ÖFP¦W‡Æ–6—FÇ’6öÆ÷W"ÖöæÇ“²ÄÂ÷&–v–æÂ6öÆ÷W"76W'F–öç2öÆÂÖÖ&WFVçF–öâFW7G2¶WBà£Srfö7W6VB52ód”Âó6¶—âf–æÂgVÆÂÆö6ÂæöFS#Bã#"ã7V—FS3#‚52ód”Âð£6¶—ó6æ6VÂƒƒ2ãC‡2“²6†ævVB¥27–çF‚öF–fb6ÆVââ6Æ÷VBvV$tÂv2F—6&ÆVBGW&–æs#S²æòæWr'&÷w6W"ôuR÷ ¦æF—fS#bf—7VÂ66WFæ6R6Æ–ÖVBâFWF–Ç2öFö72öæöÖB×'"×&Wf–WrÓ#bæÖBà ¤vVæW&–2&VG’×FòÖ–×÷'BäôÕõ%%ó#bææöÒƒs’Ã#“&'—FW2’7WÆ–VB6W&FVÇ“£27V&W2À¦æ÷&ÖÂ·&÷Vv†æW72òÖWFÆÆ–2·&÷Vv†æW72ò6öÆ÷W"6öçG&öÂâ÷&–v–æÂ&ö6VGW&Ã#†Ö2À¦æò&—fFR'Gv÷&³²&VvVæW&FRg&öÒFW7G2ö†VÇW'2öæöÖB×'"Öf—‡GW&RæÖ§2âæòW6W"6·0§Fò6öç7G'V7B&6¶VæBf—‡GW&W2â&Wf–WvVC#b6†–ÆB÷&VçBö66†R6Æ÷7W&R–æ6Â÷&–v–æÀ¥UbFV6öFW"Óçv÷&·76RôÆ"öW‡÷'G2æB6æöæ–6Â&VÆV6RÓæf6RÖÆ–÷WBÓæG&vW#²Ö÷7@¦6†ævW2&R–ç2öæÇ’â&÷FV7FVBÖ–âô×VÇF“ãög&÷¦Vâ&WF2æB7GVÃ#BÆ–v‡F–æp¦'—FW2Væ6†ævVBâæòæWrô"&F6‚à¥V&Æ—6†VB'VçF–ÖScƒ3#SV6V3sS3sCvFS†V6#Sc“sS†S3f6CSC#ƒ²fWF6†VB÷&–v–âöÖ–âG&VP£v#S–#s&C&Cc##–3fF&cƒ–Sc“SV#†sƒ#V6Sf"W†7FÇ’ÖF6†W2FW7FVB÷WÆöFVB6÷W&6Rà¤ÆÃCB6†ævVB&Æö'2†6‚×fW&–f–VB&Vf÷&RæöâÖf÷&6VBW‡V7FVBÖÖ–âWFFRâvW0£C#Ss3s#S25T44U53³’ó’g&W6‚Æ—fRf–ÆW2'—FRÖÖF6ƒ¢6†VÆÂöÖæ–fW7BÆæF—fR&W6÷W&6RÀ¦FV6öFW"ÅUb7W&f6RÆ–×÷'B÷&VæFW"÷væW'2æBVæ6†ævVB&VfÆV7F–öã“#Rô×VÇF“ãà¤†÷7FVCC#Ss3sCR–å÷&öw&W72B&ööc²æò†÷7FVBgVÆÂ526Æ–ÖVBâgVÆÂÆö6Ã3#€¥52ód”Âó6¶—&VÖ–ç2f–æÂfÆ–FF–öââ'V–ÆC#bÄ•dRò$TE’f÷"æF—fR%"FW7Bà¤æò'VçF–ÖRVF—G2gFW"f–æÂgVÆÂ7V—FS²æò&VæFW&VBÖ'&÷w6W"ö•B66WFæ6R–æfW'&VBà¤DUd”4S#b–×÷'B6×ÆR7GVF–òõ6öÆ–BÆÆVgBæ÷&ÖÂ÷&÷Vv†æW72&VÆ–VbÆÖ–FFÆRÖWFÆÆ–0§f&–F–öâv†–ÆR÷&&—F–ærÇ&–v‡B6öÆ÷W"6öçG&öÃ²6fT÷Vâæ&÷†Æ"²äôÔBôæöÖB6æ—G’À¦öÆBÔDU5B6öÆ÷W"óW‚66WFVBâæW‡BæF—fRfVVF&6²F†VâVÖ—76—fR&Wf–WrF‡&÷Vv€§6ÖR÷væW#²÷6—G’öF—7Æ6VÖVçBF—7Æ’FVfW'&VBà  ¢22ã#r(	BæF—fRäôÒVÖ—76—fRf–Ww÷'B(	B3ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’&W÷'G2(	Ã#b52öæW‡F'V–ÆN(	Òâ&÷FV7B66WFVBæF—fRæ÷&ÖÂÀ§&÷Vv†æW72öÖWFÆæW72Â6öÆ÷W"óW‚F–Æ–ærÂ&WF–æVB6÷W&6R'—FW2æB&÷VæBG&—2Âæ@£#BVæFW'6–FRÆ–v‡F–ærâ&6VÆ–æRÖ–â#v3#ƒS’ò'VçF–ÖRcƒ3#SV2à ¤VF—C¢W†—7F–æræöÖBÖÖFW&–Â×&W6÷W&6RæBWbÖ–ÖvR×7W&f6R×&Wf–Wr÷vâæF—fRÖ §Æææ–æröFV6öF–æröÖFW&–ÂÆ–fWF–ÖRâW‡FVæBF†÷6R÷væW'2öæÇ“¢7W÷'FVB÷VP¥UbôWFòVÖ—76—fRFW‡GW&R–â7GVF–òõ6öÆ–BÂ5$t"–ÖvRÂ6fVBÆ–æV"f7F÷$VÖ—76—fP¥$t"æBf7F÷$VÖ—76—fU7G&VæwF‚Â–æFWVæFVçB&WVB÷6×ÆW"â6fVB¦W&òfÇVW2&VÖ–à§¦W&òâ–çfÆ–Bf7F÷'2÷&ö¦V7F–öç2÷"W††W7FVB6öÖ&–æVC„Ö”"'VFvWB&VÖ–â&WF–æVBÐ¦öæÇ“²f–ÆVBöÆFRW†–Æ–'’FV6öFR¶VW266WFVB6öÆ÷W"õ%"æB6ÆVç2Wæ÷&ÖÆÇ’à¤VÖ—76–öâ—27W&f6R'&–v‡FæW72Âv—F‚æòFFVB66VæRÆ–v‡Bö&ÆööÒ÷&VæFW&W"â6öÆ÷W §6÷W&6R7F–ÆÂ&WV—&VC²Çv—5÷VæÆ—BæBUb–ÖvR&VÖ–â6öÆ÷W"ÖöæÇ’–ç7V7F–öâà¤÷6—G’öF—7Æ6VÖVçBF—7Æ’æBG&ç6ÆFVB÷&÷FFVB÷G&—Ææ"6×Æ–ær7F’FVfW'&VBà¤÷&–v–æÂ6÷W&6R'—FW2öÖFW&–Â¥4ôâöW‡÷'Bö6öFV2æBvVöÖWG'’÷–6¶–ærö†—7F÷'’&WF–æVBà¤f÷W"æF—fR7W&f6W2ó#²6÷&æW'3²VÖ—76—fS#G7V&RW6W2÷&–v–æÂ6W&–ÂFV6öFW"à ¤f÷W"æWr&VÂÖ÷væW"FW7G26÷fW"Æâöf7F÷'2÷F–Æ–ærö'VFvWB÷&VgW6Ç2Â7GVÂF‡&VP§5$t"VÖ—76—fTÖö–çFVç6—G’æBW†—7F–ærFFÖ2ÂÆFRöf–ÇW&R÷VæÆ—B6ÆVçWÂæ@¦'—FRÖ–FVçF–6ÂööÆVB6fT÷VâôäôÒâ÷&–v–æÃ#Ró#bFW7G2Væ6†ævVBã#Rfö7W6V@¦6†V6·252ód”Âó6¶—âgVÆÂÆö6ÂæöFS#Bã#"ã£33"52ód”Âó6¶—ó6æ6VÀ¢ƒƒRãc72“²f÷W"æWrFW7G2Ç6ò&W'VâgFW"FF–ærW‡Æ–6—B¦W&òÖf7F÷"76W'F–öç2à¥7–çF‚öF–fb6ÆVã²æòæF—fRuRö•BVÖ—76—fR66WFæ6R–æfW'&VBà¥&Wf–WvVB&WfW'6RÖÆöFW"66†R6Æ÷7W&S²Ö÷7B6†ævW2&R–ç2öæÇ’âÖ–âô×VÇF“ãÀ¦g&÷¦Vâ&WF2Â7GVÃ#BÆ–v‡F–æræB–çB÷&VfÆV7F–öâ6öFRVæ6†ævVBâW†—7F–æp¦–âÖFW7BÆ—7B–æ6ÇVFW3#r6†V6·3²æòæWrô"&F6‚&WV—&VBà ¤vVæW&–26×ÆS¢Fö72÷6×ÆW2ôäôÕôTÔ•54•dUó#rææöÒÂ&VvVæW&FVB'’F†RW†—7F–æp¦æöÖE%$f—‡GW&R‡¶VÖ—76—fS§G'VWÒ’æBæF—fRw&—FW"âÆVgB7V&RFG2&ÇVRVÖ—76—fP¦f7F÷"÷7G&VæwFƒ"Fòæ÷&ÖÂ·&÷Vv†æW72ÂÖ–FFÆR%"æB&–v‡B6öÆ÷W"6öçG&öÇ2Væ6†ævVBà¤DUd”4S#s¢–×÷'B6×ÆR7GVF–òõ6öÆ–BæB÷&&—B&VÆ÷s²ÆVgBVÖ—76—fR&VÖ–ç2'&–v‡BÀ¦÷F†W"7V&W2&WF–âæ÷&ÖÂ÷66Æ"6†F–æs²7v—F6‚Æöö·2ö&6²â6fRô÷Vâæ&÷†Æ"æ@¤äôÔB&V÷Vâ–âæöÖB&WF–â—Bâ6†V6²66WFVC#b6×ÆR7F–ÆÂÆöö·2F†R6ÖRà¤æW‡C¢æF—fRVÖ—76—fRfVVF&6³²÷6—G’F—7Æ’æVVG26W&FR66÷VBVF—BÂv†–ÆP§7V&F—f—6–öâöF—7Æ6VÖVçB&VÖ–ç2FVfW'&VBâV&Æ–6F–öâ&ööbföÆÆ÷w2fÆ–FF–öâà ¥V&Æ–6F–öâfW&–f–VC¢'VçF–ÖRc#CCVf6F&FSS3ƒFc&#v3SCS3VVS†S6&6S†S°¦fWF6†VB÷&–v–âöÖ–âG&VSfFSsVc–#f&#sv6F3“CS6C3ff3sc–c3&VBW†7FÇ’ÖF6†W0§FW7FVB÷WÆöFVBG&VRâÆÃC6†ævVB&Æö'2†6‚×fW&–f–VB&Vf÷&RW‡V7FVBÖÖ–âÀ¦æöâÖf÷&6VBWFFRâ6WfVâg&W6‚Æ—fRf–ÆW2'—FRÖÖF6ƒ¢6†VÆÂöÖæ–fW7BÂÖFW&–À§&W6÷W&6Rö÷fW&Æ’ö–×÷'B÷væW"÷FW7BÆ—7BæBF÷væÆöF&ÆR6×ÆRâvW3C3“cƒSS`¦æB†÷7FVBF÷öÆöw“C3“c“3ƒbvW&R–å÷&öw&W72BÆ7BVW'“²æò†÷7FVB50¦6Æ–ÖVBâgVÆÂÆö6Ã33%52&VÖ–ç2fÆ–FF–öââ'V–ÆC#rÄ•dRò$TE’f÷"æF—fP¦VÖ—76—fRFW7F–ærâæò'VçF–ÖRVF—G2gFW"gVÆÂ7V—FS²æF—fRf—7VÂvFRVæF–ærà ¢22ã#‚(	BæF—fRäôÒ÷6—G’f–Ww÷'B(	B3ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’&W÷'G2(	Ã#r52öæW‡F'V–ÆN(	Òâ&÷FV7B66WFVBVÖ—76—fS#rÀ¦æ÷&ÖÂ÷66Æ'3#bÂ6öÆ÷W"÷F–Æ–ær÷&WFVçF–öã#RæBVæFW'6–FRÆ–v‡F–æs#Bà¤&6VÆ–æRÖ–æf#&f3&FRò'VçF–ÖVc#CCVbâ&Wò÷6÷W&6RVF—B6öæf—&×2÷&–v–æÂæF—fP§&W6÷W&6RõUb÷fW&Æ’öFV6öFW"æB&VæFW"ÖÖöFW2&RWF†÷&—FF—fRà ¥7GVF–òõ6öÆ–BÆ—BæF—fR7W&f6W2æ÷r&Wf–Wr6W&FR÷VRw&—66ÆR÷6—G’Ö0¢†Æ–æV"Ç†ÖÃÓS'7V&RÂ6fVBf7F÷$÷6—G’¢ÖFW&–Â&ÆVæF–ær÷6—G’’æ@§6–×ÆR&ÆVæF–ærÖFW&–ÂVæ–f÷&Ò÷6—G’–æ6ÇVF–ær¦W&òâ÷&–v–æÂ6öÆ÷W"7F–ÆÀ§&WV—&VBâ÷VR&6R÷"&ÆVæF–æröæÇ“²÷F†W"æF—fRG—W2æBW6Uö6öÆ÷%ö÷6—G§&VÖ–â&WF–æVBÖöæÇ’f÷"÷6—G“²66WFVB÷VR6öÆ÷W"õ%"–ç7V7F–öâ—2&W6W'fV@¦f÷"6öÆ÷W"ÖÇ†f–ÆW2âW"ÖÖ&WVB÷6×ÆW"æB6öÖ&–æVC„Ö”"óG7W&f6W2ó#²6÷&æW'0§&VÖ–ââVæÆ—BõUb–ÖvR¶VW&–÷"6öÆ÷W"ÖöæÇ’öÆ–7“²6÷W&6R'—FW2÷6WGF–æw2VçF÷V6†VBà¥Vç7W÷'FVBöf–ÆVB÷6—G’&WF–ç266WFVB6öÆ÷W"õ%"æB÷&–v–æÂ÷6—G’fÆÆ&6³°¦ÆFR6æ6VÆÆF–öâ6Æ÷6W2–ÖvRæB6ææ÷B7F—fFRG&ç7&Væ7’à ¤öæR66÷VB÷&–v–æÂ7FæF&BÖFW&–Â6†FW"†öö²–væ÷&W26öÆ÷W"ÖÖÇ†v†–ÆP§6×Æ–ær$t"Â&V6W6RæF—fR6öÆ÷W"Ç†—2÷BÖ–âöFVfW'&VBâ÷&–v–æÂ&—FÖFV6öFP§&WVW7G2Vç&V×VÇF—Æ–VB$t"f÷"F†W6R7W&f6W2v—F†÷WB6†æv–ær5$t"6öçfW'6–öâà¤æò6çf2Ç†&Ww&—FR÷&RÖVæ6öFS¢F†B&V¦V7FVB&ö6‚Æ÷6W2$t"BÇ†F‡&÷Vv€¦6çf2&V×VÇF—Æ–6F–öââ6†FW"W6W2–ç7FÆÆVBF‡&VSãs’ãÖ6‡Væ²ö66†R¶W’à¤æF—fRG&ç7&Væ7’W6W2W†—7F–ærÇ†&ÆVæF–æröFWF…w&—FVfÇ6S²÷&–v–æÂÖW6€§–6¶–ær&VÖ–ç26öÆ–BâG&ç7&VçB6VÆbö–çFW'6V7F–ær6÷'F–æræB÷F–6Â&Vg&7F–öà¦f–FVÆ—G’&RäõB6Æ–ÖVBâ÷&–v–æÂ÷&ævR&6¶f6R7VR†–FW2f÷"6öæf—&ÖVBG&ç6ÇV6Vç@§7W&f6W2æB&W7F÷&W2öâF—7÷6ÂâÖW6‚6†F÷w2F—6&ÆVB†æ÷BG&ç7&VçB6†F÷w2“°¦&÷F‚÷&–v–æÂ7GVF–ò&Vg&W6‚÷væW'2&W7V7B÷fW&Æ’Æ–fWF–ÖRfÆr6ò—B6ææ÷B&RÖVæ&ÆR6öÆ–@§6†F÷w2âvVæW&ÂfÆö÷"6öçF7B7VR&VÖ–ç2Væ6†ævVBâæòvVöÖWG'’ö†—7F÷'’ö–çWBÀ¦W‡G&&VæFW&W"öÆ–v‡BÂvÆö&ÂÖFW&–Â÷fW'&–FR÷"GWÆ–6FR÷væW"à ¥6—‚æWr÷væW"÷&VÂÕF‡&VRFW7G26÷fW"wV&G2ö'VFvWG2öf7F÷'2÷6×Æ–ærÂÖFW&–Âæ@§6†FW"6VÖçF–72ÂVæ–f÷&Ò¶ÖæB¦W&òÇ†Âf–ÇW&RöÆFRF—7÷6ÂÂFV6öFW"÷F–öç2À¦7GVÂ7GVF–òõ6öÆ–B÷&–ræBÆFRö–çFW"×&VÆV6R66VæR×&Vg&W6‚6ÆVçWæBW†7BööÆVB&ö¦V7BôäôÒ'—FR&÷VæGG&—à£3f–æÂfö7W6VB52ód”Âó6¶—â'&öBÆö6ÂæöFS#Bã#"ã7V—FS33‚52ð£d”Âó6¶—ó6æ6VÂƒ“’ãS'2’ÂföÆÆ÷v–ærV&Æ–W#33…52âf–æÂfö7W6VC3&W'Và¦6÷fW'2&6·v&BÖ6ö×F–&ÆR÷VR6öÆ÷W"ÖÇ†fÆÆ&6²æB6W&–Æ—¦&ÆRUT”@¦÷6—G’÷væW'6†—†æò6—&7VÆ"W6W$FF’â7–çF‚öF–fb6ÆVã²æòæF—fRuR52à¥&Wf–WvVB&WfW'6RÖÆöFW"–ç2–æ6ÇVFR÷&–v–æÂFV6öFW"õUböW‡÷'B÷–çB&VçG3°¦Ö÷7B6†ævW2&R66†R&VfW&Væ6W2öæÇ’âÖ–âô×VÇF“ãög&÷¦Vâ&WF2Â7GVÂÆ–v‡@¦6öFRæB66WFVC#rVÖ—76–öâ&V†f–÷"&WF–æVBâ–âÖ6†V6¶Æ—7B–æ6ÇVFW3#‚à¤vVæW&–26×ÆRFö72÷6×ÆW2ôäôÕôõ4•E•ó#‚ææöÒW6W2÷&–v–æÂæF—fRw&—FW#°¦ÆVgBw&—66ÆR6†V6¶W"÷6—G’ÂÖ–FFÆS3RRVæ–f÷&ÒÂ&–v‡B÷VR6öçG&öÂà ¤DUd”4S#ƒ¢–×÷'B6×ÆR7GVF–òõ6öÆ–BÂ÷&&—BæB–ç7V7B6†V6¶W"†öÆW2öÖ–FFÆP§G&ç7&Væ7’ö6öçG&öÃ²æò÷&ævRf–ÆÂF‡&÷Vv‚G&ç7&VçB&V2â6VÆV7BôÖ÷fRõVæFõ&VFòÀ§7v—F6‚Æöö·2ö&6³²6fRô÷Vâæ&÷†Æ"æBäôÔBôæöÖB&WF–â÷6—G’6WGF–æw2öÖ2à¤Ç6ò&V–×÷'B66WFVC#rVÖ—76—fR6×ÆRf÷"V–6²6æ—G’âæòæWrô"&F6‚à¤æW‡C¢æF—fR÷6—G’fVVF&6²ÂF†VâVF—B6öÆ÷W"ÖÇ†7W÷'B÷&VÖ–æ–ærG&ç6f÷&Ð§6×Æ–ær&Vf÷&RF—7Æ6VÖVçC²F—7Æ6VÖVçB7V&F—f—6–öâ&VÖ–ç26W&FVÇ’FVfW'&VBà ¥6÷W&6W3¢öff–6–ÂæöÖBÖFW&–ÂÖçVÂ‡GG3¢òöæöÖG67VÇBæ6öÒöÖçVÂöÖFW&–À¦æB7FW†öÖ’öæöÖBÖÆ–æ²&ÆVæFW"öæöÖEö&ÆVæFW%öÆ–æ²õõö–æ—Eõòç“¢6W&FRæöâÖ6öÆ÷W ¦÷6—G’æB÷BÖ–â6öÆ÷W"Ç†²–×ÆVÖVçFF–öâW6W2&÷VæFVBw&—66ÆRöæÇ’à ¥V&Æ–6F–öâfW&–f–VC¢'VçF–ÖRCsƒcc–C†SS“CsCvfcƒfsS–F6#V°¦fWF6†VB÷&–v–âöÖ–âG&VVF3scsFSvV6CC“S3ƒ&6CcSƒs6cCcf&FfSbW†7FÇ’ÖF6†W0§fÆ–FFVB÷WÆöFVBf–ÆW2âÆÃCR6†ævVB&Æö'2†6‚×fW&–f–VB&Vf÷&RæöâÖf÷&6VBÀ¦W‡V7FVBÖÖ–âWFFRã’ó’g&W6‚Æ—fR'—FRÖF6†W3¢6†VÆÂöÖæ–fW7BÆæF—fR&W6÷W&6RÀ¥Ub7W&f6RöFV6öFW"Ç&VæFW"ÖÖöFW2ÆÆFR7GVF–ò66VæRf—‚ÇFW7BÆ—7BæBäôÒ6×ÆRà¥vW3C33Cc32æB†÷7FVBF÷öÆöw“C33CcSS’vW&R–å÷&öw&W72BÆ7BVW'“°¦æò†÷7FVBgVÆÂ526Æ–ÖVBâ'&öBÆö6Ã33…52æBf–æÂfö7W6VC352&VÖ–à§fÆ–FF–öââ'V–ÆC#‚Ä•dRò$TE’f÷"æF—fR÷6—G’FW7F–æs²æF—fRuRö•@¦V&æ6RvFR&VÖ–ç2VæF–ærâF†—2V&Æ–6F–öâ&ööb6†ævW2Fö7VÖVçFF–öâöæÇ’à ¢22ã#’(	BæF—fRäôÒ6öÆ÷W"Ö–ÖvRÇ†(	B3ö7Fö&W"##` ¥W6W"6÷'&V7G2–æ—F–Ã#‚d”Ã¢(	Ã#‚52Ò&Vg&W6‚Föö²6öÖRF–ÖR'WB—Bv÷&¶V@¦WfVçGVÆÇ’¢’öæW‡F'V–ÆN(	ÒâF†—27WW'6VFW2F†R–æ—F–Â&W÷'C²&÷FV7B66WFV@£#‚w&—66ÆR÷6—G’ö&ÆVæF–ærö&6¶f6R÷6†F÷r†æFÆ–ærÇW3#rVÖ—76–öâæ@£#bó#R%"÷&WFVçF–öââ&Vg&W6‚Ær—2âö'6W'fF–öâÂæ÷BWf–FVæ6Röb÷6—G¦f–ÇW&S²fW&–g’æWr6†VÆÂöÖæ–fW7B÷–ç2öÆ—fR'—FW2Âæò7V7VÆF—fR&Vg&W6‚6†ævW2à¤&6VÆ–æRÖ–ãs“vc3S3‚ò'VçF–ÖRCsƒcc’à ¤VF—C¢æF—fRÖFW&–ÂÇ&VG’&WF–ç2W6Uö6öÆ÷%ö÷6—G’âW‡FVæBW†—7F–ær&W6÷W&6P§ÆâæBUb÷fW&Æ’öæÇ“¢W‡Æ–6—BG'VRó÷G2–çFò6öÆ÷W"Ö–ÖvRÇ†–âÆ—BæF—fP¥7GVF–òõ6öÆ–BâfÇ6Róö'6VçB7F—26öÆ–BVæÆW72W†—7F–ær÷6—G’Ö÷66Æ"Æ–W2à¥Væ¶æ÷vâfÆw2&WF–â&–÷"÷VR–ç7V7F–öâ÷&VgW6Ã²æòG'WF†–æW726öW&6–öâà¥F‡&VRw2õ$”t”äÂ$t$Ö6†FW"æ÷r'Vç2f÷"÷FVBÖ–â7W&f6W2Â×VÇF—Ç––ær–ÖvP¦Ç†v—F‚W†—7F–ærÆ–æV"Ç†ÖæBf7F÷$÷6—G’¢&ÆVæF–ærÖFW&–Â÷6—G’à¤66WFVC#‚$t"ÖöæÇ’6†FW"7F—2f÷"6öÆ÷W"ÖÇ†ôdbv†Vâ÷6—G’—2÷F†W'v—6P¦7F—fRâæF—fRÆ—B6öÆ÷W"&WVW7G2W†—7F–ærVç&V×VÇF—Æ–VB&—FÖF‚WfVâv†Và¦Ç†ôdb6òæöç¦W&ò$t"VæFW"¦W&òÇ†7W'f—fW3²æò—†VÂ&Ww&—FR÷&RÖVæ6öFRà¤W†—7F–ær6W&–Â6æ6VÆÆF–öâÂ&Wf–Wr'VFvWG2Â6÷W&6R'—FW2Âæ÷&ÖÂ÷66Æ"öVÖ—76–öâÀ§6VÆV7F–öâ÷–6¶–ærö†—7F÷'’Â6†F÷rö&6¶f6RÆ–fWF–ÖRæB&÷F‚7GVF–ò÷væW'2&WF–æVBà¥VæÆ—BõUb–ÖvR&WF–â&–÷"6öÆ÷W"ÖöæÇ’öÆ–7“²&Vg&7F–öâöFF—F—fRöF—F†W&–æröæF—fP§fW'FW‚÷6—G’&VÖ–âVç7W÷'FVBâG&ç7&Væ7’6÷'F–ærÆ–Ö—FF–öç2Væ6†ævVBà¤æòvVöÖWG'’÷7V&F—f—6–öâöW‡G&&VæFW&W"öÆ–v‡B÷"vÆö&ÂÖFW&–Â6†ævRà ¤f÷W"æWr&VÂÖ÷væW"õF‡&VRö7GVÂ$t$är6†V6·26÷fW"W‡Æ–6—BfÆr6VÖçF–72À¥$t$g2$t"ÖöæÇ’6†FW"&÷WF–ærÂ6öÖ&–æVB–æFWVæFVçBÖ÷66Æ"f7F÷'2Â6öÆ–Bôd`¦6öçG&öÂÂ&r¦W&òögVÆÂÇ†¶æöç¦W&ò$t"æBVç&V×VÇF—Æ–VBFV6öFW"ö6æ6VÆÆF–öâÀ§VæÆ—BõUb–ÖvRæBW†7BööÆVB6fT÷VâöæF—fRäôÒ'—FW2ã#‚FW7Bæ÷r66WG0¦W‡Æ–6—BfÆsW"æWrfVGW&RæB7F–ÆÂ&V¦V7G2–çfÆ–C#²ÆÂ&Wf–÷W2Ö÷6†F÷rð¦6ÆVçW76W'F–öç2&WF–æVBã3Rfö7W6VB52ód”Âó6¶—âgVÆÂf–æÂÆö6ÂæöFS#Bã#"ã7V—FS3C"52ð£d”Âó6¶—ó6æ6VÂƒ##"ã32“²æò'VçF–ÖR÷FW7BVF—G2gFW"gVÆÂ×7V—FR7F'Bà¥7–çF‚öF–fb6ÆVââæòæF—fRuRö•Bf—7VÂ66WFæ6R–æfW'&VBà¥&Wf–WvVB&WfW'6RÖÆöFW"66†R6Æ÷7W&S²Ö÷7B6†ævW2–×÷'B–ç2öæÇ’â&÷FV7FV@¦Ö–âô×VÇF“ãög&÷¦Vâ&WF2ÂFV6öFW"æB&÷Fƒ#‚7GVF–ò6†F÷r÷væW'2Væ6†ævVBà¤–âÖÆ—7B–æ6ÇVFW3#’6†V6·3²&–÷##‚&F–æw2&WF–æVC²æòô"&F6‚&WV—&VBà ¤vVæW&–2Fö72÷6×ÆW2ôäôÕô4ôÄõU%ôÅ„ó#’ææöÓ¢ÆVgBÇ†ôâ6†V6¶W"†öÆW3²Ö–FFÆP§6ÖR–ÖvR‚6W&FS'‚÷6—G’Ö‚Væ–f÷&ÓcRR†f7F÷$÷6—G’ã‚“²&–v‡B6ÖR–ÖvP¦Ç†ôdbÂ6öÆ–Bâf—‡GW&R—2FW7BÖöæÇ’$t$är6öç7G'V7F–öâÇW2÷&–v–æÂæF—fP§w&—FW#²÷&–v–æÂ&öGV7F–öâ÷VRärVæ6öFW'2VçF÷V6†VBâæòW6W"'Gv÷&²à¤DUd”4S#’7GVF–òõ6öÆ–B÷&&—C¢ÆVgB6†V6¶W"†öÆW2ÆÖ–FFÆR6öÖ&–æVBG&ç7&Væ7’À§&–v‡B6öÆ–B7–ã²6VÆV7BôÖ÷fRõVæFõ&VFòÆÆöö·2ö&6²Å6fT÷Vâæ&÷†Æ"ÄäôÔBôæöÖBà¤66WFVC#‚æC#r6×ÆW2Væ6†ævVBâæF—fRuRö•C#’66WFæ6RVæF–ærà¤æW‡BæF—fR6öÆ÷W"ÖÇ†fVVF&6²ÂF†VâVF—BæF—fRFW‡GW&RG&ç6ÆF–öâ÷&÷FF–öà§6×Æ–ærF‡&÷Vv‚6ÖR÷væW#²F—7Æ6VÖVçB÷7V&F—f—6–öâ&VÖ–ç26W&FVÇ’FVfW'&VBà ¢22ã3(	BæF—fRäôÒFW‡GW&RG&ç6ÆF–öâæB&÷FF–öâ(	B3ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ’&W÷'G2ã#’52æBöæW‡F'V–ÆBâ&÷FV7B6öÆ÷W"Ö–ÖvRÇ†À¦6öÖ&–æVB6W&FR÷6—G’÷66Æ'2Â6öÆ–Bôdb6öçG&öÂÂ6÷W&6R&WFVçF–öâæBÆÀ¦66WFVBã#^(	2ã#‚%"÷&÷VæB×G&—öÆ–v‡F–ær&V†f–÷W'2â&6VÆ–æRÖ–â÷'VçF–ÖP£fFfcfSVCV#–#cV#–cfSƒ#ƒV&3vC–6ScƒFBâ7W'&VçBçVÖ&W&VB&VÆV6Rã3à ¤VF—Bf÷VæBæF—fRFW‡GW&RG&ç6f÷&×2Ç&VG’&WF–æVB'WBf–Ww÷'BFVÆ–&W&FVÇ§&VgW6VBæöç¦W&òöfg6WG2÷&÷FF–öââW†—7F–æræöÖBÖÖFW&–Â×&W6÷W&6RÆâæ@§WbÖ–ÖvR×7W&f6R×&Wf–Wr&VÖ–âWF†÷&—FF—fRâfW&–f–VB6öçfVçF–öâv–ç7@§7FW†öÖ’öæöÖBÖÆ–æ²6öÖÖ—Cƒ3“3†Sc#sC“63cs6S#CS–VCV&SS–3À¦&ÆVæFW"öæöÖEö&ÆVæFW%öÆ–æ²õõö–æ—Eõòç’6WEöÖ–æu÷G&ç6f÷&Ó¢&F–ç2ÂæF—fP¥Ub÷&–v–âBF÷ÆVgBÂ66ÆRD„Tâ&÷FF–öâD„Tâöfg6WB&÷WBUb¦W&òâ6öæ§VvF–æp¦—G2&ÆVæFW"Ö–ær'’bÓâÕbv—fW2æF—fRÖG&—‚&÷w3 ¥¶6÷2‡"’§7‚Â6–â‡"’§7’Âöfg6WE…Ó²²×6–â‡"’§7‚Â6÷2‡"’§7’Âöfg6WE•Ó²³ÃÃÒà¥F‡&VRWFöÖF–2FW‡GW&RG&ç6f÷&×2†fRF–ffW&VçB÷&FW"VæFW"æöçVæ–f÷&Ò66ÆS°§W6R—G2÷&–v–æÂW"×FW‡GW&RÖG&—‚v—F‚ÖG&—„WFõWFFSÖfÇ6RÂæ÷B&¶VBUbVF—G2à¤V6‚6öÆ÷W"öæ÷&ÖÂ÷&÷Vv†æW72öÖWFÆæW72öVÖ—76—fRö÷6—G’Ö†2—G2÷vâG&ç6f÷&Òà¥Ub–ÖvRöÇv—2×VæÆ—B7F’6öÆ÷W"ÖöæÇ’Âæ÷rv—F‚7W÷'FVB6öÆ÷W"G&ç6f÷&×2à¤ÖÆf÷&ÖVBöæöæf–æ—FR÷"fÆöC3"Ö÷fW&fÆ÷r66ÆRööfg6WB&VÖ–ç2&WF–æVBÖöæÇ“²–çfÆ–@¦W†–Æ–'’6¶—2öæÇ’F†BÖâWFòõUb&ö¦V7F–öâÂ'VFvWG2ÂW†7B6÷W&6R'—FW2À¦÷&–v–æÂ–6¶–ærövVöÖWG'’ö†—7F÷'’Â6W&–ÂFV6öFRö6æ6VÂöF—7÷6ÂÂG&ç7&Væ7’æ@¥7GVF–ò6†F÷r÷væW'2Væ6†ævVBâæòæWr&VæFW&W"ÂUböÖöFVÆÆ–ær¶W&æVÂ÷"T’&W6¶–âà¥G&—Ææ"öF—7Æ6VÖVçB÷&Vg&7F–öâöFF—F—fRöF—F†W&–ær&VÖ–â6W&FVÇ’Vç7W÷'FVBà ¤f÷W"æWr7GVÂÖ÷væW"÷&VÂÕF‡&VRFW7G26†V6²–æFWVæFVçB&ÆVæFW"Ö6öæ§VvFRvöÆFVà¥Ub÷6—F–öç2Â&÷F‚&÷FF–öâ6–vç2Â6–væVBöæöçVæ–f÷&Ò66ÆRÂWfW'’ÖÖG&—‚æ@¦6öÆ÷W"76RöÇ†ÂVæ6†ævVBUg2÷6÷W&6RÂÖÆf÷&ÖVB–çWBæBÆFR6æ6VÆÆF–öâÀ¥Ub–ÖvR÷VæÆ—BæB'—FRÖ–FVçF–6ÂööÆVBö–æÆ–æR6fT÷VâæBæF—fRäôÒ'6RöW‡÷'Bà¤öÆFW"ã#^(	2ã#‚æöç¦W&ò×G&ç6f÷&Ò&VgW6Âf—‡GW&W2æ÷rW6Ræöæf–æ—FRG&ç6f÷&×3°§F†R6ÖR&VgW6Â76W'F–öç27F’7F—fRæBæWrFW7G26÷fW"F†RW‡æFVB6&–Æ—G’à£Cfö7W6VB6†V6·252ód”Âó6¶—–æ6ÇVF–ær&VÆV6Rö66†Rö–FVçF—G’&÷FV7F–öâà¤gVÆÂÆö6ÂæöFS#Bã#"ã7V—FS¢3Cb52ód”Âó6¶—ó6æ6VÂƒ#Bã#72’âf–æÂ6æöæ–6Â&VçBÖÆöFW"ö66†R6†V6·2&W'Vã¢52gFW"–âÖöæÇ’6÷'&V7F–öâFòG&vW"Óâf6RÖÆ–÷WBÓâ&VÆV6R×fW'6–öââæògVæ7F–öæÂ'VçF–ÖR÷FW7B6†ævW2gFW"gVÆÂ×7V—FR7F'BâV&Æ–6F–öâfW&–f–VC¢6VRFö72÷V&Æ–6F–öâÓ3æÖC²æòuRö•B526Æ–ÖVBà ¤vVæW&–2Fö72÷6×ÆW2ôäôÕõDU…EU$UõE$å4dõ$Õó3ææöÒƒsbÃƒ‚'—FW2“¢7–â'&÷röà¦f÷W"6öÆ÷W&VBVG&çG2âÆVgB÷&–v–æÂÂÖ–FFÆRöfg6WE²ã#RÂã#UÒÂ&–v‡B66ÆU³"ÃÐ§F†Vâ’ó"&÷FF–öâv—F‚öfg6WE³Ã%Òâ6ÖR6÷W&6R–ÖvS²6ö×&R4ÔRf–ÆR–âæöÖBà¤–âÖFW7BÆ—7BWFFVC²V&Æ–W"ã#’&F–æw2&WF–æVC²æòæWrô"&F6‚à¥&Wf–WvVB&WfW'6RÆöFW"w&‚æB6æöæ–6Â&VÆV6R÷&V6÷fW'’–ç2ã3²÷F†W §'VçF–ÖR¥26†ævW2&R–×÷'B–ç2öæÇ’âÖ–âô×VÇF“ãög&÷¦Vâ&WF2VçF÷V6†VBà ¤DUd”4S3¢–×÷'B6×ÆR–â7GVF–òõ6öÆ–BÂ6ö×&R÷&–v–æÂ÷6†–gFVB÷6–FWv—2&WVFV@¦'&÷rv—F‚æöÖC²÷&&—B÷6VÆV7BôÖ÷fRõVæFõ&VFó²7v—F6‚Æöö·2Â6fT÷Vâæ&÷†Æ"æ@¤äôÔBôæöÖB6ö×&—6öââ66WFVBã#’6öÆ÷W"ÖÇ†6×ÆR6†÷VÆB7F’Væ6†ævVBà¤æW‡C¢æF—fRG&ç6f÷&ÒfVVF&6²ÂF†VâVF—B&VÖ–æ–ær6×ÆW"÷&ö¦V7F–öâv3°¦F—7Æ6VÖVçB÷7V&F—f—6–öâæVVG2—G26W&FR&÷VæFVBW&f÷&Öæ6Rö&Væ6†Ö&²FV6—6–öâà ¢22ã3V&Æ–6F–öâfW&–f–VB(	B3ö7Fö&W"##` ¥'VçF–ÖR6öÖÖ—B6cFVFS“cC#ffffVfV3&#Sccs&fC&F#²fWF6†VB÷&–v–âöÖ–âG&VP£†cccS†“3–3†fC–#S“SCc#ƒC3–#““6FfÖF6†W2fÆ–FFVBÆö6ÂVFcv6cBG&VRà¤ÆÃCBWÆöFVB&Æö"†6†W2fW&–f–VB&Vf÷&RW‡V7FVBÖÖ–âÂæöâÖf÷&6VB&VbWFFRà¤v—D‡V"vW3CS#sC#3"6ö×ÆWFVB5T44U52âV–v‡Bg&W6‚V&Æ–2f–ÆW2'—FRÖÖF6ƒ §fW'6–öâæ§6öâÆ–æFW‚æ‡FÖÂÆæF—fRÖFW&–ÂÆâÅUb–ÖvR÷fW&Æ’ÆG&vW"öf6RÖÆ–÷W@¦6æöæ–6ÂÆöFW"6†–âÆ–âÖFW7BÆ—7BæBF÷væÆöF&ÆRäôÒG&ç6f÷&Ò6×ÆRà¤gVÆÂÆö6Ã3Cb52ód”Âó6¶—ó6æ6VÂƒ#Bã#72“²f–æÃRG&ç6f÷&Ò÷&VÆV6Rö66†Rð¦–FVçF—G’6†V6·252gFW"F†R&VçB–âÖöæÇ’6÷'&V7F–öââ†÷7FVBF÷öÆöw“CS#sC3s0§v2–å÷&öw&W72B&ööbF–ÖS²æò†÷7FVBgVÆÂ52÷"æF—fRuR66WFæ6R6Æ–ÖVBà¤æògVæ7F–öæÂ'VçF–ÖR÷FW7B6†ævW2gFW"F†RgVÆÂ7V—FR7F'FVBâF†—2V&Æ–6F–öà§&ööb—2Fö72ÖöæÇ“²'VçF–ÖRæB76WB6öçG&7B&VÖ–â'—FRÖ–FVçF–6Âà ¤'V–ÆBã3Ä•dRò$TE’dõ"DU5D”ärâW6W"ã#’52&÷FV7FVBâDUd”4S3–×÷'@§6×ÆRÆ6ö×&R÷&–v–æÂööfg6WB÷6–FWv—2&WVFVB'&÷r–â&÷„Æ"æBæöÖC°¥7GVF–òõ6öÆ–Bö÷&&—BÄÖ÷fUVæFõ&VFòÆÆöö·2ö&6²Å6fT÷Vâæ&÷†Æ"ÄäôÔBôæöÖBâ66WFV@¦6öÆ÷W"ÖÇ†#’6×ÆRVæ6†ævVBâæW‡BföÆÆ÷ræF—fRFW‡GW&R×G&ç6f÷&ÒfVVF&6³°§G&—Ææ"öF—7Æ6VÖVçBæBF†V—"W&f÷&Öæ6RvFW2&VÖ–â6W&FVÇ’FVfW'&VBà ¢22ã3(	BæF—fRäôÒ–ÖvW2–âF†RW†—7F–ærUbVF—F÷"(	B3ö7Fö&W"##` ¥W6W"ã352öæW‡F'V–ÆB&÷FV7G2W"ÖÖUbG&ç6ÆF–öâ÷&÷FF–öâÂ66WFV@¦æF—fR%"öÇ†ö÷6—G’÷&WFVçF–öâæB&÷VæBG&—2â&6VÆ–æRÖ–âf6VV3fVð§'VçF–ÖR6cFVFRâ†÷7FVBã3&Vw&W76–öãCS#sC3s2æ÷r6ö×ÆWFVB5T44U52à¤7W'&VçBçVÖ&W&VB&VÆV6Rã3²fÆ–FF–öâ÷V&Æ–6F–öâföÆÆ÷w2&VÆ÷rà ¤VF—C¢Ubv÷&·76Rw2÷&–v–æÂ–ÖvR'WGFöâöG&÷F÷vâö6öçG&öÆÆW"ö6çf2öæÇ§&W6öÇfVBtÄ"&W6÷W&6W2âæF—fRäôÒÖFW&–Ç2Ç&VG’&WF–âVæ6öFVBÖ2æB†fP£4B&Wf–Wr÷væW'3²&V6öææV7BF†R÷&–v–æÂf–WvW"&F†W"F†âFBæ÷F†W"–ç7V7F÷"à¤W†—7F–ær–×÷'FVEUd–ÖvT6†ö–6W2æ÷r&W6öÇfW2æF—fR&W6÷W&6W2f–÷&–v–æÀ¦æöÖDÖFW&–ÄÖ2fÆ–FF–öââv÷&·76R&WVW7G26öÆ÷W"Âæ÷&ÖÂÂVÖ—76—fRÀ¥&÷Vv†æW72ÂÖWFÆæW72Â÷6—G’æBF—7Æ6VÖVçBâV6‚÷F–öâW6W27GVÂ6Æ÷BöæÖP¦æB÷&–v–æÂ'—FW3²æF—fR6W&FR66Æ"–ÖvW2†fRäò–æfW'&VBtÄ"rô"6†ææVÂà¤FVfVÇB6ÆÆW'27F’6öÆ÷W"ÖöæÇ“²tÄ"Ö&W6öÇWF–öâ÷6¶VBÖ6†ææVÂöÆ–7’Væ6†ævVBà ¥F†—2—2$r–ÖvR–ç7V7F–öâ–âF–ÆS(	3âW‡Æ–6—BæF—fR7FGW26—2–ç7V7F–öà¦öæÇ’æBÖFW&–ÂÖ–æræ÷BÆ–VC¢æòF–Æ–ær÷&÷FF–öâöf7F÷'2&¶VB†W&RÂæð£4BF—7Æ6VÖVçB7W÷'B–×Æ–VBâärô¥Tr6–væGW&RôÔ”ÔRæB„Ö”"FVfVÇB6÷W&6P¦&÷VæG2&VÖ–ã²÷&–v–æÂFV6öFW"62f—7VÂ÷WGWBC#G7V&Râ6—‡FVVâÖ&—B6÷W&6P¦—2&WF–æVBVæ6†ævVBFW7—FRF†R&÷VæFVB'&÷w6W"–ÖvR&Wf–Wrâ–çfÆ–B&W6÷W&6W0§&WGW&âæò6†ö–6W3²–çfÆ–B÷Vç7W÷'FVB–ÖvR÷"÷fW'6—¦RöÖ—G2F†B&VfW&Væ6RöæÇ’à¥6fR÷F–öâçFW‡D6öçFVçBÂ÷&–v–æÂ6VÆV7F–öâ÷â÷¦ööÒÂ&VBÖöæÇ’æF—fRUb6öçG&öÇ2À§6W&–ÂvVæW&F–öâ6æ6VÆÆF–öâÂÆFR&—FÖ&VÆV6RÂ&V÷Vâ÷&W6WBæB6÷W&6Rö†—7F÷'§&VÖ–ââæò&r×ö–çFW"÷&VæFW&–æröÖöFVÆÆ–ærõUböW‡÷'B¶W&æVÂ÷"66†VÖ6†ævW2à ¤f—fRæWr&VÂÖ÷væW"FW7G26÷fW"ÆÃrW†7B&VfW&Væ6W2öæÖR6fWG’ö'VFvWG2ôÔ”ÔRÀ¦æòÖ6öÆ÷W"–çWBÂÆFR7v—F6‚ö6Æ÷6Röf–ÆVBFV6öFRÂ7GVÂ&VFöæÇ’Ubv÷&·76P¦'WGFöç2ö6çf2æBW†7BööÆVBö–æÆ–æR6fT÷VâöæF—fRäôÒ&÷VæGG&—÷6×ÆR'—FW2à£s’fö7W6VB52ód”Âó6¶—–æ6Â66WFVBæF—fS3ó#^(	3#’ÂtÄ"–ÖvR÷7W&f6Rð§6¶VB66Æ"÷v÷&·76R÷&VÆV6R6†V6·2âgVÆÂÆö6ÂæöFS#Bã#"ã7V—FS£3S52ód”Âó6¶—ó6æ6VÂƒ#ãCw2’âæò'VçF–ÖR÷FW7BVF—G2gFW"gVÆÂ×7V—FR7F'BâV&Æ–6F–öâfW&–f–VB–âFö72÷V&Æ–6F–öâÓ3æÖC²æòæF—fR'&÷w6W"ôuRV&æ6R66WFæ6R–æfW'&VBâ&WfW'6R66†Rw&‚æB6æöæ–6À§&VÆV6R–ç2&Wf–WvVC²&VçB6†ævW2&R–âÖöæÇ’âÖ–âô×VÇF“ãög&÷¦Vâ&WF2À£3ÖFW&–ÂÆâæB7GVÃ4B÷6†F÷r–×ÆVÖVçFF–öç2Væ6†ævVBà ¤vVæW&–26×ÆRFö72÷6×ÆW2ôäôÕôÔô”å5T5D”ôåó3ææöÒ—2öæR7V&Rv—F‚ÆÃrÖ2À¦–æ6ÇVF–ærbÖ&—BG&—Ææ"F—7Æ6VÖVçB&WF–æVBf÷"–ç7V7F–öâöW‡÷'Bâ–âÖFW7@¦Æ—7BWFFVC²&–÷"ã3&F–æw2&WF–æVBÂæòæWrô"&F6‚à¤DUd”4S3–×÷'B6×ÆRÓâö&¦V7B&F–ÂUbÓâUbVF—F÷"Óâ–ÖvS²6†ö÷6RÆÃp¦–ÖvW2ââ÷¦ööÒæB7v—F6ƒ²&6²Fó4Bô6Æ÷6R÷&V÷Vã²6fT÷Vâæ&÷†Æ"æBäôÔB¶VW ¦Ö2â&WFW7B66WFVC3f–Ww÷'B6×ÆR–b6öçfVæ–VçBâæW‡BæF—fRf–WvW"fVVF&6²À§F†VâVF—B7W÷'FVB%"ÖFW&–Ç2Æ6¶–ær6öÆ÷W"FW‡GW&S²7V&F—f—6–öâöF—7Æ6VÖVç@§7F–ÆÂæVVG2—G26W&FR&÷VæFVBW&f÷&Öæ6Rö&Væ6†Ö&²FV6—6–öâà ¢22ã3V&Æ–6F–öâfW&–f–VB(	B3ö7Fö&W"##` ¥'VçF–ÖSƒS&CcCSS##cs6cvc#vc3ƒC&3CV36c†#6FC²fWF6†VB÷&–v–âöÖ–âG&VP£†3cs3c3SVcfS–Vcs#cƒ6&VcV3VfVS“3cFVBWVÇ2fÆ–FFVBÆö6Ãf&†VS“‚G&VRà¤ÆÃ#R6†ævVB&Æö'2†6‚×fW&–f–VB&Vf÷&RW‡V7FVBÖÖ–âöæöâÖf÷&6VBWFFRà¥vW3CSƒsSƒƒ6ö×ÆWFVB5T44U52ã’ó’g&W6‚Æ—fR'—FRÖF6†W3¢6†VÆÂöÖæ–fW7BÀ¥Ub–ÖvR&W6öÇfW"÷v÷&·76RÄÖW6‚†VÇF‚ÇFW7BÆ—7BÆG&vW"ÇVæ6†ævVBæF—fRÖFW&–À§ÆâæB6×ÆRäôÒƒsBÃ3“f'—FW3²&WG'’gFW"öæRG&ç6–VçCS2’à¤gVÆÂÆö6ÂæöFS#Bã#"ã£3S52ód”Âó6¶—ó6æ6VÂƒ#ãCw2’Âfö7W6VCs•52à¤æò'VçF–ÖR÷FW7BVF—G2gFW"gVÆÂ×7V—FR7F'Bâ†÷7FVBF÷öÆöw“CSƒsSs‚v0¦–å÷&öw&W72B&ööc²æò†÷7FVBgVÆÂ526Æ–ÖVBâæF—fRV&æ6RvFRVæF–ærà¥F†—2&ööb—2Fö7VÖVçFF–öâÖöæÇ“²'VçF–ÖRö6öçG&7B7F’W†7FÇ’fÆ–FFVBà ¤'V–ÆBã3Ä•dRò$TE’dõ"DU5D”ärâW6W"ã352&÷FV7FVBâ–âö&¦V7BÖöFP§6VÆV7B6×ÆR7V&RÓâ&F–ÂUbÓâUbVF—F÷"Óâ–ÖvRÓâ–ç7V7CræÖVBÖ2à¥&r–ÖvR&VfW&Væ6W2ÂæòÖFW&–ÂG&ç6f÷&×2öf7F÷'3²F—7Æ6VÖVçB–ç7V7F–öâöæÇ’à¥â÷¦ööÒ÷7v—F6‚Ä&6²Fó4Bô6Æ÷6R÷&V÷Vã²6fT÷Vâæ&÷†Æ"æBäôÔB&W6W'fRÖ2à¤æW‡BæF—fRf–WvW"fVVF&6²F†VâVF—BæòÖ6öÆ÷W"ÖÖÖFW&–Â&Wf–Ws²&÷VæFV@§7V&F—f—6–öâöF—7Æ6VÖVçBæB&Væ6†Ö&²FV6—6–öâ&VÖ–âFVfW'&VBà ¢22ã3"(	Bd”Ur7F'GW&W—"æB6WfVâÖö&¦V7B&WFW7B(	B3ö7Fö&W"##` ¥W6W"ã3d”Ã¢(	Ãrö&¦V7G2F–Bæ÷BÆöN(	ÒæBd”UrÖöFW2(	Ç6VVÒFò†fR&VVà§&VÖ÷fVBâ$”rd”Î(	Òâ7F÷fVGW&R&öÆÆ÷WC²ã3&VÖ–ç2F†RÆ7B66WFVB'V–ÆBà¤&6VÆ–æRÖ–ã3†Scs‚÷'VçF–ÖSƒS&CcBâF†Rã36×ÆR5ETÄÅ’6öçF–ç2ôäR7V&P§v—F‚6WfVâÖ2Âæ÷B6WfVâö&¦V7G2âæò–×÷'FW"ö&¦V7BÖÆ÷72&W&öGV7F–öâf÷VæC°§&WÆ6RVæ6ÆV"&WFW7Bv—F‚âW‡Æ–6—B6WfVâÖö&¦V7Bf—‡GW&R–ç7FVBöb&WFVæF–æp§F†R÷&–v–æÂf–ÆR6öçF–æVB6WfVââ¶VWã3f–ÆVB÷VæF–ærFWf–6RvFRf—6–&ÆRà ¥d”Ur6÷W&6Rö'WGFöç2vW&Ræ÷B–çFVçF–öæÆÇ’&VÖ÷fVBâ6Æ÷VB'&÷w6W"öâÆ—fS3§6†÷w2ÆÃ"Æöö²6öçG&öÇ2Â'WB6Æ÷VBvV$tÂ—2F—6&ÆVBÂ6òF†—2FöW2äõB&VgWFP¦æF—fRfVVF&6²÷"&÷fRuR÷W&F–öââ6öæ7&WFR÷væW"fÆr&W&öGV6VC¢–ç7FÆÅT§W6W2†÷7Bæ–ææW$…DÔÂÂFVÆWF–ær6f—G’õ6–Æ†÷VWGFR–bF†V—"–æFWVæFVçB÷væW'2'Và¦f—'7C²FF6WBç&VG’Ç6ò&WfVçG2&W7F÷&–ærâV×F–VB†÷7BâGvòæWr&VÂÖ÷væW ¤DôÒFW7G2d”Âv–ç7C36÷W&6RæB52gFW"&W—"âW†7B•Bv†öÆRÖÖVçP¦f–ÇW&R6W6R&VÖ–ç2Vç&÷fVã²æò7V7VÆF—fR552ö6ö×÷6—F÷"÷"66†RF–væ÷6—2à ¤÷&–v–æÂ&VæFW"ÖÖöFW2–ç7FÆÆW"æ÷rFG2öæÇ’Ö—76–ær&6R'WGFöç2g&öÒ—G26ÖP£Ö'WGFöâFV×ÆFRÂ&W6W'f–ærW†—7F–ær6f—G’õ6–Æ†÷VWGFRæöFW2öÆ—7FVæW'2âW"Ö†÷7@¦FVÆVvF–öâ&–æG2ôä4RâæF—fRd”Ur÷Vâ&R×'Vç2F†—2–FV×÷FVçB–ç7FÆÆW"Â&W7F÷&–æp¦Ö—76–ærö6ÆV&VB&6R6öçG&öÇ2v—F†÷WBöÆÆ–ærÂæWr&VæFW"Væv–æR÷"vVöÖWG'’6†ævW2à¤÷&–v–æÂf6Vw&÷W6öçG&öÇ2æB7GVÂ6WDÖöFR7F–öç2&WF–æVBâæò6†FW"öÆ–v‡Bð¦ÖFW&–Â÷6VÆV7F–öâö†—7F÷'’ö–çWBô552ög&÷¦VâöÖ–âô×VÇF’–×ÆVÖVçFF–öâ6†ævW2à ¤æF—fR&rÖ–ÖvR–ç7V7F–öâFFW"Ö÷fVBõUBöb6†&VBWbÖ–ÖvR×&Wf–Wr–çFð§v÷&·76RÖöæÇ’æöÖB×WbÖ–ÖvRÖ6†ö–6W2â6†&VB–ÖvR6öçG&öÆÆW"&V6V—fW2—G2&W6öÇfW ¦2â÷F–öã²tÄ"ó4BF‡2&WF–â÷&–v–æÂ&W6öÇfW"æBFV6öFW"âF†—2&VÖ÷fW2F†P¦–ç7V7F–öâFWVæFVæ7’g&öÒF†R&VæFW"ÖÖöFRw&ƒ²äõB6Æ–ÒF†B—B6W6VBF†P§&W÷'FVBf–ÇW&RâW†—7F–æs36WfVâ×6Æ÷Bö'—FRóbÖ&—Bö6æ6VÂõUb&VBÖöæÇ’FW7G27F¦7F—fRF‡&÷Vv‚F†R÷&–v–æÂv÷&·76RFFW"âæòGWÆ–6FRFV6öFW"÷"–ÖvRööÂà ¤æWrFö72÷6×ÆW2ôäôÕõ4UdTåôô$¤T5E5ó3"ææöÓ¢4UdTâ–æFWVæFVçB7V&W2–âGvò&÷w2À¦æÖVC6öÆ÷W"Ã"æ÷&ÖÂÃ2VÖ—76—fRÃB&÷Vv†æW72ÃRÖWFÆæW72Ãb÷6—G’À£rF—7Æ6VÖVçBâV6‚6öçF–ç2ôäRW†7B&rÖ&VfW&Væ6Rf÷"Ub–ÖvR–ç7V7F–öâà¤æöâÖ6öÆ÷W"7V&W2Ö’†fR÷&F–æ'’6öÆ–B4B6†F–æs²F†—2—2ÆöF–ærö–ç7V7F–öà¦f—‡GW&RÂæ÷B6Æ–ÒöbæòÖ6öÆ÷W"ÖÖ%"÷"F—7Æ6VÖVçB&VæFW&–ær7W÷'Bà¤7GVÂf–ÆRF—7F6†W"Óæf—BÓæÖævW"FG2ÆÃs²6†V6¶VB6×ÆRÖF6†W2vVæW&F÷"à¤W†—7F–æs3öæRÖ7V&Rf—‡GW&R&VÖ–ç2&W&öGV6–&ÆS²Fòæ÷B÷fW'w&—FR—B6–ÆVçFÇ’à £ƒRfö7W6VB52ód”Âó6¶—Â–æ6ÇVF–æsBæWr&Vw&W76–öç2Â7GVÂ–×÷'FVCræ@§v÷&·76Rõd”UröæF—fRôtÄ"÷&VÆV6R&÷FV7F–öââ&Wf–WvVB&WfW'6RÖÆöFW"–ç33"æ@¦6æöæ–6Â&V6÷fW'’6†–ã²÷F†W"'VçF–ÖR¥2VF—G2&R–ç2öæÇ’âgVÆÂÆö6ÂæöFS#Bã#"ã£3SR52ód”Âó6¶—ó6æ6VÂƒrãg2’âæò'VçF–ÖR÷FW7BVF—G2gFW"gVÆÂ×7V—FR7F'BâV&Æ–6F–öâ&ööbföÆÆ÷w3²æF—fRã3"66WFæ6R—2æ÷B–æfW'&VBà¤–âÖFW7BÆ—7BW‡Æ–6—FÇ’F—7F–æwV—6†W26WfVâô$¤T5E2g&öÒ6WfVâÔ2à¤DUd”4S3"f—'7B÷Våd”Ur&Vf÷&R–×÷'C¢ÆÃ"Æöö·2–æ6ÇVF–ær6f—G’õ6–Æ†÷VWGFS°¥7GVF–òÓå6öÆ–BÓå7GVF–òæB6Æ÷6R÷&V÷Vââ–×÷'BæWr6×ÆS¢6WfVâæÖVB7V&W3°§6VÆV7B7V&RÄö&¦V7B&F–ÅUbÓåUbVF—F÷"Óä–ÖvRFò6VR—G2ôäRÖÄ&6µFó4Bô6Æ÷6RÀ§&V6†V6µd”Urâ÷&&—BõVæFõ&VFòæB66WFVC3G&ç6f÷&Ò6×ÆR6æ—G’à¤æW‡BôäÅ’FWf–6R&W—"fVVF&6³²FVfW"æWræF—fRÖFW&–Â÷W&f÷&Öæ6RfVGW&W2à ¢22ã3"f—‡GW&Rf—6–&–Æ—G’æB7&÷72ÔæöFR4’6÷'&V7F–öâ(	B3ö7Fö&W"##` ¤f–æÂFVÖò6†V6²f÷VæBf÷W"6VçG&Â6ÖÆÂ7V&W26÷VÆB6—B–ç6–FRF†R7F'GW6—¦S¦7V&RgFW"÷&–v–æÃ"×Væ—B–×÷'Bf—GF–ærâ–æ7&V6RF†RGvò×&÷r76–æs²7GVÂf–ÆP¦–×÷'BFW7Bæ÷r&WV—&W2WfW'’–×÷'FVB7V&RFòÆ–R6ÆV"öb7F'GW7V&R–â¢à¤æòÆ–6F–öâ–×÷'Böf—B÷6÷W&6R×÷6—F–öâöÆ–7’6†ævVBâ6WfVâÖö&¦V7B6×ÆR7F—0£“ÃSƒ†'—FW2æB¶VW2÷&–v–æÂÖ'—FW2âæWr6×ÆRÆ6VÖVçB—2'Böbã3"&WFW7Bà ¤†÷7FVCCCc3c#3“Bf–ÆVBâÆörFööÂ&WVFVFÇ’6Æ÷6VBG&ç7÷'Bâ&W&öGV6VBÆö6ÆÇ§v—F‚W†7B4’æöFS#"ã#2ãC£3S552ó$d”Ã²&÷F‚f–ÇW&W2vW&Rg&W6†Ç’6ö×&W76VBäp¦'—FR6ö×&—6öç2v–ç7B6†V6¶VBÖ–âFVÖòf–ÆW2âæöFS#"æC#B6ö×&W76–öå7G&VÐ§&öGV6RF–ffW&VçBfÆ–B¦Æ–"'—FW2âæWrFW7B†VÇW"–æFWVæFVçFÇ’'6W2&÷F‚äô×2À¦6†V6·2W†7BæÖW2övVöÖWG'’õUböÖFW&–Â&–æF–æw2Âär5$2öF–ÖVç6–öç2÷G—Rö6‡Væ·2ð¦f–ÇFW'2æBFV6öFVB$t$²Æ—FW&ÃbÖ&—BF—7Æ6VÖVçB&VÖ–ç2'—FRÖW†7BâW†—7F–æp§ööÆVBö–æÆ–æR6fT÷VâôäôÒ4õU$4RÔ%•DR&÷VæB×G&—76W'F–öç2&RVæ6†ævVBâ7GVÀ¦6†V6¶VBÖ–â6WfVâÖö&¦V7Bf–ÆRæ÷rvöW2F‡&÷Vv‚&VÂf–ÆRF—7F6†W"–âF†RFW7Bà¤&÷F‚ffV7FVBf—‡GW&W3£e52ód”ÂöâæöFS#"äBæöFS#BgFW"6÷'&V7F–öââgVÆÂf–æÀ¤æöFS#"æB†÷7FVB&W'VâVæF–ærâÆ–6F–öâ¥2&VÖ–ç2'—FRÖ–FVçF–6ÂFócsCƒ#†CRà ¢22ã3"V&Æ–6F–öâæBf–æÂ&WFW7B&ööb(	B3ö7Fö&W"##` ¤Æ–6F–öâ'VçF–ÖScsCƒ#†CSVSVF#6Cfƒvf6cFcFffc“FFSCs“–÷G&VSC“v#&BÖF6†V@§fÆ–FFVBÆö6ÃFCcƒc62G&VS³#’WÆöFVB&Æö'2fW&–f–VBâf–æÂ6×ÆR÷FW7B6÷'&V7F–öà¦#s3ƒ†VC6FVVV3#ƒƒ3†Sf33–36#6FS†V#÷G&VV#ccvcsCÖF6†VBfÆ–FFVBÆö6Ãƒfcf&SRà¤Æ–6F–öâ¥2&VÖ–ç2'—FRÖ–FVçF–6ÂFócsCƒ#†CRâf–æÂ6×ÆR&Æö# £F–fCC–cCcƒCƒv&C“6“ƒScƒ3†&3fV6&Bƒ“ÃSƒ†'—FW2’â76VB&÷w2¶VWWfW'’7V&P¦6ÆV"öb6—¦S7F'GW7V&ReDU"÷&–v–æÃ"×Væ—B–×÷'Bf—C²7GVÂf–ÆRFW7B76W'G0§F†B6W&F–öâf÷"ÆÃrâ–×÷'BDE26WfVâæÖVB7V&W3²âW†—7F–ær7V&RÖ’&VÖ–âà ¥vW3CCscƒƒ“"5T44U52âÆÃ‚6†V6¶VBV&Æ–2F‡2ÖF6‚f–æÂ÷6×ÆR6öçFVçC §6†VÆÂöÖæ–fW7BÇ&VæFW"÷væW"Ç6†&VB–ÖvR&W6öÇfW"ÅUbv÷&·76RÆæF—fRFFW"ÇFW7@¦Æ—7BæBf–æÂ76VB6×ÆR‡6×ÆR&V6†V6¶VBgFW"f–æÂFWÆ÷–ÖVçB’âÆ—fR6Æ÷V@¤DôÓ¢F—FÆS3"ÆÆÃ"Æöö·2–æ6ÇVF–ær6f—G’õ6–Æ†÷VWGFRÅ7GVF–òÓå6öÆ–BÓå7GVF–ò7FGW2À¦6Æ÷6R÷&V÷Vâ&WF–ç2Æ—7Bâ6Æ÷VBvV$tÂ&VÖ–ç2F—6&ÆVC²67&VVç6†÷B’F–ÖVB÷WBà¥F†—2—2T’ôDôÒ7F—fF–öâWf–FVæ6RÂæ÷BuRö•B—†VÂ÷"ÖFW&–Â66WFæ6Rà ¤gVÆÂæöFS#Bã#"ã£3SU52ód”Âó6¶—ó6æ6VÂƒrãCG2’Âf–æÂf—‡GW&RÖöæÇ“e52à¤gVÆÂf–æÂ4’ÖÖF6†–æræöFS#"ã#2ãC£3SU52ód”Âó6¶—ó6æ6VÂƒã‡2’à¤öÆB†÷7FVCCCc3c#3“Bf–ÆVBöâF†RGvò7&÷72ÔæöFR6ö×&W76VBÖFVÖòÖ'—FR6ö×&—6öç3°§&W&öGV6VC3S552ó$d”ÂöâæöFS#"â&WÆ6VBôäÅ’FVÖòÖWV—fÆVæ6R76W'F–öç2v—F€¦–æFWVæFVçBW†7BvVöÖWG'’õUböÖFW&–Â&–æF–æw2Ä5$2õär—†VÇ2æBÆ—FW&ÃbÖ&—@¦'—FW2â&öGV7F–öâ6÷W&6RÖ'—FR&÷VæB×G&—76W'F–öç27F’Væ6†ævVBâ6÷'&V7FVB†÷7FV@§&W'VãCCscƒ“sRv2–å÷&öw&W72BF†—2&ööc²—G2f–æÂ&W7VÇB—2&V6÷&FVB–à¦Fö72÷V&Æ–6F–öâÓ3"Ö6’æÖFâFòæ÷B6—FRF†R7WW'6VFVBf–ÆVB'Vâ27W'&VçB4’à ¤v—D‡V"WÆöB÷&VbW'&÷'2vW&RG&ç6–VçC¢&WWÆöFVBGvò÷'†â&Æö'2ÇfW&–f–VBW†7@§G&VS²$U5BÖ7&VFVB6÷'&V7F–öâ6öÖÖ—Bv2–æ—F–ÆÇ’Væf–Æ&ÆRFòw&…Â&VbWFFRà¤æ6†÷&VB—Bf–&W—"ó3"Öf—‡GW&R×fÆ–FF–öâÇF†VâW‡V7FVBÖÖ–âæöâÖf÷&6VBWFFP§7V66VVFVBâ¶VWF†—2&V6÷fW'’&VfW&Væ6S²æòf÷&6RW6‚÷"W&Ö—76–öâ'—72W6VBà ¤'V–ÆBã3"Ä•dRò$TE’dõ"äD•dR$UDU5Böæ6Rf–æÂ†÷7FVB&W7VÇB&VÆ÷r—26†V6¶VBà¢ã3W6W"d”Â&VÖ–ç2&V6÷&FVC²ã3—2Æ7BW6W"Ö66WFVB'V–ÆBâæòã3"50¦–æfW'&VBâDUd”4S¢d”UrÆÃ"&Vf÷&R–×÷'BÅ7GVF–òõ6öÆ–B÷&V÷Vã²–×÷'Bd”äÂ6×ÆP£6öÆ÷W"F‡&÷VvƒtF—7Æ6VÖVçC²6VÆV7B7V&RÇ&F–ÅUbÓåUbVF—F÷"Óä–ÖvR6†÷w2—G0¤ôäR&rÖ´&6µFó4Bô6Æ÷6RæB&V6†V6µd”UrâW†7B÷&–v–æÂ•Bv†öÆRÖÖVçRf–ÇW&P¦6W6R&VÖ–ç2Vç&÷fVã²&W—&VBFWFW&Ö–æ—7F–2÷fW'w&—FR÷&VG’Ö†÷7BFVfV7G26÷fW&VBà¤æòæWrfVGW&Rv÷&²VçF–Â&W—"fVVF&6²à ¢22ã3"W6W"52(	BÆöF–ærõd”Ur66WFVC²ÖFW&–Âv2ö'6W'fVB(	B3ö7Fö&W"##` ¥W6W"W‡Æ–6—FÇ“¢(	Ã3"52âÆÂr7V&W2f—6–&ÆRÂæò&ö&ÆV×2v—F‚f–WrÖöFP¦F—6V&–ærî(	Ò&÷FV7B6WfVâÖö&¦V7Bf—6–&–Æ—G’÷76–ærÂd”Ur7F'GW&W6W'fF–öâÀ¦ÆÂ÷&–v–æÂÖöFR7F–öç2÷&V÷VâæBã366WFVB&V†f–÷W"âF†—2—2äõBæF—fP§7FæFÆöæRÕ%"öF—7Æ6VÖVçBö÷VRÖ6öÆ÷W"ÖÇ†66WFæ6RâæòæWr'V–ÆBF†—2WFFRà ¥W6W"67&VVç6†÷G3¢&÷„Æ"6†÷w2öæÇ’6öÆ÷W"7V&RFW‡GW&VBÂ÷F†W"6—‚Æ–ââæöÖ@§6†÷w2æ÷&ÖÂôVÖ—76—fR÷66Æ"ô÷6—G’ôF—7Æ6VÖVçBVffV7G3²6öÆ÷W"7V&R6öÆ–B7–âà¥6÷W&6RVF—B6öæf—&×2æF—fRæöÖD6öÆ÷W%7W&f6U6÷W&6R&WGW&ç2çVÆÂv—F†÷WB6öÆ÷#°¦æöÖE%%7W&f6U6÷W&6W2æB÷&–v–æÂUb÷fW&Æ’6öç6WVVçFÇ’6ææ÷B7F—fFR÷F†W ¦Ö2'’F†V×6VÇfW2â6WfVâÖö&¦V7Bf—‡GW&R–çFVçF–öæÆÇ’76–vç2W†7FÇ’öæR6Æ÷@§W"7V&RâF†W&Vf÷&RF†—2W‡÷6W2F†R&VÖ–æ–æræòÖ6öÆ÷W"ÖÖf–Ww÷'BFWVæFVæ7“°§&WF–æVBÖ2vW&Ræ÷BÆ÷7BâW‡FVæBF†R4ÔR&W6÷W&6RöÖFW&–Â÷fW&Æ’÷væW'2f÷ §7W÷'FVBæ÷&ÖÂöVÖ—76—fR÷&÷Vv†æW72öÖWFÆæW72ö÷6—G’v—F†÷WB&WV—&–ær6öÆ÷"Öà¤F—7Æ6VÖVçB&VÖ–ç26W&FVÇ’FVfW'&VB&V†–æB7V&F—f—6–öâ÷W&f÷&Öæ6RvFW2à ¤–×÷'FçBf—‡GW&Rf–æF–æs¢6öÆ÷W"är—3#‡ƒ#‚v—F‚U„5DÅ’ôäR$t"fÇVP¥³SRÃsRÃ##ÒÂæBÇ†ó#SR6†V6¶W"âWfW'’f—‡GW&RÖFW&–Â†2W6Uö6öÆ÷%ö÷6—G“Óà¤æöÖBw2Væ–f÷&Ò7–â—2W‡V7FVC¢F†R6†V6¶W"—2Å„Âæ÷B6öÆ÷W"GFW&ââFð¦æ÷B6ÆÂF†—2Ö—76–ær6öÆ÷W"FW‡GW&R÷"6†ævRæöÖB&–æF–æw2&6VBöâV&æ6Rà¤&÷„Æ"w26†V6¶W"ö&Æ6²7V&W2FW7—FRÇ†ôdb—26W&FRF—67&Wæ7’âæF—fP§Æâ&WVW7G2Vç&V×VÇF—Æ–VB&—FÖ'WB'&÷w6W"FV6öFR÷&W6×Æ–ærÖ’Æ÷6R$t §VæFW"Ç†²W†7B6W6Ræ÷BfW&–f–VBöâ•BâFòæ÷B6Æ–Ò—Bf—†VBg&öÒÖö6¶V@¦&—FÖFW7Bâ–çfW7F–vFR÷&–v–æÂFV6öFW"Â¶VW6÷W&6R'—FW2Væ6†ævVBÂæBW6R§&VÂ÷VR$t"6öÆ÷W"Ö6†V6¶W"–âF†RæW‡B6ö×&—6öâf—‡GW&RFòfö–BÖ&–wV—G’à ¥7FGW3¢7W'&VçBÄ•dS3#²W‡Æ–6—BÆöF–ærõd”Ur52&÷FV7FVBâÖFW&–Âf–Ww÷'@¦væBÇ†ôdb6öÆ÷W"F—67&Wæ7’õTââæò'VçF–ÖRö6öFRöæWr'V–ÆBF†—2WFFRà¤æW‡B66÷VB'V–ÆC¢VF—BæòÖ6öÆ÷W"æF—fR&6RÖFW&–ÂF‚Â&W6W'fR66WFV@£3"T’ÂFBÖVæ–ævgVÂW"Ö6†ææVÂ6×ÆRæB7GVÂ÷væW"6÷fW&vS²–çfW7F–vFP¦Ç†ôdb6öÆ÷W"6W&FVÇ’Â&WF–æ–ærF—7Æ6VÖVçB2–ç7V7F–öâöW‡÷'BÖöæÇ’à¥÷76–&ÆR6†V6·2æ÷s¢UbVF—F÷"–ÖvRöâæ÷&ÖÂô÷6—G’ôF—7Æ6VÖVçB7V&W26öæf—&×0§&WF–æVB&VfW&Væ6W3²æò&WVFVBÆöF–ærõd”Ur&Vw&W76–öâFW7B÷"&V–ç7FÆÂæVVFVBà ¢22ã32(	B7FæFÆöæRæF—fRÖFW&–ÂÖ2(	B3ö7Fö&W"##` ¤7W'&VçB'V–ÆC¢ã3bã‚ã32â&VçBÖ–ã¢6CsCF#c6fc3V6fVvSf#36f&Cƒ#S3cCVbà¥&WW6W2æöÖBÖÖFW&–Â×&W6÷W&6RæBWbÖ–ÖvR×7W&f6R×&Wf–Ws¢7GVF–òõ6öÆ–Bæ÷p¦66WBæ÷&ÖÂÂVÖ—76—fRÂ&÷Vv†æW72ÂÖWFÆæW72æB÷6—G’Ö2v—F†÷WB6öÆ÷W ¦–ÖvRÂW6–æræF—fR6öç7FçB6öÆ÷"‡v†—FRFVfVÇB’Â&÷Vv†æW72ã#RÂÖWFÆæW72à¤æòvVæW&FVB6öÆ÷W"FW‡GW&R÷"&ÆÆVÂ&VæFW&W"â–çfÆ–BW†—7F–ær6öÆ÷W"&–æF–æw2À§VæÆ—BÂVç7W÷'FVB&ö¦V7F–öç2öÖFW&–Ç2æBF—7Æ6VÖVçBÖöæÇ’¶VW&–÷"fÆÆ&6²à¤ÖÖöæÇ’÷fW&Æ’&WÆ6W2&öG’öæÇ’gFW"7V66W76gVÂFV6öFS²f–ÆVBöÆFRv÷&°§&VÆV6W2F†R÷&–v–æÂ÷væW"æB&W6W'fF–öââ6÷W&6R–ÖvW2õUg2öÖFW&–Ç2&VÖ–âW†7Bà ¥&÷FV7BW‡Æ–6—Bã3"W6W"53¢6WfVâÖ7V&Rf—6–&–Æ—G’÷76–æræBd”Ur7F&–Æ—G’à¤f÷W"6öÆ÷W"7W&f6W2&VÖ–â&÷FV7FVC²WFòV–v‡BÖÖöæÇ’7W&f6W26†&R÷&–v–æÀ¦vw&VvFR6V–Æ–æw3¢TÒFV6öFVB—†VÇ2Âƒ²Ub6÷&æW'2Â3$Ö”"Væ6öFVB6÷W&6W2à¥W"ÖÖÆ–Ö—G2Væ6†ævVBâ&VçBÆöFW"6†ævW2&R66†R×–âÖöæÇ’âÖ–âæ§2æ@¦×VÇF’Öö&¦V7B×G&ç6f÷&Ò&VÖ–âVçF÷V6†VC²æò'&öBT’6†ævW2à ¤g&W6‚6ö×&—6öã¢Fö72÷6×ÆW2ôäôÕõ5DäDÄôäUôÔ5ó32ææöÒâ6WfVâ–æFWVæFVç@¦æÖVB7V&W2Â6ÖR66WFVB76–æs²E%TR÷VR$t"6†V6¶W"f÷"6öÆ÷W"æ@¤VÖ—76—fRâã3"f—‡GW&R&VÖ–ç2–Ö×WF&ÆRâF—7Æ6VÖVçB7F—2&WFVçF–öâö–ç7V7F–öà¦öæÇ’ÂVæF–ær7V&F—f—6–öâ÷W&f÷&Öæ6Rv÷&²â÷&–v–æÂã3"Ç†Ôôdb7–âö&Æ6°¦&—FÖF—67&Wæ7’&VÖ–ç2õTâæB—2æ÷Bf—†VB'’F†RæWr6×ÆRà ¤†æG2ÖöâVæF–æs¢–×÷'BæWr6×ÆRÂfW&–g’ÆÂ6WfVâ7V&W2æB6—‚7W÷'FV@¦ÖFW&–Â6†ææVÇ2–â7GVF–òõ6öÆ–C²–ç7V7BvÆ÷72÷&VfÆV7F–öç2v†–ÆR÷&&—F–ærà¤6†V6²÷6—G’†öÆW2æB6†F÷w2Â7v—F6‚÷&V÷VâÆÂd”UrÖöFW2ÂÖ÷fRõVæFòõ&VFòÀ¥6fRô÷VâæBW‡÷'BäôÒâW6W"52&WV—&VBf÷"7GVÂ•BôuRV&æ6Rà¤æW‡C¢FG&W72Ç†Ôôdb&—FÖFV6öF–ær6W&FVÇ’gFW"F†—2ÖFW&–ÂfÆ–FF–öâà¥fÆ–FF–öã¢æöFS#"gVÆÂ7V—FR3S‚52Âd”Âƒ"ã#—2“²f–æÂFF—F–öæÂ'VFvWB6†V6²æBÆÂf÷W"ã32fö7W6VBFW7G252öâæöFS#"âW†—7F–ær3æF—fRÖFW&–ÂFW7G252âv—BF–fbÒÖ6†V6²6ÆVââ†÷7FVB4“CS“cƒS3‚æBvW3CS“csƒ35T44U53²Æ—fR'—FW2fW&–f–VBà ¥V&Æ–6F–öã¢Æ–6F–öâ6öÖÖ—B&&Sƒ“cSƒsf&Ff##“sCCcCS#6#6C–#fÀ§&Wf–WvVBG&VRƒSSFC#Sc†cfc3†#fV#Cƒ#V&6C3C3cC6#ÂfWF6†VBÖ–âfW&–f–VBà¥vW3CS“csƒ35T44U53²Æ—fRfW'6–öâ÷6†VÆÂöÖFW&–Âö÷fW&Æ’÷&VæFW"÷FW7BÖÆ—7Bæ@£“ÃS#‚Ö'—FR6×ÆRÆÂ'—FRÖ–FVçF–6Ââ6VRFö72÷V&Æ–6F–öâÓ32æÖBâ†÷7FV@¥F÷öÆöw’&Vw&W76–öãCS“cƒS3‚6ö×ÆWFVB5T44U52âã32Ä•dRæB$TE’dõ"DU5D”ärà¤ÖçVÂ•BV&æ6R66WFæ6R&VÖ–ç2VæF–æs²ã3"ÆöF–ærõd”Ur52&÷FV7FVBà ¢22ã32W6W"52&÷FV7FVB(	B3ö7Fö&W"##` ¥W6W"&WÆ–VB52gFW"ã327FæFÆöæRÖÖFW&–ÂFW7B'V–ÆBâ&÷FV7B66WFV@§7FæFÆöæRæ÷&ÖÂöVÖ—76—fR÷&÷Vv†æW72öÖWFÆæW72ö÷6—G’&Wf–WrF‡&÷Vv‚W†—7F–æp¦÷væW'2Â6—‚7W÷'FVBÖVB7V&W2Â6WfVâÖö&¦V7BÆöF–ærÂd”Ur7F&–Æ—G’æ@§&Wf–÷W266WFVB&V†f–÷W"âæòæWrÆ–6F–öâ'V–ÆB–âF†—2WFFRà¥F†—252FöW2æ÷B6Æ÷6RF†R6W&FVÇ’FVfW'&VBF—7Æ6VÖVçB&Wf–Wr÷"F†P¦÷&–v–æÂã3"Ç†Ôôdb6öÆ÷W"F—67&Wæ7’†æWrã326×ÆRW6W2÷VR$t"’à¤æW‡Bæ'&÷r'V–ÆC¢&W—"÷&–v–æÂÇ†Ôôdb6öÆ÷W"&—FÖFV6öFR÷&W6×Æ–ærÀ§&W6W'f–ær$t"&VæVF‚G&ç7&VçB—†VÇ2v—F†÷WB6†æv–ær&WF–æVB6÷W&6R'—FW2à¥F†VâVF—BF—7Æ6VÖVçB&Wf–Wr7V&F—f—6–öâ÷W&f÷&Öæ6RvFW2&Vf÷&R–×ÆVÖVçFF–öâà¤7W'&VçB7FGW3¢ã32Ä•dRÂW6W"53²v—F–æræW‡BöæW‡F'V–ÆBf÷"'VçF–ÖRv÷&²à¤÷F–öæÂ&Vw&W76–öã¢÷&–v–æÂã3"6öÆ÷W"7V&R6†÷VÆBWfVçGVÆÇ’&R6öÆ–B7–à§v—F‚6öÆ÷W"÷6—G’ôdc²Væ&Æ–ær÷6—G’6†÷VÆB&WfVÂ—G2Ç†6†V6¶W"à  ¢22ã3B(	BæF—fR6öÆ÷W"Ç†ôdb6†FW"6÷'&V7F–öâ(	B3ö7Fö&W"##` ¤7W'&VçB'VçF–ÖRF&vWC¢ã3bã‚ã3Bâ&VçBã32W6W"52—2&÷FV7FVBÀ¦–æ6ÇVF–ær7FæFÆöæR%"Ö2Â6WfVâÖö&¦V7B–×÷'BæBd”Ur7F&–Æ—G’à ¤VF—Bf÷VæBF†R&V6—6RÇ†ÔôdbFVfV7B–âF†RW†—7F–æræF—fRUb7W&f6R÷væW# §F†R$t"ÖöæÇ’Ö6†FW"†öö²v2–ç7FÆÆVBöæÇ’v†Vâ÷6—G”ÖöFR‚’&ââæF—fP¦6öÆ÷W"FW‡GW&Rv—F‚W6Uö6öÆ÷%ö÷6—G“ÖfÇ6RæBæò6W&FR÷6—G’ÖF†W&Vf÷&P¦fVÆÂF‡&÷Vv‚FòF‡&VRw2FVfVÇBF–fgW6T6öÆ÷"£Ò6×ÆVDF–fgW6T6öÆ÷"Â×VÇF—Ç––æp§F†R6öç7FçB7–â$t"'’F†R–ÖvRw26†V6¶W"Ç†æB&öGV6–ær&Æ6²7V&W2à¥F†R÷&–v–æÂ÷væW"æ÷r–ç7FÆÇ2F†R$t"ÖöæÇ’6†FW"†öö²f÷"WfW'’7W÷'FVBÆ—@¦æF—fR6öÆ÷W"7W&f6Rv—F‚6öÆ÷W"Ç†ôdbâ÷6—G”ÖöFR&WW6W2F†R6ÖR†öö²v†Và¦6W&FR÷6—G’Ööf7F÷"Ç6ò6öçG&öÇ2G&ç7&Væ7’âW‡Æ–6—B6öÆ÷W"Ç†ôà¦¶VW2F‡&VRw2÷&–v–æÂ$t$6×Æ–ærFƒ²÷6—G’ÂFWF‚×w&—FRÂ6†F÷ræB6÷W&6P¦'—FR&V†f–÷W"&R÷F†W'v—6RVæ6†ævVBâæòFV6öFW"&Ww&—FR÷"–ÖvR&RÖVæ6öF–ærà ¤æWr7GVÂÖ÷væW"FW7G26÷fW"Ç†ôdbv—F†÷WB6W&FR÷6—G’ÖæBW‡Æ–6—@¦Ç†ôâ&WF–æ–ær$t$â–âÖDU5BÄ•5BFG2F†R÷&–v–æÂ6ö×&—6öâf–ÆS ¦Fö72÷6×ÆW2ôäôÕô4ôÄõU%ôÅ„ó#’ææöÒ†ÆVgBÇ†ôâÂÖ–FFÆR6öÖ&–æVB÷6—G’À§&–v‡BÇ†ôdb’âW†—7F–ær6WfVâÖö&¦V7BæB7FæFÆöæRÖÖ6×ÆW2&VÖ–âVæ6†ævVBà¤F—7Æ6VÖVçB&VÖ–ç2–ç7V7F–öâ÷&WFVçF–öâöæÇ’à ¥fÆ–FF–öâ÷V&Æ–6F–öâ7FGW3¢6÷W&6R÷FW7B6†ævW26öÖÖ—GFVBFòÖ–ã²Æö6Â7V—FP¦æ÷Bf–Æ&ÆR–âF†—26öææV7FVB6W76–öââ†÷7FVB4’æBvW2öÆ—fR'—FRfW&–f–6F–öà¦&RVæF–æræB×W7B&R6†V6¶VB&Vf÷&R6ÆÆ–ærF†—2'V–ÆBgVÆÇ’&VÆV6VBà¤æF—fR•BôuRV&æ6R66WFæ6R—2VæF–ærà ¤DUd”4S3C¢–×÷'BäôÕô4ôÄõU%ôÅ„ó#’ææöÒ–â7GVF–òæB6öÆ–Bâ&–v‡B7V&R×W7B&P§6öÆ–B7–âv—F‚æò6†V6¶W"ö&Æ6²7V&W3²ÆVgB7V&R&WF–ç26†V6¶W"G&ç7&Væ7“°¦Ö–FFÆR&WF–ç26öÖ&–æVB6öÆ÷W"ÖÇ†ÇW26W&FR÷6—G’â7v—F6‚d”UrÖöFW2À¦÷&&—BÂ6VÆV7BôÖ÷fRõVæFõ&VFòÂæBfW&–g’&–÷"ã327FæFÆöæRÖÖ6×ÆR7F–ÆÂv÷&·2à¤æW‡C¢6öæf—&Òã3BÇ†&V†f–÷W"ÂF†Vâ6W&FVÇ’&Væ6†Ö&²F—7Æ6VÖVçB÷7V&F—f—6–öà¦&Vf÷&R–×ÆVÖVçFF–öââFòæ÷BföÆBF—7Æ6VÖVçB–çFòF†—26†FW"6÷'&V7F–öâà ¢22ã3R(	B&RÖFV6öFRæF—fR6öÆ÷W"Ç†ôdb&W—"(	B3ö7Fö&W"##` ¥U4U"ã3Bd”Ã¢67&VVç6†÷B6†÷w2&–v‡B7V&R7–âö&Æ6²6†V6¶W"öâf—6–&ÆRã3Bà¢ã327FæFÆöæRÖFW&–Â52&VÖ–ç2&÷FV7FVC²ã3B6†FW"ÖöæÇ’6Æ–Òv0¦–ç7Vff–6–VçBâF‡&VRÖög&vÖVçB×VÇF—Æ–W2$t"'’6×ÆVB$t"ÂæBÇ†'§6×ÆVBÇ†6ö×öæVçGv—6S²—BFöW2äõB—G6VÆb×VÇF—Ç’$t"'’6×ÆVBÇ†à¥6†FW"7G&–ærFW7G26ææ÷B&÷fR$t"7W'f—fVB'&÷w6W"ärFV6öFR÷&W6—¦Rà ¤W†—7F–ær7W&f6R÷væW"æ÷r76W2âW‡Æ–6—BÇ†ÔôdbfÆrFò—G2FVfVÇ@§7W&f6RFV6öFW"âW†—7F–æræöÖB×66Æ"×ær÷væW"Ö¶W2G&ç6–VçB÷VRäp¤$Tdõ$R7&VFT–ÖvT&—FÖ¢Væf–ÇFW'2÷&–v–æÂ—†VÇ2Â¶VW2÷&–v–æÂ$t"–æ6ÇVF–æp¦Ç†×¦W&ò—†VÇ2Â6WG2&Wf–WrÇ†#SRÂæB&V6ö×&W76W2â6†&VBtÄ"õUbFV6öFW ¦†2æòæF—fRFWVæFVæ7’âW‡Æ–6—BÇ†ôâæBW†–Æ–'’6†ææVÇ2¶VW÷&–v–æÀ¦FV6öF–æs²6÷W&6R'—FW2ÂÖFW&–ÂÖWFFFÂUg2Â6fRô÷VâôäôÒ&VÖ–âVæ6†ævVBà¤æò6÷W&6RFW‡GW&R&Ww&—FRÂ6çf2$t"&V6÷fW'’ÂæWr&VæFW&W"÷"ÖöFVÆÆ–ær¶W&æVÂà ¥7W÷'FVB&RÖFV6öFRFƒ¢æöæ–çFW&Æ6VB‚Ö&—B$t$öw&—66ÆRÖÇ†äs²E$å0§G&ç7&Væ7’7G&—VBf÷"÷F†W"æF—fRärG—W2â&öf–ÆW2ö6öÆ÷W"6‡Væ·2&WF–æVBà¤&÷VæG3¢Væ6öFVB6÷W&6Rö÷WGWC„Ö”"ÂF–ÖVç6–öç3#C‚æCDÒ6÷W&6R—†VÇ2Â–æfÆFR÷WGW@¦W†7BW‡V7FVB66æÆ–æRÆVæwFƒ²5$2÷G'Væ6F–öâöf–ÇFW"öæ–ÖF–öâóf&—BÖÇ†&VgW6Ç2à¥Vç7W÷'FVBÇ†Ôôdb6öçfW'6–öâ¶VW2÷&–v–æÂ&öG’fÆÆ&6²Âæò&Æ6²ÖÖwVW72à¤W†—7F–æruR&Wf–WrÆ–Ö—G2öÆ–fWF–ÖW2æBã327FæFÆöæR&W6W'fF–öâ&VÖ–â–çF7Bà ¥&Vw&W76–öâ6†V6·2–ç7V7B7GVÂ'&÷w6W"Ö–çWBärg&öÒ÷&–v–æÂã#’f—‡GW&S ¦ÆÂÇ†ÔôdbFW†VÇ2W†7FÇ’³SRÃsRÃ##Ã#SUÓ²Ç†ôâ7F–ÆÂ³SRÃsRÃ##Ãó#SUÒà¤ÆÂf—fRärf–ÇFW'2FW7FVBv—F‚f&–VB†–FFVâ$t"ÂE$å2æBw&—66ÆRÖÇ†À¦ÖÆf÷&ÖVBö÷fW'6—¦VBö–æfÆFR÷fW&fÆ÷r&VgW6VBâ7GVÂ7W&f6RFVfVÇBFV6öFW"æ@§6÷W&6RÖW†7BäôÒ&÷VæGG&—6÷fW&VBâ6÷'&V7FVBã3BÇ†ÔôâFW7C¢FVfVÇBF‡&VP¦öä&Vf÷&T6ö×–ÆR—2æòÖ÷²F‡&VRW‡æG2Öög&vÖVçBgFW"F†B†öö²âã3B4£CS#ƒcƒƒcbd”ÄTC²&W—"7WW'6VFW2—BöæÇ’gFW"76–ærfÆ–FF–öâ÷V&Æ–6F–öâà¥&W7F÷&RDUeô„•5Dõ%’6öçFVçBg&öÓ33“vC#ƒrÂv†–6‚ã3BFö7VÖVçFF–öâ66–FVçFÆÇ§&WÆ6VBÂF†Vâ&WF–âã3BVçG'’æBVæBF†—2&W—"â÷F†W"öÆBFö72¶WB–çF7Bà¥&Wf–WvVB66†R6Æ÷7W&R&W–ææVC²7FÆRã3B–æFW‚ÖöæÇ’¶W—2&V6öæ6–ÆVBv—F‚÷væW'2à¥&W7F÷&R÷&–v–æÂf—fR×7FW7G'V7GW&Âô"6†V6¶Æ—7Bƒ3BW‡G&ÖFW&–Â7FW'&ö¶P¦6ö×ÆWF–öâ“²ÖFW&–Â6†V6²7F—2–â'V–ÆB–ç7G'V7F–öç2â6÷'&V7B7FÆS32F—FÆW0¦æB&W6W'fS32ó3B&W7VÇBÆöw2â÷&–v–æÃ26†V6¶Æ—7B&Vw&W76–öâFW7G252à ¤DUd”4S3S¢W6R÷&–v–æÂFö72÷6×ÆW2ôäôÕô4ôÄõU%ôÅ„ó#’ææöÒÂ7GVF–òæB6öÆ–Bà¥$”t…B6öÆ–B7–âÂæò&Æ6²7V&W3²ÄTeB6†V6¶W"G&ç7&Væ7“²Ô”DDÄR6öÖ&–æV@¦Ç†ÇW2÷6—G’â7v—F6‚÷&V÷Vâd”Us²÷&–v–æÂã3"6WfVâÖ7V&R6öÆ÷W"7–ã°¢ã327FæFÆöæR6×ÆRVæ6†ævVBâÖ÷fRõVæFõ&VFòæB6fRô÷VâôäôÒ&WFVçF–öâà¤æF—fR•BôuRV&æ6R66WFæ6R7F–ÆÂVæF–æs²Fòæ÷B6Æ–ÒFWf–6R7V66W72à¤F—7Æ6VÖVçB&VÖ–ç2FVfW'&VC²æW‡B7FW—27GVÂFWf–6RfÆ–FF–öâ&Vf÷&RÖ÷&Rv÷&²à¥fÆ–FF–öã¢æöFS#"gVÆÂ7V—FS3cB52ód”Âƒ#bãcW2“²fö7W6VC2ÖFW&–ÂFW7G0¦æBf–æÃ26†V6¶Æ—7BFW7G252âv—BF–fbÒÖ6†V6²6ÆVââ4“CSCs#cƒ#’æBvW3CSCs#c#5T44U53²Æ—fR'—FW2fW&–f–VBâã3B•Bd”Â&VÖ–ç2&V6÷&FVC²ã3RuRöFWf–6R66WFæ6RVæF–ærà ¥V&Æ–6F–öâfW&–f–VC¢Æ–6F–öã636VcC3F#††3vCC3SsF3CVCScS†fS#ƒ3BÀ§&Wf–WvVBG&VSFVFsFF#†#&V&CCcFcc†#“SSC&FfCBâ†÷7FVB4“CSCs#cƒ#¥5T44U53²vW3CSCs#c#5T44U52âÆ—fRfW'6–öâ÷6†VÆÂõärö÷fW&Æ’÷&VæFW"ö6†V6¶Æ—7@¦æB÷&–v–æÃƒÃcBÖ'—FS#’6×ÆRÖF6‚6÷W&6R'—FW2â6VRFö72÷V&Æ–6F–öâÓ3RæÖBà¥7FGW3¢ã3RÄ•dRæB$TE’dõ"$UDU5C²ã3BW6W"d”Â&W6W'fVBÂã3250§&÷FV7FVC²7GVÂ•BôuR6öÆ÷W"66WFæ6RVæF–ærâæòF—7Æ6VÖVçBv÷&²–æ6ÇVFVBà ¢22ã3RW6W"52&÷FV7FVB(	B3ö7Fö&W"##` ¥W6W"6öæf—&×2F†R&–v‡B7V&RÇ†Ôôdb6öÆ÷W"&W—"52â&÷FV7B÷VR7–â$t ¦–â7GVF–òõ6öÆ–BÂ6†V6¶W"G&ç7&Væ7’f÷"Ç†ôâÂ6öÖ&–æVBÖ–FFÆRÇ†ö÷6—G’À¦÷&–v–æÂã327FæFÆöæR%"&Wf–Ww2Â6WfVâÖö&¦V7BÆöF–ær÷76–ærÂd”Ur7F&–Æ—G’À¦æBW†—7F–ær6fRô÷VâôäôÒ&WFVçF–öââã3B67&VVç6†÷Bd”Â&VÖ–ç2–â†—7F÷'’0§7WW'6VFVBâã3R—266WFVC²æògW'F†W"Ç†6†FW"öFV6öFR6†ævW2ÆææVBà ¤æW‡BFWfVÆ÷ÖVçB—2â–çfW7F–vF–öâ&Vf÷&R–×ÆVÖVçFF–öã¢VF—BF†RW†—7F–æp¥7V$B÷7V&F—f—6–öâ÷væW'2æBäôÒF—7Æ6VÖVçB&WFVçF–öâö–×÷'BfÆ÷râ&Væ6†Ö&²§6ÖÆÂ&÷VæFVBFW76VÆÆF–öâ&Wf–Wröâ&W&W6VçFF—fRÆ÷r×öÇ’ö&¦V7G2âW7F&Æ—6€¦62f÷"6÷W&6Rf6W2Â7V&F—f—6–öâÆWfVÂÂvVæW&FVBfW'F–6W2Â–ÖvRF–ÖVç6–öç2À¦ÖVÖ÷'’æBg&ÖRF–ÖS²6ö×&Rv–ç7BF†R÷&–v–æÂVæÖöF–f–VBö&¦V7Bâ–b6fRÀ¦W‡÷6RF—7Æ6VÖVçB&Wf–Wr2G&ç6–VçB7GVF–òõ6öÆ–B7W&f6R÷fW&Æ’v—F€¦6æ6VÂöÖöFR×7v—F6‚6ÆVçW²¶VWW‡÷'FVBÖW6‚æB6÷W&6RÖVæ6†ævVBâ–bF†P¦W†—7F–ærF÷öÆöw’÷W&f÷&Öæ6R÷væW'26ææ÷B7W÷'B&W7öç6—fR•B&Wf–Wrv—F†–à¦6ÆV"6Â¶VWF—7Æ6VÖVçB–ç7V7F–öâÖöæÇ’æB&W÷'BF†RÖV7W&VBÆ–Ö—Bà¤Fòæ÷BFBF—7Æ6VÖVçBFVf÷&ÖF–öâFòã3RâæW‡B'V–ÆBföÆÆ÷w2F†—2VF—BövFRà ¤7W'&VçB7FGW3¢ã3RÄ•dRÂ4’æBvW2fW&–f–VBÂW6W"52&÷FV7FVBâæW‡B'V–Æ@¦fö7W3¢&÷VæFVBF—7Æ6VÖVçB÷7V&F—f—6–öâfV6–&–Æ—G’Âæò–×ÆVÖVçFF–öâ77VÖVBà ¢22ã3b(	B&÷VæFVB7V&F—f—6–öâF–Ö–ærvR(	B3ö7Fö&W"##` ¥W6W"ã3R52&÷FV7FVBâW†—7F–ærÖ÷væW"VF—B6öæf—&ÖVBäôÒF—7Æ6VÖVçB&WFVçF–öà¦æBW‡÷'B7W÷'BÂ'WBæ÷Bf–Ww÷'BFVf÷&ÖF–öââF†RWF†÷&—FF—fR6F×VÆÎ(	46Æ&°¦7V&F—f–FR‚–÷væW"÷W&FW2öâVF—F&ÆTÖW6‚F÷öÆöw’æBFöW2æ÷B&W6W'fR–×÷'FV@§W"Ö6÷&æW"Ub–ÆöG2âFòæ÷BW6R—G2&W7VÇBf÷"F—7Æ6VÖVçB7W&f6Rv—F†÷WB¥Ub×&W6W'f–ærF‚âæòF—7Æ6VÖVçB&VæFW"ö&¶Rv2FFVBà ¤FFVBFö72÷7V&F—f—6–öâÖ&Væ6†Ö&²Ó3bæ‡FÖÆÂÆ–æ¶VBF‡&÷Vv‚F†RW†—7F–ærf–ÆR(i ¥67&VVâ6ö×&—6öâòFW7BÆ—7B÷væW"â—BÆöG2F†R6ÖRÖW6‚æB7V&F—f—6–öâÖöGVÆW2À¦ÖV7W&W2bócBó#Sb&VwVÆ"VBf6W2BÆWfVÇ2(	32Â62vVæW&FVBF÷öÆöw’@£bÃ3ƒBf6W2‡ãbÃcCfW'F–6W2’ÂW6W2öæRv&Ò×WÇW2F‡&VR6×ÆW2ÂæB7F÷0¦W66ÆF–ærgFW"ãã'26×ÆRâ—BVÖ—G2ÖVF–âö6÷VçBö'&÷w6W"ôE"¥4ôâf÷"•@§&Wf–WræBFöW2æ÷BF÷V6‚F†R&ö¦V7B66VæRâ5R¶W&æVÂF–Ö–ær—2æ÷BUbG&ç6fW"À£bÖ&—B–ÖvR6×Æ–ærÂ†VÂuR÷"g&ÖRF–ÖRâæòFWf–6RF–Ö–ær÷"F—7Æ6VÖVç@¦66WFæ6R–æfW'&VBâ÷&–v–æÂã3RÇ†Ôôdb6öÆ÷W"52æB6WfVâÖö&¦V7Bõd”Ur50§&VÖ–â&÷FV7FVBà ¥&Vw&W76–öã¢æWr&Væ6†Ö&²FW7G2fW&–g’W6RöbF†R6æöæ–6Â7V&F—f—6–öâgVæ7F–öâÀ§&W6WBö6÷7F÷6öçG&7BæBW†7B÷WGWBf6R÷fW'FW‚6÷VçG2v†–ÆR6÷W&6RÖW6‚7F—0§Væ6†ævVBâfö7W6VB7V$BÖ66†RöF—7Æ6VÖVçBö&Væ6†Ö&²6†V6·3b53²&VÆV6RÖ6öçG&7@¦6†V6·3b52âgVÆÂæöFS#"7V—FS3cb52Âd”ÂÂ6¶—VBâ–æ—F–ÂgVÆÂ'Vâ6Vv‡@§F‡&VR7FÆR&VÆV6RU$Âö†6‚6öçG&7B&÷w2gFW"F†R&WV—&VB–â&Vg&W6ƒ²&Vg&W6†V@§F†R&Wf–WvVB–×÷'B6†–âæB&W&â6ÆVââ'VçF–ÖR6öÖÖ—Cc–csf3“fVC–6FS†C“3†S3“SS#f#6C#s–6B÷G&VVcc3#vC&33ƒ†VCc&&Ff#&V6csSVF6#C†CSc6à¤†÷7FVBF÷öÆöw’&Vw&W76–öãCS““Sƒ2æBvW3CS““Ssc5T44U52â6—‚Æ—fRð¦&Væ6†Ö&²f–ÆW2'—FRÖÖF6‚F†RV&Æ—6†VB6÷W&6RâFWf–6RF–Ö–æræBT’66WFæ6P§&VÖ–âVæF–æs²æòF—7Æ6VÖVçB&Wf–Wr66WFæ6R—26Æ–ÖVBà  ¢22ã3bW6W"F–Ö–ær&W÷'B&V6V—fVB(	B3ö7Fö&W"##` ¥F†RW6W"7WÆ–VBÆÃ’ã3b&Væ6†Ö&²&W7VÇG2g&öÒ•B6‡&öÖRf÷"”õ2„7&”õ3SbÀ¦•Dõ3#bãbã"ÂE#"’â7F'BöVæBGW&F–öãc×3²æòV&Ç’×7F÷wV&BâÖVF–â5RÖW6€§F–ÖW2f÷"6÷W&6Rf6W3bócBó#SbBÆWfVÇ3ó"ó3¢óó6×2Ãó2óf×2ÃóBó6×2âÆ&vW7@§&W7VÇCbÃ3ƒBf6W2óbÃcCfW'F–6W3²6×ÆW3"ó2óv×2â&V6÷&B26ö×ÆWFVB5P¦&Væ6†Ö&²FFÂæ÷B2F—7Æ6VÖVçB×&Wf–Wr÷"uR66WFæ6RÂæBæ÷B2W‡Æ–6—@¦÷fW&ÆÂW6W"52ôd”Ââæò&W÷'Böb÷7B×'Vâ66VæR÷6VÆV7F–öâ6†V6²à ¤VF—Bf÷"æW‡B7FW¢äôÒUg2&Rf6RÖ6÷&æW"'&—2–âvÆ%77F‡&÷Vv‚çWd6÷&æW'6°¦W†—7F–ær6F×VÆÎ(	46Æ&²f6R7Æ—GF–ær†27F&ÆR÷&FW&VB6÷&æW"F÷öÆöw’'WBG&÷0¥Ug2–â—G27W'&VçBVF—F&ÆTÖW6†&WGW&ââW‡FVæBF†R6ÖRWF†÷&—FF—fR÷væW"Fð§&÷vFR6÷&æW"Ug3²&WF–â6VÒ×7V6–f–2Ug2æBfW&–g’f6Rö6÷&æW"Æ–væÖVçBâæð§6V6öæBvVöÖWG'’¶W&æVÂâW6SbÃ3ƒBf6W2÷ãbÃcCfW'F–6W22&÷f—6–öæÂ6öæÇ“°¥UbÖ–ærÂbÖ&—BF—7Æ6VÖVçB6×Æ–ærÂ†VÂuRæBg&ÖR×F–ÖRvFW2&VÖ–â÷Vâà¢à ¢22ã3r(	B&÷VæFVB6F×VÆÎ(	46Æ&²6÷&æW"Ub&÷vF–öâ(	B3ö7Fö&W"##` ¤FFVB7V&F—f–FUv—F„6÷&æW%Ug2‚–&W6–FRF†R6æöæ–6Â6F×VÆÎ(	46Æ&²¶W&æVÂâV6€¦6†–ÆBVB&V6V—fW2f÷W"W"Ö6÷&æW"UbfÇVW2–âF†R6÷'&W7öæF–ærvVöÖWG'’÷&FW#°§6†&VBvVöÖWG&–2VFvW2Fòæ÷BÖW&vRUb6†'BfÇVW2âW†—7F–ær7V&F—f–FR‚–æ@¦6F×VÆÄ6Æ&²‚–6öçF–çVR&WGW&æ–ærvVöÖWG'’ÖöæÇ’ÖW6†W2âÆWfVÇ2&R&÷VæFVBFò(	3C°§&VfÆ–v‡B62&RbÃ3ƒB÷WGWBf6W2æCƒÃUb6÷&æW'2âæòf–Ww÷'B÷ ¦F—7Æ6VÖVçBv—&–ær—2–æ6ÇVFVBà ¤æWr&Vw&W76–öâ66W26÷fW"÷&FW&–ærÂ6VÒ&W6W'fF–öâÂ×VÇF–ÆWfVÂvVöÖWG'¦WV—fÆVæ6RÂ–Ö×WF&ÆR6÷W&6RFFöÖWFFFÂÖÆf÷&ÖVBFFæBF†RÆ&vW7Bã3`¦&Væ6†Ö&²66Rƒ#Sb6÷W&6Rf6W2BÆWfVÃ2’âfö7W6VBUbõ7V$Bö66†RöF—7Æ6VÖVçB6†V6·3’53²&VÆV6RÖ6öçG&7B6†V6·3R53²gVÆÀ¤æöFS#"7V—FS3s52ód”Ã²v—BF–fbÒÖ6†V6¶6ÆVââV&Æ—6†VBFòÖ–â2'VçF–ÖR6öÖÖ—B3s6ƒcVV3–3“6#&#ƒFC#s–V#F&3SCcvCVV&CS& ¢‡G&VRFCc6SFCcƒ#3–FVS6#cf3vcS#c–#C66’â†÷7FVBF÷öÆöw’&Vw&W76–öà£Cs3ƒƒ“RæBvW2FWÆ÷–ÖVçBCs3ƒƒ“b7V66VVFVC²fW'6–öâæ§6öâÂ–æFW‚æ‡FÖÀ¦æBÆÃ6†ævVB'VçF–ÖRÖöGVÆW2'—FRÖÖF6‚Æ—fRvW2âæòÖçVÂT’FW7B—0¦W‡V7FVBf÷"F†—2æöâÕT’†VÇW"à  ¢22ã3rW6W"52&÷FV7FVB(	B3ö7Fö&W"##` ¥W6W"&WÆ–VB52FòF†Rã3r6÷&æW"ÕUb7V&F—f—6–öâ'V–ÆBâ&÷FV7BF†RæWrUbÖv&P¤6F×VÆÎ(	46Æ&²†VÇW"æB—G26VÒÂ&—G’æB÷WGWBÖÆ–Ö—B6öçG&7BâF†RW6W"F–Bæ÷@§&WVW7B÷"fW&–g’f–Ww÷'BV&æ6R6†ævS²F†—2’&VÖ–ç2Væ6öææV7FVBFòF†P§&VæFW&–ærF‚âV&Æ–W"6WfVâÖö&¦V7Bõd”UræBã3R6öÆ÷W"ÖÇ†52&V6÷&G2&VÖ–à§&÷FV7FVBâæW‡BvFR—2â•BF–Ö–ær6ö×&—6öâ&Vf÷&Rç’F—7Æ’–çFVw&F–öâà ¢22ã3‚(	BUbÖv&R7V&F—f—6–öâF–Ö–ærvFR(	B3ö7Fö&W"##` ¤FBâ–âÖÆ–æ¶VB&W÷'B6ö×&–ærvVöÖWG'’ÖöæÇ’7V&F—f—6–öâv—F‚Ub&÷vF–öà¦f÷"6öçF–çV÷W2w&–G2æB–æFWVæFVçBW"Öf6R6†'G27&÷72F†Rã3bbócBó#SbÖf6P§v÷&¶ÆöBâ&WF–âF†SbÃ3ƒBÖf6RóƒÃÖ6÷&æW"Æ–Ö—G2æCã'2W"×'Vâ7F÷âF†RvP¦FöW2æ÷BÇFW"F†R&ö¦V7BæBÖV7W&W2æòFW‡GW&RFV6öFR÷6×Æ–ærÂÖVÖ÷'’ÂuR÷ ¦g&ÖRF–ÖRâF†RW6W.(	—2•B¥4ôâ&W÷'B—2æVVFVB&Vf÷&RFV6–F–ærv†WF†W"Fòv—&RF†P¦W†—7F–ærUb7W&f6RöF—7Æ’÷væW'2FövWF†W"âæòf–Ww÷'BF—7Æ6VÖVçB6†—2†W&Rà  ¢22ã3‚(	BUb7V&F—f—6–öâF–Ö–ærvFR(	B3ö7Fö&W"##` ¥W6W"ã3r52&÷FV7G2F†R6æöæ–6Â&÷VæFVB6÷&æW"ÕUb7V&F—f—6–öâF‚æB—G0§6VÒövVöÖWG'’–çf&–çG2âVF—FVB&VæFW&W"÷væW'3¢7GVF–òõ6öÆ–B6¶—æF—fRUb–ÖvP¦÷fW&Æ—2GW&–ær7V$B÷"Ö—'&÷"Âv†–ÆRÖ–î(	—27V$B66†R7F÷&W2vVöÖWG'’öæÇ’âfö–@¦GWÆ–6F–ær7V&F—f—6–öã²f—'7BFBâ•BF–Ö–ærvFR6ö×&–ærvVöÖWG'’ÖöæÇ’À¦6öçF–çV÷W2Ö6†'BæBW"Öf6R×6VÒUb66W2BbócBó#Sb6÷W&6Rf6W2ÂÆWfVÇ2(	32à¤V6‚F–ÖVB6×ÆR—2wV&FVBBã'2Âv—F‚bÃ3ƒBÖf6RòƒÃÖ6÷&æW"62â&W÷'@¦W†6ÇVFW2FV6öFR÷6×Æ–ærÂÖVÖ÷'’ÂuRæB&VæFW&VBg&ÖRF–ÖRà ¤WFöÖFVBfÆ–FF–öã¢2Ãs252òd”ÂöâæöFR#"âF÷öÆöw’&Vw&W76–öâ'Và£CssCS#ƒr5T44U52âvW2GFV×BCssCS‚f–ÆVB&V6W6RF†Rf—'7Bv—D‡V"&Æö §WÆöBG'Væ6FVBÆ&vRÖ&¶F÷vâf–ÆW3²W†7BÆö6Âv—B&Æö'2vW&R&R×WÆöFVBâvW0¦'V–ÆBöFWÆ÷’'VâCssC#“ƒS5T44U52âfW&–f–VBÆ—fRã3‚Ö&¶W"æB&Væ6†Ö&²U$Âà¥VæF–æs¢W6W"×'Vâ•BF–Ö–ær&W÷'B&Vf÷&RF—7Æ’–çFVw&F–öâ÷"F—7Æ6VÖVçBv÷&²à  ¢22ã3’(	B&÷VæFVBFW‡GW&VB7V$BF—7Æ’(	B3ö7Fö&W"##` ¥F†RW6W"7WÆ–VBF†Rã3‚•BUb7V&F—f—6–öâ&W÷'C¢ÆÂæ–æR&Væ6†Ö&²66W0¦6ö×ÆWFVBv—F†÷WBV&Ç’7F÷²vVöÖWG'’ÖF6†VB&6VÆ–æRÂ–çWG2&VÖ–æVBVæ6†ævVBà¤BbÃ3ƒBf6W2òcRÃS3bUb6÷&æW'2ÂÖVF–â5RvVæW&F–öâÖV7W&VB"×2f÷ ¦vVöÖWG'’Â#2×2f÷"6öçF–çV÷W2Ug2æB#"×2f÷"W"Öf6R6†'G2âF†—2—2æ÷@§FW‡GW&RÖFV6öFRÂÖVÖ÷'’ÂuR÷"g&ÖR×F–ÖRWf–FVæ6Rà ¢ã3’6öææV7G2F†R6æöæ–6Â6÷&æW"ÕUb7V&F—f—6–öâ&W7VÇBFòF†RW†—7F–ær7F—fP¥7V$BF—7Æ’66†RæBäôÒ7GVF–òõ6öÆ–B7W&f6R÷fW&Æ’â&Wf–Wr—2ÆÆ÷vVBöæÇ’f÷ ¦7F—fRVF—F&ÆRäôÒvVöÖWG'’v—F‚7W'&VçBÖF6†–ærUbF÷öÆöw’6–væGW&RÂæð¤Ö—'&÷"ÂæBv—F†–âF†R&RÖW†—7F–ær#ÃÖ6÷&æW"Ub&Wf–WrvVöÖWG'’Æ–Ö—BâF†P¦66†R7F÷&W2Ug2Æöæw6–FRF†R6ÖR7V&F—f–FVBÖW6‚âÖ—'&÷"Â–çfÆ–B÷7FÆRUg2À¦÷F†W"6÷W&6W2æB÷fW"Ö6&W7VÇG2fÆÂ&6²FòVçFW‡GW&VB7V$BâW†—7F–ær÷fW&Æ¦6ÆVçW—26ÆÆVB&Vf÷&R&öG’&V'V–ÆC²æò6V6öæB7V&F—f—6–öâ¶W&æVÂ÷"F—7Æ6VÖVç@§&Wf–Wr—2–çG&öGV6VBâfö7W6VB7V$BÂFW‡GW&R÷fW&Æ’æBF—7Æ’Ö66†RFW7G276VC°¦gVÆÂæöFR#"7V—FR76VB2Ãƒ2ó2Ãƒ2Â&VÆV6R76WBÖ6öçG&7B6†V6·276VBæ@¦v—BF–fbÒÖ6†V6¶—26ÆVââ†÷7FVBF÷öÆöw’&Vw&W76–öâCƒ#c###’æBvW0¦'V–ÆBöFWÆ÷’Cƒ#c“#7V66VVFVBf÷"'VçF–ÖR6öÖÖ—B3cC²fW'6–öâÖ&¶W"Â6†VÆÂÀ¦æ–æR'VçF–ÖRÖöGVÆW2æBGvòWfÇVF–öâ76WG2ƒ2f–ÆW2’ÖF6‚Æö6Âv—B&Æö'0¦'—FRÖf÷"Ö'—FRâF†P¢ã3’•Bf—7VÂfW&–f–6F–öâ&VÖ–ç2VæF–æs²Fòæ÷B6Æ–ÒuRÂÖVÖ÷'’÷"g&ÖR×F–ÖP§6fWG’g&öÒF†Rã3‚&Væ6†Ö&²â&W6W'fRV&Æ–W"ã3R6öÆ÷W"ÖÇ†¥52æB6WfVâÖö&¦V7Bõd”Ur66WFæ6Rà  ¢22ãC(	B–æ7F—fRäôÒ7V$BFW‡GW&W3²ã3’&6RÖÖFW&–Â52(	B3ö7Fö&W"##` ¥F†RW6W"56W2ã3“¢ÆÂ6WfVâö&¦V7G2F—7Æ’F†V—"ÖFW&–Ç2v—F†÷WB7V$BâF†P¦föÆÆ÷r×W•B&W÷'B—6öÆFW2F†Rv¢v†Vâ7V$B—2Væ&ÆVB7&÷72×VÇF—ÆRö&¦V7G2À¦öæÇ’F†R6VÆV7FVBö&¦V7Bw2ÖFW&–ÂF—7Æ—2â&÷FV7BF†RæöâÕ7V$B&V†f–÷"Â6WfVâÐ¦ö&¦V7Bf—6–&–Æ—G’Âd”UrÖöFW2æBV&Æ–W"6öÆ÷W"ÖÇ†52à ¤W†—7F–ær–æ7F—fRÖö&¦V7B&VæFW&–ærÇ&VG’÷væVB–æFWVæFVçB7V$B66†W2æB&WW6V@§F†R6æöæ–6ÂvVöÖWG'’¶W&æVÂÂ'WB76VBæV—F†W"W"Ö6÷&æW"Ug2æ÷"7V$BUb–Æö@§FòF†RW†—7F–ær7GVF–òõ6öÆ–B÷fW&Æ’âãC&WW6W2F†B66†Rv—F‚F†R6æöæ–6À¦7V&F—f–FUv—F„6÷&æW%Ug2‚–F‚æB6†&VB7F—fRö–æ7F—fR6÷W&6R÷F÷öÆöw’ôÖ—'&÷"ö6 ¦VÆ–v–&–Æ—G’â—BGF6†W2F†RW†7BF—7Æ’ÖW6‚æBUb–ÆöBFòV6‚–æ7F—fR&öG’à¤–æ7F—fR÷fW&Æ’6ÆVçWæ÷r'Vç2F‡&÷Vv‚F†RW†—7F–ær&VæFW"6ÆVçW÷væW"&Vf÷&P¦66†VBvVöÖWG'’—2&WW6VBâæò&ÆÆVÂ&VæFW&W"Â7V&F—f—6–öâ¶W&æVÂ÷"F—7Æ6VÖVç@§&Wf–Wrâ×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3÷cÓã3bãã&VÖ–ç2VçF÷V6†VBà ¤æWr&Vw&W76–öâ6÷fW'2F—7F–æ7BW"Öö&¦V7BUbö66†R&W7VÇG2Â66†R&WW6RÂ7FÆRôÖ—'&÷"ð¦6fÆÆ&6²Â7GVF–òõ6öÆ–B–æ7F—fR÷fW&Æ’ÂæB6ÆVçWâW†—7F–ær7F—fR7V$BÂ–æ7F—fP¦vVöÖWG'’–FVçF—G’öF—7÷6ÂÂÖ—'&÷"Â&VæFW"W&f÷&Öæ6RÂ&ööÆVâ66VæRÆ–fV7–6ÆRÂæ@¤äôÒÖFW&–ÂFW7G272âgVÆÂæöFR7V—FS¢2Ãƒ52òd”Ââ&VÆV6RÖ6öçG&7B6†V6·0§73²v—BF–fbÒÖ6†V6¶6ÆVââ†÷7FVB4’æBV&Æ–6F–öâWf–FVæ6RVæF–ærà ¤DUd”4SC¢W6RF†R6WfVâÖö&¦V7BäôÒ6×ÆS²fW&–g’ÆÂ6WfVâ&6RÖFW&–Ç2ÂF†Và¦Væ&ÆR7V$Böâ×VÇF—ÆRFW‡GW&VBö&¦V7G2æB6öæf—&ÒFW‡GW&W2&VÖ–âf—6–&ÆRv†–ÆP§Vç6VÆV7FVB–â7GVF–òæB6öÆ–Bâ7v—F6‚6VÆV7F–öâÂFW6VÆV7BÆÂÂFövvÆR7V$BôÖ—'&÷"À§&V÷Vâd”UræBæf–vFRâF—7Æ6VÖVçBÂuRÂÖVÖ÷'’Â–ÖvRÖFV6öFRæB&VæFW&VBg&ÖP§F–ÖR&VÖ–â÷WG6–FRF†—2fÆ–FF–öâà  ¢22ãCV&Æ–6F–öâfW&–f–VB(	B3ö7Fö&W"##` ¥'VçF–ÖR6öÖÖ—B#SVF“v#s&#3ƒ“c“†3csf3cvc“s6&CC36c†v—F‚G&VP¦ccsCC#c#SFcCsFvcFs66S#3C&3ƒvC†f&—2öâ&VÖ÷FRÖ–ââ†÷7FVBF÷öÆöw§&Vw&W76–öâCƒsSCs’æBvW2'V–ÆBöFWÆ÷’CƒsSCcsS"&÷F‚6ö×ÆWFVB5T44U52à¤Æ—fRfW'6–öâæ§6öâæB6WfVâ6†ævVB'VçF–ÖR76WG2†–æFW‚6†VÆÂÂÖ–âÂ×VÇF’Öö&¦V7BÀ¥7V$BF—7Æ’66†RÂ6†VÆÂ6ö×&—6öâÂG&vW"×V’æBf6R×v÷&¶fÆ÷rÖÆ–÷WB’ÖF6‚F†P¦Æö6Â'VçF–ÖR'—FW2W†7FÇ’âÆö6ÂgVÆÂæöFR7V—FS¢2Ãƒ52òd”Ã²fö7W6VBæWp¥7V$BæB&VÆV6RÖ6öçG&7B6†V6·272âæF—fR•B66WFæ6Rv2VæF–ærBV&Æ–6F–öã²F†RÆFW"W6W"52—2&V6÷&FVB&VÆ÷rà ¢22ãCW6W"52&÷FV7FVB(	B3ö7Fö&W"##` ¥W6W"6öæf—&×2ÆÂö&¦V7G2&WF–âF†V—"ÖFW&–Ç2v—F‚7V$BVæ&ÆVBÂ–æ6ÇVF–æp§Vç6VÆV7FVBö&¦V7G2â&÷FV7B–æ7F—fRÖö&¦V7BFW‡GW&VB7V$B–â7GVF–òõ6öÆ–BæBF†P§FW7FVB6VÆV7F–öâÖ–æFWVæFVçB&V†f–÷"âæW‡B6æF–FFR—26÷W&6RVF—BöbF†P¦W†—7F–ærF—7Æ6VÖVçB÷væW'2æB&÷VæFVBVæB×FòÖVæB&Wf–Wr÷W&f÷&Öæ6RvFS°§F†Rã3‚5RÖW6‚õUb&Væ6†Ö&²FöW2æ÷BW7F&Æ—6‚FV6öFRÂÖVÖ÷'’ÂuR÷"g&ÖR×F–ÖP§6fWG’âæò'VçF–ÖR6†ævR–âF†—2fVVF&6²WFFRà  ¢22ãC(	BF—7Æ6VÖVçB&Wf–WrfV6–&–Æ—G’vFR(	B3ö7Fö&W"##` ¢ãC•B52&VÖ–ç2&÷FV7FVBâVF—FVBF†RW†—7F–æræF—fRF—7Æ6VÖVç@§&W6÷W&6R÷væW#¢äôÒF—7Æ6VÖVçB&–æF–æw2&RÇ&VG’&WF–æVB÷fÆ–FFVBf÷"U`¦–ç7V7F–öâæBW‡÷'BÂv†–ÆRF†R7W'&VçB7GVF–òõ6öÆ–BÖFW&–Â÷fW&Æ’FöW2æ÷@¦6öç7VÖRF—7Æ6VÖVçBâFòæ÷B7&VFR6V6öæB&VæFW&W"÷"7V&F—f—6–öâ¶W&æVÂà ¢ãCFG2FV×÷&'’&Væ6†Ö&²VçG'’FòF†RW†—7F–ærf–ÆR(i"67&VVâ6ö×&—6öâð§FW7BÆ—7Bâ—BW6W2F†R6æöæ–6Â6÷&æW"ÕUb7V&F—f—6–öâ†VÇW"ÂvVæW&FVB‚Ö&—@¦w&—66ÆRäw2B#Sl+"ó#L+"ó#CŒ+"Â&÷VæFVBbócBó#SbÖf6R6÷W&6RÖW6†W2Â6÷&æW"ÕU`¦vVöÖWG'’W‡ç6–öâæBF‡&VRæ§2F—7Æ6VÖVçDÖÖFW&–Ââ—B&V6÷&G2vVæW&F–öâÀ¥ärVæ6öFRöFV6öFRÂ7V&F—f—6–öâÂW‡ç6–öâÂW7F–ÖFVB'—FR6÷VçG2Â&VæFW"7V&Ö—76–öâÀ¦g&ÖR–çFW'fÇ2æB÷F–öæÂuRF–ÖW"VW'’&W7VÇG2â6–ævÆR5R7FvR÷fW"ã'0§7F÷2F†R'VâæBÆVfW26÷–&ÆR'F–Â&W÷'BâæòF—7Æ6VÖVçBFVf÷&ÖF–öâ—0¦FFVBFò&ö¦V7B&VæFW&–ærà ¤f–æÂÆö6ÂæöFR7V—FS¢2Ãƒ252òd”Âò6¶—VBâF†RãCvFRÂ&VÆV6R×–âÀ¦W†—7F–ærã3‚Ub&Væ6†Ö&²æBãC–æ7F—fR7V$B&Vw&W76–öâ6†V6·276VC²ÖöGVÆP§7–çF‚æBv—BF–fbÒÖ6†V6¶&R6ÆVââÆ—fRV&Æ–6F–öâ—2VæF–ærâF†RW6W"•@§&W÷'B—2&WV—&VB&Vf÷&R6†ö÷6–ær&öGV7F–öâF—7Æ6VÖVçB–×ÆVÖVçFF–öâà  ¢22ãC•BfV6–&–Æ—G’&W÷'B&V6V—fVB(	B3ö7Fö&W"##` ¥F†RW6W"7WÆ–VBF†RãC&W÷'Bg&öÒ•Dõ2#rã"òE""âÆÂæ–æRvVæW&FVBÖÖ §&VæFW"66W26ö×ÆWFVBv—F†÷WBV&Ç’7F÷âBF†RÆ&vW7B66Rƒ#Sb6÷W&6Rf6W2ÂÆWfVÀ£2ÂbÃ3ƒB÷WGWBf6W2òcRÃS3b6÷&æW'2’ÂÖVF–âUb7V&F—f—6–öâv2#×2ÂUbÖ6÷&æW ¦vVöÖWG'’W‡ç6–öâ^(	3‚×2æBW‡æFVBG—VB'&—22Ö”"âF†R#CŒ+"vVæW&FVBäp¦FV6öFVB–âC‚×2Âv—F‚bÖ”"W7F–ÖFVB&6R$t$²$b–çFW'fÇ2vW&Rr×2ÖVF–âæ@£~(	3‚×2“RâuRF–ÖW"VW&–W2vW&RVæf–Æ&ÆRà ¥G&VB2ff÷&&ÆRfV6–&–Æ—G’Wf–FVæ6RöæÇ’Âæ÷BW6W"52f÷"f–Ww÷'BF—7Æ6VÖVçBà¥F†RFW7BW6VB6–ævÆRÖW6‚æB7–çF†WF–2‚Ö&—BÖ²7GVÂæöÖBbÖ&—B6÷W&6RFV6öF–ærÀ¤&÷„Æ"f–Ww÷'Bög&ÖR6÷7BÂgVÆÂÖVÖ÷'’Â6†F÷w2æBf7F÷"öÖ–Gö–çB÷v÷&ÆB6VÖçF–72&P¦æ÷BW7F&Æ—6†VBâæW‡BVF—BF†R&VÂ&WF–æVBæöÖBF—7Æ6VÖVçB–ÆöB÷6WGF–æw2æ@§&÷WFRç’gWGW&R&Wf–WrF‡&÷Vv‚F†RW†—7F–ærUb7W&f6Rõ7V$B÷væW'2v—F†–â7W'&VçB62à ¢22ãC"(	BG&vv&ÆRUb–çBÆWGFRæB6öçFW‡GVÂV–6²6öçG&öÇ2(	B3ö7Fö&W"##` ¥F†RW6W"&WVW7FVBÆ–v‡FW"ÂG&vv&ÆR–çB&F–ÂÖVçRæBÖ÷f–ær&WWF—F—fR''W6€§6WGF–æw2÷WBöbF†RæVÂ&VÆ÷rF†RÆ–W"Æ—7BâVF—FVBW†—7F–ærf–Ww÷'B×–çB6öçG&öÇ0¦æB¶WBF†V—"÷&–v–æÂDôÒæöFW2Â–çWB†æFÆW'2æB7FFR÷væW'2âF†R6ÖR6†ææVÂð§&Wf–WrÂ6öÆ÷W"Â6—¦Rö÷6—G’Âf–ÆÂÂ&ÇW"÷66Æ"æBÖ6²×fÇVR6öçG&öÇ2æ÷r6—B–â¦6ö×7BfÆöF–ær6öçFW‡GVÂæVÂâÆ–W"Æ—7B&VÖ–ç2–âF†RW'6—7FVçBÆVgBæVÂà¥F†R6ÖÆÆW"FööÂv†VVÂæB6öçG&öÂæVÂ6†&RG&r†æFÆS²ö–çFW"Ö÷fVÖVçB6Æ×0§F†RæVÂv—F†–âF†Rf–Ww÷'BÂæB—G2÷6—F–öâW'6—7G2v†–ÆRF†R–çBÖöGVÆR&VÖ–ç0¦÷Vââ6VÆV7F–ærFööÂ7v—F6†W2Fò—G2V–6²6öçG&öÇ3²FööÇ2÷"F†R÷&–v–æÂ&6¶w&÷Væ@¦†öÆB&V÷Vç2F†Rv†VVÂâW†—7F–ærVæ6–ÂÂf–ævW"æf–vF–öâÂ6æ6VÆÆF–öâÂ†—7F÷'’æ@¤FöæR&V†f–÷"&VÖ–âv—F‚F†V—"÷&–v–æÂ÷væW'2à ¤6ö×7BÆ–÷WB55266÷W2v†VVÂ6ö÷&F–æFW2÷6—¦–ærFòF†Rv†VVÂæBv—fW2F†RV–6°§æVÂ—G2÷vâv–GF‚ö†V–v‡B'VÆW2â&VÆV6R¶W—2WFFVBFòãC"f÷"F†R6†VÆÂÂ–ç@¦ÖöGVÆRÂ6ö×7B7G–ÆW6†VWBæB&VÆV6R–FVçF—G’âG&vW"ôf6R×v÷&¶fÆ÷r÷&VÆV6R×fW'6–öà¦ÆöFW"6†–â&Vg&W6†VC²&÷FV7FVB7&2ö×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3÷cÓã3bãã—2Væ6†ævVBà¥F†R'VçF–ÖRÖ76WB6öçG&7B&V6÷&G2F†R&Wf–WvVB–ç2æB7W'&VçB'—FW2à ¤æWrWFöÖFVB6÷fW&vRfW&–f–W2FööÂ×FòÖ6öçG&öÇ2G&ç6—F–öç2v—F†÷WB†—7F÷'’6†ævW2À§&WW6Röb÷&–v–æÂ6öçG&öÇ2æBW'6—7FVçBÆ–W"Æ6VÖVçBÂ6öÆ÷W"÷6—¦Rö÷6—G’WFFW2À¦Ö6²6öçFW‡GVÂf—6–&–Æ—G’ÂG&rö6Æ×–ær–â&÷F‚7FFW2Â6ö×7BÆ–÷WBæB&–÷"–ç@¦–çFW&7F–öââF†Rf—'7BgVÆÂ'Vâf÷VæBGvò7FÆRFW7G2F†B7F–ÆÂW‡V7FVBF†Rv†VVÂFð§&VÖ–â÷VâgFW"FööÂ6VÆV7F–öâæBF†R7W'&VçB&VÆV6RFò&VÖ–âãC²F†÷6RFW7@¦W‡V7FF–öç2vW&RWFFVBFòãC"&V†f–÷"v†–ÆR&W6W'f–ærF†R6W&FRãC&Væ6†Ö&²à¤f–æÂÆö6ÂæöFR7V—FS¢2ÃƒR52òd”Âò6¶—VBò6æ6VÆÆVBƒbã#—2’à¤f–gFVVâfö7W6VB–çBö6ö×7BÖÆ–÷WB6†V6·2Âf—fR&VÆV6RÖ6öçG&7B6†V6·2ÂæBF†P§WFFVBv÷&¶fÆ÷röF—7Æ6VÖVçBÖ&¶W"6†V6·272â6†ævVB¦f67&—B7–çF‚6†V6·2æ@¦v—BF–fbÒÖ6†V6¶&R6ÆVââÆ–6F–öâ6öÖÖ—B66C#V3vC†Cc6#f#c&&#Cs&cs†&#VV#`¦†2F†RW†7BFW7FVBG&VRâ†÷7FVBF÷öÆöw’&Vw&W76–öâC#s3#cc2æBvW2FWÆ÷–ÖVç@£C#s3#cb&÷F‚7V66VVFVBâÆ—fRfW'6–öâæ§6öæÂ–æFW‚æ‡FÖÆÂ7&2÷f–Ww÷'B×–çBæ§6À¦6ö×7BÖÆ–÷WBæ776Â7&2÷6†VÆÂÖ6ö×&—6öâæ§6Â7&2öG&vW"×V’æ§6À¦7&2öf6R×v÷&¶fÆ÷rÖÆ–÷WBæ§6æB7&2÷&VÆV6R×fW'6–öâæ§6vW&RfWF6†VBæB'—FRÖÖF6†V@§F†RÆö6ÂFW7FVB6öçFVçBâF†R&÷FV7FVB×VÇF’67&—B–â&VÖ–ç2Væ6†ævVBâæF—fR•@¦V&æ6RæBF÷V6‚66WFæ6R&R7F–ÆÂVæF–ærà¥F†R•B6†V6·2&R–âF†RãC"6V7F–öâBF†RF÷öbDU5Eô4„T4´Ä•5BæÖC²DôÒFW7G2Fð¦æ÷B–×Ç’æF—fRF7F–ÆR÷"f—7VÂ66WFæ6RâæW‡C¢ö'F–âW6W"ãC"FWf–6R&W7VÇBÂF†Và§&W7VÖRF†R&WF–æVBæöÖBF—7Æ6VÖVçB6÷W&6R÷6WGF–æw2VF—Bg&öÒF†RW†—7F–ær&öFÖà  ¢22ãCR(	B6öÖ&–æVBUb–çBÖFW&–Â7G&ö¶W2æB–çFW&7F–öâ(	Bæ÷fVÖ&W"##` ¥W6W"&WVW7FVB6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW72–çF–ær–âöæR7G&ö¶RÂÆ—B&Wf–Wr÷6†F÷r&W7F÷&F–öâÂVæ6–Â÷&&—B–â–çBÂ''W6‚×FòÔÖFW&–ÂÖÖVçR&÷WF–ærv—F‚6öçFW‡GVÂ&F–Â6öçG&öÇ2ÂæB–×&÷fVB6×VFvR&ÆVæF–ærâ&WW6VBf–Ww÷'B×–çBÖ6÷&Ræ§6f÷"×VÇF’×&W6÷W&6R7Fv–æræBöæR66VæRÖ†—7F÷'’6†V6·ö–çC²W†—7F–ær&÷Vv†æW72ôÖWFÆæW72&W6÷W&6R÷væW'2&VÖ–âWF†÷&—FF—fRâöæR''W6‚6öçF7Bæ÷r7F×26VÆV7FVB6öÆ÷W"ÇW2÷F–öæÂ66Æ"Ö2æBV&Æ—6†W2FöÖ–6ÆÇ’â66Æ"6†ææVÂ6†ævW2f÷&6RÆ—B&Wf–WræB–çBW†—B&Vg&W6†W2F‡&÷Vv‚F†RW†—7F–ær&VæFW"ÖÖöFR÷væW"à ¤''W6‚÷Vç2ÖFW&–Âb–çBF—&V7FÇ’âf–ÆÂôW&6W"õ6×VFvRô&ÇW"ÖVçW2W6RF†RW†—7F–ær6öçG&öÇ2æB6†÷röæÇ’FööÂ×&VÆWfçB6WGF–æw2âVæ6–Â&6¶w&÷VæB†—G2&RæòÆöævW"6öç7VÖVB&Vf÷&R7V66W76gVÂ–çBö–ÖvR†—BÂv†–ÆR÷fW&Æ–ærVæ6–Â6öçF7G2GW&–ærf–ævW"æf–vF–öâ&VÖ–â7vÆÆ÷vVBâ6×VFvRWFFW2—G2Æö6Â&W6W'fö—"&WGvVVâF'2v—F‚7G&öævW"SóS6'&–VB÷7W&f6RÖ—‚Â&W6W'f–ær&V×VÇF—Æ–VBÇ†Â6öææV7FVB6VÒfW&v–ærÂUbÖf6R—6öÆF–öâÂ6æ6VÆÆF–öâæB&÷VæFVBv÷&²à ¥fÆ–FF–öã¢gVÆÂæöFR7V—FR2Ã“52òd”Âò6¶—VB&Vf÷&RF†Rf–æÂ–â×Æ6R6×VFvR&W6W'fö—"ÆÆö6F–öâ÷F–Ö—¦F–öââf–æÂ÷7BÖ÷F–Ö—¦F–öâfö7W6VBÖFW&–ÂÂ6öææV7FVB6×VFvRÂ&VÆV6R–FVçF—G’æB6†VÆÂ6WB3B52òd”Ââ'&öFW"–çBÂVæ6–ÂÖæf–vF–öâÂ&VÆV6RæB66†R×–â6WB76VBC2òC2&Vf÷&RF†BÆÆö6F–öâÖöæÇ’÷F–Ö—¦F–öââ¥27–çF‚æBv—BF–fbÒÖ6†V6¶72âæF—fR•Bf—7VÂ÷F÷V6‚66WFæ6R—2VæF–ærâ&÷FV7FVB7&2ö×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3÷cÓã3bãã—2Væ6†ævVBà ¥V&Æ–6F–öã¢6öÖÖ—BSV3ƒ6c“&F3–#ssCvCF6#S6#&3vC&#6öâÖ–æÂW†7BG&VRcFVSVSC3CF#ƒVS&6S“v3†3v6#csscV#vSVâvW2C#Ss“C#6æB†÷7FVBF÷öÆöw’&Vw&W76–öâC#Ss“3Cv7V66VVFVBâ66†RÖ'W7FVBÆ—fRfW'6–öâæ§6öæÂ–æFW‚æ‡FÖÆæBÆÂæ–æR6†ævVBöÆöFW"'VçF–ÖRÖöGVÆW2'—FRÖÖF6‚F†—2&VÆV6RâæF—fR•B66WFæ6R&VÖ–ç2VæF–ærà  ¢22ãCb(	BÖWFÆæW726†F–ær&W7F÷&F–öâæB7G&öævW"6×VFvR(	Bæ÷fVÖ&W"##` ¥W6W"&W÷'G2(	ÃCR5>(	ÒæB&÷FV7G2F†R6öÖ&–æVB6öÆ÷W"õ&÷Vv†æW72ôÖWFÆæW727G&ö¶Rv÷&¶fÆ÷rÂÆ—B&Wf–WrÂVæ6–Âæf–vF–öâÂ6öçFW‡GVÂ–çB6öçG&öÇ2æB&Wf–÷W26×VFvR&V†f–÷"âF†R6ÖR&W÷'B6—2ÖWFÆæW72–çF–ærFöW2æ÷B&WGW&âFòæ÷&ÖÂ6†F–æræB6×VFvR&VÖ–ç2vV²à ¤VF—Bf÷VæBF†RW†—7F–ær7&VFU–çE7W&f6R‚–÷væW"7F'G2Æ—B7W&f6W2v—F‚v†—FRÆ&VFòæBFVfVÇB&÷Vv†æW72öVÖ—76—fRfÇVW2âv†Vâæò6öÆ÷W"ÖW†—7G2Â6öÖÖ—GFVB66Æ"&Wf–Ww2F†W&Vf÷&R&WÆ6RF†R6÷W&6R7GVF–ò6†F–ærâ&WW6RF†R÷&–v–æÂ&öG’ÖFW&–Â2F†RfÆÆ&6³¢66Æ"ÖöæÇ’Ö2&WF–â&6R6öÆ÷W"Â6÷W&6R&÷Vv†æW72v†Vâæò&÷Vv†æW72Ö—2&W6VçBÂVÖ—76—fR6öÆ÷W"ö–çFVç6—G’æBVçf—&öæÖVçB–çFVç6—G’â–çFVB6öÆ÷W"Ö27F–ÆÂ&WÆ6RÆ&VFòÂæB66Æ"Ö26öçF–çVRW6–ærF†V—"÷&–v–æÂ6†ææVÂFFâW†—7F–ær7GVF–ò&VæFW"ÖÖöFR&V'V–ÆBÂ6†F÷w2æBÖFW&–ÂÖÖ÷væW'2&VÖ–â–âÆ6Rà ¥6×VFvR&W6W'fö—"6''’–æ7&V6W2g&öÒSRFòƒRÂÖ¶–ærÖ—†VB6öÆ÷W"G&fVÂÖ÷&R7G&öævÇ’&WGvVVâF'2âW†—7F–ær&V×VÇF—Æ–VBÇ†Â6öææV7FVBÖæ–föÆBÖf6RfW&v–ærÂUbÖ—6ÆæB—6öÆF–öâÂv÷&²'VFvWBæB6æ6VÆÆF–öâ&V†f–÷"&VÖ–â6÷fW&VBâæòæWr–çB¶W&æVÂ÷"ö–çFW"÷væW"à ¤FFVB6öÖÖ—GFVBÖWFÆæW72ÖöæÇ’ÖFW&–Â&Vw&W76–öâæBWFFVBW†7B6×VFvR÷WGWB6†V6·2f÷"&VwVÆ"ÂÇ†æB&÷FFVBöÖ—'&÷&VB6öææV7FVB7W&f6W2âfö7W6VBf–æÂ–çBÂ6×VFvRÂ&VÆV6RæB6†VÆÂ6WC¢Cb52òd”ÂâgVÆÂæöFR7V—FS¢2Ã“"52òd”Âò6¶—VBƒã#‡2’â6†ævVB¦f67&—B7–çF‚æBv—BF–fbÒÖ6†V6¶72â†÷7FVBV&Æ–6F–öâ6†V6·2&VÖ–âVæF–ærâ&÷FV7FVB7&2ö×VÇF’Öö&¦V7B×G&ç6f÷&Òæ§3÷cÓã3bãã—2Væ6†ævVBà ¤DUd”4SCc¢–çBÖWFÆæW72öâ7GVF–òö&¦V7Bv—F‚æò–çFVB6öÆ÷W"ÖÂFFöæRæB6öæf—&ÒF†R÷&–v–æÂ7GVF–òV&æ6R÷6†F÷w2&WGW&âv†–ÆRÖWFÆæW72&VÖ–ç2f—6–&ÆS²&WVBv—F‚6öÆ÷W"Öâ6×VFvR&WGvVVâ6öçG&7F–ær6öÆ÷W'2æB7&÷72föÆFVB6öææV7FVBVFvS²fW&–g’7G&öævW"6''’æBöæR×7FWVæFòõ&VFòà 