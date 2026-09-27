# BoxLab Beta 3 Release Checklist

Release: **v0.36.18.371**

Status: **APPROVED / FROZEN** on 2026-09-20 after user hands-on iPad regression pass.

Frozen public checkpoint: `https://crisbezz.github.io/BoxLab/beta-3/`

Approved code-bearing release commit: `c17fb0f996f406449975a1add5b774eadc30e529`

Freeze merge commit: `a227042e2bd2972c96361aedf7840bdcc62c78bb`

Purpose: freeze a user-tested Beta 3 checkpoint from the current modelling/object-workflow baseline before Phase D construction tools begin.

## Release gate

Beta 3 can be frozen only when all of the following user-facing checks pass on iPad Safari:

### 1. Navigation / selection
- [ ] one-finger orbit
- [ ] two-finger pan
- [ ] pinch zoom
- [ ] two-finger tap Undo
- [ ] three-finger tap Redo
- [ ] no-jump orbit pivot
- [ ] Face multi-select works immediately after a fresh load
- [ ] Object ↔ Vertex ↔ Edge ↔ Face mode switching preserves expected visible objects/selections

### 2. Core modelling
- [ ] Face Extrude
- [ ] connected multi-face Extrude
- [ ] Inset
- [ ] Through normal single target
- [ ] Through into / through an existing cavity
- [ ] Knife
- [ ] Loop Cut
- [ ] Edge Bevel
- [ ] Vertex Bevel
- [ ] Edge Slide / Vertex Slide
- [ ] Bridge
- [ ] Extract
- [ ] Offset Loop
- [ ] Fill / Grid Fill
- [ ] Flip Edge
- [ ] Clean for SubD on known-good and irregular test meshes

### 3. Object / linked-instance workflow
- [ ] ordinary Duplicate stays independent
- [ ] Linked Duplicate A → B → C shares edits but keeps independent placement
- [ ] linked Extrude persists after release and propagates to peers
- [ ] finger-switching linked peers keeps all visible and navigation remains correct
- [ ] Make Unique detaches only the intended linked object
- [ ] Move / Scale / Rotate work for single objects
- [ ] Move / Scale / Rotate work for whole Groups
- [ ] Multi Duplicate / Linked Duplicate / Make Unique behave as expected
- [ ] per-object SubD toggle works from the Outliner

### 4. Group / Boolean workflow
- [ ] Group create / rename / collapse / visibility / lock / ungroup
- [ ] ordinary two-object Boolean Union / Cut / Intersect
- [ ] Boolean Swap keeps Active Tools open
- [ ] Group A + Group B selection works
- [ ] Group Boolean Union / Cut / Intersect on simple closed solids
- [ ] Group Boolean Undo restores original Groups and hierarchy
- [ ] deleting source Groups does not affect an independently selected Boolean result

### 5. History / persistence
- [ ] Undo / Redo across ordinary modelling
- [ ] Undo / Redo across Object operations
- [ ] Undo / Redo across Join / Boolean / Group Boolean
- [ ] Save / Load
- [ ] Quickload
- [ ] Group names / hierarchy survive restore
- [ ] linked-instance metadata survives restore where applicable

### 6. Import / export / presentation
- [ ] editable mesh import
- [ ] Reference mesh import remains read-only
- [ ] Base OBJ export
- [ ] SubD OBJ export
- [ ] Studio mode renders multiple objects correctly
- [ ] SubD Preview levels 1–4
- [ ] no Safari blue-selection wash / native callout during normal modelling

## Freeze procedure after user approval

1. Confirm current main remains **v0.36.18.371** or contains only explicitly approved release-fix commits.
2. Record the exact release commit SHA in `AI_HANDOFF.md` and `DEV_HISTORY.md`.
3. Copy the approved release tree into the frozen GitHub Pages checkpoint at:
   - `/beta-3/`
4. Verify:
   - live app remains at `https://crisbezz.github.io/BoxLab/`
   - frozen Beta 3 opens at `https://crisbezz.github.io/BoxLab/beta-3/`
5. Smoke-test both URLs on iPad Safari.
6. Begin post-Beta-3 work only after the frozen checkpoint is confirmed.

## Scope rule

Do **not** add new modelling features during Beta 3 release testing. Fix only reproducible regressions that block the release.
