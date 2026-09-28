## v0.36.18.556 — restore original GLB round-trip scale

- User hands-on result on .555: topology/welding PASS; exported/imported scale still wrong.
- Root cause: BoxLab normalises imported geometry to `IMPORT_TARGET_SIZE = 2` for editing, but the GLB round-trip exporter wrote that BoxLab working scale directly back to Nomad.
- .556 records the import fit transform in passthrough:
  - global import centre
  - normalising scale factor
- Base GLB export now reverses that fit transform on POSITION before writing the file.
- Morph POSITION deltas are also divided by the same fit scale, so layer deformation magnitude remains consistent in restored Nomad/world scale.
- .555 single-source morph weights and UV pole welding remain intact.
- Automated import/export syntax + 8 scale-restoration assertions passed.
- Frozen Beta 5 remains v0.36.18.538 untouched.
- Protected `src/multi-object-transform.js?v=0.36.1.0` remains untouched.

Hands-on test:
1. Import the same layered Nomad GLB into BoxLab.
2. Confirm BoxLab working display remains normal.
3. Export Base GLB and reopen in Nomad.
4. PASS = object returns at the same original size/placement as the source GLB.
5. PASS = sculpt deformation magnitude matches source and layer weight remains adjustable.
6. PASS = .555 welded topology, including the poles, remains connected on subdivision.

