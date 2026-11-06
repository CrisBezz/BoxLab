Warning: truncated output (original token count: 364180)
... 408143 bytes omitted ...

## .1000 — UV Paint handoff and Facegroups → UV Seams — 27 October 2026

User says “PASS 999 so far”. Record PROVISIONAL .999 PASS and protect the exact
main/styles/retired-atmosphere startup baseline. This is not an unlimited native
visibility acceptance. User explicitly requests the next UV/Facegroups workflow.

UV PAINT now uses the existing paintTargetKey validator before entering Paint.
Missing/stale/incompatible UVs open the ORIGINAL UV session through __boxlabUVTools,
with “Valid UVs required for UV Paint” at the TOP. No UV/paint/history is authored
by the redirect. Valid targets in Facegroups view switch through the existing Studio
button, stopping the original Facegroup stroke/dock owners, before Paint opens.
Finished UV-tools sessions hand off directly to bottom UV PAINT; busy unwraps require
Finish/Cancel first. Existing other-tool protections remain intact.

UV menu adds “Facegroups → UV Seams”, orbitable orange boundary preview, explicit
“Confirm UV Unwrap”, elapsed timer and Cancel. Preview has no history or UV edits,
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

DEVICE1000: (1) no-UV object → UV PAINT → original UV menu + top reminder;
(2) valid UV object in Facegroups → UV PAINT → Studio + paint;
(3) UV → Facegroups → UV Seams → orbit/check → Confirm UV Unwrap → timer → checker
and orange boundaries; (4) Undo/Redo and Save/Open retain UVs/groups; Cancel creates
no UV/history edits. Also check .999 initial/right viewport remains healthy.
Current build .1000; feature acceptance pending device test.

## .999 — rebuild initial viewport baseline; .998 FAIL — 27 October 2026

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

## .998 — Facegroups transition repair, native acceptance pending — 27 October 2026

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

## 2026-10-05 — v0.36.18.732: popup comfort, background exits, Array, Inset Repeat and right Object Browser

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



## 2026-10-04 — v0.36.18.705 arbitrary-plane Align to Face

- Implemented the queued user request in the existing Face Align pop-out, beside X/Y/Z; no ring changes. .702/.703/.704 hands-on still pending, no implied PASS.
- Audited component Align, Make Planar and surface-transform face-to-face maths. Extended existing Align core/anchor owner; reused surfaceAlignmentQuaternion .442 and Mesh Health .443. Make Planar remains a distinct projection tool. No parallel modelling/viewport gesture owner.
- Candidate placement rotates planar moving Faces rigidly, then translates along fixed Face normal only. Disjoint group uses centre pivot; shared points/edges may hinge if fixed vertices remain stationary. Opposing winding does not force a 180-degree rotation.
- Nonplanar moving groups, invalid/warped anchors, shared conflicts, coincident/zero-area affected neighbours, topology-gate failures and increased zero-area health count reject before history/live mutation. Rejection reason stays visible; Cancel/another anchor remain possible. Changed success adds one Undo, preserves selection/puck; already coplanar completes without history.
- 48 targeted group/shape/arbitrary-plane/hinge/tangential-position/owner/Undo/Redo/rejection/XYZ/proxy/repair/dock/background/Bridge/value/release checks PASS; syntax PASS. Full suite: 1132 tests, 847 PASS, same 285 failure names as .704; no new failures. Release markers and changed owner/core/dynamic parent/viewport/refresh pins .705; protected transform, Loop Cut, Through and ring layout untouched.
- Next: hands-on confirmation, remaining Face repair/parameter audit, then Vertex → Object → final Edge. No unrelated development.


## 2026-10-04 — Align to Face queued for next /nextbuild

- User approved adding arbitrary-plane Align to Face to the next build's content, beside X/Y/Z in the existing Align pop-out.
- Workflow: select moving planar Face(s) plus anchor, choose Align to Face, tap selected fixed Face. Rotate moving group rigidly and translate along anchor normal onto its plane; preserve group shape and anchor vertices; reject bent/unsupported groups with no mutation.
- Existing anchor owner/face-to-face maths must be audited before implementation; shared-vertex/validity guards, one-step Undo, selection/puck completion and unchanged X/Y/Z required. Top-centre settings; no extra radial sector or pointer owner.
- Documentation-only queue update; runtime/release markers remain v0.36.18.704. No new PASS recorded and no new hands-on test needed for this planning update. Next runtime build implements this option before resuming other Face gaps.


## 2026-10-04 — v0.36.18.704 Face radial Clean Vertices / Align

- /nextbuild continues radial completion only; no explicit .703 PASS received. .702/.703 hands-on remain pending.
- Audited existing safe Clean Vertices owner and Face Repair proxy. Added outer Clean Vertices plus existing whole-object scope panel access. Owner plan/cleanup/history unchanged; apply now returns explicit result and exposes syncUI for contextual availability. Success clears stale Face IDs; Cancel preserves them.
- Audited existing component Align .330 anchor owner/core. Added one Align sector and top-centre X/Y/Z/Cancel proxy. Axis selection arms existing owner; selected Face anchor remains fixed, other selected vertices align on that axis, same one-step history/selection. Owner emits semantic arm/disarm/apply change and exposes axis; proxy completion clears hub suppression without another viewport pointer owner.
- Eight inner unchanged, fourteen outer at 205px; all previous targets retained and outer/outer + outer/inner rectangle spacing PASS. Centre × unchanged. Selection helpers remain outside rings.
- 36 targeted owner/core/proxy/repair/dock/background/Bridge/value/release checks PASS; syntax PASS. Full suite: 1120 tests, 835 PASS, same 285 failure names as .703. Two Align tests now verify a single versioned loader rather than the old .330 pin.
- .704 release markers, changed modules and drawer dynamic parent/child pins updated; protected transform/.162 Loop Cut/Through and modelling kernels unchanged. Workflow priority unchanged: finish Face (remaining repair/parameter audit), then Vertex → Object → final Edge. Hands-on pending.


## 2026-10-04 — v0.36.18.703 radial Face repair batch

- User directs all development moving forward at finalizing radial menus/settings: Face → Vertex → Object → final Edge; unrelated gesture/topology/feature work deferred. .702 hands-on remains pending.
- Audited existing Close Holes .201, Quad Cleanup .205 and Quadify N-gons .203 owners, already loaded by face-workflow-layout. Added three active outer sectors; kernels, transaction gates/history and legacy pins unchanged.
- Shared top-centre whole-active-object scope panel delegates existing APIs on Apply only. Cancel preserves original geometry/selection; failure shows owner reason without clearing selection. Success clears stale Face indices and emits shared session completion; next Face tap gets fresh puck. Mode/mesh changes close; locked/reference active objects blocked.
- Eight inner/twelve outer tools, outer175px/30-degree spacing; all prior targets retained, outer/outer and outer/inner rectangle spacing PASS. Protected inner positions unchanged. No selection helpers or new viewport pointer owner.
- 21 targeted lifecycle/dock/background/Bridge/value/release checks PASS; syntax PASS. Full suite: 1112 tests, 827 PASS, same 285 failures as .702; failure names compared, no new failures. .703 markers/gizmo/new-panel/main-loader/refresh pins updated. Protected transform and .162 Loop Cut untouched. Hands-on pending.

## 2026-10-04 — v0.36.18.702 active-tool-only radial correction

- User confirmed .701 PASS, then corrected product scope: radial menus are for active tools; selections belong to long press/gestures.
- Removed Coplanar/Connected radial sectors and selection-only completion labels; restored eight inner/nine outer active tools at 82/145 px. Authoritative selection commands and gesture owners untouched.
- Detached/Quads additions were only a local draft and were discarded before publishing. Failed direction recorded: do not equate every drawer command with an active radial tool.
- All seventeen active targets retained. Top-centre popup/background Done behavior protected. 15 targeted dock/background/proxy/Bridge/release checks PASS; syntax PASS.
- Updated .702 markers, gizmo/main-loader/refresh pins and workflow/roadmap/handoff. Next audit remaining Face active modelling/repair settings, then Vertex/Object/final Edge. Hands-on confirmation pending.


## 2026-10-03 — v0.36.18.701 radial Coplanar / Connected Face selection

- User confirmed .700 PASS; top-centre panels, background Done and protected navigation recorded.
- Audited existing select-coplanar-region / select-connected-shell owners already loaded by drawer-ui. Added Coplanar/Connected outer sectors; proxy their one-seed validation and selection/Multi behavior, use shared one-shot cleanup.
- Coplanar selects the connected flat region; Connected selects the entire bent/flat edge-connected shell. Neither changes geometry/history. No selection kernel or raw-pointer owner added.
- Outer ring expands to eleven evenly spaced sectors at 170 px; all previous targets/eight inner positions retained. Outer/outer and outer/inner rectangle spacing audited.
- 15 protected dock/background/proxy/Bridge/release checks PASS; syntax PASS. .701 markers/gizmo/main-loader/refresh pins updated; shared dock/session pins retain .700. Hands-on confirmation pending.
- Continue remaining Face helper/repair/settings access before Vertex, Object and final Edge; whole-mesh repair scope must be explicit.


## 2026-10-03 — v0.36.18.700 top-centre session popups / background Done

- User confirmed .699 perfect and directed every tool-session popup to top centre; background tap should replace needing Done for Extrude/Inset.
- Audited ten selection-hub session panels and floating numeric entry. Shared dock helper replaces selection-relative placement; viewport bounded/scrollable. Radial/gizmo positions untouched.
- Existing main/direct tap owners emit a semantic background completion; existing Pencil orbit tap semantic reused. Settings proxy calls its existing Done path, preserves selection, disarms Repeat/tool. No parallel pointer owner.
- Armed Face main guard admits only contextual background input; second pointer cancels a pending single tap. Drags/multi-touch bypass dismissal; ordinary background behavior retained outside settings.
- 15 targeted dock/background/proxy/Bridge/release tests PASS. Changed module/loader/refresh pins .700; protected transform, Loop Cut and modelling kernels unchanged. Hands-on confirmation pending.
- Workflow/roadmap record top-centre placement as the rule for every future session popup.
- CI exposed two .520 static guard assertions made obsolete by the scoped background exception; replaced only those with executable owner-guard checks. Historic release-pin assertion remains in the existing failure baseline.


## 2026-10-03 — v0.36.18.699 contextual Extrude / Inset settings

- User confirmed .698 full list PASS; Face Bridge session, fresh puck, ring spacing and centred × protected.
- Audited precision-face and repeat-face-previous owners. New viewport settings proxy exposes Exact/Repeat/Done from radial Extrude/Inset; delegates existing APIs and mirrors readout/availability.
- Done ends existing Repeat/direct arming and uses shared Face completion; another radial command hides settings without resetting its lifecycle. No geometry/history/precision kernel or viewport pointer owner changed.
- Ring layout unchanged; drawer controls retained until hands-on PASS. 10 targeted proxy/Bridge lifecycle/release checks PASS.
- Release .699 markers, gizmo/new proxy and refresh pins updated; Bridge pins retained .698. Continue remaining Face helper/repair/settings audit before Vertex, Object and final Edge.


## 2026-10-03 — v0.36.18.698 radial Face Bridge preview and centred close

- User confirmed .697 full list PASS; orientation workflows protected. Requested centre × alignment included.
- Audited existing Face Bridge preview owner. Added state API and semantic lifecycle events; viewport proxy forwards existing Next/Use/Cancel without another modelling kernel.
- Radial Bridge extends outer ring to nine evenly spaced sectors; inner eight and all previous tool targets retained. Hub stays hidden during preview; Cancel returns selected original puck; Use clears selection, completion clears stale suppression.
- Centre × overrides inherited generic button padding/min-height and flex-centres content.
- 7 targeted lifecycle/release tests PASS. Release markers and changed owner/proxy/refresh pins updated to .698. Protected Edge Bridge, transform and Loop Cut owners untouched. Hands-on checks pending.


## 2026-10-03 — v0.36.18.697 outer Face orientation tools

- User confirmed .696 full manual list PASS; Triangulate/Flip Faces selection, disabled state, puck return and Undo protected.
- Audited existing orient-faces.js / orient-shell-outward.js owners and their face-workflow-layout loader. Added Orient Faces (270°) and Orient Outward (315°) proxies plus shared one-shot cleanup.
- Connected patch orientation preserves the lowest-index seed; closed-shell orientation uses signed volume. Existing validation, selection and history remain authoritative; eligible no-change actions return puck without history.
- All fourteen previous sectors preserved; eight inner/eight outer positions are populated but Face coverage is not yet complete. Bridge preview and remaining settings/selection/repair access require audit.
- Release markers and gizmo/refresh pins updated to .697; syntax/release checks PASS. Hands-on confirmation pending. No modelling kernel or pointer owner changed.


## 2026-10-03 — v0.36.18.696 outer Face Triangulate / Flip Faces

- User confirmed the full .695 list PASS; Poke/Make Planar validation, selection, puck return and Undo are protected.
- Audited existing triangulate-faces.js and flip-faces.js owners loaded by face-workflow-layout.js. Added outer sectors at 180/225 degrees, proxying their buttons and shared one-shot cleanup.
- Triangulate selects result triangles and preserves winding; triangle-only selections remain disabled. Flip Faces reverses selected winding and preserves selection. Each uses existing one-step history.
- No modelling kernels or pointer owners changed; all twelve prior Face sectors retained. Release markers and gizmo/refresh pins updated to .696.
- Syntax and release-contract checks PASS; hands-on confirmation pending. Continue Face Bridge/orientation gaps before Vertex, Object and final Edge.

## 2026-10-03 — v0.36.18.695 outer Face Poke / Make Planar

- User confirmed .694 full hands-on list PASS; two-ring Join/Circle layout and one-shot lifecycles protected. User requested continuing two additions per build.
- Audited Poke and Make Planar: existing owners already load through face-workflow-layout.js; preserve their validators, geometry/history and selection semantics.
- Added direct outer-ring Poke (90°) and Make Planar (135°), reusing shared disabled-state feedback and one-shot puck cleanup.
- Poke adds centre-vertex triangle fans to selected suitable Faces. Make Planar enables for exactly one warped Face; already planar/multiple Faces are disabled by the authoritative owner.
- No modelling owner, settings panel or raw-pointer gesture owner changed. Previous ten sectors remain intact.
- .695 shell/manifest/gizmo/refresh pins updated; syntax/release tests PASS. Hands-on checks pending. Continue Face gaps before Vertex, Object and final Edge.

## 2026-10-03 — v0.36.18.694 Face outer ring / Circle

- User requested concentric tool rings; populate Face tools before jointly assigning inner/main versus outer/secondary. More remains an accepted fallback if the complete layout is crowded.
- Removed .693 More toggle/panel and placed Join Coplanar directly on a 145 px outer ring alongside newly exposed Circle. Existing eight inner sectors remain at 82 px.
- Circle delegates to #componentCircleBtn and authoritative circularize/history owner. Join owner retained. Both share existing disabled-state feedback and one-shot puck cleanup.
- Combined two related contextual additions into one testable release; no geometry kernel or gesture ownership changes. .693 superseded without an explicit PASS; .692 remains pending.
- Shell/manifest/gizmo/refresh pins updated; syntax and release-owner checks PASS. Handoff records provisional ring assignments and fallback.

## 2026-10-03 — v0.36.18.693 Face More / Join Coplanar

- Returned to user-directed Face radial gap completion. Existing ring had eight primary sectors; Join Coplanar Faces remained drawer-only.
- Added More… toggle and nearby pop-out with Join Coplanar, preserving all primary sector positions.
- Delegates to #joinSelectedCoplanarFacesBtn; disabled state mirrors existing validator. The existing topology/history owner is unchanged.
- Successful one-shot completion clears stale suppression and returns the selected-result puck, sharing the existing radial one-shot cleanup.
- Pop-out toggles closed, resets on hub transitions and flips to the left near the right viewport edge. No new raw-pointer gesture owner or modelling kernel.
- Syntax and release-owner tests PASS. Updated shell/manifest and total-gizmo/refresh pins to .693. Protected transform/Loop Cut/Face session owners unchanged.
- Hands-on checks pending. .692 Edge neutral-return PASS is still pending. Next: continue remaining Face contextual gaps, then Vertex, Object and final Edge.

## 2026-10-03 — radial completion priority clarified

- User clarified that the primary push is contextual radial menus plus nearby pop-out settings, reducing routine left-drawer dependency.
- Required order: finish Face gaps, then Vertex, Object, and finally Edge completeness.
- .690 completed the existing Face ring lifecycle, not all Face contextual tool/settings coverage. Previous broader-modeless wording overstated overall completion and redirected development prematurely.
- Existing protected Face/Edge flows remain intact. .691 PASS remains protected; published .692 Edge parity checks remain pending. No new runtime build in this priority correction.
- Next step: audit full Face drawer against the current 8-sector ring and repair/expose existing action/settings owners one gap at a time. No parallel kernels or bulk drawer removal.

## 2026-10-03 — v0.36.18.692 Edge vertical scrub neutral return

- User confirmed .691 Face Grow/Shrink neutral return manual list PASS; now protected.
- Re-audited main a43e06ab. Edge vertical Grow/Shrink uses the same existing main.js scrub owner; no separate implementation is needed.
- Extended the neutral-band type gate from Face to Face/Edge. Returning within 18 px of the hold origin restores the fixed starting Edge selection without applying Grow/Shrink.
- Existing 30 px step scaling, sideways Loop/Ring/Boundary enumeration, additive base merge, release/cancel owners, radial tools and Loop Cut remain unchanged. Vertex unchanged.
- 12/12 targeted behavioral/release tests PASS, covering Edge Grow/reversal/neutral, multi-edge Shrink/neutral, band boundary and protected Face .691 behavior.
- Updated all release markers plus main.js / release-bootstrap.js / release-version.js pins to .692; protected multi-object-transform.js?v=0.36.1.0 unchanged.
- .692 awaits hands-on confirmation. The full CI baseline has 285 existing failures; historical test cleanup remains separate.

## 2026-10-03 — v0.36.18.691 Face vertical scrub neutral return

