// BoxLab v0.36.18.40 — Edge Topology layout only.
// The Collapse Edge and Join Coplanar modules are dynamically loaded and may
// insert their buttons in either completion order. Re-apply a compact 3-column
// grid after those inserts so the iPad drawer never squeezes five buttons into
// one row. No tool/model state is touched here.

function applyLayout(){
  const deleteButton=document.querySelector('#deleteEdgeBtn');
  const row=deleteButton?.parentElement;
  if(!row)return false;
  row.style.gridTemplateColumns='repeat(3,minmax(0,1fr))';
  row.style.alignItems='stretch';
  for(const button of row.querySelectorAll('button')){
    button.style.minWidth='0';
    button.style.width='100%';
  }
  return true;
}

// Dynamic imports are intentionally independent, so cover both immediate and
// late completion without a broad MutationObserver.
[0,40,120,300,700].forEach(delay=>setTimeout(applyLayout,delay));
window.addEventListener('boxlab-bridge-state',applyLayout);

globalThis.__boxlabEdgeTopologyLayout={version:'0.36.18.40',sync:applyLayout};
