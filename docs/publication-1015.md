# .1015 — native affine-row rounding repair

Baseline main0ca3c2f9 / live1014 runtime8a33141c.
Actual MAP TEST.nom reproduced and now decodes both UV-bearing objects;
geometry/UV Save/Open and NOM export/reimport verified; source unchanged.
23 focused checks PASS. Full local Node24.22.1:2986 PASS/0FAIL/0skip/0cancel (113.42s).
Syntax/whitespace clean. Publication evidence follows.
Native iPad acceptance pending; no native texture/material import added.

.1015 publication verified — 29 October 2026:
Runtime6511ca38297fb7b5e9f2bf51f029dffe3e6cfb2d; tested/uploaded tree
b60c4c6ae0f673e21f9271a4df47d7bd7dcf42f0 exactly matches fetched origin/main.
All14 blobs verified before atomic non-forced expected-main update. Pages40869617898
completed SUCCESS; all10 fresh live files byte-match tested checkout (shell,manifest,
importer,decoder,release loader chain,comparison and protected Multi1.0). Full local
Node24.22.1:2986 PASS/0FAIL/0skip/0cancel (113.42s),23 focused checks PASS,
syntax/whitespace clean. Hosted40869618748 still in_progress at proof; not claimed PASS.
Build1015 LIVE / READY for native import retest; device acceptance pending.

Second user upload MAP TEST(1).nom (2,805,852bytes) contains ONLY Cube496v/504f with
UVs; Text is absent. It imports on both pre-fix1014 and patched1015. Original first
MAP TEST.nom (3,271,012bytes) includes live Text7911v/7916f with rounded affine w:
pre-fix refuses, patched imports BOTH objects. This comparison confirms the failing
saved Text transform, not proof that validating text rewrites/fixes its matrix.
No editable native-text semantics or texture/material preservation added. User files
remain unchanged and are not committed into repository. Native texture/PBR retention
is still the separate next proposal. DEVICE1015 original first file is meaningful
regression test; second cube-only copy is useful geometry/UV sanity check.
