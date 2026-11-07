# .937 — Make the higher resolution active for fresh painting

User feedback: image still pixelated; following refresh, fresh cube paint also pixelated.
Main .936 atf1f13afc was source of truth. Audit .936 caller/painter and retained-image
projector: new colour size still512; increasing was an opt-in inside collapsed details.
Refresh alone did not choose1024. Existing images enlarge old texels rather than recover
source detail. Source1024/2MiB limit and nearest source sampling are independent limits.
This build corrects the confirmed default/access problem; the user's exact live texel
size/screenshot has not been inspected, so this does not prove every visual cause.

Production Paint supplies newColourSize1024 to the existing createViewportPainter.
Its original reusable API defaults512 for unchanged callers; rejects other preferences.
An existing colour resource's dimensions always win. New1024 session prepares a white
base/empty stack transiently, using existing layeredv2 profile for first commit. Opening,
closing/cancelling or no-op strokes do not add metadata/history. First stroke or image
uses original checkpoint/preflight/pool/COW and existing .9361024 codecs and writers.
Undo to absent paint still opens an uncommitted1024 document; restored512 stays512.
No automatic conversion/migration, additional schema or scene-history implementation.

Original Colour texture readout and Increase button are now visible near Channel/Tool.
At1024 button hidden; at512 exposed, scalar guards still disable it as before. Status
reports actual colour size. This gives a visible diagnostic for further device feedback.
Paint remains left-docked, compact and scrolling with original controls and footer.
No broad UI cleanup, new gizmos/pointer owners or altered paint/input functions.

Only painter UI/core default/open path and original File limits change. Existing source1024, alpha256,
three overlays, scalar512, 1024 grid maximum, memory/transport budgets and
24MiB native embedded image cap and original UV/work guards remain. Existing pixels
stay exact; no sharper source reconstruction or2K/4K claim. One1024 map is spread across
the UV atlas: it does not give1024 pixels to each cube face and still pixels when zoomed.
Projection/brush/render/filter/compositor/export kernels unchanged. Device detail and
latency remain an open test, not proven by merely checking resource dimensions.

Three new integration tests run actual production UI: visible1024 before first edit,
no opening side effects, first stroke/UndoRedo/new controller; saved512 opt-in behavior;
first image at1024 without painting/enlarging, exact SaveOpen/native PNG and512 roughness
independence. Existing .936 upgrade test explicitly creates the legacy512 fixture it
intends to enlarge. Existing scalar UI tests now compare all1024 display texels to their
unchanged512 data map using actual display size; alpha orientation test uses actual map
width for UV-to-texel locations. Original assertions/values/history/export checks remain.

Manual: fresh cube → visible1024 → fine paint/new image; judge detail, UndoRedo/SaveOpen.
If still inadequate at confirmed1024, inspect exact source and UV density and stage
larger maps/sources/memory changes. Merge/Flatten, Smudge/AO/seam authoring remain queued.

.937 File-size follow-through: actual fresh1024 three-layer duplicate exceeded the
old32MiB JSON file cap despite valid resource quotas. Original object-management
Save/Open now permits96MiB ONLY for validated layeredv2/v3 colour1024² projects;
legacy/ordinary projects retain32MiB. Open rejects>96MiB before reading; files32–96
are parsed/staged, decoded with original strict resource/geometry guards, then must
qualify BEFORE confirmation or scene/history replacement. Save qualifies only after
original exact roundtrip validation. Original quota/predecode/canonical/ref rules,
native24MiB cap, confirmation and failed-Open rollback remain. Raw JSON parsing is
now bounded96MiB (not a total browser-memory guarantee). Three-layer512 duplicate
regressions explicitly seed a legacy512 base to retain their8/16MiB assertions. A new
actual1024 three-layer duplicate test verifies real Save/Open>32MiB, exact pixels,
96MiB pre-read refusal, legacy32MiB rejection and unchanged scene/history on errors.
No blanket file-limit increase for ordinary projects or invented schema fields.

Validation preparation recorded: production-default change invalidated fixed512
coordinates in old alpha/scalar UI fixtures. Converted indices to actual dimensions
without weakening their values, channel isolation, history or exact export assertions.
The old9098/16MiB regressions now explicitly load legacy512. Running the actual new
1024 scenario exposed real32MiB File Save refusal; raised only validated high-res
File eligibility as documented. That new scenario now passes after correcting an
empty-array cross-realm test comparator to history length/identity checks; no runtime
workaround. Release contract caught a missing drawer-ui reverse-parent cache/hash
update during preparation; closure is now complete and five checks pass.
