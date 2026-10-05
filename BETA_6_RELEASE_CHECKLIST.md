# Beta 6 release-candidate checklist — .735

Status: .731, .732 and .734 explicitly user PASS. Shared axis colours and native Nomad export .735
published for testing. Beta 6 is not frozen/released yet. No further feature work
planned; only reproducible release-blocking fixes before freeze.

| Gate | Status / evidence | Remaining action |
| --- | --- | --- |
| Popup/radial sessions, background exits, Array, Inset Repeat, Object Browser | .732 user PASS; 133 focused checks passed | Accepted; retain regression coverage |
| Default Focus / armed icon | .733 shell launches Focus; actual toggle sync checks pass | iPad fresh launch, show/hide left list, browser in both views |
| Component-gizmo Align / XYZ colours | .734 user PASS; .735 shared-colour coverage passes | Check subtle colour and active-state clarity |
| Final navigation and editing smoke | Existing protected owners retained; relevant runtime checks pass | Short Pencil/finger orbit/pan/pinch, lasso/hold, Undo/Redo, Multi transform, Boolean and Extract |
| Native NOMAD / Files | .735 native checksum/container/mesh/UI/save tests pass; .730 GLB channel checks retained | Base and SubD .nom into Files and Nomad; check shape/scale/names/groups; regular GLB still works. NOM import into BoxLab is not added |
| Automated regression / known debt | .735 51 focused PASS; full1301/1024/277, identical failure names to .734 | Historical full-suite source/pin/VM failures stay explicitly documented; not all-green CI |
| Freeze, notes and publication | BETA6_RELEASE_NOTES.md draft prepared; publishing authorized | Snapshot accepted source commit into /beta-6/, audit isolated paths, finalize notes, publish and verify frozen/live links |

Cloud WebGL cannot prove iPad/Pencil behavior; no missing device outcome inferred.
Save remains existing Export/Save-to-Files, not a newly claimed native scene format.

Freeze must copy the accepted source and supporting assets using the existing beta
convention. Inspect import maps, dynamically loaded module pins, bootstrap/version
URLs, manifest/service-worker paths and relative links; frozen launch must stay
inside /beta-6/ and must not recover into live main. Record source commit and release
acceptance. Verify both live and frozen manifests/shell/pins after Pages success.
Prior Beta 3/4/5 remain immutable. Lasso tightening stays deferred to later polish.

Native NOM export uses the validated MeshUtilz donor schema/material/scene settings.
Polygon geometry/names/groups are covered; rich UV/paint/material/morph/crease
metadata round-trip stays a GLB workflow. Check actual Nomad compatibility/framing
and include binary template + relative URL isolation in the eventual beta freeze.
