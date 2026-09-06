// BoxLab v0.36.19.0 — linked instance foundation.
// Separates shared source geometry from per-object placement without changing
// the protected multi-object transform module. Existing objects are upgraded
// lazily. Linked Duplicate shares a source; Make Unique detaches it.

import * as THREE from 'three';

const drawer=document.querySelector('#objectsDrawer .drawer-content');
const list=document.querySelector('#outlinerList');
const status=document.querySelector('#selectionStatus');
const EPS=1e-7;
let nextSourceId=1;
let syncing=false;
let refreshQueued=false;
const sources=new Map();

function manager(){return globalThis.__boxlabObjectManager;}
function state(){return globalThis.__boxlabBridgeState;}
function mode(){return globalThis.__boxlabSelectionBridge?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function identityArray(){return new THREE.Matrix4().identity().elements.slice();}
function matrixFor(object){const a=object?.instanceMatrix;return Array.isArray(a)&&a.length===16?new THREE.Matrix4().fromArray(a):new THREE.Matrix4().identity();}
function setMatrix(object,matrix){object.instanceMatrix=matrix.elements.slice();}
function transformMesh(mesh,matrix){const out=mesh.clone();for(const v of out.vertices)v.applyMatrix4(matrix);out.edges?.();return out;}
function meshNear(a,b,eps=EPS){if(!a||!b||a.vertices?.length!==b.vertices?.length||a.faces?.length!==b.faces?.length)return false;for(let i=0;i<a.vertices.length;i++)if(a.vertices[i].distanceToSquared(b.vertices[i])>eps*eps)return false;for(let i=0;i<a.faces.length;i++){const fa=a.faces[i],fb=b.faces[i];if(!fb||fa.length!==fb.length)return false;for(let j=0;j<fa.length;j++)if(fa[j]!==fb[j])return false;}return true;}
function newSource(mesh){const id=`source-${nextSourceId++}`;sources.set(id,{id,mesh:mesh.clone(),revision:0});return id;}
function ensureSource(object){
  if(!object)return null;
  if(!Array.isArray(object.instanceMatrix)||object.instanceMatrix.length!==16)setMatrix(object,new THREE.Matrix4());
  if(object.sourceId&&sources.has(object.sourceId))return sources.get(object.sourceId);
  const world=object.mesh?.clone?.();if(!world)return null;
  const inverse=matrixFor(object).invert();
  const local=transformMesh(world,inverse);
  object.sourceId=newSource(local);
  return sources.get(object.sourceId);
}
function ensureAll(){for(const o of manager()?.objects||[])ensureSource(o);}
function linkedCount(sourceId){return (manager()?.objects||[]).filter(o=>o.sourceId===sourceId).length;}
function evaluatedMesh(object){const source=ensureSource(object);return source?transformMesh(source.mesh,matrixFor(object)):object?.mesh?.clone?.();}

function basisIndices(mesh){
  const v=mesh?.vertices||[];if(v.length<4)return null;
  const p0=v[0];let i1=-1,i2=-1,i3=-1;
  for(let i=1;i<v.length;i++)if(v[i].distanceToSquared(p0)>1e-12){i1=i;break;}
  if(i1<0)return null;const a=v[i1].clone().sub(p0);
  for(let i=1;i<v.length;i++){if(i===i1)continue;const b=v[i].clone().sub(p0);if(new THREE.Vector3().crossVectors(a,b).lengthSq()>1e-12){i2=i;break;}}
  if(i2<0)return null;const b=v[i2].clone().sub(p0),n=new THREE.Vector3().crossVectors(a,b);
  for(let i=1;i<v.length;i++){if(i===i1||i===i2)continue;const c=v[i].clone().sub(p0);if(Math.abs(n.dot(c))>1e-10){i3=i;break;}}
  return i3<0?null:[0,i1,i2,i3];
}
function frameMatrix(mesh,ids){const [i0,i1,i2,i3]=ids,p0=mesh.vertices[i0],a=mesh.vertices[i1].clone().sub(p0),b=mesh.vertices[i2].clone().sub(p0),c=mesh.vertices[i3].clone().sub(p0);return new THREE.Matrix4().set(a.x,b.x,c.x,p0.x,a.y,b.y,c.y,p0.y,a.z,b.z,c.z,p0.z,0,0,0,1);}
function centroid(mesh){const c=new THREE.Vector3();for(const v of mesh.vertices)c.add(v);return mesh.vertices.length?c.multiplyScalar(1/mesh.vertices.length):c;}
function derivePlacement(local,world){
  if(!local||!world||local.vertices.length!==world.vertices.length)return null;
  const ids=basisIndices(local);
  if(ids){const p=frameMatrix(local,ids),q=frameMatrix(world,ids),inv=p.clone().invert(),m=q.multiply(inv);let max=0;for(let i=0;i<local.vertices.length;i++){const d=local.vertices[i].clone().applyMatrix4(m).distanceToSquared(world.vertices[i]);if(d>max)max=d;}if(max<1e-8)return m;}
  const delta=centroid(world).sub(centroid(local));return new THREE.Matrix4().makeTranslation(delta.x,delta.y,delta.z);
}
function syncObjectPlacements(){
  const m=manager();if(!m)return;
  const live=state()?.mesh;
  for(const o of m.objects){const source=ensureSource(o);if(!source)continue;const world=o.id===m.activeId&&live?live:o.mesh;if(!world||world.vertices.length!==source.mesh.vertices.length)continue;const placement=derivePlacement(source.mesh,world);if(placement)setMatrix(o,placement);o.mesh=evaluatedMesh(o);}
}
function syncActiveEdit(){
  const m=manager(),live=state()?.mesh;if(!m||!live)return false;
  const o=m.objects.find(x=>x.id===m.activeId);if(!o)return false;
  const source=ensureSource(o);if(!source)return false;
  const local=transformMesh(live,matrixFor(o).clone().invert());
  if(meshNear(local,source.mesh))return false;
  source.mesh=local.clone();source.revision++;
  for(const peer of m.objects){if(peer.sourceId!==o.sourceId)continue;peer.mesh=evaluatedMesh(peer);}
  return true;
}
function syncNow(){
  if(syncing)return;syncing=true;
  try{ensureAll();if(mode()==='object')syncObjectPlacements();else if(syncActiveEdit()){queueRefresh();}decorate();updateButtons();}finally{syncing=false;}
}
function queueRefresh(){if(refreshQueued)return;refreshQueued=true;requestAnimationFrame(()=>{refreshQueued=false;document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));});}

