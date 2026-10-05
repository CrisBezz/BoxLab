# BoxLab AI Handoff — current development state

## 2026-10-05 — .736: restore MeshUtilz browser-download → Open In workflow

Current release **v0.36.18.736**, parent main
`2ad78c345c939027a520227d7936e3ea914a9b96`. User explicitly **PASS .735**;
requests the MeshUtilz browser download/preview/Open In workflow for native NOM.

Cause: .735 NOMAD called generic saveBlob, which prefers save picker then Web Share.
Validated MeshUtilz main.js/v110 instead initiates an anchor browser download with
.nom filename and application/x-nomad-sculpt Blob. This is a delivery difference,
not evidence that the already-passed native NOM bytes have the wrong format.

- NOMAD now directly uses that existing browser-download helper, with identical
  filename/MIME/native bytes. No file picker or Web Share call on NOMAD path.
- Optional revokeAfter argument keeps NOM Blob URL alive60s for iOS preview;
  other OBJ/GLB downloads retain original1200ms behavior. No new popup or tab.
- Status guides user to open browser download, then Open In / Share → Nomad.
  Website cannot force a particular iOS app target or register Nomad's file UTI;
  browser/OS determine the download preview and available applications. Device
  testing is required; do not claim successful app switching from automated checks.
- Export core/template, .735 XYZ colours, regular GLB/OBJ save/share paths,
  geometry/names/groups/history and protected interaction/frozen betas unchanged.

Validation:14 focused native-format/UI/download/save/GLB/axis checks PASS;
actual anchor href/download/click/removal,60s URL retention/revoke, and NOM path
exclusion of picker/share verified. Full1302/1025 PASS/277 FAIL, identical failure
names to .735. Modified source syntax and diff whitespace PASS. iPad behavior
pending. Shell/recovery/export owner pins .736; native core/template remain .735.

Next: iPad NOMAD tap starts normal browser download; open downloaded .nom preview
and use Open In/Share to Nomad. Check name/geometry, compare normal GLB save and
cancel behavior. Record device outcome before Beta6 freeze; .735 is accepted,
.736 handoff delivery refinement is pending. No new native-format work planned.

## 2026-10-05 — .735: shared XYZ colours and native NOMAD export

Previous candidate **v0.36.18.735**, parent main
`b4ebe514ff1de556400ea64cc7c01d3029ac6f48`. User explicitly **PASS .734** and
requests subtle axis colour reminders throughout the app plus MeshUtilz native
Nomad export, replacing Save GLB to Files and its explanation with NOMAD.

- Shared axis-colours.css uses the original Move palette (X red/Y green/Z blue),
  with lightly tinted idle buttons and stronger active feedback. Covers semantic
  axis buttons for Align, Move constraints, Array, Revolve and Symmetry. No text
  guessing, gesture listeners, state changes, SVG-handle or free/plane changes.
- NOMAD button replaces the secondary File export action, independent of OBJ/GLB
  format selection; explanatory note is cleared/hidden. Geometry selector Base/SubD
  applies. Existing regular OBJ/GLB export and data-preservation owners remain.
- Audited CrisBezz/MeshUtilz-Sweep-Lab. Main only has lab docs; actual native writer
  and binary template are on balloon-v0.6 at
  `18e72a6bf964974591038345d68c2196a18f6af2`. Read nomadBalloonExport.js,
  nomadBalloonExport095.js/097.js and V1.1-STABLE.md. Reuse validated header/layout,
  donor field/node conventions and name handling; no runtime source-text patching,
  dependency on the other repo or procedural Tube implementation in BoxLab.
- New nomad-export-core adapts visible editable BoxLab meshes via existing export
  mesh resolver (Base/SubD/Mirror), keeping separate named objects and shared
  vertices/quads/winding. Triangles use the validated repeated fourth index;
  n-gons use projected earcut triangulation with original winding and inherited
  facegroups. Names/groups stored natively. All native binary fields uncompressed;
  header lengths/offsets/alignment and field bounds self-check before saving.
- Original binary donor copied intact to src/templates/nomad-tube.nom, SHA256
  `9cc56cc4fdea095ec5b8eb917e0101b0e9433f5af54dd3e554ac5b76724010d8`.
  Relative import.meta template URL keeps future frozen beta isolated. Template
  fetched/cached on first NOMAD request; failures retry. Uses existing save owner
  with explicit .nom extension, application/x-nomad-sculpt MIME and description;
  supports picker, iPad share-to-Files and download fallback/cancel. No History edit.
- Native export scope: polygon geometry, names, groups, Base/SubD/Mirror. This
  adapter does not promise UV/paint/material/morph/crease metadata round-trip;
  default donor material/scene settings and header thumbnail remain. Existing GLB
  passthrough remains available for those richer channels. NOM import into BoxLab
  is not added or claimed. Actual Nomad first-open/schema compatibility and framing
  still need iPad verification, despite validated MeshUtilz container provenance.

Validation: **51 focused PASS**: native donor checksum/header/offsets/binary bounds,
separate names/quad/shared-index/coordinate/winding/groups, concave n-gons,
Base/Mirror/SubD/source retention, invalid inputs, actual NOMAD UI/cache/filename/
MIME/save picker/cancel/failure guards; shared-axis coverage and existing Align,
GLB attribute/transform/history/Focus/browser checks. Full **1301 / 1024 PASS /
277 FAIL**, identical failure names to .734. All281 source syntax PASS; diff
whitespace PASS. Historical full-suite debt remains documented, not all-green CI.

Changed shell/recovery/export owner/new core/axis style pins .735; .734 Align and
.733 default Focus remain accepted/runtime unchanged. Component geometry/history,
protected Multi1.0/Loop.715 and frozen betas unchanged. Source repo read-only.

Next device checks: axis tint/active clarity in Align/Array/Move; NOMAD Base and
SubD export of named multi-object scene into Files, open in Nomad and inspect names,
shape/scale/groups/quad topology (Frame All if necessary); Cancel and ordinary GLB
regression. After .735 pass and final release smoke, freeze Beta6 per checklist.
No native export success/device PASS or Beta6 freeze inferred yet.

## 2026-10-05 — .734: Vertex/Edge/Face Align on component gizmos

Previous candidate **v0.36.18.734**, parent main
`26c1983d56131098b2ef3786983a04acde3670d9`. User requests Align access on Vertex,
Edge and Face gizmos rather than modelling radials. User subsequently PASS .734. Beta6 freeze remains pending current candidate
and final release-device checks.

Audit: component-align .705 already supports Vertex/Edge/Face fixed-anchor X/Y/Z
alignment in the original selection controls. Only Face had a radial Align sector;
Vertex/Edge access was absent there. Reuse this owner and its kernels/history.

