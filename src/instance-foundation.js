// BoxLab v0.36.19.6 — linked instance editing foundation.
// World-space object meshes remain authoritative for placement. Placement is
// captured explicitly when leaving Object mode; component commits are observed
// only after their owning modelling gesture has finished.

import * as THREE from 'three';

const drawer=document.querySelector('#objectsDrawer .drawer-content');
const list=document.querySelector('#outlinerList');
const status=document.querySelector('#selectionStatus');
const selectionModes=document.querySelector('#selectionModes');
const EPS=1e-7;
let nextSourceId=1;
let linkedButton=null,uniqueButton=null;
let syncQueued=false;
const sources=new Map();

function manager(){return globalThis.__boxlabObjectManager;}
function state(){return globalThis.__boxlabBridgeState;}
function mode(){return globalThis.__boxlabSelectionBridge?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function objects(){return manager()?.objects||[];}
function activeObject(){const m=manager();return m?.objects?.find(o=>o.id===m.activeId)||null;}
function matrixFor(o){return Array.isArray(o?.instanceMatrix)&&o.instanceMatrix.length===16?new THREE.Matrix4().fromArray(o.instanceMatrix):new THREE.Matrix4();}
function setMatrix(o,m){o.instanceMatrix=m.elements.slice();}
function transformMesh(mesh,matrix){const out=mesh.clone();for(const v of out.vertices)v.applyMatrix4(matrix);out.edges?.();return out;}
function meshNear(a,b,eps=EPS){if(!a||!b||a.vertices?.length!==b.vertices?.length||a.faces?.length!==b.faces?.length)return false;for(let i=0;i<a.vertices.length;i++)if(a.vertices[i].distanceToSquared(b.vertices[i])>eps*eps)return false;for(let i=0;i<a.faces.length;i++){const x=a.faces[i],y=b.faces[i];if(!y||x.length!==y.length)return false;for(let j=0;j<x.length;j++)if(x[j]!==y[j])return false;}return true;}
function newSource(mesh){const id=`source-${nextSourceId++}`;sources.set(id,{id,mesh:mesh.clone(),revision:0});return id;}
function ensureSource(o){if(!o)return null;if(!Array.isArray(o.instanceMatrix)||o.instanceMatrix.length!==16)setMatrix(o,new THREE.Matrix4());if(o.sourceId&&sources.has(o.sourceId))return sources.get(o.sourceId);o.sourceId=newSource(o.mesh);return sources.get(o.sourceId);}
function ensureAll(){for(const o of objects())ensureSource(o);}
function linkedCount(sourceId){return objects().filter(o=>o.sourceId===sourceId).length;}
function evaluatedMesh(o){const source=ensureSource(o);return source?transformMesh(source.mesh,matrixFor(o)):o?.mesh?.clone?.();}

function basisIndices(mesh){const v=mesh?.vertices||[];if(v.length<4)return null;const p0=v[0];let i1=-1,i2=-1,i3=-1;for(let i=1;i<v.length;i++)if(v[i].distanceToSquared(p0)>1e-12){i1=i;break;}if(i1<0)return null;const a=v[i1].clone().sub(p0);for(let i=1;i<v.length;i++){if(i===i1)continue;const b=v[i].clone().sub(p0);if(new THREE.Vector3().crossVectors(a,b).lengthSq()>1e-12){i2=i;break;}}if(i2<0)return null;const b=v[i2].clone().sub(p0),n=new THREE.Vector3().crossVectors(a,b);for(let i=1;i<v.length;i++){if(i===i1||i===i2)continue;const c=v[i].clone().sub(p0);if(Math.abs(n.dot(c))>1e-10){i3=i;break;}}return i3<0?null:[0,i1,i2,i3];}
function frameMatrix(mesh,ids){const [i0,i1,i2,i3]=ids,p0=mesh.vertices[i0],a=mesh.vertices[i1].clone().sub(p0),b=mesh.vertices[i2].clone().sub(p0),c=mesh.vertices[i3].clone().sub(p0);return new THREE.Matrix4().set(a.x,b.x,c.x,p0.x,a.y,b.y,c.y,p0.y,a.z,b.z,c.z,p0.z,0,0,0,1);}
function centroid(mesh){const c=new THREE.Vector3();for(const v of mesh.vertices)c.add(v);return mesh.vertices.length?c.multiplyScalar(1/mesh.vertices.length):c;}
function derivePlacement(local,world){if(!local||!world||local.vertices.length!==world.vertices.length)return null;const ids=basisIndices(local);if(ids){const m=frameMatrix(world,ids).multiply(frameMatrix(local,ids).invert());let max=0;for(let i=0;i<local.vertices.length;i++)max=Math.max(max,local.vertices[i].clone().applyMatrix4(m).distanceToSquared(world.vertices[i]));if(max<1e-8)return m;}const d=centroid(world).sub(centroid(local));return new THREE.Matrix4().makeTranslation(d.x,d.y,d.z);}

function capturePlacement(){const live=state()?.mesh,o=activeObject();if(!live||!o)return false;const source=ensureSource(o);if(!source||live.vertices.length!==source.mesh.vertices.length)return false;const placement=derivePlacement(source.mesh,live);if(!placement)return false;setMatrix(o,placement);o.mesh=live.clone();return true;}
function commitSharedEdit(){const m=manager(),live=state()?.mesh,o=activeObject();if(!m||!live||!o)return false;const source=ensureSource(o);if(!source)return false;const inverse=matrixFor(o).invert(),local=transformMesh(live,inverse);if(meshNear(local,source.mesh)){o.mesh=live.clone();return false;}source.mesh=local.clone();source.revision++;for(const peer of m.objects){if(peer.sourceId!==o.sourceId)continue;peer.mesh=transformMesh(source.mesh,matrixFor(peer));}o.mesh=live.clone();return true;}
function refresh(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function syncAfterGesture(releaseMode){if(releaseMode==='object')capturePlacement();else if(commitSharedEdit())requestAnimationFrame(refresh);decorate();updateButtons();}
function queueGestureSync(releaseMode){if(syncQueued)return;syncQueued=true;setTimeout(()=>{syncQueued=false;syncAfterGesture(releaseMode);},0);}
function commitFaceEdit(){
  if(mode()==='object')return;
  if(commitSharedEdit())refresh();
  decorate();updateButtons();
}

function linkedDuplicate(){const m=manager(),src=activeObject();if(!m||!src)return;m.saveActive?.();if(mode()==='object')capturePlacement();const source=ensureSource(src);if(!source)return;const copy=m.addMesh(src.mesh.clone(),`${src.name} linked`,{settings:src.settings,visible:src.visible!==false,locked:false,kind:src.kind,enterObjectMode:true});if(!copy)return;copy.sourceId=src.sourceId;setMatrix(copy,matrixFor(src));copy.mesh=src.mesh.clone();if(src.origin)copy.origin={...src.origin};requestAnimationFrame(()=>{decorate();updateButtons();});if(status)status.textContent=`Linked instance created • ${linkedCount(src.sourceId)} share geometry`;}
function makeUnique(){const o=activeObject();if(!o)return;if(mode()==='object')capturePlacement();const source=ensureSource(o);if(!source||linkedCount(o.sourceId)<2){if(status)status.textContent='Object is already unique';return;}o.sourceId=newSource(source.mesh);decorate();updateButtons();if(status)status.textContent=`${o.name} made unique`;}
function installUI(){if(!drawer||document.querySelector('#instanceFoundationTools'))return;const row=document.createElement('div');row.id='instanceFoundationTools';row.className='outliner-actions';row.style.gridTemplateColumns='1fr 1fr';linkedButton=document.createElement('button');linkedButton.type='button';linkedButton.textContent='Linked Duplicate';linkedButton.title='Create a linked instance sharing source geometry';uniqueButton=document.createElement('button');uniqueButton.type='button';uniqueButton.textContent='Make Unique';uniqueButton.title='Detach this instance from shared source geometry';row.append(linkedButton,uniqueButton);const standard=document.querySelector('#outlinerAddBtn')?.parentElement;standard?.before(row)??drawer.append(row);linkedButton.addEventListener('click',linkedDuplicate);uniqueButton.addEventListener('click',makeUnique);}
function updateButtons(){const o=activeObject();if(linkedButton)linkedButton.disabled=!o||o.kind==='reference';if(uniqueButton)uniqueButton.disabled=!o||!o.sourceId||linkedCount(o.sourceId)<2;}
function decorate(){const m=manager();if(!list||!m)return;for(const row of list.querySelectorAll('.outliner-row')){const id=Number(row.dataset.objectId),o=m.objects.find(x=>x.id===id),name=row.querySelector('.outliner-name');if(!o||!name)continue;const count=o.sourceId?linkedCount(o.sourceId):1,base=o.kind==='reference'?`${o.name} • Ref`:o.name;name.textContent=count>1?`${base} • Link ×${count}`:base;}}
function initialize(){if(!manager()||!state()?.mesh)return false;ensureAll();installUI();decorate();updateButtons();globalThis.__boxlabObjectGeometry={version:'0.36.19.6',evaluatedMesh(id){const o=objects().find(x=>x.id===id);return o?evaluatedMesh(o):null;},sourceId(id){return objects().find(x=>x.id===id)?.sourceId||null;},linkedIds(id){const o=objects().find(x=>x.id===id);return o?objects().filter(x=>x.sourceId===o.sourceId).map(x=>x.id):[];}};
  selectionModes?.addEventListener('pointerdown',event=>{const next=event.target.closest('button[data-mode]')?.dataset?.mode;if(mode()==='object'&&next&&next!=='object')capturePlacement();},true);
  window.addEventListener('boxlab-face-edit-committed',commitFaceEdit);
  window.addEventListener('boxlab-instance-face-fallback-commit',commitFaceEdit);
  window.addEventListener('pointerup',()=>{const m=mode();if(m==='object')return;if(m==='face'&&globalThis.__boxlabFaceToolGuard?.active?.())return;queueGestureSync(m);},true);
  window.addEventListener('pointercancel',()=>{syncQueued=false;},true);
  list?.addEventListener('click',()=>requestAnimationFrame(()=>{ensureAll();decorate();updateButtons();}),true);
  window.addEventListener('boxlab-bridge-state',()=>requestAnimationFrame(()=>{ensureAll();decorate();updateButtons();}));
  window.dispatchEvent(new Event('boxlab-instance-foundation-ready'));return true;}
if(!initialize()){const ready=()=>{if(initialize())window.removeEventListener('boxlab-object-manager-ready',ready);};window.addEventListener('boxlab-object-manager-ready',ready);}
