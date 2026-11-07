import assert from 'node:assert/strict';

// Controlled ordered DOM: node identity/listeners and moves, no CSS or rendering.
export function orderedDOM(){
 const fields=new Map();
 function node(id=''){
  const classes=new Set(),n={id,style:{},children:[],listeners:new Map(),classList:{contains:s=>classes.has(s),add:s=>classes.add(s),remove:s=>classes.delete(s),toggle:(s,on)=>{on?classes.add(s):classes.delete(s);}},
   append(...items){for(const x of items){x.remove();x.parentElement=this;this.children.push(x);}},appendChild(x){this.append(x);return x;},
   remove(){if(this.parentElement){const xs=this.parentElement.children;xs.splice(xs.indexOf(this),1);this.parentElement=null;}},
   insertAdjacentElement(where,x){assert.equal(where,'afterend');const parent=this.parentElement;assert.ok(parent);x.remove();x.parentElement=parent;parent.children.splice(parent.children.indexOf(this)+1,0,x);},
   querySelector(s){return this.children.find(x=>s.includes('.panel-title')?x.className==='panel-title':s.startsWith('.')?x.className?.split(' ').includes(s.slice(1)):x.id===s.slice(1))||null;},
   querySelectorAll(s){return s==='.range-row'?this.children.filter(x=>x.className==='range-row'):[];},
   addEventListener(t,f){if(!this.listeners.has(t))this.listeners.set(t,[]);this.listeners.get(t).push(f);},
   dispatchEvent(e){for(const fn of this.listeners.get(e.type)||[])fn(e);},blur(){},prepend(...items){for(const x of [...items].reverse()){x.remove();x.parentElement=this;this.children.unshift(x);}},
   closest(s){let p=this;while(p){if((p.id==='precisionEdgeBevelRow'&&s==='#precisionEdgeBevelRow button')||(s.startsWith('#')&&p.id===s.slice(1))||(s.startsWith('.')&&p.className?.split(' ').includes(s.slice(1))))return p;p=p.parentElement;}return null;}};
  Object.defineProperty(n,'nextElementSibling',{get(){return this.parentElement?.children[this.parentElement.children.indexOf(this)+1]||null;}});
  Object.defineProperty(n,'id',{get(){return this._id||'';},set(v){this._id=v;if(v)fields.set('#'+v,this);}});n.id=id;
  return n;
 }
 return {fields,node};
}
