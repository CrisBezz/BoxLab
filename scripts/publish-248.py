from pathlib import Path
import re

p=Path('src/boolean-bsp.js')
s=p.read_text()
s=s.replace('// BoxLab v0.36.18.247 — sequential Boolean BSP with degenerate-face input fallback.','// BoxLab v0.36.18.248 — sequential Boolean BSP with conservative planar seam repair.')
s=s.replace("const VERSION='0.36.18.247';","const VERSION='0.36.18.248';",1)
marker="function booleanBSP(meshA,meshB,operation='union'){"
if marker not in s: raise SystemExit('booleanBSP marker missing')
helpers="""function boundaryLoops(mesh){
  const uses=new Map();
  for(let fi=0;fi<(mesh?.faces?.length||0);fi++){
    const face=mesh.faces[fi];if(!Array.isArray(face)||face.length<3)continue;
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],key=a<b?`${a}:${b}`:`${b}:${a}`;
      if(!uses.has(key))uses.set(key,[]);uses.get(key).push({a,b,fi});
    }
  }
  const boundary=[];for(const [key,owners] of uses)if(owners.length===1)boundary.push({key,...owners[0]});
  if(!boundary.length)return[];
  const adj=new Map();
  for(const e of boundary){if(!adj.has(e.a))adj.set(e.a,[]);if(!adj.has(e.b))adj.set(e.b,[]);adj.get(e.a).push(e.b);adj.get(e.b).push(e.a);}
  if([...adj.values()].some(n=>n.length!==2))return[];
  const unused=new Set(boundary.map(e=>e.key)),loops=[];
  while(unused.size){
    const seed=boundary.find(e=>unused.has(e.key));if(!seed)return[];
    const loop=[seed.a];let prev=null,current=seed.a;
    for(let guard=0;guard<=boundary.length+1;guard++){
      const keyFor=v=>current<v?`${current}:${v}`:`${v}:${current}`;
      const next=(adj.get(current)||[]).find(v=>v!==prev&&unused.has(keyFor(v)))??(adj.get(current)||[]).find(v=>unused.has(keyFor(v)));
      if(next===undefined)return[];
      unused.delete(keyFor(next));
      if(next===loop[0])break;if(loop.includes(next))return[];
      loop.push(next);prev=current;current=next;
    }
    if(loop.length<3)return[];loops.push(loop);
  }
  return loops;
}
function tryPlanarBoundaryRepair(mesh,eps){
  const loops=boundaryLoops(mesh);if(loops.length!==1)return{ok:false,reason:'repair-needs-one-boundary-loop',loops:loops.length};
  let loop=[...loops[0]];if(loop.length<3||loop.length>32)return{ok:false,reason:'repair-loop-size',size:loop.length};
  const points=loop.map(i=>mesh.vertices?.[i]);if(points.some(p=>!p))return{ok:false,reason:'repair-invalid-loop'};
  const n=faceNormal(points);if(n.lengthSq()<=eps*eps)return{ok:false,reason:'repair-degenerate-loop'};
  const normal=n.clone().normalize(),origin=points[0],tol=Math.max(eps*128,1e-7);
  if(points.some(p=>Math.abs(normal.dot(p.clone().sub(origin)))>tol))return{ok:false,reason:'repair-nonplanar-loop'};
  const firstA=loop[0],firstB=loop[1],firstKey=firstA<firstB?`${firstA}:${firstB}`:`${firstB}:${firstA}`;
  let owner=null;
  for(let fi=0;fi<mesh.faces.length&&!owner;fi++){
    const face=mesh.faces[fi];for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length],key=a<b?`${a}:${b}`:`${b}:${a}`;
      if(key===firstKey){owner={a,b};break;}
    }
  }
  if(owner&&owner.a===firstA&&owner.b===firstB)loop.reverse();
  const candidate=mesh.clone();candidate.faces.push(loop);candidate.edges?.();
  const after=topologyInfo(candidate);
  if(!after.closed)return{ok:false,reason:'repair-not-closed',after};
  return{ok:true,mesh:candidate,after,loopSize:loop.length};
}
"""
s=s.replace(marker,helpers+marker,1)
old="  const mesh=assemble(polygons,eps),topology=topologyInfo(mesh),gate=globalThis.__boxlabTopologyGate?.validate?.(mesh)||null;\n  if(!topology.closed||gate&&!gate.booleanReady)return{ok:false,reason:`Boolean result failed topology validation${gate?` • ${gate.boundaryEdges} boundary / ${gate.nonManifoldEdges} non-manifold edges`:''}`,mesh,topology,gate};\n  return{ok:true,mesh,topology,gate,polygonCount:polygons.length,eps};"
new="  let mesh=assemble(polygons,eps),topology=topologyInfo(mesh),gate=globalThis.__boxlabTopologyGate?.validate?.(mesh)||null,repaired=null;\n  if(!topology.closed&&topology.boundaryEdges>0&&topology.nonManifoldEdges===0){\n    repaired=tryPlanarBoundaryRepair(mesh,eps);\n    if(repaired.ok){mesh=repaired.mesh;topology=topologyInfo(mesh);gate=globalThis.__boxlabTopologyGate?.validate?.(repaired.mesh)||null;}\n  }\n  if(!topology.closed||gate&&!gate.booleanReady)return{ok:false,reason:`Boolean result failed topology validation${gate?` • ${gate.boundaryEdges} boundary / ${gate.nonManifoldEdges} non-manifold edges`:''}`,mesh,topology,gate,repaired};\n  return{ok:true,mesh,topology,gate,polygonCount:polygons.length,eps,repaired:repaired?.ok?{loopSize:repaired.loopSize}:null};"
if old not in s: raise SystemExit('validation block marker missing')
s=s.replace(old,new,1)
p.write_text(s)

p=Path('src/boolean-prototype.js')
s=p.read_text()
s,n=re.subn(r'boolean-bsp\.js\?v=0\.36\.18\.247','boolean-bsp.js?v=0.36.18.248',s,count=1)
if n!=1: raise SystemExit('boolean-bsp import marker missing')
p.write_text(s)

p=Path('index.html')
s=p.read_text()
s,n1=re.subn(r'<title>BoxLab v[^<]+</title>','<title>BoxLab v0.36.18.248</title>',s,count=1)
s,n2=re.subn(r'<span id="appVersion">v[^<]+</span>','<span id="appVersion">v0.36.18.248</span>',s,count=1)
s,n3=re.subn(r'\./src/boolean-prototype\.js\?v=[^"<]+','./src/boolean-prototype.js?v=0.36.18.248',s,count=1)
if not all((n1,n2,n3)): raise SystemExit(f'index markers missing {n1} {n2} {n3}')
p.write_text(s)
Path('version.json').write_text('{"version":"0.36.18.248"}\n')
