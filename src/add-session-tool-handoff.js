// BoxLab v0.36.18.156 — Add Vertex direct-tool handoff.
// Add owns document-level pointer gestures while its session is active. Newer
// tools such as Vertex Slide and Build Edge capture their own button clicks and
// can stop bubbling before Add's older per-button listeners run. End Add at
// document-capture time, but do not consume the click, so the requested tool
// can arm normally.

const addVertexBtn=document.querySelector('#addVertexBtn');

function addActive(){return !!globalThis.__boxlabAddVertex?.isActive?.();}
function stopAdd(){globalThis.__boxlabAddVertex?.stop?.(true);}

function isToolHandoffButton(button){
  if(!button||button===addVertexBtn)return false;
  return !!button.matches?.('#selectionModes button,#toolModes button,.mode-tools button,#lassoSelectBtn,#lassoBtn');
}

document.addEventListener('click',event=>{
  if(!addActive())return;
  const button=event.target?.closest?.('button');
  if(!isToolHandoffButton(button))return;
  stopAdd();
},true);

globalThis.__boxlabAddSessionToolHandoff={version:'0.36.18.156'};
