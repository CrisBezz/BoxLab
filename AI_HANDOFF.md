# BoxLab AI Handoff — current development state

## New-chat starter prompt

Continue current main of CrisBezz/BoxLab. Repository is the source of truth.
Read AI_WORKFLOW.md completely, this file completely, TEST_CHECKLIST.md, recent
relevant DEV_HISTORY.md entries and ROADMAP.md before code changes. Audit current
main/live shell/pins and authoritative owners; reconnect existing functionality.

Current release: **v0.36.18.717**.
Current focus: Object Multi gizmo retention/first-selected anchoring for radial Boolean access, pending hands-on.
.717 uses authoritative Object Selection Set insertion order for the presentation
anchor and membership key. Empty Multi hides gizmo; adding/removing operands restores
it. First surviving visible selected object is the anchor, active object uses live mesh.
Object manager exposes its existing nearest visible scene picker; activation and
Total Gizmo share it, so inactive operands are not misclassified as background.
Pencil background semantic rechecks this picker before dismissing. Genuine background
still dismisses/re-tap restores as protected .682; navigation unchanged.
Protected multi-object-transform1.0, pivot math, selection state and Boolean owners
untouched. .716 refinements included, still pending hands-on, no new PASS inferred.
33 targeted PASS; full1210/926/284, no new failure names versus .7161205/921/284.
Next visible .717: Multi add/remove retains first-object gizmo and radial Boolean;
Focus/Object List, background dismissal/re-tap, Boolean Swap/results/history, .716 visuals.
Release parent .716 75bc6cb5; find .717 release commit in main history.
User confirms **.715 PASS**: repeated radial Loop slide/EXACT/cuts and Edge Bevel
repeat drag/exact/background exits protected. Screenshot for new Boolean layout
visibly shows .714; treated as layout reference, no new testing state inferred.
.716 rendering helper compares candidate polygons with original source by coordinate
signature: unchanged polygons/other shells stay normally shaded, only bevel-changed
region gets blue fill/wire. No candidate geometry, kernel, Apply/Cancel/history change.
Object Boolean CSS-only two rows: A/B/Swap then Union/Cut/Intersect, Close right.
Original controls/labels/Swap/operations/Close and lazy operand insertion retained;
small redundant title hidden only in Boolean dock. Other popouts untouched.
51 targeted PASS; full1205/921/284, same failure names versus .7151204/920/284.
Next visible .716: affected-only blue on single/connected Faces, preview sliders,
Apply/Cancel/history; Boolean compact controls/Swap/results/Close; .715 regressions.
User confirms **.714 PASS**: Object List beside Multi, Focus-only list reveal/toggle
and mode/Focus exit cleanup are protected. .713 other Edge combined checks pending.
.715 Loop keeps latest rail after release so Loop Slide takes over; count controls
return after EXACT. EXACT uses existing commit owner (Undo/Redo internal rail cleanup)
and stays armed/open. Another edge adds another cut retaining current placed geometry;
background tap commits latest rail and exits. Original .688/.162 topology/slide math
untouched. Automatic .632 commit remains for non-radial launches; changed wrapper
pin .715. Exact's internal mesh replacement is adopted by the session, while external
Undo/context changes close safely. Split Done unchanged.
.715 radial Edge Bevel persists after committed Pencil drag or EXACT; current live
selection replaces cached IDs. Stationary edge tap selects for exact; completion
clears consumed IDs, leaves owner ready for next edge. One history step per bevel.
Cancelled/incomplete drags roll back and release capture/navigation; background tap
closes/disarms and clears hub suppression. Face preview/Apply/Cancel and non-radial
Edge lifecycle unchanged. No new kernel or raw background-pointer owner: main and
Pencil tap semantic are reused, navigation/multi-touch cancelled taps do not exit.
Shared wide layout recognizes EXACT as right-rail Apply; shared import graph .715.
50 targeted PASS; full1204/920/284, same failure names versus .7141198/914/284.
User .715 PASS protects these sessions; preserve them during .716 visual refinement.

User confirms **.712 AWESOME PASS**: gizmo centre/corner shortcuts, wide top-centre
popouts and additional Object tools are protected. Earlier pending individual repair
checks are not implicitly passed.

.713 audits nineteen existing Edge Active Tools and reconnects all eleven missing
launchers: Loop, Split, Sweep, Uncrease, Fill Face, Grid Fill, Dissolve Loop,
Join Coplanar, Flip Edge, Collapse, Circle. Original buttons/controllers/history
and kernels remain authoritative. Loop/Split get wide top-centre persistent-session
controls/Done; Loop count and slide forward to original controls. Done preserves
completed work, does not mean rollback. Main exposes only busy/finishLoopCut UI
lifecycle APIs; .688 logical-quad/.162 core and .632 commit owner/pins unchanged.
Edge Sweep reuses existing staged viewport proxy and semantic completion with launch
mode retained. One-shots clear suppression, including Face/Vertex result handoffs.

