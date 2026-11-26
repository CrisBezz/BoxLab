import {getRetopoQuadColor,setRetopoQuadColor} from './retopo-display.js?v=0.36.18.1233';
import {cutRetopoStroke,deleteRetopoZigzag,loopRetopoDrag} from './retopo-cut.js?v=0.36.18.1228';
import {quadRelaxFlow} from './quad-clean-core.js?v=0.36.18.1238';
import {openQuadStrokeCorners,quadStrokeCorners,straightQuadStroke,quadStrokeCrossing,quadStrokeGuide} from './retopo-stroke.js?v=0.36.18.1227';
import {buildRetopoQuad} from './retopo-quad.js?v=0.36.18.1236';
import {EditableMesh} from './mesh.js';
import {createRetopoSurface,nearestRetopoVertex} from './retopo-surface.js?v=0.36.18.1229';
import {placeToolSessionPanel} from './tool-session-panel-position.js?v=0.36.18.732';

const canvas=document.querySelector('#viewport'),bar=document.querySelector('#selectionModes'),status=document.querySelector('#selectionStatus');
const state=()=>globalThis.__boxlabBridgeState,manager=()=>globalThis.__boxlabObjectManager;
const objectById=(m,id)=>m?.getObject?m.getObject(id):m?.objects?.find(o=>o.id===id);
const button=document.createElement('button');button.id='retopoModeBtn';button.type='button';button.title='Retopology';button.setAttribute('aria-pressed','false');button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 7 8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10M8 5l8 4M8 9v10M4 12l8 4 8-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg><span class="mode-label">Retopo</span>';bar?.appendChild(button);
const panel=document.createElement('div');panel.id='retopoSession';panel.className='boxlab-tool-session-shell';panel.hidden=true;
panel.innerHTML='<div class="boxlab-tool-session-title">Retopo · Surface modelling</div><div id="retopoHint" class="boxlab-tool-session-subtitle"></div><div class="outliner-actions"><button type="button" id="retopoVertex" aria-pressed="false">Vertex</button><button type="button" id="retopoQuad" aria-pressed="true">Quad</button><button type="button" id="retopoTriangle" aria-pressed="false">Tri</button><button type="button" id="retopoNgon" aria-pressed="false">N-gon</button><button type="button" id="retopoFinishFace" hidden>Finish face</button><button type="button" id="retopoRelax" aria-pressed="false">Relax</button><button type="button" id="retopoClear">Clear corners</button><label class="retopo-colour"><span>Quad colour</span><input type="color" id="retopoColour"></label><button type="button" id="retopoDone">Done</button><label class="retopo-colour" id="retopoPreviewOption"><span>Preview patches</span><input type="checkbox" id="retopoPreview"></label><button type="button" id="retopoApplyPatch" hidden>Apply patch</button><button type="button" id="retopoCancelPatch" hidden>Cancel patch</button></div>';
const quadColour=panel.querySelector('#retopoColour');
quadColour.value=getRetopoQuadColor();
quadColour.addEventListener('input',()=>{setRetopoQuadColor(quadColour.value);if(pendingPatch)drawCorners();});
quadColour.addEventListener('change',()=>{setRetopoQuadColor(quadColour.value);if(pendingPatch)drawCorners();});
document.querySelector('#viewportWrap')?.appendChild(panel);placeToolSessionPanel(panel,{compact:true});
const style=document.createElement('style');style.textContent='#retopoSession [hidden]{display:none}#retopoSession .retopo-colour{display:flex;align-items:center;justify-content:space-between;gap:6px;padding:0 8px;font-size:13px}#retopoColour{width:42px;height:34px;cursor:pointer}#retopoSession button[aria-pressed=true]{background:#eef1f7;color:#15171b}#retopoModeBtn svg{width:22px;height:22px}#retopoSession{width:340px;padding:12px;background:#1b2029;color:#eef1f7;border:1px solid #454c59;border-radius:14px}#retopoModeBtn[aria-pressed=true]{background:#eef1f7;color:#15171b}#app.boxlab-retopo-session #selectionModes [data-mode].active{background:#1e222a;color:#eef1f7}#app.boxlab-retopo-session #totalGizmo{visibility:hidden!important}';document.head.appendChild(style);
const previewOption=panel.querySelector('#retopoPreviewOption');
const previewToggle=panel.querySelector('#retopoPreview');
const applyPatch=panel.querySelector('#retopoApplyPatch');
const cancelPatch=panel.querySelector('#retopoCancelPatch');
let pendingPatch=null;
let picking=false,sourceTap=null;
const hint=panel.querySelector('#retopoHint');
const toolButtons=['#retopoVertex','#retopoQuad','#retopoTriangle','#retopoNgon','#retopoRelax','#retopoClear'].map(selector=>panel.querySelector(selector));
let active=false,referenceId=null,retopoId=null,surface=null,drag=null,previousMode='face',entryObjectId=null,tool='quad',corners=[],cornerContext=null;
const guide=document.createElement('div');guide.id='retopoQuadGuide';
Object.assign(guide.style,{position:'absolute',inset:'0',pointerEvents:'none',zIndex:'40'});document.querySelector('#viewportWrap')?.appendChild(guide);
function clearPatch(){
  if(!pendingPatch)return;
  pendingPatch=null;
  applyPatch.hidden=cancelPatch.hidden=true;
  guide.innerHTML='';
}
function drawCorners(){
  if(pendingPatch){
    if(!valid()||state().mesh!==pendingPatch.source){clearPatch();return;}
    const rect=canvas.getBoundingClientRect(),camera=state().camera;
    const {mesh,firstFace}=pendingPatch;
    const points=new Map();
    const polygons=mesh.faces.slice(firstFace).map(face=>{
      const projected=face.map(index=>{
        if(!points.has(index))points.set(index,screenPoint(mesh.vertices[index],rect,camera));
        return points.get(index);
      });
      if(projected.some(point=>Math.abs(point.z)>1))return '';
      return `<polygon points="${projected.map(p=>[p.x-rect.left,p.y-rect.top].join(',')).join(' ')}"/>`;
    });
    guide.innerHTML=`<svg width="100%" height="100%" fill="${getRetopoQuadColor()}" fill-opacity=".45" stroke="#252236" stroke-width="2">${polygons.join('')}</svg>`;
    return;
  }
  if(drag&&tool==='relax'){
    const r=canvas.getBoundingClientRect(),p=drag.brush;
    guide.innerHTML=`<svg width="100%" height="100%" viewBox="0 0 ${r.width} ${r.height}"><circle cx="${p.x-r.left}" cy="${p.y-r.top}" r="48" fill="none" stroke="#50efc6" stroke-width="2" opacity=".7"/></svg>`;
    return;
  }
  if(drag?.stroke&&drag.moved){
    const r=canvas.getBoundingClientRect();
    const xy=quadStrokeGuide(drag.stroke).map(p=>`${p.x-r.left},${p.y-r.top}`);
    guide.innerHTML=`<svg width="100%" height="100%" viewBox="0 0 ${r.width} ${r.height}"><polyline points="${xy.join(' ')}" fill="none" stroke="#50efc6" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
    return;
  }
  if(!active||!corners.length){guide.innerHTML='';return;}
  if(cornerContext?.mesh!==state()?.mesh||cornerContext?.id!==manager()?.activeId){clearCorners();return;}
  const r=canvas.getBoundingClientRect(),points=corners.map(c=>c.index===null?c.point:state().mesh.vertices[c.index]);
  const projected=points.map(v=>v.clone().project(state().camera));
  if(projected.some(p=>p.z< -1||p.z>1)){guide.innerHTML='';return;}
  const xy=projected.map(p=>[(p.x*.5+.5)*r.width,(-p.y*.5+.5)*r.height]);
  guide.innerHTML=`<svg width="100%" height="100%" viewBox="0 0 ${r.width} ${r.height}"><polyline points="${xy.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#50efc6" stroke-width="2"/>${xy.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="#50efc6" stroke="#102921" stroke-width="2"/><text x="${p[0]+9}" y="${p[1]-8}" fill="#fff" font-size="14">${i+1}</text>`).join('')}</svg>`;
}
function clearCorners(){clearPatch();corners=[];cornerContext=null;panel.querySelector('#retopoFinishFace').hidden=true;guide.innerHTML='';}
function setTool(next){cancelDrag();clearCorners();tool=next;panel.querySelector('#retopoVertex').setAttribute('aria-pressed',String(tool==='vertex'));panel.querySelector('#retopoQuad').setAttribute('aria-pressed',String(tool==='quad'));panel.querySelector('#retopoTriangle').setAttribute('aria-pressed',String(tool==='triangle'));panel.querySelector('#retopoNgon').setAttribute('aria-pressed',String(tool==='ngon'));panel.querySelector('#retopoRelax').setAttribute('aria-pressed',String(tool==='relax'));render();message(tool==='relax'?'Retopo · brush the quads to relax their spacing':tool==='quad'?'Retopo · draw a quad, connect corners or cut across a row':tool==='triangle'?'Retopo · tap three corners for a triangle':tool==='ngon'?'Retopo · tap boundary corners, then Finish face':'Retopo · tap surface to place · drag vertices to move');}
function quadCorner(d){
  if(cornerContext&&(cornerContext.mesh!==state().mesh||cornerContext.id!==manager().activeId))clearCorners();
  cornerContext??={mesh:state().mesh,id:manager().activeId};
  if(d.index!==null&&corners.some(c=>c.index===d.index)){message('Retopo · choose a different corner');return;}
  corners.push({index:d.index,point:d.point.clone(),normal:d.normal.clone()});drawCorners();
  if(tool==='ngon'){panel.querySelector('#retopoFinishFace').hidden=corners.length<5;message(`Retopo · ${corners.length} corners · tap Finish face after at least five`);return;}
  const count=tool==='triangle'?3:4;
  if(corners.length<count){message(`Retopo · corner ${corners.length}/${count} · tap the next corner`);return;}
  if(tool==='triangle')commitPolygon(corners);else commitQuad(corners);
}
function validateSurfaceFaces(mesh,firstFace){
  const rect=canvas.getBoundingClientRect(),camera=state().camera,checked=new Map();
  function pointOnReference(index){
    if(checked.has(index))return checked.get(index);
    const vertex=mesh.vertices[index],p=screenPoint(vertex,rect,camera);
    const result=Math.abs(p.z)<=1&&visibleBoundaryVertex(vertex,p,rect,camera)?p:null;
    checked.set(index,result);
    return result;
  }
  for(const face of mesh.faces.slice(firstFace)){
    const points=face.map(pointOnReference);
    if(points.some(point=>!point))return false;
    // Screen y points down. An outward face must turn consistently in the
    // negative direction around the whole polygon, not only at one triangle.
    for(let i=0;i<face.length;i++){
      const a=points[i],b=points[(i+1)%face.length],c=points[(i+2)%face.length];
      if((b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x)>=-1e-6)return false;
    }
    const corners=face.map(index=>mesh.vertices[index]);
    const center=corners.reduce((sum,vertex)=>sum.add(vertex),new THREE.Vector3()).multiplyScalar(1/corners.length);
    const span=Math.max(...corners.map(vertex=>vertex.distanceTo(center)));
    // Reject faces bridging holes or jumping to a different depth layer.
    for(let i=0;i<=face.length;i++){
      const sample=i===face.length?center:corners[i].clone().lerp(corners[(i+1)%face.length],.5);
      const p=screenPoint(sample,rect,camera),hit=surface.hit(camera,rect,p.x,p.y);
      if(!hit||sample.distanceTo(hit.point)>span*.5)return false;
    }
  }
  return true;
}
function commitPolygon(outline){
  const before=retopoId?state().mesh:new EditableMesh([],[]),mesh=before.clone(),indices=[];
  for(const corner of outline){
    if(corner.index!==null)indices.push(corner.index);
    else indices.push(mesh.addLooseVertex(corner.point));
  }
  if(new Set(indices).size!==indices.length){clearCorners();return;}
  const shared=mesh.edges().filter(edge=>edge.faces.length&&indices.some((a,i)=>
    (a===edge.a&&indices[(i+1)%indices.length]===edge.b)||(a===edge.b&&indices[(i+1)%indices.length]===edge.a)));
  if(shared.some(edge=>edge.faces.length!==1)){clearCorners();message('Retopo · use an open boundary');return;}
  if(shared.length){
    const edge=shared[0],face=mesh.faces[edge.faces[0]];
    const forward=indices.some((a,i)=>a===edge.a&&indices[(i+1)%indices.length]===edge.b);
    const occupied=face.some((a,i)=>a===(forward?edge.a:edge.b)&&face[(i+1)%face.length]===(forward?edge.b:edge.a));
    if(occupied)indices.reverse();
  }else if(outline[0].normal){
    const a=mesh.vertices[indices[0]],b=mesh.vertices[indices[1]],c=mesh.vertices[indices[2]];
    if(b.clone().sub(a).cross(c.clone().sub(a)).dot(outline[0].normal)<0)indices.reverse();
  }
  mesh.faces.push(indices);
  mesh.faceGroups.push(null);
  if(!validateSurfaceFaces(mesh,before.faces.length)){clearCorners();message('Retopo · could not place a valid face on the reference');return;}
  commitQuad(null,{ok:true,mesh});
}
function commitQuad(outline, result=null, preview=false){
  const before=retopoId?state().mesh.clone():new EditableMesh([],[]);
  result??=buildRetopoQuad(before,outline,outline[0].normal);
  if(!result.ok){clearCorners();message(`Retopo · ${result.reason} · try another outline`);return;}
  if(!result.splitFaces&&!result.deletedEdge&&!validateSurfaceFaces(result.mesh,before.faces.length)){
    clearCorners();message('Retopo · could not place a valid patch on the reference');return;
  }
  if(preview&&previewToggle.checked&&result.mesh.faces.length-before.faces.length>1){
    clearCorners();
    pendingPatch={mesh:result.mesh,firstFace:before.faces.length,source:state().mesh};
    applyPatch.hidden=cancelPatch.hidden=false;
    drawCorners();
    message(`Retopo · ${result.mesh.faces.length-before.faces.length} quads ready to apply`);
    return;
  }
  if(!retopoId){
    const snapshot=globalThis.__boxlabObjectHistory?.capture?.();if(!snapshot){clearCorners();return;}
    retopoId=manager().addMesh(result.mesh,'Retopo',{enterObjectMode:false,retopoReferenceId:referenceId,settings:{mirror:{x:false,y:false,z:false},subd:false,subdLevel:1,cage:true}}).id;
    globalThis.__boxlabObjectHistory.checkpointSnapshot(snapshot,snapshot.objects.find(o=>o.id===snapshot.activeId)?.mesh||new EditableMesh([],[]));
  }else{
    const live=state().mesh;
    globalThis.__boxlabHistory.push(before);
    for(const key of ['vertices','faces','faceGroups','creases','looseEdges','looseVertices'])live[key]=result.mesh[key];
  }
  clearCorners();manager().saveActive();globalThis.__boxlabSelectionBridge?.clear?.();render();const added=result.mesh.faces.length-before.faces.length;message(result.deletedEdge?`Retopo · edge deleted · ${result.deletedFaces} faces removed`:result.loopGesture?'Retopo · loop added':result.splitFaces?`Retopo · split ${result.splitFaces} ${result.splitFaces===1?'quad':'quads'}`:`Retopo · ${added===1?'quad':added+' quads'} created`);
}
function message(text){if(status)status.textContent=text;}
function render(){document.querySelector('#cageToggle')?.dispatchEvent(new Event('change',{bubbles:true}));}
function consume(e){e.preventDefault();e.stopImmediatePropagation();}
function valid(){
  const m=manager(),ref=objectById(m,referenceId),edit=objectById(m,retopoId);
  return active&&surface&&ref?.visible!==false&&!!ref&&((!retopoId&&m.activeId===entryObjectId)||(m.activeId===retopoId&&!!edit&&!edit.locked&&!edit.sourceId));
}
function release(d){try{canvas.releasePointerCapture(d.pointer);}catch{}if(d.controls)d.controls.enabled=d.enabled;}
function cancelDrag(){
  if(!drag)return;const d=drag;drag=null;
  if(d.index!==null&&manager()?.activeId===d.object&&state()?.mesh===d.mesh)d.mesh.vertices[d.index].copy(d.start);
  if(d.relaxed&&manager()?.activeId===d.object&&state()?.mesh===d.mesh)d.mesh.vertices=d.beforeMesh.vertices;
  release(d);drawCorners();render();
}
function showPanel(show){
  panel.hidden=!show;
  button.setAttribute('aria-pressed',String(show));
  const app=document.querySelector('#app');
  if(show)app?.classList.add('boxlab-retopo-session');
  else app?.classList.remove('boxlab-retopo-session');
  for(const control of [...toolButtons,previewOption])control.hidden=picking;
}
function chooseSource(){
  if(!canEnter())return;
  if(resumeSaved())return;
  picking=true;
  hint.textContent='Tap the mesh you want to retopologise';
  showPanel(true);
}
function close(){
  if(picking){picking=false;sourceTap=null;showPanel(false);return;}
  if(!active)return;
  cancelDrag();clearCorners();active=false;showPanel(false);
  state()?.controls?.removeEventListener?.('change',drawCorners);surface?.dispose();surface=null;
  globalThis.__boxlabToolSession?.end?.('retopo');
  document.querySelector(`#selectionModes [data-mode="${previousMode}"]`)?.click();
  message('Retopo closed · mesh retained · Undo/Redo available');
}
function canEnter(){
  if(globalThis.__boxlabViewportPaint?.active||globalThis.__boxlabUVWorkspace?.active){message('Finish the current workspace before Retopo');return false;}
  const session=globalThis.__boxlabToolSession;
  if(session?.isActive?.()){message('Close the current tool before entering Retopo');return false;}
  return true;
}
function start({fresh=false,reference=null}={}){
  if(active)close();
  if(!canEnter())return false;
  const m=manager();m?.saveActive?.();
  const explicit=reference!==null,activeObject=objectById(m,m?.activeId);
  const requested=explicit?objectById(m,reference):null;
  if(explicit&&(!requested?.mesh?.faces?.length||requested.visible===false)){
    message('Retopo · select a visible reference mesh first');return false;
  }
  const savedId=activeObject?.retopoReferenceId;
  const canResume=activeObject?.kind!=='reference'&&!activeObject?.locked&&!activeObject?.sourceId;
  const legacy=explicit&&requested?.kind==='reference'&&!savedId&&/^Retopo(?: \d+)?$/.test(activeObject?.name||'');
  const sourceId=savedId??(activeObject?.id===retopoId?referenceId:legacy?reference:null);
  let source=!fresh&&canResume&&sourceId&&(!explicit||reference===sourceId)?objectById(m,sourceId):null;
  if(source){
    retopoId=activeObject.id;
    if(legacy)activeObject.retopoReferenceId=source.id;
  }else{
    source=explicit?requested:activeObject;
    retopoId=null;
  }
  if(!explicit&&(!source?.mesh?.faces?.length||source.visible===false)){source=m?.objects?.find(o=>o.visible!==false&&o.mesh?.faces?.length);retopoId=null;}
  if(!source?.mesh?.faces?.length){message('Retopo · select a visible reference mesh first');return false;}
  if(source.visible===false){message('Retopo · show the reference object first');return false;}
  try{surface=createRetopoSurface(source.mesh);}catch(e){message(`Retopo · ${e.message}`);return false;}
  previousMode=globalThis.__boxlabSelectionBridge?.mode?.()||'face';referenceId=source.id;entryObjectId=m.activeId;
  globalThis.__boxlabAddVertex?.stop?.(false);globalThis.__boxlabBuildEdge?.disarm?.();globalThis.__boxlabVertexExtrude?.disarm?.();globalThis.__boxlabDirectVertexBevel?.disarm?.();globalThis.__boxlabVertexSlidePolish?.disarm?.({cancelDrag:true});globalThis.__boxlabTransformArming?.disarm?.();
  document.dispatchEvent(new CustomEvent('boxlab-direct-tool-exclusive',{detail:{tool:'retopo'}}));
  document.querySelector('#selectionModes [data-mode="vertex"]')?.click();
  picking=false;sourceTap=null;clearCorners();active=true;setTool('quad');
  state().controls?.addEventListener?.('change',drawCorners);showPanel(true);
  hint.textContent=`${source.name} · Draw a quad or connect boundary corners · fingers: navigate`;
  return true;
}
function resumeSaved(){
  const m=manager(),edit=objectById(m,m?.activeId);
  if(!edit?.retopoReferenceId||edit.locked||edit.sourceId)return false;
  return start({reference:edit.retopoReferenceId});
}
function selectReference(id){
  const source=objectById(manager(),id);
  if(!source?.mesh?.faces?.length){message('Retopo · select a visible reference mesh first');return false;}
  if(source.visible===false){message('Retopo · show the reference object first');return false;}
  if(id===referenceId&&valid())return true;
  return start({reference:id});
}
function hit(e){return surface?.hit(state().camera,canvas.getBoundingClientRect(),e.clientX,e.clientY);}
function sourceDown(e){
  if(sourceTap){sourceTap.cancelled=true;return;}
  if(e.target!==canvas||e.button!==0||e.isPrimary===false)return;
  sourceTap={pointer:e.pointerId,x:e.clientX,y:e.clientY};
  if(e.pointerType!=='touch')consume(e);
}
function sourceMove(e){
  if(sourceTap?.pointer===e.pointerId&&Math.hypot(e.clientX-sourceTap.x,e.clientY-sourceTap.y)>8)sourceTap.cancelled=true;
}
function sourceUp(e){
  if(sourceTap?.pointer!==e.pointerId)return;
  sourceMove(e);
  const tap=sourceTap;sourceTap=null;
  if(e.pointerType!=='touch')consume(e);
  if(e.type!=='pointerup'||tap.cancelled)return;
  const id=manager()?.pickObject?.(e,{anyMode:true})?.id;
  if(id!=null&&selectReference(id))return;
  if(id==null)message('Retopo · tap a visible mesh');
}
function down(e){
  if(picking){sourceDown(e);return;}
  if(active&&e.pointerType==='touch'&&drag){cancelDrag();return;}
  if(!active||e.target!==canvas||!['pen','mouse'].includes(e.pointerType)||(e.button!==0&&(tool==='quad'||!(e.pressure>0))))return;
  if(!valid()){close();return;}
  if(drag)return;
  consume(e);
  if(pendingPatch)return;
  const h=hit(e);if(!h&&tool!=='quad'){message('Retopo · point at the reference surface');return;}
  const m=state().mesh,index=retopoId&&tool!=='relax'?nearestRetopoVertex(m,state().camera,canvas.getBoundingClientRect(),e.clientX,e.clientY,h,16,surface):null;
  drag={pointer:e.pointerId,object:manager().activeId,mesh:m,index,start:index===null?null:m.vertices[index].clone(),beforeMesh:['quad','triangle','ngon'].includes(tool)?null:m.clone(),point:h?.point,normal:h?.normal,valid:true,x:e.clientX,y:e.clientY,moved:false,before:tool==='vertex'&&!retopoId?globalThis.__boxlabObjectHistory?.capture?.():null,controls:state().controls,enabled:state().controls?.enabled};
  if(tool==='quad')drag.stroke=[{x:e.clientX,y:e.clientY}];
  if(tool==='relax')relaxDab(drag,e,true);
  if(drag.controls)drag.controls.enabled=false;
  try{canvas.setPointerCapture(e.pointerId);}catch{}
}
function move(e){
  if(picking){sourceMove(e);return;}
  if(!drag||e.pointerId!==drag.pointer)return;
  consume(e);if(!valid()||state().mesh!==drag.mesh){cancelDrag();return;}
  if(tool==='relax'){relaxDab(drag,e);return;}
  if(drag.stroke){recordStroke(drag,e);drawCorners();return;}
  const h=hit(e);drag.valid=!!h;drag.moved ||= Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>5;
  if(!h)return;drag.point=h.point;
  if(tool==='vertex'&&drag.index!==null){drag.mesh.vertices[drag.index].copy(h.point);render();}
}
function recordStroke(d,e){
  const last=d.stroke.at(-1);
  if(Math.hypot(e.clientX-last.x,e.clientY-last.y)<(d.moved?2:5))return;
  if(d.stroke.length>=256)d.stroke=d.stroke.filter((_,i)=>i%2===0);
  d.stroke.push({x:e.clientX,y:e.clientY});
  d.moved ||= Math.hypot(e.clientX-d.x,e.clientY-d.y)>5;
}
function finishStroke(d,e){
  recordStroke(d,e);
  if(!d.moved){if(d.point)quadCorner(d);else message('Retopo · tap the visible reference');return;}
  clearCorners();
  const rect=canvas.getBoundingClientRect(),camera=state().camera;
  const mesh=state().mesh,project=vertex=>screenPoint(vertex,rect,camera);
  const snap=point=>surface.hit(camera,rect,point.x,point.y)?.point;
  const visible=(vertex,point)=>visibleBoundaryVertex(vertex,point,rect,camera);
  if(retopoId){
    const deletion=deleteRetopoZigzag(mesh,d.stroke,project,visible);
    if(deletion){commitQuad(null,deletion);return;}
    const crossing=quadStrokeCrossing(d.stroke);
    if(crossing){
      if(!fillCrossedQuad(crossing,rect,camera))message('Retopo · draw the cross inside a quad or a four-edge gap');
      return;
    }
  }
  const outline=quadStrokeCorners(d.stroke);
  if(!outline){
    if(retopoId){
      const result=cutRetopoStroke(mesh,d.stroke,project,snap,visible);
      if(result){commitQuad(null,result);return;}
    }
    if(retopoId&&completeOpenStroke(d.stroke,rect,camera))return;
    if(retopoId&&straightQuadStroke(d.stroke)){
      const loop=loopRetopoDrag(mesh,d.stroke,project,snap,visible);
      if(loop){commitQuad(null,loop);return;}
    }
    message('Retopo · close the outline or start and end near boundary corners');return;
  }
  const projected=[];
  const snapRadius=Math.min(16,Math.min(...outline.map((p,i)=>Math.hypot(p.x-outline[(i+1)%4].x,p.y-outline[(i+1)%4].y)))*.3);
  const center=outline.reduce((sum,p)=>({x:sum.x+p.x/4,y:sum.y+p.y/4}),{x:0,y:0});
  for(const point of outline){
    let {x,y}=point,pick=surface.hit(camera,rect,x,y);
    const distance=Math.hypot(center.x-x,center.y-y);
    if(!pick&&distance>0){
      const step=Math.min(6,distance*.12)/distance;
      x+=(center.x-x)*step;y+=(center.y-y)*step;
      pick=surface.hit(camera,rect,x,y);
    }
    if(!pick){message('Retopo · a quad corner missed the reference');return;}
    const index=retopoId?nearestRetopoVertex(state().mesh,camera,rect,x,y,pick,snapRadius,surface):null;
    projected.push({...pick,index});
  }
  commitQuad(projected);
}
function boundaryNeighbors(mesh){
  const adjacent=new Map();
  for(const {a,b,faces} of mesh.edges()){
    if(faces.length!==1)continue;
    if(!adjacent.has(a))adjacent.set(a,new Set());
    if(!adjacent.has(b))adjacent.set(b,new Set());
    adjacent.get(a).add(b);adjacent.get(b).add(a);
  }
  return adjacent;
}
function boundaryPaths(adjacent,start,end,maxEdges){
  const paths=[],pending=[[start]];
  let budget=Math.max(256,adjacent.size*4);
  while(pending.length&&--budget>=0){
    const path=pending.pop(),tip=path.at(-1);
    if(tip===end&&path.length>1){paths.push(path);continue;}
    if(path.length>maxEdges)continue;
    for(const next of adjacent.get(tip)||[]){
      if(!path.includes(next))pending.push([...path,next]);
    }
  }
  return budget<0?[]:paths;
}
function closeQuadGap(mesh,adjacent,start,end){
  const paths=boundaryPaths(adjacent,end.index,start.index,3);
  const candidates=paths.filter(path=>path.length===4).map(path=>[
    start,end,...path.slice(1,-1).map(index=>({index}))
  ]).map(outline=>({outline,result:buildRetopoQuad(mesh,outline,start.normal)})).filter(item=>item.result.ok);
  if(candidates.length!==1)return false;
  commitQuad(candidates[0].outline,candidates[0].result);
  return true;
}
function screenPoint(vertex,rect,camera){
  const p=vertex.clone().project(camera);
  return {x:rect.left+(p.x*.5+.5)*rect.width,y:rect.top+(-p.y*.5+.5)*rect.height,z:p.z};
}
function containsQuadPoint(points,point){
  if(points.some(p=>Math.abs(p.z)>1))return false;
  const signs=points.map((p,i)=>{
    const q=points[(i+1)%4];
    return (q.x-p.x)*(point.y-p.y)-(q.y-p.y)*(point.x-p.x);
  });
  return signs.every(s=>s>0)||signs.every(s=>s<0);
}
function visibleBoundaryVertex(vertex,point,rect,camera){
  const front=surface.hit(camera,rect,point.x,point.y);
  return front&&front.point.distanceTo(vertex)<=Math.max(.00001,front.distance*.00001);
}
function fillCrossedQuad(point,rect,camera){
  const mesh=state().mesh,adjacent=boundaryNeighbors(mesh),hit=surface.hit(camera,rect,point.x,point.y);
  if(!hit)return false;
  const selected=[];
  for(let i=0;i<mesh.faces.length;i++){
    const face=mesh.faces[i];
    if(face.length!==4)continue;
    const points=face.map(index=>screenPoint(mesh.vertices[index],rect,camera));
    if(!containsQuadPoint(points,point))continue;
    const winding=points.reduce((sum,p,j)=>{
      const q=points[(j+1)%4];return sum+p.x*q.y-p.y*q.x;
    },0);
    if(winding>=0||!face.every((index,j)=>visibleBoundaryVertex(mesh.vertices[index],points[j],rect,camera)))continue;
    selected.push(i);
  }
  if(selected.length>1)return false;
  if(selected.length){
    const before=mesh.clone();
    mesh.deleteFace(selected[0]);
    mesh.compactUnusedVertices();
    globalThis.__boxlabHistory.push(before);
    manager().saveActive();globalThis.__boxlabSelectionBridge?.clear?.();render();
    message('Retopo · quad deleted');
    return true;
  }
  const candidates=[];
  const projected=new Map([...adjacent.keys()].map(index=>[index,screenPoint(mesh.vertices[index],rect,camera)]));
  for(const [a,neighbors] of adjacent){
    for(const b of neighbors){
      if(b<=a)continue;
      for(const path of boundaryPaths(adjacent,b,a,3)){
        if(path.length!==4||path.slice(1,-1).some(index=>index<a)||b>path[2])continue;
        const polygon=[a,...path.slice(0,-1)];
        const points=polygon.map(index=>projected.get(index));
        if(!containsQuadPoint(points,point)||!polygon.every((index,j)=>visibleBoundaryVertex(mesh.vertices[index],points[j],rect,camera)))continue;
        const outline=polygon.map(index=>({index}));
        const result=buildRetopoQuad(mesh,outline,hit.normal);
        if(result.ok)candidates.push({outline,result});
        if(candidates.length>1)return false;
      }
    }
  }
  if(!candidates.length)return false;
  commitQuad(candidates[0].outline,candidates[0].result);
  return true;
}
function boundaryFractions(mesh,path){
  const lengths=[0];
  for(let i=1;i<path.length;i++)lengths.push(lengths[i-1]+mesh.vertices[path[i-1]].distanceTo(mesh.vertices[path[i]]));
  return lengths.map(length=>length/lengths.at(-1));
}
function straightRail(a,b,fractions){
  return fractions.map(t=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}));
}
function balancedFractions(mesh,path){
  return boundaryFractions(mesh,path).map((fraction,i)=>(fraction+i/(path.length-1))*.5);
}
function buildStrokeGrid(mesh,bottom,right,left,top,rect,camera,normal,drawnRight=null,qualityOnly=false){
  const project=index=>screenPoint(mesh.vertices[index],rect,camera);
  const bottomPoints=bottom.map(project),rightPoints=right?.map(project)||drawnRight;
  const u=balancedFractions(mesh,bottom);
  const v=right?balancedFractions(mesh,right):left.map((_,i)=>i/(left.length-1));
  const blend=(a,b,t,key)=>a[key]+(b[key]-a[key])*t;
  const grid=[];
  for(let j=0;j<v.length;j++){
    const row=[];
    for(let i=0;i<u.length;i++){
      let index=j===0?bottom[i]:i===u.length-1&&right?right[j]:null;
      if(index!==null){row.push({index});continue;}
      const coords={};
      for(const key of ['x','y']){
        const base=blend(bottomPoints[0],bottomPoints.at(-1),u[i],key);
        const far=blend(top[0],top.at(-1),u[i],key);
        coords[key]=blend(bottomPoints[i],top[i],v[j],key)+blend(left[j],rightPoints[j],u[i],key)
          -(base+(far-base)*v[j]);
      }
      const hit=surface.hit(camera,rect,coords.x,coords.y);
      if(!hit)return null;
      row.push({index:null,point:hit.point});
    }
    grid.push(row);
  }
  let quality=1;
  const point=corner=>corner.index===null?corner.point:mesh.vertices[corner.index];
  for(let j=0;j<v.length-1;j++){
    for(let i=0;i<u.length-1;i++){
      const cell=[grid[j][i],grid[j+1][i],grid[j+1][i+1],grid[j][i+1]].map(point);
      const edges=cell.map((vertex,k)=>cell[(k+1)%4].clone().sub(vertex));
      const lengths=edges.map(edge=>edge.length());
      for(let k=0;k<4;k++){
        const next=(k+1)%4,opposite=(k+2)%4;
        const angle=Math.abs(edges[k].dot(edges[next])/(lengths[k]*lengths[next]));
        const balance=Math.min(lengths[k],lengths[opposite])/Math.max(lengths[k],lengths[opposite]);
        if(!Number.isFinite(angle)||angle>.6||balance<.55)return null;
        quality=Math.min(quality,(1-angle)*balance);
      }
    }
  }
  if(qualityOnly)return quality;
  const output=mesh.clone();
  for(let j=0;j<v.length-1;j++){
    for(let i=0;i<u.length-1;i++){
      const outline=[grid[j][i],grid[j+1][i],grid[j+1][i+1],grid[j][i+1]];
      let index=output.vertices.length;
      const result=buildRetopoQuad(output,outline,normal,{privateCandidate:true});
      if(!result.ok)return null;
      for(const corner of outline)if(corner.index===null)corner.index=index++;
    }
  }
  return output;
}
function extendLengthwise(mesh,adjacent,start,end,stroke,rect,camera){
  if(!adjacent.get(start.index)?.has(end.index))return false;
  const corners=openQuadStrokeCorners(stroke,3);
  if(!corners)return false;
  const [near,far]=[stroke[0],stroke.at(-1)];
  const a=screenPoint(mesh.vertices[start.index],rect,camera),b=screenPoint(mesh.vertices[end.index],rect,camera);
  const owner=mesh.edges().find(edge=>
    edge.a===Math.min(start.index,end.index)&&edge.b===Math.max(start.index,end.index));
  const face=mesh.faces[owner?.faces[0]];
  let size=Math.hypot(a.x-b.x,a.y-b.y);
  if(face?.length===4){
    const inward=(index,partner,p)=>{
      const i=face.indexOf(index),next=face[(i+1)%4];
      const q=screenPoint(mesh.vertices[next===partner?face[(i+3)%4]:next],rect,camera);
      return Math.hypot(p.x-q.x,p.y-q.y);
    };
    const height=(inward(start.index,end.index,a)+inward(end.index,start.index,b))/2;
    if(height>=5)size=height;
  }
  const depth=(Math.hypot(corners[0].x-near.x,corners[0].y-near.y)+Math.hypot(corners[1].x-far.x,corners[1].y-far.y))/2;
  const count=Math.min(128,Math.round(depth/size));
  if(!Number.isFinite(count)||count<2)return false;
  const steps=Array.from({length:count+1},(_,i)=>i/count);
  const left=straightRail(a,corners[0],steps);
  const right=straightRail(b,corners[1],steps);
  const output=buildStrokeGrid(mesh,[start.index,end.index],null,left,corners,rect,camera,start.normal,right);
  if(!output)return false;
  commitQuad(null,{ok:true,mesh:output},true);
  return true;
}
function fillBoundaryPatch(mesh,adjacent,start,end,stroke,rect,camera){
  const corners=openQuadStrokeCorners(stroke,2);
  if(!corners)return false;
  const [outer]=corners,solutions=[];
  for(const path of boundaryPaths(adjacent,start.index,end.index,adjacent.size-1)){
    if(path.length<4)continue;
    const points=path.map(index=>screenPoint(mesh.vertices[index],rect,camera));
    const bend=points.indexOf(openQuadStrokeCorners(points,2)?.[0]);
    if(bend<1||points.some((p,i)=>!visibleBoundaryVertex(mesh.vertices[path[i]],p,rect,camera)))continue;
    const a=points[0],b=points.at(-1);
    const side=p=>(b.x-a.x)*(p.y-a.y)-(b.y-a.y)*(p.x-a.x);
    const candidates=[];
    for(let split=Math.max(1,bend-2);split<=Math.min(path.length-2,bend+2);split++){
      if(side(outer)*side(points[split])>=0)continue;
      const bottom=path.slice(0,split+1),right=path.slice(split);
      const left=straightRail(a,outer,balancedFractions(mesh,right));
      const top=straightRail(outer,b,balancedFractions(mesh,bottom));
      const args=[mesh,bottom,right,left,top,rect,camera,start.normal,null];
      const quality=buildStrokeGrid(...args,true);
      if(quality!==null)candidates.push({args,quality});
    }
    candidates.sort((a,b)=>b.quality-a.quality);
    for(const {args} of candidates){
      const output=buildStrokeGrid(...args);
      if(output){solutions.push(output);break;}
    }
    if(solutions.length>1)return false;
  }
  if(!solutions.length)return false;
  commitQuad(null,{ok:true,mesh:solutions[0]},true);
  return true;
}
function extendRibbon(mesh,adjacent,start,end,stroke,rect,camera){
  const paths=boundaryPaths(adjacent,start.index,end.index,adjacent.size-1);
  if(!paths.length||paths.some(path=>path.length<4))return false;
  const corners=openQuadStrokeCorners(stroke,3);
  if(!corners)return false;
  const candidates=[];
  for(const path of paths){
    const base=path.map(index=>screenPoint(mesh.vertices[index],rect,camera));
    const a=base[0],b=base.at(-1),dx=b.x-a.x,dy=b.y-a.y;
    const progress=base.map(p=>(p.x-a.x)*dx+(p.y-a.y)*dy);
    if(progress.some((value,i)=>i&&value-progress[i-1]<progress.at(-1)*.08/(base.length-1)))continue;
    const lengths=base.slice(1).map((p,i)=>Math.hypot(p.x-base[i].x,p.y-base[i].y)).sort((x,y)=>x-y);
    const spacing=lengths[Math.floor(lengths.length/2)];
    const depth=(Math.hypot(corners[0].x-a.x,corners[0].y-a.y)+Math.hypot(corners[1].x-b.x,corners[1].y-b.y))/2;
    if(spacing<1)continue;
    const count=Math.max(1,Math.min(128,Math.round(depth/spacing)));
    const steps=Array.from({length:count+1},(_,i)=>i/count);
    const top=straightRail(...corners,balancedFractions(mesh,path));
    const left=straightRail(a,corners[0],steps),right=straightRail(b,corners[1],steps);
    const output=buildStrokeGrid(mesh,path,null,left,top,rect,camera,start.normal,right);
    if(output)candidates.push(output);
    if(candidates.length>1)return false;
  }
  if(!candidates.length)return false;
  commitQuad(null,{ok:true,mesh:candidates[0]},true);
  return true;
}
function completeOpenStroke(stroke,rect,camera){
  const mesh=state().mesh, first=stroke[0], last=stroke.at(-1);
  const radius=Math.min(32,Math.max(12,Math.hypot(last.x-first.x,last.y-first.y)*.45));
  function anchor(point){
    const pick=surface.hit(camera,rect,point.x,point.y);
    const index=pick?nearestRetopoVertex(mesh,camera,rect,point.x,point.y,pick,radius,surface):null;
    return index===null?null:{...pick,index};
  }
  const start=anchor(first),end=anchor(last);
  if(!start||!end||start.index===end.index)return false;
  const adjacent=boundaryNeighbors(mesh);
  if(straightQuadStroke(stroke)&&closeQuadGap(mesh,adjacent,start,end))return true;
  if(extendRibbon(mesh,adjacent,start,end,stroke,rect,camera))return true;
  if(extendLengthwise(mesh,adjacent,start,end,stroke,rect,camera))return true;
  if(fillBoundaryPatch(mesh,adjacent,start,end,stroke,rect,camera))return true;
  const from=adjacent.get(start.index),to=adjacent.get(end.index);
  if(!from||!to)return false;
  for(const sharedSides of [2,1]){
    const paths=sharedSides===2?[...from].filter(index=>to.has(index)).map(index=>[{index}]):from.has(end.index)?[[]]:[];
    if(!paths.length)continue;
    const corners=openQuadStrokeCorners(stroke,4-sharedSides);
    if(!corners)continue;
    const drawn=corners.map(({x,y})=>surface.hit(camera,rect,x,y));
    if(drawn.some(point=>!point))continue;
    let candidate=null;
    for(const path of paths){
      const outline=[start,...drawn.map(point=>({...point,index:null})),end,...path];
      const result=buildRetopoQuad(mesh,outline,start.normal);
      if(!result.ok)continue;
      if(candidate)return false;
      candidate={outline,result};
    }
    if(candidate){
      commitQuad(candidate.outline,candidate.result);
      return true;
    }
  }
  return false;
}
function relaxDab(d,e,initial=false){
  d.brush={x:e.clientX,y:e.clientY};drawCorners();
  if(!retopoId||!d.mesh.faces.length)return;
  if(!initial&&Number.isFinite(e.timeStamp)&&e.timeStamp-d.lastDab<24)return;
  d.lastDab=e.timeStamp;
  const previous=d.lastBrush||d.brush;
  d.lastBrush=d.brush;
  const rect=canvas.getBoundingClientRect(),camera=state().camera;
  const dx=d.brush.x-previous.x,dy=d.brush.y-previous.y;
  const length=dx*dx+dy*dy;
  function weight(index,vertex,onBoundary){
    const p=screenPoint(vertex,rect,camera),reach=onBoundary?40:48;
    if(Math.abs(p.z)>1)return 0;
    const t=length?Math.max(0,Math.min(1,((p.x-previous.x)*dx+(p.y-previous.y)*dy)/length)):0;
    const distance=Math.hypot(p.x-previous.x-t*dx,p.y-previous.y-t*dy);
    return distance<reach&&visibleBoundaryVertex(vertex,p,rect,camera)?1-(distance/reach)**2:0;
  }
  function project(target,current,averageEdge){
    const p=screenPoint(target,rect,camera),hit=surface.hit(camera,rect,p.x,p.y);
    return hit&&current.distanceTo(hit.point)<=averageEdge*.48?hit.point:null;
  }
  const pressure=e.pointerType==='pen'&&Number.isFinite(e.pressure)?Math.max(0,Math.min(1,e.pressure)):.5;
  const result=quadRelaxFlow(d.mesh,{strength:.65+.8*pressure,maxFraction:.22+.22*pressure,weight,project,relaxBoundary:true,boundaryAlignment:.45});
  if(result.changed){d.relaxed=true;render();}
}
function finishRelax(d){
  clearCorners();
  if(!d.relaxed){message('Retopo · brush across visible quad vertices or along an outer edge');return;}
  globalThis.__boxlabHistory.push(d.beforeMesh);
  manager().saveActive();globalThis.__boxlabSelectionBridge?.clear?.();render();
  message('Retopo · quad spacing relaxed');
}
function up(e){
  if(picking){sourceUp(e);return;}
  if(!drag||e.pointerId!==drag.pointer)return;
  consume(e);const d=drag;
  if(e.type!=='pointerup'||!valid()||state().mesh!==d.mesh||!d.valid){cancelDrag();return;}
  drag=null;release(d);
  if(tool==='quad'){finishStroke(d,e);return;}
  if(tool==='triangle'||tool==='ngon'){if(!d.moved&&d.point)quadCorner(d);return;}
  if(tool==='relax'){finishRelax(d);return;}
  if(d.index!==null){
    if(d.start.distanceToSquared(d.mesh.vertices[d.index])>1e-16)globalThis.__boxlabHistory?.push?.(d.beforeMesh);
  }else if(!d.moved){
    if(!retopoId){
      if(!d.before){message('Retopo · history is still loading');return;}
      const mesh=new EditableMesh([],[]);mesh.addLooseVertex(d.point);
      const o=manager().addMesh(mesh,'Retopo',{enterObjectMode:false,retopoReferenceId:referenceId,settings:{mirror:{x:false,y:false,z:false},subd:false,subdLevel:1,cage:true}});
      retopoId=o.id;
      globalThis.__boxlabObjectHistory.checkpointSnapshot(d.before,d.before.objects.find(o=>o.id===d.before.activeId)?.mesh||new EditableMesh([],[]));
    }else {globalThis.__boxlabHistory.push(d.beforeMesh);d.mesh.addLooseVertex(d.point);}
  }
  manager().saveActive();globalThis.__boxlabSelectionBridge?.clear?.();render();message('Retopo · surface vertex retained · Undo/Redo available');
}
button.addEventListener('click',()=>active||picking?close():chooseSource());
applyPatch.addEventListener('click',()=>{
  const patch=pendingPatch;
  clearPatch();
  if(!patch||!valid()||patch.source!==state().mesh)return;
  commitQuad(null,{ok:true,mesh:patch.mesh});
});
cancelPatch.addEventListener('click',()=>{clearPatch();message('Retopo · patch cancelled');});
previewToggle.addEventListener('change',()=>{if(!previewToggle.checked)clearPatch();});
panel.querySelector('#retopoDone').addEventListener('click',close);
panel.querySelector('#retopoVertex').addEventListener('click',()=>setTool('vertex'));
panel.querySelector('#retopoQuad').addEventListener('click',()=>setTool('quad'));
panel.querySelector('#retopoTriangle').addEventListener('click',()=>setTool('triangle'));
panel.querySelector('#retopoNgon').addEventListener('click',()=>setTool('ngon'));
panel.querySelector('#retopoFinishFace').addEventListener('click',()=>{if(corners.length>=5)commitPolygon(corners);});
panel.querySelector('#retopoRelax').addEventListener('click',()=>setTool('relax'));
panel.querySelector('#retopoClear').addEventListener('click',()=>{cancelDrag();clearCorners();message('Retopo · corners cleared');});
window.addEventListener('resize',drawCorners);
// One explicit editing owner. Touch contacts remain with native navigation.
window.addEventListener('pointerdown',down,{capture:true,passive:false});window.addEventListener('pointermove',move,{capture:true,passive:false});
window.addEventListener('pointerup',up,{capture:true,passive:false});window.addEventListener('pointercancel',up,{capture:true,passive:false});
canvas.addEventListener('lostpointercapture',cancelDrag);
window.addEventListener('blur',()=>{sourceTap=null;cancelDrag();});window.addEventListener('pagehide',()=>{if(active||picking)close();});
window.addEventListener('keydown',e=>{if(active&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){consume(e);cancelDrag();document.querySelector(e.shiftKey?'#redoBtn':'#undoBtn')?.click();return;}if((active||picking)&&e.key==='Escape'){consume(e);if(drag)cancelDrag();else if(pendingPatch){clearPatch();message('Retopo · patch cancelled');}else if(corners.length){clearCorners();message('Retopo · corners cleared');}else close();}},true);
document.addEventListener('click',e=>{
  if(!active&&!picking)return;
  if(e.target.closest?.('#undoBtn,#redoBtn')){cancelDrag();clearCorners();}
  else if(e.target.closest?.('#selectionModes button')&&e.target.closest('button')!==button){
    const picked=e.target.closest('button');
    // Object activation/history clears native selection by clicking the CURRENT
    // Vertex button. This is not a request to leave the Retopo workspace.
    if(picked.dataset.mode==='vertex'&&!e.isTrusted)return;
    close();
  }
},true);
globalThis.__boxlabRetopo= {start,close,selectReference,resumeSaved,get active(){return active||picking;},get referenceId(){return referenceId;},get retopoId(){return retopoId;},get drawQuads(){return active&&tool!=='vertex';}};
