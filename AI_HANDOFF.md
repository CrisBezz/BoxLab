## v0.36.18.631 — global release ownership above gizmo overlays

Current release:
- Visible/app version: v0.36.18.631
- Release manifest: version.json = 0.36.18.631
- Release code/test chain culminates at c140ebc532cd93a41936bf8a16512ad25fd42ecd; later commits are handoff/checklist/history only.

Why .631 exists:
- Hands-on .630 showed ordinary Face/Edge taps could turn into delayed Loop/Face Loop selections.
- Root cause is a release-ownership hole: selecting a component can make Total Gizmo appear after canvas pointerdown, so pointerup may target the gizmo instead of canvas.
- Face Hold / Edge Hold were only cancelled by canvas pointerup, leaving their 420 ms timers alive after a released tap.
- pendingPaint had the same problem and could survive into a later Pencil gesture if pointerId was reused.

.631 ownership fix:
- main.js now finishes/cancels Face Hold and Edge Hold from window capture pointerup/pointercancel.
- edge-paint-select.js now clears pending/active Paint Select from window capture pointerup/pointercancel.
- This follows the protected interaction rule already established by the .592 gizmo completion fix: global completion that must survive lower-level event owners belongs at window capture.
- No Loop/Ring candidate generation or selection maths changed.
- No Total Gizmo transform maths changed.
- No Group/Multi routing changed.

Static verification:
- PASS Face/Edge hold release uses window capture.
- PASS Face/Edge hold cancel uses window capture.
- PASS pending Paint release uses window capture.
- PASS pending Paint cancel uses window capture.
- PASS main.js and edge-paint-select.js are pinned to .631.
- PASS visible/release manifest version is .631.
- PASS src/multi-object-transform.js?v=0.36.1.0 remains unchanged.
- Regression file: tests/global-component-release-631.test.mjs.

Immediate hands-on test:
1. Face mode: single Pencil tap an unselected face, release immediately. It must select only that face and must NOT expand to Face Loop after the Pencil is already up.
2. Edge mode: single Pencil tap an unselected edge, release immediately. It must select only that edge and must NOT generate Loop/Ring selection after release.
3. Face mode: deliberate stationary long-press (>420 ms) should still preview the first valid Face candidate; sideways scrub browses candidates; release keeps current candidate.
4. Edge mode: deliberate stationary long-press should still enter Loop/Ring browser; sideways scrub browses; release keeps current candidate.
5. Intentional drag across unselected components should still activate Paint Select.
6. Quick gizmo + Group/Multi regression only if 1–5 pass.

If ordinary taps still generate loops in .631:
- Turn Gesture Debug ON and capture the short trace for one Face tap and one Edge tap.
- Specifically look for FACE HOLD POINTERUP before FACE HOLD TIMER, and whether the logged pointerup target is a gizmo element.
- Do not change hold thresholds or loop candidate logic until release ownership is disproven.

Protected baselines:
- .615 unified semantic gizmo is protected.
- .616 Group/Multi routing is protected.
- src/multi-object-transform.js?v=0.36.1.0 is explicitly protected and unchanged.
- iPad/Pencil navigation baseline remains one-finger orbit, two-finger pan, pinch zoom, two-finger tap Undo, three-finger tap Redo, no-jump pivot, persistent selections.
