import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EditableMesh } from './mesh.js';
import { subdivide } from './subdivision.js';
import { downloadOBJ } from './export.js';
import { History } from './history.js';

const VERSION='0.3.2';
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

scene.add(new THREE.HemisphereLight(0xffffff,0x2a2f3a,2));
const key=new THREE.DirectionalLight(0xffffff,2.5);key.position.set(4,7,5);scene.add(key);
const grid=new THREE.GridHelper(12,24,0x3c424d,0x262b33);grid.position.y=-1.55;scene.add(grid);

let mesh=EditableMesh.cube(2);
let selectionMode='face', toolMode='move', selection=null;
let subdEnabled=false, subdLevel=1, showCage=true;
const history=new History(60);
const root=new THREE.Group();scene.add(root);

const baseMaterial=new THREE.MeshStandardMaterial({color:0xaeb8c8,roughness:.62,metalness:.02,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
const subdMaterial=new THREE.MeshStandardMaterial({color:0xc8d1de,roughness:.58,metalness:.02,side:THREE.DoubleSide});
const selectedMaterial=new THREE.MeshBasicMaterial({color:0xff615f,transparent:true,opacity:.78,side:THREE.DoubleSide,depthTest:true});
const vertexMaterial=new THREE.MeshBasicMaterial({color:0xe7ebf2});
const selectedVertexMaterial=new THREE.MeshBasicMaterial({color:0xff615f});
const edgeMaterial=new THREE.LineBasicMaterial({color:0x707988,transparent:true,opacity:.95});
const selectedEdgeMaterial=new THREE.LineBasicMaterial({color:0xff615f});

const raycaster=new THREE.Raycaster();
raycaster.params.Line.threshold=.09;
const pointer=new THREE.Vector2();
let drag=null;

const gesture={active:false,maxTouches:0,startedAt:0,starts:new Map(),moved:false};
const TAP_MAX_MS=320;
const TAP_MAX_MOVE=12;

function clearGroup(group){
  while(group.children.length){
    const child=group.children.pop();
    if(child.geometry) child.geometry.dispose();
    if(child.material?.userData?.disposable) child.material.dispose();
  }
}

function renderMesh(){
  clearGroup(root);
  const displayMesh=subdEnabled?subdivide(mesh,subdLevel):mesh;
  const body=new THREE.Mesh(displayMesh.triangulatedGeometry(),subdEnabled?subdMaterial:baseMaterial);
  body.userData.kind='body';root.add(body);
  if(!subdEnabled||showCage) addCage();
  if(selection) addSelectionHighlight();
  updateStatus(displayMesh);
  updateActionAvailability();
}

function addCage(){
  mesh.edges().forEach((e,index)=>{
    const geometry=new THREE.BufferGeometry().setFromPoints([mesh.vertices[e.a],mesh.vertices[e.b]]);
    const line=new THREE.Line(geometry,selection?.type==='edge'&&selection.index===index?selectedEdgeMaterial:edgeMaterial);
    line.userData={kind:'edge',index};root.add(line);
  });
  mesh.vertices.forEach((v,index)=>{
    const selected=selection?.type==='vertex'&&selection.index===index;
    const geometry=new THREE.SphereGeometry(selected ? 0.0375 : 0.0275,12,8);
    const mat=selected?selectedVertexMaterial:vertexMaterial;
    const dot=new THREE.Mesh(geometry,mat);dot.position.copy(v);dot.userData={kind:'vertex',index};root.add(dot);
  });
  if(selectionMode==='face') addFacePickers();
}

function addFacePickers(){
  mesh.faces.forEach((face,faceIndex)=>{
    const positions=[];
    for(let i=1;i<face.length-1;i++) [face[0],face[i],face[i+1]].forEach(vi=>{const v=mesh.vertices[vi];positions.push(v.x,v.y,v.z);});
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    const material=new THREE.MeshBasicMaterial({visible:false,side:THREE.DoubleSide});material.userData.disposable=true;
    const picker=new THREE.Mesh(geometry,material);picker.userData={kind:'face',index:faceIndex};root.add(picker);
  });
}

function addSelectionHighlight(){
  if(selection.type!=='face') return;
  const face=mesh.faces[selection.index];if(!face)return;
  const positions=[];
  for(let i=1;i<face.length-1;i++) [face[0],face[i],face[i+1]].forEach(vi=>{const v=mesh.vertices[vi];positions.push(v.x,v.y,v.z);});
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  const highlight=new THREE.Mesh(geometry,selectedMaterial);highlight.renderOrder=5;root.add(highlight);
}

function updateStatus(displayMesh=mesh){
  document.querySelector('#meshStats').textContent=`${displayMesh.vertices.length} verts • ${displayMesh.faces.length} faces`;
  document.querySelector('#selectionStatus').textContent=selection?`${cap(selectionMode)} ${selection.index+1} selected • ${cap(toolMode)}`:`${cap(selectionMode)} mode • nothing selected`;
}

function updateActionAvailability(){
  const faceSelected=selection?.type==='face' && !!mesh.faces[selection.index];
  const edgeSelected=selection?.type==='edge' && !!mesh.edges()[selection.index];
  document.querySelector('#extrudeBtn').disabled=!faceSelected;
  document.querySelector('#insetBtn').disabled=!faceSelected;
  document.querySelector('#deleteFaceBtn').disabled=!faceSelected;
  document.querySelector('#loopCutBtn').disabled=!edgeSelected;
}

const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);

function resize(){
  const w=wrap.clientWidth,h=wrap.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/Math.max(h,1);camera.updateProjectionMatrix();
}
function setPointer(event){
  const rect=canvas.getBoundingClientRect();pointer.x=((event.clientX-rect.left)/rect.width)*2-1;pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;
}
function pick(event){
  setPointer(event);raycaster.setFromCamera(pointer,camera);
  const kind=selectionMode==='vertex'?'vertex':selectionMode==='edge'?'edge':'face';
  const hits=raycaster.intersectObjects(root.children.filter(o=>o.userData.kind===kind),false);
  return hits.length?{type:selectionMode,index:hits[0].object.userData.index}:null;
}
function componentCenter(sel){
  const ids=mesh.componentVertexIndices(sel),c=new THREE.Vector3();ids.forEach(i=>c.add(mesh.vertices[i]));if(ids.length)c.multiplyScalar(1/ids.length);return c;
}
function screenPlaneAt(point){const normal=new THREE.Vector3();camera.getWorldDirection(normal);return new THREE.Plane().setFromNormalAndCoplanarPoint(normal,point);}
function rayPlanePoint(event,plane){setPointer(event);raycaster.setFromCamera(pointer,camera);const out=new THREE.Vector3();return raycaster.ray.intersectPlane(plane,out)?out:null;}
function worldToScreen(v){
  const p=v.clone().project(camera);
  const rect=canvas.getBoundingClientRect();
  return new THREE.Vector2((p.x*.5+.5)*rect.width,(-p.y*.5+.5)*rect.height);
}
function projectedFaceNormal2D(sourceMesh,faceIndex){
  const center=sourceMesh.faceCenter(faceIndex);
  const normal=sourceMesh.faceNormal(faceIndex);
  const scale=Math.max(.25,camera.position.distanceTo(center)*.08);
  const a=worldToScreen(center);
  const b=worldToScreen(center.clone().addScaledVector(normal,scale));
  const dir=b.sub(a);
  return dir.lengthSq()>1e-6?dir.normalize():new THREE.Vector2(0,-1);
}

function beginDragChange(){if(!drag || drag.changed) return;history.push(drag.startMesh);drag.changed=true;}
function doUndo(){const previous=history.undo(mesh);if(!previous)return false;mesh=previous;selection=null;renderMesh();return true;}
function doRedo(){const next=history.redo(mesh);if(!next)return false;mesh=next;selection=null;renderMesh();return true;}

function beginGesture(event){
  if(!gesture.active){gesture.active=true;gesture.maxTouches=event.touches.length;gesture.startedAt=performance.now();gesture.starts.clear();gesture.moved=false;}
  gesture.maxTouches=Math.max(gesture.maxTouches,event.touches.length);
  for(const touch of event.touches){if(!gesture.starts.has(touch.identifier))gesture.starts.set(touch.identifier,{x:touch.clientX,y:touch.clientY});}
}
function trackGesture(event){
  if(!gesture.active)return;gesture.maxTouches=Math.max(gesture.maxTouches,event.touches.length);
  for(const touch of event.touches){const start=gesture.starts.get(touch.identifier);if(!start)continue;if(Math.hypot(touch.clientX-start.x,touch.clientY-start.y)>TAP_MAX_MOVE){gesture.moved=true;break;}}
}
function endGesture(event){
  if(!gesture.active || event.touches.length!==0)return;
  const elapsed=performance.now()-gesture.startedAt;
  const isTap=!gesture.moved && elapsed<=TAP_MAX_MS;
  const fingers=gesture.maxTouches;
  gesture.active=false;gesture.maxTouches=0;gesture.starts.clear();gesture.moved=false;
  if(!isTap)return;if(fingers===2)doUndo();else if(fingers===3)doRedo();
}
canvas.addEventListener('touchstart',beginGesture,{passive:true});
canvas.addEventListener('touchmove',trackGesture,{passive:true});
canvas.addEventListener('touchend',endGesture,{passive:true});
canvas.addEventListener('touchcancel',()=>{gesture.active=false;gesture.maxTouches=0;gesture.starts.clear();gesture.moved=false;},{passive:true});

canvas.addEventListener('pointerdown',event=>{
  if(event.pointerType==='mouse'&&event.button!==0)return;
  const hit=pick(event);
  if(!hit){selection=null;renderMesh();return;}
  selection=hit;renderMesh();
  if(event.isPrimary){
    const center=componentCenter(selection),plane=screenPlaneAt(center),start=rayPlanePoint(event,plane);
    drag={pointerId:event.pointerId,selection:{...selection},start,last:start?.clone(),plane,startMesh:mesh.clone(),startX:event.clientX,startY:event.clientY,changed:false};
    canvas.setPointerCapture(event.pointerId);controls.enabled=false;
  }
});

canvas.addEventListener('pointermove',event=>{
  if(!drag||drag.pointerId!==event.pointerId)return;
  const now=rayPlanePoint(event,drag.plane);if(!now||!drag.last||!drag.start)return;
  const dx=event.clientX-drag.startX,dy=event.clientY-drag.startY;
  if(Math.hypot(dx,dy)<3)return;
  beginDragChange();
  mesh=drag.startMesh.clone();
  const total=now.clone().sub(drag.start);
  if(toolMode==='move'){
    mesh.moveComponent(drag.selection,total);
  }else if(toolMode==='scale'){
    const factor=THREE.MathUtils.clamp(Math.exp((dx-dy)*.006),.1,5);
    mesh.scaleComponent(drag.selection,factor);
  }else if(toolMode==='extrude'&&drag.selection.type==='face'){
    const faceIndex=drag.selection.index;
    const normal=drag.startMesh.faceNormal(faceIndex);
    const center=drag.startMesh.faceCenter(faceIndex);
    const facing=Math.max(.2,Math.abs(normal.dot(new THREE.Vector3().subVectors(camera.position,center).normalize())));
    const outward2D=projectedFaceNormal2D(drag.startMesh,faceIndex);
    const drag2D=new THREE.Vector2(dx,dy);
    const signedPixels=drag2D.dot(outward2D);
    const distance=signedPixels*.006/facing;
    selection=mesh.extrudeFace(faceIndex,distance);
  }
  drag.last=now;renderMesh();
});

function endDrag(event){if(!drag||drag.pointerId!==event.pointerId)return;drag=null;controls.enabled=true;}
canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);

