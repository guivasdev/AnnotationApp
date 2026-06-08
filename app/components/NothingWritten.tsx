import { StyleProp, View, ViewStyle } from "react-native"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { Text } from "@/components/Text"
import React from "react"
import { FONT_SIZE, LINE_HEIGHT, useHandleContext } from "@/context/HandleContext"

export interface NothingWrittenProps {
  style?: StyleProp<ViewStyle>
}
export const NothingWritten = (props: NothingWrittenProps) => {
  const { style } = props
  const { themed } = useAppTheme();
  const { getHeight, lines } = useHandleContext();

  return (
    <View onLayout={getHeight} style={{ width: '100%', height: '100%' }}>
      <View pointerEvents="none" style={[themed($viewSuperLinesStyle), { top: 0 }]}>
        {Array.from({ length: lines }).map((_, i) => (
          <View key={i} style={themed($viewLinesStyle)} />
        ))}
      </View>

      <Text style={{ textAlign: 'center' }}>Nada escrito ainda!</Text>
    </View>
  )
}

const $viewSuperLinesStyle: ThemedStyle<ViewStyle> = () => ({
  position: 'absolute',
  left: 0,
  right: 0,
})

const $viewLinesStyle: ThemedStyle<ViewStyle> = () => ({
  height: LINE_HEIGHT,
  borderBottomWidth: 1,
  borderBottomColor: '#aaa',
})