- User confirmed the full .690 refreshed-shell manual checks PASS. Face radial lifecycle is complete and protected, including Shell/Sweep exit cleanup and Knife Done.
- Re-audited current main and modeless gesture history. Grow/Shrink hold gestures already existed in main.js; .617–.619 multi-tap experiments had been abandoned.
- Repaired one existing gesture: Face vertical hold scrub now returns to its fixed starting selection within an 18 px neutral band instead of applying an unwanted one-step Shrink/Grow.
- Existing authoritative Grow/Shrink buttons and 30 px scaling retained; no new raw-pointer owner or selection kernel.
- Edge/Vertex behavior, radial sessions, Pencil/Object routing, Loop Cut core and protected multi-object-transform remain untouched.
- Behavioral integration tests exercise actual main scrub + advanced-selection owners: Grow/reverse/neutral, Shrink/neutral, band boundary, unchanged Edge/Vertex. Release-version contract checked.
- .691 awaits hands-on confirmation; release markers and main.js pin updated together.
- Publication follow-up: CI detected release-version pin must equal manifest version; both release refresh owners repinned to .691 without logic changes. Targeted behavioral/release tests 9/9 PASS.
- Compared full CI against .690 runtime 8efc9589: 285 existing failures; only additional .691 failure was the stale release-version pin, now corrected. Historical tests need a separate audit.

## 2026-10-03 — v0.36.18.690 stale-shell refresh hardening / handoff prep

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

## 2026-10-03 — v0.36.18.690 unified radial Face session completion

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

## 2026-10-03 — v0.36.18.689 radial Face Delete hub cleanup

- .688 restored known-good Loop Cut / Loop Slide feel hands-on PASS.
- Audited radial Face Delete.
- Delete topology/history owner already correct; no panel needed.
- Added post-action Selection Hub cleanup:
  - clears stale suppressed Face key
  - restores puck if a valid Face selection survives
  - otherwise waits hidden for the next Face selection
- Prevents future Face selections from inheriting stale suppression.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 — v0.36.18.688 hands-on PASS

- Restored known-good Loop Cut behaviour confirmed.
- Loop Slide old feel confirmed PASS.
- Treat the v0.36.18.162 logical-quad path as protected.
- Complex multi-collinear logical-quad traversal remains a separate strengthening item.

## 2026-10-03 — v0.36.18.688 restore known-good Loop Cut core

- .685-.687 generalized logical-quad work did not preserve the previous Loop Cut quality.
- User confirmed .687 still felt wrong.
- Compared current code against the actual known-good v0.36.18.161/.162 history.
- Restored src/loop-cut-added-vertex.js from v0.36.18.162.
- This restores the original logical Add-vertex traversal/reconstruction/slide contract.
- Removed generalized arbitrary-collinear-face behaviour from the live core.
- Complex screenshot topology is moved to strengthening rather than risking the protected Loop Cut path.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 — v0.36.18.687 restore clicked-edge Loop Slide direction

- .686 kept strengthened Loop Cut traversal and fixed malformed strip reconstruction.
- User reported live Loop Slide moved opposite to the expected direction.
- Root cause: promoted logical side direction came from face ordering instead of the physical edge segment actually touched.
- Added logicalSeedDirection() to map clicked physical edge direction onto the logical side.
- Ring propagation now inherits that original physical direction.
- .686 reconstruction remains unchanged.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 — v0.36.18.686 Loop Cut strip reconstruction fix

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

## 2026-10-03 — v0.36.18.685 generalized logical-quad Loop Cut

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

## 2026-10-03 — v0.36.18.684 radial Knife viewport session

- Continued Face-ring/modeless polish with Knife.
- Existing Knife topology/snap/history implementation retained.
- Added minimal Knife lifecycle API/events.
- Radial Knife now opens a compact “Knife active / Done” viewport session.
- Knife remains armed after each cut for repeated cuts.
- Done disarms Knife, clears stale Selection Hub suppression, and leaves the next Face selection ready for a fresh puck.
- Left-panel Knife remains unchanged.
- No Knife geometry kernel changed.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 — v0.36.18.683 radial Extract Faces Object handoff

- Continued Face-ring polish after .682 PERFECT PASS.
- Existing Extract Faces topology/object implementation retained.
- Added semantic completion event after successful Extract.
- Total Gizmo now hands the new Extracted Faces object directly into Object transform mode.
- Background dismiss / Pencil orbit / object reselect all reuse the protected .682 lifecycle.
- No Extract geometry or history implementation changed.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 — v0.36.18.682 hands-on PERFECT PASS

- Pencil background tap dismissal reliable.
- Pencil object tap reliably restores Object gizmo.
- Pencil drag on background still orbits.
- Finger background dismiss remains correct.
- Object-mode gizmo lifecycle is now protected.

## 2026-10-03 — v0.36.18.682 Pencil/Object routing reliability

- .681 Pencil background dismiss was intermittent and Pencil object taps could select without restoring gizmo.
- Exposed the authoritative Object body picker from main.js via __boxlabSelectionBridge.pickObject().
- Total Gizmo now uses that picker for Object gizmo re-open detection.
- Pencil background tap candidate now starts at window capture rather than inside OrbitControls wrapper.
- Orbit drag still marks candidate as claimed and suppresses tap completion.
- No transform geometry implementation changed.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 — v0.36.18.681 Pencil background tap dismiss

- Finger background tap correctly dismissed Object transform after .680.
- Pencil background tap did not because Pencil navigation is owned by pencil-orbit-gate.
- Added background Pencil tap recognition in pencil-orbit-gate.
- Stationary Pencil contact under 8 px emits boxlab-pencil-background-tap.
- Orbit-claimed Pencil drags do not emit tap event.
- Total Gizmo consumes that semantic event to dismiss Object transform.
- Pencil orbit remains unchanged for actual drag gestures.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 — v0.36.18.680 Total Gizmo parse regression fix

- .679 caused the gizmo to disappear completely.
- Root cause was a duplicate top-level const canvas declaration introduced by the Object background-dismiss patch.
- JavaScript module failed to parse, so Total Gizmo never initialised.
- Removed the duplicate declaration and reused the existing canvas owner.
- .679 background-dismiss lifecycle logic is otherwise preserved.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-03 — v0.36.18.679 Object transform background dismiss

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

## 2026-10-03 — v0.36.18.678 radial Duplicate Faces restored

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

## 2026-10-03 — v0.36.18.677 radial Edge one-shot hub cleanup

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

## 2026-10-03 — v0.36.18.676 guided radial Edge Bridge

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

## 2026-10-03 — v0.36.18.676 modeless radial Bridge completion

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

## 2026-10-02 — v0.36.18.675 recover stale camera disable

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

## 2026-10-02 — v0.36.18.673 touch navigation stale-pointer fix

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

## 2026-10-02 — v0.36.18.672 Edge Slide viewport session

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

## 2026-10-02 — v0.36.18.671 Offset Loop viewport session

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

## 2026-10-02 — v0.36.18.670 selection-first radial Crease

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

## 2026-10-02 — v0.36.18.669 hardened radial Crease viewport launch

- .668 Crease viewport panel did not appear hands-on.
- Audited Total Gizmo radial order: target click occurs before semantic event dispatch.
- Replaced listener-only launch dependence with explicit Total Gizmo -> Crease session openFromHub() handshake after the real Crease button is activated.
- Kept semantic event listener as fallback.
- Reasserts panel visibility next animation frame to survive immediate UI/render sync.
- No Crease topology/history implementation changed.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-02 — v0.36.18.668 Crease viewport session

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

## 2026-10-02 — v0.36.18.667 transactional Edge Extrude exit

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

## 2026-10-02 — v0.36.18.666 Edge Extrude exit returns to puck

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

## 2026-10-02 — v0.36.18.664 Edge Extrude side constraint palette

- .663 Edge Extrude itself works hands-on.
- UX feedback: centred mini gizmo implied that arrows should be dragged to extrude, even though the preferred interaction remains drag-the-edge.
- Preserved the existing drag-on-edge extrusion owner and moved only the contextual constraint UI.
- Extrude constraint gizmo now sits offset beside the selected boundary Edge/chain and flips sides near the viewport edge.
- Added compact contextual badge showing:
  - Extrude
  - active Plane/X/Y/Z constraint
  - “Choose constraint • drag edge”
- Active constraint handle is highlighted.
- X/Y/Z and centre remain selector-only; they do not transform geometry.
- Palette follows the newly selected outer rail after a successful repeat pull.
- No Edge Extrude topology or history logic changed.
- src/multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-02 — v0.36.18.663 Edge Extrude gizmo constraint session

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

## 2026-10-02 — v0.36.18.662 Bevel viewport session

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

## 2026-10-02 — v0.36.18.661 publish pin correction for .660 ownership fixes

- .660 source changes landed correctly.
- Static audit found index.html still loaded direct-bevel.js?v=0.36.18.253.
- Therefore the Bevel post-commit disarm fix would not reliably reach the browser.
- .661 repins direct-bevel.js, main.js, and pencil-orbit-gate.js to the current release so the complete ownership fix is actually loaded.
- No behaviour/code logic changed from .660.

## 2026-10-02 — v0.36.18.660 Loop Cut drag ownership + Bevel post-commit reset

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

## 2026-10-02 — v0.36.18.659 additive Edge hold selection with replacement browsing

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

## 2026-10-02 — v0.36.18.658 contextual radial availability mirroring

- .657 closed Face Boundary candidate selection hands-on AWESOME / PASS.
- Added truthful availability state to Face + Edge Selection Hub radial sectors.
- Each radial sector now mirrors its authoritative target button:
  - target enabled -> normal sector
  - target disabled/missing -> sector disabled + visibly dimmed + × marker
  - target active/aria-pressed -> active highlight
- Disabled sectors remain visible so the user can learn which tools exist, but cannot be activated.
- Availability sync runs:
  - when tools ring opens,
  - after bridge-state changes,
  - after click/pointerup UI state changes,
  - after transform tool button changes.
- Click path re-syncs before dispatching and exits immediately if sector is disabled.
- No modelling tool owner or geometry logic changed.

## 2026-10-02 — v0.36.18.657 actual closed Face Boundary candidate implementation

- Corrects the incomplete .656 publish where version/docs landed but the helper insertion into main.js did not.
- Added edgeIndexByVertices(a,b).
- Added faceBoundaryCandidatesForEdge(seedIndex).
- collectEdgeHoldCandidates now adds every valid incident Face perimeter as kind "Face Boundary" before generic Boundary/Ring.
- .655 candidate replacement semantics remain unchanged.

## 2026-10-02 — v0.36.18.656 Edge hold adds closed Face Boundary candidates

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

## 2026-10-02 — v0.36.18.655 Edge hold-browser transactional selection cleanup

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

## 2026-10-02 — v0.36.18.654 Edge Selection Hub v1

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

## 2026-10-01 — v0.36.18.653 Selection Hub Shell viewport session

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

## 2026-10-01 — v0.36.18.652 armed Face tool yields background Pencil-down to navigation

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

## 2026-10-01 — v0.36.18.651 deferred Pencil mesh-intent -> orbit handoff

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

## 2026-10-01 — v0.36.18.650 lifecycle-tracked Pencil contact

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

## 2026-10-01 — v0.36.18.649 restore Selection Hub puck after direct Face commit

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

## 2026-10-01 — v0.36.18.648 Pencil contact classification fix

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

## 2026-10-01 — v0.36.18.647 explicit OrbitControls registration handoff

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

## 2026-10-01 — v0.36.18.646 Pencil orbit arbitration diagnostics

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

## 2026-10-01 — v0.36.18.645 explicit Face-direct Pencil capture release

- .644 FAIL for the reported post-Through Pencil-orbit regression; disarming Extrude alone was insufficient.
- Deeper ownership audit found multi-face-direct captures the Pencil on canvas pointerdown but its window-capture finish consumes pointerup before canvas-level Pencil/orbit cleanup can observe it.
- multi-face-direct now explicitly releases its own canvas pointer capture before stopImmediatePropagation on every owned completion path: background press, Face press and direct Extrude/Inset drag.
- This follows the ownership rule that the subsystem acquiring pointer capture is responsible for releasing it when global capture completion prevents downstream listeners from seeing pointerup.
- Successful Through still disarms Extrude as introduced in .644.
- Added post-release pointerCapture state to FACE DIRECT THROUGH RELEASE diagnostics.
- No Through topology, selection gesture, Sweep session or gizmo code changed.

## 2026-10-01 — v0.36.18.644 release Pencil orbit after successful Extrude Through

- .643 Sweep viewport session is hands-on AWESOME / PASS.
- Hands-on exposed a navigation regression specifically after successful Extrude Through: Apple Pencil could no longer orbit the viewport.
- Root cause: successful Through intentionally cleared Face selection but left Extrude armed. With no selected Face, the still-armed direct Face owner captured the next background Pencil pointerdown before Pencil-orbit could begin.
- Successful Through now completes the direct-tool session: clears selection as before, clears sequential state, disarms Extrude, clears pending Face/background ownership, syncs the UI, and emits tool-exclusive none.
- Added FACE DIRECT THROUGH RELEASE debug marker.
- Normal Extrude and Inset persistence are unchanged; only successful Through completion disarms the direct tool.
- Through topology/build/gate logic is untouched.

## 2026-10-01 — v0.36.18.643 Selection Hub Sweep viewport session

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

## 2026-10-01 — v0.36.18.642 Selection Hub v1 — Face contextual tool ring

- Added first viewport-first Selection Hub prototype on top of the protected .640 interaction checkpoint.
- Face selection hub has three mutually exclusive states: closed puck -> transform gizmo -> contextual tools ring -> closed puck.
- Transform and Tools states never coexist; the gizmo SVG is physically absent from hit testing while the tool ring is open.
- Face tool ring v1 proxies existing authoritative actions: Extrude, Inset, Knife, Duplicate, Extract, Shell, Sweep and Delete.
- No modelling kernel is duplicated; tool sectors trigger the existing buttons at click time.
- Choosing a tool immediately hides/suppresses the whole hub for the current selection so the launched tool owns the viewport without clutter or competing hit targets.
- The hub restarts at the closed puck only when the component selection changes.
- Existing suspended Face-tool ownership is preserved across Transform -> Tools -> Closed cycling; choosing a new tool clears any suspended old Face tool before launching the new owner.
- Edge/Vertex contextual rings are intentionally deferred until Face v1 is hands-on proven.

## 2026-10-01 — v0.36.18.641 Make Unique authoritative materialization

- .640 hands-on PASS; freeze .640 as the protected modeless-selection / dormant-gizmo / Face-direct interaction checkpoint.
- Audited the remaining Phase C Make Unique robustness item.
- Previous Make Unique detached linked metadata from inactive objects while trusting object.mesh to already be the current evaluated world mesh.
- Added authoritative linked-instance materialization from source mesh + instanceMatrix immediately before detaching.
- Active and inactive instances now become standalone meshes at their exact current world placement; active live mesh is refreshed from that same materialized result.
- Multi Make Unique keeps one existing Object-scene history checkpoint and refreshes Object selection/render after detaching.
- Linked source geometry, instance placement, grouping and naming remain unchanged for peers that stay linked.
- Protected multi-object-transform.js?v=0.36.1.0 remains untouched.

## 2026-10-01 — v0.36.18.640 global Face-direct release ownership

- Hands-on .639 exposed Extrude preview snapping back when Apple Pencil lifted.
- Preview topology was visibly correct during drag; release returned to the pre-drag mesh without a topology-gate rollback message.
- multi-face-direct still completed Extrude/Inset at document capture, despite the repo's established interaction rule that critical completion must run at window capture to survive lower-level owners and overlays.
- Moved Face-direct pointerup/pointercancel completion to window capture.
- Added FACE DIRECT FINISH Gesture Debug marker including event type, drag/preview/blocked state and pointer id so any Safari pointercancel is immediately visible.
- No Extrude/Inset topology maths, Through logic, selection gestures, gizmo maths or protected multi-object-transform code changed.

## 2026-10-01 — v0.36.18.639 collapsed gizmo is physically non-interactive

- Hands-on .638 exposed that dormant Total Gizmo handles were visually hidden but still hittable in Safari.
- Root cause: generated SVG hit proxies carry inline pointer-events:stroke, so the old transparent/pointer-events-none SVG container was not a sufficiently hard interaction boundary.
- Collapsed component gizmo now removes the entire SVG handle subtree from hit testing with display:none; only the dormant puck remains interactive.
- Added a runtime onHandleDown guard that rejects any component handle event while expanded=false, protecting against stale/race events even if browser hit-testing changes.
- Expanded gizmo behavior, transform maths, Vertex puck offset, selection gestures and protected multi-object transform are unchanged.

## 2026-10-01 — v0.36.18.638 vertical Grow/Shrink gestures + Vertex hold access

- .637 hands-on PASS.
- Added the completion gesture for dense component selections: after long-hold, drag UP to Grow and DOWN to Shrink.
- Face and Edge keep their existing horizontal candidate browsers; once scrub intent is clear, the gesture axis locks horizontal or vertical so the two behaviours cannot fight.
- Vertical preview is deterministic: each pointer position restores the selection snapshot from hold-fire time, then applies exactly N authoritative Grow/Shrink button operations. Moving back toward the hold point therefore reduces steps instead of accumulating runaway changes.
- Vertex now participates in modeless hold gestures with vertical Grow/Shrink only; no artificial Vertex Loop/Ring concept was introduced.
- The dormant gizmo puck is offset up/right for a single selected Vertex so the seed vertex itself remains available for press-and-hold. Multi-vertex puck placement remains at the selection centroid.
- Paint Select yields once any Vertex/Edge/Face hold gesture has fired.
- Existing advanced-selection.js Grow/Shrink logic remains authoritative; no duplicate adjacency solver was added.
- No transform maths, Face topology maths, Group/Multi routing or protected multi-object-transform code changed.

## 2026-10-01 — v0.36.18.637 single-owner restore after gizmo collapse

- .636 hands-on PASS: explicit Face gizmo transforms now work over previously armed Extrude without click-through.
- Hardened the collapse path so a suspended Extrude/Inset resumes only after Move/Scale/Rotate transform arming has been fully disarmed and transient gizmo state cleared.
- Prevents a latent two-owner state where a Face direct tool and transform tool could both remain logically armed after closing the gizmo.
- No gesture semantics, transform maths, Face topology maths, Group/Multi routing, or protected multi-object-transform code changed.

## 2026-10-01 — v0.36.18.636 gizmo owns explicit transform over armed Face tools

