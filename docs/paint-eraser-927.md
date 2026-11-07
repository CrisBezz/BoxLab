# Eraser and scalar hints — .927

Tool → Eraser uses original Pencil stroke sampling, size/hardness/pressure/opacity
and maximum contact coverage. On a colour overlay it removes alpha to reveal lower
layers; retained RGB and underlying layers remain unchanged. Base resets to white.
Roughness resets255, Metalness0; masks reveal, respecting inversion. Image colour
remains retained; erase its mask or remove its layer with existing commands.

Settings/target changes, cancel, body loss and failed commit restore original pixels.
Existing one-checkpoint Undo/Redo, copy-on-write, budgets, editable Save/Open and
flattened native handoff remain. Erasing does not delete resources or paint scene
opacity. Returning Brush restores the user's colour; accepted Tap Fill stays intact.

Metalness/roughness controls now put help BELOW the slider/readout in a separate
grid row. Explicit endpoints prevent255 being joined to “Black”. User926PASS protects
Tap Fill; screenshot clarifies earlier inversion confusion. Reflection preview failure
is independent and remains unresolved; no new lighting claim here.

Manual: check0/255 labels, erase overlay/UndoRedo, Base/scalar defaults and return to
Brush/Fill. Next bounded PNG alpha tips, then UV-safe blur/smudge through same owners.
