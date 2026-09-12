// BoxLab v0.36.18.166 — Add Vertex direct-tool handoff.
// Add owns document-level pointer gestures while its session is active. Newer
// tools such as Vertex Slide and Build Edge can capture their own clicks, so end
// Add at pointerdown capture time before those tools see the gesture. Keep the
// click listener as a fallback. Selection-mode buttons stay excluded because
// Add uses an internal Vertex-mode click while starting its own session.

const addVertexBtn=document.querySelector('#addVertexBtn');

function addActive(){return !!globalThis.__boxlabAddVertex?.isActive?.();}
function stopAdd(){globalThis.__boxlabAddVertex?.stop?.(true);}

function isToolHandoffButton(button){
  if(!button||button===addVertexBtn)return false;
  return !!button.matches?.('#toolModes button,.mode-tools button,#lassoSelectBtn,#lassoBtn');
}

function handoff(event){
  if(!addActive())return;
  const button=event.target?.closest?.('button');
  if(!isToolHandoffButton(button))return;
  stopAdd();
}

document.addEventListener('pointerdown',handoff,true);
document.addEventListener('click',handoff,true);

globalThis.__boxlabAddSessionToolHandoff={version:'0.36.18.166'};
