import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {EditableMesh} from '../../src/mesh.js';
import {History} from '../../src/history.js';
const read=name=>fs.readFileSync(new URL('../../src/'+name,import.meta.url),'utf8');
const management=read('object-management.js'),boolean=read('boolean-prototype.js');
function section(source,start,end){
  const a=source.indexOf(start),b=source.indexOf(end,a);
  assert.ok(a>=0&&b>a,`runtime section missing: ${start}`);
  return source.slice(a,b);
}
// Execute actual capture/restore/history and Boolean apply owners. Only the DOM,
// object manager and Boolean solver are doubles; this is not geometry coverage.
export function booleanSceneRuntime({groups=false,eligible=true,solverOK=true,createOK=true}={}){
  const history=new History(),events=[],listeners=[];
  const object=(id,name,extra={})=>({id,name,mesh:EditableMesh.cube(2),visible:true,locked:false,kind:'editable',settings:{mirror:{x:false},subd:false,cage:true},history:{undo:[],redo:[]},...extra});
  const matrix=[1,0,0,0,0,1,0,0,0,0,1,0,4,5,6,1];
  const a=object(1,'A',{sourceId:'linked',instanceMatrix:matrix,origin:{x:1,y:2,z:3},...(groups?{groupId:7}:{})});
  const b=object(2,'B',groups?{groupId:8}:{});
  const peer=object(3,'Peer',{sourceId:'linked',instanceMatrix:[...matrix]});
  const extra=object(4,'Hidden',{visible:false,...(groups?{groupId:7}:{})});
  const ref=object(5,'Reference',{kind:'reference',locked:true});
  let c;
  const manager={objects:[a,b,peer,extra,ref],activeId:1,activate(id){this.activeId=id;c.__boxlabBridgeState.mesh=this.objects.find(o=>o.id===id).mesh;},addMesh(mesh,name,options){
    events.push('add');if(!createOK)return null;
    const result=object(6,name,{...options,mesh});this.objects.push(result);this.activate(result.id);return result;
  }};
  const resultMesh=EditableMesh.cube(3);resultMesh.faceGroups=resultMesh.faces.map(()=> 'Result');
  c={__boxlabHistory:history,__boxlabObjectManager:manager,__boxlabBridgeState:{mesh:a.mesh},
    historyBridgeInstalled:false,selectedIds:new Set(groups?[1,2,4]:[1,2]),multiEnabled:true,
    groupNames:new Map(groups?[[7,'Group A'],[8,'Group B']]:[]),collapsedGroups:new Set(groups?[7]:[]),
    currentMode:()=> 'object',updateUI(){},forceRender(){},queueMicrotask:fn=>fn(),
    document:{addEventListener(type,fn,capture){listeners.push({type,fn,capture});}},
    setStatus:text=>events.push(text),DEGENERATE_INPUT:'degenerate',
    eligibility:()=>eligible?{ok:true,kind:groups?'groups':'objects',active:groups?{name:'Group A',members:[a,extra]}:a,other:groups?{name:'Group B',members:[b]}:b,...(groups?{originals:[a,extra,b]}:{})}:{ok:false,reason:'ineligible'},
    buildResult(){events.push('solve-objects');return{ok:solverOK,mesh:resultMesh,reason:'rejected'};},
    buildGroupResult(){events.push('solve-groups');return{ok:solverOK,mesh:resultMesh,reason:'rejected'};},
    selection:()=>({select(ids){c.selectedIds=new Set(ids);}}),__boxlabTopologyGate:{sync(){events.push('sync');}}
  };
  vm.createContext(c);
  vm.runInContext(section(management,'function manager(){','function injectStyle(){'),c);
  // DOM-specific forceRender/currentMode are outside this fixture's scope.
  c.forceRender=()=>{};c.currentMode=()=> 'object';c.setStatus=text=>events.push(text);
  vm.runInContext(section(management,'function installHistoryBridge(){','function initialize(){'),c);
  c.installHistoryBridge();
  const bridge=c.__boxlabObjectHistory,baseCapture=bridge.capture,baseCheckpoint=bridge.checkpointSnapshot;
  bridge.capture=()=>{events.push('capture');return baseCapture();};
  bridge.checkpointSnapshot=snapshot=>{events.push('checkpoint');return baseCheckpoint(snapshot);};
  vm.runInContext(section(boolean,'function booleanNameStem(','function sync(){')+section(boolean,'function apply(operation){','\nensureUI();'),c);
  const snapshot=()=>JSON.parse(JSON.stringify(bridge.capture()));
  events.length=0;
  return{c,history,manager,events,listeners,snapshot,apply:operation=>c.apply(operation),undo:()=>history.undo(c.__boxlabBridgeState.mesh),redo:()=>history.redo(c.__boxlabBridgeState.mesh)};
}
