# .737 — first post-Beta6 reliability build

The accepted modeller is unchanged. Live shell advances to v0.36.18.737;
version.json/title/visible stamp agree, recovery loader keys advance with it.
Runtime src/CSS and frozen beta2–6 are unchanged. Native NOM export remains .736.

## What changed

- Reviewed asset contract covers337 declared cache references and SHA256 target
  contents from accepted .736. Tests now check referenced assets against this
  contract instead of demanding an obsolete build or forcing every module to equal
  the shell. Current title/data stamp/visible label/manifest coherence is separate.
  Internal module stamps are reviewed separately from loader pins: Revolve's
  informational .469 stamp, .517 loader and .737 shell are deliberately distinct.
- Central checks reject missing/incorrect/truncated pins, stale shell markers,
  changed asset bytes and wrong loader order. Multi pin1.0 and code are compared
  to accepted Beta6. Actual shell local scripts/CSS must exist and be reviewed.
  The337 references include declared strings, not a promise of full module execution
  coverage; this is a baseline contract, not proof all original cache choices were
  historically correct. Review code and loader cache changes before updating it.
- Converted31 aggregate scripts into333 independently named node:test checks.
  Every original check remains; obsolete pin/release/order expectations are
  reconciled, unresolved source/behavior checks stay failing and visible.
- Twelve historical recovery test files now use exact .453 fixtures from accepted
  commit02332873e334ece14d367eed98a4eba7fcba659e. Original assertions are retained,
  including renderer gitblob977dda1ae40dd643e6fae95df075899db0191f64. They no longer
  require current main to remove accepted Facegroups. Current Facegroup/NOM tests
  remain active. Historical fixtures are not another runnable beta.
- Replaced obsolete stale-shell retry implementation check with execution of the
  real bootstrap across10 stale reloads, including frozen-path isolation, matching
  release/no redirect, cache-busting and no-store requests. Current recovery stays
  able to retry past the old three-attempt stop.
- Repeat replay now executes its actual function and verifies one delegation to
  FaceDirect with tool/committed value/face, busy/invalid rejection and failed-owner
  result. Existing per-tool .732 Repeat/history fixtures remain.
- CI triggers now cover all src/tests/scripts, CSS, shell, release/manifest/icon and
  package changes. Full npm test remains the gate's honest failing command; no
  continue-on-error, exclusion or fake green. Pages is still independent of that
  red job until remaining contracts are reconciled and a release gate is installed.

## Evidence and remaining work

Baseline audit1302/1025PASS/277FAIL → this build **1610/1492PASS/118FAIL/0 skipped**.
These counts are not directly comparable because scripts were expanded. Matched
original regular test cases:158 previously failing cases now pass,88 original
failure identities remain and no new regular failure identities appeared. Of the
121 formerly hidden failed script subchecks,91 now pass and30 remain failing.
333 named script cases include303 passes. Six new release/recovery checks are
included in the total. Actual modelling source remained unchanged throughout.

**32 focused PASS**: release/cache contract negative controls, actual recovery and
Repeat, Offset/cache ownership, exact transforms/history, GLB channels, XYZ and
NOM. Three additionally reconciled Revolve stamp suites15PASS; full suite includes
these. Test-module syntax347checked/0fail at this build; whitespace and protected
source/frozen diffs pass. Local Node24; actual CI Node22 outcome must be reported
separately. Full suite stays red with118 active unresolved checks.

[Complete remaining failure inventory](reliability-build-737.json).
Remaining signatures:85source-pattern,31other behavior/source checks,1OBJ output,
1source banner classified as a version assertion by the heuristic. These are
investigation tasks, not118 confirmed user-facing bugs. Includes old Gizmo/radial
state layouts, navigation/selection routing, diagnostics and older Face picking
experiments. Review each against its actual current owner and add semantic
coverage before replacement; do not weaken assertions to fit implementation.

Next build: reconcile remaining selection/Gizmo/tool lifecycle expectations with
actual owner fixtures, then OBJ object/facegroup output; preserve hard geometry,
failed-operation rollback and history assertions. CI release gating follows once
active regression is trustworthy. No algorithm changes until these contracts are
understood. Keep Beta6 immutable and accepted UI stable.

Manual check: confirm .737 launches in Focus; normal selection/edit/Undo retains
accepted behavior. No broad tool retest is requested for test-infrastructure work.
