# Paint left dock and dedicated Object UV entry — .916, 19 October 2026

User .915 PASS protects numeric RGB/HSB/hex and preceding paint/UV behaviours.
User then prioritised UI obstruction: Paint to the left, compact controls, and a UV
button in the Object radial. This supersedes the proposed roughness foundation for
this build. Roughness audit was read-only; no new material resource/schema exists.

## Paint

The existing `tool-session-ui.js` controller makes `uv-paint` the explicit exception
to the general top-centre/wide popup rule. Its original panel docks 8px from viewport
left/top12px, width272px, max-width viewport−16px, max-height viewport−100px, scrollable.
It bypasses the wide-action reparenting; sticky Undo/Redo/Done stays in the paint footer.
Entering another tool clears Paint width and calls the ORIGINAL shared positioner.
`tool-session-panel-position.js`/wide layout remain unchanged on732, not globally repinned.

`viewport-paint.js` retains all original data-paint controls/IDs/listeners. Colour,
Size, Opacity, layer selector and Add Layer/Image remain exposed. Brush settings,
RGB/HSB/hex, layer settings and masks use initially collapsed native details sections.
Image placement controls appear only during staging; existing status errors remain.
No brush/kernel/pointer/history/pool/colour binding/image projection changes. Finger
navigation and the Insert-derived Pencil image cycle remain with their original owners.

## UV

The existing Mesh Health owner already owns projection, inspector and workspace.
Add its `uvToolsBtn` launcher and a new Object outer90°/230px UV sector; preserve every
existing sector location. The original radial adapter dispatches its button and tracks
`uv-tools` lifecycle through the SAME `__boxlabMeshHealth` API. No second UV editor,
projection kernel/history, copied resource or raw pointer owner added.

The same original session panel has two modes: `mesh-health` shows diagnostics/repair;
`uv-tools` shows UV projection/summary/Open UV Editor with Refresh/Close, hides diagnostics,
and skips topology health analysis. All original UV controls/workspace/payload guards
are reused. UV-session context/history changes refresh the UV report; background/mode
exit closes the SAME owner and shared session. Workspace Back to3D ends the UV session.
Switching modes closes the old session before changing its ID, avoiding stale ownership.

Two focused integration checks cover actual session-controller left placement, original
node/footer identity and next-tool centre restoration; UV-only launch, cone projection
through original mapper/history, Undo/Redo, close and Mesh Health mode restoration.
Existing Object radial tests now include UV and same-owner multi-session lifecycle;
workspace extraction harness supplies the new sessionId variable, preserving all checks.
Full existing paint/mask/image/UV/radial/history regressions remain active. Node checks
are not rendered Safari/iPad/Pencil acceptance. Device: dock size/access, section expansion,
image placement and Object radial UV→project→editor→Back/Close; Mesh Health repairs intact.
