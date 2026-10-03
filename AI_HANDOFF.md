# BoxLab AI Handoff — current development state

## New-chat starter prompt

Continue BoxLab development from current `main` of `CrisBezz/BoxLab`.
The repository is the source of truth; do not use remembered chat state against it.
Before code changes read AI_WORKFLOW.md completely, this file completely,
TEST_CHECKLIST.md, recent relevant DEV_HISTORY.md entries and ROADMAP.md.
Inspect main, recent commits, live release markers and script pins. Audit existing
functionality and authoritative owners before implementing anything new.

Current release: **v0.36.18.691**.
Current focus: hands-on confirmation of Face hold vertical Grow/Shrink neutral return.
The user confirmed the full .690 manual list PASS on 2026-10-03.
Face and Edge radial lifecycle work is complete and protected; continue broader
modeless interaction work one narrow gesture at a time, rather than adding radial glue.

## Current repository state

- Repository: CrisBezz/BoxLab, branch main.
- Live app: https://crisbezz.github.io/BoxLab/
- Release: v0.36.18.691.
- Parent checkpoint before .691: f298c22da26f03e191d5e0c740ab1ac1f2d8b2fd.
- Find the .691 runtime/documentation commit in current main history; no self-referential commit SHA is embedded here.
- Changed runtime owner: src/main.js, repinned to .691.
- Release bootstrap/version logic unchanged; both repinned to .691 to satisfy the current release-owner contract.

## Immediate hands-on checks — .691

Confirm the iPad visibly shows v0.36.18.691 before judging behaviour.
1. Face mode, no direct tool armed: Pencil hold a selected Face, then drag UP to Grow.
2. Keep holding; drag back to the starting point: starting Face selection returns.
3. Drag farther up, then back: preview reduces steps instead of accumulating.
4. With several adjacent Faces selected, hold and drag DOWN to Shrink, then return to start: original selection returns. Release keeps the displayed selection.
5. Face hold sideways candidate browsing and normal tap select/deselect remain unchanged.

.691 is awaiting hands-on PASS. Do not mark it protected until the user confirms.
After PASS, record it and re-audit before choosing the next narrow modeless gesture.

## .691 implementation / owner audit

Grow/Shrink hold gestures already existed in main.js from .638.
The existing vertical scrub always applied at least one step, even at the hold point.
Face-only neutral band (absolute vertical distance below 18 px) now restores the
fixed gesture starting selection and invokes no Grow/Shrink operation.
Outside the band the existing 30 px step scaling and authoritative
advanced-selection.js Grow/Shrink button owners remain unchanged.
Edge and Vertex retain their previous behavior. No new raw-pointer listener,
selection kernel, modelling kernel or radial UI was introduced.
Automated owner integration checks cover grow/reverse/neutral, shrink/neutral,
the neutral boundary and unchanged Edge/Vertex behavior. Targeted tests: 9/9 PASS.
Full CI has 285 pre-existing failures (verified against .690 runtime CI). The only
additional .691 failure was a stale release-version pin; both refresh pins were corrected.
Historical snapshot-marker assertions remain in the full suite; do not widen this
gesture build into a wholesale test cleanup.

## Protected hands-on behaviour

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

Edge radial lifecycle complete and protected.
Face radial lifecycle complete and protected through .690.
Extrude/Inset restore puck; Knife has viewport Done; Duplicate/Extract Faces create
objects and hand directly to Object gizmo. Shell/Sweep viewport proxies use the
shared Face-session completion semantic. Face Delete clears stale suppression.
Do not add further lifecycle glue without a concrete regression.

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
