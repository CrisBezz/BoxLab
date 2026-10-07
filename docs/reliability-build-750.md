

## 2026-10-07 — v0.36.18.750 Bevel + Inset inward cuts on uploaded source

- User .748 screenshot/file BEVEL ISSUE.obj42verts36faces: selected inset7 planar,
  rounded caps30/31 warped~.06348. Existing finite target triangulation refuses
  every cut as nonplanar-input-face. Export header736 is not app build version.
- Exact untouched source retained in tests/fixtures/bevel-inset-750.obj.
- Finite cutter uses displayed first-vertex fan privately for warped targets;
  planar target handling unchanged. Uncut polygons retain points/fan anchor/groups.
- Rejoin accepted wall/cap pieces across complete reversed edges, preserve ambiguous
  unions; bounded optional coalescing256pieces. No flattening or wholesale triangles.
-15newPASS/focused81PASS; full1812/1710PASS/102FAIL/0skip, same102identities as749.
  Seven depths,zero triangles/closed,exact shallow prism volume, rotated source,
  groups, physical/Exact actual combined-owner history/Cancel covered.
- Selected warped source still refuses; legacyThrough path unchanged. No all-quad
  promise for arbitrary intersected warped surfaces or self-intersection detection.
- Kernel body only; Face import-only/kernel/shell750, all other pins retained;
  two reviewed hashes. main/Loop715/Multi/frozen betas untouched.
- Publication/Node22/live verification and device .750 acceptance pending.

Diagnosis: source7 vertices38..41 allx=1. Rounded cap faces30/31 deviate .063476
from their average planes. The source passes edge/winding gates but old finite
all-face strict triangles rejects nonplanar-input-face; no widening of eps hides it.

New surfaceTriangles uses rendering's first-vertex fan for warped target faces;
selected cutter source retains strict triangles/convexity. Uncut cap data survives
exactly; assembly avoids rotating warped anchor. Rejoin strips/caps only across full
opposite edges, with unique-vertex/area checks and bounded optional merging. Existing
legacy Through functions are not migrated by this scoped fix.

Source7 outputs no triangles for seven tested depths. -.189 recess40faces/onecap;
full cut42faces/nocap. Source volume7.973867065949024; -.189 leaves7.563387295291422,
matching1.47372²*.189 removal. Source/history/selection retained on Cancel/refusal.
Actual Face owner tested with window legacy fallback loaded, physical and Exact.

Focused81PASS. Full1812tests/1710PASS/102FAIL/0skip; exact same failure identities
as749, no exclusions/gates. Runtime 4036c0fdf9c5cabc1173d68a3cf4281d7674b049 published. Actual Node22 CI37620905333/job112790634635:1812tests/1710PASS/102FAIL/0skip; all102failure names match baseline. Pages37620904201 success; live shell/version/kernel/Face loader/original OBJ fixture and frozenBeta6 version byte-match main. Focused81PASS. Device .750 acceptance pending.
Device .750 acceptance pending; .749 remains device-pending.
