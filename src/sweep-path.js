import * as THREE from 'three';
import {EditableMesh} from './mesh.js';
import {buildSweepProfile} from './sweep-core.js?v=0.36.18.417';

const VERSION='0.36.18.439';
const canvas=document.querySelector('#viewport');
const status=document.querySelector('#selectionStatus');
const objectTools=document.querySelector('.mode-tools[data-mode-tools="object"]');
const editDrawer=document.querySelector('#editDrawer');
const geometryToggle=document.querySelector('#inferenceSnapToggle');

const controls=document.createElement('div');
controls.id='sweepPathControls';controls.hidden=true;controls.className='boxlab-tool-session-shell';
controls.innerHTML=
  '<div class="boxlab-tool-session-title"><span>Sweep</span><span class="boxlab-tool-session-subtitle">Live construction</span></div>'+
  '<div class="boxlab-tool-session-tabs"><button id="sweepStageProfile" type="button">Profile</button><button id="sweepStagePath" type="button">Path</button><button id="sweepStageFinish" type="button">Finish</button></div>'+
  '<div id="sweepProfilePanel" class="boxlab-tool-session-panel">'+
    '<div class="boxlab-tool-session-section">Profile source</div>'+
    '<div class="outliner-actions" style="grid-template-columns:repeat(2,1fr)"><button id="sweepProfileCircle" type="button">Circle</button><button id="sweepProfileRect" type="button">Rectangle</button><button id="sweepProfileDraw" type="button">Draw</button><button id="sweepProfileUseSelection" type="button">Use Selection</button></div>'+
    '<div class="boxlab-tool-session-section">Edit</div>'+
    '<div class="outliner-actions" style="grid-template-columns:repeat(2,1fr)"><button id="sweepEditProfile" type="button">Edit Profile</button><button id="sweepProfileClosed" type="button">Closed</button><button id="sweepUndoProfile" type="button">Undo</button><button id="sweepClearProfile" type="button">Clear</button></div>'+
    '<label class="range-row"><span>Profile Size</span><input id="sweepProfileSize" type="range" min="0.03" max="1.5" value="0.25" step="0.01"/><output id="sweepProfileSizeOut">0.25</output></label>'+
    '<label class="range-row"><span>Circle Sides</span><input id="sweepProfileSides" type="range" min="3" max="24" value="8" step="1"/><output id="sweepProfileSidesOut">8</output></label>'+
  '</div>'+
  '<div id="sweepPathPanel" class="boxlab-tool-session-panel" hidden>'+
    '<div class="boxlab-tool-session-section">Path source</div>'+
    '<div class="outliner-actions" style="grid-template-columns:repeat(2,1fr)"><button id="sweepFollowEdges" type="button">Follow Edges</button><button id="sweepDrawPath" type="button">Draw Path</button></div>'+
    '<div class="boxlab-tool-session-section">Edit</div>'+
    '<div class="outliner-actions" style="grid-template-columns:repeat(2,1fr)"><button id="sweepEditPath" type="button">Edit Path</button><button id="sweepUndoPath" type="button">Undo</button><button id="sweepDeletePath" type="button">Delete Point</button><button id="sweepClearPath" type="button">Clear</button></div>'+
  '</div>'+
  '<div id="sweepFinishPanel" class="boxlab-tool-session-panel" hidden>'+
    '<div class="boxlab-tool-session-section">Finish</div>'+
    '<button id="sweepCapsBtn" type="button" class="active">Caps On</button>'+
    '<button id="sweepApplyBtn" class="boxlab-tool-session-primary" type="button">Apply Sweep</button>'+
  '</div>';
objectTools?.appendChild(controls);

const stageProfileBtn=controls.querySelector('#sweepStageProfile'),stagePathBtn=controls.querySelector('#sweepStagePath'),stageFinishBtn=controls.querySelector('#sweepStageFinish');
const profilePanel=controls.querySelector('#sweepProfilePanel'),pathPanel=controls.querySelector('#sweepPathPanel'),finishPanel=controls.querySelector('#sweepFinishPanel');
const circleBtn=controls.querySelector('#sweepProfileCircle'),rectBtn=controls.querySelector('#sweepProfileRect'),drawProfileBtn=controls.querySelector('#sweepProfileDraw'),useSelectionBtn=controls.querySelector('#sweepProfileUseSelection');
const editProfileBtn=controls.querySelector('#sweepEditProfile'),profileClosedBtn=controls.querySelector('#sweepProfileClosed'),undoProfileBtn=controls.querySelector('#sweepUndoProfile'),clearProfileBtn=controls.querySelector('#sweepClearProfile');
const sizeInput=controls.querySelector('#sweepProfileSize'),sizeOut=controls.querySelector('#sweepProfileSizeOut'),sidesInput=controls.querySelector('#sweepProfileSides'),sidesOut=controls.querySelector('#sweepProfileSidesOut');
const followBtn=controls.querySelector('#sweepFollowEdges'),drawPathBtn=controls.querySelector('#sweepDrawPath'),editPathBtn=controls.querySelector('#sweepEditPath'),undoPathBtn=controls.querySelector('#sweepUndoPath'),deletePathBtn=controls.querySelector('#sweepDeletePath'),clearPathBtn=controls.querySelector('#sweepClearPath');
const capsBtn=controls.querySelector('#sweepCapsBtn'),applyBtn=controls.querySelector('#sweepApplyBtn');

const sweepModeStyle=document.createElement('style');
sweepModeStyle.textContent='#sweepPathControls button.active,#sweepPathControls button[aria-pressed="true"]{box-shadow:inset 0 0 0 2px rgba(138,208,255,1)!important;background:#eef1f7!important;color:#15171b!important}';
document.head.appendChild(sweepModeStyle);

const faceTools=document.querySelector('.mode-tools[data-mode-tools="face"]');
const edgeTools=document.querySelector('.mode-tools[data-mode-tools="edge"]');
function makeSelectionLaunchButton(mode){
  const row=document.createElement('div');row.className='outliner-actions sweep-selection-launch-row';row.style.gridTemplateColumns='1fr';
  const button=document.createElement('button');
  button.type='button';button.className='sweep-selection-launch';
  button.dataset.sweepSelectionMode=mode;
  button.textContent='Sweep';
  button.title=mode==='face'?'Sweep the selected Face along a path':'Sweep the selected closed Edge loop along a path';
  button.disabled=true;row.appendChild(button);button._sweepRow=row;
  return button;
}
const faceSelectionSweepBtn=makeSelectionLaunchButton('face'),edgeSelectionSweepBtn=makeSelectionLaunchButton('edge');
function placeLaunchButton(container,button){
  if(!container||!button?._sweepRow)return;
  const title=container.querySelector('.panel-title');
  if(title?.nextSibling)container.insertBefore(button._sweepRow,title.nextSibling);else container.prepend(button._sweepRow);
}
placeLaunchButton(faceTools,faceSelectionSweepBtn);placeLaunchButton(edgeTools,edgeSelectionSweepBtn);

