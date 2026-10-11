import {appendStrokePoint,simplifyStroke} from './stroke-sampling.js?v=0.36.18.808';
import {curvePoints,makeCurveProfile,editableCurveProfile} from './curve-profile-core.js?v=0.36.18.813';
import {createAddObjectPreview} from './add-object-preview.js?v=0.36.18.795';
const VERSION='0.36.18.813',W=320,H=180,NS='http://www.w3.org/2000/svg';
const manager=()=>globalThis.__boxlabObjectManager,session=()=>globalThis.__boxlabToolSession;
const activeObject=()=>{const m=manager();return m?.objects.find(o=>o.id===m.activeId);};
let panel=null,pad=null,path=null,handles=null,note=null,applyButton=null,profile=null,objectId=null,drag=null,edit=false,undos=[],committing=false,preview=null;
const node=(tag,text)=>{const n=document.createElement(tag);if(text)n.textContent=text;return n;};
const svgNode=tag=>document.createElementNS(NS,tag);
const style=node('style');style.textContent='#curveProfilePanel{font-size:12px}#curveProfilePanel button{font-size:11px;min-height:34px;padding:5px 7px}#curveProfilePad{width:320px;max-width:100%;height:180px;display:block;background:#10141b;border:1px solid #ffffff30;border-radius:7px;touch-action:none}#curveProfilePad circle{fill:#f3b34a;stroke:#15171b;stroke-width:1}#curveProfilePanel label{display:grid;grid-template-columns:60px 1fr 32px;gap:5px;align-items:center;font-size:11px}';document.head.appendChild(style);
const clone=()=>structuredClone(profile),status=t=>{if(note)note.textContent=t;};
function remember(){undos.push(clone());if(undos.length>30)undos.shift();}
function point(event){const r=pad.getBoundingClientRect();return{x:Math.max(0,Math.min(W,(event.clientX-r.left)*W/r.width)),y:Math.max(0,Math.min(H,(event.clientY-r.top)*H/r.height))};}
const local=p=>({x:(p.x-W/2)/H,y:(H/2-p.y)/H}),screen=p=>({x:W/2+p.x*H,y:H/2-p.y*H});
function release(){if(drag){try{pad.releasePointerCapture(drag.id);}catch{}drag=null;}}
function finish(){release();preview?.dispose();preview=null;const old=panel;panel=null;profile=null;session()?.end?.('curve-profile');old?.remove();window.dispatchEvent(new CustomEvent('boxlab-selection-hub-session-complete',{detail:{mode:'object',tool:'Curve'}}));}
function cancel(){if(!panel)return false;finish();return true;}
function draw(){
 if(!panel)return;handles.replaceChildren();let points=[];
 try{points=curvePoints(profile);const mesh=drag&&profile.output==='balloon'?null:makeCurveProfile(profile);preview?.setMesh(mesh);applyButton.disabled=!!drag;status(mesh&&profile.output==='balloon'?`${mesh.vertices.length} vertices · ${mesh.faces.length} triangles`:`${profile.points.length} control points · ${points.length} curve vertices`);}catch(e){preview?.setMesh(null);applyButton.disabled=true;status(e.message);}
 path.setAttribute('points',points.map(screen).map(p=>`${p.x},${p.y}`).join(' ')+(profile.closed&&points.length?' '+Object.values(screen(points[0])).join(','):''));
 if(edit)profile.points.forEach((p,i)=>{const dot=svgNode('circle'),q=screen(p);dot.setAttribute('cx',q.x);dot.setAttribute('cy',q.y);dot.setAttribute('r',4);dot.dataset.curvePoint=String(i);handles.append(dot);});
 panel.querySelector('[data-curve-action="mode"]').textContent=edit?'Edit points':'Draw';
 panel.querySelector('[data-curve-action="closed"]').textContent=profile.closed?'Closed':'Open';
 panel.querySelector('[data-curve-action="smooth"]').textContent=profile.smooth?'Smooth':'Straight';
 panel.querySelector('[data-curve-action="undo"]').disabled=!undos.length;
}
function apply(){
 if(!panel||drag)return false;
 const m=manager(),history=globalThis.__boxlabObjectHistory,before=history?.capture?.();
 if(!m?.addMesh||!m?.replaceActiveMesh||!before){status('Object history is not ready');return false;}
 if(objectId!==null&&(m.activeId!==objectId||!editableCurveProfile(activeObject()))){status('Select the original editable curve first');return false;}
 let mesh;try{mesh=makeCurveProfile(profile);}catch(e){status(e.message);return false;}
 const saved=clone(),h=globalThis.__boxlabHistory,undo=h?[...h.undoStack]:null,redo=h?[...h.redoStack]:null;let created;committing=true;
 try{if(objectId!==null){const object=activeObject();if(!m.replaceActiveMesh(mesh))return false;object.curveProfile=saved;created=object;}else created=m.addMesh(mesh,profile.output==='balloon'?'Balloon':'Curve',{enterObjectMode:true,curveProfile:saved,settings:{mirror:{x:false,y:false,z:false},subd:false,subdLevel:1,cage:true}});
  if(!created)return false;if(h){h.undoStack.splice(0,h.undoStack.length,...undo);h.redoStack.splice(0,h.redoStack.length,...redo);}globalThis.__boxlabObjectSelection?.single?.(created.id);history.checkpointSnapshot(before,before.objects.find(o=>o.id===before.activeId)?.mesh);finish();return true;
 }finally{committing=false;}
}
function open(existing=false,balloon=false){
 if(panel)cancel();const current=session()?.current?.();if(current&&!globalThis.__boxlabObjectRadialSession?.cancelCurrent?.()){return false;}
 const source=existing?activeObject():null,record=existing?editableCurveProfile(source):{version:1,points:[],closed:true,smooth:true,detail:balloon?16:32,...(balloon?{output:'balloon',depth:.25}:{})};
 if(!record||!session()){return false;}
 globalThis.__boxlabLasso?.setArmed?.(false);globalThis.__boxlabTransformArming?.disarm?.();
 profile=record;objectId=source?.id??null;edit=existing;undos=[];panel=node('div');panel.id='curveProfilePanel';panel.className='boxlab-tool-session-shell';
 panel.append(node('div',profile.output==='balloon'?(existing?'Edit Balloon':'Draw Balloon'):(existing?'Edit Curve':'Draw Curve')));panel.firstChild.className='boxlab-tool-session-title';
 pad=svgNode('svg');pad.id='curveProfilePad';pad.setAttribute('viewBox',`0 0 ${W} ${H}`);pad.setAttribute('aria-label','Draw curve with Pencil; Edit points to reshape');
 path=svgNode('polyline');path.setAttribute('fill','none');path.setAttribute('stroke','#65dbc7');path.setAttribute('stroke-width','2');handles=svgNode('g');pad.append(path,handles);panel.append(pad);
 function button(row,text,action,fn){const b=node('button',text);b.type='button';b.dataset.curveAction=action;b.addEventListener('click',()=>{if(drag)return;fn();draw();});row.append(b);return b;}
 const tools=node('div');tools.className='outliner-actions';tools.style.gridTemplateColumns='repeat(3,minmax(0,1fr))';panel.append(tools);
 button(tools,'Draw','mode',()=>{edit=!edit;});button(tools,'Closed','closed',()=>{remember();profile.closed=!profile.closed;});button(tools,'Smooth','smooth',()=>{remember();profile.smooth=!profile.smooth;});
 const row=node('label'),slider=node('input'),out=node('output',String(profile.detail));row.append(node('span','Detail'),slider,out);slider.type='range';slider.min='8';slider.max='128';slider.step='8';slider.value=String(profile.detail);slider.addEventListener('change',()=>{remember();profile.detail=Number(slider.value);out.textContent=slider.value;draw();});panel.append(row);
 if(profile.output==='balloon'){const depthRow=node('label'),input=node('input'),depthOut=node('output',String(profile.depth));input.type='range';input.min='.05';input.max='.8';input.step='.05';input.value=String(profile.depth);input.dataset.curveAction='depth';depthRow.append(node('span','Depth'),input,depthOut);input.addEventListener('change',()=>{remember();profile.depth=Number(input.value);depthOut.textContent=input.value;draw();});panel.append(depthRow);preview=createAddObjectPreview(panel);}
 const helpers=node('div');helpers.className='outliner-actions';panel.append(helpers);button(helpers,'Undo','undo',()=>{profile=undos.pop()||profile;slider.value=String(profile.detail);out.textContent=slider.value;if(profile.output==='balloon'){const input=panel.querySelector('[data-curve-action="depth"]');input.value=String(profile.depth);input.parentElement.children[2].textContent=input.value;}});button(helpers,'Clear','clear',()=>{remember();profile.points=[];});
 panel.append(node('small',profile.output==='balloon'?'Draw a convex closed outline · Relative depth · Fits 1 × 1 × 1 · Editable triangle solid':'Pencil: draw or drag points · New curve fits 1 × 1 · Curves become solids in later tools.'));
 note=node('div');note.setAttribute('role','status');panel.append(note);const actions=node('div');actions.className='outliner-actions';panel.append(actions);button(actions,'Cancel','cancel',cancel);applyButton=button(actions,'Apply','apply',apply);
 pad.addEventListener('pointerdown',e=>{
  if(e.pointerType==='touch'||!e.isPrimary||e.button>0||drag)return;e.preventDefault();e.stopImmediatePropagation();const p=point(e),before=clone();
  if(edit){let index=-1,near=14;profile.points.forEach((v,i)=>{const q=screen(v),d=Math.hypot(p.x-q.x,p.y-q.y);if(d<near){near=d;index=i;}});if(index<0)return;drag={id:e.pointerId,before,index};profile.points[index]=local(p);}
  else{drag={id:e.pointerId,before,stroke:[p]};profile.points=[local(p)];}
  pad.setPointerCapture(e.pointerId);draw();
 });
 pad.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;e.preventDefault();e.stopImmediatePropagation();const p=point(e);if(edit)profile.points[drag.index]=local(p);else if(drag.stroke.length<2000&&appendStrokePoint(drag.stroke,p)){profile.points=drag.stroke.map(local);}draw();});
 function end(e,cancelled=false){if(!drag||drag.id!==e.pointerId)return;e.preventDefault();e.stopImmediatePropagation();const g=drag;
  if(cancelled)profile=g.before;else{if(g.stroke){appendStrokePoint(g.stroke,point(e),0);let tolerance=3,points=simplifyStroke(g.stroke,tolerance);while(points.length>128)points=simplifyStroke(g.stroke,tolerance*=1.5);if(points.length>2&&Math.hypot(points[0].x-points.at(-1).x,points[0].y-points.at(-1).y)<8)points.pop();profile.points=points.map(local);edit=true;}undos.push(g.before);if(undos.length>30)undos.shift();}
  release();draw();
 }
 pad.addEventListener('pointerup',e=>end(e));pad.addEventListener('pointercancel',e=>end(e,true));pad.addEventListener('lostpointercapture',e=>{if(drag?.id===e.pointerId){profile=drag.before;drag=null;draw();}});
 document.querySelector('#viewportWrap')?.append(panel);session().begin({id:'curve-profile',title:'Curve',node:panel});draw();return true;
}
window.addEventListener('keydown',e=>{if(panel&&e.key==='Escape'){e.preventDefault();cancel();}});
window.addEventListener('boxlab-tool-session-change',e=>{if(panel&&e.detail?.active&&e.detail.id!=='curve-profile'){release();preview?.dispose();preview=null;panel.remove();panel=null;profile=null;}});
document.addEventListener('click',e=>{if(panel&&!committing&&e.target?.closest?.('#selectionModes button,#outlinerAddBtn,#outlinerDeleteBtn')&&!panel.contains(e.target))cancel();},true);
globalThis.__boxlabCurveProfile={version:VERSION,open,apply,cancel,eligible:()=>!!editableCurveProfile(activeObject()),active:()=>!!panel,get dragging(){return !!drag;}};
