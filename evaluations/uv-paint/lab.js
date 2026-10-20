import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {createPaintComparison,brushSettings,topDownPixels} from './paint-core.js?v=905';
import {createStroke} from './stroke.js?v=896';
import {comparisonSample} from './samples.js?v=914';
import {createPaintSessionIO,PAINT_SESSION_LIMIT} from './paint-session.js?v=0.36.18.921';
// This standalone document loads the original export geometry owner, not main.js,
// scene management or modelling input. Its export controls are absent and never used.
import '../../src/export-as-panel.js?v=0.36.18.925';
const $=id=>document.getElementById(id),canvas=$('canvas'),view=$('view'),status=$('status');
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,1,.01,100),raycaster=new THREE.Raycaster();
let renderer,controls,documentPaint,textures=[],mesh,selected=0,mode='paint',stroke=null,disposed=false,demoToken=0,metrics=[],dimensions='',sampleObject=null,revision=0,sessionIO=null;
const touch=new Set(),suppressed=new Set();
function settings(){return brushSettings({colour:$('colour').value,radius:Number($('radius').value),hardness:Number($('hardness').value),opacity:Number($('opacity').value),pressure:$('pressure').checked});}
function sync(){if(!documentPaint)return;const s=documentPaint.state;$('undo').disabled=!s.undo||s.drawing;$('redo').disabled=!s.redo||s.drawing;}
function report(){if(!metrics.length)return;$('metrics').textContent=metrics.map((m,i)=>`${i?'Klecks curve':'BoxLab round'}: ${m.ms.toFixed(1)} ms CPU · ${m.hits} surface marks`).join('   |   ')+' · stroke processing + raycasts + raster only';}
function hit(p){const r=canvas.getBoundingClientRect();raycaster.setFromCamera(new THREE.Vector2(p.x/r.width*2-1,1-p.y/r.height*2),camera);scene.updateMatrixWorld();return raycaster.intersectObject(mesh,false)[0];}
function measured(i,fn){const t=performance.now();try{return fn();}finally{metrics[i].ms+=performance.now()-t;}}
function start(p){if(stroke||disposed)return;revision++;metrics=[{ms:0,hits:0},{ms:0,hits:0}];documentPaint.begin(settings());controls.enabled=false;
 const paths=['boxlab','klecks'].map((kind,i)=>createStroke(kind,q=>{const h=hit(q);if(h?.uv){documentPaint.layers[i].stamp(h.uv.x,h.uv.y,q.pressure);metrics[i].hits++;}}));stroke={id:null,last:p,paths};paths.forEach((path,i)=>measured(i,()=>path.start(p)));sync();}
function movePoint(p){if(!stroke)return;stroke.paths.forEach((path,i)=>measured(i,()=>path.move(p)));stroke.last=p;}
function finish(cancel=false){if(!stroke)return;const active=stroke;stroke=null;
 active.paths.forEach((path,i)=>measured(i,()=>cancel?path.cancel():path.end()));if(documentPaint.finish(cancel))revision++;controls.enabled=true;
 if(active.id!==null){try{canvas.releasePointerCapture(active.id);}catch{}}
 sync();report();status.textContent=cancel?'Stroke cancelled · both candidates restored':`Both brushes updated · ${documentPaint.state.undo} Undo steps${active.paths.some(p=>p.stats.limited)?' · stroke limit reached':''}`;}
