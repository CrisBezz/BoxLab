# Build .1004 validation and delivery

Publication pending. New six feature checks pass; original Fill and
Eraser full-texture fixtures explicitly select retained Whole object scope.
Initial full run:2920 PASS/1 FAIL/0 skipped, solely old927 default-scope assumption.
Repaired fixture + new feature + original Fill/Eraser + release contracts:18 PASS,
zero failures/skips (7.53s). Final corrected full run:2922 PASS/0 FAIL/0 skipped (100.96s).
Six new feature checks cover shared region rules, actual painter/UI, source-face
coverage, hold/slide reversal, one-step UndoRedo, group boundary lifetime, cancellation,
opacity baseline and partial-texture Save/Open. Syntax and whitespace clean.
No runtime changes after final full validation. All earlier scope-related fixture
failures are retained above as test history, not current unresolved failures.
No native iPad acceptance or permanent right-region fix inferred.
