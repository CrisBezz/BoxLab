import {createPerformanceMonitor} from './performance-core.js?v=0.36.18.1111';
const monitor=createPerformanceMonitor();
let panel=null,output=null,timer=null,heartbeatTimer=null,button=null;
const number=(value,digits=0)=>Number(value||0).toFixed(digits);
const phase=(s,key)=>s.stages?.[key]?`${number(s.stages[key].meanMs,1)}/${number(s.stages[key].maxMs,1)} ms · n=${s.stages[key].samples}`:'—';
const phaseNavigation=s=>s?.samples?`${number(s.meanMs,1)}/${number(s.maxMs,1)} ms · p95 ${number(s.p95Ms,1)} · n=${s.samples}`:'—';
const navigationKind=s=>s?.samples?`${number(s.meanMs,1)}/${number(s.p95Ms,1)} · n=${s.samples}`:'—';
function refresh(){
 if(!output)return;const refreshStart=monitor.start();try{const s=monitor.snapshot();
 output.textContent=s.samples?[
  `${number(s.fps)} FPS · frame ${number(s.frameMs,1)} ms · p95 ${number(s.p95Ms,1)} ms`,
  `Long frame gaps ≥${s.longFrameGaps.thresholdMs} ms: ${s.longFrameGaps.samples} · max ${number(s.longFrameGaps.maxMs,1)} ms`,
  `Timing trace ${s.timingTrace.length}/80 · stage spans, frame gaps and navigation submits ≥250 ms`,
  `Timer lateness mean/max ${number(s.heartbeat.meanMs,1)}/${number(s.heartbeat.maxMs,1)} ms`,
  `Callback mean/max ms: ${Object.entries(s.callbacks).map(([name,v])=>name+' '+number(v.meanMs,1)+'/'+number(v.maxMs,1)).join(' · ')}`,
  `Markers ${number(s.markers,1)} ms · render submit ${number(s.render,1)} ms`,
  `Draw calls ${s.calls} · triangles ${s.triangles}`,
  `Geometries ${s.geometries} · textures ${s.textures}`,
  `Active mesh ${s.vertices} verts · ${s.faces} faces`,
  `Rebuilds ${s.rebuilds} · mean ${number(s.rebuildMeanMs,1)} ms · max ${number(s.rebuildMaxMs,1)} ms`,
  `Phase mean/max ms:`,
  `Base/SubD ${phase(s,'display')} · Body ${phase(s,'geometry')}`,
  `Scene hooks ${phase(s,'scene')} · Inactive ${phase(s,'inactive')}`,
  `Scene detail, nested: Multi saveActive ${phase(s,'scene-sync')} · object reads ${phase(s,'object-sync')}`,
  `Render mode ${phase(s,'render-mode')} · UV preview ${phase(s,'uv-preview')} · Paint preview ${phase(s,'paint-preview')}`,
  `UV texture: decode ${phase(s,'texture-decode')} · until visible ${phase(s,'texture-display')}`,
  `Navigation gestures: orbit ${s.navigation.gestures.orbit} · pan ${s.navigation.gestures.pan} · zoom ${s.navigation.gestures.zoom} · pan+zoom ${s.navigation.gestures['pan+zoom']}`,
  `First input→camera change ${phaseNavigation(s.navigation.firstResponse)} · input→change ${phaseNavigation(s.navigation.inputToCameraChange)}`,
  `First input→render submit ${phaseNavigation(s.navigation.firstInputToRenderSubmit)} · latest input→submit ${phaseNavigation(s.navigation.inputToRenderSubmit)}`,
  `By gesture first/repeat mean/p95 ms: orbit ${navigationKind(s.navigation.byKind.orbit.firstResponse)}/${navigationKind(s.navigation.byKind.orbit.inputToCameraChange)} · pan ${navigationKind(s.navigation.byKind.pan.firstResponse)}/${navigationKind(s.navigation.byKind.pan.inputToCameraChange)} · zoom ${navigationKind(s.navigation.byKind.zoom.firstResponse)}/${navigationKind(s.navigation.byKind.zoom.inputToCameraChange)} · combined ${navigationKind(s.navigation.byKind['pan+zoom'].firstResponse)}/${navigationKind(s.navigation.byKind['pan+zoom'].inputToCameraChange)}`,
  `Render submit first/latest mean/p95 ms: orbit ${navigationKind(s.navigation.byKind.orbit.firstInputToRenderSubmit)}/${navigationKind(s.navigation.byKind.orbit.inputToRenderSubmit)} · pan ${navigationKind(s.navigation.byKind.pan.firstInputToRenderSubmit)}/${navigationKind(s.navigation.byKind.pan.inputToRenderSubmit)} · zoom ${navigationKind(s.navigation.byKind.zoom.firstInputToRenderSubmit)}/${navigationKind(s.navigation.byKind.zoom.inputToRenderSubmit)} · combined ${navigationKind(s.navigation.byKind['pan+zoom'].firstInputToRenderSubmit)}/${navigationKind(s.navigation.byKind['pan+zoom'].inputToRenderSubmit)}`,
  `Cage/highlights ${phase(s,'cage')}`,
  `SubD cache ${s.cacheHits} hits · ${s.cacheMisses} misses`,
  `Active cache ${s.cacheOwners.active.hits} hits · ${s.cacheOwners.active.misses} misses`,
  `Inactive cache ${s.cacheOwners.inactive.hits} hits · ${s.cacheOwners.inactive.misses} misses`,
  `Active Undo ${s.undo} · Redo ${s.redo}`
 ].join('\n'):'Collecting frames…';}finally{monitor.callback('monitor-refresh',refreshStart);}
}
function setEnabled(value){
 monitor.setEnabled(value);clearInterval(timer);timer=null;clearInterval(heartbeatTimer);heartbeatTimer=null;
 button?.setAttribute('aria-pressed',String(monitor.enabled));button?.classList.toggle('active',monitor.enabled);
 if(!monitor.enabled){panel?.remove();panel=null;output=null;return false;}
 if(!panel){
  panel=document.createElement('section');panel.id='boxlabPerformance';panel.setAttribute('aria-label','Performance measurements');
  panel.style.cssText='position:absolute;right:8px;bottom:80px;z-index:110;width:min(370px,48vw);padding:9px;border:1px solid #ffffff40;border-radius:8px;background:#10141bf2;color:white;font:11px/1.5 ui-monospace,monospace;pointer-events:auto';
  const title=document.createElement('strong');title.textContent='PERFORMANCE';output=document.createElement('pre');output.style.cssText='white-space:pre-wrap;margin:5px 0';
  const note=document.createElement('small');note.textContent='CPU timings; render-submit navigation latency ends after the existing renderer.render call. It excludes GPU execution and browser/compositor presentation. Camera-change timings stop earlier at the OrbitControls event. Resource counts are not RAM usage. FPS and frame percentiles omit intervals ≥1,000 ms; those gaps are counted separately above. The downloaded report includes the last 80 timed intervals for comparing texture stages, frame gaps and slow navigation submits. Times share the browser performance clock; overlapping intervals suggest timing coincidence, not proof of cause. Last 120 samples per phase. Inactive is included in Scene hooks. Nested scene and UV texture timings overlap and are not additive. Texture decode includes async wait; until visible ends when the UV surface is enabled.';
  const actions=document.createElement('div');actions.style.cssText='display:flex;gap:6px;margin-top:6px';
  for(const [label,action] of [['Reset',()=>{monitor.reset();refresh();}],['Close',()=>setEnabled(false)]]){const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',action);actions.append(b);}
  panel.append(title,output,note,actions);document.querySelector('#viewportWrap')?.append(panel);
  const currentPanel=panel;import('./performance-lab-ui.js?v=0.36.18.1151').then(m=>{if(panel===currentPanel&&panel.isConnected)m.installPerformanceLab(panel,monitor);}).catch(()=>{if(panel===currentPanel)note.textContent+=' Lab could not load; reopen to retry.';});
 }
 refresh();timer=setInterval(refresh,500);heartbeatTimer=setInterval(()=>{if(document.visibilityState==='hidden'){monitor.pause();return;}monitor.heartbeat();},100);return true;
}
function install(){
 if(button)return;const grid=document.querySelector('#gestureDebugToggle')?.parentElement;if(!grid)return;
 button=document.createElement('button');button.type='button';button.id='performanceToggle';button.textContent='Performance';button.title='Show performance measurements';button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>setEnabled(!monitor.enabled));grid.append(button);
}
globalThis.__boxlabPerformance={get enabled(){return monitor.enabled;},start:monitor.start,rebuild:monitor.rebuild,stage:monitor.stage,cache:monitor.cache,frame:monitor.frame,callback:monitor.callback,snapshot:monitor.snapshot,setEnabled,observeNavigation:monitor.observeNavigation,navigationRendered:monitor.navigationRendered};
document.addEventListener('visibilitychange',()=>monitor.pause());
install();window.addEventListener('load',install,{once:true});
