function selectionSnapshot(){
  const bridge=globalThis.__boxlabSelectionBridge;
  if(!bridge)return null;
  const mode=bridge.mode?.();
  if(!mode)return null;
  const indices=mode==='object'?[0]:[...new Set(bridge.indices?.()||[])].filter(Number.isInteger);
  return{mode,indices};
}
function makeEntry(mesh,selection=selectionSnapshot()){
  return{mesh:mesh.clone(),selection:selection?{mode:selection.mode,indices:[...(selection.indices||[])]}:null};
}
function normalizeEntry(entry){
  if(!entry)return null;
  // Backward-compatible with any old in-memory mesh-only history entries.
  return entry.mesh?entry:{mesh:entry,selection:null};
}

export class History{
  constructor(limit=50){
    this.limit=limit;
    this.undoStack=[];
    this.redoStack=[];
    this.lastRestoredSelection=null;
    if(typeof window!=='undefined')window.__boxlabHistory=this;
  }
  push(mesh){
    this.undoStack.push(makeEntry(mesh));
    if(this.undoStack.length>this.limit)this.undoStack.shift();
    this.redoStack.length=0;
  }
  undo(current){
    if(!this.undoStack.length)return null;
    this.redoStack.push(makeEntry(current));
    const entry=normalizeEntry(this.undoStack.pop());
    this.lastRestoredSelection=entry?.selection||null;
    return entry?.mesh||null;
  }
  redo(current){
    if(!this.redoStack.length)return null;
    this.undoStack.push(makeEntry(current));
    const entry=normalizeEntry(this.redoStack.pop());
    this.lastRestoredSelection=entry?.selection||null;
    return entry?.mesh||null;
  }
  clear(){
    this.undoStack.length=0;
    this.redoStack.length=0;
    this.lastRestoredSelection=null;
  }
}
