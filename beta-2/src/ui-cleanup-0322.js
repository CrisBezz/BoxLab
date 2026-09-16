const transformButtons=[...document.querySelectorAll('#toolModes button')];
const extrude=document.querySelector('#extrudeBtn');
const inset=document.querySelector('#insetBtn');
const modifiers=document.querySelector('#modifiersDrawer .drawer-content');
const crease=document.querySelector('#applyCreaseBtn');
const uncrease=document.querySelector('#clearCreaseBtn');
const strength=document.querySelector('#creaseStrength')?.closest('.range-row');
const duplicate=document.querySelector('#applyCreaseBtnMirror');

duplicate?.remove();

function subtitle(text,cls=''){const el=document.createElement('div');el.className=`drawer-subtitle ${cls}`.trim();el.textContent=text;return el;}
if(modifiers){
  const subdToggle=document.querySelector('#subdToggle')?.closest('label');
  const cageToggle=document.querySelector('#cageToggle')?.closest('label');
  const level=document.querySelector('#subdLevel')?.closest('.range-row');
  const align=document.querySelector('#alignMirrorBtn');
  const mirrors=[...document.querySelectorAll('[data-mirror-axis]')].map(input=>input.closest('label')).filter(Boolean);
  const creaseRow=document.createElement('div');creaseRow.className='crease-button-row boxlab-modifier-crease-actions';
  if(crease) creaseRow.append(crease);
  if(uncrease) creaseRow.append(uncrease);
  const mirrorRow=document.createElement('div');mirrorRow.className='boxlab-mirror-row';mirrors.forEach(label=>mirrorRow.append(label));
  modifiers.replaceChildren(
    subtitle('Subdivision','boxlab-subd-title'),
    ...(subdToggle?[subdToggle]:[]),
    ...(cageToggle?[cageToggle]:[]),
    ...(level?[level]:[]),
    subtitle('Crease','boxlab-crease-title'),
    ...(strength?[strength]:[]),
    ...(creaseRow.children.length?[creaseRow]:[]),
    subtitle('Mirror','boxlab-mirror-title'),
    ...(mirrorRow.children.length?[mirrorRow]:[]),
    ...(align?[align]:[])
  );
}

const edgePrimary=document.querySelector('.edge-primary-actions');
if(edgePrimary) edgePrimary.style.gridTemplateColumns=`repeat(${Math.max(1,edgePrimary.children.length)},minmax(0,1fr))`;

function syncDirectVsTransform(){const direct=!!document.querySelector('#extrudeBtn.active,#insetBtn.active');document.querySelector('#transformStrip')?.classList.toggle('direct-tool-active',direct);}
for(const button of [extrude,inset]) if(button){button.addEventListener('click',()=>queueMicrotask(syncDirectVsTransform),true);new MutationObserver(()=>queueMicrotask(syncDirectVsTransform)).observe(button,{attributes:true,attributeFilter:['class']});}
for(const button of transformButtons) button.addEventListener('click',()=>queueMicrotask(syncDirectVsTransform),true);

const style=document.createElement('style');
style.textContent=`
.boxlab-modifier-crease-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.boxlab-modifier-crease-actions button{margin:0!important}
#modifiersDrawer #creaseStrength{width:100%}
.boxlab-mirror-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
.boxlab-mirror-row .toggle-row{grid-template-columns:auto 1fr;justify-content:center;margin:0;min-width:0;padding:4px 6px!important;font-size:12px}
#modifiersDrawer .boxlab-subd-title{margin-top:0}
#modifiersDrawer .boxlab-crease-title,#modifiersDrawer .boxlab-mirror-title{margin-top:12px}
`;
document.head.append(style);
syncDirectVsTransform();
