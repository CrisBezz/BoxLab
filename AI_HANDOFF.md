## v0.36.18.643 — Selection Hub Sweep viewport session

Current release:
- Visible/app version: v0.36.18.643
- version.json and HTML shell title are synced to .643.

Hands-on status:
- .642 Face Selection Hub v1:
  - Extrude / Inset / Knife: BIG PASS
  - Delete / Duplicate / Extract: BIG PASS
  - Shell / Sweep launch and work, but need their extra session controls moved toward viewport workflow.

.643 scope:
- Sweep is the first Selection Hub session-tool prototype.
- sweep-path.js remains the only authoritative Sweep implementation.
- New selection-hub-sweep-session.js is UI-only proxy/state mirroring.

Radial Sweep flow:
1. Face selection -> puck -> gizmo -> tools ring.
2. Choose Sweep.
3. Selection Hub hides exactly as in .642.
4. Existing Face Sweep launcher starts the real Sweep session.
5. Floating Sweep palette appears beside the selection.

Viewport palette:
- Tabs: Profile / Path / Finish
- Profile: Circle, Rectangle, Draw, Use Selection, Size, Sides, Edit, Closed, Undo, Clear
- Path: Follow Edges, Draw Path, Edit, Undo, Delete, Clear
- Finish: Caps, Apply Sweep
- Cancel Sweep always available
- Buttons proxy the existing #sweep* controls.
- Range values/events forward to existing #sweepProfileSize / #sweepProfileSides.
- Palette mirrors active/disabled/stage/output state from the original Sweep controls.
- Apply/Cancel ending the authoritative session hides the viewport palette.
- Sweep launched normally from the left toolbar does not force the viewport palette open.

Immediate hands-on:
1. Face -> Selection Hub -> Sweep.
2. Expect hub to disappear and compact Sweep palette to appear beside selection.
3. Profile: choose Circle; drag Size and Sides sliders. Live profile should update.
4. Switch Path; use Follow Edges and create a short path without touching left drawer.
5. Switch Finish; toggle Caps if desired and Apply.
6. Confirm palette disappears and finished Sweep remains.
7. Repeat once and Cancel; scene should restore through existing Sweep cancellation.
8. Check ordinary left-toolbar Sweep still works as before.

Protected:
- .640 interaction checkpoint.
- .642 Selection Hub direct-tool behavior.
- sweep-path.js geometry/session owner unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
