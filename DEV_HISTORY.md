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
- GLB MIME remains model/gltf-binary; export payload is unchanged.
- OBJ Share / Open In remains unchanged.
- HTML shell, module pin and version.json advanced together to .601.
- Protected multi-object-transform module unchanged.

## 2026-09-30 — v0.36.18.600 Save for Nomad Files workflow

- .599 hands-on FAIL for direct Safari/Web Share -> Nomad target eligibility.
- Same GLB remains valid and opens in Nomad after saving to Files, so browser target discovery is treated as a platform limitation rather than an export defect.
- Replaced misleading GLB Share / Open In wording with Save for Nomad.
- Added explicit iPad guidance: Save to Files, then in Files use Share → Nomad Sculpt.
- Restored GLB Web Share File MIME to `model/gltf-binary`.
- OBJ Share / Open In remains unchanged.
- HTML shell and version.json advanced together to .600.
- Protected multi-object-transform module unchanged.

## 2026-09-29 — v0.36.18.599 extension-driven GLB share type test

- .598 single typed GLB share still did not surface Nomad Sculpt.
- Same exported GLB does surface Nomad when shared from iPad Files, isolating the difference to Safari/Web Share item representation rather than model validity.
- GLB Web Share now omits File.type so iPadOS/WebKit must infer the document type from the .glb filename.
- OBJ share remains explicitly typed.
- HTML shell and version.json advanced together to .599.
- If this fails, stop MIME guessing and treat direct web-share target eligibility as the likely platform limitation.

## 2026-09-29 — v0.36.18.598 typed GLB File sharing

- Single-item Web Share was working, but Nomad Sculpt still did not accept the shared GLB.
- Found Share / Open In was explicitly changing GLB File.type to `application/octet-stream`.
- GLB share now creates a real `.glb` File with MIME `model/gltf-binary`.
- Web Share remains files-only with no title/text payload.
- HTML shell and `version.json` advanced together to .598.
- No GLB geometry, facegroup, PBR, UV, tangent, vertex-colour or layer-preservation logic changed.

## 2026-09-29 — v0.36.18.597 release manifest sync

- Live shell visibly loaded .597, then reverted to .595.
- Root cause: `version.json` was still `0.36.18.595`; `release-version.js` intentionally treats the manifest as network source of truth and restamped the UI back to .595.
- Synced `version.json` to `0.36.18.597`.
- No modelling/export/interaction code changed in this correction.

## 2026-09-29 — v0.36.18.597 transform-menu gizmo transient reset

- Fixed Total Gizmo becoming stuck after Transform menu interaction.
- Added explicit transient-state reset covering active handle, pointer ownership, drag styling, explicit gizmo constraint, HUD state and global active-gizmo drag marker.
- Transform tool and constraint menu clicks now reset gizmo transient state before applying the new menu state.
- Transform remains armed as requested; this is not a modelling/tool-state reset.
- .596 iPad single-file share fix remains unchanged.
- Protected multi-object-transform module unchanged.

## 2026-09-29 — v0.36.18.596 single-file iPad Share / Open In payload

- User traced missing Nomad Sculpt share destination to a second text payload accompanying GLB/OBJ exports.
- Root cause was Web Share calls using both `files:[file]` and `title:fileName`; iOS exposed the title as an additional text item/sidecar.
- Changed both Share / Open In and iPad Export / Save fallback to share only `{files:[file]}`.
- No model export geometry, Nomad preservation, facegroup, PBR, UV, tangent, vertex-colour or layer logic changed.
- Protected multi-object-transform module unchanged.

## 2026-09-28 — v0.36.18.550 HANDS-ON PASS

- User confirmed topology-safe Nomad UV round-trip PASS.
- .550 becomes the verified Nomad preservation checkpoint.
- UV seams and texture alignment survive the tested unchanged-topology round trip.
- Future work: tangents and vertex colours, then topology-aware morph/layer correspondence.

## 2026-09-28 — v0.36.18.550 Nomad UV Preservation Phase 2A

- Added per-face-corner UV capture on GLB import.
- UV seams survive welding because UVs are not collapsed onto shared geometry vertices.
- Conservative quad reconstruction carries UVs only when the two source triangles agree along the shared edge.
- Imported reconstructed topology receives a stable topology signature.
- Base GLB export restores UVs only when topology still matches that signature.
- Vertex movement is allowed; topology edits safely disable UV restoration.
- .549 PBR/material/texture passthrough remains in place.
- Frozen Beta 5 remains untouched.


## 2026-09-28 — v0.36.18.549 HANDS-ON PASS

- User confirmed Nomad GLB Preservation Layer Phase 1 PASS.
- .549 is now the verified Nomad handoff checkpoint.
- Safe material/texture/Nomad metadata passthrough survives the tested round trip.
- Future work remains for topology-bound UV/tangent/vertex-colour/morph correspondence.

## 2026-09-28 — v0.36.18.549 Nomad GLB preservation layer Phase 1

- Added opaque Nomad GLB passthrough capture at import.
- Stored original PBR materials, embedded image bytes, texture/sampler definitions, Nomad mesh/node extras, and topology-bound channel descriptors.
- Export now reattaches safe PBR/texture/Nomad metadata to rebuilt BoxLab GLB geometry.
- UV/tangent/vertex-colour/morph arrays are captured but deliberately not remapped yet because they are topology-bound.
- .548 quad reconstruction and .547 Nomad facegroup structure remain in place.
- Frozen Beta 5 remains untouched.


## 2026-09-28 — v0.36.18.548 conservative GLB quad reconstruction

- Added conservative quad recovery for editable GLB/GLTF imports.
- Reuses existing BoxLab triangle-pair topology validation.
- Requires same non-empty facegroup and near-perfect coplanarity before removing a GLB diagonal.
- OBJ path remains untouched.
- Goal: recover obvious original Nomad quads without remeshing genuine triangulated geometry.
- Frozen Beta 5 remains untouched.

## 2026-09-28 — v0.36.18.547 Nomad-native facegroup export

- Improved BoxLab facegroup display using deliberately spaced hues instead of hash-neighbour colours.
- Reworked GLB facegroup export to follow the structure observed in the user's Nomad GLB:
  - shared material
  - mesh-level Nomad groups metadata
  - primitive-level Nomad group indices
- Goal is to keep one logical object intact in Nomad while retaining its facegroups.
- Frozen Beta 5 remains untouched.


## 2026-09-28 — v0.36.18.546 Import module parse fix

- Fixed syntax error in .544 GLB importer that prevented import-mesh.js from loading at all.
- Restores Editable / Reference controls and Import file-picker handler.
- No intended GLB semantics changed beyond making the .544 importer actually run.
- Frozen Beta 5 remains untouched.

## 2026-09-28 — v0.36.18.545 File menu interaction fix

- Changed File menu auto-close ownership from all buttons to terminal actions only.
- Configuration buttons and editable controls now keep the menu open.
- No GLB or modelling behavior changes.
- Frozen Beta 5 remains untouched.

## 2026-09-28 — v0.36.18.544 GLB logical object import

- Fixed Nomad GLB imports creating one BoxLab object per facegroup when Split objects by groups was unticked.
- GLB/GLTF import now honors the same Split toggle as OBJ.
- Split off merges sibling GLB primitives back into one logical editable object and preserves each primitive as a facegroup.
- Split on keeps primitives as separate BoxLab objects.
- Existing export verification and frozen Beta 5 remain unchanged.

## 2026-09-28 — v0.36.18.543 Nomad round-trip validation

- Added in-memory GLB self-verification before Save/Share.
- Verifies logical object count and primitive/material group-slot count after GLTF re-read.
- Successful GLB export reports `GLB verified`.
- GLB import now records per-object facegroup counts for round-trip diagnostics.
- No modelling behavior changes. Frozen Beta 5 remains untouched.


## 2026-09-28 — v0.36.18.542 File Name edit root-cause fix

- Found File menu auto-close handler explicitly included inputs/labels, so tapping File Name immediately closed the menu and killed editing.
- Editable controls now keep the File menu open; button actions still close it.
- Bumped topbar-layout runtime pin to .542.
- No GLB facegroup, modelling, or frozen Beta 5 changes.

## 2026-09-28 — v0.36.18.541 File menu refresh + File Name edit fix

- Bumped stale styles.css cache key from .270 to .541 so File menu sizing reliably refreshes on Safari/iPad.
- File Name now takes explicit touch/Pencil focus and temporarily allows normal text-edit touch behavior while focused.
- Restores BoxLab touch-action when editing ends.
- No GLB facegroup, modelling, or frozen Beta 5 changes.

## 2026-09-28 — v0.36.18.540 Nomad GLB facegroup round trip

- GLB import now maps primitive/material boundaries into BoxLab faceGroups.
- GLB export now writes BoxLab facegroups as grouped GLB primitives/material slots while keeping each BoxLab object intact as one object.
- BoxLab facegroup names are embedded in GLB metadata/name where possible for exact BoxLab round trips.
- Updated File menu/export panel sizing to the standard BoxLab UI scale.
- Frozen Beta 5 remains untouched.

## 2026-09-27 — v0.36.18.539 Export As + GLB handoff

- Added a structured File > Export / Save panel with filename, OBJ/GLB and Base/SubD choices.
- Added GLB export via Three.js GLTFExporter.
- GLB preserves visible editable BoxLab objects as separate named nodes for Nomad Sculpt / 3D handoff.
- iPad uses the native share sheet so users can choose Save to Files; desktop uses showSaveFilePicker when supported; download remains fallback.
- Existing quick OBJ export remains available.
- Frozen Beta 5 remains untouched.

## 2026-09-27 — Beta 5 frozen at v0.36.18.538

- Final Boolean one-step Undo retest passed hands-on.
- Approved source commit: `343dc4dec00046762c7a9a11edaa92e0160a5a55`.
- Immutable /beta-5/ snapshot added by freeze commit `7667df2f889aca84b67bad56bf559d9c8d67478e`.
- Beta 5 closes the post-Beta-4 release hardening cycle including Face/Repeat ownership, progressive Vertex/Edge UI, construction-tool smoke testing, Shell first-press repair, and Boolean scene Undo repair.
- Multi-selection Object drawer collapse to Active Tools is accepted as a non-blocking UI quirk; Multi transforms passed.
- Normal development resumes on live main; /beta-5/ stays immutable.

## 2026-09-27 — v0.36.18.538 repair Boolean one-step Undo

- Beta 5 final smoke found Boolean geometry working but Undo did nothing.
- The pre-operation checkpoint was created before addMesh(), then lost when the new Boolean result became active and restored its empty history.
- Changed Boolean history ordering to capture pre-scene first and checkpointSnapshot() after result activation.
- Matches the proven Linked Duplicate scene-history pattern.
- No Boolean solver changes.

## 2026-09-27 — v0.36.18.537 fix Shell first-press iPad launch race

- Beta 5 Gate Batch 3 found Shell occasionally required a second press.
- Face layout settlement could move the Shell button during the pointer gesture, cancelling the click.
- Touch/Pencil now launches Shell on pointerdown before the pointerup layout pass.
- Mouse/keyboard click path remains.
- No Shell modelling/geometry changes.

## 2026-09-27 — v0.36.18.536 enter Beta 5 release-candidate hardening

- Removed temporary FACE DEBUG instrumentation only.
- Created BETA5_RELEASE_CHECKLIST.md covering navigation, Face/Repeat, Vertex/Edge, construction tools, Object/Multi/Boolean, Mesh Health/import/export and iPad UI.
- Feature development is paused for the release-candidate cycle; only reproducible release blockers should be changed before Beta 5 freeze.

## 2026-09-27 — v0.36.18.535 Face/Repeat checkpoint PERFECT PASS

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

## 2026-09-27 — v0.36.18.535 prioritize selected Face over generic through hit

- .534 still allowed generic viewport primary picking to resolve a through Face despite deliberate selected Face(s).
- Added selectedHit from the dedicated selected-face raycast.
- Deliberate single and multi-face operations now prioritize selectedHit.
- Immediate sequential A -> B retains its isolated overlap substitution path.

## 2026-09-27 — v0.36.18.534 bind sequential Extrude overlap to unchanged selection

- User screenshot showed selected-Face Extrude could again jump to a rear Face after Repeat cycles.
- Replaced loose sequential-overlap boolean semantics with a selection-bound key.
- Successful Extrude records the selected Face IDs that own the sequential continuation opportunity.
- Any subsequent Face selection change clears that opportunity automatically.
- Preserves immediate A->B continuation while protecting deliberate Face selection.

## 2026-09-27 — v0.36.18.533 remove delayed Repeat operation overwrite

- User found a multi-cycle state regression after .532.
- Delayed replay cleanup still restored the replayed op via armedOperation=op.
- That stale timeout could overwrite a newer real Extrude/Inset state.
- Removed the assignment; cleanup now only clears applying and refreshes UI.
- This makes real Face commits authoritative for Repeat operation changes.

## 2026-09-27 — v0.36.18.532 Face + Repeat checkpoint HANDS-ON PASS

- User confirmed .532 passes the remaining Repeat state-sync case.
- Confirmed stable: normal/sequential/multi-face Extrude, single/multi-face Inset, Repeat Extrude, Repeat Inset, persistent Repeat arming, and switching Repeat to the newest real Face operation.
- This closes the Face/Repeat regression chain.
- Temporary FACE DEBUG overlay remains for cleanup only.

## 2026-09-27 — v0.36.18.532 sync armed Repeat to newest real Face operation

- .531 direct Repeat passed hands-on.
- User found Repeat Inset could remain armed after subsequently performing a real Extrude.
- Removed the !applying timing dependency from armed Repeat state updates.
- Replay-generated direct commits are ignored by precision last-operation capture; new real Extrude/Inset commits always become the latest operation.
- Armed Repeat now follows the latest real operation immediately.

## 2026-09-27 — v0.36.18.531 replace synthetic Repeat with direct Face transaction

- Repeat remained non-functional on .530 despite correct target selection.
- Retired the synthetic pointer replay path for Repeat.
- Added direct transactional replay API to multi-face-direct.
- Extrude replay uses stable native single-Face extrusion, topology gate and one history step; negative values that would become Through/blocked are refused.
- Inset replay converts the stored geometric inset distance to target-face uniform inset amount and applies it directly with one history step.
- Normal interactive Face ownership/selection code is unchanged.

## 2026-09-27 — v0.36.18.530 make Repeat/Exact trust explicit Face selection

- Repeat remained non-functional after .529 normal targeting passed.
- Root cause candidate found in the synthetic replay path: Repeat explicitly selected the tapped Face, then the synthetic pointer gesture caused multi-face-direct to ray-pick the viewport again.
- Removed that redundant synthetic re-pick.
- pointerId 9876 now trusts the current Face selection and preserves the full selected set.
- Real pointer Face targeting, sequential Extrude, Inset and Through behavior are unchanged.

## 2026-09-27 — v0.36.18.529 preserve deliberate selected Face before sequential overlap

- While testing Repeat on .528, user explicitly selected a front Face and then dragged Extrude, but the deeper rear Face was extruded.
- Root cause: the sequential overlap preference was still active for any one-selected-face real Extrude gesture.
- Added preferSequentialUnselected state.
- Tool arming and explicit Face taps reset it.
- Successful ordinary Extrude sets it for the next direct sequential gesture only.
- This preserves deliberate preselection while retaining the A -> B armed workflow.

## 2026-09-27 — v0.36.18.528 isolate Repeat/Exact synthetic Face gesture

- .527 normal Face tools passed hands-on.
- Repeat/Exact uses synthetic pointerId 9876 and already supplies the explicit selected target Face.
- Prevented the sequential Extrude overlap preference from substituting another Face for pointerId 9876.
- Prevented sequential-through-fallback from arming on pointerId 9876.
- No change to real Pencil/touch Extrude, Inset, multi-face behavior or Through ownership.

## 2026-09-27 — v0.36.18.527 Face Extrude/Inset checkpoint HANDS-ON PASS

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

## 2026-09-27 — v0.36.18.527 make overlap hit substitution Extrude-only

- .526 passed sequential and deliberate multi-face Extrude, while Inset still failed.
- Found shared Face hit logic was applying the sequential Extrude overlap preference to Inset too.
- On a selected front Face, Inset could therefore choose an unselected rear Face from the same ray stack.
- Limited the unselected-overlap substitution to armed Extrude only.
- Inset now keeps the pressed selected Face while retaining direct press on an unselected Face.
- No Inset geometry solver changes in this build.

## 2026-09-27 — v0.36.18.526 constrain overlap hit preference for multi-Face Extrude

- .525 fixed sequential A -> B armed Extrude.
- Hands-on then revealed deliberate multi-face Extrude could choose an unselected face through the back of the model.
- Cause: .523's unselected-hit preference was being applied even when multiple faces were deliberately selected.
- Limited that preference to exactly one selected face.
- With 2+ selected faces, pressing a selected face now preserves primary hit and therefore the full selected working set.
- Sequential Through ownership fix from .525 remains unchanged.

## 2026-09-27 — v0.36.18.525 bind sequential Through fallback to resolved Face gesture

- .524 screenshots proved B picking/workingFaces were correct but direct drag never began while geometry still mutated.
- Found sequential-through-fallback .385 still owned window-capture pointerdown and therefore saw stale Face A before multi-face-direct switched to B.
- It could then steal pointermove, mutate A and cancel the intended B drag.
- Removed stale window pointerdown arming.
- Fallback now subscribes to boxlab-face-direct-press and uses the resolved hit/workingFaces plus pointer coordinates from multi-face-direct.
- This preserves the special inward/Through fallback while making multi-face-direct authoritative for Face targeting.

## 2026-09-27 — v0.36.18.523 restore proven Face hit-stack targeting

- .522 still failed sequential Face A -> B extrusion.
- Current multi-face-direct was found to have lost the .495 overlap-selection rule even though main.js still exposes bridge.pickHits().
- Restored the exact proven behavior: if the nearest Face hit is already selected, prefer the first unselected Face in the ordered hit stack.
- Kept .519 provisional drag ownership and .522 native single-Face Extrude routing.
- No Through/Inset/other modelling changes.

## 2026-09-27 — v0.36.18.522 restore mature native single-Face Extrude

- .521 still failed hands-on, ruling out stale deployment and the restored .460-style legacy viewport yield as the primary Face failure.
- Compared the current direct Face geometry path with the .449 known-good behavior.
- Found current code routed ordinary one-Face Extrude through the connected multi-face miter solver instead of EditableMesh.extrudeFace().
- Restored native EditableMesh.extrudeFace() for exactly one selected Face; deliberate 2+ Face bands retain the connected solver.
- Through contact classification, topology gate, Inset, navigation and protected multi-object-transform are unchanged.

## 2026-09-27 — v0.36.18.521 cross-browser stale-shell refresh repair

- .520 deployed successfully on GitHub Pages but did not refresh on every browser.
- Found the HTML shell itself was still stamped .444 and release bootstrap/version scripts carried old cache keys.
- More importantly, the old release bootstrap stopped retrying once the URL already contained build=<latest>, even if the browser had served the stale shell again.
- Stamped the HTML shell and release scripts .521 and changed the bootstrap to retry stale-shell reloads with a fresh nonce, capped at three attempts per latest release.
- This release changes deployment/cache behavior only; BoxLab modelling runtime remains the .520 Face-owner build.

## 2026-09-27 — v0.36.18.520 restore proven Face direct-owner guard

- .519 failed hands-on, so stopped iterating on selection handoff.
- Audited repo history and found v0.36.18.460 had already solved a mature-direct-vs-legacy viewport ownership conflict with an explicit early return in main.js.
- Restored only that proven Face ownership guard: legacy main.js canvas pointerdown now yields whenever direct Extrude/Inset is visibly armed.
- This is a narrow, intentional exception to the frozen main.js .501 baseline; no selection bridge logic, topology solver, Through kernel, navigation, Rotate, Edge, Sweep or multi-object-transform behavior changed.
- Added a regression contract that the guard executes before legacy viewport drag state.

## 2026-09-27 — v0.36.18.519 provisional Face drag ownership

- Hands-on .518 showed the second unselected-face Extrude still inherited stale prior-Face behavior strongly enough to deform Face A and contaminate the edited mesh.
- Changed armed Face press ownership so an unselected hit Face becomes the provisional live selection immediately on pointerdown rather than waiting for the drag threshold.
- Tap semantics are preserved transactionally: restore the prior selection, then apply the existing native Face toggle.
- Drag semantics keep the provisional one-Face selection, so downstream handlers cannot observe the previous Face as the active working set.
- No topology solver, Through, Inset, navigation, Rotate, Edge, Sweep or protected multi-object-transform changes.

## 2026-09-27 — v0.36.18.518 Face Extrude / Repeat repair

- Fixed second armed Extrude on a different unselected Face by aligning the live Face selection with the actual drag working set before modelling begins.
- Added direct ordinary-Extrude commit value event so Repeat Previous captures the committed Extrude distance reliably.
- Left Inset, deliberate multi-face, armed tap-selection and Through behavior unchanged.

## 2026-09-27 — v0.36.18.517 Object / Tool Session defaults

- Prevented Objects drawer retain logic from reopening Objects while any Tool Session is active; this targets Array drawer flicker at the ownership source.
- New Revolve Profile starts with Edit Profile active and opens its Tool Session immediately.
- Boolean opens with Object Multi enabled through the authoritative Object Selection API.
- No Array geometry, Boolean solver or Revolve topology changes.

## 2026-09-27 — v0.36.18.516 Face armed-drag / Repeat repair

- Corrected armed Face drag semantics so a drag beginning on an unselected Face operates that Face only instead of inheriting the prior completed Face selection.
- Preserved deliberate multi-face operations: if the drag begins on a Face already in the selected set, the selected set is operated together.
- Added a direct-controller press event so precision-face can capture Extrude/Inset values even when the Face was not preselected.
- This reconnects Repeat Previous to valid armed Face workflows without changing Repeat's replay controller.
- Protected main selection bridge and Through topology path remain unchanged.

## 2026-09-27 — v0.36.18.515 Sweep activation/layout repair

- Diagnosed Sweep's first-press failure as a late Edge-toolbar ownership race.
- Shared Edge layout now owns both Sweep and Circle placement.
- Circle no longer independently relocates itself in Edge mode when pointerup fires.
- Sweep requests immediate shared layout settlement after its launch button is created.
- Sweep controls normalized to compact 31px / 10px sizing.
- Sweep topology/path behavior unchanged.
- PR #247 squash-merged as `450dd4e3b287005fdc8ace77eb792a95add2410a`; .515 and older .509 Sweep regressions passed in run #995.

## 2026-09-27 — v0.36.18.514 Edge Slide / Offset / Extrude polish

- Repositioned Edge Slide exact Slide % controls directly beneath the Edge Slide action row.
- Made Edge Slide and Offset Loop mutually exclusive through their existing direct-tool exclusivity event path.
- Reasserted Move + Plane on initial Edge Extrude arm after the click stack so Free cannot remain the visible/default state.
- Kept Sweep out of this build for separate investigation.
- PR #246 squash-merged as `8442af88cbddddc8829419e8da7d051d639c234e`; .514 plus existing .427/.475/.476 Edge regressions passed in run #992.

## 2026-09-27 — v0.36.18.513 Vertex Bevel + Merge to First

- Moved Vertex Bevel Exact % row/readout directly beneath the existing Width control.
- Fixed Merge to First semantics by tracking the actual local order vertices are selected, rather than relying on core's numerically sorted selection IDs.
- Kept the fix inside Vertex-owned modules; no main selection model or protected interaction runtime changed.
- Vertex Extrude noted for post-Beta-5 roadmap only.
- PR #245 squash-merged as `4f54930b2e4bfd982400a52219a9ba093bd65549`; .513, .474 and .341 Vertex regressions passed in run #990.

## 2026-09-27 — v0.36.18.512 load recovery from failed .511

- User reported .511 would not refresh/load in three browsers.
- Reverted tool-session-ui.js exactly to the confirmed-loading .510 runtime content.
- Cache-hopped the restored UI as .512.
- Removed the failed .511 Vertex polish regression.
- No modelling or interaction code changed from .510.

## 2026-09-27 — v0.36.18.511 Vertex cross-mode polish

- Normalised Vertex tool rows to the same compact 3-column spacing and button sizing used by Edge and Face.
- Preserved the established .341 deterministic Vertex tool order to avoid reintroducing historical button-jump regressions.
- Existing Vertex Slide and Vertex Bevel progressive disclosure remains unchanged.
- Presentation-only change; no modelling or selection logic changed.
- PR #243 squash-merged as `fe6df6b674064fd30473bd2c49c1254cadff63d4`; .511 and older .474 Vertex disclosure regressions passed in run #986.

## 2026-09-27 — v0.36.18.510 Edge Extrude Move/Plane cue

- Edge Extrude now automatically arms the real Move transform when the tool is activated.
- Initial Edge Extrude constraint defaults to Plane, giving the most useful free movement perpendicular to the grabbed edge.
- Defaulting occurs only on a fresh arm transition so later user-selected constraints persist across repeated ribbon pulls.
- No topology or extrusion solver changes.
- PR #242 squash-merged as `47a699bbd042e49cfaed58919dc9b26ead081216`; .510 and existing .427 Edge Extrude regressions passed in run #984.

## 2026-09-27 — v0.36.18.509 Sweep active-button polish

- Removed the Sweep-specific blue inset outline from active/pressed buttons.
- Sweep now matches the standard BoxLab white active-button appearance.
- Presentation-only change; no Sweep interaction or modelling logic changed.
- PR #241 squash-merged as `26df6e06cfc15bc2aad15b1edd3e4a7fa3bc1b68`; .509 visual regressions passed in run #982.

## 2026-09-27 — v0.36.18.508 Edge progressive disclosure

- Compacted Edge home into five dense 3-column rows without replacing button nodes or changing modelling handlers.
- Kept existing armed-only Loop, Bevel, Crease, Edge Slide and Offset Loop controls.
- Moved late-mounted Edge Extrude and Sweep launchers into the compact grid when available.
- Hid legacy section labels / duplicate crease presentation row after authoritative buttons move.
- Preserved Face .501, Rotate .483, Through, navigation and protected multi-object transform.
- PR #240 squash-merged as `013162607862c5e6028918d26f200a4f5ae2d241`; new .508 regressions and the relevant .476 Loop Slide contract passed in run #980 despite unrelated stale-suite failures.

## 2026-09-26 — v0.36.18.507 handoff reconciliation

- Reconciled AI_HANDOFF.md and TEST_CHECKLIST.md with actual current main after the final .507 layout refinement.
- Removed the superseded .507 note/checklist that still placed Orient Faces in the compact grid.
- No app/runtime code changed; current .507 remains Row 6 = Quad Cleanup / Quadify N-gons / blank, with Orient Faces in Repair.

## 2026-09-26 — v0.36.18.507 compact Face 3-column grid

- Repacked Face tools to match the user-marked six-row, three-column layout.
- Left Orient Faces in Repair rather than the modelling grid.
- Kept armed Value/readout/Repeat below Row 1 and diagnostics at the true bottom.
- Layout only; frozen .501 Face interaction unchanged.

## 2026-09-26 — v0.36.18.507 dense Face tool grid

- Reworked Face modelling controls into six compact 3-column rows following the user's markup.
- Kept armed Value/readout/Repeat beneath Row 1.
- Kept Inspect / Repair / Topology Gate as the final sections.
- Preserved all existing buttons, including Orient Faces in the spare lower-right slot.
- Layout only; .501 Face interaction unchanged.

## 2026-09-26 — v0.36.18.506 force Face diagnostics to true bottom

- Fixed .505 ordering bug where late Face tools could remain below Inspect / Repair / Topology Gate.
- Face layout sync now appends Inspect, Repair, and Topology Gate as the final three drawer children in that order.
- Compact modelling rows and frozen .501 interaction unchanged.

## 2026-09-26 — v0.36.18.505 compact Face modelling block

- Rearranged Face tools into three compact rows to reduce vertical drawer usage.
- Kept armed Value/readout/Repeat directly beneath Extrude/Inset/Knife.
- Moved Inspect, Repair and Topology Gate below the entire modelling block.
- Updated Join Coplanar placement to respect the compact row.
- Layout only; frozen .501 Face interaction unchanged.

## 2026-09-26 — v0.36.18.504 Face drawer hierarchy repair

- Replaced positional Face-row anchoring with explicit ID-based ordering.
- Extrude/Inset/Knife row is restored directly below Face title.
- Value/readout/Repeat remain directly below that row when armed.
- Inspect and Repair are moved back down directly above Topology Gate.
- Presentation/layout only; frozen .501 Face interaction untouched.

## 2026-09-26 — v0.36.18.503 Face disclosure control order

- Moved Face Value/readout/Repeat Previous directly below the primary Extrude/Inset/Knife row.
- Kept .502 armed-only visibility for Extrude and Inset.
- Presentation/layout only; no Face interaction changes.

## 2026-09-26 — v0.36.18.502 Face progressive disclosure: exact controls

- Started Face progressive disclosure from frozen .501 interaction baseline.
- Hidden Face exact-value row/readout and Repeat Previous at rest.
- These controls now appear only while Extrude or Inset is active.
- CSS/presentation only; no Face handlers or modelling logic changed.

## 2026-09-26 — v0.36.18.501 freeze single-owner armed Face selection

- User confirmed .500 armed Extrude/Inset Face selection works perfectly.
- Removed temporary FaceOwner trace and read-only legacy directTool diagnostic bridge.
- Retained .499 single-owner fix: persistent-face-tool-select yields while multi-face-direct is armed.
- Clean baseline for Face progressive disclosure.

## 2026-09-26 — v0.36.18.499 single-owner armed Face selection

- Identified the true flash cause: legacy persistent-face-tool-select added the face on window capture before multi-face-direct handled the same gesture and toggled it back off on pointerup.
- Legacy helper now yields whenever the recovered direct Face owner is armed.
- Restored native visible Face picker + native toggle inside multi-face-direct; removed projected/deeper-hit experiments.

## 2026-09-26 — v0.36.18.498 projected visible Face picker

- .497 removed accidental through-selection but armed Face selection remained unusable.
- Added projected polygon picking for armed Extrude/Inset: camera-facing polygons only, Pencil point containment, nearest eligible depth.
- No rear-face fallback. Native tap toggle and existing modelling drag path retained.

## 2026-09-26 — v0.36.18.497 restore visible-only armed Face picking

- Removed .495 selected-aware deeper-hit fallback after hands-on showed it caused through-selection and two-face Extrude while Visible selection was active.
- Armed Extrude/Inset now use only the nearest native Face hit.
- Native tap toggle remains; temporary diagnostics and .496 Deselect workaround removed.

## 2026-09-26 — v0.36.18.496 preserve armed Face tool across Deselect

- .495 fixed additive armed Face selection.
- Added a narrow recovery for Selection > Deselect while Extrude/Inset is armed.
- After main.js clears selection, multi-face-direct resynchronizes its armed button/status state so a new Face selection can be started without re-arming.
- .495 hit-stack selection logic unchanged.

## 2026-09-26 — v0.36.18.495 selected-aware Face hit-stack resolution

- .494 proved the additive tap ray was hitting selected face 1 first and unselected face 4 second.
- Armed Extrude/Inset now prefer the first unselected Face in the ordered hit stack when the primary hit is already selected.
- If no unselected overlapping Face exists, the selected primary remains available for tap-to-deselect.
- Ordinary Face selection behavior is unchanged.

## 2026-09-26 — v0.36.18.494 Face hit-stack diagnostic

- .493 proved the tap was hitting selected face 3 and then correctly toggling it off.
- Added ordered native Face raycast hit-stack diagnostics with per-hit distance.
- No modelling or selection behavior change.

## 2026-09-26 — v0.36.18.493 persistent Face tap trace

- .492 screenshot showed final RAF selection empty after a valid face hit.
- Changed diagnostic output to retain every stage on one line so immediate commit vs later overwrite can be distinguished.
- No modelling or selection behavior change.

## 2026-09-26 — v0.36.18.492 Face tap staged diagnostic

- .491 still failed additive armed Face selection while deselection worked.
- Added visible status-bar diagnostic for before/immediate/microtask/RAF selection state around native toggle.
- No selection or topology behavior intentionally changed.

## 2026-09-26 — v0.36.18.491 native Face toggle bridge

- .490 still allowed deselection but not additive selection while Extrude/Inset stayed armed.
- Exposed main.js native `toggleSelection` through the selection bridge.
- Armed Face taps now use native picker + native toggle end-to-end instead of rebuilding selection arrays in multi-face-direct.
- Drag/modelling path remains unchanged.

## 2026-09-26 — v0.36.18.490 Face tap-before-model split

- .489 still allowed deselection but not additive selection with a no-action tap.
- Deferred Extrude/Inset region construction until after the 8 px drag threshold.
- Pointerdown now stores only the native Face hit + selection snapshot.
- Pointerup before threshold toggles selection directly, independent of modelling-region validity.
- Drag after threshold promotes into the existing direct modelling path.

## 2026-09-26 — v0.36.18.489 native Face picker bridge

- Exposed main.js native `pickKind` read-only via `__boxlabSelectionBridge.pick(type,event)`.
- Armed Extrude/Inset now use that exact picker directly for both selected and unselected faces.
- Removed previous duplicate scene-raycast / native-handoff experiments and stale pending handoff state.
- main.js native behavior remains unchanged apart from the new bridge method.

## 2026-09-26 — v0.36.18.488 native Face picker handoff

- .487 still failed despite raycasting live scene face meshes.
- Reframed ownership around the actual native picker: main.js pickKind('face') now handles unselected-face taps while Extrude/Inset remains armed.
- Selected-face presses remain owned by multi-face-direct for deselection and modelling drag.
- Unselected native taps can promote into direct modelling only after the drag threshold is crossed.
- Removed duplicate armed Face picker logic.

## 2026-09-26 — v0.36.18.487 live scene Face picker

