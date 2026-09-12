// BoxLab v0.36.18.157 — promote a safe Add-on-edge vertex into a real loop cut.
// A single vertex inserted into a manifold quad edge turns the adjacent quads
// into 5-gons. When Loop Cut is started from either segment touching that
// collinear extra vertex, reconstruct the original logical edge and run the
// existing Loop Cut at the exact stored vertex fraction. Arbitrary n-gons and
// non-collinear topology are left untouched.

import { EditableMesh as LiveEditableMesh } from './mesh.js?v=0.12';

const baseLoopCut=LiveEditableMesh.prototype.loopCut;
const EPS=1e-7;

function key(mesh,a,b){return mesh.edgeKey(a,b);}
function realFaces(mesh,vertex){const out=[];for(let fi=0;fi<mesh.faces.length;fi++){const face=mesh.faces[fi];if(Array.isArray(face)&&face.includes(vertex))out.push(fi);}return out;}
function incidentNeighbours(mesh,vertex){const out=new Set();for(const edge of mesh.edges()){if(edge.a===vertex)out.add(edge.b);else if(edge.b===vertex)out.add(edge.a);}return [...out].filter(i=>mesh.vertices[i]);}
function collinearBetween(a,v,b){
  if(!a||!v||!b)return false;
  const av=v.clone().sub(a),vb=b.clone().sub(v),ab=b.clone().sub(a);
  const scale=Math.max(ab.length(),1);
  if(av.lengthSq()<1e-14||vb.lengthSq()<1e-14)return false;
  return av.clone().cross(vb).length()<=EPS*scale*scale&&av.dot(vb)>=-EPS;
}
function fraction(a,v,b){const ab=b.clone().sub(a),den=ab.lengthSq();if(den<1e-14)return null;return Math.max(.001,Math.min(.999,v.clone().sub(a).dot(ab)/den));}

function promotionCandidate(mesh,edgeIndex){
  const edges=mesh.edges(),seed=edges[edgeIndex];
  if(!seed||seed.loose)return null;
  for(const vertex of [seed.a,seed.b]){
    const neighbours=incidentNeighbours(mesh,vertex);
    if(neighbours.length!==2)continue;
    const [a,b]=neighbours;
    if(!collinearBetween(mesh.vertices[a],mesh.vertices[vertex],mesh.vertices[b]))continue;
    const faces=realFaces(mesh,vertex);
    if(!faces.length)continue;
    if(faces.some(fi=>mesh.faces[fi]?.length!==5))continue;
    if(faces.some(fi=>new Set(mesh.faces[fi].filter(i=>i!==vertex)).size!==4))continue;
    const other=seed.a===vertex?seed.b:seed.a;
    if(other!==a&&other!==b)continue;
    const t=fraction(mesh.vertices[a],mesh.vertices[vertex],mesh.vertices[b]);
    if(t===null)continue;
    return{vertex,a,b,t,faces};
  }
  return null;
}

function restore(mesh,backup){
  mesh.vertices=backup.vertices.map(v=>v.clone());
  mesh.faces=backup.faces.map(face=>[...face]);
  mesh.creases=new Map(backup.creases||[]);
  if(backup.looseEdges instanceof Set)mesh.looseEdges=new Set(backup.looseEdges);
  if(backup.looseVertices instanceof Set)mesh.looseVertices=new Set(backup.looseVertices);
  mesh.edges?.();
}

function removePromotedVertex(mesh,info){
  const {vertex,a,b}=info;
  const oldCrease=Math.max(mesh.creases?.get?.(key(mesh,a,vertex))||0,mesh.creases?.get?.(key(mesh,vertex,b))||0);
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];
    if(Array.isArray(face)&&face.includes(vertex))mesh.faces[fi]=face.filter(i=>i!==vertex);
  }
  const remap=i=>i<vertex?i:i>vertex?i-1:null;
  const nextCreases=new Map();
  for(const [edgeKey,value] of mesh.creases||[]){
    const [x,y]=String(edgeKey).split(':').map(Number);
    if(x===vertex||y===vertex)continue;
    const nx=remap(x),ny=remap(y);
    if(Number.isInteger(nx)&&Number.isInteger(ny)&&nx!==ny)nextCreases.set(key(mesh,nx,ny),value);
  }
  const nextLooseEdges=new Set();
  for(const edgeKey of mesh.looseEdges||[]){
    const [x,y]=String(edgeKey).split(':').map(Number);
    if(x===vertex||y===vertex)continue;
    const nx=remap(x),ny=remap(y);
    if(Number.isInteger(nx)&&Number.isInteger(ny)&&nx!==ny)nextLooseEdges.add(key(mesh,nx,ny));
  }
  const nextLooseVertices=new Set();
  for(const old of mesh.looseVertices||[]){const next=remap(old);if(Number.isInteger(next))nextLooseVertices.add(next);}
  mesh.vertices.splice(vertex,1);
  mesh.faces=mesh.faces.map(face=>face.map(remap));
  mesh.creases=nextCreases;
  if(mesh.looseEdges instanceof Set)mesh.looseEdges=nextLooseEdges;
  if(mesh.looseVertices instanceof Set)mesh.looseVertices=nextLooseVertices;
  const na=remap(a),nb=remap(b);
  if(!Number.isInteger(na)||!Number.isInteger(nb))return null;
  if(oldCrease>0)mesh.creases.set(key(mesh,na,nb),oldCrease);
  mesh.edges?.();
  return{a:na,b:nb};
}

LiveEditableMesh.prototype.loopCut=function(edgeIndex,t=.5){
  const candidate=promotionCandidate(this,edgeIndex);
  if(!candidate)return baseLoopCut.call(this,edgeIndex,t);
  const backup=this.clone();
  const logical=removePromotedVertex(this,candidate);
  if(!logical){restore(this,backup);return baseLoopCut.call(this,edgeIndex,t);}
  const logicalKey=key(this,logical.a,logical.b);
  const restoredIndex=this.edges().findIndex(edge=>key(this,edge.a,edge.b)===logicalKey);
  if(restoredIndex<0){restore(this,backup);return null;}
  const result=baseLoopCut.call(this,restoredIndex,candidate.t);
  if(!result){restore(this,backup);return null;}
  result.promotedAddedVertex=true;
  result.promotedPosition=candidate.t;
  return result;
};

LiveEditableMesh.prototype.__boxlabAddedVertexLoopPromotion='0.36.18.157';
globalThis.__boxlabAddedVertexLoopPromotion={version:'0.36.18.157'};
