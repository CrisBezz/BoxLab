# BoxLab .756 reliability slice

## 2026-10-08 — v0.36.18.756 Bevel preview facegroup validity

- User PASS .755 /nextbuild. Reproduced Face Bevel staged source Original labels,
  then external Reassigned label: Apply accepts and restores Original into live
  geometry and Undo. Edge blue preview likewise ignores label changes, although
  Edge exact already recomputes from current mesh rather than restoring old groups.
- Existing shared sourceUnchanged now compares effective label for every real face.
  Changed/deleted labels invalidate stale Face/Edge preview/Apply; Cancel retains
  current source and redo. Fresh relaunch uses current provenance/history.
- Missing legacy labels equal explicit null. Initial strict array-length comparison
  rejected the existing disconnected unlabelled-shell preview fixture; corrected to
  per-face semantic comparison, without editing/weakening that rendering test.
  Extra entries without a corresponding real face are not part of this comparison.
-15new tests: before9FAIL/6PASS, after15PASS; focused121PASS. Full Node24:
  1896/1794PASS/102FAIL/0skip; same102failure identities as755. Actual shared owner/
  session/history, reassignment/removal/truncation, Cancel/redo, fresh Apply/Undo/Redo,
  array replacement with same values, legacy unlabelled previews, Face Bevel→Knife→
  supported Loop closed shells/current labels covered. No blanket exclusions.
- Runtime body only shared Bevel validation; geometry/gestures/history algorithms
  unchanged. One reviewed hash; required shell/recovery/direct-Bevel756 pins.
  Knife755/VertexBevel753/Extrude752/Through751/protected main/Loop715/Multi/frozen
  betas retained. Publication/actual Node22/live verification and device756 pending.

Manual checks use a normal grouped model: Face preview/Cancel, Face/Edge Apply/
Undo/Redo, then normal Knife/Loop. External label-change sequences are automated;
no synthetic mid-preview regrouping sequence requested on iPad.