- .486 still failed because it looked for a non-existent bridge `faceObjects` collection.
- Audited main renderer and confirmed normal Face pickers are live scene objects tagged `userData.kind='face'`.
- Armed Extrude/Inset now raycast those exact scene Face picker meshes.
- Existing tap-toggle logic and direct-tool ownership are unchanged.

## 2026-09-26 — v0.36.18.486 armed Face picker ownership repair

- .485 still flashed/dropped newly tapped faces during armed Extrude/Inset.
- Replaced the direct tool's temporary mesh raycast with the same live viewport faceObjects picker used by normal Face selection.
- Added explicit armed Face direct ownership state and made edge-paint-select yield while that owner is active.
- No topology or disclosure changes.

## 2026-09-26 — v0.36.18.485 armed Face full selection ownership

- .484 fixed tap-to-deselect but additive selection of unselected faces still flashed/dropped while Extrude/Inset stayed armed.
- Consolidated armed Face tap/drag ownership into multi-face-direct instead of splitting unselected-face selection through edge-paint-select.
- Armed taps now toggle faces both directions; drags operate on the resulting working selection.
- No disclosure or topology changes.

## 2026-09-26 — v0.36.18.484 armed Extrude / Inset tap-toggle selection

- Added tap-to-deselect for already-selected faces while Extrude or Inset remains armed.
- The existing drag threshold still separates selection taps from modelling drags.
- Dragging a selected face continues to run Extrude/Inset unchanged.
- Additive selection of other faces remains intact; no progressive-disclosure changes yet.

## 2026-09-26 — v0.36.18.483 unified component Rotate owner

- Hands-on .482 showed Face Rotate working only through dedicated rotate-transform; Vertex/Edge remained broken and precision controls were ignored.
- Extended the working dedicated Rotate owner to Vertex, Edge and Face using authoritative selection bridge IDs.
- Wired world-axis X/Y/Z constraints and existing 15° snap button into that owner.
- Shared transform now yields component Rotate to prevent dual ownership.
- Move/Scale and protected main runtime remain unchanged.

## 2026-09-26 — v0.36.18.482 component Rotate start-gate repair

- .481 still failed for all component Rotate modes.
- Removed Rotate's dependency on `hitSelectedIndex`; an existing Vertex / Edge / Face selection plus armed Rotate is now sufficient to begin the transform from a viewport Pencil drag.
- Move/Scale retain their existing hit-test behavior.
- No Rotate maths or protected core runtime changed.

## 2026-09-26 — v0.36.18.481 shared transform pointermove capture repair

- .480 still failed for all component Rotate modes.
- Found ownership split inside transform-upgrade: pointerdown used document capture, pointermove used canvas capture behind the Pencil orbit gate.
- Moved shared transform pointermove to document capture so an active Rotate drag cannot be intercepted mid-gesture.
- No transform maths or protected core runtime changed.

## 2026-09-26 — v0.36.18.480 shared component Rotate repair

- Hands-on established Vertex, Edge and Face Rotate all fail, so .479 Face-only ownership diagnosis was incomplete.
- Shared transform owner now reads authoritative `__boxlabTransformArming.tool()` before DOM active-class fallback.
- Removed the .479 Face-only yield so Vertex / Edge / Face Rotate share one transform path again.
- Rotate maths, protected main runtime and Pencil navigation remain unchanged.

## 2026-09-26 — v0.36.18.479 Face Rotate ownership repair

- Isolated Face Rotate after .477 cache hop did not restore hands-on behavior.
- Found two rotate owners plus stale face-selection lookup in dedicated rotate-transform.
- Generic transform-upgrade now yields Face Rotate only.
- Dedicated rotate-transform now uses authoritative selection bridge IDs for Face selection and transform-arming state for Rotate.
- Move/Scale and non-Face Rotate paths remain unchanged; protected main runtime untouched.

## 2026-09-26 — v0.36.18.478 single-click Loop / Bevel handoff

- Hands-on .477: Loop disarmed when Bevel was tapped, but Bevel required a second tap to arm.
- Moved Loop↔Bevel exclusivity from pointerdown to click-capture so the same click can disarm the old tool and continue into the new tool handler.
- No Bevel, Loop topology, selection, or transform code changed.

## 2026-09-26 — v0.36.18.477 Edge exclusivity + Face Rotate cache repair

- Made Loop Cut and Edge Bevel mutually exclusive using their existing toggle paths.
- Audited Face Rotate against .449: transform source and ownership files are byte-identical to the known-good baseline.
- Found current loader using stale `.444` transform-upgrade cache key instead of the later proven runtime key.
- Cache-hopped unchanged `transform-upgrade.js` to .477 so iPad/Safari receives the current source.
- No rotate algorithm or protected transform core changed.

## 2026-09-26 — v0.36.18.476 Edge progressive-disclosure polish

- User requested layout refinements after .475 hands-on.
- Moved Loop Slide directly below Loops.
- Moved Edge Bevel Exact % + readout directly below Segments.
- Moved Offset Loop Support Spacing above Exact Offset % + readout.
- Added narrow Crease handoff coordination so selecting another Edge/transform tool or leaving Edge mode disarms Crease through its existing control path.
- Crease Strength remains visible only while Crease is actually active.
- Protected main modelling runtime remains unchanged.

## 2026-09-26 — v0.36.18.475 Edge progressive disclosure

- User hands-on passed .474 Vertex progressive disclosure.
- Continued the Tool-first rebuild with Edge mode only.
- Loop count/slide, Bevel width/segments/exact, Crease strength, Edge Slide exact and Offset Loop exact/support controls are now hidden at rest and shown only while their owning tool is active.
- No Edge tool handlers, selection ownership, topology solvers or transform ownership changed.
- Cache-hopped only `tool-session-ui.js`.

## 2026-09-26 — v0.36.18.474 Vertex progressive disclosure

- Resumed the post-.449 Tool-first UI rebuild with Vertex mode only.
- Reintroduced only the proven .450 CSS visibility rules for Vertex Slide and Vertex Bevel settings.
- Slide % / readout are hidden until Slide is active.
- Bevel Width / Exact % / readout are hidden until Bevel is active.
- No tool handlers, selection ownership, transform ownership or topology code changed.
- Cache-hopped only `tool-session-ui.js`.

## 2026-09-26 — v0.36.18.473 true Bisect Only

- Added an explicit **Bisect Only** action to the existing Symmetry/Bisect Tool Session.
- Unlike the old non-mirrored keep-half path, the new operation keeps both sides and only inserts the plane cut into crossed faces.
- Added `splitMeshByPlane()` to the symmetry core, reusing the current arbitrary movable/rotatable plane definition.
- Split faces inherit their source facegroup; crease edges are remapped through cut intersections where possible.
- Existing Symmetry Apply path remains unchanged; old “Bisect only” wording for keep-half mode is corrected to “Keep half”.

## 2026-09-26 — v0.36.18.472 Sweep transaction declaration + Edge Bevel UI placement

- .471 removed Edge Revolve correctly, but Add > Sweep remained inert.
- Found the real .469 regression: `sweepBeforeScene`, `sweepUndoDepth` and `sweepRedoDepth` were assigned without declarations in an ES module, causing Add > Sweep to throw before object creation.
- Declared those three transaction variables in the Sweep runtime state block; .471 mode-change cancellation guard remains intact.
- Moved Edge Bevel Exact % from the bottom of Edge Active Tools to immediately before the Slide % / Offset % precision controls.
- Cache-hopped `precision-bevel.js`, `drawer-ui.js` and `sweep-path.js` only as required.

## 2026-09-26 — v0.36.18.471 Sweep Add recovery + Edge Revolve removal

- Hands-on .470 confirmed Edge Revolve works; removed its controls from the normal Edge Active Tools surface because it requires difficult-to-discover loose-edge profiles.
- Fixed Add > Sweep immediately disappearing after creation.
- Root cause was .469's queued mode-change cancellation observing the just-created Sweep after Sweep's own Add flow entered Object mode.
- Mode-change cancellation now only acts when a Sweep already existed when the mode click began, preserving later user escape/cancel behavior.
- Sweep construction/profile/path geometry code is unchanged.
- Cache-hopped only `revolve.js` and `sweep-path.js` to .471.

## 2026-09-26 — v0.36.18.470 Edge Revolve progressive disclosure

- Continued the post-.449 UI cleanup as one isolated Edge-mode presentation slice.
- Restored only the previously proven historical .457 Revolve visibility pattern: at rest Edge Active Tools shows one Revolve launcher; Lathe/Revolve label, axis buttons and Segments appear only after a valid Revolve is armed.
- Apply, Cancel/mode escape and active-object escape return Revolve to the compact resting state.
- Revolve core geometry, preview, history, selection and Pencil range behavior are unchanged.
- Audit also found PR #199 (.469) regression run failed with 57 stale contract tests, mostly old current-version/pin assumptions and recovery-era assertions. No broad runtime repinning was introduced to satisfy them.

## 2026-09-26 — v0.36.18.469 Revolve Profile + Sweep session recovery

- Restored the known-good historical Revolve Profile controller from .453 because the recovered .443 file lacked the later Add/Cancel transaction path.
- Added true transactional Sweep cancellation with scene/history rollback.
- Sweep now exposes Cancel Sweep at every stage and cancels cleanly when leaving the workflow or opening another Tool Session.
- Kept the protected Face/Bevel/Inset/Through interaction runtime untouched.

## 2026-09-26 — v0.36.18.468 Object-mode Tool-first UI cleanup

- Resumed the UI/UX cleanup from the proven .467 runtime instead of replaying the old broad rewrite.
- Restored authoritative hidden-state CSS for Tool Session shells.
- Wrapped the existing Boolean controls behind one launcher using the Tool Session host.
- No direct modelling, pointer/selection ownership, topology or index cache rewiring changes.
- This is the first presentation-only rebuild slice toward the previously approved clean UI.

## 2026-09-26 — v0.36.18.467 Viewport scroll recovery

- .466 passed hands-on; Facegroup recovery considered complete.
- Restored only the functional part of historical .449: Viewport panel max-height + vertical scrolling for iPad.
- Deliberately skipped historical index/module cache-version churn.
- Next: resume UI cleanup in small isolated slices.

## 2026-09-26 — v0.36.18.466 Shell-only facegroup propagation

- .465 passed hands-on with Solidify Facegroups restored and Shell still healthy.
- Reintroduced metadata only in `shell-core.js`.
- Shell compact/clone paths keep surviving facegroups aligned with faces; opening-face groups are removed with those faces.
- Solidify remains untouched and supplies the already-proven inner-face inheritance / Ungrouped side-wall behavior.

## 2026-09-26 — v0.36.18.465 Solidify-only facegroup propagation

- .464 recovery passed hands-on: Shell restored, Solidify healthy.
- Reintroduced facegroup metadata only in `solidify-core.js`; Shell left untouched.
- Source and inner Solidify faces share the parent group; generated side walls are Ungrouped.
- Rollback restores faceGroups with other mesh state.

## 2026-09-26 — v0.36.18.464 Shell/Solidify recovery

- User found Shell broken after .462.
- Restored `solidify-core.js` and `shell-core.js` exactly to the confirmed-working .461 state rather than layering another speculative fix.
- Retained the successful Extract Faces and Object Join facegroup preservation work.
- Solidify/Shell facegroup propagation is deferred for separate reintroduction after functional recovery is hands-on confirmed.

# BoxLab Development History

## 2026-09-26 — v0.36.18.463 Object Join facegroup preservation

- v0.36.18.462 Extract/Solidify/Shell propagation passed hands-on testing.
- `combineEditableMeshes()` now carries `faceGroups[]` in lockstep with appended faces.
- Joined source objects preserve their existing group IDs and colours in the combined editable mesh.
- No Boolean or interaction behavior changed.

## 2026-09-26 — v0.36.18.462 Extract / Solidify / Shell facegroup propagation

- v0.36.18.461 Mesh Health facegroup preservation passed hands-on testing.
- Extract Faces now carries selected facegroup IDs into the new object and preserves remaining source groups.
- Solidify copies source groups to inner duplicate faces and marks new side-wall faces Ungrouped.
- Shell's compact/restore path now preserves groups and inherits Solidify semantics.
- No modelling interaction changes.

## 2026-09-26 — v0.36.18.461 Mesh Health facegroup preservation recovery

- v0.36.18.460 SubD facegroup propagation passed hands-on testing.
- Restored facegroup metadata preservation through Safe Repair, Auto Close, Unify Winding, Flip Normals and Triangulate.
- Safe Repair filters `faceGroups[]` in lockstep with removed faces.
- Auto Close caps are deliberately ungrouped while existing faces retain their groups.
- Triangulated child faces inherit the source polygon's facegroup.
- No modelling interaction changes.

## 2026-09-26 — v0.36.18.460 SubD facegroup propagation recovery

- v0.36.18.459 Mirror propagation passed hands-on testing.
- Restored facegroup inheritance through Catmull-Clark subdivision only.
- Each generated child quad inherits its parent facegroup ID.
- Facegroups viewport evaluation now applies SubD before Mirror, matching BoxLab's display/evaluation order.
- No modelling interaction/tool-ownership changes.

## 2026-09-26 — v0.36.18.459 Mirror facegroup propagation recovery

- v0.36.18.458 first-activation pending-state repair passed hands-on testing.
- Restored facegroup inheritance through non-destructive Mirror only.
- Mirrored descendant faces inherit the source face's facegroup ID.
- Facegroups Render Look evaluates current Mirror settings before applying viewport colours.
- SubD propagation remains deferred for separate isolation.

## 2026-09-26 — v0.36.18.458 Facegroups pending-state first-activation repair

- .457 historical two-frame retry did not resolve the recovered-runtime first-activation dark view.
- Replaced fixed-delay logic with a bounded pending-state retry tied to newly created viewport bodies and scene bodies.
- Failed colour generation keeps normal material rather than applying invalid vertex colours; retries stop as soon as colour generation succeeds.
- No modelling/topology or OBJ semantics changed.

## 2026-09-26 — v0.36.18.457 Facegroups first-activation recovery

- Restored the historical fix for the dark first Facegroups activation.
- Facegroup material is now assigned only when colour generation succeeds.
- Failed first pass falls back to the normal front material instead of a dark invalid vertex-colour state.
- Entering Facegroups normalises settings, rebuilds the viewport, waits for two animation frames, then reapplies colours.
- No topology, OBJ data or modelling interaction changes.

## 2026-09-26 — v0.36.18.456 Facegroup data connection + split import recovery

- .455 passed hands-on, but a known facegrouped OBJ still displayed no Facegroups colours.
- Root cause: render-mode source lookup expected mesh metadata on the Three.js body, while authoritative editable mesh data lives in the active bridge mesh / object manager.
- Restored active/inactive mesh lookup without rewriting render runtime.
- Restored File > Import > **Split objects by groups** checkbox, OFF by default, and wired it to the already recovered OBJ parser.
- No Mirror/SubD facegroup propagation or modelling topology changes in this build.

## 2026-09-26 — v0.36.18.455 Facegroup colour controls recovery

- v0.36.18.454 additive Facegroups viewport integration passed hands-on testing.
- Reintroduced the original visual-only Facegroup palette controls in isolation: Default/Soft/Vivid/Contrast, saturation, lightness, ungrouped colour, reseed and reset.
- Settings persist in localStorage and do not change facegroup IDs, topology or OBJ data.
- Kept the .453/.454 render and modelling paths intact; no SubD/Mirror evaluation machinery added.
- Regression boundary remains: .452 rejected because its render integration replaced proven runtime code and failed to load.

## 2026-09-25 — replay v0.36.18.442 from Beta 4 audit lane

- Reapplied the original Mesh Health boundary diagnostics build exactly.
- Historical source commit: `cd3bc0ad6b5da3298b1b3e9d408e49c03c2f4a71`.
- No .443+ changes included.
- Inset was hands-on confirmed working on .441 before this replay.
- Awaiting hands-on Inset and boundary diagnostics selection handoff result on .442.

## 2026-09-25 — replay v0.36.18.441 from Beta 4 audit lane

- Reapplied the original Mesh Health Auto Close / Make Watertight build exactly.
- Historical source commit: `d4e964e3741d7e53ac0176c1a811b05ea3edb727`.
- No .442+ changes included.
- Inset was hands-on confirmed working on .440 before this replay.
- Awaiting hands-on Inset and Auto Close result on .441.

## 2026-09-25 — replay v0.36.18.440 from Beta 4 audit lane

- Reapplied the original Mesh Health Safe Repair build exactly.
- Historical source commit: `73e6958874de73d8e553f0bb2ad73cd31c503004`.
- No .441+ changes included.
- Inset was hands-on confirmed working on .439 before this replay.
- Awaiting hands-on Inset and Safe Repair result on .440.

## 2026-09-25 — replay v0.36.18.439 from Beta 4 audit lane

- Reapplied the original Mesh Health / Inspect foundation exactly.
- Historical source commit: `60187e2f17c444c319c6862a80e3a107588dc9cb`.
- No .440+ changes included.
- Inset was hands-on confirmed working on .438 before this replay.
- Awaiting hands-on Inset and Mesh Health inspection result on .439.

## 2026-09-25 — replay v0.36.18.438 from Beta 4 audit lane

- Reapplied the original linked-instance Insert Tool exactly.
- Historical source commit: `3483edd3b8809b38fca738ed8e6f3085bb2e26f6`.
- No .439+ changes included.
- Inset was hands-on confirmed working on .437 before this replay.
- Awaiting hands-on Inset and Insert Tool result on .438.

## 2026-09-25 — replay v0.36.18.437 from Beta 4 audit lane

- Reapplied the original face-to-face Surface Transform anchoring build exactly.
- Historical source commit: `5a6ef4338c2997b5e65dbf59f77bc129d7e152cd`.
- No .438+ changes included.
- Inset was hands-on confirmed working on .436 before this replay.
- Awaiting hands-on Inset and face-to-face Transform result on .437.

## 2026-09-25 — replay v0.36.18.436 from Beta 4 audit lane

- Reapplied the original Surface Transform Tool foundation exactly.
- Historical source commit: `db817eb623ebc52ff2d7b6e344f2911873ead8d6`.
- No .437+ changes included.
- Inset was hands-on confirmed working on .435 before this replay.
- Awaiting hands-on Inset and Surface Transform result on .436.

## 2026-09-25 — replay v0.36.18.435 from Beta 4 audit lane

- Reapplied the original Symmetry Align to Face + Flip Plane build exactly.
- Historical source commit: `6bf2b5a5308d639c0e03f7cd2862695d10624591`.
- No .436+ changes included.
- Inset was hands-on confirmed working on .434 before this replay.
- Awaiting hands-on Inset and Align to Face / Flip Plane result on .435.

## 2026-09-25 — replay v0.36.18.434 from Beta 4 audit lane

- Reapplied the original Symmetry plane transform ownership + arbitrary rotation build exactly.
- Historical source commit: `6cb0a5aca9d2d69dbed23511ef617d381a1871c6`.
- No .435+ changes included.
- Inset was hands-on confirmed working on .433 before this replay.
- Awaiting hands-on Inset and Symmetry Rotate ownership result on .434.

## 2026-09-25 — replay v0.36.18.433 from Beta 4 audit lane

- Reapplied the original movable/snappable Symmetry/Bisect plane exactly.
- Historical source commit: `ff9be6110c7e34b79fac08e82589b3bd40b66237`.
- No .434+ changes included.
- Inset was hands-on confirmed working on .432 before this replay.
- Awaiting hands-on Inset and movable/snappable plane result on .433.

## 2026-09-25 — replay v0.36.18.432 from Beta 4 audit lane

- Reapplied the original Face Delete orphan-compaction fix exactly.
- Historical source commit: `31e2c4d0c727f1910543d10d723a4fcedda72e77`.
- No .433+ changes included.
- Inset was hands-on confirmed working on .431 before this replay.
- Awaiting hands-on Inset result on .432.

## 2026-09-25 — replay v0.36.18.431 from Beta 4 audit lane

- Reapplied the original Mirror-seam-aware Solidify fix exactly.
- Historical source commit: `b3b63b00c505827f74a00175e2d18770a1aeeb55`.
- No .432+ changes included.
- Inset was hands-on confirmed working on .430 before this replay.
- Awaiting hands-on Inset result on .431.

## 2026-09-25 — replay v0.36.18.430 from Beta 4 audit lane

- Reapplied the original Mirror-preserving Solidify fix exactly.
- Historical source commit: `4a393fa0021d196c9921cf978fd029f109035ce9`.
- No .431+ changes included.
- Inset was hands-on confirmed working on .429 before this replay.
- Awaiting hands-on Inset result on .430.

## 2026-09-25 — replay v0.36.18.429 from Beta 4 audit lane

- Reapplied the original mirrored-object Solidify fix exactly.
- Historical source commit: `70831c5a24d975417c81adb16d6e56a76d4191cc`.
- No .430+ changes included.
- Inset was hands-on confirmed working on .428 before this replay.
- Awaiting hands-on Inset result on .429.

## 2026-09-25 — replay v0.36.18.428 from Beta 4 audit lane

- Reapplied the original .428 Symmetry / Bisect foundation exactly.
- Historical source commit: `72a30c2f5799d048235684e326da8fdf3a71fa2c`.
- No .429+ changes included.
- Inset was hands-on confirmed working immediately before this replay on .427.
- Awaiting hands-on Inset result on .428 before continuing.

## 2026-09-25 — Beta 4 forward replay audit begins

- Reset active runtime/tests exactly to frozen v0.36.18.427 for hands-on Inset verification.
- This is a forensic replay lane: .428 through .449 will be reapplied in original order, one numbered build at a time.
- Inset is the sentinel regression check after every replay step.
- No post-Beta-4 feature is being discarded; original commits remain the source for replay, including Mesh Health and later export/facegroup work.
- Frozen /beta-4/ remains unchanged.

## 2026-09-25 — deliberate recovery to v0.36.18.449 baseline

- User chose to stop patching the interaction regressions introduced after the large v0.36.18.450 UI/UX consolidation.
- Restored every runtime and regression-test file to the exact v0.36.18.449 main snapshot at `4d700dc26e8a23a65a4fba27bcca259062c5be07`.
- Preserved current handoff/history/roadmap/checklist documents so the .450–.465 investigation remains available.
- Removed post-.449 runtime wrappers and post-.449 recovery-only tests from the active baseline.
- Git history remains forward-moving; no force-reset of main.
- Released via PR **#154**; squash merge `83fd257442d21d7db64385c0084d1cb314fae017`.
- Recovery Topology regression **36112631181 PASS**.
- Future UI cleanup must be reintroduced as small, independently hands-on-tested slices from this baseline.

## 2026-09-25 — v0.36.18.465 live Inset Face Region API repair

- Hands-on .464: Extrude and Extrude Through pass; Inset fails.
- Found the remaining ES-module split: live Uniform Inset methods existed, but their Face Region dependencies did not exist on the live `mesh.js?v=0.12` class.
- Copied `faceRegionInfo`, `faceRegionNormal`, and `faceRegionsInfo` onto the live EditableMesh prototype before installing Uniform Inset methods.
- Avoided rerunning the full Face Region installer to prevent duplicate legacy UI/event handlers.
- No changes to Extrude, Through, Through kernel, Bevel, or protected multi-object transform code.
- Released via PR **#153**; squash merge `d7b32672f1757dfbef80f5eb5f364ed1dcfc41ea`.
- Final Topology regression run **36105980083 PASS**.


## 2026-09-25 — v0.36.18.464 public version + explicit Through runtime

- Production shell and `version.json` now genuinely advance from .461 to .464.
- Live runtime cache keys were aligned so Safari/GitHub Pages does not mix .461/.463/.464 modules.
- Inward Extrude/Through takeover is now an explicit main runtime module as well as remaining available from the Drawer dynamic import.
- Protected `through-kernel.js?v=0.36.18.242`, `multi-face-direct.js?v=0.36.18.242`, and `multi-object-transform.js?v=0.36.1.0` remain unchanged.
- Released via PR **#152**; squash merge `f7a092b82addc517a53ec1990324fdb0b66a00e3`.
- Final Topology regression run **36094996497 PASS**.


## 2026-09-25 — v0.36.18.464 public version sync + explicit Through runtime

- User reported only v0.36.18.461 was visibly loading, despite later hotfix merges.
- User also confirmed ordinary Extrude worked but Extrude Through did not.
- Advanced the actual public shell and version manifest to v0.36.18.464.
- Standardised current live runtime cache keys to .464 while retaining protected historical pins.
- Loaded `sequential-through-fallback.js` explicitly in the main runtime, with its dynamic drawer import aligned to the same URL.
- Protected `through-kernel.js?v=0.36.18.242` and `multi-face-direct.js?v=0.36.18.242` remain unchanged.
- Final Topology regression **36094996497 PASS**.
- PR **#152**, squash merge `f7a092b82addc517a53ec1990324fdb0b66a00e3`.


## 2026-09-25 — v0.36.18.463 live Uniform Inset prototype repair

- Extrude confirmed working again; Inset remained inert.
- Found ES-module identity mismatch: `uniform-inset.js` patched `./mesh.js`, but live BoxLab uses `./mesh.js?v=0.12`.
- Installed all Uniform Inset methods on the live versioned EditableMesh prototype too.
- Loaded the repaired Uniform Inset module before the proven Face direct controller.
- No changes to Extrude, Through, pointer ownership, Bevel, or protected transform code.
- Released via PR **#151**; squash merge `d8af8ac6c140c15ea83122baa16164d1905b0c88`.
- Final PR Topology regression run **36086343100 PASS**.


## 2026-09-25 — v0.36.18.462 restore proven Face direct path

- User confirmed .461 broke Extrude as well as Inset.
- Restored the proven `multi-face-direct.js?v=0.36.18.242` controller.
- Removed the .461 Face self-pick experiment.
- Allowed normal Face paint selection while Extrude/Inset are armed so selection can occur first, then the proven controller owns the drag.
- Legacy Move remains blocked under Face direct tools.
- No Through topology rewrite and no Bevel changes in this build.
- Released as a targeted v0.36.18.461 hotfix via PR **#150**; squash merge `5408b084e4f0fd5e953ab8483e7cce29fd1068b4`.
- Final PR Topology regression run **36073060381 PASS**.


## 2026-09-25 — v0.36.18.461 direct tools own pick + drag

- .460 proved legacy Move was no longer stealing the gesture, but Inset and Bevel still received no modelling drag.
- Corrected the architecture: the armed tool itself now owns component hit-test plus modelling drag.
- Face direct tools can acquire an unselected face and begin Inset/Extrude on the same Pencil press.
- Component paint yields to armed Face direct tools and Edge Bevel.
- Removed the .460 coordination shim from the live runtime.
- No Through solver or Bevel topology rewrite.
- Released via PR **#149**; squash merge `a3c1fa4200da58dd01a1f54b337ae32053a3e341`.
- Final PR Topology regression run **36068948326 PASS**.


## 2026-09-25 — v0.36.18.460 direct-tool ownership repair

- Inset: arming the tool could leave hidden component selection unavailable, while legacy `main.js` Move remained a fallback owner.
- Edge Bevel: additive hidden Multi could hand the mature controller an invalid stale edge set.
- Preserved the mature Face and Bevel controllers unchanged.
- Added a small ownership coordinator and made legacy component drag yield to mature direct tools.
- No topology, Through, navigation or UI layout changes.
- Released via PR **#148**; squash merge `d66425309248f220968cf11d86a0d6d8bc7ee9e0`.
- Final PR Topology regression run **36067498993 PASS**.


## 2026-09-25 — v0.36.18.459 armed-tool component selection

- Navigation and ordinary selection remained good, but arming Inset prevented a face from being highlighted.
- Found the regression in .457: `edge-paint-select.js` returned early whenever a direct tool was active.
- Restored .449-style component selection while tools are armed, while keeping touch reserved for viewport navigation.
- Removed the experimental .458 persistent Face handoff loader.
- No topology or UI layout changes.
- Released via PR **#147**; squash merge `6ca71fc6142060498a46e73acac0b9b7d7a9a044`.
- Final PR Topology regression run **36065555151 PASS**.


## 2026-09-25 — v0.36.18.458 armed Face selection handoff

- User confirmed orbit/pan/zoom and ordinary selection work; Inset fails because a face cannot be highlighted after arming the tool.
- Found `persistent-face-tool-select.js` present but omitted from the live loader.
- Restored it immediately before `multi-face-direct.js`, re-enabling tool-first face selection for Extrude/Inset.
- No UI, topology or navigation changes.


## 2026-09-24 — v0.36.18.457 viewport pointer ownership repair

- User confirmed the UI itself is good but all viewport interaction is dead.
- Identified shared component Multi paint selection as capable of capturing the first touch pointer before OrbitControls/direct tools.
- Reserved finger touch for viewport navigation and made component paint yield to armed direct tools.
- Kept current UI/UX intact.
- Hid Edge Lathe/Revolve settings until Revolve is actually armed; compact Revolve launcher remains visible.
- No topology changes.
- Released via PR **#145**; squash merge `b4ce2101bc749193a4f03934889efbf8500ceb5f`.
- Final PR Topology regression run **35998556661 PASS**.


## 2026-09-24 — v0.36.18.456 UI-preserved tool runtime repair

- User clarified the redesigned UI is correct; only the modelling tools underneath it regressed.
- Abandoned the proposed UI rollback before merge.
- Preserved the complete .455 presentation layer.
- Restored pre-reorder transform and component-selection ownership runtimes.
- Restored transactional Boolean pre-scene snapshot for one-step Undo.
- No modelling topology or UI layout changes.
- Released via PR **#144**; squash merge `6e93491e841991631fc09b79cf0c9f7d53faa9e7`.
- Final PR Topology regression run **35996984651 PASS**.


## 2026-09-24 — v0.36.18.455 Object Multi + Boolean presentation recovery

- User clarified Boolean itself works; the broken part is the operand-selection and Active Tools presentation.
- Preserved the .454 interaction-ownership recovery.
- Restored the established compact five-button Object Selection toolbar.
- Restored only the narrow Boolean launcher/close presentation wrapper.
- Broad .451 component presentation wrapper remains disabled.
- No modelling algorithm changes.
- Released via PR **#143**; squash merge `3ec6d638b08a437480d9be9efb232f4f3783b596`.
- Final PR Topology regression run **35995205443 PASS**.


## 2026-09-24 — v0.36.18.454 iPad interaction ownership recovery

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


## 2026-09-24 — v0.36.18.453 Proven-runtime recovery

- User hands-on test reported that .452 still left the affected modelling tools unusable.
- Abandoned the .450–.452 presentation-wrapper/ownership repair direction as the active runtime.
- Restored transform and Edge Revolve interaction runtimes from the last hands-on-good .449 state; retained the hands-on-passed .452 Revolve Profile controller.
- Removed the Boolean Tool Session and .451 presentation wrappers from the live loader.
- Retained the .452 Boolean transactional one-step scene snapshot fix in the core Boolean module.
- Kept mature Through topology and protected multi-object transform untouched.
- Added regression checks that the failed wrappers are not loaded and protected runtime pins remain intact.
- Beta 5 remains deferred until hands-on recovery passes.
- Released via PR **#140**; squash merge `69a4a8b8ab13bb03f8d93d93ee798106f0b6ed18`.
- Final PR Topology regression run **35991654724 PASS**.


## 2026-09-24 — v0.36.18.452 Tool ownership / Boolean Undo recovery

- User retest of .451: Inset failed; Through passed; Edge Bevel failed; Vertex Bevel failed; Boolean one-step Undo failed; Revolve Profile passed; Edge Revolve failed.
- Traced the common modelling failure to transform gesture ownership surviving while direct component tools were armed.
- Fixed this in the transform layer rather than modifying proven Face/Bevel topology controllers.
- Edge Revolve now has a real arm API instead of launcher -> hidden-button click indirection.
- Boolean now captures the complete pre-operation scene and checkpoints that snapshot once after successful result creation.
- No Through topology changes; the strong cavity-aware baseline remains protected.
- Beta 5 remains deferred pending hands-on confirmation.
- Released via PR **#139**; squash merge `4e2733d1ac38974265a4da9524239429481b90ea`.
- Final PR Topology regression run **35988721656 PASS**.

## 2026-09-24 — v0.36.18.451 Cross-mode UI regression recovery

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

## 2026-09-24 — v0.36.18.450 Tool-first UI/UX consolidation

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

## 2026-09-24 — v0.36.18.449 Scrollable Viewport menu

- User confirmed .448 works and reported the expanded Viewport menu now extends beyond the iPad screen and cannot scroll.
- Added viewport-relative max height, vertical overflow scrolling, contained overscroll and iPad inertial scrolling.
- Kept the Viewport menu position/width and existing controls unchanged.
- No modelling or facegroup data behavior changed.
- Released via PR **#136**; squash merge `df6f10db0df4fb6b8bdcc9af4367db9bf9c9827c`.
- Final PR Topology regression run **35974096070 PASS**.

## 2026-09-24 — v0.36.18.448 Facegroups first-activation fix

- User reported that first selecting Viewport > Facegroups showed an almost-black mesh until Default/Soft/Vivid/Contrast was pressed.
- Fixed render lifecycle so Facegroups rebuilds then reapplies after viewport/evaluated mesh synchronisation.
- Vertex-colour facegroup material is no longer assigned when colour application fails.
- Failure falls back to normal material rather than a dark invalid state.
- No topology, facegroup IDs, OBJ handoff data, or protected modelling/navigation runtimes changed.
- Released via PR **#135**; squash merge `7c8eb0c1c36fe0bc8a69397390771043c0aefe20`.
- Final PR Topology regression run **35970042762 PASS**.

## 2026-09-24 — v0.36.18.447 Facegroup colour controls

