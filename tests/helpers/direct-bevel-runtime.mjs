import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync(new URL('../../src/direct-bevel.js',import.meta.url),'utf8');
export function assertBevelOwnerDisarm(){
 const calls=[];const c={armed:true,drag:null,faceSession:null,persistentEdge:true,edgeSession:{ghost:{id:'edge'}},facePreview:{id:'face'},
 button:{classList:{remove:value=>calls.push(value)}},disposeFaceBevelPreview:p=>{if(p)calls.push(p.id);},state:()=>({}),
 applyExact(){},faceBevelInfo(){},armFaces(){},cancelFaces(){},faceContextValid(){},previewFaces(){},previewEdges(){},syncEdgePreview(){}};
 vm.createContext(c);
 const a=source.indexOf('function disarm(){'),b=source.indexOf('function editable(){',a);assert.ok(a>=0&&b>a);
 const discard=source.indexOf('function discardEdgePreview(){'),discardEnd=source.indexOf('\n',discard);
 vm.runInContext(source.slice(a,b)+source.slice(discard,discardEnd)+source.slice(source.indexOf('globalThis.__boxlabDirectBevel=')),c);
 const api=c.__boxlabDirectBevel;assert.equal(api.active(),true);assert.equal(api.busy(),false);
 api.disarm();assert.equal(api.active(),false);assert.equal(c.faceSession,null);assert.equal(c.edgeSession,null);assert.equal(c.facePreview,null);assert.equal(c.persistentEdge,false);
 assert.deepEqual(calls,['edge','face','active']);api.disarm();assert.equal(api.active(),false);assert.deepEqual(calls,['edge','face','active','active']);
}
