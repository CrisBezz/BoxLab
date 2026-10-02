## v0.36.18.666 — Edge Extrude exit returns to puck

Current release:
- v0.36.18.666

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.
- .661 Loop Cut slide ownership + Bevel reset: PASS.
- .662 radial Bevel viewport session: PASS.
- .663/.664 Edge Extrude radial workflow: works really well.

.665/.666 fixes:
- Root cause of visible version reverting from .664 to .662 was stale version.json.
- version.json is now republished with the current release and must be kept in sync with index.html.
- Closing the radial Edge Extrude constraint session now completes the tool session rather than merely hiding its UI.
- On intentional Edge Extrude session exit:
  - Edge Extrude disarms through existing __boxlabEdgeExtrude.setArmed(false)
  - current Edge selection is preserved
  - hub suppression is cleared
  - Selection Hub returns to CLOSED state
  - puck reappears on the currently selected Edge/outer rail
- This makes post-Extrude flow modeless: finish Extrude -> same Edge selection -> puck -> next action.
- Actual Edge Extrude geometry remains unchanged and protected.
- Selection loss still closes the session normally; no puck is shown when there is no valid selection.

Immediate hands-on:
1. Confirm visible version remains v0.36.18.666 after page load settles.
2. Perform radial Edge Extrude and confirm extrusion still behaves exactly as the prior working build.
3. Finish/exit the Extrude constraint session.
4. Confirm Extrude is no longer armed in the left menu.
5. Confirm the resulting outer Edge selection remains selected.
6. Confirm the closed Selection Hub puck reappears on that selection.

Next after PASS:
- Continue Edge tool viewport-session centralisation with the next Edge tool still dependent on the left panel.

Protected:
- .657 Edge candidate selection.
- .659 additive Edge hold semantics.
- .661 Loop Cut ownership + Bevel reset.
- .662 Bevel viewport session.
- .658 radial availability.
- .664 side-mounted Edge Extrude constraint palette.
- existing Edge Extrude topology/ribbon engine and drag-on-edge interaction.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
