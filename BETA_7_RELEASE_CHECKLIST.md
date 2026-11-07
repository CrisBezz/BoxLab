# Beta 7 release checklist — .807

- [x] .807 user AWESOME PASS; freeze/deployment explicitly requested.
- [x] .806 compact automatic Boolean editor PASS; .804 visibility/edit workflow PASS.
- [x] .802 dense negative Extrude PASS; .801 edit/exit/radial PASS.
- [x] Full accepted Node24 suite:2163 PASS,0 FAIL,0 skips.
- [x] Copy exact runtime and supporting assets from source recorded in beta-7/freeze.json.
- [x] Frozen file hashes, loader/template references and relative refresh isolation verified.
- [x] GitHub regression and Pages deployment succeed.
- [x] Frozen/live shell, manifests and critical modules match repository bytes.

Beta2–6 remain immutable. No feature changes in the freeze. Frozen Beta7 becomes
immutable after deployment. A final iPad frozen-link launch/navigation/export smoke
is recommended; do not infer additional device outcomes from automated tests.

Beta7 freeze commit `cfa5f2b5992558e61132e7006cec36c2c115f6e3`;
Topology38101242200 and Pages38101242127 SUCCESS. Fresh live shell/manifest and
frozen shell/manifest/metadata/PWA/main/manager/editor/refresh owners/native template
match repository bytes. Existing Beta2–6 manifests byte-match unchanged files.
Beta7 is released and immutable; continue development on main.
