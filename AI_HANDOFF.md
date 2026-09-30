## v0.36.18.608 — component gizmo ownership correction

- .607 hands-on findings:
  - Face: axis Move dragged like Free; axis Scale drag failed while exact entry worked; Rotate good.
  - Edge: Move constrained incorrectly; Free Move failed on multi-edge selection; axis Scale drag/type-in inconsistent.
  - Vertex: only Free Move dragged reliably; selection felt harder because transform capture competed with selection; gizmo misses near mesh edges could fall through to orbit.
- Root causes identified:
  1. transform-upgrade still derived component gizmo drag tool/constraint through UI arming state instead of treating the active gizmo handle spec as authoritative.
  2. transform-upgrade was also capturing ordinary component viewport drags, duplicating main.js ownership and interfering with selection.
  3. a no-drag gizmo click on components could be treated as a component selection toggle just before floating exact entry.
  4. axis Scale used the generic diagonal Scale gesture instead of motion projected along the selected gizmo axis.
- .608 changes:
  - Vertex/Edge/Face transform-upgrade gestures are now gizmo-owned only.
  - Ordinary component viewport drag remains owned by main.js.
  - Active Total Gizmo {tool,constraint} is authoritative for component gizmo gestures.
  - Axis Move uses the gizmo axis directly.
  - Axis Scale measures Pencil motion projected along the selected axis.
  - Uniform Scale keeps the existing free-scale gesture.
  - No-drag gizmo clicks no longer toggle component selection.
  - Invisible hit targets widened, especially Scale nodes, to reduce orbit fall-through near mesh edges.
- Existing exact transform math remains unchanged.
- Component Rotate remains on transform-upgrade and was already hands-on good.
- .606 modeless Edge selection and .601 Files-based Nomad handoff remain unchanged.
- HTML shell, Total Gizmo pin, transform-upgrade pin and version.json are synced to 0.36.18.608.
- Protected src/multi-object-transform.js?v=0.36.1.0 unchanged.

Hands-on check:
1. Face: X/Y/Z Move follows the selected arrow; Free Move remains free.
2. Face: X/Y/Z Scale drags correctly; Uniform Scale remains good.
3. Face: Rotate regression check.
4. Edge: axis Move follows selected arrow for single and multiple edges.
5. Edge: Free Move works for multi-edge selections.
6. Edge: axis Scale drag works; click-release then floating exact entry preserves selection and applies.
7. Vertex: select several vertices without Move capture stealing the second tap.
8. Vertex: axis Move / Scale / Rotate work from gizmo.
9. Gizmo handles near mesh edges are easier to acquire and do not unexpectedly orbit.
10. Object gizmo and .606 Edge hold/scrub remain unchanged.

Next:
- If .608 passes, make component Total Gizmo the unified precision transform baseline and then polish component-specific pivot/orientation behavior.
