Warning: truncated output (original token count: 339660)
... 310061 bytes omitted ...

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
- GLB MIME remains mod…212152 tokens truncated…ntax/whitespace clean. Full local
run is incomplete (stopped producing output in unchanged paint-resource checks);
not claimed PASS. Hosted full regression will be tracked separately. Native iPad
tactile/visual acceptance not inferred. Publication pending.

Reviewed1019 shell/recovery/comparison and TotalGizmo->pivot child cache closure;
canonical release->face-layout->drawer pins updated. Other transform owners retain
1017 bytes/pins. DEVICE1019: Pivot -> press/drag on face -> approach different edges,
watch actual gizmo move/snap X or Z while greenY remains normal and model still.
Release -> centre/Y manual turn still works -> Pivot finish -> Local transform;
UndoRedo and SaveOpen sanity. Start on another face for a new normal. Next native
feedback, then separately queued NOM texture/PBR retention. No new A/B test batch.

.1019 publication verified — 30 October 2026:
Runtime380b61c927e08be121a613ae2db04e89b1390aaa; uploaded/tested tree
4c5ceba0aa70ccadfc93b2669de54f1f1a061af3 exactly matches fetched origin/main.
All14 blobs hash-verified before non-forced expected-main update. Pages40981504272
build/deploy SUCCESS;13/13 fresh live files byte-match tested runtime: shell,
manifest,pivot,gizmo,comparison,canonical loader/recovery graph and unchanged corner,
origin,transform-upgrade,protected Multi1.0.62 focused checks PASS; full local
Node24.22.1:3007 PASS/0FAIL/0skip/0cancel (208.94s), superseding the initial local
in-progress note. Hosted40981504381 remains in_progress at proof,not claimed PASS.
Build1019 LIVE / READY for native iPad face-drag/edge-snap testing. All four handoff
documents current;.1018 preview PASS and .1017 alignment PASS protected. Existing
original-centre/Y turn, per-object WorldLocal, history and SaveOpen owners retained.
No native app/browser visual/feel result inferred from Node projection tests.
DEVICE1019: Pivot->press/drag on a face->approach real edges: actual gizmo moves,
X or Z aligns to edge,Y remains face normal,model still; release then centre/Y
manual turn,Pivot finish,Local transforms,UndoRedo/SaveOpen. New contact on another
face changes normal. NOM texture/PBR retention remains separately queued.

## .1020 — RGB miniature gizmo Pivot icon — 30 October 2026

User requests red/green/blue Pivot artwork with a small yellow circle, resembling
a tiny gizmo. Baseline maind8be0f4/runtime380b61c (.1019). Change ONLY the original
gizmoIcons.pivot SVG: green upward Y, red lower-left X, blue lower-right Z arrows,
small yellow centre ring. Explicit child stroke/fill keeps colours through existing
normal/pressed button colour inheritance; original24px SVG and40px button retained.
No duplicate button, action/label/listener/layout/pivot/geometry/history change.
Other shared icons remain exact. All import parents of shared gizmo-corner-controls
repinned together (TotalGizmo,object-management,viewport-toolbar->topbar,drawer),
plus original release/cache closure. Import-only changes outside SVG owner.

35 focused corner/release/cache/identity/comparison checks PASS; syntax/whitespace
clean. Exact SVG rendered/visually inspected at24px and enlarged in normal,pressed
and disabled states. All other icon artwork and action-function bytes unchanged;
no actual browser/native pixel acceptance claimed. Publication pending.
.1018 preview PASS/.1017 alignment PASS protected;
.1019 face-drag/edge-snap native acceptance remains pending, no PASS inferred from
this icon request. .1019 full local3007PASS remains baseline, no duplicate full
rerun for icon-only work. DEVICE1020: inspect RGB arrows/yellow ring at normal size,
tap Pivot on/off and verify colours remain; existing face-drag/edge-snap sanity.
Next native feedback; NOM texture/PBR retention separately queued.

.1020 publication verified — 30 October 2026:
Runtime6a05d77159aa6ee54670c49958b013c5c532964c; tested/uploaded tree
947a0f265f8e273d6f1fe5b90ca67526b7ffdb7d exactly matches fetched origin/main.
All16 blobs hash-verified before non-forced expected-main update. Pages40985099430
build/deploy SUCCESS;14/14 fresh live files match tested runtime: shell/manifest,
RGB Pivot icon and shared import parents,comparison/recovery/canonical loader graph,
unchanged local-pivot and protected Multi1.0.35 focused checks PASS/0FAIL/0skip;
syntax/whitespace clean. Exact SVG inspected24px/enlarged normal/pressed/disabled;
no actual browser/native icon acceptance inferred. Hosted40985099175 in_progress
at proof,not claimed PASS; .1019 full local3007PASS remains baseline,no redundant
full local icon-only rerun. Build1020 LIVE / READY for icon review. Other icon bytes,
action function,pivot alignment/surface drag/edge snap/transform owners unchanged.
All four handoff documents current;.1018 preview/.1017 alignment PASS protected;
.1019 native edge-snap acceptance still pending. DEVICE1020 RGB arrows/yellow centre
ring,normal/active colours,Pivot toggle and existing face placement sanity.

## .1021 — Pivot icon colour order — 30 October 2026

User requests blue bottom-left, green up, red bottom-right to match the gizmo.
Baseline main bdd1b712 / runtime6a05d771 (.1020). Swap ONLY the two lower
arrow stroke colours in original gizmoIcons.pivot; green arrow and yellow centre
ring retained. Original icon size, button/actions and pivot/transform owners unchanged.
Refresh the same reviewed shared-icon parent/cache graph as1020; preserve comparison
ratings including1020. Protected Multi1.0/frozen betas unchanged.
37 focused corner/release/identity/comparison checks PASS,0FAIL/0skip; syntax and
whitespace clean. SVG colour order and unchanged action/other-icon bytes verified.
Initial identity run needed the declared Three dependency; final rerun passes.
Published runtime d8ae5d4c4baaa67ef11a1ad89139c451adeb2299; tested tree
26aa26a19e43db0fea9ea69d9a6a4fa4f1c2e844 matches fetched origin/main exactly.
All16 blobs hash-verified before expected-main non-forced update. Pages40991382103
SUCCESS;14/14 fresh live files byte-match tested checkout, including corrected icon,
shared parent/cache graph and unchanged local-pivot/Multi1.0. Hosted40991382283
in_progress at proof; no full-suite/native device PASS claimed. Build1021 LIVE /
READY for testing. Native1021 icon-order check pending. Prior1017
alignment/1018 preview PASS protected;1019 device edge-snap acceptance still pending.
Next: verify icon colours in normal/active state, then existing Pivot toggle sanity.
NOM texture/PBR retention remains separately queued.

## .1022 — top-right floor/grid/off toggle; .1021 PASS — 30 October 2026

User explicitly PASSes1021; protect Pivot icon blue bottom-left/green up/red
bottom-right and yellow centre ring. No broader1019 device acceptance inferred.
Baseline main d655f56e / runtime d8ae5d4c. User requests top-right three-state
floor icon: light-grey filled plane -> gridded plane -> unfilled outline -> plane.

Original shell adds ONE40px button before VIEW with24px plane artwork from startup;
original toolbar order/hydration keeps this same node. Existing ground-polish owner
holds a session-only plane/grid/off choice (fresh load starts plane), binds one native
click handler and synchronizes artwork/accessible current+next-state labels. No new
raw pointer owner, renderer, ground mesh, duplicate controls or history entry.
Original grid and Studio floor are mutually exclusive; off hides both and Studio's
separate contact-shadow decal. Original studio-polish refresh respects this choice;
render-modes uses the same state when initializing/synchronizing its floor directly,
without adding a per-body scene traversal. Existing floor placement/shadows/lights,
grid opacity and axes unchanged. Floor remains original Studio-only surface; other
looks retain their prior no-plane behavior. Grid is available across looks. Choice
survives look switches/bridge updates within session. Existing Clean View still hides
grid/axes temporarily and restores chosen grid on exit; it does not change preference.

54 focused checks PASS/0FAIL/0skip; four new actual ground-owner/button/Studio-polish/
render-sync tests cover cycle/icons, early input/late bridge, one listener, invalid
state refusal, no extra scene objects/model transforms, Clean/View restoration and
contact decal not reappearing after pointer-driven polish. Existing toolbar shell
count/order fixture expanded ONLY for requested new button; legacy fallback and all
original action/hydration assertions retained. Existing render/Studio/compact/Objects/
snap/release/cache/identity/comparison checks pass. JS syntax/whitespace clean.
No full-suite, rendered-browser or native iPad PASS claimed.1021 user PASS protected.
Reviewed1022 shell/recovery/comparison,toolbar->topbar,ground+studio-polish->face-layout
->drawer and render-mode pins/hashes. Icon/corner/TotalGizmo1021,local-pivot1019,
transform owners,protected Multi1.0,frozen betas/navigation/Paint/UV unchanged.

Published runtime4c10c95fec6c71eaf0c5c4d77cbf94082962553e; tested/uploaded tree
00f84fc40b976aa8e16be1ccb959c9d0f706bba9 equals fetched origin/main exactly.
All18 blobs hash-verified before non-forced expected-main update. Pages40995326471
SUCCESS;16/16 fresh live files byte-match tested source: shell/manifest,new ground/
Studio/toolbar owners,parent/cache graph and unchanged accepted Pivot icon,Total
Gizmo,local-pivot and protected Multi1.0. Hosted40995327653 in_progress at proof;
no full-suite/native iPad PASS claimed. Build1022 LIVE / READY for testing.
DEVICE1022 in Studio: inspect filled grey plane icon before
VIEW; tap to grid (plane/contact shadow disappear), tap to off (grid disappears),
tap to plane (original floor/shadow return). Orbit after each; check repeated cycle,
Studio->Solid->Studio retains choice, Clean View hides/restores selected grid.
Next: native1022 feedback; NOM texture/PBR retention remains separately queued.

## .1023 — grid visibility / Pivot shortcuts / selected-Face edge snap — 30 October 2026

User1022 PASS protects top-right plane/grid/off cycle and contact-shadow hiding.
User reports Object/Edge pivot-edge alignment works well; protect those workflows.
User requests10% stronger grid,only two pivot icons during Pivot editing,and repair
of selected-Face edge alignment. Baseline main035072b2 / runtime4c10c95f (.1022).

Original ground-polish opacity increases relatively10%: Studio .18->.198,other looks
.34->.374. Original floor cycle/axes/Clean masks/contact shadow owners unchanged.
Original corner-controls hides all shortcut buttons/groups except Pivot and
World/Local while editing; original mode-specific visibility returns on exit.
Actual RGB gizmo axes/planes/rings preview and centre/Y turning remain visible and
unchanged. Pivot artwork/toolbar/history actions unchanged; no duplicate controls.

Reproduced Face error: a ray on a shared polygon edge can select the neighbour's
render triangle,using its normal even when another face is selected. Face placement
now requests selected polygons; per-drag surface/probes retain the latched polygon.
Nearest-surface depth ties prefer selected face. Filtering ray hits alone was
insufficient because exact boundary rays sometimes hit only ONE adjacent triangle.
Read-only fallback recovers selected neighbour ONLY on the same actual shared edge
of that already-visible nearest body,using original mesh edgeKey/faceNormal and a
bounded numerical tolerance. Front-facing check retained; no through-object picking,
new triangulation,diagonal snaps,geometry/history kernel or material edit. Unrelated
selected polygons and occluded/back faces cannot become targets. Object/Edge initial
picking stays unrestricted; all modes retain existing14/20px magnet and X/Z sign
selection with greenY normal. Draft/cancel/one-checkpoint/UndoRedo/SaveOpen retained.

