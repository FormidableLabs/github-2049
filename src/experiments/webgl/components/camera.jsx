import React, { useEffect, useRef } from "react";
import { useThree, useFrame, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

// This Camera ensures 1 unit represents 1 pixel
const Camera = () => {
  const camera = useRef();
  const { aspect, size, viewport, setDefaultCamera } = useThree();
  const pixelToThreeUnitRatio = 1;
  const planeDistance = 0;
  const cameraDistance = 500;
  const distance = cameraDistance - planeDistance;
  const height = size.height / pixelToThreeUnitRatio;
  const halfFovRadians = Math.atan(height / 2 / distance);
  const fov = 2 * halfFovRadians * (180 / Math.PI);
  useEffect(() => void setDefaultCamera(camera.current), []);
  return (
    <perspectiveCamera
      ref={camera}
      aspect={aspect}
      fov={fov}
      position={[size.width / 2, size.height / 2, cameraDistance]}
      onUpdate={(self) => self.updateProjectionMatrix()}
    />
  );
};

// Enables 3d mouse orbit
const CameraControls = () => {
  const {
    camera,
    size,
    gl: { domElement },
  } = useThree();
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      enableDamping
      enableKeys
      target={[size.width / 2, size.height / 2, 0]}
      ref={controls}
      args={[camera, domElement]}
    />
  );
};

export default function CameraWithOrbit() {
  return (
    <>
      <Camera />
      <CameraControls />
    </>
  );
}
