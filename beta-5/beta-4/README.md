# BoxLab Beta 4

Frozen checkpoint: **v0.36.18.427**

Source main commit: `ec45b3ba208ef3ffa40015d7a3b62666c63f379e`

Beta 4 captures the post-Beta-3 Phase D modelling work through the user-approved Edge Extrude workflow.

## Major additions since Beta 3

- Sweep construction workflow with Profile / Path / Finish Tool Session
- Follow Edges rail selection and visible candidate/hot/accepted path feedback
- custom/open/closed Sweep profiles, selected Face/Edge profile launch, 3D geometry snapping
- Linear Array migrated to the shared Tool Session workflow
- Solidify and Shell migrated to Tool Session
- Revolve Profile migrated to Tool Session
- Vertex transform ownership regression fixed
- direct Edge Extrude for boundary and loose edges
- rapid repeated ribbon extrusion with new outer rail automatically selected
- Edge Extrude Free / X / Y / Z / Auto constraints
- Edge Extrude Plane constraint for free movement perpendicular to the grabbed edge
- Edge Extrude live selection handoff so modelling can jump directly between boundary edges while the tool remains armed

## Frozen release rule

The contents of `/beta-4/` are a release checkpoint. Do not change them during normal development. Only an explicitly approved Beta 4 emergency fix may modify this folder.

Live development continues at:

https://crisbezz.github.io/BoxLab/

Frozen Beta 4:

https://crisbezz.github.io/BoxLab/beta-4/
