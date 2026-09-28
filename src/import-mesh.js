import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EditableMesh } from './mesh.js?v=0.21.2';
import { parseEditableOBJ } from './obj-facegroups-core.js?v=0.36.18.448';
import { evaluateTrianglePair } from './quad-clean-core.js?v=0.36.18.323';

const IMPORT_TARGET_SIZE = 2;
const EDITABLE_WELD_TOLERANCE = 1e-6;
const VERSION='0.36.18.549';

const button = document.querySelector('#importMeshBtn');
const input = document.querySelector('#importMeshInput');
const status = document.querySelector('#selectionStatus');
const kindButtons = [...document.querySelectorAll('#importKind [data-import-kind]')];
const splitGroupsToggle = document.querySelector('#splitImportGroups');
let importKind = 'editable';

function fileBaseName(file) { return (file?.name || 'Imported Mesh').replace(/\.[^.]+$/, '') || 'Imported Mesh'; }
function setStatus(text) { if (status) status.textContent = text; }


function cloneJSON(value){
  return value==null?value:JSON.parse(JSON.stringify(value));
}
function parseGLBPassthrough(buffer){
  try{
    const bytes=new Uint8Array(buffer),view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
    if(bytes.byteLength<20||view.getUint32(0,true)!==0x46546c67)return null;
    let offset=12,json=null,bin=null;
    while(offset+8<=bytes.byteLength){
      const length=view.getUint32(offset,true),type=view.getUint32(offset+4,true);
      const data=bytes.slice(offset+8,offset+8+length);
      if(type===0x4e4f534a)json=JSON.parse(new TextDecoder().decode(data).replace(/\u0000+$/,'').trimEnd());
      else if(type===0x004e4942)bin=data;
      offset+=8+length;
    }
    if(!json)return null;
    const images=(json.images||[]).map(image=>{
      const copy=cloneJSON(image);
      let data=null;
      if(bin&&Number.isInteger(image?.bufferView)){
        const bv=json.bufferViews?.[image.bufferView];
        if(bv){
          const start=Number(bv.byteOffset||0),end=start+Number(bv.byteLength||0);
          data=bin.slice(start,end);
        }
      }
      return{definition:copy,data};
    });
    const nodesByMesh=new Map();
    (json.nodes||[]).forEach((node,index)=>{
      if(Number.isInteger(node?.mesh)&&!nodesByMesh.has(node.mesh))nodesByMesh.set(node.mesh,{index,node});
    });
    const objects=(json.meshes||[]).map((mesh,index)=>{
      const nodeInfo=nodesByMesh.get(index)||null;
      const materialIndices=[...new Set((mesh.primitives||[]).map(p=>p.material).filter(Number.isInteger))];
      return{
        version:1,
        source:'glb',
        generator:String(json.asset?.generator||''),
        meshName:String(mesh.name||''),
        meshExtras:cloneJSON(mesh.extras||null),
        meshWeights:cloneJSON(mesh.weights||null),
        nodeName:String(nodeInfo?.node?.name||''),
        nodeExtras:cloneJSON(nodeInfo?.node?.extras||null),
        nodeMatrix:cloneJSON(nodeInfo?.node?.matrix||null),
        materialIndices,
        materials:cloneJSON(json.materials||[]),
        samplers:cloneJSON(json.samplers||[]),
        textures:cloneJSON(json.textures||[]),
        images,
        originalTopology:{
          primitiveCount:(mesh.primitives||[]).length,
          positionCounts:(mesh.primitives||[]).map(p=>json.accessors?.[p?.attributes?.POSITION]?.count||0),
          attributes:(mesh.primitives||[]).map(p=>cloneJSON(p.attributes||{})),
          targets:(mesh.primitives||[]).map(p=>cloneJSON(p.targets||null))
        },
        topologyBoundPreserved:true
      };
    });
    return{asset:cloneJSON(json.asset||{}),objects};
  }catch(error){
    console.warn('BoxLab GLB passthrough capture failed',error);
    return null;
  }
}

