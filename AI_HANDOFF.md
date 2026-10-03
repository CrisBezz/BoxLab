# BoxLab AI Handoff — current development state

## New-chat starter prompt

Continue BoxLab development from current `main` of `CrisBezz/BoxLab`.
The repository is the source of truth; do not use remembered chat state against it.
Before code changes read AI_WORKFLOW.md completely, this file completely,
TEST_CHECKLIST.md, recent relevant DEV_HISTORY.md entries and ROADMAP.md.
Inspect main, recent commits, live release markers and script pins. Audit existing
functionality and authoritative owners before implementing anything new.

Current release: **v0.36.18.704**.
Current focus: finish Face radial tool/settings gaps, then Vertex, Object and final Edge completeness.
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
- Release: v0.36.18.704.
- Parent checkpoint before .704: 69c699e0 (find full SHA in history).
- Find the .704 runtime/documentation commit in current main history; no self-referential commit SHA is embedded here.
- Changed owners: total-gizmo.js, face-repair-viewport.js, new face-align-viewport.js, clean-vertices.js and component-align.js .704. drawer-ui loader/child pins .704; main.js code unchanged but shell pin .704. Shared dock and previous sessions retain .700.
- Release bootstrap/version logic unchanged; both repinned to .704 to satisfy the current release-owner contract.

## Immediate hands-on checks — .704

Confirm iPad visibly shows v0.36.18.704.
1. Face outer ring now includes Clean Vertices and Align; old tools and centre × remain accessible. Eight inner/fourteen outer tools, provisional placement.
2. Two or more Faces selected → Align → choose X/Y/Z → tap a selected Face as anchor. That Face stays fixed; other selected vertices align on the chosen axis. Selection/puck returns; one Undo restores geometry.
3. Align Cancel (before or after choosing an axis) changes no geometry and returns the selected puck. Single-Face selection disables Align.
4. Eligible mesh → Clean Vertices shows whole-active-object scope at top centre. Cancel preserves mesh/selection; Apply performs safe cleanup once, clears Face IDs; next Face tap gets fresh puck. Healthy cube disables cleanup.
5. .703 repairs, existing Face/Edge sessions, Extrude/Inset background Done, selection and navigation stay intact.

.704 awaits hands-on PASS. .702/.703 checks also remain pending; user requested
/nextbuild without claiming a PASS. Do not record implied PASS. .701 selection
commands passed, but radial selection placement was explicitly retired.

## .704 owner audit / implementation

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

Next: hands-on confirmation, then finish the Face active-tool/settings audit (especially
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
