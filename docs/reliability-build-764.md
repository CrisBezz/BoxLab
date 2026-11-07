# Build .764 reliability evidence

## .764 — direct Edge Bevel drag ownership — 2026-10-08

User .763 PASS recorded. Direct Edge Bevel live drag could overwrite same-instance newer edits on move/cancel/disarm or commit stale history after mesh/object/mode/lock changes. Existing sourceUnchanged comparator now checks the last owned preview (or starting source before movement), including real face groups, creases and loose topology. Invalid move/release/cancel uses existing disarm, releases capture and restores controls. Disarm restores only an unchanged owned preview; newer values survive. Replacement meshes remain untouched and the old owned preview rolls back. Original kernels, thresholds, event owners, persistent repeat and Face/Vertex previews retained.

24 new actual-controller cases pass. Initial 19-case baseline:16FAIL/3PASS; after fix all19PASS, plus five metadata/equal-array/repeat checks. Focused153PASS. Full Node24:1972tests/1870PASS/102FAIL/0skip; exact same102failure identities as .763. No tests excluded or CI gate installed. Syntax/whitespace pass. Shell/recovery764 and direct-Bevel764 hash/pin reviewed; Knife763/main762/scaffold761/Extrude759/Loop715/Multi1.0/frozenBeta2–6 unchanged. Device .764 acceptance pending.

Runtime b7bc824eaafb8b9cc109d27cb980b61946d1cf35 published. Actual Node22 Topology run37849650856/job113559106858:1972tests/1870PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .763. Pages37849650385 succeeded. Live shell/version/direct-Bevel and unchanged main/accepted Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused153PASS. Device .764 acceptance pending.
