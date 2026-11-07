# Invisible but clickable controls — .966 supplied evidence

User's report captured 2026-10-25T10:22:08.103Z. The user observes controls still
respond when tapping their invisible positions; switching to ChatGPT and back to
the browser restores the interface. Refresh can directly enter the failed state.

At capture: Paint inactive, no tool session, navigation enabled, viewport1366×886,
canvas1366×826CSS /2732×1652 physical atDPR2. The main/header geometry is correct.

Every right toolbar control exists, is on-screen, enabled, visible, opacity1 and
pointer-events auto. No transform, filter or clip path is recorded on those
controls. Centre hit stacks return their actual SVG/button nodes. The report records
an Undo-button click reaching window bubble at10982ms, and VIEW summary click at
13625ms. Thus the supplied evidence and user's visual observation distinguish a
painting/compositing failure from absent, disabled or offscreen controls.

Startup changes the toolbar from134.56px wide at459ms to317.61px at649ms as the
additional controls and icons load. This is correct DOM layout; whether it triggers
the browser painting defect is a hypothesis, not a reproduced engine-level cause.

.967 isolates the viewport stack below the existing header, contains only the
canvas painting bounds, and hints separate UI composition using will-change:opacity.
UI menus keep their original fixed positioning and overflow. The original sizing
owner now repaints on visible-page return/focus with no synthetic resize or polling.
The debug snapshot exposes contain/isolation/will-change for device verification.

Automated DOM/style/owner checks cannot certify iPad compositing. Retest repeated
fresh refresh, right toolbar/Object Browser/status, UV/Paint transitions and app
switch return. Keep the defect open until the user confirms visual recovery.
