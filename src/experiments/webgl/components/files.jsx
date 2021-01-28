import React, { useState } from "react";

import { BoxBufferGeometry, Box3 } from "three";

import { Flex, Box, useFlexSize } from "@react-three/flex";
import { extend } from "react-three-fiber";
import Text from "./text-box";
import View from "./view";
import sourceCodeProRegular from "../SourceCodePro-Regular.ttf";
import sourceCodeProSemiBold from "../SourceCodePro-SemiBold.ttf";

const regular = `${window.PUBLIC_PATH}${sourceCodeProRegular}`;
const bold = `${window.PUBLIC_PATH}${sourceCodeProSemiBold}`;

const ROW_HEIGHT = 40;

const Row = ({ width, height, name, sha, type, selected }) => {
  const nameColor = type === "folder" ? "rgb(254, 201, 3)" : "#fff";
  const shaColor = selected ? "#fff" : "#555";

  const textNodes = (
    <>
      <Text font={regular} fontSize={12} color={nameColor}>
        {name}
      </Text>
      {sha && (
        <Text font={regular} fontSize={12} color={selected ? "#fff" : shaColor}>
          {sha}
        </Text>
      )}
    </>
  );

  return (
    <View
      paddingLeft={4}
      paddingRight={4}
      paddingBottom={4}
      paddingTop={3}
      backgroundColor="#fff"
      opacity={selected ? 0.1 : 0}
      alignItems="center"
      width="100%"
      flexDirection="row"
      justifyContent="space-between"
    >
      {textNodes}
    </View>
  );
};

const Files = () => {
  const data = [
  { name: ".changeset", sha: "c84c601", type: 'folder' },
  { name: ".circleci", sha: "6ff4909", type: 'folder' },
  { name: ".codesandbox", sha: "6ff4909", type: 'folder' },
  { name: ".github", sha: "009e99a", type: 'folder' },
  { name: "docs", sha: "009e99a", type: 'folder' },
  { name: "exchanges", sha: "2d21c20", type: 'folder' },
  { name: "packages", sha: "d5a7733", type: 'folder' },
  { name: "scripts", sha: "d5a7733", type: 'folder' },
  { name: ".editorconfig", sha: "c84c601" },
  { name: ".gitattributes", sha: "d524b8b" },
  { name: ".gitignore", sha: "d524b8b" },
  { name: "CODE_OF_CONDUCT.md", sha: "009e99a", selected: true },
  { name: "CONTRIBUTING.md", sha: "009e99a" },
  { name: "LICENSE", sha: "890cbe1" },
  { name: "README.md", sha: "890cbe1" },
  { name: "package.json", sha: "27d10f7" },
  { name: "tsconfig.json", sha: "27d10f7" },
  { name: "yarn.lock", sha: "ffd5467" },
]

  return (
    <Box width="100%">
      {data.map((i) => (
        <Row key={i.name} {...i} />
      ))}
    </Box>
  );
};

export default Files;