Shared radial direction/tier: Circle outer0°, Join Coplanar outer22.5°, Slide inner45°,
Bevel inner90°, Bridge inner225°, Sweep inner270°, Delete inner315°, Clean Vertices
outer270° and Merge Dist outer315°. Face Bridge moves inward, Shell outward225°,
Quad Cleanup outer180°. Vertex Build Edge moves135°, Slide45°; outer ring expands
230px to avoid inner overlap with shared Clean/Merge positions. Edge Dissolve now
outer270°, Sweep takes former inner slot. All original tools retained, no selection
commands. Object slots/owners and protected multi-object-transform untouched.

46 targeted PASS; full1195/911/284, no new failures by name versus .712.
Next: confirm visibly .713, test all19 Edge tools/settings/result handoffs/history,
protected Loop feel and shared placement; collect refinements before drawer removal.

User confirms **.710 Vertex radial AWESOME / PASS**; all thirteen tools and shared
Face/Edge/Vertex Bevel placement are protected. .708 Face Bevel remains protected.

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
- .712 parent .711 3b332f3b; find release commit in main history.
- New UI-only tool-session-wide-layout and gizmo-corner-controls .712.
- Shared tool-session-panel-position .712; every importing viewport session client
  and total-gizmo/tool-session-ui repinned .712. Imports are the only changes to
  protected Face/Edge/Vertex session proxies apart from shared Object host ordering.
- object-radial-session stays .711; Vertex modelling owners/drawer loader .710;
  .708 Face Bevel kernel/direct owner unchanged. multi-object-transform stays .1.0.
- Manifest/title/data-release-version/visible label/main/refresh pins .717;
  main and refresh logic unchanged. Loop Cut, modelling kernels, frozen betas untouched.

## .712 wide popouts / gizmo redesign

User explicitly requests coordinated UI changes across modes, superseding the old
centre-to-radial access. Shared top-centre panels now wide (up to720px, viewport
bounded) with two-column settings and a right action rail: Cancel/Done/Close above
Apply, auxiliary Bisect Only retained. Symmetry plane controls use a compact row;
Array direction/count side by side. Small screens wrap settings while keeping rail
on the right. Mesh Health findings remain scrollable. Titles/readouts/options retained.

UI-only layout reuses ORIGINAL nodes/listeners inside the same panel, with unchanged
IDs/delegated ancestry. It runs only after owner bindings/control creation and is
idempotent; no cloned controls, parameter/history/modelling/pointer implementation.
Staged Sweep Apply mirrors original hidden ancestors via a DOM visibility observer.
Lazy Boolean operands/report additions go into the settings body. Hidden layout
roots remain hidden, so Cancel does not reveal stale settings in the drawer.
Object host lays out after insertion, restores originals as before; Face source
hosts remain in drawer for their protected viewport proxies, avoiding duplicate docks.

Gizmo centre is now the existing FREE MOVE handle with larger14px radius and
non-interactive centre dot. Existing free ROTATE screen ring remains nearby. No
centre menu hotspot. Top-left radial icon opens the current-mode rings. Top-right
has separate Focus View toggle + Frame All buttons; bottom-right separate Undo/Redo
arrows; bottom-left Object Multi toggle (only Object). Forty-pixel targets with titles/
accessible labels and visible Focus/Multi pressed state. Actual toolbar button owners
are invoked; Multi uses authoritative object-management button, not a second state.
Unavailable/busy controls disabled. Corner groups clamp to viewport bounds without
moving the selection pivot. No new raw viewport pointer listeners or transform math.
Centre/corner redesign applies across modes while existing session visibility stays.

41 targeted checks PASS: actual Symmetry/Array control markup identities/listeners,
stage Apply visibility, lazy content/hidden roots, six shortcuts/actions/guards,
viewport corner bounds, centre/rotation owner wiring, full cache graph and protected
Object/Vertex/Face sessions. Full1190 tests/906 PASS/284 identical failure names
versus clean .711 (1181/897/284); no new failures. Syntax/diff/protected files PASS.
User .712 AWESOME PASS protects the combined gizmo/wide-panel behavior.

Combined .712 manual checks:
1. Confirm visible .712; centre free Move/nearby free Rotate; top-left opens current
   Face/Edge/Vertex/Object rings, centre × closes; shared component Bevel90° unchanged.
2. Top-right Focus/Frame All, bottom-right Undo/Redo; bottom-left Object Multi toggles,
   highlights correctly and permits adding objects; original Multi transforms remain.
3. Symmetry/Bisect and Array panels wide/shallow, every setting retained, actions
   stacked on right, original previews/gestures/Apply/Cancel.
4. Face/Edge/Vertex popouts including blue Face Bevel, Shell, staged Sweep, repair
   and exact values: same wide/action rule, visibility and clean completion/selection.
