## v0.36.18.600 — Save for Nomad Files workflow

- .599 confirmed the direct Safari/Web Share route does not surface Nomad Sculpt, even though the same exported GLB becomes eligible when shared from the iPad Files app.
- Conclusion:
  - stop MIME/UTI guessing in BoxLab
  - treat direct browser Web Share -> Nomad eligibility as a platform limitation
  - keep the working filesystem-backed handoff
- .600 changes the GLB iPad UX:
  - GLB secondary action is now **Save for Nomad…**
  - explanatory note says: Save to Files here, then in Files use Share → Nomad Sculpt
  - GLB sharing returns to the standards-correct MIME `model/gltf-binary`
  - the share payload remains one real File only
- OBJ retains the generic **Share / Open In…** wording and behavior.
- No GLB geometry, facegroup, PBR, UV, tangent, vertex-colour or layer-preservation code changed.
- .597 gizmo transient reset remains in place.
- HTML shell and `version.json` are both synced to `0.36.18.600`.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.

Hands-on check:
1. Confirm .600 loads and stays .600.
2. Choose GLB: secondary button should read Save for Nomad…
3. Tap it, choose Save to Files, then from Files Share → Nomad Sculpt.
4. Confirm the GLB opens in Nomad.
5. Switch to OBJ and confirm the secondary button returns to Share / Open In…
6. Regression: normal Export / Save remains functional.

Next:
- Resume the pending .595 Rotate/Scale soft-detent hands-on verification unless a new blocker appears.
