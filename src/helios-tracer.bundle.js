/* HeliosStudio 0.1.4 integration base 0e79c5163e5d87703d369250e1a9fff9e2b9085f; BoxLab .1190 selectively ports H1 texture safety from HeliosStudio 0.1.5 cb4e68d04f3837f12266468e3cca59450ae9081a; retains packed metalness and surface opacity. Rebuild with npm run build:helios-tracer. */
var bt=Object.defineProperty;var Mt=(s,e,t)=>e in s?bt(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var L=(s,e,t)=>Mt(s,typeof e!="symbol"?e+"":e,t);import*as D from"three";var W=1024,Tt=24;function He(s,e,t){let r=new D.DataTexture(s,e,t,D.RGBAFormat,D.FloatType);return r.minFilter=D.NearestFilter,r.magFilter=D.NearestFilter,r.generateMipmaps=!1,r.wrapS=D.ClampToEdgeWrapping,r.wrapT=D.ClampToEdgeWrapping,r.needsUpdate=!0,r}function Qe(s){s.updateMatrixWorld(!0);let e=[],t=new Map,r=new D.Vector3,n=new D.Vector3,a=new D.Vector3,i=new D.Vector3,u=new D.Vector3,c=new D.Vector3,m=new D.Vector3,o=new D.Vector3,v=new D.Vector3,p=new D.Matrix3;if(s.traverse(G=>{let C=G;if(!C.isMesh||!C.geometry||!C.visible||C.userData.excludeFromRaytracer)return;let S=C.geometry,N=S.getAttribute("position");if(!N)return;let O=S.getAttribute("normal"),Q=S.getAttribute("uv"),q=S.getIndex(),ie=String(C.userData.materialId||"default"),se=t.get(ie);se===void 0&&(se=Math.min(t.size,Tt-1),t.set(ie,se));let he=C.matrixWorld;p.getNormalMatrix(he);let Y=Math.floor(q?q.count/3:N.count/3);for(let le=0;le<Y;le++){let de=q?q.getX(le*3):le*3,Ee=q?q.getX(le*3+1):le*3+1,Re=q?q.getX(le*3+2):le*3+2;if(r.fromBufferAttribute(N,de).applyMatrix4(he),n.fromBufferAttribute(N,Ee).applyMatrix4(he),a.fromBufferAttribute(N,Re).applyMatrix4(he),m.subVectors(n,r),o.subVectors(a,r),v.crossVectors(m,o),v.lengthSq()<1e-12)continue;O?(i.fromBufferAttribute(O,de).applyMatrix3(p).normalize(),u.fromBufferAttribute(O,Ee).applyMatrix3(p).normalize(),c.fromBufferAttribute(O,Re).applyMatrix3(p).normalize()):(v.normalize(),i.copy(v),u.copy(v),c.copy(v));let Ae=0,Z=0,te=0,re=0,fe=0,pe=0;if(Q)Ae=Q.getX(de),Z=Q.getY(de),te=Q.getX(Ee),re=Q.getY(Ee),fe=Q.getX(Re),pe=Q.getY(Re);else{let xe=Math.abs(v.x),be=Math.abs(v.y),ye=Math.abs(v.z);if(be>=xe&&be>=ye){let K=v.y>=0?-1:1;Ae=r.x,Z=r.z*K,te=n.x,re=n.z*K,fe=a.x,pe=a.z*K}else if(xe>=be&&xe>=ye){let K=v.x>=0?-1:1;Ae=r.z*K,Z=r.y,te=n.z*K,re=n.y,fe=a.z*K,pe=a.y}else{let K=v.z>=0?1:-1;Ae=r.x*K,Z=r.y,te=n.x*K,re=n.y,fe=a.x*K,pe=a.y}}e.push({v0x:r.x,v0y:r.y,v0z:r.z,v1x:n.x,v1y:n.y,v1z:n.z,v2x:a.x,v2y:a.y,v2z:a.z,n0x:i.x,n0y:i.y,n0z:i.z,n1x:u.x,n1y:u.y,n1z:u.z,n2x:c.x,n2y:c.y,n2z:c.z,u0:Ae,v0:Z,u1:te,v1:re,u2:fe,v2:pe,cx:(r.x+n.x+a.x)/3,cy:(r.y+n.y+a.y)/3,cz:(r.z+n.z+a.z)/3,minX:Math.min(r.x,n.x,a.x),minY:Math.min(r.y,n.y,a.y),minZ:Math.min(r.z,n.z,a.z),maxX:Math.max(r.x,n.x,a.x),maxY:Math.max(r.y,n.y,a.y),maxZ:Math.max(r.z,n.z,a.z),matIdx:se})}}),e.length===0){let G=new Float32Array(W*4),C=new Float32Array(W*4),S=new Float32Array(W*4),N=new Float32Array(W*4);return{triangleCount:0,nodeCount:1,bvhTexture:He(G,W,1),triPosTexture:He(C,W,1),triNormTexture:He(S,W,1),triUvTexture:He(N,W,1),texWidth:W,bvhTexHeight:1,triTexHeight:1,materialIdToIndex:t}}let h=new Int32Array(e.length);for(let G=0;G<e.length;G++)h[G]=G;let g=new Array(e.length*2+2),E=1;function R(G,C,S){let N=1/0,O=1/0,Q=1/0,q=-1/0,ie=-1/0,se=-1/0;for(let he=0;he<S;he++){let Y=e[h[C+he]];Y.minX<N&&(N=Y.minX),Y.minY<O&&(O=Y.minY),Y.minZ<Q&&(Q=Y.minZ),Y.maxX>q&&(q=Y.maxX),Y.maxY>ie&&(ie=Y.maxY),Y.maxZ>se&&(se=Y.maxZ)}g[G]={minX:N-1e-4,minY:O-1e-4,minZ:Q-1e-4,maxX:q+1e-4,maxY:ie+1e-4,maxZ:se+1e-4,leftFirst:C,triCount:S}}let T=8,I=new Float64Array(T),M=new Float64Array(T),f=new Float64Array(T),d=new Float64Array(T),x=new Float64Array(T),y=new Float64Array(T),l=new Int32Array(T),b=new Float64Array(T-1),A=new Int32Array(T-1);function w(G,C,S,N,O,Q){let q=N-G,ie=O-C,se=Q-S;return q<=0&&ie<=0&&se<=0?0:2*(q*ie+ie*se+se*q)}function H(G,C){let S=g[G],N=S.leftFirst,O=S.triCount;if(O<=2||C>=26)return;let Q=-1,q=0,ie=1/0,se=w(S.minX,S.minY,S.minZ,S.maxX,S.maxY,S.maxZ),he=O;for(let Z=0;Z<3;Z++){let te=1/0,re=-1/0;for(let P=0;P<O;P++){let X=e[h[N+P]],we=Z===0?X.cx:Z===1?X.cy:X.cz;we<te&&(te=we),we>re&&(re=we)}if(re-te<1e-6)continue;l.fill(0);for(let P=0;P<T;P++)I[P]=1/0,M[P]=1/0,f[P]=1/0,d[P]=-1/0,x[P]=-1/0,y[P]=-1/0;let fe=T/(re-te);for(let P=0;P<O;P++){let X=e[h[N+P]],we=Z===0?X.cx:Z===1?X.cy:X.cz,ae=Math.min(T-1,Math.floor((we-te)*fe));l[ae]++,X.minX<I[ae]&&(I[ae]=X.minX),X.minY<M[ae]&&(M[ae]=X.minY),X.minZ<f[ae]&&(f[ae]=X.minZ),X.maxX>d[ae]&&(d[ae]=X.maxX),X.maxY>x[ae]&&(x[ae]=X.maxY),X.maxZ>y[ae]&&(y[ae]=X.maxZ)}let pe=1/0,xe=1/0,be=1/0,ye=-1/0,K=-1/0,ze=-1/0,De=0;for(let P=T-1;P>0;P--)l[P]>0&&(De+=l[P],I[P]<pe&&(pe=I[P]),M[P]<xe&&(xe=M[P]),f[P]<be&&(be=f[P]),d[P]>ye&&(ye=d[P]),x[P]>K&&(K=x[P]),y[P]>ze&&(ze=y[P])),A[P-1]=De,b[P-1]=De>0?w(pe,xe,be,ye,K,ze):0;let _e=1/0,Oe=1/0,Xe=1/0,$e=-1/0,Ye=-1/0,We=-1/0,Ze=0,xt=se>1e-8?1/se:1;for(let P=0;P<T-1;P++){l[P]>0&&(Ze+=l[P],I[P]<_e&&(_e=I[P]),M[P]<Oe&&(Oe=M[P]),f[P]<Xe&&(Xe=f[P]),d[P]>$e&&($e=d[P]),x[P]>Ye&&(Ye=x[P]),y[P]>We&&(We=y[P]));let X=A[P];if(Ze===0||X===0)continue;let we=w(_e,Oe,Xe,$e,Ye,We),ae=.5+(Ze*we+X*b[P])*xt;ae<ie&&(ie=ae,Q=Z,q=te+(P+1)/T*(re-te))}}if(Q===-1||ie>=he&&O<=4)return;let Y=N,le=N+O-1;for(;Y<=le;){let Z=e[h[Y]];if((Q===0?Z.cx:Q===1?Z.cy:Z.cz)<q)Y++;else{let re=h[Y];h[Y]=h[le],h[le]=re,le--}}let de=Y-N;if(de===0||de===O){let Z=S.maxX-S.minX,te=S.maxY-S.minY,re=S.maxZ-S.minZ,fe=Z>=te&&Z>=re?0:te>=re?1:2;h.subarray(N,N+O).sort((xe,be)=>{let ye=e[xe],K=e[be];return fe===0?ye.cx-K.cx:fe===1?ye.cy-K.cy:ye.cz-K.cz})}let Ee=de===0||de===O?Math.floor(O/2):de,Re=E++,Ae=E++;R(Re,N,Ee),R(Ae,N+Ee,O-Ee),S.leftFirst=Re,S.triCount=0,H(Re,C+1),H(Ae,C+1)}R(0,0,e.length),H(0,0);let F=E*2,V=Math.max(1,Math.ceil(F/W)),j=new Float32Array(W*V*4);for(let G=0;G<E;G++){let C=g[G],S=G*8;j[S+0]=C.minX,j[S+1]=C.minY,j[S+2]=C.minZ,j[S+3]=C.leftFirst,j[S+4]=C.maxX,j[S+5]=C.maxY,j[S+6]=C.maxZ,j[S+7]=C.triCount}let ge=e.length*3,_=Math.max(1,Math.ceil(ge/W)),k=new Float32Array(W*_*4),$=new Float32Array(W*_*4),Fe=Math.max(1,Math.ceil(e.length*2/W)),me=new Float32Array(W*Fe*4);for(let G=0;G<e.length;G++){let C=e[h[G]],S=G*12;k[S+0]=C.v0x,k[S+1]=C.v0y,k[S+2]=C.v0z,k[S+3]=C.matIdx,k[S+4]=C.v1x,k[S+5]=C.v1y,k[S+6]=C.v1z,k[S+7]=0,k[S+8]=C.v2x,k[S+9]=C.v2y,k[S+10]=C.v2z,k[S+11]=0,$[S+0]=C.n0x,$[S+1]=C.n0y,$[S+2]=C.n0z,$[S+3]=0,$[S+4]=C.n1x,$[S+5]=C.n1y,$[S+6]=C.n1z,$[S+7]=0,$[S+8]=C.n2x,$[S+9]=C.n2y,$[S+10]=C.n2z,$[S+11]=0;let N=G*8;me[N+0]=C.u0,me[N+1]=C.v0,me[N+2]=C.u1,me[N+3]=C.v1,me[N+4]=C.u2,me[N+5]=C.v2,me[N+6]=0,me[N+7]=0}return{triangleCount:e.length,nodeCount:E,bvhTexture:He(j,W,V),triPosTexture:He(k,W,_),triNormTexture:He($,W,_),triUvTexture:He(me,W,Fe),texWidth:W,bvhTexHeight:V,triTexHeight:_,materialIdToIndex:t}}import*as z from"three";import{GLTFLoader as wt}from"three/addons/loaders/GLTFLoader.js";import{OBJLoader as Ht}from"three/addons/loaders/OBJLoader.js";import{STLLoader as St}from"three/addons/loaders/STLLoader.js";import*as U from"three";import*as Te from"three";var Me=new Te.Vector3,Se=new Te.Vector3,Be=new Te.Vector3,et=new Te.Vector3,tt=new Te.Vector3,Ce=new Te.Vector3;function Et(s){if(s.getAttribute("normal")||s.computeVertexNormals(),!s.index)return s;let e=s.toNonIndexed();return s.dispose(),e}function nt(s,e=1){let t=Et(s),r=t.getAttribute("position");if(!r)return t;let n=new Float32Array(r.count*2),a=Math.floor(r.count/3);for(let i=0;i<a;i++){let u=i*3,c=i*3+1,m=i*3+2;Me.fromBufferAttribute(r,u),Se.fromBufferAttribute(r,c),Be.fromBufferAttribute(r,m),et.subVectors(Se,Me),tt.subVectors(Be,Me),Ce.crossVectors(et,tt);let o=Math.abs(Ce.x),v=Math.abs(Ce.y),p=Math.abs(Ce.z);if(v>=o&&v>=p){let h=Ce.y>=0?1:-1;n[u*2+0]=Me.x*e,n[u*2+1]=-Me.z*h*e,n[c*2+0]=Se.x*e,n[c*2+1]=-Se.z*h*e,n[m*2+0]=Be.x*e,n[m*2+1]=-Be.z*h*e}else if(o>=v&&o>=p){let h=Ce.x>=0?-1:1;n[u*2+0]=Me.z*h*e,n[u*2+1]=Me.y*e,n[c*2+0]=Se.z*h*e,n[c*2+1]=Se.y*e,n[m*2+0]=Be.z*h*e,n[m*2+1]=Be.y*e}else{let h=Ce.z>=0?1:-1;n[u*2+0]=Me.x*h*e,n[u*2+1]=Me.y*e,n[c*2+0]=Se.x*h*e,n[c*2+1]=Se.y*e,n[m*2+0]=Be.x*h*e,n[m*2+1]=Be.y*e}}return t.setAttribute("uv",new Te.BufferAttribute(n,2)),t}function je(s,e,t){return`${Math.round(s*1e4)},${Math.round(e*1e4)},${Math.round(t*1e4)}`}function ot(s){let e=[],t=1/0,r=-1/0,n=1/0,a=-1/0,i=new Map,u=[];for(let m of s){let o=m.getAttribute("position"),v=m.getAttribute("uv");if(!o||!v)continue;let p=m.getIndex(),h=Math.floor(p?p.count/3:o.count/3);for(let g=0;g<h;g++){let E=p?p.getX(g*3):g*3,R=p?p.getX(g*3+1):g*3+1,T=p?p.getX(g*3+2):g*3+2,I=v.getX(E),M=v.getY(E),f=v.getX(R),d=v.getY(R),x=v.getX(T),y=v.getY(T);e.push(I,M,f,d,x,y),I<t&&(t=I),f<t&&(t=f),x<t&&(t=x),I>r&&(r=I),f>r&&(r=f),x>r&&(r=x),M<n&&(n=M),d<n&&(n=d),y<n&&(n=y),M>a&&(a=M),d>a&&(a=d),y>a&&(a=y);let l=[je(o.getX(E),o.getY(E),o.getZ(E)),je(o.getX(R),o.getY(R),o.getZ(R)),je(o.getX(T),o.getY(T),o.getZ(T))],b=[[I,M],[f,d],[x,y]];for(let A=0;A<3;A++){let w=A,H=(A+1)%3,F=l[w],V=l[H];if(F===V)continue;let j=F<V,ge=j?`${F}|${V}`:`${V}|${F}`,_=j?{kA:F,kB:V,uA:b[w][0],vA:b[w][1],uB:b[H][0],vB:b[H][1]}:{kA:V,kB:F,uA:b[H][0],vA:b[H][1],uB:b[w][0],vB:b[w][1]},k=i.get(ge);if(!k)i.set(ge,_);else{let $=Math.hypot(k.uA-_.uA,k.vA-_.vA),Fe=Math.hypot(k.uB-_.uB,k.vB-_.vB);($>.0015||Fe>.0015)&&u.push({uA1:k.uA,vA1:k.vA,uB1:k.uB,vB1:k.vB,uA2:_.uA,vA2:_.vA,uB2:_.uB,vB2:_.vB})}}}}let c=e.length>0&&t>=-.05&&r<=1.05&&n>=-.05&&a<=1.05;return{triangles:new Float32Array(e),isAtlas:c,seamPairs:u}}function Ve(s,e,t){let r=t?Math.max(0,Math.min(.999999,s)):s-Math.floor(s);return Math.max(0,Math.min(e-1,Math.floor(r*e)))}function Rt(s,e){let t=new Uint8Array(e*e),r=s.length/6;for(let n=0;n<r;n++){let a=n*6,i=s[a+0]*e,u=s[a+1]*e,c=s[a+2]*e,m=s[a+3]*e,o=s[a+4]*e,v=s[a+5]*e,p=Math.max(0,Math.floor(Math.min(i,c,o))-1),h=Math.min(e-1,Math.ceil(Math.max(i,c,o))+1),g=Math.max(0,Math.floor(Math.min(u,m,v))-1),E=Math.min(e-1,Math.ceil(Math.max(u,m,v))+1),R=(c-i)*(v-u)-(o-i)*(m-u);if(Math.abs(R)<1e-4){let M=Math.max(0,Math.min(e-1,Math.round(i))),f=Math.max(0,Math.min(e-1,Math.round(u))),d=Math.max(0,Math.min(e-1,Math.round(c))),x=Math.max(0,Math.min(e-1,Math.round(m))),y=Math.max(0,Math.min(e-1,Math.round(o))),l=Math.max(0,Math.min(e-1,Math.round(v)));t[f*e+M]=1,t[x*e+d]=1,t[l*e+y]=1;continue}let T=1/R,I=.5/Math.max(1,Math.sqrt(Math.abs(R)));for(let M=g;M<=E;M++){let f=M+.5;for(let d=p;d<=h;d++){let x=d+.5,y=((c-x)*(v-f)-(o-x)*(m-f))*T,l=((o-x)*(u-f)-(i-x)*(v-f))*T,b=1-y-l;y>=-I&&l>=-I&&b>=-I&&(t[M*e+d]=1)}}}return t}function rt(s,e,t,r,n){let a=t*t,i=new Int16Array(a);i.fill(-1);let u=new Int32Array(a),c=0,m=0;for(let p=0;p<a;p++)e[p]===1&&(i[p]=0,u[m++]=p);if(m===0||m===a)return;let o=[-1,0,1,-1,1,-1,0,1],v=[-1,-1,-1,0,0,1,1,1];for(;c<m;){let p=u[c++],h=i[p];if(h>=r)continue;let g=p%t,E=(p-g)/t;for(let R=0;R<8;R++){let T=g+o[R],I=E+v[R];if(T<0||T>=t||I<0||I>=t)continue;let M=I*t+T;if(i[M]!==-1)continue;let f=0,d=0,x=0,y=0;for(let l=0;l<8;l++){let b=T+o[l],A=I+v[l];if(b<0||b>=t||A<0||A>=t)continue;let w=A*t+b;if(i[w]!==-1&&i[w]<=h){let H=w*4;n?(f+=s[H+0]-128,d+=s[H+1]-128,x+=s[H+2]-128):(f+=s[H+0],d+=s[H+1],x+=s[H+2]),y++}}if(y>0){let l=M*4;if(n){let b=f/y,A=d/y,w=x/y,H=Math.hypot(b,A,w)||1;s[l+0]=Math.max(0,Math.min(255,Math.round(b/H*127+128))),s[l+1]=Math.max(0,Math.min(255,Math.round(A/H*127+128))),s[l+2]=Math.max(0,Math.min(255,Math.round(w/H*127+128)))}else s[l+0]=Math.round(f/y),s[l+1]=Math.round(d/y),s[l+2]=Math.round(x/y);s[l+3]=255,i[M]=h+1,u[m++]=M}}}}function at(s,e,t,r,n,a){let i=0,u=0,c=0,m=0;for(let o=-3;o<=3;o++){let v=r+o;if(!(v<0||v>=n))for(let p=-3;p<=3;p++){let h=t+p;if(h<0||h>=n)continue;let g=v*n+h;if(e[g]===0)continue;let E=1/(1+p*p+o*o),R=g*4;a?(i+=(s[R+0]-128)*E,u+=(s[R+1]-128)*E,c+=(s[R+2]-128)*E):(i+=s[R+0]*E,u+=s[R+1]*E,c+=s[R+2]*E),m+=E}}if(m<=0){let o=(r*n+t)*4;return[s[o+0],s[o+1],s[o+2]]}if(a){let o=Math.hypot(i,u,c)||1;return[Math.max(0,Math.min(255,Math.round(i/o*127+128))),Math.max(0,Math.min(255,Math.round(u/o*127+128))),Math.max(0,Math.min(255,Math.round(c/o*127+128)))]}return[i/m,u/m,c/m]}function st(s,e,t,r,n){let a=t*t,i=new Uint8Array(a);if(n&&n.triangles.length>0&&n.isAtlas){let u=Rt(n.triangles,t),c=!1;for(let o=0;o<a;o++)u[o]===1&&e[o]>=230&&(i[o]=1,c=!0);c||i.fill(1);let m=new Uint8Array(a);for(let o=1;o<t-1;o++)for(let v=1;v<t-1;v++){let p=o*t+v;i[p]===1&&i[p-1]===1&&i[p+1]===1&&i[p-t]===1&&i[p+t]===1&&(m[p]=1)}if(!r){let o=new Uint8Array(s);for(let v=1;v<t-1;v++)for(let p=1;p<t-1;p++){let h=v*t+p;if(i[h]===1&&m[h]===0){let g=h*4,E=o[g]*.299+o[g+1]*.587+o[g+2]*.114,R=0,T=0,I=0,M=0,f=0;for(let d=-1;d<=1;d++)for(let x=-1;x<=1;x++){let y=(v+d)*t+(p+x);if(m[y]===1){let l=y*4,b=o[l]*.299+o[l+1]*.587+o[l+2]*.114;b>f&&(f=b),R+=o[l],T+=o[l+1],I+=o[l+2],M++}}M>0&&E<f*.78&&(s[g+0]=Math.round(R/M),s[g+1]=Math.round(T/M),s[g+2]=Math.round(I/M))}}}if(n.seamPairs.length>0){let o=new Uint8Array(s),v=[.92,.62,.3,.12],p=(h,g,E,R,T,I)=>{if(h<0||h>=t||g<0||g>=t)return;let M=g*t+h;if(i[M]===0)return;let f=M*4,d=1-I;if(r){let x=(o[f+0]-128)*d+(E-128)*I,y=(o[f+1]-128)*d+(R-128)*I,l=(o[f+2]-128)*d+(T-128)*I,b=Math.hypot(x,y,l)||1;s[f+0]=Math.max(0,Math.min(255,Math.round(x/b*127+128))),s[f+1]=Math.max(0,Math.min(255,Math.round(y/b*127+128))),s[f+2]=Math.max(0,Math.min(255,Math.round(l/b*127+128)))}else s[f+0]=Math.round(o[f+0]*d+E*I),s[f+1]=Math.round(o[f+1]*d+R*I),s[f+2]=Math.round(o[f+2]*d+T*I)};for(let h of n.seamPairs){let g=Math.hypot(h.uB1-h.uA1,h.vB1-h.vA1)*t,E=Math.hypot(h.uB2-h.uA2,h.vB2-h.vA2)*t,R=Math.max(2,Math.min(1024,Math.ceil(Math.max(g,E))));for(let T=0;T<=R;T++){let I=T/R,M=Ve(h.uA1+(h.uB1-h.uA1)*I,t,!0),f=Ve(h.vA1+(h.vB1-h.vA1)*I,t,!0),d=Ve(h.uA2+(h.uB2-h.uA2)*I,t,!0),x=Ve(h.vA2+(h.vB2-h.vA2)*I,t,!0),y=at(o,m,M,f,t,r),l=at(o,m,d,x,t,r),b=r?y:[(y[0]+l[0])*.5,(y[1]+l[1])*.5,(y[2]+l[2])*.5],A=r?l:b;for(let w=-3;w<=3;w++)for(let H=-3;H<=3;H++){let F=Math.round(Math.hypot(H,w));if(F>=v.length)continue;let V=r?v[F]*.88:v[F];p(M+H,f+w,b[0],b[1],b[2],V),p(d+H,x+w,A[0],A[1],A[2],V)}}}}rt(s,i,t,14,r)}else{let u=!1;for(let c=0;c<a;c++)e[c]>=230?i[c]=1:u=!0;u&&rt(s,i,t,14,r)}}function it(s,e,t,r,n,a){if(a!==1&&a!==2)throw new RangeError("Packed PBR scalar channel must be G or B.");if(e<0||r<0||n<0||e+n*4>s.length||r+n*4>t.length)throw new RangeError("Packed PBR scalar data is outside the texture buffer.");for(let i=0;i<n;i++)s[e+i*4+a]=t[r+i*4+a]}var ee=256,Ue=14,ne=1024,ve=8,ue=100;var Pe={none:0,"brushed-metal":1,"carbon-weave":2,vulcanite:3,guilloche:4,concrete:5,"cedar-wood":6,travertine:7,limestone:8,brick:9,terrazzo:10,"ceramic-tile":11,plaster:12,"corten-steel":13};function Ie(s,e,t,r){let n=(s%t+t)%t,a=(e%r+r)%r,i=n*374761393+a*668265263;return i=(i^i>>13)*1274126177,((i^i>>16)>>>0)/4294967295}function qe(s,e,t,r){let n=s*t,a=e*r,i=Math.floor(n),u=Math.floor(a),c=n-i,m=a-u,o=c*c*(3-2*c),v=m*m*(3-2*m),p=Ie(i,u,t,r),h=Ie(i+1,u,t,r),g=Ie(i,u+1,t,r),E=Ie(i+1,u+1,t,r);return p+(h-p)*o+(g-p)*v+(p-h-g+E)*o*v}function lt(s,e,t){return qe(s,e,t,t)}function Ne(s,e,t,r,n=4){let a=0,i=.5,u=0,c=t,m=r;for(let o=0;o<n;o++)a+=qe(s,e,c,m)*i,u+=i,i*=.5,c*=2,m*=2;return a/u}function ce(s,e,t,r=4){return Ne(s,e,t,t,r)}function At(s,e,t,r,n){for(let a=0;a<e;a++){let i=(a-1+e)%e,u=(a+1)%e;for(let c=0;c<e;c++){let m=(c-1+e)%e,o=(c+1)%e,v=s[a*e+m],p=s[a*e+o],h=s[i*e+c],g=s[u*e+c],E=(v-p)*t,R=(h-g)*t,T=1,I=Math.sqrt(E*E+R*R+T*T),M=n+(a*e+c)*4;r[M+0]=Math.round((E/I*.5+.5)*255),r[M+1]=Math.round((R/I*.5+.5)*255),r[M+2]=Math.round((T/I*.5+.5)*255),r[M+3]=255}}}var ke=class{constructor(e){L(this,"albedoArray");L(this,"normalArray");L(this,"roughMetalArray");L(this,"customAlbedoArray");L(this,"customNormalArray");L(this,"customRoughMetalArray");L(this,"albedoBytes");L(this,"normalBytes");L(this,"roughMetalBytes");L(this,"customAllocated",!1);L(this,"customAlbedoBytes",null);L(this,"customNormalBytes",null);L(this,"customRoughMetalBytes",null);L(this,"customIsAtlas",new Array(ve).fill(!1));L(this,"threeMapsCache",new Map);L(this,"previewCache",new Map);L(this,"customLeases",new Map);L(this,"disposed",!1);L(this,"maxAnisotropy");this.maxAnisotropy=Math.min(8,Math.max(1,e));let r=ee*ee*4*Ue;this.albedoBytes=new Uint8Array(r),this.normalBytes=new Uint8Array(r),this.roughMetalBytes=new Uint8Array(r);for(let n=0;n<Ue;n++)this.fillNeutralPresetLayer(n);this.generatePresetLayer("brushed-metal",1),this.generatePresetLayer("carbon-weave",2),this.generatePresetLayer("vulcanite",3),this.generatePresetLayer("guilloche",4),this.generatePresetLayer("concrete",5),this.generatePresetLayer("cedar-wood",6),this.generatePresetLayer("travertine",7),this.generatePresetLayer("limestone",8),this.generatePresetLayer("brick",9),this.generatePresetLayer("terrazzo",10),this.generatePresetLayer("ceramic-tile",11),this.generatePresetLayer("plaster",12),this.generatePresetLayer("corten-steel",13),this.albedoArray=this.createArrayTexture(this.albedoBytes,ee,Ue),this.normalArray=this.createArrayTexture(this.normalBytes,ee,Ue),this.roughMetalArray=this.createArrayTexture(this.roughMetalBytes,ee,Ue),this.customAlbedoArray=this.createDummyArrayTex([255,255,255,255]),this.customNormalArray=this.createDummyArrayTex([128,128,255,255]),this.customRoughMetalArray=this.createDummyArrayTex([255,255,255,255])}createDummyArrayTex(e){let t=new U.DataArrayTexture(new Uint8Array(e),1,1,1);return t.format=U.RGBAFormat,t.type=U.UnsignedByteType,t.minFilter=U.LinearFilter,t.magFilter=U.LinearFilter,t.wrapS=U.RepeatWrapping,t.wrapT=U.RepeatWrapping,t.generateMipmaps=!1,t.needsUpdate=!0,t}createArrayTexture(e,t,r){let n=new U.DataArrayTexture(e,t,t,r);return n.format=U.RGBAFormat,n.type=U.UnsignedByteType,n.minFilter=U.LinearFilter,n.magFilter=U.LinearFilter,n.wrapS=U.RepeatWrapping,n.wrapT=U.RepeatWrapping,n.generateMipmaps=!1,n.needsUpdate=!0,n}ensureCustomAllocated(){if(this.customAllocated)return;let t=ne*ne*4*ve;this.customAlbedoBytes=new Uint8Array(t),this.customNormalBytes=new Uint8Array(t),this.customRoughMetalBytes=new Uint8Array(t);for(let r=0;r<ve;r++)this.fillNeutralCustomSlice(r);this.customAlbedoArray.dispose(),this.customNormalArray.dispose(),this.customRoughMetalArray.dispose(),this.customAlbedoArray=this.createArrayTexture(this.customAlbedoBytes,ne,ve),this.customNormalArray=this.createArrayTexture(this.customNormalBytes,ne,ve),this.customRoughMetalArray=this.createArrayTexture(this.customRoughMetalBytes,ne,ve),this.customAllocated=!0}fillNeutralPresetLayer(e){let t=ee*ee*4,r=e*t;for(let n=0;n<ee*ee;n++){let a=r+n*4;this.albedoBytes[a+0]=255,this.albedoBytes[a+1]=255,this.albedoBytes[a+2]=255,this.albedoBytes[a+3]=255,this.normalBytes[a+0]=128,this.normalBytes[a+1]=128,this.normalBytes[a+2]=255,this.normalBytes[a+3]=255,this.roughMetalBytes[a+0]=255,this.roughMetalBytes[a+1]=255,this.roughMetalBytes[a+2]=255,this.roughMetalBytes[a+3]=255}}fillNeutralCustomSlice(e){if(!this.customAlbedoBytes||!this.customNormalBytes||!this.customRoughMetalBytes)return;let t=ne*ne,r=e*t*4;for(let n=0;n<t;n++){let a=r+n*4;this.customAlbedoBytes[a+0]=255,this.customAlbedoBytes[a+1]=255,this.customAlbedoBytes[a+2]=255,this.customAlbedoBytes[a+3]=255,this.customNormalBytes[a+0]=128,this.customNormalBytes[a+1]=128,this.customNormalBytes[a+2]=255,this.customNormalBytes[a+3]=255,this.customRoughMetalBytes[a+0]=255,this.customRoughMetalBytes[a+1]=255,this.customRoughMetalBytes[a+2]=255,this.customRoughMetalBytes[a+3]=255}}upscalePresetToCustomSlice(e,t){if(!this.customAlbedoBytes||!this.customNormalBytes||!this.customRoughMetalBytes)return;let r=ne/ee,n=e*ee*ee*4,a=t*ne*ne*4,i=(u,c,m)=>{for(let o=0;o<ne;o++){let v=Math.min(ee-1,Math.floor(o/r));for(let p=0;p<ne;p++){let h=Math.min(ee-1,Math.floor(p/r)),g=n+(v*ee+h)*4,E=a+(o*ne+p)*4;c[E+0]=u[g+0],c[E+1]=u[g+1],c[E+2]=u[g+2],c[E+3]=m?255:u[g+3]}}};i(this.albedoBytes,this.customAlbedoBytes,!1),i(this.normalBytes,this.customNormalBytes,!0),i(this.roughMetalBytes,this.customRoughMetalBytes,!1)}generatePresetLayer(e,t){let r=ee,n=new Float32Array(r*r),a=t*r*r*4,i=2;for(let u=0;u<r;u++){let c=u/r;for(let m=0;m<r;m++){let o=m/r,v=u*r+m,p=a+v*4,h=255,g=255,E=255,R=1,T=.5;if(e==="brushed-metal"){let M=Ne(o,c,2,32,3),f=qe(o,c,8,96),d=.85+M*.11+f*.04;h=g=E=Math.round(d*255),T=M*.72+f*.28,R=.78+M*.42,i=1.4}else if(e==="carbon-weave"){let f=o*12,d=c*12,x=Math.floor(f),y=Math.floor(d),l=f-x,b=d-y,w=(x+y)%4<2,H=w?Math.sin(l*Math.PI)*(.85+.15*Math.sin(b*Math.PI*6)):Math.sin(b*Math.PI)*(.85+.15*Math.sin(l*Math.PI*6)),F=w?.52+H*.42:.38+H*.36;h=g=E=Math.round(F*255),T=H,R=w?.55+(1-H)*.45:.82+(1-H)*.35,i=3.2}else if(e==="vulcanite"){let M=ce(o,c,24,3),f=lt(o,c,48),d=Math.pow(M*.72+f*.28,1.35),x=.7+d*.3;h=g=E=Math.round(x*255),T=d,R=.85+(1-d)*.35,i=4}else if(e==="guilloche"){let M=o-.5,f=c-.5,d=Math.sqrt(M*M+f*f),x=Math.atan2(f,M),y=Math.cos(x*48)*.5+.5,l=Math.cos(d*Math.PI*44)*.5+.5,b=Math.max(Math.abs(M),Math.abs(f)),A=b<.44?1:Math.max(0,(.5-b)/.06),w=.5+(y*.55+l*.45-.5)*A,H=.65+w*.35;h=g=E=Math.round(H*255),T=w,R=.6+(1-w)*.5,i=2.4}else if(e==="concrete"){let M=ce(o,c,6,4),f=ce(o,c,24,3),d=f<.32?(.32-f)*1.8:0,x=Math.abs((c*4+.5)%1-.5)>.486?.12:0,y=Math.max(.45,Math.min(1,.78+(M-.5)*.28-d*.4-x));h=Math.round(y*255),g=Math.round(y*.99*255),E=Math.round(y*.96*255),T=M*.65+f*.35-d*.5-x,R=.85+d*.3+(1-M)*.2,i=3}else if(e==="cedar-wood"){let M=ce(o,c,4,3)*.35,f=Math.sin((o*10+M*8)*Math.PI*2)*.5+.5,d=Ne(o,c,24,3,3),x=f*.65+d*.35;h=Math.round((.68+x*.32)*255),g=Math.round((.54+x*.3)*255),E=Math.round((.42+x*.26)*255),T=x*.7+d*.3,R=.78+(1-x)*.38,i=2.2}else if(e==="travertine"){let M=ce(o,c,4,4),f=Math.pow(Math.abs(Math.sin((c*3+M*2.2)*Math.PI)),.35),d=ce(o*2,c*4,16,3),x=d<.28?(.28-d)*1.4:0,y=Math.max(.55,Math.min(1,.72+f*.26-x*.35));h=Math.round(y*255),g=Math.round(y*.96*255),E=Math.round(y*.9*255),T=f*.6+d*.4-x*.7,R=.72+x*.6+(1-f)*.25,i=2.6}else if(e==="limestone"){let M=Ne(o,c,4,9,3),f=ce(o,c,30,24),d=Math.pow(Math.max(0,Math.cos((c*5+M*.7)*Math.PI*2)),16),x=f<.29?(.29-f)*1.4:0,y=Math.max(.56,Math.min(1,.83+(M-.5)*.18+d*.08-x*.22));h=Math.round(y*255),g=Math.round(y*.99*255),E=Math.round(y*.95*255),T=M*.62+f*.38-x*.5,R=.82+x*.45+(1-d)*.12,i=2}else if(e==="brick"){let f=Math.floor(c*6),d=c*6%1,x=4,y=f%2?.5:0,b=(o*x+y)%1,A=d<.045||d>.955||b<.035||b>.965,w=ce(o,c,28,22),H=A?.67+w*.08:.88+w*.12;h=g=E=Math.round(H*255),T=A?.12+w*.12:.62+w*.2,R=A?1.14:.92+(1-w)*.18,i=3.4}else if(e==="terrazzo"){let f=o*18,d=c*18,x=Math.floor(f),y=Math.floor(d),l=f-x,b=d-y,A=Ie(x,y,18,18),w=.22+Ie(x+17,y,18,18)*.56,H=.22+Ie(x,y+31,18,18)*.56,F=.11+A*.12,V=.09+Ie(x+7,y+13,18,18)*.15,j=(l-w)/F,ge=(b-H)/V,_=j*j+ge*ge<1,k=ce(o,c,35,35),$=_?.62+A*.32:.93+k*.07;h=Math.round($*255),g=Math.round($*(_?.96:.99)*255),E=Math.round($*(_?.91:.97)*255),T=_?.35+A*.42:.52+k*.08,R=_?.9+A*.35:.94+k*.12,i=1.8}else if(e==="ceramic-tile"){let f=o*4%1,d=c*4%1,y=Math.min(f,1-f,d,1-d)<.025,l=ce(o,c,16,16),b=y?.62:.96+l*.04;h=g=E=Math.round(b*255),T=y?.25:.48+l*.04,R=y?1.14:.88+l*.12,i=1.35}else if(e==="plaster"){let M=ce(o,c,14,13),f=lt(o,c,62),d=Math.pow(Math.max(0,Math.sin((o*8+M*1.4)*Math.PI)),5),x=.82+(M-.5)*.16+(f-.5)*.11+d*.025;h=g=E=Math.round(Math.max(.62,Math.min(1,x))*255),T=M*.56+f*.34+d*.1,R=.91+(1-f)*.2,i=1.5}else if(e==="corten-steel"){let M=ce(o,c,7,7),f=ce(o,c,27,24),d=Ne(o,c,5,28,3),x=Math.max(0,M*.72+f*.28-.56),y=Math.max(.58,Math.min(1,.91-x*.36+(d-.5)*.08));h=Math.round(y*255),g=Math.round(y*(.97-x*.04)*255),E=Math.round(y*(.91-x*.1)*255),T=M*.5+f*.35+d*.15,R=.88+x*.38,i=2.3}n[v]=T,this.albedoBytes[p+0]=h,this.albedoBytes[p+1]=g,this.albedoBytes[p+2]=E,this.albedoBytes[p+3]=255;let I=Math.max(12,Math.min(255,Math.round(R*255)));this.roughMetalBytes[p+0]=I,this.roughMetalBytes[p+1]=I,this.roughMetalBytes[p+2]=255,this.roughMetalBytes[p+3]=255}}At(n,r,i,this.normalBytes,a)}allocateCustomLayer(e="none",t=!1){if(this.disposed)throw new Error("Texture manager has been disposed.");let r=0;for(;r<ve&&this.customLeases.has(ue+r);)r++;if(r===ve)throw new Error("All eight custom texture layers are in use; restore preset maps before adding another textured material.");this.ensureCustomAllocated();let n=Pe[e];n===0?this.fillNeutralCustomSlice(r):this.upscalePresetToCustomSlice(n,r),this.customIsAtlas[r]=t;let a=ue+r;return this.customAlbedoArray.addLayerUpdate(r),this.customNormalArray.addLayerUpdate(r),this.customRoughMetalArray.addLayerUpdate(r),this.invalidateLayer(a),this.customLeases.set(a,Symbol("texture layer")),a}releaseCustomLayer(e){this.customLeases.delete(e)&&(this.customIsAtlas[e-ue]=!1,this.invalidateLayer(e))}writeImageToLayer(e,t,r,n=!1,a){if(this.disposed||!this.customLeases.has(e))throw new Error("Texture layer is no longer reserved.");if(this.ensureCustomAllocated(),!this.customAlbedoBytes||!this.customNormalBytes||!this.customRoughMetalBytes)return;let i=e-ue;if(i<0||i>=ve)return;let u=ne,c=document.createElement("canvas");c.width=u,c.height=u;let m=c.getContext("2d");if(!m)throw new Error("Unable to prepare texture image.");m.imageSmoothingEnabled=!0,m.imageSmoothingQuality="high",n?(m.save(),m.translate(0,u),m.scale(1,-1),m.drawImage(r,0,0,u,u),m.restore()):m.drawImage(r,0,0,u,u);let o=m.getImageData(0,0,u,u).data,v=u*u,p=v*4,h=i*p,g=new Uint8Array(p),E=new Uint8Array(v);for(let R=0;R<v;R++){let T=R*4;E[R]=o[T+3],g[T+0]=o[T+0],g[T+1]=o[T+1],g[T+2]=o[T+2],g[T+3]=255}if(st(g,E,u,t==="normal",a),a&&(this.customIsAtlas[i]=a.isAtlas),t==="albedo")this.customAlbedoBytes.set(g,h),this.customAlbedoArray.addLayerUpdate(i),this.customAlbedoArray.needsUpdate=!0;else if(t==="normal")this.customNormalBytes.set(g,h),this.customNormalArray.addLayerUpdate(i),this.customNormalArray.needsUpdate=!0;else{let R=t==="roughness"?1:2;it(this.customRoughMetalBytes,h,g,0,v,R),this.customRoughMetalArray.addLayerUpdate(i),this.customRoughMetalArray.needsUpdate=!0}this.invalidateLayer(e)}async writeFileToLayer(e,t,r,n){let a=this.customLeases.get(e);if(this.disposed||!a)throw new Error("Texture layer is no longer reserved.");let i=URL.createObjectURL(r);try{let u=await new Promise((c,m)=>{let o=new Image;o.onload=()=>c(o),o.onerror=()=>m(new Error(`Unable to decode image ${r.name}`)),o.src=i});if(this.disposed||this.customLeases.get(e)!==a)throw new Error("Texture upload was cancelled; its layer has been released.");this.writeImageToLayer(e,t,u,!1,n)}finally{URL.revokeObjectURL(i)}}getLayerShaderInfo(e){if(e>=ue){let t=Math.max(0,Math.min(ve-1,e-ue));return{slice:t,modeFlag:this.customIsAtlas[t]?2:1}}return{slice:e,modeFlag:0}}disposeMapSet(e){new Set([e.map,e.normalMap,e.roughnessMap,e.metalnessMap]).forEach(t=>t?.dispose())}clearThreeMapsCache(){for(let e of this.threeMapsCache.values())this.disposeMapSet(e);this.threeMapsCache.clear()}invalidateLayer(e){let t=String(e)+":";for(let[r,n]of this.threeMapsCache)r.startsWith(t)&&(this.disposeMapSet(n),this.threeMapsCache.delete(r));for(let r of this.previewCache.keys())r.startsWith(t)&&this.previewCache.delete(r);this.albedoArray.needsUpdate=!0,this.normalArray.needsUpdate=!0,this.roughMetalArray.needsUpdate=!0,this.customAlbedoArray.needsUpdate=!0,this.customNormalArray.needsUpdate=!0,this.customRoughMetalArray.needsUpdate=!0}getMapPreviewDataUrl(e,t){let r=String(e)+":"+t,n=this.previewCache.get(r);if(n)return n;let a=e>=ue,i=a?e-ue:e,u=a?ne:ee,c=t==="albedo"?a?this.customAlbedoBytes:this.albedoBytes:t==="normal"?a?this.customNormalBytes:this.normalBytes:a?this.customRoughMetalBytes:this.roughMetalBytes;if(!c)return null;let m=72,o=document.createElement("canvas");o.width=m,o.height=m;let v=o.getContext("2d");if(!v)return null;let p=v.createImageData(m,m),h=i*u*u*4;for(let E=0;E<m;E++){let R=Math.min(u-1,Math.floor(E/m*u));for(let T=0;T<m;T++){let I=Math.min(u-1,Math.floor(T/m*u)),M=h+(R*u+I)*4,f=(E*m+T)*4;if(t==="roughness"||t==="metalness"){let d=c[M+(t==="roughness"?1:2)];p.data[f]=d,p.data[f+1]=d,p.data[f+2]=d}else p.data[f]=c[M],p.data[f+1]=c[M+1],p.data[f+2]=c[M+2];p.data[f+3]=255}}v.putImageData(p,0,0);let g=o.toDataURL("image/png");return this.previewCache.set(r,g),g}getThreeMapsForLayer(e,t,r=t,n=0,a=0,i=0){if(e===0)return{map:null,normalMap:null,roughnessMap:null,metalnessMap:null};let u=e>=ue,c=u?e-ue:e,m=u?ne:ee,o=u&&!!this.customIsAtlas[c],v=[e,t,r,n,a,i].join(":"),p=this.threeMapsCache.get(v);if(!p){let g=u?this.customAlbedoBytes:this.albedoBytes,E=u?this.customNormalBytes:this.normalBytes,R=u?this.customRoughMetalBytes:this.roughMetalBytes;if(!g||!E||!R)return{map:null,normalMap:null,roughnessMap:null,metalnessMap:null};let T=m*m*4,I=c*T,M=(d,x)=>{let y=new Uint8Array(T);y.set(d.subarray(I,I+T));let l=new U.DataTexture(y,m,m,U.RGBAFormat);l.colorSpace=x?U.SRGBColorSpace:U.NoColorSpace;let b=o&&t<=1.02&&r<=1.02?U.ClampToEdgeWrapping:U.RepeatWrapping;return l.wrapS=b,l.wrapT=b,l.minFilter=U.LinearMipmapLinearFilter,l.magFilter=U.LinearFilter,l.generateMipmaps=!0,l.anisotropy=this.maxAnisotropy,l.needsUpdate=!0,l},f=M(R,!1);p={map:M(g,!0),normalMap:M(E,!1),roughnessMap:f,metalnessMap:f},this.threeMapsCache.set(v,p)}let h=o&&t<=1.02&&r<=1.02?U.ClampToEdgeWrapping:U.RepeatWrapping;return new Set([p.map,p.normalMap,p.roughnessMap,p.metalnessMap]).forEach(g=>{g&&(g.repeat.set(t,r),g.offset.set(n,a),g.center.set(.5,.5),g.rotation=i*Math.PI/180,g.updateMatrix(),(g.wrapS!==h||g.wrapT!==h)&&(g.wrapS=h,g.wrapT=h,g.needsUpdate=!0))}),p}resetCustomCounter(){this.customLeases.clear(),this.customIsAtlas.fill(!1);for(let[e,t]of this.threeMapsCache)Number(e.split(":")[0])>=ue&&(this.disposeMapSet(t),this.threeMapsCache.delete(e))}dispose(){this.disposed=!0,this.customLeases.clear(),this.albedoArray.dispose(),this.normalArray.dispose(),this.roughMetalArray.dispose(),this.customAlbedoArray.dispose(),this.customNormalArray.dispose(),this.customRoughMetalArray.dispose(),this.clearThreeMapsCache()}};function Bt(s,e){let t=s.emissiveIntensity>.01,r=t?s.emissiveOpacity??1:1,n=t?1:s.surfaceOpacity??1,a=r*n,i=new z.MeshPhysicalMaterial({color:new z.Color(s.color),opacity:a,transparent:a<.999,depthWrite:a>=.999,roughness:s.roughness,metalness:s.metalness,ior:s.ior,clearcoat:s.clearcoat,clearcoatRoughness:Math.max(.04,s.roughness*.4),envMapIntensity:1.05});return s.transmission>.05&&(e?(i.transparent=!0,i.opacity=Math.max(.28,1-s.transmission*.65)*a,i.depthWrite=!1):(i.transmission=s.transmission,i.opacity=a,i.transparent=a<.999,i.depthWrite=a>=.999,i.thickness=.65,i.attenuationColor=new z.Color(s.color),i.attenuationDistance=1.6)),s.emissiveIntensity>.01&&(i.emissive=new z.Color(s.color),i.emissiveIntensity=s.emissiveIntensity),i}async function ct(s,e,t,r){let n=s.name.split(".").pop()?.toLowerCase()??"",a=await s.arrayBuffer(),i;if(n==="glb"||n==="gltf"){let f=new wt;i=(await new Promise((x,y)=>{f.parse(a,"",l=>x(l),y)})).scene}else if(n==="obj"){let f=new TextDecoder().decode(a);i=new Ht().parse(f)}else if(n==="stl"){let d=new St().parse(a);d.computeVertexNormals();let x=new z.Mesh(d);i=new z.Group,i.add(x)}else throw new Error(`Unsupported format ".${n}". Please import GLB, GLTF, OBJ, or STL.`);i.updateMatrixWorld(!0);let u=new z.Box3().setFromObject(i);if(u.isEmpty())throw new Error("The imported file contains no renderable 3D geometry.");let c=new z.Vector3,m=new z.Vector3;u.getSize(c),u.getCenter(m);let v=1.45/Math.max(c.x,c.y,c.z,1e-4),p=new z.Vector3(-m.x*v,-u.min.y*v,-m.z*v),h=new z.Group;i.position.copy(p),i.scale.setScalar(v),h.add(i),h.updateMatrixWorld(!0);let g=[],E=new Map,R=new Map,T=new Map,I=new Map,M=1;if(h.traverse(f=>{let d=f;if(!d.isMesh||!d.geometry)return;let x=d.geometry;x.getAttribute("normal")||x.computeVertexNormals(),x.getAttribute("uv")||(d.geometry=nt(x,1));let y=Array.isArray(d.material)?d.material[0]:d.material,l=y,b=y?y.uuid:"imported_default",A=E.get(b);if(!A)if(g.length>=20)A=g[0].id;else{A=`imported_mat_${g.length+1}`,E.set(b,A),T.set(A,l);let j=l&&l.color?`#${l.color.getHexString()}`:g.length===0?"#cfd3d9":"#9ca3af",ge=l&&typeof l.roughness=="number"?l.roughness:.45,_=l&&typeof l.metalness=="number"?l.metalness:.15,k=l&&l.name||d.name||`Surface ${g.length+1}`,$=!!l?.map?.image,Fe=!!l?.normalMap?.image,me=!!l?.roughnessMap?.image,G=!!l?.metalnessMap?.image,C=l?.normalScale&&typeof l.normalScale.x=="number"?Math.max(0,Math.min(2,l.normalScale.x)):1;g.push({id:A,name:k.slice(0,24),color:j,roughness:Math.max(.03,Math.min(1,ge)),metalness:Math.max(0,Math.min(1,_)),surfaceOpacity:Math.max(0,Math.min(1,l&&typeof l.opacity=="number"?l.opacity:1)),ior:1.5,transmission:0,clearcoat:.1,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:C,hasCustomAlbedo:$,hasCustomNormal:Fe,hasCustomRoughness:me,hasCustomMetalness:G})}let w=g.find(j=>j.id===A),H=Bt(w,e);d.material=H,d.castShadow=!0,d.receiveShadow=!0,d.userData.materialId=A,d.userData.partName=d.name||`Mesh Part ${M++}`;let F=R.get(A)??[];F.push(d),R.set(A,F);let V=I.get(A)??[];V.push(d.geometry),I.set(A,V)}),g.length===0)throw new Error("No mesh triangles found in the imported file.");if(t&&r){let f=[],d=new Map;try{for(let x of g){let y=T.get(x.id),l=!!y?.map?.image,b=!!y?.normalMap?.image,A=!!y?.roughnessMap?.image,w=!!y?.metalnessMap?.image;if(l||b||A||w){let H=I.get(x.id)??[],F=ot(H),V=t.allocateCustomLayer("none",F.isAtlas);f.push(V),y?.map?.image&&t.writeImageToLayer(V,"albedo",y.map.image,!!y.map.flipY,F),y?.normalMap?.image&&t.writeImageToLayer(V,"normal",y.normalMap.image,!!y.normalMap.flipY,F),y?.roughnessMap?.image&&t.writeImageToLayer(V,"roughness",y.roughnessMap.image,!!y.roughnessMap.flipY,F),y?.metalnessMap?.image&&t.writeImageToLayer(V,"metalness",y.metalnessMap.image,!!y.metalnessMap.flipY,F),d.set(x.id,V)}else d.set(x.id,0)}for(let[x,y]of d)r.set(x,y)}catch(x){for(let y of f)t.releaseCustomLayer(y);throw h.traverse(y=>{let l=y;if(l.isMesh){l.geometry?.dispose();for(let b of Array.isArray(l.material)?l.material:[l.material])b?.dispose()}}),x}}return{group:h,materials:g,meshMap:R,rayTransform:{scale:v,offset:p}}}import*as B from"three";function ut(s){let e=Math.max(1e3,Math.min(4e4,s))/100,t,r,n;return e<=66?(t=255,r=99.4708025861*Math.log(e)-161.1195681661,n=e<=19?0:138.5177312231*Math.log(e-10)-305.0447927307):(t=329.698727446*Math.pow(e-60,-.1332047592),r=288.1221695283*Math.pow(e-60,-.0755148492),n=255),[Math.max(0,Math.min(255,t))/255,Math.max(0,Math.min(255,r))/255,Math.max(0,Math.min(255,n))/255]}function Ke(s){let e=s.replace("#",""),t=parseInt(e.length===3?e.split("").map(u=>u+u).join(""):e,16),r=u=>u<=.04045?u/12.92:Math.pow((u+.055)/1.055,2.4),n=(t>>16&255)/255,a=(t>>8&255)/255,i=(t&255)/255;return[r(n),r(a),r(i)]}function mt(s,e,t){let r=s*Math.PI/180,n=e*Math.PI/180,a=Math.cos(n),i=t*a*Math.sin(r),u=t*Math.sin(n),c=t*a*Math.cos(r);return[i,u,c]}var Le=4,oe=24,ht=`precision highp float;
in vec3 position;
in vec2 uv;
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,It=`precision highp float;
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
uniform float uOrthoHeight;

// Light uniforms: posRadius = (x, y, z, radius), colorEnabled = (r, g, b, enabled ? 1.0 : 0.0)
uniform vec4 uLightPosRadius[${Le}];
uniform vec4 uLightColorEnabled[${Le}];

// Material uniforms: 6 vec4s per material
// matA = (albedo.r, albedo.g, albedo.b, roughness)
// matB = (metalness, ior, transmission, clearcoat)
// matC = (emissiveIntensity, emitterOpacity, surfaceOpacity, 0)
// matD = (texSlice, legacyScale, normalStrength, modeFlag: 0=preset, 1=custom tile, 2=custom atlas)
// matE = (scaleU, scaleV, rotationRadians, offsetU)
// matF = (offsetV, customMetalnessFlag, 0, 0)
uniform vec4 uMatA[${oe}];
uniform vec4 uMatB[${oe}];
uniform vec4 uMatC[${oe}];
uniform vec4 uMatD[${oe}];
uniform vec4 uMatE[${oe}];
uniform vec4 uMatF[${oe}];

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
          int matIdx = clamp(int(p0.w + 0.5), 0, ${oe-1});
          if (uClayMode == 1) {
            return vec3(0.0);
          }
          float trans = uMatB[matIdx].z;
          float surfaceOpacity = uMatC[matIdx].x > 0.01 ? 1.0 : clamp(uMatC[matIdx].z, 0.0, 1.0);
          if (trans < 0.15 && surfaceOpacity >= 0.999) {
            return vec3(0.0);
          }
          // Surface alpha coverage and glass transmission both attenuate shadow visibility.
          vec3 tint = mix(vec3(0.85), uMatA[matIdx].rgb, 0.35);
          vec3 glassVisibility = trans >= 0.15 ? tint * (0.45 + 0.45 * trans) : vec3(0.0);
          visibility *= mix(vec3(1.0), glassVisibility, surfaceOpacity);
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

  if(uOrthoHeight > 0.0){
    ro += uCamRight * ndc.x * uOrthoHeight * uAspect * 0.5 + uCamUp * ndc.y * uOrthoHeight * 0.5;
    rd = normalize(uCamForward);
  }

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
    float emitterOpacity = 1.0;
    float surfaceOpacity = 1.0;

    if (hit.isFloor) {
      albedo = hit.floorAlbedo;
      roughness = hit.floorRoughness;
      metalness = 0.0;
    } else if (uClayMode == 1) {
      int safeClayIdx = clamp(hit.matIdx, 0, ${oe-1});
      albedo = vec3(0.76, 0.73, 0.69);
      roughness = 0.68;
      metalness = 0.0;
      emissiveIntensity = uMatC[safeClayIdx].x;
    } else {
      int safeMatIdx = clamp(hit.matIdx, 0, ${oe-1});
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
      emitterOpacity = clamp(mC.y, 0.0, 1.0);
      surfaceOpacity = emissiveIntensity > 0.01 ? 1.0 : clamp(mC.z, 0.0, 1.0);

      if (mD.w > 0.5 || mD.x > 0.5) {
        vec4 mE = uMatE[safeMatIdx];
        vec4 mF = uMatF[safeMatIdx];
        vec2 centeredUv = hit.uv - vec2(0.5);
        float uvCos = cos(mE.z);
        float uvSin = sin(mE.z);
        centeredUv = mat2(uvCos, uvSin, -uvSin, uvCos) * centeredUv;
        vec2 tiledUv = centeredUv * mE.xy + vec2(0.5 + mE.w, 0.5 + mF.x);
        if (mD.w > 1.5) {
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
        if (mF.y > 0.5) metalness = clamp(metalness * rm.b, 0.0, 1.0);

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
          vec3 mapTangent = normalize(T * uvCos + B * uvSin);
          vec3 mapBitangent = normalize(B * uvCos - T * uvSin);
          vec3 perturbedN = normalize(mapTangent * nMap.x + mapBitangent * nMap.y + N * max(0.08, nMap.z));
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
      radiance += throughput * albedo * emissiveIntensity * emitterOpacity;
      if (emitterOpacity < 0.999) {
        throughput *= 1.0 - emitterOpacity;
        if (max(throughput.r, max(throughput.g, throughput.b)) < 0.002) break;
        ro = hit.pos + rd * 0.002;
        continue;
      }
      break;
    }

    // Stochastic alpha coverage keeps partially transparent surfaces unbiased and
    // lets the existing ray continue through without creating a second transport path.
    if (surfaceOpacity < 0.999 && rand() >= surfaceOpacity) {
      ro = hit.pos + rd * 0.002;
      continue;
    }

    // Dielectric glass / crystal refraction
    if (transmission > 0.15) {
      float eta = entering ? (1.0 / ior) : ior;
      float cosI = clamp(dot(V, N), 0.0, 1.0);
      float sinT2 = eta * eta * (1.0 - cosI * cosI);
      float F0g = pow((1.0 - ior) / (1.0 + ior), 2.0);
      float fresnel = F0g + (1.0 - F0g) * pow(1.0 - cosI, 5.0);

      // Direct specular highlight from studio lights on glass surface
      for (int li = 0; li < ${Le}; li++) {
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
    for (int li = 0; li < ${Le}; li++) {
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
`,Ct=`precision highp float;
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
`,Pt={studio:0,golden:1,loft:2,cornell:3,obsidian:4},Ge=class{constructor(e){L(this,"renderer");L(this,"quadScene");L(this,"quadCamera");L(this,"quadMesh");L(this,"traceMat");L(this,"displayMat");L(this,"rtA");L(this,"rtB");L(this,"pingPong",0);L(this,"sampleIndex",0);L(this,"width",640);L(this,"height",480);L(this,"targetType");L(this,"bvhData",null);L(this,"dummyTex");L(this,"dummyArrayTex");L(this,"camPos",new B.Vector3);L(this,"camRight",new B.Vector3);L(this,"camUp",new B.Vector3);L(this,"camForward",new B.Vector3);this.renderer=e;let t=e.getContext(),r=!!t.getExtension("EXT_color_buffer_float"),n=!!t.getExtension("EXT_color_buffer_half_float");this.targetType=r?B.FloatType:n?B.HalfFloatType:B.UnsignedByteType,this.rtA=this.createTarget(this.width,this.height),this.rtB=this.createTarget(this.width,this.height);let a=Array.from({length:Le},()=>new B.Vector4),i=Array.from({length:Le},()=>new B.Vector4),u=Array.from({length:oe},()=>new B.Vector4(.8,.8,.8,.4)),c=Array.from({length:oe},()=>new B.Vector4(0,1.5,0,0)),m=Array.from({length:oe},()=>new B.Vector4(0,1,1,0)),o=Array.from({length:oe},()=>new B.Vector4(0,1,1,0)),v=Array.from({length:oe},()=>new B.Vector4(1,1,0,0)),p=Array.from({length:oe},()=>new B.Vector4(0,0,0,0));this.dummyTex=new B.DataTexture(new Float32Array(4),1,1,B.RGBAFormat,B.FloatType),this.dummyTex.needsUpdate=!0,this.dummyArrayTex=new B.DataArrayTexture(new Uint8Array([255,255,255,255]),1,1,1),this.dummyArrayTex.format=B.RGBAFormat,this.dummyArrayTex.type=B.UnsignedByteType,this.dummyArrayTex.minFilter=B.LinearFilter,this.dummyArrayTex.magFilter=B.LinearFilter,this.dummyArrayTex.needsUpdate=!0,this.traceMat=new B.RawShaderMaterial({glslVersion:B.GLSL3,vertexShader:ht,fragmentShader:It,depthTest:!1,depthWrite:!1,uniforms:{uPrevFrame:{value:this.rtA.texture},uBvhTex:{value:this.dummyTex},uTriPosTex:{value:this.dummyTex},uTriNormTex:{value:this.dummyTex},uTriUvTex:{value:this.dummyTex},uAlbedoArray:{value:this.dummyArrayTex},uNormalArray:{value:this.dummyArrayTex},uRoughMetalArray:{value:this.dummyArrayTex},uCustomAlbedoArray:{value:this.dummyArrayTex},uCustomNormalArray:{value:this.dummyArrayTex},uCustomRoughMetalArray:{value:this.dummyArrayTex},uTexWidth:{value:1024},uSampleIndex:{value:0},uMaxBounces:{value:4},uClayMode:{value:0},uEnvMode:{value:0},uEnvIntensity:{value:.85},uResolution:{value:new B.Vector2(this.width,this.height)},uCamPos:{value:new B.Vector3},uCamRight:{value:new B.Vector3(1,0,0)},uCamUp:{value:new B.Vector3(0,1,0)},uCamForward:{value:new B.Vector3(0,0,-1)},uTanHalfFov:{value:.35},uAspect:{value:1.33},uOrthoHeight:{value:0},uLightPosRadius:{value:a},uLightColorEnabled:{value:i},uMatA:{value:u},uMatB:{value:c},uMatC:{value:m},uMatD:{value:o},uMatE:{value:v},uMatF:{value:p}}}),this.displayMat=new B.RawShaderMaterial({glslVersion:B.GLSL3,vertexShader:ht,fragmentShader:Ct,depthTest:!1,depthWrite:!1,uniforms:{uAccumTex:{value:this.rtB.texture},uResolution:{value:new B.Vector2(this.width,this.height)},uExposure:{value:1.08},uDenoiser:{value:1},uSampleCount:{value:1}}});let h=new B.PlaneGeometry(2,2);this.quadMesh=new B.Mesh(h,this.traceMat),this.quadMesh.frustumCulled=!1,this.quadScene=new B.Scene,this.quadScene.add(this.quadMesh),this.quadCamera=new B.OrthographicCamera(-1,1,1,-1,0,1)}createTarget(e,t){return new B.WebGLRenderTarget(e,t,{minFilter:B.NearestFilter,magFilter:B.NearestFilter,format:B.RGBAFormat,type:this.targetType,depthBuffer:!1,stencilBuffer:!1})}setTextureArrays(e){this.traceMat.uniforms.uAlbedoArray.value=e.albedoArray,this.traceMat.uniforms.uNormalArray.value=e.normalArray,this.traceMat.uniforms.uRoughMetalArray.value=e.roughMetalArray,this.traceMat.uniforms.uCustomAlbedoArray.value=e.customAlbedoArray,this.traceMat.uniforms.uCustomNormalArray.value=e.customNormalArray,this.traceMat.uniforms.uCustomRoughMetalArray.value=e.customRoughMetalArray,this.resetAccumulation()}setBVH(e){this.bvhData&&(this.bvhData.bvhTexture.dispose(),this.bvhData.triPosTexture.dispose(),this.bvhData.triNormTexture.dispose(),this.bvhData.triUvTexture.dispose()),this.bvhData=e,this.traceMat.uniforms.uBvhTex.value=e.bvhTexture,this.traceMat.uniforms.uTriPosTex.value=e.triPosTexture,this.traceMat.uniforms.uTriNormTex.value=e.triNormTexture,this.traceMat.uniforms.uTriUvTex.value=e.triUvTexture,this.traceMat.uniforms.uTexWidth.value=e.texWidth,this.resetAccumulation()}resize(e,t){let r=Math.max(64,Math.floor(e)),n=Math.max(64,Math.floor(t));r===this.width&&n===this.height||(this.width=r,this.height=n,this.rtA.setSize(r,n),this.rtB.setSize(r,n),this.traceMat.uniforms.uResolution.value.set(r,n),this.displayMat.uniforms.uResolution.value.set(r,n),this.resetAccumulation())}resetAccumulation(){this.sampleIndex=0}getSamples(){return this.sampleIndex}getResolution(){return[this.width,this.height]}syncLights(e){let t=this.traceMat.uniforms.uLightPosRadius.value,r=this.traceMat.uniforms.uLightColorEnabled.value;for(let n=0;n<Le;n++){let a=e[n];if(!a){r[n].set(0,0,0,0);continue}let[i,u,c]=mt(a.azimuth,a.elevation,a.distance);t[n].set(i,u,c,a.radius);let m=1,o=1,v=1;if(a.useKelvin){let[h,g,E]=ut(a.kelvin);m=Math.pow(h,2.2),o=Math.pow(g,2.2),v=Math.pow(E,2.2)}else[m,o,v]=Ke(a.color);let p=a.intensity*.48;r[n].set(m*p,o*p,v*p,a.enabled?1:0)}}syncMaterials(e,t,r){if(!this.bvhData)return;let n=this.traceMat.uniforms.uMatA.value,a=this.traceMat.uniforms.uMatB.value,i=this.traceMat.uniforms.uMatC.value,u=this.traceMat.uniforms.uMatD.value,c=this.traceMat.uniforms.uMatE.value,m=this.traceMat.uniforms.uMatF.value;for(let o of e){let v=this.bvhData.materialIdToIndex.get(o.id);if(v===void 0||v>=oe)continue;let[p,h,g]=Ke(o.color),E=t?.get(o.id)??Pe[o.texturePreset]??0,{slice:R,modeFlag:T}=r?r.getLayerShaderInfo(E):{slice:E>=100?E-100:E,modeFlag:E>=100?1:0};n[v].set(p,h,g,o.roughness),a[v].set(o.metalness,o.ior,o.transmission,o.clearcoat),i[v].set(o.emissiveIntensity,o.emissiveOpacity??1,o.surfaceOpacity??1,0),u[v].set(R,o.uvScale,o.normalStrength,T),c[v].set(o.uvScaleX??o.uvScale,o.uvScaleY??o.uvScale,(o.uvRotation??0)*Math.PI/180,o.uvOffsetX??0),m[v].set(o.uvOffsetY??0,o.hasCustomMetalness?1:0,0,0)}}traceSample(e,t,r,n,a,i,u){this.syncLights(t),this.syncMaterials(r,i,u),e.updateMatrixWorld(),this.camPos.copy(e.position),e.matrixWorld.extractBasis(this.camRight,this.camUp,this.camForward),this.camForward.negate();let c=Math.tan(B.MathUtils.degToRad(e.fov*.5)),m=this.traceMat.uniforms;m.uCamPos.value.copy(this.camPos),m.uCamRight.value.copy(this.camRight),m.uCamUp.value.copy(this.camUp),m.uCamForward.value.copy(this.camForward),m.uTanHalfFov.value=c,m.uAspect.value=e.aspect;let o=e;m.uOrthoHeight.value=o.isOrthographicCamera?(o.top-o.bottom)/e.zoom:0,m.uSampleIndex.value=this.sampleIndex,m.uMaxBounces.value=a?Math.min(2,n.maxBounces):n.maxBounces,m.uClayMode.value=n.clayMode?1:0,m.uEnvMode.value=Pt[n.environment],m.uEnvIntensity.value=n.envIntensity;let v=this.pingPong===0?this.rtA:this.rtB,p=this.pingPong===0?this.rtB:this.rtA;m.uPrevFrame.value=v.texture,this.quadMesh.material=this.traceMat;let h=this.renderer.getRenderTarget(),g=this.renderer.autoClear;this.renderer.autoClear=!1,this.renderer.setRenderTarget(p),this.renderer.render(this.quadScene,this.quadCamera),this.renderer.setRenderTarget(h),this.renderer.autoClear=g,this.pingPong=1-this.pingPong,this.sampleIndex++}displayToScreen(e,t){let r=this.pingPong===0?this.rtA:this.rtB;this.displayMat.uniforms.uAccumTex.value=r.texture,this.displayMat.uniforms.uExposure.value=e.exposure,this.displayMat.uniforms.uDenoiser.value=e.denoiser?1:0,this.displayMat.uniforms.uSampleCount.value=Math.max(1,this.sampleIndex),this.quadMesh.material=this.displayMat;let n=this.renderer.autoClear;this.renderer.autoClear=!1,this.renderer.setRenderTarget(null),t?(this.renderer.setScissorTest(!0),this.renderer.setScissor(t.x,t.y,t.w,t.h),this.renderer.render(this.quadScene,this.quadCamera),this.renderer.setScissorTest(!1)):this.renderer.render(this.quadScene,this.quadCamera),this.renderer.autoClear=n}dispose(){this.rtA.dispose(),this.rtB.dispose(),this.traceMat.dispose(),this.displayMat.dispose(),this.quadMesh.geometry.dispose(),this.dummyTex.dispose(),this.dummyArrayTex.dispose(),this.bvhData&&(this.bvhData.bvhTexture.dispose(),this.bvhData.triPosTexture.dispose(),this.bvhData.triNormTexture.dispose(),this.bvhData.triUvTexture.dispose())}};var J=[{id:"key",name:"Key Softbox",role:"key",enabled:!0,useKelvin:!0,kelvin:5200,color:"#fff4e6",intensity:24,azimuth:42,elevation:46,distance:4.4,radius:.65},{id:"fill",name:"Cool Fill",role:"fill",enabled:!0,useKelvin:!0,kelvin:7600,color:"#d8e8ff",intensity:10,azimuth:-58,elevation:28,distance:4.8,radius:1.1},{id:"rim",name:"Edge Rim",role:"rim",enabled:!0,useKelvin:!0,kelvin:3600,color:"#ffd19c",intensity:18,azimuth:-145,elevation:36,distance:4.2,radius:.35},{id:"accent",name:"Overhead Bounce",role:"accent",enabled:!1,useKelvin:!0,kelvin:6200,color:"#eef5ff",intensity:12,azimuth:10,elevation:78,distance:4.5,radius:1.2}],dt=[{id:"three-point",name:"Three-Point Studio",environment:"studio",envIntensity:.85,lights:J},{id:"golden-hour",name:"Golden Hour",environment:"golden",envIntensity:1.15,lights:[{...J[0],kelvin:3100,intensity:30,azimuth:64,elevation:18,radius:.45},{...J[1],kelvin:8200,intensity:8,azimuth:-100,elevation:42,radius:1.3},{...J[2],kelvin:2600,intensity:22,azimuth:-135,elevation:24,radius:.3},{...J[3],enabled:!1}]},{id:"chiaroscuro",name:"Chiaroscuro",environment:"obsidian",envIntensity:.15,lights:[{...J[0],kelvin:4800,intensity:34,azimuth:52,elevation:38,radius:.22},{...J[1],enabled:!1,intensity:4},{...J[2],kelvin:5800,intensity:26,azimuth:-152,elevation:40,radius:.18},{...J[3],enabled:!1}]},{id:"product-softbox",name:"Product Softbox",environment:"loft",envIntensity:1,lights:[{...J[0],kelvin:5600,intensity:22,azimuth:32,elevation:58,radius:1.25},{...J[1],kelvin:5600,intensity:14,azimuth:-42,elevation:48,radius:1.25},{...J[2],kelvin:6500,intensity:16,azimuth:170,elevation:52,radius:.8},{...J[3],enabled:!0,kelvin:5800,intensity:14,azimuth:0,elevation:82,radius:1.4}]},{id:"cornell-gi",name:"Cornell Bounce",environment:"cornell",envIntensity:.9,lights:[{...J[0],kelvin:5e3,intensity:24,azimuth:15,elevation:74,distance:3.6,radius:.8},{...J[1],kelvin:6e3,intensity:6,azimuth:-60,elevation:30,radius:1},{...J[2],enabled:!1},{...J[3],enabled:!1}]}],Je=[{id:"brushed-titanium",name:"Brushed Titanium",color:"#b4bac2",roughness:.24,metalness:.96,ior:1.5,transmission:0,clearcoat:.15,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:2,normalStrength:1},{id:"polished-chrome",name:"Mirror Chrome",color:"#eef1f5",roughness:.04,metalness:1,ior:1.5,transmission:0,clearcoat:.2,emissiveIntensity:0,texturePreset:"none",uvScale:1.5,normalStrength:1},{id:"anodized-gold",name:"Satin Brass",color:"#d6a456",roughness:.22,metalness:.94,ior:1.5,transmission:0,clearcoat:.2,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:2,normalStrength:.8},{id:"optical-crystal",name:"Optical Glass",color:"#eef8ff",roughness:.03,metalness:0,ior:1.54,transmission:.96,clearcoat:1,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"smoked-acrylic",name:"Smoked Quartz",color:"#6b7b8c",roughness:.12,metalness:0,ior:1.49,transmission:.82,clearcoat:.9,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"matte-ceramic",name:"Honed Travertine",color:"#d6cfc4",roughness:.72,metalness:0,ior:1.45,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"travertine",uvScale:2,normalStrength:1},{id:"car-lacquer",name:"Carbon Lacquer",color:"#1b1f26",roughness:.24,metalness:.15,ior:1.5,transmission:0,clearcoat:1,emissiveIntensity:0,texturePreset:"carbon-weave",uvScale:2,normalStrength:1},{id:"warm-emissive",name:"Filament Glow",color:"#ffbe6b",roughness:.2,metalness:0,ior:1.45,transmission:0,clearcoat:0,emissiveIntensity:3.5,texturePreset:"none",uvScale:1,normalStrength:0},{id:"brushed-aluminum",name:"Brushed Aluminum",color:"#c5ccd2",roughness:.31,metalness:.94,ior:1.5,transmission:0,clearcoat:.1,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:2.2,normalStrength:.72},{id:"warm-copper",name:"Warm Copper",color:"#b66c46",roughness:.27,metalness:.97,ior:1.5,transmission:0,clearcoat:.18,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:1.8,normalStrength:.68},{id:"black-oxide-steel",name:"Black Oxide Steel",color:"#343a40",roughness:.34,metalness:.93,ior:1.5,transmission:0,clearcoat:.22,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:1.6,normalStrength:.7},{id:"pearl-enamel",name:"Pearl Enamel",color:"#e7e0d5",roughness:.16,metalness:.08,ior:1.48,transmission:0,clearcoat:.92,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"matte-polymer",name:"Matte Polymer",color:"#59616b",roughness:.62,metalness:.03,ior:1.46,transmission:0,clearcoat:.08,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"walnut-wood",name:"Walnut Wood",color:"#75452f",roughness:.43,metalness:0,ior:1.46,transmission:0,clearcoat:.12,emissiveIntensity:0,texturePreset:"cedar-wood",uvScale:1.7,normalStrength:.78},{id:"black-leather",name:"Black Leather",color:"#282321",roughness:.7,metalness:0,ior:1.46,transmission:0,clearcoat:.04,emissiveIntensity:0,texturePreset:"vulcanite",uvScale:1.35,normalStrength:.68},{id:"cast-concrete",name:"Cast Concrete",color:"#888780",roughness:.91,metalness:0,ior:1.45,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"concrete",uvScale:1.4,normalStrength:.82},{id:"polished-marble",name:"Polished Marble",color:"#d7d1c7",roughness:.19,metalness:0,ior:1.5,transmission:0,clearcoat:.38,emissiveIntensity:0,texturePreset:"travertine",uvScale:1.65,normalStrength:.55},{id:"frosted-glass",name:"Frosted Glass",color:"#c5dbe4",roughness:.28,metalness:0,ior:1.48,transmission:.78,clearcoat:.92,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"emerald-glass",name:"Emerald Glass",color:"#287466",roughness:.07,metalness:0,ior:1.52,transmission:.94,clearcoat:1,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"soft-rubber",name:"Soft Rubber",color:"#242629",roughness:.84,metalness:0,ior:1.46,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"vulcanite",uvScale:1.1,normalStrength:.7},{id:"warm-limestone",name:"Warm Limestone",color:"#c9b99b",roughness:.67,metalness:0,ior:1.48,transmission:0,clearcoat:.06,emissiveIntensity:0,texturePreset:"limestone",uvScale:1.35,normalStrength:.58},{id:"red-clay-brick",name:"Red Clay Brick",color:"#a64f39",roughness:.9,metalness:0,ior:1.46,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"brick",uvScale:.82,normalStrength:.86},{id:"spotted-gum",name:"Spotted Gum",color:"#a8653e",roughness:.48,metalness:0,ior:1.46,transmission:0,clearcoat:.14,emissiveIntensity:0,texturePreset:"cedar-wood",uvScale:2.1,normalStrength:.74},{id:"architectural-terrazzo",name:"Terrazzo",color:"#d8d0c2",roughness:.32,metalness:0,ior:1.5,transmission:0,clearcoat:.22,emissiveIntensity:0,texturePreset:"terrazzo",uvScale:1.25,normalStrength:.36},{id:"glazed-ceramic-tile",name:"Glazed Ceramic Tile",color:"#e6e2d8",roughness:.16,metalness:0,ior:1.49,transmission:0,clearcoat:.88,emissiveIntensity:0,texturePreset:"ceramic-tile",uvScale:1,normalStrength:.18},{id:"lime-plaster",name:"Lime Plaster",color:"#d7cfbd",roughness:.86,metalness:0,ior:1.46,transmission:0,clearcoat:.02,emissiveIntensity:0,texturePreset:"plaster",uvScale:1.5,normalStrength:.42},{id:"corten-steel",name:"Weathered Corten Steel",color:"#a75536",roughness:.71,metalness:.82,ior:1.5,transmission:0,clearcoat:.12,emissiveIntensity:0,texturePreset:"corten-steel",uvScale:1.7,normalStrength:.7},{id:"polished-concrete",name:"Polished Concrete",color:"#a3a09a",roughness:.29,metalness:0,ior:1.48,transmission:0,clearcoat:.18,emissiveIntensity:0,texturePreset:"concrete",uvScale:1.35,normalStrength:.36}],ft={maxBounces:4,maxSamples:128,exposure:1.08,denoiser:!0,interactiveScale:.5,clayMode:!1,showLightGizmos:!0,environment:"studio",envIntensity:.85};function pt(s,e){if(!/^#[\da-f]{6}$/i.test(s))return"#808080";let t=Number.parseInt(s.slice(1),16);return`#${[16,8,0].map(r=>{let n=t>>r&255,a=e>=0?n+(255-n)*e:n*(1+e);return Math.round(Math.max(0,Math.min(255,a))).toString(16).padStart(2,"0")}).join("")}`}function Lt(s,e){let t='stroke="#ffffff" stroke-opacity=".24" fill="none"';switch(s.texturePreset){case"brushed-metal":return`<pattern id="${e}" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 1H8M0 5H8" ${t} stroke-width=".7"/></pattern>`;case"carbon-weave":return`<pattern id="${e}" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M0 0H4V4H0ZM5 5H9V9H5Z" fill="#fff" fill-opacity=".18"/><path d="M5 0H9V4H5ZM0 5H4V9H0Z" fill="#000" fill-opacity=".2"/></pattern>`;case"vulcanite":return`<pattern id="${e}" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#fff" fill-opacity=".22"/><circle cx="6" cy="6" r="1" fill="#000" fill-opacity=".22"/></pattern>`;case"guilloche":return`<pattern id="${e}" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="9" cy="9" r="5.5" ${t} stroke-width=".7"/><circle cx="9" cy="9" r="2.5" ${t} stroke-width=".6"/></pattern>`;case"concrete":return`<pattern id="${e}" width="13" height="13" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r=".9" fill="#000" fill-opacity=".22"/><circle cx="10" cy="9" r=".8" fill="#fff" fill-opacity=".32"/><path d="M1 11L5 10M8 2L12 1" ${t} stroke-width=".6"/></pattern>`;case"cedar-wood":return`<pattern id="${e}" width="15" height="15" patternUnits="userSpaceOnUse"><path d="M0 3C4 1 10 5 15 2M0 10C5 7 10 12 15 9" ${t} stroke-width="1"/></pattern>`;case"travertine":return`<pattern id="${e}" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M-2 5C3 1 9 9 20 3M-2 13C4 9 11 17 20 11" ${t} stroke-width="1.1"/></pattern>`;case"limestone":return`<pattern id="${e}" width="16" height="14" patternUnits="userSpaceOnUse"><path d="M0 3C4 1 9 5 16 2M0 9C5 7 11 11 16 8" ${t} stroke-width="1"/><circle cx="4" cy="12" r=".7" fill="#000" fill-opacity=".2"/><circle cx="13" cy="5" r=".55" fill="#fff" fill-opacity=".32"/></pattern>`;case"brick":return`<pattern id="${e}" width="20" height="14" patternUnits="userSpaceOnUse"><path d="M0 0H20M0 7H20M0 14H20M10 0V7M0 7V14" stroke="#eee2d3" stroke-opacity=".5" stroke-width="1.2"/><path d="M1 1H9V6H1ZM11 1H19V6H11ZM1 8H9V13H1ZM11 8H19V13H11Z" fill="#000" fill-opacity=".08"/></pattern>`;case"terrazzo":return`<pattern id="${e}" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M2 4L5 2 7 5 4 7ZM11 3L14 2 15 5 12 6ZM8 11L11 9 13 12 10 14ZM1 14L3 12 5 14 3 16ZM15 15L17 13 18 16Z" fill="#66584c" fill-opacity=".58"/><circle cx="7" cy="3" r="1" fill="#a47758" fill-opacity=".65"/><circle cx="14" cy="10" r=".8" fill="#737b70" fill-opacity=".58"/></pattern>`;case"ceramic-tile":return`<pattern id="${e}" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 0H20V20H0Z" fill="none" stroke="#fff" stroke-opacity=".62" stroke-width="1.5"/><path d="M2 2H18V18H2Z" fill="none" stroke="#000" stroke-opacity=".08" stroke-width=".7"/></pattern>`;case"plaster":return`<pattern id="${e}" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M1 4C4 2 8 5 12 3M3 12C7 9 11 13 15 10M7 1L8 2M13 7L14 8" ${t} stroke-width=".75"/></pattern>`;case"corten-steel":return`<pattern id="${e}" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r="2.2" fill="#411d16" fill-opacity=".24"/><circle cx="11" cy="3" r="1.5" fill="#e09a62" fill-opacity=".38"/><circle cx="8" cy="12" r="3" fill="#59271a" fill-opacity=".2"/><path d="M0 9C4 7 10 11 16 8" stroke="#f2bd84" stroke-opacity=".28" fill="none" stroke-width="1"/></pattern>`;default:return""}}function yt(s,e="material"){let t=s.id.replace(/[^a-z0-9-]/gi,"-"),r=`${e}-sphere-${t}`,n=`${e}-clip-${t}`,a=`${e}-pattern-${t}`,i=s.transmission>.55,u=Math.min(.8,.2+s.metalness*.28+s.clearcoat*.25),c=4+s.roughness*10,m=s.texturePreset==="none"?"":`<circle cx="40" cy="40" r="31" fill="url(#${a})" clip-path="url(#${n})" opacity=".85"/>`,o=s.texturePreset==="none"?"":Lt(s,a);return`<svg viewBox="0 0 80 80" aria-hidden="true" focusable="false"><defs><radialGradient id="${r}" cx="31%" cy="25%" r="78%"><stop offset="0%" stop-color="${pt(s.color,.72)}"/><stop offset="38%" stop-color="${s.color}"/><stop offset="100%" stop-color="${pt(s.color,-.42)}"/></radialGradient><clipPath id="${n}"><circle cx="40" cy="40" r="31"/></clipPath>${o}</defs>${s.emissiveIntensity>0?`<circle cx="40" cy="40" r="35" fill="${s.color}" opacity=".18"/>`:""}<circle cx="40" cy="40" r="31" fill="url(#${r})"/>${m}${i?'<circle cx="40" cy="40" r="29.5" fill="#d8f3ff" opacity=".1"/>':""}<ellipse cx="30" cy="25" rx="${c}" ry="${3+s.roughness*4}" transform="rotate(-28 30 25)" fill="#fff" opacity="${u}"/><ellipse cx="48" cy="52" rx="17" ry="8" transform="rotate(-34 48 52)" fill="#fff" opacity="${Math.max(.04,(1-s.roughness)*.14)}"/><circle cx="40" cy="40" r="30.5" fill="none" stroke="${i?"#dff7ff":"#fff"}" stroke-opacity="${i?.72:.24}" stroke-width="${i?1.8:1}"/></svg>`}function vt(s){try{let e=s.getContext(),t=e.getExtension("WEBGL_debug_renderer_info"),r=t?t.UNMASKED_RENDERER_WEBGL:e.RENDERER;return/SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(String(e.getParameter(r)))}catch{return!0}}function gt(s){s&&s.group.traverse(e=>{e.geometry?.dispose?.();for(let t of Array.isArray(e.material)?e.material:[e.material])t?.dispose?.()})}async function yr(s,e){let t=new ke(s.capabilities.getMaxAnisotropy()),r=new Map,n=null,a=null;try{let g=function(){return{settings:{...c},lights:m.map(l=>({...l})),materials:v.materials.map(l=>{let b=r.get(l.id)??Pe[l.texturePreset]??0;return{...l,mapPreviews:{albedo:t.getMapPreviewDataUrl(b,"albedo"),normal:t.getMapPreviewDataUrl(b,"normal"),roughness:t.getMapPreviewDataUrl(b,"roughness"),metalness:l.hasCustomMetalness?t.getMapPreviewDataUrl(b,"metalness"):null}}}),samples:a?.getSamples()??0,resolution:a?.getResolution()??[0,0],materialPresets:Je.map(l=>({...l,previewSvg:yt(l,"boxlab-material")}))}},E=function(l){for(let b=0;b<m.length;b++)l[b]&&Object.assign(m[b],l[b]);a?.resetAccumulation()},R=function(l,b){let A=v.materials.find(F=>F.id===l);if(!A)return;let w={};for(let F of["color","roughness","metalness","ior","transmission","clearcoat","emissiveIntensity","emissiveOpacity","surfaceOpacity","texturePreset","uvScale","uvScaleX","uvScaleY","uvOffsetX","uvOffsetY","uvRotation","normalStrength"])b[F]!==void 0&&Object.assign(w,{[F]:b[F]});let H=!!(A.hasCustomAlbedo||A.hasCustomNormal||A.hasCustomRoughness||A.hasCustomMetalness);H&&delete w.texturePreset,Object.assign(A,w),!H&&w.texturePreset&&r.set(l,Pe[w.texturePreset]),a?.resetAccumulation()},I=function(l){let b=v.materials.find(H=>H.id===l);if(!b)return;let A=r.get(l);A!==void 0&&t.releaseCustomLayer(A);let w=p.get(l);w!==void 0&&t.releaseCustomLayer(w),r.delete(l),b.hasCustomAlbedo=!1,b.hasCustomNormal=!1,b.hasCustomRoughness=!1,b.hasCustomMetalness=!1,a?.resetAccumulation()},M=function(l,b){let A=v.materials.find(H=>H.id===l),w=Je.find(H=>H.id===b);!A||!w||R(l,{...w})},f=function(l){Object.assign(c,l),a?.resetAccumulation()},d=function(l){let b=dt.find(A=>A.id===l);b&&(E(b.lights.map(A=>({...A}))),f({environment:b.environment,envIntensity:b.envIntensity}))},x=function(l){f(l.settings),E(l.lights);for(let b of v.materials){let A=l.materials.find(w=>w.id===b.id);A&&R(b.id,A)}},y=function(){h=!0,a?.dispose(),a=null,t.dispose(),gt(v)},i=new File([e],"BoxLab_Current.glb",{type:"model/gltf-binary"});n=await ct(i,vt(s),t,r);let u=Qe(n.group);a=new Ge(s),a.setTextureArrays(t),a.setBVH(u);let c={...ft},m=J.map(l=>({...l})),o={scale:n.rayTransform.scale,offset:n.rayTransform.offset.clone()},v=n,p=new Map,h=!1;async function T(l,b,A){let w=v.materials.find(V=>V.id===l);if(!w||!A.type.startsWith("image/"))return;if(h)throw new Error("Helios scene has been disposed.");if(p.has(l))throw new Error("Wait for this material texture upload to finish.");let H=r.get(l),F=H===void 0||H<ue;F&&(H=t.allocateCustomLayer(w.texturePreset,!1)),p.set(l,H);try{if(await t.writeFileToLayer(H,b,A),h)throw new Error("Texture upload cancelled: Helios scene closed.");r.set(l,H)}catch(V){throw F&&t.releaseCustomLayer(H),V}finally{p.delete(l)}b==="albedo"?w.hasCustomAlbedo=!0:b==="normal"?w.hasCustomNormal=!0:b==="roughness"?w.hasCustomRoughness=!0:b==="metalness"&&(w.hasCustomMetalness=!0),a?.resetAccumulation()}return{transform:o,getState:g,updateLights:E,updateMaterial:R,uploadMaterialMap:T,restoreMaterialPresetMaps:I,applyMaterialPreset:M,updateSettings:f,applyLightingRig:d,applyPreferences:x,render(l,b=!1){if(!a)return 0;let A=b?1:c.maxSamples;return a.getSamples()<A&&a.traceSample(l,m,v.materials,c,b,r,t),a.displayToScreen(c),a.getSamples()},resize(l,b,A=!1){let w=vt(s)?1:Math.min(window.devicePixelRatio||1,1.5),H=A?c.interactiveScale:1;a?.resize(Math.floor(l*w*H),Math.floor(b*w*H))},captureSnapshot(){return!a||a.getSamples()<c.maxSamples?null:(a.displayToScreen(c),s.domElement.toDataURL("image/png"))},reset(){a?.resetAccumulation()},dispose:y}}catch(i){throw a?.dispose(),t.dispose(),gt(n),i}}export{yr as createBoxLabHeliosTrace};
