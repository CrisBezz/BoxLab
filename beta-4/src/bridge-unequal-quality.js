// BoxLab v0.36.18.245 — perimeter-aware unequal-loop Bridge planning.
// Refines the v244 zipper distribution without changing equal-count Bridge.

const VERSION='0.36.18.245';
const EPS=1e-10;

function directedEdge(face,a,b){
  if(!face)return 0;
  for(let i=0;i<face.length;i++){
    const x=face[i],y=face[(i+1)%face.length];
    if(x===a&&y===b)return 1;
    if(x===b&&y===a)return -1;
  }
  return 0;
}

function perimeterEvents(mesh,loop){
  const lengths=[],cumulative=[0];let total=0;
  for(let i=0;i<loop.length;i++){
    const a=mesh.vertices[loop[i]],b=mesh.vertices[loop[(i+1)%loop.length]];
    const length=a&&b?a.distanceTo(b):0;
    if(!Number.isFinite(length)||length<=EPS)return null;
    lengths.push(length);total+=length;cumulative.push(total);
  }
  if(total<=EPS)return null;
  return cumulative.map(v=>v/total);
}

function perimeterZipper(mesh,loopA,loopB){
  const aEvents=perimeterEvents(mesh,loopA),bEvents=perimeterEvents(mesh,loopB);
  if(!aEvents||!bEvents)return null;
  const m=loopA.length,n=loopB.length,faces=[];
  let a=0,b=0;
  while(a<m||b<n){
    const ac=loopA[a%m],bc=loopB[b%n];
    const nextA=a<m?aEvents[a+1]:Infinity,nextB=b<n?bEvents[b+1]:Infinity;
    if(Math.abs(nextA-nextB)<1e-8){
      const an=loopA[(a+1)%m],bn=loopB[(b+1)%n];
      faces.push([ac,an,bn,bc]);a++;b++;
    }else if(nextA<nextB){
      const an=loopA[(a+1)%m];faces.push([ac,an,bc]);a++;
    }else{
      const bn=loopB[(b+1)%n];faces.push([ac,bn,bc]);b++;
    }
  }
  return faces;
}

function faceShapePenalty(mesh,face){
  let min=Infinity,max=0;
  for(let i=0;i<face.length;i++){
    const a=mesh.vertices[face[i]],b=mesh.vertices[face[(i+1)%face.length]];
    if(!a||!b)return Infinity;
    const l=a.distanceTo(b);if(!Number.isFinite(l)||l<=EPS)return Infinity;
    min=Math.min(min,l);max=Math.max(max,l);
  }
  return max/Math.max(min,EPS)-1;
}

function scorePlan(mesh,faces,aSet,bSet){
  let connector=0,windingPenalty=0,shapePenalty=0;
  for(const face of faces){
    if(face.length<3||new Set(face).size!==face.length)return Infinity;
    shapePenalty+=faceShapePenalty(mesh,face);
    for(let i=0;i<face.length;i++){
      const a=face[i],b=face[(i+1)%face.length];
      for(const existing of mesh.faces)if(directedEdge(existing,a,b)===1)windingPenalty++;
      if((aSet.has(a)&&bSet.has(b))||(bSet.has(a)&&aSet.has(b)))connector+=mesh.vertices[a].distanceToSquared(mesh.vertices[b]);
    }
  }
  return connector+shapePenalty*0.05+windingPenalty*1e9;
}

export function installUnequalBridgeQuality(EditableMesh){
  const proto=EditableMesh?.prototype;
  if(!proto||proto.__unequalBridgeQuality245Installed)return;
  if(typeof proto.bestUnequalBridgePlan!=='function')return;
  const fallback=proto.bestUnequalBridgePlan;

  proto.bestUnequalBridgePlan=function(loopA,loopB){
    if(!Array.isArray(loopA)||!Array.isArray(loopB)||loopA.length<3||loopB.length<3||loopA.length===loopB.length)return fallback.call(this,loopA,loopB);
    const aSet=new Set(loopA),bSet=new Set(loopB);let best=null;
    for(const direction of [1,-1])for(let offset=0;offset<loopB.length;offset++){
      const mapped=Array.from({length:loopB.length},(_,i)=>loopB[(offset+direction*i+loopB.length*4)%loopB.length]);
      const base=perimeterZipper(this,loopA,mapped);if(!base)continue;
      for(const flip of [false,true]){
        const faces=flip?base.map(face=>[...face].reverse()):base.map(face=>[...face]);
        const score=scorePlan(this,faces,aSet,bSet);
        if(Number.isFinite(score)&&(!best||score<best.score))best={score,faces,direction,offset,flip,unequal:true,perimeterAware:true};
      }
    }
    return best||fallback.call(this,loopA,loopB);
  };

  proto.__unequalBridgeQuality245Installed=true;
  globalThis.__boxlabUnequalBridgeQuality={version:VERSION};
}
