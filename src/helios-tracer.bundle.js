/* HeliosStudio integration bundle; source commit 3ca8ac22b011f42ed83555720cc6cd71e6b57329. Rebuild with npm run build:helios-tracer. */
var yt=Object.defineProperty;var vt=(n,e,t)=>e in n?yt(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var S=(n,e,t)=>vt(n,typeof e!="symbol"?e+"":e,t);import*as U from"three";var Y=1024,xt=24;function Re(n,e,t){let r=new U.DataTexture(n,e,t,U.RGBAFormat,U.FloatType);return r.minFilter=U.NearestFilter,r.magFilter=U.NearestFilter,r.generateMipmaps=!1,r.wrapS=U.ClampToEdgeWrapping,r.wrapT=U.ClampToEdgeWrapping,r.needsUpdate=!0,r}function Je(n){n.updateMatrixWorld(!0);let e=[],t=new Map,r=new U.Vector3,o=new U.Vector3,a=new U.Vector3,i=new U.Vector3,h=new U.Vector3,c=new U.Vector3,u=new U.Vector3,l=new U.Vector3,f=new U.Vector3,p=new U.Matrix3;if(n.traverse(G=>{let B=G;if(!B.isMesh||!B.geometry||!B.visible||B.userData.excludeFromRaytracer)return;let A=B.geometry,F=A.getAttribute("position");if(!F)return;let z=A.getAttribute("normal"),j=A.getAttribute("uv"),O=A.getIndex(),se=String(B.userData.materialId||"default"),ae=t.get(se);ae===void 0&&(ae=Math.min(t.size,xt-1),t.set(se,ae));let ue=B.matrixWorld;p.getNormalMatrix(ue);let X=Math.floor(O?O.count/3:F.count/3);for(let ie=0;ie<X;ie++){let me=O?O.getX(ie*3):ie*3,be=O?O.getX(ie*3+1):ie*3+1,Te=O?O.getX(ie*3+2):ie*3+2;if(r.fromBufferAttribute(F,me).applyMatrix4(ue),o.fromBufferAttribute(F,be).applyMatrix4(ue),a.fromBufferAttribute(F,Te).applyMatrix4(ue),u.subVectors(o,r),l.subVectors(a,r),f.crossVectors(u,l),f.lengthSq()<1e-12)continue;z?(i.fromBufferAttribute(z,me).applyMatrix3(p).normalize(),h.fromBufferAttribute(z,be).applyMatrix3(p).normalize(),c.fromBufferAttribute(z,Te).applyMatrix3(p).normalize()):(f.normalize(),i.copy(f),h.copy(f),c.copy(f));let Ee=0,W=0,J=0,re=0,he=0,de=0;if(j)Ee=j.getX(me),W=j.getY(me),J=j.getX(be),re=j.getY(be),he=j.getX(Te),de=j.getY(Te);else{let pe=Math.abs(f.x),ye=Math.abs(f.y),fe=Math.abs(f.z);if(ye>=pe&&ye>=fe){let Z=f.y>=0?-1:1;Ee=r.x,W=r.z*Z,J=o.x,re=o.z*Z,he=a.x,de=a.z*Z}else if(pe>=ye&&pe>=fe){let Z=f.x>=0?-1:1;Ee=r.z*Z,W=r.y,J=o.z*Z,re=o.y,he=a.z*Z,de=a.y}else{let Z=f.z>=0?1:-1;Ee=r.x*Z,W=r.y,J=o.x*Z,re=o.y,he=a.x*Z,de=a.y}}e.push({v0x:r.x,v0y:r.y,v0z:r.z,v1x:o.x,v1y:o.y,v1z:o.z,v2x:a.x,v2y:a.y,v2z:a.z,n0x:i.x,n0y:i.y,n0z:i.z,n1x:h.x,n1y:h.y,n1z:h.z,n2x:c.x,n2y:c.y,n2z:c.z,u0:Ee,v0:W,u1:J,v1:re,u2:he,v2:de,cx:(r.x+o.x+a.x)/3,cy:(r.y+o.y+a.y)/3,cz:(r.z+o.z+a.z)/3,minX:Math.min(r.x,o.x,a.x),minY:Math.min(r.y,o.y,a.y),minZ:Math.min(r.z,o.z,a.z),maxX:Math.max(r.x,o.x,a.x),maxY:Math.max(r.y,o.y,a.y),maxZ:Math.max(r.z,o.z,a.z),matIdx:ae})}}),e.length===0){let G=new Float32Array(Y*4),B=new Float32Array(Y*4),A=new Float32Array(Y*4),F=new Float32Array(Y*4);return{triangleCount:0,nodeCount:1,bvhTexture:Re(G,Y,1),triPosTexture:Re(B,Y,1),triNormTexture:Re(A,Y,1),triUvTexture:Re(F,Y,1),texWidth:Y,bvhTexHeight:1,triTexHeight:1,materialIdToIndex:t}}let d=new Int32Array(e.length);for(let G=0;G<e.length;G++)d[G]=G;let v=new Array(e.length*2+2),E=1;function M(G,B,A){let F=1/0,z=1/0,j=1/0,O=-1/0,se=-1/0,ae=-1/0;for(let ue=0;ue<A;ue++){let X=e[d[B+ue]];X.minX<F&&(F=X.minX),X.minY<z&&(z=X.minY),X.minZ<j&&(j=X.minZ),X.maxX>O&&(O=X.maxX),X.maxY>se&&(se=X.maxY),X.maxZ>ae&&(ae=X.maxZ)}v[G]={minX:F-1e-4,minY:z-1e-4,minZ:j-1e-4,maxX:O+1e-4,maxY:se+1e-4,maxZ:ae+1e-4,leftFirst:B,triCount:A}}let T=8,R=new Float64Array(T),b=new Float64Array(T),m=new Float64Array(T),s=new Float64Array(T),y=new Float64Array(T),g=new Float64Array(T),x=new Int32Array(T),I=new Float64Array(T-1),L=new Int32Array(T-1);function P(G,B,A,F,z,j){let O=F-G,se=z-B,ae=j-A;return O<=0&&se<=0&&ae<=0?0:2*(O*se+se*ae+ae*O)}function C(G,B){let A=v[G],F=A.leftFirst,z=A.triCount;if(z<=2||B>=26)return;let j=-1,O=0,se=1/0,ae=P(A.minX,A.minY,A.minZ,A.maxX,A.maxY,A.maxZ),ue=z;for(let W=0;W<3;W++){let J=1/0,re=-1/0;for(let w=0;w<z;w++){let _=e[d[F+w]],Me=W===0?_.cx:W===1?_.cy:_.cz;Me<J&&(J=Me),Me>re&&(re=Me)}if(re-J<1e-6)continue;x.fill(0);for(let w=0;w<T;w++)R[w]=1/0,b[w]=1/0,m[w]=1/0,s[w]=-1/0,y[w]=-1/0,g[w]=-1/0;let he=T/(re-J);for(let w=0;w<z;w++){let _=e[d[F+w]],Me=W===0?_.cx:W===1?_.cy:_.cz,oe=Math.min(T-1,Math.floor((Me-J)*he));x[oe]++,_.minX<R[oe]&&(R[oe]=_.minX),_.minY<b[oe]&&(b[oe]=_.minY),_.minZ<m[oe]&&(m[oe]=_.minZ),_.maxX>s[oe]&&(s[oe]=_.maxX),_.maxY>y[oe]&&(y[oe]=_.maxY),_.maxZ>g[oe]&&(g[oe]=_.maxZ)}let de=1/0,pe=1/0,ye=1/0,fe=-1/0,Z=-1/0,Ue=-1/0,ze=0;for(let w=T-1;w>0;w--)x[w]>0&&(ze+=x[w],R[w]<de&&(de=R[w]),b[w]<pe&&(pe=b[w]),m[w]<ye&&(ye=m[w]),s[w]>fe&&(fe=s[w]),y[w]>Z&&(Z=y[w]),g[w]>Ue&&(Ue=g[w])),L[w-1]=ze,I[w-1]=ze>0?P(de,pe,ye,fe,Z,Ue):0;let _e=1/0,ke=1/0,Xe=1/0,Ye=-1/0,We=-1/0,Oe=-1/0,Ze=0,pt=ae>1e-8?1/ae:1;for(let w=0;w<T-1;w++){x[w]>0&&(Ze+=x[w],R[w]<_e&&(_e=R[w]),b[w]<ke&&(ke=b[w]),m[w]<Xe&&(Xe=m[w]),s[w]>Ye&&(Ye=s[w]),y[w]>We&&(We=y[w]),g[w]>Oe&&(Oe=g[w]));let _=L[w];if(Ze===0||_===0)continue;let Me=P(_e,ke,Xe,Ye,We,Oe),oe=.5+(Ze*Me+_*I[w])*pt;oe<se&&(se=oe,j=W,O=J+(w+1)/T*(re-J))}}if(j===-1||se>=ue&&z<=4)return;let X=F,ie=F+z-1;for(;X<=ie;){let W=e[d[X]];if((j===0?W.cx:j===1?W.cy:W.cz)<O)X++;else{let re=d[X];d[X]=d[ie],d[ie]=re,ie--}}let me=X-F;if(me===0||me===z){let W=A.maxX-A.minX,J=A.maxY-A.minY,re=A.maxZ-A.minZ,he=W>=J&&W>=re?0:J>=re?1:2;d.subarray(F,F+z).sort((pe,ye)=>{let fe=e[pe],Z=e[ye];return he===0?fe.cx-Z.cx:he===1?fe.cy-Z.cy:fe.cz-Z.cz})}let be=me===0||me===z?Math.floor(z/2):me,Te=E++,Ee=E++;M(Te,F,be),M(Ee,F+be,z-be),A.leftFirst=Te,A.triCount=0,C(Te,B+1),C(Ee,B+1)}M(0,0,e.length),C(0,0);let k=E*2,ee=Math.max(1,Math.ceil(k/Y)),te=new Float32Array(Y*ee*4);for(let G=0;G<E;G++){let B=v[G],A=G*8;te[A+0]=B.minX,te[A+1]=B.minY,te[A+2]=B.minZ,te[A+3]=B.leftFirst,te[A+4]=B.maxX,te[A+5]=B.maxY,te[A+6]=B.maxZ,te[A+7]=B.triCount}let Ce=e.length*3,$=Math.max(1,Math.ceil(Ce/Y)),D=new Float32Array(Y*$*4),K=new Float32Array(Y*$*4),Se=Math.max(1,Math.ceil(e.length*2/Y)),ce=new Float32Array(Y*Se*4);for(let G=0;G<e.length;G++){let B=e[d[G]],A=G*12;D[A+0]=B.v0x,D[A+1]=B.v0y,D[A+2]=B.v0z,D[A+3]=B.matIdx,D[A+4]=B.v1x,D[A+5]=B.v1y,D[A+6]=B.v1z,D[A+7]=0,D[A+8]=B.v2x,D[A+9]=B.v2y,D[A+10]=B.v2z,D[A+11]=0,K[A+0]=B.n0x,K[A+1]=B.n0y,K[A+2]=B.n0z,K[A+3]=0,K[A+4]=B.n1x,K[A+5]=B.n1y,K[A+6]=B.n1z,K[A+7]=0,K[A+8]=B.n2x,K[A+9]=B.n2y,K[A+10]=B.n2z,K[A+11]=0;let F=G*8;ce[F+0]=B.u0,ce[F+1]=B.v0,ce[F+2]=B.u1,ce[F+3]=B.v1,ce[F+4]=B.u2,ce[F+5]=B.v2,ce[F+6]=0,ce[F+7]=0}return{triangleCount:e.length,nodeCount:E,bvhTexture:Re(te,Y,ee),triPosTexture:Re(D,Y,$),triNormTexture:Re(K,Y,$),triUvTexture:Re(ce,Y,Se),texWidth:Y,bvhTexHeight:ee,triTexHeight:$,materialIdToIndex:t}}import*as V from"three";import{GLTFLoader as Mt}from"three/addons/loaders/GLTFLoader.js";import{OBJLoader as Rt}from"three/addons/loaders/OBJLoader.js";import{STLLoader as At}from"three/addons/loaders/STLLoader.js";import*as N from"three";import*as xe from"three";var ve=new xe.Vector3,Ae=new xe.Vector3,He=new xe.Vector3,Qe=new xe.Vector3,et=new xe.Vector3,we=new xe.Vector3;function gt(n){if(n.getAttribute("normal")||n.computeVertexNormals(),!n.index)return n;let e=n.toNonIndexed();return n.dispose(),e}function ot(n,e=1){let t=gt(n),r=t.getAttribute("position");if(!r)return t;let o=new Float32Array(r.count*2),a=Math.floor(r.count/3);for(let i=0;i<a;i++){let h=i*3,c=i*3+1,u=i*3+2;ve.fromBufferAttribute(r,h),Ae.fromBufferAttribute(r,c),He.fromBufferAttribute(r,u),Qe.subVectors(Ae,ve),et.subVectors(He,ve),we.crossVectors(Qe,et);let l=Math.abs(we.x),f=Math.abs(we.y),p=Math.abs(we.z);if(f>=l&&f>=p){let d=we.y>=0?1:-1;o[h*2+0]=ve.x*e,o[h*2+1]=-ve.z*d*e,o[c*2+0]=Ae.x*e,o[c*2+1]=-Ae.z*d*e,o[u*2+0]=He.x*e,o[u*2+1]=-He.z*d*e}else if(l>=f&&l>=p){let d=we.x>=0?-1:1;o[h*2+0]=ve.z*d*e,o[h*2+1]=ve.y*e,o[c*2+0]=Ae.z*d*e,o[c*2+1]=Ae.y*e,o[u*2+0]=He.z*d*e,o[u*2+1]=He.y*e}else{let d=we.z>=0?1:-1;o[h*2+0]=ve.x*d*e,o[h*2+1]=ve.y*e,o[c*2+0]=Ae.x*d*e,o[c*2+1]=Ae.y*e,o[u*2+0]=He.x*d*e,o[u*2+1]=He.y*e}}return t.setAttribute("uv",new xe.BufferAttribute(o,2)),t}function qe(n,e,t){return`${Math.round(n*1e4)},${Math.round(e*1e4)},${Math.round(t*1e4)}`}function at(n){let e=[],t=1/0,r=-1/0,o=1/0,a=-1/0,i=new Map,h=[];for(let u of n){let l=u.getAttribute("position"),f=u.getAttribute("uv");if(!l||!f)continue;let p=u.getIndex(),d=Math.floor(p?p.count/3:l.count/3);for(let v=0;v<d;v++){let E=p?p.getX(v*3):v*3,M=p?p.getX(v*3+1):v*3+1,T=p?p.getX(v*3+2):v*3+2,R=f.getX(E),b=f.getY(E),m=f.getX(M),s=f.getY(M),y=f.getX(T),g=f.getY(T);e.push(R,b,m,s,y,g),R<t&&(t=R),m<t&&(t=m),y<t&&(t=y),R>r&&(r=R),m>r&&(r=m),y>r&&(r=y),b<o&&(o=b),s<o&&(o=s),g<o&&(o=g),b>a&&(a=b),s>a&&(a=s),g>a&&(a=g);let x=[qe(l.getX(E),l.getY(E),l.getZ(E)),qe(l.getX(M),l.getY(M),l.getZ(M)),qe(l.getX(T),l.getY(T),l.getZ(T))],I=[[R,b],[m,s],[y,g]];for(let L=0;L<3;L++){let P=L,C=(L+1)%3,k=x[P],ee=x[C];if(k===ee)continue;let te=k<ee,Ce=te?`${k}|${ee}`:`${ee}|${k}`,$=te?{kA:k,kB:ee,uA:I[P][0],vA:I[P][1],uB:I[C][0],vB:I[C][1]}:{kA:ee,kB:k,uA:I[C][0],vA:I[C][1],uB:I[P][0],vB:I[P][1]},D=i.get(Ce);if(!D)i.set(Ce,$);else{let K=Math.hypot(D.uA-$.uA,D.vA-$.vA),Se=Math.hypot(D.uB-$.uB,D.vB-$.vB);(K>.0015||Se>.0015)&&h.push({uA1:D.uA,vA1:D.vA,uB1:D.uB,vB1:D.vB,uA2:$.uA,vA2:$.vA,uB2:$.uB,vB2:$.vB})}}}}let c=e.length>0&&t>=-.05&&r<=1.05&&o>=-.05&&a<=1.05;return{triangles:new Float32Array(e),isAtlas:c,seamPairs:h}}function Fe(n,e,t){let r=t?Math.max(0,Math.min(.999999,n)):n-Math.floor(n);return Math.max(0,Math.min(e-1,Math.floor(r*e)))}function bt(n,e){let t=new Uint8Array(e*e),r=n.length/6;for(let o=0;o<r;o++){let a=o*6,i=n[a+0]*e,h=n[a+1]*e,c=n[a+2]*e,u=n[a+3]*e,l=n[a+4]*e,f=n[a+5]*e,p=Math.max(0,Math.floor(Math.min(i,c,l))-1),d=Math.min(e-1,Math.ceil(Math.max(i,c,l))+1),v=Math.max(0,Math.floor(Math.min(h,u,f))-1),E=Math.min(e-1,Math.ceil(Math.max(h,u,f))+1),M=(c-i)*(f-h)-(l-i)*(u-h);if(Math.abs(M)<1e-4){let b=Math.max(0,Math.min(e-1,Math.round(i))),m=Math.max(0,Math.min(e-1,Math.round(h))),s=Math.max(0,Math.min(e-1,Math.round(c))),y=Math.max(0,Math.min(e-1,Math.round(u))),g=Math.max(0,Math.min(e-1,Math.round(l))),x=Math.max(0,Math.min(e-1,Math.round(f)));t[m*e+b]=1,t[y*e+s]=1,t[x*e+g]=1;continue}let T=1/M,R=.5/Math.max(1,Math.sqrt(Math.abs(M)));for(let b=v;b<=E;b++){let m=b+.5;for(let s=p;s<=d;s++){let y=s+.5,g=((c-y)*(f-m)-(l-y)*(u-m))*T,x=((l-y)*(h-m)-(i-y)*(f-m))*T,I=1-g-x;g>=-R&&x>=-R&&I>=-R&&(t[b*e+s]=1)}}}return t}function tt(n,e,t,r,o){let a=t*t,i=new Int16Array(a);i.fill(-1);let h=new Int32Array(a),c=0,u=0;for(let p=0;p<a;p++)e[p]===1&&(i[p]=0,h[u++]=p);if(u===0||u===a)return;let l=[-1,0,1,-1,1,-1,0,1],f=[-1,-1,-1,0,0,1,1,1];for(;c<u;){let p=h[c++],d=i[p];if(d>=r)continue;let v=p%t,E=(p-v)/t;for(let M=0;M<8;M++){let T=v+l[M],R=E+f[M];if(T<0||T>=t||R<0||R>=t)continue;let b=R*t+T;if(i[b]!==-1)continue;let m=0,s=0,y=0,g=0;for(let x=0;x<8;x++){let I=T+l[x],L=R+f[x];if(I<0||I>=t||L<0||L>=t)continue;let P=L*t+I;if(i[P]!==-1&&i[P]<=d){let C=P*4;o?(m+=n[C+0]-128,s+=n[C+1]-128,y+=n[C+2]-128):(m+=n[C+0],s+=n[C+1],y+=n[C+2]),g++}}if(g>0){let x=b*4;if(o){let I=m/g,L=s/g,P=y/g,C=Math.hypot(I,L,P)||1;n[x+0]=Math.max(0,Math.min(255,Math.round(I/C*127+128))),n[x+1]=Math.max(0,Math.min(255,Math.round(L/C*127+128))),n[x+2]=Math.max(0,Math.min(255,Math.round(P/C*127+128)))}else n[x+0]=Math.round(m/g),n[x+1]=Math.round(s/g),n[x+2]=Math.round(y/g);n[x+3]=255,i[b]=d+1,h[u++]=b}}}}function rt(n,e,t,r,o,a){let i=0,h=0,c=0,u=0;for(let l=-3;l<=3;l++){let f=r+l;if(!(f<0||f>=o))for(let p=-3;p<=3;p++){let d=t+p;if(d<0||d>=o)continue;let v=f*o+d;if(e[v]===0)continue;let E=1/(1+p*p+l*l),M=v*4;a?(i+=(n[M+0]-128)*E,h+=(n[M+1]-128)*E,c+=(n[M+2]-128)*E):(i+=n[M+0]*E,h+=n[M+1]*E,c+=n[M+2]*E),u+=E}}if(u<=0){let l=(r*o+t)*4;return[n[l+0],n[l+1],n[l+2]]}if(a){let l=Math.hypot(i,h,c)||1;return[Math.max(0,Math.min(255,Math.round(i/l*127+128))),Math.max(0,Math.min(255,Math.round(h/l*127+128))),Math.max(0,Math.min(255,Math.round(c/l*127+128)))]}return[i/u,h/u,c/u]}function nt(n,e,t,r,o){let a=t*t,i=new Uint8Array(a);if(o&&o.triangles.length>0&&o.isAtlas){let h=bt(o.triangles,t),c=!1;for(let l=0;l<a;l++)h[l]===1&&e[l]>=230&&(i[l]=1,c=!0);c||i.fill(1);let u=new Uint8Array(a);for(let l=1;l<t-1;l++)for(let f=1;f<t-1;f++){let p=l*t+f;i[p]===1&&i[p-1]===1&&i[p+1]===1&&i[p-t]===1&&i[p+t]===1&&(u[p]=1)}if(!r){let l=new Uint8Array(n);for(let f=1;f<t-1;f++)for(let p=1;p<t-1;p++){let d=f*t+p;if(i[d]===1&&u[d]===0){let v=d*4,E=l[v]*.299+l[v+1]*.587+l[v+2]*.114,M=0,T=0,R=0,b=0,m=0;for(let s=-1;s<=1;s++)for(let y=-1;y<=1;y++){let g=(f+s)*t+(p+y);if(u[g]===1){let x=g*4,I=l[x]*.299+l[x+1]*.587+l[x+2]*.114;I>m&&(m=I),M+=l[x],T+=l[x+1],R+=l[x+2],b++}}b>0&&E<m*.78&&(n[v+0]=Math.round(M/b),n[v+1]=Math.round(T/b),n[v+2]=Math.round(R/b))}}}if(o.seamPairs.length>0){let l=new Uint8Array(n),f=[.92,.62,.3,.12],p=(d,v,E,M,T,R)=>{if(d<0||d>=t||v<0||v>=t)return;let b=v*t+d;if(i[b]===0)return;let m=b*4,s=1-R;if(r){let y=(l[m+0]-128)*s+(E-128)*R,g=(l[m+1]-128)*s+(M-128)*R,x=(l[m+2]-128)*s+(T-128)*R,I=Math.hypot(y,g,x)||1;n[m+0]=Math.max(0,Math.min(255,Math.round(y/I*127+128))),n[m+1]=Math.max(0,Math.min(255,Math.round(g/I*127+128))),n[m+2]=Math.max(0,Math.min(255,Math.round(x/I*127+128)))}else n[m+0]=Math.round(l[m+0]*s+E*R),n[m+1]=Math.round(l[m+1]*s+M*R),n[m+2]=Math.round(l[m+2]*s+T*R)};for(let d of o.seamPairs){let v=Math.hypot(d.uB1-d.uA1,d.vB1-d.vA1)*t,E=Math.hypot(d.uB2-d.uA2,d.vB2-d.vA2)*t,M=Math.max(2,Math.min(1024,Math.ceil(Math.max(v,E))));for(let T=0;T<=M;T++){let R=T/M,b=Fe(d.uA1+(d.uB1-d.uA1)*R,t,!0),m=Fe(d.vA1+(d.vB1-d.vA1)*R,t,!0),s=Fe(d.uA2+(d.uB2-d.uA2)*R,t,!0),y=Fe(d.vA2+(d.vB2-d.vA2)*R,t,!0),g=rt(l,u,b,m,t,r),x=rt(l,u,s,y,t,r),I=r?g:[(g[0]+x[0])*.5,(g[1]+x[1])*.5,(g[2]+x[2])*.5],L=r?x:I;for(let P=-3;P<=3;P++)for(let C=-3;C<=3;C++){let k=Math.round(Math.hypot(C,P));if(k>=f.length)continue;let ee=r?f[k]*.88:f[k];p(b+C,m+P,I[0],I[1],I[2],ee),p(s+C,y+P,L[0],L[1],L[2],ee)}}}}tt(n,i,t,14,r)}else{let h=!1;for(let c=0;c<a;c++)e[c]>=230?i[c]=1:h=!0;h&&tt(n,i,t,14,r)}}var Q=256,Ne=8,ne=1024,ge=8,Be=100;var Le={none:0,"brushed-metal":1,"carbon-weave":2,vulcanite:3,guilloche:4,concrete:5,"cedar-wood":6,travertine:7};function Ge(n,e,t,r){let o=(n%t+t)%t,a=(e%r+r)%r,i=o*374761393+a*668265263;return i=(i^i>>13)*1274126177,((i^i>>16)>>>0)/4294967295}function $e(n,e,t,r){let o=n*t,a=e*r,i=Math.floor(o),h=Math.floor(a),c=o-i,u=a-h,l=c*c*(3-2*c),f=u*u*(3-2*u),p=Ge(i,h,t,r),d=Ge(i+1,h,t,r),v=Ge(i,h+1,t,r),E=Ge(i+1,h+1,t,r);return p+(d-p)*l+(v-p)*f+(p-d-v+E)*l*f}function Tt(n,e,t){return $e(n,e,t,t)}function je(n,e,t,r,o=4){let a=0,i=.5,h=0,c=t,u=r;for(let l=0;l<o;l++)a+=$e(n,e,c,u)*i,h+=i,i*=.5,c*=2,u*=2;return a/h}function Pe(n,e,t,r=4){return je(n,e,t,t,r)}function Et(n,e,t,r,o){for(let a=0;a<e;a++){let i=(a-1+e)%e,h=(a+1)%e;for(let c=0;c<e;c++){let u=(c-1+e)%e,l=(c+1)%e,f=n[a*e+u],p=n[a*e+l],d=n[i*e+c],v=n[h*e+c],E=(f-p)*t,M=(d-v)*t,T=1,R=Math.sqrt(E*E+M*M+T*T),b=o+(a*e+c)*4;r[b+0]=Math.round((E/R*.5+.5)*255),r[b+1]=Math.round((M/R*.5+.5)*255),r[b+2]=Math.round((T/R*.5+.5)*255),r[b+3]=255}}}var Ve=class{constructor(e){S(this,"albedoArray");S(this,"normalArray");S(this,"roughMetalArray");S(this,"customAlbedoArray");S(this,"customNormalArray");S(this,"customRoughMetalArray");S(this,"albedoBytes");S(this,"normalBytes");S(this,"roughMetalBytes");S(this,"customAllocated",!1);S(this,"customAlbedoBytes",null);S(this,"customNormalBytes",null);S(this,"customRoughMetalBytes",null);S(this,"customIsAtlas",new Array(ge).fill(!1));S(this,"threeMapsCache",new Map);S(this,"nextCustomSlice",0);S(this,"maxAnisotropy");this.maxAnisotropy=Math.min(8,Math.max(1,e));let r=Q*Q*4*Ne;this.albedoBytes=new Uint8Array(r),this.normalBytes=new Uint8Array(r),this.roughMetalBytes=new Uint8Array(r);for(let o=0;o<Ne;o++)this.fillNeutralPresetLayer(o);this.generatePresetLayer("brushed-metal",1),this.generatePresetLayer("carbon-weave",2),this.generatePresetLayer("vulcanite",3),this.generatePresetLayer("guilloche",4),this.generatePresetLayer("concrete",5),this.generatePresetLayer("cedar-wood",6),this.generatePresetLayer("travertine",7),this.albedoArray=this.createArrayTexture(this.albedoBytes,Q,Ne),this.normalArray=this.createArrayTexture(this.normalBytes,Q,Ne),this.roughMetalArray=this.createArrayTexture(this.roughMetalBytes,Q,Ne),this.customAlbedoArray=this.createDummyArrayTex([255,255,255,255]),this.customNormalArray=this.createDummyArrayTex([128,128,255,255]),this.customRoughMetalArray=this.createDummyArrayTex([255,255,255,255])}createDummyArrayTex(e){let t=new N.DataArrayTexture(new Uint8Array(e),1,1,1);return t.format=N.RGBAFormat,t.type=N.UnsignedByteType,t.minFilter=N.LinearFilter,t.magFilter=N.LinearFilter,t.wrapS=N.RepeatWrapping,t.wrapT=N.RepeatWrapping,t.generateMipmaps=!1,t.needsUpdate=!0,t}createArrayTexture(e,t,r){let o=new N.DataArrayTexture(e,t,t,r);return o.format=N.RGBAFormat,o.type=N.UnsignedByteType,o.minFilter=N.LinearFilter,o.magFilter=N.LinearFilter,o.wrapS=N.RepeatWrapping,o.wrapT=N.RepeatWrapping,o.generateMipmaps=!1,o.needsUpdate=!0,o}ensureCustomAllocated(){if(this.customAllocated)return;let t=ne*ne*4*ge;this.customAlbedoBytes=new Uint8Array(t),this.customNormalBytes=new Uint8Array(t),this.customRoughMetalBytes=new Uint8Array(t);for(let r=0;r<ge;r++)this.fillNeutralCustomSlice(r);this.customAlbedoArray.dispose(),this.customNormalArray.dispose(),this.customRoughMetalArray.dispose(),this.customAlbedoArray=this.createArrayTexture(this.customAlbedoBytes,ne,ge),this.customNormalArray=this.createArrayTexture(this.customNormalBytes,ne,ge),this.customRoughMetalArray=this.createArrayTexture(this.customRoughMetalBytes,ne,ge),this.customAllocated=!0}fillNeutralPresetLayer(e){let t=Q*Q*4,r=e*t;for(let o=0;o<Q*Q;o++){let a=r+o*4;this.albedoBytes[a+0]=255,this.albedoBytes[a+1]=255,this.albedoBytes[a+2]=255,this.albedoBytes[a+3]=255,this.normalBytes[a+0]=128,this.normalBytes[a+1]=128,this.normalBytes[a+2]=255,this.normalBytes[a+3]=255,this.roughMetalBytes[a+0]=255,this.roughMetalBytes[a+1]=255,this.roughMetalBytes[a+2]=255,this.roughMetalBytes[a+3]=255}}fillNeutralCustomSlice(e){if(!this.customAlbedoBytes||!this.customNormalBytes||!this.customRoughMetalBytes)return;let t=ne*ne,r=e*t*4;for(let o=0;o<t;o++){let a=r+o*4;this.customAlbedoBytes[a+0]=255,this.customAlbedoBytes[a+1]=255,this.customAlbedoBytes[a+2]=255,this.customAlbedoBytes[a+3]=255,this.customNormalBytes[a+0]=128,this.customNormalBytes[a+1]=128,this.customNormalBytes[a+2]=255,this.customNormalBytes[a+3]=255,this.customRoughMetalBytes[a+0]=255,this.customRoughMetalBytes[a+1]=255,this.customRoughMetalBytes[a+2]=255,this.customRoughMetalBytes[a+3]=255}}upscalePresetToCustomSlice(e,t){if(!this.customAlbedoBytes||!this.customNormalBytes||!this.customRoughMetalBytes)return;let r=ne/Q,o=e*Q*Q*4,a=t*ne*ne*4,i=(h,c,u)=>{for(let l=0;l<ne;l++){let f=Math.min(Q-1,Math.floor(l/r));for(let p=0;p<ne;p++){let d=Math.min(Q-1,Math.floor(p/r)),v=o+(f*Q+d)*4,E=a+(l*ne+p)*4;c[E+0]=h[v+0],c[E+1]=h[v+1],c[E+2]=h[v+2],c[E+3]=u?255:h[v+3]}}};i(this.albedoBytes,this.customAlbedoBytes,!1),i(this.normalBytes,this.customNormalBytes,!0),i(this.roughMetalBytes,this.customRoughMetalBytes,!1)}generatePresetLayer(e,t){let r=Q,o=new Float32Array(r*r),a=t*r*r*4,i=2;for(let h=0;h<r;h++){let c=h/r;for(let u=0;u<r;u++){let l=u/r,f=h*r+u,p=a+f*4,d=255,v=255,E=255,M=1,T=.5;if(e==="brushed-metal"){let b=je(l,c,2,32,3),m=$e(l,c,8,96),s=.85+b*.11+m*.04;d=v=E=Math.round(s*255),T=b*.72+m*.28,M=.78+b*.42,i=1.4}else if(e==="carbon-weave"){let m=l*12,s=c*12,y=Math.floor(m),g=Math.floor(s),x=m-y,I=s-g,P=(y+g)%4<2,C=P?Math.sin(x*Math.PI)*(.85+.15*Math.sin(I*Math.PI*6)):Math.sin(I*Math.PI)*(.85+.15*Math.sin(x*Math.PI*6)),k=P?.52+C*.42:.38+C*.36;d=v=E=Math.round(k*255),T=C,M=P?.55+(1-C)*.45:.82+(1-C)*.35,i=3.2}else if(e==="vulcanite"){let b=Pe(l,c,24,3),m=Tt(l,c,48),s=Math.pow(b*.72+m*.28,1.35),y=.7+s*.3;d=v=E=Math.round(y*255),T=s,M=.85+(1-s)*.35,i=4}else if(e==="guilloche"){let b=l-.5,m=c-.5,s=Math.sqrt(b*b+m*m),y=Math.atan2(m,b),g=Math.cos(y*48)*.5+.5,x=Math.cos(s*Math.PI*44)*.5+.5,I=Math.max(Math.abs(b),Math.abs(m)),L=I<.44?1:Math.max(0,(.5-I)/.06),P=.5+(g*.55+x*.45-.5)*L,C=.65+P*.35;d=v=E=Math.round(C*255),T=P,M=.6+(1-P)*.5,i=2.4}else if(e==="concrete"){let b=Pe(l,c,6,4),m=Pe(l,c,24,3),s=m<.32?(.32-m)*1.8:0,y=Math.abs((c*4+.5)%1-.5)>.486?.12:0,g=Math.max(.45,Math.min(1,.78+(b-.5)*.28-s*.4-y));d=Math.round(g*255),v=Math.round(g*.99*255),E=Math.round(g*.96*255),T=b*.65+m*.35-s*.5-y,M=.85+s*.3+(1-b)*.2,i=3}else if(e==="cedar-wood"){let b=Pe(l,c,4,3)*.35,m=Math.sin((l*10+b*8)*Math.PI*2)*.5+.5,s=je(l,c,24,3,3),y=m*.65+s*.35;d=Math.round((.68+y*.32)*255),v=Math.round((.54+y*.3)*255),E=Math.round((.42+y*.26)*255),T=y*.7+s*.3,M=.78+(1-y)*.38,i=2.2}else if(e==="travertine"){let b=Pe(l,c,4,4),m=Math.pow(Math.abs(Math.sin((c*3+b*2.2)*Math.PI)),.35),s=Pe(l*2,c*4,16,3),y=s<.28?(.28-s)*1.4:0,g=Math.max(.55,Math.min(1,.72+m*.26-y*.35));d=Math.round(g*255),v=Math.round(g*.96*255),E=Math.round(g*.9*255),T=m*.6+s*.4-y*.7,M=.72+y*.6+(1-m)*.25,i=2.6}o[f]=T,this.albedoBytes[p+0]=d,this.albedoBytes[p+1]=v,this.albedoBytes[p+2]=E,this.albedoBytes[p+3]=255;let R=Math.max(12,Math.min(255,Math.round(M*255)));this.roughMetalBytes[p+0]=R,this.roughMetalBytes[p+1]=R,this.roughMetalBytes[p+2]=255,this.roughMetalBytes[p+3]=255}}Et(o,r,i,this.normalBytes,a)}allocateCustomLayer(e="none",t=!1){this.ensureCustomAllocated();let r=this.nextCustomSlice;this.nextCustomSlice=this.nextCustomSlice>=ge-1?0:this.nextCustomSlice+1;let o=Le[e];o===0?this.fillNeutralCustomSlice(r):this.upscalePresetToCustomSlice(o,r),this.customIsAtlas[r]=t;let a=Be+r;return this.customAlbedoArray.addLayerUpdate(r),this.customNormalArray.addLayerUpdate(r),this.customRoughMetalArray.addLayerUpdate(r),this.invalidateLayer(a),a}writeImageToLayer(e,t,r,o=!1,a){if(e<Be||(this.ensureCustomAllocated(),!this.customAlbedoBytes||!this.customNormalBytes||!this.customRoughMetalBytes))return;let i=e-Be;if(i<0||i>=ge)return;a&&(this.customIsAtlas[i]=a.isAtlas);let h=ne,c=document.createElement("canvas");c.width=h,c.height=h;let u=c.getContext("2d");if(!u)return;u.imageSmoothingEnabled=!0,u.imageSmoothingQuality="high",o?(u.save(),u.translate(0,h),u.scale(1,-1),u.drawImage(r,0,0,h,h),u.restore()):u.drawImage(r,0,0,h,h);let l=u.getImageData(0,0,h,h).data,f=h*h,p=f*4,d=i*p,v=new Uint8Array(p),E=new Uint8Array(f);for(let M=0;M<f;M++){let T=M*4;E[M]=l[T+3],v[T+0]=l[T+0],v[T+1]=l[T+1],v[T+2]=l[T+2],v[T+3]=255}nt(v,E,h,t==="normal",a),t==="albedo"?(this.customAlbedoBytes.set(v,d),this.customAlbedoArray.addLayerUpdate(i),this.customAlbedoArray.needsUpdate=!0):t==="normal"?(this.customNormalBytes.set(v,d),this.customNormalArray.addLayerUpdate(i),this.customNormalArray.needsUpdate=!0):(this.customRoughMetalBytes.set(v,d),this.customRoughMetalArray.addLayerUpdate(i),this.customRoughMetalArray.needsUpdate=!0),this.invalidateLayer(e)}async writeFileToLayer(e,t,r,o){let a=URL.createObjectURL(r);try{let i=await new Promise((h,c)=>{let u=new Image;u.onload=()=>h(u),u.onerror=()=>c(new Error(`Unable to decode image ${r.name}`)),u.src=a});this.writeImageToLayer(e,t,i,!1,o)}finally{URL.revokeObjectURL(a)}}getLayerShaderInfo(e){if(e>=Be){let t=Math.max(0,Math.min(ge-1,e-Be));return{slice:t,modeFlag:this.customIsAtlas[t]?2:1}}return{slice:e,modeFlag:0}}invalidateLayer(e){let t=this.threeMapsCache.get(e);t&&(t.map?.dispose(),t.normalMap?.dispose(),t.roughnessMap?.dispose(),this.threeMapsCache.delete(e)),this.albedoArray.needsUpdate=!0,this.normalArray.needsUpdate=!0,this.roughMetalArray.needsUpdate=!0,this.customAlbedoArray.needsUpdate=!0,this.customNormalArray.needsUpdate=!0,this.customRoughMetalArray.needsUpdate=!0}getThreeMapsForLayer(e,t){if(e===0)return{map:null,normalMap:null,roughnessMap:null};let r=e>=Be,o=r?e-Be:e,a=r?ne:Q,i=r&&!!this.customIsAtlas[o],h=this.threeMapsCache.get(e);if(!h){let u=r?this.customAlbedoBytes:this.albedoBytes,l=r?this.customNormalBytes:this.normalBytes,f=r?this.customRoughMetalBytes:this.roughMetalBytes;if(!u||!l||!f)return{map:null,normalMap:null,roughnessMap:null};let p=a*a*4,d=o*p,v=(E,M)=>{let T=new Uint8Array(p);T.set(E.subarray(d,d+p));let R=new N.DataTexture(T,a,a,N.RGBAFormat);R.colorSpace=M?N.SRGBColorSpace:N.NoColorSpace;let b=i&&t<=1.02?N.ClampToEdgeWrapping:N.RepeatWrapping;return R.wrapS=b,R.wrapT=b,R.minFilter=N.LinearMipmapLinearFilter,R.magFilter=N.LinearFilter,R.generateMipmaps=!0,R.anisotropy=this.maxAnisotropy,R.needsUpdate=!0,R};h={map:v(u,!0),normalMap:v(l,!1),roughnessMap:v(f,!1)},this.threeMapsCache.set(e,h)}let c=i&&t<=1.02?N.ClampToEdgeWrapping:N.RepeatWrapping;return[h.map,h.normalMap,h.roughnessMap].forEach(u=>{u&&(u.repeat.set(t,t),(u.wrapS!==c||u.wrapT!==c)&&(u.wrapS=c,u.wrapT=c,u.needsUpdate=!0))}),h}resetCustomCounter(){this.nextCustomSlice=0,this.customIsAtlas.fill(!1);for(let e of Array.from(this.threeMapsCache.keys()))if(e>=Be){let t=this.threeMapsCache.get(e);t?.map?.dispose(),t?.normalMap?.dispose(),t?.roughnessMap?.dispose(),this.threeMapsCache.delete(e)}}dispose(){this.albedoArray.dispose(),this.normalArray.dispose(),this.roughMetalArray.dispose(),this.customAlbedoArray.dispose(),this.customNormalArray.dispose(),this.customRoughMetalArray.dispose();for(let e of this.threeMapsCache.values())e.map?.dispose(),e.normalMap?.dispose(),e.roughnessMap?.dispose();this.threeMapsCache.clear()}};function Ht(n,e){let t=new V.MeshPhysicalMaterial({color:new V.Color(n.color),roughness:n.roughness,metalness:n.metalness,ior:n.ior,clearcoat:n.clearcoat,clearcoatRoughness:Math.max(.04,n.roughness*.4),envMapIntensity:1.05});return n.transmission>.05&&(e?(t.transparent=!0,t.opacity=Math.max(.28,1-n.transmission*.65),t.depthWrite=!1):(t.transmission=n.transmission,t.thickness=.65,t.attenuationColor=new V.Color(n.color),t.attenuationDistance=1.6)),n.emissiveIntensity>.01&&(t.emissive=new V.Color(n.color),t.emissiveIntensity=n.emissiveIntensity),t}async function st(n,e,t,r){let o=n.name.split(".").pop()?.toLowerCase()??"",a=await n.arrayBuffer(),i;if(o==="glb"||o==="gltf"){let m=new Mt;i=(await new Promise((y,g)=>{m.parse(a,"",x=>y(x),g)})).scene}else if(o==="obj"){let m=new TextDecoder().decode(a);i=new Rt().parse(m)}else if(o==="stl"){let s=new At().parse(a);s.computeVertexNormals();let y=new V.Mesh(s);i=new V.Group,i.add(y)}else throw new Error(`Unsupported format ".${o}". Please import GLB, GLTF, OBJ, or STL.`);i.updateMatrixWorld(!0);let h=new V.Box3().setFromObject(i);if(h.isEmpty())throw new Error("The imported file contains no renderable 3D geometry.");let c=new V.Vector3,u=new V.Vector3;h.getSize(c),h.getCenter(u);let f=1.45/Math.max(c.x,c.y,c.z,1e-4),p=new V.Vector3(-u.x*f,-h.min.y*f,-u.z*f),d=new V.Group;i.position.copy(p),i.scale.setScalar(f),d.add(i),d.updateMatrixWorld(!0);let v=[],E=new Map,M=new Map,T=new Map,R=new Map,b=1;if(d.traverse(m=>{let s=m;if(!s.isMesh||!s.geometry)return;let y=s.geometry;y.getAttribute("normal")||y.computeVertexNormals(),y.getAttribute("uv")||(s.geometry=ot(y,1));let g=Array.isArray(s.material)?s.material[0]:s.material,x=g,I=g?g.uuid:"imported_default",L=E.get(I);if(!L)if(v.length>=20)L=v[0].id;else{L=`imported_mat_${v.length+1}`,E.set(I,L),T.set(L,x);let te=x&&x.color?`#${x.color.getHexString()}`:v.length===0?"#cfd3d9":"#9ca3af",Ce=x&&typeof x.roughness=="number"?x.roughness:.45,$=x&&typeof x.metalness=="number"?x.metalness:.15,D=x&&x.name||s.name||`Surface ${v.length+1}`,K=!!x?.map?.image,Se=!!x?.normalMap?.image,ce=!!x?.roughnessMap?.image,G=!!x?.metalnessMap?.image,B=x?.normalScale&&typeof x.normalScale.x=="number"?Math.max(0,Math.min(2,x.normalScale.x)):1;v.push({id:L,name:D.slice(0,24),color:te,roughness:Math.max(.03,Math.min(1,Ce)),metalness:Math.max(0,Math.min(1,$)),ior:1.5,transmission:0,clearcoat:.1,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:B,hasCustomAlbedo:K,hasCustomNormal:Se,hasCustomRoughness:ce,hasCustomMetalness:G})}let P=v.find(te=>te.id===L),C=Ht(P,e);s.material=C,s.castShadow=!0,s.receiveShadow=!0,s.userData.materialId=L,s.userData.partName=s.name||`Mesh Part ${b++}`;let k=M.get(L)??[];k.push(s),M.set(L,k);let ee=R.get(L)??[];ee.push(s.geometry),R.set(L,ee)}),v.length===0)throw new Error("No mesh triangles found in the imported file.");if(t&&r)for(let m of v){let s=T.get(m.id),y=!!s?.map?.image,g=!!s?.normalMap?.image,x=!!s?.roughnessMap?.image,I=!!s?.metalnessMap?.image;if(y||g||x||I){let L=R.get(m.id)??[],P=at(L),C=t.allocateCustomLayer("none",P.isAtlas);s?.map?.image&&t.writeImageToLayer(C,"albedo",s.map.image,!!s.map.flipY,P),s?.normalMap?.image&&t.writeImageToLayer(C,"normal",s.normalMap.image,!!s.normalMap.flipY,P);let k=s?.roughnessMap?.image?s.roughnessMap:s?.metalnessMap;k?.image&&t.writeImageToLayer(C,"roughness",k.image,!!k.flipY,P),r.set(m.id,C)}else r.set(m.id,0)}return{group:d,materials:v,meshMap:M,rayTransform:{scale:f,offset:p}}}import*as H from"three";function it(n){let e=Math.max(1e3,Math.min(4e4,n))/100,t,r,o;return e<=66?(t=255,r=99.4708025861*Math.log(e)-161.1195681661,o=e<=19?0:138.5177312231*Math.log(e-10)-305.0447927307):(t=329.698727446*Math.pow(e-60,-.1332047592),r=288.1221695283*Math.pow(e-60,-.0755148492),o=255),[Math.max(0,Math.min(255,t))/255,Math.max(0,Math.min(255,r))/255,Math.max(0,Math.min(255,o))/255]}function Ke(n){let e=n.replace("#",""),t=parseInt(e.length===3?e.split("").map(h=>h+h).join(""):e,16),r=h=>h<=.04045?h/12.92:Math.pow((h+.055)/1.055,2.4),o=(t>>16&255)/255,a=(t>>8&255)/255,i=(t&255)/255;return[r(o),r(a),r(i)]}function lt(n,e,t){let r=n*Math.PI/180,o=e*Math.PI/180,a=Math.cos(o),i=t*a*Math.sin(r),h=t*Math.sin(o),c=t*a*Math.cos(r);return[i,h,c]}var Ie=4,le=24,ct=`precision highp float;
in vec3 position;
in vec2 uv;
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Bt=`precision highp float;
precision highp int;
precision highp sampler2DArray;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uPrevFrame;
uniform sampler2D uBvhTex;
uniform sampler2D uTriPosTex;
uniform sampler2D uTriNormTex;
uniform sampler2D uTriUvTex;

uniform sampler2DArray uAlbedoArray;
uniform sampler2DArray uNormalArray;
uniform sampler2DArray uRoughMetalArray;

uniform sampler2DArray uCustomAlbedoArray;
uniform sampler2DArray uCustomNormalArray;
uniform sampler2DArray uCustomRoughMetalArray;

uniform int uTexWidth;
uniform int uSampleIndex;
uniform int uMaxBounces;
uniform int uClayMode;
uniform int uEnvMode;
uniform float uEnvIntensity;
uniform vec2 uResolution;

uniform vec3 uCamPos;
uniform vec3 uCamRight;
uniform vec3 uCamUp;
uniform vec3 uCamForward;
uniform float uTanHalfFov;
uniform float uAspect;

// Light uniforms: posRadius = (x, y, z, radius), colorEnabled = (r, g, b, enabled ? 1.0 : 0.0)
uniform vec4 uLightPosRadius[${Ie}];
uniform vec4 uLightColorEnabled[${Ie}];

// Material uniforms: 4 vec4s per material
// matA = (albedo.r, albedo.g, albedo.b, roughness)
// matB = (metalness, ior, transmission, clearcoat)
// matC = (emissiveIntensity, 0, 0, 0)
// matD = (texSlice, uvScale, normalStrength, modeFlag: 0=preset, 1=custom tile, 2=custom atlas)
uniform vec4 uMatA[${le}];
uniform vec4 uMatB[${le}];
uniform vec4 uMatC[${le}];
uniform vec4 uMatD[${le}];

const float PI = 3.14159265359;
const float INF = 1e20;

// PCG hash RNG
uint rngState;

uint pcgHash(uint v) {
  uint state = v * 747796405u + 2891336453u;
  uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
  return (word >> 22u) ^ word;
}

float rand() {
  rngState = pcgHash(rngState);
  return float(rngState) / 4294967295.0;
}

vec4 fetchTexel(sampler2D tex, int idx) {
  int x = idx & 1023;
  int y = idx >> 10;
  return texelFetch(tex, ivec2(x, y), 0);
}

// AABB slab test
float intersectAABB(vec3 ro, vec3 invRd, vec3 bMin, vec3 bMax, float maxT) {
  vec3 t0 = (bMin - ro) * invRd;
  vec3 t1 = (bMax - ro) * invRd;
  vec3 tNear = min(t0, t1);
  vec3 tFar = max(t0, t1);
  float tEnter = max(max(tNear.x, tNear.y), max(tNear.z, 0.0002));
  float tExit = min(min(tFar.x, tFar.y), min(tFar.z, maxT));
  return tExit >= tEnter ? tEnter : INF;
}

// Moller-Trumbore ray-triangle intersection
bool intersectTriangle(
  vec3 ro,
  vec3 rd,
  vec3 v0,
  vec3 v1,
  vec3 v2,
  float maxT,
  out float outT,
  out float outU,
  out float outV
) {
  vec3 e1 = v1 - v0;
  vec3 e2 = v2 - v0;
  vec3 pvec = cross(rd, e2);
  float det = dot(e1, pvec);
  if (abs(det) < 1e-7) return false;
  float invDet = 1.0 / det;
  vec3 tvec = ro - v0;
  float u = dot(tvec, pvec) * invDet;
  if (u < 0.0 || u > 1.0) return false;
  vec3 qvec = cross(tvec, e1);
  float v = dot(rd, qvec) * invDet;
  if (v < 0.0 || u + v > 1.0) return false;
  float t = dot(e2, qvec) * invDet;
  if (t <= 0.0004 || t >= maxT) return false;
  outT = t;
  outU = u;
  outV = v;
  return true;
}

void buildONB(vec3 n, out vec3 t, out vec3 b) {
  vec3 up = abs(n.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
  t = normalize(cross(up, n));
  b = cross(n, t);
}

struct HitInfo {
  float t;
  vec3 pos;
  vec3 normal;
  vec3 geomNormal;
  vec2 uv;
  vec3 tangent;
  vec3 bitangent;
  int matIdx;
  bool isFloor;
  vec3 floorAlbedo;
  float floorRoughness;
};

bool intersectBVH(vec3 ro, vec3 rd, inout HitInfo hit) {
  vec3 invRd = 1.0 / (rd + vec3(
    abs(rd.x) < 1e-7 ? 1e-7 : 0.0,
    abs(rd.y) < 1e-7 ? 1e-7 : 0.0,
    abs(rd.z) < 1e-7 ? 1e-7 : 0.0
  ));

  int stack[32];
  int stackPtr = 0;
  stack[stackPtr++] = 0;

  bool found = false;

  while (stackPtr > 0) {
    int nodeIdx = stack[--stackPtr];
    vec4 n0 = fetchTexel(uBvhTex, nodeIdx * 2);
    vec4 n1 = fetchTexel(uBvhTex, nodeIdx * 2 + 1);

    float boxT = intersectAABB(ro, invRd, n0.xyz, n1.xyz, hit.t);
    if (boxT >= hit.t) continue;

    int leftFirst = int(n0.w + 0.5);
    int triCount = int(n1.w + 0.5);

    if (triCount > 0) {
      for (int i = 0; i < triCount; i++) {
        int triIdx = leftFirst + i;
        vec4 p0 = fetchTexel(uTriPosTex, triIdx * 3);
        vec4 p1 = fetchTexel(uTriPosTex, triIdx * 3 + 1);
        vec4 p2 = fetchTexel(uTriPosTex, triIdx * 3 + 2);

        float t, u, v;
        if (intersectTriangle(ro, rd, p0.xyz, p1.xyz, p2.xyz, hit.t, t, u, v)) {
          hit.t = t;
          hit.pos = ro + rd * t;
          hit.matIdx = int(p0.w + 0.5);
          hit.isFloor = false;

          vec4 nm0 = fetchTexel(uTriNormTex, triIdx * 3);
          vec4 nm1 = fetchTexel(uTriNormTex, triIdx * 3 + 1);
          vec4 nm2 = fetchTexel(uTriNormTex, triIdx * 3 + 2);
          float w = 1.0 - u - v;
          hit.normal = normalize(nm0.xyz * w + nm1.xyz * u + nm2.xyz * v);
          hit.geomNormal = normalize(cross(p1.xyz - p0.xyz, p2.xyz - p0.xyz));

          vec4 uv01 = fetchTexel(uTriUvTex, triIdx * 2);
          vec4 uv2x = fetchTexel(uTriUvTex, triIdx * 2 + 1);
          vec2 uv0 = uv01.xy;
          vec2 uv1 = uv01.zw;
          vec2 uv2 = uv2x.xy;
          hit.uv = uv0 * w + uv1 * u + uv2 * v;

          vec3 dp1 = p1.xyz - p0.xyz;
          vec3 dp2 = p2.xyz - p0.xyz;
          vec2 duv1 = uv1 - uv0;
          vec2 duv2 = uv2 - uv0;
          float detUV = duv1.x * duv2.y - duv2.x * duv1.y;
          if (abs(detUV) > 1e-8) {
            float signDet = detUV >= 0.0 ? 1.0 : -1.0;
            vec3 rawT = (dp1 * duv2.y - dp2 * duv1.y) * signDet;
            vec3 rawB = (dp2 * duv1.x - dp1 * duv2.x) * signDet;
            float t2 = dot(rawT, rawT);
            float b2 = dot(rawB, rawB);
            if (t2 > 1e-12 && b2 > 1e-12) {
              hit.tangent = rawT * inversesqrt(t2);
              hit.bitangent = rawB * inversesqrt(b2);
            } else {
              buildONB(hit.normal, hit.tangent, hit.bitangent);
            }
          } else {
            buildONB(hit.normal, hit.tangent, hit.bitangent);
          }

          found = true;
        }
      }
    } else {
      int leftChild = leftFirst;
      int rightChild = leftFirst + 1;

      vec4 l0 = fetchTexel(uBvhTex, leftChild * 2);
      vec4 l1 = fetchTexel(uBvhTex, leftChild * 2 + 1);
      vec4 r0 = fetchTexel(uBvhTex, rightChild * 2);
      vec4 r1 = fetchTexel(uBvhTex, rightChild * 2 + 1);

      float distL = intersectAABB(ro, invRd, l0.xyz, l1.xyz, hit.t);
      float distR = intersectAABB(ro, invRd, r0.xyz, r1.xyz, hit.t);

      if (distL < distR) {
        if (distR < hit.t && stackPtr < 31) stack[stackPtr++] = rightChild;
        if (distL < hit.t && stackPtr < 31) stack[stackPtr++] = leftChild;
      } else {
        if (distL < hit.t && stackPtr < 31) stack[stackPtr++] = leftChild;
        if (distR < hit.t && stackPtr < 31) stack[stackPtr++] = rightChild;
      }
    }
  }

  return found;
}

vec3 intersectShadow(vec3 ro, vec3 rd, float maxT) {
  vec3 invRd = 1.0 / (rd + vec3(
    abs(rd.x) < 1e-7 ? 1e-7 : 0.0,
    abs(rd.y) < 1e-7 ? 1e-7 : 0.0,
    abs(rd.z) < 1e-7 ? 1e-7 : 0.0
  ));

  int stack[32];
  int stackPtr = 0;
  stack[stackPtr++] = 0;

  vec3 visibility = vec3(1.0);

  while (stackPtr > 0) {
    int nodeIdx = stack[--stackPtr];
    vec4 n0 = fetchTexel(uBvhTex, nodeIdx * 2);
    vec4 n1 = fetchTexel(uBvhTex, nodeIdx * 2 + 1);

    float boxT = intersectAABB(ro, invRd, n0.xyz, n1.xyz, maxT);
    if (boxT >= maxT) continue;

    int leftFirst = int(n0.w + 0.5);
    int triCount = int(n1.w + 0.5);

    if (triCount > 0) {
      for (int i = 0; i < triCount; i++) {
        int triIdx = leftFirst + i;
        vec4 p0 = fetchTexel(uTriPosTex, triIdx * 3);
        vec4 p1 = fetchTexel(uTriPosTex, triIdx * 3 + 1);
        vec4 p2 = fetchTexel(uTriPosTex, triIdx * 3 + 2);

        float t, u, v;
        if (intersectTriangle(ro, rd, p0.xyz, p1.xyz, p2.xyz, maxT, t, u, v)) {
          int matIdx = clamp(int(p0.w + 0.5), 0, ${le-1});
          if (uClayMode == 1) {
            return vec3(0.0);
          }
          float trans = uMatB[matIdx].z;
          if (trans < 0.15) {
            return vec3(0.0);
          }
          // Glass lets tinted shadow light pass through (caustic approximation)
          vec3 tint = mix(vec3(0.85), uMatA[matIdx].rgb, 0.35);
          visibility *= tint * (0.45 + 0.45 * trans);
          if (max(visibility.r, max(visibility.g, visibility.b)) < 0.02) {
            return vec3(0.0);
          }
        }
      }
    } else {
      int leftChild = leftFirst;
      int rightChild = leftFirst + 1;
      if (stackPtr < 30) {
        stack[stackPtr++] = rightChild;
        stack[stackPtr++] = leftChild;
      }
    }
  }

  return visibility;
}

bool intersectStage(vec3 ro, vec3 rd, inout HitInfo hit) {
  bool anyHit = false;

  // Ground studio floor y = 0 (within 14m radius cyclorama)
  if (abs(rd.y) > 1e-5) {
    float tFloor = -ro.y / rd.y;
    if (tFloor > 0.0005 && tFloor < hit.t) {
      vec3 p = ro + rd * tFloor;
      float r2 = dot(p.xz, p.xz);
      if (r2 < 144.0) {
        hit.t = tFloor;
        hit.pos = p;
        hit.normal = vec3(0.0, 1.0, 0.0);
        hit.geomNormal = vec3(0.0, 1.0, 0.0);
        hit.matIdx = -1;
        hit.isFloor = true;

        if (uEnvMode == 3) {
          // Cornell box floor
          hit.floorAlbedo = vec3(0.55, 0.53, 0.50);
          hit.floorRoughness = 0.78;
        } else if (uEnvMode == 4) {
          // Obsidian dark floor
          hit.floorAlbedo = vec3(0.035, 0.038, 0.045);
          hit.floorRoughness = 0.28;
        } else {
          // Precision studio pedestal + subtle circular grid
          float dist = sqrt(r2);
          float ring = smoothstep(0.012, 0.0, abs(dist - 1.15)) * 0.06;
          float outerFade = smoothstep(5.5, 1.2, dist);
          vec3 centerCol = uEnvMode == 1 ? vec3(0.16, 0.14, 0.13) : vec3(0.11, 0.12, 0.14);
          vec3 edgeCol = vec3(0.05, 0.055, 0.065);
          hit.floorAlbedo = mix(edgeCol, centerCol, outerFade) + vec3(ring);
          hit.floorRoughness = mix(0.65, 0.34, outerFade);
        }
        anyHit = true;
      }
    }
  }

  // Cornell Box analytical enclosure (uEnvMode == 3)
  if (uEnvMode == 3) {
    float boxHalf = 2.6;
    float boxH = 3.2;

    // Back wall z = -boxHalf
    if (rd.z < -1e-5) {
      float t = (-boxHalf - ro.z) / rd.z;
      vec3 p = ro + rd * t;
      if (t > 0.0005 && t < hit.t && abs(p.x) < boxHalf && p.y > 0.0 && p.y < boxH) {
        hit.t = t; hit.pos = p; hit.normal = vec3(0.0, 0.0, 1.0); hit.geomNormal = hit.normal;
        hit.isFloor = true; hit.matIdx = -1;
        hit.floorAlbedo = vec3(0.58, 0.56, 0.54); hit.floorRoughness = 0.85;
        anyHit = true;
      }
    }
    // Left wall x = -boxHalf (muted terracotta red for classic GI color bleeding)
    if (rd.x < -1e-5) {
      float t = (-boxHalf - ro.x) / rd.x;
      vec3 p = ro + rd * t;
      if (t > 0.0005 && t < hit.t && abs(p.z) < boxHalf && p.y > 0.0 && p.y < boxH) {
        hit.t = t; hit.pos = p; hit.normal = vec3(1.0, 0.0, 0.0); hit.geomNormal = hit.normal;
        hit.isFloor = true; hit.matIdx = -1;
        hit.floorAlbedo = vec3(0.62, 0.22, 0.16); hit.floorRoughness = 0.85;
        anyHit = true;
      }
    }
    // Right wall x = +boxHalf (muted cobalt-teal for balanced GI color bleeding)
    if (rd.x > 1e-5) {
      float t = (boxHalf - ro.x) / rd.x;
      vec3 p = ro + rd * t;
      if (t > 0.0005 && t < hit.t && abs(p.z) < boxHalf && p.y > 0.0 && p.y < boxH) {
        hit.t = t; hit.pos = p; hit.normal = vec3(-1.0, 0.0, 0.0); hit.geomNormal = hit.normal;
        hit.isFloor = true; hit.matIdx = -1;
        hit.floorAlbedo = vec3(0.16, 0.38, 0.58); hit.floorRoughness = 0.85;
        anyHit = true;
      }
    }
    // Ceiling y = boxH
    if (rd.y > 1e-5) {
      float t = (boxH - ro.y) / rd.y;
      vec3 p = ro + rd * t;
      if (t > 0.0005 && t < hit.t && abs(p.x) < boxHalf && abs(p.z) < boxHalf) {
        hit.t = t; hit.pos = p; hit.normal = vec3(0.0, -1.0, 0.0); hit.geomNormal = hit.normal;
        hit.isFloor = true; hit.matIdx = -1;
        hit.floorAlbedo = vec3(0.62, 0.60, 0.58); hit.floorRoughness = 0.85;
        anyHit = true;
      }
    }
  }

  if (intersectBVH(ro, rd, hit)) {
    anyHit = true;
  }

  return anyHit;
}

vec3 sampleEnvironment(vec3 rd) {
  float y = clamp(rd.y, -1.0, 1.0);

  if (uEnvMode == 4) {
    // Obsidian void
    return vec3(0.012, 0.014, 0.018) * uEnvIntensity;
  }

  if (uEnvMode == 1) {
    // Golden hour sky + warm horizon sun disc
    vec3 skyTop = vec3(0.16, 0.28, 0.52);
    vec3 skyHorizon = vec3(0.95, 0.54, 0.26);
    vec3 groundCol = vec3(0.08, 0.06, 0.05);
    vec3 col = y > 0.0
      ? mix(skyHorizon, skyTop, pow(y, 0.55))
      : mix(skyHorizon * 0.35, groundCol, pow(-y, 0.5));
    vec3 sunDir = normalize(vec3(0.76, 0.24, 0.60));
    float sunAmt = max(0.0, dot(rd, sunDir));
    col += vec3(1.0, 0.72, 0.38) * (pow(sunAmt, 64.0) * 6.0 + pow(sunAmt, 8.0) * 0.45);
    return col * uEnvIntensity;
  }

  if (uEnvMode == 2) {
    // Architectural Loft (bright overhead skylight + soft side strips)
    vec3 base = mix(vec3(0.08, 0.09, 0.11), vec3(0.32, 0.36, 0.42), smoothstep(-0.2, 0.8, y));
    float skylight = smoothstep(0.55, 0.85, y) * smoothstep(0.6, 0.2, abs(rd.x));
    float stripL = smoothstep(0.7, 0.92, dot(rd, normalize(vec3(-0.8, 0.45, 0.35))));
    float stripR = smoothstep(0.75, 0.95, dot(rd, normalize(vec3(0.85, 0.35, 0.25))));
    return (base + vec3(2.8) * skylight + vec3(1.8, 1.75, 1.65) * stripL + vec3(1.5, 1.7, 2.0) * stripR) * uEnvIntensity;
  }

  if (uEnvMode == 3) {
    // Cornell ambient fallback
    return vec3(0.06, 0.06, 0.06) * uEnvIntensity;
  }

  // Default 0: Studio Cyclorama with calibrated warm/cool softbox panels
  vec3 bg = mix(vec3(0.035, 0.04, 0.048), vec3(0.11, 0.125, 0.15), smoothstep(-0.3, 0.7, y));
  float panelA = smoothstep(0.65, 0.88, dot(rd, normalize(vec3(0.55, 0.72, 0.42))));
  float panelB = smoothstep(0.65, 0.88, dot(rd, normalize(vec3(-0.72, 0.52, 0.38))));
  float topStrip = smoothstep(0.82, 0.96, y);
  bg += vec3(2.4, 2.25, 2.05) * panelA;
  bg += vec3(1.5, 1.75, 2.1) * panelB;
  bg += vec3(1.4, 1.45, 1.55) * topStrip;
  return bg * uEnvIntensity;
}

vec3 sampleCosineHemisphere(vec3 n, float r1, float r2) {
  float phi = 2.0 * PI * r1;
  float cosTheta = sqrt(1.0 - r2);
  float sinTheta = sqrt(r2);
  vec3 t, b;
  buildONB(n, t, b);
  return normalize(t * (cos(phi) * sinTheta) + b * (sin(phi) * sinTheta) + n * cosTheta);
}

vec3 sampleGGXHalf(vec3 n, float alpha, float r1, float r2) {
  float a2 = alpha * alpha;
  float phi = 2.0 * PI * r1;
  float cosTheta = sqrt((1.0 - r2) / (1.0 + (a2 - 1.0) * r2));
  float sinTheta = sqrt(max(0.0, 1.0 - cosTheta * cosTheta));
  vec3 t, b;
  buildONB(n, t, b);
  return normalize(t * (cos(phi) * sinTheta) + b * (sin(phi) * sinTheta) + n * cosTheta);
}

vec3 fresnelSchlick(float cosTheta, vec3 F0) {
  return F0 + (1.0 - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

float distributionGGX(float NdotH, float alpha) {
  float a2 = alpha * alpha;
  float d = (NdotH * NdotH) * (a2 - 1.0) + 1.0;
  return a2 / max(PI * d * d, 1e-6);
}

float geometrySmith(float NdotV, float NdotL, float alpha) {
  float k = (alpha + 1.0);
  k = (k * k) / 8.0;
  float gV = NdotV / (NdotV * (1.0 - k) + k);
  float gL = NdotL / (NdotL * (1.0 - k) + k);
  return gV * gL;
}

vec3 evalDirectBRDF(
  vec3 N,
  vec3 V,
  vec3 L,
  vec3 albedo,
  float roughness,
  float metalness,
  float clearcoat
) {
  float NdotL = max(dot(N, L), 0.0);
  float NdotV = max(dot(N, V), 1e-4);
  if (NdotL <= 0.0) return vec3(0.0);

  vec3 H = normalize(V + L);
  float NdotH = max(dot(N, H), 0.0);
  float HdotV = max(dot(H, V), 0.0);

  float alpha = max(0.035, roughness * roughness);
  vec3 F0 = mix(vec3(0.04), albedo, metalness);
  vec3 F = fresnelSchlick(HdotV, F0);
  float D = distributionGGX(NdotH, alpha);
  float G = geometrySmith(NdotV, NdotL, alpha);

  vec3 specular = (D * G * F) / max(4.0 * NdotV * NdotL, 1e-4);
  vec3 kD = (vec3(1.0) - F) * (1.0 - metalness);
  vec3 diffuse = kD * albedo / PI;

  vec3 result = (diffuse + specular) * NdotL;

  if (clearcoat > 0.05) {
    float ccAlpha = 0.05;
    float ccD = distributionGGX(NdotH, ccAlpha);
    float ccG = geometrySmith(NdotV, NdotL, ccAlpha);
    float ccF = fresnelSchlick(HdotV, vec3(0.04)).r;
    result += vec3((ccD * ccG * ccF) / max(4.0 * NdotV * NdotL, 1e-4)) * clearcoat * NdotL;
  }

  return result;
}

vec3 randomSpherePoint(float r1, float r2) {
  float z = 1.0 - 2.0 * r1;
  float r = sqrt(max(0.0, 1.0 - z * z));
  float phi = 2.0 * PI * r2;
  return vec3(r * cos(phi), r * sin(phi), z);
}

void main() {
  ivec2 px = ivec2(gl_FragCoord.xy);
  rngState = pcgHash(uint(px.x) * 1973u + uint(px.y) * 9277u + uint(uSampleIndex + 1) * 26699u);

  // Jittered camera ray for anti-aliasing
  vec2 jitter = vec2(rand() - 0.5, rand() - 0.5) / uResolution;
  vec2 ndc = (vUv + jitter) * 2.0 - 1.0;

  vec3 ro = uCamPos;
  vec3 rd = normalize(
    uCamForward +
    uCamRight * (ndc.x * uTanHalfFov * uAspect) +
    uCamUp * (ndc.y * uTanHalfFov)
  );

  vec3 radiance = vec3(0.0);
  vec3 throughput = vec3(1.0);

  for (int bounce = 0; bounce < 8; bounce++) {
    if (bounce >= uMaxBounces) break;

    HitInfo hit;
    hit.t = INF;
    hit.uv = vec2(0.0);
    hit.tangent = vec3(1.0, 0.0, 0.0);
    hit.bitangent = vec3(0.0, 1.0, 0.0);
    if (!intersectStage(ro, rd, hit)) {
      radiance += throughput * sampleEnvironment(rd);
      break;
    }

    bool entering = dot(rd, hit.geomNormal) < 0.0;
    vec3 N = entering ? hit.normal : -hit.normal;
    vec3 Ng = entering ? hit.geomNormal : -hit.geomNormal;
    if (dot(N, rd) > 0.0) N = -N;
    vec3 V = -rd;

    vec3 albedo;
    float roughness;
    float metalness;
    float ior = 1.5;
    float transmission = 0.0;
    float clearcoat = 0.0;
    float emissiveIntensity = 0.0;

    if (hit.isFloor) {
      albedo = hit.floorAlbedo;
      roughness = hit.floorRoughness;
      metalness = 0.0;
    } else if (uClayMode == 1) {
      int safeClayIdx = clamp(hit.matIdx, 0, ${le-1});
      albedo = vec3(0.76, 0.73, 0.69);
      roughness = 0.68;
      metalness = 0.0;
      emissiveIntensity = uMatC[safeClayIdx].x;
    } else {
      int safeMatIdx = clamp(hit.matIdx, 0, ${le-1});
      vec4 mA = uMatA[safeMatIdx];
      vec4 mB = uMatB[safeMatIdx];
      vec4 mC = uMatC[safeMatIdx];
      vec4 mD = uMatD[safeMatIdx];
      albedo = mA.rgb;
      roughness = clamp(mA.a, 0.025, 1.0);
      metalness = clamp(mB.x, 0.0, 1.0);
      ior = clamp(mB.y, 1.05, 2.4);
      transmission = clamp(mB.z, 0.0, 1.0);
      clearcoat = clamp(mB.w, 0.0, 1.0);
      emissiveIntensity = mC.x;

      if (mD.w > 0.5 || mD.x > 0.5) {
        vec2 tiledUv = hit.uv * mD.y;
        if (mD.w > 1.5 && abs(mD.y - 1.0) < 0.02) {
          tiledUv = clamp(tiledUv, vec2(0.5 / 1024.0), vec2(1.0 - 0.5 / 1024.0));
        }
        vec3 texCoords = vec3(tiledUv, mD.x);
        vec3 texAlbedo = mD.w > 0.5
          ? pow(texture(uCustomAlbedoArray, texCoords).rgb, vec3(2.2))
          : pow(texture(uAlbedoArray, texCoords).rgb, vec3(2.2));
        vec4 rm = mD.w > 0.5
          ? texture(uCustomRoughMetalArray, texCoords)
          : texture(uRoughMetalArray, texCoords);
        albedo *= texAlbedo;
        roughness = clamp(roughness * rm.g, 0.025, 1.0);
        if (mC.y > 0.5) metalness = clamp(metalness * rm.b, 0.0, 1.0);

        if (mD.z > 0.01) {
          vec3 nSample = mD.w > 0.5
            ? texture(uCustomNormalArray, texCoords).xyz
            : texture(uNormalArray, texCoords).xyz;
          vec3 nMap = nSample * 2.0 - 1.0;
          nMap.xy *= mD.z;
          vec3 T = hit.tangent - N * dot(N, hit.tangent);
          float tLen2 = dot(T, T);
          vec3 B;
          if (tLen2 > 1e-6) {
            T *= inversesqrt(tLen2);
            B = hit.bitangent - N * dot(N, hit.bitangent) - T * dot(T, hit.bitangent);
            float bLen2 = dot(B, B);
            B = bLen2 > 1e-6 ? B * inversesqrt(bLen2) : cross(N, T);
          } else {
            buildONB(N, T, B);
          }
          vec3 perturbedN = normalize(T * nMap.x + B * nMap.y + N * max(0.08, nMap.z));
          if (dot(perturbedN, V) < 0.02) {
            perturbedN = normalize(mix(N, perturbedN, 0.25));
          }
          if (dot(perturbedN, V) >= 0.01) {
            N = perturbedN;
          }
        }
      }
    }

    if (emissiveIntensity > 0.01) {
      radiance += throughput * albedo * emissiveIntensity;
      break;
    }

    // Dielectric glass / crystal refraction
    if (transmission > 0.15) {
      float eta = entering ? (1.0 / ior) : ior;
      float cosI = clamp(dot(V, N), 0.0, 1.0);
      float sinT2 = eta * eta * (1.0 - cosI * cosI);
      float F0g = pow((1.0 - ior) / (1.0 + ior), 2.0);
      float fresnel = F0g + (1.0 - F0g) * pow(1.0 - cosI, 5.0);

      // Direct specular highlight from studio lights on glass surface
      for (int li = 0; li < ${Ie}; li++) {
        vec4 colEn = uLightColorEnabled[li];
        if (colEn.w < 0.5) continue;
        vec4 posRad = uLightPosRadius[li];
        vec3 lightPos = posRad.xyz + randomSpherePoint(rand(), rand()) * posRad.w;
        vec3 L = lightPos - hit.pos;
        float dist = length(L);
        L /= max(dist, 1e-4);
        float NdotL = max(dot(N, L), 0.0);
        if (NdotL > 0.0) {
          vec3 vis = intersectShadow(hit.pos + Ng * 0.001, L, dist);
          if (max(vis.r, max(vis.g, vis.b)) > 0.01) {
            vec3 H = normalize(V + L);
            float spec = pow(max(dot(N, H), 0.0), mix(180.0, 24.0, roughness));
            float atten = 1.0 / (dist * dist * 0.35 + 1.0);
            radiance += throughput * vis * colEn.rgb * spec * atten * 0.45;
          }
        }
      }

      if (sinT2 > 1.0 || rand() < fresnel) {
        vec3 reflDir = reflect(rd, N);
        if (roughness > 0.04) {
          reflDir = normalize(mix(reflDir, sampleGGXHalf(N, roughness * roughness, rand(), rand()), 0.35));
        }
        ro = hit.pos + Ng * 0.001;
        rd = reflDir;
      } else {
        vec3 refrDir = refract(rd, N, eta);
        if (roughness > 0.04) {
          refrDir = normalize(refrDir + randomSpherePoint(rand(), rand()) * (roughness * 0.25));
        }
        if (!entering) {
          vec3 absorb = exp(-(vec3(1.0) - albedo) * hit.t * 1.4);
          throughput *= absorb;
        } else {
          throughput *= mix(vec3(1.0), albedo, 0.22);
        }
        ro = hit.pos - Ng * 0.0012;
        rd = refrDir;
      }
      continue;
    }

    // Next Event Estimation (Direct Studio Lighting with Soft Area Shadows)
    for (int li = 0; li < ${Ie}; li++) {
      vec4 colEn = uLightColorEnabled[li];
      if (colEn.w < 0.5) continue;

      vec4 posRad = uLightPosRadius[li];
      vec3 lightSample = posRad.xyz + randomSpherePoint(rand(), rand()) * posRad.w;
      vec3 L = lightSample - hit.pos;
      float dist = length(L);
      L /= max(dist, 1e-4);

      float NdotL = dot(N, L);
      if (NdotL > 0.0) {
        vec3 shadowVis = intersectShadow(hit.pos + Ng * 0.001, L, dist);
        if (max(shadowVis.r, max(shadowVis.g, shadowVis.b)) > 0.005) {
          vec3 brdf = evalDirectBRDF(N, V, L, albedo, roughness, metalness, clearcoat);
          float atten = 1.0 / (dist * dist * 0.32 + 1.0);
          radiance += throughput * shadowVis * colEn.rgb * brdf * atten;
        }
      }
    }

    // Indirect Bounce Selection (Specular / Clearcoat vs Diffuse)
    float specProb = mix(0.18 + 0.5 * clearcoat, 0.96, metalness);
    if (roughness < 0.2 && metalness < 0.2) {
      specProb = max(specProb, 0.35);
    }

    if (rand() < specProb) {
      float alpha = max(0.03, roughness * roughness);
      if (clearcoat > 0.4 && rand() < 0.45) {
        alpha = 0.05;
      }
      vec3 H = sampleGGXHalf(N, alpha, rand(), rand());
      vec3 L = reflect(-V, H);
      if (dot(N, L) <= 0.0) break;

      float NdotV = max(dot(N, V), 1e-4);
      float NdotL = max(dot(N, L), 1e-4);
      float NdotH = max(dot(N, H), 1e-4);
      float VdotH = max(dot(V, H), 1e-4);

      vec3 F0 = mix(vec3(0.04), albedo, metalness);
      vec3 F = fresnelSchlick(VdotH, F0);
      float G = geometrySmith(NdotV, NdotL, alpha);

      vec3 weight = (F * G * VdotH) / max(NdotH * NdotV * specProb, 1e-4);
      throughput *= min(weight, vec3(3.5)); // Clamp fireflies
      rd = L;
    } else {
      vec3 L = sampleCosineHemisphere(N, rand(), rand());
      vec3 kD = albedo * (1.0 - metalness);
      throughput *= kD / max(1.0 - specProb, 0.05);
      rd = L;
    }

    ro = hit.pos + Ng * 0.001;

    // Russian roulette termination after bounce 2
    if (bounce >= 2) {
      float p = clamp(max(throughput.r, max(throughput.g, throughput.b)), 0.05, 0.95);
      if (rand() > p) break;
      throughput /= p;
    }
  }

  // Guard against NaN/Inf and suppress extreme fireflies for 1-spp stability
  if (any(isnan(radiance)) || any(isinf(radiance))) {
    radiance = vec3(0.0);
  }
  float lum = dot(radiance, vec3(0.2126, 0.7152, 0.0722));
  if (lum > 14.0) {
    radiance *= 14.0 / lum;
  }

  vec3 accumulated = uSampleIndex == 0
    ? radiance
    : mix(texture(uPrevFrame, vUv).rgb, radiance, 1.0 / float(uSampleIndex + 1));

  fragColor = vec4(accumulated, 1.0);
}
`,wt=`precision highp float;
precision highp int;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uAccumTex;
uniform vec2 uResolution;
uniform float uExposure;
uniform int uDenoiser;
uniform int uSampleCount;

vec3 acesFilm(vec3 x) {
  float a = 2.51;
  float b = 0.03;
  float c = 2.43;
  float d = 0.59;
  float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

void main() {
  vec2 texel = 1.0 / uResolution;
  vec3 center = texture(uAccumTex, vUv).rgb;
  vec3 col = center;

  if (uDenoiser == 1 && uSampleCount < 64) {
    // Fast joint-bilateral edge-preserving denoiser (fades out cleanly as spp grows)
    float strength = mix(1.0, 0.15, clamp(float(uSampleCount) / 48.0, 0.0, 1.0));
    float centerLum = dot(center, vec3(0.299, 0.587, 0.114));
    vec3 sum = center;
    float weightSum = 1.0;

    for (int dx = -2; dx <= 2; dx++) {
      for (int dy = -2; dy <= 2; dy++) {
        if (dx == 0 && dy == 0) continue;
        vec3 s = texture(uAccumTex, vUv + vec2(float(dx), float(dy)) * texel).rgb;
        float sLum = dot(s, vec3(0.299, 0.587, 0.114));
        float colorDist = length(s - center) / max(0.15, centerLum + 0.15);
        float spatialW = exp(-float(dx * dx + dy * dy) * 0.28);
        float rangeW = exp(-colorDist * colorDist * (3.2 / max(0.25, strength)));
        float w = spatialW * rangeW;
        sum += s * w;
        weightSum += w;
      }
    }
    col = mix(center, sum / weightSum, strength);
  }

  col *= uExposure;
  col = acesFilm(col);
  col = pow(col, vec3(1.0 / 2.2));
  fragColor = vec4(col, 1.0);
}
`,It={studio:0,golden:1,loft:2,cornell:3,obsidian:4},De=class{constructor(e){S(this,"renderer");S(this,"quadScene");S(this,"quadCamera");S(this,"quadMesh");S(this,"traceMat");S(this,"displayMat");S(this,"rtA");S(this,"rtB");S(this,"pingPong",0);S(this,"sampleIndex",0);S(this,"width",640);S(this,"height",480);S(this,"targetType");S(this,"bvhData",null);S(this,"dummyTex");S(this,"dummyArrayTex");S(this,"camPos",new H.Vector3);S(this,"camRight",new H.Vector3);S(this,"camUp",new H.Vector3);S(this,"camForward",new H.Vector3);this.renderer=e;let t=e.getContext(),r=!!t.getExtension("EXT_color_buffer_float"),o=!!t.getExtension("EXT_color_buffer_half_float");this.targetType=r?H.FloatType:o?H.HalfFloatType:H.UnsignedByteType,this.rtA=this.createTarget(this.width,this.height),this.rtB=this.createTarget(this.width,this.height);let a=Array.from({length:Ie},()=>new H.Vector4),i=Array.from({length:Ie},()=>new H.Vector4),h=Array.from({length:le},()=>new H.Vector4(.8,.8,.8,.4)),c=Array.from({length:le},()=>new H.Vector4(0,1.5,0,0)),u=Array.from({length:le},()=>new H.Vector4(0,0,0,0)),l=Array.from({length:le},()=>new H.Vector4(0,1,1,0));this.dummyTex=new H.DataTexture(new Float32Array(4),1,1,H.RGBAFormat,H.FloatType),this.dummyTex.needsUpdate=!0,this.dummyArrayTex=new H.DataArrayTexture(new Uint8Array([255,255,255,255]),1,1,1),this.dummyArrayTex.format=H.RGBAFormat,this.dummyArrayTex.type=H.UnsignedByteType,this.dummyArrayTex.minFilter=H.LinearFilter,this.dummyArrayTex.magFilter=H.LinearFilter,this.dummyArrayTex.needsUpdate=!0,this.traceMat=new H.RawShaderMaterial({glslVersion:H.GLSL3,vertexShader:ct,fragmentShader:Bt,depthTest:!1,depthWrite:!1,uniforms:{uPrevFrame:{value:this.rtA.texture},uBvhTex:{value:this.dummyTex},uTriPosTex:{value:this.dummyTex},uTriNormTex:{value:this.dummyTex},uTriUvTex:{value:this.dummyTex},uAlbedoArray:{value:this.dummyArrayTex},uNormalArray:{value:this.dummyArrayTex},uRoughMetalArray:{value:this.dummyArrayTex},uCustomAlbedoArray:{value:this.dummyArrayTex},uCustomNormalArray:{value:this.dummyArrayTex},uCustomRoughMetalArray:{value:this.dummyArrayTex},uTexWidth:{value:1024},uSampleIndex:{value:0},uMaxBounces:{value:4},uClayMode:{value:0},uEnvMode:{value:0},uEnvIntensity:{value:.85},uResolution:{value:new H.Vector2(this.width,this.height)},uCamPos:{value:new H.Vector3},uCamRight:{value:new H.Vector3(1,0,0)},uCamUp:{value:new H.Vector3(0,1,0)},uCamForward:{value:new H.Vector3(0,0,-1)},uTanHalfFov:{value:.35},uAspect:{value:1.33},uLightPosRadius:{value:a},uLightColorEnabled:{value:i},uMatA:{value:h},uMatB:{value:c},uMatC:{value:u},uMatD:{value:l}}}),this.displayMat=new H.RawShaderMaterial({glslVersion:H.GLSL3,vertexShader:ct,fragmentShader:wt,depthTest:!1,depthWrite:!1,uniforms:{uAccumTex:{value:this.rtB.texture},uResolution:{value:new H.Vector2(this.width,this.height)},uExposure:{value:1.08},uDenoiser:{value:1},uSampleCount:{value:1}}});let f=new H.PlaneGeometry(2,2);this.quadMesh=new H.Mesh(f,this.traceMat),this.quadMesh.frustumCulled=!1,this.quadScene=new H.Scene,this.quadScene.add(this.quadMesh),this.quadCamera=new H.OrthographicCamera(-1,1,1,-1,0,1)}createTarget(e,t){return new H.WebGLRenderTarget(e,t,{minFilter:H.NearestFilter,magFilter:H.NearestFilter,format:H.RGBAFormat,type:this.targetType,depthBuffer:!1,stencilBuffer:!1})}setTextureArrays(e){this.traceMat.uniforms.uAlbedoArray.value=e.albedoArray,this.traceMat.uniforms.uNormalArray.value=e.normalArray,this.traceMat.uniforms.uRoughMetalArray.value=e.roughMetalArray,this.traceMat.uniforms.uCustomAlbedoArray.value=e.customAlbedoArray,this.traceMat.uniforms.uCustomNormalArray.value=e.customNormalArray,this.traceMat.uniforms.uCustomRoughMetalArray.value=e.customRoughMetalArray,this.resetAccumulation()}setBVH(e){this.bvhData&&(this.bvhData.bvhTexture.dispose(),this.bvhData.triPosTexture.dispose(),this.bvhData.triNormTexture.dispose(),this.bvhData.triUvTexture.dispose()),this.bvhData=e,this.traceMat.uniforms.uBvhTex.value=e.bvhTexture,this.traceMat.uniforms.uTriPosTex.value=e.triPosTexture,this.traceMat.uniforms.uTriNormTex.value=e.triNormTexture,this.traceMat.uniforms.uTriUvTex.value=e.triUvTexture,this.traceMat.uniforms.uTexWidth.value=e.texWidth,this.resetAccumulation()}resize(e,t){let r=Math.max(64,Math.floor(e)),o=Math.max(64,Math.floor(t));r===this.width&&o===this.height||(this.width=r,this.height=o,this.rtA.setSize(r,o),this.rtB.setSize(r,o),this.traceMat.uniforms.uResolution.value.set(r,o),this.displayMat.uniforms.uResolution.value.set(r,o),this.resetAccumulation())}resetAccumulation(){this.sampleIndex=0}getSamples(){return this.sampleIndex}getResolution(){return[this.width,this.height]}syncLights(e){let t=this.traceMat.uniforms.uLightPosRadius.value,r=this.traceMat.uniforms.uLightColorEnabled.value;for(let o=0;o<Ie;o++){let a=e[o];if(!a){r[o].set(0,0,0,0);continue}let[i,h,c]=lt(a.azimuth,a.elevation,a.distance);t[o].set(i,h,c,a.radius);let u=1,l=1,f=1;if(a.useKelvin){let[d,v,E]=it(a.kelvin);u=Math.pow(d,2.2),l=Math.pow(v,2.2),f=Math.pow(E,2.2)}else[u,l,f]=Ke(a.color);let p=a.intensity*.48;r[o].set(u*p,l*p,f*p,a.enabled?1:0)}}syncMaterials(e,t,r){if(!this.bvhData)return;let o=this.traceMat.uniforms.uMatA.value,a=this.traceMat.uniforms.uMatB.value,i=this.traceMat.uniforms.uMatC.value,h=this.traceMat.uniforms.uMatD.value;for(let c of e){let u=this.bvhData.materialIdToIndex.get(c.id);if(u===void 0||u>=le)continue;let[l,f,p]=Ke(c.color),d=t?.get(c.id)??Le[c.texturePreset]??0,{slice:v,modeFlag:E}=r?r.getLayerShaderInfo(d):{slice:d>=100?d-100:d,modeFlag:d>=100?1:0};o[u].set(l,f,p,c.roughness),a[u].set(c.metalness,c.ior,c.transmission,c.clearcoat),i[u].set(c.emissiveIntensity,0,0,0),i[u].y=c.hasCustomMetalness?1:0,h[u].set(v,c.uvScale,c.normalStrength,E)}}traceSample(e,t,r,o,a,i,h){this.syncLights(t),this.syncMaterials(r,i,h),e.updateMatrixWorld(),this.camPos.copy(e.position),e.matrixWorld.extractBasis(this.camRight,this.camUp,this.camForward),this.camForward.negate();let c=Math.tan(H.MathUtils.degToRad(e.fov*.5)),u=this.traceMat.uniforms;u.uCamPos.value.copy(this.camPos),u.uCamRight.value.copy(this.camRight),u.uCamUp.value.copy(this.camUp),u.uCamForward.value.copy(this.camForward),u.uTanHalfFov.value=c,u.uAspect.value=e.aspect,u.uSampleIndex.value=this.sampleIndex,u.uMaxBounces.value=a?Math.min(2,o.maxBounces):o.maxBounces,u.uClayMode.value=o.clayMode?1:0,u.uEnvMode.value=It[o.environment],u.uEnvIntensity.value=o.envIntensity;let l=this.pingPong===0?this.rtA:this.rtB,f=this.pingPong===0?this.rtB:this.rtA;u.uPrevFrame.value=l.texture,this.quadMesh.material=this.traceMat;let p=this.renderer.getRenderTarget(),d=this.renderer.autoClear;this.renderer.autoClear=!1,this.renderer.setRenderTarget(f),this.renderer.render(this.quadScene,this.quadCamera),this.renderer.setRenderTarget(p),this.renderer.autoClear=d,this.pingPong=1-this.pingPong,this.sampleIndex++}displayToScreen(e,t){let r=this.pingPong===0?this.rtA:this.rtB;this.displayMat.uniforms.uAccumTex.value=r.texture,this.displayMat.uniforms.uExposure.value=e.exposure,this.displayMat.uniforms.uDenoiser.value=e.denoiser?1:0,this.displayMat.uniforms.uSampleCount.value=Math.max(1,this.sampleIndex),this.quadMesh.material=this.displayMat;let o=this.renderer.autoClear;this.renderer.autoClear=!1,this.renderer.setRenderTarget(null),t?(this.renderer.setScissorTest(!0),this.renderer.setScissor(t.x,t.y,t.w,t.h),this.renderer.render(this.quadScene,this.quadCamera),this.renderer.setScissorTest(!1)):this.renderer.render(this.quadScene,this.quadCamera),this.renderer.autoClear=o}dispose(){this.rtA.dispose(),this.rtB.dispose(),this.traceMat.dispose(),this.displayMat.dispose(),this.quadMesh.geometry.dispose(),this.dummyTex.dispose(),this.dummyArrayTex.dispose(),this.bvhData&&(this.bvhData.bvhTexture.dispose(),this.bvhData.triPosTexture.dispose(),this.bvhData.triNormTexture.dispose(),this.bvhData.triUvTexture.dispose())}};var q=[{id:"key",name:"Key Softbox",role:"key",enabled:!0,useKelvin:!0,kelvin:5200,color:"#fff4e6",intensity:24,azimuth:42,elevation:46,distance:4.4,radius:.65},{id:"fill",name:"Cool Fill",role:"fill",enabled:!0,useKelvin:!0,kelvin:7600,color:"#d8e8ff",intensity:10,azimuth:-58,elevation:28,distance:4.8,radius:1.1},{id:"rim",name:"Edge Rim",role:"rim",enabled:!0,useKelvin:!0,kelvin:3600,color:"#ffd19c",intensity:18,azimuth:-145,elevation:36,distance:4.2,radius:.35},{id:"accent",name:"Overhead Bounce",role:"accent",enabled:!1,useKelvin:!0,kelvin:6200,color:"#eef5ff",intensity:12,azimuth:10,elevation:78,distance:4.5,radius:1.2}],ut=[{id:"three-point",name:"Three-Point Studio",environment:"studio",envIntensity:.85,lights:q},{id:"golden-hour",name:"Golden Hour",environment:"golden",envIntensity:1.15,lights:[{...q[0],kelvin:3100,intensity:30,azimuth:64,elevation:18,radius:.45},{...q[1],kelvin:8200,intensity:8,azimuth:-100,elevation:42,radius:1.3},{...q[2],kelvin:2600,intensity:22,azimuth:-135,elevation:24,radius:.3},{...q[3],enabled:!1}]},{id:"chiaroscuro",name:"Chiaroscuro",environment:"obsidian",envIntensity:.15,lights:[{...q[0],kelvin:4800,intensity:34,azimuth:52,elevation:38,radius:.22},{...q[1],enabled:!1,intensity:4},{...q[2],kelvin:5800,intensity:26,azimuth:-152,elevation:40,radius:.18},{...q[3],enabled:!1}]},{id:"product-softbox",name:"Product Softbox",environment:"loft",envIntensity:1,lights:[{...q[0],kelvin:5600,intensity:22,azimuth:32,elevation:58,radius:1.25},{...q[1],kelvin:5600,intensity:14,azimuth:-42,elevation:48,radius:1.25},{...q[2],kelvin:6500,intensity:16,azimuth:170,elevation:52,radius:.8},{...q[3],enabled:!0,kelvin:5800,intensity:14,azimuth:0,elevation:82,radius:1.4}]},{id:"cornell-gi",name:"Cornell Bounce",environment:"cornell",envIntensity:.9,lights:[{...q[0],kelvin:5e3,intensity:24,azimuth:15,elevation:74,distance:3.6,radius:.8},{...q[1],kelvin:6e3,intensity:6,azimuth:-60,elevation:30,radius:1},{...q[2],enabled:!1},{...q[3],enabled:!1}]}],mt=[{id:"brushed-titanium",name:"Brushed Titanium",color:"#b4bac2",roughness:.24,metalness:.96,ior:1.5,transmission:0,clearcoat:.15,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:2,normalStrength:1},{id:"polished-chrome",name:"Mirror Chrome",color:"#eef1f5",roughness:.04,metalness:1,ior:1.5,transmission:0,clearcoat:.2,emissiveIntensity:0,texturePreset:"none",uvScale:1.5,normalStrength:1},{id:"anodized-gold",name:"Satin Brass",color:"#d6a456",roughness:.22,metalness:.94,ior:1.5,transmission:0,clearcoat:.2,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:2,normalStrength:.8},{id:"optical-crystal",name:"Optical Glass",color:"#eef8ff",roughness:.03,metalness:0,ior:1.54,transmission:.96,clearcoat:1,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"smoked-acrylic",name:"Smoked Quartz",color:"#6b7b8c",roughness:.12,metalness:0,ior:1.49,transmission:.82,clearcoat:.9,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"matte-ceramic",name:"Honed Travertine",color:"#d6cfc4",roughness:.72,metalness:0,ior:1.45,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"travertine",uvScale:2,normalStrength:1},{id:"car-lacquer",name:"Carbon Lacquer",color:"#1b1f26",roughness:.24,metalness:.15,ior:1.5,transmission:0,clearcoat:1,emissiveIntensity:0,texturePreset:"carbon-weave",uvScale:2,normalStrength:1},{id:"warm-emissive",name:"Filament Glow",color:"#ffbe6b",roughness:.2,metalness:0,ior:1.45,transmission:0,clearcoat:0,emissiveIntensity:3.5,texturePreset:"none",uvScale:1,normalStrength:0}],ht={maxBounces:4,maxSamples:128,exposure:1.08,denoiser:!0,interactiveScale:.5,clayMode:!1,showLightGizmos:!0,environment:"studio",envIntensity:.85};function dt(n){try{let e=n.getContext(),t=e.getExtension("WEBGL_debug_renderer_info"),r=t?t.UNMASKED_RENDERER_WEBGL:e.RENDERER;return/SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(String(e.getParameter(r)))}catch{return!0}}function ft(n){n&&n.group.traverse(e=>{e.geometry?.dispose?.();for(let t of Array.isArray(e.material)?e.material:[e.material])t?.dispose?.()})}async function lr(n,e){let t=new Ve(n.capabilities.getMaxAnisotropy()),r=new Map,o=null,a=null;try{let p=function(){return{settings:{...c},lights:u.map(m=>({...m})),materials:f.materials.map(m=>({...m})),samples:a?.getSamples()??0,resolution:a?.getResolution()??[0,0]}},d=function(m){for(let s=0;s<u.length;s++)m[s]&&Object.assign(u[s],m[s]);a?.resetAccumulation()},v=function(m,s){let y=f.materials.find(I=>I.id===m);if(!y)return;let g={};for(let I of["color","roughness","metalness","ior","transmission","clearcoat","emissiveIntensity","texturePreset","uvScale","normalStrength"])s[I]!==void 0&&Object.assign(g,{[I]:s[I]});let x=!!(y.hasCustomAlbedo||y.hasCustomNormal||y.hasCustomRoughness||y.hasCustomMetalness);x&&delete g.texturePreset,Object.assign(y,g),!x&&g.texturePreset&&r.set(m,Le[g.texturePreset]),a?.resetAccumulation()},E=function(m,s){let y=f.materials.find(x=>x.id===m),g=mt.find(x=>x.id===s);!y||!g||v(m,{...g})},M=function(m){Object.assign(c,m),a?.resetAccumulation()},T=function(m){let s=ut.find(y=>y.id===m);s&&(d(s.lights.map(y=>({...y}))),M({environment:s.environment,envIntensity:s.envIntensity}))},R=function(m){M(m.settings),d(m.lights);for(let s of f.materials){let y=m.materials.find(g=>g.id===s.id);y&&v(s.id,y)}},b=function(){a?.dispose(),a=null,t.dispose(),ft(f)},i=new File([e],"BoxLab_Current.glb",{type:"model/gltf-binary"});o=await st(i,dt(n),t,r);let h=Je(o.group);a=new De(n),a.setTextureArrays(t),a.setBVH(h);let c={...ht},u=q.map(m=>({...m})),l={scale:o.rayTransform.scale,offset:o.rayTransform.offset.clone()},f=o;return{transform:l,getState:p,updateLights:d,updateMaterial:v,applyMaterialPreset:E,updateSettings:M,applyLightingRig:T,applyPreferences:R,render(m,s=!1){if(!a)return 0;let y=s?1:c.maxSamples;return a.getSamples()<y&&a.traceSample(m,u,f.materials,c,s,r,t),a.displayToScreen(c),a.getSamples()},resize(m,s,y=!1){let g=dt(n)?1:Math.min(window.devicePixelRatio||1,1.5),x=y?c.interactiveScale:1;a?.resize(Math.floor(m*g*x),Math.floor(s*g*x))},reset(){a?.resetAccumulation()},dispose:b}}catch(i){throw a?.dispose(),t.dispose(),ft(o),i}}export{lr as createBoxLabHeliosTrace};
