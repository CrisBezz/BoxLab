# .1033 publication proof — 31 October 2026

Application commit: bbe1896581176abdfb297404161d5023b3d9a26a.
Exact reviewed tree: 8554d21a5068f6f38b0feb1d825bcd0c043643b0.
Published on main with expected-parent lease 1cd744b63ff35cafea7a56b01c0cfbd81b53645f.
Fresh fetch of main matched tree and release markers; local checkout aligned.

Validation: Node22 full suite 3058 PASS, 0FAIL (102.29s); four final standalone
checks PASS on Node22 (includes added shared-budget check after full run).
Existing thirty native material tests PASS. git diff --check clean.

Pages deployment 41150967831 SUCCESS. All seven fetched live files below are
byte-identical to the reviewed checkout, using cache-busting requests.

| File | Bytes | SHA256 |
| --- | ---: | --- |
| version.json | 27 | cc6fda623c092ce799ec31cc5c28c28f3d0dba5260a85ef50cef8e8bc26f5918 |
| index.html | 23944 | 9c17b8683474d1b4994f962edf5eeea6ee67176434288c76b451d12a7cc1bd07 |
| src/nomad-material-resource.js | 9365 | 960a171af636e11cd58f902de0d7243e13d76b5ffb2dbd8f07bc92b2d28b7333 |
| src/uv-image-surface-preview.js | 10887 | b3e8660cdfb1ef32fbc97a16082f3941cc07be7476a52c8298cb1c734c2db7ee |
| src/render-modes.js | 36610 | 00be232646558299907d68974055f3decae6fa67091c4cfcda498ec14f8374e2 |
| src/shell-comparison.js | 13932 | 5084ab12281c61dda8cc6edf81aac29b95de3c22bf8be04ed242f52da70e00e6 |
| docs/samples/NOM_STANDALONE_MAPS_1033.nom | 91528 | 79ab0be0dac24760543a4faa9e00d1c5e5e4ea0b3ac043b3b86472ff6c53e7f4 |

Standalone base colour/defaults checked against official nomad-link Blender
importer at commit 08391c8e00f274913c673e2459ed5a2e059a0ac0:
https://github.com/stephomi/nomad-link/blob/08391c8e00f274913c673e2459ed5a2e059a0ac0/blender/nomad_blender_link/__init__.py

No iPad/GPU appearance acceptance is claimed. .1032 loading/VIEW PASS protected.
Displacement deformation and original alpha-OFF colour discrepancy remain open.
New sample uses real opaque RGB colour/emissive checker; .1032 sample unchanged.

Hosted Topology regression 41150968538 completed SUCCESS on the application commit.
https://github.com/CrisBezz/BoxLab/actions/runs/41150968538
https://github.com/CrisBezz/BoxLab/actions/runs/41150967831

Current status: .1033 LIVE and READY FOR TESTING; manual material appearance pending.
