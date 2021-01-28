import React, { useState, useRef, useLayoutEffect } from "react";

import { Text } from "troika-three-text";
import { Box, useReflow } from "@react-three/flex";
import { extend, useThree } from "react-three-fiber";
import { Box as Box3D } from "drei";

extend({ Text });

const InnerText = React.memo(({ children, boundingBox, ...rest }) => {
  const ref = useRef();
  const reflow = useReflow();
  const [size, setSize] = useState([0, 0, 0]);

  useLayoutEffect(() => {
    ref.current.sync(() => {
      if (boundingBox) {
        const size = ref.current.geometry.boundingBox.size();
        setSize([size.x, size.y]);
      }
      reflow();
    });
  }, [boundingBox, ref.current]);

  return (
    <>
      {boundingBox && (
        <Box3D args={[size[0], size[1], 1]}>
          <meshBasicMaterial attach="material" color="red" wireframe />
        </Box3D>
      )}
      <text
        ref={ref}
        position={[0, 0, 0]}
        anchorX="center"
        anchorY="middle"
        text={children}
        {...rest}
      />
    </>
  );
});

export default function TextBox({ padding, ...rest }) {
  return (
    <Box padding={padding} centerAnchor>
      <InnerText {...rest} />
    </Box>
  );
}
