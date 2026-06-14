import { StyleProp, TextInput, View, ViewStyle } from "react-native"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { FONT_SIZE, LINE_HEIGHT, useHandleContext } from "@/context/HandleContext"
import { SafeAreaView } from "react-native-safe-area-context"

export interface WritingProps {
  style?: StyleProp<ViewStyle>
}

export const Writing = () => {
  const { themed } = useAppTheme();

  const { content, setContent } = useHandleContext();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView edges={["bottom"]} style={{ width: '100%', height: '100%' }}>
        <TextInput
          multiline
          value={content}
          onChangeText={(text) => setContent(text)}
          style={themed($textInputStyle)}
        />
      </SafeAreaView>
    </View>
  );
}

const $textInputStyle: ThemedStyle<ViewStyle> = () => ({
  textAlignVertical: "top",
  height: '100%',
  padding: 0,
  width: '100%',
  paddingLeft: 15,
  paddingTop: 5,
  paddingRight: 10,
  fontSize: FONT_SIZE,
  lineHeight: LINE_HEIGHT,
})