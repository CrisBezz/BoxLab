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
 assert.deepEqual(errors,[]);console.log('Retopo1211 browser PASS: vertex editing / quad creation / shared edges / duplicate refusal / clear / Undo / Redo / source unchanged / Done');
}finally{await browser?.close();await new Promise(r=>server.close(r));}
