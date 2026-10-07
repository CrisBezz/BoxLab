

## 2026-10-08 — v0.36.18.751 warped-target Through planning / ordered exits

- User PASS .750. Remaining legacy planner still rejects supplied Bevel/Inset
  object as nonplanar-input-face; target surface representation now shares750fan.
- Selected source remains strictly planar/convex. Warped-target buildThrough uses
  existing finite cutter at chosen ordered targetDepth + existing epsilon overshoot.
  Original planar legacy build preserved; no pointer/tool owner changes.
-8newPASS/focused78PASS; full1820/1718PASS/102FAIL/0skip, identical102identities.
  Source7 exactexit2; clean42faces/0tris; warped two-shell targets2/5 and first-only
  second shell untouched; rotation/scaling/volume, actual physical/Exact/history/
  selection clear and shallow cut compatibility covered.
- Kernel body only; Face import-only/kernel/shell751, retained other pins. Two
  reviewed hashes; main/Loop715/Multi/frozen betas untouched.
- Publication/Node22/live verification and device .751 acceptance pending.

Reuses original supplied tests/fixtures/bevel-inset-750.obj without modification.
Prior context strict triangles rejected cap30/31. New context target triangles use
represented display fan; source triangles remain strict. Default/targetDepth
clamping and ordered target bands remain the existing algorithm. Only warped
input delegates to finite cutter; planar legacy output/guards remain unchanged.

Synthetic two disjoint copies, shiftedx=-3, yield exits2/5. First-target operation
leaves all second shell coordinates/groups/face anchors exact; full-target operation
cuts both cleanly. Actual loaded Face/fallback and exact history fixtures tested.
No user requirement to reproduce synthetic layered fixture; device checks use
original supplied object and an ordinary cube.

Focused78PASS; full1820tests/1718PASS/102FAIL/0skip, exact unchanged failure identities,
no exclusions/gates. Publication/Node22/live verification pending. Device .751 pending.
