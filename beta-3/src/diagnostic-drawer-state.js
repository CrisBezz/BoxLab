// BoxLab v0.36.18.176 — diagnostic drawer state reset.
// Mesh Health / Inspect / Repair are transient to the current selection mode.
// Changing Vertex / Edge / Face / Object collapses all diagnostic drawers first.
// Existing handoffs may then explicitly reopen the intended target drawer.

const VERSION='0.36.18.176';

const IDS=[
  'meshHealthSummary','faceInspectDrawer','faceRepairDrawer',
  'vertexMeshHealthSummary','vertexInspectDrawer','vertexRepairDrawer',
  'edgeMeshHealthSummary','edgeInspectDrawer','edgeRepairDrawer'
];

function closeAll(){
  for(const id of IDS){
    const details=document.getElementById(id);
    if(details?.tagName==='DETAILS'&&details.open)details.open=false;
  }
}

for(const button of document.querySelectorAll('#selectionModes button')){
  button.addEventListener('click',closeAll,true);
}

globalThis.__boxlabDiagnosticDrawerState={version:VERSION,closeAll};
