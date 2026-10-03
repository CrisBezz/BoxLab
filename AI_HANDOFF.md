## v0.36.18.690 — unify radial Face session completion

Current release:
- v0.36.18.690

Hands-on protected:
- .682 Pencil/Object routing reliability: PERFECT / PASS.
- .684 radial Knife viewport session: PASS.
- .688 restored known-good Loop Cut / Loop Slide feel: PASS.
- .689 radial Face Delete hub cleanup: PASS.

.690:
- Final Face-ring lifecycle consistency pass.
- Shell and Sweep already had good contextual viewport panels, but unlike Knife they did not explicitly notify Selection Hub when a radial session ended.
- selection-hub-shell-session.js now emits boxlab-selection-hub-session-complete when the radial Shell session becomes inactive.
- selection-hub-sweep-session.js now emits the same completion semantic when radial Sweep ends.
- Total Gizmo now handles Knife / Shell / Sweep through one Face-session completion path:
  - clear stale hubSuppressedKey
  - if a valid Face selection still exists, return closed puck immediately
  - if no Face selection remains, keep hub hidden until next Face selection
- No Shell/Sweep geometry, preview, apply, cancel, or history logic changed.

Immediate hands-on:
1. Face -> puck -> Shell.
2. Cancel Shell -> original Face selection should return with puck.
3. Relaunch Shell -> Apply -> if Face selection remains, puck returns cleanly.
4. Face -> puck -> Sweep.
5. Cancel Sweep -> if original Face selection remains, puck returns.
6. Apply Sweep -> session closes cleanly; if no Face selection remains, next Face tap gets a fresh puck.
7. Regression: Knife Done still behaves as before.

After PASS:
- Face radial ring lifecycle is complete.
- Next build should move into broader modeless gesture work rather than more Face-ring glue.

Protected:
- .689 Face Delete.
- .688 Loop Cut core.
- .684 Knife.
- .682 Object/Pencil contract.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
