// BoxLab v0.36.18.247 — stable-first hybrid Boolean dispatcher.
// Proven stable convex path remains default; sequential BSP also handles safe geometric-degeneracy fallback.
import * as THREE from 'three';
import { EditableMesh } from './mesh.js';
import { meshIntersections, epsilonForMeshes } from './boolean-intersections.js?v=0.36.18.209';
import { topologyInfo, classifyPoint } from './boolean-classify.js?v=0.36.18.210';
import { booleanBSP } from './boolean-bsp.js?v=0.36.18.248';
import { combineEditableMeshes } from './object-join-core.js?v=0.36.18.277';

const VERSION='0.36.18.247';
const CONVEX_ONLY='Current Boolean supports convex solids only';
const DEGENERATE_INPUT='Degenerate face in Boolean input';
const status=document.querySelector('#selectionStatus');
const objectTools=document.querySelector('[data-mode-tools="object"]');
function toolSession(){return globalThis.__boxlabToolSession||null;}

function manager(){return globalThis.__boxlabObjectManager||null;}
function selection(){return globalThis.__boxlabObjectSelection||null;}
function groups(){return globalThis.__boxlabObjectGroups||null;}
function selectedObjects(){
  const m=manager(),ids=selection()?.ids;if(!m||!ids)return[];
  m.saveActive?.();
  return (m.objects||[]).filter(o=>ids.has(o.id));
}
function setStatus(text){if(status)status.textContent=text;}
function centroid(points){const c=new THREE.Vector3();for(const p of points)c.add(p);return points.length?c.multiplyScalar(1/points.length):c;}
function newell(points){
  const n=new THREE.Vector3();
  for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length];n.x+=(a.y-b.y)*(a.z+b.z);n.y+=(a.z-b.z)*(a.x+b.x);n.z+=(a.x-b.x)*(a.y+b.y);}
  return n;
}
function meshCenter(mesh){return centroid(mesh.vertices||[]);}
function cleanPolygon(points,eps,{collinear=true}={}){
  const out=[];const epsSq=eps*eps;
  for(const p of points){if(!out.length||out[out.length-1].distanceToSquared(p)>epsSq)out.push(p.clone());}
  if(out.length>1&&out[0].distanceToSquared(out[out.length-1])<=epsSq)out.pop();
  if(!collinear)return out;
  let changed=true;
  while(changed&&out.length>3){
    changed=false;
    for(let i=0;i<out.length;i++){
      const a=out[(i-1+out.length)%out.length],b=out[i],c=out[(i+1)%out.length];
      const ab=b.clone().sub(a),bc=c.clone().sub(b),cross=ab.clone().cross(bc);
      if(cross.lengthSq()<=epsSq*Math.max(ab.lengthSq(),bc.lengthSq(),1)){out.splice(i,1);changed=true;break;}
    }
  }
  return out;
}
function buildConvexPlanes(mesh,eps){
  const info=topologyInfo(mesh);if(!info.closed)return{ok:false,reason:'Boolean inputs must be closed manifold meshes'};
  const center=meshCenter(mesh),planes=[];
  for(let faceIndex=0;faceIndex<mesh.faces.length;faceIndex++){
    const face=mesh.faces[faceIndex],points=face.map(i=>mesh.vertices[i]);
    if(points.length<3||points.some(p=>!p))return{ok:false,reason:'Invalid face topology'};
    const normal=newell(points);if(normal.lengthSq()<=eps*eps)return{ok:false,reason:DEGENERATE_INPUT,faceIndex};normal.normalize();
    const fc=centroid(points);if(normal.dot(center.clone().sub(fc))>0)normal.negate();
    const plane=new THREE.Plane().setFromNormalAndCoplanarPoint(normal,points[0]);
    for(const v of mesh.vertices)if(plane.distanceToPoint(v)>eps*24)return{ok:false,reason:CONVEX_ONLY};
    planes.push({plane,faceIndex});
  }
  return{ok:true,planes};
}
function splitPolygon(points,plane,eps){
  const front=[],back=[];
  for(let i=0;i<points.length;i++){
    const a=points[i],b=points[(i+1)%points.length],da=plane.distanceToPoint(a),db=plane.distanceToPoint(b);
    const sa=da>eps?1:da<-eps?-1:0,sb=db>eps?1:db<-eps?-1:0;
    if(sa>=0)front.push(a.clone());
    if(sa<=0)back.push(a.clone());
    if(sa*sb<0){const t=da/(da-db),p=a.clone().lerp(b,THREE.MathUtils.clamp(t,0,1));front.push(p.clone());back.push(p.clone());}
  }
  return{front:cleanPolygon(front,eps*4,{collinear:false}),back:cleanPolygon(back,eps*4,{collinear:false})};
}
function polygonKey(poly,eps){
  const q=Math.max(eps*32,1e-9);
  return poly.map(p=>`${Math.round(p.x/q)},${Math.round(p.y/q)},${Math.round(p.z/q)}`).sort().join('|');
}
function dedupePolygons(polys,eps){
  const seen=new Set(),out=[];
  for(const poly of polys){if(poly.length<3)continue;const key=polygonKey(poly,eps);if(seen.has(key))continue;seen.add(key);out.push(poly);}
  return out;
}
function partitionPolygon(points,planes,eps){
  let fragments=[cleanPolygon(points,eps*4,{collinear:false})];
  for(const {plane} of planes){
    const next=[];
    for(const poly of fragments){
      if(poly.length<3)continue;
      const distances=poly.map(p=>plane.distanceToPoint(p));
      const hasFront=distances.some(d=>d>eps),hasBack=distances.some(d=>d<-eps);
      if(hasFront&&hasBack){
        const split=splitPolygon(poly,plane,eps);
        if(split.front.length>=3)next.push(split.front);
        if(split.back.length>=3)next.push(split.back);
      }else next.push(poly);
    }
    fragments=dedupePolygons(next,eps);
    if(!fragments.length)break;
  }
  const inside=[],outside=[];
  for(const poly of fragments){
    if(poly.length<3)continue;
    const c=centroid(poly);
    const isInside=planes.every(({plane})=>plane.distanceToPoint(c)<=eps*8);
    (isInside?inside:outside).push(poly);
  }
  return{inside,outside};
}
function fragmentMesh(source,targetPlanes,eps){
  const inside=[],outside=[];
  for(const face of source.faces){
    const points=face.map(i=>source.vertices[i]);
    const parts=partitionPolygon(points,targetPlanes,eps);
    inside.push(...parts.inside);outside.push(...parts.outside);
  }
  return{inside:dedupePolygons(inside,eps),outside:dedupePolygons(outside,eps)};
}
function polygonAreaNormal(poly){return newell(poly);}
function assemble(polygons,eps){
  const vertices=[],faces=[],faceKeys=new Set();const tol=Math.max(eps*64,1e-8),tolSq=tol*tol;
  function indexFor(p){for(let i=0;i<vertices.length;i++)if(vertices[i].distanceToSquared(p)<=tolSq)return i;vertices.push(p.clone());return vertices.length-1;}
  for(const raw of polygons){
    const poly=cleanPolygon(raw,tol*.25,{collinear:false});if(poly.length<3)continue;
    if(polygonAreaNormal(poly).lengthSq()<=tolSq*tolSq)continue;
    const face=[];for(const p of poly){const idx=indexFor(p);if(face[face.length-1]!==idx)face.push(idx);}
    if(face.length>2&&face[0]===face[face.length-1])face.pop();
    if(new Set(face).size<3)continue;
    const canonical=[...new Set(face)].sort((a,b)=>a-b).join(':');if(faceKeys.has(canonical))continue;faceKeys.add(canonical);faces.push(face);
  }
  return new EditableMesh(vertices,faces);
}
function buildStableResult(a,b,operation){
  const eps=epsilonForMeshes(a,b),pa=buildConvexPlanes(a,eps),pb=buildConvexPlanes(b,eps);
  if(!pa.ok||!pb.ok)return{ok:false,reason:!pa.ok?pa.reason:pb.reason,faceIndex:!pa.ok?pa.faceIndex:pb.faceIndex};
  const intersections=meshIntersections(a,b);
  if(intersections.coplanarCount>0)return{ok:false,reason:'Coplanar overlap is not yet supported by the Boolean prototype'};
  const fa=fragmentMesh(a,pb.planes,eps),fb=fragmentMesh(b,pa.planes,eps);let polygons=[];
  if(operation==='union')polygons=[...fa.outside,...fb.outside];
  else if(operation==='intersection')polygons=[...fa.inside,...fb.inside];
  else polygons=[...fa.outside,...fb.inside.map(poly=>[...poly].reverse())];
  if(!polygons.length)return{ok:false,reason:'Boolean result is empty'};
  const mesh=assemble(polygons,eps),gate=globalThis.__boxlabTopologyGate?.validate?.(mesh)||null,topology=topologyInfo(mesh);
  if(!topology.closed||gate&&!gate.booleanReady)return{ok:false,reason:`Prototype result failed topology validation${gate?` • ${gate.boundaryEdges} boundary / ${gate.nonManifoldEdges} non-manifold edges`:''}`,gate,topology};
  return{ok:true,mesh,gate,topology,intersections,engine:'stable',fragmentCounts:{aInside:fa.inside.length,aOutside:fa.outside.length,bInside:fb.inside.length,bOutside:fb.outside.length}};
}
function buildResult(a,b,operation){
  const stable=buildStableResult(a,b,operation);
  const fallbackAllowed=stable.reason===CONVEX_ONLY||stable.reason===DEGENERATE_INPUT;
  if(stable.ok||!fallbackAllowed)return stable;
  const sequential=booleanBSP(a,b,operation);
  if(sequential.ok)return{...sequential,engine:'sequential',fallbackReason:stable.reason};
  return{...sequential,engine:'sequential',fallbackReason:stable.reason,reason:`Sequential Boolean refused • ${sequential.reason||'general solver failed'}`};
}
function splitConnectedShells(mesh){
  if(!mesh?.faces?.length)return[];
  const edgeFaces=new Map(),faceEdges=[];
  const key=(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`;
  mesh.faces.forEach((face,fi)=>{
    const edges=[];
    for(let i=0;i<face.length;i++){
      const k=key(face[i],face[(i+1)%face.length]);edges.push(k);
      if(!edgeFaces.has(k))edgeFaces.set(k,[]);
      edgeFaces.get(k).push(fi);
    }
    faceEdges[fi]=edges;
  });
  const seen=new Set(),components=[];
  for(let seed=0;seed<mesh.faces.length;seed++){
    if(seen.has(seed))continue;
    const queue=[seed],faces=[];seen.add(seed);
    while(queue.length){
      const fi=queue.shift();faces.push(fi);
      for(const k of faceEdges[fi]||[])for(const other of edgeFaces.get(k)||[])if(!seen.has(other)){seen.add(other);queue.push(other);}
    }
    components.push(faces);
  }
  return components.map(faceIds=>{
    const used=[...new Set(faceIds.flatMap(fi=>mesh.faces[fi]))],map=new Map(used.map((old,i)=>[old,i]));
    return new EditableMesh(used.map(i=>mesh.vertices[i].clone()),faceIds.map(fi=>mesh.faces[fi].map(i=>map.get(i))));
  });
}
function solidsInteract(a,b){
  const intersections=meshIntersections(a,b);
  if(intersections.pairCount>0)return true;
  const eps=epsilonForMeshes(a,b);
  const av=a.vertices?.[0],bv=b.vertices?.[0];
  const ain=av?classifyPoint(av,b,{eps}).state:null;
  const bin=bv?classifyPoint(bv,a,{eps}).state:null;
  return ain==='inside'||ain==='boundary'||bin==='inside'||bin==='boundary';
}
function emptyBoolean(result){return !result?.ok&&/result is empty/i.test(String(result?.reason||''));}
function compoundUnion(shells){
  const out=[];
  for(const source of shells.filter(Boolean)){
    let pending=source.clone(),merged=true;
    while(merged){
      merged=false;
      for(let i=0;i<out.length;i++){
        if(!solidsInteract(pending,out[i]))continue;
        const result=buildResult(pending,out[i],'union');
        if(!result.ok)return result;
        const parts=splitConnectedShells(result.mesh);
        if(parts.length!==1)return{ok:false,reason:'Group Union could not resolve overlapping shells to one closed result'};
        pending=parts[0];out.splice(i,1);merged=true;break;
      }
    }
    out.push(pending);
  }
  return out.length?{ok:true,shells:out}:{ok:false,reason:'Boolean result is empty'};
}
function buildGroupResult(active,other,operation){
  const aShells=(active.members||[]).map(o=>o.mesh.clone()),bShells=(other.members||[]).map(o=>o.mesh.clone());
  if(operation==='union'){
    const union=compoundUnion([...aShells,...bShells]);if(!union.ok)return union;
    const mesh=union.shells.length===1?union.shells[0]:combineEditableMeshes(union.shells);
    return mesh?{ok:true,mesh,engine:'compound',shellCount:union.shells.length}:{ok:false,reason:'Could not assemble Group Union result'};
  }
  if(operation==='difference'){
    let shells=aShells;
    for(const cutter of bShells){
      const next=[];
      for(const shell of shells){
        if(!solidsInteract(shell,cutter)){next.push(shell);continue;}
        const result=buildResult(shell,cutter,'difference');
        if(emptyBoolean(result))continue;
        if(!result.ok)return result;
        next.push(...splitConnectedShells(result.mesh));
      }
      shells=next;if(!shells.length)break;
    }
    if(!shells.length)return{ok:false,reason:'Boolean result is empty'};
    const mesh=shells.length===1?shells[0]:combineEditableMeshes(shells);
    return mesh?{ok:true,mesh,engine:'compound',shellCount:shells.length}:{ok:false,reason:'Could not assemble Group Cut result'};
  }
  const pieces=[];
  for(const a of aShells)for(const b of bShells){
    if(!solidsInteract(a,b))continue;
    const result=buildResult(a,b,'intersection');
    if(emptyBoolean(result))continue;
    if(!result.ok)return result;
    pieces.push(...splitConnectedShells(result.mesh));
  }
  if(!pieces.length)return{ok:false,reason:'Boolean result is empty'};
  const normalized=compoundUnion(pieces);if(!normalized.ok)return normalized;
  const mesh=normalized.shells.length===1?normalized.shells[0]:combineEditableMeshes(normalized.shells);
  return mesh?{ok:true,mesh,engine:'compound',shellCount:normalized.shells.length}:{ok:false,reason:'Could not assemble Group Intersect result'};
}

function ensureUI(){
  if(!objectTools)return null;
  document.querySelector('#booleanPrototype211')?.remove();document.querySelector('#booleanPrototype212')?.remove();document.querySelector('#booleanPrototype214')?.remove();document.querySelector('#booleanPrototype215')?.remove();document.querySelector('#booleanPrototype216')?.remove();
  let group=document.querySelector('#booleanPrototype217');
  if(group)return group;

  const launchRow=document.createElement('div');
  launchRow.className='outliner-actions boolean-launch-row';
  launchRow.style.gridTemplateColumns='1fr';
  launchRow.innerHTML='<button id="booleanLaunchBtn" type="button">Boolean</button>';
  objectTools.appendChild(launchRow);

  group=document.createElement('div');
  group.id='booleanPrototype217';
  group.className='boxlab-tool-session-shell boolean-session';
  group.hidden=true;
  group.innerHTML='<div class="boxlab-tool-session-title"><span>Boolean</span><span class="boxlab-tool-session-subtitle">Two objects / Groups</span></div>'+
    '<div class="boxlab-tool-session-section">Operation</div>';
  const row=document.createElement('div');row.className='outliner-actions';row.style.cssText='grid-template-columns:repeat(3,minmax(0,1fr));gap:4px';
  for(const [op,text] of [['union','Union'],['difference','Cut'],['intersection','Intersect']]){const b=document.createElement('button');b.type='button';b.dataset.boolean217=op;b.textContent=text;b.style.cssText='min-width:0;padding:5px 3px;font-size:10px';row.appendChild(b);}
  const hint=document.createElement('div');hint.id='booleanEligibilityHint';hint.className='boxlab-tool-session-subtitle';hint.textContent='Select exactly two closed objects';
  const closeRow=document.createElement('div');closeRow.className='outliner-actions';closeRow.style.gridTemplateColumns='1fr';closeRow.innerHTML='<button id="booleanCloseBtn" type="button">Close</button>';
  group.append(row,hint,closeRow);objectTools.appendChild(group);

  launchRow.querySelector('#booleanLaunchBtn')?.addEventListener('click',()=>{
    group.hidden=false;
    toolSession()?.begin?.({id:'boolean',title:'Boolean',node:group,subtitle:'Union · Cut · Intersect'});
    sync();
  });
  group.querySelector('#booleanCloseBtn')?.addEventListener('click',()=>{
    group.hidden=true;
    toolSession()?.end?.('boolean');
    setStatus('Boolean closed');
  });
  return group;
}
function eligibility(){
  const m=manager(),chosen=selectedObjects();
  if(!m)return{ok:false,reason:'Object manager unavailable'};
  if(chosen.length===2){
    const active=chosen.find(o=>o.id===m.activeId),other=chosen.find(o=>o.id!==m.activeId);
    if(!active||!other)return{ok:false,reason:'One selected object must be active'};
    if(active.kind==='reference'||other.kind==='reference')return{ok:false,reason:'Reference objects cannot be Boolean operands'};
    if(active.locked||other.locked)return{ok:false,reason:'Unlock both Boolean operands'};
    const ta=topologyInfo(active.mesh),tb=topologyInfo(other.mesh);if(!ta.closed||!tb.closed)return{ok:false,reason:'Both Boolean operands must be closed manifold meshes'};
    return{ok:true,kind:'objects',active,other,chosen,originals:[active,other]};
  }
  const g=groups(),groupIds=g?.completeSelectedGroupIds?.()||[];
  if(groupIds.length!==2)return{ok:false,reason:'Select exactly 2 objects or 2 complete Groups with Multi'};
  const allObjects=m.objects||[],selectedIds=selection()?.ids||new Set();
  const selected=allObjects.filter(o=>selectedIds.has(o.id));
  const allowed=new Set(groupIds),invalidSelected=selected.some(o=>o.groupId==null||!allowed.has(o.groupId));
  if(invalidSelected)return{ok:false,reason:'Group Boolean requires exactly two complete Groups'};
  const operandFor=id=>{const members=g.members?.(id)||allObjects.filter(o=>o.groupId===id);if(members.length<2||members.some(o=>!selectedIds.has(o.id)))return null;if(members.some(o=>o.kind==='reference'))return{error:'Reference objects cannot be Boolean operands'};if(members.some(o=>o.locked))return{error:'Unlock all Group members before Boolean'};if(members.some(o=>!topologyInfo(o.mesh).closed))return{error:'Every Group member must be a closed manifold mesh'};return{name:g.label?.(id)||`Group ${id}`,groupId:id,members,primaryId:members[0]?.id};};
  const activeObject=allObjects.find(o=>o.id===m.activeId),activeGroupId=activeObject?.groupId;
  if(!allowed.has(activeGroupId))return{ok:false,reason:'Active object must belong to one selected Group'};
  const otherGroupId=groupIds.find(id=>id!==activeGroupId),active=operandFor(activeGroupId),other=operandFor(otherGroupId);
  if(active?.error)return{ok:false,reason:active.error};if(other?.error)return{ok:false,reason:other.error};
  if(!active||!other)return{ok:false,reason:'Could not build Group Boolean operands'};
  return{ok:true,kind:'groups',active,other,chosen:selected,originals:[...active.members,...other.members]};
}
function booleanNameStem(name){
  return String(name||'Object').trim().replace(/\s+B\d+$/i,'')||'Object';
}
function nextBooleanName(name){
  const m=manager(),stem=booleanNameStem(name),names=new Set((m?.objects||[]).map(o=>o.name));
  let i=1,candidate='';
  do{candidate=`${stem} B${i++}`;}while(names.has(candidate));
  return candidate;
}
function sync(){
  const group=ensureUI();if(!group)return false;const e=eligibility();
  group.querySelectorAll('[data-boolean217]').forEach(button=>{button.disabled=!e.ok;button.title=e.ok?(button.dataset.boolean217==='difference'?`Cut ${e.other.name} from active ${e.active.name}`:`${button.textContent}: ${e.active.name} + ${e.other.name}`):e.reason;});
  const hint=group.querySelector('#booleanEligibilityHint');
  if(hint)hint.textContent=e.ok?`${e.active.name} + ${e.other.name}`:e.reason;
  return e;
}
function apply(operation){
  const e=eligibility();if(!e.ok){setStatus(`Boolean • ${e.reason}`);return;}
  setStatus(`Boolean ${operation} • calculating…`);
  const result=e.kind==='groups'?buildGroupResult(e.active,e.other,operation):buildResult(e.active.mesh,e.other.mesh,operation);
  if(!result.ok){setStatus(`Boolean ${operation} refused • ${result.reason}`);return;}
  globalThis.__boxlabObjectHistory?.checkpoint?.();
  const originals=e.originals||[e.active,e.other],visibility=new Map(originals.map(o=>[o.id,o.visible!==false]));
  for(const object of originals)object.visible=false;
  const label=operation==='difference'?'Cut':operation==='intersection'?'Intersect':'Union';
  const created=manager()?.addMesh?.(result.mesh,nextBooleanName(e.active.name),{kind:'editable',visible:true,locked:false,enterObjectMode:true});
  if(!created){for(const object of originals)object.visible=visibility.get(object.id)!==false;setStatus(`Boolean ${label} failed • result object could not be created`);return;}
  selection()?.select?.([created.id]);
  globalThis.__boxlabTopologyGate?.sync?.();
  const fallbackText=result.fallbackReason===DEGENERATE_INPUT?' • repaired degenerate input':'';const engineText=result.engine==='compound'?'compound solver':result.engine==='sequential'?'sequential solver':'stable solver';
  const sourceText=e.kind==='groups'?' • source Groups hidden':' • originals hidden';
  setStatus(`${label} created • ${result.mesh.vertices.length} verts • ${result.mesh.faces.length} faces • ${engineText}${fallbackText}${sourceText}`);
  const group=document.querySelector('#booleanPrototype217');if(group)group.hidden=true;
  toolSession()?.end?.('boolean');
}

ensureUI();
document.addEventListener('click',event=>{const button=event.target?.closest?.('[data-boolean217]');if(!button)return;event.preventDefault();event.stopImmediatePropagation();apply(button.dataset.boolean217);},true);
window.addEventListener('boxlab-object-manager-ready',()=>setTimeout(sync,0));
window.addEventListener('boxlab-bridge-state',()=>setTimeout(sync,0));
document.addEventListener('pointerup',()=>setTimeout(sync,0),true);
[0,100,400,900].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabBooleanPrototype={version:'0.36.18.450',buildStableResult,buildResult,buildGroupResult,eligibility,apply,sync};
