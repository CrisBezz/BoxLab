# BoxLab AI Handoff — current development state

## New-chat starter prompt

Continue BoxLab development from current `main` of `CrisBezz/BoxLab`.
The repository is the source of truth; do not use remembered chat state against it.
Before code changes read AI_WORKFLOW.md completely, this file completely,
TEST_CHECKLIST.md, recent relevant DEV_HISTORY.md entries and ROADMAP.md.
Inspect main, recent commits, live release markers and script pins. Audit existing
functionality and authoritative owners before implementing anything new.

Current release: **v0.36.18.706**.
Current focus: hands-on Face radial Merge by Distance confirmation; then finish Face audit → Vertex → Object → final Edge.
The user confirmed the full .690 and .691 manual lists PASS on 2026-10-03.
Existing Face/Edge ring lifecycles are protected; full radial tool/settings coverage
is still the priority. Follow Face → Vertex → Object → final Edge, not broad gestures.

## User-directed priority — updated 2026-10-04

Radial menus contain ACTIVE modelling/repair tools only. Selections belong to
long press and gestures. .701 selection sectors were a scope mistake, removed .702.

All development moving forward must finalize radial menus and contextual settings.
No unrelated gestures/features/strengthening before this sequence is complete.

Primary goal: finish contextual radial menus and top-centre pop-out settings so routine
modelling needs as little left-drawer interaction as possible.
Required order: **Face gaps → Vertex → Object → final Edge completeness pass**.
The .690 PASS completed the lifecycle of the existing Face ring; it did NOT prove
that all Face drawer actions/settings had migrated into the contextual workflow.
Edge's existing radial lifecycle is protected, but overall Edge completeness must
be finalized after Vertex and Object. Stop broad gesture expansion while this
radial-menu work is the priority. .691 remains protected; .692 is already published
and its Edge neutral-return hands-on checks remain pending.
Before the next runtime build, compare the full Face drawer against the current
Face rings, audit existing action/settings owners, and choose the next related
Face contextual batch. Preserve current passes. Add contextual access/pop-outs by
reusing owners; remove redundant drawer UI only after its replacement passes.
Do not mistake a working ring lifecycle for complete contextual tool coverage.

## Current repository state

- Repository: CrisBezz/BoxLab, branch main.
- Live app: https://crisbezz.github.io/BoxLab/
- Release: v0.36.18.706; parent .705 checkpoint c4931014.
- Find the .706 runtime/documentation commit in main history; no self-referential SHA.
- Changed modules/pins: total-gizmo, face-repair-viewport, merge-by-distance,
  select-mergeable-verts, face-workflow-layout and drawer-ui .706.
- Release markers and main-loader/refresh pins .706; refresh logic unchanged.
- Align owners/pins remain .705; dock/session helper .700; protected transform .1.0.

## Immediate hands-on checks — .706

1. Confirm iPad visibly shows v0.36.18.706. Face ring has Merge Dist; prior tools and centred × usable.
2. Merge Dist opens top-centre Merge by Distance controls with whole-active-object scope and exact model-unit distance. Adjusting distance changes readiness; no geometry on launch/edit.
3. Cancel restores original selected Face/puck without geometry/history changes.
4. On an ordinary mesh with eligible nearby duplicate vertices, Apply welds once, stays Face mode, clears stale selection; next Face tap gets fresh puck. One Undo restores geometry; Redo repeats.
5. Healthy mesh/no safe nearby clusters or invalid distance disables Apply. Previous Align to Face, repair controls, background Done/navigation remain intact.

.705 full manual list confirmed PASS by user; protect arbitrary-plane Align, fixed
anchor/rigid shape, Cancel/rejection, selection/puck, one Undo/Redo and XYZ/navigation.
.702/.703/.704 retain their pending checks; no explicit PASS was received for those.
.706 awaits hands-on PASS. All previous protected checks remain.

## .706 Merge by Distance owner audit / implementation

