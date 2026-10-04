import {placeToolSessionPanel} from './tool-session-panel-position.js?v=0.36.18.732';
// Presentation only: move the original selection host, including late Object controls.
export function installViewportSelectionPanel(doc=document){
 const wrap=doc.querySelector('#viewportWrap'),bar=doc.querySelector('#viewportSelectionControls'),drawer=doc.querySelector('#selectionDrawer');
 if(!wrap||!bar||!drawer||doc.querySelector('#viewportSelectionPanel'))return null;
 const panel=doc.createElement('section');panel.id='viewportSelectionPanel';panel.hidden=true;
 panel.setAttribute('aria-label','Selection controls');placeToolSessionPanel(panel);
 const button=doc.createElement('button');button.id='viewportSelectionBtn';button.type='button';button.textContent='SELECT';button.title='Selection commands and filters';button.setAttribute('aria-controls',panel.id);button.setAttribute('aria-expanded','false');
 const closeButton=doc.createElement('button');closeButton.type='button';closeButton.className='selection-panel-close';closeButton.textContent='Close';closeButton.setAttribute('aria-label','Close selection controls');
 panel.append(closeButton,drawer);wrap.append(panel);bar.append(button);
 function close(){panel.hidden=true;button.setAttribute('aria-expanded','false');button.classList.remove('active');}
 function toggle(){
  if(!panel.hidden){close();return true;}
  if(globalThis.__boxlabToolSession?.isActive?.())return false;
  globalThis.__boxlabObjectSelectionLayout?.sync?.();
  panel.hidden=false;button.setAttribute('aria-expanded','true');button.classList.add('active');return true;
 }
 button.addEventListener('click',toggle);closeButton.addEventListener('click',close);
 doc.addEventListener('pointerdown',event=>{if(!panel.hidden&&event.target===doc.querySelector('#viewport'))close();},true);
 doc.addEventListener('keydown',event=>{if(event.key==='Escape')close();});
 window.addEventListener('boxlab-tool-session-change',event=>{if(event.detail?.active)close();});
 const style=doc.createElement('style');style.textContent=`
#viewportSelectionPanel[hidden]{display:none!important}
#viewportSelectionPanel{width:max-content;max-width:calc(100% - 16px);padding:7px 8px;border:1px solid rgba(255,255,255,.2);border-radius:12px;background:rgba(20,23,30,.98);box-shadow:0 10px 28px #0006}
#viewportSelectionPanel #selectionDrawer{position:static;margin:0;border:0;background:transparent;box-shadow:none}
#viewportSelectionPanel #selectionDrawer .always-selection-title{padding-right:70px}
#viewportSelectionPanel .selection-panel-close{position:absolute;top:8px;right:8px;width:auto;min-height:30px;padding:4px 10px;margin:0}
#viewportSelectionPanel #objectManagementTools{padding:8px!important}
#viewportSelectionControls #viewportSelectionBtn{order:4;width:auto;min-width:52px;font-size:11px;letter-spacing:.03em}
@media(max-width:500px){
 #viewportSelectionControls{left:8px;gap:3px;padding:4px 6px;max-width:calc(100% - 16px);box-sizing:border-box}
 #viewportSelectionControls label,#viewportSelectionControls>button{width:34px;height:38px}
 #viewportSelectionControls #viewportSelectionBtn{min-width:45px;padding:5px;font-size:10px}
 #viewportSelectionControls>span{font-size:10px;margin-right:0}
}
`;doc.head.append(style);
 return {toggle,close,panel,button,drawer};
}
