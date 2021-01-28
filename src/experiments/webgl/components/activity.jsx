import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { animated } from "react-spring/three";
import { useFlexSize, Box } from "@react-three/flex";
import { useFrame, extend } from "react-three-fiber";
import { Text as TroikaText } from "troika-three-text";

import sourceCodeProRegular from "../SourceCodePro-Regular.ttf";
import sourceCodeProSemiBold from "../SourceCodePro-SemiBold.ttf";

const regular = `${window.PUBLIC_PATH}${sourceCodeProRegular}`;
const bold = `${window.PUBLIC_PATH}${sourceCodeProSemiBold}`;

extend({ Text: TroikaText });

export default function Graph() {
  const activity = [
    [10, 30, 31, 5],
    [3, 10, 34, 50],
    [40, 31, 10, 4],
    [10, 11, 10, 9],
    [4, 5, 8, 7],
    [4, 0, 7, 5],
    [5, 2, 3, 5],
    [10, 30, 31, 5],
    [20, 25, 33, 40],
    [39, 30, 21, 16],
    [0, 3, 0, 0],
    [0, 2, 1, 10],
  ];

  const names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonth = new Date().getMonth();

  const [width, height] = useFlexSize();

  const cols = width / 12;

  const barMargin = 2;
  const barWidth = cols / 4;

  const labels = activity.map((_, idx) => (
    <text
      key={`label-${idx}`}
      fontSize={6}
      anchorX="left"
      anchorY="bottom"
      text={names[idx]}
      font={bold}
      color={idx === currentMonth ? "#6FC972" : "#fff"}
      position={[cols * idx, -10, 0]}
    />
  ));

  const bars = activity.map((group, idx) => {
    return group.map((height, idx2) => {
      return height ? (
        <mesh
          key={`bar-${idx}-${idx2}`}
          position={[cols * idx + barWidth * idx2 + (barWidth - barMargin) / 2, height / 2, 0]}
          scale={[barWidth - barMargin, -height, 1]}
        >
          <boxBufferGeometry args={[1, 1, 0.1]} />
          <meshBasicMaterial
            color={idx === currentMonth ? "#6FC972" : "#fff"}
          />
        </mesh>
      ) : null;
    });
  });

  return (
    <Box centerAnchor>
      <group position={[-width / 2, -20, 0]}>
        {bars}
        {labels}
      </group>
    </Box>
  );
}
