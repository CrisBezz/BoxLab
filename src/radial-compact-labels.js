// Preserve original buttons/targets/listeners and full names for speech/tooltips.
export function compactRadialLabels(buttons,doc=document){
 for(const button of buttons){
  if(button.querySelector?.('.radial-caption'))continue;
  const label=button.textContent.trim(),caption=doc.createElement('span');
  caption.className='radial-caption';caption.textContent=label;
  button.textContent='';button.appendChild(caption);
  button.setAttribute('aria-label',button.getAttribute('aria-label')||label);
  button.dataset.radialTitle=button.getAttribute('title')||label;
  button.setAttribute('title',button.dataset.radialTitle);
 }
}
