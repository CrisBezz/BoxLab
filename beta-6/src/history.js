export class History{
  constructor(limit=50){this.limit=limit;this.undoStack=[];this.redoStack=[];if(typeof window!=='undefined')window.__boxlabHistory=this;}
  push(mesh){this.undoStack.push(mesh.clone());if(this.undoStack.length>this.limit)this.undoStack.shift();this.redoStack.length=0;}
  undo(current){if(!this.undoStack.length)return null;this.redoStack.push(current.clone());return this.undoStack.pop();}
  redo(current){if(!this.redoStack.length)return null;this.undoStack.push(current.clone());return this.redoStack.pop();}
  clear(){this.undoStack.length=0;this.redoStack.length=0;}
}
