# BoxLab .753 reliability slice

## 2026-10-08 — v0.36.18.753 Vertex Bevel facegroup preservation

- User PASS .752 /nextbuild. Resume scoped Bevel/Knife/Loop reliability audit.
- Reproduced existing single/multi Vertex Bevel appending caps without group entries:
  grouped cube becomes7/8faces but retains only6labels; blue Apply also omitted groups.
- Repair existing kernels: source labels retained; cap inherits unanimous incident
  group, otherwise null, matching accepted Edge Bevel provenance. No geometry changes.
- Existing direct owner restores groups on preview Apply/repeated drag/Cancel and
  disarm; a changed facegroup invalidates old blue preview instead of overwriting it.
-16new behavioral PASS/focused82PASS; full1848/1746PASS/102FAIL/0skip; identical
  failure names to .752, all checks active. Real kernels/direct owner/history, single/
  adjacent/separate multi, mixed/uniform groups, creases/loose geometry, closed
  winding, Loop/Knife combinations and OBJ groups covered.
- Three runtime bodies changed; bootstrap/Inset/Face direct imports only repinned.
  Six reviewed hashes; required parent/recovery/shell753 pins. Through child751,
  Extrude752, protected main/Loop715/Multi/frozenbeta unchanged.
- Publication/actual Node22/live verification and .753 device acceptance pending.

Manual checks: grouped Vertex Bevel preview/Apply, multi drag/Cancel, Undo/Redo
and accepted Vertex Extrude. Device checks are separate from automated regression.


### .753 publication verification

Runtime 0f11d92e7eb0655fac0c8b15ddd362278256c772 published. Actual Node22 Topology run37721519156/job113130013158:1848tests/1746PASS/102FAIL/0skip; all102failure names exactly match the local inventory and .752. Pages37721518051 succeeded. Live shell/version, all six changed runtime modules/loader parents, accepted Vertex Extrude owner and frozenBeta6 version byte-match the tested checkout. Focused82PASS; .753 device acceptance pending.
