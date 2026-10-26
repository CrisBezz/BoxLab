# BoxLab AI Development Workflow

This file defines the handover protocol for every AI-assisted BoxLab development session.

## Core rule

The repository is the source of truth.

A brand-new ChatGPT conversation with no access to earlier BoxLab chats must be able to continue development by reading this file, `AI_HANDOFF.md`, `TEST_CHECKLIST.md`, the relevant recent entries in `DEV_HISTORY.md`, and inspecting current `main`.

If chat memory, an older handoff, or remembered version numbers conflict with the repository, use the repository and update the handoff.

## Start of every development session

Before changing code:

1. Read `AI_WORKFLOW.md`.
2. Read `AI_HANDOFF.md` completely.
3. Read `TEST_CHECKLIST.md`.
4. Read the recent relevant entries in `DEV_HISTORY.md`.
5. Inspect current `main`, including the visible app version and recent commits.
6. **Audit for existing functionality before implementing anything new.**
   - Search the current UI wiring and source tree for the requested feature or close equivalents.
   - Check whether the feature already exists but is hidden, duplicated, disconnected, version-pinned, or implemented by a later-loaded module.
   - Check relevant frozen beta code/history when useful before assuming a feature is missing.
   - Prefer repairing, reconnecting, consolidating, or exposing existing functionality over adding a second implementation.
   - If two implementations already exist, identify the authoritative one before changing either.
7. Identify protected files, protected behaviours, and the current task.
8. If the handoff is stale, reconcile it from the repository before coding.

## Development rules

- **Do not add a feature until you have confirmed it does not already exist elsewhere in the current app.**
- Avoid duplicate buttons, duplicate modules, overlapping interaction handlers, and parallel implementations of the same user-facing capability.
- When changing a dynamically loaded UI module, verify the parent loader URL/cache key is also refreshed if browser caching could otherwise retain stale wiring.
- If the requested feature already exists, first determine whether the real task is bug-fixing, reconnecting, consolidating, or improving it.
- Keep changes narrow and modular.
- Preserve stable behaviour outside the requested scope.
- Do not silently refactor unrelated systems.
- Prefer topology-driven solutions over accumulating special cases.
- Preserve the iPad/Pencil interaction model.
- Preserve Undo/Redo semantics.
- Treat regression-sensitive systems as protected unless the requested task genuinely requires touching them.
- Record an important failed approach if a future developer could plausibly repeat it.

## Protected interaction baseline

Unless the user explicitly requests otherwise, preserve:

- one-finger orbit
- two-finger pan
- pinch zoom
- two-finger tap Undo
- three-finger tap Redo
- no-jump orbit pivot
- persistent selections during navigation
- Studio realtime behaviour
- object-management / Multi behaviour
- existing snapping
- existing modelling tools outside the requested scope

## Special protection

Check `AI_HANDOFF.md` for the current protected-file list before editing.

In particular, `src/multi-object-transform.js?v=0.36.1.0` has historically been explicitly protected and must not be casually changed.

Version-pinned UI assets and topology-critical modules may also be intentionally frozen. Do not "clean up" version pins merely because they look old.

## Testing

For each change:

1. Test the requested feature.
2. Test nearby functionality that shares topology, selection, history, object state, or UI wiring.
3. Use `TEST_CHECKLIST.md` as the regression baseline.
4. Add a new checklist item whenever a newly stable behaviour becomes worth protecting.


## Release publication / cache refresh protocol

Standing user authorization reaffirmed explicitly on 2026-10-14:
“From here on in, I ALWAYS approve pushing & publishing :)”
This direct session approval covers the pending .859 release and future /nextbuilds.

Earlier user authorization on 2026-10-05:
“I approve any commits to github repos, page pushes and so on - moving forward for eternity :)”
The user grants continuing approval for GitHub commits, pushes and Pages publication.
**ALWAYS authorised to publish** BoxLab builds.
Complete validation and handoff updates, then commit/push to main and verify release
markers without asking for publishing permission again. This applies to BoxLab
development releases; it does not authorize unrelated external actions.

GitHub Pages + iPad/Safari caching is part of the release surface. A code commit is not considered published until the shell and relevant module cache keys are verified.

For every numbered build:

1. Update all release markers together:
   - `version.json`
   - HTML `<title>`
   - `#appVersion[data-release-version]`
   - visible `vX.Y...` label
