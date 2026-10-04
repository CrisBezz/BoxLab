// Presentation only: retain the original nodes/listeners inside the same owner
// panel. Never replace controls, proxy values or add a viewport gesture owner.
const layouts=new WeakMap();
function actionKind(button){
 const text=(button.textContent||'').trim();
 if(/^(cancel|done|close)\b/i.test(text))return 'exit';
 if(/^(apply|exact|use bridge|confirm)\b/i.test(text))return 'apply';
 if(/^bisect only$/i.test(text))return 'extra';
 return null;
}
function installStyle(doc){
 if(doc.getElementById('toolSessionWideStyle'))return;
 const style=doc.createElement('style');style.id='toolSessionWideStyle';
 style.textContent=`
#viewportWrap [data-wide-tool-panel="true"]{width:max-content!important;max-width:min(720px,calc(100% - 16px))!important;padding:7px 8px!important}
#viewportWrap [data-wide-tool-layout="true"][hidden]{display:none!important}
#viewportWrap [data-wide-tool-layout="true"]{display:grid!important;grid-template-columns:minmax(0,1fr) max-content!important;gap:8px!important;align-items:start!important}
#viewportWrap [data-wide-tool-layout="true"]>.ts-wide-body{display:grid!important;grid-template-columns:minmax(0,1fr);gap:4px;min-width:min(22ch,calc(100vw - 120px));align-items:center}
#viewportWrap [data-wide-tool-layout="true"]>.ts-wide-actions{display:flex!important;flex-direction:column!important;gap:4px!important;align-self:stretch;border-left:1px solid #ffffff24;padding-left:6px;min-width:0}
#viewportWrap .ts-wide-actions [hidden]{display:none!important}
#viewportWrap .ts-wide-actions>button{width:100%!important;min-height:36px!important;margin:0!important;flex:none!important;white-space:normal!important}
#viewportWrap .ts-wide-body>strong,#viewportWrap .ts-wide-body>.boxlab-tool-session-title,#viewportWrap .ts-wide-body>[class$="-head"],#viewportWrap .ts-wide-body>[class$="-title"],#viewportWrap .ts-wide-body>.shs-tabs,#viewportWrap .ts-wide-body>.shs-panel,#viewportWrap .ts-wide-body>.boxlab-tool-session-tabs,#viewportWrap .ts-wide-body>.boxlab-tool-session-panel{grid-column:1/-1}
#viewportWrap .ts-wide-body .boxlab-tool-session-title{margin:0!important;padding:0!important;flex-wrap:wrap}
#viewportWrap .ts-wide-body>.boxlab-tool-session-section{display:none!important}
#viewportWrap .ts-wide-body>.outliner-actions{margin:0!important;min-width:0;gap:5px!important}
#viewportWrap .ts-wide-body>.outliner-actions:empty,#viewportWrap .ts-wide-body>div:empty{display:none!important}
#viewportWrap .ts-wide-body>.shss-row,#viewportWrap .ts-wide-body>.shos-exact{display:block!important}
#viewportWrap .ts-wide-body label{min-width:0;margin:0!important}
#viewportWrap .ts-wide-body input{min-width:0;max-width:100%}
#viewportWrap .ts-wide-body>small,#viewportWrap .ts-wide-body .drawer-hint,#viewportWrap .ts-wide-body>[class$="-note"],#viewportWrap .ts-wide-body>[role="status"]{grid-column:1/-1;margin:0!important;font-size:10px!important;line-height:1.3!important;width:0;min-width:100%;overflow-wrap:anywhere}
#viewportWrap .ts-wide-body .shs-panel:not([hidden]),#viewportWrap .ts-wide-body .boxlab-tool-session-panel:not([hidden]){display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 10px}
#viewportWrap .ts-wide-body [hidden]{display:none!important}
#viewportWrap .ts-wide-body #meshHealthFindings{max-height:100px;overflow-y:auto}
#viewportWrap .ts-wide-body #meshHealthTopology{font-size:10px!important}
#viewportWrap .ts-wide-body #booleanOperand218{grid-column:1/-1}
/* Boolean: operands/Swap above operations, Close at the right; original nodes retained. */
#viewportWrap #booleanPrototype217 .ts-wide-body{grid-template-columns:minmax(0,1fr)!important;gap:5px!important}
#viewportWrap #booleanPrototype217 .ts-wide-body>.drawer-subtitle{display:none!important}
#viewportWrap #booleanPrototype217 #booleanOperand218{order:1;margin:0!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(64px,.65fr)!important;gap:5px!important}
#viewportWrap #booleanPrototype217 .ts-wide-body>.outliner-actions{order:2;grid-template-columns:repeat(3,minmax(0,1fr))!important;margin:0!important}
#viewportWrap #booleanPrototype217 .boolean-session-close{display:none!important}
#viewportWrap #booleanPrototype217 .ts-wide-actions{justify-content:center}
#viewportWrap #booleanPrototype217 .bool-op{padding:5px 7px!important;min-height:36px;display:flex;flex-direction:column;justify-content:center}
#viewportWrap #booleanPrototype217 .bool-op span{overflow:hidden;text-overflow:ellipsis}
#viewportWrap #booleanPrototype217 button{min-height:36px!important;margin:0!important}
#viewportWrap #symmetryBisectSession .ts-wide-body>.symmetry-axis{order:1}
#viewportWrap #symmetryBisectSession .ts-wide-body>.symmetry-keep{order:2}
#viewportWrap #symmetryBisectSession .ts-wide-body>.outliner-actions:not(.symmetry-axis):not(.symmetry-keep){grid-column:1/-1;grid-template-columns:repeat(4,minmax(0,1fr))!important;order:3}
#viewportWrap #symmetryBisectSession .ts-wide-body>.toggle-row{order:4}
#viewportWrap #symmetryPlaneReadout{order:5;font-size:10px}

@media(max-width:700px){#viewportWrap [data-wide-tool-layout="true"]{grid-template-columns:minmax(0,1fr) max-content!important;gap:4px!important}#viewportWrap [data-wide-tool-layout="true"]>.ts-wide-body{gap:6px;grid-template-columns:minmax(0,1fr)}#viewportWrap .ts-wide-body .shs-panel:not([hidden]),#viewportWrap .ts-wide-body .boxlab-tool-session-panel:not([hidden]){grid-template-columns:minmax(0,1fr)}}
`;
 doc.head.appendChild(style);
}
export function layoutWideToolPanel(panel){
 if(!panel?.querySelectorAll||!panel.ownerDocument)return;
 const node=panel.id==='boxlabToolSessionHost'?panel.firstElementChild:panel;
 if(!node)return;
 let entry=layouts.get(node);
 const syncVisibility=()=>{for(const {button,ancestors} of entry.records)button.style.display=ancestors.some(n=>n.hidden)?'none':'';};
 if(!entry){
  const actions=[...node.querySelectorAll('button')].filter(b=>actionKind(b));
  if(!actions.length)return;
  installStyle(panel.ownerDocument);
  const body=panel.ownerDocument.createElement('div'),rail=panel.ownerDocument.createElement('div');
  body.className='ts-wide-body';rail.className='ts-wide-actions';
  const records=actions.map(button=>{const ancestors=[];for(let p=button.parentElement;p&&p!==node;p=p.parentElement)ancestors.push(p);return{button,ancestors,kind:actionKind(button)};});
  // Keep Cancel/Done first, Apply below; auxiliary Bisect follows.
  records.sort((a,b)=>['exit','apply','extra'].indexOf(a.kind)-['exit','apply','extra'].indexOf(b.kind));
  while(node.firstChild)body.appendChild(node.firstChild);
  records.forEach(r=>rail.appendChild(r.button));node.append(body,rail);
  node.dataset.wideToolLayout='true';entry={records};layouts.set(node,entry);
  const Observer=panel.ownerDocument.defaultView?.MutationObserver;
  if(Observer){entry.observer=new Observer(()=>{
   // Some owners add report/operand nodes lazily. Keep those in the body.
   for(const child of [...node.children])if(child!==body&&child!==rail)body.appendChild(child);
   syncVisibility();
  });entry.observer.observe(node,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden']});}

 }
 panel.dataset.wideToolPanel='true';
 // Apply in staged editors remains hidden until its original stage is visible.
 syncVisibility();
}
