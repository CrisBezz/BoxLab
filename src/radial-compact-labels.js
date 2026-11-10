// Staggered presentation positions preserve original tool order and angular sectors.
export function radialToolPosition(angle,outer=false){
 const a=((Number(angle)%360)+360)%360;
 if(!outer){const t=a*Math.PI/180;return{x:84*Math.sin(t),y:-84*Math.cos(t)};}
 const slots=[[0,-140],[56,-140],[112,-112],[134,-56],[134,0],[134,56],[112,112],[56,140],[0,140],[-56,140],[-112,112],[-134,56],[-134,0],[-134,-56],[-112,-112],[-56,-140]],i=Math.floor(a/22.5),t=a/22.5-i,p=slots[i],q=slots[(i+1)%16];
 return{x:p[0]+(q[0]-p[0])*t,y:p[1]+(q[1]-p[1])*t};
}
// Preserve original buttons/targets/listeners and full names for speech/tooltips.
export function compactRadialLabels(buttons,doc=document){
 for(const button of buttons){
  const angle=parseFloat(button.style?.getPropertyValue?.('--a'));
  if(Number.isFinite(angle)){const p=radialToolPosition(angle,button.classList.contains('tg-tool-outer'));button.style.setProperty('--radial-x',p.x+'px');button.style.setProperty('--radial-y',p.y+'px');button.style.setProperty('--radial-unit-x',p.x/140);button.style.setProperty('--radial-unit-y',p.y/140);}

  if(button.querySelector?.('.radial-caption'))continue;
  const label=button.textContent.trim(),caption=doc.createElement('span');
  caption.className='radial-caption';caption.textContent=label;
  button.textContent='';button.appendChild(caption);
  button.setAttribute('aria-label',button.getAttribute('aria-label')||label);
  button.dataset.radialTitle=button.getAttribute('title')||label;
  button.setAttribute('title',button.dataset.radialTitle);
 }
}