76 focused checks PASS/0FAIL/0skip;3 new checks include reproduced pre-fix Face normal
and shortcut-visibility failures plus tilted-edge Object/Edge/Face mouse/Pencil/touch
parity and unselected/hidden-face refusal. Grid opacity assertions added to original
floor-owner tests. Original pivot projection/selection/history/codec/cancel/occlusion,
corner/toolbar/Objects/Clean/snap/release/cache/identity/comparison checks pass.
Syntax/whitespace clean. No full-suite/rendered-browser/native iPad PASS claimed.
Reviewed1023 ground+shared corner+pivot parents,TotalGizmo,object-management,
viewport-toolbar->topbar,face-layout->drawer and recovery/comparison cache closure.
Other import-parent changes are pins only. Transform owners/Multi1.0/frozen betas,
accepted floor/render/studio-polish and navigation/Paint/UV unchanged.

Published runtimeb45a3a9acd6f15b2d394e6c8f14ddd9fec1314e9; tested/uploaded tree
bf59592796d15b1623a58be8a443ef471b38301f equals fetched origin/main exactly.
All21 blobs hash-verified before non-forced expected-main update. Pages40996655063
SUCCESS;18/18 fresh live files byte-match tested source: shell/manifest,ground,
pivot/corner/TotalGizmo and parent/cache graph plus unchanged transform/Multi1.0/
accepted render/Studio-polish owners. Hosted40996655551 in_progress at proof;
no full-suite/native iPad PASS claimed. Build1023 LIVE / READY for testing.
DEVICE1023: grid subtly clearer; Pivot edit shows ONLY Pivot
and World/Local shortcuts,exit restores original icons; Face select->Pivot->drag
across face and to real edges,X/Z aligns and Y stays selected-face normal,model
still. Include shared-edge start and rotated face; Object/Edge quick parity; finish,
Local transform and UndoRedo. Next native Face feedback; NOM texture/PBR queued.

## .1024 — readable underside lighting for Studio and Solid — 30 October 2026

User explicitly PASSes .1023: protect stronger grid, Pivot-only shortcuts and
selected-Face/shared-edge alignment. Baseline main7515be61/runtimeb45a3a9a.
User requests readable underside under full360 orbit without excessive ambient,
and suggests shadow-free Solid for modelling.

Audit: existing Solid uses original Standard material, overhead key3.2 and
hemisphere1.2 with dark ground colour; Studio adds three above-model directional
lights. Original render-modes owner now adds ONE reusable shadow-free directional
underside fill outside the Studio rig,opposing original base key (-4,-7,-5).
Studio intensity .95; Solid1.6. Direction is independent of model position/scale.
No increase to hemisphere intensity/ground colour or emissive material, no extra
shadow map/renderer/frame callback/input owner. Original Studio default, floor,
shadows, Key/Fill/Rim controls and Studio polish light-discovery remain unchanged.
Solid retains shadowMap disabled. Fill hidden in every other look; repeated mode/
body updates reuse it. Active/inactive/paint surfaces share existing scene lights.
No geometry, selection, history, UV/Paint data, Pivot or navigation changes.

46 focused checks PASS/0FAIL/0skip, including2 new actual-owner/real-Three tests:
all six Solid principal normals receive directional energy, bottom/top direct
strength ratio .5, original ambient unchanged, no added shadow, mode isolation,
Studio original3 directional lights, reuse and model-resource preservation.
Existing render/Facegroups/committed paint/floor-contact/release/identity/comparison
checks pass; syntax/whitespace clean. Floor test's isolated syncStudio harness now
stubs the new lighting helper only; all ground assertions retained. No browser/
native iPad appearance or full-suite performance claim from these math/Node checks.

Reviewed1024 direct render pin and shell markers,comparison migration retains1023
ratings; canonical release->face-layout->drawer cache closure refreshed (import-only).
Multi1.0 remains exact Beta6/pin1.0; frozen betas and all other runtime owners retained.
Published runtime d90b31541ad3c621c8cdd88977f036ce3ef9555f; fetched origin/main tree
fd6ca02e4b1e8ce074016a2869ecf47544155382 exactly matches tested/uploaded tree.
All13 changed blobs hash-verified before non-forced expected-main update.
Pages41009576824 SUCCESS;12/12 fresh live files byte-match tested source: shell,
manifest,render owner,canonical cache graph,comparison and unchanged Multi/Pivot/
ground/Studio-polish. Hosted41009577601 in_progress at proof,not claimed PASS.
Build1024 LIVE / READY for iPad lighting-balance testing. No native visual PASS.
DEVICE1024: Studio orbit below model, judge underside readability and shape contrast;
VIEW->Solid repeat full orbit, shadow-free modelling; switch Studio/Solid/Facegroups
and back, floor/grid/off sanity; move model/orbit and confirm consistent fill.
Next native lighting-balance feedback; NOM texture/PBR retention separately queued.

## .1024 user PASS — 30 October 2026

User explicitly reports “1024 PASS”. Protect accepted Studio/Solid underside
readability: original render owner underside fill .95 Studio/1.6 Solid, unchanged
ambient and Studio controls; Solid remains shadow-free. .1023 PASS retained.
Hosted full regression41009577601 now completed SUCCESS (rechecked after feedback).
Runtime remains d90b3154 / build0.36.18.1024; acceptance documentation only, no new
runtime build or mandatory hands-on test. Next await user direction; NOM texture/
PBR retention remains queued. Existing navigation/Pivot/floor protections retained.

## .1025 — native NOM map retention and viewport colour — 30 October 2026

User .1024 PASS protected; current baseline main4c45138c/runtimed90b3154.
User requests returning to native NOM texture viewport work and /nextbuild.
Audit confirms1015 importer ignored material/images; existing UV image overlay,
resource pool/codec and native NOM exporter are authoritative. See
`docs/nomad-material-retention-1025.md` for implementation and exact scope.

Native source:'nomad' resource stores material JSON + encoded referenced images,
original UVs and import fit. Resource envelopev4 uses EXISTING24MiB image pool/
transport; strict BoxLab UVv3 and GLBv1/v2 unchanged. No fake GLB provenance.
Original NOM writer copies every native texture slot/byte/settings (including
opacity/emissive/16-bit displacement and separate scalar maps),remaps image indices,
never enters GLB packed conversion. Export-local fit reversal preserves source
world positions/units. Existing topology signature refuses stale textured export;
resources remain saved/Undo-restorable. Native UV editing remains refused initially.

Studio/Solid auto-display supported opaque PNG/JPEG UV/Auto colour maps via original
UV overlay/buildGeometry/decode/disposal with scene-lit Standard material. Original
UV Image is unlit inspection. Existing normals,scalar material constants and scene
lighting retained; other texture maps NOT displayed yet. Original body picking,
selection/history/geometry and1024 lighting unchanged. Source UVs retained; scale
5x5 respected. Rotation/translation,triplanar,transparency are retained-only. Native
node/procedural structure/local-triplanar fidelity after baked transforms not claimed.
Budget4 surfaces/20,000corners each/8MiB source image/1024square decoded preview.
Hidden/reference/linked/modifier/procedural guards retained. Textured native GLB
export explicitly refuses rather than dropping maps; NOMAD/.boxlab retain them.
Untextured NOM geometry/UV GLB path retained. REIMPORT original.nom; old projects
cannot recover maps previously discarded by1015.

Six new actual-owner/real-Three tests cover all slots/raw hashes/16-bit/pooled+inline
SaveOpen/browser NOM export/source units,dispatcher/malformed/stale refusal,lit5x
surface/picking/active+inactive guards/cancel/disposal/display budgets. Original
synthetic paint-warning fixture now has valid empty material; original assertions
retained,new tests explicitly reject invalid material/image refs.159 focused checks
PASS; final full local Node24.22.1 suite3022 PASS/0FAIL/0skip/0cancel (110.32s).
Syntax/diff clean.
Real MAP TEST and MAP TEST(1) both File-import->fit->pooled SaveOpen->browser NOM->
parse PASS: exact colour image hash/settings and5x5 repeat,source worldpositions
within2e-6;496v/504f Cube and7911v/7916f Text preserved. Private files not committed.
No rendered-browser/native iPad or complete PBR/vertex-paint fidelity claim.

Reviewed1025 resource/codec/paint/export/import/render/overlay parents and canonical
release->face-layout->drawer/UV Lab closure; most parent diffs are import pins only.
Accepted1024 actual light code,main/Multi1.0/frozen betas and geometry kernels remain.
No new A/B test batch.
Published runtime b75079208f1b1fc3ca9546c8854c0ea8a954af6d; fetched origin/main tree
80fdac209d1a9778c7a8650fe870b901c8fc2bf3 equals tested/uploaded tree exactly.
All39 changed blobs verified before non-forced expected-main update. Pages
41012329078 SUCCESS; hosted full regression41012329141 completed SUCCESS.
18/27 fresh live file byte matches; remaining9 requests timed out at network proxy,
not counted PASS. Live browser separately confirms title/data/visible1025 and all
six render/import/export/codec-parent/release shell pins1025. Browser's WebGL is
explicitly DISABLED,so no rendered startup/texture visual or native iPad PASS claim.
Build1025 DEPLOYED / READY for native colour/round-trip testing. No runtime edits
after final full3022PASS. Publication proof is documentation-only.
DEVICE1025 reimport MAP TEST.nom in Studio/Solid; colour patterned cube visible with
correct5x tiling,orbit/select/Move. SaveOpen.boxlab retains texture. Export NOMAD,
open in Nomad and compare texture/tiling. Switch looks/UndoRedo;1024 underside and
floor cycle sanity. Next native colour feedback,then normal/scalar/emissive preview
through same retained-resource owner; opacity/displacement display remain deferred.

## .1026 — native NOM normal / roughness / metalness viewport — 30 October 2026

User explicitly PASSes1025 and requests /nextbuild. Protect accepted native colour/
5x tiling,retained maps/SaveOpen/NOM/source-unit pipeline and1024 lighting. Baseline
mainb20f630d/runtimeb7507920. Audit original resource/UV-image/decoder and existing
paint reflection pool925; no parallel material/geometry/picking/history owner.

Existing Studio/Solid NOM colour overlay adds linear tangent normalMap (factorNormal,
normal_neg_y/legacy flip_y),separate opaque GRAYSCALE roughness/metalness maps and
saved factorRoughness/factorMetalness. Independent supported UV/Auto/repeat sampling.
Data decode uses no colour conversion/premultiplication; scalar canvas replicates
validated grey into RGB for Three G/B reads. Coloured/translucent scalars stay
retained-only rather than guessing a channel. Colour appears first; failed/unsupported
auxiliary keeps it. Always-unlit and UV Image remain accepted colour-only inspection.
Metallic map materials reuse exact925 shared/refcounted room PMREM if scene has no
explicit environment; material-only,unavailable GPU gracefully uses direct lights.
Original source bytes,bit depth,material JSON,codec/import/export behavior unchanged.

Bounds4native surfaces/20k corners each; colour+normal1024square/scalars512square;
combined unique encoded choices<=8MiB per surface. Original24MiB retained pool.
Opacity/emissive/displacement still retained-only; colour source still required;
translation/rotation/triplanar remain unsupported display. No new dense geometry,
new startup default or change to1024 floor/lights/navigation/Pivot/selection/Paint.
NOM import status now describes supported normal/grayscale scalar preview honestly.

Six new actual-owner/real-Three tests cover plans/factors/Y/per-map transforms,
linear decoder/grayscale/alpha/refusals,cancel/late/no-extra-start,reflection cleanup/
explicit environment,unlit/UVImage,SaveOpen/NOM byte stability and actual Studio/Solid
integration/picking/source geometry. Existing1025 colour-only baseline fixtures made
explicitly colour-only; ALL original colour assertions/all-map retention tests kept.
157 focused PASS/0FAIL/0skip. Final full local Node24.22.1 suite3028 PASS/0FAIL/
0skip/0cancel (183.48s); changed JS syntax/diff clean. Cloud WebGL was disabled during1025; no new browser/GPU or
native1026 visual acceptance claimed. Details/docs/nomad-pbr-preview-1026.md.

