## v0.36.18.580 — clear stranded Total Gizmo hover/active state

- User confirmed .579 projected rings look correct.
- Remaining issue: after interacting with a rotation ring, it stayed thicker/highlighted.
- Root cause: when the gizmo forwards a drag to the viewport canvas, pointer capture can prevent the invisible hit proxy from receiving its normal pointerleave event. The visible ring therefore retained `hover-proxy`.
- .580 adds centralized transient-state cleanup:
  - clears `active`
  - clears `muted`
  - clears `hover-proxy`
  - runs on transform finish/cancel
  - includes a pointerleave safety cleanup when no gizmo drag is active
- No transform math or projected ring geometry changed.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Syntax/static regression 5/5 PASS.

Hands-on check:
1. Hover ring => temporary thick highlight.
2. Drag/release ring => ring returns to normal thin idle line.
3. Repeat X/Y/Z.
4. Move/scale handles also return to idle after interaction.
5. Projected ring perspective behavior remains unchanged.

