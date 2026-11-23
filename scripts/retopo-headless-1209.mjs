import fs from 'node:fs/promises';import http from 'node:http';import path from 'node:path';import assert from 'node:assert/strict';import {chromium} from 'playwright';
const root=path.resolve(new URL('..',import.meta.url).pathname),mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.wasm':'application/wasm'};
const server=http.createServer(async(req,res)=>{try{let file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://x').pathname));if(file!==root&&!file.startsWith(root+path.sep))throw Error();if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');let bytes=await fs.readFile(file);if(file===path.join(root,'index.html'))bytes=Buffer.from(bytes.toString().replaceAll('https://cdn.jsdelivr.net/npm/three@0.179.1/','/node_modules/three/'));res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(bytes);}catch{res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader']});const page=await browser.newPage({viewport:{width:1366,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>globalThis.__boxlabRetopo&&globalThis.__boxlabObjectHistory&&globalThis.__boxlabObjectManager);
 const snap=()=>page.evaluate(()=>({active:__boxlabObjectManager.activeId,objects:__boxlabObjectManager.objects.map(o=>({id:o.id,mesh:o.mesh.vertices.map(v=>v.toArray()),faces:o.mesh.faces})),live:__boxlabBridgeState.mesh.vertices.map(v=>v.toArray())}));
 const before=await snap();
 await page.locator('#retopoModeBtn').click();
 const point=await page.evaluate(()=>{const s=__boxlabBridgeState,r=document.querySelector('#viewport').getBoundingClientRect(),p=s.mesh.faceCenter(1).project(s.camera);return{x:r.left+(p.x*.5+.5)*r.width,y:r.top+(-p.y*.5+.5)*r.height};});
 const pen=async(type,x=point.x,y=point.y)=>page.evaluate(({type,x,y})=>document.querySelector('#viewport').dispatchEvent(new PointerEvent(type,{bubbles:true,cancelable:true,pointerType:'pen',pointerId:41,isPrimary:true,button:0,buttons:type==='pointerup'?0:1,pressure:type==='pointerup'?0:.5,clientX:x,clientY:y})),{type,x,y});
 await pen('pointerdown');await pen('pointerup');
 assert.equal(await page.evaluate(()=>__boxlabRetopo.active),true,'native object creation must keep Retopo active');
 const first=await snap();assert.equal(first.objects.length,before.objects.length+1);assert.equal(first.live.length,1);assert.deepEqual(first.objects[0],before.objects[0]);
 await page.locator('#undoBtn').click();assert.deepEqual(await snap(),before);
 await page.locator('#redoBtn').click();assert.deepEqual(await snap(),first);
 await pen('pointerdown');await pen('pointermove',point.x+20,point.y);await pen('pointerup',point.x+20,point.y);
 const moved=await snap();assert.notDeepEqual(moved.live,first.live);assert.equal(moved.live.length,1);
 await page.locator('#undoBtn').click();assert.deepEqual((await snap()).live,first.live);
 await page.locator('#redoBtn').click();assert.deepEqual((await snap()).live,moved.live);
 await pen('pointerdown',point.x+20,point.y);await pen('pointermove',point.x+35,point.y);await pen('pointercancel',point.x+35,point.y);assert.deepEqual((await snap()).live,moved.live);
 await page.locator('#retopoDone').click();assert.equal(await page.evaluate(()=>__boxlabRetopo.active),false);assert.deepEqual((await snap()).live,moved.live);
 // A fresh native scene checks Quad directly, including the first-object transaction.
 await page.reload();await page.waitForFunction(()=>globalThis.__boxlabRetopo&&globalThis.__boxlabObjectHistory&&globalThis.__boxlabObjectManager);
 const quadSource=await snap();
 const positions=await page.evaluate(()=>{const s=__boxlabBridgeState,r=document.querySelector('#viewport').getBoundingClientRect(),v=s.mesh.vertices[0].clone();return [[-.30,-.25,.5],[0,-.25,.5],[0,.10,.5],[-.30,.10,.5],[.30,-.25,.5],[.30,.10,.5]].map(p=>{v.set(...p).project(s.camera);return{x:r.left+(v.x*.5+.5)*r.width,y:r.top+(-v.y*.5+.5)*r.height};});});
 await page.locator('#retopoModeBtn').click();await page.locator('#retopoQuad').click();
 const tap=async i=>{const p=positions[i];await pen('pointerdown',p.x,p.y);await pen('pointerup',p.x,p.y);};
 await tap(0);await tap(1);await tap(2);assert.deepEqual(await snap(),quadSource,'partial quad must not mutate the scene');
 await tap(3);const q1=await snap();assert.equal(q1.objects.length,quadSource.objects.length+1);assert.equal(q1.live.length,4);assert.equal(q1.objects.at(-1).faces.length,1);assert.equal(await page.evaluate(()=>__boxlabRetopo.active),true);
 await tap(1);await tap(4);await tap(5);await tap(2);const q2=await snap();assert.equal(q2.live.length,6);assert.equal(q2.objects.at(-1).faces.length,2);assert.deepEqual(q2.objects[0],quadSource.objects[0]);
 await page.locator('#undoBtn').click();assert.deepEqual(await snap(),q1);await page.locator('#redoBtn').click();assert.deepEqual(await snap(),q2);
 for(const i of [0,1,2,3])await tap(i);assert.deepEqual(await snap(),q2,'duplicate quad refusal is atomic');
 await tap(0);await page.locator('#retopoClear').click();assert.deepEqual(await snap(),q2);
 await page.locator('#retopoDone').click();assert.deepEqual(await snap(),q2);
 // Use the actual OBJ reference-import flow, not a forced editable activation.
 await page.reload();await page.waitForFunction(()=>globalThis.__boxlabRetopo&&globalThis.__boxlabObjectHistory&&globalThis.__boxlabObjectManager);
 await page.evaluate(()=>document.querySelector('#importKind [data-import-kind="reference"]').click());
 const obj='o Reference\nv -1 -1 -1\nv 1 -1 -1\nv 1 1 -1\nv -1 1 -1\nv -1 -1 1\nv 1 -1 1\nv 1 1 1\nv -1 1 1\nf 1 4 3 2\nf 5 6 7 8\nf 1 2 6 5\nf 4 8 7 3\nf 1 5 8 4\nf 2 3 7 6\n';
 await page.locator('#importMeshInput').setInputFiles({name:'Locked Reference.obj',mimeType:'text/plain',buffer:Buffer.from(obj)});
 await page.waitForFunction(()=>__boxlabObjectManager.objects.some(o=>o.kind==='reference'));
 const ref=await page.evaluate(()=>{const m=__boxlabObjectManager,o=m.objects.find(o=>o.kind==='reference'),active=m.activeId;return{id:o.id,active,locked:o.locked,kind:o.kind,geometry:JSON.stringify([o.mesh.vertices.map(v=>v.toArray()),o.mesh.faces]),activation:m.activate(o.id),after:m.activeId};});
 assert.equal(ref.locked,true);assert.equal(ref.activation,false);assert.equal(ref.after,ref.active);
 // Delete the cube through the real global Delete owner, leaving only a reference.
 const imported=await snap();
 await page.evaluate(()=>{document.querySelector('#selectionModes [data-mode="object"]').click();document.querySelector('#outlinerDeleteBtn').click();});
 assert.equal(await page.locator('#selectionDrawer').evaluate(el=>getComputedStyle(el).pointerEvents),'auto','object selection stays available without an editable object');
 const referenceOnly=await snap();assert.equal(referenceOnly.active,null);assert.equal(referenceOnly.objects.length,1);assert.equal(referenceOnly.live.length,0);assert.equal(referenceOnly.objects[0].id,ref.id);
 await page.locator('#undoBtn').click();assert.deepEqual(await snap(),imported);await page.locator('#redoBtn').click();assert.deepEqual(await snap(),referenceOnly);
 const referenceFile=await page.evaluate(async()=>{const {encodeBoxlabScene}=await import('./src/boxlab-project-codec.js?v=0.36.18.1213');return encodeBoxlabScene(__boxlabObjectHistory.capture());});

 await page.locator('#retopoModeBtn').click();await page.locator('#retopoTarget').selectOption(String(ref.id));
 assert.equal(await page.evaluate(()=>__boxlabRetopo.referenceId),ref.id);assert.equal(await page.evaluate(()=>__boxlabObjectManager.activeId),null);
 const refStart=await snap();await page.locator('#retopoQuad').click();
 const rp=await page.evaluate(()=>{const s=__boxlabBridgeState,r=document.querySelector('#viewport').getBoundingClientRect(),v=s.mesh.vertices[0].clone();return [[-.4,-.3,1],[.1,-.3,1],[.1,.2,1],[-.4,.2,1]].map(p=>{v.set(...p).project(s.camera);return{x:r.left+(v.x*.5+.5)*r.width,y:r.top+(-v.y*.5+.5)*r.height};});});
 for(const p of rp){await pen('pointerdown',p.x,p.y);await pen('pointerup',p.x,p.y);}
 const onRef=await snap();assert.equal(onRef.objects.length,refStart.objects.length+1);assert.equal(onRef.live.length,4);assert.equal(onRef.objects.at(-1).faces.length,1);assert(onRef.live.every(v=>Math.abs(v[2]-1)<1e-7),'corners must use the imported reference, not the smaller active cube');
 const refAfter=await page.evaluate(id=>{const o=__boxlabObjectManager.objects.find(o=>o.id===id);return{kind:o.kind,locked:o.locked,geometry:JSON.stringify([o.mesh.vertices.map(v=>v.toArray()),o.mesh.faces])};},ref.id);
 assert.deepEqual(refAfter,{kind:ref.kind,locked:ref.locked,geometry:ref.geometry});
 await page.locator('#undoBtn').click();assert.deepEqual(await snap(),refStart);await page.locator('#redoBtn').click();assert.deepEqual(await snap(),onRef);
 await page.locator('#retopoDone').click();assert.deepEqual(await snap(),onRef);
 // Multi -> All -> Delete must permit a genuinely empty, undoable scene.
 await page.evaluate(()=>{document.querySelector('#selectionModes [data-mode="object"]').click();document.querySelector('button[title="Select all objects"]').click();document.querySelector('#outlinerDeleteBtn').click();});
 const empty=await snap();assert.equal(empty.active,null);assert.equal(empty.objects.length,0);assert.equal(empty.live.length,0);
 await page.locator('#undoBtn').click();assert.deepEqual(await snap(),onRef);await page.locator('#redoBtn').click();assert.deepEqual(await snap(),empty);
 const emptyFile=await page.evaluate(async()=>{const {encodeBoxlabScene}=await import('./src/boxlab-project-codec.js?v=0.36.18.1213');return encodeBoxlabScene(__boxlabObjectHistory.capture());});
 await page.evaluate(()=>document.querySelector('#outlinerAddBtn').click());assert.equal((await snap()).objects.length,1);
 page.on('dialog',dialog=>dialog.accept());
 await page.locator('#projectOpenBasicInput').setInputFiles({name:'Empty.boxlab',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(emptyFile))});
 await page.waitForFunction(()=>__boxlabObjectManager.objects.length===0);assert.equal((await snap()).active,null);
 await page.locator('#projectOpenBasicInput').setInputFiles({name:'ReferenceOnly.boxlab',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(referenceFile))});
 await page.waitForFunction(()=>__boxlabObjectManager.objects.length===1&&__boxlabObjectManager.objects[0].kind==='reference');assert.equal((await snap()).active,null);
 await page.locator('#retopoModeBtn').click();
 const vertexPoint=rp[0];await pen('pointerdown',vertexPoint.x,vertexPoint.y);await pen('pointerup',vertexPoint.x,vertexPoint.y);
 assert.equal((await snap()).objects.length,2);assert.equal((await snap()).live.length,1);await page.locator('#undoBtn').click();assert.equal((await snap()).objects.length,1);assert.equal((await snap()).active,null);await page.locator('#redoBtn').click();assert.equal((await snap()).live.length,1);await page.locator('#retopoDone').click();
 assert.deepEqual(errors,[]);console.log('Retopo1213 browser PASS: cube deletion / reference-only Retopo / delete all / empty UndoRedo / empty and reference-only Open / actual locked OBJ reference import / target picker / reference preservation / vertex editing / quad creation / shared edges / duplicate refusal / clear / Undo / Redo / source unchanged / Done');
}finally{await browser?.close();await new Promise(r=>server.close(r));}