Generic ready-to-import NOM_PBR_1026.nom (79,292bytes) supplied separately:3 cubes,
normal+roughness / metallic+roughness / colour control. Original procedural128maps,
no private artwork; regenerate from tests/helpers/nomad-pbr-fixture.mjs. No user asks
to construct backend fixtures. Reviewed1026 child/parent/cache closure incl original
UV decoder->workspace/Lab/exports and canonical release->face-layout->drawer; most
changes are pins only. Protected main/Multi1.0/frozen betas and actual1024 lighting
bytes unchanged. No new A/B batch.
Published runtime68320e5cec753747de8ecb5697158aa536cd5428; fetched origin/main tree
7b59ab712d2d6229c6dbf89e691e5b8a7825ce6b exactly matches tested/uploaded source.
All44 changed blobs hash-verified before non-forced expected-main update. Pages
41025737253 SUCCESS;9/9 fresh live files byte-match: shell/manifest,native resource,
decoder,UV surface,import/render owners and unchanged reflection925/Multi1.0.
Hosted41025737405 in_progress at proof; no hosted full PASS claimed. Full local3028
PASS/0FAIL/0skip remains final validation. Build1026 LIVE / READY for native PBR test.
No runtime edits after final full suite; no rendered-browser/iPad acceptance inferred.
DEVICE1026 import sample Studio/Solid,left normal/roughness relief,middle metallic
variation while orbiting,right colour control; SaveOpen.boxlab + NOMAD/Nomad sanity,
old MAP TEST colour/5x accepted. Next native feedback then emissive preview through
same owner; opacity/displacement display deferred.


## .1027 — native NOM emissive viewport — 30 October 2026

User explicitly reports “1026 PASS /nextbuild”. Protect accepted native normal,
roughness/metalness, colour/5x tiling, retained source bytes and round trips, and
1024 underside lighting. Baseline main b07c2859 / runtime 68320e5c.

Audit: existing nomad-material-resource and uv-image-surface-preview own native map
planning/decoding/material lifetime. Extend those owners only: supported opaque
UV/Auto emissive texture in Studio/Solid, sRGB image, saved linear factorEmissive
RGB and factorEmissiveStrength, independent repeat/sampler. Saved zero values remain
zero. Invalid factors/projections or exhausted combined8MiB budget remain retained-
only; failed/late auxiliary decode keeps accepted colour/PBR and cleans up normally.
Emission is surface brightness, with no added scene light/bloom/renderer. Colour
source still required; always_unlit and UV Image remain colour-only inspection.
Opacity/displacement display and translated/rotated/triplanar sampling stay deferred.
Original source bytes/material JSON/export/codec and geometry/picking/history retained.
Four native surfaces/20k corners; emissive1024square uses original serial decoder.

Four new real-owner tests cover plan/factors/tiling/budget/refusals, actual Three
sRGB emissiveMap/intensity and existing data maps, late/failure/unlit cleanup, and
byte-identical pooled SaveOpen/NOM. Original1025/1026 tests unchanged.25 focused
checks PASS/0FAIL/0skip. Full local Node24.22.1:3032 PASS/0FAIL/0skip/0cancel
(185.63s); four new tests also rerun after adding explicit zero-factor assertions.
Syntax/diff clean; no native GPU/iPad emissive acceptance inferred.
Reviewed reverse-loader cache closure; most changes are pins only. Main/Multi1.0,
frozen betas, actual1024 lighting and paint/reflection code unchanged. Existing
in-app test list includes1027 checks; no new A/B batch required.

Generic sample: docs/samples/NOM_EMISSIVE_1027.nom, regenerated by the existing
nomadPBRFixture({emissive:true}) and native writer. Left cube adds blue emissive
factor/strength2 to normal+roughness, middle PBR and right colour controls unchanged.
DEVICE1027: import sample Studio/Solid and orbit below; left emissive remains bright,
other cubes retain normal/scalar shading; switch looks/back. Save/Open.boxlab and
NOMAD reopen in Nomad retain it. Check accepted1026 sample still looks the same.
Next: native emissive feedback; opacity display needs separate scoped audit, while
subdivision/displacement remains deferred. Publication proof follows validation.

Publication verified: runtime f1b4405fcdbde50384f2b07c51d535ee8e3bce8e;
fetched origin/main tree6de75a1f9b6abab77cdc9453d11c6fc769f32a5d exactly matches
tested/uploaded tree. All40 changed blobs hash-verified before expected-main,
non-forced update. Seven fresh live files byte-match: shell/manifest, material
resource/overlay/import owner/test list and downloadable sample. Pages41030968556
and hosted topology41030969386 were in_progress at last query; no hosted PASS
claimed. Full local3032PASS remains validation. Build1027 LIVE / READY for native
emissive testing. No runtime edits after full suite; native visual gate pending.

## .1028 — native NOM opacity viewport — 30 October 2026

User explicitly reports “1027 PASS /nextbuild”. Protect accepted emissive1027,
normal/scalars1026, colour/tiling/retention1025 and underside lighting1024.
Baseline mainfb2fc2de / runtimef1b4405f. Repo/source audit confirms original native
resource/UV overlay/decoder and render-modes are authoritative.

Studio/Solid lit native surfaces now preview separate opaque grayscale opacity maps
(linear alphaMap <=512square, saved factorOpacity * material blending opacity) and
simple blending material uniform opacity including zero. Original colour still
required. Opaque base or blending only; other native types and use_color_opacity
remain retained-only for opacity; accepted opaque colour/PBR inspection is preserved
for colour-alpha files. Per-map repeat/sampler and combined8MiB/4surfaces/20k corners
remain. Unlit/UV Image keep prior colour-only policy; source bytes/settings untouched.
Unsupported/failed opacity retains accepted colour/PBR and original opacity fallback;
late cancellation closes image and cannot activate transparency.

One scoped original Standard material shader hook ignores colour-map alpha while
sampling RGB, because native colour alpha is opt-in/deferred. Original bitmap decode
requests unpremultiplied RGB for these surfaces without changing sRGB conversion.
No canvas alpha rewrite/re-encode: that rejected approach loses RGB at alpha0 through
canvas premultiplication. Shader uses installed Three0.179.1 map chunk/cache key.
Native transparency uses existing alpha blending/depthWritefalse; original mesh
picking remains solid. Transparent self/intersecting sorting and optical refraction
fidelity are NOT claimed. Original orange backface cue hides for confirmed translucent
surfaces and restores on disposal. Mesh shadows disabled (not transparent shadows);
both original Studio refresh owners respect overlay lifetime flag so it cannot re-enable solid
shadows. General floor contact cue remains unchanged. No geometry/history/input,
extra renderer/light, global material override or duplicate owner.

Six new owner/real-Three tests cover guards/budgets/factors/sampling, material and
shader semantics, uniform+map and zero alpha, failure/late disposal, decoder options,
actual Studio/Solid/rig and late pointer-release scene-refresh cleanup and exact pooled project/NOM byte roundtrip.
31 final focused PASS/0FAIL/0skip. Broad local Node24.22.1 suite3038 PASS/
0FAIL/0skip/0cancel (199.52s), following earlier3038PASS. Final focused31 rerun
covers backward-compatible opaque colour-alpha fallback and serializable UUID
opacity ownership (no circular userData). Syntax/diff clean; no native GPU PASS.
Reviewed reverse-loader pins include original decoder/UV/export/paint parents;
most changes are cache references only. Main/Multi1.0/frozen betas, actual light
code and accepted1027 emission behavior retained. In-app checklist includes1028.
Generic sample docs/samples/NOM_OPACITY_1028.nom uses original native writer;
left grayscale checker opacity, middle35% uniform, right opaque control.

DEVICE1028: import sample Studio/Solid, orbit and inspect checker holes/middle
transparency/control; no orange fill through transparent areas. Select/Move/UndoRedo,
switch looks/back; Save/Open.boxlab and NOMAD/Nomad retain opacity settings/maps.
Also reimport accepted1027 emissive sample for quick sanity. No new A/B batch.
Next: native opacity feedback, then audit colour-alpha support/remaining transform
sampling before displacement; displacement subdivision remains separately deferred.

Sources: official Nomad material manual https://nomadsculpt.com/manual/material
and stephomi/nomad-link blender/nomad_blender_link/__init__.py: separate non-colour
opacity and opt-in colour alpha; implementation uses bounded grayscale only.

Publication verified: runtime d781f169d8e594107147fa61081fa751a9dcb15a;
fetched origin/main treedc71f74e7ea3d495382cd651870cf4616bdfa0e6 exactly matches
validated/uploaded files. All45 changed blobs hash-verified before non-forced,
expected-main update.9/9 fresh live byte matches: shell/manifest,native resource,
UV surface/decoder,render-modes,late Studio scene fix,test list and NOM sample.
Pages41033460133 and hosted topology41033461559 were in_progress at last query;
no hosted full PASS claimed. Broad local3038PASS and final focused31PASS remain
validation. Build1028 LIVE / READY for native opacity testing; native GPU/iPad
appearance gate remains pending. This publication proof changes documentation only.

## .1029 — native NOM colour-image alpha — 30 October 2026

User corrects initial1028 FAIL: “1028 PASS - refresh took some time but it worked
eventually :) /nextbuild”. This supersedes the initial report; protect accepted
1028 grayscale opacity/blending/backface/shadow handling plus1027 emission and
1026/1025 PBR/retention. Refresh lag is an observation, not evidence of opacity
failure; verify new shell/manifest/pins/live bytes, no speculative refresh changes.
Baseline main797f3538 / runtime d781f169.

Audit: native material already retains use_color_opacity. Extend existing resource
plan and UV overlay only: explicit true/1 opts into colour-image alpha in lit native
Studio/Solid. false/0/absent stays solid unless existing opacity map/scalar applies.
Unknown flags retain prior opaque inspection/refusal; no truthiness coercion.
Three's ORIGINAL RGBA map shader now runs for opted-in surfaces, multiplying image
alpha with existing linear alphaMap and factorOpacity * blending material opacity.
Accepted1028 RGB-only shader stays for colour-alpha OFF when opacity is otherwise
active. Native lit colour requests existing unpremultiplied bitmap path even when
alpha OFF so nonzero RGB under zero alpha survives; no pixel rewrite/re-encode.
Existing serial cancellation, preview budgets, source bytes, normal/scalar/emission,
selection/picking/history, shadow/backface lifetime and both Studio owners retained.
Unlit/UV Image retain prior colour-only policy; refraction/additive/dithering/native
vertex opacity remain unsupported. Transparency sorting limitations unchanged.
No geometry/subdivision/extra renderer/light or global material change.

Four new real-owner/Three/actual RGBA PNG checks cover explicit flag semantics,
RGBA vs RGB-only shader routing, combined independent map/scalar factors, solid OFF
control, raw zero/full alpha+nonzero RGB and unpremultiplied decoder/cancellation,
unlit/UV Image and exact pooled SaveOpen/native NOM bytes.1028 test now accepts
explicit flag1 per new feature and still rejects invalid2; all previous map/shadow/
cleanup assertions retained.35 focused PASS/0FAIL/0skip. Full final local Node24.22.1 suite3042 PASS/
0FAIL/0skip/0cancel (222.31s); no runtime/test edits after full-suite start.
Syntax/diff clean. No native GPU/iPad visual acceptance inferred.
Reviewed reverse-loader cache closure; most changes import pins only. Protected
main/Multi1.0/frozen betas, decoder and both1028 Studio shadow owners unchanged.
In-app list includes1029 checks; prior1028 ratings retained; no A/B batch required.

Generic docs/samples/NOM_COLOUR_ALPHA_1029.nom: left alpha ON checker holes; middle
same image x separate2x opacity map x uniform65% (factorOpacity .8); right same image
alpha OFF, solid. Fixture is test-only RGBA PNG construction plus original native
writer; original production opaque PNG encoders untouched. No user artwork.
DEVICE1029 Studio/Solid orbit: left checker holes,middle combined transparency,
right solid cyan; select/Move/UndoRedo,looks/back,SaveOpen.boxlab,NOMAD/Nomad.
Accepted1028 and1027 samples unchanged. Native GPU/iPad1029 acceptance pending.
Next native colour-alpha feedback, then audit native texture translation/rotation
sampling through same owner; displacement/subdivision remains separately deferred.

