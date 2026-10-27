# Build .998 publication

Runtime commit: 4698e8e6383ac1809c8b06d0583e3bb04a85540e
Runtime tree: d386b220b4a998e62f4d195166681c0024736160

94 focused VIEW, layout, facegroup, File, display and release checks pass.
Syntax and whitespace checks pass. The broader run exposed an old Object Browser
fixture still injecting the native details node as delegation owner after .997 moved
delegation to the external panel. Updated that fixture to the actual viewPanel owner;
all seven Object Browser tests pass without changing runtime behavior.

Pages deployment: https://github.com/CrisBezz/BoxLab/actions/runs/40472339574
Hosted full regression: https://github.com/CrisBezz/BoxLab/actions/runs/40472339712
At this record, both are pending; no full-suite success or device acceptance claimed.

Device gate: Studio VIEW → Facegroups → scroll bottom → close/reopen → Studio.
Confirm controls remain painted, then inspect right-side gizmo. .997 is partial
Studio success; Facegroups and separate gizmo patch are not accepted as fixed.
