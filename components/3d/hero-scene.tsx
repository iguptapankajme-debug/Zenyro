"use client";

/* Three.js meshes, materials and scratch vectors are mutated inside the render loop on purpose:
   that is how React Three Fiber animates without re-rendering React. The React Compiler lint
   rules below assume immutable values, so they are disabled for this file only. */
/* eslint-disable react-hooks/immutability, react-hooks/use-memo */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { heroState } from "./hero-state";
import { SparkField } from "./spark-field";

type Tier = "high" | "low";

/*
  The kinetic sculpture: 27 brushed-titanium beams drawn as one instanced mesh, around a
  liquid-chrome core whose surface flows with noise.
  Each beam has a target pose in three layouts and is interpolated between them:
    BUILD   – an interlocking tower, three beams per floor, floors rotated 90°.
    GROW    – the tower opens into a lattice on a sphere, beams linked to their neighbours.
    CONVERT – the beams converge into a tilted ring around a calm, polished core with one orbiting
              node: the Zenyro mark.
  On load the beams fly in from an exploded layout and an orange light sweeps through them;
  the sweep runs again on every stage change.
  Scroll sets the target state (0–2); the scene eases toward it every frame.
*/

const N = 27;
const BEAM = new THREE.Vector3(1.26, 0.16, 0.34);

type Pose = { p: THREE.Vector3; q: THREE.Quaternion; s: THREE.Vector3 };

function buildLayouts() {
  const build: Pose[] = [];
  const grow: Pose[] = [];
  const convert: Pose[] = [];
  const e = new THREE.Euler();

  for (let i = 0; i < N; i++) {
    // BUILD: Jenga-like tower
    const floor = Math.floor(i / 3);
    const slot = (i % 3) - 1;
    const alongX = floor % 2 === 0;
    build.push({
      p: new THREE.Vector3(alongX ? 0 : slot * 0.4, (floor - 4) * 0.19, alongX ? slot * 0.4 : 0),
      q: new THREE.Quaternion().setFromEuler(e.set(0, alongX ? 0 : Math.PI / 2, 0)),
      s: new THREE.Vector3(1, 1, 1),
    });

    // GROW: Fibonacci sphere, beams tangent to the surface
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = i * Math.PI * (3 - Math.sqrt(5));
    const pos = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(1.7);
    const normal = pos.clone().normalize();
    const tangent = new THREE.Vector3(0, 1, 0).cross(normal).normalize();
    if (tangent.lengthSq() < 0.01) tangent.set(1, 0, 0);
    const m = new THREE.Matrix4().lookAt(new THREE.Vector3(), tangent, normal);
    grow.push({ p: pos, q: new THREE.Quaternion().setFromRotationMatrix(m).multiply(new THREE.Quaternion().setFromEuler(e.set(0, Math.PI / 2, 0))), s: new THREE.Vector3(0.62, 0.7, 0.55) });

    // CONVERT: tilted ring around the core
    const a = (i / N) * Math.PI * 2;
    const ring = new THREE.Vector3(Math.cos(a) * 1.2, Math.sin(a) * 1.2, 0).applyEuler(e.set(1.05, 0.2, 0.15));
    const ringQ = new THREE.Quaternion().setFromEuler(e.set(1.05, 0.2, 0.15)).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, a + Math.PI / 2)));
    convert.push({ p: ring, q: ringQ, s: new THREE.Vector3(0.36, 0.55, 0.42) });
  }

  // Lattice links for GROW: each beam to its two nearest neighbours
  const pairs: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    const d = grow
      .map((g, j) => [j, g.p.distanceTo(grow[i]!.p)] as const)
      .filter(([j]) => j !== i)
      .sort((x, y) => x[1] - y[1]);
    for (const [j] of d.slice(0, 2)) if (!pairs.some(([a, b]) => (a === i && b === j) || (a === j && b === i))) pairs.push([i, j]);
  }
  return { layouts: [build, grow, convert], pairs };
}