let overlay=null,drag=null,lastSignature='',cachedId=null,cachedObject=null,raf=0,drawerLockState=null,hotRailHit=null,railSnapRefs=null;
const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();

function state(){return globalThis.__boxlabBridgeState;}
function manager(){return globalThis.__boxlabObjectManager;}
function activeObject(){const m=manager();if(!m)return null;if(cachedId===m.activeId&&cachedObject?.id===m.activeId)return cachedObject;cachedId=m.activeId;cachedObject=m.objects?.find?.(o=>o.id===m.activeId)||null;return cachedObject;}
function pathObject(){const o=activeObject();return o?.sweepPath?o:null;}
function liveMesh(){return state()?.mesh||null;}
function constructionPlane(){const h=.35;return new EditableMesh([new THREE.Vector3(-h,-h,0),new THREE.Vector3(h,-h,0),new THREE.Vector3(h,h,0),new THREE.Vector3(-h,h,0)],[[0,1,2,3]]);}
function visibleFreshConstructionPlane(){
  const h=.35,camera=state()?.camera,source=liveMesh();
  if(!camera||!source?.vertices?.length)return constructionPlane();
  const box=new THREE.Box3().setFromPoints(source.vertices);
  const sphere=new THREE.Sphere();box.getBoundingSphere(sphere);
  const towardCamera=camera.position.clone().sub(sphere.center);
  if(towardCamera.lengthSq()<1e-8)camera.getWorldDirection(towardCamera).multiplyScalar(-1);
  towardCamera.normalize();
  const clearance=Math.max(.8,sphere.radius*.35);
  const center=sphere.center.clone().addScaledVector(towardCamera,sphere.radius+clearance);
  const right=new THREE.Vector3(1,0,0).applyQuaternion(camera.quaternion).normalize();
  const up=new THREE.Vector3(0,1,0).applyQuaternion(camera.quaternion).normalize();
  return new EditableMesh([
    center.clone().addScaledVector(right,-h).addScaledVector(up,-h),
    center.clone().addScaledVector(right, h).addScaledVector(up,-h),
    center.clone().addScaledVector(right, h).addScaledVector(up, h),
    center.clone().addScaledVector(right,-h).addScaledVector(up, h)
  ],[[0,1,2,3]]);
}
function looksConstructionMesh(mesh){return !!mesh&&mesh.vertices?.length===4&&mesh.faces?.length===1&&mesh.faces[0]?.length===4;}
function planeSignature(mesh){return looksConstructionMesh(mesh)?mesh.vertices.map(v=>[v.x,v.y,v.z].map(n=>n.toFixed(5)).join(',')).join('|'):'';}
function ensureMeta(o){
  if(!o)return null;
  o.sweepPath||={};const m=o.sweepPath;
  m.version=VERSION;
  m.profileType||='circle';
  m.profilePoints||=[];
  m.profileHistory||=[];
  m.profileSize=Math.max(.03,Math.min(1.5,Number(m.profileSize??m.radius)||.25));
  m.profileSides=Math.max(3,Math.min(24,Math.round(Number(m.profileSides??m.sides)||8)));
  m.editProfile=!!m.editProfile;
  if(typeof m.profileClosed!=='boolean')m.profileClosed=m.profileType!=='draw';
  if(!Number.isInteger(m.profileAnchorIndex))m.profileAnchorIndex=null;
  m.pathMode||='edges';
  m.pathPoints||=[];
  m.pathHistory||=[];
  m.editPath=!!m.editPath;
  m.selectedPathPoint=Number.isInteger(m.selectedPathPoint)?m.selectedPathPoint:null;
  m.caps=m.caps!==false;
  m.interacted=!!m.interacted;
  m.sessionStage||='profile';
  m.initialPlaneSignature||=planeSignature(liveMesh());
  return m;
}
function frameFor(mesh){
  if(!looksConstructionMesh(mesh))return null;
  const p0=mesh.vertices[0].clone(),p1=mesh.vertices[1].clone(),p3=mesh.vertices[3].clone(),u=p1.clone().sub(p0),v=p3.clone().sub(p0),width=u.length(),height=v.length();
  if(width<1e-6||height<1e-6)return null;
  u.normalize();v.normalize();
  const normal=new THREE.Vector3().crossVectors(u,v).normalize();
  const center=p0.clone().addScaledVector(u,width*.5).addScaledVector(v,height*.5);
  return{p0,p1,p3,u,v,normal,width,height,center};
}
function profile2D(m){
  const r=m.profileSize;
  if(m.profileType==='rectangle')return[{x:-r,y:-r},{x:r,y:-r},{x:r,y:r},{x:-r,y:r}];
  if(m.profileType==='draw')return m.profilePoints.map(p=>({x:Number(p.x)||0,y:Number(p.y)||0}));
  const out=[];for(let i=0;i<m.profileSides;i++){const a=Math.PI*2*i/m.profileSides;out.push({x:Math.cos(a)*r,y:Math.sin(a)*r});}return out;
}
function profileWorld(frame,m){return profile2D(m).map(p=>frame.center.clone().addScaledVector(frame.u,p.x).addScaledVector(frame.v,p.y));}
function profileAnchor2D(m){
  const pts=profile2D(m),i=Number.isInteger(m.profileAnchorIndex)?m.profileAnchorIndex:null;
  return i!==null&&pts[i]?{x:pts[i].x,y:pts[i].y}:{x:0,y:0};
}
function profileAnchorWorld(frame,m){
  const a=profileAnchor2D(m);
  return frame.center.clone().addScaledVector(frame.u,a.x).addScaledVector(frame.v,a.y);
}
function sweepProfile2D(m){
  const a=profileAnchor2D(m);
  return profile2D(m).map(p=>({x:p.x-a.x,y:p.y-a.y}));
}
function pathWorld(frame,m){
  const origin=profileAnchorWorld(frame,m),rest=m.pathPoints.map(p=>new THREE.Vector3(Number(p.x)||0,Number(p.y)||0,Number(p.z)||0));
  if(!rest.length)return[origin];
  if(rest[0].distanceToSquared(origin)<1e-8)return rest;
  return[origin,...rest];
}
function localProfile(frame,world){const rel=world.clone().sub(frame.center);return{x:rel.dot(frame.u),y:rel.dot(frame.v)};}
function evaluatedMesh(object){return globalThis.__boxlabObjectGeometry?.evaluatedMesh?.(object.id)||object.mesh;}
function captureSnapReferences(){
  const m=manager();if(!m)return[];
  const refs=[],activeId=m.activeId,soloId=m.soloId;
  for(const object of m.objects||[]){
    if(object.id===activeId||object.visible===false)continue;
    if(soloId&&object.id!==soloId)continue;
    const source=evaluatedMesh(object);
    if(!source?.vertices?.length)continue;
    refs.push({id:object.id,name:object.name||`Object ${object.id}`,mesh:source.clone()});
  }
  return refs;
}
function externalEdgeSnap(event,refs){
  if(!refs?.length)return null;
  const click=new THREE.Vector2(event.clientX,event.clientY);
  let bestEdge=null;
  for(const ref of refs){
    const edges=ref.mesh.edges?.()||[];
    edges.forEach((edge,index)=>{
      const va=ref.mesh.vertices[edge.a],vb=ref.mesh.vertices[edge.b];
      const a=screenPoint(va),b=screenPoint(vb);if(!a||!b)return;
      const ab=b.clone().sub(a),l=ab.lengthSq();if(l<1)return;
      const t=THREE.MathUtils.clamp(click.clone().sub(a).dot(ab)/l,0,1),q=a.clone().addScaledVector(ab,t),d=click.distanceTo(q);
      if(d<=22&&(!bestEdge||d<bestEdge.distance))bestEdge={kind:'Edge',name:ref.name,point:va.clone().lerp(vb,t),distance:d,index,t,ref,edge,a:va.clone(),b:vb.clone()};
    });
  }
  return bestEdge;
}
function railRefs(refresh=false){
  if(refresh||!railSnapRefs)railSnapRefs=captureSnapReferences();
  return railSnapRefs;
}
function externalGeometrySnap(event,refs,force=false){
  if((!force&&!geometryToggle?.checked)||!refs?.length)return null;
  const camera=state()?.camera;if(!camera)return null;
  const click=new THREE.Vector2(event.clientX,event.clientY);
  let bestVertex=null;
  for(const ref of refs)ref.mesh.vertices.forEach((v,index)=>{
    const s=screenPoint(v);if(!s)return;
    const d=s.distanceTo(click);
    if(d<=24&&(!bestVertex||d<bestVertex.distance))bestVertex={kind:'Vertex',name:ref.name,point:v.clone(),distance:d,index};
  });
  if(bestVertex)return bestVertex;
  let bestEdge=null;
  for(const ref of refs){
    const edges=ref.mesh.edges?.()||[];
    edges.forEach((edge,index)=>{
      const a=screenPoint(ref.mesh.vertices[edge.a]),b=screenPoint(ref.mesh.vertices[edge.b]);if(!a||!b)return;
      const ab=b.clone().sub(a),l=ab.lengthSq();if(l<1)return;
      const t=THREE.MathUtils.clamp(click.clone().sub(a).dot(ab)/l,0,1),q=a.clone().addScaledVector(ab,t),d=click.distanceTo(q);
      if(d<=20&&(!bestEdge||d<bestEdge.distance))bestEdge={kind:'Edge',name:ref.name,point:ref.mesh.vertices[edge.a].clone().lerp(ref.mesh.vertices[edge.b],t),distance:d,index,t,ref,edge,a:ref.mesh.vertices[edge.a].clone(),b:ref.mesh.vertices[edge.b].clone()};
    });
  }
  if(bestEdge)return bestEdge;
  pointerRay(event);
  let bestFace=null;
  for(const ref of refs){
    if(!ref.mesh.faces?.length)continue;
    const geometry=ref.mesh.triangulatedGeometry?.();if(!geometry)continue;
    const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),object=new THREE.Mesh(geometry,material);
    const hit=raycaster.intersectObject(object,false)[0];
    geometry.dispose?.();material.dispose?.();
    if(hit&&(!bestFace||hit.distance<bestFace.distance))bestFace={kind:'Face',name:ref.name,point:hit.point.clone(),distance:hit.distance};
  }
  return bestFace;
}

