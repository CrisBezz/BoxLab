import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {createPaintTrial,strokeSamples} from './texturepaint-adapter.js';
const $=id=>document.getElementById(id),canvas=$('canvas'),view=$('view'),status=$('status');
let renderer,controls,trial,mesh,stroke=null,mode='paint',disposed=false;
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,1,.01,100),raycaster=new THREE.Raycaster();
camera.position.set(0,.25,3.5);
function sync(){if(!trial)return;$('undo').disabled=!trial.state.undo||trial.state.drawing;$('redo').disabled=!trial.state.redo||trial.state.drawing;}
function configure(){trial?.configure({color:$('colour').value,radius:Number($('radius').value),hardness:Number($('hardness').value),opacity:Number($('opacity').value)});}
function cancel(){if(stroke){const id=stroke.id;stroke=null;trial?.finish(true);try{canvas.releasePointerCapture(id);}catch{}}if(controls)controls.enabled=true;sync();}
function reset(){cancel();if(mesh){scene.remove(mesh);mesh.geometry.dispose();mesh.material.dispose();}trial?.dispose();trial=createPaintTrial();configure();const geometry=$('model').value==='sphere'?new THREE.SphereGeometry(1,48,24):new THREE.PlaneGeometry(2,2);mesh=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({map:trial.texture,toneMapped:false}));scene.add(mesh);sync();status.textContent='Ready · temporary painting trial · strokes update the surface as you draw';}
function point(e){const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top,pressure:e.pointerType==='pen'&&$('pressure').checked?Math.max(.01,e.pressure||.5):1};}
function hit(p){const r=canvas.getBoundingClientRect();raycaster.setFromCamera(new THREE.Vector2(p.x/r.width*2-1,1-p.y/r.height*2),camera);return raycaster.intersectObject(mesh,false)[0];}
function dab(p){const h=hit(p);if(h?.uv)trial.stamp(h.uv.x,h.uv.y,p.pressure);}
function down(e){if(e.pointerType==='touch'||mode!=='paint'||e.button!==0||stroke)return;const p=point(e);if(!hit(p))return;e.preventDefault();e.stopImmediatePropagation();controls.enabled=false;trial.begin();stroke={id:e.pointerId,last:p};canvas.setPointerCapture(e.pointerId);dab(p);sync();}
function move(e){if(!stroke||stroke.id!==e.pointerId)return;e.preventDefault();e.stopImmediatePropagation();const samples=e.getCoalescedEvents?.()||[];for(const event of samples.length?samples:[e]){const p=point(event);for(const sample of strokeSamples(stroke.last,p))dab(sample);stroke.last=p;}}
function up(e){if(!stroke||stroke.id!==e.pointerId)return;move(e);stroke=null;trial.finish();controls.enabled=true;try{canvas.releasePointerCapture(e.pointerId);}catch{}sync();status.textContent=`Painted · ${trial.state.undo} Undo steps · temporary session`;}
function resize(){if(disposed||!renderer)return;const r=view.getBoundingClientRect();renderer.setSize(Math.max(1,r.width),Math.max(1,r.height),false);camera.aspect=r.width/Math.max(1,r.height);camera.updateProjectionMatrix();}
try{
 renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
 // Capture Pencil/mouse paint before OrbitControls. Finger events stay with OrbitControls.
 canvas.addEventListener('pointerdown',down,true);canvas.addEventListener('pointermove',move,true);canvas.addEventListener('pointerup',up,true);canvas.addEventListener('pointercancel',cancel,true);canvas.addEventListener('lostpointercapture',()=>{if(stroke)cancel();});
 controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.target.set(0,0,0);
 const observer=new ResizeObserver(resize);observer.observe(view);reset();resize();
 renderer.setAnimationLoop(()=>{controls.update();scene.updateMatrixWorld();renderer.render(scene,camera);});
 for(const id of ['colour','radius','hardness','opacity'])$(id).addEventListener('input',()=>{cancel();configure();});
 for(const next of ['paint','orbit'])$(next).addEventListener('click',()=>{cancel();mode=next;$('paint').setAttribute('aria-pressed',String(next==='paint'));$('orbit').setAttribute('aria-pressed',String(next==='orbit'));});
 $('model').addEventListener('change',reset);$('reset').addEventListener('click',reset);
 for(const kind of ['undo','redo'])$(kind).addEventListener('click',()=>{cancel();trial[kind]();sync();});
 $('download').addEventListener('click',()=>{cancel();const out=document.createElement('canvas');out.width=out.height=512;const ctx=out.getContext('2d'),pixels=new Uint8ClampedArray(trial.pixels.length);for(let y=0;y<512;y++)pixels.set(trial.pixels.subarray(y*2048,(y+1)*2048),(511-y)*2048);ctx.putImageData(new ImageData(pixels,512,512),0,0);out.toBlob(blob=>{if(!blob)return;const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='BoxLab-TexturePaint-trial.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);out.width=out.height=1;},'image/png');});
 addEventListener('blur',cancel);addEventListener('pagehide',()=>{cancel();disposed=true;observer.disconnect();renderer.setAnimationLoop(null);controls.dispose();mesh.geometry.dispose();mesh.material.dispose();trial.dispose();renderer.dispose();},{once:true});
 globalThis.__boxlabPaintTrial={get trial(){return trial;},get mesh(){return mesh;},get renderer(){return renderer;},camera,reset};
}catch(error){status.textContent='Painting trial could not start: '+error.message;console.error(error);}
