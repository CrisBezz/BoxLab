import './auto-multi-transfer.js?v=0.28.10';
import './ui-cleanup-0322.js?v=0.32.6';
import './bridge-ui.js?v=0.32.22';
import './dissolve-bootstrap.js?v=0.32.4';
import './dissolve-ui.js?v=0.32.22';
import './transform-arming.js?v=0.32.14';
import './component-tap-toggle.js?v=0.32.21';
import * as THREE from 'three';
const button=document.querySelector('#bevelBtn'),canvas=document.querySelector('#viewport'),width=document.querySelector('#bevelWidth'),out=document.querySelector('#bevelWidthOut'),multiToggle=document.querySelector('#multiSelectToggle'),ray=new THREE.Raycaster(),pointer=new THREE.Vector2();ray.params.Line.threshold=.09;let armed=false,drag=null;
function state(){return globalThis.__boxlabBridgeState}function bridge(){return globalThis.__boxlabSelectionBridge}function hit(e){const s=state(),r=canvas.getBoundingClientRect();if(!s?.camera)return null;pointer.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(pointer,s.camera);const h=ray.intersectObjects([...(s.edgeObjects?.values()||[])],false)[0];return Number.isInteger(h?.object?.userData?.index)?h.object.userData.index:null}
function disarm(){armed=false;drag=null;button?.classList.remove('active');}
function selectedEdgeIds(){const b=bridge();return b?.mode?.()==='edge'?[...(b.indices?.()||[])]:[];}
function syncVersion(){document.title='BoxLab v0.34.0';const el=document.querySelector('#appVersion');if(el)el.textContent='v0.34.0';}
function installFrameAll(){
  if(document.querySelector('#frameAllBtn'))return;
  const host=document.querySelector('.top-actions');
  if(!host)return;
  const b=document.createElement('button');
  b.id='frameAllBtn';
  b.type='button';
  b.textContent='Frame All';
  b.title='Fit the whole model in view';
  host.prepend(b);
  b.addEventListener('click',()=>{
    const s=state(),camera=s?.camera,mesh=s?.mesh;
    if(!camera||!mesh?.vertices?.length)return;
    const box=new THREE.Box3();
    mesh.vertices.forEach(v=>box.expandByPoint(v));
    if(box.isEmpty())return;
    const center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3()),radius=Math.max(size.length()*.5,.25);
    const controls=s?.controls||globalThis.__boxlabControls;
    const oldTarget=controls?.target?.clone?.()||center;
    let dir=camera.position.clone().sub(oldTarget);
    if(dir.lengthSq()<1e-8)dir.set(1,.75,1);
    dir.normalize();
    const halfY=THREE.MathUtils.degToRad(camera.fov)*.5;
    const halfX=Math.atan(Math.tan(halfY)*Math.max(camera.aspect,.01));
    const limiting=Math.max(.1,Math.min(halfY,halfX));
    const distance=Math.max(radius/Math.sin(limiting)*1.18,.75);
    camera.position.copy(center).addScaledVector(dir,distance);
    camera.near=Math.max(.001,distance-radius*2.5);
    camera.far=Math.max(100,distance+radius*6);
    camera.updateProjectionMatrix();
    if(controls?.target){controls.target.copy(center);controls.update?.();}
    else camera.lookAt(center);
    document.querySelector('#selectionStatus').textContent='View framed to whole model';
  });
}
syncVersion();installFrameAll();
button?.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();armed=!armed;if(armed&&bridge()?.mode?.()!=='edge')document.querySelector('#selectionModes button[data-mode="edge"]')?.click();button.classList.toggle('active',armed);const count=selectedEdgeIds().length,useMulti=!!multiToggle?.checked&&count>1;document.querySelector('#selectionStatus').textContent=armed?(useMulti?`Bevel ${count} edges • drag any selected edge`:'Bevel Edge • drag an edge'):'Edge mode • nothing selected'},true);
document.addEventListener('click',e=>{if(!armed||!e.isTrusted||e.target?.closest?.('#bevelBtn'))return;if(e.target?.closest?.('button'))disarm();},true);
function restore(mesh,snapshot){mesh.vertices=snapshot.vertices.map(v=>v.clone());mesh.faces=snapshot.faces.map(f=>[...f]);mesh.creases=new Map(snapshot.creases);if(snapshot.looseEdges instanceof Set)mesh.looseEdges=new Set(snapshot.looseEdges);if(snapshot.looseVertices instanceof Set)mesh.looseVertices=new Set(snapshot.looseVertices)}function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}))}
canvas?.addEventListener('pointerdown',e=>{if(!armed||!e.isPrimary)return;const i=hit(e),mesh=state()?.mesh;if(!Number.isInteger(i)||!mesh)return;e.preventDefault();e.stopImmediatePropagation();const existing=selectedEdgeIds(),useMulti=!!multiToggle?.checked&&existing.length>1&&existing.includes(i),ids=useMulti?existing:[i];if(!useMulti)bridge()?.set?.('edge',[i]);const valid=mesh.generalBevelSelectionInfo?.(ids);if(!valid){document.querySelector('#selectionStatus').textContent=ids.length>1?(mesh.__lastBevelError||'Selected edges cannot be bevelled together'):(mesh.__lastBevelError||'This edge cannot be bevelled');return;}drag={id:e.pointerId,x:e.clientX,width:Number(width.value||20),mesh,before:mesh.clone(),ids:[...valid.ids],mode:valid.mode,preview:false};canvas.setPointerCapture?.(e.pointerId)},true);
canvas?.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const value=Math.max(2,Math.min(49,drag.width+(e.clientX-drag.x)*.25)),amount=Math.round(value);width.value=String(amount);out.textContent=`${amount}%`;restore(drag.mesh,drag.before);drag.preview=!!drag.mesh.generalBevelSelection?.(drag.ids,amount/100,Math.max(1,Number(document.querySelector('#bevelSegments')?.value||1)));if(!drag.preview&&drag.mesh.__lastBevelError)document.querySelector('#selectionStatus').textContent=drag.mesh.__lastBevelError;render()},true);
canvas?.addEventListener('pointerup',e=>{if(!drag||drag.id!==e.pointerId)return;const current=drag;drag=null;if(current.preview)globalThis.__boxlabHistory?.push(current.before);else restore(current.mesh,current.before);bridge()?.set?.('edge',[]);render()},true);
