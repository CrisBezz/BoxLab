import {assertAssetReference,assertShellRelease} from './helpers/release-contract.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const index=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const topbar=fs.readFileSync(new URL('../src/topbar-layout.js',import.meta.url),'utf8');
const beta5=fs.readFileSync(new URL('../beta-5/index.html',import.meta.url),'utf8');

// Execute the complete current topbar owner. Imported viewport installers are
// stubs; unrelated layout nodes are absent. This is a controlled DOM/dispatch
// fixture, not native Safari focus, propagation or file-picker evidence.
function menuRuntime(source=topbar){
  const listeners=[],microtasks=[];
  const fileMenu={open:true};
  const document={
    querySelector:selector=>selector==='#fileMenu'?fileMenu:null,
    createElement:()=>({textContent:''}),head:{append(){}},
    addEventListener:(type,callback,capture)=>listeners.push({type,callback,capture}),
  };
  vm.runInNewContext(source.replace(/^import .*;\n/gm,''),{
    document,queueMicrotask:callback=>microtasks.push(callback),
    installViewportToolbarControls(){},installViewportSelectionPanel(){},
  });
  for(const type of ['pointerdown','click']){
    const found=listeners.filter(listener=>listener.type===type);
    assert.equal(found.length,1,`${type} has one menu owner`);
    assert.equal(found[0].capture,true,`${type} runs in capture`);
  }
  // Minimal selector-aware element double for ID, tag and contenteditable
  // descendant selectors used by this owner. closest walks actual fixture parents.
  function element(tag,id='',parent=null,attributes={}){
    const node={tag,id,parent,attributes};
    const simple=(candidate,token)=>token.startsWith('#')?candidate.id===token.slice(1)
      :token.startsWith('[')?candidate.attributes.contenteditable===token.match(/="([^"]*)"/)?.[1]
      :candidate.tag===token;
    node.closest=selector=>{
      for(let candidate=node;candidate;candidate=candidate.parent){
        for(const part of selector.split(',')){
          const tokens=part.trim().split(/\s+/);
          if(!simple(candidate,tokens.at(-1)))continue;
          if(tokens.length===1)return candidate;
          assert.equal(tokens.length,2,'fixture supports a single descendant selector');
          for(let ancestor=candidate.parent;ancestor;ancestor=ancestor.parent){
            if(simple(ancestor,tokens[0]))return candidate;
          }
        }
      }
      return null;
    };
    return node;
  }
  function dispatch(type,target){
    let consumed=0;
    const event={type,target,preventDefault(){consumed++;},stopPropagation(){consumed++;},stopImmediatePropagation(){consumed++;}};
    listeners.find(listener=>listener.type===type).callback(event);
    assert.equal(consumed,0,'menu dismissal must not consume an action or editable interaction');
  }
  function flush(){while(microtasks.length)microtasks.shift()();}
  return {fileMenu,microtasks,element,dispatch,flush};
}

function editingAndConfiguration(source=topbar){
  const r=menuRuntime(source),menu=r.element('details','fileMenu');
  const targets=[r.element('input','exportFileName',menu),r.element('input','splitImportGroups',menu),
    r.element('textarea','',menu),r.element('select','',menu),
    r.element('span','',menu,{contenteditable:'true'}),r.element('span','',menu,{contenteditable:''})];
  // An editable descendant takes precedence over its terminal-action ancestor.
  targets.push(r.element('span','',r.element('button','exportAsBtn',menu),{contenteditable:'true'}));
  for(const id of ['importKind','exportFormat','exportGeometry']){
    assert.ok(index.includes(`id="${id}"`),`${id} exists in the live shell`);
    const group=r.element('div',id,menu);
    for(let choice=0;choice<2;choice++)targets.push(r.element('span','',r.element('button','',group)));
  }
  targets.push(r.element('span','',r.element('label','',menu)),r.element('summary','',menu));
  for(const target of targets){
    r.fileMenu.open=true;
    r.dispatch('pointerdown',target);r.dispatch('click',target);
    assert.equal(r.fileMenu.open,true,'editable/configuration interactions keep File open');
    assert.equal(r.microtasks.length,0,'no delayed close after choosing settings');
    r.flush();assert.equal(r.fileMenu.open,true);
  }
  r.dispatch('pointerdown',r.element('canvas','viewport'));
  assert.equal(r.fileMenu.open,false,'outside press dismisses File');
  r.dispatch('click',targets[0]);
  assert.equal(r.fileMenu.open,false,'closed menu remains closed');
  assert.equal(r.microtasks.length,0);
}

function terminalActions(source=topbar){
  for(const id of ['importMeshBtn','exportAsBtn','exportBaseBtn','exportSubdBtn','installAppBtn','resetBtn']){
    assert.ok(index.includes(`id="${id}"`),`${id} exists in the live shell`);
    const r=menuRuntime(source),menu=r.element('details','fileMenu');
    const target=r.element('span','',r.element('button',id,menu));
    r.dispatch('pointerdown',target);
    assert.equal(r.fileMenu.open,true,'inside press preserves the action target');
    r.dispatch('click',target);
    assert.equal(r.fileMenu.open,true,'action callback runs before queued dismissal');
    assert.equal(r.microtasks.length,1,'terminal action queues exactly one close');
    let actionCalls=0;
    // Controlled target callback verifies timing, not import/export output.
    const action=()=>{assert.equal(r.fileMenu.open,true);actionCalls++;};
    action();r.flush();
    assert.equal(actionCalls,1);
    assert.equal(r.fileMenu.open,false,'File closes after the action callback');
    r.dispatch('click',target);assert.equal(r.microtasks.length,0,'closed menu is inert');
  }
}

test('542 File menu does not close when editing form controls',()=>editingAndConfiguration());

// .545 deliberately narrowed .542 "all buttons" to the six terminal actions.
test('542 File menu still closes after terminal button actions',()=>terminalActions());

test('775 File menu behavior rejects configuration, editing, timing and dismissal regressions',()=>{
  const mutations=[
    [source=>source.replace('if(editable)return;',''),editingAndConfiguration],
    [source=>source.replace('#importMeshBtn,#exportAsBtn,#exportBaseBtn,#exportSubdBtn,#installAppBtn,#resetBtn','#fileMenu button'),editingAndConfiguration],
    [source=>source.replace('#importMeshBtn,',''),terminalActions],
    [source=>source.replace('queueMicrotask(()=>{fileMenu.open=false;});','fileMenu.open=false;'),terminalActions],
    [source=>source.replace("if(event?.target?.closest?.('#fileMenu'))return;",'return;'),editingAndConfiguration],
    [source=>source.replace("document.addEventListener('pointerdown',closeFileMenu,true);","document.addEventListener('pointerdown',closeFileMenu,false);"),editingAndConfiguration],
  ];
  for(const [mutate,verify] of mutations){
    const changed=mutate(topbar);assert.notEqual(changed,topbar);
    assert.throws(()=>verify(changed),assert.AssertionError);
  }
});

test('542 runtime pins updated and Beta 5 protected',()=>{
  assertAssetReference(index,'topbar-layout.js');
  assertAssetReference(index,'export-as-panel.js');
  assertShellRelease(index);
  assert.match(index,/src\/multi-object-transform\.js\?v=0\.36\.1\.0/);
  assert.match(beta5,/data-release-version="0\.36\.18\.538"/);
});
