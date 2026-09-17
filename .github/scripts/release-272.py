from pathlib import Path
import re

# Restore the exact confirmed-good .270 selection presentation after the accidental .271 layout pass.
import subprocess
for path in ['styles.css','tests/selection-button-layout.test.mjs']:
    data=subprocess.check_output(['git','show','c6593d4f0f32e41cc03a2d8d4a16bfb0bb654e90:'+path],text=True)
    Path(path).write_text(data)

bridge=Path('src/bridge-all-quad.js')
bridge.write_text(r'''// BoxLab v0.36.18.272 — balanced SubD-friendly unequal Bridge densification.
// Densifies the smaller closed boundary loop, spreading comparable splits around the loop,
// then reuses the proven equal-count Bridge solver.

const VERSION='0.36.18.272';
const MAX_ADDED=4;
const MAX_RATIO=2;
const NEAR_LONGEST=0.95;

function edgeKey(mesh,a,b){return mesh.edgeKey?mesh.edgeKey(a,b):(a<b?`${a}:${b}`:`${b}:${a}`);}
function snapshot(mesh,topology){return topology?.cloneMeshState?.(mesh)||null;}
function restore(mesh,topology,state){if(state&&topology?.restoreMeshState)topology.restoreMeshState(mesh,state);}

function faceEdgeSlot(face,a,b){
  for(let i=0;i<face.length;i++){
    const x=face[i],y=face[(i+1)%face.length];
    if((x===a&&y===b)||(x===b&&y===a))return i;
  }
  return-1;
}

export function splitBoundaryEdge(mesh,loop,edgeIndex){
  if(!mesh||!Array.isArray(loop)||loop.length<3)return null;
  const n=loop.length,i=((edgeIndex%n)+n)%n,a=loop[i],b=loop[(i+1)%n],va=mesh.vertices[a],vb=mesh.vertices[b];
  if(!va||!vb)return null;
  const key=edgeKey(mesh,a,b),owners=[];
  for(let fi=0;fi<mesh.faces.length;fi++){
    const face=mesh.faces[fi];if(!Array.isArray(face))continue;
    const slot=faceEdgeSlot(face,a,b);if(slot>=0)owners.push({fi,slot});
  }
  if(owners.length>1)return null; // boundary/loose edge only
  const vertex=mesh.vertices.length;
  mesh.vertices.push(va.clone().lerp(vb,.5));
  for(const {fi,slot} of owners)mesh.faces[fi].splice(slot+1,0,vertex);
  if(mesh.creases instanceof Map&&mesh.creases.has(key)){
    const strength=mesh.creases.get(key);mesh.creases.delete(key);
    mesh.creases.set(edgeKey(mesh,a,vertex),strength);mesh.creases.set(edgeKey(mesh,vertex,b),strength);
  }
  if(mesh.looseEdges instanceof Set&&mesh.looseEdges.has(key)){
    mesh.looseEdges.delete(key);mesh.looseEdges.add(edgeKey(mesh,a,vertex));mesh.looseEdges.add(edgeKey(mesh,vertex,b));
  }
  if(mesh.looseVertices instanceof Set)mesh.looseVertices.delete(vertex);
  loop.splice(i+1,0,vertex);
  return vertex;
}

function edgeMetrics(mesh,loop){
  return loop.map((id,i)=>{
    const a=mesh.vertices[id],b=mesh.vertices[loop[(i+1)%loop.length]];
    if(!a||!b)return{index:i,length2:-1,mid:null};
    return{index:i,length2:a.distanceToSquared(b),mid:a.clone().lerp(b,.5)};
  });
}

export function balancedSplitEdgeIndex(mesh,loop,splitPoints=[]){
  const metrics=edgeMetrics(mesh,loop).filter(e=>e.length2>=0&&e.mid);
  if(!metrics.length)return-1;
  const max=Math.max(...metrics.map(e=>e.length2));
  // Length remains authoritative. Only edges within 5% of the longest compete on spread.
  const threshold=max*NEAR_LONGEST*NEAR_LONGEST;
  const candidates=metrics.filter(e=>e.length2+1e-15>=threshold);
  if(!splitPoints.length)return candidates.sort((a,b)=>b.length2-a.length2||a.index-b.index)[0].index;
  let best=null;
  for(const e of candidates){
    let spread=Infinity;
    for(const p of splitPoints)spread=Math.min(spread,e.mid.distanceToSquared(p));
    if(!best||spread>best.spread+1e-12||
      (Math.abs(spread-best.spread)<=1e-12&&(e.length2>best.length2+1e-12||
      (Math.abs(e.length2-best.length2)<=1e-12&&e.index<best.index)))){
      best={...e,spread};
    }
  }
  return best?.index??-1;
}

export function densifyLoopToCount(mesh,loop,target){
  if(!Array.isArray(loop)||loop.length<3||target<loop.length)return null;
  const out=[...loop],splitPoints=[];
  while(out.length<target){
    const edge=balancedSplitEdgeIndex(mesh,out,splitPoints);
    if(edge<0)return null;
    const vertex=splitBoundaryEdge(mesh,out,edge);
    if(vertex===null)return null;
    splitPoints.push(mesh.vertices[vertex].clone());
  }
  return out;
}

export function canTryAllQuad(loopA,loopB){
  if(!Array.isArray(loopA)||!Array.isArray(loopB)||loopA.length<3||loopB.length<3||loopA.length===loopB.length)return false;
  const small=Math.min(loopA.length,loopB.length),large=Math.max(loopA.length,loopB.length),added=large-small;
  return added<=MAX_ADDED&&large/small<=MAX_RATIO;
}

export function installSubdFriendlyBridge(EditableMesh){
  const proto=EditableMesh?.prototype;if(!proto||proto.__subdFriendlyBridge272Installed)return;
  const baseBridgeLoops=proto.bridgeLoops,topology=globalThis.__boxlabTopology;
  if(typeof baseBridgeLoops!=='function'||!topology?.cloneMeshState||!topology?.restoreMeshState)return;

  proto.bridgeLoops=function(loopA,loopB){
    if(!canTryAllQuad(loopA,loopB))return baseBridgeLoops.call(this,loopA,loopB);
    const before=snapshot(this,topology),a=[...loopA],b=[...loopB],target=Math.max(a.length,b.length),shortA=a.length<b.length;
    const denseA=shortA?densifyLoopToCount(this,a,target):a,denseB=shortA?b:densifyLoopToCount(this,b,target);
    if(!denseA||!denseB){restore(this,topology,before);return baseBridgeLoops.call(this,loopA,loopB);}
    let result=null;
    try{result=baseBridgeLoops.call(this,denseA,denseB);}catch{}
    const allQuad=!!result&&Array.isArray(result.faceIndices)&&result.faceIndices.length===target&&result.faceIndices.every(fi=>this.faces[fi]?.length===4);
    if(!allQuad){restore(this,topology,before);return baseBridgeLoops.call(this,loopA,loopB);}
    result={...result,unequal:true,allQuad:true,subdFriendly:true,balancedDensification:true,addedVertices:target-Math.min(loopA.length,loopB.length),denseCounts:[denseA.length,denseB.length]};
    globalThis.__boxlabSubdFriendlyBridge={version:VERSION,ok:true,balancedDensification:true,addedVertices:result.addedVertices,denseCounts:result.denseCounts};
    return result;
  };

  proto.__subdFriendlyBridge272Installed=true;
  globalThis.__boxlabSubdFriendlyBridge={version:VERSION,ok:null,balancedDensification:true,addedVertices:0,denseCounts:[]};
}
''')

