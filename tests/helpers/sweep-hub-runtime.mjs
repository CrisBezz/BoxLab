import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const sourceText=fs.readFileSync(new URL('../../src/selection-hub-sweep-session.js',import.meta.url),'utf8');
export function sweepHubRuntime(){
 const handlers=new Map(),events=[],queue=[],controls={hidden:false},palette={hidden:true,querySelector:()=>({})};
 const c={launchedFromHub:false,launchMode:'face',palette,source:()=>controls,sync(){palette.hidden=!(c.launchedFromHub&&!controls.hidden);},requestAnimationFrame:f=>{queue.push(f);return queue.length;},window:{addEventListener:(t,f)=>handlers.set(t,f),dispatchEvent:e=>events.push(e)},CustomEvent:class{constructor(type,{detail}){this.type=type;this.detail=detail;}}};
 vm.createContext(c);const start=sourceText.indexOf("window.addEventListener('boxlab-selection-hub-tool'");assert.ok(start>=0);vm.runInContext(sourceText.slice(start),c);
 return{c,events,controls,palette,launch:(mode,tool='Sweep')=>handlers.get('boxlab-selection-hub-tool')({detail:{mode,tool}}),end:(id='sweep')=>handlers.get('boxlab-tool-session-end')({detail:{id}}),flush:()=>queue.shift()?.()};
}
export function assertSweepLaunch(){
 for(const mode of ['face','edge']){const r=sweepHubRuntime();r.launch(mode);r.flush();assert.equal(r.c.__boxlabSweepViewportSession.active(),true);r.end();assert.equal(r.c.__boxlabSweepViewportSession.active(),false);assert.equal(r.events.length,1);assert.equal(r.events[0].detail.mode,mode);}
 for(const [mode,tool] of [['vertex','Sweep'],['object','Sweep'],['face','Shell']]){const r=sweepHubRuntime();r.launch(mode,tool);r.flush();assert.equal(r.c.__boxlabSweepViewportSession.active(),false);assert.equal(r.events.length,0);}
}
