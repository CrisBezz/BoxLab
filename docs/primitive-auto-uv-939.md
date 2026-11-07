# .939 — UV-ready cube and Add choice

.938 user PASS protects Merge/Flatten/free slots/history/persistence. User now asks
for an initial UV cube and objects added with or without appropriate UVs.

Audit: main creates unit cube, multi-object owns initial object/reset and Add commits;
primitive-ui owns density/preview/history. imported-uv-edit already owns appropriate
Box, PlanarXZ, Cylinder (including cones) and Sphere projections. No Torus unwrap.

Initial/reset owner attaches Box UVs to unchanged cube. Add Cube/Plane/Cylinder/Cone/
Sphere offer checked Generate UVs. UV-enabled creation uses plain Base settings,
Mirror/SubD off, to enable immediate painting; unchecked retains old inheritance.
Torus/Text explicitly add without automatic UVs. Special Curve/Balloon/Revolve/Sweep
launchers remain unchanged; no general unwrap claim or remapping old saved objects.

createNativeUVCandidate stages a private sourceboxlab/version1 face-corner payload
through SAME projection functions. A private module token selects staging instead
of the scene checkpoint; callers cannot bypass history for an existing object.
Candidate built after unit fit and before scene capture/Add. Original Add commits
object and UVs in one checkpoint; cancellation/refusal adds nothing. No second UV
kernel or fake history. Shared mesh-topology-signature.js extracts exact original
import/export identity; both wrappers delegate unchanged format. Startup needs no
exporter global or readiness race. No geometry/UV/resource schema changes.

Native existing restrictions remain: topology changes can stale UVs; evaluated
modifiers and linked resources remain guarded. Plain Add preserves linked workflows.
Production Paint1024, saved512 opt-in, layers/masks/images/budgets/File/native limits
unchanged. Main/cage/Multi1.0/frozen immutable; reviewed changed loader graph939.

Six tests exercise exact startup/reset/unit cube, original density projections,
actual Add toggle/one-step history/cancel/redo/refusal, unsupported objects, actual
project/NOM/GLB UV variants and immediate production1024 painting/persistence.
Original Add/Box/Sphere19PASS and release5PASS. Device checks remain separate.

Hands-on: fresh/reset cube → Paint; UV Editor six islands. Add cylinder/cone/sphere
checked and paint, then add unchecked and inspect absent UVs. Undo/Redo and Save/Open.
Next feedback, then queued Smudge/AO/edge-seam owner audits; no automatic next build.
