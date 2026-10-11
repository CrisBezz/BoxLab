// Bounded, opt-in CPU timings. Renderer counters are resource counts, not RAM bytes.
export function createPerformanceMonitor(now=()=>performance.now()){
 let enabled=false,lastFrame=null,frames=[],rebuilds=[],latest=null,rebuildCount=0;
 const retain=(list,value)=>{list.push(value);if(list.length>120)list.shift();};
 const valid=value=>Number.isFinite(value)&&value>=0;
 function reset(){lastFrame=null;frames=[];rebuilds=[];latest=null;rebuildCount=0;}
 return {
  get enabled(){return enabled;},setEnabled(value){enabled=!!value;reset();return enabled;},reset,
  start(){return enabled?now():null;},
  rebuild(start){if(!enabled||start===null)return;const duration=now()-start;if(valid(duration)){retain(rebuilds,duration);rebuildCount++;}},
  frame(stamp,markers,render,info,mesh,history){
   if(!enabled)return;
   if(lastFrame!==null){const delta=stamp-lastFrame;if(valid(delta)&&delta>0&&delta<1000)retain(frames,delta);}
   lastFrame=stamp;
   latest={markers:valid(markers)?markers:0,render:valid(render)?render:0,calls:info?.render?.calls||0,triangles:info?.render?.triangles||0,
    geometries:info?.memory?.geometries||0,textures:info?.memory?.textures||0,vertices:mesh?.vertices?.length||0,faces:mesh?.faces?.length||0,
    undo:history?.undoStack?.length||0,redo:history?.redoStack?.length||0};
  },
  pause(){lastFrame=null;},
  snapshot(){
   const mean=list=>list.length?list.reduce((a,b)=>a+b,0)/list.length:0;
   const sorted=frames.slice().sort((a,b)=>a-b),interval=mean(frames);
   return {enabled,...latest,samples:frames.length,fps:interval?1000/interval:0,frameMs:interval,p95Ms:sorted.length?sorted[Math.ceil(sorted.length*.95)-1]:0,
    rebuilds:rebuildCount,rebuildSamples:rebuilds.length,rebuildMeanMs:mean(rebuilds),rebuildMaxMs:rebuilds.length?Math.max(...rebuilds):0};
  }
 };
}
