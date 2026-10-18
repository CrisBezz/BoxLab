import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {orderedDOM} from './helpers/ordered-dom.mjs';
import {viewportPaintRuntime} from './helpers/viewport-paint-runtime.mjs';
import {createCylinderUV} from '../src/imported-uv-edit.js';
import {makeCone} from '../src/primitive-factory.js';
const source=n=>fs.readFileSync(new URL('../src/'+n,import.meta.url),'utf8');
function session(){
 const f=orderedDOM(),el=id=>{const n=f.node(id);n.dataset={};n.hidden=false;n.isConnected=true;Object.defineProperty(n,'parentNode',{get:()=>n.parentElement});Object.defineProperty(n,'nextSibling',{get:()=>n.nextElementSibling});n.replaceChildren=(...ns)=>{for(const c of [...n.children])c.remove();n.append(...ns);};return n;};
 const host=el('boxlabToolSessionHost'),drawer=el('drawer'),contentRoot=el('content'),summary=el('summary'),viewport=el('viewportWrap');contentRoot.appendChild(host);let centre=0;
 const c={host,drawer,contentRoot,summary,document:{querySelector:()=>viewport},__boxlabSelectionBridge:{mode:()=> 'object'},placeToolSessionPanel:p=>{centre++;p.style.left='50%';p.style.transform='translateX(-50%)';p.dataset.wideToolPanel='true';},window:{dispatchEvent(){}},CustomEvent:class{},queueMicrotask:fn=>fn()};
 vm.createContext(c);const s=source('tool-session-ui.js');vm.runInContext(s.slice(s.indexOf('let active=null;'),s.indexOf('function enforceOpenWhileActive()')),c);return {...f,el,c,host,contentRoot,centre:()=>centre};
}
test('916 real session owner docks Paint on left without moving footer controls; next ordinary session restores centre and source nodes',()=>{
 const f=session(),paint=f.el('boxlabViewportPaint'),footer=f.el('footer'),done=f.el('done');paint.appendChild(footer);footer.appendChild(done);f.contentRoot.appendChild(paint);f.host.dataset.wideToolPanel='true';let clicks=0;done.addEventListener('click',()=>clicks++);
 assert(f.c.begin({id:'uv-paint',title:'Paint',node:paint}));assert.equal(f.host.style.left,'8px');assert.equal(f.host.style.transform,'none');assert.equal(f.host.style.width,'272px');assert.equal(f.host.style.maxHeight,'calc(100% - 100px)');assert.equal(f.host.dataset.wideToolPanel,undefined);assert.equal(f.centre(),0);assert.equal(done.parentElement,footer);done.dispatchEvent({type:'click'});assert.equal(clicks,1);assert(f.c.end('uv-paint'));assert.equal(paint.parentElement,f.contentRoot);
 const ordinary=f.el('ordinary');f.contentRoot.appendChild(ordinary);assert(f.c.begin({id:'mesh-health',node:ordinary}));assert.equal(f.host.style.width,'');assert.equal(f.host.style.left,'50%');assert.equal(f.centre(),1);f.c.end('mesh-health');assert.equal(ordinary.parentElement,f.contentRoot);assert.equal(done.parentElement,footer);
});
test('916 UV entry uses original projection/report/history owner, hides diagnostics, closes UV session, and Mesh Health returns to repair mode',()=>{
 const r=viewportPaintRuntime();r.c.replaceMeshInPlace(r.live,makeCone(1,2,12,2));r.manager.saveActive();delete r.target().glbPassthrough;
 const fields=new Map(),field=id=>{if(!fields.has(id))fields.set(id,{hidden:false,textContent:''});return fields.get(id);},panel={hidden:true,querySelector:field};let current=null,healthCalls=0,uvCalls=0;
 const c={active:false,objectId:null,uvOnly:false,uvWorkspace:null,panel,uvDetails:field('details'),uvSummary:field('summary'),activeObject:r.target,liveMesh:()=>r.live,currentMode:()=> 'object',manager:()=>r.manager,toolSession:()=>({begin:s=>{current=s.id;},end:id=>{assert.equal(id,current);current=null;}}),sessionId:()=>c.uvOnly?'uv-tools':'mesh-health',setStatus(){},analyzeMeshHealth(){healthCalls++;throw Error('UV launch must not run mesh repair report');},renderUVReport(){uvCalls++;c.uvSummary.textContent='Mapped UVs';},createCylinderUV,__boxlabExportAs:r.owner,__boxlabObjectHistory:r.c.__boxlabObjectHistory};
 const s=source('mesh-health.js');vm.createContext(c);vm.runInContext(s.slice(s.indexOf('function renderReport(){'),s.indexOf('function repair(){'))+s.slice(s.indexOf('function close(){'),s.indexOf("launchButton?.addEventListener"))+s.slice(s.indexOf('function cylinderUVs('),s.indexOf('uvCylinder.addEventListener')),c);
 c.launch({uvOnly:true});assert.equal(current,'uv-tools');assert.equal(c.uvDetails.hidden,false);assert.equal(c.uvDetails.open,true);assert.equal(field('#meshHealthTitle').textContent,'UV');assert.equal(field('#meshHealthDiagnosticsSummary').hidden,true);assert.equal(field('#meshHealthDiagnosticsTools').hidden,true);assert.equal(healthCalls,0);assert(uvCalls>0);
 const count=r.h.undoStack.length;assert.equal(c.cylinderUVs(),true);const payload=r.target().glbPassthrough;assert(payload);assert.equal(r.h.undoStack.length,count+1);r.manager.replaceActiveMesh(r.h.undo(r.live));assert.equal(r.target().glbPassthrough,undefined);r.manager.replaceActiveMesh(r.h.redo(r.live));assert.equal(r.target().glbPassthrough,payload);c.close();assert.equal(current,null);
 c.renderReport=()=>true;c.launch();assert.equal(current,'mesh-health');assert.equal(c.uvDetails.hidden,true);assert.equal(field('#meshHealthDiagnosticsTools').hidden,false);assert.equal(field('#meshHealthTitle').textContent,'Mesh Health');c.close();assert.equal(current,null);
});
