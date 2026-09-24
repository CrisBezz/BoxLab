const VERSION='0.36.18.456';

function currentMode(){
  return globalThis.__boxlabSelectionBridge?.mode?.()
    || document.querySelector('#selectionModes button.active')?.dataset?.mode
    || 'face';
}
function isEditableTarget(target){
  if(!target)return false;
  const el=target.nodeType===1?target:target.parentElement;
  if(!el)return false;
  if(el.isContentEditable)return true;
  const tag=el.tagName?.toLowerCase();
  if(tag==='input'||tag==='textarea'||tag==='select')return true;
  if(el.closest?.('[contenteditable="true"],input,textarea,select'))return true;
  return false;
}
function deleteButtonFor(mode){
  if(mode==='vertex')return document.querySelector('#deleteVertexBtn');
  if(mode==='edge')return document.querySelector('#deleteEdgeBtn');
  if(mode==='face')return document.querySelector('#deleteFaceBtn');
  if(mode==='object')return document.querySelector('#outlinerDeleteBtn');
  return null;
}
function handleDeleteKey(event){
  if(event.defaultPrevented)return;
  if(event.key!=='Delete'&&event.key!=='Backspace')return;
  if(event.altKey||event.ctrlKey||event.metaKey)return;
  if(isEditableTarget(event.target))return;

  const mode=currentMode(),button=deleteButtonFor(mode);
  if(!button||button.disabled)return;

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation?.();
  button.click();
}

window.addEventListener('keydown',handleDeleteKey,true);

globalThis.__boxlabDeleteKey={
  version:VERSION,
  mode:currentMode,
  targetFor:deleteButtonFor,
  handle:handleDeleteKey
};