- User hands-on passed .446 Facegroups Render Look and requested direct colour controls before the broader UI/UX cleanup.
- Added contextual Facegroup Colours controls inside Viewport settings.
- Added Default / Soft / Vivid / High Contrast palettes, Saturation, Lightness, Ungrouped colour, Reseed and Reset.
- View settings persist in local storage and remain purely visual.
- Controls remain hidden unless Facegroups is the active Render Look.
- No facegroup IDs, mesh topology, or OBJ handoff data are changed.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#134**; squash merge `cfd8e9e64f84e8a3f5b19dfb0dd5de3f421a0bf3`.
- Final PR Topology regression run **35955642406 PASS**.

## 2026-09-24 — v0.36.18.446 Viewport Facegroup Colours

- User hands-on passed .445 facegroup import/export and requested facegroup colours in Viewport settings.
- Added Facegroups to the existing Viewport Render Look menu.
- Stable deterministic colours are derived from facegroup names; ungrouped faces remain neutral grey.
- Display uses the evaluated active/inactive meshes so Mirror/SubD inherited groups remain visible.
- Facegroup view is non-destructive and does not alter export metadata.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#133**; squash merge `fcd19de9f38bfca2d65a1de643387a64e03ab318`.
- Final PR Topology regression run **35950814715 PASS**.

## 2026-09-24 — v0.36.18.445 OBJ facegroup preservation foundation

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

## 2026-09-24 — v0.36.18.444 OBJ export polish / topology preflight

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

## 2026-09-24 — v0.36.18.443 Mesh Health normals / triangulation controls

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

## 2026-09-24 — v0.36.18.442 Mesh Health boundary diagnostics

- Advanced from .441 Auto Close into the next Phase E roadmap item: stronger boundary diagnostics.
- Added connected-component analysis for boundary edges with loop / chain / branched classification.
- Mesh Health now reports boundary group counts alongside existing edge totals.
- Added Select Boundary and Select Non-Manifold diagnostic handoffs.
- Diagnostic handoff exits Mesh Health into standard Edge mode with the relevant edges selected so existing Fill / Bridge / Move / Delete / repair tools remain authoritative.
- No geometry or Object history mutation occurs during diagnostic selection.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#129**; squash merge `cd3bc0ad6b5da3298b1b3e9d408e49c03c2f4a71`.
- Final PR Topology regression run **35929633430 PASS**.

## 2026-09-24 — v0.36.18.441 Mesh Health Auto Close / Make Watertight foundation

- Advanced from .440 Safe Repair into the next Phase E roadmap item: Auto Close / Make Watertight.
- Audited existing Boundary + Fill first and reused their simple-loop detection/orientation principles rather than adding a parallel cap convention.
- Auto Close is available only for otherwise-clean open meshes.
- Entire boundary graph must resolve to simple closed loops with degree 2 at every boundary vertex.
- One or multiple disjoint holes are capped together, each oriented opposite its neighbouring surface along the shared boundary.
- Branched/open boundary graphs and meshes with pre-existing topology issues are refused.
- Candidate must re-audit as Closed · Clean with zero boundary/non-manifold/winding issues before commit.
- Successful close is one Object Undo step and Mesh Health refreshes immediately.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#128**; squash merge `d4e964e3741d7e53ac0176c1a811b05ea3edb727`.
- Final PR Topology regression run **35928602689 PASS**.

## 2026-09-23 — v0.36.18.440 Mesh Health Safe Repair

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

## 2026-09-23 — v0.36.18.439 Mesh Health / Inspect foundation

- User hands-on passed .438 Insert Tool and advanced with /nextbuild.
- Phase D Transform/Insert slice is now considered functionally established, so development moves into Phase E Import / Repair / Handoff.
- Added non-destructive Object-mode Mesh Health Tool Session.
- Audit reports mesh counts and polygon mix, boundary/non-manifold edges, invalid or degenerate faces, zero-area faces, duplicate faces, inconsistent winding, orphan vertices, and intentional loose topology.
- Open-but-valid meshes are reported as **Open · Clean**, not incorrectly treated as failures.
- Closed valid meshes report **Closed · Clean**; structural problems report **Issues Found**.
- Reuses the existing topology seam-conformance summary as the base topology definition.
- No geometry/history mutation is performed by Inspect.
- Frozen Beta 4 remains v0.36.18.427; protected multi-object transform remains untouched.
- Released via PR **#126**; squash merge `60187e2f17c444c319c6862a80e3a107588dc9cb`.
- Final PR Topology regression run **35854298290 PASS**.

## 2026-09-23 — v0.36.18.438 linked-instance Insert Tool foundation

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


## 2026-09-23 — v0.36.18.437 Surface Transform face-to-face anchoring

- First hands-on test of .436 was a strong interaction PASS, but user identified that centre-of-mass anchoring caused the placed object to intersect the target surface.
- Transform workflow now picks two faces: first a source face on the selected object, then a target face on another visible object.
- Source face centre becomes the placement anchor.
- Source face normal is rotated to oppose the target face normal, so the two faces meet rather than the object centre being embedded in the target.
- Existing Nomad-style Move → Rotate → Scale → Move tap-cycle remains unchanged after placement.
- Surface transform core generalized with sourceAnchor/sourceNormal and oppose mode for reuse by the future Insert Tool.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#124**; squash merge `5a6ef4338c2997b5e65dbf59f77bc129d7e152cd`.
- Final PR Topology regression run **35841565536 PASS**.


## 2026-09-23 — v0.36.18.436 Surface Transform Tool foundation

- After .435 Align to Face hands-on PASS, product direction expanded from separate Align commands toward a Nomad-inspired surface-relative Transform / Insert interaction model.
- Added Object-mode Transform Tool Session for one editable object.
- First target-face tap on another visible object places the selected object centre at the hit point and aligns source +Y to the target face normal.
- Persistent surface frame drives three states: Move slides across the target plane, Rotate spins around the target normal, Scale grows/shrinks around the placement point.
- Pencil/mouse tap cycles Move → Rotate → Scale → Move; touch remains ordinary iPad navigation.
- Existing 15° rotation snap is reused.
- Tool is transactional: full Object scene captured before launch, Cancel restores it, Apply records that captured scene as one Object Undo step.
- Placement math extracted to `surface-transform-core.js` so the future Insert Tool can reuse exactly the same controller instead of duplicating interaction logic.
- Existing linked-instance Object-mode save path can derive independent `instanceMatrix` placement from the transformed live mesh while retaining shared geometry.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#123**; squash merge `db817eb623ebc52ff2d7b6e344f2911873ead8d6`.
- Final PR Topology regression run **35839401940 PASS**.


## 2026-09-23 — v0.36.18.435 Symmetry Align to Face + Flip Plane

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


## 2026-09-23 — v0.36.18.434 Symmetry plane transform ownership + arbitrary rotation

- User found that pressing Rotate during an active Symmetry / Bisect session rotated the source cube instead of the yellow construction plane.
- Root cause: .433 owned direct plane dragging but the shared transform engine still owned Object-mode Move/Rotate/Scale.
- Symmetry now has explicit transform ownership while its Tool Session is active; the shared Object transform engine yields completely.
- Move/direct drag targets the symmetry plane; Rotate targets the plane normal; Scale is disabled because an infinite cut plane has no meaningful scale.
- X/Y/Z remain quick orientation presets. After free rotation the plane is marked Custom.
- Rotate respects the existing world-axis transform constraints and the existing 15° rotation snap toggle.
- Bisect core generalized from axis+offset to arbitrary plane point+normal while keeping legacy X/Y/Z+offset calls working.
- Mirrored symmetry across an arbitrary plane reflects geometry directly across that plane and reuses seam vertices to weld the cut boundary.
- Touch remains ordinary iPad navigation; Pencil/mouse owns plane transform gestures.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#121**; squash merge `6cb0a5aca9d2d69dbed23511ef617d381a1871c6`.
- Final PR Topology regression run **35818444568 PASS**.


## 2026-09-23 — v0.36.18.433 movable / snappable Symmetry plane

- Continued the .428 Symmetry / Bisect foundation after the .432 Face Delete regression fix and handoff cleanup.
- Bisect core now accepts a non-zero X/Y/Z plane offset rather than being locked to object-local origin.
- Mirrored results translate the clipped mesh to a temporary origin, reuse the proven Mirror engine for welding, then translate back so the seam weld occurs on the moved plane.
- Symmetry Tool Session adds Move Plane, Reset Origin and live offset readback.
- Pencil/mouse drag on the yellow plane moves it along its normal; touch is deliberately ignored so ordinary iPad navigation stays intact.
- Geometry Snap can move the plane to active/visible Vertex, Edge, Midpoint and Face hit positions.
- X/Y/Z, Keep + / Keep − and optional Mirror remain live during plane movement.
- Face-normal orientation is intentionally deferred to the next refinement rather than broadening this first interaction build.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#120**; squash merge `ff9be6110c7e34b79fac08e82589b3bd40b66237`.
- Final PR Topology regression run **35812426602 PASS**.


## 2026-09-23 — handoff cleanup after v0.36.18.432

- Reworked `AI_HANDOFF.md` back into a true current-state document before the next major handoff.
- Removed stale audit lines that still described .394-era main as current while preserving chronology in this file.
- New handoff snapshot now records live v0.36.18.432, Beta 4 frozen at .427, current PR/CI, protected files/pins, mature Phase D systems, recent architecture lessons, and next intended build .433 movable/snappable Symmetry / Bisect plane.
- Added a compact copy/paste handoff prompt for the next chat.
- Documentation-only cleanup; no runtime version bump.


## 2026-09-23 — v0.36.18.432 Face Delete orphan compaction

- User isolated the apparent mirrored-Solidify failure to a simpler reproduction: cube with three adjacent faces deleted would not Solidify, while an extracted/duplicated equivalent mesh would.
- Root cause: Face Delete removed face records but left vertices no longer referenced by any face. Solidify then encountered those zero-incidence vertices and failed offset solving with `zero-vertex-normal`.
- Added `EditableMesh.compactUnusedVertices()` to remove accidental orphan vertices, remap faces/creases, and preserve explicitly loose vertices/edges.
- Face Delete now runs this compaction once after a multi-face delete transaction.
- Added regression for cube → delete three adjacent faces → compact one orphan vertex → Solidify succeeds.
- Existing intentional loose geometry is regression-protected through the compaction pass.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#118**; squash merge `31e2c4d0c727f1910543d10d723a4fcedda72e77`.
- Final PR Topology regression run **35810612232 PASS**.


## 2026-09-23 — v0.36.18.431 Mirror-seam-aware Solidify

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


## 2026-09-22 — v0.36.18.430 Solidify preserves Mirror modifier

- Hands-on testing showed the .429 bake-on-apply approach still failed on the user's mirrored object, while Shell worked correctly.
- Comparing Shell and Solidify confirmed the better BoxLab modifier model: destructive tools should edit the authoritative base mesh and leave non-destructive Mirror active.
- Solidify preflight/apply now operate on the base editable mesh again.
- Solidify preview mirrors only the newly-created preview shell so the translucent preview matches the currently displayed mirrored object.
- Apply no longer bakes or clears Mirror; the Mirror modifier remains ON after Solidify.
- This matches Shell's proven modifier-preserving behavior and avoids double/overlapping evaluated topology during Solidify preflight.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#116**; squash merge `4a393fa0021d196c9921cf978fd029f109035ce9`.
- Final PR Topology regression run **35724663296 PASS**.


## 2026-09-22 — v0.36.18.429 Solidify mirrored-object fix

- Hands-on testing after .428 exposed that Solidify could not operate on an object with the existing non-destructive Mirror modifier enabled.
- Root cause: Solidify preflight/preview/apply read the editable base mesh while the viewport displayed applyMirror(base, mirrorAxes).
- Solidify now evaluates the active Mirror modifier before preflight, preview and Apply.
- Apply bakes the evaluated mirrored geometry into the editable mesh, then clears the old Mirror modifier so the result is not mirrored twice.
- The baked mirrored Solidify result remains one Object-history step.
- Added a regression fixture using a half-sheet mirrored across X and confirmed the evaluated mesh solidifies to closed topology.
- Frozen Beta 4 remains v0.36.18.427.
- Released via PR **#115**; squash merge `70831c5a24d975417c81adb16d6e56a76d4191cc`.
- Final PR Topology regression run **35723194132 PASS**.


## 2026-09-22 — v0.36.18.428 Symmetry / Bisect foundation

- Development resumed after the Beta 4 freeze with the next Phase D construction tool.
- Audited existing Mirror first: it remains the authoritative non-destructive origin-based mirror modifier and is not replaced.
- Added destructive Object-mode Symmetry / Bisect as a separate Tool Session.
- Foundation uses the object local origin plane on X, Y or Z.
- Keep + / Keep − clips polygon faces against the selected plane using shared edge-intersection vertices.
- Mirror kept half optionally reflects the clipped result through the existing applyMirror path, welding coincident centre-plane vertices.
- Bisect-only leaves the cut boundary open by design; Mirror produces the symmetric welded shell/surface result.
- Session provides live translucent result preview plus visible symmetry plane, Cancel and Apply.
- Apply is one Object-history step and commits back into the active editable mesh.
- Existing non-destructive Mirror must be turned off before launching to avoid double-mirror ambiguity.
- Frozen Beta 4 remains exactly v0.36.18.427 and is regression-protected.
- Released via PR **#114**; squash merge `72a30c2f5799d048235684e326da8fdf3a71fa2c`.
- Final PR Topology regression run **35721391817 PASS**.


## 2026-09-22 — Beta 4 freeze at v0.36.18.427

- User requested a Beta 4 release after hands-on approval of the Edge Extrude workflow through .427.
- Frozen source main commit: `ec45b3ba208ef3ffa40015d7a3b62666c63f379e`.
- Snapshot includes the current app shell, src, tests, docs and release assets under `/beta-4/`.
- Fixed Pages URL: https://crisbezz.github.io/BoxLab/beta-4/
- Beta 4 captures post-Beta-3 Phase D work including Sweep, Array/Solidify/Shell/Revolve Tool Sessions and Edge Extrude ribbon/axis/plane/selection-handoff workflows.
- `/beta-4/` is now intended to be immutable during normal development.
- Beta 4 freeze PR **#113** merged as `2743d9d0e10f8fb9605e1e37ab92f0c53c636837`.
- The snapshot reuses the exact v0.36.18.427 blobs/tree; frozen source regression run **35713131703 PASS**.


## 2026-09-22 — v0.36.18.427 Edge Extrude selection handoff

- Hands-on .426 exposed a workflow break: after an extrusion, the new outer edge stayed selected but could not be deselected by tapping while Edge Extrude owned the viewport.
- Edge Extrude now owns tap-selection semantics while armed instead of treating every no-drag pointer gesture as a cancelled extrusion.
- Tap a selected edge to deselect it; tap a different valid boundary edge to switch selection to it; drag a different valid boundary edge to switch and extrude in the same gesture.
- Extrude and the current Plane/X/Y/Z/Auto constraint remain armed even when the selection becomes temporarily empty.
- This removes the previous Deselect → select edge → Move → Extrude → Plane re-entry loop.
- Ribbon topology, Plane math and one-pull-per-Undo are unchanged.
- Released via PR **#112**; squash merge `387e7d00470e4aa300f0212ceddf9446cdd66fb9`.
- Final PR Topology regression run **35713131703 PASS**.


## 2026-09-22 — v0.36.18.426 Edge Extrude Plane constraint

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


## 2026-09-22 — v0.36.18.425 Edge Extrude directional constraints

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


## 2026-09-22 — v0.36.18.424 Edge Extrude arming hotfix

- First hands-on .423 test showed a valid selected boundary edge with Edge Extrude incorrectly disabled.
- Root cause was UI validation calling boundarySelectionInfo(mesh()) without passing the live selected edge IDs.
- Both button enable/disable sync and the click-to-arm gate now call boundarySelectionInfo(mesh(), selectedEdges()).
- Edge Extrude topology and ribbon generation are unchanged from .423.
- Released via PR **#109**; squash merge `9be062ec965ca8c21e5ea00d1ba784865598e1d6`.
- Final PR Topology regression run **35705932023 PASS**.


## 2026-09-22 — v0.36.18.423 direct Edge Extrude ribbons

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


## 2026-09-22 — v0.36.18.422 Revolve Profile Tool Session

- User hands-on passed v0.36.18.421 Solidify/Shell Tool Sessions and advanced with /nextbuild.
- Revolve Profile now uses the shared exclusive Tool Session instead of its private Active Tools drawer-lock implementation.
- New Revolve Profile construction still starts as a normal Object-mode positioning plane; it does not immediately steal the drawer.
- A compact Revolve Profile launcher is available while the construction plane is active.
- Moving/snapping the plane or entering profile editing automatically claims the Revolve Profile Tool Session.
- Session contains Edit Profile, Undo Point, Delete Point, Clear, Segments 3–64 and Apply Revolve.
- Existing Pencil/mouse profile authoring, touch navigation, segment slider ownership, winding/normals, snapping and Apply geometry are unchanged.
- Apply ends the Tool Session and retains the established single-object selection / Boolean tint cleanup.
- Initial PR regressions were stale tests for the retired private drawer-lock contract and old current-build cache pins; tests were updated to protect the shared Tool Session contract instead.
- Released via PR **#107**; squash merge `478f2a8613873c0c3533a3ce82bb7227925e8230`.
- Final PR Topology regression run **35696735145 PASS**.


## 2026-09-22 — v0.36.18.421 Solidify / Shell Tool Sessions

- User hands-on passed v0.36.18.420 Vertex transform ownership and advanced to the next roadmap task.
- Audited Solidify and Shell before migration; they remain separate modelling operations:
  - Solidify: Object-mode open sheet → closed solid.
  - Shell: Face-mode closed solid + selected opening faces → hollow solid.
- Both tools now use the shared exclusive Tool Session UI after launch.
- Idle Object/Face Active Tools remain compact; session controls contain live Thickness plus Cancel / Apply.
- Solidify direct viewport thickness dragging is preserved.
- Shell Apple Pencil thickness-slider ownership / late Safari range guard is preserved.
- Geometry algorithms, object history, selection semantics and protected multi-object transform are unchanged.
- Initial PR regression run `35695668683` failed only because older tests still asserted the retired pre-Tool-Session drawer/button implementation; tests were updated to the new shared-session contract.
- Released via PR **#106**; squash merge `f7ac0b986b01c5441be888d69bfeda88c92299d2`.
- Final PR Topology regression run **35695761384 PASS**.


## 2026-09-22 — v0.36.18.420 Vertex transform ownership

- Hands-on after .419 showed Vertex selection and Bevel worked, while Vertex Move/Scale/Rotate did not; Edge and Face transforms remained good.
- Root cause was Vertex Pick Assist owning viewport pointerdown at document-capture phase and stopping propagation even when a transform was armed.
- Vertex Pick Assist now yields completely whenever Move / Scale / Rotate owns the interaction.
- Ordinary Vertex tap selection, Bevel, Add, Build Edge and other direct Vertex tools remain unchanged.
- Protected multi-object transform remains pinned at v0.36.1.0.
- Released via PR **#105**; squash merge `80677f75d32329a452ccc517ce4d52379d0fb628`.
- Final PR Topology regression run **35695257815 PASS**.


## 2026-09-22 — v0.36.18.419 Array pointer cleanup

- User hands-on passed the .418 Array drawer-ownership fix but reported that free Vertex movement no longer worked afterward.
- The narrow shared-state risk was Array END-copy pointer cleanup: Array captured the viewport pointer during endpoint drag but relied on browser implicit release.
- Array now explicitly releases viewport pointer capture when END-copy drag ends, is cancelled, or is torn down by Apply/mode/session changes.
- Existing OrbitControls restoration remains in the same teardown path.
- Free component Move code is unchanged; protected multi-object transform remains pinned at v0.36.1.0.
- Released via PR **#104**; squash merge `c2b054d418a5c3b7e9f4fdfc747b6109c6c95fcb`.
- Final PR Topology regression run **35691232067 PASS**.


## 2026-09-22 — v0.36.18.418 Tool Session drawer ownership

- User hands-on showed .417 still allowed Active Tools itself to collapse as soon as the Array END copy was touched, even though Array session/source ownership remained armed.
- Root cause was at the shared Tool Session layer: begin() opened the <details> drawer, but there was no contract preventing another interaction path from closing it later in the same live session.
- Tool Session now watches the Active Tools drawer toggle event and reopens it on the next microtask whenever a session is active.
- The guard is generic for Array, Sweep and future Solidify/Shell/Revolve migrations; normal drawer collapse remains unchanged when no Tool Session is active.
- Array endpoint drag math, linked-instance Apply, Object selection and protected multi-object transform remain unchanged.
- Released via PR **#103**; squash merge `5bbe750f4fc21fd85f0d47b7a0117be11072273f`.
- Final PR Topology regression run **35690638630 PASS**.


## 2026-09-22 — v0.36.18.417 Array session ownership during repositioning

- User reported Array Tool Session dropped back to normal Object Active Tools when selecting/repositioning the array object.
- Removed the old preview cancellation rule for temporary active-object changes while Array remains in Object mode.
- Array now restores its original preview source if selection changes during an armed preview and reasserts the `array` Tool Session if displaced.
- Endpoint preview pointer-down moved to document capture level (canvas target only) so Array can win before ordinary object selection.
- Array still exits on Apply, Cancel, or explicitly leaving Object mode.
- Released via PR **#102**; squash merge `58e65c14d04ce3f8ebc21f98b4860373007a3126`.
- Final PR Topology regression run **35689604956 PASS**.

## 2026-09-22 — v0.36.18.416 Array Tool Session migration

- Migrated existing Linear Array onto the reusable exclusive Tool Session UI introduced for Sweep.
- Replaced the permanently expanded Object-mode Array block with one compact Array launcher.
- Active Array preview now owns Active Tools and shows only Direction, Count, viewport endpoint guidance, Cancel and Apply Array.
- Cancel and Apply both end the Tool Session and restore normal Active Tools.
- Preserved endpoint-vector preview/dragging, Free/X/Y/Z constraints, linked-instance commit, one scene-history snapshot and Pencil Count handling.
- No Array geometry or linked-instance engine rewrite.
- Released via PR **#101**; squash merge `00f555ed3475c11194c131aca9599db8280a7536`.
- Final corrected PR Topology regression run **35689094456 PASS**.

## 2026-09-22 — v0.36.18.415 fresh Sweep placement and immediate Move

- Fixed fresh Add → Sweep profile plane spawning at world origin inside the default cube.
- Fresh Sweep now creates a camera-facing profile plane just in front of the current active mesh bounding sphere, toward the camera.
- Fresh Sweep automatically arms real Move on the next frame so repositioning is immediately available without reselecting the construction object.
- Selected Face/Edge Sweep placement remains unchanged and still comes directly from the selected source geometry.
- Released via PR **#100**; squash merge `69299520f61b36186d121026f8e27b807889db46`.
- Final corrected PR Topology regression run **35688505420 PASS**.

## 2026-09-22 — v0.36.18.414 Follow Edges root-cause fix

- Found the actual reason Follow Edges would not activate: `hotRailHit` and `railSnapRefs` had been lost from the module-level state declaration while the code still referenced them.
- This caused a runtime `ReferenceError` at the start of Follow Edges activation, before button state or rail overlay could update.
- Restored both variables at module scope.
- Added regression coverage to protect the rail-state declarations from disappearing again.
- No geometry, picker or Tool Session behaviour changed.
- Released via PR **#99**; squash merge `ac6c3a630757f849962cae832f0b53999d68fbc9`.
- Final PR Topology regression run **35686712355 PASS**.

## 2026-09-22 — v0.36.18.413 atomic selected-profile Follow Edges handoff

- .412 hands-on screenshot proved PATH stage activation succeeded while Follow Edges mode activation did not.
- Reworked selected-profile auto launch so profile loading and Follow Edges activation happen atomically on the same `sweepPath` metadata object.
- `applySelectionProfile({activateFollowEdges:true})` now sets `pathMode='edges'`, `editPath=true`, `sessionStage='path'`, refreshes rail refs and syncs path buttons before save/render events.
- Removed the fragile follow-up `setPathMode()` / `setSweepStage()` re-lookup from the auto launch queue.
- Manual Use Selection behaviour remains profile-only.
- Released via PR **#98**; squash merge `e30e895e82453e85d3b8ac4e97dbfb0ebdc0a82f`.
- Final corrected PR Topology regression run **35686329704 PASS**.

## 2026-09-22 — v0.36.18.412 hard Follow Edges active-state indicator

- User reported .411 still did not visibly light Follow Edges.
- Added a dedicated `aria-pressed="true"` selected-state selector with `!important` styling.
- Active Follow Edges / Draw Path buttons now change their visible label to include `· Active`.
- Candidate rail guide is fully opaque white for maximum contrast over shaded surfaces.
- No Sweep picker, geometry or Tool Session behavior changed.
- Released via PR **#97**; squash merge `01784ed914e1351da3c3d84af6bafefb576ca654`.
- Final corrected PR Topology regression run **35685824200 PASS**.

## 2026-09-22 — v0.36.18.411 Follow Edges explicit state and rail visibility

- User reported .410 Follow Edges still did not visibly light as active and internal Knife-cut rails remained invisible on shaded faces.
- Added immediate path-mode button synchronization via `syncPathModeButtons()` plus `aria-pressed` state.
- Added explicit Sweep active-button styling so Follow Edges visibly highlights when selected.
- Changed candidate rail guide to render without depth testing, preventing coplanar topology lines from disappearing into shaded faces.
- Kept .410 dedicated edge-only picker and all Sweep geometry behaviour unchanged.
- Released via PR **#96**; squash merge `57186abed6bf6daff3015b7d3d01e7601fe74062`.
- Final corrected PR Topology regression run **35684868346 PASS**.

## 2026-09-22 — v0.36.18.410 Follow Edges edge-only picker

- Fixed .409 regression where Follow Edges could fail because the generic snapper returned a Vertex near edge endpoints.
- Added dedicated edge-only rail picking for Follow Edges.
- Hot-edge preview and click selection now use the exact same edge-only picker.
- Cached rail reference meshes during active Follow Edges to avoid cloning them on every Pencil hover event.
- Draw Path retains the generic Vertex/Edge/Face snapper.
- .409 rail contrast remains unchanged.
- Released via PR **#95**; squash merge `19652f2ecff87f9de5a75fe0aaa678e132b88ee0`.
- Final corrected PR Topology regression run **35684334992 PASS**.

## 2026-09-22 — v0.36.18.409 Sweep rail contrast and hot-edge feedback

- User confirmed .408 exposed internal rail edges but requested stronger selectable-path contrast.
- Added three rail states in PATH → Follow Edges: bright candidate edge network, distinct hot edge under Pencil/cursor, and strong cyan accepted rail.
- Hot-edge detection uses the same forced external edge snap used by Follow Edges, so hover feedback matches the edge that would be selected.
- Hot state clears on mode/stage exit and Sweep Apply/exit.
- No Sweep geometry, snap logic or Tool Session structure changed.
- Released via PR **#94**; squash merge `1ee7a5ff1fe2b6105d6cb26eebcef6a8484b96b8`.
- Final corrected PR Topology regression run **35683804432 PASS**.

## 2026-09-22 — v0.36.18.408 Sweep Follow Edges rail guide

- User passed .407 and reported that internal topology edges were pickable by Follow Edges but not visible, making Knife-cut rails difficult to use.
- Added a temporary rail-edge overlay built from the same evaluated snap-reference meshes used by Follow Edges.
- The overlay includes internal mesh edges as well as boundaries, so Knife/Loop Cut topology can be followed visually.
- Rail guides appear only in PATH → Follow Edges and disappear automatically in PROFILE, Draw Path, FINISH, Apply, or Sweep exit.
- No Sweep geometry, path-selection or Tool Session behaviour changed.
- Released via PR **#93**; squash merge `e2bdaaa18b803fce0adb7d3ef4b63c8dad64b455`.
- Final PR Topology regression run **35682072137 PASS**.

## 2026-09-22 — v0.36.18.407 Sweep local face-winding unification

- User passed the .406 Tool Session UX but reported one remaining isolated Sweep backface.
- Added adjacency-based face-winding unification across all generated Sweep faces.
- Shared-edge neighbours are forced to traverse their common edge in opposite directions, repairing local reversed quads/triangles.
- Closed capped Sweeps then retain the .405 signed-volume check to orient the now-consistent shell outward globally.
- Open/uncapped Sweep surfaces receive local consistency only.
- No UI or Sweep shape/path behaviour changed.
- Released via PR **#92**; squash merge `9eaf20a927aa0c87f27e19df1ade2026b1453fad`.
- Final corrected PR Topology regression run **35680632722 PASS**.

## 2026-09-22 — v0.36.18.406 Tool Session UI foundation + Sweep UX

- Audited Sweep, Revolve, Array, Boolean, Solidify, Shell and the shared Active Tools architecture after the user reported that Sweep had become difficult to navigate.
- Confirmed the root UX issue: complex tools independently append persistent controls into the same mode-tools containers, so unrelated Object controls accumulate and bury the active workflow.
- Added reusable `tool-session-ui.js` with an exclusive Active Tools host; an active session hides normal drawer content and restores prior drawer state on exit.
- Migrated Sweep as the first Tool Session client.
- Reorganized Sweep into **PROFILE / PATH / FINISH** stages with only one stage visible at a time.
- Promoted Face/Edge contextual launch to a compact **Sweep** button near the top of the active component tools.
- Face/Edge → Sweep now auto-loads the selected profile and opens directly on PATH with Follow Edges active; Object Add → Sweep starts on PROFILE.
- Apply Sweep ends the session and restores normal Active Tools.
- Kept .405 Sweep geometry/topology behaviour unchanged; this build is UI ownership/workflow only.
- Released via PR **#91**; squash merge `84bb7c68af215560061fda034f723d42be5dce2a`.
- Final corrected PR Topology regression run **35680137829 PASS**.

## 2026-09-22 — v0.36.18.405 Sweep shell normal unification

- User confirmed .404 selected-profile anchoring was correct but the final closed Sweep shell still displayed flipped normals.
- Added signed-volume validation for closed capped Sweep shells.
- If the generated shell has negative signed volume, all generated faces are reversed once before EditableMesh creation.
- This provides a Sweep-specific final Unify Normals pass without depending on source face winding or anchor orientation.
- Open or uncapped Sweep surfaces remain untouched.
- .404 profile-anchor/path behaviour remains unchanged.
- Released via PR **#90**; squash merge `5076c8ee5fa268bc6fa0722a3796f2e766b86bc5`.
- Final PR Topology regression run **35678568877 PASS**.

## 2026-09-22 — v0.36.18.404 selected-profile Sweep anchor

- Fixed Face/Edge-loop Sweep starting from the profile centroid before reaching the selected Follow Edge path.
- Added a profile anchor index for selected-profile Sweep.
- First Follow Edge selection chooses the nearest profile vertex and rail endpoint, translates the Profile Plane so they coincide, and rebases the swept section around that vertex.
- Removes the unwanted centre-to-edge lead-in while preserving the selected profile's exact shape and offset.
- Default Circle/Rectangle Sweep remains centre-anchored.
- Released via PR **#89**; squash merge `4b3b1c09e52341e0bc02e2c4f9614be919130e59`.
- Final PR Topology regression run **35678133922 PASS**.

## 2026-09-22 — v0.36.18.403 closed Sweep profile node insertion

- Fixed inability to insert a new node into a closed Sweep profile.
- Root cause was a missing `segmentDistance()` helper used only by closed-profile edge hit-testing.
- Added a clamped 2D point-to-segment distance implementation in `sweep-path.js`.
- Open-profile authoring, profile closure, Sweep topology and path behaviour remain unchanged.
- Released via PR **#88**; squash merge `e5b62249db5d80ed6148f02b52bb20563c088c4b`.
- Final PR Topology regression run **35675477945 PASS**.

## 2026-09-22 — v0.36.18.402 Sweep direct selection launch

- Fixed the .401 workflow flaw where Face/Edge selection was lost when entering Object mode before Add → Sweep.
- Added **Sweep from Selection** directly to Face and Edge Active Tools.
- The component profile is captured before object-mode handoff, then Sweep is created and the saved profile is applied automatically.
- Existing Use Selection profile validation/alignment remains authoritative; this build changes the launch path rather than duplicating profile conversion logic.
- Released via PR **#87**; squash merge `1c512bd2b3c487e9839b0021e8607473340910f4`.
- Final corrected PR Topology regression run **35674435817 PASS**.

## 2026-09-22 — v0.36.18.401 Sweep Use Selection profile

- User hands-on passed the .400 Sweep edit-ownership fixes and requested the next Sweep build.
- Added **Use Selection** as the fourth Sweep profile source beside Circle / Rectangle / Draw.
- A single selected Face or connected closed selected Edge loop is captured before Add → Sweep changes the active object.
- Use Selection aligns the Profile Plane to the source geometry and converts the exact planar outline into an editable closed Draw profile.
- Closed Edge-loop validation requires a single cycle; invalid/non-planar selections are rejected conservatively.
- Source geometry is snapshotted only for profile construction and remains unchanged.
- Released via PR **#86**; squash merge `0b6ae224f717c9c95a408f1db9bc77ad52c09169`.
- Final corrected PR Topology regression run **35673404201 PASS**.

## 2026-09-22 — v0.36.18.400 Sweep edit ownership

- Fixed Draw Profile remaining/returning Closed during free profile authoring; selecting Draw now explicitly opens the custom profile until the user chooses Closed.
- Fixed point 4+ authoring so custom profiles continue to append normally.
- Added explicit transform disarm when Sweep Profile or Path editing takes viewport ownership.
- Added a Sweep `editing` state and made `transform-upgrade.js` yield while Sweep is editing, preventing Move/Scale/Rotate from stealing Pencil/mouse gestures.
- Preserved touch orbit/pan/pinch and all .399 Sweep topology/normal work.
- Released via PR **#85**; squash merge `45419ad01b683d46c26179497bafb186ca90f632`.
- Final PR Topology regression run **35672719322 PASS**.

