## v0.36.18.563 — Selection drawer restored + empty command row removed

- User preferred the Selection panel in its original left tool drawer location.
- .563 rolls back only the .562 Selection-panel relocation.
- `#selectionDrawer` remains in its original DOM position inside the left scrolling tool drawer; no runtime reparenting or visibility hack remains.
- Bottom-left Vertex / Edge / Face / Object mode dock is retained.
- Viewport settings remains in the top action line beside Undo / Redo and other top actions.
- The now-empty second command/packer row is removed entirely.
- `#viewportWrap` now starts immediately below the main topbar, reclaiming the former 48px command-row height.
- Top action typography normalization from .562 remains.
- Automated syntax/static regression 10/10 PASS.
- Protected `src/multi-object-transform.js?v=0.36.1.0` unchanged.
- Frozen Beta 5 v0.36.18.538 untouched.

Hands-on check:
1. Selection is back at the top of the left scrolling tool drawer.
2. Mode strip remains bottom-left.
3. Viewport settings remains on the top action line.
4. Empty second/packer row is gone and viewport gains the extra height.
5. No startup flashes.
6. Selection, mode switching and navigation remain unchanged.

