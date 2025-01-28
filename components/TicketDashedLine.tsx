import React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

const DashedView = ({ circleFill = '#000' }) => (
  <View className="relative flex-row items-center my-1">
    {/* Dashed Line */}
    <View className="border-dashed border-t-2 border-gray-400 flex-1" />

    <Svg height="20" width="20" style={{ position: 'absolute', left: -10 }}>
      <Path d="M10 0 A10 10 0 0 1 10 20" fill={circleFill} />
    </Svg>
    <Svg height="20" width="20" style={{ position: 'absolute', right: -10 }}>
      <Path d="M10 0 A10 10 0 0 0 10 20" fill={circleFill} />
    </Svg>
  </View>
)

export default DashedView