## .1030 — native NOM texture translation and rotation — 30 October 2026

User explicitly reports .1029 PASS and /nextbuild. Protect colour-image alpha,
combined separate opacity/scalars, solid OFF control, source retention and all
accepted .1025–.1028 PBR/round-trip/lighting behaviours. Baseline main/runtime
6dff6e5a415b09b065b19f6e8285bac7d9ce684d. Current numbered release .1030.

Audit found native texture transforms already retained but viewport deliberately
refused nonzero offsets/rotation. Existing nomad-material-resource plan and
uv-image-surface-preview remain authoritative. Verified convention against
stephomi/nomad-link commit08391c8e00f274913c673e2459ed5a2e059a0ac0,
blender/nomad_blender_link/__init__.py set_mapping_transform: radians, native
UV origin at top left, scale THEN rotation THEN offset about UV zero. Conjugating
its Blender mapping by V -> 1-V gives native matrix rows:
[cos(r)*sx, sin(r)*sy, offsetX]; [-sin(r)*sx, cos(r)*sy, offsetY]; [0,0,1].
Three automatic texture transforms have a different order under nonuniform scale;
use its original per-texture matrix with matrixAutoUpdate=false, not baked UV edits.
Each colour/normal/roughness/metalness/emissive/opacity map has its own transform.
UV Image/always-unlit stay colour-only, now with supported colour transforms.
Malformed/nonfinite or Float32-overflow scale/offset remains retained-only; invalid
auxiliary skips only that map. Auto/UV projection, budgets, exact source bytes,
original picking/geometry/history, serial decode/cancel/disposal, transparency and
Studio shadow owners unchanged. No new renderer, UV/modelling kernel or UI reskin.
Triplanar/displacement/refraction/additive/dithering remain separately unsupported.

Four new actual-owner/real-Three tests check independent Blender-conjugate golden
UV positions, both rotation signs, signed/nonuniform scale, every map matrix and
colour space/alpha, unchanged UVs/source, malformed input and late cancellation,
UV Image/unlit and byte-identical pooled/inline SaveOpen and native NOM parse/export.
Older .1025–.1028 nonzero-transform refusal fixtures now use nonfinite transforms;
the same refusal assertions stay active and new tests cover the expanded capability.
41 focused checks PASS/0FAIL/0skip including release/cache/identity protection.
Full local Node24.22.1 suite: 3046 PASS/0FAIL/0skip/0cancel (214.23s). Final canonical parent-loader/cache checks rerun: 11 PASS after a pin-only correction to drawer -> face-layout -> release-version. No functional runtime/test changes after full-suite start. Publication verified: see docs/publication-1030.md; no GPU/iPad PASS claimed.

Generic docs/samples/NOM_TEXTURE_TRANSFORM_1030.nom (76,188 bytes): cyan arrow on
four coloured quadrants. Left original, middle offset[.25,.125], right scale[2,1]
then pi/2 rotation with offset[0,2]. Same source image; compare SAME file in Nomad.
In-app test list updated; earlier .1029 ratings retained; no new A/B batch.
Reviewed reverse loader graph and canonical release/recovery pins .1030; other
runtime JS changes are import pins only. Main/Multi1.0/frozen betas untouched.

DEVICE1030: import sample in Studio/Solid, compare original/shifted/sideways repeated
arrow with Nomad; orbit/select/Move/UndoRedo; switch looks, SaveOpen.boxlab and
NOMAD/Nomad comparison. Accepted .1029 colour-alpha sample should stay unchanged.
Next: native transform feedback, then audit remaining sampler/projection gaps;
displacement/subdivision needs its separate bounded performance/benchmark decision.

## .1030 publication verified — 30 October 2026

Runtime commit caf0dede9640b6fffefec02b501f670ba06d12db; fetched origin/main tree
8f0661e08a9319c8fa49b59546281d39b0993dfa matches validated local 1edf7cf4 tree.
All44 uploaded blob hashes verified before expected-main, non-forced ref update.
GitHub Pages41052704232 completed SUCCESS. Eight fresh public files byte-match:
version.json,index.html,native material plan,UV image overlay,drawer/face-layout
canonical loader chain,in-app test list and downloadable NOM transform sample.
Full local3046 PASS/0FAIL/0skip/0cancel (214.23s); final15 transform/release/cache/
identity checks PASS after the parent pin-only correction. Hosted topology41052704373
was in_progress at proof time; no hosted full PASS or native GPU acceptance claimed.
No functional runtime/test changes after the full suite started. This publication
proof is docs-only; runtime and asset contract remain byte-identical.

Build .1030 LIVE / READY FOR TESTING. User .1029 PASS protected. DEVICE1030 import
sample,compare original/offset/sideways repeated arrow in BoxLab and Nomad;
Studio/Solid/orbit,MoveUndoRedo,looks/back,SaveOpen.boxlab,NOMAD/Nomad. Accepted
colour-alpha1029 sample unchanged. Next follow native texture-transform feedback;
triplanar/displacement and their performance gates remain separately deferred.

## .1031 — native NOM images in the existing UV Editor — 30 October 2026

User .1030 PASS /nextbuild protects per-map UV translation/rotation, accepted
native PBR/alpha/opacity/retention and round trips. Baseline main fceec6ea /
runtime caf0dede. Hosted .1030 regression41052704373 now completed SUCCESS.
Current numbered release .1031; validation/publication follows below.

Audit: UV workspace's original Image button/dropdown/controller/canvas only
resolved GLB resources. Native NOM materials already retain encoded maps and have
3D preview owners; reconnect the original viewer rather than add another inspector.
Existing importedUVImageChoices now resolves native resources via original
nomadMaterialMaps validation. Workspace requests Colour, Normal, Emissive,
Roughness, Metalness, Opacity and Displacement. Each option uses actual slot/name
and original bytes; native separate scalar images have NO inferred GLB G/B channel.
Default callers stay colour-only; GLB map resolution/packed-channel policy unchanged.

This is RAW image inspection in tile0–1. Explicit native status says inspection
only and material mapping not applied: no tiling/rotation/factors baked here, no
3D displacement support implied. PNG/JPEG signature/MIME and 8MiB default source
bounds remain; original decoder caps visual output at1024square. Sixteen-bit source
is retained unchanged despite the bounded browser image preview. Invalid resources
return no choices; invalid/unsupported image or oversize omits that reference only.
Safe option.textContent, original selection/pan/zoom, read-only native UV controls,
serial generation cancellation, late bitmap release, reopen/reset and source/history
remain. No raw-pointer/rendering/modelling/UV/export kernel or schema changes.

Five new real-owner tests cover all7 exact references/name safety/budgets/MIME,
no-colour input, late switch/close/failed decode, actual readonly UV workspace
buttons/canvas and exact pooled/inline SaveOpen/native NOM roundtrip/sample bytes.
79 focused PASS/0FAIL/0skip incl accepted native1030/1025–1029, GLB image/surface/
packed scalar/workspace/release checks. Full local Node24.22.1 suite:3051 PASS/0FAIL/0skip/0cancel (121.47s). No runtime/test edits after full-suite start. Publication verified in docs/publication-1031.md; no native browser/GPU appearance acceptance inferred. Reverse cache graph and canonical
release pins reviewed; parent changes are pin-only. Main/Multi1.0/frozen betas,
1030 material plan and actual3D/shadow implementations unchanged.

Generic sample docs/samples/NOM_MAP_INSPECTION_1031.nom is one cube with all7 maps,
including 16-bit triplanar displacement retained for inspection/export. In-app test
list updated; prior .1030 ratings retained, no new A/B batch.
DEVICE1031 import sample -> Object radial UV -> UV Editor -> Image; choose all7
images. Pan/zoom and switch; Back to3D/Close/reopen; SaveOpen.boxlab and NOMAD keep
maps. Retest accepted1030 viewport sample if convenient. Next native viewer feedback,
then audit supported PBR materials lacking a colour texture; subdivision/displacement
still needs its separate bounded performance/benchmark decision.

## .1031 publication verified — 30 October 2026

Runtime80e2d61d505226073af7f27f3842c40ec3f8b3dd; fetched origin/main tree
8c1f7130f0c55f6e9ef72683bef5c5fee931f4ed equals validated local6ba8ee98 tree.
All25 changed blobs hash-verified before expected-main/non-forced update.
Pages41058750880 completed SUCCESS.9/9 fresh live byte matches: shell/manifest,
UV image resolver/workspace,Mesh Health,test list,drawer,unchanged native material
plan and sample NOM (74,396bytes; retry after one transient503).
Full local Node24.22.1:3051 PASS/0FAIL/0skip/0cancel (121.47s), focused79PASS.
No runtime/test edits after full-suite start. Hosted topology41058751078 was
in_progress at proof; no hosted full PASS claimed. Native appearance gate pending.
This proof is documentation-only; runtime/contract stay exactly validated.

Build .1031 LIVE / READY FOR TESTING. User .1030 PASS protected. In Object mode
select sample cube -> radial UV -> UV Editor -> Image -> inspect7 named maps.
Raw image references, no material transforms/factors; displacement inspection only.
Pan/zoom/switch,Back to3D/Close/reopen; SaveOpen.boxlab and NOMAD preserve maps.
Next native viewer feedback then audit no-colour-map material preview; bounded
subdivision/displacement and benchmark decision remain deferred.

## .1032 — VIEW startup repair and seven-object retest — 31 October 2026

User .1031 FAIL: “7 Objects did not load” and VIEW modes “seem to have been
removed. BIG FAIL”. Stop feature rollout; .1030 remains the last accepted build.
Baseline main0c18e678/runtime80e2d61d. The .1031 sample ACTUALLY contains ONE cube
with seven maps, not seven objects. No importer object-loss reproduction found;
replace unclear retest with an explicit seven-object fixture instead of pretending
the original file contained seven. Keep .1031 failed/pending device gate visible.

VIEW source/buttons were not intentionally removed. Cloud browser on live1031
shows all12 look controls, but cloud WebGL is disabled, so this does NOT refute
native feedback or prove GPU operation. Concrete owner flaw reproduced: installUI
uses host.innerHTML, deleting Cavity/Silhouette if their independent owners run
first; dataset.ready also prevents restoring an emptied host. Two new real-owner
DOM tests FAIL against1031 source and PASS after repair. Exact iPad whole-menu
failure cause remains unproven; no speculative CSS/compositor or cache diagnosis.

Original render-modes installer now adds only missing base buttons from its same
10-button template, preserving existing Cavity/Silhouette nodes/listeners. Per-host
delegation binds ONCE. Native VIEW open re-runs this idempotent installer, restoring
missing/cleared base controls without polling, new render engine or geometry changes.
Original Facegroup controls and actual setMode actions retained. No shader/light/
material/selection/history/input/CSS/frozen/main/Multi implementation changes.

Native raw-image inspection adapter moved OUT of shared uv-image-preview into
workspace-only nomad-uv-image-choices. Shared image controller receives its resolver
as an option; GLB/3D paths retain original resolver and decoder. This removes the
inspection dependency from the render-mode graph; NOT a claim that it caused the
reported failure. Existing1031 seven-slot/byte/16-bit/cancel/UV read-only tests stay
active through the original workspace adapter. No duplicate decoder or image pool.

New docs/samples/NOM_SEVEN_OBJECTS_1032.nom: SEVEN independent cubes in two rows,
named01 Colour,02 Normal,03 Emissive,04 Roughness,05 Metalness,06 Opacity,
07 Displacement. Each contains ONE exact raw map reference for UV Image inspection.
Non-colour cubes may have ordinary solid 3D shading; this is a loading/inspection
fixture, not a claim of no-colour-map PBR or displacement rendering support.
Actual File dispatcher->fit->manager adds all7; checked sample matches generator.
Existing1031 one-cube fixture remains reproducible; do not overwrite it silently.

