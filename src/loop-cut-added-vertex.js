// BoxLab v0.36.18.158 — promote a safe Add-on-edge vertex into a real loop cut.
// Detection is based on the immediate face-boundary neighbours of the added
// vertex, not total mesh valence, so existing surrounding cuts do not block it.

import { EditableMesh as LiveEditableMesh } from './mesh.js?v=0.12';

const baseLoopCut=LiveEditableMesh.prototype.loopCut;
const EPS=1e-7;

function key(mesh,a,b){return mesh.edgeKey(a,b);}
function collinearBetween(a,v,b){
  if(!a||!v||!b)return false;
  const av=v.clone().sub(a),vb=b.clone().sub(v),ab=b.clone().sub(a);
  const scale=Math.max(ab.length(),1);
  if(av.lengthSq()<1e-14||vb.lengthSq()<1e-14)return false;
  return av.clone().cross(vb).length()<=EPS*scale*scale&&av.dot(vb)>=-EPS;
}
function fraction(a,v,b){const ab=b.clone().sub(a),den=ab.lengthSq();if(den<1e-14)return null;return Math.max(.001,Math.min(.999,v.clone().sub(a).dot(ab)/den));}
function localPair(face,vertex){
  const i=face.indexOf(vertex);if(i<0||face.length<3)return null;
  return [face[(i-1+face.length)%face.length],face[(i+1)%face.length]];
}
function samePair(pair,a,b){return pair&&((pair[0]===a&&pair[1]===b)||(pair[0]===b&&pair[1]===a));}

function promotionCandidate(mesh,edgeIndex){
  const seed=mesh.edges()[edgeIndex];
  if(!seed||seed.loose)return null;
  for(const vertex of [seed.a,seed.b]){
    const touched=[];
    for(let fi=0;fi<mesh.faces.length;fi++){
      const face=mesh.faces[fi];if(!Array.isArray(face)||!face.includes(vertex))continue;
      const pair=localPair(face,vertex);if(pair)touched.push({fi,face,pair});
    }
    if(!touched.length||touched.length>2)continue;
    const [a,b]=touched[0].pair;
    if(!Number.isInteger(a)||!Number.isInteger(b)||a===b)continue;
    if(touched.some(item=>item.face.length!==5||!samePair(item.pair,a,b)))continue;
    if(touched.some(item=>new Set(item.face.filter(i=>i!==vertex)).size!==4))continue;
    if(!collinearBetween(mesh.vertices[a],mesh.vertices[vertex],mesh.vertices[b]))continue;
    const other=seed.a===vertex?seed.b:seed.a;
    if(other!==a&&other!==b)continue;
    const t=fraction(mesh.vertices[a],mesh.vertices[vertex],mesh.vertices[b]);
    if(t===null)continue;
    return{vertex,a,b,t,faces:touched.map(item=>item.fi)};
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
    const [x,y]=String(edgeKey).split(':').map(Number);if(x===vertex||y===vertex)continue;
    const nx=remap(x),ny=remap(y);if(Number.isInteger(nx)&&Number.isInteger(ny)&&nx!==ny)nextCreases.set(key(mesh,nx,ny),value);
  }
  const nextLooseEdges=new Set();
  for(const edgeKey of mesh.looseEdges||[]){
    const [x,y]=String(edgeKey).split(':').map(Number);if(x===vertex||y===vertex)continue;
    const nx=remap(x),ny=remap(y);if(Number.isInteger(nx)&&Number.isInteger(ny)&&nx!==ny)nextLooseEdges.add(key(mesh,nx,ny));
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

LiveEditableMesh.prototype.__boxlabAddedVertexLoopPromotion='0.36.18.158';
globalThis.__boxlabAddedVertexLoopPromotion={version:'0.36.18.158',promotionCandidate};
