## .1022 — top-right floor/grid/off toggle; .1021 PASS — 30 October 2026

User explicitly PASSes1021; protect Pivot icon blue bottom-left/green up/red
bottom-right and yellow centre ring. No broader1019 device acceptance inferred.
Baseline main d655f56e / runtime d8ae5d4c. User requests top-right three-state
floor icon: light-grey filled plane -> gridded plane -> unfilled outline -> plane.

Original shell adds ONE40px button before VIEW with24px plane artwork from startup;
original toolbar order/hydration keeps this same node. Existing ground-polish owner
holds a session-only plane/grid/off choice (fresh load starts plane), binds one native
click handler and synchronizes artwork/accessible current+next-state labels. No new
raw pointer owner, renderer, ground mesh, duplicate controls or history entry.
Original grid and Studio floor are mutually exclusive; off hides both and Studio's
separate contact-shadow decal. Original studio-polish refresh respects this choice;
render-modes uses the same state when initializing/synchronizing its floor directly,
without adding a per-body scene traversal. Existing floor placement/shadows/lights,
grid opacity and axes unchanged. Floor remains original Studio-only surface; other
looks retain their prior no-plane behavior. Grid is available across looks. Choice
survives look switches/bridge updates within session. Existing Clean View still hides
grid/axes temporarily and restores chosen grid on exit; it does not change preference.

54 focused checks PASS/0FAIL/0skip; four new actual ground-owner/button/Studio-polish/
render-sync tests cover cycle/icons, early input/late bridge, one listener, invalid
state refusal, no extra scene objects/model transforms, Clean/View restoration and
contact decal not reappearing after pointer-driven polish. Existing toolbar shell
count/order fixture expanded ONLY for requested new button; legacy fallback and all
original action/hydration assertions retained. Existing render/Studio/compact/Objects/
snap/release/cache/identity/comparison checks pass. JS syntax/whitespace clean.
No full-suite, rendered-browser or native iPad PASS claimed.1021 user PASS protected.
Reviewed1022 shell/recovery/comparison,toolbar->topbar,ground+studio-polish->face-layout
->drawer and render-mode pins/hashes. Icon/corner/TotalGizmo1021,local-pivot1019,
transform owners,protected Multi1.0,frozen betas/navigation/Paint/UV unchanged.

Published runtime4c10c95fec6c71eaf0c5c4d77cbf94082962553e; tested/uploaded tree
00f84fc40b976aa8e16be1ccb959c9d0f706bba9 equals fetched origin/main exactly.
All18 blobs hash-verified before non-forced expected-main update. Pages40995326471
SUCCESS;16/16 fresh live files byte-match tested source: shell/manifest,new ground/
Studio/toolbar owners,parent/cache graph and unchanged accepted Pivot icon,Total
Gizmo,local-pivot and protected Multi1.0. Hosted40995327653 in_progress at proof;
no full-suite/native iPad PASS claimed. Build1022 LIVE / READY for testing.
DEVICE1022 in Studio: inspect filled grey plane icon before
VIEW; tap to grid (plane/contact shadow disappear), tap to off (grid disappears),
tap to plane (original floor/shadow return). Orbit after each; check repeated cycle,
Studio->Solid->Studio retains choice, Clean View hides/restores selected grid.
Next: native1022 feedback; NOM texture/PBR retention remains separately queued.

