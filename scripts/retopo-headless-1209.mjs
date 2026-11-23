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
 const first=await snap();assert.equal(first.objects.length,before.objects.length+1);assert.equal(first.live.length,1);assert.deepEqual(first.objects[0],before.objects[0]);
 await page.locator('#undoBtn').click();assert.deepEqual(await snap(),before);
 await page.locator('#redoBtn').click();assert.deepEqual(await snap(),first);
 await pen('pointerdown');await pen('pointermove',point.x+20,point.y);await pen('pointerup',point.x+20,point.y);
 const moved=await snap();assert.notDeepEqual(moved.live,first.live);assert.equal(moved.live.length,1);
 await page.locator('#undoBtn').click();assert.deepEqual((await snap()).live,first.live);
 await page.locator('#redoBtn').click();assert.deepEqual((await snap()).live,moved.live);
 await pen('pointerdown',point.x+20,point.y);await pen('pointermove',point.x+35,point.y);await pen('pointercancel',point.x+35,point.y);assert.deepEqual((await snap()).live,moved.live);
 await page.locator('#retopoDone').click();assert.equal(await page.evaluate(()=>__boxlabRetopo.active),false);assert.deepEqual((await snap()).live,moved.live);
 assert.deepEqual(errors,[]);console.log('Retopo1209 browser PASS: create / move / cancel / scene Undo / Redo / source unchanged / Done');
}finally{await browser?.close();await new Promise(r=>server.close(r));}
