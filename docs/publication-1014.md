# .1014 — remove native chooser type restriction

Baseline d5bf9f6a / runtime2e31ed3d. User1013 native picker FAIL before decoder.
Only feature change is removing accept from original shell mesh input.
26 focused PASS; syntax/whitespace clean. Full local1013 baseline2983 PASS retained;
no fresh full local rerun. Native picker/iPad outcome remains pending.
Publication/live evidence below.

.1014 publication verified — 29 October 2026:
Runtime8a33141cc957ce054294a9a08141257d6c11d39a; tested/uploaded tree
e7d18056cc99d81c0f0618a5f70674ad89101d31. All12 blobs hash-verified before atomic
non-forced expected-main update; fetched main tree exactly matches local checkout.
Pages40827906168 completed SUCCESS.10/10 cache-busted live files match, including
unfiltered shell, release-loader chain and unchanged importer/decoder/Multi1.0.
26 focused checks PASS,syntax/whitespace clean. Full local1013 baseline2983 PASS
retained; no fresh full local run for shell-only change. Hosted40827907551 still
in_progress at proof,not claimed PASS. .1014 LIVE/READY for native chooser retest;
actual iPad Files selectability and subsequent NOM import remain pending.

Live SHA-256 equality to tested checkout:

- `version.json`: `e0a16f7c909c30a386b5dfeb730e764a696b4a7d5d4a468d836425f022e76576`
- `index.html`: `61117d49f0bfb6dd1bd5e0fe87145902220ad95d53082dc4a2ab78700ad67ab0`
- `src/drawer-ui.js`: `ec85f4d75e5f1677ca326a039e3d8803052c595b52501656b980f88579108de6`
- `src/face-workflow-layout.js`: `69e97a057ffd4d469e3ee0929c78e340ce487c0ce822a21851f5c654d59ebbad`
- `src/release-bootstrap.js`: `fe3e41b43e5df07fb5252936bff4e2a7c4f47fcb38f89b2cb6204fc5712e1698`
- `src/release-version.js`: `cfadc2ea924b204d7039894a21640d1842357e75be2f651c3517eea97aeff0f7`
- `src/shell-comparison.js`: `dbb24385147cda7cbc21abc7a13b5601dd61eb5bfc70fb8474aa8c43503cf7ff`
- `src/import-mesh.js`: `d064a039b8186773145b8ca7f32c158889c61efffca08fb0f399b083c64bbf20`
- `src/nomad-import-core.js`: `53b61b519673fac053a56cf8738fc21f10faa2e53af53dadc99dc1624ba9d37a`
- `src/multi-object-transform.js`: `024ec06122bb9ccfeaee53ab5da5bae520dc194db6201ba2479a376902380069`
