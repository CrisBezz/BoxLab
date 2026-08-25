# BoxLab v0.4

Box modelling with minimal UI on iPad.

A small Pencil/touch-first box and subdivision modeller intended to create clean base meshes for export into Nomad Sculpt.

## v0.4 changes

- Non-destructive Mirror modifier
- Independent Mirror X / Mirror Y / Mirror Z toggles
- Mirrors around the global origin
- Coincident mirrored vertices and faces are deduplicated
- Source cage remains the editable/selectable geometry
- Mirrored result is shown with a lighter ghost cage when cage display is enabled
- Catmull-Clark subdivision is evaluated after the Mirror modifier
- Base OBJ export includes the active mirrored result
- SubD OBJ export includes Mirror + SubD
- Mirror implementation is isolated in `src/mirror.js`

## Existing modelling scope

- Starts from a cube
- Vertex / Edge / Face selection
- Move selected component
- Scale selected component
- Face extrusion with projected outward drag direction
- Face inset with quad side ring
- Delete face / create open boundary
- Centered Loop Cut from a selected edge
- Loop Cut follows connected quad strips through opposite edges
- Two-finger tap = Undo
- Three-finger tap = Redo
- Catmull-Clark subdivision preview, levels 1–2
- Cage overlay
- Reset cube
- OBJ export of base mesh
- OBJ export of subdivided mesh
- iPad-friendly one-finger orbit / two-finger pan / pinch zoom via Three.js OrbitControls

## Architecture

The project is intentionally modular.

- `src/mesh.js` — editable polygon mesh data + modelling operations
- `src/mirror.js` — non-destructive X/Y/Z mirror modifier and deduplication
- `src/subdivision.js` — Catmull-Clark subdivision
- `src/export.js` — OBJ export
- `src/history.js` — snapshot undo/redo
- `src/main.js` — viewport, selection, touch interaction and UI wiring

Do not move experimental geometry code into the viewport module. New modelling operations should be added to isolated modules so known-good versions remain easy to preserve.

## Version preservation

- `main` is the live GitHub Pages build.
- v0.1, v0.2 and v0.3 remain recoverable from Git history and their development branches.
- v0.3.1 remains recoverable from `boxlab-v0.3.1`.
- v0.3.2 remains recoverable from `boxlab-v0.3.2`.
- v0.4 is developed on `boxlab-v0.4` before promotion to `main`.

## GitHub Pages

Repository: `CrisBezz/BoxLab`

Pages URL: `https://crisbezz.github.io/BoxLab/`

## Next candidates

Bevel/crease, loop-slide positioning, bridge/weld, multi-object support and GLB export.
