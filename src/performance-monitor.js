import {createPerformanceMonitor} from './performance-core.js?v=0.36.18.848';
const monitor=createPerformanceMonitor();
let panel=null,output=null,timer=null,button=null;
const number=(value,digits=0)=>Number(value||0).toFixed(digits);
const phase=(s,key)=>s.stages?.[key]?`${number(s.stages[key].meanMs,1)}/${number(s.stages[key].maxMs,1)}`:'—';
function refresh(){
 if(!output)return;const s=monitor.snapshot();
 output.textContent=s.samples?[
  `${number(s.fps)} FPS · frame ${number(s.frameMs,1)} ms · p95 ${number(s.p95Ms,1)} ms`,
  `Markers ${number(s.markers,1)} ms · render submit ${number(s.render,1)} ms`,
  `Draw calls ${s.calls} · triangles ${s.triangles}`,
  `Geometries ${s.geometries} · textures ${s.textures}`,
  `Active mesh ${s.vertices} verts · ${s.faces} faces`,
  `Rebuilds ${s.rebuilds} · mean ${number(s.rebuildMeanMs,1)} ms · max ${number(s.rebuildMaxMs,1)} ms`,
  `Phase mean/max ms:`,
  `Base/SubD ${phase(s,'display')} · Body ${phase(s,'geometry')}`,
  `Scene hooks ${phase(s,'scene')} · Inactive ${phase(s,'inactive')}`,
  `Cage/highlights ${phase(s,'cage')}`,
  `SubD cache ${s.cacheHits} hits · ${s.cacheMisses} misses`,
  `Active cache ${s.cacheOwners.active.hits} hits · ${s.cacheOwners.active.misses} misses`,
  `Inactive cache ${s.cacheOwners.inactive.hits} hits · ${s.cacheOwners.inactive.misses} misses`,
  `Active Undo ${s.undo} · Redo ${s.redo}`
 ].join('\n'):'Collecting frames…';
}
function setEnabled(value){
 monitor.setEnabled(value);clearInterval(timer);timer=null;
 button?.setAttribute('aria-pressed',String(monitor.enabled));button?.classList.toggle('active',monitor.enabled);
 if(!monitor.enabled){panel?.remove();panel=null;output=null;return false;}
 if(!panel){
  panel=document.createElement('section');panel.id='boxlabPerformance';panel.setAttribute('aria-label','Performance measurements');
  panel.style.cssText='position:absolute;right:8px;bottom:80px;z-index:110;width:min(370px,48vw);padding:9px;border:1px solid #ffffff40;border-radius:8px;background:#10141bf2;color:white;font:11px/1.5 ui-monospace,monospace;pointer-events:auto';
  const title=document.createElement('strong');title.textContent='PERFORMANCE';output=document.createElement('pre');output.style.cssText='white-space:pre-wrap;margin:5px 0';
  const note=document.createElement('small');note.textContent='CPU timings; render submit excludes GPU time. Resource counts are not RAM usage. Last 120 samples per phase; pauses excluded. Inactive is included in Scene hooks.';
  const actions=document.createElement('div');actions.style.cssText='display:flex;gap:6px;margin-top:6px';
  for(const [label,action] of [['Reset',()=>{monitor.reset();refresh();}],['Close',()=>setEnabled(false)]]){const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',action);actions.append(b);}
  panel.append(title,output,note,actions);document.querySelector('#viewportWrap')?.append(panel);
 }
 refresh();timer=setInterval(refresh,500);return true;
}
function install(){
 if(button)return;const grid=document.querySelector('#gestureDebugToggle')?.parentElement;if(!grid)return;
 button=document.createElement('button');button.type='button';button.id='performanceToggle';button.textContent='Performance';button.title='Show performance measurements';button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>setEnabled(!monitor.enabled));grid.append(button);
}
globalThis.__boxlabPerformance={get enabled(){return monitor.enabled;},start:monitor.start,rebuild:monitor.rebuild,stage:monitor.stage,cache:monitor.cache,frame:monitor.frame,snapshot:monitor.snapshot,setEnabled};
document.addEventListener('visibilitychange',()=>monitor.pause());
install();window.addEventListener('load',install,{once:true});