85 focused PASS/0FAIL/0skip, including4 new regressions, actual imported7 and
workspace/VIEW/native/GLB/release protection. Reviewed reverse-loader pins1032 and
canonical recovery chain; other runtime JS edits are pins only. Full local Node24.22.1:3055 PASS/0FAIL/0skip/0cancel (107.16s). No runtime/test edits after full-suite start. Publication proof follows; native .1032 acceptance is not inferred.
In-app test list explicitly distinguishes seven OBJECTS from seven MAPS.
DEVICE1032 first openVIEW before import: all12 looks including Cavity/Silhouette;
Studio->Solid->Studio and close/reopen. Import new sample: seven named cubes;
select a cube,Object radialUV->UV Editor->Image to see its ONE map,BackTo3D/Close,
recheckVIEW. Orbit/UndoRedo and accepted1030 transform sample sanity.
Next ONLY device repair feedback; defer new native material/performance features.

## .1032 fixture visibility and cross-Node CI correction — 31 October 2026

Final demo check found four central small cubes could sit inside the startup size1
cube after original2-unit import fitting. Increase the two-row spacing; actual File
import test now requires every imported cube to lie clear of startup cube in Z.
No application import/fit/source-position policy changed. Seven-object sample stays
91,588bytes and keeps original map bytes. New sample placement is part of .1032 retest.

Hosted41146362394 failed. Log tool repeatedly closed transport. Reproduced locally
with exact CI Node22.23.4:3053PASS/2FAIL; both failures were freshly compressed PNG
byte comparisons against checked-in demo files. Node22 and24 CompressionStream
produce different valid zlib bytes. New test helper independently parses both NOMs,
checks exact names/geometry/UV/material bindings, PNG CRC/dimensions/type/chunks/
filters and decoded RGBA; literal16-bit displacement remains byte-exact. Existing
pooled/inline SaveOpen/NOM SOURCE-BYTE round-trip assertions are unchanged. Actual
checked-in seven-object file now goes through real File dispatcher in the test.
Both affected fixtures:6PASS/0FAIL on Node22 AND Node24 after correction. Full final
Node22 and hosted rerun pending. Application JS remains byte-identical to674828d5.

## .1032 publication and final retest proof — 31 October 2026

Application runtime674828d515e5db3d6aa87fcf4f4fff94de47199a/tree41917b2d matched
validated local04d6863c tree;29 uploaded blobs verified. Final sample/test correction
b73818ed3deeec1280838e6c39c3b011cde08eb1/treeb667f741 matched validated local86f6be0e.
Application JS remains byte-identical to674828d5. Final sample blob:
4a9a16d419f4068487a2d093a9850f838bc6ecbd (91,588bytes). Spaced rows keep every cube
clear of size1 startup cube AFTER original2-unit import fit; actual File test asserts
that separation for all7. Import ADDS seven named cubes; an existing cube may remain.

Pages41147618892 SUCCESS. All8 checked public paths match final app/sample content:
shell/manifest,render owner,shared image resolver,UV workspace,native adapter,test
list and final spaced sample (sample rechecked after final deployment). Live cloud
DOM: title1032,all12 looks including Cavity/Silhouette,Studio->Solid->Studio status,
close/reopen retains list. Cloud WebGL remains disabled; screenshot API timed out.
This is UI/DOM activation evidence, not GPU/iPad pixel or material acceptance.

Full Node24.22.1:3055PASS/0FAIL/0skip/0cancel (107.44s), final fixture-only6PASS.
Full final CI-matching Node22.23.4:3055PASS/0FAIL/0skip/0cancel (100.18s).
Old hosted41146362394 failed on the two cross-Node compressed-demo-byte comparisons;
reproduced3053PASS/2FAIL on Node22. Replaced ONLY demo-equivalence assertions with
independent exact geometry/UV/material bindings,CRC/PNG pixels and literal16-bit
bytes. Production source-byte round-trip assertions stay unchanged. Corrected hosted
rerun41147618975 was in_progress at this proof; its final result is recorded in
`docs/publication-1032-ci.md`. Do not cite the superseded failed run as current CI.

GitHub upload/ref errors were transient: reuploaded two orphan blobs,verified exact
tree; REST-created correction commit was initially unavailable to GraphQL ref update.
Anchored it via repair/1032-fixture-validation,then expected-main non-forced update
succeeded. Keep this recovery reference; no force push or permission bypass used.

Build .1032 LIVE / READY FOR NATIVE RETEST once final hosted result below is checked.
.1031 user FAIL remains recorded; .1030 is last user-accepted build. No .1032 PASS
inferred. DEVICE: VIEW all12 before import,Studio/Solid/reopen; import FINAL sample
01Colour through07Displacement; select a cube,radialUV->UV Editor->Image shows its
ONE raw map;BackTo3D/Close and recheckVIEW. Exact original iPad whole-menu failure
cause remains unproven; repaired deterministic overwrite/ready-host defects covered.
No new feature work until repair feedback.

## .1032 user PASS — loading/VIEW accepted; material gaps observed — 31 October 2026

User explicitly: “1032 PASS > all 7 cubes visible, no problems with view mode
disappearing.” Protect seven-object visibility/spacing, VIEW startup preservation,
all original mode actions/reopen and .1030 accepted behaviour. This is NOT native
standalone-PBR/displacement/opaque-colour-alpha acceptance. No new build this update.

User screenshots: BoxLab shows only Colour cube textured, other six plain. Nomad
shows Normal/Emissive/scalar/Opacity/Displacement effects; Colour cube solid cyan.
Source audit confirms native nomadColourSurfaceSource returns null without color;
nomadPBRSurfaceSources and original UV overlay consequently cannot activate other
maps by themselves. Seven-object fixture intentionally assigns exactly one slot
per cube. Therefore this exposes the remaining no-colour-map viewport dependency;
retained maps were not lost. Extend the SAME resource/material overlay owners for
supported normal/emissive/roughness/metalness/opacity without requiring a color map.
Displacement remains separately deferred behind subdivision/performance gates.

Important fixture finding: 01Colour PNG is128x128 with EXACTLY ONE RGB value
[55,175,220], and alpha0/255 checker. Every fixture material has use_color_opacity=0.
Nomad's uniform cyan is expected: the checker is ALPHA, not a colour pattern. Do
not call this missing colour texture or change Nomad bindings based on appearance.
BoxLab's checker/black squares despite alphaOFF is a separate discrepancy. Native
plan requests unpremultiplied bitmap but browser decode/resampling may lose RGB
under alpha0; exact cause not verified on iPad. Do not claim it fixed from a mocked
bitmap test. Investigate original decoder, keep source bytes unchanged, and use a
real opaque RGB colour-checker in the next comparison fixture to avoid ambiguity.

Status: current LIVE1032; explicit loading/VIEW PASS protected. Material viewport
gap and alphaOFF colour discrepancy OPEN. No runtime/code/new build this update.
Next scoped build: audit no-colour native base material path, preserve accepted
1032 UI, add meaningful per-channel sample and actual owner coverage; investigate
alphaOFF colour separately, retaining displacement as inspection/export-only.
Possible checks now: UV Editor Image on Normal/Opacity/Displacement cubes confirms
retained references; no repeated loading/VIEW regression test or reinstall needed.

## .1033 — standalone native material maps — 31 October 2026

Current build: 0.36.18.1033. Parent main: 1cd744b63ff35cafea7a56b01c0cfbd81b53645f.
Reuses nomad-material-resource and uv-image-surface-preview: Studio/Solid now
accept normal, emissive, roughness, metalness and opacity maps without a colour
image, using native constant color (white default), roughness .25, metalness 0.
No generated colour texture or parallel renderer. Invalid existing colour bindings,
unlit, unsupported projections/materials and displacement-only keep prior fallback.
Map-only overlay replaces body only after a successful decode; failed/late work
releases the original owner and reservation. Source images/UVs/materials remain exact.

Protect explicit .1032 user PASS: seven-cube visibility/spacing and VIEW stability.
Four colour surfaces remain protected; up to eight map-only surfaces share original
aggregate ceilings: 15M decoded pixels, 80k UV corners, 32MiB encoded sources.
Per-map limits unchanged. Parent loader changes are cache-pin-only. main.js and
multi-object-transform remain untouched; no broad UI changes.

Fresh comparison: docs/samples/NOM_STANDALONE_MAPS_1033.nom. Seven independent
named cubes, same accepted spacing; TRUE opaque RGB checker for Colour and
Emissive. .1032 fixture remains immutable. Displacement stays retention/inspection
only, pending subdivision/performance work. Original .1032 alpha-OFF cyan/black
bitmap discrepancy remains OPEN and is not fixed by the new sample.

Hands-on pending: import new sample, verify all seven cubes and six supported
material channels in Studio/Solid; inspect gloss/reflections while orbiting.
Check opacity holes and shadows, switch/reopen all VIEW modes, Move/Undo/Redo,
Save/Open and export NOM. User PASS required for actual iPad/GPU appearance.
Next: address alpha-OFF bitmap decoding separately after this material validation.
Validation: Node22 full suite 3058 PASS, 0 FAIL (102.29s); final additional budget check and all four .1033 focused tests PASS on Node22. Existing 30 native material tests PASS. git diff --check clean. Hosted CI41150968538 and Pages41150967831 SUCCESS; live bytes verified.

Publication: application commit bbe1896581176abdfb297404161d5023b3d9a26a,
reviewed tree 8554d21a5068f6f38b0feb1d825bcd0c043643b0, fetched main verified.
Pages41150967831 SUCCESS; live version/shell/material/overlay/render/test-list and
91,528-byte sample all byte-identical. See docs/publication-1033.md. Hosted
Topology regression41150968538 completed SUCCESS. .1033 LIVE and READY FOR TESTING.
Manual iPad appearance acceptance remains pending; .1032 loading/VIEW PASS protected.

## .1033 user PASS protected — 31 October 2026

User replied PASS after .1033 standalone-material test build. Protect accepted
standalone normal/emissive/roughness/metalness/opacity preview through existing
owners, six supported mapped cubes, seven-object loading, VIEW stability and
previous accepted behaviour. No new application build in this update.
This PASS does not close the separately deferred displacement preview or the
original .1032 alpha-OFF colour discrepancy (new .1033 sample uses opaque RGB).
Next narrow build: repair original alpha-OFF colour bitmap decode/resampling,
preserving RGB beneath transparent pixels without changing retained source bytes.
Then audit displacement preview subdivision/performance gates before implementation.
Current status: .1033 LIVE, user PASS; awaiting next /nextbuild for runtime work.
Optional regression: original .1032 Colour cube should eventually be solid cyan
with colour opacity OFF; enabling opacity should reveal its alpha checker.


## .1034 — native colour alpha OFF shader correction — 31 October 2026

Current runtime target: 0.36.18.1034. Parent .1033 user PASS is protected,
including standalone PBR maps, seven-object import and VIEW stability.

Audit found the precise alpha-OFF defect in the existing native UV surface owner:
the RGB-only map shader hook was installed only when opacityMode() ran. A native
colour texture with use_color_opacity=false and no separate opacity map therefore
fell through to Three's default diffuseColor *= sampledDiffuseColor, multiplying
the constant cyan RGB by the image's checker alpha and producing black squares.
The original owner now installs the RGB-only shader hook for every supported lit
native colour surface with colour alpha OFF. opacityMode reuses the same hook when
a separate opacity map/factor also controls transparency. Explicit colour alpha ON
keeps Three's original RGBA sampling path; opacity, depth-write, shadow and source
byte behaviour are otherwise unchanged. No decoder rewrite or image re-encoding.

New actual-owner tests cover alpha OFF without a separate opacity map and explicit
alpha ON retaining RGBA. In-app TEST LIST adds the original comparison file:
docs/samples/NOM_COLOUR_ALPHA_1029.nom (left alpha ON, middle combined opacity,
right alpha OFF). Existing seven-object and standalone-map samples remain unchanged.
Displacement remains inspection/retention only.

Validation/publication status: source/test changes committed to main; local suite
not available in this connected session. Hosted CI and Pages/live byte verification
are pending and must be checked before calling this build fully released.
Native iPad/GPU appearance acceptance is pending.

