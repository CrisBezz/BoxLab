// The native details element owns `open`; its original panel lives outside the
// disclosed-content subtree so a fixed scrolling surface is not painted through it.
const surfaces=new WeakMap();
export function mountViewMenuSurface({menu,panel,parent,Observer=globalThis.MutationObserver}){
 if(!menu||!panel||!parent)return null;
 if(surfaces.has(menu))return surfaces.get(menu);
 const summary=menu.querySelector('summary');
 panel.id='viewModesPanel';
 panel.setAttribute('role','region');panel.setAttribute('aria-label','View settings');
 summary?.setAttribute('aria-controls',panel.id);
 const scrollElement=panel.querySelector('#viewModesScroll')||panel;
 let scrollTop=scrollElement.scrollTop||0;
 // A closed panel must have no layout surface, including during its initial move.
 panel.hidden=true;
 parent.appendChild(panel);
 function sync(){
  const open=!!menu.open;
  if(!open&&!panel.hidden)scrollTop=scrollElement.scrollTop;
  if(panel.hidden===open){panel.hidden=!open;if(open)scrollElement.scrollTop=scrollTop;}
  summary?.setAttribute('aria-expanded',String(open));
 }
 const observer=typeof Observer==='function'?new Observer(sync):null;
 if(observer)observer.observe(menu,{attributes:true,attributeFilter:['open']});
 else menu.addEventListener('toggle',sync);
 const firstControl=()=>panel.querySelector('button:not(:disabled),input:not(:disabled),select:not(:disabled)');
 summary?.addEventListener('keydown',event=>{
  if(menu.open&&(event.key==='ArrowDown'||event.key==='Tab'&&!event.shiftKey)){
   const first=firstControl();if(first){event.preventDefault();first.focus();}
  }
 });
 panel.addEventListener('keydown',event=>{
  if(event.key==='Escape'){menu.open=false;summary?.focus();event.preventDefault();event.stopPropagation();}
  else if(event.key==='Tab'&&event.shiftKey&&event.target===firstControl()){event.preventDefault();summary?.focus();}
 });
 const surface={panel,scrollElement,sync};surfaces.set(menu,surface);sync();
 return surface;
}