Merge already exists: merge-by-distance .41 owns the conservative selected-Vertex
planner/commit; select-mergeable-verts .135/.137 scans whole-object safe clusters;
Face Repair .145 proxies those by switching Vertex mode. New Face radial Merge Dist
uses existing whole-object repair panel and owners without that mode hop.
Explicit model-unit tolerance and Apply/Cancel at top centre. Scans only on launch,
input/context change and Apply, not every positioning frame. No geometry/history on
launch, tolerance edit or Cancel. Each individually safe cluster is inspected through
existing planner; the combined batch is also validated, rejecting interacting clusters
that would create duplicate/collapsed/nonmanifold geometry. No duplicate welding kernel.

Owner now exposes applyFor with explicit IDs/tolerance/expected mesh and result; same
commit/remapping maths. Default Vertex apply still selects welded results and adjusts
Multi. Face contextual call preserves mode/Multi until proxy clears stale Face IDs
on success. History pushed once after successful result, not on rollback/no-op.
Locked/reference and changed mesh contexts blocked. Cancel preserves selection and
semantic completion returns puck; successful apply clears suppression for next tap.
Merge launcher allows editing distance even if current distance yields no candidates;
it does not inherit disabled Vertex selection or closed Repair drawer state.

Ring: eight inner unchanged; fifteen outer at 220px/24 degrees, guide 440px. Outer
button spacing audited; placement remains provisional until full coverage decisions.
55 targeted owner/panel/whole-object scope/invalid and joint-unsafe rejection/Vertex
loose topology/disabled-target radial dispatch/protected Align/repair/dock/session/
release checks PASS. Full suite 1139 tests, 854 PASS; same 285 failure names as .705,
no new failures. Syntax and diff checks PASS.

Next: confirm .706; finish Face owner/settings inventory before declaring Face
complete, then Vertex → Object → final Edge. Through already lives in Extrude.
Keep drawer fallbacks, no selection-only radial helpers or unrelated strengthening.

## .705 Align to Face owner audit / implementation

User-requested arbitrary-plane alignment is implemented beside X/Y/Z in the existing
Face Align pop-out, with no additional ring sector or viewport pointer owner.
component-align owns the same early window anchor pick/commit/completion; its core
now plans Face-group placement by reusing surface-transform-core's quaternion helper.
Existing Make Planar was audited: it projects a Face onto its own plane and is a
distinct capability, not rigid placement onto another Face. Existing XYZ paths stay intact.

Moving group must be planar; rotation keeps its shape. With disjoint Faces the pivot
is the moving group's centre, followed only by anchor-normal translation (no tangential
recentering). Shared vertices use a hinge pivot and must stay fixed under the rigid
transform; conflicting cases reject. Fixed Face coordinates are never assigned.
Closest coplanar orientation is used without forcing opposite winding to flip.
Plans use a candidate mesh first. Invalid/warped source or anchor, bent groups,
coincident vertices/zero signed area in affected neighbours, topology-gate failures
and increased Mesh Health zero-area count reject before live geometry/history changes.
Successful changes commit one history step; no-op coplanarity adds none. Selection is
preserved; owner completion returns puck. Rejection retains arming/settings and shows
its reason, allowing another anchor or Cancel. No independent raw-pointer listener.

48 targeted plane/group/hinge/shape/tangential-position/owner/Undo/Redo/rejection,
XYZ/core/proxy/repair/dock/background/Bridge/value/release checks PASS; syntax PASS.
Ring layout and protected modelling kernels remain unchanged. Full regression: 1132 tests, 847 PASS,
same 285 failure names as .704, no new failures.

Hands-on .705 confirmed PASS; Merge by Distance contextual scope/parameters now
implemented in .706 above. Continue Face audit → Vertex → Object → final Edge. Through already belongs to Extrude. No unrelated development, no selection
helpers in rings, no premature Face-complete claim or bulk drawer removal.

## .704 owner audit / implementation — retained checkpoint

Clean Vertices already exists in clean-vertices.js, loaded by drawer-ui. Face Repair
also already proxies it. Added to the existing whole-object scope panel/ring, using
its unchanged plan/apply kernel and history. Owner now returns explicit success or
failure and exposes syncUI; this prevents a void result from being treated as failure
by contextual panels. Other callers ignore the return as before. No cleanup maths changed.