- Bottom-left component-gizmo Align shortcut displays three distinct mode-specific
  point/line/face icons (one appropriate icon per mode). Object mode retains Multi;
  hidden shortcuts do not occupy the visible cluster. No central Move handle change.
- Remove Face Align radial sector; other radial sectors/positions remain unchanged.
  Shared contextual Align panel now supports all three modes and hides the gizmo
  while open. Choose X/Y/Z, then tap a selected component to keep it fixed. Other
  selected vertices move along that axis onto the anchor coordinate; anchor remains
  unchanged. Edge/Face coordinate uses the original anchor vertex average; this
  build does not invent edge orientation matching or vertex collapse/merge.
- Face retains the existing Align to Face arbitrary-plane rigid-group option and
  its shape/topology/rejection guards. Only Face exposes that option.
- Reuse original component-align window-capture anchor picking and one History push,
  selection retention and semantic completion. Existing background exit policy
  closes Vertex/Edge/Face Align; Cancel/mode/mesh/selection loss close safely.
- Shared session captures mode/mesh/active object; same-mesh object switch cancels.
  Launch rejects active drags and disarms idle main/Face direct ownership through
  their actual APIs, preserving selection. Successful apply returns the gizmo.
- Keep original Face Align API alias for existing background/compatibility routing;
  new ComponentAlignViewportSession is the same owner, not a competing implementation.

Validation: **106 focused PASS**, including original Face plane/anchor/kernel tests,
actual Vertex/Edge anchor geometry with real one-step History Undo/Redo, three icon
modes/disabled/busy guards, panel mode controls/identity and semantic background
exit, active-object protection, existing radial/Focus/browser/navigation checks.
Full **1292 / 1015 PASS / 277 FAIL**, identical failure names to .733. All280 source
modules syntax PASS; diff whitespace PASS. Historical full-suite debt remains
explicit. Actual iPad/Pencil icon access and rendering still require device checks.

Changed gizmo/corner/toolbar/Align UI and dynamic parent pins .734; shared layout
.732, Focus owner .733, component-align/core .705, protected Multi1.0 and Loop.715
unchanged. Frozen betas untouched. No Beta6 release claim.

Next: .734 device checks (component Align/fixed anchor/background/Undo plus launch
Focus), then final iPad editing and Files/Nomad smoke; accepted candidate freeze,
release notes and isolated /beta-6/ publication per BETA_6_RELEASE_CHECKLIST.md.

## 2026-10-05 — .732 PASS; .733 final Focus-default candidate for Beta 6

Previous candidate **v0.36.18.733**; parent main
`24c586cda1cdcc9393be5ac873dd0ea25ca7044a`. User explicitly **PASS .732** and asks
for Beta 6 freeze/release, with Focus enabled on every launch and its icon armed.

- Shell starts with `boxlab-focus-view` before modules run. Existing Focus toggle
  remains the only owner; no persisted preference or new gesture. Launch hides the
  large left list; toolbar/radials and right Object Browser remain available.
- Focus sync sets active class plus aria-pressed, with explicit high-contrast armed
  styling. Action labels say Show left tool list (exit Focus) / Hide left tool list
  (Focus). Original icon SVG is retained and both directions dispatch existing resize.
- Only view-modes runtime changed; shell/recovery markers .733. Unchanged .732
  Array/session/layout and protected Multi/Loop/navigation pins remain intact.
  Historical version-coupled fixtures now check the unchanged owners' actual pins.
- 44 focused Focus/browser/corners/background/Sweep checks PASS. Full1287/1010 PASS/
  277 FAIL, identical failure names to .732; no runtime regression. Modified source
  syntax and diff whitespace PASS. Existing full-suite source/pin/VM test debt remains
  explicit, so overall CI is not advertised as green.

Release state: .731 and .732 user accepted. No new feature work planned. .733 launch
UX is the last candidate change. `BETA6_RELEASE_NOTES.md` prepared as a draft;
`BETA_6_RELEASE_CHECKLIST.md` now records accepted work and exact remaining checks.
Do not claim Beta6 released or create an accepted freeze before device outcomes:
1. .733 launch armed Focus, show/hide left list, browser in both views.
2. Final short Pencil/finger navigation, selection/Lasso/hold, history, Multi and
   Boolean/Extract smoke on the intended release candidate.
3. Export/Save GLB to iPad Files, import into Nomad, reimport to BoxLab; confirm
   expected geometry/scale/colour/groups. This older release gate is not explicitly
   accepted by PASS .732 alone.

After device checks pass: snapshot the accepted candidate into `/beta-6/` using
existing frozen-beta conventions; audit relative/runtime/import/recovery/manifest
paths so frozen app stays isolated from live main; record exact source commit;
finalize release notes and acceptance checklist; publish, verify live and frozen
versions/assets/links, then record immutable Beta6 and resume normal development.
Prior frozen Beta3/4/5 stay unchanged. Publication remains authorized. Further
changes before freeze are reproducible release blockers only; slight Lasso
selection tightening remains deferred.

## 2026-10-05 — v0.36.18.732: popup comfort, background exits, Array, Inset Repeat and right Object Browser

User explicitly **PASS .731**. Current release **v0.36.18.732**, parent main
`34ad8dbfd65a5dd7f1a40cfbd7b63b6c354e7a3f`. This is one bundled refinement build;
.732 subsequently user PASS; historical entry retained. No Beta6 freeze yet.

- Shared content-sized popups now have 7px vertical / 8px horizontal packing,
  an 8px body/action gap and 6px action-divider clearance. Small panels retain
  variable width. SELECT retains original controls; no Visible/Through restoration.
- Split exits with Done or a stationary background tap, retaining completed edits.
  Background exit audit reuses main's existing window-capture tap/movement owner
  and semantic event. The new policy module adds no raw pointer listener.
  Native/Pencil duplicate releases are marked before closing a tool, so the second
  callback cannot clear the preserved selection. Long-hold invert remains blocked
  while a tool owns the background. Orbit/pan/drag/cancel/secondary contact stay protected.
- Array X/Y/Z immediately project END onto the positive chosen world axis, keeping
  its current vector length. Actual END drags follow that axis. Free retains mixed
  coordinates and exposes XYZ arrow handles; arrow drag changes one coordinate
  without switching Free mode. Preview and source remain separate; Apply continues
  through existing linked-instance/object-history owners. Ghost/arrow hits are
  excluded from background exit.
- Inset's actual direct owner emits the kernel-produced committed model distance
  on release. Precision stores last values per operation as well as the original
  global last operation. Contextual Inset/Extrude Repeat asks the existing owner
  for its matching operation, never borrowing another tool's label/value. Legacy
  Repeat Previous stays available. No new geometry/history kernel.
