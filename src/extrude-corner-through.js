import * as THREE from 'three';

const canvas=document.querySelector('#viewport');
const extrudeButton=document.querySelector('#extrudeBtn');
const status=document.querySelector('#selectionStatus');
let probe=null, takeover=null, internalCancel=false;

function state(){return globalThis.__boxlabBridgeState;}
function bridge(){return globalThis.__boxlabSelectionBridge;}
function mesh(){return state()?.mesh||null;}
function selectedFace(){const b=bridge();if(b?.mode?.()!=='face')return null;const ids=[...new Set(b.indices?.()||[])];return ids.length===1?ids[0]:null;}
function extrudeArmed(){return !!(extrudeButton?.classList.contains('active')||extrudeButton?.classList.contains('boxlab-direct-stable'));}
function key(a,b){return a<b?`${a}:${b}`:`${b}:${a}`;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function restore(target,source){target.vertices=source.vertices.map(v=>v.clone());target.faces=source.faces.map(f=>[...f]);target.creases=new Map(source.creases);target.looseEdges=new Set(source.looseEdges||[]);target.looseVertices=new Set(source.looseVertices||[]);}
function centerOf(m,ids){const c=new THREE.Vector3();ids.forEach(id=>c.add(m.vertices[id]));return c.multiplyScalar(1/ids.length);}
function screenPoint(point,camera){const p=point.clone().project(camera),r=canvas.getBoundingClientRect();return{x:r.left+(p.x*.5+.5)*r.width,y:r.top+(-p.y*.5+.5)*r.height};}
function projectedNormal(m,face,camera){const normal=m.faceNormal(face)?.clone().normalize();if(!normal)return null;const c=centerOf(m,m.faces[face]),a=screenPoint(c,camera),b=screenPoint(c.clone().add(normal),camera),x=b.x-a.x,y=b.y-a.y,l=Math.hypot(x,y);return l>1e-4?{x:x/l,y:y/l}:null;}
function faceBasis(normal){const n=normal.clone().normalize(),helper=Math.abs(n.y)<.9?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0),u=new THREE.Vector3().crossVectors(helper,n).normalize(),v=new THREE.Vector3().crossVectors(n,u).normalize();return{u,v};}
function pointSegInfo(p,a,b,tol){const ab=b.clone().sub(a),l2=ab.lengthSq();if(l2<1e-12)return null;const raw=p.clone().sub(a).dot(ab)/l2,t=THREE.MathUtils.clamp(raw,0,1),q=a.clone().addScaledVector(ab,t);if(raw<-1e-5||raw>1+1e-5||p.distanceTo(q)>tol)return null;return{t,point:q};}
function pointSegDistance2(p,a,b){const info=pointSegInfo(p,a,b,Infinity);return info?p.distanceTo(info.point):Infinity;}
function pointInPolygonInclusive(point,poly,tol){for(let i=0;i<poly.length;i++)if(pointSegDistance2(point,poly[i],poly[(i+1)%poly.length])<=tol)return true;let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if(((a.y>point.y)!==(b.y>point.y))&&(point.x<(b.x-a.x)*(point.y-a.y)/((b.y-a.y)||1e-12)+a.x))inside=!inside;}return inside;}
function minPolygonEdgeDistance(point,poly){let best=Infinity;for(let i=0;i<poly.length;i++)best=Math.min(best,pointSegDistance2(point,poly[i],poly[(i+1)%poly.length]));return best;}
function edgeOwnerOther(m,a,b,exclude){const e=m.edges().find(edge=>key(edge.a,edge.b)===key(a,b));const owners=[...new Set((e?.faces||[]).filter(fi=>Number.isInteger(fi)&&fi!==exclude&&Array.isArray(m.faces[fi])))];return owners.length===1?owners[0]:null;}

