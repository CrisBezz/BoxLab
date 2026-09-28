## v0.36.18.554 — weighted Nomad morph display + round-trip base reconstruction

- User hands-on result after .553: FAIL for layer deformation visibility on import to BoxLab.
- Root cause: .552/.553 preserved morph target arrays but built the editable mesh from base POSITION only; active Nomad morph weights were never applied to BoxLab's displayed/editable vertices.
- Additional coupled issue found: imported morph deltas were still in source-local scale while BoxLab transforms/scales the editable mesh.
- .554 fixes all three linked pieces:
  - GLTFLoader `node.morphTargetInfluences` are passed into import conversion and applied to visible editable vertices.
  - morph POSITION targets are converted to relative deltas, transformed by the node/world linear transform, and scaled together with the imported mesh.
  - active morph weights are retained in GLB passthrough.
- Export now reconstructs the undeformed GLB base POSITION by subtracting weighted morph deltas from the BoxLab editable/displayed positions before restoring morph targets and weights. This avoids double-deformation when reopened in Nomad.
- .553 indexed/welded GLB topology export remains intact.
- Automated import/export syntax + 8 weighted-morph assertions passed.
- Frozen Beta 5 remains v0.36.18.538 untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

Hands-on test:
1. Import the same Nomad GLB containing a visible sculpt layer into BoxLab, Split OFF.
2. PASS = BoxLab now displays the same visible deformation as Nomad.
3. Export GLB Base immediately.
4. Re-open in Nomad.
5. PASS = deformation is not doubled or lost, and the original layer/weight remains usable.
6. Subdivide once to confirm .553 connected topology remains intact.

