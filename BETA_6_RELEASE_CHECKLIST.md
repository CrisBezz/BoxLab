# Beta 6 release-candidate checklist — .734

Status: .731 and .732 explicitly user PASS. Default-Focus .733 and component-gizmo Align correction .734
published for testing. Beta 6 is not frozen/released yet. No further feature work
planned; only reproducible release-blocking fixes before freeze.

| Gate | Status / evidence | Remaining action |
| --- | --- | --- |
| Popup/radial sessions, background exits, Array, Inset Repeat, Object Browser | .732 user PASS; 133 focused checks passed | Accepted; retain regression coverage |
| Default Focus / armed icon | .733 shell launches Focus; actual toggle sync checks pass | iPad fresh launch, show/hide left list, browser in both views |
| Component-gizmo Align | .734 106 focused pass; original geometry/history owners | Vertex/Edge/Face icon → axis → fixed anchor, hide/return gizmo, Cancel/background and Undo/Redo |
| Final navigation and editing smoke | Existing protected owners retained; relevant runtime checks pass | Short Pencil/finger orbit/pan/pinch, lasso/hold, Undo/Redo, Multi transform, Boolean and Extract |
| Export / Files / Nomad | .730 actual GLB attributes/import tests passed | Save GLB to Files, import in Nomad, reimport in BoxLab; confirm geometry, scale, colour/groups |
| Automated regression / known debt | .734 106 focused PASS; full1292/1015/277, identical failure names to .733 | Historical full-suite source/pin/VM failures stay explicitly documented; not all-green CI |
| Freeze, notes and publication | BETA6_RELEASE_NOTES.md draft prepared; publishing authorized | Snapshot accepted source commit into /beta-6/, audit isolated paths, finalize notes, publish and verify frozen/live links |

Cloud WebGL cannot prove iPad/Pencil behavior; no missing device outcome inferred.
Save remains existing Export/Save-to-Files, not a newly claimed native scene format.

Freeze must copy the accepted source and supporting assets using the existing beta
convention. Inspect import maps, dynamically loaded module pins, bootstrap/version
URLs, manifest/service-worker paths and relative links; frozen launch must stay
inside /beta-6/ and must not recover into live main. Record source commit and release
acceptance. Verify both live and frozen manifests/shell/pins after Pages success.
Prior Beta 3/4/5 remain immutable. Lasso tightening stays deferred to later polish.
