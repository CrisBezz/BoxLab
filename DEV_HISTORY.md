

# .1174 — Mode Paint and optional top-left panels — 16 November 2026

User confirms .1173 PASS; protect navigator size, lighting and navigation. Move the original Paint entry into Mode Select, retaining the UV painter and Done owner, with an active Paint highlight. VIEW General Settings adds persisted Mode select at top left and Select options at top left choices alongside Snap. Original panels remain in place; measured widths place enabled panels horizontally in Mode / Snap / Select order, with 8px top/left inset and 8px gaps. Disabled choices retain bottom placement. No modelling, history, Multi1.0 or Helios changes.

Validation: full local suite 3,462/3,462 PASS, zero failures/cancelled/skips (104.616s); final Paint/release focused 8/8 PASS, placement/preferences 3/3 PASS and shell/toolbar/release 25/25 PASS. Syntax and diff checks pass. Browser visual run was unavailable because Chromium could not create its process singleton socket; no native iPad acceptance claimed. Initial stale release/CSS assertions were corrected without removing behavioral coverage.

Device checks: Paint from Mode Select then Done; toggle each placement; enable all three and inspect ordering/gaps; reload and rotate to verify persistence and spacing. Publication is via the connected GitHub release branch, followed by a guarded fast-forward of main and live-byte verification.

## .1174 publication verified

Runtime `c49bf4ba625f0d0cde60a1579539493e9e052c8a` is on main. Pages `43842223919` completed successfully. Cache-busted live version.json, index.html, general-settings.js and viewport-paint.js byte-match the tested checkout. Full local regression: 3,462/3,462 PASS; final Paint highlight/release checks: 8/8 PASS. Hosted Topology `43842225103` was still running at this evidence point; no hosted PASS claimed. Ready for iPad checks listed below; .1173 user PASS protected.

# .1175 — left-edge panel stack and bottom spacing — 16 November 2026

User rejects .1174 horizontal placement. Enabled top panels now stack VERTICALLY along the left edge in Mode / Snap / Select order; all left edges stay 8px from the viewport and each gap is 8px. Placement measures actual panel heights and updates on resize. Mixed checkbox choices skip panels located at the bottom. Bottom Snap placement now uses the actual shorter Select panel height after Paint moved, eliminating the retired Paint-button gap; when Select is at top, bottom Snap uses its empty rail position. Paint remains in Mode Select, and user explicitly confirms it is visible. No Paint behavior changes.

Final focused placement/preferences/toolbar/release checks: 13/13 PASS; all eight placement combinations and bottom offset are checked. Syntax/diff checks pass. Full local regression: 3,462/3,462 PASS, zero failures/cancelled/skips (119.553s). Final bottom-spacing amendment is covered by the 13/13 focused checks. Publication proof will follow. Preserve .1173 navigator PASS and prior modelling/history/Multi protections. Device: all top enabled gives Mode then Snap then Select down the left; all off gives a tight 8px Snap/Select gap; mixed settings and reload/rotation keep left alignment. Paint opens and Done exits.

## .1175 publication verified

Runtime `32aa77e52631274dbdee9383ddc5f6d3fa8667c4` published on main. Pages `43848212921` completed SUCCESS. Cache-busted live version.json and general-settings.js byte-match the tested checkout; release .1175 confirmed. Full local regression 3,462/3,462 PASS; final amended placement/release checks 13/13 PASS. Hosted Topology `43848213169` was in progress at last query; no hosted PASS claimed. Ready for device checks of vertical left stack, tighter bottom rail gap, mixed choices and persistence. Paint visibility user-confirmed.

# .1176 — close vacant bottom panel slots — 16 November 2026

User confirms .1175 PASS: protect vertical top-left stack, 8px gaps, bottom Snap/Select gap and Paint in Mode Select. When Mode is moved to top, its old bottom reserved height is now released. Bottom Select sits at the original status-lane anchor (desktop 27px / compact 25px plus safe-area policy); bottom Snap follows above it by its actual height + 8px. If Select is also at top, Snap occupies the released Select slot. Existing .1175 measured top ordering and Snap offset already handle moved Snap/Select; the new class-scoped anchor completes all mixed combinations. Returning Mode to bottom restores its accepted reserved slot. Original nodes, listeners, Paint/history/modelling/Multi/Helios untouched.

Focused preferences/placement/toolbar/release checks pass 14/14, including all eight placement combinations, resized heights and both desktop/compact anchor rules. Full local suite and publication evidence follow. Device: Mode only at top => Snap and Select lower with no vacant Mode slot; toggle Snap/Select top choices; restore all bottom; reload/rotate and verify status lane and 8px gaps.

## .1176 publication verified

Runtime `8913f783b1210617092134cfe8e2b5d294cc826c` published on main. Pages `43850878723` completed SUCCESS. Cache-busted live version.json, index.html and general-settings.js byte-match tested checkout. Full local regression 3,463/3,463 PASS, zero failures/cancelled/skips (124.840s); focused placement/toolbar/release 14/14 PASS. Syntax and diff checks pass. Hosted Topology `43850879381` was in progress at last query; no hosted PASS claimed. Device checks ready: Mode-only top lets bottom Select and Snap slide into the released bottom slot; mixed settings, all bottom, reload/rotation and 8px gaps. .1175 user PASS protected.

# .1177 — eliminate pre-module tools and oversized-logo flashes — 16 November 2026

User confirms .1176 PASS; protect accepted mixed top/bottom panel placement and all earlier navigator/Paint/modelling behavior. Reviewed supplied refresh recording: transient old drawer and oversized header logo occur before module styling settles. Root cause in source: Focus drawer display:none only installed by view-modes.js, and header logo 34px dimensions only by topbar-layout.js. Both now exist in the render-blocking viewport-toolbar-shell.css, before body paint; logo also has HTML width=34 height=34 for intrinsic space before image decode. Header alignment/gap matches final layout. Existing html.boxlab-focus-view gate remains; original Focus toggle can reveal tools. No startup timeout, blanket app hiding, second UI/renderer, or gesture/history changes. Original late rules match the early state exactly. Repin changed stylesheet and release/cache closure.

Focused first-paint/release checks 7/7 PASS; new tests check shell Focus state, stylesheet-before-body placement, scoped drawer hiding, original toggle and matching HTML/early/late logo dimensions. Full local regression and publication evidence follow. Native device gate: refresh repeatedly, watch for old tools/oversized logo, toggle Hide Tools off/on, then check accepted panel placement/Paint/navigation. Supplied recording stays out of repo.

## .1177 publication and validation verified

Runtime `6edf877ce79f120526d3ed2184fb45a4f8a4da75` published; Pages `43852201610` completed SUCCESS. Cache-busted live version.json, index.html and viewport-toolbar-shell.css byte-match tested checkout. Full local suite ran 3,465 checks: 3,464 PASS / 1 FAIL (128.560s); sole failure was toolbar-startup-983's exact old logo markup lacking the newly required width/height. Corrected that assertion in `84cb25dca5d396f70619bb87208a17d4addca004`; rerun affected startup/first-paint/release tests 10/10 PASS. No runtime changes followed the full suite. No unqualified rerun-full-suite PASS claimed. Hosted Topology `43852201664` was in progress at last query; no hosted result claimed. Native refresh flash acceptance pending; .1176 user PASS protected. Device checks: repeated refresh with tools hidden, logo stays small; toggle Hide Tools off/on; accepted panel positions and Paint entry remain.
