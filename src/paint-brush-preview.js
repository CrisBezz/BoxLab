import {createPaintLayer} from '../evaluations/uv-paint/paint-core.js?v=0.36.18.1010';

export function brushPreviewPixels(settings){
 const layer=createPaintLayer(256,{transparent:true});
 try{
  layer.begin({...settings,radius:Math.max(1,settings.radius/4),pressure:false});
  for(let i=0;i<=64;i++){const t=i/64;layer.stamp(.18+t*.64,.5+Math.sin(t*Math.PI*2)*.1);}
  layer.finish();return layer.pixels.slice();
 }finally{layer.dispose();}
}
export function createBrushSizePreview({document,host,settings,schedule=fn=>fn()}){
 let box=null,canvas=null,label=null,active=false,queued=false;
 function hide(){active=false;if(box)box.hidden=true;}
 return{hide,show(){active=true;if(queued)return;queued=true;schedule(()=>{queued=false;if(!active)return;
  if(!box){
   box=document.createElement('div');box.id='boxlabBrushSizePreview';
   box.style.cssText='position:absolute;top:12px;left:50%;margin-left:-138px;width:276px;max-width:80%;padding:8px;background:#16191f;border:1px solid #59616d;border-radius:10px;z-index:150;pointer-events:none;text-align:center;color:#eef2f8;font-size:12px;';
   label=document.createElement('div');canvas=document.createElement('canvas');canvas.width=canvas.height=256;
   canvas.style.cssText='display:block;width:256px;max-width:100%;height:auto;margin-top:4px;background:repeating-conic-gradient(#555 0% 25%,#333 0% 50%) 0/16px 16px;';
   box.appendChild(label);box.appendChild(canvas);host.appendChild(box);
  }
  const s=settings();label.textContent=`Brush radius ${s.radius} texels · ↑ larger / ↓ smaller`;
  const ctx=canvas.getContext('2d'),data=ctx.createImageData(256,256);data.data.set(brushPreviewPixels(s));ctx.putImageData(data,0,0);box.hidden=false;
 });}};
}
