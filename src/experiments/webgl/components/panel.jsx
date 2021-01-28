import React, { useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import flatten from "lodash-es/flatten";
import { useSpring, animated } from "react-spring/three";

import { Panel as RandomPanel } from "../../common/shapes";

function Shape({ shape, color, opacity, position, rotation }) {
  return (
    <animated.mesh position={position} rotation={rotation}>
      <meshBasicMaterial
        attach="material"
        transparent
        opacity={opacity}
        depthWrite={false}
        color={color}
        side={THREE.DoubleSide}
      />
      <shapeBufferGeometry attach="geometry" args={[shape]} />
    </animated.mesh>
  );
}

function Stroke({ stroke, color, opacity, animate }) {
  let rotation = [0, 0, 0];
  const [state, setState] = useState(() => Math.random() > 0.5);
  const shouldAnimate = useMemo(() => Math.random() > 0.5, []);
  const direction = useMemo(() => Math.random() > 0.5, []);

  let position = shouldAnimate
    ? state
      ? [direction ? 10 : 0, direction ? 0 : 10, 0]
      : [direction ? -10 : 0, direction ? 0 : -10, 0]
    : [0, 0, 0];

  if (shouldAnimate && animate) {
    ({ position } = useSpring({
      from: { position },
      to: { position },
      delay: Math.floor(Math.random() * 5000),
    }));

    useEffect(() => {
      const id = setInterval(() => {
        requestAnimationFrame(() => {
          setState((s) => !s);
        });
      }, 5000);

      return () => clearInterval(id);
    }, []);
  }

  return (
    <animated.mesh geometry={stroke} position={position} rotation={rotation}>
      <meshBasicMaterial
        attach="material"
        transparent
        opacity={opacity}
        depthWrite={false}
        color={color}
        side={THREE.DoubleSide}
      />
    </animated.mesh>
  );
}

export function SVG({ shapes, strokes, opacity, animate, ...rest }) {
  return (
    <group {...rest}>
      {shapes &&
        shapes.map((item, idx) => (
          <Shape animate opacity={opacity} key={item.shape.uuid} {...item} />
        ))}
      {strokes &&
        strokes.map((item, idx) => (
          <Stroke animate opacity={opacity} key={item.stroke.uuid} {...item} />
        ))}
    </group>
  );
}

function rad(deg) {
  return (deg * Math.PI) / 180;
}

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

export default function Panel({
  width,
  height,
  color = "#fff",
  opacity = 1,
  ghost,
  children,
  ...rest
}) {
  const { shapes, strokes } = useMemo(
    () =>
      getSVGGeometry(`
      <svg>
        <path d="M16 6H86V8H16V6Z" fill="${color}"/>
        <path d="M14 8L12 6L6 12L8 14L14 8Z" fill="${color}"/>
        <path d="M6 86V16H8V86H6Z" fill="${color}"/>
        <path d="M0 64H2V88L8 94V130H6V95L0 89V64Z" fill="${color}"/>
        <path d="M64 0V2H88L94 8H130V6H95L89 0H64Z" fill="${color}"/>
      </svg>
    `),
    [color]
  );

  const { genShapes, genStrokes } = useMemo(() => {
    const data = getSVGGeometry(`
      <svg>
        <path stroke="${color}" d="${RandomPanel(width, height, 0, 0)}" />
      </svg>
    `);

    return {
      genShapes: data.shapes,
      genStrokes: data.strokes,
    };
  }, [width, height, color]);

  const render = (zOffset = 0, opacity2) => {
    return (
      <>
        <SVG animate strokes={genStrokes} opacity={opacity - opacity2} />
        <SVG
          opacity={opacity - opacity2}
          shapes={shapes}
          strokes={strokes}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, zOffset]}
          rotation={[0, 0, 0]}
        />
        <SVG
          opacity={opacity - opacity2}
          shapes={shapes}
          strokes={strokes}
          scale={[0.5, 0.5, 0.5]}
          position={[width, 0, zOffset]}
          rotation={[0, 0, rad(90)]}
        />
        <SVG
          opacity={opacity - opacity2}
          shapes={shapes}
          strokes={strokes}
          scale={[0.5, 0.5, 0.5]}
          position={[width, height, zOffset]}
          rotation={[0, 0, rad(180)]}
        />
        <SVG
          opacity={opacity - opacity2}
          shapes={shapes}
          strokes={strokes}
          scale={[0.5, 0.5, 0.5]}
          position={[0, height, zOffset]}
          rotation={[0, 0, rad(270)]}
        />
      </>
    );
  };

  return (
    <group {...rest}>
      <group position={[0, -height]}>
        {render(0, 0)}
        {render(-15, 0.9)}
      </group>
      {children}
    </group>
  );
}
