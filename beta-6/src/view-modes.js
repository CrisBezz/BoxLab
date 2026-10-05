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
    <summary title="View settings" aria-label="View settings"><span class="viewport-menu-icon">◈</span><span>VIEW</span><span class="viewport-menu-caret">▾</span></summary>
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
      <div class="viewport-menu-section">
        <div class="viewport-menu-label">Diagnostics</div>
        <div class="viewport-render-grid">
          <button type="button" id="gestureDebugToggle">Gesture Debug</button>
        </div>
      </div>

    </div>`;
  const focusButton=document.createElement('button');
  focusButton.type='button';
  focusButton.id='focusViewBtn';
  focusButton.textContent='Focus';
  focusButton.title='Toggle Focus View';
  const objectButton=document.createElement('button');objectButton.type='button';objectButton.id='objectBrowserBtn';
  objectButton.title='Object Browser';objectButton.setAttribute('aria-label','Object Browser');objectButton.setAttribute('aria-expanded','false');objectButton.setAttribute('aria-controls','objectBrowserPanel');
  objectButton.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();activateObjectListFromView();});
  topActions?.append(focusButton,objectButton);
  topActions?.append(wrap);
  const style=document.createElement('style');
  style.textContent=`
#viewModes{position:relative;z-index:120;flex:0 0 auto}
#viewModes>summary{list-style:none;display:flex;align-items:center;gap:7px;min-height:34px;padding:5px 10px;border:1px solid rgba(255,255,255,.14);border-radius:8px;background:rgba(255,255,255,.045);font-size:12px;font-weight:600;cursor:pointer;user-select:none;white-space:nowrap;touch-action:manipulation}
#viewModes>summary::-webkit-details-marker{display:none}
#viewModes[open]>summary{background:rgba(255,255,255,.1)}
.viewport-menu-icon{font-size:15px;line-height:1;opacity:.9}.viewport-menu-caret{font-size:10px;opacity:.65}
.viewport-menu-panel{position:fixed;right:max(8px,env(safe-area-inset-right));top:calc(var(--boxlab-topbar-h,60px) + 6px);z-index:200;width:min(360px,calc(100vw - 16px));max-height:calc(100dvh - var(--boxlab-topbar-h,60px) - 14px);overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;scrollbar-gutter:stable;padding:10px;border:1px solid rgba(255,255,255,.14);border-radius:11px;background:rgba(17,19,24,.98);box-shadow:0 14px 34px rgba(0,0,0,.38);backdrop-filter:blur(18px);pointer-events:auto;touch-action:pan-y}
.viewport-menu-section+.viewport-menu-section{margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,.09)}
.viewport-menu-label{font-size:10px;text-transform:uppercase;letter-spacing:.08em;opacity:.55;margin:0 2px 6px}
.viewport-view-grid,.viewport-render-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}
.viewport-view-grid button,.viewport-render-grid button{min-width:0;min-height:34px;padding:5px 7px;font-size:11px;white-space:nowrap;touch-action:manipulation}
.viewport-view-grid button.active,.viewport-render-grid button.active{background:#f2f5fa;color:#111318;border-color:#f2f5fa}
@media(max-width:900px){#viewModes>summary{padding:5px 8px}.viewport-menu-panel{right:max(8px,env(safe-area-inset-right));width:min(340px,calc(100vw - 16px));max-height:calc(100dvh - var(--boxlab-topbar-h,60px) - 14px)}}
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
  const box=modelBounds(mesh);if(!box)return;
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


function focusViewOn(){return document.documentElement.classList.contains('boxlab-focus-view');}
function syncFocusViewButton(){
  const button=document.querySelector('#focusViewBtn');
  if(!button)return;
  const label=focusViewOn()?'Show left tool list (exit Focus)':'Hide left tool list (Focus)';
  button.title=label;button.setAttribute('aria-label',label);
  if(!button.dataset.iconAction)button.textContent=label;
  button.setAttribute('aria-pressed',focusViewOn()?'true':'false');
  button.classList.toggle('active',focusViewOn());
}
// Move the original Objects and Modifiers nodes into a right viewport panel.
let focusObjectListOpen=false,objectsDrawerWasOpen=false,modifiersDrawerWasOpen=false;
let objectBrowserPanel=null,drawerHomes=[];
function objectMode(){return document.querySelector('#selectionModes button.active')?.dataset.mode==='object';}
function browserButtonState(){const button=document.querySelector('#objectBrowserBtn');button?.setAttribute('aria-expanded',String(focusObjectListOpen));button?.classList.toggle('active',focusObjectListOpen);}
function closeFocusObjectList(){
  if(focusObjectListOpen){
    const drawer=document.querySelector('#objectsDrawer'),modifiers=document.querySelector('#modifiersDrawer');
    if(drawer)drawer.open=objectsDrawerWasOpen;if(modifiers)modifiers.open=modifiersDrawerWasOpen;
    for(const {node,parent,next} of drawerHomes){if(next?.parentNode===parent)parent.insertBefore(node,next);else parent?.appendChild(node);}
  }
  drawerHomes=[];focusObjectListOpen=false;if(objectBrowserPanel)objectBrowserPanel.hidden=true;browserButtonState();
}
function toggleObjectList(){
  const drawer=document.querySelector('#objectsDrawer'),modifiers=document.querySelector('#modifiersDrawer');
  if(!objectMode()||!drawer)return false;
  if(focusObjectListOpen){closeFocusObjectList();return true;}
  if(!objectBrowserPanel){
    objectBrowserPanel=document.createElement('section');objectBrowserPanel.id='objectBrowserPanel';objectBrowserPanel.setAttribute('aria-label','Objects and Modifiers');
    document.querySelector('#viewportWrap')?.appendChild(objectBrowserPanel);
  }
  objectsDrawerWasOpen=drawer.open;modifiersDrawerWasOpen=!!modifiers?.open;
  const nodes=[drawer,modifiers].filter(Boolean);drawerHomes=nodes.map(node=>({node,parent:node.parentNode,next:node.nextSibling}));
  nodes.forEach(node=>objectBrowserPanel.appendChild(node));drawer.open=true;if(modifiers)modifiers.open=false;
  focusObjectListOpen=true;objectBrowserPanel.hidden=false;browserButtonState();return true;
}
globalThis.__boxlabObjectListViewport={toggle:toggleObjectList,visible:()=>focusObjectListOpen,available:()=>!!document.querySelector('#objectsDrawer'),close:closeFocusObjectList};
document.querySelectorAll('#selectionModes button[data-mode]').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.mode!=='object')closeFocusObjectList();}));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeFocusObjectList();});
window.addEventListener('boxlab-tool-session-change',event=>{if(event.detail?.active)closeFocusObjectList();});
function toggleFocusView(){
  document.documentElement.classList.toggle('boxlab-focus-view');
  syncFocusViewButton();
  window.dispatchEvent(new Event('resize'));
}

