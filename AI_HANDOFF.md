# BoxLab AI Handoff — current development state

## New-chat starter prompt

Continue current main of CrisBezz/BoxLab. Repository is the source of truth.
Read AI_WORKFLOW.md completely, this file completely, TEST_CHECKLIST.md, recent
relevant DEV_HISTORY.md entries and ROADMAP.md before code changes. Audit current
main/live shell/pins and authoritative owners; reconnect existing functionality.

Current release: **v0.36.18.710**.
Current focus: user-requested ALL existing Vertex Active Tools now exposed in the
radial workflow, plus consistent Bevel positions in Face/Edge/Vertex. Await one
combined hands-on test/refinement session before proceeding to Object.
User expressly requested this complete Vertex batch rather than two tools per build.
.708 full Face Bevel manual list PASS and protected. .709 was NOT confirmed PASS;
its Merge pair is included in the .710 combined checks. No new PASS is inferred.

## Priority and scope

Finish contextual radial menus/settings so routine modelling needs little drawer
interaction: Face coverage → Vertex → Object → final Edge completeness pass.
Radials contain active modelling/repair tools only; selections remain long press/
gestures. No unrelated gesture expansion, topology strengthening or wholesale UI
cleanup. Keep authoritative drawer fallbacks until replacements pass.
All session popups/numeric entry use shared top-centre viewport placement owner.
User's consistency rule: **Bevel is inner-ring 90 degrees / 3 o'clock in Face,
Edge and Vertex**. Preserve this across future ring refinements.

## Repository / cache state

- Main CrisBezz/BoxLab; live https://crisbezz.github.io/BoxLab/.
- .710 parent .709 checkpoint a8e90f86. Find release commit in main history;
  avoid self-referential SHA in this file.
- New vertex-tool-viewport-session direct loader .710; total-gizmo .710.
- Add/build/direct Vertex Bevel owner loaders .710. drawer-ui .710 dynamically
  imports precision-bevel and vertex-slide-polish .710. Their kernels/math unchanged.
- Shell markers, main loader, release-bootstrap and release-version pins .710;
  main and refresh logic unchanged.
- Protected Face Bevel direct/helper/session .708 unchanged; repair .706,
  Face Align .705 (existing shell pin .708), shared session dock .700.
- Protected multi-object-transform .1.0, Loop Cut/Slide compatibility, modelling
  kernels and all frozen beta directories unchanged.

## .710 audited Vertex inventory / ring layout

Only existing Vertex Active Tools were included. Base index + face-reconstruct /
component-circle provide six primary tools, native Join/Weld/Delete provide three,
vertex-merge provides Center/First, Vertex Repair contains Clean/Merge by Distance.
Selection helpers/diagnostics are excluded. Align's componentAlignRow belongs to
Selection controls, not Vertex Active Tools, so it was not added under this request.
No Vertex Extrude or other new modelling capability introduced.

| Clockwise inner ring from top | Owner |
| --- | --- |
| Add (0°) | add-vertex-edge-snap / original Add launch |
| Build Edge (45°) | add-edge-ui |
| Bevel (90°) | direct-multi-vertex-bevel + precision-bevel |
| Slide (135°) | vertex-slide-polish |
| Join (180°) | main connectSelectedVertices |
| Weld (225°) | main weldSelectedVertices |
| Create Face (270°) | face-reconstruct |
| Delete (315°) | main + safe-loose-vertex-delete interception |

Outer ring at145px, five72° sectors: Circle (0°), Merge Center (72°), Merge First
(144°), Merge Dist (216°), Clean Vertices (288°). Shared centred × preserved.
Outer/outer and outer/inner rectangle spacing verified; original inner radius82px.

Face remains eight inner/sixteen outer: Bevel replaces Knife at90°, Knife moves
135°, Duplicate moves180°, Extract replaces previous outer Bevel at337.5°.
Edge: Slide moves45°, Bevel90°, Crease135°; all other assignments unchanged.
Only layout changes to protected Face/Edge; their session owners/kernels unchanged.

## .710 contextual owners / lifecycle

New top-centre Vertex panel is a UI proxy, not a modelling/pointer owner:
- Add and Build Edge: instructions + Done; existing repeated placement/build behavior.
  Add Done uses existing stop(true), selecting last Added vertex. Superseding tools
  stop(false), preserving current selection. Build retains original creation behavior.
- Bevel: existing Width slider + Exact % / Apply Exact / Cancel. Slider sets next
  operation width; same existing Vertex bevel drag/kernel (no new blue preview or
  invented Segments). Owner completion closes/disarms contextual session. Exact is
  one existing history step; Cancel before Apply does not mutate or add history.
- Slide: signed exact percentage / Apply Exact / Done. Existing .162 rail selection,
  eligibility and math preserved intact; drag and exact use actual owner. Completion
  semantic returns selected result puck and disarms only radial session.
- Merge by Distance: explicitly SELECTED vertices only, model-unit tolerance,
  Apply/Cancel via existing .706 applyFor(selectResults:true). Launcher accepts two
  selected vertices even when current default distance has no candidates; readiness
  follows existing planner. No mode hop/whole-object widening or duplicate weld kernel.
- Clean Vertices: explicitly WHOLE active object, Apply/Cancel through existing
  cleanup owner. Success clears stale IDs; next Vertex tap gets fresh puck.

Join/Weld/Create Face/Delete/Circle/Center/First call existing buttons, then clear
hub suppression. Weld/merges/Circle return result selection puck. Join hands to Edge;
Create Face hands to Face; queued owner result selection is retained. Delete can clear
selection; next tap is fresh. Disabled targets/read-only objects/mode guards preserved.

