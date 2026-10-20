// Session-only brush coverage; source rows follow PNG top-first convention.
export function captureAlphaTip(tip){
 if(!tip||!Number.isInteger(tip.width)||!Number.isInteger(tip.height)||tip.width<1||tip.height<1||tip.width>256||tip.height>256||!(tip.pixels instanceof Uint8Array)||tip.pixels.length!==tip.width*tip.height)throw Error('Alpha tip must be at most 256 × 256 pixels');
 return Object.freeze({width:tip.width,height:tip.height,pixels:tip.pixels.slice()});
}
export function alphaTipCoverage(tip,x,y,c=1,s=0){
 const rx=c*x+s*y,ry=-s*x+c*y,max=Math.max(tip.width,tip.height),u=(rx*max/tip.width+1)/2,v=(1-ry*max/tip.height)/2;
 if(u<0||u>1||v<0||v>1)return 0;
 const px=u*(tip.width-1),py=v*(tip.height-1),ix=Math.floor(px),iy=Math.floor(py),fx=px-ix,fy=py-iy,at=(x,y)=>tip.pixels[x+y*tip.width]/255;
 return (at(ix,iy)*(1-fx)+at(Math.min(ix+1,tip.width-1),iy)*fx)*(1-fy)+(at(ix,Math.min(iy+1,tip.height-1))*(1-fx)+at(Math.min(ix+1,tip.width-1),Math.min(iy+1,tip.height-1))*fx)*fy;
}
