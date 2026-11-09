// Exact .1121 validation owner; test-only frozen baseline ca97b49e.
import * as THREE from 'three';
import '../../../src/topology-foundation.js';
const V=THREE.Vector3,topology=()=>globalThis.__boxlabTopology;
function areaVector(p) { const n=new V(),o=p[0]; for(let i=1;i<p.length-1;i++) n.add(new V().crossVectors(p[i].clone().sub(o),p[i+1].clone().sub(o))); return n.multiplyScalar(.5); }
function edgeUses(m){const uses=new Map();m.faces.forEach((f,fi)=>f.forEach((a,i)=>{const b=f[(i+1)%f.length],k=topology().edgeKey(a,b);if(!uses.has(k))uses.set(k,[]);uses.get(k).push({a,b,fi});}));return uses;}
export function validateThrough(m,eps=1e-7) {
  const base=topology().validateTopology(m,{allowBoundary:false});if(!base.ok)return {ok:false,reason:'invalid-edge-or-face-topology',details:base};
  for(const [k,owners] of edgeUses(m))if(owners.length!==2||owners[0].a!==owners[1].b)return{ok:false,reason:'inconsistent-edge-winding',edge:k};
  for(const f of m.faces){if(new Set(f).size!==f.length||f.some(id=>!m.vertices[id]||![m.vertices[id].x,m.vertices[id].y,m.vertices[id].z].every(Number.isFinite)))return{ok:false,reason:'invalid-face-vertices'};if(areaVector(f.map(id=>m.vertices[id])).length()<=eps*eps)return{ok:false,reason:'zero-area-face'};}
  // A closed edge manifold can still contain a bow-tie vertex. Its incident
  // face fan must be one connected cycle.
  const uses=edgeUses(m),incident=new Map();
  m.faces.forEach((f,fi)=>f.forEach(v=>{if(!incident.has(v))incident.set(v,new Set());incident.get(v).add(fi);}));
  for(const [v,faces] of incident){const adjacency=new Map([...faces].map(fi=>[fi,[]]));for(const owners of uses.values()){if(owners[0].a!==v&&owners[0].b!==v)continue;const [a,b]=owners;adjacency.get(a.fi).push(b.fi);adjacency.get(b.fi).push(a.fi);}const seen=new Set(),stack=[faces.values().next().value];while(stack.length){const fi=stack.pop();if(seen.has(fi))continue;seen.add(fi);stack.push(...adjacency.get(fi).filter(x=>!seen.has(x)));}if(seen.size!==faces.size)return{ok:false,reason:'nonmanifold-vertex-fan',vertex:v};}
  return {ok:true};
}
