# BoxLab .762 — Edge vertical selection release

.761 explicitly user PASS on2026-10-08. Existing scaffold outlines/Close Face accepted.
Next scoped reliability audit found actual finishEdgeHold replays horizontal
candidate whenever candidates exist, even after vertical Grow/Shrink owns preview.
Grow result, Shrink-to-empty and return-to-neutral all replaced on release.
Old main reproduces all three failures (extended12checks:9PASS/3FAIL).

Original completion owner now preserves current selection on vertical release and
resets stale horizontal contribution cycle. Sideways candidate/base commit and
pointercancel restore remain unchanged. Four lines added to main; no new gesture
owner or altered threshold, topology, navigation, selection command or history.
Tests extend original .761 actual timer/movement/window completion harness with
Grow release on both wire and surfaced cubes, empty Shrink release/cancel, neutral
release, browser retirement and no history. Original Fill/Undo/Redo and horizontal
browser cases retained. Harness adapts pointerdown after real rendered pick; not
entire WebGL main.12PASS, focused81PASS. FullNode24:1935/1833PASS/102FAIL/0skip;
all102failure identities exactly match .761. Syntax/whitespace pass.
Main/recovery/shell pins762; unchanged scaffold helper761, Gate/Lasso/Drawer760,
Extrude759, Loop715/Multi1.0/frozen betas preserved. No blanket skips or CI gate.
Publication/live verification pending; device .762 acceptance pending.
Next Bevel/Knife/Loop reliability and historical test reconciliation.

Device checks:
- Hold an edge, drag UP to Grow, release: final selection keeps the preview.
- Drag DOWN to Shrink; release preserves it, including empty. Returning to the
  hold start before release keeps the starting selection.
- Sideways scaffold outline browsing -> Close Face -> Undo/Redo remains accepted.


### .762 publication verification — 2026-10-08

Runtimec3bf95c4173341917fe203527178bd9cd24c2a79 published. Actual Node22 Topology run37771704243/job113292612101:1935tests/1833PASS/102FAIL/0skip; all102failure identities exactly match local inventory and .761. Pages37771703594 succeeded. Live shell/version/main and unchanged scaffold helper/Pencil gate/accepted Edge Extrude/frozenBeta6 version byte-match tested checkout. Focused81PASS. Device .762 acceptance pending.
