import './uniform-inset.js?v=0.32.11';
import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
const extrudeButton = document.querySelector('#extrudeBtn');
const insetButton = document.querySelector('#insetBtn');
const transformButtons=[...document.querySelectorAll('#toolModes button')];
const status = document.querySelector('#selectionStatus');
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let armed = null;
let drag = null;
let pendingSelection = null;

function state(){ return globalThis.__boxlabBridgeState; }
function bridge(){ return globalThis.__boxlabSelectionBridge; }
function mesh(){ return state()?.mesh || null; }
function faces(){const b=bridge();return b?.mode?.()==='face'?[...new Set(b.indices?.()||[])]:[];}
function info(ids=faces()){const m=mesh();return m&&ids.length>1?m.faceRegionsInfo?.(ids):null;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function restore(target,source){target.vertices=source.vertices.map(v=>v.clone());target.faces=source.faces.map(f=>[...f]);target.creases=new Map(source.creases);target.looseEdges=new Set(source.looseEdges||[]);target.looseVertices=new Set(source.looseVertices||[]);}
function disarmTransforms(){globalThis.__boxlabTransformArming?.disarm?.();transformButtons.forEach(button=>button.classList.remove('active'));}
function syncButtons(){extrudeButton?.classList.toggle('active',armed==='extrude');insetButton?.classList.toggle('active',armed==='inset');if(armed)disarmTransforms();}
function setArmed(tool){armed=tool;syncButtons();}
function toggleArmed(tool){armed=armed===tool?null:tool;syncButtons();}
function updateStatus(){const i=info();if(!status||!i||!armed)return;status.textContent=`${i.faceIndices.length} faces • ${i.regionCount} region${i.regionCount===1?'':'s'} • drag to ${armed==='extrude'?'Extrude':'Uniform Inset'}`;}
function screenPoint(point,camera){const p=point.clone().project(camera),r=canvas.getBoundingClientRect();return{x:r.left+(p.x*.5+.5)*r.width,y:r.top+(-p.y*.5+.5)*r.height};}
function centerOf(m,vertices){const c=m.vertices[vertices[0]].clone().set(0,0,0);vertices.forEach(i=>c.add(m.vertices[i]));return c.multiplyScalar(1/vertices.length);}
function projectedNormal(m,region,camera){const n=region?.normal||m.faceRegionNormal?.(region?.faceIndices||[]);if(!region||!n||!camera)return{x:0,y:-1};const c=centerOf(m,region.regionVertices),a=screenPoint(c,camera),b=screenPoint(c.clone().add(n),camera),x=b.x-a.x,y=b.y-a.y,l=Math.hypot(x,y);return l>1e-4?{x:x/l,y:y/l}:{x:0,y:-1};}
function setPointer(event){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1));}
function hitSelectedFace(event,m,ids,camera){setPointer(event);raycaster.setFromCamera(pointer,camera);const pickers=[];for(const faceIndex of ids){const f=m.faces[faceIndex];if(!Array.isArray(f)||f.length<3)continue;const positions=[];for(let i=1;i<f.length-1;i++)for(const vi of[f[0],f[i],f[i+1]]){const v=m.vertices[vi];if(v)positions.push(v.x,v.y,v.z);}if(!positions.length)continue;const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));const mat=new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),picker=new THREE.Mesh(g,mat);picker.userData.faceIndex=faceIndex;pickers.push(picker);}const hit=raycaster.intersectObjects(pickers,false)[0],faceIndex=Number.isInteger(hit?.object?.userData?.faceIndex)?hit.object.userData.faceIndex:null;pickers.forEach(p=>{p.geometry.dispose();p.material.dispose();});return faceIndex;}