/** Procedural brushed-metal roughness: fine horizontal streaks, generated once on a small canvas. */
function brushedTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 64;
  const g = c.getContext("2d")!;
  g.fillStyle = "#777";
  g.fillRect(0, 0, 256, 64);
  for (let y = 0; y < 64; y++) {
    const v = 100 + Math.floor(Math.random() * 70);
    g.fillStyle = `rgba(${v},${v},${v},0.55)`;
    g.fillRect(0, y, 256, 1);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.NoColorSpace;
  return t;
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);

/* ---------- Shader patches ---------- */

// Ashima 3D simplex noise (MIT), used to move the liquid-metal surface.
const SNOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

/** Titanium beams with an orange light band that can travel through the structure (local y). */
function patchBeams(mat: THREE.MeshPhysicalMaterial, u: { uSweep: { value: number }; uSweepAmt: { value: number } }) {
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u);
    sh.vertexShader = sh.vertexShader
      .replace("void main() {", "varying float vLY;\nvoid main() {")
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
        #ifdef USE_INSTANCING
          vLY = (instanceMatrix * vec4(transformed, 1.0)).y;
        #else
          vLY = transformed.y;
        #endif`,
      );
    sh.fragmentShader = sh.fragmentShader
      .replace("void main() {", "varying float vLY;\nuniform float uSweep;\nuniform float uSweepAmt;\nvoid main() {")
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
        totalEmissiveRadiance += vec3(1.0, 0.36, 0.14) * uSweepAmt * exp(-pow((vLY - uSweep) * 4.0, 2.0));`,
      );
  };
  mat.customProgramCacheKey = () => "zenyro-beam";
}

/** Liquid chrome: the sphere's surface flows with layered noise; normals are rebuilt from neighbours. */
function patchLiquid(mat: THREE.MeshPhysicalMaterial, u: { uTime: { value: number }; uAmp: { value: number }; uRim: { value: number } }) {
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u);
    sh.vertexShader = sh.vertexShader
      .replace(
        "void main() {",
        `uniform float uTime;
        uniform float uAmp;
        ${SNOISE}
        vec3 zLiquid(vec3 p) {
          vec3 q = p * 1.7;
          float n = snoise(q + vec3(0.0, uTime * 0.32, uTime * 0.18)) + 0.45 * snoise(q * 2.2 - vec3(uTime * 0.27));
          return p + normalize(p) * n * uAmp;
        }
        void main() {`,
      )
      .replace(
        "#include <beginnormal_vertex>",
        `vec3 zP = zLiquid(position);
        vec3 zN0 = normalize(position);
        vec3 zT = normalize(abs(zN0.y) > 0.98 ? cross(zN0, vec3(1.0, 0.0, 0.0)) : cross(zN0, vec3(0.0, 1.0, 0.0)));
        vec3 zB = cross(zN0, zT);
        float zE = 0.012;
        vec3 objectNormal = normalize(cross(zLiquid(position + zT * zE) - zP, zLiquid(position + zB * zE) - zP));
        if (dot(objectNormal, zN0) < 0.0) objectNormal = -objectNormal;
        #ifdef USE_TANGENT
          vec3 objectTangent = vec3(tangent.xyz);
        #endif`,
      )
      .replace("#include <begin_vertex>", "vec3 transformed = zP;");
    sh.fragmentShader = sh.fragmentShader
      .replace("void main() {", "uniform float uRim;\nvoid main() {")
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
        float zF = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 3.0);
        totalEmissiveRadiance += vec3(1.0, 0.42, 0.21) * zF * uRim;`,
      );
  };
  mat.customProgramCacheKey = () => "zenyro-liquid";
}

/** Network links with pulses of orange energy travelling along each connection. */
const linkVert = /* glsl */ `
attribute float aT;
attribute float aOff;
varying float vT;
varying float vOff;
void main() { vT = aT; vOff = aOff; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const linkFrag = /* glsl */ `
uniform float uTime;
uniform float uOpacity;
varying float vT;
varying float vOff;
void main() {
  float p = fract(uTime * 0.42 + vOff);
  float g = exp(-pow((vT - p) * 8.0, 2.0));
  vec3 col = mix(vec3(1.0, 0.42, 0.21) * 0.6, vec3(1.0, 0.8, 0.62), g);
  gl_FragColor = vec4(col, uOpacity * (0.18 + 1.4 * g));
}`;

function Sculpture({ tier }: { tier: Tier }) {
  const { layouts, pairs } = useMemo(buildLayouts, []);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const links = useRef<THREE.LineSegments>(null);
  const core = useRef<THREE.Mesh>(null);
  const node = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  const group = useRef<THREE.Group>(null);
  const state = useRef({ value: 0, intro: 0, sweep: 1, stage: 0, swept: false });
  const pointer = useRef({ x: 0, y: 0 });

  const res = useMemo(() => {
    const rough = brushedTexture();
    const beamU = { uSweep: { value: -3 }, uSweepAmt: { value: 0 } };
    const liquidU = { uTime: { value: 0 }, uAmp: { value: 0.16 }, uRim: { value: 0.4 } };
    const beamMat = new THREE.MeshPhysicalMaterial({
      color: "#3b3f47",
      metalness: 1,
      roughness: 0.3,
      roughnessMap: rough,
      anisotropy: tier === "high" ? 0.75 : 0,
      clearcoat: 0.6,
      clearcoatRoughness: 0.18,
    });
    patchBeams(beamMat, beamU);
    const coreMat = new THREE.MeshPhysicalMaterial({ color: "#9a9ea6", metalness: 1, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.05 });
    patchLiquid(coreMat, liquidU);
    const seg = tier === "high" ? 128 : 72;
    const linkGeo = new THREE.BufferGeometry();
    linkGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pairs.length * 6), 3));
    linkGeo.setAttribute("aT", new THREE.BufferAttribute(Float32Array.from(pairs.flatMap(() => [0, 1])), 1));
    linkGeo.setAttribute("aOff", new THREE.BufferAttribute(Float32Array.from(pairs.flatMap((_, k) => { const o = (k * 0.618) % 1; return [o, o]; })), 1));
    const linkU = { uTime: { value: 0 }, uOpacity: { value: 0 } };
    return {
      rough, beamU, liquidU, linkU,
      beamGeo: new RoundedBoxGeometry(BEAM.x, BEAM.y, BEAM.z, 3, 0.05),
      beamMat,
      linkGeo,
      linkMat: new THREE.ShaderMaterial({ vertexShader: linkVert, fragmentShader: linkFrag, uniforms: linkU, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
      coreGeo: new THREE.SphereGeometry(0.5, seg, seg),
      coreMat,
      nodeGeo: new THREE.SphereGeometry(0.06, 24, 24),
      nodeMat: new THREE.MeshBasicMaterial({ color: "#ff6b35", toneMapped: false }),
      haloGeo: new THREE.TorusGeometry(1.46, 0.004, 6, 160),
      haloMat: new THREE.MeshBasicMaterial({ color: "#f7f7f5", transparent: true, opacity: 0, toneMapped: false }),
    };
  }, [pairs, tier]);

  useEffect(
    () => () => {
      [res.beamGeo, res.linkGeo, res.coreGeo, res.nodeGeo, res.haloGeo].forEach((g) => g.dispose());
      [res.beamMat, res.linkMat, res.coreMat, res.nodeMat, res.haloMat].forEach((m) => m.dispose());
      res.rough.dispose();
    },
    [res],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Exploded starting poses for the intro: each beam begins scattered and turned, then assembles.
  const scatter = useMemo(() => {
    const e = new THREE.Euler();
    return Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * 2.399963;
      return {
        p: new THREE.Vector3(Math.cos(th) * r, y * 0.8, Math.sin(th) * r).multiplyScalar(2.5),
        q: new THREE.Quaternion().setFromEuler(e.set(i * 1.3, i * 0.7, i * 2.1)),
      };
    });
  }, []);

  const tmp = useMemo(() => ({ m: new THREE.Matrix4(), p: new THREE.Vector3(), q: new THREE.Quaternion(), s: new THREE.Vector3(), a: new THREE.Vector3() }), []);
  const positions = useMemo(() => Array.from({ length: N }, () => new THREE.Vector3()), []);
  const beamValues = useRef(new Float32Array(N));
  const ringEuler = useMemo(() => new THREE.Euler(1.05, 0.2, 0.15), []);

  useFrame((frame, delta) => {
    const dt = Math.min(delta, 0.05);
    const st = state.current;
    st.intro = Math.min(st.intro + dt / 2.4, 1);
    st.value += (heroState.target - st.value) * (1 - Math.exp(-dt * 3.2));
    const t = frame.clock.elapsedTime;
    const v = st.value;

    // Light sweep: once the beams have assembled, and again whenever the stage changes.
    const stage = Math.round(heroState.target);
    if (!st.swept && st.intro > 0.72) { st.swept = true; st.sweep = 0; }
    if (stage !== st.stage) { st.stage = stage; if (st.swept) st.sweep = 0; }
    st.sweep = Math.min(st.sweep + dt / 1.5, 1);
    res.beamU.uSweep.value = -2.4 + st.sweep * 4.8;
    res.beamU.uSweepAmt.value = Math.sin(st.sweep * Math.PI) * 2.4;

    for (let i = 0; i < N; i++) {
      // Each beam eases at its own rate, so a transition ripples through the structure.
      const bv = beamValues.current;
      bv[i] = bv[i]! + (heroState.target - bv[i]!) * (1 - Math.exp(-dt * (1.8 + (i % 9) * 0.32)));
      const local = Math.min(Math.max(bv[i]!, 0), 2);
      const seg = Math.min(Math.floor(local), 1);
      const k = smooth(clamp01(local - seg));
      const A = layouts[seg]![i]!;
      const B = layouts[seg + 1]![i]!;
      tmp.p.lerpVectors(A.p, B.p, k);
      tmp.q.slerpQuaternions(A.q, B.q, k);
      tmp.s.lerpVectors(A.s, B.s, k);

      // Intro: components fly in from an exploded layout and lock into formation, floor by floor.
      const ik = 1 - Math.pow(1 - clamp01(st.intro * 1.5 - (i / N) * 0.5), 3);
      if (ik < 1) {
        tmp.p.lerpVectors(scatter[i]!.p, tmp.p, ik);
        tmp.q.slerpQuaternions(scatter[i]!.q, tmp.q, ik);
        tmp.s.multiplyScalar(0.2 + ik * 0.8);
      }

      // Gentle breathing, strongest while the network is open.
      const growW = Math.max(0, 1 - Math.abs(v - 1));
      tmp.p.addScaledVector(tmp.a.copy(A.p).normalize(), Math.sin(t * 0.9 + i) * 0.04 * growW);

      positions[i]!.copy(tmp.p);
      tmp.m.compose(tmp.p, tmp.q, tmp.s);
      mesh.current!.setMatrixAt(i, tmp.m);
    }
    mesh.current!.instanceMatrix.needsUpdate = true;

    // Network links carry pulses while the system is expanded.
    const growW = Math.max(0, 1 - Math.abs(v - 1) * 1.4);
    const pos = links.current!.geometry.attributes.position as THREE.BufferAttribute;
    pairs.forEach(([a, b], k) => {
      pos.setXYZ(k * 2, positions[a]!.x, positions[a]!.y, positions[a]!.z);
      pos.setXYZ(k * 2 + 1, positions[b]!.x, positions[b]!.y, positions[b]!.z);
    });
    pos.needsUpdate = true;
    res.linkU.uOpacity.value = growW * 0.9;
    res.linkU.uTime.value = t;

    // Liquid core: hidden in the tower, a molten heart in the network, a calm polished sphere at Convert.
    const buildW = Math.max(0, 1 - v);
    const convertW = smooth(clamp01(v - 1));
    const coreIntro = smooth(clamp01((st.intro - 0.45) / 0.55));
    res.liquidU.uTime.value = t;
    res.liquidU.uAmp.value = 0.05 + growW * 0.17 + buildW * 0.08 - convertW * 0.03;
    res.liquidU.uRim.value = 0.25 + growW * 0.55 + convertW * 0.35;
    core.current!.scale.setScalar(coreIntro * (0.55 + growW * 0.75 + convertW * 0.85));
    core.current!.rotation.y = t * 0.15;

    // At Convert the ring gains its orbiting node: the Zenyro mark, in metal.
    const ang = t * 0.9;
    node.current!.position.set(Math.cos(ang) * 1.46, Math.sin(ang) * 1.46, 0).applyEuler(ringEuler);
    node.current!.scale.setScalar(convertW);
    res.haloMat.opacity = convertW * 0.28;
    light.current!.intensity = 1.2 + growW * 2.5 + convertW * 5 + Math.sin(st.sweep * Math.PI) * 4;

    // Pointer parallax with damping, never more than a few degrees, settling back to rest.
    const g = group.current!;
    g.scale.setScalar(1 + buildW * 0.42 + convertW * 0.22);
    g.rotation.y += (pointer.current.x * 0.3 + t * 0.05 - g.rotation.y) * 0.05;
    g.rotation.x += (pointer.current.y * 0.15 + 0.12 - g.rotation.x) * 0.05;
    frame.camera.position.x += (pointer.current.x * 0.3 - frame.camera.position.x) * 0.04;
    frame.camera.position.y += (-pointer.current.y * 0.22 - frame.camera.position.y) * 0.04;
    frame.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <directionalLight position={[4, 5, 6]} intensity={1.2} />
      <directionalLight position={[-5, -2, -3]} intensity={0.4} color="#9aa3b5" />
      <directionalLight position={[0, -4, 2]} intensity={0.6} color="#ff6b35" />
      <pointLight ref={light} position={[0, 0, 0]} color="#ff6b35" intensity={2} distance={6} decay={2} />
      <group ref={group}>
        <instancedMesh ref={mesh} args={[res.beamGeo, res.beamMat, N]} frustumCulled={false} />
        <lineSegments ref={links} geometry={res.linkGeo} material={res.linkMat} frustumCulled={false} />
        <mesh ref={core} geometry={res.coreGeo} material={res.coreMat} scale={0} />
        <mesh ref={halo} geometry={res.haloGeo} material={res.haloMat} rotation={[1.05, 0.2, 0.15]} />
        <mesh ref={node} geometry={res.nodeGeo} material={res.nodeMat} scale={0} />
      </group>
    </>
  );
}

function StudioEnvironment() {
  const get = useThree((s) => s.get);
  useEffect(() => {
    const { gl, scene } = get();
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.75;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [get]);
  return null;
}

/** Demand-driven render loop: full rate on capable devices, 30fps on lighter ones, none when hidden. */
function Driver({ tier, visible }: { tier: Tier; visible: React.RefObject<boolean> }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    let raf = 0, last = 0;
    const interval = tier === "high" ? 0 : 1000 / 30;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible.current || document.hidden) return;
      if (t - last >= interval) {
        last = t;
        invalidate();
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [invalidate, tier, visible]);
  return null;
}

export default function HeroScene({ tier, onReady }: { tier: Tier; onReady: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      visible.current = !!e?.isIntersecting;
    });
    io.observe(wrap.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop="demand"
        dpr={tier === "high" ? [1, 1.75] : 1}
        camera={{ position: [0, 0, 6.2], fov: 34 }}
        gl={{ antialias: tier === "high", alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
          requestAnimationFrame(onReady);
        }}
      >
        <StudioEnvironment />
        <Sculpture tier={tier} />
        <SparkField tier={tier} />
        <Driver tier={tier} visible={visible} />
      </Canvas>
    </div>
  );
}