2. Repin every directly changed module in `index.html`, or its dynamic-import owner when the module is loaded indirectly.
3. If a dynamically imported child changes, repin the parent loader URL if Safari could otherwise retain the old loader graph.
4. Verify `src/multi-object-transform.js?v=0.36.1.0` remains untouched unless the task explicitly requires changing it.
5. Verify the release-refresh owners are not left on stale pins when refresh logic changes:
   - `src/release-bootstrap.js`
   - `src/release-version.js`
6. Fetch current `main` after publication and explicitly verify the release markers / pins from the repository.
7. If the user reports that a build is not refreshing:
   - first inspect the version visible in their screenshot
   - compare it with `version.json` and the HTML shell on `main`
   - do not make modelling changes until it is confirmed the user is actually running the intended build
   - audit the release bootstrap before asking for repeated manual cache-clearing
8. Never permanently stop automatic stale-shell recovery after a small fixed number of retries. GitHub Pages can briefly serve an older HTML shell after `version.json` has advanced; retry logic must remain able to recover later in the same Safari session.

Reference incident:
- v0.36.18.690: `version.json` and the new shell were correct on `main`, but an earlier `release-bootstrap.js` stopped after three stale-shell responses. The guard was hardened and both release-refresh owners were repinned to the current build.

## End of every successful development session — mandatory

Before finishing a session that changes BoxLab:

0. Prepare a short **user manual test list** for the final reply:
   - normally 3–6 quick checks maximum
   - user refinement (2026-10-08): clearly say **“The app is ready for testing — build .XXX”**, then the brief checks; make completion versus ongoing work explicit
   - only ask the user to test visible/tactile behaviour they can realistically verify in the app
   - do not ask the user to recreate synthetic backend fixtures or topology torture cases that are better covered by automated tests
   - clearly distinguish what automated regression already covered from what the user should manually sanity-check
   - user reaffirmed 2026-10-13: always explicitly tell the user when the build is complete; do not end with only a progress update
   - if no meaningful manual test is needed, say so explicitly
   - user reaffirmed (2026-10-19): **always explicitly tell the user whether there is something to test**. Include the build number, readiness status and short hands-on checks in the completion reply; if there is no new hands-on test, state that plainly. Do not leave the user to infer readiness from progress updates or automated test results.

1. Rewrite `AI_HANDOFF.md` so it describes the repository AFTER the work.
2. Update current version, HEAD/release commit references, current focus, known issues, and next step as applicable.
3. Append a concise entry to `DEV_HISTORY.md`.
4. Update `TEST_CHECKLIST.md` when new regression coverage is needed.
5. Record any newly protected file or behaviour.
6. Record meaningful failed approaches when useful.
7. Verify the handoff is sufficient for a fresh chat with no earlier conversation context.

Development work is not considered fully handed over until these files are current.

## File roles

### AI_HANDOFF.md
Living current-state document. Keep it concise. Rewrite current-state sections rather than endlessly appending.

### DEV_HISTORY.md
Append-only development chronology. Record meaningful milestones, not every tiny cache-hop or deployment-marker commit.

### TEST_CHECKLIST.md
Regression contract for stable user-facing behaviour and topology-sensitive workflows.

## Handover test

Before ending a session, ask:

> Could a new ChatGPT conversation continue BoxLab correctly using only the current repository and these handoff files?

If not, improve the handoff first.

## Radial menu scope

User-directed priority (2026-10-04): all development moving forward is to finish
radial menus and their contextual settings. Follow Face → Vertex → Object → final
Edge coverage. Defer broader gestures, topology strengthening and unrelated UI work
until the radial menus are finalized, except fixes required by this work.

User-directed rule (2026-10-04): contextual radial menus contain active modelling
and repair tools only. Selection commands belong to long-press/gesture workflows.
Do not populate radial rings with selection helpers, filters or diagnostics that
only change selection. Audit actual Active Tools ownership before choosing builds.

## Tool-session popup placement

User-directed UX rule (2026-10-03): every viewport tool-session popup appears at
the top centre of #viewportWrap, not beside the working selection. Use
src/tool-session-panel-position.js and the current shared import pin. Includes
contextual session panels and floating numeric-entry popups; preserve gizmo/radial
selection positions. Keep taller panels bounded and scrollable.

## Interaction event ownership

Protected rule for iPad/browser interaction work:

