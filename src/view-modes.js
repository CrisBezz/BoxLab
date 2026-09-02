import * as THREE from 'three';

const status=document.querySelector('#selectionStatus');
const topActions=document.querySelector('.top-actions');

function state(){return globalThis.__boxlabBridgeState;}

function ensureUI(){
  if(document.querySelector('#viewModes'))return document.querySelector('#viewModes');
  const wrap=document.createElement('details');
  wrap.id='viewModes';
  wrap.className='viewport-menu';
  wrap.innerHTML=`
    <summary><span class="viewport-menu-icon">◈</span><span>Viewport</span><span class="viewport-menu-caret">▾</span></summary>
    <div class="viewport-menu-panel">
      <div class="viewport-menu-section">
        <div class="viewport-menu-label">View Direction</div>
        <div class="viewport-view-grid">
          <button type="button" data-view="axon" class="active">3D Axon</button>
          <button type="button" data-view="front">Front</button>
          <button type="button" data-view="rear">Rear</button>
          <button type="button" data-view="left">Left</button>
          <button type="button" data-view="right">Right</button>
          <button type="button" data-view="top">Top</button>
          <button type="button" data-view="bottom">Bottom</button>
        </div>
      </div>
      <div class="viewport-menu-section">
        <div class="viewport-menu-label">Render Look</div>
        <div id="viewportRenderLooks" class="viewport-render-grid"></div>
      </div>
    </div>`;
  topActions?.prepend(wrap);
  const style=document.createElement('style');
  style.textContent=`
#viewModes{position:relative;flex:0 0 auto}
#viewModes>summary{list-style:none;display:flex;align-items:center;gap:7px;min-height:34px;padding:5px 10px;border:1px solid rgba(255,255,255,.14);border-radius:8px;background:rgba(255,255,255,.045);font-size:12px;font-weight:600;cursor:pointer;user-select:none;white-space:nowrap}
#viewModes>summary::-webkit-details-marker{display:none}
#viewModes[open]>summary{background:rgba(255,255,255,.1)}
.viewport-menu-icon{font-size:15px;line-height:1;opacity:.9}.viewport-menu-caret{font-size:10px;opacity:.65}
.viewport-menu-panel{position:absolute;right:0;top:calc(100% + 7px);width:min(360px,82vw);padding:10px;border:1px solid rgba(255,255,255,.14);border-radius:11px;background:rgba(17,19,24,.98);box-shadow:0 14px 34px rgba(0,0,0,.38);backdrop-filter:blur(18px);z-index:80}
.viewport-menu-section+.viewport-menu-section{margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,.09)}
.viewport-menu-label{font-size:10px;text-transform:uppercase;letter-spacing:.08em;opacity:.55;margin:0 2px 6px}
.viewport-view-grid,.viewport-render-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}
.viewport-view-grid button,.viewport-render-grid button{min-width:0;min-height:34px;padding:5px 7px;font-size:11px;white-space:nowrap}
.viewport-view-grid button.active,.viewport-render-grid button.active{background:#f2f5fa;color:#111318;border-color:#f2f5fa}
@media(max-width:900px){#viewModes>summary{padding:5px 8px}.viewport-menu-panel{right:-4px;width:min(340px,88vw)}}
`;
  document.head.append(style);
  return wrap;
}

function modelBounds(mesh){
  const box=new THREE.Box3();
  mesh?.vertices?.forEach(v=>box.expandByPoint(v));
  return box.isEmpty()?null:box;
}

function directionFor(view){
  switch(view){
    case 'front': return new THREE.Vector3(0,0,1);
    case 'rear': return new THREE.Vector3(0,0,-1);
    case 'left': return new THREE.Vector3(-1,0,0);
    case 'right': return new THREE.Vector3(1,0,0);
    case 'top': return new THREE.Vector3(0,1,0);
    case 'bottom': return new THREE.Vector3(0,-1,0);
    default: return new THREE.Vector3(1,1,1).normalize();
  }
}

function upFor(view){
  if(view==='top')return new THREE.Vector3(0,0,-1);
  if(view==='bottom')return new THREE.Vector3(0,0,1);
  return new THREE.Vector3(0,1,0);
}

function fitDistance(camera,box){
  const size=box.getSize(new THREE.Vector3());
  const radius=Math.max(size.length()*.5,.25);
  const halfY=THREE.MathUtils.degToRad(camera.fov)*.5;
  const halfX=Math.atan(Math.tan(halfY)*Math.max(camera.aspect,.01));
  const limiting=Math.max(.1,Math.min(halfY,halfX));
  return Math.max(radius/Math.sin(limiting)*1.15,.75);
}

function setView(view){
  const s=state(),camera=s?.camera,mesh=s?.mesh;
  if(!camera||!mesh?.vertices?.length)return;
  const controls=s.controls||globalThis.__boxlabControls;
  const box=modelBounds(mesh); if(!box)return;
  const center=controls?.target?.clone?.()||box.getCenter(new THREE.Vector3());
  const distance=fitDistance(camera,box);
  const dir=directionFor(view);
  camera.up.copy(upFor(view));
  camera.position.copy(center).addScaledVector(dir,distance);
  camera.near=Math.max(.001,distance-box.getSize(new THREE.Vector3()).length()*1.5);
  camera.far=Math.max(100,distance+box.getSize(new THREE.Vector3()).length()*4);
  camera.lookAt(center);
  camera.updateProjectionMatrix();
  if(controls?.target){controls.target.copy(center);controls.update?.();}
  document.querySelectorAll('#viewModes button[data-view]').forEach(button=>button.classList.toggle('active',button.dataset.view===view));
  if(status)status.textContent=`View • ${view==='axon'?'3D Axon':view[0].toUpperCase()+view.slice(1)}`;
}

const ui=ensureUI();
ui?.addEventListener('click',e=>{
  const b=e.target.closest('button[data-view]');
  if(!b)return;
  e.preventDefault();
  e.stopPropagation();
  setView(b.dataset.view);
});

document.addEventListener('pointerdown',event=>{
  if(!ui?.open)return;
  if(event.target?.closest?.('#viewModes'))return;
  ui.open=false;
},true);

const version=document.querySelector('#appVersion');
if(version)version.textContent='v0.36.5.0';
document.title='BoxLab v0.36.5.0';
