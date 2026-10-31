# BoxLab development history addendum — .1044

## .1044 — unified UV Paint material menu — 1 November 2026

The user requested a more complete UV Paint palette based on the Nomad colour menu.
Existing `viewport-paint.js` was confirmed as the authoritative UI owner and
`viewport-paint-core.js` as the Lit/channel preview owner. The build reuses these
controls rather than adding a parallel material editor.

A Material swatch is added to the radial wheel and quick panel header. It previews the
selected paint colour with alpha tied to brush stroke opacity, displays a compact hex /
percent readout, and opens one shared Material & Paint menu. The menu combines the
existing colour picker and RGB/HSB/Hex entry, Lit preview lock, channel selection,
roughness/metalness stroke values, brush size/stroke opacity and brush-tip settings.
Both scalar paint-value controls remain visible, with the selected channel identified.
New and restored Paint sessions now default to Lit material preview.

Map Size and AO were removed from radial actions and placed at the bottom of Layers.
Opacity wording distinguishes brush stroke strength from material opacity. Imported
opacity maps remain retained, but BoxLab does not yet author opacity textures. The .1043
contextual help, draggable palette, iPad/Pencil gesture ownership and model/render owners
remain unchanged. Protected `src/multi-object-transform.js?v=0.36.1.0` is untouched.

Validation: `node --check` for both changed JavaScript modules and `git diff --check`
passed. Automated tests were not run. Native iPad interaction/visual acceptance is
pending; see `TEST_CHECKLIST.md`.

