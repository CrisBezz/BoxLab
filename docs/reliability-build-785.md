# Build .785 reliability evidence

## .785 — Main selection navigation and tap completion validation — 2026-10-10

User .784 PASS recorded/protected. Parent main `973d8fc44fbad313359338553c7e37e58a9fb3c8`.
Audit main762 background movement/hold/confirmed tap owners and componentTapIntent
against historical navigation/unified-toggle assertions. Three failures demand
retired source spelling or old endDrag tapHit dispatch. Replace exactly those three
with actual current owner behavior; keep other source/pin checks and all original
.720 native-owner test bodies. No implementation changes or skipped checks.

Extract original .720 native background fixture into shared helper; actual main
window movement listener replaces previously manufactured movement code. Vertex,
Edge and Face retain selection on navigation, moving away/back, diagonal/exact8px
threshold, cancellation, second contact and movement only at release. Confirmed
short blank tap clears once, disarms Lasso and duplicate native/semantic release
is inert. Existing .724 hold-invert, exclusions and session lifecycle tests retained.
Execute actual main component tap-intent release/cancel, toggleSelection and endDrag
listeners with seeded press intent, real EditableMesh/History and controlled selection/
render dependencies. Each component mode toggles only intended selected ID, ignores
wrong pointer until matching release and protects cancel/long/moved/cancelled intent.
Release retires drag/intent, restores controls, tap releases capture, geometry/history/
redo unchanged and duplicate completion inert. Not full down/move/hold arbitration,
whole renderer or Safari propagation proof; original down-source assertion retained.
Three in-memory mutations rejected: lost navigation flag, absent toggle, premature
blank completion. Runtime source never written; no parallel pointer/modelling owner.

110focusedPASS including background/Lasso/session, Pencil/floating Edge and release
contracts. Full Node24:2077tests/2045PASS/32FAIL/0skip; exactly three reviewed .784
failures removed, no new identities. Remaining31source-pattern/1version-pin stay
active; no exclusions/skips/CI gate. Runtime/frozenBeta2–6 unchanged. Shell/recovery785
and only two reviewed recovery URLs refreshed; all source hashes retained. Protected
main762/Face+Through779/Inset753/Debug736/Multi1.0/Loop715 retained.
Publication/Node22/live verified below; .785 hands-on sanity pending.
Next: remaining32 checks and scoped Bevel/Knife/Loop reliability. Add Vertex picking,
NOM import and Lasso tightening deferred.
Manual: confirm785; selected Face/Edge/Vertex tap removes just that selection;
background orbit/pan/pinch preserve selection; short blank tap clears; model then
Undo/Redo. No synthetic timing fixture recreation requested.


### .785 publication verification — 2026-10-10

Release commit `4437ecb4ab9e8223260b912163ee1310a2761732`, tree
`e5aadf925fe9b39f57d9a00f32899a24b11f8f23` exactly matches tested checkout.
Actual Node22 Topology run38018332508/job114113537665:2077tests/2045PASS/32FAIL/
0skip; all32failure identities exactly match docs/reliability-build-785.json.
Pages run38018332469 succeeded. Fresh live index.html/version.json byte-match785;
unchanged main762/Face779 and frozenBeta6 version also match live repository bytes.
110focusedPASS; source/frozenBeta unchanged. .784 user PASS protected; .785 device
sanity pending. Shell markers/recovery785 coherent, original modelling pins retained.
