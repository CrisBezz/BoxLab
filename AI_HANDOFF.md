## v0.36.18.675 — recover stale camera disable

Current release:
- v0.36.18.675

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.
- .661 Loop Cut slide ownership + Bevel reset: PASS.
- .662 radial Bevel viewport session: PASS.
- .663/.664 Edge Extrude radial workflow: works really well.
- .670 radial Crease selection-first workflow: PERFECT / PASS.

Navigation regression:
- .672/.673/.674: intermittent touch navigation corruption persisted.
- User now reports finger input eventually becomes completely inert, while pointer events still reach viewport.
- This indicates a second failure mode beyond stale OrbitControls pointer state: controls.enabled can remain false after a modelling gesture if its normal endDrag recovery is bypassed by capture-phase ownership.

.675:
- Keeps .674 window-level Orbit release reconciliation.
- Adds stale camera-control recovery in pencil-orbit-gate:
  - on a fresh first touch, if controls.enabled is still false from a prior gesture, restore it before routing the new gesture.
  - on a fresh Pencil contact, same recovery applies.
  - after the last physical touch/Pencil contact ends, queue a recovery check and restore controls.enabled if still false.
- This does not interfere with an active new modelling drag:
  - fresh-touch recovery happens before downstream pointerdown owners
  - a tool can still legitimately set controls.enabled=false later in that same pointerdown
  - last-contact recovery occurs after release handlers have had their turn.
- Adds NAV CONTROLS RECOVER debug markers.
- No selection/tool geometry ownership changed.

Immediate hands-on:
1. Fresh load .675.
2. Confirm one-finger orbit, two-finger pan, pinch zoom, Pencil orbit.
3. Work normally through multiple tools for several minutes.
4. If touch becomes inert, try a completely fresh first finger contact; .675 should self-recover navigation.
5. With Gesture Debug on, look for NAV CONTROLS RECOVER and ORBIT TOUCH RECONCILE markers.

Protected:
- modelling pointerdown/move ownership.
- .670 Crease, .671 Offset, .672 Slide sessions.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