## 2026-09-22 — v0.36.18.399 Sweep side-normal correction

- User confirmed .398 geometry was much improved but side-face normals were flipped.
- Replaced Sweep side winding based only on whole-profile clockwise state with an edge-local outward-normal test.
- Each side quad now compares its actual 3D normal against the outward direction of the corresponding profile edge mapped through adjacent Sweep frames.
- Concave corners and changing path directions can therefore orient each side face independently while preserving authored profile order.
- .398 exact start ring and concave-cap triangulation remain unchanged.
- Released via PR **#84**; squash merge `0884f4d1acad778c9cbca1f93526a072eda495da`.
- Final PR Topology regression run **35663109891 PASS**.

## 2026-09-21 — v0.36.18.398 Sweep concave profile + exact start ring

- Added **Edge Extrude** to the persistent modelling backlog.
- Fixed Sweep start geometry so ring 0 is generated directly from the Profile Plane U/V basis and exactly matches the authored profile.
- Added Profile Plane normal into Sweep frame construction while preserving the established transported-frame logic for later rings.
- Replaced concave closed Sweep cap n-gons with proper polygon triangulation, avoiding fan-triangulation overlap on C-shaped profiles.
- Oriented start/end cap triangles to the actual path direction to prevent inside-out end faces.
- Left global mesh triangulation untouched; the fix is scoped to Sweep.
- Regression refinement: convex profiles keep their existing single-cap topology; only concave profiles use triangulated caps.
- Released via PR **#83**; squash merge `eb56d9df1c08fbbd3ba95112378f0a6e8397eb47`.
- Final corrected PR Topology regression run **35659397337 PASS**.

## 2026-09-21 — v0.36.18.397 Sweep profile orientation fix

- Fixed custom Draw profile closure jumping by preserving authored profile point order exactly.
- Removed automatic clockwise profile reversal from `cleanProfile()`; winding is now handled only when generating side/cap face order.
- Fixed mirrored profile editing when the Sweep path leaves opposite the Profile Plane normal.
- Added an orientation-preserving initial Sweep frame that keeps Profile Plane U/V axes visually stable for both path directions.
- Added regression coverage for clockwise point order, last→first closure integrity and left/right orientation preservation.
- Released via PR **#82**; squash merge `2cc8e9d89a87ef080411d61afd8f8d2535e97a42`.
- Final PR Topology regression run **35594079715 PASS**.

## 2026-09-21 — v0.36.18.396 Sweep Draw Profile refinement

- Reduced the initial Sweep Profile Plane from 4×4 units to 0.7×0.7 units, close to the default Circle profile footprint.
- Fixed the custom Draw profile two-point trap: open-profile drawing now appends point 3 and beyond naturally instead of interpreting the 2-point line as a closed loop segment.
- Added explicit Open / Closed profile state.
- Open profiles preview from two points as swept surfaces with no seam or caps.
- Closed profiles require 3+ points and retain the normal closed-section Sweep with optional end caps.
- Circle/Rectangle stay closed; Edit Profile preserves closure when converting built-ins to editable points.
- Added focused .396 regression coverage for open two-point Sweep surfaces, closure validation and runtime UI contract.
- Released via PR **#81**; squash merge `37ad0fc5c1dea9e6ba5281b93f9e72ba366d4b69`.
- Final PR Topology regression run **35593175171 PASS**.

## 2026-09-21 — v0.36.18.395 Sweep Profile + dual path

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

## 2026-09-21 — v0.36.18.394 Sweep Apply redraw + Geometry Snap

- Fixed post-Apply Sweep viewport state: generated geometry now redraws immediately instead of leaving the construction plane visible until object selection changes.
- Added Geometry Snap to Sweep path authoring.
- Vertex targets take priority, then Edge, then true Face ray-hit points.
- Free drawing still falls back to the Sweep construction plane when no geometry target is acquired.
- Sweep path point storage extended from plane `u/v` to plane-local `u/v/w`, enabling snapped points to follow existing mesh geometry in 3D while remaining relative to the construction plane transform.
- Geometry Snap works on both point creation and point drag.
- Preserved touch navigation, live preview, Radius/Sides/Caps, parallel-transport frames and post-Apply single-selection/Boolean tint cleanup.
- PR **#79**, squash merge `375cced7bc5c2fd2e863cd16f631c3d2e2b379d9`.
- PR Topology regression **35574552705 PASS**.


## 2026-09-21 — v0.36.18.394 Sweep Apply redraw + 3D geometry snapping

- Fixed Sweep Apply stale-view bug: construction plane no longer remains visible until another object is selected.
- Apply Sweep now disposes its overlay, hides construction controls and forces an immediate viewport rebuild like Revolve.
- Geometry Snap during Sweep Path editing now targets visible external vertices, edges and face hit-points.
- Sweep path coordinates expanded from planar u/v to construction-local u/v/w, allowing snapped path points to sit off-plane and create a true 3D path.
- Free drawing remains construction-plane based when Geometry Snap is off or no target is found.
- PR #78; squash merge `300bf36b75306e413afc70760e4dc020f599a0ad`.
- Final PR regression run **35569411629** passed.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.


## 2026-09-21 — v0.36.18.393 Sweep Path foundation

- Released Phase D **Sweep Path** foundation from PR #77; squash merge commit: `403cfc677fa934f2c9c3b9a7a25fe50bf9c559f8`.
- Added Add → Sweep Path construction object with movable/snappable construction plane and Pencil/mouse path authoring.
- Touch remains dedicated to normal BoxLab navigation while path editing is active.
- Added live circular-section preview with Radius, Sides 3–24 and Caps On/Off controls; Pencil sliders use the established Safari late-event guard.
- New `sweep-core.js` builds quad-ring tubes using parallel-transport section frames to reduce section flipping along bent paths.
- Apply converts to ordinary editable mesh, owns one mesh-history step, returns to authoritative single-object selection and resyncs Boolean viewport tint.
- V1 deliberately stays shallow: planar path + circular section; custom profiles, arbitrary 3D paths, twist/banking and corner fillets are deferred.
- Final PR regression run **35568629908** passed; post-merge main regression run **35568666909** passed.
- `src/multi-object-transform.js?v=0.36.1.0` remained untouched.


This is the concise append-only development log used for cross-chat continuity.

Do not record every tiny cache-busting or temporary deployment workflow commit. Record meaningful modelling, architecture, UI, stability, and release milestones.

Newest entries should be added at the top.

---

## 2026-09-21 — v0.36.18.392 Revolve Apply selection cleanup

- User observed an inactive cube showing amber while the freshly applied Revolve mesh was grey.
- Confirmed amber originated in Boolean/Object multi-selection viewport tinting, not Revolve geometry/material generation.
- Added authoritative Object-selection `single(id)` API to leave Multi mode and select one active object cleanly.
- Revolve Apply now resets to the active Revolve object and immediately resyncs Boolean UX, clearing stale operand tint.
- Valid Boolean A/B selection behavior is preserved.

## 2026-09-21 — v0.36.18.391 Revolve Active Tools auto-open

- User reported that after positioning/interacting with a Revolve Profile plane, Active Tools stayed closed and hid the Revolve-specific controls.
- Added construction-plane interaction detection from its initial vertex signature.
- Move / Rotate / Scale / Geometry Snap changes now automatically open and retain Active Tools for the active Revolve construction.
- Entering Edit Profile also opens/retains Active Tools.
- Uses the existing Shell/Solidify `data-keep-open` drawer contract; Apply or leaving construction releases the lock.
- No modelling-core changes.
- Released from PR **#75**; squash merge commit: `fd6b27f79fd1a78d51b3a96ba618e36ef1f43b34`.
- Final Topology regression passed in workflow run **35563645227**.

## 2026-09-21 — v0.36.18.390 Revolve profile point editing

- Continued from the successful .389 Revolve refinement baseline.
- Added explicit profile point selection and selected-point highlight.
- Tapping/pressing close to an existing profile segment inserts a new point into that segment rather than forcing append-only editing.
- Tapping elsewhere still appends to the profile end.
- Added Delete Point for selected profile points.
- Undo/Clear now clear stale selected-point state safely.
- Preserved touch navigation, plane positioning/snap, live preview, 3–64 segments, normal unification and Apply behavior.
- Released from PR **#74**; squash merge commit: `eb46b48f221ceea87432fdd7725afbd39977ece7`.
- Final Topology regression passed in workflow run **35563284475**.

## 2026-09-21 — v0.36.18.389 Revolve refinement

- .388 Revolve Profile UI received a strong hands-on pass; four refinements requested.
- Revolve Profile now starts in positioning mode (Edit Profile off), allowing Object Move/Rotate/Scale and existing Geometry Snap before drawing.
- Touch navigation remains live while profile editing: one-finger orbit and two-finger pan/pinch pass through; Pencil/mouse handles profile authoring.
- Segments minimum lowered from 6 to 3.
- Replaced per-face radial normal flipping with shared-edge winding unification plus one global shell orientation decision, fixing inward normal bands on concave profiles.
- Preserved live profile preview, plane-relative UV points, Apply behavior and legacy loose-edge Revolve.
- Released from PR **#73**; squash merge commit: `f733c23f7f15e861a10b2e607e54c684de9b92b5`.
- Final Topology regression passed in workflow run **35559953090**.

## 2026-09-21 — v0.36.18.388 live Revolve Profile construction

- User identified the missing authoring layer for Revolve: free Add Vertex points could not guarantee a coplanar profile or obvious revolve axis.
- Added Add → Revolve Profile construction object.
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

## 2026-09-21 — v0.36.18.387 component Delete key routing

- Extended Delete/Backspace UX from Object mode to Face, Edge and Vertex modes.
- New router delegates to the existing delete buttons instead of reimplementing deletion.
- Preserves each mode's established history/topology behavior and Object Multi/Group semantics.
- Ignores editable text controls and modified-key shortcuts.
- No protected modelling core changes.
- Released from PR **#71**; squash merge commit: `b955b9077a3ac0ec1290b04bee7d45d787ca8449`.
- Final Topology regression passed in workflow run **35557933604**.

## 2026-09-21 — v0.36.18.386 Revolve foundation

- .385 inward Extrude cut passed hands-on testing.
- Added Edge-mode Revolve for a standalone selected loose-edge open chain.
- Revolve axis is X/Y/Z through Object Origin; full 360° with Segments 6–64.
- Preview is non-destructive with translucent fill, wire overlay and axis guide.
- Axis/Segments rebuild preview live; Segments uses hardened Pencil range handling.
- Core orders the loose-edge chain, rejects branches/closed/partial/mixed profiles, and collapses points on the axis to single pole vertices.
- Apply replaces the loose profile with ordinary editable revolve faces in one history step and uses existing Object Manager save propagation.
- No changes to Array, inward Extrude/Through, or protected multi-object transform.
- Released from PR **#70**; squash merge commit: `2984d6dd4f3173652cdbbb2061cc736e3a77bba5`.
- Final Topology regression passed in workflow run **35557272061**.

## 2026-09-21 — v0.36.18.385 inward Extrude side-wall cut

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

## 2026-09-21 — v0.36.18.384 endpoint-vector Array UX

- Reworked Array from axis+spacing to source→endpoint vector workflow.
- Array opens with exactly one END duplicate preview (Count=2).
- END copy supports direct Free/X/Y/Z movement; Free uses the camera plane and constrained modes adjust world-axis components.
- Count fills linked preview/committed copies evenly using endpoint * i/(Count-1).
- Removed Spacing slider as primary UX.
- Apply remains one history step and linked-instance creation still uses the established Object Manager API.
- Next task remains inward/negative Face Extrude cutting.
- Released from PR **#68**; squash merge commit: `daa7ef47b34a79f1b00c167217d4eeb116a349ea`.
- Final Topology regression passed in workflow run **35547016085**.

## 2026-09-21 — v0.36.18.383 Array direct spacing drag

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

## 2026-09-21 — v0.36.18.382 Phase D Linear Array foundation

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

## 2026-09-21 — v0.36.18.381 Solidify preview backface visibility

- User screenshots confirmed the remaining preview visibility issue was Solidify, not Shell.
- Replaced Solidify's single translucent preview Mesh with a Group containing translucent DoubleSide fill plus brighter DoubleSide wireframe overlay.
- Disabled depth test/write on both preview layers so generated inner/back faces remain visible through the source sheet.
- Preserved direct preview thickness dragging by switching raycast to recursive Group traversal and using the hit child mesh matrix for normal projection.
- Preview disposal now traverses child meshes and disposes shared resources safely.
- No Solidify topology, offset solver, history or linked-instance behavior changed.
- Released from PR **#65**; squash merge commit: `a4ee4ae3779586be82365ee98f169527d49fb08d`.
- Final Topology regression passed in workflow run **35544854000**.

## 2026-09-21 — v0.36.18.380 Shell preview backface visibility

- User requested better Shell preview visibility from the reverse/interior side.
- Replaced wireframe-only preview with a two-layer Group: translucent DoubleSide fill plus brighter DoubleSide wireframe overlay.
- Both preview layers render depth-test/write disabled so inner/back faces remain legible through the source mesh.
- Preview disposal now traverses child meshes and disposes shared resources safely.
- No Shell topology, thickness, selection, history or Apply behaviour changed.
- Released from PR **#64**; squash merge commit: `39252588b9e7530fd276a0715739a040efc87d59`.
- Final Topology regression passed in workflow run **35544543433**.

## 2026-09-20 — v0.36.18.379 Shell Pencil late-native guard

- .378 still snapped to 0.01 under Apple Pencil hands-on testing.
- Pencil coordinate mapping was correct; Safari could emit a late native range input/change after pointerup and overwrite the value.
- Shell now retains Pencil ownership of the thickness value through two animation frames after release.
- Input/change handlers enforce the Pencil-owned value before updating output/preview.
- Finger/touch remains native after Pencil ownership clears.
- No topology/history/selection changes.
- Released from PR **#63**; squash merge commit: `13d9ea9aa3c58333abfc660dcd990ed26363d94f`.
- Final Topology regression passed in workflow run **35507874713**.

## 2026-09-20 — v0.36.18.378 Shell Pencil thickness parity

- User reported Shell Thickness worked correctly with finger input but Apple Pencil snapped the value back to 0.01.
- Root cause scope was the native iPad range-control Pencil path, not Shell topology.
- Added an explicit Pencil-only pointer handler on the Shell Thickness range.
- Pencil X position maps to slider bounds, clamps to min/max, snaps to the same step, and dispatches the normal input event so preview/output use the existing pathway.
- Pointer capture stabilizes Pencil dragging beyond the narrow slider track.
- Finger/touch native range behaviour remains unchanged.
- No Shell core, Solidify core, selection, drawer or history logic changed.
- Released from PR **#62**; squash merge commit: `4b50d300a72c41c774f74eb55daf18a220f8acdd`.
- Final Topology regression passed in workflow run **35507531277**.

## 2026-09-20 — v0.36.18.377 closed-solid Shell

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

## 2026-09-20 — v0.36.18.376 Solidify Active Tools drawer lock

- User reported that Active Tools collapsed during interactive Solidify thickness dragging, hiding Apply Solidify.
- Root cause path is the shared drawer exclusivity system; it already supports `data-keep-open="true"`.
- Solidify now temporarily claims that existing keep-open contract for the entire armed preview session.
- Active Tools is explicitly reopened if any competing UI path closes it before the preview is applied/cancelled.
- Keep-open ownership is released after Apply/Cancel/invalidation; `drawer-ui.js` remains unchanged.
- No topology, hard-fold, direct-drag or history logic changed.\n- Released from PR **#60**; squash merge commit: `77eab5bb8e441f5ce93801963c432dcf2f12bd86`.\n- Final Topology regression passed in workflow run **35506658206**.

## 2026-09-20 — v0.36.18.375 direct-drag Solidify thickness

- User requested direct interactive thickness control by dragging the translucent Solidify preview itself.
- Added preview ray-picking on the viewport.
- A picked preview face supplies a screen-projected normal axis; Pencil/finger drag along that axis maps to world-space thickness.
- Thickness slider/output remains synchronized for exact numeric fallback.
- OrbitControls is disabled only during the active thickness drag and restored on pointer-up/cancel.
- Preview shows generated inner shell + boundary walls rather than repainting the unchanged source sheet.
- Direct drag remains preview-only: no mesh mutation and no history entry until Apply Solidify.
- The .374 90° hard-fold/miter solver remains authoritative and unchanged.\n- Released from PR **#59**; squash merge commit: `3bc25065adfcc4de8c840c9fd00a6771cb6a2d59`.\n- Final Topology regression passed in workflow run **35506408342**.

## 2026-09-20 — v0.36.18.374 Solidify hard-fold offset + live preview

- User confirmed Solidify worked on flat sheets but reported incorrect thickness around a 90° multi-sheet fold.
- Root cause: the .372 core used a normalized averaged vertex normal, which under-offsets each source plane at hard folds.
- Replaced hard-fold displacement with offset-plane intersection / miter solving.
- Added an explicit 90° two-quad regression fixture requiring full requested thickness to both source planes.
- Added conservative guards for opposed folds, singular plane systems and excessive miters.
- Solidify now uses a two-stage preview workflow: Solidify → live preview; Thickness slider updates non-destructively; Apply Solidify commits.
- Preview cancellation occurs when leaving Object mode or changing active object.
- Preview does not push history or mutate live geometry; final commit remains one Object-scene history step.
- Frozen `/beta-3/` remains unchanged.\n- Released from PR **#58**; squash merge commit: `85046592160df22d8bc12666ddd821cc1c44c13e`.\n- Final Topology regression passed in workflow run **35503005511**.

## 2026-09-20 — v0.36.18.373 visible-version ownership fix

- User observed live main apparently reverting to **v0.36.1.0**.
- Root cause was found in protected `src/multi-object-transform.js`, which contains legacy UI-only lines that stamp `#appVersion` and `document.title` to its own historical module version.
- Transform logic and the protected file/blob were deliberately left untouched.
- The top-bar version label now carries an explicit release-shell version stamp.
- `release-version.js` uses that shell value immediately and its existing observer reasserts the real app version if any older module mutates the label later.
- `version.json` remains the network/source-of-truth confirmation path.
- Phase D Solidify from .372 is unchanged.\n- Released from PR **#57**; squash merge commit: `3a7139dabc09731ffb29bb952c15ef1bb276559f`.\n- PR Topology regression passed in workflow run **35502647303**.

## 2026-09-20 — v0.36.18.372 Phase D Solidify foundation

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

## 2026-09-20 — Beta 3 frozen and published

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

## 2026-09-20 — v0.36.18.371 Beta 3 release candidate

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

## 2026-09-20 — v0.36.18.369 shell-by-shell Group Boolean + persistent Swap drawer

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

## 2026-09-20 — v0.36.18.368 Group Boolean convenience

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

## 2026-09-20 — v0.36.18.367 touch orbit + selection-mode stability

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
- This removes a one-render lag where Object → Edge/Face/Vertex could be processed as the previous mode during `saveActive()`.
- .366 authoritative live-mesh publication remains unchanged.
- Protected `object-origin.js?v=0.36.18.355` and `multi-object-transform.js?v=0.36.1.0` remain untouched.
- Added regression coverage for OrbitControls pointer-up visibility, authoritative mode source, post-activation inactive rebuild and protected pins.
- Released from PR **#51**; squash merge commit: `db74acc2c2069c16b583874c67f4051ba1310fc4`.

## 2026-09-20 — v0.36.18.366 authoritative live-mesh bridge timing

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

## 2026-09-20 — v0.36.18.365 persistent inactive-object scene layer

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

## 2026-09-20 — v0.36.18.364 touch object activation render-race fix

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

## 2026-09-20 — v0.36.18.363 atomic linked-duplicate creation

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
  - evaluates source × placement
  - creates the new object with linked metadata already attached
  - only then allows normal activation/rendering
- No post-activation reassignment of `copy.sourceId` or `copy.instanceMatrix` remains.
- This makes first-generation and second-generation linked duplicates follow the same creation path.
- Existing .362 source × matrix regeneration remains in place for active/inactive rendering.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for atomic linked metadata, second-generation propagation, inactive linked rendering and protected pins.
- Released from PR **#47**; squash merge commit: `4f0441660512c4eacf557320d8a5f935b931243e`.

## 2026-09-20 — v0.36.18.362 linked-instance placement stability

- User reported linked instances could be moved and modelled independently, but selecting a different peer caused them to jump together and lose independent placement.
- Root cause was a split source-of-truth problem between cached evaluated world meshes and shared source + instanceMatrix state.
- In Object mode, `saveActive()` still first attempts to recover a placement matrix from shared source → live mesh.
- If placement recovery succeeds, only that instance's `instanceMatrix` is updated.
- If placement recovery fails, BoxLab now treats the live mesh as a shared-geometry edit at the existing instance placement:
  - transforms live world mesh back through the current instance matrix
  - updates the shared local source
  - increments source revision
  - regenerates linked peers from shared source × each peer's own instanceMatrix
- Activating a linked object now regenerates its world mesh from shared source × instanceMatrix before loading it into the live mesh.
- Inactive linked rendering also regenerates from shared source × instanceMatrix rather than trusting stale cached world geometry.
- Intended contract is now explicit: **shared geometry, independent placement**.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for placement fallback, activation regeneration, inactive rendering and protected pins.
- Released from PR **#46**; squash merge commit: `8dcef36d789bf6d42bc092aa2897115789c636bd`.

## 2026-09-20 — v0.36.18.361 per-object Outliner SubD toggle

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

## 2026-09-20 — v0.36.18.360 contextual Object controls

- Continued UI/UX polish on the protected v0.36.18.355 Group transform baseline.
- Audited Object-mode Origin/Pivot controls and confirmed:
  - Origin presets are single-object controls.
  - Pivot mode only affects multi-object / grouped Scale and Rotate behavior.
- Object UI now exposes a lightweight selection-context class from authoritative Object Management:
  - single-object context
  - multi / whole-Group context
- Presentation is now contextual:
  - single object → compact Origin row shown, Pivot row hidden
  - Multi / whole Group → compact Pivot row shown, Origin row hidden
- Origin/Pivot button dimensions, gaps and labels are tightened for iPad without changing their handlers.
- Object Selection toolbar is forced into a compact five-button strip with smaller gaps and a tighter status readout.
- No changes to Origin/Pivot maths, Group selection, Group transforms, linked instances, Boolean behavior or Reference protection.
- Protected `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `object-management.js → drawer-ui.js → index.html` cache chain.
- Added regression coverage for contextual visibility, compact Selection layout and protected pins.
- Released from PR **#44**; squash merge commit: `41fa0636d5b601cd059afe4bc911f4f36b4a9dab`.

## 2026-09-20 — v0.36.18.359 Outliner Delete restoration + keyboard Delete

- User reported that compact Outliner polish had made object Delete too hard to find and requested a keyboard shortcut.
- Every object-row **More** menu now includes **Delete Object**.
- Row-level Delete removes that specific object and creates exactly one Object scene-history checkpoint.
- Global/footer Delete keeps its existing authoritative history capture; `deleteActive()` therefore suppresses a second internal checkpoint.
- In Object mode, hardware-keyboard **Delete** and **Backspace** trigger the existing authoritative Delete button.
- Keyboard Delete therefore inherits current selection semantics:
  - single object → delete active object
  - Multi selection → delete selected objects
  - whole Group selection → delete selected Group members through the existing Multi pathway
- Keyboard handling ignores Meta/Ctrl/Alt-modified shortcuts and does not fire inside inputs, textareas, selects, contenteditable elements or the BoxLab Rename dialog.
- Added future roadmap item for **Group Boolean convenience** using temporary Join-derived compound operands rather than a new Group geometry type.
- Protected Group transform baseline `object-origin.js?v=0.36.18.355` remains untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Added regression coverage for row Delete, keyboard Delete/Backspace, editable-field protection and one-step history semantics.
- Released from PR **#43**; squash merge commit: `d9da984e331e561dc2a490554df95eaf8f1e7f94`.

## 2026-09-20 — v0.36.18.358 anchored upward Outliner popovers

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

## 2026-09-20 — v0.36.18.357 upward Outliner popovers

- User screenshot showed the compact Object **More** menu opening downward near the bottom of the Objects drawer, causing Lock/Solo to be clipped by the drawer edge.
- Object row More menus now open upward from the dots.
- Group row More menus now open upward from the dots.
- Bottom Object action More menu also opens upward.
- This is CSS/layout only; no changes to selection, Group hierarchy, transforms, linked instances, Boolean behavior or Reference protection.
- Protected Group transform baseline remains `object-origin.js?v=0.36.18.355`.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `object-management.js → drawer-ui.js → index.html` cache chain.
- Added regression coverage for upward popover positioning and protected pins.
- Released from PR **#41**; squash merge commit: `d7c4655f125c0811bbee12c8733da02090ec3926`.

## 2026-09-20 — v0.36.18.356 compact Outliner polish

- User confirmed v0.36.18.355 as the stable Group baseline and approved continuing UI/UX polish.
- This build is presentation-only around the Object Outliner; Group selection/transform routing from .355 is intentionally untouched.
- Object rows are reduced from permanent **Name / Visibility / Lock / Solo** controls to **Name / Visibility / More**.
- Object **More** contains the existing Lock/Unlock and Solo/Exit Solo actions; the underlying behavior and handlers are preserved.
- Group rows are reduced from **Disclosure / Name / Visibility / Lock / More** to **Disclosure / Name / Visibility / More**.
- Group **More** now contains Lock/Unlock, Rename Group and Ungroup.
- The bottom Object action stack is reduced from three rows to **Add / Duplicate / More**.
- The existing Rename, Linked Duplicate, Make Unique and Delete buttons are physically moved into the Object More menu so their existing IDs, handlers and Multi enable/disable logic remain authoritative.
- Object and Group rows now share a denser visual rhythm with 28–32 px touch targets and fewer permanent boxed controls, following the compact scene-tree direction established by the user's Nomad reference.
- No changes to Group membership, selection semantics, transform routing, Boolean geometry, linked-instance geometry or Reference protection.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- `object-origin.js?v=0.36.18.355` remains pinned to the confirmed working Group transform baseline.
- Refreshed `multi-object.js`, `object-management.js`, `drawer-ui.js` and outer release cache pins.
- Added regression coverage for compact Object/Group row structure, relocated action buttons and protected Group transform pins.
- Released from PR **#40**; squash merge commit: `562dd8697aca5c4a2d9b6c39729e8d725857320b`.

## 2026-09-20 — v0.36.18.355 whole-Group transform routing fix

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

## 2026-09-20 — v0.36.18.354 whole-Group viewport selection context

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

## 2026-09-20 — v0.36.18.353 focused Rename + live Group header refresh

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

## 2026-09-20 — v0.36.18.352 two-object colour cue + compact naming

- User clarified that the amber/blue viewport colouring was useful as a general two-object Multi-selection indicator, even though Boolean-specific Outliner takeover was not.
- Restored viewport tint for exactly two selected objects in Object mode:
  - active / primary object = amber
  - second selected object = blue
- Outliner remains neutral; Boolean A/B row borders/badges are not restored as a generic Multi-selection treatment.
- Ordinary Duplicate naming now uses padded sibling numbers instead of `copy`: `Cube` → `Cube 01` → `Cube 02`.
- Duplicating an already numbered object continues the same base-name family rather than nesting suffixes.
- Linked Duplicate and Multi Duplicate use the same numbered object-name allocator.
- Boolean result naming is now compact: active/base object stem + `B1`, `B2`, etc., instead of concatenating active name + operation + cutter name.
- Boolean operation status text and geometry behavior remain unchanged.
- Group ownership / compact hierarchy from .351 remains unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Refreshed `multi-object.js`, `object-management.js`, `boolean-ux-history.js`, `boolean-prototype.js`, `drawer-ui.js` and `index.html` cache pins.
- Added regression coverage for two-object viewport tint, numbered Duplicate/Linked/Multi naming, Boolean B-numbering and protected cache/transform pins.
- Released from PR **#36**; squash merge commit: `c848cf3f867edcfd732b21d400f11d734b614caf`.

## 2026-09-20 — v0.36.18.351 Group ownership + Boolean UI cleanup

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

## 2026-09-20 — v0.36.18.350 compact Group tree

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
- Refreshed `object-management.js → drawer-ui.js → index.html` cache chain for iPad/Safari.
- Added regression coverage for contextual Group creation, compact tree structure, More actions, history-safe visibility/lock and protected cache/transform pins.
- Released from PR **#34**; squash merge commit: `11843516865bfcb50aa4d5686d7405611ba567e0`.

## 2026-09-20 — v0.36.18.349 first-class Group selection UX

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
- Updated `object-management.js → drawer-ui.js → index.html` cache chain for iPad/Safari.
- Added regression coverage for whole-group detection, Rename Group routing, simplified header and protected transform/cache pins.
- Released from PR **#33**; squash merge commit: `12fdaa389d507799253482bd7c8f4747a1e1a8f4`.

## 2026-09-19 — v0.36.18.348 persistent Group organization

- Mandatory Phase C audit confirmed BoxLab already had one authoritative Group implementation: membership and transforms are owned by `object-origin.js`, while the grouped Outliner hierarchy / names / collapse UI are owned by `object-management.js`.
- No second hierarchy or group-transform layer was added.
- Audit found Object scene snapshots preserved each object's `groupId` but did not preserve custom group names or collapsed/expanded state.
- Added group metadata to the authoritative Object scene snapshot and restore path.
- Restore filters metadata against group IDs that genuinely exist in the restored scene, preventing stale names/collapse flags from attaching to unrelated later groups.
- Group Rename now checkpoints Object scene history before changing the label, making rename one Undo/Redo step.
- Stale name/collapse metadata is pruned when a group truly disappears.
- Existing Group membership, automatic whole-group transform expansion, linked-instance behavior and Reference protection remain unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- Updated the `object-management.js → drawer-ui.js → index.html` cache chain for iPad/Safari.
- Added regression coverage for metadata snapshot/restore, rename history, stale metadata pruning and protected transform/cache pins.
- Released from PR **#32**; squash merge commit: `cf80a9bd11a4916eb586e954a2152b04dd46b49f`.

## 2026-09-19 — v0.36.18.347 Join / Boolean scene-history consolidation

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

## 2026-09-19 — v0.36.18.346 Multi linked-instance parity

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

## 2026-09-19 — v0.36.18.345 Safari native-selection interaction guard

- Released **v0.36.18.345** from PR #29; squash merge commit: `296c2742faff6734f9af422a5050918a700dceb4`.
- Added a standalone `src/app-interaction-guard.js` to prevent Safari/iPad native text/element selection, touch callouts and drag-selection from washing the modelling UI blue during touch/Pencil work.
- The guard applies `user-select:none`, `-webkit-user-select:none`, and `-webkit-touch-callout:none` across BoxLab chrome and the modelling surface.
- `selectstart` and native `dragstart` are prevented outside editable controls.
- Real editable controls remain exempt: `input`, `textarea`, `select`, `contenteditable`, and explicit `data-allow-selection=true` targets retain normal selection/value interaction.
- Existing `touch-action:none` gesture routing was left unchanged.
- Protected `styles.css?v=0.36.18.270`, Pencil/orbit handlers, and `src/multi-object-transform.js?v=0.36.1.0` were untouched.
- Added regression coverage for native-selection suppression, editable-field exceptions, single authoritative loader, and protected gesture/transform pins.
- PR topology regression run **35437021036** passed on the first run.

## 2026-09-19 — v0.36.18.344 Reference guides permanently read-only

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

## 2026-09-19 — v0.36.18.343 linked-instance foundation + Make Unique

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
- Outliner labels linked peers with `Link ×N`.
- The protected `src/multi-object-transform.js?v=0.36.1.0` was not modified.
- First PR run failed only because the previous .342 UI test hard-coded the parent drawer cache version. All new instance tests passed on that run. The parent-loader assertion was made version-resilient.
- Corrected PR topology regression run **35435127026** passed before merge.

## 2026-09-19 — v0.36.18.342 File menu fit + stable 3-column Face layout

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

## 2026-09-19 — v0.36.18.341 Vertex toolbar stability / Build Edge handoff hotfix

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

## 2026-09-19 — v0.36.18.340 transactional Offset Loop support workflow

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

## 2026-09-19 — v0.36.18.339 Clean sharp-fold shape-preservation hotfix

- Released **v0.36.18.339** from PR #23; squash merge commit: `e651e7d1360d9f09e8723ddf1d6c0556b8b9b395`.
- Concrete user video regression: Object > Clean for SubD visibly caved in a box-with-opening after the all-quad relaxation phase.
- Root cause: `quadRelaxFlow()` treated any interior all-quad, uncreased vertex as smooth. Around an opening/corner, horizontal and vertical incident faces could be averaged into a blended tangent even though the geometry represented a sharp fold.
- Added a geometric normal-fan guard: a relax candidate is now protected if any incident quad-face normal pair differs by more than 30°.
- This protection applies even when the user has not explicitly assigned a Crease.
- Existing planar smooth-grid relaxation remains enabled and still improves a perturbed interior quad vertex.
- Added regression coverage for both cases: smooth planar relaxation still works; an uncreased sharp folded quad fan remains fixed.
- Clean remains transactional; protected topology systems and `src/multi-object-transform.js?v=0.36.1.0` were untouched.
- First PR run failed only because the old Clean UI contract hard-coded the .323 module pin. The new geometry tests already passed. The loader contract was made version-resilient.
- Corrected PR topology regression run **35430414020** passed before merge.

## 2026-09-19 — v0.36.18.338 conservative four-sided Grid Fill

- Released **v0.36.18.338** from PR #22; squash merge commit: `72ec70b123e27c2ee8d3ca116f0b23481a0f1afa`.
- Mandatory existing-feature audit confirmed existing **Fill** is already the simple single-face Cap and Bridge/Quadify do not provide a structured hole grid.
- Added **Grid Fill** as a distinct Edge Topology operation for one simple planar convex four-sided boundary with matching opposite segment counts.
- Corner detection treats collinear intermediate boundary vertices as side subdivisions, so a segmented rectangular boundary can form a U×V quad grid.
- Existing boundary vertices remain fixed; only required interior vertices are created.
- Grid positions use a Coons-style interpolation across the four boundary sides.
- Grid Fill creates only quads, selects the resulting faces, and commits as one Undo step.
- Candidate topology is built on a clone and validated before the live mesh is changed.
- Irregular/curved boundaries, mismatched opposite counts, non-boundary/internal edges, ambiguous loops, and simple four-edge caps are rejected.
- Grid Fill is loaded once through `drawer-ui.js` and is placed beside existing Fill in the Edge Topology row.
- First PR run failed only because an older Flip Edge test hard-coded the prior drawer loader version; the Grid Fill tests themselves all passed. The parent-loader test was made version-resilient.
- Corrected PR topology regression run **35429713006** passed before merge.

## 2026-09-19 — v0.36.18.337 existing Rotate Edge consolidated as Flip Edge

- Released **v0.36.18.337** from PR #21; squash merge commit: `72f1847dad79b15955a4f406b273b60b44b4ee9f`.
- Mandatory existing-feature audit confirmed the queued Edge Flip already existed as `src/rotate-edge.js`.
- The existing tool already performs the intended conservative diagonal swap between exactly two consistently wound triangles.
- No second Edge Flip implementation was added.
- Renamed the user-facing control/status language from **Rotate Edge** to **Flip Edge** while preserving the existing topology, selection and Undo behavior.
- Refreshed the `rotate-edge.js` → `face-workflow-layout.js` → `drawer-ui.js` cache chain for iPad/Safari.
- Added regression coverage protecting one authoritative Flip Edge implementation.
- First PR run failed only because a Circle test hard-coded the previous drawer cache version; that test was made version-resilient.
- Corrected PR topology regression run **35419239003** passed before merge.
- Audit also confirmed existing **Fill** already acts as a single-face Cap for one selected closed edge loop; the remaining structured-fill gap is **Grid Fill**.

## 2026-09-19 — v0.36.18.336 Circle exact Active Tools layout

- Released **v0.36.18.336** from PR #20; squash merge commit: `586efff69f7d1565ff5687c296e183143b0566c7`.
- Pure UI rearrangement of the existing Circle tool; geometry/selection/history behavior unchanged.
- Vertex: Circle is the third item in the row with Slide and Create Face.
- Edge: Circle sits immediately after Delete in the bottom Topology row.
- Face: Circle sits beside Poke Faces in the same two-column row.
- Removed the old standalone `componentCircleRow` wrapper entirely, preventing an old bottom Circle location from remaining.
- PR topology regression run **35418641336** passed before merge.

## 2026-09-19 — v0.36.18.335 restore Edge Split with canonical Multi

- Released **v0.36.18.335** from PR #19; squash merge commit: `04b23e2d445888dea952efc650161be1d5a53286`.
- Root cause: canonical always-additive component Multi left `edge-paint-select.js` active, and its capture-phase pointer handler consumed an unselected Edge tap before `face-split.js` could receive it.
- Face Split now exposes an armed state and participates in the existing `boxlab-direct-tool-exclusive` convention.
- While Face Split is armed, additive Edge paint selection yields instead of consuming the gesture.
- When Face Split is disarmed, normal canonical additive Edge selection resumes immediately.
- Global Multi remains enabled; there is no rollback to the old Multi toggle model.
- Cache-hopped `edge-paint-select.js` and `face-split.js` to .335.
- PR topology regression run **35417550936** passed before merge.

## 2026-09-19 — v0.36.18.334 Circle moved to Active Tools

- Released **v0.36.18.334** from PR #18; squash merge commit: `6dc2d183e0332d6953f60e9bf21f5b39c1686ec8`.
- Relocated the existing Circle control out of the Selection drawer.
- Circle now appears contextually inside Vertex / Edge / Face **Active Tools**.
- Kept one authoritative Circle implementation and one handler; geometry, selection, Undo, and Face/Edge/Vertex behavior are unchanged.
- Updated dynamic loader/cache pins to .334.
- PR topology regression run **35417217225** passed before merge.

## 2026-09-19 — v0.36.18.333 Face Circle support

- Released **v0.36.18.333** from PR #17; squash merge commit: `fbfbf9f46f45b4551cb0e5fdc1086cac248e7919`.
- Extended Circle so exactly one selected Face can drive the operation from its perimeter vertices.
- Face mode now enables Circle for one valid face; multiple selected Faces are refused.
- Existing Vertex/Edge Circle behavior remains unchanged.
- No topology is created or deleted; the selected Face remains selected and the operation is one Undo step.
- Cache-hopped `component-circle-core.js`, `component-circle.js`, and the authoritative `drawer-ui.js` loader to .333.
- First PR run failed only because older Circle contract tests still hard-coded .331/.332 pins/text; those assertions were rewritten to protect invariants instead of stale version strings.
- Corrected PR topology regression run **35417107014** passed before merge.

## 2026-09-19 — v0.36.18.332 Circle visibility hotfix

- Released **v0.36.18.332** from PR #16; squash merge commit: `86f5efe098b26fa7543d1018122fc7deeeacdb04`.
- Fixed Circle not appearing on iPad/Safari because `index.html` still loaded `drawer-ui.js?v=0.36.18.210`, allowing the browser to reuse an older cached drawer module that did not import Circle.
- Cache-hopped the authoritative drawer loader to `drawer-ui.js?v=0.36.18.332`.
- Circle now remains visible-but-disabled outside Vertex/Edge mode instead of disappearing, improving discoverability.
- Added regression coverage for the current drawer cache key and Circle visibility.

## 2026-09-19 — v0.36.18.331 Circle regularize for closed loops

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

## 2026-09-19 — v0.36.18.330 explicit Align anchor workflow

- Released **v0.36.18.330** from PR #14; squash merge commit: `e5ee279298b14cca76cbca5274c10f6a2484e802`.
- Upgraded component Align X/Y/Z from average-based flattening to an explicit iPad anchor workflow.
- Workflow: multi-select components → choose Align X/Y/Z → tap one selected component as the fixed anchor.
- The picked anchor component stays fixed; other selected component vertices align to the anchor component's centre coordinate on the chosen axis.
- Reused the existing Boolean amber/orange reference colour (`#f3b34a`) for the temporary anchor cue.
- Existing Make Planar remains unchanged and distinct.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- PR topology regression run **35415067002** passed before merge.