function decodeFaceGroup(material,materialIndex,hasGroups,fallbackName=null){
  const explicit=material?.userData?.boxlabFaceGroup;
  if(typeof explicit==='string'&&explicit.trim())return explicit.trim();
  const name=String(material?.name||'');
  const prefix='BoxLabFG::';
  if(name.startsWith(prefix)){
    try{return decodeURIComponent(name.slice(prefix.length))||fallbackName;}catch{return name.slice(prefix.length)||fallbackName;}
  }
  if(name&&name!=='Material')return name;
  return hasGroups?(fallbackName||`FaceGroup ${Number(materialIndex||0)+1}`):fallbackName;
}
function geometryToEditableMesh(geometry, matrixWorld, materials=null, fallbackGroupName=null) {
  const source = geometry.index ? geometry.toNonIndexed() : geometry.clone();
  const position = source.getAttribute('position');
  if (!position || position.count < 3) { source.dispose(); return null; }
  const vertices = [];
  for (let i = 0; i < position.count; i++) vertices.push(new THREE.Vector3(position.getX(i), position.getY(i), position.getZ(i)).applyMatrix4(matrixWorld));
  const groups=[...(source.groups||[])].sort((a,b)=>a.start-b.start);
  const hasGroups=groups.length>1;
  const materialList=Array.isArray(materials)?materials:[materials];
  const groupForStart=start=>{
    const group=groups.find(entry=>start>=entry.start&&start<entry.start+entry.count);
    if(!group)return null;
    return decodeFaceGroup(materialList[group.materialIndex]||materialList[0],group.materialIndex,hasGroups,fallbackGroupName);
  };
  const faces = [],faceGroups=[];
  for (let i = 0; i + 2 < vertices.length; i += 3) {
    faces.push([i, i + 1, i + 2]);
    faceGroups.push(groupForStart(i)??fallbackGroupName);
  }
  source.dispose();
  return faces.length ? new EditableMesh(vertices, faces, undefined, faceGroups) : null;
}

