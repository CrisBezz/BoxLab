// .1006: explicit A/B launch profile, before ANY modelling module initializes.
// Move the original canvas once; no second renderer, input owner or live profile swap.
(() => {
 'use strict';
 const RELEASE='0.36.18.1030',KEY='boxlab.shell-comparison.v1',LIMIT=30;
 const url=new URL(window.location.href),choice=url.searchParams.get('shellTest');
 const active=choice==='current'||choice==='separated',mode=active?choice:'current';
 const doc=document,app=doc.querySelector('#app'),wrap=doc.querySelector('#viewportWrap'),canvas=doc.querySelector('#viewport');
 if(!app||!wrap||!canvas)return;
 if(active&&mode==='separated'){
  const surface=doc.createElement('div');surface.id='boxlabComparisonCanvasSurface';
  app.insertBefore(surface,wrap);surface.appendChild(canvas);
  doc.documentElement.dataset.boxlabShell='separated';
 }
 const steps=[
  ['startup','Startup — before opening any menu','Look at the bottom RIGHT status (Face mode / nothing selected / Multi) and top-right toolbar. Mark FAIL if either is missing. Rate this FIRST, before collapsing the list or opening File/VIEW.'],
  ['view','VIEW / Facegroups','Open VIEW. Choose Facegroups. Can you see the settings and colours? Close and reopen VIEW once. Mark FAIL for an empty or missing menu.'],
  ['gizmo','Gizmo across the right side','Close VIEW. In Face mode select a face and show its gizmo. Orbit/pan so the selection moves from centre to the right side. Do the gizmo and status remain visible?'],
  ['uv','UV Editor → Back to 3D','Finish tools. Object mode → radial UV → UV Editor. The checklist parks lower-left. If it covers ANY control, use Hide list, then the small TEST LIST button to reopen. Inspect the right edge, then Back to 3D at the top and Close UV tools. Recheck right status and VIEW contents.'],
  ['paint','UV Paint → Done / navigation','On the default UV cube tap UV PAINT, then Done. Orbit, two-finger pan and pinch. Recheck right status, toolbar, VIEW and gizmo. No new Fill test is required.']
 ];
 let log={version:1,release:RELEASE,runs:[]},storageOK=true;
 try{
  const saved=window.localStorage.getItem(KEY);
  if(saved&&saved.length<2000000){
   const data=JSON.parse(saved);
   if(data.version===1&&[RELEASE,'0.36.18.1006','0.36.18.1007','0.36.18.1008','0.36.18.1009','0.36.18.1010','0.36.18.1011','0.36.18.1012','0.36.18.1013','0.36.18.1014','0.36.18.1015','0.36.18.1016','0.36.18.1017','0.36.18.1018','0.36.18.1019','0.36.18.1020','0.36.18.1021','0.36.18.1022','0.36.18.1023','0.36.18.1024','0.36.18.1025','0.36.18.1026','0.36.18.1027','0.36.18.1028','0.36.18.1029'].includes(data.release)&&Array.isArray(data.runs))
    log.runs=data.runs.filter(r=>r&&['current','separated'].includes(r.mode)&&typeof r.id==='string'&&r.ratings&&typeof r.ratings==='object').slice(-LIMIT).map(r=>({...r,release:r.release||data.release}));
  }
 }catch{storageOK=false;}
 const run=active?{id:Date.now()+'-'+Math.random().toString(36).slice(2,9),release:RELEASE,mode,started:new Date().toISOString(),ratings:{},notes:'',observations:{}}:null;
 if(run){log.runs.push(run);log.runs=log.runs.slice(-LIMIT);}
 function save(){
  try{const value=JSON.stringify(log);if(value.length>=2000000)throw Error('Test log full');window.localStorage.setItem(KEY,value);storageOK=window.localStorage.getItem(KEY)===value;}
  catch{storageOK=false;}
  return storageOK;
 }
 if(run)save();
 // Read evidence only. A healthy DOM/renderer dimension never implies visible pixels.
 function environment(){
  const rect=canvas.getBoundingClientRect(),scale=window.__boxlabViewportRenderScale;
  return {time:new Date().toISOString(),checklistRelease:RELEASE,shellRelease:window.__boxlabLoadedShellVersion??null,width:window.innerWidth,height:window.innerHeight,dpr:window.devicePixelRatio,
   canvas:{parent:canvas.parentElement?.id,cssWidth:rect.width,cssHeight:rect.height,width:canvas.width,height:canvas.height},
   requested:scale?.requested??null,savedStartup:scale?.saved??null,statusText:doc.querySelector('#selectionStatus')?.textContent??null,
   renderMode:doc.querySelector('#viewportRenderLooks [data-render].active')?.dataset?.render??null,
   selectionMode:window.__boxlabSelectionBridge?.mode?.()??null};
 }
 function busy(){
  const g=window;
  return !!g.__boxlabToolSession?.current?.()||!!g.__boxlabViewportPaint?.active||!!g.__boxlabActiveGizmoDrag||
   !!g.__boxlabMainDirectTool?.busy?.()||!!g.__boxlabFaceDirect?.dragging?.()||!!g.__boxlabEdgeExtrude?.busy?.()||
   !!g.__boxlabVertexExtrude?.busy?.()||!!g.__boxlabDirectBevel?.busy?.()||g.__boxlabFacegroupStroke?.pointerId!=null||
   g.__boxlabBridgeState?.controls?.enabled===false;
 }
 const panel=doc.createElement('section');panel.id='boxlabShellTest';panel.hidden=!active;
 panel.setAttribute('aria-label','Screen comparison test list');
 function el(tag,text){const n=doc.createElement(tag);if(text!==undefined)n.textContent=text;return n;}
 function button(text,action){const b=el('button',text);b.type='button';b.addEventListener('click',action);return b;}
 const header=el('div');header.className='shell-test-header';
 const title=el('strong',active?(mode==='current'?'A · Current · .1030':'B · Separated · .1030'):'Screen comparison · .1030');
 const body=el('div');body.className='shell-test-body';
 const collapse=button('Collapse',()=>{body.hidden=!body.hidden;collapse.textContent=body.hidden?'Test list':'Collapse';});
 const launcher=button('TEST LIST · .1030',showPanel);launcher.id='shellTestReopen';launcher.hidden=true;
 launcher.style.cssText='display:none;position:fixed;left:8px;top:50dvh;z-index:100003;min-height:40px;';
 const hide=button('Hide list',()=>{panel.hidden=true;launcher.hidden=false;launcher.style.display='block';stopDock();});
 header.append(title,collapse,hide);panel.append(header,body);
 // Observe ONLY original app/UV hidden state. Inline positioning avoids reliance
 // on ancestor :has invalidation; neither viewport dimensions nor renderer change.
 let lastDock=null,watching=false;
 const observer=typeof window.MutationObserver==='function'?new window.MutationObserver(syncDock):null;
 function syncDock(){
  const editor=doc.querySelector('#boxlabUVWorkspace'),dock=!!editor&&!editor.hidden;
  if(dock===lastDock)return;lastDock=dock;
  panel.style.top=dock?'50dvh':'';panel.style.bottom=dock?'max(140px,calc(env(safe-area-inset-bottom) + 132px))':'';panel.style.maxHeight=dock?'none':'';
 }
 function stopDock(){observer?.disconnect();watching=false;}
 function watchDock(){if(observer&&!watching){observer.observe(app,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});watching=true;}syncDock();}
 function showPanel(){panel.hidden=false;launcher.hidden=true;launcher.style.display='none';body.hidden=false;collapse.textContent='Collapse';watchDock();}
 window.addEventListener('pagehide',stopDock);
 window.addEventListener('pageshow',()=>{if(!panel.hidden)watchDock();});
 body.append(el('p','Stay in this browser throughout each run. Save your real project first; use the default cube. A and B use the same tools, renderer and resolution setting. Keep orientation and resolution unchanged.'));
 body.append(el('p',active?'Record what you SEE. A FAIL saves a layout snapshot without refreshing the display. Collapse this list after rating startup if it covers tools.':'Start A below, then follow this list after the reload. The list opens automatically on every test load.'));
 body.append(el('p','Build .1030 checks: Import NOM_TEXTURE_TRANSFORM_1030.nom (docs/samples). Left is the original cyan up-arrow on coloured quadrants; middle shifts the pattern; right turns it sideways and repeats it twice. Inspect in Studio/Solid and compare with the same file in Nomad. Switch looks, Move/Undo/Redo, Save/Open .boxlab, then export NOMAD and compare again. Accepted .1029 colour alpha stays unchanged. No new A/B run is required.'));
 const rows=[];
 for(const [key,label,instruction]of steps){
  const row=el('div');row.className='shell-test-step';row.append(el('strong',label),el('p',instruction));
  const actions=el('div');actions.className='shell-test-actions';
  for(const result of ['pass','fail']){
   const b=button(result==='pass'?'PASS':'FAIL',()=>rate(key,result));b.disabled=!active;
   b.setAttribute('aria-label',label+' '+result.toUpperCase());b.setAttribute('aria-pressed','false');
   rows.push({key,result,button:b});actions.append(b);
  }
  row.append(actions);body.append(row);
 }
 const notes=el('textarea');notes.rows=2;notes.maxLength=1000;notes.placeholder='Optional: first missing area / trigger';
 notes.setAttribute('aria-label','Test observations');notes.disabled=!active;
 notes.addEventListener('input',()=>{if(run){run.notes=notes.value.slice(0,1000);save();update();}});body.append(notes);
 const summary=el('pre');summary.className='shell-test-summary';body.append(summary);
 const status=el('p');status.setAttribute('role','status');body.append(status);
 const discardLabel=el('label');discardLabel.className='shell-test-discard';
 const discard=el('input');discard.type='checkbox';discard.id='shellTestDiscard';
 discardLabel.append(discard,el('span','My project is saved / this test scene may be discarded. Reloading does not retain scene edits.'));
 body.append(discardLabel);
 function launch(next){
  if(!discard.checked){status.textContent='Save your project, then tick the test-scene checkbox before reloading.';return false;}
  if(busy()){status.textContent='Finish the active tool/UV/Paint session or gesture before reloading.';return false;}
  if(!save()){update();status.textContent='Results could not be saved. Copy results before using browser reload; in-app reload was refused.';return false;}
  const target=new URL(window.location.href);
  if(next===null)target.searchParams.delete('shellTest');else target.searchParams.set('shellTest',next);
  target.searchParams.set('_shellRun',String(Date.now()));window.location.assign(target.href);return true;
 }
 const navigation=el('div');navigation.className='shell-test-actions';
 const reload=button(active?'Reload same shell':'Start A · current + reload',()=>launch(active?mode:'current'));
 const switchMode=button(active?(mode==='current'?'Switch to B + reload':'Switch to A + reload'):'Start B · separated + reload',()=>launch(mode==='current'?'separated':'current'));
 navigation.append(reload,switchMode);body.append(navigation);
 body.append(el('p','Alternate A and B with Switch + reload, keeping the same resolution, orientation and default cube. Aim for 5 completed loads of each. Earlier results stay in Copy results. Untested steps are not passes. You may switch early after a failure. Rate startup before changing anything. No app-switch or forced display recovery during a run.'));
 const report=el('textarea');report.readOnly=true;report.rows=8;report.hidden=true;report.setAttribute('aria-label','Screen comparison results');
 const copy=button('Copy results',async()=>{
  report.value=JSON.stringify({test:'BoxLab shell comparison',release:RELEASE,active:active?mode:null,environment:environment(),log},null,2);
  try{await window.navigator.clipboard.writeText(report.value);status.textContent='Results copied. Finish testing before switching apps to send them.';}
  catch{report.hidden=false;report.focus();report.select();status.textContent='Copy the selected results here. Finish testing before switching apps.';}
 });
 const footer=el('div');footer.className='shell-test-actions';footer.append(copy,button('Exit test + reload',()=>launch(null)));body.append(footer,report);
 body.append(el('small','This is a structural comparison, not a confirmed screen repair. Results stay in this browser (last 30 loads); use Copy results after testing.'));
 function update(){
  for(const r of rows)r.button.setAttribute('aria-pressed',String(run?.ratings[r.key]===r.result));
  const lines=['.1030 · '+(active?(mode==='current'?'A current':'B separated'):'not started')];
  for(const profile of ['current','separated']){
   const runs=log.runs.filter(r=>r.mode===profile),complete=runs.filter(r=>steps.every(([k])=>['pass','fail'].includes(r.ratings[k]))).length;
   const failed=runs.filter(r=>r.hadFailure||steps.some(([k])=>r.ratings[k]==='fail')).length;
   lines.push((profile==='current'?'A':'B')+': '+complete+'/5 completed · '+failed+' failed · '+runs.length+' loads');
  }
  if(run)lines.push('This load: '+steps.map(([k])=>k+':'+(run.ratings[k]||'—')).join(' · '));
  summary.textContent=lines.join('\n');
  if(!storageOK)status.textContent='Browser storage unavailable: results will not survive reload. Copy results first.';
 }
 function rate(key,result){
  if(!run||!steps.some(([k])=>k===key)||!['pass','fail'].includes(result))return false;
  run.ratings[key]=result;run.observations[key]=environment();
  if(result==='fail'){
   run.hadFailure=true;
   // Keep only the first failure snapshot per load. It is evidence, not pixel proof.
   if(!run.failure){try{
    const s=window.__boxlabGestureDebug?.uiSnapshot?.();
    run.failure=s?{release:s.release,renderScale:s.renderScale,viewport:s.viewport,canvas:s.canvas,viewMenu:s.viewMenu,elements:s.elements,session:s.session,paint:s.paint}:null;
   }catch{run.failure={unavailable:true};}}
  }
  save();update();if(storageOK)status.textContent=key+' '+result.toUpperCase()+' saved. No display refresh performed.';return true;
 }
 doc.body.appendChild(panel);doc.body.appendChild(launcher);if(active)watchDock();update();
 const fileButton=button('Screen comparison / test list',()=>{showPanel();const file=doc.querySelector('#fileMenu');if(file)file.open=false;});fileButton.id='shellComparisonBtn';
 (doc.querySelector('#fileDiagnostics')||doc.querySelector('#fileMenu .top-file-content'))?.appendChild(fileButton);
 window.__boxlabShellComparison={mode:active?mode:null,open:showPanel,environment,rate,launch,
  report:()=>JSON.parse(JSON.stringify(log))};
})();