function orderClosedEdgeLoop(mesh,edgeIds){
  const edges=mesh?.edges?.()||[],chosen=edgeIds.map(i=>edges[i]).filter(Boolean);
  if(chosen.length<3||chosen.length!==edgeIds.length)return null;
  const adjacency=new Map();
  for(const e of chosen){
    if(!adjacency.has(e.a))adjacency.set(e.a,[]);
    if(!adjacency.has(e.b))adjacency.set(e.b,[]);
    adjacency.get(e.a).push(e.b);adjacency.get(e.b).push(e.a);
  }
  if([...adjacency.values()].some(list=>list.length!==2))return null;
  const start=chosen[0].a,ordered=[start];
  let prev=null,current=start;
  for(let guard=0;guard<chosen.length;guard++){
    const nexts=adjacency.get(current)||[],next=nexts.find(v=>v!==prev);
    if(next===undefined)return null;
    if(next===start){
      if(ordered.length!==chosen.length)return null;
      return ordered;
    }
    if(ordered.includes(next))return null;
    ordered.push(next);prev=current;current=next;
  }
  return null;
}
function polygonNormal(points){
  const n=new THREE.Vector3();
  for(let i=0;i<points.length;i++){
    const a=points[i],b=points[(i+1)%points.length];
    n.x+=(a.y-b.y)*(a.z+b.z);
    n.y+=(a.z-b.z)*(a.x+b.x);
    n.z+=(a.x-b.x)*(a.y+b.y);
  }
  return n.lengthSq()>1e-12?n.normalize():null;
}
function selectionProfileCandidate(){
  const bridge=globalThis.__boxlabSelectionBridge,mesh=liveMesh();
  if(!bridge||!mesh)return null;
  const mode=bridge.mode?.(),ids=bridge.indices?.()||[];
  let vertexIds=null,label='';
  if(mode==='face'&&ids.length===1){
    vertexIds=[...(mesh.faces?.[ids[0]]||[])];
    label='Face';
  }else if(mode==='edge'&&ids.length>=3){
    vertexIds=orderClosedEdgeLoop(mesh,ids);
    label='Edge Loop';
  }
  if(!vertexIds||vertexIds.length<3)return null;
  const points=vertexIds.map(i=>mesh.vertices?.[i]?.clone?.()).filter(Boolean);
  if(points.length!==vertexIds.length)return null;
  const normal=polygonNormal(points);if(!normal)return null;
  const center=points.reduce((sum,p)=>sum.add(p),new THREE.Vector3()).multiplyScalar(1/points.length);
  let u=null;
  for(let i=0;i<points.length;i++){
    const edge=points[(i+1)%points.length].clone().sub(points[i]);
    edge.addScaledVector(normal,-edge.dot(normal));
    if(edge.lengthSq()>1e-10){u=edge.normalize();break;}
  }
  if(!u)return null;
  const v=new THREE.Vector3().crossVectors(normal,u).normalize();
  const projected=points.map(p=>{const r=p.clone().sub(center);return{x:r.dot(u),y:r.dot(v),z:r.dot(normal)};});
  const span=Math.max(...projected.map(p=>Math.hypot(p.x,p.y)),.001);
  if(projected.some(p=>Math.abs(p.z)>Math.max(1e-4,span*1e-4)))return null;
  const hx=Math.max(.15,...projected.map(p=>Math.abs(p.x)*1.15)),hy=Math.max(.15,...projected.map(p=>Math.abs(p.y)*1.15));
  const p0=center.clone().addScaledVector(u,-hx).addScaledVector(v,-hy);
  const p1=center.clone().addScaledVector(u,hx).addScaledVector(v,-hy);
  const p2=center.clone().addScaledVector(u,hx).addScaledVector(v,hy);
  const p3=center.clone().addScaledVector(u,-hx).addScaledVector(v,hy);
  return{
    label,
    profilePoints:projected.map(p=>({x:p.x,y:p.y})),
    planeVertices:[p0,p1,p2,p3].map(p=>({x:p.x,y:p.y,z:p.z}))
  };
}
function applySelectionProfile({activateFollowEdges=false}={}){
  const o=pathObject(),mesh=liveMesh(),m=o&&ensureMeta(o),candidate=m?.selectionProfile;
  if(!o||!m||!candidate||!looksConstructionMesh(mesh)){setStatus('Sweep - select a Face or closed Edge loop before Add → Sweep');return false;}
  const pv=candidate.planeVertices||[];if(pv.length!==4){setStatus('Sweep - saved profile selection is unavailable');return false;}
  const plane=new EditableMesh(pv.map(p=>new THREE.Vector3(Number(p.x)||0,Number(p.y)||0,Number(p.z)||0)),[[0,1,2,3]]);
  replaceMesh(mesh,plane);
  m.profileType='draw';m.profileClosed=true;m.profilePoints=(candidate.profilePoints||[]).map(p=>({...p}));m.profileHistory=[];m.profileAnchorIndex=null;
  m.editProfile=false;m.editPath=!!activateFollowEdges;m.pathPoints=[];m.pathHistory=[];m.selectedPathPoint=null;m.interacted=true;
  if(activateFollowEdges){m.pathMode='edges';m.sessionStage='path';hotRailHit=null;railSnapRefs=null;}
  m.initialPlaneSignature=planeSignature(mesh);
  disarmTransforms();lockTools();
  if(activateFollowEdges){railRefs(true);syncPathModeButtons(m);setSweepStage('path');}
  manager()?.saveActive?.();
  document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  setStatus(activateFollowEdges?'Sweep - Follow Edges active · tap connected path edges':'Sweep - '+candidate.label+' loaded as Profile');
  lastSignature='';return true;
}

