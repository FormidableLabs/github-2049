import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { animated } from "react-spring/three";
import { useFlexSize, Box } from "@react-three/flex";
import { useFrame, extend } from "react-three-fiber";
import { Text as TroikaText } from "troika-three-text";
import {
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryStack,
  VictoryChart,
  VictoryArea,
  Area,
  Bar,
  VictoryLabel,
  LineSegment,
} from "victory";

import SVG from "./svg";

import sourceCodeProRegular from "../SourceCodePro-Regular.ttf";

const regular = `${window.PUBLIC_PATH}${sourceCodeProRegular}`;

extend({ Text: TroikaText });

const Container3D = ({ children, width, height }) => {
  return <group>{children}</group>;
};

const Path3D = (props) => {
  const src = `
    <svg>
      <path d="${props.d}" stroke="${props.style.stroke}" fill="${props.style.fill}" />
    </svg>
  `;
  return <SVG src={src} />;
};

const Bar3D = (props) => {
  return <Bar {...props} pathComponent={<Path3D />} />;
};

const Text3D = (props) => {
  return <group position={[props.x, props.y, 0]}>{props.children}</group>;
};

const TSpan3D = (props) => {
  const anchor = {
    start: "left",
    middle: "center",
    end: "right",
  };

  return (
    <text
      scale={[1, -1, 1]}
      anchorX={anchor[props.textAnchor]}
      anchorY="bottom"
      text={props.children}
      fontSize={8}
      font={regular}
      color="#fff"
    />
  );
};

const Label3D = (props) => {
  return (
    <VictoryLabel
      {...props}
      textComponent={<Text3D />}
      tspanComponent={<TSpan3D />}
      groupComponent={<Group3D />}
    />
  );
};

const Line3D = (props) => {
  const src = `
    <svg>
      <line x1="${props.x1}" x2="${props.x2}" y1="${props.y1}" y2="${props.y2}" strokeWidth="${props.style.strokeWidth}" stroke="${props.style.stroke}" fill="${props.style.fill}" strokeDasharray="${props.style.strokeDasharray}" />
    </svg>
  `;
  return <SVG src={src} />;
};

const LineSegment3D = (props) => {
  return <LineSegment {...props} lineComponent={<Line3D />} />;
};

const Group3D = (props) => {
  return <group {...props} />;
};

class VictoryAxis3D extends VictoryAxis {
  static defaultProps = Object.assign({}, VictoryAxis.defaultProps, {
    axisComponent: <LineSegment3D type={"axis"} />,
    containerComponent: <Container3D />,
    groupComponent: <Group3D />,
    labelComponent: <Label3D />,
    axisLabelComponent: <Label3D />,
    tickLabelComponent: <Label3D />,
    tickComponent: <LineSegment3D type={"tick"} />,
    gridComponent: <LineSegment3D type={"grid"} />,
  });
}

function VictoryBar3D(props) {
  return (
    <VictoryBar
      groupComponent={<Group3D />}
      dataComponent={<Bar3D />}
      {...props}
    />
  );
}

function VictoryStack3D(props) {
  return (
    <VictoryStack
      containerComponent={<Container3D />}
      groupComponent={<Group3D />}
      labelComponent={<Label3D />}
      {...props}
    />
  );
}

function VictoryChart3D(props) {
  return (
    <VictoryChart
      defaultAxes={{
        independent: <VictoryAxis3D />,
        dependent: <VictoryAxis3D dependentAxis />,
      }}
      containerComponent={<Container3D />}
      groupComponent={<Group3D />}
      {...props}
    />
  );
}

class VictoryArea3D extends VictoryArea {
  static defaultProps = Object.assign({}, VictoryArea.defaultProps, {
    dataComponent: <Area3D />,
    labelComponent: <Label3D />,
    containerComponent: <Container3D />,
    groupComponent: <Group3D />,
  });
}

function Area3D(props) {
  return (
    <Area groupComponent={<Group3D />} pathComponent={<Path3D />} {...props} />
  );
}

export default function Graph() {
  const [width, height] = useFlexSize();

  const sampleData = [
    {
      x: 1,
      y: 2,
    },
    {
      x: 2,
      y: 3,
    },
    {
      x: 3,
      y: 5,
    },
    {
      x: 4,
      y: 4,
    },
    {
      x: 5,
      y: 7,
    },
  ];

  return (
    <Box centerAnchor>
      <group position={[-width / 2, height / 2, 0]} scale={[1, -1, 1]}>
        <VictoryChart3D
          theme={VictoryTheme.material}
          width={width}
          height={height}
          padding={{ top: 20, right: 20, bottom: 40, left: 40 }}
        >
          <VictoryAxis3D theme={VictoryTheme.material} />
          <VictoryAxis3D
            
            dependentAxis
          />
          <VictoryArea3D
            
            style={{ data: { fill: "#fff" } }}
            data={sampleData}
          />
        </VictoryChart3D>
      </group>
    </Box>
  );
}
