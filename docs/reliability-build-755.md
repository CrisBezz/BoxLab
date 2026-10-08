# BoxLab .755 reliability slice

## 2026-10-08 — v0.36.18.755 Knife gesture context / cancellation

- User PASS .754 /nextbuild. Actual Pencil reproduction: start on cube1, swap
  active mesh/object to cube2 before release; cube1 stays6faces, cube2 becomes7,
  history1. Knife had no starting mesh/object/lock guard and cancel leaked capture.
- Existing owner stores starting mesh/activeId, checks Face mode/unlocked state
  before starting, previewing and committing. Changed context disarms semantically
  without cutting/history; locked Knife arming refuses. No parallel input owner.
- One cancellation helper retires drag before releasing capture and removing markers;
  used by Done/exclusive/context, pointercancel/lostcapture and Escape/blur.
  Ordinary pointercancel/lostcapture keep Knife armed for another cut; terminal
  exits emit existing boxlab-knife-disarmed for original session close.
-17new whole-owner behavioral tests: before16FAIL/1PASS, after17PASS; focused105PASS.
  Full Node24:1881/1779PASS/102FAIL/0skip, same102names as754. Real camera/raycast/
  Pencil moves/releases, changed mesh/object/lock/mode at move and up, marker/capture
  cleanup, repeat/Undo/Redo/redo retention and existing Bevel/Knife/Loop covered.
- Two historical prepared-endpoint release fixtures now supply actual starting
  mesh/object context; no guard bypass or weakened assertions. Screen harness
  records real semantic events/capture/markers. Protected/frozen diff clean.
- Runtime body only Knife; one reviewed hash and required recovery/shell/Knife755.
  .754 perspective conversion/snap priorities, topology splitter and Loop untouched.
  Same-instance in-place geometry edits are not fingerprinted by this context guard;
  existing tool-exclusive events still own their cancellation.
- Publication/actual Node22/live verification and .755 device acceptance pending.

Device sanity checks: ordinary repeated Knife cuts/history, Done/tool/mode exit
followed by navigation, and locked-object refusal/unlocked Knife. Cross-object
mid-gesture fixture is automated; no synthetic stress sequence requested on iPad.


### .755 publication verification

Runtime cb28427114df517083239ef07b31e3abc4cac9d9 published. Actual Node22 Topology run37737755836/job113181100425:1881tests/1779PASS/102FAIL/0skip; all102failure names exactly match the local inventory and .754. Pages37737755773 succeeded. Live shell/version/Knife, accepted Vertex Extrude and frozenBeta6 version byte-match the tested checkout. Focused105PASS; .755 device acceptance pending.