- Object Browser uses the same icon and original Objects/Modifiers nodes, moved
  from the Object gizmo shortcut to the top bar: Frame All / Undo / Redo / Focus /
  Object Browser / VIEW. Opens on the right below the icons, including Focus view;
  Objects open, Modifiers initially closed. Closing/mode exit restores original
  nodes and disclosure states; tool start closes it. The original busy/mode-switch
  guards remain. This user-requested browser is an exception to centred tool popups.

Background exit policy:

| Tool/session | Stationary background tap |
| --- | --- |
| Loop, Split, Face Inset/Extrude values, Edge Slide/Bevel | Existing session Done/exit owner; completed edits retained |
| Face Bevel / Vertex contextual tools except Add | Existing Cancel/close; uncommitted blue preview discarded |
| Face Align/Repair, Knife, Edge/Face Bridge, Offset, Crease | Existing close/cancel owner; pending preview discarded where applicable |
| Edge Extrude | Existing hub/constraint exit; completed edits retained |
| Object Array, Solidify, Shell, Boolean, Mesh Health | Existing idle Cancel/close owner; active drag protected |
| Vertex Add, Surface Transform/Insert, Sweep, Revolve, Symmetry/Bisect | Background remains available for placement, drawing or mode cycling |
| One-shot modelling/repair commands | No armed session to exit |

Validation: **133 focused tests PASS**. Actual Array owner axis/Free arrow drag,
preview/source separation and Cancel; native/Pencil duplicate exit and virtual
preview hit protection; Inset finish's synchronous value/history event and scoped
Repeat; original Object/Modifier node movement/restoration and disclosure; retained
.731 Sweep/Slide/Bevel/navigation/session checks. Full suite **1285 / 1008 PASS /
277 FAIL**, versus fresh .731 **1274 / 994 / 280**: no new failure names; three
historical Array pin failures resolved. Existing historical source/pin/VM failures
are not presented as green. All **280 source modules syntax PASS**, diff whitespace
check PASS. Cloud WebGL cannot substantiate iPad/Pencil rendering; device checks below.

Protect Multi transform 0.36.1.0, Loop Cut .715, frozen Beta 3/4/5, existing history
and navigation. Main .732 only extends existing background routing; Face Direct's
geometry remains unchanged except committed Inset value metadata. Changed shared
layout clients/imports are .732; Sweep kernel/owner remains .731.

Next: test .732 grouped changes; then resume Beta 6 device release checklist.
No unrelated feature work or inferred release acceptance.

## New-chat starter prompt

Continue current main of CrisBezz/BoxLab. Repository is the source of truth.
Read AI_WORKFLOW.md completely, this file completely, TEST_CHECKLIST.md, recent
relevant DEV_HISTORY.md entries and ROADMAP.md before code changes. Audit current
main/live shell/pins and authoritative owners; reconnect existing functionality.

Previous release: **v0.36.18.731**. Parent .730 `12f00e4fc06b0d1fbb8ce0d8eb897c05d0e76d38`.
Quick pre-finalization build follows user's EDITED prompt: Face/Edge Sweep popup,
persistent Edge Slide until Done/background, Edge/Vertex popup blue preview while
retaining existing in-window direct Bevel. .730 device checks remain underway;
User subsequently PASS .731; no Beta6 release acceptance inferred.

.731 changes:
- Radial Face/Edge Sweep calls existing Sweep selection-capture owner directly;
  launch returns actual success. Original Profile/Path/Finish controls dock at top
  centre for every Sweep launch, including component mode. Existing proxy remains
  available as fallback but is hidden when original dock is visible, avoiding two
  popups. Stages, captured profile, Pencil editing, Apply/Cancel/scene history stay
  with original Sweep owner; no additional Sweep geometry/gesture implementation.
- Edge Slide operation-complete refreshes session selection without closing or
  disarming. Done and semantic background tap close. Main's existing background
  owner routes finger/Pencil release to Slide and blocks hold Invert during Slide;
  normal short-tap/Lasso and .724 long-hold behavior otherwise unchanged. Main
  .731 differs only in these three Slide-active checks; protect this new pin.
- Edge width/segment slider blue preview clones through existing generalBevelSelection
  kernel and shared Face preview renderer. Apply Bevel uses original exact/history
  owner; repeatable Edge owner stays armed. Existing viewport drag bevel still
  edits/previews/commits on release exactly as before. Cancel/background disposes
  slider ghost; context/geometry changes cannot overwrite stale source snapshots.
- Vertex existing contextual popup gains blue Width/exact preview using original
  bevelVertices kernel and same rendering helper. Apply Bevel commits candidate
  once and closes, matching Face explicit-Apply workflow; Cancel preserves source
  and selection. Original Vertex Pencil/in-window direct bevel remains. Vertex
  kernel has Width only; no artificial Segments control or new geometry added.
  Mode/mesh/active-object/lock guards and preview disposal protected.

Validation: **86 focused PASS**, including actual Sweep Face/Edge launch and staged
control docking, Edge/Vertex blue copy/commit/Cancel/UndoRedo, retained direct
Edge gestures, Slide repetition and touch/Pencil background routing, protected Face
preview, Object sessions and shared layout. All279 src modules syntax PASS.
Full1274/994/280 vs fresh .7301265/982/283: no new failure names; three historical
Sweep release-pin fixtures now pass. Nine added tests pass; suite not all-green.
Shared layout remains .730, unrelated client pins stay .730; edited owners and
main/Bevel/Sweep/session/gizmo plus release refresh pins .731. Protected Multi1.0,
Loop commit .715, view .726, corner .718 and frozen betas untouched.

Next: test .731 Sweep Face + closed Edge loop; repeat Slide then Done/background;
Edge/Vertex sliders + Apply/Cancel + existing viewport drag + UndoRedo. Continue
.730 grouped Beta6 device/export/Nomad checks and fix reported blockers before
freezing Beta6. Cloud WebGL remains disabled; no device 3D/Pencil acceptance claim.
Lasso tightening remains deferred MUCH LATER.

## .730 retained release-candidate audit

Previous release: **v0.36.18.730**. Parent .729 `ecd97667`.
User requests removal of Visible/Through UI while RETAINING Lasso and SELECT,
compact content-sized popouts without padding, plus /nextbuild 3 release-candidate
checks. This supersedes the fixed-width wide-popout instruction. .724/.726 PASS
remain protected; no .728/.729 or .730 manual PASS inferred.

.730 changes:
- Original #paintSelectDepth stays in its original selection host, hidden and
  aria-hidden; global scoped ID CSS keeps it hidden even if original owners change
  styles. Visible/Through are absent from viewport and SELECT UI. Original depth
  nodes/state/listeners are retained for paint/Lasso compatibility, not reimplemented.
  Axis/GEO, original lazy Lasso and SELECT remain in the bottom viewport strip.
