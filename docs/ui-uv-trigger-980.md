# UV tools open/close trigger — .980 — 26 October 2026

Selected evidence from user-pasted report2026-10-26T07:51:09.125Z (17:51 Brisbane),
releasev0.36.18.980. This is a factual summary, not the complete raw report.
User accepts recovery button but explicitly requires a permanent source fix.

Timeline: pointer on Object radial UV at87893–88156; uv-tools session event88180;
meshHealthClose press92546/release92637; uv-tools end event92850; snapshot99268.
No UV Editor launch button, canvas probe or display-refresh event appears in this
recorded trigger sequence. Finalsessionnull/Paintfalse/controlsEnabledtrue.
This identifies UV tools popup open/close before needing general unwrap/paint activity.

1366×886,DPR2,canvas2732×1652,visualscale1/offset0. All top-right targets present,
enabled, normal in-bounds rects and own-button hit stacks. Plain972 filtersnone.
Hidden boxlabToolSessionHost:displaynone,0×0,position owner z134,overflowauto,
containlayoutpaint,isolationisolate,transformnone. Source end() restores child controls
and hides/empties host, but leaves that clipped scroll host in viewportWrap with
all viewport styling intact. That incomplete lifecycle is confirmed in source.
No browser-engine root cause is established from healthy DOM metrics alone.

.981 replaces ONLY UV tools presentation with native manual Popover top layer when
available, retaining original DOM hierarchy/CSS/actions for shared wide layout.
Native top layer is independent of ancestor positioning/overflow; manual presentation
retains original explicit Close/background/session owners without modal input lock.
UV Editor handoff explicitly releases popup surface. End removes popover/top-layer
membership, viewport styles/dock flags, resize listeners, and parks empty hidden host
back in drawer. No automatic canvas refresh/hide-show or rendering reset invoked.
Fallback keeps original untransformed layout without paint containment on older APIs.
User must retest actual iPad trigger; do not mark recurring visual fault solved solely
from Node API/controller tests. Previous manual workaround remains an emergency action.

Primary browser references checked26Oct2026:
https://webkit.org/blog/14445/webkit-features-in-safari-17-0/
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/showPopover
These support API/layer behavior, not a diagnosis of this exact browser failure.
