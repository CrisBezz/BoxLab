import * as THREE from 'three';

const canvas=document.querySelector('#viewport');
const status=document.querySelector('#selectionStatus');
const dock=document.querySelector('#componentSelectionTools .selection-dock');
const multiToggle=document.querySelector('#multiSelectToggle');
const raycaster=new THREE.Raycaster();
const ndc=new THREE.Vector2();
let armed=false,gesture=null,overlay=null,polyline=null;

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function manager(){return globalThis.__boxlabObjectManager;}
function objectSelection(){return globalThis.__boxlabObjectSelection;}
function mode(){return bridge()?.mode?.()||document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function depth(){return document.querySelector('#paintSelectDepth [data-paint-depth].active')?.dataset?.paintDepth||'visible';}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function screenPoint(p){const camera=state()?.camera,r=canvas?.getBoundingClientRect();if(!camera||!r)return null;const q=p.clone().project(camera);return{x:r.left+(q.x*.5+.5)*r.width,y:r.top+(-q.y*.5+.5)*r.height,z:q.z};}
function pointInPoly(p,poly){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if(((a.y>p.y)!==(b.y>p.y))&&(p.x<(b.x-a.x)*(p.y-a.y)/((b.y-a.y)||1e-12)+a.x))inside=!inside;}return inside;}
function setRayAt(p){const r=canvas.getBoundingClientRect();ndc.set(((p.x-r.left)/r.width)*2-1,-(((p.y-r.top)/r.height)*2-1));raycaster.setFromCamera(ndc,state().camera);}
function activeBodies(){const active=manager()?.activeId,out=[];state()?.scene?.traverse?.(o=>{if(!o?.visible)return;if(o.userData?.kind==='body')out.push(o);else if(o.userData?.kind==='boxlab-inactive-body'&&o.userData?.objectId===active)out.push(o);});return out;}
function visibleWorldPoint(world,p){const camera=state()?.camera,bodies=activeBodies();if(!camera||!bodies.length)return true;setRayAt(p);const hit=raycaster.intersectObjects(bodies,false)[0];if(!hit)return false;const targetDistance=camera.position.distanceTo(world),tol=Math.max(1e-3,targetDistance*2e-4);return Math.abs(hit.distance-targetDistance)<=tol;}
function representativeWorld(type,index,m){if(type==='vertex')return m.vertices[index]?.clone()||null;if(type==='edge'){const e=m.edges()[index];return e?m.vertices[e.a].clone().lerp(m.vertices[e.b],.5):null;}if(type==='face'){const f=m.faces[index];if(!f?.length)return null;const c=new THREE.Vector3();f.forEach(id=>c.add(m.vertices[id]));return c.multiplyScalar(1/f.length);}return null;}
function representative(type,index,m){const p=representativeWorld(type,index,m);return p&&screenPoint(p);}
function componentHits(type,index,m,poly){if(type==='vertex'){const p=screenPoint(m.vertices[index]);return !!(p&&pointInPoly(p,poly));}if(type==='edge'){const p=representative(type,index,m);return !!(p&&pointInPoly(p,poly));}if(type==='face'){const p=representative(type,index,m);return !!(p&&pointInPoly(p,poly));}return false;}
function componentSelection(poly,type){const m=state()?.mesh;if(!m)return[];const count=type==='vertex'?m.vertices.length:type==='edge'?m.edges().length:type==='face'?m.faces.length:0,out=[];for(let i=0;i<count;i++){if(!componentHits(type,i,m,poly))continue;if(depth()==='visible'&&type!=='vertex'){const world=representativeWorld(type,i,m),p=world&&screenPoint(world);if(!world||!p||!visibleWorldPoint(world,p))continue;}out.push(i);}return out;}
function objectCenter(object){const m=object.id===manager()?.activeId?state()?.mesh:object.mesh;if(!m?.vertices?.length)return null;return new THREE.Box3().setFromPoints(m.vertices).getCenter(new THREE.Vector3());}
function renderedBodies(){const out=[];state()?.scene?.traverse?.(o=>{if(o?.visible&&(o.userData?.kind==='body'||o.userData?.kind==='boxlab-inactive-body'))out.push(o);});return out;}
function visibleObject(id,p){const bodies=renderedBodies(),camera=state()?.camera;if(!bodies.length||!camera)return true;setRayAt(p);const hit=raycaster.intersectObjects(bodies,false)[0];if(!hit)return false;const hitId=Number.isInteger(hit.object?.userData?.objectId)?hit.object.userData.objectId:manager()?.activeId;return hitId===id;}
function objectSelectionInPoly(poly){const m=manager(),objects=m?.objects||[],out=[];for(const object of objects){if(object.visible===false)continue;const c=objectCenter(object),p=c&&screenPoint(c);if(!p||!pointInPoly(p,poly))continue;if(depth()==='visible'&&!visibleObject(object.id,p))continue;out.push(object.id);}return out;}
function applySelection(poly){const type=mode();if(type==='object'){const ids=objectSelectionInPoly(poly),sel=objectSelection();if(!sel)return;const next=sel.multi?[...new Set([...sel.ids,...ids])]:ids;sel.select(next);if(status)status.textContent=`Lasso • ${next.length} object${next.length===1?'':'s'} selected • ${depth()}`;return;}if(!['vertex','edge','face'].includes(type))return;const hits=componentSelection(poly,type),b=bridge();if(!b)return;const current=multiToggle?.checked?b.indices?.()||[]:[],next=[...new Set([...current,...hits])];b.set(type,next);if(status)status.textContent=`Lasso • ${next.length} ${type}${next.length===1?'':'s'} selected • ${depth()}`;}
function ensureOverlay(){if(overlay)return;overlay=document.createElementNS('http://www.w3.org/2000/svg','svg');overlay.id='boxlabLassoOverlay';overlay.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9998;overflow:visible';polyline=document.createElementNS('http://www.w3.org/2000/svg','polyline');polyline.setAttribute('fill','rgba(255,255,255,.06)');polyline.setAttribute('stroke','rgba(255,255,255,.95)');polyline.setAttribute('stroke-width','2');polyline.setAttribute('stroke-linejoin','round');polyline.setAttribute('stroke-linecap','round');overlay.appendChild(polyline);document.body.appendChild(overlay);}
function draw(points){ensureOverlay();polyline.setAttribute('points',points.map(p=>`${p.x},${p.y}`).join(' '));}
function clearDraw(){polyline?.setAttribute('points','');}
function setArmed(next){armed=!!next;button?.classList.toggle('active',armed);clearDraw();gesture=null;if(status)status.textContent=armed?`Lasso • Pencil draw around ${mode()} • finger orbits • ${depth()}`:`${mode().charAt(0).toUpperCase()+mode().slice(1)} mode`;}

const button=document.createElement('button');button.id='lassoSelectBtn';button.type='button';button.textContent='Lasso';button.title='Pencil/mouse draws lasso; finger remains navigation';dock?.appendChild(button);button.addEventListener('click',()=>setArmed(!armed));
for(const b of document.querySelectorAll('#toolModes button,#extrudeBtn,#insetBtn,#knifeBtn,#loopCutBtn,#faceSplitBtn,#bevelBtn,#buildEdgeBtn,#vertexBevelBtn'))b.addEventListener('click',()=>{if(armed)setArmed(false);});
for(const b of document.querySelectorAll('#selectionModes button,#paintSelectDepth [data-paint-depth]'))b.addEventListener('click',()=>{if(armed)queueMicrotask(()=>{if(status)status.textContent=`Lasso • Pencil draw around ${mode()} • finger orbits • ${depth()}`;});});

canvas?.addEventListener('pointerdown',event=>{if(!armed||!event.isPrimary||event.button>0||event.pointerType==='touch')return;event.preventDefault();event.stopImmediatePropagation();gesture={id:event.pointerId,points:[{x:event.clientX,y:event.clientY}],start:{x:event.clientX,y:event.clientY}};canvas.setPointerCapture?.(event.pointerId);draw(gesture.points);},true);
canvas?.addEventListener('pointermove',event=>{if(!gesture||gesture.id!==event.pointerId)return;event.preventDefault();event.stopImmediatePropagation();const last=gesture.points.at(-1),p={x:event.clientX,y:event.clientY};if(Math.hypot(p.x-last.x,p.y-last.y)<4)return;gesture.points.push(p);draw([...gesture.points,gesture.points[0]]);},true);
function finish(event,cancel=false){if(!gesture||gesture.id!==event.pointerId)return;event.preventDefault();event.stopImmediatePropagation();const g=gesture;gesture=null;clearDraw();if(cancel||g.points.length<3||Math.hypot(event.clientX-g.start.x,event.clientY-g.start.y)<10)return;applySelection(g.points);render();}
canvas?.addEventListener('pointerup',event=>finish(event,false),true);
canvas?.addEventListener('pointercancel',event=>finish(event,true),true);
