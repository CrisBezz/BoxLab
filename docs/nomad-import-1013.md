# .1013 — native Nomad polygon import

Format reference supplied by the user: Stéphane Ginier / Hexanomad,
[Nomad Blender Link nom_file.py](https://github.com/stephomi/nomad-link/blob/08391c8e00f274913c673e2459ed5a2e059a0ac0/blender/nomad_blender_link/nom_file.py),
blob `6dcb1eab5d28531adb48492ad3f985da852b3c43`, revision28October2026.
Also inspected the same revision's Blender adapter for parent-local transforms,
negative fourth triangle index, top-origin UVs and FaceMeta bit15 visibility.
Upstream Python source identifies GPL-3.0-or-later; it is not bundled in BoxLab.
The browser module is an independent implementation of the container/array layout.
No Python, NumPy, Blender, native LZ4 or new package is needed at runtime.

Audit: current main4fd7510f/runtimeb6a6d9d8 (.1012) has native NOM export only.
Existing `readNomadProject` in nomad-export-core is a validated EXPORT-TEMPLATE
reader, not an import decoder: modern header only, strict binary-end layout,
no compressed array, scene or legacy support. It remains unchanged, with original
writer/donor/UV/Paint regression protections. No duplicate modelling kernel added.

Existing File Import now accepts .nom through the SAME dispatcher and addImported
owner. Parse all meshes before adding any, retain native indexed polygons without
OBJ/GLB welding or triangle-pair reconstruction. Existing fit centres/scales the
entire scene together to BoxLab size2, retaining relative placement/proportions.
Manager still owns object creation, reference locking, naming uniqueness, history
and rendering. Source file is untouched. Original OBJ/GLB/GLTF paths remain.

Supported:

- NOM versions1–7, legacy32-byte and modern72-byte headers; thumbnails before JSON
  or after binary; strict finite/safe section and decoded byte bounds.
- Raw, zero-only, legacy single LZ4 and current multi-block LZ4 arrays. Decoder
  checks literals, overlapping matches, chunk lengths and final decoded sizes.
- Named independent mesh nodes, nested parent-local transforms, inherited object
  visibility; repeated mesh references become separate editable copies. Negative
  determinant reverses both polygon and UV corners to retain outward winding.
- Quads, native negative-fourth triangles and BoxLab writer's repeated-third
  triangle convention; shared/disconnected coincident indices remain unchanged.
- Per-face group IDs (masking FaceMeta hidden flag), available names, separate UV
  corner indices/seams. Hidden faces currently become visible with an explicit note.
- Main saved geometry with missing topology supplied by the saved active multires
  level; empty multires list is valid. Triplanar baked polygon fallback if present.
- Native UV-only envelope reuses existing BoxLab UV inspection/editor, Paint launch,
  project codec and GLB/NOM UV export. No fake GLB provenance or new resource schema.

Deliberate limits, stated in File UI and import status:

- Geometry and UVs only. Vertex paint, materials, embedded textures, masks and
  editable sculpt-layer history are not imported. Main saved positions are the
  saved sculpt shape; layers are flattened, not re-evaluated as morph targets.
- Lights/cameras omitted with a status note. Object groups are flattened to named
  objects after applying hierarchy transforms; no linked-instance relationship.
- Repeat hints require validation to polygon instances in Nomad. Missing compressed
  multires topology requires saving with compression disabled. Unbaked procedural
  geometry refuses the entire import; no successful-but-partial mesh import.
- 128MiB file /16MiB JSON /64MiB decoded requested arrays, 500,000 vertices AND faces
  across instantiated geometry,512objects,4096nodes,depth128. These are refusal
  limits, not measured iPad performance guarantees. Decimate larger sculpts in Nomad.

Evidence: tests/fixtures/nomad-import-1013.json contains three small independent
fixtures produced by upstream NomWriter and native liblz4, then read/verified with
upstream NomFile/geometry/scene: rawv7, chunkedv7, legacyv5. Source hash is recorded;
no copied Python ships. Genuine checked-in Nomad tube donor also decodes correctly:
2642 vertices/2640 faces, compressed arrays,128px thumbnail BEFORE JSON.
Nine tests execute decoder/scene conversion and actual File dispatch/addImported,
Reference, refusal-before-add, preserved coincident indices, native UV Save/Open,
real GLB export and native NOM reimport. Native iPad files/feel remain a device gate.

Next device checks: import a small low-poly .nom; confirm object names/quads/groups,
relative placement, UV Editor; Save/Open .boxlab and export back to Nomad. Send a
failing .nom with the exact error for further compatibility work. Broader paint/
material/layer/repeat support stays staged after the first native geometry result.
