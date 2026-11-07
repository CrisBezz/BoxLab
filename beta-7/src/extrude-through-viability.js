import { EditableMesh } from './mesh.js';
import { EditableMesh as LiveEditableMesh } from './mesh.js?v=0.12';

function pointSegmentDistance(point,a,b){
  const ab=b.clone().sub(a),l2=ab.lengthSq();
  if(l2<1e-14)return point.distanceTo(a);
  const t=Math.max(0,Math.min(1,point.clone().sub(a).dot(ab)/l2));
  return point.distanceTo(a.clone().addScaledVector(ab,t));
}

function install(Ctor){
  const proto=Ctor?.prototype;
  if(!proto?.bridgeLoops||proto.__boxlabExtrudeThroughViability)return;
  proto.__boxlabExtrudeThroughViability=true;
  const base=proto.bridgeLoops;
  proto.bridgeLoops=function(loopA,loopB){
    if(Array.isArray(loopA)&&Array.isArray(loopB)&&loopA.length>=3&&loopB.length>=3){
      const shared=new Set(loopA.filter(v=>loopB.includes(v)));
      if(!shared.size){
        let scale=Infinity;
        for(const loop of[loopA,loopB])for(let i=0;i<loop.length;i++){
          const a=this.vertices[loop[i]],b=this.vertices[loop[(i+1)%loop.length]];
          if(a&&b)scale=Math.min(scale,a.distanceTo(b));
        }
        const tol=Math.max(1e-7,(Number.isFinite(scale)?scale:1)*1e-5);
        const touches=(points,edges)=>points.some(id=>{
          const p=this.vertices[id];if(!p)return false;
          for(let i=0;i<edges.length;i++){
            const a=this.vertices[edges[i]],b=this.vertices[edges[(i+1)%edges.length]];
            if(a&&b&&pointSegmentDistance(p,a,b)<=tol)return true;
          }
          return false;
        });
        // A projected Through opening that lands on an existing boundary makes
        // the target ring degenerate. Reject it until edge-intersection shell
        // rebuilding is implemented. Separate full-face loops live on different
        // planes and are unaffected by this guard.
        if(touches(loopA,loopB)||touches(loopB,loopA))return null;
      }
    }
    return base.call(this,loopA,loopB);
  };
}

install(EditableMesh);
install(LiveEditableMesh);
