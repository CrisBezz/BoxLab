## .1043 — Paint contextual help and UI copy audit — 31 October 2026

User requested a lighter Paint controls panel and an app-wide audit of text better
served by tooltips. The Paint owner and existing controls remain authoritative: repeated
Brush/Fill/Blur/Roughness/Metalness explanations leave the floating quick panel and appear
on demand through a small `i` button. The popover supports touch, keyboard focus and
screen-reader description; its content follows the selected tool, Fill scope and paint
channel. No stroke, history, selection or gesture owner changed.

The File-menu NOM note now accurately says native NOM import retains supported material
maps. The app-wide audit identified later candidates in the UV Editor gesture footer,
Mesh Health UV guidance, modelling-session gesture subtitles, and hover-only `title`
explanations. Keep dynamic status/errors, accessible names, import/export outcomes,
destructive/reset warnings and important scope/cap limits visible.

Focused Paint/help, release-contract, release-owner and shell-comparison checks passed.
Full Node suite: 3,086 PASS / 0 FAIL / 0 skipped. Native iPad touch/visual acceptance is
pending. App changes are published on GitHub `main` at
`3e3f8c95c3fd62400f0d1ccc22c514cad1977d49`. Pages deployment workflow 41246780287
succeeded; Topology regression workflow 41246780922 is still running.

The user's `.1040` PASS for textured SubD on multiple NOM objects, Studio/Solid display and
VIEW/navigation remains protected. `.1041` remains benchmark evidence only; audit the
retained NOM displacement payload/settings before considering preview work. The `.1042`
draggable palette device checklist is still pending and is carried into `.1043`.
