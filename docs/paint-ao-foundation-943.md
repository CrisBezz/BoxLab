# Object-only AO foundation (.943)

## .943 — read-only object AO bake foundation — 22 October 2026 (Brisbane)

User .942 PASS remains protected. Audit found no existing AO baker. New
`src/paint-ao-bake.js` uses original preview triangle ownership/triangle graph,
original paint-filter-domain texel raster and Three Ray.intersectTriangle. The
filter domain optionally returns its existing transient triangle map; ordinary
brush callers retain exact return shape and allocations. No second triangulator,
UV rasterizer, adjacency, brush, history, scene resource or export owner.

Pure synchronous object-local bake returns owned linear R8 visibility and separate
coverage, UV-v0-first. White=unoccluded; uncovered texels white/coverage0. Deterministic
cosine-weighted hemisphere samples, double-sided same-object blockers, source winding
normal, normalized object-diagonal radius/bias. Size16–128/default64, samples4–64/
default16, radius .001–2/default.25 of diagonal. Conservative8M ray/triangle-test
preflight plus original2M UV scan cap; excess complexity refuses with no scene writes.
Normalized private graph points only; source mesh/UV/geometry remain unchanged.
No scene-neighbour, ground-plane, world-transform, rendered SSAO or albedo bake yet.
No main-app AO import/button/resource/persistence/export change or device-performance
claim. This intentionally low-resolution foundation is NOT a new paint resolution.

Five new regression tests cover opt-in exact ownership, white open plane/coverage/
determinism/copy isolation, facing blockers/radius/double-sided rays, supported scale/
translation/rotated UVs, stale/invalid/overlap/work refusals and source preservation.
Tiny1e-8 source fixture was rejected by the ORIGINAL preview builder before baking;
scale tests use accepted .01–1e8 geometry instead, no builder tolerance change.
Read `docs/paint-ao-foundation-943.md`. Main painter reverse loader chain + shell/
recovery pins943 reviewed; Lab/main/cage/Multi1.0/frozen algorithms unchanged.

Next: original Paint layer/history transaction for an explicit non-destructive AO
Multiply layer, with cancellation/stale/pool/checkpoint guards and visible controls,
then iPad appearance/latency testing. Do not imply AO UI acceptance from pure tests.
Alpha929/reflection-preview gates remain independently unresolved. No new AO hands-on
test exists in943; existing Smudge/Paint UndoRedo/SaveOpen remains the nearby baseline.
Validation/publication evidence follows; do not infer completion before verification.
