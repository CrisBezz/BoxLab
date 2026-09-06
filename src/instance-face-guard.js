// BoxLab v0.36.19.6 — direct face-tool ownership guard for linked instances.
// Tracks Extrude / Inset independently of CSS so late renders cannot hand the
// same Pencil gesture back to ordinary face Move. Also restores the face set
// captured when the tool was armed and emits a post-pointerup commit hook after
// the direct face controller has had a chance to finish its topology transaction.

const canvas=document.querySelector('#viewport');
const status=document.querySelector('#selectionStatus');
let tool=null;
let pressedTool=null;
let savedFaces=[];

function bridge(){return globalThis.__boxlabSelectionBridge;}
function faceMode(){return bridge()?.mode?.()==='face'||document.querySelector('#selectionModes button.active')?.dataset?.mode==='face';}
function faceIds(){return faceMode()?[...new Set(bridge()?.indices?.()||[])]:[];}
function setTool(next){tool=next||null;if(!tool){pressedTool=null;savedFaces=[];}}

// Capture selected faces before the button click. The direct face controller may
// cause one or more renders while arming; those renders must not lose the face set.
window.addEventListener('pointerdown',event=>{
  const faceButton=event.target?.closest?.('#extrudeBtn,#insetBtn');
  if(faceButton){
    pressedTool=faceButton.id==='extrudeBtn'?'extrude':'inset';
    const ids=faceIds();
    if(ids.length)savedFaces=ids;
    return;
  }
  if(event.target?.closest?.('#toolModes button,#knifeBtn,#selectionModes button:not([data-mode="face"])')){
    setTool(null);
    return;
  }
  if(event.target===canvas&&tool&&faceMode()){
    const ids=faceIds();
    if(!ids.length&&savedFaces.length)bridge()?.set?.('face',savedFaces);
  }
},true);

// Mirror the direct controller's arm/disarm semantics before its document-level
// click handler runs. This state is intentionally independent of button classes.
window.addEventListener('click',event=>{
  const faceButton=event.target?.closest?.('#extrudeBtn,#insetBtn');
  if(faceButton){
    const next=faceButton.id==='extrudeBtn'?'extrude':'inset';
    setTool(tool===next?null:next);
    if(tool&&pressedTool===tool){
      const ids=faceIds();
      if(ids.length)savedFaces=ids;
    }
    pressedTool=null;
    return;
  }
  if(event.target?.closest?.('#toolModes button,#knifeBtn'))setTool(null);
},true);

// Registered after multi-face-direct.js. If this handler runs, the direct face
// controller did not claim the canvas gesture. Do not let face-transform.js fall
// through and reinterpret an attempted Extrude/Inset as ordinary face Move.
document.addEventListener('pointerdown',event=>{
  if(event.target!==canvas||!event.isPrimary||!tool||!faceMode())return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if(status)status.textContent=`${tool==='extrude'?'Extrude':'Inset'} • select a face and drag`;
},true);

// Window pointerup precedes the direct controller's document pointerup. Defer the
// linked-source commit to the next task so the final cap/side topology is already
// committed (or the drag has rolled back) before instance propagation runs.
window.addEventListener('pointerup',event=>{
  if(event.target!==canvas||!tool||!faceMode())return;
  setTimeout(()=>window.dispatchEvent(new CustomEvent('boxlab-instance-face-fallback-commit')),0);
},true);

window.addEventListener('pointercancel',event=>{
  if(event.target===canvas&&tool)setTimeout(()=>window.dispatchEvent(new CustomEvent('boxlab-instance-face-fallback-commit')),0);
},true);

globalThis.__boxlabFaceToolGuard={version:'0.36.19.6',active:()=>!!tool,tool:()=>tool};
