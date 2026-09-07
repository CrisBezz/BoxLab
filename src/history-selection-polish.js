// BoxLab v0.36.18.29 — selection-aware Undo / Redo adjunct.
// Wraps the existing History instance so geometry history remains owned by the
// stable core while component selection is restored after the core redraw.

const history=globalThis.__boxlabHistory;
const multiToggle=document.querySelector('#multiSelectToggle');

function bridge(){return globalThis.__boxlabSelectionBridge;}
function snapshot(){
  const b=bridge();
  if(!b)return null;
  const mode=b.mode?.();
  if(!mode)return null;
  const indices=mode==='object'?[0]:[...new Set(b.indices?.()||[])].filter(Number.isInteger);
  return{mode,indices};
}
function restoreSelection(saved){
  if(!saved?.mode)return;
  setTimeout(()=>{
    const modeButton=document.querySelector(`#selectionModes button[data-mode="${saved.mode}"]`);
    if(modeButton&&!modeButton.classList.contains('active'))modeButton.click();
    queueMicrotask(()=>{
      const b=bridge();
      if(!b||b.mode?.()!==saved.mode)return;
      if(saved.mode==='object'){
        // Object mode selection is managed by the object workflow; selecting the
        // mode is sufficient and avoids manufacturing an object index here.
        return;
      }
      const ids=[...(saved.indices||[])].filter(Number.isInteger);
      if(multiToggle){
        const shouldMulti=ids.length>1;
        if(multiToggle.checked!==shouldMulti){
          multiToggle.checked=shouldMulti;
          multiToggle.dispatchEvent(new Event('change',{bubbles:true}));
        }
      }
      b.set?.(saved.mode,ids);
      const status=document.querySelector('#selectionStatus');
      if(status&&ids.length)status.textContent=`Undo selection restored • ${ids.length} ${saved.mode}${ids.length===1?'':'s'}`;
    });
  },0);
}

if(history&&!history.__boxlabSelectionHistoryWrapped){
  const originalPush=history.push.bind(history);
  const originalUndo=history.undo.bind(history);
  const originalRedo=history.redo.bind(history);
  const originalClear=history.clear.bind(history);
  const undoSelections=[];
  const redoSelections=[];

  history.push=function(mesh){
    undoSelections.push(snapshot());
    if(undoSelections.length>this.limit)undoSelections.shift();
    redoSelections.length=0;
    return originalPush(mesh);
  };
  history.undo=function(current){
    if(!this.undoStack?.length)return originalUndo(current);
    redoSelections.push(snapshot());
    const saved=undoSelections.pop()||this.lastRestoredSelection||null;
    const result=originalUndo(current);
    if(result)restoreSelection(saved||this.lastRestoredSelection);
    return result;
  };
  history.redo=function(current){
    if(!this.redoStack?.length)return originalRedo(current);
    undoSelections.push(snapshot());
    const saved=redoSelections.pop()||this.lastRestoredSelection||null;
    const result=originalRedo(current);
    if(result)restoreSelection(saved||this.lastRestoredSelection);
    return result;
  };
  history.clear=function(){
    undoSelections.length=0;
    redoSelections.length=0;
    return originalClear();
  };
  history.__boxlabSelectionHistoryWrapped=true;
}

globalThis.__boxlabHistorySelectionPolish={version:'0.36.18.29'};
