import React, { useMemo } from 'react';
import { randomSquares } from "../../common/shapes";
import { getSVGGeometry, SVG } from "./panel";

// Background of random shapes
export default function Background({ width, height, color, opacity }) {
  const { shapes, strokes } = useMemo(() => {
    return getSVGGeometry(`
      <svg>
        <path stroke="${color}" d="${randomSquares({ width, height, spacing: 100, sizeInterval: 4 })}" />
      </svg>
    `);
  }, [width, height, color]);

  return (
    <SVG animate position={[50, 50, 0]} strokes={strokes} opacity={opacity} />
  );
}
