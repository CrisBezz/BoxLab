## v0.36.18.673 — touch navigation stale-pointer fix

Current release:
- v0.36.18.673

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 closed Face Boundary candidates: AWESOME / PASS.
- .661 Loop Cut slide ownership + Bevel reset: PASS.
- .662 radial Bevel viewport session: PASS.
- .663/.664 Edge Extrude radial workflow: works really well.
- .670 radial Crease selection-first workflow: PERFECT / PASS.
- .671/.672 radial Offset / Edge Slide viewport-session work in progress.

User-reported regression at .672:
- Pencil can orbit.
- Two-finger pan and pinch zoom fail.
- Single finger pans/zooms simultaneously.
- Gesture Debug shows multiple touch pointerdowns reaching the viewport.

Root cause hypothesis addressed in .673:
- Some modelling tools stopImmediatePropagation on pointerup/pointercancel.
- OrbitControls can therefore miss a touch release and retain a stale pointer internally.
- Next single touch is then interpreted as part of a multi-touch DOLLY_PAN gesture, matching the observed single-finger pan/zoom behaviour.

.673:
- pencil-orbit-gate now captures OrbitControls pointerup and pointercancel listeners during registration.
- Adds an early capture-phase release feed for touch and pen pointerup/pointercancel, installed before modelling tools.
- OrbitControls therefore receives release before later modelling capture handlers can swallow it.
- Wrapped Orbit release listener skips duplicate delivery when early-fed.
- Pencil navigation cleanup still runs.
- No modelling tool pointerdown/move ownership changed.
- Protected navigation mapping remains:
  - ONE = ROTATE
  - TWO = DOLLY_PAN
  - Pencil orbit preserved.

Immediate hands-on:
1. Fresh load .673.
2. One finger: orbit only.
3. Two fingers drag together: pan.
4. Two-finger pinch: zoom.
5. Pencil: orbit.
6. Exercise several modelling tools that capture pointerup, then retest 1-5.
7. Confirm no single-finger combined pan/zoom after tool use.
8. Gesture Debug may remain enabled for this retest.

Protected:
- all current modelling tool gesture ownership.
- .670 Crease, .671 Offset, .672 Slide viewport sessions.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