- Shared tool layout uses width:max-content with viewport/720px MAXIMUM only;
  no forced 720px width. Outer padding removed; compact single body column, intrinsic
  action-rail width and4px spacing; readable22ch body minimum and wrapping notes.
  Complex staged body controls retain their original visibility/listeners. SELECT
  also uses content width and no outer padding. Top-centre/scroll bounds remain.
- Release-candidate browser inspection found a real existing syntax blocker in
  Extract Faces: .683 lacked its closing function brace, preventing module loading.
  Restore the brace only; original compaction/facegroups/scene checkpoint/completion
  remain unchanged. Pin Extract .730 and exercise actual loaded owner, partial/all/
  empty selection, source retention, completion and one scene checkpoint.

Release-candidate validation:
53 focused PASS including actual floating Move/Rotate/Scale exact maths+one Undo/
Redo and actual indexed exporter UV/tangent/colour/morph/groups/import-fit handling,
plus original Object Multi/Boolean history and UI/session checks. All279 src modules
pass node --check after Extract repair. Broader113/97/16 release-domain checks have
only existing historical source/pin/VM failures. Full1265/982/283 vs fresh .729
1259/976/283: identical failure names, six new passing runtime tests. Do not claim an
all-green suite or a frozen Beta6. See BETA_6_RELEASE_CHECKLIST.md for audit limits.
Cloud browser WebGL is disabled; cannot prove 3D/Pencil/device interaction there.
Verify live manifest/visible version and module pins before interpreting a browser
cache or legacy runtime-guard label. No rendering workaround or owner change made.

Shell/manifest/refresh/topbar/toolbar/SELECT/shared layout+all dock clients .730;
main .724, view-modes .726, corner controls .718, protected Multi transform .1.0,
Loop commit .715 remain pinned. Import-only cache hops outside UI/Extract repair.
Next: .730 normal/Focus compact panels, Lasso/SELECT with no Visible/Through, Extract
and quick iPad modelling/navigation/type-in/Boolean/history + Save GLB→Nomad
round-trip. Save currently means existing Export/Save to Files flow, not a new scene
save/autosave feature. Freeze Beta6 only after grouped device checks and issue review.
Slight Lasso selection tightening remains deferred MUCH LATER.

## Protected .724 background hold — user PASS
Previous implementation: user-requested background LONG PRESS Invert, replacing failed
DOUBLE TAP. Single short background tap still clears component selection and turns
Lasso off. Object short-tap contract still retains actual Object selection and
hides gizmo. Stationary background hold500ms complements CURRENT selection once
through original component/Object Invert owners. It leaves Lasso armed; release
and duplicate semantic delivery cannot clear/disarm the result. No tap pairing or
pre-clear seed anymore. Old background-selection-tap module is historical only,
not imported by live main. Do not reintroduce double-tap through it.
Existing main background window owner starts/cancels hold; no additional gesture
owner. Existing8px movement guard, secondary/multitouch, pointercancel, navigation
and blur cancel pending hold. Pen requires actual contact. Mode/active-object/mesh/
selection changes and tool sessions prevent firing. Stationary holds add no
history entries. Tool background Done/blue Bevel ownership remains protected.
24 targeted PASS; full1237/954/283 vs clean .7231233/950/283: same failure names.
Existing actual-owner fixtures updated for deliberately retired double-tap and
changed release prefix, not weakened modelling/session expectations. Main and
shell/manifest/debug/refresh pins .724. Protected transform1.0/Loop/Lasso/Edge Paint/
Pencil/Multi/frozen beta files untouched. Diagnostics keep amber physical contacts
and blue BACKGROUND HOLD INVERT/CANCEL or TAP COMPLETE evidence.
User PASS .724: finger/Pencil shorttap clears/disarms Lasso; hold500ms inverts once
and release retains result; hold while Lasso armed retains it; orbit/pan/pinch and
Undo/Redo remain intact. Test Face/Edge/Vertex and Object complement. Pending .721
original Modifiers below Objects starts collapsed; original actions still pending.
.720 user PASS: background clear/Lasso off, drawing/finger nav; preserve. Slight
Lasso hit tightening deferred MUCH LATER at final perfection. .723 traces showed
natural movement rejection but did not conclusively capture failed double pair;
user chose hold instead. DOUBLE TAP debug label never proved a matched pair.

## .720 ownership baseline — Lasso checks1/3 passed; Invert check2 failed
Current focus: .720 Edge/Lasso completion and double-background timing refinement;
pending iPad test. Parent .719 release `7d1f8753`. User reports .719 Edge background
clear/Lasso cancellation still FAIL and double-tap timing wrong; .719 is not passed.
Actual Edge Paint owner was allowed to arm before Lasso and consume move events,
leaving Lasso's gesture unfinished. It now defers pending paint to armed Lasso.
No new raw-pointer owners: main's existing background tracker/completion moved to
window capture (non-consuming), with primary/contact/movement/duration/cancel guards.
Main Face Bevel ownership remains excluded, so blue-preview navigation is protected.
Lasso arming clears idle main direct-tool ownership through guarded public UI API;
busy drags stay protected. Stationary Lasso completion retains original semantic.
Native pointerup timestamps propagate through Pencil/Object/Lasso semantics. Main
now deduplicates by pointerId + native release stamp without expiry timers; native
timestamps also drive the 500ms release-to-release Invert interval (32px radius).
Context/mesh/selection guards and original-seed complement remain intact. Main's
BACKGROUND TAP DOWN / BLOCKED / COMPLETE entries are available in Gesture Debug.
Existing active-mesh picker now supplements mode-scoped Object picker for Lasso hits.
38 targeted PASS; full1226/943/283 versus .7191219/936/283: same failure names.
Protected Multi transform1.0, Loop topology/slide/commit, frozen betas unchanged.
Next: visible .720 Edge/Lasso single finger/Pencil background clear/disarm, normal
quick double Invert (500ms window), then Lasso drawing + navigation/Multi/history.
If it fails again, obtain Gesture Debug BACKGROUND TAP entries before more changes.

