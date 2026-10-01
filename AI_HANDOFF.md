## v0.36.18.654 — Edge Selection Hub v1

Current release:
- v0.36.18.654

Hands-on protected:
- .643 Sweep viewport session: PASS.
- .652 armed Extrude/Inset background Pencil-yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.

Selection Hub:
- Face and Edge now both use the three-state cycle:
  CLOSED PUCK -> TRANSFORM GIZMO -> CONTEXTUAL TOOLS -> CLOSED PUCK
- Tools state is mode-specific; only one ring exists interactively at a time.

Face ring unchanged:
- Extrude, Inset, Knife, Duplicate, Extract, Shell, Sweep, Delete.

New Edge ring v1:
- Extrude -> #edgeExtrudeBtn
- Bevel -> #bevelBtn
- Crease -> #applyCreaseBtn
- Slide -> #edgeSlideBtn
- Offset -> #offsetLoopBtn
- Bridge -> #bridgeEdgesBtn
- Dissolve -> #dissolveEdgeBtn
- Delete -> #deleteEdgeBtn

Architecture:
- All Edge sectors proxy existing authoritative buttons at click time.
- No Edge geometry/tool implementation duplicated.
- Existing disabled state decides whether a radial tool is available.
- Ring launch suppresses hub for the current Edge selection exactly like Face.
- Changing Edge selection resets hub to CLOSED.
- Face ring behaviour unchanged.

Immediate hands-on:
1. Select an Edge -> expect closed puck.
2. Tap puck -> gizmo.
3. Tap centre -> Edge ring.
4. Confirm ring labels: Extrude / Bevel / Crease / Slide / Offset / Bridge / Dissolve / Delete.
5. Centre -> closed puck.
6. Reopen and test Edge Extrude.
7. Test Bevel.
8. Test Slide or Offset.
9. Confirm unavailable Bridge stays unavailable unless selection is valid.
10. Return to Face mode and confirm original Face ring still works.

Protected:
- .640 modeless selection checkpoint.
- .642 Face Selection Hub.
- .643 Sweep viewport session.
- .652 Face-direct background-yield.
- .653 Shell viewport session.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
