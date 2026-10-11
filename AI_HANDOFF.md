# BoxLab AI Handoff — Concave Balloon evaluation .817

## Current state — 2026-10-11
Main build .817 device evaluation pending. User reports .816 works much better; preserve Density4, optional donor tessellation and .815 Reset/Pencil. Beta7 frozen .807.

## .817
User requests concave Balloons to evaluate usefulness. Audited source: original MeshUtilz donor already creates rings by interpolating between an interior pole and actual rim; existing adapter first rejects ANY concavity, then has a separate actual-rim star/fold test. Removed ONLY the blanket convex half-plane rejection; existing crossing rejection and actual donor-rim radial visibility/fold refusal remain. This permits simple star-shaped concavities such as shallow notches. Deep overhangs, folded rims and self-crossings refuse, not automatically triangulated by a separate kernel. No change to donor, density, history, preview, Pencil gesture ownership or SubD. Updated editor explanation, test fixture and parent import pins.

Device evaluation: Add+ Balloon > draw concave shallow bite (C/notch), Density4, Depth; preview and Apply, orbit; increase density; attempt deep concave and self crossing, verify rejection. Compare convex oval and undo/edit. If faces fold or performance regresses, mark FAIL with screenshot and return to .816. Future concave algorithm expansion needs an explicit go/no-go after tactile evaluation.
