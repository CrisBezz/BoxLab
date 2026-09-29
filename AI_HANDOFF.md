## v0.36.18.586 — one authoritative transform type-in system

- .585 hands-on feedback:
  - Focus on top row is correct.
  - Rotate/Scale gizmo floating HUD type-in still unreliable.
- .586 removes the duplicate floating numeric-input experiment.
- The gizmo now synchronizes the persistent transform strip through a new `__boxlabTransformUpgrade.setContext(tool,constraint)` API.
- Gizmo handle mapping now drives the same visible type-in system:
  - move arrows => Move + X/Y/Z
  - rotate rings => Rotate + X/Y/Z
  - axis scale squares => Scale + X/Y/Z
  - uniform scale ring => Scale + Free/Uniform context
- The persistent `#transformValue` field updates its placeholder/context accordingly and remains the only numeric-entry point.
- Transform polish listens for `boxlab-transform-context` so enabled/title state refreshes immediately after gizmo use.
- Gizmo HUD is back to readout-only and briefly tells the user exact entry is in the left panel.
- Focus remains on top row; no change to its behavior.
- Share/Open In unchanged.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 8/8 PASS.

Hands-on check:
1. Drag/release X move arrow => left transform strip shows Move + X and Distance field.
2. Drag/release X/Y/Z rotate ring => left strip switches to Rotate + matching axis and Degrees field.
3. Type exact degrees in that left field and press Enter.
4. Drag/release X/Y/Z scale square => left strip switches to Scale + matching axis and Scale factor field.
5. Type exact scale factor and press Enter.
6. Outer uniform scale ring => Scale + Free/Uniform context.
7. Move exact type-in remains unchanged.
8. Focus top-row button remains working.

