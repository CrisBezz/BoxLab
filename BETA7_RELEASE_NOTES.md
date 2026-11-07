# BoxLab Beta 7 — release notes

Released 2026-10-11. Accepted build **v0.36.18.807**.
Frozen source: `02d04cc72acef5415352ce4426792442cb7e99dd`.
Frozen URL: https://crisbezz.github.io/BoxLab/beta-7/

Beta 7 builds on Beta 6’s viewport tools with improved modelling reliability,
controlled object creation and editable Boolean results.

- Add+ previews primitives before insertion, with controls for face density.
- Add+ Text creates an extruded word as one object, with adjustable thickness.
- Inserted objects fit a 1×1×1 zone; startup and Reset cubes also measure 1×1×1.
- Editable Boolean results retain A/B sources. Edit Boolean reopens them for
  Move/Rotate/Scale and operation changes, with automatic live preview.
- Result and Sources views separate the solid result from its operands. Apply
  keeps the edited result; Cancel restores the scene; scene Undo/Redo remains available.
- Object list shows an editable Boolean result without separate source rows.
  Compact Edit Boolean controls match the other tool popups.
- Negative Extrude handles dense rectangular cut walls more cleanly. Further
  fixes strengthen selection, Loop/Knife/Bevel combinations and continued modelling.
- GLB import/group handling and Rotate repairs join the protected regression baseline.
- All previously active automated tests now pass: 2,163 checks at the accepted build.
  Historical failing test results were audited and resolved; they were not a count
  of distinct application bugs.

Editable Boolean currently supports retained recipes for independent, unlocked
objects without modifiers. Historical/imported Boolean geometry does not acquire
editable source recipes. Live previews run within an open edit session; this is
not an always-on scene dependency graph. Curves/Balloon and quad remeshing are future
work. Native NOM export remains available; NOM import is not added.

User accepted .807 and explicitly requested this freeze. Frozen Beta2–6 remain
unchanged; live main is the continuing development URL.
