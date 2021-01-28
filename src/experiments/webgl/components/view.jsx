import React from "react";
import { BoxBufferGeometry, Box3  } from "three";
import { extend } from "react-three-fiber";

import { Box } from "@react-three/flex";

// Same as BoxBuffer but with an empty boundingBox.
// This ensures it doesn't impact the flex/box layout.

class BoundlessBoxBufferGeometry extends BoxBufferGeometry {
  computeBoundingBox() {
    if (!this.boundingBox) {
      this.boundingBox = new Box3();
    }
    this.boundingBox.makeEmpty();
  }
}

extend({ BoundlessBoxBufferGeometry });

const SizedView = React.memo(
  ({ width, height, backgroundColor, opacity, children }) => {
    return (
      <group position={[0, 0, 0.1]}>
        {backgroundColor && (
          <mesh position={[width / 2, -height / 2, -0.3]}>
            <boundlessBoxBufferGeometry
              args={[width, height, 0.1]}
              attach="geometry"
            />
            <meshBasicMaterial
              attach="material"
              depthTest
              color={backgroundColor}
              transparent={opacity < 1}
              opacity={opacity}
            />
          </mesh>
        )}
        {children}
      </group>
    );
  }
);

const View = React.memo(({ backgroundColor, opacity, children, ...props }) => {
  return (
    <Box {...props}>
      {(width, height) => (
        <SizedView
          width={width}
          height={height}
          opacity={opacity}
          backgroundColor={backgroundColor}
        >
          {children}
        </SizedView>
      )}
    </Box>
  );
});

export default View;
