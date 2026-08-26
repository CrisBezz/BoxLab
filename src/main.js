import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EditableMesh } from './mesh.js';
import { subdivide } from './subdivision.js';
import { applyMirror } from './mirror.js';
import { downloadOBJ } from './export.js';
import { History } from './history.js';

const VERSION='0.9.3';
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
controls.minPolarAngle=.001;
controls.maxPolarAngle=Math.PI-.001;

scene.add(new THREE.HemisphereLight(0xffffff,0x2a2f3a,2));
const key=new THREE.DirectionalLight(0xffffff,2.5);key.position.set(4,7,5);scene.add(key);
const grid=new THREE.GridHelper(12,24,0x3c424d,0x262b33);grid.position.y=-1.55;scene.add(grid);
const originAxes=new THREE.AxesHelper(.9);originAxes.material.depthTest=false;originAxes.renderOrder=20;scene.add(originAxes);

let mesh=EditableMesh.cube(2);
let selectionMode='face',toolMode='move',selection=null;
let subdEnabled=false,subdLevel=1,showCage=true;
let activeLoopSlides=[];
let activeLoopSlide=null;
let selectedEdgeCutT=.5;
let directTool=null;
let axisSnapEnabled=false;
let inferenceSnapEnabled=false;
const mirrorAxes={x:false,y:false,z:false};
const history=new History(60);
const root=new THREE.Group();scene.add(root);

