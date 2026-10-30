"use client";

/* Three.js meshes, materials and scratch vectors are mutated inside the render loop on purpose:
   that is how React Three Fiber animates without re-rendering React. The React Compiler lint
   rules below assume immutable values, so they are disabled for this file only. */
/* eslint-disable react-hooks/immutability, react-hooks/use-memo */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { heroState } from "./hero-state";
import { SparkField } from "./spark-field";

type Tier = "high" | "low";

/*
  The kinetic sculpture: 27 brushed-metal beams drawn as one instanced mesh.
  Each beam has a target pose in three layouts and is interpolated between them:
    BUILD   – an interlocking tower, three beams per floor, floors rotated 90°.
    GROW    – the tower opens into a lattice on a sphere, beams linked to their neighbours.
    CONVERT – the beams converge into a tilted ring around a luminous orange core.
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
    const pos = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(1.85);
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

function Sculpture({ tier }: { tier: Tier }) {
  const { layouts, pairs } = useMemo(buildLayouts, []);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const links = useRef<THREE.LineSegments>(null);
  const core = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  const group = useRef<THREE.Group>(null);
  const state = useRef({ value: 0, intro: 0 });
  const pointer = useRef({ x: 0, y: 0 });

  const { beamGeo, beamMat, linkGeo, linkMat, coreGeo, coreMat, haloGeo, haloMat, rough } = useMemo(() => {
    const rough = brushedTexture();
    return {
      rough,
      beamGeo: new THREE.BoxGeometry(BEAM.x, BEAM.y, BEAM.z, 1, 1, 1),
      beamMat: new THREE.MeshPhysicalMaterial({
        color: "#4a4e56",
        metalness: 1,
        roughness: 0.38,
        roughnessMap: rough,
        anisotropy: tier === "high" ? 0.7 : 0,
        clearcoat: 0.25,
        clearcoatRoughness: 0.4,
      }),
      linkGeo: (() => {
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pairs.length * 6), 3));
        return g;
      })(),
      linkMat: new THREE.LineBasicMaterial({ color: "#ff6b35", transparent: true, opacity: 0 }),
      coreGeo: new THREE.IcosahedronGeometry(0.42, tier === "high" ? 2 : 1),
      coreMat: new THREE.MeshStandardMaterial({ color: "#ff6b35", emissive: "#ff6b35", emissiveIntensity: 0, metalness: 0.2, roughness: 0.35, flatShading: true }),
      haloGeo: new THREE.RingGeometry(0.62, 0.64, 96),
      haloMat: new THREE.MeshBasicMaterial({ color: "#ff6b35", transparent: true, opacity: 0, side: THREE.DoubleSide, toneMapped: false }),
    };
  }, [pairs.length, tier]);

  useEffect(
    () => () => {
      [beamGeo, linkGeo, coreGeo, haloGeo].forEach((g) => g.dispose());
      [beamMat, linkMat, coreMat, haloMat].forEach((m) => m.dispose());
      rough.dispose();
    },
    [beamGeo, beamMat, linkGeo, linkMat, coreGeo, coreMat, haloGeo, haloMat, rough],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const tmp = useMemo(() => ({ m: new THREE.Matrix4(), p: new THREE.Vector3(), q: new THREE.Quaternion(), s: new THREE.Vector3(), a: new THREE.Vector3(), b: new THREE.Vector3() }), []);
  const positions = useMemo(() => Array.from({ length: N }, () => new THREE.Vector3()), []);
  const beamValues = useRef(new Float32Array(N));

  useFrame((frame, delta) => {
    const dt = Math.min(delta, 0.05);
    const st = state.current;
    st.intro = Math.min(st.intro + dt / 1.8, 1);
    st.value += (heroState.target - st.value) * (1 - Math.exp(-dt * 3.2));
    const t = frame.clock.elapsedTime;
    const v = st.value;

    for (let i = 0; i < N; i++) {
      // Each beam eases at its own rate, so a transition ripples through the structure.
      const bv = beamValues.current;
      bv[i] = bv[i]! + (heroState.target - bv[i]!) * (1 - Math.exp(-dt * (1.8 + (i % 9) * 0.32)));
      const local = Math.min(Math.max(bv[i]!, 0), 2);
      const seg = Math.min(Math.floor(local), 1);
      const k = smooth(Math.min(Math.max(local - seg, 0), 1));
      const A = layouts[seg]![i]!;
      const B = layouts[seg + 1]![i]!;
      tmp.p.lerpVectors(A.p, B.p, k);
      tmp.q.slerpQuaternions(A.q, B.q, k);
      tmp.s.lerpVectors(A.s, B.s, k);

      // Intro: beams slide in from above, floor by floor.
      const introK = smooth(Math.min(Math.max(st.intro * 1.6 - (i / N) * 0.6, 0), 1));
      tmp.p.y += (1 - introK) * (2.4 + (i % 3) * 0.3);
      tmp.s.multiplyScalar(0.001 + introK * 0.999);

      // Gentle procedural motion, strongest in the GROW state.
      const growW = 1 - Math.abs(v - 1);
      tmp.p.addScaledVector(tmp.a.copy(A.p).normalize(), Math.sin(t * 0.9 + i) * 0.04 * Math.max(growW, 0));

      positions[i]!.copy(tmp.p);
      tmp.m.compose(tmp.p, tmp.q, tmp.s);
      mesh.current!.setMatrixAt(i, tmp.m);
    }
    mesh.current!.instanceMatrix.needsUpdate = true;

    // Links glow only while the system is expanded.
    const growW = Math.max(0, 1 - Math.abs(v - 1) * 1.4);
    const pos = links.current!.geometry.attributes.position as THREE.BufferAttribute;
    pairs.forEach(([a, b], k) => {
      pos.setXYZ(k * 2, positions[a]!.x, positions[a]!.y, positions[a]!.z);
      pos.setXYZ(k * 2 + 1, positions[b]!.x, positions[b]!.y, positions[b]!.z);
    });
    pos.needsUpdate = true;
    linkMat.opacity = growW * 0.55;

    // The core ignites as the structure converges.
    const convertW = smooth(Math.min(Math.max(v - 1, 0), 1));
    const pulse = 1 + Math.sin(t * 2) * 0.04 * convertW;
    core.current!.scale.setScalar((0.15 + convertW * 0.85) * pulse);
    core.current!.rotation.set(t * 0.2, t * 0.3, 0);
    coreMat.emissiveIntensity = 0.3 + convertW * 0.9;
    haloMat.opacity = convertW * 0.6;
    halo.current!.scale.setScalar(1 + convertW * 0.6 + Math.sin(t * 1.5) * 0.03);
    light.current!.intensity = 1.5 + convertW * 7;

    // Pointer parallax and slow presentation turn.
    const g = group.current!;
    // Frame each state: the compact tower is shown larger, the open lattice at full size.
    const buildW = Math.max(0, 1 - v);
    g.scale.setScalar(1 + buildW * 0.42 + convertW * 0.22);
    g.rotation.y += (pointer.current.x * 0.35 + t * 0.05 - g.rotation.y) * 0.05;
    g.rotation.x += (pointer.current.y * 0.18 + 0.12 - g.rotation.x) * 0.05;
    frame.camera.position.x += (pointer.current.x * 0.35 - frame.camera.position.x) * 0.04;
    frame.camera.position.y += (-pointer.current.y * 0.25 - frame.camera.position.y) * 0.04;
    frame.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <directionalLight position={[4, 5, 6]} intensity={1.1} />
      <directionalLight position={[-5, -2, -3]} intensity={0.35} color="#9aa3b5" />
      <pointLight ref={light} position={[0, 0, 0]} color="#ff6b35" intensity={2} distance={6} decay={2} />
      <group ref={group}>
        <instancedMesh ref={mesh} args={[beamGeo, beamMat, N]} frustumCulled={false} />
        <lineSegments ref={links} geometry={linkGeo} material={linkMat} frustumCulled={false} />
        <mesh ref={core} geometry={coreGeo} material={coreMat} />
        <mesh ref={halo} geometry={haloGeo} material={haloMat} rotation={[1.05, 0.2, 0.15]} />
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