document.addEventListener('boxlab-direct-tool-exclusive',event=>{if(event.detail?.tool==='knife'){armed=null;drag=null;pendingSelection=null;syncButtons();}},true);
document.addEventListener('pointerdown',event=>{const target=event.target?.closest?.('#extrudeBtn,#insetBtn');if(!target)return;const ids=faces();pendingSelection=ids.length?{tool:target.id==='extrudeBtn'?'extrude':'inset',ids:[...ids]}:null;},true);
document.addEventListener('click',event=>{const transform=event.target?.closest?.('#toolModes button');if(transform){pendingSelection=null;if(armed){armed=null;syncButtons();}return;}const target=event.target?.closest?.('#extrudeBtn,#insetBtn');if(!target)return;const tool=target.id==='extrudeBtn'?'extrude':'inset',captured=pendingSelection?.tool===tool?[...pendingSelection.ids]:faces();pendingSelection=null;const group=info(captured);disarmTransforms();if(group){event.preventDefault();event.stopImmediatePropagation();bridge()?.set?.('face',captured);toggleArmed(tool);updateStatus();return;}setArmed(armed===tool?null:tool);},true);
window.addEventListener('boxlab-bridge-state',()=>{if(!armed)return;queueMicrotask(()=>{syncButtons();updateStatus();});});
document.addEventListener('pointerdown',event=>{if(!armed||event.target!==canvas||!event.isPrimary)return;const ids=faces();if(ids.length<2)return;const m=mesh(),group=m?.faceRegionsInfo?.(ids),camera=state()?.camera;if(!m||!group||!camera)return;const hit=hitSelectedFace(event,m,ids,camera);if(!Number.isInteger(hit))return;const region=group.regions.find(r=>r.faceIndices.includes(hit))||group.regions[0];event.preventDefault();event.stopImmediatePropagation();drag={id:event.pointerId,x:event.clientX,y:event.clientY,tool:armed,m,before:m.clone(),faces:[...ids],normal:projectedNormal(m,region,camera),changed:false,preview:false};canvas.setPointerCapture?.(event.pointerId);},true);
document.addEventListener('pointermove',event=>{if(!drag||drag.id!==event.pointerId)return;event.preventDefault();event.stopImmediatePropagation();const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(!drag.changed&&Math.hypot(dx,dy)<8)return;if(!drag.changed){globalThis.__boxlabHistory?.push(drag.before);drag.changed=true;}restore(drag.m,drag.before);if(drag.tool==='extrude'){const distance=(dx*drag.normal.x+dy*drag.normal.y)*.006,result=drag.m.extrudeFaceRegions?.(drag.faces,distance);drag.preview=!!result;if(result&&status)status.textContent=`Extrude • ${drag.faces.length} faces • ${result.regionCount} region${result.regionCount===1?'':'s'} • ${distance>=0?'+':''}${distance.toFixed(2)}`;}else{const amount=Math.max(.01,Math.min(.95,(dx-dy)*.004)),result=drag.m.insetFaceRegions?.(drag.faces,amount);drag.preview=!!result;if(result&&status){const distances=(result.regions||[]).map(r=>r.distance).filter(Number.isFinite),d=distances.length?Math.min(...distances):0;status.textContent=`Uniform Inset • ${drag.faces.length} faces • ${result.regionCount} region${result.regionCount===1?'':'s'} • ${d.toFixed(3)}`;}}render();},true);
function finish(event){if(!drag||drag.id!==event.pointerId)return;event.preventDefault();event.stopImmediatePropagation();const done=event.type==='pointerup'&&drag.changed&&drag.preview,m=drag.m,ids=[...drag.faces],tool=drag.tool,before=drag.before;drag=null;if(!done)restore(m,before);else bridge()?.set?.('face',ids);syncButtons();const i=info();if(i&&status&&armed)status.textContent=`${i.faceIndices.length} faces • ${i.regionCount} region${i.regionCount===1?'':'s'} • ${tool==='extrude'?'Extrude':'Uniform Inset'} ready`;render();}
document.addEventListener('pointerup',finish,true);document.addEventListener('pointercancel',finish,true);