const baseMaterial=new THREE.MeshStandardMaterial({color:0xaeb8c8,roughness:.62,metalness:.02,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
const subdMaterial=new THREE.MeshStandardMaterial({color:0xc8d1de,roughness:.58,metalness:.02,side:THREE.DoubleSide});
const selectedMaterial=new THREE.MeshBasicMaterial({color:0xff615f,transparent:true,opacity:.78,side:THREE.DoubleSide,depthTest:true});
const vertexMaterial=new THREE.MeshBasicMaterial({color:0xe7ebf2});
const selectedVertexMaterial=new THREE.MeshBasicMaterial({color:0xff615f});
const edgeMaterial=new THREE.LineBasicMaterial({color:0x707988,transparent:true,opacity:.95});
const axisLineMaterials={x:new THREE.LineBasicMaterial({color:0xff4a45,depthTest:false}),y:new THREE.LineBasicMaterial({color:0x55d66b,depthTest:false}),z:new THREE.LineBasicMaterial({color:0x4f86ff,depthTest:false}),neutral:new THREE.LineBasicMaterial({color:0xffffff,depthTest:false})};
const axisOverlayMaterials={x:new THREE.MeshBasicMaterial({color:0xff4a45,depthTest:false}),y:new THREE.MeshBasicMaterial({color:0x55d66b,depthTest:false}),z:new THREE.MeshBasicMaterial({color:0x4f86ff,depthTest:false}),neutral:new THREE.MeshBasicMaterial({color:0xffffff,depthTest:false})};
const activeLoopMaterial=new THREE.LineBasicMaterial({color:0x62d8ff,transparent:true,opacity:1,depthTest:false});
const currentLoopMaterial=new THREE.LineBasicMaterial({color:0xffe14a,transparent:true,opacity:1,depthTest:false});
const creaseEdgeMaterial=new THREE.LineBasicMaterial({color:0xffb65c,transparent:true,opacity:1});
const mirrorEdgeMaterial=new THREE.LineBasicMaterial({color:0x8791a2,transparent:true,opacity:.32});

const raycaster=new THREE.Raycaster();
raycaster.params.Line.threshold=.09;
const pointer=new THREE.Vector2();
let drag=null;
const EDIT_DRAG_THRESHOLD=8,INFERENCE_SNAP_PX=10,PLANE_EPSILON=1e-5;
const gesture={active:false,maxTouches:0,startedAt:0,starts:new Map(),moved:false};
const TAP_MAX_MS=320,TAP_MAX_MOVE=12;
const WORLD_AXES={x:new THREE.Vector3(1,0,0),y:new THREE.Vector3(0,1,0),z:new THREE.Vector3(0,0,1)};

function clearGroup(group){while(group.children.length){const child=group.children.pop();if(child.geometry)child.geometry.dispose();if(child.material?.userData?.disposable)child.material.dispose();}}
function modifiedBaseMesh(){return applyMirror(mesh,mirrorAxes);}
function modifiedSubdMesh(){return applyMirror(subdivide(mesh,subdLevel),mirrorAxes);}
function clearLoopSlide(){activeLoopSlides=[];activeLoopSlide=null;const input=document.querySelector('#loopSlide');if(input)input.disabled=true;}
function setActiveLoopGroup(group){activeLoopSlide=group||null;const input=document.querySelector('#loopSlide');if(!input)return;if(!activeLoopSlide?.length){input.disabled=true;return;}const pct=Math.round((activeLoopSlide[0].position??.5)*100);input.value=String(pct);input.disabled=false;document.querySelector('#loopSlideOut').textContent=`${pct}%`;}
function syncSelectionModeButtons(){document.querySelectorAll('#selectionModes button').forEach(b=>b.classList.toggle('active',b.dataset.mode===selectionMode));}
function syncTransformButtons(){document.querySelectorAll('#toolModes button').forEach(b=>b.classList.toggle('active',!directTool&&b.dataset.tool===toolMode));}
function activeMirrorAxes(){return Object.keys(mirrorAxes).filter(axis=>mirrorAxes[axis]);}
function setDirectTool(tool){const next=tool||null;directTool=next;if(next==='loopCut'){selectionMode='edge';selection=null;}else if(next==='extrude'||next==='inset'){selectionMode='face';selection=null;}syncSelectionModeButtons();syncTransformButtons();syncDirectToolControls();updateStatus();}

function renderMesh(){
  clearGroup(root);
  const mirroredBase=modifiedBaseMesh(),displayMesh=subdEnabled?modifiedSubdMesh():mirroredBase;
  const body=new THREE.Mesh(displayMesh.triangulatedGeometry(),subdEnabled?subdMaterial:baseMaterial);body.userData.kind='body';root.add(body);
  if(!subdEnabled||showCage){if(mirrorAxes.x||mirrorAxes.y||mirrorAxes.z)addMirrorCage(mirroredBase);addCage();}
  if(selection)addSelectionHighlight();
  if(drag?.kind==='component'&&drag.axisLock&&toolMode==='move')addMoveAxisGuide(drag.axisLock,drag.center);
  updateStatus(displayMesh);updateActionAvailability();syncDirectToolControls();syncTransformButtons();syncSelectionModeButtons();syncCreaseControl();syncMirrorAlignControl();
}
function addMirrorCage(mirrored){mirrored.edges().forEach(e=>{const geometry=new THREE.BufferGeometry().setFromPoints([mirrored.vertices[e.a],mirrored.vertices[e.b]]);const line=new THREE.Line(geometry,mirrorEdgeMaterial);line.userData.kind='mirror-edge';root.add(line);});}
function edgeAxis(a,b){const start=mesh.vertices[a],end=mesh.vertices[b];if(!start||!end)return'neutral';const d=new THREE.Vector3().subVectors(end,start);if(d.lengthSq()<1e-10)return'neutral';d.normalize();const ax=Math.abs(d.x),ay=Math.abs(d.y),az=Math.abs(d.z),m=Math.max(ax,ay,az);if(m<.995)return'neutral';return m===ax?'x':m===ay?'y':'z';}
function addSelectedEdgeOverlay(a,b,axis){const start=mesh.vertices[a],end=mesh.vertices[b];if(!start||!end)return;const delta=new THREE.Vector3().subVectors(end,start),length=delta.length();if(length<1e-6)return;const geometry=new THREE.CylinderGeometry(.022,.022,length,10,1,false),overlay=new THREE.Mesh(geometry,axisOverlayMaterials[axis]||axisOverlayMaterials.neutral);overlay.position.copy(start).add(end).multiplyScalar(.5);overlay.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());overlay.renderOrder=30;overlay.userData.kind='edge-selection-overlay';root.add(overlay);}
function addMoveAxisGuide(axis,center){const dir=WORLD_AXES[axis];if(!dir||!center)return;const extent=Math.max(4,camera.position.distanceTo(center)*.8),geometry=new THREE.BufferGeometry().setFromPoints([center.clone().addScaledVector(dir,-extent),center.clone().addScaledVector(dir,extent)]),line=new THREE.Line(geometry,axisLineMaterials[axis]);line.renderOrder=40;line.userData.kind='move-axis-guide';root.add(line);}
function addCage(){
  const loopGroupByVertex=new Map();activeLoopSlides.forEach((group,groupIndex)=>group.forEach(item=>loopGroupByVertex.set(item.vertex,groupIndex)));
  const objectSelected=selection?.type==='object';
  mesh.edges().forEach((e,index)=>{const geometry=new THREE.BufferGeometry().setFromPoints([mesh.vertices[e.a],mesh.vertices[e.b]]),ga=loopGroupByVertex.get(e.a),gb=loopGroupByVertex.get(e.b),activeGroup=ga!==undefined&&ga===gb?ga:null,isActiveLoop=activeGroup!==null,isCurrentLoop=isActiveLoop&&activeLoopSlides[activeGroup]===activeLoopSlide,isSelectedEdge=selection?.type==='edge'&&selection.index===index,axis=isSelectedEdge?edgeAxis(e.a,e.b):'neutral',mat=isCurrentLoop?currentLoopMaterial:(isActiveLoop?activeLoopMaterial:(isSelectedEdge?axisLineMaterials[axis]:(objectSelected?axisLineMaterials.neutral:(mesh.edgeCrease(index)>0?creaseEdgeMaterial:edgeMaterial)))),line=new THREE.Line(geometry,mat);if(isActiveLoop)line.renderOrder=isCurrentLoop?27:25;if(isSelectedEdge&&!isActiveLoop)line.renderOrder=28;if(objectSelected&&!isActiveLoop)line.renderOrder=26;line.userData={kind:'edge',index,loopSlideGroup:activeGroup};root.add(line);if(isSelectedEdge&&!isActiveLoop)addSelectedEdgeOverlay(e.a,e.b,axis);});
  mesh.vertices.forEach((v,index)=>{const selected=selection?.type==='vertex'&&selection.index===index,geometry=new THREE.SphereGeometry(selected?.0375:.0275,12,8),dot=new THREE.Mesh(geometry,selected?selectedVertexMaterial:vertexMaterial);dot.position.copy(v);dot.userData={kind:'vertex',index};root.add(dot);});
  if(selectionMode==='face'||directTool==='extrude'||directTool==='inset')addFacePickers();
}
function addFacePickers(){mesh.faces.forEach((face,faceIndex)=>{const positions=[];for(let i=1;i<face.length-1;i++)[face[0],face[i],face[i+1]].forEach(vi=>{const v=mesh.vertices[vi];positions.push(v.x,v.y,v.z);});const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));const material=new THREE.MeshBasicMaterial({visible:false,side:THREE.DoubleSide});material.userData.disposable=true;const picker=new THREE.Mesh(geometry,material);picker.userData={kind:'face',index:faceIndex};root.add(picker);});}
function addSelectionHighlight(){if(selection.type!=='face')return;const face=mesh.faces[selection.index];if(!face)return;const positions=[];for(let i=1;i<face.length-1;i++)[face[0],face[i],face[i+1]].forEach(vi=>{const v=mesh.vertices[vi];positions.push(v.x,v.y,v.z);});const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));const highlight=new THREE.Mesh(geometry,selectedMaterial);highlight.renderOrder=5;root.add(highlight);}

