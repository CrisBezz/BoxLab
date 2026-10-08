import fs from 'node:fs';import vm from 'node:vm';import {EditableMesh} from '../../src/mesh.js';import * as THREE from 'three';
const root=new URL('../../src/',import.meta.url).pathname;
for(const [file,name] of [['loose-topology','installLooseTopology'],['bevel-topology','installBevelTopology'],['rounded-loop-bevel','installRoundedLoopBevel'],['general-edge-bevel-topology','installGeneralEdgeBevelTopology'],['multi-edge-chamfer-topology','installMultiEdgeChamferTopology'],['perimeter-fan-bevel','installPerimeterFanBevel'],['generalized-edge-fan-bevel','installGeneralizedEdgeFanBevel'],['bevel-selection','installBevelSelection'],['perimeter-bevel-routing','installPerimeterBevelRouting'],['bevel-watertight-guard','installBevelWatertightGuard']]){(await import(root+file+'.js'))[name](EditableMesh);}
vm.runInNewContext(fs.readFileSync(root+'loop-cut-added-vertex.js','utf8').replace(/^import .*;\n/gm,''),{LiveEditableMesh:EditableMesh});
const listeners=new Map();const node={classList:{add(){},remove(){}},dispatchEvent(){},releasePointerCapture(){},addEventListener(type,fn){listeners.set(type,fn)}};const ctx={THREE,document:{querySelector:()=>node,addEventListener(){}},window:{addEventListener(){},dispatchEvent(){}},Event:class{},CustomEvent:class{},Map,Set};vm.createContext(ctx);vm.runInContext(fs.readFileSync(root+'knife-tool.js','utf8').replace(/^import .*;\n/gm,'')+'\nglobalThis.cutEdge=splitEdge;globalThis.startCut=(start,end)=>{drag={source:captureDragSource(globalThis.__boxlabBridgeState.mesh),mesh:globalThis.__boxlabBridgeState.mesh,object:globalThis.__boxlabObjectManager?.activeId,id:1,x:0,y:0,start};endpointWithHysteresis=()=>end;};',ctx);

export {EditableMesh};
export function knife(mesh,history,fi=1){
 ctx.__boxlabBridgeState={mesh};ctx.__boxlabHistory=history;ctx.__boxlabSelectionBridge={mode:()=> 'face'};
 const face=[...mesh.faces[fi]],snap=(a,b)=>({kind:'edge',snapType:'MID',key:mesh.edgeKey(a,b),faceA:a,faceB:b,t:.5});
 ctx.startCut(snap(face[0],face[1]),snap(face[2],face[3]));
 listeners.get('pointerup')({pointerId:1,clientX:100,clientY:0,preventDefault(){},stopImmediatePropagation(){}});
}
