# .899 — project colour resource preservation

User .898 PASS protects lab Save/Open, paired pixels/settings/view and continued
painting/history. Audit main37c77ab5: production snapshots/ordinary duplicates only
forwarded glbPassthrough; codec was synchronous project v1, native resource v3 UV-only.
No alternate paint persistence owner existed. Main viewport has no paint authoring yet.

`colourPaint` is a separate committed object resource using the .898 opaque baseColor,
sRGB RGBA8, UV-v0-first descriptor and pixels. Scene history and both ordinary Duplicate
owners share the resource READ-ONLY. Edits must capture new pixels/resource and replace
it after the ORIGINAL scene checkpoint. Metadata freezing does not freeze typed pixels.
Snapshots restore the resource from the snapshot, never from a current same-ID object.
Ordinary duplicates retain independent geometry. Linked copies refuse this owner.

Painted .boxlab projects use scene version 2, `colourPaintPool`, and per-object
`colourPaintResource:{version:1,index}`. Each pool entry has envelope version1,
explicit descriptor and canonical base64 bytes. Existing project binary transport is
exported/reused; no fake imported GLB payload or second pixel raster is introduced.
Native resource v3 remains STRICTLY UV-only. Plain/native-UV/imported projects still
encode as version1 with the same fields/order; old readers reject version2 safely.
Only independent native-UV objects are supported, not linked/procedural/reference owners.
8 MiB aggregate UNIQUE raw paint budget, up to1024² opaque pixels/map; existing GLB pool
24 MiB and total Save/Open32 MiB limits remain. Identity cache avoids re-encoding shared
commits; equal independent descriptors+bytes also deduplicate. Decode stages owned copies,
shares each decoded pool entry, rejects malformed descriptors/alpha/encoding/refs,
unused/duplicate entries, unencoded fields, unsupported owners and size limits.
Original Save/Open exact roundtrip and atomic scene replacement remain authoritative.
Opening a resource-bearing file explicitly says colour is preserved but main viewport
display/editing is not available. Successful Open clears global history as before.

The synchronous project transport does NOT claim SHA authentication or detect arbitrary
valid RGB edits. .898 asynchronous .boxpaint transport retains its existing SHA checks.
The opaque `binding` identifier is preserved, NOT interpreted as current UV validity.
The .898 lab binding hashes its entire embedded scene; production display/authoring MUST
introduce the intended original geometry/UV validity check and explicit resource rebinding
before use. Duplicating/editing geometry must never automatically imply a valid binding.
No conversion of a .boxpaint file into a main-project resource is offered yet. There is
no resource authoring menu, main paint gesture, layer stack, GLB/OBJ/Nomad colour export,
seam mask/stitching, imported paint base or PBR claim. Export remains the existing mesh/
material pipeline, not a route for this new colour owner. Do not claim project byte
preservation means arbitrary topology tools propagate paint or that exported files do.
Next build: bounded selected-object display/authoring bridge through the original UV
geometry/selection/history owners, validity and lifetime/refusal rules before exposure.

Four tests run real codec/resource, scene snapshot/history, manager add/ordinary single
and Multi duplicate, original Save/Open/download, invalid-file and failed-render rollback.
Exact JSON/pixels/nativeUV, COW replacement isolation, deletion UndoRedo, content dedup,
version1 compatibility,8MiB boundary, malformed/refused owners are covered. Full Node24
2487PASS/0FAIL/0skip; focused four also pass after adding rollback assertions.
No new browser/Pencil rendering claim. User checks are nearby regressions only: lab
Save/Reset/Open/continued UndoRedo, main ordinary Duplicate/Undo, plain .boxlab Save/Open.
