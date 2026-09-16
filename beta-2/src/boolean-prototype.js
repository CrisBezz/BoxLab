// BoxLab v0.36.18.217 — stable-first hybrid Boolean dispatcher.
// Proven stable convex path remains default; sequential BSP is used only after an explicit convex-only refusal.
import * as THREE from 'three';
import { EditableMesh } from './mesh.js';
import { meshIntersections, epsilonForMeshes } from './boolean-intersections.js?v=0.36.18.209';
import { topologyInfo } from './boolean-classify.js?v=0.36.18.210';
import { booleanBSP } from './boolean-bsp.js?v=0.36.18.217';

const VERSION='0.36.18.217';
const CONVEX_ONLY='Current Boolean supports convex solids only';
const status=document.querySelector('#selectionStatus');
const objectTools=document.querySelector('[data-mode-tools="object"]');

function manager(){return globalThis.__boxlabObjectManager||null;}
function selection(){return globalThis.__boxlabObjectSelection||null;}
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
    const normal=newell(points);if(normal.lengthSq()<=eps*eps)return{ok:false,reason:'Degenerate face in Boolean input'};normal.normalize();
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
  if(!pa.ok||!pb.ok)return{ok:false,reason:!pa.ok?pa.reason:pb.reason};
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
  if(stable.ok||stable.reason!==CONVEX_ONLY)return stable;
  const sequential=booleanBSP(a,b,operation);
  if(sequential.ok)return{...sequential,engine:'sequential'};
  return{...sequential,engine:'sequential',reason:`Sequential Boolean refused • ${sequential.reason||'general solver failed'}`};
}
function ensureUI(){
  if(!objectTools)return null;
  document.querySelector('#booleanPrototype211')?.remove();document.querySelector('#booleanPrototype212')?.remove();document.querySelector('#booleanPrototype214')?.remove();document.querySelector('#booleanPrototype215')?.remove();document.querySelector('#booleanPrototype216')?.remove();
  let group=document.querySelector('#booleanPrototype217');if(group)return group;
  group=document.createElement('div');group.id='booleanPrototype217';group.style.cssText='margin:7px 0 3px';
  const label=document.createElement('div');label.textContent='BOOLEAN • STABLE + SEQUENTIAL';label.style.cssText='font-size:9px;letter-spacing:.35px;opacity:.55;margin:0 0 4px 1px';
  const row=document.createElement('div');row.className='outliner-actions';row.style.cssText='grid-template-columns:repeat(3,minmax(0,1fr));gap:4px';
  for(const [op,text] of [['union','Union'],['difference','Cut'],['intersection','Intersect']]){const b=document.createElement('button');b.type='button';b.dataset.boolean217=op;b.textContent=text;b.style.cssText='min-width:0;padding:5px 3px;font-size:10px';row.appendChild(b);}
  group.append(label,row);objectTools.appendChild(group);return group;
}
function eligibility(){
  const m=manager(),chosen=selectedObjects();
  if(!m||chosen.length!==2)return{ok:false,reason:'Select exactly 2 objects with Multi'};
  const active=chosen.find(o=>o.id===m.activeId),other=chosen.find(o=>o.id!==m.activeId);
  if(!active||!other)return{ok:false,reason:'One selected object must be active'};
  if(active.kind==='reference'||other.kind==='reference')return{ok:false,reason:'Reference objects cannot be Boolean operands'};
  if(active.locked||other.locked)return{ok:false,reason:'Unlock both Boolean operands'};
  const ta=topologyInfo(active.mesh),tb=topologyInfo(other.mesh);if(!ta.closed||!tb.closed)return{ok:false,reason:'Both Boolean operands must be closed manifold meshes'};
  return{ok:true,active,other};
}
function sync(){
  const group=ensureUI();if(!group)return false;const e=eligibility();
  group.querySelectorAll('[data-boolean217]').forEach(button=>{button.disabled=!e.ok;button.title=e.ok?(button.dataset.boolean217==='difference'?`Cut ${e.other.name} from active ${e.active.name}`:`${button.textContent}: ${e.active.name} + ${e.other.name}`):e.reason;});return e;
}
function apply(operation){
  const e=eligibility();if(!e.ok){setStatus(`Boolean • ${e.reason}`);return;}
  setStatus(`Boolean ${operation} • calculating…`);
  const result=buildResult(e.active.mesh,e.other.mesh,operation);
  if(!result.ok){setStatus(`Boolean ${operation} refused • ${result.reason}`);return;}
  globalThis.__boxlabObjectHistory?.checkpoint?.();
  e.active.visible=false;e.other.visible=false;
  const label=operation==='difference'?'Cut':operation==='intersection'?'Intersect':'Union';
  const created=manager()?.addMesh?.(result.mesh,`${e.active.name} ${label} ${e.other.name}`,{kind:'editable',visible:true,locked:false,enterObjectMode:true});
  if(!created){e.active.visible=true;e.other.visible=true;setStatus(`Boolean ${label} failed • result object could not be created`);return;}
  selection()?.select?.([created.id]);
  globalThis.__boxlabTopologyGate?.sync?.();
  setStatus(`${label} created • ${result.mesh.vertices.length} verts • ${result.mesh.faces.length} faces • ${result.engine==='sequential'?'sequential solver':'stable solver'} • originals hidden`);
}

ensureUI();
document.addEventListener('click',event=>{const button=event.target?.closest?.('[data-boolean217]');if(!button)return;event.preventDefault();event.stopImmediatePropagation();apply(button.dataset.boolean217);},true);
window.addEventListener('boxlab-object-manager-ready',()=>setTimeout(sync,0));
window.addEventListener('boxlab-bridge-state',()=>setTimeout(sync,0));
document.addEventListener('pointerup',()=>setTimeout(sync,0),true);
[0,100,400,900].forEach(delay=>setTimeout(sync,delay));

globalThis.__boxlabBooleanPrototype={version:VERSION,buildStableResult,buildResult,apply,sync};
