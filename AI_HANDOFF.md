## v0.36.18.555 — morph weight single-source + UV pole welding

- User hands-on result on .554: FAIL — deformation doubled on round-trip; layer weight retained. Also reported apparent non-welded pole vertices.
- Double deformation root cause: .554 restored active morph weights to both glTF node.weights and mesh.weights. .555 now records the original source location on import and restores active weights to one location only:
  - original node weights -> node.weights only; mesh.weights removed
  - original mesh weights -> mesh.weights only; node.weights removed
  - no original weights -> neither location written
- Pole welding root cause: .553/.554 included UV and tangent corner values in the unified glTF vertex key. High-valence UV singularities such as sphere poles therefore split into multiple vertices.
- .555 identifies vertices with 3+ distinct UV corner values and collapses UV/tangent participation in the export key for those singular vertices only. Ordinary two-sided UV seams remain preserved.
- Morph/colour discontinuities still prevent welding, so topology-bound sculpt data is not merged across genuine value changes.
- Automated syntax + 10 targeted weight-location / pole-weld assertions passed.
- Frozen Beta 5 remains v0.36.18.538 untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

Hands-on test:
1. Import the same layered Nomad GLB into BoxLab.
2. PASS = deformation appears once at the correct magnitude.
3. Export Base GLB and reopen in Nomad.
4. PASS = deformation remains once (not doubled) and the layer weight is retained/adjustable.
5. Inspect the sphere/pole area.
6. PASS = pole behaves as one connected vertex region during subdivision.
7. Confirm the rest of the UV seam remains visually/materially acceptable.

