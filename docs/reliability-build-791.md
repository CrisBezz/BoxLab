# Build .791 reliability evidence

## .791 — Face layout ownership and late Join ordering — 2026-10-10

User .790 PASS recorded/protected: Edge Bevel settings, Apply/Cancel and history;
prior Sweep789/Revolve788/picking786 accepted. Parent main
`c851cf8182f2ca57f2542ef76170a17f62f14bd2`.
Audit .503–.506 failures against shared Face layout and Join placement owners.
Current layout is six compact rows, with Value/readout/Repeat under Extrude row
and Inspect/Repair/Topology Gate at true drawer bottom. Historical three-row IDs,
old diagnostics insertion and Join's former loader are retired. Join actually loads
through drawer-ui, not face-workflow-layout; retain reviewed actual loading coverage.

Ordered DOM adapter extracted from .790 Edge fixture and reused, retaining Edge
behavior checks. Execute actual Face layout functions/startup/event callbacks and
original Join placement function; late contextual/diagnostic/Join nodes arrive after
initial layout. Reproduced real defect before repair: late Join appends behind Bridge
and Sweep and parent-only synchronization leaves wrong order. Existing shared owner
now restores only this row's declared Join/Bridge/Sweep order when needed. Original
nodes/listeners remain intact; no new UI, modelling kernel or Join geometry changes.

Seven retired historical checks replaced with current owner behavior: six rows/
contents/widths, Extrude anchor despite earlier action row, immediate contextual
order, true diagnostic bottom after extra late nodes, repeated Join relocation/
listener preservation and original node identity. Four in-memory mutations reject
missing row ordering, Repeat placement, bottom diagnostics and wrong Join row.
Controlled DOM/function slices, not full browser/CSS/Safari or actual Join geometry.
Other historical CSS/pin/source checks retained. Two formerly passing .406/.418
hard732 loader assertions updated to reviewed reference/order after legitimate UI
cache hop; Array/runtime behavior assertions retained.

124focusedPASS including Edge precision, accepted Face Bevel/picking, supplied
negative Extrude, Bevel chains, Knife/Loop and Sweep Cancel/history. FullNode24:
2100tests/2081PASS/19FAIL/0skip; exactly seven reviewed failures removed from790,
no new identities. Remaining18source-pattern/1version-pin checks active; no skips,
exclusions or CI gate. Runtime change only six lines in shared Face layout;
main/Face/Vertex786, Sweep789/Revolve788/Through779/Multi1.0/Loop715/frozenBeta2–6
unchanged. Shared UI direct shell pin732→791/hash reviewed; Edge internal layout
stamp515 unchanged. Shell/recovery791 and two reviewed recovery URLs refreshed.
Publication/Node22/live verified below. Next: audit remaining19 historical
checks, then scoped Bevel/Knife/Loop reliability. Manual: confirm791; Face Extrude/
Inset settings and Done; ordinary selection/modelling/Undo/Redo. Optionally disable
Focus and check Join/Bridge/Sweep order in Face drawer after reload/mode switch.


### .791 publication verification — 2026-10-10

Release commit `f1d134e077726ae88da6a9e6a19644894d8853e8`, tree
`89ba5c3685e6e5cf9a71804e5e961df67d68a559` exactly matches tested checkout.
Actual Node22 Topology run38032058820/job114154883205:2100tests/2081PASS/19FAIL/
0skip; all19failure identities exactly match docs/reliability-build-791.json.
Pages run38032058768 succeeded. Fresh live index/version/shared UI791 byte-match
repository; accepted main/Face/Vertex786, Sweep789/Revolve788, Through779, protected
Multi1.0 and frozenBeta6 version byte-match unchanged repository bytes.124focused
PASS. .790 user PASS protected; .791 Face UI/history sanity pending. Shared UI
cache pin/hash and shell/recovery791 reviewed; no kernel or frozenBeta changes.