function mergeEditableMeshes(entries,name){
  const vertices=[],faces=[],faceGroups=[];
  for(const entry of entries){
    const offset=vertices.length;
    entry.mesh.vertices.forEach(vertex=>vertices.push(vertex.clone()));
    entry.mesh.faces.forEach((face,faceIndex)=>{
      faces.push(face.map(index=>index+offset));
      faceGroups.push(entry.mesh.faceGroups?.[faceIndex]??entry.groupName??null);
    });
  }
  return{
    mesh:new EditableMesh(vertices,faces,undefined,faceGroups),
    name:name||entries[0]?.name||'Mesh',
    importedFaceGroups:[...new Set(faceGroups.filter(Boolean))]
  };
}
function logicalPrimitiveOwner(node,root){
  const parent=node.parent;
  if(!parent||parent===root)return node;
  const meshChildren=parent.children?.filter(child=>child?.isMesh)||[];
  const nonMeshChildren=parent.children?.filter(child=>!child?.isMesh)||[];
  if(meshChildren.length>1&&nonMeshChildren.length===0)return parent;
  return node;
}
function importedMeshes(root,{splitByGroups=false}={}) {
  root.updateMatrixWorld(true);
  const primitiveEntries=[];
  let primitiveIndex=0;
  root.traverse(node => {
    if (!node.isMesh || !node.geometry) return;
    primitiveIndex++;
    const materialList=Array.isArray(node.material)?node.material:[node.material];
    const materialName=materialList.find(material=>material?.userData?.boxlabFaceGroup)?.userData?.boxlabFaceGroup
      || materialList.find(material=>material?.name&&material.name!=='Material')?.name
      || `FaceGroup ${primitiveIndex}`;
    const mesh = geometryToEditableMesh(node.geometry, node.matrixWorld, node.material, materialName);
    if (!mesh) return;
    primitiveEntries.push({
      mesh,
      node,
      owner:logicalPrimitiveOwner(node,root),
      name:node.name || 'Mesh',
      groupName:materialName
    });
  });
  if(splitByGroups){
    return primitiveEntries.map(entry=>({
      mesh:entry.mesh,
      name:entry.groupName||entry.name,
      importedFaceGroups:[...new Set((entry.mesh.faceGroups||[]).filter(Boolean))]
    }));
  }
  const buckets=new Map();
  for(const entry of primitiveEntries){
    const key=entry.owner;
    if(!buckets.has(key))buckets.set(key,[]);
    buckets.get(key).push(entry);
  }
  return [...buckets.entries()].map(([owner,entries])=>{
    if(entries.length===1){
      const entry=entries[0];
      return{
        mesh:entry.mesh,
        name:owner?.name||entry.name,
        importedFaceGroups:[...new Set((entry.mesh.faceGroups||[]).filter(Boolean))]
      };
    }
    return mergeEditableMeshes(entries,owner?.name||entries[0]?.name||'Mesh');
  });
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

function reconstructImportedQuads(mesh){
  if(!mesh?.faces?.length||!mesh?.faceGroups?.length)return{mesh,merged:0};
  const candidates=[];
  for(const edge of mesh.edges?.()||[]){
    if(edge.faces?.length!==2)continue;
    const [a,b]=edge.faces;
    if(mesh.faces[a]?.length!==3||mesh.faces[b]?.length!==3)continue;
    const groupA=mesh.faceGroups?.[a]??null,groupB=mesh.faceGroups?.[b]??null;
    if(!groupA||groupA!==groupB)continue;
    const evaluated=evaluateTrianglePair(mesh,a,b);
    if(!evaluated?.ok||evaluated.normalDot<0.9995)continue;
    candidates.push({a,b,quad:evaluated.quad,score:evaluated.score,group:groupA});
  }
  candidates.sort((x,y)=>x.score-y.score||Math.min(x.a,x.b)-Math.min(y.a,y.b));
  const used=new Set(),chosen=[];
  for(const candidate of candidates){
    if(used.has(candidate.a)||used.has(candidate.b))continue;
    used.add(candidate.a);used.add(candidate.b);chosen.push(candidate);
  }
  if(!chosen.length)return{mesh,merged:0};
  const replacements=new Map(),remove=new Set();
  for(const candidate of chosen){
    const keep=Math.min(candidate.a,candidate.b),drop=Math.max(candidate.a,candidate.b);
    replacements.set(keep,{face:[...candidate.quad],group:candidate.group});
    remove.add(drop);
  }
  const faces=[],faceGroups=[];
  for(let i=0;i<mesh.faces.length;i++){
    if(remove.has(i))continue;
    const replacement=replacements.get(i);
    if(replacement){
      faces.push(replacement.face);
      faceGroups.push(replacement.group);
    }else{
      faces.push([...mesh.faces[i]]);
      faceGroups.push(mesh.faceGroups?.[i]??null);
    }
  }
  return{mesh:new EditableMesh(mesh.vertices,faces,mesh.creases,faceGroups),merged:chosen.length};
}

function addImported(meshes, baseName,{reconstructQuads=false}={}) {
  const manager = globalThis.__boxlabObjectManager;
  if (!manager) throw new Error('The Outliner is still loading. Please try Import again.');
  const isReference = importKind === 'reference';fitMeshesToBoxLabScale(meshes);
  let weldedTotal = 0, removedTotal = 0, reconstructedQuads = 0;
  if (!isReference) meshes = meshes.map(entry => {
    const result=weldEditableMesh(entry.mesh);
    weldedTotal+=result.welded;removedTotal+=result.removedFaces;
    let next=result.mesh;
    if(reconstructQuads){
      const rebuilt=reconstructImportedQuads(next);
      next=rebuilt.mesh;reconstructedQuads+=rebuilt.merged;
    }
    return{...entry,mesh:next};
  });
  const options={kind:isReference?'reference':'editable',locked:isReference,enterObjectMode:!isReference,settings:{mirror:{x:false,y:false,z:false},subd:false,subdLevel:1,cage:true}};
  meshes.forEach((entry,index)=>manager.addMesh(entry.mesh,meshes.length===1?baseName:`${baseName} • ${entry.name||index+1}`,{...options,glbPassthrough:entry.glbPassthrough||null}));
  const preserved=!isReference&&meshes.some(entry=>entry.polygonPreserved);
  const groupCount=[...new Set(meshes.flatMap(entry=>entry.mesh.faceGroups||[]).filter(Boolean))].length;
  const perObject=meshes.map(entry=>({name:entry.name||'Mesh',faceGroups:[...new Set((entry.mesh.faceGroups||[]).filter(Boolean))].length}));
  globalThis.__boxlabNomadRoundTrip ||= {};
  globalThis.__boxlabNomadRoundTrip.lastImport={objects:meshes.length,faceGroups:groupCount,details:perObject};
  if(isReference)setStatus(`${meshes.length} imported ${meshes.length===1?'mesh':'meshes'} • locked reference`);
  else setStatus(`${meshes.length} imported ${meshes.length===1?'mesh':'meshes'} • editable${preserved?' • OBJ polygons preserved':''}${groupCount?` • ${groupCount} facegroup${groupCount===1?'':'s'} preserved`:''}${reconstructedQuads?` • ${reconstructedQuads} quad${reconstructedQuads===1?'':'s'} reconstructed`:''} • ${weldedTotal} coincident vertices welded${removedTotal?` • ${removedTotal} collapsed faces removed`:''}`);
}

function loadOBJ(file) {
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const text=String(reader.result||'');
      const meshes=importKind==='editable'?parseEditableOBJ(text,{splitByGroups:!!splitGroupsToggle?.checked}):(()=>{const root=new OBJLoader().parse(text);return importedMeshes(root);})();
      if(!meshes.length)throw new Error('No mesh geometry was found in this OBJ.');
      addImported(meshes,fileBaseName(file));
    }catch(error){setStatus(`Import failed • ${error.message||'Unsupported OBJ'}`);}
  };
  reader.onerror=()=>setStatus('Import failed • could not read OBJ');reader.readAsText(file);
}

