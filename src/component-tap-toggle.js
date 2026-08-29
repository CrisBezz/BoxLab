import * as THREE from 'three';
const canvas=document.querySelector('#viewport');
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();
const TAP=8;
let press=null;
function bridge(){return globalThis.__boxlabSelectionBridge;}
function state(){return globalThis.__boxlabBridgeState;}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode;}
function selected(){return [...new Set(bridge()?.indices?.()||[])];}
function screenPoint(v,camera){const p=v.clone().project(camera),r=canvas.getBoundingClientRect();return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);}
function hitVertex(event,s,ids){const p=new THREE.Vector2(event.clientX,event.clientY);let best=null;for(const i of ids){const v=s.mesh?.vertices?.[i];if(!v)continue;const d=screenPoint(v,s.camera).distanceTo(p);if(d<=22&&(!best||d<best.d))best={index:i,d};}return best?.index??null;}
function hitEdge(event,s,ids){const p=new THREE.Vector2(event.clientX,event.clientY),edges=s.mesh?.edges?.()||[];let best=null;for(const i of ids){const e=edges[i];if(!e)continue;const a=screenPoint(s.mesh.vertices[e.a],s.camera),b=screenPoint(s.mesh.vertices[e.b],s.camera),ab=b.clone().sub(a),l=ab.lengthSq();if(l<1)continue;const q=a.clone().addScaledVector(ab,THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/l,0,1)),d=p.distanceTo(q);if(d<=18&&(!best||d<best.d))best={index:i,d};}return best?.index??null;}
function hitFace(event,s,ids){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1));raycaster.setFromCamera(pointer,s.camera);for(const fi of ids){const f=s.mesh?.faces?.[fi];if(!f||f.length<3)continue;const pos=[];for(let i=1;i<f.length-1;i++)for(const vi of[f[0],f[i],f[i+1]]){const v=s.mesh.vertices[vi];pos.push(v.x,v.y,v.z);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));const m=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});const obj=new THREE.Mesh(g,m),ok=raycaster.intersectObject(obj,false).length>0;g.dispose();m.dispose();if(ok)return fi;}return null;}
function hitSelected(event){const s=state(),m=mode(),ids=selected();if(!s?.mesh||!s?.camera||!ids.length||!['vertex','edge','face'].includes(m))return null;if(m==='vertex')return hitVertex(event,s,ids);if(m==='edge')return hitEdge(event,s,ids);return hitFace(event,s,ids);}
function directToolActive(){return !!document.querySelector('#extrudeBtn.active,#insetBtn.active,#bevelBtn.active,#vertexBevelBtn.active,#loopCutBtn.active');}
canvas?.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.pointerType==='touch'||directToolActive())return;const index=hitSelected(e);if(!Number.isInteger(index))return;press={id:e.pointerId,index,mode:mode(),x:e.clientX,y:e.clientY,moved:false};},true);
canvas?.addEventListener('pointermove',e=>{if(!press||press.id!==e.pointerId)return;if(Math.hypot(e.clientX-press.x,e.clientY-press.y)>=TAP)press.moved=true;},true);
canvas?.addEventListener('pointerup',e=>{if(!press||press.id!==e.pointerId)return;const p=press;press=null;if(p.moved||Math.hypot(e.clientX-p.x,e.clientY-p.y)>=TAP)return;queueMicrotask(()=>{const b=bridge();if(!b||b.mode?.()!==p.mode)return;const ids=[...new Set(b.indices?.()||[])];if(!ids.includes(p.index))return;b.set(p.mode,ids.filter(i=>i!==p.index));});},true);
canvas?.addEventListener('pointercancel',e=>{if(press?.id===e.pointerId)press=null;},true);
