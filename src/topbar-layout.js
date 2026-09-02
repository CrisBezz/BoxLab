const topbar=document.querySelector('.topbar');
const selectionModes=document.querySelector('#selectionModes');
const viewModes=document.querySelector('#viewModes');
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
  let row=document.querySelector('#commandBar');
  if(!row){
    row=document.createElement('div');
    row.id='commandBar';
    row.className='command-bar';
    topbar.insertAdjacentElement('afterend',row);
  }
  row.append(selectionModes);
  if(viewModes)row.append(viewModes);
}

function closeFileMenu(event){
  if(!fileMenu?.open)return;
  if(event?.target?.closest?.('#fileMenu'))return;
  fileMenu.open=false;
}

document.addEventListener('pointerdown',closeFileMenu,true);
document.addEventListener('click',event=>{
  if(!fileMenu?.open)return;
  const action=event.target?.closest?.('#fileMenu button,#fileMenu input,#fileMenu label');
  if(action)queueMicrotask(()=>{fileMenu.open=false;});
},true);

installModeIcons();
installSecondRow();

const style=document.createElement('style');
style.textContent=`
:root{--boxlab-topbar-h:max(60px,calc(48px + env(safe-area-inset-top)));--boxlab-commandbar-h:48px}
.topbar{height:var(--boxlab-topbar-h)!important}
.brand{order:1}.top-file-menu{order:0}.top-actions{order:2}
#commandBar{position:absolute;z-index:9;top:var(--boxlab-topbar-h);left:0;right:0;height:var(--boxlab-commandbar-h);display:flex;align-items:center;gap:10px;padding:5px 16px;border-bottom:1px solid rgba(255,255,255,.09);background:rgba(13,15,19,.95);backdrop-filter:blur(18px)}
#viewportWrap{top:calc(var(--boxlab-topbar-h) + var(--boxlab-commandbar-h))!important}
#commandBar #selectionModes{flex:0 0 auto;display:flex;align-items:center;padding:3px;gap:3px}
#commandBar #selectionModes button{min-width:46px;min-height:36px;padding:5px 9px;justify-content:center}
#commandBar #selectionModes svg{width:19px;height:19px;flex:0 0 auto}
#commandBar #selectionModes .mode-label{font-size:12px}
#commandBar #viewModes{margin-left:auto}
@media(max-width:900px){
  #commandBar{padding-left:8px;padding-right:8px;gap:6px}
  #commandBar #selectionModes button{min-width:40px;padding:5px 7px}
  #commandBar #selectionModes .mode-label{display:none}
}
`;
document.head.append(style);

if(viewportWrap)viewportWrap.dataset.commandBar='active';

const version=document.querySelector('#appVersion');
if(version)version.textContent='v0.36.5.0';
document.title='BoxLab v0.36.5.0';
