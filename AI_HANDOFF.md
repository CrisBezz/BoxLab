# BoxLab AI Handoff — current development state

## New-chat starter prompt

Continue BoxLab development from current `main` of `CrisBezz/BoxLab`.
The repository is the source of truth; do not use remembered chat state against it.
Before code changes read AI_WORKFLOW.md completely, this file completely,
TEST_CHECKLIST.md, recent relevant DEV_HISTORY.md entries and ROADMAP.md.
Inspect main, recent commits, live release markers and script pins. Audit existing
functionality and authoritative owners before implementing anything new.

Current release: **v0.36.18.694**.
Current focus: finish Face radial tool/settings gaps, then Vertex, Object and final Edge completeness.
The user confirmed the full .690 and .691 manual lists PASS on 2026-10-03.
Existing Face/Edge ring lifecycles are protected; full radial tool/settings coverage
is still the priority. Follow Face → Vertex → Object → final Edge, not broad gestures.

## User-directed priority — 2026-10-03

Primary goal: finish contextual radial menus and nearby pop-out settings so routine
modelling needs as little left-drawer interaction as possible.
Required order: **Face gaps → Vertex → Object → final Edge completeness pass**.
The .690 PASS completed the lifecycle of the existing Face ring; it did NOT prove
that all Face drawer actions/settings had migrated into the contextual workflow.
Edge's existing radial lifecycle is protected, but overall Edge completeness must
be finalized after Vertex and Object. Stop broad gesture expansion while this
radial-menu work is the priority. .691 remains protected; .692 is already published
and its Edge neutral-return hands-on checks remain pending.
Before the next runtime build, compare the full Face drawer against the current
8-sector ring, audit existing action/settings owners, and choose one remaining
Face contextual gap. Preserve current passes. Add contextual access/pop-outs by
reusing owners; remove redundant drawer UI only after its replacement passes.
Do not mistake a working ring lifecycle for complete contextual tool coverage.

## Current repository state

- Repository: CrisBezz/BoxLab, branch main.
- Live app: https://crisbezz.github.io/BoxLab/
- Release: v0.36.18.694.
- Parent checkpoint before .694: beb42f187b0789049c87a81608628220e4cb734f.
- Find the .694 runtime/documentation commit in current main history; no self-referential commit SHA is embedded here.
- Changed runtime owner: src/total-gizmo.js, repinned to .694; main.js code unchanged.
- Release bootstrap/version logic unchanged; both repinned to .694 to satisfy the current release-owner contract.

## Immediate hands-on checks — .694

Confirm iPad visibly shows v0.36.18.694.
1. Face puck → gizmo centre → tools: eight inner sectors plus outer Join Coplanar and Circle; no More button.
2. Select adjacent coplanar Faces; outer Join merges and returns selected-result puck; one Undo restores Faces.
3. Select one planar Face; outer Circle circularizes its boundary and returns puck; one Undo restores the original shape.
4. Invalid selection disables the respective action; centre closes both rings; inner tools still work.
5. Check spacing with Pencil/touch and after orbit/zoom, especially near viewport edges.

.694 awaits hands-on PASS. .693 was superseded before an explicit PASS; .692 checks
remain pending. Face gaps → Vertex → Object → final Edge remains the priority.

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
Continue auditing Face Bridge, Poke and repair/topology actions one safe batch at a
time. Pop-out settings remain appropriate for tools with parameters.

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
