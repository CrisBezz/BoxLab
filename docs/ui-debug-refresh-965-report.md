# User-supplied UI debug evidence — .965

Captured 2026-10-25T09:58:56.043Z. User confirms refreshing can go directly into
right-side failure. This report is evidence of the reported failed state, not a
reproduction on the development host.

| Field | Observed |
| --- | --- |
| Window / visual viewport | 1366 × 886; scale 1; offsets 0 |
| Header | y0–60; visible; pointer events auto; z10 |
| Canvas CSS | x0, y60, 1366 × 826 |
| Canvas drawing buffer | 2732 × 1652; matches DPR2 |
| Paint / tool session | false / null |
| Navigation controls | enabled |
| Gizmo / session panel | hidden, zero-sized |
| Right sample hit stacks | Canvas → viewportWrap → app → body → html |
| Sample grid | x751/1093/1298; y71/443/753 |
| Right canvas input | Pen/touch down/up reach window bubble; no default prevention |
| Captured errors/context loss | No entries in the supplied event history |

These observations make a canvas size mismatch and broad DOM overlay over the
sampled right canvas less likely. They do not prove that tool-specific listeners
acted on the input or that WebKit painted all layers correctly. No global input
failure is established: the sampled canvas input is delivered.

The .965 grid missed every header button because its first y coordinate was71,
below the60px header. It also omitted right toolbar/browser element bounds and
styles. The new .966 controls evidence measures exact right-button centres,
computed styles, disabled/expanded state and hit stacks, at startup/pageshow and
manual capture. This is diagnostic instrumentation, not a rendering fix.

Next device gate: enable UI Debug before refresh; refresh directly into failure;
tap the affected right control when practical; Capture report → Copy report.
