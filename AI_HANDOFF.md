## v0.36.18.599 — extension-driven GLB share type test

- .598 shared a single real .glb File with MIME `model/gltf-binary`, but Nomad Sculpt still did not appear in the iPad share sheet.
- Important observation:
  - The same exported GLB does show Nomad when shared later from the iPad Files app.
  - Therefore the file content and .glb support in Nomad are not the blocker.
- Current hypothesis:
  - Safari/Web Share is advertising an in-memory item differently from a filesystem-backed GLB.
  - Nomad may be matching the filename/filesystem-derived document type rather than the MIME-derived share item.
- .599 test:
  - GLB Share / Open In still creates exactly one File named `*.glb`
  - but omits an explicit File MIME type, allowing iPadOS/WebKit to infer type from the `.glb` extension
  - OBJ sharing remains explicitly typed and unchanged
  - share payload remains exactly `navigator.share({files:[file]})`
- HTML shell and `version.json` are both synced to `0.36.18.599`.
- .597 gizmo transient reset remains in place.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.

Hands-on check:
1. Confirm .599 loads and stays .599.
2. GLB > Share / Open In…
3. Confirm one file only.
4. Check whether Nomad Sculpt now appears.
5. If Nomad still does not appear, treat direct Safari Web Share -> Nomad as an iPadOS/WebKit target-eligibility limitation and stop MIME guessing.
6. Regression: Files-save export still produces a normal .glb that can be shared to Nomad from Files.
