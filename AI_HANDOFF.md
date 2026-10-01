## v0.36.18.653 — Selection Hub Shell viewport session

Current release:
- v0.36.18.653

Hands-on protected checkpoints:
- .643 Sweep viewport session: AWESOME / PASS.
- .652 Face-direct background Pencil yield: PERFECT / PASS.
  - armed Extrude/Inset + Face hit = repeat modelling.
  - armed Extrude/Inset + Pencil background-down = disarm and same gesture orbits.

.653 scope:
- Shell is now the second Selection Hub session-tool prototype.
- src/shell.js remains authoritative.
- selection-hub-shell-session.js is UI-only proxy/state mirroring.

Radial Shell flow:
1. Face selection -> puck -> gizmo -> tools ring.
2. Choose Shell.
3. Selection Hub hides.
4. Existing #shellFacesBtn launches the real Shell preview/session.
5. Compact Shell palette appears beside selection.

Viewport Shell palette:
- Thickness slider -> proxies #shellThickness input/change.
- Thickness readout -> mirrors #shellThicknessOut.
- Cancel -> proxies #shellCancelBtn.
- Apply Shell -> proxies #shellApplyBtn.
- Existing Shell preview remains the real preview.
- Existing Shell Apply/Cancel/history/session logic remains the owner.
- Palette appears only for radial Shell launches.
- boxlab-tool-session-change shell end hides palette.
- Ordinary left-toolbar Shell remains unchanged.

Immediate hands-on:
1. Select Face -> Selection Hub -> Shell.
2. Expect live Shell preview plus compact viewport palette.
3. Drag Thickness with Pencil; preview should update continuously.
4. Apply Shell without touching left drawer; result should commit and palette disappear.
5. Repeat and Cancel; original should restore and palette disappear.
6. Quick Sweep check if desired.
7. Confirm .652 background-Pencil orbit remains intact after Extrude/Inset.

Protected:
- .640 modeless selection checkpoint.
- .642 Selection Hub.
- .643 Sweep viewport session.
- .652 Face-direct background-yield.
- Shell geometry/session owner untouched.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
