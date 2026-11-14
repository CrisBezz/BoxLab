/* HeliosStudio integration bundle; source commit 44a7565e24ee96ea7907716dc67b1b97a810a63d. Rebuild with npm run build:helios-tracer. */
var gt=Object.defineProperty;var bt=(o,e,t)=>e in o?gt(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var L=(o,e,t)=>bt(o,typeof e!="symbol"?e+"":e,t);import*as k from"three";var O=1024,Tt=24;function He(o,e,t){let r=new k.DataTexture(o,e,t,k.RGBAFormat,k.FloatType);return r.minFilter=k.NearestFilter,r.magFilter=k.NearestFilter,r.generateMipmaps=!1,r.wrapS=k.ClampToEdgeWrapping,r.wrapT=k.ClampToEdgeWrapping,r.needsUpdate=!0,r}function Qe(o){o.updateMatrixWorld(!0);let e=[],t=new Map,r=new k.Vector3,a=new k.Vector3,n=new k.Vector3,c=new k.Vector3,d=new k.Vector3,i=new k.Vector3,m=new k.Vector3,l=new k.Vector3,y=new k.Vector3,v=new k.Matrix3;if(o.traverse(U=>{let S=U;if(!S.isMesh||!S.geometry||!S.visible||S.userData.excludeFromRaytracer)return;let A=S.geometry,F=A.getAttribute("position");if(!F)return;let _=A.getAttribute("normal"),Q=A.getAttribute("uv"),j=A.getIndex(),se=String(S.userData.materialId||"default"),ne=t.get(se);ne===void 0&&(ne=Math.min(t.size,Tt-1),t.set(se,ne));let me=S.matrixWorld;v.getNormalMatrix(me);let Y=Math.floor(j?j.count/3:F.count/3);for(let ie=0;ie<Y;ie++){let he=j?j.getX(ie*3):ie*3,Me=j?j.getX(ie*3+1):ie*3+1,Ee=j?j.getX(ie*3+2):ie*3+2;if(r.fromBufferAttribute(F,he).applyMatrix4(me),a.fromBufferAttribute(F,Me).applyMatrix4(me),n.fromBufferAttribute(F,Ee).applyMatrix4(me),m.subVectors(a,r),l.subVectors(n,r),y.crossVectors(m,l),y.lengthSq()<1e-12)continue;_?(c.fromBufferAttribute(_,he).applyMatrix3(v).normalize(),d.fromBufferAttribute(_,Me).applyMatrix3(v).normalize(),i.fromBufferAttribute(_,Ee).applyMatrix3(v).normalize()):(y.normalize(),c.copy(y),d.copy(y),i.copy(y));let Re=0,W=0,ee=0,re=0,de=0,fe=0;if(Q)Re=Q.getX(he),W=Q.getY(he),ee=Q.getX(Me),re=Q.getY(Me),de=Q.getX(Ee),fe=Q.getY(Ee);else{let ve=Math.abs(y.x),xe=Math.abs(y.y),pe=Math.abs(y.z);if(xe>=ve&&xe>=pe){let q=y.y>=0?-1:1;Re=r.x,W=r.z*q,ee=a.x,re=a.z*q,de=n.x,fe=n.z*q}else if(ve>=xe&&ve>=pe){let q=y.x>=0?-1:1;Re=r.z*q,W=r.y,ee=a.z*q,re=a.y,de=n.z*q,fe=n.y}else{let q=y.z>=0?1:-1;Re=r.x*q,W=r.y,ee=a.x*q,re=a.y,de=n.x*q,fe=n.y}}e.push({v0x:r.x,v0y:r.y,v0z:r.z,v1x:a.x,v1y:a.y,v1z:a.z,v2x:n.x,v2y:n.y,v2z:n.z,n0x:c.x,n0y:c.y,n0z:c.z,n1x:d.x,n1y:d.y,n1z:d.z,n2x:i.x,n2y:i.y,n2z:i.z,u0:Re,v0:W,u1:ee,v1:re,u2:de,v2:fe,cx:(r.x+a.x+n.x)/3,cy:(r.y+a.y+n.y)/3,cz:(r.z+a.z+n.z)/3,minX:Math.min(r.x,a.x,n.x),minY:Math.min(r.y,a.y,n.y),minZ:Math.min(r.z,a.z,n.z),maxX:Math.max(r.x,a.x,n.x),maxY:Math.max(r.y,a.y,n.y),maxZ:Math.max(r.z,a.z,n.z),matIdx:ne})}}),e.length===0){let U=new Float32Array(O*4),S=new Float32Array(O*4),A=new Float32Array(O*4),F=new Float32Array(O*4);return{triangleCount:0,nodeCount:1,bvhTexture:He(U,O,1),triPosTexture:He(S,O,1),triNormTexture:He(A,O,1),triUvTexture:He(F,O,1),texWidth:O,bvhTexHeight:1,triTexHeight:1,materialIdToIndex:t}}let h=new Int32Array(e.length);for(let U=0;U<e.length;U++)h[U]=U;let x=new Array(e.length*2+2),M=1;function E(U,S,A){let F=1/0,_=1/0,Q=1/0,j=-1/0,se=-1/0,ne=-1/0;for(let me=0;me<A;me++){let Y=e[h[S+me]];Y.minX<F&&(F=Y.minX),Y.minY<_&&(_=Y.minY),Y.minZ<Q&&(Q=Y.minZ),Y.maxX>j&&(j=Y.maxX),Y.maxY>se&&(se=Y.maxY),Y.maxZ>ne&&(ne=Y.maxZ)}x[U]={minX:F-1e-4,minY:_-1e-4,minZ:Q-1e-4,maxX:j+1e-4,maxY:se+1e-4,maxZ:ne+1e-4,leftFirst:S,triCount:A}}let T=8,R=new Float64Array(T),b=new Float64Array(T),u=new Float64Array(T),s=new Float64Array(T),f=new Float64Array(T),p=new Float64Array(T),g=new Int32Array(T),w=new Float64Array(T-1),I=new Int32Array(T-1);function C(U,S,A,F,_,Q){let j=F-U,se=_-S,ne=Q-A;return j<=0&&se<=0&&ne<=0?0:2*(j*se+se*ne+ne*j)}function P(U,S){let A=x[U],F=A.leftFirst,_=A.triCount;if(_<=2||S>=26)return;let Q=-1,j=0,se=1/0,ne=C(A.minX,A.minY,A.minZ,A.maxX,A.maxY,A.maxZ),me=_;for(let W=0;W<3;W++){let ee=1/0,re=-1/0;for(let B=0;B<_;B++){let X=e[h[F+B]],Ae=W===0?X.cx:W===1?X.cy:X.cz;Ae<ee&&(ee=Ae),Ae>re&&(re=Ae)}if(re-ee<1e-6)continue;g.fill(0);for(let B=0;B<T;B++)R[B]=1/0,b[B]=1/0,u[B]=1/0,s[B]=-1/0,f[B]=-1/0,p[B]=-1/0;let de=T/(re-ee);for(let B=0;B<_;B++){let X=e[h[F+B]],Ae=W===0?X.cx:W===1?X.cy:X.cz,ae=Math.min(T-1,Math.floor((Ae-ee)*de));g[ae]++,X.minX<R[ae]&&(R[ae]=X.minX),X.minY<b[ae]&&(b[ae]=X.minY),X.minZ<u[ae]&&(u[ae]=X.minZ),X.maxX>s[ae]&&(s[ae]=X.maxX),X.maxY>f[ae]&&(f[ae]=X.maxY),X.maxZ>p[ae]&&(p[ae]=X.maxZ)}let fe=1/0,ve=1/0,xe=1/0,pe=-1/0,q=-1/0,ze=-1/0,De=0;for(let B=T-1;B>0;B--)g[B]>0&&(De+=g[B],R[B]<fe&&(fe=R[B]),b[B]<ve&&(ve=b[B]),u[B]<xe&&(xe=u[B]),s[B]>pe&&(pe=s[B]),f[B]>q&&(q=f[B]),p[B]>ze&&(ze=p[B])),I[B-1]=De,w[B-1]=De>0?C(fe,ve,xe,pe,q,ze):0;let _e=1/0,Xe=1/0,$e=1/0,Ye=-1/0,Oe=-1/0,We=-1/0,Ze=0,xt=ne>1e-8?1/ne:1;for(let B=0;B<T-1;B++){g[B]>0&&(Ze+=g[B],R[B]<_e&&(_e=R[B]),b[B]<Xe&&(Xe=b[B]),u[B]<$e&&($e=u[B]),s[B]>Ye&&(Ye=s[B]),f[B]>Oe&&(Oe=f[B]),p[B]>We&&(We=p[B]));let X=I[B];if(Ze===0||X===0)continue;let Ae=C(_e,Xe,$e,Ye,Oe,We),ae=.5+(Ze*Ae+X*w[B])*xt;ae<se&&(se=ae,Q=W,j=ee+(B+1)/T*(re-ee))}}if(Q===-1||se>=me&&_<=4)return;let Y=F,ie=F+_-1;for(;Y<=ie;){let W=e[h[Y]];if((Q===0?W.cx:Q===1?W.cy:W.cz)<j)Y++;else{let re=h[Y];h[Y]=h[ie],h[ie]=re,ie--}}let he=Y-F;if(he===0||he===_){let W=A.maxX-A.minX,ee=A.maxY-A.minY,re=A.maxZ-A.minZ,de=W>=ee&&W>=re?0:ee>=re?1:2;h.subarray(F,F+_).sort((ve,xe)=>{let pe=e[ve],q=e[xe];return de===0?pe.cx-q.cx:de===1?pe.cy-q.cy:pe.cz-q.cz})}let Me=he===0||he===_?Math.floor(_/2):he,Ee=M++,Re=M++;E(Ee,F,Me),E(Re,F+Me,_-Me),A.leftFirst=Ee,A.triCount=0,P(Ee,S+1),P(Re,S+1)}E(0,0,e.length),P(0,0);let z=M*2,J=Math.max(1,Math.ceil(z/O)),Z=new Float32Array(O*J*4);for(let U=0;U<M;U++){let S=x[U],A=U*8;Z[A+0]=S.minX,Z[A+1]=S.minY,Z[A+2]=S.minZ,Z[A+3]=S.leftFirst,Z[A+4]=S.maxX,Z[A+5]=S.maxY,Z[A+6]=S.maxZ,Z[A+7]=S.triCount}let ye=e.length*3,D=Math.max(1,Math.ceil(ye/O)),V=new Float32Array(O*D*4),$=new Float32Array(O*D*4),Le=Math.max(1,Math.ceil(e.length*2/O)),ue=new Float32Array(O*Le*4);for(let U=0;U<e.length;U++){let S=e[h[U]],A=U*12;V[A+0]=S.v0x,V[A+1]=S.v0y,V[A+2]=S.v0z,V[A+3]=S.matIdx,V[A+4]=S.v1x,V[A+5]=S.v1y,V[A+6]=S.v1z,V[A+7]=0,V[A+8]=S.v2x,V[A+9]=S.v2y,V[A+10]=S.v2z,V[A+11]=0,$[A+0]=S.n0x,$[A+1]=S.n0y,$[A+2]=S.n0z,$[A+3]=0,$[A+4]=S.n1x,$[A+5]=S.n1y,$[A+6]=S.n1z,$[A+7]=0,$[A+8]=S.n2x,$[A+9]=S.n2y,$[A+10]=S.n2z,$[A+11]=0;let F=U*8;ue[F+0]=S.u0,ue[F+1]=S.v0,ue[F+2]=S.u1,ue[F+3]=S.v1,ue[F+4]=S.u2,ue[F+5]=S.v2,ue[F+6]=0,ue[F+7]=0}return{triangleCount:e.length,nodeCount:M,bvhTexture:He(Z,O,J),triPosTexture:He(V,O,D),triNormTexture:He($,O,D),triUvTexture:He(ue,O,Le),texWidth:O,bvhTexHeight:J,triTexHeight:D,materialIdToIndex:t}}import*as G from"three";import{GLTFLoader as At}from"three/addons/loaders/GLTFLoader.js";import{OBJLoader as Ht}from"three/addons/loaders/OBJLoader.js";import{STLLoader as wt}from"three/addons/loaders/STLLoader.js";import*as N from"three";import*as be from"three";var ge=new be.Vector3,we=new be.Vector3,Se=new be.Vector3,et=new be.Vector3,tt=new be.Vector3,Ce=new be.Vector3;function Mt(o){if(o.getAttribute("normal")||o.computeVertexNormals(),!o.index)return o;let e=o.toNonIndexed();return o.dispose(),e}function nt(o,e=1){let t=Mt(o),r=t.getAttribute("position");if(!r)return t;let a=new Float32Array(r.count*2),n=Math.floor(r.count/3);for(let c=0;c<n;c++){let d=c*3,i=c*3+1,m=c*3+2;ge.fromBufferAttribute(r,d),we.fromBufferAttribute(r,i),Se.fromBufferAttribute(r,m),et.subVectors(we,ge),tt.subVectors(Se,ge),Ce.crossVectors(et,tt);let l=Math.abs(Ce.x),y=Math.abs(Ce.y),v=Math.abs(Ce.z);if(y>=l&&y>=v){let h=Ce.y>=0?1:-1;a[d*2+0]=ge.x*e,a[d*2+1]=-ge.z*h*e,a[i*2+0]=we.x*e,a[i*2+1]=-we.z*h*e,a[m*2+0]=Se.x*e,a[m*2+1]=-Se.z*h*e}else if(l>=y&&l>=v){let h=Ce.x>=0?-1:1;a[d*2+0]=ge.z*h*e,a[d*2+1]=ge.y*e,a[i*2+0]=we.z*h*e,a[i*2+1]=we.y*e,a[m*2+0]=Se.z*h*e,a[m*2+1]=Se.y*e}else{let h=Ce.z>=0?1:-1;a[d*2+0]=ge.x*h*e,a[d*2+1]=ge.y*e,a[i*2+0]=we.x*h*e,a[i*2+1]=we.y*e,a[m*2+0]=Se.x*h*e,a[m*2+1]=Se.y*e}}return t.setAttribute("uv",new be.BufferAttribute(a,2)),t}function je(o,e,t){return`${Math.round(o*1e4)},${Math.round(e*1e4)},${Math.round(t*1e4)}`}function ot(o){let e=[],t=1/0,r=-1/0,a=1/0,n=-1/0,c=new Map,d=[];for(let m of o){let l=m.getAttribute("position"),y=m.getAttribute("uv");if(!l||!y)continue;let v=m.getIndex(),h=Math.floor(v?v.count/3:l.count/3);for(let x=0;x<h;x++){let M=v?v.getX(x*3):x*3,E=v?v.getX(x*3+1):x*3+1,T=v?v.getX(x*3+2):x*3+2,R=y.getX(M),b=y.getY(M),u=y.getX(E),s=y.getY(E),f=y.getX(T),p=y.getY(T);e.push(R,b,u,s,f,p),R<t&&(t=R),u<t&&(t=u),f<t&&(t=f),R>r&&(r=R),u>r&&(r=u),f>r&&(r=f),b<a&&(a=b),s<a&&(a=s),p<a&&(a=p),b>n&&(n=b),s>n&&(n=s),p>n&&(n=p);let g=[je(l.getX(M),l.getY(M),l.getZ(M)),je(l.getX(E),l.getY(E),l.getZ(E)),je(l.getX(T),l.getY(T),l.getZ(T))],w=[[R,b],[u,s],[f,p]];for(let I=0;I<3;I++){let C=I,P=(I+1)%3,z=g[C],J=g[P];if(z===J)continue;let Z=z<J,ye=Z?`${z}|${J}`:`${J}|${z}`,D=Z?{kA:z,kB:J,uA:w[C][0],vA:w[C][1],uB:w[P][0],vB:w[P][1]}:{kA:J,kB:z,uA:w[P][0],vA:w[P][1],uB:w[C][0],vB:w[C][1]},V=c.get(ye);if(!V)c.set(ye,D);else{let $=Math.hypot(V.uA-D.uA,V.vA-D.vA),Le=Math.hypot(V.uB-D.uB,V.vB-D.vB);($>.0015||Le>.0015)&&d.push({uA1:V.uA,vA1:V.vA,uB1:V.uB,vB1:V.vB,uA2:D.uA,vA2:D.vA,uB2:D.uB,vB2:D.vB})}}}}let i=e.length>0&&t>=-.05&&r<=1.05&&a>=-.05&&n<=1.05;return{triangles:new Float32Array(e),isAtlas:i,seamPairs:d}}function Ue(o,e,t){let r=t?Math.max(0,Math.min(.999999,o)):o-Math.floor(o);return Math.max(0,Math.min(e-1,Math.floor(r*e)))}function Et(o,e){let t=new Uint8Array(e*e),r=o.length/6;for(let a=0;a<r;a++){let n=a*6,c=o[n+0]*e,d=o[n+1]*e,i=o[n+2]*e,m=o[n+3]*e,l=o[n+4]*e,y=o[n+5]*e,v=Math.max(0,Math.floor(Math.min(c,i,l))-1),h=Math.min(e-1,Math.ceil(Math.max(c,i,l))+1),x=Math.max(0,Math.floor(Math.min(d,m,y))-1),M=Math.min(e-1,Math.ceil(Math.max(d,m,y))+1),E=(i-c)*(y-d)-(l-c)*(m-d);if(Math.abs(E)<1e-4){let b=Math.max(0,Math.min(e-1,Math.round(c))),u=Math.max(0,Math.min(e-1,Math.round(d))),s=Math.max(0,Math.min(e-1,Math.round(i))),f=Math.max(0,Math.min(e-1,Math.round(m))),p=Math.max(0,Math.min(e-1,Math.round(l))),g=Math.max(0,Math.min(e-1,Math.round(y)));t[u*e+b]=1,t[f*e+s]=1,t[g*e+p]=1;continue}let T=1/E,R=.5/Math.max(1,Math.sqrt(Math.abs(E)));for(let b=x;b<=M;b++){let u=b+.5;for(let s=v;s<=h;s++){let f=s+.5,p=((i-f)*(y-u)-(l-f)*(m-u))*T,g=((l-f)*(d-u)-(c-f)*(y-u))*T,w=1-p-g;p>=-R&&g>=-R&&w>=-R&&(t[b*e+s]=1)}}}return t}function rt(o,e,t,r,a){let n=t*t,c=new Int16Array(n);c.fill(-1);let d=new Int32Array(n),i=0,m=0;for(let v=0;v<n;v++)e[v]===1&&(c[v]=0,d[m++]=v);if(m===0||m===n)return;let l=[-1,0,1,-1,1,-1,0,1],y=[-1,-1,-1,0,0,1,1,1];for(;i<m;){let v=d[i++],h=c[v];if(h>=r)continue;let x=v%t,M=(v-x)/t;for(let E=0;E<8;E++){let T=x+l[E],R=M+y[E];if(T<0||T>=t||R<0||R>=t)continue;let b=R*t+T;if(c[b]!==-1)continue;let u=0,s=0,f=0,p=0;for(let g=0;g<8;g++){let w=T+l[g],I=R+y[g];if(w<0||w>=t||I<0||I>=t)continue;let C=I*t+w;if(c[C]!==-1&&c[C]<=h){let P=C*4;a?(u+=o[P+0]-128,s+=o[P+1]-128,f+=o[P+2]-128):(u+=o[P+0],s+=o[P+1],f+=o[P+2]),p++}}if(p>0){let g=b*4;if(a){let w=u/p,I=s/p,C=f/p,P=Math.hypot(w,I,C)||1;o[g+0]=Math.max(0,Math.min(255,Math.round(w/P*127+128))),o[g+1]=Math.max(0,Math.min(255,Math.round(I/P*127+128))),o[g+2]=Math.max(0,Math.min(255,Math.round(C/P*127+128)))}else o[g+0]=Math.round(u/p),o[g+1]=Math.round(s/p),o[g+2]=Math.round(f/p);o[g+3]=255,c[b]=h+1,d[m++]=b}}}}function at(o,e,t,r,a,n){let c=0,d=0,i=0,m=0;for(let l=-3;l<=3;l++){let y=r+l;if(!(y<0||y>=a))for(let v=-3;v<=3;v++){let h=t+v;if(h<0||h>=a)continue;let x=y*a+h;if(e[x]===0)continue;let M=1/(1+v*v+l*l),E=x*4;n?(c+=(o[E+0]-128)*M,d+=(o[E+1]-128)*M,i+=(o[E+2]-128)*M):(c+=o[E+0]*M,d+=o[E+1]*M,i+=o[E+2]*M),m+=M}}if(m<=0){let l=(r*a+t)*4;return[o[l+0],o[l+1],o[l+2]]}if(n){let l=Math.hypot(c,d,i)||1;return[Math.max(0,Math.min(255,Math.round(c/l*127+128))),Math.max(0,Math.min(255,Math.round(d/l*127+128))),Math.max(0,Math.min(255,Math.round(i/l*127+128)))]}return[c/m,d/m,i/m]}function st(o,e,t,r,a){let n=t*t,c=new Uint8Array(n);if(a&&a.triangles.length>0&&a.isAtlas){let d=Et(a.triangles,t),i=!1;for(let l=0;l<n;l++)d[l]===1&&e[l]>=230&&(c[l]=1,i=!0);i||c.fill(1);let m=new Uint8Array(n);for(let l=1;l<t-1;l++)for(let y=1;y<t-1;y++){let v=l*t+y;c[v]===1&&c[v-1]===1&&c[v+1]===1&&c[v-t]===1&&c[v+t]===1&&(m[v]=1)}if(!r){let l=new Uint8Array(o);for(let y=1;y<t-1;y++)for(let v=1;v<t-1;v++){let h=y*t+v;if(c[h]===1&&m[h]===0){let x=h*4,M=l[x]*.299+l[x+1]*.587+l[x+2]*.114,E=0,T=0,R=0,b=0,u=0;for(let s=-1;s<=1;s++)for(let f=-1;f<=1;f++){let p=(y+s)*t+(v+f);if(m[p]===1){let g=p*4,w=l[g]*.299+l[g+1]*.587+l[g+2]*.114;w>u&&(u=w),E+=l[g],T+=l[g+1],R+=l[g+2],b++}}b>0&&M<u*.78&&(o[x+0]=Math.round(E/b),o[x+1]=Math.round(T/b),o[x+2]=Math.round(R/b))}}}if(a.seamPairs.length>0){let l=new Uint8Array(o),y=[.92,.62,.3,.12],v=(h,x,M,E,T,R)=>{if(h<0||h>=t||x<0||x>=t)return;let b=x*t+h;if(c[b]===0)return;let u=b*4,s=1-R;if(r){let f=(l[u+0]-128)*s+(M-128)*R,p=(l[u+1]-128)*s+(E-128)*R,g=(l[u+2]-128)*s+(T-128)*R,w=Math.hypot(f,p,g)||1;o[u+0]=Math.max(0,Math.min(255,Math.round(f/w*127+128))),o[u+1]=Math.max(0,Math.min(255,Math.round(p/w*127+128))),o[u+2]=Math.max(0,Math.min(255,Math.round(g/w*127+128)))}else o[u+0]=Math.round(l[u+0]*s+M*R),o[u+1]=Math.round(l[u+1]*s+E*R),o[u+2]=Math.round(l[u+2]*s+T*R)};for(let h of a.seamPairs){let x=Math.hypot(h.uB1-h.uA1,h.vB1-h.vA1)*t,M=Math.hypot(h.uB2-h.uA2,h.vB2-h.vA2)*t,E=Math.max(2,Math.min(1024,Math.ceil(Math.max(x,M))));for(let T=0;T<=E;T++){let R=T/E,b=Ue(h.uA1+(h.uB1-h.uA1)*R,t,!0),u=Ue(h.vA1+(h.vB1-h.vA1)*R,t,!0),s=Ue(h.uA2+(h.uB2-h.uA2)*R,t,!0),f=Ue(h.vA2+(h.vB2-h.vA2)*R,t,!0),p=at(l,m,b,u,t,r),g=at(l,m,s,f,t,r),w=r?p:[(p[0]+g[0])*.5,(p[1]+g[1])*.5,(p[2]+g[2])*.5],I=r?g:w;for(let C=-3;C<=3;C++)for(let P=-3;P<=3;P++){let z=Math.round(Math.hypot(P,C));if(z>=y.length)continue;let J=r?y[z]*.88:y[z];v(b+P,u+C,w[0],w[1],w[2],J),v(s+P,f+C,I[0],I[1],I[2],J)}}}}rt(o,c,t,14,r)}else{let d=!1;for(let i=0;i<n;i++)e[i]>=230?c[i]=1:d=!0;d&&rt(o,c,t,14,r)}}var te=256,Fe=14,oe=1024,Te=8,Be=100;var Ne={none:0,"brushed-metal":1,"carbon-weave":2,vulcanite:3,guilloche:4,concrete:5,"cedar-wood":6,travertine:7,limestone:8,brick:9,terrazzo:10,"ceramic-tile":11,plaster:12,"corten-steel":13};function Ie(o,e,t,r){let a=(o%t+t)%t,n=(e%r+r)%r,c=a*374761393+n*668265263;return c=(c^c>>13)*1274126177,((c^c>>16)>>>0)/4294967295}function qe(o,e,t,r){let a=o*t,n=e*r,c=Math.floor(a),d=Math.floor(n),i=a-c,m=n-d,l=i*i*(3-2*i),y=m*m*(3-2*m),v=Ie(c,d,t,r),h=Ie(c+1,d,t,r),x=Ie(c,d+1,t,r),M=Ie(c+1,d+1,t,r);return v+(h-v)*l+(x-v)*y+(v-h-x+M)*l*y}function it(o,e,t){return qe(o,e,t,t)}function Ve(o,e,t,r,a=4){let n=0,c=.5,d=0,i=t,m=r;for(let l=0;l<a;l++)n+=qe(o,e,i,m)*c,d+=c,c*=.5,i*=2,m*=2;return n/d}function le(o,e,t,r=4){return Ve(o,e,t,t,r)}function Rt(o,e,t,r,a){for(let n=0;n<e;n++){let c=(n-1+e)%e,d=(n+1)%e;for(let i=0;i<e;i++){let m=(i-1+e)%e,l=(i+1)%e,y=o[n*e+m],v=o[n*e+l],h=o[c*e+i],x=o[d*e+i],M=(y-v)*t,E=(h-x)*t,T=1,R=Math.sqrt(M*M+E*E+T*T),b=a+(n*e+i)*4;r[b+0]=Math.round((M/R*.5+.5)*255),r[b+1]=Math.round((E/R*.5+.5)*255),r[b+2]=Math.round((T/R*.5+.5)*255),r[b+3]=255}}}var Ge=class{constructor(e){L(this,"albedoArray");L(this,"normalArray");L(this,"roughMetalArray");L(this,"customAlbedoArray");L(this,"customNormalArray");L(this,"customRoughMetalArray");L(this,"albedoBytes");L(this,"normalBytes");L(this,"roughMetalBytes");L(this,"customAllocated",!1);L(this,"customAlbedoBytes",null);L(this,"customNormalBytes",null);L(this,"customRoughMetalBytes",null);L(this,"customIsAtlas",new Array(Te).fill(!1));L(this,"threeMapsCache",new Map);L(this,"nextCustomSlice",0);L(this,"maxAnisotropy");this.maxAnisotropy=Math.min(8,Math.max(1,e));let r=te*te*4*Fe;this.albedoBytes=new Uint8Array(r),this.normalBytes=new Uint8Array(r),this.roughMetalBytes=new Uint8Array(r);for(let a=0;a<Fe;a++)this.fillNeutralPresetLayer(a);this.generatePresetLayer("brushed-metal",1),this.generatePresetLayer("carbon-weave",2),this.generatePresetLayer("vulcanite",3),this.generatePresetLayer("guilloche",4),this.generatePresetLayer("concrete",5),this.generatePresetLayer("cedar-wood",6),this.generatePresetLayer("travertine",7),this.generatePresetLayer("limestone",8),this.generatePresetLayer("brick",9),this.generatePresetLayer("terrazzo",10),this.generatePresetLayer("ceramic-tile",11),this.generatePresetLayer("plaster",12),this.generatePresetLayer("corten-steel",13),this.albedoArray=this.createArrayTexture(this.albedoBytes,te,Fe),this.normalArray=this.createArrayTexture(this.normalBytes,te,Fe),this.roughMetalArray=this.createArrayTexture(this.roughMetalBytes,te,Fe),this.customAlbedoArray=this.createDummyArrayTex([255,255,255,255]),this.customNormalArray=this.createDummyArrayTex([128,128,255,255]),this.customRoughMetalArray=this.createDummyArrayTex([255,255,255,255])}createDummyArrayTex(e){let t=new N.DataArrayTexture(new Uint8Array(e),1,1,1);return t.format=N.RGBAFormat,t.type=N.UnsignedByteType,t.minFilter=N.LinearFilter,t.magFilter=N.LinearFilter,t.wrapS=N.RepeatWrapping,t.wrapT=N.RepeatWrapping,t.generateMipmaps=!1,t.needsUpdate=!0,t}createArrayTexture(e,t,r){let a=new N.DataArrayTexture(e,t,t,r);return a.format=N.RGBAFormat,a.type=N.UnsignedByteType,a.minFilter=N.LinearFilter,a.magFilter=N.LinearFilter,a.wrapS=N.RepeatWrapping,a.wrapT=N.RepeatWrapping,a.generateMipmaps=!1,a.needsUpdate=!0,a}ensureCustomAllocated(){if(this.customAllocated)return;let t=oe*oe*4*Te;this.customAlbedoBytes=new Uint8Array(t),this.customNormalBytes=new Uint8Array(t),this.customRoughMetalBytes=new Uint8Array(t);for(let r=0;r<Te;r++)this.fillNeutralCustomSlice(r);this.customAlbedoArray.dispose(),this.customNormalArray.dispose(),this.customRoughMetalArray.dispose(),this.customAlbedoArray=this.createArrayTexture(this.customAlbedoBytes,oe,Te),this.customNormalArray=this.createArrayTexture(this.customNormalBytes,oe,Te),this.customRoughMetalArray=this.createArrayTexture(this.customRoughMetalBytes,oe,Te),this.customAllocated=!0}fillNeutralPresetLayer(e){let t=te*te*4,r=e*t;for(let a=0;a<te*te;a++){let n=r+a*4;this.albedoBytes[n+0]=255,this.albedoBytes[n+1]=255,this.albedoBytes[n+2]=255,this.albedoBytes[n+3]=255,this.normalBytes[n+0]=128,this.normalBytes[n+1]=128,this.normalBytes[n+2]=255,this.normalBytes[n+3]=255,this.roughMetalBytes[n+0]=255,this.roughMetalBytes[n+1]=255,this.roughMetalBytes[n+2]=255,this.roughMetalBytes[n+3]=255}}fillNeutralCustomSlice(e){if(!this.customAlbedoBytes||!this.customNormalBytes||!this.customRoughMetalBytes)return;let t=oe*oe,r=e*t*4;for(let a=0;a<t;a++){let n=r+a*4;this.customAlbedoBytes[n+0]=255,this.customAlbedoBytes[n+1]=255,this.customAlbedoBytes[n+2]=255,this.customAlbedoBytes[n+3]=255,this.customNormalBytes[n+0]=128,this.customNormalBytes[n+1]=128,this.customNormalBytes[n+2]=255,this.customNormalBytes[n+3]=255,this.customRoughMetalBytes[n+0]=255,this.customRoughMetalBytes[n+1]=255,this.customRoughMetalBytes[n+2]=255,this.customRoughMetalBytes[n+3]=255}}upscalePresetToCustomSlice(e,t){if(!this.customAlbedoBytes||!this.customNormalBytes||!this.customRoughMetalBytes)return;let r=oe/te,a=e*te*te*4,n=t*oe*oe*4,c=(d,i,m)=>{for(let l=0;l<oe;l++){let y=Math.min(te-1,Math.floor(l/r));for(let v=0;v<oe;v++){let h=Math.min(te-1,Math.floor(v/r)),x=a+(y*te+h)*4,M=n+(l*oe+v)*4;i[M+0]=d[x+0],i[M+1]=d[x+1],i[M+2]=d[x+2],i[M+3]=m?255:d[x+3]}}};c(this.albedoBytes,this.customAlbedoBytes,!1),c(this.normalBytes,this.customNormalBytes,!0),c(this.roughMetalBytes,this.customRoughMetalBytes,!1)}generatePresetLayer(e,t){let r=te,a=new Float32Array(r*r),n=t*r*r*4,c=2;for(let d=0;d<r;d++){let i=d/r;for(let m=0;m<r;m++){let l=m/r,y=d*r+m,v=n+y*4,h=255,x=255,M=255,E=1,T=.5;if(e==="brushed-metal"){let b=Ve(l,i,2,32,3),u=qe(l,i,8,96),s=.85+b*.11+u*.04;h=x=M=Math.round(s*255),T=b*.72+u*.28,E=.78+b*.42,c=1.4}else if(e==="carbon-weave"){let u=l*12,s=i*12,f=Math.floor(u),p=Math.floor(s),g=u-f,w=s-p,C=(f+p)%4<2,P=C?Math.sin(g*Math.PI)*(.85+.15*Math.sin(w*Math.PI*6)):Math.sin(w*Math.PI)*(.85+.15*Math.sin(g*Math.PI*6)),z=C?.52+P*.42:.38+P*.36;h=x=M=Math.round(z*255),T=P,E=C?.55+(1-P)*.45:.82+(1-P)*.35,c=3.2}else if(e==="vulcanite"){let b=le(l,i,24,3),u=it(l,i,48),s=Math.pow(b*.72+u*.28,1.35),f=.7+s*.3;h=x=M=Math.round(f*255),T=s,E=.85+(1-s)*.35,c=4}else if(e==="guilloche"){let b=l-.5,u=i-.5,s=Math.sqrt(b*b+u*u),f=Math.atan2(u,b),p=Math.cos(f*48)*.5+.5,g=Math.cos(s*Math.PI*44)*.5+.5,w=Math.max(Math.abs(b),Math.abs(u)),I=w<.44?1:Math.max(0,(.5-w)/.06),C=.5+(p*.55+g*.45-.5)*I,P=.65+C*.35;h=x=M=Math.round(P*255),T=C,E=.6+(1-C)*.5,c=2.4}else if(e==="concrete"){let b=le(l,i,6,4),u=le(l,i,24,3),s=u<.32?(.32-u)*1.8:0,f=Math.abs((i*4+.5)%1-.5)>.486?.12:0,p=Math.max(.45,Math.min(1,.78+(b-.5)*.28-s*.4-f));h=Math.round(p*255),x=Math.round(p*.99*255),M=Math.round(p*.96*255),T=b*.65+u*.35-s*.5-f,E=.85+s*.3+(1-b)*.2,c=3}else if(e==="cedar-wood"){let b=le(l,i,4,3)*.35,u=Math.sin((l*10+b*8)*Math.PI*2)*.5+.5,s=Ve(l,i,24,3,3),f=u*.65+s*.35;h=Math.round((.68+f*.32)*255),x=Math.round((.54+f*.3)*255),M=Math.round((.42+f*.26)*255),T=f*.7+s*.3,E=.78+(1-f)*.38,c=2.2}else if(e==="travertine"){let b=le(l,i,4,4),u=Math.pow(Math.abs(Math.sin((i*3+b*2.2)*Math.PI)),.35),s=le(l*2,i*4,16,3),f=s<.28?(.28-s)*1.4:0,p=Math.max(.55,Math.min(1,.72+u*.26-f*.35));h=Math.round(p*255),x=Math.round(p*.96*255),M=Math.round(p*.9*255),T=u*.6+s*.4-f*.7,E=.72+f*.6+(1-u)*.25,c=2.6}else if(e==="limestone"){let b=Ve(l,i,4,9,3),u=le(l,i,30,24),s=Math.pow(Math.max(0,Math.cos((i*5+b*.7)*Math.PI*2)),16),f=u<.29?(.29-u)*1.4:0,p=Math.max(.56,Math.min(1,.83+(b-.5)*.18+s*.08-f*.22));h=Math.round(p*255),x=Math.round(p*.99*255),M=Math.round(p*.95*255),T=b*.62+u*.38-f*.5,E=.82+f*.45+(1-s)*.12,c=2}else if(e==="brick"){let u=Math.floor(i*6),s=i*6%1,f=4,p=u%2?.5:0,w=(l*f+p)%1,I=s<.045||s>.955||w<.035||w>.965,C=le(l,i,28,22),P=I?.67+C*.08:.88+C*.12;h=x=M=Math.round(P*255),T=I?.12+C*.12:.62+C*.2,E=I?1.14:.92+(1-C)*.18,c=3.4}else if(e==="terrazzo"){let u=l*18,s=i*18,f=Math.floor(u),p=Math.floor(s),g=u-f,w=s-p,I=Ie(f,p,18,18),C=.22+Ie(f+17,p,18,18)*.56,P=.22+Ie(f,p+31,18,18)*.56,z=.11+I*.12,J=.09+Ie(f+7,p+13,18,18)*.15,Z=(g-C)/z,ye=(w-P)/J,D=Z*Z+ye*ye<1,V=le(l,i,35,35),$=D?.62+I*.32:.93+V*.07;h=Math.round($*255),x=Math.round($*(D?.96:.99)*255),M=Math.round($*(D?.91:.97)*255),T=D?.35+I*.42:.52+V*.08,E=D?.9+I*.35:.94+V*.12,c=1.8}else if(e==="ceramic-tile"){let u=l*4%1,s=i*4%1,p=Math.min(u,1-u,s,1-s)<.025,g=le(l,i,16,16),w=p?.62:.96+g*.04;h=x=M=Math.round(w*255),T=p?.25:.48+g*.04,E=p?1.14:.88+g*.12,c=1.35}else if(e==="plaster"){let b=le(l,i,14,13),u=it(l,i,62),s=Math.pow(Math.max(0,Math.sin((l*8+b*1.4)*Math.PI)),5),f=.82+(b-.5)*.16+(u-.5)*.11+s*.025;h=x=M=Math.round(Math.max(.62,Math.min(1,f))*255),T=b*.56+u*.34+s*.1,E=.91+(1-u)*.2,c=1.5}else if(e==="corten-steel"){let b=le(l,i,7,7),u=le(l,i,27,24),s=Ve(l,i,5,28,3),f=Math.max(0,b*.72+u*.28-.56),p=Math.max(.58,Math.min(1,.91-f*.36+(s-.5)*.08));h=Math.round(p*255),x=Math.round(p*(.97-f*.04)*255),M=Math.round(p*(.91-f*.1)*255),T=b*.5+u*.35+s*.15,E=.88+f*.38,c=2.3}a[y]=T,this.albedoBytes[v+0]=h,this.albedoBytes[v+1]=x,this.albedoBytes[v+2]=M,this.albedoBytes[v+3]=255;let R=Math.max(12,Math.min(255,Math.round(E*255)));this.roughMetalBytes[v+0]=R,this.roughMetalBytes[v+1]=R,this.roughMetalBytes[v+2]=255,this.roughMetalBytes[v+3]=255}}Rt(a,r,c,this.normalBytes,n)}allocateCustomLayer(e="none",t=!1){this.ensureCustomAllocated();let r=this.nextCustomSlice;this.nextCustomSlice=this.nextCustomSlice>=Te-1?0:this.nextCustomSlice+1;let a=Ne[e];a===0?this.fillNeutralCustomSlice(r):this.upscalePresetToCustomSlice(a,r),this.customIsAtlas[r]=t;let n=Be+r;return this.customAlbedoArray.addLayerUpdate(r),this.customNormalArray.addLayerUpdate(r),this.customRoughMetalArray.addLayerUpdate(r),this.invalidateLayer(n),n}writeImageToLayer(e,t,r,a=!1,n){if(e<Be||(this.ensureCustomAllocated(),!this.customAlbedoBytes||!this.customNormalBytes||!this.customRoughMetalBytes))return;let c=e-Be;if(c<0||c>=Te)return;n&&(this.customIsAtlas[c]=n.isAtlas);let d=oe,i=document.createElement("canvas");i.width=d,i.height=d;let m=i.getContext("2d");if(!m)return;m.imageSmoothingEnabled=!0,m.imageSmoothingQuality="high",a?(m.save(),m.translate(0,d),m.scale(1,-1),m.drawImage(r,0,0,d,d),m.restore()):m.drawImage(r,0,0,d,d);let l=m.getImageData(0,0,d,d).data,y=d*d,v=y*4,h=c*v,x=new Uint8Array(v),M=new Uint8Array(y);for(let E=0;E<y;E++){let T=E*4;M[E]=l[T+3],x[T+0]=l[T+0],x[T+1]=l[T+1],x[T+2]=l[T+2],x[T+3]=255}st(x,M,d,t==="normal",n),t==="albedo"?(this.customAlbedoBytes.set(x,h),this.customAlbedoArray.addLayerUpdate(c),this.customAlbedoArray.needsUpdate=!0):t==="normal"?(this.customNormalBytes.set(x,h),this.customNormalArray.addLayerUpdate(c),this.customNormalArray.needsUpdate=!0):(this.customRoughMetalBytes.set(x,h),this.customRoughMetalArray.addLayerUpdate(c),this.customRoughMetalArray.needsUpdate=!0),this.invalidateLayer(e)}async writeFileToLayer(e,t,r,a){let n=URL.createObjectURL(r);try{let c=await new Promise((d,i)=>{let m=new Image;m.onload=()=>d(m),m.onerror=()=>i(new Error(`Unable to decode image ${r.name}`)),m.src=n});this.writeImageToLayer(e,t,c,!1,a)}finally{URL.revokeObjectURL(n)}}getLayerShaderInfo(e){if(e>=Be){let t=Math.max(0,Math.min(Te-1,e-Be));return{slice:t,modeFlag:this.customIsAtlas[t]?2:1}}return{slice:e,modeFlag:0}}invalidateLayer(e){let t=this.threeMapsCache.get(e);t&&(t.map?.dispose(),t.normalMap?.dispose(),t.roughnessMap?.dispose(),this.threeMapsCache.delete(e)),this.albedoArray.needsUpdate=!0,this.normalArray.needsUpdate=!0,this.roughMetalArray.needsUpdate=!0,this.customAlbedoArray.needsUpdate=!0,this.customNormalArray.needsUpdate=!0,this.customRoughMetalArray.needsUpdate=!0}getThreeMapsForLayer(e,t){if(e===0)return{map:null,normalMap:null,roughnessMap:null};let r=e>=Be,a=r?e-Be:e,n=r?oe:te,c=r&&!!this.customIsAtlas[a],d=this.threeMapsCache.get(e);if(!d){let m=r?this.customAlbedoBytes:this.albedoBytes,l=r?this.customNormalBytes:this.normalBytes,y=r?this.customRoughMetalBytes:this.roughMetalBytes;if(!m||!l||!y)return{map:null,normalMap:null,roughnessMap:null};let v=n*n*4,h=a*v,x=(M,E)=>{let T=new Uint8Array(v);T.set(M.subarray(h,h+v));let R=new N.DataTexture(T,n,n,N.RGBAFormat);R.colorSpace=E?N.SRGBColorSpace:N.NoColorSpace;let b=c&&t<=1.02?N.ClampToEdgeWrapping:N.RepeatWrapping;return R.wrapS=b,R.wrapT=b,R.minFilter=N.LinearMipmapLinearFilter,R.magFilter=N.LinearFilter,R.generateMipmaps=!0,R.anisotropy=this.maxAnisotropy,R.needsUpdate=!0,R};d={map:x(m,!0),normalMap:x(l,!1),roughnessMap:x(y,!1)},this.threeMapsCache.set(e,d)}let i=c&&t<=1.02?N.ClampToEdgeWrapping:N.RepeatWrapping;return[d.map,d.normalMap,d.roughnessMap].forEach(m=>{m&&(m.repeat.set(t,t),(m.wrapS!==i||m.wrapT!==i)&&(m.wrapS=i,m.wrapT=i,m.needsUpdate=!0))}),d}resetCustomCounter(){this.nextCustomSlice=0,this.customIsAtlas.fill(!1);for(let e of Array.from(this.threeMapsCache.keys()))if(e>=Be){let t=this.threeMapsCache.get(e);t?.map?.dispose(),t?.normalMap?.dispose(),t?.roughnessMap?.dispose(),this.threeMapsCache.delete(e)}}dispose(){this.albedoArray.dispose(),this.normalArray.dispose(),this.roughMetalArray.dispose(),this.customAlbedoArray.dispose(),this.customNormalArray.dispose(),this.customRoughMetalArray.dispose();for(let e of this.threeMapsCache.values())e.map?.dispose(),e.normalMap?.dispose(),e.roughnessMap?.dispose();this.threeMapsCache.clear()}};function St(o,e){let t=new G.MeshPhysicalMaterial({color:new G.Color(o.color),roughness:o.roughness,metalness:o.metalness,ior:o.ior,clearcoat:o.clearcoat,clearcoatRoughness:Math.max(.04,o.roughness*.4),envMapIntensity:1.05});return o.transmission>.05&&(e?(t.transparent=!0,t.opacity=Math.max(.28,1-o.transmission*.65),t.depthWrite=!1):(t.transmission=o.transmission,t.thickness=.65,t.attenuationColor=new G.Color(o.color),t.attenuationDistance=1.6)),o.emissiveIntensity>.01&&(t.emissive=new G.Color(o.color),t.emissiveIntensity=o.emissiveIntensity),t}async function lt(o,e,t,r){let a=o.name.split(".").pop()?.toLowerCase()??"",n=await o.arrayBuffer(),c;if(a==="glb"||a==="gltf"){let u=new At;c=(await new Promise((f,p)=>{u.parse(n,"",g=>f(g),p)})).scene}else if(a==="obj"){let u=new TextDecoder().decode(n);c=new Ht().parse(u)}else if(a==="stl"){let s=new wt().parse(n);s.computeVertexNormals();let f=new G.Mesh(s);c=new G.Group,c.add(f)}else throw new Error(`Unsupported format ".${a}". Please import GLB, GLTF, OBJ, or STL.`);c.updateMatrixWorld(!0);let d=new G.Box3().setFromObject(c);if(d.isEmpty())throw new Error("The imported file contains no renderable 3D geometry.");let i=new G.Vector3,m=new G.Vector3;d.getSize(i),d.getCenter(m);let y=1.45/Math.max(i.x,i.y,i.z,1e-4),v=new G.Vector3(-m.x*y,-d.min.y*y,-m.z*y),h=new G.Group;c.position.copy(v),c.scale.setScalar(y),h.add(c),h.updateMatrixWorld(!0);let x=[],M=new Map,E=new Map,T=new Map,R=new Map,b=1;if(h.traverse(u=>{let s=u;if(!s.isMesh||!s.geometry)return;let f=s.geometry;f.getAttribute("normal")||f.computeVertexNormals(),f.getAttribute("uv")||(s.geometry=nt(f,1));let p=Array.isArray(s.material)?s.material[0]:s.material,g=p,w=p?p.uuid:"imported_default",I=M.get(w);if(!I)if(x.length>=20)I=x[0].id;else{I=`imported_mat_${x.length+1}`,M.set(w,I),T.set(I,g);let Z=g&&g.color?`#${g.color.getHexString()}`:x.length===0?"#cfd3d9":"#9ca3af",ye=g&&typeof g.roughness=="number"?g.roughness:.45,D=g&&typeof g.metalness=="number"?g.metalness:.15,V=g&&g.name||s.name||`Surface ${x.length+1}`,$=!!g?.map?.image,Le=!!g?.normalMap?.image,ue=!!g?.roughnessMap?.image,U=!!g?.metalnessMap?.image,S=g?.normalScale&&typeof g.normalScale.x=="number"?Math.max(0,Math.min(2,g.normalScale.x)):1;x.push({id:I,name:V.slice(0,24),color:Z,roughness:Math.max(.03,Math.min(1,ye)),metalness:Math.max(0,Math.min(1,D)),ior:1.5,transmission:0,clearcoat:.1,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:S,hasCustomAlbedo:$,hasCustomNormal:Le,hasCustomRoughness:ue,hasCustomMetalness:U})}let C=x.find(Z=>Z.id===I),P=St(C,e);s.material=P,s.castShadow=!0,s.receiveShadow=!0,s.userData.materialId=I,s.userData.partName=s.name||`Mesh Part ${b++}`;let z=E.get(I)??[];z.push(s),E.set(I,z);let J=R.get(I)??[];J.push(s.geometry),R.set(I,J)}),x.length===0)throw new Error("No mesh triangles found in the imported file.");if(t&&r)for(let u of x){let s=T.get(u.id),f=!!s?.map?.image,p=!!s?.normalMap?.image,g=!!s?.roughnessMap?.image,w=!!s?.metalnessMap?.image;if(f||p||g||w){let I=R.get(u.id)??[],C=ot(I),P=t.allocateCustomLayer("none",C.isAtlas);s?.map?.image&&t.writeImageToLayer(P,"albedo",s.map.image,!!s.map.flipY,C),s?.normalMap?.image&&t.writeImageToLayer(P,"normal",s.normalMap.image,!!s.normalMap.flipY,C);let z=s?.roughnessMap?.image?s.roughnessMap:s?.metalnessMap;z?.image&&t.writeImageToLayer(P,"roughness",z.image,!!z.flipY,C),r.set(u.id,P)}else r.set(u.id,0)}return{group:h,materials:x,meshMap:E,rayTransform:{scale:y,offset:v}}}import*as H from"three";function ct(o){let e=Math.max(1e3,Math.min(4e4,o))/100,t,r,a;return e<=66?(t=255,r=99.4708025861*Math.log(e)-161.1195681661,a=e<=19?0:138.5177312231*Math.log(e-10)-305.0447927307):(t=329.698727446*Math.pow(e-60,-.1332047592),r=288.1221695283*Math.pow(e-60,-.0755148492),a=255),[Math.max(0,Math.min(255,t))/255,Math.max(0,Math.min(255,r))/255,Math.max(0,Math.min(255,a))/255]}function Ke(o){let e=o.replace("#",""),t=parseInt(e.length===3?e.split("").map(d=>d+d).join(""):e,16),r=d=>d<=.04045?d/12.92:Math.pow((d+.055)/1.055,2.4),a=(t>>16&255)/255,n=(t>>8&255)/255,c=(t&255)/255;return[r(a),r(n),r(c)]}function ut(o,e,t){let r=o*Math.PI/180,a=e*Math.PI/180,n=Math.cos(a),c=t*n*Math.sin(r),d=t*Math.sin(a),i=t*n*Math.cos(r);return[c,d,i]}var Pe=4,ce=24,mt=`precision highp float;
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
uniform vec4 uLightPosRadius[${Pe}];
uniform vec4 uLightColorEnabled[${Pe}];

// Material uniforms: 4 vec4s per material
// matA = (albedo.r, albedo.g, albedo.b, roughness)
// matB = (metalness, ior, transmission, clearcoat)
// matC = (emissiveIntensity, 0, 0, 0)
// matD = (texSlice, uvScale, normalStrength, modeFlag: 0=preset, 1=custom tile, 2=custom atlas)
uniform vec4 uMatA[${ce}];
uniform vec4 uMatB[${ce}];
uniform vec4 uMatC[${ce}];
uniform vec4 uMatD[${ce}];

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
          int matIdx = clamp(int(p0.w + 0.5), 0, ${ce-1});
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
      int safeClayIdx = clamp(hit.matIdx, 0, ${ce-1});
      albedo = vec3(0.76, 0.73, 0.69);
      roughness = 0.68;
      metalness = 0.0;
      emissiveIntensity = uMatC[safeClayIdx].x;
    } else {
      int safeMatIdx = clamp(hit.matIdx, 0, ${ce-1});
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
      for (int li = 0; li < ${Pe}; li++) {
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
    for (int li = 0; li < ${Pe}; li++) {
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
`,It=`precision highp float;
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
`,Ct={studio:0,golden:1,loft:2,cornell:3,obsidian:4},ke=class{constructor(e){L(this,"renderer");L(this,"quadScene");L(this,"quadCamera");L(this,"quadMesh");L(this,"traceMat");L(this,"displayMat");L(this,"rtA");L(this,"rtB");L(this,"pingPong",0);L(this,"sampleIndex",0);L(this,"width",640);L(this,"height",480);L(this,"targetType");L(this,"bvhData",null);L(this,"dummyTex");L(this,"dummyArrayTex");L(this,"camPos",new H.Vector3);L(this,"camRight",new H.Vector3);L(this,"camUp",new H.Vector3);L(this,"camForward",new H.Vector3);this.renderer=e;let t=e.getContext(),r=!!t.getExtension("EXT_color_buffer_float"),a=!!t.getExtension("EXT_color_buffer_half_float");this.targetType=r?H.FloatType:a?H.HalfFloatType:H.UnsignedByteType,this.rtA=this.createTarget(this.width,this.height),this.rtB=this.createTarget(this.width,this.height);let n=Array.from({length:Pe},()=>new H.Vector4),c=Array.from({length:Pe},()=>new H.Vector4),d=Array.from({length:ce},()=>new H.Vector4(.8,.8,.8,.4)),i=Array.from({length:ce},()=>new H.Vector4(0,1.5,0,0)),m=Array.from({length:ce},()=>new H.Vector4(0,0,0,0)),l=Array.from({length:ce},()=>new H.Vector4(0,1,1,0));this.dummyTex=new H.DataTexture(new Float32Array(4),1,1,H.RGBAFormat,H.FloatType),this.dummyTex.needsUpdate=!0,this.dummyArrayTex=new H.DataArrayTexture(new Uint8Array([255,255,255,255]),1,1,1),this.dummyArrayTex.format=H.RGBAFormat,this.dummyArrayTex.type=H.UnsignedByteType,this.dummyArrayTex.minFilter=H.LinearFilter,this.dummyArrayTex.magFilter=H.LinearFilter,this.dummyArrayTex.needsUpdate=!0,this.traceMat=new H.RawShaderMaterial({glslVersion:H.GLSL3,vertexShader:mt,fragmentShader:Bt,depthTest:!1,depthWrite:!1,uniforms:{uPrevFrame:{value:this.rtA.texture},uBvhTex:{value:this.dummyTex},uTriPosTex:{value:this.dummyTex},uTriNormTex:{value:this.dummyTex},uTriUvTex:{value:this.dummyTex},uAlbedoArray:{value:this.dummyArrayTex},uNormalArray:{value:this.dummyArrayTex},uRoughMetalArray:{value:this.dummyArrayTex},uCustomAlbedoArray:{value:this.dummyArrayTex},uCustomNormalArray:{value:this.dummyArrayTex},uCustomRoughMetalArray:{value:this.dummyArrayTex},uTexWidth:{value:1024},uSampleIndex:{value:0},uMaxBounces:{value:4},uClayMode:{value:0},uEnvMode:{value:0},uEnvIntensity:{value:.85},uResolution:{value:new H.Vector2(this.width,this.height)},uCamPos:{value:new H.Vector3},uCamRight:{value:new H.Vector3(1,0,0)},uCamUp:{value:new H.Vector3(0,1,0)},uCamForward:{value:new H.Vector3(0,0,-1)},uTanHalfFov:{value:.35},uAspect:{value:1.33},uLightPosRadius:{value:n},uLightColorEnabled:{value:c},uMatA:{value:d},uMatB:{value:i},uMatC:{value:m},uMatD:{value:l}}}),this.displayMat=new H.RawShaderMaterial({glslVersion:H.GLSL3,vertexShader:mt,fragmentShader:It,depthTest:!1,depthWrite:!1,uniforms:{uAccumTex:{value:this.rtB.texture},uResolution:{value:new H.Vector2(this.width,this.height)},uExposure:{value:1.08},uDenoiser:{value:1},uSampleCount:{value:1}}});let y=new H.PlaneGeometry(2,2);this.quadMesh=new H.Mesh(y,this.traceMat),this.quadMesh.frustumCulled=!1,this.quadScene=new H.Scene,this.quadScene.add(this.quadMesh),this.quadCamera=new H.OrthographicCamera(-1,1,1,-1,0,1)}createTarget(e,t){return new H.WebGLRenderTarget(e,t,{minFilter:H.NearestFilter,magFilter:H.NearestFilter,format:H.RGBAFormat,type:this.targetType,depthBuffer:!1,stencilBuffer:!1})}setTextureArrays(e){this.traceMat.uniforms.uAlbedoArray.value=e.albedoArray,this.traceMat.uniforms.uNormalArray.value=e.normalArray,this.traceMat.uniforms.uRoughMetalArray.value=e.roughMetalArray,this.traceMat.uniforms.uCustomAlbedoArray.value=e.customAlbedoArray,this.traceMat.uniforms.uCustomNormalArray.value=e.customNormalArray,this.traceMat.uniforms.uCustomRoughMetalArray.value=e.customRoughMetalArray,this.resetAccumulation()}setBVH(e){this.bvhData&&(this.bvhData.bvhTexture.dispose(),this.bvhData.triPosTexture.dispose(),this.bvhData.triNormTexture.dispose(),this.bvhData.triUvTexture.dispose()),this.bvhData=e,this.traceMat.uniforms.uBvhTex.value=e.bvhTexture,this.traceMat.uniforms.uTriPosTex.value=e.triPosTexture,this.traceMat.uniforms.uTriNormTex.value=e.triNormTexture,this.traceMat.uniforms.uTriUvTex.value=e.triUvTexture,this.traceMat.uniforms.uTexWidth.value=e.texWidth,this.resetAccumulation()}resize(e,t){let r=Math.max(64,Math.floor(e)),a=Math.max(64,Math.floor(t));r===this.width&&a===this.height||(this.width=r,this.height=a,this.rtA.setSize(r,a),this.rtB.setSize(r,a),this.traceMat.uniforms.uResolution.value.set(r,a),this.displayMat.uniforms.uResolution.value.set(r,a),this.resetAccumulation())}resetAccumulation(){this.sampleIndex=0}getSamples(){return this.sampleIndex}getResolution(){return[this.width,this.height]}syncLights(e){let t=this.traceMat.uniforms.uLightPosRadius.value,r=this.traceMat.uniforms.uLightColorEnabled.value;for(let a=0;a<Pe;a++){let n=e[a];if(!n){r[a].set(0,0,0,0);continue}let[c,d,i]=ut(n.azimuth,n.elevation,n.distance);t[a].set(c,d,i,n.radius);let m=1,l=1,y=1;if(n.useKelvin){let[h,x,M]=ct(n.kelvin);m=Math.pow(h,2.2),l=Math.pow(x,2.2),y=Math.pow(M,2.2)}else[m,l,y]=Ke(n.color);let v=n.intensity*.48;r[a].set(m*v,l*v,y*v,n.enabled?1:0)}}syncMaterials(e,t,r){if(!this.bvhData)return;let a=this.traceMat.uniforms.uMatA.value,n=this.traceMat.uniforms.uMatB.value,c=this.traceMat.uniforms.uMatC.value,d=this.traceMat.uniforms.uMatD.value;for(let i of e){let m=this.bvhData.materialIdToIndex.get(i.id);if(m===void 0||m>=ce)continue;let[l,y,v]=Ke(i.color),h=t?.get(i.id)??Ne[i.texturePreset]??0,{slice:x,modeFlag:M}=r?r.getLayerShaderInfo(h):{slice:h>=100?h-100:h,modeFlag:h>=100?1:0};a[m].set(l,y,v,i.roughness),n[m].set(i.metalness,i.ior,i.transmission,i.clearcoat),c[m].set(i.emissiveIntensity,0,0,0),c[m].y=i.hasCustomMetalness?1:0,d[m].set(x,i.uvScale,i.normalStrength,M)}}traceSample(e,t,r,a,n,c,d){this.syncLights(t),this.syncMaterials(r,c,d),e.updateMatrixWorld(),this.camPos.copy(e.position),e.matrixWorld.extractBasis(this.camRight,this.camUp,this.camForward),this.camForward.negate();let i=Math.tan(H.MathUtils.degToRad(e.fov*.5)),m=this.traceMat.uniforms;m.uCamPos.value.copy(this.camPos),m.uCamRight.value.copy(this.camRight),m.uCamUp.value.copy(this.camUp),m.uCamForward.value.copy(this.camForward),m.uTanHalfFov.value=i,m.uAspect.value=e.aspect,m.uSampleIndex.value=this.sampleIndex,m.uMaxBounces.value=n?Math.min(2,a.maxBounces):a.maxBounces,m.uClayMode.value=a.clayMode?1:0,m.uEnvMode.value=Ct[a.environment],m.uEnvIntensity.value=a.envIntensity;let l=this.pingPong===0?this.rtA:this.rtB,y=this.pingPong===0?this.rtB:this.rtA;m.uPrevFrame.value=l.texture,this.quadMesh.material=this.traceMat;let v=this.renderer.getRenderTarget(),h=this.renderer.autoClear;this.renderer.autoClear=!1,this.renderer.setRenderTarget(y),this.renderer.render(this.quadScene,this.quadCamera),this.renderer.setRenderTarget(v),this.renderer.autoClear=h,this.pingPong=1-this.pingPong,this.sampleIndex++}displayToScreen(e,t){let r=this.pingPong===0?this.rtA:this.rtB;this.displayMat.uniforms.uAccumTex.value=r.texture,this.displayMat.uniforms.uExposure.value=e.exposure,this.displayMat.uniforms.uDenoiser.value=e.denoiser?1:0,this.displayMat.uniforms.uSampleCount.value=Math.max(1,this.sampleIndex),this.quadMesh.material=this.displayMat;let a=this.renderer.autoClear;this.renderer.autoClear=!1,this.renderer.setRenderTarget(null),t?(this.renderer.setScissorTest(!0),this.renderer.setScissor(t.x,t.y,t.w,t.h),this.renderer.render(this.quadScene,this.quadCamera),this.renderer.setScissorTest(!1)):this.renderer.render(this.quadScene,this.quadCamera),this.renderer.autoClear=a}dispose(){this.rtA.dispose(),this.rtB.dispose(),this.traceMat.dispose(),this.displayMat.dispose(),this.quadMesh.geometry.dispose(),this.dummyTex.dispose(),this.dummyArrayTex.dispose(),this.bvhData&&(this.bvhData.bvhTexture.dispose(),this.bvhData.triPosTexture.dispose(),this.bvhData.triNormTexture.dispose(),this.bvhData.triUvTexture.dispose())}};var K=[{id:"key",name:"Key Softbox",role:"key",enabled:!0,useKelvin:!0,kelvin:5200,color:"#fff4e6",intensity:24,azimuth:42,elevation:46,distance:4.4,radius:.65},{id:"fill",name:"Cool Fill",role:"fill",enabled:!0,useKelvin:!0,kelvin:7600,color:"#d8e8ff",intensity:10,azimuth:-58,elevation:28,distance:4.8,radius:1.1},{id:"rim",name:"Edge Rim",role:"rim",enabled:!0,useKelvin:!0,kelvin:3600,color:"#ffd19c",intensity:18,azimuth:-145,elevation:36,distance:4.2,radius:.35},{id:"accent",name:"Overhead Bounce",role:"accent",enabled:!1,useKelvin:!0,kelvin:6200,color:"#eef5ff",intensity:12,azimuth:10,elevation:78,distance:4.5,radius:1.2}],ht=[{id:"three-point",name:"Three-Point Studio",environment:"studio",envIntensity:.85,lights:K},{id:"golden-hour",name:"Golden Hour",environment:"golden",envIntensity:1.15,lights:[{...K[0],kelvin:3100,intensity:30,azimuth:64,elevation:18,radius:.45},{...K[1],kelvin:8200,intensity:8,azimuth:-100,elevation:42,radius:1.3},{...K[2],kelvin:2600,intensity:22,azimuth:-135,elevation:24,radius:.3},{...K[3],enabled:!1}]},{id:"chiaroscuro",name:"Chiaroscuro",environment:"obsidian",envIntensity:.15,lights:[{...K[0],kelvin:4800,intensity:34,azimuth:52,elevation:38,radius:.22},{...K[1],enabled:!1,intensity:4},{...K[2],kelvin:5800,intensity:26,azimuth:-152,elevation:40,radius:.18},{...K[3],enabled:!1}]},{id:"product-softbox",name:"Product Softbox",environment:"loft",envIntensity:1,lights:[{...K[0],kelvin:5600,intensity:22,azimuth:32,elevation:58,radius:1.25},{...K[1],kelvin:5600,intensity:14,azimuth:-42,elevation:48,radius:1.25},{...K[2],kelvin:6500,intensity:16,azimuth:170,elevation:52,radius:.8},{...K[3],enabled:!0,kelvin:5800,intensity:14,azimuth:0,elevation:82,radius:1.4}]},{id:"cornell-gi",name:"Cornell Bounce",environment:"cornell",envIntensity:.9,lights:[{...K[0],kelvin:5e3,intensity:24,azimuth:15,elevation:74,distance:3.6,radius:.8},{...K[1],kelvin:6e3,intensity:6,azimuth:-60,elevation:30,radius:1},{...K[2],enabled:!1},{...K[3],enabled:!1}]}],Je=[{id:"brushed-titanium",name:"Brushed Titanium",color:"#b4bac2",roughness:.24,metalness:.96,ior:1.5,transmission:0,clearcoat:.15,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:2,normalStrength:1},{id:"polished-chrome",name:"Mirror Chrome",color:"#eef1f5",roughness:.04,metalness:1,ior:1.5,transmission:0,clearcoat:.2,emissiveIntensity:0,texturePreset:"none",uvScale:1.5,normalStrength:1},{id:"anodized-gold",name:"Satin Brass",color:"#d6a456",roughness:.22,metalness:.94,ior:1.5,transmission:0,clearcoat:.2,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:2,normalStrength:.8},{id:"optical-crystal",name:"Optical Glass",color:"#eef8ff",roughness:.03,metalness:0,ior:1.54,transmission:.96,clearcoat:1,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"smoked-acrylic",name:"Smoked Quartz",color:"#6b7b8c",roughness:.12,metalness:0,ior:1.49,transmission:.82,clearcoat:.9,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"matte-ceramic",name:"Honed Travertine",color:"#d6cfc4",roughness:.72,metalness:0,ior:1.45,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"travertine",uvScale:2,normalStrength:1},{id:"car-lacquer",name:"Carbon Lacquer",color:"#1b1f26",roughness:.24,metalness:.15,ior:1.5,transmission:0,clearcoat:1,emissiveIntensity:0,texturePreset:"carbon-weave",uvScale:2,normalStrength:1},{id:"warm-emissive",name:"Filament Glow",color:"#ffbe6b",roughness:.2,metalness:0,ior:1.45,transmission:0,clearcoat:0,emissiveIntensity:3.5,texturePreset:"none",uvScale:1,normalStrength:0},{id:"brushed-aluminum",name:"Brushed Aluminum",color:"#c5ccd2",roughness:.31,metalness:.94,ior:1.5,transmission:0,clearcoat:.1,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:2.2,normalStrength:.72},{id:"warm-copper",name:"Warm Copper",color:"#b66c46",roughness:.27,metalness:.97,ior:1.5,transmission:0,clearcoat:.18,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:1.8,normalStrength:.68},{id:"black-oxide-steel",name:"Black Oxide Steel",color:"#343a40",roughness:.34,metalness:.93,ior:1.5,transmission:0,clearcoat:.22,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:1.6,normalStrength:.7},{id:"pearl-enamel",name:"Pearl Enamel",color:"#e7e0d5",roughness:.16,metalness:.08,ior:1.48,transmission:0,clearcoat:.92,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"matte-polymer",name:"Matte Polymer",color:"#59616b",roughness:.62,metalness:.03,ior:1.46,transmission:0,clearcoat:.08,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"walnut-wood",name:"Walnut Wood",color:"#75452f",roughness:.43,metalness:0,ior:1.46,transmission:0,clearcoat:.12,emissiveIntensity:0,texturePreset:"cedar-wood",uvScale:1.7,normalStrength:.78},{id:"black-leather",name:"Black Leather",color:"#282321",roughness:.7,metalness:0,ior:1.46,transmission:0,clearcoat:.04,emissiveIntensity:0,texturePreset:"vulcanite",uvScale:1.35,normalStrength:.68},{id:"cast-concrete",name:"Cast Concrete",color:"#888780",roughness:.91,metalness:0,ior:1.45,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"concrete",uvScale:1.4,normalStrength:.82},{id:"polished-marble",name:"Polished Marble",color:"#d7d1c7",roughness:.19,metalness:0,ior:1.5,transmission:0,clearcoat:.38,emissiveIntensity:0,texturePreset:"travertine",uvScale:1.65,normalStrength:.55},{id:"frosted-glass",name:"Frosted Glass",color:"#c5dbe4",roughness:.28,metalness:0,ior:1.48,transmission:.78,clearcoat:.92,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"emerald-glass",name:"Emerald Glass",color:"#287466",roughness:.07,metalness:0,ior:1.52,transmission:.94,clearcoat:1,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"soft-rubber",name:"Soft Rubber",color:"#242629",roughness:.84,metalness:0,ior:1.46,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"vulcanite",uvScale:1.1,normalStrength:.7},{id:"warm-limestone",name:"Warm Limestone",color:"#c9b99b",roughness:.67,metalness:0,ior:1.48,transmission:0,clearcoat:.06,emissiveIntensity:0,texturePreset:"limestone",uvScale:1.35,normalStrength:.58},{id:"red-clay-brick",name:"Red Clay Brick",color:"#a64f39",roughness:.9,metalness:0,ior:1.46,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"brick",uvScale:.82,normalStrength:.86},{id:"spotted-gum",name:"Spotted Gum",color:"#a8653e",roughness:.48,metalness:0,ior:1.46,transmission:0,clearcoat:.14,emissiveIntensity:0,texturePreset:"cedar-wood",uvScale:2.1,normalStrength:.74},{id:"architectural-terrazzo",name:"Terrazzo",color:"#d8d0c2",roughness:.32,metalness:0,ior:1.5,transmission:0,clearcoat:.22,emissiveIntensity:0,texturePreset:"terrazzo",uvScale:1.25,normalStrength:.36},{id:"glazed-ceramic-tile",name:"Glazed Ceramic Tile",color:"#e6e2d8",roughness:.16,metalness:0,ior:1.49,transmission:0,clearcoat:.88,emissiveIntensity:0,texturePreset:"ceramic-tile",uvScale:1,normalStrength:.18},{id:"lime-plaster",name:"Lime Plaster",color:"#d7cfbd",roughness:.86,metalness:0,ior:1.46,transmission:0,clearcoat:.02,emissiveIntensity:0,texturePreset:"plaster",uvScale:1.5,normalStrength:.42},{id:"corten-steel",name:"Weathered Corten Steel",color:"#a75536",roughness:.71,metalness:.82,ior:1.5,transmission:0,clearcoat:.12,emissiveIntensity:0,texturePreset:"corten-steel",uvScale:1.7,normalStrength:.7},{id:"polished-concrete",name:"Polished Concrete",color:"#a3a09a",roughness:.29,metalness:0,ior:1.48,transmission:0,clearcoat:.18,emissiveIntensity:0,texturePreset:"concrete",uvScale:1.35,normalStrength:.36}],dt={maxBounces:4,maxSamples:128,exposure:1.08,denoiser:!0,interactiveScale:.5,clayMode:!1,showLightGizmos:!0,environment:"studio",envIntensity:.85};function ft(o,e){if(!/^#[\da-f]{6}$/i.test(o))return"#808080";let t=Number.parseInt(o.slice(1),16);return`#${[16,8,0].map(r=>{let a=t>>r&255,n=e>=0?a+(255-a)*e:a*(1+e);return Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0")}).join("")}`}function Pt(o,e){let t='stroke="#ffffff" stroke-opacity=".24" fill="none"';switch(o.texturePreset){case"brushed-metal":return`<pattern id="${e}" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 1H8M0 5H8" ${t} stroke-width=".7"/></pattern>`;case"carbon-weave":return`<pattern id="${e}" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M0 0H4V4H0ZM5 5H9V9H5Z" fill="#fff" fill-opacity=".18"/><path d="M5 0H9V4H5ZM0 5H4V9H0Z" fill="#000" fill-opacity=".2"/></pattern>`;case"vulcanite":return`<pattern id="${e}" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#fff" fill-opacity=".22"/><circle cx="6" cy="6" r="1" fill="#000" fill-opacity=".22"/></pattern>`;case"guilloche":return`<pattern id="${e}" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="9" cy="9" r="5.5" ${t} stroke-width=".7"/><circle cx="9" cy="9" r="2.5" ${t} stroke-width=".6"/></pattern>`;case"concrete":return`<pattern id="${e}" width="13" height="13" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r=".9" fill="#000" fill-opacity=".22"/><circle cx="10" cy="9" r=".8" fill="#fff" fill-opacity=".32"/><path d="M1 11L5 10M8 2L12 1" ${t} stroke-width=".6"/></pattern>`;case"cedar-wood":return`<pattern id="${e}" width="15" height="15" patternUnits="userSpaceOnUse"><path d="M0 3C4 1 10 5 15 2M0 10C5 7 10 12 15 9" ${t} stroke-width="1"/></pattern>`;case"travertine":return`<pattern id="${e}" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M-2 5C3 1 9 9 20 3M-2 13C4 9 11 17 20 11" ${t} stroke-width="1.1"/></pattern>`;case"limestone":return`<pattern id="${e}" width="16" height="14" patternUnits="userSpaceOnUse"><path d="M0 3C4 1 9 5 16 2M0 9C5 7 11 11 16 8" ${t} stroke-width="1"/><circle cx="4" cy="12" r=".7" fill="#000" fill-opacity=".2"/><circle cx="13" cy="5" r=".55" fill="#fff" fill-opacity=".32"/></pattern>`;case"brick":return`<pattern id="${e}" width="20" height="14" patternUnits="userSpaceOnUse"><path d="M0 0H20M0 7H20M0 14H20M10 0V7M0 7V14" stroke="#eee2d3" stroke-opacity=".5" stroke-width="1.2"/><path d="M1 1H9V6H1ZM11 1H19V6H11ZM1 8H9V13H1ZM11 8H19V13H11Z" fill="#000" fill-opacity=".08"/></pattern>`;case"terrazzo":return`<pattern id="${e}" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M2 4L5 2 7 5 4 7ZM11 3L14 2 15 5 12 6ZM8 11L11 9 13 12 10 14ZM1 14L3 12 5 14 3 16ZM15 15L17 13 18 16Z" fill="#66584c" fill-opacity=".58"/><circle cx="7" cy="3" r="1" fill="#a47758" fill-opacity=".65"/><circle cx="14" cy="10" r=".8" fill="#737b70" fill-opacity=".58"/></pattern>`;case"ceramic-tile":return`<pattern id="${e}" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 0H20V20H0Z" fill="none" stroke="#fff" stroke-opacity=".62" stroke-width="1.5"/><path d="M2 2H18V18H2Z" fill="none" stroke="#000" stroke-opacity=".08" stroke-width=".7"/></pattern>`;case"plaster":return`<pattern id="${e}" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M1 4C4 2 8 5 12 3M3 12C7 9 11 13 15 10M7 1L8 2M13 7L14 8" ${t} stroke-width=".75"/></pattern>`;case"corten-steel":return`<pattern id="${e}" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r="2.2" fill="#411d16" fill-opacity=".24"/><circle cx="11" cy="3" r="1.5" fill="#e09a62" fill-opacity=".38"/><circle cx="8" cy="12" r="3" fill="#59271a" fill-opacity=".2"/><path d="M0 9C4 7 10 11 16 8" stroke="#f2bd84" stroke-opacity=".28" fill="none" stroke-width="1"/></pattern>`;default:return""}}function pt(o,e="material"){let t=o.id.replace(/[^a-z0-9-]/gi,"-"),r=`${e}-sphere-${t}`,a=`${e}-clip-${t}`,n=`${e}-pattern-${t}`,c=o.transmission>.55,d=Math.min(.8,.2+o.metalness*.28+o.clearcoat*.25),i=4+o.roughness*10,m=o.texturePreset==="none"?"":`<circle cx="40" cy="40" r="31" fill="url(#${n})" clip-path="url(#${a})" opacity=".85"/>`,l=o.texturePreset==="none"?"":Pt(o,n);return`<svg viewBox="0 0 80 80" aria-hidden="true" focusable="false"><defs><radialGradient id="${r}" cx="31%" cy="25%" r="78%"><stop offset="0%" stop-color="${ft(o.color,.72)}"/><stop offset="38%" stop-color="${o.color}"/><stop offset="100%" stop-color="${ft(o.color,-.42)}"/></radialGradient><clipPath id="${a}"><circle cx="40" cy="40" r="31"/></clipPath>${l}</defs>${o.emissiveIntensity>0?`<circle cx="40" cy="40" r="35" fill="${o.color}" opacity=".18"/>`:""}<circle cx="40" cy="40" r="31" fill="url(#${r})"/>${m}${c?'<circle cx="40" cy="40" r="29.5" fill="#d8f3ff" opacity=".1"/>':""}<ellipse cx="30" cy="25" rx="${i}" ry="${3+o.roughness*4}" transform="rotate(-28 30 25)" fill="#fff" opacity="${d}"/><ellipse cx="48" cy="52" rx="17" ry="8" transform="rotate(-34 48 52)" fill="#fff" opacity="${Math.max(.04,(1-o.roughness)*.14)}"/><circle cx="40" cy="40" r="30.5" fill="none" stroke="${c?"#dff7ff":"#fff"}" stroke-opacity="${c?.72:.24}" stroke-width="${c?1.8:1}"/></svg>`}function yt(o){try{let e=o.getContext(),t=e.getExtension("WEBGL_debug_renderer_info"),r=t?t.UNMASKED_RENDERER_WEBGL:e.RENDERER;return/SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(String(e.getParameter(r)))}catch{return!0}}function vt(o){o&&o.group.traverse(e=>{e.geometry?.dispose?.();for(let t of Array.isArray(e.material)?e.material:[e.material])t?.dispose?.()})}async function dr(o,e){let t=new Ge(o.capabilities.getMaxAnisotropy()),r=new Map,a=null,n=null;try{let v=function(){return{settings:{...i},lights:m.map(u=>({...u})),materials:y.materials.map(u=>({...u})),samples:n?.getSamples()??0,resolution:n?.getResolution()??[0,0],materialPresets:Je.map(u=>({...u,previewSvg:pt(u,"boxlab-material")}))}},h=function(u){for(let s=0;s<m.length;s++)u[s]&&Object.assign(m[s],u[s]);n?.resetAccumulation()},x=function(u,s){let f=y.materials.find(w=>w.id===u);if(!f)return;let p={};for(let w of["color","roughness","metalness","ior","transmission","clearcoat","emissiveIntensity","texturePreset","uvScale","normalStrength"])s[w]!==void 0&&Object.assign(p,{[w]:s[w]});let g=!!(f.hasCustomAlbedo||f.hasCustomNormal||f.hasCustomRoughness||f.hasCustomMetalness);g&&delete p.texturePreset,Object.assign(f,p),!g&&p.texturePreset&&r.set(u,Ne[p.texturePreset]),n?.resetAccumulation()},M=function(u,s){let f=y.materials.find(g=>g.id===u),p=Je.find(g=>g.id===s);!f||!p||x(u,{...p})},E=function(u){Object.assign(i,u),n?.resetAccumulation()},T=function(u){let s=ht.find(f=>f.id===u);s&&(h(s.lights.map(f=>({...f}))),E({environment:s.environment,envIntensity:s.envIntensity}))},R=function(u){E(u.settings),h(u.lights);for(let s of y.materials){let f=u.materials.find(p=>p.id===s.id);f&&x(s.id,f)}},b=function(){n?.dispose(),n=null,t.dispose(),vt(y)},c=new File([e],"BoxLab_Current.glb",{type:"model/gltf-binary"});a=await lt(c,yt(o),t,r);let d=Qe(a.group);n=new ke(o),n.setTextureArrays(t),n.setBVH(d);let i={...dt},m=K.map(u=>({...u})),l={scale:a.rayTransform.scale,offset:a.rayTransform.offset.clone()},y=a;return{transform:l,getState:v,updateLights:h,updateMaterial:x,applyMaterialPreset:M,updateSettings:E,applyLightingRig:T,applyPreferences:R,render(u,s=!1){if(!n)return 0;let f=s?1:i.maxSamples;return n.getSamples()<f&&n.traceSample(u,m,y.materials,i,s,r,t),n.displayToScreen(i),n.getSamples()},resize(u,s,f=!1){let p=yt(o)?1:Math.min(window.devicePixelRatio||1,1.5),g=f?i.interactiveScale:1;n?.resize(Math.floor(u*p*g),Math.floor(s*p*g))},captureSnapshot(){return!n||n.getSamples()<i.maxSamples?null:(n.displayToScreen(i),o.domElement.toDataURL("image/png"))},reset(){n?.resetAccumulation()},dispose:b}}catch(c){throw n?.dispose(),t.dispose(),vt(a),c}}export{dr as createBoxLabHeliosTrace};
