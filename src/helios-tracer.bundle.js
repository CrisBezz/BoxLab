/* HeliosStudio integration bundle; source commit 33fd410091aed8f9ea251c1f7f0fd42bb4be5b4e. Rebuild with npm run build:helios-tracer. */
var xt=Object.defineProperty;var gt=(o,e,t)=>e in o?xt(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var C=(o,e,t)=>gt(o,typeof e!="symbol"?e+"":e,t);import*as D from"three";var $=1024,bt=24;function Re(o,e,t){let r=new D.DataTexture(o,e,t,D.RGBAFormat,D.FloatType);return r.minFilter=D.NearestFilter,r.magFilter=D.NearestFilter,r.generateMipmaps=!1,r.wrapS=D.ClampToEdgeWrapping,r.wrapT=D.ClampToEdgeWrapping,r.needsUpdate=!0,r}function Qe(o){o.updateMatrixWorld(!0);let e=[],t=new Map,r=new D.Vector3,a=new D.Vector3,n=new D.Vector3,s=new D.Vector3,h=new D.Vector3,i=new D.Vector3,u=new D.Vector3,c=new D.Vector3,f=new D.Vector3,p=new D.Matrix3;if(o.traverse(G=>{let w=G;if(!w.isMesh||!w.geometry||!w.visible||w.userData.excludeFromRaytracer)return;let A=w.geometry,F=A.getAttribute("position");if(!F)return;let k=A.getAttribute("normal"),j=A.getAttribute("uv"),W=A.getIndex(),se=String(w.userData.materialId||"default"),ne=t.get(se);ne===void 0&&(ne=Math.min(t.size,bt-1),t.set(se,ne));let ue=w.matrixWorld;p.getNormalMatrix(ue);let X=Math.floor(W?W.count/3:F.count/3);for(let ie=0;ie<X;ie++){let me=W?W.getX(ie*3):ie*3,be=W?W.getX(ie*3+1):ie*3+1,Te=W?W.getX(ie*3+2):ie*3+2;if(r.fromBufferAttribute(F,me).applyMatrix4(ue),a.fromBufferAttribute(F,be).applyMatrix4(ue),n.fromBufferAttribute(F,Te).applyMatrix4(ue),u.subVectors(a,r),c.subVectors(n,r),f.crossVectors(u,c),f.lengthSq()<1e-12)continue;k?(s.fromBufferAttribute(k,me).applyMatrix3(p).normalize(),h.fromBufferAttribute(k,be).applyMatrix3(p).normalize(),i.fromBufferAttribute(k,Te).applyMatrix3(p).normalize()):(f.normalize(),s.copy(f),h.copy(f),i.copy(f));let Ee=0,Y=0,J=0,re=0,he=0,de=0;if(j)Ee=j.getX(me),Y=j.getY(me),J=j.getX(be),re=j.getY(be),he=j.getX(Te),de=j.getY(Te);else{let pe=Math.abs(f.x),ye=Math.abs(f.y),fe=Math.abs(f.z);if(ye>=pe&&ye>=fe){let O=f.y>=0?-1:1;Ee=r.x,Y=r.z*O,J=a.x,re=a.z*O,he=n.x,de=n.z*O}else if(pe>=ye&&pe>=fe){let O=f.x>=0?-1:1;Ee=r.z*O,Y=r.y,J=a.z*O,re=a.y,he=n.z*O,de=n.y}else{let O=f.z>=0?1:-1;Ee=r.x*O,Y=r.y,J=a.x*O,re=a.y,he=n.x*O,de=n.y}}e.push({v0x:r.x,v0y:r.y,v0z:r.z,v1x:a.x,v1y:a.y,v1z:a.z,v2x:n.x,v2y:n.y,v2z:n.z,n0x:s.x,n0y:s.y,n0z:s.z,n1x:h.x,n1y:h.y,n1z:h.z,n2x:i.x,n2y:i.y,n2z:i.z,u0:Ee,v0:Y,u1:J,v1:re,u2:he,v2:de,cx:(r.x+a.x+n.x)/3,cy:(r.y+a.y+n.y)/3,cz:(r.z+a.z+n.z)/3,minX:Math.min(r.x,a.x,n.x),minY:Math.min(r.y,a.y,n.y),minZ:Math.min(r.z,a.z,n.z),maxX:Math.max(r.x,a.x,n.x),maxY:Math.max(r.y,a.y,n.y),maxZ:Math.max(r.z,a.z,n.z),matIdx:ne})}}),e.length===0){let G=new Float32Array($*4),w=new Float32Array($*4),A=new Float32Array($*4),F=new Float32Array($*4);return{triangleCount:0,nodeCount:1,bvhTexture:Re(G,$,1),triPosTexture:Re(w,$,1),triNormTexture:Re(A,$,1),triUvTexture:Re(F,$,1),texWidth:$,bvhTexHeight:1,triTexHeight:1,materialIdToIndex:t}}let d=new Int32Array(e.length);for(let G=0;G<e.length;G++)d[G]=G;let v=new Array(e.length*2+2),E=1;function M(G,w,A){let F=1/0,k=1/0,j=1/0,W=-1/0,se=-1/0,ne=-1/0;for(let ue=0;ue<A;ue++){let X=e[d[w+ue]];X.minX<F&&(F=X.minX),X.minY<k&&(k=X.minY),X.minZ<j&&(j=X.minZ),X.maxX>W&&(W=X.maxX),X.maxY>se&&(se=X.maxY),X.maxZ>ne&&(ne=X.maxZ)}v[G]={minX:F-1e-4,minY:k-1e-4,minZ:j-1e-4,maxX:W+1e-4,maxY:se+1e-4,maxZ:ne+1e-4,leftFirst:w,triCount:A}}let T=8,R=new Float64Array(T),b=new Float64Array(T),m=new Float64Array(T),l=new Float64Array(T),y=new Float64Array(T),g=new Float64Array(T),x=new Int32Array(T),S=new Float64Array(T-1),L=new Int32Array(T-1);function P(G,w,A,F,k,j){let W=F-G,se=k-w,ne=j-A;return W<=0&&se<=0&&ne<=0?0:2*(W*se+se*ne+ne*W)}function I(G,w){let A=v[G],F=A.leftFirst,k=A.triCount;if(k<=2||w>=26)return;let j=-1,W=0,se=1/0,ne=P(A.minX,A.minY,A.minZ,A.maxX,A.maxY,A.maxZ),ue=k;for(let Y=0;Y<3;Y++){let J=1/0,re=-1/0;for(let B=0;B<k;B++){let z=e[d[F+B]],Me=Y===0?z.cx:Y===1?z.cy:z.cz;Me<J&&(J=Me),Me>re&&(re=Me)}if(re-J<1e-6)continue;x.fill(0);for(let B=0;B<T;B++)R[B]=1/0,b[B]=1/0,m[B]=1/0,l[B]=-1/0,y[B]=-1/0,g[B]=-1/0;let he=T/(re-J);for(let B=0;B<k;B++){let z=e[d[F+B]],Me=Y===0?z.cx:Y===1?z.cy:z.cz,ae=Math.min(T-1,Math.floor((Me-J)*he));x[ae]++,z.minX<R[ae]&&(R[ae]=z.minX),z.minY<b[ae]&&(b[ae]=z.minY),z.minZ<m[ae]&&(m[ae]=z.minZ),z.maxX>l[ae]&&(l[ae]=z.maxX),z.maxY>y[ae]&&(y[ae]=z.maxY),z.maxZ>g[ae]&&(g[ae]=z.maxZ)}let de=1/0,pe=1/0,ye=1/0,fe=-1/0,O=-1/0,De=-1/0,ke=0;for(let B=T-1;B>0;B--)x[B]>0&&(ke+=x[B],R[B]<de&&(de=R[B]),b[B]<pe&&(pe=b[B]),m[B]<ye&&(ye=m[B]),l[B]>fe&&(fe=l[B]),y[B]>O&&(O=y[B]),g[B]>De&&(De=g[B])),L[B-1]=ke,S[B-1]=ke>0?P(de,pe,ye,fe,O,De):0;let ze=1/0,_e=1/0,Xe=1/0,$e=-1/0,Ye=-1/0,We=-1/0,Oe=0,vt=ne>1e-8?1/ne:1;for(let B=0;B<T-1;B++){x[B]>0&&(Oe+=x[B],R[B]<ze&&(ze=R[B]),b[B]<_e&&(_e=b[B]),m[B]<Xe&&(Xe=m[B]),l[B]>$e&&($e=l[B]),y[B]>Ye&&(Ye=y[B]),g[B]>We&&(We=g[B]));let z=L[B];if(Oe===0||z===0)continue;let Me=P(ze,_e,Xe,$e,Ye,We),ae=.5+(Oe*Me+z*S[B])*vt;ae<se&&(se=ae,j=Y,W=J+(B+1)/T*(re-J))}}if(j===-1||se>=ue&&k<=4)return;let X=F,ie=F+k-1;for(;X<=ie;){let Y=e[d[X]];if((j===0?Y.cx:j===1?Y.cy:Y.cz)<W)X++;else{let re=d[X];d[X]=d[ie],d[ie]=re,ie--}}let me=X-F;if(me===0||me===k){let Y=A.maxX-A.minX,J=A.maxY-A.minY,re=A.maxZ-A.minZ,he=Y>=J&&Y>=re?0:J>=re?1:2;d.subarray(F,F+k).sort((pe,ye)=>{let fe=e[pe],O=e[ye];return he===0?fe.cx-O.cx:he===1?fe.cy-O.cy:fe.cz-O.cz})}let be=me===0||me===k?Math.floor(k/2):me,Te=E++,Ee=E++;M(Te,F,be),M(Ee,F+be,k-be),A.leftFirst=Te,A.triCount=0,I(Te,w+1),I(Ee,w+1)}M(0,0,e.length),I(0,0);let _=E*2,ee=Math.max(1,Math.ceil(_/$)),te=new Float32Array($*ee*4);for(let G=0;G<E;G++){let w=v[G],A=G*8;te[A+0]=w.minX,te[A+1]=w.minY,te[A+2]=w.minZ,te[A+3]=w.leftFirst,te[A+4]=w.maxX,te[A+5]=w.maxY,te[A+6]=w.maxZ,te[A+7]=w.triCount}let Ie=e.length*3,q=Math.max(1,Math.ceil(Ie/$)),U=new Float32Array($*q*4),K=new Float32Array($*q*4),Ce=Math.max(1,Math.ceil(e.length*2/$)),ce=new Float32Array($*Ce*4);for(let G=0;G<e.length;G++){let w=e[d[G]],A=G*12;U[A+0]=w.v0x,U[A+1]=w.v0y,U[A+2]=w.v0z,U[A+3]=w.matIdx,U[A+4]=w.v1x,U[A+5]=w.v1y,U[A+6]=w.v1z,U[A+7]=0,U[A+8]=w.v2x,U[A+9]=w.v2y,U[A+10]=w.v2z,U[A+11]=0,K[A+0]=w.n0x,K[A+1]=w.n0y,K[A+2]=w.n0z,K[A+3]=0,K[A+4]=w.n1x,K[A+5]=w.n1y,K[A+6]=w.n1z,K[A+7]=0,K[A+8]=w.n2x,K[A+9]=w.n2y,K[A+10]=w.n2z,K[A+11]=0;let F=G*8;ce[F+0]=w.u0,ce[F+1]=w.v0,ce[F+2]=w.u1,ce[F+3]=w.v1,ce[F+4]=w.u2,ce[F+5]=w.v2,ce[F+6]=0,ce[F+7]=0}return{triangleCount:e.length,nodeCount:E,bvhTexture:Re(te,$,ee),triPosTexture:Re(U,$,q),triNormTexture:Re(K,$,q),triUvTexture:Re(ce,$,Ce),texWidth:$,bvhTexHeight:ee,triTexHeight:q,materialIdToIndex:t}}import*as V from"three";import{GLTFLoader as At}from"three/addons/loaders/GLTFLoader.js";import{OBJLoader as Ht}from"three/addons/loaders/OBJLoader.js";import{STLLoader as wt}from"three/addons/loaders/STLLoader.js";import*as N from"three";import*as xe from"three";var ve=new xe.Vector3,Ae=new xe.Vector3,He=new xe.Vector3,et=new xe.Vector3,tt=new xe.Vector3,Be=new xe.Vector3;function Tt(o){if(o.getAttribute("normal")||o.computeVertexNormals(),!o.index)return o;let e=o.toNonIndexed();return o.dispose(),e}function nt(o,e=1){let t=Tt(o),r=t.getAttribute("position");if(!r)return t;let a=new Float32Array(r.count*2),n=Math.floor(r.count/3);for(let s=0;s<n;s++){let h=s*3,i=s*3+1,u=s*3+2;ve.fromBufferAttribute(r,h),Ae.fromBufferAttribute(r,i),He.fromBufferAttribute(r,u),et.subVectors(Ae,ve),tt.subVectors(He,ve),Be.crossVectors(et,tt);let c=Math.abs(Be.x),f=Math.abs(Be.y),p=Math.abs(Be.z);if(f>=c&&f>=p){let d=Be.y>=0?1:-1;a[h*2+0]=ve.x*e,a[h*2+1]=-ve.z*d*e,a[i*2+0]=Ae.x*e,a[i*2+1]=-Ae.z*d*e,a[u*2+0]=He.x*e,a[u*2+1]=-He.z*d*e}else if(c>=f&&c>=p){let d=Be.x>=0?-1:1;a[h*2+0]=ve.z*d*e,a[h*2+1]=ve.y*e,a[i*2+0]=Ae.z*d*e,a[i*2+1]=Ae.y*e,a[u*2+0]=He.z*d*e,a[u*2+1]=He.y*e}else{let d=Be.z>=0?1:-1;a[h*2+0]=ve.x*d*e,a[h*2+1]=ve.y*e,a[i*2+0]=Ae.x*d*e,a[i*2+1]=Ae.y*e,a[u*2+0]=He.x*d*e,a[u*2+1]=He.y*e}}return t.setAttribute("uv",new xe.BufferAttribute(a,2)),t}function Ze(o,e,t){return`${Math.round(o*1e4)},${Math.round(e*1e4)},${Math.round(t*1e4)}`}function ot(o){let e=[],t=1/0,r=-1/0,a=1/0,n=-1/0,s=new Map,h=[];for(let u of o){let c=u.getAttribute("position"),f=u.getAttribute("uv");if(!c||!f)continue;let p=u.getIndex(),d=Math.floor(p?p.count/3:c.count/3);for(let v=0;v<d;v++){let E=p?p.getX(v*3):v*3,M=p?p.getX(v*3+1):v*3+1,T=p?p.getX(v*3+2):v*3+2,R=f.getX(E),b=f.getY(E),m=f.getX(M),l=f.getY(M),y=f.getX(T),g=f.getY(T);e.push(R,b,m,l,y,g),R<t&&(t=R),m<t&&(t=m),y<t&&(t=y),R>r&&(r=R),m>r&&(r=m),y>r&&(r=y),b<a&&(a=b),l<a&&(a=l),g<a&&(a=g),b>n&&(n=b),l>n&&(n=l),g>n&&(n=g);let x=[Ze(c.getX(E),c.getY(E),c.getZ(E)),Ze(c.getX(M),c.getY(M),c.getZ(M)),Ze(c.getX(T),c.getY(T),c.getZ(T))],S=[[R,b],[m,l],[y,g]];for(let L=0;L<3;L++){let P=L,I=(L+1)%3,_=x[P],ee=x[I];if(_===ee)continue;let te=_<ee,Ie=te?`${_}|${ee}`:`${ee}|${_}`,q=te?{kA:_,kB:ee,uA:S[P][0],vA:S[P][1],uB:S[I][0],vB:S[I][1]}:{kA:ee,kB:_,uA:S[I][0],vA:S[I][1],uB:S[P][0],vB:S[P][1]},U=s.get(Ie);if(!U)s.set(Ie,q);else{let K=Math.hypot(U.uA-q.uA,U.vA-q.vA),Ce=Math.hypot(U.uB-q.uB,U.vB-q.vB);(K>.0015||Ce>.0015)&&h.push({uA1:U.uA,vA1:U.vA,uB1:U.uB,vB1:U.vB,uA2:q.uA,vA2:q.vA,uB2:q.uB,vB2:q.vB})}}}}let i=e.length>0&&t>=-.05&&r<=1.05&&a>=-.05&&n<=1.05;return{triangles:new Float32Array(e),isAtlas:i,seamPairs:h}}function Fe(o,e,t){let r=t?Math.max(0,Math.min(.999999,o)):o-Math.floor(o);return Math.max(0,Math.min(e-1,Math.floor(r*e)))}function Et(o,e){let t=new Uint8Array(e*e),r=o.length/6;for(let a=0;a<r;a++){let n=a*6,s=o[n+0]*e,h=o[n+1]*e,i=o[n+2]*e,u=o[n+3]*e,c=o[n+4]*e,f=o[n+5]*e,p=Math.max(0,Math.floor(Math.min(s,i,c))-1),d=Math.min(e-1,Math.ceil(Math.max(s,i,c))+1),v=Math.max(0,Math.floor(Math.min(h,u,f))-1),E=Math.min(e-1,Math.ceil(Math.max(h,u,f))+1),M=(i-s)*(f-h)-(c-s)*(u-h);if(Math.abs(M)<1e-4){let b=Math.max(0,Math.min(e-1,Math.round(s))),m=Math.max(0,Math.min(e-1,Math.round(h))),l=Math.max(0,Math.min(e-1,Math.round(i))),y=Math.max(0,Math.min(e-1,Math.round(u))),g=Math.max(0,Math.min(e-1,Math.round(c))),x=Math.max(0,Math.min(e-1,Math.round(f)));t[m*e+b]=1,t[y*e+l]=1,t[x*e+g]=1;continue}let T=1/M,R=.5/Math.max(1,Math.sqrt(Math.abs(M)));for(let b=v;b<=E;b++){let m=b+.5;for(let l=p;l<=d;l++){let y=l+.5,g=((i-y)*(f-m)-(c-y)*(u-m))*T,x=((c-y)*(h-m)-(s-y)*(f-m))*T,S=1-g-x;g>=-R&&x>=-R&&S>=-R&&(t[b*e+l]=1)}}}return t}function rt(o,e,t,r,a){let n=t*t,s=new Int16Array(n);s.fill(-1);let h=new Int32Array(n),i=0,u=0;for(let p=0;p<n;p++)e[p]===1&&(s[p]=0,h[u++]=p);if(u===0||u===n)return;let c=[-1,0,1,-1,1,-1,0,1],f=[-1,-1,-1,0,0,1,1,1];for(;i<u;){let p=h[i++],d=s[p];if(d>=r)continue;let v=p%t,E=(p-v)/t;for(let M=0;M<8;M++){let T=v+c[M],R=E+f[M];if(T<0||T>=t||R<0||R>=t)continue;let b=R*t+T;if(s[b]!==-1)continue;let m=0,l=0,y=0,g=0;for(let x=0;x<8;x++){let S=T+c[x],L=R+f[x];if(S<0||S>=t||L<0||L>=t)continue;let P=L*t+S;if(s[P]!==-1&&s[P]<=d){let I=P*4;a?(m+=o[I+0]-128,l+=o[I+1]-128,y+=o[I+2]-128):(m+=o[I+0],l+=o[I+1],y+=o[I+2]),g++}}if(g>0){let x=b*4;if(a){let S=m/g,L=l/g,P=y/g,I=Math.hypot(S,L,P)||1;o[x+0]=Math.max(0,Math.min(255,Math.round(S/I*127+128))),o[x+1]=Math.max(0,Math.min(255,Math.round(L/I*127+128))),o[x+2]=Math.max(0,Math.min(255,Math.round(P/I*127+128)))}else o[x+0]=Math.round(m/g),o[x+1]=Math.round(l/g),o[x+2]=Math.round(y/g);o[x+3]=255,s[b]=d+1,h[u++]=b}}}}function at(o,e,t,r,a,n){let s=0,h=0,i=0,u=0;for(let c=-3;c<=3;c++){let f=r+c;if(!(f<0||f>=a))for(let p=-3;p<=3;p++){let d=t+p;if(d<0||d>=a)continue;let v=f*a+d;if(e[v]===0)continue;let E=1/(1+p*p+c*c),M=v*4;n?(s+=(o[M+0]-128)*E,h+=(o[M+1]-128)*E,i+=(o[M+2]-128)*E):(s+=o[M+0]*E,h+=o[M+1]*E,i+=o[M+2]*E),u+=E}}if(u<=0){let c=(r*a+t)*4;return[o[c+0],o[c+1],o[c+2]]}if(n){let c=Math.hypot(s,h,i)||1;return[Math.max(0,Math.min(255,Math.round(s/c*127+128))),Math.max(0,Math.min(255,Math.round(h/c*127+128))),Math.max(0,Math.min(255,Math.round(i/c*127+128)))]}return[s/u,h/u,i/u]}function st(o,e,t,r,a){let n=t*t,s=new Uint8Array(n);if(a&&a.triangles.length>0&&a.isAtlas){let h=Et(a.triangles,t),i=!1;for(let c=0;c<n;c++)h[c]===1&&e[c]>=230&&(s[c]=1,i=!0);i||s.fill(1);let u=new Uint8Array(n);for(let c=1;c<t-1;c++)for(let f=1;f<t-1;f++){let p=c*t+f;s[p]===1&&s[p-1]===1&&s[p+1]===1&&s[p-t]===1&&s[p+t]===1&&(u[p]=1)}if(!r){let c=new Uint8Array(o);for(let f=1;f<t-1;f++)for(let p=1;p<t-1;p++){let d=f*t+p;if(s[d]===1&&u[d]===0){let v=d*4,E=c[v]*.299+c[v+1]*.587+c[v+2]*.114,M=0,T=0,R=0,b=0,m=0;for(let l=-1;l<=1;l++)for(let y=-1;y<=1;y++){let g=(f+l)*t+(p+y);if(u[g]===1){let x=g*4,S=c[x]*.299+c[x+1]*.587+c[x+2]*.114;S>m&&(m=S),M+=c[x],T+=c[x+1],R+=c[x+2],b++}}b>0&&E<m*.78&&(o[v+0]=Math.round(M/b),o[v+1]=Math.round(T/b),o[v+2]=Math.round(R/b))}}}if(a.seamPairs.length>0){let c=new Uint8Array(o),f=[.92,.62,.3,.12],p=(d,v,E,M,T,R)=>{if(d<0||d>=t||v<0||v>=t)return;let b=v*t+d;if(s[b]===0)return;let m=b*4,l=1-R;if(r){let y=(c[m+0]-128)*l+(E-128)*R,g=(c[m+1]-128)*l+(M-128)*R,x=(c[m+2]-128)*l+(T-128)*R,S=Math.hypot(y,g,x)||1;o[m+0]=Math.max(0,Math.min(255,Math.round(y/S*127+128))),o[m+1]=Math.max(0,Math.min(255,Math.round(g/S*127+128))),o[m+2]=Math.max(0,Math.min(255,Math.round(x/S*127+128)))}else o[m+0]=Math.round(c[m+0]*l+E*R),o[m+1]=Math.round(c[m+1]*l+M*R),o[m+2]=Math.round(c[m+2]*l+T*R)};for(let d of a.seamPairs){let v=Math.hypot(d.uB1-d.uA1,d.vB1-d.vA1)*t,E=Math.hypot(d.uB2-d.uA2,d.vB2-d.vA2)*t,M=Math.max(2,Math.min(1024,Math.ceil(Math.max(v,E))));for(let T=0;T<=M;T++){let R=T/M,b=Fe(d.uA1+(d.uB1-d.uA1)*R,t,!0),m=Fe(d.vA1+(d.vB1-d.vA1)*R,t,!0),l=Fe(d.uA2+(d.uB2-d.uA2)*R,t,!0),y=Fe(d.vA2+(d.vB2-d.vA2)*R,t,!0),g=at(c,u,b,m,t,r),x=at(c,u,l,y,t,r),S=r?g:[(g[0]+x[0])*.5,(g[1]+x[1])*.5,(g[2]+x[2])*.5],L=r?x:S;for(let P=-3;P<=3;P++)for(let I=-3;I<=3;I++){let _=Math.round(Math.hypot(I,P));if(_>=f.length)continue;let ee=r?f[_]*.88:f[_];p(b+I,m+P,S[0],S[1],S[2],ee),p(l+I,y+P,L[0],L[1],L[2],ee)}}}}rt(o,s,t,14,r)}else{let h=!1;for(let i=0;i<n;i++)e[i]>=230?s[i]=1:h=!0;h&&rt(o,s,t,14,r)}}var Q=256,Ne=8,oe=1024,ge=8,we=100;var Le={none:0,"brushed-metal":1,"carbon-weave":2,vulcanite:3,guilloche:4,concrete:5,"cedar-wood":6,travertine:7};function Ge(o,e,t,r){let a=(o%t+t)%t,n=(e%r+r)%r,s=a*374761393+n*668265263;return s=(s^s>>13)*1274126177,((s^s>>16)>>>0)/4294967295}function qe(o,e,t,r){let a=o*t,n=e*r,s=Math.floor(a),h=Math.floor(n),i=a-s,u=n-h,c=i*i*(3-2*i),f=u*u*(3-2*u),p=Ge(s,h,t,r),d=Ge(s+1,h,t,r),v=Ge(s,h+1,t,r),E=Ge(s+1,h+1,t,r);return p+(d-p)*c+(v-p)*f+(p-d-v+E)*c*f}function Mt(o,e,t){return qe(o,e,t,t)}function je(o,e,t,r,a=4){let n=0,s=.5,h=0,i=t,u=r;for(let c=0;c<a;c++)n+=qe(o,e,i,u)*s,h+=s,s*=.5,i*=2,u*=2;return n/h}function Pe(o,e,t,r=4){return je(o,e,t,t,r)}function Rt(o,e,t,r,a){for(let n=0;n<e;n++){let s=(n-1+e)%e,h=(n+1)%e;for(let i=0;i<e;i++){let u=(i-1+e)%e,c=(i+1)%e,f=o[n*e+u],p=o[n*e+c],d=o[s*e+i],v=o[h*e+i],E=(f-p)*t,M=(d-v)*t,T=1,R=Math.sqrt(E*E+M*M+T*T),b=a+(n*e+i)*4;r[b+0]=Math.round((E/R*.5+.5)*255),r[b+1]=Math.round((M/R*.5+.5)*255),r[b+2]=Math.round((T/R*.5+.5)*255),r[b+3]=255}}}var Ve=class{constructor(e){C(this,"albedoArray");C(this,"normalArray");C(this,"roughMetalArray");C(this,"customAlbedoArray");C(this,"customNormalArray");C(this,"customRoughMetalArray");C(this,"albedoBytes");C(this,"normalBytes");C(this,"roughMetalBytes");C(this,"customAllocated",!1);C(this,"customAlbedoBytes",null);C(this,"customNormalBytes",null);C(this,"customRoughMetalBytes",null);C(this,"customIsAtlas",new Array(ge).fill(!1));C(this,"threeMapsCache",new Map);C(this,"nextCustomSlice",0);C(this,"maxAnisotropy");this.maxAnisotropy=Math.min(8,Math.max(1,e));let r=Q*Q*4*Ne;this.albedoBytes=new Uint8Array(r),this.normalBytes=new Uint8Array(r),this.roughMetalBytes=new Uint8Array(r);for(let a=0;a<Ne;a++)this.fillNeutralPresetLayer(a);this.generatePresetLayer("brushed-metal",1),this.generatePresetLayer("carbon-weave",2),this.generatePresetLayer("vulcanite",3),this.generatePresetLayer("guilloche",4),this.generatePresetLayer("concrete",5),this.generatePresetLayer("cedar-wood",6),this.generatePresetLayer("travertine",7),this.albedoArray=this.createArrayTexture(this.albedoBytes,Q,Ne),this.normalArray=this.createArrayTexture(this.normalBytes,Q,Ne),this.roughMetalArray=this.createArrayTexture(this.roughMetalBytes,Q,Ne),this.customAlbedoArray=this.createDummyArrayTex([255,255,255,255]),this.customNormalArray=this.createDummyArrayTex([128,128,255,255]),this.customRoughMetalArray=this.createDummyArrayTex([255,255,255,255])}createDummyArrayTex(e){let t=new N.DataArrayTexture(new Uint8Array(e),1,1,1);return t.format=N.RGBAFormat,t.type=N.UnsignedByteType,t.minFilter=N.LinearFilter,t.magFilter=N.LinearFilter,t.wrapS=N.RepeatWrapping,t.wrapT=N.RepeatWrapping,t.generateMipmaps=!1,t.needsUpdate=!0,t}createArrayTexture(e,t,r){let a=new N.DataArrayTexture(e,t,t,r);return a.format=N.RGBAFormat,a.type=N.UnsignedByteType,a.minFilter=N.LinearFilter,a.magFilter=N.LinearFilter,a.wrapS=N.RepeatWrapping,a.wrapT=N.RepeatWrapping,a.generateMipmaps=!1,a.needsUpdate=!0,a}ensureCustomAllocated(){if(this.customAllocated)return;let t=oe*oe*4*ge;this.customAlbedoBytes=new Uint8Array(t),this.customNormalBytes=new Uint8Array(t),this.customRoughMetalBytes=new Uint8Array(t);for(let r=0;r<ge;r++)this.fillNeutralCustomSlice(r);this.customAlbedoArray.dispose(),this.customNormalArray.dispose(),this.customRoughMetalArray.dispose(),this.customAlbedoArray=this.createArrayTexture(this.customAlbedoBytes,oe,ge),this.customNormalArray=this.createArrayTexture(this.customNormalBytes,oe,ge),this.customRoughMetalArray=this.createArrayTexture(this.customRoughMetalBytes,oe,ge),this.customAllocated=!0}fillNeutralPresetLayer(e){let t=Q*Q*4,r=e*t;for(let a=0;a<Q*Q;a++){let n=r+a*4;this.albedoBytes[n+0]=255,this.albedoBytes[n+1]=255,this.albedoBytes[n+2]=255,this.albedoBytes[n+3]=255,this.normalBytes[n+0]=128,this.normalBytes[n+1]=128,this.normalBytes[n+2]=255,this.normalBytes[n+3]=255,this.roughMetalBytes[n+0]=255,this.roughMetalBytes[n+1]=255,this.roughMetalBytes[n+2]=255,this.roughMetalBytes[n+3]=255}}fillNeutralCustomSlice(e){if(!this.customAlbedoBytes||!this.customNormalBytes||!this.customRoughMetalBytes)return;let t=oe*oe,r=e*t*4;for(let a=0;a<t;a++){let n=r+a*4;this.customAlbedoBytes[n+0]=255,this.customAlbedoBytes[n+1]=255,this.customAlbedoBytes[n+2]=255,this.customAlbedoBytes[n+3]=255,this.customNormalBytes[n+0]=128,this.customNormalBytes[n+1]=128,this.customNormalBytes[n+2]=255,this.customNormalBytes[n+3]=255,this.customRoughMetalBytes[n+0]=255,this.customRoughMetalBytes[n+1]=255,this.customRoughMetalBytes[n+2]=255,this.customRoughMetalBytes[n+3]=255}}upscalePresetToCustomSlice(e,t){if(!this.customAlbedoBytes||!this.customNormalBytes||!this.customRoughMetalBytes)return;let r=oe/Q,a=e*Q*Q*4,n=t*oe*oe*4,s=(h,i,u)=>{for(let c=0;c<oe;c++){let f=Math.min(Q-1,Math.floor(c/r));for(let p=0;p<oe;p++){let d=Math.min(Q-1,Math.floor(p/r)),v=a+(f*Q+d)*4,E=n+(c*oe+p)*4;i[E+0]=h[v+0],i[E+1]=h[v+1],i[E+2]=h[v+2],i[E+3]=u?255:h[v+3]}}};s(this.albedoBytes,this.customAlbedoBytes,!1),s(this.normalBytes,this.customNormalBytes,!0),s(this.roughMetalBytes,this.customRoughMetalBytes,!1)}generatePresetLayer(e,t){let r=Q,a=new Float32Array(r*r),n=t*r*r*4,s=2;for(let h=0;h<r;h++){let i=h/r;for(let u=0;u<r;u++){let c=u/r,f=h*r+u,p=n+f*4,d=255,v=255,E=255,M=1,T=.5;if(e==="brushed-metal"){let b=je(c,i,2,32,3),m=qe(c,i,8,96),l=.85+b*.11+m*.04;d=v=E=Math.round(l*255),T=b*.72+m*.28,M=.78+b*.42,s=1.4}else if(e==="carbon-weave"){let m=c*12,l=i*12,y=Math.floor(m),g=Math.floor(l),x=m-y,S=l-g,P=(y+g)%4<2,I=P?Math.sin(x*Math.PI)*(.85+.15*Math.sin(S*Math.PI*6)):Math.sin(S*Math.PI)*(.85+.15*Math.sin(x*Math.PI*6)),_=P?.52+I*.42:.38+I*.36;d=v=E=Math.round(_*255),T=I,M=P?.55+(1-I)*.45:.82+(1-I)*.35,s=3.2}else if(e==="vulcanite"){let b=Pe(c,i,24,3),m=Mt(c,i,48),l=Math.pow(b*.72+m*.28,1.35),y=.7+l*.3;d=v=E=Math.round(y*255),T=l,M=.85+(1-l)*.35,s=4}else if(e==="guilloche"){let b=c-.5,m=i-.5,l=Math.sqrt(b*b+m*m),y=Math.atan2(m,b),g=Math.cos(y*48)*.5+.5,x=Math.cos(l*Math.PI*44)*.5+.5,S=Math.max(Math.abs(b),Math.abs(m)),L=S<.44?1:Math.max(0,(.5-S)/.06),P=.5+(g*.55+x*.45-.5)*L,I=.65+P*.35;d=v=E=Math.round(I*255),T=P,M=.6+(1-P)*.5,s=2.4}else if(e==="concrete"){let b=Pe(c,i,6,4),m=Pe(c,i,24,3),l=m<.32?(.32-m)*1.8:0,y=Math.abs((i*4+.5)%1-.5)>.486?.12:0,g=Math.max(.45,Math.min(1,.78+(b-.5)*.28-l*.4-y));d=Math.round(g*255),v=Math.round(g*.99*255),E=Math.round(g*.96*255),T=b*.65+m*.35-l*.5-y,M=.85+l*.3+(1-b)*.2,s=3}else if(e==="cedar-wood"){let b=Pe(c,i,4,3)*.35,m=Math.sin((c*10+b*8)*Math.PI*2)*.5+.5,l=je(c,i,24,3,3),y=m*.65+l*.35;d=Math.round((.68+y*.32)*255),v=Math.round((.54+y*.3)*255),E=Math.round((.42+y*.26)*255),T=y*.7+l*.3,M=.78+(1-y)*.38,s=2.2}else if(e==="travertine"){let b=Pe(c,i,4,4),m=Math.pow(Math.abs(Math.sin((i*3+b*2.2)*Math.PI)),.35),l=Pe(c*2,i*4,16,3),y=l<.28?(.28-l)*1.4:0,g=Math.max(.55,Math.min(1,.72+m*.26-y*.35));d=Math.round(g*255),v=Math.round(g*.96*255),E=Math.round(g*.9*255),T=m*.6+l*.4-y*.7,M=.72+y*.6+(1-m)*.25,s=2.6}a[f]=T,this.albedoBytes[p+0]=d,this.albedoBytes[p+1]=v,this.albedoBytes[p+2]=E,this.albedoBytes[p+3]=255;let R=Math.max(12,Math.min(255,Math.round(M*255)));this.roughMetalBytes[p+0]=R,this.roughMetalBytes[p+1]=R,this.roughMetalBytes[p+2]=255,this.roughMetalBytes[p+3]=255}}Rt(a,r,s,this.normalBytes,n)}allocateCustomLayer(e="none",t=!1){this.ensureCustomAllocated();let r=this.nextCustomSlice;this.nextCustomSlice=this.nextCustomSlice>=ge-1?0:this.nextCustomSlice+1;let a=Le[e];a===0?this.fillNeutralCustomSlice(r):this.upscalePresetToCustomSlice(a,r),this.customIsAtlas[r]=t;let n=we+r;return this.customAlbedoArray.addLayerUpdate(r),this.customNormalArray.addLayerUpdate(r),this.customRoughMetalArray.addLayerUpdate(r),this.invalidateLayer(n),n}writeImageToLayer(e,t,r,a=!1,n){if(e<we||(this.ensureCustomAllocated(),!this.customAlbedoBytes||!this.customNormalBytes||!this.customRoughMetalBytes))return;let s=e-we;if(s<0||s>=ge)return;n&&(this.customIsAtlas[s]=n.isAtlas);let h=oe,i=document.createElement("canvas");i.width=h,i.height=h;let u=i.getContext("2d");if(!u)return;u.imageSmoothingEnabled=!0,u.imageSmoothingQuality="high",a?(u.save(),u.translate(0,h),u.scale(1,-1),u.drawImage(r,0,0,h,h),u.restore()):u.drawImage(r,0,0,h,h);let c=u.getImageData(0,0,h,h).data,f=h*h,p=f*4,d=s*p,v=new Uint8Array(p),E=new Uint8Array(f);for(let M=0;M<f;M++){let T=M*4;E[M]=c[T+3],v[T+0]=c[T+0],v[T+1]=c[T+1],v[T+2]=c[T+2],v[T+3]=255}st(v,E,h,t==="normal",n),t==="albedo"?(this.customAlbedoBytes.set(v,d),this.customAlbedoArray.addLayerUpdate(s),this.customAlbedoArray.needsUpdate=!0):t==="normal"?(this.customNormalBytes.set(v,d),this.customNormalArray.addLayerUpdate(s),this.customNormalArray.needsUpdate=!0):(this.customRoughMetalBytes.set(v,d),this.customRoughMetalArray.addLayerUpdate(s),this.customRoughMetalArray.needsUpdate=!0),this.invalidateLayer(e)}async writeFileToLayer(e,t,r,a){let n=URL.createObjectURL(r);try{let s=await new Promise((h,i)=>{let u=new Image;u.onload=()=>h(u),u.onerror=()=>i(new Error(`Unable to decode image ${r.name}`)),u.src=n});this.writeImageToLayer(e,t,s,!1,a)}finally{URL.revokeObjectURL(n)}}getLayerShaderInfo(e){if(e>=we){let t=Math.max(0,Math.min(ge-1,e-we));return{slice:t,modeFlag:this.customIsAtlas[t]?2:1}}return{slice:e,modeFlag:0}}invalidateLayer(e){let t=this.threeMapsCache.get(e);t&&(t.map?.dispose(),t.normalMap?.dispose(),t.roughnessMap?.dispose(),this.threeMapsCache.delete(e)),this.albedoArray.needsUpdate=!0,this.normalArray.needsUpdate=!0,this.roughMetalArray.needsUpdate=!0,this.customAlbedoArray.needsUpdate=!0,this.customNormalArray.needsUpdate=!0,this.customRoughMetalArray.needsUpdate=!0}getThreeMapsForLayer(e,t){if(e===0)return{map:null,normalMap:null,roughnessMap:null};let r=e>=we,a=r?e-we:e,n=r?oe:Q,s=r&&!!this.customIsAtlas[a],h=this.threeMapsCache.get(e);if(!h){let u=r?this.customAlbedoBytes:this.albedoBytes,c=r?this.customNormalBytes:this.normalBytes,f=r?this.customRoughMetalBytes:this.roughMetalBytes;if(!u||!c||!f)return{map:null,normalMap:null,roughnessMap:null};let p=n*n*4,d=a*p,v=(E,M)=>{let T=new Uint8Array(p);T.set(E.subarray(d,d+p));let R=new N.DataTexture(T,n,n,N.RGBAFormat);R.colorSpace=M?N.SRGBColorSpace:N.NoColorSpace;let b=s&&t<=1.02?N.ClampToEdgeWrapping:N.RepeatWrapping;return R.wrapS=b,R.wrapT=b,R.minFilter=N.LinearMipmapLinearFilter,R.magFilter=N.LinearFilter,R.generateMipmaps=!0,R.anisotropy=this.maxAnisotropy,R.needsUpdate=!0,R};h={map:v(u,!0),normalMap:v(c,!1),roughnessMap:v(f,!1)},this.threeMapsCache.set(e,h)}let i=s&&t<=1.02?N.ClampToEdgeWrapping:N.RepeatWrapping;return[h.map,h.normalMap,h.roughnessMap].forEach(u=>{u&&(u.repeat.set(t,t),(u.wrapS!==i||u.wrapT!==i)&&(u.wrapS=i,u.wrapT=i,u.needsUpdate=!0))}),h}resetCustomCounter(){this.nextCustomSlice=0,this.customIsAtlas.fill(!1);for(let e of Array.from(this.threeMapsCache.keys()))if(e>=we){let t=this.threeMapsCache.get(e);t?.map?.dispose(),t?.normalMap?.dispose(),t?.roughnessMap?.dispose(),this.threeMapsCache.delete(e)}}dispose(){this.albedoArray.dispose(),this.normalArray.dispose(),this.roughMetalArray.dispose(),this.customAlbedoArray.dispose(),this.customNormalArray.dispose(),this.customRoughMetalArray.dispose();for(let e of this.threeMapsCache.values())e.map?.dispose(),e.normalMap?.dispose(),e.roughnessMap?.dispose();this.threeMapsCache.clear()}};function Bt(o,e){let t=new V.MeshPhysicalMaterial({color:new V.Color(o.color),roughness:o.roughness,metalness:o.metalness,ior:o.ior,clearcoat:o.clearcoat,clearcoatRoughness:Math.max(.04,o.roughness*.4),envMapIntensity:1.05});return o.transmission>.05&&(e?(t.transparent=!0,t.opacity=Math.max(.28,1-o.transmission*.65),t.depthWrite=!1):(t.transmission=o.transmission,t.thickness=.65,t.attenuationColor=new V.Color(o.color),t.attenuationDistance=1.6)),o.emissiveIntensity>.01&&(t.emissive=new V.Color(o.color),t.emissiveIntensity=o.emissiveIntensity),t}async function it(o,e,t,r){let a=o.name.split(".").pop()?.toLowerCase()??"",n=await o.arrayBuffer(),s;if(a==="glb"||a==="gltf"){let m=new At;s=(await new Promise((y,g)=>{m.parse(n,"",x=>y(x),g)})).scene}else if(a==="obj"){let m=new TextDecoder().decode(n);s=new Ht().parse(m)}else if(a==="stl"){let l=new wt().parse(n);l.computeVertexNormals();let y=new V.Mesh(l);s=new V.Group,s.add(y)}else throw new Error(`Unsupported format ".${a}". Please import GLB, GLTF, OBJ, or STL.`);s.updateMatrixWorld(!0);let h=new V.Box3().setFromObject(s);if(h.isEmpty())throw new Error("The imported file contains no renderable 3D geometry.");let i=new V.Vector3,u=new V.Vector3;h.getSize(i),h.getCenter(u);let f=1.45/Math.max(i.x,i.y,i.z,1e-4),p=new V.Vector3(-u.x*f,-h.min.y*f,-u.z*f),d=new V.Group;s.position.copy(p),s.scale.setScalar(f),d.add(s),d.updateMatrixWorld(!0);let v=[],E=new Map,M=new Map,T=new Map,R=new Map,b=1;if(d.traverse(m=>{let l=m;if(!l.isMesh||!l.geometry)return;let y=l.geometry;y.getAttribute("normal")||y.computeVertexNormals(),y.getAttribute("uv")||(l.geometry=nt(y,1));let g=Array.isArray(l.material)?l.material[0]:l.material,x=g,S=g?g.uuid:"imported_default",L=E.get(S);if(!L)if(v.length>=20)L=v[0].id;else{L=`imported_mat_${v.length+1}`,E.set(S,L),T.set(L,x);let te=x&&x.color?`#${x.color.getHexString()}`:v.length===0?"#cfd3d9":"#9ca3af",Ie=x&&typeof x.roughness=="number"?x.roughness:.45,q=x&&typeof x.metalness=="number"?x.metalness:.15,U=x&&x.name||l.name||`Surface ${v.length+1}`,K=!!x?.map?.image,Ce=!!x?.normalMap?.image,ce=!!x?.roughnessMap?.image,G=!!x?.metalnessMap?.image,w=x?.normalScale&&typeof x.normalScale.x=="number"?Math.max(0,Math.min(2,x.normalScale.x)):1;v.push({id:L,name:U.slice(0,24),color:te,roughness:Math.max(.03,Math.min(1,Ie)),metalness:Math.max(0,Math.min(1,q)),ior:1.5,transmission:0,clearcoat:.1,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:w,hasCustomAlbedo:K,hasCustomNormal:Ce,hasCustomRoughness:ce,hasCustomMetalness:G})}let P=v.find(te=>te.id===L),I=Bt(P,e);l.material=I,l.castShadow=!0,l.receiveShadow=!0,l.userData.materialId=L,l.userData.partName=l.name||`Mesh Part ${b++}`;let _=M.get(L)??[];_.push(l),M.set(L,_);let ee=R.get(L)??[];ee.push(l.geometry),R.set(L,ee)}),v.length===0)throw new Error("No mesh triangles found in the imported file.");if(t&&r)for(let m of v){let l=T.get(m.id),y=!!l?.map?.image,g=!!l?.normalMap?.image,x=!!l?.roughnessMap?.image,S=!!l?.metalnessMap?.image;if(y||g||x||S){let L=R.get(m.id)??[],P=ot(L),I=t.allocateCustomLayer("none",P.isAtlas);l?.map?.image&&t.writeImageToLayer(I,"albedo",l.map.image,!!l.map.flipY,P),l?.normalMap?.image&&t.writeImageToLayer(I,"normal",l.normalMap.image,!!l.normalMap.flipY,P);let _=l?.roughnessMap?.image?l.roughnessMap:l?.metalnessMap;_?.image&&t.writeImageToLayer(I,"roughness",_.image,!!_.flipY,P),r.set(m.id,I)}else r.set(m.id,0)}return{group:d,materials:v,meshMap:M,rayTransform:{scale:f,offset:p}}}import*as H from"three";function lt(o){let e=Math.max(1e3,Math.min(4e4,o))/100,t,r,a;return e<=66?(t=255,r=99.4708025861*Math.log(e)-161.1195681661,a=e<=19?0:138.5177312231*Math.log(e-10)-305.0447927307):(t=329.698727446*Math.pow(e-60,-.1332047592),r=288.1221695283*Math.pow(e-60,-.0755148492),a=255),[Math.max(0,Math.min(255,t))/255,Math.max(0,Math.min(255,r))/255,Math.max(0,Math.min(255,a))/255]}function Ke(o){let e=o.replace("#",""),t=parseInt(e.length===3?e.split("").map(h=>h+h).join(""):e,16),r=h=>h<=.04045?h/12.92:Math.pow((h+.055)/1.055,2.4),a=(t>>16&255)/255,n=(t>>8&255)/255,s=(t&255)/255;return[r(a),r(n),r(s)]}function ct(o,e,t){let r=o*Math.PI/180,a=e*Math.PI/180,n=Math.cos(a),s=t*n*Math.sin(r),h=t*Math.sin(a),i=t*n*Math.cos(r);return[s,h,i]}var Se=4,le=24,ut=`precision highp float;
in vec3 position;
in vec2 uv;
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,St=`precision highp float;
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
uniform vec4 uLightPosRadius[${Se}];
uniform vec4 uLightColorEnabled[${Se}];

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
      for (int li = 0; li < ${Se}; li++) {
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
    for (int li = 0; li < ${Se}; li++) {
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
`,Ct={studio:0,golden:1,loft:2,cornell:3,obsidian:4},Ue=class{constructor(e){C(this,"renderer");C(this,"quadScene");C(this,"quadCamera");C(this,"quadMesh");C(this,"traceMat");C(this,"displayMat");C(this,"rtA");C(this,"rtB");C(this,"pingPong",0);C(this,"sampleIndex",0);C(this,"width",640);C(this,"height",480);C(this,"targetType");C(this,"bvhData",null);C(this,"dummyTex");C(this,"dummyArrayTex");C(this,"camPos",new H.Vector3);C(this,"camRight",new H.Vector3);C(this,"camUp",new H.Vector3);C(this,"camForward",new H.Vector3);this.renderer=e;let t=e.getContext(),r=!!t.getExtension("EXT_color_buffer_float"),a=!!t.getExtension("EXT_color_buffer_half_float");this.targetType=r?H.FloatType:a?H.HalfFloatType:H.UnsignedByteType,this.rtA=this.createTarget(this.width,this.height),this.rtB=this.createTarget(this.width,this.height);let n=Array.from({length:Se},()=>new H.Vector4),s=Array.from({length:Se},()=>new H.Vector4),h=Array.from({length:le},()=>new H.Vector4(.8,.8,.8,.4)),i=Array.from({length:le},()=>new H.Vector4(0,1.5,0,0)),u=Array.from({length:le},()=>new H.Vector4(0,0,0,0)),c=Array.from({length:le},()=>new H.Vector4(0,1,1,0));this.dummyTex=new H.DataTexture(new Float32Array(4),1,1,H.RGBAFormat,H.FloatType),this.dummyTex.needsUpdate=!0,this.dummyArrayTex=new H.DataArrayTexture(new Uint8Array([255,255,255,255]),1,1,1),this.dummyArrayTex.format=H.RGBAFormat,this.dummyArrayTex.type=H.UnsignedByteType,this.dummyArrayTex.minFilter=H.LinearFilter,this.dummyArrayTex.magFilter=H.LinearFilter,this.dummyArrayTex.needsUpdate=!0,this.traceMat=new H.RawShaderMaterial({glslVersion:H.GLSL3,vertexShader:ut,fragmentShader:St,depthTest:!1,depthWrite:!1,uniforms:{uPrevFrame:{value:this.rtA.texture},uBvhTex:{value:this.dummyTex},uTriPosTex:{value:this.dummyTex},uTriNormTex:{value:this.dummyTex},uTriUvTex:{value:this.dummyTex},uAlbedoArray:{value:this.dummyArrayTex},uNormalArray:{value:this.dummyArrayTex},uRoughMetalArray:{value:this.dummyArrayTex},uCustomAlbedoArray:{value:this.dummyArrayTex},uCustomNormalArray:{value:this.dummyArrayTex},uCustomRoughMetalArray:{value:this.dummyArrayTex},uTexWidth:{value:1024},uSampleIndex:{value:0},uMaxBounces:{value:4},uClayMode:{value:0},uEnvMode:{value:0},uEnvIntensity:{value:.85},uResolution:{value:new H.Vector2(this.width,this.height)},uCamPos:{value:new H.Vector3},uCamRight:{value:new H.Vector3(1,0,0)},uCamUp:{value:new H.Vector3(0,1,0)},uCamForward:{value:new H.Vector3(0,0,-1)},uTanHalfFov:{value:.35},uAspect:{value:1.33},uLightPosRadius:{value:n},uLightColorEnabled:{value:s},uMatA:{value:h},uMatB:{value:i},uMatC:{value:u},uMatD:{value:c}}}),this.displayMat=new H.RawShaderMaterial({glslVersion:H.GLSL3,vertexShader:ut,fragmentShader:It,depthTest:!1,depthWrite:!1,uniforms:{uAccumTex:{value:this.rtB.texture},uResolution:{value:new H.Vector2(this.width,this.height)},uExposure:{value:1.08},uDenoiser:{value:1},uSampleCount:{value:1}}});let f=new H.PlaneGeometry(2,2);this.quadMesh=new H.Mesh(f,this.traceMat),this.quadMesh.frustumCulled=!1,this.quadScene=new H.Scene,this.quadScene.add(this.quadMesh),this.quadCamera=new H.OrthographicCamera(-1,1,1,-1,0,1)}createTarget(e,t){return new H.WebGLRenderTarget(e,t,{minFilter:H.NearestFilter,magFilter:H.NearestFilter,format:H.RGBAFormat,type:this.targetType,depthBuffer:!1,stencilBuffer:!1})}setTextureArrays(e){this.traceMat.uniforms.uAlbedoArray.value=e.albedoArray,this.traceMat.uniforms.uNormalArray.value=e.normalArray,this.traceMat.uniforms.uRoughMetalArray.value=e.roughMetalArray,this.traceMat.uniforms.uCustomAlbedoArray.value=e.customAlbedoArray,this.traceMat.uniforms.uCustomNormalArray.value=e.customNormalArray,this.traceMat.uniforms.uCustomRoughMetalArray.value=e.customRoughMetalArray,this.resetAccumulation()}setBVH(e){this.bvhData&&(this.bvhData.bvhTexture.dispose(),this.bvhData.triPosTexture.dispose(),this.bvhData.triNormTexture.dispose(),this.bvhData.triUvTexture.dispose()),this.bvhData=e,this.traceMat.uniforms.uBvhTex.value=e.bvhTexture,this.traceMat.uniforms.uTriPosTex.value=e.triPosTexture,this.traceMat.uniforms.uTriNormTex.value=e.triNormTexture,this.traceMat.uniforms.uTriUvTex.value=e.triUvTexture,this.traceMat.uniforms.uTexWidth.value=e.texWidth,this.resetAccumulation()}resize(e,t){let r=Math.max(64,Math.floor(e)),a=Math.max(64,Math.floor(t));r===this.width&&a===this.height||(this.width=r,this.height=a,this.rtA.setSize(r,a),this.rtB.setSize(r,a),this.traceMat.uniforms.uResolution.value.set(r,a),this.displayMat.uniforms.uResolution.value.set(r,a),this.resetAccumulation())}resetAccumulation(){this.sampleIndex=0}getSamples(){return this.sampleIndex}getResolution(){return[this.width,this.height]}syncLights(e){let t=this.traceMat.uniforms.uLightPosRadius.value,r=this.traceMat.uniforms.uLightColorEnabled.value;for(let a=0;a<Se;a++){let n=e[a];if(!n){r[a].set(0,0,0,0);continue}let[s,h,i]=ct(n.azimuth,n.elevation,n.distance);t[a].set(s,h,i,n.radius);let u=1,c=1,f=1;if(n.useKelvin){let[d,v,E]=lt(n.kelvin);u=Math.pow(d,2.2),c=Math.pow(v,2.2),f=Math.pow(E,2.2)}else[u,c,f]=Ke(n.color);let p=n.intensity*.48;r[a].set(u*p,c*p,f*p,n.enabled?1:0)}}syncMaterials(e,t,r){if(!this.bvhData)return;let a=this.traceMat.uniforms.uMatA.value,n=this.traceMat.uniforms.uMatB.value,s=this.traceMat.uniforms.uMatC.value,h=this.traceMat.uniforms.uMatD.value;for(let i of e){let u=this.bvhData.materialIdToIndex.get(i.id);if(u===void 0||u>=le)continue;let[c,f,p]=Ke(i.color),d=t?.get(i.id)??Le[i.texturePreset]??0,{slice:v,modeFlag:E}=r?r.getLayerShaderInfo(d):{slice:d>=100?d-100:d,modeFlag:d>=100?1:0};a[u].set(c,f,p,i.roughness),n[u].set(i.metalness,i.ior,i.transmission,i.clearcoat),s[u].set(i.emissiveIntensity,0,0,0),s[u].y=i.hasCustomMetalness?1:0,h[u].set(v,i.uvScale,i.normalStrength,E)}}traceSample(e,t,r,a,n,s,h){this.syncLights(t),this.syncMaterials(r,s,h),e.updateMatrixWorld(),this.camPos.copy(e.position),e.matrixWorld.extractBasis(this.camRight,this.camUp,this.camForward),this.camForward.negate();let i=Math.tan(H.MathUtils.degToRad(e.fov*.5)),u=this.traceMat.uniforms;u.uCamPos.value.copy(this.camPos),u.uCamRight.value.copy(this.camRight),u.uCamUp.value.copy(this.camUp),u.uCamForward.value.copy(this.camForward),u.uTanHalfFov.value=i,u.uAspect.value=e.aspect,u.uSampleIndex.value=this.sampleIndex,u.uMaxBounces.value=n?Math.min(2,a.maxBounces):a.maxBounces,u.uClayMode.value=a.clayMode?1:0,u.uEnvMode.value=Ct[a.environment],u.uEnvIntensity.value=a.envIntensity;let c=this.pingPong===0?this.rtA:this.rtB,f=this.pingPong===0?this.rtB:this.rtA;u.uPrevFrame.value=c.texture,this.quadMesh.material=this.traceMat;let p=this.renderer.getRenderTarget(),d=this.renderer.autoClear;this.renderer.autoClear=!1,this.renderer.setRenderTarget(f),this.renderer.render(this.quadScene,this.quadCamera),this.renderer.setRenderTarget(p),this.renderer.autoClear=d,this.pingPong=1-this.pingPong,this.sampleIndex++}displayToScreen(e,t){let r=this.pingPong===0?this.rtA:this.rtB;this.displayMat.uniforms.uAccumTex.value=r.texture,this.displayMat.uniforms.uExposure.value=e.exposure,this.displayMat.uniforms.uDenoiser.value=e.denoiser?1:0,this.displayMat.uniforms.uSampleCount.value=Math.max(1,this.sampleIndex),this.quadMesh.material=this.displayMat;let a=this.renderer.autoClear;this.renderer.autoClear=!1,this.renderer.setRenderTarget(null),t?(this.renderer.setScissorTest(!0),this.renderer.setScissor(t.x,t.y,t.w,t.h),this.renderer.render(this.quadScene,this.quadCamera),this.renderer.setScissorTest(!1)):this.renderer.render(this.quadScene,this.quadCamera),this.renderer.autoClear=a}dispose(){this.rtA.dispose(),this.rtB.dispose(),this.traceMat.dispose(),this.displayMat.dispose(),this.quadMesh.geometry.dispose(),this.dummyTex.dispose(),this.dummyArrayTex.dispose(),this.bvhData&&(this.bvhData.bvhTexture.dispose(),this.bvhData.triPosTexture.dispose(),this.bvhData.triNormTexture.dispose(),this.bvhData.triUvTexture.dispose())}};var Z=[{id:"key",name:"Key Softbox",role:"key",enabled:!0,useKelvin:!0,kelvin:5200,color:"#fff4e6",intensity:24,azimuth:42,elevation:46,distance:4.4,radius:.65},{id:"fill",name:"Cool Fill",role:"fill",enabled:!0,useKelvin:!0,kelvin:7600,color:"#d8e8ff",intensity:10,azimuth:-58,elevation:28,distance:4.8,radius:1.1},{id:"rim",name:"Edge Rim",role:"rim",enabled:!0,useKelvin:!0,kelvin:3600,color:"#ffd19c",intensity:18,azimuth:-145,elevation:36,distance:4.2,radius:.35},{id:"accent",name:"Overhead Bounce",role:"accent",enabled:!1,useKelvin:!0,kelvin:6200,color:"#eef5ff",intensity:12,azimuth:10,elevation:78,distance:4.5,radius:1.2}],mt=[{id:"three-point",name:"Three-Point Studio",environment:"studio",envIntensity:.85,lights:Z},{id:"golden-hour",name:"Golden Hour",environment:"golden",envIntensity:1.15,lights:[{...Z[0],kelvin:3100,intensity:30,azimuth:64,elevation:18,radius:.45},{...Z[1],kelvin:8200,intensity:8,azimuth:-100,elevation:42,radius:1.3},{...Z[2],kelvin:2600,intensity:22,azimuth:-135,elevation:24,radius:.3},{...Z[3],enabled:!1}]},{id:"chiaroscuro",name:"Chiaroscuro",environment:"obsidian",envIntensity:.15,lights:[{...Z[0],kelvin:4800,intensity:34,azimuth:52,elevation:38,radius:.22},{...Z[1],enabled:!1,intensity:4},{...Z[2],kelvin:5800,intensity:26,azimuth:-152,elevation:40,radius:.18},{...Z[3],enabled:!1}]},{id:"product-softbox",name:"Product Softbox",environment:"loft",envIntensity:1,lights:[{...Z[0],kelvin:5600,intensity:22,azimuth:32,elevation:58,radius:1.25},{...Z[1],kelvin:5600,intensity:14,azimuth:-42,elevation:48,radius:1.25},{...Z[2],kelvin:6500,intensity:16,azimuth:170,elevation:52,radius:.8},{...Z[3],enabled:!0,kelvin:5800,intensity:14,azimuth:0,elevation:82,radius:1.4}]},{id:"cornell-gi",name:"Cornell Bounce",environment:"cornell",envIntensity:.9,lights:[{...Z[0],kelvin:5e3,intensity:24,azimuth:15,elevation:74,distance:3.6,radius:.8},{...Z[1],kelvin:6e3,intensity:6,azimuth:-60,elevation:30,radius:1},{...Z[2],enabled:!1},{...Z[3],enabled:!1}]}],Je=[{id:"brushed-titanium",name:"Brushed Titanium",color:"#b4bac2",roughness:.24,metalness:.96,ior:1.5,transmission:0,clearcoat:.15,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:2,normalStrength:1},{id:"polished-chrome",name:"Mirror Chrome",color:"#eef1f5",roughness:.04,metalness:1,ior:1.5,transmission:0,clearcoat:.2,emissiveIntensity:0,texturePreset:"none",uvScale:1.5,normalStrength:1},{id:"anodized-gold",name:"Satin Brass",color:"#d6a456",roughness:.22,metalness:.94,ior:1.5,transmission:0,clearcoat:.2,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:2,normalStrength:.8},{id:"optical-crystal",name:"Optical Glass",color:"#eef8ff",roughness:.03,metalness:0,ior:1.54,transmission:.96,clearcoat:1,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"smoked-acrylic",name:"Smoked Quartz",color:"#6b7b8c",roughness:.12,metalness:0,ior:1.49,transmission:.82,clearcoat:.9,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"matte-ceramic",name:"Honed Travertine",color:"#d6cfc4",roughness:.72,metalness:0,ior:1.45,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"travertine",uvScale:2,normalStrength:1},{id:"car-lacquer",name:"Carbon Lacquer",color:"#1b1f26",roughness:.24,metalness:.15,ior:1.5,transmission:0,clearcoat:1,emissiveIntensity:0,texturePreset:"carbon-weave",uvScale:2,normalStrength:1},{id:"warm-emissive",name:"Filament Glow",color:"#ffbe6b",roughness:.2,metalness:0,ior:1.45,transmission:0,clearcoat:0,emissiveIntensity:3.5,texturePreset:"none",uvScale:1,normalStrength:0},{id:"brushed-aluminum",name:"Brushed Aluminum",color:"#c5ccd2",roughness:.31,metalness:.94,ior:1.5,transmission:0,clearcoat:.1,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:2.2,normalStrength:.72},{id:"warm-copper",name:"Warm Copper",color:"#b66c46",roughness:.27,metalness:.97,ior:1.5,transmission:0,clearcoat:.18,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:1.8,normalStrength:.68},{id:"black-oxide-steel",name:"Black Oxide Steel",color:"#343a40",roughness:.34,metalness:.93,ior:1.5,transmission:0,clearcoat:.22,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:1.6,normalStrength:.7},{id:"pearl-enamel",name:"Pearl Enamel",color:"#e7e0d5",roughness:.16,metalness:.08,ior:1.48,transmission:0,clearcoat:.92,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"matte-polymer",name:"Matte Polymer",color:"#59616b",roughness:.62,metalness:.03,ior:1.46,transmission:0,clearcoat:.08,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"walnut-wood",name:"Walnut Wood",color:"#75452f",roughness:.43,metalness:0,ior:1.46,transmission:0,clearcoat:.12,emissiveIntensity:0,texturePreset:"cedar-wood",uvScale:1.7,normalStrength:.78},{id:"black-leather",name:"Black Leather",color:"#282321",roughness:.7,metalness:0,ior:1.46,transmission:0,clearcoat:.04,emissiveIntensity:0,texturePreset:"vulcanite",uvScale:1.35,normalStrength:.68},{id:"cast-concrete",name:"Cast Concrete",color:"#888780",roughness:.91,metalness:0,ior:1.45,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"concrete",uvScale:1.4,normalStrength:.82},{id:"polished-marble",name:"Polished Marble",color:"#d7d1c7",roughness:.19,metalness:0,ior:1.5,transmission:0,clearcoat:.38,emissiveIntensity:0,texturePreset:"travertine",uvScale:1.65,normalStrength:.55},{id:"frosted-glass",name:"Frosted Glass",color:"#c5dbe4",roughness:.28,metalness:0,ior:1.48,transmission:.78,clearcoat:.92,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"emerald-glass",name:"Emerald Glass",color:"#287466",roughness:.07,metalness:0,ior:1.52,transmission:.94,clearcoat:1,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"soft-rubber",name:"Soft Rubber",color:"#242629",roughness:.84,metalness:0,ior:1.46,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"vulcanite",uvScale:1.1,normalStrength:.7}],ht={maxBounces:4,maxSamples:128,exposure:1.08,denoiser:!0,interactiveScale:.5,clayMode:!1,showLightGizmos:!0,environment:"studio",envIntensity:.85};function dt(o,e){if(!/^#[\da-f]{6}$/i.test(o))return"#808080";let t=Number.parseInt(o.slice(1),16);return`#${[16,8,0].map(r=>{let a=t>>r&255,n=e>=0?a+(255-a)*e:a*(1+e);return Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0")}).join("")}`}function Pt(o,e){let t='stroke="#ffffff" stroke-opacity=".24" fill="none"';switch(o.texturePreset){case"brushed-metal":return`<pattern id="${e}" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 1H8M0 5H8" ${t} stroke-width=".7"/></pattern>`;case"carbon-weave":return`<pattern id="${e}" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M0 0H4V4H0ZM5 5H9V9H5Z" fill="#fff" fill-opacity=".18"/><path d="M5 0H9V4H5ZM0 5H4V9H0Z" fill="#000" fill-opacity=".2"/></pattern>`;case"vulcanite":return`<pattern id="${e}" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#fff" fill-opacity=".22"/><circle cx="6" cy="6" r="1" fill="#000" fill-opacity=".22"/></pattern>`;case"guilloche":return`<pattern id="${e}" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="9" cy="9" r="5.5" ${t} stroke-width=".7"/><circle cx="9" cy="9" r="2.5" ${t} stroke-width=".6"/></pattern>`;case"concrete":return`<pattern id="${e}" width="13" height="13" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r=".9" fill="#000" fill-opacity=".22"/><circle cx="10" cy="9" r=".8" fill="#fff" fill-opacity=".32"/><path d="M1 11L5 10M8 2L12 1" ${t} stroke-width=".6"/></pattern>`;case"cedar-wood":return`<pattern id="${e}" width="15" height="15" patternUnits="userSpaceOnUse"><path d="M0 3C4 1 10 5 15 2M0 10C5 7 10 12 15 9" ${t} stroke-width="1"/></pattern>`;case"travertine":return`<pattern id="${e}" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M-2 5C3 1 9 9 20 3M-2 13C4 9 11 17 20 11" ${t} stroke-width="1.1"/></pattern>`;default:return""}}function ft(o,e="material"){let t=o.id.replace(/[^a-z0-9-]/gi,"-"),r=`${e}-sphere-${t}`,a=`${e}-clip-${t}`,n=`${e}-pattern-${t}`,s=o.transmission>.55,h=Math.min(.8,.2+o.metalness*.28+o.clearcoat*.25),i=4+o.roughness*10,u=o.texturePreset==="none"?"":`<circle cx="40" cy="40" r="31" fill="url(#${n})" clip-path="url(#${a})" opacity=".85"/>`,c=o.texturePreset==="none"?"":Pt(o,n);return`<svg viewBox="0 0 80 80" aria-hidden="true" focusable="false"><defs><radialGradient id="${r}" cx="31%" cy="25%" r="78%"><stop offset="0%" stop-color="${dt(o.color,.72)}"/><stop offset="38%" stop-color="${o.color}"/><stop offset="100%" stop-color="${dt(o.color,-.42)}"/></radialGradient><clipPath id="${a}"><circle cx="40" cy="40" r="31"/></clipPath>${c}</defs>${o.emissiveIntensity>0?`<circle cx="40" cy="40" r="35" fill="${o.color}" opacity=".18"/>`:""}<circle cx="40" cy="40" r="31" fill="url(#${r})"/>${u}${s?'<circle cx="40" cy="40" r="29.5" fill="#d8f3ff" opacity=".1"/>':""}<ellipse cx="30" cy="25" rx="${i}" ry="${3+o.roughness*4}" transform="rotate(-28 30 25)" fill="#fff" opacity="${h}"/><ellipse cx="48" cy="52" rx="17" ry="8" transform="rotate(-34 48 52)" fill="#fff" opacity="${Math.max(.04,(1-o.roughness)*.14)}"/><circle cx="40" cy="40" r="30.5" fill="none" stroke="${s?"#dff7ff":"#fff"}" stroke-opacity="${s?.72:.24}" stroke-width="${s?1.8:1}"/></svg>`}function pt(o){try{let e=o.getContext(),t=e.getExtension("WEBGL_debug_renderer_info"),r=t?t.UNMASKED_RENDERER_WEBGL:e.RENDERER;return/SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(String(e.getParameter(r)))}catch{return!0}}function yt(o){o&&o.group.traverse(e=>{e.geometry?.dispose?.();for(let t of Array.isArray(e.material)?e.material:[e.material])t?.dispose?.()})}async function dr(o,e){let t=new Ve(o.capabilities.getMaxAnisotropy()),r=new Map,a=null,n=null;try{let p=function(){return{settings:{...i},lights:u.map(m=>({...m})),materials:f.materials.map(m=>({...m})),samples:n?.getSamples()??0,resolution:n?.getResolution()??[0,0],materialPresets:Je.map(m=>({...m,previewSvg:ft(m,"boxlab-material")}))}},d=function(m){for(let l=0;l<u.length;l++)m[l]&&Object.assign(u[l],m[l]);n?.resetAccumulation()},v=function(m,l){let y=f.materials.find(S=>S.id===m);if(!y)return;let g={};for(let S of["color","roughness","metalness","ior","transmission","clearcoat","emissiveIntensity","texturePreset","uvScale","normalStrength"])l[S]!==void 0&&Object.assign(g,{[S]:l[S]});let x=!!(y.hasCustomAlbedo||y.hasCustomNormal||y.hasCustomRoughness||y.hasCustomMetalness);x&&delete g.texturePreset,Object.assign(y,g),!x&&g.texturePreset&&r.set(m,Le[g.texturePreset]),n?.resetAccumulation()},E=function(m,l){let y=f.materials.find(x=>x.id===m),g=Je.find(x=>x.id===l);!y||!g||v(m,{...g})},M=function(m){Object.assign(i,m),n?.resetAccumulation()},T=function(m){let l=mt.find(y=>y.id===m);l&&(d(l.lights.map(y=>({...y}))),M({environment:l.environment,envIntensity:l.envIntensity}))},R=function(m){M(m.settings),d(m.lights);for(let l of f.materials){let y=m.materials.find(g=>g.id===l.id);y&&v(l.id,y)}},b=function(){n?.dispose(),n=null,t.dispose(),yt(f)},s=new File([e],"BoxLab_Current.glb",{type:"model/gltf-binary"});a=await it(s,pt(o),t,r);let h=Qe(a.group);n=new Ue(o),n.setTextureArrays(t),n.setBVH(h);let i={...ht},u=Z.map(m=>({...m})),c={scale:a.rayTransform.scale,offset:a.rayTransform.offset.clone()},f=a;return{transform:c,getState:p,updateLights:d,updateMaterial:v,applyMaterialPreset:E,updateSettings:M,applyLightingRig:T,applyPreferences:R,render(m,l=!1){if(!n)return 0;let y=l?1:i.maxSamples;return n.getSamples()<y&&n.traceSample(m,u,f.materials,i,l,r,t),n.displayToScreen(i),n.getSamples()},resize(m,l,y=!1){let g=pt(o)?1:Math.min(window.devicePixelRatio||1,1.5),x=y?i.interactiveScale:1;n?.resize(Math.floor(m*g*x),Math.floor(l*g*x))},captureSnapshot(){return!n||n.getSamples()<i.maxSamples?null:(n.displayToScreen(i),o.domElement.toDataURL("image/png"))},reset(){n?.resetAccumulation()},dispose:b}}catch(s){throw n?.dispose(),t.dispose(),yt(a),s}}export{dr as createBoxLabHeliosTrace};
