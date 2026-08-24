# BoxLab v0.1

Box modelling with minimal UI on iPad.

A small Pencil/touch-first box and subdivision modeller intended to create clean base meshes for export into Nomad Sculpt.

## v0.1 scope

- Starts from a cube
- Vertex / Edge / Face selection
- Move selected component
- Scale selected component
- Face extrusion
- Catmull-Clark subdivision preview, levels 1–2
- Cage overlay
- Undo / Redo
- Reset cube
- OBJ export of base mesh
- OBJ export of subdivided mesh
- iPad-friendly orbit / two-finger pan / pinch zoom via Three.js OrbitControls

## Architecture

The project is intentionally modular.

- `src/mesh.js` — editable polygon mesh data + core modelling operations
- `src/subdivision.js` — Catmull-Clark subdivision
- `src/export.js` — OBJ export
- `src/history.js` — snapshot undo/redo
- `src/main.js` — viewport, selection, touch interaction and UI wiring

Do not move experimental geometry code into the viewport module. New modelling operations should be added to isolated modules so known-good versions remain easy to preserve.

## GitHub Pages

Repository: `CrisBezz/BoxLab`

Target Pages URL: `https://crisbezz.github.io/BoxLab/`

## Next candidates

Loop cut, mirror, bevel/crease, bridge/weld, multi-object support and GLB export.
