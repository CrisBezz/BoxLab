## v0.36.18.627 — fix Gesture Debug startup + Vertex Circle lifecycle

User reported after .625/.626:
- Viewport -> Gesture Debug button appeared but did not work.
- debug panel no longer appeared.
- Vertex Circle startup/UI issue still not fixed.

Gesture Debug root cause:
- .625 insertion accidentally placed Gesture Debug button setup inside toggleFocusView().
- Result: button existed in DOM, but its click listener was not installed until Focus View was toggled.
- .627 moves Gesture Debug setup to module startup scope.
- Viewport -> Diagnostics -> Gesture Debug now binds immediately.
- Permanent debug layer remains OFF by default and persisted via localStorage.
- Temporary deep capture-owner monkeypatch removed from permanent gesture-debug.js.
- Existing lightweight raw document/canvas traces remain available only while debug is enabled.

Vertex Circle lifecycle root cause:
- Circle load ordering was improved in .625, but later component Inspect/Repair UI reconciliation can still rebuild/reparent Vertex drawer content after Circle placement.
- component-inspect-repair-drawers.js now explicitly re-syncs:
  - __boxlabVertexToolLayout.sync()
  - __boxlabComponentCircle.sync()
  after its own UI sync.
- component-circle remains loaded after face-reconstruct establishes the Vertex layout owner.
- drawer-ui pins component-circle and component-inspect-repair-drawers to .627.

Hands-on checks:
1. Fresh .627 load: Gesture Debug button works immediately without touching Focus View.
2. Toggle ON -> panel appears.
3. Toggle OFF -> panel disappears.
4. Reload with ON -> persisted ON.
5. Vertex mode fresh load -> Circle present immediately.
6. Wait >2 seconds -> Circle still present after late Inspect/Repair reconciliation.
7. First click on Repair/Inspect performs the action; it does not merely fix layout.
8. Switch Vertex -> Face/Edge -> Vertex -> Circle remains correctly placed.
9. Focus View behavior unchanged.
10. Gizmo / Group / Multi baselines unchanged.

Protected:
- .615 unified gizmo baseline.
- .616 Group/Multi routing baseline.
- .620 Face Hold implementation unchanged.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.

Next:
- Once .627 UI/debug infrastructure passes, resume Face Hold investigation with permanent Gesture Debug.
