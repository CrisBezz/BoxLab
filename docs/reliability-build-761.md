# BoxLab .761 — Floating scaffold loop browsing

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
