# BoxLab AI Handoff — current development state

## New-chat starter prompt

Copy/paste this into a fresh ChatGPT development chat:

> Continue development of **BoxLab** from the current `main` branch of `CrisBezz/BoxLab`.
>
> **Repository is the source of truth. Do not rely on remembered chat state if it conflicts with the repo.**
>
> Before changing code:
> 1. Read `AI_WORKFLOW.md` completely.
> 2. Read `AI_HANDOFF.md` completely.
> 3. Read `TEST_CHECKLIST.md`.
> 4. Read the recent relevant entries in `DEV_HISTORY.md`.
> 5. Read `ROADMAP.md`.
> 6. Inspect current `main`, the live release markers, current script pins, and recent commits.
> 7. Audit for existing functionality before adding anything new. Prefer reconnecting/repairing existing owners over creating parallel implementations.
>
> **Current release:** v0.36.18.690
>
> **Current live-development focus:** finish hands-on confirmation of the v0.36.18.690 Face-session exit cleanup after the refreshed shell actually loads. If .690 passes, stop adding Face/Edge radial glue and move into the broader modeless interaction phase one narrow gesture at a time.
>
> **Current .690 manual checks:**
> - Face -> puck -> Shell -> Cancel: original Face selection should return with puck.
> - Shell -> Apply: session closes cleanly; puck returns if Face selection survives.
> - Face -> puck -> Sweep -> Cancel: puck returns if Face selection survives.
> - Sweep -> Apply: no stale Selection Hub suppression; if selection clears, next Face tap gets a fresh puck.
> - Knife -> Done remains PASS.
> - Confirm the iPad is genuinely showing **v0.36.18.690** before judging .690 behaviour.
>
> **Important release/cache state:**
> - .690 initially failed to refresh on iPad even though `main` was correct.
> - Root cause: `release-bootstrap.js` stopped retrying after 3 stale-shell responses.
> - That guard has now been hardened so stale-shell recovery does not permanently stop.
> - `release-bootstrap.js` and `release-version.js` were repinned to .690.
> - Before changing modelling code because a user reports an old bug/build, first verify which version is actually visible in their screenshot and compare it with `version.json` and the HTML shell on `main`.
>
> **Protected hands-on behaviour:**
> - v0.36.18.682 Pencil/Object routing reliability: PERFECT / PASS.
>   - finger or Pencil background tap dismisses Object gizmo
>   - Pencil drag on background orbits
>   - object remains selected
>   - tapping object reliably restores gizmo
> - v0.36.18.684 radial Knife viewport session: PASS.
> - v0.36.18.688 restored known-good Loop Cut / Loop Slide feel: PASS.
>   - this is the old v0.36.18.162 logical-quad compatibility path restored intact
>   - do not re-generalize this core casually
> - v0.36.18.689 radial Face Delete hub cleanup: PASS.
> - v0.36.18.676 guided radial Edge Bridge: PASS.
> - v0.36.18.677 Edge radial one-shot cleanup: PASS.
> - v0.36.18.670 radial Crease selection-first workflow: PERFECT / PASS.
> - Edge Extrude radial workflow from .663/.664 works really well and is protected.
>
> **Protected navigation baseline:**
> - one-finger orbit
> - two-finger pan
> - pinch zoom
> - two-finger tap Undo
> - three-finger tap Redo
> - no-jump orbit pivot
> - persistent selections during navigation
> - Studio realtime default
> - current snapping
> - object-management / Multi behaviour
>
> **Special protected file:**
> - `src/multi-object-transform.js?v=0.36.1.0`
> - Do not change this unless the task explicitly requires it.
>
> **Selection Hub / radial status:**
> - Edge radial lifecycle is effectively complete and protected.
> - Face radial lifecycle implementation is complete through .690, pending final Shell/Sweep exit hands-on confirmation.
> - Extrude / Inset already restore the puck.
> - Knife has a viewport Done session.
> - Duplicate Faces creates a new object and hands directly to Object gizmo.
> - Extract Faces creates a new object and hands directly to Object gizmo.
> - Shell and Sweep have viewport panels and now emit a shared Face-session completion semantic in .690.
> - Face Delete is a direct one-shot and stale hub suppression is cleaned.
>
> **Strengthening list — do not mix these into unrelated work:**
> 1. Connected-chain Edge Bevel through ordinary quad valence.
> 2. Complex logical-quad Loop Cut through multiple collinear boundary vertices.
>    - The .685-.687 attempt degraded Loop Cut topology/slide feel.
>    - .688 restored the trusted v0.36.18.162 behaviour.
>    - Future work on this case must be isolated and must not alter the protected core unless it can prove identical behaviour on ordinary Loop Cut.
>
> **Gesture/event ownership rules:**
> - Tool-specific modules may call `stopImmediatePropagation()`.
> - A later document listener may never see completion.
> - Prefer semantic owner events or early window-capture listeners for global lifecycle.
> - Do not stack multiple raw-pointer owners for the same gesture.
> - Precision behaviour must live with the actual gesture owner.
>
> **Version / publishing rules for every build:**
> - Update `version.json`, HTML `<title>`, `data-release-version`, visible version label, and every changed module cache pin.
> - For dynamically imported modules, repin the parent loader if needed.
> - If refresh logic changes, repin `release-bootstrap.js` / `release-version.js`.
> - Verify current `main` after publishing.
> - Do not assume a user test is valid until the intended version is visible on their iPad.
>
> **Development workflow:**
> - User says `/nextbuild` = audit current repo first, then implement the next narrow build directly on `main`, update release markers, update handoff/history/checklist, and give a short hands-on test list.
> - User replies PASS/FAIL; record PASSes as protected.
> - Keep changes narrow and modular.
> - Do not reapply large UI cleanups wholesale.
> - Prefer authoritative owners; never add a duplicate modelling kernel if one already exists.
>
> **For the next build after .690 PASS:**
> - Move into broader modeless gesture work rather than more radial UI glue.
> - Implement one narrow gesture at a time and protect each hands-on PASS before continuing.
> - Re-audit the repo before choosing the exact first modeless gesture.

