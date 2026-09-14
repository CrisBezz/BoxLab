// BoxLab v0.36.18.217 — sequential Boolean BSP with conforming seam assembly.
// Closed manifold meshes -> triangulation -> BSP CSG -> edge-conforming weld -> editable mesh.
import * as THREE from 'three';
import { EditableMesh } from './mesh.js';
import { triangulatePoints, epsilonForMeshes } from './boolean-intersections.js?v=0.36.18.209';
import { topologyInfo } from './boolean-classify.js?v=0.36.18.210';

const VERSION='0.36.18.217';

class BVertex{
  constructor(pos){this.pos=pos.clone();}
  clone(){return new BVertex(this.pos);}
  interpolate(other,t){return new BVertex(this.pos.clone().lerp(other.pos,t));}
}
class BPlane{
  constructor(normal,w,eps){this.normal=normal.clone();this.w=w;this.eps=eps;}
  clone(){return new BPlane(this.normal,this.w,this.eps);}
  flip(){this.normal.negate();this.w=-this.w;}
  static fromPoints(a,b,c,eps){
    const n=b.clone().sub(a).cross(c.clone().sub(a));
    if(n.lengthSq()<=eps*eps)return null;
    n.normalize();return new BPlane(n,n.dot(a),eps);
  }
  splitPolygon(polygon,coplanarFront,coplanarBack,front,back){
    const COPLANAR=0,FRONT=1,BACK=2,SPANNING=3,types=[];let polygonType=0;
    for(const v of polygon.vertices){const t=this.normal.dot(v.pos)-this.w;const type=t<-this.eps?BACK:t>this.eps?FRONT:COPLANAR;polygonType|=type;types.push(type);}
    if(polygonType===COPLANAR){(this.normal.dot(polygon.plane.normal)>0?coplanarFront:coplanarBack).push(polygon);return;}
    if(polygonType===FRONT){front.push(polygon);return;}
    if(polygonType===BACK){back.push(polygon);return;}
    const f=[],b=[];
    for(let i=0;i<polygon.vertices.length;i++){
      const j=(i+1)%polygon.vertices.length,ti=types[i],tj=types[j],vi=polygon.vertices[i],vj=polygon.vertices[j];
      if(ti!==BACK)f.push(vi);
      if(ti!==FRONT)b.push(ti!==BACK?vi.clone():vi);
      if((ti|tj)===SPANNING){
        const direction=vj.pos.clone().sub(vi.pos),den=this.normal.dot(direction);
        if(Math.abs(den)>1e-20){const t=(this.w-this.normal.dot(vi.pos))/den,v=vi.interpolate(vj,THREE.MathUtils.clamp(t,0,1));f.push(v);b.push(v.clone());}
      }
    }
    if(f.length>=3){const p=new BPolygon(f,this.eps);if(p.valid)front.push(p);}
    if(b.length>=3){const p=new BPolygon(b,this.eps);if(p.valid)back.push(p);}
  }
}
class BPolygon{
  constructor(vertices,eps){this.vertices=vertices;this.eps=eps;this.plane=BPlane.fromPoints(vertices[0].pos,vertices[1].pos,vertices[2].pos,eps);this.valid=!!this.plane;}
  clone(){return new BPolygon(this.vertices.map(v=>v.clone()),this.eps);}
  flip(){this.vertices.reverse();this.plane?.flip();}
}
class BNode{
  constructor(polygons=[],eps=1e-8){this.eps=eps;this.plane=null;this.front=null;this.back=null;this.polygons=[];if(polygons.length)this.build(polygons);}
  clone(){const node=new BNode([],this.eps);node.plane=this.plane?.clone()||null;node.front=this.front?.clone()||null;node.back=this.back?.clone()||null;node.polygons=this.polygons.map(p=>p.clone());return node;}
  invert(){for(const p of this.polygons)p.flip();this.plane?.flip();this.front?.invert();this.back?.invert();const t=this.front;this.front=this.back;this.back=t;}
  clipPolygons(polygons){
    if(!this.plane)return polygons.slice();
    let front=[],back=[];for(const p of polygons)this.plane.splitPolygon(p,front,back,front,back);
    if(this.front)front=this.front.clipPolygons(front);
    back=this.back?this.back.clipPolygons(back):[];
    return front.concat(back);
  }
  clipTo(node){this.polygons=node.clipPolygons(this.polygons);this.front?.clipTo(node);this.back?.clipTo(node);}
  allPolygons(){let p=this.polygons.slice();if(this.front)p=p.concat(this.front.allPolygons());if(this.back)p=p.concat(this.back.allPolygons());return p;}
  build(polygons){
    if(!polygons.length)return;if(!this.plane)this.plane=polygons[0].plane.clone();
    const front=[],back=[];for(const p of polygons)this.plane.splitPolygon(p,this.polygons,this.polygons,front,back);
    if(front.length){if(!this.front)this.front=new BNode([],this.eps);this.front.build(front);}
    if(back.length){if(!this.back)this.back=new BNode([],this.eps);this.back.build(back);}
  }
}

