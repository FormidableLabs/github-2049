import React, { useMemo } from "react";
import { DoubleSide } from 'three';
import flatten from "lodash-es/flatten";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

export function getSVGGeometry(src) {
  const data = new SVGLoader().parse(src);

  const shapes = flatten(
    data.paths.map((path, index) =>
      path
        .toShapes(true)
        .map((shape) => ({ shape, color: path.userData.style.fill, index }))
    )
  );

  const strokes = flatten(
    data.paths.map((path, index) => {
      const strokeColor = path.userData.style.stroke;
      if (strokeColor !== undefined && strokeColor !== "none") {
        return path.subPaths.map((subPath) => ({
          stroke: SVGLoader.pointsToStroke(subPath.getPoints(), {
            ...path.userData.style,
            strokeWidth: 1,
          }),
          color: strokeColor,
        }));
      }
    })
  ).filter((s) => s && s.stroke);

  return { shapes, strokes };
}

export default function SVG({ src, ...rest }) {
  const { shapes, strokes } = useMemo(() => getSVGGeometry(src), [src]);
  return (
    <group {...rest}>
      {shapes &&
        shapes.map((item, idx) => <Shape key={item.shape.uuid} {...item} />)}
      {strokes &&
        strokes.map((item, idx) => <Stroke key={item.stroke.uuid} {...item} />)}
    </group>
  );
}

function Shape({ shape, color }) {
  return (
    <mesh >
      <meshBasicMaterial
        attach="material"
        depthWrite={false}
        color={color}
        side={DoubleSide}
      />
      <shapeBufferGeometry attach="geometry" args={[shape]} />
    </mesh>
  );
}

function Stroke({ stroke, color }) {
  return (
    <mesh geometry={stroke} >
      <meshBasicMaterial
        attach="material"
        depthWrite={false}
        color={color}
        side={DoubleSide}
      />
    </mesh>
  );
}
