import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../../src/selection-hub-bevel-session.js',import.meta.url),'utf8');
// Evaluate whole session module apart from its presentation import. DOM,
// preview kernel and RAF are controlled doubles; actual guards/events/close run.
export function bevelSessionRuntime({mode='edge'}={}){
 let current=mode,selection=[1,2],armed=true,busy=false,faceValid=true,disarms=0,cancels=0;
 const win=new Map(),doc=new Map(),paletteHandlers=new Map(),emitted=[],queue=[];
 const elements=new Map([['[data-action="apply"]',{}],['.shbs-head strong',{}],['.shbs-note',{}]]);
 const palette={hidden:true,querySelector:s=>elements.get(s),querySelectorAll:()=>[],addEventListener:(t,f)=>paletteHandlers.set(t,f)};
 const document={createElement:type=>type==='div'?palette:{},head:{appendChild(){}},querySelector:s=>s==='#viewportWrap'?{appendChild(){}}:s==='#app'?{classList:{contains:()=>false}}:s==='#bevelWidth'?{value:'20'}:null,querySelectorAll:()=>[],addEventListener:(t,f)=>doc.set(t,f)};
 const mesh={},c={document,placeToolSessionPanel(){},requestAnimationFrame:f=>{queue.push(f);return queue.length;},cancelAnimationFrame(){},
 window:{addEventListener:(t,f)=>win.set(t,f),dispatchEvent:e=>emitted.push(e)},CustomEvent:class{constructor(type,{detail}){this.type=type;this.detail=detail;}},
 __boxlabSelectionBridge:{mode:()=>current,indices:()=>selection,set:(m,ids)=>{current=m;selection=[...ids];}},__boxlabBridgeState:{mesh},__boxlabObjectManager:{activeId:1},
 __boxlabDirectBevel:{active:()=>armed,busy:()=>busy,disarm:()=>{disarms++;armed=false;},cancelFaces:()=>{cancels++;armed=false;},faceContextValid:()=>faceValid,
 armFaces:ids=>({ok:faceValid,ids:[...ids]}),setPersistentEdge:value=>{assert.equal(value,true);},syncEdgePreview(){},previewState:()=>({ok:true}),applyExact:()=>({ok:true})}};
 vm.createContext(c);vm.runInContext(source.replace(/^import[^\n]*\n/,''),c);
 return{c,palette,emitted,elements,launch:(tool='Bevel',launchMode=current)=>win.get('boxlab-selection-hub-tool')({detail:{tool,mode:launchMode}}),
 sync:()=>c.__boxlabBevelViewportSession.sync(),flush:()=>{const next=queue.shift();if(next)next();},mode:m=>current=m,select:ids=>selection=[...ids],busy:b=>busy=b,faceValid:b=>faceValid=b,
 tap:()=>win.get('boxlab-viewport-background-tap')(),cancel:()=>c.__boxlabBevelViewportSession.cancel(),active:()=>c.__boxlabBevelViewportSession.active(),
 counts:()=>({disarms,cancels}),selection:()=>[...selection]};
}
export function assertBevelRadialLaunch(){
 for(const mode of ['edge','face']){const r=bevelSessionRuntime({mode});r.launch('Slide');assert.equal(r.active(),false);r.launch();r.flush();assert.equal(r.active(),true);assert.equal(r.elements.get('[data-action="apply"]').textContent,'Apply Bevel');}
}
