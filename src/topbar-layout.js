import {installViewportToolbarControls} from './viewport-toolbar-controls.js?v=0.36.18.718';
const topbar=document.querySelector('.topbar');
const selectionModes=document.querySelector('#selectionModes');
const fileMenu=document.querySelector('#fileMenu');
const viewportWrap=document.querySelector('#viewportWrap');

function icon(mode){
  const common='viewBox="0 0 24 24" aria-hidden="true"';
  if(mode==='vertex')return `<svg ${common}><circle cx="12" cy="12" r="3.2"/></svg>`;
  if(mode==='edge')return `<svg ${common}><path d="M5 17 19 7"/><circle cx="5" cy="17" r="1.7"/><circle cx="19" cy="7" r="1.7"/></svg>`;
  if(mode==='face')return `<svg ${common}><path d="m5 17 3-10 11 2-2 10Z"/></svg>`;
  return `<svg ${common}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></svg>`;
}

function labelFor(mode){return mode[0].toUpperCase()+mode.slice(1);}

function installModeIcons(){
  selectionModes?.querySelectorAll('button[data-mode]').forEach(button=>{
    const mode=button.dataset.mode;
    button.innerHTML=`${icon(mode)}<span class="mode-label">${labelFor(mode)}</span>`;
    button.title=labelFor(mode);
    button.setAttribute('aria-label',`${labelFor(mode)} selection mode`);
  });
}

function installSecondRow(){
  if(!topbar||!selectionModes)return;
  document.querySelector('#commandBar')?.remove();
  if(viewportWrap)viewportWrap.append(selectionModes);
}

function closeFileMenu(event){
  if(!fileMenu?.open)return;
  if(event?.target?.closest?.('#fileMenu'))return;
  fileMenu.open=false;
}

document.addEventListener('pointerdown',closeFileMenu,true);
document.addEventListener('click',event=>{
  if(!fileMenu?.open)return;
  const editable=event.target?.closest?.('#fileMenu input,#fileMenu textarea,#fileMenu select,#fileMenu [contenteditable="true"],#fileMenu [contenteditable=""]');
  if(editable)return;
  const terminalAction=event.target?.closest?.(
    '#importMeshBtn,#exportAsBtn,#exportBaseBtn,#exportSubdBtn,#installAppBtn,#resetBtn'
  );
  if(terminalAction)queueMicrotask(()=>{fileMenu.open=false;});
},true);

installModeIcons();
installSecondRow();

const style=document.createElement('style');
style.textContent=`
:root{--boxlab-topbar-h:max(60px,calc(48px + env(safe-area-inset-top)))}
.topbar{height:var(--boxlab-topbar-h)!important}
.brand{order:1;display:flex!important}.top-file-menu{order:0}.top-actions{order:2}
.top-file-menu{z-index:140}
.top-file-content{top:calc(100% + 6px);max-height:calc(100dvh - var(--boxlab-topbar-h) - 18px);overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}
#viewportWrap{top:var(--boxlab-topbar-h)!important}
#viewportWrap > #selectionModes{visibility:visible;position:absolute;z-index:120;left:max(16px,env(safe-area-inset-left));bottom:max(10px,calc(env(safe-area-inset-bottom) + 6px));top:auto;right:auto;display:flex;align-items:center;padding:4px;gap:4px;background:rgba(18,21,27,.92);border:1px solid rgba(255,255,255,.14);border-radius:13px;box-shadow:0 10px 28px rgba(0,0,0,.28);backdrop-filter:blur(16px)}
#viewportWrap > #selectionModes button{min-width:46px;min-height:42px;padding:7px 11px;justify-content:center}
#viewportWrap > #selectionModes svg{width:19px;height:19px;flex:0 0 auto}
#viewportWrap > #selectionModes .mode-label{font-size:12px}
#viewportWrap > .floating-panel.left-panel{bottom:72px;max-height:none;padding-bottom:14px}
.top-actions{align-items:center}
.top-actions>button,.top-actions>#viewModes>summary{min-height:38px;height:38px;padding:7px 10px;font-size:13px!important;font-weight:600;line-height:1}
.top-actions>#viewModes{margin-left:auto}
.top-actions>#viewModes>summary{border-radius:10px}
@media(max-width:900px){
    #viewportWrap > #selectionModes{left:max(8px,env(safe-area-inset-left));bottom:max(8px,calc(env(safe-area-inset-bottom) + 4px));gap:2px;padding:3px}
  #viewportWrap > #selectionModes button{min-width:42px;min-height:42px;padding:7px 8px}
  #viewportWrap > #selectionModes .mode-label{display:none}
    #viewportWrap > .floating-panel.left-panel{bottom:66px;max-height:none;padding-bottom:14px}
  .top-actions>button,.top-actions>#viewModes>summary{min-height:38px;height:38px;padding:7px 9px;font-size:13px!important}
  .top-file-content{width:min(300px,calc(100vw - 16px));max-width:calc(100vw - 16px)}
}
`;
document.head.append(style);

if(viewportWrap)viewportWrap.dataset.commandBar='active';

// Visible release identity is owned by release-version.js.


const statusLaneStyle=document.createElement('style');
statusLaneStyle.textContent=`
/* v0.36.18.582 — reserve a readable bottom status lane below the mode dock */
#viewportWrap > #selectionModes{
  bottom:max(27px,calc(env(safe-area-inset-bottom) + 23px))!important;
}
#viewportWrap > .floating-panel.left-panel{
  bottom:84px!important;
}
.statusbar{
  bottom:max(2px,env(safe-area-inset-bottom))!important;
  z-index:121!important;
  min-height:16px;
  line-height:14px;
}
.statusbar #meshStats,.statusbar #selectionStatus{
  background:rgba(17,19,24,.58);
  border-radius:5px;
  padding:1px 4px;
}
@media(max-width:900px){
  #viewportWrap > #selectionModes{
    bottom:max(25px,calc(env(safe-area-inset-bottom) + 21px))!important;
  }
  #viewportWrap > .floating-panel.left-panel{
    bottom:80px!important;
  }
  .statusbar{bottom:max(1px,env(safe-area-inset-bottom))!important;}
}
`;
document.head.append(statusLaneStyle);

installViewportToolbarControls();
