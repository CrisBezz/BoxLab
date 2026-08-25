import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EditableMesh } from './mesh.js';
import { subdivide } from './subdivision.js';
import { applyMirror } from './mirror.js';
import { downloadOBJ } from './export.js';
import { History } from './history.js';

const VERSION='0.7';
const canvas=document.querySelector('#viewport');
const wrap=document.querySelector('#viewportWrap');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.outputColorSpace=THREE.SRGBColorSpace;

const scene=new THREE.Scene();
scene.background=new THREE.Color(0x111318);
const camera=new THREE.PerspectiveCamera(42,1,.01,100);
camera.position.set(4.2,3.1,4.6);

const controls=new OrbitControls(camera,canvas);
controls.enableDamping=true;
controls.dampingFactor=.08;
controls.target.set(0,0,0);
controls.touches.ONE=THREE.TOUCH.ROTATE;
controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;
controls.screenSpacePanning=true;
controls.minAzimuthAngle=-Infinity;
controls.maxAzimuthAngle=Infinity;
controls.minPolarAngle=0.001;
controls.maxPolarAngle=Math.PI-0.001;

scene.add(new THREE.HemisphereLight(0xffffff,0x2a2f3a,2));
const key=new THREE.DirectionalLight(0xffffff,2.5);key.position.set(4,7,5);scene.add(key);
const grid=new THREE.GridHelper(12,24,0x3c424d,0x262b33);grid.position.y=-1.55;scene.add(grid);
const originAxes=new THREE.AxesHelper(0.9);originAxes.material.depthTest=false;originAxes.renderOrder=20;scene.add(originAxes);

let mesh=EditableMesh.cube(2);
let selectionMode='face',toolMode='move',selection=null;
let subdEnabled=false,subdLevel=1,showCage=true;
let activeLoopSlide=null;
let selectedEdgeCutT=.5;
const mirrorAxes={x:false,y:false,z:false};
const history=new History(60);
const root=new THREE.Group();scene.add(root);

