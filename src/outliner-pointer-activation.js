const list=document.querySelector('#outlinerList');
const contacts=new Map();
let dispatchingNativeActivation=false,suppressedNativeClick=null;
const DRAG_CANCEL_PX=8;

list?.addEventListener('pointerdown',event=>{
  if(event.pointerType==='mouse'||event.button!==0)return;
  const target=event.target?.closest?.('button,summary');
  if(!target||!list.contains(target))return;
  contacts.set(event.pointerId,{target,x:event.clientX,y:event.clientY});
},{capture:true,passive:true});

list?.addEventListener('pointermove',event=>{
  const contact=contacts.get(event.pointerId);if(!contact)return;
  if(Math.hypot(event.clientX-contact.x,event.clientY-contact.y)>=DRAG_CANCEL_PX)contact.moved=true;
},{capture:true,passive:true});

list?.addEventListener('pointerup',event=>{
  const contact=contacts.get(event.pointerId);contacts.delete(event.pointerId);
  if(!contact||contact.moved||Math.hypot(event.clientX-contact.x,event.clientY-contact.y)>=DRAG_CANCEL_PX||!contact.target.isConnected)return;
  event.preventDefault?.();
  event.stopPropagation?.();
  dispatchingNativeActivation=true;
  try{contact.target.click();}finally{dispatchingNativeActivation=false;}
  suppressedNativeClick={target:contact.target,x:event.clientX,y:event.clientY,until:performance.now()+500};
},{capture:true,passive:false});

list?.addEventListener('pointercancel',event=>contacts.delete(event.pointerId),{capture:true,passive:true});
document.addEventListener('click',event=>{
  if(dispatchingNativeActivation||!suppressedNativeClick)return;
  if(performance.now()>=suppressedNativeClick.until){suppressedNativeClick=null;return;}
  const target=event.target?.closest?.('#outlinerList button,#outlinerList summary');
  if(target!==suppressedNativeClick.target||Math.hypot(event.clientX-suppressedNativeClick.x,event.clientY-suppressedNativeClick.y)>=DRAG_CANCEL_PX)return;
  suppressedNativeClick=null;
  event.preventDefault();event.stopImmediatePropagation();
},true);

globalThis.__boxlabOutlinerPointerActivation={version:'0.36.18.1100'};