Align/Flatten already exists for Vertex/Edge/Face in component-align.js/core .330.
Added one Face Align launcher and top-centre X/Y/Z/Cancel settings. No geometry on
launch/axis choice; existing early window owner still picks the selected anchor and
commits history. It now emits boxlab-component-align-change on arm/disarm/apply and
exposes axis state. The proxy reacts to owner completion, then emits the shared Face
session completion; no additional viewport pointer listener. Cancel/context changes
end arming; other tools hide settings without resetting their hub. Hub remains hidden
during Align controls. Clean cleanup clears stale Face indices; Align keeps selection.
Single Face disables Align; locked/reference context blocked. Existing Vertex/Edge
Align geometry/gesture behavior and the .330 core remain unchanged.

Current ring: eight inner unchanged, fourteen outer evenly spaced at 205px; guide 410px.
Outer/outer and outer/inner button rectangle spacing PASS; placement remains provisional.
36 targeted Align owner/core/proxy, cleanup owner/repair, dock/background/Bridge/value
and release checks PASS; syntax PASS. Full suite: 1120 tests, 835 PASS, same 285 failure
names as .703; no new failures. Two legacy Align loader tests now assert one loader
with a versioned URL rather than the retired .330 cache pin.

The requested Align to Face extension is now implemented in .705 above.
Next, finish the Face active-tool/settings audit (especially
existing Face Repair Merge by Distance scope/parameter workflow). Through already lives
in Extrude, so do not create a parallel Through tool. Do not declare Face complete
until every applicable existing owner/settings path is accounted for. Then Vertex →
Object → final Edge; no unrelated development. Keep drawer fallbacks until replacements
pass. Choose inner/main versus outer/secondary with user after coverage is populated.

## .703 owner audit / implementation — retained checkpoint

Three existing whole-active-mesh repair owners were already loaded by
face-workflow-layout.js: close-holes .201, quad-pair-cleanup .205, quadify-ngons .203.
Their kernels, validation, rollback and history are unchanged. New face-repair-viewport
uses their public APIs and syncUI availability; explicit scope + Apply/Cancel dock at
top centre. No geometry mutation on launch/Cancel; failed repairs keep selection and
show the existing owner reason. Successful rebuilding clears stale Face indices via
the existing selection bridge and emits shared Face session completion. The hub stays
hidden while the scope panel is active, even if selection changes. Mesh/mode changes
close the scope panel; locked/reference active objects cannot apply. No raw viewport
pointer owner added. Outer ring: twelve 30-degree sectors at 175px, guide 350px; all
prior targets retained; outer/outer and outer/inner rectangle spacing audited. Inner
positions unchanged. 21 targeted repair/dock/background/Bridge/value/release checks PASS. Full suite: 1112 tests, 827 PASS, same 285 failures as .702; failure names compared, no new failures.
At .703, the next audited gaps were Clean Vertices and component Align, now added
in .704 above. Whole-object scope stays explicit; no selection-only ring entries.
Drawer fallbacks remain until contextual replacements pass; do not remove panels wholesale.

## .702 scope correction / next build rule

Removed Coplanar/Connected from the Face ring and their shared one-shot label list;
restored the compact .700 active-tool layout. Their authoritative selection owners
and existing drawer/gesture workflows are untouched. No modelling kernel or pointer
owner changed. Existing top-centre placement and background Done stay protected.
15 targeted protected dock/background/proxy/Bridge/release checks PASS; syntax PASS.
Primary sequence remains Face active-tool/settings gaps → Vertex → Object → final
Edge. Audit remaining active modelling/repair commands and their parameter controls.
Do NOT add selection helpers, filters or selection-only diagnostics to the rings.
Whole-mesh repair commands need explicit scope and existing owners; distinguish them
from selected-Face tools. Do not grow rings simply to mirror every drawer button.

## Two-ring design direction / .694 audit

