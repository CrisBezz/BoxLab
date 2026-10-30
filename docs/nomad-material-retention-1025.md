# Native NOM material retention and colour viewport — .1025

Native NOM geometry/UV import remains the original owner. `nomad-material-resource.js`
adds truthful `source:'nomad'` resources to the existing read-only object resource field.
It does not fabricate GLB provenance or a native `source:'boxlab'` UV-only envelope.

- Referenced native material texture slots retain their original encoded image bytes,
  bit depth, names, factors, projection, sampling, displacement and other JSON settings.
  Native image indices are remapped explicitly; image names never determine assignment.
- Resource envelope v4 reuses existing project image pooling/base64 and 24 MiB budget.
  Existing GLB v1/v2 and strict native UV-only v3 behavior remain. History and ordinary
  duplicates share read-only source resources; project images deduplicate by bytes.
- File NOMAD uses the original native writer and image identity/bounds guards. It copies
  native maps directly, including separate roughness/metalness, opacity, emissive and
  16-bit displacement. Native slots never enter GLB packed-map conversion. Original
  import fit is recorded and reversed on the export-local geometry clone, preserving
  native world positions/source units. Original node/procedural structure is not retained;
  local triplanar appearance after baked node transforms is not promised.
- Base topology/UV compatibility remains required for textured NOM export. Stale UVs
  remain stored; preview hides and export refuses rather than dropping maps. Undo restores
  compatibility. Native NOM UV editing/reprojection remains refused in this first build.
- Studio/Solid automatically reuse the existing UV image overlay/triangulation/decoder,
  with Standard material scene lighting and retained scalar material constants. VIEW UV
  Image uses the original unlit inspection surface. No second renderer, picking or paint
  owner. The original body remains the pick target; async completion/cancel/disposal stay
  with the original overlay owner.
- Preview: embedded PNG/JPEG colour, opaque material, UV/Auto, repeat/mirror/clamp and
  scale. Source UVs are unchanged. Native Auto selects UV when UVs exist; Nomad documents
  scale >1 as smaller repeated tiles: https://nomadsculpt.com/manual/material .
  Translation and rotation are retained only until their exact convention is verified.
  Triplanar, transparency, other maps and vertex paint are retained-only/unsupported in
  preview; no dense displacement or full native PBR appearance claim.
- Display budgets: 4 native surfaces concurrently, 20,000 face corners each, source colour
  image <=8 MiB and decoded preview <=1024x1024. Other resources stay encoded. Existing
  linked/procedural/modifier/reference/hidden-object preview guards remain.
- Textured native NOM -> GLB export refuses with a NOMAD/.boxlab explanation instead of
  silently dropping maps. Untextured NOM's existing geometry/UV GLB export remains.
- Reimport the original .nom: older .boxlab files cannot recover previously discarded maps.

Validation: six new production-owner/resource/real-Three tests cover pooled/inline
Save/Open, all slot bytes/settings, 16-bit displacement, source provenance, image bounds,
original dispatcher/import fitting, NOM export unit restoration, stale topology, explicit
GLB refusal, 5x scale, lighting/material/UV/picking/lifecycle, active/inactive guards and
bounded allocations. Existing upstream native fixtures and GLB/paint/UV tests remain.
The old synthetic paint-warning fixture now supplies a valid empty material instead of
an invalid reference to an empty material table; all original warning/source assertions
remain and invalid material/image references have explicit new refusal coverage.

Private source files were used only locally, not checked into the repo. Actual MAP
TEST.nom (Cube496v/504f + Text7911v/7916f) and MAP TEST(1).nom (Cube496v/504f) both pass
File dispatcher -> import fit -> pooled Save/Open -> browser NOM writer -> native parse.
Original material JSON and source world positions match (float32 tolerance2e-6); colour
image SHA256 b8bcef48d8fe49a72520c476636e6affeabece861e55f6833fbe0e04bb555744
matches exactly; repeat remains[5,5], one pooled image in each project.
Native iPad/browser pixel appearance and Nomad reopening remain separate device gates.

Final validation: full local Node24.22.1 suite3022 PASS/0FAIL/0skip/0cancel (110.32s),
159 focused checks PASS; changed JavaScript syntax and whitespace clean.

## Publication

Published runtime b75079208f1b1fc3ca9546c8854c0ea8a954af6d; fetched origin/main tree
80fdac209d1a9778c7a8650fe870b901c8fc2bf3 equals tested/uploaded tree exactly.
All39 changed blobs verified before non-forced expected-main update. Pages
41012329078 SUCCESS; hosted full regression41012329141 completed SUCCESS.
18/27 fresh live file byte matches; remaining9 requests timed out at network proxy,
not counted PASS. Live browser separately confirms title/data/visible1025 and all
six render/import/export/codec-parent/release shell pins1025. Browser's WebGL is
explicitly DISABLED,so no rendered startup/texture visual or native iPad PASS claim.
Build1025 DEPLOYED / READY for native colour/round-trip testing. No runtime edits
after final full3022PASS. Publication proof is documentation-only.
