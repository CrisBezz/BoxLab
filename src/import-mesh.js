import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EditableMesh } from './mesh.js?v=0.21.2';

const IMPORT_TARGET_SIZE = 2;

const button = document.querySelector('#importMeshBtn');
const input = document.querySelector('#importMeshInput');
const status = document.querySelector('#selectionStatus');
const kindButtons = [...document.querySelectorAll('#importKind [data-import-kind]')];
let importKind = 'editable';

function fileBaseName(file) {
  return (file?.name || 'Imported Mesh').replace(/\.[^.]+$/, '') || 'Imported Mesh';
}

function setStatus(text) {
  if (status) status.textContent = text;
}

function geometryToEditableMesh(geometry, matrixWorld) {
  const source = geometry.index ? geometry.toNonIndexed() : geometry.clone();
  const position = source.getAttribute('position');
  if (!position || position.count < 3) return null;
  const vertices = [];
  for (let i = 0; i < position.count; i++) {
    vertices.push(new THREE.Vector3(position.getX(i), position.getY(i), position.getZ(i)).applyMatrix4(matrixWorld));
  }
  const faces = [];
  for (let i = 0; i + 2 < vertices.length; i += 3) faces.push([i, i + 1, i + 2]);
  source.dispose();
  return faces.length ? new EditableMesh(vertices, faces) : null;
}

function importedMeshes(root) {
  root.updateMatrixWorld(true);
  const meshes = [];
  root.traverse(node => {
    if (!node.isMesh || !node.geometry) return;
    const mesh = geometryToEditableMesh(node.geometry, node.matrixWorld);
    if (mesh) meshes.push({ mesh, name:node.name || 'Mesh' });
  });
  return meshes;
}

function fitMeshesToBoxLabScale(meshes) {
  const bounds = new THREE.Box3();
  meshes.forEach(entry => entry.mesh.vertices.forEach(vertex => bounds.expandByPoint(vertex)));
  if (bounds.isEmpty()) return 1;
  const size = bounds.getSize(new THREE.Vector3());
  const largestDimension = Math.max(size.x, size.y, size.z);
  if (!Number.isFinite(largestDimension) || largestDimension < 1e-9) return 1;
  const scale = IMPORT_TARGET_SIZE / largestDimension;
  const center = bounds.getCenter(new THREE.Vector3());
  meshes.forEach(entry => entry.mesh.vertices.forEach(vertex => vertex.sub(center).multiplyScalar(scale)));
  return scale;
}

function addImported(meshes, baseName) {
  const manager = globalThis.__boxlabObjectManager;
  if (!manager) throw new Error('The Outliner is still loading. Please try Import again.');
  const isReference = importKind === 'reference';
  fitMeshesToBoxLabScale(meshes);
  const options = {
    kind: isReference ? 'reference' : 'editable',
    locked: isReference,
    enterObjectMode: !isReference,
    settings: { mirror:{ x:false, y:false, z:false }, subd:false, subdLevel:1, cage:true }
  };
  meshes.forEach((entry, index) => manager.addMesh(entry.mesh, meshes.length === 1 ? baseName : `${baseName} • ${entry.name || index + 1}`, options));
  setStatus(`${meshes.length} imported ${meshes.length === 1 ? 'mesh' : 'meshes'} • ${isReference ? 'locked reference' : 'editable'}`);
}

function loadOBJ(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const root = new OBJLoader().parse(String(reader.result || ''));
      const meshes = importedMeshes(root);
      if (!meshes.length) throw new Error('No mesh geometry was found in this OBJ.');
      addImported(meshes, fileBaseName(file));
    } catch (error) {
      setStatus(`Import failed • ${error.message || 'Unsupported OBJ'}`);
    }
  };
  reader.onerror = () => setStatus('Import failed • could not read OBJ');
  reader.readAsText(file);
}

function loadGLTF(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const loader = new GLTFLoader();
    loader.parse(reader.result, '', gltf => {
      try {
        const meshes = importedMeshes(gltf.scene);
        if (!meshes.length) throw new Error('No mesh geometry was found in this file.');
        addImported(meshes, fileBaseName(file));
      } catch (error) {
        setStatus(`Import failed • ${error.message || 'Unsupported GLTF'}`);
      }
    }, error => setStatus(`Import failed • ${error.message || 'GLB/GLTF could not be read'}`));
  };
  reader.onerror = () => setStatus('Import failed • could not read GLB/GLTF');
  reader.readAsArrayBuffer(file);
}

function importFile(file) {
  if (!file) return;
  const extension = file.name.split('.').pop()?.toLowerCase();
  setStatus(`Importing ${file.name}…`);
  if (extension === 'obj') loadOBJ(file);
  else if (extension === 'glb' || extension === 'gltf') loadGLTF(file);
  else setStatus('Import failed • choose an OBJ, GLB or GLTF file');
}

kindButtons.forEach(item => item.addEventListener('click', () => {
  importKind = item.dataset.importKind;
  kindButtons.forEach(button => button.classList.toggle('active', button === item));
}));
button?.addEventListener('click', () => input?.click());
input?.addEventListener('change', () => {
  importFile(input.files?.[0]);
  input.value = '';
});

if (!globalThis.__boxlabObjectManager) window.addEventListener('boxlab-object-manager-ready', () => {}, { once:true });
