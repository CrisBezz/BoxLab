# BoxLab Beta 5 Release Checklist

Release candidate line: **v0.36.18.536+**

Purpose: freeze the post-Beta-4 modelling/UI baseline after the Face/Repeat ownership repair chain and the wider Phase D/E/F work now on main.

## Release rule

From this point until Beta 5 is frozen:
- no new modelling features
- fix only reproducible release-blocking regressions
- keep `src/multi-object-transform.js?v=0.36.1.0` untouched
- keep the v0.36.18.535 Face/Repeat ownership rules protected
- remove diagnostics / presentation debris only when behavior-neutral

## 1. Navigation / selection

- [x] one-finger orbit
- [x] two-finger pan
- [x] pinch zoom
- [x] two-finger tap Undo
- [x] three-finger tap Redo
- [ ] no-jump orbit pivot
- [ ] persistent component selection during navigation
- [x] Vertex / Edge / Face / Object mode switching
- [x] Visible / Through selection depth
- [x] deliberate single-Face selection remains authoritative
- [x] deliberate multi-Face selection remains authoritative
- [x] immediate sequential A -> B Extrude remains supported

## 2. Face modelling — RELEASE BLOCKER SET

- [x] ordinary Face Extrude
- [x] connected multi-face Extrude
- [x] Inset
- [ ] multi-face Inset
- [x] Repeat Extrude
- [x] Repeat Inset
- [ ] Repeat stays armed for multiple taps
- [x] newest real Face operation replaces armed Repeat
- [ ] Knife
- [ ] Extract
- [ ] Face Delete
- [ ] normal Through
- [ ] Through into an existing cavity
- [ ] continuing Through to a farther outer wall
- [ ] invalid Through rolls back cleanly

## 3. Vertex / Edge modelling — recent Beta 5 polish

- [x] Vertex Bevel + Exact %
- [x] Vertex Merge to First really merges to first
- [x] Vertex Slide
- [x] Build Edge
- [x] Edge Bevel
- [x] Edge Slide + Slide %
- [x] Edge Slide and Offset Loop cannot remain armed together
- [x] Offset Loop
- [x] Edge Extrude starts with Move (Plane default not required for Beta 5 release)
- [x] repeated Edge Extrude ribbon pulls
- [x] Sweep activation / Follow Edges
- [ ] Loop Cut
- [ ] Face Split
- [ ] Bridge / Fill / Grid Fill basic smoke

## 4. Construction tools added/matured since Beta 4

- [ ] Symmetry / Bisect Apply + Cancel
- [ ] Symmetry Align to Face / Flip Plane
- [ ] Surface Transform face-to-face placement
- [ ] Insert Tool linked-instance placement
- [ ] Sweep simple profile/path Apply
- [ ] Array endpoint/count Apply
- [ ] Solidify
- [ ] Shell — first-press launch retest on v0.36.18.537
- [ ] Revolve Profile
- [ ] legacy Edge Revolve / Lathe basic smoke
- [ ] Tool Session drawer stays owned during active construction

## 5. Object / Multi / Group / Boolean

- [ ] ordinary Duplicate independent
- [ ] Linked Duplicate shares geometry / independent placement
- [ ] Make Unique
- [ ] Multi Move / Scale / Rotate
- [ ] Group create / rename / visibility / lock / ungroup
- [ ] Join
- [ ] Boolean Union
- [ ] Boolean Cut
- [ ] Boolean Intersect
- [ ] Boolean one-step Undo
- [ ] Boolean Swap keeps Active Tools available
- [ ] object selection tint remains normal after construction tools

## 6. Mesh Health / import / export

- [ ] Mesh Health inspection
- [ ] Safe Repair
- [ ] Auto Close on simple valid boundary loop
- [ ] Unify Winding / Flip Normals / Triangulate
- [ ] editable OBJ import
- [ ] Reference import stays read-only
- [ ] OBJ group / facegroup preservation
- [ ] Facegroups Render Look
- [ ] Base OBJ export
- [ ] SubD OBJ export
- [ ] export preflight does not block valid mesh export

## 7. iPad UI / presentation

- [ ] no Safari blue-selection wash / native callout
- [ ] File menu fits viewport and scrolls internally
- [ ] Vertex / Edge / Face tool layouts do not jump when tools arm
- [ ] progressive controls appear beneath their owning tool
- [ ] Active Tools drawer does not unexpectedly collapse during Tool Sessions
- [ ] Studio remains default and multi-object lighting looks correct
- [ ] temporary FACE DEBUG overlay is gone

## Freeze procedure

1. Complete the hands-on release gate on iPad Safari.
2. Fix only concrete release blockers.
3. Confirm final main version and exact commit SHA.
4. Copy the approved tree to `/beta-5/`.
5. Record the frozen source SHA in `AI_HANDOFF.md`, `DEV_HISTORY.md`, `ROADMAP.md`, and this checklist.
6. Verify both:
   - live main: https://crisbezz.github.io/BoxLab/
   - frozen Beta 5: https://crisbezz.github.io/BoxLab/beta-5/
7. Smoke-test both URLs after Pages deployment.
8. Resume normal Phase E/F development only after Beta 5 freeze is confirmed.
