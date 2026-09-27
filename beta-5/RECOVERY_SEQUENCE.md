# Facegroup recovery sequence

- .451 PASS: dormant facegroup colour core; modelling sentinels pass.
- .452 REJECTED: viewport wiring patch failed to load and unintentionally replaced existing render runtime code.
- .453 RECOVERY: exact .451 `src/render-modes.js` restored; dormant colour core retained.

Next integration must be additive against .453 and must preserve existing render functions byte-for-byte outside minimal insertion points.