- Video review of .635 showed component Face selection gestures and multi-Extrude working, plus outer-ring scale, but axis/handle presses could select geometry through the gizmo.
- Gesture Debug showed the exact path: GIZMO DOWN -> OWNER REJECT EARLY -> GIZMO HANDOFF FALLBACK. transform-upgrade rejected because Extrude remained armed, then total-gizmo replayed the handle press as a synthetic canvas pointerdown, allowing Extrude/selection to own geometry beneath the gizmo.
- Explicit expansion of the Face component gizmo now suspends an armed Extrude/Inset tool while the gizmo is expanded, and resumes that tool when the gizmo collapses back to the puck.
- Vertex/Edge/Face gizmo handles are now semantic-only: if modern transform ownership rejects a handle, the press is blocked rather than synthetically replayed to the canvas.
- Object/Multi fallback remains unchanged for the protected object transform route.
- No transform maths, Extrude/Inset topology maths, Group/Multi routing, or protected multi-object-transform code changed.

## 2026-10-01 — v0.36.18.635 selection remains modeless while tools are armed

- Hands-on .634 exposed two selection ownership regressions: background deselect was unavailable while Extrude/Inset was armed, and legacy component transform listeners consumed face/background taps while Move/Scale/Rotate was armed.
- multi-face-direct now owns a quick background Pencil/mouse tap while Extrude/Inset is armed and clears Face selection without disarming the tool. Movement cancels that tap path so drag-edit behavior remains unchanged; touch remains reserved for navigation.
- Legacy face-transform.js and rotate-transform.js now stand down whenever the modern Total Gizmo/puck is present, preventing pre-.615 direct transform owners from stealing component selection taps.
- Modern selection-first behavior is now authoritative: tap selects/deselects, background tap clears, deliberate transform uses the modern gizmo path, and armed tools remain armed.
- No transform maths, topology maths, Group/Multi routing, or protected multi-object-transform code changed.

## 2026-10-01 — v0.36.18.633 shell refresh marker repair

- .633 repo contents were correct, but the HTML <title> still reported v0.36.18.538.
- release-bootstrap.js uses the title as its initial running-version marker, so the stale shell marker could confuse refresh/deploy behavior.
- Synced the title to v0.36.18.633 without changing app behavior or module code.
- This commit also triggers a fresh GitHub Pages deployment for the existing .633 release.

## 2026-10-01 — v0.36.18.633 dormant component gizmo + browser ownership

- Hands-on .632 confirmed Loop Cut fixed, then exposed Face hold browsing conflict and selection clutter from the full Total Gizmo.
- Face/Edge hold browser reached its first candidate, but sideways scrub was being claimed by Paint Select at 6 px before the modeless browser could cycle candidates.
- Added explicit modeless selection ownership state from main.js; edge-paint-select now yields pending Paint Select when an Edge/Face hold browser has actually fired.
- Vertex/Edge/Face selections now show a small dormant transform puck instead of the full Total Gizmo by default.
- Tapping the puck, or using Move/Scale/Rotate transform controls, expands the existing proven Total Gizmo.
- Any component selection change collapses the gizmo back to the puck.
- Object/Group/Multi keep the full gizmo behavior to preserve .615/.616 transform baselines.
- No transform maths, loop/ring candidate maths, or protected multi-object-transform code changed.
- Added tests/dormant-gizmo-browser-633.test.mjs and verified published .633 pins/version.

## 2026-10-01 — v0.36.18.632 Loop Cut commit cleanup

- Hands-on testing exposed repeated/random extra loop cuts when creating a simple Loop Cut.
- Root cause was legacy src/loop-cut-commit.js from the v0.16 workflow: after a real Loop Cut it replayed synthetic pointer taps over the yellow loop to convert it to edge selection.
- With the modern persistent direct Loop Cut owner, those synthetic taps re-entered Loop Cut and created additional topology.
- Removed synthetic pointer replay and now select the finished loop directly through __boxlabSelectionBridge.set('edge', indices).
- Preserved the existing Undo/Redo commit step that clears the temporary Loop Slide session while retaining the finished topology.
- Added tests/loop-cut-commit-632.test.mjs.
- .631 global release ownership fix remains unchanged.

## 2026-10-01 — v0.36.18.631 global component release ownership

- Hands-on .630 exposed a second ownership failure: selecting a Face/Edge can make the Total Gizmo appear between pointerdown and pointerup, so release is not guaranteed to return to the canvas.
- This left Face/Edge hold timers alive after an ordinary tap, causing delayed Loop / Face Loop selection; pending Paint Select could likewise survive into a later Pencil gesture.
- Moved Face Hold and Edge Hold completion/cancellation to window capture pointerup/pointercancel, matching the established global gesture-completion rule.
- Moved pending Paint Select release cleanup to window capture so gizmo overlays cannot strand pending state.
- No loop/ring candidate maths, gizmo transform maths, Group/Multi routing, or protected multi-object transform code changed.
- Added tests/global-component-release-631.test.mjs and verified the published .631 wiring/static regression checks.

## 2026-10-01 — v0.36.18.630 defer Paint Select ownership until drag

- Identified component Paint Select as a capture-phase owner that immediately stopped unselected component pointerdown while hidden Multi was enabled.
- Changed Paint Select to pending-on-down, claim-on-drag after 6 px.
- Tap and hold gestures now retain pointerdown ownership until an actual paint drag occurs.
- Added PAINT PENDING / PAINT CLAIM Gesture Debug markers.

## 2026-10-01 — v0.36.18.629 deep capture diagnostics

- Permanent Gesture Debug is now proven working.
- Added deep canvas capture-owner tracing only while Gesture Debug is enabled.
- Diagnostic-only build to identify the listener suppressing Face pointerdown before normal canvas handling.

## 2026-10-01 — v0.36.18.628 Gesture Debug binding order fix

- Fixed Viewport Gesture Debug button binding order.
- ensureUI() now creates the button before querySelector/listener binding.
- Diagnostic infrastructure only; no transform/selection behavior changed.

## 2026-10-01 — v0.36.18.627 Gesture Debug startup + Vertex Circle lifecycle

- Fixed Gesture Debug toggle binding accidentally nested inside Focus View toggle.
- Permanent Gesture Debug now initializes normally and remains off by default.
- Removed temporary deep capture monkeypatch from permanent debug infrastructure.
- Fixed Vertex Circle lifecycle by re-syncing Vertex layout/Circle after late Inspect/Repair drawer reconciliation.
- Bumped affected module pins to avoid stale-cache ambiguity.

## 2026-10-01 — v0.36.18.625 deterministic Circle startup + permanent Gesture Debug

- Fixed Vertex Circle startup race by sequencing component-circle after face-reconstruct / Vertex layout ownership.
- Removed concurrent standalone Circle import.
- Added permanent Viewport -> Gesture Debug toggle.
- Gesture Debug is off by default, persisted, lightweight when disabled, and reusable for future interaction debugging.
- Temporary deep EventTarget capture monkeypatch removed from normal infrastructure.

## 2026-10-01 — v0.36.18.624 canvas capture-owner tracer

- .623 localized Face Hold failure to a canvas pointerdown capture listener after the debug sentinel.
- Gesture Debug now wraps later canvas capture listeners and logs registration, entry, exit, and propagation state.
- Diagnostic-only build.
- Dormant gizmo architecture retained as a separate next-step UX experiment.

## 2026-10-01 — v0.36.18.623 canvas-boundary diagnostics

- .622 proved the real Pencil pointerdown reaches canvas capture and is not swallowed as hover.
- Added RAW CANVAS CAPTURE and RAW CANVAS BUBBLE sentinels to isolate where the event disappears before Face Hold.
- Diagnostic-only build.

## 2026-09-30 — v0.36.18.622 Pencil-gate diagnostics

- .621 Face hold attempt produced only DEBUG READY.
- Instrumented the earlier Pencil orbit capture gate and raw document pointerdown.
- Diagnostic-only build; no behavior change.
- Primary suspect is pressure-0 Pencil pointerdown being classified as hover and swallowed.

## 2026-09-30 — v0.36.18.621 reusable Gesture Debug layer

- .620 Face long-press failed hands-on.
- Added reusable gesture-debug.js instead of another speculative gesture change.
- Instrumented Face Hold, Total Gizmo and semantic transform ownership.
- Diagnostic-only build; no intended interaction behavior change.
- New workflow rule: after one failed straightforward interaction fix, use Gesture Debug before further behavioral changes.

## 2026-09-30 — v0.36.18.620 Face long-press selection browser

- Abandoned and fully removed the failed .617-.619 double/triple-tap experiment.
- Restored clean single-tap component selection behavior.
- Added Face long-press + horizontal scrub selection browser using the proven Edge hold architecture.
- Candidate selectors are existing Face Loop, Face Ring, Coplanar Region and Connected Shell tools.
- Invalid and duplicate candidates are skipped.
- Existing selection is preserved additively while browsing.
- Gizmo and Group/Multi baselines unchanged.

## 2026-09-30 — v0.36.18.619 modeless tap continuation through gizmo overlay

- .618 failed because tap #2 often landed on the newly visible Total Gizmo instead of the canvas.
- Added a modeless tap claim API so an active rapid tap chain can claim gizmo pointerdown before transform ownership.
- Claimed overlay taps complete through the same modeless tap owner on global pointerup.
- Normal gizmo behavior remains immediate outside active tap chains.

## 2026-09-30 — v0.36.18.618 single owner for component taps

- .617 double/triple tap failed because modeless tap handling and legacy endDrag tap handling both owned the same release.
- Removed component selection toggling from endDrag.
- Modeless tap handler is now the sole owner of component single/double/triple tap semantics.
- Component drag transform completion remains in endDrag.
- Edge hold and gizmo ownership unchanged.

## 2026-09-30 — v0.36.18.617 modeless double/triple-tap selection

- Added modeless multi-tap selection to Vertex / Edge / Face using the existing component tap owner.
- Double-tap invokes existing Grow selection.
- Triple-tap invokes existing Connected selection.
- Single-tap select/deselect remains immediate.
- Tap chain is cancelled by drag, hold, timeout, background tap, or mode change.
- Edge long-press/scrub Loop/Ring remains untouched.
- Object/Group/Multi transform ownership unchanged.
- Protected multi-object-transform unchanged.

## 2026-09-30 — v0.36.18.616 HANDS-ON PASS

- User confirmed grouped Object gizmo transforms work perfectly.
- Effective-object-count routing is validated.
- Single Object remains on semantic gizmo owner; Group/Multi remain on established owners.
- .616 is the protected Group/Multi routing baseline.

## 2026-09-30 — v0.36.18.616 grouped/multi gizmo ownership correction

- Fixed .615 ownership regression where grouped selections could be mistaken for a single Object because object-origin intentionally masks the multi flag in some contexts.
- Object gizmo routing now uses effective selected object count: 2+ ids always remains on established group/multi owners.
- Single Object keeps the .615 semantic gizmo path.
- Group/pivot transform math and protected multi-object-transform remain unchanged.
- Planned modeless work deferred until this regression passes.

## 2026-09-30 — v0.36.18.615 HANDS-ON PASS

- User confirmed the unified semantic gizmo works perfectly.
- Vertex / Edge / Face / single Object now share one gizmo contract.
- Plane Move semantics are consistent across these modes.
- True Multi-object remains deliberately on protected v0.36.1.0 owner.
- .615 is the new unified gizmo baseline.

## 2026-09-30 — v0.36.18.615 single Object semantic gizmo handoff

- Unified single Object mode with the direct semantic Total Gizmo contract already proven for Vertex / Edge / Face.
- Single Object now receives the real gizmo pointer event and exact tool/constraint directly through transform-upgrade.
- Object XY/XZ/YZ Plane Move now uses the same true world-plane logic as components.
- True Multi-object selection deliberately remains on protected multi-object-transform.js?v=0.36.1.0.
- Protected multi-object transform file unchanged.

## 2026-09-30 — v0.36.18.614 selected-component tap owner + true plane Move

- Added a dedicated selected-component tap owner so tap-to-remove no longer depends on transform endDrag.
- Tiny component transforms inside the tap envelope are rolled back before selection toggle.
- Added true world XY/XZ/YZ Move planes for direct component Total Gizmo gestures.
- Preserved .612 direct component-gizmo architecture and protected multi-object transform.

## 2026-09-30 — v0.36.18.613 remove diagnostics + robust component tap deselect

- Removed temporary .612 gizmo runtime diagnostics after hands-on PASS.
- Preserved direct component Total Gizmo ownership.
- Fixed selected component tap-to-remove reliability by adding a tap envelope tolerant of Pencil jitter.
- Tiny accidental component transforms within the tap envelope are rolled back before toggling selection.
- Applies to Face / Edge / Vertex.
- Background deselect and additive selection unchanged.
- Protected multi-object-transform unchanged.

## 2026-09-30 — v0.36.18.612 HANDS-ON PASS

- User confirmed component Total Gizmo now works perfectly.
- Direct semantic gizmo handoff is validated for component transforms.
- SweepPath.editing getter/function bug was the actual blocker.
- .612 becomes the protected component-gizmo baseline.
- Temporary runtime diagnostics can be removed in the next build.
- Protected multi-object-transform unchanged.

## 2026-09-30 — v0.36.18.612 component gizmo owner exception fix

- .611 diagnostics revealed transform-upgrade called SweepPath.editing as a function even though it is a boolean getter.
- Fixed both transform entry guards to read SweepPath.editing as a property.
- This removes the exception that prevented direct component gizmo ownership from reaching OWNER BEGIN.
- Diagnostic panel retained for verification.
- Protected multi-object-transform unchanged.

## 2026-09-30 — v0.36.18.611 component gizmo exception capture

- .610 proved the gizmo handle reaches transform-upgrade OWNER REQUEST, but the owner throws before OWNER BEGIN/return.
- Added visible HANDOFF EXCEPTION reporting around the direct component handoff.
- No transform behavior changes.
- Protected multi-object-transform unchanged.

## 2026-09-30 — v0.36.18.610 component gizmo runtime diagnostics

- .609 hands-on FAIL: no component gizmo transforms effectively worked.
- Added a temporary visible runtime diagnostic panel instead of another transform rewrite.
- Diagnostic traces handle down, direct owner request/begin/reject, handoff result, pointer move, owner finish and gizmo pointerup.
- No intended transform behavior changes.
- Protected multi-object-transform unchanged.

## 2026-09-30 — v0.36.18.609 direct component Total Gizmo handoff

- .608 deployed successfully but hands-on behavior remained effectively unchanged.
- Removed the synthetic canvas pointerdown bridge for Vertex / Edge / Face Total Gizmo gestures.
- Total Gizmo now calls transform-upgrade.beginGizmoGesture(spec,event) directly with the real SVG pointer event and exact handle spec.
- Component gizmo handle captures the real pointer for the drag.
- Object mode keeps the proven legacy synthetic handoff.
- This is an ownership/transport correction; transform math and exact-entry math are otherwise unchanged.
- Protected multi-object-transform unchanged.

## 2026-09-30 — v0.36.18.608 component gizmo ownership correction

- Fixed component gizmo drag routing after .607 hands-on testing.
- transform-upgrade now owns Vertex/Edge/Face transforms only when launched by Total Gizmo.
- Ordinary component viewport drags remain with main.js, removing duplicate gesture ownership.
- Gizmo handle tool/constraint is authoritative for component gestures.
- Axis Scale now uses motion projected along the selected gizmo axis.
- No-drag gizmo clicks no longer toggle component selection before exact entry.
- Increased invisible gizmo handle hit widths to reduce orbit fall-through.
- Object gizmo, modeless Edge selection, and protected multi-object-transform remain unchanged.

## 2026-09-30 — v0.36.18.607 Total Gizmo component integration phase 1

- Parked the accepted .606 modeless Edge candidate browser.
- Extended Total Gizmo visibility/pivoting into Vertex, Edge and Face selections.
- Gizmo pivot now uses the centroid of the selected component vertex set.
- Reused transform-upgrade.js as the existing component Move / Scale / Rotate owner.
- Gizmo-owned component Move / Scale bypass direct-hit gating.
- Component Rotate is allowed only for gizmo-owned gestures; direct viewport component Rotate remains blocked.
- No parallel transform math added.
- Protected multi-object-transform unchanged.

## 2026-09-30 — v0.36.18.606 hold + scrub Loop/Ring candidate browser

- Added an in-gesture modeless candidate browser for Edge long-press.
- Long-press enters candidate mode; horizontal Pencil scrub advances through valid Loop candidates, then Ring candidates; release commits.
- Ambiguous Loop topology is no longer refused outright: directed candidates are enumerated by feeding seed + neighbouring hint edges through the existing two-edge Loop resolver.
- Strict single-seed Loop remains first when valid.
- Ring is used automatically when no Loop candidate exists.
- Candidate results are deduplicated.
- Additive base selection survives while the held seed contribution is previewed/replaced.
- No new topology solver was added; existing strict Loop, directed Loop, and Ring commands remain authoritative.
- Protected multi-object-transform unchanged.

## 2026-09-30 — v0.36.18.605 additive modeless Loop/Ring selection

- Extended .604 modeless Loop/Ring hold cycling into additive selection sessions.
- Each new seed snapshots the current Edge selection as its base, runs the existing Loop/Ring selector on the seed, then merges the result back into the base.
- Same-seed Loop ↔ Ring cycling replaces only that seed's contribution; earlier accumulated selections remain intact.
- Failed/ambiguous selectors restore the base instead of clearing it.
- Background deselect still clears the full session.
- Existing Loop/Ring topology logic remains authoritative.
- Protected multi-object-transform unchanged.

## 2026-09-30 — v0.36.18.604 modeless Loop ↔ Ring hold cycling

- Extended the proven .603 Edge long-press owner instead of adding a second gesture listener.
- First hold on a seed edge invokes strict Loop selection.
- Repeating the hold on the same seed during the same selection session alternates Ring then Loop.
- Ordinary tap semantics remain untouched.
- Cycle resets after seed change, background deselect, transform, or selection-mode change.
- Existing Loop and Ring commands remain the topology authorities.
- .603 refusal-to-guess Loop behavior remains protected.
- Protected multi-object-transform unchanged.

## 2026-09-30 — v0.36.18.603 modeless Edge long-press Loop HANDS-ON PASS

- User confirmed Edge long-press Loop selection feels great.
- Confirmed strict-loop behavior is desirable:
  - clean, single-continuation loops select
  - ambiguous junctions / multiple possible continuations do not select
  - example: around the top of a cube, selection intentionally refuses rather than guessing
- This refusal-to-guess rule is now protected for future Loop/Ring modeless gestures.

## 2026-09-30 — v0.36.18.603 first modeless gesture: Edge long-press Loop