function cornerPlan(m,sourceFaceIndex){
  const source=m.faces[sourceFaceIndex];if(!Array.isArray(source)||source.length<4)return null;
  const sourceNormal=m.faceNormal(sourceFaceIndex)?.clone().normalize();if(!sourceNormal)return null;
  let minEdge=Infinity;for(let i=0;i<source.length;i++)minEdge=Math.min(minEdge,m.vertices[source[i]].distanceTo(m.vertices[source[(i+1)%source.length]]));
  const tol=Math.max(1e-5,(Number.isFinite(minEdge)?minEdge:1)*.015);let best=null;
  for(let targetFaceIndex=0;targetFaceIndex<m.faces.length;targetFaceIndex++){
    if(targetFaceIndex===sourceFaceIndex)continue;
    const target=m.faces[targetFaceIndex];if(!Array.isArray(target)||target.length<4)continue;
    const targetNormal=m.faceNormal(targetFaceIndex)?.clone().normalize();if(!targetNormal||sourceNormal.dot(targetNormal)>-.75)continue;
    const denom=sourceNormal.dot(targetNormal);if(Math.abs(denom)<.75)continue;
    const planePoint=m.vertices[target[0]],ts=source.map(id=>planePoint.clone().sub(m.vertices[id]).dot(targetNormal)/denom),distance=ts.reduce((a,b)=>a+b,0)/ts.length;
    if(Math.abs(distance)<tol||ts.some(t=>Math.abs(t-distance)>tol*2))continue;
    const projected=source.map(id=>m.vertices[id].clone().addScaledVector(sourceNormal,distance)),{u,v}=faceBasis(targetNormal),origin=planePoint,to2=p=>new THREE.Vector2(p.clone().sub(origin).dot(u),p.clone().sub(origin).dot(v)),outer2=target.map(id=>to2(m.vertices[id])),inner2=projected.map(to2);
    if(!inner2.every(p=>pointInPolygonInclusive(p,outer2,tol)))continue;
    const ns=source.length,nt=target.length;
    for(let cornerSourceSlot=0;cornerSourceSlot<ns;cornerSourceSlot++)for(let cornerTargetSlot=0;cornerTargetSlot<nt;cornerTargetSlot++){
      if(projected[cornerSourceSlot].distanceTo(m.vertices[target[cornerTargetSlot]])>tol*2.5)continue;
      const prevSourceSlot=(cornerSourceSlot-1+ns)%ns,nextSourceSlot=(cornerSourceSlot+1)%ns,prevTargetEdge=(cornerTargetSlot-1+nt)%nt,nextTargetEdge=cornerTargetSlot;
      const pairings=[[prevTargetEdge,nextTargetEdge],[nextTargetEdge,prevTargetEdge]];
      for(const [prevEdge,nextEdge] of pairings){
        const prevInfo=pointSegInfo(projected[prevSourceSlot],m.vertices[target[prevEdge]],m.vertices[target[(prevEdge+1)%nt]],tol*2),nextInfo=pointSegInfo(projected[nextSourceSlot],m.vertices[target[nextEdge]],m.vertices[target[(nextEdge+1)%nt]],tol*2);
        if(!prevInfo||!nextInfo||prevInfo.t<=1e-4||prevInfo.t>=1-1e-4||nextInfo.t<=1e-4||nextInfo.t>=1-1e-4)continue;
        let interior=true;for(let slot=0;slot<ns;slot++){if(slot===cornerSourceSlot||slot===prevSourceSlot||slot===nextSourceSlot)continue;if(minPolygonEdgeDistance(inner2[slot],outer2)<=tol*2.5){interior=false;break;}}
        if(!interior)continue;
        const prevSideFaceIndex=edgeOwnerOther(m,target[prevEdge],target[(prevEdge+1)%nt],targetFaceIndex),nextSideFaceIndex=edgeOwnerOther(m,target[nextEdge],target[(nextEdge+1)%nt],targetFaceIndex);if(!Number.isInteger(prevSideFaceIndex)||!Number.isInteger(nextSideFaceIndex)||prevSideFaceIndex===nextSideFaceIndex)continue;
        const sourceCorner=source[cornerSourceSlot],sourcePrev=source[prevSourceSlot],sourceNext=source[nextSourceSlot],prevSourceSide=edgeOwnerOther(m,sourcePrev,sourceCorner,sourceFaceIndex),nextSourceSide=edgeOwnerOther(m,sourceCorner,sourceNext,sourceFaceIndex);
        if(prevSourceSide!==prevSideFaceIndex||nextSourceSide!==nextSideFaceIndex)continue;
        const plan={sourceFaceIndex,targetFaceIndex,distance,projected,cornerSourceSlot,cornerTargetSlot,prevSourceSlot,nextSourceSlot,prevTargetEdge:prevEdge,nextTargetEdge:nextEdge,prevTargetT:prevInfo.t,nextTargetT:nextInfo.t,prevSideFaceIndex,nextSideFaceIndex};
        if(!best||Math.abs(distance)<Math.abs(best.distance))best=plan;
      }
    }
  }
  return best;
}

