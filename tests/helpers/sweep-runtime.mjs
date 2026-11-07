import {buildSweepProfile} from '../../src/sweep-core.js';
import {constructionRuntime} from './construction-runtime.mjs';
export function sweepRuntime(sourceTransform=source=>source){
 const f=constructionRuntime(sourceTransform),c=f.context;
 Object.assign(c,{buildSweepProfile});f.load('sweep-path.js');
 const owner=c.__boxlabSweepPath;
 return {...f,owner,frame:()=>owner.rebuild(),
  add(){c.window.dispatchEvent(new c.CustomEvent('boxlab-add-sweep-path'));owner.rebuild();return f.manager.objects.at(-1);}};
}
