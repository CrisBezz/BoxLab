import * as THREE from 'three';
import {symmetryBisect,splitMeshByPlane} from './symmetry-bisect-core.js?v=0.36.18.473';
import {nearestCrossObjectSnap} from './cross-object-snap-core.js?v=0.36.18.324';

const VERSION='0.36.18.473';
const objectTools=document.querySelector('.mode-tools[data-mode-tools="object"]');
const status=document.querySelector('#selectionStatus');
const canvas=document.querySelector('#viewport');
const geometryToggle=document.querySelector('#inferenceSnapToggle');
const scaleButton=document.querySelector('#toolModes button[data-tool="scale"]');
const rotateSnapButton=document.querySelector('#transformSnapBtn');

const launchRow=document.createElement('div');
launchRow.className='outliner-actions symmetry-bisect-launch-row';
launchRow.style.gridTemplateColumns='1fr';
launchRow.innerHTML='<button id="symmetryBisectBtn" type="button">Symmetry / Bisect</button>';
objectTools?.appendChild(launchRow);
const launchButton=launchRow.querySelector('#symmetryBisectBtn');

const controls=document.createElement('div');
controls.id='symmetryBisectSession';
controls.className='boxlab-tool-session-shell symmetry-bisect-session';
controls.hidden=true;
controls.innerHTML=`
  <div class="boxlab-tool-session-title"><span>Symmetry / Bisect</span><span class="boxlab-tool-session-subtitle">Move / Rotate / Snap plane · then Apply</span></div>
  <div class="boxlab-tool-session-section">Orientation presets</div>
  <div class="outliner-actions symmetry-axis" style="grid-template-columns:repeat(3,1fr)">
    <button type="button" data-sym-axis="x" class="active">X</button>
    <button type="button" data-sym-axis="y">Y</button>
    <button type="button" data-sym-axis="z">Z</button>
  </div>
  <div class="boxlab-tool-session-section">Plane</div>
  <div class="outliner-actions" style="grid-template-columns:repeat(2,1fr)">
    <button id="symmetryMovePlaneBtn" type="button" class="active">Move / Rotate</button>
    <button id="symmetryAlignFaceBtn" type="button">Align to Face</button>
    <button id="symmetryFlipPlaneBtn" type="button">Flip Plane</button>
    <button id="symmetryResetPlaneBtn" type="button">Reset Origin</button>
  </div>
  <div class="boxlab-tool-session-subtitle" id="symmetryPlaneReadout">X · Origin</div>
  <div class="boxlab-tool-session-section">Keep side</div>
  <div class="outliner-actions symmetry-keep" style="grid-template-columns:repeat(2,1fr)">
    <button type="button" data-sym-keep="positive" class="active">Keep +</button>
    <button type="button" data-sym-keep="negative">Keep −</button>
  </div>
  <label class="toggle-row"><input id="symmetryMirrorToggle" type="checkbox" checked/><span>Mirror kept half</span></label>
  <div class="outliner-actions" style="grid-template-columns:repeat(3,1fr)">
    <button id="symmetryCancelBtn" type="button">Cancel</button>
    <button id="symmetryBisectOnlyBtn" type="button">Bisect Only</button>
    <button id="symmetryApplyBtn" class="boxlab-tool-session-primary" type="button">Apply</button>
  </div>
`;
objectTools?.appendChild(controls);

const axisButtons=[...controls.querySelectorAll('[data-sym-axis]')];
const keepButtons=[...controls.querySelectorAll('[data-sym-keep]')];
const mirrorToggle=controls.querySelector('#symmetryMirrorToggle');
const alignFaceButton=controls.querySelector('#symmetryAlignFaceBtn');
const flipPlaneButton=controls.querySelector('#symmetryFlipPlaneBtn');
const resetPlaneButton=controls.querySelector('#symmetryResetPlaneBtn');
const planeReadout=controls.querySelector('#symmetryPlaneReadout');
const cancelButton=controls.querySelector('#symmetryCancelBtn');
const bisectOnlyButton=controls.querySelector('#symmetryBisectOnlyBtn');
const applyButton=controls.querySelector('#symmetryApplyBtn');

let active=false,objectId=null,source=null,preview=null,planeSurface=null,axis='x',keep='positive',planeNormal=new THREE.Vector3(1,0,0),planePoint=new THREE.Vector3(),drag=null,alignFaceArmed=false,scaleWasDisabled=false;
const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();