## Previous .719 refinement — superseded by .720
Find the .719 release commit in current main history. User explicitly grants standing authorization to publish
BoxLab builds (2026-10-04); see AI_WORKFLOW.md. Do not ask again for routine releases.
Current focus: latest Lasso cancellation / double-background Invert refinement,
pending iPad hands-on. Current release parent is .718 `ad11f377`; locate .719
release commit in main history. User reports Lasso remained armed on background
and double-background Invert failed after .718; no .718 PASS inferred.
.719 repairs existing main completion owner: one physical release can arrive through
both early semantic and later canvas paths, so pointer IDs are deduplicated until
next task (not a microtask, which browsers may run between event callbacks).
Stationary background taps disarm Lasso and run existing clear/seeded Invert flow.
Lasso's existing drawing owner exposes isDrawing and forwards its stationary
background completion only after ending the claim/releasing capture. Draws, mesh
hits and pointercancel remain excluded; no new raw-pointer listener or picker.
Protected Object background selection retention, Multi, modelling/Loop kernels,
Face preview and navigation owners unchanged. .719 changes only main/Lasso runtime,
Lasso child + drawer parent/main/release pins, shell/manifest and handoff/tests.
Automated validation and publication details are recorded in latest DEV_HISTORY.
Next: confirm visibly .719; Lasso background finger/Pencil cancellation, single
component clear / double complement of original set in Face/Edge/Vertex/Object,
viewport Multi/Boolean and navigation; retain pending .716/.713 hand checks.

## Previous .718 state / pending checks
Previous .718 combined UI pass and viewport Multi repair remains pending hands-on.
User reports viewport Multi FAIL while Object Browser works after .717. .717 was
not hands-on passed. Object selection listener lost taps to transform consumers.
.718 registers the actual Object activation owner before initialization at window
capture for Multi; normal mode keeps its canvas activation, touch completion is
window capture without propagation suppression so OrbitControls can release.
Nearest scene picker/selection Set remain authoritative. Pen inactive operands
select before transform consumers; transform-upgrade now rejects raw Multi and
true background gestures. Protected multi-object-transform1.0 unchanged.
Existing activation tap tracker uses confirmed background semantic for Object taps,
with movement/multi-contact/cancel/duration guards; no duplicate raw pointer owner.
61 targeted PASS; full1215/932/283, no new failure names versus .7171210/926/284.
Existing historical425 Edge Extrude pin assertion now passes through drawer repin.
Next visible .718: finger/Pencil viewport Multi add/remove/Boolean; top icons/VIEW;
Snap/Lasso; single clear versus double-background Invert; protected navigation/history.
.716 scoped Face preview/compact Boolean included and still pending hands-on.
Release parent .717 078d2bb6; find .718 release commit in main history.
User confirms **.715 PASS**: repeated radial Loop slide/EXACT/cuts and Edge Bevel
repeat drag/exact/background exits protected. Screenshot for new Boolean layout
visibly shows .714; treated as layout reference, no new testing state inferred.
.716 rendering helper compares candidate polygons with original source by coordinate
signature: unchanged polygons/other shells stay normally shaded, only bevel-changed
region gets blue fill/wire. No candidate geometry, kernel, Apply/Cancel/history change.
Object Boolean CSS-only two rows: A/B/Swap then Union/Cut/Intersect, Close right.
Original controls/labels/Swap/operations/Close and lazy operand insertion retained;
small redundant title hidden only in Boolean dock. Other popouts untouched.
51 targeted PASS; full1205/921/284, same failure names versus .7151204/920/284.
Next visible .716: affected-only blue on single/connected Faces, preview sliders,
Apply/Cancel/history; Boolean compact controls/Swap/results/Close; .715 regressions.
User confirms **.714 PASS**: Object List beside Multi, Focus-only list reveal/toggle
and mode/Focus exit cleanup are protected. .713 other Edge combined checks pending.
.715 Loop keeps latest rail after release so Loop Slide takes over; count controls
return after EXACT. EXACT uses existing commit owner (Undo/Redo internal rail cleanup)
and stays armed/open. Another edge adds another cut retaining current placed geometry;
background tap commits latest rail and exits. Original .688/.162 topology/slide math
untouched. Automatic .632 commit remains for non-radial launches; changed wrapper
pin .715. Exact's internal mesh replacement is adopted by the session, while external
Undo/context changes close safely. Split Done unchanged.
.715 radial Edge Bevel persists after committed Pencil drag or EXACT; current live
selection replaces cached IDs. Stationary edge tap selects for exact; completion
clears consumed IDs, leaves owner ready for next edge. One history step per bevel.
Cancelled/incomplete drags roll back and release capture/navigation; background tap
closes/disarms and clears hub suppression. Face preview/Apply/Cancel and non-radial
Edge lifecycle unchanged. No new kernel or raw background-pointer owner: main and
Pencil tap semantic are reused, navigation/multi-touch cancelled taps do not exit.
Shared wide layout recognizes EXACT as right-rail Apply; shared import graph .715.
50 targeted PASS; full1204/920/284, same failure names versus .7141198/914/284.
User .715 PASS protects these sessions; preserve them during .716 visual refinement.

User confirms **.712 AWESOME PASS**: gizmo centre/corner shortcuts, wide top-centre
popouts and additional Object tools are protected. Earlier pending individual repair
checks are not implicitly passed.

.713 audits nineteen existing Edge Active Tools and reconnects all eleven missing
launchers: Loop, Split, Sweep, Uncrease, Fill Face, Grid Fill, Dissolve Loop,
Join Coplanar, Flip Edge, Collapse, Circle. Original buttons/controllers/history
and kernels remain authoritative. Loop/Split get wide top-centre persistent-session
controls/Done; Loop count and slide forward to original controls. Done preserves
completed work, does not mean rollback. Main exposes only busy/finishLoopCut UI
lifecycle APIs; .688 logical-quad/.162 core and .632 commit owner/pins unchanged.
Edge Sweep reuses existing staged viewport proxy and semantic completion with launch
mode retained. One-shots clear suppression, including Face/Vertex result handoffs.

Shared radial direction/tier: Circle outer0°, Join Coplanar outer22.5°, Slide inner45°,
Bevel inner90°, Bridge inner225°, Sweep inner270°, Delete inner315°, Clean Vertices
outer270° and Merge Dist outer315°. Face Bridge moves inward, Shell outward225°,
Quad Cleanup outer180°. Vertex Build Edge moves135°, Slide45°; outer ring expands
230px to avoid inner overlap with shared Clean/Merge positions. Edge Dissolve now
outer270°, Sweep takes former inner slot. All original tools retained, no selection
commands. Object slots/owners and protected multi-object-transform untouched.

46 targeted PASS; full1195/911/284, no new failures by name versus .712.
Next: confirm visibly .713, test all19 Edge tools/settings/result handoffs/history,
protected Loop feel and shared placement; collect refinements before drawer removal.

User confirms **.710 Vertex radial AWESOME / PASS**; all thirteen tools and shared
Face/Edge/Vertex Bevel placement are protected. .708 Face Bevel remains protected.

## .718 viewport controls / minimal-drawer audit

