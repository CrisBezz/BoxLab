## v0.36.18.598 — typed GLB File share for iPad/Nomad

- User confirmed .596/.597 now shares a single item, but Nomad Sculpt still does not accept it.
- Root cause:
  - Share / Open In was still overriding GLB File.type to `application/octet-stream`.
  - iPadOS therefore saw a generic binary file rather than an explicit GLB.
- .598 now constructs the shared GLB as a real File with:
  - filename ending in `.glb`
  - MIME `model/gltf-binary`
  - payload `new File([blob], fileName, {type:'model/gltf-binary'})`
- Web Share payload remains exactly:
  - `navigator.share({files:[file]})`
- OBJ sharing is unchanged and keeps its own MIME.
- Export / Save fallback already used the requested MIME and remains unchanged.
- .597 transform-menu gizmo reset remains in place.
- `version.json` and HTML shell are both synced to `0.36.18.598`.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.

Hands-on check:
1. Confirm live version stays at .598.
2. Choose GLB and Share / Open In….
3. Confirm only one item is shared.
4. Confirm Nomad Sculpt appears as an eligible destination.
5. Open in Nomad and verify the model imports.
6. Regression: normal Export / Save and OBJ sharing still work.

Next:
- If Nomad still does not appear, inspect iPadOS/Nomad UTI compatibility rather than weakening the GLB MIME back to generic binary.