function updateStatus(displayMesh=mesh){
  const mirrors=activeMirrorAxes().map(axis=>axis.toUpperCase()),mirrorText=mirrors.length?` • Mirror ${mirrors.join('')}`:'',creaseText=mesh.creases.size?` • ${mesh.creases.size} crease${mesh.creases.size===1?'':'s'}`:'',slideText=activeLoopSlides.length?` • ${activeLoopSlides.length} active loop${activeLoopSlides.length===1?'':'s'}`:'',toolText=directTool?` • ${cap(directTool)}`:'',snapText=axisSnapEnabled&&toolMode==='move'&&!directTool?` • Axis Snap${inferenceSnapEnabled?' + Inference':''}`:'',axisText=drag?.kind==='component'&&drag.axisLock&&toolMode==='move'?` • Move ${drag.axisLock.toUpperCase()}`:'',inferenceText=drag?.inferenceSnap?` • Snap ${drag.inferenceSnap.type}`:'';
  document.querySelector('#meshStats').textContent=`${displayMesh.vertices.length} verts • ${displayMesh.faces.length} faces${mirrorText}${creaseText}${slideText}${toolText}${snapText}${axisText}${inferenceText}`;
  let selectionText;
  if(directTool)selectionText=`${cap(selectionMode)} mode • ${cap(directTool)} selected`;
  else if(selection?.type==='object')selectionText=`Object selected • ${cap(toolMode)}${drag?.axisLock?` ${drag.axisLock.toUpperCase()}`:''}${drag?.inferenceSnap?` • Snap ${drag.inferenceSnap.type}`:''}`;
  else if(selection)selectionText=`${cap(selectionMode)} ${selection.index+1} selected • ${cap(toolMode)}${drag?.axisLock?` ${drag.axisLock.toUpperCase()}`:''}${drag?.inferenceSnap?` • Snap ${drag.inferenceSnap.type}`:''}`;
  else selectionText=`${cap(selectionMode)} mode • nothing selected`;
  document.querySelector('#selectionStatus').textContent=selectionText;
}
function updateActionAvailability(){const faceSelected=selection?.type==='face'&&!!mesh.faces[selection.index],edgeSelected=selection?.type==='edge'&&!!mesh.edges()[selection.index];document.querySelector('#extrudeBtn').disabled=false;document.querySelector('#insetBtn').disabled=false;document.querySelector('#deleteFaceBtn').disabled=!faceSelected;document.querySelector('#loopCutBtn').disabled=false;document.querySelector('#loopSlide').disabled=!activeLoopSlide;document.querySelector('#applyCreaseBtn').disabled=!edgeSelected;document.querySelector('#clearCreaseBtn').disabled=!edgeSelected||mesh.edgeCrease(selection?.index)<.001;const align=document.querySelector('#alignMirrorBtn');if(align)align.disabled=activeMirrorAxes().length===0;const inference=document.querySelector('#inferenceSnapToggle');if(inference)inference.disabled=!axisSnapEnabled;}
function syncDirectToolControls(){const count=Number(document.querySelector('#loopCutCount')?.value||1),loop=document.querySelector('#loopCutBtn'),extrude=document.querySelector('#extrudeBtn'),inset=document.querySelector('#insetBtn');loop?.classList.toggle('active',directTool==='loopCut');extrude?.classList.toggle('active',directTool==='extrude');inset?.classList.toggle('active',directTool==='inset');if(loop)loop.textContent=count===1?'Loop Cut':`Loop Cut ×${count}`;if(extrude)extrude.textContent=directTool==='extrude'&&drag?.kind==='faceTool'&&drag.armed?`Extrude ${drag.liveValue>=0?'+':''}${drag.liveValue.toFixed(2)}`:'Extrude';if(inset)inset.textContent=directTool==='inset'&&drag?.kind==='faceTool'&&drag.armed?`Inset ${Math.round(drag.liveValue*100)}%`:'Inset';}
function syncCreaseControl(){if(selection?.type!=='edge')return;const current=mesh.edgeCrease(selection.index),pct=current>0?Math.round(current*100):100;document.querySelector('#creaseStrength').value=String(pct);document.querySelector('#creaseStrengthOut').textContent=`${pct}%`;}
function syncMirrorAlignControl(){const button=document.querySelector('#alignMirrorBtn');if(!button)return;const axes=activeMirrorAxes().map(axis=>axis.toUpperCase());button.textContent=axes.length?`Align Object to Mirror ${axes.join('')}`:'Align Object to Mirror';}

