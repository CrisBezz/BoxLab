// BoxLab v0.36.18.345 — prevent Safari native selection/callout during modelling.
// Keep text/value entry available in real editable controls.

const STYLE_ID='boxlabInteractionGuardStyle';

function editableTarget(target){
  const el=target instanceof Element?target:null;
  return !!el?.closest?.('input,textarea,select,[contenteditable="true"],[contenteditable=""],[data-allow-selection="true"]');
}

function installStyle(){
  if(document.getElementById(STYLE_ID))return;
  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent='html,body,#app,#viewportWrap,#viewport,.topbar,.floating-panel,.statusbar{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}button,summary,label,.panel-title,.drawer-subtitle,.outliner-row,.outliner-name,.selection-context,.selection-dock{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}input,textarea,select,[contenteditable="true"],[contenteditable=""],[data-allow-selection="true"]{-webkit-user-select:text;user-select:text;-webkit-touch-callout:default}';
  document.head.appendChild(style);
}

function blockNativeSelection(event){
  if(editableTarget(event.target))return;
  event.preventDefault();
}

function blockNativeDrag(event){
  if(editableTarget(event.target))return;
  event.preventDefault();
}

installStyle();
document.addEventListener('selectstart',blockNativeSelection,{capture:true});
document.addEventListener('dragstart',blockNativeDrag,{capture:true});

globalThis.__boxlabInteractionGuard={
  version:'0.36.18.345',
  editableTarget,
  installed:()=>!!document.getElementById(STYLE_ID)
};