- .602 gizmo soft catches passed hands-on.
- Audited existing main.js gesture ownership before adding modeless behavior.
- Existing background-tap deselect retained; no duplicate tap owner added.
- Added Pencil/mouse Edge long-press gesture that invokes the existing Loop selection command.
- Finger/touch is excluded to preserve iPad navigation.
- Pointer movement cancels the hold.
- If a transform drag was prepared but not yet armed, long-press cancels that pending drag before Loop selection.
- Ring cycling deliberately deferred until this primitive passes.
- Protected multi-object-transform unchanged.

## 2026-09-30 — v0.36.18.602 stronger Total Gizmo soft catches

- Resumed pending Rotate/Scale gizmo precision work after .601 Nomad handoff PASS.
- Re-audited real gesture ownership before changing behavior.
- Widened gizmo Rotate soft-catch window from 3.5° to 5° in transform-upgrade.js.
- Widened Scale soft-catch threshold from 0.035 to 0.065 in main.js, the actual Object Scale owner.
- Kept transform-upgrade Scale helper in parity for its owned paths.
- Legacy non-gizmo 15° Rotate snap remains unchanged.
- Catches remain releasable by continuing the drag beyond the window.
- No change to Move detents, exact type-in or protected multi-object-transform.

## 2026-09-30 — v0.36.18.601 explicit Files-based Nomad handoff

- Closed direct Safari/Web Share -> Nomad Sculpt as unsupported after .596-.600 testing.
- Working path is filesystem-backed: save GLB to Files, then Share -> Nomad Sculpt from Files.
- GLB secondary action renamed to Save GLB to Files.
- Guidance text now explicitly describes the two-step Files workflow.
- GLB MIME remains mod…212152 tokens truncated…ASS / 3 FAIL: `drawer-ui.js` still imported `face-workflow-layout.js` at `.1044` while its reviewed contract expected `.1052`. This caused the overall runtime-asset reference check, canonical release-version-loader check, and Face layout cache-hop check to fail. The earlier failures were bookkeeping/pin closure, not reported paint behavior regressions.

`.1053` updates the actual `drawer-ui.js` child import and hash, keeps its index cache key aligned, retains matching direct/nested `release-version.js` pins, updates release markers, and preserves `.1050`–`.1052` shell logs. Map-preview implementation is unchanged. No local tests were run or added; `git diff --check` passed. Commit `596f5a2c1c731b992fca203f21e497f59911d9de` is on `main`; Pages `41293655018` succeeded and live `.1053` index, drawer-ui, Face workflow, shell-comparison and runtime asset manifest match. Hosted Topology `41293655084` is still running.


## .1054 — release display/assertion alignment — 1 November 2026

Hosted `.1053` Topology completed 3,094 PASS / 2 FAIL. `displacement-preview-gate-1041.test.mjs` still expected the `.1052` shell comparison pin, and shell-comparison's title, launcher and help text still displayed `.1052`. The runtime `.1053` shell identity and live assets were correct; these were stale release-facing references.

`.1054` aligns those strings/assertions with the release marker while preserving `.1050`–`.1053` comparison-log acceptance. Cache pins and runtime fixture hashes are updated for the changed shell, Face workflow and drawer chain. Map-preview behavior is unchanged. No local tests were run or added; `git diff --check` passed. Commit `889ab5a226245cd62a030a8baf415b881c61f716` is on `main`; Pages `41294085210` succeeded; live `.1054` marker, index/shell/asset-manifest match `main`. Hosted Topology `41294085728` passed all 3,096 tests (0 failed). Device acceptance remains pending.

## .1055 — combined-map shadow and Pencil/Gizmo recovery — 1 November 2026

User reports map previews and live preview updates PASS (protected), while shadow contrast with Colour maps, brush-switch-to-orbit routing and complete Total Gizmo visibility after Pencil orbit FAIL. Metalness-only shadow remains PASS. Code restores the prior `.35` environment cap for combined Colour+Metalness while retaining `.55` for metal-only; UV Paint exposes its authoritative exact hit test so Pencil mesh contacts cannot escape to OrbitControls after brush changes; orbit takeover cancels the currently active gizmo pointer through the transform owner and resets all transient handles.

No local tests were run or added. The release/cache closure and runtime fixture hashes were refreshed. The build remains subject to push, Pages/live asset verification and hosted Topology regression before device testing. Standing user authorization applies to each BoxLab release-stage push and publication; do not ask again.

`.1055` deployment note: Pages `41296468488` succeeded; live `.1055` marker plus cache-busted index, Paint target/UI, Pencil gate, main, render modes and shell comparison match `main`. Hosted Topology `41296468767` reported 3,095 PASS / 1 FAIL: runtime-asset-contract included an offline evaluation-owner reference to `export-as-panel.js` at `.1055`, though `evaluations/uv-paint/lab.js` remains correctly pinned to `.1039`. Restore that fixture URL to `.1039` and rerun Topology; no application source change is needed for this bookkeeping correction.

The follow-up contract-only commit `3d372a9d24f5b8da9d5800a5ce910762dca528d3` restores the offline evaluation reference to `.1039`. Pages correction redeploy `41296990334` succeeded; live `.1055` version marker, index and changed runtime assets remain byte-identical to the app release commit. Hosted Topology `41296990402` passed 3,096 / 3,096. The one failing contract assertion was bookkeeping only; no Paint runtime source change was needed. Device acceptance remains pending.


## .1056 — synchronize Total Gizmo projection with Pencil orbit — 1 November 2026

User clarifies the gizmo displacement occurs while orbiting during Paint testing; brush changes had preceded similar reports. Audit confirms the existing brush chooser changes the selected Paint action and cancels any in-flight stroke; it does not move the mesh or object origin. Pencil orbit is routed by the existing gate, and the Total Gizmo continuously projects the selected object's centre in its own animation-frame owner. The camera projection depends on `matrixWorldInverse`, which Three.js refreshes during rendering; the independent gizmo frame could sample before that refresh and use the previous orbit view.

Narrow repair: `src/total-gizmo.js` calls `camera.updateMatrixWorld(true)` before projecting the gizmo anchor and its axis/ring visuals. No new gesture, modelling, paint, pivot or transform owner. Direct cache pins for Total Gizmo and the release comparison shell are refreshed; reviewed asset hashes and the preserved `.1041` release assertion follow `.1056`. Protected `src/multi-object-transform.js?v=0.36.1.0` remains unchanged.

No local tests were added or run. Hosted Topology and Pages/live verification are pending. Device acceptance is pending; do not claim a fix until Pencil orbit while Paint is active leaves the gizmo anchored during and after orbit, and the full gizmo remains usable after Done. Map previews/live updates, separate material channels/toolbars, Smudge, and previous Paint behavior remain protected.


### .1056 hosted CI correction

First Pages deployment succeeded, but Topology `41303297247` failed 34 checks: 33 existing selection-hub test harnesses model only the camera fields they consume, so the unconditional update call threw when that optional Three.js method was absent; one preserved release-owner assertion found the direct `release-version.js` URL still pinned to `.1055`. Made the matrix refresh optional (`camera.updateMatrixWorld?.(true)`): real Three.js cameras still refresh, and minimal harnesses retain prior behavior. Updated the direct release-version pin and reviewed fixture reference to `.1056`. This catches two issues that would have been missed by a source-only review. Rerun hosted regression and Pages before marking `.1056` test-ready.

`.1056` hosted correction follow-up: run `41303647185` reported 3,093 PASS / 3 FAIL. The remaining failures are contract bookkeeping: the reviewed Total Gizmo hash was stale, the canonical loader test found `src/face-workflow-layout.js` still pinned to release-version `.1055`, and the Total Gizmo stamp assertion reads that stale hash. The optional camera refresh remains the only runtime behavior change. Updated the nested release-version pin to `.1056` and refreshed reviewed references for `face-workflow-layout.js` and `total-gizmo.js`. Topology rerun and Pages/live verification pending; no local tests run.


`.1056` loader-hop follow-up: hosted Topology `41304456910` reported 3,093 PASS / 3 FAIL because `src/drawer-ui.js` still imported the face layout with `.1055`; its reviewed cache URL and its own shell pin were stale. Updated the drawer's face-layout import and index drawer cache pin to `.1056`, and refreshed the affected reviewed hashes. The prior nested release-version pin now follows the current layout module. Re-run hosted Topology and Pages after this correction; device acceptance remains pending.


`.1056` loader contract follow-up: Topology `41304988636` completed with 3,095 PASS / 1 FAIL. The remaining failure is a stale reviewed URL for the face-layout owner's nested `release-version.js` import, now corrected to `.1056`; no runtime behavior change was indicated. A new hosted run is pending. The attached device recording shows the gizmo displaced from the cube immediately after Done, before the next Paint pass, so acceptance must specifically verify the Done→UV Paint re-entry sequence with Colour/Roughness/Metalness. The camera-orbit refresh alone is not accepted as a full fix until that sequence passes on device.


### `.1056` hosted status and device evidence

Final Topology run `41305462939` passed 3,096 / 3,096. Pages run `41305462046` succeeded. Live release marker is `0.36.18.1056`; deployed `index.html` (SHA-256 `f45871ecb151bef7d56602e5bcbb471a12911cc10ebbec29b7223e40a52728d3`), Total Gizmo (`cddf1a3d97a0532fd3faa44b8b1956e532de1f61d8d63e257bf029e6b80f5900`), drawer UI (`51ff1069a2b8349d34373d3cd5c4adcd51365f7159822a637bc9b497477ee2fe`) and face layout (`57c5806d228bba994a8d5c43b26492965bc713ac1525923c9a5f85fac39479d8`) match the release tree. The supplied recording shows the gizmo offset immediately after Done for multi-channel paint, before another orbit; the camera matrix refresh is therefore not device-accepted as a full repair. The exact Colour/Roughness/Metalness Done→re-enter→paint flow remains open for the next narrow build. Colour-only Done/re-entry and Paint maps/tools PASSes remain protected. No local tests were run.


## .1057 — keep the editor camera authoritative — 2 November 2026

Repeated user FAIL: multi-channel Colour/Roughness/Metalness Paint → Done → re-enter displaces gizmo and turns paint contacts into orbit. Colour-only re-entry is protected PASS. Root cause found in `bridge-topology.js`: global PerspectiveCamera.updateProjectionMatrix observer overwrote bridge.camera for every perspective camera. Metallic PMREM generation constructs its own PerspectiveCamera, stealing the editor camera reference used by gizmo projection and painting raycasts. Main already publishes camera and OrbitControls together. Observer now accepts projection updates only from controls.object once controls exist; startup fallback remains. Existing modelling, Paint, PMREM and transform owners retained. The .1056 matrix refresh alone did not repair this camera identity fault.

Regression uses real Three.js perspective cameras across three reflection/clone cycles and confirms the bridge retains editor identity. Focused camera/release/bootstrap checks: 37 PASS; material painting/reflections/orbit checks: 15 PASS. Full local suite ended without a final summary after reporting one bootstrap cache-pin assertion; that pin was corrected and its focused tests rerun successfully. No full-suite PASS claimed; hosted regression and deployment pending. Protected Multi1.0 unchanged. Device acceptance pending: multi-channel paint → Done → reopen → paint; switch brushes and Pencil orbit; repeat three times; check Colour-only, previews and shadows.


`.1057` publication: runtime commit `0694a15427d369ced3021d3d5342fb91bdc74413`; Pages `41380409300` succeeded. Cache-busted live version.json reports `.1057`; index and bridge-topology.js match local SHA-256 (bridge `5a9c0052639eb62abd7c3620c52ea42891f27901aa0e7c669d7ce645570c17f3`). Original observer was executed separately and reproduced replacement by the reflection camera; repaired regression retains editor camera. Hosted Topology `41380410101` is pending. Device acceptance remains pending for repeated multi-channel Paint → Done → reopen → paint and Pencil orbit. Colour-only re-entry PASS protected.

## .1058 — radial Material uses the working Brush entry — 2 November 2026

User PASS protects .1057 editor-camera ownership repair, multi-channel Done/re-entry and aligned gizmo. New residual FAIL: opening Material from the Paint radial, changing colour then painting makes one blob and becomes unresponsive until Done/reopen. Selecting Brush before changing colour works. Audit: radial Material directly called showMaterialMenu, bypassing the Brush action change that clears image stage, cancels stroke/capture and synchronizes tool/fill state. Radial Material now calls the same selectPaintTool('paint') owner as Brush. Header Material still edits the current tool's material settings. No new Paint or navigation owner.

Regression executes the real UI: Fill→Material prepares Brush; Material cancels a stale active Pencil contact; colour edits plus two moving metallic strokes commit separately with controls restored and Paint active. Focused Paint/camera/release checks: 35 PASS; bootstrap/cache/release checks: 36 PASS after preserving the unchanged modelling bootstrap cache keys. Full-suite result pending; its first pass caught that cache-key mismatch before the correction. Device: radial Material→change colour→paint continuous strokes with Metalness, repeat; then check Brush, Done/reopen and gizmo. .1057 hosted Topology had 3,096 PASS / 1 FAIL from old .1056 visible comparison labels; .1058 aligns those visible labels with the actual release. Earlier device PASS is protected, not inferred from CI.


`.1058` publication verified: runtime commit `0c48392d9575de3d65a45b589cbc38ca434a3d09`. Hosted Topology `41381820929` passed 3,098 / 3,098. Pages `41381821044` succeeded; live `.1058` marker, index and viewport-paint.js match the release source. Device acceptance pending for radial Material colour changes and repeated Metalness strokes. Paint UI SHA-256 `507ccd1e34b2d4d6ce0c20ec13c6e34eabb5196b45fb98d757a8f7749db97696`; shell SHA-256 `8bdbb342678f7169ac9cc62cb75f94179e99a1c648bff14b7984dc450c37a1ff`. User .1057 PASS remains protected.

## .1059 — Paint contact recovery after Material colour editing — 2 November 2026

User FAIL on .1058: still one dab followed by lock-up. Do not protect .1058 as accepted; its menu equivalence test was insufficient to cover native pointer delivery. .1057 camera/Done-re-entry PASS remains protected.

Audit of the existing viewport-paint pointer owner found: a retained contact causes all later pointerdown events to be swallowed; positive-pressure pen movement is rejected solely for buttons=0; intentional release clears contact only after calling releasePointerCapture; the native colour control can retain focus as the stroke begins. Repair within that owner: fresh Pencil down cancels an unfinished previous contact; clear stored contact before releasing capture; accept pressure-positive moves/coalesced samples even when buttons=0; blur focused palette input before beginning the stroke; capture the viewport before hiding the palette. Existing stroke cancellation, rollback, history, touch/palm and orbit owners retained.

Regression executes the UI with missed pointerup, synchronous lostpointercapture on intentional release, native-input blur callback and pressure-positive/buttons-zero coalesced movement. It verifies a moving trail exceeds a dab, repeated metallic strokes commit, controls restore and Paint remains active. These reproduce code-level failure cases, not a confirmed trace of iPad native colour-picker events. Final focused run: 66 PASS / 0 FAIL across pointer recovery, radial Material, Paint tools/channels, Pencil pressure, camera ownership, release contracts, comparison UI and shared bootstrap tests. Hosted full regression and deployment pending. Device check: radial Material→change colour→draw continuous strokes with Metalness; repeat colour changes without Done; then Done/reopen and gizmo/orbit.


`.1059` publication verified: runtime commit `cc84d1ed2d41a9d54c5aab0dd0af52de1d7d1c98`. Hosted Topology `41384738678` passed 3,100 / 3,100. Pages `41384738314` succeeded; live `.1059` marker, index and viewport-paint.js match the release source. Native iPad Material/colour-picker lock-up acceptance remains pending; .1058 was FAIL and .1057 camera/Done-re-entry PASS stays protected. Paint UI SHA-256 `035c875a70252824de879d997cd0f8d55bd23e1d2389f08d858e14017e3c7bc2`; index SHA-256 `ae89054a73de08e924a624fc202d09c5587f6fc0a31d72288ed8004073447070`.

## .1059 device PASS — 2 November 2026

User confirms PASS after the Material colour-edit contact repair. Protect the tested Material→colour change→continuous Metalness paint, repeated strokes/colour changes without Done, and retained .1057 camera/gizmo/Done-re-entry behavior. .1058 remains a historical failed attempt, superseded by .1059. Runtime remains .1059; no new app build from this acceptance entry. Hosted regression: 3,100 PASS / 0 FAIL; published runtime cc84d1ed2d41a9d54c5aab0dd0af52de1d7d1c98.

User asks what is next, without /nextbuild. Recommended next narrow build follows the recorded .1043 queue: audit existing UV Editor and Mesh Health UV help, then move long gesture instructions into touch-accessible contextual help using existing owners. Keep action labels, errors, scope/cap warnings and Paint PASSes intact. Later resume the native NOM displacement payload/settings audit before any displacement preview, with performance benchmarks before heavy subdivision work. No new runtime implementation authorized by this status question alone.

## .1060 — touch-accessible UV help — 2 November 2026

User /nextbuild selects the queued UV help slice after .1059 device PASS. Audit found long gesture footer in uv-workspace.js and projection notes in mesh-health.js; no shared generic help owner exists. Use native details/summary disclosures in those original surfaces, with touch/keyboard activation and visible focus; no extra popup layer or gesture owner. UV help contains existing navigation/history instructions, dynamic Move/Scale/Rotate Pencil hint, map-reference and layout-action explanations. Escape closes help before exiting the editor; help closes on workspace exit and resets collapsed on entry. Projection help exposes method guidance previously in long notes/native titles. Base-only/replaces-UV/clear-paint warnings, 4096-face and 20,000-corner caps, curved-face stretching warning, clear-paint consequences, dynamic errors/status and action labels stay visible.

Original canvas/control ownership, header/Back to 3D, selection, UV transforms, Undo/Redo and Paint remain intact. Paint .1059 source and cache pin are unchanged; its device PASS and protected Multi1.0 remain protected. Focused run: 97 PASS / 0 FAIL, covering workspace help/Escape/close/reopen with unchanged view/history, UV transforms/navigation, atlas/projection, workspace layering, Paint contact/Material recovery and release/cache wiring. Hosted full regression and Pages/live verification pending. Device: open UV Editor→expand UV help→switch Move/Scale/Rotate→close help→pan/pinch/UndoRedo→Back to 3D and reopen; UV or Mesh Health→Projection help while warnings remain visible. Then quick accepted Paint Material/Metalness smoke.

