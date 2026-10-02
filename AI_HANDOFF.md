## v0.36.18.663 — Edge Extrude gizmo constraint session

Current release:
- v0.36.18.663

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.
- .661 Loop Cut slide ownership + Bevel reset: PASS.
- .662 radial Bevel viewport session: PASS.

.663:
- Edge Extrude radial launch now reuses the existing Total Gizmo as a constraint selector.
- This is integration only; src/edge-extrude.js remains the sole Edge Extrude geometry / ribbon owner.
- Launch path:
  - select valid boundary Edge(s)
  - puck -> gizmo -> Edge ring -> Extrude
  - radial launch arms the existing Edge Extrude owner
  - Total Gizmo reappears in a temporary Extrude constraint session
- Extrude constraint-session gizmo:
  - X/Y/Z Move axes select the corresponding world-axis constraint
  - centre Move handle selects the existing local Plane constraint (movement perpendicular to the seed Edge)
  - Rotate / Scale / world-plane handles / contextual-ring centre are hidden for this session
  - selecting a constraint never transforms the selected Edge directly
  - actual ribbon creation still begins only by dragging the selected boundary Edge(s)
- Existing Edge Extrude defaults remain:
  - Plane constraint on first arm
  - perpendicular projection
  - validation / rollback
  - new outer rail remains selected
  - repeated pulls keep Extrude armed
- After each successful pull the gizmo follows the new outer-rail selection and remains in Extrude constraint mode.
- Leaving Edge mode or otherwise disarming Edge Extrude ends the temporary gizmo session and restores normal Total Gizmo visuals/behaviour.
- Left-toolbar Edge Extrude does NOT open the special gizmo session.
- No Edge Extrude topology kernel duplicated or changed.

Immediate hands-on:
1. Select a valid boundary Edge or boundary chain.
2. Puck -> gizmo -> Edge ring -> Extrude.
3. Expect simplified gizmo to reappear at the selection with Move X/Y/Z + centre only.
4. Default is Plane: drag the selected boundary Edge and confirm normal ribbon extrusion perpendicular to the Edge.
5. Relaunch / continue and tap X, Y or Z gizmo axis; drag the selected boundary Edge and confirm extrusion is constrained to that axis (projected perpendicular to the Edge).
6. Perform a pull and confirm the new outer rail stays selected and the simplified gizmo follows it for another pull.
7. Disarm Extrude or change selection mode; confirm the normal gizmo returns.
8. Launch Edge Extrude from the left panel; confirm the special simplified gizmo session does not appear.

Next after PASS:
- Continue Edge tool viewport-session centralisation, starting with the next Edge tool whose settings still require the left panel (likely Slide / Offset / Crease), preserving existing owners.

Protected:
- .657 Edge candidate selection.
- .659 additive Edge hold semantics.
- .661 Loop Cut ownership + Bevel reset.
- .662 Bevel viewport session.
- .658 radial availability.
- existing Edge Extrude topology/ribbon engine.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