Existing owners gained only public busy/disarm/result/completion hooks needed by UI.
No new viewport raw-pointer listeners. Semantic boxlab-vertex-tool-complete survives
stopImmediatePropagation; shared boxlab-selection-hub-session-complete resets hub.
Add/Build stop release existing capture. Vertex Bevel disarm rolls back unfinished
preview and cancelled drag preserves its selection. Slide contextual teardown can
restore in-flight positions/release capture on context loss; its pre-existing drag
history timing (push at first movement) remains, so do not claim zero history for an
interrupted in-flight Slide. Apply/Done controls are disabled while an owner is busy.
Mesh/mode/lock changes close settings; another radial tool closes without completing
that new tool's lifecycle. Geometry/scene rebuilding checks remain with original owners.

## Validation / combined hands-on checks — .710

41 targeted tests PASS: actual Vertex bevel kernel/exact/gesture, Slide rail/exact/
gesture, Merge/Clean scope/history, native Join/Weld/Delete, Create Face/Circle,
chronological First/midpoint/history, lifecycle/disabled/lock/context handoffs, ring
inventory/outer spacing/Bevel locations and nearby protected Face sessions.
Full1169 tests/884 PASS, identical285 failure names to clean .709 baseline;
no new failures. Historical marker failures remain separate; not an all-green suite.
Syntax/diff checks PASS. Release/pin/main/live verification required after publishing.

1. Confirm visibly v0.36.18.710. Vertex ring has all thirteen tools and centred ×.
   Bevel is 3 o'clock in all modes; Face Knife clockwise/Duplicate next/Extract outer,
   Edge Slide at former Bevel slot/Crease at former Slide slot.
2. Add + Build Edge: original creation/navigation, top-centre Done, no stale arming.
   Bevel + Slide: existing Pencil drag plus top-centre numeric controls, clean exit;
   Cancel/Done selection/puck and one Undo/Redo for successful operations.
3. Join/Weld/Create Face/Delete/Circle: existing results, proper result mode/selection,
   puck or fresh next tap, one Undo. Check ordinary and genuinely loose selections.
4. Merge Center/First: midpoint/first-selection chronology, result puck, Undo/Redo.
   Merge Dist only selected vertices with editable tolerance; Clean whole active object.
   Apply/Cancel scopes and unavailable actions behave as labelled.
5. Protected Face Bevel preview, Edge sessions, selection/long press and navigation
   remain intact. Collect refinement feedback before adding Object tools.

## Earlier pending checks / protected passes

Pending .692 Edge neutral return, .702 active-only correction, .703 scoped repairs,
.704 Clean/XYZ Align and .706 Face Merge checks remain in TEST_CHECKLIST.md.
Test their behavior on CURRENT release; do not imply .709/.710 proves prior manual
PASS or ask to load old releases. .707 Face drag FAIL superseded by .708 PASS.

Protected hands-on:
- .708 Face Bevel blue Width/Segments/Pencil preview; release retains candidate;
  explicit Apply once, Cancel original puck, Undo/Redo, navigation and Edge regression.
- .705 Align to Face arbitrary plane, fixed anchor, rigid group, safe rejection/Cancel,
  selection/puck, one Undo/Redo, existing XYZ/navigation.
- .700 all viewport session/numeric popups top centre; Extrude/Inset background Done.
- .699 Extrude/Inset Exact/Repeat/Done; .698 Face Bridge + centred ×;
  .697 orientation; .696 Triangulate/Flip; .695 Poke/Planar; .694 Join/Circle.
- .701 selection owner behavior PASS, radial access explicitly retired by user .702.
- .691 Face hold Grow/Shrink neutral return; .690 refreshed Shell/Sweep exits/Knife.
- .682 Pencil/Object routing PERFECT: background tap dismisses gizmo but keeps
  selection; Pencil background drag orbits; object re-tap restores gizmo.
- .684 radial Knife Done; .688 trusted old .162 Loop Cut/Slide feel;
  .689 Face Delete; .676 Edge Bridge; .677 Edge one-shot cleanup;
  .670 selection-first Crease PERFECT; .663/.664 Edge Extrude protected.

## Navigation / files / topology backlog

Protect one-finger orbit, two-finger pan, pinch zoom, two-finger Undo/three-finger
Redo, no-jump pivot, persistent selections, Studio realtime, snapping, Object/Multi.
Never change src/multi-object-transform.js?v=0.36.1.0 without explicit need.
Frozen Beta3 .371, Beta4 .427 and Beta5 .538 directories remain immutable.
Do not reapply bulk .450 UI cleanup. .685-.687 degraded Loop Cut/slide; .688 restored
trusted .162 compatibility intact. Defer connected-chain Edge Bevel and complex
logical-quad Loop Cut strengthening until radial completion, isolated from that core.

## Event / release / handover rules

Tool-specific document listeners can stopImmediatePropagation. Prefer actual owner
semantic completion or early window capture; never stack raw-pointer owners for a
single gesture. Precision belongs to actual owner. If a straightforward gesture
fix fails, use Gesture Debug before more speculative layers. .617-.619 competing
multi-tap owners failed and were removed .620; don't casually reinstate them.
.707 Face Bevel late canvas capture lost to Move; .708 protected fix uses same
handlers at window capture plus narrow main fallback guard, not another bevel kernel.

Every build updates manifest/title/data-release-version/visible label/changed module
pins, dynamically imported parents as needed, then verifies main and live shell.
If iPad looks stale, compare visible version to manifest and HTML BEFORE modelling
changes. .690 bootstrap stopped after three stale-shell responses; recovery was
hardened to keep retrying. Do not regress it.
Update this handoff, append DEV_HISTORY.md, update TEST_CHECKLIST.md/ROADMAP.md,
and give a short realistic manual list after publishing. Next is combined .710
hands-on refinement; then Object, then final Edge inventory/settings pass.
