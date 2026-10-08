

## 2026-10-08 — v0.36.18.752 Vertex Extrude scaffolding

- User PASS .751, explicitly requests Vertex Extrude following Face drag/exact/repeat.
- Audit found Add/Build Edge/loose topology/Create Face, no prior Vertex Extrude.
  New candidate builder delegates existing loose topology; direct owner uses actual
  rendered Vertex picker/selection/history. No new face/weld/bridge algorithm.
- Single/multi attached/loose source → edge + new tip; repeated pulls keep tips
  selected. Original Vertex panel/radial gets Free/XYZ signed Exact, last-vector
  Repeat and Done at top centre. Existing Join/Build Edge closes boundaries for
  original Create Face/Fill. Source faces/groups/creases retained.
- Document capture prevents canvas Move/orbit competition; shared background policy
  recognizes scaffold contacts. Combined actual Pencil policy test catches loose-tip
  Repeat taps that polygon-only gate would otherwise call background.
- Initial competing Build Edge fixture exposed late session exit disarming new owner;
  retire session before disarming Extrude, preserve new owner. Two initial fixture
  mismatches involved existing virtual loose faces and perspective axis projection;
  tests now distinguish real faces and truly view-parallel central rail.
-12newPASS/focused88PASS; full1832/1730/102/0 with identical102names to fresh751.
  All old failure checks remain active. Reviewed14-sector inventory/static pin tests
  updated for explicit new feature; runtime loader/hash contract updated narrowly.
- Five runtime modules/hashes (two new) and required shell pins752; Face/Through751,
  protected main/Loop715/Multi/frozenbeta unchanged. Publication/CI/device pending.

Manual checks use ordinary cube vertices or a loose scaffold, not synthetic fixtures.
Repeat stores the full world vector. Free exact uses its direction or camera view-up
for the initial operation; choose XYZ for explicit axis distances. New tips are
separate vertices; welding/closing is an explicit existing tool action.
