// BoxLab v0.36.18.49 — Face inspection layout only.
// Collects the existing Face diagnostic buttons into one compact row below
// the precision Face type-in/readout. No selection or modelling logic changes.

function install(){
  const faceTools=document.querySelector('[data-mode-tools="face"]');
  const precisionReadout=document.querySelector('#precisionFaceReadout');
  if(!faceTools||!precisionReadout)return false;

  const buttons=[
    document.querySelector('#selectNgonsBtn'),
    document.querySelector('#selectTrianglesBtn'),
    document.querySelector('#selectNonQuadsBtn'),
    document.querySelector('#selectNonPlanarBtn')
  ];
  if(buttons.some(button=>!button))return false;

  let row=document.querySelector('#faceInspectionRow');
  if(!row){
    row=document.createElement('div');
    row.id='faceInspectionRow';
    row.className='outliner-actions';
    row.style.cssText='grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;margin-top:6px';
    precisionReadout.insertAdjacentElement('afterend',row);
  }

  const labels=['Ngons','Tris','Non-Quads','Non-Planar'];
  buttons.forEach((button,index)=>{
    const oldParent=button.parentElement;
    button.textContent=labels[index];
    button.style.minWidth='0';
    button.style.width='100%';
    button.style.padding='5px 3px';
    button.style.fontSize='9px';
    row.appendChild(button);
    if(oldParent&&oldParent!==row&&!oldParent.children.length)oldParent.remove();
  });
  return true;
}

[0,40,120,300,700].forEach(delay=>setTimeout(install,delay));
window.addEventListener('boxlab-bridge-state',install);

globalThis.__boxlabFaceInspectionLayout={version:'0.36.18.49',sync:install};