Top Undo/Redo/Frame All/Focus buttons keep original nodes/listeners and use the same
exported icons as gizmo. Focus owner retains icon while updating title/aria-pressed;
VIEW keeps original view menu with tooltip. Topbar imports viewport-toolbar-controls
.718; original Axis/Geometry checkbox LABELS move above untouched bottom mode buttons,
SNAP + RGB axis arrows + dot/line/face GEO icon. Lazy ORIGINAL Lasso button moves
there, no proxy selection implementation; active styling and listeners retained.
Empty old Snap wrapper removed; drawer bounds end above controls. Focus still works.
Lasso actual owner disarms transforms on arming; Multi activation defers to Lasso.
Lasso/Pencil and finger navigation behavior remain existing owner semantics.

Background-selection-tap helper has NO pointer listeners. Receives confirmed taps
from main/Pencil/Object owners, remembers selection before immediate existing single
clear. Second nearby tap within500ms calls original component Invert with seed;
Object Selection owner adds visible-object complement with original seed. Same
mode/active/context/mesh and unchanged post-first selection required. Session tools remain excluded; .719 stationary Lasso background taps disarm it
before passing through the same completion flow; existing session background completion unchanged.
Object single background keeps actual Object selection but dismisses gizmo as .682;
component single tap clears; double inverts original set, not cleared set. No history.

Audit: active modelling inventories Face/Vertex/Object/Edge are covered. Selection
commands remain outside radials. With drawer minimized, remaining dependencies:
- Modifiers: .721 exposes original collapsed Modifiers below Objects via the Object List shortcut, including Mirror axes/Align, SubD on/level and Cage.
- Selection depth: .727 original Visible/Through buttons now live in viewport strip.
- Advanced selection: Connected/Angle/Normal, boundary/loop/ring variants and
  residual selection controls remain in drawer.
- Object selection All/Clear and bulk Hide/Lock still have drawer controls; per-row
  visibility/lock and Add/Duplicate/rename/delete/Groups/Origin/Pivot remain available
  via ORIGINAL Object List reveal. .726 VIEW Object List now also works with empty
  Object selection and from component modes via original Object mode switch.
- File/import/export/reset and VIEW/camera/look/Focus/history stay accessible above.
Do not remove drawer or start minimized by default yet. User asked for audit, not
speculative new radial items/modifier UI. Finish current hands-on refinement first.

## Priority and scope

Finish contextual radial menus/settings so routine modelling needs little drawer
interaction: Face coverage → Vertex → Object → final Edge completeness pass.
Radials contain active modelling/repair tools only; selections remain long press/
gestures. No unrelated gesture expansion, topology strengthening or wholesale UI
cleanup. Keep authoritative drawer fallbacks until replacements pass.
All session popups/numeric entry use shared top-centre viewport placement owner.
User's consistency rule: **Bevel is inner-ring 90 degrees / 3 o'clock in Face,
Edge and Vertex**. Preserve this across future ring refinements.

## Repository / cache state

- Main CrisBezz/BoxLab; live https://crisbezz.github.io/BoxLab/.
- .712 parent .711 3b332f3b; find release commit in main history.
- New UI-only tool-session-wide-layout and gizmo-corner-controls .712.
- Shared tool-session-panel-position .712; every importing viewport session client
  and total-gizmo/tool-session-ui repinned .712. Imports are the only changes to
  protected Face/Edge/Vertex session proxies apart from shared Object host ordering.
- object-radial-session stays .711; Vertex modelling owners/drawer loader .710;
  .708 Face Bevel kernel/direct owner unchanged. multi-object-transform stays .1.0.
- Manifest/title/data-release-version/visible label/main/refresh pins .721;
  release-refresh logic unchanged; main has the scoped .719 completion repair. Loop Cut, modelling kernels, frozen betas untouched.

## .712 wide popouts / gizmo redesign

User explicitly requests coordinated UI changes across modes, superseding the old
centre-to-radial access. Shared top-centre panels now wide (up to720px, viewport
bounded) with two-column settings and a right action rail: Cancel/Done/Close above
Apply, auxiliary Bisect Only retained. Symmetry plane controls use a compact row;
Array direction/count side by side. Small screens wrap settings while keeping rail
on the right. Mesh Health findings remain scrollable. Titles/readouts/options retained.

UI-only layout reuses ORIGINAL nodes/listeners inside the same panel, with unchanged
IDs/delegated ancestry. It runs only after owner bindings/control creation and is
idempotent; no cloned controls, parameter/history/modelling/pointer implementation.
Staged Sweep Apply mirrors original hidden ancestors via a DOM visibility observer.
Lazy Boolean operands/report additions go into the settings body. Hidden layout
roots remain hidden, so Cancel does not reveal stale settings in the drawer.
Object host lays out after insertion, restores originals as before; Face source
hosts remain in drawer for their protected viewport proxies, avoiding duplicate docks.

Gizmo centre is now the existing FREE MOVE handle with larger14px radius and
non-interactive centre dot. Existing free ROTATE screen ring remains nearby. No
centre menu hotspot. Top-left radial icon opens the current-mode rings. Top-right
has separate Focus View toggle + Frame All buttons; bottom-right separate Undo/Redo
arrows; bottom-left Object Multi toggle (only Object). Forty-pixel targets with titles/
accessible labels and visible Focus/Multi pressed state. Actual toolbar button owners
are invoked; Multi uses authoritative object-management button, not a second state.
Unavailable/busy controls disabled. Corner groups clamp to viewport bounds without
moving the selection pivot. No new raw viewport pointer listeners or transform math.
Centre/corner redesign applies across modes while existing session visibility stays.

41 targeted checks PASS: actual Symmetry/Array control markup identities/listeners,
stage Apply visibility, lazy content/hidden roots, six shortcuts/actions/guards,
viewport corner bounds, centre/rotation owner wiring, full cache graph and protected
Object/Vertex/Face sessions. Full1190 tests/906 PASS/284 identical failure names
versus clean .711 (1181/897/284); no new failures. Syntax/diff/protected files PASS.
User .712 AWESOME PASS protects the combined gizmo/wide-panel behavior.

Combined .712 manual checks:
1. Confirm visible .712; centre free Move/nearby free Rotate; top-left opens current
   Face/Edge/Vertex/Object rings, centre × closes; shared component Bevel90° unchanged.
2. Top-right Focus/Frame All, bottom-right Undo/Redo; bottom-left Object Multi toggles,
   highlights correctly and permits adding objects; original Multi transforms remain.
3. Symmetry/Bisect and Array panels wide/shallow, every setting retained, actions
   stacked on right, original previews/gestures/Apply/Cancel.
4. Face/Edge/Vertex popouts including blue Face Bevel, Shell, staged Sweep, repair
   and exact values: same wide/action rule, visibility and clean completion/selection.
5. Object Transform/Insert, Solidify, Revolve and Boolean panels/actions/history;
   navigation and .682 finger/Pencil background dismissal/re-tap remain protected.
