## v0.36.18.620 — Face long-press selection browser

- .617-.619 double/triple-tap experiment is abandoned and fully removed.
- Removed:
  - componentTapSeries
  - TAP_CHAIN timing
  - modeless double/triple tap expansion
  - gizmo-overlay tap claim API
  - overlay tap continuation listeners
- Restored clean single-tap component selection behavior:
  - tap unselected component -> select
  - tap selected component -> remove
- .615 unified gizmo baseline preserved.
- .616 Group/Multi routing baseline preserved.

New Face modeless gesture:
- Face mode + Pencil/mouse long-press on a face enters a Face Selection Browser.
- Uses the same proven interaction structure as Edge hold/scrub:
  - 420 ms hold
  - horizontal 32 px scrub steps
  - release commits visible candidate
  - movement before hold threshold cancels hold
  - if hold wins before transform drag arms, pending transform is cancelled
- Candidate sources use existing authoritative selectors only:
  1. Face Loop
  2. Face Ring
  3. Coplanar Region
  4. Connected Shell
- Invalid/single-face/duplicate candidate results are skipped.
- Existing Face selection is retained as additive base while browsing.
- No new topology solver added.
- Edge long-press Loop/Ring browser remains untouched.
- Protected src/multi-object-transform.js?v=0.36.1.0 unchanged.

Hands-on checks:
1. Face long-press enters browser.
2. Initial valid candidate previews immediately.
3. Horizontal scrub steps through available candidates.
4. Release keeps visible candidate.
5. If Loop/Ring invalid, browser skips to Coplanar/Connected.
6. Existing Face selection remains additive while browsing another seed.
7. Normal Face tap select/deselect remains correct.
8. Deliberate Face drag still transforms.
9. Edge long-press/scrub remains unchanged.
10. Vertex/Edge/Face/single Object gizmo regression.
11. Group/Multi gizmo regression.

Next if PASS:
- refine Face candidate ordering/labels only if hands-on suggests it.
- then continue modeless gesture roadmap.
