# .898 — colour paint resource and Paint Lab Save/Open

This is the next isolated persistence foundation, not painting integration into the
modelling scene. User .897 PASS protects sample outward winding, visible-surface paint,
plane visibility and accepted brush/history/navigation. Main .boxlab resource versions,
scene history and exports remain unchanged.

## User workflow

File → UV Paint Lab → paint → **Save Paint** downloads
`BoxLab-Paint-Lab.boxpaint`. Reset/reload, then **Open Paint** and choose that file in
Files/Downloads. Both candidate textures, actual source sample mesh/UVs, brush settings,
selected candidate and camera position/target restore. A successful Open starts fresh
lab Undo history; subsequent strokes use the accepted paired Undo/Redo. PNG still exports
only the selected flattened texture. Reset/reload clears UNSAVED work; no autosave.

This is a `.boxpaint` LAB SESSION, not `.boxlab`, GLB, NOM or a layered painting format.
Only one opaque colour layer per comparison candidate is currently supported. No seam,
PBR, imported-texture or production-object capability is implied. The iPad file picker
is deliberately unfiltered, like existing BoxLab Open, to avoid unknown-extension UTI
filtering; file magic/version/length/metadata/pixels are validated after selection.

## Reusable colour resource v1

`src/paint-resource.js`, not imported by the production modelling app:

- Explicit version1, channel `baseColor`, sRGB RGBA8, `uv-v0-first` row order,
  width/height16–1024 with exact byte length, opaque alpha255 only.
- Binding is a64hex SHA256 of the embedded scene representation in this lab transport.
  It binds paint to the actual stored geometry/UV context; it is not a second topology
  signature algorithm. Original exporter/UV signatures remain authoritative.
- Capture returns copied pixels; encoding snapshots them BEFORE awaiting Web Crypto.
  Decoding validates descriptor/binding and exact SHA256 before returning owned copies.
  Caller bytes/resources remain independent. Frozen metadata does NOT make typed-array
  contents immutable: committed pixels remain read-only by caller contract and future
  scene edits must use copy-on-write, matching existing BoxLab resource ownership.
- No scene-history stack, browser bitmap codec or project-envelope migration is added.
  These snapshots are a resource boundary, not a claim of production global Undo support.

## Lab container v1

`evaluations/uv-paint/paint-session.js` uses the ORIGINAL encodeBoxlabScene and
 decodeBoxlabScene for one plain native UV sample. No alternative mesh/UV serialization
kernel or forged GLB provenance. Mesh vertices/faces/creases/groups and native resourcev3
UV data are stored explicitly rather than regenerated on Open. Existing native v3 remains
STRICTLY UV-only; paint is in separate lab resources, never sneaked into glbPassthrough.

Binary layout:8-byte ASCII BOXPAINT, uint32LE version1, uint32LE UTF8 JSON header length,
header, then exactly two512² RGBA8 buffers. Header≤1MiB; whole file≤4MiB; one native UV
sample≤2000vertices/2000faces plus original preview20k-corner budget. No external images,
linked/procedural/modifier/reference scene or arbitrary-resource import. Resource bytes
stay in their native UV row order; no PNG/gamma conversion or quantisation on save/load.
The actual standard BoxLab codec validates geometry/native UV envelopes, and the actual
preview builder validates signature/complete channel before display replacement.

The header records version/sample/scene/settings/selection/camera and explicit per-map
resource descriptor, byte length and SHA256. Unsupported/truncated/oversized/trailing data,
wrong alpha/channel/dimensions/binding, invalid camera/settings and altered pixels refuse.
SHA checks detect accidental corruption; this is NOT an authenticated/signature format.
Web Crypto is required; if unavailable, Save/Open report the failure without a weak fallback.

## Atomic replacement / async ownership

All mutable Save inputs (including source scene via original codec) are captured before
first await; continued painting cannot mix old geometry with new pixels in the download.
Open validates bytes/resources/scene, constructs incoming preview geometry, document,
textures and material BEFORE replacing current lab state. Unsupported stale UV data or
staging failure releases new resources and leaves current geometry/pixels/history/view
unchanged. Successful replacement releases old resources once and resets lab history.

Generation/revision guards refuse an Open finishing after another Open, new Pencil contact
(including an unfinished stroke), successful Reset/model replacement, history/settings/
candidate changes or navigation start. Page exit invalidates pending work. Choosing Open
cancels a current preview explicitly, as other lab controls do; an invalid file does not
replace committed work. Opening after user changes the session reports “try Open again”.

Only lab install/reset orchestration changes; original raster, pressure/opacity semantics,
paired history, curve/stroke code and corrected preview triangle owner remain unchanged.
Plane display rotation is reapplied to stored unrotated sample geometry, not saved twice.

## Evidence and next stage

Six new native checks cover copy ownership/integrity, exact three-sample save/load and
in-flight snapshot isolation, malformed/budget/refusal cases, stale/superseded Open,
actual Save/Open controller/download bytes/settings/view/candidate/history continuation,
stale-geometry rollback and a new Pencil contact while loading. Existing lab harness was
extracted into one shared test helper; earlier behavioral assertions retained. Full local
Node24 **2483PASS/0FAIL/0skip**, including original winding/export/resource protections.
Browser file picker/download and rendered Safari acceptance remain a hands-on gate;
Node uses adapted DOM/WebGL/OrbitControls but real resource/scene codecs/Three geometry.

Loader graph: shell/recovery898; standalone lab/index/sample/session898; new resource898;
unchanged paint core/stroke/curve896, exporter897 (internal892), original project codec887.
No new production loader or changed project codec/native resource envelope, modelling
kernel, main gesture owner or frozen beta. Versioned binary resources are additional
bounded Save/Open allocations, separate from existing raw paint/history/GPU budgets.

Next after user feedback: integrate the explicit colour resource with ORIGINAL scene
snapshots/codec/history using copy-on-write and an explicit schema. Then connect actual
selected-object display/input and flattened GLB/native exports through their existing
owners. Do not rename .boxpaint as .boxlab or promise native/global persistence prematurely.