.1060 hosted correction: Topology 41386888486 reported 3,100 PASS / 1 FAIL. Existing Face atlas test requires its original explanation “one island per face, up to 4096 faces”. Restored that wording inside Projection help while keeping atlas caps and clear-paint warning visible outside it; no test expectation was weakened. Bumped the corrected Mesh Health asset key to .1060.1 so the previously deployed .1060 asset cannot stay cached. Application release remains .1060. All 27 focused correction checks PASS; hosted rerun and corrected deployment verification pending.


`.1060` publication verified: corrected runtime commit `c59dff749b568fcc2a4f9dbbe08530e2df17b323`. Hosted Topology `41387557443` passed 3,101 / 3,101. Corrected Pages `41387557387` succeeded; live `.1060` marker, index, UV workspace and Mesh Health match the release sources. Device acceptance pending for UV help, Projection help, return/reopen and accepted Paint smoke. Index SHA-256 `7b8627d7f22c4610e72ada105dbb9b22839317fd1048ee58286444018751b9a8`; UV workspace `85a9a75ebff6930c4460179fdf4572233f2e503222b4c908da9b474a479a7aea`; Mesh Health (`.1060.1` cache key) `4d9a434a43737551e1b2f57aa3bfcf8976268ef0ba3e67978a38e4fcb5a9a429`. Paint `.1059` source/pin and user PASS remain protected. Next device list: toggle UV help and switch Move/Scale/Rotate; toggle Projection help and check visible warnings; Back to 3D/reopen and quick Material/Metalness paint.

## .1061 — right Paint layers and object-following palette — 2 November 2026

User .1060 PASS protects UV help/Projection help, accepted Paint .1059 and .1057 camera/Done-reentry behavior. New user request (annotated screenshot): Layers on the right like the object menu; open Paint radial clear of the object and follow it like the gizmo.

Audit: one tool-session-ui Paint dock owns original panel/layers/footer; viewport-paint owns palette, drag handle and frame loop. Existing gizmo projection patterns use the editor camera but no reusable object-bounds layout helper exists. Move the existing Paint-only dock to right:8px/left:auto; other session placement/restoration stays authoritative. Add presentation-only paint-palette-layout helper: cache editable mesh bounds once at Paint open, project eight corners through the authoritative camera, prefer placement to the left, choose another side to avoid model/right panel/selection controls when space allows, clamp to viewport when cramped. Reuse Paint's frame loop for view-following; keep a dragged palette offset relative to the object. Recompute placement for wheel/material/control sizes; freeze auto-placement during live strokes/drag and focused native material-input editing; new Paint session resets safe placement. No new frame loop, gesture owner, modelling kernel, pivot or history owner. Model itself is never moved by placement.

Final focused run: 94 PASS / 0 FAIL across Paint layout/contact/material workflow, right dock, object radial, UV help and release/cache wiring. Real Three camera projection test covers pan/orbit/zoom, dock avoidance, bounds and no vertex mutation. Real Paint UI test covers frame following, manual offset, resize, Done/reopen and unchanged history/navigation state. Updated former left-dock assertions to explicit right-dock expectations requested by user; preserved footer/listeners/ordinary-session checks. Hosted full regression and Pages/live verification pending. Device: Layers at right; open Tools beside model; orbit/pan/zoom with menu visible; drag menu then move view; Material/Metalness continuous paint and Done/reopen; quick UV help smoke. On cramped screens placement minimizes overlap while keeping controls reachable.


`.1061` publication verified: runtime commit `75b6c4dae4ba158414c3ccfc2abe472addd3c9cb`. Hosted Topology `41419359928` passed 3,103 / 3,103. Pages `41419359664` succeeded; live `.1061` marker, shell, viewport-paint.js, tool-session-ui.js and paint-palette-layout.js match the release tree. Device acceptance pending for right Layers dock, palette clearance/following, manual drag and accepted Paint workflow. SHA-256: shell `2c4cdb42ed8ff8ed99ea507c4a6bebc9bab3cb42153311897e8835c82714c5ef`; Paint UI `b94c721c229fa3ac46b9cc7cfb5ea165a9831b6d0e52498b8272d6358530cc71`; dock owner `1718ff6c3bc185010bafdbd7f37a85d5012f401fa6cd473843bdf75b75f027d1`; palette helper `e94fa66150f489701e5187e609daf095805242ff6505de385d7e89cf0811d59f`. .1060 help and .1059 Paint user PASSes are protected. Short device checks: open UV Paint and verify right Layers + clear palette; pan/orbit/zoom while menu visible, drag it then navigate; change Material colour and Metalness paint, Done/reopen and UV help smoke.

## .1062 — native edge picking inside edge tools — 2 November 2026

User .1061 PASS protects right Layers dock and object-following Paint palette, plus accepted Paint and UV help. New request: SELECT EDGE → SPLIT → SELECT EDGE still misses convex edges; audit other tool-then-edge actions for the general selection fix.

Audit confirmed .954 main edge-screen-picking ranks rendered cage lines by CSS-pixel proximity, then depth; Split and direct Bevel still used world-radius raycast depth ordering. Edge Extrude had the same old picker; Edge Slide and Offset Loop tested selected proxies in selection-list order. Those existing owners now prefer __boxlabSelectionBridge.pick('edge',event), including native misses; selected-edge drag starts require the native winning edge to belong to the selection. Existing world-radius fallback remains only when no native bridge picker is available (standalone/bootstrap compatibility). No new picker/kernel, threshold, gesture or history owner. Loop Cut already uses main's native picker; Edge paint and component-toggle already share it; Sweep Follow Edges and Add Vertex use screen-distance snapping for their distinct cross-object/point payloads, so no equivalent world-depth picker was replaced there. One-shot Rotate/Collapse act on preselection. Legacy edge-toggle-repair is not loaded.

Offset Loop had two module URLs (drawer .671 and loose-bootstrap .0.32.19). Both now resolve the same .1062 URL so UI listeners/module execute once. Refreshed the bootstrap→uniform-inset→multi-face-direct cache chain only; modelling logic and protected Multi1.0 remain unchanged. Split's retained fixed old cache assertion now checks its reviewed runtime asset reference.

Regression executes each actual tool picker on the supplied .954 convex OBJ (twelve previously depth-stolen midpoints) at 0.1/1/10 scales, verifies native misses and rejects neighbouring unselected edge steals. Actual Split button→two native edge taps commits exactly one canonical insertFaceSegment split and preserves exact History Undo/Redo snapshots. Final focused run: 115 PASS / 0 FAIL across tool/native convex picking, Split transaction, tool eligibility/session behavior, cache/release wiring, UV help and protected Paint layout/contact. Hosted full regression and Pages/live verification pending. Device: Split two opposite convex-face edges, repeat after orbit/zoom; Bevel/Edge Slide/Offset Loop and boundary Edge Extrude pick the edge under the Pencil; Undo/Redo, Done/background exit and navigation; quick accepted Paint layout smoke. Keep eligibility/face adjacency/boundary checks intact.


`.1062` publication verified: runtime commit `421d6cca3f0326b2918bfdb23eaef4f062db8ac4`. Hosted Topology `41422973800` passed 3,106 / 3,106. Pages `41422972772` succeeded; live `.1062` marker, shell and all five repaired tool modules match the release commit. Device acceptance pending for convex Split taps, other edge-tool targeting, Undo/Redo/exit/navigation and accepted Paint layout. SHA-256: shell `7493f33e7f87a0abfc880e551704b2b84b1d1630eb1ccf1f3251a8712e26f597`; Split `ef7f92ead98ca96e1802f230c7b850e3955027d68c5d9ab524ec33effee56937`; Bevel `d25e7e87011a575987cf96f33f7cf4c3ea78bc05258f683376a21ec3a1ad69e0`; Extrude `1668e68282d8ad59dc6cfa871a88776841805b658754c36a7da30edd31b0ede7`; Slide `9ef0ddec79101115bc8cd252b6cb270683b40ffec6fbf7d260385ac925f39864`; Offset `e2110de1cf17b03c9dc3f94fe40e941f2150e35918d342a4c2eb7ff60e448280`. User .1061 Paint layout PASS and earlier Paint/help PASSes remain protected. Short device list: Split opposite convex-face edges after orbit/zoom; Bevel/Slide/Offset and boundary Extrude target the intended edge; Undo/Redo and Done/background exit, then navigation.

## .1063 — native NOM displacement inspection — 2 November 2026

User .1062 PASS is protected: native convex edge picking within Split and other edge tools, canonical Offset loader, accepted Paint layout/contact and UV help. Standing authorization to validate, commit and push each BoxLab stage directly to origin/main and Pages remains in force.

Audit found native displacement images/settings already retained by nomad-material-resource and displayed raw by the UV image adapter. Existing adapter now appends retained source strength, midpoint, world-space flag, projection and exact source image byte count to Displacement inspection status. Missing fields explicitly say not recorded; no invented defaults, world-unit conversion, map extraction, image resampling or 3D displacement preview. Raw tile/mapping warning remains. Original bytes and metadata remain authoritative; triplanar is reported rather than applied. No new decoder, renderer, subdivision or modelling owner.

Validation and deployment pending. Device: import a native NOM with displacement, open UV Editor, enable image reference and select Displacement; inspect settings and raw-map warning; switch maps and reopen; confirm Paint and convex Split remain accepted. Next: benchmark-gated displacement preview planning using existing subdivision/UV owners, with no heavy preview before performance acceptance.

## .1063 — final release validation — 2 November 2026

Focused validation: 34 PASS / 0 FAIL. Hosted Topology 41425188802: 3,107 PASS / 0 FAIL. Pages 41425187798 succeeded. Runtime commit dc33b47b03dc2cef5ae7bdc776bbbfd45caf69da; live version.json, index.html, nomad-uv-image-choices.js, uv-workspace.js and mesh-health.js byte-match the release tree. Native device acceptance remains pending.

## .1063 device PASS — 2 November 2026

User confirms PASS for native NOM displacement inspection. Protect its displayed retained source settings and unchanged raw maps. Paint regression is NOT device-accepted in this build: the test object lacks a suitable UV unwrap, so Paint could not be tested. Prior accepted Paint behaviour remains protected. For an isolated Paint smoke test use a fresh disposable cube, Object radial → UV → Face atlas, then UV Paint. Do not replace the imported displacement sample UVs merely to test Paint; retained textures depend on them. Runtime remains .1063; no code changes.

## .1064 — isolated native height decode benchmark — 2 November 2026

User PASS after the disposable-cube unwrap/Paint check closes .1063 Paint device acceptance. Protect accepted Colour/Metalness/Roughness Paint alongside .1063 native displacement inspection, .1062 convex edge-tool picking, .1061 right Layers/object-following palette, .1059 Material contact recovery and .1057 editor-camera/gizmo ownership. Earlier .1063 pending-Paint notes are superseded by this PASS.

Audit: retained native images/settings already have authoritative owners. Preserved .1041 feasibility page tests generated 8-bit maps, not raw 16-bit heights. No production height decoder existed; extend the existing nomad-scalar-png owner using its CRC table and Paeth predictor. New decodeNomadHeightPNG returns exact 8/16-bit grayscale integer samples, original row order and raw min/max, with bounded streaming inflation, CRC/chunk/order/filter checks, 8 MiB encoded/2048-square caps. Unsupported colour/alpha/palette/interlace/animation is refused. No gamma, resampling, material strength/midpoint, projection or world-space conversion is applied. Existing PNG export/opaque-colour function bytes and app consumer pins remain unchanged; only the isolated benchmark imports the new .1064 export. This avoids refreshing the accepted Paint/render graph for an unused export.

New docs/native-height-benchmark-1064.html reads local NOM/PNG; NOM uses readNomadImport and explicit material displacement slots, without parsing geometry, requiring UVs or touching the open app. NOM limits remain 128 MiB container/24 MiB retained images/256 materials; selected PNG decoder adds its smaller source cap. Three decodes yield between runs and stop AFTER a run exceeds 1.2 seconds; not a hard interruption. Report includes original settings, exact bit depth/range/low-byte count, decode samples and known array bytes (not total memory). Tiny bundled 2×2 sample checks all four exact 16-bit values each run and is explicitly not performance evidence. Device/source timing must be sent back before the next preview decision. No viewport displacement ships; .1041 benchmark and original subdivision/renderer remain untouched.

Validation and deployment pending. Device: open the native height benchmark from File → Screen comparison / test list (or direct link), verify tiny sample, choose a native NOM containing displacement (no unwrap), measure and Copy report. Unsupported formats must explain refusal. Optional accepted Paint/camera/convex Split smoke. Next: assess real iPad height decode timings together with the existing geometry/render feasibility results before any bounded displacement preview; preserve original renderer/SubD owners, UV seams and native material transforms.

.1064 focused validation: 37 PASS / 0 FAIL across height/PNG/export/inspection/UI, release wiring and protected Paint/camera/edge targeting. Hosted regression and deployment pending.

## .1064 final release validation — 2 November 2026

Runtime 0020409bcb96ac57633994fc4d2c5c2a5886cbb9. Focused 37 PASS / 0 FAIL; hosted Topology 41439672043: 3,115 PASS / 0 FAIL. Pages 41439671709 succeeded; live marker, shell, native-height benchmark HTML/UI/helper and PNG owner byte-match the release. Native device benchmark results remain pending. User steered ongoing work to all-channel Paint tools before device testing this benchmark; no device PASS inferred for .1064.

## .1065 — all-channel Paint tools and shared mask stencil — 2 November 2026

User requests Brush's combined Colour/Roughness/Metalness choice for Fill, Eraser, Smudge, Blur and Mask; explicitly chooses Shared mask over separate masks. User was informed before implementation: reuse the selected colour-layer mask as a stencil for NEW scalar edits; Colour retains existing non-destructive layer-mask behaviour, while previously committed scalar paint is not retroactively hidden/revealed by later mask edits. No independent per-channel masks or scalar-layer schema is introduced. This scope is visible in Mask UI/help. .1063 Paint/displacement inspection PASS and earlier interaction, layout, camera/gizmo and edge-tool PASSes remain protected.

Audit found multiPaintChannels restricted to action==='paint'; Fill did not retain scalar scratch layers, filters and smudge pickup only ran on the primary layer, and quick tool controls moved the channel dropdown but left combined toggles behind. Extend those existing owners: same single stroke/history transaction, per-channel raster layers, original face/facegroup/hold grow/shrink coverage plans, resolution-specific original filter domains, and pickup/work-budget resets on every selected channel. Eraser restores Roughness255/Metalness0 while retaining original Colour erase semantics. 1024 colour radius scales to the 512 scalar UV footprint (minimum one scalar texel). All secondary resources validate/preflight before one checkpoint; cancel, source loss, channel changes and checkpoint failures retain committed maps.

Reuse the existing selected-layer mask for new scalar edits: blend scratch R8 against committed values using shared mask coverage; 1024 masks area-average their 2×2 samples into 512 scalar pixels, honour enabled/inverted, and omit blocked no-op resources/history. Lit/scalar preview matches the filtered result; no-mask preview keeps the original direct RGBA path. Mask add/edit/remove accepts scalar mode when an overlay is selected, retaining the existing above-Base requirement. Hide/Reveal/Grey Brush commands prepare Brush through the original action-change/cancellation owner, so a preceding Blur/Fill cannot silently remain active while painting the mask. Combined toggles are reparented into each tool's quick controls and Mask page (original nodes/listeners); Material header preserves active tool and radial Material still prepares Brush per protected contact repair. Existing scalar export/project pools, raw resources, compositor, kernels, contact/camera and history owners retained; no resource/schema version changes. Updated three former tests that expected scalar masks to be inaccessible or ignored; all unrelated assertions remain.

Validation and deployment pending. Device: Colour primary → enable Roughness+Metalness in Fill/Eraser/Smudge/Blur controls; use contrasting multi-channel marks for filters, inspect map previews. Test Face/Object Fill, then one Undo/Redo for all maps. On an overlay add shared Mask, hide/reveal/grey, then make new scalar/multi-channel edits and toggle inversion. Done/reopen, Material colour change, continuous Pencil painting, finger orbit and gizmo smoke. Scalar edits already committed remain unchanged when editing the stencil. Next: device feedback on tools, then collect .1064 native height timings before any displacement preview implementation. Standing push/publish authorization remains active.

.1065 focused validation: 80 PASS / 0 FAIL across actual combined tools, shared stencil, scalar equality, face/group/hold fill, UI contact, masks, filters, quotas, history/cancellation and release/cache/protected camera/edge/layout checks. Hosted regression and deployment pending.

## .1065 final release validation — 2 November 2026

Runtime 47d806a621a45ce0a238d782d412179fbbff3dd7. Focused 80 PASS / 0 FAIL. Hosted Topology 41442368061: 3,127 PASS / 0 FAIL. Pages 41442366714 succeeded; live marker, shell, Paint UI, Paint core and screen comparison match the runtime tree. Native device acceptance remains pending. User added maskable Base requirement during publication; .1066 includes this accepted implementation scope, not a claimed device PASS. Shared stencil scope remains as explained to user: current colour-layer mask limits NEW scalar edits and does not retroactively hide/reveal committed scalar maps.

## .1066 — lift Base paint to a maskable layer — 2 November 2026

User additionally requests making Base into its own layer so it can be masked. Audit: Base is deliberately opaque/unmaskable; existing appendPaintLayer/captureLayeredColourResource and original layer mask can represent the requested result without a schema change. Add one Base → Layer command in Selected layer settings, visible only with Base selected in Colour. It lifts exact Base pixels into an opaque normal Base paint overlay, inserted BELOW every existing overlay, then leaves an opaque white backing. Composition remains byte-identical until layer/mask edits. Original masks, blend modes, image recipes, ordering, scalar maps and native UVs remain untouched. The new layer is selected and normal + Mask becomes available.

The existing painter owns all selection, preflight, checkpoint and resource publication; original stack/compositor/source pins are retained. One Undo restores old Base and Redo restores the editable layer. Preserve three-overlay cap and pool budgets: full stack disables command with merge/remove guidance. Quota/checkpoint/stale/scalar and staged-image refusal preserve resources, current placement and history. An explicit user conversion can create a white layer from an empty white Base; no automatic source image baking or UV change is implied. .1065 tool/channel/shared-stencil behaviour remains included; all earlier protected device PASSes remain.

