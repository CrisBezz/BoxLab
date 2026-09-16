// BoxLab v0.36.18.246 — twist-aware unequal-loop Bridge correspondence.
// Chooses rotational offset/direction using perimeter spacing plus radial alignment.

const VERSION='0.36.18.246';
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

function loopCenter(mesh,loop){
  const c={x:0,y:0,z:0};
  for(const vi of loop){const v=mesh.vertices[vi];if(!v)return null;c.x+=v.x;c.y+=v.y;c.z+=v.z;}
  const s=1/loop.length;c.x*=s;c.y*=s;c.z*=s;return c;
}

function axisBetween(a,b){
  const x=b.x-a.x,y=b.y-a.y,z=b.z-a.z,l=Math.hypot(x,y,z);
  return l>EPS?{x:x/l,y:y/l,z:z/l}:null;
}

function projectedRadial(v,c,axis){
  let x=v.x-c.x,y=v.y-c.y,z=v.z-c.z;
  const d=x*axis.x+y*axis.y+z*axis.z;
  x-=d*axis.x;y-=d*axis.y;z-=d*axis.z;
  const l=Math.hypot(x,y,z);
  return l>EPS?{x:x/l,y:y/l,z:z/l}:null;
}

function perimeterEvents(mesh,loop){
  const cumulative=[0];let total=0;
  for(let i=0;i<loop.length;i++){
    const a=mesh.vertices[loop[i]],b=mesh.vertices[loop[(i+1)%loop.length]];
    const length=a&&b?a.distanceTo(b):0;
    if(!Number.isFinite(length)||length<=EPS)return null;
    total+=length;cumulative.push(total);
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
      const an=loopA[(a+1)%m],bn=loopB[(b+1)%n];faces.push([ac,an,bn,bc]);a++;b++;
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

function radialAlignmentPenalty(mesh,loopA,loopB,mapped){
  const centerA=loopCenter(mesh,loopA),centerB=loopCenter(mesh,mapped);
  if(!centerA||!centerB)return Infinity;
  const axis=axisBetween(centerA,centerB);if(!axis)return 0;
  const samples=Math.max(loopA.length,mapped.length),eventsA=perimeterEvents(mesh,loopA),eventsB=perimeterEvents(mesh,mapped);
  if(!eventsA||!eventsB)return Infinity;
  let penalty=0,count=0;
  const indexAt=(events,t)=>{
    for(let i=0;i<events.length-1;i++)if(t>=events[i]-EPS&&t<events[i+1]-EPS)return i;
    return events.length-2;
  };
  for(let s=0;s<samples;s++){
    const t=s/samples,ia=indexAt(eventsA,t),ib=indexAt(eventsB,t);
    const ra=projectedRadial(mesh.vertices[loopA[ia]],centerA,axis),rb=projectedRadial(mesh.vertices[mapped[ib]],centerB,axis);
    if(!ra||!rb)continue;
    const dot=Math.max(-1,Math.min(1,ra.x*rb.x+ra.y*rb.y+ra.z*rb.z));
    penalty+=1-dot;count++;
  }
  return count?penalty/count:0;
}

function scorePlan(mesh,loopA,mapped,faces,aSet,bSet){
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
  const alignment=radialAlignmentPenalty(mesh,loopA,mapped);
  if(!Number.isFinite(alignment))return Infinity;
  const scale=Math.max(connector/Math.max(1,faces.length),1e-6);
  return connector+shapePenalty*0.05+alignment*scale*0.35+windingPenalty*1e9;
}

export function installUnequalBridgeAlignment(EditableMesh){
  const proto=EditableMesh?.prototype;
  if(!proto||proto.__unequalBridgeAlignment246Installed)return;
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
        const score=scorePlan(this,loopA,mapped,faces,aSet,bSet);
        if(Number.isFinite(score)&&(!best||score<best.score))best={score,faces,direction,offset,flip,unequal:true,perimeterAware:true,twistAware:true};
      }
    }
    return best||fallback.call(this,loopA,loopB);
  };

  proto.__unequalBridgeAlignment246Installed=true;
  globalThis.__boxlabUnequalBridgeAlignment={version:VERSION};
}
