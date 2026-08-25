# BoxLab v0.2

Box modelling with minimal UI on iPad.

A small Pencil/touch-first box and subdivision modeller intended to create clean base meshes for export into Nomad Sculpt.

## v0.2 scope

- Starts from a cube
- Vertex / Edge / Face selection
- Move selected component
- Scale selected component with more predictable screen-space drag response
- Face extrusion
- Face inset with quad side ring
- Delete face / create open boundary
- Clearer selected component feedback
- Face-only action buttons disable when no face is selected
- Tap empty space to deselect
- Undo / Redo only records actual geometry edits rather than selection taps
- Catmull-Clark subdivision preview, levels 1–2
- Cage overlay
- Reset cube
- OBJ export of base mesh
- OBJ export of subdivided mesh
- iPad-friendly one-finger orbit / two-finger pan / pinch zoom via Three.js OrbitControls

## Architecture

The project is intentionally modular.

- `src/mesh.js` — editable polygon mesh data + core modelling operations
- `src/subdivision.js` — Catmull-Clark subdivision
- `src/export.js` — OBJ export
- `src/history.js` — snapshot undo/redo
- `src/main.js` — viewport, selection, touch interaction and UI wiring

Do not move experimental geometry code into the viewport module. New modelling operations should be added to isolated modules so known-good versions remain easy to preserve.

## Version preservation

- `main` is the live GitHub Pages build.
- v0.1 remains recoverable from Git history before the v0.2 merge.
- v0.2 was developed on `boxlab-v0.2` before merge to `main`.

## GitHub Pages

Repository: `CrisBezz/BoxLab`

Pages URL: `https://crisbezz.github.io/BoxLab/`

## Next candidates

Loop cut, mirror, bevel/crease, bridge/weld, multi-object support and GLB export.