Focused checks passed for 512/1024 exact before/after pixels, mask hide with raw pixels retained, Undo/Redo, Save/Open, decoded NOM pixels, mixed/masked/image overlay recipes/order, full-slot/quota/checkpoint/stale refusal, actual UI and staged-image preservation. Final validation and deployment pending. Device: select a painted Base colour → Selected layer settings → Base → Layer; appearance stays, Base paint selects; + Mask → Hide/Reveal/Grey. Undo/Redo and Save/Open. Also test .1065 Fill/Eraser/Smudge/Blur with Colour plus Roughness+Metalness, map previews, Done/reopen and navigation. Next: device feedback on Base/masks and combined tools; .1064 height benchmark still awaits real iPad source timing before displacement preview work. Standing push/publish authorization remains active.

.1066 focused validation: 54 PASS / 0 FAIL across Base conversion/masks, exact composite/project/NOM, original image/merge/limits, combined-channel tools/stencil and protected contact/camera/layout/edge/release checks. Hosted regression and deployment pending.

## .1066 final release validation — 2 November 2026

Hosted .1066 Topology 41444218912 passed 3,133 / 3,133 (zero failures); final focused checks 54 PASS / 0 FAIL. Pages 41444218237 succeeded. Runtime 0e83c6fd9b1c5da250226fe8ef7a81a8d17ddf93: live version.json, index.html, viewport-paint.js, viewport-paint-core.js and shell-comparison.js byte-match the release tree. Native device acceptance for Base conversion and the included .1065 combined tools/shared stencil remains pending.

## .1067 — selected layer settings stay open — 3 November 2026

User .1066 PASS protects Base → Layer, maskable Base paint, shared scalar stencil, combined Colour/Roughness/Metalness tools and earlier accepted Paint/camera/layout/edge behaviour. User requests Selected layer settings always open instead of a pull-out/disclosure.

Audit found one native details/summary in viewport-paint.js, plus two callbacks forcing it open. Replace only that wrapper with a labelled section and heading, preserving the actual controls, IDs, listeners, layer-list focus shortcuts and scroll bounds. Remove the two obsolete open assignments. Existing context eligibility remains: colour layer settings are hidden for scalar-only channel editing, and invalid/Base/AO actions retain original disabled states. No painter core, masks, history, resource, geometry or gesture changes; painter-core .1066 source and cache pin retained. Existing UI tests now assert section visibility instead of disclosure.open.

Validation and deployment pending. Device: enter Paint and see Selected layer settings without expanding; select Base then an overlay and use Base → Layer/+ Mask or opacity/blend; Done/reopen leaves settings expanded and footer reachable by scrolling. Next: device feedback; collect real .1064 height decode timings before displacement preview work. Standing push/publish authorization remains active.

.1067 focused checks: 38 PASS / 0 FAIL across layer/mask/Base UI, contacts, palette and release/cache contracts. Hosted regression and deployment pending.

## .1067 final release validation — 3 November 2026

Hosted Topology 41588914712 passed 3,133 / 3,133, zero failures; focused checks 38 PASS / 0 FAIL. Pages 41588914085 succeeded. Runtime 7cae3dc4a1dda76912e68444cdccd16f852d6b74: live version.json, index.html, viewport-paint.js and shell-comparison.js byte-match the release tree. User .1066 PASS remains protected; device confirmation of the non-collapsible settings presentation is pending.

## .1068 — expanded Paint settings without compressed layer rows — 3 November 2026

User FAIL .1067: screenshot shows layer rows compressed into thin strips after removing the Selected layer settings disclosure. Do NOT protect .1067 layout as accepted; .1066 Base/mask/channel tools and earlier interaction PASSes remain protected. Keep the requested settings open rather than reinstating a disclosure.

Audit: Layers is a height-capped CSS grid with an overflow-auto layer list. Expanded section consumes intrinsic space while default auto grid tracks allow the scrollable list and overflow-hidden row tracks to shrink toward zero. The previous DOM/state tests and green full suite did not verify CSS row dimensions and missed this failure. Repair only existing viewport-paint CSS: max-content auto rows/start alignment in the outer Layers grid, max-content rows plus 52px minimum in the list, and 52px minimum row height. Retain 42vh panel/200px list caps and scrolling, right dock, open settings, control IDs/listeners and protected .1066 core/pin. No new panels, gesture/layout polling or modelling changes.

Add docs/paint-panel-layout-1068.html as an isolated rendering regression fixture, not a second Paint UI owner. It extracts current Paint Layers markup/styles and uses the actual createPaintLayerList module in four independent 320×620/320×450/220×450 iframe cases with 2/4 rows. Reports real computed row heights, list viewport and reachability of the last row/settings; comparison removes only the repair rules to reproduce .1067 sizing. No project/WebGL required. Cloud browser cannot create WebGL; fixture is needed for real browser sizing evidence. Local Chromium download was unavailable (truncated vendor download); no claim of native iPad reproduction from DOM mocks. Browser fixture comparison and final deployment verification pending.

Device: Paint with 2–4 layers shows full readable rows, names/thumbnails and selection; scroll list/panel to lower layers/settings; settings remain open, footer/Done reachable; Done/reopen and ordinary mask/paint smoke. Next: native compact/iPad layout acceptance before returning to deferred height benchmarks. Standing push/publish authorization remains active.

.1068 focused checks: 38 PASS / 0 FAIL. Physical browser fixture comparison and final regression/deployment pending.

## .1068 final browser/regression/release validation — 3 November 2026

Real Chromium layout fixture: all four 2/4-row compact cases PASS with 52px rows, 107/200px list viewports and last-row/settings reachability. Removing only the repair rules reproduced .1067 in every case: 2px rows and a zero-height list viewport. Browser proof: docs/paint-panel-layout-1068-proof-1793692954936.jpg. Hosted Topology 41599816025 passed 3,133 / 3,133, zero failures; focused checks 38 PASS / 0 FAIL. Pages 41599815167 succeeded. Runtime 9d40c1407400c5f44bd64939bcb0e27b8f1a402d: live marker, shell, Paint UI and layout fixture byte-match the release tree. Native iPad visibility/scroll acceptance remains pending; .1067 remains FAIL.

## .1069 — approved three-box Home Screen icon — 3 November 2026

User approved the edited Three Box Symbol (green upper hollow box, blue lower-left, red lower-right, bottom-centre notch) and requested it for File → Add BoxLab to Home Screen. Protect this artwork choice; this approval is NOT a device PASS for the .1068 Paint layout repair, whose native acceptance remains pending. .1066 and earlier functional PASSes remain protected.

Audit: src/pwa-install.js already owns the File button, deferred native beforeinstallprompt and Safari Share → Add to Home Screen guidance. Preserve that owner and its exact source/pin. index.html and manifest.webmanifest still referenced the old .28.3 SVG. Replace active links with opaque square PNG exports of the approved image: 180px apple-touch-icon, 192/512px manifest icons and 32px favicon in icons/boxlab-1069-*.png. Versioned filenames and refreshed manifest URL avoid reusing old icon URLs. Keep relative start_url ./, standalone display, background/theme and original install path. Add apple-mobile-web-app-title BoxLab. No fake native install, share-sheet interception, new handler or service worker. Retain legacy icon.svg and frozen betas without changes; they are no longer active main-shell icons.

Export only: direct proportional downsampling of the approved raster, opaque RGB, no artwork regeneration/crop/rounding. icons/README.md records provenance and sizes. Only release/cache metadata in drawer-ui/face-workflow-layout and screen comparison updates; protected Paint UI/core, camera, gizmo, edge tools and Multi1.0 retain accepted bytes/pins. Reviewed asset contract includes all installed PNGs and refreshed manifest/parent loader URLs.

Validation: 15 focused release/cache/identity/frozen tests PASS, zero failures. Actual original install owner executed in a VM: Safari guidance, deferred native prompt once, then Safari fallback PASS. All four PNG signatures, declared dimensions, 8-bit RGB/opaque format and manifest start/display checked. 180px export visually reviewed. Hosted regression and Pages/live verification pending.

Device: open .1069 in Safari, File → Add BoxLab to Home Screen, then Safari Share → Add to Home Screen; preview must show the approved three-box icon and BoxLab name. Add it and launch the Home Screen web app. Existing saved shortcuts may retain their previous icon; test a newly added shortcut rather than promising automatic replacement. Also confirm .1068 Paint layer rows remain readable/scrollable with settings open. Next: native install-icon/layout feedback, then deferred .1064 height timings. Standing direct-main push/publish authorization remains active.

## .1069 final regression and publication verification — 3 November 2026

Hosted Topology 41606348676 (job 125817017568) passed 3,133 / 3,133, zero failures. Pages 41606347317 completed successfully. Runtime f732a77e03d3e5aab499fc35c328b533dfbce3c7, tree 944a598cf334315239edb605522ed5761f3bf110: live version.json, index.html, manifest.webmanifest, all four PNG icons and shell-comparison.js byte-match the checked release. Native Safari Add to Home Screen preview/launch acceptance remains pending; .1068 Paint layout device gate remains pending. Focused release/cache/identity/frozen checks 15 PASS / 0 FAIL, actual install-owner/PNG checks PASS. Approved icon choice protected; no native installation/layout PASS inferred. Standing push/publish authorization remains active.

## .1070 — proportional incoming Paint image resize — 3 November 2026

User .1069 PASS protects approved three-box Safari/Home Screen icon installation and launch. No separate .1068 native Paint-row layout PASS inferred. User requests incoming images larger than 1024 × 1024 fit proportionally with longest side 1024, and asks whether files are live linked.

Audit: authoritative paint-image-source owns PNG/JPEG header preflight, browser decode, exact encoded bytes and decoded pixels; original File input refused >2 MiB or >1024 per side. Image recipes embed source bytes/pixels in the existing project pools: no path/URL live link. Add importResizedPaintImage in that same stateless module for the file-input path only. Strict inspectPaintImage/capturePaintImageSource/importPaintImage stay bounded to the original 1024-side/2 MiB stored source, and alpha tip size/bytes are unchanged. Existing image layers, save/export and projection owners remain authoritative.

Incoming files are preflighted before decode: PNG/JPEG, at most 16 MiB encoded, 8192 per side and 24 × 1024² pixels. Small images within stored budgets use the exact original import with no enlargement/re-encoding. Otherwise snapshot source before await; request high-quality bounded ImageBitmap, explicitly fit via canvas even if resize options are ignored, encode PNG with alpha or JPEG at .92 quality, validate stored dimensions/format/2 MiB budget, release bitmap/canvas and decode the normalized encoding through the existing importer. JPEG retained pixel cache therefore matches its saved lossy encoding. No crop, stretch, new EXIF/orientation policy, live-link mechanism, resource schema or pool-budget increase. Normalized PNG that still exceeds 2 MiB is refused with explanation; unsupported/truncated/extreme inputs refuse before allocation or leave the scene unchanged. Existing stale request/selection/session guard remains in the File input.

Only viewport Paint uses the new .1070 importer URL. Existing alpha/capture consumers retain their .907 stateless URL and original semantics; reviewed hashes for the shared file are updated for both URLs. Parent viewport Paint .1070 and release/cache chain refreshed; .1066 core, .1068 layer CSS, gestures/camera/gizmo, icon assets and protected Multi1.0 retained. Add isolated docs/image-import-resize-1070.html for real browser PNG/JPEG scaling, alpha, row orientation, small-source byte equality and reopened pixel checks; no project/WebGL mutation.

Validation: focused importer/source/alpha/UI/image-layer/Base/history/project/NOM and release checks pass (individual runs 29, 17 and 9, zero failures; overlapping coverage). New importer tests exercise landscape, portrait, square, rounding/one-pixel aspect, exact small images, ignored decoder resizing, HTML and Offscreen encoder paths, JPEG storage/cache, before-await snapshot, bounds and failure cleanup. Browser fixture and hosted regression/deployment verification pending.

Device: + Image with a large landscape and portrait PNG/JPEG; proportions remain correct, no cropping. Place/Apply, Undo/Redo, Save/Open and Edit image; stored copy remains embedded. Try a transparent PNG and a small image; alpha stays and small images are not enlarged. Input safety caps above remain. Next: native image-import feedback; .1068 layout acceptance and .1064 height timings remain pending. Standing direct-main push/publish authorization remains active.

## .1070 final browser, regression and publication verification — 3 November 2026

Real Chromium browser fixture: 4 / 4 PASS for PNG 2048×1024→1024×512, PNG 1200×2400→512×1024, JPEG 4032×3024→1024×768 and unchanged PNG 64×32. Actual browser encoders/decoders verified row orientation, PNG alpha, exact small-source bytes and reopened normalized pixel equality. Screenshot docs/image-import-resize-1070-proof-1793698823423.jpg. Hosted Topology 41612660143 (job 125838188025): 3,140 PASS / 0 FAIL. Unique focused cases 43 PASS / 0 FAIL. Pages 41612658677 succeeded. Runtime 11584f64f44e2b63a73e7cec2f731c6905b605c8, tree 7b7ec1f34cf879d0654f39543dc87a3665960fba: live version.json, index.html, viewport-paint.js, paint-image-source.js and browser fixture byte-match the checked source. Native iPad import/placement/Save-Open acceptance remains pending. .1069 Home Screen user PASS protected; no additional .1068 layout PASS inferred.

## .1071 — Sharpen brush and selected-layer adjustments — 3 November 2026

User requests Sharpen paint tool, whole-image Blur/Sharpen and usual art adjustment sliders. User explicitly chose SELECTED LAYER over combined colour texture. This is new work, not a PASS for .1070 resize or .1068 layer layout; both native gates remain pending. .1069 Home Screen icon PASS and earlier protected Paint/camera/gizmo/edge behaviours remain.

Audit: original paint-core blurSnapshot, filter-domain/seam graph, viewport-paint-core resource/history and image-to-paint conversion already own this functionality. Extend them, not a second painter. New Sharpen action uses original one-pass premultiplied blur target as an unsharp reference; original Amount scales strength (8 = 1×), Opacity/Size/tips/pressure/contact cancellation remain original. Alpha/coverage is preserved. All Colour/Roughness/Metalness combinations and mask painting use original 512/1024 layers, stencil, filtered-domain and single-history transaction. Existing Blur/Smudge output remains protected. New inline Sharpen icon joins existing Paint radial; Brush retains first slot, other tools remain ordered. Tool routing now uses paintTools.length rather than hardcoded five tools.

Selected layer settings gains Adjust layer. Native modal blocks background input without adding a raw gesture owner. All 15 controls are present: Auto, Exposure (±3 stops), Brilliance, Highlights, Shadows, Contrast, Brightness, Black point, Saturation, Vibrance, Warmth, Tint, Blur, Sharpness, Definition. Own bounded editor formulas, not claimed Apple Photos algorithm parity. Colour layers/Base only; scalar-only and mask contexts refuse global colour adjustment. Mask, layer opacity/blend/order/visibility and other layers/scalar maps remain unchanged. Blur/Sharpness/Definition use original face/seam-aware read neighbourhood; UV atlas neighbours are never treated as connected surfaces. All controls preserve source alpha and transparent RGB.

Preview always renders from the opening raw layer snapshot (no repeated cumulative slider application). Auto uses alpha-weighted 1st/99th luminance percentiles; Exposure uses linear-light gain; separate fine/broad local detail targets reuse the existing kernel. Spatial targets and histogram are cached; input is debounced 160ms. Before/Reset/Cancel create no scene checkpoint. Apply preflights original pool/binding and makes ONE existing checkpoint. Neutral/no-op creates no history. Stale selection/resource/topology or checkpoint refusal cannot publish partial pixels. Existing imagePreview slot carries temporary layer candidate; existing commit owns publication. Tick/close retain original scene ownership.

IMPORTANT scope communicated to user BEFORE implementation: applying adjustments to an editable image uses the EXISTING rasterizeImagePaintLayer path, retaining its current placed/wrapped pixels as paint rather than trying to reconstruct a curved wrap from a flat image recipe. Dialog explicitly says Apply converts the image to paint; one Undo restores editable source/placement. Preview/Cancel keep the exact recipe; masks and settings remain. No source-image recipe mismatch, second projection, schema or save codec added. Applied adjustment values are baked pixels; reopening starts at neutral.

New paint-adjustments.js is a bounded colour transform helper sharing the original filter kernel. paint-adjustments-ui.js owns only native modal controls; access stays in original Paint layer panel. Main viewport/core/kernel pins .1071; accepted importer .1070, palette .1061, layer-list .1050, camera .1057, edge .1062, icon .1069 and protected Multi1.0 remain. Existing older standalone kernel consumers keep their previous URLs/semantics; reviewed hashes updated for the additive filter export and opt-in Sharpen path.

Validation: completed focused runs 27, 14 and 13 PASS / 0 FAIL (overlapping), plus original layer/mask nearby 14 PASS / 0 FAIL. Eight new tests cover all slider effects/neutral bounds, alpha, disconnected islands, brush sharpening/cancel, selected-layer preview/apply/Save-Open/Undo-Redo, stale/checkpoint refusal, explicit image conversion/Undo, actual UI access and one-step combined Colour/Roughness/Metalness Sharpen. Development-host 1024 helper sample: first spatial+tone render ~494ms, cached mixed ~129ms, cached detail-only ~49ms; excludes UV-domain construction and is NOT iPad frame-time evidence. Optimized away per-pixel iterators and caches filter targets. First spatial preview may pause; native device responsiveness remains a gate.

Add docs/paint-adjustments-1071.html to exercise the production modal/pixel helper on a generated browser sample without touching the app project; actual scene/history integration is separately tested above. Browser layout/control checks and full hosted regression/deployment pending.

Device: Paint radial → Sharpen; compare edge detail, Size/Opacity/Amount, combined channel previews and Undo. Layers → selected layer settings → Adjust layer; try tone/colour and Blur/Sharpness/Definition; Before, Reset, Cancel; reopen and Apply then one Undo/Redo. Image conversion warning, mask/blend/other-layer preservation, Save/Open, Done/reopen and Pencil/finger navigation. Next: native adjustment/import/layout feedback before deferred height benchmark work. Standing direct-main commit/push/Pages authorization remains active.

## .1071 final regression, browser and publication verification — 3 November 2026

