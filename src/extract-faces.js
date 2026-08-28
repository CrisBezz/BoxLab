import { EditableMesh } from './mesh.js';

const button = document.querySelector('#extractFacesBtn');
const status = document.querySelector('#selectionStatus');

function state() { return globalThis.__boxlabBridgeState; }
function selection() { return globalThis.__boxlabSelectionBridge; }
function render() { document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true })); }

function compactMesh(mesh, faces, includeLoose = false) {
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
  const out = new EditableMesh(vertices, compactFaces, creases);
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
  const remainingFaces = mesh.faces.filter((_, index) => !picked.has(index));
  const extracted = compactMesh(mesh, extractedFaces);
  if (!extracted.faces.length) return;

  // Keeping a non-empty source avoids leaving the Outliner with an unusable
  // blank object when every face happens to be selected.
  if (remainingFaces.length) {
    const before = mesh.clone();
    const remaining = compactMesh(mesh, remainingFaces, true);
    mesh.vertices = remaining.vertices;
    mesh.faces = remaining.faces;
    mesh.creases = remaining.creases;
    mesh.looseEdges = new Set(remaining.looseEdges || []);
    mesh.looseVertices = new Set(remaining.looseVertices || []);
    globalThis.__boxlabHistory?.push(before);
  }

  const object = manager?.addMesh?.(extracted, 'Extracted Faces', { enterObjectMode:true });
  if (!object) {
    if (status) status.textContent = 'Extract Faces unavailable • Outliner is still loading';
    return;
  }
  render();
  if (status) status.textContent = remainingFaces.length ? `${object.name} created • source faces removed` : `${object.name} created • source kept intact`;
}

button?.addEventListener('click', extractFaces);
