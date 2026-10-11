import { placeToolSessionPanel } from './tool-session-panel-position.js?v=0.36.18.732';
// BoxLab v0.36.18.684 — radial Knife viewport session.
// UX/session proxy only. knife-tool.js remains the authoritative Knife owner.

const viewportWrap=document.querySelector('#viewportWrap');
const status=document.querySelector('#selectionStatus');
let launchedFromHub=false;

const panel=document.createElement('div');
panel.id='selectionHubKnifeSession';
panel.hidden=true;
panel.innerHTML=`
  <div class="shk-title">Knife active</div>
  <div class="shk-note">Drag boundary → boundary • repeat as needed</div>
  <button type="button" class="shk-done">Done</button>
`;
viewportWrap?.append(panel);

const style=document.createElement('style');
style.textContent=`
#selectionHubKnifeSession{position:absolute;z-index:134;min-width:210px;padding:9px;border-radius:10px;background:rgba(18,20,24,.92);border:1px solid rgba(255,255,255,.16);box-shadow:0 10px 28px rgba(0,0,0,.38);color:#f5f7fa;font-size:11px;pointer-events:auto}
#selectionHubKnifeSession[hidden]{display:none}
#selectionHubKnifeSession .shk-title{font-weight:750;font-size:12px;margin-bottom:4px}
#selectionHubKnifeSession .shk-note{opacity:.72;margin-bottom:7px}
#selectionHubKnifeSession .shk-done{width:100%;min-height:30px}
`;
document.head.appendChild(style);

const done=panel.querySelector('.shk-done');

function place(){
  placeToolSessionPanel(panel);
}

function openFromHub(){
  if(!globalThis.__boxlabKnifeTool?.armed?.())return false;
  launchedFromHub=true;
  panel.hidden=false;
  place();
  if(status)status.textContent='Knife • drag boundary → boundary • repeat • Done when finished';
  requestAnimationFrame(place);
  return true;
}

function close({disarm=true}={}){
  const wasHub=launchedFromHub;
  launchedFromHub=false;
  panel.hidden=true;
  if(disarm)globalThis.__boxlabKnifeTool?.disarm?.('selection-hub-done');
  if(wasHub)window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{tool:'Knife',mode:'face'}}));
}

done.addEventListener('click',event=>{
  event.preventDefault();event.stopPropagation();
  close({disarm:true});
});

window.addEventListener('boxlab-knife-disarmed',()=>{
  if(!launchedFromHub)return;
  launchedFromHub=false;
  panel.hidden=true;
  window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{tool:'Knife',mode:'face'}}));
});

window.addEventListener('boxlab-selection-hub-tool',event=>{
  if(event.detail?.mode==='face'&&event.detail?.tool==='Knife')openFromHub();
});

globalThis.__boxlabKnifeViewportSession={
  version:'0.36.18.684',
  active:()=>launchedFromHub&&!panel.hidden,
  openFromHub,
  close,
  element:panel
};
