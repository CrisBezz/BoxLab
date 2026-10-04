# Beta 6 release-candidate checklist — .730

Status: development candidate, awaiting grouped iPad acceptance. No Beta6 freeze yet.

| Area | Automated evidence | Remaining device check |
| --- | --- | --- |
| UI access/layout | Original Lasso/SELECT identities retained; depth controls hidden; shared layout retains actions/stages | Normal/Focus compact sparse and larger panels |
| Radial sessions | .729 guarded context/drag/exit tests retained | Face/Vertex/Object/Edge Apply/Cancel/Done and puck/gizmo return |
| Navigation/Pencil | Protected owners unchanged; historical navigation/Pencil suite has obsolete pins/VM fixtures | Finger orbit/pan/pinch, Pencil selection, background tap/hold, two-/three-finger Undo/Redo |
| Numeric transforms | Actual floating Move/Rotate/Scale → exact owner and geometry; one History Undo/Redo pass | iPad entry/focus and Multi transforms |
| Object/Boolean/history | Current Multi hit/membership and Boolean checkpoint-owner tests pass | Multi selection, Boolean one Undo, management/modifiers |
| Extract | Actual module loads; partial/all/empty selections, groups, source retention, one scene checkpoint pass | New object selection/transform and scene Undo/Redo |
| Files/Nomad | Actual indexed geometry UV/tangent/colour/morph/Facegroups/import-fit pass; existing file-domain tests reviewed | Export/Save GLB to Files, Nomad import and unchanged reimport |

Validation:53 focused tests pass; all279 source modules pass syntax checks. Full1265 tests/982 pass/283 fail versus fresh .7291259/976/283: identical failure names. Broader release-domain113/97/16 has existing historical pin/source-shape/VM failures; these have not been masked or presented as green.

Fixed actual audit blocker: Extract Faces .683 had a missing function closing brace and could not load. .730 restores it without changing geometry/history ownership.

Cloud-browser WebGL is disabled, preventing rendered 3D/Pencil smoke testing. Unit/runtime checks do not substitute for actual iPad and Nomad acceptance. Save means the existing Export/Save-to-Files workflow; no new native scene persistence is claimed.

Release gate: resolve device failures, review pending checks and historical test debt, verify Pages/current pins, then freeze Beta6 and publish release notes. Protect main .724 background hold/tap, Multi transform1.0, trusted Loop insertion/slide, Studio, selection retention and frozen betas. Defer slight Lasso tightening until final polish.


.731 follow-up: Sweep popup, persistent Edge Slide and Edge/Vertex Bevel copy preview
covered by86 focused passing checks and all279 module syntax checks. Full1274/994/280
(no new failures vs .730). Device acceptance remains pending; test these plus remaining
.730 release checks before freezing Beta6.
