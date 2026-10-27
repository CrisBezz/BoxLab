import {placeToolSessionPanel} from './tool-session-panel-position.js?v=0.36.18.963';
// Reparent the original controls; all control listeners and values stay with them.
export function createFacegroupPaintDock({document,viewport,node,home,onClose=()=>{},onOpen=()=>{}}){
 const element=document.createElement('section');element.id='facegroupPaintDock';element.hidden=true;
 element.setAttribute('aria-label','Facegroup painting');
 const header=document.createElement('div');header.className='facegroup-dock-header';
 const title=document.createElement('strong');title.textContent='Facegroup paint';
 const done=document.createElement('button');done.type='button';done.textContent='Done';done.setAttribute('aria-label','Finish facegroup painting');
 header.append(title,done);element.appendChild(header);viewport?.appendChild(element);
 function close(){onClose();if(node&&home)home.appendChild(node);element.hidden=true;return true;}
 function open(){if(!viewport||!node)return false;placeToolSessionPanel(element,{compact:true});Object.assign(element.style,{left:'8px',top:'8px',transform:'none',width:'290px'});element.appendChild(node);element.hidden=false;onOpen();return true;}
 done.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();close();});
 return {element,open,close,get visible(){return !element.hidden;}};
}
