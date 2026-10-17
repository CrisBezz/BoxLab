# .900 — first main-viewport UV Paint

User .899 PASS protects lab workflow, ordinary Duplicate/history and plain .boxlab.
Audit main2c56d33f: .899 resource storage exists, .896 raster/samplers accepted, original
export preview supplies valid corner geometry. No production paint input/display owner.

File → Paint selected object enters ORIGINAL top-centre Tool Session in Object mode.
Use one visible unlocked independent BoxLab/native-UV object, SubD/Mirror OFF, max20,000
face corners. First create Box/Sphere/Planar/etc UVs in existing Mesh Health/UV Editor.
No new unwrap, triangulator, input navigation or history implementation. File action
reuses Object-mode selector and disarms actual transform owner; Object radial lifecycle
knows UV Paint for gizmo suppression/cancellation. Other active tools refuse entry.
Pencil or primary mouse paints; fingers remain original navigation. Both accepted
BoxLab round/Klecks-derived curve samplers are selectable, using SAME .896 CPU raster,
one opaque512² sRGB layer. Colour, size, hardness, opacity and pressure→size. White initial
base. Screen-space sampling raycasts original UV preview geometry for every emitted dab;
no UV spline. Front-sided target proxy plus DoubleSide inactive-body depth tests refuse
occluded painting. Proxy is separate from non-raycastable DISPLAY overlays.

New modular owners: paint-target.js validates/binds/displays; viewport-paint-core.js
adapts accepted stroke/raster to original scene checkpoint; viewport-paint.js owns ONLY
armed paint Pointer events/UI. Window capture consumes active primary Pencil/mouse canvas
contacts before document/canvas modelling handlers. Fingers pass through, existing-touch
blocks Pencil, palms arriving during a stroke are swallowed through their eventual Up.
Hover/buttonless pen ignored. Controls disabled only during a paint contact and restored
to their previous state. Cancel/lost capture/blur/hidden/resize/settings rollback ONLY
unfinished stroke. Done/Escape keep committed strokes. Tool/context/body/history loss
cancels preview and releases buffers/capture. Native global Undo/Redo exits Paint; reopen
to continue. Paint panel Undo/Redo clicks existing global buttons, no second history.
BFCache cancels live stroke, retains page; ordinary pagehide closes/disposes session.

Each changed completed stroke captures an OWNED resource, checkpoints existing scene
history BEFORE assigning it, and replaces only that object's colourPaint. No-op/cancel
leaves history/Redo intact. Committed pixels are READ-ONLY; preview/raster own copies.
Global history keeps existing50-entry policy; up to~50MiB paint bytes for50 distinct
512² commits plus original mesh/history/browser/GPU costs. Active paint layer+before+
coverage and committed/display copies remain separate, no measured iPad performance claim.
.boxlab v2 original codec/pool/atomic Open handles paint (8MiB unique current raw resource
budget, totalfile32MiB); history not stored across sessions. Existing resource shapes
16..1024 remain storage-compatible; this first authoring/display supports512² only.

Binding is SHA256 of canonical ORIGINAL codec native-UV envelope, after authoritative
UV topology/geometry validation. Identity/names/position coordinates are not binding
inputs: ordinary Move/Rotate/Scale/deformation with unchanged native UV topology keeps
paint attached. Exact UV corner edits/topology changes refuse/hide stale paint; original
UV topology signature remains authoritative, no parallel signature algorithm. Geometry
builder checks safety/finite/corner budgets. Async opening validates same object/resource/
key/current context after digest; canceled/late opens cannot paint a different object.
Stored .898 lab scene hashes or arbitrary .899 opaque IDs are NOT silently rebound.
Stale resources stay stored for Undo/recovery; no Clear/Rebind Paint command in this scope.

Shared paint surface owner disposes geometry/material/texture on original body disposal,
mode cleanup or close. Original render-modes owner supplies active bridge mesh / inactive
object mesh; Studio/Solid/UV Image show validated colour, diagnostic modes retain original
look. Locked objects may display but cannot paint. Async display keeps Solid until bound
and ready, rejects changed resources/UVs, cannot resurrect after disposal. Mark textures
at most once per dirty frame. Display replaces source backface cue; original input body
geometry/material settings remain owned by renderer. Basic unlit colour is not PBR.

Prevent silent paint loss: original resolveExportMesh now explicitly refuses painted
OBJ/GLB/NOM with 'Save .boxlab' guidance; original Quick OBJ capture owner catches refusal
before legacy download listeners. Full paint export follows after this device gate.
Original Join refuses painted inputs until resource propagation exists. Ordinary Duplicate
shares read-only colour/UV, independent mesh; new strokes COW. No linked/procedural/imported
GLB/material texture bases, layers, seamless projection/island mask, world brush radius,
PBR or native paint export claim. Adjacent islands may bleed, as accepted in lab.

Seven tests cover exact UV binding/position-following, actual Three rays/occlusion,
checkpoint/COW/cancel/no-op/global UndoRedo/project pixels, async stale/canceled opening,
resource/display disposal, real UI window routing/palm/pressure/settings interruption,
original render owner active/live and inactive/locked look/fallback restoration.
Full Node24 2494PASS/0FAIL/0skip. Historical .741 loader assertion migrated to reviewed
asset contract while retaining shell/dynamic-loader equality. No skipped checks. No new
rendered cloud/iPad proof: prior cloud WebGL limitation remains, device gate below.

Manual: native cube Box UVs → File/Paint selected → Pencil colour marks during motion;
fingers orbit/pan/pinch, try both brushes/settings; Done/global UndoRedo/reopen;
Save .boxlab → reload/Open → same paint; ordinary duplicate/edit isolated. UV/topology
editing is intentionally guarded; moving an object keeps paint with unchanged UVs.
Next feedback/refinement, then flattened colour export through ORIGINAL GLB/NOM owners.
