import * as THREE from 'three';

const canvas = document.querySelector('#viewport');
function gestureDebug(stage,detail=null){globalThis.__boxlabGestureDebug?.log?.(stage,detail);}
function generalSettings(){return globalThis.__boxlabGeneralSettings?.get?.()||{pencilOrbit:true,pencilSelection:true};}

if (canvas && !canvas.__boxlabPencilOrbitGateInstalled) {
  const nativeAddEventListener = canvas.addEventListener.bind(canvas);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const navigationSnapshots = new Map();
  const NAV_RESTORE_PX = 4;
  const orbitListeners = new Map();
  const penOrbitPointers = new Set();
  const activePenContacts = new Set();
  const DEFERRED_ORBIT_PX = 8;
  let pendingMeshOrbit = null;
  let orbitPointerDownListener = null;
  let orbitPointerUpListener = null;
  let orbitPointerCancelListener = null;
  const earlyReleasedPointers = new Set();
  const physicalTouchContacts = new Set();
  const recentlyEndedTouchIds = [];
  const penBackgroundTaps = new Map();
  const suppressedPenSelections = new Set();
  const RECENT_TOUCH_LIMIT = 12;
  let orbitRegistrationDepth = 0;

  function isPenContact(event) {
    if(event.pointerType!=='pen')return false;
    if(event.type==='pointerup'||event.type==='pointercancel')return false;
    if(event.type==='pointerdown'){
      const contact=(event.buttons & 1)===1 || event.pressure>0;
      if(contact){
        if(activePenContacts.size===0&&physicalTouchContacts.size===0)restoreStaleControls('fresh-pen');
        activePenContacts.add(event.pointerId);
      }
      return contact;
    }
    if(activePenContacts.has(event.pointerId))return true;
    return (event.buttons & 1)===1 || event.pressure>0;
  }

  function isPenHover(event) {
    return event.pointerType==='pen'&&!isPenContact(event);
  }

  function endPenContact(event){
    if(event.pointerType!=='pen')return;
    const tap=penBackgroundTaps.get(event.pointerId);
    if(tap){
      penBackgroundTaps.delete(event.pointerId);
      const moved=Math.hypot((event.clientX??tap.x)-tap.x,(event.clientY??tap.y)-tap.y);
      if(event.type==='pointerup'&&!tap.orbitClaimed&&moved<8){
        window.dispatchEvent(new CustomEvent('boxlab-pencil-background-tap',{detail:{
          pointerId:event.pointerId,
          timeStamp:event.timeStamp,
          clientX:event.clientX??tap.x,
          clientY:event.clientY??tap.y
        }}));
        gestureDebug('PEN BACKGROUND TAP',{pid:event.pointerId,moved:Math.round(moved)});
      }
    }
    activePenContacts.delete(event.pointerId);
    if(pendingMeshOrbit?.pointerId===event.pointerId)pendingMeshOrbit=null;
  }

  window.addEventListener('pointerup',endPenContact,true);
  window.addEventListener('pointercancel',endPenContact,true);

  // Important: Pencil pointerup normally reports pressure=0 on iPad. Never
  // swallow pointerup/pointercancel as "hover" or OrbitControls will retain
  // the pen pointer and subsequent finger gestures will be locked out.
  for (const type of ['pointerdown','pointermove','pointerover','pointerenter','pointerout','pointerleave']) {
    nativeAddEventListener(type, event => {
      if (!isPenHover(event)) return;
      gestureDebug('PEN HOVER SWALLOW',{type:event.type,pid:event.pointerId,pressure:event.pressure,buttons:event.buttons,target:event.target?.id||event.target?.tagName||'unknown'});
      event.preventDefault?.();
      event.stopImmediatePropagation?.();
    }, { capture: true, passive: false });
  }

  // When Pencil selection is disabled, keep stylus contacts over the model out
  // of the selection owners. If Pencil orbit remains enabled, the existing
  // deferred-orbit path can still claim a deliberate drag after its threshold.
  nativeAddEventListener('pointerdown',event=>{
    if(event.target!==canvas||event.pointerType!=='pen'||!isPenContact(event)||generalSettings().pencilSelection)return;
    const toolOwns=!!globalThis.__boxlabFaceDirect?.active?.()||!!globalThis.__boxlabMainDirectTool?.ownsModellingGesture?.()||!!globalThis.__boxlabViewportPaint?.active||!!globalThis.__boxlabLasso?.isArmed?.()||!!globalThis.__boxlabFacegroupStroke?.armed;
    if(toolOwns||!pencilHitsEditableMesh(event))return;
    suppressedPenSelections.add(event.pointerId);
    const settings=generalSettings();
    if(settings.pencilOrbit)pendingMeshOrbit={pointerId:event.pointerId,x:event.clientX,y:event.clientY,pageX:event.pageX,pageY:event.pageY,button:event.button,buttons:event.buttons||1,pressure:event.pressure,ctrlKey:event.ctrlKey,metaKey:event.metaKey,shiftKey:event.shiftKey,altKey:event.altKey,selectionMode:null,selectionIndices:[]};
    event.preventDefault?.();
    event.stopImmediatePropagation?.();
    gestureDebug('PEN SELECTION DISABLED',{pid:event.pointerId,orbit:settings.pencilOrbit});
  },{capture:true,passive:false});

  nativeAddEventListener('pointerup',event=>{
    if(event.pointerType!=='pen'||!suppressedPenSelections.has(event.pointerId))return;
    suppressedPenSelections.delete(event.pointerId);event.preventDefault?.();event.stopImmediatePropagation?.();
  },{capture:true,passive:false});
  nativeAddEventListener('pointercancel',event=>{
    if(event.pointerType!=='pen'||!suppressedPenSelections.has(event.pointerId))return;
    suppressedPenSelections.delete(event.pointerId);event.preventDefault?.();event.stopImmediatePropagation?.();
  },{capture:true,passive:false});

  function pencilHitsEditableMesh(event) {
    if (event.pointerType !== 'pen') return false;
    if (isPenHover(event)) return true;
    const state = globalThis.__boxlabBridgeState;
    const mesh = state?.mesh;
    const camera = state?.camera;
    // Floating cage/loose edges are editable hits without a polygon behind them.
    const bridge=selectionBridge();
    if(bridge?.mode?.()==='edge'&&bridge.pick?.('edge',event))return true;
    if (!mesh || !camera || !mesh.faces?.length) return false;

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    // Reject only rays outside fresh, conservative source bounds. Points that
    // might touch the model still use the original double-sided mesh test below.
    // Padding covers Float32 position rounding in triangulatedGeometry(). No cache.
    const vertices=mesh.vertices;
    if(Array.isArray(vertices)&&vertices.length&&Array.isArray(mesh.faces)){
      let minX=Infinity,minY=Infinity,minZ=Infinity,maxX=-Infinity,maxY=-Infinity,maxZ=-Infinity,safe=true;
      for(let i=0;i<vertices.length;i++){
        const v=vertices[i];
        if(!v||typeof v.x!=='number'||typeof v.y!=='number'||typeof v.z!=='number'){safe=false;break;}
        const x=v.x,y=v.y,z=v.z;
        if(x!==x||y!==y||z!==z){safe=false;break;}
        if(x<minX)minX=x;if(y<minY)minY=y;if(z<minZ)minZ=z;
        if(x>maxX)maxX=x;if(y>maxY)maxY=y;if(z>maxZ)maxZ=z;
      }
      const magnitude=Math.max(Math.abs(minX),Math.abs(minY),Math.abs(minZ),Math.abs(maxX),Math.abs(maxY),Math.abs(maxZ));
      if(safe&&Number.isFinite(magnitude)&&magnitude<=3.4028234663852886e38){
        const bounds=new THREE.Box3(new THREE.Vector3(minX,minY,minZ),new THREE.Vector3(maxX,maxY,maxZ)).expandByScalar(Math.max(1e-7,magnitude*2**-22));
        if(!raycaster.ray.intersectsBox(bounds)){
          // Validate refs only on the early-miss path; model contacts need no
          // extra face scan. Invalid/unsupported data keeps original errors.
          for(const face of mesh.faces){
            if(!Array.isArray(face)){safe=false;break;}
            for(const index of face)if(!Number.isInteger(index)||index<0||index>=vertices.length){safe=false;break;}
            if(!safe)break;
          }
          if(safe)return false;
        }
      }
    }

    const geometry = mesh.triangulatedGeometry();
    const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    const picker = new THREE.Mesh(geometry, material);
    const hit = raycaster.intersectObject(picker, false).length > 0;
    geometry.dispose();
    material.dispose();
    return hit;
  }

  function selectionBridge() {
    return globalThis.__boxlabSelectionBridge;
  }

  function snapshotSelection(event) {
    if (event.pointerType !== 'pen') return;
    gestureDebug('PEN CANVAS DOWN',{pid:event.pointerId,pressure:event.pressure,buttons:event.buttons,hover:isPenHover(event)});
    if (isPenHover(event)) return;
    const bridge = selectionBridge();
    const type = bridge?.mode?.();
    const indices = [...(bridge?.indices?.() || [])];
    if (!type || !indices.length) return;
    navigationSnapshots.set(event.pointerId, { type, indices, x: event.clientX, y: event.clientY, restored: false });
  }

  function restoreSelectionForNavigation(event) {
    if (event.pointerType !== 'pen' || isPenHover(event)) return;
    const snap = navigationSnapshots.get(event.pointerId);
    if (!snap || snap.restored) return;
    if (Math.hypot(event.clientX - snap.x, event.clientY - snap.y) < NAV_RESTORE_PX) return;
    const bridge = selectionBridge();
    if (bridge?.mode?.() !== snap.type) return;
    const current = bridge.indices?.() || [];
    if (!current.length) bridge.set?.(snap.type, snap.indices);
    snap.restored = true;
  }

  nativeAddEventListener('pointerdown', snapshotSelection, { capture: true, passive: true });
  nativeAddEventListener('pointermove', restoreSelectionForNavigation, { capture: true, passive: true });

  // OrbitControls must always see pointer release before modelling capture
  // handlers can stop propagation or pointer capture can retarget the release.
  // Install this at WINDOW capture so it runs before canvas/tool listeners.
  function rememberEndedTouch(pointerId){
    const id=Number(pointerId);
    if(!Number.isInteger(id))return;
    const existing=recentlyEndedTouchIds.indexOf(id);
    if(existing>=0)recentlyEndedTouchIds.splice(existing,1);
    recentlyEndedTouchIds.push(id);
    if(recentlyEndedTouchIds.length>RECENT_TOUCH_LIMIT)recentlyEndedTouchIds.splice(0,recentlyEndedTouchIds.length-RECENT_TOUCH_LIMIT);
  }

  function replayOrbitRelease(pointerId,reason='reconcile'){
    const listener=orbitPointerCancelListener||orbitPointerUpListener;
    if(typeof listener!=='function')return false;
    const synthetic={
      pointerId,
      pointerType:'touch',
      isPrimary:false,
      button:0,
      buttons:0,
      pressure:0,
      target:canvas,
      currentTarget:canvas,
      preventDefault:()=>{},
      stopPropagation:()=>{},
      stopImmediatePropagation:()=>{}
    };
    try{
      listener.call(canvas,synthetic);
      gestureDebug('ORBIT RELEASE REPLAY',{pid:pointerId,reason});
      return true;
    }catch(error){
      gestureDebug('ORBIT RELEASE REPLAY FAIL',{pid:pointerId,reason,message:error?.message||String(error)});
      return false;
    }
  }

  function reconcileFreshTouch(){
    if(!recentlyEndedTouchIds.length)return;
    for(const pointerId of [...recentlyEndedTouchIds])replayOrbitRelease(pointerId,'fresh-first-touch');
    gestureDebug('ORBIT TOUCH RECONCILE',{ended:[...recentlyEndedTouchIds]});
  }

  function restoreStaleControls(reason){
    const controls=globalThis.__boxlabBridgeState?.controls;
    if(!controls||controls.enabled!==false)return false;
    controls.enabled=true;
    gestureDebug('NAV CONTROLS RECOVER',{reason});
    return true;
  }

  function trackPhysicalTouchDown(event){
    if(event.pointerType!=='touch')return;
    const fresh=physicalTouchContacts.size===0;
    if(fresh){
      reconcileFreshTouch();
      restoreStaleControls('fresh-touch');
    }
    physicalTouchContacts.add(event.pointerId);
    gestureDebug('PHYSICAL TOUCH DOWN',{pid:event.pointerId,count:physicalTouchContacts.size,fresh,controlsEnabled:globalThis.__boxlabBridgeState?.controls?.enabled!==false});
  }

  function feedOrbitReleaseEarly(event){
    if(event.pointerType!=='touch'&&event.pointerType!=='pen')return;
    if(event.pointerType==='touch'){
      physicalTouchContacts.delete(event.pointerId);
      rememberEndedTouch(event.pointerId);
    }
    const listener=event.type==='pointercancel'?orbitPointerCancelListener:orbitPointerUpListener;
    if(typeof listener==='function'){
      earlyReleasedPointers.add(event.pointerId);
      queueMicrotask(()=>earlyReleasedPointers.delete(event.pointerId));
      try{
        listener.call(canvas,event);
        gestureDebug('ORBIT RELEASE EARLY WINDOW',{type:event.type,pointer:event.pointerType,pid:event.pointerId,touches:physicalTouchContacts.size});
      }catch(error){
        gestureDebug('ORBIT RELEASE EARLY FAIL',{type:event.type,pointer:event.pointerType,pid:event.pointerId,message:error?.message||String(error)});
      }
    }
    queueMicrotask(()=>{
      if(physicalTouchContacts.size===0&&!activePenContacts.size)restoreStaleControls('last-contact-ended');
    });
  }

  function trackPenBackgroundTapDown(event){
    if(event.pointerType!=='pen'||event.target!==canvas)return;
    const contact=(event.buttons&1)===1||event.pressure>0;
    if(!contact)return;
    const meshHit=pencilHitsEditableMesh(event);
    const modellingToolActive=!!globalThis.__boxlabFaceDirect?.active?.()||!!globalThis.__boxlabMainDirectTool?.ownsModellingGesture?.();
    if(meshHit||modellingToolActive||globalThis.__boxlabLasso?.isArmed?.()){
      penBackgroundTaps.delete(event.pointerId);
      return;
    }
    penBackgroundTaps.set(event.pointerId,{x:event.clientX,y:event.clientY,orbitClaimed:false});
    gestureDebug('PEN BACKGROUND CANDIDATE',{pid:event.pointerId,x:Math.round(event.clientX),y:Math.round(event.clientY)});
  }

  window.addEventListener('pointerdown',trackPhysicalTouchDown,{capture:true,passive:true});
  window.addEventListener('pointerdown',trackPenBackgroundTapDown,{capture:true,passive:true});
  window.addEventListener('pointerup',feedOrbitReleaseEarly,{capture:true,passive:true});
  window.addEventListener('pointercancel',feedOrbitReleaseEarly,{capture:true,passive:true});

  nativeAddEventListener('pointermove',event=>{
    if(event.pointerType!=='pen'||!pendingMeshOrbit||pendingMeshOrbit.pointerId!==event.pointerId)return;
    // Edge paint owns this contact even when a body lies behind its picked rail.
    if(globalThis.__boxlabLasso?.isArmed?.()||globalThis.__boxlabModelessSelection?.browsing?.(event.pointerId)||pendingMeshOrbit.selectionMode==='edge'&&(globalThis.__boxlabPaintSelectDebug?.pending?.()?.pointerId===event.pointerId||globalThis.__boxlabPaintSelectDebug?.active?.()?.pointerId===event.pointerId)){
      gestureDebug('PEN ORBIT DEFER YIELD HOLD',{pid:event.pointerId});
      pendingMeshOrbit=null;
      return;
    }
    const dx=event.clientX-pendingMeshOrbit.x,dy=event.clientY-pendingMeshOrbit.y;
    if(Math.hypot(dx,dy)<DEFERRED_ORBIT_PX){if(suppressedPenSelections.has(event.pointerId))event.stopImmediatePropagation?.();return;}
    const pending=pendingMeshOrbit;
    pendingMeshOrbit=null;

    window.dispatchEvent(new CustomEvent('boxlab-pencil-orbit-claim',{detail:{pointerId:event.pointerId}}));

    const bridge=selectionBridge();
    if(bridge?.mode?.()===pending.selectionMode)bridge.set?.(pending.selectionMode,pending.selectionIndices);

    if(typeof orbitPointerDownListener!=='function'){
      gestureDebug('PEN ORBIT DEFER FAIL',{pid:event.pointerId,reason:'no-down-listener'});
      return;
    }

    const downEvent={
      pointerId:event.pointerId,
      pointerType:'pen',
      isPrimary:event.isPrimary,
      button:pending.button,
      buttons:pending.buttons||1,
      pressure:pending.pressure,
      clientX:pending.x,
      clientY:pending.y,
      pageX:pending.pageX,
      pageY:pending.pageY,
      ctrlKey:pending.ctrlKey,
      metaKey:pending.metaKey,
      shiftKey:pending.shiftKey,
      altKey:pending.altKey,
      preventDefault:()=>{},
      stopPropagation:()=>{},
      stopImmediatePropagation:()=>{}
    };

    activePenContacts.add(event.pointerId);
    penOrbitPointers.add(event.pointerId);
    orbitPointerDownListener.call(canvas,downEvent);
    gestureDebug('PEN ORBIT DEFER CLAIM',{
      pid:event.pointerId,
      dx:Math.round(dx),
      dy:Math.round(dy),
      restored:pendedSelectionCount(pending),
      controlsEnabled:globalThis.__boxlabBridgeState?.controls?.enabled!==false
    });

    event.preventDefault?.();
    event.stopImmediatePropagation?.();
  },{capture:true,passive:false});

  nativeAddEventListener('pointermove',event=>{
    if(event.pointerType==='pen'&&suppressedPenSelections.has(event.pointerId))event.stopImmediatePropagation?.();
  },{capture:true,passive:false});

  function pendedSelectionCount(pending){
    return Array.isArray(pending?.selectionIndices)?pending.selectionIndices.length:0;
  }

  function endPenNavigation(event) {
    if (event.pointerType !== 'pen') return;
    navigationSnapshots.delete(event.pointerId);
    penOrbitPointers.delete(event.pointerId);
    try { canvas.releasePointerCapture?.(event.pointerId); } catch {}
  }

  // These release events must remain visible to OrbitControls.
  nativeAddEventListener('pointerup', endPenNavigation, { capture: false, passive: true });
  nativeAddEventListener('pointercancel', endPenNavigation, { capture: false, passive: true });

  function beginOrbitRegistration(){
    orbitRegistrationDepth++;
    gestureDebug('PEN ORBIT REGISTER BEGIN',{depth:orbitRegistrationDepth});
  }
  function endOrbitRegistration(){
    orbitRegistrationDepth=Math.max(0,orbitRegistrationDepth-1);
    gestureDebug('PEN ORBIT REGISTER END',{depth:orbitRegistrationDepth});
  }

  canvas.addEventListener = function (type, listener, options) {
    const name = typeof listener === 'function' ? listener.name || '' : '';
    const pointerEvent = /^pointer(?:down|move|up|cancel)$/.test(type);
    const explicitOrbitPointer = pointerEvent && orbitRegistrationDepth>0;
    const namedOrbitPointer = pointerEvent && /onPointer/i.test(name);
    const orbitPointer = explicitOrbitPointer || namedOrbitPointer;
    if (!orbitPointer) return nativeAddEventListener(type, listener, options);
    gestureDebug('PEN ORBIT LISTENER WRAPPED',{
      type,
      name:name||'anonymous',
      explicit:explicitOrbitPointer,
      depth:orbitRegistrationDepth
    });
    if(type==='pointerdown')orbitPointerDownListener=listener;
    else if(type==='pointerup')orbitPointerUpListener=listener;
    else if(type==='pointercancel')orbitPointerCancelListener=listener;

    const wrapped = function (event) {
      if((type==='pointerup'||type==='pointercancel')&&earlyReleasedPointers.has(event.pointerId)){
        if(event.pointerType==='pen')endPenNavigation(event);
        return;
      }
      if (event.pointerType !== 'pen') return listener.call(this, event);
      if ((type !== 'pointerup' && type !== 'pointercancel') && isPenHover(event)) {
        if(type==='pointermove')gestureDebug('PEN ORBIT MOVE HOVER BLOCK',{pid:event.pointerId,pressure:event.pressure,buttons:event.buttons,contactTracked:activePenContacts.has(event.pointerId)});
        return;
      }
      if(type==='pointermove')gestureDebug('PEN ORBIT MOVE FORWARD',{pid:event.pointerId,pressure:event.pressure,buttons:event.buttons,tracked:penOrbitPointers.has(event.pointerId),contactTracked:activePenContacts.has(event.pointerId)});
      if (type === 'pointerdown') {
        const bridge=selectionBridge();
        const selectionMode=bridge?.mode?.()||null;
        const selectionCount=[...(bridge?.indices?.()||[])].length;
        const meshHit=pencilHitsEditableMesh(event);
        const faceToolActive=!!globalThis.__boxlabFaceDirect?.active?.();
        const mainDirectTool=globalThis.__boxlabMainDirectTool?.active?.()||null;
        const mainDirectActive=!!globalThis.__boxlabMainDirectTool?.ownsModellingGesture?.();
        const paintState=globalThis.__boxlabPaintSelectDebug;
        const paintPending=paintState?.pending?.()||null;
        const paintActive=paintState?.active?.()||null;
        const multiEnabled=paintState?.multiEnabled?.()??null;
        const viewportPaint=globalThis.__boxlabViewportPaint;
        const viewportPaintActive=!!viewportPaint?.active;
        // Use Paint's exact surface hit test as well as the modelling mesh
        // raycast; false negatives there must not send brush contacts to orbit.
        const paintHit=viewportPaintActive&&viewportPaint?.hit?.(event)===true;
        const controlsEnabled=globalThis.__boxlabBridgeState?.controls?.enabled!==false;
        const lassoActive=!!globalThis.__boxlabLasso?.isArmed?.();
        const blocked=!!meshHit||paintHit||lassoActive;
        // UV Paint's window owner normally consumes a valid surface down first.
        // If its stricter hit test declines that down, keep the same mesh contact
        // out of deferred-orbit promotion; only empty-space Pencil drags navigate.
        const modellingToolActive=faceToolActive||mainDirectActive||lassoActive||viewportPaintActive&&(!!meshHit||paintHit)||(selectionMode==='face'&&!!globalThis.__boxlabFacegroupStroke?.armed);
        const settings=generalSettings();
        const deferred=blocked&&!modellingToolActive&&settings.pencilOrbit;
        // Background Pencil tap candidacy is owned by window-capture tracking,
        // independent of whether OrbitControls receives this pointerdown.
        gestureDebug('PEN ORBIT ROUTE',{
          pid:event.pointerId,
          pressure:event.pressure,
          buttons:event.buttons,
          meshHit,
          selectionMode,
          selectionCount,
          faceToolActive,
          mainDirectTool,
          mainDirectActive,
          multiEnabled,
          paintPending,
          paintActive,
          viewportPaintActive,
          paintHit,
          controlsEnabled,
          route:deferred?'DEFER_MESH_INTENT':blocked&&modellingToolActive?'BLOCK_MODELLING_TOOL':blocked?'BLOCK_MESH_HIT':'FORWARD_ORBIT'
        });
        if(deferred){
          pendingMeshOrbit={
            pointerId:event.pointerId,
            x:event.clientX,
            y:event.clientY,
            pageX:event.pageX,
            pageY:event.pageY,
            button:event.button,
            buttons:event.buttons,
            pressure:event.pressure,
            ctrlKey:event.ctrlKey,
            metaKey:event.metaKey,
            shiftKey:event.shiftKey,
            altKey:event.altKey,
            selectionMode,
            selectionIndices:[...(bridge?.indices?.()||[])]
          };
          return;
        }
        if(blocked||!settings.pencilOrbit)return;
        penOrbitPointers.add(event.pointerId);
      }
      const result = listener.call(this, event);
      if(type==='pointerdown'&&event.pointerType==='pen'){
        gestureDebug('PEN ORBIT FORWARDED',{
          pid:event.pointerId,
          controlsEnabled:globalThis.__boxlabBridgeState?.controls?.enabled!==false,
          tracked:penOrbitPointers.has(event.pointerId)
        });
      }
      if ((type === 'pointerup' || type === 'pointercancel') && penOrbitPointers.has(event.pointerId)) {
        endPenNavigation(event);
      }
      return result;
    };
    orbitListeners.set(listener, wrapped);
    return nativeAddEventListener(type, wrapped, options);
  };

  globalThis.__boxlabPencilOrbitGate={
    version:'0.36.18.682',
    beginOrbitRegistration,
    endOrbitRegistration,
    registrationDepth:()=>orbitRegistrationDepth
  };

  globalThis.__boxlabPencilOrbitDebug={
    snapshot:()=>({
      navigationPointers:[...navigationSnapshots.keys()],
      orbitPointers:[...penOrbitPointers],
      contactPointers:[...activePenContacts],
      physicalTouchPointers:[...physicalTouchContacts],
      recentlyEndedTouchIds:[...recentlyEndedTouchIds],
      pendingMeshOrbit:pendingMeshOrbit?{pointerId:pendingMeshOrbit.pointerId,selectionMode:pendingMeshOrbit.selectionMode,selectionCount:pendingMeshOrbit.selectionIndices.length}:null,
      controlsEnabled:globalThis.__boxlabBridgeState?.controls?.enabled!==false
    })
  };

  canvas.__boxlabPencilOrbitGateInstalled = true;
}
