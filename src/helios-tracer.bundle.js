/* HeliosStudio integration bundle; source commit 0e79c5163e5d87703d369250e1a9fff9e2b9085f. Rebuild with npm run build:helios-tracer. */
var xt=Object.defineProperty;var bt=(s,e,t)=>e in s?xt(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var L=(s,e,t)=>bt(s,typeof e!="symbol"?e+"":e,t);import*as k from"three";var Y=1024,Mt=24;function He(s,e,t){let r=new k.DataTexture(s,e,t,k.RGBAFormat,k.FloatType);return r.minFilter=k.NearestFilter,r.magFilter=k.NearestFilter,r.generateMipmaps=!1,r.wrapS=k.ClampToEdgeWrapping,r.wrapT=k.ClampToEdgeWrapping,r.needsUpdate=!0,r}function Qe(s){s.updateMatrixWorld(!0);let e=[],t=new Map,r=new k.Vector3,a=new k.Vector3,n=new k.Vector3,i=new k.Vector3,d=new k.Vector3,l=new k.Vector3,h=new k.Vector3,o=new k.Vector3,g=new k.Vector3,v=new k.Matrix3;if(s.traverse(V=>{let B=V;if(!B.isMesh||!B.geometry||!B.visible||B.userData.excludeFromRaytracer)return;let A=B.geometry,N=A.getAttribute("position");if(!N)return;let _=A.getAttribute("normal"),Q=A.getAttribute("uv"),j=A.getIndex(),ie=String(B.userData.materialId||"default"),se=t.get(ie);se===void 0&&(se=Math.min(t.size,Mt-1),t.set(ie,se));let he=B.matrixWorld;v.getNormalMatrix(he);let $=Math.floor(j?j.count/3:N.count/3);for(let le=0;le<$;le++){let de=j?j.getX(le*3):le*3,Ee=j?j.getX(le*3+1):le*3+1,Re=j?j.getX(le*3+2):le*3+2;if(r.fromBufferAttribute(N,de).applyMatrix4(he),a.fromBufferAttribute(N,Ee).applyMatrix4(he),n.fromBufferAttribute(N,Re).applyMatrix4(he),h.subVectors(a,r),o.subVectors(n,r),g.crossVectors(h,o),g.lengthSq()<1e-12)continue;_?(i.fromBufferAttribute(_,de).applyMatrix3(v).normalize(),d.fromBufferAttribute(_,Ee).applyMatrix3(v).normalize(),l.fromBufferAttribute(_,Re).applyMatrix3(v).normalize()):(g.normalize(),i.copy(g),d.copy(g),l.copy(g));let Ae=0,W=0,te=0,re=0,fe=0,pe=0;if(Q)Ae=Q.getX(de),W=Q.getY(de),te=Q.getX(Ee),re=Q.getY(Ee),fe=Q.getX(Re),pe=Q.getY(Re);else{let xe=Math.abs(g.x),be=Math.abs(g.y),ye=Math.abs(g.z);if(be>=xe&&be>=ye){let q=g.y>=0?-1:1;Ae=r.x,W=r.z*q,te=a.x,re=a.z*q,fe=n.x,pe=n.z*q}else if(xe>=be&&xe>=ye){let q=g.x>=0?-1:1;Ae=r.z*q,W=r.y,te=a.z*q,re=a.y,fe=n.z*q,pe=n.y}else{let q=g.z>=0?1:-1;Ae=r.x*q,W=r.y,te=a.x*q,re=a.y,fe=n.x*q,pe=n.y}}e.push({v0x:r.x,v0y:r.y,v0z:r.z,v1x:a.x,v1y:a.y,v1z:a.z,v2x:n.x,v2y:n.y,v2z:n.z,n0x:i.x,n0y:i.y,n0z:i.z,n1x:d.x,n1y:d.y,n1z:d.z,n2x:l.x,n2y:l.y,n2z:l.z,u0:Ae,v0:W,u1:te,v1:re,u2:fe,v2:pe,cx:(r.x+a.x+n.x)/3,cy:(r.y+a.y+n.y)/3,cz:(r.z+a.z+n.z)/3,minX:Math.min(r.x,a.x,n.x),minY:Math.min(r.y,a.y,n.y),minZ:Math.min(r.z,a.z,n.z),maxX:Math.max(r.x,a.x,n.x),maxY:Math.max(r.y,a.y,n.y),maxZ:Math.max(r.z,a.z,n.z),matIdx:se})}}),e.length===0){let V=new Float32Array(Y*4),B=new Float32Array(Y*4),A=new Float32Array(Y*4),N=new Float32Array(Y*4);return{triangleCount:0,nodeCount:1,bvhTexture:He(V,Y,1),triPosTexture:He(B,Y,1),triNormTexture:He(A,Y,1),triUvTexture:He(N,Y,1),texWidth:Y,bvhTexHeight:1,triTexHeight:1,materialIdToIndex:t}}let f=new Int32Array(e.length);for(let V=0;V<e.length;V++)f[V]=V;let x=new Array(e.length*2+2),T=1;function E(V,B,A){let N=1/0,_=1/0,Q=1/0,j=-1/0,ie=-1/0,se=-1/0;for(let he=0;he<A;he++){let $=e[f[B+he]];$.minX<N&&(N=$.minX),$.minY<_&&(_=$.minY),$.minZ<Q&&(Q=$.minZ),$.maxX>j&&(j=$.maxX),$.maxY>ie&&(ie=$.maxY),$.maxZ>se&&(se=$.maxZ)}x[V]={minX:N-1e-4,minY:_-1e-4,minZ:Q-1e-4,maxX:j+1e-4,maxY:ie+1e-4,maxZ:se+1e-4,leftFirst:B,triCount:A}}let M=8,S=new Float64Array(M),b=new Float64Array(M),p=new Float64Array(M),m=new Float64Array(M),c=new Float64Array(M),u=new Float64Array(M),y=new Int32Array(M),R=new Float64Array(M-1),w=new Int32Array(M-1);function C(V,B,A,N,_,Q){let j=N-V,ie=_-B,se=Q-A;return j<=0&&ie<=0&&se<=0?0:2*(j*ie+ie*se+se*j)}function P(V,B){let A=x[V],N=A.leftFirst,_=A.triCount;if(_<=2||B>=26)return;let Q=-1,j=0,ie=1/0,se=C(A.minX,A.minY,A.minZ,A.maxX,A.maxY,A.maxZ),he=_;for(let W=0;W<3;W++){let te=1/0,re=-1/0;for(let I=0;I<_;I++){let O=e[f[N+I]],we=W===0?O.cx:W===1?O.cy:O.cz;we<te&&(te=we),we>re&&(re=we)}if(re-te<1e-6)continue;y.fill(0);for(let I=0;I<M;I++)S[I]=1/0,b[I]=1/0,p[I]=1/0,m[I]=-1/0,c[I]=-1/0,u[I]=-1/0;let fe=M/(re-te);for(let I=0;I<_;I++){let O=e[f[N+I]],we=W===0?O.cx:W===1?O.cy:O.cz,ae=Math.min(M-1,Math.floor((we-te)*fe));y[ae]++,O.minX<S[ae]&&(S[ae]=O.minX),O.minY<b[ae]&&(b[ae]=O.minY),O.minZ<p[ae]&&(p[ae]=O.minZ),O.maxX>m[ae]&&(m[ae]=O.maxX),O.maxY>c[ae]&&(c[ae]=O.maxY),O.maxZ>u[ae]&&(u[ae]=O.maxZ)}let pe=1/0,xe=1/0,be=1/0,ye=-1/0,q=-1/0,ze=-1/0,De=0;for(let I=M-1;I>0;I--)y[I]>0&&(De+=y[I],S[I]<pe&&(pe=S[I]),b[I]<xe&&(xe=b[I]),p[I]<be&&(be=p[I]),m[I]>ye&&(ye=m[I]),c[I]>q&&(q=c[I]),u[I]>ze&&(ze=u[I])),w[I-1]=De,R[I-1]=De>0?C(pe,xe,be,ye,q,ze):0;let _e=1/0,Oe=1/0,Xe=1/0,$e=-1/0,Ye=-1/0,We=-1/0,Ze=0,gt=se>1e-8?1/se:1;for(let I=0;I<M-1;I++){y[I]>0&&(Ze+=y[I],S[I]<_e&&(_e=S[I]),b[I]<Oe&&(Oe=b[I]),p[I]<Xe&&(Xe=p[I]),m[I]>$e&&($e=m[I]),c[I]>Ye&&(Ye=c[I]),u[I]>We&&(We=u[I]));let O=w[I];if(Ze===0||O===0)continue;let we=C(_e,Oe,Xe,$e,Ye,We),ae=.5+(Ze*we+O*R[I])*gt;ae<ie&&(ie=ae,Q=W,j=te+(I+1)/M*(re-te))}}if(Q===-1||ie>=he&&_<=4)return;let $=N,le=N+_-1;for(;$<=le;){let W=e[f[$]];if((Q===0?W.cx:Q===1?W.cy:W.cz)<j)$++;else{let re=f[$];f[$]=f[le],f[le]=re,le--}}let de=$-N;if(de===0||de===_){let W=A.maxX-A.minX,te=A.maxY-A.minY,re=A.maxZ-A.minZ,fe=W>=te&&W>=re?0:te>=re?1:2;f.subarray(N,N+_).sort((xe,be)=>{let ye=e[xe],q=e[be];return fe===0?ye.cx-q.cx:fe===1?ye.cy-q.cy:ye.cz-q.cz})}let Ee=de===0||de===_?Math.floor(_/2):de,Re=T++,Ae=T++;E(Re,N,Ee),E(Ae,N+Ee,_-Ee),A.leftFirst=Re,A.triCount=0,P(Re,B+1),P(Ae,B+1)}E(0,0,e.length),P(0,0);let z=T*2,J=Math.max(1,Math.ceil(z/Y)),Z=new Float32Array(Y*J*4);for(let V=0;V<T;V++){let B=x[V],A=V*8;Z[A+0]=B.minX,Z[A+1]=B.minY,Z[A+2]=B.minZ,Z[A+3]=B.leftFirst,Z[A+4]=B.maxX,Z[A+5]=B.maxY,Z[A+6]=B.maxZ,Z[A+7]=B.triCount}let ge=e.length*3,D=Math.max(1,Math.ceil(ge/Y)),U=new Float32Array(Y*D*4),X=new Float32Array(Y*D*4),Fe=Math.max(1,Math.ceil(e.length*2/Y)),ue=new Float32Array(Y*Fe*4);for(let V=0;V<e.length;V++){let B=e[f[V]],A=V*12;U[A+0]=B.v0x,U[A+1]=B.v0y,U[A+2]=B.v0z,U[A+3]=B.matIdx,U[A+4]=B.v1x,U[A+5]=B.v1y,U[A+6]=B.v1z,U[A+7]=0,U[A+8]=B.v2x,U[A+9]=B.v2y,U[A+10]=B.v2z,U[A+11]=0,X[A+0]=B.n0x,X[A+1]=B.n0y,X[A+2]=B.n0z,X[A+3]=0,X[A+4]=B.n1x,X[A+5]=B.n1y,X[A+6]=B.n1z,X[A+7]=0,X[A+8]=B.n2x,X[A+9]=B.n2y,X[A+10]=B.n2z,X[A+11]=0;let N=V*8;ue[N+0]=B.u0,ue[N+1]=B.v0,ue[N+2]=B.u1,ue[N+3]=B.v1,ue[N+4]=B.u2,ue[N+5]=B.v2,ue[N+6]=0,ue[N+7]=0}return{triangleCount:e.length,nodeCount:T,bvhTexture:He(Z,Y,J),triPosTexture:He(U,Y,D),triNormTexture:He(X,Y,D),triUvTexture:He(ue,Y,Fe),texWidth:Y,bvhTexHeight:J,triTexHeight:D,materialIdToIndex:t}}import*as G from"three";import{GLTFLoader as At}from"three/addons/loaders/GLTFLoader.js";import{OBJLoader as wt}from"three/addons/loaders/OBJLoader.js";import{STLLoader as Ht}from"three/addons/loaders/STLLoader.js";import*as F from"three";import*as Te from"three";var Me=new Te.Vector3,Se=new Te.Vector3,Be=new Te.Vector3,et=new Te.Vector3,tt=new Te.Vector3,Ce=new Te.Vector3;function Tt(s){if(s.getAttribute("normal")||s.computeVertexNormals(),!s.index)return s;let e=s.toNonIndexed();return s.dispose(),e}function nt(s,e=1){let t=Tt(s),r=t.getAttribute("position");if(!r)return t;let a=new Float32Array(r.count*2),n=Math.floor(r.count/3);for(let i=0;i<n;i++){let d=i*3,l=i*3+1,h=i*3+2;Me.fromBufferAttribute(r,d),Se.fromBufferAttribute(r,l),Be.fromBufferAttribute(r,h),et.subVectors(Se,Me),tt.subVectors(Be,Me),Ce.crossVectors(et,tt);let o=Math.abs(Ce.x),g=Math.abs(Ce.y),v=Math.abs(Ce.z);if(g>=o&&g>=v){let f=Ce.y>=0?1:-1;a[d*2+0]=Me.x*e,a[d*2+1]=-Me.z*f*e,a[l*2+0]=Se.x*e,a[l*2+1]=-Se.z*f*e,a[h*2+0]=Be.x*e,a[h*2+1]=-Be.z*f*e}else if(o>=g&&o>=v){let f=Ce.x>=0?-1:1;a[d*2+0]=Me.z*f*e,a[d*2+1]=Me.y*e,a[l*2+0]=Se.z*f*e,a[l*2+1]=Se.y*e,a[h*2+0]=Be.z*f*e,a[h*2+1]=Be.y*e}else{let f=Ce.z>=0?1:-1;a[d*2+0]=Me.x*f*e,a[d*2+1]=Me.y*e,a[l*2+0]=Se.x*f*e,a[l*2+1]=Se.y*e,a[h*2+0]=Be.x*f*e,a[h*2+1]=Be.y*e}}return t.setAttribute("uv",new Te.BufferAttribute(a,2)),t}function je(s,e,t){return`${Math.round(s*1e4)},${Math.round(e*1e4)},${Math.round(t*1e4)}`}function ot(s){let e=[],t=1/0,r=-1/0,a=1/0,n=-1/0,i=new Map,d=[];for(let h of s){let o=h.getAttribute("position"),g=h.getAttribute("uv");if(!o||!g)continue;let v=h.getIndex(),f=Math.floor(v?v.count/3:o.count/3);for(let x=0;x<f;x++){let T=v?v.getX(x*3):x*3,E=v?v.getX(x*3+1):x*3+1,M=v?v.getX(x*3+2):x*3+2,S=g.getX(T),b=g.getY(T),p=g.getX(E),m=g.getY(E),c=g.getX(M),u=g.getY(M);e.push(S,b,p,m,c,u),S<t&&(t=S),p<t&&(t=p),c<t&&(t=c),S>r&&(r=S),p>r&&(r=p),c>r&&(r=c),b<a&&(a=b),m<a&&(a=m),u<a&&(a=u),b>n&&(n=b),m>n&&(n=m),u>n&&(n=u);let y=[je(o.getX(T),o.getY(T),o.getZ(T)),je(o.getX(E),o.getY(E),o.getZ(E)),je(o.getX(M),o.getY(M),o.getZ(M))],R=[[S,b],[p,m],[c,u]];for(let w=0;w<3;w++){let C=w,P=(w+1)%3,z=y[C],J=y[P];if(z===J)continue;let Z=z<J,ge=Z?`${z}|${J}`:`${J}|${z}`,D=Z?{kA:z,kB:J,uA:R[C][0],vA:R[C][1],uB:R[P][0],vB:R[P][1]}:{kA:J,kB:z,uA:R[P][0],vA:R[P][1],uB:R[C][0],vB:R[C][1]},U=i.get(ge);if(!U)i.set(ge,D);else{let X=Math.hypot(U.uA-D.uA,U.vA-D.vA),Fe=Math.hypot(U.uB-D.uB,U.vB-D.vB);(X>.0015||Fe>.0015)&&d.push({uA1:U.uA,vA1:U.vA,uB1:U.uB,vB1:U.vB,uA2:D.uA,vA2:D.vA,uB2:D.uB,vB2:D.vB})}}}}let l=e.length>0&&t>=-.05&&r<=1.05&&a>=-.05&&n<=1.05;return{triangles:new Float32Array(e),isAtlas:l,seamPairs:d}}function Ve(s,e,t){let r=t?Math.max(0,Math.min(.999999,s)):s-Math.floor(s);return Math.max(0,Math.min(e-1,Math.floor(r*e)))}function Et(s,e){let t=new Uint8Array(e*e),r=s.length/6;for(let a=0;a<r;a++){let n=a*6,i=s[n+0]*e,d=s[n+1]*e,l=s[n+2]*e,h=s[n+3]*e,o=s[n+4]*e,g=s[n+5]*e,v=Math.max(0,Math.floor(Math.min(i,l,o))-1),f=Math.min(e-1,Math.ceil(Math.max(i,l,o))+1),x=Math.max(0,Math.floor(Math.min(d,h,g))-1),T=Math.min(e-1,Math.ceil(Math.max(d,h,g))+1),E=(l-i)*(g-d)-(o-i)*(h-d);if(Math.abs(E)<1e-4){let b=Math.max(0,Math.min(e-1,Math.round(i))),p=Math.max(0,Math.min(e-1,Math.round(d))),m=Math.max(0,Math.min(e-1,Math.round(l))),c=Math.max(0,Math.min(e-1,Math.round(h))),u=Math.max(0,Math.min(e-1,Math.round(o))),y=Math.max(0,Math.min(e-1,Math.round(g)));t[p*e+b]=1,t[c*e+m]=1,t[y*e+u]=1;continue}let M=1/E,S=.5/Math.max(1,Math.sqrt(Math.abs(E)));for(let b=x;b<=T;b++){let p=b+.5;for(let m=v;m<=f;m++){let c=m+.5,u=((l-c)*(g-p)-(o-c)*(h-p))*M,y=((o-c)*(d-p)-(i-c)*(g-p))*M,R=1-u-y;u>=-S&&y>=-S&&R>=-S&&(t[b*e+m]=1)}}}return t}function rt(s,e,t,r,a){let n=t*t,i=new Int16Array(n);i.fill(-1);let d=new Int32Array(n),l=0,h=0;for(let v=0;v<n;v++)e[v]===1&&(i[v]=0,d[h++]=v);if(h===0||h===n)return;let o=[-1,0,1,-1,1,-1,0,1],g=[-1,-1,-1,0,0,1,1,1];for(;l<h;){let v=d[l++],f=i[v];if(f>=r)continue;let x=v%t,T=(v-x)/t;for(let E=0;E<8;E++){let M=x+o[E],S=T+g[E];if(M<0||M>=t||S<0||S>=t)continue;let b=S*t+M;if(i[b]!==-1)continue;let p=0,m=0,c=0,u=0;for(let y=0;y<8;y++){let R=M+o[y],w=S+g[y];if(R<0||R>=t||w<0||w>=t)continue;let C=w*t+R;if(i[C]!==-1&&i[C]<=f){let P=C*4;a?(p+=s[P+0]-128,m+=s[P+1]-128,c+=s[P+2]-128):(p+=s[P+0],m+=s[P+1],c+=s[P+2]),u++}}if(u>0){let y=b*4;if(a){let R=p/u,w=m/u,C=c/u,P=Math.hypot(R,w,C)||1;s[y+0]=Math.max(0,Math.min(255,Math.round(R/P*127+128))),s[y+1]=Math.max(0,Math.min(255,Math.round(w/P*127+128))),s[y+2]=Math.max(0,Math.min(255,Math.round(C/P*127+128)))}else s[y+0]=Math.round(p/u),s[y+1]=Math.round(m/u),s[y+2]=Math.round(c/u);s[y+3]=255,i[b]=f+1,d[h++]=b}}}}function at(s,e,t,r,a,n){let i=0,d=0,l=0,h=0;for(let o=-3;o<=3;o++){let g=r+o;if(!(g<0||g>=a))for(let v=-3;v<=3;v++){let f=t+v;if(f<0||f>=a)continue;let x=g*a+f;if(e[x]===0)continue;let T=1/(1+v*v+o*o),E=x*4;n?(i+=(s[E+0]-128)*T,d+=(s[E+1]-128)*T,l+=(s[E+2]-128)*T):(i+=s[E+0]*T,d+=s[E+1]*T,l+=s[E+2]*T),h+=T}}if(h<=0){let o=(r*a+t)*4;return[s[o+0],s[o+1],s[o+2]]}if(n){let o=Math.hypot(i,d,l)||1;return[Math.max(0,Math.min(255,Math.round(i/o*127+128))),Math.max(0,Math.min(255,Math.round(d/o*127+128))),Math.max(0,Math.min(255,Math.round(l/o*127+128)))]}return[i/h,d/h,l/h]}function st(s,e,t,r,a){let n=t*t,i=new Uint8Array(n);if(a&&a.triangles.length>0&&a.isAtlas){let d=Et(a.triangles,t),l=!1;for(let o=0;o<n;o++)d[o]===1&&e[o]>=230&&(i[o]=1,l=!0);l||i.fill(1);let h=new Uint8Array(n);for(let o=1;o<t-1;o++)for(let g=1;g<t-1;g++){let v=o*t+g;i[v]===1&&i[v-1]===1&&i[v+1]===1&&i[v-t]===1&&i[v+t]===1&&(h[v]=1)}if(!r){let o=new Uint8Array(s);for(let g=1;g<t-1;g++)for(let v=1;v<t-1;v++){let f=g*t+v;if(i[f]===1&&h[f]===0){let x=f*4,T=o[x]*.299+o[x+1]*.587+o[x+2]*.114,E=0,M=0,S=0,b=0,p=0;for(let m=-1;m<=1;m++)for(let c=-1;c<=1;c++){let u=(g+m)*t+(v+c);if(h[u]===1){let y=u*4,R=o[y]*.299+o[y+1]*.587+o[y+2]*.114;R>p&&(p=R),E+=o[y],M+=o[y+1],S+=o[y+2],b++}}b>0&&T<p*.78&&(s[x+0]=Math.round(E/b),s[x+1]=Math.round(M/b),s[x+2]=Math.round(S/b))}}}if(a.seamPairs.length>0){let o=new Uint8Array(s),g=[.92,.62,.3,.12],v=(f,x,T,E,M,S)=>{if(f<0||f>=t||x<0||x>=t)return;let b=x*t+f;if(i[b]===0)return;let p=b*4,m=1-S;if(r){let c=(o[p+0]-128)*m+(T-128)*S,u=(o[p+1]-128)*m+(E-128)*S,y=(o[p+2]-128)*m+(M-128)*S,R=Math.hypot(c,u,y)||1;s[p+0]=Math.max(0,Math.min(255,Math.round(c/R*127+128))),s[p+1]=Math.max(0,Math.min(255,Math.round(u/R*127+128))),s[p+2]=Math.max(0,Math.min(255,Math.round(y/R*127+128)))}else s[p+0]=Math.round(o[p+0]*m+T*S),s[p+1]=Math.round(o[p+1]*m+E*S),s[p+2]=Math.round(o[p+2]*m+M*S)};for(let f of a.seamPairs){let x=Math.hypot(f.uB1-f.uA1,f.vB1-f.vA1)*t,T=Math.hypot(f.uB2-f.uA2,f.vB2-f.vA2)*t,E=Math.max(2,Math.min(1024,Math.ceil(Math.max(x,T))));for(let M=0;M<=E;M++){let S=M/E,b=Ve(f.uA1+(f.uB1-f.uA1)*S,t,!0),p=Ve(f.vA1+(f.vB1-f.vA1)*S,t,!0),m=Ve(f.uA2+(f.uB2-f.uA2)*S,t,!0),c=Ve(f.vA2+(f.vB2-f.vA2)*S,t,!0),u=at(o,h,b,p,t,r),y=at(o,h,m,c,t,r),R=r?u:[(u[0]+y[0])*.5,(u[1]+y[1])*.5,(u[2]+y[2])*.5],w=r?y:R;for(let C=-3;C<=3;C++)for(let P=-3;P<=3;P++){let z=Math.round(Math.hypot(P,C));if(z>=g.length)continue;let J=r?g[z]*.88:g[z];v(b+P,p+C,R[0],R[1],R[2],J),v(m+P,c+C,w[0],w[1],w[2],J)}}}}rt(s,i,t,14,r)}else{let d=!1;for(let l=0;l<n;l++)e[l]>=230?i[l]=1:d=!0;d&&rt(s,i,t,14,r)}}var ee=256,Ne=14,ne=1024,me=8,ve=100;var Pe={none:0,"brushed-metal":1,"carbon-weave":2,vulcanite:3,guilloche:4,concrete:5,"cedar-wood":6,travertine:7,limestone:8,brick:9,terrazzo:10,"ceramic-tile":11,plaster:12,"corten-steel":13};function Ie(s,e,t,r){let a=(s%t+t)%t,n=(e%r+r)%r,i=a*374761393+n*668265263;return i=(i^i>>13)*1274126177,((i^i>>16)>>>0)/4294967295}function qe(s,e,t,r){let a=s*t,n=e*r,i=Math.floor(a),d=Math.floor(n),l=a-i,h=n-d,o=l*l*(3-2*l),g=h*h*(3-2*h),v=Ie(i,d,t,r),f=Ie(i+1,d,t,r),x=Ie(i,d+1,t,r),T=Ie(i+1,d+1,t,r);return v+(f-v)*o+(x-v)*g+(v-f-x+T)*o*g}function it(s,e,t){return qe(s,e,t,t)}function Ue(s,e,t,r,a=4){let n=0,i=.5,d=0,l=t,h=r;for(let o=0;o<a;o++)n+=qe(s,e,l,h)*i,d+=i,i*=.5,l*=2,h*=2;return n/d}function ce(s,e,t,r=4){return Ue(s,e,t,t,r)}function Rt(s,e,t,r,a){for(let n=0;n<e;n++){let i=(n-1+e)%e,d=(n+1)%e;for(let l=0;l<e;l++){let h=(l-1+e)%e,o=(l+1)%e,g=s[n*e+h],v=s[n*e+o],f=s[i*e+l],x=s[d*e+l],T=(g-v)*t,E=(f-x)*t,M=1,S=Math.sqrt(T*T+E*E+M*M),b=a+(n*e+l)*4;r[b+0]=Math.round((T/S*.5+.5)*255),r[b+1]=Math.round((E/S*.5+.5)*255),r[b+2]=Math.round((M/S*.5+.5)*255),r[b+3]=255}}}var Ge=class{constructor(e){L(this,"albedoArray");L(this,"normalArray");L(this,"roughMetalArray");L(this,"customAlbedoArray");L(this,"customNormalArray");L(this,"customRoughMetalArray");L(this,"albedoBytes");L(this,"normalBytes");L(this,"roughMetalBytes");L(this,"customAllocated",!1);L(this,"customAlbedoBytes",null);L(this,"customNormalBytes",null);L(this,"customRoughMetalBytes",null);L(this,"customIsAtlas",new Array(me).fill(!1));L(this,"threeMapsCache",new Map);L(this,"previewCache",new Map);L(this,"nextCustomSlice",0);L(this,"maxAnisotropy");this.maxAnisotropy=Math.min(8,Math.max(1,e));let r=ee*ee*4*Ne;this.albedoBytes=new Uint8Array(r),this.normalBytes=new Uint8Array(r),this.roughMetalBytes=new Uint8Array(r);for(let a=0;a<Ne;a++)this.fillNeutralPresetLayer(a);this.generatePresetLayer("brushed-metal",1),this.generatePresetLayer("carbon-weave",2),this.generatePresetLayer("vulcanite",3),this.generatePresetLayer("guilloche",4),this.generatePresetLayer("concrete",5),this.generatePresetLayer("cedar-wood",6),this.generatePresetLayer("travertine",7),this.generatePresetLayer("limestone",8),this.generatePresetLayer("brick",9),this.generatePresetLayer("terrazzo",10),this.generatePresetLayer("ceramic-tile",11),this.generatePresetLayer("plaster",12),this.generatePresetLayer("corten-steel",13),this.albedoArray=this.createArrayTexture(this.albedoBytes,ee,Ne),this.normalArray=this.createArrayTexture(this.normalBytes,ee,Ne),this.roughMetalArray=this.createArrayTexture(this.roughMetalBytes,ee,Ne),this.customAlbedoArray=this.createDummyArrayTex([255,255,255,255]),this.customNormalArray=this.createDummyArrayTex([128,128,255,255]),this.customRoughMetalArray=this.createDummyArrayTex([255,255,255,255])}createDummyArrayTex(e){let t=new F.DataArrayTexture(new Uint8Array(e),1,1,1);return t.format=F.RGBAFormat,t.type=F.UnsignedByteType,t.minFilter=F.LinearFilter,t.magFilter=F.LinearFilter,t.wrapS=F.RepeatWrapping,t.wrapT=F.RepeatWrapping,t.generateMipmaps=!1,t.needsUpdate=!0,t}createArrayTexture(e,t,r){let a=new F.DataArrayTexture(e,t,t,r);return a.format=F.RGBAFormat,a.type=F.UnsignedByteType,a.minFilter=F.LinearFilter,a.magFilter=F.LinearFilter,a.wrapS=F.RepeatWrapping,a.wrapT=F.RepeatWrapping,a.generateMipmaps=!1,a.needsUpdate=!0,a}ensureCustomAllocated(){if(this.customAllocated)return;let t=ne*ne*4*me;this.customAlbedoBytes=new Uint8Array(t),this.customNormalBytes=new Uint8Array(t),this.customRoughMetalBytes=new Uint8Array(t);for(let r=0;r<me;r++)this.fillNeutralCustomSlice(r);this.customAlbedoArray.dispose(),this.customNormalArray.dispose(),this.customRoughMetalArray.dispose(),this.customAlbedoArray=this.createArrayTexture(this.customAlbedoBytes,ne,me),this.customNormalArray=this.createArrayTexture(this.customNormalBytes,ne,me),this.customRoughMetalArray=this.createArrayTexture(this.customRoughMetalBytes,ne,me),this.customAllocated=!0}fillNeutralPresetLayer(e){let t=ee*ee*4,r=e*t;for(let a=0;a<ee*ee;a++){let n=r+a*4;this.albedoBytes[n+0]=255,this.albedoBytes[n+1]=255,this.albedoBytes[n+2]=255,this.albedoBytes[n+3]=255,this.normalBytes[n+0]=128,this.normalBytes[n+1]=128,this.normalBytes[n+2]=255,this.normalBytes[n+3]=255,this.roughMetalBytes[n+0]=255,this.roughMetalBytes[n+1]=255,this.roughMetalBytes[n+2]=255,this.roughMetalBytes[n+3]=255}}fillNeutralCustomSlice(e){if(!this.customAlbedoBytes||!this.customNormalBytes||!this.customRoughMetalBytes)return;let t=ne*ne,r=e*t*4;for(let a=0;a<t;a++){let n=r+a*4;this.customAlbedoBytes[n+0]=255,this.customAlbedoBytes[n+1]=255,this.customAlbedoBytes[n+2]=255,this.customAlbedoBytes[n+3]=255,this.customNormalBytes[n+0]=128,this.customNormalBytes[n+1]=128,this.customNormalBytes[n+2]=255,this.customNormalBytes[n+3]=255,this.customRoughMetalBytes[n+0]=255,this.customRoughMetalBytes[n+1]=255,this.customRoughMetalBytes[n+2]=255,this.customRoughMetalBytes[n+3]=255}}upscalePresetToCustomSlice(e,t){if(!this.customAlbedoBytes||!this.customNormalBytes||!this.customRoughMetalBytes)return;let r=ne/ee,a=e*ee*ee*4,n=t*ne*ne*4,i=(d,l,h)=>{for(let o=0;o<ne;o++){let g=Math.min(ee-1,Math.floor(o/r));for(let v=0;v<ne;v++){let f=Math.min(ee-1,Math.floor(v/r)),x=a+(g*ee+f)*4,T=n+(o*ne+v)*4;l[T+0]=d[x+0],l[T+1]=d[x+1],l[T+2]=d[x+2],l[T+3]=h?255:d[x+3]}}};i(this.albedoBytes,this.customAlbedoBytes,!1),i(this.normalBytes,this.customNormalBytes,!0),i(this.roughMetalBytes,this.customRoughMetalBytes,!1)}generatePresetLayer(e,t){let r=ee,a=new Float32Array(r*r),n=t*r*r*4,i=2;for(let d=0;d<r;d++){let l=d/r;for(let h=0;h<r;h++){let o=h/r,g=d*r+h,v=n+g*4,f=255,x=255,T=255,E=1,M=.5;if(e==="brushed-metal"){let b=Ue(o,l,2,32,3),p=qe(o,l,8,96),m=.85+b*.11+p*.04;f=x=T=Math.round(m*255),M=b*.72+p*.28,E=.78+b*.42,i=1.4}else if(e==="carbon-weave"){let p=o*12,m=l*12,c=Math.floor(p),u=Math.floor(m),y=p-c,R=m-u,C=(c+u)%4<2,P=C?Math.sin(y*Math.PI)*(.85+.15*Math.sin(R*Math.PI*6)):Math.sin(R*Math.PI)*(.85+.15*Math.sin(y*Math.PI*6)),z=C?.52+P*.42:.38+P*.36;f=x=T=Math.round(z*255),M=P,E=C?.55+(1-P)*.45:.82+(1-P)*.35,i=3.2}else if(e==="vulcanite"){let b=ce(o,l,24,3),p=it(o,l,48),m=Math.pow(b*.72+p*.28,1.35),c=.7+m*.3;f=x=T=Math.round(c*255),M=m,E=.85+(1-m)*.35,i=4}else if(e==="guilloche"){let b=o-.5,p=l-.5,m=Math.sqrt(b*b+p*p),c=Math.atan2(p,b),u=Math.cos(c*48)*.5+.5,y=Math.cos(m*Math.PI*44)*.5+.5,R=Math.max(Math.abs(b),Math.abs(p)),w=R<.44?1:Math.max(0,(.5-R)/.06),C=.5+(u*.55+y*.45-.5)*w,P=.65+C*.35;f=x=T=Math.round(P*255),M=C,E=.6+(1-C)*.5,i=2.4}else if(e==="concrete"){let b=ce(o,l,6,4),p=ce(o,l,24,3),m=p<.32?(.32-p)*1.8:0,c=Math.abs((l*4+.5)%1-.5)>.486?.12:0,u=Math.max(.45,Math.min(1,.78+(b-.5)*.28-m*.4-c));f=Math.round(u*255),x=Math.round(u*.99*255),T=Math.round(u*.96*255),M=b*.65+p*.35-m*.5-c,E=.85+m*.3+(1-b)*.2,i=3}else if(e==="cedar-wood"){let b=ce(o,l,4,3)*.35,p=Math.sin((o*10+b*8)*Math.PI*2)*.5+.5,m=Ue(o,l,24,3,3),c=p*.65+m*.35;f=Math.round((.68+c*.32)*255),x=Math.round((.54+c*.3)*255),T=Math.round((.42+c*.26)*255),M=c*.7+m*.3,E=.78+(1-c)*.38,i=2.2}else if(e==="travertine"){let b=ce(o,l,4,4),p=Math.pow(Math.abs(Math.sin((l*3+b*2.2)*Math.PI)),.35),m=ce(o*2,l*4,16,3),c=m<.28?(.28-m)*1.4:0,u=Math.max(.55,Math.min(1,.72+p*.26-c*.35));f=Math.round(u*255),x=Math.round(u*.96*255),T=Math.round(u*.9*255),M=p*.6+m*.4-c*.7,E=.72+c*.6+(1-p)*.25,i=2.6}else if(e==="limestone"){let b=Ue(o,l,4,9,3),p=ce(o,l,30,24),m=Math.pow(Math.max(0,Math.cos((l*5+b*.7)*Math.PI*2)),16),c=p<.29?(.29-p)*1.4:0,u=Math.max(.56,Math.min(1,.83+(b-.5)*.18+m*.08-c*.22));f=Math.round(u*255),x=Math.round(u*.99*255),T=Math.round(u*.95*255),M=b*.62+p*.38-c*.5,E=.82+c*.45+(1-m)*.12,i=2}else if(e==="brick"){let p=Math.floor(l*6),m=l*6%1,c=4,u=p%2?.5:0,R=(o*c+u)%1,w=m<.045||m>.955||R<.035||R>.965,C=ce(o,l,28,22),P=w?.67+C*.08:.88+C*.12;f=x=T=Math.round(P*255),M=w?.12+C*.12:.62+C*.2,E=w?1.14:.92+(1-C)*.18,i=3.4}else if(e==="terrazzo"){let p=o*18,m=l*18,c=Math.floor(p),u=Math.floor(m),y=p-c,R=m-u,w=Ie(c,u,18,18),C=.22+Ie(c+17,u,18,18)*.56,P=.22+Ie(c,u+31,18,18)*.56,z=.11+w*.12,J=.09+Ie(c+7,u+13,18,18)*.15,Z=(y-C)/z,ge=(R-P)/J,D=Z*Z+ge*ge<1,U=ce(o,l,35,35),X=D?.62+w*.32:.93+U*.07;f=Math.round(X*255),x=Math.round(X*(D?.96:.99)*255),T=Math.round(X*(D?.91:.97)*255),M=D?.35+w*.42:.52+U*.08,E=D?.9+w*.35:.94+U*.12,i=1.8}else if(e==="ceramic-tile"){let p=o*4%1,m=l*4%1,u=Math.min(p,1-p,m,1-m)<.025,y=ce(o,l,16,16),R=u?.62:.96+y*.04;f=x=T=Math.round(R*255),M=u?.25:.48+y*.04,E=u?1.14:.88+y*.12,i=1.35}else if(e==="plaster"){let b=ce(o,l,14,13),p=it(o,l,62),m=Math.pow(Math.max(0,Math.sin((o*8+b*1.4)*Math.PI)),5),c=.82+(b-.5)*.16+(p-.5)*.11+m*.025;f=x=T=Math.round(Math.max(.62,Math.min(1,c))*255),M=b*.56+p*.34+m*.1,E=.91+(1-p)*.2,i=1.5}else if(e==="corten-steel"){let b=ce(o,l,7,7),p=ce(o,l,27,24),m=Ue(o,l,5,28,3),c=Math.max(0,b*.72+p*.28-.56),u=Math.max(.58,Math.min(1,.91-c*.36+(m-.5)*.08));f=Math.round(u*255),x=Math.round(u*(.97-c*.04)*255),T=Math.round(u*(.91-c*.1)*255),M=b*.5+p*.35+m*.15,E=.88+c*.38,i=2.3}a[g]=M,this.albedoBytes[v+0]=f,this.albedoBytes[v+1]=x,this.albedoBytes[v+2]=T,this.albedoBytes[v+3]=255;let S=Math.max(12,Math.min(255,Math.round(E*255)));this.roughMetalBytes[v+0]=S,this.roughMetalBytes[v+1]=S,this.roughMetalBytes[v+2]=255,this.roughMetalBytes[v+3]=255}}Rt(a,r,i,this.normalBytes,n)}allocateCustomLayer(e="none",t=!1){this.ensureCustomAllocated();let r=this.nextCustomSlice;this.nextCustomSlice=this.nextCustomSlice>=me-1?0:this.nextCustomSlice+1;let a=Pe[e];a===0?this.fillNeutralCustomSlice(r):this.upscalePresetToCustomSlice(a,r),this.customIsAtlas[r]=t;let n=ve+r;return this.customAlbedoArray.addLayerUpdate(r),this.customNormalArray.addLayerUpdate(r),this.customRoughMetalArray.addLayerUpdate(r),this.invalidateLayer(n),n}writeImageToLayer(e,t,r,a=!1,n){if(e<ve||(this.ensureCustomAllocated(),!this.customAlbedoBytes||!this.customNormalBytes||!this.customRoughMetalBytes))return;let i=e-ve;if(i<0||i>=me)return;n&&(this.customIsAtlas[i]=n.isAtlas);let d=ne,l=document.createElement("canvas");l.width=d,l.height=d;let h=l.getContext("2d");if(!h)return;h.imageSmoothingEnabled=!0,h.imageSmoothingQuality="high",a?(h.save(),h.translate(0,d),h.scale(1,-1),h.drawImage(r,0,0,d,d),h.restore()):h.drawImage(r,0,0,d,d);let o=h.getImageData(0,0,d,d).data,g=d*d,v=g*4,f=i*v,x=new Uint8Array(v),T=new Uint8Array(g);for(let E=0;E<g;E++){let M=E*4;T[E]=o[M+3],x[M+0]=o[M+0],x[M+1]=o[M+1],x[M+2]=o[M+2],x[M+3]=255}st(x,T,d,t==="normal",n),t==="albedo"?(this.customAlbedoBytes.set(x,f),this.customAlbedoArray.addLayerUpdate(i),this.customAlbedoArray.needsUpdate=!0):t==="normal"?(this.customNormalBytes.set(x,f),this.customNormalArray.addLayerUpdate(i),this.customNormalArray.needsUpdate=!0):(this.customRoughMetalBytes.set(x,f),this.customRoughMetalArray.addLayerUpdate(i),this.customRoughMetalArray.needsUpdate=!0),this.invalidateLayer(e)}async writeFileToLayer(e,t,r,a){let n=URL.createObjectURL(r);try{let i=await new Promise((d,l)=>{let h=new Image;h.onload=()=>d(h),h.onerror=()=>l(new Error(`Unable to decode image ${r.name}`)),h.src=n});this.writeImageToLayer(e,t,i,!1,a)}finally{URL.revokeObjectURL(n)}}getLayerShaderInfo(e){if(e>=ve){let t=Math.max(0,Math.min(me-1,e-ve));return{slice:t,modeFlag:this.customIsAtlas[t]?2:1}}return{slice:e,modeFlag:0}}disposeMapSet(e){e.map?.dispose(),e.normalMap?.dispose(),e.roughnessMap?.dispose()}clearThreeMapsCache(){for(let e of this.threeMapsCache.values())this.disposeMapSet(e);this.threeMapsCache.clear()}invalidateLayer(e){let t=String(e)+":";for(let[r,a]of this.threeMapsCache)r.startsWith(t)&&(this.disposeMapSet(a),this.threeMapsCache.delete(r));for(let r of this.previewCache.keys())r.startsWith(t)&&this.previewCache.delete(r);this.albedoArray.needsUpdate=!0,this.normalArray.needsUpdate=!0,this.roughMetalArray.needsUpdate=!0,this.customAlbedoArray.needsUpdate=!0,this.customNormalArray.needsUpdate=!0,this.customRoughMetalArray.needsUpdate=!0}getMapPreviewDataUrl(e,t){let r=String(e)+":"+t,a=this.previewCache.get(r);if(a)return a;let n=e>=ve,i=n?e-ve:e,d=n?ne:ee,l=t==="albedo"?n?this.customAlbedoBytes:this.albedoBytes:t==="normal"?n?this.customNormalBytes:this.normalBytes:n?this.customRoughMetalBytes:this.roughMetalBytes;if(!l)return null;let h=72,o=document.createElement("canvas");o.width=h,o.height=h;let g=o.getContext("2d");if(!g)return null;let v=g.createImageData(h,h),f=i*d*d*4;for(let T=0;T<h;T++){let E=Math.min(d-1,Math.floor(T/h*d));for(let M=0;M<h;M++){let S=Math.min(d-1,Math.floor(M/h*d)),b=f+(E*d+S)*4,p=(T*h+M)*4;if(t==="roughness"){let m=l[b+1];v.data[p]=m,v.data[p+1]=m,v.data[p+2]=m}else v.data[p]=l[b],v.data[p+1]=l[b+1],v.data[p+2]=l[b+2];v.data[p+3]=255}}g.putImageData(v,0,0);let x=o.toDataURL("image/png");return this.previewCache.set(r,x),x}getThreeMapsForLayer(e,t,r=t,a=0,n=0,i=0){if(e===0)return{map:null,normalMap:null,roughnessMap:null};let d=e>=ve,l=d?e-ve:e,h=d?ne:ee,o=d&&!!this.customIsAtlas[l],g=[e,t,r,a,n,i].join(":"),v=this.threeMapsCache.get(g);if(!v){let x=d?this.customAlbedoBytes:this.albedoBytes,T=d?this.customNormalBytes:this.normalBytes,E=d?this.customRoughMetalBytes:this.roughMetalBytes;if(!x||!T||!E)return{map:null,normalMap:null,roughnessMap:null};let M=h*h*4,S=l*M,b=(p,m)=>{let c=new Uint8Array(M);c.set(p.subarray(S,S+M));let u=new F.DataTexture(c,h,h,F.RGBAFormat);u.colorSpace=m?F.SRGBColorSpace:F.NoColorSpace;let y=o&&t<=1.02&&r<=1.02?F.ClampToEdgeWrapping:F.RepeatWrapping;return u.wrapS=y,u.wrapT=y,u.minFilter=F.LinearMipmapLinearFilter,u.magFilter=F.LinearFilter,u.generateMipmaps=!0,u.anisotropy=this.maxAnisotropy,u.needsUpdate=!0,u};v={map:b(x,!0),normalMap:b(T,!1),roughnessMap:b(E,!1)},this.threeMapsCache.set(g,v)}let f=o&&t<=1.02&&r<=1.02?F.ClampToEdgeWrapping:F.RepeatWrapping;return[v.map,v.normalMap,v.roughnessMap].forEach(x=>{x&&(x.repeat.set(t,r),x.offset.set(a,n),x.center.set(.5,.5),x.rotation=i*Math.PI/180,x.updateMatrix(),(x.wrapS!==f||x.wrapT!==f)&&(x.wrapS=f,x.wrapT=f,x.needsUpdate=!0))}),v}resetCustomCounter(){this.nextCustomSlice=0,this.customIsAtlas.fill(!1);for(let[e,t]of this.threeMapsCache)Number(e.split(":")[0])>=ve&&(this.disposeMapSet(t),this.threeMapsCache.delete(e))}dispose(){this.albedoArray.dispose(),this.normalArray.dispose(),this.roughMetalArray.dispose(),this.customAlbedoArray.dispose(),this.customNormalArray.dispose(),this.customRoughMetalArray.dispose(),this.clearThreeMapsCache()}};function St(s,e){let t=s.emissiveIntensity>.01?s.emissiveOpacity??1:1,r=new G.MeshPhysicalMaterial({color:new G.Color(s.color),opacity:t,transparent:t<.999,depthWrite:t>=.999,roughness:s.roughness,metalness:s.metalness,ior:s.ior,clearcoat:s.clearcoat,clearcoatRoughness:Math.max(.04,s.roughness*.4),envMapIntensity:1.05});return s.transmission>.05&&(e?(r.transparent=!0,r.opacity=Math.max(.28,1-s.transmission*.65)*t,r.depthWrite=!1):(r.transmission=s.transmission,r.opacity=t,r.transparent=t<.999,r.depthWrite=t>=.999,r.thickness=.65,r.attenuationColor=new G.Color(s.color),r.attenuationDistance=1.6)),s.emissiveIntensity>.01&&(r.emissive=new G.Color(s.color),r.emissiveIntensity=s.emissiveIntensity),r}async function lt(s,e,t,r){let a=s.name.split(".").pop()?.toLowerCase()??"",n=await s.arrayBuffer(),i;if(a==="glb"||a==="gltf"){let p=new At;i=(await new Promise((c,u)=>{p.parse(n,"",y=>c(y),u)})).scene}else if(a==="obj"){let p=new TextDecoder().decode(n);i=new wt().parse(p)}else if(a==="stl"){let m=new Ht().parse(n);m.computeVertexNormals();let c=new G.Mesh(m);i=new G.Group,i.add(c)}else throw new Error(`Unsupported format ".${a}". Please import GLB, GLTF, OBJ, or STL.`);i.updateMatrixWorld(!0);let d=new G.Box3().setFromObject(i);if(d.isEmpty())throw new Error("The imported file contains no renderable 3D geometry.");let l=new G.Vector3,h=new G.Vector3;d.getSize(l),d.getCenter(h);let g=1.45/Math.max(l.x,l.y,l.z,1e-4),v=new G.Vector3(-h.x*g,-d.min.y*g,-h.z*g),f=new G.Group;i.position.copy(v),i.scale.setScalar(g),f.add(i),f.updateMatrixWorld(!0);let x=[],T=new Map,E=new Map,M=new Map,S=new Map,b=1;if(f.traverse(p=>{let m=p;if(!m.isMesh||!m.geometry)return;let c=m.geometry;c.getAttribute("normal")||c.computeVertexNormals(),c.getAttribute("uv")||(m.geometry=nt(c,1));let u=Array.isArray(m.material)?m.material[0]:m.material,y=u,R=u?u.uuid:"imported_default",w=T.get(R);if(!w)if(x.length>=20)w=x[0].id;else{w=`imported_mat_${x.length+1}`,T.set(R,w),M.set(w,y);let Z=y&&y.color?`#${y.color.getHexString()}`:x.length===0?"#cfd3d9":"#9ca3af",ge=y&&typeof y.roughness=="number"?y.roughness:.45,D=y&&typeof y.metalness=="number"?y.metalness:.15,U=y&&y.name||m.name||`Surface ${x.length+1}`,X=!!y?.map?.image,Fe=!!y?.normalMap?.image,ue=!!y?.roughnessMap?.image,V=!!y?.metalnessMap?.image,B=y?.normalScale&&typeof y.normalScale.x=="number"?Math.max(0,Math.min(2,y.normalScale.x)):1;x.push({id:w,name:U.slice(0,24),color:Z,roughness:Math.max(.03,Math.min(1,ge)),metalness:Math.max(0,Math.min(1,D)),ior:1.5,transmission:0,clearcoat:.1,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:B,hasCustomAlbedo:X,hasCustomNormal:Fe,hasCustomRoughness:ue,hasCustomMetalness:V})}let C=x.find(Z=>Z.id===w),P=St(C,e);m.material=P,m.castShadow=!0,m.receiveShadow=!0,m.userData.materialId=w,m.userData.partName=m.name||`Mesh Part ${b++}`;let z=E.get(w)??[];z.push(m),E.set(w,z);let J=S.get(w)??[];J.push(m.geometry),S.set(w,J)}),x.length===0)throw new Error("No mesh triangles found in the imported file.");if(t&&r)for(let p of x){let m=M.get(p.id),c=!!m?.map?.image,u=!!m?.normalMap?.image,y=!!m?.roughnessMap?.image,R=!!m?.metalnessMap?.image;if(c||u||y||R){let w=S.get(p.id)??[],C=ot(w),P=t.allocateCustomLayer("none",C.isAtlas);m?.map?.image&&t.writeImageToLayer(P,"albedo",m.map.image,!!m.map.flipY,C),m?.normalMap?.image&&t.writeImageToLayer(P,"normal",m.normalMap.image,!!m.normalMap.flipY,C);let z=m?.roughnessMap?.image?m.roughnessMap:m?.metalnessMap;z?.image&&t.writeImageToLayer(P,"roughness",z.image,!!z.flipY,C),r.set(p.id,P)}else r.set(p.id,0)}return{group:f,materials:x,meshMap:E,rayTransform:{scale:g,offset:v}}}import*as H from"three";function ct(s){let e=Math.max(1e3,Math.min(4e4,s))/100,t,r,a;return e<=66?(t=255,r=99.4708025861*Math.log(e)-161.1195681661,a=e<=19?0:138.5177312231*Math.log(e-10)-305.0447927307):(t=329.698727446*Math.pow(e-60,-.1332047592),r=288.1221695283*Math.pow(e-60,-.0755148492),a=255),[Math.max(0,Math.min(255,t))/255,Math.max(0,Math.min(255,r))/255,Math.max(0,Math.min(255,a))/255]}function Ke(s){let e=s.replace("#",""),t=parseInt(e.length===3?e.split("").map(d=>d+d).join(""):e,16),r=d=>d<=.04045?d/12.92:Math.pow((d+.055)/1.055,2.4),a=(t>>16&255)/255,n=(t>>8&255)/255,i=(t&255)/255;return[r(a),r(n),r(i)]}function ut(s,e,t){let r=s*Math.PI/180,a=e*Math.PI/180,n=Math.cos(a),i=t*n*Math.sin(r),d=t*Math.sin(a),l=t*n*Math.cos(r);return[i,d,l]}var Le=4,oe=24,mt=`precision highp float;
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
uniform vec4 uLightPosRadius[${Le}];
uniform vec4 uLightColorEnabled[${Le}];

// Material uniforms: 6 vec4s per material
// matA = (albedo.r, albedo.g, albedo.b, roughness)
// matB = (metalness, ior, transmission, clearcoat)
// matC = (emissiveIntensity, emitterOpacity, 0, 0)
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
    float emitterOpacity = 1.0;

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
`,Ct={studio:0,golden:1,loft:2,cornell:3,obsidian:4},ke=class{constructor(e){L(this,"renderer");L(this,"quadScene");L(this,"quadCamera");L(this,"quadMesh");L(this,"traceMat");L(this,"displayMat");L(this,"rtA");L(this,"rtB");L(this,"pingPong",0);L(this,"sampleIndex",0);L(this,"width",640);L(this,"height",480);L(this,"targetType");L(this,"bvhData",null);L(this,"dummyTex");L(this,"dummyArrayTex");L(this,"camPos",new H.Vector3);L(this,"camRight",new H.Vector3);L(this,"camUp",new H.Vector3);L(this,"camForward",new H.Vector3);this.renderer=e;let t=e.getContext(),r=!!t.getExtension("EXT_color_buffer_float"),a=!!t.getExtension("EXT_color_buffer_half_float");this.targetType=r?H.FloatType:a?H.HalfFloatType:H.UnsignedByteType,this.rtA=this.createTarget(this.width,this.height),this.rtB=this.createTarget(this.width,this.height);let n=Array.from({length:Le},()=>new H.Vector4),i=Array.from({length:Le},()=>new H.Vector4),d=Array.from({length:oe},()=>new H.Vector4(.8,.8,.8,.4)),l=Array.from({length:oe},()=>new H.Vector4(0,1.5,0,0)),h=Array.from({length:oe},()=>new H.Vector4(0,0,0,0)),o=Array.from({length:oe},()=>new H.Vector4(0,1,1,0)),g=Array.from({length:oe},()=>new H.Vector4(1,1,0,0)),v=Array.from({length:oe},()=>new H.Vector4(0,0,0,0));this.dummyTex=new H.DataTexture(new Float32Array(4),1,1,H.RGBAFormat,H.FloatType),this.dummyTex.needsUpdate=!0,this.dummyArrayTex=new H.DataArrayTexture(new Uint8Array([255,255,255,255]),1,1,1),this.dummyArrayTex.format=H.RGBAFormat,this.dummyArrayTex.type=H.UnsignedByteType,this.dummyArrayTex.minFilter=H.LinearFilter,this.dummyArrayTex.magFilter=H.LinearFilter,this.dummyArrayTex.needsUpdate=!0,this.traceMat=new H.RawShaderMaterial({glslVersion:H.GLSL3,vertexShader:mt,fragmentShader:Bt,depthTest:!1,depthWrite:!1,uniforms:{uPrevFrame:{value:this.rtA.texture},uBvhTex:{value:this.dummyTex},uTriPosTex:{value:this.dummyTex},uTriNormTex:{value:this.dummyTex},uTriUvTex:{value:this.dummyTex},uAlbedoArray:{value:this.dummyArrayTex},uNormalArray:{value:this.dummyArrayTex},uRoughMetalArray:{value:this.dummyArrayTex},uCustomAlbedoArray:{value:this.dummyArrayTex},uCustomNormalArray:{value:this.dummyArrayTex},uCustomRoughMetalArray:{value:this.dummyArrayTex},uTexWidth:{value:1024},uSampleIndex:{value:0},uMaxBounces:{value:4},uClayMode:{value:0},uEnvMode:{value:0},uEnvIntensity:{value:.85},uResolution:{value:new H.Vector2(this.width,this.height)},uCamPos:{value:new H.Vector3},uCamRight:{value:new H.Vector3(1,0,0)},uCamUp:{value:new H.Vector3(0,1,0)},uCamForward:{value:new H.Vector3(0,0,-1)},uTanHalfFov:{value:.35},uAspect:{value:1.33},uLightPosRadius:{value:n},uLightColorEnabled:{value:i},uMatA:{value:d},uMatB:{value:l},uMatC:{value:h},uMatD:{value:o},uMatE:{value:g},uMatF:{value:v}}}),this.displayMat=new H.RawShaderMaterial({glslVersion:H.GLSL3,vertexShader:mt,fragmentShader:It,depthTest:!1,depthWrite:!1,uniforms:{uAccumTex:{value:this.rtB.texture},uResolution:{value:new H.Vector2(this.width,this.height)},uExposure:{value:1.08},uDenoiser:{value:1},uSampleCount:{value:1}}});let f=new H.PlaneGeometry(2,2);this.quadMesh=new H.Mesh(f,this.traceMat),this.quadMesh.frustumCulled=!1,this.quadScene=new H.Scene,this.quadScene.add(this.quadMesh),this.quadCamera=new H.OrthographicCamera(-1,1,1,-1,0,1)}createTarget(e,t){return new H.WebGLRenderTarget(e,t,{minFilter:H.NearestFilter,magFilter:H.NearestFilter,format:H.RGBAFormat,type:this.targetType,depthBuffer:!1,stencilBuffer:!1})}setTextureArrays(e){this.traceMat.uniforms.uAlbedoArray.value=e.albedoArray,this.traceMat.uniforms.uNormalArray.value=e.normalArray,this.traceMat.uniforms.uRoughMetalArray.value=e.roughMetalArray,this.traceMat.uniforms.uCustomAlbedoArray.value=e.customAlbedoArray,this.traceMat.uniforms.uCustomNormalArray.value=e.customNormalArray,this.traceMat.uniforms.uCustomRoughMetalArray.value=e.customRoughMetalArray,this.resetAccumulation()}setBVH(e){this.bvhData&&(this.bvhData.bvhTexture.dispose(),this.bvhData.triPosTexture.dispose(),this.bvhData.triNormTexture.dispose(),this.bvhData.triUvTexture.dispose()),this.bvhData=e,this.traceMat.uniforms.uBvhTex.value=e.bvhTexture,this.traceMat.uniforms.uTriPosTex.value=e.triPosTexture,this.traceMat.uniforms.uTriNormTex.value=e.triNormTexture,this.traceMat.uniforms.uTriUvTex.value=e.triUvTexture,this.traceMat.uniforms.uTexWidth.value=e.texWidth,this.resetAccumulation()}resize(e,t){let r=Math.max(64,Math.floor(e)),a=Math.max(64,Math.floor(t));r===this.width&&a===this.height||(this.width=r,this.height=a,this.rtA.setSize(r,a),this.rtB.setSize(r,a),this.traceMat.uniforms.uResolution.value.set(r,a),this.displayMat.uniforms.uResolution.value.set(r,a),this.resetAccumulation())}resetAccumulation(){this.sampleIndex=0}getSamples(){return this.sampleIndex}getResolution(){return[this.width,this.height]}syncLights(e){let t=this.traceMat.uniforms.uLightPosRadius.value,r=this.traceMat.uniforms.uLightColorEnabled.value;for(let a=0;a<Le;a++){let n=e[a];if(!n){r[a].set(0,0,0,0);continue}let[i,d,l]=ut(n.azimuth,n.elevation,n.distance);t[a].set(i,d,l,n.radius);let h=1,o=1,g=1;if(n.useKelvin){let[f,x,T]=ct(n.kelvin);h=Math.pow(f,2.2),o=Math.pow(x,2.2),g=Math.pow(T,2.2)}else[h,o,g]=Ke(n.color);let v=n.intensity*.48;r[a].set(h*v,o*v,g*v,n.enabled?1:0)}}syncMaterials(e,t,r){if(!this.bvhData)return;let a=this.traceMat.uniforms.uMatA.value,n=this.traceMat.uniforms.uMatB.value,i=this.traceMat.uniforms.uMatC.value,d=this.traceMat.uniforms.uMatD.value,l=this.traceMat.uniforms.uMatE.value,h=this.traceMat.uniforms.uMatF.value;for(let o of e){let g=this.bvhData.materialIdToIndex.get(o.id);if(g===void 0||g>=oe)continue;let[v,f,x]=Ke(o.color),T=t?.get(o.id)??Pe[o.texturePreset]??0,{slice:E,modeFlag:M}=r?r.getLayerShaderInfo(T):{slice:T>=100?T-100:T,modeFlag:T>=100?1:0};a[g].set(v,f,x,o.roughness),n[g].set(o.metalness,o.ior,o.transmission,o.clearcoat),i[g].set(o.emissiveIntensity,o.emissiveOpacity??1,0,0),d[g].set(E,o.uvScale,o.normalStrength,M),l[g].set(o.uvScaleX??o.uvScale,o.uvScaleY??o.uvScale,(o.uvRotation??0)*Math.PI/180,o.uvOffsetX??0),h[g].set(o.uvOffsetY??0,o.hasCustomMetalness?1:0,0,0)}}traceSample(e,t,r,a,n,i,d){this.syncLights(t),this.syncMaterials(r,i,d),e.updateMatrixWorld(),this.camPos.copy(e.position),e.matrixWorld.extractBasis(this.camRight,this.camUp,this.camForward),this.camForward.negate();let l=Math.tan(H.MathUtils.degToRad(e.fov*.5)),h=this.traceMat.uniforms;h.uCamPos.value.copy(this.camPos),h.uCamRight.value.copy(this.camRight),h.uCamUp.value.copy(this.camUp),h.uCamForward.value.copy(this.camForward),h.uTanHalfFov.value=l,h.uAspect.value=e.aspect,h.uSampleIndex.value=this.sampleIndex,h.uMaxBounces.value=n?Math.min(2,a.maxBounces):a.maxBounces,h.uClayMode.value=a.clayMode?1:0,h.uEnvMode.value=Ct[a.environment],h.uEnvIntensity.value=a.envIntensity;let o=this.pingPong===0?this.rtA:this.rtB,g=this.pingPong===0?this.rtB:this.rtA;h.uPrevFrame.value=o.texture,this.quadMesh.material=this.traceMat;let v=this.renderer.getRenderTarget(),f=this.renderer.autoClear;this.renderer.autoClear=!1,this.renderer.setRenderTarget(g),this.renderer.render(this.quadScene,this.quadCamera),this.renderer.setRenderTarget(v),this.renderer.autoClear=f,this.pingPong=1-this.pingPong,this.sampleIndex++}displayToScreen(e,t){let r=this.pingPong===0?this.rtA:this.rtB;this.displayMat.uniforms.uAccumTex.value=r.texture,this.displayMat.uniforms.uExposure.value=e.exposure,this.displayMat.uniforms.uDenoiser.value=e.denoiser?1:0,this.displayMat.uniforms.uSampleCount.value=Math.max(1,this.sampleIndex),this.quadMesh.material=this.displayMat;let a=this.renderer.autoClear;this.renderer.autoClear=!1,this.renderer.setRenderTarget(null),t?(this.renderer.setScissorTest(!0),this.renderer.setScissor(t.x,t.y,t.w,t.h),this.renderer.render(this.quadScene,this.quadCamera),this.renderer.setScissorTest(!1)):this.renderer.render(this.quadScene,this.quadCamera),this.renderer.autoClear=a}dispose(){this.rtA.dispose(),this.rtB.dispose(),this.traceMat.dispose(),this.displayMat.dispose(),this.quadMesh.geometry.dispose(),this.dummyTex.dispose(),this.dummyArrayTex.dispose(),this.bvhData&&(this.bvhData.bvhTexture.dispose(),this.bvhData.triPosTexture.dispose(),this.bvhData.triNormTexture.dispose(),this.bvhData.triUvTexture.dispose())}};var K=[{id:"key",name:"Key Softbox",role:"key",enabled:!0,useKelvin:!0,kelvin:5200,color:"#fff4e6",intensity:24,azimuth:42,elevation:46,distance:4.4,radius:.65},{id:"fill",name:"Cool Fill",role:"fill",enabled:!0,useKelvin:!0,kelvin:7600,color:"#d8e8ff",intensity:10,azimuth:-58,elevation:28,distance:4.8,radius:1.1},{id:"rim",name:"Edge Rim",role:"rim",enabled:!0,useKelvin:!0,kelvin:3600,color:"#ffd19c",intensity:18,azimuth:-145,elevation:36,distance:4.2,radius:.35},{id:"accent",name:"Overhead Bounce",role:"accent",enabled:!1,useKelvin:!0,kelvin:6200,color:"#eef5ff",intensity:12,azimuth:10,elevation:78,distance:4.5,radius:1.2}],ht=[{id:"three-point",name:"Three-Point Studio",environment:"studio",envIntensity:.85,lights:K},{id:"golden-hour",name:"Golden Hour",environment:"golden",envIntensity:1.15,lights:[{...K[0],kelvin:3100,intensity:30,azimuth:64,elevation:18,radius:.45},{...K[1],kelvin:8200,intensity:8,azimuth:-100,elevation:42,radius:1.3},{...K[2],kelvin:2600,intensity:22,azimuth:-135,elevation:24,radius:.3},{...K[3],enabled:!1}]},{id:"chiaroscuro",name:"Chiaroscuro",environment:"obsidian",envIntensity:.15,lights:[{...K[0],kelvin:4800,intensity:34,azimuth:52,elevation:38,radius:.22},{...K[1],enabled:!1,intensity:4},{...K[2],kelvin:5800,intensity:26,azimuth:-152,elevation:40,radius:.18},{...K[3],enabled:!1}]},{id:"product-softbox",name:"Product Softbox",environment:"loft",envIntensity:1,lights:[{...K[0],kelvin:5600,intensity:22,azimuth:32,elevation:58,radius:1.25},{...K[1],kelvin:5600,intensity:14,azimuth:-42,elevation:48,radius:1.25},{...K[2],kelvin:6500,intensity:16,azimuth:170,elevation:52,radius:.8},{...K[3],enabled:!0,kelvin:5800,intensity:14,azimuth:0,elevation:82,radius:1.4}]},{id:"cornell-gi",name:"Cornell Bounce",environment:"cornell",envIntensity:.9,lights:[{...K[0],kelvin:5e3,intensity:24,azimuth:15,elevation:74,distance:3.6,radius:.8},{...K[1],kelvin:6e3,intensity:6,azimuth:-60,elevation:30,radius:1},{...K[2],enabled:!1},{...K[3],enabled:!1}]}],Je=[{id:"brushed-titanium",name:"Brushed Titanium",color:"#b4bac2",roughness:.24,metalness:.96,ior:1.5,transmission:0,clearcoat:.15,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:2,normalStrength:1},{id:"polished-chrome",name:"Mirror Chrome",color:"#eef1f5",roughness:.04,metalness:1,ior:1.5,transmission:0,clearcoat:.2,emissiveIntensity:0,texturePreset:"none",uvScale:1.5,normalStrength:1},{id:"anodized-gold",name:"Satin Brass",color:"#d6a456",roughness:.22,metalness:.94,ior:1.5,transmission:0,clearcoat:.2,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:2,normalStrength:.8},{id:"optical-crystal",name:"Optical Glass",color:"#eef8ff",roughness:.03,metalness:0,ior:1.54,transmission:.96,clearcoat:1,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"smoked-acrylic",name:"Smoked Quartz",color:"#6b7b8c",roughness:.12,metalness:0,ior:1.49,transmission:.82,clearcoat:.9,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"matte-ceramic",name:"Honed Travertine",color:"#d6cfc4",roughness:.72,metalness:0,ior:1.45,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"travertine",uvScale:2,normalStrength:1},{id:"car-lacquer",name:"Carbon Lacquer",color:"#1b1f26",roughness:.24,metalness:.15,ior:1.5,transmission:0,clearcoat:1,emissiveIntensity:0,texturePreset:"carbon-weave",uvScale:2,normalStrength:1},{id:"warm-emissive",name:"Filament Glow",color:"#ffbe6b",roughness:.2,metalness:0,ior:1.45,transmission:0,clearcoat:0,emissiveIntensity:3.5,texturePreset:"none",uvScale:1,normalStrength:0},{id:"brushed-aluminum",name:"Brushed Aluminum",color:"#c5ccd2",roughness:.31,metalness:.94,ior:1.5,transmission:0,clearcoat:.1,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:2.2,normalStrength:.72},{id:"warm-copper",name:"Warm Copper",color:"#b66c46",roughness:.27,metalness:.97,ior:1.5,transmission:0,clearcoat:.18,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:1.8,normalStrength:.68},{id:"black-oxide-steel",name:"Black Oxide Steel",color:"#343a40",roughness:.34,metalness:.93,ior:1.5,transmission:0,clearcoat:.22,emissiveIntensity:0,texturePreset:"brushed-metal",uvScale:1.6,normalStrength:.7},{id:"pearl-enamel",name:"Pearl Enamel",color:"#e7e0d5",roughness:.16,metalness:.08,ior:1.48,transmission:0,clearcoat:.92,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"matte-polymer",name:"Matte Polymer",color:"#59616b",roughness:.62,metalness:.03,ior:1.46,transmission:0,clearcoat:.08,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"walnut-wood",name:"Walnut Wood",color:"#75452f",roughness:.43,metalness:0,ior:1.46,transmission:0,clearcoat:.12,emissiveIntensity:0,texturePreset:"cedar-wood",uvScale:1.7,normalStrength:.78},{id:"black-leather",name:"Black Leather",color:"#282321",roughness:.7,metalness:0,ior:1.46,transmission:0,clearcoat:.04,emissiveIntensity:0,texturePreset:"vulcanite",uvScale:1.35,normalStrength:.68},{id:"cast-concrete",name:"Cast Concrete",color:"#888780",roughness:.91,metalness:0,ior:1.45,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"concrete",uvScale:1.4,normalStrength:.82},{id:"polished-marble",name:"Polished Marble",color:"#d7d1c7",roughness:.19,metalness:0,ior:1.5,transmission:0,clearcoat:.38,emissiveIntensity:0,texturePreset:"travertine",uvScale:1.65,normalStrength:.55},{id:"frosted-glass",name:"Frosted Glass",color:"#c5dbe4",roughness:.28,metalness:0,ior:1.48,transmission:.78,clearcoat:.92,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"emerald-glass",name:"Emerald Glass",color:"#287466",roughness:.07,metalness:0,ior:1.52,transmission:.94,clearcoat:1,emissiveIntensity:0,texturePreset:"none",uvScale:1,normalStrength:0},{id:"soft-rubber",name:"Soft Rubber",color:"#242629",roughness:.84,metalness:0,ior:1.46,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"vulcanite",uvScale:1.1,normalStrength:.7},{id:"warm-limestone",name:"Warm Limestone",color:"#c9b99b",roughness:.67,metalness:0,ior:1.48,transmission:0,clearcoat:.06,emissiveIntensity:0,texturePreset:"limestone",uvScale:1.35,normalStrength:.58},{id:"red-clay-brick",name:"Red Clay Brick",color:"#a64f39",roughness:.9,metalness:0,ior:1.46,transmission:0,clearcoat:0,emissiveIntensity:0,texturePreset:"brick",uvScale:.82,normalStrength:.86},{id:"spotted-gum",name:"Spotted Gum",color:"#a8653e",roughness:.48,metalness:0,ior:1.46,transmission:0,clearcoat:.14,emissiveIntensity:0,texturePreset:"cedar-wood",uvScale:2.1,normalStrength:.74},{id:"architectural-terrazzo",name:"Terrazzo",color:"#d8d0c2",roughness:.32,metalness:0,ior:1.5,transmission:0,clearcoat:.22,emissiveIntensity:0,texturePreset:"terrazzo",uvScale:1.25,normalStrength:.36},{id:"glazed-ceramic-tile",name:"Glazed Ceramic Tile",color:"#e6e2d8",roughness:.16,metalness:0,ior:1.49,transmission:0,clearcoat:.88,emissiveIntensity:0,texturePreset:"ceramic-tile",uvScale:1,normalStrength:.18},{id:"lime-plaster",name:"Lime Plaster",color:"#d7cfbd",roughness:.86,metalness:0,ior:1.46,transmission:0,clearcoat:.02,emissiveIntensity:0,texturePreset:"plaster",uvScale:1.5,normalStrength:.42},{id:"corten-steel",name:"Weathered Corten Steel",color:"#a75536",roughness:.71,metalness:.82,ior:1.5,transmission:0,clearcoat:.12,emissiveIntensity:0,texturePreset:"corten-steel",uvScale:1.7,normalStrength:.7},{id:"polished-concrete",name:"Polished Concrete",color:"#a3a09a",roughness:.29,metalness:0,ior:1.48,transmission:0,clearcoat:.18,emissiveIntensity:0,texturePreset:"concrete",uvScale:1.35,normalStrength:.36}],dt={maxBounces:4,maxSamples:128,exposure:1.08,denoiser:!0,interactiveScale:.5,clayMode:!1,showLightGizmos:!0,environment:"studio",envIntensity:.85};function ft(s,e){if(!/^#[\da-f]{6}$/i.test(s))return"#808080";let t=Number.parseInt(s.slice(1),16);return`#${[16,8,0].map(r=>{let a=t>>r&255,n=e>=0?a+(255-a)*e:a*(1+e);return Math.round(Math.max(0,Math.min(255,n))).toString(16).padStart(2,"0")}).join("")}`}function Pt(s,e){let t='stroke="#ffffff" stroke-opacity=".24" fill="none"';switch(s.texturePreset){case"brushed-metal":return`<pattern id="${e}" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 1H8M0 5H8" ${t} stroke-width=".7"/></pattern>`;case"carbon-weave":return`<pattern id="${e}" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M0 0H4V4H0ZM5 5H9V9H5Z" fill="#fff" fill-opacity=".18"/><path d="M5 0H9V4H5ZM0 5H4V9H0Z" fill="#000" fill-opacity=".2"/></pattern>`;case"vulcanite":return`<pattern id="${e}" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#fff" fill-opacity=".22"/><circle cx="6" cy="6" r="1" fill="#000" fill-opacity=".22"/></pattern>`;case"guilloche":return`<pattern id="${e}" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="9" cy="9" r="5.5" ${t} stroke-width=".7"/><circle cx="9" cy="9" r="2.5" ${t} stroke-width=".6"/></pattern>`;case"concrete":return`<pattern id="${e}" width="13" height="13" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r=".9" fill="#000" fill-opacity=".22"/><circle cx="10" cy="9" r=".8" fill="#fff" fill-opacity=".32"/><path d="M1 11L5 10M8 2L12 1" ${t} stroke-width=".6"/></pattern>`;case"cedar-wood":return`<pattern id="${e}" width="15" height="15" patternUnits="userSpaceOnUse"><path d="M0 3C4 1 10 5 15 2M0 10C5 7 10 12 15 9" ${t} stroke-width="1"/></pattern>`;case"travertine":return`<pattern id="${e}" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M-2 5C3 1 9 9 20 3M-2 13C4 9 11 17 20 11" ${t} stroke-width="1.1"/></pattern>`;case"limestone":return`<pattern id="${e}" width="16" height="14" patternUnits="userSpaceOnUse"><path d="M0 3C4 1 9 5 16 2M0 9C5 7 11 11 16 8" ${t} stroke-width="1"/><circle cx="4" cy="12" r=".7" fill="#000" fill-opacity=".2"/><circle cx="13" cy="5" r=".55" fill="#fff" fill-opacity=".32"/></pattern>`;case"brick":return`<pattern id="${e}" width="20" height="14" patternUnits="userSpaceOnUse"><path d="M0 0H20M0 7H20M0 14H20M10 0V7M0 7V14" stroke="#eee2d3" stroke-opacity=".5" stroke-width="1.2"/><path d="M1 1H9V6H1ZM11 1H19V6H11ZM1 8H9V13H1ZM11 8H19V13H11Z" fill="#000" fill-opacity=".08"/></pattern>`;case"terrazzo":return`<pattern id="${e}" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M2 4L5 2 7 5 4 7ZM11 3L14 2 15 5 12 6ZM8 11L11 9 13 12 10 14ZM1 14L3 12 5 14 3 16ZM15 15L17 13 18 16Z" fill="#66584c" fill-opacity=".58"/><circle cx="7" cy="3" r="1" fill="#a47758" fill-opacity=".65"/><circle cx="14" cy="10" r=".8" fill="#737b70" fill-opacity=".58"/></pattern>`;case"ceramic-tile":return`<pattern id="${e}" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 0H20V20H0Z" fill="none" stroke="#fff" stroke-opacity=".62" stroke-width="1.5"/><path d="M2 2H18V18H2Z" fill="none" stroke="#000" stroke-opacity=".08" stroke-width=".7"/></pattern>`;case"plaster":return`<pattern id="${e}" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M1 4C4 2 8 5 12 3M3 12C7 9 11 13 15 10M7 1L8 2M13 7L14 8" ${t} stroke-width=".75"/></pattern>`;case"corten-steel":return`<pattern id="${e}" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r="2.2" fill="#411d16" fill-opacity=".24"/><circle cx="11" cy="3" r="1.5" fill="#e09a62" fill-opacity=".38"/><circle cx="8" cy="12" r="3" fill="#59271a" fill-opacity=".2"/><path d="M0 9C4 7 10 11 16 8" stroke="#f2bd84" stroke-opacity=".28" fill="none" stroke-width="1"/></pattern>`;default:return""}}function pt(s,e="material"){let t=s.id.replace(/[^a-z0-9-]/gi,"-"),r=`${e}-sphere-${t}`,a=`${e}-clip-${t}`,n=`${e}-pattern-${t}`,i=s.transmission>.55,d=Math.min(.8,.2+s.metalness*.28+s.clearcoat*.25),l=4+s.roughness*10,h=s.texturePreset==="none"?"":`<circle cx="40" cy="40" r="31" fill="url(#${n})" clip-path="url(#${a})" opacity=".85"/>`,o=s.texturePreset==="none"?"":Pt(s,n);return`<svg viewBox="0 0 80 80" aria-hidden="true" focusable="false"><defs><radialGradient id="${r}" cx="31%" cy="25%" r="78%"><stop offset="0%" stop-color="${ft(s.color,.72)}"/><stop offset="38%" stop-color="${s.color}"/><stop offset="100%" stop-color="${ft(s.color,-.42)}"/></radialGradient><clipPath id="${a}"><circle cx="40" cy="40" r="31"/></clipPath>${o}</defs>${s.emissiveIntensity>0?`<circle cx="40" cy="40" r="35" fill="${s.color}" opacity=".18"/>`:""}<circle cx="40" cy="40" r="31" fill="url(#${r})"/>${h}${i?'<circle cx="40" cy="40" r="29.5" fill="#d8f3ff" opacity=".1"/>':""}<ellipse cx="30" cy="25" rx="${l}" ry="${3+s.roughness*4}" transform="rotate(-28 30 25)" fill="#fff" opacity="${d}"/><ellipse cx="48" cy="52" rx="17" ry="8" transform="rotate(-34 48 52)" fill="#fff" opacity="${Math.max(.04,(1-s.roughness)*.14)}"/><circle cx="40" cy="40" r="30.5" fill="none" stroke="${i?"#dff7ff":"#fff"}" stroke-opacity="${i?.72:.24}" stroke-width="${i?1.8:1}"/></svg>`}function yt(s){try{let e=s.getContext(),t=e.getExtension("WEBGL_debug_renderer_info"),r=t?t.UNMASKED_RENDERER_WEBGL:e.RENDERER;return/SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(String(e.getParameter(r)))}catch{return!0}}function vt(s){s&&s.group.traverse(e=>{e.geometry?.dispose?.();for(let t of Array.isArray(e.material)?e.material:[e.material])t?.dispose?.()})}async function dr(s,e){let t=new Ge(s.capabilities.getMaxAnisotropy()),r=new Map,a=null,n=null;try{let v=function(){return{settings:{...l},lights:h.map(c=>({...c})),materials:g.materials.map(c=>{let u=r.get(c.id)??Pe[c.texturePreset]??0;return{...c,mapPreviews:{albedo:t.getMapPreviewDataUrl(u,"albedo"),normal:t.getMapPreviewDataUrl(u,"normal"),roughness:t.getMapPreviewDataUrl(u,"roughness")}}}),samples:n?.getSamples()??0,resolution:n?.getResolution()??[0,0],materialPresets:Je.map(c=>({...c,previewSvg:pt(c,"boxlab-material")}))}},f=function(c){for(let u=0;u<h.length;u++)c[u]&&Object.assign(h[u],c[u]);n?.resetAccumulation()},x=function(c,u){let y=g.materials.find(C=>C.id===c);if(!y)return;let R={};for(let C of["color","roughness","metalness","ior","transmission","clearcoat","emissiveIntensity","emissiveOpacity","texturePreset","uvScale","uvScaleX","uvScaleY","uvOffsetX","uvOffsetY","uvRotation","normalStrength"])u[C]!==void 0&&Object.assign(R,{[C]:u[C]});let w=!!(y.hasCustomAlbedo||y.hasCustomNormal||y.hasCustomRoughness||y.hasCustomMetalness);w&&delete R.texturePreset,Object.assign(y,R),!w&&R.texturePreset&&r.set(c,Pe[R.texturePreset]),n?.resetAccumulation()},E=function(c){let u=g.materials.find(y=>y.id===c);u&&(r.delete(c),u.hasCustomAlbedo=!1,u.hasCustomNormal=!1,u.hasCustomRoughness=!1,u.hasCustomMetalness=!1,n?.resetAccumulation())},M=function(c,u){let y=g.materials.find(w=>w.id===c),R=Je.find(w=>w.id===u);!y||!R||x(c,{...R})},S=function(c){Object.assign(l,c),n?.resetAccumulation()},b=function(c){let u=ht.find(y=>y.id===c);u&&(f(u.lights.map(y=>({...y}))),S({environment:u.environment,envIntensity:u.envIntensity}))},p=function(c){S(c.settings),f(c.lights);for(let u of g.materials){let y=c.materials.find(R=>R.id===u.id);y&&x(u.id,y)}},m=function(){n?.dispose(),n=null,t.dispose(),vt(g)},i=new File([e],"BoxLab_Current.glb",{type:"model/gltf-binary"});a=await lt(i,yt(s),t,r);let d=Qe(a.group);n=new ke(s),n.setTextureArrays(t),n.setBVH(d);let l={...dt},h=K.map(c=>({...c})),o={scale:a.rayTransform.scale,offset:a.rayTransform.offset.clone()},g=a;async function T(c,u,y){let R=g.materials.find(C=>C.id===c);if(!R||!y.type.startsWith("image/"))return;let w=r.get(c);if(w===void 0||w<100){if(new Set([...r.values()].filter(P=>P>=100)).size>=me)throw new Error("All eight custom Helios texture layers are in use; restore an uploaded layer before adding another.");w=t.allocateCustomLayer(R.texturePreset,!1),r.set(c,w)}await t.writeFileToLayer(w,u,y),u==="albedo"?R.hasCustomAlbedo=!0:u==="normal"?R.hasCustomNormal=!0:R.hasCustomRoughness=!0,n?.resetAccumulation()}return{transform:o,getState:v,updateLights:f,updateMaterial:x,uploadMaterialMap:T,restoreMaterialPresetMaps:E,applyMaterialPreset:M,updateSettings:S,applyLightingRig:b,applyPreferences:p,render(c,u=!1){if(!n)return 0;let y=u?1:l.maxSamples;return n.getSamples()<y&&n.traceSample(c,h,g.materials,l,u,r,t),n.displayToScreen(l),n.getSamples()},resize(c,u,y=!1){let R=yt(s)?1:Math.min(window.devicePixelRatio||1,1.5),w=y?l.interactiveScale:1;n?.resize(Math.floor(c*R*w),Math.floor(u*R*w))},captureSnapshot(){return!n||n.getSamples()<l.maxSamples?null:(n.displayToScreen(l),s.domElement.toDataURL("image/png"))},reset(){n?.resetAccumulation()},dispose:m}}catch(i){throw n?.dispose(),t.dispose(),vt(a),i}}export{dr as createBoxLabHeliosTrace};
