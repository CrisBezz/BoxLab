# .745 — Bevel after Loop/Knife and facegroup preservation

User PASS .744. Add Vertex remains deferred; no fix claimed. Frozen betas untouched.

Single-fan bevel required at least three endpoint points even at a three-valence
corner already closed by its original cap. Mixed endpoints after Loop therefore
passed eligibility and then refused mid-operation. Reuse the original cap and
insert rounded profile subdivisions. All20Loop-cage single edges now execute for
1/3segments; actual Knife release meshes covered as well.

Rounded perimeter strips sharing one profile got an unnecessary cap, making
three edge owners. Skip this redundant cap. Polygon normals use full vertex area
sums; firstthree collinear vertices had also flipped two rounded single-fan caps.
Shared-edge direction checks and rotated/translated cases protect this correction.
Global mesh.faceNormal and arbitrary eligibility/geometry support are unchanged.

Six existing bevel engines retain groups for their rebuilt source polygons.
Generated strips/caps inherit a group only if the relevant original faces agree;
mixed boundaries are explicitly ungrouped. No nearest-face or object-name inference.
Shared bevel-topology-utils contains provenance/full-polygon normal functions.
Guard, separate-selection transaction and direct owner restore groups. Guard rolls
back nulls/exceptions and rejects >2owners on initially closed meshes, retaining
original geometry/loose sets. Rounded fan triangle construction remains existing.

Inset previously imported bootstrap30.3 while shell imported635. Repoint both to
745, refresh Uniform Inset→Face direct→shell so cached older installers cannot win.
Face direct changes only its import; negative Extrude kernel742/fallback743 and
algorithms untouched. Bevel bootstrap/8children/direct745; Loop addon/drawer744,
Loop commit715, Multi36.1.0 and frozen betas unchanged. All reviewed cache references
and changed hashes updated, six new helper references documented.

29 new cases use real authoritative kernels, actual Knife pointerup with resolved
snap doubles, actual Face/Edge session preview/history and OBJ export/import.
Shared .707 fixture extracted for reuse; existing21checks retained. Tests cover
single/connected/separate/loop/perimeter routing,1/3segments, uniform/mixed groups,
all20Loop edges, Knife, cancellation/refusal/exception/third-owner rollback,
repeated operations with exact history snapshots, consistent winding and rotation.
DOM/raycast doubles do not prove physical Pencil feel.

Focused103PASS. Full Node24:1755/1653PASS/102FAIL/0skip, same102 failure identities
as .744. No new failures or skipped checks; full CI remains red, no gate installed.
Runtime e5d18e5fcff22dd8cf4f268866f1a9b5b5ff51a4 published. Actual Node22CI
37568114774/job112620395437 matches1755/1653PASS/102FAIL/0skip and all102
failure names. Pages37568114308success; live shell/version/all13changed src assets
and frozenBeta6 version byte-match main. Focused103PASS. Device .745 pending. Device smoke: Loop→Edge Bevel near
corner with1/3segments, Knife→Face/Edge Bevel, facegroups/Cancel/Undo/Redo.
