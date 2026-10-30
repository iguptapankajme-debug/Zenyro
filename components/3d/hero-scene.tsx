"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Tier = "high" | "low";

/** Studio lighting from a generated room environment: realistic reflections with no HDR download. */
function StudioEnvironment() {
  const get = useThree((state) => state.get);
  useEffect(() => {
    const { gl, scene } = get();
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.7;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [get]);
  return null;
}

const chrome = new THREE.MeshStandardMaterial({ color: "#2a2d33", metalness: 1, roughness: 0.2 });
const brushed = new THREE.MeshStandardMaterial({ color: "#3a3d44", metalness: 1, roughness: 0.48 });
const core = new THREE.MeshStandardMaterial({ color: "#15171c", metalness: 1, roughness: 0.32, flatShading: true });
const ember = new THREE.MeshStandardMaterial({ color: "#ff6b35", emissive: "#ff6b35", emissiveIntensity: 2.2, toneMapped: false });

type RingSpec = { radius: number; tube: number; tilt: [number, number, number]; axis: "x" | "y" | "z"; speed: number; material: THREE.Material; node: number };

const rings: RingSpec[] = [
  { radius: 1.18, tube: 0.034, tilt: [Math.PI / 2.4, 0, 0], axis: "z", speed: 0.16, material: chrome, node: 0.6 },
  { radius: 1.48, tube: 0.026, tilt: [0.2, Math.PI / 2.2, 0], axis: "x", speed: -0.11, material: brushed, node: 2.4 },
  { radius: 1.8, tube: 0.02, tilt: [Math.PI / 1.7, 0.5, 0.3], axis: "y", speed: 0.07, material: chrome, node: 4.1 },
];

function Sculpture({ tier }: { tier: Tier }) {
  const root = useRef<THREE.Group>(null);
  const ringRefs = useRef<(THREE.Group | null)[]>([]);
  const light = useRef<THREE.PointLight>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const seg = tier === "high" ? { radial: 20, tubular: 180, ico: 1 } : { radial: 10, tubular: 90, ico: 0 };

  const geoms = useMemo(
    () => ({
      rings: rings.map((r) => new THREE.TorusGeometry(r.radius, r.tube, seg.radial, seg.tubular)),
      core: new THREE.IcosahedronGeometry(0.58, seg.ico),
      equator: new THREE.TorusGeometry(0.86, 0.006, 6, 120),
      node: new THREE.SphereGeometry(0.055, 16, 16),
      emberNode: new THREE.SphereGeometry(0.075, 16, 16),
    }),
    [seg.radial, seg.tubular, seg.ico],
  );
  useEffect(() => () => {
    geoms.rings.forEach((g) => g.dispose());
    geoms.core.dispose();
    geoms.equator.dispose();
    geoms.node.dispose();
    geoms.emberNode.dispose();
  }, [geoms]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const g = root.current;
    if (!g) return;
    // Pointer response is eased so the object leans toward the cursor rather than snapping.
    const tx = pointer.current.y * 0.22;
    const ty = pointer.current.x * 0.32 + state.clock.elapsedTime * 0.06;
    g.rotation.x += (tx - g.rotation.x) * 0.04;
    g.rotation.y += (ty - g.rotation.y) * 0.04;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
    ringRefs.current.forEach((r, i) => {
      if (r) r.rotation[rings[i]!.axis] += rings[i]!.speed * dt;
    });
    if (light.current) {
      light.current.position.x += (pointer.current.x * 1.6 - light.current.position.x) * 0.05;
      light.current.position.y += (-pointer.current.y * 1.2 - light.current.position.y) * 0.05;
    }
  });

  return (
    <>
      <pointLight ref={light} position={[0, 0, 1.6]} color="#ff6b35" intensity={5} distance={5} decay={2} />
      <directionalLight position={[3, 4, 5]} intensity={0.9} />
      <group ref={root} rotation={[0.2, -0.4, 0]}>
        <mesh geometry={geoms.core} material={core} />
        <mesh geometry={geoms.equator} material={ember} rotation={[Math.PI / 2.2, 0.2, 0]} />
        {rings.map((r, i) => (
          <group key={i} rotation={r.tilt}>
            <group ref={(el) => { ringRefs.current[i] = el; }}>
              <mesh geometry={geoms.rings[i]} material={r.material} />
              <mesh
                geometry={i === 2 ? geoms.emberNode : geoms.node}
                material={i === 2 ? ember : chrome}
                position={[Math.cos(r.node) * r.radius, Math.sin(r.node) * r.radius, 0]}
              />
            </group>
          </group>
        ))}
      </group>
    </>
  );
}

export default function HeroScene({ tier, onReady }: { tier: Tier; onReady: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const visible = useRef(true);
  const invalidateRef = useRef<(() => void) | null>(null);

  // Pause rendering when the hero is off-screen or the tab is hidden.
  useEffect(() => {
    const el = wrap.current!;
    const io = new IntersectionObserver(([e]) => {
      visible.current = !!e?.isIntersecting;
      if (visible.current) invalidateRef.current?.();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop="demand"
        dpr={tier === "high" ? [1, 1.75] : 1}
        camera={{ position: [0, 0, 5.4], fov: 36 }}
        gl={{ antialias: tier === "high", alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl, invalidate }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          invalidateRef.current = invalidate;
          requestAnimationFrame(onReady);
        }}
      >
        <StudioEnvironment />
        <Sculpture tier={tier} />
        <Driver tier={tier} visible={visible} />
      </Canvas>
    </div>
  );
}

/** Drives demand-based rendering: 60fps on capable devices, 30fps on lighter ones, none when hidden. */
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
