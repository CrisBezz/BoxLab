# .741 — OBJ facegroup boundaries and round trips

User PASS .740 then /nextbuild. Parent main7bbc142f42a90d488b530a18f0470aa79ac69729.
This batch includes a narrow runtime export fix, unlike .737–.740 test-only batches.

## Defects reproduced before fixing

Two of nine new fixtures fail against .740:

- If a grouped object is followed by an ungrouped object, no explicit g reset was
  emitted before the latter's first face. An independent OBJ stream reader that
  retains group state across o records inherits the earlier group. BoxLab's own
  importer resets group at o, masking this omission; no specific Nomad failure
  inferred. Export now emits bare g for the initial ungrouped face as well as
  ordinary within-object resets.
- A facegroup label containing CR/LF was written raw, allowing subsequent text to
  become additional OBJ records. A synthetic newline-containing group generated
  two imported objects instead of one. Export now reuses existing safeOBJName
  whitespace normalization for group names, keeping them on a single line.

The scene OBJ core owns normal Export As and Quick OBJ. Legacy export.js remains
unchanged; its main listeners are superseded by scene wrapper's document capture.
No new exporter or interaction owner added. Valid names/groups, geometry/modifiers,
scene/history and GLB/native NOM payload construction remain unchanged.

## Behavior coverage and test reconciliation

Nine new real export→parseEditableOBJ fixtures plus one loader-identity check cover Base/SubD and Mirror/plain
multi-object geometry, winding/quad topology, evaluated groups, vertex offsets,
source retention, named objects, group reset/repetition, empty objects and name
normalization. Independent record scanner validates indices/group state without
reusing export/import internals. Expected modifier geometry uses existing resolver;
these tests validate interchange, not independently prove modifier algorithms.

The obsolete .444 expected o name immediately followed by synthetic g object-name.
Accepted .449 preserves true facegroups; now assert object record and no synthetic
name group. Existing health/mirror/preflight assertions retained; loader check uses
reviewed contract after repinning. One old failure resolves, no tests skipped.

## Cache and validation

Changed runtime core plus four loading parents (imports only): scene wrapper,
Export As panel and native NOM core now reference core .741; integrity guard
now loads the same wrapper .741 URL as shell, removing duplicate/stale instances; panel references NOM
parent .741; shell references changed wrapper/panel .741 and recovery URLs .741.
Internal informational versions remain .450/.736, not blanket shell equalization.
Reviewed fixture updates only those reference URLs and five changed-source hashes.
Frozenbeta2–6, protected Multi/Loop, CSS and all other runtime sources unchanged.

Node24 full **1679 total /1577 PASS /102 FAIL /0 skips**. Ten new cases pass;
exactly one old failure identity resolves; no new failures versus .740.
Focused export/release/GLB/NOM/modifier set **39 total /38 PASS /1 historical FAIL**:
.459 viewport string demands Mirror without SubD, superseded by .460; remains
active and in full inventory. Do not claim an all-green focused/full suite.
17 initial focused OBJ/release checks pass. Final narrowed export/release suite
38PASS; unrelated .459 viewport suite stays active in full run. Changed source/test syntax and
whitespace pass; protected/frozen diffs clean. Inventory reliability-build-741.json.
Node22CI and Pages verification pending; CI stays red and Pages not yet gated.

Next: remaining Face/selection/source-contract semantic coverage, then diverse
Bevel/Knife→Loop geometry/history fixtures and trustworthy CI gate. NOM import
remains deferred. Do not interpret102 active checks as102 confirmed app bugs.

Manual: export two named objects, one grouped and one ungrouped, reimport OBJ and
check separation/groups; repeat SubD; normal GLB/NOM handoff remains available.
No .741 device acceptance inferred.