DEVICE1034: import NOM_COLOUR_ALPHA_1029.nom in Studio and Solid. Right cube must be
solid cyan with no checker/black squares; left cube retains checker transparency;
middle retains combined colour-alpha plus separate opacity. Switch VIEW modes,
orbit, select/Move/UndoRedo, and verify prior .1033 standalone-map sample still works.
Next: confirm .1034 alpha behaviour, then separately benchmark displacement/subdivision
before implementation. Do not fold displacement into this shader correction.

## .1035 — pre-decode native colour alpha OFF repair — 31 October 2026

USER .1034 FAIL: screenshot shows right cube cyan/black checker on visible .1034.
.1033 standalone material PASS remains protected; .1034 shader-only claim was
insufficient. Three map_fragment multiplies RGB by sampled RGB, and alpha by
sampled alpha componentwise; it does NOT itself multiply RGB by sampled alpha.
Shader string tests cannot prove RGB survived browser PNG decode/resize.

Existing surface owner now passes an explicit alpha-OFF flag to its default
surface decoder. Existing nomad-scalar-png owner makes a transient opaque PNG
BEFORE createImageBitmap: unfilters original pixels, keeps original RGB including
alpha-zero pixels, sets preview alpha255, and recompresses. Shared GLB/UV decoder
has no native dependency. Explicit alpha ON and auxiliary channels keep original
decoding; source bytes, material metadata, UVs, Save/Open/NOM remain unchanged.
No source texture rewrite, canvas RGB recovery, new renderer or modelling kernel.

Supported pre-decode path: noninterlaced 8-bit RGBA/grayscale-alpha PNG; tRNS
transparency stripped for other native PNG types. Profiles/colour chunks retained.
Bounds: encoded source/output8MiB, dimensions2048 and4M source pixels, inflate output
exact expected scanline length; CRC/truncation/filter/animation/16bit-alpha refusals.
Unsupported alpha-OFF conversion keeps original body fallback, no black-map guess.
Existing GPU preview limits/lifetimes and .1033 standalone reservation remain intact.

Regression checks inspect actual browser-input PNG from original .1029 fixture:
all alpha-OFF texels exactly [55,175,220,255]; alpha ON still [55,175,220,0/255].
All five PNG filters tested with varied hidden RGB, tRNS and grayscale-alpha,
malformed/oversized/inflate overflow refused. Actual surface default decoder and
source-exact NOM roundtrip covered. Corrected .1034 alpha-ON test: default Three
onBeforeCompile is a no-op; Three expands map_fragment after that hook. .1034 CI
41152868866 FAILED; repair supersedes it only after passing validation/publication.
Restore DEV_HISTORY content from3397d287, which .1034 documentation accidentally
replaced, then retain .1034 entry and append this repair. Other old docs kept intact.
Reviewed cache closure repinned; stale .1034 index-only keys reconciled with owners.
Restore original five-step structural A/B checklist (1034 extra material step broke
completion); material check stays in build instructions. Correct stale1033 titles
and preserve1033/1034 result logs. Original13 checklist regression tests PASS.

DEVICE1035: use original docs/samples/NOM_COLOUR_ALPHA_1029.nom, Studio and Solid.
RIGHT solid cyan, no black squares; LEFT checker transparency; MIDDLE combined
alpha plus opacity. Switch/reopen VIEW; original .1032 seven-cube Colour cyan;
.1033 standalone sample unchanged. Move/UndoRedo and Save/Open/NOM retention.
Native iPad/GPU appearance acceptance still pending; do not claim device success.
Displacement remains deferred; next step is actual device validation before more work.
Validation: Node22 full suite3064 PASS/0FAIL (216.65s); focused13 material tests
and final13 checklist tests PASS. git diff --check clean. CI41154726829 and Pages41154726211 SUCCESS; live bytes verified. .1034 iPad FAIL remains recorded; .1035 GPU/device acceptance pending.

Publication verified: application0cc0cef434b8a8c7d431e74c0d0ed51f58fe2834,
reviewed tree4edaaa71114db8b2eba41464f68a02951e42dfd4. Hosted CI41154726829
SUCCESS; Pages41154726211 SUCCESS. Live version/shell/PNG/overlay/render/checklist
and original80,064-byte1029 sample match source bytes. See docs/publication-1035.md.
Status: .1035 LIVE and READY FOR RETEST; .1034 user FAIL preserved, .1033 PASS
protected; actual iPad/GPU colour acceptance pending. No displacement work included.

## .1035 user PASS protected — 31 October 2026

User confirms the right cube alpha-OFF colour repair PASS. Protect opaque cyan RGB
in Studio/Solid, checker transparency for alpha ON, combined middle alpha/opacity,
original .1033 standalone PBR previews, seven-object loading/spacing, VIEW stability,
and existing Save/Open/NOM retention. .1034 screenshot FAIL remains in history as
superseded. .1035 is accepted; no further alpha shader/decode changes planned.

Next development is an investigation before implementation: audit the existing
SubD/subdivision owners and NOM displacement retention/import flow. Benchmark a
small bounded tessellation preview on representative low-poly objects. Establish
caps for source faces, subdivision level, generated vertices, image dimensions,
memory and frame time; compare against the original unmodified object. If safe,
expose displacement preview as a transient Studio/Solid surface overlay with
cancel/mode-switch cleanup; keep exported mesh and source map unchanged. If the
existing topology/performance owners cannot support responsive iPad preview within
a clear cap, keep displacement inspection-only and report the measured limit.
Do not add displacement deformation to .1035. Next build follows this audit/gate.

Current status: .1035 LIVE, CI and Pages verified, user PASS protected. Next build
focus: bounded displacement/subdivision feasibility, no implementation assumed.

## .1036 — bounded subdivision timing page — 31 October 2026

User .1035 PASS protected. Existing-owner audit confirmed NOM displacement retention
and export support, but not viewport deformation. The authoritative Catmull–Clark
`subdivide()` owner operates on EditableMesh topology and does not preserve imported
per-corner UV payloads. Do not use its result for a displacement surface without a
UV-preserving path. No displacement render/bake was added.

Added `docs/subdivision-benchmark-1036.html`, linked through the existing File →
Screen comparison / test list owner. It loads the same mesh and subdivision modules,
measures 16/64/256 regular quad faces at levels 1–3, caps generated topology at
16,384 faces (~16,641 vertices), uses one warm-up plus three samples, and stops
escalating after a >1.2s sample. It emits median/count/browser/DPR JSON for iPad
review and does not touch the project scene. CPU kernel timing is not UV transfer,
16-bit image sampling, heap, GPU or frame time. No device timing or displacement
acceptance inferred. Original .1035 alpha-OFF colour PASS and seven-object/VIEW PASS
remain protected.

Regression: new benchmark tests verify use of the canonical subdivision function,
preset/cap/stop contract and exact output face/vertex counts while source mesh stays
unchanged. Focused SubD-cache/displacement/benchmark checks16 PASS; release-contract
checks16 PASS. Full Node22 suite3066 PASS, 0 FAIL, 0 skipped. Initial full run caught
three stale release URL/hash contract rows after the required pin refresh; refreshed
the reviewed import chain and reran clean. Runtime commit69f76c096ed9acde8d938e390a5526b3ad0b79cd/treef63027d2c388ed1f2bdfb2ecf0755dcb0d8d563a.
Hosted topology regression41159958003 and Pages41159957610 SUCCESS. Six live app/
benchmark files byte-match the published source. Device timing and UI acceptance
remain pending; no displacement preview acceptance is claimed.


## .1036 user timing report received — 31 October 2026

The user supplied all9 .1036 benchmark results from iPad Chrome for iOS (CriOS156,
iPadOS26.6.2, DPR2). Start/end duration611ms; no early-stop guard. Median CPU mesh
times for source faces16/64/256 at levels1/2/3: 1/1/3ms,1/3/6ms,1/4/13ms. Largest
result16,384 faces/16,641 vertices; samples12/13/17ms. Record as completed CPU
benchmark data, not as displacement-preview or GPU acceptance, and not as explicit
overall user PASS/FAIL. No report of post-run scene/selection check.

Audit for next step: NOM UVs are face-corner arrays in `glbPassthrough.uvCorners`;
existing Catmull–Clark face splitting has stable ordered corner topology but drops
UVs in its current `EditableMesh` return. Extend the same authoritative owner to
propagate corner UVs; retain seam-specific UVs and verify face/corner alignment. No
second geometry kernel. Use16,384 faces/~16,641 vertices as a provisional cap only;
UV mapping, 16-bit displacement sampling, heap, GPU and frame-time gates remain open.
.

## .1037 — bounded Catmull–Clark corner UV propagation — 31 October 2026

Added `subdivideWithCornerUVs()` beside the canonical Catmull–Clark kernel. Each
child quad receives four per-corner UV values in the corresponding geometry order;
shared geometric edges do not merge UV chart values. Existing `subdivide()` and
`catmullClark()` continue returning geometry-only meshes. Levels are bounded to 0–4;
preflight caps are 16,384 output faces and80,000 UV corners. No viewport or
displacement wiring is included.

New regression cases cover ordering, seam preservation, multilevel geometry
equivalence, immutable source data/metadata, malformed data and the largest .1036
benchmark case (256 source faces at level3). Focused UV/SubD/cache/displacement checks19 PASS; release-contract checks5 PASS; full
Node22 suite3071 PASS/0FAIL; `git diff --check` clean. Published to main as runtime commit `c73a865ec9c93b2b84a4279eb4bc541f7d5ebd52`
(tree `aa04d0f3e4a41f8239dee3b0f6c7f0e0269b43a3`). Hosted topology regression
41173880915 and Pages deployment 41173880916 succeeded; version.json, index.html
and all11 changed runtime modules byte-match live Pages. No manual UI test is
expected for this non-UI helper.


## .1037 user PASS protected — 31 October 2026

User replied PASS to the .1037 corner-UV subdivision build. Protect the new UV-aware
Catmull–Clark helper and its seam, parity and output-limit contract. The user did not
request or verify a viewport appearance change; this API remains unconnected to the
rendering path. Earlier seven-object/VIEW and .1035 colour-alpha PASS records remain
protected. Next gate is an iPad timing comparison before any display integration.

## .1038 — UV-aware subdivision timing gate — 31 October 2026

Add an in-app linked report comparing geometry-only subdivision with UV propagation
for continuous grids and independent per-face charts across the .1036 16/64/256-face
workload. Retain the16,384-face/80,000-corner limits and1.2s per-run stop. The page
does not alter the project and measures no texture decode/sampling, memory, GPU or
frame time. The user’s iPad JSON report is needed before deciding whether to wire the
existing UV surface/display owners together. No viewport displacement ships here.


## .1038 — UV subdivision timing gate — 31 October 2026

User .1037 PASS protects the canonical bounded corner-UV subdivision path and its
seam/geometry invariants. Audited renderer owners: Studio/Solid skip native UV image
overlays during SubD or Mirror, while main’s SubD cache stores geometry only. Avoid
duplicating subdivision; first add an iPad timing gate comparing geometry-only,
continuous-chart and per-face-seam UV cases at 16/64/256 source faces, levels 1–3.
Each timed sample is guarded at 1.2s, with 16,384-face / 80,000-corner caps. Report
excludes decode/sampling, memory, GPU and rendered frame time.

Automated validation: 3,073 PASS / 0 FAIL on Node 22. Topology regression run
41177045287 SUCCESS. Pages attempt 41177045008 failed because the first GitHub blob
upload truncated large Markdown files; exact local Git blobs were re-uploaded. Pages
build/deploy run 41177429851 SUCCESS. Verified live .1038 marker and benchmark URL.
Pending: user-run iPad timing report before display integration or displacement work.


## .1039 — bounded textured SubD display — 31 October 2026

The user supplied the .1038 iPad UV subdivision report: all nine benchmark cases
completed without early stop; geometry matched baseline, inputs remained unchanged.
At 16,384 faces / 65,536 UV corners, median CPU generation measured 12 ms for
geometry, 23 ms for continuous UVs and 22 ms for per-face charts. This is not
texture-decode, memory, GPU or frame-time evidence.

