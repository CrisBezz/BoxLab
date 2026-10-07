

## 2026-10-07 — v0.36.18.747 supplied-cage combinations / Bevel winding guard

- User “big PASS” .746; Add Vertex remains deferred.
- All67eligible cage edges after polygon Loop bevel1/3segments cleanly; actual
  Knife on every quad and repeated Loop→Knife→Bevel→Loop preserve exact history.
- Existing watertight guard accepted injected reversed face with two edge owners.
  Check opposite shared-edge winding for initially closed oriented inputs; restore
  full mesh metadata and expose existing error on failure. No current engine defect
  claimed; open/already inconsistently oriented inputs retain prior routing.
-7newPASS/focused69PASS; full1777/1675PASS/102FAIL/0skip; same102identities.
- Guard only runtime edit; bootstrap/Inset/Face import-only cache chain747. Four
  reviewed hashes/pins; protected Loop715/main/Multi/frozen betas untouched.
- Publication verification pending; .747 device acceptance pending.

The injected reversed-face fixture exercises the actual wrapper, not a separate
validator. It retains two owners per edge but previously passed; .747 restores
vertices/faces/groups/creases/loose geometry before returning null. Winding check
is deliberately scoped to initially closed oriented input. No new orientation
repair or broad manifold guarantee is implied. Existing Bevel generators unchanged.

Focused69 includes7new,29Bevel745,13combination744,15Loop746 and5releasecontract.
Full baseline retains all102 historical failures; matching identities is evidence
of no newly failing test, not proof of universal topology safety.

Publication/Node22/live verification pending. Device .747 acceptance pending.
