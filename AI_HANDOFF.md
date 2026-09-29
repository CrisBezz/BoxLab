## v0.36.18.583 — transform input focus + Focus View + wider GLB share handoff

- .582 hands-on feedback:
  - Move numeric type-in worked.
  - Rotate and Scale numeric boxes did not reliably accept typing on iPad.
  - Native browser fullscreen was unsuitable because Chrome/iPad adds swipe-down-to-exit and exiting could leave BoxLab top actions missing.
  - Share / Open In did not naturally offer Nomad even though Files can open GLB in Nomad.
- .583 changes:
  - `#transformValue` gets explicit iPad/Pencil/touch focus handling, mirroring the proven export filename field pattern. Scale and Rotate use the existing exact-value maths; this change fixes input acquisition rather than creating another transform engine.
  - Native Fullscreen API removed from BoxLab Viewport UI.
  - Replaced with **Focus View**:
    - stays inside the normal page/browser
    - keeps File / Frame All / Undo / Redo / Viewport top row
    - hides only the left tool drawer to maximise modelling space
    - no browser swipe-down fullscreen exit gesture
  - GLB Share / Open In now presents the .glb file to iPadOS as `application/octet-stream` while preserving the `.glb` filename, to encourage extension-based destination matching rather than strict Web Share MIME filtering.
  - Normal Export / Save continues to use the established GLB MIME and remains unchanged.
- If Nomad still does not appear in the Web Share sheet, that indicates iPadOS/Nomad exposes GLB through Files/document import but not as a Safari Web Share destination.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 9/9 PASS.

Hands-on check:
1. Select Rotate; tap Degrees/Value field with finger/Pencil and verify keyboard/input works.
2. Enter exact degrees and confirm rotation.
3. Select Scale; tap Scale/Value field and enter exact factor.
4. Undo both exact operations.
5. Viewport > Focus View hides left drawer but keeps the complete top row.
6. Exit Focus View restores left drawer.
7. Share / Open In GLB and check whether Nomad now appears.
8. Normal Export / Save remains unchanged.

