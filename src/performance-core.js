// Bounded, opt-in CPU timings. Renderer counters are resource counts, not RAM bytes.
export function createPerformanceMonitor(now=()=>performance.now()){
 let enabled=false,lastFrame=null,frames=[],rebuilds=[],latest=null,rebuildCount=0,stages={},cacheHits=0,cacheMisses=0,cacheOwners={active:{hits:0,misses:0},inactive:{hits:0,misses:0}},navSession=null,navGestures={},navFirst={},navUpdates={},navFirstRender={},navRenderUpdates={},navPendingRenders=[],navInputs=0,navProbe=null;
 const navKinds=['orbit','pan','zoom','pan+zoom'];
 const retain=(list,value)=>{list.push(value);if(list.length>120)list.shift();};
 const valid=value=>Number.isFinite(value)&&value>=0;
 const freshSession=()=>({firstInputAt:null,lastInputAt:null,firstKind:null,lastKind:null,counts:{},firstRecorded:false});
 const mean=list=>list.length?list.reduce((a,b)=>a+b,0)/list.length:0;
 function stats(list=[]){const sorted=list.slice().sort((a,b)=>a-b);return{samples:list.length,meanMs:mean(list),maxMs:sorted.at(-1)||0,p95Ms:sorted.length?sorted[Math.ceil(sorted.length*.95)-1]:0};}
 function reset(){lastFrame=null;frames=[];rebuilds=[];latest=null;rebuildCount=0;stages={};cacheHits=cacheMisses=0;cacheOwners={active:{hits:0,misses:0},inactive:{hits:0,misses:0}};navSession=null;navGestures={};navFirst={};navUpdates={};navFirstRender={};navRenderUpdates={};navPendingRenders=[];navInputs=0;}
 function navigationStart(){if(!enabled||navSession)return;navSession=freshSession();}
 function navigationInput(kind){if(!enabled||!navKinds.includes(kind))return;if(!navSession)navSession=freshSession();const at=now();navInputs++;navSession.counts[kind]=(navSession.counts[kind]||0)+1;if(navSession.firstInputAt===null){navSession.firstInputAt=at;navSession.firstKind=kind;}navSession.lastInputAt=at;navSession.lastKind=kind;}
 function finishNavigation(){if(!navSession)return;if(navSession.firstRecorded){const kind=Object.entries(navSession.counts).sort((a,b)=>b[1]-a[1])[0]?.[0]||navSession.firstKind;navGestures[kind]=(navGestures[kind]||0)+1;}navSession=null;}
 function navigationChange(){if(!enabled||!navSession||navSession.lastInputAt===null)return;const at=now(),s=navSession;let first=null;if(!s.firstRecorded&&s.firstInputAt!==null){retain(navFirst[s.firstKind]||=([]),Math.max(0,at-s.firstInputAt));s.firstRecorded=true;first={at:s.firstInputAt,kind:s.firstKind};}retain(navUpdates[s.lastKind]||=([]),Math.max(0,at-s.lastInputAt));navPendingRenders.push({at:s.lastInputAt,kind:s.lastKind,first});if(navPendingRenders.length>120)navPendingRenders.shift();s.lastInputAt=null;}
 function navigationEnd(){if(!enabled||!navSession)return;if(!navSession.firstRecorded){navSession=null;return;}finishNavigation();}
 function navigationRendered(at=now()){if(!enabled||!navPendingRenders.length)return;const pending=navPendingRenders;navPendingRenders=[];for(const sample of pending){if(sample.first)retain(navFirstRender[sample.first.kind]||=([]),Math.max(0,at-sample.first.at));retain(navRenderUpdates[sample.kind]||=([]),Math.max(0,at-sample.at));}}
 function observeNavigation(controls,element,view=element?.ownerDocument?.defaultView){
  if(!controls?.addEventListener||!element||!view?.addEventListener)return()=>{};
  if(navProbe?.controls===controls&&navProbe.element===element)return navProbe.cleanup;
  navProbe?.cleanup?.();const contacts=new Map();
  const inside=e=>e.target===element||element.contains?.(e.target);
  const change=()=>navigationChange();
  const down=e=>{if(!enabled||!inside(e))return;if(contacts.size===0)navigationStart();contacts.set(e.pointerId,{x:e.clientX,y:e.clientY,type:e.pointerType,buttons:e.buttons});};
  const move=e=>{
   if(!enabled||controls.enabled===false||!inside(e))return;const current=contacts.get(e.pointerId);if(!current)return;
   let kind='orbit';
   if(current.type==='touch'){
    const pair=[...contacts.entries()].filter(([,p])=>p.type==='touch').slice(0,2);
    if(pair.length>=2){const old=pair.map(([,p])=>({x:p.x,y:p.y})),next=pair.map(([id,p])=>id===e.pointerId?{x:e.clientX,y:e.clientY}:{x:p.x,y:p.y});const oldMid={x:(old[0].x+old[1].x)/2,y:(old[0].y+old[1].y)/2},nextMid={x:(next[0].x+next[1].x)/2,y:(next[0].y+next[1].y)/2},midDelta=Math.hypot(nextMid.x-oldMid.x,nextMid.y-oldMid.y),oldSpan=Math.hypot(old[0].x-old[1].x,old[0].y-old[1].y),nextSpan=Math.hypot(next[0].x-next[1].x,next[0].y-next[1].y),spanDelta=Math.abs(nextSpan-oldSpan),pan=midDelta>1&&midDelta>spanDelta*.5,zoom=spanDelta>1;kind=pan&&zoom?'pan+zoom':zoom?'zoom':'pan';}
   }else if(current.type==='mouse'){kind=e.buttons&2?'pan':e.buttons&4?'zoom':'orbit';}
   navigationInput(kind);current.x=e.clientX;current.y=e.clientY;current.buttons=e.buttons;
  };
  const up=e=>{if(!contacts.delete(e.pointerId))return;if(contacts.size===0)navigationEnd();};
  const wheel=e=>{if(!enabled||controls.enabled===false||!inside(e))return;navigationInput('zoom');Promise.resolve().then(()=>{if(enabled&&navSession)navigationEnd();});};
  controls.addEventListener('change',change);
  view.addEventListener('pointerdown',down,{capture:true,passive:true});view.addEventListener('pointermove',move,{capture:true,passive:true});view.addEventListener('pointerup',up,{capture:true,passive:true});view.addEventListener('pointercancel',up,{capture:true,passive:true});view.addEventListener('wheel',wheel,{capture:true,passive:true});
  const cleanup=()=>{controls.removeEventListener?.('change',change);view.removeEventListener('pointerdown',down,true);view.removeEventListener('pointermove',move,true);view.removeEventListener('pointerup',up,true);view.removeEventListener('pointercancel',up,true);view.removeEventListener('wheel',wheel,true);contacts.clear();navSession=null;if(navProbe?.cleanup===cleanup)navProbe=null;};
  navProbe={controls,element,cleanup};return cleanup;
 }
 function navigationSnapshot(){const byKind={};for(const kind of navKinds)byKind[kind]={gestures:navGestures[kind]||0,firstResponse:stats(navFirst[kind]),inputToCameraChange:stats(navUpdates[kind]),firstInputToRenderSubmit:stats(navFirstRender[kind]),inputToRenderSubmit:stats(navRenderUpdates[kind])};const allFirst=navKinds.flatMap(kind=>navFirst[kind]||[]),allUpdates=navKinds.flatMap(kind=>navUpdates[kind]||[]),allFirstRender=navKinds.flatMap(kind=>navFirstRender[kind]||[]),allRenderUpdates=navKinds.flatMap(kind=>navRenderUpdates[kind]||[]);return{inputs:navInputs,gestures:Object.fromEntries(navKinds.map(kind=>[kind,navGestures[kind]||0])),firstResponse:stats(allFirst),inputToCameraChange:stats(allUpdates),firstInputToRenderSubmit:stats(allFirstRender),inputToRenderSubmit:stats(allRenderUpdates),byKind};}
 return {
  get enabled(){return enabled;},setEnabled(value){enabled=!!value;reset();return enabled;},reset,
  navigationStart,navigationInput,navigationChange,navigationEnd,navigationRendered,observeNavigation,
  start(){return enabled?now():null;},
  rebuild(start){if(!enabled||start===null)return;const duration=now()-start;if(valid(duration)){retain(rebuilds,duration);rebuildCount++;}},
  stage(name,start){if(!enabled||start==null||!['display','geometry','scene','inactive','cage','scene-sync','object-sync','render-mode','uv-preview','paint-preview','texture-decode','texture-display'].includes(name))return;const duration=now()-start;if(valid(duration))retain(stages[name] ||= [],duration);},
  cache(hit,owner='active'){if(enabled){if(hit)cacheHits++;else cacheMisses++;cacheOwners[owner==='inactive'?'inactive':'active'][hit?'hits':'misses']++;}},
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
   const sorted=frames.slice().sort((a,b)=>a-b),interval=mean(frames);
   return {enabled,...latest,cacheHits,cacheMisses,cacheOwners:{active:{...cacheOwners.active},inactive:{...cacheOwners.inactive}},stages:Object.fromEntries(Object.entries(stages).map(([name,list])=>[name,{samples:list.length,meanMs:mean(list),maxMs:Math.max(...list)}])),navigation:navigationSnapshot(),samples:frames.length,fps:interval?1000/interval:0,frameMs:interval,p95Ms:sorted.length?sorted[Math.ceil(sorted.length*.95)-1]:0,
    rebuilds:rebuildCount,rebuildSamples:rebuilds.length,rebuildMeanMs:mean(rebuilds),rebuildMaxMs:rebuilds.length?Math.max(...rebuilds):0};
  }
 };
}