.1039 connects the canonical corner-UV subdivision result to the existing active
SubD display cache and NOM Studio/Solid surface overlay. Preview is allowed only for
active editable NOM geometry with a current matching UV topology signature, no
Mirror, and within the pre-existing 20,000-corner UV preview geometry limit. The
cache stores UVs alongside the same subdivided mesh. Mirror, invalid/stale UVs,
other sources and over-cap results fall back to untextured SubD. Existing overlay
cleanup is called before body rebuild; no second subdivision kernel or displacement
preview is introduced. Focused SubD, texture overlay and display-cache tests passed;
full Node 22 suite passed 3,083/3,083, release asset-contract checks passed and
`git diff --check` is clean. Hosted topology regression 41182612229 and Pages
build/deploy 41182611920 succeeded for runtime commit 30f01a4; version marker, shell,
nine runtime modules and two evaluation assets (13 files) match local Git blobs
byte-for-byte. The
.1039 iPad visual verification remains pending; do not claim GPU, memory or frame-time
safety from the .1038 benchmark. Preserve earlier .1035 colour-alpha
PASS and seven-object/VIEW acceptance.


## .1040 — inactive NOM SubD textures; .1039 base-material PASS — 31 October 2026

The user PASSes .1039: all seven objects display their materials without SubD. The
follow-up iPad report isolates the gap: when SubD is enabled across multiple objects,
only the selected object's material displays. Protect the non-SubD behavior, seven-
object visibility, VIEW modes and earlier colour-alpha PASS.

Existing inactive-object rendering already owned independent SubD caches and reused
the canonical geometry kernel, but passed neither per-corner UVs nor a SubD UV payload
to the existing Studio/Solid overlay. .1040 reuses that cache with the canonical
`subdivideWithCornerUVs()` path and shared active/inactive source/topology/Mirror/cap
eligibility. It attaches the exact display mesh and UV payload to each inactive body.
Inactive overlay cleanup now runs through the existing render cleanup owner before
cached geometry is reused. No parallel renderer, subdivision kernel or displacement
preview. `multi-object-transform.js?v=0.36.1.0` remains untouched.

New regression covers distinct per-object UV/cache results, cache reuse, stale/Mirror/
cap fallback, Studio/Solid inactive overlay, and cleanup. Existing active SubD, inactive
geometry identity/disposal, Mirror, render performance, boolean scene lifecycle, and
NOM material tests pass. Full Node suite: 3,081 PASS / 0 FAIL. Release-contract checks
pass; `git diff --check` clean. Hosted CI and publication evidence pending.

DEVICE1040: use the seven-object NOM sample; verify all seven base materials, then
enable SubD on multiple textured objects and confirm textures remain visible while
unselected in Studio and Solid. Switch selection, deselect all, toggle SubD/Mirror,
reopen VIEW and navigate. Displacement, GPU, memory, image-decode and rendered frame
time remain outside this validation.


## .1040 publication verified — 31 October 2026

Runtime commit `0255ada097b72b389698c676c67f971cbd433f18` with tree
`f6740d26254f474aa7f4a703ce231d2c87d0a8fb` is on remote main. Hosted topology
regression 41187547119 and Pages build/deploy 41187546752 both completed SUCCESS.
Live version.json and seven changed runtime assets (index shell, main, multi-object,
SubD display cache, shell comparison, drawer-ui and face-workflow-layout) match the
local runtime bytes exactly. Local full Node suite: 3,081 PASS / 0 FAIL; focused new
SubD and release-contract checks pass. Native iPad acceptance was pending at publication; the later user PASS is recorded below.

## .1040 user PASS protected — 31 October 2026

User confirms all objects retain their materials with SubD enabled, including
unselected objects. Protect inactive-object textured SubD in Studio/Solid and the
tested selection-independent behavior. Next candidate is a source audit of the
existing displacement owners and a bounded end-to-end preview/performance gate;
the .1038 CPU mesh/UV benchmark does not establish decode, memory, GPU or frame-time
safety. No runtime change in this feedback update.


## .1041 — displacement preview feasibility gate — 31 October 2026

.1040 iPad PASS remains protected. Audited the existing native displacement
resource owner: NOM displacement bindings are already retained/validated for UV
inspection and export, while the current Studio/Solid material overlay does not
consume displacement. Do not create a second renderer or subdivision kernel.

.1041 adds a temporary benchmark entry to the existing File → Screen comparison /
test list. It uses the canonical corner-UV subdivision helper, generated 8-bit
grayscale PNGs at 256²/1024²/2048², bounded 16/64/256-face source meshes, corner-UV
geometry expansion and a Three.js displacementMap material. It records generation,
PNG encode/decode, subdivision, expansion, estimated byte counts, render submission,
frame intervals and optional GPU timer query results. A single CPU stage over 1.2s
stops the run and leaves a copyable partial report. No displacement deformation is
added to project rendering.

Final local Node suite: 3,083 PASS / 0 FAIL / 0 skipped. The .1041 gate, release-pin,
existing .1038 UV benchmark and .1040 inactive SubD regression checks passed; module
syntax and `git diff --check` are clean. Live publication is pending. The user iPad
report is required before choosing a production displacement implementation.


## .1041 iPad feasibility report received — 31 October 2026

The user supplied the .1041 report from iPadOS 27.2 / DPR 2. All nine generated-map
render cases completed without early stop. At the largest case (256 source faces, level
3, 16,384 output faces / 65,536 corners), median UV subdivision was 21 ms, UV-corner
geometry expansion 5–8 ms and expanded typed arrays 3 MiB. The 2048² generated PNG
decoded in 48 ms, with 16 MiB estimated base RGBA; RAF intervals were 17 ms median and
17–18 ms p95. GPU timer queries were unavailable.

Treat as favorable feasibility evidence only, not a user PASS for viewport displacement.
The test used a single mesh and synthetic 8-bit map; actual Nomad 16-bit source decoding,
BoxLab viewport/frame cost, full memory, shadows and factor/midpoint/world semantics are
not established. Next audit the real retained Nomad displacement payload/settings and
route any future preview through the existing UV surface/SubD owners within current caps.

## .1042 — draggable UV Paint palette and contextual quick controls — 31 October 2026

The user requested a lighter, draggable Paint radial menu and moving repetitive brush
settings out of the panel below the layer list. Audited existing viewport-paint controls
and kept their original DOM nodes, input handlers and state owners. The same channel/
preview, colour, size/opacity, fill, blur/scalar and mask-value controls now sit in a
compact floating contextual panel. Layer list remains in the persistent left panel.
The smaller tool wheel and control panel share a drag handle; pointer movement clamps
the panel within the viewport, and its position persists while the Paint module remains
open. Selecting a tool switches to its quick controls; Tools or the original background
hold reopens the wheel. Existing Pencil, finger navigation, cancellation, history and
Done behavior remain with their original owners.

Compact layout CSS scopes wheel coordinates/sizing to the wheel and gives the quick
panel its own width/height rules. Release keys updated to .1042 for the shell, Paint
module, compact stylesheet and release identity. Drawer/Face-workflow/release-version
loader chain refreshed; protected `src/multi-object-transform.js?v=0.36.1.0` is unchanged.
The runtime-asset contract records the reviewed pins and current bytes.

New automated coverage verifies tool-to-controls transitions without history changes,
reuse of original controls and persistent layer placement, colour/size/opacity updates,
mask contextual visibility, drag/clamping in both states, compact layout and prior Paint
interaction. The first full run found two stale tests that still expected the wheel to
remain open after tool selection and the current release to remain .1041; those test
expectations were updated to .1042 behavior while preserving the separate .1041 benchmark.
Final local Node suite: 3,085 PASS / 0 FAIL / 0 skipped / 0 cancelled (106.29s).
Fifteen focused Paint/compact-layout checks, five release-contract checks, and the
updated workflow/displacement marker checks pass. Changed JavaScript syntax checks and
`git diff --check` are clean. Application commit 10ca3d0b5ac7d8d613b6b62bb4702f718a2b5eb6
has the exact tested tree. Hosted Topology regression 41201732663 and Pages deployment
41201732616 both succeeded. Live `version.json`, `index.html`, `src/viewport-paint.js`,
`compact-layout.css`, `src/shell-comparison.js`, `src/drawer-ui.js`,
`src/face-workflow-layout.js` and `src/release-version.js` were fetched and byte-matched
the local tested content. The protected Multi script pin remains unchanged. Native iPad
appearance and touch acceptance are still pending.
The iPad checks are in the .1042 section at the top of TEST_CHECKLIST.md; DOM tests do
not imply native tactile or visual acceptance. Next: obtain user .1042 device result, then
resume the retained Nomad displacement source/settings audit from the existing roadmap.


## .1045 — combined UV Paint material strokes and interaction — 1 November 2026

User requested Colour/Roughness/Metalness painting in one stroke, Lit preview/shadow restoration, Pencil orbit in Paint, Brush-to-Material-menu routing with contextual radial controls, and improved Smudge blending. Reused `viewport-paint-core.js` for multi-resource staging and one scene-history checkpoint; existing Roughness/Metalness resource owners remain authoritative. One Brush contact now stamps selected colour plus optional scalar maps and publishes atomically. Scalar channel changes force Lit preview and Paint exit refreshes through the existing render-mode owner.

Brush opens Material & Paint directly. Fill/Eraser/Smudge/Blur menus use the existing controls and show only tool-relevant settings. Pencil background hits are no longer consumed before a successful Paint/image hit, while overlapping Pencil contacts during finger navigation remain swallowed. Smudge updates its local reservoir between dabs with a stronger 50/50 carried/surface mix, preserving premultiplied alpha, connected seam averaging, UV-face isolation, cancellation and bounded work.

Validation: full Node suite 3,091 PASS / 0 FAIL / 0 skipped before the final in-place Smudge reservoir allocation optimization. Final post-optimization focused material, connected Smudge, release identity and shell set 34 PASS / 0 FAIL. A broader Paint, Pencil-navigation, release and cache-pin set passed 43 / 43 before that allocation-only optimization. JS syntax and `git diff --check` pass. Native iPad visual/touch acceptance is pending. Protected `src/multi-object-transform.js?v=0.36.1.0` is unchanged.

Publication: commit `a505c803f92da39b07747d4acb53b2aa31a7d2b3` on `main`, exact tree `f4a0ee1ee4344b815e2ca597c8c7cb1f7765b7e5`. Pages `41257090423` and hosted Topology regression `41257090347` succeeded. Cache-busted live `version.json`, `index.html` and all nine changed/loader runtime modules byte-match this release. Native iPad acceptance remains pending.


## .1046 — Metalness shading restoration and stronger Smudge — 1 November 2026

User reports “1045 PASS” and protects the combined Colour/Roughness/Metalness stroke workflow, Lit preview, Pencil navigation, contextual Paint controls and previous Smudge behavior. The same report says Metalness painting does not return to normal shading and Smudge remains weak.

Audit found the existing `createPaintSurface()` owner starts Lit surfaces with white albedo and default roughness/emissive values. When no colour map exists, committed scalar previews therefore replace the source Studio shading. Reuse the original body material as the fallback: scalar-only maps retain base colour, source roughness when no roughness map is present, emissive colour/intensity and environment intensity. Painted colour maps still replace albedo, and scalar maps continue using their original channel data. Existing Studio render-mode rebuild, shadows and material-map owners remain in place.

Smudge reservoir carry increases from 50% to 80%, making mixed colour travel more strongly between dabs. Existing premultiplied alpha, connected manifold-face averaging, UV-island isolation, work budget and cancellation behavior remain covered. No new paint kernel or pointer owner.

