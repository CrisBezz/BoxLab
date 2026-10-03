## v0.36.18.680 — Total Gizmo parse regression fix

Current release:
- v0.36.18.680

Hands-on protected:
- .670 radial Crease selection-first workflow: PERFECT / PASS.
- .675 navigation recovery: good for now / provisional PASS.
- .676 guided radial Edge Bridge: PASS.
- .677 Edge radial one-shot cleanup: PASS.
- .678 Duplicate Faces: works great and hands off to Object gizmo.

.679 intent:
- background tap should dismiss Object transform gizmo while preserving object selection.
- tapping object again should restore gizmo.

.679 regression:
- Total Gizmo disappeared completely.

Root cause:
- .679 accidentally introduced a second top-level `const canvas=document.querySelector('#viewport')` inside total-gizmo.js.
- Duplicate lexical declaration caused the entire module to fail parsing, so no gizmo could initialise.

.680:
- removes duplicate canvas declaration.
- reuses the existing canvas constant already owned by total-gizmo.js.
- preserves .679 Object transform dismissed-state logic unchanged.

Immediate hands-on:
1. Duplicate Face(s).
2. Object gizmo must appear immediately again.
3. Move duplicate.
4. Tap empty background -> gizmo should dismiss.
5. Tap duplicate object -> gizmo should reappear.
6. Select another object -> gizmo should appear normally.

Protected:
- Duplicate Faces semantics.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
