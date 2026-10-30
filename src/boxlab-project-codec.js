import {createProjectMetalnessPool,decodeProjectMetalnessPool} from './project-metalness-resources.js?v=0.36.18.1025';
import {createProjectRoughnessPool,decodeProjectRoughnessPool} from './project-roughness-resources.js?v=0.36.18.1025';
// Versioned, non-destructive BoxLab scene codec foundation.
// Explicitly refuse resources not yet representable, rather than losing them.
import {encodeProjectGLB,decodeProjectGLB,createProjectGLBImagePool,decodeProjectGLBImagePool} from './project-glb-resources.js?v=0.36.18.1025';
import {evaluateArray} from './live-array-core.js?v=0.36.18.861';
import {createProjectPaintPool,decodeProjectPaintPool,paintOwner} from './project-paint-resources.js?v=0.36.18.1025';
const plain=value=>value==null?null:JSON.parse(JSON.stringify(value));
export function encodeBoxlabScene(snapshot,{poolImages=true}={}){
 if(!snapshot||!Array.isArray(snapshot.objects)||!snapshot.objects.length)throw Error('Scene has no objects');
 const pool=poolImages&&!snapshot.__boxlabInlineGLB?createProjectGLBImagePool():null;
 const paint=createProjectPaintPool(),roughness=createProjectRoughnessPool(),metalness=createProjectMetalnessPool();
 const objects=snapshot.objects.map(o=>{
  if(o.colourPaint||o.roughnessPaint||o.metalnessPaint)paintOwner(o);
  const m=o.mesh;
  if(o.glbPassthrough&&o.sourceId)throw Error('Linked imported GLB projects are not supported yet');
  if(o.arrayRecipe)evaluateArray(o.arrayRecipe);
  if(!m||!Array.isArray(m.vertices)||!Array.isArray(m.faces))throw Error('Missing editable mesh');
  if(o.materials||o.textures||m.uvs||m.faceUVs||m.uvLayers||m.materialSlots)throw Error('Unsupported embedded project resources');
  const vertices=m.vertices.map(v=>[v.x,v.y,v.z]);
  if(vertices.some(v=>v.some(n=>!Number.isFinite(n))))throw Error('Non-finite mesh coordinate');
  const faces=m.faces.map(f=>[...f]);
  if(faces.some(f=>f.length<3||f.some(i=>!Number.isInteger(i)||i<0||i>=vertices.length)))throw Error('Invalid mesh topology');
  const creases=[...(m.creases||new Map())];
  if(creases.some(([k,v])=>typeof k!=='string'||!Number.isFinite(v)))throw Error('Invalid crease data');
  return {...(o.metalnessPaint?{metalnessPaintResource:metalness.add(o.metalnessPaint)}:{}),...(o.roughnessPaint?{roughnessPaintResource:roughness.add(o.roughnessPaint)}:{}),...(o.colourPaint?{colourPaintResource:paint.add(o.colourPaint)}:{}),...(o.glbPassthrough?{glbResource:encodeProjectGLB(o.glbPassthrough,pool)}:{}),id:o.id,name:o.name,visible:o.visible!==false,locked:!!o.locked,kind:o.kind||'editable',settings:plain(o.settings),origin:plain(o.origin),groupId:o.groupId??null,sourceId:o.sourceId??null,instanceMatrix:plain(o.instanceMatrix),booleanRecipe:plain(o.booleanRecipe),curveProfile:plain(o.curveProfile),...(o.arrayRecipe?{arrayRecipe:plain(o.arrayRecipe)}:{}),mesh:{vertices,faces,creases,faceGroups:[...(m.faceGroups||[])],looseEdges:[...(m.looseEdges||[])],looseVertices:[...(m.looseVertices||[])]}};
 });
 const colourVersion=paint.pooled?5:paint.images?4:paint.layered?3:paint.resources.length?2:1;
 const scene={...(roughness.resources.length?{roughnessPaintPool:roughness.resources,colourPaintVersion:colourVersion}:{}),...(paint.pooled?{colourPaintBytePool:paint.bytePool}:{}),...(pool?.images.length?{glbImagePool:pool.images}:{}),...(paint.resources.length?{colourPaintPool:paint.resources}:{}),format:'boxlab',version:roughness.resources.length?6:colourVersion,activeId:snapshot.activeId,selected:[...(snapshot.selected||[])],multi:!!snapshot.multi,groups:plain(snapshot.groups),objects};
 return metalness.resources.length?{...scene,version:7,paintProjectVersion:scene.version,metalnessPaintPool:metalness.resources}:scene;
}
export function decodeBoxlabScene(data,makeMesh){
 if(data?.format!=='boxlab'||![1,2,3,4,5,6,7].includes(data.version)||!Array.isArray(data.objects)||!data.objects.length)throw Error('Unsupported BOXLAB project');
 if(typeof makeMesh!=='function')throw Error('Mesh factory required');
 const metalness=decodeProjectMetalnessPool(data);
 const roughness=decodeProjectRoughnessPool(metalness.baseScene);
 const pool=data.glbImagePool==null?null:decodeProjectGLBImagePool(data.glbImagePool);
 const paint=decodeProjectPaintPool(roughness.colourScene);
 const objects=data.objects.map(o=>{
  const metalnessPaint=Object.hasOwn(o,'metalnessPaintResource')?metalness.get(o.metalnessPaintResource):null;
  const roughnessPaint=Object.hasOwn(o,'roughnessPaintResource')?roughness.get(o.roughnessPaintResource):null;
  if(Object.hasOwn(o,'colourPaint'))throw Error('Unencoded colour paint resource');
  const colourPaint=Object.hasOwn(o,'colourPaintResource')?paint.get(o.colourPaintResource):null;
  if(o.glbPassthrough)throw Error('Unencoded GLB project resources');
  const glb=o.glbResource?decodeProjectGLB(o.glbResource,pool):null;
  const m=o.mesh;
  if(!m||!Array.isArray(m.vertices)||!Array.isArray(m.faces))throw Error('Missing mesh data');
  if(m.vertices.some(v=>!Array.isArray(v)||v.length!==3||v.some(n=>!Number.isFinite(n))))throw Error('Invalid vertex');
  if(m.faces.some(f=>!Array.isArray(f)||f.length<3||f.some(i=>!Number.isInteger(i)||i<0||i>=m.vertices.length)))throw Error('Invalid face');
  if(o.arrayRecipe)evaluateArray(o.arrayRecipe);
  const mesh=makeMesh(m.vertices,m.faces,new Map(m.creases||[]),m.faceGroups||[]);
  mesh.looseEdges=new Set(m.looseEdges||[]);
  mesh.looseVertices=new Set(m.looseVertices||[]);
  const {glbResource,colourPaintResource,roughnessPaintResource,metalnessPaintResource,...rest}=o;const object={...rest,...(metalnessPaint?{metalnessPaint}:{}),...(roughnessPaint?{roughnessPaint}:{}),...(colourPaint?{colourPaint}:{}),...(glb?{glbPassthrough:glb}:{}),mesh,history:{undo:[],redo:[]}};if(colourPaint||roughnessPaint||metalnessPaint)paintOwner(object);return object;
 });
 paint.finish();roughness.finish();metalness.finish();
 const result={activeId:data.activeId,selected:[...(data.selected||[])],multi:!!data.multi,groups:plain(data.groups),objects};
 // Open's exact roundtrip validation must retain legacy inline resource encoding.
 Object.defineProperty(result,'__boxlabInlineGLB',{value:pool===null});return result;
}
