import React, { useState } from "react";

import { BoxBufferGeometry, Box3 } from "three";

import { Flex, Box, useFlexSize } from "@react-three/flex";
import { extend } from "react-three-fiber";
import View from "./view";
import sourceCodeProRegular from "../SourceCodePro-Regular.ttf";
import sourceCodeProSemiBold from "../SourceCodePro-SemiBold.ttf";

import { Text as TroikaText } from "troika-three-text";

extend({ Text: TroikaText });

const regular = `${window.PUBLIC_PATH}${sourceCodeProRegular}`;
const bold = `${window.PUBLIC_PATH}${sourceCodeProSemiBold}`;

const Bar = ({ width, height, depth = 0.1, position = [0, 0, 0], color, ...rest }) => {
  return (
    <mesh position={[position[0] + width / 2, position[1] - height / 2, position[2]]} scale={[width, -height, depth]} {...rest}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

const Language = ({ name, color, percent, ...rest }) => {
  const [width] = useFlexSize();

  const barWidth = width;
  const filledWidth = percent / 100 * barWidth;
  const unfilledWidth = barWidth - filledWidth;
  return (
    <group {...rest}>
      <Bar height={4} position={[0, -25, 0]} width={filledWidth} color={color} />
      <Bar
        height={4}
        position={[filledWidth, -25, 0]}
        width={unfilledWidth}
        color="#888"
      />
      <text anchorY="top" position={[0, -5, 0]} fontSize={10} font={bold} text={name.toUpperCase()} />
      <text color="#fff" anchorY="top" anchorX="right" position={[barWidth - 12, 4, 0]} fontSize={20} font={bold} text={percent} />
      <text color="#666" transparent opacity={0.2} anchorY="top" position={[barWidth - 10, -3, 0]} fontSize={12} font={bold} text="%" />
    </group>
  );
};

const Languages = () => {
  return (
    <Box flexDirection="column" width="100%">
      <Language color="#fff" position={[0, 0, 0]} name="TypeScript" percent={80} />
      <Language color="#fff" position={[0, -40, 0]} name="JavaScript" percent={16} />
      <Language color="#fff" position={[0, -80, 0]} name="HTML" percent={3} />
      <Language position={[0, -120, 0]} name="Other" percent={0.5} />
    </Box>
  );
};

export default Languages;