function cancel(){demoToken++;finish(true);}
function select(i){cancel();if(selected!==i)revision++;selected=i;for(const [j,id] of ['boxlab','klecks'].entries())$(id).setAttribute('aria-pressed',String(j===i));if(mesh)mesh.material.map=textures[i];$('candidate').textContent=i?'Klecks curve · adapted screen-space Bézier':'BoxLab round · direct spacing';}
function install(kind,state=null){
 // Stage all resource validation/geometry before replacing the visible session.
 let sample,paint,stagedTextures=[],stagedMesh;
 try{
  sample=state?{object:state.object,geometry:globalThis.__boxlabExportAs.buildUVPreviewGeometry(state.object.mesh,state.object.glbPassthrough)}:comparisonSample(kind,globalThis.__boxlabExportAs);
  if(!sample.geometry)throw Error('Saved UV geometry is stale or unsupported');
  if(state&&kind==='plane')sample.geometry.rotateX(Math.PI/2);
  paint=createPaintComparison();if(state)state.layers.forEach((r,i)=>paint.layers[i].restore(r.pixels));
  stagedTextures=paint.layers.map(layer=>{const t=new THREE.DataTexture(layer.pixels,layer.size,layer.size,THREE.RGBAFormat);t.colorSpace=THREE.SRGBColorSpace;t.flipY=false;t.generateMipmaps=false;t.minFilter=t.magFilter=THREE.LinearFilter;return t;});
  stagedMesh=new THREE.Mesh(sample.geometry,new THREE.MeshBasicMaterial({map:stagedTextures[state?.selected??selected],toneMapped:false}));
  scene.add(stagedMesh);
 }catch(error){if(stagedMesh){scene.remove(stagedMesh);stagedMesh.material.dispose();}sample?.geometry?.dispose();stagedTextures.forEach(t=>t.dispose());paint?.dispose();throw error;}
 cancel();sessionIO?.invalidate();revision++;
 if(mesh){scene.remove(mesh);mesh.geometry.dispose();mesh.material.dispose();}textures.forEach(t=>t.dispose());documentPaint?.dispose();
 documentPaint=paint;textures=stagedTextures;mesh=stagedMesh;sampleObject=sample.object;
 if(state){selected=state.selected;$('model').value=kind;for(const [id,key] of [['colour','colour'],['radius','radius'],['hardness','hardness'],['opacity','opacity']])$(id).value=String(state.settings[key]);$('pressure').checked=state.settings.pressure;$('radiusOut').textContent=$('radius').value;camera.position.fromArray(state.camera.position);controls.target.fromArray(state.camera.target);}
 else{camera.position.set(0,.15,4);controls.target.set(0,0,0);}
 controls.update();metrics=[];$('metrics').textContent='';select(selected);status.textContent=state?'Paint session opened · both candidates restored · Undo history starts here':'Ready · paint once, switch brushes to compare';sync();
}
function reset(){install($('model').value);}
async function saveLab(){cancel();$('savePaint').disabled=true;try{const bytes=await sessionIO.save();if(disposed)return;const url=URL.createObjectURL(new Blob([bytes],{type:'application/octet-stream'})),a=document.createElement('a');a.href=url;a.download='BoxLab-Paint-Lab.boxpaint';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);status.textContent='Saved .boxpaint · both brushes, mesh, settings and view';}catch(error){status.textContent='Save Paint failed: '+error.message;}finally{$('savePaint').disabled=false;}}
async function openLab(){const file=$('openPaintFile').files?.[0];$('openPaintFile').value='';if(!file)return;$('openPaint').disabled=true;try{await sessionIO.open(async()=>{if(file.size>PAINT_SESSION_LIMIT)throw Error('Paint Lab file exceeds 4 MiB');return new Uint8Array(await file.arrayBuffer());});}catch(error){status.textContent='Open Paint failed: '+error.message;}finally{$('openPaint').disabled=false;}}
function point(e,release=false){const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top,pressure:e.pointerType==='pen'?(release?stroke?.last.pressure??1:Math.min(1,Math.max(0,e.pressure))):1};}
function consume(e){e.preventDefault();e.stopImmediatePropagation();}
function down(e){if(e.pointerType==='touch'){if(stroke){suppressed.add(e.pointerId);canvas.setPointerCapture(e.pointerId);consume(e);}else touch.add(e.pointerId);return;}
 if(e.pointerType==='pen'&&!(e.buttons&1)&&e.pressure<=0){consume(e);return;}
 if(mode==='paint'&&e.pointerType==='pen'&&(touch.size||stroke)){consume(e);return;}
 if(mode!=='paint'||e.button!==0||touch.size||stroke)return;consume(e);start(point(e));stroke.id=e.pointerId;canvas.setPointerCapture(e.pointerId);}
function move(e){if(suppressed.has(e.pointerId)){consume(e);return;}if(!stroke||stroke.id!==e.pointerId)return;consume(e);
 const coalesced=e.getCoalescedEvents?.()||[],events=coalesced.length?coalesced:[e];
 for(const sample of events){if(sample.pointerType==='pen'&&!sample.buttons)continue;movePoint(point(sample));}}