function splitSharedEdgeEntries(m,a,b,entries){const sorted=[...entries].sort((x,y)=>x.t-y.t),ids=new Map();for(const entry of sorted){m.vertices.push(entry.point.clone());ids.set(entry.tag,m.vertices.length-1);}const forward=sorted.map(e=>ids.get(e.tag)),reverse=[...forward].reverse();let found=false;for(let fi=0;fi<m.faces.length;fi++){const face=m.faces[fi];if(!Array.isArray(face))continue;for(let i=0;i<face.length;i++){const x=face[i],y=face[(i+1)%face.length];if(x===a&&y===b){const next=[...face];next.splice(i+1,0,...forward);m.faces[fi]=next;found=true;break;}if(x===b&&y===a){const next=[...face];next.splice(i+1,0,...reverse);m.faces[fi]=next;found=true;break;}}}if(!found)return null;if(m.creases instanceof Map){const oldKey=m.edgeKey(a,b),crease=m.creases.get(oldKey)||0;m.creases.delete(oldKey);if(crease>0){const chain=[a,...forward,b];for(let i=0;i<chain.length-1;i++)m.creases.set(m.edgeKey(chain[i],chain[i+1]),crease);}}m.edges();return ids;}
function cyclePath(loop,startId,endId,forward=true){const start=loop.indexOf(startId),end=loop.indexOf(endId);if(start<0||end<0)return null;const out=[startId];for(let step=1;step<=loop.length;step++){const slot=(start+(forward?step:-step)+loop.length*4)%loop.length;out.push(loop[slot]);if(slot===end)return out;}return null;}
function cyclePathAvoiding(loop,startId,endId,avoidIds){const avoid=new Set(avoidIds||[]),paths=[cyclePath(loop,startId,endId,true),cyclePath(loop,startId,endId,false)].filter(Boolean);return paths.find(path=>path.slice(1,-1).every(id=>!avoid.has(id)))||null;}
function faceNormalFromLoop(m,loop){if(loop.length<3)return new THREE.Vector3();const a=m.vertices[loop[0]];for(let i=1;i<loop.length-1;i++){const n=new THREE.Vector3().crossVectors(m.vertices[loop[i]].clone().sub(a),m.vertices[loop[i+1]].clone().sub(a));if(n.lengthSq()>1e-12)return n.normalize();}return new THREE.Vector3();}
function orientLike(m,loop,normal){return faceNormalFromLoop(m,loop).dot(normal)<0?[...loop].reverse():loop;}

