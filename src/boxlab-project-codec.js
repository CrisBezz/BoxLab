// Versioned, non-destructive BoxLab scene codec foundation.
// Explicitly refuse resources not yet representable, rather than losing them.
import {evaluateArray} from './live-array-core.js?v=0.36.18.841';
const plain=value=>value==null?null:JSON.parse(JSON.stringify(value));
export function encodeBoxlabScene(snapshot){
 if(!snapshot||!Array.isArray(snapshot.objects)||!snapshot.objects.length)throw Error('Scene has no objects');
 const objects=snapshot.objects.map(o=>{
  const m=o.mesh;
  if(o.arrayRecipe)evaluateArray(o.arrayRecipe);
  if(!m||!Array.isArray(m.vertices)||!Array.isArray(m.faces))throw Error('Missing editable mesh');
  if(o.glbPassthrough||o.materials||o.textures||m.uvs||m.faceUVs)throw Error('Unsupported embedded project resources');
  const vertices=m.vertices.map(v=>[v.x,v.y,v.z]);
  if(vertices.some(v=>v.some(n=>!Number.isFinite(n))))throw Error('Non-finite mesh coordinate');
  const faces=m.faces.map(f=>[...f]);
  if(faces.some(f=>f.length<3||f.some(i=>!Number.isInteger(i)||i<0||i>=vertices.length)))throw Error('Invalid mesh topology');
  const creases=[...(m.creases||new Map())];
  if(creases.some(([k,v])=>typeof k!=='string'||!Number.isFinite(v)))throw Error('Invalid crease data');
  return {id:o.id,name:o.name,visible:o.visible!==false,locked:!!o.locked,kind:o.kind||'editable',settings:plain(o.settings),origin:plain(o.origin),groupId:o.groupId??null,sourceId:o.sourceId??null,instanceMatrix:plain(o.instanceMatrix),booleanRecipe:plain(o.booleanRecipe),curveProfile:plain(o.curveProfile),...(o.arrayRecipe?{arrayRecipe:plain(o.arrayRecipe)}:{}),mesh:{vertices,faces,creases,faceGroups:[...(m.faceGroups||[])],looseEdges:[...(m.looseEdges||[])],looseVertices:[...(m.looseVertices||[])]}};
 });
 return {format:'boxlab',version:1,activeId:snapshot.activeId,selected:[...(snapshot.selected||[])],multi:!!snapshot.multi,groups:plain(snapshot.groups),objects};
}
export function decodeBoxlabScene(data,makeMesh){
 if(data?.format!=='boxlab'||data.version!==1||!Array.isArray(data.objects)||!data.objects.length)throw Error('Unsupported BOXLAB project');
 if(typeof makeMesh!=='function')throw Error('Mesh factory required');
 const objects=data.objects.map(o=>{
  const m=o.mesh;
  if(!m||!Array.isArray(m.vertices)||!Array.isArray(m.faces))throw Error('Missing mesh data');
  if(m.vertices.some(v=>!Array.isArray(v)||v.length!==3||v.some(n=>!Number.isFinite(n))))throw Error('Invalid vertex');
  if(m.faces.some(f=>!Array.isArray(f)||f.length<3||f.some(i=>!Number.isInteger(i)||i<0||i>=m.vertices.length)))throw Error('Invalid face');
  if(o.arrayRecipe)evaluateArray(o.arrayRecipe);
  const mesh=makeMesh(m.vertices,m.faces,new Map(m.creases||[]),m.faceGroups||[]);
  mesh.looseEdges=new Set(m.looseEdges||[]);
  mesh.looseVertices=new Set(m.looseVertices||[]);
  return {...o,mesh,history:{undo:[],redo:[]}};
 });
 return {activeId:data.activeId,selected:[...(data.selected||[])],multi:!!data.multi,groups:plain(data.groups),objects};
}
