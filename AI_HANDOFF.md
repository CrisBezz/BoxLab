## v0.36.18.618 — single owner for component taps

- .617 hands-on FAIL: double-tap / triple-tap did not work.
- Root cause confirmed in main.js:
  - .617 added a dedicated modeless component tap pointerup owner.
  - legacy endDrag() still also interpreted component pointerup as tap deselect.
  - the same release could therefore be processed twice.
- .618 ownership cleanup:
  - component tap selection / deselection / multi-tap expansion is owned only by the modeless tap handler.
  - endDrag() no longer toggles component selection.
  - endDrag() now owns only actual component transform completion.
- Intended gesture semantics remain:
  - single tap unselected -> additive select
  - single tap selected -> remove
  - double-tap same component -> existing Grow command
  - triple-tap same component -> existing Connected command
- Drag/hold/timeout/background/mode change still break the tap chain.
- Edge long-press/scrub Loop/Ring untouched.
- .615/.616 gizmo and Group/Multi routing untouched.
- Protected src/multi-object-transform.js?v=0.36.1.0 unchanged.
- HTML shell, main.js pin and version.json synced to 0.36.18.618.

Hands-on checks:
1. Face double-tap -> Grow.
2. Face triple-tap -> Connected.
3. Edge double/triple tap.
4. Vertex double/triple tap.
5. Single tap selected component still removes.
6. Deliberate component drag still transforms and does not toggle selection.
7. Edge long-hold/scrub regression.
8. Gizmo and Group/Multi regression.
