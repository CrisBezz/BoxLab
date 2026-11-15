import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const read=(path)=>fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8');

function vector(){
  return {
    x:0,y:0,z:0,
    copy(value){this.x=value.x;this.y=value.y;this.z=value.z;return this;},
    multiplyScalar(value){this.x*=value;this.y*=value;this.z*=value;return this;},
    add(value){this.x+=value.x;this.y+=value.y;this.z+=value.z;return this;},
  };
}

function camera(){
  const result={
    position:vector(),quaternion:{copy(){return this;}},up:{copy(){return this;}},
    matrixWorld:{elements:Array(16).fill(0)},projectionMatrix:{elements:Array(16).fill(0)},
    fov:42,aspect:1.5,near:0.1,far:100,
    updateMatrixWorld(){},updateProjectionMatrix(){},
    clone(){const cloned=camera();cloned.fov=this.fov;cloned.aspect=this.aspect;cloned.near=this.near;cloned.far=this.far;return cloned;},
  };
  return result;
}

function harness(){
  const listeners=new Map(),tracers=[];
  const validBuffer=new ArrayBuffer(8);
  const wrap={clientWidth:900,clientHeight:600,append(){}};
  const status={textContent:''};
  const document={
    querySelector(selector){return selector==='#viewportWrap'?wrap:selector==='#selectionStatus'?status:null;},
    createElement(){return{style:{},click(){}};},
    addEventListener(type,callback){const rows=listeners.get(type)||[];rows.push(callback);listeners.set(type,rows);},
    dispatchEvent(event){for(const callback of listeners.get(event.type)||[])callback(event);},
  };
  const renderer={domElement:{toDataURL(){return'data:image/png;base64,';}}};
  const controls={addEventListener(){},removeEventListener(){}};
  const sourceCamera=camera();
  const globalThis={
    __boxlabBridgeState:{camera:sourceCamera,renderer,controls},
    __boxlabObjectManager:{objects:[{id:21,name:'Model',kind:'editable',visible:true,mesh:{}}],saveActive(){}},
    __boxlabExportAs:{async buildGLB(){return{buffer:validBuffer,verification:{pass:true}};}},
  };
  globalThis.__mockHeliosModule={
    async createBoxLabHeliosTrace(){
      const actions=[];
      const material={id:'imported_mat_1',name:'Brass'};
      const state={materials:[material],lights:[],settings:{maxSamples:32},samples:0,resolution:[900,600]};
      const tracer={
        transform:{scale:1,offset:vector()},
        getState(){return state;},
        applyPreferences(){actions.push('preferences');},
        async uploadMaterialMap(id,slot,file){actions.push({kind:'upload',id,slot,file});},
        restoreMaterialPresetMaps(id){actions.push({kind:'restore',id});},
        updateLights(){},updateMaterial(){},updateSettings(){},applyLightingRig(){},applyMaterialPreset(){},
        reset(){},resize(){},render(){return 0;},getSamples(){return 0;},dispose(){actions.push('dispose');},
      };
      tracer.actions=actions;tracers.push(tracer);return tracer;
    },
  };
  const window={addEventListener(){}};
  let frame=0;
  const context={
    document,window,globalThis,console:{warn(){},error(){}},CustomEvent:class{constructor(type,init={}){this.type=type;this.detail=init.detail;}},
    requestAnimationFrame(){return ++frame;},cancelAnimationFrame(){},setTimeout(){return 1;},clearTimeout(){},
    ResizeObserver:undefined,
    Date,Map,Set,Promise,Math,Number,String,Boolean,Object,Array,ArrayBuffer,JSON,
  };
  const source=read('src/pathtrace-mode.js')
    .replace(/^import \* as THREE from 'three';\s*/,'')
    .replace('import(HELIOS_BUNDLE)','Promise.resolve(globalThis.__mockHeliosModule)');
  vm.runInNewContext(source,context,{filename:'src/pathtrace-mode.js'});
  const fire=async(type,detail)=>{
    const values=[];
    for(const callback of listeners.get(type)||[])values.push(callback({type,detail}));
    await Promise.all(values.map(value=>Promise.resolve(value)));
  };
  const settle=async()=>{for(let i=0;i<8;i++)await new Promise(resolve=>setTimeout(resolve,0));};
  return{tracers,globalThis,fire,settle};
}

