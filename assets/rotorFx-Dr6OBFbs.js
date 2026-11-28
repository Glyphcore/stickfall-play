import{Group as B,Vector3 as X,ShaderMaterial as S,Color as v,DoubleSide as W,AdditiveBlending as y,Mesh as D,PlaneGeometry as Z,BufferGeometry as I,BufferAttribute as G,Points as j,DynamicDrawUsage as H,Vector2 as N,CircleGeometry as J,Vector4 as R,UniformsUtils as Q,Float32BufferAttribute as F,RingGeometry as tt,MeshBasicMaterial as et}from"./three-DdJfuIKW.js";const at={cap:3,kinds:{slice:{life:5,fade:.8,color:"#a04bff",label:"swept slice"},field:{life:5,fade:.8,color:"#4fd8ff",label:"spent field"},ward:{life:5,fade:.8,color:"#ffd45a",label:"broken ward"}}};class Dt{constructor(e=at){this.cat=e}list=[];nextId=1;clock=0;ended=[];onEnd;stats={spawned:0,timeout:0,evicted:0,consumed:0,cleared:0};get groups(){return this.list}get size(){return this.list.length}kind(e){return this.cat.kinds[e]??this.cat.kinds.slice}spawn(e){const t={id:this.nextId++,kind:e.kind,owner:e.owner,x:e.x,y:e.y,z:e.z,yaw:e.yaw,a0:e.a0,sweep:e.sweep??0,reach:e.reach,halfWidth:e.halfWidth,planeY:e.planeY,color:e.color??this.kind(e.kind).color,age:0,growing:!0,tags:e.tags??[],born:this.clock};for(this.list.push(t),this.stats.spawned++;this.list.length>Math.max(1,this.cat.cap);)this.end(this.list[0],"evicted");return t}grow(e,t){e.growing&&this.list.includes(e)&&(e.sweep=Math.max(e.sweep,t))}finish(e){e.growing=!1}tick(e){this.clock+=e;for(const t of this.list.slice())t.growing||(t.age+=e,t.age>=this.kind(t.kind).life&&this.end(t,"timeout"))}life(e){return e.growing?1:Math.max(0,1-e.age/this.kind(e.kind).life)}consume(e,t=1,a={}){const i=[];for(const s of this.list.slice()){if(i.length>=t)break;s.growing||!e.includes(s.kind)||a.tag&&!s.tags.includes(a.tag)||(this.end(s,"consumed"),i.push({group:s,globs:st(s)}))}return i}available(e,t){return this.list.filter(a=>!a.growing&&e.includes(a.kind)&&(!t||a.tags.includes(t))).length}clear(){for(const e of this.list.slice())this.end(e,"cleared")}drain(){const e=this.ended;return this.ended=[],e}end(e,t){const a=this.list.indexOf(e);a<0||(this.list.splice(a,1),this.stats[t]++,this.ended.push({g:e,why:t}),this.ended.length>64&&this.ended.shift(),this.onEnd?.(e,t))}}function st(l,e=12){const t=Math.PI/180,a=[],i=Math.max(1,Math.round(e*Math.abs(l.sweep)/360));for(let s=0;s<i;s++){const o=l.a0-l.sweep*(i===1?.5:s/(i-1)),n=l.reach*(.45+.4*(s*.618%1)),h=l.yaw+o*t;a.push({x:l.x+Math.sin(h)*n,y:l.y+l.planeY,z:l.z+Math.cos(h)*n,size:.35+.25*(s*.37%1),color:l.color,kind:l.kind,from:l.id})}return a}const V=`
float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(h21(i), h21(i+vec2(1,0)), f.x), mix(h21(i+vec2(0,1)), h21(i+vec2(1,1)), f.x), f.y); }
`,it=.3,ot=1.9,nt=`
uniform float uSize; varying vec2 vP;
void main(){ vP = position.xy; vec4 mv = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0); mv.xy += position.xy * uSize; gl_Position = projectionMatrix * mv; }`,rt=`
uniform float uTime; uniform float uBuild; uniform float uK; uniform float uSeed; uniform float uSize; uniform float uMass; uniform float uGap; uniform float uSpeed;
uniform vec3 uColor; uniform vec3 uAccent;
varying vec2 vP;
${V}
void main(){
  float rho = length(vP); if (rho >= 1.0) discard;
  float ang = atan(vP.y, vP.x);
  float b = smoothstep(0.0, 1.0, uBuild);
  // the amorphous boundary of the mass: a moving noise on the angle
  float lump = vn(vec2(ang * 1.3 + uTime * 0.9, uSeed)) + 0.5 * vn(vec2(ang * 3.4 - uTime * 1.4, uSeed + 5.0)) - 0.75;
  float edge = uMass * (1.0 + lump * (1.3 - 0.5 * b));
  float s = rho * uSize;                                              // metres out from the centre
  // the beam's arcs (BEAM_FS), contracting inward: soft tail behind a thin bright leading edge
  float cyc = (s + uTime * uSpeed) / uGap + uSeed * 0.37; float ph = fract(cyc);
  float lead = smoothstep(0.0, 0.04, ph) * pow(1.0 - ph, 2.2);
  float rim = smoothstep(0.0, 0.015, ph) * smoothstep(0.1, 0.02, ph);
  float n = vn(vec2(s * 7.0 + uTime * 9.0, ang * 2.0 + uSeed));
  float halo = smoothstep(edge * 2.2, edge, rho);                     // the arcs reach a little past the mass
  float torn = smoothstep(0.30, 0.62, vn(vec2(ang * 1.7 + floor(cyc) * 3.1, uSeed + floor(cyc) * 1.7 + uTime * 0.6))); // each arc is a torn crescent, not a full ring
  float arcs = (lead + rim * 1.5) * (0.6 + 0.4 * n) * halo * mix(1.0, torn, 0.85);
  float core = smoothstep(edge * 0.8, 0.0, rho);                      // stands in for the beam's spine
  float fill = smoothstep(edge * 1.15, edge * 0.6, rho) * 0.10;
  // manifesting from the ether: dissolved against a moving noise field whose level sinks as it builds (flecks -> torn arcs -> mass)
  float d = 0.6 * vn(vP * 4.0 + vec2(uTime * 0.7, -uTime * 0.5) + uSeed) + 0.4 * vn(vP * 9.0 - vec2(uTime * 1.1, uTime * 0.6));
  float thr = mix(0.66, 0.22, b);
  float m = smoothstep(thr, thr + 0.12, d);
  float al = (core * 0.5 * b + arcs + fill) * m * uK;
  vec3 col = mix(uColor, uAccent, clamp(core * 0.8 + rim * halo, 0.0, 1.0));
  gl_FragColor = vec4(col * (0.8 + 0.9 * core * b + 0.9 * rim * halo), clamp(al, 0.0, 1.0));
}`,_=60;class Y{group=new B;mesh;mat;wisps;wPos=new Float32Array(_*3);wA=new Float32Array(_);wMat;seed=[];t=0;k=0;m=1;last=new X;constructor(){this.group.name="rotorGlob",this.group.visible=!1,this.mat=new S({vertexShader:nt,fragmentShader:rt,transparent:!0,depthWrite:!1,blending:y,side:W,uniforms:{uTime:{value:0},uBuild:{value:0},uK:{value:0},uSeed:{value:5},uSize:{value:.8},uMass:{value:.45},uGap:{value:it},uSpeed:{value:ot},uColor:{value:new v("#a04bff")},uAccent:{value:new v("#e9d4ff")}}}),this.mesh=new D(new Z(2,2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=6;for(let t=0;t<_;t++){const a=i=>{const s=Math.sin(t*127.1+i*311.7)*43758.5453;return s-Math.floor(s)};this.seed.push({az:a(1)*Math.PI*2,el:(a(2)-.5)*2.2,ph:a(3),sp:.7+a(4)*.7,r:.7+a(5)*.6})}const e=new I;e.setAttribute("position",new G(this.wPos,3)),e.setAttribute("aA",new G(this.wA,1)),this.wMat=new S({vertexShader:"attribute float aA; uniform float uSize; varying float vA; void main(){ vA = aA; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = uSize * (0.4 + aA) * (260.0 / -mv.z); gl_Position = projectionMatrix * mv; }",fragmentShader:"uniform vec3 uColor; uniform vec3 uAccent; varying float vA; void main(){ float r = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, r); gl_FragColor = vec4(mix(uColor, uAccent, a * a), a * vA); }",transparent:!0,depthWrite:!1,blending:y,uniforms:{uSize:{value:.3},uColor:{value:new v("#a04bff")},uAccent:{value:new v("#e9d4ff")}}}),this.wisps=new j(e,this.wMat),this.wisps.frustumCulled=!1,this.wisps.renderOrder=6,this.group.add(this.mesh,this.wisps)}update(e,t,a,i,s,o,n=1){this.t+=e;const h=t?1:0;if(this.k+=(h-this.k)*Math.min(1,e*(t?14:9)),this.m+=(n-this.m)*Math.min(1,e*12),t&&this.last.set(t.x,t.y,t.z),this.group.visible=this.k>.01,!this.group.visible)return;const u=Math.min(1,Math.max(0,a)),c=u*u*(3-2*u),d=this.mat.uniforms,r=(.36-.12*c)*(1+.04*Math.sin(this.t*9));d.uTime.value=this.t,d.uBuild.value=u,d.uK.value=this.k*this.m,d.uMass.value=r/d.uSize.value,d.uColor.value.copy(s),d.uAccent.value.copy(o),this.mesh.visible=this.m>.01,this.wMat.uniforms.uColor.value.copy(s),this.wMat.uniforms.uAccent.value.copy(o),this.mesh.position.copy(this.last);const f=.35+.9*u+.8*i,g=1+.8*i,p=Math.floor(_*Math.min(1,.5+.5*u+.5*i));for(let m=0;m<_;m++){const w=this.seed[m];if(m>=p){this.wA[m]=0;continue}const b=(w.ph+this.t*f*w.sp)%1,T=(1-Math.pow(b,1.6))*w.r*g+r*.6,A=w.az+b*4.2+this.t*.3,P=Math.cos(w.el);this.wPos[m*3]=this.last.x+Math.cos(A)*P*T,this.wPos[m*3+1]=this.last.y+Math.sin(w.el)*T*.8+.1*Math.sin(this.t*5+m),this.wPos[m*3+2]=this.last.z+Math.sin(A)*P*T,this.wA[m]=Math.sin(Math.PI*Math.min(1,b*1.15))*this.k}this.wisps.geometry.getAttribute("position").needsUpdate=!0,this.wisps.geometry.getAttribute("aA").needsUpdate=!0}dispose(){this.group.traverse(e=>{const t=e;t.geometry?.dispose(),t.material?.dispose?.()})}}const x={kinds:["slice"],life:.78,foldSec:1.7,trailDeg:38,mergeDeg:5,toothSize:.9,toothDepth:.16,foldSkew:.22,toothChaos:.8,toothSkew:.85,shardPerP:280,shardLife:1.25,shardLift:4.2,shardSize:.42,shardDrift:1.6,emberWidth:.07,ember:"#8a5bff",body:.08,hot:.42,lip:.7,color:"#f2ecff",lipColor:"#ffffff"};function lt(l,e=x){return e.kinds.includes(l.kind)}function ht(l,e=x){return Math.max(.05,l.life*e.life)}function ut(l,e,t=x){const a=ht(e,t),i=Math.min(t.foldSec,a),s=a-i;return Math.min(1,Math.max(0,(l-s)/Math.max(1e-6,i)))}function ft(l,e,t,a=x){const i=a.toothDepth,s=a.foldSkew;return l*(1+i+s)-(i*(1-t)+s*(1-e))}function $(l,e){const t=o=>o-Math.floor(o);let a=t(l*123.34),i=t(e*456.21);const s=a*(a+45.32)+i*(i+45.32);return a+=s,i+=s,t(a*i)}function ct(l,e,t=x){const a=Math.min(1,Math.max(0,t.toothChaos)),i=l/Math.max(.05,t.toothSize),s=i+a*(.35*Math.sin(i*.9+e)+.2*Math.sin(i*2.3+e*1.7)),o=s+.5-Math.floor(s+.5),n=Math.floor(s+.5),h=$(n,e),u=$(n+17.3,e+4.1),c=h<.12?1+a*(.12-1):h>.86?1:1+a*(.3+.7*h-1),d=.5+(.12+.76*u-.5)*Math.min(1,a*t.toothSkew);let r=o<d?o/d:(1-o)/(1-d);return r=Math.pow(Math.min(1,Math.max(0,r)),1+.9*a),Math.min(1,Math.max(0,r*c))}function dt(l,e,t,a,i,s,o=x){const n=ft(l,e,t,o);return{ok:n>0&&n<1,u:n,psi:i-n*a*Math.PI/180,r:e*s}}function mt(l,e,t=x){return Math.max(0,l)*t.shardPerP*Math.max(.2,e/180)}function pt(l,e,t,a,i=x){let s=l.growing?0:ut(l.age,e,i),o=1;if(t>=0){const n=a?.12:.45,h=Math.max(0,1-t/n);s=Math.max(s,1-h),o=a?h:Math.min(1,h*2)}return{p:s,fade:o}}const C=4,M=720,vt=`
varying vec2 vW;
void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xz; gl_Position = projectionMatrix * viewMatrix * w; }
`,gt=`
#define SLOTS ${C}
uniform float uTime; uniform float uInt; uniform vec2 uPivot;
uniform vec4 uA[SLOTS];   // x: world angle of the sector's start edge (rad), y: swept span (deg), z: reach (m), w: brightness fade
uniform vec4 uB[SLOTS];   // x: erosion progress, y: seed, z: still growing (1/0), w: unused
uniform vec4 uP0;         // trailDeg, mergeDeg, toothSize (m), toothDepth
uniform vec4 uP1;         // foldSkew, body, hot, lip
uniform vec4 uP2;         // toothChaos, toothSkew, emberWidth, unused
uniform vec3 uColor; uniform vec3 uLipColor; uniform vec3 uEmber;
varying vec2 vW;
${V}
// the same expression as fx/whiteField.ts wildTooth(): every tooth its own height, lean and width; long fangs, stumps, a wandering pitch
float wild(float rm, float seed){
  float c = uP2.x, x0 = rm / max(0.05, uP0.z);
  float x = x0 + c * (0.35 * sin(x0 * 0.9 + seed) + 0.2 * sin(x0 * 2.3 + seed * 1.7));
  float g = fract(x + 0.5), i = floor(x + 0.5);
  float a = h21(vec2(i, seed)), b = h21(vec2(i + 17.3, seed + 4.1));
  float h = a < 0.12 ? mix(1.0, 0.12, c) : (a > 0.86 ? 1.0 : mix(1.0, 0.3 + 0.7 * a, c));
  float s = 0.5 + (0.12 + 0.76 * b - 0.5) * min(1.0, c * uP2.y);
  float shape = g < s ? g / s : (1.0 - g) / (1.0 - s);
  shape = pow(clamp(shape, 0.0, 1.0), 1.0 + 0.9 * c);
  return clamp(shape * h, 0.0, 1.0);
}
void main(){
  vec2 d = vW - uPivot; float r = length(d); float psi = atan(d.x, d.y);              // vW is (world x, world z): the angle is measured from +z toward +x, like the slice mesh
  float gap = 1.0, bright = 0.0, lip = 0.0, emb = 0.0;
  for (int i = 0; i < SLOTS; i++){
    float reach = uA[i].z; if (reach <= 0.0) continue;
    float span = uA[i].y; if (span <= 0.5) continue;
    float t = degrees(uA[i].x - psi); t = mod(t - span * 0.5 + 180.0, 360.0) - 180.0 + span * 0.5;   // swept angle, wrapped round the sector's middle
    float out_ = t < 0.0 ? -t : max(0.0, t - span);                                    // degrees outside the sector
    float m = max(0.01, uP0.y);
    float x = clamp(1.0 - out_ / m, 0.0, 1.0); float sector = x * x * (3.0 - 2.0 * x);
    float rad = r / reach; if (rad > 1.0 || sector <= 0.0) continue;
    // the rim and the hand end are ragged, the same way the front is
    float rn = vn(vec2(r * 1.7 + uB[i].y, t * 0.09));
    float radial = smoothstep(0.02, 0.16, rad) * smoothstep(1.0, 0.9 + 0.06 * rn, rad);
    // swept-age fraction u: 0 = swept first, 1 = under the head; the erosion front (fx/whiteField.ts) takes the oldest first
    float u = clamp(t / span, 0.0, 1.0);
    float tooth = wild(r, uB[i].y);
    float D = uP0.w, S = uP1.x, p = uB[i].x;
    float front = p * (1.0 + D + S) - (D * (1.0 - tooth) + S * (1.0 - rad));
    float eps = 0.004 + 0.0005 * r;
    float alive = smoothstep(front - eps, front + eps, u);                              // a hard serrated edge, not a soft fade
    float mid = step(0.0001, p) * (1.0 - step(0.9999, p));
    float lipBand = (1.0 - smoothstep(0.0, 0.045 + 0.02 * tooth, u - front)) * mid;
    // the purple soaks back through the eaten side: longest behind the fangs
    float ember = (1.0 - alive) * (1.0 - smoothstep(0.0, uP2.z * (0.35 + tooth), front - u)) * mid;
    float c = sector * radial * alive * uA[i].w;
    float ce = sector * radial * uA[i].w;
    // brightest right behind the beam head while it is still being drawn, then settles to the body
    float behind = clamp(span - t, 0.0, 360.0);
    float head = exp(-behind / max(1.0, uP0.x)) * mix(0.35, 1.0, uB[i].z);
    float b = uP1.y + (uP1.z - uP1.y) * head;
    gap *= 1.0 - c;                                                                    // the UNION of the sectors
    bright = max(bright, c * b);
    lip = max(lip, c * lipBand);
    emb = max(emb, ce * ember);
  }
  float cover = 1.0 - gap; if (cover <= 0.003 && emb <= 0.003) discard;
  // radial streaks, so the body is a sheet of light with grain in it and the purple warp underneath still shows through
  float streak = 0.62 + 0.38 * vn(vec2(degrees(psi) * 0.5 + uTime * 0.6, r * 0.35));
  float aw = (bright * streak + lip * uP1.w) * uInt;
  float ae = emb * 0.5 * uInt * (0.7 + 0.3 * vn(vec2(r * 2.0, uTime * 2.0 + degrees(psi))));
  vec3 colW = mix(uColor, uLipColor, clamp(lip * 1.5, 0.0, 1.0));
  float a = aw + ae;
  gl_FragColor = vec4((colW * aw + uEmber * ae) / max(a, 1e-4), min(a, 0.95));
}
`,wt=`
attribute vec4 aData;     // x: age 0..1, y: size (m, 0 = dead), z: rotation, w: seed
uniform float uScale;
varying vec4 vD;
void main(){
  vD = aData; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  gl_PointSize = aData.y <= 0.0 ? 0.0 : clamp(aData.y * uScale / max(0.1, -mv.z), 1.0, 56.0);
}
`,bt=`
uniform float uInt; uniform vec3 uColor; uniform vec3 uEmber;
varying vec4 vD;
void main(){
  if (vD.y <= 0.0) discard;
  vec2 q = (gl_PointCoord - 0.5) * 2.0; float cs = cos(vD.z), sn = sin(vD.z); q = vec2(cs * q.x - sn * q.y, sn * q.x + cs * q.y);
  float k = 1.0 - (abs(q.x) * (2.6 + 1.6 * fract(vD.w * 7.0)) + abs(q.y) * 0.85);   // a sliver, long in y, its width its own
  if (k <= 0.0) discard;
  float age = vD.x, fade = smoothstep(0.0, 0.06, age) * (1.0 - smoothstep(0.5, 1.0, age));
  vec3 col = mix(uColor, uEmber, smoothstep(0.15, 0.85, age));
  gl_FragColor = vec4(col, min(0.95, (0.35 + k) * fade * uInt));
}
`,Mt=l=>[l.x,l.y,l.z,l.planeY].map(e=>Math.round(e*20)).join(",");class xt{constructor(e,t=x){this.field=e,this.P=t,this.group.name="whiteFieldFx";const a=e.onEnd;e.onEnd=(s,o)=>{a?.(s,o);const n=this.members.get(s.id);n&&o!=="timeout"&&(n.out=0,n.fast=o==="evicted"||o==="cleared")},this.shardGeo.setAttribute("position",new G(this.sPos,3).setUsage(H)),this.shardGeo.setAttribute("aData",new G(this.sData,4).setUsage(H)),this.shardMat=new S({vertexShader:wt,fragmentShader:bt,transparent:!0,depthWrite:!1,blending:y,uniforms:{uScale:{value:600},uInt:{value:1},uColor:{value:new v(t.lipColor)},uEmber:{value:new v(t.ember)}}});const i=new j(this.shardGeo,this.shardMat);i.frustumCulled=!1,i.renderOrder=6,i.name="whiteShards",i.onBeforeRender=(s,o,n)=>{const h=s.getDrawingBufferSize(new N),u=n.fov||50;this.shardMat.uniforms.uScale.value=h.y*.5/Math.tan(u*Math.PI/360)},this.group.add(i)}group=new B;intensity=()=>1;members=new Map;planes=new Map;geo=new J(1,96).rotateX(-Math.PI/2);t=0;sPos=new Float32Array(M*3);sData=new Float32Array(M*4);sVel=new Float32Array(M*3);sLife=new Float32Array(M);sAge=new Float32Array(M);sSpin=new Float32Array(M);sNext=0;shardGeo=new I;shardMat;get shardCountAlive(){let e=0;for(let t=0;t<M;t++)this.sData[t*4+1]>0&&e++;return e}get count(){return this.members.size}get planeCount(){return this.planes.size}update(e){this.t+=e;const t=Math.max(0,Math.min(1,this.intensity()));this.group.visible=t>.001;for(const i of this.field.groups)lt(i,this.P)&&!this.members.has(i.id)&&this.members.set(i.id,{g:i,out:-1,fast:!1,lastP:0,carry:0});for(const[i,s]of this.members)if(s.out>=0){if(s.out+=e,s.out>=(s.fast?.12:.45)){this.members.delete(i);continue}}else this.field.groups.includes(s.g)||this.members.delete(i);const a=new Map;for(const i of this.members.values()){const s=Mt(i.g);(a.get(s)??a.set(s,[]).get(s)).push(i)}for(const[i,s]of a)for(let o=0;o*C<s.length;o++)this.drawPlane(i+"#"+o,s.slice(o*C,(o+1)*C),t);for(const[i,s]of this.planes)this.used.has(i)||(this.group.remove(s.mesh),s.mat.dispose(),this.planes.delete(i));this.used.clear(),this.stepShards(e,t)}used=new Set;drawPlane(e,t,a){this.used.add(e);let i=this.planes.get(e);i||(i=this.makePlane(e),this.planes.set(e,i));const s=t[0].g,o=i.mat.uniforms,n=this.P;let h=0;for(let u=0;u<C;u++){const c=t[u],d=o.uA.value[u],r=o.uB.value[u];if(!c){d.set(0,0,0,0),r.set(0,0,0,0);continue}const f=c.g,g=this.field.kind(f.kind),p=pt(f,g,c.out,c.fast,n),m=f.id*7.31%17;d.set(f.yaw+f.a0*Math.PI/180,f.sweep,f.reach,p.fade),r.set(p.p,m,f.growing?1:0,0),h=Math.max(h,f.reach);const w=p.p-c.lastP;if(c.lastP=p.p,w>0&&p.p<1&&a>.001){c.carry+=mt(w,f.sweep,n)*a;for(let b=0;c.carry>=1&&b<40;b++,c.carry-=1)this.spawnShard(f,p.p,m)}}o.uPivot.value.set(s.x,s.z),o.uP0.value.set(n.trailDeg,n.mergeDeg,n.toothSize,n.toothDepth),o.uP1.value.set(n.foldSkew,n.body,n.hot,n.lip),o.uP2.value.set(n.toothChaos,n.toothSkew,n.emberWidth,0),o.uTime.value=this.t,o.uInt.value=a,i.mesh.position.set(s.x,s.y+s.planeY+.012,s.z),i.mesh.scale.setScalar(h+.5)}spawnShard(e,t,a){const i=this.P,s=e.yaw+e.a0*Math.PI/180;for(let o=0;o<8;o++){const n=.07+.9*Math.random(),h=n*e.reach,u=dt(t,n,ct(h,a,i),e.sweep,s,e.reach,i);if(!u.ok)continue;const c=Math.sin(u.psi),d=Math.cos(u.psi),r=this.sNext;this.sNext=(this.sNext+1)%M;const f=i.shardLife*(.6+.8*Math.random()),g=i.shardLift/i.shardLife*(.55+.9*Math.random())*1.25,p=i.shardDrift*(.3+Math.random()),m=(Math.random()-.4)*.7;this.sPos[r*3]=e.x+h*c,this.sPos[r*3+1]=e.y+e.planeY+.05,this.sPos[r*3+2]=e.z+h*d,this.sVel[r*3]=-d*p+c*m+(Math.random()-.5)*.5,this.sVel[r*3+1]=g,this.sVel[r*3+2]=c*p+d*m+(Math.random()-.5)*.5,this.sLife[r]=f,this.sAge[r]=0,this.sSpin[r]=(Math.random()-.5)*7;const w=Math.random();this.sData[r*4]=0,this.sData[r*4+1]=i.shardSize*(.4+1.3*w*w),this.sData[r*4+2]=Math.random()*6.28,this.sData[r*4+3]=Math.random();return}}stepShards(e,t){this.shardMat.uniforms.uInt.value=t;for(let a=0;a<M;a++){if(this.sData[a*4+1]<=0)continue;if(this.sAge[a]+=e,this.sAge[a]>=this.sLife[a]){this.sData[a*4+1]=0;continue}const i=this.sAge[a]/this.sLife[a],s=Math.max(0,1-.9*e),o=Math.sin(this.t*3+this.sData[a*4+3]*40)*.9*e;this.sVel[a*3]=this.sVel[a*3]*s+o,this.sVel[a*3+1]*=1-.45*e,this.sVel[a*3+2]=this.sVel[a*3+2]*s-o,this.sPos[a*3]+=this.sVel[a*3]*e,this.sPos[a*3+1]+=this.sVel[a*3+1]*e,this.sPos[a*3+2]+=this.sVel[a*3+2]*e,this.sData[a*4]=i,this.sData[a*4+2]+=this.sSpin[a]*e}this.shardGeo.attributes.position.needsUpdate=!0,this.shardGeo.attributes.aData.needsUpdate=!0}makePlane(e){const t=this.P,a=()=>Array.from({length:C},()=>new R),i=new S({vertexShader:vt,fragmentShader:gt,transparent:!0,depthWrite:!1,side:W,blending:y,uniforms:{uTime:{value:0},uInt:{value:1},uPivot:{value:new N},uA:{value:a()},uB:{value:a()},uP0:{value:new R(t.trailDeg,t.mergeDeg,t.toothSize,t.toothDepth)},uP1:{value:new R(t.foldSkew,t.body,t.hot,t.lip)},uP2:{value:new R(t.toothChaos,t.toothSkew,t.emberWidth,0)},uColor:{value:new v(t.color)},uLipColor:{value:new v(t.lipColor)},uEmber:{value:new v(t.ember)}}}),s=new D(this.geo,i);return s.frustumCulled=!1,s.renderOrder=5,this.group.add(s),{key:e,mesh:s,mat:i}}dispose(){for(const e of this.planes.values())this.group.remove(e.mesh),e.mat.dispose();this.planes.clear(),this.members.clear(),this.geo.dispose(),this.shardGeo.dispose(),this.shardMat.dispose()}}const yt=`
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,St=`
uniform float uTime; uniform vec3 uColor; uniform vec3 uAccent; uniform float uK; uniform float uSeed;
uniform float uReach; uniform float uPhi; uniform float uHalf; uniform float uGap; uniform float uSpeed;
varying vec2 vUv;
${V}
// The beam is a FAN of arcs, not a ray: crescents of constant radius are born at the hand, expand outward along the beam's direction
// and fade as they go. A thin spine along the axis keeps the true hit line readable (the hit width is the clock's halfWidth, unchanged).
void main(){
  float along = vUv.x;                                        // 0 at the hand, 1 at the tip
  float a = (vUv.y - 0.5) * 2.0;                              // -1 .. 1 across the fan's angle
  float s = along * uReach;                                   // metres out from the hand
  float lat = s * sin(a * uPhi);                              // metres off the axis
  float spine = smoothstep(uHalf * 0.55, 0.0, abs(lat));
  float ph = fract((s - uTime * uSpeed) / uGap + uSeed * 0.37);
  float lead = smoothstep(0.0, 0.04, ph) * pow(1.0 - ph, 2.2);  // soft tail behind the arc
  float rim = smoothstep(0.0, 0.015, ph) * smoothstep(0.1, 0.02, ph); // thin bright leading edge of the arc
  float tipsA = smoothstep(1.0, 0.1, abs(a));                 // crescent: bright mid, tapering to its tips
  float n = vn(vec2(s * 1.3 - uTime * 9.0, a * 4.0 + uSeed));
  float arcs = (lead * 1.0 + rim * 1.5) * tipsA * (0.6 + 0.4 * n) * mix(0.6, 1.0, along);
  float fill = tipsA * tipsA * 0.10 * smoothstep(0.0, 0.25, along);
  float tip = smoothstep(1.0, 0.8, along) * smoothstep(0.0, 0.04, along);
  float al = (spine * 0.5 + arcs + fill) * tip * uK;
  vec3 col = mix(uColor, uAccent, clamp(spine * 0.8 + rim, 0.0, 1.0));
  gl_FragColor = vec4(col * (0.8 + 0.9 * spine + 0.9 * rim), al);
}
`,At=`
attribute float aAng; attribute float aRad;
varying float vAng; varying float vRad; varying vec2 vW;
void main(){ vAng = aAng; vRad = aRad; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xz; gl_Position = projectionMatrix * viewMatrix * w; }
`,Pt=`
uniform float uTime; uniform float uSweep; uniform float uLife; uniform float uFade; uniform float uSeed; uniform float uGrow;
uniform vec3 uColor; uniform vec3 uAccent;
varying float vAng; varying float vRad; varying vec2 vW;
${V}
void main(){
  if (vAng > uSweep) discard;
  // WORLD-anchored noise: it is sampled by world position, so the material is where it was made and wavers in place
  vec2 q = vW * 0.55 + vec2(uSeed, uSeed * 1.7);
  float t = uTime;
  float n = vn(q * 1.4 + vec2(t * 0.35, -t * 0.27)) * 0.6 + vn(q * 3.1 + vec2(-t * 0.8, t * 0.6)) * 0.4;
  float wob = vn(q * 0.8 + t * 0.2);
  // globs: the arc is thresholded by the noise, the threshold rises as the life runs out so it breaks up and dissolves
  float thr = mix(0.30, 0.78, 1.0 - uLife);
  float glob = smoothstep(thr, thr + 0.18, n + 0.25 * (1.0 - abs(vRad - 0.55) * 1.6));
  float radial = smoothstep(0.0, 0.18, vRad) * smoothstep(1.0, 0.82 + 0.08 * wob, vRad);
  float head = smoothstep(uSweep, uSweep - 40.0, vAng);       // brighter right behind the beam while it is still being made
  float body = 0.22 + 0.78 * head * uGrow;
  float flick = 0.85 + 0.15 * sin(t * 23.0 + vAng * 0.2 + uSeed * 9.0) * (1.0 - uLife);
  float a = glob * radial * body * flick * uFade;
  vec3 col = mix(uColor, uAccent, glob * glob * 0.25);
  gl_FragColor = vec4(col, a * 0.26);
}
`,q=120,z=8;function kt(l){const e=[],t=[],a=[],i=[];for(let o=0;o<=q;o++)for(let n=0;n<=z;n++){const h=o/q*360,u=-h*Math.PI/180,c=l+(1-l)*(n/z);e.push(Math.sin(u)*c,0,Math.cos(u)*c),t.push(h),a.push(n/z)}for(let o=0;o<q;o++)for(let n=0;n<z;n++){const h=o*(z+1)+n,u=h+z+1;i.push(h,u,h+1,u,u+1,h+1)}const s=new I;return s.setAttribute("position",new F(e,3)),s.setAttribute("aAng",new F(t,1)),s.setAttribute("aRad",new F(a,1)),s.setIndex(i),s}class Ft{constructor(e){this.field=e,this.group.name="lingerFx",this.group.renderOrder=4;const t=e.onEnd;e.onEnd=(a,i)=>{t?.(a,i);const s=this.slices.get(a.id);s&&(s.out=0,s.fast=i==="evicted"||i==="cleared")},this.white=new xt(e),this.group.add(this.white.group)}group=new B;geo=kt(.06);slices=new Map;t=0;white;set intensity(e){this.white.intensity=e}get count(){return this.slices.size}update(e){this.t+=e,this.white.update(e);for(const t of this.field.groups){let a=this.slices.get(t.id);a||(a=this.make(t),this.slices.set(t.id,a));const i=this.field.kind(t.kind),s=this.field.life(t),o=t.growing?1:Math.min(1,Math.max(0,(i.life-t.age)/Math.max(.05,i.fade)));a.mat.uniforms.uSweep.value=t.sweep+(t.growing?3:0),a.mat.uniforms.uLife.value=s,a.mat.uniforms.uFade.value=o,a.mat.uniforms.uGrow.value=t.growing?1:Math.max(0,1-t.age*1.5),a.mat.uniforms.uTime.value=this.t}for(const[t,a]of this.slices){if(a.out<0)continue;a.out+=e;const i=a.fast?.12:.45,s=Math.max(0,1-a.out/i);a.mat.uniforms.uFade.value=Math.min(a.mat.uniforms.uFade.value,s),a.mat.uniforms.uLife.value=Math.min(a.mat.uniforms.uLife.value,.25+.75*s),s<=0&&(this.drop(a),this.slices.delete(t))}for(const[t,a]of this.slices)a.out<0&&!this.field.groups.includes(a.g)&&(this.drop(a),this.slices.delete(t))}make(e){const t=new S({vertexShader:At,fragmentShader:Pt,transparent:!0,depthWrite:!1,side:W,blending:y,uniforms:{uTime:{value:0},uSweep:{value:0},uLife:{value:1},uFade:{value:1},uGrow:{value:1},uSeed:{value:e.id*7.31%17},uColor:{value:new v(e.color)},uAccent:{value:new v("#f2e4ff")}}}),a=new D(this.geo,t);return a.position.set(e.x,e.y+e.planeY,e.z),a.rotation.y=e.yaw+e.a0*Math.PI/180,a.scale.setScalar(e.reach),a.frustumCulled=!1,a.renderOrder=4,this.group.add(a),{mesh:a,mat:t,g:e,out:-1,fast:!1}}drop(e){this.group.remove(e.mesh),e.mat.dispose()}dispose(){for(const e of this.slices.values())this.drop(e);this.slices.clear(),this.geo.dispose(),this.white.dispose()}}const L=36,E={phi:.36,gap:2.4,speed:15};function zt(){const t=[],a=[],i=[];for(let o=0;o<=36;o++)for(let n=0;n<=14;n++){const h=o/36,u=n/14*2-1,c=u*E.phi;t.push(h*Math.cos(c),h*Math.sin(c),0),a.push(h,(u+1)/2)}for(let o=0;o<36;o++)for(let n=0;n<14;n++){const h=o*15+n,u=h+14+1;i.push(h,u,h+1,u,u+1,h+1)}const s=new I;return s.setAttribute("position",new F(t,3)),s.setAttribute("uv",new F(a,2)),s.setIndex(i),s}class Tt{group=new B;v=null;t=0;beams=[];beamMat;palmMat;flow;flowPos;flowMat;glob=new Y;palmGlob=new Y;ring;fade=0;gc=new v("#a04bff");ga=new v("#e9d4ff");constructor(){this.group.name="rotorFx",this.group.visible=!1,this.beamMat=new S({vertexShader:yt,fragmentShader:St,transparent:!0,depthWrite:!1,side:W,blending:y,uniforms:{uTime:{value:0},uColor:{value:new v("#a04bff")},uAccent:{value:new v("#e9d4ff")},uK:{value:0},uSeed:{value:3},uReach:{value:11},uPhi:{value:E.phi},uHalf:{value:.55},uGap:{value:E.gap},uSpeed:{value:E.speed}}}),this.palmMat=this.beamMat.clone(),this.palmMat.uniforms=Q.clone(this.beamMat.uniforms),this.palmMat.uniforms.uSeed.value=11;const e=zt();for(const a of[this.beamMat,this.palmMat]){const i=new D(e,a),s=new D(e,a);for(const o of[i,s])o.frustumCulled=!1,o.renderOrder=6,this.group.add(o),this.beams.push(o)}this.flowPos=new Float32Array(L*3);const t=new I;t.setAttribute("position",new G(this.flowPos,3)),t.setAttribute("aU",new F(Array.from({length:L},(a,i)=>i/L),1)),this.flowMat=new S({vertexShader:"attribute float aU; uniform float uSize; uniform float uK; varying float vU; void main(){ vU = aU; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = uSize * uK * (0.6 + 0.8*fract(aU*7.0)) * (260.0 / -mv.z); gl_Position = projectionMatrix * mv; }",fragmentShader:"uniform vec3 uColor; uniform vec3 uAccent; uniform float uK; varying float vU; void main(){ vec2 d = gl_PointCoord - 0.5; float r = length(d); float a = smoothstep(0.5, 0.0, r); gl_FragColor = vec4(mix(uColor, uAccent, a*a), a * uK); }",transparent:!0,depthWrite:!1,blending:y,uniforms:{uSize:{value:.22},uK:{value:0},uColor:{value:new v("#a04bff")},uAccent:{value:new v("#e9d4ff")}}}),this.flow=new j(t,this.flowMat),this.flow.frustumCulled=!1,this.flow.renderOrder=6,this.group.add(this.flow),this.group.add(this.glob.group,this.palmGlob.group),this.ring=new D(new tt(.7,1,40).rotateX(-Math.PI/2),new et({color:"#a04bff",transparent:!0,opacity:.7,blending:y,depthWrite:!1,side:W}));for(const a of[this.ring])a.frustumCulled=!1,a.renderOrder=6,this.group.add(a)}frame(e){this.v=e,e&&(this.fade=1)}get active(){return!!this.v}update(e){this.t+=e;const t=this.v;if(!t){if(this.glob.update(e,null,1,0,this.gc,this.ga),this.palmGlob.update(e,null,1,0,this.gc,this.ga,0),this.fade=Math.max(0,this.fade-e*6),this.group.visible=this.fade>0,this.beamMat.uniforms.uK.value*=this.fade,this.palmMat.uniforms.uK.value*=this.fade,!this.group.visible)return;this.flowMat.uniforms.uK.value*=this.fade;return}this.group.visible=!0;const a=new v(t.color),i=new v(t.accent);for(const r of[this.beamMat,this.palmMat])r.uniforms.uColor.value.copy(a),r.uniforms.uAccent.value.copy(i),r.uniforms.uTime.value=this.t;this.flowMat.uniforms.uColor.value.copy(a),this.flowMat.uniforms.uAccent.value.copy(i);const s=t.pivot.y+t.planeY;[{on:t.beamOn?t.beamK:0,yaw:t.beamYaw,mat:this.beamMat},{on:t.palmOn?t.palmK:0,yaw:t.palmYaw,mat:this.palmMat}].forEach((r,f)=>{r.mat.uniforms.uK.value=r.on*(.9+.1*t.pump);for(let g=0;g<2;g++){const p=this.beams[f*2+g];p.visible=r.on>.01,p.position.set(t.pivot.x+Math.sin(r.yaw)*.35,s,t.pivot.z+Math.cos(r.yaw)*.35),p.rotation.set(g===0?-Math.PI/2:0,r.yaw,0,"YXZ"),p.rotation.y=r.yaw-Math.PI/2;const m=Math.max(.01,t.reach*r.on-.35);p.scale.set(m,m,1),r.mat.uniforms.uReach.value=m,r.mat.uniforms.uHalf.value=t.halfWidth}});const n=t.phase==="spin"&&t.stage===1,h=t.phase==="charge"?Math.min(1,t.flow*1.6):n?.7*(1-t.lift):0;if(this.flowMat.uniforms.uK.value=h,this.flow.visible=h>.01&&!!t.palm&&!!t.neck&&!!t.beamHand,this.flow.visible){const r=t.palm,f=t.neck,g=t.beamHand,p=Math.hypot(f.x-r.x,f.y-r.y,f.z-r.z),m=Math.hypot(g.x-f.x,g.y-f.y,g.z-f.z),w=Math.max(.001,p+m);for(let b=0;b<L;b++){const T=((b/L-this.t*(.9+.8*t.flow))%1+1)%1,A=T*w,P=A<p,O=P?A/Math.max(.001,p):(A-p)/Math.max(.001,m),k=P?r:f,U=P?f:g,K=.09*Math.sin(this.t*17+b*2.3)*(1-t.flow*.5);this.flowPos[b*3]=k.x+(U.x-k.x)*O+K,this.flowPos[b*3+1]=k.y+(U.y-k.y)*O+K*.6,this.flowPos[b*3+2]=k.z+(U.z-k.z)*O-K}this.flow.geometry.getAttribute("position").needsUpdate=!0}const u=t.phase==="charge"||t.lift<.5;if(this.ring.visible=u&&!!t.palm&&t.phase!=="recover",this.ring.visible){const r=t.palm,f=this.t*2.2%1;this.ring.position.set(r.x,t.pivot.y+.04,r.z),this.ring.scale.setScalar(.35+f*(.6+.9*t.flow)),this.ring.material.opacity=(1-f)*.7*(t.phase==="charge"?t.flow+.2:1-t.lift*2)}const c=t.phase==="charge"?1:t.phase==="spin"||t.phase==="recover"?t.pump:0,d=t.phase==="charge";this.glob.update(e,t.beamHand&&(d||t.pump>.02)?t.beamHand:null,d?t.flow:1,t.pump,a,i,d?1:0),this.palmGlob.update(e,t.palm&&!d&&c>.02?t.palm:null,1,t.pump,a,i,0)}dispose(){this.group.traverse(e=>{const t=e;t.geometry?.dispose(),t.material?.dispose?.()})}}export{Ft as L,Tt as R,x as W,Dt as a,at as b,ht as w};