## 2026-09-19 — v0.36.18.329 component Align X/Y/Z

- Released **v0.36.18.329** from PR #13; squash merge commit: `6edb552a3219435f1a3a2de7cc9a47be46815c07`.
- Existing-feature audit confirmed **Make Planar** already existed for Face-specific arbitrary-plane flattening; it was retained unchanged.
- Added only the missing generic component axis-align tool for Vertex / Edge / Face selections.
- Align X / Y / Z sets all vertices belonging to the selected components to their average coordinate on the chosen axis.
- Selection is preserved, Object mode is excluded, and the operation commits as one history step.
- New modules: `src/component-align-core.js` and `src/component-align.js`.
- `drawer-ui.js` is the single loader for the new UI module.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.
- PR regression run **35411656859** passed before merge.

## 2026-09-19 — v0.36.18.328 duplicate Repeat UI removed

- Released **v0.36.18.328** from PR #12; squash merge commit: `f731849f96b5808c986b6d46dc92e53c9f64f9c3`.
- Fixed duplicate Precision Face / Repeat Previous controls introduced by v0.36.18.327.
- Root cause: `drawer-ui.js` already dynamically imported both modules, while .327 also added direct `index.html` module loads.
- Removed the direct `index.html` loads.
- Kept `drawer-ui.js` as the single authoritative loader and updated its Precision Face / Repeat Previous pins to `0.36.18.327`.
- Added regression coverage ensuring there is only one loader path for each module.
- This fix preserves the existing Repeat Previous behavior and exact-value replay logic; it only removes duplicate UI instantiation.

## 2026-09-19 — v0.36.18.327 redundant Repeat Previous reconnect

- Released **v0.36.18.327** from PR #11; squash merge commit: `462eabc59076afdfa7efaf10338bfa49f83355c1`.
- This release was later identified as redundant: Repeat Extrude / Repeat Inset were already live through `drawer-ui.js` before .327.
- Normal Face Extrude and Inset operations record committed model-unit values.
- Repeat Previous can replay the exact previous Extrude/Inset value on another Face.
- Through-ready, Through, blocked and rollback Extrude gestures remain explicitly non-repeatable.
- No `main.js`, Through kernel, or protected `src/multi-object-transform.js?v=0.36.1.0` changes were required.
- Final PR regression run **35410554813** passed after aligning the exported Precision Face API version with the .327 release.

## 2026-09-19 — v0.36.18.326 live component Move precision readback

- Released **v0.36.18.326** from PR #10; squash merge commit: `80605a225d9855f098a1cff7596d77fc8d6a2d7e`.
- Added live component Move readback in the existing stats line: **ΔX / ΔY / ΔZ** to three decimal places.
- Numeric readback remains visible during ordinary drags and cross-object snapping.
- Existing snap target labels remain visible alongside the numeric delta.
- No transform math changed; this is presentation/readback only.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.
- Final PR regression run **35408617550** passed. The earlier failed run only flagged a stale .325 cache-pin assertion; the new .326 readback tests were already passing.

## 2026-09-19 — v0.36.18.325 component Move cross-object snapping

- Released **v0.36.18.325** from PR #9; squash merge commit: `11f3d80d871d2fa2375d908aa904527bd549e394`.
- Extended Phase B precision modelling so Geometry-enabled component Move can snap to visible geometry on other objects.
- Single-vertex Move snaps that vertex; Edge/Face/multi-component Move snaps the component centre.
- Free Move can snap to other-object vertices, midpoints and edge positions.
- Axis-constrained Move only adopts the target coordinate on the constrained axis.
- Object mode is excluded and target objects remain unchanged.
- Added `componentSnapDelta()` to the shared cross-object snap core and dedicated runtime/delta regression coverage.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.
- Final PR regression run **35407390765** passed. The earlier failed run only flagged the intentionally changed `main.js` cache pin in an old release contract.

## 2026-09-19 — v0.36.18.324 Phase B begins / cross-object Add Vertex snapping

- Released **v0.36.18.324** from PR #8; squash merge commit: `70df4c4f137a55e553227aa391bdd68324a0d732`.
- Started Phase B precision modelling with cross-object snapping for Add Vertex.
- Existing local-edge snapping keeps priority.
- When no local edge is hit, Add Vertex can snap to visible other-object vertices, then midpoints, then arbitrary edge positions.
- Snap targets do not modify the target object; hidden and solo-excluded objects are ignored.
- Added pure helper module `src/cross-object-snap-core.js` plus dedicated regression coverage.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remained untouched.
- Final corrected PR regression run **35406677103** passed successfully. Earlier PR runs failed only because the new test fixture incorrectly used loose edges that `EditableMesh.edges()` does not enumerate.

## 2026-09-19 — v0.36.18.323 Phase A complete / transactional topology audit

- Released **v0.36.18.323** from PR #7; squash merge commit: `040e210bf2868a45791c35c9c1392bc1e6f244fe`.
- This is the final planned Phase A Clean for SubD backend release.
- Added `quadTopologyAudit(mesh)` covering invalid references, repeated/collapsed edges, duplicate faces, non-manifold edges, orphan crease data, and valid open-boundary handling.
- `quadCleanMesh(mesh)` now snapshots the original mesh and audits after retopo, sliver cleanup, bounded triangle-patch solving, residual pair merge, and relaxation; any stage failure restores the original mesh transactionally.
- Added deterministic generated irregular-strip fixtures and invalid-topology regression coverage.
- Kept the 40-triangle solver cap and all existing quality/acceptance gates unchanged.
- Added persistent `ROADMAP.md`; Phase A is frozen unless a concrete modelling failure justifies reopening it.
- PR topology regression run **35406242201** completed successfully before merge.

## 2026-09-19 — v0.36.18.322 worst-local internal-flow ranking

- Released **v0.36.18.322** from PR #6; squash merge commit: `0f03befbb7d69ca53194536579c240a993efd9ff`.
- Clean for SubD internal proposed-quad flow ranking now combines average mismatch with a small worst-local mismatch term.
- New helper `quadInternalFlowPenalty(flows)` separates the acceptance penalty from the ranking-only worst-local term.
- Equal-average alternatives now prefer the patch that avoids concentrating flow mismatch into one badly aligned internal quad junction.
- The new worst-local term is ranking-only: the .321 acceptance score, quality thresholds, and 40-triangle solver envelope are unchanged.
- Regression workflow run **35404138276** completed successfully before merge.

## 2026-09-19 — v0.36.18.321 worst-local valence-aware patch ranking

- Released **v0.36.18.321** from PR #5; squash merge commit: `0b838da0cd2a31cd4d88c2390a9e15e9b0c58905`.
- Clean for SubD valence ranking now combines average smooth-interior valence error with a small worst-local error term.
- New helper `quadValencePenalty(errors)` makes the ranking behavior explicit and regression-testable.
- Equal-average alternatives now prefer the patch that avoids concentrating error into a more extreme extraordinary vertex.
- The new worst-local term is ranking-only; the .320 acceptance/quality gates and 40-triangle solver envelope are unchanged.
- Regression workflow for PR #5 passed successfully before merge.

## 2026-09-19 — v0.36.18.320 interior valence-aware patch ranking

- Released **v0.36.18.320** from PR #4; squash merge commit: `40e119774f39373ffadab22d0782428e8be7ea2c`.
- Clean for SubD complete-patch ranking now includes smooth-interior vertex valence regularity after the existing shape, surrounding-flow, and internal-flow terms.
- The new helper is `quadPatchValenceContext(mesh,pairs)` with `PATCH_VALENCE_WEIGHT=.25`.
- Ranking prefers safe complete matchings that leave eligible smooth interior vertices closer to quad valence 4 after paired triangle diagonals are removed.
- Boundary vertices and vertices touching creases are excluded from valence scoring.
- Valence is ranking-only: the existing .319 quality score still controls acceptance, so the 40-triangle envelope and prior quality/eligibility guards remain unchanged.
- Added regression coverage for valence-4 preference and crease-ring exclusion; Topology regression run **35401945842** completed successfully on the corrected PR head.

## 2026-09-19 — .319 handoff audit / repo reconciliation

- Re-audited current `main` against `AI_WORKFLOW.md` before closing the development chat.
- Confirmed **v0.36.18.319** is the released/live baseline: internal proposed-quad flow coherence is present, the bounded triangle-island envelope remains 40 triangles, and the .319 release/verifier had already completed successfully.
- Canonical .319 release commit remains `68e45845f6696b3e66929ee4b181748b85d99b09`; final clean Pages marker commit remains `4ed534dfe8697e54921a8a80d7b50945b6792342`.
- After the handoff files were first introduced, three later .319 commits (`51117f59...`, `a91ac689...`, `a0a2d072...`) re-exposed/cache-hopped/tested the same .319 internal-flow state. They do **not** represent a newer numbered release.
- Current code-bearing HEAD at this audit is `a0a2d072acbf2e397ca68e2276fd75c8a1643846`.
- Only permanent workflow currently present under `.github/workflows` is `through-regression.yml`; temporary .319 release/verifier workflows are removed.

## 2026-09-19 — Repository handoff system established

- Added `AI_WORKFLOW.md`, `AI_HANDOFF.md`, `DEV_HISTORY.md`, and `TEST_CHECKLIST.md`.
- Future AI development sessions must treat the repository as source of truth.
- Future sessions must update the living handoff and append meaningful history before finishing code-changing work.
- Initial handoff was audited from current `main`, not reconstructed from an older chat version.

## v0.36.18.319 — Internal proposed-quad flow coherence

- Clean for SubD patch scoring now considers flow coherence inside the proposed quad patch in addition to surrounding boundary context.
- Bounded triangle-island solving remains conservative and quality-gated.
- User-facing Clean for SubD wrapper retains topology validation and rollback.
- Release commit: `68e45845f6696b3e66929ee4b181748b85d99b09`.
- Audited post-release HEAD: `4ed534dfe8697e54921a8a80d7b50945b6792342`.

## v0.36.18.318 — Forty-triangle bounded local retopo

- Extended bounded local triangle-island retopology envelope to 40 triangles.
- Kept conservative patch quality guards and regression tests.

## v0.36.18.317 — Thirty-eight-triangle bounded local retopo

- Extended bounded local triangle-island retopology envelope to 38 triangles.

## v0.36.18.316 — Thirty-six-triangle bounded local retopo

- Extended bounded local triangle-island retopology envelope to 36 triangles.

## v0.36.18.315 — Thirty-four-triangle bounded local retopo

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

## 2026-09-28 — v0.36.18.551 Nomad attribute preservation Phase 2B
- Extended the .550 face-corner preservation pipeline to GLB `TANGENT` and `COLOR_0`.
- Weld and conservative quad reconstruction now carry UV/tangent/colour corner channels together and reject merges that would cross attribute discontinuities.
- Vertex colours restore on Base GLB export while topology remains compatible.
- Tangents restore only while both topology and vertex-position geometry remain compatible, preventing stale tangent vectors after shape edits.
- Added `tests/nomad-attribute-preservation-551.test.mjs`; syntax parse + 13 targeted assertions passed through the repository audit.
- Published runtime pins/version as v0.36.18.551.
- Beta 5 .538 and protected multi-object-transform .1.0 remained untouched.

## 2026-09-28 — v0.36.18.552 Nomad morph/layer preservation Phase 2C
- Extended the face-corner preservation pipeline to morph POSITION deltas exposed by GLTFLoader.
- Morph deltas survive weld + conservative quad reconstruction only where shared-corner values agree.
- Base GLB export rebuilds relative morph POSITION targets when topology remains compatible.
- Original mesh/node morph weights are patched back when target counts match; preserved Nomad extras continue to carry layer metadata.
- Added `tests/nomad-morph-layer-preservation-552.test.mjs`.
- Syntax parse + 8 targeted morph assertions passed before publish.
- Published runtime pins/version as v0.36.18.552.
- Beta 5 .538 and protected multi-object-transform .1.0 remained untouched.

## 2026-09-28 — v0.36.18.553 indexed GLB topology export
- .552 hands-on exposed non-welded GLB output: Nomad subdivision behaved like separate triangles.
- Root cause: export geometry duplicated every triangle corner and had no index buffer.
- Reworked `editableToGeometry()` to deduplicate exported vertices by BoxLab vertex identity plus preserved corner-channel signature and emit `geometry.setIndex(indices)`.
- Real UV/tangent/colour/morph seams remain split; identical corners now share indices.
- Added `tests/nomad-indexed-topology-553.test.mjs`.
- Exporter syntax + 7 targeted indexed-topology assertions passed before publish.
- Published v0.36.18.553; Beta 5 .538 and multi-object-transform .1.0 unchanged.

## 2026-09-28 — v0.36.18.553 hands-on PASS
- User confirmed indexed/welded Base GLB export behaves as connected topology in Nomad.
- Nomad subdivision no longer treats the BoxLab export as separate triangles.
- .553 is now the verified GLB topology checkpoint.

## 2026-09-28 — v0.36.18.554 weighted Nomad morph display + export reconstruction
- User reported sculpt-layer deformation absent when Nomad GLB was imported into BoxLab.
- Found that morph target payloads were preserved but active morph weights were never applied to editable vertices.
- Import now applies GLTFLoader morph influences, transforms morph deltas into BoxLab/world coordinates, and scales morph deltas with the fitted mesh.
- Export subtracts active weighted morph deltas from editable positions to recover the underlying base before writing morph targets/weights back, preventing double-deformation.
- Added `tests/nomad-weighted-morph-554.test.mjs`.
- Syntax parse + 8 targeted weighted-morph assertions passed before publish.
- .553 indexed topology path preserved; Beta 5 .538 and multi-object-transform .1.0 untouched.

## 2026-09-28 — v0.36.18.555 morph weight single-source + UV pole welding
- .554 hands-on: deformation doubled after round-trip although layer weight survived; pole vertices also appeared unwelded.
- Fixed redundant morph-weight restoration by preserving whether the source GLB used node.weights or mesh.weights and writing active weights to that location only.
- Added high-valence UV singularity handling: vertices with 3+ distinct UV corner values ignore UV/tangent in the export weld key, allowing sphere poles to remain connected while ordinary two-sided UV seams stay intact.
- Added `tests/nomad-morph-weight-pole-weld-555.test.mjs`.
- Syntax parse + 10 targeted assertions passed before publish.
- Published v0.36.18.555; Beta 5 .538 and multi-object-transform .1.0 unchanged.

## 2026-09-28 — v0.36.18.556 restore original GLB round-trip scale
- .555 hands-on: welding/poles fixed, but Nomad round-trip object scale remained wrong.
- Root cause: BoxLab import normalises geometry to a size-2 working envelope and export did not reverse that fit transform.
- Import now stores the global fit centre + scale in GLB passthrough.
- Base GLB export reverses the fit transform for POSITION and divides morph POSITION deltas by the same scale before writing.
- Added `tests/nomad-roundtrip-scale-556.test.mjs`.
- Syntax parse + 8 targeted scale-restoration assertions passed before publish.
- .555 morph-weight single-source and pole-weld logic preserved.

## 2026-09-28 — v0.36.18.556 hands-on full round-trip PASS
- User confirmed all .556 checks PASS.
- Original Nomad size/placement restored.
- Sculpt deformation magnitude correct.
- Layer weight retained and adjustable without double deformation.
- Welded topology and pole subdivision remain connected.
- .556 is now the verified Nomad round-trip preservation checkpoint.

## 2026-09-28 — v0.36.18.557 bottom-left selection mode dock
- Began incremental UI/UX pass from verified .556.
- Moved the existing Vertex / Edge / Face / Object selector visually to the bottom-left using safe-area-aware fixed positioning.
- Preserved existing #selectionModes DOM/IDs and all selection-mode logic.
- Increased touch target height to 42px.
- Updated styles cache pin to .557.
- Added `tests/selection-mode-dock-557.test.mjs`.
- Static regression 6/6 PASS.
- No gizmo/gesture logic changed; protected multi-object-transform .1.0 untouched.

## 2026-09-28 — v0.36.18.558 selection mode dock position correction
- .557 hands-on FAIL: selection modes rendered at the very top instead of bottom-left.
- Moved the existing #selectionModes DOM node from header.topbar into #viewportWrap.
- Added viewport-scoped absolute bottom-left positioning with safe-area handling and top/right reset.
- Preserved IDs, buttons and selection-mode logic unchanged.
- Static relocation regression 9/9 PASS.

## 2026-09-28 — v0.36.18.559 runtime-owned bottom-left selection mode dock
- .557/.558 failed because topbar-layout.js reparented #selectionModes back into #commandBar at runtime, causing flashing and breaking topbar composition.
- Restored original header markup and removed the conflicting CSS relocation blocks.
- Changed topbar-layout.js to own the relocation and append the existing #selectionModes node into #viewportWrap instead.
- Runtime style now owns bottom-left safe-area positioning.
- Forced topbar brand visibility so BoxLab/version remain visible.
- Static/runtime ownership regression 11/11 PASS.

## 2026-09-28 — v0.36.18.561 mode dock clearance + no startup flash
- .559 hands-on showed correct bottom-left placement, but the left tool drawer scrolled behind the dock.
- .560 reserved lower viewport clearance for the scrolling left tool drawer.
- User additionally reported one-frame startup flash at the old top/header location.
- .561 hides #selectionModes in its initial DOM location and reveals it only once topbar-layout.js has moved it into #viewportWrap.
- Published CSS/topbar cache pins as .561.
- Syntax/static regression 9/9 PASS.

## 2026-09-28 — v0.36.18.562 bottom Selection dock + top Viewport actions
- Moved the existing Selection panel out of the scrolling left tool drawer and docked it above the bottom-left mode strip.
- Added no-flash relocation for #selectionDrawer.
- Kept Viewport settings in .top-actions beside the top action buttons rather than the second command row.
- Normalized .top-actions button/Viewport summary typography to 13px and 38px control height, covering Frame All / Viewport / Undo / Redo where present.
- Preserved all existing IDs/handlers.
- Syntax/static regression 11/11 PASS.

## 2026-09-28 — v0.36.18.563 Selection drawer restored + empty command row removed
- User preferred Selection in its original scrolling left drawer.
- Reversed only the .562 Selection-panel relocation and removed its no-flash visibility override.
- Kept bottom-left mode dock and top-line Viewport placement.
- Removed the now-empty command/packer row and moved viewport directly below the main topbar, reclaiming 48px vertical space.
- Syntax/static regression 10/10 PASS.

## 2026-09-28 — v0.36.18.564 compact Selection panel sizing
- Standardised mixed Selection panel typography/control heights to the compact UI scale.
- Regular Selection controls now use 12px text and 32px height with consistent padding.
- Selection heading reduced to 12px; symbol-only buttons use 13px for legibility.
- No selection logic changed.
- Static regression 8/8 PASS.

## 2026-09-28 — v0.36.18.565 left tool drawer scroll boundary above mode dock
- Selection had been restored to the original left drawer, but scrolling still passed underneath the bottom mode strip.
- Replaced max-height based clearance with a true bottom boundary on the absolute-positioned left drawer.
- Standard layout bottom boundary: 104px; compact/mobile: 96px.
- Scroll viewport now ends above the mode dock.
- Syntax/static regression 5/5 PASS.

## 2026-09-28 — v0.36.18.566 lower bottom mode dock / reclaim vertical space
- Lowered bottom mode strip closer to the device safe-area edge.
- Reduced left drawer lower clearance accordingly, recovering roughly 20–30px vertical space.
- Preserved safe-area handling, mode behavior and scroll-above-dock behavior.
- Syntax/static regression 7/7 PASS.

## 2026-09-28 — v0.36.18.567 Viewport menu anchored to right edge
- Changed Viewport flyout from trigger-relative absolute positioning to viewport-fixed positioning.
- Menu now opens against the right safe-area edge instead of ~1/4 screen inward.
- Trigger location and viewport functionality unchanged.
- Syntax/static regression 5/5 PASS.

## 2026-09-28 — v0.36.18.568 Viewport ownership fix + far-right placement + compact Facegroups
- Fixed .567 ownership flash by removing Viewport reordering from topbar-layout.js.
- view-modes.js now owns placement from creation and appends Viewport at the far-right of .top-actions.
- Retained right-edge flyout anchoring.
- Normalized Facegroup Viewport controls to compact 32px / 12px sizing with 11px range labels/outputs.
- Syntax/static regression 13/13 PASS.

## 2026-09-29 — v0.36.18.570 Total Gizmo v1 working prototype
- Added isolated src/total-gizmo.js without editing protected multi-object-transform.js.
- Object-mode combined gizmo includes free move, axis move, axis rotate, screen rotate, uniform scale and axis scale.
- Thin visible geometry uses 16px invisible hit strokes for touch/Pencil usability.
- Added hover/active emphasis and live transform HUD.
- Corrected axis templates so X/Y/Z projected move/scale handles align with camera-projected world axes.
- Existing transform strip retained as fallback.
- Added tests/total-gizmo-570.test.mjs.
- Syntax/static regression 13/13 PASS.

## 2026-09-29 — v0.36.18.571 Total Gizmo black-fill bug fix + thinner idle graphics
- Fixed black disc/ring artifacts caused by SVG hit proxies defaulting to black fill after .tg-handle class removal.
- Explicitly set hit proxy fill:none; this also stops proxies obscuring X/Y rotation arcs.
- Reduced idle axis/ring/arc line weights while retaining 16px invisible hit zones.
- Hover/active state still thickens selected handle.
- Syntax/static regression 9/9 PASS.

## 2026-09-29 — v0.36.18.572 Total Gizmo axis handles are intrinsically constrained
- Removed dependency on global Axis Snap for explicit gizmo X/Y/Z handles.
- Total Gizmo now exposes its active constraint; transform-upgrade gives that constraint priority over free/auto snap state.
- X/Y/Z move, scale and rotate handles are intrinsically constrained by the handle selected.
- Protected multi-object-transform pin unchanged.
- Syntax/static regression 8/8 PASS.

## 2026-09-29 — v0.36.18.573 Total Gizmo axis constraint fixed in actual Object drag owner
- .572 failed because transform-upgrade was not the final owner of Object-mode drag movement.
- main.js initializes and applies drag.axisLock for Object/component transforms.
- main.js now seeds axisLock from active Total Gizmo X/Y/Z handle and prevents Axis Snap auto-selection from replacing an explicit gizmo axis.
- Explicit gizmo axis movement is now independent of Axis Snap state.
- Static regression 6/6 PASS.

## 2026-09-29 — v0.36.18.574 legacy X/Y/Z constraints no longer depend on Axis Snap
- Extended .573's explicit gizmo axis-lock rule to the legacy precision X/Y/Z controls.
- main.js now seeds drag.axisLock from active precision X/Y/Z when no gizmo axis handle is active.
- Axis Snap automatic axis choice runs only if no explicit axis is already locked.
- Free/Auto behavior preserved.
- Static regression 7/7 PASS.

## 2026-09-29 — v0.36.18.575 Total Gizmo planar move + interaction refinement
- Added projected XY/XZ/YZ planar move handles.
- main.js now uses true world-plane constraints for those handles.
- Refined ring/arc hit widths to reduce overlap conflicts.
- Segmented rotation arcs improve readability through overlapping geometry.
- Prepublish syntax/static regression 9/9 PASS.

## 2026-09-29 — v0.36.18.576 3D-projected Total Gizmo rotation rings
- Replaced fixed SVG X/Y/Z ellipses with true camera-projected world-space circles.
- X ring uses YZ plane, Y ring XZ, Z ring XY.
- 72-sample projected paths update every frame and respond correctly to camera perspective.
- Front/back ring halves are drawn with different prominence for 3D depth readability.
- Removed dashed-ring workaround.
- Prepublish syntax/static regression 10/10 PASS.

## 2026-09-29 — v0.36.18.577 projected rotation rings visibility repair
- .576 projected rings were not visible in hands-on testing.
- Removed front/back split path generation and DOM-size conversion.
- Rings now render as one full 96-sample camera-projected closed path per world rotation plane.
- Depth fading deferred until basic projected-ring behavior is validated.
- Prepublish syntax/static regression 9/9 PASS.

## 2026-09-29 — v0.36.18.578 projected rotation ring visibility root-cause fix
- .577 rings collapsed because screen-pixel deltas were normalized by the full canvas size instead of the gizmo size.
- Conversion now uses Total Gizmo rendered width/height, restoring intended projected ring radius.
- Projected ring hit proxies are now updated from the same d path each frame.
- Prepublish syntax/static regression 7/7 PASS.

## 2026-09-29 — v0.36.18.579 projected rotation ring visible-path selector fix
- Found that querySelector was updating the transparent hit-proxy path instead of the visible ring path.
- syncRotationRings now targets .tg-handle.tg-arc explicitly and mirrors its d path to the linked proxy.
- Syntax/static regression 4/4 PASS.

## 2026-09-29 — v0.36.18.580 clear stranded Total Gizmo hover/active state
- .579 projected rings passed visually.
- Fixed lingering thick/highlighted state after ring interaction by clearing active/muted/hover-proxy classes on transform finish/cancel.
- Added pointerleave safety cleanup when idle.
- Syntax/static regression 5/5 PASS.

## 2026-09-29 — v0.36.18.581 Total Gizmo precision HUD + adaptive axis detents
- Added adaptive soft move detents for explicit gizmo X/Y/Z movement.
- Detent step is selected from nice increments based on projected pixels-per-unit; catch threshold is screen-space based.
- Added post-drag gizmo HUD persistence and tap-to-enter exact value.
- HUD exact input reuses the existing transformValue/Enter path and transfers the last gizmo X/Y/Z constraint first.
- Free and planar movement remain unrestricted.
- Projected rings unchanged.
- Protected multi-object-transform pin unchanged.

## 2026-09-29 — v0.36.18.582 bottom status lane + Full Screen + iPad Share/Open In
- Reserved a separate bottom status strip under the mode dock.
- Added Viewport > Full Screen with native API plus Safari focus fallback.
- Added dedicated Share / Open In export using Web Share file handoff.
- Normal Export / Save remains available.
- Prepublish syntax/static regression 12/12 PASS.

## 2026-09-29 — v0.36.18.583 transform input focus + Focus View + wider GLB share handoff
- Added explicit iPad touch/Pencil focus behavior to transform numeric input so Rotate/Scale type-in can invoke the keyboard reliably.
- Removed native browser fullscreen path and replaced it with in-page Focus View that preserves the top action row while hiding the left drawer.
- GLB Web Share now uses application/octet-stream with .glb filename to test extension-based iPadOS/Nomad destination discovery.
- Normal save/export path unchanged.
- Prepublish syntax/static regression 9/9 PASS.

## 2026-09-29 — v0.36.18.584 direct exact transforms + Focus View activation fix
- Added direct exact transform API for Move/Scale/Rotate.
- Gizmo HUD now calls exact transform API directly instead of simulating Enter in legacy input.
- Exact Rotate bypasses 15-degree drag snap.
- Hardened gizmo HUD touch/Pencil focus.
- Fixed stale fullscreenBtn branches in Focus View handlers.
- Added synthesized-click suppression so iPad pointerup/click does not double-toggle Focus View.
- Share/Open In unchanged.
- Prepublish syntax/static regression 8/8 PASS.