const cap=s=>s.charAt(0).toUpperCase()+s.slice(1),sameSelection=(a,b)=>!!a&&!!b&&a.type===b.type&&a.index===b.index;
function resize(){const w=wrap.clientWidth,h=wrap.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/Math.max(h,1);camera.updateProjectionMatrix();}
function setPointer(event){const rect=canvas.getBoundingClientRect();pointer.x=((event.clientX-rect.left)/rect.width)*2-1;pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;}
function pickKind(event,kind){setPointer(event);raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(root.children.filter(o=>o.userData.kind===kind),false);return hits.length?{type:kind,index:hits[0].object.userData.index}:null;}
function pick(event){if(selectionMode==='object'){const hit=pickKind(event,'body');return hit?{type:'object',index:0}:null;}const kind=selectionMode==='vertex'?'vertex':selectionMode==='edge'?'edge':'face';return pickKind(event,kind);}
function edgeTapFraction(edgeIndex,event){const edge=mesh.edges()[edgeIndex];if(!edge)return .5;const a=worldToScreen(mesh.vertices[edge.a]),b=worldToScreen(mesh.vertices[edge.b]),ab=b.clone().sub(a),lenSq=ab.lengthSq();if(lenSq<1)return .5;const p=new THREE.Vector2(event.clientX,event.clientY);return THREE.MathUtils.clamp(p.sub(a).dot(ab)/lenSq,.05,.95);}
function pickLoopSlide(event){if(!activeLoopSlides.length)return null;setPointer(event);raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(root.children.filter(o=>Number.isInteger(o.userData.loopSlideGroup)),false);if(!hits.length)return null;const line=hits[0].object,groupIndex=line.userData.loopSlideGroup,group=activeLoopSlides[groupIndex],edge=mesh.edges()[line.userData.index];if(!group||!edge)return null;const candidates=group.filter(item=>item.vertex===edge.a||item.vertex===edge.b);if(!candidates.length)return null;const p=new THREE.Vector2(event.clientX,event.clientY),item=candidates.sort((u,v)=>worldToScreen(mesh.vertices[u.vertex]).distanceToSquared(p)-worldToScreen(mesh.vertices[v.vertex]).distanceToSquared(p))[0];return{item,group,groupIndex};}
function componentVertexIndicesOn(sourceMesh,sel){if(sel?.type==='object')return sourceMesh.vertices.map((_,i)=>i);return sourceMesh.componentVertexIndices(sel);}
function componentCenterOn(sourceMesh,sel){const ids=componentVertexIndicesOn(sourceMesh,sel),c=new THREE.Vector3();ids.forEach(i=>c.add(sourceMesh.vertices[i]));if(ids.length)c.multiplyScalar(1/ids.length);return c;}
function componentCenter(sel){return componentCenterOn(mesh,sel);}
function moveSelection(sel,delta){if(sel?.type==='object')mesh.vertices.forEach(v=>v.add(delta));else mesh.moveComponent(sel,delta);}
function scaleSelection(sel,factor){if(sel?.type!=='object'){mesh.scaleComponent(sel,factor);return;}const center=componentCenter(sel);mesh.vertices.forEach(v=>v.sub(center).multiplyScalar(factor).add(center));}
function screenPlaneAt(point){const normal=new THREE.Vector3();camera.getWorldDirection(normal);return new THREE.Plane().setFromNormalAndCoplanarPoint(normal,point);}
function rayPlanePoint(event,plane){setPointer(event);raycaster.setFromCamera(pointer,camera);const out=new THREE.Vector3();return raycaster.ray.intersectPlane(plane,out)?out:null;}
function worldToScreen(v){const p=v.clone().project(camera),rect=canvas.getBoundingClientRect();return new THREE.Vector2(rect.left+(p.x*.5+.5)*rect.width,rect.top+(-p.y*.5+.5)*rect.height);}
function projectedFaceNormal2D(sourceMesh,faceIndex){const center=sourceMesh.faceCenter(faceIndex),normal=sourceMesh.faceNormal(faceIndex),scale=Math.max(.25,camera.position.distanceTo(center)*.08),a=worldToScreen(center),b=worldToScreen(center.clone().addScaledVector(normal,scale)),dir=b.sub(a);return dir.lengthSq()>1e-6?dir.normalize():new THREE.Vector2(0,-1);}
function projectedWorldAxes(center){const c=worldToScreen(center),out={};for(const [axis,dir] of Object.entries(WORLD_AXES)){const screen=worldToScreen(center.clone().add(dir)).sub(c);if(screen.lengthSq()>16)out[axis]=screen;}return out;}
function chooseAxisLock(dragScreen,axes){if(dragScreen.lengthSq()<1)return null;const d=dragScreen.clone().normalize(),scores=Object.entries(axes).map(([axis,v])=>({axis,score:Math.abs(d.dot(v.clone().normalize()))})).sort((a,b)=>b.score-a.score);return scores[0]?.axis||null;}
function movingReferenceValue(sourceMesh,sel,axis){if(sel?.type==='vertex')return sourceMesh.vertices[sel.index]?.[axis]??0;return componentCenterOn(sourceMesh,sel)[axis];}
function inferenceTargets(sourceMesh,sel,axis){
  const selectedIds=new Set(componentVertexIndicesOn(sourceMesh,sel));
  if(sel?.type==='object')return[];
  const targets=[];
  sourceMesh.vertices.forEach((v,index)=>{if(!selectedIds.has(index))targets.push({value:v[axis],type:'vertex'});});
  sourceMesh.faces.forEach(face=>{if(face.some(i=>selectedIds.has(i)))return;const values=face.map(i=>sourceMesh.vertices[i][axis]),min=Math.min(...values),max=Math.max(...values);if(max-min<=PLANE_EPSILON)targets.push({value:(min+max)*.5,type:'face'});});
  return targets;
}
function inferAxisSnap(sourceMesh,sel,axis,rawAxisDelta,pixelsPerUnit){
  const startValue=movingReferenceValue(sourceMesh,sel,axis),candidate=startValue+rawAxisDelta,threshold=INFERENCE_SNAP_PX/Math.max(pixelsPerUnit,1);let best=null;
  for(const target of inferenceTargets(sourceMesh,sel,axis)){const distance=Math.abs(target.value-candidate);if(distance>threshold)continue;if(!best||distance<best.distance||(Math.abs(distance-best.distance)<1e-8&&target.type==='face'))best={...target,distance};}
  return best?{delta:best.value-startValue,type:best.type,value:best.value}:null;
}
function beginDragChange(){if(!drag||drag.changed)return;clearLoopSlide();history.push(drag.startMesh);drag.changed=true;}
function alignObjectToMirrorPlanes(){const axes=activeMirrorAxes();if(!axes.length||!mesh.vertices.length)return;setDirectTool(null);clearLoopSlide();history.push(mesh);const delta=new THREE.Vector3();axes.forEach(axis=>{const values=mesh.vertices.map(v=>v[axis]),min=Math.min(...values),max=Math.max(...values),bound=Math.abs(min)<=Math.abs(max)?min:max;delta[axis]=-bound;});mesh.vertices.forEach(v=>v.add(delta));selectionMode='object';toolMode='move';selection={type:'object',index:0};renderMesh();}
function doUndo(){const previous=history.undo(mesh);if(!previous)return false;mesh=previous;selection=null;selectedEdgeCutT=.5;clearLoopSlide();renderMesh();return true;}
function doRedo(){const next=history.redo(mesh);if(!next)return false;mesh=next;selection=null;selectedEdgeCutT=.5;clearLoopSlide();renderMesh();return true;}

