## v0.36.18.601 — explicit Save GLB to Files workflow

- Direct Safari/Web Share -> Nomad Sculpt has been closed as unsupported after repeated hands-on testing:
  - single-file share
  - generic binary MIME
  - explicit model/gltf-binary MIME
  - extension-only type inference
  - all failed to surface Nomad
- The same exported GLB does surface Nomad when shared from the iPad Files app.
- .601 therefore makes the supported workflow explicit:
  - GLB secondary action: **Save GLB to Files…**
  - note: **Save the GLB to Files. Then open Files and use Share → Nomad Sculpt.**
- GLB export itself is unchanged and remains standards-correct `model/gltf-binary`.
- OBJ keeps **Share / Open In…** behavior.
- No GLB geometry, facegroup, PBR, UV, tangent, vertex-colour or layer-preservation logic changed.
- .597 gizmo transient reset remains in place.
- HTML shell, export module pin and `version.json` are synced to `0.36.18.601`.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.

Hands-on check:
1. Confirm .601 loads and stays .601.
2. Choose GLB: secondary action reads Save GLB to Files…
3. Save the GLB to Files.
4. In Files, Share → Nomad Sculpt and confirm import.
5. Switch to OBJ and confirm secondary action returns to Share / Open In…
6. Regression: normal Export / Save remains functional.

Next:
- Return to pending Rotate/Scale gizmo soft-detent verification unless a new blocker appears.
