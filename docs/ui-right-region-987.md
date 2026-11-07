# .987 right-region / VIEW disappearance evidence — 27 October 2026

User reports lower-right area hidden during Facegroups, then supplies screenshot
47C7D5BD-0A02-44A0-8567-0E21CF4387CF.jpeg (10:22 local) showing VIEW panel
continuing below a sharp cutoff at Saturation row. Later entire VIEW menu visually
disappeared and cannot currently be reproduced. Keep recurring rendering fault OPEN.

Separate supplied debug timestamp 2026-10-27T00:14:09.533Z, release987:
viewport1366x886/DPR2, visual viewport same/offset0/scale1. Canvas CSS1366x826
at y60/backing2732x1652, canvasProbe.hidden=false, controlsEnabled=true. sessionnull,
texturePaintfalse (does NOT report facegroup brush state). UV workspace absent;
hidden shared host unstyled/not top-layer. Footer rect x10/y845/w1340/h16, hiddenfalse,
displayflex/visibilityvisible/opacity1/z121/no filter/transform/contain. Top controls
in bounds with expected hit stacks. Gizmo displaynone/hiddenTRUE/zero rect: this
capture cannot assess earlier visible-gizmo clipping. Canvas hit tests do not prove
footer/text pixels were drawn (footer pointerEventsnone). Active render mode, VIEW
panel rect/scroll state, facegroup brush state and Studio overlay are not captured.

This is consistent with a painting/clipping symptom but does not establish native
engine cause or prove a specific overlay. Facegroups recurrence weakens Studio-only
vignette theory; overlay opacity was not directly sampled. No speculative floor,
shadow, z-index, blend or renderer change follows from this evidence.

Independent confirmed usability fault: existing-group suggestions did not open.
985/987 UI used text input+datalist, not an explicit group selector.988 replaces
that dependency with native select plus original editable new-name field. This
repairs the group-list access path, not the broader rendering fault. No987 PASS.

## .988 follow-up and .989 instrumentation

User supplied988 dump00:41:42.391Z: unblocked Pencil down/up/click at VIEW summary
x1308/y41, same healthy canvas/layout, footer visible in DOM. Open/panel state still
absent, so no conclusion whether native toggle failed or paint was missing. User
subsequently PASS988 accepts group-selector workflow, not permanent rendering repair.
989 extends original debug report with native open, panel geometry/scroll and
mode/facegroup state plus opt-in passive toggle/scroll evidence. No runtime
rendering/layout change and no automatic recovery.

## .989 restored/hidden canvas comparison and .990

Two989 reports00:58:35Z and00:58:50Z show canvas hidden then restored; user observed
rightUI missing twice while hidden. VIEW openfalse both; fixed panel retained
360x756 layout rect at982/114.5. No VIEW input/toggle recorded. This does not show
failed native menu opening. Same viewport/backing and no active UV/session/brush.
990 explicitly displaynone's closed panel in early CSS and original owner fallback,
retaining native details state and original open panel. Confirmed source lifecycle
hardening; nonzero closed bounds are not proven root cause of rendering fault.

## .991 right-region recurrence — 27 October 2026, 04:01:19Z

User explicitly reports right-hand issue AGAIN on991. Do not treat990 functional
PASS as permanent rendering acceptance; retain closed-panel lifecycle protection
while reopening broad visibility gate.991 dock UX has NOT received user PASS.
Supplied report: Facegroups/Face, no active stroke/session/texture Paint; canvas
visible2732x1652, viewport1366x886/DPR2. Studio overlay opacity0. VIEW native
toggle evidence at28391/29205/30086/31107 shows open true/false/true/false. Open
panel rect998/66/360/811.984, scrollHeight980/clientHeight810; closed displaynone
and zero rect. Thus native input and990 closed-surface removal work, but do NOT
eliminate user's visual loss. Do not repeat native-toggle failure or retained closed
VIEW panel as explanation for this capture. Transparent Studio layer remains in
DOM; opacity0 weakens visible-vignette explanation without proving engine cause.
Controls/DOM/hits healthy is not pixel evidence. Gizmo explicitly hidden here.

In991 authoring nodes are parked in hidden home until Open facegroup paint controls.
Their zero bounds even while VIEW open are EXPECTED; palette appearance controls
remain in VIEW. Debug's groupPicker optionCount1 can simply mean empty named-group
list plus placeholder. Do not infer selector regression or missing authoring nodes.
Current debug does not sample new dock root. Source/UX991 remains pending device
acceptance. Runtime remains991; no speculative rendering changes in this update.
Live version/index/render-modes/dock byte-match verified;91 focused tests were
validated before publication. Next test new left dock and compare its visibility
with affected right region if recurrence persists; no repeated Hide3D/toggle dumps
needed. Root cause remains unconfirmed.
