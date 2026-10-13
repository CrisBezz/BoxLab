# BoxLab AI Handoff — .839 authoritative live-mesh identity repair

## Current state — 2026-10-13
CrisBezz/BoxLab main, live https://crisbezz.github.io/BoxLab/, release0.36.18.839.
Repository is source of truth. Read AI_WORKFLOW completely, this handoff, TEST_CHECKLIST,
recent DEV_HISTORY and ROADMAP before code. .839 device acceptance pending.
FrozenBeta7 .807 / Beta2–6 immutable. Protected Multi1.0/Loop715/Extrude802/Boolean806,
all accepted Pencil/navigation/selection behaviours unchanged. .830/.831 user PASS protected.

## .839 actual shared-source drift cause and repair
User .838 screenshot SOURCE WRITE stack: live-mesh-bridge dispatchEvent→quad-clean
update→manager.objects getter→saveActive component branch. Source repeatedly moves by
negative instance placement. .835 trace copy/source jumped ~-18.148; latest Z drift
step1.6875733, matching instance matrix translation. Prior .833/.836/.837 drag repairs
FAILED device retest; their synthetic tests covered possible paths, not the root cause.

Live-mesh-bridge169 setter ignored main's explicit state.mesh writes once it had a
rendered owner. Its heuristic promoted the last mesh calling edges() when a cage edge
was added. Inverse instance placement calls edges() on TEMPORARY LOCAL meshes; that
helper was promoted to live world mesh. Bridge-state observers call saveActive again,
subtract placement again, update shared source and peers: repeated offset feedback.

Fix existing accessor only: explicit mesh published by main outranks pending helper
edge owner. Getter immediately returns explicit core owner. Body/cage adds publish one
identity-change event for that owner; repeated helper queries cannot switch it. Legacy
cage inference remains until first explicit publication. Do not remove main's lexical
mesh publication or reintroduce last-edges-wins after core publication.

Four native mesh/THREE Group tests: two fail on actual old bridge before fix; world vs
inverse-local identity, twenty repeated offsets/cage events, next published mesh/one
notification, legacy diagnostics safety; real saveActive/peer-sync/bridge observers preserve
original/source and then genuine component edit still shares. Full Node242237PASS/0FAIL/
0skip; revised component-sharing focused checks pass. Real Safari/WebGL retest still needed.
Runtime bridge839, dynamic face-workflow parent839 and drawer839 repinned. Shell/recovery
and reviewed asset fixture current; all other runtime source bytes unchanged. Diagnostics
remain available. No topology kernel, instance maths or Multi1.0 edit.

## Project files and prior work
Existing object-management snapshot/File Save/Open, multi-object manager/source pool and
boxlab-project-codec v1 are authoritative. Basic projects preserve editable mesh topology,
creases/facegroups/loose data, groups/settings/recipes, mixed locked reference guides and
validated linked placements. .831 references user PASS. .832 linked projects still need
complete manual acceptance following drift repair. Linked source-N pool reconstructs via
existing inverse-placement owners; peers must agree, allocators/rollback guarded.
Rich GLB/UV/material/texture resource pools still refuse. Open starts inside BoxLab Files
picker, asks before replacement, clears old Undo; Cancel/refusal unchanged. Native Files
association and full cross-session history are not implemented.
.830 new Balloon grid recipes balloonGridVersion2 compact unused poles; legacy recipes
preserve exact indices/editability. .820/.821/.824/.825/.826/.828 passes protected.

## Next
First .839 Linked Duplicate→straight/diagonal move→Face/Edge/Vertex, then Array→move
instance→Face: original/copies keep position; genuine component edits still share. Check
Undo/Redo, Make Unique, linked project Save/Open and navigation. No feature expansion until
this concrete drift case passes. Then rich resources/performance, NOM/Curve cutters/UV.

## Release protocol
/nextbuild = audit, one narrow main build, coherent shell/title/data/version.json/recovery,
review child+parent cache pins/hashes, tests, update all handoff/history/checklist/roadmap,
publish and readback. Publishing already authorized. User PASS/FAIL becomes repo contract.

## .839 publication verified
Release73d80488d9db90cca117f15fc0281ea74a4076da; tree412ef04a5181dc7d7723efaf362f61d3d7d09b0c.
Node22 CI38325878624/job115064302371 SUCCESS2237PASS/0FAIL/0skip.
Pages38325878737 SUCCESS; pinned live shell/manifest/bridge/both parent loaders byte-match.
Device Linked Duplicate/Array move→Face gate pending.
