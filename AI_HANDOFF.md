## v0.36.18.582 — bottom status lane + Full Screen + iPad Share/Open In

- User confirmed .581 precision gizmo works.
- Bottom status line was visually obscured by the bottom-left mode dock.
- .582 reserves a dedicated status lane below the mode buttons:
  - selection mode dock is lifted slightly
  - mesh/vert readout and transform status sit in a separate bottom strip
  - left drawer lower bound follows the raised mode dock
- Added Full Screen inside Viewport:
  - uses native Fullscreen API when available
  - if Safari/iPad refuses native fullscreen, falls back to BoxLab focus fullscreen by hiding the BoxLab top bar and expanding viewport to top
  - button toggles to Exit Full Screen
- Added dedicated Export action: `Share / Open In…`
  - builds the same current GLB/OBJ export payload
  - hands the actual file to the iPad/Web Share sheet
  - if Nomad/iPadOS advertises support for that file type it can appear as a destination
  - browser apps cannot force a specific third-party target, so normal Export / Save remains available
  - if file sharing is unavailable, falls back to download
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Prepublish syntax/static regression 12/12 PASS.

Hands-on check:
1. Mesh/vert count is readable below the mode buttons.
2. Move X/Y/Z/etc status is readable at bottom-right and not obscured.
3. Viewport > Full Screen enters native fullscreen where supported or focus fullscreen fallback.
4. Exit Full Screen restores top bar/layout cleanly.
5. File > Export > Share / Open In… opens the iPad share sheet with the GLB/OBJ file attached.
6. Check whether Nomad appears as a compatible destination for GLB on this iPad.
7. Normal Export / Save remains unchanged.

