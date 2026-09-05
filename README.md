# BoxLab v0.5

Box modelling with minimal UI on iPad.

A small Pencil/touch-first box and subdivision modeller intended to create clean base meshes for export into Nomad Sculpt.

## v0.5 changes

- Selected-edge SubD crease workflow
- Crease strength from 0–100%
- Apply Crease / Clear Crease controls
- Creased source edges display distinctly in the editable cage
- Catmull-Clark edge points blend between smooth and sharp based on crease weight
- Crease-aware vertex rules preserve sharper corners where multiple creased edges meet
- Crease weights propagate through subdivision levels
- Crease state is stored with the editable mesh so Undo / Redo restores it with geometry
- Mirrored SubD is generated from the creased source, so mirror symmetry inherits the same sharpness
- SubD OBJ export includes the crease result

## Existing modelling scope

- Starts from a cube
- Vertex / Edge / Face selection
- Move selected component
- Scale selected component
- Face extrusion with projected outward drag direction
- Face inset with quad side ring
- Delete face / create open boundary
- Centered Loop Cut from a selected edge
- Non-destructive Mirror X / Y / Z
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

- `src/mesh.js` — editable polygon mesh data, modelling operations and crease metadata
- `src/mirror.js` — non-destructive X/Y/Z mirror modifier and deduplication
- `src/subdivision.js` — crease-aware Catmull-Clark subdivision
- `src/export.js` — OBJ export
- `src/history.js` — snapshot undo/redo
- `src/main.js` — viewport, selection, touch interaction and UI wiring

Do not move experimental geometry code into the viewport module. New modelling operations should remain isolated so known-good versions stay easy to preserve.

## Version preservation

- `main` is the live GitHub Pages build.
- v0.1 through v0.4 remain recoverable from Git history and development branches.
- v0.5 is developed on `boxlab-v0.5` before promotion to `main`.

## GitHub Pages

Repository: `CrisBezz/BoxLab`

Pages URL: `https://crisbezz.github.io/BoxLab/`

## Next candidates

Loop-slide positioning, bridge/weld, multi-object support, GLB export and a true geometry bevel tool.

## Future development

- Auto Close / Make Watertight: detect open boundaries and repair/close an object into a watertight mesh where topology can be resolved safely.
- Direct Pencil Bevel / Chamfer Width: select one or more bevel-capable edges and Pencil-drag directly on the selection to control bevel width live; Pencil lift commits the result. Segments remain independently adjustable.
- Connected Edge-Chain Bevel Corner Solver: continuous bevel/chamfer across touching selected edges using a shared miter/corner patch instead of overlapping sequential bevels.
