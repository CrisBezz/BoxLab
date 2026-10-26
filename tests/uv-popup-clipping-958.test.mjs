import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const s=fs.readFileSync(new URL('../src/tool-session-ui.js',import.meta.url),'utf8');
test('981 UV fallback avoids the failed paint-containment surface; next ordinary session restores shared placement',()=>{
 const host={style:{},dataset:{},replaceChildren(){},firstElementChild:null},drawer={dataset:{},querySelector(){},open:false},node={parentNode:null};
 const c={host,drawer,contentRoot:{},summary:{textContent:''},active:null,document:{querySelector:()=>({appendChild(){}})},window:{dispatchEvent(){}},CustomEvent:class{},releaseUVSurface(){},mountUVSurface(){},placeToolSessionPanel:h=>Object.assign(h.style,{left:'50%',transform:'translateX(-50%)'}),globalThis:{__boxlabSelectionBridge:{mode:()=> 'object'}}};vm.createContext(c);
 vm.runInContext(s.slice(s.indexOf('function begin('),s.indexOf('function end(')),c);
 assert(c.begin({id:'uv-tools',node}));assert.equal(host.style.transform,'none');assert.equal(host.style.contain,'none');assert.equal(host.style.right,'8px');
 c.active=null;assert(c.begin({id:'uv-paint',node}));assert.equal(host.style.contain,'');assert.equal(host.style.right,'');
 c.active=null;assert(c.begin({id:'other',node}));assert.equal(host.style.transform,'translateX(-50%)');assert.equal(host.style.isolation,'');
});
