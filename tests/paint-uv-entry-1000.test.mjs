import test from 'node:test';import assert from 'node:assert/strict';
import {viewportPaintRuntime,viewportPaintUIRuntime} from './helpers/viewport-paint-runtime.mjs';
test('1000 bottom UV Paint opens original UV menu with top notice for missing UVs, without paint/session/history creation',async()=>{
 const r=viewportPaintRuntime(),ui=viewportPaintUIRuntime(r);delete r.target().glbPassthrough;let opened=0,notice='';
 ui.c.__boxlabUVTools={open:options=>{opened++;notice=options.notice;return true;}};
 const before=JSON.stringify(r.target()),undos=r.c.__boxlabObjectHistory;
 await ui.api.open();assert.equal(opened,1);assert.match(notice,/Valid UVs required for UV Paint/);assert.equal(ui.api.active,false);assert.equal(JSON.stringify(r.target()),before);assert.match(ui.nodes.get('selectionStatus').textContent,/Valid UVs required/);
});
test('1000 compatible Facegroups target switches through existing Studio button before painter opens',async()=>{
 const r=viewportPaintRuntime(),ui=viewportPaintUIRuntime(r),base=ui.c.document.querySelector;let mode='facegroups',switches=0,redirects=0;
 ui.c.document.querySelector=selector=>selector==='#viewportRenderLooks [data-render="facegroups"].active'?(mode==='facegroups'?{}:null):selector==='#viewportRenderLooks [data-render="studio"]'?{click(){switches++;mode='studio';}}:base(selector);
 ui.c.__boxlabRenderModes.paintVisible=()=>mode==='studio';ui.c.__boxlabUVTools={open:()=>redirects++};
 await ui.api.open();assert.equal(switches,1);assert.equal(mode,'studio');assert.equal(ui.api.active,true);assert.equal(redirects,0);ui.api.close();
});
test('1000 missing UVs while in Facegroups does not change the view or allocate paint',async()=>{
 const r=viewportPaintRuntime(),ui=viewportPaintUIRuntime(r);delete r.target().glbPassthrough;let switches=0,opened=0;const base=ui.c.document.querySelector;
 ui.c.document.querySelector=s=>s==='#viewportRenderLooks [data-render="studio"]'?{click(){switches++;}}:base(s);ui.c.__boxlabUVTools={open:()=>opened++};
 await ui.api.open();assert.equal(opened,1);assert.equal(switches,0);assert.equal(ui.api.active,false);
});
test('1000 UV Paint hands off a finished UV-tools session, but an active unwrap cannot be interrupted by painting',async()=>{
 const r=viewportPaintRuntime(),ui=viewportPaintUIRuntime(r),original=ui.c.__boxlabToolSession.isActive;let uvSession=true,busy=true,closed=0;
 ui.c.__boxlabToolSession.isActive=id=>uvSession?(!id||id==='uv-tools'):original(id);
 ui.c.__boxlabUVTools={get busy(){return busy;},close(){closed++;uvSession=false;}};
 await ui.api.open();assert.equal(ui.api.active,false);assert.equal(closed,0);assert.match(ui.nodes.get('selectionStatus').textContent,/Finish or Cancel/);
 busy=false;await ui.api.open();assert.equal(closed,1);assert.equal(ui.api.active,true);ui.api.close();
});
