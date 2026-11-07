// Screen overlay only. The viewport painter remains the sole pointer owner.
export function createPaintImageOverlay(canvas,source){
 const node=document.createElement('canvas'),bitmap=document.createElement('canvas');
 node.setAttribute('aria-hidden','true');node.style.cssText='position:absolute;pointer-events:none;z-index:4;';
 bitmap.width=source.width;bitmap.height=source.height;const ctx=bitmap.getContext('2d');if(!ctx)throw Error('Image overlay canvas unavailable');
 const data=ctx.createImageData(source.width,source.height);data.data.set(source.pixels);ctx.putImageData(data,0,0);
 canvas.parentElement.appendChild(node);let last='';
 return {draw(placement){const r=canvas.getBoundingClientRect(),parent=canvas.parentElement.getBoundingClientRect(),key=JSON.stringify([r.left,r.top,r.width,r.height,parent.left,parent.top,placement]);if(key===last)return;last=key;node.style.left=(r.left-parent.left)+'px';node.style.top=(r.top-parent.top)+'px';node.style.width=r.width+'px';node.style.height=r.height+'px';node.width=Math.max(1,Math.round(r.width));node.height=Math.max(1,Math.round(r.height));const c=node.getContext('2d');if(!c)throw Error('Image overlay canvas unavailable');
  const {centre,size,rotation}=placement,co=Math.cos(rotation),si=Math.sin(rotation),w=node.width,h=node.height;c.globalAlpha=.65;c.setTransform(co*w*.5*size[0],-si*h*.5*size[0],si*w*.5*size[1],co*h*.5*size[1],(centre[0]+1)*w*.5,(1-centre[1])*h*.5);c.drawImage(bitmap,-.5,-.5,1,1);
 },dispose(){node.remove();node.width=node.height=bitmap.width=bitmap.height=1;}};
}