## Current repository state

- Release: **v0.36.18.690**
- Live app: `https://crisbezz.github.io/BoxLab/`
- Repo: `CrisBezz/BoxLab`
- Runtime release baseline before documentation-only handoff commits: `8efc9589423039927bfdb9da9da6710cdb311407`
- Documentation has been updated after that runtime commit; current `main` is newer because of handoff/workflow documentation commits.

## Immediate status

v0.36.18.690 implemented unified Face-session completion for radial Knife / Shell / Sweep.

Still awaiting hands-on confirmation after the refresh issue:
- Shell Cancel / Apply
- Sweep Cancel / Apply
- Knife regression
- verify iPad visibly loads .690

If .690 passes:
- mark .690 protected
- declare Face radial lifecycle complete
- move to broader modeless gesture work

## Release refresh incident at .690

The .690 runtime was correct on `main`, but iPad/Safari could remain on .689 because the old release bootstrap stopped after three stale-shell responses.

Fixed:
- stale-shell recovery no longer permanently stops after three attempts
- cache-buster escalates
- attempt counter resets instead of abandoning recovery
- `release-bootstrap.js` repinned to .690
- `release-version.js` repinned to .690

This is now part of `AI_WORKFLOW.md` and must be followed on future releases.

## Protected current behaviour

Do not disturb without explicit need:
- .682 Object/Pencil interaction contract
- .684 Knife viewport session
- .688 Loop Cut / Loop Slide known-good feel
- .689 Face Delete cleanup
- .676/.677 Edge radial completion
- .670 Crease radial session
- Edge Extrude workflow
- protected iPad navigation baseline
- `src/multi-object-transform.js?v=0.36.1.0`

## Strengthening backlog

Keep separate from normal UX builds:
- Connected-chain Edge Bevel through ordinary quad valence
- Complex logical-quad Loop Cut through multiple collinear boundary vertices

## Handoff completion rule

A new chat should be able to continue by reading:
- `AI_WORKFLOW.md`
- `AI_HANDOFF.md`
- `TEST_CHECKLIST.md`
- recent `DEV_HISTORY.md`
- `ROADMAP.md`
- current `main`

If any of those conflict, current repository code and current release markers win.