function buildCorner(before,plan){
  const trial=before.clone(),source=[...(trial.faces[plan.sourceFaceIndex]||[])],target=[...(trial.faces[plan.targetFaceIndex]||[])];if(source.length<4||target.length<4||typeof trial.bridgeLoops!=='function')return null;
  const prevSide=[...(trial.faces[plan.prevSideFaceIndex]||[])],nextSide=[...(trial.faces[plan.nextSideFaceIndex]||[])];if(prevSide.length<3||nextSide.length<3)return null;
  const targetNormal=trial.faceNormal(plan.targetFaceIndex).clone(),prevSideNormal=trial.faceNormal(plan.prevSideFaceIndex).clone(),nextSideNormal=trial.faceNormal(plan.nextSideFaceIndex).clone();
  const prevA=target[plan.prevTargetEdge],prevB=target[(plan.prevTargetEdge+1)%target.length],nextA=target[plan.nextTargetEdge],nextB=target[(plan.nextTargetEdge+1)%target.length];
  const prevIds=splitSharedEdgeEntries(trial,prevA,prevB,[{tag:'P',t:plan.prevTargetT,point:plan.projected[plan.prevSourceSlot]}]);if(!prevIds)return null;const prevTarget=prevIds.get('P');
  const nextIds=splitSharedEdgeEntries(trial,nextA,nextB,[{tag:'N',t:plan.nextTargetT,point:plan.projected[plan.nextSourceSlot]}]);if(!nextIds)return null;const nextTarget=nextIds.get('N');
  const targetCorner=target[plan.cornerTargetSlot],sourceCorner=source[plan.cornerSourceSlot],sourcePrev=source[plan.prevSourceSlot],sourceNext=source[plan.nextSourceSlot],opening=[];
  for(let slot=0;slot<source.length;slot++){if(slot===plan.cornerSourceSlot)opening.push(targetCorner);else if(slot===plan.prevSourceSlot)opening.push(prevTarget);else if(slot===plan.nextSourceSlot)opening.push(nextTarget);else{trial.vertices.push(plan.projected[slot].clone());opening.push(trial.vertices.length-1);}}
  const targetLoop=[...trial.faces[plan.targetFaceIndex]],targetOuter=cyclePathAvoiding(targetLoop,prevTarget,nextTarget,[targetCorner]),openingInner=cyclePathAvoiding(opening,nextTarget,prevTarget,[targetCorner]);if(!targetOuter||!openingInner)return null;
  let targetRemainder=[...targetOuter,...openingInner.slice(1,-1)];
  const prevLoop=[...trial.faces[plan.prevSideFaceIndex]],nextLoop=[...trial.faces[plan.nextSideFaceIndex]],prevRemainder=cyclePathAvoiding(prevLoop,prevTarget,sourcePrev,[targetCorner,sourceCorner]),nextRemainder=cyclePathAvoiding(nextLoop,nextTarget,sourceNext,[targetCorner,sourceCorner]);if(!prevRemainder||!nextRemainder||targetRemainder.length<3)return null;
  targetRemainder=orientLike(trial,targetRemainder,targetNormal);const sidePrev=orientLike(trial,prevRemainder,prevSideNormal),sideNext=orientLike(trial,nextRemainder,nextSideNormal);
  for(const index of[plan.sourceFaceIndex,plan.targetFaceIndex,plan.prevSideFaceIndex,plan.nextSideFaceIndex].sort((a,b)=>b-a))trial.faces.splice(index,1);
  trial.faces.push(targetRemainder,sidePrev,sideNext);
  const tunnel=trial.bridgeLoops(source,opening);if(!tunnel)return null;
  const outerPairs=[[sourcePrev,sourceCorner],[sourceCorner,sourceNext]],remove=(tunnel.faceIndices||[]).filter(fi=>{const face=trial.faces[fi];return face&&outerPairs.some(([a,b])=>face.includes(a)&&face.includes(b));}).sort((a,b)=>b-a);for(const fi of remove)trial.faces.splice(fi,1);
  trial.edges();return trial;
}

function previewExtrude(live,before,faceIndex,distance){restore(live,before);const source=before.faces[faceIndex],normal=before.faceNormal(faceIndex)?.clone().normalize();if(!source||!normal)return false;const replacement=new Map();for(const id of source){live.vertices.push(before.vertices[id].clone().addScaledVector(normal,distance));replacement.set(id,live.vertices.length-1);}live.faces[faceIndex]=source.map(id=>replacement.get(id));for(let i=0;i<source.length;i++){const a=source[i],b=source[(i+1)%source.length];live.faces.push([a,b,replacement.get(b),replacement.get(a)]);}live.edges();return true;}
function cancelNativeDrag(pointerId){internalCancel=true;try{canvas.dispatchEvent(new PointerEvent('pointercancel',{pointerId,isPrimary:true,bubbles:true,cancelable:true}));}catch{const e=new Event('pointercancel',{bubbles:true,cancelable:true});Object.defineProperty(e,'pointerId',{value:pointerId});canvas.dispatchEvent(e);}finally{internalCancel=false;}}
function clear(){probe=null;takeover=null;}