- Tool-specific transform/selection modules may consume pointer events with `stopImmediatePropagation()`.
- A later `document` listener is therefore **not guaranteed** to observe pointer completion.
- For global gizmo/viewport completion that must survive those tool owners, prefer **`window` capture** so it runs before `document` capture.
- Where possible, the actual gesture owner should emit a semantic completion event/state transition and downstream UI should react to that instead of competing for raw pointer events.
- Before adding modeless tap / multi-tap / hold / drag behavior, identify the single gesture owner and its capture level. Do not stack independent raw-pointer owners for the same gesture.
- The v0.36.18.592 Rotate floating-type-in fix is the reference case: `transform-upgrade.js` consumed document-capture `pointerup`; moving Total Gizmo completion to window capture restored reliable release detection.

### Gesture-owner precision rule

- Precision behavior must live with the real gesture owner. Do not add snap/detent maths to a helper module unless that helper actually receives and mutates the active drag.
- v0.36.18.594 demonstrated the failure mode: Scale detents were added to transform-upgrade while Object Scale was actually owned by main.js, so the feature could not affect the live drag.
- Total Gizmo now exposes explicit active-drag ownership state so owner modules can distinguish gizmo gestures from legacy transform-strip gestures without inference.


## Cross-mode radial consistency

User-directed UX rule (2026-10-04): Bevel occupies the inner-ring 90-degree / 3-o'clock
slot in Face, Edge and Vertex. Keep this shared placement during future refinements.
.710 user explicitly requested all currently existing Vertex Active Tools as one
batch, followed by combined hands-on testing/refinement. Do not invent new Vertex
capabilities or include selection helpers under that request.


## Wide popout / gizmo shortcut rule

User-directed UX refinement (2026-10-04, .712): all top tool panels with terminal
Cancel/Apply controls are wide, with settings across the body and terminal actions
stacked on the right. Use shared tool-session-wide-layout through the top-centre
positioning owner; preserve original nodes/listeners/IDs and staged visibility.
Gizmo centre belongs to free transforms. Radial access is the top-left shortcut;
top-right Focus/Frame All, bottom-right Undo/Redo, bottom-left Object Multi. Reuse
actual action owners; never implement duplicate history or Multi state.

User shortcut (2026-10-04): `/nextbuild` means proceed with the next scoped build,
complete validation, update repository and publish to GitHub Pages. Always finish
by updating handover/history documents and telling the user the build is ready for
testing. Include a short manual test list; distinguish automated checks from iPad
hands-on checks. Publishing is already authorized and requires no repeat question.

## Accepted popup/browser/background refinement — .732

User PASS .731 and requested one bundled build. Content-sized popups should have
small comfortable packing (shared 7px/8px), retaining variable widths. Object Browser
uses the original icon/Objects/Modifiers controls on the top bar in the order Frame
All, Undo, Redo, Focus, Object Browser, VIEW; browser opens on the right under icons,
with Modifiers initially collapsed. This browser is the user-directed exception to
top-centre tool popup placement. Use existing session exit owners through semantic
background taps; preserve placement/drawing tools' empty-space input. Audit policy
and protected .724 tap/hold behavior are recorded in current AI_HANDOFF.md.

## Beta 6 launch baseline — .733

User PASS .732 and requested Focus on every launch. Shell starts in Focus; existing
Focus toggle must visibly show its active state, expose the left list when disabled
and retain the right Object Browser. No further feature work before Beta6 freeze;
follow current BETA_6_RELEASE_CHECKLIST.md for remaining device gates and freeze
verification. Publishing is already authorized; device acceptance is not permission.

## Component Align access — .734

User places Align on Vertex/Edge/Face gizmos, with distinct point/line/face icons,
not radial sectors. Reuse existing component-align axis/fixed-anchor owner; only
Face exposes Align to Face plane alignment. Hide gizmo during contextual Align
anchor picking, preserve selection, return on completion, and retain safe background
exit. No new vertex merge or edge-orientation interpretation implied.

## XYZ / Nomad handoff — .735

User PASS .734. Axis buttons across app use the original Move RGB palette via
shared axis-colours.css. File NOMAD replaces secondary Save GLB and its explanatory
note; reuse validated MeshUtilz native container/template (provenance in templates
README), preserve existing OBJ/GLB exports and source/history. Native Nomad opening
must be device-tested before Beta6 freeze; do not claim rich attribute round-trip
or NOM import into BoxLab without implementation/evidence.

