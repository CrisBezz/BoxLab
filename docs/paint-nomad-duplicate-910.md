# .910 — distinct native texture names for distinct painted duplicates

User909PASS: duplicate paint now sticks in BoxLab; protect release/Done/SaveOpen/
Undo behaviour. Exception: Nomad export shows original paint on both objects.
Screenshots explicitly show909 and green additional paint on copy in BoxLab, absent
in Nomad. Audit mainc1b350e0, original paint export snapshot/PNG/native material writer.

Owned export snapshots and per-resource PNG preparation already produce distinct
bytes, image indices and material bindings for different committed paint. New actual
NOM tests verify every object-to-material-to-image PNG against its expected surface
bytes. Before repair these pixel assertions pass, BUT both material textures advertise
name 'BoxLab paint.png'. This is a reproducible name collision, not lost BoxLab paint.
Nomad resolving/caching names is an inference from the observed symptom, not a proven
private-loader implementation. Native device retest is required before claiming the
reported external-app problem is resolved.

Repair ONLY authoritative nomad-export-core native texture naming: export-local name
registry maps NFC/case-folded names to embedded image index. If another image already
uses the requested name, append numeric suffix before extension until unique. Existing
non-colliding names preserved; equal image indices may retain the same name or existing
aliases. Applies across colour/imported/converted slots so paint cannot collide with an
imported filename or generated numbered name. Original name/data in scene untouched.
No changes to content-image dedup890 (full bytes after hash bucket), indices/materials/
factors, offsets, UVs, mesh geometry, texture settings or24MiB budget. No material IDs
invented, no duplicate exporter or image engine. Repeat exports deterministic/local.

Four new regressions cover distinct painted source/copy exact PNG+material+name links;
actual File NOMAD after .boxlab SaveOpen and async source replacement during export;
unchanged images still share one image/name and repeat bytes; mixed paint/import maps
with case-folded/pre-suffixed names remain distinct without source mutation. Existing
native rich maps/dedup/export regressions retained. Binary/Node checks are not rendered
Nomad acceptance. Parent native-export/File/Lab loader graph910; paint/resource/history/
pool/viewport909, stack/image908/source907/brush/protected modelling/Multi/frozen intact.

Manual: re-export the shown source/copy pair from910 to a fresh NOM file, open in Nomad,
confirm green copy-only strokes. Paint the copy again and export again; both remain
independent. Optional unchanged duplicate should still look identical.909 viewport PASS
protected;909 native export exception remains device-pending for910. If it persists,
inspect the actual user-exported NOM's per-mesh material/image bytes; do not undo the
accepted viewport fix or guess at native material fields. Resume projection UI after gate.
