import './duplicate-faces.js?v=0.36.18.89';
import './flip-faces.js?v=0.36.18.90';
import './triangulate-faces.js?v=0.36.18.91';
import './poke-faces.js?v=0.36.18.92';
import './make-planar.js?v=0.36.18.93';
import './orient-faces.js?v=0.36.18.94';
import './orient-shell-outward.js?v=0.36.18.95';
import './rotate-edge.js?v=0.36.18.96';
import './select-sharp-edges.js?v=0.36.18.126';
import './select-boundary-structure.js?v=0.36.18.131';
import './select-tri-pairs.js?v=0.36.18.133';
import './select-cleanable-verts.js?v=0.36.18.134';
import './select-vertex-classification.js?v=0.36.18.115';
import './select-vertex-valence.js?v=0.36.18.134';
import './select-mergeable-verts.js?v=0.36.18.137';
import './select-intersecting-faces.js?v=0.36.18.137';
import './select-quads.js?v=0.36.18.128';
import './mesh-health-summary.js?v=0.36.18.175';
import './face-inspect-drawer.js?v=0.36.18.141';
import './face-repair-drawer.js?v=0.36.18.145';
import './diagnostic-drawer-state.js?v=0.36.18.176';
import './clean-view.js?v=0.36.18.179';
import './cavity-view.js?v=0.36.18.184';
import './live-mesh-bridge.js?v=0.36.18.169';
import './release-version.js?v=0.36.18.184';
import './beta-runtime-guard.js?v=0.36.18.184';
import './loop-cut-feedback.js?v=0.36.18.184';

// BoxLab v0.36.18.184 — Cavity viewport diagnostic.
// Visual-only display work; modelling tools own their own handlers.

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
      button.style.minWidth='0';button.style.width='100%';button.style.fontSize='10px';button.style.padding='5px 4px';
    });
  }

  return !!(coplanar||islands);
}

[0,120,500,1000].forEach(delay=>setTimeout(sync,delay));
window.addEventListener('boxlab-bridge-state',()=>queueMicrotask(sync));
document.addEventListener('pointerup',()=>setTimeout(sync,0),true);

globalThis.__boxlabFaceWorkflowLayout={version:'0.36.18.184',sync};
