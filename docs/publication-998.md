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
Live .998 bytes verified against local source for version.json, index.html, View modes,
View surface, Clean View and gesture diagnostics. Full local run: 2895/2898 pass;
Object Browser fixture corrected and its seven tests pass. Two unrelated older
fixtures still fail: Sweep shared-session lacks releaseUVSurface in its VM harness;
wide-corners test assumes facegroup-paint-dock is directly loaded by index rather
than its reviewed render-modes parent. No full-suite success or device acceptance
claimed. Hosted runs were pending when checked.

Device gate: Studio VIEW → Facegroups → scroll bottom → close/reopen → Studio.
Confirm controls remain painted, then inspect right-side gizmo. .997 is partial
Studio success; Facegroups and separate gizmo patch are not accepted as fixed.
