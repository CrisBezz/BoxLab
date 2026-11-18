import {closedGrid} from '../tests/helpers/through-validation-profile.mjs';import {EditableMesh} from '../src/mesh.js';
import fs from 'node:fs/promises';import http from 'node:http';import path from 'node:path';import assert from 'node:assert/strict';import {chromium} from 'playwright';
const root=path.resolve(new URL('..',import.meta.url).pathname),mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.wasm':'application/wasm'};
const server=http.createServer(async(req,res)=>{try{let file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://x').pathname));if(file!==root&&!file.startsWith(root+path.sep))throw Error();if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');let bytes=await fs.readFile(file);if(file===path.join(root,'index.html'))bytes=Buffer.from(bytes.toString().replaceAll('https://cdn.jsdelivr.net/npm/three@0.179.1/','/node_modules/three/'));res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(bytes);}catch{res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH}:{}),args:['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader']});const page=await browser.newPage({viewport:{width:1366,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>globalThis.__boxlabFaceDirect&&globalThis.__boxlabSelectionBridge&&globalThis.__boxlabTotalGizmo&&globalThis.__boxlabPrecisionFace);
 const fixture=closedGrid(4,EditableMesh);const geometry={vertices:fixture.vertices.map(v=>v.toArray()),faces:fixture.faces};
 await page.evaluate(data=>{
  const s=globalThis.__boxlabBridgeState,m=s.mesh;
  m.vertices=data.vertices.map(v=>new m.vertices[0].constructor(...v));m.faces=data.faces;m.creases=new Map();m.faceGroups=m.faces.map(()=>null);m.looseEdges=new Set();m.looseVertices=new Set();
  const manager=globalThis.__boxlabObjectManager,o=manager.objects.find(o=>o.id===manager.activeId);o.glbPassthrough=null;
  document.querySelector('#selectionModes button[data-mode="face"]').click();
 },geometry);
 const selected=await page.evaluate(()=>{
  const s=globalThis.__boxlabBridgeState,m=s.mesh;
  const facing=m.faces.map((f,i)=>{const a=m.vertices[f[0]],b=m.vertices[f[1]],c=m.vertices[f[2]],n=b.clone().sub(a).cross(c.clone().sub(a)).normalize();return{i,n,d:n.dot(s.camera.position.clone().normalize())};}).sort((a,b)=>b.d-a.d)[0];
  const group=m.faces.map((f,i)=>{const a=m.vertices[f[0]],b=m.vertices[f[1]],c=m.vertices[f[2]],n=b.clone().sub(a).cross(c.clone().sub(a)).normalize();return n.dot(facing.n)>.999?i:null;}).filter(i=>i!==null);
  const ids=[group[5],group[10]];globalThis.__boxlabSelectionBridge.set('face',ids);return ids;
 });
 const snap=()=>page.evaluate(()=>{const m=globalThis.__boxlabBridgeState.mesh;return JSON.stringify([m.vertices.map(v=>v.toArray()),m.faces]);});
 const selection=()=>page.evaluate(()=>globalThis.__boxlabSelectionBridge.indices());
 const before=await snap();
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 await page.evaluate(()=>globalThis.__boxlabTotalGizmo.setHubState('tools'));
 const radial=page.locator('[data-tool-target="#extrudeBtn"][data-mode="face"]');
 const button=page.locator('[data-tool-target="#extrudeBtn"]').first();await button.click();assert.deepEqual(await selection(),selected);assert.equal(await snap(),before);
 await page.locator('#selectionHubFaceValueSession input').fill('-0.15');await page.locator('#selectionHubFaceValueSession .shfv-apply').click();await page.waitForFunction(()=>!globalThis.__boxlabFaceDirect.dragging());
 const after=await snap();assert.notEqual(after,before,'inward exact applies through original browser gesture owner');
 await page.locator('#undoBtn').click();assert.equal(await snap(),before);await page.locator('#redoBtn').click();assert.equal(await snap(),after);
 await page.locator('#undoBtn').click();assert.equal(await snap(),before);
 // Direct-button route and Inset retain all selected faces before any operation.
 await page.evaluate(ids=>{globalThis.__boxlabFaceDirect.disarmForSelection();globalThis.__boxlabSelectionBridge.set('face',ids);document.querySelector('#insetBtn').click();},selected);
 assert.deepEqual(await selection(),selected);assert.equal(await snap(),before);
 await page.reload();
 await page.waitForFunction(()=>globalThis.__boxlabVertexPickAssist&&globalThis.__boxlabDirectVertexBevel&&globalThis.__boxlabSelectionInput);
 await page.evaluate(()=>{
  document.querySelector('#selectionModes button[data-mode="vertex"]').click();
  document.querySelector('#multiSelectToggle').checked=false;
 });
 const corners=await page.evaluate(()=>{
  const {scene,camera}=globalThis.__boxlabBridgeState;
  const bounds=document.querySelector('#viewport').getBoundingClientRect(),points=[];
  scene.traverse(marker=>{
   if(marker.userData.kind!=='vertex')return;
   const world=marker.getWorldPosition(marker.position.clone()),p=world.project(camera);
   points.push({id:marker.userData.index,x:bounds.left+(p.x*.5+.5)*bounds.width,y:bounds.top+(-p.y*.5+.5)*bounds.height});
  });
  const picker=globalThis.__boxlabVertexPickAssist;
  return {front:points.find(p=>picker.nearestVertexAt(p.x,p.y)?.i===p.id),rear:points.find(p=>picker.nearestVertexAt(p.x,p.y)?.i!==p.id)};
 });
 assert(corners.front&&corners.rear,'cube fixture has visible and occluded corners');
 await page.mouse.click(corners.front.x,corners.front.y);
 assert.deepEqual(await selection(),[corners.front.id]);
 await page.locator('#frontSelectBtn').click();
 await page.mouse.click(corners.rear.x,corners.rear.y);
 assert.deepEqual(new Set(await selection()),new Set([corners.front.id,corners.rear.id]));
 const beforeBevel=await snap();
 await page.evaluate(()=>document.querySelector('#vertexBevelBtn').click());
 await page.mouse.move(corners.rear.x,corners.rear.y);
 await page.mouse.down();
 await page.mouse.move(corners.rear.x+30,corners.rear.y,{steps:3});
 await page.mouse.up();
 const afterBevel=await snap();
 assert.equal(JSON.parse(afterBevel)[1].length,JSON.parse(beforeBevel)[1].length+2,'both selected corners are bevelled');
 await page.locator('#undoBtn').click();
 assert.equal(await snap(),beforeBevel);
 await page.locator('#redoBtn').click();
 assert.equal(await snap(),afterBevel);
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({test:'B1 real browser multi-face radial Extrude, inward Exact, Undo/Redo direct Inset launch, depth Vertex selection and grouped Vertex Bevel',pass:true}));
}finally{await browser?.close();await new Promise(r=>server.close(r));}
