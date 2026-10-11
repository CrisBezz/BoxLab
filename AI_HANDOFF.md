# BoxLab AI Handoff — Balloon density .816

## Current state — 2026-10-11

Main release v0.36.18.816, pending device acceptance. User PASS .815 Reset→Pencil drawing; protect it. Beta7 frozen .807 immutable. Repo is source of truth.

## .816 — Balloon density and performance gate

User reports about a minute to insert Balloon, almost unusable modelling. Screenshot: active mesh 938 vertices/1872 faces, full scene 161358 rendered triangles, idle 60FPS/0 timed rebuilds. Exact stall owner NOT proven: idle FPS does not measure creation latency. Audit: new Balloon already sets SubD false and MeshUtilz-derived generator requires >=12 section rings regardless of Detail. Original donor receives OPTIONAL outlineSegments/sectionRings; no alternate geometry kernel. New Balloon records have balloonResolution=4. Slider Density 4–12 maps N section rings and 6N outline segments. Old scene recipes lacking balloonResolution use exact prior donor defaults, and are not migrated unless the user moves Density. Existing Curve candidate preview, original native object manager/history, Pencil window capture and Reset lifecycle remain owners. No global SubD/display/performance changes. Assets repinned from vendor to core to UI to primitive parent, plus shell/recovery markers. SHA256 reference fixture reviewed. Legacy Beta2–7 unchanged.

Test gate on iPad: Reset > Add Balloon > draw oval > Density4 Preview and Apply; Density8/12; edit old .815 Balloon; Cancel/Undo/Redo, orbit/pan/pinch and subsequent component edits. Time insertion and post-insertion responsiveness. If still slow, profile root.add scene hooks / inactive displays versus triangulation/history using the existing .812 Performance tool. Do not claim performance fixed before tactile acceptance.

Protected: Multi transform 1.0, Loop .715, Extrude .802, Boolean .806, .815 drawing/Reset, navigation and all frozen Betas. Next .boxlab Save/Open, NOM, concave Balloon and UV remain queued after performance gate.
