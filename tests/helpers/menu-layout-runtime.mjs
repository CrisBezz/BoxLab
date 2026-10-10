import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {orderedDOM} from './ordered-dom.mjs';
const read=p=>fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8');

// Whole topbar owner, original nodes/listeners; imported toolbar installers are
// controlled adapters. CSS declarations are inspected, not browser-computed.
export function menuLayoutRuntime(transform=s=>s){
 const {fields,node}=orderedDOM();const make=id=>{const n=node(id);n.dataset={};n.attributes={};n.setAttribute=(k,v)=>n.attributes[k]=v;return n;};
 const topbar=make('topbar'),wrap=make('viewportWrap'),modes=make('selectionModes'),file=make('fileMenu'),command=make('commandBar');
 const buttons=['vertex','edge','face','object'].map(mode=>{const b=make(mode+'Mode');b.dataset.mode=mode;return b;});
 modes.querySelectorAll=()=>buttons;modes.append(...buttons);topbar.append(modes,file,command);fields.set('.topbar',topbar);
 const document=make();document.head=make();document.createElement=()=>make();document.querySelector=s=>fields.get(s)||null;document.querySelectorAll=()=>[];
 const c={document,queueMicrotask:fn=>fn(),installViewportToolbarControls(){},installViewportSelectionPanel(){}};vm.createContext(c);
 const source=read('src/topbar-layout.js').replace(/^import .*;\n/gm,'');vm.runInContext(transform(source,'topbar-layout.js'),c);
 const view=read('src/view-modes.js'),a=view.indexOf("  const style=document.createElement('style');"),b=view.indexOf('  return wrap;',a);assert.ok(a>=0&&b>a);
 vm.runInContext('{'+transform(view.slice(a,b),'view-modes.js')+'}',c);
 return {modes,wrap,buttons,document,command,topbar,styles:document.head.children.map(n=>n.textContent),sync:()=>vm.runInContext('installSecondRow();installModeIcons();',c)};
}
// Match exact selector declaration blocks, preserving successive base/media rules.
function rules(css,selector){
 const escaped=selector.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 return [...css.matchAll(new RegExp(escaped+'\\s*\\{([^}]+)\\}','g'))].map(m=>Object.fromEntries(m[1].split(';').filter(s=>s.includes(':')).map(s=>{const i=s.indexOf(':');return [s.slice(0,i).trim(),s.slice(i+1).trim()];})));
}
export function assertModeDock(transform){
 const f=menuLayoutRuntime(transform),original=[...f.buttons];let taps=0;original[0].addEventListener('click',()=>taps++);
 for(let i=0;i<3;i++){f.sync();assert.equal(f.modes.parentElement,f.wrap);assert.deepEqual(f.modes.children,original);original[0].dispatchEvent({type:'click'});}
 assert.equal(taps,3);assert.equal(f.command.parentElement,null);
 for(const b of original){assert.equal(b.title,b.dataset.mode[0].toUpperCase()+b.dataset.mode.slice(1));assert.match(b.innerHTML,/<svg/);assert.match(b.attributes['aria-label'],/selection mode$/);}
 const dock=rules(f.styles.slice(0,2).join('\n'),'#viewportWrap > #selectionModes');
 assert.equal(dock[0].position,'absolute');assert.equal(dock[0].left,'max(16px,env(safe-area-inset-left))');
 assert.equal(dock[1].left,'max(8px,env(safe-area-inset-left))');
 assert.equal(dock[2].bottom,'max(27px,calc(env(safe-area-inset-bottom) + 23px))!important');
 assert.equal(dock[3].bottom,'max(25px,calc(env(safe-area-inset-bottom) + 21px))!important');
}
export function assertFileMenuRules(transform){
 const f=menuLayoutRuntime(transform),css=f.styles[0],blocks=rules(css,'.top-file-content');
 assert.equal(rules(css,'.top-file-menu').at(-1)['z-index'],'140');
 assert.equal(blocks[0].top,'calc(100% + 6px)');
 assert.equal(blocks[0]['max-height'],'calc(100dvh - var(--boxlab-topbar-h) - 18px)');
 assert.equal(blocks[0]['overflow-y'],'auto');assert.equal(blocks[0]['overscroll-behavior'],'contain');
 assert.equal(blocks[0]['-webkit-overflow-scrolling'],'touch');
 assert.equal(blocks[1].width,'min(300px,calc(100vw - 16px))');
 assert.equal(blocks[1]['max-width'],'calc(100vw - 16px)');
}
export function assertViewportMenuRules(transform){
 const blocks=rules(menuLayoutRuntime(transform).styles[2],'.viewport-menu-panel');assert.equal(blocks.length,2);
 for(const block of blocks)assert.equal(block['max-height'],'calc(100dvh - var(--boxlab-topbar-h,60px) - 14px)');
 assert.equal(blocks[0].top,'calc(var(--boxlab-topbar-h,60px) + 6px)');
 assert.equal(blocks[0]['overflow-y'],'auto');assert.equal(blocks[0]['overscroll-behavior'],'contain');assert.equal(blocks[0]['-webkit-overflow-scrolling'],'touch');assert.equal(blocks[0]['touch-action'],'pan-y');
 assert.equal(blocks[0].width,'min(360px,calc(100vw - 16px))');assert.equal(blocks[1].width,'min(340px,calc(100vw - 16px))');
}