## Post-Beta 6 reliability direction — 2026-10-05

User authorizes continuing with reliability audit and staged improvements. Earlier
pre-freeze restriction no longer blocks postBeta6 work on main; frozenBeta6 remains
immutable. Read docs/reliability-audit-2026-10-05.md and inventory. Report failures
as test results, not bug counts. Do not claim stable failure counts prove safety or
silently exclude historical checks. Reconcile intended behavior and authoritative
owners, retain semantic coverage, and keep active CI failures visible until fixed.

## .737 reviewed test-contract workflow

Use tests/helpers/release-contract.mjs and reviewed asset/hash fixture for current
loading contracts; never demand every unchanged module equal shell version.
Internal module stamps, asset cache pins and shell release are distinct. Review
source changes and loader keys before updating the fixture; do not regenerate
expectations blindly to make tests green. Historical .453 recovery source lives
under tests/fixtures/recovery-453 with exact provenance; no current runtime rollback
implied. All remaining failing behavior checks stay active until understood.


## Extrude / outer-ring placement — .758

User requires Extrude inner0°/12-o’clock in Face/Edge/Vertex for muscle memory.
Vertex Extrude direction uses viewport axis chooser only; hide old panel buttons.
Face outer15tools evenly24° apart, Circle0° anchored; preserve common tool slots
across modes when adjusting layouts. Bevel inner90° remains protected.


## Full Extrude session parity — .759

User requires Vertex and Edge Extrude to share full interface, not only chooser.
Use same Distance/Apply Exact/Repeat/Done panel and viewport arrows/Free centre;
keep direction buttons/legacy transform-strip hidden. Original mode-specific
geometry owners remain authoritative (Edge Free perpendicular, Vertex view plane).


## Paint dock and UV access — .916 user direction, 19 October 2026

Paint is the user-directed exception to top-centre/wide tool popups: compact on the
LEFT of the viewport, bounded/scrolling, advanced controls collapsed, original
Undo/Redo/Done footer retained. Other tool positions stay unchanged. Object radial
has a dedicated UV button using existing projection/workspace/history owners;
Mesh Health is diagnostic/repair UI. Do not reintroduce parallel UV editors.


## .965 current Paint workflow and reporting rule — 25 October 2026

Paint settings remain LEFT. Layers remain visible above contextual controls. Bottom
UV PAINT beside SELECT opens the original UV-validated painter; Object radial has
no Paint sector. Choices keep Paint radial visible until valid Pencil surface use.
Empty-background hold reopens it through the original main timer; Done exits.
Provide meaningful progress updates while building, then explicit ready status and
3–6 hands-on tests in EVERY completion. Never end an authorized build at a local
commit/push credential error: connected GitHub is the established publication path.

.966: User .965 PASS preserves current Paint UI; right-side refresh fault remains open. Smudge uses per-input work windows without extra history entries.

.967: invisible but clickable right controls are a painting/composition device gate; do not claim repaired from DOM assertions. Keep VIEW popup untransformed/unclipped and shared canvas sizing owner.

## .968 — selected Proof 03 icons in Face radial — 26 October 2026

User approved in-app review after choosing all65 icons and refining Proofs02/03.
Install first Face radial only per staged audit: all23 original buttons retain exact
textContent, target selectors, event owners and angular slots (Extrude12/Bevel3).
Scoped face-radial-icons.css supplies original SVG artwork as non-interactive CSS
pseudo-elements above existing small labels; no SVG title/text contaminates routing.
Inner radius112px/76×60 targets accommodate32px icons; outer230px/86×60 retained.
No changes to geometry, gestures, history, Paint, Multi1.0, other radial modes or
.967 accepted composition rules. Complete65-icon Proof03 artwork archived in
 docs/radial-icons-proof-03.json for staged continuation. Bevel stray line removed;
Bridge restored to Proof01, Map size C. No native iPad visual acceptance inferred.
DEVICE968: Face selection → tools; inspect all inner/outer labels and artwork,
Extrude/Inset/Bevel actions and their popups; UndoRedo; finger orbit/pan/pinch;
right toolbar remains visible. Next refine iPad size/contrast then remaining modes.

## .969 — Vertex radial approved icons; .968 user PASS — 26 October 2026

