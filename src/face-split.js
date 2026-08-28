import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const button = document.querySelector('#faceSplitBtn');
const status = document.querySelector('#selectionStatus');
const ray = new THREE.Raycaster();
const pointer = new THREE.Vector2();
ray.params.Line.threshold = .09;
let armed = false;
let first = null;

function state() { return globalThis.__boxlabBridgeState; }
function bridge() { return globalThis.__boxlabSelectionBridge; }
function render() { document.querySelector('#cageToggle')?.dispatchEvent(new Event('change', { bubbles:true })); }
function edgeKey(mesh, edge) { return mesh.edgeKey(edge.a, edge.b); }

function hitEdge(event) {
  const s = state(), rect = canvas?.getBoundingClientRect();
  if (!s?.camera || !rect) return null;
  pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -((event.clientY - rect.top) / rect.height * 2 - 1));
  ray.setFromCamera(pointer, s.camera);
  const hit = ray.intersectObjects([...(s.edgeObjects?.values() || [])], false)[0];
  return Number.isInteger(hit?.object?.userData?.index) ? hit.object.userData.index : null;
}

function splitFaceEdge(face, a, b, vertex) {
  for (let i = 0; i < face.length; i++) {
    const x = face[i], y = face[(i + 1) % face.length];
    if ((x === a && y === b) || (x === b && y === a)) {
      const out = [...face];
      out.splice(i + 1, 0, vertex);
      return out;
    }
  }
  return face;
}

function splitEdge(mesh, edgeIndex, t = .5) {
  const edge = mesh.edges()[edgeIndex];
  if (!edge || !mesh.vertices[edge.a] || !mesh.vertices[edge.b]) return null;
  const { a, b } = edge, key = mesh.edgeKey(a, b), crease = mesh.creases?.get(key) || 0;
  const vertex = mesh.vertices.length;
  mesh.vertices.push(mesh.vertices[a].clone().lerp(mesh.vertices[b], THREE.MathUtils.clamp(t, .001, .999)));
  for (const fi of (edge.faces || [])) {
    if (Number.isInteger(fi) && fi >= 0 && Array.isArray(mesh.faces[fi])) mesh.faces[fi] = splitFaceEdge(mesh.faces[fi], a, b, vertex);
  }
  if (mesh.creases instanceof Map) {
    mesh.creases.delete(key);
    if (crease > 0) {
      mesh.creases.set(mesh.edgeKey(a, vertex), crease);
      mesh.creases.set(mesh.edgeKey(vertex, b), crease);
    }
  }
  return vertex;
}

function faceHasNonAdjacentEdges(face, a, b) {
  const n = face?.length || 0;
  const locate = edge => {
    for (let i = 0; i < n; i++) if ((face[i] === edge.a && face[(i + 1) % n] === edge.b) || (face[i] === edge.b && face[(i + 1) % n] === edge.a)) return i;
    return -1;
  };
  const ia = locate(a), ib = locate(b);
  return ia >= 0 && ib >= 0 && ia !== ib && (ia - ib + n) % n !== 1 && (ib - ia + n) % n !== 1;
}

function indexForKey(mesh, key) { return mesh.edges().findIndex(edge => edgeKey(mesh, edge) === key); }

button?.addEventListener('click', event => {
  event.preventDefault();
  event.stopImmediatePropagation();
  armed = !armed;
  first = null;
  document.querySelector('#selectionModes button[data-mode="edge"]')?.click();
  button.classList.toggle('active', armed);
  if (status) status.textContent = armed ? 'Face Split • tap the first boundary edge of an ngon' : 'Edge mode • Face Split off';
}, true);

canvas?.addEventListener('pointerdown', event => {
  if (!armed || !event.isPrimary) return;
  const s = state(), mesh = s?.mesh, index = hitEdge(event);
  if (!mesh || !Number.isInteger(index)) return;
  const edge = mesh.edges()[index];
  if (!edge) return;
  event.preventDefault();
  event.stopImmediatePropagation();

  if (!first) {
    first = { key:edgeKey(mesh, edge) };
    bridge()?.set?.('edge', [index]);
    if (status) status.textContent = 'Face Split • tap a non-adjacent boundary edge on the same ngon';
    return;
  }

  const firstIndex = indexForKey(mesh, first.key);
  const firstEdge = mesh.edges()[firstIndex];
  if (!firstEdge || first.key === edgeKey(mesh, edge)) return;
  const shared = (firstEdge.faces || []).filter(fi => (edge.faces || []).includes(fi) && Array.isArray(mesh.faces[fi]) && mesh.faces[fi].length >= 4 && faceHasNonAdjacentEdges(mesh.faces[fi], firstEdge, edge));
  if (!shared.length) {
    first = null;
    bridge()?.set?.('edge', [index]);
    if (status) status.textContent = 'Face Split needs two non-adjacent edges on the same ngon • choose the first edge again';
    return;
  }

  const before = mesh.clone(), secondKey = edgeKey(mesh, edge);
  const a = splitEdge(mesh, firstIndex), secondIndex = indexForKey(mesh, secondKey), b = splitEdge(mesh, secondIndex);
  const result = Number.isInteger(a) && Number.isInteger(b) ? mesh.connectVertices(a, b) : null;
  if (!result?.ok) {
    mesh.vertices = before.vertices.map(v => v.clone());
    mesh.faces = before.faces.map(face => [...face]);
    mesh.creases = new Map(before.creases);
    first = null;
    render();
    if (status) status.textContent = 'Face Split could not make a clean cut • choose two different edges of one ngon';
    return;
  }
  globalThis.__boxlabHistory?.push(before);
  const newIndex = indexForKey(mesh, result.edgeKey);
  first = null;
  bridge()?.set?.('edge', newIndex >= 0 ? [newIndex] : []);
  render();
  if (status) status.textContent = 'Face Split committed • tap two more boundary edges to split another ngon';
}, true);