function up(e){touch.delete(e.pointerId);if(suppressed.delete(e.pointerId)){consume(e);return;}if(!stroke||stroke.id!==e.pointerId)return;consume(e);movePoint(point(e,true));finish();}
function pointerCancel(e){touch.delete(e.pointerId);if(suppressed.delete(e.pointerId)){consume(e);return;}if(stroke?.id===e.pointerId){consume(e);cancel();}}
function resize(){if(disposed||!renderer)return;const r=view.getBoundingClientRect(),key=`${r.width}:${r.height}`;if(key!==dimensions){cancel();revision++;dimensions=key;}renderer.setSize(Math.max(1,r.width),Math.max(1,r.height),false);camera.aspect=r.width/Math.max(1,r.height);camera.updateProjectionMatrix();}
function demo(){reset();const token=++demoToken,r=canvas.getBoundingClientRect();let index=0;const count=100;function frame(){if(disposed||token!==demoToken)return;for(let n=0;n<2&&index<=count;n++,index++){const t=index/count,p={x:r.width*(.33+.34*t),y:r.height*(.5+.10*Math.sin(t*Math.PI*2)),pressure:.3+.7*Math.sin(t*Math.PI)};if(!index)start(p);else movePoint(p);}if(index<=count)requestAnimationFrame(frame);else finish();}requestAnimationFrame(frame);}
function download(){cancel();const candidate=selected;const out=document.createElement('canvas'),layer=documentPaint.layers[selected];out.width=out.height=layer.size;const ctx=out.getContext('2d');if(!ctx){status.textContent='PNG canvas unavailable';return;}ctx.putImageData(new ImageData(topDownPixels(layer),layer.size,layer.size),0,0);out.toBlob(blob=>{out.width=out.height=1;if(!blob||disposed)return;const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`BoxLab-UV-Paint-${candidate?'Klecks-curve':'BoxLab-round'}.png`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);},'image/png');}
try{
 renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
 for(const [name,fn] of [['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',pointerCancel]])canvas.addEventListener(name,fn,{capture:true,passive:false});
 canvas.addEventListener('lostpointercapture',e=>{touch.delete(e.pointerId);suppressed.delete(e.pointerId);if(stroke?.id===e.pointerId)cancel();});
 controls=new OrbitControls(camera,canvas);controls.enableDamping=false; // camera stays fixed during each paired stroke
 controls.addEventListener?.('start',()=>{revision++;});
 const observer=new ResizeObserver(resize);observer.observe(view);reset();resize();
 sessionIO=createPaintSessionIO({capture:()=>({sample:$('model').value,object:sampleObject,layers:documentPaint.layers,settings:settings(),selected,camera:{position:camera.position.toArray(),target:controls.target.toArray()}}),revision:()=>revision,apply:state=>install(state.sample,state)});
 renderer.setAnimationLoop(()=>{if(disposed)return;controls.update();documentPaint.layers.forEach((l,i)=>{if(l.consumeDirty())textures[i].needsUpdate=true;});renderer.render(scene,camera);});
 $('savePaint').addEventListener('click',saveLab);$('openPaint').addEventListener('click',()=>{cancel();$('openPaintFile').click();});$('openPaintFile').addEventListener('change',openLab);
 $('boxlab').addEventListener('click',()=>select(0));$('klecks').addEventListener('click',()=>select(1));$('model').addEventListener('change',reset);$('reset').addEventListener('click',reset);$('demo').addEventListener('click',demo);$('download').addEventListener('click',download);
 for(const id of ['colour','radius','hardness','opacity','pressure'])$(id).addEventListener('input',()=>{cancel();revision++;$('radiusOut').textContent=$('radius').value;});
 for(const next of ['paint','orbit'])$(next).addEventListener('click',()=>{cancel();revision++;mode=next;for(const id of ['paint','orbit'])$(id).setAttribute('aria-pressed',String(id===next));});
 for(const kind of ['undo','redo'])$(kind).addEventListener('click',()=>{cancel();if(documentPaint[kind]())revision++;sync();status.textContent=`${kind==='undo'?'Undo':'Redo'} · both candidates`;});
 function blur(){cancel();touch.clear();suppressed.clear();}
 addEventListener('blur',blur);document.addEventListener('visibilitychange',()=>{if(document.hidden)blur();});
 addEventListener('pagehide',event=>{blur();if(event.persisted)return;disposed=true;sessionIO?.invalidate();observer.disconnect();renderer.setAnimationLoop(null);controls.dispose();mesh.geometry.dispose();mesh.material.dispose();textures.forEach(t=>t.dispose());documentPaint.dispose();renderer.dispose();},{once:false});
 globalThis.__boxlabUVPaintLab={get paint(){return documentPaint;},get mesh(){return mesh;},get metrics(){return metrics;},camera,renderer,demo,cancel,select,get sessionIO(){return sessionIO;}};
}catch(error){cancel();status.textContent='Paint Lab could not start: '+error.message;console.error(error);}
