import * as THREE from 'three';

const canvas=document.querySelector('#viewport');
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();

function bridge(){return globalThis.__boxlabSelectionBridge;}
function state(){return globalThis.__boxlabBridgeState;}
function transformArmed(){return !!globalThis.__boxlabTransformArming?.active?.();}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode;}
function selected(){return [...new Set(bridge()?.indices?.()||[])];}
function directToolActive(){return !!document.querySelector('#extrudeBtn.active,#insetBtn.active,#bevelBtn.active,#vertexBevelBtn.active,#loopCutBtn.active,#applyCreaseBtn.active,#addVertexBtn.active');}
function screenPoint(v,camera){const p=v.clone().project(camera),r=canvas.getBoundingClientRect();return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);}
function hitVertex(event,s,ids){const p=new THREE.Vector2(event.clientX,event.clientY);let best=null;for(const index of ids){const v=s.mesh?.vertices?.[index];if(!v)continue;const d=screenPoint(v,s.camera).distanceTo(p);if(d<=24&&(!best||d<best.d))best={index,d};}return best?.index??null;}
function hitEdge(event,s,ids){const p=new THREE.Vector2(event.clientX,event.clientY),edges=s.mesh?.edges?.()||[];let best=null;for(const index of ids){const e=edges[index];if(!e)continue;const a=screenPoint(s.mesh.vertices[e.a],s.camera),b=screenPoint(s.mesh.vertices[e.b],s.camera),ab=b.clone().sub(a),lenSq=ab.lengthSq();if(lenSq<1)continue;const t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/lenSq,0,1),q=a.clone().addScaledVector(ab,t),d=p.distanceTo(q);if(d<=20&&(!best||d<best.d))best={index,d};}return best?.index??null;}
function hitFace(event,s,ids){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-((event.clientY-r.top)/r.height*2-1));raycaster.setFromCamera(pointer,s.camera);let best=null;for(const index of ids){const face=s.mesh?.faces?.[index];if(!face||face.length<3)continue;const pos=[];for(let i=1;i<face.length-1;i++)for(const vi of [face[0],face[i],face[i+1]]){const v=s.mesh.vertices[vi];pos.push(v.x,v.y,v.z);}const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});const object=new THREE.Mesh(geometry,material),hit=raycaster.intersectObject(object,false)[0];geometry.dispose();material.dispose();if(hit&&(!best||hit.distance<best.distance))best={index,distance:hit.distance};}return best?.index??null;}
function hitSelected(event){const s=state(),m=mode(),ids=selected();if(!s?.mesh||!s?.camera||!ids.length||!['vertex','edge','face'].includes(m))return null;if(m==='vertex')return hitVertex(event,s,ids);if(m==='edge')return hitEdge(event,s,ids);return hitFace(event,s,ids);}

document.addEventListener('pointerdown',event=>{
  if(event.target!==canvas||!event.isPrimary||transformArmed()||directToolActive())return;
  const m=mode(),index=hitSelected(event);
  if(!Number.isInteger(index))return;
  const ids=selected();
  if(!ids.includes(index))return;
  event.preventDefault();
  event.stopImmediatePropagation();
  bridge()?.set?.(m,ids.filter(i=>i!==index));
},true);
