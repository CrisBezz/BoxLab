# v0.36.18.453

Recovery build after rejected v0.36.18.452.

- Restores `src/render-modes.js` exactly to the confirmed-good v0.36.18.451 runtime.
- Keeps the dormant `src/facegroup-colours-core.js` from v0.36.18.451.
- No Facegroups viewport wiring in this recovery build.
- v0.36.18.452 is rejected because its integration patch accidentally replaced existing render-mode runtime code and failed to load.

Sentinels: load, Studio, orbit/pan/zoom, Extrude, Inset, Edge Bevel, Vertex Bevel.