function beginGesture(event){if(!gesture.active){gesture.active=true;gesture.maxTouches=event.touches.length;gesture.startedAt=performance.now();gesture.starts.clear();gesture.moved=false;}gesture.maxTouches=Math.max(gesture.maxTouches,event.touches.length);for(const touch of event.touches)if(!gesture.starts.has(touch.identifier))gesture.starts.set(touch.identifier,{x:touch.clientX,y:touch.clientY});}
function trackGesture(event){if(!gesture.active)return;gesture.maxTouches=Math.max(gesture.maxTouches,event.touches.length);for(const touch of event.touches){const start=gesture.starts.get(touch.identifier);if(start&&Math.hypot(touch.clientX-start.x,touch.clientY-start.y)>TAP_MAX_MOVE){gesture.moved=true;break;}}}
function endGesture(event){if(!gesture.active||event.touches.length!==0)return;const elapsed=performance.now()-gesture.startedAt,isTap=!gesture.moved&&elapsed<=TAP_MAX_MS,fingers=gesture.maxTouches;gesture.active=false;gesture.maxTouches=0;gesture.starts.clear();gesture.moved=false;if(!isTap)return;if(fingers===2)doUndo();else if(fingers===3)doRedo();}
canvas.addEventListener('touchstart',beginGesture,{passive:true});canvas.addEventListener('touchmove',trackGesture,{passive:true});canvas.addEventListener('touchend',endGesture,{passive:true});canvas.addEventListener('touchcancel',()=>{gesture.active=false;gesture.maxTouches=0;gesture.starts.clear();gesture.moved=false;},{passive:true});