User requested two concentric Face tool rings instead of More. Populate remaining
Face tools first, then decide main/frequently-used inner versus secondary outer
placement together. If the completed layout is too crowded, a More pop-out remains
an explicitly accepted fallback; do not choose it prematurely.
.694 removes the .693 More UI and puts Join Coplanar (existing owner) plus Circle
(existing #componentCircleBtn owner) directly on an outer ring at 145 px radius.
The existing eight inner sectors remain at 82 px. Current outer assignments are
provisional. Both actions use current button validation/history and shared one-shot
puck cleanup. No modelling owner changed; no new raw-pointer gesture owner.
Continue auditing remaining active repair/topology actions and tool settings one
safe batch at a time. Selection-only commands stay outside rings. Pop-out settings remain appropriate for tools with parameters.

## Retained hands-on checks — .692

Confirm the iPad visibly shows v0.36.18.692 before judging behaviour.
1. Edge mode, no direct tool armed: Pencil hold a selected Edge, then drag UP to Grow.
2. Keep holding; return to the starting point: initial Edge selection returns.
3. Drag farther up, then back: preview reduces steps instead of accumulating.
4. With several adjacent Edges selected, hold and drag DOWN to Shrink, then return to start: original selection returns. Release keeps the displayed selection.
5. Sideways Edge Loop/Ring/Boundary browsing, additive base selection and Face .691 neutral return remain intact.

.692 is awaiting hands-on PASS. .691 is now confirmed PASS and protected.
Record any .692 PASS without changing the primary radial-menu sequence above.

## .692 implementation / owner audit

Extended the already-tested Face neutral return to the existing Edge vertical scrub.
Only the type gate in applyVerticalSelectionScrub changed. The shared main.js owner
still recomputes previews from the fixed base and invokes existing Grow/Shrink buttons.
Edge horizontal candidate enumeration, additive merge, release/cancel ownership,
Loop Cut and all radial tools are untouched. Vertex behavior is unchanged.
12/12 targeted behavioral/release tests PASS: Edge Grow/reverse/neutral,
multi-edge Shrink/neutral, band boundary, Face .691 regressions and release contracts.
The full-suite baseline is still 285 existing failures; compare CI before claiming
any new failures. Keep historical test cleanup separate from this gesture build.

## .691 implementation / owner audit

Grow/Shrink hold gestures already existed in main.js from .638.
The existing vertical scrub always applied at least one step, even at the hold point.
Face-only neutral band (absolute vertical distance below 18 px) now restores the
fixed gesture starting selection and invokes no Grow/Shrink operation.
Outside the band the existing 30 px step scaling and authoritative
advanced-selection.js Grow/Shrink button owners remain unchanged.
At .691, Edge and Vertex retained previous behavior; .692 extends neutral return to Edge only. No new raw-pointer listener,
selection kernel, modelling kernel or radial UI was introduced.
Automated owner integration checks cover grow/reverse/neutral, shrink/neutral,
the neutral boundary and unchanged Edge/Vertex behavior. Targeted tests: 9/9 PASS.
Full CI has 285 pre-existing failures (verified against .690 runtime CI). The only
additional .691 failure was a stale release-version pin; both refresh pins were corrected.
Historical snapshot-marker assertions remain in the full suite; do not widen this
gesture build into a wholesale test cleanup.

## Protected hands-on behaviour

- .705 Align to Face full manual list PASS: arbitrary-plane placement, fixed anchor, rigid group, guarded rejection/Cancel, selection/puck, one-step Undo/Redo and XYZ/navigation.

- .701 Coplanar/Connected owner behavior PASS; radial access retired by user scope correction in .702.

- .700 top-centre viewport popups/numeric entry and finger/Pencil background Done for Extrude/Inset, preserved selection/navigation: PASS.

- .699 radial Extrude/Inset Exact/Repeat/Done controls: PASS.

- .698 Face Bridge viewport preview/Next/Use/Cancel, Undo, fresh puck and centred ×: PASS.

- .697 Orient Faces/Orient Outward, validation, no-change feedback, selection/puck and one-step Undo: PASS.

- .696 outer Triangulate/Flip Faces, selection, triangle-only disabled state, puck return and one-step Undo: PASS.

- .695 outer Poke/Make Planar, selection, disabled-state rules, puck return and one-step Undo: PASS.

- .694 two-ring Face layout, direct Join/Circle, one-step Undo, disabled actions and ring close: PASS.

- .691 Face hold vertical Grow/Shrink neutral return PASS, including step reversal, sideways browsing and normal taps.

- .690: iPad refreshed version confirmed; Shell Cancel/Apply, Sweep Cancel/Apply,
  fresh Face puck after cleared selection, and Knife Done regression all PASS.
- .682 Pencil/Object routing PERFECT / PASS:
  finger/Pencil background tap dismisses Object gizmo; object stays selected;
  Pencil background drag orbits; tapping the object reliably restores gizmo.
- .684 radial Knife viewport Done session PASS.
- .688 Loop Cut / Loop Slide old feel PASS. The known-good .162
  logical-quad compatibility core is restored intact; do not casually generalize it.
- .689 Face Delete one-shot hub cleanup PASS.
- .676 guided radial Edge Bridge PASS.
- .677 Edge radial one-shot cleanup PASS.
- .670 selection-first radial Crease PERFECT / PASS.
- .663/.664 Edge Extrude radial ribbons work really well and are protected.

## Protected navigation / files

Preserve one-finger orbit, two-finger pan, pinch zoom, two-finger tap Undo,
three-finger tap Redo, no-jump orbit pivot, persistent selections during navigation,
Studio realtime default, current snapping and object management / Multi.
`src/multi-object-transform.js?v=0.36.1.0` is protected: do not change it unless the
requested task explicitly requires it. Frozen betas remain immutable.

## Selection Hub status

Existing Edge radial lifecycle protected; full coverage gets a final pass after Object.
Existing Face 8-sector lifecycle protected through .690; audit remaining drawer gaps.
Extrude/Inset restore puck; Knife has viewport Done; Duplicate/Extract Faces create
objects and hand directly to Object gizmo. Shell/Sweep viewport proxies use the
shared Face-session completion semantic. Face Delete clears stale suppression.
Existing lifecycle glue needs no further work without a regression. Complete missing
Face contextual actions/settings before moving to Vertex and Object.

## Strengthening backlog — keep separate

1. Connected-chain Edge Bevel through ordinary quad valence.
2. Complex logical-quad Loop Cut with multiple collinear boundary vertices.
   .685–.687 degraded topology/slide feel; .688 restored trusted .162 behavior.
   Future strengthening must be isolated and preserve ordinary Loop Cut identically.

## Gesture / event ownership

Tool owners may call stopImmediatePropagation; later document listeners may not see
completion. Prefer semantic owner events or early window capture for global lifecycle.
Do not stack raw-pointer owners. Precision belongs to the actual active gesture owner.
The .617–.619 double/triple-tap experiment failed due to competing release owners and
gizmo interception; it was removed in .620. Do not casually reinstate it.

## Release / cache protocol

Each build updates version.json, HTML title, data-release-version, visible label and
all changed module pins. Repin dynamic-import parent loaders when necessary.
Repin release-bootstrap/release-version if refresh logic changes. Verify published
main and live shell. If the iPad looks stale, compare its visible version against
manifest and HTML before changing modelling code.
.690 refresh incident: bootstrap previously stopped after three stale-shell responses;
recovery now continues with escalating cache-busters and bounded retry counter.

## Development workflow

/nextbuild: audit first, implement one narrow build directly on main, update release
markers and handoff/history/checklist, publish and verify, then give 3–6 short manual
checks. Record user PASSes as protected. Keep changes modular; reconnect authoritative
owners instead of parallel implementations. Never reapply bulk .450 UI cleanup.
If a straightforward gesture fix fails, use Gesture Debug before more speculation.
End each changed session with current AI_HANDOFF.md, DEV_HISTORY.md and
TEST_CHECKLIST.md so a fresh chat can continue from the repo alone.