document.querySelectorAll('#selectionModes button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('#selectionModes button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');selectionMode=btn.dataset.mode;selection=null;renderMesh();}));
document.querySelectorAll('#toolModes button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('#toolModes button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');toolMode=btn.dataset.tool;updateStatus();}));

function withFaceEdit(action){if(!selection||selection.type!=='face'||!mesh.faces[selection.index])return;history.push(mesh);action();renderMesh();}
document.querySelector('#extrudeBtn').addEventListener('click',()=>withFaceEdit(()=>{selection=mesh.extrudeFace(selection.index,.25);}));
document.querySelector('#insetBtn').addEventListener('click',()=>withFaceEdit(()=>{selection=mesh.insetFace(selection.index,.2);}));
document.querySelector('#deleteFaceBtn').addEventListener('click',()=>withFaceEdit(()=>{mesh.deleteFace(selection.index);selection=null;}));
document.querySelector('#loopCutBtn').addEventListener('click',()=>{if(!selection||selection.type!=='edge'||!mesh.edges()[selection.index])return;const before=mesh.clone();const result=mesh.loopCut(selection.index,.5);if(!result)return;history.push(before);selection=null;renderMesh();});
document.querySelector('#subdToggle').addEventListener('change',e=>{subdEnabled=e.target.checked;renderMesh();});
document.querySelector('#cageToggle').addEventListener('change',e=>{showCage=e.target.checked;renderMesh();});
document.querySelector('#subdLevel').addEventListener('input',e=>{subdLevel=Number(e.target.value);document.querySelector('#subdLevelOut').textContent=String(subdLevel);renderMesh();});
document.querySelector('#undoBtn').addEventListener('click',doUndo);
document.querySelector('#redoBtn').addEventListener('click',doRedo);
document.querySelector('#resetBtn').addEventListener('click',()=>{history.push(mesh);mesh=EditableMesh.cube(2);selection=null;renderMesh();});
document.querySelector('#exportBaseBtn').addEventListener('click',()=>downloadOBJ(mesh,`BoxLab-v${VERSION}-base.obj`));
document.querySelector('#exportSubdBtn').addEventListener('click',()=>downloadOBJ(subdivide(mesh,subdLevel),`BoxLab-v${VERSION}-subd${subdLevel}.obj`));

window.addEventListener('resize',resize);
function animate(){requestAnimationFrame(animate);controls.update();renderer.render(scene,camera);}
resize();renderMesh();animate();