function loadGLTF(file) {
  const reader = new FileReader();
  reader.onload = () => { const loader=new GLTFLoader();loader.parse(reader.result,'',gltf=>{try{const meshes=importedMeshes(gltf.scene,{splitByGroups:!!splitGroupsToggle?.checked});if(!meshes.length)throw new Error('No mesh geometry was found in this file.');const passthrough=parseGLBPassthrough(reader.result);if(passthrough&&!splitGroupsToggle?.checked)meshes.forEach((entry,index)=>{entry.glbPassthrough=passthrough.objects?.[index]||null;});addImported(meshes,fileBaseName(file),{reconstructQuads:true});}catch(error){setStatus(`Import failed • ${error.message||'Unsupported GLTF'}`);}},error=>setStatus(`Import failed • ${error.message||'GLB/GLTF could not be read'}`)); };
  reader.onerror=()=>setStatus('Import failed • could not read GLB/GLTF');reader.readAsArrayBuffer(file);
}

function importFile(file) { if(!file)return;const extension=file.name.split('.').pop()?.toLowerCase();setStatus(`Importing ${file.name}…`);if(extension==='obj')loadOBJ(file);else if(extension==='glb'||extension==='gltf')loadGLTF(file);else setStatus('Import failed • choose an OBJ, GLB or GLTF file'); }
kindButtons.forEach(item=>item.addEventListener('click',()=>{importKind=item.dataset.importKind;kindButtons.forEach(button=>button.classList.toggle('active',button===item));}));
button?.addEventListener('click',()=>input?.click());input?.addEventListener('change',()=>{importFile(input.files?.[0]);input.value='';});
if(!globalThis.__boxlabObjectManager)window.addEventListener('boxlab-object-manager-ready',()=>{},{once:true});
globalThis.__boxlabImportMesh={version:VERSION,weldEditableMesh,parseEditableOBJ,geometryToEditableMesh,importedMeshes,mergeEditableMeshes,reconstructImportedQuads,parseGLBPassthrough};