Hosted Topology 41623847723 (job 125876122694) passed 3,148 / 3,148, zero failures. Pages 41623847372 succeeded. Runtime bf16f04a84780fce20c346eb047bee96843479ef, tree c6e612c1029ea1dda746fd347c5da6da5179c3d0: live version.json, index.html, viewport Paint UI/core, original paint kernel, both adjustment modules and browser fixture byte-match the checked source. 61 unique focused cases passed across successful focused runs. Real Chromium production-modal fixture confirms all 15 sliders, completed brightness and combined Exposure/Blur/Sharpness/Definition previews, Before disables Apply/restores original, Reset clears controls without edits, Cancel retains zero edits, and Apply closes with exactly one edit. Screenshot docs/paint-adjustments-1071-proof-1793703817744.jpg shows all 15 control names, explicit image-conversion notice and reachable footer. This generated-sample fixture validates real DOM/controls/pixel helper; actual painter resource/history/Save-Open and image conversion are covered by integration tests, not a claim of native iPad/WebGL acceptance. Native iPad responsiveness, Sharpen gestures and global layer adjustments remain pending; .1070 import and .1068 layer layout device gates remain pending.

## .1072 — first-contact Pencil pressure and removal of Auto — 3 November 2026

User reports an unwanted dab on the first touch even when lowering Pencil lightly. During this same build user explicitly requests removal of the useless Auto slider. No .1071 device PASS inferred; .1070 import/.1068 layer layout and .1071 native adjustment gates remain pending. .1069 Home Screen and earlier functional PASSes stay protected.

Audit found the authoritative viewport point adapter initialized lastPressure to 1, ignored zero pressure, and substituted previous positive pressure or 1 for first contact. A zero-pressure Pencil down could therefore stamp a full/stale-size brush immediately. Reset pressure to 0 on each fresh Pencil down (including lost-release recovery). Finite current pressure, including zero, updates the per-contact value and is clamped to 0–1; missing initial pressure stays zero. Only pointer-up retains last current-contact pressure to finish the existing tail. Mouse still uses 1. No arbitrary dead zone, delay or minimum-force threshold was added; actual low positive pressure remains low.

Original viewport painter now skips zero-pressure sampled dabs even if pressure→size is disabled. Its existing stroke stores waitingPressure until the first positive sample, then restarts the SAME original path at that actual location. Stationary pressure rise therefore paints intentionally without requiring pointer movement; unpressured travel does not draw a bridge from the initial touch. Both BoxLab/Klecks, multi-channel scratch layers, cancel/missed-up recovery, stroke history, contact capture and navigation owners remain original. Fill and image placement retain their pressure-independent behaviour. No raster kernel, camera, gizmo, mesh or new raw-pointer owner.

Remove Auto from the shared PAINT_ADJUSTMENTS descriptor and delete its unused histogram/percentile transform. Native panel therefore shows exactly 14 sliders; all remaining settings, cached filters, Before/Reset/Cancel/Apply and image conversion warning remain. Old applied pixels stay baked; no project migration or stored slider state exists. Tests explicitly reject a future reintroduction of auto settings. Re-pin adjustment helper→UI→viewport and current painter/release loader graph to .1072; original .1071 raster kernel remains untouched and pinned. New docs/paint-adjustments-1072.html exercises the current 14-control panel; .1071 proof/history remains historical.

Focused validation: 32 PASS / 0 FAIL across five new first-pressure tests, .1071 adjustment suite, all-channel tools, .1059 contact recovery and radial workflow; 9 release/cache checks PASS. New coverage tests zero contacts with pressure sizing on/off and both brush paths, no scalar/history resources, stationary onset, genuine small positive dabs versus firm dabs, zero/unknown contacts after firm strokes, no unpressured bridge, cancel/control restoration, mouse taps and Fill. Original positive-pressure zero-buttons coalesced movement and colour-focus/lost-release recovery remain covered. Auto absence and all 14 remaining slider effects/neutral/cancel/apply behaviour are covered.

Hosted full regression, real browser 14-control inspection and Pages/live verification pending. Device: gently lower Pencil then increase pressure; no large starting blob. Make a firm stroke then a light start, try both brushes and Colour with Roughness/Metalness. Deliberate tap, Fill, Undo/Redo, Done/reopen and finger navigation. Adjust layer starts with Exposure and has no Auto; remaining sliders/Apply/Cancel still work. Next: native first-contact and adjustment feedback before deferred height benchmarks. Standing direct-main push/publish authorization remains active.

## .1072 historical zero-pressure contract correction — 3 November 2026

Initial hosted Topology 41629906235 reported 3,152 PASS / 1 FAIL: historical paint-orbit-pressure-1047 explicitly required an all-zero-pressure tap to paint. This is the behaviour the user now asks to remove. Updated that original test to retain claimed/prevented Pencil contact, orbit-disabled ownership and Done/reopen assertions, add zero-pressure no-resource/no-history assertions, then require positive stationary pressure to paint exactly one checkpoint. Corrected focused run 8 PASS / 0 FAIL. Runtime code unchanged; application release remains .1072. Pages 41629904112 succeeded and all seven checked live files byte-match runtime e208f92bfbab99bb586dbe55c2e71e7b0905aa94. Browser fixture shows exactly 14 sliders starting with Exposure, no Auto, working Exposure/Brightness preview and Cancel leaving zero edits. Proof docs/paint-pressure-auto-1072-proof-1793706371075.jpg. Corrected hosted full suite pending; native Pencil acceptance pending.

## .1072 final regression and publication verification — 3 November 2026

Corrected hosted Topology 41631063517 (job 125900450459) passed 3,153 / 3,153, zero failures. Corrected Pages 41631063109 succeeded; runtime source remains byte-identical to e208f92bfbab99bb586dbe55c2e71e7b0905aa94 (tree 3474aa71ba7e8ffcc003394e92e159e54a5e8f02), with reviewed historical-test correction in 932cf514e46124bc2ee4206c3e1e0e135aa7f769. Seven live marker/shell/Paint/adjustment/fixture files byte-match tested runtime. 42 unique focused cases PASS / 0 FAIL. Browser inspection confirms exactly 14 sliders, Exposure first, no Auto; Exposure/Brightness preview enables Apply and Cancel retains zero edits. Archived proof docs/paint-pressure-auto-1072-proof-1793706371075.jpg. Native iPad first-touch pressure acceptance remains pending; no .1071/.1070/.1068 device PASS is inferred. Next: light start after firm stroke with pressure sizing enabled, both brushes/multi-channel paint, intentional taps/Fill/navigation, and remaining adjustment Apply/Cancel smoke.

## .1073 — defer the positive Pencil-down stamp — 3 November 2026

USER .1072 FAIL: screenshot visibly reports v0.36.18.1072 and shows round thick caps followed by thin strokes. Zero-pressure/stale-pressure handling was insufficient. Do NOT claim .1072 repaired the native onset, or explain this as stale cache. Auto removal remains retained (14 sliders), but no unrelated device PASS is inferred.

Audit found createStroke.start always emits an immediate dab. The main painter still called it on every positive initial event; a large first reported pressure followed by light movement therefore permanently stamped the cap. No actual device event-pressure trace was supplied: a high-positive-down/light-motion stream reproduces this failure pattern, but is not a claim about Safari's exact reported values. Existing .1072 tests exercised zero starts and genuine constant-low starts, not a positive first-sample spike or uncommitted preview pixels.

Repair only original viewport UI/painter owners. Pencil input marks deferPenStart; mouse/direct API strokes remain immediate. Pencil down claims/captures the existing Paint contact and suspends orbit, but does not start the original BoxLab/Klecks path or stamp visible pixels. Stationary samples update the latest pressure without ink. On the first positive moving sample, start the SAME path at the contact origin using the MOVING sample's pressure at both ends of that first segment, discarding the unsettled down pressure. If the origin was unpressured, start at the current pressured location so no bridge is painted across unpressured travel. No timer, artificial pressure floor, motion threshold or new input owner.

A deliberate stationary tap stamps on release with the latest pressure from that contact; an all-zero contact still creates no pixels/resources/history. Pending cancellation/lost release disposes the same original transaction and restores controls. Fill and image placement retain their existing immediate pressure-independent paths. All multi-channel scratch layers share the same deferred path. No-op finish now refreshes the original material preview after discarding scratch layers, so a pending/no-ink contact cannot leave a temporary scalar preview displayed. Existing single checkpoint, stencil/alpha, tool/radial/camera and gizmo owners remain. Native acceptance is still required.

Three new integration tests use the actual UI and painter: .9 down followed by .035 motion must match a .035 reference PIXEL FOR PIXEL in Colour/Roughness/Metalness, in BOTH brush paths; draft viewport texture must remain white on down (not merely resource undefined until commit). Stationary .9→.04 settling remains visibly unpainted until release and matches a .04 tap; pending positive cancellation with pressure sizing disabled leaves no resources/history and restores controls. Prior .1072 zero onset/no bridge, .1047 Paint-not-orbit/Done-reopen, .1059 colour-focus/lost-release and all-channel tests remain active.

Focused: 23 PASS / 0 FAIL across onset, existing pressure/contact/all-channel cases; 14 release/cache/radial checks PASS / 0 FAIL. Only main viewport/painter and release loader pins refresh to .1073; original raster kernel .1071, stroke/Bezier .896, 14-control adjustment UI/helper .1072, importer .1070, camera .1057, edge .1062, palette .1061 and protected Multi1.0 remain unchanged. No broad UI cleanup or parallel stroke implementation.

Hosted regression and Pages/live verification pending. Device: repeat the long light lines from the supplied .1072 screenshot; first moving stroke should not acquire a large round head. Firm-to-light starts; deliberate tap/lift (tap inks on release), both brushes, combined Colour/Roughness/Metalness, Undo/Redo, Done/reopen and finger navigation. Next: native onset feedback; if failure remains, collect first-event pressure/motion evidence before another speculative algorithm change. Earlier native adjustment/import/layout gates remain pending. Standing direct-main push/publish authorization remains active.


## .1073 final automated and deployment proof — 3 November 2026

Validation complete: 37 focused checks PASS; hosted full regression 3156 PASS / 0 FAIL (run 41635394374, job 125915185206, runtime commit bb9ea4fb34d965a51b00619c844a4bd21d1c28fe). Pages run 41635392457 succeeded. Live version.json, index.html, viewport-paint.js, viewport-paint-core.js and shell-comparison.js bytes match the .1073 runtime sources. Native Pencil acceptance remains PENDING; no device PASS inferred.

User .1072 FAIL remains recorded. .1073 native Pencil onset/taps, combined channels and contact recovery await user testing. No runtime changes in this proof update; current release remains 0.36.18.1073. Standing main/Pages push authorization remains in force.


## .1074 — brush controls and Pencil onset — 4 November 2026

.1073 native FAIL: strokes started at the upper right with Size 256 and a large head. The first moving pressure sample could still stamp an oversized head. .1074 confirms it against the next distinct moving sample and uses the lower reading for the initial segment. Later samples retain normal dynamics. Taps retain release behaviour.

Brush tip settings are visible in Brush controls. Independent Pencil Size and Opacity toggles use the sliders as ceilings. Size 256 gives the full size range. Defaults remain pressure sizing on and opacity dynamics off. Fill uses slider opacity and hides pressure options.

Native gate: test light Size 256 strokes with both brushes, all four toggle combinations, deliberate taps and combined channels. Native result pending. Standing main/Pages push authorization applies.


## .1074 native acceptance — 4 November 2026

User device PASS for .1074 on 4 November 2026. Pencil stroke onset no longer produces the large dab. Protect the two-sample onset handling and independent Size/Opacity pressure controls.


## .1070 and .1071 device acceptance — 4 November 2026

User reports PASS for .1070 proportional image import and .1071 whole-image adjustments. Record both as protected. The already recorded .1074 Pencil onset/pressure controls PASS remains protected.


## Opacity .1075 implementation checkpoint — 5 November 2026

WORK IN PROGRESS, UNPUBLISHED. User authorizes opacity map authoring for BoxLab-painted objects only. Imported NOM/GLB painting is outside this build because its UVs are incompatible. White is opaque, black transparent. Current live release remains .1074. Protected device PASSes: .1074 Pencil onset/pressure controls, .1071 adjustments and .1070 image import.

Local implementation now adds strict opacity R8 resource wrappers and a version-8 opacity project envelope around existing version 1–7 projects. boxlab-project-codec integrates encode/decode via the original scalar pools. Syntax and standalone scalar copy check pass. This is foundation work only, not a complete accepted persistence feature. No release pins or assets have been published.

Remaining before release: integrate object capture/history/duplicate/restore and mutation guards; add the scalar Paint channel using original tools and masks; show map preview and Lit transparency; update committed display, clear-paint and UV invalidation; add GLB/NOM export handling; focused old/new project round trips, history, UI and export checks; release markers/pins and reviewed fixture; push main, verify CI/Pages/live bytes. Avoid rewriting the existing painter or kernel. Do not treat this checkpoint as a completed .1075 build.


Local follow-up: extended original object duplication/options and snapshot resource capture to include opacityPaint, plus existing UV/Array/join resource-presence guards and Clear paint removal. Syntax and diff checks pass; runtime/history round-trip tests and release integration remain pending. This remains unpublished .1075 work.


Opacity follow-up: original viewport painter now recognizes an opacity scalar owner with white default, guarded resource identity and an additional explicit opacityValue input. Its channel chooser supports opacity. Existing createPaintSurface accepts an opacity scalar preview and assigns a linear green-channel alphaMap with transparent blending/depth-write handling and texture disposal. Syntax/diff checks pass. UI wiring, committed transparency display, history/runtime tests and exports remain incomplete; do not publish or claim device readiness.


Local opacity progress: Paint UI now has an Opacity channel and 0–255 value slider, passed explicitly to the original painter begin API. Committed display and render-mode selection now include opacity resources. Syntax checks pass and the 3 existing Pencil onset integration cases pass. Export is not integrated, project/history runtime coverage is incomplete, and release pins/markers are still .1074. This is unpublished work and is NOT ready for device testing.


Opacity validation follow-up: fixed addMesh option forwarding so opacity-only objects do not accidentally assign undefined metalness. Actual viewport painter smoke check opens a native UV cube, selects Opacity, paints black and verifies committed opacityPaint bytes contain zero. This verifies core commit only; full UI/history/save/export/device readiness remains pending.


## .1075 — opacity-map authoring implementation complete — 5 November 2026

Completed the BoxLab-native UV opacity authoring build after the earlier implementation checkpoints in this history. Opacity uses the existing scalar resource, painter, mask, history, project pool, preview and layer-thumbnail owners. Paint is available for Brush, Fill, Eraser, Smudge, Blur and the existing multi-channel tool path. Black is transparent and white opaque. `.boxlab` version 8 retains the linear R8 opacity data and reads v1–v7; duplicate, undo/redo, Done/reopen and UV mutation guards carry opacity. NOM/GLB/OBJ exports explicitly refuse authored opacity and preserve `.boxlab` rather than dropping data. Imported NOM/GLB UV painting remains out of scope.

Full local regression: 3160 tests PASS / 0 FAIL (148.8 s). Focused opacity UI/resource/project/export checks and relevant release/cache regression passed. Native iPad/Safari acceptance is pending; do not count automated results as a device PASS.

Direct-main and Pages publication was explicitly authorized as a standing instruction. Published commit `57ccff2de0e256559adc5b05c9270a6c52b866b0`. Hosted Topology regression run `41966147389` / job `127043485643` passed; Pages deployment run `41966146559` succeeded. Live `version.json`, `index.html`, `viewport-paint.js`, `viewport-paint-core.js`, scalar/opacity resources, project codec, paint target and shell comparison byte-match local main. Native iPad/Safari acceptance is now the user check.


## .1076 — reveal rear-facing interior through opacity — 5 November 2026

User reports .1075 opacity authoring PASS, then found committed opacity-painted objects appeared one-sided. Fix the authoritative committed-preview material in `src/paint-target.js`: use `THREE.DoubleSide` only while the opacity alphaMap is active, and restore `THREE.FrontSide` when opacity is cleared. Existing alphaMap, transparency/depth-write, fallback Studio material, geometry and texture lifetime remain unchanged. The same owner serves the committed material preview; no backface geometry or duplicate mesh is created.

Focused tests cover both-sided material state with opacity, front-only restoration without opacity, existing live opacity/project save path, color/metal shadows, current release markers/pins and canonical shell loaders: 20 PASS / 0 FAIL. Full regression: 3161 PASS / 0 FAIL (114.2 s). User check is pending: paint transparent areas, orbit to inspect rear-facing inside surfaces, Done/reopen, restore opacity and confirm regular surfaces remain unchanged. Protect the .1075 opacity authoring PASS; do not infer .1076 device acceptance.

Deployment proof: runtime commit `f96ec0627dc5711b23f3e1ba741a282f5967bc04`; full hosted Topology run `41972658077` / job `127064233246` passed; Pages run `41972657527` succeeded. Live release marker, shell and opacity preview/loaders byte-match local main.


## .1077 — compact Paint controls and Colour/Roughness/Metalness/Opacity strokes — 5 November 2026

User reports `.1076` opacity double-sided preview PASS. Request: shorten Paint UI, move explanations into tooltips, make scalar controls intuitive, and paint opacity with Colour/Roughness/Metalness in one stroke.

Audit found one existing multi-channel owner in `src/viewport-paint-core.js`: Roughness and Metalness already shared Brush/Fill/Eraser/Smudge/Blur/Sharpen, the material preview, masks and one `commitMulti` checkpoint. Extended that same channel list to Opacity, selecting its configured slider byte and passing its scratch layer into the existing alpha-map preview. No second painter, resource schema or history owner. The `.1075` opacity owner remains authoritative.

Paint UI replaces “Paint value” text with Less/More rough, Less/More metal, and Transparent/Opaque endpoints. Opacity value controls appear only when Opacity is selected in “Also paint” or is the primary channel. “Also paint” includes all three scalar maps with per-channel tooltips; long alpha tip text moved behind a tooltip and help button. Existing brush-size/pressure behavior and imported-object UV protection remain unchanged.

Release `.1077`; refresh shell, viewport Paint, nested painter and release-loader pins. Added atomic four-map Brush and UI checks; expanded the channel checkbox coverage. Focused Paint/opacity/all-tools regression: 21/21 PASS. Full suite: 3161/3161 PASS (112.9 s). Hosted Topology `41977607206` / job `127080007955` passed 3161/3161; Pages `41977606852` succeeded. Live release marker, index, Paint UI/core, shell, and loader files byte-match commit `7e8dea8c3d7cd596fd8fc9ff7fe6d8b2baf5e43f`. `.1076` and earlier user PASSes remain protected. Native check: combined four-channel stroke, preview, one-step Undo/Redo, opacity toggle/value, other Paint tools and Done/reopen.


## .1078 — coalesced Pencil pressure inherits active contact — 5 November 2026

