import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import { Shadow, useGLTF, MeshDistortMaterial } from 'drei'
import geoObject from './geo.min.glb';

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF(`${window.PUBLIC_PATH}${geoObject}`, true)
  useFrame(({ clock }) => {
    const t = (0.5 + Math.sin(clock.getElapsedTime() * 1.5)) / 2
    group.current.position.y = t / 3
    group.current.rotation.x = group.current.rotation.z += 0.005
  })
  return (
    <group {...props} dispose={null}>
      <group ref={group}>
        <mesh geometry={nodes.geo.geometry}>
          <meshBasicMaterial wireframe />
        </mesh>
      </group>
    </group>
  )
}
