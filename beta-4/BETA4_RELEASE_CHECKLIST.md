# BoxLab Beta 4 Release Checklist

Release checkpoint: **v0.36.18.427**

Frozen source commit: `ec45b3ba208ef3ffa40015d7a3b62666c63f379e`

Purpose: freeze the user-tested post-Beta-3 modelling baseline before the next major construction-tool phase.

## Core regression baseline

- [x] automated topology regression passed for v0.36.18.427 — run 35713131703
- [x] one-finger orbit / two-finger pan / pinch zoom protected
- [x] two-finger Undo / three-finger Redo protected
- [x] persistent component selection during navigation protected
- [x] mature Through topology remains protected
- [x] protected multi-object transform remains pinned at v0.36.1.0

## Phase D modelling included

- [x] Sweep Tool Session workflow
- [x] Array Tool Session workflow
- [x] Solidify / Shell Tool Sessions
- [x] Revolve Profile Tool Session
- [x] direct Edge Extrude
- [x] repeated Edge Extrude ribbon pulls
- [x] Edge Extrude X / Y / Z / Auto constraints
- [x] Edge Extrude Plane constraint
- [x] Edge Extrude selection handoff while tool/constraint remain armed

## Release smoke checks

- [ ] open Beta 4 fixed URL on iPad Safari
- [ ] orbit / pan / zoom
- [ ] Face Extrude + Inset
- [ ] Through a simple target
- [ ] Edge Bevel + Vertex Bevel
- [ ] Sweep simple profile/path
- [ ] Array apply
- [ ] Solidify / Shell
- [ ] Revolve Profile
- [ ] Edge Extrude repeated ribbon pull
- [ ] Edge Extrude Plane pull
- [ ] switch directly from one boundary edge to another while Extrude remains armed
- [ ] Undo / Redo
- [ ] Base OBJ / SubD OBJ export

## Freeze rule

`/beta-4/` is immutable during normal development. Future work continues on live `main`; only an explicitly approved emergency release fix may change the frozen Beta 4 tree.
