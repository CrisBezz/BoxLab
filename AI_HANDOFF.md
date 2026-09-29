## v0.36.18.596 — single-file iPad Share / Open In payload

- User identified why Nomad Sculpt was absent from the iPad share/open-in destination list:
  - BoxLab was creating one GLB/OBJ File but also supplied `title:fileName` to `navigator.share()`.
  - On iOS the extra share title was exposed as a second text payload/sidecar, so destinations had to accept both the model and text payload.
  - Nomad accepts the model type but not the text payload, so iOS filtered Nomad out.
- .596 changes both iPad share paths to call `navigator.share({files:[file]})` only.
- Applies to:
  - File > Share / Open In…
  - iPad Web Share fallback used by Export / Save…
- No geometry, GLB/OBJ construction, Nomad PBR/UV/tangent/vertex-colour/layer passthrough, or facegroup code changed.
- Export module cache pin bumped to .596.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.

Hands-on check:
1. Export GLB with Share / Open In… and confirm only one shared item appears.
2. Confirm Nomad Sculpt now appears as an eligible destination and opens the GLB.
3. Repeat with OBJ if useful.
4. Regression: Export / Save… still offers Save to Files and saves the model normally.

Next:
- If .596 passes, return to the pending .595 Rotate/Scale soft-detent hands-on verification before further modeless interaction work.
