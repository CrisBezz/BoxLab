import fs from 'node:fs/promises';import http from 'node:http';import path from 'node:path';import assert from 'node:assert/strict';import {chromium} from 'playwright';
const root=path.resolve(new URL('..',import.meta.url).pathname),mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.wasm':'application/wasm'};
const server=http.createServer(async(req,res)=>{try{let file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://x').pathname));if(file!==root&&!file.startsWith(root+path.sep))throw Error();if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');let bytes=await fs.readFile(file);if(file===path.join(root,'index.html'))bytes=Buffer.from(bytes.toString().replaceAll('https://cdn.jsdelivr.net/npm/three@0.179.1/','/node_modules/three/'));res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(bytes);}catch{res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader']});const page=await browser.newPage({viewport:{width:1366,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>globalThis.__boxlabUVTools&&globalThis.__boxlabObjectHistory&&globalThis.__boxlabExportAs);
 await page.evaluate(()=>{document.querySelector('#selectionModes button[data-mode="object"]').click();globalThis.__boxlabUVTools.open();});
 const state=()=>page.evaluate(()=>{const m=globalThis.__boxlabObjectManager,o=m.objects.find(o=>o.id===m.activeId),mesh=globalThis.__boxlabBridgeState.mesh;return{geometry:JSON.stringify([mesh.vertices,mesh.faces,mesh.faceGroups]),uv:JSON.stringify(o.glbPassthrough??null)};});const before=await state();
 await page.locator('[data-autouv="preview"]').click();await page.waitForFunction(()=>document.querySelector('[data-autouv="apply"]').hidden===false,{},{timeout:60000});assert.deepEqual(await state(),before,'preview must be private');
 await page.locator('[data-autouv="cancel"]').click();assert.deepEqual(await state(),before,'cancel must preserve UVs');
 await page.locator('[data-autouv="preview"]').click();await page.waitForFunction(()=>!document.querySelector('[data-autouv="apply"]').hidden,{},{timeout:60000});await page.locator('[data-autouv="apply"]').click();const after=await state();assert.equal(after.geometry,before.geometry);assert.notEqual(after.uv,before.uv);
 await page.locator('#undoBtn').click();assert.deepEqual(await state(),before);await page.locator('#redoBtn').click();assert.deepEqual(await state(),after);
 await page.evaluate(()=>{
   const mesh=globalThis.__boxlabBridgeState.mesh;
   mesh.faceGroups=mesh.faces.map(()=> 'Body');
 });
 const grouped=await state();
 await page.locator('[data-autouv="guided"]').click();
 await page.waitForFunction(()=>!document.querySelector('[data-autouv="apply"]').hidden,{},{timeout:60000});
 assert.match(await page.locator('[data-autouv="status"]').textContent(),/1 patch · cyan group borders/);
 assert.deepEqual(await state(),grouped);
 await page.locator('[data-autouv="cancel"]').click();
 assert.deepEqual(await state(),grouped);
 await page.locator('[data-autouv="guided"]').click();
 await page.waitForFunction(()=>!document.querySelector('[data-autouv="apply"]').hidden,{},{timeout:60000});
 await page.locator('[data-autouv="apply"]').click();
 const guided=await state();
 assert.equal(guided.geometry,grouped.geometry);
 assert.notEqual(guided.uv,grouped.uv);
 await page.locator('#undoBtn').click();
 assert.deepEqual(await state(),grouped);
 await page.locator('#redoBtn').click();
 assert.deepEqual(await state(),guided);
 const exported=await page.evaluate(async()=>{const m=globalThis.__boxlabObjectManager;m.saveActive();const o=m.objects.find(o=>o.id===m.activeId),r=await globalThis.__boxlabExportAs.buildNOM([o],false);return{uv:r.uvObjects,count:r.count};});assert.equal(exported.uv,1);assert.equal(exported.count,1);assert.deepEqual(errors,[]);
 console.log(JSON.stringify({test:'UV1/UV2 real browser module worker, preview, Cancel, Apply, Undo/Redo, NOM export',pass:true}));
}finally{await browser?.close();await new Promise(r=>server.close(r));}