## 2026-09-29 — v0.36.18.585 direct post-transform input + top-line Focus
- Replaced gizmo HUD text-to-input conversion with an actual visible numeric input immediately after transform release.
- Context placeholders: Distance / Degrees / Factor.
- Exact commit continues to use direct transform-upgrade exact API.
- Moved Focus View from Viewport menu to top action row before Viewport.
- Share/Open In unchanged.
- Prepublish syntax/static regression 9/9 PASS.

## 2026-09-29 — v0.36.18.586 one authoritative transform type-in system
- Removed floating gizmo numeric input after repeated iPad focus failures.
- Added transform-upgrade setContext(tool,constraint) API.
- Gizmo now synchronizes the persistent left transform strip and exact-value field.
- Transform polish refreshes on boxlab-transform-context.
- Focus top-row placement retained.
- Prepublish syntax/static regression 8/8 PASS.

## 2026-09-29 — v0.36.18.587 standalone floating exact-transform input
- Rebuilt floating exact input outside the Total Gizmo DOM/SVG overlay.
- New transformFloatInput is a normal viewport sibling with pointer-events:auto and touch-action:auto.
- It uses the proven transform-upgrade applyExact API for Move/Rotate/Scale.
- Left-panel exact field remains fallback.
- Prepublish syntax/static regression 9/9 PASS.

## 2026-09-29 — v0.36.18.588 unified semantic transform completion event
- Replaced raw pointerup-dependent floating input display with a semantic boxlab-transform-end event.
- main.js, transform-upgrade.js and rotate-transform.js now emit the same completion event from their actual transform owners.
- Total Gizmo listens to that event and opens the standalone floating exact-input palette only for an active gizmo transform.
- Hides old gizmo HUD when floating palette opens, removing duplicate black boxes.
- This semantic event architecture is intended as the baseline for future modeless gesture interaction.
- Prepublish syntax/static regression 9/9 PASS.

## 2026-09-29 — v0.36.18.589 restore proven Move floating exact-input path
- .588 regressed Move floating type-in.
- Restored Move's known-good gizmo pointer-release palette path from .587.
- Rotate/Scale remain on semantic transform-end routing for continued isolation.
- Prepublish syntax/static regression 5/5 PASS.

## 2026-09-29 — v0.36.18.590 Rotate floating type-in isolated
- Confirmed rotate-transform.js does not own Object-mode rotation.
- Preserved .589 Move path unchanged.
- Object-mode Rotate now uses the same proven gizmo release trigger to show floating exact entry.
- Scale intentionally untouched.
- Prepublish syntax/static regression 4/4 PASS.

## 2026-09-29 — v0.36.18.591 direct Object Rotate completion handoff
- .590 Rotate floating palette still failed.
- Removed event/waiting timing from Object-mode Rotate completion.
- transform-upgrade now directly invokes Total Gizmo completeExactEntry() when Object Rotate commits.
- Move path untouched; Scale intentionally untouched.
- Prepublish syntax/static regression 7/7 PASS.

## 2026-09-29 — v0.36.18.592 Rotate floating input captured before document transform owners
- Identified document-capture ordering as the reason Rotate completion never reached Total Gizmo.
- Moved Total Gizmo pointerup listener to window capture so it runs before transform-upgrade's document-capture stopImmediatePropagation.
- Move and Rotate use this early release path; Scale unchanged.
- Prepublish syntax/static regression 4/4 PASS.

## 2026-09-29 — v0.36.18.593 Scale added to proven window-capture floating type-in
- .592 Rotate floating type-in hands-on PASS.
- Added protected pointer capture/ownership guidance to AI_WORKFLOW.md.
- Scale now uses the same window-capture release path as working Move/Rotate.
- Move and Rotate logic otherwise unchanged.
- Prepublish syntax/static regression 4/4 PASS.

## 2026-09-29 — v0.36.18.594 gizmo soft Rotate/Scale detents
- .593 full floating type-in hands-on PERFECT.
- Added gizmo-only soft angle detents: 0/5/15/30/45/60/90/120/135/180 degrees.
- Added gizmo-only soft scale detents: .25/.5/.75/1/1.25/1.5/2/3/4.
- Existing HUD provides live value feedback; caught values are marked “detent”.
- Legacy transform behavior and .593 exact-entry path unchanged.
- Prepublish syntax/static regression 7/7 PASS.

## 2026-09-29 — v0.36.18.595 owner-correct gizmo Rotate/Scale detents
- .594 hands-on showed Scale detents absent and Rotate still governed by legacy 15° snap.
- Added explicit global Total Gizmo drag ownership state.
- Rotate now uses gizmo soft catches independently of the legacy 15° snap.
- Moved Scale detent maths into main.js, the actual Scale gesture owner.
- Move and .593 exact-entry paths unchanged.
- Prepublish syntax/static regression 9/9 PASS.



## 2026-10-04 — v0.36.18.706 Face radial Merge by Distance

- User confirms .705 full manual list PASS; arbitrary-plane Align now protected. .702/.703/.704 pending checks retained.
- Audited existing .41 welding owner, .135/.137 whole-object safe-cluster scanner and .145 Face Repair proxy. Added one active outer Merge Dist sector and top-centre distance/whole-object Apply/Cancel settings through existing repair panel; no mode hop or parallel kernel.
- Scanner accepts optional exact tolerance, old selection-only caller unchanged. Existing owner exposes explicit applyFor/result/mesh guard; default Vertex results/Multi retained. Combined individually safe clusters are validated together before mutation. History adds one successful snapshot, none on rejection/rollback. Face success clears stale IDs and returns fresh-puck lifecycle; Cancel preserves geometry/selection.
- Eight inner unchanged; fifteen outer at 220px/24 degrees; no outer/outer or outer/inner rectangle overlap. Fixed disabled-Vertex-target dispatch for scoped Face Merge so launch can edit tolerance with no current candidates. Protected Align/transform/Loop Cut untouched.
- 55 targeted checks PASS; full suite 1139 tests, 854 PASS, identical 285 failure names to .705, no new failures. Syntax/diff checks PASS. All .706 markers and changed dynamic child/parent pins updated.
- Next: .706 hands-on confirmation, finish Face active-tool/settings inventory, then Vertex → Object → final Edge. No selection commands, broad gestures, strengthening or wholesale drawer removal.


## 2026-10-04 — v0.36.18.707 Face radial Bevel

- User requests Edge Bevel from Face selection; .706 hands-on remains pending, no implied PASS.
- Audited direct-bevel/selection-hub-bevel-session and existing bevel selection/perimeter routing/face-region boundary owner. Added Face Bevel sector and shared top-centre Width/Segments/Apply Exact/Cancel; no duplicate kernel, new pointer owner or mode hop.
- One Face boundary or simple connected selected region outside boundary maps to existing Edge IDs; excludes internal shared edges and validates through existing engine. Current topology limits retained; disconnected/no-boundary/open/unsupported sets unavailable.
- Existing direct controller's capture handlers now own Face picking/preview/commit/cancel; same horizontal width/segments maths and generalBevelSelection. Face context/lock guards, snapshot rollback, restored capture/navigation controls, one successful History step, cleared stale Face IDs and semantic completion/fresh puck. Cancel preserves original selected Faces; popup capture cannot prematurely disarm Face exact apply. Protected Edge paths covered with actual integration tests.
- Eight inner unchanged, sixteen outer at230px/22.5°; no button rectangle overlap. 56 targeted tests PASS; full suite1149 tests/864 PASS, identical285 failure names to .706; no new failures. Syntax/diff PASS. Release/changed owner/session/gizmo pins .707; protected topology/transform/frozen betas unchanged.
- Next: hands-on .707/pending .706; finish Face inventory/settings → Vertex → Object → final Edge. No unrelated work or selection helpers in rings.


## 2026-10-04 — v0.36.18.708 Face Bevel blue slider preview / early owner

- User reports .707 horizontal drag moves Face, requests Shell/Solidify-like slider preview. No PASS; screenshot version absent. Verified current main/live manifest/shell/pins .707 first.
- Audited main component Move fallback and document-vs-canvas capture ordering. Moved Face-only dispatch to window capture within same direct-bevel handlers; Edge remains canvas-only. Added narrow main active-Face-Bevel fallback guard. Touch/background navigation passes; Pencil contact on selected Face owns drag. No parallel gesture/modelling kernel.
- Snapshot candidate goes through existing Edge bevel kernel; new rendering-only helper matches Shell/Solidify blue fill/wire color/opacity/depth/render-order. Source untouched on launch/sliders/Pencil. Release keeps preview; explicit Apply Bevel commits one history step and clears stale Face IDs. Cancel/context changes dispose preview, preserve source/selection. External geometry/crease/loose changes invalidate candidate rather than overwrite source; failures remove stale preview/report reason/disable Apply.
- Preview geometry/material disposal tested; slider updates only on input/change, no per-frame regeneration. Existing Shell/Solidify owners, bevel kernels, ring/layout, protected transform/Loop Cut unchanged. .707 Face drag tests updated for revised explicit-Apply UX.
- 60 targeted tests PASS; full suite1153 tests/868 PASS, identical285 failures by name to .707. Syntax/diff PASS. .708 markers and changed direct/helper parent/main/session/refresh pins updated.
- Next hands-on .708; if drag still fails on confirmed version, Gesture Debug before speculation. Pending .706 and radial Face → Vertex → Object → final Edge sequence retained.


## 2026-10-04 — v0.36.18.709 first Vertex radial pair

- User confirms .708 full manual list PASS; Face Bevel blue slider/Pencil preview, explicit Apply/Cancel, puck/history/navigation protected. Older pending repair builds not implicitly passed.
- Audited Face action/settings inventory: 24 modelling/repair tools exposed, contextual parameters present; Through is already automatic single-Face inward Extrude, no separate settings or new sector. Inspect/selection/appearance excluded. Drawer fallbacks/pending repairs/final ring placement retained.
- Started Vertex with existing .513 Merge to Center / Merge to First. Same authoritative button validation, chronological selection, geometry/compaction/Multi/history; no duplicate modelling or pointer owner. Vertex puck/transform-centre now opens two-sector ring and centred ×. Read-only guard, disabled state and mode guards; one-shot suppression cleanup returns selected result puck. Existing Face/Edge ring markup unchanged.
- 30 targeted PASS; full1158 tests/873 PASS, identical285 failure names to .708, no new failures. Syntax/diff PASS. .709 shell/manifest/main/refresh/gizmo pins current; protected files/kernels/frozen betas untouched.
- Next confirm .709 and audit next Vertex active-tool pair/settings, then Object → final Edge. No selection proxies, unrelated gestures or bulk drawer removal.

## 2026-10-04 — v0.36.18.710 complete existing Vertex radial coverage / Bevel consistency

- User explicitly requests all currently existing Vertex Active Tools in one build, then a combined test/refinement session. .709 not implicitly passed; .708 Face Bevel remains protected.
- Inventory audited from index/late Active Tools/Repair owners: Add, Build Edge, Bevel, Slide, Join, Weld, Create Face, Delete, Circle, Merge Center, Merge First, Merge by Distance, Clean Vertices. Selection diagnostics excluded; Align belongs to Selection controls and no new Vertex Extrude introduced.
- Eight inner at82px; five outer at145px/72 degrees. All thirteen existing targets exposed; shared centred ×. Outer/outer and outer/inner rectangles audited. Inner geometry unchanged.
- User's Bevel slot unified to inner90° in all modes. Face Knife moves135°, Duplicate180°, Extract to former outer Bevel337.5°. Edge Slide45°, Bevel90°, Crease135°. Other Face/Edge targets and session owners unchanged.
- New top-centre vertex-tool-viewport-session proxies existing owners: Add/Build Done, Bevel Width/Exact/Apply/Cancel, Slide signed exact/Done, explicitly selected-only Merge tolerance/Apply/Cancel, explicitly whole-object Clean Apply/Cancel. No duplicate kernel/new raw viewport pointer owner. Original .162 Slide rail math/eligibility preserved.
- Actual owners expose needed busy/disarm/result/semantic completion APIs. Add/Build teardown releases capture; Add Done selects last added vertex, superseding stop preserves selection. Vertex Bevel cancelled drag retains selection; contextual completion disarms. Slide owner semantic completion survives stopped propagation; context-loss rollback retains pre-existing first-move history timing, so no zero-history claim for interrupted Slide. Busy blocks modal Apply/Done.
- One-shots reuse native/late-loaded buttons; suppression cleared for result puck or fresh tap, including native Join → Edge and Create Face → Face handoffs. Read-only/context/mode guards and drawer fallbacks retained.
- 41 targeted actual-owner/inventory/placement/history/gesture/lifecycle/protected nearby checks PASS. Full1169 tests/884 PASS, identical285 failure names to clean .709 baseline; no new failures. Syntax/diff PASS. Markers/changed direct/dynamic child/parent/main/refresh pins .710; protected multi-object/Loop Cut kernels/frozen betas untouched.
- Next: combined .710 hands-on test/refinement, then Object → final Edge. Earlier .692/.702/.703/.704/.706 pending checks retained; no unrelated gesture/strengthening or bulk drawer removal.


## 2026-10-04 — v0.36.18.711 complete Object Active Tools radial coverage

- User confirms .710 Vertex radial AWESOME / PASS; protected complete13 tools/settings/lifecycle and Face/Edge/Vertex shared Bevel90° slot. Requests ALL Object Active Tools in one build before combined testing.
- Audited index and dynamic owners: ten launchers Transform/Insert/Solidify/Array/Boolean/Join/Symmetry-Bisect/Mesh Health/Revolve Profile/Clean for SubD. Outliner/Selection/Origins/Pivots/Groups/Modifiers remain outside Active Tools; conditional Sweep editor keeps existing creation via Add.
- Eight inner sectors120px/86px; two outer195px. Gizmo centre opens rings, centre × returns existing gizmo. Original Object immediate transform and .682 background routing retained. Component rings/owners unchanged.
- UI-only object-radial-session proxies real launcher buttons and owner cancel APIs. Shared tool-session-ui docks original Object controls top-centre, bounded/scrollable; all child controls/listeners retained, original parents restored on exit. Face clients keep existing host to avoid duplicating their protected viewport proxies. Conditional Object Sweep also docks without new launcher.
- Boolean retains Multi/operand Swap and operation controls; surface Transform/Insert retains face-to-face cycle/Apply/Cancel; all preview/settings/report panels retained intact. Object gizmo hidden for competing sessions, retained for Symmetry/Revolve plane placement. One-shots/session completion clears stale suppression, mode/lock/Multi guards. No new modelling/history/raw-pointer owner or protected multi-object-transform changes.
- 32 targeted PASS including actual Solidify/Array owner previews and cancel cleanup with unchanged source, full-session dock/restoration/handoffs and nearby protected Face/Vertex. Full1181/897/284, no new failure names versus clean .710; historical376 Solidify session-pin check now passes. Syntax/diff/protected owner checks PASS. Manifest/shell/main/refresh/new adapter/shared session/gizmo pins .711; unchanged owner pins retained.
- Next combined .711 Object hands-on testing/refinement, then final Edge inventory/settings. Keep drawer fallbacks and earlier pending checks; no unrelated gestures/topology or bulk removal.


## 2026-10-04 — v0.36.18.712 wide tool popouts / gizmo corner shortcuts

- User provides visible .711 Symmetry/Array screenshots and layout sketches; no full Object PASS. Explicitly requests all top tool panels wide/shallow, Cancel/Apply stacked right, and coordinated gizmo redesign in one session. .710 Vertex remains protected.
- Audited shared top-centre dock, all15 import clients, original terminal controls, frame/focus/history/Multi owners and centre transform routing. Added UI-only wide layout helper through shared dock: original controls/nodes/listeners/IDs/delegated ancestry retained, two-column body/right rail, compact Symmetry plane row and Array direction/count. Responsive bounds/scrollable findings; staged Apply follows original hidden ancestors and lazy operand/report nodes rejoin body. Hidden roots cannot reveal stale drawer settings. Object host lays out after inserting node; protected Face source hosts remain unchanged.
- Centre menu hotspot removed; existing free Move handle enlarged14px, non-interactive centre dot; free Rotate ring unchanged. Top-left radial icon, top-right Focus/Frame All, bottom-right Undo/Redo arrows, bottom-left Object Multi. Separate40px actions/labels/pressed states, actual toolbar owners, busy/disabled/mode guards. Corner clusters bounded to viewport without moving selection pivot. No new viewport pointer owner, transform/Multi/history state or modelling kernel.
- 41 targeted PASS: actual Symmetry/Array markup/control identity/listeners, stage/lazy-content/hidden-root layout, shortcuts/guards, centre wiring/bounds/pins and protected nearby sessions. Full1190/906/284, identical failure names versus clean .7111181/897/284; no new failures. Syntax/diff/protected owners PASS. All release markers and changed dock import graph/new helper/gizmo pins .712; protected multi-object-transform1.0 and modelling owners/frozen betas unchanged.
- Next combined .712 iPad visual/tactile refinement; Object coverage already present, then final Edge inventory/settings. No .711/.712 PASS inferred; keep drawer fallbacks/earlier pending tests.


## 2026-10-04 — v0.36.18.713 complete Edge Active Tools radial coverage

- User .712 AWESOME PASS recorded/protected: wide popouts, gizmo centre/corners, Object tools. Final Edge inventory requested; all eleven reported gaps confirmed against index and dynamic owner modules. Existing nineteen Active Tools now connected; no selection commands/new kernels.
- Inner Extrude/Slide/Bevel/Crease/Offset/Bridge/Sweep/Delete; outer Circle/Join Coplanar/Loop/Split/Uncrease/Fill Face/Grid Fill/Dissolve/Dissolve Loop/Flip Edge/Collapse. Actual target disabled state retained; one-shot suppression/result-mode handoffs cleared.
- UI-only Loop/Split session forwards existing Loops/Loop Slide controls with wide top-centre Done. Completed work retained; main busy/finish API changes tool state only, no topology/history rewrite. Context loss/superseding sessions disarm owners, busy prevents mid-drag Done. Protected .688 logical-quad/.162 core and .632 commit path/pins unchanged.
- Edge Sweep reuses existing staged proxy and launch-mode semantic completion, preserving Face behavior. Shared angular/tier placement aligned across modes (Circle0 outer, Join Coplanar22.5 outer, Slide45 inner, Bevel90 inner, Bridge225 inner, Sweep270 inner, Clean270 outer, MergeDist315 outer). Face Shell moves outer225/Quad Cleanup180; Vertex Build135 and larger230 outer radius avoids Clean overlap. Object ring unchanged.
- 46 targeted PASS for complete inventories/placement/lifecycle and protected nearby Vertex/Object/Face. Full1195/911/284, same failure names as .7121190/906/284. Historical inventory/shared graph assertions updated for requested layout; stale Solidify session release-number assertion now checks retained actual .712 session owner. Syntax/diff PASS; protected kernel/transform/frozen beta files unchanged.
- .713 markers and changed module/parent/main/refresh pins updated; unchanged owners retain protected pins. Next visible .713 combined Edge hands-on test; no PASS inferred, keep drawer fallbacks and earlier pending repair checks.


## 2026-10-04 — v0.36.18.714 Object List gizmo shortcut in Focus view

- User requests Object List on/off beside Multi, especially with Focus drawer hidden. Audited original Objects details/outliner/retain and Focus owner. Reuses original node, controls/listeners/delegation; no cloned outliner or new selection/history/Multi owner.
- Object-only bottom-left list icon with pressed/busy state next to Multi. view-modes owns temporary Focus Objects-only reveal; Focus stays active, other drawer sections remain hidden. Second tap hides/reinstates prior disclosure state; leaving Object mode or toggling Focus clears reveal. Non-Focus toggles original Objects disclosure.
- 29 targeted PASS for actual Focus/list owner toggle/restoration/mode transitions, shortcut position/state/cache graph and nearby protected radials. Full1198/914/284, same failure names as .7131195/911/284. Syntax/diff PASS. No modelling/protected transform/Loop/frozen-beta changes.
- .714 release markers/direct view-modes/helper/parent gizmo/main/refresh pins updated. .713 Edge hands-on still pending; no PASS inferred. Next confirm visible .714, test list in Focus, existing list actions/Multi and exit cleanup, then pending Edge checks.


## 2026-10-04 — v0.36.18.715 persistent Edge Loop / Bevel EXACT

- User .714 PASS recorded/protected. Requests Loop Slide takeover/EXACT/repeated cuts and Bevel drag or sliders/EXACT/repeated selections; background exit for both.
- Radial Loop skips automatic release finalization, retains existing private slide rail. Count/Slide controls alternate with rail availability; EXACT uses existing commitLoop wrapper and keeps panel/main tool armed. Session adopts commit owner's internal Undo/Redo mesh replacement. Another edge retains placed geometry and adds next cut through unchanged main/.688/.162 core; background tap finalizes latest rail and exits. Non-radial auto commit preserved; Split Done unchanged.
- Existing Edge Bevel owner gets radial-only persistent flag. Drag still commits once; EXACT uses live selection/current kernel, clears consumed IDs, keeps armed. Stationary tap selects for exact; cancelled preview restores source/IDs and capture/navigation. Context/lock/mesh loss closes, busy blocks exact/background close. Face blue preview/Apply/Cancel and ordinary Edge one-operation disarm retained. No parallel kernel or raw background gesture owner.
- Main background/Pencil semantic routing reused; Loop miss participates in existing tap-vs-navigation tracker. Bevel/Loop completion resets hub and hides competing gizmo while sessions active. Shared presentation recognizes EXACT in right action rail; import-only cache graph repinned .715.
- 50 targeted PASS including real Loop commit/history fixture and actual Edge Bevel repeat/drag/cancel/stationary/history, Face regression and shared dock/nearby radial checks. Full1204/920/284, identical failure names versus .7141198/914/284. Earlier two radial bevel completion expectations updated for explicitly requested persistence. Syntax/diff PASS; protected multi-object-transform/Loop topology/frozen betas unchanged.
- All release markers/direct/dynamic-parent/shared/main/refresh pins current. Next visible .715 manual repeat and background exit, navigation/history and Face/Object regressions; no broader Edge PASS inferred, drawer fallbacks retained.


## 2026-10-04 — v0.36.18.716 scoped Face blue preview / compact Boolean

- User .715 PASS recorded/protected. Requests blue only around affected connected Faces and compact Object popup matching sketch. Screenshot visibly .714 treated as layout reference.
- Existing rendering-only Face bevel helper compares candidate/source polygon coordinate signatures; unchanged polygons/other shells excluded from blue fill/wire. Lightweight render view, same candidate geometry/kernel/Apply/Cancel/history, original resources disposed. No preview geometry mutation or new modeling owner.
- Boolean-specific shared presentation CSS arranges original A/B/Swap above original Union/Cut/Intersect, Close right; compact padding/title, operand truncation and lazy insertion order. No node replacement/handler/operation/selection changes; other panel styles preserved.
- 51 targeted PASS including actual Face preview excluding remote shell/unchanged source/no history, existing Face/Edge repeat sessions and original dock/Boolean controls. Full1205/921/284, identical failure names versus .7151204/920/284. Syntax/diff PASS; protected modeling/Loop/multi-object-transform/frozen betas unchanged.
- .716 shell/manifest/helper/direct parent/shared import graph/main/refresh pins updated. Next visible .716 affected-region preview and Boolean compact hand checks; keep other Edge pending checks/drawer fallbacks.


## 2026-10-04 — v0.36.18.717 first-selected Object Multi gizmo

- User requests retaining gizmo on first selected object for radial Boolean access. Audit found Total Gizmo's membership read targeted a nonexistent manager selectedObjects API; active-mesh-only hit test misclassified inactive operands as background.
- Presentation uses authoritative ordered selection Set; active anchor uses live mesh, inactive anchor uses original object mesh; removal falls to next surviving visible selection. Empty Multi hides gizmo, membership changes restore access. No duplicate selection state or transform/pivot changes.
- Extracted existing nearest visible Object scene picker into reusable manager API; activation retains tolerance/stopEvent behavior. Gizmo hit checks and Pencil background semantic use it so inactive operand taps retain tools, genuine background still dismisses/re-tap restores. No new pointer owner.
- 33 targeted PASS; full1210/926/284, identical failure names versus .7161205/921/284. Updated existing touch activation/cache tests for shared picker/current gizmo pin. Protected multi-object-transform1.0 and modelling/Boolean/frozen-beta owners untouched.
- .717 markers/main/refresh/gizmo/Object manager pins updated; .716 preview/layout included and still pending manual PASS. Next visible .717 Multi first-object retention, radial Boolean/Swap/results/history, Focus list/background/navigation and .716 visuals.


## 2026-10-04 — v0.36.18.718 viewport Multi repair / viewport controls

- User reports viewport Multi failure after .717, browser selection works. Audit found window/document transform consumers ahead of canvas activation. Existing Object owner registers early, routes Multi down at window capture; touch completion/tracking/cancel at window capture preserves Orbit cleanup and guards navigation/multi-touch. Transform-upgrade rejects raw Multi/true background, protected multi-object-transform1.0 unchanged. .717 ordered gizmo anchor retained.
- Original top action buttons use shared gizmo icons/hover/accessibility labels; Focus updates icon-safe tooltip/pressed state. Viewport renamed VIEW. Original Axis/Geometry checkbox labels and lazy Lasso button move into SNAP strip above unchanged mode buttons; no cloned controls/selection state. Lasso disarms actual transform owner, Multi activation defers to armed Lasso.
- Helper receives existing confirmed background semantic only, no pointer listeners. First tap clears components immediately (Object actual selection retained, gizmo dismisses as .682); second nearby tap within360ms inverts original selection via actual component/Object owners. Mode/active/mesh/current selection/time/distance guards; excludes sessions/Lasso.
- Minimal-drawer audit recorded in handoff: active modelling tools covered; modifiers, advanced selection depth/filters, bulk Object selection controls remain drawer-dependent. Object List retains management/Origin/Pivot/Groups, but empty selection loses gizmo list shortcut. Do not remove drawer/default-hide until remaining access is decided.
- 61 targeted PASS including actual Object early owner with competing listener boundary, original toolbar node/listener retention/shared icon markup, original selection seed inversion/context rejection, Pencil/Multi gizmo and Face/Edge sessions. Full1215/932/283; no new failure names versus .7171210/926/284; historical425 pin check now passes. Syntax/diff/protected files checked.
- .718 markers/changed runtime/dynamic parent/refresh pins current. .717 viewport FAIL recorded; .716 visuals pending, no new PASS inferred. Next combined iPad .718 UI/selection/Multi/Boolean/navigation test and earlier .716 visuals.

## 2026-10-04 — v0.36.18.719 Lasso background cancellation / Invert release ownership

- Continued main .718 `ad11f377` from repo handoff. Latest user reports: Lasso stays armed after background deselection; double-background Invert does not work. No .718 manual PASS inferred.
- Main's existing background completion owner now disarms stationary Lasso before original single-clear/seeded-Invert. Actual Lasso drawing owner exposes busy state and emits existing background semantic for stationary empty-space completion after ending claim/releasing capture. Mesh hits, drawn paths and pointercancel stay excluded; drawing selection/depth math unchanged.
- Confirmed duplicate completion path: early Pencil/Object semantic plus later canvas release could count one tap twice and clear a second-tap inverted result. Existing completion deduplicates pointer IDs until next task. Do not use microtask expiry: browsers can drain microtasks between native event callbacks. No new raw-pointer owner, selection state, picker, modelling or history implementation.
- Four new actual-owner VM regressions cover component/Object duplicate delivery, correct original-seed complement, drawing/mesh/session guards, Lasso release/cancel/navigation reset. Full1219/936/283 versus clean .7181215/932/283: identical failure names, no new failures. Syntax/diff/protected-file checks pass. Existing .425 cache assertion now checks intentional unchanged transform-upgrade .718 pin rather than requiring every release to repin it.
- Shell/manifest/main/Lasso child/drawer parent/release-refresh pins .719; protected multi-object-transform1.0, Loop topology/slide owners, frozen betas untouched. Handoff/checklist/roadmap updated. Next visible .719 iPad Lasso tap cancellation, single-clear/double-original-complement, viewport Multi/Boolean and navigation; .716/.713 checks remain pending. Keep drawer fallbacks.

- Publication authorization follow-up (2026-10-04): user explicitly states “ALWAYS authorised to publish”. Standing BoxLab release authorization recorded in AI_WORKFLOW.md and handoff; .719 implementation prepared as local commit `f77b30d8`; shell push lacked credentials, so publication uses the authenticated GitHub connector.

- User build protocol clarified (2026-10-04): `/nextbuild` means continue build, update repo and publish Pages. Always finish by updating handover/history and reporting ready for testing. Recorded in AI_WORKFLOW.md and AI_HANDOFF.md.

## 2026-10-04 — v0.36.18.720 Edge Lasso ownership / native double-tap timing

- User .719 Edge background clear/Lasso cancellation still FAIL; double Invert timing wrong. No .719 PASS inferred.
- Actual Edge Paint can arm before lazy Lasso and consume move events, leaving Lasso gesture unfinished. Existing Edge Paint now yields pending claims while Lasso is armed. Main's existing background tracking/completion relocated to non-consuming window capture, before canvas consumers; no parallel pointer listener/selection implementation. Primary/contact/movement/duration/cancel guards retained; Face blue Bevel ownership excluded.
- Lasso arming disarms idle main direct tools via guarded public UI lifecycle API; busy drags remain protected. Component mesh-hit checks reuse original bridge picker alongside mode-scoped Object picker. No topology/history/nav maths changes.
- .719 timer-based release deduplication was insufficient for Safari callback timing. Pointer release native timestamps now forwarded through Pencil/Object/Lasso semantics and used for duplicate identity and Invert timing. Same-pointer next release accepted without waiting for timer; second release within500ms/32px complements original seed once. Context/mesh/current-selection guards retained; negative time rejected. Main Gesture Debug logs DOWN/BLOCKED/COMPLETE for next on-device diagnosis if needed.
- Seven new actual-owner/timing regressions plus updated previous ownership fixtures: 38 targeted PASS. Full1226/943/283 versus clean .7191219/936/283, identical failure names/no new failures. Historical tests updated where capture-owner location changed; no modelling expectations weakened. Syntax/diff/protected owner checks pass.
- .720 shell/manifest/main/helper/Pencil gate/Multi/Lasso child/drawer parent/Edge Paint/refresh pins updated. Protected multi-object-transform1.0, Loop topology/slide/commit and frozen betas unchanged. Next visible .720 Edge background Lasso clear/disarm, double Invert timing, drawing/navigation/Multi/Undo checks; keep drawer fallbacks and earlier pending checks.

## 2026-10-04 — v0.36.18.721 Object List Modifiers / Invert diagnostics

- User .720 checks1/3 pass: Edge background clear/Lasso disarm, Lasso drawing and finger navigation. Pencil drawing/finger navigation while Lasso armed is intended. Slight Lasso selection tightening deferred MUCH LATER at final perfection; preserve current working ownership/math. Double-background Invert remains FAIL; no complete .720 PASS inferred.
- Existing Modifiers was already below Objects but Focus reveal hid it. Original Focus/Object List owner now exposes both original drawers, closes Modifiers on every opening, restores previous disclosure states on Focus close/mode exit/Focus exit. Normal-view list opening also collapses Modifiers. CSS/layout/disclosure only; original Mirror/SubD/Cage control nodes, listeners, IDs and modelling/history remain unchanged; other drawer children hidden in Focus.
- Invert behavior deliberately unchanged pending device evidence. Existing matcher adds optional diagnostic-only trace with first/match/time/distance/context/mesh/selection rejection and timing/counts; existing main resets are labeled. Gesture Debug BACKGROUND DOUBLE TAP plus DOWN/BLOCKED/COMPLETE will identify why the real second tap is rejected. No new pointer listeners/selection state/timing changes. Next user action: enable VIEW Gesture Debug, double true-background tap after component selection and capture screenshot before choosing next fix.
- 21 targeted PASS including original Modifiers disclosure/restoration, matcher trace invariance and working .720/.719 owners. Full1228/945/283 versus .7201226/943/283, identical failure names/no new failures. Syntax/diff/protected-file checks pass. Working Lasso/Edge Paint/Pencil/Multi/Loop/frozen beta files unchanged.
- .721 shell/manifest/main/helper/view-modes/release pins current. Handoff/checklist/roadmap updated; next visible .721 Modifiers controls and debug screenshot. Keep pending .716/.713 checks and drawer fallbacks.


## 2026-10-04 — v0.36.18.722 persistent background-tap diagnostics

- User .721 screenshot shows Pencil orbit/hover activity flooding Gesture Debug; no visible double-tap decision, so it cannot establish the Invert rejection reason. Invert remains unresolved; .720 working Lasso cancellation/drawing/finger navigation protected.
- Existing debug panel pins last six BACKGROUND entries in a blue section, suppresses repetitive PEN HOVER SWALLOW / PEN ORBIT MOVE FORWARD, retains contact/ownership logs. Clear and disable/re-enable reset both sections. Diagnostic presentation only; matcher/main/Lasso/Edge Paint/Pencil/Multi owners unchanged.
- 8 targeted PASS including 1500 noisy events, bounded/reset panel and retained contact logs. Full1231/948/283 versus .7211228/945/283: same failure names, no new failures. Syntax/diff checks pass. Protected transform1.0/Loop/frozen betas untouched.
- .722 shell/manifest/debug/refresh pins current. Next: select two edges, two quick true-background taps with one finger, screenshot blue BACKGROUND section; repeat Pencil separately. Original Modifiers hands-on checks remain pending.


## 2026-10-04 — v0.36.18.723 retain physical double-tap contact evidence

