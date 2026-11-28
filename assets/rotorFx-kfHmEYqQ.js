import{BufferAttribute as V,DynamicDrawUsage as B,ShaderMaterial as C,Color as p,AdditiveBlending as M,Points as Y,Vector2 as K,Group as U,CircleGeometry as j,BufferGeometry as I,Vector4 as F,DoubleSide as W,Mesh as k,UniformsUtils as N,Float32BufferAttribute as z,SphereGeometry as $,MeshBasicMaterial as q,RingGeometry as X}from"./three-DdJfuIKW.js";const Z={cap:3,kinds:{slice:{life:5,fade:.8,color:"#a04bff",label:"swept slice"},field:{life:5,fade:.8,color:"#4fd8ff",label:"spent field"},ward:{life:5,fade:.8,color:"#ffd45a",label:"broken ward"}}};class xt{constructor(t=Z){this.cat=t}list=[];nextId=1;clock=0;ended=[];onEnd;stats={spawned:0,timeout:0,evicted:0,consumed:0,cleared:0};get groups(){return this.list}get size(){return this.list.length}kind(t){return this.cat.kinds[t]??this.cat.kinds.slice}spawn(t){const e={id:this.nextId++,kind:t.kind,owner:t.owner,x:t.x,y:t.y,z:t.z,yaw:t.yaw,a0:t.a0,sweep:t.sweep??0,reach:t.reach,halfWidth:t.halfWidth,planeY:t.planeY,color:t.color??this.kind(t.kind).color,age:0,growing:!0,tags:t.tags??[],born:this.clock};for(this.list.push(e),this.stats.spawned++;this.list.length>Math.max(1,this.cat.cap);)this.end(this.list[0],"evicted");return e}grow(t,e){t.growing&&this.list.includes(t)&&(t.sweep=Math.max(t.sweep,e))}finish(t){t.growing=!1}tick(t){this.clock+=t;for(const e of this.list.slice())e.growing||(e.age+=t,e.age>=this.kind(e.kind).life&&this.end(e,"timeout"))}life(t){return t.growing?1:Math.max(0,1-t.age/this.kind(t.kind).life)}consume(t,e=1,a={}){const i=[];for(const s of this.list.slice()){if(i.length>=e)break;s.growing||!t.includes(s.kind)||a.tag&&!s.tags.includes(a.tag)||(this.end(s,"consumed"),i.push({group:s,globs:J(s)}))}return i}available(t,e){return this.list.filter(a=>!a.growing&&t.includes(a.kind)&&(!e||a.tags.includes(e))).length}clear(){for(const t of this.list.slice())this.end(t,"cleared")}drain(){const t=this.ended;return this.ended=[],t}end(t,e){const a=this.list.indexOf(t);a<0||(this.list.splice(a,1),this.stats[e]++,this.ended.push({g:t,why:e}),this.ended.length>64&&this.ended.shift(),this.onEnd?.(t,e))}}function J(l,t=12){const e=Math.PI/180,a=[],i=Math.max(1,Math.round(t*Math.abs(l.sweep)/360));for(let s=0;s<i;s++){const o=l.a0-l.sweep*(i===1?.5:s/(i-1)),n=l.reach*(.45+.4*(s*.618%1)),h=l.yaw+o*e;a.push({x:l.x+Math.sin(h)*n,y:l.y+l.planeY,z:l.z+Math.cos(h)*n,size:.35+.25*(s*.37%1),color:l.color,kind:l.kind,from:l.id})}return a}const O=`
float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(h21(i), h21(i+vec2(1,0)), f.x), mix(h21(i+vec2(0,1)), h21(i+vec2(1,1)), f.x), f.y); }
`,b={kinds:["slice"],life:.78,foldSec:1.7,trailDeg:38,mergeDeg:5,toothSize:.9,toothDepth:.16,foldSkew:.22,toothChaos:.8,toothSkew:.85,shardPerP:280,shardLife:1.25,shardLift:4.2,shardSize:.42,shardDrift:1.6,emberWidth:.07,ember:"#8a5bff",body:.08,hot:.42,lip:.7,color:"#f2ecff",lipColor:"#ffffff"};function Q(l,t=b){return t.kinds.includes(l.kind)}function tt(l,t=b){return Math.max(.05,l.life*t.life)}function et(l,t,e=b){const a=tt(t,e),i=Math.min(e.foldSec,a),s=a-i;return Math.min(1,Math.max(0,(l-s)/Math.max(1e-6,i)))}function at(l,t,e,a=b){const i=a.toothDepth,s=a.foldSkew;return l*(1+i+s)-(i*(1-e)+s*(1-t))}function H(l,t){const e=o=>o-Math.floor(o);let a=e(l*123.34),i=e(t*456.21);const s=a*(a+45.32)+i*(i+45.32);return a+=s,i+=s,e(a*i)}function st(l,t,e=b){const a=Math.min(1,Math.max(0,e.toothChaos)),i=l/Math.max(.05,e.toothSize),s=i+a*(.35*Math.sin(i*.9+t)+.2*Math.sin(i*2.3+t*1.7)),o=s+.5-Math.floor(s+.5),n=Math.floor(s+.5),h=H(n,t),f=H(n+17.3,t+4.1),r=h<.12?1+a*(.12-1):h>.86?1:1+a*(.3+.7*h-1),d=.5+(.12+.76*f-.5)*Math.min(1,a*e.toothSkew);let u=o<d?o/d:(1-o)/(1-d);return u=Math.pow(Math.min(1,Math.max(0,u)),1+.9*a),Math.min(1,Math.max(0,u*r))}function it(l,t,e,a,i,s,o=b){const n=at(l,t,e,o);return{ok:n>0&&n<1,u:n,psi:i-n*a*Math.PI/180,r:t*s}}function ot(l,t,e=b){return Math.max(0,l)*e.shardPerP*Math.max(.2,t/180)}function nt(l,t,e,a,i=b){let s=l.growing?0:et(l.age,t,i),o=1;if(e>=0){const n=a?.12:.45,h=Math.max(0,1-e/n);s=Math.max(s,1-h),o=a?h:Math.min(1,h*2)}return{p:s,fade:o}}const A=4,w=720,rt=`
varying vec2 vW;
void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xz; gl_Position = projectionMatrix * viewMatrix * w; }
`,lt=`
#define SLOTS ${A}
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
`,ft=l=>[l.x,l.y,l.z,l.planeY].map(t=>Math.round(t*20)).join(",");class dt{constructor(t,e=b){this.field=t,this.P=e,this.group.name="whiteFieldFx";const a=t.onEnd;t.onEnd=(s,o)=>{a?.(s,o);const n=this.members.get(s.id);n&&o!=="timeout"&&(n.out=0,n.fast=o==="evicted"||o==="cleared")},this.shardGeo.setAttribute("position",new V(this.sPos,3).setUsage(B)),this.shardGeo.setAttribute("aData",new V(this.sData,4).setUsage(B)),this.shardMat=new C({vertexShader:ht,fragmentShader:ut,transparent:!0,depthWrite:!1,blending:M,uniforms:{uScale:{value:600},uInt:{value:1},uColor:{value:new p(e.lipColor)},uEmber:{value:new p(e.ember)}}});const i=new Y(this.shardGeo,this.shardMat);i.frustumCulled=!1,i.renderOrder=6,i.name="whiteShards",i.onBeforeRender=(s,o,n)=>{const h=s.getDrawingBufferSize(new K),f=n.fov||50;this.shardMat.uniforms.uScale.value=h.y*.5/Math.tan(f*Math.PI/360)},this.group.add(i)}group=new U;intensity=()=>1;members=new Map;planes=new Map;geo=new j(1,96).rotateX(-Math.PI/2);t=0;sPos=new Float32Array(w*3);sData=new Float32Array(w*4);sVel=new Float32Array(w*3);sLife=new Float32Array(w);sAge=new Float32Array(w);sSpin=new Float32Array(w);sNext=0;shardGeo=new I;shardMat;get shardCountAlive(){let t=0;for(let e=0;e<w;e++)this.sData[e*4+1]>0&&t++;return t}get count(){return this.members.size}get planeCount(){return this.planes.size}update(t){this.t+=t;const e=Math.max(0,Math.min(1,this.intensity()));this.group.visible=e>.001;for(const i of this.field.groups)Q(i,this.P)&&!this.members.has(i.id)&&this.members.set(i.id,{g:i,out:-1,fast:!1,lastP:0,carry:0});for(const[i,s]of this.members)if(s.out>=0){if(s.out+=t,s.out>=(s.fast?.12:.45)){this.members.delete(i);continue}}else this.field.groups.includes(s.g)||this.members.delete(i);const a=new Map;for(const i of this.members.values()){const s=ft(i.g);(a.get(s)??a.set(s,[]).get(s)).push(i)}for(const[i,s]of a)for(let o=0;o*A<s.length;o++)this.drawPlane(i+"#"+o,s.slice(o*A,(o+1)*A),e);for(const[i,s]of this.planes)this.used.has(i)||(this.group.remove(s.mesh),s.mat.dispose(),this.planes.delete(i));this.used.clear(),this.stepShards(t,e)}used=new Set;drawPlane(t,e,a){this.used.add(t);let i=this.planes.get(t);i||(i=this.makePlane(t),this.planes.set(t,i));const s=e[0].g,o=i.mat.uniforms,n=this.P;let h=0;for(let f=0;f<A;f++){const r=e[f],d=o.uA.value[f],u=o.uB.value[f];if(!r){d.set(0,0,0,0),u.set(0,0,0,0);continue}const c=r.g,g=this.field.kind(c.kind),v=nt(c,g,r.out,r.fast,n),m=c.id*7.31%17;d.set(c.yaw+c.a0*Math.PI/180,c.sweep,c.reach,v.fade),u.set(v.p,m,c.growing?1:0,0),h=Math.max(h,c.reach);const x=v.p-r.lastP;if(r.lastP=v.p,x>0&&v.p<1&&a>.001){r.carry+=ot(x,c.sweep,n)*a;for(let y=0;r.carry>=1&&y<40;y++,r.carry-=1)this.spawnShard(c,v.p,m)}}o.uPivot.value.set(s.x,s.z),o.uP0.value.set(n.trailDeg,n.mergeDeg,n.toothSize,n.toothDepth),o.uP1.value.set(n.foldSkew,n.body,n.hot,n.lip),o.uP2.value.set(n.toothChaos,n.toothSkew,n.emberWidth,0),o.uTime.value=this.t,o.uInt.value=a,i.mesh.position.set(s.x,s.y+s.planeY+.012,s.z),i.mesh.scale.setScalar(h+.5)}spawnShard(t,e,a){const i=this.P,s=t.yaw+t.a0*Math.PI/180;for(let o=0;o<8;o++){const n=.07+.9*Math.random(),h=n*t.reach,f=it(e,n,st(h,a,i),t.sweep,s,t.reach,i);if(!f.ok)continue;const r=Math.sin(f.psi),d=Math.cos(f.psi),u=this.sNext;this.sNext=(this.sNext+1)%w;const c=i.shardLife*(.6+.8*Math.random()),g=i.shardLift/i.shardLife*(.55+.9*Math.random())*1.25,v=i.shardDrift*(.3+Math.random()),m=(Math.random()-.4)*.7;this.sPos[u*3]=t.x+h*r,this.sPos[u*3+1]=t.y+t.planeY+.05,this.sPos[u*3+2]=t.z+h*d,this.sVel[u*3]=-d*v+r*m+(Math.random()-.5)*.5,this.sVel[u*3+1]=g,this.sVel[u*3+2]=r*v+d*m+(Math.random()-.5)*.5,this.sLife[u]=c,this.sAge[u]=0,this.sSpin[u]=(Math.random()-.5)*7;const x=Math.random();this.sData[u*4]=0,this.sData[u*4+1]=i.shardSize*(.4+1.3*x*x),this.sData[u*4+2]=Math.random()*6.28,this.sData[u*4+3]=Math.random();return}}stepShards(t,e){this.shardMat.uniforms.uInt.value=e;for(let a=0;a<w;a++){if(this.sData[a*4+1]<=0)continue;if(this.sAge[a]+=t,this.sAge[a]>=this.sLife[a]){this.sData[a*4+1]=0;continue}const i=this.sAge[a]/this.sLife[a],s=Math.max(0,1-.9*t),o=Math.sin(this.t*3+this.sData[a*4+3]*40)*.9*t;this.sVel[a*3]=this.sVel[a*3]*s+o,this.sVel[a*3+1]*=1-.45*t,this.sVel[a*3+2]=this.sVel[a*3+2]*s-o,this.sPos[a*3]+=this.sVel[a*3]*t,this.sPos[a*3+1]+=this.sVel[a*3+1]*t,this.sPos[a*3+2]+=this.sVel[a*3+2]*t,this.sData[a*4]=i,this.sData[a*4+2]+=this.sSpin[a]*t}this.shardGeo.attributes.position.needsUpdate=!0,this.shardGeo.attributes.aData.needsUpdate=!0}makePlane(t){const e=this.P,a=()=>Array.from({length:A},()=>new F),i=new C({vertexShader:rt,fragmentShader:lt,transparent:!0,depthWrite:!1,side:W,blending:M,uniforms:{uTime:{value:0},uInt:{value:1},uPivot:{value:new K},uA:{value:a()},uB:{value:a()},uP0:{value:new F(e.trailDeg,e.mergeDeg,e.toothSize,e.toothDepth)},uP1:{value:new F(e.foldSkew,e.body,e.hot,e.lip)},uP2:{value:new F(e.toothChaos,e.toothSkew,e.emberWidth,0)},uColor:{value:new p(e.color)},uLipColor:{value:new p(e.lipColor)},uEmber:{value:new p(e.ember)}}}),s=new k(this.geo,i);return s.frustumCulled=!1,s.renderOrder=5,this.group.add(s),{key:t,mesh:s,mat:i}}dispose(){for(const t of this.planes.values())this.group.remove(t.mesh),t.mat.dispose();this.planes.clear(),this.members.clear(),this.geo.dispose(),this.shardGeo.dispose(),this.shardMat.dispose()}}const ct=`
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,mt=`
uniform float uTime; uniform vec3 uColor; uniform vec3 uAccent; uniform float uK; uniform float uSeed;
uniform float uReach; uniform float uPhi; uniform float uHalf; uniform float uGap; uniform float uSpeed;
varying vec2 vUv;
${O}
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
`,G=120,P=8;function gt(l){const t=[],e=[],a=[],i=[];for(let o=0;o<=G;o++)for(let n=0;n<=P;n++){const h=o/G*360,f=-h*Math.PI/180,r=l+(1-l)*(n/P);t.push(Math.sin(f)*r,0,Math.cos(f)*r),e.push(h),a.push(n/P)}for(let o=0;o<G;o++)for(let n=0;n<P;n++){const h=o*(P+1)+n,f=h+P+1;i.push(h,f,h+1,f,f+1,h+1)}const s=new I;return s.setAttribute("position",new z(t,3)),s.setAttribute("aAng",new z(e,1)),s.setAttribute("aRad",new z(a,1)),s.setIndex(i),s}class Mt{constructor(t){this.field=t,this.group.name="lingerFx",this.group.renderOrder=4;const e=t.onEnd;t.onEnd=(a,i)=>{e?.(a,i);const s=this.slices.get(a.id);s&&(s.out=0,s.fast=i==="evicted"||i==="cleared")},this.white=new dt(t),this.group.add(this.white.group)}group=new U;geo=gt(.06);slices=new Map;t=0;white;set intensity(t){this.white.intensity=t}get count(){return this.slices.size}update(t){this.t+=t,this.white.update(t);for(const e of this.field.groups){let a=this.slices.get(e.id);a||(a=this.make(e),this.slices.set(e.id,a));const i=this.field.kind(e.kind),s=this.field.life(e),o=e.growing?1:Math.min(1,Math.max(0,(i.life-e.age)/Math.max(.05,i.fade)));a.mat.uniforms.uSweep.value=e.sweep+(e.growing?3:0),a.mat.uniforms.uLife.value=s,a.mat.uniforms.uFade.value=o,a.mat.uniforms.uGrow.value=e.growing?1:Math.max(0,1-e.age*1.5),a.mat.uniforms.uTime.value=this.t}for(const[e,a]of this.slices){if(a.out<0)continue;a.out+=t;const i=a.fast?.12:.45,s=Math.max(0,1-a.out/i);a.mat.uniforms.uFade.value=Math.min(a.mat.uniforms.uFade.value,s),a.mat.uniforms.uLife.value=Math.min(a.mat.uniforms.uLife.value,.25+.75*s),s<=0&&(this.drop(a),this.slices.delete(e))}for(const[e,a]of this.slices)a.out<0&&!this.field.groups.includes(a.g)&&(this.drop(a),this.slices.delete(e))}make(t){const e=new C({vertexShader:pt,fragmentShader:vt,transparent:!0,depthWrite:!1,side:W,blending:M,uniforms:{uTime:{value:0},uSweep:{value:0},uLife:{value:1},uFade:{value:1},uGrow:{value:1},uSeed:{value:t.id*7.31%17},uColor:{value:new p(t.color)},uAccent:{value:new p("#f2e4ff")}}}),a=new k(this.geo,e);return a.position.set(t.x,t.y+t.planeY,t.z),a.rotation.y=t.yaw+t.a0*Math.PI/180,a.scale.setScalar(t.reach),a.frustumCulled=!1,a.renderOrder=4,this.group.add(a),{mesh:a,mat:e,g:t,out:-1,fast:!1}}drop(t){this.group.remove(t.mesh),t.mat.dispose()}dispose(){for(const t of this.slices.values())this.drop(t);this.slices.clear(),this.geo.dispose(),this.white.dispose()}}const D=36,L={phi:.36,gap:2.4,speed:15};function wt(){const e=[],a=[],i=[];for(let o=0;o<=36;o++)for(let n=0;n<=14;n++){const h=o/36,f=n/14*2-1,r=f*L.phi;e.push(h*Math.cos(r),h*Math.sin(r),0),a.push(h,(f+1)/2)}for(let o=0;o<36;o++)for(let n=0;n<14;n++){const h=o*15+n,f=h+14+1;i.push(h,f,h+1,f,f+1,h+1)}const s=new I;return s.setAttribute("position",new z(e,3)),s.setAttribute("uv",new z(a,2)),s.setIndex(i),s}class yt{group=new U;v=null;t=0;beams=[];beamMat;palmMat;flow;flowPos;flowMat;orb;ring;fade=0;constructor(){this.group.name="rotorFx",this.group.visible=!1,this.beamMat=new C({vertexShader:ct,fragmentShader:mt,transparent:!0,depthWrite:!1,side:W,blending:M,uniforms:{uTime:{value:0},uColor:{value:new p("#a04bff")},uAccent:{value:new p("#e9d4ff")},uK:{value:0},uSeed:{value:3},uReach:{value:11},uPhi:{value:L.phi},uHalf:{value:.55},uGap:{value:L.gap},uSpeed:{value:L.speed}}}),this.palmMat=this.beamMat.clone(),this.palmMat.uniforms=N.clone(this.beamMat.uniforms),this.palmMat.uniforms.uSeed.value=11;const t=wt();for(const a of[this.beamMat,this.palmMat]){const i=new k(t,a),s=new k(t,a);for(const o of[i,s])o.frustumCulled=!1,o.renderOrder=6,this.group.add(o),this.beams.push(o)}this.flowPos=new Float32Array(D*3);const e=new I;e.setAttribute("position",new V(this.flowPos,3)),e.setAttribute("aU",new z(Array.from({length:D},(a,i)=>i/D),1)),this.flowMat=new C({vertexShader:"attribute float aU; uniform float uSize; uniform float uK; varying float vU; void main(){ vU = aU; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = uSize * uK * (0.6 + 0.8*fract(aU*7.0)) * (260.0 / -mv.z); gl_Position = projectionMatrix * mv; }",fragmentShader:"uniform vec3 uColor; uniform vec3 uAccent; uniform float uK; varying float vU; void main(){ vec2 d = gl_PointCoord - 0.5; float r = length(d); float a = smoothstep(0.5, 0.0, r); gl_FragColor = vec4(mix(uColor, uAccent, a*a), a * uK); }",transparent:!0,depthWrite:!1,blending:M,uniforms:{uSize:{value:.22},uK:{value:0},uColor:{value:new p("#a04bff")},uAccent:{value:new p("#e9d4ff")}}}),this.flow=new Y(e,this.flowMat),this.flow.frustumCulled=!1,this.flow.renderOrder=6,this.group.add(this.flow),this.orb=new k(new $(1,14,10),new q({color:"#e9d4ff",transparent:!0,opacity:.8,blending:M,depthWrite:!1})),this.ring=new k(new X(.7,1,40).rotateX(-Math.PI/2),new q({color:"#a04bff",transparent:!0,opacity:.7,blending:M,depthWrite:!1,side:W}));for(const a of[this.orb,this.ring])a.frustumCulled=!1,a.renderOrder=6,this.group.add(a)}frame(t){this.v=t,t&&(this.fade=1)}get active(){return!!this.v}update(t){this.t+=t;const e=this.v;if(!e){if(this.fade=Math.max(0,this.fade-t*6),this.group.visible=this.fade>0,this.beamMat.uniforms.uK.value*=this.fade,this.palmMat.uniforms.uK.value*=this.fade,!this.group.visible)return;this.flowMat.uniforms.uK.value*=this.fade;return}this.group.visible=!0;const a=new p(e.color),i=new p(e.accent);for(const r of[this.beamMat,this.palmMat])r.uniforms.uColor.value.copy(a),r.uniforms.uAccent.value.copy(i),r.uniforms.uTime.value=this.t;this.flowMat.uniforms.uColor.value.copy(a),this.flowMat.uniforms.uAccent.value.copy(i);const s=e.pivot.y+e.planeY;[{on:e.beamOn?e.beamK:0,yaw:e.beamYaw,mat:this.beamMat},{on:e.palmOn?e.palmK:0,yaw:e.palmYaw,mat:this.palmMat}].forEach((r,d)=>{r.mat.uniforms.uK.value=r.on;for(let u=0;u<2;u++){const c=this.beams[d*2+u];c.visible=r.on>.01,c.position.set(e.pivot.x+Math.sin(r.yaw)*.35,s,e.pivot.z+Math.cos(r.yaw)*.35),c.rotation.set(u===0?-Math.PI/2:0,r.yaw,0,"YXZ"),c.rotation.y=r.yaw-Math.PI/2;const g=Math.max(.01,e.reach*r.on-.35);c.scale.set(g,g,1),r.mat.uniforms.uReach.value=g,r.mat.uniforms.uHalf.value=e.halfWidth}});const n=e.phase==="spin"&&e.stage===1,h=e.phase==="charge"?Math.min(1,e.flow*1.6):n?.7*(1-e.lift):0;if(this.flowMat.uniforms.uK.value=h,this.flow.visible=h>.01&&!!e.palm&&!!e.neck&&!!e.beamHand,this.flow.visible){const r=e.palm,d=e.neck,u=e.beamHand,c=Math.hypot(d.x-r.x,d.y-r.y,d.z-r.z),g=Math.hypot(u.x-d.x,u.y-d.y,u.z-d.z),v=Math.max(.001,c+g);for(let m=0;m<D;m++){const x=((m/D-this.t*(.9+.8*e.flow))%1+1)%1,y=x*v,R=y<c,_=R?y/Math.max(.001,c):(y-c)/Math.max(.001,g),S=R?r:d,E=R?d:u,T=.09*Math.sin(this.t*17+m*2.3)*(1-e.flow*.5);this.flowPos[m*3]=S.x+(E.x-S.x)*_+T,this.flowPos[m*3+1]=S.y+(E.y-S.y)*_+T*.6,this.flowPos[m*3+2]=S.z+(E.z-S.z)*_-T}this.flow.geometry.getAttribute("position").needsUpdate=!0}const f=e.phase==="charge"||e.lift<.5;if(this.ring.visible=f&&!!e.palm&&e.phase!=="recover",this.ring.visible){const r=e.palm,d=this.t*2.2%1;this.ring.position.set(r.x,e.pivot.y+.04,r.z),this.ring.scale.setScalar(.35+d*(.6+.9*e.flow)),this.ring.material.opacity=(1-d)*.7*(e.phase==="charge"?e.flow+.2:1-e.lift*2)}if(this.orb.visible=e.phase==="charge"&&!!e.beamHand,this.orb.visible){const r=e.beamHand;this.orb.position.set(r.x,r.y,r.z),this.orb.scale.setScalar(.06+.2*e.flow*(.9+.1*Math.sin(this.t*30)))}}dispose(){this.group.traverse(t=>{const e=t;e.geometry?.dispose(),e.material?.dispose?.()})}}export{Mt as L,yt as R,b as W,xt as a,Z as b,tt as w};
