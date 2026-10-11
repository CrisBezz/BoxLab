# MeshUtilz outline Balloon

`meshutilz-outline-balloon.js` is copied byte-for-byte from
CrisBezz/MeshUtilz-Sweep-Lab, branch `balloon-v0.6`, accepted source commit
`18e72a6bf964974591038345d68c2196a18f6af2`, path `src/outlineGeometry.js`.

The BoxLab adapter imports this single generator, converts its indexed triangles
to EditableMesh, validates the first supported convex-outline scope, and uses
existing unit-fit, placement, scene/history and shared Curve editor owners.
No MeshUtilz UI, gestures, renderer or history is imported. Source repository is
read-only. This first consumer retains triangle topology and shared rim/poles;
quad conversion, Tube Balloon, concave silhouettes and pressure controls are later
scopes. Three.js remains BoxLab's existing 0.179.1 import map dependency.