- .722 screenshots show first/clear with original two-face seed and intervening mesh-hit resets, but do not establish why second tap fails. DOUBLE TAP is a detector label; reason=first means unmatched contact. Earlier time rejection was1030ms. Do not blame user technique or assume Pencil side tapping. Audit corrected mistaken6px threshold claim: main is8px, consistent with Pencil. No timing/movement change justified yet.
- Read-only window-capture debug observer pins four physical viewport down/up/cancel records in amber above existing six blue background decisions. Native timestamp/coordinates/primary/buttons/pressure survive noisy logs and reveal whether both contacts arrive. No consuming methods, capture claims, selection or navigation mutation; disabled observer returns. Existing gesture/matcher owners unchanged.
- 10 targeted PASS, including bounded/reset evidence and actual passive early observer behavior/target filtering/disabled no-op. Full1233/950/283 versus clean .7221231/948/283: identical failure names, no new failures. Syntax/diff/protected owner checks pass.
- .723 shell/manifest/debug/refresh pins current. Handoff/checklist/roadmap updated. Next immediate amber+blue screenshot after two screen taps on background; Invert remains unresolved, original Modifiers device checks pending.


## 2026-10-04 — v0.36.18.724 background hold Invert replaces double tap

- User explicitly requests testing long background press: short tap clears/disarms Lasso, hold inverts current selection. Retired double-tap from live main; old matcher module remains historical and disconnected. .723 screenshots revealed movement rejection/single completions but did not establish failed pair cause; no speculative delay/radius change.
- Existing main background owner starts500ms timer for real primary contact on true background. Inverts original current component/Object set once using existing owners; Lasso stays armed. Native release/semantic dedup prevents release from clearing result in either delivery order. No new pointer owner, modelling/history or navigation implementation.
- Existing8px movement guard, secondary contact/multitouch, pointercancel, navigation and blur cancel; context/active-object/mesh/selection/session guards protect delayed callbacks. Pencil hover excluded, busy tools/blue Bevel/contextual Done remain protected. Double short taps now just clear; Object short-tap selection contract retained.
- 24 targeted PASS including actual hold owner, both release orders, Lasso retention, cancellation/context changes, original Object complement, real Pencil contact and blur; nearby Lasso/Edge Paint/debug/session checks pass. Full1237/954/283 vs clean .7231233/950/283: identical failure names/no new failures. Updated historical main-owner expectations for retired doubletap and session fixture release prefix. Syntax/diff/protected files checked.
- .724 main/shell/manifest/debug/refresh pins updated. Handoff/checklist/roadmap current. Next iPad finger/Pencil tap vs hold, release retention, armed Lasso, navigation/history; Modifiers manual test and prior pending checks retained.


## 2026-10-04 — v0.36.18.725 GEO vertex/edge/face icon

- User .724 PERFECT/PASS recorded: protect background tap clear/Lasso off and500ms hold Invert/release retention; failed double-tap superseded. Next user priority before Beta6 is GEO icon clarity.
- Existing toolbar GEO icon now shows distinct left-to-right solid dot, diagonal line and lightly filled rectangular face. Original snapping checkbox/listener/state/tooltip retained; no behaviour changes. Child toolbar and topbar parent cache keys refreshed, shell/manifest/refresh markers .725. Main stays .724; protected modelling/gesture owners untouched.
- Five existing viewport control checks PASS; syntax/diff checks pass. Small visual edit does not justify full-suite rerun; last .724 full1237/954/283 retained as baseline. Next visual/toggle sanity check, pending Modifiers access/actions and drawer/radial audit towards Beta6. Handoff/history/checklist updated.


## 2026-10-04 — v0.36.18.726 VIEW Object List without selection

- User resumes Beta6 build after GEO icon. Drawer audit confirms empty Object/Multi selection hides gizmo and its only Focus list shortcut. Add VIEW Object List action under Objects & Modifiers to close this access gap.
- Reuses authoritative __boxlabObjectListViewport and original Object mode button when invoked from component mode; original Objects and collapsed Modifiers panels, controls and restoration retained. Successful action closes VIEW; active sessions/direct modelling or unavailable drawer/mode guard changes. iPad pointerup and existing synthetic-click suppression prevent duplicate toggle; mouse uses same action. No selection/management/history implementation duplicated.
- 12 targeted PASS including original drawer restoration, selection-independent action, original mode switch, busy/missing-owner guards and actual pointerup+click suppression. Full1240/957/283 vs clean .7251237/954/283: identical failure names/no new failures. Syntax/diff/protected-owner checks pass; original modelling/gesture files untouched.
- .726 view-modes/shell/manifest/refresh pins current, passed main .724 and toolbar/topbar .725 pins retained. Handoff/history/checklist/roadmap updated. Next Focus empty-selection access/Modifiers and component-to-Object hand tests. Remaining advanced selection/depth/filter and bulk Object audit, then combined Beta6 regression; drawer stays available. .725 visual check pending; .724 user PASS preserved.


## 2026-10-04 — v0.36.18.727 viewport Visible/Through selection depth

- User .726 PASS /nextbuild: preserve original VIEW Object List access. Next drawer gap is paint/Lasso depth hidden in Focus.
- Move original #paintSelectDepth group into viewport strip alongside snapping/Lasso. Same Visible/Through nodes, IDs, handlers and active state; original paint/Lasso owners still read/update it. Compact scoped flex styling overrides drawer display:contents. No duplicate selection implementation, geometry/depth maths, pointer owners or modelling changes.
- 27 targeted PASS including reparented depth button identity/listeners and nearby actual Lasso/background hold/Edge Paint/Object List owners. Syntax/diff pass. Presentation-only relocation does not justify full rerun; last .726 full1240/957/283 retained. Protected main .724/Loop/Pencil/Multi/selection owners/frozen files unchanged.
- .727 toolbar child/topbar parent and shell/manifest/refresh pins current; view-modes .726/main .724 retained. Handoff/history/checklist/roadmap updated. Next Focus/normal Visible/Through Lasso/paint, state/layout iPad checks; remaining advanced filters and bulk Object audit towards Beta6. No extra GEO or individual modifier-action PASS inferred.


## 2026-10-04 — v0.36.18.728 full selection-access batch

- User /nextbuild 1 authorizes larger selection-access batch. Original selection host moves into viewport SELECT top-centre popout in normal/Focus; component commands/filters/alignment and late contextual Object bulk controls retain original nodes, listeners and authoritative owners. Existing Visible/Through/Lasso strip remains.
- Shared .716 placement reused; bounded scroll and compact narrow strip. Close, SELECT, Escape and background dismiss without consuming gestures; active tool session closes/guards opening. No new selection maths/state, pointer modelling owners or protected runtime changes.
- 27 targeted PASS, including actual Grow/Connected owner after reparenting and original Object context switching. Full1244/960/284 vs fresh clean .7271240/956/284: identical failure names, four new passing checks. Historical .726957/283 baseline differs from this fresh run. Syntax/diff pass.
- .728 shell/topbar/manifest/refresh and new child pins; toolbar .727/view .726/main .724 retained. Next grouped manual selection-access checks, then whole radial/session polish and Beta6 release-candidate regression. Handoff/history/checklist/roadmap updated; .724/.726 PASS protected, no extra PASS inferred.


## 2026-10-04 — v0.36.18.729 radial/session polish batch

- User /nextbuild 2 requests whole radial/session batch. Audited Face, Vertex, Object and Edge inventories, availability, settings, terminal actions, repeat/reset and puck/gizmo return against original authoritative owners. Existing tool inventory, shared placements and protected Object gizmo exceptions retained.
- Face Exact/Repeat/Done now guards actual drag/context. Edge Slide/Offset/Crease validates object identity as well as mode/mesh/lock, closes on superseding/context loss, guards deferred returns and never restores launch IDs after deselection. Slide/Offset exact fields validate before delegation. Established semantic completion clears radial suppression for all three and returns surviving selection to puck.
- Crease first successful preview asks existing main owner for its single history push; further previews/Done do not push. Avoids committing old snapshot into a new object's history: manager swaps stacks within the same History instance and replaces live mesh in place. A stored History reference or mesh identity alone does NOT protect this. No geometry/history implementation duplicated.
- Locked radial actions guard all modes. Rejected contextual launch restores access without broadcasting a session. Shared wide layout retains original nodes/listeners/stages, enforces hidden right-rail actions, full-width notes and usable exact-field body columns.
- 62 focused PASS; broader112/108/4 existing failures. Full1259/976/283 vs fresh .7281244/960/284: no new failures, one stale dynamic-loader pin fixture fixed. 15 additional tests, existing release graph assertions updated. Syntax/diff/protected sources pass. Main .724/Multi transform1.0/Loop/navigation/Pencil kernels/frozen betas untouched.
- .729 release/shared dock+wide/client/parent pins current; unchanged toolbar .727/view .726/corner .718/Loop commit .715 retained. Handoff/history/checklist/roadmap updated. Next grouped iPad radial/settings/exit/history checks, then /nextbuild 3 release-candidate audit. .728 manual acceptance remains pending; no inferred PASS.


## 2026-10-05 — v0.36.18.730 compact popouts / Beta6 release-candidate audit

- User removes Visible/Through UI while retaining Lasso/SELECT. Original depth host hidden/aria-hidden with CSS override, retained internally for original paint/Lasso state/listeners. Original snap/Lasso/SELECT controls remain, no selection maths or gestures changed.
- Supersedes forced wide panels: content-sized width with viewport/720px maximum, zero outer padding, intrinsic action rail, compact spacing, single sparse body column and wrapped notes/readable minimum. SELECT compact too. Original controls/stages/listeners retained; shared loader graph refreshed.
- RC browser inspection exposes existing Extract .683 syntax failure (missing function closing brace). Restore brace only and refresh Extract pin; real-owner tests verify partial/all/empty selections, groups, source retention, scene checkpoint and completion. All279 modules now syntax-pass; protected main/Multi/Loop/Pencil/frozen sources untouched.
- 53 focused PASS with real floating Move/Rotate/Scale exact mathematics+single Undo/Redo and indexed export channels/morph/scale/group behavior. Broader RC113/97/16 existing failures; full1265/982/283 vs fresh .7291259/976/283, identical failure names and six new passes. No all-green or Beta6 device-release claim. Cloud browser has WebGL disabled; 3D/Pencil and actual Files/Nomad handoff remain device checks.
- .730 shell/shared dock+wide/clients/topbar/toolbar/SELECT/Extract and refresh markers; protected main .724/view .726/corner .718/Multi1.0/Loop commit .715 unchanged. Handoff/history/checklist/roadmap and new Beta6 release checklist current. Next iPad compact UI, Extract, combined regression/GLB Nomad; freeze only after passes. Lasso tightening deferred.


## 2026-10-05 — v0.36.18.731 Sweep / persistent Slide / Edge and Vertex Bevel preview

- Follows edited user scope during .730 device checks; no acceptance inferred. Single quick build: Sweep Face/Edge popup, Slide until Done/background, blue Edge/Vertex popup preview while retaining original viewport direct bevels.
- Sweep radial calls original capture/launch API with actual result; original staged controls dock in viewport for Sweep in every mode. Existing proxy hidden while original dock visible; no duplicate editor or Sweep kernel/gesture/history changes.
- Edge Slide completion retains session/arming. Done/background ends it; three minimal main active-session checks reuse existing finger/Pencil background owner and prevent hold Invert during Slide. .724 shorttap/Lasso/hold ownership remains otherwise intact.
- Edge Width/Segments and Vertex Width/exact preview copy existing bevel kernels into shared Face-blue renderer. No live mutation/history on sliders; explicit Apply one history step, Cancel disposes. Edge repeat/direct Pencil release behavior retained; Vertex explicit Apply closes as Face does, existing direct Vertex drag preserved. Stale geometry/object/mode/lock guards added; no new Vertex Segments kernel.
- 86 focused PASS; all279 source syntax PASS. Full1274/994/280 vs fresh .7301265/982/283: no new failure names; three old Sweep release-pin fixtures now pass, nine added runtime checks pass. VM fixture supplied shared renderer and normalized cross-realm face arrays; Slide test updated to requested persistent policy, not weakened history/selection expectations.
- Edited owner/shell/refresh pins .731; main .731 has only three Slide checks. Shared placement/layout/unrelated clients .730, Multi1.0/Loop .715/view .726/corner .718/frozen betas protected. Handoff/checklist/roadmap/Beta6 checklist current. Next user device checks and remaining .730 grouped release acceptance before freezing.

## 2026-10-05 — .732 PASS; .733 final Focus-default candidate for Beta 6

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

## 2026-10-05 — .734: Vertex/Edge/Face Align on component gizmos

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
- Face retains the existing Align to Face arbitrary-plane rigid-group option and
  its shape/topology/rejection guards. Only Face exposes that option.
- Reuse original component-align window-capture anchor picking and one History push,
  selection retention and semantic completion. Existing background exit policy
  closes Vertex/Edge/Face Align; Cancel/mode/mesh/selection loss close safely.
- Shared session captures mode/mesh/active object; same-mesh object switch cancels.
  Launch rejects active drags and disarms idle main/Face direct ownership through
  their actual APIs, preserving selection. Successful apply returns the gizmo.
- Keep original Face Align API alias for existing background/compatibility routing;
  new ComponentAlignViewportSession is the same owner, not a competing implementation.

Validation: **106 focused PASS**, including original Face plane/anchor/kernel tests,
actual Vertex/Edge anchor geometry with real one-step History Undo/Redo, three icon
modes/disabled/busy guards, panel mode controls/identity and semantic background
exit, active-object protection, existing radial/Focus/browser/navigation checks.
Full **1292 / 1015 PASS / 277 FAIL**, identical failure names to .733. All280 source
modules syntax PASS; diff whitespace PASS. Historical full-suite debt remains
explicit. Actual iPad/Pencil icon access and rendering still require device checks.

Changed gizmo/corner/toolbar/Align UI and dynamic parent pins .734; shared layout
.732, Focus owner .733, component-align/core .705, protected Multi1.0 and Loop.715
unchanged. Frozen betas untouched. No Beta6 release claim.

Next: .734 device checks (component Align/fixed anchor/background/Undo plus launch
Focus), then final iPad editing and Files/Nomad smoke; accepted candidate freeze,
release notes and isolated /beta-6/ publication per BETA_6_RELEASE_CHECKLIST.md.

## 2026-10-05 — .735: shared XYZ colours and native NOMAD export

Current release **v0.36.18.735**, parent main
`b4ebe514ff1de556400ea64cc7c01d3029ac6f48`. User explicitly **PASS .734** and
requests subtle axis colour reminders throughout the app plus MeshUtilz native
Nomad export, replacing Save GLB to Files and its explanation with NOMAD.

- Shared axis-colours.css uses the original Move palette (X red/Y green/Z blue),
  with lightly tinted idle buttons and stronger active feedback. Covers semantic
  axis buttons for Align, Move constraints, Array, Revolve and Symmetry. No text
  guessing, gesture listeners, state changes, SVG-handle or free/plane changes.
- NOMAD button replaces the secondary File export action, independent of OBJ/GLB
  format selection; explanatory note is cleared/hidden. Geometry selector Base/SubD
  applies. Existing regular OBJ/GLB export and data-preservation owners remain.
- Audited CrisBezz/MeshUtilz-Sweep-Lab. Main only has lab docs; actual native writer
  and binary template are on balloon-v0.6 at
  `18e72a6bf964974591038345d68c2196a18f6af2`. Read nomadBalloonExport.js,
  nomadBalloonExport095.js/097.js and V1.1-STABLE.md. Reuse validated header/layout,
  donor field/node conventions and name handling; no runtime source-text patching,
  dependency on the other repo or procedural Tube implementation in BoxLab.
- New nomad-export-core adapts visible editable BoxLab meshes via existing export
  mesh resolver (Base/SubD/Mirror), keeping separate named objects and shared
  vertices/quads/winding. Triangles use the validated repeated fourth index;
  n-gons use projected earcut triangulation with original winding and inherited
  facegroups. Names/groups stored natively. All native binary fields uncompressed;
  header lengths/offsets/alignment and field bounds self-check before saving.
- Original binary donor copied intact to src/templates/nomad-tube.nom, SHA256
  `9cc56cc4fdea095ec5b8eb917e0101b0e9433f5af54dd3e554ac5b76724010d8`.
  Relative import.meta template URL keeps future frozen beta isolated. Template
  fetched/cached on first NOMAD request; failures retry. Uses existing save owner
  with explicit .nom extension, application/x-nomad-sculpt MIME and description;
  supports picker, iPad share-to-Files and download fallback/cancel. No History edit.
- Native export scope: polygon geometry, names, groups, Base/SubD/Mirror. This
  adapter does not promise UV/paint/material/morph/crease metadata round-trip;
  default donor material/scene settings and header thumbnail remain. Existing GLB
  passthrough remains available for those richer channels. NOM import into BoxLab
  is not added or claimed. Actual Nomad first-open/schema compatibility and framing
  still need iPad verification, despite validated MeshUtilz container provenance.

Validation: **51 focused PASS**: native donor checksum/header/offsets/binary bounds,
separate names/quad/shared-index/coordinate/winding/groups, concave n-gons,
Base/Mirror/SubD/source retention, invalid inputs, actual NOMAD UI/cache/filename/
MIME/save picker/cancel/failure guards; shared-axis coverage and existing Align,
GLB attribute/transform/history/Focus/browser checks. Full **1301 / 1024 PASS /
277 FAIL**, identical failure names to .734. All281 source syntax PASS; diff
whitespace PASS. Historical full-suite debt remains documented, not all-green CI.

Changed shell/recovery/export owner/new core/axis style pins .735; .734 Align and
.733 default Focus remain accepted/runtime unchanged. Component geometry/history,
protected Multi1.0/Loop.715 and frozen betas unchanged. Source repo read-only.

Next device checks: axis tint/active clarity in Align/Array/Move; NOMAD Base and
SubD export of named multi-object scene into Files, open in Nomad and inspect names,
shape/scale/groups/quad topology (Frame All if necessary); Cancel and ordinary GLB
regression. After .735 pass and final release smoke, freeze Beta6 per checklist.
No native export success/device PASS or Beta6 freeze inferred yet.

## 2026-10-05 — .736: restore MeshUtilz browser-download → Open In workflow

Current release **v0.36.18.736**, parent main
`2ad78c345c939027a520227d7936e3ea914a9b96`. User explicitly **PASS .735**;
requests the MeshUtilz browser download/preview/Open In workflow for native NOM.

Cause: .735 NOMAD called generic saveBlob, which prefers save picker then Web Share.
Validated MeshUtilz main.js/v110 instead initiates an anchor browser download with
.nom filename and application/x-nomad-sculpt Blob. This is a delivery difference,
not evidence that the already-passed native NOM bytes have the wrong format.

- NOMAD now directly uses that existing browser-download helper, with identical
  filename/MIME/native bytes. No file picker or Web Share call on NOMAD path.
- Optional revokeAfter argument keeps NOM Blob URL alive60s for iOS preview;
  other OBJ/GLB downloads retain original1200ms behavior. No new popup or tab.
- Status guides user to open browser download, then Open In / Share → Nomad.
  Website cannot force a particular iOS app target or register Nomad's file UTI;
  browser/OS determine the download preview and available applications. Device
  testing is required; do not claim successful app switching from automated checks.
- Export core/template, .735 XYZ colours, regular GLB/OBJ save/share paths,
  geometry/names/groups/history and protected interaction/frozen betas unchanged.

Validation:14 focused native-format/UI/download/save/GLB/axis checks PASS;
actual anchor href/download/click/removal,60s URL retention/revoke, and NOM path
exclusion of picker/share verified. Full1302/1025 PASS/277 FAIL, identical failure
names to .735. Modified source syntax and diff whitespace PASS. iPad behavior
pending. Shell/recovery/export owner pins .736; native core/template remain .735.

Next: iPad NOMAD tap starts normal browser download; open downloaded .nom preview
and use Open In/Share to Nomad. Check name/geometry, compare normal GLB save and
cancel behavior. Record device outcome before Beta6 freeze; .735 is accepted,
.736 handoff delivery refinement is pending. No new native-format work planned.

## 2026-10-05 — Beta 6 freeze / release

User accepted current .736 and requested release. Frozen exact runtime from
`e1551b3e9c3983c5d0fabfbe44c4ff9e760ff189` into beta-6, including NOM donor asset and relative
refresh/version/template URLs. Finalized notes and release checklist; prior betas
unchanged. No modelling changes. Focused14 checks and snapshot isolation validation
pass; historical277 full-suite failures remain explicit. Final device smoke uses
frozen URL; main remains .736.

## 2026-10-05 — Post-Beta 6 reliability audit

User reports positive UI reception, accepts reliability direction and asks what
277 historical failures mean. Audited main acb4012f / app .736. Fresh full run
1302/1025PASS/277FAIL/0skip. Inventory:147 version/pin,92 source-pattern,31
aggregate scripts(121 failed internal checks; no harness exceptions),6 recovery
sentinels,1 obsolete OBJ output. Explicitly inspected Facegroups/Boolean/OBJ
contradictions with later accepted implementations. Selected Bridge85/Through16/
Bevel21/Loop1/Beta6runtime4/NOM9 pass. No confirmed new modelling defect isolated.
Added docs/reliability-audit-2026-10-05.md+JSON and reproducible inventory script.
No app/test expectations/frozen-beta changes. Old VM blanket diagnosis corrected.
Next: reconcile contracts without muting suite, strengthen semantic tests and CI
path/release gates, then varied Bevel/Knife→Loop/history reliability batch.

## 2026-10-05 — .737: reconcile release tests and expose historical checks

User /nextbuild accepts selected reliability methods. Modeller source/CSS and
frozenbeta2–6 untouched; live shell/recovery pins .737. Added reviewed337 asset
reference/content-hash contract with coherence/protected Multi/negative controls.
Reconciled old release/pin assumptions;31 scripts→333 namedcases, allchecks retained.
12 recovery test files scoped to exact accepted .453 source02332873 (original
assertions/hash preserved). Actual bootstrap10 stale retries/frozen isolation and
Repeat owner delegation verified; CI runtime path triggers broadened.
Full1610/1492PASS/118FAIL/0skip versus audited1302/1025/277.158 oldregular failures
and91 script subchecks reconciled; no new regular failure identities.32focusedPASS,
347testsyntax/0fail, protected diffs/whitespacePASS. Node24 locally; CI Node22
separate. Remaining118checks stay active; noallgreen claim and no releasegateyet.
Inventory/nextplan docs/reliability-build-737.md+JSON. Next actualowner lifecycle
fixtures/OBJgroup contract, then reliableCI gate; no modelling algorithms changed.

.737 publication verification: runtime commit02666913086e27ea0d38eb9992cb99a08a1a5ae8;
Pages37288884811success and live .737 shell/report/recovery +frozen .736 bytes match.
Actual Node22CI37288886319:1610/1492PASS/118FAIL/0skip, all118 failure names identical
to local Node24. No environment-specific failures. CI remains truthfully red.

## 2026-10-05 — .738: actual Boolean scene-history reliability fixtures

Continue from main ab13b4f7 and .737 handoff. Two obsolete .347/.368 tests required
pre-result checkpoint(); accepted .538 instead captures pre-mutation scene then
checkpoints after result activation. Replaced those two expectations with actual
Boolean apply/history bridge behavior, retaining all other checks.
13 newfixtures exercise Object/Group Union/Cut/Intersect one-step scene Undo/Redo,
linked/group/origin/settings/selection metadata, unique result, operand visibility,
ineligibility/solver refusal/creation-failure rollback and both history stacks.
Shared Join capture listener also uses actual installed bridge. DOM/manager/solver
are doubles; no claim of real browser/solver or full Join geometry coverage.
Node24 full1623/1507PASS/116FAIL/0skip; exactly2 old failures resolved, no new failure
identities.35focusedPASS. Runtime src/CSS and frozen betas unchanged; shell/recovery
URLs .738, reviewed asset hashes unchanged. Inventory docs/reliability-build-738.
Next selection/puck/Gizmo/direct-tool owner fixtures then OBJ group contract;
CI release gate deferred and NOM import not started. Device checks remain separate.

.738 publication blocked: implementation commit f18fd3ef44f02abb91d206a07473086221036ac8
is local. Automatic approval review rejected git push to public main as lacking
explicit authorization in this request despite standing AI_WORKFLOW authorization.
No alternate publication attempted. Live remains .737; Node22CI/Pages pending.

2026-10-05: user explicitly grants continuing approval for GitHub commits, pushes
and Pages publication: “I approve any commits to github repos, page pushes and so
on - moving forward for eternity :)”. Recorded in AI_WORKFLOW; .738 publication
block resolved, proceeding to push and verify deployment/CI.

.738 published via connected GitHub app at cc1c8c257790736517d170c265d96a73f94cc2b7.
Direct git push lacked credentials; app publication has identical validated tree.
Pages37303252947success; live version .738 and byte-identical shell verified.
Node22CI37303253624:1623/1507PASS/116FAIL/0skip, all116 failures match localNode24.
Prior publication block resolved by explicit user continuing authorization.

## 2026-10-05 — .739: selection hub and Bevel lifecycle behavior fixtures

User PASS .738, /nextbuild. Parent bc90f260. Accepted modeller unchanged; seven
obsolete .633/.639/.660/.662 checks replaced with current owner execution and
explicit CSS/markup contract.30 new named fixtures execute selection-hub controller,
selection/frame sync/puck/completion/collapsed guard, Bevel API/disarm and entire
Bevel session module. Component puck/transform/tools, selection loss/change,
completion return, Object full/emptyMulti, Face suspend/resume, Align hide, Edge
Extrude disarm/selection, Bevel mode/mesh/object stale guards, busy-background
protection/Cancel. DOM/RAF/projection/preview/kernel collaborators are mocked;
no real browser/Pencil/geometry/device acceptance claim. No runtime source/CSS or
frozenbeta changes. Shell/recovery URLs .739; reviewed source hashes unchanged.
Node24 full1653/1544PASS/109FAIL/0skip; exactly7 old failures resolve, no new names.
99focusedPASS; changed/helper syntax/whitespace/protected diffs pass.
Inventory/report docs/reliability-build-739. Node22CI/Pages verification pending.
Next remaining selection/radial/Face checks and OBJ groups, then geometry fixtures
and valid CI gate. NOM import deferred. Device smoke remains separate.

.739 publication verified: runtime87e5ed46259bbab3964f8606447882d49c133a54.
Pages37304998035success; live version .739 and byte-identical shell/recovery pins.
Actual Node22CI37304998451:1653/1544PASS/109FAIL/0skip; all109 failures match local.
Validated local and app-published Git trees identical; protected sources/frozenbeta
unchanged. Await .739 iPad smoke; user .738 PASS recorded, no .739 PASS inferred.

## 2026-10-05 — .740: contextual radial and Sweep semantic-owner fixtures

User PASS .739, /nextbuild. Parent65f985f7. Six obsolete .642/.643/.654/.658 checks
reconciled using accepted corner shortcut/all-mode radial/contextual availability/
Face+Edge Sweep behavior. Two obsolete test descriptions renamed; all cases kept.
16 new fixtures execute shortcut callback, tools-centre/controller/frame suppression,
availability guard/feedback and Sweep semantic launch/end/API. Generic/missing/
active/disabled targets; contextual Face/Vertex/Object owner delegation; locked
object guard; guided Edge Bridge exception; radial-open refresh; Sweep Face/Edge
launch/one completion with original mode, other modes/tools/session ends ignored.
DOM/RAF/projection/session collaborators mocked; Sweep presentation sync mocked;
CSS gate structural. No real browser/solver/device evidence claimed.
Node24 full1669/1566PASS/103FAIL/0skip; six old failure identities resolve, none new.
113focusedPASS; changed/helper syntax/whitespace/protected diff clean.
Runtime src/CSS/frozenbeta unchanged; shell/recovery .740, all asset hashes retained.
Report/inventory docs/reliability-build-740. Node22CI/Pages verification pending.
Next OBJ facegroup contract, remaining Face/selection checks, then geometry fixtures.

.740 publication verified: runtime b522da13e5a69aad3b95545cc0de8b8dac9d51d0.
Pages37306257859success; live version .740 and byte-identical shell/markers/pins.
Actual Node22CI37306258245:1669/1566PASS/103FAIL/0skip; all103 failures match local.
App-published/local validated Git trees identical; protected src/CSS/frozenbeta
unchanged. Await .740 iPad smoke; .739 user PASS recorded.

## 2026-10-05 — .741: OBJ facegroup isolation / newline normalization

User PASS .740, /nextbuild. Parent7bbc142f. Two new fixtures failed pre-fix:
missing initial bare g lets independent stream reader inherit prior-object group
(BoxLab importer o reset masks it); raw multiline group labels emit extra records.
Scene export core now emits initial null-group reset and reuses safeOBJName for
single-line group labels. Nine actual Base/SubD/Mirror multi-object round trips
cover topology/winding/groups/name/global indices/empty/source retention; independent
scanner validates group state and indices. No specific Nomad bug/device PASS claimed.
Reconciled .444 obsolete synthetic object-name group assertion; health tests kept.
Node24 full1679/1577PASS/102FAIL/0skip; one old failure resolves, none new.
Focused39/38PASS/1historical .459 noSubD viewport assertion still active. Initial17
OBJ/releasePASS; source/test syntax, whitespace and protected/frozen diffs clean.
Core plus4loader parents changed; loading URLs .741 with reviewed5hash updates;
internal .450/.736 stamps retained. GLB/NOM builder behavior unchanged and covered.
Legacy export.js unchanged; scene capture wrapper owns normal/Quick OBJ route.
Report/inventory docs/reliability-build-741. Node22CI/Pages verification pending.
Next Face/selection semantic checks then diverse Bevel/Knife→Loop/history fixtures.

.741 loader audit also found integrity guard importing Quick OBJ at old .238 URL.
Updated guard and shell to identical .741 wrapper URL, refreshed guard shell pin;
new loader-identity fixture prevents duplicate/stale wrapper graph. Ten added cases
in final1679/1577/102; final export-focused38PASS; unrelated historical .459 viewport
failure remains visible in full suite. Core plus4loader parents/5hashes reviewed.

.741 published runtime9bc1b3165e614173ad168ae8cf0b4f464a6aac22. Pages37307745660
success; live shell/version/all5changed assets byte-identical to published files,
Beta6 .736 verified. Actual Node22CI37307745974 matches1679/1577PASS/102FAIL/0skip
and all102 local failure names. No .741 device PASS inferred; awaiting OBJ smoke.


## 2026-10-06 — v0.36.18.742 finite negative Extrude / preserve polygon topology

- User supplied four-region already extruded OBJ; old sidewalls overlap original
  side faces although edge-manifold health reports closed/clean. Recovered original
  cage from sidewall endpoints; source/before/corrected fixtures retained.
- Closed inward Extrude now subtracts finite prisms through existing Through kernel,
  preserves convex/untouched polygons, clips side strips and selects surviving caps.
  Exact rectangular example has34faces/25quads/9ngons/0tris, correct volume5.839164.
  Adjacent/corner/inset/rotated fixtures and23 accepted old Through sources pass.
- Synthetic Exact pointer9876 previously measured its only move from that move's
  endpoint. Corrected synthetic origin/threshold only; physical gesture feel retained.
  Facegroups restore included; one-step history/cancel/replay/redo refusal covered.
- Avoided generic BSP triangulation/temporary scene objects. Initial triangle
  clipping fragmentation and rotated numerical Earcut plane issue recorded in
  docs/reliability-build-742.md; convex clipping + degenerate filtering fixed both.
- Add Vertex actual split and independent child picking pass; reported live failure
  unreproduced, no Add runtime fix claimed. Further snap/selection/normal audit next.
- New27PASS; full1706/1604PASS/102FAIL/0skip, same102failure names as .741.
  Focused53PASS. Only Face direct/Through runtime modules changed; reviewed pins/
  hashes, shell markers .742; protected Multi/Loop/CSS/frozen betas unchanged.
  Publication/Node22/live verification pending. No device acceptance inferred.

- .742 publication verified: runtime85dbb83e960d06b926b071e96dfaa988b5d8ad8b;
  actual Node22CI37463033743/job112267082488 matches1706/1604/102/0 and
  all102failure identities. Pages37463032493success; live shell/version/two
  changed modules/before+correctedOBJ/Beta6 version byte-match main. Device pending.


## 2026-10-07 — v0.36.18.743 single-face clean-cut ownership

- User PASS .742 multiple cuts; actual .742 screenshots show single cut triangulates.
- Found legacy sequential-through-fallback arms on single resolved Face press and
  window-capture move cancels the authoritative .742 cutter. Earlier isolated
  controller tests missed the loaded peer; reproducing both yields52triangles.
- Face direct declares ownsClosedCuts; fallback defers before planning/arming for
  authoritative closed Extrude. Same finite kernel now survives single-face input.
  Positive/open routes, Exact/cut algorithms and frozen betas unchanged.
- Seven combined-owner tests cover shallow/deep/Through0tris, exact volume,
  cap selection, one Undo/Redo, Cancel+redo retention, Multi and capability scope.
  Focused64PASS; final full-suite/publication evidence pending.
- Face/drawer/fallback cache URLs743; Through child742 retained; three reviewed
  hashes. No .743 device acceptance or automatic repair of existing triangulation.

- Final localNode24:1713/1611PASS/102FAIL/0skip; same102 failure names as .742.

- .743 published/runtime2a20b6026f82c6c161cf06fe42e08c79ea9ea0bf. Actual Node22CI
  37544260019/job112544354430 matches1713/1611/102/0 and102failure names.
  Pages37544259082success; live shell/version/3changed assets/Beta6 byte-verified.
  .743 device testing pending.


## 2026-10-07 — v0.36.18.744 Bevel / Knife → Loop boundary conformance

- User PASS .743 negative Extrude; explicitly defers Add Vertex to watch list.
- Actual combined geometry reproduces six unmatched edges when Loop terminates at
  a bevelled/Knife polygon. Existing logical Loop addon propagates shared vertices
  into terminal polygons and preserves prior subdivisions on uncut logical rails.
- Single and multiple cuts retain polygon faces, Loop groups and split-rail creases;
  no change to protected .715 commit/placement feel, Multi or frozen betas.