Added a committed Metalness-only material regression and updated exact Smudge output checks for regular, alpha and rotated/mirrored connected surfaces. Focused final Paint, Smudge, release and shell set: 46 PASS / 0 FAIL. Full Node suite: 3,092 PASS / 0 FAIL / 0 skipped (101.28s). Changed JavaScript syntax and `git diff --check` pass. Published to `main` at app commit `5cdfcd5257781d3707c03e8ec856923ebcc96639`; follow-up UTF-8 document repair is `c6ccc239efe480f610b508a742984d88ca3eeb58`. Pages run `41282303465` and hosted Topology regression `41282217228` succeeded. The live page displays `v0.36.18.1046`. The initial Pages run `41282216751` failed because the oversized history/checklist files were truncated during the API upload; they were restored from the exact validated local UTF-8 copies and the subsequent deployment passed. Protected `src/multi-object-transform.js?v=0.36.1.0` is unchanged.

DEVICE1046: paint Metalness on a Studio object with no painted Colour map, tap Done and confirm the original Studio appearance/shadows return while Metalness remains visible; repeat with a colour map. Smudge between contrasting colours and across a folded connected edge; verify stronger carry and one-step Undo/Redo.


## .1047 — Metalness shadow contrast and stable Colour stroke start — 1 November 2026

User feedback on .1046: FAIL — no visible shadow after painting Metalness without a Colour map; FAIL — Colour painting intermittently orbits after UV Paint Done, while refresh sometimes restores behavior; PASS — Smudge is much better. Protect Smudge.

Audit found the committed Metalness-only preview adds the RoomEnvironment at full fallback intensity, which can fill the metal surface and wash out Studio contrast. The existing committed paint surface remains the owner; cap environment intensity to 0.35 only when a Metalness map exists without a Colour map. Existing base colour, material source, cast/receive shadow flags, colour-painted appearance and metal data remain owned by the original path.

The Paint capture handler previously returned on a Pencil pointerdown with zero initial pressure or no reported buttons, allowing OrbitControls to see an on-surface contact. Let the existing raycast/hit owner decide whether Paint claims it, default a first zero-pressure sample to full initial brush pressure, and update remembered pressure only from positive samples. A background hit still returns unconsumed for Pencil navigation. Regression covers surface contact before and after Done/reopen.

No parallel material, raycast, gesture or modelling kernel. Protected `.1045` workflows and `.1046` Smudge PASS remain unchanged. Focused Paint/material/Smudge/release/shell set: 46 PASS / 0 FAIL. Full Node suite: 3,093 PASS / 0 FAIL / 0 skipped (211.81s). Changed JavaScript syntax, reviewed runtime asset pins/hashes and `git diff --check` pass. Published to `main` at `0cd560452ae3984834f18a26a2cca30e649822bb`. Pages `41285607867` and hosted Topology regression `41285608117` succeeded; live `/BoxLab/` version marker, shell and all 11 changed/repinned runtime modules byte-match. Native iPad checks: metal-only Studio shadow/contrast and repeated Colour strokes immediately after Done/refresh, including continued Pencil background orbit.


## .1048 — Studio shadow contrast with Colour and Metalness maps — 1 November 2026

User reports separate Paint material channels and toolbars PASS, but shadow loss when a Colour map is used with Metalness. The `.1047` fix capped RoomEnvironment fill only when no Colour map existed; the original owner retained full fallback environment intensity for a painted Colour+Metalness surface.

Extend the existing `createPaintSurface()` owner to cap environment intensity for any committed surface with a Metalness map, regardless of whether a Colour map is also present. Retain painted albedo, scalar-map values, source Studio material, and cast/receive shadow flags. The metal-only behavior remains unchanged. Add a committed Colour+Metalness regression that verifies the colour pixels, metal channel, `.35` environment intensity and shadow flags together. No new rendering or material owner.

The user’s separate channel/toolbars PASS is protected. Smudge PASS remains protected. Focused material/Paint/Pencil/Smudge/release set: 30 PASS / 0 FAIL. Full Node suite: 3,094 PASS / 0 FAIL / 0 skipped (187.42s). Changed JavaScript syntax, reviewed runtime pin/hash contract, and `git diff --check` pass. Published at `55d63c1a3cdd18e8e7cd418689ca335568a9280a`; Pages `41287945609` and hosted Topology regression `41287946108` succeeded. Live `/BoxLab/` release files byte-match the tested tree. Native checks: combined Colour+Metalness shadows and the earlier Pencil-on-surface-after-Done fix.


## .1049 — stronger Metalness shadows and Pencil Paint/orbit recovery — 1 November 2026

User reports `.1048` combined Colour+Metalness shadow presence PASS, but shadow strength looks reduced. User also reports Pencil orbit in Paint can leave gizmo rotation unusable, and after switching brushes the next surface stroke can orbit instead of paint. Protect .1048 shadow presence, separate Paint channels/toolbars, .1047 metal-only shadow PASS, .1046 Smudge PASS and .1045 combined paint behavior.

The existing `paint-target.js` committed material owner raises the environment-fill cap from `.35` to `.55`; both metal-only and Colour+Metalness regressions assert the new value while preserving both shadow flags. The existing Pencil gate now treats active UV Paint mesh contacts as Paint-owned even if Paint's surface hit check declines them, preventing mesh-to-orbit promotion after tool changes. Empty-background Pencil orbit remains routable. On the semantic orbit claim, main cancels a matching transform-upgrade gizmo gesture using its existing pointercancel rollback path and clears a matching Total Gizmo transient state. No duplicate Paint, orbit or gizmo owners; protected `multi-object-transform.js?v=0.36.1.0` unchanged.

Added `pencil-gizmo-orbit-recovery-1049.test.mjs`; expanded the original deferred-orbit test for active Paint mesh contacts, background orbit and brush-switch routing. Material regression now asserts `.55`. Reviewed release cache closure and hashes through shell, Paint, render, and export owners. The first full run had one failure because shell-comparison still displayed `.1048`; updated its heading/launcher to `.1049` and retained `.1048` log compatibility. Focused material/Pencil/gizmo/shell/release set 42 PASS / 0 FAIL. Final full Node suite 3,096 PASS / 0 FAIL / 0 skipped (296.37s); changed JS syntax, release/cache contract, protected Multi pin and `git diff --check` pass.

Code/docs commit `79758731dc30bdc100bd1721efc92b5ccb9bc042` is on `origin/main`. Hosted Topology regression `41289594202` passed. Pages run `41289594359` failed on both attempts: GitHub refused to create the `.1049` deployment because previous `.1048` deployment SHA `55d63c1a3cdd18e8e7cd418689ca335568a9280a` remains marked in progress and must be cancelled or finish. Live `version.json` still reports `.1048`; do not call `.1049` published or ready for device testing. The connected GitHub integration exposes no Pages deployment cancellation write action. Next, cancel/clear that stale Pages deployment in GitHub, rerun Pages for `.1049`, and verify hosted version/assets. Device acceptance for stronger shadow contrast, post-brush-switch strokes, Pencil orbit and gizmo rotation remains pending.

DEVICE .1049: Studio Metalness-only and Colour+Metalness shadow strength; paint, change brushes, paint a second mesh stroke; Pencil background orbit; rotate the object afterward with Total Gizmo.


## .1050 — scalar material-map previews — 1 November 2026

User asks whether white Colour and Metalness pixels create the bright area and requests Roughness/Metalness map visibility in the layer preview. Audit confirms UV Paint layer rows are Colour overlays; Roughness and Metalness are separate object-level R8 resources. Existing PBR display feeds them independently as roughnessMap and metalnessMap. White Metalness affects reflections and can look bright with a light/white albedo; maps are not directly multiplied together. Do not tune the renderer from this hypothesis alone.

Added read-only 64×64 grayscale Roughness and Metalness map previews alongside the existing Colour layer list. White/black guidance is shown, missing maps say “No map”, snapshots flip UV V for display and area-average to preserve the existing layer-thumbnail orientation/read-only model. No data, history, shading or painting path changed. Release commit `4877fbbf6cbf24ec306d1d7d6e807c57daad57dc` is on main. Pages run `41292138569` succeeded; live version is `.1050`, and cache-busted `index.html`, Paint UI/core, layer-list, shell-comparison and runtime asset manifest byte-match the committed tree. Hosted Topology regression `41292138718` is still in progress. Automated tests were not run or added locally in this stage. See top of `TEST_CHECKLIST.md` for iPad map inspection and pending `.1049` interaction checks.


## .1051 — release identity and asset-contract repair — 1 November 2026

Hosted `.1050` Topology regression `41292138718` completed 3,093 PASS / 3 FAIL. The failures were metadata drift: `displacement-preview-gate-1041.test.mjs` still expected `.1049`, the `src/viewport-paint.js` reviewed hash was stale, and `index.html` still cache-pinned `release-version.js` at `.1049`. The live `.1050` deployment itself succeeded (`41292138569`; `version.json` reported `.1050`).

`.1051` updates the current release marker, shell-comparison identity/pin, direct release-version cache pin, preserved release assertion, and runtime asset contract hashes. It does not change Paint behavior or the Roughness/Metalness preview implementation. Code commit `69151a761c9ac040409de5b53e5690ba2766b423` is on `main`. Pages run `41292733751` succeeded. Live `version.json` reports `.1051`; cache-busted `index.html`, `shell-comparison.js`, `release-version.js`, and runtime asset manifest match the committed tree. Hosted Topology `41292734066` is still in progress. No local tests were run or added; `git diff --check` passed. Update this entry when hosted regression completes.


## .1052 — release/cache closure repair — 1 November 2026

Hosted `.1051` Topology run `41292734066` completed 3,094 PASS / 2 FAIL. One fixture held a stale hash for `src/paint-layer-list.js`; the canonical-loader check showed `index.html` loading `release-version.js` at `.1051` while `src/face-workflow-layout.js` still loaded it at `.1049`. Bump the updated Face workflow module and its `drawer-ui` parent cache pin together. Preserve logs for `.1050` and `.1051` in the shell comparison compatibility list.

`.1052` aligns direct/nested release-version cache pins, updates release/shell identity and runtime asset hashes, and fixes the preserved release assertion. No Paint behavior or map-preview implementation changes. Code commit `ee23fa96dd10790ebba696d485f438c88c29337f` is on `main`; Pages `41293243417` succeeded, live `.1052` is verified, and cache-busted index/shell/Face workflow assets match. Hosted Topology `41293243688` is running. No local tests were run or added; `git diff --check` passed.


## .1053 — Face workflow cache closure — 1 November 2026

Hosted `.1052` Topology regression `41293243688` completed 3,093 PASS / 3 FAIL: `drawer-ui.js` still imported `face-workflow-layout.js` at `.1044` while its reviewed contract expected `.1052`. This caused the overall runtime-asset reference check, canonical release-version-loader check, and Face layout cache-hop check to fail. The earlier failures were bookkeeping/pin closure, not reported paint behavior regressions.

`.1053` updates the actual `drawer-ui.js` child import and hash, keeps its index cache key aligned, retains matching direct/nested `release-version.js` pins, updates release markers, and preserves `.1050`–`.1052` shell logs. Map-preview implementation is unchanged. No local tests were run or added; `git diff --check` passed. Commit `596f5a2c1c731b992fca203f21e497f59911d9de` is on `main`; Pages `41293655018` succeeded and live `.1053` index, drawer-ui, Face workflow, shell-comparison and runtime asset manifest match. Hosted Topology `41293655084` is still running.


## .1054 — release display/assertion alignment — 1 November 2026

Hosted `.1053` Topology completed 3,094 PASS / 2 FAIL. `displacement-preview-gate-1041.test.mjs` still expected the `.1052` shell comparison pin, and shell-comparison's title, launcher and help text still displayed `.1052`. The runtime `.1053` shell identity and live assets were correct; these were stale release-facing references.

`.1054` aligns those strings/assertions with the release marker while preserving `.1050`–`.1053` comparison-log acceptance. Cache pins and runtime fixture hashes are updated for the changed shell, Face workflow and drawer chain. Map-preview behavior is unchanged. No local tests were run or added; `git diff --check` passed. Commit `889ab5a226245cd62a030a8baf415b881c61f716` is on `main`; Pages `41294085210` succeeded; live `.1054` marker, index/shell/asset-manifest match `main`. Hosted Topology `41294085728` passed all 3,096 tests (0 failed). Device acceptance remains pending.
