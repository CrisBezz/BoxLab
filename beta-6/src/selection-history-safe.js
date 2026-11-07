// BoxLab v0.36.18.34 — selection-aware Undo / Redo without changing mesh history entries.
// Keeps History.undoStack / redoStack as mesh clones exactly as before and
// maintains a parallel component-selection stack alongside them.

const history=globalThis.__boxlabHistory;
const multiToggle=document.querySelector('#multiSelectToggle');

function bridge(){return globalThis.__boxlabSelectionBridge;}
function snapshot(){
  const b=bridge();if(!b)return null;
  const mode=b.mode?.();if(!mode||mode==='object')return{mode,indices:[]};
  return{mode,indices:[...new Set(b.indices?.()||[])].filter(Number.isInteger)};
}
function cloneSnapshot(value){return value?{mode:value.mode,indices:[...(value.indices||[])]}:null;}
function restore(saved){
  if(!saved?.mode||saved.mode==='object')return;
  const ids=[...(saved.indices||[])].filter(Number.isInteger);
  queueMicrotask(()=>{
    const modeButton=document.querySelector(`#selectionModes button[data-mode="${saved.mode}"]`);
    if(modeButton&&!modeButton.classList.contains('active'))modeButton.click();
    queueMicrotask(()=>{
      const b=bridge();if(!b||b.mode?.()!==saved.mode)return;
      if(multiToggle){
        const wanted=ids.length>1;
        if(multiToggle.checked!==wanted){
          multiToggle.checked=wanted;
          multiToggle.dispatchEvent(new Event('change',{bubbles:true}));
        }
      }
      b.set?.(saved.mode,ids);
    });
  });
}

if(history&&!history.__boxlabSafeSelectionHistory){
  const originalPush=history.push.bind(history);
  const originalUndo=history.undo.bind(history);
  const originalRedo=history.redo.bind(history);
  const originalClear=history.clear.bind(history);
  const undoSelections=[];
  const redoSelections=[];

  history.push=function(mesh){
    undoSelections.push(cloneSnapshot(snapshot()));
    if(undoSelections.length>this.limit)undoSelections.shift();
    redoSelections.length=0;
    return originalPush(mesh);
  };

  history.undo=function(current){
    if(!this.undoStack?.length)return originalUndo(current);
    redoSelections.push(cloneSnapshot(snapshot()));
    const saved=undoSelections.pop()||null;
    const result=originalUndo(current);
    if(result)restore(saved);
    return result;
  };

  history.redo=function(current){
    if(!this.redoStack?.length)return originalRedo(current);
    undoSelections.push(cloneSnapshot(snapshot()));
    const saved=redoSelections.pop()||null;
    const result=originalRedo(current);
    if(result)restore(saved);
    return result;
  };

  history.clear=function(){
    undoSelections.length=0;redoSelections.length=0;
    return originalClear();
  };

  history.__boxlabSafeSelectionHistory=true;
}

globalThis.__boxlabSelectionHistorySafe={version:'0.36.18.34'};
