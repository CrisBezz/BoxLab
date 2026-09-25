import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EditableMesh } from './mesh.js?v=0.21.2';
import { parseEditableOBJ } from './obj-facegroups-core.js?v=0.36.18.448';

const IMPORT_TARGET_SIZE = 2;
const EDITABLE_WELD_TOLERANCE = 1e-6;
const VERSION='0.36.18.448';

const button = document.querySelector('#importMeshBtn');
const input = document.querySelector('#importMeshInput');
const status = document.querySelector('#selectionStatus');
const kindButtons = [...document.querySelectorAll('#importKind [data-import-kind]')];
let importKind = 'editable';

function fileBaseName(file) { return (file?.name || 'Imported Mesh').replace(/\.[^.]+$/, '') || 'Imported Mesh'; }
function setStatus(text) { if (status) status.textContent = text; }

function geometryToEditableMesh(geometry, matrixWorld) {
  const source = geometry.index ? geometry.toNonIndexed() : geometry.clone();
  const position = source.getAttribute('position');
  if (!position || position.count < 3) return null;
  const vertices = [];
  for (let i = 0; i < position.count; i++) vertices.push(new THREE.Vector3(position.getX(i), position.getY(i), position.getZ(i)).applyMatrix4(matrixWorld));
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

function weldEditableMesh(mesh, tolerance=EDITABLE_WELD_TOLERANCE) {
  if (!mesh?.vertices?.length || !mesh?.faces?.length) return { mesh, welded:0, removedFaces:0 };
  const inverse = 1 / tolerance,buckets = new Map(),vertices = [],remap = new Array(mesh.vertices.length);let welded = 0;
  mesh.vertices.forEach((vertex, oldIndex) => {
    const key = `${Math.round(vertex.x*inverse)}:${Math.round(vertex.y*inverse)}:${Math.round(vertex.z*inverse)}`;
    let newIndex = buckets.get(key);
    if (newIndex === undefined) { newIndex = vertices.length;buckets.set(key,newIndex);vertices.push(vertex.clone()); } else welded++;
    remap[oldIndex] = newIndex;
  });
  const faces = [],faceGroups=[];let removedFaces = 0;
  for (let faceIndex=0;faceIndex<mesh.faces.length;faceIndex++) {
    const face=mesh.faces[faceIndex];
    const mapped = face.map(index => remap[index]);
    const cleaned = mapped.filter((index, i) => i === 0 || index !== mapped[i-1]);
    if (cleaned.length > 1 && cleaned[0] === cleaned[cleaned.length-1]) cleaned.pop();
    if (new Set(cleaned).size < 3) { removedFaces++; continue; }
    faces.push(cleaned);
    faceGroups.push(mesh.faceGroups?.[faceIndex]??null);
  }
  return { mesh:new EditableMesh(vertices, faces, mesh.creases, faceGroups), welded, removedFaces };
}

function addImported(meshes, baseName) {
  const manager = globalThis.__boxlabObjectManager;
  if (!manager) throw new Error('The Outliner is still loading. Please try Import again.');
  const isReference = importKind === 'reference';fitMeshesToBoxLabScale(meshes);
  let weldedTotal = 0, removedTotal = 0;
  if (!isReference) meshes = meshes.map(entry => { const result=weldEditableMesh(entry.mesh);weldedTotal+=result.welded;removedTotal+=result.removedFaces;return{...entry,mesh:result.mesh}; });
  const options={kind:isReference?'reference':'editable',locked:isReference,enterObjectMode:!isReference,settings:{mirror:{x:false,y:false,z:false},subd:false,subdLevel:1,cage:true}};
  meshes.forEach((entry,index)=>manager.addMesh(entry.mesh,meshes.length===1?baseName:`${baseName} • ${entry.name||index+1}`,options));
  const preserved=!isReference&&meshes.some(entry=>entry.polygonPreserved);
  const groupCount=[...new Set(meshes.flatMap(entry=>entry.mesh.faceGroups||[]).filter(Boolean))].length;
  if(isReference)setStatus(`${meshes.length} imported ${meshes.length===1?'mesh':'meshes'} • locked reference`);
  else setStatus(`${meshes.length} imported ${meshes.length===1?'mesh':'meshes'} • editable${preserved?' • OBJ polygons preserved':''}${groupCount?` • ${groupCount} facegroup${groupCount===1?'':'s'} preserved`:''} • ${weldedTotal} coincident vertices welded${removedTotal?` • ${removedTotal} collapsed faces removed`:''}`);
}

function loadOBJ(file) {
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const text=String(reader.result||'');
      const meshes=importKind==='editable'?parseEditableOBJ(text):(()=>{const root=new OBJLoader().parse(text);return importedMeshes(root);})();
      if(!meshes.length)throw new Error('No mesh geometry was found in this OBJ.');
      addImported(meshes,fileBaseName(file));
    }catch(error){setStatus(`Import failed • ${error.message||'Unsupported OBJ'}`);}
  };
  reader.onerror=()=>setStatus('Import failed • could not read OBJ');reader.readAsText(file);
}

function loadGLTF(file) {
  const reader = new FileReader();
  reader.onload = () => { const loader=new GLTFLoader();loader.parse(reader.result,'',gltf=>{try{const meshes=importedMeshes(gltf.scene);if(!meshes.length)throw new Error('No mesh geometry was found in this file.');addImported(meshes,fileBaseName(file));}catch(error){setStatus(`Import failed • ${error.message||'Unsupported GLTF'}`);}},error=>setStatus(`Import failed • ${error.message||'GLB/GLTF could not be read'}`)); };
  reader.onerror=()=>setStatus('Import failed • could not read GLB/GLTF');reader.readAsArrayBuffer(file);
}

function importFile(file) { if(!file)return;const extension=file.name.split('.').pop()?.toLowerCase();setStatus(`Importing ${file.name}…`);if(extension==='obj')loadOBJ(file);else if(extension==='glb'||extension==='gltf')loadGLTF(file);else setStatus('Import failed • choose an OBJ, GLB or GLTF file'); }
kindButtons.forEach(item=>item.addEventListener('click',()=>{importKind=item.dataset.importKind;kindButtons.forEach(button=>button.classList.toggle('active',button===item));}));
button?.addEventListener('click',()=>input?.click());input?.addEventListener('change',()=>{importFile(input.files?.[0]);input.value='';});
if(!globalThis.__boxlabObjectManager)window.addEventListener('boxlab-object-manager-ready',()=>{},{once:true});
globalThis.__boxlabImportMesh={version:VERSION,weldEditableMesh,parseEditableOBJ};
