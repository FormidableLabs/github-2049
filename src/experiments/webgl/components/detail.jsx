import React from "react";

import { BoxBufferGeometry, Box3 } from "three";

import { Flex, Box, useFlexSize } from "@react-three/flex";
import { extend } from "react-three-fiber";
import Text from './text-box';
import View from './view';
import sourceCodeProRegular from "../SourceCodePro-Regular.ttf";
import sourceCodeProSemiBold from "../SourceCodePro-SemiBold.ttf";

const regular = `${window.PUBLIC_PATH}${sourceCodeProRegular}`
const bold  = `${window.PUBLIC_PATH}${sourceCodeProSemiBold}`

function Stat({ title, value, color = '#fff' }) {
  return (
    <View flexDirection="column">
      <Text font={regular} color="#ccc" fontSize={8} >{title}</Text>
      <Text font={bold} color={color} fontSize={12} >{value}</Text>
    </View>
  )
}

export default function Detail({ ...props }) {
  return (
    <Box width="100%" height={100} flexDirection="row" alignItems="stretch">
      <Box 
        width="auto"
        height="auto"
        flexGrow={1}
        flexBasis={0}
        alignItems="stretch"
        flexDirection="column"
      >
        <View
          width="100%"
          flexBasis={1}
          flexGrow={1}
          flexShrink={0}
          paddingLeft={8}
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          backgroundColor="rgb(254, 201, 3)"
        >
          <Box flexDirection="column">
            <Text font={bold} color="#000" fontSize={18}>urql</Text>
            <Text font={regular} color="#000" fontSize={6}>FormidableLabs</Text>
          </Box>
          <View marginRight={8} width="auto" paddingLeft={3} paddingRight={3} paddingTop={1} paddingBottom={1} height="auto" backgroundColor="#000">
            <Text font={regular} color="#fff" fontSize={8}>MIT License</Text>
          </View>
        </View>
        <View
          width="100%"
          flexBasis={1}
          flexGrow={1}
          flexShrink={0}
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Stat title="Forks" value="223" />
          <Stat title="Stars" color="rgb(254, 201, 3)" value="5326" />
          <Stat title="Watchers" value="082" />
          <Stat title="Issues" value="017" />
        </View>
      </Box>
    </Box>
  );
}
