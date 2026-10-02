## v0.36.18.658 — contextual radial availability

Current release:
- v0.36.18.658

Hands-on protected:
- .652 Face-direct background Pencil yield: PERFECT / PASS.
- .653 Shell viewport session: PASS.
- .657 Edge hold closed Face Boundary candidates: AWESOME / PASS.

Why .658:
- User noted radial tool rings gave no indication whether a tool was unavailable for the current selection.
- This affected both Edge and Face rings.

.658:
- Every radial sector mirrors the authoritative DOM target at runtime.
- State mapping:
  - enabled target => normal radial sector
  - disabled or missing target => disabled radial sector, reduced opacity/saturation, × marker
  - target .active or aria-pressed=true => radial active highlight
- Disabled sectors remain in-place to preserve radial muscle memory.
- Disabled sector cannot dispatch target click.
- State resync occurs on:
  - tools-ring open
  - boxlab-bridge-state
  - click
  - pointerup
  - transform-tool changes

Immediate hands-on:
1. Face mode: open radial ring with a selection where some tools are invalid.
2. Confirm invalid sectors are visibly dimmed/× but stay in their positions.
3. Tap invalid sector: nothing should launch.
4. Change to a selection where that tool becomes valid; reopen ring and confirm it becomes normal.
5. Edge mode: repeat with Bridge / Offset / Extrude or another selection-sensitive tool.
6. Confirm valid tools still launch normally.
7. If a tool is armed/active, matching radial sector should highlight.

Next after PASS:
- Edge Extrude gizmo-assisted axis/plane control.
- Bevel viewport settings palette.

Protected:
- .640 modeless selection checkpoint.
- .643 Sweep viewport session.
- .652 Face-direct background-yield.
- .653 Shell viewport session.
- .654 Edge Selection Hub structure.
- .657 Edge hold browser.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