User says “Great result! PASS /nextbuild” for .968. Protect accepted Face icon
artwork,32px size, small captions,60px target height and112px inner radius; retained
Face CSS bytes/cache968. Next agreed mode is Vertex, followed by Object then Edge
and Paint. All14 existing Vertex tools now use selected/refined Proof03 SVGs via
scoped vertex-radial-icons.css, same accepted layout. Join uses Join (Vertex) art,
not Object Join. Original labels/textContent, angular slots, targets, event/history/
geometry owners and disabled-state styles remain untouched. Extrude12/Bevel3 retained.
No runtime JavaScript or Multi1.0, .967 composition, Paint, Face/Edge/Object changes.
.968 runtime17b3d57d; publication docs524ff168 were audited as current main.
DEVICE969: Vertex selection → radial; inspect14 icons/title size; tap Build Edge,
Slide and Bevel and finish their original sessions; Join/Merge Center on suitable
selections; UndoRedo/navigation; switch to Face to confirm accepted icons unchanged.
Native .969 visual acceptance pending. Next Object icons after device feedback.

## .970 — Object radial approved icons; .969 user PASS — 26 October 2026

User “Great PASS /nextbuild” accepts .969 Vertex icons. Protect .968 Face and .969
Vertex artwork, label format,32px icon size and original actions. Audit current main
e1047fbf/runtime a88c5e14, shell969 and13 existing Object sectors; no parallel icon
owner found. Add scoped object-radial-icons.css with approved Proof03 SVGs for all13
original buttons. Join explicitly uses Object artwork, distinct from Vertex Join.
Same60px height/112px inner radius/230px outer radius and small captions; Object
padding3px/gap2px fits two-line Symmetry / Bisect title. Existing angular slots,
labels/textContent, target IDs, tool availability/actions/history and Multi remain.
Accepted Face/Vertex CSS bytes and pins retained; gizmo JS, composition stylesheet,
Paint, geometry and frozen betas unchanged. Object Multi and gizmo shortcuts remain
original owners. No whole-app reskin or new modelling functionality.
DEVICE970: Object radial inspect inner/outer icons and longer labels; Duplicate
and UndoRedo; Array or Solidify opens original settings; UV/Mesh Health panels;
return to Face/Vertex and verify accepted appearance/navigation/right toolbar.
Next Edge icons, then Paint, after device feedback; .970 not yet device accepted.

## .971 — native-UV Array compatibility; right UI recurrence — 26 October 2026

User .970 reports ordinary Array “linked duplicate could not be created” and Live
Array “requires an independent geometry object” on default UV cube. Audit main
 aa37c161/runtime cd3e6b5f: linkedDuplicateObject intentionally refuses native UV
resources, Live Array blanket-rejects any glbPassthrough; default UVs introduced
later now make both old Array paths refuse. No .970 PASS inferred; .968/.969 icon
PASS retained. Pause Edge/Paint icon rollout for these fixes.

Original Array owner now uses ordinary manager.addMesh for independent native-UV
copies, keeping exact face-corner UVs/settings, original placements and ONE history
checkpoint. Geometry-only Array retains linked path. New small array-native-uv helper
reuses original UV inspector/topology signature, validates complete current native
payloads, refuses paint/imported resources/stale UVs before mutation. Independent
copy failure restores captured scene. No global linked/UV/mesh engine changes.
Live Array repeats exact original source UVs per copy (deliberate UV overlap), stores
nativeUV source payload in existing JSON recipe and updates native result payload.
Count/END reopen/Convert/UndoRedo/project codec retain it; no schema bump, reprojection
or texture loss. Paint remains refused; source editing for native-UV Live Arrays
remains refused by original source editor—Convert to Mesh before component changes.

User .970 report00:27:56Z reopens right-side visual fault despite .967 safeguards:
1366×886,DPR2,canvas2732×1652; no session/Paint, hidden gizmo; toolbar enabled/visible,
in bounds and exact hit stacks. Canvas isolation/contain and header isolation active.
Not disabled controls, missing DOM or stale967 pins. Two remaining per-SVG handle
hover/active drop-shadow filters in original gizmo removed; stroke/opacity feedback,
hit proxies, bounds, input and composition967 remain. This is a targeted reduction
of filtered SVG surfaces, NOT proof of WebKit root cause or a guaranteed UI repair.
Native .971 visibility retest required. See docs/ui-recurrence-970.md.

