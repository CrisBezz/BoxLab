

# .1174 — Mode Paint and optional top-left panels — 16 November 2026

User confirms .1173 PASS; protect navigator size, lighting and navigation. Move the original Paint entry into Mode Select, retaining the UV painter and Done owner, with an active Paint highlight. VIEW General Settings adds persisted Mode select at top left and Select options at top left choices alongside Snap. Original panels remain in place; measured widths place enabled panels horizontally in Mode / Snap / Select order, with 8px top/left inset and 8px gaps. Disabled choices retain bottom placement. No modelling, history, Multi1.0 or Helios changes.

Validation: full local suite 3,462/3,462 PASS, zero failures/cancelled/skips (104.616s); final Paint/release focused 8/8 PASS, placement/preferences 3/3 PASS and shell/toolbar/release 25/25 PASS. Syntax and diff checks pass. Browser visual run was unavailable because Chromium could not create its process singleton socket; no native iPad acceptance claimed. Initial stale release/CSS assertions were corrected without removing behavioral coverage.

Device checks: Paint from Mode Select then Done; toggle each placement; enable all three and inspect ordering/gaps; reload and rotate to verify persistence and spacing. Publication is via the connected GitHub release branch, followed by a guarded fast-forward of main and live-byte verification.

## .1174 publication verified

Runtime `c49bf4ba625f0d0cde60a1579539493e9e052c8a` is on main. Pages `43842223919` completed successfully. Cache-busted live version.json, index.html, general-settings.js and viewport-paint.js byte-match the tested checkout. Full local regression: 3,462/3,462 PASS; final Paint highlight/release checks: 8/8 PASS. Hosted Topology `43842225103` was still running at this evidence point; no hosted PASS claimed. Ready for iPad checks listed below; .1173 user PASS protected.