test('1167 keeps replaced maps across PBR/Helios rebuilds and replays Restore before later uploads',async()=>{
  const h=harness();
  await h.fire('boxlab-render-mode-change',{mode:'pathtrace'});await h.settle();
  assert.equal(h.tracers.length,1,'entering Helios creates the first tracer');

  const firstFile={name:'first-metalness.png',type:'image/png'};
  await h.fire('boxlab-helios-dock-action',{action:'upload-map',id:'imported_mat_1',slot:'metalness',file:firstFile});
  await h.fire('boxlab-render-mode-change',{mode:'pbr'});
  await h.fire('boxlab-render-mode-change',{mode:'pathtrace'});await h.settle();
  assert.equal(h.tracers.length,2,'returning to Helios rebuilds the disposed tracer');
  assert.ok(h.tracers[1].actions.some(action=>action.kind==='upload'&&action.file===firstFile),
    'the same uploaded File is applied to the new tracer');

  await h.fire('boxlab-helios-dock-action',{action:'restore-maps',id:'imported_mat_1'});
  const afterRestoreFile={name:'second-metalness.png',type:'image/png'};
  await h.fire('boxlab-helios-dock-action',{action:'upload-map',id:'imported_mat_1',slot:'metalness',file:afterRestoreFile});
  await h.fire('boxlab-render-mode-change',{mode:'pbr'});
  await h.fire('boxlab-render-mode-change',{mode:'pathtrace'});await h.settle();
  const replay=h.tracers[2].actions.filter(action=>action.kind==='restore'||action.kind==='upload');
  assert.deepEqual(replay.map(action=>action.kind),['restore','upload'],
    'the reset-to-source action is replayed before subsequent slot replacements');
  assert.equal(replay[1].file,afterRestoreFile);
});

test('1167 drops render-map overrides when the BoxLab object identity set changes',async()=>{
  const h=harness();
  await h.fire('boxlab-render-mode-change',{mode:'pathtrace'});await h.settle();
  const file={name:'session-map.png',type:'image/png'};
  await h.fire('boxlab-helios-dock-action',{action:'upload-map',id:'imported_mat_1',slot:'roughness',file});
  await h.fire('boxlab-render-mode-change',{mode:'pbr'});
  h.globalThis.__boxlabObjectManager.objects=[{id:22,name:'Other model',kind:'editable',visible:true,mesh:{}}];
  await h.fire('boxlab-render-mode-change',{mode:'pathtrace'});await h.settle();
  assert.equal(h.tracers.length,2);
  assert.equal(h.tracers[1].actions.some(action=>action.kind==='upload'),false,
    'an override from a different scene cannot attach to a reused material index');
});

test('1168 release graph refreshes the pathtrace owner and bundled tracer',()=>{
  const version=JSON.parse(read('version.json')).version;
  const index=read('index.html'),mode=read('src/pathtrace-mode.js'),shell=read('src/shell-comparison.js');
  assert.equal(version,'0.36.18.1168');
  assert.match(index,/<title>BoxLab v0\.36\.18\.1168<\/title>/);
  assert.match(index,/data-release-version="0\.36\.18\.1168">v0\.36\.18\.1168/);
  assert.match(index,/src\/pathtrace-mode\.js\?v=0\.36\.18\.1168/);
  assert.match(mode,/helios-tracer\.bundle\.js\?v=0\.36\.18\.1168/);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(shell,/RELEASE='0\.36\.18\.1168'/);
});