User .712 and .714 PASS recorded; .715 Loop/Bevel and other .713 Edge checks pending. Keep drawer fallbacks.

## .711 Object radial inventory / session dock

Audited base index plus late Object Active Tools modules. Ten existing launchers:
inner clockwise from top: Transform, Insert, Solidify, Array, Boolean, Join,
Symmetry / Bisect, Mesh Health (eight sectors,120px radius,86px width).
Outer: Revolve Profile at0°, Clean for SubD at180° (195px radius).
All rectangle spacing checked. No Object Bevel exists; shared component Bevel90°
placement is untouched. Top-left gizmo shortcut opens rings; centre × returns gizmo (.712 user redesign).
Object selection still immediately shows its protected transform gizmo; background
finger/Pencil dismissal and object re-tap restoration remain original owners.

Original launcher buttons and owner controls reused intact. UI adapter cancels
previous owner through existing APIs before launching next. Join and Clean remain
one-shots and clear lifecycle suppression; no new modelling/history/pointer kernel.
Boolean retains operand labels/Swap/Union/Cut/Intersect/Close and authoritative Multi.
Transform/Insert retain face-to-face Move/Rotate/Scale, Apply/Cancel. Solidify keeps
Thickness preview; Array keeps endpoint/direction/count; Symmetry keeps presets,
plane Move/Rotate/Align/Flip/Reset/Keep/Mirror/Bisect Only; Mesh Health keeps full
report/repair controls; Revolve keeps edit/segments/profile controls/Apply/Cancel.

Shared tool-session-ui moves ORIGINAL node to top-centre viewport host only in
Object mode, bounded/scrollable. Restores original parent on end. Other modes keep
existing drawer host for their already-protected viewport proxies (avoid duplicate
Shell/Sweep overlays). Conditional Object Sweep editor also gets this dock; Sweep
creation remains Add, since it has no Object Active Tools launcher. Outliner Add/
Duplicate/Rename/Delete, Origins/Pivots/Groups, Selection and Modifiers are outside
this explicitly Active-Tools-only batch. No speculative new launchers introduced.

Gizmo hidden during Object sessions except Symmetry/Revolve plane placement.
Completion returns selected Object gizmo, or correct new component-mode puck.
Existing controls retain owner event listeners, child popups and history. Boolean
also closes on mode exit. Locked/reference radial writes blocked; Transform/Insert
require one object. Owner validation/history/snapping/navigation remain unchanged.
Keep drawer fallbacks until user tests PASS. Do not remove menus wholesale.

## .711 validation / combined manual test

32 targeted checks PASS: exact inventory/layout, original-node dock/restoration,
all eight session clients, authoritative cancellation/handoffs, actual Solidify /
Array preview launch + cleanup with source unchanged, one-shots, locked/reference/
Multi/mode guards, gizmo transitions and protected Face/Vertex sessions.
Full1181 tests/897 PASS/284 failures; no new failure names versus clean .710
(1169/884/285). Historical376 Solidify session-pin test now passes. Suite is not
all green. Syntax/diff/protected-file checks PASS. Verify main/live after publishing.

1. Test on current .712 using top-left radial shortcut; × returns gizmo.
2. Solidify/Array: top-centre settings, original live previews/gestures, Apply/Cancel.
3. Transform/Insert and Symmetry/Bisect: original surface/plane interaction,
   settings all top centre; plane gizmo available; Apply/Cancel clean.
4. Boolean: choose operands in Multi, Swap, Union/Cut/Intersect, Close, one Undo.
5. Revolve Profile, Mesh Health, Join and Clean for SubD: correct original results,
   full top-centre panels, cancellation, Undo/Redo and returned selection/gizmo.
6. Navigation, .682 background finger/Pencil dismissal/re-tap and protected
   Face/Edge/Vertex radial behavior remain intact. Collect Object refinements next.

## .710 audited Vertex inventory / ring layout

Only existing Vertex Active Tools were included. Base index + face-reconstruct /
component-circle provide six primary tools, native Join/Weld/Delete provide three,
vertex-merge provides Center/First, Vertex Repair contains Clean/Merge by Distance.
Selection helpers/diagnostics are excluded. Align's componentAlignRow belongs to
Selection controls, not Vertex Active Tools, so it was not added under this request.
No Vertex Extrude or other new modelling capability introduced.

| Clockwise inner ring from top | Owner |
| --- | --- |
| Add (0°) | add-vertex-edge-snap / original Add launch |
| Build Edge (45°) | add-edge-ui |
| Bevel (90°) | direct-multi-vertex-bevel + precision-bevel |
| Slide (135°) | vertex-slide-polish |
| Join (180°) | main connectSelectedVertices |
| Weld (225°) | main weldSelectedVertices |
| Create Face (270°) | face-reconstruct |
| Delete (315°) | main + safe-loose-vertex-delete interception |

Outer ring at145px, five72° sectors: Circle (0°), Merge Center (72°), Merge First
(144°), Merge Dist (216°), Clean Vertices (288°). Shared centred × preserved.
Outer/outer and outer/inner rectangle spacing verified; original inner radius82px.

Face remains eight inner/sixteen outer: Bevel replaces Knife at90°, Knife moves
135°, Duplicate moves180°, Extract replaces previous outer Bevel at337.5°.
Edge: Slide moves45°, Bevel90°, Crease135°; all other assignments unchanged.
Only layout changes to protected Face/Edge; their session owners/kernels unchanged.

## .710 contextual owners / lifecycle

New top-centre Vertex panel is a UI proxy, not a modelling/pointer owner:
- Add and Build Edge: instructions + Done; existing repeated placement/build behavior.
  Add Done uses existing stop(true), selecting last Added vertex. Superseding tools
  stop(false), preserving current selection. Build retains original creation behavior.
- Bevel: existing Width slider + Exact % / Apply Exact / Cancel. Slider sets next
  operation width; same existing Vertex bevel drag/kernel (no new blue preview or
  invented Segments). Owner completion closes/disarms contextual session. Exact is
  one existing history step; Cancel before Apply does not mutate or add history.
- Slide: signed exact percentage / Apply Exact / Done. Existing .162 rail selection,
  eligibility and math preserved intact; drag and exact use actual owner. Completion
  semantic returns selected result puck and disarms only radial session.
- Merge by Distance: explicitly SELECTED vertices only, model-unit tolerance,
  Apply/Cancel via existing .706 applyFor(selectResults:true). Launcher accepts two
  selected vertices even when current default distance has no candidates; readiness
  follows existing planner. No mode hop/whole-object widening or duplicate weld kernel.