const ui=ensureUI();
const gestureDebugButton=document.querySelector('#gestureDebugToggle');
function syncGestureDebugButton(){
  if(!gestureDebugButton)return;
  const on=!!globalThis.__boxlabGestureDebug?.enabled;
  gestureDebugButton.classList.toggle('active',on);
  gestureDebugButton.textContent=on?'Gesture Debug • ON':'Gesture Debug';
}
gestureDebugButton?.addEventListener('click',event=>{
  event.preventDefault();
  event.stopPropagation();
  globalThis.__boxlabGestureDebug?.toggle?.();
  syncGestureDebugButton();
});
window.addEventListener('boxlab-gesture-debug-change',syncGestureDebugButton);
syncGestureDebugButton();

function activateObjectListFromView(){
  if(globalThis.__boxlabToolSession?.isActive?.()||globalThis.__boxlabMainDirectTool?.ownsModellingGesture?.()||globalThis.__boxlabFaceDirect?.active?.()){
    if(status)status.textContent='Finish the active tool before opening Object List';
    return false;
  }
  const api=globalThis.__boxlabObjectListViewport;
  if(!api?.available?.())return false;
  if(!objectMode()){
    const modeButton=document.querySelector('#selectionModes button[data-mode="object"]');
    if(!modeButton||modeButton.disabled)return false;
    modeButton.click();
  }
  if(!objectMode()||!api.toggle())return false;
  if(ui)ui.open=false;
  return true;
}
function activateButton(button){
  if(!button)return false;
  if(button.id==='viewObjectListBtn')return activateObjectListFromView();
  if(button.dataset.view){setView(button.dataset.view);return true;}
  if(button.dataset.render){button.click();return true;}
  if(button.id==='focusViewBtn'){toggleFocusView();return true;}
  return false;
}

const focusTopButton=document.querySelector('#focusViewBtn');
focusTopButton?.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();toggleFocusView();});
let suppressSyntheticClickUntil=0;
ui?.addEventListener('click',event=>{
  const button=event.target.closest('button[data-view],#viewObjectListBtn');
  if(!button)return;
  if(performance.now()<suppressSyntheticClickUntil){event.preventDefault();event.stopPropagation();return;}
  event.preventDefault();event.stopPropagation();activateButton(button);
});

// iPadOS can suppress synthesized clicks in this panel, so touch/Pencil activates
// on pointerup. Suppress the following synthetic click so toggles fire only once.
ui?.addEventListener('pointerup',event=>{
  if(event.pointerType==='mouse')return;
  const button=event.target.closest('button[data-view],button[data-render],#viewObjectListBtn');
  if(!button)return;
  suppressSyntheticClickUntil=performance.now()+700;
  event.preventDefault();event.stopPropagation();activateButton(button);
});

document.addEventListener('pointerdown',event=>{
  if(!ui?.open)return;
  if(event.target?.closest?.('#viewModes'))return;
  ui.open=false;
},true);

// Visible release identity is owned by release-version.js.



const focusViewStyle=document.createElement('style');
focusViewStyle.textContent=`
#focusViewBtn[aria-pressed="true"]{background:#f2f5fa!important;color:#111318!important;border-color:#f2f5fa!important}
html.boxlab-focus-view #viewportWrap > .floating-panel.left-panel{display:none!important}
#objectBrowserPanel[hidden]{display:none!important}
#objectBrowserPanel{position:absolute;right:max(8px,env(safe-area-inset-right));top:8px;z-index:133;width:min(340px,calc(100% - 16px));max-height:calc(100% - 24px);overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y;padding:8px;box-sizing:border-box;background:rgba(20,23,30,.98);border:1px solid #ffffff30;border-radius:12px;box-shadow:0 10px 28px #0006}
#objectBrowserPanel #objectsDrawer{margin:0 0 8px}
#objectBrowserPanel #modifiersDrawer{margin:0}
html.boxlab-focus-view #viewportWrap > #selectionModes{left:max(8px,env(safe-area-inset-left))!important}
html.boxlab-focus-view .statusbar{left:10px!important}
`;
document.head.append(focusViewStyle);
syncFocusViewButton();
