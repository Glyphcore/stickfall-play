import{BufferAttribute as V,DynamicDrawUsage as B,ShaderMaterial as D,Color as p,AdditiveBlending as x,Points as Y,Vector2 as R,Group as U,CircleGeometry as N,BufferGeometry as G,Vector4 as C,DoubleSide as L,Mesh as A,UniformsUtils as j,PlaneGeometry as H,Float32BufferAttribute as F,SphereGeometry as $,MeshBasicMaterial as K,RingGeometry as X}from"./three-DdJfuIKW.js";const Z={cap:3,kinds:{slice:{life:5,fade:.8,color:"#a04bff",label:"swept slice"},field:{life:5,fade:.8,color:"#4fd8ff",label:"spent field"},ward:{life:5,fade:.8,color:"#ffd45a",label:"broken ward"}}};class bt{constructor(t=Z){this.cat=t}list=[];nextId=1;clock=0;ended=[];onEnd;stats={spawned:0,timeout:0,evicted:0,consumed:0,cleared:0};get groups(){return this.list}get size(){return this.list.length}kind(t){return this.cat.kinds[t]??this.cat.kinds.slice}spawn(t){const e={id:this.nextId++,kind:t.kind,owner:t.owner,x:t.x,y:t.y,z:t.z,yaw:t.yaw,a0:t.a0,sweep:t.sweep??0,reach:t.reach,halfWidth:t.halfWidth,planeY:t.planeY,color:t.color??this.kind(t.kind).color,age:0,growing:!0,tags:t.tags??[],born:this.clock};for(this.list.push(e),this.stats.spawned++;this.list.length>Math.max(1,this.cat.cap);)this.end(this.list[0],"evicted");return e}grow(t,e){t.growing&&this.list.includes(t)&&(t.sweep=Math.max(t.sweep,e))}finish(t){t.growing=!1}tick(t){this.clock+=t;for(const e of this.list.slice())e.growing||(e.age+=t,e.age>=this.kind(e.kind).life&&this.end(e,"timeout"))}life(t){return t.growing?1:Math.max(0,1-t.age/this.kind(t.kind).life)}consume(t,e=1,s={}){const i=[];for(const a of this.list.slice()){if(i.length>=e)break;a.growing||!t.includes(a.kind)||s.tag&&!a.tags.includes(s.tag)||(this.end(a,"consumed"),i.push({group:a,globs:J(a)}))}return i}available(t,e){return this.list.filter(s=>!s.growing&&t.includes(s.kind)&&(!e||s.tags.includes(e))).length}clear(){for(const t of this.list.slice())this.end(t,"cleared")}drain(){const t=this.ended;return this.ended=[],t}end(t,e){const s=this.list.indexOf(t);s<0||(this.list.splice(s,1),this.stats[e]++,this.ended.push({g:t,why:e}),this.ended.length>64&&this.ended.shift(),this.onEnd?.(t,e))}}function J(n,t=12){const e=Math.PI/180,s=[],i=Math.max(1,Math.round(t*Math.abs(n.sweep)/360));for(let a=0;a<i;a++){const o=n.a0-n.sweep*(i===1?.5:a/(i-1)),r=n.reach*(.45+.4*(a*.618%1)),h=n.yaw+o*e;s.push({x:n.x+Math.sin(h)*r,y:n.y+n.planeY,z:n.z+Math.cos(h)*r,size:.35+.25*(a*.37%1),color:n.color,kind:n.kind,from:n.id})}return s}const O=`
float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(h21(i), h21(i+vec2(1,0)), f.x), mix(h21(i+vec2(0,1)), h21(i+vec2(1,1)), f.x), f.y); }
`,w={kinds:["slice"],life:.78,foldSec:1.7,trailDeg:38,mergeDeg:5,toothSize:.9,toothDepth:.16,foldSkew:.22,toothChaos:.8,toothSkew:.85,shardPerP:280,shardLife:1.25,shardLift:4.2,shardSize:.42,shardDrift:1.6,emberWidth:.07,ember:"#8a5bff",body:.08,hot:.42,lip:.7,color:"#f2ecff",lipColor:"#ffffff"};function Q(n,t=w){return t.kinds.includes(n.kind)}function tt(n,t=w){return Math.max(.05,n.life*t.life)}function et(n,t,e=w){const s=tt(t,e),i=Math.min(e.foldSec,s),a=s-i;return Math.min(1,Math.max(0,(n-a)/Math.max(1e-6,i)))}function st(n,t,e,s=w){const i=s.toothDepth,a=s.foldSkew;return n*(1+i+a)-(i*(1-e)+a*(1-t))}function q(n,t){const e=o=>o-Math.floor(o);let s=e(n*123.34),i=e(t*456.21);const a=s*(s+45.32)+i*(i+45.32);return s+=a,i+=a,e(s*i)}function at(n,t,e=w){const s=Math.min(1,Math.max(0,e.toothChaos)),i=n/Math.max(.05,e.toothSize),a=i+s*(.35*Math.sin(i*.9+t)+.2*Math.sin(i*2.3+t*1.7)),o=a+.5-Math.floor(a+.5),r=Math.floor(a+.5),h=q(r,t),c=q(r+17.3,t+4.1),l=h<.12?1+s*(.12-1):h>.86?1:1+s*(.3+.7*h-1),f=.5+(.12+.76*c-.5)*Math.min(1,s*e.toothSkew);let u=o<f?o/f:(1-o)/(1-f);return u=Math.pow(Math.min(1,Math.max(0,u)),1+.9*s),Math.min(1,Math.max(0,u*l))}function it(n,t,e,s,i,a,o=w){const r=st(n,t,e,o);return{ok:r>0&&r<1,u:r,psi:i-r*s*Math.PI/180,r:t*a}}function ot(n,t,e=w){return Math.max(0,n)*e.shardPerP*Math.max(.2,t/180)}function rt(n,t,e,s,i=w){let a=n.growing?0:et(n.age,t,i),o=1;if(e>=0){const r=s?.12:.45,h=Math.max(0,1-e/r);a=Math.max(a,1-h),o=s?h:Math.min(1,h*2)}return{p:a,fade:o}}const k=4,g=720,nt=`
varying vec2 vW;
void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xz; gl_Position = projectionMatrix * viewMatrix * w; }
`,lt=`
#define SLOTS ${k}
uniform float uTime; uniform float uInt; uniform vec2 uPivot;
uniform vec4 uA[SLOTS];   // x: world angle of the sector's start edge (rad), y: swept span (deg), z: reach (m), w: brightness fade
uniform vec4 uB[SLOTS];   // x: erosion progress, y: seed, z: still growing (1/0), w: unused
uniform vec4 uP0;         // trailDeg, mergeDeg, toothSize (m), toothDepth
uniform vec4 uP1;         // foldSkew, body, hot, lip
uniform vec4 uP2;         // toothChaos, toothSkew, emberWidth, unused
uniform vec3 uColor; uniform vec3 uLipColor; uniform vec3 uEmber;
varying vec2 vW;
${O}
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
`,ht=`
attribute vec4 aData;     // x: age 0..1, y: size (m, 0 = dead), z: rotation, w: seed
uniform float uScale;
varying vec4 vD;
void main(){
  vD = aData; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  gl_PointSize = aData.y <= 0.0 ? 0.0 : clamp(aData.y * uScale / max(0.1, -mv.z), 1.0, 56.0);
}
`,ut=`
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
`,ft=n=>[n.x,n.y,n.z,n.planeY].map(t=>Math.round(t*20)).join(",");class dt{constructor(t,e=w){this.field=t,this.P=e,this.group.name="whiteFieldFx";const s=t.onEnd;t.onEnd=(a,o)=>{s?.(a,o);const r=this.members.get(a.id);r&&o!=="timeout"&&(r.out=0,r.fast=o==="evicted"||o==="cleared")},this.shardGeo.setAttribute("position",new V(this.sPos,3).setUsage(B)),this.shardGeo.setAttribute("aData",new V(this.sData,4).setUsage(B)),this.shardMat=new D({vertexShader:ht,fragmentShader:ut,transparent:!0,depthWrite:!1,blending:x,uniforms:{uScale:{value:600},uInt:{value:1},uColor:{value:new p(e.lipColor)},uEmber:{value:new p(e.ember)}}});const i=new Y(this.shardGeo,this.shardMat);i.frustumCulled=!1,i.renderOrder=6,i.name="whiteShards",i.onBeforeRender=(a,o,r)=>{const h=a.getDrawingBufferSize(new R),c=r.fov||50;this.shardMat.uniforms.uScale.value=h.y*.5/Math.tan(c*Math.PI/360)},this.group.add(i)}group=new U;intensity=()=>1;members=new Map;planes=new Map;geo=new N(1,96).rotateX(-Math.PI/2);t=0;sPos=new Float32Array(g*3);sData=new Float32Array(g*4);sVel=new Float32Array(g*3);sLife=new Float32Array(g);sAge=new Float32Array(g);sSpin=new Float32Array(g);sNext=0;shardGeo=new G;shardMat;get shardCountAlive(){let t=0;for(let e=0;e<g;e++)this.sData[e*4+1]>0&&t++;return t}get count(){return this.members.size}get planeCount(){return this.planes.size}update(t){this.t+=t;const e=Math.max(0,Math.min(1,this.intensity()));this.group.visible=e>.001;for(const i of this.field.groups)Q(i,this.P)&&!this.members.has(i.id)&&this.members.set(i.id,{g:i,out:-1,fast:!1,lastP:0,carry:0});for(const[i,a]of this.members)if(a.out>=0){if(a.out+=t,a.out>=(a.fast?.12:.45)){this.members.delete(i);continue}}else this.field.groups.includes(a.g)||this.members.delete(i);const s=new Map;for(const i of this.members.values()){const a=ft(i.g);(s.get(a)??s.set(a,[]).get(a)).push(i)}for(const[i,a]of s)for(let o=0;o*k<a.length;o++)this.drawPlane(i+"#"+o,a.slice(o*k,(o+1)*k),e);for(const[i,a]of this.planes)this.used.has(i)||(this.group.remove(a.mesh),a.mat.dispose(),this.planes.delete(i));this.used.clear(),this.stepShards(t,e)}used=new Set;drawPlane(t,e,s){this.used.add(t);let i=this.planes.get(t);i||(i=this.makePlane(t),this.planes.set(t,i));const a=e[0].g,o=i.mat.uniforms,r=this.P;let h=0;for(let c=0;c<k;c++){const l=e[c],f=o.uA.value[c],u=o.uB.value[c];if(!l){f.set(0,0,0,0),u.set(0,0,0,0);continue}const d=l.g,M=this.field.kind(d.kind),v=rt(d,M,l.out,l.fast,r),m=d.id*7.31%17;f.set(d.yaw+d.a0*Math.PI/180,d.sweep,d.reach,v.fade),u.set(v.p,m,d.growing?1:0,0),h=Math.max(h,d.reach);const b=v.p-l.lastP;if(l.lastP=v.p,b>0&&v.p<1&&s>.001){l.carry+=ot(b,d.sweep,r)*s;for(let y=0;l.carry>=1&&y<40;y++,l.carry-=1)this.spawnShard(d,v.p,m)}}o.uPivot.value.set(a.x,a.z),o.uP0.value.set(r.trailDeg,r.mergeDeg,r.toothSize,r.toothDepth),o.uP1.value.set(r.foldSkew,r.body,r.hot,r.lip),o.uP2.value.set(r.toothChaos,r.toothSkew,r.emberWidth,0),o.uTime.value=this.t,o.uInt.value=s,i.mesh.position.set(a.x,a.y+a.planeY+.012,a.z),i.mesh.scale.setScalar(h+.5)}spawnShard(t,e,s){const i=this.P,a=t.yaw+t.a0*Math.PI/180;for(let o=0;o<8;o++){const r=.07+.9*Math.random(),h=r*t.reach,c=it(e,r,at(h,s,i),t.sweep,a,t.reach,i);if(!c.ok)continue;const l=Math.sin(c.psi),f=Math.cos(c.psi),u=this.sNext;this.sNext=(this.sNext+1)%g;const d=i.shardLife*(.6+.8*Math.random()),M=i.shardLift/i.shardLife*(.55+.9*Math.random())*1.25,v=i.shardDrift*(.3+Math.random()),m=(Math.random()-.4)*.7;this.sPos[u*3]=t.x+h*l,this.sPos[u*3+1]=t.y+t.planeY+.05,this.sPos[u*3+2]=t.z+h*f,this.sVel[u*3]=-f*v+l*m+(Math.random()-.5)*.5,this.sVel[u*3+1]=M,this.sVel[u*3+2]=l*v+f*m+(Math.random()-.5)*.5,this.sLife[u]=d,this.sAge[u]=0,this.sSpin[u]=(Math.random()-.5)*7;const b=Math.random();this.sData[u*4]=0,this.sData[u*4+1]=i.shardSize*(.4+1.3*b*b),this.sData[u*4+2]=Math.random()*6.28,this.sData[u*4+3]=Math.random();return}}stepShards(t,e){this.shardMat.uniforms.uInt.value=e;for(let s=0;s<g;s++){if(this.sData[s*4+1]<=0)continue;if(this.sAge[s]+=t,this.sAge[s]>=this.sLife[s]){this.sData[s*4+1]=0;continue}const i=this.sAge[s]/this.sLife[s],a=Math.max(0,1-.9*t),o=Math.sin(this.t*3+this.sData[s*4+3]*40)*.9*t;this.sVel[s*3]=this.sVel[s*3]*a+o,this.sVel[s*3+1]*=1-.45*t,this.sVel[s*3+2]=this.sVel[s*3+2]*a-o,this.sPos[s*3]+=this.sVel[s*3]*t,this.sPos[s*3+1]+=this.sVel[s*3+1]*t,this.sPos[s*3+2]+=this.sVel[s*3+2]*t,this.sData[s*4]=i,this.sData[s*4+2]+=this.sSpin[s]*t}this.shardGeo.attributes.position.needsUpdate=!0,this.shardGeo.attributes.aData.needsUpdate=!0}makePlane(t){const e=this.P,s=()=>Array.from({length:k},()=>new C),i=new D({vertexShader:nt,fragmentShader:lt,transparent:!0,depthWrite:!1,side:L,blending:x,uniforms:{uTime:{value:0},uInt:{value:1},uPivot:{value:new R},uA:{value:s()},uB:{value:s()},uP0:{value:new C(e.trailDeg,e.mergeDeg,e.toothSize,e.toothDepth)},uP1:{value:new C(e.foldSkew,e.body,e.hot,e.lip)},uP2:{value:new C(e.toothChaos,e.toothSkew,e.emberWidth,0)},uColor:{value:new p(e.color)},uLipColor:{value:new p(e.lipColor)},uEmber:{value:new p(e.ember)}}}),a=new A(this.geo,i);return a.frustumCulled=!1,a.renderOrder=5,this.group.add(a),{key:t,mesh:a,mat:i}}dispose(){for(const t of this.planes.values())this.group.remove(t.mesh),t.mat.dispose();this.planes.clear(),this.members.clear(),this.geo.dispose(),this.shardGeo.dispose(),this.shardMat.dispose()}}const ct=`
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,mt=`
uniform float uTime; uniform vec3 uColor; uniform vec3 uAccent; uniform float uK; uniform float uSeed;
varying vec2 vUv;
${O}
void main(){
  float across = abs(vUv.y - 0.5) * 2.0;                      // 0 at the axis, 1 at the edge
  float along = vUv.x;                                        // 0 at the hand, 1 at the tip
  float core = smoothstep(0.34, 0.0, across);
  float glow = smoothstep(1.0, 0.0, across);
  float n = vn(vec2(along * 9.0 - uTime * 14.0, across * 3.0 + uSeed));
  float edge = glow * (0.55 + 0.45 * n);
  float tip = smoothstep(1.0, 0.82, along) * smoothstep(0.0, 0.05, along);
  float a = (core * 1.0 + edge * 0.55) * tip * uK;
  vec3 col = mix(uColor, uAccent, core);
  gl_FragColor = vec4(col * (0.8 + 1.2 * core), a);
}
`,pt=`
attribute float aAng; attribute float aRad;
varying float vAng; varying float vRad; varying vec2 vW;
void main(){ vAng = aAng; vRad = aRad; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xz; gl_Position = projectionMatrix * viewMatrix * w; }
`,vt=`
uniform float uTime; uniform float uSweep; uniform float uLife; uniform float uFade; uniform float uSeed; uniform float uGrow;
uniform vec3 uColor; uniform vec3 uAccent;
varying float vAng; varying float vRad; varying vec2 vW;
${O}
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
`,T=120,P=8;function gt(n){const t=[],e=[],s=[],i=[];for(let o=0;o<=T;o++)for(let r=0;r<=P;r++){const h=o/T*360,c=-h*Math.PI/180,l=n+(1-n)*(r/P);t.push(Math.sin(c)*l,0,Math.cos(c)*l),e.push(h),s.push(r/P)}for(let o=0;o<T;o++)for(let r=0;r<P;r++){const h=o*(P+1)+r,c=h+P+1;i.push(h,c,h+1,c,c+1,h+1)}const a=new G;return a.setAttribute("position",new F(t,3)),a.setAttribute("aAng",new F(e,1)),a.setAttribute("aRad",new F(s,1)),a.setIndex(i),a}class xt{constructor(t){this.field=t,this.group.name="lingerFx",this.group.renderOrder=4;const e=t.onEnd;t.onEnd=(s,i)=>{e?.(s,i);const a=this.slices.get(s.id);a&&(a.out=0,a.fast=i==="evicted"||i==="cleared")},this.white=new dt(t),this.group.add(this.white.group)}group=new U;geo=gt(.06);slices=new Map;t=0;white;set intensity(t){this.white.intensity=t}get count(){return this.slices.size}update(t){this.t+=t,this.white.update(t);for(const e of this.field.groups){let s=this.slices.get(e.id);s||(s=this.make(e),this.slices.set(e.id,s));const i=this.field.kind(e.kind),a=this.field.life(e),o=e.growing?1:Math.min(1,Math.max(0,(i.life-e.age)/Math.max(.05,i.fade)));s.mat.uniforms.uSweep.value=e.sweep+(e.growing?3:0),s.mat.uniforms.uLife.value=a,s.mat.uniforms.uFade.value=o,s.mat.uniforms.uGrow.value=e.growing?1:Math.max(0,1-e.age*1.5),s.mat.uniforms.uTime.value=this.t}for(const[e,s]of this.slices){if(s.out<0)continue;s.out+=t;const i=s.fast?.12:.45,a=Math.max(0,1-s.out/i);s.mat.uniforms.uFade.value=Math.min(s.mat.uniforms.uFade.value,a),s.mat.uniforms.uLife.value=Math.min(s.mat.uniforms.uLife.value,.25+.75*a),a<=0&&(this.drop(s),this.slices.delete(e))}for(const[e,s]of this.slices)s.out<0&&!this.field.groups.includes(s.g)&&(this.drop(s),this.slices.delete(e))}make(t){const e=new D({vertexShader:pt,fragmentShader:vt,transparent:!0,depthWrite:!1,side:L,blending:x,uniforms:{uTime:{value:0},uSweep:{value:0},uLife:{value:1},uFade:{value:1},uGrow:{value:1},uSeed:{value:t.id*7.31%17},uColor:{value:new p(t.color)},uAccent:{value:new p("#f2e4ff")}}}),s=new A(this.geo,e);return s.position.set(t.x,t.y+t.planeY,t.z),s.rotation.y=t.yaw+t.a0*Math.PI/180,s.scale.setScalar(t.reach),s.frustumCulled=!1,s.renderOrder=4,this.group.add(s),{mesh:s,mat:e,g:t,out:-1,fast:!1}}drop(t){this.group.remove(t.mesh),t.mat.dispose()}dispose(){for(const t of this.slices.values())this.drop(t);this.slices.clear(),this.geo.dispose(),this.white.dispose()}}const z=36;class Mt{group=new U;v=null;t=0;beams=[];beamMat;palmMat;flow;flowPos;flowMat;orb;ring;fade=0;constructor(){this.group.name="rotorFx",this.group.visible=!1,this.beamMat=new D({vertexShader:ct,fragmentShader:mt,transparent:!0,depthWrite:!1,side:L,blending:x,uniforms:{uTime:{value:0},uColor:{value:new p("#a04bff")},uAccent:{value:new p("#e9d4ff")},uK:{value:0},uSeed:{value:3}}}),this.palmMat=this.beamMat.clone(),this.palmMat.uniforms=j.clone(this.beamMat.uniforms),this.palmMat.uniforms.uSeed.value=11;const t=new H(1,1).translate(.5,0,0);for(const s of[this.beamMat,this.palmMat]){const i=new A(t,s),a=new A(t,s);for(const o of[i,a])o.frustumCulled=!1,o.renderOrder=6,this.group.add(o),this.beams.push(o)}this.flowPos=new Float32Array(z*3);const e=new G;e.setAttribute("position",new V(this.flowPos,3)),e.setAttribute("aU",new F(Array.from({length:z},(s,i)=>i/z),1)),this.flowMat=new D({vertexShader:"attribute float aU; uniform float uSize; uniform float uK; varying float vU; void main(){ vU = aU; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = uSize * uK * (0.6 + 0.8*fract(aU*7.0)) * (260.0 / -mv.z); gl_Position = projectionMatrix * mv; }",fragmentShader:"uniform vec3 uColor; uniform vec3 uAccent; uniform float uK; varying float vU; void main(){ vec2 d = gl_PointCoord - 0.5; float r = length(d); float a = smoothstep(0.5, 0.0, r); gl_FragColor = vec4(mix(uColor, uAccent, a*a), a * uK); }",transparent:!0,depthWrite:!1,blending:x,uniforms:{uSize:{value:.22},uK:{value:0},uColor:{value:new p("#a04bff")},uAccent:{value:new p("#e9d4ff")}}}),this.flow=new Y(e,this.flowMat),this.flow.frustumCulled=!1,this.flow.renderOrder=6,this.group.add(this.flow),this.orb=new A(new $(1,14,10),new K({color:"#e9d4ff",transparent:!0,opacity:.8,blending:x,depthWrite:!1})),this.ring=new A(new X(.7,1,40).rotateX(-Math.PI/2),new K({color:"#a04bff",transparent:!0,opacity:.7,blending:x,depthWrite:!1,side:L}));for(const s of[this.orb,this.ring])s.frustumCulled=!1,s.renderOrder=6,this.group.add(s)}frame(t){this.v=t,t&&(this.fade=1)}get active(){return!!this.v}update(t){this.t+=t;const e=this.v;if(!e){if(this.fade=Math.max(0,this.fade-t*6),this.group.visible=this.fade>0,this.beamMat.uniforms.uK.value*=this.fade,this.palmMat.uniforms.uK.value*=this.fade,!this.group.visible)return;this.flowMat.uniforms.uK.value*=this.fade;return}this.group.visible=!0;const s=new p(e.color),i=new p(e.accent);for(const l of[this.beamMat,this.palmMat])l.uniforms.uColor.value.copy(s),l.uniforms.uAccent.value.copy(i),l.uniforms.uTime.value=this.t;this.flowMat.uniforms.uColor.value.copy(s),this.flowMat.uniforms.uAccent.value.copy(i);const a=e.pivot.y+e.planeY;[{on:e.beamOn?e.beamK:0,yaw:e.beamYaw,mat:this.beamMat},{on:e.palmOn?e.palmK:0,yaw:e.palmYaw,mat:this.palmMat}].forEach((l,f)=>{l.mat.uniforms.uK.value=l.on;for(let u=0;u<2;u++){const d=this.beams[f*2+u];d.visible=l.on>.01,d.position.set(e.pivot.x+Math.sin(l.yaw)*.35,a,e.pivot.z+Math.cos(l.yaw)*.35),d.rotation.set(u===0?-Math.PI/2:0,l.yaw,0,"YXZ"),d.rotation.y=l.yaw-Math.PI/2,d.scale.set(Math.max(.01,e.reach*l.on-.35),e.halfWidth*2*(u===0?1:1.3),1)}});const r=e.phase==="spin"&&e.stage===1,h=e.phase==="charge"?Math.min(1,e.flow*1.6):r?.7*(1-e.lift):0;if(this.flowMat.uniforms.uK.value=h,this.flow.visible=h>.01&&!!e.palm&&!!e.neck&&!!e.beamHand,this.flow.visible){const l=e.palm,f=e.neck,u=e.beamHand,d=Math.hypot(f.x-l.x,f.y-l.y,f.z-l.z),M=Math.hypot(u.x-f.x,u.y-f.y,u.z-f.z),v=Math.max(.001,d+M);for(let m=0;m<z;m++){const b=((m/z-this.t*(.9+.8*e.flow))%1+1)%1,y=b*v,W=y<d,I=W?y/Math.max(.001,d):(y-d)/Math.max(.001,M),S=W?l:f,_=W?f:u,E=.09*Math.sin(this.t*17+m*2.3)*(1-e.flow*.5);this.flowPos[m*3]=S.x+(_.x-S.x)*I+E,this.flowPos[m*3+1]=S.y+(_.y-S.y)*I+E*.6,this.flowPos[m*3+2]=S.z+(_.z-S.z)*I-E}this.flow.geometry.getAttribute("position").needsUpdate=!0}const c=e.phase==="charge"||e.lift<.5;if(this.ring.visible=c&&!!e.palm&&e.phase!=="recover",this.ring.visible){const l=e.palm,f=this.t*2.2%1;this.ring.position.set(l.x,e.pivot.y+.04,l.z),this.ring.scale.setScalar(.35+f*(.6+.9*e.flow)),this.ring.material.opacity=(1-f)*.7*(e.phase==="charge"?e.flow+.2:1-e.lift*2)}if(this.orb.visible=e.phase==="charge"&&!!e.beamHand,this.orb.visible){const l=e.beamHand;this.orb.position.set(l.x,l.y,l.z),this.orb.scale.setScalar(.06+.2*e.flow*(.9+.1*Math.sin(this.t*30)))}}dispose(){this.group.traverse(t=>{const e=t;e.geometry?.dispose(),e.material?.dispose?.()})}}export{xt as L,Mt as R,w as W,bt as a,Z as b,tt as w};
