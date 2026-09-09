// BoxLab v0.36.18.88 — Face workflow layout polish.
// UI-only: re-homes existing Face selection helper rows beneath Precision/Repeat.
// Tool ownership, handlers, geometry and diagnostics remain untouched.

const faceTools=document.querySelector('[data-mode-tools="face"]');

function ensureGroup(){
  if(!faceTools)return null;
  let group=document.querySelector('#faceSelectionHelpersGroup');
  if(group)return group;

  group=document.createElement('div');
  group.id='faceSelectionHelpersGroup';
  group.style.cssText='margin:6px 0 4px';

  const label=document.createElement('div');
  label.textContent='SELECTION HELPERS';
  label.style.cssText='font-size:9px;line-height:1.1;letter-spacing:.35px;opacity:.55;margin:0 0 4px 1px';
  group.appendChild(label);

  const readout=document.querySelector('#precisionFaceReadout');
  const repeat=document.querySelector('#repeatFacePreviousRow');
  if(readout?.parentElement===faceTools)readout.insertAdjacentElement('afterend',group);
  else if(repeat?.parentElement===faceTools)repeat.insertAdjacentElement('afterend',group);
  else faceTools.appendChild(group);
  return group;
}

function sync(){
  const group=ensureGroup();
  if(!group)return false;

  const coplanar=document.querySelector('#coplanarRegionRow');
  const islands=document.querySelector('#faceIslandsRow');

  if(coplanar){
    coplanar.style.setProperty('display','grid');
    coplanar.style.setProperty('grid-template-columns','1fr');
    coplanar.style.setProperty('margin','0 0 4px');
    if(coplanar.parentElement!==group)group.appendChild(coplanar);
    const button=coplanar.querySelector('#selectCoplanarRegionBtn');
    if(button){button.style.minWidth='0';button.style.width='100%';}
  }

  if(islands){
    islands.style.setProperty('display','grid');
    islands.style.setProperty('grid-template-columns','repeat(2,minmax(0,1fr))');
    islands.style.setProperty('gap','4px');
    islands.style.setProperty('margin','0');
    if(islands.parentElement!==group)group.appendChild(islands);
    islands.querySelectorAll('button').forEach(button=>{
      button.style.minWidth='0';
      button.style.width='100%';
      button.style.fontSize='10px';
      button.style.padding='5px 4px';
    });
  }

  return !!(coplanar||islands);
}

[0,40,120,300,700,1000].forEach(delay=>setTimeout(sync,delay));
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(sync));
document.addEventListener('pointerup',()=>setTimeout(sync,0),true);

globalThis.__boxlabFaceWorkflowLayout={version:'0.36.18.88',sync};
