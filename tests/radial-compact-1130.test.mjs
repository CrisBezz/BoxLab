import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {compactRadialLabels} from '../src/radial-compact-labels.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('1130 all 72 modelling radial targets fit compact rings without intersecting button rectangles',()=>{
 const source=read('src/total-gizmo.js'),counts={face:24,edge:21,vertex:14,object:13};let total=0;
 for(const match of source.matchAll(/<div class="tg-tool-ring" data-ring-mode="([^"]+)"[^>]*>([\s\S]*?)(?=<div class="tg-tool-ring"|<div class="tg-hud")/g)){
  const [,mode,html]=match,buttons=[];
  for(const item of html.matchAll(/<button[^>]*class="([^"]*tg-tool-sector[^"]*)"[^>]*style="--a:([\d.]+)deg[^>]*data-tool-target="([^"]*)"/g)){
   const [,classes,angle,target]=item,r=classes.includes('outer')?194:classes.includes('mid')?134:80,a=Number(angle)*Math.PI/180;
   buttons.push({target,x:r*Math.sin(a),y:-r*Math.cos(a)});
  }
  assert.equal(buttons.length,counts[mode]);total+=buttons.length;
  for(let i=0;i<buttons.length;i++)for(const b of buttons.slice(i+1)){const a=buttons[i];assert(Math.abs(a.x-b.x)>=52||Math.abs(a.y-b.y)>=56,mode+': '+a.target+' overlaps '+b.target);}
 }
 assert.equal(total,72);assert(2*194+52<.81*(2*230+86),'overall radial footprint reduces at least 19%');
 const css=read('radial-compact.css');for(const value of ['width:52px;height:56px','translateY(-80px)','translateY(-194px)','translateY(-134px)','border-radius:50%','background-size:28px 28px'])assert(css.includes(value));
});
test('1130 ten Paint circular targets fit the smaller 292px wheel and Material/centre remain original buttons',()=>{
 const s=read('src/viewport-paint.js');assert(s.includes('146+114*Math.sin(a)'));assert(s.includes('146-114*Math.cos(a)'));assert(s.includes('left:146px;top:146px'));
 const points=Array.from({length:10},(_,i)=>({x:146+114*Math.sin(i*Math.PI/5),y:146-114*Math.cos(i*Math.PI/5)}));
 for(const p of points){assert(p.x-26>=0&&p.x+26<=292&&p.y-28>=0&&p.y+28<=292);for(const q of points)if(p!==q)assert(Math.abs(p.x-q.x)>=52||Math.abs(p.y-q.y)>=56);}
 assert(read('radial-compact.css').includes('#boxlabPaintRadial[data-state=tools] .paint-tool-wheel{width:292px;height:292px}'));
});
test('1130 captions preserve full original tool names, titles, targets and existing listener nodes idempotently',()=>{
 const original={target:'#makePlanarBtn'},attributes=new Map(),button={textContent:'Make Planar',dataset:original,clickOwner:()=>{},children:[],querySelector(){return this.children[0];},getAttribute:k=>attributes.get(k),setAttribute:(k,v)=>attributes.set(k,v),appendChild(c){this.children.push(c);this.textContent=c.textContent;}};
 const clickOwner=button.clickOwner;compactRadialLabels([button],{createElement:()=>({})});compactRadialLabels([button],{createElement:()=>{throw Error('duplicate caption');}});
 assert.equal(button.children.length,1);assert.equal(button.textContent,'Make Planar');assert.equal(button.dataset,original);assert.equal(button.clickOwner,clickOwner);assert.equal(attributes.get('aria-label'),'Make Planar');assert.equal(attributes.get('title'),'Make Planar');
});