window.addEventListener('pointerdown',event=>{if(internalCancel||event.target!==canvas||!event.isPrimary||!extrudeArmed())return;const m=mesh(),faceIndex=selectedFace(),camera=state()?.camera;if(!m||!Number.isInteger(faceIndex)||!camera)return;const plan=cornerPlan(m,faceIndex);if(!plan)return;const normal2d=projectedNormal(m,faceIndex,camera);if(!normal2d)return;probe={id:event.pointerId,x:event.clientX,y:event.clientY,m,faceIndex,before:m.clone(),plan,normal2d,passedMove:false};},true);
window.addEventListener('pointermove',event=>{if(internalCancel||!probe||probe.id!==event.pointerId||takeover)return;const dx=event.clientX-probe.x,dy=event.clientY-probe.y;if(Math.hypot(dx,dy)<8)return;const distance=(dx*probe.normal2d.x+dy*probe.normal2d.y)*.006,toward=Math.sign(distance)===Math.sign(probe.plan.distance);if(toward&&Math.abs(distance)>=Math.abs(probe.plan.distance)*.55){event.preventDefault();event.stopImmediatePropagation();if(!probe.passedMove)globalThis.__boxlabHistory?.push(probe.before);cancelNativeDrag(probe.id);takeover=probe;probe=null;let d=distance,ready=false;if(Math.abs(d)>=Math.abs(takeover.plan.distance)){d=takeover.plan.distance;ready=true;}takeover.distance=d;takeover.ready=ready;previewExtrude(takeover.m,takeover.before,takeover.faceIndex,d);if(status)status.textContent=`${ready?'THROUGH CORNER READY':'Extrude In'} • 1 face • ${d>=0?'+':''}${d.toFixed(2)}`;render();}else probe.passedMove=true;},true);
window.addEventListener('pointermove',event=>{if(internalCancel||!takeover||takeover.id!==event.pointerId)return;event.preventDefault();event.stopImmediatePropagation();const dx=event.clientX-takeover.x,dy=event.clientY-takeover.y;let d=(dx*takeover.normal2d.x+dy*takeover.normal2d.y)*.006,ready=Math.sign(d)===Math.sign(takeover.plan.distance)&&Math.abs(d)>=Math.abs(takeover.plan.distance);if(ready)d=takeover.plan.distance;takeover.distance=d;takeover.ready=ready;previewExtrude(takeover.m,takeover.before,takeover.faceIndex,d);if(status)status.textContent=`${ready?'THROUGH CORNER READY':d<0?'Extrude In':'Extrude'} • 1 face • ${d>=0?'+':''}${d.toFixed(2)}`;render();},true);
window.addEventListener('pointerup',event=>{if(internalCancel)return;if(takeover&&takeover.id===event.pointerId){event.preventDefault();event.stopImmediatePropagation();const t=takeover;takeover=null;probe=null;if(t.ready){const built=buildCorner(t.before,t.plan);if(built){restore(t.m,built);bridge()?.set?.('face',[]);if(status)status.textContent=`Extrude Through • corner breakout created • ${t.before.faces[t.faceIndex]?.length||0}-edge opening`;}else{restore(t.m,t.before);if(status)status.textContent='Extrude Through • corner topology could not be built';}}else{previewExtrude(t.m,t.before,t.faceIndex,t.distance);bridge()?.set?.('face',[t.faceIndex]);if(status)status.textContent='1 face • Extrude ready';}render();return;}probe=null;},true);
window.addEventListener('pointercancel',event=>{if(internalCancel)return;if(takeover&&takeover.id===event.pointerId){restore(takeover.m,takeover.before);render();}clear();},true);
