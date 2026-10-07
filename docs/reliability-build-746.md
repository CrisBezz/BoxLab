# .746 — exact uploaded bevelled cage Loop continuation

Screenshot running745 reports horizontal Loop unavailable. Source LOOP CUT.obj
retained exactly as tests/fixtures/loop-cut-746.obj:31verts24faces/21quads3ngons.
Its exporter header736 is not the screenshot runtime version. .745 is not marked
fully device-accepted. Earlier simple bevelled-cube tests did not reproduce this
multi-subdivided bevel boundary. Native edge0 ring refuses; other vertical seeds
returned incomplete strips. Node OBJ parser uses a queried mesh class; construct
installed EditableMesh for actual authoritative operation tests.

Existing logical Loop addon keeps native/Added behavior first. For refused or open
cut chains, it privately plans a closed convex planar polygon strip with exactly
two boundary crossings per face and parallel rails. Shared new vertex IDs conform
both owners. Polygon splitting retains every old boundary vertex and facegroup;
creases divide along cut rails. No triangulation or blanket n-gon support. All13
vertical seeds on source produce7face loops;2/3/8cut paths also complete.

Slide endpoints use common overlap of crossing rails. Initial single cut follows
clicked seed height; subsequent Slide stays level within shared interval. Ordinary
quad/Added placement, main pointer owner, Loop715commit, Multi and frozen betas
unchanged. Unsupported concave/nonplanar/nonparallel/ambiguous/open paths refuse
privately; if existing native path is valid but partial and continuation unavailable,
its accepted boundary termination remains. Export rounding tolerance is scale-aware.

15newPASS. Focused63PASS, actual715commit/rail selection/History with uploaded mesh,
volume/shared-edge winding/original vertices/groups/creases, Slide, count, rotation,
refusal immutability and plain cube placement. DOM doubles do not prove device feel.
Full Node24:1770/1668PASS/102FAIL/0skip, same102failure identities as745. No skipped
checks or CI gate. Runtime only logical addon/drawer changed, intentional pins746
and reviewed two hashes; Bevel/Face745 and Through742 unchanged.

Publication/Node22/Pages pending. Manual: original uploaded cage horizontal red-line
cut, Slide/EXACT and nearby/multiple cuts, Undo/Redo and selection/navigation.