User reports `.1077` Paint menu and combined-channel PASS but a blob remains at stroke start. Preserve the `.1077` menu/channels; repair only the residual Pencil onset path.

Audit found `point(e)` in `src/viewport-paint.js` updated Pencil pressure only when each event reported `pointerType === 'pen'`. The coalesced-move loop passed the child sample alone. When a child sample omitted `pointerType`, the adapter left `lastPressure` at the high Pencil-down value; the `.1073` two-sample guard then correctly used the minimum of two stale high readings and still began with an oversized cap. The gesture owns an authoritative `contactType` from down through release. Coalesced children now use that original contact type for pressure normalization. Mouse pressure remains fixed at one; no alternate stroke kernel, artificial pressure floor, or delay was introduced.

Added a UI regression that starts at `.9`, sends low `.035` coalesced samples without `pointerType`, and compares exact output to a `.035` reference for both BoxLab and Klecks. It covers Colour, Roughness, Metalness and Opacity, including one atomic transaction. Also ran existing onset/tap/cancel/contact recovery/orbit tests. Focused checks: 14 PASS / 0 FAIL. Full local regression: 3162 PASS / 0 FAIL (129.8 s). Hosted Topology run 41995563177 passed 3162/3162; Pages run 41995562728 succeeded. Live `.1078` marker and runtime bytes verified: `index.html`, `viewport-paint.js`, `drawer-ui.js`, `face-workflow-layout.js` and `shell-comparison.js` match. Native iPad/Safari check is still required. Standing main/Pages publication authorization remains active.


## .1079 — capture real Pencil paint onset evidence — 5 November 2026

User reports `.1078` FAIL: the first touch still paints a large dab. The automated high-down/low-coalesced scenario did not reproduce the device symptom; the proposed stale-pressure explanation is unconfirmed. Do not stack another pressure workaround onto the onset guard without device evidence.

Extend the existing opt-in Gesture Debug owner and its existing Capture/Copy report. UV Paint records raw pointerdown fields and normalized pressure, active brush/channel/pressure settings, up to eight coalesced samples, and pointerup values. The painter records whether onset is deferred and which pressures the onset guard selects. Its first eight generated UV dabs report pressure, computed colour/scalar map radii, UV hit and location. Instrumentation is inert unless Gesture Debug is enabled; it does not consume input or change painting.

Manual diagnostic: View → Gesture Debug ON; reproduce one first-touch blob in UV Paint; Capture report → Copy report; send the result. Turn diagnostics off afterwards. Keep `.1077` channel/menu PASS protected.


## .1080 — correct diagnostic release markers after hosted gate — 5 November 2026

The first diagnostic publication used `.1079`; hosted Topology caught two stale release-contract references and three old visible shell-comparison labels. The diagnostic code itself did not fail; 3159/3162 checks passed. Correct the release marker to `.1080`, update the shell comparison labels and expectation, and keep the direct/nested `release-version.js` pins paired at `.1078` because that owner is unchanged. Paint diagnostics and painting behavior remain unchanged. Re-run hosted Topology and Pages before requesting the native capture.


## .1081 — refresh the canonical release-version import chain — 5 November 2026

Hosted Topology for `.1080` found the release marker suite requires the direct `release-version.js` URL to equal `version.json`. Refresh the complete existing loader chain: index → drawer-ui → face-workflow-layout → release-version. Also repin the viewport paint child/core and comparison shell. No new diagnostic or paint behavior is added; this advances the previously published diagnostic to cache-distinct URLs and satisfies the existing release owner contract. Hosted Topology and Pages must pass before native report capture.

The first `.1081` hosted Topology run passed 3160/3162 checks; two release-contract tests identified the stale index `release-version.js` cache reference in `tests/fixtures/runtime-asset-contract.json`. Update that reviewed URL to `.1081` (module bytes are unchanged) and rerun the hosted regression; Pages and live runtime byte verification already succeeded for `.1081`.

After updating that reviewed cache reference, hosted Topology run `42030334556` passed 3162/3162; Pages run `42030333960` succeeded. The live `.1081` version marker and changed runtime modules byte-match the repository. The later user capture is recorded in `.1082` below.

## .1082 — settle Pencil pressure across the actual startup sample window — 6 November 2026

User supplied a `.1081` Gesture Debug report. A Pencil down at pressure `0.08` was followed by several early `0.08` samples; the painter confirmed onset while pressure remained `0.08` and stamped a `20.48px` texture-radius dab. Subsequent pressures fell to `0.02–0.03`, producing `5–9px` radii. Surface hits succeeded. The `60px` difference between document pointer coordinates and painter onset coordinates is viewport client-to-canvas conversion, not a raycast miss.

Keep the existing deferred Pencil stroke in `viewport-paint-core`; collect eight positive pressure samples (including down when positive) before beginning, retain the minimum pressure over that startup window, and replay buffered positions through the original kernel using that resolved pressure. Do not add a second painter. Stationary touches remain unpainted until release and use the latest pressure for deliberate taps. Later samples resume live pressure dynamics. The opt-in Gesture Debug onset line now includes the collected count and settling window.

Protected `.1077` compact Paint/four-channel strokes, `.1076` two-sided opacity preview, `.1075` opacity authoring and `.1074` brush controls. Automated suite and Pages validation pending; native iPad/Safari stroke check pending. Test Size 256/light starts, combined channels, taps, Undo/Redo, brush switching and finger orbit. If onset still blobs, collect `.1082` Capture/Copy; it will show pressure sample count, chosen minimum and first dab radius.

## .1083 — settle only oversized Pencil starts — 6 November 2026

Hosted `.1082` Topology found two live-preview regressions: `metalness-preview-923` and `roughness-preview-920` expected the second paint update, while blanket eight-sample settling delayed it. Keep the device report diagnosis: early pressure `0.08` predicted a `20.48px` initial radius; settled pressure `0.02–0.03` yields the later `5–9px` marks.

The original viewport painter now estimates the initial radius from the minimum pressure observed so far. When it is at most `8px`, it begins and replays the buffered stroke immediately. Larger projected starts continue sampling up to eight positive samples, allowing a lower pressure to shrink the predicted radius before ink is emitted. Pressure-independent brush size starts immediately. The Gesture Debug onset event records whether settling ended because the radius became safe, size was fixed, or the sample window completed. Same stroke kernel, later pressure dynamics, taps-on-release, multi-map transaction and input/navigation owners remain unchanged.

The `.1082` hosted run was 3160/3162; the two preview failures were not brush-output or map regressions, but delayed preview uploads. `.1083` hosted Topology and Pages validation pending; native iPad/Safari acceptance pending. Device gate: Size 256 with Pencil Size enabled, slow-light strokes, combined Colour/Roughness/Metalness/Opacity, taps, Undo/Redo, brush switching and finger orbit. Preserve `.1077` menu/channel and `.1076` two-sided opacity PASSes. Standing direct-main publication authorization remains active.


## .1084 — repair Pencil stroke startup and trace finalization — 6 November 2026

User `.1083` FAIL: Brush does not create a stroke. Reproduced through the actual viewport Paint UI harness: pointerdown hit the surface and `begin()` accepted, but the first moving Pencil sample raised `settings is not defined`; the UI caught it and cancelled the contact. Adaptive `move()` and `startPenPath()` closures referenced `settings`, a parameter local to `begin()`. Store the original brush settings on the existing stroke transaction and read `stroke.settings` / `active.settings` in those closures. No thresholds, pressure selection, stroke kernel or input owner changed.

Extend the existing opt-in Gesture Debug records with surface-hit, begin/move errors, pointer-finish, stroke commit result, changed channels, dab count and no-ink/target-change/commit-error outcomes. No added diagnostics consume input. Add actual UI regressions for a low-pressure stroke that settles and commits, and a zero-pressure contact that creates no pixels/history. Existing tests cover both brush paths and four-channel coalesced painting. Focused run: 11 PASS / 0 FAIL across the new trace and `.1072`–`.1078` onset/contact checks. Full local regression: 3,164 PASS / 0 FAIL. Hosted validation, Pages publication and native device check pending. `.1083` FAIL is not protected; preserve earlier user PASSes as listed in the handoff.

## .1084 publication and native blob report — 6 November 2026

Published runtime tree on `main` at `8015e1ce6b59cea1697f24358cb598805148f0ab`; a follow-up documentation commit `5724aae93e6ff54a6fb65e3afa8e1c120185cb35` restored the complete append-only history file after the connected Git Data upload hit the shell response-size limit. Current checked-out main and remote main share exact tree `64394fc4220ef08e92ad2937654821cfa08ad072`. Pages `version.json` and shell showed `.1084`; live `viewport-paint.js` and `viewport-paint-core.js` matched local SHA-256 `244aa41d450ece8e194c050da0a40ccc6f7d864deddd87909c63ce902ed1c670` and `09fd4a4276a7c7a8848b5330d1d5ce4db2980158725f322f8eaa323992d6ffc3`. Full local suite: 3,164 PASS / 0 FAIL. GitHub combined status returned no checks.

User confirms Brush now creates strokes but they have blobs. Supplied `.1084` trace: down pressure `.08`; first onset hit sample-window at `.056687`, radius `14.5119px`; another onset was `.022156`, radius `5.6720px`, followed by dabs `.866–1.616px`. The current `8px` safe-radius gate therefore accepts a still-elevated early minimum, and the eight-sample fallback can also start at a much larger radius. This is native evidence; do not treat `.1084` stroke-creation success as blob-free acceptance.

## .1085 — clamp unsettled Pencil startup — 6 November 2026

Preserve the existing 8px immediate-safe onset for stable pressure. If minimum pressure drops below 75% of a positive Pencil-down value, continue settling until the predicted radius is 2px or smaller; if the original eight-positive-sample window expires first, cap only the buffered initial path at 2px. This prevents a spiking pressure plateau from stamping an oversized head. Stable intentional pressure and later live dabs remain unchanged. Short contacts below the sample-window limit retain the existing minimum-pressure path, preserving `.1074` spike/reference equivalence and deliberate tap behavior. No timer, brush kernel, new input owner, or parallel painter.

Extend existing Gesture Debug onset evidence with observed/applied pressure, raw/applied radius, pressure-drop ratio and clamp state. Add actual Paint UI tests reproducing both reported high-start pressure patterns and asserting a capped initial dab; a constant `.08` trace confirms intentional stable pressure is not capped. The first full-suite attempt exposed two preview-upload timing regressions when the 2px threshold was applied to every stroke; restoring the original 8px fast path for stable pressure corrected both. A later run found the direct/nested release-version pins needed to stay canonical; all loader pins and reviewed hashes were refreshed. Final full local regression: 3,166 PASS / 0 FAIL; `git diff --check` clean. Hosted publication and native `.1085` blob acceptance pending. Preserve `.1077` compact menu/four-channel stroke PASSes, `.1076` two-sided opacity PASS, `.1075` opacity authoring PASS and `.1074` brush pressure controls PASS.

## .1085 publication and live asset verification — 6 November 2026

Runtime tree `c007fbc04d15c30a2214c5fd2ac067350a931a26` published to `main` at commit `92c37a155e1d4780fcf7b17368acd693d923beb0`. Local checkout is aligned with `origin/main` and clean before this publication note. Pages `version.json` reports `0.36.18.1085`; live version, shell, and refreshed runtime files exactly match local SHA-256: version `75b324295c17611db72e9a37d274b819bcc080d4d000a5550e4efbe5f16e69e5`; index `0e0e9b6e018bd423c5bcf141d105400daf91f3c603b2061e9625ed626b83f2ec`; viewport-paint.js `9efafdac2797b350cc3c5e297986a91e9fae43288ede10dcd2e13e2ea7f2e586`; viewport-paint-core.js `f629523c48aa390a6e5c8a40a247718291a4b264fec228ed5c4dac596bf9b213`; drawer-ui.js `1e3fa32acc44d11c2b962b80e87d7fda520e31b421ec527284cec579a83b997d`; face-workflow-layout.js `4330ca8544677c4f971f20bd36c70d5232bca61046c1b0dae36721a564bb5662`; shell-comparison.js `1fcab4a9a6dde58a1c7ca3ab897c240aa9ab9dad1beb6399d4044c24dd82b07a`. GitHub combined-status query returned no checks; do not claim hosted regression. Full local suite: 3,166 PASS / 0 FAIL. Native `.1085` blob-free acceptance pending.

## .1085 native acceptance — protected PASS — 6 November 2026

User confirms `.1085` Paint works without startup blobs. The tested workflow passed: slow-light Pencil strokes start cleanly; steady pressure retains full brush size; deliberate tap and Undo/Redo work; Colour, Roughness, Metalness and Opacity paint together. Protect the `.1085` onset repair and these Paint behaviors. Next build may proceed from current main; preserve `.1077` compact menu/four-channel, `.1076` two-sided opacity, `.1075` opacity authoring and `.1074` brush controls PASSes.


## .1085 Done/reopen smoke — protected PASS — 6 November 2026

After the full `.1085` native Pencil Paint PASS, user also confirms `Done → reopen UV Paint → draw again` passes. Protect this re-entry smoke with the onset, steady-pressure, tap, Undo/Redo and combined four-channel checks.

## .1086 — export authored opacity in GLB — 6 November 2026

The next narrow roadmap item was opacity export. Audit found the live paint exporter already snapshots Colour/Roughness/Metalness and the GLB writer already embeds lossless textures; native 512 × 512 opacity is an R8 resource with the same UV binding. Extend these original owners only: copy opacity into the existing export snapshot, validate its binding alongside other painted maps, encode RGBA base-colour PNG with authored alpha, and use white RGB when no Colour map exists. Use standard glTF `alphaMode: BLEND` and `doubleSided: true` for opacity materials, matching the accepted two-sided opacity preview. Colour/opacity dimensions are currently 512; the PNG writer also handles linear clamp resampling if a 512 opacity map is paired with a 1024 Colour map. Source resources remain unchanged.

The file GLB export status reports authored opacity maps. OBJ and NOMAD preserve their existing explicit opacity refusals. No changes to painting, preview rendering, topology, model kernel, `.boxlab` persistence or native NOM format. Release pins were refreshed for the GLB/exporter chain and canonical release-version shell loaders; the protected Multi transform pin is untouched.

Focused `paint-export-901` suite: 8 PASS / 0 FAIL, including exact PNG alpha/color bytes, opacity-only white RGB, resolution handling, actual GLB JSON/loader transparency and double-sided material, source immutability, and NOMAD refusal. Current release/asset-pin checks: 9 PASS / 0 FAIL. Full local regression: 3,168 PASS / 0 FAIL in 149.2 seconds. `git diff --check` is clean. Native iPad → Nomad export acceptance is pending.

Hands-on check: combined Colour+Opacity stroke; Done/reopen/redraw; export GLB and inspect the transparent region and rear faces in Nomad. Export opacity-only GLB and check transparency. Do not retest OBJ/NOMAD opacity as a success path; their warnings remain expected. After PASS, resume imported NOM/GLB UV paint as the next roadmap item.


## .1086 publication and live asset verification — 6 November 2026

Runtime commit `f9cbff5470e2d690095c015dd02fd15730653550` is on `main`, tree `0648b21457d5f60f10e3dc926a7ede41f2edf76c`; checked-out source matches that tree. Pages serves `version.json` `.1086`. Live SHA-256 exactly matches local for version.json, index.html, export-as-panel.js, paint-export.js, nomad-scalar-png.js, nomad-packed-maps.js, nomad-export-core.js, shell-comparison.js, drawer-ui.js and face-workflow-layout.js. GitHub combined status returned no checks; no hosted test result is claimed. Full local regression is 3,168 PASS / 0 FAIL; native iPad/Nomad acceptance remains pending.


## .1086 native opacity export — protected PASS — 6 November 2026

User reports PASS for the complete native gate: Colour and Opacity paint together; Done/reopen/redraw succeeds; exported GLB transparency and reverse-face visibility work in Nomad; and an opacity-only GLB retains transparency. Protect these results. This closes the `.1086` manual checklist.

User asks how many more builds before WASM starts. Repo audit finds no WASM code or explicit milestone. Set `.1087` as the kickoff: audit existing performance-sensitive owners, record repeatable JavaScript baselines, choose one measured candidate and define pass thresholds. Target `.1088` for a narrow WASM A/B prototype only if the baseline identifies a worthwhile target. Keep the original JavaScript owner and require equivalent output plus a measured speed gain; measure memory separately before claiming larger-mesh capacity. Imported NOM/GLB UV painting is deferred behind the initial WASM feasibility work and is not a prerequisite.

## .1087 — reconnect imported textureless NOM/GLB UV meshes to Paint — 6 November 2026

User reprioritizes imported NOM/GLB UV painting before WASM. Audit confirms the existing UV painter, `paintTargetKey`, project codec, paint-resource pools, and export snapshot are the authoritative owners. The actual blocker was the `source==='boxlab'` guard in the paint target/resource validator. No second painter, UV editor or modelling kernel is introduced.

Extend the original paint target/resource eligibility to imported NOM and GLB only when every face has valid UV corners within the 0–1 tile, the topology signature is current, and the payload has a single solid material with no embedded images. Reject imported vertex colours, tangents, morph targets, multi-material assignments, transparency/two-sided/unlit Nomad materials and more than 20,000 corners. Imported source payload remains in its existing `.boxlab` resource envelope. A fresh colour paint base is initialized from the viewport material's solid colour so painting does not erase the imported factor colour. Existing paint layers, map channels, brush/contact, UV binding, history and save/open remain in their current owners. UV edit guards already refuse UV changes while paint exists. Embedded-image source materials remain protected; this build does not composite or replace source texture maps.

Added actual owner regressions for imported NOM and GLB stroke commit, original material-colour startup, binding, and full project encode/decode. Added guards for imported textures, multiple materials and out-of-tile UVs. Refresh affected paint/resource/codec/import/export/UI loader pins and reviewed runtime asset contracts; the protected Multi transform remains pinned at `0.36.1.0`. `version.json`, title, visible release label and shell test list advance together to `.1087`.

Validation: focused imported-Paint 3/3; focused surrounding Paint/project/export/NOM-retention 24/24; full local suite 3,171 PASS / 0 FAIL in 146.4 s; `git diff --check` clean. Publication and live Pages byte verification are recorded in the `.1087` completion entry below. Native acceptance is pending. The device checklist covers untextured NOM/GLB painting, `.boxlab` reopen, and safe refusal of textured imports. The remaining prerequisite before WASM is textured imported base-colour composition and native Paint acceptance.
