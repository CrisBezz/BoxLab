# BoxLab v0.3.1

Box modelling with minimal UI on iPad.

A small Pencil/touch-first box and subdivision modeller intended to create clean base meshes for export into Nomad Sculpt.

## v0.3.1 changes

- Vertex display markers are 50% smaller than v0.3
- Selected vertex marker is also 50% smaller
- Two-finger tap = Undo
- Three-finger tap = Redo
- Multi-touch tap gestures only trigger after a short, low-movement tap
- Two-finger pan and pinch zoom remain assigned to the existing OrbitControls camera interaction

## Existing v0.3 modelling scope

- Starts from a cube
- Vertex / Edge / Face selection
- Move selected component
- Scale selected component
- Face extrusion
- Face inset with quad side ring
- Delete face / create open boundary
- Centered Loop Cut from a selected edge
- Loop Cut follows connected quad strips through opposite edges
- Loop Cut stops where topology is no longer quad-compatible
- Loop Cut creates one continuous supporting ring where the topology allows it
- Undo / Redo records geometry edits as single history steps
- Catmull-Clark subdivision preview, levels 1–2
- Cage overlay
- Reset cube
- OBJ export of base mesh
- OBJ export of subdivided mesh
- iPad-friendly one-finger orbit / two-finger pan / pinch zoom via Three.js OrbitControls

## Architecture

The project is intentionally modular.

- `src/mesh.js` — editable polygon mesh data + modelling operations, including Loop Cut
- `src/subdivision.js` — Catmull-Clark subdivision
- `src/export.js` — OBJ export
- `src/history.js` — snapshot undo/redo
- `src/main.js` — viewport, selection, touch interaction and UI wiring

Do not move experimental geometry code into the viewport module. New modelling operations should be added to isolated modules so known-good versions remain easy to preserve.

## Version preservation

- `main` is the live GitHub Pages build.
- v0.1 remains recoverable from Git history.
- v0.2 remains recoverable from Git history and the `boxlab-v0.2` development branch.
- v0.3 remains recoverable from Git history and the `boxlab-v0.3` development branch.
- v0.3.1 was developed on `boxlab-v0.3.1` before promotion to `main`.

## GitHub Pages

Repository: `CrisBezz/BoxLab`

Pages URL: `https://crisbezz.github.io/BoxLab/`

## Next candidates

Mirror, bevel/crease, loop-slide positioning, bridge/weld, multi-object support and GLB export.