function pointOnProfilePlane(event,frame){
  pointerRay(event);const plane=new THREE.Plane().setFromNormalAndCoplanarPoint(frame.normal,frame.center),out=new THREE.Vector3();
  return raycaster.ray.intersectPlane(plane,out)?out:null;
}
function pointOnViewPlane(event,anchor){
  pointerRay(event);const camera=state()?.camera;if(!camera)return null;
  const normal=new THREE.Vector3();camera.getWorldDirection(normal);
  const plane=new THREE.Plane().setFromNormalAndCoplanarPoint(normal,anchor),out=new THREE.Vector3();
  return raycaster.ray.intersectPlane(plane,out)?out:null;
}
function segmentDistance(point,a,b){
  const ab=b.clone().sub(a),lenSq=ab.lengthSq();
  if(lenSq<=1e-12)return point.distanceTo(a);
  const t=THREE.MathUtils.clamp(point.clone().sub(a).dot(ab)/lenSq,0,1);
  return point.distanceTo(a.clone().addScaledVector(ab,t));
}
function nearestProfilePoint(event,frame,m){
  const click=new THREE.Vector2(event.clientX,event.clientY),pts=profileWorld(frame,m);let best=null,bestD=18;
  for(let i=0;i<pts.length;i++){const p=screenPoint(pts[i]);if(!p)continue;const d=p.distanceTo(click);if(d<bestD){bestD=d;best=i;}}
  return best;
}
function nearestProfileSegment(event,frame,m){
  const click=new THREE.Vector2(event.clientX,event.clientY),pts=profileWorld(frame,m);let best=null,bestD=14;
  for(let i=0;i<pts.length;i++){const a=screenPoint(pts[i]),b=screenPoint(pts[(i+1)%pts.length]);if(!a||!b)continue;const d=segmentDistance(click,a,b);if(d<bestD){bestD=d;best=i;}}
  return best;
}
function nearestPathPoint(event,frame,m){
  const click=new THREE.Vector2(event.clientX,event.clientY),pts=pathWorld(frame,m);let best=null,bestD=18;
  for(let i=1;i<pts.length;i++){const p=screenPoint(pts[i]);if(!p)continue;const d=p.distanceTo(click);if(d<bestD){bestD=d;best=i-1;}}
  return best;
}
function pushProfileHistory(m){m.profileHistory.push(m.profilePoints.map(p=>({...p})));if(m.profileHistory.length>30)m.profileHistory.shift();}
function pushPathHistory(m){m.pathHistory.push(m.pathPoints.map(p=>({...p})));if(m.pathHistory.length>30)m.pathHistory.shift();}
function setStatus(t){if(status)status.textContent=t;}
function toolSession(){return globalThis.__boxlabToolSession||null;}
function setSweepStage(stage,{activatePath=false}={}){
  const valid=stage==='path'||stage==='finish'?stage:'profile';
  if(valid!=='path'){hotRailHit=null;railSnapRefs=null;}
  const o=pathObject(),m=o&&ensureMeta(o);
  if(m){
    m.sessionStage=valid;
    if(valid==='profile')m.editPath=false;
    if(valid==='path')m.editProfile=false;
  }
  profilePanel.hidden=valid!=='profile';pathPanel.hidden=valid!=='path';finishPanel.hidden=valid!=='finish';
  stageProfileBtn.classList.toggle('active',valid==='profile');stagePathBtn.classList.toggle('active',valid==='path');stageFinishBtn.classList.toggle('active',valid==='finish');
  if(valid==='finish'&&m){m.editProfile=false;m.editPath=false;disarmTransforms();}
  if(valid==='path'&&activatePath&&m&&!m.editPath)setPathMode(m.pathMode||'edges');
  if(editDrawer)editDrawer.open=true;
}
function beginSweepSession(stage='profile'){
  controls.hidden=false;
  toolSession()?.begin?.({id:'sweep',title:'Sweep',node:controls,subtitle:'Profile · Path · Finish'});
  setSweepStage(stage);
}
function endSweepSession(){toolSession()?.end?.('sweep');}
function lockTools(){if(!editDrawer)return;if(!drawerLockState)drawerLockState={keepOpen:editDrawer.dataset.keepOpen,open:editDrawer.open};editDrawer.dataset.keepOpen='true';editDrawer.open=true;}
function unlockTools(){if(!editDrawer||!drawerLockState)return;const old=drawerLockState;drawerLockState=null;if(old.keepOpen===undefined)delete editDrawer.dataset.keepOpen;else editDrawer.dataset.keepOpen=old.keepOpen;if(old.open)editDrawer.open=true;}
function replaceMesh(target,source){target.vertices=source.vertices.map(v=>v.clone());target.faces=source.faces.map(f=>[...f]);target.creases=new Map(source.creases||[]);target.looseEdges=new Set();target.looseVertices=new Set();target.edges?.();}
function disposeOverlay(){if(!overlay)return;overlay.removeFromParent();overlay.traverse(o=>{o.geometry?.dispose?.();if(Array.isArray(o.material))o.material.forEach(m=>m?.dispose?.());else o.material?.dispose?.();});overlay=null;}
function pointerRay(event){const rect=canvas.getBoundingClientRect();pointer.set(((event.clientX-rect.left)/rect.width)*2-1,-(((event.clientY-rect.top)/rect.height)*2-1));raycaster.setFromCamera(pointer,state()?.camera);}
function screenPoint(world){const camera=state()?.camera,rect=canvas?.getBoundingClientRect();if(!camera||!rect)return null;const p=world.clone().project(camera);return new THREE.Vector2(rect.left+(p.x*.5+.5)*rect.width,rect.top+(-p.y*.5+.5)*rect.height);}
function planeSurface(frame){const p2=frame.p1.clone().add(frame.p3).sub(frame.p0),g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([frame.p0.x,frame.p0.y,frame.p0.z,frame.p1.x,frame.p1.y,frame.p1.z,p2.x,p2.y,p2.z,frame.p0.x,frame.p0.y,frame.p0.z,p2.x,p2.y,p2.z,frame.p3.x,frame.p3.y,frame.p3.z],3));const m=new THREE.MeshBasicMaterial({transparent:true,opacity:.08,side:THREE.DoubleSide,depthTest:false,depthWrite:false});return new THREE.Mesh(g,m);}
function railEdgeOverlay(refs){
  const group=new THREE.Group();group.name='Sweep Rail Edge Guide';
  const positions=[];
  for(const ref of refs||[]){
    const mesh=ref.mesh,edges=mesh?.edges?.()||[];
    for(const edge of edges){
      const a=mesh.vertices?.[edge.a],b=mesh.vertices?.[edge.b];
      if(!a||!b)continue;
      positions.push(a.x,a.y,a.z,b.x,b.y,b.z);
    }
  }
  if(!positions.length)return null;
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  const material=new THREE.LineBasicMaterial({color:0xffffff,transparent:false,opacity:1,depthTest:false,depthWrite:false});
  const lines=new THREE.LineSegments(geometry,material);
  lines.renderOrder=50;
  group.add(lines);
  return group;
}
function hotRailOverlay(hit){
  if(!hit?.a||!hit?.b)return null;
  const geometry=new THREE.BufferGeometry().setFromPoints([hit.a,hit.b]);
  const material=new THREE.LineBasicMaterial({color:0xffc857,transparent:false,depthTest:false,depthWrite:false});
  const line=new THREE.Line(geometry,material);line.renderOrder=90;
  return line;
}
function acceptedPathOverlay(points){
  if(points.length<2)return null;
  const geometry=new THREE.BufferGeometry().setFromPoints(points);
  const material=new THREE.LineBasicMaterial({color:0x62d8ff,transparent:false,depthTest:false,depthWrite:false});
  const line=new THREE.Line(geometry,material);line.renderOrder=95;
  return line;
}
function buildResult(frame,m){return buildSweepProfile(pathWorld(frame,m),sweepProfile2D(m),{profileClosed:m.profileClosed,capStart:m.caps,capEnd:m.caps,profileU:frame.u,profileV:frame.v,profileNormal:frame.normal});}
function lineOverlay(points,closed=false){
  if(points.length<2)return null;const list=closed?[...points,points[0]]:points;
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(list),new THREE.LineBasicMaterial({depthTest:false,depthWrite:false}));
}
function pointsOverlay(points,size=8){if(!points.length)return null;return new THREE.Points(new THREE.BufferGeometry().setFromPoints(points),new THREE.PointsMaterial({size,sizeAttenuation:false,depthTest:false,depthWrite:false}));}
function buildOverlay(){
  const o=pathObject(),mesh=liveMesh(),scene=state()?.scene;
  if(!o||!scene){disposeOverlay();controls.hidden=true;unlockTools();endSweepSession();return;}
  const m=ensureMeta(o),construction=looksConstructionMesh(mesh);controls.hidden=!construction;
  if(!construction){disposeOverlay();unlockTools();endSweepSession();return;}
  beginSweepSession(m.sessionStage||'profile');
  const frame=frameFor(mesh);if(!frame){disposeOverlay();return;}
  if(m.initialPlaneSignature&&planeSignature(mesh)!==m.initialPlaneSignature)m.interacted=true;
  if(m.editProfile||m.editPath||m.interacted)lockTools();
  disposeOverlay();overlay=new THREE.Group();overlay.name='BoxLab Sweep Construction';overlay.userData.boxlabSweepPath=true;overlay.add(planeSurface(frame));
  const profile=profileWorld(frame,m),pp=pointsOverlay(profile,8),pl=lineOverlay(profile,m.profileClosed);if(pp)overlay.add(pp);if(pl)overlay.add(pl);
  const path=pathWorld(frame,m),pathPts=pointsOverlay(path,9),pathLine=lineOverlay(path,false);if(pathPts)overlay.add(pathPts);
  if(m.sessionStage==='path'&&m.pathMode==='edges'){
    const railGuide=railEdgeOverlay(railRefs());
    if(railGuide)overlay.add(railGuide);
    const accepted=acceptedPathOverlay(path);if(accepted)overlay.add(accepted);
    const hot=hotRailOverlay(hotRailHit);if(hot)overlay.add(hot);
  }else if(pathLine)overlay.add(pathLine);
  const result=buildResult(frame,m);
  if(result.ok){
    const g=result.mesh.triangulatedGeometry(),fm=new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.16,side:THREE.DoubleSide,depthTest:false,depthWrite:false}),wm=new THREE.MeshBasicMaterial({color:0x62d8ff,transparent:true,opacity:.58,wireframe:true,side:THREE.DoubleSide,depthTest:false,depthWrite:false});
    overlay.add(new THREE.Mesh(g,fm),new THREE.Mesh(g,wm));applyBtn.disabled=false;
  }else applyBtn.disabled=true;
  scene.add(overlay);
  circleBtn.classList.toggle('active',m.profileType==='circle');rectBtn.classList.toggle('active',m.profileType==='rectangle');drawProfileBtn.classList.toggle('active',m.profileType==='draw');useSelectionBtn.disabled=!m.selectionProfile;
  editProfileBtn.classList.toggle('active',m.editProfile);editProfileBtn.textContent=m.editProfile?'Editing Profile':'Edit Profile';profileClosedBtn.disabled=m.profileType!=='draw';profileClosedBtn.classList.toggle('active',m.profileClosed);profileClosedBtn.textContent=m.profileClosed?'Closed':'Open';undoProfileBtn.disabled=!m.profileHistory.length;clearProfileBtn.disabled=m.profileType!=='draw'||!m.profilePoints.length;
  sizeInput.disabled=m.profileType==='draw';sidesInput.disabled=m.profileType!=='circle';sizeInput.value=String(m.profileSize);sizeOut.textContent=m.profileSize.toFixed(2);sidesInput.value=String(m.profileSides);sidesOut.textContent=String(m.profileSides);
  syncPathModeButtons(m);editPathBtn.classList.toggle('active',m.editPath);editPathBtn.textContent=m.editPath?'Editing Path':'Edit Path';undoPathBtn.disabled=!m.pathHistory.length;deletePathBtn.disabled=!Number.isInteger(m.selectedPathPoint)||!m.pathPoints[m.selectedPathPoint];clearPathBtn.disabled=!m.pathPoints.length;
  capsBtn.disabled=!m.profileClosed;capsBtn.classList.toggle('active',m.caps&&m.profileClosed);capsBtn.textContent=m.profileClosed?(m.caps?'Caps On':'Caps Off'):'Caps N/A';
  setSweepStage(m.sessionStage||'profile');
}
function signature(){
  const o=pathObject(),mesh=liveMesh();if(!o||!looksConstructionMesh(mesh))return'';
  const m=ensureMeta(o);
  return[o.id,planeSignature(mesh),m.profileType,m.profileClosed,m.profilePoints.map(p=>String(Number(p.x).toFixed(4))+','+String(Number(p.y).toFixed(4))).join('|'),m.profileSize,m.profileSides,m.editProfile,m.pathMode,m.pathPoints.map(p=>String(Number(p.x).toFixed(4))+','+String(Number(p.y).toFixed(4))+','+String(Number(p.z).toFixed(4))).join('|'),m.editPath,m.caps,m.sessionStage].join(';');
}
function tick(){refreshSelectionLaunchButtons();const s=signature();if(s!==lastSignature){lastSignature=s;buildOverlay();}if(!s&&overlay){lastSignature='';buildOverlay();}raf=requestAnimationFrame(tick);}
function disarmTransforms(){
  globalThis.__boxlabTransformArming?.disarm?.();
  document.querySelectorAll('#toolModes button.active').forEach(button=>button.classList.remove('active'));
}
function disarmOther(m,which){
  if(which!=='profile')m.editProfile=false;
  if(which!=='path')m.editPath=false;
  if(which==='profile'||which==='path')disarmTransforms();
}
function alignSelectionProfileAnchorToEdge(frame,m,hit){
  if(!m.selectionProfile||m.profileType!=='draw'||!m.profilePoints.length||m.pathPoints.length)return null;
  const world=profileWorld(frame,m),ends=[hit.a,hit.b];
  let best=null;
  for(let i=0;i<world.length;i++)for(let e=0;e<2;e++){
    const d=world[i].distanceToSquared(ends[e]);
    if(!best||d<best.d)best={i,e,d};
  }
  if(!best)return null;
  const start=ends[best.e].clone(),end=ends[1-best.e].clone(),anchorWorld=world[best.i];
  const delta=start.clone().sub(anchorWorld),mesh=liveMesh();
  if(mesh?.vertices?.length)for(const v of mesh.vertices)v.add(delta);
  m.profileAnchorIndex=best.i;
  m.initialPlaneSignature=planeSignature(mesh);
  manager()?.saveActive?.();
  return{start,end,index:best.i};
}
function addEdgeToPath(event,frame,m){
  const hit=externalEdgeSnap(event,railRefs());
  if(!hit||hit.kind!=='Edge'||!hit.a||!hit.b){setStatus('Sweep - Follow Edges: tap an existing visible edge');return false;}
  pushPathHistory(m);
  const anchored=alignSelectionProfileAnchorToEdge(frame,m,hit);
  if(anchored){
    m.pathPoints.push({x:anchored.end.x,y:anchored.end.y,z:anchored.end.z});
    m.selectedPathPoint=0;m.interacted=true;lockTools();
    setStatus('Sweep - Profile vertex '+(anchored.index+1)+' anchored to '+hit.name+' path');return true;
  }
  const current=pathWorld(frame,m),tail=current.at(-1);let a=hit.a,b=hit.b;if(tail.distanceTo(b)<tail.distanceTo(a)){const t=a;a=b;b=t;}
  const tol=Math.max(.02,Math.hypot(frame.width,frame.height)*.025);
  if(m.pathPoints.length&&tail.distanceTo(a)>tol){m.pathHistory.pop();setStatus('Sweep - choose an edge connected to the current path end');return false;}
  if(!m.pathPoints.length&&profileAnchorWorld(frame,m).distanceTo(a)>tol)m.pathPoints.push({x:a.x,y:a.y,z:a.z});
  m.pathPoints.push({x:b.x,y:b.y,z:b.z});m.selectedPathPoint=m.pathPoints.length-1;m.interacted=true;lockTools();
  setStatus('Sweep - Follow Edges - '+hit.name);return true;
}
function begin(event){
  if(event.target!==canvas||!event.isPrimary||event.pointerType==='touch')return;
  const o=pathObject(),mesh=liveMesh();if(!o||!looksConstructionMesh(mesh))return;
  const m=ensureMeta(o),f=frameFor(mesh);if(!f)return;
  if(m.editProfile&&m.profileType==='draw'){
    const world=pointOnProfilePlane(event,f);if(!world)return;
    event.preventDefault();event.stopImmediatePropagation();
    const hit=nearestProfilePoint(event,f,m),seg=m.profileClosed&&hit===null&&m.profilePoints.length>2?nearestProfileSegment(event,f,m):null;
    pushProfileHistory(m);let index=hit;
    if(index===null&&seg!==null){m.profilePoints.splice(seg+1,0,localProfile(f,world));index=seg+1;}
    else if(index===null){m.profilePoints.push(localProfile(f,world));index=m.profilePoints.length-1;}
    m.profilePoints[index]=localProfile(f,world);drag={id:event.pointerId,kind:'profile',index,objectId:o.id};
    if(state()?.controls)state().controls.enabled=false;m.interacted=true;lockTools();lastSignature='';return;
  }
  if(!m.editPath)return;
  if(m.pathMode==='edges'){
    event.preventDefault();event.stopImmediatePropagation();addEdgeToPath(event,f,m);lastSignature='';return;
  }
  const refs=captureSnapReferences(),snap=geometryToggle?.checked?externalGeometrySnap(event,refs):null,path=pathWorld(f,m),anchor=path.at(-1)||f.center,world=snap?.point||pointOnViewPlane(event,anchor);
  if(!world)return;
  event.preventDefault();event.stopImmediatePropagation();
  const hit=nearestPathPoint(event,f,m);pushPathHistory(m);let index=hit;
  if(index===null){m.pathPoints.push({x:world.x,y:world.y,z:world.z});index=m.pathPoints.length-1;}else m.pathPoints[index]={x:world.x,y:world.y,z:world.z};
  m.selectedPathPoint=index;drag={id:event.pointerId,kind:'path',index,objectId:o.id,refs};
  if(state()?.controls)state().controls.enabled=false;m.interacted=true;lockTools();
  if(snap)setStatus('Sweep - Draw Path - snapped to '+snap.name+' '+snap.kind);else setStatus('Sweep - Draw Path');
  lastSignature='';
}
function move(event){
  if(!drag){
    if(event.target===canvas&&event.isPrimary&&event.pointerType!=='touch'){
      const o=pathObject(),m=o&&ensureMeta(o);
      if(o&&m?.sessionStage==='path'&&m.pathMode==='edges'&&m.editPath){
        const hit=externalEdgeSnap(event,railRefs());
        const next=hit?.kind==='Edge'?hit:null;
        const changed=(hotRailHit?.ref?.id!==next?.ref?.id)||(hotRailHit?.index!==next?.index);
        hotRailHit=next;
        if(changed)lastSignature='';
      }else if(hotRailHit){hotRailHit=null;lastSignature='';}
    }
    return;
  }
  if(event.pointerId!==drag.id)return;
  event.preventDefault();event.stopImmediatePropagation();
  const o=pathObject();if(!o||o.id!==drag.objectId)return;
  const m=ensureMeta(o),f=frameFor(liveMesh());if(!f)return;
  if(drag.kind==='profile'){
    const world=pointOnProfilePlane(event,f);if(world)m.profilePoints[drag.index]=localProfile(f,world);
  }else{
    const snap=geometryToggle?.checked?externalGeometrySnap(event,drag.refs):null;
    const anchor=drag.index>0?new THREE.Vector3(m.pathPoints[drag.index-1].x,m.pathPoints[drag.index-1].y,m.pathPoints[drag.index-1].z):f.center;
    const world=snap?.point||pointOnViewPlane(event,anchor);if(world)m.pathPoints[drag.index]={x:world.x,y:world.y,z:world.z};
  }
  lastSignature='';
}
function end(event){if(!drag||event.pointerId!==drag.id)return;event.preventDefault();event.stopImmediatePropagation();drag=null;if(state()?.controls)state().controls.enabled=true;lastSignature='';}
function cancel(event){
  if(!drag||event.pointerId!==drag.id)return;
  const o=pathObject(),m=o&&ensureMeta(o);
  if(m){if(drag.kind==='profile'&&m.profileHistory.length)m.profilePoints=m.profileHistory.pop();if(drag.kind==='path'&&m.pathHistory.length)m.pathPoints=m.pathHistory.pop();}
  drag=null;if(state()?.controls)state().controls.enabled=true;lastSignature='';
}
function addSweepPath(selectionProfileOverride=null,autoUseSelection=false){
  const man=manager();if(!man?.addMesh)return;
  const selectionProfile=selectionProfileOverride||selectionProfileCandidate();
  const before=globalThis.__boxlabObjectHistory?.capture?.()||null;
  const plane=selectionProfile?constructionPlane():visibleFreshConstructionPlane();
  const o=man.addMesh(plane,'Sweep',{enterObjectMode:true});if(!o)return;
  cachedId=o.id;cachedObject=o;
  o.sweepPath={version:VERSION,profileType:'circle',profileClosed:true,profilePoints:[],profileHistory:[],profileSize:.25,profileSides:8,editProfile:false,pathMode:'edges',pathPoints:[],pathHistory:[],editPath:false,selectedPathPoint:null,caps:true,interacted:false,selectionProfile,sessionStage:selectionProfile&&autoUseSelection?'path':'profile',initialPlaneSignature:planeSignature(liveMesh())};
  if(before)globalThis.__boxlabObjectHistory?.checkpointSnapshot?.(before);
  beginSweepSession(o.sweepPath.sessionStage);
  setStatus(selectionProfile?'Sweep - '+selectionProfile.label+' captured':'Sweep - choose a Profile, then Path');lastSignature='';
  if(selectionProfile&&autoUseSelection)queueMicrotask(()=>applySelectionProfile({activateFollowEdges:true}));
  else requestAnimationFrame(()=>{if(manager()?.activeId===o.id)globalThis.__boxlabTransformArming?.activateRealMove?.();});
}
function applySweep(){
  const o=pathObject(),mesh=liveMesh();if(!o||!looksConstructionMesh(mesh))return false;
  const m=ensureMeta(o),f=frameFor(mesh),result=buildResult(f,m);
  if(!result.ok){setStatus('Sweep refused - '+result.reason);return false;}
  globalThis.__boxlabHistory?.push(mesh.clone());replaceMesh(mesh,result.mesh);m.editProfile=false;m.editPath=false;m.applied=true;unlockTools();
  o.name='Sweep';manager()?.saveActive?.();globalThis.__boxlabObjectSelection?.single?.(o.id);globalThis.__boxlabBooleanUX?.sync?.();
  disposeOverlay();hotRailHit=null;railSnapRefs=null;controls.hidden=true;endSweepSession();lastSignature='';document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));
  setStatus('Sweep applied - '+result.profile.length+'-point profile - '+result.points.length+' path points');return true;
}
function installPenRange(input,onValue){let pointerId=null,owned=null,releaseFrame=null;const min=()=>Number(input.min),max=()=>Number(input.max),step=()=>Number(input.step)||1;const map=x=>{const r=input.getBoundingClientRect(),t=THREE.MathUtils.clamp((x-r.left)/Math.max(1,r.width),0,1);return Math.round((min()+(max()-min())*t)/step())*step();};const apply=v=>{owned=String(v);input.value=owned;onValue();};const enforce=()=>{if(owned==null)return false;if(input.value!==owned)input.value=owned;return true;};input.addEventListener('pointerdown',e=>{if(e.pointerType!=='pen')return;pointerId=e.pointerId;e.preventDefault();e.stopPropagation();input.setPointerCapture?.(pointerId);apply(map(e.clientX));},{capture:true,passive:false});input.addEventListener('pointermove',e=>{if(e.pointerType!=='pen'||e.pointerId!==pointerId)return;e.preventDefault();e.stopPropagation();apply(map(e.clientX));},{capture:true,passive:false});const finish=e=>{if(e.pointerType!=='pen'||e.pointerId!==pointerId)return;e.preventDefault();e.stopPropagation();if(input.hasPointerCapture?.(pointerId))input.releasePointerCapture(pointerId);pointerId=null;if(releaseFrame)cancelAnimationFrame(releaseFrame);releaseFrame=requestAnimationFrame(()=>{enforce();releaseFrame=requestAnimationFrame(()=>{enforce();owned=null;releaseFrame=null;});});};input.addEventListener('pointerup',finish,{capture:true,passive:false});input.addEventListener('pointercancel',finish,{capture:true,passive:false});input.addEventListener('input',()=>{enforce();onValue();});input.addEventListener('change',()=>{if(enforce())onValue();});}


