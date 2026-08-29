const transformButtons=[...document.querySelectorAll('#toolModes button')];
const extrude=document.querySelector('#extrudeBtn');
const inset=document.querySelector('#insetBtn');
const modifiers=document.querySelector('#modifiersDrawer .drawer-content');
const crease=document.querySelector('#applyCreaseBtn');
const uncrease=document.querySelector('#clearCreaseBtn');
const strength=document.querySelector('#creaseStrength')?.closest('.range-row');
const duplicate=document.querySelector('#applyCreaseBtnMirror');

duplicate?.remove();

if(modifiers&&crease&&uncrease&&strength){
  const title=document.createElement('div');title.className='drawer-subtitle boxlab-crease-title';title.textContent='Crease';
  const row=document.createElement('div');row.className='crease-button-row boxlab-modifier-crease-actions';
  const anchor=[...modifiers.children].find(el=>el.classList?.contains('drawer-subtitle')&&el.textContent.trim()==='Subdivision');
  if(anchor) modifiers.insertBefore(title,anchor); else modifiers.append(title);
  modifiers.insertBefore(strength,anchor||null);
  row.append(crease,uncrease);
  modifiers.insertBefore(row,anchor||null);
}

const edgePrimary=document.querySelector('.edge-primary-actions');
if(edgePrimary) edgePrimary.style.gridTemplateColumns=`repeat(${Math.max(1,edgePrimary.children.length)},minmax(0,1fr))`;

function syncDirectVsTransform(){
  const direct=!!document.querySelector('#extrudeBtn.active,#insetBtn.active');
  document.querySelector('#transformStrip')?.classList.toggle('direct-tool-active',direct);
}
for(const button of [extrude,inset]) if(button){
  button.addEventListener('click',()=>queueMicrotask(syncDirectVsTransform),true);
  new MutationObserver(()=>queueMicrotask(syncDirectVsTransform)).observe(button,{attributes:true,attributeFilter:['class']});
}
for(const button of transformButtons) button.addEventListener('click',()=>queueMicrotask(syncDirectVsTransform),true);

const style=document.createElement('style');
style.textContent=`
.boxlab-modifier-crease-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.boxlab-modifier-crease-actions button{margin:0!important}
#modifiersDrawer .boxlab-crease-title{margin-top:10px}
#modifiersDrawer #creaseStrength{width:100%}
`;
document.head.append(style);
syncDirectVsTransform();
