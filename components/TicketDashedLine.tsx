import React from 'react'
import { View } from 'react-native'
import Svg, { Circle, ClipPath, Rect } from 'react-native-svg'

const DashedView = () => (
  <View className="relative flex-row items-center my-1">
    {/* Dashed Line */}
    <View className="border-dashed border-t border-gray-400 flex-1" />

    {/* Half-Circles */}
    <Svg height="20" width="20" style={{ position: 'absolute', right: -10 }}>
      <ClipPath id="leftHalfClip">
        <Rect x="0" y="0" width="10" height="20" fill="white" />
      </ClipPath>
      <Circle
        cx="10"
        cy="10"
        r="10"
        fill="#000"
        clipPath="url(#leftHalfClip)"
      />
    </Svg>

    <Svg height="20" width="20" style={{ position: 'absolute', left: -10 }}>
      <ClipPath id="rightHalfClip">
        <Rect x="10" y="0" width="10" height="20" fill="white" />
      </ClipPath>
      <Circle
        cx="10"
        cy="10"
        r="10"
        fill="#000"
        clipPath="url(#rightHalfClip)"
      />
    </Svg>
  </View>
)

export default DashedView