const baseMaterial=new THREE.MeshStandardMaterial({color:0xaeb8c8,roughness:.62,metalness:.02,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
const subdMaterial=new THREE.MeshStandardMaterial({color:0xc8d1de,roughness:.58,metalness:.02,side:THREE.DoubleSide});
const selectedMaterial=new THREE.MeshBasicMaterial({color:0xff615f,transparent:true,opacity:.78,side:THREE.DoubleSide,depthTest:true});
const vertexMaterial=new THREE.MeshBasicMaterial({color:0xe7ebf2});
const selectedVertexMaterial=new THREE.MeshBasicMaterial({color:0xff615f});
const edgeMaterial=new THREE.LineBasicMaterial({color:0x707988,transparent:true,opacity:.95});
const selectedEdgeMaterial=new THREE.LineBasicMaterial({color:0xff615f});
const creaseEdgeMaterial=new THREE.LineBasicMaterial({color:0xffb65c,transparent:true,opacity:1});
const mirrorEdgeMaterial=new THREE.LineBasicMaterial({color:0x8791a2,transparent:true,opacity:.32});

const raycaster=new THREE.Raycaster();
raycaster.params.Line.threshold=.09;
const pointer=new THREE.Vector2();
let drag=null;
const EDIT_DRAG_THRESHOLD=8;

const gesture={active:false,maxTouches:0,startedAt:0,starts:new Map(),moved:false};
const TAP_MAX_MS=320,TAP_MAX_MOVE=12;

function clearGroup(group){
  while(group.children.length){
    const child=group.children.pop();
    if(child.geometry)child.geometry.dispose();
    if(child.material?.userData?.disposable)child.material.dispose();
  }
}

function modifiedBaseMesh(){return applyMirror(mesh,mirrorAxes);}
function modifiedSubdMesh(){return applyMirror(subdivide(mesh,subdLevel),mirrorAxes);}

function clearLoopSlide(){
  activeLoopSlide=null;
  const input=document.querySelector('#loopSlide');
  if(input) input.disabled=true;
}

function renderMesh(){
  clearGroup(root);
  const mirroredBase=modifiedBaseMesh();
  const displayMesh=subdEnabled?modifiedSubdMesh():mirroredBase;
  const body=new THREE.Mesh(displayMesh.triangulatedGeometry(),subdEnabled?subdMaterial:baseMaterial);
  body.userData.kind='body';root.add(body);
  if(!subdEnabled||showCage){
    if(mirrorAxes.x||mirrorAxes.y||mirrorAxes.z)addMirrorCage(mirroredBase);
    addCage();
  }
  if(selection)addSelectionHighlight();
  updateStatus(displayMesh);
  updateActionAvailability();
  syncLoopCutControl();
  syncCreaseControl();
}

function addMirrorCage(mirrored){
  mirrored.edges().forEach(e=>{
    const geometry=new THREE.BufferGeometry().setFromPoints([mirrored.vertices[e.a],mirrored.vertices[e.b]]);
    const line=new THREE.Line(geometry,mirrorEdgeMaterial);line.userData.kind='mirror-edge';root.add(line);
  });
}

function addCage(){
  const loopVertices=activeLoopSlide?new Set(activeLoopSlide.map(item=>item.vertex)):null;
  mesh.edges().forEach((e,index)=>{
    const geometry=new THREE.BufferGeometry().setFromPoints([mesh.vertices[e.a],mesh.vertices[e.b]]);
    const mat=selection?.type==='edge'&&selection.index===index?selectedEdgeMaterial:(mesh.edgeCrease(index)>0?creaseEdgeMaterial:edgeMaterial);
    const line=new THREE.Line(geometry,mat);
    line.userData={kind:'edge',index,loopSlideEdge:!!loopVertices&&loopVertices.has(e.a)&&loopVertices.has(e.b)};
    root.add(line);
  });
  mesh.vertices.forEach((v,index)=>{
    const selected=selection?.type==='vertex'&&selection.index===index;
    const geometry=new THREE.SphereGeometry(selected?0.0375:0.0275,12,8);
    const dot=new THREE.Mesh(geometry,selected?selectedVertexMaterial:vertexMaterial);dot.position.copy(v);dot.userData={kind:'vertex',index};root.add(dot);
  });
  if(selectionMode==='face')addFacePickers();
}

function addFacePickers(){
  mesh.faces.forEach((face,faceIndex)=>{
    const positions=[];
    for(let i=1;i<face.length-1;i++)[face[0],face[i],face[i+1]].forEach(vi=>{const v=mesh.vertices[vi];positions.push(v.x,v.y,v.z);});
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    const material=new THREE.MeshBasicMaterial({visible:false,side:THREE.DoubleSide});material.userData.disposable=true;
    const picker=new THREE.Mesh(geometry,material);picker.userData={kind:'face',index:faceIndex};root.add(picker);
  });
}

function addSelectionHighlight(){
  if(selection.type!=='face')return;
  const face=mesh.faces[selection.index];if(!face)return;
  const positions=[];
  for(let i=1;i<face.length-1;i++)[face[0],face[i],face[i+1]].forEach(vi=>{const v=mesh.vertices[vi];positions.push(v.x,v.y,v.z);});
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  const highlight=new THREE.Mesh(geometry,selectedMaterial);highlight.renderOrder=5;root.add(highlight);
}

function updateStatus(displayMesh=mesh){
  const activeMirror=['X','Y','Z'].filter(axis=>mirrorAxes[axis.toLowerCase()]);
  const mirrorText=activeMirror.length?` • Mirror ${activeMirror.join('')}`:'';
  const creaseText=mesh.creases.size?` • ${mesh.creases.size} crease${mesh.creases.size===1?'':'s'}`:'';
  const slideText=activeLoopSlide?' • Loop Slide active':'';
  document.querySelector('#meshStats').textContent=`${displayMesh.vertices.length} verts • ${displayMesh.faces.length} faces${mirrorText}${creaseText}${slideText}`;
  document.querySelector('#selectionStatus').textContent=selection?`${cap(selectionMode)} ${selection.index+1} selected • ${cap(toolMode)}`:`${cap(selectionMode)} mode • nothing selected`;
}

function updateActionAvailability(){
  const faceSelected=selection?.type==='face'&&!!mesh.faces[selection.index];
  const edgeSelected=selection?.type==='edge'&&!!mesh.edges()[selection.index];
  document.querySelector('#extrudeBtn').disabled=!faceSelected;
  document.querySelector('#insetBtn').disabled=!faceSelected;
  document.querySelector('#deleteFaceBtn').disabled=!faceSelected;
  document.querySelector('#loopCutBtn').disabled=!edgeSelected;
  document.querySelector('#loopSlide').disabled=!activeLoopSlide;
  document.querySelector('#applyCreaseBtn').disabled=!edgeSelected;
  document.querySelector('#clearCreaseBtn').disabled=!edgeSelected||mesh.edgeCrease(selection?.index)<0.001;
}

function syncLoopCutControl(){
  const button=document.querySelector('#loopCutBtn');
  if(!button)return;
  const pct=Math.round(selectedEdgeCutT*100);
  button.textContent=selection?.type==='edge'?`Loop Cut ${pct}%`:'Loop Cut';
}

function syncCreaseControl(){
  if(selection?.type!=='edge')return;
  const current=mesh.edgeCrease(selection.index);
  const pct=current>0?Math.round(current*100):100;
  document.querySelector('#creaseStrength').value=String(pct);
  document.querySelector('#creaseStrengthOut').textContent=`${pct}%`;
}

const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const sameSelection=(a,b)=>!!a&&!!b&&a.type===b.type&&a.index===b.index;

function resize(){const w=wrap.clientWidth,h=wrap.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/Math.max(h,1);camera.updateProjectionMatrix();}
function setPointer(event){const rect=canvas.getBoundingClientRect();pointer.x=((event.clientX-rect.left)/rect.width)*2-1;pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;}
function pick(event){setPointer(event);raycaster.setFromCamera(pointer,camera);const kind=selectionMode==='vertex'?'vertex':selectionMode==='edge'?'edge':'face';const hits=raycaster.intersectObjects(root.children.filter(o=>o.userData.kind===kind),false);return hits.length?{type:selectionMode,index:hits[0].object.userData.index}:null;}
function edgeTapFraction(edgeIndex,event){
  const edge=mesh.edges()[edgeIndex];if(!edge)return .5;
  const a=worldToScreen(mesh.vertices[edge.a]),b=worldToScreen(mesh.vertices[edge.b]);
  const ab=b.clone().sub(a),lenSq=ab.lengthSq();if(lenSq<1)return .5;
  const p=new THREE.Vector2(event.clientX,event.clientY);
  return THREE.MathUtils.clamp(p.sub(a).dot(ab)/lenSq,.05,.95);
}
function pickLoopSlide(event){
  if(!activeLoopSlide)return null;
  setPointer(event);raycaster.setFromCamera(pointer,camera);
  const hits=raycaster.intersectObjects(root.children.filter(o=>o.userData.loopSlideEdge),false);
  if(!hits.length)return null;
  const edge=mesh.edges()[hits[0].object.userData.index];
  if(!edge)return null;
  const candidates=activeLoopSlide.filter(item=>item.vertex===edge.a||item.vertex===edge.b);
  if(!candidates.length)return null;
  const p=new THREE.Vector2(event.clientX,event.clientY);
  return candidates.sort((u,v)=>worldToScreen(mesh.vertices[u.vertex]).distanceToSquared(p)-worldToScreen(mesh.vertices[v.vertex]).distanceToSquared(p))[0];
}
function componentCenter(sel){const ids=mesh.componentVertexIndices(sel),c=new THREE.Vector3();ids.forEach(i=>c.add(mesh.vertices[i]));if(ids.length)c.multiplyScalar(1/ids.length);return c;}
function screenPlaneAt(point){const normal=new THREE.Vector3();camera.getWorldDirection(normal);return new THREE.Plane().setFromNormalAndCoplanarPoint(normal,point);}
function rayPlanePoint(event,plane){setPointer(event);raycaster.setFromCamera(pointer,camera);const out=new THREE.Vector3();return raycaster.ray.intersectPlane(plane,out)?out:null;}
function worldToScreen(v){const p=v.clone().project(camera),rect=canvas.getBoundingClientRect();return new THREE.Vector2(rect.left+(p.x*.5+.5)*rect.width,rect.top+(-p.y*.5+.5)*rect.height);}
function projectedFaceNormal2D(sourceMesh,faceIndex){const center=sourceMesh.faceCenter(faceIndex),normal=sourceMesh.faceNormal(faceIndex),scale=Math.max(.25,camera.position.distanceTo(center)*.08),a=worldToScreen(center),b=worldToScreen(center.clone().addScaledVector(normal,scale)),dir=b.sub(a);return dir.lengthSq()>1e-6?dir.normalize():new THREE.Vector2(0,-1);}

function beginDragChange(){if(!drag||drag.changed)return;clearLoopSlide();history.push(drag.startMesh);drag.changed=true;}
function doUndo(){const previous=history.undo(mesh);if(!previous)return false;mesh=previous;selection=null;selectedEdgeCutT=.5;clearLoopSlide();renderMesh();return true;}
function doRedo(){const next=history.redo(mesh);if(!next)return false;mesh=next;selection=null;selectedEdgeCutT=.5;clearLoopSlide();renderMesh();return true;}

function beginGesture(event){if(!gesture.active){gesture.active=true;gesture.maxTouches=event.touches.length;gesture.startedAt=performance.now();gesture.starts.clear();gesture.moved=false;}gesture.maxTouches=Math.max(gesture.maxTouches,event.touches.length);for(const touch of event.touches)if(!gesture.starts.has(touch.identifier))gesture.starts.set(touch.identifier,{x:touch.clientX,y:touch.clientY});}
function trackGesture(event){if(!gesture.active)return;gesture.maxTouches=Math.max(gesture.maxTouches,event.touches.length);for(const touch of event.touches){const start=gesture.starts.get(touch.identifier);if(start&&Math.hypot(touch.clientX-start.x,touch.clientY-start.y)>TAP_MAX_MOVE){gesture.moved=true;break;}}}
function endGesture(event){if(!gesture.active||event.touches.length!==0)return;const elapsed=performance.now()-gesture.startedAt,isTap=!gesture.moved&&elapsed<=TAP_MAX_MS,fingers=gesture.maxTouches;gesture.active=false;gesture.maxTouches=0;gesture.starts.clear();gesture.moved=false;if(!isTap)return;if(fingers===2)doUndo();else if(fingers===3)doRedo();}
canvas.addEventListener('touchstart',beginGesture,{passive:true});
canvas.addEventListener('touchmove',trackGesture,{passive:true});
canvas.addEventListener('touchend',endGesture,{passive:true});
canvas.addEventListener('touchcancel',()=>{gesture.active=false;gesture.maxTouches=0;gesture.starts.clear();gesture.moved=false;},{passive:true});

canvas.addEventListener('pointerdown',event=>{
  if(event.pointerType==='mouse'&&event.button!==0)return;
  const loopItem=pickLoopSlide(event);
  if(loopItem&&event.isPrimary){
    const a=worldToScreen(new THREE.Vector3(...loopItem.start));
    const b=worldToScreen(new THREE.Vector3(...loopItem.end));
    let rail=b.clone().sub(a);
    if(rail.lengthSq()<25){
      let best=null,bestLen=0;
      for(const item of activeLoopSlide){
        const ra=worldToScreen(new THREE.Vector3(...item.start)),rb=worldToScreen(new THREE.Vector3(...item.end)),candidate=rb.sub(ra),len=candidate.lengthSq();
        if(len>bestLen){bestLen=len;best=candidate;}
      }
      if(best)rail=best;
    }
    drag={kind:'loopSlide',pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,startPct:Number(document.querySelector('#loopSlide').value)/100,rail,armed:false};
    controls.enabled=false;
    canvas.setPointerCapture(event.pointerId);
    return;
  }
  const hit=pick(event);
  if(!hit){selection=null;selectedEdgeCutT=.5;renderMesh();return;}
  const alreadySelected=sameSelection(selection,hit);
  selection=hit;
  if(hit.type==='edge')selectedEdgeCutT=edgeTapFraction(hit.index,event);else selectedEdgeCutT=.5;
  renderMesh();
  if(!alreadySelected||!event.isPrimary)return;
  const center=componentCenter(selection),plane=screenPlaneAt(center),start=rayPlanePoint(event,plane);
  drag={kind:'component',pointerId:event.pointerId,selection:{...selection},start,last:start?.clone(),plane,startMesh:mesh.clone(),startX:event.clientX,startY:event.clientY,changed:false,armed:false};
  controls.enabled=false;
  canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener('pointermove',event=>{
  if(!drag||drag.pointerId!==event.pointerId)return;
  const dx=event.clientX-drag.startX,dy=event.clientY-drag.startY;
  if(!drag.armed){
    if(Math.hypot(dx,dy)<EDIT_DRAG_THRESHOLD)return;
    drag.armed=true;
  }
  if(drag.kind==='loopSlide'){
    const lenSq=drag.rail.lengthSq();
    if(lenSq<1)return;
    const delta=new THREE.Vector2(dx,dy).dot(drag.rail)/lenSq;
    const amount=THREE.MathUtils.clamp(drag.startPct+delta,.05,.95);
    if(mesh.loopSlide(activeLoopSlide,amount)){
      const pct=Math.round(amount*100),slide=document.querySelector('#loopSlide');
      slide.value=String(pct);document.querySelector('#loopSlideOut').textContent=`${pct}%`;
      renderMesh();
    }
    return;
  }
  const now=rayPlanePoint(event,drag.plane);if(!now||!drag.last||!drag.start)return;
  beginDragChange();mesh=drag.startMesh.clone();const total=now.clone().sub(drag.start);
  if(toolMode==='move')mesh.moveComponent(drag.selection,total);
  else if(toolMode==='scale'){const factor=THREE.MathUtils.clamp(Math.exp((dx-dy)*.006),.1,5);mesh.scaleComponent(drag.selection,factor);}
  else if(toolMode==='extrude'&&drag.selection.type==='face'){
    const faceIndex=drag.selection.index,normal=drag.startMesh.faceNormal(faceIndex),center=drag.startMesh.faceCenter(faceIndex);
    const facing=Math.max(.2,Math.abs(normal.dot(new THREE.Vector3().subVectors(camera.position,center).normalize())));
    const signedPixels=new THREE.Vector2(dx,dy).dot(projectedFaceNormal2D(drag.startMesh,faceIndex));
    selection=mesh.extrudeFace(faceIndex,signedPixels*.006/facing);
  }
  drag.last=now;renderMesh();
});

function endDrag(event){if(!drag||drag.pointerId!==event.pointerId)return;drag=null;controls.enabled=true;}
canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);

document.querySelectorAll('#selectionModes button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('#selectionModes button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');selectionMode=btn.dataset.mode;selection=null;selectedEdgeCutT=.5;renderMesh();}));
document.querySelectorAll('#toolModes button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('#toolModes button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');toolMode=btn.dataset.tool;updateStatus();}));

function withFaceEdit(action){if(!selection||selection.type!=='face'||!mesh.faces[selection.index])return;clearLoopSlide();history.push(mesh);action();renderMesh();}
document.querySelector('#extrudeBtn').addEventListener('click',()=>withFaceEdit(()=>{selection=mesh.extrudeFace(selection.index,.25);}));
document.querySelector('#insetBtn').addEventListener('click',()=>withFaceEdit(()=>{selection=mesh.insetFace(selection.index,.2);}));
document.querySelector('#deleteFaceBtn').addEventListener('click',()=>withFaceEdit(()=>{mesh.deleteFace(selection.index);selection=null;}));
document.querySelector('#loopCutBtn').addEventListener('click',()=>{
  if(!selection||selection.type!=='edge'||!mesh.edges()[selection.index])return;
  const cutT=selectedEdgeCutT;
  const before=mesh.clone(),result=mesh.loopCut(selection.index,cutT);
  if(!result)return;
  history.push(before);
  activeLoopSlide=result.slideData;
  selection=null;
  const pct=Math.round(cutT*100),slide=document.querySelector('#loopSlide');
  slide.value=String(pct);slide.disabled=false;
  document.querySelector('#loopSlideOut').textContent=`${pct}%`;
  renderMesh();
});
document.querySelector('#loopSlide').addEventListener('input',e=>{
  const pct=Number(e.target.value);
  document.querySelector('#loopSlideOut').textContent=`${pct}%`;
  if(!activeLoopSlide)return;
  if(mesh.loopSlide(activeLoopSlide,pct/100))renderMesh();
});

document.querySelector('#creaseStrength').addEventListener('input',e=>{document.querySelector('#creaseStrengthOut').textContent=`${e.target.value}%`;});
document.querySelector('#applyCreaseBtn').addEventListener('click',()=>{if(selection?.type!=='edge')return;clearLoopSlide();history.push(mesh);mesh.setEdgeCrease(selection.index,Number(document.querySelector('#creaseStrength').value)/100);renderMesh();});
document.querySelector('#clearCreaseBtn').addEventListener('click',()=>{if(selection?.type!=='edge')return;clearLoopSlide();history.push(mesh);mesh.setEdgeCrease(selection.index,0);renderMesh();});

document.querySelectorAll('[data-mirror-axis]').forEach(input=>input.addEventListener('change',()=>{mirrorAxes[input.dataset.mirrorAxis]=input.checked;renderMesh();}));
document.querySelector('#subdToggle').addEventListener('change',e=>{subdEnabled=e.target.checked;renderMesh();});
document.querySelector('#cageToggle').addEventListener('change',e=>{showCage=e.target.checked;renderMesh();});
document.querySelector('#subdLevel').addEventListener('input',e=>{subdLevel=Number(e.target.value);document.querySelector('#subdLevelOut').textContent=String(subdLevel);renderMesh();});
document.querySelector('#undoBtn').addEventListener('click',doUndo);
document.querySelector('#redoBtn').addEventListener('click',doRedo);
document.querySelector('#resetBtn').addEventListener('click',()=>{clearLoopSlide();history.push(mesh);mesh=EditableMesh.cube(2);selection=null;selectedEdgeCutT=.5;renderMesh();});
document.querySelector('#exportBaseBtn').addEventListener('click',()=>downloadOBJ(modifiedBaseMesh(),`BoxLab-v${VERSION}-base.obj`));
document.querySelector('#exportSubdBtn').addEventListener('click',()=>downloadOBJ(modifiedSubdMesh(),`BoxLab-v${VERSION}-subd${subdLevel}.obj`));

window.addEventListener('resize',resize);
function animate(){requestAnimationFrame(animate);controls.update();renderer.render(scene,camera);}
resize();renderMesh();animate();