function faceNormal(points){const n=new THREE.Vector3();for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length];n.x+=(a.y-b.y)*(a.z+b.z);n.y+=(a.z-b.z)*(a.x+b.x);n.z+=(a.x-b.x)*(a.y+b.y);}return n;}
function meshPolygons(mesh,eps){
  const polygons=[];
  for(const face of mesh?.faces||[]){
    const points=face.map(i=>mesh.vertices?.[i]).filter(Boolean);if(points.length!==face.length||points.length<3)continue;
    const fn=faceNormal(points);if(fn.lengthSq()<=eps*eps)continue;
    for(let tri of triangulatePoints(points)){
      const tn=tri[1].clone().sub(tri[0]).cross(tri[2].clone().sub(tri[0]));
      if(tn.dot(fn)<0)tri=[tri[0],tri[2],tri[1]];
      const p=new BPolygon(tri.map(v=>new BVertex(v)),eps);if(p.valid)polygons.push(p);
    }
  }
  return polygons;
}
function signedVolume(polygons){let v=0;for(const p of polygons){const a=p.vertices[0].pos;for(let i=1;i<p.vertices.length-1;i++){const b=p.vertices[i].pos,c=p.vertices[i+1].pos;v+=a.dot(b.clone().cross(c))/6;}}return v;}
function outwardPolygons(mesh,eps){const polygons=meshPolygons(mesh,eps);if(signedVolume(polygons)<0)for(const p of polygons)p.flip();return polygons;}
function operate(pa,pb,operation,eps){
  const a=new BNode(pa.map(p=>p.clone()),eps),b=new BNode(pb.map(p=>p.clone()),eps);
  if(operation==='union'){a.clipTo(b);b.clipTo(a);b.invert();b.clipTo(a);b.invert();a.build(b.allPolygons());return a.allPolygons();}
  if(operation==='difference'){a.invert();a.clipTo(b);b.clipTo(a);b.invert();b.clipTo(a);b.invert();a.build(b.allPolygons());a.invert();return a.allPolygons();}
  if(operation==='intersection'){a.invert();b.clipTo(a);b.invert();a.clipTo(b);b.clipTo(a);a.build(b.allPolygons());a.invert();return a.allPolygons();}
  return[];
}
function cleanLoop(points,tol){
  const out=[],tolSq=tol*tol;for(const p of points){if(!out.length||out[out.length-1].distanceToSquared(p)>tolSq)out.push(p.clone());}
  if(out.length>1&&out[0].distanceToSquared(out[out.length-1])<=tolSq)out.pop();return out;
}
function uniquePositions(polygons,tol){
  const out=[],tolSq=tol*tol;
  for(const poly of polygons)for(const v of poly.vertices){const p=v.pos;if(!out.some(q=>q.distanceToSquared(p)<=tolSq))out.push(p.clone());}
  return out;
}
function pointOnOpenSegment(p,a,b,tol){
  const ab=b.clone().sub(a),lenSq=ab.lengthSq();if(lenSq<=tol*tol)return null;
  const t=ab.dot(p.clone().sub(a))/lenSq;if(t<=1e-7||t>=1-1e-7)return null;
  const closest=a.clone().addScaledVector(ab,t);
  if(closest.distanceToSquared(p)>tol*tol)return null;
  return t;
}
function conformPolygonPoints(points,candidates,tol){
  const out=[];
  for(let i=0;i<points.length;i++){
    const a=points[i],b=points[(i+1)%points.length];out.push(a.clone());
    const hits=[];
    for(const p of candidates){const t=pointOnOpenSegment(p,a,b,tol);if(t!=null)hits.push({t,p});}
    hits.sort((x,y)=>x.t-y.t);
    for(const hit of hits)if(out[out.length-1].distanceToSquared(hit.p)>tol*tol)out.push(hit.p.clone());
  }
  return cleanLoop(out,tol*.25);
}
function assemble(polygons,eps){
  const vertices=[],faces=[],faceKeys=new Set(),tol=Math.max(eps*64,1e-8),tolSq=tol*tol;
  const candidates=uniquePositions(polygons,tol);
  const indexFor=p=>{for(let i=0;i<vertices.length;i++)if(vertices[i].distanceToSquared(p)<=tolSq)return i;vertices.push(p.clone());return vertices.length-1;};
  for(const poly of polygons){
    const raw=cleanLoop(poly.vertices.map(v=>v.pos),tol*.25);if(raw.length<3)continue;
    const points=conformPolygonPoints(raw,candidates,tol*2);if(points.length<3)continue;
    const face=[];for(const p of points){const i=indexFor(p);if(face[face.length-1]!==i)face.push(i);}
    if(face.length>2&&face[0]===face[face.length-1])face.pop();if(new Set(face).size<3)continue;
    const canonical=[...new Set(face)].sort((a,b)=>a-b).join(':');if(faceKeys.has(canonical))continue;faceKeys.add(canonical);faces.push(face);
  }
  return new EditableMesh(vertices,faces);
}
function booleanBSP(meshA,meshB,operation='union'){
  const op=String(operation).toLowerCase();if(!['union','difference','intersection'].includes(op))return{ok:false,reason:'Unknown Boolean operation'};
  const ta=topologyInfo(meshA),tb=topologyInfo(meshB);if(!ta.closed||!tb.closed)return{ok:false,reason:'Both Boolean operands must be closed manifold meshes'};
  const rawEps=epsilonForMeshes(meshA,meshB),eps=Math.max(rawEps*32,1e-7),pa=outwardPolygons(meshA,eps),pb=outwardPolygons(meshB,eps);
  if(!pa.length||!pb.length)return{ok:false,reason:'Boolean operand has no valid polygons'};
  let polygons;try{polygons=operate(pa,pb,op,eps);}catch(error){return{ok:false,reason:`Boolean BSP failed • ${error?.message||error}`};}
  if(!polygons.length){if(op==='intersection')return{ok:false,empty:true,reason:'Boolean result is empty'};return{ok:false,reason:'Boolean result produced no polygons'};}
  const mesh=assemble(polygons,eps),topology=topologyInfo(mesh),gate=globalThis.__boxlabTopologyGate?.validate?.(mesh)||null;
  if(!topology.closed||gate&&!gate.booleanReady)return{ok:false,reason:`Boolean result failed topology validation${gate?` • ${gate.boundaryEdges} boundary / ${gate.nonManifoldEdges} non-manifold edges`:''}`,mesh,topology,gate};
  return{ok:true,mesh,topology,gate,polygonCount:polygons.length,eps};
}

export {VERSION,booleanBSP};
globalThis.__boxlabBooleanBSP={version:VERSION,booleanBSP};