- Clean Vertices: explicitly WHOLE active object, Apply/Cancel through existing
  cleanup owner. Success clears stale IDs; next Vertex tap gets fresh puck.

Join/Weld/Create Face/Delete/Circle/Center/First call existing buttons, then clear
hub suppression. Weld/merges/Circle return result selection puck. Join hands to Edge;
Create Face hands to Face; queued owner result selection is retained. Delete can clear
selection; next tap is fresh. Disabled targets/read-only objects/mode guards preserved.

Existing owners gained only public busy/disarm/result/completion hooks needed by UI.
No new viewport raw-pointer listeners. Semantic boxlab-vertex-tool-complete survives
stopImmediatePropagation; shared boxlab-selection-hub-session-complete resets hub.
Add/Build stop release existing capture. Vertex Bevel disarm rolls back unfinished
preview and cancelled drag preserves its selection. Slide contextual teardown can
restore in-flight positions/release capture on context loss; its pre-existing drag
history timing (push at first movement) remains, so do not claim zero history for an
interrupted in-flight Slide. Apply/Done controls are disabled while an owner is busy.
Mesh/mode/lock changes close settings; another radial tool closes without completing
that new tool's lifecycle. Geometry/scene rebuilding checks remain with original owners.

## Protected .710 validation / hands-on PASS

41 targeted tests PASS: actual Vertex bevel kernel/exact/gesture, Slide rail/exact/
gesture, Merge/Clean scope/history, native Join/Weld/Delete, Create Face/Circle,
chronological First/midpoint/history, lifecycle/disabled/lock/context handoffs, ring
inventory/outer spacing/Bevel locations and nearby protected Face sessions.
Full1169 tests/884 PASS, identical285 failure names to clean .709 baseline;
no new failures. Historical marker failures remain separate; not an all-green suite.
Syntax/diff checks PASS. Release/pin/main/live verification required after publishing.

1. Confirm visibly v0.36.18.710. Vertex ring has all thirteen tools and centred ×.
   Bevel is 3 o'clock in all modes; Face Knife clockwise/Duplicate next/Extract outer,
   Edge Slide at former Bevel slot/Crease at former Slide slot.
2. Add + Build Edge: original creation/navigation, top-centre Done, no stale arming.
   Bevel + Slide: existing Pencil drag plus top-centre numeric controls, clean exit;
   Cancel/Done selection/puck and one Undo/Redo for successful operations.
3. Join/Weld/Create Face/Delete/Circle: existing results, proper result mode/selection,
   puck or fresh next tap, one Undo. Check ordinary and genuinely loose selections.
4. Merge Center/First: midpoint/first-selection chronology, result puck, Undo/Redo.
   Merge Dist only selected vertices with editable tolerance; Clean whole active object.
   Apply/Cancel scopes and unavailable actions behave as labelled.
5. Protected Face Bevel preview, Edge sessions, selection/long press and navigation
   remain intact. User confirms this complete Vertex batch AWESOME / PASS.

## Earlier pending checks / protected passes

Pending .692 Edge neutral return, .702 active-only correction, .703 scoped repairs,
.704 Clean/XYZ Align and .706 Face Merge checks remain in TEST_CHECKLIST.md.
Test their behavior on CURRENT release; do not imply .709/.710 proves prior manual
PASS or ask to load old releases. .707 Face drag FAIL superseded by .708 PASS.

Protected hands-on:
- .710 ALL Vertex radial tools AWESOME / PASS, contextual controls and shared
  Face/Edge/Vertex Bevel inner90° placement.
- .708 Face Bevel blue Width/Segments/Pencil preview; release retains candidate;
  explicit Apply once, Cancel original puck, Undo/Redo, navigation and Edge regression.
- .705 Align to Face arbitrary plane, fixed anchor, rigid group, safe rejection/Cancel,
  selection/puck, one Undo/Redo, existing XYZ/navigation.
- .700 all viewport session/numeric popups top centre; Extrude/Inset background Done.
- .699 Extrude/Inset Exact/Repeat/Done; .698 Face Bridge + centred ×;
  .697 orientation; .696 Triangulate/Flip; .695 Poke/Planar; .694 Join/Circle.
- .701 selection owner behavior PASS, radial access explicitly retired by user .702.
- .691 Face hold Grow/Shrink neutral return; .690 refreshed Shell/Sweep exits/Knife.
- .682 Pencil/Object routing PERFECT: background tap dismisses gizmo but keeps
  selection; Pencil background drag orbits; object re-tap restores gizmo.
- .684 radial Knife Done; .688 trusted old .162 Loop Cut/Slide feel;
  .689 Face Delete; .676 Edge Bridge; .677 Edge one-shot cleanup;
  .670 selection-first Crease PERFECT; .663/.664 Edge Extrude protected.

## Navigation / files / topology backlog

Protect one-finger orbit, two-finger pan, pinch zoom, two-finger Undo/three-finger
Redo, no-jump pivot, persistent selections, Studio realtime, snapping, Object/Multi.
Never change src/multi-object-transform.js?v=0.36.1.0 without explicit need.
Frozen Beta3 .371, Beta4 .427 and Beta5 .538 directories remain immutable.
Do not reapply bulk .450 UI cleanup. .685-.687 degraded Loop Cut/slide; .688 restored
trusted .162 compatibility intact. Defer connected-chain Edge Bevel and complex
logical-quad Loop Cut strengthening until radial completion, isolated from that core.

## Event / release / handover rules

Tool-specific document listeners can stopImmediatePropagation. Prefer actual owner
semantic completion or early window capture; never stack raw-pointer owners for a
single gesture. Precision belongs to actual owner. If a straightforward gesture
fix fails, use Gesture Debug before more speculative layers. .617-.619 competing
multi-tap owners failed and were removed .620; don't casually reinstate them.
.707 Face Bevel late canvas capture lost to Move; .708 protected fix uses same
handlers at window capture plus narrow main fallback guard, not another bevel kernel.

Every build updates manifest/title/data-release-version/visible label/changed module
pins, dynamically imported parents as needed, then verifies main and live shell.
If iPad looks stale, compare visible version to manifest and HTML BEFORE modelling
changes. .690 bootstrap stopped after three stale-shell responses; recovery was
hardened to keep retrying. Do not regress it.
Update this handoff, append DEV_HISTORY.md, update TEST_CHECKLIST.md/ROADMAP.md,
and give a short realistic manual list after publishing. Next is the grouped Beta6 release-candidate audit, retaining pending device checks and drawer fallbacks.

## User build shortcut / finish contract

`/nextbuild` authorizes the next scoped build, repository update and GitHub Pages
publication. Finish each build with current handover/history documents and tell
the user it is ready for testing, with a short realistic manual test list. Standing
publication authorization is in AI_WORKFLOW.md; do not request it again.