5. Object Transform/Insert, Solidify, Revolve and Boolean panels/actions/history;
   navigation and .682 finger/Pencil background dismissal/re-tap remain protected.
User .712 and .714 PASS recorded; .715 Loop/Bevel and other .713 Edge checks pending. Keep drawer fallbacks.

## .711 Object radial inventory / session dock

Audited base index plus late Object Active Tools modules. Ten existing launchers:
inner clockwise from top: Transform, Insert, Solidify, Array, Boolean, Join,
Symmetry / Bisect, Mesh Health (eight sectors,120px radius,86px width).
Outer: Revolve Profile at0°, Clean for SubD at180° (195px radius).
All rectangle spacing checked. No Object Bevel exists; shared component Bevel90°
placement is untouched. Top-left gizmo shortcut opens rings; centre × returns gizmo (.712 user redesign).
Object selection still immediately shows its protected transform gizmo; background
finger/Pencil dismissal and object re-tap restoration remain original owners.

Original launcher buttons and owner controls reused intact. UI adapter cancels
previous owner through existing APIs before launching next. Join and Clean remain
one-shots and clear lifecycle suppression; no new modelling/history/pointer kernel.
Boolean retains operand labels/Swap/Union/Cut/Intersect/Close and authoritative Multi.
Transform/Insert retain face-to-face Move/Rotate/Scale, Apply/Cancel. Solidify keeps
Thickness preview; Array keeps endpoint/direction/count; Symmetry keeps presets,
plane Move/Rotate/Align/Flip/Reset/Keep/Mirror/Bisect Only; Mesh Health keeps full
report/repair controls; Revolve keeps edit/segments/profile controls/Apply/Cancel.

Shared tool-session-ui moves ORIGINAL node to top-centre viewport host only in
Object mode, bounded/scrollable. Restores original parent on end. Other modes keep
existing drawer host for their already-protected viewport proxies (avoid duplicate
Shell/Sweep overlays). Conditional Object Sweep editor also gets this dock; Sweep
creation remains Add, since it has no Object Active Tools launcher. Outliner Add/
Duplicate/Rename/Delete, Origins/Pivots/Groups, Selection and Modifiers are outside
this explicitly Active-Tools-only batch. No speculative new launchers introduced.

Gizmo hidden during Object sessions except Symmetry/Revolve plane placement.
Completion returns selected Object gizmo, or correct new component-mode puck.
Existing controls retain owner event listeners, child popups and history. Boolean
also closes on mode exit. Locked/reference radial writes blocked; Transform/Insert
require one object. Owner validation/history/snapping/navigation remain unchanged.
Keep drawer fallbacks until user tests PASS. Do not remove menus wholesale.

## .711 validation / combined manual test

32 targeted checks PASS: exact inventory/layout, original-node dock/restoration,
all eight session clients, authoritative cancellation/handoffs, actual Solidify /
Array preview launch + cleanup with source unchanged, one-shots, locked/reference/
Multi/mode guards, gizmo transitions and protected Face/Vertex sessions.
Full1181 tests/897 PASS/284 failures; no new failure names versus clean .710
(1169/884/285). Historical376 Solidify session-pin test now passes. Suite is not
all green. Syntax/diff/protected-file checks PASS. Verify main/live after publishing.

1. Test on current .712 using top-left radial shortcut; × returns gizmo.
2. Solidify/Array: top-centre settings, original live previews/gestures, Apply/Cancel.
3. Transform/Insert and Symmetry/Bisect: original surface/plane interaction,
   settings all top centre; plane gizmo available; Apply/Cancel clean.
4. Boolean: choose operands in Multi, Swap, Union/Cut/Intersect, Close, one Undo.
5. Revolve Profile, Mesh Health, Join and Clean for SubD: correct original results,
   full top-centre panels, cancellation, Undo/Redo and returned selection/gizmo.
6. Navigation, .682 background finger/Pencil dismissal/re-tap and protected
   Face/Edge/Vertex radial behavior remain intact. Collect Object refinements next.

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

## Protected .710 validation / hands-on PASS

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
   remain intact. User confirms this complete Vertex batch AWESOME / PASS.

## Earlier pending checks / protected passes

Pending .692 Edge neutral return, .702 active-only correction, .703 scoped repairs,
.704 Clean/XYZ Align and .706 Face Merge checks remain in TEST_CHECKLIST.md.
Test their behavior on CURRENT release; do not imply .709/.710 proves prior manual
PASS or ask to load old releases. .707 Face drag FAIL superseded by .708 PASS.

Protected hands-on:
- .710 ALL Vertex radial tools AWESOME / PASS, contextual controls and shared
  Face/Edge/Vertex Bevel inner90° placement.
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
and give a short realistic manual list after publishing. Next .717 Multi/Boolean and .716 visual confirmation plus remaining .713 Edge checks.