DEVICE971: default cube ordinary Array6 copies; UndoRedo. New cube Live Array6,
reopen/count edit/Convert, SaveOpen/UV preview. Repeat refresh/Array/Done/navigation,
watch right toolbar and send UI Debug report if fault returns. Existing Face/Vertex/
Object artwork unchanged. Next device feedback before Edge/Paint icons.

## .972 — plain UI rendering; Array PASS, visual fault still open — 26 October 2026

User says “Array now works but right hand side of screen is still failing”. Record
Array971 acceptance only; do not infer971 visual PASS or close recurring visibility.
Audit main c311992b/runtime13ad9e62. Array nativeUV helper and both paths untouched.
.967 layer hints and971 SVG glow removal proved insufficient on real iPad.
Current screenshot/report indicates visually absent but DOM-healthy controls;
not locally reproduced, no confirmed browser-engine diagnosis.

Audit found backdrop blur still active in floating panels/File/VIEW/bottom modes,
legacy tool popups and rename dialog. Header/status/ObjectBrowser retain .967
will-change:opacity hints. New single ui-stability.css default disables both
prefixed/unprefixed backdrop filters under #app, decorative filters on buttons and
gizmo SVGs, and extra opacity-layer hints on those three UI roots. Existing opacity,
borders/fills/strokes still show disabled/active state. Opaque dark surfaces replace
frosted panel backgrounds. Dynamic later tool styles are overridden via!important.
No transforms, reparenting, polling, hidden→shown tricks, renderer/history/input
changes, layout offsets, display/visibility, geometry or accepted icons changed.
.967 canvas isolation/contain, header z10 and fixed VIEW popup placement retained.
The plain profile is a controlled rendering reduction, not a proven engine fix.
WebKit primary source explains backdrop filters composite background content and
need extra rendering passes: https://webkit.org/blog/3632/introducing-backdrop-filters/ .
This supports removing that rendering path; it does not identify this exact bug.

DEVICE972: refresh landscape multiple times BEFORE switching apps; inspect right
FrameAll/Undo/Redo/Focus/Objects/VIEW and right status. Open Objects and VIEW menus;
Array preview/Apply/Undo, UV Editor enter/exit and orbit to right edge. If visual
loss recurs, exact972 UI Debug report plus screenshot still needed; gate OPEN.
Array971 PASS protected; Edge/Paint icon rollout remains paused for visibility.

## .973 — opt-in canvas visibility probe; .972 visual FAIL — 26 October 2026

User supplies .972 report01:18:45Z after recurring right-side fault. .972 plain
profile is confirmed active: header/status willChange auto; all sampled filters and
backdrop filters none. Layout/hits are still healthy, so blur/layer-hint removal did
not repair visual loss. No stale-shell explanation or .972 visual PASS. Array971
user PASS retained. Do not continue speculative cosmetic fixes or icon rollout.

Audit main2646e5cb/runtimea799ee6a. Extend ONLY existing File→UI Debug owner with
“Hide 3D only” / “Show 3D again”. This explicit diagnostic temporarily sets original
canvas inline visibility hidden!important, retaining layout/backing dimensions,
renderer/model/history. Restore exact prior inline value/priority (or absence),
on Show, Debug off and pagehide. Refuse entry during Paint, active tool or gizmo drag;
restoration always works. No reload, second renderer, resize, polling or new raw
pointer consumer. Disabled debug/default app unchanged. Existing CSS972 retained.

While hidden, user chooses “Right UI visible” or “Still missing”; bounded evidence
records subjective outcome plus canvas hidden flag and current toolbar probes.
Capture/Copy includes canvasProbe state. Show clears cached report so next Copy
includes both observation and restoration events. UI log controls remain on left.
This is a diagnostic build, not a claim that controls are fixed. The outcome will
separate canvas participation from UI-only painting; neither outcome alone proves
an engine root cause. Tests cover exact restoration, busy refusal, actual buttons,
observation, off/pagehide cleanup, and unchanged canvas dimensions/model/history.

DEVICE973: while right controls visually missing, BEFORE app switching, use File→
UI Debug→Hide 3D only. Inspect top-right toolbar; choose visible/missing result.
Show3D again→Copy report and send. Also say if restored3D makes rightUI disappear
again. This is the next decision gate; Array remains accepted; no modelling changes.