function launchSweepFromCurrentSelection(){
  const candidate=selectionProfileCandidate();
  if(!candidate){setStatus('Sweep - select one Face or one connected closed Edge loop');return false;}
  addSweepPath(candidate,true);
  return true;
}
function refreshSelectionLaunchButtons(){
  const bridge=globalThis.__boxlabSelectionBridge,mode=bridge?.mode?.(),ids=bridge?.indices?.()||[];
  if(faceSelectionSweepBtn)faceSelectionSweepBtn.disabled=!(mode==='face'&&ids.length===1);
  if(edgeSelectionSweepBtn)edgeSelectionSweepBtn.disabled=!(mode==='edge'&&ids.length>=3);
}

function setProfileType(type){
  const o=pathObject(),m=o&&ensureMeta(o);if(!m)return;
  m.profileType=type;if(type==='draw'){m.profileClosed=false;m.editProfile=true;disarmOther(m,'profile');}else m.profileClosed=true;
  m.sessionStage='profile';m.interacted=true;lockTools();setSweepStage('profile');lastSignature='';
}
function syncPathModeButtons(m){
  const edges=m?.pathMode==='edges',draw=m?.pathMode==='draw';
  followBtn.classList.toggle('active',edges);drawPathBtn.classList.toggle('active',draw);
  followBtn.setAttribute('aria-pressed',edges?'true':'false');
  drawPathBtn.setAttribute('aria-pressed',draw?'true':'false');
  followBtn.textContent=edges?'Follow Edges · Active':'Follow Edges';
  drawPathBtn.textContent=draw?'Draw Path · Active':'Draw Path';
}
function setPathMode(mode){
  const o=pathObject(),m=o&&ensureMeta(o);if(!m)return;
  if(mode!=='edges'){hotRailHit=null;railSnapRefs=null;}else railRefs(true);
  m.pathMode=mode;m.editPath=true;m.sessionStage='path';disarmOther(m,'path');if(mode!=='edges'&&!m.pathPoints.length)m.profileAnchorIndex=null;m.interacted=true;lockTools();syncPathModeButtons(m);setSweepStage('path');
  setStatus(mode==='edges'?'Sweep - Follow Edges active · tap connected path edges':'Sweep - Draw Path active · draw path; Geometry Snap targets model geometry');
  lastSignature='';
}
stageProfileBtn.addEventListener('click',()=>setSweepStage('profile'));
stagePathBtn.addEventListener('click',()=>setSweepStage('path',{activatePath:true}));
stageFinishBtn.addEventListener('click',()=>setSweepStage('finish'));
window.addEventListener('boxlab-add-sweep-path',()=>addSweepPath());
window.addEventListener('pointerdown',begin,true);window.addEventListener('pointermove',move,true);window.addEventListener('pointerup',end,true);window.addEventListener('pointercancel',cancel,true);
faceSelectionSweepBtn.addEventListener('click',launchSweepFromCurrentSelection);edgeSelectionSweepBtn.addEventListener('click',launchSweepFromCurrentSelection);
circleBtn.addEventListener('click',()=>setProfileType('circle'));rectBtn.addEventListener('click',()=>setProfileType('rectangle'));drawProfileBtn.addEventListener('click',()=>setProfileType('draw'));useSelectionBtn.addEventListener('click',applySelectionProfile);
profileClosedBtn.addEventListener('click',()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m||m.profileType!=='draw')return;if(!m.profileClosed&&m.profilePoints.length<3){setStatus('Sweep - Closed profile needs at least 3 points');return;}m.profileClosed=!m.profileClosed;m.interacted=true;lockTools();setStatus(m.profileClosed?'Sweep - profile closed':'Sweep - profile open surface');lastSignature='';});
editProfileBtn.addEventListener('click',()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m)return;if(m.profileType!=='draw'){m.profilePoints=profile2D(m).map(p=>({...p}));m.profileType='draw';m.profileClosed=true;}m.editProfile=!m.editProfile;if(m.editProfile){disarmOther(m,'profile');m.interacted=true;lockTools();}else if(state()?.controls)state().controls.enabled=true;lastSignature='';});
undoProfileBtn.addEventListener('click',()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m?.profileHistory.length)return;m.profilePoints=m.profileHistory.pop();lastSignature='';});
clearProfileBtn.addEventListener('click',()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m?.profilePoints.length)return;pushProfileHistory(m);m.profilePoints=[];lastSignature='';});
followBtn.addEventListener('click',()=>setPathMode('edges'));drawPathBtn.addEventListener('click',()=>setPathMode('draw'));
editPathBtn.addEventListener('click',()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m)return;m.editPath=!m.editPath;if(m.editPath){disarmOther(m,'path');m.interacted=true;lockTools();}else if(state()?.controls)state().controls.enabled=true;lastSignature='';});
undoPathBtn.addEventListener('click',()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m?.pathHistory.length)return;m.pathPoints=m.pathHistory.pop();m.selectedPathPoint=null;lastSignature='';});
deletePathBtn.addEventListener('click',()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m||!Number.isInteger(m.selectedPathPoint)||!m.pathPoints[m.selectedPathPoint])return;pushPathHistory(m);m.pathPoints.splice(m.selectedPathPoint,1);m.selectedPathPoint=null;lastSignature='';});
clearPathBtn.addEventListener('click',()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m?.pathPoints.length)return;pushPathHistory(m);m.pathPoints=[];m.selectedPathPoint=null;lastSignature='';});
installPenRange(sizeInput,()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m)return;m.profileSize=Math.max(.03,Math.min(1.5,Number(sizeInput.value)||.25));lastSignature='';});
installPenRange(sidesInput,()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m)return;m.profileSides=Math.max(3,Math.min(24,Math.round(Number(sidesInput.value)||8)));lastSignature='';});
capsBtn.addEventListener('click',()=>{const o=pathObject(),m=o&&ensureMeta(o);if(!m)return;m.caps=!m.caps;lastSignature='';});
applyBtn.addEventListener('click',applySweep);
document.querySelector('#outlinerList')?.addEventListener('click',()=>queueMicrotask(()=>{cachedId=null;cachedObject=null;lastSignature='';buildOverlay();}));
window.addEventListener('beforeunload',()=>{cancelAnimationFrame(raf);hotRailHit=null;railSnapRefs=null;disposeOverlay();unlockTools();endSweepSession();});
tick();
globalThis.__boxlabSweepPath={version:VERSION,add:addSweepPath,apply:applySweep,setStage:setSweepStage,get active(){return !!pathObject()&&looksConstructionMesh(liveMesh());},get editing(){const o=pathObject(),m=o&&ensureMeta(o);return !!m&&(m.editProfile||m.editPath);},rebuild(){lastSignature='';buildOverlay();}};
