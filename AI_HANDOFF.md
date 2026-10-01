## v0.36.18.639 — collapsed gizmo is physically non-interactive

Current release:
- Visible/app version: v0.36.18.639
- version.json and HTML shell title are synced to .639.

Why .639 exists:
- .638 added Grow/Shrink gestures and Vertex puck offset.
- Hands-on showed the collapsed gizmo was only visually hidden: dragging at invisible handle locations could still Move/Scale/Rotate and steal Face selection/gesture input.
- Generated SVG hit proxies use inline pointer-events, so visual opacity + container pointer-events:none was not a hard enough Safari boundary.

.639 ownership rule:
- collapsed component gizmo: ONLY the dormant puck is interactive.
- the entire SVG handle subtree is display:none while collapsed.
- onHandleDown additionally rejects component handle input whenever expanded=false.
- expanded gizmo behavior is unchanged.

Immediate hands-on:
1. Select one or more Faces and leave gizmo collapsed.
2. Tap/drag in several places where axis/rings used to be.
3. Those locations must now behave exactly like ordinary viewport selection/gesture space.
4. Tap the puck to expand the gizmo.
5. Confirm Move / Scale / Rotate handles work normally.
6. Collapse again and confirm those same screen locations immediately return to selection ownership.
7. Quick Vertex hold + Grow/Shrink regression.

Protected:
- .615 unified gizmo transform maths unchanged.
- .636 semantic component gizmo ownership unchanged.
- .638 Grow/Shrink gesture contract unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