bootstrap=Path('src/loose-bootstrap.js')
b=bootstrap.read_text().replace("./bridge-all-quad.js?v=0.36.18.268","./bridge-all-quad.js?v=0.36.18.272")
bootstrap.write_text(b)

# Extend the existing all-quad regression suite with deterministic balanced placement checks.
test=Path('tests/bridge-all-quad.test.mjs')
t=test.read_text()
t=t.replace("canTryAllQuad, densifyLoopToCount, splitBoundaryEdge, installSubdFriendlyBridge", "canTryAllQuad, densifyLoopToCount, splitBoundaryEdge, balancedSplitEdgeIndex, installSubdFriendlyBridge")
extra=r'''

test('272 spreads comparable splits around a regular loop',()=>{
  const mesh={vertices:square(),faces:[[0,1,2,3]],creases:new Map(),looseEdges:new Set(),looseVertices:new Set(),edgeKey:key};
  const dense=densifyLoopToCount(mesh,[0,1,2,3],6);
  assert.equal(dense.length,6);
  const added=mesh.vertices.slice(4);
  assert.equal(added.length,2);
  assert.ok(added[0].distanceTo(new THREE.Vector3(0,-1,0))<1e-9);
  assert.ok(added[1].distanceTo(new THREE.Vector3(0,1,0))<1e-9);
});

test('272 still gives a materially longer edge priority over spread',()=>{
  const verts=[new THREE.Vector3(0,0,0),new THREE.Vector3(4,0,0),new THREE.Vector3(4,1,0),new THREE.Vector3(0,1,0)];
  const mesh={vertices:verts,faces:[[0,1,2,3]],creases:new Map(),looseEdges:new Set(),looseVertices:new Set(),edgeKey:key};
  assert.equal(balancedSplitEdgeIndex(mesh,[0,1,2,3],[new THREE.Vector3(2,0,0)]),0);
});
'''
if "272 spreads comparable splits" not in t:t+=extra
test.write_text(t)

index=Path('index.html')
h=index.read_text()
h=re.sub(r'BoxLab v0\.36\.18\.\d+','BoxLab v0.36.18.272',h,count=1)
h=re.sub(r'(<span id="appVersion">v0\.36\.18\.)\d+(</span>)',r'\g<1>272\2',h,count=1)
h=re.sub(r'(src="\./src/loose-bootstrap\.js\?v=0\.36\.18\.)\d+(")',r'\g<1>272\2',h,count=1)
# Preserve the exact confirmed .270 Selection stylesheet/cache-hop.
h=re.sub(r'(href="\./styles\.css\?v=0\.36\.18\.)\d+(")',r'\g<1>270\2',h,count=1)
index.write_text(h)
Path('version.json').write_text('{"version":"0.36.18.272"}\n')
