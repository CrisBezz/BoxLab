# Native shell comparison — build .1008

Source: user-pasted complete Copy results, captured 28 October 2026 at11:41Z
(21:41 Australia/Brisbane). This report preserves a faithful summary and exact run
identifiers, not a fabricated raw JSON export. Repository baseline06cf7ed7.

| .1008 profile | Complete PASS | Complete FAIL | Partial | Unrated |
|---|---:|---:|---:|---:|
| A/current |4|2|0|1|
| B/separated |5|0|1|1|

Complete means all5 checklist steps rated. Older1006 loads are excluded.

A all-five FAIL:1793186083482-81pnfdk,1793186324728-v08hprv.
A all-five PASS:1793186437300-iv6uc7v,1793186645050-jivxcey,
1793186807090-bzx21xm,1793186994501-22xlre3.
A unrated:1793186965801-u79ztkg.
B all-five PASS:1793187232641-n30cprm,1793187330680-q5q875j,
1793187411502-7wyy7rd,1793187466923-opia4hf,1793187555180-r16xcs7.
B partial:1793187099103-f1fde5a (startup/view/gizmo/UV PASS; Paint unrated).
B unrated:1793187222121-qa8k4qt.

All complete passes include UV return and Paint exit. Accept these observed
workflows for their specific runs; no separate claim that every docking/Hide
mechanism was manually exercised. Retain Fill1004 protected PASS.

All1008 observations:1366x886 viewport,DPR2,1366x826 canvas CSS/backing,
requested1,savedStartup1. A parent viewportWrap; B parent
boxlabComparisonCanvasSurface. Thus saved1x can fail and B structure really ran.
Startup-failure snapshots have healthy visible status DOM/text and viewport bounds;
this cannot prove visible pixels. Closed VIEW/hidden gizmo at startup are expected.
No per-step full failure snapshot exists for the later VIEW/gizmo ratings.
Several passing VIEW ratings were recorded after returning to Studio; preserve
user visual ratings without claiming the snapshot itself proves Facegroup contents.

Metadata caveat: checklistRelease1008 is baked in executed comparison code.
shellRelease450 comes from mutable appVersion.dataset.releaseVersion. Current
src/scene-obj-export-238.js defines VERSION450 and overwrites that dataset and
label/title. Main index is1008 and pins exporter921 unchanged. Existing release
owner protects text/title but not dataset; it can itself capture450 depending on
module execution order. This is an application metadata bug, not stale-shell proof
and not a demonstrated cause of native regional pixel loss. Repair in next narrow
numbered build with actual exporter-writer regression, original OBJ behavior intact.

B passes justify extended validation, not a causal or permanent-fix claim: A already
passed4 consecutive runs before B. Keep beta blocker open; next interleave A/B,
keep resolution/orientation stable, then expand B input/UV/Paint/history/project
parity before default adoption. Keep testing within app; no need to repeat this
entire consecutive batch now. No runtime changes/new build in this evidence commit.