function activeObject(){const m=manager();return m?.objects?.find(o=>o.id===m.activeId)||null;}
let linkedButton=null,uniqueButton=null;
function linkedDuplicate(){
  const m=manager(),sourceObject=activeObject();if(!m||!sourceObject)return;
  m.saveActive?.();syncNow();const source=ensureSource(sourceObject);if(!source)return;
  const copy=m.addMesh(evaluatedMesh(sourceObject),`${sourceObject.name} linked`,{settings:sourceObject.settings,visible:sourceObject.visible!==false,locked:false,kind:sourceObject.kind,enterObjectMode:true});
  if(!copy)return;
  copy.sourceId=sourceObject.sourceId;setMatrix(copy,matrixFor(sourceObject));copy.mesh=evaluatedMesh(copy);
  if(sourceObject.origin)copy.origin={...sourceObject.origin};
  queueRefresh();requestAnimationFrame(()=>{decorate();updateButtons();});
  if(status)status.textContent=`Linked instance created • ${linkedCount(sourceObject.sourceId)} share the same geometry`;
}
function makeUnique(){
  const o=activeObject();if(!o)return;syncNow();const old=o.sourceId;if(!old||linkedCount(old)<2){if(status)status.textContent='Object is already unique';return;}
  const source=ensureSource(o);o.sourceId=newSource(source.mesh);o.mesh=evaluatedMesh(o);decorate();updateButtons();queueRefresh();if(status)status.textContent=`${o.name} made unique • geometry detached from linked instances`;
}
function installUI(){
  if(!drawer||document.querySelector('#instanceFoundationTools'))return;
  const row=document.createElement('div');row.id='instanceFoundationTools';row.className='outliner-actions';row.style.gridTemplateColumns='1fr 1fr';
  linkedButton=document.createElement('button');linkedButton.type='button';linkedButton.textContent='Linked Duplicate';linkedButton.title='Create another object that shares this source geometry';
  uniqueButton=document.createElement('button');uniqueButton.type='button';uniqueButton.textContent='Make Unique';uniqueButton.title='Detach this instance into independent source geometry';
  row.append(linkedButton,uniqueButton);
  const standard=document.querySelector('#outlinerAddBtn')?.parentElement;standard?.before(row)??drawer.append(row);
  linkedButton.addEventListener('click',linkedDuplicate);uniqueButton.addEventListener('click',makeUnique);
  updateButtons();
}
function updateButtons(){const o=activeObject();if(linkedButton)linkedButton.disabled=!o||o.kind==='reference';if(uniqueButton)uniqueButton.disabled=!o||!o.sourceId||linkedCount(o.sourceId)<2;}
function decorate(){
  const m=manager();if(!list||!m)return;
  for(const row of list.querySelectorAll('.outliner-row')){const id=Number(row.dataset.objectId),o=m.objects.find(x=>x.id===id),name=row.querySelector('.outliner-name');if(!o||!name)continue;const count=o.sourceId?linkedCount(o.sourceId):1;const base=o.kind==='reference'?`${o.name} • Ref`:o.name;name.textContent=count>1?`${base} • Link ×${count}`:base;name.title=count>1?`${count} linked instances share source geometry`:name.title;}
}

function initialize(){if(!manager()||!state()?.mesh)return false;ensureAll();installUI();syncNow();globalThis.__boxlabObjectGeometry={version:'0.36.19.0',evaluatedMesh(id){const o=manager()?.objects?.find(x=>x.id===id);return o?evaluatedMesh(o):null;},sourceId(id){return manager()?.objects?.find(x=>x.id===id)?.sourceId||null;},linkedIds(id){const o=manager()?.objects?.find(x=>x.id===id);return o?[...(manager()?.objects||[])].filter(x=>x.sourceId===o.sourceId).map(x=>x.id):[];},makeUnique(id){const m=manager();if(id!=null&&m?.activeId!==id)m.activate?.(id);makeUnique();}};window.addEventListener('boxlab-bridge-state',syncNow);document.querySelector('#selectionModes')?.addEventListener('click',()=>queueMicrotask(syncNow),true);document.querySelector('#toolModes')?.addEventListener('click',()=>queueMicrotask(syncNow),true);list?.addEventListener('click',()=>requestAnimationFrame(()=>{syncNow();decorate();}),true);window.dispatchEvent(new Event('boxlab-instance-foundation-ready'));return true;}

if(!initialize()){const ready=()=>{if(initialize())window.removeEventListener('boxlab-object-manager-ready',ready);};window.addEventListener('boxlab-object-manager-ready',ready);}
