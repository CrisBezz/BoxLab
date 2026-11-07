import {EditableMesh} from '../../src/mesh.js';
import {buildRevolveFromPoints} from '../../src/revolve-core.js';
import {constructionRuntime} from './construction-runtime.mjs';

// Reuse controlled DOM/dispatch, real camera, mesh and History fixture. The
// manager, scene capture/restore and shared session boundary are adapters.
// Actual object-history bridge retains its WeakMap scene tags on history tokens.
export function revolveRuntime(sourceTransform=source=>source){
 const f=constructionRuntime(sourceTransform),c=f.context,{manager,tools}=f;
 Object.assign(c,{EditableMesh,buildRevolveFromPoints});
 f.load('revolve-profile.js');
 const owner=c.__boxlabRevolveProfile;
 const frame=()=>owner.rebuild();
 const pointer=(type,world,extra={})=>{const p=f.screen(world);return f.pointer(type,{clientX:p.x,clientY:p.y,...extra});};
 return {...f,owner,manager,frame,
  launchRow:()=>tools.children.find(node=>node.className==='outliner-actions revolve-profile-launch-row'),
  add(){c.window.dispatchEvent(new c.CustomEvent('boxlab-add-revolve-profile'));frame();return manager.objects.at(-1);},
  tap(world,extra={}){pointer('pointerdown',world,extra);pointer('pointerup',world,extra);frame();},
  pointer};
}
