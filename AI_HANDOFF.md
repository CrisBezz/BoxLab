## v0.36.18.681 — Pencil background tap dismisses Object transform

Current release:
- v0.36.18.681

Hands-on protected:
- .678 Duplicate Faces works great and hands off to Object gizmo.
- .680 restored Total Gizmo after .679 parse regression.
- Finger background tap successfully dismisses Object transform gizmo.

.681:
- Fixes Pencil parity for Object transform dismissal.
- Finger background tap already worked; Pencil background tap did not because Pencil contact is owned by pencil-orbit-gate for navigation.
- pencil-orbit-gate now tracks background Pencil contacts and distinguishes stationary tap from orbit drag.
- On Pencil release:
  - if movement stayed under 8 px
  - and no deferred orbit claim occurred
  - emits boxlab-pencil-background-tap
- Total Gizmo listens for that semantic event and dismisses Object transform exactly like finger background tap.
- Pencil drag/orbit behavior remains intact.
- No transform geometry code changed.

Immediate hands-on:
1. Duplicate Face(s) -> Object gizmo appears.
2. Finger tap empty background -> gizmo hides.
3. Tap object -> gizmo returns.
4. Pencil tap empty background -> gizmo hides.
5. Tap object -> gizmo returns.
6. Pencil drag on empty background -> orbit still works and must NOT dismiss gizmo as a tap.

Protected:
- .678 Duplicate semantics.
- .675 navigation recovery.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
