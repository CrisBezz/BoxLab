# Build .764 reliability evidence

## .764 — direct Edge Bevel drag ownership — 2026-10-08

User .763 PASS recorded. Direct Edge Bevel live drag could overwrite same-instance newer edits on move/cancel/disarm or commit stale history after mesh/object/mode/lock changes. Existing sourceUnchanged comparator now checks the last owned preview (or starting source before movement), including real face groups, creases and loose topology. Invalid move/release/cancel uses existing disarm, releases capture and restores controls. Disarm restores only an unchanged owned preview; newer values survive. Replacement meshes remain untouched and the old owned preview rolls back. Original kernels, thresholds, event owners, persistent repeat and Face/Vertex previews retained.

24 new actual-controller cases pass. Initial 19-case baseline:16FAIL/3PASS; after fix all19PASS, plus five metadata/equal-array/repeat checks. Focused153PASS. Full Node24:1972tests/1870PASS/102FAIL/0skip; exact same102failure identities as .763. No tests excluded or CI gate installed. Syntax/whitespace pass. Shell/recovery764 and direct-Bevel764 hash/pin reviewed; Knife763/main762/scaffold761/Extrude759/Loop715/Multi1.0/frozenBeta2–6 unchanged. Device .764 acceptance pending.

Publication verification pending.
