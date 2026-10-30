"use client";

/* eslint-disable react-hooks/immutability -- uniforms are mutated per frame by design (R3F render loop). */
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { heroState } from "./hero-state";

/*
  GPU particle field around the hero sculpture. Every particle's position is computed in the
  vertex shader from a random seed, the time and the hero state, so the CPU only updates two
  uniforms per frame.
    Build   (0): sparse dust drifting upward around the tower
    Grow    (1): tilted orbital streams around the lattice
    Convert (2): particles spiral inward and feed the core
*/

const vertex = /* glsl */ `
attribute vec3 aSeed;
uniform float uTime;
uniform float uState;
uniform float uPx;
varying float vAlpha;
varying float vHeat;

void main() {
  float wB = clamp(1.0 - uState, 0.0, 1.0);
  float wC = clamp(uState - 1.0, 0.0, 1.0);
  float wG = 1.0 - wB - wC;

  float a0 = aSeed.x * 6.2831;
  float r = 2.1 + aSeed.y * 1.7;
  float yb = (aSeed.z - 0.5) * 3.2;

  // Build: slow upward drift around the tower
  float rise = fract(uTime * 0.04 + aSeed.z);
  vec3 pB = vec3(cos(a0 + uTime * 0.03) * r, yb * 0.6 + rise * 0.8 - 0.4, sin(a0 + uTime * 0.03) * r);

  // Grow: tilted orbital streams
  float ag = a0 + uTime * (0.18 + aSeed.y * 0.12);
  float tilt = (aSeed.z - 0.5) * 1.6;
  vec3 pG = vec3(cos(ag) * r * 0.95, sin(ag) * r * 0.35 * tilt, sin(ag) * r * 0.95);

  // Convert: inward spiral into the core, respawning at the rim
  float k = fract(uTime * 0.22 + aSeed.z);
  float rc = mix(r * 1.05, 0.25, k * k);
  float ac = a0 + k * 5.0;
  vec3 pC = vec3(cos(ac) * rc, yb * (1.0 - k) * 0.35, sin(ac) * rc);

  vec3 pos = pB * wB + pG * wG + pC * wC;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.8 + aSeed.y * 2.4) * uPx * (5.5 / -mv.z);

  vAlpha = 0.32 * wB + 0.55 * wG + (0.3 + 0.65 * k) * wC;
  vHeat = wC * k + wG * 0.35;
}`;

const fragment = /* glsl */ `
varying float vAlpha;
varying float vHeat;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float soft = smoothstep(0.5, 0.0, d);
  vec3 steel = vec3(0.62, 0.64, 0.7);
  vec3 ember = vec3(1.0, 0.45, 0.22);
  gl_FragColor = vec4(mix(steel, ember, clamp(vHeat, 0.0, 1.0)), soft * vAlpha);
}`;

/** Small seeded PRNG (mulberry32): deterministic, so the field looks the same on every load. */
function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function SparkField({ tier }: { tier: "high" | "low" }) {
  const count = tier === "high" ? 900 : 360;
  const { geometry, material } = useMemo(() => {
    const rand = seeded(1337);
    const seeds = new Float32Array(count * 3);
    for (let i = 0; i < seeds.length; i++) seeds[i] = rand();
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 3));
    const m = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: { uTime: { value: 0 }, uState: { value: 0 }, uPx: { value: Math.min(window.devicePixelRatio || 1, 1.75) } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return { geometry: g, material: m };
  }, [count]);

  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);

  useFrame((state, delta) => {
    const u = material.uniforms as { uTime: { value: number }; uState: { value: number } };
    u.uTime.value = state.clock.elapsedTime;
    u.uState.value += (heroState.target - u.uState.value) * (1 - Math.exp(-Math.min(delta, 0.05) * 2.5));
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}
