const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./codex-HJyaWOst.js","./schema-BAt--PAx.js","./zones-BHvBl3cb.js","./index-D_fl6dLu.js","./bakeCache-DJ0Nokzh.js"])))=>i.map(i=>d[i]);
import{_ as Ht}from"./index-D_fl6dLu.js";import{S as ue,a as Ee}from"./schema-BAt--PAx.js";import{f as Gt,d as Xt}from"./bakeCache-DJ0Nokzh.js";const ct={up:["ArrowUp"],down:["ArrowDown"],left:["ArrowLeft"],right:["ArrowRight"],linkNext:["Period","BracketRight"],linkPrev:["Comma","BracketLeft"],panUp:["KeyW"],panDown:["KeyS"],panLeft:["KeyA"],panRight:["KeyD"],zoomIn:["Equal","Shift+Equal","NumpadAdd","KeyE"],zoomOut:["Minus","NumpadSubtract","KeyQ"],fit:["Digit0","Numpad0","Home"],activate:["Enter","NumpadEnter","Space"],close:["Escape"],grant:["KeyG"],reset:["Shift+KeyR"]},Qt=["panUp","panDown","panLeft","panRight"],Jt=n=>{for(const r of Object.keys(ct))if(ct[r].includes(n))return r;return null},P=Object.keys(Ee),ke=Math.PI*2,ce=(n,r,l)=>Math.min(l,Math.max(r,n)),Ie=(n,r,l)=>n+(r-n)*l,Se=(n,r,l)=>{const M=ce((l-n)/(r-n),0,1);return M*M*(3-2*M)},pe=n=>n.replace(/[&<>"]/g,r=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[r]),rt=n=>{let r=2166136261;for(let l=0;l<n.length;l++)r=Math.imul(r^n.charCodeAt(l),16777619);return r>>>0},Tt=n=>()=>{n=n+1831565813|0;let r=Math.imul(n^n>>>15,1|n);return r=r+Math.imul(r^r>>>7,61|r)^r,((r^r>>>14)>>>0)/4294967296},X=0,zt=1,St=2,bt={launcher:{s:[0,.9,0,-.9,-.55,-.35,0,-.9,.55,-.35,0,-.9,-.4,.9,.4,.9]},juggle:{s:[-.9,.6,0,-.7,0,-.7,.9,.6,-.25,.9,.25,.9,0,0,0,0],ring:.16},traversal:{s:[-.9,0,.9,0,.35,-.5,.9,0,.35,.5,.9,0,-.9,-.4,-.9,.4]},manifest:{s:[0,-.95,0,-.66,0,.66,0,.95,-.95,0,-.66,0,.66,0,.95,0],ring:.46},stance:{s:[-.85,.85,.85,-.85,-.5,.1,-.1,.5,-.75,.45,-.45,.75,0,0,0,0]},aerial:{s:[-.8,-.8,.8,.8,-.8,.8,.8,-.8,0,-.95,0,-.5,-.95,0,-.5,0]},reaction:{s:[-.95,0,0,-.55,0,-.55,.95,0,.95,0,0,.55,0,.55,-.95,0],ring:.2},finisher:{s:[-.8,-.8,.8,.8,.8,-.8,-.8,.8,0,-.95,0,.95,-.95,0,.95,0]},slam:{s:[0,-.9,0,.35,-.5,-.1,0,.45,.5,-.1,0,.45,-.9,.85,.9,.85]},unleash:{s:[-.8,-.6,.8,-.6,-.8,0,.8,0,-.8,.6,.8,.6,.8,-.6,.8,.6]},omen:{s:[0,-.85,.85,.7,.85,.7,-.85,.7,-.85,.7,0,-.85,0,-.15,0,.3],ring:0}},yt={s:[-.8,-.8,.8,.8,.8,-.8,-.8,.8,0,-1,0,-.6,0,.6,0,1],ring:.5};function Zt(n){const r=Tt(n),l=r()<.6,M=[.15+r()*.75,-.95+r()*.35],w=[r()<.5?0:.1+r()*.45,-.25+r()*.5],O=[.1+r()*.8,.5+r()*.4],q=$=>l?[-$[0],$[1]]:[-$[0],-$[1]],R=q(M),Q=q(w),W=q(O);return[...M,...w,...w,...O,...R,...Q,...Q,...W]}const ea=n=>1+(n.requires?.length??0)+(n.cost?.cooldown?1:0)+(n.types.length>1?1:0);function ta(n,r,l,M,w,O){const q=(n+l)/2,R=(r+M)/2,Q=l-n,W=M-r,$=Math.hypot(Q,W)||1,Y=O&1?1:-1,U=q-W/$*$*w*Y,T=R+Q/$*$*w*Y,re=28,le=[],f=[];let ae=0,i=n,m=r;for(let h=0;h<=re;h++){const p=h/re,c=1-p,z=c*c*n+2*c*p*U+p*p*l,D=c*c*r+2*c*p*T+p*p*M;h&&(ae+=Math.hypot(z-i,D-m)),i=z,m=D,le.push(z,D),f.push(ae)}return{pts:le,u:f}}function aa(){const n=P.length,r=[],l=i=>({x:0,y:0,seed:rt(i.id)%1e3/1e3,ring2:0,nbr:[],cost:0,lit:0,litT:0,reach:0,reachT:0,hov:0,foc:0,sel:0,pulse:99,sc:1,sv:0,...i});r.push(l({id:"origin",kind:St,name:"Ash",cluster:n,r:96,glyph:yt.s,ring2:yt.ring}));const M=P.map(()=>P.map(()=>0));for(const i of ue)for(const m of i.types){for(const h of i.chainsInto??[])if(m!==h){const p=P.indexOf(m),c=P.indexOf(h);M[p][c]++,M[c][p]++}for(const h of i.types)if(m!==h){const p=P.indexOf(m),c=P.indexOf(h);M[p][c]+=2}}const w=P.map((i,m)=>m),O=i=>{let m=0;for(let h=0;h<n;h++)for(let p=h+1;p<n;p++){const c=Math.abs(h-p);m+=M[i[h]][i[p]]*Math.min(c,n-c)}return m};for(let i=0,m=O(w);i<30;i++){let h=!1;for(let p=0;p<n;p++)for(let c=p+1;c<n;c++){[w[p],w[c]]=[w[c],w[p]];const z=O(w);z<m?(m=z,h=!0):[w[p],w[c]]=[w[c],w[p]]}if(!h)break}const q=Tt(1337);P.forEach((i,m)=>{const h=w.indexOf(m),p=-Math.PI/2+h*ke/n,c=560+(h%2?70:-40);r.push(l({id:"hub:"+i,kind:zt,type:i,name:Ee[i],cluster:m,r:70,glyph:bt[i].s,ring2:bt[i].ring??0,x:Math.cos(p)*c,y:Math.sin(p)*c}))});const R=i=>1+P.indexOf(i);for(const i of ue){const m=r[R(i.types[0])],h=q()*ke;r.push(l({id:i.id,kind:X,skill:i,name:i.name,cluster:P.indexOf(i.types[0]),r:46,glyph:Zt(rt(i.id)),cost:ea(i),x:m.x+Math.cos(h)*120,y:m.y+Math.sin(h)*120}))}const Q=i=>r.findIndex(m=>m.id===i),W=[],$=(i,m,h,p)=>{const c=rt(r[i].id+">"+r[m].id);W.push({a:i,b:m,kind:h,seed:c%997/997,pts:[],u:[],en:0,enT:0,vis:.3,visT:.3,_s:c,_b:p})};for(let i=0;i<n;i++)$(0,1+i,0,.05);for(const i of ue){const m=Q(i.id);$(R(i.types[0]),m,1,.03),i.types.slice(1).forEach(h=>$(R(h),m,2,.12));for(const h of i.chainsInto??[])i.types.includes(h)||$(m,R(h),3,.2)}const Y=[];for(const i of W)Y.push([i.a,i.b,i.kind===0?470:i.kind===1?135:i.kind===2?240:360,i.kind===0?.018:i.kind===1?.09:i.kind===2?.02:.006]);const U=700;for(let i=0;i<U;i++){const m=1-i/U,h=r.map(()=>0),p=r.map(()=>0);for(let c=0;c<r.length;c++)for(let z=c+1;z<r.length;z++){const D=r[c],L=r[z];let F=L.x-D.x,j=L.y-D.y,K=Math.hypot(F,j)||.01;const d=D.kind===X&&L.kind===X?70:D.kind!==X&&L.kind!==X?190:80,u=D.r+L.r+d;F/=K,j/=K;const S=K<u?(u-K)*.5:9e3/(K*K);h[c]-=F*S,p[c]-=j*S,h[z]+=F*S,p[z]+=j*S}for(const[c,z,D,L]of Y){const F=r[c],j=r[z],K=j.x-F.x,d=j.y-F.y,u=Math.hypot(K,d)||.01,S=(u-D)*L;h[c]+=K/u*S,p[c]+=d/u*S,h[z]-=K/u*S,p[z]-=d/u*S}for(let c=1;c<r.length;c++){const z=r[c],D=h[c]*m*.9,L=p[c]*m*.9,F=Math.hypot(D,L),j=Math.min(1,28/(F||1));z.x+=D*j,z.y+=L*j}}for(const i of r)i.x*=1.3;for(const i of W){const m=r[i.a],h=r[i.b],p=i,c=ta(m.x,m.y,h.x,h.y,p._b,p._s);i.pts=c.pts,i.u=c.u,m.nbr.push(i.b),h.nbr.push(i.a)}const T=[];for(let i=0;i<n;i++){const m=r[1+i],h=r.map((c,z)=>z).filter(c=>r[c].kind===X&&r[c].cluster===i),p=Math.max(210,...h.map(c=>Math.hypot(r[c].x-m.x,r[c].y-m.y)+110));T.push({type:P[i],x:m.x,y:m.y,rad:p,reveal:.13,revealT:.13,hub:1+i,members:h})}T.push({x:0,y:0,rad:300,reveal:1,revealT:1,hub:0,members:[]});let re=1e9,le=1e9,f=-1e9,ae=-1e9;for(const i of T)re=Math.min(re,i.x-i.rad),le=Math.min(le,i.y-i.rad),f=Math.max(f,i.x+i.rad),ae=Math.max(ae,i.y+i.rad);return{nodes:r,edges:W,clusters:T,x0:re,y0:le,x1:f,y1:ae}}const Et="stickfall.skillweb.v1",_t=6;function oa(){try{const n=JSON.parse(localStorage.getItem(Et)??"null");if(n&&Array.isArray(n.u))return{u:n.u.filter(r=>typeof r=="string"),bonus:Number(n.bonus)||0}}catch{}return{u:[],bonus:0}}const na=n=>{try{localStorage.setItem(Et,JSON.stringify(n))}catch{}},wt=new Map(ue.map(n=>[n.id,ue.filter(r=>r!==n&&(r.chainsInto??[]).some(l=>n.types.includes(l))).map(r=>r.id)])),Rt=n=>{switch(n.kind){case"damage":return`Damage ${n.amount}${n.type?" "+n.type:""}`;case"launch":return`Launch ${n.height}`;case"knock":return`Knock ${n.dir??"away"} ${n.force}`;case"apply":return`Applies ${n.status} ${n.secs}s`;case"travel":return`Travel: ${n.mode}`;case"hang":return`Hang-time ${n.window}s at x${n.timeScale}`;case"qte":return`QTE ${n.window}s: ${n.onPerfect.map(Rt).join(", ")}`;case"buff":return`Buff ${n.stat} x${n.mult} for ${n.secs}s`;case"meter":return`Meter ${n.delta>0?"+":""}${n.delta}`;case"cinematic":return`Cinematic ${n.preset}`}},sa=n=>{switch(n.kind){case"self":return`Self ${n.has}`;case"target":return`Target ${n.has}`;case"comboAtLeast":return`Combo >= ${n.n}`;case"meterAtLeast":return`Meter >= ${n.n}`;case"event":return`Event ${n.topic}`;case"qte":return`QTE ${n.result}`}},kt=n=>n.replace(/^Key/,"").replace(/^Digit/,""),qe=`
float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float s=0.,w=.5;for(int i=0;i<4;i++){s+=w*vn(p);p=p*2.03+vec2(17.1,9.2);w*=.5;}return s;}`,At=`#version 300 es
void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}`,ra=`#version 300 es
precision highp float;
uniform vec2 u_res; uniform vec3 u_cam; uniform float u_t; uniform vec4 u_cl[12]; uniform vec2 u_par;
out vec4 o;
${qe}
void main(){
  vec2 s=vec2(gl_FragCoord.x-.5*u_res.x,.5*u_res.y-gl_FragCoord.y);
  float z=u_cam.z; vec2 p=u_cam.xy+s/z; vec2 pp=p+u_par*.5/z;
  vec3 bone=vec3(.847,.824,.769), red=vec3(1.,.14,.12);
  vec3 c=vec3(.05,.045,.065);
  float mott=fbm(pp*.0035)*.7+fbm(pp*.045)*.3;
  c+=(mott-.5)*.035*vec3(1.,.9,.95);
  c+=(h21(gl_FragCoord.xy+floor(u_t*10.)*17.)-.5)*.02;
  float cell=96.; vec2 q=(fract(pp/cell)-.5)*cell; float dd=length(q)*z;
  c+=bone*(1.-smoothstep(.5,1.6,dd))*.06;
  // orbit rings around the origin
  float lo=length(p);
  for(int k=1;k<5;k++){float rr=float(k)*330.-70.; float a=atan(p.y,p.x); float w=1.3/z;
    float ring=1.-smoothstep(w*.5,w,abs(lo-rr)); float dash=step(.45,fract(a*rr*.011+float(k)*.31));
    c=mix(c,bone*.6,ring*dash*.16);}
  // type regions: ink wash + rim hatching + wobbly dashed boundary
  for(int i=0;i<11;i++){
    vec4 cl=u_cl[i]; vec2 d=p-cl.xy; float L=length(d); float a=atan(d.y,d.x);
    float R=cl.z*(1.+.045*sin(a*3.+float(i)*1.7)+.03*sin(a*7.-float(i)*2.3+u_t*.15));
    float inside=1.-smoothstep(R*.5,R,L); float rv=cl.w;
    c+=vec3(.8,.72,.66)*inside*(.05+.11*rv);
    float ang=.55+float(i)*.47; float hv=dot(d,vec2(cos(ang),sin(ang)))/7.+vn(d*.02)*.5;
    float wf=clamp(1.3/(7.*z),0.,.45); float ln=smoothstep(1.-wf,1.,abs(fract(hv)-.5)*2.);
    float rim=smoothstep(.2,1.,L/R)*(1.-smoothstep(.97,1.02,L/R));
    c+=bone*ln*rim*(.1+.14*rv);
    float w=1.5/z; float ring=1.-smoothstep(w*.4,w,abs(L-R)); float dash=step(.38,fract(a*R*.011+float(i)*.17));
    float ring2=1.-smoothstep(w*.4,w,abs(L-R*1.035+vn(vec2(a*3.,float(i)))*4.));
    vec3 rc=mix(bone*.6,red,rv);
    c=mix(c,rc,ring*dash*(.45+.45*rv));
    c=mix(c,rc,ring2*step(.6,fract(a*R*.007+float(i)))*(.08+.2*rv));
  }
  vec2 uv=s/u_res*2.; c*=1.-.5*smoothstep(.45,1.15,length(uv));
  o=vec4(c,1.);
}`,ia=`#version 300 es
layout(location=0) in vec2 a_p; layout(location=1) in vec2 a_n; layout(location=2) in float a_side; layout(location=3) in float a_u; layout(location=4) in float a_id;
uniform vec2 u_res; uniform vec3 u_cam;
out float v_side; out float v_u; flat out float v_id;
void main(){
  float z=u_cam.z; float hw=max(16.,7./z);
  vec2 w=a_p+a_n*a_side*hw; vec2 s=(w-u_cam.xy)*z;
  gl_Position=vec4(s.x/(u_res.x*.5),-s.y/(u_res.y*.5),0.,1.);
  v_side=a_side; v_u=a_u; v_id=a_id;
}`,ca=n=>`#version 300 es
precision highp float;
uniform float u_t; uniform vec3 u_cam; uniform float u_dpr; uniform vec4 u_en[${n}];
in float v_side; in float v_u; flat in float v_id; out vec4 o;
${qe}
void main(){
  vec4 e=u_en[int(v_id+.5)]; float en=e.x, vis=e.y, kind=e.z, seed=e.w;
  float z=u_cam.z; float hwpx=max(16.*z,7.); float side=v_side*hwpx; float D=u_dpr;
  vec3 bone=vec3(.847,.824,.769), red=vec3(1.,.14,.12);
  float wob=(vn(vec2(v_u*.035,seed*13.))-.5)*2.4*D;
  float w1=(kind<.5?1.0:kind<1.5?1.5:kind<2.5?1.0:2.1)*D, aa=.9*D;
  float l1=1.-smoothstep(w1-aa,w1+aa,abs(side-wob));
  float l2=(1.-smoothstep(w1*.6-aa,w1*.6+aa,abs(side+wob*.8+1.4*D)))*.5;
  float L=max(l1,l2);
  float brk=step(.35,fract(v_u/(kind>1.5?20.:14.)+seed));
  float sp=(kind>1.5?95.:62.)*en; float per=kind>1.5?26.:18.;
  float fd=fract((v_u-u_t*sp)/per); float fdash=smoothstep(.05,.2,fd)*(1.-smoothstep(.55,.7,fd));
  float ph=fract(v_u/230.-u_t*.3*(.4+en)+seed); float dl=(ph-.5)*230.*z; float sig=dl<0.?30.*D:9.*D;
  float g=exp(-dl*dl/(2.*sig*sig))*exp(-side*side/(2.*pow(6.*D,2.)));
  float baseA=(kind<.5?.55:kind<1.5?.8:kind<2.5?.5:.9)*(.25+.75*vis);
  float locked=L*brk*baseA*(1.-en*.85);
  float act=L*mix(1.,fdash,.6)*en*(.5+.5*vis);
  vec3 rgb=bone*locked*1.15+mix(red,vec3(1.,.74,.64),.12)*act*1.25;
  rgb+=red*g*en*1.25+red*exp(-side*side/(2.*pow(5.*D,2.)))*en*.1;
  rgb+=vec3(1.,.8,.7)*g*g*en*.35;
  o=vec4(rgb,min(1.,locked*1.1+act*1.2));
}`,la=`#version 300 es
layout(location=0) in vec2 a_c;
layout(location=1) in vec4 a_n0; layout(location=2) in vec4 a_n1; layout(location=3) in vec4 a_n2; layout(location=4) in vec4 a_n3;
layout(location=5) in vec4 a_g0; layout(location=6) in vec4 a_g1; layout(location=7) in vec4 a_g2; layout(location=8) in vec4 a_g3;
uniform vec2 u_res; uniform vec3 u_cam;
out vec2 v_q; flat out vec4 v_n0; flat out vec4 v_n1; flat out vec4 v_n2; flat out vec4 v_n3;
flat out vec4 v_g0; flat out vec4 v_g1; flat out vec4 v_g2; flat out vec4 v_g3;
void main(){
  float r=a_n0.z*a_n3.y; vec2 c=a_n0.xy; c.y-=a_n1.z*a_n0.z*.09;
  vec2 w=c+a_c*r*3.6; vec2 s=(w-u_cam.xy)*u_cam.z;
  gl_Position=vec4(s.x/(u_res.x*.5),-s.y/(u_res.y*.5),0.,1.);
  v_q=a_c*3.6; v_n0=a_n0; v_n1=a_n1; v_n2=a_n2; v_n3=a_n3; v_g0=a_g0; v_g1=a_g1; v_g2=a_g2; v_g3=a_g3;
}`,da=`#version 300 es
precision highp float;
uniform float u_t; uniform vec3 u_cam;
in vec2 v_q; flat in vec4 v_n0; flat in vec4 v_n1; flat in vec4 v_n2; flat in vec4 v_n3;
flat in vec4 v_g0; flat in vec4 v_g1; flat in vec4 v_g2; flat in vec4 v_g3; out vec4 o;
const float TAU=6.2831853;
${qe}
float sdSeg(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/max(dot(ba,ba),1e-5),0.,1.);return length(pa-ba*h);}
void main(){
  vec2 q=v_q; float rpx=max(v_n0.z*v_n3.y*u_cam.z,1.); float aa=1.3/rpx;
  float seed=v_n0.w; float kind=v_n1.x, lit=v_n1.y, hov=v_n1.z, foc=v_n1.w;
  float avail=v_n2.y, pt=v_n2.z, sel=v_n2.w; float ring2=v_n3.x;
  float L=length(q), ang=atan(q.y,q.x);
  vec3 bone=vec3(.847,.824,.769), red=vec3(1.,.14,.12);
  float wob=.022*sin(ang*3.+seed*6.28)+.015*sin(ang*7.-seed*11.)+(vn(q*5.+seed*9.)-.5)*.035;
  float Lw=L-wob;
  vec3 rgb=vec3(0.); float al=0.;
  // 2.5D ink shadow (lifts on hover)
  float sh=length(q-vec2(.10,.17)*(1.+hov*.9)); al=(1.-smoothstep(.85,1.2,sh))*.55;
  // disc
  float disc=1.-smoothstep(1.-aa*1.5,1.+aa*.5,Lw);
  vec3 fillc=mix(vec3(.04,.036,.05),vec3(.34,.03,.04),lit)+red*.3*lit*pow(max(1.-L,0.),2.)+bone*.03*hov;
  fillc+=bone*.03*(1.-smoothstep(.0,.06,abs(fract(L*4.)-.5)-.44))*(kind>.5?1.:0.);
  rgb=fillc*disc+rgb*(1.-disc); al=disc+al*(1.-disc);
  // ring
  float t0=(kind>.5?.055:.07)*(1.+hov*.35+lit*.35);
  float rg=1.-smoothstep(t0-aa,t0+aa,abs(Lw-.96));
  vec3 rc=mix(bone*.85,bone*1.15,lit);
  rc=mix(rc,red*(.9+.3*sin(u_t*3.+seed*6.28)),avail*(1.-lit));
  rc+=bone*hov*.25;
  rgb=rc*rg+rgb*(1.-rg); al=rg+al*(1.-rg);
  // hub / origin decoration: outer thin ring + tick band
  if(kind>.5){
    float R2=kind>1.5?1.2:1.15; float dr=1.-smoothstep(.014-aa,.014+aa,abs(L-R2));
    float tk=step(.5,fract(ang/TAU*(kind>1.5?36.:24.)+u_t*(kind>1.5?.02:0.)))*(1.-smoothstep(.035-aa,.035+aa,abs(L-R2-.06)));
    vec3 dec=mix(bone*.3,mix(bone,red,.5),lit*.8); float dm=max(dr,tk*.85);
    rgb=dec*dm+rgb*(1.-dm); al=dm+al*(1.-dm);
    if(kind>1.5){ float r3=1.-smoothstep(.02-aa,.02+aa,abs(L-1.55)); float t3=step(.5,fract(ang/TAU*12.-u_t*.05)); float m3=r3*t3; rgb=red*.8*m3+rgb*(1.-m3); al=m3+al*(1.-m3);}
  }
  // glyph (procedural sigil seeded from id)
  vec2 gq=q/.64;
  float gd=min(min(sdSeg(gq,v_g0.xy,v_g0.zw),sdSeg(gq,v_g1.xy,v_g1.zw)),min(sdSeg(gq,v_g2.xy,v_g2.zw),sdSeg(gq,v_g3.xy,v_g3.zw)))*.64;
  float gw=(.052+.014*vn(q*7.+seed*5.))*(kind>.5?1.15:1.)*(1.+lit*.25);
  float gm=1.-smoothstep(gw-aa,gw+aa,gd+(vn(q*13.+seed*3.)-.5)*.018);
  if(ring2>.0) gm=max(gm,1.-smoothstep(.045-aa,.045+aa,abs(L-ring2)));
  gm*=disc;
  vec3 gc=mix(bone*(.85+.3*avail+.3*hov),mix(red,vec3(1.,.6,.5),.35),lit);
  rgb=gc*gm+rgb*(1.-gm); al=gm+al*(1.-gm);
  rgb+=red*exp(-gd*gd/.012)*lit*.5*disc;
  // unlock pulse: expanding shock ring + flash
  float t=pt;
  float pr=exp(-pow((L-(1.+t*1.25))/(.05+.05*t),2.))*exp(-t*2.1)*step(t,2.2);
  float fl=exp(-t*4.5)*(1.-smoothstep(.0,1.2,L))*step(t,2.2);
  rgb+=mix(red,vec3(1.),.35)*pr*1.3+bone*fl*.8;
  // hover halo
  rgb+=red*.22*hov*exp(-pow(max(L-1.,0.)*2.8,2.))*(1.-disc);
  // focus reticle (rotating arcs)
  float arc=step(.5,fract((ang+u_t*.8)/(TAU/4.)));
  float fr=(1.-smoothstep(.022-aa,.022+aa,abs(L-1.34)))*arc*foc;
  rgb=vec3(1.,.35,.3)*fr+rgb*(1.-fr); al=fr+al*(1.-fr);
  // selection ring with notches
  float sr=(1.-smoothstep(.02-aa,.02+aa,abs(L-1.56)))*sel;
  float nt=step(.5,fract(ang/TAU*40.))*(1.-smoothstep(.03-aa,.03+aa,abs(L-1.66)))*sel;
  float sm=max(sr,nt*.8);
  rgb=red*sm+rgb*(1.-sm); al=sm+al*(1.-sm);
  o=vec4(rgb,al);
}`,fa=`#version 300 es
layout(location=0) in vec2 a_p; layout(location=1) in vec3 a_s;
uniform vec2 u_res; uniform vec3 u_cam; uniform float u_dpr;
out float v_a; out float v_h;
void main(){
  vec2 s=(a_p-u_cam.xy)*u_cam.z; gl_Position=vec4(s.x/(u_res.x*.5),-s.y/(u_res.y*.5),0.,1.);
  gl_PointSize=a_s.x*u_dpr; v_a=a_s.y; v_h=a_s.z;
}`,pa=`#version 300 es
precision highp float;
in float v_a; in float v_h; out vec4 o;
void main(){
  vec2 c=gl_PointCoord*2.-1.; float d=dot(c,c); if(d>1.) discard;
  float a=exp(-d*3.2)*(1.-d)*v_a; vec3 col=mix(vec3(1.,.32,.28),vec3(.9,.87,.8),v_h);
  o=vec4(col*a*1.4,a*.5);
}`,ua=`#version 300 es
precision highp float;
uniform vec2 u_res; uniform vec3 u_cam; uniform float u_t; uniform vec4 u_cl[12]; uniform vec2 u_par;
out vec4 o;
${qe}
void main(){
  vec2 s=vec2(gl_FragCoord.x-.5*u_res.x,.5*u_res.y-gl_FragCoord.y);
  float z=u_cam.z; vec2 p=u_cam.xy+s/z; vec2 pf=p+u_par*1.4/z;
  float f=fbm(pf*.0032+vec2(u_t*.011,-u_t*.017)+fbm(pf*.0065-u_t*.02)*1.6);
  float hole=0.;
  for(int i=0;i<12;i++){ vec4 cl=u_cl[i]; float d=length(p-cl.xy)/cl.z; hole=max(hole,cl.w*(1.-smoothstep(.62,1.5,d+(f-.5)*.55))); if(i<11) hole=max(hole,.85*(1.-smoothstep(.12,.5,d+(f-.5)*.12))); }
  float dens=clamp(1.-hole,0.,1.)*(.5+.5*smoothstep(.25,.8,f));
  float edge=smoothstep(.0,.3,hole)*(1.-smoothstep(.3,.85,hole));
  vec3 col=mix(vec3(.004,.003,.008),vec3(.045,.02,.03),smoothstep(.35,.85,f));
  float a=clamp(dens,0.,1.)*.5;
  vec3 ember=vec3(.7,.11,.1)*edge*(.1+.16*f);
  o=vec4(col*a+ember,a);
}`;Xt("fe-codex").add("skillweb",`
  #fe .sw-host{position:relative;width:100%;height:calc(88vh - 150px);min-height:300px}
  #fe .sw{position:absolute;inset:0;overflow:hidden;background:#07070b;border:1px solid #d8d2c426;user-select:none;-webkit-user-select:none}
  #fe .sw canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
  #fe .sw .sw-lb{touch-action:none;cursor:grab} #fe .sw .sw-lb.drag{cursor:grabbing} #fe .sw .sw-lb.hit{cursor:pointer}
  #fe .sw .sw-hud{position:absolute;left:10px;top:10px;display:flex;gap:6px;align-items:center;font:11px system-ui;letter-spacing:.14em;color:#d8d2c4;text-transform:uppercase;pointer-events:none}
  #fe .sw .sw-hud>*{pointer-events:auto}
  #fe .sw .sw-pts{padding:5px 10px;background:#07070b;border:1px solid #d8d2c433;clip-path:polygon(5% 0,100% 0,95% 100%,0 100%)}
  #fe .sw .sw-pts b{font:15px 'Black Ops One',system-ui;color:#e04040;letter-spacing:.08em;margin-right:4px}
  #fe .sw button{font:11px system-ui;letter-spacing:.14em;color:#d8d2c4;background:#07070b;border:1px solid #d8d2c44d;padding:5px 10px;cursor:pointer;text-transform:uppercase}
  #fe .sw button:hover{border-color:#e04040;color:#fff;background:#e0404026}
  #fe .sw button:disabled{opacity:.35;cursor:default;border-color:#d8d2c433;background:#07070b;color:#d8d2c4}
  #fe .sw .sw-zoom{position:absolute;right:10px;top:10px;display:flex;gap:6px}
  #fe .sw .sw-hint{position:absolute;left:10px;bottom:8px;right:10px;font:10px/1.5 system-ui;letter-spacing:.12em;color:#d8d2c4;opacity:.5;text-transform:uppercase;pointer-events:none;text-shadow:0 1px 4px #000}
  #fe .sw .sw-hint b{color:#e04040;font-weight:normal}
  #fe .sw .sw-panel{position:absolute;top:44px;right:10px;bottom:30px;width:min(310px,40%);box-sizing:border-box;padding:14px 16px;overflow:auto;background:#0a0910;border:1px solid #d8d2c440;border-left:3px solid #e04040;
    font:13px/1.45 system-ui;color:#d8d2c4;transform:translateX(calc(100% + 24px));opacity:0;transition:transform .28s cubic-bezier(.2,.8,.2,1),opacity .2s;pointer-events:none;user-select:text;-webkit-user-select:text}
  #fe .sw.has-sel .sw-panel{transform:none;opacity:1;pointer-events:auto}
  #fe .sw .sp-head{display:flex;gap:12px;align-items:center;margin-bottom:8px}
  #fe .sw .sp-head canvas{position:static;width:64px;height:64px;flex:none;border:1px solid #d8d2c433;background:#050507}
  #fe .sw .sp-head h3{font:20px 'Black Ops One',system-ui;letter-spacing:.1em;margin:0;color:#fff;line-height:1.1}
  #fe .sw .sp-x{margin-left:auto;align-self:flex-start;padding:2px 8px}
  #fe .sw .chip{display:inline-block;font:10px system-ui;letter-spacing:.14em;text-transform:uppercase;padding:2px 7px;margin:4px 4px 0 0;border:1px solid #d8d2c44d;color:#d8d2c4}
  #fe .sw .chip.red{border-color:#e04040;color:#ff8a80}
  #fe .sw .sp-status{font:11px system-ui;letter-spacing:.2em;text-transform:uppercase;margin:6px 0 4px;color:#d8d2c4a0}
  #fe .sw .sp-status[data-s=unlocked]{color:#e04040} #fe .sw .sp-status[data-s=available]{color:#ff8a80}
  #fe .sw dl{margin:8px 0 12px} #fe .sw dt{opacity:.5;font-size:10px;letter-spacing:.18em;text-transform:uppercase;margin-top:9px}
  #fe .sw dd{margin:2px 0 0} #fe .sw dd.sfx{font-family:'Kaushan Script',cursive;font-size:14px;color:#e8c0b8}
  #fe .sw a{color:#e06060;cursor:pointer;border-bottom:1px dashed #e0606080;margin-right:8px;white-space:nowrap} #fe .sw a:hover{color:#fff}
  #fe .sw kbd{font:11px system-ui;border:1px solid #d8d2c466;padding:1px 7px;background:#ffffff0c}
  #fe .sw .pip{display:inline-block;width:9px;height:9px;margin-right:3px;transform:rotate(45deg) scale(.8);border:1px solid #e04040}
  #fe .sw .pip.f{background:#e04040}
  #fe .sw .sp-go{width:100%;padding:10px;font:14px 'Black Ops One',system-ui;letter-spacing:.2em;border-color:#e04040;background:#e0404026}
  #fe .sw .sp-note{font:11px system-ui;opacity:.6;margin-top:6px;letter-spacing:.06em}
  #fe .sw .sp-list a{display:block;margin:3px 0;border-bottom:none} #fe .sw .sp-list a i{font-style:normal;opacity:.55;font-size:10px;letter-spacing:.14em;text-transform:uppercase;margin-left:6px}
  @media (max-width:640px){#fe .sw .sw-panel{top:auto;left:10px;right:10px;width:auto;height:46%;bottom:30px;border-left:1px solid #d8d2c440;border-top:3px solid #e04040;transform:translateY(calc(100% + 40px))} #fe .sw .sw-hint{display:none}}
`);const it=700,Mt=new WeakMap;function ga(n){Mt.get(n)?.dispose();const r=aa(),{nodes:l,edges:M,clusters:w}=r,O=l.length,q=oa(),R=new Set(q.u.filter(e=>l.some(t=>t.id===e&&t.kind===X))),Q=l.map((e,t)=>t).filter(e=>l[e].kind===X),W=new Map(l.map((e,t)=>[e.id,t])),$={map:null};n.innerHTML=`<div class="sw"><canvas class="sw-gl"></canvas><canvas class="sw-lb"></canvas>
    <div class="sw-hud"><span class="sw-pts"></span></div>
    <div class="sw-zoom"><button data-act="zin">+</button><button data-act="zout">-</button><button data-act="fit">Fit</button></div>
    <aside class="sw-panel"></aside>
    <div class="sw-hint"><b>drag</b> pan · <b>wheel</b> zoom · <b>arrows</b> focus · <b>. ,</b> linked · <b>wasd</b> pan · <b>enter</b> select / unlock · <b>esc</b> close · <b>tab</b> codex tabs</div></div>`;const Y=n.querySelector(".sw"),U=Y.querySelector(".sw-gl"),T=Y.querySelector(".sw-lb"),re=Y.querySelector(".sw-panel"),le=Y.querySelector(".sw-pts"),f=T.getContext("2d"),ae=()=>_t+q.bonus-[...R].reduce((e,t)=>e+l[W.get(t)].cost,0),i=e=>{const t=wt.get(e)??[];return t.length===0||t.some(a=>R.has(a))},m=e=>{const t=l[e];return t.kind!==X?"hub":R.has(t.id)?"unlocked":i(t.id)?ae()>=t.cost?"available":"reachable":"locked"};let h=-1,p=-1,c=-1,z=-1;function D(){for(const e of Q){const t=m(e),a=l[e];a.litT=t==="unlocked"?1:0,a.reachT=t==="available"?1:t==="reachable"?.4:0}w.forEach((e,t)=>{if(t===P.length)return;const a=e.type,o=e.members.some(s=>R.has(l[s].id))||ue.some(s=>R.has(s.id)&&s.types.includes(a));e.revealT=o?1:ue.some(s=>R.has(s.id)&&s.chainsInto?.includes(a))?.8:e.members.some(s=>i(l[s].id))?.55:.13,l[e.hub].litT=e.revealT>=.99?1:e.revealT*.55,l[e.hub].reachT=0}),l[0].litT=1;for(const e of M){const t=l[e.a],a=l[e.b],o=w[t.cluster],s=w[a.cluster];e.kind===0?(e.enT=s.revealT>.5?.55:0,e.visT=.3+.7*s.revealT):e.kind===3?(e.enT=t.litT,e.visT=.3+.7*Math.max(o.revealT,s.revealT)):(e.enT=a.litT?1:a.reachT>=1?.7:a.reachT>0?.25:0,e.visT=.3+.7*o.revealT)}Dt(),c>=0&&Je()}const L=[];let F=0;function j(e){for(let t=0;t<90&&L.length<it;t++){const a=Math.random()*ke,o=90+Math.random()*380;L.push({x:e.x,y:e.y,vx:Math.cos(a)*o,vy:Math.sin(a)*o,l:0,m:.6+Math.random()*1.1,s:2+Math.random()*5,h:Math.random()<.35?1:0})}}function K(e){const t=l[e];if(t.kind!==X||m(e)!=="available")return F=Math.max(F,.25),!1;R.add(t.id),q.u=[...R],na(q),t.pulse=0,t.sv+=5.5,F=1,j(t),D();try{navigator.vibrate?.(14)}catch{}return!0}const d={x:0,y:0,z:.5},u={x:0,y:0,z:.5};let S=null,J=.5,B=0,H=0,Re=1,he=1,We=!1,ve=0,me=0;const Ye=()=>J*.5,Ke=()=>J*4,Lt=()=>B>640?Math.min(310,B*.4)+20:0;function Ve(e=!1){const t=r.x1-r.x0,a=r.y1-r.y0;J=Math.min(B/(t*1.04),H/(a*1.08)),u.x=(r.x0+r.x1)/2,u.y=(r.y0+r.y1)/2,u.z=J*.98,S=null,e&&(d.x=u.x,d.y=u.y,d.z=u.z)}function je(e,t=J*2.1){const a=l[e];u.z=ce(Math.max(u.z,t),Ye(),Ke()),S=null,u.x=a.x+(c>=0?Lt()/2/u.z:0),u.y=a.y}function ge(e,t,a,o){a=ce(a,Ye(),Ke());const s=d.x+e/d.z,v=d.y+t/d.z;o?(d.z=u.z=a,d.x=u.x=s-e/a,d.y=u.y=v-t/a,S=null):(S={sx:e,sy:t,wx:s,wy:v},u.z=a,u.x=s-e/a,u.y=v-t/a)}const Le=(e,t)=>[B/2+(e-d.x)*d.z,H/2+(t-d.y)*d.z];function He(e,t=!0){p!==e&&(z=p,p=e,e>=0&&t&&je(e))}function xe(e){c=e,Y.classList.toggle("has-sel",e>=0),e>=0&&(p=e,Je(),je(e,J*1.7))}function lt(e){if(c!==e){xe(e);return}l[e].kind===X&&K(e)}function Ne(e,t){if(p<0){Ge();return}const a=l[p];let o=-1,s=1e18;for(const v of[.55,.2]){for(let y=0;y<O;y++){if(y===p)continue;const b=l[y].x-a.x,E=l[y].y-a.y,C=Math.hypot(b,E)||1,x=(b*e+E*t)/C;if(x<v)continue;const g=C*(1.7-x)*(a.nbr.includes(y)?.45:1);g<s&&(s=g,o=y)}if(o>=0)break}o>=0&&(He(o),c>=0&&xe(o))}function Ge(){let e=-1,t=1e18;for(let a=0;a<O;a++){const o=Math.hypot(l[a].x-d.x,l[a].y-d.y);o<t&&(t=o,e=a)}He(e)}function dt(e){if(p<0){Ge();return}const t=l[p],a=[...t.nbr].sort((v,y)=>Math.atan2(l[v].y-t.y,l[v].x-t.x)-Math.atan2(l[y].y-t.y,l[y].x-t.x));if(!a.length)return;const o=a.indexOf(z),s=a[((o<0?e>0?-1:0:o)+e+a.length)%a.length];He(s),c>=0&&xe(s)}const V=new Map;let be=!1,$e=0,De=0,Xe=0;const Fe=e=>{const t=T.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}};function Ue(e,t){let a=-1,o=1e18;for(let s=0;s<O;s++){const[v,y]=Le(l[s].x,l[s].y),b=Math.max(l[s].r*d.z*l[s].sc*1.12,14),E=Math.hypot(v-e,y-t);E<b&&E/b<o&&(o=E/b,a=s)}return a}T.addEventListener("pointerdown",e=>{T.setPointerCapture(e.pointerId);const t=Fe(e);if(V.set(e.pointerId,t),$e=0,ve=me=0,be=!0,Xe=performance.now(),V.size===2){const[a,o]=[...V.values()];De=Math.hypot(a.x-o.x,a.y-o.y)}T.classList.add("drag"),S=null,e.stopPropagation()}),T.addEventListener("pointermove",e=>{const t=Fe(e),a=V.get(e.pointerId);if(ye.x=t.x,ye.y=t.y,a&&V.size===1&&be){const o=t.x-a.x,s=t.y-a.y;if($e+=Math.abs(o)+Math.abs(s),$e>5){d.x-=o/d.z,d.y-=s/d.z,u.x=d.x,u.y=d.y,u.z=d.z;const v=performance.now(),y=Math.max(1,v-Xe)/1e3;ve=Ie(ve,-o/d.z/y,.5),me=Ie(me,-s/d.z/y,.5),Xe=v}V.set(e.pointerId,t)}else if(a&&V.size===2){V.set(e.pointerId,t);const[o,s]=[...V.values()],v=Math.hypot(o.x-s.x,o.y-s.y);$e+=10,De>0&&ge((o.x+s.x)/2-B/2,(o.y+s.y)/2-H/2,d.z*v/De,!0),De=v}else if(!be||!a){const o=Ue(t.x,t.y);h=o,T.classList.toggle("hit",o>=0)}});const ft=e=>{const t=Fe(e);if(V.delete(e.pointerId),De=0,V.size||(be=!1,T.classList.remove("drag")),e.type==="pointerup"&&$e<=5&&V.size===0){const a=Ue(t.x,t.y);a>=0?(p=a,lt(a)):c>=0&&xe(-1),ve=me=0}};T.addEventListener("pointerup",ft),T.addEventListener("pointercancel",ft),T.addEventListener("pointerleave",()=>{be||(h=-1,T.classList.remove("hit"))}),T.addEventListener("dblclick",e=>{const t=Fe(e),a=Ue(t.x,t.y);a>=0?(p=a,je(a,J*3.4)):ge(t.x-B/2,t.y-H/2,u.z*1.9,!1)}),T.addEventListener("wheel",e=>{e.preventDefault(),e.stopPropagation();const t=Fe(e),a=e.deltaMode===1?e.deltaY*16:e.deltaMode===2?e.deltaY*400:e.deltaY;ge(t.x-B/2,t.y-H/2,u.z*Math.exp(-ce(a,-240,240)*.0017),!1)},{passive:!1});const ye={x:0,y:0},Ae={x:0,y:0},de=new Set,pt=new WeakSet,$t=()=>n.isConnected&&n.clientWidth>0&&n.clientHeight>0;function Qe(e){if(pt.has(e))return!0;if(!$t()||e.altKey||e.metaKey)return!1;const t=e.target;if(t&&/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))return!1;const a=Jt(Gt(e));if(!a)return!1;let o=!0;switch(a){case"up":Ne(0,-1);break;case"down":Ne(0,1);break;case"left":Ne(-1,0);break;case"right":Ne(1,0);break;case"linkNext":dt(1);break;case"linkPrev":dt(-1);break;case"panUp":case"panDown":case"panLeft":case"panRight":de.add(a),S=null;break;case"zoomIn":ge(0,0,u.z*1.35,!1);break;case"zoomOut":ge(0,0,u.z/1.35,!1);break;case"fit":Ve();break;case"activate":p<0?Ge():lt(p);break;case"close":c>=0?xe(-1):o=!1;break}return o&&(e.preventDefault(),e.stopPropagation(),pt.add(e)),o}const ut=e=>{for(const t of Qt)ct[t].some(a=>a.endsWith(e.code))&&de.delete(t)},ht=()=>de.clear();addEventListener("keydown",Qe,!0),addEventListener("keyup",ut,!0),addEventListener("blur",ht);function Dt(){const e=ae();le.innerHTML=`<b>${e}</b>ash <span style="opacity:.5">/ ${_t+q.bonus}</span>`}const Ft=(e,t=!1)=>Array.from({length:e},()=>`<span class="pip${t?" f":""}"></span>`).join(""),Pt=(e,t=!1)=>`<span class="chip${t?" red":""}">${Ee[e]}</span>`,Ot=e=>`<a data-act="goto" data-i="${e}">${pe(l[e].name)}</a>`,Bt={unlocked:"Unlocked",available:"Ready to unlock",reachable:"Reachable - not enough ash",locked:"Locked - chain into it first",hub:"Type"};function Je(){if(c<0)return;const e=l[c],t=m(c);let a="";if(a+=`<div class="sp-head"><canvas width="128" height="128"></canvas><div><h3>${pe(e.name)}</h3>`,e.skill?a+=e.skill.types.map((o,s)=>Pt(o,s===0)).join(""):e.type?a+='<span class="chip red">type</span>':a+='<span class="chip red">origin</span>',a+='</div><button class="sp-x" data-act="close">x</button></div>',e.skill){const o=e.skill,s=wt.get(o.id)??[];a+=`<div class="sp-status" data-s="${t}">${Bt[t]}</div><dl>`,a+=`<dt>Cost</dt><dd>${Ft(e.cost,t==="unlocked")} ${e.cost} ash</dd>`,a+=`<dt>Context</dt><dd>${o.context.join(" · ")}${o.binding?` &nbsp; <kbd>${kt(o.binding)}</kbd>`:""}</dd>`,o.cost?.cooldown&&(a+=`<dt>Cooldown</dt><dd>${o.cost.cooldown}s</dd>`),o.requires?.length&&(a+=`<dt>Requires</dt><dd>${o.requires.map(sa).join("<br>")}</dd>`),a+=`<dt>Effects</dt>${o.effects.map(b=>`<dd class="sfx">${pe(Rt(b))}</dd>`).join("")}`;const v=(o.chainsInto??[]).map(b=>`<a data-act="goto" data-i="${1+P.indexOf(b)}">${Ee[b]}</a>`).join("");a+=`<dt>Chains into</dt><dd>${v||"-"}</dd>`,a+=`<dt>Reached from</dt><dd>${s.length?s.map(b=>Ot(W.get(b))).join(""):"Root - always reachable"}</dd></dl>`;const y=t==="unlocked"?"UNLOCKED":`UNLOCK · ${e.cost} ASH`;a+=`<button class="sp-go" data-act="unlock" ${t==="available"?"":"disabled"}>${y}</button>`,a+=`<div class="sp-note">${t==="available"?"Enter or click again also unlocks. (stub budget)":t==="reachable"?`Need ${e.cost-ae()} more ash. Press G for a dev grant.`:t==="locked"?"Unlock a skill that chains into one of its types.":"Stub state, stored locally."}</div>`}else if(e.type){const o=$.map?.[e.type],s=w[e.cluster],v=s.members,y=ue.filter(b=>b.types.includes(e.type)&&b.types[0]!==e.type);a+=`<div class="sp-status">${Math.round(s.revealT*100)>90?"Awake":s.revealT>.5?"Stirring":"Shrouded"}</div><dl>`,o&&(a+=`<dt>Feels</dt><dd class="sfx">${pe(o.feels)}</dd><dt>What it does</dt><dd>${pe(o.purpose)}</dd><dt>When</dt><dd>${pe(o.when)}</dd><dt>Chains into</dt><dd>${pe(o.links)}</dd>`),a+=`<dt>Skills</dt><dd class="sp-list">${v.concat(y.map(b=>W.get(b.id))).map(b=>`<a data-act="goto" data-i="${b}">${pe(l[b].name)}<i>${m(b)}</i></a>`).join("")||"None yet."}</dd></dl>`}else a+=`<div class="sp-status">Origin</div><dl><dt>Ash</dt><dd>Every chain starts here. ${R.size} of ${Q.length} skills unlocked.</dd><dt>Types</dt><dd class="sp-list">${P.map((o,s)=>`<a data-act="goto" data-i="${s+1}">${Ee[o]}</a>`).join("")}</dd></dl>`;re.innerHTML=a,It(re.querySelector("canvas"),e)}function It(e,t){const a=e.getContext("2d"),o=e.width;a.clearRect(0,0,o,o),a.lineCap="round",a.lineWidth=5,a.strokeStyle="#d8d2c444",a.beginPath(),a.arc(o/2,o/2,o*.44,0,ke),a.stroke(),a.strokeStyle=m(l.indexOf(t))==="unlocked"||t.kind!==X?"#e04040":"#d8d2c4",a.lineWidth=5.5,a.beginPath();for(let s=0;s<4;s++){const v=t.glyph;a.moveTo(o/2+v[s*4]*o*.3,o/2+v[s*4+1]*o*.3),a.lineTo(o/2+v[s*4+2]*o*.3,o/2+v[s*4+3]*o*.3)}a.stroke(),t.ring2>0&&(a.beginPath(),a.arc(o/2,o/2,t.ring2*o*.3,0,ke),a.stroke())}Y.addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(t)switch(e.stopPropagation(),t.dataset.act){case"unlock":c>=0&&K(c);break;case"close":xe(-1);break;case"goto":{const a=Number(t.dataset.i);p=a,xe(a);break}case"grant":break;case"reset":break;case"zin":ge(0,0,u.z*1.4,!1);break;case"zout":ge(0,0,u.z/1.4,!1);break;case"fit":Ve();break}}),Ht(()=>import("./codex-HJyaWOst.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(e=>{$.map=e.TYPE_CODEX,c>=0&&Je()}).catch(()=>{});let _e=null;const vt=M.length;let Ze=()=>{};try{if(_e=U.getContext("webgl2",{alpha:!1,antialias:!1,premultipliedAlpha:!0,powerPreference:"default"}),!_e)throw new Error("no webgl2");const e=_e,t=(A,ne)=>{const Z=(te,se)=>{const N=e.createShader(te);if(e.shaderSource(N,se),e.compileShader(N),!e.getShaderParameter(N,e.COMPILE_STATUS))throw new Error(e.getShaderInfoLog(N)??"shader");return N},ee=e.createProgram();if(e.attachShader(ee,Z(e.VERTEX_SHADER,A)),e.attachShader(ee,Z(e.FRAGMENT_SHADER,ne)),e.linkProgram(ee),!e.getProgramParameter(ee,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(ee)??"link");const I=new Map;return{p:ee,u:te=>(I.has(te)||I.set(te,e.getUniformLocation(ee,te)),I.get(te))}},a=t(At,ra),o=t(At,ua),s=t(ia,ca(vt)),v=t(la,da),y=t(fa,pa),b=[],E=[];M.forEach((A,ne)=>{const Z=A.pts.length/2,ee=b.length/7;for(let I=0;I<Z;I++){const te=Math.max(0,I-1),se=Math.min(Z-1,I+1);let N=A.pts[se*2]-A.pts[te*2],ze=A.pts[se*2+1]-A.pts[te*2+1];const k=Math.hypot(N,ze)||1;N/=k,ze/=k;for(const _ of[-1,1])b.push(A.pts[I*2],A.pts[I*2+1],-ze,N,_,A.u[I],ne);if(I<Z-1){const _=ee+I*2;E.push(_,_+1,_+2,_+1,_+3,_+2)}}});const C=e.createVertexArray();e.bindVertexArray(C),e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array(b),e.STATIC_DRAW),[[2,0],[2,2],[1,4],[1,5],[1,6]].forEach(([A,ne],Z)=>{e.enableVertexAttribArray(Z),e.vertexAttribPointer(Z,A,e.FLOAT,!1,28,ne*4)}),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(E),e.STATIC_DRAW);const x=32,g=new Float32Array(O*x),G=e.createVertexArray();e.bindVertexArray(G),e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const Oe=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,Oe),e.bufferData(e.ARRAY_BUFFER,g.byteLength,e.DYNAMIC_DRAW);for(let A=0;A<8;A++)e.enableVertexAttribArray(1+A),e.vertexAttribPointer(1+A,4,e.FLOAT,!1,x*4,A*16),e.vertexAttribDivisor(1+A,1);const oe=new Float32Array(it*5),we=e.createVertexArray();e.bindVertexArray(we);const fe=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,fe),e.bufferData(e.ARRAY_BUFFER,oe.byteLength,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,20,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,3,e.FLOAT,!1,20,8);const ie=e.createVertexArray(),st=new Float32Array(48),Be=new Float32Array(vt*4);M.forEach((A,ne)=>{Be[ne*4+2]=A.kind,Be[ne*4+3]=A.seed}),Ze=A=>{const ne=d.z*Re,Z=(Math.random()-.5)*F*7/d.z,ee=(Math.random()-.5)*F*7/d.z,I=d.x+Z,te=d.y+ee;w.forEach((k,_)=>{st.set([k.x,k.y,k.rad,k.reveal],_*4)});for(let k=0;k<O;k++){const _=l[k],Vt=k*x,jt=w[_.cluster];g.set([_.x,_.y,_.r,_.seed,_.kind,_.lit,_.hov,_.foc,jt.reveal,_.reach,_.pulse,_.sel,_.ring2,_.sc,0,0,..._.glyph.slice(0,16)],Vt)}M.forEach((k,_)=>{Be[_*4]=k.en,Be[_*4+1]=k.vis});let se=0;for(const k of L){const _=k.l/k.m;oe.set([k.x,k.y,k.s*(1-_*.4),(1-_)*(1-_),k.h],se*5),se++}e.viewport(0,0,U.width,U.height),e.disable(e.BLEND);const N=k=>{e.useProgram(k.p),e.uniform2f(k.u("u_res"),U.width,U.height),e.uniform3f(k.u("u_cam"),I,te,ne),e.uniform1f(k.u("u_t"),A),e.uniform1f(k.u("u_dpr"),Re)},ze=k=>e.uniform2f(k.u("u_par"),Ae.x*Re,Ae.y*Re);e.bindVertexArray(ie),N(a),ze(a),e.uniform4fv(a.u("u_cl"),st),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),N(s),e.uniform4fv(s.u("u_en"),Be),e.bindVertexArray(C),e.drawElements(e.TRIANGLES,E.length,e.UNSIGNED_SHORT,0),N(v),e.bindVertexArray(G),e.bindBuffer(e.ARRAY_BUFFER,Oe),e.bufferSubData(e.ARRAY_BUFFER,0,g),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,O),e.bindVertexArray(ie),N(o),ze(o),e.uniform4fv(o.u("u_cl"),st),e.drawArrays(e.TRIANGLES,0,3),se&&(N(y),e.bindVertexArray(we),e.bindBuffer(e.ARRAY_BUFFER,fe),e.bufferSubData(e.ARRAY_BUFFER,0,oe,0,se*5),e.drawArrays(e.POINTS,0,se))},U.addEventListener("webglcontextlost",A=>{A.preventDefault(),_e=null,Ze=()=>{}})}catch(e){console.warn("[skillWeb] WebGL2 unavailable, falling back to canvas 2D:",e),_e=null,U.style.display="none"}function Nt(){f.fillStyle="#07070b",f.fillRect(0,0,B,H),f.lineCap="round";for(const e of M){f.strokeStyle=e.en>.05?`rgba(224,64,64,${.3+.6*e.en})`:"rgba(216,210,196,.25)",f.lineWidth=e.kind===3?2:1.2,f.setLineDash(e.en>.05?[]:[5,6]),f.beginPath();for(let t=0;t<e.pts.length;t+=2){const[a,o]=Le(e.pts[t],e.pts[t+1]);t?f.lineTo(a,o):f.moveTo(a,o)}f.stroke()}f.setLineDash([]);for(const e of l){const[t,a]=Le(e.x,e.y),o=e.r*d.z*e.sc,s=w[e.cluster].reveal;f.globalAlpha=.2+.8*s,f.fillStyle="#0b0a10",f.strokeStyle=e.lit>.5?"#d8d2c4":e.reach>.5?"#e04040":"#d8d2c455",f.lineWidth=2,f.beginPath(),f.arc(t,a,o,0,ke),f.fill(),f.stroke(),f.strokeStyle=e.lit>.5?"#e04040":"#d8d2c4aa",f.beginPath();for(let v=0;v<4;v++)f.moveTo(t+e.glyph[v*4]*o*.6,a+e.glyph[v*4+1]*o*.6),f.lineTo(t+e.glyph[v*4+2]*o*.6,a+e.glyph[v*4+3]*o*.6);f.stroke(),f.globalAlpha=1}}const et="'Black Ops One',system-ui",Ut="'Kaushan Script',cursive";function Me(e,t,a,o,s,v,y="0em"){v<.02||(t=Math.round(t*he)/he,a=Math.round(a*he)/he,f.globalAlpha=v,f.font=o.replace(/(\d+(?:\.\d+)?)px/,(b,E)=>`${Math.round(+E)}px`),f.letterSpacing=y,f.lineWidth=4,f.strokeStyle="rgba(5,5,8,.92)",f.lineJoin="round",f.strokeText(e,t,a),f.fillStyle=s,f.fillText(e,t,a),f.globalAlpha=1)}function Ct(){_e?f.clearRect(0,0,B,H):Nt(),f.setTransform(he,0,0,he,0,0),f.textAlign="center",f.textBaseline="alphabetic";const e=d.z/J,t=1-Se(1.25,2.3,e),a=Se(1.1,1.6,e);if(t>.02)for(let o=0;o<P.length;o++){const s=w[o],[v,y]=Le(s.x,s.y-s.rad*.62);Me(Ee[P[o]].toUpperCase(),v,y,`${Math.round(ce(s.rad*d.z*.2,10,46))}px ${et}`,"#d8d2c4",.09*t*(.3+.7*s.reveal),".3em")}for(let o=0;o<O;o++){const s=l[o],v=w[s.cluster],[y,b]=Le(s.x,s.y),E=s.r*d.z*s.sc,C=.3+.7*v.reveal;if(!(y<-200||b<-100||y>B+200||b>H+100))if(s.kind===zt){const x=Ie(13,17,Se(1,2.6,e)),g=v.members.length?`${v.members.filter(G=>R.has(l[G].id)).length}/${v.members.length}`:"no skills";Me(s.name.toUpperCase(),y,b+E*1.5+x,`${x}px ${et}`,v.reveal>.9?"#f2ece0":"#d8d2c4",C,".14em"),Me(g,y,b+E*1.5+x+14,"10px system-ui","#e04040",C*(1-Se(1.8,3.2,e))*.9,".18em")}else if(s.kind===St)Me("ASH",y,b+E*1.75+14,`${Ie(20,14,Se(1,2.6,e))}px ${et}`,"#f2ece0",.9,".3em");else{const x=Math.max(s.hov,s.foc,s.sel),g=Math.max(a,x)*C;if(g>.02){const G=ce(14*Math.sqrt(e),12,20),Oe=b+E*1.5+G;Me(s.name,y,Oe,`${G}px ${Ut}`,s.lit>.5?"#ffd6c8":"#d8d2c4",g),f.globalAlpha=g*.95;const oe=11,we=y-s.cost*oe/2+oe/2,fe=Oe+11;for(let ie=0;ie<s.cost;ie++)f.beginPath(),f.moveTo(we+ie*oe,fe-4),f.lineTo(we+ie*oe+4,fe),f.lineTo(we+ie*oe,fe+4),f.lineTo(we+ie*oe-4,fe),f.closePath(),f.strokeStyle="#e04040",f.lineWidth=1.2,f.stroke(),s.lit>.5&&(f.fillStyle="#e04040",f.fill());f.globalAlpha=1,s.skill?.binding&&(e>2.3||x>.5)&&Me(kt(s.skill.binding),y,fe+17,"10px system-ui","#d8d2c4",g*.75*Math.max(Se(2.3,3,e),x),".2em")}}}}let Te=0,tt=0,qt=performance.now(),Ce=!1;const Wt=()=>{for(const e of Q){const t=l[e];if(t.lit<.8||L.length>it-120||Math.random()>.035)continue;const a=Math.random()*ke,o=t.r*(.6+Math.random()*.5);L.push({x:t.x+Math.cos(a)*o,y:t.y+Math.sin(a)*o,vx:(Math.random()-.5)*8,vy:-14-Math.random()*22,l:0,m:2.2+Math.random()*1.5,s:1.6+Math.random()*2,h:Math.random()<.2?1:0})}};function Yt(e,t){const a=760/d.z;if(de.size){const x=(de.has("panRight")?1:0)-(de.has("panLeft")?1:0),g=(de.has("panDown")?1:0)-(de.has("panUp")?1:0);u.x+=x*a*e,u.y+=g*a*e}if(!be&&Math.abs(ve)+Math.abs(me)>4){u.x+=ve*e,u.y+=me*e,d.x=u.x,d.y=u.y;const x=Math.exp(-e*6);ve*=x,me*=x}const o=(r.x1-r.x0)*.6,s=(r.y1-r.y0)*.6,v=(r.x0+r.x1)/2,y=(r.y0+r.y1)/2;u.x=ce(u.x,v-o,v+o),u.y=ce(u.y,y-s,y+s);const b=1-Math.exp(-e*9);d.z=Math.exp(Ie(Math.log(d.z),Math.log(u.z),b)),S?(d.x=S.wx-S.sx/d.z,d.y=S.wy-S.sy/d.z,Math.abs(Math.log(d.z/u.z))<.002&&(d.z=u.z,d.x=u.x,d.y=u.y,S=null)):(d.x+=(u.x-d.x)*b,d.y+=(u.y-d.y)*b),Ae.x+=((ye.x-B/2)*.035-Ae.x)*Math.min(1,e*3),Ae.y+=((ye.y-H/2)*.035-Ae.y)*Math.min(1,e*3);const E=Math.min(1,e*7),C=Math.min(1,e*1.6);for(let x=0;x<O;x++){const g=l[x];g.hov+=((x===h?1:0)-g.hov)*E,g.foc+=((x===p?1:0)-g.foc)*E,g.sel+=((x===c?1:0)-g.sel)*E,g.lit+=(g.litT-g.lit)*(g.pulse<.6?Math.min(1,e*14):C),g.reach+=(g.reachT-g.reach)*E,g.pulse<50&&(g.pulse+=e);const G=1+g.hov*.07+g.sel*.05;g.sv+=((G-g.sc)*190-g.sv*12)*e,g.sc+=g.sv*e}for(const x of M)x.en+=(x.enT-x.en)*C*1.4,x.vis+=(x.visT-x.vis)*C;for(const x of w)x.reveal+=(x.revealT-x.reveal)*C;F=Math.max(0,F-e*3.2);for(let x=L.length-1;x>=0;x--){const g=L[x];if(g.l+=e,g.l>=g.m){L.splice(x,1);continue}const G=Math.exp(-e*2.4);g.vx*=G,g.vy*=G,g.x+=g.vx*e,g.y+=g.vy*e}Wt()}function mt(e){if(Ce)return;if(!n.isConnected){nt();return}Te=requestAnimationFrame(mt);const t=Math.min(.05,(e-tt)/1e3||.016);if(tt=e,!B)return;const a=(e-qt)/1e3;if(Yt(t),Ze(a),Ct(),!be&&V.size===0&&ye.x){const o=Ue(ye.x,ye.y);o!==h&&!("ontouchstart"in window)&&(h=o,T.classList.toggle("hit",o>=0))}}const Kt=()=>{!Te&&!Ce&&(tt=performance.now(),Te=requestAnimationFrame(mt))},gt=()=>{Te&&(cancelAnimationFrame(Te),Te=0)};function at(){const e=n.clientWidth,t=n.clientHeight;if(!e||!t){B=H=0,gt();return}const a=We?d.z/J:.98;B=e,H=t;let o=Math.max(1,devicePixelRatio||1);for(;e*t*o*o>16e6&&o>1;)o=Math.max(1,o-.25);const s=Pe?Pe.w:Math.round(e*o),v=Pe?Pe.h:Math.round(t*o);if(Re=he=s/e,U.width=T.width=s,U.height=T.height=v,!We)Ve(!0),We=!0;else{const y=r.x1-r.x0,b=r.y1-r.y0;J=Math.min(B/(y*1.04),H/(b*1.08)),d.z=u.z=ce(a*J,Ye(),Ke())}Kt()}let Pe=null;const ot=new ResizeObserver(e=>{if(!n.isConnected){nt();return}const t=e[e.length-1]?.devicePixelContentBoxSize?.[0];Pe=t&&t.inlineSize*t.blockSize<=16e6?{w:t.inlineSize,h:t.blockSize}:null,at()});try{ot.observe(n,{box:"device-pixel-content-box"})}catch{ot.observe(n)}function nt(){if(!Ce){Ce=!0,gt(),ot.disconnect(),removeEventListener("keydown",Qe,!0),removeEventListener("keyup",ut,!0),removeEventListener("blur",ht);try{_e?.getExtension("WEBGL_lose_context")?.loseContext()}catch{}Y.remove()}}D();for(const e of l)e.lit=e.litT,e.reach=e.reachT;for(const e of w)e.reveal=e.revealT;for(const e of M)e.en=e.enT,e.vis=e.visT;at();const xt={dispose:nt,resize:at,key:Qe};return Mt.set(n,xt),xt}export{ct as WEB_BINDINGS,ga as mountSkillWeb};
