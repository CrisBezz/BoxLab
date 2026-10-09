# Build .767 reliability evidence

## .767 — Vertex Bevel live-drag ownership — 2026-10-09

User .766 PASS recorded. Parent main5baf026679ee1e89861a7584dad5a708366d51fc. Existing direct Vertex Bevel could overwrite newer same-instance edits on move/cancel/disarm and commit stale history after object/mesh/mode/lock changes. It also relied on automatic capture release on normal terminals. Reused existing unchanged comparator with explicit snapshots for drags; added loose Set-value comparison in drag-only ownership guard. Track last owned preview values after each move, capture activeId at down, refuse locked/non-Vertex starts, validate before move/end, and use existing disarm for invalid context. Roll back only the last unchanged owned preview; preserve newer edits/selection/history/redo. Explicit release on valid commit/cancel/no-op. Popup comparator semantics, blue preview, kernel, picker/width math and event owners unchanged. No duplicate implementation.

28 new whole-controller/real-kernel checks pass. Initial25-case baseline2PASS/23FAIL includes stale-source/context and normal capture cleanup; added locked/non-Vertex start and no-movement release cases. Newer coordinates/topology/groups/creases/loose values survive; exact equal arrays accepted; normal repeated drag/commit/cancel/disarm restores exact history; replacement mesh untouched and old owned preview rolled back. Focused156PASS includes .753 provenance/blue Apply/Cancel, Edge Bevel, Bevel/Knife/Loop combinations and .766 accepted Edge paint/scaffold. FullNode24:2007tests/1909PASS/98FAIL/0skip; exact .766 failure identities. No skips/exclusions or CI release gate. Syntax/whitespace pass.

Shell/recovery767 and direct-Vertex-Bevel767 hash/pin reviewed (single index loader). Vertex topology/bootstrap/Inset/Face direct753 unchanged; Gate766/Bevel764/Knife763/main762/scaffold761/Extrude759/Loop715/Multi1.0/frozenBeta2–6 unchanged. Device .767 acceptance pending. Next varied Bevel/Knife/Loop reliability and98 historical checks; Add Vertex unconfirmed picking/NOM import/Lasso tightening deferred.

Publication verification pending.
