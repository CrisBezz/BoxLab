# Build .786 reliability evidence

## .786 — Assisted Vertex ownership and front Face taps — 2026-10-10

User .785 FAIL: Vertex additive taps sometimes clear prior selection/deselect wrong
vertex; Face taps sometimes select rear faces; Edge explicitly performs well and
is protected. Last whole-build user PASS remains .784. Parent main `8637d16da0f7e089b0be3887234dd783787eae4d`.
Audit actual main window background classifier, rendered-marker Vertex assist,
armed Face selected-priority/sequential path, native main raycasts and UI owners.
.785 seeded intent tests did not cover assist/background mismatch or hidden markers.
Three new runtime reproductions fail before fixes; do not equate historical regex
failure counts with product reliability or mark .785 device accepted.

Existing Vertex assist exports its guarded physical pick policy. Main's earlier
window background classifier consults that same owner before strict marker raycast,
so22px assisted taps do not arm background-clear ahead of document completion.
Assist filters invisible ancestors, clipped markers and candidates outside22px,
then rejects markers occluded by same-parent rendered body using a separate centre
ray and bounded distance tolerance. Loose scaffolds without body remain pickable;
existing additive toggle, transform/direct-tool guards and tap/move thresholds kept.
Occlusion applies to normal assisted taps, not deliberate Lasso/Through selection.
No new pointer listener/modelling kernel; visibility uses rendered marker positions.

Armed Face controller records physical native primary separately from modelling
hit. Tap completion toggles native front Face; selected-hit priority and scoped
single-Extrude continuation still route deliberate modelling drags exactly as before.
Synthetic Exact, Cancel, working sets and geometry kernels remain unchanged.
This fixes armed Face rear-selection/continuation overrides; ordinary unarmed native
Face picking already chooses nearest. No new screen polygon picker or global culling.

Real markers/body/raycasts, main window classifier and whole Vertex assist reproduce
add/remove at8px outside marker while retaining prior selection/history. Hidden rear
marker at pointer centre cannot steal nearby visible front vertex. Whole Face plus
actual main cube raycasts protects selected rear/single/multi tap add/remove and
post-Extrude continuation tap. Three mutations reject reinstated background clear,
hidden-marker acceptance and rear tap routing. Controlled DOM/dispatch/renderer;
on-device tap accuracy still requires user retest. Original .490 cancellation
mutation adapted to inserted comment; all other mutation checks retained.

267clean-focusedPASS (Vertex tools/picking, Face/native/negative cuts, Pencil/floating
Edge/background and release). Broader focused547/536PASS/11existingFAIL, all active.
FullNode24:2081tests/2049PASS/32FAIL/0skip; exactly same32identities as785, no new
failures. Runtime edits only main background branch, Vertex assist and Face tap-hit
record/finish. Shell/recovery786; three changed runtime module pins/hashes and two
recovery URLs reviewed. Through779/Inset753, Edge owners, Multi1.0/Loop715 and
frozenBeta2–6 unchanged. Publication/Node22/live pending; .786 user retest pending.
Next: obtain Vertex/Face acceptance before remaining32 historical check review.
Manual: confirm786; select several front Vertices and tap one off (also just outside
dot); orbit then repeat; front Face taps with Extrude/Inset armed while other Faces
selected; normal Face/Edge selection, negative Extrude/Undo/Redo/navigation.
