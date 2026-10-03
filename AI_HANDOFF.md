## v0.36.18.688 — restore known-good Loop Cut core

Current release:
- v0.36.18.688

Hands-on protected:
- .684 radial Knife viewport session: PASS.
- .682 Pencil/Object routing reliability: PERFECT / PASS.
- .688 restored known-good Loop Cut / Loop Slide feel: PASS.

Loop Cut incident:
- User found topology where Loop Cut refused a visually quad-like area.
- .685-.687 attempted to generalize logical-quad support to arbitrary collinear boundary detail.
- Those builds restored traversal but degraded the previously good Loop Cut behaviour:
  - malformed/sliver faces
  - Loop Slide direction/feel no longer matched the old tool
- .687 direction patch did not restore the original behaviour.

.688:
- Restores src/loop-cut-added-vertex.js from the actual known-good v0.36.18.162 implementation.
- Keeps only its original supported compatibility:
  - ordinary base Loop Cut unchanged
  - 5-gon with exactly one collinear Add-vertex promoted as a logical quad
  - existing Add vertex reused where appropriate
  - single and multi Loop Cut follow the original known-good reconstruction/slide contract
- Removes the .685-.687 generalized arbitrary-collinear-face reconstruction.
- The unusual screenshot topology may again report Loop Cut unavailable; this is preferable to topology corruption or changed slide feel.
- Complex logical-quad support is now a separate strengthening item and must not alter the known-good core.

Immediate hands-on:
1. Test ordinary cube / regular quad Loop Cut.
2. Confirm Loop Slide feels exactly as it did before .685.
3. Test multi-loop count.
4. Test a single Add-vertex logical quad if convenient.
5. Re-test the unusual screenshot case only to establish whether it is again refused cleanly; no malformed faces should ever be created.

Protected:
- restored .162 Loop Cut behaviour is now protected.
- .684 Knife session.
- .682 Object/Pencil contract.
- src/multi-object-transform.js?v=0.36.1.0 unchanged.
