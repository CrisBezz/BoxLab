import { EditableMesh } from './mesh.js';

const button = document.querySelector('#extractFacesBtn');
const status = document.querySelector('#selectionStatus');

function state() { return globalThis.__boxlabBridgeState; }
function selection() { return globalThis.__boxlabSelectionBridge; }
function render() { document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true })); }

function compactMesh(mesh, faces, includeLoose = false, faceGroups = null) {
  const used = new Set(faces.flat());
  if (includeLoose) {
    for (const key of mesh.looseEdges || []) key.split(':').map(Number).forEach(index => used.add(index));
    for (const index of mesh.looseVertices || []) used.add(index);
  }
  const map = new Map(), vertices = [];
  mesh.vertices.forEach((vertex, index) => {
    if (!used.has(index)) return;
    map.set(index, vertices.length);
    vertices.push(vertex.clone());
  });
  const compactFaces = faces.map(face => face.map(index => map.get(index)));
  const creases = new Map();
  for (const [key, value] of mesh.creases || []) {
    const [a, b] = key.split(':').map(Number);
    if (map.has(a) && map.has(b)) {
      const na = map.get(a), nb = map.get(b);
      creases.set(na < nb ? `${na}:${nb}` : `${nb}:${na}`, value);
    }
  }
  const groups=compactFaces.map((_,i)=>faceGroups?.[i]??null);
  const out = new EditableMesh(vertices, compactFaces, creases, groups);
  if (includeLoose) {
    out.looseEdges = new Set();
    for (const key of mesh.looseEdges || []) {
      const [a, b] = key.split(':').map(Number);
      if (map.has(a) && map.has(b)) out.looseEdges.add(out.edgeKey(map.get(a), map.get(b)));
    }
    out.looseVertices = new Set([...(mesh.looseVertices || [])].filter(index => map.has(index)).map(index => map.get(index)));
  }
  return out;
}

function extractFaces() {
  const mesh = state()?.mesh, bridge = selection(), manager = globalThis.__boxlabObjectManager;
  if (!mesh || !bridge || bridge.mode?.() !== 'face') return;
  const selected = [...new Set(bridge.indices?.() || [])].filter(index => Number.isInteger(index) && mesh.faces[index]);
  if (!selected.length) return;

  const picked = new Set(selected);
  const extractedFaces = selected.map(index => [...mesh.faces[index]]);
  const extractedGroups = selected.map(index => mesh.faceGroups?.[index]??null);
  const remainingFaces = mesh.faces.filter((_, index) => !picked.has(index));
  const remainingGroups = mesh.faces.map((_,index)=>mesh.faceGroups?.[index]??null).filter((_, index) => !picked.has(index));
  const extracted = compactMesh(mesh, extractedFaces, false, extractedGroups);
  if (!extracted.faces.length) return;

  // Extract is a scene transaction: source edit + new object must undo/redo together.
  const sceneCheckpoint = !!globalThis.__boxlabObjectHistory?.checkpoint?.();

  // Keeping a non-empty source avoids leaving the Outliner with an unusable
  // blank object when every face happens to be selected.
  if (remainingFaces.length) {
    const before = mesh.clone();
    const remaining = compactMesh(mesh, remainingFaces, true, remainingGroups);
    mesh.vertices = remaining.vertices;
    mesh.faces = remaining.faces;
    mesh.faceGroups = [...remaining.faceGroups];
    mesh.creases = remaining.creases;
    mesh.looseEdges = new Set(remaining.looseEdges || []);
    mesh.looseVertices = new Set(remaining.looseVertices || []);
    if (!sceneCheckpoint) globalThis.__boxlabHistory?.push(before);
  }

  const object = manager?.addMesh?.(extracted, 'Extracted Faces', { enterObjectMode:true });
  if (!object) {
    if (status) status.textContent = 'Extract Faces unavailable • Outliner is still loading';
    return;
  }
  render();
  if (status) status.textContent = remainingFaces.length ? `${object.name} created • source faces removed • Undo restores scene` : `${object.name} created • source kept intact • Undo restores scene`;
}

button?.addEventListener('click', extractFaces);