- 13 new geometry/Knife-release/Slide/History fixtures PASS; full1726/1624/102/0,
  same102 failure identities as .743. One obsolete688 addon pin reconciled through
  reviewed contract; protected715 assertion retained.
- Follow-up findings recorded: Bevel eligibility/execution mismatch after Loop and
  incomplete Bevel facegroup array. Not fixed in this scoped Loop build.

- Runtime e67548c8dac9a62ffade5833da06e3c46c45af80 published. Actual Node22CI
  37552628205/job112571439435 matches1726/1624PASS/102FAIL/0skip and all102
  failure names. Pages37552627347success; live index/version/drawer/logical-addon
  and frozenBeta6 version byte-match main. Focused46PASS. Device .744 pending.


## 2026-10-07 — v0.36.18.745 Bevel after Loop/Knife + facegroup provenance

- User PASS .744, requests next scoped build; Add Vertex remains deferred.
- Mixed-valence single-fan endpoint falsely demanded extra corner cap; original
  cap now closes it and incorporates rounded profile. All20 eligible Loop-cage
  single edges execute for1/3segments; Knife release→Bevel also covered.
- Rounded perimeter strips sharing one profile previously got duplicate cap,
  producing3-owner edges. Skip that redundant cap. Full polygon normals fix flipped
  rounded caps where firstthree points are collinear; winding/rotation covered.
- All6existing Edge/Face bevel engines retain source groups; new surfaces inherit
  unanimous source group, mixed boundaries null. Shared provenance/normal utilities.
  Guard/selection/direct restore metadata on failure/Cancel; exceptions rolled back,
  >2owners rejected on closed inputs. Existing rounded fan triangulation retained.
- Inset imported bootstrap30.3 alongside shell635. Updated both to one745 URL and
  refreshed Inset→Face loader chain; Extrude body unchanged. Reviewed pins/hashes;
  protected Loop715/addon744/Multi/frozen betas untouched.
-29 newPASS, focused103PASS; full1755/1653PASS/102FAIL/0skip, identical102failure
  identities as .744. Shared real .707 Face Bevel fixture reused, no checks removed.
  Publication verification pending; .745 device testing pending.

- Runtime e5d18e5fcff22dd8cf4f268866f1a9b5b5ff51a4 published. Actual Node22CI
  37568114774/job112620395437 matches1755/1653PASS/102FAIL/0skip and all102
  failure names. Pages37568114308success; live shell/version/all13changed src assets
  and frozenBeta6 version byte-match main. Focused103PASS. Device .745 pending.


## 2026-10-07 — v0.36.18.746 uploaded bevelled-cage Loop continuation

- User screenshot745 red horizontal loop blocked; exact LOOP CUT.obj retained
  (31verts/24faces/21quads/3ngons). Do not infer .745 device PASS.
- Edge0 has no native quad ring; other vertical seeds stop at multi-subdivided
  bevel ngons. Old logical addon handles only5gon/one straight subdivision.
- Existing addon now completes a guarded convex-planar polygon strip with parallel
  crossing rails, on failed/partial native paths. All13vertical seeds form7face
  closed loops without triangles, retaining volume/winding/subdivisions/groups/creases.
- Slide uses shared rail-height overlap and stays level; initial seed-height retained.
  Ordinary quad/Added gesture/placement and actual715commit owner unchanged.
-15newPASS, focused63PASS; full1770/1668/102/0, same102failure identities as745.
  Exact source/rotation/multi2/3/8/actualcommit/history/refusal fixtures covered.
- Convex cross-product tolerance accounts for rounded OBJ boundary coordinates.
  Node parser has a queried mesh class; tests construct authoritative installed
  EditableMesh explicitly. A native-only probe is not an addon reproduction.
- Addon/drawer/recovery pins746, two reviewed hashes; protected main/Loop715/Multi/
  frozen betas untouched. Publication verification and device acceptance pending.


### .746 publication verification

Runtime commit 48595c3d767dc99b34458b1c6c9793070d53a461 published. Actual Node22 CI run 37585236460, job 112673733525: 1770 tests, 1668 PASS, 102 FAIL, 0 skipped; all 102 failure names match the recorded baseline. Pages run 37585235717 succeeded. Live index, version, Drawer loader, Loop addon, original OBJ fixture and Beta6 version byte-match main. Focused 63 PASS; device .746 acceptance remains pending.


## 2026-10-07 — v0.36.18.747 supplied-cage combinations / Bevel winding guard

- User “big PASS” .746; Add Vertex remains deferred.
- All67eligible cage edges after polygon Loop bevel1/3segments cleanly; actual
  Knife on every quad and repeated Loop→Knife→Bevel→Loop preserve exact history.
- Existing watertight guard accepted injected reversed face with two edge owners.
  Check opposite shared-edge winding for initially closed oriented inputs; restore
  full mesh metadata and expose existing error on failure. No current engine defect
  claimed; open/already inconsistently oriented inputs retain prior routing.
-7newPASS/focused69PASS; full1777/1675PASS/102FAIL/0skip; same102identities.
- Guard only runtime edit; bootstrap/Inset/Face import-only cache chain747. Four
  reviewed hashes/pins; protected Loop715/main/Multi/frozen betas untouched.
- Publication verification pending; .747 device acceptance pending.


### .747 publication verification

Runtime fd498652f9339c3df639e8bb5ea276ebd980875f published. Actual Node22 CI37594432292/job112703460695:1777tests/1675PASS/102FAIL/0skip; all102failure names match baseline. Pages37594431221 success; live shell/version/guard/bootstrap/Inset/Face loader and frozenBeta6 version byte-match main. Focused69PASS. Device .747 acceptance pending.


## 2026-10-07 — v0.36.18.748 partial-chain Bevel through four-way vertices

- User PASS .747; Add Vertex remains deferred.
- Actual prior multi-chamfer rejects consecutive7/35 or7/35/42 on supplied loop
  cage. Existing engine extended to one open nonbranching strip chain, four-valence
  straight-through internal vertices and one-selected-edge endpoints.
- Directed local one-owner boundary rings supply complete end caps, preserving
  rounded subdivisions. Chamfer two triangular end caps are necessary geometry;
  rounded caps are polygons. Existing groups/creases/loose remapping retained.
- Four-way turns/branches remain safe refusal; complete loops retain dedicated
  engine. Early widening accidentally routed complete rings to connected engine;
  existing semantic tests caught it, fixed by explicit connected-open-chain gate.
-10newPASS/140partialpaths; focused120PASS; full1787/1685/102/0, same102identities.
- Multi-chamfer runtime only; bootstrap/Inset/Face import-only chain748, guard747;
  reviewed4hashes/pins; main/Loop715/Multi/frozen betas untouched.
- Node22/Pages verification and device .748 acceptance pending.


### .748 publication verification

Runtime ac7ef2c96274dbd4a96a929c595f3fb0a7fad159 published. Actual Node22 CI37609372174/job112752603609:1787tests/1685PASS/102FAIL/0skip; all102failure names match baseline. Pages37609371712 success; live shell/version/multi-chamfer/bootstrap/Inset/Face loader and frozenBeta6 version byte-match main. Focused120PASS. Device .748 acceptance pending.


## 2026-10-07 — v0.36.18.749 Knife diagonal validity / transactional rollback

- User PASS .748; Add Vertex remains deferred.
- Actual prior Knife release on U-notched planar face creates exterior diagonal3/6,
  two faces and one history entry. Topology-only mesh splitter unchanged.
- Knife validates proposed chord in source plane: reject outside/vertex-hit/boundary
  sliver/nonplanar cuts, keep valid concave cuts. Source-relative projection/tolerance.
- Catch failures/exceptions with vertices/faces/groups/creases/loose restoration;
  invalid edge-snap splits retain source and redo. Actual gesture/snapping unchanged.
-10newPASS/focused89PASS; full1797/1695PASS/102FAIL/0skip, same102identities as748.
- Knife body only; shell/directKnife/recovery749, all other loaded pins retained;
  one reviewed hash. main/Loop715/Multi/frozen betas untouched.
- Publication/Node22/live verification and device .749 acceptance pending.


### .749 publication verification

Runtime df89e43581f82d325d9431b31e23191cacd3489b published. Actual Node22 CI37619318589/job112785293117:1797tests/1695PASS/102FAIL/0skip; all102failure names match baseline. Pages37619317487 success; live shell/version/Knife and frozenBeta6 version byte-match main. Focused89PASS. Device .749 acceptance pending.


## 2026-10-07 — v0.36.18.750 Bevel + Inset inward cuts on uploaded source

- User .748 screenshot/file BEVEL ISSUE.obj42verts36faces: selected inset7 planar,
  rounded caps30/31 warped~.06348. Existing finite target triangulation refuses
  every cut as nonplanar-input-face. Export header736 is not app build version.
- Exact untouched source retained in tests/fixtures/bevel-inset-750.obj.
- Finite cutter uses displayed first-vertex fan privately for warped targets;
  planar target handling unchanged. Uncut polygons retain points/fan anchor/groups.
- Rejoin accepted wall/cap pieces across complete reversed edges, preserve ambiguous
  unions; bounded optional coalescing256pieces. No flattening or wholesale triangles.
-15newPASS/focused81PASS; full1812/1710PASS/102FAIL/0skip, same102identities as749.
  Seven depths,zero triangles/closed,exact shallow prism volume, rotated source,
  groups, physical/Exact actual combined-owner history/Cancel covered.
- Selected warped source still refuses; legacyThrough path unchanged. No all-quad
  promise for arbitrary intersected warped surfaces or self-intersection detection.
- Kernel body only; Face import-only/kernel/shell750, all other pins retained;
  two reviewed hashes. main/Loop715/Multi/frozen betas untouched.
- Publication/Node22/live verification and device .750 acceptance pending.


### .750 publication verification

Runtime 4036c0fdf9c5cabc1173d68a3cf4281d7674b049 published. Actual Node22 CI37620905333/job112790634635:1812tests/1710PASS/102FAIL/0skip; all102failure names match baseline. Pages37620904201 success; live shell/version/kernel/Face loader/original OBJ fixture and frozenBeta6 version byte-match main. Focused81PASS. Device .750 acceptance pending.


## 2026-10-08 — v0.36.18.751 warped-target Through planning / ordered exits

- User PASS .750. Remaining legacy planner still rejects supplied Bevel/Inset
  object as nonplanar-input-face; target surface representation now shares750fan.
- Selected source remains strictly planar/convex. Warped-target buildThrough uses
  existing finite cutter at chosen ordered targetDepth + existing epsilon overshoot.
  Original planar legacy build preserved; no pointer/tool owner changes.
-8newPASS/focused78PASS; full1820/1718PASS/102FAIL/0skip, identical102identities.
  Source7 exactexit2; clean42faces/0tris; warped two-shell targets2/5 and first-only
  second shell untouched; rotation/scaling/volume, actual physical/Exact/history/
  selection clear and shallow cut compatibility covered.
- Kernel body only; Face import-only/kernel/shell751, retained other pins. Two
  reviewed hashes; main/Loop715/Multi/frozen betas untouched.
- Publication/Node22/live verification and device .751 acceptance pending.


### .751 publication verification

Runtime 5c3007ce3b9f5863dc924a12bce60c7b3946dc87 published. Node22 Topology run37697834551/job113053828900:1820tests/1718PASS/102FAIL/0skip; all102 failure names exactly match the local inventory and prior build. Pages run37697833503 succeeded. Live shell/version, Through kernel, Face direct, original source fixture and beta-6 version bytes match the tested checkout. Device .751 acceptance remains pending.


## 2026-10-08 — v0.36.18.752 Vertex Extrude scaffolding

- User PASS .751, explicitly requests Vertex Extrude following Face drag/exact/repeat.
- Audit found Add/Build Edge/loose topology/Create Face, no prior Vertex Extrude.
  New candidate builder delegates existing loose topology; direct owner uses actual
  rendered Vertex picker/selection/history. No new face/weld/bridge algorithm.
- Single/multi attached/loose source → edge + new tip; repeated pulls keep tips
  selected. Original Vertex panel/radial gets Free/XYZ signed Exact, last-vector
  Repeat and Done at top centre. Existing Join/Build Edge closes boundaries for
  original Create Face/Fill. Source faces/groups/creases retained.
- Document capture prevents canvas Move/orbit competition; shared background policy
  recognizes scaffold contacts. Combined actual Pencil policy test catches loose-tip
  Repeat taps that polygon-only gate would otherwise call background.
- Initial competing Build Edge fixture exposed late session exit disarming new owner;
  retire session before disarming Extrude, preserve new owner. Two initial fixture
  mismatches involved existing virtual loose faces and perspective axis projection;
  tests now distinguish real faces and truly view-parallel central rail.
-12newPASS/focused88PASS; full1832/1730/102/0 with identical102names to fresh751.
  All old failure checks remain active. Reviewed14-sector inventory/static pin tests
  updated for explicit new feature; runtime loader/hash contract updated narrowly.
- Five runtime modules/hashes (two new) and required shell pins752; Face/Through751,
  protected main/Loop715/Multi/frozenbeta unchanged. Publication/CI/device pending.


### .752 publication verification and acceptance

Runtime 9be399909982719b9b7ecdf757bbf00c4695631f published. Actual Node22 Topology run37712338609/job113100902832:1832tests/1730PASS/102FAIL/0skip; all102failure names exactly match the local inventory. Pages37712337662 success; live shell/version/new Extrude core and owner/Vertex panel/gizmo/background policy and frozenBeta6 version byte-match the tested checkout. User PASS .752 on2026-10-08. Browser smoke attempt timed out; device acceptance is the user report.


## 2026-10-08 — v0.36.18.753 Vertex Bevel facegroup preservation

- User PASS .752 /nextbuild. Resume scoped Bevel/Knife/Loop reliability audit.
- Reproduced existing single/multi Vertex Bevel appending caps without group entries:
  grouped cube becomes7/8faces but retains only6labels; blue Apply also omitted groups.
- Repair existing kernels: source labels retained; cap inherits unanimous incident
  group, otherwise null, matching accepted Edge Bevel provenance. No geometry changes.
- Existing direct owner restores groups on preview Apply/repeated drag/Cancel and
  disarm; a changed facegroup invalidates old blue preview instead of overwriting it.
-16new behavioral PASS/focused82PASS; full1848/1746PASS/102FAIL/0skip; identical
  failure names to .752, all checks active. Real kernels/direct owner/history, single/
  adjacent/separate multi, mixed/uniform groups, creases/loose geometry, closed
  winding, Loop/Knife combinations and OBJ groups covered.
- Three runtime bodies changed; bootstrap/Inset/Face direct imports only repinned.
  Six reviewed hashes; required parent/recovery/shell753 pins. Through child751,
  Extrude752, protected main/Loop715/Multi/frozenbeta unchanged.
- Publication/actual Node22/live verification and .753 device acceptance pending.


### .753 publication verification

Runtime 0f11d92e7eb0655fac0c8b15ddd362278256c772 published. Actual Node22 Topology run37721519156/job113130013158:1848tests/1746PASS/102FAIL/0skip; all102failure names exactly match the local inventory and .752. Pages37721518051 succeeded. Live shell/version, all six changed runtime modules/loader parents, accepted Vertex Extrude owner and frozenBeta6 version byte-match the tested checkout. Focused82PASS; .753 device acceptance pending.


### .753 acceptance

User PASS .753 on2026-10-08: Vertex Bevel Apply/Cancel/multi drag/Undo/Redo and retained Vertex Extrude.


## 2026-10-08 — v0.36.18.754 Knife perspective EDGE accuracy

- User PASS .753 /nextbuild. Bevel/Knife/Loop audit reproduced Knife EDGE using a
  screen-space fraction as a world-edge fraction. Angled planar source worldt=.3
  resolves .2112676: .44366model units /42.88066screen pixels from shown marker.
- Existing freeBoundaryPoint now converts with camera clip weights before world
  interpolation. Orthographic weights1 preserve old result; END/MID/PERP priority,
  distances, release hysteresis, gestures, topology splitter/history unchanged.
-16new behavioral tests: before11FAIL/5PASS, after16PASS; focused88PASS.
  Full Node24:1864/1762PASS/102FAIL/0skip, same102failure identities as .753.
  Actual whole-owner camera/raycast/Pencil cut, reversed edges, rotations/transforms,
  .01/1/100scale, viewport offsets, groups/creases, Cancel/redo, exact Undo/Redo,
  Bevel1/3→Knife→supported Loop closed shells covered. No blanket exclusions.
- Runtime body only Knife; one reviewed hash and shell/recovery/Knife754 pins.
  Face/bootstrap/VertexBevel753, Extrude752, Through751 retained. Protected main,
  Loop715/Multi/frozen betas untouched. No near-plane clipping implementation;
  EDGE conversion refuses nonfinite or nonpositive clip weights.
- Publication/actual Node22/live verification and .754 device acceptance pending.


### .754 publication verification

Runtime 5a7f6d585a72f076fe9d80f1bb05fd6a3b269915 published. Actual Node22 Topology run37725898931/job113143857359:1864tests/1762PASS/102FAIL/0skip; all102failure names match local inventory and .753 exactly. Pages37725898285 succeeded after a delayed deployment step; live shell/version/Knife, accepted Vertex Extrude and frozenBeta6 version byte-match the tested checkout. Focused88PASS. .754 device acceptance pending.


### .754 acceptance — 2026-10-08

User PASS .754: perspective Knife EDGE placement, END/MID/PERP, Bevel→Knife→Loop and Undo/Redo. No new runtime changes or build started.


## 2026-10-08 — v0.36.18.755 Knife gesture context / cancellation

- User PASS .754 /nextbuild. Actual Pencil reproduction: start on cube1, swap
  active mesh/object to cube2 before release; cube1 stays6faces, cube2 becomes7,
  history1. Knife had no starting mesh/object/lock guard and cancel leaked capture.
- Existing owner stores starting mesh/activeId, checks Face mode/unlocked state
  before starting, previewing and committing. Changed context disarms semantically
  without cutting/history; locked Knife arming refuses. No parallel input owner.
- One cancellation helper retires drag before releasing capture and removing markers;
  used by Done/exclusive/context, pointercancel/lostcapture and Escape/blur.
  Ordinary pointercancel/lostcapture keep Knife armed for another cut; terminal
  exits emit existing boxlab-knife-disarmed for original session close.
-17new whole-owner behavioral tests: before16FAIL/1PASS, after17PASS; focused105PASS.
  Full Node24:1881/1779PASS/102FAIL/0skip, same102names as754. Real camera/raycast/
  Pencil moves/releases, changed mesh/object/lock/mode at move and up, marker/capture
  cleanup, repeat/Undo/Redo/redo retention and existing Bevel/Knife/Loop covered.
- Two historical prepared-endpoint release fixtures now supply actual starting
  mesh/object context; no guard bypass or weakened assertions. Screen harness
  records real semantic events/capture/markers. Protected/frozen diff clean.
- Runtime body only Knife; one reviewed hash and required recovery/shell/Knife755.
  .754 perspective conversion/snap priorities, topology splitter and Loop untouched.
  Same-instance in-place geometry edits are not fingerprinted by this context guard;
  existing tool-exclusive events still own their cancellation.
- Publication/actual Node22/live verification and .755 device acceptance pending.


### .755 publication verification

Runtime cb28427114df517083239ef07b31e3abc4cac9d9 published. Actual Node22 Topology run37737755836/job113181100425:1881tests/1779PASS/102FAIL/0skip; all102failure names exactly match the local inventory and .754. Pages37737755773 succeeded. Live shell/version/Knife, accepted Vertex Extrude and frozenBeta6 version byte-match the tested checkout. Focused105PASS; .755 device acceptance pending.


### .755 acceptance — 2026-10-08

User PASS .755: repeated Knife/history, Done/tool/mode/navigation and locked-object refusal.


## 2026-10-08 — v0.36.18.756 Bevel preview facegroup validity

- User PASS .755 /nextbuild. Reproduced Face Bevel staged source Original labels,
  then external Reassigned label: Apply accepts and restores Original into live
  geometry and Undo. Edge blue preview likewise ignores label changes, although
  Edge exact already recomputes from current mesh rather than restoring old groups.
- Existing shared sourceUnchanged now compares effective label for every real face.
  Changed/deleted labels invalidate stale Face/Edge preview/Apply; Cancel retains
  current source and redo. Fresh relaunch uses current provenance/history.
- Missing legacy labels equal explicit null. Initial strict array-length comparison
  rejected the existing disconnected unlabelled-shell preview fixture; corrected to
  per-face semantic comparison, without editing/weakening that rendering test.
  Extra entries without a corresponding real face are not part of this comparison.
-15new tests: before9FAIL/6PASS, after15PASS; focused121PASS. Full Node24:
  1896/1794PASS/102FAIL/0skip; same102failure identities as755. Actual shared owner/
  session/history, reassignment/removal/truncation, Cancel/redo, fresh Apply/Undo/Redo,
  array replacement with same values, legacy unlabelled previews, Face Bevel→Knife→
  supported Loop closed shells/current labels covered. No blanket exclusions.
- Runtime body only shared Bevel validation; geometry/gestures/history algorithms
  unchanged. One reviewed hash; required shell/recovery/direct-Bevel756 pins.
  Knife755/VertexBevel753/Extrude752/Through751/protected main/Loop715/Multi/frozen
  betas retained. Publication/actual Node22/live verification and device756 pending.


### .756 publication verification — 2026-10-08

Runtime d1832204c878212a4254701c8996171e446215a3 published. Actual Node22 Topology run37750469278/job113222151677:1896tests/1794PASS/102FAIL/0skip; all102failure names exactly match the local inventory and .755. Pages37750468365 succeeded. Live shell/version/direct Bevel, accepted Knife and frozenBeta6 version byte-match the tested checkout. Focused121PASS; .756 device acceptance pending.


## 2026-10-08 — .756 acceptance / .757 Vertex Extrude axis chooser

User PASS .756.

User PASS .756; explicitly requests Vertex Extrude method match Edge Extrude's
viewport axis chooser, avoiding old drawer XYZ controls.

Audit: Vertex Extrude already owns Free/XYZ drag and exact vectors with a contextual
panel. Its session unconditionally hid the gizmo. Edge Extrude already uses the
expanded Move arrows/centre as constraint controls, offset beside selected geometry.
Reuse that existing presentation and handle owner for Vertex Extrude. XYZ arrows
select world axis; centre selects Free, without arming Move or moving geometry.
Original Vertex Extrude pointer/kernel/history/Repeat/Exact owners unchanged.
Original top-centre Exact/Repeat/Done and optional local direction buttons remain.
Chooser survives new-tip selection, highlights current direction, shows Free/axis
badge, hides Rotate/Scale/plane handles and retires on session exit. During live
pulls axis changes refuse. Closing hub discards preview through existing owner.
Edge remains XYZ / Plane perpendicular to edge; not changed to Vertex Free semantics.

10 new behavioral checks cover actual gizmo sync/handle/visual/session functions,
existing Vertex owner real Pencil pull, signed direction/exact/history and Edge
constraint event. Focused52PASS. Full Node24:1906tests/1804PASS/102FAIL/0skip;
all102failure names identical to .756, no exclusions. An extracted Object hub test
now loads the new predicate together with setHubState; assertions unchanged.
Syntax and whitespace checks pass. Two runtime bodies only: total-gizmo and
Vertex session explanatory text/version. Original geometry owner unchanged.
Reviewed two hashes and shell/recovery/two module757 keys. Bevel756/Knife755/
Extrude752/core/protected main/Loop715/Multi/frozen betas unchanged.
Publication/actual Node22/live verification pending. Device .757 acceptance pending.

Manual checks:
- Vertex → Extrude: viewport arrows appear beside selection. Tap X/Y/Z then pull;
  tap centre Free and pull diagonally. Axis choice alone does not move the vertex.
- Extrude another selected tip; Exact and Repeat still work. Undo/Redo each pull.
- Done/background returns selection to puck and navigation; Edge Extrude unchanged.


### .757 publication verification — 2026-10-08

Runtime 98ed74d9df3b09aa97856b38ef271a429a36a6bb published. Actual Node22 Topology run37753453091/job113232091538:1906tests/1804PASS/102FAIL/0skip; all102failure names exactly match local inventory and .756. Pages37753452518 succeeded. Live version/shell/total-gizmo/Vertex session, unchanged Vertex Extrude and frozenBeta6 version byte-match the tested checkout. Focused52PASS. Device .757 acceptance pending.


## 2026-10-08 — .758 radial UI refinement

User requests hiding old Vertex Extrude Free/XYZ buttons, moving Vertex Extrude
into shared Face/Edge location and normalizing Face outer ring after Align removal.
Existing owners audited: presentation only, no pointer/kernel/history changes.
Vertex panel direction row remains hidden; viewport arrows/Free centre are sole
visible direction chooser. Exact/Repeat/Done retained.
Extrude inner0°/12-o'clock across Face/Edge/Vertex. Add moves to former Vertex
Extrude outer216° slot; all14Vertex tools remain. Bevel90° unchanged.
Face15outer tools spread evenly at24° intervals, clockwise order retained and
Circle0° anchored. Align remains on gizmo. Shared Join Coplanar Edge24°, Vertex
Clean Vertices288°/Merge Dist312° match Face slots; other shared slots retained.
Existing cross-mode placement assertion caught that Face-only spacing would break
shared outer positions; coordinated those three controls rather than weakening it.
58focusedPASS; fullNode24:1906tests/1804PASS/102FAIL/0skip, identical102failure
identities to757. Existing inventory/spacing/hidden-controls assertions extended;
no new duplicate implementation/tests. Computed outer-button bounds do not overlap
in Face/Edge/Vertex. Original inner geometry retained. Syntax/whitespace pass.
Two reviewed runtime hashes and shell/recovery/total-gizmo/Vertex-panel758 pins.
Original VertexExtrude752/core, main732/Loop715/Multi1.0 and frozenbetas unchanged.
Publication/Node22/live verification pending. Device .758 acceptance pending.

Manual checks:
- Vertex Extrude: only viewport axes/Free centre; Exact/Repeat/Done still present.
- Extrude at12-o'clock in Face/Edge/Vertex; Vertex Add accessible on outer ring.
- Face outer ring evenly spaced, all tools reachable; Bevel remains3-o'clock.


### .758 publication verification — 2026-10-08

Runtime39a699296bcf990cadecb7621f7f5c4c9970c61b published. Actual Node22 Topology run37754720314/job113236320113:1906tests/1804PASS/102FAIL/0skip; all102failure names exactly match local inventory and .757. Pages37754719444 succeeded. Live shell/version/total-gizmo/Vertex panel, unchanged Vertex Extrude and frozenBeta6 version byte-match tested checkout. Focused58PASS. Device .758 acceptance pending.


## 2026-10-08 — .759 full Vertex / Edge Extrude UI parity

User rejects remaining UI/UX difference. Audit found Vertex top-centre Distance/
Apply Exact/Repeat/Done versus Edge chooser-only. .757/.758 aligned chooser/slots,
not full interface. Use Vertex interface as standard for both via SAME panel DOM,
styles, controls and lifecycle. No cloned panel or parallel extrusion kernel.
Existing Vertex settings owner accepts mode-specific Extrude adapter; other Vertex
sessions stay intact. Edge gets signed Exact/last-vector Repeat through its existing
boundary ribbon builder/private candidate validation/history. Exact applies chosen
axis (perpendicular projection for Edge) or last pull/view-up projected for Plane.
Repeat ON taps a boundary edge, same vector, new outer rail selected, one Undo.
Old direction rows and transform-strip settings hidden during both Extrude sessions.
Shared viewport XYZ arrows/Free centre; Edge centre labelled Free perpendicular
rather than Plane, preserving accepted perpendicular ribbon geometry. Vertex remains
view-plane Free. Same12-o’clock launch, offset chooser, popup and Done→puck/history.
Edge pointer owner retains direct pulls; context/cancel/capture protection, popup
click exemption and semantic completion added so shared controls cannot terminate
or compete with its session. Existing exclusive tool handoff preserves new owner.
Background policy uses Edge rendered hit ownership, protects Repeat from semantic
background delivery and closes Edge shared panel. No new raw background handler.
Edge restore includes facegroups; new ribbon labels explicitly null so committed
state and History clone agree. Source labels/creases retained; no provenance claim
for new ribbons beyond null. Extrusion geometry core unchanged.

10new behavioralPASS, focused62PASS. FullNode24:1916tests/1814PASS/102FAIL/0skip;
all102failure names identical to758. Actual shared DOM/controls, drawer/radial,
Pencil drag, Exact negative/refusal/history, Repeat, panel click capture, source
metadata/private validator failure, context/lock/Escape/background, Done→actual
puck owner tested. Existing Vertex/Edge/radial/background/release suites included.
Four reviewed runtime hashes/pins: Edge owner, shared panel, total-gizmo, background
policy; shell/recovery759. Vertex owner/core752, Edge geometry426, protected main/
Loop715/Multi and frozenbetas unchanged. Syntax/whitespace verified.
Publication/actualNode22/live verification pending; .759 device acceptance pending.

Manual checks:
- Compare Vertex and boundary/loose Edge Extrude: same axis chooser and top panel,
  Distance/Apply Exact/Repeat/Done; no old XYZ/Move controls.
- In each mode choose axis, pull; enter signed Exact, Repeat ON tap another source,
  then Undo/Redo. New tips/outer rails remain selected.
- Done/background restores puck and navigation; repeat next launch. Edge Free
  remains perpendicular to edge; Vertex Free follows view plane.


### .759 publication verification — 2026-10-08

Runtimeb2b5752804be956489e5f007d2f4859331fa1a9b published. Actual Node22 Topology run37757723383/job113246285445:1916tests/1814PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .758. Pages37757723210 succeeded. Live shell/version/all four changed runtime modules, unchanged Vertex Extrude and frozenBeta6 version byte-match tested checkout. Focused62PASS. Device .759 acceptance pending.


## .760 — floating Edge selection ownership — 2026-10-08

.759 explicitly user PASS. Gate body-only hit classification caused floating Edge
fresh taps to receive semantic background clear and drags to become Orbit. Reuse
selection bridge actual Edge picker; yield pending/active Paint and held modeless
browser, block Orbit while Pencil Lasso armed. Lasso Visible now accepts no-body
and foreground edges while rejecting nearer occluders; Through unchanged. Armed
stationary Edge taps use actual component pick. Original owners/polygon/midpoint,
other component visibility, geometry/history and accepted Extrude UI retained.
Seven new checks: old owners six FAIL/one PASS, new seven PASS; focused69PASS.
Full1923/1821PASS/102FAIL/0skip, exact same failure identities as759. Browser hold
checks cover event delivery with state stub; actual Grow/Shrink remains device gate.
Reviewed Gate/Lasso/Drawer hashes and loader pins760; shell/recovery760. Protected
main732/Loop715/Multi1.0/frozen betas unchanged. Publication verification pending.
Device checks: floating tap persists; Multi held horizontal/vertical drags select
without orbit; Visible Lasso floating edges; finger/empty background navigation.


### .760 publication verification — 2026-10-08

Runtime a85585c2a0c6ce42b74d808ed939660ebd257d34 published. Actual Node22 Topology run37766273730/job113274606897:1923tests/1821PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .759. Pages37766272406 succeeded. Live shell/version/Gate/Lasso/Drawer, accepted Edge Extrude and frozenBeta6 version byte-match tested checkout. Focused69PASS. Device .760 acceptance pending.


## .761 — Floating scaffold loop browsing — 2026-10-08

User .760 screenshot confirms correct release; loose branched scaffold cannot be
selected as a closed face outline via existing hold gestures. No .760 PASS claimed.
Audit: strict/directed selectors follow quad topology, straightest continuation or
whole unbranched boundary components; existing Face Boundary candidates require
real faces. Neither yields individual cells of a branched wire scaffold.

Extend existing main collectEdgeHoldCandidates with pure scaffoldLoopCandidates:
only loose seeds; infer incident planes (including subdivided collinear rails),
walk bounded planar cells through the seed, prune dangling branches, reject
exterior/degenerate/crossing/repeated/duplicate-real-face outlines. Deduplicate and
feed Scaffold Boundary candidates into same hold timer/horizontal browser/fixed
base/preview/window completion. Place before legacy candidates for loose seeds;
all original candidates remain. No changes to raw pointer owners, thresholds,
Close Face/Fill geometry/history, legacy selectors or surfaced loop candidate order.
Main change exactly one import and one candidate loop (three added lines).
Helper proposes existing edges only; no welding, automatic faces or nonplanar cap.

Ten new checks: all wire-cube seeds offer two 4-edge outlines; planar branched grid
returns local cells; subdivided rails/tails; rotations/translations/scales; refusal
for open/warped/degenerate/crossing input; no actual topology mutation; surfaced
browser exact candidate ordering retained. Actual main hold timer/browser/move/
window completion with actual Pencil gate, selectors, Grow owner and Fill/History
executes closed selection -> one face -> one Undo/Redo; cancellation restores base.
Harness adapts pointerdown to call actual armEdgeHold after actual rendered pick;
WebGL/entire main pointerdown are not executed. Old .760 main reproduces the one
hold-to-Close-Face failure (other nine pass with new helper available), new10PASS.
Focused79PASS; fullNode24:1933/1831PASS/102FAIL/0skip, exact .760 failure identities.
Syntax/whitespace pass. Main/helper reviewed hashes and cache pins761; shell and
recovery761. Gate/Lasso/Drawer760, Extrude759 retained. Loop715/Multi1.0 and all
frozen betas untouched. Publication/live verification pending; iPad .761 pending.

Device checks:
- Edge mode: hold a floating rail, slide sideways to browse closed face outlines;
  release on the desired outline, then Close Face.
- Undo/Redo the face and repeat on another scaffold opening.
- Ordinary surfaced loop gestures and floating tap/Lasso/navigation still work.
