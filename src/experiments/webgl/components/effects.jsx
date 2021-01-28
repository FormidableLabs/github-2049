import * as THREE from "three";
import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { extend, useThree, useFrame } from "react-three-fiber";

import {
  EffectComposer,
  Glitch,
  Bloom,
  Noise,
  SMAA,
  ChromaticAberration,
} from "@react-three/postprocessing";

import {
  BlendFunction,
  GlitchMode,
} from "postprocessing";

export default function Effects() {
  const composer = useRef();
  const glitch = useRef();
  const { scene, gl, size, camera, viewport } = useThree();
  const aspect = viewport().factor;

  return (
    <Suspense fallback={null}>
      <EffectComposer multisamping={0}>
        <Glitch
          delay={[1.5, 3.5]}
          duration={[0.1, 0.2]}
          strength={[0.05, 0.1]}
          mode={GlitchMode.SPORADIC}
          active
          ratio={0.5}
        />
        <SMAA />
        <Noise opacity={0.1} premultiply blendFunction={BlendFunction.NORMAL} />
        <Bloom
          intensity={0.5}
          luminanceSmoothing={0.025}
          luminanceThreshold={0.8}
        />
      </EffectComposer>
    </Suspense>
  );
}