function manager(){return globalThis.__boxlabObjectManager;}
function activeObject(){const m=manager();return m?.objects?.find(o=>o.id===m.activeId)||null;}
function mesh(){return globalThis.__boxlabBridgeState?.mesh||null;}
function scene(){return globalThis.__boxlabBridgeState?.scene||null;}
function camera(){return globalThis.__boxlabBridgeState?.camera||null;}
function mode(){return document.querySelector('#selectionModes button.active')?.dataset?.mode||'face';}
function tool(){return globalThis.__boxlabTransformArming?.tool?.()||document.querySelector('#toolModes button.active')?.dataset?.tool||null;}
function constraint(){return globalThis.__boxlabTransformArming?.constraint?.()||'free';}
function toolSession(){return globalThis.__boxlabToolSession||null;}
function setStatus(text){if(status)status.textContent=text;}
function mirrorModifierActive(){return [...document.querySelectorAll('[data-mirror-axis]')].some(input=>input.checked);}
function geometryOn(){return geometryToggle?.checked!==false;}
function beginSession(){
  controls.hidden=false;
  scaleWasDisabled=!!scaleButton?.disabled;
  if(scaleButton)scaleButton.disabled=true;
  toolSession()?.begin?.({id:'symmetry-bisect',title:'Symmetry / Bisect',node:controls,subtitle:'Move · Rotate · Snap Plane · Keep · Mirror · Apply'});
}
function endSession(){
  controls.hidden=true;
  if(scaleButton)scaleButton.disabled=scaleWasDisabled;
  toolSession()?.end?.('symmetry-bisect');
}
function axisVector(name){return new THREE.Vector3(name==='x'?1:0,name==='y'?1:0,name==='z'?1:0);}
function meshCenter(sourceMesh=source){
  const box=new THREE.Box3().setFromPoints(sourceMesh?.vertices||[]),center=new THREE.Vector3();
  return box.isEmpty()?center:box.getCenter(center);
}
function originPlanePoint(normal=planeNormal){
  const center=meshCenter(),n=normal.clone().normalize();
  return center.addScaledVector(n,-center.dot(n));
}
function visualPlaneCenter(){
  const center=meshCenter(),n=planeNormal.clone().normalize();
  return center.addScaledVector(n,-(center.clone().sub(planePoint)).dot(n));
}
function planeConstant(){return planeNormal.dot(planePoint);}
function setAxisPreset(name){
  axis=name;
  planeNormal.copy(axisVector(name));
  planePoint.copy(originPlanePoint(planeNormal));
  updateButtons();
}
function setPointer(event){
  const cam=camera(),r=canvas?.getBoundingClientRect();if(!cam||!r?.width||!r?.height)return false;
  pointer.x=((event.clientX-r.left)/r.width)*2-1;pointer.y=-((event.clientY-r.top)/r.height)*2+1;
  raycaster.setFromCamera(pointer,cam);return true;
}
function screenPoint(v){
  const cam=camera(),r=canvas?.getBoundingClientRect();if(!cam||!r||!v)return null;
  const p=v.clone().project(cam);
  return new THREE.Vector2(r.left+(p.x*.5+.5)*r.width,r.top+(-p.y*.5+.5)*r.height);
}
function disposePreview(){
  if(preview?.parent)preview.parent.remove(preview);
  preview?.traverse?.(n=>{n.geometry?.dispose?.();if(Array.isArray(n.material))n.material.forEach(m=>m?.dispose?.());else n.material?.dispose?.();});
  preview=null;planeSurface=null;
}
function planeVisual(sourceMesh){
  const box=new THREE.Box3().setFromPoints(sourceMesh.vertices),size=new THREE.Vector3();box.getSize(size);
  const extent=Math.max(size.x,size.y,size.z,1)*1.25;
  const g=new THREE.PlaneGeometry(extent,extent);
  const m=new THREE.MeshBasicMaterial({color:0xffd45c,transparent:true,opacity:.18,side:THREE.DoubleSide,depthTest:false,depthWrite:false});
  const plane=new THREE.Mesh(g,m);
  plane.userData.boxlabSymmetryPlane=true;
  plane.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),planeNormal.clone().normalize());
  plane.position.copy(visualPlaneCenter());
  plane.renderOrder=20;
  const wire=new THREE.LineSegments(new THREE.EdgesGeometry(g),new THREE.LineBasicMaterial({color:0xffd45c,transparent:true,opacity:.95,depthTest:false}));
  wire.quaternion.copy(plane.quaternion);wire.position.copy(plane.position);wire.renderOrder=21;
  const group=new THREE.Group();group.add(plane,wire);planeSurface=plane;return group;
}
function updateReadout(snap=null){
  const label=axis==='custom'?'Custom':axis.toUpperCase();
  if(planeReadout)planeReadout.textContent=`${label} · d ${planeConstant().toFixed(3)}${snap?` · Snap ${snap}`:''}`;
}
function buildPreview(snapLabel=null){
  if(!active||!source)return false;
  const result=symmetryBisect(source,{axis:axis==='custom'?'x':axis,keep,planeNormal,planePoint,mirror:!!mirrorToggle?.checked});
  disposePreview();updateReadout(snapLabel);
  if(!result.ok){setStatus(`Symmetry/Bisect preview unavailable • ${result.reason}`);return false;}
  const targetScene=scene();if(!targetScene)return false;
  const geometry=result.mesh.triangulatedGeometry();
  const fill=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.28,side:THREE.DoubleSide,depthTest:false,depthWrite:false}));
  const wire=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.82,side:THREE.DoubleSide,wireframe:true,depthTest:false,depthWrite:false}));
  fill.renderOrder=18;wire.renderOrder=19;
  preview=new THREE.Group();preview.name='BoxLab Symmetry Bisect Preview';preview.userData.boxlabSymmetryPreview=true;preview.add(fill,wire,planeVisual(source));
  targetScene.add(preview);
  setStatus(`Symmetry/Bisect • ${axis==='custom'?'Custom':axis.toUpperCase()} plane • Keep ${keep==='positive'?'+':'−'} • ${mirrorToggle?.checked?'Mirror':'Keep half'}${snapLabel?` • Snap ${snapLabel}`:''}`);
  return true;
}
function cancel({silent=false}={}){
  if(drag&&globalThis.__boxlabBridgeState?.controls)globalThis.__boxlabBridgeState.controls.enabled=true;
  drag=null;alignFaceArmed=false;disposePreview();active=false;objectId=null;source=null;axis='x';planeNormal.set(1,0,0);planePoint.set(0,0,0);endSession();sync();
  if(!silent)setStatus('Symmetry / Bisect cancelled');
}
function forceRender(){
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  globalThis.__boxlabObjectSelection?.refresh?.();
  globalThis.__boxlabTopologyGate?.sync?.();
}
function sync(){
  const object=activeObject(),eligible=mode()==='object'&&!!object&&!!mesh()&&!object.locked&&object.kind!=='reference';
  if(launchButton)launchButton.disabled=!eligible||active;
  if(active&&(mode()!=='object'||object?.id!==objectId))cancel({silent:true});
  if(active&&!toolSession()?.isActive?.('symmetry-bisect'))beginSession();
}
function updateButtons(){
  axisButtons.forEach(b=>b.classList.toggle('active',axis!=='custom'&&b.dataset.symAxis===axis));
  keepButtons.forEach(b=>b.classList.toggle('active',b.dataset.symKeep===keep));
  alignFaceButton?.classList.toggle('active',alignFaceArmed);
}
function planeHit(event){
  if(!planeSurface||!setPointer(event))return null;
  return raycaster.intersectObject(planeSurface,false)[0]||null;
}
function ownGeometrySnap(event){
  if(!geometryOn()||!source)return null;
  const p=new THREE.Vector2(event.clientX,event.clientY);
  let bestVertex=null,bestMid=null,bestEdge=null;
  for(let i=0;i<source.vertices.length;i++){
    const sp=screenPoint(source.vertices[i]);if(!sp)continue;
    const d=sp.distanceTo(p);if(d<=14&&(!bestVertex||d<bestVertex.distance))bestVertex={type:'Vertex',position:source.vertices[i].clone(),distance:d};
  }
  for(const edge of source.edges?.()||[]){
    const va=source.vertices[edge.a],vb=source.vertices[edge.b],a=screenPoint(va),b=screenPoint(vb);if(!a||!b)continue;
    const mid=va.clone().lerp(vb,.5),ms=screenPoint(mid),md=ms?.distanceTo(p)??Infinity;
    if(md<=11&&(!bestMid||md<bestMid.distance))bestMid={type:'Midpoint',position:mid,distance:md};
    const ab=b.clone().sub(a),lenSq=ab.lengthSq();if(lenSq<1e-8)continue;
    const t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/lenSq,0,1),q=a.clone().addScaledVector(ab,t),d=q.distanceTo(p);
    if(d<=24&&(!bestEdge||d<bestEdge.distance))bestEdge={type:'Edge',position:va.clone().lerp(vb,t),distance:d};
  }
  return bestVertex||bestMid||bestEdge;
}
function otherGeometrySnap(event){
  if(!geometryOn())return null;
  const man=manager();if(!man)return null;
  const result=nearestCrossObjectSnap({objects:man.objects||[],activeId:man.activeId??null,soloId:man.soloId??null,project:screenPoint,clientX:event.clientX,clientY:event.clientY,vertexPx:14,midpointPx:11,edgePx:24});
  if(!result)return null;
  const object=(man.objects||[]).find(o=>o.id===result.objectId);
  return{type:result.type,position:result.position.clone(),label:`${object?.name||'Object'} ${result.type}`};
}
function faceSnap(event){
  if(!geometryOn()||!setPointer(event))return null;
  const man=manager(),objects=man?.objects||[],targets=[];
  for(const object of objects){
    if(!object||object.visible===false)continue;
    if(man?.soloId!=null&&object.id!==man.soloId)continue;
    const m=object.id===man.activeId?source:object.mesh;
    if(!m?.faces?.length)continue;
    const g=m.triangulatedGeometry?.();if(!g)continue;
    const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
    const target=new THREE.Mesh(g,material);target.userData.sourceObject=object;targets.push(target);
  }
  const hit=targets.length?raycaster.intersectObjects(targets,false)[0]:null;
  const out=hit?{type:'Face',position:hit.point.clone(),label:`${hit.object.userData.sourceObject?.name||'Object'} Face`}:null;
  for(const target of targets){target.geometry?.dispose?.();target.material?.dispose?.();}
  return out;
}
function sourceFaceFromTriangle(triangleIndex){
  if(!Number.isInteger(triangleIndex)||!source?.faces?.length)return null;
  let cursor=0;
  for(let fi=0;fi<source.faces.length;fi++){
    const triangles=Math.max(0,(source.faces[fi]?.length||0)-2);
    if(triangleIndex<cursor+triangles)return fi;
    cursor+=triangles;
  }
  return null;
}
function pickAlignmentFace(event){
  if(!source?.faces?.length||!setPointer(event))return null;
  const geometry=source.triangulatedGeometry?.();if(!geometry)return null;
  const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
  const target=new THREE.Mesh(geometry,material);
  const hit=raycaster.intersectObject(target,false)[0]||null;
  let out=null;
  if(hit){
    const faceIndex=sourceFaceFromTriangle(hit.faceIndex);
    const normal=Number.isInteger(faceIndex)?source.faceNormal?.(faceIndex):hit.face?.normal?.clone?.();
    if(normal?.lengthSq?.()>1e-12)out={position:hit.point.clone(),normal:normal.clone().normalize(),faceIndex};
  }
  geometry.dispose?.();material.dispose?.();
  return out;
}
function geometrySnap(event){
  if(!geometryOn())return null;
  const own=ownGeometrySnap(event);if(own)return{...own,label:`Active ${own.type}`};
  const other=otherGeometrySnap(event);if(other)return other;
  return faceSnap(event);
}
function movePlaneToSnap(snap){
  const delta=snap.position.clone().sub(planePoint).dot(planeNormal);
  planePoint.addScaledVector(planeNormal,delta);
}
function beginInteraction(event){
  if(!active||event.target!==canvas||!event.isPrimary||event.pointerType==='touch')return;
  if(alignFaceArmed){
    event.preventDefault();event.stopImmediatePropagation();
    const hit=pickAlignmentFace(event);
    if(!hit){setStatus('Symmetry/Bisect • Align to Face • tap a source face');return;}
    planePoint.copy(hit.position);
    planeNormal.copy(hit.normal);
    axis='custom';alignFaceArmed=false;updateButtons();buildPreview('Face normal');
    setStatus(`Symmetry/Bisect • aligned to Face ${Number.isInteger(hit.faceIndex)?hit.faceIndex+1:''} • plane normal adopted`);
    return;
  }
  const currentTool=tool();
  if(currentTool==='scale'){
    event.preventDefault();event.stopImmediatePropagation();
    setStatus('Symmetry/Bisect • Scale does not apply to an infinite plane');
    return;
  }
  if(currentTool==='rotate'){
    const center=visualPlaneCenter(),centerScreen=screenPoint(center);
    if(!centerScreen)return;
    event.preventDefault();event.stopImmediatePropagation();
    drag={
      kind:'rotate',pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,
      centerScreen,startVector:new THREE.Vector2(event.clientX,event.clientY).sub(centerScreen),
      startNormal:planeNormal.clone(),constraint:constraint()
    };
  }else{
    const hit=planeHit(event);if(!hit)return;
    const center=visualPlaneCenter(),c=screenPoint(center),a=screenPoint(center.clone().add(planeNormal));
    if(!c||!a)return;
    const rail=a.sub(c);
    if(rail.lengthSq()<16){setStatus('Symmetry/Bisect • plane normal nearly end-on • orbit view to move plane');return;}
    event.preventDefault();event.stopImmediatePropagation();
    drag={kind:'move',pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,startPoint:planePoint.clone(),rail};
  }
  if(globalThis.__boxlabBridgeState?.controls)globalThis.__boxlabBridgeState.controls.enabled=false;
  canvas.setPointerCapture?.(event.pointerId);
}
function moveInteraction(event){
  if(!drag||event.pointerId!==drag.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(drag.kind==='move'){
    const snap=geometrySnap(event);
    planePoint.copy(drag.startPoint);
    if(snap){movePlaneToSnap(snap);buildPreview(snap.label);return;}
    const d=new THREE.Vector2(event.clientX-drag.startX,event.clientY-drag.startY);
    const amount=d.dot(drag.rail)/drag.rail.lengthSq();
    planePoint.addScaledVector(planeNormal,amount);
    buildPreview();
    return;
  }
  const dx=event.clientX-drag.startX;
  const currentVector=new THREE.Vector2(event.clientX,event.clientY).sub(drag.centerScreen);
  let angle;
  if(drag.startVector.length()>18&&currentVector.length()>18){
    const a=drag.startVector.clone().normalize(),b=currentVector.clone().normalize();
    angle=Math.atan2(a.x*b.y-a.y*b.x,THREE.MathUtils.clamp(a.dot(b),-1,1));
  }else angle=dx*.012;
  if(rotateSnapButton?.classList.contains('active'))angle=THREE.MathUtils.degToRad(Math.round(THREE.MathUtils.radToDeg(angle)/15)*15);
  const named=['x','y','z'].includes(drag.constraint)?drag.constraint:null;
  const rotationAxis=named?axisVector(named):(()=>{const v=new THREE.Vector3();camera()?.getWorldDirection(v);return v.normalize();})();
  planeNormal.copy(drag.startNormal).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(rotationAxis,angle)).normalize();
  axis='custom';updateButtons();buildPreview();
  setStatus(`Symmetry/Bisect • Rotate plane • ${named?named.toUpperCase():'View'} • ${THREE.MathUtils.radToDeg(angle).toFixed(0)}°`);
}
function endInteraction(event){
  if(!drag||event.pointerId!==drag.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();
  drag=null;if(globalThis.__boxlabBridgeState?.controls)globalThis.__boxlabBridgeState.controls.enabled=true;
  buildPreview();
}
function cancelInteraction(event){
  if(!drag||event.pointerId!==drag.pointerId)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(drag.kind==='move')planePoint.copy(drag.startPoint);
  else planeNormal.copy(drag.startNormal);
  drag=null;if(globalThis.__boxlabBridgeState?.controls)globalThis.__boxlabBridgeState.controls.enabled=true;buildPreview();
}

launchButton?.addEventListener('click',()=>{
  const object=activeObject(),live=mesh();
  if(!object||!live||mode()!=='object'||object.locked||object.kind==='reference'||active)return;
  if(mirrorModifierActive()){setStatus('Symmetry / Bisect • turn off the non-destructive Mirror modifier first');return;}
  source=live.clone();objectId=object.id;active=true;keep='positive';setAxisPreset('x');if(mirrorToggle)mirrorToggle.checked=true;beginSession();
  queueMicrotask(()=>globalThis.__boxlabTransformArming?.activateRealMove?.());
  buildPreview();
});
axisButtons.forEach(button=>button.addEventListener('click',()=>{alignFaceArmed=false;setAxisPreset(button.dataset.symAxis);buildPreview();}));
alignFaceButton?.addEventListener('click',()=>{
  alignFaceArmed=!alignFaceArmed;
  updateButtons();
  setStatus(alignFaceArmed?'Symmetry/Bisect • Align to Face armed • tap a source face':'Symmetry/Bisect • Align to Face cancelled');
});
flipPlaneButton?.addEventListener('click',()=>{
  alignFaceArmed=false;
  planeNormal.negate();axis='custom';updateButtons();buildPreview();
  setStatus('Symmetry/Bisect • plane normal flipped');
});
keepButtons.forEach(button=>button.addEventListener('click',()=>{keep=button.dataset.symKeep;updateButtons();buildPreview();}));
resetPlaneButton?.addEventListener('click',()=>{alignFaceArmed=false;planePoint.copy(originPlanePoint(planeNormal));updateButtons();buildPreview();});
mirrorToggle?.addEventListener('change',buildPreview);
cancelButton?.addEventListener('click',()=>cancel());
bisectOnlyButton?.addEventListener('click',()=>{
  const object=activeObject(),live=mesh();
  if(!active||!source||!object||!live||object.id!==objectId){cancel({silent:true});return;}
  const result=splitMeshByPlane(source,{axis:axis==='custom'?'x':axis,planeNormal,planePoint});
  if(!result.ok){setStatus(`Bisect Only refused • ${result.reason}`);return;}
  globalThis.__boxlabObjectHistory?.checkpoint?.();
  live.vertices=result.mesh.vertices.map(v=>v.clone());
  live.faces=result.mesh.faces.map(f=>[...f]);
  live.creases=new Map(result.mesh.creases||[]);
  live.faceGroups=Array.isArray(result.mesh.faceGroups)?[...result.mesh.faceGroups]:[];
  disposePreview();active=false;objectId=null;source=null;drag=null;endSession();
  manager()?.saveActive?.();forceRender();sync();
  globalThis.__boxlabSymmetryLastResult={version:VERSION,axis,planeNormal:result.planeNormal?.toArray?.(),planePoint:result.planePoint?.toArray?.(),mirrored:false,bisectOnly:true,cutVertices:result.cutVertices};
  setStatus(`Bisect Only applied • ${axis==='custom'?'Custom':axis.toUpperCase()} plane • both sides kept • ${result.cutVertices} cut vertices`);
});
applyButton?.addEventListener('click',()=>{
  const object=activeObject(),live=mesh();
  if(!active||!source||!object||!live||object.id!==objectId){cancel({silent:true});return;}
  const result=symmetryBisect(source,{axis:axis==='custom'?'x':axis,keep,planeNormal,planePoint,mirror:!!mirrorToggle?.checked});
  if(!result.ok){setStatus(`Symmetry / Bisect refused • ${result.reason}`);return;}
  globalThis.__boxlabObjectHistory?.checkpoint?.();
  live.vertices=result.mesh.vertices.map(v=>v.clone());
  live.faces=result.mesh.faces.map(f=>[...f]);
  live.creases=new Map(result.mesh.creases||[]);
  disposePreview();active=false;objectId=null;source=null;drag=null;endSession();
  manager()?.saveActive?.();forceRender();sync();
  globalThis.__boxlabSymmetryLastResult={version:VERSION,axis,keep,planeNormal:result.planeNormal?.toArray?.(),planePoint:result.planePoint?.toArray?.(),mirrored:result.mirrored,cutVertices:result.cutVertices};
  setStatus(`Symmetry / Bisect applied • ${axis==='custom'?'Custom':axis.toUpperCase()} • Keep ${keep==='positive'?'+':'−'} • ${result.mirrored?'mirrored + welded':'kept half'}`);
});

window.addEventListener('pointerdown',beginInteraction,true);
window.addEventListener('pointermove',moveInteraction,true);
window.addEventListener('pointerup',endInteraction,true);
window.addEventListener('pointercancel',cancelInteraction,true);
window.addEventListener('boxlab-object-manager-ready',sync);
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(sync));
document.querySelectorAll('#selectionModes button').forEach(b=>b.addEventListener('click',()=>queueMicrotask(sync)));
window.addEventListener('beforeunload',()=>cancel({silent:true}));
sync();

globalThis.__boxlabSymmetryBisect={
  version:VERSION,
  get active(){return active;},
  get planeNormal(){return planeNormal.clone();},
  get planePoint(){return planePoint.clone();},
  rebuild:buildPreview,cancel
};
