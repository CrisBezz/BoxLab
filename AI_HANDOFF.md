## v0.36.18.642 — Selection Hub v1 (Face)

Current release:
- Visible/app version: v0.36.18.642
- version.json and HTML shell title are synced to .642.

Protected foundation:
- .640 remains the hands-on PASS interaction checkpoint.
- .641 Make Unique robustness is retained but is not the current development direction.

Selection Hub v1:
- Face mode only for the first prototype.
- Three mutually exclusive states:
  1. CLOSED — small puck only; viewport selection/gestures own everything else.
  2. TRANSFORM — full proven Total Gizmo; tool ring does not exist interactively.
  3. TOOLS — gizmo SVG is removed from hit testing; radial Face tool ring owns only its visible buttons.
- Centre-cycle:
  CLOSED puck -> TRANSFORM
  TRANSFORM centre -> TOOLS
  TOOLS centre -> CLOSED

Face tool ring v1:
- Extrude -> #extrudeBtn
- Inset -> #insetBtn
- Knife -> #knifeBtn
- Duplicate -> #duplicateFacesBtn
- Extract -> #extractFacesBtn
- Shell -> #shellFacesBtn
- Sweep -> existing Face sweep-selection launcher
- Delete -> #deleteFaceBtn
- All are proxies to existing owners; no modelling code duplicated.

Tool-launch ownership:
- Choosing a tool immediately hides the entire Selection Hub for the current Face selection.
- The chosen existing tool owns the viewport normally.
- The hub remains suppressed until the Face selection changes.
- A changed Face selection resets the hub to CLOSED.

Immediate hands-on:
1. Select one or more Faces -> expect closed puck.
2. Tap puck -> full gizmo.
3. Tap centre dot -> gizmo must disappear completely; Face tool ring appears.
4. Tap ring centre -> ring closes; closed puck returns.
5. Repeat CLOSED -> TRANSFORM -> TOOLS to confirm cycling does not alter selection.
6. Open Tools -> Extrude. Ring/hub should disappear and existing Extrude should arm; drag-extrude normally.
7. Make a different Face selection -> closed puck should return.
8. Quick-test Inset plus one non-direct tool such as Duplicate or Shell.
9. Confirm there are no invisible gizmo hits while Tools is open.

Protected:
- .640 selection/gesture/release architecture unchanged.
- existing Face modelling tools remain authoritative.
- .641 linked-instance Make Unique fix retained.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