canvas.addEventListener('pointerdown',event=>{
  if(event.pointerType==='mouse'&&event.button!==0)return;
  if(directTool==='loopCut'&&event.isPrimary){const hit=pickKind(event,'edge');if(!hit)return;const before=mesh.clone(),seedEdge=before.edges()[hit.index];if(!seedEdge)return;const cutT=edgeTapFraction(hit.index,event),count=Number(document.querySelector('#loopCutCount').value||1),result=count===1?mesh.loopCut(hit.index,cutT):mesh.loopCuts(hit.index,count);if(!result)return;history.push(before);activeLoopSlides=result.slideGroups||[result.slideData];const target=activeLoopSlides.reduce((best,group)=>{if(!group?.length)return best;const distance=Math.abs((group[0].position??.5)-cutT);return!best||distance<best.distance?{group,distance}:best;},null)?.group||activeLoopSlides[0]||null;setActiveLoopGroup(target);selection=null;const rail=worldToScreen(before.vertices[seedEdge.b]).sub(worldToScreen(before.vertices[seedEdge.a])),startPct=target?.[0]?.position??cutT;renderMesh();drag={kind:'loopSlide',pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,startPct,rail,group:target,armed:false};controls.enabled=false;canvas.setPointerCapture(event.pointerId);return;}
  if((directTool==='extrude'||directTool==='inset')&&event.isPrimary){const hit=pickKind(event,'face');if(!hit)return;const before=mesh.clone(),center=before.faceCenter(hit.index),screenCenter=worldToScreen(center),startPointer=new THREE.Vector2(event.clientX,event.clientY);let insetRail=screenCenter.clone().sub(startPointer),insetScale=insetRail.length();if(insetScale<20){insetRail.set(0,-1);insetScale=120;}else insetRail.normalize();selection=null;drag={kind:'faceTool',faceTool:directTool,pointerId:event.pointerId,faceIndex:hit.index,startMesh:before,startX:event.clientX,startY:event.clientY,normal2D:projectedFaceNormal2D(before,hit.index),insetRail,insetScale,armed:false,changed:false,liveValue:0};controls.enabled=false;canvas.setPointerCapture(event.pointerId);renderMesh();return;}
  const loopHit=pickLoopSlide(event);if(loopHit&&event.isPrimary){const{item,group}=loopHit;setActiveLoopGroup(group);renderMesh();const a=worldToScreen(new THREE.Vector3(...item.start)),b=worldToScreen(new THREE.Vector3(...item.end));let rail=b.clone().sub(a);if(rail.lengthSq()<25){let best=null,bestLen=0;for(const candidateItem of group){const ra=worldToScreen(new THREE.Vector3(...candidateItem.start)),rb=worldToScreen(new THREE.Vector3(...candidateItem.end)),candidate=rb.sub(ra),len=candidate.lengthSq();if(len>bestLen){bestLen=len;best=candidate;}}if(best)rail=best;}drag={kind:'loopSlide',pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,startPct:Number(document.querySelector('#loopSlide').value)/100,rail,group,armed:false};controls.enabled=false;canvas.setPointerCapture(event.pointerId);return;}
  const hit=pick(event);if(!hit){selection=null;selectedEdgeCutT=.5;renderMesh();return;}const alreadySelected=sameSelection(selection,hit);selection=hit;if(hit.type==='edge')selectedEdgeCutT=edgeTapFraction(hit.index,event);else selectedEdgeCutT=.5;renderMesh();if(!alreadySelected||!event.isPrimary)return;const center=componentCenter(selection),plane=screenPlaneAt(center),start=rayPlanePoint(event,plane);drag={kind:'component',pointerId:event.pointerId,selection:{...selection},start,last:start?.clone(),plane,startMesh:mesh.clone(),center:center.clone(),axisScreens:projectedWorldAxes(center),axisLock:null,inferenceSnap:null,startX:event.clientX,startY:event.clientY,changed:false,armed:false};controls.enabled=false;canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener('pointermove',event=>{
  if(!drag||drag.pointerId!==event.pointerId)return;const dx=event.clientX-drag.startX,dy=event.clientY-drag.startY;
  if(!drag.armed){if(Math.hypot(dx,dy)<EDIT_DRAG_THRESHOLD)return;drag.armed=true;if(drag.kind==='faceTool'){clearLoopSlide();history.push(drag.startMesh);drag.changed=true;}else if(drag.kind==='component'&&toolMode==='move'&&axisSnapEnabled)drag.axisLock=chooseAxisLock(new THREE.Vector2(dx,dy),drag.axisScreens);}
  if(drag.kind==='loopSlide'){const lenSq=drag.rail.lengthSq();if(lenSq<1)return;const delta=new THREE.Vector2(dx,dy).dot(drag.rail)/lenSq,amount=THREE.MathUtils.clamp(drag.startPct+delta,.05,.95);if(mesh.loopSlide(drag.group,amount)){setActiveLoopGroup(drag.group);renderMesh();}return;}
  if(drag.kind==='faceTool'){mesh=drag.startMesh.clone();if(drag.faceTool==='extrude'){const faceIndex=drag.faceIndex,normal=drag.startMesh.faceNormal(faceIndex),center=drag.startMesh.faceCenter(faceIndex),facing=Math.max(.2,Math.abs(normal.dot(new THREE.Vector3().subVectors(camera.position,center).normalize()))),signedPixels=new THREE.Vector2(dx,dy).dot(drag.normal2D),amount=signedPixels*.006/facing;drag.liveValue=amount;selection=mesh.extrudeFace(faceIndex,amount);}else{const amount=THREE.MathUtils.clamp(new THREE.Vector2(dx,dy).dot(drag.insetRail)/Math.max(30,drag.insetScale),.01,.95);drag.liveValue=amount;selection=mesh.insetFace(drag.faceIndex,amount);}renderMesh();return;}
  const now=rayPlanePoint(event,drag.plane);if(!now||!drag.last||!drag.start)return;beginDragChange();mesh=drag.startMesh.clone();drag.inferenceSnap=null;
  if(toolMode==='move'){
    let total;
    if(drag.axisLock&&drag.axisScreens[drag.axisLock]){
      const rail=drag.axisScreens[drag.axisLock],amount=new THREE.Vector2(dx,dy).dot(rail)/rail.lengthSq();let axisAmount=amount;
      if(axisSnapEnabled&&inferenceSnapEnabled){const inferred=inferAxisSnap(drag.startMesh,drag.selection,drag.axisLock,axisAmount,rail.length());if(inferred){axisAmount=inferred.delta;drag.inferenceSnap=inferred;}}
      total=WORLD_AXES[drag.axisLock].clone().multiplyScalar(axisAmount);
    }else total=now.clone().sub(drag.start);
    moveSelection(drag.selection,total);
  }else if(toolMode==='scale'){const factor=THREE.MathUtils.clamp(Math.exp((dx-dy)*.006),.1,5);scaleSelection(drag.selection,factor);}
  drag.last=now;renderMesh();
});
function endDrag(event){if(!drag||drag.pointerId!==event.pointerId)return;drag=null;controls.enabled=true;renderMesh();}
canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);

document.querySelectorAll('#selectionModes button').forEach(btn=>btn.addEventListener('click',()=>{setDirectTool(null);selectionMode=btn.dataset.mode;selection=selectionMode==='object'?{type:'object',index:0}:null;selectedEdgeCutT=.5;renderMesh();}));
document.querySelectorAll('#toolModes button').forEach(btn=>btn.addEventListener('click',()=>{setDirectTool(null);toolMode=btn.dataset.tool;renderMesh();}));
function withFaceEdit(action){if(!selection||selection.type!=='face'||!mesh.faces[selection.index])return;setDirectTool(null);clearLoopSlide();history.push(mesh);action();renderMesh();}
document.querySelector('#extrudeBtn').addEventListener('click',()=>{setDirectTool(directTool==='extrude'?null:'extrude');renderMesh();});
document.querySelector('#insetBtn').addEventListener('click',()=>{setDirectTool(directTool==='inset'?null:'inset');renderMesh();});
document.querySelector('#deleteFaceBtn').addEventListener('click',()=>withFaceEdit(()=>{mesh.deleteFace(selection.index);selection=null;}));
document.querySelector('#loopCutCount').addEventListener('input',e=>{document.querySelector('#loopCutCountOut').textContent=String(e.target.value);syncDirectToolControls();});
document.querySelector('#loopCutBtn').addEventListener('click',()=>{setDirectTool(directTool==='loopCut'?null:'loopCut');renderMesh();});
document.querySelector('#axisSnapToggle').addEventListener('change',e=>{axisSnapEnabled=e.target.checked;if(!axisSnapEnabled){inferenceSnapEnabled=false;const inference=document.querySelector('#inferenceSnapToggle');if(inference)inference.checked=false;}renderMesh();});
document.querySelector('#inferenceSnapToggle').addEventListener('change',e=>{inferenceSnapEnabled=axisSnapEnabled&&e.target.checked;renderMesh();});
document.querySelector('#loopSlide').addEventListener('input',e=>{const pct=Number(e.target.value);document.querySelector('#loopSlideOut').textContent=`${pct}%`;if(!activeLoopSlide)return;if(mesh.loopSlide(activeLoopSlide,pct/100))renderMesh();});
document.querySelector('#creaseStrength').addEventListener('input',e=>{document.querySelector('#creaseStrengthOut').textContent=`${e.target.value}%`;});
document.querySelector('#applyCreaseBtn').addEventListener('click',()=>{if(selection?.type!=='edge')return;setDirectTool(null);clearLoopSlide();history.push(mesh);mesh.setEdgeCrease(selection.index,Number(document.querySelector('#creaseStrength').value)/100);renderMesh();});
document.querySelector('#clearCreaseBtn').addEventListener('click',()=>{if(selection?.type!=='edge')return;setDirectTool(null);clearLoopSlide();history.push(mesh);mesh.setEdgeCrease(selection.index,0);renderMesh();});
document.querySelectorAll('[data-mirror-axis]').forEach(input=>input.addEventListener('change',()=>{mirrorAxes[input.dataset.mirrorAxis]=input.checked;renderMesh();}));
document.querySelector('#alignMirrorBtn').addEventListener('click',alignObjectToMirrorPlanes);
document.querySelector('#subdToggle').addEventListener('change',e=>{subdEnabled=e.target.checked;renderMesh();});
document.querySelector('#cageToggle').addEventListener('change',e=>{showCage=e.target.checked;renderMesh();});
document.querySelector('#subdLevel').addEventListener('input',e=>{subdLevel=Number(e.target.value);document.querySelector('#subdLevelOut').textContent=String(subdLevel);renderMesh();});
document.querySelector('#undoBtn').addEventListener('click',doUndo);document.querySelector('#redoBtn').addEventListener('click',doRedo);document.querySelector('#resetBtn').addEventListener('click',()=>{setDirectTool(null);clearLoopSlide();history.push(mesh);mesh=EditableMesh.cube(2);selection=null;selectedEdgeCutT=.5;renderMesh();});
document.querySelector('#exportBaseBtn').addEventListener('click',()=>downloadOBJ(modifiedBaseMesh(),`BoxLab-v${VERSION}-base.obj`));document.querySelector('#exportSubdBtn').addEventListener('click',()=>downloadOBJ(modifiedSubdMesh(),`BoxLab-v${VERSION}-subd${subdLevel}.obj`));

window.addEventListener('resize',resize);
function animate(){requestAnimationFrame(animate);controls.update();renderer.render(scene,camera);}
resize();renderMesh();animate();